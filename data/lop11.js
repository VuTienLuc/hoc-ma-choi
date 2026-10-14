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
})();
