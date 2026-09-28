// Kiểm tra đại số lớp 8: đáp án đúng bằng biểu thức đề, phương án sai KHÔNG bằng; ô trống tính đúng. Chạy: node tools/verify8.js
global.window={};global.document={};
const fs=require('fs');eval(fs.readFileSync('assets/js/core.js','utf8')+fs.readFileSync('assets/js/figures.js','utf8')+fs.readFileSync('data/lop8.js','utf8')+';global.App=App');
function toJS(t){ t=t.replace(/\\cdot/g,'*').replace(/\\left|\\right/g,'').replace(/\s+/g,'').replace(/\^\{(\d+)\}/g,'^$1');
  let out='',prev='';
  for(const c of t){ const cur=/[0-9]/.test(c)?'d':/[xy]/.test(c)?'v':c==='('?'(':c===')'?')':c;
    if((prev==='d'||prev==='v'||prev===')')&&(cur==='v'||cur==='(')) out+='*';
    if(prev==='v'&&cur==='d'&&out.slice(-1)!=='^') out+='*';
    out+= c==='^'?'**':c; prev=cur; }
  return out; }
const mathOf=s=>{const m=s.match(/\\\((.*?)\\\)|\\\[(.*?)\\\]/);return m?(m[1]||m[2]):null};
const ev=(e,x,y)=>Function('x','y','return '+toJS(e))(x,y);
const g=App.grades[0];let bad=[],n=0;
for(const L of g.lessons)for(let lv=1;lv<=3;lv++)for(let r=0;r<300;r++)for(const f of L.gens){const q=f(lv);if(q.kind!=='choice')continue;
  const m=[...q.text.matchAll(/\\\((.*?)\\\)|\\\[(.*?)\\\]/g)].map(x=>x[1]||x[2]).filter(x=>/[xy]/.test(x)); if(!m.length)continue; const E=m[0].replace(/^A = |^B = /,'');
  n++; const pts=[[1.3,0.7],[2.1,-1.4],[-0.6,2.2]];
  const val=o=>pts.map(([x,y])=>ev(mathOf(o),x,y));
  try{ const ve=pts.map(([x,y])=>ev(E,x,y));
    q.opts.forEach((o,i)=>{const vo=val(o);const eq=vo.every((v,k)=>Math.abs(v-ve[k])<1e-6*Math.max(1,Math.abs(ve[k])));
      if((i===q.correct)!==eq) bad.push([L.id,lv,f.name,i===q.correct?'ĐÚNG mà không bằng':'SAI mà lại bằng',E,mathOf(o)]);});
  }catch(e){bad.push([L.id,lv,f.name,'parse',E,String(e).slice(0,60)])}}
console.log('checked',n,'bad',bad.length);const c={};bad.forEach(b=>{const k=b[2]+' '+b[3]+' lv'+b[1];c[k]=(c[k]||0)+1});console.log(c);console.log(bad.filter(b=>b[2]!=='g9a').slice(0,8));
let bad2=[],n2=0;
for(const L of g.lessons)for(let lv=1;lv<=3;lv++)for(let r=0;r<300;r++)for(const f of L.gens){const q=f(lv);if(q.kind!=='blanks')continue;
  const ms=[...q.text.matchAll(/\\\((.*?)\\\)|\\\[(.*?)\\\]/g)].map(x=>x[1]||x[2]);
  const d=ms.find(x=>/^[AB] = /.test(x)); const eq0=ms.find(x=>/= 0$/.test(x));
  try{
  if(d){ const E=d.slice(4); const xm=q.text.match(/x = (-?\d+)/); n2++;
    const xs=xm?[+xm[1]]:[1.7,-2.3]; xs.forEach(x=>{const v=ev(E,x,0); if(Math.abs(v-q.ans[0])>1e-6) bad2.push([f.name,lv,E,x,v,q.ans[0]])}); }
  else if(eq0 && f.name==='g9d'){ n2++; const E=eq0.replace(/ = 0$/,''); q.ans.forEach(x=>{ if(Math.abs(ev(E,x,0))>1e-9) bad2.push([f.name,lv,E,x]) }); }
  }catch(e){bad2.push([f.name,'parse',String(e).slice(0,50)])}}
console.log('blanks checked',n2,'bad',bad2.length,bad2.slice(0,5));
