/* =====================================================================
   DỮ LIỆU LỚP 11 – Toán, Kết nối tri thức
   Chương I. Hàm số lượng giác và phương trình lượng giác
   Bài 1 Giá trị lượng giác của góc lượng giác · Bài 2 Công thức lượng giác
   Bài 3 Hàm số lượng giác · Bài 4 Phương trình lượng giác cơ bản
   Góc được tính bằng "đơn vị" U = 1/12 độ (π = 2160 U) để mọi phép chia đều chính xác.
   ===================================================================== */
(() => {
const G = App.addGrade({
  id: 'lop11', name: 'Lớp 11', subject: 'Toán', book: 'Kết nối tri thức',
  topics: [ {id:1, hk:1, name:'Hàm số lượng giác và phương trình lượng giác'} ],
});
const lesson = G.lesson;

/* ---------- Tiện ích (LaTeX) ---------- */
const M = '−';                                            // dấu trừ trong khoá nội bộ của bảng giá trị (KV)
const sR = (a,b) => pick([-1,1])*R(a,b);
const PI = 2160, P2 = 4320, D = 12;                     // π, 2π, 1°
const mod = (u,m) => ((u % m) + m) % m;
const piStr = u => { if(u===0) return '0'; const g=gcd(Math.abs(u),PI), p=u/g, q=PI/g, s=p<0?'-':'', a=Math.abs(p);
  return q===1 ? s+(a===1?'':a)+'\\pi' : s+tf((a===1?'':a)+'\\pi', q); };
const degStr = u => `${u/D}^\\circ`;
const rad = u => u/PI*Math.PI;
const fr = tfrac;
const RA = '\;\\Rightarrow\;', EQ = '\;\\Leftrightarrow\;', KZ = '\\ (k \\in \\mathbb{Z})';
// Bảng giá trị đặc biệt (khoá nội bộ dạng chữ, valH đổi sang LaTeX)
const S3=Math.sqrt(3), S2=Math.SQRT2, S6=Math.sqrt(6);
const KV = {'0':0,'1/2':.5,'√2/2':S2/2,'√3/2':S3/2,'1':1,'√3/3':S3/3,'√3':S3,'3/2':1.5,'√6/2':S6/2,'2':2,
  '(√6+√2)/4':(S6+S2)/4,'(√6−√2)/4':(S6-S2)/4,'2+√3':2+S3,'2−√3':2-S3};
const keyOf = v => { if(!isFinite(v)||Math.abs(v)>1e6) return null; for(const k in KV) if(Math.abs(KV[k]-Math.abs(v))<1e-9) return (v<-1e-9?M:'')+k; return null; };
const sq = t => t.replace(/√(\d+)/g,'\\sqrt{$1}').replace(/−/g,'-');
const valH = k => { const s=k.startsWith(M), b=s?k.slice(1):k; let h;
  if(b.startsWith('(')){ const [n,d]=b.slice(1).split(')/'); h=tf(sq(n),d); }
  else if(b.includes('/')){ const [n,d]=b.split('/'); h=tf(sq(n),d); } else h=sq(b);
  return (s?'-':'')+h; };
const FN = { sin:u=>Math.sin(rad(u)), cos:u=>Math.cos(rad(u)), tan:u=>Math.abs(Math.cos(rad(u)))<1e-12?Infinity:Math.tan(rad(u)), cot:u=>Math.abs(Math.sin(rad(u)))<1e-12?Infinity:1/Math.tan(rad(u)) };
const SC_KEYS = ['0','1/2','√2/2','√3/2','1'], T_KEYS = ['0','√3/3','1','√3'];
const withNeg = ks => ks.flatMap(k=>k==='0'?[k]:[k,M+k]);
const distractKeys = (good, pool) => { const c=withNeg(pool).filter(k=>k!==good); const opp=good.startsWith(M)?good.slice(1):M+good;
  return [...new Set([...(c.includes(opp)?[opp]:[]), ...shuffle(c)])].slice(0,3); };
const QUAD = ['','0 \\lt \\alpha \\lt '+piStr(PI/2), piStr(PI/2)+' \\lt \\alpha \\lt \\pi', '\\pi \\lt \\alpha \\lt '+piStr(3*PI/2), piStr(3*PI/2)+' \\lt \\alpha \\lt 2\\pi'];
const ROMAN = ['','I','II','III','IV'];
const SIGN = {sin:[0,1,1,-1,-1], cos:[0,1,-1,-1,1], tan:[0,1,-1,1,-1], cot:[0,1,-1,1,-1]};
const TRIP = [[3,4,5],[5,12,13],[8,15,17],[7,24,25],[20,21,29]];
const fn = f => '\\'+f;                                   // \sin, \cos, \tan, \cot
const FB = v => `<span class="eq">${tm(v+' =')} [F]</span>`;

/* =====================================================================
   BÀI 1. GIÁ TRỊ LƯỢNG GIÁC CỦA GÓC LƯỢNG GIÁC
   ===================================================================== */
const g1a = lv => {   // độ ↔ radian, độ dài cung
  if(lv<3){ const degs=lv===1?[30,45,60,90,120,135,150,180,270,360]:[-150,-135,-120,-60,-45,210,225,240,300,315,330,405,480,540,-210];
    const d=pick(degs), u=d*D;
    if(Math.random()<.5){ const W=shuffle(degs.filter(x=>x!==d)).slice(0,3).map(x=>piStr(x*D));
      return QC({text:`Đổi số đo góc ${tm(degStr(u))} sang radian.`, opts:[piStr(u),...W].map(tm), ans:tm(piStr(u)),
        hint:`Dùng ${tm('180^\\circ = \\pi')} rad, tức là nhân số đo độ với ${tm(tf('\\pi','180'))}.`, sol:`${tm(`${degStr(u)} = ${d}\\cdot${tf('\\pi','180')}`)} = ${tb(piStr(u))}.`}); }
    return QB({text:`Đổi số đo góc ${tm(piStr(u))} sang độ.`, tpl:'[_] độ', ans:[d],
      hint:`Thay ${tm('\\pi')} bằng ${tm('180^\\circ')} rồi tính.`, sol:`${tm(piStr(u))} = ${tb(degStr(u))}.`}); }
  const q=pick([2,3,4,6]), p=R(1,2*q-1), k=R(1,4), Rr=q*k, l=p*k;   // α = pπ/q, R = q·k ⇒ l = pk·π
  if(gcd(p,q)!==1) return g1a(lv);
  const deg=Math.random()<.5, A=piStr(p*PI/q);
  return QB({text:`Một đường tròn có bán kính <b>${Rr} cm</b>. Tính độ dài cung tròn có số đo ${tm(deg?degStr(p*PI/q):A)}.`, tpl:`[_]${tm('\\pi')} cm`, ans:[l],
    hint:`Độ dài cung ${tm('l = R\\alpha')}, với ${tm('\\alpha')} đo bằng radian.`, sol:`${deg?`${tm(`${degStr(p*PI/q)} = ${A}`)}. `:''}${tm(`l = ${Rr}\\cdot ${A} = ${l===1?'':l}\\pi`)}. Đáp số: ${tb(`${l===1?'':l}\\pi`)} cm.`});
};
const g1b = lv => {   // cùng điểm biểu diễn
  if(lv<3){ const b=5*R(1,71), k=R(1,4), a=lv===1?b+360*k:b-360*k;
    return QB({text:`Góc lượng giác có số đo ${tm(`${a}^\\circ`)} có cùng điểm biểu diễn trên đường tròn lượng giác với góc có số đo ${tm('\\beta')}, ${tm('0^\\circ \\le \\beta \\lt 360^\\circ')}. Tìm ${tm('\\beta')}.`, tpl:`${tm('\\beta =')} [_] độ`, ans:[b],
      hint:`Hai góc có cùng điểm biểu diễn khi hơn kém nhau một bội của ${tm('360^\\circ')}. Cộng hoặc trừ ${tm('360^\\circ')} nhiều lần.`, sol:`${tm(`${a}^\\circ = ${b}^\\circ ${lv===1?'+':'-'} ${k}\\cdot 360^\\circ`)}. Vậy ${tb(`\\beta = ${b}^\\circ`)}.`}); }
  const q=pick([3,4,6]), p=R(0,2*q-1), k=sR(1,4), b=p*PI/q, a=b+k*P2;
  const good=piStr(b), W=[...new Set([b+PI,P2-b,b+PI/2,mod(-b,P2),mod(b+PI/q,P2)].map(x=>piStr(mod(x,P2))))].filter(s=>s!==good);
  return QC({text:`Góc lượng giác ${tm(piStr(a))} có cùng điểm biểu diễn với góc nào trong ${tm('[0;\\ 2\\pi)')}?`, opts:[good,...shuffle(W).slice(0,3)].map(tm), ans:tm(good),
    hint:`Cộng hoặc trừ một bội của ${tm('2\\pi')} để đưa số đo về nửa khoảng ${tm('[0;\\ 2\\pi)')}.`, sol:`${tm(`${piStr(a)} = ${good} ${k<0?'-':'+'} ${Math.abs(k)===1?'':Math.abs(k)+'\\cdot '}2\\pi`)}. Vậy góc cần tìm là ${tb(good)}.`});
};
const g1c = lv => {   // dấu các giá trị lượng giác
  const q=R(1,4); let cond;
  if(lv<3) cond=`Cho ${td(QUAD[q])}`;
  else { const b=R((q-1)*90+5,q*90-5), k=sR(1,5); cond=`Cho góc ${tm(`\\alpha = ${b+360*k}^\\circ`)}.`; }
  const st=[]; ['sin','cos','tan','cot'].forEach(f=>{ const s=SIGN[f][q]; st.push([`${fn(f)}\\alpha \\gt 0`,s>0],[`${fn(f)}\\alpha \\lt 0`,s<0]); });
  const T=shuffle(st.filter(x=>x[1])), Fa=shuffle(st.filter(x=>!x[1]));
  return QC({text:`${cond} Khẳng định nào sau đây <b>đúng</b>?`, opts:[T[0][0],...Fa.slice(0,3).map(x=>x[0])].map(tm), ans:tm(T[0][0]),
    hint:(lv===3?`Trừ bớt các bội của ${tm('360^\\circ')} để biết ${tm('\\alpha')} thuộc góc phần tư nào. `:'')+`Góc phần tư I: tất cả dương; II: chỉ ${tm('\\sin')} dương; III: ${tm('\\tan, \\cot')} dương; IV: chỉ ${tm('\\cos')} dương.`,
    sol:`Điểm biểu diễn ${tm('\\alpha')} thuộc góc phần tư thứ ${ROMAN[q]}, nên ${tb(T[0][0])}.`});
};
const g1d = lv => {   // giá trị lượng giác các góc đặc biệt
  let f,u,k;
  do{ f=pick(lv===1?['sin','cos']:lv===2?['sin','cos','tan']:['sin','cos','tan','cot']);
    const base=pick([0,30,45,60,90,120,135,150,180,210,225,240,270,300,315,330])*D;
    u=lv===1?base%PI+(base===PI?PI:0):lv===2?(Math.random()<.5?base:base-P2):base+sR(1,3)*P2;
    k=keyOf(FN[f](u)); }while(!k);
  const pool=f==='sin'||f==='cos'?SC_KEYS:T_KEYS, W=distractKeys(k,pool).map(valH), good=valH(k), u0=mod(u,P2);
  const ang=lv===1&&Math.random()<.4?degStr(u):u<0?`\\left(${piStr(u)}\\right)`:piStr(u);
  return QC({text:`Tính giá trị: ${td(`${fn(f)} ${ang} = \\,?`)}`, opts:[good,...W].map(tm), ans:tm(good),
    hint:`Đưa về góc trong ${tm('[0;\\ 2\\pi)')} bằng cách bớt bội của ${tm('2\\pi')}, xét góc phần tư để lấy dấu, rồi dùng giá trị của góc đặc biệt ${tm(`0,\\ ${piStr(PI/6)},\\ ${piStr(PI/4)},\\ ${piStr(PI/3)},\\ ${piStr(PI/2)}`)}.`,
    sol:`${u!==u0?`${tm(`${fn(f)}\\left(${piStr(u)}\\right) = ${fn(f)} ${piStr(u0)}`)} (bớt bội của ${tm('2\\pi')}). `:''}${tm(`${fn(f)} ${piStr(u0)}`)} = ${tb(good)}.`});
};
const g1e = lv => {   // biết một GTLG, tính GTLG khác
  let [a,b,c]=pick(TRIP); if(Math.random()<.5)[a,b]=[b,a];
  const q=lv===1?1:R(2,4), s=SIGN.sin[q]*a, co=SIGN.cos[q]*b;         // sin α = s/c, cos α = co/c
  if(lv<3){ const giveSin=Math.random()<.5, gv=giveSin?s:co, ask=giveSin?'cos':'sin', av=giveSin?co:s;
    return QB({text:`Cho ${tm(`${fn(giveSin?'sin':'cos')}\\alpha = ${fr(gv,c)}`)} với ${td(QUAD[q])}Tính ${tm(`${fn(ask)}\\alpha`)}.`, tpl:FB(`${fn(ask)}\\alpha`), ans:[{frac:[av,c],mode:'eq'}],
      hint:`Dùng ${tm('\\sin^2\\alpha + \\cos^2\\alpha = 1')}, rồi xét dấu của ${tm(`${fn(ask)}\\alpha`)} theo góc phần tư.`,
      sol:`${tm(`${fn(ask)}^2\\alpha = 1 - \\left(${fr(gv,c)}\\right)^2 = ${tf(av*av,c*c)}${RA}${fn(ask)}\\alpha = \\pm${tf(Math.abs(av),c)}`)}. Vì ${tm('\\alpha')} thuộc góc phần tư ${ROMAN[q]} nên ${tm(`${fn(ask)}\\alpha ${av>0?'\\gt':'\\lt'} 0`)}: ${tb(`${fn(ask)}\\alpha = ${fr(av,c)}`)}.`}); }
  const ask=pick(['sin','cos']), av=ask==='sin'?s:co;
  return QB({text:`Cho ${tm(`\\tan\\alpha = ${fr(s,co)}`)} với ${td(QUAD[q])}Tính ${tm(`${fn(ask)}\\alpha`)}.`, tpl:FB(`${fn(ask)}\\alpha`), ans:[{frac:[av,c],mode:'eq'}],
    hint:`Dùng ${tm('1 + \\tan^2\\alpha = \\dfrac{1}{\\cos^2\\alpha}')} để tìm ${tm('\\cos\\alpha')} (xét dấu), rồi ${tm('\\sin\\alpha = \\tan\\alpha\\cdot\\cos\\alpha')}.`,
    sol:`${tm(`\\dfrac{1}{\\cos^2\\alpha} = 1 + \\left(${fr(s,co)}\\right)^2 = ${tf(c*c,b*b)}${RA}\\cos\\alpha = \\pm${tf(b,c)}`)}; theo góc phần tư, ${tm(`\\cos\\alpha = ${fr(co,c)}`)}${ask==='sin'?`, ${tm('\\sin\\alpha = \\tan\\alpha\\cdot\\cos\\alpha')}, nên ${tb(`\\sin\\alpha = ${fr(s,c)}`)}`:`, tức là ${tb(`\\cos\\alpha = ${fr(co,c)}`)}`}.`});
};

/* =====================================================================
   BÀI 2. CÔNG THỨC LƯỢNG GIÁC
   ===================================================================== */
const SPECIAL=[30,45,60,90,120,135,150];
const dg = n => `${n}^\\circ`;
const g2a = lv => {   // công thức cộng
  if(lv===1){ const t=pick(SPECIAL), form=pick(['sin+','sin-','cos+','cos-']); let a,b;
    do{ b=5*R(1,Math.floor((t-5)/5)); a=form.endsWith('+')?t-b:t+b }while(b===a||[30,45,60,90].includes(b));
    const f=form.slice(0,3), A=dg(a), B=dg(b);
    const expr=form==='sin+'?`\\sin ${A}\\cos ${B} + \\cos ${A}\\sin ${B}`:form==='sin-'?`\\sin ${A}\\cos ${B} - \\cos ${A}\\sin ${B}`:form==='cos+'?`\\cos ${A}\\cos ${B} - \\sin ${A}\\sin ${B}`:`\\cos ${A}\\cos ${B} + \\sin ${A}\\sin ${B}`;
    const k=keyOf(FN[f](t*D)), good=valH(k);
    return QC({text:`Tính: ${td(expr)}`, opts:[good,...distractKeys(k,SC_KEYS).map(valH)].map(tm), ans:tm(good),
      hint:`Nhận dạng công thức cộng: ${tm('\\sin(a \\pm b) = \\sin a\\cos b \\pm \\cos a\\sin b')}; ${tm('\\cos(a \\pm b) = \\cos a\\cos b \\mp \\sin a\\sin b')}.`,
      sol:`Biểu thức bằng ${tm(`${fn(f)}(${A} ${form.endsWith('+')?'+':'-'} ${B}) = ${fn(f)} ${dg(t)}`)} = ${tb(good)}.`}); }
  if(lv===2){ const d=pick([15,75,105,165]), f=pick(['sin','cos','tan']), u=d*D, k=keyOf(FN[f](u));
    const split={15:'45^\\circ - 30^\\circ',75:'45^\\circ + 30^\\circ',105:'60^\\circ + 45^\\circ',165:'120^\\circ + 45^\\circ'}[d];
    const pool=f==='tan'?['2+√3','2−√3','√3','1']:['(√6+√2)/4','(√6−√2)/4','√2/2','√3/2'];
    const opp=k.startsWith(M)?k.slice(1):M+k;
    const good=valH(k), W=[...new Set(withNeg(pool).filter(x=>x!==k))].sort((x,y)=>(y===opp)-(x===opp)).slice(0,3).map(valH);
    const ang=Math.random()<.5?dg(d):piStr(u);
    return QC({text:`Tính giá trị: ${td(`${fn(f)} ${ang} = \\,?`)}`, opts:[good,...W].map(tm), ans:tm(good),
      hint:`Viết ${tm(`${dg(d)} = ${split}`)} rồi áp dụng công thức cộng.`, sol:`${tm(`${fn(f)} ${dg(d)} = ${fn(f)}(${split})`)} = ${tb(good)}.`}); }
  let [x1,y1,r1]=pick(TRIP), [x2,y2,r2]=pick(TRIP); if(Math.random()<.5)[x1,y1]=[y1,x1]; if(Math.random()<.5)[x2,y2]=[y2,x2];
  const f=pick(['sin+','sin-','cos+','cos-']);
  const num={'sin+':x1*y2+y1*x2,'sin-':x1*y2-y1*x2,'cos+':y1*y2-x1*x2,'cos-':y1*y2+x1*x2}[f], den=r1*r2;
  const name={'sin+':'\\sin(a + b)','sin-':'\\sin(a - b)','cos+':'\\cos(a + b)','cos-':'\\cos(a - b)'}[f];
  const form={'sin+':'\\sin a\\cos b + \\cos a\\sin b','sin-':'\\sin a\\cos b - \\cos a\\sin b','cos+':'\\cos a\\cos b - \\sin a\\sin b','cos-':'\\cos a\\cos b + \\sin a\\sin b'}[f];
  return QB({text:`Cho ${tm('a, b')} là các góc nhọn với ${tm(`\\sin a = ${tf(x1,r1)}`)}, ${tm(`\\cos b = ${tf(y2,r2)}`)}. Tính ${tm(name)}.`, tpl:FB(name), ans:[{frac:[num,den],mode:'eq'}],
    hint:`Tính ${tm('\\cos a')} và ${tm('\\sin b')} trước (${tm('a, b')} nhọn nên đều dương), rồi dùng công thức cộng.`,
    sol:`${tm(`\\cos a = ${tf(y1,r1)},\\ \\sin b = ${tf(x2,r2)}`)}. ${tm(`${name} = ${form}`)} = ${tb(fr(num,den))}.`});
};
const g2b = lv => {   // công thức nhân đôi
  let [a,b,c]=pick(TRIP); if(Math.random()<.5)[a,b]=[b,a];
  if(lv===1){ const giveSin=Math.random()<.5, v=giveSin?a:b, num=giveSin?c*c-2*a*a:2*b*b-c*c, den=c*c;
    return QB({text:`Cho ${tm(`${fn(giveSin?'sin':'cos')}\\alpha = ${tf(v,c)}`)}. Tính ${tm('\\cos 2\\alpha')}.`, tpl:FB('\\cos 2\\alpha'), ans:[{frac:[num,den],mode:'eq'}],
      hint:giveSin?`Dùng ${tm('\\cos 2\\alpha = 1 - 2\\sin^2\\alpha')}.`:`Dùng ${tm('\\cos 2\\alpha = 2\\cos^2\\alpha - 1')}.`,
      sol:giveSin?`${tm(`\\cos 2\\alpha = 1 - 2\\cdot${tf(a*a,c*c)}`)} = ${tb(fr(num,den))}.`:`${tm(`\\cos 2\\alpha = 2\\cdot${tf(b*b,c*c)} - 1`)} = ${tb(fr(num,den))}.`}); }
  if(lv===2){ const q=R(1,4), s=SIGN.sin[q]*a, co=SIGN.cos[q]*b, num=2*s*co, den=c*c;
    return QB({text:`Cho ${tm(`\\sin\\alpha = ${fr(s,c)}`)} với ${td(QUAD[q])}Tính ${tm('\\sin 2\\alpha')}.`, tpl:FB('\\sin 2\\alpha'), ans:[{frac:[num,den],mode:'eq'}],
      hint:`Tìm ${tm('\\cos\\alpha')} (chú ý dấu theo góc phần tư), rồi dùng ${tm('\\sin 2\\alpha = 2\\sin\\alpha\\cos\\alpha')}.`,
      sol:`${tm(`\\cos\\alpha = ${fr(co,c)}`)}. ${tm(`\\sin 2\\alpha = 2\\cdot\\left(${fr(s,c)}\\right)\\cdot\\left(${fr(co,c)}\\right)`)} = ${tb(fr(num,den))}.`}); }
  let p,q; do{p=R(1,5);q=R(1,5)}while(p===q||gcd(p,q)!==1); const sg=pick([1,-1]); p*=sg;
  const ask=pick(['cos','sin','tan']), name=`${fn(ask)} 2\\alpha`;
  const [num,den]=ask==='cos'?[q*q-p*p,q*q+p*p]:ask==='sin'?[2*p*q,q*q+p*p]:[2*p*q,q*q-p*p];
  const F2={tan:tf('2t','1 - t^2'),cos:tf('1 - t^2','1 + t^2'),sin:tf('2t','1 + t^2')}[ask];
  return QB({text:`Cho ${tm(`\\tan\\alpha = ${fr(p,q)}`)}. Tính ${tm(name)}.`, tpl:FB(name), ans:[{frac:[num,den],mode:'eq'}],
    hint:`Với ${tm('t = \\tan\\alpha')}: ${tm(`${name} = ${F2}`)}.`,
    sol:`Với ${tm(`t = \\tan\\alpha = ${fr(p,q)}`)}: ${tm(`${name} = ${F2}`)} = ${tb(fr(num,den))}.`});
};
const kx = k => k===1?'x':`${k}x`;
const g2c = lv => {   // biến đổi tích ↔ tổng
  if(lv===1){ let a,b; do{a=R(2,6);b=R(1,5)}while(a<=b); const t=pick(['sc','cc','ss']);
    const L={sc:`2\\sin ${kx(a)}\\cos ${kx(b)}`,cc:`2\\cos ${kx(a)}\\cos ${kx(b)}`,ss:`2\\sin ${kx(a)}\\sin ${kx(b)}`}[t];
    const S=a+b, Dd=a-b, good={sc:`\\sin ${kx(S)} + \\sin ${kx(Dd)}`,cc:`\\cos ${kx(S)} + \\cos ${kx(Dd)}`,ss:`\\cos ${kx(Dd)} - \\cos ${kx(S)}`}[t];
    const all=[`\\sin ${kx(S)} + \\sin ${kx(Dd)}`,`\\cos ${kx(S)} + \\cos ${kx(Dd)}`,`\\cos ${kx(Dd)} - \\cos ${kx(S)}`,`\\cos ${kx(S)} - \\cos ${kx(Dd)}`,`\\sin ${kx(S)} - \\sin ${kx(Dd)}`];
    return QC({text:`Biến đổi thành tổng: ${td(L)}`, opts:[good,...shuffle(all.filter(x=>x!==good)).slice(0,3)].map(tm), ans:tm(good),
      hint:`${tm('2\\sin a\\cos b = \\sin(a + b) + \\sin(a - b)')}; ${tm('2\\cos a\\cos b = \\cos(a + b) + \\cos(a - b)')}; ${tm('2\\sin a\\sin b = \\cos(a - b) - \\cos(a + b)')}.`, sol:`${tm(L)} = ${tb(good)}.`}); }
  if(lv===2){ let a,b; do{a=R(2,9);b=R(1,7)}while(a<=b||(a-b)%2); const h=(a+b)/2, d=(a-b)/2, t=pick(['s+','s-','c+','c-']);
    const L={'s+':`\\sin ${kx(a)} + \\sin ${kx(b)}`,'s-':`\\sin ${kx(a)} - \\sin ${kx(b)}`,'c+':`\\cos ${kx(a)} + \\cos ${kx(b)}`,'c-':`\\cos ${kx(a)} - \\cos ${kx(b)}`}[t];
    const cand={'s+':`2\\sin ${kx(h)}\\cos ${kx(d)}`,'s-':`2\\cos ${kx(h)}\\sin ${kx(d)}`,'c+':`2\\cos ${kx(h)}\\cos ${kx(d)}`,'c-':`-2\\sin ${kx(h)}\\sin ${kx(d)}`};
    const good=cand[t], W=[...Object.values(cand).filter(x=>x!==good),`2\\sin ${kx(h)}\\sin ${kx(d)}`].filter(x=>x!==good);
    return QC({text:`Biến đổi thành tích: ${td(L)}`, opts:[good,...shuffle(W).slice(0,3)].map(tm), ans:tm(good),
      hint:`${tm('\\sin a + \\sin b = 2\\sin\\frac{a+b}{2}\\cos\\frac{a-b}{2}')}; ${tm('\\sin a - \\sin b = 2\\cos\\frac{a+b}{2}\\sin\\frac{a-b}{2}')}; ${tm('\\cos a + \\cos b = 2\\cos\\frac{a+b}{2}\\cos\\frac{a-b}{2}')}; ${tm('\\cos a - \\cos b = -2\\sin\\frac{a+b}{2}\\sin\\frac{a-b}{2}')}.`,
      sol:`${tm(L)} = ${tb(good)}.`}); }
  const [m,d]=pick([[45,30],[60,45],[60,30],[90,45],[90,30]]), A=m+d, B=m-d, t=pick(['s+','s-','c+','c-']);
  const val={'s+':Math.sin(rad(A*D))+Math.sin(rad(B*D)),'s-':Math.sin(rad(A*D))-Math.sin(rad(B*D)),'c+':Math.cos(rad(A*D))+Math.cos(rad(B*D)),'c-':Math.cos(rad(A*D))-Math.cos(rad(B*D))}[t];
  const k=keyOf(val); if(!k) return g2c(lv);
  const L={'s+':`\\sin ${dg(A)} + \\sin ${dg(B)}`,'s-':`\\sin ${dg(A)} - \\sin ${dg(B)}`,'c+':`\\cos ${dg(A)} + \\cos ${dg(B)}`,'c-':`\\cos ${dg(A)} - \\cos ${dg(B)}`}[t];
  const P={'s+':`2\\sin ${dg(m)}\\cos ${dg(d)}`,'s-':`2\\cos ${dg(m)}\\sin ${dg(d)}`,'c+':`2\\cos ${dg(m)}\\cos ${dg(d)}`,'c-':`-2\\sin ${dg(m)}\\sin ${dg(d)}`}[t];
  const good=valH(k), W=distractKeys(k,['0','1/2','√2/2','√3/2','1','√6/2','3/2']).map(valH);
  return QC({text:`Tính giá trị: ${td(L)}`, opts:[good,...W].map(tm), ans:tm(good),
    hint:`Biến tổng thành tích; ${tm('\\frac{a+b}{2}')} và ${tm('\\frac{a-b}{2}')} sẽ là các góc đặc biệt.`, sol:`${tm(`${L} = ${P}`)} = ${tb(good)}.`});
};

/* =====================================================================
   BÀI 3. HÀM SỐ LƯỢNG GIÁC
   ===================================================================== */
const Dm = c => `\\mathbb{R}\\setminus\\left\\{${c} \\mid k \\in \\mathbb{Z}\\right\\}`;
const DOMS = [
  [1,'y = \\tan x',Dm(`${piStr(PI/2)} + k\\pi`)],[1,'y = \\cot x',Dm('k\\pi')],[1,`y = ${tf(1,'\\sin x')}`,Dm('k\\pi')],[1,`y = ${tf(1,'\\cos x')}`,Dm(`${piStr(PI/2)} + k\\pi`)],
  [2,'y = \\tan 2x',Dm(`${piStr(PI/4)} + k${piStr(PI/2)}`)],[2,`y = \\cot\\left(x - ${piStr(PI/4)}\\right)`,Dm(`${piStr(PI/4)} + k\\pi`)],[2,'y = \\cot 3x',Dm(`k${piStr(PI/3)}`)],[2,`y = \\tan\\left(x + ${piStr(PI/3)}\\right)`,Dm(`${piStr(PI/6)} + k\\pi`)],
  [3,`y = ${tf(1,'\\sin x - 1')}`,Dm(`${piStr(PI/2)} + k2\\pi`)],[3,`y = ${tf(2,'\\cos x + 1')}`,Dm('\\pi + k2\\pi')],[3,`y = ${tf('\\sin x','1 - \\cos x')}`,Dm('k2\\pi')],[3,'y = \\sqrt{1 - \\cos x}','\\mathbb{R}'],[3,'y = \\sqrt{\\sin x + 2}','\\mathbb{R}'],
];
const g3a = lv => { const it=pick(DOMS.filter(d=>d[0]===lv)), good=it[2];
  const W=shuffle([...new Set(DOMS.map(d=>d[2]))].filter(x=>x!==good)).slice(0,3);
  return QC({text:`Tìm tập xác định ${tm('D')} của hàm số ${td(it[1])}`, opts:[good,...W].map(s=>tm('D = '+s)), ans:tm('D = '+good),
    hint:`${tm('\\tan u')} xác định khi ${tm('\\cos u \\ne 0')} (${tm(`u \\ne ${piStr(PI/2)} + k\\pi`)}); ${tm('\\cot u')} xác định khi ${tm('\\sin u \\ne 0')} (${tm('u \\ne k\\pi')}); phân thức cần mẫu khác 0; căn bậc hai cần biểu thức dưới căn ${tm('\\ge 0')}.`,
    sol:`${tb('D = '+good)}.`}); };
const PAR = [
  [1,'y = \\sin x','lẻ'],[1,'y = \\cos x','chẵn'],[1,'y = \\tan x','lẻ'],[1,'y = \\cot x','lẻ'],
  [2,'y = x\\sin x','chẵn'],[2,'y = \\sin^2 x','chẵn'],[2,'y = \\sin x\\cos x','lẻ'],[2,'y = \\cos 2x','chẵn'],[2,'y = \\sin x + \\cos x','không chẵn, không lẻ'],[2,'y = x^2\\cos x','chẵn'],
  [3,'y = x^3 + \\sin x','lẻ'],[3,'y = \\sin x - 1','không chẵn, không lẻ'],[3,'y = |\\sin x|','chẵn'],[3,'y = \\tan x + \\sin 2x','lẻ'],[3,'y = \\cos x + x','không chẵn, không lẻ'],[3,'y = \\sin x\\cos^2 x','lẻ'],[3,'y = x + \\tan x','lẻ'],
];
const g3b = lv => { const it=pick(PAR.filter(p=>p[0]===lv||(lv===3&&p[0]===2&&Math.random()<.3)));
  const opts=['Hàm số chẵn','Hàm số lẻ','Hàm số không chẵn, không lẻ'], ans='Hàm số '+it[2];
  return QC({text:`Xét tính chẵn, lẻ của hàm số ${td(it[1])}`, opts, ans, keepOrder:true,
    hint:`Tập xác định đối xứng. Tính ${tm('f(-x)')}: nếu ${tm('f(-x) = f(x)')} thì chẵn; ${tm('f(-x) = -f(x)')} thì lẻ. Nhớ: ${tm('\\sin, \\tan, \\cot')} lẻ; ${tm('\\cos')} chẵn.`,
    sol:`Tính ${tm('f(-x)')} và so sánh với ${tm('f(x)')}: hàm số đã cho là <b>hàm số ${it[2]}</b>.`}); };
const g3c = lv => {   // chu kì
  let fnS,T,why;
  if(lv===1){ const a=pick([2,3,4,5]), f=pick(['sin','cos','tan']); fnS=`y = ${fn(f)} ${a}x`; T=(f==='tan'?PI:P2)/a; why=`${tm(`T = ${tf(f==='tan'?'\\pi':'2\\pi',a)}`)}`; }
  else if(lv===2){ const a=pick([2,3,4]), A=R(2,5), c=R(-3,3), b=pick([PI/3,PI/4,PI/6]), f=pick(['sin','cos']);
    fnS=`y = ${A}${fn(f)}\\left(${a}x ${Math.random()<.5?'+':'-'} ${piStr(b)}\\right)${c?` ${c<0?'-':'+'} ${Math.abs(c)}`:''}`; T=P2/a; why=`Hệ số của ${tm('x')} là ${a} nên ${tm(`T = ${tf('2\\pi',a)}`)}`; }
  else { const t=pick([['y = \\sin^2 x',PI,'\\sin^2 x = \\frac{1 - \\cos 2x}{2}'],['y = \\cos^2 2x',PI/2,'\\cos^2 2x = \\frac{1 + \\cos 4x}{2}'],['y = \\sin x\\cos x',PI,'\\sin x\\cos x = \\tfrac{1}{2}\\sin 2x'],['y = \\tan\\frac{x}{2}',P2,'T = \\pi : \\tfrac{1}{2}'],['y = \\cos\\frac{x}{2}',2*P2,'T = 2\\pi : \\tfrac{1}{2}']]);
    fnS=t[0]; T=t[1]; why=tm(t[2]); }
  const good=piStr(T), W=[...new Set([T*2,T/2,T*4,PI,P2,PI/2].map(piStr))].filter(s=>s!==good);
  return QC({text:`Tìm chu kì tuần hoàn của hàm số ${td(fnS)}`, opts:[good,...shuffle(W).slice(0,3)].map(tm), ans:tm(good),
    hint:`${tm('y = \\sin(ax + b),\\ \\cos(ax + b)')} có chu kì ${tm('\\frac{2\\pi}{|a|}')}; ${tm('y = \\tan(ax + b),\\ \\cot(ax + b)')} có chu kì ${tm('\\frac{\\pi}{|a|}')}. Với ${tm('\\sin^2, \\cos^2')} hãy hạ bậc trước.`,
    sol:`${why}. Chu kì ${tb(`T = ${good}`)}.`}); };
const g3d = lv => {   // GTLN, GTNN
  let fnS,mx,mn,why;
  if(lv<3){ const k=lv===1?R(2,6):sR(2,6), c=R(-5,6), f=pick(['\\sin x','\\cos x',...(lv===2?['\\sin 2x',`\\cos\\left(x - ${piStr(PI/3)}\\right)`]:[])]);
    fnS=c?`y = ${c} ${k<0?'-':'+'} ${Math.abs(k)}${f}`:`y = ${k<0?'-':''}${Math.abs(k)}${f}`;
    mx=Math.abs(k)+c; mn=c-Math.abs(k); why=`Vì ${tm(`-1 \\le ${f} \\le 1`)} nên ${tm(`${mn} \\le y \\le ${mx}`)}.`; }
  else { const k=sR(2,6), c=R(-4,6), f=pick(['\\sin^2 x','\\cos^2 x']);
    fnS=`y = ${k<0?'-':''}${Math.abs(k)}${f}${c?` ${c<0?'-':'+'} ${Math.abs(c)}`:''}`; mx=Math.max(k,0)+c; mn=Math.min(k,0)+c; why=`Vì ${tm(`0 \\le ${f} \\le 1`)} nên ${tm(`${mn} \\le y \\le ${mx}`)}.`; }
  return QB({text:`Tìm giá trị lớn nhất và giá trị nhỏ nhất của hàm số ${td(fnS)}`, tpl:'<span class="eq">GTLN = [_]</span><br><span class="eq">GTNN = [_]</span>', ans:[mx,mn],
    hint:lv<3?`Dùng ${tm('-1 \\le \\sin, \\cos \\le 1')} rồi nhân (chú ý hệ số âm thì đổi chiều) và cộng hằng số.`:`Dùng ${tm('0 \\le \\sin^2 x,\\ \\cos^2 x \\le 1')}.`,
    sol:`${why} GTLN ${tb(`= ${mx}`)}, GTNN ${tb(`= ${mn}`)}.`}); };

/* =====================================================================
   BÀI 4. PHƯƠNG TRÌNH LƯỢNG GIÁC CƠ BẢN
   ===================================================================== */
const ASIN={'0':0,'1/2':30,'√2/2':45,'√3/2':60,'1':90}, ACOS={'1':0,'√3/2':30,'√2/2':45,'1/2':60,'0':90}, ATAN={'0':0,'√3/3':30,'1':45,'√3':60};
// Nghiệm của f(t) = m: trả về {pm:[α,P]} hoặc {list:[[b,P],…]} (đơn vị U)
function solveT(f,key){ const s=key.startsWith(M), b=s?key.slice(1):key;
  if(f==='sin'){ const a=(s?-1:1)*ASIN[b]*D; if(b==='1') return {list:[[a,P2]]}; if(b==='0') return {list:[[0,PI]]}; return {list:[[a,P2],[PI-a,P2]]}; }
  if(f==='cos'){ const a=s?PI-ACOS[b]*D:ACOS[b]*D; if(b==='1') return {list:[[s?PI:0,P2]]}; if(b==='0') return {list:[[PI/2,PI]]}; return {pm:[a,P2]}; }
  if(f==='tan') return {list:[[(s?-1:1)*ATAN[b]*D,PI]]};
  const c={'0':90,'√3':30,'1':45,'√3/3':60}[b]; return {list:[[(s?-1:1)*c*D,PI]]}; }
// đổi từ t = a·x + b sang x
function toX(sol,a,b){ if(sol.pm&&b===0) return {pm:[sol.pm[0]/a,sol.pm[1]/a]};
  const L=sol.pm?[[sol.pm[0],sol.pm[1]],[-sol.pm[0],sol.pm[1]]]:sol.list; return {list:L.map(([t,P])=>[(t-b)/a,P/a])}; }
const per = P => P===P2?'k2\\pi':P===PI?'k\\pi':`k${piStr(P)}`;
const fam = (b,P) => b===0?per(P):`${piStr(b)} + ${per(P)}`;
const showSol = s => s.pm ? `x = \\pm ${piStr(s.pm[0])} + ${per(s.pm[1])}` : s.list.map(([b,P])=>`x = ${fam(b,P)}`).join(';\\quad ');
const argStr = (a,b) => { const ax=a===1?'x':`${a}x`; return b===0?ax:`${ax} ${b<0?'-':'+'} ${piStr(Math.abs(b))}`; };
const eqStr = (f,a,b,k) => `${fn(f)}${a===1&&b===0?' x':`\\left(${argStr(a,b)}\\right)`} = ${valH(k)}`;
const pickEq = lv => { let f,k;
  if(lv===1){ f=pick(['sin','cos']); k=pick(['1/2','√2/2','√3/2']); }
  else { f=pick(['sin','cos','tan','cot']); k=pick(f==='sin'||f==='cos'?withNeg(['1/2','√2/2','√3/2','1','0']):withNeg(['√3/3','1','√3','0'])); }
  const a=lv===3?pick([1,2,3]):1, b=lv===3?pick([PI/6,PI/4,PI/3])*pick([-1,1]):0; if(lv===3&&a===1&&Math.random()<.3) return pickEq(lv);
  return {f,k,a,b,sol:toX(solveT(f,k),a,b)}; };
const HINT4 = `${tm('\\sin u = \\sin\\alpha \\Leftrightarrow u = \\alpha + k2\\pi')} hoặc ${tm('u = \\pi - \\alpha + k2\\pi')}; ${tm('\\cos u = \\cos\\alpha \\Leftrightarrow u = \\pm\\alpha + k2\\pi')}; ${tm('\\tan u = \\tan\\alpha \\Leftrightarrow u = \\alpha + k\\pi')}; ${tm('\\cot u = \\cot\\alpha \\Leftrightarrow u = \\alpha + k\\pi')} ${tm('(k \\in \\mathbb{Z})')}.`;
const g4a = lv => { const {f,k,a,b,sol}=pickEq(lv), good=showSol(sol);
  const W=new Set(); const t0=solveT(f,k);
  const per2 = s => s.pm?{pm:[s.pm[0],s.pm[1]/2]}:{list:s.list.map(([x,P])=>[x,f==='tan'||f==='cot'?P*2:P/2])};
  W.add(showSol(per2(sol)));
  if(t0.pm) W.add(showSol(toX({list:[[t0.pm[0],P2],[PI-t0.pm[0],P2]]},a,b))); else if(t0.list.length===2) W.add(showSol(toX({pm:[t0.list[0][0],P2]},a,b)));
  const k2=(f==='tan'||f==='cot'?{'√3/3':'√3','√3':'√3/3','1':'√3','0':'1'}:{'1/2':'√3/2','√3/2':'1/2','√2/2':'√3/2','1':'1/2','0':'1/2'})[k.replace(M,'')]; if(k2) W.add(showSol(toX(solveT(f,(k.startsWith(M)?M:'')+k2),a,b)));
  if(a>1) W.add(showSol(toX(solveT(f,k),1,b)));
  W.add(showSol(toX(solveT(f==='sin'?'cos':f==='cos'?'sin':f==='tan'?'cot':'tan',k),a,b)));
  const flip = x => x.pm?{pm:[PI-x.pm[0],x.pm[1]]}:{list:x.list.map(([u,P])=>[-u,P])};
  W.add(showSol(flip(sol))); W.add(showSol(per2(flip(sol))));
  const Wl=[...W].filter(s=>s!==good);
  return QC({text:`Giải phương trình ${td(eqStr(f,a,b,k))}`, opts:[good,...shuffle(Wl).slice(0,3)].map(tm), ans:tm(good),
    hint:HINT4+(a>1||b?` Giải theo ${tm('u')} rồi chuyển vế, chia để tìm ${tm('x')}.`:''),
    sol:`Nghiệm: ${tb(good)} ${tm('(k \\in \\mathbb{Z})')}.`}); };
const countIn = (sol,L,Rr) => { const L2=sol.pm?[[sol.pm[0],sol.pm[1]],[-sol.pm[0],sol.pm[1]]]:sol.list, s=new Set();
  L2.forEach(([b,P])=>{ for(let k=-80;k<=80;k++){ const x=b+k*P; if(x>=L-1e-9&&x<=Rr+1e-9) s.add(Math.round(x*1000)); } }); return [...s].sort((u,v)=>u-v); };
const g4b = lv => { const {f,k,a,b,sol}=pickEq(lv);
  const [L,Rr]=lv===1?[0,P2]:lv===2?pick([[-PI,PI],[0,3*PI],[-PI,2*PI]]):pick([[0,PI],[0,P2],[-PI/2,PI]]);
  const xs=countIn(sol,L,Rr);
  return QB({text:`Phương trình ${td(eqStr(f,a,b,k))} có bao nhiêu nghiệm thuộc đoạn ${tm(`[{${piStr(L)}};\\ {${piStr(Rr)}}]`)}?`, tpl:'[_] nghiệm', ans:[xs.length],
    hint:`Viết công thức nghiệm, rồi với từng họ nghiệm tìm các số nguyên ${tm('k')} để ${tm('x')} nằm trong đoạn (hoặc dùng đường tròn lượng giác).`,
    sol:`${tm(showSol(sol))}. Các nghiệm thuộc đoạn: ${xs.length?tm(xs.map(x=>`{${piStr(x/1000)}}`).join(';\\ ')):'không có'}. Có ${tb(xs.length)} nghiệm.`}); };
const g4c = lv => {   // sin f = sin g, cos f = cos g
  if(lv===1){ const f=pick(['sin','cos','tan']), d=5*R(2,17);
    const good=f==='sin'?`x = ${dg(d)} + k360^\\circ;\\quad x = ${dg(180-d)} + k360^\\circ`:f==='cos'?`x = \\pm ${dg(d)} + k360^\\circ`:`x = ${dg(d)} + k180^\\circ`;
    const all=[`x = ${dg(d)} + k360^\\circ;\\quad x = ${dg(180-d)} + k360^\\circ`,`x = \\pm ${dg(d)} + k360^\\circ`,`x = ${dg(d)} + k180^\\circ`,`x = ${dg(d)} + k360^\\circ;\\quad x = ${dg(90-d)} + k360^\\circ`,`x = ${dg(d)} + k360^\\circ;\\quad x = -${dg(d)} + k180^\\circ`].filter(s=>s!==good);
    return QC({text:`Giải phương trình ${td(`${fn(f)} x = ${fn(f)} ${dg(d)}`)}`, opts:[good,...shuffle(all).slice(0,3)].map(tm), ans:tm(good),
      hint:`${tm('\\sin x = \\sin\\alpha \\Leftrightarrow x = \\alpha + k360^\\circ')} hoặc ${tm('x = 180^\\circ - \\alpha + k360^\\circ')}; ${tm('\\cos x = \\cos\\alpha \\Leftrightarrow x = \\pm\\alpha + k360^\\circ')}; ${tm('\\tan x = \\tan\\alpha \\Leftrightarrow x = \\alpha + k180^\\circ')}.`,
      sol:`Nghiệm: ${tb(good)} ${tm('(k \\in \\mathbb{Z})')}.`}); }
  let a,b; do{a=R(2,5);b=R(1,4)}while(a<=b||a+b>6);
  const ax=kx(a), bx=kx(b); let eq,good,W,why;
  const two = (s1,s2) => `${showSol(s1)};\\quad ${showSol(s2)}`;
  if(lv===2){ const f=pick(['sin','cos']); eq=`${fn(f)} ${ax} = ${fn(f)} ${bx}`;
    const A={list:[[0,P2/(a-b)]]}, Bc={list:[[0,P2/(a+b)]]}, Bs={list:[[PI/(a+b),P2/(a+b)]]};
    good=f==='cos'?two(A,Bc):two(A,Bs);
    W=[f==='cos'?two(A,Bs):two(A,Bc), two({list:[[0,PI/(a-b)]]},f==='cos'?Bc:Bs), showSol(A), two({list:[[0,P2/(a+b)]]},{list:[[PI/(a-b),P2/(a-b)]]})];
    why=f==='cos'?tm(`${ax} = \\pm ${bx} + k2\\pi`):`${tm(`${ax} = ${bx} + k2\\pi`)} hoặc ${tm(`${ax} = \\pi - ${bx} + k2\\pi`)}`; }
  else { eq=`\\sin ${ax} = \\cos ${bx}`;
    const A={list:[[PI/2/(a+b),P2/(a+b)]]}, B={list:[[PI/2/(a-b),P2/(a-b)]]};
    good=two(A,B);
    W=[two({list:[[PI/2/(a+b),PI/(a+b)]]},B), two(A,{list:[[-PI/2/(a-b),P2/(a-b)]]}), two({list:[[PI/(a+b),P2/(a+b)]]},{list:[[PI/(a-b),P2/(a-b)]]}), showSol(A)];
    why=`${tm(`\\cos ${bx} = \\sin\\left(${piStr(PI/2)} - ${bx}\\right)`)} nên ${tm(`${ax} = ${piStr(PI/2)} - ${bx} + k2\\pi`)} hoặc ${tm(`${ax} = ${piStr(PI/2)} + ${bx} + k2\\pi`)}`; }
  W=[...new Set(W)].filter(s=>s!==good);
  return QC({text:`Giải phương trình ${td(eq)}`, opts:[good,...shuffle(W).slice(0,3)].map(tm), ans:tm(good),
    hint:lv===3?`Đưa về cùng một hàm: ${tm('\\cos v = \\sin\\left(\\frac{\\pi}{2} - v\\right)')}, rồi dùng ${tm('\\sin u = \\sin v')}.`:`Dùng ${tm('\\sin u = \\sin v \\Leftrightarrow u = v + k2\\pi')} hoặc ${tm('u = \\pi - v + k2\\pi')}; ${tm('\\cos u = \\cos v \\Leftrightarrow u = \\pm v + k2\\pi')}. Sau đó chuyển vế, chia cho hệ số của ${tm('x')}.`,
    sol:`${why}. Vậy ${tb(good)} ${tm('(k \\in \\mathbb{Z})')}.`}); };

lesson(1,'gia-tri-luong-giac','Bài 1. Giá trị lượng giác của góc lượng giác','Đổi độ – radian, độ dài cung; điểm biểu diễn; dấu và giá trị lượng giác; tính GTLG khi biết một GTLG.',[g1a,g1b,g1c,g1d,g1e]);
lesson(1,'cong-thuc-luong-giac','Bài 2. Công thức lượng giác','Công thức cộng; công thức nhân đôi; biến đổi tích thành tổng và tổng thành tích.',[g2a,g2b,g2c]);
lesson(1,'ham-so-luong-giac','Bài 3. Hàm số lượng giác','Tập xác định; tính chẵn lẻ; chu kì tuần hoàn; giá trị lớn nhất, nhỏ nhất.',[g3a,g3b,g3c,g3d]);
lesson(1,'pt-luong-giac-co-ban','Bài 4. Phương trình lượng giác cơ bản','Công thức nghiệm sin, cos, tan, cot; số nghiệm trên một đoạn; phương trình đưa về dạng cơ bản.',[g4a,g4b,g4c]);
lesson(1,'on-tap-c1','Ôn tập chương I','Tổng hợp giá trị lượng giác, công thức, hàm số và phương trình lượng giác.',[g1d,g1e,g2a,g3d,g4a,g4b]);
})();
