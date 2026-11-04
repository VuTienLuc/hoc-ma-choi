/*! word-equation.js — Xuất Word (.docx) có Equation chỉnh sửa được từ văn bản chứa LaTeX.
 *  Quy trình: LaTeX → (chuẩn hóa hệ phương trình) → MathJax tex2mml → mathml2omml → OMML (+ sửa ngoặc co giãn, căn cột) → .docx
 *  Dùng trong trình duyệt (cần MathJax 3 đã nạp) hoặc Node (truyền tex2mml, mml2omml, DOMParser, XMLSerializer).
 */
(function(root){
'use strict';
const W_NS='http://schemas.openxmlformats.org/wordprocessingml/2006/main';
const M_NS='http://schemas.openxmlformats.org/officeDocument/2006/math';
const MML_NS='http://www.w3.org/1998/Math/MathML';
const MATH_RE=/\$\$[\s\S]+?\$\$|\\\[[\s\S]+?\\\]|\\\([\s\S]+?\\\)|(?<!\\)\$(?:\\[\s\S]|[^$\\])+?\$/g;
const xmlEsc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&apos;'}[c])).replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/g,'');

/* =====================================================================
 * 1. CHUẨN HÓA HỆ PHƯƠNG TRÌNH (mức LaTeX)
 *    Đưa mọi kiểu AI hay viết về một dạng:  \left\{\begin{array}{l} … \\ … \end{array}\right.
 *    (ngoặc vuông "hoặc" → \left[ … \right.)
 * ===================================================================== */
const ALIGN_ENVS=/^(aligned|alignedat|split|gathered|align\*?|eqnarray\*?|gather\*?)$/;
const SYS_ENVS='cases\\*?|dcases|array|matrix|smallmatrix|aligned|alignedat|split|gathered|align\\*?|eqnarray\\*?|gather\\*?';
function skipGroup(s,i){ // s[i]==='{' → vị trí sau '}' tương ứng
  let d=0;for(;i<s.length;i++){if(s[i]==='\\'){i++;continue}if(s[i]==='{')d++;else if(s[i]==='}'&&--d===0)return i+1}return s.length;
}
function findEnvEnd(s,from,env){ // trả về [vị trí đầu \end{env}, vị trí sau nó]
  const esc=env.replace('*','\\*'),re=new RegExp('\\\\(begin|end)\\{'+esc+'\\}','g');re.lastIndex=from;let d=1,m;
  while((m=re.exec(s))){if(m[1]==='begin')d++;else if(--d===0)return [m.index,re.lastIndex]}return null;
}
function splitTop(s,sepRe){ // tách theo dấu phân cách ở cấp ngoài cùng (không nằm trong {} hay \begin…\end)
  const out=[],sticky=new RegExp(sepRe.source.replace(/^\^/,''),'y');let depth=0,env=0,last=0;
  for(let i=0;i<s.length;i++){
    const c=s[i];
    if(c==='\\'){
      const rest=s.slice(i);let m;
      if((m=rest.match(/^\\begin\{[^}]*\}/))){env++;i+=m[0].length-1;continue}
      if((m=rest.match(/^\\end\{[^}]*\}/))){env--;i+=m[0].length-1;continue}
    }
    if(depth===0&&env===0){sticky.lastIndex=i;const sm=sticky.exec(s);if(sm&&sm[0].length){out.push(s.slice(last,i));i+=sm[0].length-1;last=i+1;continue}}
    if(c==='\\'){i++;continue}
    if(c==='{')depth++;else if(c==='}')depth--;
  }
  out.push(s.slice(last));return out;
}
function splitRows(body){
  let rows=splitTop(body,/^(\\\\(\s*\[[^\]]*\])?|\\cr\b)/);
  if(rows.length===1){ // AI làm mất \\ : thử xuống dòng, rồi "\ " (một gạch + cách)
    const byLine=body.split(/\n+/).map(x=>x.trim()).filter(Boolean);
    if(byLine.length>1)rows=byLine;
    else{const bs=splitTop(body,/^\\(?=\s)/);if(bs.length>1)rows=bs}
  }
  return rows;
}
function buildSystem(open,rows,alignLike){
  let cells=rows.map(r=>splitTop(r,/^&/).map(c=>normalizeSystemsTex(c.trim())));
  if(alignLike)cells=cells.map(c=>[c.join(' ').replace(/\s+/g,' ').trim()]);
  cells=cells.filter(c=>c.some(x=>x));
  if(cells.length&&cells.every(c=>c.length>1&&!c[0]))cells=cells.map(c=>c.slice(1)); // dòng mở đầu bằng &
  const n=Math.max(1,...cells.map(c=>c.length));
  const body=cells.map(c=>c.join(' & ')).join(' \\\\ ');
  return (open==='['?'\\left[':'\\left\\{')+'\\begin{array}{'+'l'.repeat(n)+'} '+body+' \\end{array}\\right.';
}
function normalizeSystemsTex(tex){
  let s=String(tex??'');
  // (A) JSON thoát hai lần: \\begin{cases} … \\\\ …
  if(/(?<!\\)\\\\(begin|end)\{/.test(s))s=s.replace(/\\\\/g,'\\');
  s=s.replace(/\\(begin|end)\s+\{/g,'\\$1{');
  // (B) \systeme{x+y=1, x-y=2}
  s=s.replace(/\\systeme\*?\s*(?=\{)/g,'\\systeme');
  for(let i;(i=s.indexOf('\\systeme{'))>=0;){const end=skipGroup(s,i+8),inner=s.slice(i+9,end-1);s=s.slice(0,i)+buildSystem('{',splitTop(inner,/^,/),false)+s.slice(end)}
  // (C) các dạng mở hệ
  const opener=new RegExp('(?:(\\\\left\\s*(?:\\\\\\{|\\\\lbrace|\\{)|\\\\lbrace|\\\\\\{|\\\\left\\s*(?:\\[|\\\\lbrack)|\\\\lbrack|(?<![\\\\\\w])\\[)\\s*)?\\\\begin\\{('+SYS_ENVS+')\\}','g');
  let out='',pos=0,m;
  while((m=opener.exec(s))){
    const pre=m[1]||'',env=m[2];
    const isBrace=/\{|lbrace/.test(pre),isBracket=/\[|lbrack/.test(pre);
    if(!pre&&!/^(cases\*?|dcases)$/.test(env))continue; // array/aligned đứng một mình: không phải hệ
    let bodyStart=m.index+m[0].length;
    if(env==='array'||env==='alignedat'){const t=s.slice(bodyStart).match(/^\s*(\[[a-z]\])?\s*/);bodyStart+=t[0].length;if(s[bodyStart]==='{')bodyStart=skipGroup(s,bodyStart)}
    const end=findEnvEnd(s,bodyStart,env);if(!end)continue;
    let after=end[1];const close=s.slice(after).match(/^\s*\\right\s*(\.|\\\}|\\rbrace|\]|\\rbrack)/);if(close)after+=close[0].length;
    const open=isBracket?'[':'{';
    out+=s.slice(pos,m.index)+buildSystem(open,splitRows(s.slice(bodyStart,end[0])),ALIGN_ENVS.test(env));
    pos=after;opener.lastIndex=after;
  }
  s=out+s.slice(pos);
  // (D) \left\{ x+y=1 \\ x-y=2 \right.   (không có môi trường)
  s=s.replace(/\\left\s*(\\\{|\\lbrace|\[)((?:(?!\\left|\\right|\\begin\{array\})[\s\S])*?\\\\[\s\S]*?)\\right\s*\./g,(all,o,body)=>buildSystem(o==='['?'[':'{',splitRows(body),false));
  return s;
}

/* =====================================================================
 * 2. CHUẨN HÓA VĂN BẢN (ngoài công thức)
 *    - ký tự vẽ ngoặc ⎧ ⎨ ⎩ ⎪ (ChatGPT dán ra) → hệ LaTeX
 *    - \begin{cases}… quên đặt trong $…$ → bọc $…$
 * ===================================================================== */
function normalizeText(text){
  let s=String(text??'').replace(/\r\n?/g,'\n');
  // (a) khối dòng bắt đầu bằng ⎧⎨⎩⎪ hoặc ⎡⎢⎣
  s=s.replace(/(?:^[ \t]*[⎧⎨⎩⎪⎡⎢⎣{\[][^\n]*(?:\n|$)){2,}/gm,block=>{
    const lines=block.split('\n').filter(l=>l.trim());const art=/^[ \t]*[⎧⎨⎩⎪⎡⎢⎣]/;
    if(!lines.every(l=>art.test(l))&&!(lines.every(l=>/^[ \t]*[{[]/.test(l))&&lines.every(l=>/[=<>≤≥≠]/.test(l))))return block;
    const bracket=lines.some(l=>/^[ \t]*[⎡⎢⎣[]/.test(l));
    const rows=lines.map(l=>l.replace(/^[ \t]*[⎧⎨⎩⎪⎡⎢⎣{[]\s*/,'').replace(/\$/g,'').trim()).filter(Boolean);
    return '$'+buildSystem(bracket?'[':'{',rows,false)+'$'+(block.endsWith('\n')?'\n':'');
  });
  // (b) chuẩn hóa từng công thức; bọc hệ chưa có dấu $
  let out='',last=0,m;MATH_RE.lastIndex=0;
  const wrapLoose=t=>t.replace(/(\\left\s*(?:\\\{|\\lbrace|\[)\s*)?\\begin\s*\{(cases\*?|dcases|array|aligned)\}[\s\S]*?\\end\s*\{\2\}(\s*\\right\s*\.)?/g,(all,pre,env)=>(pre||/cases/.test(env))?'$'+normalizeSystemsTex(all)+'$':all);
  while((m=MATH_RE.exec(s))){
    out+=wrapLoose(s.slice(last,m.index));const tok=m[0],d=tok.startsWith('$$')||tok.startsWith('\\[')?2:tok.startsWith('$')?1:2;
    out+=tok.slice(0,d)+normalizeSystemsTex(tok.slice(d,-d))+tok.slice(-d);last=MATH_RE.lastIndex;
  }
  return out+wrapLoose(s.slice(last));
}

/* =====================================================================
 * 3. MathML → OMML có ngoặc co giãn (m:d) và cột căn đúng
 * ===================================================================== */
const kids=el=>Array.from(el.childNodes).filter(n=>n.nodeType===1);
const byTag=(doc,ns,tag)=>Array.from(doc.getElementsByTagNameNS(ns,tag));
function markFences(mathml,env){
  const doc=new env.DOMParser().parseFromString(mathml,'application/xml');
  const fences=[],aligns=byTag(doc,MML_NS,'mtable').map(t=>t.getAttribute('columnalign')||'');
  const rows=byTag(doc,MML_NS,'mrow').reverse(); // trong ra ngoài
  for(const row of rows){
    const k=kids(row);if(k.length<2)continue;const a=k[0],b=k[k.length-1];
    if(a.localName!=='mo'||b.localName!=='mo')continue;
    const fenceLike=x=>/OPEN|CLOSE/.test(x.getAttribute('data-mjx-texclass')||'')||x.getAttribute('fence')==='true';
    if(!(fenceLike(a)&&fenceLike(b)))continue;
    const id=fences.length;fences.push({open:a.textContent.trim(),close:b.textContent.trim()});
    const sub=doc.createElementNS(MML_NS,'msub'),body=doc.createElementNS(MML_NS,'mrow'),mark=doc.createElementNS(MML_NS,'mi');
    mark.textContent='WEQFENCE'+id;for(const n of k.slice(1,-1))body.appendChild(n);
    row.removeChild(a);row.removeChild(b);sub.appendChild(body);sub.appendChild(mark);row.appendChild(sub);
  }
  return {mathml:new env.XMLSerializer().serializeToString(doc),fences,aligns};
}
function mEl(doc,tag,val){const e=doc.createElementNS(M_NS,'m:'+tag);if(val!==undefined)e.setAttributeNS(M_NS,'m:val',val);return e}
function fixOmml(omml,info,env){
  if(!/^<m:oMath\b[^>]*\sxmlns:w=/.test(omml))omml=omml.replace(/<m:oMath\b/,'<m:oMath xmlns:w="'+W_NS+'"');
  const doc=new env.DOMParser().parseFromString(omml,'application/xml');
  // ngoặc co giãn
  for(const sub of byTag(doc,M_NS,'sSub')){
    const parts=kids(sub),e=parts.find(n=>n.localName==='e'),s=parts.find(n=>n.localName==='sub');
    const m=s&&s.textContent.trim().match(/^WEQFENCE(\d+)$/);if(!m||!e)continue;const f=info.fences[+m[1]];
    const d=mEl(doc,'d'),pr=mEl(doc,'dPr');pr.appendChild(mEl(doc,'begChr',f.open));pr.appendChild(mEl(doc,'endChr',f.close));pr.appendChild(mEl(doc,'grow'));
    const de=mEl(doc,'e');for(const n of Array.from(e.childNodes))de.appendChild(n);d.appendChild(pr);d.appendChild(de);sub.parentNode.replaceChild(d,sub);
  }
  // căn cột ma trận theo columnalign của MathJax (hệ: căn trái)
  byTag(doc,M_NS,'m').forEach((mat,i)=>{
    const rowsEl=kids(mat).filter(n=>n.localName==='mr');const cols=Math.max(1,...rowsEl.map(r=>kids(r).filter(n=>n.localName==='e').length));
    const inSystem=mat.parentNode&&mat.parentNode.localName==='e'&&mat.parentNode.parentNode&&mat.parentNode.parentNode.localName==='d';
    const list=(info.aligns[i]||(inSystem?'left':'center')).split(/\s+/).filter(Boolean);
    let mPr=kids(mat).find(n=>n.localName==='mPr');if(!mPr){mPr=mEl(doc,'mPr');mat.insertBefore(mPr,mat.firstChild)}
    for(const old of kids(mPr).filter(n=>n.localName==='mcs'))mPr.removeChild(old);
    const mcs=mEl(doc,'mcs');for(let c=0;c<cols;c++){const mc=mEl(doc,'mc'),pr=mEl(doc,'mcPr');pr.appendChild(mEl(doc,'count','1'));pr.appendChild(mEl(doc,'mcJc',list[Math.min(c,list.length-1)]||'left'));mc.appendChild(pr);mcs.appendChild(mc)}
    mPr.appendChild(mcs);
  });
  // bỏ run rỗng
  for(const r of byTag(doc,M_NS,'r'))if(!r.textContent&&!byTag(r,M_NS,'t').some(t=>t.textContent))r.parentNode.removeChild(r);
  return new env.XMLSerializer().serializeToString(doc.documentElement);
}

/* =====================================================================
 * 4. Bộ xuất .docx
 * ===================================================================== */
function zip(files){
  const enc=new TextEncoder(),parts=[],central=[];let offset=0;const table=new Uint32Array(256);
  for(let n=0;n<256;n++){let c=n;for(let k=0;k<8;k++)c=(c&1)?0xedb88320^(c>>>1):c>>>1;table[n]=c>>>0}
  const crc=b=>{let c=0xffffffff;for(const x of b)c=table[(c^x)&255]^(c>>>8);return(c^0xffffffff)>>>0};
  for(const [name,value] of Object.entries(files)){
    const path=enc.encode(name),data=typeof value==='string'?enc.encode(value):value,sum=crc(data);
    const loc=new Uint8Array(30+path.length),lv=new DataView(loc.buffer);lv.setUint32(0,0x04034b50,true);lv.setUint16(4,20,true);lv.setUint16(6,0x800,true);lv.setUint32(14,sum,true);lv.setUint32(18,data.length,true);lv.setUint32(22,data.length,true);lv.setUint16(26,path.length,true);loc.set(path,30);parts.push(loc,data);
    const head=new Uint8Array(46+path.length),dv=new DataView(head.buffer);dv.setUint32(0,0x02014b50,true);dv.setUint16(4,20,true);dv.setUint16(6,20,true);dv.setUint16(8,0x800,true);dv.setUint32(16,sum,true);dv.setUint32(20,data.length,true);dv.setUint32(24,data.length,true);dv.setUint16(28,path.length,true);dv.setUint32(42,offset,true);head.set(path,46);central.push(head);offset+=loc.length+data.length;
  }
  const size=central.reduce((a,p)=>a+p.length,0),end=new Uint8Array(22),ev=new DataView(end.buffer);ev.setUint32(0,0x06054b50,true);ev.setUint16(8,central.length,true);ev.setUint16(10,central.length,true);ev.setUint32(12,size,true);ev.setUint32(16,offset,true);
  const res=new Uint8Array(offset+size+22);let p=0;for(const part of [...parts,...central,end]){res.set(part,p);p+=part.length}return res;
}
function createExporter(opts={}){
  const env={DOMParser:opts.DOMParser||root.DOMParser,XMLSerializer:opts.XMLSerializer||root.XMLSerializer};
  const font=opts.font||'Times New Roman',size=opts.size||13;
  const st={equations:0,systems:0,errors:[]};
  let conv=opts.mml2omml||null;
  async function tex2mml(tex,display){
    if(opts.tex2mml)return opts.tex2mml(tex,display);
    const MJ=root.MathJax;if(!MJ||!MJ.tex2mmlPromise)throw Error('MathJax chưa sẵn sàng (cần MathJax 3, ví dụ tex-svg.js).');
    if(MJ.startup&&MJ.startup.promise)await MJ.startup.promise;return MJ.tex2mmlPromise(tex,{display});
  }
  async function mml2omml(mml){
    if(!conv){try{conv=(await import('https://cdn.jsdelivr.net/npm/mathml2omml@0.5.0/+esm')).mml2omml}catch(e){throw Error('Không tải được bộ chuyển Equation (mathml2omml). Kiểm tra Internet.')}}
    return conv(mml,{disableDecode:true});
  }
  async function math(tex,display=false){
    const clean=normalizeSystemsTex(tex).trim();if(!clean)return '';
    const mml=await tex2mml(clean,display);
    if(/<merror\b/.test(mml)){st.errors.push(clean);return run(display?'$$'+tex+'$$':'$'+tex+'$',{color:'C00000'})}
    const info=markFences(mml,env);const omml=fixOmml(await mml2omml(info.mathml),info,env);st.equations++;st.systems+=info.fences.filter(f=>!f.close&&(f.open==='{'||f.open==='[')).length;return omml;
  }
  function run(text,f={}){
    if(!text)return '';const p=(f.bold?'<w:b/>':'')+(f.italic?'<w:i/>':'')+(f.underline?'<w:u w:val="single"/>':'')+(f.color?'<w:color w:val="'+f.color+'"/>':'');
    return text.split('\n').map((t,i)=>(i?'<w:r><w:br/></w:r>':'')+(t?'<w:r>'+(p?'<w:rPr>'+p+'</w:rPr>':'')+'<w:t xml:space="preserve">'+xmlEsc(t)+'</w:t></w:r>':'')).join('');
  }
  function paragraph(runs,o={}){
    const p=(o.style?'<w:pStyle w:val="'+xmlEsc(o.style)+'"/>':'')+(o.keepNext?'<w:keepNext/>':'')+(o.align?'<w:jc w:val="'+o.align+'"/>':'')+'<w:spacing w:after="80" w:line="276" w:lineRule="auto"/>';
    return '<w:p><w:pPr>'+p+'</w:pPr>'+runs+'</w:p>';
  }
  async function inline(text,f={}){ // văn bản có $…$, \(…\), $$…$$, \[…\] và **đậm**, *nghiêng*
    const s=normalizeText(text);let out='',last=0,m;MATH_RE.lastIndex=0;const re=new RegExp(MATH_RE.source,'g');
    while((m=re.exec(s))){
      let before=s.slice(last,m.index);const tok=m[0],display=tok.startsWith('$$')||tok.startsWith('\\['),d=tok.startsWith('$$')?2:tok.startsWith('$')?1:2;let tex=tok.slice(d,-d);
      if(/^[\^_]/.test(tex)){const u=before.match(/([A-Za-z]+)$/);if(u){before=before.slice(0,-u[1].length);tex=(u[1].length===1?u[1]:'\\mathrm{'+u[1]+'}')+tex}} // cm$^2$
      out+=styled(before,f)+await math(tex,display);last=re.lastIndex;
    }
    return out+styled(s.slice(last),f);
  }
  function styled(text,f){let out='';const re=/\*\*([^*]+)\*\*|(?<![*\w])\*([^*\n]+)\*(?!\*)/g;let last=0,m;while((m=re.exec(text))){out+=run(text.slice(last,m.index),f)+run(m[1]||m[2],{...f,bold:f.bold||!!m[1],italic:f.italic||!!m[2]});last=re.lastIndex}return out+run(text.slice(last),f)}
  async function displayMath(tex,o={}){return '<w:p><w:pPr><w:jc w:val="center"/></w:pPr><m:oMathPara><m:oMathParaPr><m:jc m:val="center"/></m:oMathParaPr>'+await math(tex,true)+'</m:oMathPara></w:p>'}
  async function fromMarkdown(md){ // Markdown gọn: # tiêu đề, đoạn, - gạch đầu dòng, 1. đánh số, $$…$$ riêng dòng
    const lines=normalizeText(md).split('\n');let body='',buf=[];
    const flush=async()=>{if(buf.length){body+=paragraph(await inline(buf.join('\n')));buf=[]}};
    for(let i=0;i<lines.length;i++){
      const l=lines[i],t=l.trim();
      if(!t){await flush();continue}
      if(/^\$\$/.test(t)){await flush();let blk=t;while(!/\$\$\s*$/.test(blk.slice(2))||blk.length<4){if(++i>=lines.length)break;blk+='\n'+lines[i]}body+=await displayMath(blk.trim().replace(/^\$\$|\$\$$/g,''));continue}
      const h=t.match(/^(#{1,3})\s+(.*)$/);if(h){await flush();body+=paragraph(await inline(h[2],{bold:true}),{style:'Heading'+h[1].length,keepNext:true});continue}
      const li=t.match(/^([-*+]|\d+[.)])\s+(.*)$/);if(li){await flush();body+=paragraph(run(/\d/.test(li[1])?li[1]+' ':'• ')+await inline(li[2]),{});continue}
      buf.push(l);
    }
    await flush();return body;
  }
  function build(bodyXml){
    const H='<?xml version="1.0" encoding="UTF-8" standalone="yes"?>',half=Math.round(size*2);
    const document=H+'<w:document xmlns:w="'+W_NS+'" xmlns:m="'+M_NS+'" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><w:body>'+bodyXml+'<w:sectPr><w:pgSz w:w="11906" w:h="16838"/><w:pgMar w:top="1134" w:right="1134" w:bottom="1134" w:left="1134" w:header="500" w:footer="500"/></w:sectPr></w:body></w:document>';
    const doc=new env.DOMParser().parseFromString(document,'application/xml');if(doc.getElementsByTagName('parsererror').length)throw Error('XML của Word chưa hợp lệ.');
    const heading=(id,name,sz)=>'<w:style w:type="paragraph" w:styleId="'+id+'"><w:name w:val="'+name+'"/><w:basedOn w:val="Normal"/><w:next w:val="Normal"/><w:pPr><w:keepNext/><w:spacing w:before="160" w:after="100"/></w:pPr><w:rPr><w:b/><w:sz w:val="'+sz+'"/></w:rPr></w:style>';
    const styles=H+'<w:styles xmlns:w="'+W_NS+'"><w:docDefaults><w:rPrDefault><w:rPr><w:rFonts w:ascii="'+font+'" w:hAnsi="'+font+'" w:eastAsia="'+font+'" w:cs="'+font+'"/><w:sz w:val="'+half+'"/><w:szCs w:val="'+half+'"/><w:lang w:val="vi-VN"/></w:rPr></w:rPrDefault></w:docDefaults><w:style w:type="paragraph" w:default="1" w:styleId="Normal"><w:name w:val="Normal"/></w:style>'+heading('Heading1','heading 1',half+6)+heading('Heading2','heading 2',half+4)+heading('Heading3','heading 3',half+2)+'</w:styles>';
    return zip({
      '[Content_Types].xml':H+'<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/><Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/><Override PartName="/word/settings.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.settings+xml"/></Types>',
      '_rels/.rels':H+'<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/></Relationships>',
      'word/document.xml':document,'word/styles.xml':styles,
      'word/settings.xml':H+'<w:settings xmlns:w="'+W_NS+'" xmlns:m="'+M_NS+'"><m:mathPr><m:mathFont m:val="Cambria Math"/><m:defJc m:val="centerGroup"/></m:mathPr></w:settings>',
      'word/_rels/document.xml.rels':H+'<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rIdStyles" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/><Relationship Id="rIdSettings" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/settings" Target="settings.xml"/></Relationships>'
    });
  }
  async function markdownToDocx(md){return build(await fromMarkdown(md))}
  return {math,inline,run,paragraph,displayMath,fromMarkdown,build,markdownToDocx,stats:st};
}
const api={normalizeSystemsTex,normalizeText,createExporter,zip,xmlEsc};
root.WordEquation=api;if(typeof module!=='undefined'&&module.exports)module.exports=api;
})(typeof globalThis!=='undefined'?globalThis:window);
