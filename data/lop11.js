/* =====================================================================
   DỮ LIỆU LỚP 11 – Toán, Kết nối tri thức
   Chương I. Hàm số lượng giác và phương trình lượng giác
   Bài 1 Giá trị lượng giác của góc lượng giác · Bài 2 Công thức lượng giác
   Bài 3 Hàm số lượng giác · Bài 4 Phương trình lượng giác cơ bản
   Chương II. Dãy số. Cấp số cộng và cấp số nhân (Bài 5 · Bài 6 · Bài 7)
   Góc được tính bằng "đơn vị" U = 1/12 độ (π = 2160 U) để mọi phép chia đều chính xác.
   ===================================================================== */
(() => {
const G = App.addGrade({
  id: 'lop11', name: 'Lớp 11', subject: 'Toán', book: 'Kết nối tri thức',
  topics: [ {id:1, hk:1, name:'Hàm số lượng giác và phương trình lượng giác', label:'Chương I'}, {id:2, hk:1, name:'Dãy số. Cấp số cộng và cấp số nhân', label:'Chương II'}, {id:3, hk:1, name:'Ôn tập giữa học kì I (theo ma trận)', label:'📝 Giữa kì I', grp:'📝 Ôn tập · Củng cố · Kiểm tra'} ],
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
const RA = '\\;\\Rightarrow\\;', EQ = '\\;\\Leftrightarrow\\;', KZ = '\\ (k \\in \\mathbb{Z})';
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

/* =====================================================================
   ÔN TẬP CHƯƠNG I – các dạng tổng hợp (kết hợp nhiều bài)
   ===================================================================== */
const RAo = ` ${tm('\\Rightarrow')} `, EQo = ` ${tm('\\Leftrightarrow')} `;
const r3 = (p,q) => `${p} ${q<0?'-':'+'} ${Math.abs(q)===1?'':Math.abs(q)}\\sqrt{3}`;          // p + q√3
const fr3 = (p,q,den) => tf(r3(p,q), den);
const gO1 = lv => {   // biết một GTLG + góc phần tư → dùng công thức cộng
  let [a,b,c]=pick(TRIP); if(Math.random()<.5)[a,b]=[b,a];
  const q=lv===1?1:R(2,4), s=SIGN.sin[q]*a, co=SIGN.cos[q]*b;             // sin α = s/c, cos α = co/c
  const giveSin=lv===1?true:Math.random()<.5, gv=giveSin?s:co, other=giveSin?'cos':'sin', ov=giveSin?co:s;
  const given=`${tm(`${fn(giveSin?'sin':'cos')}\\alpha = ${fr(gv,c)}`)}${lv===1?` với ${tm(`0 \\lt \\alpha \\lt ${piStr(PI/2)}`)}`:` với ${tm(QUAD[q])}`}`;
  const step1=`${tm(`${fn(other)}^2\\alpha = 1 - ${tf(gv*gv,c*c)} = ${tf(ov*ov,c*c)}`)}; ${tm('\\alpha')} thuộc góc phần tư ${ROMAN[q]} nên ${tm(`${fn(other)}\\alpha = ${fr(ov,c)}`)}.`;
  if(lv<3){
    const F=pick(['sin','cos']), B=pick([PI/3,PI/6]), e=pick([1,-1]), bS=piStr(B), sg=e>0?'+':'-';
    let P,Q; if(F==='sin'){ if(B===PI/3){P=s;Q=e*co}else{P=e*co;Q=s} } else { if(B===PI/3){P=co;Q=-e*s}else{P=-e*s;Q=co} }
    const name=`${fn(F)}\\left(\\alpha ${sg} ${bS}\\right)`, den=2*c, good=fr3(P,Q,den);
    const W=[...new Set([fr3(P,-Q,den),fr3(-P,Q,den),fr3(Q,P,den),fr3(-P,-Q,den),fr3(Q,-P,den)])].filter(x=>x!==good).slice(0,3);
    const cb=B===PI/3?['\\tfrac{1}{2}','\\tfrac{\\sqrt{3}}{2}']:['\\tfrac{\\sqrt{3}}{2}','\\tfrac{1}{2}'];     // cos β, sin β
    const form=F==='sin'?`\\sin\\alpha\\cos ${bS} ${sg} \\cos\\alpha\\sin ${bS}`:`\\cos\\alpha\\cos ${bS} ${e>0?'-':'+'} \\sin\\alpha\\sin ${bS}`;
    const sub=F==='sin'?`${fr(s,c)}\\cdot ${cb[0]} ${sg} \\left(${fr(co,c)}\\right)\\cdot ${cb[1]}`:`${fr(co,c)}\\cdot ${cb[0]} ${e>0?'-':'+'} \\left(${fr(s,c)}\\right)\\cdot ${cb[1]}`;
    return QC({text:`Cho ${given}. Tính ${td(name)}`, opts:[good,...W].map(tm), ans:tm(good),
      hint:`Bước 1: tìm ${tm(`${fn(other)}\\alpha`)} bằng ${tm('\\sin^2\\alpha + \\cos^2\\alpha = 1')}, lấy dấu theo góc phần tư. Bước 2: dùng công thức cộng, thay ${tm(`\\cos ${bS}`)}, ${tm(`\\sin ${bS}`)}.`,
      sol:`${step1} ${tm(`${name} = ${form}`)} ${tm(`= ${sub}`)} = ${tb(good)}.`}); }
  const e=pick([1,-1]), sg=e>0?'+':'-', num=s+e*co, dn=co-e*s, name=`\\tan\\left(\\alpha ${sg} ${piStr(PI/4)}\\right)`;
  return QB({text:`Cho ${given}. Tính ${td(name)}`, tpl:FB(name), ans:[{frac:[num,dn],mode:'eq'}],
    hint:`Tìm ${tm(`${fn(other)}\\alpha`)} (chú ý dấu), suy ra ${tm('\\tan\\alpha = \\dfrac{\\sin\\alpha}{\\cos\\alpha}')}; rồi dùng ${tm(`\\tan(\\alpha ${sg} \\beta) = \\dfrac{\\tan\\alpha ${sg} \\tan\\beta}{1 ${e>0?'-':'+'} \\tan\\alpha\\tan\\beta}`)} với ${tm(`\\tan ${piStr(PI/4)} = 1`)}.`,
    sol:`${step1} ${tm(`\\tan\\alpha = ${fr(s,co)}`)}. ${tm(`${name} = \\dfrac{\\tan\\alpha ${sg} 1}{1 ${e>0?'-':'+'} \\tan\\alpha} = \\dfrac{${fr(s,co)} ${sg} 1}{1 ${e>0?'-':'+'} \\left(${fr(s,co)}\\right)}`)} = ${tb(fr(num,dn))}.`}); };

const gO2 = lv => {   // GTLN, GTNN sau khi biến đổi về một hàm lượng giác
  let fnS,mx,mn,why,hint; const A=R(-3,6), cst=A?` ${A<0?'-':'+'} ${Math.abs(A)}`:'';
  if(lv===1){ const B=sR(1,4)*2, h=Math.abs(B)/2;
    fnS=`y = ${B<0?'-':''}${Math.abs(B)}\\sin x\\cos x${cst}`; mx=A+h; mn=A-h;
    hint=`Dùng ${tm('2\\sin x\\cos x = \\sin 2x')} rồi ${tm('-1 \\le \\sin 2x \\le 1')}.`;
    why=`${tm(`y = ${B/2===1?'':B/2===-1?'-':B/2}\\sin 2x${cst}`)}. Vì ${tm('-1 \\le \\sin 2x \\le 1')} nên ${tm(`${mn} \\le y \\le ${mx}`)}.`; }
  else if(lv===2){ const B=sR(1,5), t=pick(['c','s']), Bs=`${B<0?'-':''}${Math.abs(B)===1?'':Math.abs(B)}`;
    if(t==='c'){ fnS=`y = ${Bs}\\left(\\cos^2 x - \\sin^2 x\\right)${cst}`; why=`${tm(`\\cos^2 x - \\sin^2 x = \\cos 2x`)} nên ${tm(`y = ${Bs}\\cos 2x${cst}`)}.`; hint=`Dùng ${tm('\\cos^2 x - \\sin^2 x = \\cos 2x')} rồi ${tm('-1 \\le \\cos 2x \\le 1')}.`; }
    else { fnS=`y = ${Bs}\\left(1 - 2\\sin^2 x\\right)${cst}`; why=`${tm(`1 - 2\\sin^2 x = \\cos 2x`)} nên ${tm(`y = ${Bs}\\cos 2x${cst}`)}.`; hint=`Dùng ${tm('1 - 2\\sin^2 x = \\cos 2x')} rồi ${tm('-1 \\le \\cos 2x \\le 1')}.`; }
    mx=A+Math.abs(B); mn=A-Math.abs(B); why+=` Vì ${tm('-1 \\le \\cos 2x \\le 1')} nên ${tm(`${mn} \\le y \\le ${mx}`)}.`; }
  else { const P=pick([[3,4,5],[4,3,5],[6,8,10],[8,6,10],[5,12,13],[12,5,13],['1','\\sqrt{3}',2],['\\sqrt{3}','1',2]]), sa=pick([1,-1]), sb=pick([1,-1]), r=P[2];
    const term=(v,s,f)=>`${s<0?'-':''}${v==='1'?'':v}\\${f} x`, bt=term(P[1],sb,'cos');
    fnS=`y = ${term(P[0],sa,'sin')} ${bt.startsWith('-')?'- '+bt.slice(1):'+ '+bt}${cst}`; mx=A+r; mn=A-r;
    const a2=typeof P[0]==='number'?P[0]*P[0]:P[0]==='1'?1:3, b2=typeof P[1]==='number'?P[1]*P[1]:P[1]==='1'?1:3;
    hint=`Với ${tm('a\\sin x + b\\cos x')}: đặt ${tm('r = \\sqrt{a^2 + b^2}')}, viết thành ${tm('r\\sin(x + \\varphi)')} nên nó nằm trong ${tm('[-r;\\ r]')}.`;
    why=`${tm(`r = \\sqrt{${a2} + ${b2}} = ${r}`)}. Chọn ${tm('\\varphi')} với ${tm(`\\cos\\varphi = \\dfrac{${sa<0?'-':''}${P[0]}}{${r}},\\ \\sin\\varphi = \\dfrac{${sb<0?'-':''}${P[1]}}{${r}}`)} thì biểu thức lượng giác bằng ${tm(`${r}\\sin(x + \\varphi)`)}, nằm trong ${tm(`[-${r};\\ ${r}]`)}. Vậy ${tm(`${mn} \\le y \\le ${mx}`)}.`; }
  return QB({text:`Tìm giá trị lớn nhất và giá trị nhỏ nhất của hàm số ${td(fnS)}`, tpl:'<span class="eq">GTLN = [_]</span><br><span class="eq">GTNN = [_]</span>', ans:[mx,mn],
    hint, sol:`${why} GTLN ${tb(`= ${mx}`)}, GTNN ${tb(`= ${mn}`)}.`}); };

// Phương trình đưa về dạng cơ bản – đếm nghiệm bằng cách thử trên lưới 2,5° (mọi nghiệm đều là bội của 2,5°)
const O3 = {
  2:[ ['\\sin 2x = \\sin x', u=>Math.sin(2*rad(u))-Math.sin(rad(u)), `${tm('2x = x + k2\\pi')} hoặc ${tm('2x = \\pi - x + k2\\pi')} ${RAo} ${tm('x = k2\\pi')} hoặc ${tm(`x = ${piStr(PI/3)} + k${piStr(2*PI/3)}`)}`],
      ['\\cos 2x = \\cos x', u=>Math.cos(2*rad(u))-Math.cos(rad(u)), `${tm('2x = \\pm x + k2\\pi')} ${RAo} ${tm('x = k2\\pi')} hoặc ${tm(`x = k${piStr(2*PI/3)}`)}`],
      ['\\sin 3x = \\sin x', u=>Math.sin(3*rad(u))-Math.sin(rad(u)), `${tm('3x = x + k2\\pi')} hoặc ${tm('3x = \\pi - x + k2\\pi')} ${RAo} ${tm('x = k\\pi')} hoặc ${tm(`x = ${piStr(PI/4)} + k${piStr(PI/2)}`)}`],
      ['\\cos 3x = \\cos x', u=>Math.cos(3*rad(u))-Math.cos(rad(u)), `${tm('3x = \\pm x + k2\\pi')} ${RAo} ${tm('x = k\\pi')} hoặc ${tm(`x = k${piStr(PI/2)}`)}, tức là ${tm(`x = k${piStr(PI/2)}`)}`],
      ['\\sin x = \\cos x', u=>Math.sin(rad(u))-Math.cos(rad(u)), `${tm('\\cos x = 0')} không thoả mãn nên chia hai vế cho ${tm('\\cos x')}: ${tm('\\tan x = 1')} ${RAo} ${tm(`x = ${piStr(PI/4)} + k\\pi`)}`],
      ['\\sin 2x = \\cos x', u=>Math.sin(2*rad(u))-Math.cos(rad(u)), `${tm('2\\sin x\\cos x - \\cos x = 0')} ${EQo} ${tm('\\cos x(2\\sin x - 1) = 0')} ${RAo} ${tm('\\cos x = 0')} hoặc ${tm(`\\sin x = ${tf(1,2)}`)}`] ],
  3:[ ['(2\\sin x - 1)(2\\cos x + 1) = 0', u=>(2*Math.sin(rad(u))-1)*(2*Math.cos(rad(u))+1), `${tm(`\\sin x = ${tf(1,2)}`)} hoặc ${tm(`\\cos x = -${tf(1,2)}`)}`],
      ['\\sin x\\cos x = \\dfrac{1}{4}', u=>Math.sin(rad(u))*Math.cos(rad(u))-.25, `Nhân 2: ${tm(`\\sin 2x = ${tf(1,2)}`)} ${RAo} ${tm(`2x = ${piStr(PI/6)} + k2\\pi`)} hoặc ${tm(`2x = ${piStr(5*PI/6)} + k2\\pi`)}`],
      ['\\cos^2 x - \\sin^2 x = \\dfrac{1}{2}', u=>Math.cos(2*rad(u))-.5, `${tm(`\\cos 2x = ${tf(1,2)}`)} ${RAo} ${tm(`2x = \\pm ${piStr(PI/3)} + k2\\pi`)} ${RAo} ${tm(`x = \\pm ${piStr(PI/6)} + k\\pi`)}`],
      ['2\\sin^2 x = 1', u=>2*Math.sin(rad(u))**2-1, `${tm('1 - 2\\sin^2 x = 0')} ${EQo} ${tm('\\cos 2x = 0')} ${RAo} ${tm(`2x = ${piStr(PI/2)} + k\\pi`)} ${RAo} ${tm(`x = ${piStr(PI/4)} + k${piStr(PI/2)}`)}`],
      ['\\sin 2x = \\sqrt{2}\\cos x', u=>Math.sin(2*rad(u))-Math.SQRT2*Math.cos(rad(u)), `${tm('\\cos x(2\\sin x - \\sqrt{2}) = 0')} ${RAo} ${tm('\\cos x = 0')} hoặc ${tm(`\\sin x = ${tf('\\sqrt{2}',2)}`)}`],
      ['\\sin 3x + \\sin x = 0', u=>Math.sin(3*rad(u))+Math.sin(rad(u)), `Tổng thành tích: ${tm('2\\sin 2x\\cos x = 0')} ${RAo} ${tm('\\sin 2x = 0')} hoặc ${tm('\\cos x = 0')} ${RAo} ${tm(`x = k${piStr(PI/2)}`)}`],
      ['\\cos 2x = \\sin x', u=>Math.cos(2*rad(u))-Math.sin(rad(u)), `${tm(`\\sin x = \\cos\\left(${piStr(PI/2)} - x\\right)`)} nên ${tm(`2x = \\pm\\left(${piStr(PI/2)} - x\\right) + k2\\pi`)} ${RAo} ${tm(`x = ${piStr(PI/6)} + k${piStr(2*PI/3)}`)} hoặc ${tm(`x = -${piStr(PI/2)} + k2\\pi`)}`] ] };
const roots = (F,L,Rr) => { const r=[]; for(let u=L;u<=Rr;u+=30) if(Math.abs(F(u))<1e-9) r.push(u); return r; };
const gO3 = lv => { let tex,F,how;
  if(lv===1){ const f=pick(['sin','cos','tan']);
    if(f==='tan'){ [tex,F,how]=pick([['\\sqrt{3}\\tan x - 1 = 0',u=>Math.sqrt(3)*FN.tan(u)-1,`${tm(`\\tan x = ${tf('\\sqrt{3}',3)}`)} ${RAo} ${tm(`x = ${piStr(PI/6)} + k\\pi`)}`],
      ['\\tan x - \\sqrt{3} = 0',u=>FN.tan(u)-Math.sqrt(3),`${tm('\\tan x = \\sqrt{3}')} ${RAo} ${tm(`x = ${piStr(PI/3)} + k\\pi`)}`],['\\tan x + 1 = 0',u=>FN.tan(u)+1,`${tm('\\tan x = -1')} ${RAo} ${tm(`x = -${piStr(PI/4)} + k\\pi`)}`]]); }
    else { const k=pick(['1/2','√2/2','√3/2']), sg=pick([1,-1]), c={'1/2':'1','√2/2':'\\sqrt{2}','√3/2':'\\sqrt{3}'}[k];
      tex=`2${fn(f)} x ${sg>0?'-':'+'} ${c} = 0`; F=u=>2*FN[f](u)-sg*2*KV[k]; const t0=solveT(f,(sg<0?M:'')+k);
      how=`${tm(`${fn(f)} x = ${sg<0?'-':''}${valH(k)}`)} ${RAo} ${tm(showSol(t0))}`; } }
  else [tex,F,how]=pick(O3[lv]);
  const [L,Rr]=lv===1?[0,P2]:lv===2?pick([[0,PI],[0,P2],[-PI,PI]]):pick([[0,P2],[0,PI],[-PI/2,3*PI/2]]);
  const xs=roots(F,L,Rr);
  return QB({text:`Phương trình ${td(tex)} có bao nhiêu nghiệm thuộc đoạn ${tm(`[{${piStr(L)}};\\ {${piStr(Rr)}}]`)}?`, tpl:'[_] nghiệm', ans:[xs.length],
    hint:lv===1?`Chuyển vế để đưa về phương trình cơ bản, viết công thức nghiệm rồi đếm nghiệm trong đoạn (dùng đường tròn lượng giác).`:`Dùng công thức (nhân đôi, tổng thành tích, ${tm('\\sin u = \\sin v')}…) hoặc đặt nhân tử chung để đưa về phương trình cơ bản; rồi đếm nghiệm trong đoạn trên đường tròn lượng giác.`,
    sol:`${how} ${tm('(k \\in \\mathbb{Z})')}. Các nghiệm thuộc đoạn: ${tm(xs.map(x=>`{${piStr(x)}}`).join(';\\ '))}. Có ${tb(xs.length)} nghiệm.`}); };

const gO4 = lv => {   // bài toán thực tế: mực nước h(t) = A + B sin(πt/T)
  const A=R(6,12), B=R(2,5), T=pick([6,12]), hS=`h(t) = ${A} + ${B}\\sin\\dfrac{\\pi t}{${T}}`;
  const intro=`Độ sâu ${tm('h')} (mét) của mực nước ở một cảng biển tại thời điểm ${tm('t')} (giờ, ${tm('0 \\le t \\le 24')}) được tính bởi ${td(hS)}`;
  if(lv===1){ const big=Math.random()<.5, v=big?A+B:A-B;
    return QB({text:`${intro}Mực nước ${big?'sâu nhất':'nông nhất'} là bao nhiêu mét?`, tpl:'[_] m', ans:[v],
      hint:`Dùng ${tm('-1 \\le \\sin\\dfrac{\\pi t}{'+T+'} \\le 1')}.`,
      sol:`Vì ${tm(`-1 \\le \\sin\\dfrac{\\pi t}{${T}} \\le 1`)} nên ${tm(`${A-B} \\le h(t) \\le ${A+B}`)}. Mực nước ${big?'sâu nhất':'nông nhất'} là ${tb(v)} m.`}); }
  if(lv===2){ const t=pick(['max','half']);
    if(t==='max') return QB({text:`${intro}Sau bao nhiêu giờ kể từ ${tm('t = 0')} thì mực nước sâu nhất lần đầu tiên?`, tpl:'[_] giờ', ans:[T/2],
      hint:`Mực nước sâu nhất khi ${tm(`\\sin\\dfrac{\\pi t}{${T}} = 1`)}; tìm ${tm('t \\gt 0')} nhỏ nhất.`,
      sol:`${tm(`\\sin\\dfrac{\\pi t}{${T}} = 1`)} ${EQo} ${tm(`\\dfrac{\\pi t}{${T}} = ${piStr(PI/2)} + k2\\pi`)} ${EQo} ${tm(`t = ${T/2} + ${2*T}k`)}. Giá trị dương nhỏ nhất: ${tb(`t = ${T/2}`)} giờ.`});
    const v=A+B/2;
    return QB({text:`${intro}Sau bao nhiêu giờ kể từ ${tm('t = 0')} thì mực nước sâu ${tm(tdec(v))} m lần đầu tiên?`, tpl:'[_] giờ', ans:[T/6],
      hint:`Giải ${tm(`h(t) = ${tdec(v)}`)}, đưa về ${tm(`\\sin\\dfrac{\\pi t}{${T}} = ${tf(1,2)}`)}; tìm ${tm('t \\gt 0')} nhỏ nhất.`,
      sol:`${tm(`${A} + ${B}\\sin\\dfrac{\\pi t}{${T}} = ${tdec(v)}`)} ${EQo} ${tm(`\\sin\\dfrac{\\pi t}{${T}} = ${tf(1,2)}`)} ${RAo} ${tm(`\\dfrac{\\pi t}{${T}} = ${piStr(PI/6)} + k2\\pi`)} hoặc ${tm(`\\dfrac{\\pi t}{${T}} = ${piStr(5*PI/6)} + k2\\pi`)}, tức là ${tm(`t = ${T/6} + ${2*T}k`)} hoặc ${tm(`t = ${5*T/6} + ${2*T}k`)}. Giá trị dương nhỏ nhất: ${tb(`t = ${T/6}`)} giờ.`}); }
  const t=pick(['half','max','mid']), sv={half:.5,max:1,mid:0}[t], v=A+B*sv;
  const ts=[]; for(let h=0;h<=24;h++) if(Math.abs(Math.sin(Math.PI*h/T)-sv)<1e-9) ts.push(h);
  const eqs={half:`${tm(`\\sin\\dfrac{\\pi t}{${T}} = ${tf(1,2)}`)} ${RAo} ${tm(`t = ${T/6} + ${2*T}k`)} hoặc ${tm(`t = ${5*T/6} + ${2*T}k`)}`,
    max:`${tm(`\\sin\\dfrac{\\pi t}{${T}} = 1`)} ${RAo} ${tm(`t = ${T/2} + ${2*T}k`)}`, mid:`${tm(`\\sin\\dfrac{\\pi t}{${T}} = 0`)} ${RAo} ${tm(`t = ${T}k`)}`}[t];
  return QB({text:`${intro}Trong khoảng ${tm('0 \\le t \\le 24')}, có bao nhiêu thời điểm mực nước sâu đúng ${tm(tdec(v))} m?`, tpl:'[_] thời điểm', ans:[ts.length],
    hint:`Giải phương trình ${tm(`h(t) = ${tdec(v)}`)} (đưa về phương trình ${tm('\\sin')} cơ bản), viết các họ nghiệm theo ${tm('t')} rồi chọn ${tm('k')} để ${tm('0 \\le t \\le 24')}.`,
    sol:`${eqs} ${tm('(k \\in \\mathbb{Z})')}. Các giá trị trong ${tm('[0;\\ 24]')}: ${tm(ts.join(';\\ '))}. Có ${tb(ts.length)} thời điểm.`}); };

lesson(1,'gia-tri-luong-giac','Bài 1. Giá trị lượng giác của góc lượng giác','Đổi độ – radian, độ dài cung; điểm biểu diễn; dấu và giá trị lượng giác; tính GTLG khi biết một GTLG.',[g1a,g1b,g1c,g1d,g1e]);
lesson(1,'cong-thuc-luong-giac','Bài 2. Công thức lượng giác','Công thức cộng; công thức nhân đôi; biến đổi tích thành tổng và tổng thành tích.',[g2a,g2b,g2c]);
lesson(1,'ham-so-luong-giac','Bài 3. Hàm số lượng giác','Tập xác định; tính chẵn lẻ; chu kì tuần hoàn; giá trị lớn nhất, nhỏ nhất.',[g3a,g3b,g3c,g3d]);
lesson(1,'pt-luong-giac-co-ban','Bài 4. Phương trình lượng giác cơ bản','Công thức nghiệm sin, cos, tan, cot; số nghiệm trên một đoạn; phương trình đưa về dạng cơ bản.',[g4a,g4b,g4c]);
lesson(1,'on-tap-c1','Ôn tập chương I','Tổng hợp: giá trị lượng giác và công thức cộng; GTLN – GTNN sau khi biến đổi; giải và đếm nghiệm phương trình đưa về dạng cơ bản; bài toán thực tế.',[g1e,gO1,gO2,g4a,gO3,gO4]);

/* =====================================================================
   CHƯƠNG II. DÃY SỐ. CẤP SỐ CỘNG VÀ CẤP SỐ NHÂN (Bài 5 · Bài 6 · Bài 7)
   Viết trong một khối { } để tên hằng không trùng với chương I.
   ===================================================================== */
{
const u = k => `u_{${k}}`;
const blankU = k => `<span class="eq">${tm(`${u(k)} =`)} [_]</span>`;
const blankV = v => `<span class="eq">${tm(`${v} =`)} [_]</span>`;
const two = (a,b) => `<span class="eq">${tm(`${a} =`)} [_]${tm(`;\\quad ${b} =`)} [_]</span>`;
const rat = (p,q) => tfrac(p,q);                                // phân số rút gọn (LaTeX)
const lst = (a, more=true) => a.map(x => `{${x}}`).join(';\\ ') + (more ? ';\\ \\ldots' : '');
const sgnT = (c, first) => first ? (c<0?'-':'') : (c<0?' - ':' + ');
const nz = (a,b) => { let x; do{ x = R(a,b) }while(!x); return x; };
const EQ2 = '\\;\\Leftrightarrow\\;', RA2 = '\\;\\Rightarrow\\;';

/* ---------------- BÀI 5. DÃY SỐ ---------------- */
// Công thức mẫu: s (LaTeX của u_n), f(n) → [tử, mẫu]
const SEQ = {
  '2n':            {f:n=>[2*n,1]},        '2n-1':          {f:n=>[2*n-1,1]},     '2n+1':          {f:n=>[2*n+1,1]},
  '3n-2':          {f:n=>[3*n-2,1]},      '5-n':           {f:n=>[5-n,1]},        'n^2':           {f:n=>[n*n,1]},
  'n^2+1':         {f:n=>[n*n+1,1]},      'n(n+1)':        {f:n=>[n*(n+1),1]},    '2^n':           {f:n=>[2**n,1]},
  '2^{n-1}':       {f:n=>[2**(n-1),1]},   '3^{n-1}':       {f:n=>[3**(n-1),1]},   '(-1)^n':        {f:n=>[(-1)**n,1]},
  '(-1)^{n+1}n':   {f:n=>[(-1)**(n+1)*n,1]}, '(-1)^n\\cdot 2n': {f:n=>[(-1)**n*2*n,1]},
  '\\dfrac{1}{n}': {f:n=>[1,n]},          '\\dfrac{n}{n+1}': {f:n=>[n,n+1]},     '\\dfrac{n+1}{n}': {f:n=>[n+1,n]},
  '\\dfrac{1}{2^n}': {f:n=>[1,2**n]},     '\\dfrac{(-1)^n}{n}': {f:n=>[(-1)**n,n]},
};
const termT = (k,n) => rat(...SEQ[k].f(n));
const firstT = (k,m=5) => [...Array(m)].map((_,i) => termT(k,i+1));
const g5a = lv => {   // tính số hạng
  if(lv===1){ if(Math.random()<.5){ const a=nz(-5,6), b=R(-9,9), k=R(3,15), e=tpoly([a,'n'],[b,'']);
      return QB({text:`Cho dãy số ${tm(`(u_n)`)} với ${tm(`u_n = ${e}`)}. Tính ${tm(u(k))}.`, tpl:blankU(k), ans:[a*k+b],
        hint:`Thay ${tm(`n = ${k}`)} vào công thức của ${tm('u_n')}.`, sol:`${tm(`${u(k)} = ${a}\\cdot ${k} ${sgnT(b)}${Math.abs(b)} = `)}${tb(a*k+b)}.`.replace(' + 0 = ',' = ')}); }
    const c=R(-9,9), k=R(3,12), e=`n^2 ${sgnT(c)}${Math.abs(c)}`.replace(/ \+ 0$/,'');
    return QB({text:`Cho dãy số ${tm(`(u_n)`)} với ${tm(`u_n = ${c?e:'n^2'}`)}. Tính ${tm(u(k))}.`, tpl:blankU(k), ans:[k*k+c],
      hint:`Thay ${tm(`n = ${k}`)} vào công thức của ${tm('u_n')}.`, sol:`${tm(`${u(k)} = ${k}^2${c?` ${sgnT(c)}${Math.abs(c)}`:''} = `)}${tb(k*k+c)}.`}); }
  if(lv===2){ const t=R(1,3), k=R(2,9);
    if(t===1){ let a,b,c,d; do{a=nz(-4,5);b=R(-6,6);c=R(1,4);d=R(0,6)}while(a*d===b*c); const p=a*k+b, q=c*k+d;
      const e=tf(tpoly([a,'n'],[b,'']),tpoly([c,'n'],[d,'']));
      return QB({text:`Cho dãy số ${tm(`(u_n)`)} với ${tm(`u_n = ${e}`)}. Tính ${tm(u(k))}.`, tpl:`<span class="eq">${tm(`${u(k)} =`)} [F]</span>`, ans:[{frac:[p,q],mode:'eq'}],
        hint:`Thay ${tm(`n = ${k}`)} vào tử và mẫu rồi rút gọn.`, sol:`${tm(`${u(k)} = ${tf(`${a}\\cdot ${k} ${sgnT(b)}${Math.abs(b)}`,`${c}\\cdot ${k} ${sgnT(d)}${Math.abs(d)}`)} = ${tf(p,q)} = `)}${tb(rat(p,q))}.`}); }
    if(t===2){ const a=R(1,4), b=R(-5,5), v=(-1)**k*(a*k+b), e=`(-1)^n(${tpoly([a,'n'],[b,''])})`;
      return QB({text:`Cho dãy số ${tm(`(u_n)`)} với ${tm(`u_n = ${e}`)}. Tính ${tm(u(k))}.`, tpl:blankU(k), ans:[v],
        hint:`${tm('(-1)^n')} bằng ${tm('1')} khi ${tm('n')} chẵn, bằng ${tm('-1')} khi ${tm('n')} lẻ.`, sol:`${tm(`${u(k)} = (-1)^{${k}}(${a}\\cdot ${k} ${sgnT(b)}${Math.abs(b)}) = ${(-1)**k}\\cdot ${a*k+b} = `)}${tb(v)}.`}); }
    const c=R(1,5), kk=R(3,8), v=2**kk-c*kk, e=`2^n - ${c===1?'':c}n`;
    return QB({text:`Cho dãy số ${tm(`(u_n)`)} với ${tm(`u_n = ${e}`)}. Tính ${tm(u(kk))}.`, tpl:blankU(kk), ans:[v],
      hint:`Thay ${tm(`n = ${kk}`)}; nhớ ${tm(`2^{${kk}}`)} là tích của ${kk} thừa số 2.`, sol:`${tm(`${u(kk)} = 2^{${kk}} - ${c}\\cdot ${kk} = ${2**kk} - ${c*kk} = `)}${tb(v)}.`}); }
  // Truy hồi
  const a=R(-3,4), p=pick([2,3,-1,-2]), q=R(-4,4), K=p===-1?5:4, vals=[a]; for(let i=1;i<K;i++) vals.push(p*vals[i-1]+q);
  const rec=`${p===-1?'-':p===1?'':p}u_n${q?` ${sgnT(q)}${Math.abs(q)}`:''}`;
  return QB({text:`Cho dãy số ${tm('(u_n)')} xác định bởi ${td(`\\begin{cases}u_1 = ${a}\\\\ u_{n+1} = ${rec}\\ \\ (n \\ge 1)\\end{cases}`)}Tính ${tm(u(K))}.`, tpl:blankU(K), ans:[vals[K-1]],
    hint:`Dãy cho bằng hệ thức truy hồi: tính lần lượt ${tm('u_2')} từ ${tm('u_1')}, rồi ${tm('u_3')} từ ${tm('u_2')}, …`,
    sol:`${vals.slice(1).map((v,i)=>tm(`${u(i+2)} = ${p===-1?'-':p}${p===-1?`${tp(vals[i])}`:`\\cdot ${tp(vals[i])}`}${q?` ${sgnT(q)}${Math.abs(q)}`:''} = ${v}`)).join('; ')}. Vậy ${tb(`${u(K)} = ${vals[K-1]}`)}.`});
};
const g5b = lv => {   // tìm công thức số hạng tổng quát
  const pools = {1:['2n','2n-1','2n+1','3n-2','5-n','n^2','n^2+1','n(n+1)'], 2:['2^n','2^{n-1}','3^{n-1}','(-1)^n','(-1)^{n+1}n','(-1)^n\\cdot 2n','2n','n^2','2n-1'],
    3:['\\dfrac{1}{n}','\\dfrac{n}{n+1}','\\dfrac{n+1}{n}','\\dfrac{1}{2^n}','\\dfrac{(-1)^n}{n}','2^{n-1}','(-1)^n','n(n+1)']};
  const P=pools[lv], good=pick(P), show=4, key=k=>firstT(k,show).join('|');
  const others=shuffle(Object.keys(SEQ).filter(k=>k!==good&&key(k)!==key(good)))
    .sort((x,y)=>(termT(y,1)===termT(good,1))-(termT(x,1)===termT(good,1))).slice(0,3);
  return QC({text:`Dãy số ${tm(lst(firstT(good,show)))} có số hạng tổng quát là`, opts:[good,...others].map(k=>tm(`u_n = ${k}`)), ans:tm(`u_n = ${good}`),
    hint:`Thay ${tm('n = 1, 2, 3, 4')} vào từng công thức và so với các số hạng đã cho. Chỉ khớp số hạng đầu thì chưa đủ!`,
    sol:`Với ${tm(`u_n = ${good}`)}: ${firstT(good,show).map((t,i)=>tm(`${u(i+1)} = ${t}`)).join(', ')} – khớp cả ${show} số hạng. Đáp án: ${tb(`u_n = ${good}`)}.`});
};
const MONO = ['Dãy số tăng','Dãy số giảm','Dãy số không tăng, không giảm'];
const g5c = lv => {   // tính tăng, giảm
  let e, ans, sol; const t = lv===1 ? 'lin' : lv===2 ? pick(['frac','frac','pow']) : pick(['alt','quad','frac','pow','lin']);
  if(t==='lin'){ const a=nz(-5,5), b=R(-9,9); e=tpoly([a,'n'],[b,'']); ans=a>0?0:1;
    sol=`${tm(`u_{n+1} - u_n = ${a} ${a>0?'\\gt':'\\lt'} 0`)} với mọi ${tm('n')}.`; }
  if(t==='frac'){ let p,q; do{p=R(-3,6);q=R(0,6)}while(p===q); e=tf(`n ${sgnT(p)}${Math.abs(p)}`.replace(' + 0',''),`n ${sgnT(q)}${Math.abs(q)}`.replace(' + 0','')); ans=q>p?0:1;
    sol=`${tm(`u_n = 1 ${q>p?'-':'+'} ${tf(Math.abs(q-p),`n${q?` + ${q}`:''}`)}`)}. Khi ${tm('n')} tăng, ${tm(tf(Math.abs(q-p),`n${q?` + ${q}`:''}`))} giảm nên ${tm('u_n')} ${q>p?'tăng':'giảm'} (hoặc xét ${tm(`u_{n+1} - u_n = ${tf(q-p,`(n + ${q+1})(n${q?` + ${q}`:''})`)}`)}).`; }
  if(t==='pow'){ const b=pick([2,3,5]), inv=Math.random()<.5; e=inv?tf(1,`${b}^n`):`${b}^n`; ans=inv?1:0;
    sol=inv?`${tm(`${tf('u_{n+1}','u_n')} = ${tf(1,b)} \\lt 1`)} và ${tm('u_n \\gt 0')} nên ${tm('u_{n+1} \\lt u_n')}.`:`${tm(`${tf('u_{n+1}','u_n')} = ${b} \\gt 1`)} và ${tm('u_n \\gt 0')} nên ${tm('u_{n+1} \\gt u_n')}.`; }
  if(t==='alt'){ const a=R(1,4); e=`(-1)^n\\cdot ${a===1?'':a}n`.replace('\\cdot n','n'); ans=2;
    sol=`${tm(`u_1 = ${-a},\\ u_2 = ${2*a},\\ u_3 = ${-3*a}`)}: ${tm('u_1 \\lt u_2')} nhưng ${tm('u_2 \\gt u_3')}.`; }
  if(t==='quad'){ const k=R(4,7); e=`n^2 - ${k}n`; ans=2;
    sol=`${tm(`u_{n+1} - u_n = 2n + 1 - ${k} = 2n - ${k-1}`)}: âm khi ${tm('n = 1')} nhưng dương khi ${tm(`n \\ge ${Math.ceil(k/2)}`)}.`; }
  return QC({text:`Dãy số ${tm(`(u_n)`)} với ${tm(`u_n = ${e}`)} là`, opts:MONO, ans:MONO[ans], keepOrder:true,
    hint:`Xét dấu của ${tm('u_{n+1} - u_n')} (hoặc so sánh ${tm(tf('u_{n+1}','u_n'))} với 1 khi các số hạng dương). Luôn dương → tăng; luôn âm → giảm; đổi dấu → không tăng, không giảm.`,
    sol:`${sol} Vậy đó là <b>${MONO[ans].toLowerCase()}</b>.`});
};
const BND = [
  ['\\dfrac{1}{n}', true, `${tm('0 \\lt u_n \\le 1')}`], ['(-1)^n', true, `${tm('-1 \\le u_n \\le 1')}`], ['\\dfrac{n}{n+1}', true, `${tm('0 \\lt u_n \\lt 1')}`],
  ['\\dfrac{2n+1}{n+2}', true, `${tm('1 \\le u_n \\lt 2')}`], ['\\sin n', true, `${tm('-1 \\le \\sin n \\le 1')}`], ['\\dfrac{(-1)^n}{n}', true, `${tm('-1 \\le u_n \\le \\tfrac{1}{2}')}`],
  ['\\cos\\dfrac{n\\pi}{3}', true, `${tm('-1 \\le u_n \\le 1')}`], ['\\dfrac{1}{n^2+1}', true, `${tm('0 \\lt u_n \\le \\tfrac{1}{2}')}`],
  ['n^2', false, 'u_n lớn tuỳ ý'], ['2^n', false, 'u_n lớn tuỳ ý'], ['3n - 1', false, 'u_n lớn tuỳ ý'], ['\\sqrt{n}', false, 'u_n lớn tuỳ ý'],
  ['(-1)^n n', false, `${tm('|u_n| = n')} lớn tuỳ ý`], ['1 - n^2', false, 'u_n nhỏ tuỳ ý (không bị chặn dưới)'],
];
const g5d = lv => {   // dãy bị chặn
  const want = lv===3 ? false : true, good = pick(BND.filter(b=>b[1]===want)), bad = shuffle(BND.filter(b=>b[1]!==want)).slice(0,3);
  return QC({text:`Dãy số ${tm('(u_n)')} nào sau đây <b>${want?'bị chặn':'không bị chặn'}</b>?`, opts:[good,...bad].map(b=>tm(`u_n = ${b[0]}`)), ans:tm(`u_n = ${good[0]}`),
    hint:`Dãy bị chặn khi có hai số ${tm('m, M')} sao cho ${tm('m \\le u_n \\le M')} với mọi ${tm('n')}. Thử xem ${tm('u_n')} có thể lớn (hoặc nhỏ) tuỳ ý không.`,
    sol:want ? `${tm(`u_n = ${good[0]}`)} có ${good[2]} với mọi ${tm('n')} nên ${tb(`u_n = ${good[0]}`)} bị chặn; các dãy còn lại lớn (hoặc nhỏ) tuỳ ý.`
             : `${tb(`u_n = ${good[0]}`)} không bị chặn vì ${good[2].startsWith('u_n')?tm('u_n')+good[2].slice(3):good[2]}; các dãy còn lại đều bị chặn.`});
};

/* ---------------- BÀI 5 (LUYỆN TẬP THÊM). DÃY SỐ ---------------- */
const pcoef = c => tpoly([c[0],'n^2'],[c[1],'n'],[c[2],'']) || '0';
const evc = (c,x) => c[0]*x*x + c[1]*x + c[2];
const shiftc = (c,k) => [c[0], 2*c[0]*k + c[1], c[0]*k*k + c[1]*k + c[2]];
const addc = (c,k) => [c[0], c[1], c[2]+k];
const uniqC = (good, ws) => { const seen = new Set([pcoef(good)]), o = []; for(const w of ws){ const t = pcoef(w); if(!seen.has(t)){ seen.add(t); o.push(w) } } return o; };

const g5e = lv => {   // số a là số hạng thứ mấy
  if(lv===1){ const a=nz(2,6), b=R(-9,9), k=R(5,20), v=a*k+b, e=tpoly([a,'n'],[b,'']);
    return QB({text:`Cho dãy số ${tm('(u_n)')} với ${tm(`u_n = ${e}`)}. Số ${tm(v)} là số hạng thứ mấy của dãy?`, tpl:`Số ${tm(v)} là số hạng thứ [_] của dãy.`, ans:[k],
      hint:`Số ${tm(v)} là một số hạng của dãy khi phương trình ${tm(`u_n = ${v}`)} có nghiệm ${tm('n')} là số nguyên dương. Hãy giải phương trình đó.`,
      sol:`${tm(`u_n = ${v} ${EQ2} ${e} = ${v} ${EQ2} n = ${k}`)}. ${tm('n = '+k)} là số nguyên dương nên ${tm(v)} là số hạng thứ ${tb(k)}.`}); }
  if(lv===2){ const t=R(1,2), k=R(4,15);
    if(t===1){ const c=nz(-9,9), v=k*k+c; return QB({text:`Cho dãy số ${tm('(u_n)')} với ${tm(`u_n = n^2 ${sgnT(c)}${Math.abs(c)}`)}. Số ${tm(v)} là số hạng thứ mấy của dãy?`, tpl:`Số ${tm(v)} là số hạng thứ [_] của dãy.`, ans:[k],
      hint:`Giải ${tm(`n^2 = ${v-c}`)} và chỉ nhận nghiệm ${tm('n')} nguyên dương.`, sol:`${tm(`u_n = ${v} ${EQ2} n^2 = ${v-c} ${EQ2} n = ${k}`)} (loại ${tm(`n = ${-k}`)} vì ${tm('n')} phải dương). Số ${tm(v)} là số hạng thứ ${tb(k)}.`}); }
    const v=k*(k+1); return QB({text:`Cho dãy số ${tm('(u_n)')} với ${tm('u_n = n(n+1)')}. Số ${tm(v)} là số hạng thứ mấy của dãy?`, tpl:`Số ${tm(v)} là số hạng thứ [_] của dãy.`, ans:[k],
      hint:`Giải ${tm(`n(n+1) = ${v}`)}, hoặc để ý ${tm(v)} là tích của hai số tự nhiên liên tiếp.`, sol:`${tm(`${v} = ${k}\\cdot ${k+1}`)} nên ${tm(`n(n+1) = ${v}`)} cho ${tm(`n = ${k}`)}. Số ${tm(v)} là số hạng thứ ${tb(k)}.`}); }
  const fs=[['n(n+1)',n=>n*(n+1),R(6,25)],['n^2-1',n=>n*n-1,R(6,25)],['n^2+2n',n=>n*n+2*n,R(6,25)],['2^n+1',n=>2**n+1,R(4,10)]], [s,f,k]=pick(fs), good=f(k);
  const set=new Set([...Array(400)].map((_,i)=>f(i+1))), cand=shuffle([-6,-5,-4,-3,-2,-1,1,2,3,4,5,6]).map(d=>good+d).filter(x=>!set.has(x)&&x>0).slice(0,3);
  return QC({text:`Số nào sau đây là một số hạng của dãy số ${tm('(u_n)')} với ${tm(`u_n = ${s}`)}?`, opts:[good,...cand].map(x=>tm(x)), ans:tm(good),
    hint:`Với mỗi số, giải phương trình ${tm('u_n = \\text{số đó}')}: chỉ chọn số cho nghiệm ${tm('n')} nguyên dương. Số gần giống một số hạng chưa chắc là số hạng!`,
    sol:`${tm(`u_{${k}} = ${good}`)} nên ${tb(good)} là số hạng thứ ${k}. Với ba số còn lại, phương trình ${tm('u_n = \\text{số đó}')} không có nghiệm nguyên dương (các số hạng liền kề là ${tm(`${f(k-1)}`)} và ${tm(`${f(k+1)}`)}).`});
};
const g5f = lv => {   // viết u_{n+1}, u_{n-1}, u_{2n}... theo n
  let f, text, good, ws;
  if(lv===1){ const a=nz(-5,5), b=R(-8,8); f=[0,a,b]; text=`u_{n+1}`; good=shiftc(f,1); ws=[addc(f,1), shiftc(f,-1), addc(f,evc(f,1))]; }
  else if(lv===2){ f=[R(1,3),R(-6,6),R(-5,5)]; const k=pick([1,2]); text=`u_{n+${k}}`; good=shiftc(f,k); ws=[addc(f,k), shiftc(f,-k), addc(f,evc(f,k)), [f[0],f[1]+k,f[2]]]; }
  else { f=[R(1,3),R(-6,6),R(-5,5)]; if(Math.random()<.5){ text=`u_{2n}`; good=[4*f[0],2*f[1],f[2]]; ws=[[2*f[0],2*f[1],2*f[2]],[4*f[0],f[1],f[2]],[2*f[0],2*f[1],f[2]],[4*f[0],2*f[1],2*f[2]]]; }
    else { text=`u_{n+1} - u_n`; good=[0,2*f[0],f[0]+f[1]]; ws=[[0,0,f[1]],[0,2*f[0],f[1]],[0,2*f[0],f[0]-f[1]],[0,f[0],f[0]+f[1]]]; } }
  const w3 = uniqC(good, ws).slice(0,3); while(w3.length<3) w3.push(addc(good, w3.length+1));
  const un = pcoef(f);
  return QC({text:`Cho dãy số ${tm('(u_n)')} với ${tm(`u_n = ${un}`)}. Khi đó ${tm(text)} bằng`, opts:[good,...w3].map(c=>tm(pcoef(c))), ans:tm(pcoef(good)),
    hint:lv===3&&text==='u_{n+1} - u_n'?`Tính ${tm('u_{n+1}')} bằng cách thay mọi ${tm('n')} trong công thức bởi ${tm('n+1')}, khai triển rồi trừ cho ${tm('u_n')}.`:`Thay <b>mọi</b> chữ ${tm('n')} trong công thức của ${tm('u_n')} bởi biểu thức trong chỉ số, rồi khai triển. ${tm('u_{n+1}')} khác ${tm('u_n + 1')}!`,
    sol:lv===3&&text==='u_{n+1} - u_n'?`${tm(`u_{n+1} = ${pcoef(shiftc(f,1))}`)}, nên ${tm(`u_{n+1} - u_n = `)}${tb(pcoef(good))}.`:`Thay mỗi chữ ${tm('n')} trong công thức của ${tm('u_n')} bởi ${tm(text.slice(2).replace(/[{}]/g,''))} rồi khai triển: ${tm(`${text} = `)}${tb(pcoef(good))}.`});
};
const g5g = lv => {   // truy hồi nâng cao
  if(lv===1){ const a=R(-3,5), c=R(1,3), K=5, vals=[a]; for(let i=1;i<K;i++) vals.push(vals[i-1]+c*i);
    return QB({text:`Cho dãy số ${tm('(u_n)')} xác định bởi ${td(`\\begin{cases}u_1 = ${a}\\\\ u_{n+1} = u_n + ${c===1?'':c}n\\ \\ (n \\ge 1)\\end{cases}`)}Tính ${tm(u(K))}.`, tpl:blankU(K), ans:[vals[K-1]],
      hint:`Lần lượt cho ${tm('n = 1, 2, 3, 4')}: ${tm('u_2 = u_1 + …')}, rồi ${tm('u_3')} từ ${tm('u_2')}, … (số cộng thêm ở mỗi bước thay đổi theo ${tm('n')}).`,
      sol:vals.slice(1).map((v,i)=>tm(`${u(i+2)} = ${u(i+1)} + ${c===1?'':c}\\cdot ${i+1} = ${vals[i]} + ${c*(i+1)} = ${v}`)).join('; ')+`. Vậy ${tb(`${u(K)} = ${vals[K-1]}`)}.`}); }
  if(lv===2){ const p=pick([1,1,2]), q=pick([1,-1]), a=R(1,3), b=R(1,4), K=6, vals=[a,b]; for(let i=2;i<K;i++) vals.push(p*vals[i-1]+q*vals[i-2]);
    const rec=`${p===1?'':p}u_{n+1} ${q>0?'+':'-'} u_n`;
    return QB({text:`Cho dãy số ${tm('(u_n)')} xác định bởi ${td(`\\begin{cases}u_1 = ${a},\\ u_2 = ${b}\\\\ u_{n+2} = ${rec}\\ \\ (n \\ge 1)\\end{cases}`)}Tính ${tm(u(K))}.`, tpl:blankU(K), ans:[vals[K-1]],
      hint:`Mỗi số hạng (từ ${tm('u_3')}) được tính từ <b>hai</b> số hạng đứng ngay trước nó; cho ${tm('n = 1')} để có ${tm('u_3')}, rồi ${tm('n = 2')} để có ${tm('u_4')}, …`,
      sol:vals.slice(2).map((v,i)=>tm(`${u(i+3)} = ${p===1?'':p+'\\cdot '}${tp(vals[i+1])} ${q>0?'+':'-'} ${tp(vals[i])} = ${v}`)).join('; ')+`. Vậy ${tb(`${u(K)} = ${vals[K-1]}`)}.`}); }
  let a,k,vals; do{ a=pick([-2,-1,2,3]); k=R(1,3); vals=[a]; for(let i=1;i<4;i++) vals.push(vals[i-1]**2-k) }while(Math.abs(vals[3])>20000);
  return QB({text:`Cho dãy số ${tm('(u_n)')} xác định bởi ${td(`\\begin{cases}u_1 = ${a}\\\\ u_{n+1} = u_n^2 - ${k}\\ \\ (n \\ge 1)\\end{cases}`)}Tính ${tm('u_4')}.`, tpl:blankU(4), ans:[vals[3]],
    hint:`Bình phương số hạng trước rồi trừ ${tm(k)}. Chú ý ${tm(`(-3)^2 = 9`)} (bình phương của số âm là số dương).`,
    sol:vals.slice(1).map((v,i)=>tm(`${u(i+2)} = ${tp(vals[i])}^2 - ${k} = ${vals[i]**2} - ${k} = ${v}`)).join('; ')+`. Vậy ${tb(`u_4 = ${vals[3]}`)}.`});
};
const g5h = lv => {   // từ hệ thức truy hồi đến công thức số hạng tổng quát
  const step=(it,n)=>it.next(n), terms=it=>{const t=[it.u1];for(let n=1;n<6;n++)t.push(it.next(t[n-1],n));return t}, same=(a,b)=>a.every((x,i)=>x===b[i]);
  let it;
  if(lv===1){ const a=R(-3,5), d=nz(-4,5); it={rec:`u_{n+1} = u_n ${d>0?'+':'-'} ${Math.abs(d)}`, u1:a, next:x=>x+d, good:[tpoly([d,'n'],[a-d,'']),n=>d*n+a-d],
      ws:[[tpoly([d,'n'],[a,'']),n=>d*n+a],[tpoly([a,'n'],[d,'']),n=>a*n+d],[tpoly([d,'n'],[a+d,'']),n=>d*n+a+d],[tpoly([d,'n'],[-a,'']),n=>d*n-a]]}; }
  else if(lv===2){ const a=nz(-3,4), q=pick([2,3,-2]); it={rec:`u_{n+1} = ${q===-2?'-2':q}u_n`, u1:a, next:x=>x*q, good:[`${a}\\cdot ${tp(q)}^{n-1}`,n=>a*q**(n-1)],
      ws:[[`${a}\\cdot ${tp(q)}^{n}`,n=>a*q**n],[`${tp(q)}\\cdot ${tp(a)}^{n-1}`,n=>q*a**(n-1)],[`${a}\\cdot ${tp(q)}\\cdot (n-1)`,n=>a*q*(n-1)],[`${a}+${tp(q)}(n-1)`,n=>a+q*(n-1)]]}; }
  else { const c=R(1,5), t=R(1,3);
    if(t===1) it={rec:`u_{n+1} = u_n + 2n + 1`, u1:c, next:(x,n)=>x+2*n+1, good:[`n^2 ${sgnT(c-1)}${Math.abs(c-1)}`.replace(/ \+ 0$/,''),n=>n*n+c-1],
      ws:[[`n^2 ${sgnT(c)}${Math.abs(c)}`,n=>n*n+c],[`2n ${sgnT(c-2)}${Math.abs(c-2)}`.replace(/ \+ 0$/,''),n=>2*n+c-2],[`2^n ${sgnT(c-2)}${Math.abs(c-2)}`.replace(/ \+ 0$/,''),n=>2**n+c-2]]};
    else if(t===2) it={rec:`u_{n+1} = u_n + 2n`, u1:c, next:(x,n)=>x+2*n, good:[`n^2 - n ${sgnT(c)}${c}`,n=>n*n-n+c],
      ws:[[`n^2 ${sgnT(c)}${c}`,n=>n*n+c],[`2n ${sgnT(c-2)}${Math.abs(c-2)}`.replace(/ \+ 0$/,''),n=>2*n+c-2],[`2^n ${sgnT(c-2)}${Math.abs(c-2)}`.replace(/ \+ 0$/,''),n=>2**n+c-2]]};
    else it={rec:`u_{n+1} = u_n + n + 1`, u1:c, next:(x,n)=>x+n+1, good:[`${tf('n(n+1)',2)} ${sgnT(c-1)}${Math.abs(c-1)}`.replace(/ \+ 0$/,''),n=>n*(n+1)/2+c-1],
      ws:[[`n^2 ${sgnT(c)}${c}`.replace(/ \+ 0$/,''),n=>n*n+c-1+1],[`2n ${sgnT(c-1)}${Math.abs(c-1)}`.replace(/ \+ 0$/,''),n=>2*n+c-1],[`2^n ${sgnT(c-2)}${Math.abs(c-2)}`.replace(/ \+ 0$/,''),n=>2**n+c-2]]}; }
  const tv=terms(it), fromF=f=>[1,2,3,4,5,6].map(n=>f(n));
  if(!same(tv,fromF(it.good[1]))) throw new Error('g5h good sai');
  const ws=it.ws.filter(w=>!same(tv,fromF(w[1]))).slice(0,3); if(ws.length<3) throw new Error('g5h thiếu nhiễu');
  return QC({text:`Dãy số ${tm('(u_n)')} xác định bởi ${td(`\\begin{cases}u_1 = ${it.u1}\\\\ ${it.rec}\\ \\ (n \\ge 1)\\end{cases}`)}có số hạng tổng quát là`, opts:[it.good,...ws].map(w=>tm(`u_n = ${w[0]}`)), ans:tm(`u_n = ${it.good[0]}`),
    hint:`Tính vài số hạng đầu bằng hệ thức truy hồi (${tm('u_2, u_3, u_4')}) rồi thử từng công thức. Công thức đúng phải khớp <b>tất cả</b> các số hạng, không chỉ ${tm('u_1')}.`,
    sol:`Từ hệ thức truy hồi: ${tm(lst(tv.slice(0,5)))}. Chỉ có ${tb(`u_n = ${it.good[0]}`)} cho đúng các số hạng này; các công thức còn lại sai ở ${tm('u_2')} hoặc ${tm('u_3')} hoặc ${tm('u_4')}.`});
};
const g5i = lv => {   // dãy cho bằng mô tả
  if(lv===1){ const m=R(3,9), r=R(1,m-1), k=R(6,15), v=m*(k-1)+r;
    return QB({text:`Các số tự nhiên chia cho ${m} dư ${r} được viết theo thứ tự tăng dần thành một dãy số ${tm(`${r}, ${r+m}, ${r+2*m},`)}… Tìm số hạng thứ ${k} của dãy.`, tpl:`Số hạng thứ ${k} là [_].`, ans:[v],
      hint:`Hai số hạng liên tiếp hơn kém nhau ${m}. Số hạng thứ ${k} bằng số hạng đầu cộng ${tm(`${k-1}`)} lần ${m}.`, sol:`${tm(`u_{${k}} = ${r} + (${k}-1)\\cdot ${m} = ${r} + ${(k-1)*m} = `)}${tb(v)}.`}); }
  if(lv===2){ const m=pick([4,5,6,7,9]), r=R(1,m-1), k=R(120,520), T=m*(k-1)+r;
    return QB({text:`Các số tự nhiên chia cho ${m} dư ${r} được viết theo thứ tự tăng dần thành một dãy số. Số ${tm(T)} là số hạng thứ mấy của dãy?`, tpl:`Số ${tm(T)} là số hạng thứ [_] của dãy.`, ans:[k],
      hint:`Số hạng thứ ${tm('n')} của dãy là ${tm(`${m}(n-1) + ${r}`)}. Giải phương trình ${tm(`${m}(n-1) + ${r} = ${T}`)}.`, sol:`${tm(`u_n = ${m}(n-1) + ${r}`)}. ${tm(`${m}(n-1) + ${r} = ${T} ${EQ2} n - 1 = ${(T-r)/m} ${EQ2} n = ${k}`)}. Số ${tm(T)} là số hạng thứ ${tb(k)}.`}); }
  const m=pick([7,8,11,12,13]), first=Math.ceil(100/m)*m, cnt=Math.floor(999/m)-Math.ceil(100/m)+1;
  return QB({text:`Các số tự nhiên có ba chữ số chia hết cho ${m}, xếp theo thứ tự tăng dần, tạo thành một dãy số hữu hạn. Dãy này có bao nhiêu số hạng?`, tpl:`Dãy có [_] số hạng.`, ans:[cnt],
    hint:`Tìm số hạng đầu (số nhỏ nhất ≥ 100 chia hết cho ${m}) và số hạng cuối (số lớn nhất ≤ 999 chia hết cho ${m}), rồi đếm các bội của ${m} giữa chúng.`,
    sol:`Số hạng đầu ${tm(first)} = ${tm(`${m}\\cdot ${first/m}`)}; số hạng cuối ${tm(`${m*Math.floor(999/m)}`)} = ${tm(`${m}\\cdot ${Math.floor(999/m)}`)}. Số bội là ${tm(`${Math.floor(999/m)} - ${first/m} + 1 = `)}${tb(cnt)}.`});
};

const g5j = lv => {   // đếm số hạng thoả điều kiện
  let text, ans, sol, hint;
  if(lv===1){ const a=R(2,6), b=-R(8,45), e=tpoly([a,'n'],[b,'']); let c=0; for(let n=1;n<500;n++) if(a*n+b<0) c++; ans=c;
    text=`Dãy số ${tm('(u_n)')} với ${tm(`u_n = ${e}`)} có bao nhiêu số hạng âm?`; hint=`Giải bất phương trình ${tm('u_n \\lt 0')} với ${tm('n')} là số nguyên dương.`;
    sol=`${tm(`${e} \\lt 0 ${EQ2} n \\lt ${tf(-b,a)}`)}. Các số nguyên dương ${tm('n')} thoả mãn: ${tm(`n = 1, 2, \\ldots, ${c}`)}, tức có ${tb(c)} số hạng âm.`; }
  else if(lv===2){ const c0=R(10,80), t=R(0,40); let c=0; for(let n=1;n<500;n++) if(n*n-c0<t) c++; ans=c;
    text=`Dãy số ${tm('(u_n)')} với ${tm(`u_n = n^2 - ${c0}`)} có bao nhiêu số hạng nhỏ hơn ${tm(t)}?`; hint=`Giải ${tm(`n^2 - ${c0} \\lt ${t}`)}, tức ${tm(`n^2 \\lt ${c0+t}`)}, với ${tm('n')} nguyên dương.`;
    sol=`${tm(`n^2 \\lt ${c0+t}`)} nên ${tm(`n \\le ${c}`)} (vì ${tm(`${c}^2 = ${c*c} \\lt ${c0+t}`)} còn ${tm(`${c+1}^2 = ${(c+1)**2} \\ge ${c0+t}`)}). Có ${tb(c)} số hạng.`; }
  else { const k=R(2,7), [p,q]=pick([[1,2],[2,3],[3,4],[4,5]]); let c=0; for(let n=1;n<3000;n++) if(n*q<p*(n+k)) c++; ans=c;
    text=`Dãy số ${tm('(u_n)')} với ${tm(`u_n = ${tf('n',`n+${k}`)}`)} có bao nhiêu số hạng nhỏ hơn ${tm(tf(p,q))}?`; hint=`Vì ${tm(`n + ${k} \\gt 0`)}, có thể nhân chéo: ${tm(`${tf('n',`n+${k}`)} \\lt ${tf(p,q)} ${EQ2} ${q}n \\lt ${p}(n+${k})`)}. Giải bất phương trình rồi đếm số nguyên dương ${tm('n')}.`;
    const dq=q-p; sol=`${tm(`${q}n \\lt ${p}n + ${p*k} ${EQ2} ${dq===1?'':dq}n \\lt ${p*k} ${EQ2} n \\lt ${dq===1?p*k:tf(p*k,dq)}`)}. Số nguyên dương ${tm('n')} thoả mãn: ${tm(`1, 2, \\ldots, ${c}`)} nên có ${tb(c)} số hạng.`; }
  return QB({text, tpl:`Có [_] số hạng.`, ans:[ans], hint, sol});
};
const g5k = lv => {   // tham số để dãy tăng
  let text, ans, sol, hint;
  const incr=(f,lim)=>m=>{for(let n=1;n<=60;n++){const[a,b]=f(m,n),[c,d]=f(m,n+1);if(!(c*b>a*d))return false}return true};
  if(lv===1){ const k=R(1,6), c=R(-5,5), ok=incr((m,n)=>[(m-k)*n+c,1]); let r; for(let m=-30;m<=30;m++) if(ok(m)){r=m;break}
    text=`Tìm giá trị nguyên nhỏ nhất của tham số ${tm('m')} để dãy số ${tm('(u_n)')} với ${tm(`u_n = (m - ${k})n ${sgnT(c)}${Math.abs(c)}`.replace(/ \+ 0$/,''))} là dãy số tăng.`; ans=r; hint=`Tính ${tm('u_{n+1} - u_n')}; dãy tăng khi hiệu này dương với mọi ${tm('n')}.`;
    sol=`${tm(`u_{n+1} - u_n = (m - ${k})`)}. Dãy tăng ${tm(`${EQ2} m - ${k} \\gt 0 ${EQ2} m \\gt ${k}`)}. Số nguyên nhỏ nhất là ${tb(r)}.`; }
  else if(lv===2){ const a=R(1,4), ok=incr((m,n)=>[a*n*n-m*n,1]); let r; for(let m=30;m>=-30;m--) if(ok(m)){r=m;break}
    text=`Tìm giá trị nguyên lớn nhất của tham số ${tm('m')} để dãy số ${tm('(u_n)')} với ${tm(`u_n = ${a===1?'':a}n^2 - mn`)} là dãy số tăng.`; ans=r; hint=`Tính ${tm('u_{n+1} - u_n')} (khai triển ${tm('(n+1)^2')}), rồi tìm điều kiện của ${tm('m')} để hiệu dương với <b>mọi</b> ${tm('n \\ge 1')} – xét giá trị ${tm('n')} nhỏ nhất.`;
    sol=`${tm(`u_{n+1} - u_n = ${a===1?'':a}(2n+1) - m = ${2*a}n + ${a} - m`)}. Biểu thức này tăng theo ${tm('n')} nên chỉ cần dương tại ${tm('n = 1')}: ${tm(`${3*a} - m \\gt 0 ${EQ2} m \\lt ${3*a}`)}. Số nguyên lớn nhất là ${tb(r)}.`; }
  else { const k=R(2,6), ok=incr((m,n)=>[n+m,n+k]); let r; for(let m=30;m>=-30;m--) if(ok(m)){r=m;break}
    text=`Tìm giá trị nguyên lớn nhất của tham số ${tm('m')} để dãy số ${tm('(u_n)')} với ${tm(`u_n = ${tf('n+m',`n+${k}`)}`)} là dãy số tăng.`; ans=r; hint=`Quy đồng ${tm('u_{n+1} - u_n')} (mẫu ${tm(`(n+${k})(n+${k+1})`)} luôn dương) và xét dấu tử số.`;
    sol=`${tm(`u_{n+1} - u_n = ${tf(`(n+1+m)(n+${k}) - (n+m)(n+${k+1})`,`(n+${k})(n+${k+1})`)} = ${tf(`${k} - m`,`(n+${k})(n+${k+1})`)}`)}. Mẫu dương nên dãy tăng ${tm(`${EQ2} ${k} - m \\gt 0 ${EQ2} m \\lt ${k}`)}. Số nguyên lớn nhất là ${tb(r)}.`; }
  return QB({text, tpl:blankV('m'), ans:[ans], hint, sol});
};
const BCAT = {B:'Bị chặn (cả trên và dưới)', D:'Bị chặn dưới nhưng không bị chặn trên', U:'Bị chặn trên nhưng không bị chặn dưới', N:'Không bị chặn trên và không bị chặn dưới'};
const BEX = {
  B:['\\dfrac{1}{n}','(-1)^n','\\dfrac{n}{n+1}','\\dfrac{1}{2^n}','\\dfrac{2n+1}{n+2}','(-1)^n+\\dfrac{1}{n}'],
  D:['n^2','2^n','3n-1','\\sqrt{n}','n(n+1)','\\dfrac{n^2+1}{n}','(1+(-1)^n)n'],
  U:['1-n^2','5-n','-2^n','-n^2','10-3n','-\\sqrt{n}'],
  N:['(-1)^n n','(-1)^n n^2','(-1)^n\\cdot 2n','n\\cos(n\\pi)'],
};
const WHY = {B:'mọi số hạng nằm giữa hai số cố định', D:'các số hạng lớn lên vô hạn nhưng không nhỏ hơn số hạng nhỏ nhất của dãy', U:'các số hạng nhỏ đi vô hạn nhưng không lớn hơn số hạng lớn nhất của dãy', N:'các số hạng ở vị trí chẵn tiến tới +∞, ở vị trí lẻ tiến tới −∞'};
const g5l = lv => {   // chặn trên, chặn dưới
  const cats = lv===1 ? ['B','D','U'] : ['B','D','U','N'], c=pick(cats), pool = lv===3 ? BEX[c] : BEX[c].slice(0,4), e=pick(pool);
  return QC({text:`Dãy số ${tm('(u_n)')} với ${tm(`u_n = ${e}`)} là dãy số nào sau đây?`, opts:['B','D','U','N'].map(k=>BCAT[k]), ans:BCAT[c], keepOrder:true,
    hint:`Hỏi hai điều: các số hạng có thể lớn tuỳ ý không (chặn trên)? có thể nhỏ tuỳ ý không (chặn dưới)? Thử vài số hạng với ${tm('n')} lớn.`,
    sol:`${tm(`u_n = ${e}`)}: ${WHY[c]}. Vậy dãy <b>${BCAT[c].toLowerCase()}</b>.`});
};
const g5m = lv => {   // giá trị lớn nhất, nhỏ nhất của dãy
  let text, ans, sol, hint;
  if(lv===1){ const a=R(2,9), b=R(-9,9), c=[1,-2*a,a*a+b]; let mn=1e9; for(let n=1;n<300;n++) mn=Math.min(mn,evc(c,n)); ans=mn;
    text=`Tìm giá trị nhỏ nhất của dãy số ${tm('(u_n)')} với ${tm(`u_n = ${pcoef(c)}`)}.`; hint=`Viết lại ${tm('u_n')} dưới dạng ${tm('(n - a)^2 + b')} (hằng đẳng thức) rồi xét xem ${tm('n')} nguyên dương có nhận được giá trị ${tm('a')} không.`;
    sol=`${tm(`u_n = (n - ${a})^2 ${sgnT(b)}${Math.abs(b)}`.replace(/ \+ 0$/,''))} ${tm(`\\ge ${b}`)}, dấu “=” xảy ra khi ${tm(`n = ${a}`)} (nguyên dương). Giá trị nhỏ nhất là ${tb(b)}.`; }
  else if(lv===2){ const k=pick([3,5,7,9,11,13,15]), c=[1,-k,0]; let mn=1e9; for(let n=1;n<300;n++) mn=Math.min(mn,evc(c,n)); ans=mn;
    text=`Tìm giá trị nhỏ nhất của dãy số ${tm('(u_n)')} với ${tm(`u_n = n^2 - ${k}n`)}.`; hint=`Hàm ${tm(`n^2 - ${k}n`)} nhỏ nhất tại ${tm(`n = ${tf(k,2)}`)} – không phải số nguyên! Hãy so sánh các số hạng ứng với hai số nguyên gần nhất.`;
    const n1=(k-1)/2, n2=(k+1)/2; sol=`Đỉnh ở ${tm(`n = ${tf(k,2)}`)} nên xét ${tm(`n = ${n1}`)} và ${tm(`n = ${n2}`)}: ${tm(`u_{${n1}} = ${evc(c,n1)}`)}, ${tm(`u_{${n2}} = ${evc(c,n2)}`)}. Giá trị nhỏ nhất là ${tb(mn)}.`; }
  else { const k=R(3,12), c0=R(-5,9), c=[-1,k,c0]; let mx=-1e9; for(let n=1;n<300;n++) mx=Math.max(mx,evc(c,n)); ans=mx;
    text=`Tìm giá trị lớn nhất của dãy số ${tm('(u_n)')} với ${tm(`u_n = -n^2 + ${k}n ${sgnT(c0)}${Math.abs(c0)}`.replace(/ \+ 0$/,''))}.`; hint=`Tìm ${tm('n')} làm ${tm(`-n^2 + ${k}n`)} lớn nhất (đỉnh parabol ${tm(`n = ${tf(k,2)}`)}); nếu đỉnh không nguyên thì so sánh hai số nguyên gần nhất.`;
    const n0=Math.round(k/2); sol=`Đỉnh ở ${tm(`n = ${k%2?tf(k,2):k/2}`)}; xét ${k%2?`${tm(`n = ${(k-1)/2}`)} và ${tm(`n = ${(k+1)/2}`)} (hai số hạng bằng nhau)`:tm(`n = ${n0}`)}: ${tm(`u_{${n0}} = ${evc(c,n0)}`)}. Giá trị lớn nhất là ${tb(mx)}.`; }
  return QB({text, tpl:`Giá trị cần tìm là [_].`, ans:[ans], hint, sol});
};
const STM = [
  [true, 'Mọi dãy số tăng đều bị chặn dưới.', 'dãy tăng thì $u_n \\ge u_1$ với mọi $n$, nên bị chặn dưới bởi $u_1$'],
  [true, 'Mọi dãy số giảm đều bị chặn trên.', 'dãy giảm thì $u_n \\le u_1$ với mọi $n$, nên bị chặn trên bởi $u_1$'],
  [true, 'Dãy số bị chặn trên và bị chặn dưới thì là dãy số bị chặn.', 'đó chính là định nghĩa dãy số bị chặn'],
  [true, 'Dãy số $u_n = (-1)^n$ bị chặn nhưng không tăng, không giảm.', '$-1 \\le (-1)^n \\le 1$ và các số hạng lần lượt là $-1, 1, -1, 1,$ …'],
  [true, 'Dãy số $u_n = n$ là dãy tăng nhưng không bị chặn trên.', '$u_{n+1} - u_n = 1 \\gt 0$ và $n$ lớn tuỳ ý'],
  [true, 'Dãy số $u_n = -n$ là dãy giảm nhưng không bị chặn dưới.', '$u_{n+1} - u_n = -1 \\lt 0$ và $-n$ nhỏ tuỳ ý'],
  [false, 'Mọi dãy số tăng đều bị chặn trên.', 'phản ví dụ $u_n = n$ là dãy tăng nhưng không bị chặn trên'],
  [false, 'Mọi dãy số giảm đều bị chặn dưới.', 'phản ví dụ $u_n = -n$ là dãy giảm nhưng không bị chặn dưới'],
  [false, 'Mọi dãy số bị chặn đều là dãy số tăng hoặc dãy số giảm.', 'phản ví dụ $u_n = (-1)^n$ bị chặn nhưng không tăng, không giảm'],
  [false, 'Dãy số không tăng thì là dãy số giảm.', 'phản ví dụ $u_n = (-1)^n$ không tăng cũng không giảm; dãy hằng $u_n = 5$ cũng vậy'],
  [false, 'Dãy số $u_n = \\dfrac{1}{n}$ là dãy số tăng.', '$\\dfrac{1}{n+1} \\lt \\dfrac{1}{n}$ nên $u_{n+1} \\lt u_n$: dãy giảm'],
  [false, 'Dãy số có $u_2 \\gt u_1$ thì là dãy số tăng.', 'chỉ so sánh hai số hạng đầu thì chưa đủ; cần $u_{n+1} \\gt u_n$ với <b>mọi</b> $n$'],
];
const dl = t => t.replace(/\$([^$]+)\$/g, (_, x) => tm(x));
const g5n = lv => {   // khẳng định đúng / sai
  const askTrue = lv!==3, T = STM.filter(s=>s[0]), F = STM.filter(s=>!s[0]), good = pick(askTrue?T:F), others = shuffle(askTrue?F:T).slice(0,3);
  return QC({text:`Khẳng định nào sau đây là <b>${askTrue?'đúng':'sai'}</b>?`, opts:[good,...others].map(s=>dl(s[1])), ans:dl(good[1]),
    hint:askTrue?`Với mỗi khẳng định, thử tìm phản ví dụ (ví dụ ${tm('u_n = n')}, ${tm('u_n = (-1)^n')}, ${tm('u_n = -n')}). Khẳng định có phản ví dụ là sai.`:`Ba khẳng định còn lại luôn đúng; tìm khẳng định có phản ví dụ (ví dụ ${tm('u_n = n')}, ${tm('u_n = (-1)^n')}).`,
    sol:`Chọn: <b>${dl(good[1])}</b> – vì ${dl(good[2])}. ${askTrue?'Ba khẳng định còn lại đều có phản ví dụ nên sai.':'Ba khẳng định còn lại đều đúng.'}`});
};
const g5o = lv => {   // thực tế
  if(lv===1){ const a=R(5,20), d=R(2,6), k=R(8,20), v=a+(k-1)*d;
    return QB({text:`Bạn An đọc sách: ngày đầu đọc ${a} trang, mỗi ngày sau đọc nhiều hơn ngày liền trước ${d} trang. Hỏi ngày thứ ${k} bạn An đọc bao nhiêu trang?`, tpl:`Ngày thứ ${k} đọc [_] trang.`, ans:[v],
      hint:`Gọi ${tm('u_n')} là số trang đọc ở ngày thứ ${tm('n')}: ${tm('u_1')} là số trang ngày đầu và ${tm('u_{n+1} = u_n + …')}. Từ ngày đầu đến ngày thứ ${k} có bao nhiêu lần “thêm”?`,
      sol:`${tm(`u_1 = ${a},\\ u_{n+1} = u_n + ${d}`)}. Đến ngày thứ ${k} đã thêm ${tm(k-1)} lần: ${tm(`u_{${k}} = ${a} + ${k-1}\\cdot ${d} = `)}${tb(v)} (trang).`}); }
  if(lv===2){ const a=R(2,9), k=R(4,9), v=a*2**k;
    return QB({text:`Một mẻ cấy có ${a} vi khuẩn. Cứ sau mỗi giờ, số vi khuẩn tăng gấp đôi. Hỏi sau ${k} giờ có bao nhiêu vi khuẩn?`, tpl:`Sau ${k} giờ có [_] vi khuẩn.`, ans:[v],
      hint:`Gọi ${tm('u_n')} là số vi khuẩn sau ${tm('n')} giờ (${tm('u_0')} là lúc đầu): ${tm('u_{n+1} = 2u_n')}. Tính lần lượt hoặc nhận ra quy luật nhân đôi.`,
      sol:`${tm(`u_0 = ${a},\\ u_{n+1} = 2u_n`)} nên ${tm(`u_{${k}} = ${a}\\cdot 2^{${k}} = ${a}\\cdot ${2**k} = `)}${tb(v)}.`}); }
  const k=R(6,14), v=k*(k+1)/2;
  return QB({text:`Một tháp xếp cam: tầng trên cùng (tầng 1) có 1 quả; tầng ${tm('n+1')} có nhiều hơn tầng ${tm('n')} đúng ${tm('n + 1')} quả. Hỏi tầng thứ ${k} có bao nhiêu quả cam?`, tpl:`Tầng thứ ${k} có [_] quả.`, ans:[v],
    hint:`Gọi ${tm('u_n')} là số cam ở tầng ${tm('n')}: ${tm('u_1 = 1')}, ${tm('u_{n+1} = u_n + (n+1)')}. Tính lần lượt, hoặc nhận ra quy luật ${tm('1, 3, 6, 10,')}…`,
    sol:`${tm('u_1 = 1,\\ u_2 = 3,\\ u_3 = 6,\\ u_4 = 10,\\ \\ldots')} Số hạng tổng quát ${tm('u_n = 1 + 2 + 3 + \\ldots + n = ' + tf('n(n+1)', 2))}. Với ${tm(`n = ${k}`)}: ${tm(`${tf(`${k}\\cdot ${k+1}`,2)} = `)}${tb(v)}.`});
};

/* ---------------- BÀI 6. CẤP SỐ CỘNG ---------------- */
const CSC = 'Cấp số cộng: mỗi số hạng (từ số hạng thứ hai) bằng số hạng đứng ngay trước cộng với một số không đổi ' + tm('d') + ' (công sai).';
const nearMiss = a => { const b=a.slice(), i=R(2,a.length-1); b[i]=b[i]+pick([-1,1]); return b; };
const g6a = lv => {   // nhận biết cấp số cộng
  if(lv<3){ const a=R(-5,9), d=lv===1?nz(1,5):nz(-6,6), good=[...Array(5)].map((_,i)=>a+i*d);
    const q=pick([2,3]), a2=R(1,3), geo=[...Array(5)].map((_,i)=>a2*q**i);
    const bads=[nearMiss(good), geo, [...Array(5)].map((_,i)=>(i+1)**2+a), [...Array(5)].map((_,i)=>(-1)**i*(a+i*Math.abs(d)))].filter(b=>b.join()!==good.join());
    const W=shuffle(bads).slice(0,3);
    return QC({text:'Dãy số nào sau đây là <b>cấp số cộng</b>?', opts:[good,...W].map(x=>tm(lst(x,false))), ans:tm(lst(good,false)), hint:CSC+' Tính hiệu hai số hạng liên tiếp.',
      sol:`Hiệu hai số hạng liên tiếp luôn bằng ${tm(d)} nên ${tb(lst(good,false))} là cấp số cộng với công sai ${tm(`d = ${d}`)}.`}); }
  const a=nz(-5,5), b=R(-9,9), goods=[tpoly([a,'n'],[b,'']), `${b} ${sgnT(-a)}${cf1(a)}n`, tf(tpoly([a,'n'],[b,'']),pick([2,3]))];
  const good=pick(goods), W=shuffle(['n^2 + 1','2^n','\\dfrac{3}{n}','n^2 - n','3^n - 1','(-1)^n\\cdot n']).slice(0,3);
  return QC({text:'Dãy số nào sau đây là <b>cấp số cộng</b>?', opts:[good,...W].map(x=>tm(`u_n = ${x}`)), ans:tm(`u_n = ${good}`),
    hint:`Dãy ${tm('(u_n)')} là cấp số cộng khi ${tm('u_{n+1} - u_n')} là một hằng số (không phụ thuộc ${tm('n')}).`,
    sol:`Với ${tm(`u_n = ${good}`)}, hiệu ${tm('u_{n+1} - u_n')} là hằng số nên đây là cấp số cộng: ${tb(`u_n = ${good}`)}. Các dãy khác có hiệu phụ thuộc ${tm('n')}.`});
};
const cf1 = c => Math.abs(c)===1 ? '' : Math.abs(c);
const g6b = lv => {   // số hạng tổng quát u_n = u_1 + (n − 1)d
  const F = `${tm('u_n = u_1 + (n - 1)d')}`;
  if(lv===1){ const a=R(-10,10), d=nz(-5,6), k=R(5,20), v=a+(k-1)*d;
    return QB({text:`Cho cấp số cộng ${tm('(u_n)')} có ${tm(`u_1 = ${a}`)} và công sai ${tm(`d = ${d}`)}. Tính ${tm(u(k))}.`, tpl:blankU(k), ans:[v], hint:`Dùng ${F}.`,
      sol:`${tm(`${u(k)} = ${a} + (${k} - 1)\\cdot ${tp(d)} = ${a} ${sgnT((k-1)*d)}${Math.abs((k-1)*d)} = `)}${tb(v)}.`}); }
  if(lv===2){ const a=R(-10,15), d=nz(-6,6), k=R(4,12), v=a+(k-1)*d;
    return QB({text:`Cho cấp số cộng ${tm('(u_n)')} có ${tm(`u_1 = ${a}`)} và ${tm(`${u(k)} = ${v}`)}. Tìm công sai ${tm('d')}.`, tpl:blankV('d'), ans:[d],
      hint:`Viết ${tm(u(k))} theo ${tm('u_1')} và ${tm('d')}: ${tm(`${u(k)} = u_1 + ${k-1}d`)}, rồi giải tìm ${tm('d')}.`,
      sol:`${tm(`${v} = ${a} + ${k-1}d${EQ2}${k-1}d = ${v-a}${EQ2}d = `)}${tb(d)}.`}); }
  let p,q; do{p=R(2,8);q=R(3,15)}while(q<=p); const a=R(-10,10), d=nz(-5,5), A=a+(p-1)*d, B=a+(q-1)*d;
  return QB({text:`Cho cấp số cộng ${tm('(u_n)')} có ${tm(`${u(p)} = ${A}`)} và ${tm(`${u(q)} = ${B}`)}. Tìm ${tm('u_1')} và công sai ${tm('d')}.`, tpl:two('u_1','d'), ans:[a,d],
    hint:`Viết cả hai số hạng theo ${tm('u_1')} và ${tm('d')} rồi giải hệ hai phương trình bậc nhất.`,
    sol:`${td(`\\begin{cases}u_1 + ${p-1}d = ${A}\\\\ u_1 + ${q-1}d = ${B}\\end{cases}`)}Trừ vế theo vế: ${tm(`${q-p}d = ${B-A}${RA2}d = ${d}`)}; ${tm(`u_1 = ${A} - ${p-1}\\cdot ${tp(d)} = ${a}`)}. Vậy ${tb(`u_1 = ${a}`)}, ${tb(`d = ${d}`)}.`});
};
const g6c = lv => {   // tổng n số hạng đầu
  const F1=tm('S_n = \\dfrac{n(u_1 + u_n)}{2}'), F2=tm('S_n = \\dfrac{n[2u_1 + (n - 1)d]}{2}');
  if(lv===1){ const a=R(-5,10), d=nz(-4,5), n=R(5,20), S=n*(2*a+(n-1)*d)/2;
    return QB({text:`Cho cấp số cộng ${tm('(u_n)')} có ${tm(`u_1 = ${a}`)}, ${tm(`d = ${d}`)}. Tính tổng ${tm(`S_{${n}}`)} của ${n} số hạng đầu.`, tpl:blankV(`S_{${n}}`), ans:[S], wide:true, hint:`Dùng ${F2}.`,
      sol:`${tm(`S_{${n}} = ${tf(`${n}[2\\cdot ${tp(a)} + ${n-1}\\cdot ${tp(d)}]`,2)} = ${tf(`${n}\\cdot ${2*a+(n-1)*d}`,2)} = `)}${tb(S)}.`}); }
  if(lv===2){ const a=R(-10,20), d=nz(-5,6), n=R(8,30), L=a+(n-1)*d, S=n*(a+L)/2;
    return QB({text:`Tính tổng ${tm(`S = ${a} ${sgnT(a+d)}${Math.abs(a+d)} ${sgnT(a+2*d)}${Math.abs(a+2*d)} + \\ldots ${sgnT(L)}${Math.abs(L)}`)}, biết các số hạng lập thành cấp số cộng và có ${n} số hạng.`.replace(`S = ${a} + -`,`S = ${a} - `),
      tpl:blankV('S'), ans:[S], wide:true, hint:`Biết số hạng đầu, số hạng cuối và số số hạng: dùng ${F1}.`,
      sol:`${tm(`S = ${tf(`${n}(${a} ${sgnT(L)}${Math.abs(L)})`,2)} = `)}${tb(S)}.`}); }
  const a=R(1,9), d=R(2,6), n=R(8,25), L=a+(n-1)*d, S=n*(a+L)/2;
  return QB({text:`Tính tổng ${td(`S = ${a} + ${a+d} + ${a+2*d} + \\ldots + ${L}`)}`, tpl:blankV('S'), ans:[S], wide:true,
    hint:`Các số hạng lập thành cấp số cộng công sai ${tm(d)}. Tìm số số hạng ${tm('n')} từ ${tm(`u_n = ${L}`)}, rồi dùng ${F1}.`,
    sol:`${tm(`u_1 = ${a},\\ d = ${d}`)}; ${tm(`${L} = ${a} + (n - 1)\\cdot ${d}${RA2}n = ${n}`)}. ${tm(`S = ${tf(`${n}(${a} + ${L})`,2)} = `)}${tb(S)}.`});
};
const g6d = lv => {   // bài toán thực tế
  if(lv===1){ const a=R(12,25), d=R(2,4), n=R(8,20), L=a+(n-1)*d;
    return QB({text:`Một hội trường có ${n} hàng ghế. Hàng đầu có <b>${a}</b> ghế, mỗi hàng sau nhiều hơn hàng trước <b>${d}</b> ghế. Hàng cuối cùng có bao nhiêu ghế?`, tpl:'[_] ghế', ans:[L],
      hint:`Số ghế các hàng lập thành cấp số cộng ${tm(`u_1 = ${a},\\ d = ${d}`)}. Hàng cuối là ${tm(u(n))}.`,
      sol:`${tm(`${u(n)} = ${a} + ${n-1}\\cdot ${d} = ${L}`)}. Hàng cuối có ${tb(L)} ghế.`}); }
  if(lv===2){ const nm=pick(NAMES), a=pick([5,10,15,20]), d=pick([2,5,10]), n=R(10,26), S=n*(2*a+(n-1)*d)/2;
    return QB({text:`${nm} bỏ ống tiết kiệm: tuần đầu ${a} nghìn đồng, mỗi tuần sau bỏ nhiều hơn tuần trước ${d} nghìn đồng. Sau ${n} tuần, ${nm} tiết kiệm được bao nhiêu?`, tpl:'[_] nghìn đồng', ans:[S], wide:true,
      hint:`Số tiền mỗi tuần lập thành cấp số cộng; cần tính tổng ${n} số hạng đầu ${tm('S_n = \\dfrac{n[2u_1 + (n - 1)d]}{2}')}.`,
      sol:`${tm(`S_{${n}} = ${tf(`${n}(2\\cdot ${a} + ${n-1}\\cdot ${d})`,2)} = ${S}`)}. Tiết kiệm được ${tb(fmt(S))} nghìn đồng.`}); }
  const a=R(10,20), d=R(2,4); let n=R(8,18); const S=n*(2*a+(n-1)*d)/2;
  return QB({text:`Một nhà hát có tất cả <b>${fmt(S)}</b> ghế, xếp thành các hàng: hàng đầu ${a} ghế, mỗi hàng sau nhiều hơn hàng trước ${d} ghế. Nhà hát có bao nhiêu hàng ghế?`, tpl:'[_] hàng', ans:[n],
    hint:`Lập phương trình ${tm(`S_n = \\dfrac{n[2\\cdot ${a} + (n - 1)\\cdot ${d}]}{2} = ${S}`)} rồi tìm số nguyên dương ${tm('n')}.`,
    sol:`${tm(`\\dfrac{n[${2*a} + ${d}(n - 1)]}{2} = ${S}${EQ2}${d}n^2 + ${2*a-d}n - ${2*S} = 0`)}, nghiệm nguyên dương ${tm(`n = ${n}`)}. Nhà hát có ${tb(n)} hàng ghế.`});
};
const g6e = lv => {   // ba số lập thành cấp số cộng
  if(lv===1){ let a,b; do{a=R(-10,15);b=R(-10,25)}while((a+b)%2||a===b); const x=(a+b)/2;
    return QB({text:`Tìm ${tm('x')} để ba số ${tm(`${a};\\ x;\\ ${b}`)} theo thứ tự lập thành cấp số cộng.`, tpl:blankV('x'), ans:[x],
      hint:`Ba số ${tm('a, b, c')} lập thành cấp số cộng khi ${tm('a + c = 2b')} (số giữa là trung bình cộng hai số hai bên).`,
      sol:`${tm(`2x = ${a} + ${tp(b)}${RA2}x = `)}${tb(x)}.`}); }
  if(lv===2){ const x=R(-6,8), p=R(-5,5), q=R(-5,5), r=3*x+2*q-p, A=tpoly([1,'x'],[p,'']), B=tpoly([2,'x'],[q,''])
    return QB({text:`Tìm ${tm('x')} để ba số ${tm(`${A};\\ ${B};\\ ${r}`)} theo thứ tự lập thành cấp số cộng.`, tpl:blankV('x'), ans:[x],
      hint:`Dùng ${tm('a + c = 2b')}: tổng số đầu và số cuối bằng hai lần số giữa.`,
      sol:`${tm(`(${A}) + ${tp(r)} = 2(${B})${EQ2}${tpoly([1,'x'],[p+r,''])} = ${tpoly([4,'x'],[2*q,''])}${EQ2}x = `)}${tb(x)}.`}); }
  const b=R(2,9), d=R(1,6), S=3*b, P=(b-d)*b*(b+d);
  return QB({text:`Ba số hạng liên tiếp của một cấp số cộng có tổng bằng <b>${S}</b> và tích bằng <b>${P}</b>. Tìm số lớn nhất trong ba số đó.`, tpl:'[_]', ans:[b+d],
    hint:`Gọi ba số là ${tm('b - d,\\ b,\\ b + d')}. Tổng cho ta ${tm('b')}, tích cho ta ${tm('d^2')}.`,
    sol:`${tm(`3b = ${S}${RA2}b = ${b}`)}; ${tm(`(${b} - d)\\cdot ${b}\\cdot(${b} + d) = ${P}${RA2}${b*b} - d^2 = ${P/b}${RA2}d = \\pm ${d}`)}. Ba số là ${tm(`${b-d};\\ ${b};\\ ${b+d}`)}, số lớn nhất là ${tb(b+d)}.`});
};

/* ---------------- BÀI 6 (LUYỆN TẬP THÊM). CẤP SỐ CỘNG ---------------- */
const g6f = lv => {   // xác định vị trí của một số hạng
  if(lv===1){ const a=R(-10,15), d=nz(-6,6), k=R(6,25), v=a+(k-1)*d;
    return QB({text:`Cho cấp số cộng ${tm('(u_n)')} có ${tm(`u_1=${a}`)}, ${tm(`d=${d}`)}. Số ${tm(v)} là số hạng thứ mấy của cấp số cộng?`, tpl:`${tm(v)} là số hạng thứ [_].`, ans:[k],
      hint:`Dùng ${tm('u_n=u_1+(n-1)d')}, thay ${tm(`u_n=${v}`)} rồi giải phương trình theo ${tm('n')}.`,
      sol:`Theo công thức số hạng tổng quát, ${tm(`${v}=${a}+(n-1)\\cdot${tp(d)}`)}. Chuyển vế: ${tm(`(n-1)\\cdot${tp(d)}=${v-a}`)}, suy ra ${tm(`n-1=${k-1}`)} và ${tm(`n=${k}`)}. Vậy ${tm(v)} là số hạng thứ ${tb(k)}.`}); }
  if(lv===2){ const p=R(2,8), d=nz(-7,7), A=R(-15,20), k=p+R(4,15), v=A+(k-p)*d;
    return QB({text:`Cho cấp số cộng ${tm('(u_n)')} có ${tm(`${u(p)}=${A}`)} và công sai ${tm(`d=${d}`)}. Số ${tm(v)} là số hạng thứ mấy?`, tpl:`${tm(v)} là số hạng thứ [_].`, ans:[k],
      hint:`Hai số hạng bất kì của cấp số cộng thỏa mãn ${tm('u_n=u_p+(n-p)d')}.`,
      sol:`Áp dụng ${tm('u_n=u_p+(n-p)d')}: ${tm(`${v}=${A}+(n-${p})\\cdot${tp(d)}`)}. Do đó ${tm(`(n-${p})\\cdot${tp(d)}=${v-A}`)}, suy ra ${tm(`n-${p}=${k-p}`)} và ${tm(`n=${k}`)}. Vậy vị trí cần tìm là ${tb(k)}.`}); }
  let p,q; do{p=R(2,6);q=R(8,14)}while(q<=p); const a=R(-12,15), d=nz(-6,6), A=a+(p-1)*d, B=a+(q-1)*d, k=q+R(3,10), v=a+(k-1)*d;
  return QB({text:`Cho cấp số cộng ${tm('(u_n)')} có ${tm(`${u(p)}=${A}`)}, ${tm(`${u(q)}=${B}`)}. Số ${tm(v)} là số hạng thứ mấy?`, tpl:`${tm(v)} là số hạng thứ [_].`, ans:[k],
    hint:`Từ ${tm(`u_{${q}}-u_{${p}}=(${q}-${p})d`)} tìm công sai; sau đó dùng ${tm('u_n=u_p+(n-p)d')}.`,
    sol:`Ta có ${tm(`${B}-${tp(A)}=(${q}-${p})d`)}, nên ${tm(`${q-p}d=${B-A}`)} và ${tm(`d=${d}`)}. Tiếp theo, ${tm(`${v}=${A}+(n-${p})\\cdot${tp(d)}`)}, suy ra ${tm(`n=${k}`)}. Vậy ${tm(v)} là số hạng thứ ${tb(k)}.`});
};

const g6g = lv => {   // tổng một đoạn liên tiếp của cấp số cộng
  if(lv===1){ const a=R(-5,15), d=nz(-4,5), n=R(8,22), last=a+(n-1)*d, S=n*(a+last)/2;
    return QB({text:`Cho cấp số cộng ${tm('(u_n)')} có ${tm(`u_1=${a}`)}, ${tm(`d=${d}`)}. Tính ${tm(`u_1+u_2+\\cdots+u_{${n}}`)}.`, tpl:blankV(`S_{${n}}`), ans:[S], wide:true,
      hint:`Tính ${tm(`u_{${n}}`)} rồi dùng ${tm('S_n=\\dfrac{n(u_1+u_n)}{2}')}.`,
      sol:`Số hạng cuối là ${tm(`u_{${n}}=${a}+(${n}-1)\\cdot${tp(d)}=${last}`)}. Vì có ${tm(n)} số hạng, ${tm(`S_{${n}}=\\dfrac{${n}(${tp(a)}+${tp(last)})}{2}=${S}`)}. Vậy tổng cần tìm là ${tb(S)}.`}); }
  if(lv===2){ const a=R(-8,18), d=nz(-5,6), p=R(3,8), q=p+R(6,16), A=a+(p-1)*d, B=a+(q-1)*d, count=q-p+1, S=count*(A+B)/2;
    return QB({text:`Cho cấp số cộng ${tm('(u_n)')} có ${tm(`u_1=${a}`)}, ${tm(`d=${d}`)}. Tính tổng ${tm(`T=u_{${p}}+u_{${p+1}}+\\cdots+u_{${q}}`)}.`, tpl:blankV('T'), ans:[S], wide:true,
      hint:`Đoạn từ ${tm(`u_{${p}}`)} đến ${tm(`u_{${q}}`)} có ${tm(`${q}-${p}+1`)} số hạng. Tính hai đầu mút rồi lấy số số hạng nhân trung bình cộng hai đầu mút.`,
      sol:`Ta có ${tm(`u_{${p}}=${a}+${p-1}\\cdot${tp(d)}=${A}`)} và ${tm(`u_{${q}}=${a}+${q-1}\\cdot${tp(d)}=${B}`)}. Số số hạng là ${tm(`${q}-${p}+1=${count}`)}. Do đó ${tm(`T=\\dfrac{${count}(${tp(A)}+${tp(B)})}{2}=${S}`)}. Vậy ${tb(`T=${S}`)}.`}); }
  const a=R(-10,15), d=nz(-6,6); let p,q; do{p=R(2,7);q=R(10,18)}while(q<=p); const A=a+(p-1)*d, B=a+(q-1)*d, r=R(p+1,q-2), s=R(r+1,q-1), Rv=a+(r-1)*d, Sv=a+(s-1)*d, count=s-r+1, sum=count*(Rv+Sv)/2;
  return QB({text:`Cho cấp số cộng ${tm('(u_n)')} có ${tm(`${u(p)}=${A}`)}, ${tm(`${u(q)}=${B}`)}. Tính ${tm(`T=u_{${r}}+u_{${r+1}}+\\cdots+u_{${s}}`)}.`, tpl:blankV('T'), ans:[sum], wide:true,
    hint:`Tìm công sai từ hai số hạng đã biết; tính ${tm(`u_{${r}}`)}, ${tm(`u_{${s}}`)}; đoạn cần cộng có ${tm(`${s}-${r}+1`)} số hạng.`,
    sol:`Từ ${tm(`u_{${q}}-u_{${p}}=(${q}-${p})d`)}, ta có ${tm(`d=\\dfrac{${B}-${tp(A)}}{${q-p}}=${d}`)}. Suy ra ${tm(`u_{${r}}=${A}+(${r}-${p})\\cdot${tp(d)}=${Rv}`)}, ${tm(`u_{${s}}=${A}+(${s}-${p})\\cdot${tp(d)}=${Sv}`)}. Có ${tm(count)} số hạng nên ${tm(`T=\\dfrac{${count}(${tp(Rv)}+${tp(Sv)})}{2}=${sum}`)}. Vậy ${tb(`T=${sum}`)}.`});
};

const g6h = lv => {   // chèn các số để tạo thành cấp số cộng
  if(lv===1){ const a=R(-12,12), d=nz(-8,8), b=a+2*d, x=a+d;
    return QB({text:`Chèn một số ${tm('x')} vào giữa ${tm(a)} và ${tm(b)} để ba số theo thứ tự lập thành cấp số cộng.`, tpl:blankV('x'), ans:[x],
      hint:`Số ở giữa bằng trung bình cộng của hai số hai bên: ${tm('x=\\dfrac{a+b}{2}')}.`,
      sol:`Vì ba số lập thành cấp số cộng, ${tm(`x=\\dfrac{${a}+${tp(b)}}{2}=${x}`)}. Vậy số cần chèn là ${tb(x)}.`}); }
  if(lv===2){ const m=R(2,5), a=R(-10,15), d=nz(-6,6), b=a+(m+1)*d, k=R(1,m), x=a+k*d;
    return QB({text:`Chèn ${m} số vào giữa ${tm(a)} và ${tm(b)} để tất cả các số theo thứ tự lập thành cấp số cộng. Tìm số thứ ${k} được chèn vào (tính từ trái sang phải).`, tpl:'[_]', ans:[x],
      hint:`Sau khi chèn có ${tm(m+2)} số hạng nên từ số đầu đến số cuối có ${tm(m+1)} khoảng bằng nhau.`,
      sol:`Công sai là ${tm(`d=\\dfrac{${b}-${tp(a)}}{${m+1}}=${d}`)}. Số thứ ${k} được chèn là số hạng thứ ${k+1}: ${tm(`u_{${k+1}}=${a}+${k}\\cdot${tp(d)}=${x}`)}. Đáp số: ${tb(x)}.`}); }
  const m=R(4,9), a=R(2,15), d=R(2,8), b=a+(m+1)*d, total=m+2;
  return QB({text:`Trên một đoạn đường, hai cột mốc đầu và cuối ghi ${tm(a)} km và ${tm(b)} km. Người ta đặt thêm các cột mốc ở giữa, cách đều ${d} km, để các số ghi trên cột tạo thành một cấp số cộng. Hỏi cả đoạn có tất cả bao nhiêu cột mốc?`, tpl:'[_] cột mốc', ans:[total],
    hint:`Số khoảng cách bằng hiệu hai số đầu–cuối chia cho công sai; số cột mốc nhiều hơn số khoảng đúng 1.`,
    sol:`Số khoảng cách bằng nhau là ${tm(`\\dfrac{${b}-${a}}{${d}}=${m+1}`)}. Vì số cột mốc bằng số khoảng cộng ${tm(1)}, cả đoạn có ${tm(`${m+1}+1=${total}`)} cột mốc. Đáp số: ${tb(total)}.`});
};

const g6i = lv => {   // tính chất hai số hạng cách đều số hạng giữa
  if(lv===1){ const m=R(4,12), h=R(1,m-1), mid=R(-12,20), sum=2*mid;
    return QB({text:`Cho cấp số cộng ${tm('(u_n)')} biết ${tm(`u_{${m-h}}+u_{${m+h}}=${sum}`)}. Tính ${tm(u(m))}.`, tpl:blankU(m), ans:[mid],
      hint:`Trong cấp số cộng, hai số hạng có chỉ số cách đều ${tm('m')} có tổng bằng ${tm('2u_m')}.`,
      sol:`Vì ${tm(`(${m-h})+(${m+h})=2\\cdot${m}`)}, ta có ${tm(`u_{${m-h}}+u_{${m+h}}=2u_{${m}}`)}. Do đó ${tm(`2u_{${m}}=${sum}`)}, suy ra ${tm(`u_{${m}}=${mid}`)}. Đáp số: ${tb(mid)}.`}); }
  const p=R(2,8), q=p+2*R(2,6), m=(p+q)/2, val=R(-15,25), sum=2*val;
  if(lv===2) return QB({text:`Cho cấp số cộng ${tm('(u_n)')} có ${tm(`${u(p)}+${u(q)}=${sum}`)}. Tính ${tm(u(m))}.`, tpl:blankU(m), ans:[val],
    hint:`Kiểm tra ${tm(`${p}+${q}=2\\cdot${m}`)} rồi dùng tính chất ${tm('u_p+u_q=2u_m')}.`,
    sol:`Ta có ${tm(`${p}+${q}=2\\cdot${m}`)} nên ${tm(`${u(p)}+${u(q)}=2${u(m)}`)}. Vì vậy ${tm(`2${u(m)}=${sum}`)}, suy ra ${tm(`${u(m)}=${val}`)}. Đáp số: ${tb(val)}.`});
  const a=R(-10,12), d=nz(-5,6), p1=R(2,5), q1=R(6,10); let p2,q2; do{p2=R(2,5);q2=R(11,16)}while(p1+q1===p2+q2); const A=2*a+(p1+q1-2)*d, B=2*a+(p2+q2-2)*d, k=R(8,18), v=a+(k-1)*d;
  return QB({text:`Cho cấp số cộng ${tm('(u_n)')} thỏa mãn ${tm(`${u(p1)}+${u(q1)}=${A}`)} và ${tm(`${u(p2)}+${u(q2)}=${B}`)}. Tính ${tm(u(k))}.`, tpl:blankU(k), ans:[v], wide:true,
    hint:`Dùng ${tm('u_p+u_q=2u_1+(p+q-2)d')} cho từng đẳng thức để lập hệ tìm ${tm('u_1,d')}.`,
    sol:`Từ công thức ${tm('u_p+u_q=2u_1+(p+q-2)d')}, ta có ${td(`\\begin{cases}2u_1+${p1+q1-2}d=${A}\\\\2u_1+${p2+q2-2}d=${B}\\end{cases}`)}Trừ hai phương trình, được ${tm(`${p2+q2-p1-q1}d=${B-A}`)}, suy ra ${tm(`d=${d}`)} và ${tm(`u_1=${a}`)}. Vậy ${tm(`${u(k)}=${a}+${k-1}\\cdot${tp(d)}=${v}`)}. Đáp số: ${tb(v)}.`});
};

const g6j = lv => {   // bài toán thực tế tăng đều
  if(lv===1){ const first=R(14,24), d=R(2,5), n=R(10,22), last=first+(n-1)*d;
    return QB({text:`Một khán đài có ${n} hàng ghế. Hàng đầu có ${first} ghế, mỗi hàng sau nhiều hơn hàng trước ${d} ghế. Hỏi hàng thứ ${n} có bao nhiêu ghế?`, tpl:'[_] ghế', ans:[last],
      hint:`Số ghế mỗi hàng là cấp số cộng với ${tm(`u_1=${first}, d=${d}`)}; cần tính ${tm(`u_{${n}}`)}.`,
      sol:`Theo công thức ${tm('u_n=u_1+(n-1)d')}, hàng thứ ${n} có ${tm(`${first}+(${n}-1)\\cdot${d}=${last}`)} ghế. Đáp số: ${tb(last)} ghế.`}); }
  if(lv===2){ const first=pick([20,30,40,50]), d=pick([5,10,15]), n=R(8,20), total=n*(2*first+(n-1)*d)/2;
    return QB({text:`Một bạn tiết kiệm ${first} nghìn đồng trong tuần đầu. Mỗi tuần sau bạn tiết kiệm nhiều hơn tuần trước ${d} nghìn đồng. Hỏi sau ${n} tuần, tổng số tiền tiết kiệm là bao nhiêu?`, tpl:'[_] nghìn đồng', ans:[total], wide:true,
      hint:`Số tiền theo tuần là cấp số cộng. Bài toán hỏi tổng ${tm(`S_{${n}}`)}, không chỉ hỏi số tiền của tuần cuối.`,
      sol:`Ta có ${tm(`u_1=${first}, d=${d}`)}. Tổng sau ${n} tuần là ${tm(`S_{${n}}=\\dfrac{${n}[2\\cdot${first}+(${n}-1)\\cdot${d}]}{2}=${total}`)}. Vậy bạn tiết kiệm được ${tb(fmt(total))} nghìn đồng.`}); }
  const first=R(8,18), d=R(2,6), n=R(10,22), total=n*(2*first+(n-1)*d)/2;
  return QB({text:`Một đội trồng cây: ngày đầu trồng ${first} cây, mỗi ngày sau trồng nhiều hơn ngày trước ${d} cây. Sau một số ngày, đội trồng được đúng <b>${fmt(total)}</b> cây. Hỏi đội đã làm trong bao nhiêu ngày?`, tpl:'[_] ngày', ans:[n],
    hint:`Lập phương trình tổng cấp số cộng ${tm(`\\dfrac{x[2\\cdot${first}+(x-1)\\cdot${d}]}{2}=${total}`)}; chọn nghiệm nguyên dương phù hợp thực tế.`,
    sol:`Gọi số ngày là ${tm('x')} (${tm('x')} nguyên dương). Khi đó ${tm(`\\dfrac{x[${2*first}+${d}(x-1)]}{2}=${total}`)}, hay ${tm(`${d}x^2+${2*first-d}x-${2*total}=0`)}. Phương trình có nghiệm nguyên dương ${tm(`x=${n}`)} (nghiệm còn lại âm, loại). Vậy đội làm trong ${tb(n)} ngày.`});
};

/* ---------------- BÀI 7. CẤP SỐ NHÂN ---------------- */
const CSN = 'Cấp số nhân: mỗi số hạng (từ số hạng thứ hai) bằng số hạng đứng ngay trước nhân với một số không đổi ' + tm('q') + ' (công bội).';
const g7a = lv => {   // nhận biết cấp số nhân
  if(lv<3){ const q=lv===1?pick([2,3]):pick([-2,-3,2,3,'1/2']); let good;
    if(q==='1/2'){ const a=pick([16,32,48,80]); good=[...Array(5)].map((_,i)=>rat(a,2**i)); }
    else { const a=nz(-3,4); good=[...Array(5)].map((_,i)=>a*q**i); }
    const a2=R(1,5), d=R(2,5), W=shuffle([
      [...Array(5)].map((_,i)=>String(a2+i*d)), [...Array(5)].map((_,i)=>String(a2*2**i+(i===3?1:0))),
      [...Array(5)].map((_,i)=>String((i+1)**2)), [...Array(5)].map((_,i)=>String(i%2?-(i+1):(i+1)))]).slice(0,3);
    const qT = q==='1/2' ? tf(1,2) : q;
    return QC({text:'Dãy số nào sau đây là <b>cấp số nhân</b>?', opts:[good.map(String),...W].map(x=>tm(lst(x,false))), ans:tm(lst(good.map(String),false)), hint:CSN+' Tính thương hai số hạng liên tiếp.',
      sol:`Thương hai số hạng liên tiếp luôn bằng ${tm(qT)} nên ${tb(lst(good.map(String),false))} là cấp số nhân với công bội ${tm(`q = ${qT}`)}.`}); }
  const c=pick([2,3,5]), b=pick([2,3,-2]), goods=[`${c}\\cdot ${b<0?`(${b})`:b}^n`, `${tf(`${b<0?`(${b})`:b}^n`,c)}`, `${b<0?`(${b})`:b}^{n+1}`];
  const good=pick(goods), W=shuffle(['n\\cdot 2^n','2^n + 1','3n + 2','n^2','\\dfrac{n}{3^n}','2^n - n']).slice(0,3);
  return QC({text:'Dãy số nào sau đây là <b>cấp số nhân</b>?', opts:[good,...W].map(x=>tm(`u_n = ${x}`)), ans:tm(`u_n = ${good}`),
    hint:`Dãy ${tm('(u_n)')} (các số hạng khác 0) là cấp số nhân khi ${tm(tf('u_{n+1}','u_n'))} là một hằng số.`,
    sol:`Với ${tm(`u_n = ${good}`)} ta có ${tm(`${tf('u_{n+1}','u_n')} = ${b}`)} (hằng số) nên đây là cấp số nhân: ${tb(`u_n = ${good}`)}.`});
};
const g7b = lv => {   // u_n = u_1·q^(n−1)
  const F=tm('u_n = u_1\\cdot q^{n-1}');
  if(lv===1){ const a=nz(-4,5), q=pick([2,3,-2,-3]), k=R(3,6), v=a*q**(k-1);
    return QB({text:`Cho cấp số nhân ${tm('(u_n)')} có ${tm(`u_1 = ${a}`)} và công bội ${tm(`q = ${q}`)}. Tính ${tm(u(k))}.`, tpl:blankU(k), ans:[v], wide:true, hint:`Dùng ${F}.`,
      sol:`${tm(`${u(k)} = ${tp(a)}\\cdot ${tp(q)}^{${k-1}} = ${tp(a)}\\cdot ${tp(q**(k-1))} = `)}${tb(v)}.`}); }
  if(lv===2){ const a=nz(-5,5), q=pick([2,3,-2,-3]), p=R(1,2), k=p+3, A=a*q**(p-1), B=a*q**(k-1);
    return QB({text:`Cho cấp số nhân ${tm('(u_n)')} có ${tm(`${u(p)} = ${A}`)} và ${tm(`${u(k)} = ${B}`)}. Tìm công bội ${tm('q')}.`, tpl:blankV('q'), ans:[q],
      hint:`${tm(`${u(k)} = ${u(p)}\\cdot q^{${k-p}}`)}. Lập tỉ số ${tm(tf(u(k),u(p)))} rồi khai căn bậc ba.`,
      sol:`${tm(`q^3 = ${tf(B,tp(A))} = ${q**3}${RA2}q = `)}${tb(q)}.`}); }
  const a=R(1,5), q=pick([2,3]), A=a*q, B=a*q**3;
  return QB({text:`Cho cấp số nhân ${tm('(u_n)')} có các số hạng đều dương, ${tm(`u_2 = ${A}`)} và ${tm(`u_4 = ${B}`)}. Tìm ${tm('u_1')} và công bội ${tm('q')}.`, tpl:two('u_1','q'), ans:[a,q],
    hint:`${tm('u_4 = u_2\\cdot q^2')}. Tìm ${tm('q^2')}, chọn ${tm('q \\gt 0')} (các số hạng dương), rồi ${tm('u_1 = \\dfrac{u_2}{q}')}.`,
    sol:`${tm(`q^2 = ${tf(B,A)} = ${q*q}${RA2}q = ${q}`)} (vì các số hạng dương); ${tm(`u_1 = ${tf(A,q)} = ${a}`)}. Vậy ${tb(`u_1 = ${a}`)}, ${tb(`q = ${q}`)}.`});
};
const g7c = lv => {   // tổng n số hạng đầu
  const F=tm('S_n = \\dfrac{u_1(1 - q^n)}{1 - q}');
  if(lv===1){ const a=R(1,5), q=pick([2,3]), n=R(4,7), S=a*(q**n-1)/(q-1);
    return QB({text:`Cho cấp số nhân ${tm('(u_n)')} có ${tm(`u_1 = ${a}`)}, ${tm(`q = ${q}`)}. Tính tổng ${tm(`S_{${n}}`)} của ${n} số hạng đầu.`, tpl:blankV(`S_{${n}}`), ans:[S], wide:true, hint:`Dùng ${F} (với ${tm('q \\ne 1')}).`,
      sol:`${tm(`S_{${n}} = ${tf(`${a}(1 - ${q}^{${n}})`,`1 - ${q}`)} = ${tf(`${a}(1 - ${q**n})`,1-q)} = `)}${tb(S)}.`}); }
  if(lv===2){ if(Math.random()<.5){ const a=nz(-4,4), q=-2, n=R(4,7), S=a*(1-q**n)/(1-q);
      return QB({text:`Cho cấp số nhân ${tm('(u_n)')} có ${tm(`u_1 = ${a}`)}, ${tm('q = -2')}. Tính ${tm(`S_{${n}}`)}.`, tpl:blankV(`S_{${n}}`), ans:[S], wide:true, hint:`Dùng ${F}; chú ý ${tm(`(-2)^{${n}}`)} ${n%2?'âm':'dương'}.`,
        sol:`${tm(`S_{${n}} = ${tf(`${tp(a)}(1 - (-2)^{${n}})`,'1 - (-2)')} = ${tf(`${tp(a)}(1 ${q**n<0?'+':'-'} ${Math.abs(q**n)})`,3)} = `)}${tb(S)}.`}); }
    const n=R(4,6), t=R(1,3), a=t*2**(n-1), S=2*a-a/2**(n-1);
    return QB({text:`Cho cấp số nhân ${tm('(u_n)')} có ${tm(`u_1 = ${a}`)}, ${tm(`q = ${tf(1,2)}`)}. Tính ${tm(`S_{${n}}`)}.`, tpl:blankV(`S_{${n}}`), ans:[S], wide:true, hint:`Dùng ${F} với ${tm(`q = ${tf(1,2)}`)}.`,
      sol:`${tm(`S_{${n}} = ${tf(`${a}\\left(1 - ${tf(1,2**n)}\\right)`,tf(1,2))} = ${2*a}\\cdot ${tf(2**n-1,2**n)} = `)}${tb(S)}.`}); }
  const a=R(1,4), q=pick([2,3]), n=R(4,9), S=a*(q**n-1)/(q-1);
  return QB({text:`Cho cấp số nhân ${tm('(u_n)')} có ${tm(`u_1 = ${a}`)}, ${tm(`q = ${q}`)}. Biết tổng ${tm('n')} số hạng đầu ${tm(`S_n = ${S}`)}. Tìm ${tm('n')}.`, tpl:blankV('n'), ans:[n],
    hint:`Lập phương trình ${tm(`\\dfrac{${a}(${q}^n - 1)}{${q} - 1} = ${S}`)}, tính ${tm(`${q}^n`)} rồi suy ra ${tm('n')}.`,
    sol:`${tm(`${tf(`${a}(${q}^n - 1)`,q-1)} = ${S}${EQ2}${q}^n = ${q**n}${EQ2}n = `)}${tb(n)}.`});
};
const g7d = lv => {   // bài toán thực tế
  if(lv===1){ const N=pick([100,200,500,1000]), k=pick([2,3]), h=R(3,6), v=N*k**h;
    return QB({text:`Một mẻ vi khuẩn ban đầu có <b>${fmt(N)}</b> con, cứ sau mỗi giờ số vi khuẩn tăng gấp <b>${k}</b> lần. Hỏi sau <b>${h}</b> giờ có bao nhiêu con?`, tpl:'[_] con', ans:[v], wide:true,
      hint:`Số vi khuẩn sau mỗi giờ lập thành cấp số nhân công bội ${tm(k)}: sau ${tm('h')} giờ có ${tm(`N\\cdot ${k}^h`)} con.`,
      sol:`${tm(`${N}\\cdot ${k}^{${h}} = ${N}\\cdot ${k**h} = ${v}`)}. Có ${tb(fmt(v))} con.`}); }
  if(lv===2){ const n=R(8,16), S=2**n-1;
    return QB({text:`Một bàn cờ: ô thứ nhất đặt 1 hạt thóc, mỗi ô sau đặt gấp đôi ô trước. Tổng số hạt thóc ở <b>${n}</b> ô đầu tiên là bao nhiêu?`, tpl:'[_] hạt', ans:[S], wide:true,
      hint:`Số hạt ở các ô lập thành cấp số nhân ${tm('u_1 = 1,\\ q = 2')}. Tính ${tm(`S_{${n}}`)}.`,
      sol:`${tm(`S_{${n}} = ${tf(`1\\cdot(2^{${n}} - 1)`,'2 - 1')} = ${S}`)}. Tổng ${tb(fmt(S))} hạt.`}); }
  const n=R(3,5), t=R(1,3), h=t*2**(n-1), D=h+2*(h-h/2**(n-1));
  return QB({text:`Thả một quả bóng từ độ cao <b>${h} m</b>. Mỗi lần chạm đất, bóng nảy lên bằng <b>một nửa</b> độ cao lần rơi trước. Tính tổng quãng đường bóng đi được từ lúc thả đến khi chạm đất <b>lần thứ ${n}</b>.`, tpl:'[_] m', ans:[D],
    hint:`Quãng đường = ${h} (lần rơi đầu) + 2 × (tổng các độ cao nảy lên trước lần chạm đất thứ ${n}). Các độ cao nảy lên lập thành cấp số nhân công bội ${tm(tf(1,2))}.`,
    sol:`Các độ cao nảy: ${tm(lst([...Array(n-1)].map((_,i)=>rat(h,2**(i+1))),false))} (${n-1} số hạng, tổng ${tm(tdec(h-h/2**(n-1)))}). Quãng đường: ${tm(`${h} + 2\\cdot ${tdec(h-h/2**(n-1))} = ${tdec(D)}`)}, tức ${tb(`${tdec(D)}\\text{ m}`)}.`});
};
const g7e = lv => {   // ba số lập thành cấp số nhân
  if(lv<3){ const x=R(2,9), a=pick([1,2,3,4].filter(d=>(x*x)%d===0)), b=x*x/a, pos=lv===1;
    if(pos) return QB({text:`Tìm số <b>dương</b> ${tm('x')} để ba số ${tm(`${a};\\ x;\\ ${b}`)} theo thứ tự lập thành cấp số nhân.`, tpl:blankV('x'), ans:[x],
      hint:`Ba số ${tm('a, b, c')} lập thành cấp số nhân khi ${tm('b^2 = ac')}.`, sol:`${tm(`x^2 = ${a}\\cdot ${b} = ${x*x}${RA2}x = ${x}`)} (vì ${tm('x \\gt 0')}). Đáp án: ${tb(x)}.`});
    const good=`x = \\pm ${x}`;
    return QC({text:`Ba số ${tm(`${a};\\ x;\\ ${b}`)} theo thứ tự lập thành cấp số nhân khi và chỉ khi`, opts:[good,`x = ${x}`,`x = ${(a+b)/2===Math.floor((a+b)/2)?(a+b)/2:x*x}`,`x = \\pm ${x*x}`].map(tm), ans:tm(good),
      hint:`Dùng ${tm('b^2 = ac')}. Phương trình ${tm('x^2 = m')} (${tm('m \\gt 0')}) có <b>hai</b> nghiệm.`, sol:`${tm(`x^2 = ${a}\\cdot ${b} = ${x*x}${EQ2}`)}${tb(good)}.`}); }
  const b=R(1,4), q=R(2,4), S=b*(1+q+q*q), P=(b*q)**3;
  return QB({text:`Ba số hạng liên tiếp của một cấp số nhân có tổng bằng <b>${S}</b> và tích bằng <b>${P}</b>. Tìm số lớn nhất trong ba số đó.`, tpl:'[_]', ans:[b*q*q],
    hint:`Gọi ba số là ${tm('\\dfrac{m}{q},\\ m,\\ mq')}. Tích bằng ${tm('m^3')} cho ta ${tm('m')}; tổng cho phương trình bậc hai ẩn ${tm('q')}.`,
    sol:`${tm(`m^3 = ${P}${RA2}m = ${b*q}`)}; ${tm(`${tf(b*q,'q')} + ${b*q} + ${b*q}q = ${S}${EQ2}${b*q}q^2 - ${S-b*q}q + ${b*q} = 0${RA2}q = ${q}`)} hoặc ${tm(`q = ${tf(1,q)}`)}. Cả hai trường hợp đều cho ba số ${tm(`${b};\\ ${b*q};\\ ${b*q*q}`)}; số lớn nhất là ${tb(b*q*q)}.`});
};

lesson(2,'day-so','Bài 5. Dãy số','Tính số hạng (công thức, truy hồi); tìm số hạng tổng quát; dãy tăng, giảm; dãy bị chặn.',[g5a,g5b,g5c,g5d]);
lesson(2,'day-so-luyen-tap-1','Bài 5. Dãy số – Luyện tập thêm 1','Cách cho dãy số: số hạng thứ mấy; viết u_{n+1}, u_{2n}; hệ thức truy hồi; từ truy hồi đến công thức; dãy cho bằng mô tả; bài toán thực tế.',[g5e,g5f,g5g,g5h,g5i,g5o]);
lesson(2,'day-so-luyen-tap-2','Bài 5. Dãy số – Luyện tập thêm 2','Tính chất của dãy số: đếm số hạng thoả điều kiện; tham số để dãy tăng; chặn trên – chặn dưới; số hạng lớn nhất, nhỏ nhất; khẳng định đúng – sai.',[g5j,g5k,g5l,g5m,g5n]);
lesson(2,'cap-so-cong','Bài 6. Cấp số cộng','Nhận biết; số hạng tổng quát; tổng n số hạng đầu; ba số lập thành cấp số cộng; bài toán thực tế.',[g6a,g6b,g6c,g6e,g6d]);
lesson(2,'cap-so-cong-luyen-tap','Bài 6. Cấp số cộng – Luyện tập thêm','Xác định vị trí số hạng; tổng một đoạn; chèn số; tính chất hai số hạng cách đều; bài toán thực tế.',[g6f,g6g,g6h,g6i,g6j],{introTitle:'Công thức và tính chất cần nhớ',intro:[
  {t:'Số hạng tổng quát',b:`${tm('u_n=u_1+(n-1)d')}; tổng quát hơn: ${tm('u_n=u_p+(n-p)d')}.`,warn:'Khi tìm vị trí, nghiệm n phải là số nguyên dương.',ex:'Biết một số hạng và công sai thì không cần quay về u₁.'},
  {t:'Tổng một đoạn liên tiếp',b:`Từ ${tm('u_p')} đến ${tm('u_q')} có ${tm('q-p+1')} số hạng; tổng bằng số số hạng nhân ${tm('\\dfrac{u_p+u_q}{2}')}.`,warn:'Không lấy q − p; phải cộng thêm 1.',ex:'Có thể dùng S_q − S_{p−1}, nhưng công thức hai đầu mút thường ngắn hơn.'},
  {t:'Chèn số',b:'Nếu chèn m số vào giữa hai đầu mút thì có m + 1 khoảng bằng nhau.',warn:'Số số hạng bằng số khoảng cộng 1.',ex:'Công sai bằng hiệu hai đầu mút chia cho số khoảng.'},
  {t:'Hai số hạng cách đều',b:`Nếu ${tm('p+q=2m')} thì ${tm('u_p+u_q=2u_m')}.`,warn:'Phải kiểm tra tổng hai chỉ số trước khi dùng.',ex:'Tính nhanh số hạng giữa mà không cần tìm u₁ và d.'}
]});
lesson(2,'cap-so-nhan','Bài 7. Cấp số nhân','Nhận biết; số hạng tổng quát; tổng n số hạng đầu; ba số lập thành cấp số nhân; bài toán thực tế.',[g7a,g7b,g7c,g7e,g7d]);
lesson(2,'on-tap-c2','Ôn tập chương II','Tổng hợp: dãy số, cấp số cộng, cấp số nhân và bài toán thực tế.',[g5a,g5c,g6b,g6c,g7b,g7c]);

/* =====================================================================
   CỦNG CỐ CHƯƠNG II – chủ đề 92 (thầy yêu cầu 14/10/2026)
   Bộ ôn tập tổng hợp: dãy số – cấp số cộng – cấp số nhân, câu dễ sai, toán thực tế có hình.
   6 bài: 1 Dãy số · 2 Cấp số cộng · 3 Cấp số nhân · 4 Thực tế CSC (có hình) · 5 Thực tế CSN (có hình) · Đề tổng hợp 15 câu.
   Mỗi dạng 3 mức; đáp án chọn trước khi dựng đề; hint không lộ đáp án; mọi đáp số được tính lại bằng phép tính độc lập (k2chk).
   ===================================================================== */
{ const i2 = G.topics.findIndex(t => t.id === 2); G.topics.splice(i2 < 0 ? G.topics.length : i2 + 1, 0, {id:92, hk:1, name:'Củng cố Chương II (ôn tập tổng hợp)', label:'📝 Củng cố Chương II', grp:'📝 Ôn tập · Củng cố · Kiểm tra'}); }
G.topics.push({id:94, hk:1, name:'Thử thách hôm nay', label:'📝 Thử thách hôm nay', grp:'📝 Ôn tập · Củng cố · Kiểm tra'});
{ const i92 = G.topics.findIndex(t => t.id === 92); G.topics.splice(i92, 0, {id:93, hk:1, name:'Kiểm tra và ôn tập Chương I', label:'📝 Kiểm tra Chương I', grp:'📝 Ôn tập · Củng cố · Kiểm tra'}); }
const k2chk = (ok, msg) => { if(!ok) throw new Error('c2k: ' + msg); };
const K2T = 'Kiến thức cần nhớ · Chỗ dễ sai · Mẹo';
const k2kt = (t, b, warn, ex) => ({t, b, warn, ex});
const sg = n => n < 0 ? '-' : '+';
const ab = Math.abs;
const two2 = (a, b) => `<span class="eq">${tm(`${a} =`)} [_]${tm(`;\\quad ${b} =`)} [_]</span>`;
const sumCSC = (u1, d, n) => { let s = 0; for(let i = 0; i < n; i++) s += u1 + i * d; return s; };

/* ---------- BÀI 1. DÃY SỐ – CHỖ DỄ SAI ---------- */
const cK1 = lv => {   // u_n = a·n + b: u_{n+1}, vị trí của một số
  const a = R(2, 7), b = nz(-6, 7), un = tpoly([a, 'n'], [b, '']);
  if(lv === 1){
    const ok = tpoly([a, 'n'], [a + b, '']), opts = [ok, tpoly([a, 'n'], [b + 1, '']), tpoly([a, 'n'], [b - a, '']), tpoly([a + 1, 'n'], [b, ''])];
    k2chk(new Set(opts).size === 4, 'k1 lv1 trùng');
    return QC({text:`Cho dãy số ${tm('(u_n)')} với ${tm(`u_n = ${un}`)}. Số hạng ${tm('u_{n+1}')} bằng:`, opts:opts.map(tm), ans:tm(ok),
      hint:`${tm('u_{n+1}')} có được bằng cách thay <b>mọi</b> chữ ${tm('n')} trong công thức của ${tm('u_n')} bởi ${tm('n+1')}, rồi mới rút gọn.`,
      sol:`${tm(`u_{n+1} = ${a}(n+1) ${sg(b)} ${ab(b)} = ${ok}`)}. Đáp án: ${tb(ok)}. (Các đáp án còn lại là nhầm với ${tm('u_n + 1')} hoặc ${tm('u_{n-1}')}.)`});
  }
  const m = R(8, 30), v = a * m + b;
  if(lv === 2){
    k2chk(a * m + b === v, 'k1 lv2');
    return QB({text:`Số <b>${v}</b> là số hạng thứ mấy của dãy số ${tm(`u_n = ${un}`)}?`, tpl:'Số hạng thứ [_]', ans:[m],
      hint:`Giải phương trình ${tm(`u_n = ${v}`)} với ẩn ${tm('n')}; kết quả phải là số nguyên dương.`,
      sol:`${tm(`${un} = ${v}${EQ2}${a}n = ${v - b}${EQ2}n = ${m}`)}. Vậy ${tb(v)} là số hạng thứ ${tb(m)}.`});
  }
  const good = v, wr = [v + 1, b, b - a];
  k2chk(wr.every(x => (x - b) % a !== 0 || (x - b) / a < 1) && new Set([good, ...wr]).size === 4, 'k1 lv3');
  const why = x => x === v + 1 ? `${tm(`n = ${tfrac(x - b, a)}`)} không nguyên` : x === b ? `${tm('n = 0')} không phải số nguyên dương` : `${tm('n = -1')} âm`;
  return QC({text:`Số nào sau đây là <b>một số hạng</b> của dãy số ${tm(`u_n = ${un}`)}?`, opts:[good, ...wr].map(x => tm(x)), ans:tm(good),
    hint:`Số ${tm('x')} là số hạng của dãy khi phương trình ${tm('u_n = x')} có nghiệm ${tm('n')} nguyên dương. Thử lần lượt từng đáp án.`,
    sol:`Với ${tm(String(good))}: ${tm(`n = ${m}`)} (nhận). ${wr.map(x => `Với ${tm(String(x))}: ${why(x)} (loại)`).join('. ')}. Đáp án: ${tb(good)}.`});
};

const cK2 = lv => {   // dãy cho bằng truy hồi
  if(lv === 1){
    const u1 = R(1, 5), c = pick([2, 3]), e = nz(-4, 4), seq = [u1];
    for(let i = 1; i < 4; i++) seq.push(c * seq[i - 1] + e);
    return QB({text:`Cho dãy số ${tm('(u_n)')} xác định bởi ${tm(`u_1 = ${u1},\\ u_{n+1} = ${tpoly([c, 'u_n'], [e, ''])}`)} với mọi ${tm('n \\ge 1')}. Tính ${tm('u_4')}.`, tpl:blankU(4), ans:[seq[3]],
      hint:`Tính lần lượt ${tm('u_2')}, rồi ${tm('u_3')}, rồi ${tm('u_4')}; mỗi lần dùng số hạng vừa tìm được.`,
      sol:`${tm(`u_2 = ${c}\\cdot ${tp(seq[0])} ${sg(e)} ${ab(e)} = ${seq[1]}`)}; ${tm(`u_3 = ${c}\\cdot ${tp(seq[1])} ${sg(e)} ${ab(e)} = ${seq[2]}`)}; ${tm(`u_4 = ${c}\\cdot ${tp(seq[2])} ${sg(e)} ${ab(e)} = ${seq[3]}`)}. Đáp số: ${tb(seq[3])}.`});
  }
  if(lv === 2){
    const u1 = R(1, 5), p = pick([2, 3]), q = nz(-3, 3), seq = [u1];
    for(let k = 1; k < 5; k++) seq.push(seq[k - 1] + p * k + q);
    return QB({text:`Cho dãy số ${tm('(u_n)')} xác định bởi ${tm(`u_1 = ${u1},\\ u_{n+1} = u_n + ${tpoly([p, 'n'], [q, ''])}`)} với mọi ${tm('n \\ge 1')}. Tính ${tm('u_5')}.`, tpl:blankU(5), ans:[seq[4]],
      hint:`Để tính ${tm('u_{k+1}')}, thay ${tm('n = k')} (không phải ${tm('k+1')}) vào vế phải. Bắt đầu từ ${tm('n = 1')} để được ${tm('u_2')}.`,
      sol:[1, 2, 3, 4].map(k => `${tm(`u_{${k + 1}} = u_{${k}} + ${p}\\cdot ${k} ${sg(q)} ${ab(q)} = ${seq[k - 1]} + ${p * k + q < 0 ? '(' + (p * k + q) + ')' : p * k + q} = ${seq[k]}`)}`).join('; ') + `. Đáp số: ${tb(seq[4])}.`});
  }
  const u1 = R(1, 3), u2 = R(2, 5), k = pick([1, 2, -1]), seq = [u1, u2];
  for(let i = 2; i < 5; i++) seq.push(seq[i - 1] + k * seq[i - 2]);
  const kt = k === 1 ? 'u_n' : k === -1 ? '-u_n' : `${k}u_n`;
  return QB({text:`Cho dãy số ${tm('(u_n)')} xác định bởi ${tm(`u_1 = ${u1},\\ u_2 = ${u2},\\ u_{n+2} = u_{n+1} + ${kt}`).replace('+ -', '- ')} với mọi ${tm('n \\ge 1')}. Tính ${tm('u_5')}.`, tpl:blankU(5), ans:[seq[4]],
    hint:`Mỗi số hạng (từ ${tm('u_3')}) được tính từ <b>hai</b> số hạng liền trước. Lập bảng ${tm('u_3, u_4, u_5')} theo thứ tự.`,
    sol:[3, 4, 5].map(i => `${tm(`u_{${i}} = u_{${i - 1}} ${sg(k)} ${ab(k) === 1 ? '' : ab(k) + '\\cdot '}${tp(seq[i - 3])}`)} ${tm(`= ${seq[i - 2]} ${sg(k)} ${ab(k) === 1 ? '' : ab(k) + '\\cdot '}${tp(seq[i - 3])} = ${seq[i - 1]}`)}`).join('; ') + `. Đáp số: ${tb(seq[4])}.`});
};

const K3DEC = (p, q, kk) => [[`${p} - ${q}n`, `${tm(`u_{n+1} - u_n = -${q}`)} âm nên dãy giảm`], [`\\dfrac{1}{n + ${kk}}`, 'mẫu số tăng dần nên phân số giảm dần'], [`\\dfrac{${p}}{2^n}`, 'mẫu số tăng gấp đôi mỗi lần nên dãy giảm'], [`\\dfrac{${p}}{n}`, 'mẫu số tăng nên dãy giảm']];
const K3NON = (p, kk) => [[`n^2 + ${kk}`, 'dãy tăng'], ['(-1)^n', 'các số hạng luân phiên −1, 1 nên không tăng, không giảm'], ['(-1)^n n', 'dấu luân phiên nên không đơn điệu'], ['2^n', 'dãy tăng'],
  [`n + ${kk}`, 'dãy tăng'], ['\\dfrac{n}{n+1}', `${tm('1 - \\dfrac{1}{n+1}')} tăng nên dãy tăng`], [`${kk}n - ${p}`, 'dãy tăng']];
const cK3 = lv => {   // tính đơn điệu, nhỏ nhất, tham số
  if(lv === 1){
    const p = R(8, 20), q = R(2, 5), kk = R(1, 4), good = pick(K3DEC(p, q, kk)), bads = shuffle(K3NON(p, kk)).slice(0, 3), all = [good, ...bads];
    return QC({text:`Dãy số nào sau đây là dãy <b>giảm</b>?`, opts:all.map(x => tm(`u_n = ${x[0]}`)), ans:tm(`u_n = ${good[0]}`),
      hint:`Với mỗi dãy, tính vài số hạng đầu hoặc so sánh ${tm('u_{n+1}')} với ${tm('u_n')}. Chú ý ${tm('(-1)^n')} làm dấu đổi luân phiên.`,
      sol:all.map(x => `${tm(`u_n = ${x[0]}`)}: ${x[1]}`).join('; ') + `. Đáp án: ${tb(`u_n = ${good[0]}`)}.`});
  }
  if(lv === 2){
    const s = R(3, 9), c = R(0, 15), un = n => n * n - s * n + c;
    let best = Infinity, bn = 0; for(let n = 1; n <= s + 3; n++) if(un(n) < best){ best = un(n); bn = n; }
    k2chk(un(bn) <= un(bn - 1 || 99) && un(bn) <= un(bn + 1), 'k3 min');
    const odd = s % 2 === 1;
    return QB({text:`Tìm giá trị nhỏ nhất của dãy số ${tm(`u_n = ${tpoly([1, 'n^2'], [-s, 'n'], [c, ''])}`)} (${tm('n')} nguyên dương).`, tpl:`<span class="eq">${tm('\\min u_n =')} [_]</span>`, ans:[best],
      hint:`Đồ thị ${tm('y = x^2 - ' + s + 'x + ' + c)} có đỉnh ở ${tm('x = ' + tf(s, 2))}. Nhưng ${tm('n')} chỉ nhận giá trị nguyên dương: hãy xét số nguyên gần đỉnh nhất.`,
      sol:odd ? `Đỉnh ở ${tm(`x = ${s / 2}`)} không nguyên; hai số nguyên gần nhất là ${tm(`n = ${(s - 1) / 2}`)} và ${tm(`n = ${(s + 1) / 2}`)} cho cùng giá trị ${tm(`u_n = ${best}`)}. Vậy giá trị nhỏ nhất là ${tb(best)}.`
              : `Đỉnh ở ${tm(`x = ${s / 2}`)} là số nguyên dương nên giá trị nhỏ nhất đạt tại ${tm(`n = ${s / 2}`)}: ${tm(`u_{${s / 2}} = ${s * s / 4} - ${s * s / 2} + ${c} = ${best}`)}. Đáp số: ${tb(best)}.`});
  }
  const c = pick([2, 3, 4]), b = R(1, 11), a = Math.floor(b / c) + 1;
  const inc = (m, n) => (m * (n + 1) + b) * (n + c) > (m * n + b) * (n + 1 + c);
  let allInc = true, anyNot = false; for(let n = 1; n <= 60; n++){ if(!inc(a, n)) allInc = false; if(!inc(a - 1, n)) anyNot = true; }
  k2chk(allInc && anyNot, 'k3 lv3');
  return QB({text:`Tìm số nguyên ${tm('m')} <b>nhỏ nhất</b> để dãy số ${tm(`u_n = \\dfrac{mn + ${b}}{n + ${c}}`)} là dãy <b>tăng</b>.`, tpl:blankV('m'), ans:[a],
    hint:`Xét hiệu ${tm('u_{n+1} - u_n')}: quy đồng, tử số không còn chứa ${tm('n')}. Dãy tăng khi hiệu này <b>dương</b> với mọi ${tm('n')} (dương hẳn, không phải bằng 0).`,
    sol:`${tm(`u_{n+1} - u_n = \\dfrac{${c}m - ${b}}{(n + ${c})(n + ${c + 1})}`)}. Mẫu dương, nên dãy tăng khi ${tm(`${c}m - ${b} \\gt 0${EQ2}m \\gt ${tfrac(b, c)}`)}. Số nguyên nhỏ nhất là ${tb(`m = ${a}`)}.`});
};

const K2KT1 = [
  k2kt('Dãy số cho bằng công thức và truy hồi', `${tm('u_{n+1}')}: thay <b>mọi</b> ${tm('n')} bởi ${tm('n+1')}. Truy hồi: tính lần lượt từng số hạng từ số hạng đầu.`, `${tm('u_{n+1} \\ne u_n + 1')}; ${tm('u_{n+1} \\ne u_{n-1}')}. Khi tính ${tm('u_{k+1}')} từ ${tm('u_{n+1} = u_n + f(n)')} phải thay ${tm('n = k')}.`, 'Lập bảng nhỏ: n — u_n — u_{n+1} để khỏi lệch chỉ số.'),
  k2kt('Số hạng của dãy', `${tm('x')} là số hạng của dãy khi ${tm('u_n = x')} có nghiệm ${tm('n')} <b>nguyên dương</b>.`, `Nghiệm ${tm('n = 0')}, ${tm('n \\lt 0')} hay không nguyên đều phải loại.`, 'Thử đáp án bằng cách tính n rồi kiểm tra n nguyên, n ≥ 1.'),
  k2kt('Dãy tăng, giảm, nhỏ nhất', `Xét dấu ${tm('u_{n+1} - u_n')}: dương → tăng, âm → giảm. Nhỏ nhất của ${tm('n^2 - sn + c')}: xét số nguyên gần ${tm('s/2')}.`, `${tm('(-1)^n')} làm dãy không đơn điệu. Đỉnh parabol không nguyên thì phải thử hai số nguyên hai bên. “Tăng” là hiệu <b>dương hẳn</b>.`, 'Tham số: biến đổi hiệu ' + tm('u_{n+1} - u_n') + ' thành phân thức có tử không chứa ' + tm('n') + '.')
];
lesson(92, 'c2k-day-so', 'Củng cố Chương II · 1. Dãy số – chỗ dễ sai', 'Tính u_{n+1}; số nguyên dương n cho một số hạng; truy hồi (nhầm chỉ số); dãy tăng – giảm; giá trị nhỏ nhất; tìm tham số để dãy tăng.', [cK1, cK2, cK3], {introTitle:K2T, intro:K2KT1});

/* ---------- BÀI 2. CẤP SỐ CỘNG – CHỖ DỄ SAI ---------- */
const cL1 = lv => {
  if(lv === 1){
    const c = R(10, 30), a = R(2, 9), form = pick([0, 1]);
    const f = form ? `${a}(${c} - n)` : `${c} - ${a}n`;
    return QB({text:`Dãy số ${tm('(u_n)')} với ${tm(`u_n = ${f}`)} là một cấp số cộng. Tìm công sai ${tm('d')}.`, tpl:blankV('d'), ans:[-a],
      hint:`Công sai ${tm('d = u_{n+1} - u_n')}. Tính hiệu này, chú ý dấu của hệ số của ${tm('n')}.`,
      sol:`${tm(`u_{n+1} - u_n = ${f.replace(/n/g, '(n+1)')} - ${form ? `${a}(${c} - n)` : `(${c} - ${a}n)`}`)} ${tm(`= -${a}`)}. Công sai là số <b>âm</b>: ${tb(`d = -${a}`)}.`});
  }
  if(lv === 2){
    const u1 = R(-10, 15), d = nz(-6, 7), p = R(2, 5), q = p + R(2, 5), r = q + R(3, 8), up = u1 + (p - 1) * d, uq = u1 + (q - 1) * d, ur = u1 + (r - 1) * d;
    k2chk((uq - up) === (q - p) * d, 'L1 lv2');
    return QB({text:`Cho cấp số cộng ${tm('(u_n)')} có ${tm(`u_{${p}} = ${up}`)} và ${tm(`u_{${q}} = ${uq}`)}. Tính ${tm(`u_{${r}}`)}.`, tpl:blankU(r), ans:[ur],
      hint:`Từ ${tm(`u_{${p}}`)} đến ${tm(`u_{${q}}`)} có bao nhiêu <b>khoảng</b> công sai? (Số khoảng = hiệu hai chỉ số, không cộng thêm 1.)`,
      sol:`${tm(`u_{${q}} - u_{${p}} = ${q - p}d${RA2}d = ${tfrac(uq - up, q - p)} = ${d}`)}. Rồi ${tm(`u_{${r}} = u_{${q}} + ${r - q}d = ${uq} ${sg(d)} ${r - q}\\cdot ${ab(d)} = ${ur}`)}. Đáp số: ${tb(ur)}.`});
  }
  const al = R(1, 3), be = R(1, 3), ga = R(1, 4), m = nz(-5, 6), a = R(-6, 6), b = R(-6, 6), k = al + ga - 2 * be;
  if(k === 0) return cL1(3);
  const c = 2 * b - a - k * m;
  k2chk(((al * m + a) + (ga * m + c)) === 2 * (be * m + b), 'L1 lv3');
  const t = [tpoly([al, 'm'], [a, '']), tpoly([be, 'm'], [b, '']), tpoly([ga, 'm'], [c, ''])];
  return QB({text:`Tìm giá trị của ${tm('m')} để ba số ${tm(t[0])}; ${tm(t[1])}; ${tm(t[2])} (theo thứ tự đó) lập thành một cấp số cộng.`, tpl:blankV('m'), ans:[m],
    hint:`Ba số ${tm('x, y, z')} lập thành cấp số cộng khi số ở giữa là trung bình cộng của hai số kia: ${tm('x + z = 2y')}. Thay vào rồi giải phương trình bậc nhất ẩn ${tm('m')}.`,
    sol:`${tm(`(${t[0]}) + (${t[2]}) = 2(${t[1]})`)} ${tm(`${RA2} ${tpoly([al + ga, 'm'], [a + c, ''])} = ${tpoly([2 * be, 'm'], [2 * b, ''])}${EQ2}${k}m = ${2 * b - a - c}`)}. Vậy ${tb(`m = ${m}`)}.`});
};

const cL2 = lv => {
  if(lv === 1){
    const u1 = R(-5, 20), d = nz(-5, 6), n = R(8, 20), S = sumCSC(u1, d, n);
    return QB({text:`Cho cấp số cộng ${tm('(u_n)')} có ${tm(`u_1 = ${u1}`)}, ${tm(`d = ${d}`)}. Tính tổng ${tm(`${n}`)} số hạng đầu ${tm(`S_{${n}}`)}.`, tpl:blankV(`S_{${n}}`), ans:[S],
      hint:`${tm('S_n = \\dfrac{n[2u_1 + (n-1)d]}{2}')}. Khi ${tm('d')} âm, cẩn thận với phép nhân và dấu trừ.`,
      sol:`${tm(`S_{${n}} = \\dfrac{${n}[2\\cdot ${tp(u1)} + ${n - 1}\\cdot ${tp(d)}]}{2} = \\dfrac{${n}\\cdot ${2 * u1 + (n - 1) * d}}{2} = ${S}`)}. Đáp số: ${tb(S)}.`});
  }
  if(lv === 2){
    const u1 = R(-4, 12), d = nz(-4, 6), p = R(3, 8), q = p + R(4, 10), cnt = q - p + 1;
    let S = 0; for(let k = p; k <= q; k++) S += u1 + (k - 1) * d;
    k2chk(S === sumCSC(u1, d, q) - sumCSC(u1, d, p - 1), 'L2 lv2');
    const up = u1 + (p - 1) * d, uq = u1 + (q - 1) * d;
    return QB({text:`Cho cấp số cộng có ${tm(`u_1 = ${u1}`)}, ${tm(`d = ${d}`)}. Tính tổng ${tm(`u_{${p}} + u_{${p + 1}} + \\ldots + u_{${q}}`)}.`, tpl:'Tổng = [_]', ans:[S],
      hint:`Đếm xem tổng có bao nhiêu số hạng (từ số thứ ${p} đến số thứ ${q}), rồi dùng: số số hạng nhân trung bình cộng của số hạng đầu và cuối.`,
      sol:`Có ${tm(`${q} - ${p} + 1 = ${cnt}`)} số hạng; ${tm(`u_{${p}} = ${up}`)}, ${tm(`u_{${q}} = ${uq}`)}. Tổng ${tm(`= ${cnt}\\cdot \\dfrac{${tp(up)} + ${tp(uq)}}{2} = ${S}`)}. Đáp số: ${tb(S)}. (Cách khác: ${tm(`S_{${q}} - S_{${p - 1}}`)}.)`});
  }
  const e = pick([2, 3, 4, 5]), m = R(4, 8), n1 = R(2, m), n2 = 2 * m + 1 - n1, u1 = e * m, d = -e, T = e * n1 * n2 / 2;
  k2chk(sumCSC(u1, d, n1) === T && sumCSC(u1, d, n2) === T && Number.isInteger(T), 'L2 lv3');
  for(let n = 1; n <= 4 * m; n++) if(n !== n1 && n !== n2) k2chk(sumCSC(u1, d, n) !== T, 'L2 lv3 nghiệm thừa');
  return QB({text:`Cho cấp số cộng có ${tm(`u_1 = ${u1}`)}, ${tm(`d = ${d}`)}. Có đúng <b>hai</b> giá trị nguyên dương của ${tm('n')} để ${tm(`S_n = ${T}`)}. Điền hai giá trị đó theo thứ tự tăng dần.`, tpl:two2('n_1', 'n_2'), ans:[n1, n2],
    hint:`Lập phương trình ${tm(`S_n = ${T}`)}, đưa về phương trình bậc hai ẩn ${tm('n')}. Xét <b>cả hai</b> nghiệm: nghiệm nguyên dương nào cũng nhận.`,
    sol:`${tm(`\\dfrac{n[${2 * u1} - ${e}(n-1)]}{2} = ${T}${EQ2}${e}n^2 - ${2 * u1 + e}n + ${2 * T} = 0`)}, có hai nghiệm ${tm(`n = ${n1}`)} và ${tm(`n = ${n2}`)}, cả hai đều nguyên dương. Vì công sai âm nên các số hạng giảm dần và đổi dấu, tổng tăng rồi giảm lại. Đáp số: ${tb(`${n1};\\ ${n2}`)}.`});
};

const cL3 = lv => {
  if(lv === 1){
    const m = R(3, 8), s = R(1, m - 1), p = m - s, q = m + s, v = R(-8, 25);
    return QB({text:`Cho cấp số cộng ${tm('(u_n)')} thoả mãn ${tm(`u_{${p}} + u_{${q}} = ${2 * v}`)}. Tính ${tm(`u_{${m}}`)}.`, tpl:blankU(m), ans:[v],
      hint:`Hai chỉ số ${p} và ${q} nằm cách đều số ${m}: ${tm(`${p} + ${q} = 2\\cdot ${m}`)}. Trong cấp số cộng, số hạng ở giữa là trung bình cộng của hai số hạng cách đều nó.`,
      sol:`Vì ${tm(`${p} + ${q} = 2\\cdot ${m}`)} nên ${tm(`u_{${p}} + u_{${q}} = 2u_{${m}}`)}, suy ra ${tm(`u_{${m}} = \\dfrac{${2 * v}}{2} = ${v}`)}. Đáp số: ${tb(v)}.`});
  }
  if(lv === 2){
    const u1 = R(-8, 15), d = nz(-5, 6);
    let p, q, r, s; do{ p = R(1, 6); q = R(2, 9); r = R(3, 12); s = R(1, 8); }while(r <= s || p === q);
    const A = (p - 1) * d + (q - 1) * d + 2 * u1, B = (r - s) * d;
    k2chk(A === (u1 + (p - 1) * d) + (u1 + (q - 1) * d) && B === (u1 + (r - 1) * d) - (u1 + (s - 1) * d), 'L3 lv2');
    return QB({text:`Cho cấp số cộng ${tm('(u_n)')} thoả mãn ${tm(`u_{${p}} + u_{${q}} = ${A}`)} và ${tm(`u_{${r}} - u_{${s}} = ${B}`)}. Tìm ${tm('u_1')} và ${tm('d')}.`, tpl:two2('u_1', 'd'), ans:[u1, d],
      hint:`Điều kiện thứ hai chỉ chứa ${tm('d')}: ${tm(`u_{${r}} - u_{${s}} = (${r} - ${s})d`)}. Tìm ${tm('d')} trước rồi thay vào điều kiện thứ nhất.`,
      sol:`${tm(`u_{${r}} - u_{${s}} = ${r - s}d = ${B}${RA2}d = ${d}`)}. Rồi ${tm(`u_{${p}} + u_{${q}} = 2u_1 + ${p + q - 2}d = ${A}${RA2}2u_1 = ${A - (p + q - 2) * d}`)}, ${tb(`u_1 = ${u1}`)}. Đáp số: ${tb(`u_1 = ${u1},\\ d = ${d}`)}.`});
  }
  const a = R(10, 60), b = R(2, 9); let cnt = 0; for(let n = 1; n <= 200; n++) if(a - b * (n - 1) > 0) cnt++;
  k2chk(cnt === Math.ceil(a / b), 'L3 lv3');
  return QB({text:`Cấp số cộng có ${tm(`u_1 = ${a}`)} và ${tm(`d = -${b}`)}. Có bao nhiêu số hạng <b>dương</b>?`, tpl:'[_] số hạng', ans:[cnt],
    hint:`${tm('u_n \\gt 0')} là bất đẳng thức <b>ngặt</b>: số hạng bằng 0 không được tính. Giải ${tm(`${a} - ${b}(n-1) \\gt 0`)} với ${tm('n')} nguyên dương.`,
    sol:`${tm(`${a} - ${b}(n-1) \\gt 0${EQ2}n \\lt ${tfrac(a + b, b)}`)}. ${a % b === 0 ? `Vì ${tm(`n = ${(a + b) / b}`)} cho ${tm('u_n = 0')} (không dương) nên chỉ lấy ${tm(`n \\le ${(a + b) / b - 1}`)}.` : `Số nguyên dương lớn nhất thoả mãn là ${tm(`n = ${cnt}`)}.`} Có ${tb(cnt)} số hạng dương.`});
};

const K2KT2 = [
  k2kt('Công sai, số hạng tổng quát', `${tm('d = u_{n+1} - u_n')}; ${tm('u_n = u_1 + (n-1)d')}; ${tm('u_q = u_p + (q-p)d')}.`, `Từ ${tm('u_p')} đến ${tm('u_q')} có <b>${tm('q-p')}</b> khoảng công sai (không phải ${tm('q-p+1')}). Hệ số của ${tm('n')} âm thì ${tm('d')} âm.`, 'Ba số x, y, z lập cấp số cộng ⇔ x + z = 2y.'),
  k2kt('Tổng các số hạng', `${tm('S_n = \\dfrac{n[2u_1 + (n-1)d]}{2} = \\dfrac{n(u_1 + u_n)}{2}')}. Tổng đoạn từ ${tm('u_p')} đến ${tm('u_q')} có ${tm('q-p+1')} số hạng.`, `Số số hạng của một đoạn là <b>${tm('q-p+1')}</b>. Giải ${tm('S_n = T')} cho phương trình bậc hai: loại nghiệm âm, không nguyên; nhưng khi ${tm('d \\lt 0')} có thể <b>cả hai</b> nghiệm đều nhận.`, 'Hai số hạng cách đều số hạng giữa: ' + tm('u_p + u_q = 2u_m') + ' khi ' + tm('p + q = 2m') + '.'),
  k2kt('Số hạng dương, âm, đổi dấu', `Giải bất phương trình ${tm('u_n \\gt 0')} hoặc ${tm('u_n \\lt 0')} theo ${tm('n')}.`, `“Dương” là ${tm('\\gt 0')}, bằng 0 thì <b>không</b> tính. Kết quả đếm phải là số nguyên.`, 'Kiểm tra lại bằng số hạng ở đúng biên.')
];
lesson(92, 'c2k-csc', 'Củng cố Chương II · 2. Cấp số cộng – chỗ dễ sai', 'Công sai âm; u_r từ hai số hạng cho trước; ba số lập cấp số cộng (tham số); tổng n số hạng, tổng một đoạn; hai nghiệm n; hệ điều kiện; đếm số hạng dương.', [cL1, cL2, cL3], {introTitle:K2T, intro:K2KT2});

/* ---------- BÀI 3. CẤP SỐ NHÂN – CHỖ DỄ SAI ---------- */
const cM1 = lv => {
  if(lv === 1){
    const c = pick([2, 3, 4, 5]), r = pick([-5, -4, -3, -2, 2, 3, 4, 5]);
    return QB({text:`Dãy số ${tm('(u_n)')} với ${tm(`u_n = ${c}\\cdot ${tp(r)}^n`)} là một cấp số nhân. Tìm công bội ${tm('q')}.`, tpl:blankV('q'), ans:[r],
      hint:`Công bội ${tm('q = \\dfrac{u_{n+1}}{u_n}')}. Chia hai số hạng liên tiếp, để ý số mũ giảm đi mấy đơn vị.`,
      sol:`${tm(`\\dfrac{u_{n+1}}{u_n} = \\dfrac{${c}\\cdot ${tp(r)}^{n+1}}{${c}\\cdot ${tp(r)}^n} = ${tp(r)}`)}. Công bội ${tb(`q = ${r}`)}${r < 0 ? ' (các số hạng đổi dấu luân phiên)' : ''}.`});
  }
  if(lv === 2){
    const u1 = nz(-4, 5), r = R(2, 4), A = u1 * r, B = u1 * r ** 3;
    k2chk(B / A === r * r, 'M1 lv2');
    return QB({text:`Cho cấp số nhân ${tm('(u_n)')} có ${tm(`u_2 = ${A}`)} và ${tm(`u_4 = ${B}`)}. Tìm <b>tất cả</b> các giá trị của công bội ${tm('q')} (điền giá trị âm trước, dương sau).`, tpl:two2('q_1', 'q_2'), ans:[-r, r],
      hint:`${tm('u_4 = u_2\\cdot q^2')}. Phương trình ${tm('q^2 = \\text{số dương}')} có mấy nghiệm?`,
      sol:`${tm(`q^2 = \\dfrac{u_4}{u_2} = \\dfrac{${B}}{${A}} = ${r * r}${RA2}q = \\pm ${r}`)}. Cả hai đều thoả mãn vì ${tm(`u_1 = \\dfrac{${A}}{q} = ${tp(A / r)}`)} hoặc ${tm(`${tp(-A / r)}`)} đều là số thực. Đáp số: ${tb(`q = ${-r}`)} và ${tb(`q = ${r}`)}.`});
  }
  const u1 = nz(-5, 5), q = pick([-3, -2, 2, 3]), A = u1 * q * q, B = u1 * q ** 5;
  k2chk(B / A === q ** 3 && A / (q * q) === u1, 'M1 lv3');
  return QB({text:`Cho cấp số nhân ${tm('(u_n)')} có ${tm(`u_3 = ${A}`)} và ${tm(`u_6 = ${B}`)}. Tìm ${tm('u_1')} và ${tm('q')}.`, tpl:two2('u_1', 'q'), ans:[u1, q],
    hint:`${tm('u_6 = u_3\\cdot q^3')}: tìm ${tm('q^3')} rồi lấy căn bậc ba (căn bậc ba của số âm là số âm). Sau đó ${tm('u_3 = u_1 q^2')}.`,
    sol:`${tm(`q^3 = \\dfrac{${B}}{${A}} = ${q ** 3}${RA2}q = ${q}`)}. Rồi ${tm(`u_1 = \\dfrac{u_3}{q^2} = \\dfrac{${A}}{${q * q}} = ${u1}`)}. Đáp số: ${tb(`u_1 = ${u1},\\ q = ${q}`)}.`});
};

const cM2 = lv => {
  if(lv === 1){
    const u1 = R(1, 5), q = pick([-2, -3]), n = R(4, 7); let S = 0; for(let i = 0; i < n; i++) S += u1 * q ** i;
    k2chk(S === u1 * (1 - q ** n) / (1 - q), 'M2 lv1');
    return QB({text:`Cho cấp số nhân có ${tm(`u_1 = ${u1}`)}, ${tm(`q = ${q}`)}. Tính tổng ${n} số hạng đầu ${tm(`S_{${n}}`)}.`, tpl:blankV(`S_{${n}}`), ans:[S],
      hint:`${tm('S_n = u_1\\cdot \\dfrac{1 - q^n}{1 - q}')}. Khi ${tm('q')} âm, ${tm(`(${q})^${n}`)} mang dấu ${n % 2 ? 'âm' : 'dương'}; đặt trong ngoặc khi tính.`,
      sol:`${tm(`S_{${n}} = ${u1}\\cdot \\dfrac{1 - ${tp(q)}^{${n}}}{1 - ${tp(q)}} = ${u1}\\cdot \\dfrac{${1 - q ** n}}{${1 - q}} = ${S}`)}. Đáp số: ${tb(S)}.`});
  }
  if(lv === 2){
    const u1 = pick([1, 2, 3, 5]), q = pick([2, 3]), n = R(3, 7), T = u1 * (q ** n - 1) / (q - 1);
    return QB({text:`Cấp số nhân có ${tm(`u_1 = ${u1}`)}, ${tm(`q = ${q}`)}. Tổng ${tm('n')} số hạng đầu bằng <b>${T}</b>. Tìm ${tm('n')}.`, tpl:blankV('n'), ans:[n],
      hint:`Viết ${tm(`S_n = ${u1}\\cdot \\dfrac{${q}^n - 1}{${q - 1}}`)} rồi đặt bằng ${T}, đưa về dạng ${tm(`${q}^n = \\text{số}`)}. Chú ý: ${tm('S_n')} có chứa phép trừ 1.`,
      sol:`${tm(`${u1}\\cdot \\dfrac{${q}^n - 1}{${q - 1}} = ${T}${EQ2}${q}^n - 1 = ${T * (q - 1) / u1}${EQ2}${q}^n = ${q ** n}`)}, suy ra ${tb(`n = ${n}`)}.`});
  }
  const a = pick([1, 2, 3]), q = pick([2, 3]), m = R(5, 9), S = a * (q ** (m + 1) - 1) / (q - 1);
  let chk = 0; for(let i = 0; i <= m; i++) chk += a * q ** i; k2chk(chk === S, 'M2 lv3');
  return QB({text:`Tính tổng ${tm(`S = ${a} + ${a * q} + ${a * q * q} + \\ldots + ${a * q ** m}`)}, biết các số hạng lập thành một cấp số nhân.`, tpl:'S = [_]', ans:[S],
    hint:`Số hạng cuối là ${tm(`${a}\\cdot ${q}^{${m}}`)}, nên số hạng cuối là số thứ <b>mấy</b>? (Đếm số mũ từ ${tm(`${q}^0`)}.)`,
    sol:`Các số hạng là ${tm(`${a}\\cdot ${q}^0, ${a}\\cdot ${q}^1, \\ldots, ${a}\\cdot ${q}^{${m}}`)}: có ${tm(`${m} + 1 = ${m + 1}`)} số hạng. ${tm(`S = ${a}\\cdot \\dfrac{${q}^{${m + 1}} - 1}{${q} - 1} = ${S}`)}. Đáp số: ${tb(S)}.`});
};

const K2CACHE = {};
const k2ba = () => {   // (m - d, m, m + d) lập cấp số cộng, cộng thêm (e1, e2, e3) thì thành cấp số nhân; chỉ một bộ ba số dương
  if(!K2CACHE.list){ const L = [];
    for(let m = 4; m <= 15; m++) for(let d = 1; d < m; d++) for(let e1 = 0; e1 <= 12; e1++) for(let e3 = 0; e3 <= 12; e3++) for(let e2 = 0; e2 <= 12; e2++){
      const A = m - d + e1, B = m + d + e3, C = m + e2;
      if(C * C !== A * B || (A === C && C === B)) continue;
      const other = (m + e1 - (m + e3)) - d;
      if(other === -d || Math.abs(other) >= m) L.push({m, d, e1, e2, e3});
    }
    K2CACHE.list = L; }
  return pick(K2CACHE.list);
};
const cM3 = lv => {
  if(lv === 1){
    const t1 = pick([-3, -2, -1, 1, 2, 3, 4]), q = pick([-3, -2, 2, 3]), t = [t1, t1 * q, t1 * q * q], x = nz(-6, 6), a = t[0] - x, b = t[1] - x, c = t[2] - x;
    const ex = [tpoly([1, 'x'], [a, '']), tpoly([1, 'x'], [b, '']), tpoly([1, 'x'], [c, ''])];
    k2chk((x + b) ** 2 === (x + a) * (x + c) && (2 * b - a - c) !== 0 && (a * c - b * b) / (2 * b - a - c) === x, 'M3 lv1');
    return QB({text:`Tìm giá trị của ${tm('x')} để ba số ${tm(ex[0])}; ${tm(ex[1])}; ${tm(ex[2])} (theo thứ tự đó) lập thành một cấp số nhân.`, tpl:blankV('x'), ans:[x],
      hint:`Ba số ${tm('a, b, c')} (khác 0) lập thành cấp số nhân khi ${tm('b^2 = ac')}. (Đừng dùng điều kiện ${tm('a + c = 2b')} của cấp số cộng.) Khai triển rồi rút gọn, ${tm('x^2')} sẽ triệt tiêu.`,
      sol:`${tm(`(${ex[1]})^2 = (${ex[0]})(${ex[2]})`)}. Khai triển, ${tm('x^2')} triệt tiêu: ${tm(`${tpoly([2 * b, 'x'], [b * b, ''])} = ${tpoly([a + c, 'x'], [a * c, ''])}${EQ2}${2 * b - a - c}x = ${a * c - b * b}`)}. Vậy ${tb(`x = ${x}`)}. (Thử lại: ba số là ${tm(`${t.join(';\\ ')}`)}.)`});
  }
  if(lv === 2){
    const u1 = pick([1, 2, 3]), q = pick([2, 3, 4]), A = u1 * (1 + q ** 3), B = u1 * q * (1 + q);
    k2chk(A * q === B * (q * q - q + 1), 'M3 lv2');
    return QB({text:`Một cấp số nhân có bốn số hạng ${tm('u_1, u_2, u_3, u_4')} với ${tm(`u_1 + u_4 = ${A}`)} và ${tm(`u_2 + u_3 = ${B}`)}. Biết công bội ${tm('q \\gt 1')}, tìm ${tm('q')}.`, tpl:blankV('q'), ans:[q],
      hint:`Chia vế theo vế: ${tm('\\dfrac{u_1(1 + q^3)}{u_1 q(1 + q)}')}. Nhớ ${tm('1 + q^3 = (1 + q)(1 - q + q^2)')}. Phương trình bậc hai ẩn ${tm('q')} có hai nghiệm; điều kiện ${tm('q \\gt 1')} chọn nghiệm đúng.`,
      sol:`${tm(`\\dfrac{${A}}{${B}} = \\dfrac{1 + q^3}{q + q^2} = \\dfrac{q^2 - q + 1}{q}`)}. Quy đồng: ${tm(`${B}q^2 - ${B + A}q + ${B} = 0`)}, có hai nghiệm ${tm(`q = ${q}`)} và ${tm(`q = ${tfrac(1, q)}`)}. Vì ${tm('q \\gt 1')} nên ${tb(`q = ${q}`)}.`});
  }
  const {m, d, e1, e2, e3} = k2ba(), orig = [m - d, m, m + d], nw = [m - d + e1, m + e2, m + d + e3];
  k2chk(nw[1] * nw[1] === nw[0] * nw[2] && orig.every(x => x > 0), 'M3 lv3');
  const add = [e1, e2, e3].map(e => e === 0 ? '0' : String(e));
  return QB({text:`Ba số dương lập thành một cấp số cộng có tổng bằng <b>${3 * m}</b>. Nếu lần lượt cộng thêm <b>${add[0]}</b>, <b>${add[1]}</b> và <b>${add[2]}</b> vào số thứ nhất, thứ hai, thứ ba thì được ba số lập thành một cấp số nhân. Tìm số <b>lớn nhất</b> trong ba số ban đầu.`, tpl:'[_]', ans:[m + d], wide:true,
    hint:`Gọi ba số là ${tm('x - d,\\ x,\\ x + d')}. Tổng cho biết ${tm('x')}. Sau khi cộng thêm, dùng điều kiện cấp số nhân ${tm('b^2 = ac')} để tìm ${tm('d')}, rồi loại nghiệm làm ba số không dương.`,
    sol:(() => { const A = m + e1, B = m + e3, C = m + e2, o2 = (A - B) - d;
      return `Tổng bằng ${3 * m} nên ${tm(`x = ${m}`)}; ba số là ${tm(`${m} - d,\\ ${m},\\ ${m} + d`)}. Sau khi cộng thêm: ${tm(`${A} - d,\\ ${C},\\ ${B} + d`)}. Điều kiện ${tm(`${C}^2 = (${A} - d)(${B} + d)`)} cho ${tm(`${tpoly([1, 'd^2'], [B - A, 'd'], [C * C - A * B, ''])} = 0`)}, có nghiệm ${tm(`d = ${d}`)}${o2 === -d ? '' : ` hoặc ${tm(`d = ${o2}`)} (loại vì làm một trong ba số ban đầu không dương)`}. Ba số ban đầu: ${tm(orig.join(';\\ '))}; số lớn nhất là ${tb(m + d)}.`; })()});
};

const K2KT3 = [
  k2kt('Công bội và số hạng tổng quát', `${tm('q = \\dfrac{u_{n+1}}{u_n}')}; ${tm('u_n = u_1 q^{n-1}')}; ${tm('u_q = u_p\\cdot q^{\\,q-p}')}.`, `Số mũ là <b>${tm('n-1')}</b>, không phải ${tm('n')}. ${tm('q^2 = a')} (a dương) có <b>hai</b> nghiệm ${tm('\\pm\\sqrt a')}; ${tm('q^3 = a')} chỉ có một nghiệm (cùng dấu với ${tm('a')}).`, 'Ba số a, b, c (khác 0) lập cấp số nhân ⇔ b² = ac.'),
  k2kt('Tổng n số hạng đầu', `${tm('S_n = u_1\\cdot \\dfrac{1 - q^n}{1 - q}')} (${tm('q \\ne 1')}); nếu ${tm('q = 1')} thì ${tm('S_n = nu_1')}.`, `Tổng ${tm('1 + q + \\ldots + q^m')} có ${tm('m+1')} số hạng. Khi ${tm('q')} âm, đặt ${tm('q')} trong ngoặc: ${tm('(-2)^4 = 16')}, còn ${tm('-2^4 = -16')}.`, 'Biết tổng, tìm n: đưa về ' + tm('q^n = \\text{số}') + '.'),
  k2kt('Điều kiện có nhiều nghiệm', 'Đưa điều kiện cấp số nhân về phương trình, giải hết các nghiệm rồi kiểm tra từng nghiệm với yêu cầu đề (dương, lớn hơn 1…).', `Cặp ${tm('q')} và ${tm('\\dfrac{1}{q}')} thường cùng nghiệm: điều kiện ${tm('q \\gt 1')} hay “số lớn nhất” dùng để chọn đáp án.`, 'Thử lại bằng cách tính ba số cuối cùng.')
];
lesson(92, 'c2k-csn', 'Củng cố Chương II · 3. Cấp số nhân – chỗ dễ sai', 'Công bội âm; hai giá trị q khi biết u_2, u_4; căn bậc ba; tổng n số hạng với q âm; tìm n; đếm số hạng khi tính tổng; ba số lập cấp số nhân; cấp số cộng đổi thành cấp số nhân.', [cM1, cM2, cM3], {introTitle:K2T, intro:K2KT3});

/* ---------- BÀI 4. TOÁN THỰC TẾ CÓ HÌNH (1): CẤP SỐ CỘNG ---------- */
const K2TT = 'Quy trình giải toán thực tế · Chỗ dễ sai · Mẹo';
const cN1 = lv => {   // tháp lon
  const a = R(2, 5), d = pick([1, 2]), n = R(5, 11), rows = Array.from({length:n}, (_, i) => a + i * d);
  const fig = stackSVG(rows.slice(0, 3), {top:'Hàng 1', cap:'Chỉ vẽ 3 hàng trên cùng · hàng 1 ở trên cùng'});
  if(lv === 1){
    return QB({text:`Người ta xếp các lon nước thành một tháp gồm <b>${n}</b> hàng (hình vẽ). Hàng trên cùng có ${a} lon, mỗi hàng dưới nhiều hơn hàng ngay trên nó ${d} lon. Hỏi hàng dưới cùng có bao nhiêu lon?`, fig, tpl:'[_] lon', ans:[rows[n - 1]],
      hint:`Số lon mỗi hàng lập thành cấp số cộng với ${tm(`u_1 = ${a}`)}, ${tm(`d = ${d}`)}. Hàng dưới cùng là hàng thứ mấy?`,
      sol:`${tm(`u_{${n}} = ${a} + (${n} - 1)\\cdot ${d} = ${rows[n - 1]}`)}. Hàng dưới cùng có ${tb(rows[n - 1])} lon.`});
  }
  if(lv === 2){
    const S = sumCSC(a, d, n);
    return QB({text:`Một tháp lon nước gồm <b>${n}</b> hàng như hình vẽ: hàng trên cùng có ${a} lon, mỗi hàng dưới nhiều hơn hàng trên ${d} lon. Hỏi cần tất cả bao nhiêu lon để xếp tháp?`, fig, tpl:'[_] lon', ans:[S],
      hint:`Cần <b>tổng</b> số lon của ${n} hàng, không chỉ hàng cuối. Dùng ${tm('S_n = \\dfrac{n(u_1 + u_n)}{2}')}.`,
      sol:`Hàng dưới cùng có ${tm(`u_{${n}} = ${rows[n - 1]}`)} lon. ${tm(`S_{${n}} = \\dfrac{${n}(${a} + ${rows[n - 1]})}{2} = ${S}`)}. Cần ${tb(S)} lon.`});
  }
  const S = sumCSC(a, d, n);
  k2chk(d * n * n + (2 * a - d) * n - 2 * S === 0 && S > 0, 'N1 lv3');
  return QB({text:`Người ta xếp một tháp lon nước (hình vẽ): hàng trên cùng có ${a} lon, mỗi hàng dưới nhiều hơn hàng trên ${d} lon. Tháp dùng tất cả <b>${fmt(S)}</b> lon. Hỏi tháp có bao nhiêu hàng?`, fig, tpl:'[_] hàng', ans:[n],
    hint:`Gọi số hàng là ${tm('x')} và lập phương trình ${tm(`\\dfrac{x[2\\cdot ${a} + (x-1)\\cdot ${d}]}{2} = ${S}`)}. Giải được hai nghiệm; chỉ nhận nghiệm nguyên dương.`,
    sol:`${tm(`${d}x^2 + ${2 * a - d}x - ${2 * S} = 0`)}, nghiệm ${tm(`x = ${n}`)} hoặc ${tm(`x = ${(d - 2 * a) / d - n}`)} (âm, loại). Tháp có ${tb(n)} hàng.`});
};

const K2LAB = k => `Năm ${k}`;
const cN2 = lv => {   // doanh thu tăng đều – đọc từ biểu đồ
  const a = pick([20, 40, 60, 80]), d = pick([20, 40]), vals = [0, 1, 2, 3].map(i => a + i * d), fig = barSVG([1, 2, 3, 4].map(K2LAB), vals, 20, 'triệu đồng');
  const head = `Biểu đồ cho biết doanh thu của một cửa hàng trong 4 năm đầu hoạt động. Biết doanh thu các năm sau tăng <b>đều</b> so với năm trước (lập thành cấp số cộng).`;
  if(lv === 1){
    const n = R(8, 12);
    return QB({text:`${head} Dự đoán doanh thu năm thứ ${n}.`, fig, tpl:'[_] triệu đồng', ans:[a + (n - 1) * d], wide:true,
      hint:`Đọc doanh thu từng năm trên biểu đồ để tìm số hạng đầu và công sai ${tm('d')} (mỗi năm tăng bao nhiêu).`,
      sol:`Từ biểu đồ: ${tm(`u_1 = ${a}`)}, ${tm(`u_2 = ${a + d}`)} nên ${tm(`d = ${d}`)}. ${tm(`u_{${n}} = ${a} + ${n - 1}\\cdot ${d} = ${a + (n - 1) * d}`)}. Doanh thu năm thứ ${n}: ${tb(a + (n - 1) * d)} triệu đồng.`});
  }
  if(lv === 2){
    const n = R(6, 10), S = sumCSC(a, d, n);
    return QB({text:`${head} Tính <b>tổng</b> doanh thu của ${n} năm đầu tiên.`, fig, tpl:'[_] triệu đồng', ans:[S], wide:true,
      hint:`Xác định ${tm('u_1')}, ${tm('d')} từ biểu đồ, rồi dùng công thức ${tm('S_n')}. Câu hỏi là tổng ${n} năm, không phải năm thứ ${n}.`,
      sol:`${tm(`u_1 = ${a}`)}, ${tm(`d = ${d}`)}. ${tm(`S_{${n}} = \\dfrac{${n}[2\\cdot ${a} + ${n - 1}\\cdot ${d}]}{2} = ${S}`)}. Tổng doanh thu: ${tb(fmt(S))} triệu đồng.`});
  }
  const n0 = R(6, 10), T = Math.random() < .5 ? sumCSC(a, d, n0) : sumCSC(a, d, n0) - R(1, 9);
  let n = 1; while(sumCSC(a, d, n) <= T) n++;
  k2chk(sumCSC(a, d, n) > T && sumCSC(a, d, n - 1) <= T, 'N2 lv3');
  return QB({text:`${head} Hỏi sau ít nhất bao nhiêu năm (tính từ năm đầu) thì <b>tổng</b> doanh thu <b>vượt quá</b> ${fmt(T)} triệu đồng?`, fig, tpl:'[_] năm', ans:[n], wide:true,
    hint:`Tìm ${tm('u_1, d')} từ biểu đồ, rồi tìm số nguyên ${tm('n')} nhỏ nhất thoả ${tm(`S_n \\gt ${T}`)}. Chú ý “vượt quá” là lớn hơn hẳn: nếu bằng đúng ${T} thì chưa đủ.`,
    sol:`${tm(`S_n = n(${a} + ${(d / 2)}(n-1)) `)}. Tính thử: ${tm(`S_{${n - 1}} = ${sumCSC(a, d, n - 1)}${sumCSC(a, d, n - 1) === T ? ` = ${T}` : ' \\le ' + T}`)} (chưa vượt), ${tm(`S_{${n}} = ${sumCSC(a, d, n)} \\gt ${T}`)}. Cần ${tb(n)} năm.`});
};

const cN3 = lv => {   // chiếc thang
  const e = R(2, 4), n = pick([9, 10, 11, 12, 13]), b = R(20, 32), a = b + (n - 1) * e;
  const fig = ladderSVG(n, {top:`bậc trên cùng: ${b} cm`, bot:`bậc dưới cùng: ${a} cm`, cap:`Thang ${n} bậc · độ dài các bậc giảm đều từ dưới lên`});
  if(lv === 1){
    const k = R(3, n - 2), v = a - (k - 1) * e;
    return QB({text:`Một chiếc thang có <b>${n}</b> bậc ngang, độ dài các bậc giảm <b>đều</b> từ dưới lên trên. Bậc dưới cùng dài ${a} cm, bậc trên cùng dài ${b} cm. Hỏi bậc thứ ${k} (đếm từ dưới lên) dài bao nhiêu cm?`, fig, tpl:'[_] cm', ans:[v],
      hint:`Độ dài các bậc lập thành cấp số cộng. Từ bậc 1 đến bậc ${n} có ${n - 1} khoảng công sai: ${tm('d = \\dfrac{u_{n} - u_1}{n - 1}')}.`,
      sol:`${tm(`d = \\dfrac{${b} - ${a}}{${n} - 1} = -${e}`)}. ${tm(`u_{${k}} = ${a} + (${k} - 1)\\cdot (-${e}) = ${v}`)}. Bậc thứ ${k} dài ${tb(v)} cm.`});
  }
  if(lv === 2){
    const S = n * (a + b) / 2;
    k2chk(Number.isInteger(S) && S === sumCSC(a, -e, n), 'N3 lv2');
    return QB({text:`Một chiếc thang có <b>${n}</b> bậc ngang, độ dài các bậc giảm đều từ dưới lên trên: bậc dưới cùng dài ${a} cm, bậc trên cùng dài ${b} cm. Tính <b>tổng</b> chiều dài gỗ cần để làm tất cả các bậc ngang.`, fig, tpl:'[_] cm', ans:[S],
      hint:`Với cấp số cộng đã biết số hạng đầu và cuối, ${tm('S_n = \\dfrac{n(u_1 + u_n)}{2}')}; không cần tìm công sai.`,
      sol:`${tm(`S_{${n}} = \\dfrac{${n}(${a} + ${b})}{2} = ${S}`)}. Cần ${tb(S)} cm gỗ (${tdec(S / 100)} m).`});
  }
  return QB({text:`Một chiếc thang có các bậc ngang ngắn dần đều từ dưới lên trên, mỗi bậc ngắn hơn bậc ngay dưới nó ${e} cm. Bậc dưới cùng dài ${a} cm, bậc trên cùng dài ${b} cm. Hỏi thang có bao nhiêu bậc?`, fig:ladderSVG(8, {top:`bậc trên cùng: ${b} cm`, bot:`bậc dưới cùng: ${a} cm`, cap:'Hình minh hoạ: số bậc vẽ không đúng với đề'}), tpl:'[_] bậc', ans:[n],
    hint:`Dùng ${tm('u_n = u_1 + (n-1)d')} với ${tm(`d = -${e}`)} và ${tm(`u_n = ${b}`)}; giải tìm ${tm('n')}. Đừng quên cộng thêm 1 sau khi chia.`,
    sol:`${tm(`${b} = ${a} + (n-1)(-${e})${EQ2}n - 1 = ${tfrac(a - b, e)} = ${n - 1}`)}, nên ${tb(`n = ${n}`)} bậc.`});
};

const cN4 = lv => {   // chia phần quà, góc tứ giác
  if(lv === 1){
    const n = pick([3, 5]), mid = R(10, 24), d = R(2, 4), arr = Array.from({length:n}, (_, i) => mid + (i - (n - 1) / 2) * d), S = n * mid;
    k2chk(arr.every(x => x > 0) && arr.reduce((s, x) => s + x, 0) === S, 'N4 lv1');
    return QB({text:`${n} bạn được chia một số kẹo; số kẹo của các bạn, xếp theo thứ tự từ ít đến nhiều, lập thành một cấp số cộng. Tổng số kẹo là <b>${S}</b>. Hỏi bạn đứng <b>giữa</b> (thứ ${(n + 1) / 2}) được bao nhiêu kẹo?`, tpl:'[_] kẹo', ans:[mid],
      hint:`Trong cấp số cộng có số hạng lẻ, tổng bằng số số hạng nhân với số hạng ở <b>giữa</b>.`,
      sol:`${tm(`S_${n} = ${n}\\cdot u_{${(n + 1) / 2}}`)}, nên ${tm(`u_{${(n + 1) / 2}} = \\dfrac{${S}}{${n}} = ${mid}`)}. Bạn đứng giữa được ${tb(mid)} kẹo.`});
  }
  if(lv === 2){
    const n = pick([4, 5, 6, 7]), d = R(2, 5), u1 = R(4, 12), S = sumCSC(u1, d, n), spread = (n - 1) * d;
    return QB({text:`${n} người nhận tiền thưởng; số tiền (nghìn đồng) của mỗi người, xếp từ thấp đến cao, lập thành một cấp số cộng. Tổng tiền là <b>${S}</b> nghìn đồng và người nhận nhiều nhất hơn người nhận ít nhất <b>${spread}</b> nghìn đồng. Hỏi người nhận <b>ít nhất</b> được bao nhiêu nghìn đồng?`, tpl:'[_] nghìn đồng', ans:[u1], wide:true,
      hint:`Từ người ít nhất đến người nhiều nhất có ${n - 1} khoảng, không phải ${n}. Tìm ${tm('d')} từ hiệu, rồi dùng công thức tổng.`,
      sol:`${tm(`u_{${n}} - u_1 = ${n - 1}d = ${spread}${RA2}d = ${d}`)}. ${tm(`S_{${n}} = \\dfrac{${n}(2u_1 + ${n - 1}\\cdot ${d})}{2} = ${S}${RA2}2u_1 = ${2 * S / n - spread}`)}. Người ít nhất nhận ${tb(u1)} nghìn đồng.`});
  }
  const k = pick([2, 3, 4, 5, 9]), a = 180 / (k + 1), dd = (k - 1) * a / 3;
  k2chk(Number.isInteger(a) && Number.isInteger(dd) && 4 * a + 6 * dd === 360 && a + 3 * dd === k * a, 'N4 lv3');
  return QB({text:`Bốn góc của một tứ giác lồi, xếp theo thứ tự từ nhỏ đến lớn, lập thành một cấp số cộng. Góc lớn nhất gấp <b>${k}</b> lần góc nhỏ nhất. Tính số đo góc lớn nhất (đơn vị: độ).`, tpl:'[_]°', ans:[k * a],
    hint:`Tổng bốn góc của tứ giác bằng ${tm('360^\\circ')}. Gọi góc nhỏ nhất là ${tm('a')} và công sai ${tm('d')}: góc lớn nhất là ${tm('a + 3d')}. Lập hai phương trình.`,
    sol:`${tm(`4a + 6d = 360`)} và ${tm(`a + 3d = ${k}a`)}. Từ phương trình thứ hai: ${tm(`3d = ${k - 1}a`)}, thay vào phương trình đầu: ${tm(`4a + 2\\cdot ${k - 1}a = 360${RA2}a = ${a}`)}. Góc lớn nhất: ${tb(`${k}\\cdot ${a} = ${k * a}^\\circ`)}.`});
};

const K2KT4 = [
  k2kt('Nhận ra cấp số cộng', `“Mỗi hàng nhiều hơn hàng trước ${tm('d')}”, “mỗi năm tăng thêm ${tm('d')}”, “ngắn hơn đều ${tm('d')}” → cấp số cộng.`, 'Đề hỏi một số hạng (hàng cuối, năm thứ n) hay hỏi <b>tổng</b>? Hai câu hỏi dùng hai công thức khác nhau.', 'Ghi ngay ' + tm('u_1') + ', ' + tm('d') + ', ' + tm('n') + ' ra nháp trước khi tính.'),
  k2kt('Đọc dữ liệu từ hình', 'Số hạng đầu lấy ở hàng/cột đầu; công sai lấy bằng hiệu hai cột liên tiếp. Với tháp lon, mỗi hàng nhiều hơn hàng trên bằng số lon thêm vào.', `Hình chỉ vẽ một phần: đừng đếm hàng trên hình để suy ra tổng số hàng. Từ bậc 1 đến bậc ${tm('n')} chỉ có <b>${tm('n-1')}</b> khoảng.`, 'Kiểm tra bằng cách tính thêm một hai số hạng.'),
  k2kt('Tìm n và điều kiện “vượt quá”', `Lập ${tm('S_n = T')} → phương trình bậc hai, loại nghiệm âm. “Vượt quá T” nghĩa là ${tm('S_n \\gt T')} (lớn hơn hẳn), n là số nguyên nhỏ nhất.`, 'Nếu ' + tm('S_n') + ' đúng bằng T thì chưa “vượt quá”; phải lấy n kế tiếp.', 'Tính hai giá trị ' + tm('S_{n-1}') + ' và ' + tm('S_n') + ' để kiểm tra.')
];
lesson(92, 'c2k-thuc-te-csc', 'Củng cố Chương II · 4. Toán thực tế có hình: tháp lon, doanh thu, chiếc thang', 'Tháp lon (số lon hàng cuối, tổng, số hàng); đọc biểu đồ doanh thu tăng đều; chiếc thang có bậc ngắn dần; chia thưởng, góc tứ giác lập cấp số cộng.', [cN1, cN2, cN3, cN4], {introTitle:K2TT, intro:K2KT4});

/* ---------- BÀI 5. TOÁN THỰC TẾ CÓ HÌNH (2): CẤP SỐ NHÂN ---------- */
const cP1 = lv => {   // tăng trưởng – đọc biểu đồ
  const q = pick([2, 3]), a = pick([5, 10, 20]), nb = q === 2 ? 4 : 3, vals = Array.from({length:nb}, (_, i) => a * q ** i);
  const fig = barSVG(vals.map((_, k) => `Giờ ${k + 1}`), vals, a, 'nghìn con');
  const head = `Biểu đồ cho số lượng vi khuẩn (nghìn con) trong một ống nghiệm ở ${nb} giờ đầu tiên. Số lượng vi khuẩn sau mỗi giờ tăng gấp một số lần <b>không đổi</b>.`;
  if(lv === 1){
    const n = R(6, 8), v = a * q ** (n - 1);
    return QB({text:`${head} Hỏi ở giờ thứ ${n} có bao nhiêu nghìn con?`, fig, tpl:'[_] nghìn con', ans:[v], wide:true,
      hint:`Đọc biểu đồ để tìm ${tm('u_1')} và công bội ${tm('q')} (số lần tăng). Giờ thứ ${n} ứng với số hạng ${tm(`u_{${n}}`)}, số mũ của ${tm('q')} là bao nhiêu?`,
      sol:`${tm(`u_1 = ${a}`)}, ${tm(`u_2 = ${a * q}`)} nên ${tm(`q = ${q}`)}. ${tm(`u_{${n}} = ${a}\\cdot ${q}^{${n - 1}} = ${v}`)}. Có ${tb(fmt(v))} nghìn con. (Số mũ là ${tm(`${n} - 1`)}, không phải ${tm(`${n}`)}.)`});
  }
  if(lv === 2){
    const T = a * q ** R(5, 7) * pick([1, 1, 2]) - pick([0, 0, 1]);
    let n = 1; while(a * q ** (n - 1) <= T) n++;
    k2chk(a * q ** (n - 1) > T && a * q ** (n - 2) <= T, 'P1 lv2');
    return QB({text:`${head} Từ giờ thứ mấy trở đi số vi khuẩn <b>vượt quá</b> ${fmt(T)} nghìn con?`, fig, tpl:'Giờ thứ [_]', ans:[n], wide:true,
      hint:`Tìm ${tm('u_1')}, ${tm('q')} từ biểu đồ rồi giải ${tm(`${a}\\cdot ${q}^{n-1} \\gt ${T}`)}; tính thử các luỹ thừa của ${q}. “Vượt quá” là lớn hơn hẳn.`,
      sol:`${tm(`u_n = ${a}\\cdot ${q}^{n-1}`)}. ${tm(`u_{${n - 1}} = ${a * q ** (n - 2)} \\le ${T}`)} (chưa vượt), ${tm(`u_{${n}} = ${a * q ** (n - 1)} \\gt ${T}`)}. Từ giờ thứ ${tb(n)}.`});
  }
  const n = R(5, 7), nb2 = q === 2 ? 4 : 3, vals2 = Array.from({length:nb2}, (_, i) => q ** i), S = (q ** n - 1) / (q - 1), fig2 = barSVG(vals2.map((_, k) => `Ngày ${k + 1}`), vals2, 1, 'người');
  k2chk(S === Array.from({length:n}, (_, i) => q ** i).reduce((x, y) => x + y, 0), 'P1 lv3');
  return QB({text:`Một tin nhắn lan truyền: ngày 1 có 1 người nhận được tin; mỗi ngày sau, số người <b>mới</b> nhận được tin gấp ${q} lần số người mới của ngày trước (biểu đồ cho ${nb2} ngày đầu). Hỏi sau ${n} ngày, có tất cả bao nhiêu người đã nhận được tin?`, fig:fig2, tpl:'[_] người', ans:[S],
    hint:`Số người <b>mới</b> mỗi ngày lập thành cấp số nhân ${tm(`u_1 = 1,\\ q = ${q}`)}; câu hỏi là <b>tổng</b> sau ${n} ngày, tức ${tm(`S_{${n}}`)}.`,
    sol:`${tm(`S_{${n}} = \\dfrac{${q}^{${n}} - 1}{${q} - 1} = ${S}`)}. Có ${tb(fmt(S))} người.`});
};

const P2RATE = {n2: {10: 100, 20: 25, 50: 4}, n3: {10: 1000, 20: 125, 50: 8}};
const cP2 = lv => {   // lãi kép, khấu hao, gửi định kỳ
  if(lv === 1){
    const r = pick([10, 20, 50]), n = pick([2, 3]), mult = P2RATE['n' + n][r], A = mult * pick([1, 2, 3, 5]);
    const val = A * (100 + r) ** n / 100 ** n; k2chk(Number.isInteger(val), 'P2 lv1');
    let chk = A; for(let i = 0; i < n; i++) chk = chk * (100 + r) / 100; k2chk(Math.abs(chk - val) < 1e-6, 'P2 lv1 b');
    return QB({text:`Bạn An gửi tiết kiệm <b>${fmt(A)}</b> triệu đồng với lãi suất <b>${r}%/năm</b>, theo thể thức <b>lãi kép</b> (tiền lãi mỗi năm được cộng vào vốn để tính lãi năm sau). Hỏi sau <b>${n}</b> năm, cả vốn lẫn lãi là bao nhiêu triệu đồng?`, tpl:'[_] triệu đồng', ans:[val], wide:true,
      hint:`Mỗi năm số tiền nhân với ${tm(`1 + ${tfrac(r, 100)}`)}. Sau ${n} năm là ${n} lần nhân, không phải cộng ${n} lần lãi ${r}%.`,
      sol:`Số tiền sau ${n} năm: ${tm(`${A}\\cdot ${tdec(1 + r / 100)}^{${n}} = ${val}`)}. Đáp số: ${tb(fmt(val))} triệu đồng. (Nếu cộng lãi đơn ${n} lần thì chỉ được ${fmt(A + n * A * r / 100)} triệu, thấp hơn.)`});
  }
  if(lv === 2){
    const r = pick([10, 20, 25, 50]), n = pick([2, 3]), den = {10: 10, 20: 5, 25: 4, 50: 2}[r], keep = (100 - r) / 100, num = {10: 9, 20: 4, 25: 3, 50: 1}[r], A = den ** n * pick([1, 2, 5]);
    const val = A / den ** n * num ** n; k2chk(Number.isInteger(val) && Math.abs(val - A * keep ** n) < 1e-6, 'P2 lv2');
    return QB({text:`Một chiếc máy có giá trị ban đầu <b>${fmt(A)}</b> triệu đồng. Mỗi năm giá trị của máy <b>giảm ${r}%</b> so với giá trị năm trước. Hỏi sau <b>${n}</b> năm, giá trị còn lại của máy là bao nhiêu triệu đồng?`, tpl:'[_] triệu đồng', ans:[val], wide:true,
      hint:`Mỗi năm giá trị còn lại ${100 - r}% của năm trước, tức nhân với ${tm(tdec(keep))}. Dãy giá trị là cấp số nhân; không phải trừ ${r}% của giá ban đầu ${n} lần.`,
      sol:`${tm(`${A}\\cdot ${tdec(keep)}^{${n}} = ${val}`)}. Giá trị còn lại: ${tb(fmt(val))} triệu đồng. (Trừ đều ${r}% của giá ban đầu mỗi năm sẽ sai: ${fmt(A * (1 - n * r / 100))} triệu.)`});
  }
  const r = pick([10, 20]), n = pick([2, 3]), mult = r === 10 ? (n === 2 ? 100 : 1000) : (n === 2 ? 25 : 125), A = mult * pick([1, 2, 3]);
  let S = 0, cur = 0; for(let i = 0; i < n; i++){ cur = (cur + A) * (100 + r) / 100; } S = cur;
  k2chk(Number.isInteger(S) && Math.abs(S - A * (1 + r / 100) * ((1 + r / 100) ** n - 1) / (r / 100)) < 1e-6, 'P2 lv3');
  return QB({text:`Đầu mỗi năm, cô Hoa gửi vào ngân hàng <b>${fmt(A)}</b> triệu đồng với lãi suất <b>${r}%/năm</b> (lãi kép, lãi nhập vốn cuối năm). Hỏi <b>cuối năm thứ ${n}</b>, cô có tất cả bao nhiêu triệu đồng?`, tpl:'[_] triệu đồng', ans:[S], wide:true,
    hint:`Khoản gửi đầu năm 1 sinh lãi ${n} năm, khoản gửi đầu năm 2 sinh lãi ${n - 1} năm,… Cộng các số tiền ${tm(`${A}\\cdot ${tdec(1 + r / 100)}^k`)}, đó là một cấp số nhân.`,
    sol:`Các khoản gửi sinh lãi ${n}, ${n - 1},… năm: tổng là cấp số nhân với ${tm(`u_1 = ${A}\\cdot ${tdec(1 + r / 100)}`)}, ${tm(`q = ${tdec(1 + r / 100)}`)}. ${tm(`S_{${n}} = ${A}\\cdot ${tdec(1 + r / 100)}\\cdot \\dfrac{${tdec(1 + r / 100)}^{${n}} - 1}{${tdec(1 + r / 100)} - 1} = ${S}`)}. Đáp số: ${tb(fmt(S))} triệu đồng.`});
};

const P3POOL = [{h:64, p:3, q:4, mk:3}, {h:81, p:2, q:3, mk:3}, {h:125, p:4, q:5, mk:3}, {h:32, p:1, q:2, mk:4}, {h:256, p:3, q:4, mk:4}, {h:48, p:1, q:2, mk:4}];
const cP3 = lv => {   // quả bóng nảy
  const P = pick(P3POOL), {h, p, q, mk} = P, hk = k => h * p ** k / q ** k, rt = tfrac(p, q);
  const hsFig = [h, hk(1), hk(2), hk(3)];
  const fig = (labs) => bounceSVG(hsFig, {lab:labs, cap:'Bóng nảy lên theo tỉ lệ không đổi (hình minh hoạ)'});
  if(lv === 1){
    const k = R(2, mk), v = hk(k); k2chk(Number.isInteger(v), 'P3 lv1');
    return QB({text:`Thả một quả bóng từ độ cao <b>${h} m</b> xuống sân. Sau mỗi lần chạm sân, bóng nảy lên đến độ cao bằng ${tm(rt)} độ cao lần trước (hình vẽ). Hỏi sau lần nảy thứ <b>${k}</b>, bóng lên cao bao nhiêu mét?`, fig:fig([`${h} m`, `${hk(1)} m`, '', '']), tpl:'[_] m', ans:[v],
      hint:`Mỗi lần nảy, độ cao bằng ${tm(rt)} độ cao lần trước nên các độ cao lập thành cấp số nhân công bội ${tm(rt)}. Hãy xác định số mũ của công bội ứng với lần nảy thứ ${k}.`,
      sol:`Lần nảy thứ ${k}: ${tm(`${h}\\cdot ${rt}^{${k}} = ${v}`)}. Bóng lên cao ${tb(v)} m.`});
  }
  if(lv === 2){
    const n = R(3, mk + 1); let D = h; for(let i = 1; i <= n - 1; i++) D += 2 * hk(i);
    k2chk(Number.isInteger(D), 'P3 lv2');
    return QB({text:`Thả một quả bóng từ độ cao <b>${h} m</b>. Mỗi lần chạm sân, bóng nảy lên đến độ cao bằng ${tm(rt)} độ cao lần rơi trước (hình vẽ). Tính tổng quãng đường bóng đi được từ lúc thả đến khi chạm sân <b>lần thứ ${n}</b>.`, fig:fig([`${h} m`, `${hk(1)} m`, '', '']), tpl:'[_] m', ans:[D],
      hint:`Lần rơi đầu đi ${h} m. Mỗi lần nảy lên rồi rơi xuống tính <b>hai lần</b> độ cao nảy. Có ${n - 1} lần nảy trước khi chạm sân lần thứ ${n}.`,
      sol:`Các độ cao nảy: ${tm(Array.from({length:n - 1}, (_, i) => hk(i + 1)).join(';\\ '))}. Quãng đường ${tm(`${h} + 2(${Array.from({length:n - 1}, (_, i) => hk(i + 1)).join(' + ')}) = ${D}`)}. Đáp số: ${tb(D)} m.`});
  }
  const m = R(4, 8), H = 2 ** m, t = pick([1, 1, 2, 4]);
  let k = 0; while(H / 2 ** k >= t) k++;
  k2chk(H / 2 ** k < t && (k === 0 || H / 2 ** (k - 1) >= t), 'P3 lv3');
  return QB({text:`Thả một quả bóng từ độ cao <b>${H} m</b>. Mỗi lần chạm sân, bóng nảy lên đến độ cao bằng <b>một nửa</b> độ cao lần trước (hình vẽ). Lần nảy thứ mấy thì bóng lên cao <b>nhỏ hơn ${t} m</b> lần đầu tiên?`, fig:bounceSVG([H, H / 2, H / 4, H / 8], {lab:[`${H} m`, `${H / 2} m`, `${H / 4} m`, ''], cap:'Bóng nảy lên theo tỉ lệ không đổi (hình minh hoạ)'}), tpl:'Lần nảy thứ [_]', ans:[k], wide:true,
    hint:`Sau lần nảy thứ ${tm('k')}, độ cao là ${tm(`${H}\\cdot \\left(\\dfrac{1}{2}\\right)^k`)}. Cần ${tm(`\\lt ${t}`)} (nhỏ hơn hẳn), nên nếu độ cao <b>bằng đúng</b> ${t} m thì chưa đạt.`,
    sol:`Độ cao sau lần nảy thứ ${tm('k')}: ${tm(`${H}\\cdot 2^{-k}`)}. Lần ${k - 1}: ${tm(`${H / 2 ** (k - 1)}`)} m ${tm(`\\ge ${t}`)} (chưa nhỏ hơn hẳn); lần ${k}: ${tm(`${H / 2 ** k}`)} m ${tm(`\\lt ${t}`)}. Đáp số: lần nảy thứ ${tb(k)}.`});
};

const cP4 = lv => {   // so sánh hai phương án: cộng đều và nhân lên
  const n = R(6, 10), a = pick([50, 100, 200]), da = pick([0, 0, 10, 20]), b = pick([1, 2, 5]), qb = pick([2, 2, 3]);
  const SBf = m => b * (qb ** m - 1) / (qb - 1), SAf = m => m * a + da * m * (m - 1) / 2;
  const texA = da === 0 ? `Phương án A: mỗi ngày nhận <b>${a}</b> nghìn đồng.` : `Phương án A: ngày đầu nhận <b>${a}</b> nghìn đồng, mỗi ngày sau nhận nhiều hơn ngày trước <b>${da}</b> nghìn đồng.`;
  const texB = `Phương án B: ngày đầu nhận <b>${b}</b> nghìn đồng, mỗi ngày sau nhận <b>gấp ${qb}</b> lần ngày trước.`;
  if(lv === 1){
    const m = n, A = SAf(m), B = SBf(m), ans = A > B ? 'Phương án A' : B > A ? 'Phương án B' : 'Bằng nhau';
    return QC({text:`Một công việc trả công trong <b>${m}</b> ngày theo hai phương án. ${texA} ${texB} Theo phương án nào thì <b>tổng</b> số tiền nhận được sau ${m} ngày <b>nhiều hơn</b>?`, opts:['Phương án A', 'Phương án B', 'Bằng nhau'], ans, keepOrder:true,
      hint:`Phương án A là cấp số cộng, phương án B là cấp số nhân. Tính tổng ${m} ngày của từng phương án rồi so sánh; đừng so sánh số tiền ngày đầu.`,
      sol:`A: ${tm(`S = ${tfrac(m * (2 * a + (m - 1) * da), 2)} = ${A}`)}. B: ${tm(`S = ${b}\\cdot \\dfrac{${qb}^{${m}} - 1}{${qb - 1}} = ${B}`)}. ${A === B ? 'Hai phương án bằng nhau.' : `${A > B ? 'A' : 'B'} nhiều hơn`}: ${tb(ans)}.`});
  }
  if(lv === 2){
    const m = n, A = SAf(m), B = SBf(m), diff = Math.abs(A - B);
    return QB({text:`Một công việc trả công trong <b>${m}</b> ngày theo hai phương án. ${texA} ${texB} Tính <b>chênh lệch</b> (số lớn trừ số bé) giữa tổng số tiền nhận được của hai phương án sau ${m} ngày.`, tpl:'[_] nghìn đồng', ans:[diff], wide:true,
      hint:`Tính riêng ${tm(`S_{${m}}`)} của mỗi phương án (một cấp số cộng, một cấp số nhân), rồi lấy số lớn trừ số bé.`,
      sol:`A: ${tm(`S_{${m}} = ${A}`)}; B: ${tm(`S_{${m}} = ${B}`)}. Chênh lệch ${tm(`|${A} - ${B}| = ${diff}`)} nghìn đồng. Đáp số: ${tb(fmt(diff))}.`});
  }
  let m = 1; while(SBf(m) <= SAf(m)) m++;
  k2chk(SBf(m) > SAf(m) && SBf(m - 1) <= SAf(m - 1), 'P4 lv3');
  return QB({text:`Một công việc kéo dài nhiều ngày, trả công theo hai phương án. ${texA} ${texB} Hỏi sau ít nhất bao nhiêu ngày thì <b>tổng</b> tiền theo phương án B <b>vượt hơn hẳn</b> phương án A?`, tpl:'[_] ngày', ans:[m], wide:true,
    hint:`Lập bảng tổng sau ${tm('n')} ngày của hai phương án: ${tm('S_A = \\dfrac{n(2a + (n-1)d)}{2}')} và ${tm('S_B = b\\cdot \\dfrac{q^n - 1}{q - 1}')}.`,
    sol:`Sau ${m - 1} ngày: A ${tm(`= ${SAf(m - 1)}`)}, B ${tm(`= ${SBf(m - 1)}`)} (B chưa vượt). Sau ${m} ngày: A ${tm(`= ${SAf(m)}`)}, B ${tm(`= ${SBf(m)}`)} (B vượt). Đáp số: ${tb(m)} ngày.`});
};

const cP5 = lv => {   // khổ giấy A
  const k = R(1, 4);
  if(lv === 1){
    const v = 10000 / 2 ** k;
    return QB({text:`Tờ giấy khổ A0 có diện tích <b>1 m²</b> (10 000 cm²). Cắt đôi tờ A0 được hai tờ A1, cắt đôi tờ A1 được hai tờ A2, … (mỗi khổ có diện tích bằng một nửa khổ trước). Diện tích một tờ giấy khổ A${k} là bao nhiêu cm²?`, tpl:'[_] cm²', ans:[v],
      hint:`Diện tích các khổ A0, A1, A2,… lập thành cấp số nhân. Khổ A0 là số hạng ${tm('u_0')} hay ${tm('u_1')}? Khổ A${k} cách khổ A0 mấy lần cắt?`,
      sol:`Mỗi lần cắt đôi, diện tích giảm một nửa: ${tm(`10000\\cdot \\left(\\dfrac{1}{2}\\right)^{${k}} = ${v}`)}. Một tờ A${k} có diện tích ${tb(fmt(v))} cm².`});
  }
  if(lv === 2){
    const v = 10000 / 2 ** k;
    return QB({text:`Tờ giấy khổ A0 có diện tích 10 000 cm²; mỗi lần cắt đôi, diện tích mỗi tờ giảm một nửa. Một tờ giấy có diện tích <b>${fmt(v)}</b> cm² là khổ A mấy?`, tpl:'Khổ A[_]', ans:[k],
      hint:`Giải ${tm(`10000\\cdot \\left(\\dfrac{1}{2}\\right)^n = ${v}`)}, tức ${tm(`2^n = \\text{một số}`)}. Số mũ ${tm('n')} chính là chỉ số của khổ A.`,
      sol:`${tm(`2^n = \\dfrac{10000}{${v}} = ${2 ** k}`)}, nên ${tm(`n = ${k}`)}. Đó là khổ ${tb(`A${k}`)}.`});
  }
  const n = R(3, 4), part = 10000 - 10000 / 2 ** n;
  k2chk(part === Array.from({length:n}, (_, i) => 10000 / 2 ** (i + 1)).reduce((x, y) => x + y, 0), 'P5 lv3');
  return QB({text:`Từ một tờ giấy A0 (10 000 cm²), cắt đôi thành hai tờ A1: đặt riêng một tờ A1, giữ lại một tờ A1. Cắt đôi tờ A1 đang giữ thành hai tờ A2: đặt riêng một tờ A2, giữ lại một tờ A2; cứ thế đến khi cắt ra khổ A${n}. Hỏi tổng diện tích các tờ đã <b>đặt riêng</b> (A1, A2, …, A${n}; không tính tờ A${n} đang giữ) là bao nhiêu cm²?`, tpl:'[_] cm²', ans:[part], wide:true,
    hint:`Các tờ đặt riêng có diện tích ${tm('5000,\\ 2500,\\ \\ldots')} lập thành cấp số nhân. Có đúng ${n} tờ (A1 đến A${n}), mỗi khổ một tờ.`,
    sol:`${tm(`u_1 = 5000`)}, ${tm(`q = \\dfrac{1}{2}`)}, ${n} số hạng: ${tm(`S_{${n}} = 5000\\cdot \\dfrac{1 - (1/2)^{${n}}}{1 - 1/2} = ${part}`)}. Đáp số: ${tb(fmt(part))} cm². (Nhỏ hơn 10 000 vì còn tờ A${n} đang giữ, diện tích ${fmt(10000 / 2 ** n)} cm².)`});
};

const K2KT5 = [
  k2kt('Nhận ra cấp số nhân', `“Gấp ${tm('q')} lần”, “giảm ${tm('r\\%')} mỗi năm” (nhân với ${tm('1 - r/100')}), “tăng ${tm('r\\%')} mỗi năm” (nhân với ${tm('1 + r/100')}), “một nửa” → cấp số nhân.`, `“Giảm ${tm('20\\%')} mỗi năm” <b>không</b> phải trừ ${tm('20\\%')} giá ban đầu mỗi năm: phải nhân với ${tm('0{,}8')} mỗi năm.`, 'Lãi kép: nhân với (1 + lãi suất); lãi đơn: cộng lãi giống nhau mỗi năm.'),
  k2kt('Số mũ và số số hạng', `${tm('u_n = u_1 q^{n-1}')}: số mũ là ${tm('n-1')}. Thả bóng từ độ cao ${tm('h')}: độ cao sau lần nảy thứ ${tm('k')} là ${tm('h\\cdot q^k')}. Tổng ${tm('1 + q + \\ldots + q^m')} có ${tm('m+1')} số hạng.`, `Quãng đường bóng nảy: lần rơi đầu đi ${tm('h')}, về sau mỗi lần nảy lên rồi rơi xuống tính <b>hai lần</b> độ cao.`, 'Vẽ sơ đồ 3 – 4 bước đầu để đếm số mũ cho chắc.'),
  k2kt('Vượt quá, nhỏ hơn, ít nhất', `Giải ${tm('q^n \\gt T')} bằng cách tính thử các luỹ thừa, lấy số nguyên ${tm('n')} nhỏ nhất.`, 'Dấu bằng không thoả “vượt quá”, “nhỏ hơn”; cần số nguyên kế tiếp.', 'So sánh hai phương án: tính tổng của từng phương án rồi so, đừng so ngày đầu.')
];
lesson(92, 'c2k-thuc-te-csn', 'Củng cố Chương II · 5. Toán thực tế có hình: vi khuẩn, lãi kép, bóng nảy, khổ giấy', 'Đọc biểu đồ tăng trưởng; lãi kép, khấu hao, gửi định kỳ; bóng nảy (độ cao, quãng đường, lần nảy); so sánh hai phương án trả công; khổ giấy A.', [cP1, cP2, cP3, cP4, cP5], {introTitle:K2TT, intro:K2KT5});

/* ---------- ĐỀ TỔNG HỢP 15 CÂU ---------- */
const k2R = (make, band, type) => () => Object.assign(make(), {reviewBand:band, reviewType:type});
const REVIEW_K2 = [
  k2R(() => cK1(1), 1, 'day-so'),       // 1. u_{n+1}
  k2R(() => cK2(1), 1, 'day-so'),       // 2. truy hồi
  k2R(() => cL1(1), 1, 'csc'),          // 3. công sai âm
  k2R(() => cL2(1), 1, 'csc'),          // 4. S_n
  k2R(() => cM1(1), 1, 'csn'),          // 5. công bội âm
  k2R(() => cM2(1), 1, 'csn'),          // 6. S_n với q âm
  k2R(() => cK3(2), 2, 'day-so'),       // 7. giá trị nhỏ nhất
  k2R(() => cL1(2), 2, 'csc'),          // 8. u_r từ hai số hạng
  k2R(() => cL2(2), 2, 'csc'),          // 9. tổng một đoạn
  k2R(() => cM1(2), 2, 'csn'),          // 10. hai giá trị của q
  k2R(() => cN1(2), 2, 'thuc-te'),      // 11. tháp lon (có hình)
  k2R(() => cP1(2), 3, 'thuc-te'),      // 12. vi khuẩn (có hình)
  k2R(() => cL3(3), 3, 'csc'),          // 13. đếm số hạng dương
  k2R(() => cM3(3), 3, 'csn'),          // 14. CSC → CSN
  k2R(() => cP3(3), 3, 'thuc-te')       // 15. bóng nảy (có hình)
];
lesson(92, 'c2k-de-tong-hop', 'Củng cố Chương II · Đề tổng hợp 15 câu', 'Mỗi đề 15 câu: 6 câu cơ bản, 4 câu thông hiểu, 5 câu vận dụng – nâng cao (có 3 bài toán thực tế kèm hình). Dễ sai: chỉ số, dấu của công sai – công bội, nghiệm âm, “vượt quá”.', REVIEW_K2, {count:15, introTitle:K2T, intro:[
  k2kt('Dễ sai về dãy số và cấp số cộng', `${tm('u_{n+1}')}: thay mọi ${tm('n')} bởi ${tm('n+1')}. Công sai âm khi hệ số của ${tm('n')} âm. Từ ${tm('u_p')} đến ${tm('u_q')} có ${tm('q-p')} khoảng, nhưng ${tm('q-p+1')} số hạng.`, `Giải ${tm('S_n = T')} khi ${tm('d \\lt 0')} có thể có hai nghiệm dương; “số hạng dương” là ${tm('u_n \\gt 0')} (ngặt).`, 'Ghi ' + tm('u_1, d, n') + ' ra nháp trước khi tính.'),
  k2kt('Dễ sai về cấp số nhân', `${tm('u_n = u_1 q^{n-1}')}; ${tm('q^2 = a')} có hai nghiệm; ${tm('S_n = u_1\\dfrac{1 - q^n}{1 - q}')}; ba số lập cấp số nhân ⇔ ${tm('b^2 = ac')}.`, `Công bội âm thì dấu các số hạng đổi luân phiên; ${tm('(-2)^4 \\ne -2^4')}.`, 'Thử lại kết quả bằng vài số hạng đầu.'),
  k2kt('Dễ sai về thực tế', `Đọc ${tm('u_1')}, ${tm('d')} hoặc ${tm('q')} từ hình; phân biệt hỏi một số hạng hay hỏi tổng; lãi kép nhân, lãi đơn cộng; “giảm ${tm('r\\%')}” là nhân với ${tm('1 - r/100')}.`, 'Quãng đường bóng nảy: lần rơi đầu một lần, các lần nảy sau hai lần. “Vượt quá” là lớn hơn hẳn.', 'Kiểm tra đơn vị và tính hợp lý của kết quả.')
]});
}
/* =====================================================================
   CHƯƠNG III. MẪU SỐ LIỆU GHÉP NHÓM – Bài 8 (thầy yêu cầu 14/10/2026, /tron-bo)
   Chủ đề 4, nhãn "Chương III". Một bài, 5 dạng × 3 mức, có biểu đồ cột (histSVG).
   Dạng 1 Xác định nhóm · 2 Chia nhóm (số nhóm, độ dài) · 3 Lập bảng tần số từ số liệu thô · 4 Đọc biểu đồ cột (thực tế) · 5 Tần số tương đối, tần số tích luỹ.
   Quy ước nhóm: [a; b) chứa a, không chứa b. Đáp án chọn trước rồi mới dựng đề; mọi đáp số được đếm lại bằng phép lọc độc lập (b8chk).
   ===================================================================== */
{ const i2 = G.topics.findIndex(t => t.id === 2); G.topics.splice(i2 < 0 ? G.topics.length : i2 + 1, 0, {id:4, hk:1, name:'Mẫu số liệu ghép nhóm', label:'Chương III'}); }
const b8chk = (ok, msg) => { if(!ok) throw new Error('b8: ' + msg); };
const gr8 = (a, b) => tm(`[${a};\\,${b})`);
const tab8 = (heads, rows) => `<table class="lk-table"><tr>${heads.map(h => `<th>${h}</th>`).join('')}</tr>${rows.map(r => `<tr>${r.map(c => `<td>${c}</td>`).join('')}</tr>`).join('')}</table>`;
const cnt8 = (v, a, b) => v.filter(x => x >= a && x < b).length;           // đếm độc lập: a ≤ x < b
const edges8 = (s, len, k) => Array.from({length:k + 1}, (_, i) => s + i * len);
const tabF8 = (e, f, extra) => tab8(['Nhóm', ...f.map((_, i) => gr8(e[i], e[i + 1]))], [['Tần số', ...f], ...(extra ? [extra] : [])]);
const CT8 = [
  {w:'thời gian chạy 100 m (giây)', who:'các bạn nam của một lớp', s:12, len:2},
  {w:'số trang sách đọc được trong một tuần', who:'các học sinh của một lớp', s:20, len:10},
  {w:'cân nặng (kg)', who:'các học sinh của một lớp', s:40, len:5},
  {w:'chiều cao (cm)', who:'các học sinh của một lớp', s:150, len:5},
  {w:'quãng đường đi từ nhà đến trường (km)', who:'các học sinh của một khối', s:1, len:2}
];
const fSplit8 = (n, k, lo, hi, ev) => { if(ev) return fSplit8(n / 2, k, Math.ceil(lo / 2), Math.floor(hi / 2)).map(x => 2 * x); for(let t = 0; t < 4000; t++){ const f = Array.from({length:k}, () => R(lo, hi)); if(f.reduce((x, y) => x + y, 0) === n && (!ev || f.every(x => x % 2 === 0))) return f; } throw new Error('b8: fSplit'); };

/* Dạng 1. Xác định nhóm */
const g8a = lv => {
  if(lv === 1){
    const len = pick([2, 5, 10, 20]), a = R(1, 8) * len, b = a + len;
    if(pick([0, 1]) === 0)
      return QB({text:`Cho nhóm số liệu ${gr8(a, b)}. Độ dài của nhóm này bằng bao nhiêu?`, tpl:'[_]', ans:[len],
        hint:'Độ dài của nhóm bằng hiệu giữa đầu mút phải và đầu mút trái.',
        sol:`${tm(`${b} - ${a} = ${len}`)}. Độ dài của nhóm là ${tb(len)}.`});
    return QB({text:`Các nhóm số liệu liên tiếp có cùng độ dài. Biết nhóm ${gr8(a, b)}; nhóm đứng ngay sau nó có đầu mút trái bằng bao nhiêu?`, tpl:'[_]', ans:[b],
      hint:'Các nhóm nối liền nhau: đầu mút phải của nhóm trước và đầu mút trái của nhóm sau liên hệ thế nào?',
      sol:`Nhóm liền sau bắt đầu đúng tại đầu mút phải của nhóm trước, nên nhóm đó là ${tm(`[${b};\\,${b + len})`)}. Đầu mút trái bằng ${tb(b)}.`});
  }
  const len = pick([5, 10, 20]), s = R(1, 6) * len, k = 5, e = edges8(s, len, k), idx = R(0, k - 1);
  const labels = Array.from({length:k}, (_, i) => gr8(e[i], e[i + 1]));
  if(lv === 2){
    const x = e[idx] + R(1, len - 1);
    return QC({text:`Mẫu số liệu được chia thành 5 nhóm: ${labels.join(', ')}. Số liệu <b>x = ${x}</b> thuộc nhóm nào?`, opts:labels, ans:labels[idx], keepOrder:true,
      hint:'So sánh x với đầu mút trái và đầu mút phải của từng nhóm.',
      sol:`${tm(`${e[idx]} \\le ${x} \\lt ${e[idx + 1]}`)} nên x thuộc nhóm ${tb(`[${e[idx]};\\,${e[idx + 1]})`)}.`});
  }
  // mức 3: danh sách có giá trị nằm đúng ở đầu mút
  const a = e[idx + 0], b = e[idx + 1];
  const vals = shuffle([...new Set([a, b, a + R(1, len - 1), b - 1, a - 1, b + R(1, len - 1), a - R(2, 4)])]);
  const ans = cnt8(vals, a, b);
  b8chk(ans >= 2 && ans <= 4, 'g8a3');
  return QB({text:`Chia mẫu số liệu thành các nhóm cùng độ dài ${len}, trong đó có nhóm ${gr8(a, b)}. Trong các số liệu sau: <b>${vals.join('; ')}</b>, có bao nhiêu số liệu thuộc nhóm ${gr8(a, b)}?`, tpl:'[_] số liệu', ans:[ans],
    hint:'Xét từng số: nhóm ' + 'dạng [a; b) lấy đầu mút nào, bỏ đầu mút nào? Chú ý các số đúng bằng đầu mút.',
    sol:`Nhóm ${gr8(a, b)} gồm các số ${tm(`${a} \\le x \\lt ${b}`)}: lấy ${a}, không lấy ${b}. Các số thoả mãn: ${vals.filter(x => x >= a && x < b).sort((p, q) => p - q).join('; ')}. Có ${tb(ans)} số liệu.`});
};

/* Dạng 2. Chia nhóm */
const g8b = lv => {
  const c = pick(CT8);
  if(lv === 1){
    const len = pick([5, 10]), m = R(10, 40), k = R(3, 6), M = m + (k - 1) * len + R(1, len - 1);
    return QB({text:`Một mẫu số liệu về ${c.w} có giá trị nhỏ nhất là <b>${m}</b>, lớn nhất là <b>${M}</b>. Người ta chia thành các nhóm có độ dài <b>${len}</b>, nhóm đầu tiên bắt đầu từ ${m} (mỗi nhóm có dạng ${tm('[a;\\,b)')}). Cần ít nhất bao nhiêu nhóm để chứa mọi số liệu?`, tpl:'[_] nhóm', ans:[k],
      hint:'Mỗi nhóm “phủ” được một đoạn dài bằng độ dài nhóm. Tính khoảng cách từ giá trị nhỏ nhất đến giá trị lớn nhất rồi so với độ dài nhóm.',
      sol:`${tm(`${M} - ${m} = ${M - m}`)}; ${tm(`${M - m}:${len} = ${((M - m) / len).toFixed(2).replace(/\.?0+$/, '')}`)}, làm tròn lên được ${tb(k)} nhóm: ${tm(`[${m};\\,${m + len}),\\ \\ldots,\\ [${m + (k - 1) * len};\\,${m + k * len})`)}.`});
  }
  if(lv === 2){
    const len = pick([4, 5, 10]), m = R(10, 40), k = R(4, 7), M = m + (k - 1) * len + R(1, len - 1), last = m + k * len;
    return QB({text:`Số liệu về ${c.w} có giá trị nhỏ nhất ${m}, lớn nhất ${M}. Chia thành các nhóm cùng độ dài ${len}, nhóm đầu bắt đầu từ ${m}, mỗi nhóm dạng ${tm('[a;\\,b)')} và dùng <b>ít nhóm nhất</b> có thể. Đầu mút phải của nhóm cuối cùng bằng bao nhiêu?`, tpl:'[_]', ans:[last],
      hint:'Trước hết tìm số nhóm cần dùng; các nhóm nối liền nhau từ giá trị đầu.',
      sol:`${tm(`(${M} - ${m}):${len}`)} làm tròn lên cho ${k} nhóm. Nhóm cuối là ${tm(`[${m + (k - 1) * len};\\,${last})`)}, đầu mút phải bằng ${tb(last)}.`});
  }
  const k = pick([4, 5, 6, 7]), m = R(10, 40); let R0; do { R0 = R(2 * k + 3, 9 * k); } while(R0 % k === 0);
  const M = m + R0, L = Math.ceil(R0 / k);
  b8chk(k * L > R0 && (L - 1) * k <= R0 && L >= 1, 'g8b3');
  return QB({text:`Số liệu về ${c.w} có giá trị nhỏ nhất ${m}, lớn nhất ${M}. Muốn chia thành đúng <b>${k}</b> nhóm có <b>cùng độ dài</b>, nhóm đầu bắt đầu từ ${m}, mỗi nhóm dạng ${tm('[a;\\,b)')} và chứa được mọi số liệu. Độ dài nhóm là số nguyên dương nhỏ nhất bằng bao nhiêu?`, tpl:'[_]', ans:[L],
    hint:`Cần ${tm(`${k} \\cdot (\\text{độ dài}) \\gt ${M} - ${m}`)}: vì nhóm cuối không lấy đầu mút phải nên không được để giá trị lớn nhất nằm đúng đầu mút đó.`,
    sol:`${tm(`${M} - ${m} = ${R0}`)}, ${tm(`${R0}:${k} \\approx ${(R0 / k).toFixed(2)}`)}. Cần ${tm(`${k}L \\gt ${R0}`)} nên ${tm(`L \\ge ${L}`)}: ${tm(`${k}\\cdot ${L - 1} = ${k * (L - 1)} \\le ${R0}`)} (thiếu), ${tm(`${k}\\cdot ${L} = ${k * L} \\gt ${R0}`)} (đủ). Độ dài nhỏ nhất là ${tb(L)}.`});
};

/* Dạng 3. Lập bảng tần số ghép nhóm từ số liệu thô */
const mkData8 = (e, f) => { const v = []; f.forEach((c, i) => { for(let j = 0; j < c; j++) v.push(j === 0 && c >= 2 ? e[i] : R(e[i], e[i + 1] - 1)); }); return shuffle(v); };
const g8c = lv => {
  const c = pick(CT8), s = c.s + c.len * R(0, 2);
  if(lv === 1){
    const k = 3, e = edges8(s, c.len, k), f = Array.from({length:k}, () => R(2, 5)), v = mkData8(e, f), t = R(0, k - 1);
    b8chk(f.every((x, i) => cnt8(v, e[i], e[i + 1]) === x), 'g8c1');
    return QB({text:`Số liệu về ${c.w} của ${c.who} (${v.length} số liệu): <b>${v.join('; ')}</b>.<br>Ghép thành các nhóm ${[0, 1, 2].map(i => gr8(e[i], e[i + 1])).join(', ')}. Tần số của nhóm ${gr8(e[t], e[t + 1])} bằng bao nhiêu?`, tpl:'[_]', ans:[f[t]],
      hint:'Đếm các số liệu x thoả ' + 'đầu mút trái ≤ x < đầu mút phải của nhóm đó; gạch từng số đã đếm để không sót.',
      sol:`Các số thuộc ${gr8(e[t], e[t + 1])}: ${v.filter(x => x >= e[t] && x < e[t + 1]).sort((p, q) => p - q).join('; ')}. Tần số là ${tb(f[t])}.`});
  }
  if(lv === 2){
    const k = 4, e = edges8(s, c.len, k); let f; do { f = Array.from({length:k}, () => R(3, 9)); } while(f.filter(x => x === Math.max(...f)).length > 1);
    const v = mkData8(e, f), t = f.indexOf(Math.max(...f));
    b8chk(f.every((x, i) => cnt8(v, e[i], e[i + 1]) === x), 'g8c2');
    const labels = Array.from({length:k}, (_, i) => gr8(e[i], e[i + 1]));
    return QC({text:`Số liệu về ${c.w} của ${c.who} (${v.length} số liệu): <b>${v.join('; ')}</b>.<br>Ghép thành 4 nhóm ${labels.join(', ')}. Nhóm nào có tần số lớn nhất?`, opts:labels, ans:labels[t], keepOrder:true,
      hint:'Lập bảng tần số của cả bốn nhóm rồi so sánh; số liệu nằm đúng đầu mút thì thuộc nhóm bên phải.',
      sol:`Bảng tần số: ${tm(f.map((x, i) => `[${e[i]};\\,${e[i + 1]}):\\ ${x}`).join(';\\ \\ '))}. Tần số lớn nhất là ${f[t]}, ứng với nhóm ${tb(`[${e[t]};\\,${e[t + 1]})`)}.`});
  }
  const k = 5, e = edges8(s, c.len, k), f = fSplit8(R(22, 28), k, 3, 9), v = mkData8(e, f), t = R(2, 3);
  b8chk(f.every((x, i) => cnt8(v, e[i], e[i + 1]) === x) && v.every(x => x >= e[0] && x < e[k]), 'g8c3');
  const ans = v.filter(x => x >= e[t]).length;
  b8chk(ans === f.slice(t).reduce((p, q) => p + q, 0), 'g8c3b');
  return QB({text:`Số liệu về ${c.w} của ${c.who} (${v.length} số liệu): <b>${v.join('; ')}</b>.<br>Ghép thành 5 nhóm cùng độ dài ${c.len}, nhóm đầu là ${gr8(e[0], e[1])}. Có bao nhiêu số liệu <b>từ ${e[t]} trở lên</b>?`, tpl:'[_] số liệu', ans:[ans],
    hint:'Lập bảng tần số 5 nhóm (chú ý số đúng bằng đầu mút), rồi cộng tần số các nhóm cần thiết.',
    sol:`Bảng tần số: ${tm(f.map((x, i) => `[${e[i]};\\,${e[i + 1]}):\\ ${x}`).join(';\\ \\ '))}. “Từ ${e[t]} trở lên” gồm các nhóm từ ${tm(`[${e[t]};\\,${e[t + 1]})`)} đến hết: ${tm(f.slice(t).join(' + ') + ' = ' + ans)}. Đáp số ${tb(ans)}.`});
};

/* Dạng 4. Đọc biểu đồ cột (thực tế) */
const CTH8 = [
  {w:'thời gian tự học ở nhà mỗi tối (phút)', s:20, len:20, u:'phút'},
  {w:'chiều cao (cm)', s:150, len:5, u:'cm'},
  {w:'thời gian đi từ nhà đến trường (phút)', s:5, len:5, u:'phút'},
  {w:'cân nặng (kg)', s:40, len:5, u:'kg'}
];
const g8d = lv => {
  const c = pick(CTH8), k = 5, e = edges8(c.s, c.len, k), head = `Biểu đồ cột sau cho biết ${c.w} của các học sinh lớp 11A được khảo sát.`;
  if(lv === 1){
    const f = fSplit8(R(24, 36), k, 2, 12), n = f.reduce((p, q) => p + q, 0);
    return QB({text:`${head} Có bao nhiêu học sinh được khảo sát?`, fig:histSVG(e, f, 2, {show:true, unit:c.u}), tpl:'[_] học sinh', ans:[n],
      hint:'Mỗi cột cho tần số của một nhóm, tức số học sinh thuộc nhóm đó. Số học sinh được khảo sát là tổng của những tần số nào?',
      sol:`${tm(f.join(' + ') + ' = ' + n)}. Có ${tb(n)} học sinh.`});
  }
  const n = pick([20, 40]), f = fSplit8(n, k, 2, 16, true), i = R(0, 2);
  if(lv === 2){
    const ans = f[i] + f[i + 1];
    return QB({text:`${head} Có bao nhiêu học sinh có ${c.w.replace(/ \(.*\)/, '')} từ <b>${e[i]}</b> đến dưới <b>${e[i + 2]}</b> ${c.u}?`, fig:histSVG(e, f, 2, {unit:c.u}), tpl:'[_] học sinh', ans:[ans],
      hint:'Đọc chiều cao từng cột so với các vạch ngang của lưới (mỗi vạch cách nhau 2). Khoảng cần tìm gồm những nhóm nào?',
      sol:`Khoảng ${tm(`[${e[i]};\\,${e[i + 2]})`)} gồm hai nhóm ${gr8(e[i], e[i + 1])} và ${gr8(e[i + 1], e[i + 2])}, tần số ${f[i]} và ${f[i + 1]}: ${tm(`${f[i]} + ${f[i + 1]} = ${ans}`)}. Đáp số ${tb(ans)} học sinh.`});
  }
  const j = R(1, 3), tail = f.slice(j).reduce((p, q) => p + q, 0), pct = tail * 100 / n;
  b8chk(Number.isInteger(pct) && f.reduce((p, q) => p + q, 0) === n, 'g8d3');
  return QB({text:`${head} Hỏi số học sinh có ${c.w.replace(/ \(.*\)/, '')} <b>từ ${e[j]} ${c.u} trở lên</b> chiếm bao nhiêu phần trăm số học sinh được khảo sát?`, fig:histSVG(e, f, 2, {unit:c.u}), tpl:'[_] %', ans:[pct],
    hint:'Đọc tần số từng cột để tìm cỡ mẫu và số học sinh cần đếm, rồi lấy tỉ số rồi nhân 100%.',
    sol:`Tần số các nhóm: ${tm(f.join(',\\ '))}, cỡ mẫu ${tm(`n = ${n}`)}. Từ ${e[j]} trở lên: ${tm(f.slice(j).join(' + ') + ' = ' + tail)} học sinh. ${tm(`\\dfrac{${tail}}{${n}}\\cdot 100\\% = ${pct}\\%`)}. Đáp số ${tb(pct + '\\%')}.`});
};

/* Dạng 5. Tần số tương đối và tần số tích luỹ */
const g8e = lv => {
  const k = 5, n = pick([20, 25, 50]), c = pick(CT8), s = c.s + c.len * R(0, 2), e = edges8(s, c.len, k), f = fSplit8(n, k, 2, Math.floor(n / 3));
  const rel = x => x * 100 / n;
  b8chk(f.every(x => Number.isInteger(rel(x))), 'g8e');
  if(lv === 1){
    const t = R(0, k - 1);
    return QB({text:`Bảng tần số ghép nhóm về ${c.w} của ${c.who}:<br>${tabF8(e, f)}Tần số tương đối của nhóm ${gr8(e[t], e[t + 1])} bằng bao nhiêu phần trăm?`, tpl:'[_] %', ans:[rel(f[t])],
      hint:'Tần số tương đối của một nhóm là tỉ số giữa tần số nhóm và cỡ mẫu (tổng các tần số), tính theo phần trăm.',
      sol:`Cỡ mẫu ${tm(`n = ${f.join(' + ')} = ${n}`)}. ${tm(`\\dfrac{${f[t]}}{${n}}\\cdot 100\\% = ${rel(f[t])}\\%`)}. Đáp số ${tb(rel(f[t]) + '\\%')}.`});
  }
  if(lv === 2){
    const t = R(1, 3), F = f.slice(0, t + 1).reduce((p, q) => p + q, 0);
    return QB({text:`Bảng tần số ghép nhóm về ${c.w} của ${c.who}:<br>${tabF8(e, f)}Có bao nhiêu số liệu <b>nhỏ hơn ${e[t + 1]}</b>? (Đó là tần số tích luỹ của nhóm ${gr8(e[t], e[t + 1])}.)`, tpl:'[_] số liệu', ans:[F],
      hint:'Tần số tích luỹ của một nhóm là tổng tần số của nhóm đó và tất cả các nhóm đứng trước nó.',
      sol:`Các nhóm có số liệu nhỏ hơn ${e[t + 1]}: từ ${gr8(e[0], e[1])} đến ${gr8(e[t], e[t + 1])}. ${tm(f.slice(0, t + 1).join(' + ') + ' = ' + F)}. Đáp số ${tb(F)}.`});
  }
  // mức 3: ô khuyết, cho tần số tương đối của một nhóm
  const m = R(0, k - 1); let t; do { t = R(0, k - 1); } while(t === m);
  const p = rel(f[t]), cells = f.map((x, i) => i === m ? '<b>x</b>' : x);
  b8chk(n * p === f[t] * 100, 'g8e3');
  return QB({text:`Bảng tần số ghép nhóm về ${c.w} của ${c.who} có một ô bị mờ:<br>${tab8(['Nhóm', ...f.map((_, i) => gr8(e[i], e[i + 1]))], [['Tần số', ...cells]])}Biết nhóm ${gr8(e[t], e[t + 1])} có tần số tương đối bằng <b>${p}%</b>. Tìm giá trị của x.`, tpl:`${tm('x =')} [_]`, ans:[f[m]],
    hint:'Từ tần số và tần số tương đối của nhóm đã cho, tìm cỡ mẫu n; sau đó x bằng n trừ tổng các tần số còn lại.',
    sol:`${tm(`\\dfrac{${f[t]}}{n} = ${p}\\%`)} nên ${tm(`n = ${f[t]}:${p / 100} = ${n}`)}. Tổng các tần số còn lại là ${f.filter((_, i) => i !== m).join(' + ')} = ${n - f[m]}, suy ra ${tm(`x = ${n} - ${n - f[m]}`)} = ${tb(f[m])}.`});
};

const K8KT = [
  {t:'Nhóm số liệu', b:`Chia các số liệu thành những nhóm kề nhau, mỗi nhóm có dạng ${tm('[a;\\,b)')}: chứa ${tm('a')}, <b>không</b> chứa ${tm('b')}. Độ dài nhóm là ${tm('b - a')}. Các nhóm thường có cùng độ dài.`, warn:'Số liệu đúng bằng đầu mút phải thì thuộc nhóm <b>kế tiếp</b> (bên phải).', ex:'Với nhóm [10; 20): lấy 10, không lấy 20.'},
  {t:'Chia nhóm', b:`Số nhóm cần dùng: lấy ${tm('\\dfrac{\\text{giá trị lớn nhất} - \\text{giá trị nhỏ nhất}}{\\text{độ dài nhóm}}')} rồi làm tròn lên. Nhóm đầu bắt đầu từ giá trị nhỏ nhất (hoặc số tròn nhỏ hơn).`, warn:'Chia hết cũng phải kiểm tra: giá trị lớn nhất nằm đúng đầu mút phải của nhóm cuối thì cần thêm nhóm.', ex:'Thường chọn khoảng 5 đến 15 nhóm.'},
  {t:'Bảng tần số ghép nhóm', b:`Tần số ${tm('m_i')} của nhóm là số số liệu thuộc nhóm; cỡ mẫu ${tm('n = m_1 + m_2 + \\ldots + m_k')}. Tần số tương đối ${tm('f_i = \\dfrac{m_i}{n}\\cdot 100\\%')}; tần số tích luỹ của nhóm là tổng tần số từ nhóm đầu đến nhóm đó.`, warn:'Tổng các tần số tương đối bằng 100%. Đếm xong hãy cộng lại để kiểm tra bằng cỡ mẫu.', ex:'Gạch từng số đã đếm để không sót, không trùng.'},
  {t:'Biểu đồ cột (histogram)', b:'Các cột liền nhau, mỗi cột ứng với một nhóm, chiều cao cột bằng tần số (hoặc tần số tương đối). Mốc các nhóm ghi trên trục ngang.', warn:'Đọc đúng vạch trên trục tung; cột lọt giữa hai vạch thì nội suy cẩn thận.', ex:'Cỡ mẫu bằng tổng chiều cao tất cả các cột.'}
];
lesson(4, 'mau-so-lieu-ghep-nhom', 'Bài 8. Mẫu số liệu ghép nhóm', 'Xác định nhóm số liệu; chia nhóm; lập bảng tần số ghép nhóm; đọc biểu đồ cột; tần số tương đối và tần số tích luỹ.', [g8a, g8b, g8c, g8d, g8e], {introTitle:'Kiến thức cần nhớ · Chỗ dễ sai · Mẹo', intro:K8KT});

/* =====================================================================
   CHƯƠNG III. Bài 9. Các số đặc trưng đo xu thế trung tâm của mẫu số liệu ghép nhóm (thầy yêu cầu 16/10/2026, /tron-bo)
   Chủ đề 4 (cùng Bài 8). 5 dạng × 3 mức: 1 Số trung bình · 2 Trung vị · 3 Tứ phân vị · 4 Mốt · 5 Thực tế, so sánh, tìm tần số khuyết.
   Công thức KNTT: x̄ = Σ m_i x_i / n (x_i = giá trị đại diện = trung điểm); nhóm chứa M_e (Q_1, Q_3) là nhóm đầu tiên có tần số tích luỹ ≥ n/2 (n/4, 3n/4);
   M_e = u + (n/2 − C)/m · h; M_o = u_j + (m_j − m_{j−1})/((m_j − m_{j−1}) + (m_j − m_{j+1})) · h, m_0 = m_{k+1} = 0.
   Đáp án chọn trước rồi dựng đề; mọi đáp số được tính lại bằng công thức độc lập (b9chk).
   ===================================================================== */
{
const b9chk = (ok, msg) => { if(!ok) throw new Error('b9: ' + msg); };
const ok1 = v => Math.abs(v * 10 - Math.round(v * 10)) < 1e-9;
const d9 = v => String(Math.round(v * 100) / 100).replace('.', '{,}');       // số thập phân trong LaTeX
const sum9 = a => a.reduce((p, q) => p + q, 0);
const mid9 = (e, i) => (e[i] + e[i + 1]) / 2;
const mean9 = (e, f) => f.reduce((s, x, i) => s + x * mid9(e, i), 0) / sum9(f);
const cum9 = f => f.map((_, i) => sum9(f.slice(0, i + 1)));
const grp9 = (f, q) => { const c = cum9(f); return c.findIndex(x => x >= q - 1e-9); };
const quant9 = (e, f, q) => { const i = grp9(f, q), C = i ? sum9(f.slice(0, i)) : 0, h = e[1] - e[0]; return e[i] + (q - C) / f[i] * h; };
const mode9 = (e, f) => { const j = f.indexOf(Math.max(...f)), l = j ? f[j - 1] : 0, r = j < f.length - 1 ? f[j + 1] : 0, h = e[1] - e[0]; return e[j] + (f[j] - l) / ((f[j] - l) + (f[j] - r)) * h; };
const uniqMax9 = f => f.filter(x => x === Math.max(...f)).length === 1;
const labs9 = e => Array.from({length:e.length - 1}, (_, i) => gr8(e[i], e[i + 1]));
const gen9 = (k, n, lo, hi) => { const c = pick(CT8), s = c.s + c.len * R(0, 2), e = edges8(s, c.len, k); return {c, e, f:fSplit8(n, k, lo, hi)}; };
const search9 = (mk, test) => { for(let t = 0; t < 4000; t++){ const o = mk(); if(test(o)) return o; } throw new Error('b9: search'); };
const tabN9 = (e, f) => tabF8(e, f);

/* Dạng 1. Số trung bình */
const g9a = lv => {
  if(lv === 1){
    const o = search9(() => gen9(3, pick([10, 20]), 2, 12), o => ok1(mean9(o.e, o.f))), {c, e, f} = o, n = sum9(f), x = mean9(e, f);
    const terms = f.map((m, i) => `${m}\\cdot ${d9(mid9(e, i))}`).join(' + ');
    return QB({text:`Bảng tần số ghép nhóm về ${c.w} của ${c.who}:<br>${tabN9(e, f)}Tính số trung bình cộng ${tm('\\bar{x}')} của mẫu số liệu ghép nhóm này.`, tpl:`${tm('\\bar{x} =')} [_]`, ans:[x],
      hint:'Lấy giá trị đại diện của mỗi nhóm (trung điểm hai đầu mút), nhân với tần số rồi cộng lại và chia cho cỡ mẫu.',
      sol:`Giá trị đại diện: ${tm(f.map((_, i) => d9(mid9(e, i))).join(';\\ '))}. Cỡ mẫu ${tm(`n = ${f.join(' + ')} = ${n}`)}. ${tm(`\\bar{x} = \\dfrac{${terms}}{${n}} = ${d9(x)}`)}. Vậy ${tb(`\\bar{x} = ${d9(x)}`)}.`});
  }
  if(lv === 2){
    const o = search9(() => gen9(pick([4, 5]), pick([20, 25, 40, 50]), 2, 14), o => ok1(mean9(o.e, o.f))), {c, e, f} = o, n = sum9(f), x = mean9(e, f);
    const terms = f.map((m, i) => `${m}\\cdot ${d9(mid9(e, i))}`).join(' + ');
    return QB({text:`Bảng tần số ghép nhóm về ${c.w} của ${c.who}:<br>${tabN9(e, f)}Tính số trung bình cộng ${tm('\\bar{x}')} của mẫu số liệu ghép nhóm này.`, tpl:`${tm('\\bar{x} =')} [_]`, ans:[x],
      hint:'Giá trị đại diện của nhóm là trung điểm của nhóm. Lập tổng các tích (tần số × giá trị đại diện) rồi chia cho cỡ mẫu.',
      sol:`Giá trị đại diện: ${tm(f.map((_, i) => d9(mid9(e, i))).join(';\\ '))}. ${tm(`n = ${n}`)}. ${tm(`\\bar{x} = \\dfrac{${terms}}{${n}} = ${d9(x)}`)}. Vậy ${tb(`\\bar{x} = ${d9(x)}`)}.`});
  }
  // mức 3: biết số trung bình, tìm tần số khuyết
  const o = search9(() => { const g = gen9(4, pick([20, 25, 30, 40]), 3, 12); g.xi = R(0, 3); return g; },
    o => { const x = mean9(o.e, o.f), c = mid9(o.e, o.xi); return ok1(x) && Math.abs(c - x) > 0.4; }), {c, e, f, xi} = o;
  const n = sum9(f), x = mean9(e, f), mc = mid9(e, xi), n0 = n - f[xi], S0 = f.reduce((s, m, i) => i === xi ? s : s + m * mid9(e, i), 0);
  b9chk(Math.abs((S0 + f[xi] * mc) / (n0 + f[xi]) - x) < 1e-9, 'g9a3');
  const cells = f.map((m, i) => i === xi ? '<b>x</b>' : m);
  return QB({text:`Bảng tần số ghép nhóm về ${c.w} của ${c.who} có một ô bị mờ:<br>${tab8(['Nhóm', ...labs9(e)], [['Tần số', ...cells]])}Biết số trung bình cộng của mẫu số liệu ghép nhóm là <b>${d9(x).replace('{,}', ',')}</b>. Tìm giá trị của x.`, tpl:`${tm('x =')} [_]`, ans:[f[xi]],
    hint:'Viết số trung bình cộng theo x (cỡ mẫu và tổng các tích đều chứa x), rồi giải phương trình bậc nhất ẩn x.',
    sol:`Cỡ mẫu ${tm(`n = ${n0} + x`)}. ${tm(`\\bar{x} = \\dfrac{${d9(S0)} + ${d9(mc)}x}{${n0} + x} = ${d9(x)}`)}. Suy ra ${tm(`${d9(S0)} + ${d9(mc)}x = ${d9(x * n0)} + ${d9(x)}x`)}, tức ${tm(`${d9(Math.abs(mc - x))}x = ${d9(Math.abs(x * n0 - S0))}`)}. Vậy ${tb(`x = ${f[xi]}`)}.`});
};

/* Dạng 2. Trung vị */
const g9b = lv => {
  if(lv === 1){
    const o = gen9(5, pick([20, 24, 30, 40]), 2, 14), {c, e, f} = o, n = sum9(f), i = grp9(f, n / 2), labels = labs9(e), cum = cum9(f);
    b9chk(cum[i] >= n / 2 && (i === 0 || cum[i - 1] < n / 2), 'g9b1');
    return QC({text:`Bảng tần số ghép nhóm về ${c.w} của ${c.who}:<br>${tabN9(e, f)}Nhóm nào chứa trung vị của mẫu số liệu?`, opts:labels, ans:labels[i], keepOrder:true,
      hint:'Tính n/2, rồi cộng dồn tần số từ nhóm đầu; nhóm chứa trung vị là nhóm đầu tiên có tần số tích luỹ đạt tới n/2.',
      sol:`${tm(`n = ${n}`)}, ${tm(`\\dfrac{n}{2} = ${n / 2}`)}. Tần số tích luỹ: ${tm(cum.join(',\\ '))}. Nhóm đầu tiên có tần số tích luỹ ${tm('\\ge')} ${n / 2} là nhóm thứ ${i + 1}: ${tb(`[${e[i]};\\,${e[i + 1]})`)}.`});
  }
  if(lv === 2){
    const o = search9(() => gen9(4, pick([20, 24, 30, 40]), 2, 14), o => { const q = quant9(o.e, o.f, sum9(o.f) / 2); return ok1(q); }), {c, e, f} = o;
    const n = sum9(f), i = grp9(f, n / 2), C = i ? sum9(f.slice(0, i)) : 0, h = e[1] - e[0], x = quant9(e, f, n / 2);
    return QB({text:`Bảng tần số ghép nhóm về ${c.w} của ${c.who}:<br>${tabN9(e, f)}Tính trung vị ${tm('M_e')} của mẫu số liệu ghép nhóm.`, tpl:`${tm('M_e =')} [_]`, ans:[x],
      hint:'Tìm nhóm chứa trung vị, rồi dùng công thức: đầu mút trái + (n/2 − tần số tích luỹ nhóm trước) ÷ tần số nhóm × độ dài nhóm.',
      sol:`${tm(`n = ${n}`)}, ${tm(`\\dfrac{n}{2} = ${n / 2}`)}. Nhóm chứa trung vị là ${gr8(e[i], e[i + 1])} (tần số tích luỹ nhóm trước ${C}, tần số nhóm ${f[i]}, độ dài ${h}). ${tm(`M_e = ${e[i]} + \\dfrac{${n / 2} - ${C}}{${f[i]}}\\cdot ${h} = ${d9(x)}`)}. Vậy ${tb(`M_e = ${d9(x)}`)}.`});
  }
  // mức 3: bảng tần số tương đối (%)
  const o = search9(() => { const g = gen9(5, 20, 2, 8); return g; }, o => ok1(quant9(o.e, o.f, 10))), {c, e, f} = o;
  const pc = f.map(x => x * 5), i = grp9(f, 10), C = i ? sum9(pc.slice(0, i)) : 0, h = e[1] - e[0], x = quant9(e, f, 10);
  b9chk(sum9(pc) === 100 && Math.abs(e[i] + (50 - C) / pc[i] * h - x) < 1e-9, 'g9b3');
  return QB({text:`Tần số tương đối (%) của các nhóm về ${c.w} của ${c.who}:<br>${tab8(['Nhóm', ...labs9(e)], [['Tần số tương đối (%)', ...pc]])}Tính trung vị ${tm('M_e')} của mẫu số liệu ghép nhóm.`, tpl:`${tm('M_e =')} [_]`, ans:[x],
    hint:'Cỡ mẫu tương ứng với 100%, nên trung vị ứng với mốc 50%. Cộng dồn các tần số tương đối để tìm nhóm chứa mốc 50%, rồi dùng công thức trung vị với 50 thay cho n/2.',
    sol:`Cộng dồn: ${tm(cum9(pc).map(z => z + '\\%').join(',\\ '))}. Nhóm đầu tiên đạt ${tm('50\\%')} trở lên là ${gr8(e[i], e[i + 1])}, phần trăm các nhóm trước là ${C}. ${tm(`M_e = ${e[i]} + \\dfrac{50 - ${C}}{${pc[i]}}\\cdot ${h} = ${d9(x)}`)}. Vậy ${tb(`M_e = ${d9(x)}`)}.`});
};

/* Dạng 3. Tứ phân vị */
const g9c = lv => {
  if(lv === 1){
    const o = gen9(5, pick([20, 24, 40]), 2, 14), {c, e, f} = o, n = sum9(f), q3 = pick([0, 1]), p = q3 ? 3 : 1, i = grp9(f, p * n / 4), labels = labs9(e), cum = cum9(f);
    b9chk(cum[i] >= p * n / 4 && (i === 0 || cum[i - 1] < p * n / 4), 'g9c1');
    return QC({text:`Bảng tần số ghép nhóm về ${c.w} của ${c.who}:<br>${tabN9(e, f)}Nhóm nào chứa tứ phân vị thứ ${q3 ? 'ba' : 'nhất'} ${tm(q3 ? 'Q_3' : 'Q_1')}?`, opts:labels, ans:labels[i], keepOrder:true,
      hint:`Tính ${q3 ? '3n/4' : 'n/4'}, rồi cộng dồn tần số từ nhóm đầu; nhóm cần tìm là nhóm đầu tiên có tần số tích luỹ đạt tới giá trị đó.`,
      sol:`${tm(`n = ${n}`)}, ${tm(q3 ? `\\dfrac{3n}{4} = ${3 * n / 4}` : `\\dfrac{n}{4} = ${n / 4}`)}. Tần số tích luỹ: ${tm(cum.join(',\\ '))}. Nhóm đầu tiên có tần số tích luỹ ${tm('\\ge')} ${p * n / 4} là ${tb(`[${e[i]};\\,${e[i + 1]})`)}.`});
  }
  if(lv === 2){
    const o = search9(() => gen9(4, pick([20, 24, 40]), 2, 14), o => ok1(quant9(o.e, o.f, sum9(o.f) / 4))), {c, e, f} = o;
    const n = sum9(f), i = grp9(f, n / 4), C = i ? sum9(f.slice(0, i)) : 0, h = e[1] - e[0], x = quant9(e, f, n / 4);
    return QB({text:`Bảng tần số ghép nhóm về ${c.w} của ${c.who}:<br>${tabN9(e, f)}Tính tứ phân vị thứ nhất ${tm('Q_1')} của mẫu số liệu ghép nhóm.`, tpl:`${tm('Q_1 =')} [_]`, ans:[x],
      hint:'Làm giống công thức trung vị nhưng thay n/2 bằng n/4: tìm nhóm chứa Q₁ rồi áp dụng công thức.',
      sol:`${tm(`n = ${n}`)}, ${tm(`\\dfrac{n}{4} = ${n / 4}`)}. Nhóm chứa ${tm('Q_1')} là ${gr8(e[i], e[i + 1])} (tần số tích luỹ nhóm trước ${C}, tần số nhóm ${f[i]}, độ dài ${h}). ${tm(`Q_1 = ${e[i]} + \\dfrac{${n / 4} - ${C}}{${f[i]}}\\cdot ${h} = ${d9(x)}`)}. Vậy ${tb(`Q_1 = ${d9(x)}`)}.`});
  }
  const o = search9(() => gen9(pick([5, 6]), pick([40, 48, 60]), 3, 16), o => ok1(quant9(o.e, o.f, sum9(o.f) / 4)) && ok1(quant9(o.e, o.f, 3 * sum9(o.f) / 4))), {c, e, f} = o;
  const n = sum9(f), h = e[1] - e[0], q1 = quant9(e, f, n / 4), q3 = quant9(e, f, 3 * n / 4), i1 = grp9(f, n / 4), i3 = grp9(f, 3 * n / 4);
  const C1 = i1 ? sum9(f.slice(0, i1)) : 0, C3 = i3 ? sum9(f.slice(0, i3)) : 0;
  return QB({text:`Bảng tần số ghép nhóm về ${c.w} của ${c.who}:<br>${tabN9(e, f)}Tính ${tm('Q_1')} và ${tm('Q_3')} của mẫu số liệu ghép nhóm.`, tpl:`${tm('Q_1 =')} [_] ; ${tm('Q_3 =')} [_]`, ans:[q1, q3],
    hint:'Cỡ mẫu n lấy từ tổng các tần số. Q₁ ứng với n/4, Q₃ ứng với 3n/4: tìm từng nhóm chứa chúng bằng tần số tích luỹ rồi áp dụng công thức.',
    sol:`${tm(`n = ${n}`)}. ${tm('Q_1')}: ${tm(`\\dfrac{n}{4} = ${n / 4}`)}, nhóm ${gr8(e[i1], e[i1 + 1])}: ${tm(`Q_1 = ${e[i1]} + \\dfrac{${n / 4} - ${C1}}{${f[i1]}}\\cdot ${h} = ${d9(q1)}`)}. ${tm('Q_3')}: ${tm(`\\dfrac{3n}{4} = ${3 * n / 4}`)}, nhóm ${gr8(e[i3], e[i3 + 1])}: ${tm(`Q_3 = ${e[i3]} + \\dfrac{${3 * n / 4} - ${C3}}{${f[i3]}}\\cdot ${h} = ${d9(q3)}`)}. Vậy ${tb(`Q_1 = ${d9(q1)}`)}, ${tb(`Q_3 = ${d9(q3)}`)}.`});
};

/* Dạng 4. Mốt */
const g9d = lv => {
  if(lv === 1){
    const o = search9(() => gen9(5, pick([24, 30, 40]), 2, 14), o => uniqMax9(o.f)), {c, e, f} = o, j = f.indexOf(Math.max(...f)), labels = labs9(e);
    return QC({text:`Bảng tần số ghép nhóm về ${c.w} của ${c.who}:<br>${tabN9(e, f)}Nhóm nào chứa mốt của mẫu số liệu ghép nhóm?`, opts:labels, ans:labels[j], keepOrder:true,
      hint:'Nhóm chứa mốt là nhóm có tần số lớn nhất.',
      sol:`Tần số lớn nhất là ${f[j]}, ứng với nhóm ${tb(`[${e[j]};\\,${e[j + 1]})`)}.`});
  }
  if(lv === 2){
    const o = search9(() => gen9(5, pick([24, 30, 40, 50]), 2, 14), o => { const j = o.f.indexOf(Math.max(...o.f)); return uniqMax9(o.f) && j > 0 && j < 4 && ok1(mode9(o.e, o.f)); }), {c, e, f} = o;
    const j = f.indexOf(Math.max(...f)), h = e[1] - e[0], x = mode9(e, f), l = f[j - 1], r = f[j + 1];
    return QB({text:`Bảng tần số ghép nhóm về ${c.w} của ${c.who}:<br>${tabN9(e, f)}Tính mốt ${tm('M_o')} của mẫu số liệu ghép nhóm.`, tpl:`${tm('M_o =')} [_]`, ans:[x],
      hint:'Nhóm chứa mốt là nhóm có tần số lớn nhất. Công thức: đầu mút trái + (hiệu tần số với nhóm trước) ÷ (hiệu với nhóm trước + hiệu với nhóm sau) × độ dài nhóm.',
      sol:`Nhóm chứa mốt: ${gr8(e[j], e[j + 1])} (tần số ${f[j]}), nhóm trước có tần số ${l}, nhóm sau có tần số ${r}, độ dài ${h}. ${tm(`M_o = ${e[j]} + \\dfrac{${f[j]} - ${l}}{(${f[j]} - ${l}) + (${f[j]} - ${r})}\\cdot ${h} = ${d9(x)}`)}. Vậy ${tb(`M_o = ${d9(x)}`)}.`});
  }
  // mức 3: đọc biểu đồ cột, nhóm chứa mốt có thể ở đầu hoặc cuối
  const c = pick(CTH8), k = 5, e = edges8(c.s, c.len, k);
  const o = search9(() => ({f:fSplit8(pick([20, 30, 40]), k, 2, 14, true)}), o => { const j = o.f.indexOf(Math.max(...o.f)); return uniqMax9(o.f) && (j === 0 || j === k - 1) && ok1(mode9(e, o.f)); }), f = o.f;
  const j = f.indexOf(Math.max(...f)), h = e[1] - e[0], x = mode9(e, f), l = j ? f[j - 1] : 0, r = j < k - 1 ? f[j + 1] : 0;
  return QB({text:`Biểu đồ cột sau cho biết ${c.w} của các học sinh lớp 11A được khảo sát. Tính mốt ${tm('M_o')} của mẫu số liệu ghép nhóm.`, fig:histSVG(e, f, 2, {unit:c.u}), tpl:`${tm('M_o =')} [_]`, ans:[x],
    hint:'Đọc tần số từng cột. Nếu nhóm chứa mốt là nhóm đầu hoặc nhóm cuối thì phía không có nhóm kề được coi là có tần số 0.',
    sol:`Tần số các nhóm: ${tm(f.join(',\\ '))}. Nhóm chứa mốt: ${gr8(e[j], e[j + 1])} (tần số ${f[j]}), tần số nhóm trước ${l}, nhóm sau ${r}, độ dài ${h}. ${tm(`M_o = ${e[j]} + \\dfrac{${f[j]} - ${l}}{(${f[j]} - ${l}) + (${f[j]} - ${r})}\\cdot ${h} = ${d9(x)}`)}. Vậy ${tb(`M_o = ${d9(x)}`)}.`});
};

/* Dạng 5. Chọn số đặc trưng, so sánh, tìm tần số khuyết */
const SC9 = [
  {t:'Một cửa hàng giày muốn biết cỡ giày nào được mua nhiều nhất để quyết định nhập hàng.', a:'Mốt', why:'Cần giá trị xuất hiện nhiều nhất nên dùng mốt.'},
  {t:'Nhà trường muốn biết thời gian tự học trung bình mỗi tối của một học sinh.', a:'Số trung bình', why:'“Trung bình” là số trung bình cộng.'},
  {t:'Giáo viên muốn chia lớp thành hai nửa bằng nhau: nửa chạy nhanh hơn và nửa chạy chậm hơn một mốc thời gian.', a:'Trung vị', why:'Trung vị chia mẫu thành hai nửa có số lượng bằng nhau.'},
  {t:'Nhà trường mở lớp phụ đạo cho 25% số học sinh có điểm thấp nhất; cần xác định mốc điểm ranh giới.', a:'Tứ phân vị thứ nhất', why:'Mốc ngăn 25% số liệu nhỏ nhất là tứ phân vị thứ nhất Q₁.'},
  {t:'Câu lạc bộ khen thưởng 25% số học sinh chạy nhanh nhất; cần mốc thời gian ranh giới (thời gian càng nhỏ càng nhanh).', a:'Tứ phân vị thứ nhất', why:'25% nhanh nhất là 25% thời gian nhỏ nhất, ranh giới là Q₁.'},
  {t:'Một câu lạc bộ khen thưởng 25% số bạn có số trang đọc nhiều nhất; cần mốc số trang ranh giới.', a:'Tứ phân vị thứ ba', why:'25% lớn nhất nằm bên phải Q₃.'}
];
const g9e = lv => {
  if(lv === 1){
    const s = pick(SC9), opts = ['Số trung bình', 'Trung vị', 'Mốt', 'Tứ phân vị thứ nhất', 'Tứ phân vị thứ ba'];
    return QC({text:`${s.t} Nên dùng số đặc trưng nào của mẫu số liệu?`, opts, ans:s.a, keepOrder:true,
      hint:'Xác định em cần giá trị xuất hiện nhiều nhất, giá trị trung bình, hay một mốc chia số liệu theo tỉ lệ nhất định (một nửa, một phần tư).',
      sol:`${s.why} Chọn ${tb(s.a)}.`});
  }
  if(lv === 2){
    const k = 4, n = pick([20, 40]), c = pick(CT8), s = c.s + c.len * R(0, 2), e = edges8(s, c.len, k);
    const o = search9(() => ({fa:fSplit8(n, k, 3, 14), fb:fSplit8(n, k, 3, 14)}), o => ok1(mean9(e, o.fa)) && ok1(mean9(e, o.fb)) && Math.abs(mean9(e, o.fa) - mean9(e, o.fb)) >= 0.5);
    const xa = mean9(e, o.fa), xb = mean9(e, o.fb), ans = xa > xb ? 'Lớp 11A' : 'Lớp 11B';
    return QC({text:`Bảng tần số ghép nhóm về ${c.w} của hai lớp (mỗi lớp ${n} học sinh):<br>${tab8(['Nhóm', ...labs9(e)], [['Lớp 11A', ...o.fa], ['Lớp 11B', ...o.fb]])}Lớp nào có số trung bình cộng lớn hơn?`, opts:['Lớp 11A', 'Lớp 11B', 'Hai lớp bằng nhau'], ans, keepOrder:true,
      hint:'Tính số trung bình cộng của từng lớp bằng giá trị đại diện của nhóm, rồi so sánh.',
      sol:`Giá trị đại diện: ${tm(e.slice(0, k).map((_, i) => d9(mid9(e, i))).join(';\\ '))}. Lớp 11A: ${tm(`\\bar{x}_A = ${d9(xa)}`)}. Lớp 11B: ${tm(`\\bar{x}_B = ${d9(xb)}`)}. Vậy ${tb(ans)} có số trung bình lớn hơn.`});
  }
  // mức 3: biết trung vị, tìm tần số khuyết nằm sau nhóm chứa trung vị
  const o = search9(() => { const g = gen9(5, pick([30, 40, 50, 60]), 3, 16); g.xi = R(2, 4); return g; },
    o => { const n = sum9(o.f), i = grp9(o.f, n / 2), x = quant9(o.e, o.f, n / 2); return i < o.xi && ok1(x) && x > o.e[i] && x < o.e[i + 1]; }), {c, e, f, xi} = o;
  const n = sum9(f), i = grp9(f, n / 2), C = i ? sum9(f.slice(0, i)) : 0, h = e[1] - e[0], me = quant9(e, f, n / 2), n0 = n - f[xi];
  b9chk(Math.abs(2 * (C + (me - e[i]) * f[i] / h) - n) < 1e-9, 'g9e3');
  const cells = f.map((m, j) => j === xi ? '<b>x</b>' : m);
  return QB({text:`Bảng tần số ghép nhóm về ${c.w} của ${c.who} có một ô bị mờ:<br>${tab8(['Nhóm', ...labs9(e)], [['Tần số', ...cells]])}Biết trung vị của mẫu số liệu ghép nhóm là <b>${d9(me).replace('{,}', ',')}</b>. Tìm giá trị của x.`, tpl:`${tm('x =')} [_]`, ans:[f[xi]],
    hint:'Trung vị cho biết nó nằm trong nhóm nào. Thay vào công thức trung vị với cỡ mẫu n chưa biết, giải ra n, rồi suy ra x từ tổng các tần số.',
    sol:`Trung vị ${d9(me)} thuộc nhóm ${gr8(e[i], e[i + 1])}, tần số tích luỹ nhóm trước ${C}, tần số nhóm ${f[i]}. ${tm(`${d9(me)} = ${e[i]} + \\dfrac{\\dfrac{n}{2} - ${C}}{${f[i]}}\\cdot ${h}`)} suy ra ${tm(`\\dfrac{n}{2} = ${d9(C + (me - e[i]) * f[i] / h)}`)}, ${tm(`n = ${n}`)}. Cỡ mẫu ${tm(`n = ${n0} + x`)} nên ${tb(`x = ${n} - ${n0} = ${f[xi]}`)}.`});
};

const K9KT = [
  {t:'Số trung bình', b:`Mỗi nhóm lấy <b>giá trị đại diện</b> ${tm('x_i')} = trung điểm của nhóm. ${tm('\\bar{x} = \\dfrac{m_1x_1 + m_2x_2 + \\cdots + m_kx_k}{n}')}, với ${tm('m_i')} là tần số, ${tm('n = m_1 + \\cdots + m_k')}.`, warn:'Giá trị đại diện là trung điểm của nhóm [a; b), tức (a + b) : 2, không phải đầu mút.', ex:'Lập bảng 3 cột: nhóm – giá trị đại diện – tần số × giá trị đại diện, rồi cộng cột cuối.'},
  {t:'Trung vị', b:`Nhóm chứa trung vị là nhóm đầu tiên có tần số tích luỹ ${tm('\\ge \\dfrac{n}{2}')}. ${tm('M_e = u_m + \\dfrac{\\frac{n}{2} - C}{n_m}\\cdot (u_{m+1} - u_m)')}, với ${tm('u_m')} là đầu mút trái, ${tm('C')} là tần số tích luỹ của các nhóm đứng trước, ${tm('n_m')} là tần số nhóm.`, warn:'C là tần số tích luỹ của nhóm <b>đứng trước</b> nhóm chứa trung vị, không tính nhóm đó.', ex:'Tìm nhóm bằng cách cộng dồn tần số cho tới khi lần đầu đạt n/2.'},
  {t:'Tứ phân vị', b:`${tm('Q_2 = M_e')}. Với ${tm('Q_1')}: thay ${tm('\\dfrac{n}{2}')} bằng ${tm('\\dfrac{n}{4}')}; với ${tm('Q_3')}: thay bằng ${tm('\\dfrac{3n}{4}')}. Mỗi tứ phân vị có nhóm chứa riêng, có thể khác nhau.`, warn:'Khi cộng dồn đúng bằng n/4 (hoặc 3n/4) tại nhóm nào thì vẫn dùng nhóm đó, kết quả là đầu mút phải của nhóm.', ex:'Tính ba mốc n/4, n/2, 3n/4 trước, rồi đối chiếu một lần với dãy tần số tích luỹ.'},
  {t:'Mốt', b:`Nhóm chứa mốt là nhóm có tần số lớn nhất. ${tm('M_o = u_j + \\dfrac{m_j - m_{j-1}}{(m_j - m_{j-1}) + (m_j - m_{j+1})}\\cdot h')}, với ${tm('h')} là độ dài nhóm.`, warn:'Nhóm đầu không có nhóm trước và nhóm cuối không có nhóm sau: lúc đó coi tần số nhóm thiếu bằng 0.', ex:'Mốt luôn nằm trong nhóm có tần số lớn nhất, nên kết quả phải nằm giữa hai đầu mút nhóm đó.'}
];
lesson(4, 'ghep-nhom-xu-the', 'Bài 9. Các số đặc trưng đo xu thế trung tâm', 'Số trung bình, trung vị, tứ phân vị và mốt của mẫu số liệu ghép nhóm; chọn số đặc trưng phù hợp; bài toán thực tế.', [g9a, g9b, g9c, g9d, g9e], {introTitle:'Kiến thức cần nhớ · Chỗ dễ sai · Mẹo', intro:K9KT});
}


/* =====================================================================
   CHƯƠNG IV. Quan hệ song song trong không gian
   Bài 10. Đường thẳng và mặt phẳng trong không gian  (SGK KNTT Toán 11 tập 1, tr. 70–76)
   Chủ đề 5 · bài `dt-mp-khong-gian` · 6 dạng × 3 mức, mỗi dạng bốc ngẫu nhiên từ nhiều mẫu câu khác nhau
   ===================================================================== */
{ const i4 = G.topics.findIndex(t => t.id === 4); G.topics.splice(i4 < 0 ? G.topics.length : i4 + 1, 0, {id:5, hk:2, name:'Quan hệ song song trong không gian', label:'Chương IV'}); }
{
const m = tm;
const e10 = (c, msg) => { if(!c) throw new Error('b10: ' + msg); };
const nm = k => shuffle(['A', 'B', 'C', 'D', 'E', 'F', 'M', 'N', 'H', 'K', 'I', 'J']).slice(0, k);
const PL = [{t:'(P)', x:'(P)'}, {t:'(Q)', x:'(Q)'}, {t:'(R)', x:'(R)'}, {t:'(\\alpha)', x:'(α)'}, {t:'(\\beta)', x:'(β)'}];
const Cn = (n, k) => { let r = 1; for(let i = 1; i <= k; i++) r = r * (n - k + i) / i; return Math.round(r); };
const mc10 = (text, good, bads, hint, sol, fig) => {
  e10(!bads.includes(good) && new Set(bads).size === bads.length && bads.length >= 2, 'phương án trùng/thiếu: ' + text);
  return QC({text, opts:[good, ...bads], ans:good, hint, sol, ...(fig ? {fig} : {})});
};
const ix = (p, q, r, s) => { const d = (q[0] - p[0]) * (s[1] - r[1]) - (q[1] - p[1]) * (s[0] - r[0]); const t = ((r[0] - p[0]) * (s[1] - r[1]) - (r[1] - p[1]) * (s[0] - r[0])) / d; return [p[0] + t * (q[0] - p[0]), p[1] + t * (q[1] - p[1])]; };
const mid = (p, q, t = .5) => [p[0] + t * (q[0] - p[0]), p[1] + t * (q[1] - p[1])];
const SETS = [['A', 'B', 'C', 'D'], ['S', 'A', 'B', 'C'], ['M', 'N', 'P', 'Q'], ['E', 'F', 'G', 'H']];
/* hình tứ diện: vai trò (đỉnh trên, trái, trước, phải-sau); cạnh khuất = trái–phải */
const TET0 = [[160, 22], [48, 160], [168, 196], [288, 128]];
const tetFig = (L, o = {}) => {
  const [v, x, y, z] = L, pts = {[v]:TET0[0], [x]:TET0[1], [y]:TET0[2], [z]:TET0[3], ...(o.pts || {})};
  return spaceSVG({pts, s:[[v, x], [v, y], [v, z], [x, y], [y, z], ...(o.s || [])], d:[[x, z], ...(o.d || [])], h:o.h, hd:o.hd, fill:o.fill, off:o.off, ht:218, aria:o.aria || 'Hình tứ diện'});
};
/* hình chóp tứ giác đáy hình bình hành */
const PY0 = [[160, 16], [40, 142], [104, 186], [262, 186], [298, 142]];
const pyFig = (L, o = {}) => {
  const [s, a, b, c, d] = L, pts = {[s]:PY0[0], [a]:PY0[1], [b]:PY0[2], [c]:PY0[3], [d]:PY0[4], ...(o.pts || {})};
  return spaceSVG({pts, s:[[s, a], [s, b], [s, c], [s, d], [a, b], [b, c], [c, d], ...(o.s || [])], d:[[a, d], ...(o.d || [])], h:o.h, hd:o.hd, fill:o.fill, off:o.off, ht:218, aria:o.aria || 'Hình chóp'});
};
/* mặt phẳng (hình bình hành) với hai điểm */
const planeFig = (A, B, inA, inB, P) => {
  const pts = {[A]:inA ? [150, 138] : [96, 48], [B]:inB ? [215, 124] : [225, 44]};
  return spaceSVG({pts, planes:[{q:[[28, 172], [232, 172], [308, 98], [104, 98]], lab:P.x, at:[250, 160]}], ht:190, off:{[A]:[-16, 0], [B]:[16, 0]}, aria:'Mặt phẳng và hai điểm'});
};

/* ---------- Dạng 1. Mặt phẳng, kí hiệu, hình biểu diễn ---------- */
const REAL = ['mặt bảng', 'màn hình máy tính', 'mặt nước hồ khi lặng gió', 'mặt bàn', 'mặt sân bóng', 'mặt sàn lớp học'];
const NOTP = ['quả bóng bàn', 'chiếc nón lá', 'quả dưa hấu', 'thân cột hình trụ', 'mặt trong của chiếc bát', 'quả địa cầu'];
const RULE = [
  ['Trong hình biểu diễn của một hình không gian, đoạn thẳng bị che khuất được vẽ bằng', 'nét đứt', ['nét liền', 'nét đậm', 'nét chấm gạch'], 'Nét liền cho đường nhìn thấy, nét đứt cho đường bị che khuất.'],
  ['Hình biểu diễn của hai đường thẳng song song là', 'hai đường thẳng song song', ['hai đường thẳng cắt nhau', 'hai đường thẳng vuông góc', 'hai đường cong'], 'Hình biểu diễn của hai đường thẳng song song là hai đường thẳng song song.'],
  ['Hình biểu diễn của hai đường thẳng cắt nhau là', 'hai đường thẳng cắt nhau', ['hai đường thẳng song song', 'hai đường thẳng trùng nhau', 'hai đường cong'], 'Hình biểu diễn giữ nguyên quan hệ cắt nhau.'],
  ['Để biểu diễn một mặt phẳng, người ta thường dùng hình nào?', 'hình bình hành', ['hình tròn', 'hình tam giác đều', 'hình ngũ giác đều'], 'SGK vẽ mặt phẳng bằng một hình bình hành (có ghi tên mặt phẳng ở một góc).'],
  ['Hình biểu diễn của một hình không gian giữ nguyên quan hệ nào giữa điểm và đường thẳng?', 'quan hệ liên thuộc (điểm thuộc đường thẳng)', ['quan hệ vuông góc', 'độ dài các đoạn thẳng', 'số đo các góc'], 'Hình biểu diễn không giữ độ dài, góc; nó giữ quan hệ liên thuộc.']
];
const g10a = lv => {
  const [A, B] = nm(2), P = pick(PL), d = pick(['d', 'a', 'b']);
  if(lv === 1){
    const t = R(0, 3);
    if(t === 0) return mc10(`Điểm ${m(A)} thuộc mặt phẳng ${m(P.t)} được kí hiệu là`, m(`${A} \\in ${P.t}`), [m(`${A} \\notin ${P.t}`), m(`${A} \\subset ${P.t}`), m(`${P.t} \\in ${A}`)],
      'Quan hệ “điểm thuộc mặt phẳng” dùng kí hiệu ∈.', `Điểm ${A} thuộc ${P.t}: ${tb(`${A} \\in ${P.t}`)}.`);
    if(t === 1) return mc10(`Điểm ${m(B)} không thuộc mặt phẳng ${m(P.t)} được kí hiệu là`, m(`${B} \\notin ${P.t}`), [m(`${B} \\in ${P.t}`), m(`${B} \\not\\subset ${P.t}`), m(`${P.t} \\notin ${B}`)],
      'Gạch chéo lên kí hiệu thuộc để chỉ “không thuộc”.', `Điểm ${B} không thuộc ${P.t}: ${tb(`${B} \\notin ${P.t}`)}.`);
    if(t === 2) return mc10(`Đường thẳng ${m(d)} nằm trong mặt phẳng ${m(P.t)} (mọi điểm của ${m(d)} đều thuộc ${m(P.t)}) được kí hiệu là`, m(`${d} \\subset ${P.t}`), [m(`${d} \\in ${P.t}`), m(`${P.t} \\subset ${d}`), m(`${d} \\notin ${P.t}`)],
      'Đường thẳng là tập hợp điểm, nằm trong mặt phẳng nên dùng kí hiệu ⊂.', `Đường thẳng nằm trong mặt phẳng: ${tb(`${d} \\subset ${P.t}`)} (hoặc ${m(`${P.t} \\supset ${d}`)}).`);
    const g = pick(REAL), bs = shuffle(NOTP).slice(0, 3);
    return mc10('Hình ảnh nào sau đây gợi ra một phần của mặt phẳng?', g, bs, 'Mặt phẳng “phẳng”, không có bề dày và không có giới hạn.', `${tb(g)} là hình ảnh của một phần mặt phẳng; các vật còn lại đều có mặt cong hoặc có khối.`);
  }
  if(lv === 2){
    const t = R(0, 2);
    if(t === 0){
      const iA = pick([true, false]), iB = pick([true, false]);
      const stm = (a, b) => `${m(`${A} ${a ? '\\in' : '\\notin'} ${P.t}`)} và ${m(`${B} ${b ? '\\in' : '\\notin'} ${P.t}`)}`;
      const all = [[true, true], [true, false], [false, true], [false, false]];
      return mc10(`Quan sát hình. Khẳng định nào đúng?`, stm(iA, iB), all.filter(x => !(x[0] === iA && x[1] === iB)).map(x => stm(x[0], x[1])),
        'Điểm vẽ trong hình bình hành thì thuộc mặt phẳng; điểm vẽ ngoài hình bình hành thì không thuộc mặt phẳng.', `Điểm ${A} ${iA ? 'nằm trong' : 'nằm ngoài'} hình bình hành và điểm ${B} ${iB ? 'nằm trong' : 'nằm ngoài'} hình bình hành, nên ${tb(`${A} ${iA ? '\\in' : '\\notin'} ${P.t},\; ${B} ${iB ? '\\in' : '\\notin'} ${P.t}`)}.`, planeFig(A, B, iA, iB, P));
    }
    if(t === 1){ const r = pick(RULE); return mc10(r[0], r[1], r[2], r[3], `Đáp án: ${tb(r[1])}. ${r[3]}`); }
    return mc10(`Điểm ${m(A)} thuộc mặt phẳng ${m(P.t)}. Phát biểu nào sau đây <b>không</b> đúng?`, `${m(P.t)} không đi qua điểm ${m(A)}`, [`${m(A)} nằm trên ${m(P.t)}`, `${m(P.t)} chứa điểm ${m(A)}`, `${m(P.t)} đi qua điểm ${m(A)}`],
      'Ba cách nói “thuộc”, “nằm trên”, “chứa”, “đi qua” đều cùng một ý.', `${m(`${A} \\in ${P.t}`)} còn được nói là “${A} nằm trên ${P.t}”, “${P.t} chứa ${A}”, “${P.t} đi qua ${A}”. Phát biểu “${P.t} không đi qua ${A}” là ${tb('sai')}.`);
  }
  const t = R(0, 2);
  if(t === 0) return mc10(`Cho điểm ${m(A)} thuộc mặt phẳng ${m(P.t)} và điểm ${m(B)} không thuộc ${m(P.t)}. Khẳng định nào sau đây đúng?`, `Đường thẳng ${m(A + B)} không nằm trong ${m(P.t)}`,
    [`Đường thẳng ${m(A + B)} nằm trong ${m(P.t)}`, `Điểm ${m(B)} thuộc ${m(P.t)}`, `Mọi điểm của đường thẳng ${m(A + B)} đều thuộc ${m(P.t)}`],
    'Nếu AB nằm trong mặt phẳng thì B phải thuộc mặt phẳng đó.', `Nếu ${m(A + B)} nằm trong ${m(P.t)} thì mọi điểm của nó, kể cả ${m(B)}, thuộc ${m(P.t)} – trái giả thiết. Vậy ${tb(`${A + B} \\not\\subset ${P.t}`)}.`);
  if(t === 1) return mc10(`Cho đường thẳng ${m(d)} nằm trong mặt phẳng ${m(P.t)} và điểm ${m(A)} thuộc đường thẳng ${m(d)}. Khẳng định nào đúng?`, m(`${A} \\in ${P.t}`), [m(`${A} \\notin ${P.t}`), m(`${P.t} \\subset ${d}`), m(`${d} \\notin ${P.t}`)],
    'Mọi điểm của đường thẳng nằm trong mặt phẳng đều thuộc mặt phẳng đó.', `${m(`${d} \\subset ${P.t}`)} nên mọi điểm của ${m(d)} đều thuộc ${m(P.t)}; mà ${m(A)} thuộc ${m(d)}, suy ra ${tb(`${A} \\in ${P.t}`)}.`);
  const TR = ['Mặt phẳng không có bề dày và không có giới hạn.', `Nếu ${m(`${A} \\in ${P.t}`)} thì có thể nói “${m(P.t)} đi qua ${m(A)}”.`, `Nếu ${m(`${d} \\subset ${P.t}`)} thì có thể nói “${m(P.t)} chứa ${m(d)}”.`, 'Hình biểu diễn giữ nguyên quan hệ liên thuộc giữa điểm và đường thẳng.', 'Hình biểu diễn của hai đường thẳng song song là hai đường thẳng song song.'];
  const FA = ['Mặt phẳng có bề dày rất nhỏ nhưng vẫn đo được.', 'Đoạn thẳng bị che khuất được vẽ bằng nét liền.', 'Hình biểu diễn của hai đường thẳng song song là hai đường thẳng cắt nhau.', 'Mặt phẳng chỉ là một phần giới hạn như tờ giấy.', `Điểm ${m(A)} không thuộc ${m(P.t)} khi ${m(A)} nằm bên trong hình bình hành biểu diễn ${m(P.t)}.`];
  const k = R(1, 3), sel = shuffle([...shuffle(TR).slice(0, k), ...shuffle(FA).slice(0, 4 - k)]);
  const dd = ['a)', 'b)', 'c)', 'd)'];
  return QB({text:`Cho bốn phát biểu:<br>${sel.map((x, i) => `${dd[i]} ${x}`).join('<br>')}<br>Có bao nhiêu phát biểu <b>đúng</b>?`, tpl:'[_]', ans:[k],
    hint:'Xét từng phát biểu: mặt phẳng không có bề dày, không có giới hạn; nét đứt là nét che khuất; hình biểu diễn giữ quan hệ liên thuộc và song song.', sol:`Có ${tb(k)} phát biểu đúng (các phát biểu đúng là những phát biểu nhắc lại đúng quy ước/kí hiệu trong SGK).`});
};

/* ---------- Dạng 2. Các tính chất thừa nhận ---------- */
const T10 = [
  ['Có một và chỉ một đường thẳng đi qua hai điểm phân biệt.', 'qua hai điểm phân biệt có đúng một đường thẳng'],
  ['Có một và chỉ một mặt phẳng đi qua ba điểm không thẳng hàng.', 'qua ba điểm không thẳng hàng có đúng một mặt phẳng'],
  ['Tồn tại bốn điểm không cùng thuộc một mặt phẳng.', 'tồn tại bốn điểm không đồng phẳng'],
  ['Nếu một đường thẳng có hai điểm phân biệt thuộc một mặt phẳng thì mọi điểm của đường thẳng đều thuộc mặt phẳng đó.', 'đường thẳng có hai điểm thuộc mặt phẳng thì nằm trong mặt phẳng'],
  ['Nếu hai mặt phẳng phân biệt có một điểm chung thì chúng có một đường thẳng chung đi qua điểm chung đó.', 'hai mặt phẳng phân biệt có điểm chung thì cắt nhau theo một đường thẳng'],
  ['Trên mỗi mặt phẳng, mọi kết quả đã biết của hình học phẳng đều đúng.', 'trong mỗi mặt phẳng, các kết quả hình học phẳng đều đúng']
];
const REALPROP = [
  ['Vì sao chiếc chân máy ảnh ba chân luôn đứng vững trên mặt đất phẳng?', 1, 'ba đầu chân không thẳng hàng nên xác định đúng một mặt phẳng, mặt phẳng đó trùng với mặt đất.'],
  ['Vì sao giá treo nồi ba chân luôn đặt vững trên nền đất phẳng?', 1, 'ba chân chạm đất tại ba điểm không thẳng hàng, chúng xác định đúng một mặt phẳng (mặt đất).'],
  ['Căng một sợi dây sao cho hai đầu dây nằm trên mặt bàn phẳng thì cả sợi dây nằm trên mặt bàn. Điều này giải thích bởi tính chất nào?', 3, 'đường thẳng có hai điểm phân biệt thuộc mặt phẳng thì nằm trọn trong mặt phẳng.'],
  ['Chiếc xà ngang đặt tựa lên hai điểm cố định A, B của trụ nhảy; không thể đặt xà theo hai vị trí khác nhau cùng đi qua A và B. Điều này giải thích bởi tính chất nào?', 0, 'qua hai điểm phân biệt chỉ có một đường thẳng.'],
  ['Mặt nước trong bể cá và thành bể cắt nhau theo một đoạn thẳng. Điều này giải thích bởi tính chất nào?', 4, 'hai mặt phẳng phân biệt có điểm chung thì giao nhau theo một đường thẳng.']
];
const F10 = ['Có đúng một mặt phẳng đi qua ba điểm thẳng hàng phân biệt.', 'Qua hai điểm phân biệt có đúng hai đường thẳng.', 'Bốn điểm bất kì luôn cùng thuộc một mặt phẳng.', 'Hai mặt phẳng phân biệt có đúng một điểm chung.', 'Nếu một đường thẳng có đúng một điểm thuộc mặt phẳng thì đường thẳng đó nằm trong mặt phẳng.'];
const g10b = lv => {
  const [A, B, C, D] = nm(4), [P, Q] = shuffle(PL).slice(0, 2);
  if(lv === 1){
    const t = R(0, 3);
    if(t === 0) return mc10(`Có bao nhiêu đường thẳng đi qua hai điểm phân biệt ${m(A)}, ${m(B)}?`, 'Đúng một đường thẳng', ['Vô số đường thẳng', 'Hai đường thẳng', 'Không có đường thẳng nào'], 'Hai điểm phân biệt xác định một đường thẳng.', `Có một và chỉ một đường thẳng đi qua hai điểm phân biệt: ${tb('đúng một')}.`);
    if(t === 1) return mc10(`Có bao nhiêu mặt phẳng đi qua ba điểm ${m(A)}, ${m(B)}, ${m(C)} không thẳng hàng?`, 'Đúng một mặt phẳng', ['Vô số mặt phẳng', 'Hai mặt phẳng', 'Không có mặt phẳng nào'], 'Ba điểm không thẳng hàng xác định một mặt phẳng.', `Có một và chỉ một mặt phẳng đi qua ba điểm không thẳng hàng: ${tb('đúng một')}, kí hiệu ${m(`(${A + B + C})`)}.`);
    if(t === 2) return mc10(`Ba điểm ${m(A)}, ${m(B)}, ${m(C)} phân biệt và <b>thẳng hàng</b>. Có bao nhiêu mặt phẳng đi qua cả ba điểm đó?`, 'Vô số mặt phẳng', ['Đúng một mặt phẳng', 'Đúng hai mặt phẳng', 'Không có mặt phẳng nào'], 'Mọi mặt phẳng chứa đường thẳng đó đều đi qua ba điểm.', `Ba điểm thẳng hàng nằm trên một đường thẳng; có vô số mặt phẳng chứa một đường thẳng. Đáp án: ${tb('vô số')}.`);
    const k = R(0, 5), good = T10[k][0], bs = shuffle(F10).slice(0, 3);
    return mc10('Phát biểu nào sau đây là một tính chất thừa nhận (đúng) của hình học không gian?', good, bs, 'Loại các phát biểu sai: ba điểm thẳng hàng không xác định duy nhất mặt phẳng, hai điểm xác định một (không phải hai) đường thẳng…', `${tb(good)} Các phát biểu còn lại đều sai.`);
  }
  if(lv === 2){
    const t = R(0, 3);
    if(t === 0) return mc10(`Ba điểm phân biệt ${m(A)}, ${m(B)}, ${m(C)} cùng thuộc hai mặt phẳng phân biệt ${m(P.t)} và ${m(Q.t)}. Khẳng định nào đúng?`, `Ba điểm ${m(A)}, ${m(B)}, ${m(C)} thẳng hàng`, [`Ba điểm ${m(A)}, ${m(B)}, ${m(C)} không thẳng hàng`, `Hai mặt phẳng ${m(P.t)} và ${m(Q.t)} trùng nhau`, `Hai mặt phẳng ${m(P.t)} và ${m(Q.t)} không có điểm chung`],
      'Các điểm chung của hai mặt phẳng phân biệt nằm trên một đường thẳng.', `Hai mặt phẳng phân biệt có điểm chung thì các điểm chung tạo thành một đường thẳng (giao tuyến). ${m(A)}, ${m(B)}, ${m(C)} đều là điểm chung nên ${tb('thẳng hàng')}.`);
    if(t === 1){
      const n = pick([4, 5]), res = Cn(n, 3);
      return QB({text:`Cho ${n} điểm phân biệt ${n === 4 ? 'không đồng phẳng' : 'trong đó không có bốn điểm nào đồng phẳng'}. Có bao nhiêu mặt phẳng đi qua ba trong ${n} điểm đó?`, tpl:'[_]', ans:[res],
        hint: n === 4 ? 'Mỗi bộ ba điểm không thẳng hàng xác định đúng một mặt phẳng; đếm số bộ ba.' : 'Không có bốn điểm nào đồng phẳng nên ba điểm bất kì không thẳng hàng và hai bộ ba khác nhau cho hai mặt phẳng khác nhau. Đếm tổ hợp chập 3.',
        sol: n === 4 ? `Chọn 3 trong 4 điểm: ${m('C_4^3 = 4')}. Mỗi bộ ba cho một mặt phẳng, các mặt phẳng đó khác nhau (vì 4 điểm không đồng phẳng). Đáp số: ${tb(4)} (đúng như Ví dụ 1 SGK).` : `Mỗi bộ ba cho một mặt phẳng, hai bộ ba khác nhau cho hai mặt phẳng khác nhau: ${m(`C_${n}^3 = ${res}`)}. Đáp số: ${tb(res)}.`});
    }
    if(t === 2){
      const rp = pick(REALPROP), props = T10.map(x => x[1]), good = props[rp[1]], bs = shuffle(props.filter(x => x !== good)).slice(0, 3);
      return mc10(rp[0], good, bs, 'Xét xem hiện tượng nhắc đến “hai điểm”, “ba điểm” hay “hai mặt phẳng” rồi chọn tính chất tương ứng.', `Nguyên nhân: ${rp[2]} Tính chất cần dùng: ${tb(good)}.`);
    }
    return mc10(`Hai mặt phẳng phân biệt ${m(P.t)} và ${m(Q.t)} có hai điểm chung phân biệt ${m(A)}, ${m(B)}. Giao tuyến của hai mặt phẳng đó là`, `đường thẳng ${m(A + B)}`, [`đường thẳng đi qua ${m(A)} và vuông góc với ${m(P.t)}`, `đoạn thẳng ${m(A + B)} (không kéo dài)`, `điểm ${m(A)}`],
      'Hai điểm chung phân biệt xác định một đường thẳng chung.', `Giao tuyến là đường thẳng chung của hai mặt phẳng, đi qua cả hai điểm chung ${m(A)}, ${m(B)}: ${tb(`đường thẳng ${A + B}`)}.`);
  }
  const t = R(0, 3);
  if(t === 0){
    const k = R(1, 3), tr = shuffle(T10.map(x => x[0])).slice(0, k), fa = shuffle(F10).slice(0, 4 - k), sel = shuffle([...tr, ...fa]), dd = ['a)', 'b)', 'c)', 'd)'];
    return QB({text:`Cho bốn phát biểu:<br>${sel.map((x, i) => `${dd[i]} ${x}`).join('<br>')}<br>Có bao nhiêu phát biểu <b>đúng</b>?`, tpl:'[_]', ans:[k],
      hint:'Đối chiếu từng phát biểu với sáu tính chất thừa nhận của SGK.', sol:`Các phát biểu đúng là những phát biểu trùng với tính chất thừa nhận trong SGK; các phát biểu còn lại sai (ba điểm thẳng hàng không xác định mặt phẳng duy nhất, hai điểm chỉ xác định một đường thẳng…). Có ${tb(k)} phát biểu đúng.`});
  }
  if(t === 1){
    const n = pick([6, 7]), res = Cn(n, 3);
    return QB({text:`Cho ${n} điểm phân biệt, trong đó không có bốn điểm nào đồng phẳng. Có bao nhiêu mặt phẳng đi qua ba trong ${n} điểm đó?`, tpl:'[_]', ans:[res],
      hint:'Không có 4 điểm nào đồng phẳng nên mọi bộ ba đều không thẳng hàng và cho các mặt phẳng khác nhau.', sol:`${m(`C_${n}^3 = ${res}`)} bộ ba, mỗi bộ ba xác định đúng một mặt phẳng, các mặt phẳng khác nhau. Đáp số: ${tb(res)}.`});
  }
  if(t === 2){
    const n = R(6, 9), res = Cn(n, 2);
    return QB({text:`Cho ${n} điểm phân biệt, trong đó không có ba điểm nào thẳng hàng. Có bao nhiêu đường thẳng đi qua hai trong ${n} điểm đó?`, tpl:'[_]', ans:[res],
      hint:'Mỗi cặp điểm phân biệt xác định đúng một đường thẳng; không có ba điểm thẳng hàng nên các đường thẳng đó khác nhau.', sol:`${m(`C_${n}^2 = ${res}`)}. Đáp số: ${tb(res)}.`});
  }
  const [n, k] = pick([[5, 4], [6, 4], [6, 5], [7, 4]]), res = Cn(n, 3) - Cn(k, 3) + 1;
  return QB({text:`Cho ${n} điểm phân biệt, trong đó đúng ${k} điểm cùng thuộc một mặt phẳng, không có ba điểm nào thẳng hàng và không có bốn điểm nào khác đồng phẳng. Có bao nhiêu mặt phẳng đi qua ba trong ${n} điểm đó?`, tpl:'[_]', ans:[res],
    hint:'Các bộ ba chọn từ k điểm đồng phẳng đều cho cùng một mặt phẳng, chỉ tính một lần.', sol:`Tất cả ${m(`C_${n}^3 = ${Cn(n, 3)}`)} bộ ba. Trong đó ${m(`C_${k}^3 = ${Cn(k, 3)}`)} bộ ba nằm trong ${k} điểm đồng phẳng chỉ cho <b>một</b> mặt phẳng. Vậy ${m(`${Cn(n, 3)} - ${Cn(k, 3)} + 1 = ${res}`)}. Đáp số: ${tb(res)}.`});
};

/* ---------- Dạng 3. Cách xác định một mặt phẳng ---------- */
const mp10 = (...xs) => m(`\\mathrm{mp}(${xs.join(',')})`);
const fc10 = (L, i) => L.filter((_, k) => k !== i).join('');
const OK3 = [
  ['ba điểm không thẳng hàng', 'ba điểm không thẳng hàng'],
  ['một điểm và một đường thẳng không đi qua điểm đó', 'điểm và đường thẳng không chứa điểm đó'],
  ['hai đường thẳng cắt nhau', 'hai đường thẳng cắt nhau']
];
const BAD3 = ['hai điểm phân biệt', 'ba điểm thẳng hàng phân biệt', 'một đường thẳng', 'một điểm và một đường thẳng đi qua điểm đó', 'hai điểm và một đường thẳng bất kì'];
const g10c = lv => {
  const [A, B, C, D] = nm(4), d = pick(['d', 'a']), b = d === 'a' ? 'b' : 'c';
  const L = pick(SETS);
  if(lv === 1){
    const t = R(0, 3);
    if(t === 0) return mc10('Một mặt phẳng được hoàn toàn xác định khi biết nó đi qua', 'ba điểm không thẳng hàng', ['hai điểm phân biệt', 'ba điểm thẳng hàng phân biệt', 'một điểm duy nhất'], 'Dùng tính chất: có một và chỉ một mặt phẳng đi qua ba điểm không thẳng hàng.', `Mặt phẳng xác định bởi ${tb('ba điểm không thẳng hàng')}.`);
    if(t === 1) return mc10(`Mặt phẳng xác định bởi điểm ${m(A)} và đường thẳng ${m(d)} không đi qua ${m(A)} được kí hiệu là`, mp10(A, d), [m(`(${A} \\cap ${d})`), m(`${A}${d}`), m(`\\mathrm{mp}(${d})`)], 'SGK kí hiệu mp(A, d).', `Kí hiệu: ${tb(`\\mathrm{mp}(${A},${d})`)}.`);
    if(t === 2) return mc10(`Mặt phẳng xác định bởi hai đường thẳng cắt nhau ${m(d)} và ${m(b)} được kí hiệu là`, mp10(d, b), [m(`(${d} \\cup ${b})`), m(`${d}${b}`), m(`\\mathrm{mp}(${d})`)], 'SGK kí hiệu mp(a, b).', `Kí hiệu: ${tb(`\\mathrm{mp}(${d},${b})`)}.`);
    return mc10(`Mặt phẳng đi qua ba điểm ${m(A)}, ${m(B)}, ${m(C)} không thẳng hàng được kí hiệu là`, m(`(${A + B + C})`), [m(`(${A + B})`), m(`[${A + B + C}]`), m(`\\{${A},${B},${C}\\}`)], 'Viết ba chữ cái tên ba điểm trong dấu ngoặc tròn.', `Kí hiệu: ${tb(`(${A + B + C})`)}.`);
  }
  if(lv === 2){
    const t = R(0, 3);
    if(t === 0){ const g = pick(OK3)[0], bs = shuffle(BAD3).slice(0, 3); return mc10('Bộ yếu tố nào dưới đây xác định <b>đúng một</b> mặt phẳng?', g, bs, 'Có ba cách xác định mặt phẳng: ba điểm không thẳng hàng; điểm và đường thẳng không chứa điểm; hai đường thẳng cắt nhau.', `Chỉ ${tb(g)} xác định đúng một mặt phẳng; các bộ còn lại hoặc xác định vô số mặt phẳng hoặc không đủ điều kiện.`); }
    if(t === 1) return mc10(`Cho hai đường thẳng ${m(d)}, ${m(b)} cắt nhau và điểm ${m('S')} không thuộc ${mp10(d, b)}. Mặt phẳng chứa điểm ${m('S')} và đường thẳng ${m(d)} là`, mp10('S', d), [mp10(d, b), mp10('S', b), 'không xác định được'],
      'Điểm S không thuộc đường thẳng d nên S và d xác định một mặt phẳng.', `${m('S')} không nằm trên ${m(d)} (vì ${m('S')} không thuộc mặt phẳng chứa ${m(d)}), nên ${m('S')} và ${m(d)} xác định ${tb(`\\mathrm{mp}(S,${d})`)}.`);
    if(t === 2) return mc10('Để tránh va đập, người ta dùng hít cửa nam châm: khi cánh cửa bị hút vào nam châm thì cánh cửa được giữ cố định. Giải thích đúng là', 'mặt phẳng cánh cửa được xác định bởi trục bản lề (một đường thẳng cố định) và vị trí nam châm (một điểm không thuộc trục)', ['hai điểm bất kì luôn xác định một mặt phẳng', 'hai đường thẳng bất kì luôn xác định một mặt phẳng', 'ba điểm thẳng hàng luôn xác định một mặt phẳng'],
      'Trục bản lề là một đường thẳng; nam châm là một điểm không nằm trên trục.', `Đường thẳng (trục bản lề) và điểm không thuộc nó xác định đúng một mặt phẳng, nên cánh cửa không xoay được nữa. Đáp án: ${tb('đường thẳng và điểm không thuộc nó xác định một mặt phẳng')}.`);
    const f = tetFig(L), [v, x, y, z] = L, pairs = [[v, x, y], [v, x, z], [v, y, z], [x, y, z]], [p, q, r] = pairs[R(0, 2)];
    return mc10(`Cho tứ diện ${m(L.join(''))}. Mặt phẳng chứa điểm ${m(p)} và đường thẳng ${m(q + r)} là`, m(`(${p + q + r})`), pairs.filter(e => e.join('') !== [p, q, r].join('') ).slice(0, 3).map(e => m(`(${e.join('')})`)),
      'Điểm và đường thẳng không chứa điểm đó xác định một mặt phẳng; viết tên ba điểm.', `${m(p)} không thuộc ${m(q + r)} nên mặt phẳng cần tìm là ${tb(`(${p + q + r})`)}.`, f);
  }
  const t = R(0, 3);
  if(t === 0){
    const [v, x, y, z] = L, f = tetFig(L, {pts:{K:mid(TET0[2], TET0[3])}});
    return mc10(`Cho tứ diện ${m(L.join(''))}, gọi ${m('K')} là trung điểm của ${m(y + z)}. Mặt phẳng đi qua ba điểm ${m(v)}, ${m(x)}, ${m('K')} là`, m(`(${v + x}K)`), [m(`(${v + x + y})`), m(`(${v + x + z})`), m(`(${v + y + z})`)],
      'Ba điểm V, X, K có thẳng hàng không? Điểm K nằm trên cạnh nào?', `${m(v)}, ${m(x)}, ${m('K')} không thẳng hàng (vì ${m('K')} nằm trên ${m(y + z)}, không nằm trên ${m(v + x)}) nên xác định đúng một mặt phẳng ${tb(`(${v + x}K)`)}. Mặt phẳng này không phải ${m(`(${v + x + y})`)} hay ${m(`(${v + x + z})`)} vì ${m('K')} không thuộc hai mặt phẳng đó.`, f);
  }
  if(t === 1){
    const n = R(3, 5);
    return QB({text:`Trên đường thẳng ${m(d)} lấy ${n} điểm phân biệt và lấy điểm ${m('S')} không thuộc ${m(d)}. Có bao nhiêu mặt phẳng đi qua ${m('S')} và hai trong ${n} điểm đó?`, tpl:'[_]', ans:[1],
      hint:'Mọi bộ ba (S và hai điểm trên d) đều xác định mặt phẳng chứa S và đường thẳng d.', sol:`Hai điểm trên ${m(d)} cùng với ${m('S')} xác định mặt phẳng chứa ${m(d)} và ${m('S')}; mặt phẳng ${mp10('S', d)} là duy nhất. Đáp số: ${tb(1)}.`});
  }
  if(t === 2){
    const [a, b2] = pick([['a', 'b'], ['d', 'd\'']]), S = 'S', M = pick(['M', 'O', 'I']);
    return QS({text:`Cho hai đường thẳng ${m(a)}, ${m(b2)} cắt nhau tại ${m(M)} và điểm ${m(S)} không thuộc ${mp10(a, b2)}. Xác định giao tuyến của ${mp10(S, a)} và ${mp10(S, b2)}.`, direct:true,
      hint:'Giao tuyến của hai mặt phẳng phân biệt là đường thẳng qua hai điểm chung.', sol:`${m(M)} thuộc ${m(a)} nên thuộc ${mp10(S, a)}; ${m(M)} thuộc ${m(b2)} nên thuộc ${mp10(S, b2)}. ${m(S)} cũng là điểm chung. Hai điểm chung phân biệt ${m(S)}, ${m(M)} nên giao tuyến là ${tb(`${S}${M}`)}.`,
      steps:[
        {tag:'Kế hoạch', ask:'Muốn tìm giao tuyến của hai mặt phẳng phân biệt, ta cần tìm', opts:['hai điểm chung phân biệt của chúng', 'hai đường thẳng song song nằm trong chúng', 'một điểm không thuộc mặt phẳng nào'], ans:'hai điểm chung phân biệt của chúng', hint:'Hai điểm chung xác định một đường thẳng chung.'},
        {tag:'Giải', ask:`Điểm chung thứ nhất của ${mp10(S, a)} và ${mp10(S, b2)} là`, opts:[m(S), m(M) + ' (chỉ thuộc ' + m(a) + ')', 'không có'], ans:m(S), hint:'Điểm S có thuộc cả hai mặt phẳng?'},
        {tag:'Giải', ask:`${m(M)} là giao điểm của ${m(a)} và ${m(b2)}. Điểm ${m(M)} thuộc mặt phẳng nào?`, opts:['cả hai mặt phẳng', `chỉ ${mp10(S, a)}`, `chỉ ${mp10(S, b2)}`], ans:'cả hai mặt phẳng', hint:`${m(M)} thuộc ${m(a)} và cũng thuộc ${m(b2)}.`},
        {tag:'Đáp số', ask:'Giao tuyến của hai mặt phẳng là đường thẳng', opts:[m(`${S}${M}`), m(`${a}`), m(`${b2}`), m(`${S}${a}`)], ans:m(`${S}${M}`), hint:'Đường thẳng đi qua hai điểm chung S và M.'}]});
  }
  const k = pick([1, 2]), [v, x, y, z] = L;
  if(k === 2) return QB({text:`Cho tứ diện ${m(L.join(''))}. Có bao nhiêu mặt phẳng chứa đường thẳng ${m(v + x)} và đi qua ít nhất một trong hai điểm ${m(y)}, ${m(z)}?`, tpl:'[_]', ans:[2], fig:tetFig(L),
    hint:`Mặt phẳng chứa ${v + x} và điểm ${y} là một; mặt phẳng chứa ${v + x} và điểm ${z} là một; xem hai mặt phẳng đó có trùng không.`, sol:`Hai mặt phẳng ${m(`(${v + x + y})`)} và ${m(`(${v + x + z})`)} là hai mặt phẳng phân biệt (vì bốn điểm ${m(L.join(','))} không đồng phẳng). Đáp số: ${tb(2)}.`});
  return QB({text:`Cho tứ diện ${m(L.join(''))} và điểm ${m('K')} thuộc cạnh ${m(y + z)} (${m('K')} khác ${m(y)}, ${m(z)}). Có bao nhiêu mặt phẳng chứa đường thẳng ${m(v + x)} và đi qua điểm ${m('K')}?`, tpl:'[_]', ans:[1], fig:tetFig(L, {pts:{K:mid(TET0[2], TET0[3])}}),
    hint:`${m(v + x)} là đường thẳng, ${m('K')} là điểm không thuộc nó: một đường thẳng và một điểm ngoài xác định mấy mặt phẳng?`, sol:`${m('K')} không thuộc ${m(v + x)}, nên đường thẳng ${m(v + x)} và điểm ${m('K')} xác định đúng một mặt phẳng ${m(`(${v + x}K)`)}. Đáp số: ${tb(1)}.`});
};

/* ---------- Dạng 4. Giao tuyến của hai mặt phẳng ---------- */
const PYL = [['S', 'A', 'B', 'C', 'D'], ['S', 'E', 'F', 'G', 'H'], ['S', 'M', 'N', 'P', 'Q']];
const edgesOf = L => { const r = []; for(let i = 0; i < L.length; i++) for(let j = i + 1; j < L.length; j++) r.push(L[i] + L[j]); return r; };
const g10d = lv => {
  if(lv === 1){
    const t = R(0, 2);
    if(t === 0){
      const L = pick(SETS), [i, j] = shuffle([0, 1, 2, 3]).slice(0, 2), rest = L.filter((_, k) => k !== i && k !== j), good = rest.join('');
      const bads = shuffle(edgesOf(L).filter(e => e !== good)).slice(0, 3);
      return mc10(`Cho tứ diện ${m(L.join(''))}. Giao tuyến của hai mặt phẳng ${m(`(${fc10(L, i)})`)} và ${m(`(${fc10(L, j)})`)} là đường thẳng`, m(good), bads.map(e => m(e)),
        'Tìm hai đỉnh nằm trong cả hai mặt: hai điểm chung xác định giao tuyến.', `${m(`(${fc10(L, i)})`)} chứa các đỉnh ${m(fc10(L, i).split('').join(','))}; ${m(`(${fc10(L, j)})`)} chứa ${m(fc10(L, j).split('').join(','))}. Hai đỉnh chung là ${m(rest[0])}, ${m(rest[1])}, nên giao tuyến là ${tb(good)}.`, tetFig(L));
    }
    const L = pick(PYL), [s, a, b, c, d] = L;
    if(t === 1){
      const lat = [[a, b], [b, c], [c, d], [d, a]], i = R(0, 3), f1 = lat[i], f2 = lat[(i + 1) % 4], good = s + f1[1];
      return mc10(`Cho hình chóp ${m(`${s}.${a + b + c + d}`)}. Giao tuyến của hai mặt phẳng ${m(`(${s + f1.join('')})`)} và ${m(`(${s + f2.join('')})`)} là đường thẳng`, m(good), [s + a, s + b, s + c, s + d].filter(e => e !== good).map(e => m(e)),
        'Hai mặt bên kề nhau cùng chứa đỉnh S và cùng chứa một cạnh bên.', `Hai mặt bên có chung đỉnh ${m(s)} và chung đỉnh ${m(f1[1])}, nên giao tuyến là cạnh bên ${tb(good)}.`, pyFig(L));
    }
    const lat = [[a, b], [b, c], [c, d], [d, a]], i = R(0, 3), good = lat[i].join('');
    return mc10(`Cho hình chóp ${m(`${s}.${a + b + c + d}`)}. Giao tuyến của mặt bên ${m(`(${s + good})`)} và mặt đáy ${m(`(${a + b + c + d})`)} là đường thẳng`, m(good), shuffle([...lat.map(x => x.join('')).filter(x => x !== good), a + c]).slice(0, 3).map(e => m(e)),
      'Mặt bên và mặt đáy có chung hai đỉnh của đáy.', `Hai mặt phẳng có chung hai điểm ${m(lat[i][0])}, ${m(lat[i][1])} nên giao tuyến là cạnh đáy ${tb(good)}.`, pyFig(L));
  }
  if(lv === 2){
    const t = R(0, 2);
    if(t === 0 || t === 1){
      if(t === 0){
        const L = pick(SETS), i = R(0, 3), P = L[i], others = L.filter((_, k) => k !== i), z = pick(others), [x, y] = others.filter(c => c !== z);
        const coord = c => TET0[L.indexOf(c)], K = 'K';
        return mc10(`Cho tứ diện ${m(L.join(''))}, ${m(K)} là trung điểm của ${m(x + y)}. Giao tuyến của hai mặt phẳng ${m(`(${P + z}${K})`)} và ${m(`(${P + x + y})`)} là đường thẳng`, m(P + K), [m(P + z), m(z + K), m(x + y)],
          'Tìm hai điểm chung của hai mặt phẳng: một đỉnh của tứ diện và điểm K.', `${m(P)} thuộc cả hai mặt phẳng. ${m(K)} thuộc ${m(`(${P + z}${K})`)} và ${m(K)} nằm trên ${m(x + y)} ⊂ ${m(`(${P + x + y})`)}. Hai điểm chung ${m(P)}, ${m(K)} nên giao tuyến là ${tb(P + K)}.`,
          tetFig(L, {pts:{K:mid(coord(x), coord(y))}, d:[[z, K]]}));
      }
      const L = pick(PYL), [s, a, b, c, d] = L, O = ix(PY0[1], PY0[3], PY0[2], PY0[4]);
      const cas = pick([[`(${s + a + c})`, `(${s + b + d})`, s + 'O', 'Hai mặt phẳng cùng chứa đỉnh S và điểm O (O là giao điểm hai đường chéo của đáy).'], [`(${s + a + c})`, `(${a + b + c + d})`, a + c, 'Hai mặt phẳng cùng chứa A và C.'], [`(${s + b + d})`, `(${a + b + c + d})`, b + d, 'Hai mặt phẳng cùng chứa B và D.']]);
      const good = cas[2];
      return mc10(`Cho hình chóp ${m(`${s}.${a + b + c + d}`)} có đáy là tứ giác lồi; hai đường chéo ${m(a + c)} và ${m(b + d)} cắt nhau tại ${m('O')}. Giao tuyến của hai mặt phẳng ${m(cas[0])} và ${m(cas[1])} là đường thẳng`, m(good), [s + 'O', a + c, b + d, s + a, s + c].filter(e => e !== good).slice(0, 3).map(e => m(e)),
        'Tìm hai điểm chung phân biệt của hai mặt phẳng.', `${cas[3]} Vậy giao tuyến là ${tb(good)}.`, pyFig(L, {pts:{O}, d:[[a, c], [b, d]]}));
    }
    const L = pick(SETS), [v, x, y, z] = L, K = 'K', I = 'I';
    return mc10(`Cho tứ diện ${m(L.join(''))}; ${m(K)} thuộc cạnh ${m(v + x)}, ${m(I)} thuộc cạnh ${m(v + y)}. Giao tuyến của hai mặt phẳng ${m(`(${z + K + I})`)} và ${m(`(${v + x + y})`)} là đường thẳng`, m(K + I), [m(z + K), m(x + y), m(v + z)],
      'Tìm hai điểm vừa thuộc mặt phẳng thứ nhất vừa thuộc mặt phẳng thứ hai.',
      `${m(K)}, ${m(I)} thuộc ${m(`(${z + K + I})`)}; đồng thời ${m(K)} nằm trên ${m(v + x)} và ${m(I)} nằm trên ${m(v + y)} nên cùng thuộc ${m(`(${v + x + y})`)}. Giao tuyến là ${tb(K + I)}.`,
      tetFig(L, {pts:{K:mid(TET0[0], TET0[1], .45), I:mid(TET0[0], TET0[2], .45)}, d:[[z, K], [z, I]]}));
  }
  const t = R(0, 2);
  if(t === 0){
    const M = mid(TET0[1], TET0[2]), N = mid(TET0[2], TET0[3]), Gp = [(TET0[1][0] + TET0[2][0] + TET0[3][0]) / 3, (TET0[1][1] + TET0[2][1] + TET0[3][1]) / 3];
    const f = tetFig(['S', 'B', 'A', 'C'], {pts:{M, N, G:Gp}, d:[['B', 'N'], ['C', 'M']], off:{G:[0, 16], N:[16, 6], M:[-16, 6]}});
    return QS({text:`Cho tam giác ${m('ABC')} và điểm ${m('S')} không thuộc mặt phẳng ${m('(ABC)')}. Gọi ${m('M')}, ${m('N')} lần lượt là trung điểm của ${m('AB')}, ${m('AC')}. Xác định giao tuyến của hai mặt phẳng ${m('(SBN)')} và ${m('(SCM)')}; giao tuyến đó có đi qua trọng tâm của tam giác ${m('ABC')} không?`, fig:f, direct:true,
      hint:'Hai trung tuyến BN và CM cắt nhau tại trọng tâm G của tam giác ABC.', sol:`${m('BN')} và ${m('CM')} là hai trung tuyến của tam giác ${m('ABC')} nên cắt nhau tại trọng tâm ${m('G')}. ${m('G')} thuộc ${m('BN')} ⊂ ${m('(SBN)')} và thuộc ${m('CM')} ⊂ ${m('(SCM)')}; ${m('S')} cũng là điểm chung. Giao tuyến là ${tb('SG')}, đi qua trọng tâm ${m('G')} của tam giác ${m('ABC')}.`,
      steps:[
        {tag:'Kế hoạch', ask:'Để tìm giao tuyến của hai mặt phẳng, ta tìm', opts:['hai điểm chung phân biệt', 'hai đường thẳng song song', 'hai mặt phẳng phụ'], ans:'hai điểm chung phân biệt', hint:'Giao tuyến đi qua mọi điểm chung.'},
        {tag:'Giải', ask:`Điểm chung của hai mặt phẳng, ngoài ${m('S')}, là`, opts:[m('G') + ' (giao của BN và CM)', m('M'), m('N'), m('A')], ans:m('G') + ' (giao của BN và CM)', hint:'G thuộc BN và thuộc CM.'},
        {tag:'Giải', ask:'Giao tuyến của hai mặt phẳng là đường thẳng', opts:[m('SG'), m('SM'), m('SN'), m('BC')], ans:m('SG'), hint:'Đường thẳng qua hai điểm chung S và G.'},
        {tag:'Đáp số', ask:`Giao tuyến ${m('SG')} có đi qua trọng tâm tam giác ${m('ABC')} không?`, opts:[`Có, vì ${m('G')} chính là trọng tâm`, `Không, vì ${m('G')} khác trọng tâm`, 'Không kết luận được'], ans:`Có, vì ${m('G')} chính là trọng tâm`, hint:'Hai trung tuyến cắt nhau tại trọng tâm.'}]});
  }
  if(t === 1){
    const A = [60, 150], B = [150, 153], C = [260, 128], D = [200, 100], S = [150, 15], E = ix(A, B, D, C);
    e10(E[0] < 350 && E[1] < 205, 'E ngoài khung');
    const f = spaceSVG({pts:{S, A, B, C, D, E}, w:360, ht:200, s:[['S', 'A'], ['S', 'B'], ['S', 'C'], ['A', 'B'], ['B', 'C']], d:[['S', 'D'], ['A', 'D'], ['C', 'D'], ['B', 'E'], ['C', 'E']].map(e => e), aria:'Hình chóp có AB cắt CD tại E',
      off:{E:[15, 0], D:[10, -12]}});
    return mc10(`Cho hình chóp ${m('S.ABCD')} có đáy là tứ giác lồi; hai đường thẳng ${m('AB')} và ${m('CD')} cắt nhau tại ${m('E')}. Giao tuyến của hai mặt phẳng ${m('(SAB)')} và ${m('(SCD)')} là đường thẳng`, m('SE'), [m('SA'), m('SC'), m('AD')],
      'E thuộc AB và thuộc CD: xem E nằm trong những mặt phẳng nào.', `${m('E')} thuộc ${m('AB')} ⊂ ${m('(SAB)')} và thuộc ${m('CD')} ⊂ ${m('(SCD)')}; ${m('S')} cũng thuộc cả hai mặt phẳng. Giao tuyến là ${tb('SE')}.`, f);
  }
  const L = pick(['ABCD', 'SABC'].map(s => s.split(''))), [v, x, y, z] = L, E = 'E', F = 'F', M = 'M', N = 'N';
  const Ep = [.3 * TET0[1][0] + .35 * TET0[2][0] + .35 * TET0[3][0], .3 * TET0[1][1] + .35 * TET0[2][1] + .35 * TET0[3][1]];
  const Mp = ix(TET0[1], Ep, TET0[2], TET0[3]), Fp = mid(TET0[0], Ep, .55), Np = ix(TET0[1], Fp, TET0[0], Mp);
  const f = tetFig(L, {pts:{E:Ep, F:Fp, M:Mp, N:Np}, s:[[v, M]], d:[[x, M], [v, E], [x, N]], off:{E:[0, 15], F:[-12, 0], M:[14, 8], N:[14, -4]}});
  return QS({text:`Cho tứ diện ${m(L.join(''))}, ${m(E)} là một điểm nằm trong tam giác ${m(x + y + z)}, ${m(F)} là một điểm nằm giữa ${m(v)} và ${m(E)}. Xác định giao điểm của đường thẳng ${m(x + F)} và mặt phẳng ${m(`(${v + y + z})`)}.`, fig:f, direct:true,
    hint:`Đưa về giao điểm của ${x + F} với một đường thẳng nằm trong (${v + y + z}): dùng mặt phẳng phụ chứa ${x + F}.`, sol:`${m(x + E)} cắt ${m(y + z)} tại ${m(M)}. ${m(v)}, ${m(E)}, ${m(x)}, ${m(M)} cùng thuộc ${m(`(${v + x}${M})`)} nên ${m(F)} ∈ ${m(`(${v + x}${M})`)}. Trong ${m(`(${v + x}${M})`)}: ${m(x + F)} cắt ${m(v + M)} tại ${m(N)}. ${m(v + M)} ⊂ ${m(`(${v + y + z})`)} nên ${m(N)} ∈ ${m(`(${v + y + z})`)}. Vậy ${tb(`${N} = ${x}${F} \\cap (${v + y + z})`)}.`,
    steps:[
      {tag:'Kế hoạch', ask:`Gọi ${m(M)} là giao điểm của ${m(x + E)} và ${m(y + z)}. Đường thẳng ${m(x + F)} nằm trong mặt phẳng nào?`, opts:[m(`(${v + x}${M})`), m(`(${v + y + z})`), m(`(${x + y + z})`), m(`(${v + x + y})`)], ans:m(`(${v + x}${M})`), hint:`${F} thuộc ${v}${E}; ${v}, ${E} thuộc mặt phẳng nào chứa ${x} và ${M}?`},
      {tag:'Giải', ask:`Trong ${m(`(${v + x}${M})`)}, ${m(x + F)} cắt ${m(v + M)} tại ${m(N)}. ${m(N)} thuộc đường thẳng nào nằm trong ${m(`(${v + y + z})`)}?`, opts:[m(v + M), m(x + M), m(v + x), m(x + F)], ans:m(v + M), hint:`${v + M} có hai điểm ${v} và ${M} cùng thuộc (${v + y + z}).`},
      {tag:'Đáp số', ask:`Giao điểm của ${m(x + F)} và ${m(`(${v + y + z})`)} là`, opts:[m(N), m(M), m(E), m(F)], ans:m(N), hint:`Điểm vừa thuộc ${x + F} vừa thuộc ${v + M} ⊂ (${v + y + z}).`}]});
};

/* ---------- Dạng 5. Hình chóp và tứ diện ---------- */
const NG = ['tam giác', 'tứ giác', 'ngũ giác', 'lục giác', 'thất giác', 'bát giác', 'cửu giác', 'thập giác'];
const g10e = lv => {
  if(lv === 1){
    const t = R(0, 3), n = R(3, 8);
    if(t === 0) return QB({text:`Một hình chóp có đáy là ${NG[n - 3]}. Hình chóp đó có tất cả bao nhiêu mặt (kể cả mặt đáy)?`, tpl:'[_] mặt', ans:[n + 1], hint:'Đếm các mặt bên rồi cộng thêm mặt đáy.', sol:`Có ${n} mặt bên và 1 mặt đáy, tổng cộng ${n} + 1 = ${tb(n + 1)} mặt.`});
    if(t === 1) return QB({text:`Hình chóp ${m(`S.A_1A_2\\dots A_{${n}}`)} có đáy là đa giác ${n} cạnh. Hình chóp có bao nhiêu cạnh bên?`, tpl:'[_] cạnh bên', ans:[n], hint:'Mỗi đỉnh của đáy nối với đỉnh S bởi một cạnh bên.', sol:`Mỗi đỉnh của đa giác đáy nối với ${m('S')} bằng một cạnh bên, nên có ${tb(n)} cạnh bên.`});
    if(t === 2) return QB({text:`Hình chóp có đáy là ${NG[n - 3]} có tất cả bao nhiêu cạnh (cạnh bên và cạnh đáy)?`, tpl:'[_] cạnh', ans:[2 * n], hint:'Đáy có n cạnh, mặt bên có n cạnh bên.', sol:`Đáy có ${n} cạnh, có thêm ${n} cạnh bên: ${n} + ${n} = ${tb(2 * n)} cạnh.`});
    const L = pick(SETS);
    return mc10(`Tứ diện ${m(L.join(''))} có bao nhiêu mặt, bao nhiêu cạnh, bao nhiêu đỉnh?`, '4 mặt, 6 cạnh, 4 đỉnh', ['4 mặt, 4 cạnh, 6 đỉnh', '6 mặt, 4 cạnh, 4 đỉnh', '4 mặt, 8 cạnh, 5 đỉnh'], 'Tứ diện có 4 đỉnh, mỗi hai đỉnh nối bởi một cạnh, mỗi bộ ba đỉnh tạo một mặt.', `Tứ diện có ${tb('4 đỉnh')}; số cạnh là ${m('C_4^2 = 6')}; số mặt là ${m('C_4^3 = 4')}. Chọn ${tb('4 mặt, 6 cạnh, 4 đỉnh')}.`, tetFig(L));
  }
  if(lv === 2){
    const t = R(0, 3), n = R(4, 9);
    if(t === 0) return QB({text:`Một hình chóp có ${n + 1} mặt (kể cả mặt đáy). Đáy của hình chóp là đa giác có bao nhiêu cạnh?`, tpl:'[_] cạnh', ans:[n], hint:'Số mặt = số cạnh đáy + 1.', sol:`Số mặt = số cạnh đáy + 1 nên số cạnh đáy là ${n + 1} − 1 = ${tb(n)}.`});
    if(t === 1) return QB({text:`Một hình chóp có ${2 * n} cạnh (kể cả cạnh đáy). Hình chóp đó có bao nhiêu mặt bên?`, tpl:'[_] mặt bên', ans:[n], hint:'Số cạnh = 2 × số cạnh đáy; số mặt bên bằng số cạnh đáy.', sol:`Số cạnh = 2 × (số cạnh đáy) nên đáy có ${2 * n} : 2 = ${n} cạnh, do đó có ${tb(n)} mặt bên.`});
    if(t === 2){
      const L = pick(SETS), i = R(0, 3), j = (i + R(1, 3)) % 4, rest = L.filter((_, k) => k !== i && k !== j), e = L[i] + L[j], op = rest.join('');
      return mc10(`Trong tứ diện ${m(L.join(''))}, cạnh đối diện với cạnh ${m(e)} là`, m(op), [m(L[i] + rest[0]), m(L[j] + rest[1]), m(e)],
        'Hai cạnh đối diện không có đỉnh chung.', `Cạnh đối diện với ${m(e)} là cạnh không có đỉnh chung với nó, tức là ${tb(op)}.`, tetFig(L));
    }
    const L = pick(SETS), i = R(0, 3), v = L[i], f = fc10(L, i);
    return mc10(`Trong tứ diện ${m(L.join(''))}, mặt phẳng đối diện với đỉnh ${m(v)} (không chứa ${m(v)}) là`, m(`(${f})`), [0, 1, 2, 3].filter(k => k !== i).map(k => m(`(${fc10(L, k)})`)),
      'Mặt đối diện với một đỉnh là mặt tạo bởi ba đỉnh còn lại.', `Mặt đối diện với ${m(v)} là mặt tạo bởi ba đỉnh còn lại: ${tb(`(${f})`)}.`, tetFig(L));
  }
  const t = R(0, 2), n = R(4, 9);
  if(t === 0){ const S = 3 * n + 1; return QB({text:`Một hình chóp có tổng số mặt và số cạnh (kể cả cạnh đáy) bằng ${S}. Hỏi đáy của hình chóp là đa giác có bao nhiêu cạnh?`, tpl:'[_] cạnh', ans:[n], hint:'Đặt n là số cạnh đáy: số mặt n + 1, số cạnh 2n.', sol:`Gọi ${m('n')} là số cạnh đáy: số mặt là ${m('n + 1')}, số cạnh là ${m('2n')}. Ta có ${m(`(n + 1) + 2n = ${S}`)} nên ${m(`3n = ${S - 1}`)}, ${tb(`n = ${n}`)}.`}); }
  if(t === 1) return QB({text:`Cho hình chóp có đáy là ${NG[n - 3]} ${m(`A_1A_2\\dots A_{${n}}`)} và đỉnh ${m('S')}. Có bao nhiêu mặt phẳng phân biệt đi qua ${m('S')} và <b>hai đỉnh</b> bất kì của đáy?`, tpl:'[_] mặt phẳng', ans:[Cn(n, 2)],
    hint:'Điểm S không thuộc mặt đáy nên S cùng hai đỉnh đáy xác định đúng một mặt phẳng; đếm số cách chọn hai đỉnh.', sol:`Mỗi cặp đỉnh đáy cùng với ${m('S')} (không thẳng hàng) xác định một mặt phẳng, các cặp khác nhau cho mặt phẳng khác nhau. Số cách chọn: ${m(`C_{${n}}^2 = ${Cn(n, 2)}`)}. Đáp số ${tb(Cn(n, 2))}.`});
  return QB({text:`Một hình chóp có số cạnh bên cộng số mặt bên bằng ${2 * n}. Hình chóp đó có tất cả bao nhiêu đỉnh (kể cả đỉnh chóp)?`, tpl:'[_] đỉnh', ans:[n + 1], hint:'Số cạnh bên bằng số mặt bên bằng số cạnh đáy; số đỉnh = số đỉnh đáy + 1.', sol:`Số cạnh bên = số mặt bên = số cạnh đáy ${m('n')}, nên ${m(`2n = ${2 * n}`)}, ${m(`n = ${n}`)}. Số đỉnh là ${n} + 1 = ${tb(n + 1)}.`});
};

/* ---------- Dạng 6. Giao điểm của đường thẳng và mặt phẳng ---------- */
const qfig = () => {
  const A = [60, 150], B = [150, 153], C = [260, 128], D = [200, 100], S = [150, 15], E = ix(A, B, D, C);
  return spaceSVG({pts:{S, A, B, C, D, E}, w:360, ht:200, s:[['S', 'A'], ['S', 'B'], ['S', 'C'], ['A', 'B'], ['B', 'C']], d:[['S', 'D'], ['A', 'D'], ['C', 'D'], ['B', 'E'], ['C', 'E']], aria:'Hình chóp có AB cắt CD tại E', off:{E:[15, 0], D:[10, -12]}});
};
const g10f = lv => {
  if(lv === 1){
    const t = R(0, 2);
    if(t === 0){
      const L = pick(SETS), [v, x, y, z] = L, K = 'K';
      return mc10(`Cho tứ diện ${m(L.join(''))}, điểm ${m(K)} thuộc cạnh ${m(x + y)} (${m(K)} khác ${m(x)}, ${m(y)}). Giao điểm của đường thẳng ${m(z + K)} và mặt phẳng ${m(`(${v + x + y})`)} là`, m(K), [m(z), m(v), m(x)],
        `Đường thẳng ${z + K} có điểm nào thuộc mặt phẳng (${v + x + y})?`, `${m(K)} thuộc ${m(z + K)} và ${m(K)} thuộc ${m(x + y)} ⊂ ${m(`(${v + x + y})`)}. Vì ${m(z)} không thuộc ${m(`(${v + x + y})`)} nên ${m(z + K)} cắt mặt phẳng tại ${tb(K)}.`,
        tetFig(L, {pts:{K:mid(TET0[1], TET0[2], .4)}, d:[[z, K]]}));
    }
    if(t === 1){
      const L = pick(PYL), [s, a, b, c, d] = L, O = ix(PY0[1], PY0[3], PY0[2], PY0[4]);
      return mc10(`Cho hình chóp ${m(`${s}.${a + b + c + d}`)} có đáy là tứ giác lồi, hai đường chéo ${m(a + c)} và ${m(b + d)} cắt nhau tại ${m('O')}. Giao điểm của ${m(s + 'O')} và mặt phẳng ${m(`(${a + b + c + d})`)} là`, m('O'), [m(a), m(s), m(b)],
        `${s}O cắt mặt phẳng đáy ở điểm nào của đường thẳng đáy?`, `${m('O')} thuộc ${m(a + c)} ⊂ ${m(`(${a + b + c + d})`)} và ${m('O')} thuộc ${m(s + 'O')}. Vì ${m(s)} không thuộc mặt đáy nên giao điểm là ${tb('O')}.`, pyFig(L, {pts:{O}, d:[[a, c], [b, d], [s, 'O']]}));
    }
    const L = pick(SETS), [v, x, y, z] = L, I = 'I';
    return mc10(`Cho tứ diện ${m(L.join(''))}, điểm ${m(I)} thuộc cạnh ${m(v + y)} (${m(I)} khác ${m(v)}, ${m(y)}). Giao điểm của đường thẳng ${m(x + I)} và mặt phẳng ${m(`(${v + y + z})`)} là`, m(I), [m(x), m(v), m(z)],
      `Điểm ${I} nằm trên cạnh nào của mặt phẳng (${v + y + z})?`, `${m(I)} thuộc ${m(v + y)} ⊂ ${m(`(${v + y + z})`)} và ${m(I)} thuộc ${m(x + I)}. Vậy giao điểm là ${tb(I)}.`, tetFig(L, {pts:{I:mid(TET0[0], TET0[2], .45)}, d:[[x, I]]}));
  }
  if(lv === 2){
    const t = R(0, 3), L = pick(PYL), [s, a, b, c, d] = L, O = ix(PY0[1], PY0[3], PY0[2], PY0[4]);
    const cs = [[`đường thẳng ${m(a + c)} và mặt phẳng ${m(`(${s + b + d})`)}`, 'AC và (SBD)', 'O', [a, c, d].map(x => m(x))],
      [`đường thẳng ${m(b + d)} và mặt phẳng ${m(`(${s + a + c})`)}`, 'BD và (SAC)', 'O', [b, d, s].map(x => m(x))]];
    if(t < 2){
      const k = cs[t];
      return mc10(`Cho hình chóp ${m(`${s}.${a + b + c + d}`)} có đáy là tứ giác lồi, hai đường chéo ${m(a + c)} và ${m(b + d)} cắt nhau tại ${m('O')}. Giao điểm của ${k[0]} là`, m('O'), k[3],
        'Hai đường chéo cắt nhau tại O; O thuộc cả hai đường chéo.', `${m('O')} thuộc ${t === 0 ? m(a + c) : m(b + d)}, và ${m('O')} thuộc ${t === 0 ? m(b + d) : m(a + c)} ⊂ ${t === 0 ? m(`(${s + b + d})`) : m(`(${s + a + c})`)}. Vậy giao điểm là ${tb('O')}.`, pyFig(L, {pts:{O}, d:[[a, c], [b, d]]}));
    }
    if(t === 2) return mc10(`Cho hình chóp ${m('S.ABCD')} có đáy là tứ giác lồi; hai đường thẳng ${m('AB')} và ${m('CD')} cắt nhau tại ${m('E')}. Giao điểm của đường thẳng ${m('AB')} và mặt phẳng ${m('(SCD)')} là`, m('E'), [m('S'), m('C'), m('D')],
      'Tìm điểm của AB nằm trên một đường thẳng của mặt phẳng (SCD).', `${m('E')} thuộc ${m('AB')}; đồng thời ${m('E')} thuộc ${m('CD')} ⊂ ${m('(SCD)')}. Vậy ${tb('E')} là giao điểm của ${m('AB')} và ${m('(SCD)')}.`, qfig());
    return mc10(`Cho hình chóp ${m('S.ABCD')} có đáy là tứ giác lồi; hai đường thẳng ${m('AB')} và ${m('CD')} cắt nhau tại ${m('E')}. Giao điểm của đường thẳng ${m('CD')} và mặt phẳng ${m('(SAB)')} là`, m('E'), [m('S'), m('A'), m('B')],
      'Tìm điểm của CD nằm trên một đường thẳng của mặt phẳng (SAB).', `${m('E')} thuộc ${m('CD')}; đồng thời ${m('E')} thuộc ${m('AB')} ⊂ ${m('(SAB)')}. Vậy ${tb('E')} là giao điểm của ${m('CD')} và ${m('(SAB)')}.`, qfig());
  }
  /* mức 3: chóp S.ABCD, M thuộc SA, giao điểm của SC và (MBD) */
  const L = pick(PYL), [s, a, b, c, d] = L, M = 'K', N = 'I', O = ix(PY0[1], PY0[3], PY0[2], PY0[4]);
  const Mp = mid(PY0[0], PY0[1], .9), Np = ix(Mp, O, PY0[0], PY0[3]);
  e10(Np[0] > 0 && Np[0] < 340 && Np[1] < 212 && Np[1] > -10, 'N ngoài khung: ' + Np);
  const f = pyFig(L, {pts:{[M]:Mp, O, [N]:Np}, d:[[a, c], [b, d], [M, b], [M, d], [M, 'O']], s:[[c, N]], off:{[N]:[14, 10]}});
  return QS({text:`Cho hình chóp ${m(`${s}.${a + b + c + d}`)} có đáy là tứ giác lồi, hai đường chéo ${m(a + c)} và ${m(b + d)} cắt nhau tại ${m('O')}. Điểm ${m(M)} thuộc cạnh ${m(s + a)} (${m(M)} khác ${m(s)}, ${m(a)}). Tìm giao điểm của đường thẳng ${m(s + c)} và mặt phẳng ${m(`(${M + b + d})`)}.`, fig:f, direct:true,
    hint:`Dùng mặt phẳng phụ (${s + a + c}) chứa ${s + c}: tìm giao tuyến của nó với (${M + b + d}).`,
    sol:`Chọn mặt phẳng phụ ${m(`(${s + a + c})`)} chứa ${m(s + c)}. ${m('O')} thuộc ${m(b + d)} ⊂ ${m(`(${M + b + d})`)} và ${m('O')} thuộc ${m(a + c)} ⊂ ${m(`(${s + a + c})`)}; ${m(M)} cũng thuộc hai mặt phẳng này. Do đó ${m(`(${M + b + d}) \\cap (${s + a + c}) = ${M}O`)}. Trong ${m(`(${s + a + c})`)}, ${m(M + 'O')} cắt ${m(s + c)} tại ${m(N)}. Vậy ${tb(`${N} = ${s + c} \\cap (${M + b + d})`)}.`,
    steps:[
      {tag:'Kế hoạch', ask:`Chọn mặt phẳng phụ chứa ${m(s + c)} là`, opts:[m(`(${s + a + c})`), m(`(${s + b + d})`), m(`(${a + b + c + d})`), m(`(${s + a + b})`)], ans:m(`(${s + a + c})`), hint:`Mặt phẳng chứa ${s}, ${c} và cắt (${M + b + d}) theo giao tuyến dễ tìm.`},
      {tag:'Giải', ask:`Giao tuyến của ${m(`(${s + a + c})`)} và ${m(`(${M + b + d})`)} là đường thẳng`, opts:[m(M + 'O'), m(M + b), m(s + 'O'), m(b + d)], ans:m(M + 'O'), hint:`Hai điểm chung: ${M} và giao điểm hai đường chéo.`},
      {tag:'Đáp số', ask:`Giao điểm của ${m(s + c)} và ${m(`(${M + b + d})`)} là giao điểm của ${m(s + c)} với`, opts:[m(M + 'O'), m(b + d), m(a + c), m(M + b)], ans:m(M + 'O'), hint:`Giao điểm nằm trên giao tuyến vừa tìm được.`}]});
};

const K10KT = [
  {t:'Mặt phẳng và hình biểu diễn', b:`Mặt phẳng không có bề dày, không có giới hạn; vẽ bằng một hình bình hành và ghi tên ${tm('(P)')}, ${tm('(\\alpha)')}. Điểm ${tm('A')} thuộc ${tm('(P)')}: ${tm('A \\in (P)')}; không thuộc: ${tm('A \\notin (P)')}. Đường thẳng ${tm('d')} nằm trong ${tm('(P)')}: ${tm('d \\subset (P)')}. Nét liền là cạnh nhìn thấy, nét đứt là cạnh bị che khuất.`, warn:`Điểm dùng ∈ hoặc ∉; đường thẳng dùng ⊂. Không viết ${tm('d \\in (P)')}.`, ex:'Điểm vẽ trong hình bình hành là thuộc mặt phẳng, điểm vẽ ngoài là không thuộc.'},
  {t:'Sáu tính chất thừa nhận và ba cách xác định mặt phẳng', b:`<ul><li>Qua hai điểm phân biệt có đúng một đường thẳng.</li><li>Qua ba điểm <b>không thẳng hàng</b> có đúng một mặt phẳng.</li><li>Đường thẳng có hai điểm phân biệt thuộc mặt phẳng thì nằm trọn trong mặt phẳng đó.</li><li>Tồn tại bốn điểm không cùng một mặt phẳng.</li><li>Hai mặt phẳng phân biệt có điểm chung thì có chung đúng một đường thẳng (giao tuyến).</li><li>Trong mỗi mặt phẳng, các kết quả của hình học phẳng đều đúng.</li></ul>Ba cách xác định mặt phẳng: ba điểm không thẳng hàng · một đường thẳng và một điểm không thuộc nó · hai đường thẳng cắt nhau.`, warn:'Ba điểm thẳng hàng không xác định mặt phẳng (có vô số mặt phẳng chứa chúng); ba điểm cần không thẳng hàng.', ex:`Bốn điểm bất kì không chắc cùng một mặt phẳng. Đếm mặt phẳng: ${tm('C_n^3')} rồi trừ phần trùng khi có điểm đồng phẳng.`},
  {t:'Tìm giao tuyến và giao điểm', b:`Giao tuyến của hai mặt phẳng là đường thẳng đi qua <b>hai điểm chung</b>. Cách tìm: (1) tìm một điểm chung dễ thấy (đỉnh chóp); (2) tìm điểm chung thứ hai bằng cách lấy giao của hai đường thẳng, mỗi đường nằm trong một mặt phẳng. Giao điểm của đường thẳng ${tm('d')} và ${tm('(P)')}: chọn mặt phẳng phụ chứa ${tm('d')}, tìm giao tuyến ${tm('a')} của nó với ${tm('(P)')}, giao điểm của ${tm('d')} với ${tm('a')} chính là điểm cần tìm.`, warn:'Giao điểm hai đường thẳng phải ở trong cùng một mặt phẳng mới lấy được; kiểm tra điểm có thật sự thuộc cả hai mặt phẳng.', ex:'Mặt phẳng phụ nên chọn mặt phẳng chứa đường thẳng cần tìm giao điểm và có giao tuyến dễ xác định, thường là mặt phẳng qua đỉnh chóp và hai đường chéo.'},
  {t:'Hình chóp và tứ diện', b:`Hình chóp ${tm('S.A_1A_2\\dots A_n')}: đỉnh ${tm('S')}, đáy là đa giác ${tm('n')} cạnh, có ${tm('n')} mặt bên, ${tm('n')} cạnh bên, ${tm('n+1')} mặt, ${tm('2n')} cạnh, ${tm('n+1')} đỉnh. Tứ diện ${tm('ABCD')}: 4 đỉnh, 6 cạnh, 4 mặt; hai cạnh không có đỉnh chung gọi là hai cạnh đối diện.`, warn:'Tứ diện cũng là hình chóp tam giác; chọn đỉnh nào làm đỉnh chóp cũng được.', ex:'Đếm hình: số mặt = số cạnh đáy + 1, số cạnh = 2 × số cạnh đáy.'}
];

lesson(5, 'dt-mp-khong-gian', 'Bài 10. Đường thẳng và mặt phẳng trong không gian', 'Mặt phẳng, tính chất thừa nhận, giao tuyến, giao điểm, hình chóp – tứ diện.', [g10a, g10b, g10c, g10d, g10e, g10f], {introTitle:'Kiến thức cần nhớ · Chỗ dễ sai · Mẹo', intro:K10KT});

/* =====================================================================
   Bài 11. Hai đường thẳng song song  (SGK KNTT Toán 11, Chương IV)
   Chủ đề 5 · bài `hai-dt-song-song` · 6 dạng × 3 mức; vị trí tương đối tính từ TỌA ĐỘ 3D thật
   ===================================================================== */
const tw = s => `<b class="ans">${s}</b>`;
const V3 = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
const X3 = (u, v) => [u[1] * v[2] - u[2] * v[1], u[2] * v[0] - u[0] * v[2], u[0] * v[1] - u[1] * v[0]];
const D3 = (u, v) => u[0] * v[0] + u[1] * v[1] + u[2] * v[2];
const Z3 = u => u[0] === 0 && u[1] === 0 && u[2] === 0;
const relL = (a1, a2, b1, b2) => {
  const u = V3(a2, a1), v = V3(b2, b1), cr = X3(u, v), w = V3(b1, a1);
  if(Z3(cr)) return Z3(X3(w, u)) ? 'same' : 'par';
  return D3(w, cr) === 0 ? 'cut' : 'skew';
};
const RELT = {cut:'cắt nhau', par:'song song', skew:'chéo nhau', same:'trùng nhau'};
const RELO = [RELT.cut, RELT.par, RELT.skew, RELT.same];

const PG0 = [[150, 16], [40, 142], [104, 186], [262, 186], [198, 142]];
const pgFig = (L, o = {}) => {
  const [s, a, b, c, d] = L, pts = {[s]:PG0[0], [a]:PG0[1], [b]:PG0[2], [c]:PG0[3], [d]:PG0[4], ...(o.pts || {})};
  return spaceSVG({pts, s:[[s, a], [s, b], [s, c], [s, d], [a, b], [b, c], [c, d], ...(o.s || [])], d:[[a, d], ...(o.d || [])], h:o.h, hd:o.hd, fill:o.fill, off:o.off, ht:218, aria:o.aria || 'Hình chóp đáy hình bình hành'});
};
const CUBE0 = {A:[80, 192], B:[190, 192], C:[250, 152], D:[140, 152], "A'":[80, 94], "B'":[190, 94], "C'":[250, 54], "D'":[140, 54]};
const cubeFig = (o = {}) => spaceSVG({pts:{...CUBE0, ...(o.pts || {})},
  s:[['A', 'B'], ['B', 'C'], ["A'", "B'"], ["B'", "C'"], ["C'", "D'"], ["D'", "A'"], ['A', "A'"], ['B', "B'"], ['C', "C'"], ...(o.s || [])],
  d:[['A', 'D'], ['D', 'C'], ['D', "D'"], ...(o.d || [])], h:o.h, hd:o.hd, fill:o.fill, off:o.off, ht:218, aria:o.aria || 'Hình lập phương'});
const PRI0 = {A:[50, 172], B:[130, 198], C:[270, 172], "A'":[50, 60], "B'":[130, 86], "C'":[270, 60]};
const prismFig = (o = {}) => spaceSVG({pts:{...PRI0, ...(o.pts || {})},
  s:[['A', 'B'], ['B', 'C'], ["A'", "B'"], ["B'", "C'"], ["C'", "A'"], ['A', "A'"], ['B', "B'"], ['C', "C'"], ...(o.s || [])],
  d:[['A', 'C'], ...(o.d || [])], h:o.h, hd:o.hd, fill:o.fill, off:o.off, ht:218, aria:o.aria || 'Hình lăng trụ tam giác'});

/* khối đa diện: tên, tọa độ 3D, danh sách cạnh, cạnh bị khuất */
const solid = (kind, L) => {
  let co, ed, hid, title;
  if(kind === 'tet'){
    co = [[0, 0, 0], [4, 0, 0], [1, 3, 0], [1, 1, 3]]; ed = [[0, 1], [0, 2], [0, 3], [1, 2], [1, 3], [2, 3]]; hid = [[1, 3]];
    title = `tứ diện ${m(L.join(''))}`;
  } else if(kind === 'pyp' || kind === 'pyt'){
    co = kind === 'pyp' ? [[2, 1, 4], [0, 0, 0], [4, 0, 0], [5, 3, 0], [1, 3, 0]] : [[3, 1, 4], [0, 0, 0], [1, 3, 0], [4, 3, 0], [6, 0, 0]];
    ed = [[0, 1], [0, 2], [0, 3], [0, 4], [1, 2], [2, 3], [3, 4], [4, 1]]; hid = [[4, 1]];
    title = kind === 'pyp' ? `hình chóp ${m(`${L[0]}.${L.slice(1).join('')}`)} có đáy ${m(L.slice(1).join(''))} là hình bình hành`
      : `hình chóp ${m(`${L[0]}.${L.slice(1).join('')}`)} có đáy ${m(L.slice(1).join(''))} là hình thang với ${m(`${L[1]}${L[4]} \\parallel ${L[2]}${L[3]}`)}`;
  } else if(kind === 'cube'){
    L = ['A', 'B', 'C', 'D', "A'", "B'", "C'", "D'"];
    co = [[0, 0, 0], [1, 0, 0], [1, 1, 0], [0, 1, 0], [0, 0, 1], [1, 0, 1], [1, 1, 1], [0, 1, 1]];
    ed = [[0, 1], [1, 2], [2, 3], [3, 0], [4, 5], [5, 6], [6, 7], [7, 4], [0, 4], [1, 5], [2, 6], [3, 7]]; hid = [[0, 3], [3, 2], [3, 7]];
    title = `hình lập phương ${m("ABCD.A'B'C'D'")}`;
  } else {
    L = ['A', 'B', 'C', "A'", "B'", "C'"];
    co = [[0, 0, 0], [4, 0, 0], [1, 3, 0], [1, 1, 5], [5, 1, 5], [2, 4, 5]];
    ed = [[0, 1], [1, 2], [2, 0], [3, 4], [4, 5], [5, 3], [0, 3], [1, 4], [2, 5]]; hid = [[0, 2]];
    title = `hình lăng trụ tam giác ${m("ABC.A'B'C'")}`;
  }
  const map = {}; L.forEach((n, i) => { map[n] = co[i]; });
  return {kind, L, co:map, ed:ed.map(([i, j]) => [L[i], L[j]]), hid:hid.map(([i, j]) => [L[i], L[j]]), title};
};
const mk = kind => kind === 'tet' ? solid('tet', pick(SETS)) : (kind === 'pyp' || kind === 'pyt') ? solid(kind, pick(PYL.slice(0, 2))) : solid(kind);
const eName = e => e.join('');
const sameE = (e, f) => e[0] === f[0] && e[1] === f[1];
const relE = (S, e, f) => relL(S.co[e[0]], S.co[e[1]], S.co[f[0]], S.co[f[1]]);
const pairsOf = S => { const r = []; for(let i = 0; i < S.ed.length; i++) for(let j = i + 1; j < S.ed.length; j++) r.push([S.ed[i], S.ed[j]]); return r; };
const countRel = (S, k) => pairsOf(S).filter(([e, f]) => relE(S, e, f) === k).length;
const edgesRel = (S, e, k) => S.ed.filter(f => !sameE(e, f) && relE(S, e, f) === k);
const isHid = (S, e) => S.hid.some(h => sameE(h, e) || (h[0] === e[1] && h[1] === e[0]));
const figS = (S, es = [], o = {}) => {
  const h = es.filter(e => !isHid(S, e)), hd = es.filter(e => isHid(S, e));
  const base = {h:[...(o.h || []), ...h], hd:[...(o.hd || []), ...hd], pts:o.pts, s:o.s, d:o.d, off:o.off, fill:o.fill};
  return S.kind === 'tet' ? tetFig(S.L, base) : S.kind === 'pyt' ? pyFig(S.L, base) : S.kind === 'pyp' ? pgFig(S.L, base) : S.kind === 'cube' ? cubeFig(base) : prismFig(base);
};
/* kiểm tra số liệu đếm của các khối ngay khi nạp */
{
  const T = solid('tet', ['A', 'B', 'C', 'D']), P = solid('pyp', ['S', 'A', 'B', 'C', 'D']), C = solid('cube'), R3 = solid('prism');
  e10(countRel(T, 'skew') === 3 && countRel(T, 'cut') === 12 && countRel(T, 'par') === 0, 'đếm tứ diện');
  e10(countRel(P, 'par') === 2 && countRel(P, 'skew') === 8 && countRel(P, 'cut') === 18, 'đếm chóp đáy hbh');
  e10(countRel(C, 'par') === 18 && countRel(C, 'skew') === 24 && countRel(C, 'cut') === 24, 'đếm lập phương');
  e10(countRel(R3, 'par') === 6 && countRel(R3, 'skew') === 12 && countRel(R3, 'cut') === 18, 'đếm lăng trụ');
}
const whyRel = (S, e, f, k) => {
  const common = e.find(p => f.includes(p));
  if(k === 'cut') return common ? `Hai cạnh có chung đỉnh ${m(common)} nên ${tw('cắt nhau')} tại ${m(common)}.`
    : `Hai đường thẳng cùng nằm trong mặt đáy và không song song nên ${tw('cắt nhau')} (tại điểm nằm ngoài các đoạn thẳng).`;
  if(k === 'par') return S.kind === 'pyp' ? `${m(eName(e))} và ${m(eName(f))} là hai cạnh đối của hình bình hành đáy nên ${tw('song song')}.`
    : S.kind === 'pyt' ? `${m(eName(e))} và ${m(eName(f))} là hai đáy của hình thang nên ${tw('song song')}.`
    : `${m(eName(e))} và ${m(eName(f))} là hai cạnh đối của một mặt (hình vuông, hình bình hành) hoặc cùng song song với một cạnh thứ ba, nên ${tw('song song')}.`;
  return `Bốn điểm ${m([...e, ...f].join(','))} không cùng thuộc một mặt phẳng, hai đường thẳng không đồng phẳng và không có điểm chung nên ${tw('chéo nhau')}.`;
};
const clsQ = (S, e, f, hint) => {
  const k = relE(S, e, f);
  return QC({text:`Cho ${S.title}. Vị trí tương đối của hai đường thẳng ${m(eName(e))} và ${m(eName(f))} là`, opts:RELO, ans:RELT[k], keepOrder:true,
    fig:figS(S, [e, f]), hint, sol:whyRel(S, e, f, k)});
};
const pickPair = (S, k) => pick(pairsOf(S).filter(([e, f]) => relE(S, e, f) === k));

/* ---------- Dạng 1. Vị trí tương đối của hai đường thẳng ---------- */
const g11a = lv => {
  if(lv === 1){
    const t = R(0, 3);
    if(t === 0) return mc10('Hai đường thẳng phân biệt không có điểm chung thì chúng', 'song song hoặc chéo nhau', ['chỉ có thể song song', 'chỉ có thể chéo nhau', 'cắt nhau'],
      'Nhớ: trong không gian, hai đường thẳng không cắt nhau chưa chắc đã song song.', `Nếu cùng nằm trong một mặt phẳng thì chúng song song; nếu không thì chúng chéo nhau. Đáp án: ${tw('song song hoặc chéo nhau')}.`);
    if(t === 1) return mc10('Hai đường thẳng chéo nhau là hai đường thẳng', 'không cùng nằm trong một mặt phẳng', ['không có điểm chung', 'không song song với nhau', 'cùng nằm trong một mặt phẳng và không có điểm chung'],
      'Chéo nhau nghĩa là không tồn tại mặt phẳng nào chứa cả hai đường thẳng.', `Theo định nghĩa: hai đường thẳng chéo nhau là hai đường thẳng ${tw('không cùng nằm trong một mặt phẳng')}. “Không có điểm chung” chưa đủ vì hai đường thẳng song song cũng không có điểm chung.`);
    if(t === 2){
      const [x, y] = [pick(['a', 'd']), pick(['b', 'c'])];
      return mc10(`Hai đường thẳng ${m(x)} và ${m(y)} cắt nhau. Số mặt phẳng chứa cả ${m(x)} và ${m(y)} là`, 'đúng một', ['hai', 'vô số', 'không có'],
        'Hai đường thẳng cắt nhau xác định một mặt phẳng.', `Hai đường thẳng cắt nhau cùng nằm trong ${tw('đúng một')} mặt phẳng.`);
    }
    const S = mk('tet'), [e, f] = pickPair(S, pick(['cut', 'skew']));
    return clsQ(S, e, f, 'Hai cạnh có chung một đỉnh thì cắt nhau; hai cạnh không có đỉnh chung thì kiểm tra xem bốn đỉnh có đồng phẳng không.');
  }
  if(lv === 2){
    const S = mk(pick(['pyp', 'pyt'])), k = S.kind === 'pyt' ? pick(['cut', 'skew', 'skew', 'par']) : pick(['par', 'cut', 'skew']);
    const [e, f] = pickPair(S, k);
    return clsQ(S, e, f, 'Xét xem hai đường thẳng có cùng nằm trong một mặt phẳng (mặt bên, mặt đáy) hay không.');
  }
  const t = R(0, 2);
  if(t === 0){
    const S = mk(pick(['cube', 'prism'])), [e, f] = pickPair(S, pick(['cut', 'skew', 'skew', 'par']));
    return clsQ(S, e, f, 'Tìm một mặt (hình vuông, hình bình hành) chứa cả hai cạnh, hoặc kiểm tra bốn đỉnh có đồng phẳng không.');
  }
  if(t === 1){
    const S = mk(pick(['cube', 'prism'])), e = pick(S.ed), good = pick(edgesRel(S, e, 'skew'));
    const bad = shuffle(S.ed.filter(f => !sameE(e, f) && relE(S, e, f) !== 'skew')).slice(0, 3);
    return QC({text:`Cho ${S.title}. Đường thẳng nào sau đây chéo nhau với đường thẳng ${m(eName(e))}?`, opts:[good, ...bad].map(x => m(eName(x))), ans:m(eName(good)),
      fig:figS(S, [e]), hint:`Loại các cạnh có chung đỉnh với ${eName(e)} và các cạnh song song với ${eName(e)}.`,
      sol:`${whyRel(S, e, good, 'skew')} Các phương án còn lại đều cắt hoặc song song với ${m(eName(e))}. Đáp án: ${tb(eName(good))}.`});
  }
  const S = mk('cube'), ds = [];
  for(let i = 0; i < 8; i++) for(let j = i + 1; j < 8; j++){ const d = V3(S.co[S.L[i]], S.co[S.L[j]]); if(d[0] * d[0] + d[1] * d[1] + d[2] * d[2] === 2) ds.push([S.L[i], S.L[j]]); }
  e10(ds.length === 12, 'đường chéo mặt');
  const e = pick(ds), f = pick(ds.filter(x => !sameE(e, x))), k = relL(S.co[e[0]], S.co[e[1]], S.co[f[0]], S.co[f[1]]);
  const common = e.find(p => f.includes(p));
  return QC({text:`Cho ${S.title}. Vị trí tương đối của hai đường thẳng ${m(eName(e))} và ${m(eName(f))} (đường chéo của hai mặt) là`, opts:RELO, ans:RELT[k], keepOrder:true,
    fig:cubeFig({h:[e, f]}),
    hint:'Xét xem hai đường chéo có cùng nằm trong một mặt phẳng hay không; thử tìm đỉnh chung hoặc một hình chữ nhật chứa chúng.',
    sol:k === 'skew' ? `Bốn điểm ${m([...e, ...f].join(','))} không đồng phẳng nên hai đường thẳng ${tw('chéo nhau')}.`
      : k === 'cut' ? (common ? `Hai đường chéo có chung đỉnh ${m(common)} nên ${tw('cắt nhau')}.` : `Hai đường chéo của cùng một hình vuông cắt nhau tại tâm hình vuông: ${tw('cắt nhau')}.`)
      : `Hai đường chéo này là hai cạnh đối của một hình chữ nhật (mặt cắt chéo của hình lập phương) nên ${tw('song song')}.`});
};

/* ---------- Dạng 2. Tính chất của hai đường thẳng song song ---------- */
const STM = [
  [true, 'Hai đường thẳng phân biệt cùng song song với một đường thẳng thứ ba thì song song với nhau', 'Đây là tính chất bắc cầu.'],
  [true, 'Qua một điểm nằm ngoài đường thẳng d có đúng một đường thẳng song song với d', 'Đây là tính chất tồn tại duy nhất.'],
  [true, 'Hai đường thẳng chéo nhau thì không có điểm chung và không song song', 'Chéo nhau là không đồng phẳng.'],
  [true, 'Hai đường thẳng cắt nhau thì không chéo nhau', 'Cắt nhau thì đồng phẳng.'],
  [false, 'Hai đường thẳng cùng vuông góc với một đường thẳng thứ ba thì song song với nhau', 'Trong không gian chúng có thể cắt nhau hoặc chéo nhau.'],
  [false, 'Hai đường thẳng không có điểm chung thì song song với nhau', 'Chúng có thể chéo nhau.'],
  [false, 'Hai đường thẳng không cắt nhau thì chéo nhau', 'Chúng có thể song song.'],
  [false, 'Hai đường thẳng cùng nằm trong một mặt phẳng thì song song với nhau', 'Chúng có thể cắt nhau.']
];
const g11b = lv => {
  if(lv === 1){
    const t = R(0, 3);
    if(t === 0){
      const d = pick(['d', 'a', 'b']), A = pick(['A', 'M', 'K']);
      return QB({text:`Cho đường thẳng ${m(d)} và điểm ${m(A)} không thuộc ${m(d)}. Số đường thẳng đi qua ${m(A)} và song song với ${m(d)} là`, tpl:'[_]', ans:[1],
        hint:'Tính chất: qua một điểm nằm ngoài đường thẳng cho trước, có một và chỉ một đường thẳng song song với đường thẳng đó.', sol:`Có ${tb(1)} đường thẳng.`});
    }
    if(t === 1){
      const [a, b, c] = shuffle(['a', 'b', 'c', 'x', 'y', 'z']).slice(0, 3);
      return mc10(`Cho ba đường thẳng phân biệt ${m(a)}, ${m(b)}, ${m(c)} thỏa mãn ${m(`${a} \\parallel ${b}`)} và ${m(`${b} \\parallel ${c}`)}. Khi đó`, m(`${a} \\parallel ${c}`), [m(`${a} \\text{ cắt } ${c}`), m(`${a} \\text{ chéo } ${c}`), m(`${a} \\equiv ${c}`)],
        'Tính chất bắc cầu của quan hệ song song.', `Hai đường thẳng phân biệt cùng song song với ${m(b)} nên song song với nhau: ${tb(`${a} \\parallel ${c}`)}.`);
    }
    if(t === 2){
      const [a, b, c] = shuffle(['a', 'b', 'c', 'd', 'p', 'q']).slice(0, 3);
      return mc10(`Cho ${m(`${a} \\parallel ${b}`)} và đường thẳng ${m(c)} cắt ${m(a)}. Vị trí tương đối của ${m(c)} và ${m(b)} là`, 'cắt nhau hoặc chéo nhau', ['chỉ có thể cắt nhau', 'chỉ có thể chéo nhau', 'song song'],
        `Nếu ${c} ∥ ${b} thì vì ${a} ∥ ${b} nên ${a} ∥ ${c}, mâu thuẫn.`, `${m(c)} không thể song song với ${m(b)} (nếu có thì ${m(c)} ∥ ${m(a)}, trái giả thiết). Vậy ${m(c)} và ${m(b)} ${tw('cắt nhau hoặc chéo nhau')}.`);
    }
    const [a, b] = shuffle(['a', 'b', 'c', 'd']).slice(0, 2);
    return QB({text:`Số mặt phẳng chứa hai đường thẳng song song ${m(a)} và ${m(b)} là`, tpl:'[_]', ans:[1], hint:'Hai đường thẳng song song xác định một mặt phẳng.', sol:`Hai đường thẳng song song cùng nằm trong ${tb(1)} mặt phẳng.`});
  }
  if(lv === 2){
    const t = R(0, 3);
    if(t === 0){
      const S = mk('cube'), e = pick(S.ed), n = edgesRel(S, e, 'par').length;
      return QB({text:`Cho ${S.title}. Có bao nhiêu cạnh của hình lập phương (khác ${m(eName(e))}) song song với cạnh ${m(eName(e))}?`, tpl:'[_]', ans:[n], fig:figS(S, [e]),
        hint:'Các cạnh song song với một cạnh là các cạnh cùng phương với nó.', sol:`Mỗi phương có 4 cạnh song song với nhau. Trừ chính ${m(eName(e))}, còn ${tb(n)} cạnh: ${edgesRel(S, e, 'par').map(x => m(eName(x))).join(', ')}.`});
    }
    if(t === 1){
      const S = mk('prism'), e = pick(S.ed), n = edgesRel(S, e, 'par').length;
      return QB({text:`Cho ${S.title}. Có bao nhiêu cạnh của hình lăng trụ (khác ${m(eName(e))}) song song với cạnh ${m(eName(e))}?`, tpl:'[_]', ans:[n], fig:figS(S, [e]),
        hint:'Cạnh bên song song với các cạnh bên; cạnh đáy song song với cạnh tương ứng của đáy kia.', sol:`Các cạnh song song với ${m(eName(e))}: ${edgesRel(S, e, 'par').map(x => m(eName(x))).join(', ')}. Có ${tb(n)} cạnh.`});
    }
    const S = mk(t === 2 ? 'pyp' : 'cube'), e = S.kind === 'pyp' ? pick(S.ed.filter(x => edgesRel(S, x, 'par').length)) : pick(S.ed), good = edgesRel(S, e, 'par')[0];
    const bad = shuffle(S.ed.filter(f => !sameE(e, f) && relE(S, e, f) !== 'par')).slice(0, 3);
    return QC({text:`Cho ${S.title}. Cạnh nào sau đây song song với cạnh ${m(eName(e))}?`, opts:[good, ...bad].map(x => m(eName(x))), ans:m(eName(good)), fig:figS(S, [e]),
      hint:S.kind === 'pyp' ? 'Hai cạnh đối của hình bình hành đáy thì song song.' : 'Tìm cạnh cùng phương với nó (đối diện trong cùng một mặt hoặc cùng song song một cạnh thứ ba).',
      sol:`${whyRel(S, e, good, 'par')} Các phương án khác cắt hoặc chéo nhau với ${m(eName(e))}.`});
  }
  const t = R(0, 2);
  if(t === 0){
    const T = shuffle(STM), ask = pick([true, false]);
    const pool = T.filter(x => x[0] === ask), other = T.filter(x => x[0] !== ask);
    const good = pool[0], bads = other.slice(0, 3);
    return mc10(ask ? 'Mệnh đề nào sau đây đúng?' : 'Mệnh đề nào sau đây sai?', good[1], bads.map(x => x[1]), 'Thử vẽ hình (cắt nhau, chéo nhau) để tìm phản ví dụ cho từng phương án.',
      `${good[1]}: ${ask ? 'đúng' : 'sai'}. ${good[2]} ${tw(good[1])}.`);
  }
  if(t === 1){
    const S = mk('cube'), vs = [['A', "A'"], ['B', "B'"], ['C', "C'"], ['D', "D'"]], [p, q, r] = shuffle(vs).slice(0, 3);
    const e = p, f = q, mdl = r;
    return QS({text:`Cho ${S.title}. Chứng minh ${m(eName(e))} song song với ${m(eName(f))} bằng cách dùng đường thẳng trung gian.`, fig:figS(S, [e, f]), direct:true,
      hint:'Tìm một cạnh cùng song song với cả hai cạnh cần chứng minh.',
      sol:`${m(eName(mdl))} ∥ ${m(eName(e))} và ${m(eName(mdl))} ∥ ${m(eName(f))} (các cạnh bên của hình lập phương song song với nhau). Theo tính chất bắc cầu, ${tb(`${eName(e)} \\parallel ${eName(f)}`)}.`,
      steps:[
        {tag:'Kế hoạch', ask:`Chọn đường thẳng trung gian cùng song song với ${m(eName(e))} và ${m(eName(f))}:`, opts:[m(eName(mdl)), m('AB'), m("A'B'"), m('BC')], ans:m(eName(mdl)), hint:'Đường trung gian cũng là một cạnh bên.'},
        {tag:'Giải', ask:`Vì ${m(`${eName(mdl)} \\parallel ${eName(e)}`)} và ${m(`${eName(mdl)} \\parallel ${eName(f)}`)}, theo tính chất bắc cầu:`, opts:[m(`${eName(e)} \\parallel ${eName(f)}`), m(`${eName(e)} \\text{ cắt } ${eName(f)}`), m(`${eName(e)} \\text{ chéo } ${eName(f)}`), m(`${eName(e)} \\perp ${eName(f)}`)], ans:m(`${eName(e)} \\parallel ${eName(f)}`), hint:'Hai đường thẳng phân biệt cùng song song với đường thứ ba.'},
        {tag:'Đáp số', ask:`Có tất cả bao nhiêu cạnh của hình lập phương song song hoặc trùng với ${m(eName(e))}?`, tpl:'[_]', ans:[4], hint:'Mỗi phương có 4 cạnh.'}]});
  }
  const S = mk('prism'), [e, f] = [['A', "A'"], ['B', "B'"]];
  return QC({text:`Cho ${S.title}. Biết ${m("AA'")} ∥ ${m("BB'")} ∥ ${m("CC'")}. Phát biểu nào sau đây đúng?`,
    opts:[m("BB' \\parallel CC'"), m("BB' \\text{ cắt } CC'"), m("AA' \\text{ chéo } BB'"), m("BB' \\text{ chéo } CC'")], ans:m("BB' \\parallel CC'"), keepOrder:true, fig:figS(S, [e, f]),
    hint:'Ba cạnh bên đôi một song song.', sol:`Hai cạnh bên bất kì của lăng trụ song song với nhau: ${tb("BB' \\parallel CC'")}.`});
};

/* ---------- Dạng 3. Đếm cặp và đếm cạnh theo vị trí tương đối ---------- */
const g11c = lv => {
  const NAMEK = {cut:'cắt nhau', par:'song song', skew:'chéo nhau'};
  if(lv === 1){
    const S = mk('tet'), t = R(0, 2);
    if(t === 0) return QB({text:`Cho ${S.title}. Có bao nhiêu cặp cạnh chéo nhau? (Hai cạnh của một cặp không có đỉnh chung.)`, tpl:'[_]', ans:[3], fig:figS(S, []),
      hint:'Mỗi cạnh có đúng một cạnh đối diện.', sol:`Tứ diện có 3 cặp cạnh đối: ${tb(3)} cặp chéo nhau.`});
    if(t === 1){ const e = pick(S.ed), f = edgesRel(S, e, 'skew')[0];
      return QC({text:`Cho ${S.title}. Cạnh nào chéo nhau với cạnh ${m(eName(e))}?`, opts:S.ed.filter(x => !sameE(x, e)).map(x => m(eName(x))), ans:m(eName(f)), fig:figS(S, [e]),
        hint:'Cạnh chéo nhau với một cạnh là cạnh không có đỉnh chung với nó.', sol:`Cạnh đối diện của ${m(eName(e))} là ${tb(eName(f))}.`}); }
    const e = pick(S.ed), n = edgesRel(S, e, 'cut').length;
    return QB({text:`Cho ${S.title}. Có bao nhiêu cạnh cắt cạnh ${m(eName(e))}?`, tpl:'[_]', ans:[n], fig:figS(S, [e]),
      hint:'Cạnh cắt nhau là cạnh có chung một đầu mút với nó.', sol:`Mỗi đầu mút của ${m(eName(e))} có 2 cạnh khác đi qua, tất cả khác nhau: ${tb(n)} cạnh.`});
  }
  if(lv === 2){
    const t = R(0, 2);
    if(t === 0){ const S = mk('pyp'), k = pick(['par', 'skew']), n = countRel(S, k);
      return QB({text:`Cho ${S.title}. Có bao nhiêu cặp cạnh (trong 8 cạnh) ${NAMEK[k]}?`, tpl:'[_]', ans:[n], fig:figS(S, []),
        hint:k === 'par' ? 'Chỉ có các cặp cạnh đối của đáy.' : 'Cạnh bên chéo cạnh đáy không chứa đầu mút của nó; có 4 cạnh bên.', sol:k === 'par' ? `Chỉ có ${tb(2)} cặp: hai cặp cạnh đối của hình bình hành đáy.`
          : `Mỗi cạnh bên chéo nhau với 2 cạnh đáy không đi qua đầu mút của nó (4 × 2 = 8). Hai cạnh bên không chéo nhau, hai cạnh đáy cùng mặt phẳng. Có ${tb(n)} cặp.`}); }
    if(t === 1){ const S = mk('pyp'), e = pick(S.ed.filter(x => x[0] === S.L[0])), n = edgesRel(S, e, 'skew').length;
      return QB({text:`Cho ${S.title}. Có bao nhiêu cạnh chéo nhau với cạnh bên ${m(eName(e))}?`, tpl:'[_]', ans:[n], fig:figS(S, [e]),
        hint:'Loại các cạnh có chung đỉnh với cạnh đó; các cạnh còn lại đều nằm ở đáy.', sol:`Các cạnh đáy không qua ${m(e[1])}: ${edgesRel(S, e, 'skew').map(x => m(eName(x))).join(', ')}. Có ${tb(n)} cạnh.`}); }
    const S = mk('pyp'), e = pick(S.ed.filter(x => x[0] !== S.L[0])), k = pick(['skew', 'cut', 'par']), n = edgesRel(S, e, k).length;
    return QB({text:`Cho ${S.title}. Có bao nhiêu cạnh ${NAMEK[k]} với cạnh đáy ${m(eName(e))}?`, tpl:'[_]', ans:[n], fig:figS(S, [e]),
      hint:'Phân loại 7 cạnh còn lại: có chung đỉnh, song song, hoặc chéo nhau.', sol:`Trong 7 cạnh còn lại: ${edgesRel(S, e, k).map(x => m(eName(x))).join(', ')} là ${NAMEK[k]} với ${m(eName(e))}. Có ${tb(n)} cạnh.`});
  }
  const t = R(0, 3);
  if(t === 0){ const S = mk('cube'), k = pick(['par', 'skew', 'cut']), n = countRel(S, k);
    return QB({text:`Cho ${S.title}. Có bao nhiêu cặp cạnh (trong 12 cạnh) ${NAMEK[k]}?`, tpl:'[_]', ans:[n], fig:figS(S, []),
      hint:k === 'par' ? '12 cạnh chia thành 3 nhóm 4 cạnh song song.' : k === 'cut' ? 'Mỗi đỉnh là đầu mút của 3 cạnh.' : 'Lấy tổng số cặp trừ số cặp cắt nhau và số cặp song song.',
      sol:k === 'par' ? `3 nhóm, mỗi nhóm có ${m('\\mathrm{C}_4^2 = 6')} cặp: ${tb(n)}.` : k === 'cut' ? `Mỗi đỉnh cho ${m('\\mathrm{C}_3^2 = 3')} cặp cắt nhau, 8 đỉnh: ${tb(n)}.`
        : `Tổng ${m('\\mathrm{C}_{12}^2 = 66')} cặp, trừ 24 cặp cắt nhau và 18 cặp song song: ${tb(n)}.`}); }
  if(t === 1){ const S = mk('prism'), k = pick(['par', 'skew', 'cut']), n = countRel(S, k);
    return QB({text:`Cho ${S.title}. Có bao nhiêu cặp cạnh (trong 9 cạnh) ${NAMEK[k]}?`, tpl:'[_]', ans:[n], fig:figS(S, []),
      hint:k === 'cut' ? 'Mỗi đỉnh là đầu mút của 3 cạnh, mỗi đỉnh cho 3 cặp cắt nhau.' : 'Tổng cặp là C(9,2) = 36; cắt nhau 18; song song 6.',
      sol:k === 'cut' ? `6 đỉnh × 3 cặp = ${tb(n)}.` : k === 'par' ? `Cạnh bên: 3 cặp; mỗi cạnh đáy song song cạnh tương ứng của đáy kia: 3 cặp. Có ${tb(n)} cặp.` : `${m('36 - 18 - 6')} = ${tb(n)}.`}); }
  if(t === 2){ const S = mk(pick(['cube', 'prism'])), e = pick(S.ed), k = pick(['skew', 'par', 'cut']), n = edgesRel(S, e, k).length;
    return QB({text:`Cho ${S.title}. Có bao nhiêu cạnh ${NAMEK[k]} với cạnh ${m(eName(e))}?`, tpl:'[_]', ans:[n], fig:figS(S, [e]),
      hint:'Phân loại từng cạnh còn lại: có chung đỉnh, song song hay chéo nhau.', sol:`Các cạnh ${NAMEK[k]} với ${m(eName(e))}: ${edgesRel(S, e, k).map(x => m(eName(x))).join(', ')}. Có ${tb(n)} cạnh.`}); }
  const S = mk('cube'), e = pick(S.ed), a = edgesRel(S, e, 'par').length, b = edgesRel(S, e, 'cut').length, c = edgesRel(S, e, 'skew').length;
  e10(a + b + c === 11, 'tổng 11 cạnh');
  return QB({text:`Cho ${S.title}. Với cạnh ${m(eName(e))}, gọi ${m('a')}, ${m('b')}, ${m('c')} lần lượt là số cạnh song song, số cạnh cắt và số cạnh chéo nhau với nó. Tính ${m('a + b + c')}.`, tpl:'[_]', ans:[a + b + c], fig:figS(S, [e]),
    hint:'Mọi cạnh khác đều thuộc đúng một loại.', sol:`${m(`a = ${a},\\ b = ${b},\\ c = ${c}`)} nên ${m(`a + b + c = ${a + b + c}`)}; đó là ${tb(a + b + c)} cạnh còn lại của hình.`});
};

/* ---------- Dạng 4. Giao tuyến của hai mặt phẳng chứa hai đường thẳng song song ---------- */
const g11d = lv => {
  if(lv === 1){
    const t = R(0, 2);
    if(t === 0) return mc10('Ba mặt phẳng phân biệt đôi một cắt nhau theo ba giao tuyến phân biệt. Ba giao tuyến đó', 'đồng quy hoặc đôi một song song', ['luôn đồng quy', 'luôn đôi một song song', 'luôn cùng nằm trong một mặt phẳng'],
      'Định lí về giao tuyến của ba mặt phẳng.', `Theo định lí: ba giao tuyến ${tw('đồng quy hoặc đôi một song song')}.`);
    const S = mk(t === 1 ? 'pyp' : 'pyt'), [s, a, b, c, d] = S.L;
    const pr = S.kind === 'pyp' ? pick([[[a, b], [c, d]], [[a, d], [b, c]]]) : [[a, d], [b, c]];
    const [e1, e2] = pr, goodE = e1, bads = [[a, c], [b, d], ...[[a, b], [c, d], [a, d], [b, c]].filter(x => !(x[0] === e1[0] && x[1] === e1[1]) && !(x[0] === e2[0] && x[1] === e2[1]))];
    const pl1 = `(${s + e1.join('')})`, pl2 = `(${s + e2.join('')})`;
    return QC({text:`Cho ${S.title}. Giao tuyến của hai mặt phẳng ${m(pl1)} và ${m(pl2)} là đường thẳng đi qua ${m(s)} và song song với`, opts:[goodE, ...shuffle(bads).slice(0, 3)].map(x => m(eName(x))), ans:m(eName(goodE)),
      fig:figS(S, []), hint:`${eName(e1)} ⊂ ${pl1}, ${eName(e2)} ⊂ ${pl2} và hai đường thẳng này song song: dùng hệ quả của định lí giao tuyến.`,
      sol:`${m(pl1)} ∩ ${m(pl2)} chứa điểm chung ${m(s)}; hai mặt phẳng lần lượt chứa ${m(eName(e1))} và ${m(eName(e2))} mà ${m(`${eName(e1)} \\parallel ${eName(e2)}`)}, nên giao tuyến đi qua ${m(s)} và song song với ${tb(eName(e1))}.`});
  }
  if(lv === 2){
    const t = R(0, 2);
    const S = mk('pyp'), [s, a, b, c, d] = S.L, M = 'M', N = 'N';
    const Mt = pick([.5, .5, .4, .6]), Mp = mid(PG0[0], PG0[1], Mt), Np = mid(PG0[0], PG0[4], Mt);
    const f = pgFig(S.L, {pts:{[M]:Mp, [N]:Np}, s:[[M, b], [N, c]], d:[[M, N]]});
    const AD = pick([6, 8, 10, 12]);
    const ratio = Mt === .5 ? [1, 2] : Mt === .4 ? [2, 5] : [3, 5];
    const AD2 = AD % ratio[1] ? ratio[1] * R(2, 4) : AD;
    const mn = AD2 * ratio[0] / ratio[1];
    const side = `${m(`${s}${M}`)} : ${m(`${s}${a}`)}`;
    if(t === 0) return mc10(`Cho ${S.title}. Điểm ${m(M)} thuộc cạnh ${m(s + a)}. Mặt phẳng ${m(`(${M + b + c})`)} cắt ${m(`(${s + a + d})`)} theo giao tuyến ${m(M + N)} (${m(N)} thuộc ${m(s + d)}). Khi đó ${m(M + N)} song song với`, m(`${a + d}`), [m(`${a + b}`), m(`${s + b}`), m(`${c + d}`)],
      'BC nằm trong (MBC), AD nằm trong (SAD), và BC ∥ AD.', `${m(b + c)} ⊂ ${m(`(${M + b + c})`)}, ${m(a + d)} ⊂ ${m(`(${s + a + d})`)}, ${m(`${b + c} \\parallel ${a + d}`)}. Nên ${m(M + N)} ∥ ${tb(a + d)} (và ∥ ${m(b + c)}).`, f);
    if(t === 1) return QB({text:`Cho ${S.title}. Điểm ${m(M)} thuộc cạnh ${m(s + a)} sao cho ${m(`${s}${M} = \\dfrac{${ratio[0]}}{${ratio[1]}}${s}${a}`)}. Mặt phẳng ${m(`(${M + b + c})`)} cắt ${m(s + d)} tại ${m(N)}. Biết ${m(`${a}${d} = ${AD2}`)}. Tính ${m(M + N)}.`,
      tpl:`${m(`${M}${N} =`)} [_]`, ans:[mn], fig:f, hint:`MN ∥ AD, dùng định lí Thales (hoặc tam giác đồng dạng) trong tam giác ${s}${a}${d}.`,
      sol:`${m(`${M}${N} \\parallel ${a}${d}`)} nên ${m(`\\dfrac{${M}${N}}{${a}${d}} = \\dfrac{${s}${M}}{${s}${a}} = \\dfrac{${ratio[0]}}{${ratio[1]}}`)}. Do đó ${m(`${M}${N} = \\dfrac{${ratio[0]}}{${ratio[1]}}\\cdot ${AD2}`)} = ${tb(mn)}.`});
    return QC({text:`Cho ${S.title}. Điểm ${m(M)} thuộc cạnh ${m(s + a)}, mặt phẳng ${m(`(${M + b + c})`)} cắt ${m(s + d)} tại ${m(N)}. Tứ giác ${m(M + b + c + N)} là hình gì?`, opts:['hình thang', 'hình bình hành', 'hình chữ nhật', 'hình thoi'], ans:'hình thang', keepOrder:true, fig:f,
      hint:`MN ∥ BC. Hai cạnh MB và NC có song song không?`, sol:`${m(`${M}${N} \\parallel ${b}${c}`)}, mà ${m(`${M}${N} < ${a}${d} = ${b}${c}`.replace('<', '\\lt'))} (vì ${m(M)} nằm trong cạnh ${m(s + a)}), hai đáy không bằng nhau nên ${m(M + b + c + N)} không phải hình bình hành. Vậy ${m(M + b + c + N)} là ${tw('hình thang')} (đáy ${m(M + N)}, ${m(b + c)}).`});
  }
  const S = mk('pyp'), [s, a, b, c, d] = S.L, M = 'M', N = 'N', K = pick([2, 3, 4, 5]);
  const Mp = mid(PG0[0], PG0[1], .5), Np = mid(PG0[0], PG0[4], .5);
  const f = pgFig(S.L, {pts:{[M]:Mp, [N]:Np}, s:[[M, b], [N, c]], d:[[M, N]]});
  return QS({text:`Cho ${S.title}. Gọi ${m(M)} là trung điểm ${m(s + a)}. Mặt phẳng ${m(`(${M + b + c})`)} cắt ${m(s + d)} tại ${m(N)}. Biết ${m(`${a}${d} = ${2 * K}`)}. Tính ${m(M + N)}.`, fig:f, direct:true,
    hint:'Hai mặt phẳng chứa hai đường thẳng song song (BC và AD) nên giao tuyến song song với chúng.',
    sol:`${m(b + c)} ⊂ ${m(`(${M + b + c})`)}, ${m(a + d)} ⊂ ${m(`(${s + a + d})`)}, ${m(`${b + c} \\parallel ${a + d}`)} nên giao tuyến ${m(M + N)} ∥ ${m(a + d)}. ${m(M)} là trung điểm ${m(s + a)} nên ${m(N)} là trung điểm ${m(s + d)}, ${m(M + N)} là đường trung bình của tam giác ${m(s + a + d)}: ${m(`${M}${N} = \\dfrac{1}{2}${a}${d} = ${K}`)}. Đáp số: ${tb(K)}.`,
    steps:[
      {tag:'Kế hoạch', ask:`Giao tuyến của ${m(`(${M + b + c})`)} và ${m(`(${s + a + d})`)} đi qua ${m(M)} và song song với`, opts:[m(a + d), m(s + a), m(a + b), m(s + d)], ans:m(a + d), hint:'BC nằm trong (MBC), AD nằm trong (SAD), BC ∥ AD.'},
      {tag:'Giải', ask:`Đường thẳng đó cắt ${m(s + d)} tại ${m(N)}. ${m(N)} là`, opts:['trung điểm của SD'.replace('SD', s + d), `trung điểm của ${a + d}`, `trọng tâm tam giác ${s + a + d}`, `điểm ${d}`], ans:`trung điểm của ${s + d}`, hint:'M là trung điểm SA và MN ∥ AD.'},
      {tag:'Đáp số', ask:`${m(M + N)} là đường trung bình của tam giác ${m(s + a + d)} nên ${m(`${M}${N} =`)}`, tpl:'[_]', ans:[K], hint:`MN = AD/2 với AD = ${2 * K}.`}]});
};

/* ---------- Dạng 5. Đường trung bình, định lí Thales trong tứ diện ---------- */
const TETS = [['A', 'B', 'C', 'D'], ['S', 'A', 'B', 'C'], ['E', 'F', 'G', 'H']];
const tp = (L, c) => TET0[L.indexOf(c)];
const tetHidTri = (L, a, b, c) => { const s = [a, b, c].map(k => L.indexOf(k)).sort().join(''); return s === '013' || s === '123'; };
const g11e = lv => {
  const L = pick(TETS), [v, x, y, z] = L;
  if(lv === 1){
    const t = R(0, 2);
    if(t < 2){
      const [p, q, r, s2] = t === 0 ? [v, x, y, z] : shuffle(L);
      const hid = tetHidTri(L, p, q, r), seg = hid ? {d:[['M', 'N']]} : {s:[['M', 'N']]};
      const f = tetFig(L, {pts:{M:mid(tp(L, p), tp(L, q)), N:mid(tp(L, p), tp(L, r))}, ...seg});
      const good = q + r, bads = [q + s2, r + s2, p + s2];
      return mc10(`Cho tứ diện ${m(L.join(''))}. Gọi ${m('M')}, ${m('N')} lần lượt là trung điểm của ${m(p + q)} và ${m(p + r)}. Đường thẳng ${m('MN')} song song với đường thẳng`, m(good), bads.map(e => m(e)),
        `MN là đường trung bình của tam giác ${p}${q}${r}.`, `${m('MN')} là đường trung bình của tam giác ${m(p + q + r)} nên ${m(`MN \\parallel ${q}${r}`)} và ${m(`MN = \\dfrac{1}{2}${q}${r}`)}. Đáp án: ${tb(good)}.`, f);
    }
    const [p, q, r, s2] = L, f = tetFig(L, {pts:{M:mid(tp(L, p), tp(L, q)), N:mid(tp(L, p), tp(L, r)), P:mid(tp(L, p), tp(L, s2))}, s:[['M', 'N'], ['N', 'P']], d:[['M', 'P']]});
    const a = R(2, 6) * 2, b = R(2, 6) * 2, c = R(2, 6) * 2;
    return QB({text:`Cho tứ diện ${m(L.join(''))} có ${m(`${q}${r} = ${a}`)}, ${m(`${r}${s2} = ${b}`)}, ${m(`${q}${s2} = ${c}`)}. Gọi ${m('M')}, ${m('N')}, ${m('P')} lần lượt là trung điểm của ${m(p + q)}, ${m(p + r)}, ${m(p + s2)}. Tính chu vi tam giác ${m('MNP')}.`,
      tpl:'[_]', ans:[(a + b + c) / 2], fig:f, hint:'Mỗi cạnh của tam giác MNP là đường trung bình của một mặt bên.',
      sol:`${m(`MN = \\dfrac{${q}${r}}{2} = ${a / 2}`)}, ${m(`NP = \\dfrac{${r}${s2}}{2} = ${b / 2}`)}, ${m(`MP = \\dfrac{${q}${s2}}{2} = ${c / 2}`)}. Chu vi bằng ${m(`${a / 2} + ${b / 2} + ${c / 2}`)} = ${tb((a + b + c) / 2)}.`});
  }
  if(lv === 2){
    const t = R(0, 2), K = pick([[1, 2], [1, 3], [2, 3], [1, 4], [3, 4], [2, 5], [3, 5]]), den = K[1], num = K[0], BC = den * R(2, 5), ans = BC * num / den;
    const [p, q, r] = [v, x, y], f = tetFig(L, {pts:{M:mid(tp(L, p), tp(L, q), num / den), N:mid(tp(L, p), tp(L, r), num / den)}, s:[['M', 'N']]});
    if(t === 0) return QB({text:`Cho tứ diện ${m(L.join(''))}. Các điểm ${m('M')}, ${m('N')} lần lượt thuộc ${m(p + q)}, ${m(p + r)} sao cho ${m(`\\dfrac{${p}M}{${p}${q}} = \\dfrac{${p}N}{${p}${r}} = \\dfrac{${num}}{${den}}`)}. Biết ${m(`${q}${r} = ${BC}`)}. Tính ${m('MN')}.`, tpl:`${m('MN =')} [_]`, ans:[ans], fig:f,
      hint:'Hai tỉ số bằng nhau suy ra MN song song với cạnh nào? Rồi dùng định lí Thales.', sol:`Theo định lí Thales đảo, ${m(`MN \\parallel ${q}${r}`)}. Do đó ${m(`\\dfrac{MN}{${q}${r}} = \\dfrac{${num}}{${den}}`)}, suy ra ${m(`MN = \\dfrac{${num}}{${den}}\\cdot ${BC}`)} = ${tb(ans)}.`});
    if(t === 1){ const mn = R(2, 9); return QB({text:`Cho tứ diện ${m(L.join(''))}. Gọi ${m('M')}, ${m('N')} lần lượt là trung điểm của ${m(p + q)} và ${m(p + r)}. Biết ${m(`MN = ${mn}`)}. Tính ${m(q + r)}.`, tpl:`${m(`${q}${r} =`)} [_]`, ans:[2 * mn],
      fig:tetFig(L, {pts:{M:mid(tp(L, p), tp(L, q)), N:mid(tp(L, p), tp(L, r))}, s:[['M', 'N']]}), hint:'MN là đường trung bình: MN bằng nửa cạnh đáy tương ứng.', sol:`${m(`MN = \\dfrac{1}{2}${q}${r}`)} nên ${m(`${q}${r} = 2\\cdot ${mn}`)} = ${tb(2 * mn)}.`}); }
    const good = `${m(`MN \\parallel ${q}${r}`)}`;
    return mc10(`Cho tứ diện ${m(L.join(''))}. Các điểm ${m('M')}, ${m('N')} lần lượt thuộc ${m(p + q)}, ${m(p + r)} sao cho ${m(`\\dfrac{${p}M}{${p}${q}} = \\dfrac{${p}N}{${p}${r}} = \\dfrac{${num}}{${den}}`)}. Khẳng định nào sau đây đúng?`, good, [m(`MN \\parallel ${p}${z}`), m(`MN \\parallel ${q}${z}`), m(`MN \\text{ chéo } ${q}${r}`)],
      'Định lí Thales đảo trong tam giác.', `Hai tỉ số bằng nhau nên ${tb(`MN \\parallel ${q}${r}`)} (định lí Thales đảo trong tam giác ${m(p + q + r)}).`, f);
  }
  const t = R(0, 2), [a, b, c, d] = L, MP = {M:mid(TET0[0], TET0[1]), N:mid(TET0[1], TET0[2]), P:mid(TET0[2], TET0[3]), Q:mid(TET0[3], TET0[0])};
  const f = tetFig(L, {pts:MP, s:[['M', 'N'], ['P', 'Q']], d:[['N', 'P'], ['Q', 'M']]});
  const base = `Cho tứ diện ${m(L.join(''))}. Gọi ${m('M')}, ${m('N')}, ${m('P')}, ${m('Q')} lần lượt là trung điểm của ${m(a + b)}, ${m(b + c)}, ${m(c + d)}, ${m(d + a)}.`;
  if(t === 0){
    const cond = pick([['', 'hình bình hành'], [`Biết ${m(`${a}${c} \\perp ${b}${d}`)}.`, 'hình chữ nhật'], [`Biết ${m(`${a}${c} = ${b}${d}`)}.`, 'hình thoi'], [`Biết ${m(`${a}${c} \\perp ${b}${d}`)} và ${m(`${a}${c} = ${b}${d}`)}.`, 'hình vuông']]);
    return QC({text:`${base} ${cond[0] ? cond[0] + ' ' : ''}Tứ giác ${m('MNPQ')} là`, opts:['hình bình hành', 'hình chữ nhật', 'hình thoi', 'hình vuông'], ans:cond[1], keepOrder:true, fig:f,
      hint:`${'MN ∥ PQ ∥ ' + a + c}; ${'NP ∥ MQ ∥ ' + b + d}. Xét thêm quan hệ giữa ${a + c} và ${b + d}.`,
      sol:`${m(`MN \\parallel ${a}${c}`)}, ${m(`QP \\parallel ${a}${c}`)} nên ${m('MN \\parallel QP')} và ${m(`MN = QP = \\dfrac{${a}${c}}{2}`)}; do đó ${m('MNPQ')} là hình bình hành. Hai cạnh kề ${m('MN')}, ${m('NP')} lần lượt song song và bằng nửa ${m(a + c)}, ${m(b + d)}. Kết luận: ${tw(cond[1])}.`});
  }
  if(t === 1){
    const x1 = R(3, 9) * 2, y1 = R(3, 9) * 2;
    return QB({text:`${base} Biết ${m(`${a}${c} = ${x1}`)} và ${m(`${b}${d} = ${y1}`)}. Tính chu vi tứ giác ${m('MNPQ')}.`, tpl:'[_]', ans:[x1 + y1], fig:f,
      hint:'MNPQ là hình bình hành; mỗi cạnh là đường trung bình của một mặt.', sol:`${m(`MN = PQ = \\dfrac{${a}${c}}{2} = ${x1 / 2}`)}, ${m(`NP = MQ = \\dfrac{${b}${d}}{2} = ${y1 / 2}`)}. Chu vi bằng ${m(`2\\,(${x1 / 2} + ${y1 / 2})`)} = ${tb(x1 + y1)}.`});
  }
  return QS({text:`${base} Chứng minh ${m('MNPQ')} là hình bình hành.`, fig:f, direct:true,
    hint:'Dùng đường trung bình của hai tam giác chung cạnh AC.', sol:`${m('MN')} là đường trung bình của tam giác ${m(a + b + c)} nên ${m(`MN \\parallel ${a}${c}`)}, ${m(`MN = \\dfrac{1}{2}${a}${c}`)}. ${m('QP')} là đường trung bình của tam giác ${m(a + c + d)} nên ${m(`QP \\parallel ${a}${c}`)}, ${m(`QP = \\dfrac{1}{2}${a}${c}`)}. Suy ra ${m('MN \\parallel QP')} và ${m('MN = QP')}, vậy ${tw('MNPQ là hình bình hành')}.`,
    steps:[
      {tag:'Kế hoạch', ask:`${m('MN')} là đường trung bình của tam giác ${m(a + b + c)}, nên`, opts:[m(`MN \\parallel ${a}${c}`), m(`MN \\parallel ${b}${d}`), m(`MN \\parallel ${a}${b}`), m(`MN \\parallel ${b}${c}`)], ans:m(`MN \\parallel ${a}${c}`), hint:'MN nối trung điểm AB và BC; cạnh còn lại của tam giác là AC.'},
      {tag:'Giải', ask:`${m('QP')} là đường trung bình của tam giác ${m(a + c + d)}. So sánh ${m('MN')} và ${m('QP')}:`, opts:[m('MN \\parallel QP,\\ MN = QP'), m('MN \\perp QP'), m('MN \\text{ cắt } QP'), m('MN = 2QP')], ans:m('MN \\parallel QP,\\ MN = QP'), hint:`Cả hai cùng song song và bằng nửa ${a + c}.`},
      {tag:'Đáp số', ask:`Tứ giác ${m('MNPQ')} có hai cạnh đối song song và bằng nhau nên là`, opts:['hình bình hành', 'hình thang cân', 'hình chữ nhật', 'hình thoi'], ans:'hình bình hành', hint:'Dấu hiệu nhận biết hình bình hành.'}]});
};

/* ---------- Dạng 6. Chứng minh song song, đồng phẳng trong hình chóp ---------- */
const g11f = lv => {
  const L = pick([PYL[0], PYL[1]]), [s, a, b, c, d] = L, M = 'M', N = 'N';
  const Mp = mid(PG0[0], PG0[1]), Np = mid(PG0[0], PG0[2]);
  const f1 = pgFig(L, {pts:{M:Mp, N:Np}, s:[['M', 'N']]});
  const f2 = pgFig(L, {pts:{M:Mp, N:Np}, s:[['M', 'N'], ['N', c]], d:[['M', d]]});
  const base = `Cho hình chóp ${m(`${s}.${a}${b}${c}${d}`)} có đáy ${m(`${a}${b}${c}${d}`)} là hình bình hành. Gọi ${m(M)}, ${m(N)} lần lượt là trung điểm của ${m(s + a)} và ${m(s + b)}.`;
  if(lv === 1){
    const t = R(0, 2);
    if(t === 0){ const good = pick([a + b, c + d]);
      return mc10(`${base} Đường thẳng ${m('MN')} song song với đường thẳng`, m(good), [a + d, b + c, a + c].map(e => m(e)), `MN là đường trung bình của tam giác ${s}${a}${b}; ${a}${b}${c}${d} là hình bình hành.`,
        `${m('MN')} là đường trung bình của tam giác ${m(s + a + b)} nên ${m(`MN \\parallel ${a}${b}`)}; mà ${m(`${a}${b} \\parallel ${c}${d}`)}. Do đó ${m('MN')} song song với ${tb(good)}.`, f1); }
    if(t === 1) return QC({text:`${base} Tứ giác ${m(`${M}${N}${c}${d}`)} là hình gì?`, opts:['hình thang', 'hình bình hành', 'hình chữ nhật', 'hình thoi'], ans:'hình thang', keepOrder:true, fig:f2,
      hint:`MN ∥ CD. Hai đáy có bằng nhau không?`, sol:`${m(`MN \\parallel ${a}${b} \\parallel ${c}${d}`)} và ${m(`MN = \\dfrac{1}{2}${a}${b} = \\dfrac{1}{2}${c}${d}`)}, khác ${m(c + d)}. Tứ giác có hai cạnh song song nhưng không bằng nhau: ${tw('hình thang')}.`});
    return mc10(`${base} Bốn điểm ${m(`${M},\\ ${N},\\ ${c},\\ ${d}`)}`, 'cùng thuộc một mặt phẳng', ['không cùng thuộc một mặt phẳng', 'thẳng hàng', 'là bốn đỉnh của một tứ diện'], `MN và CD song song thì xác định mấy mặt phẳng?`,
      `${m(`MN \\parallel ${c}${d}`)} nên hai đường thẳng này xác định một mặt phẳng: bốn điểm ${tw('cùng thuộc một mặt phẳng')}.`, f2);
  }
  if(lv === 2){
    const t = R(0, 2);
    if(t === 0){ const k = R(3, 10), ab = 2 * k; return QB({text:`${base} Biết ${m(`${a}${b} = ${ab}`)}. Tính ${m('MN')}.`, tpl:`${m('MN =')} [_]`, ans:[k], fig:f1, hint:'MN là đường trung bình của tam giác SAB.', sol:`${m(`MN = \\dfrac{1}{2}${a}${b} = ${k}`)} = ${tb(k)}.`}); }
    if(t === 1){ const pk = pick([[`(${M}${N}${c}${d})`, `(${s}${a}${d})`, M + d], [`(${M}${N}${c}${d})`, `(${s}${b}${c})`, N + c]]);
      return mc10(`${base} Giao tuyến của hai mặt phẳng ${m(pk[0])} và ${m(pk[1])} là đường thẳng`, m(pk[2]), [m(M + N), m(c + d), m(s + a)], `Tìm hai điểm chung của hai mặt phẳng.`,
        `${m(pk[0])} và ${m(pk[1])} có hai điểm chung ${m(pk[2].split('').join(','))}, nên giao tuyến là ${tb(pk[2])}.`, f2); }
    return mc10(`${base} Gọi ${m('I')} là giao điểm của ${m(M + d)} và ${m(N + c)}. Khi đó ${m('I')} thuộc giao tuyến của hai mặt phẳng ${m(`(${s}${a}${d})`)} và ${m(`(${s}${b}${c})`)}, giao tuyến này song song với`, m(a + d), [m(a + b), m(s + a), m(a + c)],
      `${a + d} ⊂ (${s}${a}${d}), ${b + c} ⊂ (${s}${b}${c}) và hai đường này song song.`, `${m(`${a}${d} \\parallel ${b}${c}`)}, nên giao tuyến của hai mặt phẳng chứa chúng (đi qua ${m(s)} và ${m('I')}) song song với ${tb(a + d)}.`, f2);
  }
  const t = R(0, 1);
  if(t === 0) return QS({text:`${base} Gọi ${m('I')} là giao điểm của ${m(M + d)} và ${m(N + c)}. Chứng minh ${m(`${s}I \\parallel ${a}${d}`)}.`, fig:f2, direct:true,
    hint:'Dùng định lí về giao tuyến của ba mặt phẳng (SAD), (SBC), (MNCD).',
    sol:`${m(`MN \\parallel ${a}${b} \\parallel ${c}${d}`)} nên ${m(`${M}${N}${c}${d}`)} là hình thang; ${m(M + d)} và ${m(N + c)} cắt nhau tại ${m('I')}. ${m('I')} ∈ ${m(M + d)} ⊂ ${m(`(${s}${a}${d})`)} và ${m('I')} ∈ ${m(N + c)} ⊂ ${m(`(${s}${b}${c})`)}, nên ${m('I')} thuộc giao tuyến của hai mặt phẳng này. ${m(s)} cũng là điểm chung, giao tuyến là ${m(s + 'I')}. Vì ${m(`${a}${d} \\parallel ${b}${c}`)} nên ${tb(`${s}I \\parallel ${a}${d}`)}.`,
    steps:[
      {tag:'Kế hoạch', ask:`Xét ba mặt phẳng ${m(`(${s}${a}${d})`)}, ${m(`(${s}${b}${c})`)} và`, opts:[m(`(${M}${N}${c}${d})`), m(`(${a}${b}${c}${d})`), m(`(${s}${a}${b})`), m(`(${s}${c}${d})`)], ans:m(`(${M}${N}${c}${d})`), hint:`Mặt phẳng chứa M, N, C, D (MN ∥ CD).`},
      {tag:'Giải', ask:`Giao tuyến của ${m(`(${s}${a}${d})`)} và ${m(`(${M}${N}${c}${d})`)} là`, opts:[m(M + d), m(N + c), m(s + d), m(M + N)], ans:m(M + d), hint:`Hai điểm chung của hai mặt phẳng là M và D.`},
      {tag:'Đáp số', ask:`Giao tuyến ${m(s + 'I')} của ${m(`(${s}${a}${d})`)} và ${m(`(${s}${b}${c})`)} song song với`, opts:[m(a + d), m(a + b), m(s + a), m(a + c)], ans:m(a + d), hint:`AD và BC nằm trong hai mặt phẳng và song song nhau.`}]});
  return QS({text:`${base} Chứng minh bốn điểm ${m(`${M},\\ ${N},\\ ${c},\\ ${d}`)} cùng thuộc một mặt phẳng và ${m(`${M}${N}${c}${d}`)} là hình thang.`, fig:f2, direct:true,
    hint:'Chứng minh MN song song với CD bằng đường trung bình và bắc cầu.',
    sol:`${m('MN')} là đường trung bình của tam giác ${m(s + a + b)} nên ${m(`MN \\parallel ${a}${b}`)}. Mà ${m(`${a}${b} \\parallel ${c}${d}`)} (hình bình hành). Theo tính chất bắc cầu ${m(`MN \\parallel ${c}${d}`)}, nên ${m(M)}, ${m(N)}, ${m(c)}, ${m(d)} cùng thuộc một mặt phẳng. Tứ giác ${m(`${M}${N}${c}${d}`)} có ${m(`MN \\parallel ${c}${d}`)}, ${m(`MN = \\dfrac{1}{2}${c}${d}`)} nên là ${tw('hình thang')}.`,
    steps:[
      {tag:'Kế hoạch', ask:`${m('MN')} là đường trung bình của tam giác ${m(s + a + b)}, nên`, opts:[m(`MN \\parallel ${a}${b}`), m(`MN \\parallel ${a}${d}`), m(`MN \\parallel ${s}${c}`), m(`MN \\parallel ${b}${c}`)], ans:m(`MN \\parallel ${a}${b}`), hint:'MN nối trung điểm SA và SB.'},
      {tag:'Giải', ask:`Vì ${m(`${a}${b} \\parallel ${c}${d}`)}, theo tính chất bắc cầu:`, opts:[m(`MN \\parallel ${c}${d}`), m(`MN \\perp ${c}${d}`), m(`MN \\text{ cắt } ${c}${d}`), m(`MN \\text{ chéo } ${c}${d}`)], ans:m(`MN \\parallel ${c}${d}`), hint:'Hai đường cùng song song với AB.'},
      {tag:'Đáp số', ask:`Tứ giác ${m(`${M}${N}${c}${d}`)} có hai cạnh song song nhưng không bằng nhau, nên là`, opts:['hình thang', 'hình bình hành', 'hình thoi', 'hình chữ nhật'], ans:'hình thang', keepOrder:true, hint:`MN = AB/2 = CD/2.`}]});
};

const K11KT = [
  {t:'Vị trí tương đối của hai đường thẳng trong không gian', b:`Hai đường thẳng phân biệt có đúng một trong ba vị trí: <ul><li><b>cắt nhau</b>: có đúng một điểm chung (đồng phẳng);</li><li><b>song song</b>: đồng phẳng và không có điểm chung;</li><li><b>chéo nhau</b>: <b>không</b> cùng nằm trong một mặt phẳng (không có điểm chung và không song song).</li></ul>Hai đường thẳng song song hoặc cắt nhau xác định một mặt phẳng; hai đường thẳng chéo nhau thì không có mặt phẳng nào chứa cả hai.`,
    warn:'Không có điểm chung chưa chắc là song song: còn có thể chéo nhau. Hai đường thẳng cùng vuông góc với đường thứ ba cũng không suy ra song song.', ex:'Muốn chứng minh chéo nhau: chỉ ra bốn điểm (hai điểm trên mỗi đường) không đồng phẳng.'},
  {t:'Tính chất của hai đường thẳng song song', b:`<ul><li>Qua một điểm nằm ngoài đường thẳng ${tm('d')} có <b>duy nhất</b> một đường thẳng song song với ${tm('d')}.</li><li>Hai đường thẳng phân biệt cùng song song với đường thẳng thứ ba thì song song với nhau (<b>bắc cầu</b>): ${tm('a \\parallel c,\\ b \\parallel c \\Rightarrow a \\parallel b')}.</li></ul>`,
    warn:'Tính chất bắc cầu cần ba đường thẳng phân biệt; hai đường song song với cùng đường thứ ba có thể trùng nhau.', ex:'Trong hình hộp, hình lăng trụ: các cạnh bên đôi một song song; cạnh đáy song song cạnh tương ứng của đáy kia.'},
  {t:'Định lí về giao tuyến của ba mặt phẳng', b:`Nếu ba mặt phẳng phân biệt đôi một cắt nhau theo ba giao tuyến phân biệt thì ba giao tuyến đó hoặc <b>đồng quy</b>, hoặc <b>đôi một song song</b>.<br><b>Hệ quả:</b> hai mặt phẳng phân biệt lần lượt chứa hai đường thẳng song song thì giao tuyến của chúng (nếu có) song song với hai đường thẳng đó hoặc trùng với một trong hai.`,
    warn:'Hệ quả chỉ dùng khi hai mặt phẳng cắt nhau và mỗi mặt phẳng chứa một trong hai đường song song.', ex:`Ví dụ ${tm('S.ABCD')} có ${tm('AB \\parallel CD')}: giao tuyến của ${tm('(SAB)')} và ${tm('(SCD)')} là đường thẳng qua ${tm('S')} song song với ${tm('AB')}.`},
  {t:'Cách chứng minh hai đường thẳng song song', b:`<ul><li>Dùng <b>đường trung bình</b> của tam giác: ${tm('MN \\parallel BC,\\ MN = \\dfrac{1}{2}BC')}.</li><li>Dùng <b>định lí Thales đảo</b>: ${tm('\\dfrac{AM}{AB} = \\dfrac{AN}{AC} \\Rightarrow MN \\parallel BC')}.</li><li>Dùng <b>hình bình hành</b>, hình thang, tính chất bắc cầu.</li><li>Dùng <b>hệ quả</b> của định lí giao tuyến.</li></ul>`,
    warn:'Đường trung bình của tam giác nằm trong mặt phẳng của tam giác; đừng nhầm MN song song với cạnh của tam giác khác.', ex:'Gặp “trung điểm” trong tứ diện, hình chóp: nghĩ ngay đến đường trung bình, rồi bắc cầu qua các cạnh song song của đáy.'}
];

lesson(5, 'hai-dt-song-song', 'Bài 11. Hai đường thẳng song song', 'Vị trí tương đối, tính chất song song, định lí giao tuyến, đường trung bình trong không gian.', [g11a, g11b, g11c, g11d, g11e, g11f], {introTitle:'Kiến thức cần nhớ · Chỗ dễ sai · Mẹo', intro:K11KT});

/* =====================================================================
   Bài 12. Đường thẳng và mặt phẳng song song  (SGK KNTT Toán 11, Chương IV)
   Chủ đề 5 · bài `dt-mp-song-song` · 6 dạng × 3 mức; quan hệ đường–mặt tính từ TỌA ĐỘ 3D thật
   ===================================================================== */
const RELP = {in:'nằm trong mặt phẳng', cut:'cắt mặt phẳng', par:'song song với mặt phẳng'};
const RELPO = [RELP.cut, RELP.par, RELP.in];
const facesOf = S => S.kind === 'tet' ? S.L.map((_, i) => S.L.filter((_, k) => k !== i))
  : (S.kind === 'pyp' || S.kind === 'pyt') ? [[S.L[1], S.L[2], S.L[3], S.L[4]], [S.L[0], S.L[1], S.L[2]], [S.L[0], S.L[2], S.L[3]], [S.L[0], S.L[3], S.L[4]], [S.L[0], S.L[4], S.L[1]]]
  : S.kind === 'cube' ? [['A', 'B', 'C', 'D'], ["A'", "B'", "C'", "D'"], ['A', 'B', "B'", "A'"], ['B', 'C', "C'", "B'"], ['C', 'D', "D'", "C'"], ['D', 'A', "A'", "D'"]]
  : [['A', 'B', 'C'], ["A'", "B'", "C'"], ['A', 'B', "B'", "A'"], ['B', 'C', "C'", "B'"], ['C', 'A', "A'", "C'"]];
const fName = F => `(${F.join('')})`;
const lpRel = (S, e, F) => {
  const [p, q, r] = F.slice(0, 3).map(k => S.co[k]), n = X3(V3(q, p), V3(r, p));
  const d1 = D3(n, V3(S.co[e[0]], p)), d2 = D3(n, V3(S.co[e[1]], p));
  if(d1 === 0 && d2 === 0) return 'in';
  if(d1 === 0 || d2 === 0) return 'cut';
  return d1 === d2 ? 'par' : 'cut';
};
const lpPairs = (S, k) => { const r = []; S.ed.forEach(e => facesOf(S).forEach(F => { if(lpRel(S, e, F) === k) r.push([e, F]); })); return r; };
const facesRel = (S, e, k) => facesOf(S).filter(F => lpRel(S, e, F) === k);
const edgesParFace = (S, F) => S.ed.filter(e => lpRel(S, e, F) === 'par');
const figSP = (S, es, F) => figS(S, es, {fill:F ? [F] : undefined});
{
  const T = solid('tet', ['A', 'B', 'C', 'D']), P = solid('pyp', ['S', 'A', 'B', 'C', 'D']), C = solid('cube'), R3 = solid('prism');
  e10(lpPairs(T, 'in').length === 12 && lpPairs(T, 'par').length === 0, 'tứ diện cạnh–mặt');
  e10(lpPairs(P, 'par').length === 4, 'chóp đáy hbh cạnh–mặt song song');
  e10(lpPairs(C, 'par').length === 24 && lpPairs(C, 'in').length === 24 && lpPairs(C, 'cut').length === 24, 'lập phương cạnh–mặt');
  e10(lpPairs(R3, 'par').length === 9 && lpPairs(R3, 'in').length === 18 && lpPairs(R3, 'cut').length === 18, 'lăng trụ cạnh–mặt');
}
const lpQ = (S, e, F, hint) => {
  const k = lpRel(S, e, F), common = e.filter(p => F.includes(p));
  const why = k === 'in' ? `Hai đầu mút ${m(e.join(',\\ '))} đều thuộc ${m(fName(F))} nên ${m(eName(e))} ${tw('nằm trong mặt phẳng')}.`
    : k === 'cut' ? (common.length ? `${m(eName(e))} có điểm chung ${m(common[0])} với ${m(fName(F))} và không nằm trong mặt phẳng đó nên ${tw('cắt mặt phẳng')}.` : `${m(eName(e))} không nằm trong ${m(fName(F))} và không song song với đường thẳng nào của mặt phẳng nên ${tw('cắt mặt phẳng')} (tại điểm ngoài đoạn thẳng).`)
    : `${m(eName(e))} ⊄ ${m(fName(F))} và song song với một đường thẳng nằm trong ${m(fName(F))}, nên ${tw('song song với mặt phẳng')}.`;
  return QC({text:`Cho ${S.title}. Vị trí tương đối của đường thẳng ${m(eName(e))} và mặt phẳng ${m(fName(F))} là`, opts:RELPO, ans:RELP[k], keepOrder:true, fig:figSP(S, [e], F), hint, sol:why});
};

/* ---------- Dạng 1. Vị trí tương đối của đường thẳng và mặt phẳng ---------- */
const g12a = lv => {
  if(lv === 1){
    const t = R(0, 3), d = pick(['d', 'a', 'b']), P = pick(PL);
    if(t === 0) return mc10(`Đường thẳng ${m(d)} và mặt phẳng ${m(P.t)} có đúng một điểm chung. Khi đó`, `${m(d)} cắt ${m(P.t)}`, [`${m(d)} song song với ${m(P.t)}`, `${m(d)} nằm trong ${m(P.t)}`, `${m(d)} trùng với ${m(P.t)}`],
      'Một điểm chung duy nhất: đường thẳng đâm xuyên qua mặt phẳng.', `Có đúng một điểm chung nên ${m(d)} ${tw('cắt')} ${m(P.t)}.`);
    if(t === 1) return mc10(`Đường thẳng ${m(d)} và mặt phẳng ${m(P.t)} không có điểm chung. Khi đó`, `${m(d)} song song với ${m(P.t)}`, [`${m(d)} cắt ${m(P.t)}`, `${m(d)} nằm trong ${m(P.t)}`, `${m(d)} vuông góc với ${m(P.t)}`],
      'Không có điểm chung là định nghĩa của song song.', `Theo định nghĩa: ${tw('đường thẳng song song mặt phẳng')} khi chúng không có điểm chung.`);
    if(t === 2) return mc10(`Đường thẳng ${m(d)} có ít nhất hai điểm chung phân biệt với mặt phẳng ${m(P.t)}. Khi đó`, `${m(d)} nằm trong ${m(P.t)}`, [`${m(d)} song song với ${m(P.t)}`, `${m(d)} cắt ${m(P.t)} tại hai điểm`, `${m(d)} cắt ${m(P.t)} tại đúng một điểm`],
      'Nhớ tính chất 3: hai điểm phân biệt của đường thẳng thuộc mặt phẳng.', `Tính chất 3 cho ${m(d)} ⊂ ${m(P.t)}: ${tw('đường thẳng nằm trong mặt phẳng')}.`);
    const S = mk('tet'), e = pick(S.ed), F = pick(facesOf(S));
    return lpQ(S, e, F, 'Hai đầu mút của cạnh có cùng thuộc mặt phẳng hay không? Cạnh có chung đỉnh với mặt thì chỉ có thể nằm trong hoặc cắt.');
  }
  if(lv === 2){
    const S = mk(pick(['pyp', 'pyt'])), k = S.kind === 'pyt' ? pick(['cut', 'in', 'par']) : pick(['par', 'par', 'cut', 'in']), pr = pick(lpPairs(S, k));
    return lpQ(S, pr[0], pr[1], 'Cạnh có song song với một đường thẳng nằm trong mặt phẳng và không nằm trong mặt phẳng đó không? Nhớ cặp cạnh đối của đáy.');
  }
  const t = R(0, 2);
  if(t < 2){
    const S = mk(pick(['cube', 'prism'])), k = pick(['par', 'par', 'cut', 'in']), pr = pick(lpPairs(S, k));
    return lpQ(S, pr[0], pr[1], 'Tìm trong mặt phẳng một đường thẳng song song với cạnh đã cho (đối diện trong cùng một mặt hoặc cạnh song song).');
  }
  const S = mk('cube'), ds = [];
  for(let i = 0; i < 8; i++) for(let j = i + 1; j < 8; j++){ const dd = V3(S.co[S.L[i]], S.co[S.L[j]]); if(dd[0] * dd[0] + dd[1] * dd[1] + dd[2] * dd[2] === 2) ds.push([S.L[i], S.L[j]]); }
  const e = pick(ds), F = pick(facesOf(S).filter(x => x.length === 4)), k = lpRel(S, e, F);
  return QC({text:`Cho ${S.title}. Vị trí tương đối của đường chéo mặt ${m(eName(e))} và mặt phẳng ${m(fName(F))} là`, opts:RELPO, ans:RELP[k], keepOrder:true, fig:figS(S, [], {h:[e], fill:[F]}),
    hint:'Xét xem đường chéo có song song với một đường thẳng (cạnh hoặc đường chéo) nằm trong mặt phẳng không.',
    sol:k === 'in' ? `${m(eName(e))} là đường chéo của một mặt nằm trong ${m(fName(F))}: ${tw('nằm trong mặt phẳng')}.` : k === 'par' ? `${m(eName(e))} song song với đường chéo của mặt đối diện thuộc ${m(fName(F))} và không nằm trong mặt phẳng đó: ${tw('song song với mặt phẳng')}.` : `${m(eName(e))} có đúng một điểm chung với ${m(fName(F))}: ${tw('cắt mặt phẳng')}.`});
};

/* ---------- Dạng 2. Điều kiện song song và tính chất ---------- */
const STP = [
  [true, 'Nếu đường thẳng d song song với mặt phẳng (P) thì trong (P) có đường thẳng song song với d', 'Đây là hệ quả của định nghĩa và tính chất.'],
  [true, 'Nếu d không nằm trong (P) và d song song với một đường thẳng nằm trong (P) thì d song song với (P)', 'Đây là điều kiện song song.'],
  [true, 'Nếu a song song với (P) và (Q) chứa a cắt (P) theo giao tuyến b thì a song song với b', 'Đây là tính chất của đường thẳng song song mặt phẳng.'],
  [true, 'Nếu a song song với cả hai mặt phẳng cắt nhau (P) và (Q) thì a song song với giao tuyến của hai mặt phẳng đó', 'Đây là hệ quả.'],
  [false, 'Nếu d song song với một đường thẳng nằm trong (P) thì d song song với (P)', 'Thiếu điều kiện d không nằm trong (P): d có thể nằm trong (P).'],
  [false, 'Nếu d song song với (P) thì d song song với mọi đường thẳng nằm trong (P)', 'Có những đường thẳng trong (P) chéo với d.'],
  [false, 'Hai đường thẳng cùng song song với một mặt phẳng thì song song với nhau', 'Chúng có thể cắt nhau hoặc chéo nhau.'],
  [false, 'Nếu d song song với (P) thì d song song với mọi mặt phẳng chứa d', 'Mặt phẳng chứa d cắt (P) vẫn chứa d, d không song song với mặt phẳng chứa nó.']
];
const g12b = lv => {
  if(lv === 1){
    const t = R(0, 2);
    if(t === 0) return mc10('Muốn chứng minh đường thẳng d song song với mặt phẳng (P) ta cần chứng minh', 'd không nằm trong (P) và d song song với một đường thẳng nằm trong (P)', ['d song song với mọi đường thẳng nằm trong (P)', 'd song song với một đường thẳng bất kì', 'd và (P) có đúng một điểm chung'],
      'Nhớ hai điều kiện: không nằm trong và song song với một đường trong mặt phẳng.', `Điều kiện song song: ${tw('d ⊄ (P)')} và ${tw('d ∥ d′ ⊂ (P)')}.`);
    if(t === 1) return mc10('Cho đường thẳng d song song với mặt phẳng (P). Số đường thẳng nằm trong (P) và song song với d là', 'vô số', ['không có', 'đúng một', 'đúng hai'], 'Dựng các đường song song với d trong (P).', `Trong ${m('(P)')} lấy một điểm bất kì, qua đó kẻ đường thẳng song song với ${m('d')} nằm trong ${m('(P)')}: có ${tw('vô số')} đường như vậy.`);
    const S = mk(pick(['pyp', 'cube'])), pr = pick(lpPairs(S, 'par'));
    return QC({text:`Cho ${S.title}. Đường thẳng ${m(eName(pr[0]))} song song với mặt phẳng nào sau đây?`, opts:[pr[1], ...shuffle(facesOf(S).filter(F => lpRel(S, pr[0], F) !== 'par')).slice(0, 3)].map(F => m(fName(F))), ans:m(fName(pr[1])), fig:figSP(S, [pr[0]], pr[1]),
      hint:'Tìm mặt chứa một đường thẳng song song với cạnh đã cho nhưng không chứa cạnh đó.', sol:`${m(eName(pr[0]))} song song với một cạnh nằm trong ${m(fName(pr[1]))} và không nằm trong mặt phẳng đó, nên ${tb(`${eName(pr[0])} \\parallel ${fName(pr[1])}`)}.`});
  }
  if(lv === 2){
    const t = R(0, 2);
    if(t === 0){
      const S = mk(pick(['cube', 'prism', 'pyp'])), e = pick(S.ed.filter(x => facesRel(S, x, 'par').length)), good = pick(facesRel(S, e, 'par'));
      const bad = shuffle(facesOf(S).filter(F => lpRel(S, e, F) !== 'par')).slice(0, 3);
      return QC({text:`Cho ${S.title}. Mặt phẳng nào sau đây song song với đường thẳng ${m(eName(e))}?`, opts:[good, ...bad].map(F => m(fName(F))), ans:m(fName(good)), fig:figSP(S, [e], good),
        hint:'Loại các mặt chứa cạnh hoặc có điểm chung với cạnh.', sol:`${m(fName(good))} không chứa ${m(eName(e))} và chứa một đường thẳng song song với ${m(eName(e))}: ${tw('đúng')}. Các mặt còn lại chứa hoặc cắt ${m(eName(e))}.`});
    }
    if(t === 1){
      const S = mk(pick(['cube', 'prism'])), F = pick(facesOf(S)), n = edgesParFace(S, F).length;
      return QB({text:`Cho ${S.title}. Có bao nhiêu cạnh của hình song song với mặt phẳng ${m(fName(F))}?`, tpl:'[_]', ans:[n], fig:figSP(S, [], F),
        hint:'Cạnh song song với mặt phẳng là cạnh không có điểm chung với mặt đó và song song với một cạnh của mặt.', sol:`Các cạnh song song với ${m(fName(F))}: ${edgesParFace(S, F).map(x => m(eName(x))).join(', ')}. Có ${tb(n)} cạnh.`});
    }
    const S = mk('pyp'), [s, a, b, c, d] = S.L, F = [s, b, c], good = m(a + d), bads = [m(a + b), m(s + a), m(c + d)];
    return QC({text:`Cho ${S.title}. Đường thẳng nào sau đây song song với mặt phẳng ${m(fName(F))}?`, opts:[good, ...bads], ans:good, fig:figSP(S, [[a, d]], F),
      hint:'Tìm đường thẳng song song với một cạnh của tam giác SBC mà không đi qua S, B, C.', sol:`${m(`${a}${d} \\parallel ${b}${c}`)}, ${m(b + c)} ⊂ ${m(fName(F))}, ${m(a + d)} ⊄ ${m(fName(F))} nên ${tb(`${a}${d} \\parallel ${fName(F)}`)}. Các đường ${m(a + b)}, ${m(s + a)}, ${m(c + d)} đều có điểm chung với mặt phẳng này (tại ${m(b)}, ${m(s)}, ${m(c)}).`});
  }
  const t = R(0, 2);
  if(t === 0){
    const ask = pick([true, false]), T = shuffle(STP), good = T.find(x => x[0] === ask), bads = T.filter(x => x[0] !== ask).slice(0, 3);
    return mc10(ask ? 'Mệnh đề nào sau đây đúng?' : 'Mệnh đề nào sau đây sai?', good[1], bads.map(x => x[1]), 'Tìm phản ví dụ trên hình hộp, hình chóp cho các phương án.', `${good[1]}: ${ask ? 'đúng' : 'sai'}. ${good[2]}`);
  }
  if(t === 1){
    const S = mk('pyp'), [s, a, b, c, d] = S.L, f = figS(S, [[a, d]], {fill:[[s, b, c]]});
    return QS({text:`Cho ${S.title}. Chứng minh ${m(a + d)} song song với mặt phẳng ${m(`(${s + b + c})`)}.`, fig:f, direct:true,
      hint:'Tìm trong (SBC) một đường thẳng song song với AD; nhớ kiểm tra AD không nằm trong (SBC).',
      sol:`${m(`${a}${d} \\parallel ${b}${c}`)} (cạnh đối của hình bình hành) và ${m(b + c)} ⊂ ${m(`(${s + b + c})`)}. ${m(a + d)} không nằm trong ${m(`(${s + b + c})`)} (vì ${m(a)} không thuộc mặt phẳng đó). Vậy ${tb(`${a}${d} \\parallel (${s}${b}${c})`)}.`,
      steps:[
        {tag:'Kế hoạch', ask:`Chọn đường thẳng nằm trong ${m(`(${s + b + c})`)} và song song với ${m(a + d)}:`, opts:[m(b + c), m(s + b), m(s + c), m(b + d)], ans:m(b + c), hint:'Cạnh đối của AD trong hình bình hành.'},
        {tag:'Giải', ask:`Điều kiện còn lại để kết luận ${m(a + d)} song song mặt phẳng:`, opts:[m(`${a}${d} \\not\\subset (${s}${b}${c})`), m(`${a}${d} \\perp ${b}${c}`), m(`${a}${d} = ${b}${c}`), m(`${s}${a} \\parallel ${b}${c}`)], ans:m(`${a}${d} \\not\\subset (${s}${b}${c})`), hint:'Đường thẳng không được nằm trong mặt phẳng.'},
        {tag:'Đáp số', ask:`Kết luận: ${m(a + d)} và ${m(`(${s + b + c})`)}`, opts:['song song', 'cắt nhau', 'AD nằm trong mặt phẳng', 'vuông góc'], ans:'song song', keepOrder:true, hint:'Hai điều kiện đã thỏa.'}]});
  }
  const S = mk('cube'), vs = shuffle(['A', 'B', 'C', 'D']).slice(0, 1)[0], e = [vs, vs + "'"], faces = facesOf(S).filter(F => lpRel(S, e, F) === 'par').slice(0, 2);
  e10(faces.length === 2, 'hai mặt song song với cạnh bên');
  const ab = edgesParFace(S, faces[0]).length;
  const inter = S.ed.filter(x => faces[0].includes(x[0]) && faces[0].includes(x[1]) && faces[1].includes(x[0]) && faces[1].includes(x[1]));
  e10(inter.length === 1, 'giao tuyến là một cạnh');
  return QS({text:`Cho ${S.title}. Biết ${m(eName(e))} song song với cả hai mặt phẳng ${m(fName(faces[0]))} và ${m(fName(faces[1]))}. Xác định giao tuyến của hai mặt phẳng đó và nêu quan hệ với ${m(eName(e))}.`, fig:figS(S, [e], {fill:faces}), direct:true,
    hint:'Hệ quả: a song song với hai mặt phẳng cắt nhau thì song song với giao tuyến.',
    sol:`${m(fName(faces[0]))} và ${m(fName(faces[1]))} có chung các đỉnh ${m(inter[0].join(',\\ '))} nên giao tuyến là ${m(eName(inter[0]))}. Vì ${m(eName(e))} song song với cả hai mặt phẳng nên ${tb(`${eName(inter[0])} \\parallel ${eName(e)}`)}.`,
    steps:[
      {tag:'Kế hoạch', ask:`Hai đỉnh chung của hai mặt phẳng là:`, opts:[m(inter[0].join(',\\ ')), m(`${e[0]},\\ ${e[1]}`), m('A,\\ C'), m(`${faces[0][0]},\\ ${faces[1][2]}`)].filter((x, i, arr) => arr.indexOf(x) === i), ans:m(inter[0].join(',\\ ')), hint:'Đỉnh nào nằm trong cả hai mặt?'},
      {tag:'Giải', ask:`Giao tuyến của hai mặt phẳng là đường thẳng`, opts:[m(eName(inter[0])), m(eName(e)), m('AC'), m("B'D'")].filter((x, i, arr) => arr.indexOf(x) === i), ans:m(eName(inter[0])), hint:'Nối hai điểm chung.'},
      {tag:'Đáp số', ask:`Theo hệ quả, ${m(eName(inter[0]))} và ${m(eName(e))}`, opts:['song song', 'cắt nhau', 'chéo nhau', 'vuông góc'], ans:'song song', keepOrder:true, hint:'a song song hai mặt phẳng cắt nhau.'}]});
};

/* ---------- Dạng 3. Đếm cặp (cạnh, mặt phẳng) ---------- */
const g12c = lv => {
  const NM = {par:'song song với', in:'nằm trong', cut:'cắt'};
  if(lv === 1){
    const t = R(0, 2);
    if(t === 0){ const S = mk('tet'), e = pick(S.ed), n = facesRel(S, e, 'in').length;
      return QB({text:`Cho ${S.title}. Cạnh ${m(eName(e))} nằm trong bao nhiêu mặt của tứ diện?`, tpl:'[_]', ans:[n], fig:figS(S, [e]), hint:'Mỗi cạnh là cạnh chung của hai mặt.', sol:`Cạnh ${m(eName(e))} thuộc hai mặt ${facesRel(S, e, 'in').map(F => m(fName(F))).join(', ')}: ${tb(n)} mặt.`}); }
    if(t === 1){ const S = mk('tet'), e = pick(S.ed), n = facesRel(S, e, 'cut').length;
      return QB({text:`Cho ${S.title}. Cạnh ${m(eName(e))} cắt bao nhiêu mặt phẳng chứa mặt của tứ diện (không kể hai mặt chứa nó)?`, tpl:'[_]', ans:[n], fig:figS(S, [e]), hint:'Tứ diện có 4 mặt; trừ hai mặt chứa cạnh.', sol:`Còn lại ${tb(n)} mặt phẳng: ${facesRel(S, e, 'cut').map(F => m(fName(F))).join(', ')}; cạnh có chung một đầu mút với mỗi mặt này nên cắt chúng.`}); }
    const S = mk('cube'), F = pick(facesOf(S)), n = edgesParFace(S, F).length;
    return QB({text:`Cho ${S.title}. Có bao nhiêu cạnh song song với mặt phẳng ${m(fName(F))}?`, tpl:'[_]', ans:[n], fig:figSP(S, [], F), hint:'Các cạnh của mặt đối diện.', sol:`Có ${tb(n)} cạnh: ${edgesParFace(S, F).map(x => m(eName(x))).join(', ')}.`});
  }
  if(lv === 2){
    const t = R(0, 2);
    if(t === 0){ const S = mk('pyp'), n = lpPairs(S, 'par').length;
      return QB({text:`Cho ${S.title}. Xét các cặp (cạnh, mặt) gồm một trong 8 cạnh và một trong 5 mặt của hình chóp. Có bao nhiêu cặp mà cạnh song song với mặt?`, tpl:'[_]', ans:[n], fig:figS(S, []), hint:'Chỉ có các cạnh đáy: mỗi cạnh đáy song song với một mặt bên.', sol:`Bốn cạnh đáy, mỗi cạnh song song với mặt bên chứa cạnh đối của nó: ${tb(n)} cặp.`}); }
    if(t === 1){ const S = mk('prism'), F = pick(facesOf(S)), k = pick(['par', 'in', 'cut']), n = S.ed.filter(e => lpRel(S, e, F) === k).length;
      return QB({text:`Cho ${S.title}. Có bao nhiêu cạnh của hình lăng trụ ${NM[k]} mặt phẳng ${m(fName(F))}?`, tpl:'[_]', ans:[n], fig:figSP(S, [], F), hint:'Phân loại 9 cạnh theo ba vị trí.', sol:`Các cạnh ${NM[k]} ${m(fName(F))}: ${S.ed.filter(e => lpRel(S, e, F) === k).map(x => m(eName(x))).join(', ')}. Có ${tb(n)} cạnh.`}); }
    const S = mk('pyp'), F = pick(facesOf(S)), k = pick(['par', 'in', 'cut']), n = S.ed.filter(e => lpRel(S, e, F) === k).length;
    return QB({text:`Cho ${S.title}. Có bao nhiêu cạnh của hình chóp ${NM[k]} mặt phẳng ${m(fName(F))}?`, tpl:'[_]', ans:[n], fig:figSP(S, [], F), hint:'Phân loại 8 cạnh theo ba vị trí.', sol:`Các cạnh ${NM[k]} ${m(fName(F))}: ${S.ed.filter(e => lpRel(S, e, F) === k).map(x => m(eName(x))).join(', ')}. Có ${tb(n)} cạnh.`});
  }
  const t = R(0, 2);
  if(t === 0){ const S = mk('cube'), k = pick(['par', 'in', 'cut']), n = lpPairs(S, k).length;
    return QB({text:`Cho ${S.title}. Xét các cặp (cạnh, mặt) gồm một trong 12 cạnh và một trong 6 mặt. Có bao nhiêu cặp mà cạnh ${NM[k]} mặt?`, tpl:'[_]', ans:[n], fig:figS(S, []),
      hint:k === 'in' ? 'Mỗi cạnh nằm trong đúng hai mặt.' : k === 'par' ? 'Mỗi mặt có 4 cạnh song song với nó (các cạnh của mặt đối diện).' : 'Tổng 72 cặp trừ số cặp nằm trong và song song.',
      sol:k === 'in' ? `${m('12\\cdot 2 = 24')}: ${tb(n)} cặp.` : k === 'par' ? `${m('6\\cdot 4 = 24')}: ${tb(n)} cặp.` : `${m('72 - 24 - 24 = 24')}: ${tb(n)} cặp.`}); }
  if(t === 1){ const S = mk('prism'), k = pick(['par', 'in', 'cut']), n = lpPairs(S, k).length;
    return QB({text:`Cho ${S.title}. Xét các cặp (cạnh, mặt) gồm một trong 9 cạnh và một trong 5 mặt. Có bao nhiêu cặp mà cạnh ${NM[k]} mặt?`, tpl:'[_]', ans:[n], fig:figS(S, []),
      hint:'Mỗi cạnh đáy nằm trong 2 mặt, mỗi cạnh bên nằm trong 2 mặt; cạnh song song: cạnh đáy với mặt đáy kia và cạnh bên với mặt bên đối diện.',
      sol:k === 'in' ? `9 cạnh × 2 mặt = ${tb(n)} cặp.` : k === 'par' ? `Cạnh đáy song song mặt đáy kia: 6 cặp; cạnh bên song song mặt bên đối diện: 3 cặp. Tổng ${tb(n)}.` : `${m('45 - 18 - 9 = 18')}: ${tb(n)} cặp.`}); }
  const S = mk('cube'), e = pick(S.ed), a = facesRel(S, e, 'par').length, b = facesRel(S, e, 'in').length, c = facesRel(S, e, 'cut').length;
  e10(a + b + c === 6, 'tổng 6 mặt');
  return QB({text:`Cho ${S.title}. Với cạnh ${m(eName(e))}, gọi ${m('a')}, ${m('b')}, ${m('c')} lần lượt là số mặt song song, số mặt chứa và số mặt cắt cạnh đó. Tính ${m('a + 2b + 3c')}.`, tpl:'[_]', ans:[a + 2 * b + 3 * c], fig:figS(S, [e]),
    hint:'Mỗi cạnh nằm trong 2 mặt, song song 2 mặt, cắt 2 mặt.', sol:`${m(`a = ${a},\\ b = ${b},\\ c = ${c}`)} nên ${m(`a + 2b + 3c = ${a + 2 * b + 3 * c}`)} = ${tb(a + 2 * b + 3 * c)}.`});
};

/* ---------- Dạng 4. Giao tuyến liên quan đến đường thẳng song song mặt phẳng ---------- */
const g12d = lv => {
  if(lv === 1){
    const S = mk('pyp'), [s, a, b, c, d] = S.L, t = R(0, 3);
    const opts = [[a + d, [s, b, c], [s, a, d], 'AD ∥ (SBC)'], [b + c, [s, a, d], [s, b, c], 'BC ∥ (SAD)'], [a + b, [s, c, d], [s, a, b], 'AB ∥ (SCD)'], [c + d, [s, a, b], [s, c, d], 'CD ∥ (SAB)']][t];
    const e = [opts[0][0], opts[0][1]], pe = opts[1], qe = opts[2], line = opts[0];
    const x = line, P = fName(pe), Q = fName(qe);
    return mc10(`Cho ${S.title}. Đường thẳng ${m(line)} song song với mặt phẳng ${m(P)}. Giao tuyến của ${m(P)} và mặt phẳng ${m(Q)} (chứa ${m(line)}) song song với`, m(line), [m(s + a), m(s + b), m(a + c)].filter(y => y !== m(line)).slice(0, 3),
      `Nếu a ∥ (P), (Q) chứa a và cắt (P) thì giao tuyến song song với a.`, `${m(line)} ∥ ${m(P)} và ${m(Q)} chứa ${m(line)}, nên giao tuyến của ${m(P)} và ${m(Q)} song song với ${tb(line)}.`, figSP(S, [[line[0], line[1]]], pe));
  }
  if(lv === 2){
    const S = mk('cube'), e0 = pick([['A', "A'"], ['B', "B'"], ['C', "C'"], ['D', "D'"]]), faces = facesOf(S).filter(F => lpRel(S, e0, F) === 'par').slice(0, 2);
    const inter = S.ed.filter(x => faces[0].includes(x[0]) && faces[0].includes(x[1]) && faces[1].includes(x[0]) && faces[1].includes(x[1]))[0];
    e10(!!inter, 'giao tuyến hai mặt');
    const bads = shuffle(S.ed.filter(x => !sameE(x, inter) && relE(S, x, e0) !== 'par')).slice(0, 3);
    return QC({text:`Cho ${S.title}. Đường thẳng ${m(eName(e0))} song song với cả hai mặt phẳng ${m(fName(faces[0]))} và ${m(fName(faces[1]))}. Giao tuyến của hai mặt phẳng đó là đường thẳng`, opts:[inter, ...bads].map(x => m(eName(x))), ans:m(eName(inter)), fig:figS(S, [e0], {fill:faces}),
      hint:'Đường thẳng song song với hai mặt phẳng cắt nhau thì song song với giao tuyến: tìm cạnh chung của hai mặt.', sol:`Hai mặt phẳng có chung hai đỉnh ${m(inter.join(',\\ '))}, giao tuyến ${tb(eName(inter))}; và ${m(`${eName(inter)} \\parallel ${eName(e0)}`)}.`});
  }
  const S = mk('pyp'), [s, a, b, c, d] = S.L, M = 'M', N = 'N', pr = pick([[2, 5], [1, 3], [2, 3], [3, 4]]), AD = pr[1] * R(2, 4), mn = AD * pr[0] / pr[1];
  const Mp = mid(PG0[0], PG0[1], pr[0] / pr[1]), Np = mid(PG0[0], PG0[4], pr[0] / pr[1]);
  const f = pgFig(S.L, {pts:{[M]:Mp, [N]:Np}, s:[[M, b], [N, c]], d:[[M, N]]});
  return QS({text:`Cho ${S.title}. Điểm ${m(M)} thuộc ${m(s + a)} với ${m(`${s}${M} = \\dfrac{${pr[0]}}{${pr[1]}}${s}${a}`)}. Mặt phẳng ${m(`(${M + b + c})`)} cắt ${m(s + d)} tại ${m(N)}. Biết ${m(`${a}${d} = ${AD}`)}. Tính ${m(M + N)}.`, fig:f, direct:true,
    hint:`BC song song mặt phẳng (SAD); (MBC) chứa BC và cắt (SAD) nên giao tuyến song song BC.`,
    sol:`${m(b + c)} ∥ ${m(a + d)} ⊂ ${m(`(${s + a + d})`)} và ${m(b + c)} ⊄ ${m(`(${s + a + d})`)} nên ${m(`${b}${c} \\parallel (${s}${a}${d})`)}. ${m(`(${M + b + c})`)} chứa ${m(b + c)} và cắt ${m(`(${s + a + d})`)} theo ${m(M + N)}, nên ${m(`${M}${N} \\parallel ${b}${c} \\parallel ${a}${d}`)}. Thales: ${m(`\\dfrac{${M}${N}}{${a}${d}} = \\dfrac{${s}${M}}{${s}${a}} = \\dfrac{${pr[0]}}{${pr[1]}}`)}, nên ${m(`${M}${N} = ${mn}`)}. Đáp số ${tb(mn)}.`,
    steps:[
      {tag:'Kế hoạch', ask:`${m(b + c)} song song với mặt phẳng nào?`, opts:[m(`(${s + a + d})`), m(`(${s + a + b})`), m(`(${s + c + d})`), m(`(${s + b + c})`)], ans:m(`(${s + a + d})`), hint:'BC ∥ AD ⊂ (SAD) và BC không nằm trong (SAD).'},
      {tag:'Giải', ask:`Giao tuyến ${m(M + N)} của ${m(`(${M + b + c})`)} và ${m(`(${s + a + d})`)} song song với`, opts:[m(b + c), m(s + a), m(a + b), m(s + b)], ans:m(b + c), hint:'Mặt phẳng chứa đường thẳng song song mặt phẳng cắt nó theo giao tuyến song song đường thẳng đó.'},
      {tag:'Đáp số', ask:`${m(M + N)} = ${m(`\\dfrac{${pr[0]}}{${pr[1]}}`)}${m(a + d)}. Vậy ${m(`${M}${N} =`)}`, tpl:'[_]', ans:[mn], hint:`AD = ${AD}.`}]});
};

/* ---------- Dạng 5. Chứng minh đường thẳng song song mặt phẳng ---------- */
const g12e = lv => {
  const L = pick(TETS), [v, x, y, z] = L;
  if(lv === 1){
    const t = R(0, 2);
    if(t === 0){
      const F = L.filter(k => k !== v), fig = tetFig(L, {pts:{M:mid(TET0[0], TET0[1]), N:mid(TET0[0], TET0[2])}, s:[['M', 'N']], fill:[[x, y, z]]});
      return mc10(`Cho tứ diện ${m(L.join(''))}. Gọi ${m('M')}, ${m('N')} lần lượt là trung điểm của ${m(v + x)} và ${m(v + y)}. Đường thẳng ${m('MN')} song song với mặt phẳng`, m(fName([x, y, z])), [m(fName([v, x, y])), m(fName([v, y, z])), m(fName([v, x, z]))],
        `MN ∥ ${x + y} và ${x + y} nằm trong một mặt phẳng; kiểm tra MN không nằm trong mặt phẳng đó.`, `${m('MN')} là đường trung bình của tam giác ${m(v + x + y)} nên ${m(`MN \\parallel ${x}${y}`)}, mà ${m(x + y)} ⊂ ${m(fName([x, y, z]))} và ${m('MN')} ⊄ ${m(fName([x, y, z]))}. Vậy ${tb(`MN \\parallel ${fName([x, y, z])}`)}.`, fig);
    }
    const S = mk('pyp'), [s, a, b, c, d] = S.L;
    const good = t === 1 ? m(fName([a, b, c, d])) : m(fName([s, c, d]));
    const f2 = pgFig(S.L, {pts:{M:mid(PG0[0], PG0[1]), N:mid(PG0[0], PG0[2])}, s:[['M', 'N']], fill:[t === 1 ? [a, b, c, d] : [s, c, d]]});
    return mc10(`Cho ${S.title}. Gọi ${m('M')}, ${m('N')} lần lượt là trung điểm của ${m(s + a)} và ${m(s + b)}. Đường thẳng ${m('MN')} song song với mặt phẳng`, good, t === 1 ? [m(fName([s, a, b])), m(fName([s, b, c])), m(fName([s, a, d]))] : [m(fName([s, a, b])), m(fName([s, b, c])), m(fName([s, a, d]))],
      `MN ∥ AB ∥ CD; xét xem CD hoặc AB nằm trong mặt phẳng nào.`, `${m('MN')} là đường trung bình của tam giác ${m(s + a + b)} nên ${m(`MN \\parallel ${a}${b}`)}, ${m(`${a}${b} \\parallel ${c}${d}`)}. ${m(a + b)} ⊂ ${m(fName([a, b, c, d]))} và ${m(c + d)} ⊂ ${m(fName([s, c, d]))}; ${m('MN')} không nằm trong hai mặt phẳng này. Do đó ${tb(`MN \\parallel ${t === 1 ? fName([a, b, c, d]) : fName([s, c, d])}`)}.`, f2);
  }
  if(lv === 2){
    const t = R(0, 2), mn = R(2, 9);
    if(t === 0){ const [p, q, r] = [v, x, y];
      return QB({text:`Cho tứ diện ${m(L.join(''))}. ${m('M')}, ${m('N')} là trung điểm của ${m(p + q)}, ${m(p + r)}. Biết ${m(`MN = ${mn}`)}. Đường thẳng ${m('MN')} song song với mặt phẳng ${m(fName([q, r, z]))}; tính ${m(q + r)}.`, tpl:`${m(`${q}${r} =`)} [_]`, ans:[2 * mn],
        fig:tetFig(L, {pts:{M:mid(TET0[0], TET0[1]), N:mid(TET0[0], TET0[2])}, s:[['M', 'N']], fill:[[x, y, z]]}), hint:'MN là đường trung bình của tam giác chứa MN.', sol:`${m(`MN = \\dfrac{1}{2}${q}${r}`)} nên ${m(`${q}${r} = ${2 * mn}`)} = ${tb(2 * mn)}.`}); }
    if(t === 1){ const S = mk('pyp'), [s, a, b, c, d] = S.L;
      return mc10(`Cho ${S.title}. Gọi ${m('M')}, ${m('N')} lần lượt là trung điểm của ${m(s + a)} và ${m(s + d)}. Đường thẳng ${m('MN')} song song với đường thẳng và mặt phẳng nào trong các phương án sau?`, `${m(`MN \\parallel ${a}${d}`)} và ${m(`MN \\parallel ${fName([s, b, c])}`)}`, [`${m(`MN \\parallel ${a}${b}`)} và ${m(`MN \\parallel ${fName([s, b, c])}`)}`, `${m(`MN \\parallel ${a}${d}`)} và ${m(`MN \\parallel ${fName([s, a, d])}`)}`, `${m(`MN \\parallel ${s}${c}`)} và ${m(`MN \\parallel ${fName([a, b, c, d])}`)}`],
        'MN ∥ AD ∥ BC; chú ý MN nằm trong (SAD).', `${m('MN')} là đường trung bình của tam giác ${m(s + a + d)} nên ${m(`MN \\parallel ${a}${d}`)}; ${m(`${a}${d} \\parallel ${b}${c}`)} nên ${m(`MN \\parallel ${b}${c}`)} và ${m(`MN \\parallel ${fName([s, b, c])}`)} (MN ⊄ (${s}${b}${c})). ${tw('Phương án đúng')}: song song ${m(a + d)} và ${m(fName([s, b, c]))}. MN nằm trong ${m(fName([s, a, d]))}, không song song mặt phẳng đó.`, pgFig(S.L, {pts:{M:mid(PG0[0], PG0[1]), N:mid(PG0[0], PG0[4])}, d:[['M', 'N']]})); }
    const S = mk('cube'), pr = pick(lpPairs(S, 'par')), [e, F] = pr;
    return QB({text:`Cho ${S.title}. Đường thẳng ${m(eName(e))} song song với bao nhiêu mặt của hình lập phương?`, tpl:'[_]', ans:[facesRel(S, e, 'par').length], fig:figSP(S, [e], F),
      hint:'Một cạnh của hình lập phương song song với hai mặt.', sol:`${m(eName(e))} song song với ${facesRel(S, e, 'par').map(G => m(fName(G))).join(' và ')}: ${tb(facesRel(S, e, 'par').length)} mặt.`});
  }
  const t = R(0, 1);
  if(t === 0){
    const [a, b, c, d] = L, fig = tetFig(L, {pts:{M:mid(TET0[0], TET0[1]), N:mid(TET0[0], TET0[2]), P:mid(TET0[0], TET0[3])}, s:[['M', 'N'], ['N', 'P']], d:[['M', 'P']]});
    return QS({text:`Cho tứ diện ${m(L.join(''))}. ${m('M')}, ${m('N')}, ${m('P')} lần lượt là trung điểm của ${m(a + b)}, ${m(a + c)}, ${m(a + d)}. Chứng minh ${m('MN')} song song với mặt phẳng ${m(fName([b, c, d]))}.`, fig, direct:true,
      hint:'MN song song với một cạnh của tam giác BCD; chú ý điều kiện MN không nằm trong (BCD).',
      sol:`${m('MN')} là đường trung bình của tam giác ${m(a + b + c)}: ${m(`MN \\parallel ${b}${c}`)}. ${m(b + c)} ⊂ ${m(fName([b, c, d]))}. ${m('M')} ∉ ${m(fName([b, c, d]))} (vì ${m(a)} ∉ ${m(fName([b, c, d]))}) nên ${m('MN')} ⊄ ${m(fName([b, c, d]))}. Vậy ${tb(`MN \\parallel ${fName([b, c, d])}`)}.`,
      steps:[
        {tag:'Kế hoạch', ask:`Chọn đường thẳng nằm trong ${m(fName([b, c, d]))} song song với ${m('MN')}:`, opts:[m(b + c), m(c + d), m(b + d), m(a + b)], ans:m(b + c), hint:'MN là đường trung bình của tam giác ABC.'},
        {tag:'Giải', ask:`Điều kiện còn lại: ${m('MN')} ${'⊄'} ${m(fName([b, c, d]))} vì`, opts:[`${a} không thuộc ${fName([b, c, d])}, nên ${'M'} không thuộc mặt phẳng`, `MN = BC`, `MN ⊥ BC`, `MN cắt BC`], ans:`${a} không thuộc ${fName([b, c, d])}, nên ${'M'} không thuộc mặt phẳng`, keepOrder:true, hint:'M nằm giữa A và B.'},
        {tag:'Đáp số', ask:`Kết luận: ${m('MN')} và ${m(fName([b, c, d]))}`, opts:['song song', 'cắt nhau', 'MN nằm trong mặt phẳng', 'vuông góc'], ans:'song song', keepOrder:true, hint:'Hai điều kiện đã thỏa.'}]});
  }
  const S = mk('pyp'), [s, a, b, c, d] = S.L, M = 'M', N = 'N', K = R(2, 6);
  const f = pgFig(S.L, {pts:{[M]:mid(PG0[0], PG0[1]), [N]:mid(PG0[0], PG0[2])}, s:[[M, N]], fill:[[a, b, c, d]]});
  return QS({text:`Cho ${S.title}. ${m(M)}, ${m(N)} là trung điểm của ${m(s + a)}, ${m(s + b)}; ${m(`${a}${b} = ${2 * K}`)}. Chứng minh ${m(M + N)} song song với mặt phẳng ${m(fName([a, b, c, d]))} và tính ${m(M + N)}.`, fig:f, direct:true,
    hint:'Dùng đường trung bình của tam giác SAB.',
    sol:`${m(M + N)} là đường trung bình của tam giác ${m(s + a + b)} nên ${m(`${M}${N} \\parallel ${a}${b}`)} và ${m(`${M}${N} = \\dfrac{1}{2}${a}${b} = ${K}`)}. ${m(a + b)} ⊂ ${m(fName([a, b, c, d]))} và ${m(M + N)} ⊄ ${m(fName([a, b, c, d]))}, do đó ${tb(`${M}${N} \\parallel ${fName([a, b, c, d])}`)}, ${tb(`${M}${N} = ${K}`)}.`,
    steps:[
      {tag:'Kế hoạch', ask:`${m(M + N)} song song với đường thẳng nào nằm trong ${m(fName([a, b, c, d]))}?`, opts:[m(a + b), m(a + c), m(s + a), m(b + d)], ans:m(a + b), hint:'M, N là trung điểm của SA, SB.'},
      {tag:'Giải', ask:`${m(M + N)} có nằm trong ${m(fName([a, b, c, d]))} không?`, opts:['Không, vì M không thuộc mặt đáy', 'Có, vì M, N thuộc SA, SB', 'Có, vì MN ∥ AB', 'Không xác định được'], ans:'Không, vì M không thuộc mặt đáy', keepOrder:true, hint:'M nằm giữa S và A.'},
      {tag:'Đáp số', ask:`${m(M + N)} bằng một nửa ${m(a + b)} nên ${m(`${M}${N} =`)}`, tpl:'[_]', ans:[K], hint:`AB = ${2 * K}.`}]});
};

/* ---------- Dạng 6. Thiết diện song song với hai đường thẳng ---------- */
const g12f = lv => {
  const L = pick(TETS), [a, b, c, d] = L, K = pick([[1, 2], [1, 3], [2, 3], [1, 4], [3, 4]]), den = K[1], num = K[0];
  const BC = den * R(2, 4), AD = den * R(2, 4), MN = BC * num / den, MQ = AD * (den - num) / den, per = 2 * (MN + MQ);
  const k = num / den, M = mid(TET0[0], TET0[1], k), Np = mid(TET0[0], TET0[2], k), Qp = mid(TET0[1], TET0[3], 1 - k), Pp = mid(TET0[2], TET0[3], 1 - k);
  const fig = tetFig(L, {pts:{M, N:Np, P:Pp, Q:Qp}, s:[['M', 'N'], ['N', 'P']], d:[['P', 'Q'], ['Q', 'M']], aria:'Thiết diện MNPQ của tứ diện'});
  const base = `Cho tứ diện ${m(L.join(''))} và điểm ${m('M')} thuộc cạnh ${m(a + b)} sao cho ${m(`${a}M = \\dfrac{${num}}{${den}}${a}${b}`)}. Mặt phẳng ${m('(\\alpha)')} đi qua ${m('M')}, song song với ${m(b + c)} và ${m(a + d)}, cắt ${m(a + c)}, ${m(c + d)}, ${m(b + d)} lần lượt tại ${m('N')}, ${m('P')}, ${m('Q')}.`;
  if(lv === 1){
    const t = R(0, 2);
    if(t === 0) return mc10(`${base} Đường thẳng ${m('MN')} song song với`, m(b + c), [m(a + d), m(c + d), m(b + d)], `(α) ∥ BC; (α) cắt (ABC) theo MN.`, `${m(b + c)} ∥ ${m('(\\alpha)')}, ${m('(\\alpha)')} ∩ ${m(fName([a, b, c]))} = ${m('MN')}, ${m(b + c)} ⊂ ${m(fName([a, b, c]))}, nên ${m(`MN \\parallel ${b}${c}`)}.`, fig);
    if(t === 1) return mc10(`${base} Đường thẳng ${m('MQ')} song song với`, m(a + d), [m(b + c), m(c + d), m(a + b)], `(α) ∥ AD; (α) cắt (ABD) theo MQ.`, `${m(a + d)} ∥ ${m('(\\alpha)')}, ${m('(\\alpha)')} ∩ ${m(fName([a, b, d]))} = ${m('MQ')}, nên ${m(`MQ \\parallel ${a}${d}`)}.`, fig);
    return mc10(`${base} Tứ giác ${m('MNPQ')} là`, 'hình bình hành', ['hình thang', 'hình thoi', 'hình chữ nhật'], 'MN ∥ BC ∥ QP và MQ ∥ AD ∥ NP.', `${m(`MN \\parallel PQ \\parallel ${b}${c}`)} và ${m(`MQ \\parallel NP \\parallel ${a}${d}`)}: hai cặp cạnh đối song song, ${tw('hình bình hành')}.`, fig);
  }
  if(lv === 2){
    const t = R(0, 2);
    if(t === 0) return QB({text:`${base} Biết ${m(`${b}${c} = ${BC}`)}. Tính ${m('MN')}.`, tpl:`${m('MN =')} [_]`, ans:[MN], fig, hint:'MN ∥ BC, dùng Thales trong tam giác ABC.', sol:`${m(`MN \\parallel ${b}${c}`)} nên ${m(`\\dfrac{MN}{${b}${c}} = \\dfrac{${a}M}{${a}${b}} = \\dfrac{${num}}{${den}}`)}, suy ra ${m(`MN = \\dfrac{${num}}{${den}}\\cdot ${BC}`)} = ${tb(MN)}.`});
    if(t === 1) return QB({text:`${base} Biết ${m(`${a}${d} = ${AD}`)}. Tính ${m('MQ')}.`, tpl:`${m('MQ =')} [_]`, ans:[MQ], fig, hint:'MQ ∥ AD, dùng Thales trong tam giác ABD với BM/BA.', sol:`${m(`MQ \\parallel ${a}${d}`)} nên ${m(`\\dfrac{MQ}{${a}${d}} = \\dfrac{${b}M}{${b}${a}} = \\dfrac{${den - num}}{${den}}`)}, suy ra ${m(`MQ = \\dfrac{${den - num}}{${den}}\\cdot ${AD}`)} = ${tb(MQ)}.`});
    return QC({text:`${base} Biết ${m(`${b}${c} \\perp ${a}${d}`)}. Tứ giác ${m('MNPQ')} là`, opts:['hình bình hành nhưng chưa là hình chữ nhật', 'hình chữ nhật', 'hình thoi', 'hình vuông'], ans:'hình chữ nhật', keepOrder:true, fig,
      hint:'MN ∥ BC và MQ ∥ AD; hai đường thẳng vuông góc thì hai đường song song với chúng cũng vuông góc.', sol:`${m(`MN \\parallel ${b}${c}`)}, ${m(`MQ \\parallel ${a}${d}`)}, ${m(`${b}${c} \\perp ${a}${d}`)} nên ${m('MN \\perp MQ')}. Hình bình hành có một góc vuông là ${tw('hình chữ nhật')}.`});
  }
  const t = R(0, 1);
  if(t === 0) return QB({text:`${base} Biết ${m(`${b}${c} = ${BC}`)}, ${m(`${a}${d} = ${AD}`)}. Tính chu vi tứ giác ${m('MNPQ')}.`, tpl:'[_]', ans:[per], fig,
    hint:'MNPQ là hình bình hành; tính MN và MQ bằng Thales.', sol:`${m(`MN = \\dfrac{${num}}{${den}}\\cdot ${BC} = ${MN}`)}, ${m(`MQ = \\dfrac{${den - num}}{${den}}\\cdot ${AD} = ${MQ}`)}. Chu vi bằng ${m(`2\\,(${MN} + ${MQ})`)} = ${tb(per)}.`});
  return QS({text:`${base} Biết ${m(`${b}${c} = ${BC}`)}, ${m(`${a}${d} = ${AD}`)}. Chứng minh ${m('MNPQ')} là hình bình hành và tính chu vi.`, fig, direct:true,
    hint:'Dùng tính chất: mặt phẳng chứa một đường thẳng song song mặt phẳng (α) cắt (α) theo giao tuyến song song đường thẳng đó.',
    sol:`${m(b + c)} ∥ ${m('(\\alpha)')} nên ${m(`MN \\parallel PQ \\parallel ${b}${c}`)}; ${m(a + d)} ∥ ${m('(\\alpha)')} nên ${m(`MQ \\parallel NP \\parallel ${a}${d}`)}. Vậy ${m('MNPQ')} là hình bình hành. ${m(`MN = \\dfrac{${num}}{${den}}\\cdot ${BC} = ${MN}`)}, ${m(`MQ = \\dfrac{${den - num}}{${den}}\\cdot ${AD} = ${MQ}`)}, chu vi ${tb(per)}.`,
    steps:[
      {tag:'Kế hoạch', ask:`Giao tuyến của ${m('(\\alpha)')} với ${m(fName([a, b, c]))} là ${m('MN')}; vì ${m(b + c)} ∥ ${m('(\\alpha)')} nên ${m('MN')} song song với`, opts:[m(b + c), m(a + d), m(c + d), m(a + c)], ans:m(b + c), hint:'BC nằm trong (ABC) và song song (α).'},
      {tag:'Giải', ask:`Tương tự ${m('MQ')} song song với ${m(a + d)}. Tứ giác ${m('MNPQ')} có hai cặp cạnh đối song song nên là`, opts:['hình bình hành', 'hình thang', 'hình thoi', 'hình chữ nhật'], ans:'hình bình hành', keepOrder:true, hint:'Hai cặp cạnh đối song song.'},
      {tag:'Đáp số', ask:`Chu vi ${m('MNPQ')} = ${m(`2\\,(${MN} + ${MQ})`)} =`, tpl:'[_]', ans:[per], hint:`MN = ${MN}, MQ = ${MQ}.`}]});
};

const K12KT = [
  {t:'Vị trí tương đối của đường thẳng và mặt phẳng', b:`Đường thẳng ${tm('d')} và mặt phẳng ${tm('(P)')} có ba vị trí: <ul><li><b>cắt nhau</b>: đúng một điểm chung;</li><li><b>song song</b>: không có điểm chung, kí hiệu ${tm('d \\parallel (P)')};</li><li><b>${tm('d')} nằm trong ${tm('(P)')}</b>: ít nhất hai điểm chung, ${tm('d \\subset (P)')}.</li></ul>`,
    warn:'Đường thẳng song song với một đường thẳng trong mặt phẳng chưa chắc song song với mặt phẳng: còn phải kiểm tra nó không nằm trong mặt phẳng.', ex:'Cạnh đáy của hình chóp song song với mặt bên chứa cạnh đối của nó; cạnh của hình hộp song song với hai mặt (không chứa nó, không cắt nó).'},
  {t:'Điều kiện để đường thẳng song song với mặt phẳng', b:`Nếu ${tm('d \\not\\subset (P)')} và ${tm('d')} song song với một đường thẳng ${tm('d\'')} nằm trong ${tm('(P)')} thì ${tm('d \\parallel (P)')}.`,
    warn:'Thiếu điều kiện d không nằm trong (P) là lỗi hay gặp: khi đó d có thể nằm trong (P).', ex:'Muốn chứng minh d ∥ (P): (1) chỉ ra d′ ⊂ (P), d ∥ d′; (2) nói rõ d ⊄ (P).'},
  {t:'Tính chất và hệ quả', b:`<ul><li>Nếu ${tm('d \\parallel (P)')} và mặt phẳng ${tm('(Q)')} chứa ${tm('d')}, cắt ${tm('(P)')} theo giao tuyến ${tm('d\'')} thì ${tm('d\' \\parallel d')}.</li><li><b>Hệ quả:</b> nếu hai mặt phẳng cắt nhau cùng song song với một đường thẳng thì giao tuyến của chúng song song với đường thẳng đó.</li></ul>`,
    warn:'Đường thẳng song song với mặt phẳng không song song với mọi đường thẳng trong mặt phẳng: có những đường chéo nhau với nó.', ex:'Gặp “mặt phẳng (α) đi qua M song song với BC”: giao tuyến của (α) với mặt phẳng chứa BC song song BC.'},
  {t:'Thiết diện và Thales', b:`Thiết diện của mặt phẳng ${tm('(\\alpha)')} song song với hai đường thẳng chéo nhau của tứ diện là <b>hình bình hành</b>; các cạnh tính bằng định lí Thales.`,
    warn:'Hai đường thẳng tạo ra hai cạnh của hình bình hành có tỉ lệ khác nhau (k và 1 − k).', ex:'Tính MN theo tỉ số trên cạnh bắt đầu từ cùng một đỉnh, MQ theo tỉ số trên cạnh bắt đầu từ đỉnh còn lại.'}
];

lesson(5, 'dt-mp-song-song', 'Bài 12. Đường thẳng và mặt phẳng song song', 'Vị trí tương đối đường–mặt, điều kiện song song, tính chất, thiết diện song song với hai đường thẳng.', [g12a, g12b, g12c, g12d, g12e, g12f], {introTitle:'Kiến thức cần nhớ · Chỗ dễ sai · Mẹo', intro:K12KT});

/* =====================================================================
   Bài 13. Hai mặt phẳng song song  (SGK KNTT Toán 11, Chương IV)
   Chủ đề 5 · bài `hai-mp-song-song` · 6 dạng × 3 mức; quan hệ mặt–mặt tính từ TỌA ĐỘ 3D thật
   ===================================================================== */
const pRel = (S, F, G) => {
  const f = F.slice(0, 3).map(k => S.co[k]), g = G.slice(0, 3).map(k => S.co[k]);
  const n1 = X3(V3(f[1], f[0]), V3(f[2], f[0])), n2 = X3(V3(g[1], g[0]), V3(g[2], g[0]));
  if(Z3(X3(n1, n2))) return D3(n1, V3(g[0], f[0])) === 0 ? 'same' : 'par';
  return 'cut';
};
const common2 = (F, G) => F.filter(k => G.includes(k));
const fpairs = S => { const fs = facesOf(S), r = []; for(let i = 0; i < fs.length; i++) for(let j = i + 1; j < fs.length; j++) r.push([fs[i], fs[j]]); return r; };
const fcount = (S, k) => fpairs(S).filter(([F, G]) => pRel(S, F, G) === k).length;
const edgeOf = (S, F, G) => { const c = common2(F, G); return c.length >= 2 ? S.ed.find(e => c.includes(e[0]) && c.includes(e[1])) : null; };
const segsOf = F => { const r = []; for(let i = 0; i < F.length; i++) for(let j = i + 1; j < F.length; j++) r.push([F[i], F[j]]); return r; };
const parSeg = (S, a, b) => Z3(X3(V3(S.co[a[1]], S.co[a[0]]), V3(S.co[b[1]], S.co[b[0]])));
const CTRI = [[['A', "B'", "D'"], ['B', "C'", 'D']], [["A'", 'B', 'D'], ["B'", "D'", 'C']], [['A', 'C', "D'"], ["A'", "C'", 'B']], [['A', 'C', "B'"], ["A'", "C'", 'D']]];
{
  const T = solid('tet', ['A', 'B', 'C', 'D']), P = solid('pyp', ['S', 'A', 'B', 'C', 'D']), C = solid('cube'), R3 = solid('prism');
  e10(fcount(C, 'par') === 3 && fcount(C, 'cut') === 12 && fcount(C, 'same') === 0, 'mặt–mặt lập phương ' + [fcount(C,'par'), fcount(C,'cut'), fcount(C,'same')]);
  e10(fcount(R3, 'par') === 1 && fcount(R3, 'cut') === 9, 'mặt–mặt lăng trụ');
  e10(fcount(P, 'par') === 0 && fcount(P, 'cut') === 10, 'mặt–mặt chóp');
  e10(fcount(T, 'par') === 0 && fcount(T, 'cut') === 6, 'mặt–mặt tứ diện');
  e10(fpairs(P).filter(([F, G]) => !edgeOf(P, F, G)).length === 2, 'chóp: hai cặp mặt bên đối nhau chỉ chung đỉnh S');
  CTRI.forEach(([x, y]) => e10(pRel(C, x, y) === 'par', 'cặp tam giác song song trong lập phương'));
}
const fig2 = (S, F, G) => figS(S, [], {fill:[F, G]});
const REL2 = {par:'song song với nhau', cut:'cắt nhau', same:'trùng nhau'}, REL2O = [REL2.cut, REL2.par, REL2.same];
const pQ = (S, F, G, hint) => {
  const k = pRel(S, F, G), e = k === 'cut' ? edgeOf(S, F, G) : null;
  const why = k === 'par' ? `${m(fName(F))} và ${m(fName(G))} không có điểm chung, mỗi mặt chứa hai đường thẳng cắt nhau song song với mặt kia nên ${tw('song song')}.`
    : k === 'cut' ? (e ? `Hai mặt phẳng có chung hai điểm ${m(e.join(',\\ '))} nên ${tw('cắt nhau')} theo giao tuyến ${m(eName(e))}.` : `Hai mặt phẳng có điểm chung ${m(common2(F, G)[0])} và không song song nên ${tw('cắt nhau')} theo một giao tuyến đi qua điểm đó.`)
    : `Hai mặt phẳng có ba điểm chung không thẳng hàng nên ${tw('trùng nhau')}.`;
  return QC({text:`Cho ${S.title}. Hai mặt phẳng ${m(fName(F))} và ${m(fName(G))}`, opts:REL2O, ans:REL2[k], keepOrder:true, fig:fig2(S, F, G), hint, sol:why});
};
const pPair = (S, k) => pick(fpairs(S).filter(([F, G]) => pRel(S, F, G) === k));
const fx = s => s.replace(/\(([PQR])\)/g, (_, x) => m(`(${x})`)).replace(/\b(a, b)\b/g, (_, x) => m(x));

/* ---------- Dạng 1. Vị trí tương đối của hai mặt phẳng ---------- */
const g13a = lv => {
  if(lv === 1){
    const t = R(0, 3), P1 = pick(PL.slice(0, 3)), P2 = pick(PL.slice(3));
    if(t === 0) return mc10(`Hai mặt phẳng phân biệt ${m(P1.t)} và ${m(P2.t)} có một điểm chung. Khi đó`, `${m(P1.t)} và ${m(P2.t)} cắt nhau theo một đường thẳng đi qua điểm đó`, [`${m(P1.t)} và ${m(P2.t)} song song`, `${m(P1.t)} và ${m(P2.t)} trùng nhau`, `${m(P1.t)} và ${m(P2.t)} chỉ có đúng một điểm chung`],
      'Hai mặt phẳng phân biệt có một điểm chung thì có chung cả một đường thẳng.', `Theo tính chất thừa nhận, hai mặt phẳng phân biệt có một điểm chung thì có một đường thẳng chung đi qua điểm đó: ${tw('cắt nhau')}.`);
    if(t === 1) return mc10(`Hai mặt phẳng phân biệt ${m(P1.t)} và ${m(P2.t)} không có điểm chung. Khi đó`, `${m(P1.t)} song song với ${m(P2.t)}`, [`${m(P1.t)} cắt ${m(P2.t)}`, `${m(P1.t)} trùng ${m(P2.t)}`, `${m(P1.t)} và ${m(P2.t)} chéo nhau`],
      'Không có điểm chung là định nghĩa của hai mặt phẳng song song.', `Theo định nghĩa: hai mặt phẳng ${tw('song song')} khi chúng không có điểm chung.`);
    if(t === 2) return mc10(`Hai mặt phẳng ${m(P1.t)} và ${m(P2.t)} có ba điểm chung không thẳng hàng. Khi đó`, `${m(P1.t)} và ${m(P2.t)} trùng nhau`, [`${m(P1.t)} và ${m(P2.t)} song song`, `${m(P1.t)} và ${m(P2.t)} cắt nhau`, `${m(P1.t)} và ${m(P2.t)} chéo nhau`],
      'Ba điểm không thẳng hàng xác định duy nhất một mặt phẳng.', `Ba điểm không thẳng hàng xác định duy nhất một mặt phẳng nên hai mặt phẳng ${tw('trùng nhau')}.`);
    return mc10('Hai mặt phẳng phân biệt trong không gian có bao nhiêu vị trí tương đối?', 'hai vị trí: song song hoặc cắt nhau', ['một vị trí: song song', 'ba vị trí: song song, cắt nhau, chéo nhau', 'hai vị trí: cắt nhau hoặc chéo nhau'],
      'Mặt phẳng không có khái niệm “chéo nhau”.', `Hai mặt phẳng phân biệt hoặc không có điểm chung (${tw('song song')}) hoặc có một đường thẳng chung (${tw('cắt nhau')}); không có khái niệm “chéo nhau” cho mặt phẳng.`);
  }
  if(lv === 2){
    const S = mk(pick(['cube', 'prism', 'cube'])), k = pick(['par', 'cut', 'cut']), pr = pPair(S, k);
    return pQ(S, pr[0], pr[1], 'Hai mặt có chung đỉnh hay cạnh thì cắt nhau; hai mặt đối diện của hình hộp, hai đáy của lăng trụ thì song song.');
  }
  const t = R(0, 2);
  if(t === 0){
    const S = mk(pick(['cube', 'prism', 'tet'])), pr = pick(fpairs(S).filter(([F, G]) => pRel(S, F, G) === 'cut' && edgeOf(S, F, G))), e = edgeOf(S, pr[0], pr[1]);
    const bads = shuffle(S.ed.filter(x => !sameE(x, e))).slice(0, 3);
    return QC({text:`Cho ${S.title}. Giao tuyến của hai mặt phẳng ${m(fName(pr[0]))} và ${m(fName(pr[1]))} là đường thẳng`, opts:[e, ...bads].map(x => m(eName(x))), ans:m(eName(e)), fig:fig2(S, pr[0], pr[1]),
      hint:'Tìm hai điểm chung của hai mặt phẳng.', sol:`Hai mặt phẳng có chung hai điểm ${m(e.join(',\\ '))} nên giao tuyến là ${tb(eName(e))}.`});
  }
  const S = mk('pyp'), [s, a, b, c, d] = S.L, t2 = R(0, 1);
  const F = t2 === 0 ? [s, a, b] : [s, a, d], G = t2 === 0 ? [s, c, d] : [s, b, c];
  const ref = t2 === 0 ? a + b : a + d, refO = t2 === 0 ? c + d : b + c;
  const bads = t2 === 0 ? [b + c, a + c, s + a] : [a + b, a + c, s + a];
  return QC({text:`Cho ${S.title}. Giao tuyến của hai mặt phẳng ${m(fName(F))} và ${m(fName(G))} là đường thẳng đi qua ${m(s)} và song song với`, opts:[ref, ...bads].map(x => m(x)), ans:m(ref), fig:fig2(S, F, G),
    hint:'Hai mặt phẳng lần lượt chứa hai cạnh đối của hình bình hành đáy, hai cạnh đó song song.',
    sol:`${m(s)} là điểm chung. ${m(ref)} nằm trong ${m(fName(F))}, ${m(refO)} nằm trong ${m(fName(G))}, hai đường này song song (cạnh đối của hình bình hành đáy) nên giao tuyến là đường thẳng qua ${m(s)} song song với ${tb(ref)}.`});
};

/* ---------- Dạng 2. Điều kiện và tính chất của hai mặt phẳng song song ---------- */
const ST2 = [
  [true, 'Nếu mặt phẳng (P) chứa hai đường thẳng cắt nhau a, b cùng song song với mặt phẳng (Q) thì (P) song song với (Q)', 'Đây là điều kiện để hai mặt phẳng song song.'],
  [true, 'Qua một điểm nằm ngoài mặt phẳng (P) có duy nhất một mặt phẳng song song với (P)', 'Tính chất tồn tại và duy nhất.'],
  [true, 'Nếu (P) song song với (Q) thì mọi đường thẳng nằm trong (P) đều song song với (Q)', 'Đường thẳng trong (P) không có điểm chung với (Q).'],
  [true, 'Nếu mặt phẳng (R) cắt hai mặt phẳng song song (P), (Q) thì hai giao tuyến song song với nhau', 'Tính chất về giao tuyến.'],
  [false, 'Nếu (P) chứa hai đường thẳng song song a, b cùng song song với (Q) thì (P) song song với (Q)', 'Hai đường thẳng phải cắt nhau; (P) vẫn có thể cắt (Q).'],
  [false, 'Hai mặt phẳng cùng song song với một đường thẳng thì song song với nhau', 'Chúng có thể cắt nhau theo giao tuyến song song với đường thẳng đó.'],
  [false, 'Nếu (P) song song với (Q) thì mọi đường thẳng nằm trong (P) song song với mọi đường thẳng nằm trong (Q)', 'Có những cặp đường thẳng chéo nhau.'],
  [false, 'Hai mặt phẳng cùng cắt một mặt phẳng thứ ba thì song song với nhau', 'Chúng có thể cắt nhau.']
];
const g13b = lv => {
  if(lv === 1){
    const t = R(0, 2);
    if(t === 0) return mc10(fx('Hai mặt phẳng (P) và (Q) song song với nhau khi'), fx('(P) chứa hai đường thẳng cắt nhau và hai đường thẳng đó cùng song song với (Q)'), [fx('(P) chứa một đường thẳng song song với (Q)'), fx('(P) chứa hai đường thẳng song song với nhau và cùng song song với (Q)'), fx('(P) và (Q) cùng song song với một đường thẳng')],
      'Nhớ chữ “cắt nhau” trong điều kiện.', `Điều kiện: ${tw('hai đường thẳng cắt nhau')} trong ${m('(P)')} cùng song song với ${m('(Q)')}. Các phương án còn lại chưa đủ: ${m('(P)')} vẫn có thể cắt ${m('(Q)')}.`);
    if(t === 1){ const P = pick(PL.slice(0, 3));
      return mc10(`Qua điểm ${m('M')} không thuộc mặt phẳng ${m(P.t)}, có bao nhiêu mặt phẳng song song với ${m(P.t)}?`, 'đúng một', ['không có', 'đúng hai', 'vô số'], 'Tính chất tồn tại duy nhất.', `Theo tính chất: qua một điểm nằm ngoài mặt phẳng có ${tw('duy nhất')} một mặt phẳng song song với mặt phẳng đó.`); }
    const S = mk(pick(['cube', 'prism'])), pr = pPair(S, 'par');
    const bads = shuffle(facesOf(S).filter(F => F !== pr[0] && F !== pr[1])).slice(0, 3);
    return QC({text:`Cho ${S.title}. Mặt phẳng nào sau đây song song với ${m(fName(pr[0]))}?`, opts:[pr[1], ...bads].map(F => m(fName(F))), ans:m(fName(pr[1])), fig:fig2(S, pr[0], pr[1]),
      hint:'Mặt đối diện của hình hộp; hai đáy của lăng trụ.', sol:`${m(fName(pr[0]))} và ${m(fName(pr[1]))} không có điểm chung và mỗi mặt chứa hai đường thẳng cắt nhau song song với mặt kia: ${tw('song song')}.`});
  }
  if(lv === 2){
    const t = R(0, 2);
    if(t === 0){
      const ask = pick([true, false]), T = shuffle(ST2), good = T.find(x => x[0] === ask), bads = T.filter(x => x[0] !== ask).slice(0, 3);
      return mc10(ask ? 'Mệnh đề nào sau đây đúng?' : 'Mệnh đề nào sau đây sai?', fx(good[1]), bads.map(x => fx(x[1])), 'Tìm phản ví dụ trên hình hộp, hình chóp cho các phương án sai.', `${fx(good[1])}: ${ask ? 'đúng' : 'sai'}. ${fx(good[2])}`);
    }
    if(t === 1){
      const S = mk('cube'), [A3, B3] = pick(CTRI);
      const bads = shuffle(CTRI.flat().filter(x => x !== A3 && x !== B3 && pRel(S, A3, x) === 'cut')).slice(0, 3);
      return QC({text:`Cho ${S.title}. Mặt phẳng ${m(fName(A3))} song song với mặt phẳng nào sau đây?`, opts:[B3, ...bads].map(x => m(fName(x))), ans:m(fName(B3)), fig:figS(S, [], {fill:[A3, B3]}),
        hint:'Tìm hai đường thẳng cắt nhau trong mặt phẳng thứ nhất lần lượt song song với hai đường thẳng trong mặt phẳng thứ hai.', sol:`Hai cạnh của tam giác thứ nhất lần lượt song song với hai cạnh của tam giác thứ hai (hai đường thẳng cắt nhau), nên ${tw(fName(A3) + ' ∥ ' + fName(B3))}.`});
    }
    const S = mk('pyp');
    return QB({text:`Cho ${S.title}. Trong các mặt phẳng chứa một mặt của hình chóp, có bao nhiêu cặp mặt phẳng song song?`, tpl:'[_]', ans:[0], fig:figS(S, []),
      hint:'Hai mặt bên có chung đỉnh S; mặt bên và mặt đáy có chung một cạnh.', sol:`Hai mặt bất kì của hình chóp đều có điểm chung (đỉnh ${m(S.L[0])} hoặc một cạnh) nên không có cặp nào song song: đáp số ${tb(0)}.`});
  }
  const t = R(0, 1);
  if(t === 0){
    const S = mk('cube'), [A3, B3] = pick(CTRI), L1 = [A3[0], A3[1]], L2 = [A3[0], A3[2]];
    const mate = L => segsOf(B3).find(sg => parSeg(S, L, sg));
    const M1 = mate(L1), M2 = mate(L2), other = segsOf(B3).filter(sg => sg !== M1);
    e10(M1 && M2 && M1 !== M2, 'cặp đoạn song song trong tam giác');
    return QS({text:`Cho ${S.title}. Chứng minh ${m(fName(A3))} song song với ${m(fName(B3))}.`, fig:figS(S, [], {fill:[A3, B3]}), direct:true,
      hint:'Trong mỗi mặt phẳng tìm hai đường thẳng cắt nhau, rồi ghép chúng thành hai cặp song song.',
      sol:`${m(eName(L1))} và ${m(eName(L2))} cắt nhau tại ${m(A3[0])} trong ${m(fName(A3))}. Ta có ${m(`${eName(L1)} \\parallel ${eName(M1)}`)} và ${m(`${eName(L2)} \\parallel ${eName(M2)}`)} (hai cạnh đối của một hình bình hành), với ${m(eName(M1))}, ${m(eName(M2))} nằm trong ${m(fName(B3))}; hai đường thẳng ${m(eName(L1))}, ${m(eName(L2))} không nằm trong ${m(fName(B3))}. Theo điều kiện song song, ${tb(fName(A3) + ' \\parallel ' + fName(B3))}.`,
      steps:[
        {tag:'Kế hoạch', ask:'Điều kiện để hai mặt phẳng song song là mặt phẳng này chứa hai đường thẳng', opts:['cắt nhau, cùng song song với mặt phẳng kia', 'song song với nhau, cùng song song với mặt phẳng kia', 'chéo nhau', 'bất kì'], ans:'cắt nhau, cùng song song với mặt phẳng kia', keepOrder:true, hint:'Hai đường thẳng phải cắt nhau.'},
        {tag:'Giải', ask:`Đường thẳng ${m(eName(L1))} nằm trong ${m(fName(A3))} song song với đường thẳng`, opts:[M1, ...other].map(x => m(eName(x))), ans:m(eName(M1)), hint:'Cạnh đối trong một hình bình hành (mặt hoặc mặt chéo) của hình lập phương.'},
        {tag:'Đáp số', ask:`Tương tự ${m(eName(L2))} song song với ${m(eName(M2))}. Kết luận:`, opts:['hai mặt phẳng song song', 'hai mặt phẳng cắt nhau', 'hai mặt phẳng trùng nhau', 'không kết luận được'], ans:'hai mặt phẳng song song', keepOrder:true, hint:'Áp dụng điều kiện hai mặt phẳng song song.'}]});
  }
  const S = mk('prism'), [a, b, c, a1, b1, c1] = S.L;
  return QS({text:`Cho ${S.title}. Chứng minh ${m(fName([a, b, c]))} song song với ${m(fName([a1, b1, c1]))}.`, fig:fig2(S, [a, b, c], [a1, b1, c1]), direct:true,
    hint:'Dùng hai cạnh của đáy và các hình bình hành mặt bên.',
    sol:`${m(`${a}${b} \\parallel ${a1}${b1}`)} (hình bình hành ${m(`${a}${b}${b1}${a1}`)}) và ${m(`${b}${c} \\parallel ${b1}${c1}`)} (hình bình hành ${m(`${b}${c}${c1}${b1}`)}). Hai đường thẳng ${m(a + b)}, ${m(b + c)} cắt nhau tại ${m(b)} trong ${m(fName([a, b, c]))}, không nằm trong ${m(fName([a1, b1, c1]))}. Vậy ${tb(fName([a, b, c]) + ' \\parallel ' + fName([a1, b1, c1]))}.`,
    steps:[
      {tag:'Kế hoạch', ask:`Chọn hai đường thẳng cắt nhau trong ${m(fName([a, b, c]))}:`, opts:[`${m(a + b)} và ${m(b + c)}`, `${m(a + b)} và ${m(a + a1)}`, `${m(a1 + b1)} và ${m(b1 + c1)}`, `${m(a + a1)} và ${m(b + b1)}`], ans:`${m(a + b)} và ${m(b + c)}`, hint:'Hai cạnh của tam giác đáy.'},
      {tag:'Giải', ask:`${m(a + b)} và ${m(b + c)} lần lượt song song với`, opts:[`${m(a1 + b1)} và ${m(b1 + c1)}`, `${m(a + a1)} và ${m(b + b1)}`, `${m(a + c)} và ${m(a1 + c1)}`, `${m(a + b1)} và ${m(b + c1)}`], ans:`${m(a1 + b1)} và ${m(b1 + c1)}`, hint:'Các hình bình hành mặt bên.'},
      {tag:'Đáp số', ask:'Hai đường thẳng cắt nhau của đáy dưới song song với hai đường thẳng của đáy trên nên', opts:['hai mặt phẳng đáy song song', 'hai mặt phẳng đáy cắt nhau', 'hai mặt phẳng đáy trùng nhau', 'không kết luận được'], ans:'hai mặt phẳng đáy song song', keepOrder:true, hint:'Điều kiện hai mặt phẳng song song.'}]});
};

/* ---------- Dạng 3. Đếm cặp mặt phẳng ---------- */
const g13c = lv => {
  const NMK = {par:'song song', cut:'cắt nhau'};
  if(lv === 1){
    const t = R(0, 2);
    if(t === 0){ const S = mk('cube'), F = pick(facesOf(S)), n = facesOf(S).filter(G => pRel(S, F, G) === 'par').length;
      return QB({text:`Cho ${S.title}. Có bao nhiêu mặt của hình lập phương nằm trong mặt phẳng song song với ${m(fName(F))}?`, tpl:'[_]', ans:[n], fig:figS(S, [], {fill:[F]}), hint:'Mặt đối diện.', sol:`Chỉ có mặt đối diện: ${tb(n)} mặt.`}); }
    if(t === 1){ const S = mk('prism'), F = pick(facesOf(S).filter(x => x.length === 3)), n = facesOf(S).filter(G => pRel(S, F, G) === 'par').length;
      return QB({text:`Cho ${S.title}. Có bao nhiêu mặt của hình lăng trụ nằm trong mặt phẳng song song với đáy ${m(fName(F))}?`, tpl:'[_]', ans:[n], fig:figS(S, [], {fill:[F]}), hint:'Hai đáy của lăng trụ.', sol:`Chỉ có đáy còn lại: ${tb(n)} mặt.`}); }
    const S = mk('cube'), n = fcount(S, 'par');
    return QB({text:`Cho ${S.title}. Có bao nhiêu cặp mặt song song với nhau (không kể thứ tự trong cặp)?`, tpl:'[_]', ans:[n], fig:figS(S, []), hint:'Các mặt chia thành từng cặp đối diện.', sol:`6 mặt chia thành các cặp mặt đối diện: ${m('6 : 2 = 3')} cặp, đáp số ${tb(n)}.`});
  }
  if(lv === 2){
    const t = R(0, 2);
    if(t === 0){ const S = mk('cube'), k = pick(['par', 'cut']), n = fcount(S, k);
      return QB({text:`Cho ${S.title}. Có bao nhiêu cặp mặt ${NMK[k]}?`, tpl:'[_]', ans:[n], fig:figS(S, []), hint:'Có tất cả 15 cặp mặt; 3 cặp song song.', sol:k === 'par' ? `Ba cặp mặt đối diện: ${tb(n)}.` : `Tổng ${m('C_6^2 = 15')} cặp, trừ 3 cặp song song: ${m('15 - 3 = 12')}, đáp số ${tb(n)}.`}); }
    if(t === 1){ const S = mk('prism'), k = pick(['par', 'cut']), n = fcount(S, k);
      return QB({text:`Cho ${S.title}. Có bao nhiêu cặp mặt ${NMK[k]}?`, tpl:'[_]', ans:[n], fig:figS(S, []), hint:'Có 5 mặt nên có 10 cặp mặt; chỉ hai đáy song song.', sol:k === 'par' ? `Chỉ cặp hai đáy: ${tb(n)}.` : `Tổng ${m('C_5^2 = 10')} cặp, trừ 1 cặp hai đáy: ${m('10 - 1 = 9')}, đáp số ${tb(n)}.`}); }
    const S = mk('pyp'), n = fcount(S, 'cut');
    return QB({text:`Cho ${S.title}. Có bao nhiêu cặp mặt (mỗi mặt nằm trong một mặt phẳng riêng) cắt nhau?`, tpl:'[_]', ans:[n], fig:figS(S, []), hint:'Hình chóp có 5 mặt, không có cặp nào song song.', sol:`Tổng ${m('C_5^2 = 10')} cặp mà không cặp nào song song nên có ${tb(n)} cặp cắt nhau.`});
  }
  const t = R(0, 2);
  if(t === 0){ const S = mk('pyp'), n = fpairs(S).filter(([F, G]) => edgeOf(S, F, G) && F.length === 3 && G.length === 3).length;
    return QB({text:`Cho ${S.title}. Có bao nhiêu cặp mặt bên cắt nhau theo một cạnh bên của hình chóp?`, tpl:'[_]', ans:[n], fig:figS(S, []), hint:'Các mặt bên kề nhau chung một cạnh bên.', sol:`Bốn mặt bên xếp vòng quanh, hai mặt kề nhau chung một cạnh bên: ${tb(n)} cặp. Hai cặp mặt đối nhau chỉ chung đỉnh.`}); }
  if(t === 1){ const S = mk('prism'), n = fpairs(S).filter(([F, G]) => F.length === 4 && G.length === 4).length;
    return QB({text:`Cho ${S.title}. Có bao nhiêu cặp mặt bên cắt nhau theo một cạnh bên?`, tpl:'[_]', ans:[n], fig:figS(S, []), hint:'Lăng trụ tam giác có 3 mặt bên và 3 cạnh bên.', sol:`Ba mặt bên đôi một cắt nhau theo ba cạnh bên: ${tb(n)} cặp.`}); }
  const S = mk('cube'), a = fcount(S, 'par'), b = fcount(S, 'cut');
  return QB({text:`Cho ${S.title}. Gọi ${m('p')} là số cặp mặt song song, ${m('q')} là số cặp mặt cắt nhau. Tính ${m('q - 3p')}.`, tpl:'[_]', ans:[b - 3 * a], fig:figS(S, []), hint:'p = 3, q = 12.', sol:`${m(`p = ${a},\\ q = ${b}`)} nên ${m(`q - 3p = ${b} - ${3 * a}`)} = ${tb(b - 3 * a)}.`});
};

/* ---------- Dạng 4. Giao tuyến với hai mặt phẳng song song ---------- */
const g13d = lv => {
  if(lv === 1){
    if(R(0, 1) === 0) return mc10('Cho hai mặt phẳng song song (P), (Q) và mặt phẳng (R) cắt cả hai. Hai giao tuyến a = (R) ∩ (P), b = (R) ∩ (Q)', 'song song với nhau', ['cắt nhau', 'chéo nhau', 'trùng nhau'], 'a và b cùng nằm trong (R) và không có điểm chung.', `${m('a, b')} cùng nằm trong ${m('(R)')} và không có điểm chung (vì ${m('(P) \\parallel (Q)')}) nên ${tw('song song')}.`);
    const S = mk(pick(['cube', 'prism'])), base = S.kind === 'cube' ? ['A', 'B', 'C', 'D'] : ['A', 'B', 'C'], top = S.kind === 'cube' ? ["A'", "B'", "C'", "D'"] : ["A'", "B'", "C'"];
    const Fl = pick(facesOf(S).filter(F => F.length === 4 && F.filter(k => base.includes(k)).length === 2));
    const inBase = (x, B) => B.includes(x[0]) && B.includes(x[1]);
    const e = S.ed.find(x => inBase(x, base) && Fl.includes(x[0]) && Fl.includes(x[1])), e2 = S.ed.find(x => inBase(x, top) && Fl.includes(x[0]) && Fl.includes(x[1]));
    const bads = shuffle(S.ed.filter(x => !sameE(x, e2))).slice(0, 3);
    return QC({text:`Cho ${S.title}. Mặt phẳng ${m(fName(Fl))} cắt mặt phẳng đáy ${m(fName(base))} theo ${m(eName(e))}. Giao tuyến của ${m(fName(Fl))} với mặt phẳng đáy ${m(fName(top))} là`, opts:[e2, ...bads].map(x => m(eName(x))), ans:m(eName(e2)), fig:figS(S, [e, e2], {fill:[Fl]}),
      hint:'Hai đáy song song nên hai giao tuyến song song; tìm cạnh của đáy trên song song với cạnh đã cho.', sol:`${m(eName(e2))} nằm trong đáy trên và trong ${m(fName(Fl))}. Hai đáy song song, ${m(fName(Fl))} cắt cả hai nên hai giao tuyến song song: ${m(`${eName(e2)} \\parallel ${eName(e)}`)}. Giao tuyến là ${tb(eName(e2))}.`});
  }
  if(lv === 2){
    const S = mk('cube'), pairs = [[['A', 'C', "C'", "A'"], 'AC', "A'C'"], [['B', 'D', "D'", "B'"], 'BD', "B'D'"], [['A', 'D', "D'", "A'"], 'AD', "A'D'"], [['A', 'B', "B'", "A'"], 'AB', "A'B'"], [['C', 'D', "D'", "C'"], 'CD', "C'D'"], [['B', 'C', "C'", "B'"], 'BC', "B'C'"]], pr = pick(pairs);
    const all = [pr[2], ...shuffle(["AA'", "BB'", "CC'", "DD'", 'AB', 'BC', 'CD', 'DA'].filter(x => x !== pr[1])).slice(0, 3)];
    return QC({text:`Cho ${S.title}. Mặt phẳng ${m(fName(pr[0]))} cắt mặt phẳng ${m('(ABCD)')} theo giao tuyến ${m(pr[1])}. Giao tuyến của ${m(fName(pr[0]))} với mặt phẳng ${m("(A'B'C'D')")} là`, opts:all.map(x => m(x)), ans:m(pr[2]), fig:figS(S, [], {fill:[pr[0]]}),
      hint:'Hai mặt đáy song song nên các giao tuyến của mặt phẳng thứ ba với chúng song song với nhau.', sol:`${m("(ABCD) \\parallel (A'B'C'D')")} nên hai giao tuyến song song; giao tuyến cần tìm nằm trong đáy trên và trong ${m(fName(pr[0]))}: ${tb(pr[2])}.`});
  }
  return QS({text:`Cho hình lập phương ${m("ABCD.A'B'C'D'")}. Xác định giao tuyến của hai mặt phẳng ${m("(AB'D')")} và ${m('(ABCD)')}.`, fig:cubeFig({fill:[['A', "B'", "D'"]], h:[["B'", "D'"]]}), direct:true,
    hint:'Hai mặt đáy song song: giao tuyến đi qua điểm chung A và song song với B′D′.',
    sol:`${m('A')} là điểm chung của hai mặt phẳng. Mặt phẳng ${m("(AB'D')")} cắt hai đáy song song ${m('(ABCD)')} và ${m("(A'B'C'D')")} theo hai giao tuyến song song, mà giao tuyến với đáy trên là ${m("B'D'")}. Vì ${m("B'D' \\parallel BD")} nên giao tuyến cần tìm là ${tb('đường thẳng qua A song song với BD')}.`,
    steps:[
      {tag:'Kế hoạch', ask:`Điểm chung của ${m("(AB'D')")} và ${m('(ABCD)')} là`, opts:[m('A'), m('B'), m("B'"), m('D')], ans:m('A'), hint:'A thuộc cả hai mặt phẳng.'},
      {tag:'Giải', ask:`Giao tuyến đi qua ${m('A')} và song song với đường thẳng`, opts:[m("B'D'"), m("A'C'"), m("AA'"), m("AB'")], ans:m("B'D'"), hint:'Hai giao tuyến của mặt phẳng thứ ba với hai mặt phẳng song song là song song.'},
      {tag:'Đáp số', ask:`Vì ${m("B'D' \\parallel BD")} nên giao tuyến là đường thẳng qua ${m('A')} song song với`, opts:[m('BD'), m('AC'), m("AA'"), m('AB')], ans:m('BD'), hint:"BDD′B′ là hình chữ nhật."}]});
};

/* ---------- Dạng 5. Định lí Thales trong không gian ---------- */
const THY = [44, 104, 168];
const thalesFig = () => spaceSVG({pts:{A:[40, 44], B:[69, 104], C:[100, 168], "A'":[190, 44], "B'":[222, 104], "C'":[256, 168]},
  planes:THY.map((y, i) => ({q:[[0, y + 14], [230, y + 14], [290, y - 10], [60, y - 10]], lab:['(P)', '(Q)', '(R)'][i], at:[304, y + 4]})),
  s:[['A', 'C'], ["A'", "C'"]], w:340, ht:200, aria:'Ba mặt phẳng song song (P), (Q), (R) cắt hai đường thẳng tại A, B, C và A′, B′, C′'});
const g13e = lv => {
  const fig = thalesFig(), THW = 'Ba mặt phẳng song song ' + m('(P), (Q), (R)') + ' cắt hai đường thẳng tại ' + m('A, B, C') + ' và ' + m("A', B', C'") + ' (B nằm giữa A, C; B′ nằm giữa A′, C′).';
  if(lv === 1){
    if(R(0, 1) === 0) return mc10(`${THW} Khi đó`, m("\\dfrac{AB}{BC} = \\dfrac{A'B'}{B'C'}"), [m("\\dfrac{AB}{BC} = \\dfrac{B'C'}{A'B'}"), m("AB \\cdot A'B' = BC \\cdot B'C'"), m("\\dfrac{AB}{AC} = \\dfrac{B'C'}{A'C'}")], 'Các đoạn thẳng tương ứng trên hai cát tuyến tỉ lệ.', `Đó là ${tw('định lí Thales trong không gian')}: ${m("\\dfrac{AB}{BC} = \\dfrac{A'B'}{B'C'}")}.`, fig);
    const p = R(1, 3), q = R(1, 3) + p, tt = R(2, 4);
    return QB({text:`${THW} Biết ${m(`AB = ${p * tt}`)}, ${m(`BC = ${q * tt}`)}, ${m(`A'B' = ${p}`)}. Tính ${m("B'C'")}.`, tpl:`${m("B'C' =")} [_]`, ans:[q], fig,
      hint:'Dùng tỉ lệ AB/BC = A′B′/B′C′.', sol:`${m("\\dfrac{AB}{BC} = \\dfrac{A'B'}{B'C'}")} nên ${m(`B'C' = \\dfrac{A'B' \\cdot BC}{AB} = \\dfrac{${p} \\cdot ${q * tt}}{${p * tt}}`)} = ${tb(q)}.`});
  }
  const p = R(1, 3), q = p + R(1, 3), tt = R(2, 4), AB = p * tt, BC = q * tt, ApBp = R(2, 5) * p, BpCp = ApBp * q / p;
  if(lv === 2){
    const t = R(0, 2);
    if(t === 0) return QB({text:`${THW} Biết ${m(`AB = ${AB}`)}, ${m(`BC = ${BC}`)}, ${m(`A'B' = ${ApBp}`)}. Tính ${m("B'C'")}.`, tpl:`${m("B'C' =")} [_]`, ans:[BpCp], fig, hint:'Dùng tỉ lệ AB/BC = A′B′/B′C′.', sol:`${m(`B'C' = \\dfrac{A'B' \\cdot BC}{AB} = \\dfrac{${ApBp} \\cdot ${BC}}{${AB}}`)} = ${tb(BpCp)}.`});
    if(t === 1) return QB({text:`${THW} Biết ${m(`AB = ${AB}`)}, ${m(`AC = ${AB + BC}`)}, ${m(`A'B' = ${ApBp}`)}. Tính ${m("A'C'")}.`, tpl:`${m("A'C' =")} [_]`, ans:[ApBp + BpCp], fig, hint:'Dùng tỉ lệ AB/AC = A′B′/A′C′.', sol:`${m("\\dfrac{AB}{AC} = \\dfrac{A'B'}{A'C'}")} nên ${m(`A'C' = \\dfrac{A'B' \\cdot AC}{AB} = \\dfrac{${ApBp} \\cdot ${AB + BC}}{${AB}}`)} = ${tb(ApBp + BpCp)}.`});
    return mc10(`${THW} Biết ${m(`AB = ${AB}`)}, ${m(`BC = ${BC}`)}. Tỉ số ${m("\\dfrac{B'C'}{A'C'}")} bằng`, m(tfrac(q, p + q)), [m(tfrac(p, p + q)), m(tfrac(q, p)), m(tfrac(p, q))],
      'B′C′/A′C′ = BC/AC.', `${m(`\\dfrac{B'C'}{A'C'} = \\dfrac{BC}{AC} = \\dfrac{${BC}}{${AB + BC}} = ${tfrac(q, p + q)}`)}.`, fig);
  }
  const ApCp = R(2, 4) * (p + q), ApBpX = ApCp * p / (p + q);
  return QS({text:`${THW} Biết ${m(`AB = ${AB}`)}, ${m(`BC = ${BC}`)}, ${m(`A'C' = ${ApCp}`)}. Tính ${m("A'B'")}.`, fig, direct:true,
    hint:'Dùng AB/AC = A′B′/A′C′ với AC = AB + BC.',
    sol:`${m(`AC = AB + BC = ${AB + BC}`)}. Theo định lí Thales trong không gian: ${m(`\\dfrac{A'B'}{A'C'} = \\dfrac{AB}{AC} = \\dfrac{${AB}}{${AB + BC}}`)}, suy ra ${m(`A'B' = ${ApCp} \\cdot \\dfrac{${AB}}{${AB + BC}}`)} = ${tb(ApBpX)}.`,
    steps:[
      {tag:'Kế hoạch', ask:`Tính ${m('AC')}:`, tpl:`${m('AC =')} [_]`, ans:[AB + BC], hint:'B nằm giữa A và C.'},
      {tag:'Giải', ask:'Tỉ lệ đúng theo định lí Thales trong không gian là', opts:[m("\\dfrac{A'B'}{A'C'} = \\dfrac{AB}{AC}"), m("\\dfrac{A'B'}{A'C'} = \\dfrac{BC}{AC}"), m("\\dfrac{A'B'}{A'C'} = \\dfrac{AB}{BC}"), m("A'B' = AB")], ans:m("\\dfrac{A'B'}{A'C'} = \\dfrac{AB}{AC}"), keepOrder:true, hint:'Đoạn tương ứng trên hai cát tuyến.'},
      {tag:'Đáp số', ask:`${m("A'B' =")}`, tpl:'[_]', ans:[ApBpX], hint:`${ApCp} nhân với ${AB}/${AB + BC}.`}]});
};

/* ---------- Dạng 6. Hình chóp cắt bởi mặt phẳng song song với đáy; lăng trụ ---------- */
const stFig = (L, k) => { const [s, a, b, c] = L, na = `${a}'`, nb = `${b}'`, nc = `${c}'`;
  return tetFig(L, {pts:{[na]:mid(TET0[0], TET0[1], k), [nb]:mid(TET0[0], TET0[2], k), [nc]:mid(TET0[0], TET0[3], k)}, s:[[na, nb], [nb, nc]], d:[[na, nc]], fill:[[na, nb, nc]], aria:`Mặt phẳng song song với đáy cắt hình chóp ${s}.${a}${b}${c}`}); };
const g13f = lv => {
  const L = pick([['S', 'A', 'B', 'C'], ['S', 'M', 'N', 'P'], ['O', 'A', 'B', 'C']]), [s, a, b, c] = L;
  const K = pick([[1, 2], [1, 3], [2, 3], [1, 4], [3, 4], [2, 5], [3, 5]]), num = K[0], den = K[1], ab = den * R(2, 5), bc = den * R(2, 5), ca = den * R(2, 5);
  const nA = `${a}'`, nB = `${b}'`, nC = `${c}'`, fig = stFig(L, num / den), kk = tfrac(num, den), tri = `${nA}${nB}${nC}`;
  const base = `Cho hình chóp ${m(`${s}.${a}${b}${c}`)}. Mặt phẳng ${m('(\\alpha)')} song song với ${m(`(${a}${b}${c})`)} cắt ${m(s + a)}, ${m(s + b)}, ${m(s + c)} lần lượt tại ${m(`${nA}, ${nB}, ${nC}`)} với ${m(`\\dfrac{${s}${nA}}{${s}${a}} = ${kk}`)}.`;
  if(lv === 1){
    const t = R(0, 2);
    if(t === 0){ const S2 = mk('prism'), x = R(3, 8), y = R(3, 8), z = R(3, 8);
      return QB({text:`Cho ${S2.title}, ${m(`AB = ${x}`)}, ${m(`BC = ${y}`)}, ${m(`CA = ${z}`)}. Mặt phẳng song song với đáy cắt ${m("AA'")}, ${m("BB'")}, ${m("CC'")} lần lượt tại ${m('M, N, P')}. Tính chu vi tam giác ${m('MNP')}.`, tpl:'[_]', ans:[x + y + z],
        fig:prismFig({pts:{M:mid(PRI0.A, PRI0["A'"], .5), N:mid(PRI0.B, PRI0["B'"], .5), P:mid(PRI0.C, PRI0["C'"], .5)}, s:[['M', 'N'], ['N', 'P']], d:[['M', 'P']], fill:[['M', 'N', 'P']]}),
        hint:'Tam giác MNP bằng tam giác ABC (các mặt bên là hình bình hành).', sol:`${m('MN = AB')}, ${m('NP = BC')}, ${m('PM = CA')} (các mặt bên là hình bình hành) nên chu vi bằng ${m(`${x} + ${y} + ${z}`)} = ${tb(x + y + z)}.`}); }
    if(t === 1) return QB({text:`${base} Biết ${m(`${a}${b} = ${ab}`)}. Tính ${m(`${nA}${nB}`)}.`, tpl:`${m(`${nA}${nB} =`)} [_]`, ans:[ab * num / den], fig, hint:`${nA}${nB} song song ${a}${b}; dùng Thales trong tam giác ${s}${a}${b}.`, sol:`${m(`${nA}${nB} \\parallel ${a}${b}`)} nên ${m(`${nA}${nB} = ${kk} \\cdot ${ab}`)} = ${tb(ab * num / den)}.`});
    return QB({text:`${base} Biết ${m(`${b}${c} = ${bc}`)}. Tính ${m(`${nB}${nC}`)}.`, tpl:`${m(`${nB}${nC} =`)} [_]`, ans:[bc * num / den], fig, hint:`${nB}${nC} song song ${b}${c}.`, sol:`${m(`${nB}${nC} \\parallel ${b}${c}`)} nên ${m(`${nB}${nC} = ${kk} \\cdot ${bc}`)} = ${tb(bc * num / den)}.`});
  }
  if(lv === 2){
    const t = R(0, 2);
    if(t === 0) return QB({text:`${base} Biết ${m(`${a}${b} = ${ab}`)}, ${m(`${b}${c} = ${bc}`)}, ${m(`${c}${a} = ${ca}`)}. Tính chu vi tam giác ${m(tri)}.`, tpl:'[_]', ans:[(ab + bc + ca) * num / den], fig, hint:`Tam giác ${tri} đồng dạng với tam giác ${a}${b}${c} theo tỉ số k.`, sol:`Tam giác ${m(tri)} đồng dạng tam giác ${m(a + b + c)} theo tỉ số ${m(kk)}, nên chu vi bằng ${m(`${kk} \\cdot ${ab + bc + ca}`)} = ${tb((ab + bc + ca) * num / den)}.`});
    if(t === 1){ const area = den * den * R(1, 4);
      return QB({text:`${base} Biết diện tích tam giác ${m(a + b + c)} bằng ${m(area)}. Tính diện tích tam giác ${m(tri)}.`, tpl:'[_]', ans:[area * num * num / (den * den)], fig, hint:'Tỉ số diện tích bằng bình phương tỉ số đồng dạng.', sol:`Tỉ số diện tích ${m(`k^2 = \\dfrac{${num * num}}{${den * den}}`)}, diện tích bằng ${m(`\\dfrac{${num * num}}{${den * den}} \\cdot ${area}`)} = ${tb(area * num * num / (den * den))}.`}); }
    const SA = den * R(2, 4);
    return QB({text:`${base} Biết ${m(`${s}${a} = ${SA}`)}. Tính ${m(`${a}${nA}`)}.`, tpl:`${m(`${a}${nA} =`)} [_]`, ans:[SA - SA * num / den], fig, hint:`${a}${nA} = ${s}${a} − ${s}${nA}.`, sol:`${m(`${s}${nA} = ${kk} \\cdot ${SA} = ${SA * num / den}`)} nên ${m(`${a}${nA} = ${SA} - ${SA * num / den}`)} = ${tb(SA - SA * num / den)}.`});
  }
  if(R(0, 1) === 0){ const area = den * den * R(2, 5), per = (ab + bc + ca) * num / den, ar2 = area * num * num / (den * den);
    return QS({text:`${base} Biết chu vi tam giác ${m(a + b + c)} bằng ${m(ab + bc + ca)} và diện tích tam giác ${m(a + b + c)} bằng ${m(area)}. Tính tổng chu vi và diện tích của tam giác ${m(tri)}.`, fig, direct:true,
      hint:`Tam giác ${tri} đồng dạng ${a}${b}${c} theo tỉ số k: chu vi nhân k, diện tích nhân k².`,
      sol:`${m(`${nA}${nB} \\parallel ${a}${b}`)}, ${m(`${nB}${nC} \\parallel ${b}${c}`)}, ${m(`${nA}${nC} \\parallel ${a}${c}`)} nên tam giác ${m(tri)} đồng dạng tam giác ${m(a + b + c)} theo tỉ số ${m(kk)}. Chu vi bằng ${m(`${kk} \\cdot ${ab + bc + ca} = ${per}`)}; diện tích bằng ${m(`\\dfrac{${num * num}}{${den * den}} \\cdot ${area} = ${ar2}`)}. Tổng là ${tb(per + ar2)}.`,
      steps:[
        {tag:'Kế hoạch', ask:`Tam giác ${m(tri)} và ${m(a + b + c)} có quan hệ`, opts:['đồng dạng theo tỉ số k', 'bằng nhau', 'đồng dạng theo tỉ số k²', 'không có quan hệ'], ans:'đồng dạng theo tỉ số k', keepOrder:true, hint:'Các cạnh tương ứng song song.'},
        {tag:'Giải', ask:`Chu vi tam giác ${m(tri)} là`, tpl:'[_]', ans:[per], hint:`Chu vi nhân ${num}/${den}.`},
        {tag:'Đáp số', ask:`Diện tích tam giác ${m(tri)} là`, tpl:'[_]', ans:[ar2], hint:'Diện tích nhân bình phương tỉ số.'}]}); }
  const SA = den * R(2, 4), area = den * den * R(2, 5), ar2 = area * num * num / (den * den);
  return QS({text:`${base} Biết ${m(`${s}${a} = ${SA}`)} và diện tích tam giác ${m(a + b + c)} bằng ${m(area)}. Tính ${m(`${a}${nA}`)} và diện tích tam giác ${m(tri)}.`, fig, direct:true,
    hint:`${a}${nA} = ${s}${a} − ${s}${nA}; diện tích nhân k².`,
    sol:`${m(`${s}${nA} = ${kk} \\cdot ${SA} = ${SA * num / den}`)} nên ${m(`${a}${nA} = ${SA} - ${SA * num / den} = ${SA - SA * num / den}`)}. Diện tích tam giác ${m(tri)} bằng ${m(`\\dfrac{${num * num}}{${den * den}} \\cdot ${area} = ${ar2}`)}. Đáp số: ${tb(`${a}${nA} = ${SA - SA * num / den}`)} và diện tích ${tb(ar2)}.`,
    steps:[
      {tag:'Kế hoạch', ask:`Tính ${m(`${s}${nA}`)}:`, tpl:`${m(`${s}${nA} =`)} [_]`, ans:[SA * num / den], hint:`${num}/${den} của ${s}${a}.`},
      {tag:'Giải', ask:`${m(`${a}${nA} =`)}`, tpl:'[_]', ans:[SA - SA * num / den], hint:`${s}${a} trừ ${s}${nA}.`},
      {tag:'Đáp số', ask:`Diện tích tam giác ${m(tri)} là`, tpl:'[_]', ans:[ar2], hint:'Diện tích nhân bình phương tỉ số đồng dạng.'}]});
};

const K13KT = [
  {t:'Vị trí tương đối của hai mặt phẳng', b:`Hai mặt phẳng phân biệt ${tm('(P)')}, ${tm('(Q)')} chỉ có hai vị trí: <ul><li><b>song song</b> – không có điểm chung, ${tm('(P) \\parallel (Q)')};</li><li><b>cắt nhau</b> – có một đường thẳng chung (giao tuyến).</li></ul>`,
    warn:'Hai mặt phẳng không có khái niệm “chéo nhau”. Có một điểm chung thì phải có cả đường thẳng chung.', ex:'Hai mặt đối diện của hình hộp, hai đáy của lăng trụ song song; hai mặt có chung cạnh thì cắt nhau theo cạnh đó.'},
  {t:'Điều kiện để hai mặt phẳng song song', b:`Nếu mặt phẳng ${tm('(P)')} chứa hai đường thẳng <b>cắt nhau</b> ${tm('a, b')} cùng song song với ${tm('(Q)')} thì ${tm('(P) \\parallel (Q)')}.`,
    warn:'Hai đường thẳng trong (P) phải cắt nhau: hai đường thẳng song song chưa đủ.', ex:'Trên hình hộp: hai đường chéo mặt cắt nhau trong một mặt phẳng song song với hai đường chéo mặt của mặt phẳng kia thì hai mặt phẳng song song.'},
  {t:'Tính chất của hai mặt phẳng song song', b:`<ul><li>Qua một điểm nằm ngoài ${tm('(P)')} có <b>duy nhất</b> một mặt phẳng song song với ${tm('(P)')}.</li><li>${tm('(P) \\parallel (Q)')} thì mọi đường thẳng trong ${tm('(P)')} song song với ${tm('(Q)')}.</li><li>Mặt phẳng ${tm('(R)')} cắt ${tm('(P)')}, ${tm('(Q)')} thì hai giao tuyến <b>song song</b>.</li></ul>`,
    warn:'(P) ∥ (Q) không kéo theo mọi đường thẳng trong (P) song song mọi đường thẳng trong (Q): có cặp chéo nhau.', ex:'Cần giao tuyến của mặt phẳng thứ ba với một mặt đáy: kẻ qua điểm chung đường thẳng song song với giao tuyến đã biết ở mặt đáy kia.'},
  {t:'Định lí Thales và hình chóp cắt bởi mặt phẳng song song đáy', b:`Ba mặt phẳng song song chắn trên hai cát tuyến những đoạn thẳng tương ứng tỉ lệ: ${tm("\\dfrac{AB}{BC} = \\dfrac{A'B'}{B'C'}")}. Mặt phẳng ${tm('(\\alpha) \\parallel (ABC)')} cắt hình chóp ${tm('S.ABC')} theo tam giác ${tm("A'B'C'")} đồng dạng ${tm('ABC')} với tỉ số ${tm("k = \\dfrac{SA'}{SA}")}.`,
    warn:'Chu vi nhân k, diện tích nhân k² (không phải k).', ex:"Phần còn lại AA′ = SA − SA′, đừng nhầm SA′ với AA′."}
];

lesson(5, 'hai-mp-song-song', 'Bài 13. Hai mặt phẳng song song', 'Vị trí tương đối của hai mặt phẳng, điều kiện và tính chất song song, định lí Thales trong không gian, hình chóp cắt bởi mặt phẳng song song với đáy.', [g13a, g13b, g13c, g13d, g13e, g13f], {introTitle:'Kiến thức cần nhớ · Chỗ dễ sai · Mẹo', intro:K13KT});

}

})();
