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

/* ---------- Tiện ích ---------- */
const M = '−';
const neg = n => n < 0 ? M + (-n) : String(n);
const V = s => `<i>${s}</i>`, X = V('x'), AL = 'α';
const sR = (a,b) => pick([-1,1])*R(a,b);
const PI = 2160, P2 = 4320, D = 12;                     // π, 2π, 1°
const mod = (u,m) => ((u % m) + m) % m;
const piStr = u => { if(u===0) return '0'; const g=gcd(Math.abs(u),PI), p=u/g, q=PI/g, s=p<0?M:'', a=Math.abs(p);
  return q===1 ? s+(a===1?'':a)+'π' : s+F((a===1?'':a)+'π', q); };
const degStr = u => neg(u/D)+'°';
const rad = u => u/PI*Math.PI;
const fr = (p,q) => { if(q<0){p=-p;q=-q} const g=gcd(p,q)||1; p/=g; q/=g; return q===1?neg(p):(p<0?M:'')+F(Math.abs(p),q); };
// Bảng giá trị đặc biệt
const S3=Math.sqrt(3), S2=Math.SQRT2, S6=Math.sqrt(6);
const KV = {'0':0,'1/2':.5,'√2/2':S2/2,'√3/2':S3/2,'1':1,'√3/3':S3/3,'√3':S3,'3/2':1.5,'√6/2':S6/2,'2':2,
  '(√6+√2)/4':(S6+S2)/4,'(√6−√2)/4':(S6-S2)/4,'2+√3':2+S3,'2−√3':2-S3};
const keyOf = v => { if(!isFinite(v)||Math.abs(v)>1e6) return null; for(const k in KV) if(Math.abs(KV[k]-Math.abs(v))<1e-9) return (v<-1e-9?M:'')+k; return null; };
const valH = k => { const s=k.startsWith(M), b=s?k.slice(1):k; let h;
  if(b.startsWith('(')){ const [n,d]=b.slice(1).split(')/'); h=F(n.replace('+',' + ').replace('−',' − '),d); }
  else if(b.includes('/')){ const [n,d]=b.split('/'); h=F(n,d); } else h=b.replace('+',' + ').replace('−',' − ');
  return (s?M:'')+h; };
const FN = { sin:u=>Math.sin(rad(u)), cos:u=>Math.cos(rad(u)), tan:u=>Math.abs(Math.cos(rad(u)))<1e-12?Infinity:Math.tan(rad(u)), cot:u=>Math.abs(Math.sin(rad(u)))<1e-12?Infinity:1/Math.tan(rad(u)) };
const SC_KEYS = ['0','1/2','√2/2','√3/2','1'], T_KEYS = ['0','√3/3','1','√3'];
const withNeg = ks => ks.flatMap(k=>k==='0'?[k]:[k,M+k]);
const distractKeys = (good, pool) => { const c=withNeg(pool).filter(k=>k!==good); const opp=good.startsWith(M)?good.slice(1):M+good;
  return [...new Set([...(c.includes(opp)?[opp]:[]), ...shuffle(c)])].slice(0,3); };
const QUAD = ['','0 < α < '+piStr(PI/2), piStr(PI/2)+' < α < π', 'π < α < '+piStr(3*PI/2), piStr(3*PI/2)+' < α < 2π'];
const SIGN = {sin:[0,1,1,-1,-1], cos:[0,1,-1,-1,1], tan:[0,1,-1,1,-1], cot:[0,1,-1,1,-1]};
const TRIP = [[3,4,5],[5,12,13],[8,15,17],[7,24,25],[20,21,29]];

/* =====================================================================
   BÀI 1. GIÁ TRỊ LƯỢNG GIÁC CỦA GÓC LƯỢNG GIÁC
   ===================================================================== */
const g1a = lv => {   // độ ↔ radian, độ dài cung
  if(lv<3){ const degs=lv===1?[30,45,60,90,120,135,150,180,270,360]:[-150,-135,-120,-60,-45,210,225,240,300,315,330,405,480,540,-210];
    const d=pick(degs), u=d*D;
    if(Math.random()<.5){ const W=shuffle(degs.filter(x=>x!==d)).slice(0,3).map(x=>piStr(x*D));
      return QC({text:`Đổi số đo góc <b>${neg(d)}°</b> sang radian.`, opts:[piStr(u),...W], ans:piStr(u),
        hint:'Dùng 180° = π rad, tức là nhân số đo độ với π/180.', sol:`${neg(d)}° = ${neg(d)} · π/180 = <b>${piStr(u)}</b>.`}); }
    return QB({text:`Đổi số đo góc <span class="mx">${piStr(u)}</span> sang độ.`, tpl:'[_] độ', ans:[d],
      hint:'Thay π bằng 180° rồi tính.', sol:`${piStr(u)} = <b>${neg(d)}°</b>.`}); }
  const q=pick([2,3,4,6]), p=R(1,2*q-1), k=R(1,4), Rr=q*k, l=p*k;   // α = pπ/q, R = q·k ⇒ l = pk·π
  if(gcd(p,q)!==1) return g1a(lv);
  const deg=Math.random()<.5;
  return QB({text:`Một đường tròn có bán kính <b>${Rr} cm</b>. Tính độ dài cung tròn có số đo <b>${deg?degStr(p*PI/q):piStr(p*PI/q)}</b>.`, tpl:'[_]π cm', ans:[l],
    hint:'Độ dài cung l = R·α, với α đo bằng radian.', sol:`${deg?`${degStr(p*PI/q)} = ${piStr(p*PI/q)}. `:''}l = ${Rr} · ${piStr(p*PI/q)} = <b>${l===1?'':l}π</b> cm.`});
};
const g1b = lv => {   // cùng điểm biểu diễn
  if(lv<3){ const b=5*R(1,71), k=R(1,4), a=lv===1?b+360*k:b-360*k;
    return QB({text:`Góc lượng giác có số đo <b>${neg(a)}°</b> có cùng điểm biểu diễn trên đường tròn lượng giác với góc có số đo β, 0° ≤ β < 360°. Tìm β.`, tpl:'β = [_] độ', ans:[b],
      hint:'Hai góc có cùng điểm biểu diễn khi hơn kém nhau một bội của 360°. Cộng hoặc trừ 360° nhiều lần.', sol:`${neg(a)}° = ${b}° ${lv===1?'+':M} ${k}·360°. Vậy β = <b>${b}°</b>.`}); }
  const q=pick([3,4,6]), p=R(0,2*q-1), k=sR(1,4), b=p*PI/q, a=b+k*P2;
  const good=piStr(b), W=[...new Set([b+PI,P2-b,b+PI/2,mod(-b,P2),mod(b+PI/q,P2)].map(x=>piStr(mod(x,P2))))].filter(s=>s!==good);
  return QC({text:`Góc lượng giác <span class="mx">${piStr(a)}</span> có cùng điểm biểu diễn với góc nào trong [0; 2π)?`, opts:[good,...shuffle(W).slice(0,3)], ans:good,
    hint:'Cộng hoặc trừ một bội của 2π để đưa số đo về nửa khoảng [0; 2π).', sol:`${piStr(a)} = ${good} ${k<0?'−':'+'} ${Math.abs(k)===1?'2π':Math.abs(k)+'·2π'}. Vậy góc cần tìm là <b>${good}</b>.`});
};
const g1c = lv => {   // dấu các giá trị lượng giác
  const q=R(1,4); let cond;
  if(lv<3) cond=`Cho <span class="mx">${QUAD[q]}.</span>`;
  else { const b=R((q-1)*90+5,q*90-5), k=sR(1,5); cond=`Cho góc <b>α = ${neg(b+360*k)}°</b>.`; }
  const st=[]; ['sin','cos','tan','cot'].forEach(f=>{ const s=SIGN[f][q]; st.push([`${f} α > 0`,s>0],[`${f} α < 0`,s<0]); });
  const T=shuffle(st.filter(x=>x[1])), Fa=shuffle(st.filter(x=>!x[1]));
  return QC({text:`${cond} Khẳng định nào sau đây <b>đúng</b>?`, opts:[T[0][0],...Fa.slice(0,3).map(x=>x[0])], ans:T[0][0],
    hint:(lv===3?'Trừ bớt các bội của 360° để biết α thuộc góc phần tư nào. ':'')+'Góc phần tư I: tất cả dương; II: chỉ sin dương; III: tan, cot dương; IV: chỉ cos dương.',
    sol:`Điểm biểu diễn α thuộc góc phần tư thứ ${['','I','II','III','IV'][q]}, nên <b>${T[0][0]}</b>.`});
};
const g1d = lv => {   // giá trị lượng giác các góc đặc biệt
  let f,u,k;
  do{ f=pick(lv===1?['sin','cos']:lv===2?['sin','cos','tan']:['sin','cos','tan','cot']);
    const base=pick([0,30,45,60,90,120,135,150,180,210,225,240,270,300,315,330])*D;
    u=lv===1?(base<=PI?base:base-P2*0+base%PI):lv===2?(Math.random()<.5?base:base-P2):base+sR(1,3)*P2;
    if(lv===1&&u>PI) u=base%PI;
    k=keyOf(FN[f](u)); }while(!k);
  const pool=f==='sin'||f==='cos'?SC_KEYS:T_KEYS, W=distractKeys(k,pool).map(valH), good=valH(k), u0=mod(u,P2);
  return QC({text:`Tính giá trị: <span class="mx">${f} ${lv===1&&Math.random()<.4?degStr(u):u<0?'('+piStr(u)+')':piStr(u)} = ?</span>`, opts:[good,...W], ans:good,
    hint:'Đưa về góc trong [0; 2π) bằng cách bớt bội của 2π, xét góc phần tư để lấy dấu, rồi dùng giá trị của góc đặc biệt 0, π/6, π/4, π/3, π/2.',
    sol:`${u!==u0?`${f}(${piStr(u)}) = ${f} ${piStr(u0)} (bớt bội của 2π). `:''}${f} ${piStr(u0)} = <b>${good}</b>.`});
};
const g1e = lv => {   // biết một GTLG, tính GTLG khác
  let [a,b,c]=pick(TRIP); if(Math.random()<.5)[a,b]=[b,a];
  const q=lv===1?1:R(2,4), s=SIGN.sin[q]*a, co=SIGN.cos[q]*b;         // sin α = s/c, cos α = co/c
  if(lv<3){ const giveSin=Math.random()<.5, gv=giveSin?s:co, ask=giveSin?'cos':'sin', av=giveSin?co:s;
    return QB({text:`Cho <b>${giveSin?'sin':'cos'} α = ${fr(gv,c)}</b> với <span class="mx">${QUAD[q]}</span>Tính ${ask} α.`, tpl:`<span class="eq">${ask} α = [F]</span>`, ans:[{frac:[av,c],mode:'eq'}],
      hint:`Dùng sin²α + cos²α = 1, rồi xét dấu của ${ask} α theo góc phần tư.`,
      sol:`${ask}²α = 1 − (${fr(gv,c)})² = ${F(b*b===av*av?b*b:av*av,c*c)} ⇒ ${ask} α = ±${F(Math.abs(av),c)}. Vì α thuộc góc phần tư ${['','I','II','III','IV'][q]} nên ${ask} α ${av>0?'>':'<'} 0: ${ask} α = <b>${fr(av,c)}</b>.`}); }
  const t=[s,co], ask=pick(['sin','cos']), av=ask==='sin'?s:co;
  return QB({text:`Cho <b>tan α = ${fr(s,co)}</b> với <span class="mx">${QUAD[q]}</span>Tính ${ask} α.`, tpl:`<span class="eq">${ask} α = [F]</span>`, ans:[{frac:[av,c],mode:'eq'}],
    hint:'Dùng 1 + tan²α = 1/cos²α để tìm cos α (xét dấu), rồi sin α = tan α · cos α.',
    sol:`1/cos²α = 1 + (${fr(s,co)})² = ${F(c*c,b*b)} ⇒ cos α = ±${F(b,c)}; theo góc phần tư, cos α = ${fr(co,c)}${ask==='sin'?`, sin α = tan α · cos α = <b>${fr(s,c)}</b>`:` = <b>${fr(co,c)}</b>`}.`});
};

/* =====================================================================
   BÀI 2. CÔNG THỨC LƯỢNG GIÁC
   ===================================================================== */
const SPECIAL=[30,45,60,90,120,135,150];
const g2a = lv => {   // công thức cộng
  if(lv===1){ const t=pick(SPECIAL), form=pick(['sin+','sin-','cos+','cos-']); let a,b;
    do{ b=5*R(1,Math.floor((t-5)/5)); a=form.endsWith('+')?t-b:t+b }while(b===a||[30,45,60,90].includes(b));
    const f=form.slice(0,3), expr=form==='sin+'?`sin ${a}° cos ${b}° + cos ${a}° sin ${b}°`:form==='sin-'?`sin ${a}° cos ${b}° − cos ${a}° sin ${b}°`:form==='cos+'?`cos ${a}° cos ${b}° − sin ${a}° sin ${b}°`:`cos ${a}° cos ${b}° + sin ${a}° sin ${b}°`;
    const k=keyOf(FN[f](t*D)), good=valH(k);
    return QC({text:`Tính: <span class="mx">${expr}</span>`, opts:[good,...distractKeys(k,SC_KEYS).map(valH)], ans:good,
      hint:'Nhận dạng công thức cộng: sin(a ± b) = sin a cos b ± cos a sin b; cos(a ± b) = cos a cos b ∓ sin a sin b.',
      sol:`Biểu thức bằng ${f}(${a}° ${form.endsWith('+')?'+':M} ${b}°) = ${f} ${t}° = <b>${good}</b>.`}); }
  if(lv===2){ const d=pick([15,75,105,165]), f=pick(['sin','cos','tan']), u=d*D, k=keyOf(FN[f](u));
    const split={15:'45° − 30°',75:'45° + 30°',105:'60° + 45°',165:'120° + 45°'}[d];
    const pool=f==='tan'?['2+√3','2−√3','√3','1']:['(√6+√2)/4','(√6−√2)/4','√2/2','√3/2'];
    const good=valH(k), W=[...new Set(withNeg(pool).filter(x=>x!==k))].sort((x,y)=>(y===(k.startsWith(M)?k.slice(1):M+k))-(x===(k.startsWith(M)?k.slice(1):M+k))).slice(0,3).map(valH);
    const ang=Math.random()<.5?`${d}°`:piStr(u);
    return QC({text:`Tính giá trị: <span class="mx">${f} ${ang} = ?</span>`, opts:[good,...W], ans:good,
      hint:`Viết ${d}° = ${split} rồi áp dụng công thức cộng.`, sol:`${f} ${d}° = ${f}(${split}) = <b>${good}</b>.`}); }
  let [x1,y1,r1]=pick(TRIP), [x2,y2,r2]=pick(TRIP); if(Math.random()<.5)[x1,y1]=[y1,x1]; if(Math.random()<.5)[x2,y2]=[y2,x2];
  const f=pick(['sin(a + b)','sin(a − b)','cos(a + b)','cos(a − b)']);
  const num={'sin(a + b)':x1*y2+y1*x2,'sin(a − b)':x1*y2-y1*x2,'cos(a + b)':y1*y2-x1*x2,'cos(a − b)':y1*y2+x1*x2}[f], den=r1*r2;
  const form={'sin(a + b)':'sin a cos b + cos a sin b','sin(a − b)':'sin a cos b − cos a sin b','cos(a + b)':'cos a cos b − sin a sin b','cos(a − b)':'cos a cos b + sin a sin b'}[f];
  return QB({text:`Cho a, b là các góc nhọn với <b>sin a = ${F(x1,r1)}</b>, <b>cos b = ${F(y2,r2)}</b>. Tính ${f}.`, tpl:`<span class="eq">${f} = [F]</span>`, ans:[{frac:[num,den],mode:'eq'}],
    hint:'Tính cos a và sin b trước (a, b nhọn nên đều dương), rồi dùng công thức cộng.',
    sol:`cos a = ${F(y1,r1)}, sin b = ${F(x2,r2)}. ${f} = ${form} = <b>${fr(num,den)}</b>.`});
};
const g2b = lv => {   // công thức nhân đôi
  let [a,b,c]=pick(TRIP); if(Math.random()<.5)[a,b]=[b,a];
  if(lv===1){ const giveSin=Math.random()<.5, v=giveSin?a:b, num=giveSin?c*c-2*a*a:2*b*b-c*c, den=c*c;
    return QB({text:`Cho <b>${giveSin?'sin':'cos'} α = ${F(v,c)}</b>. Tính cos 2α.`, tpl:'<span class="eq">cos 2α = [F]</span>', ans:[{frac:[num,den],mode:'eq'}],
      hint:giveSin?'Dùng cos 2α = 1 − 2sin²α.':'Dùng cos 2α = 2cos²α − 1.',
      sol:giveSin?`cos 2α = 1 − 2 · ${F(a*a,c*c)} = <b>${fr(num,den)}</b>.`:`cos 2α = 2 · ${F(b*b,c*c)} − 1 = <b>${fr(num,den)}</b>.`}); }
  if(lv===2){ const q=R(1,4), s=SIGN.sin[q]*a, co=SIGN.cos[q]*b, num=2*s*co, den=c*c;
    return QB({text:`Cho <b>sin α = ${fr(s,c)}</b> với <span class="mx">${QUAD[q]}</span>Tính sin 2α.`, tpl:'<span class="eq">sin 2α = [F]</span>', ans:[{frac:[num,den],mode:'eq'}],
      hint:'Tìm cos α (chú ý dấu theo góc phần tư), rồi dùng sin 2α = 2 sin α cos α.',
      sol:`cos α = ${fr(co,c)}. sin 2α = 2 · ${fr(s,c)} · ${fr(co,c)} = <b>${fr(num,den)}</b>.`}); }
  let p,q; do{p=R(1,5);q=R(1,5)}while(p===q||gcd(p,q)!==1); const sg=pick([1,-1]); p*=sg;
  const ask=pick(['cos 2α','sin 2α','tan 2α']);
  const [num,den]=ask==='cos 2α'?[q*q-p*p,q*q+p*p]:ask==='sin 2α'?[2*p*q,q*q+p*p]:[2*p*q,q*q-p*p];
  return QB({text:`Cho <b>tan α = ${fr(p,q)}</b>. Tính ${ask}.`, tpl:`<span class="eq">${ask} = [F]</span>`, ans:[{frac:[num,den],mode:'eq'}],
    hint:ask==='tan 2α'?'tan 2α = 2tan α / (1 − tan²α).':ask==='cos 2α'?'cos 2α = (1 − tan²α)/(1 + tan²α).':'sin 2α = 2tan α/(1 + tan²α).',
    sol:`Với t = tan α = ${fr(p,q)}: ${ask} = ${ask==='tan 2α'?'2t/(1 − t²)':ask==='cos 2α'?'(1 − t²)/(1 + t²)':'2t/(1 + t²)'} = <b>${fr(num,den)}</b>.`});
};
const kx = k => k===1?X:`${k}${X}`;
const g2c = lv => {   // biến đổi tích ↔ tổng
  if(lv===1){ let a,b; do{a=R(2,6);b=R(1,5)}while(a<=b); const t=pick(['sc','cc','ss']);
    const L={sc:`2 sin ${kx(a)} cos ${kx(b)}`,cc:`2 cos ${kx(a)} cos ${kx(b)}`,ss:`2 sin ${kx(a)} sin ${kx(b)}`}[t];
    const S=a+b, Dd=a-b, good={sc:`sin ${kx(S)} + sin ${kx(Dd)}`,cc:`cos ${kx(S)} + cos ${kx(Dd)}`,ss:`cos ${kx(Dd)} − cos ${kx(S)}`}[t];
    const all=[`sin ${kx(S)} + sin ${kx(Dd)}`,`cos ${kx(S)} + cos ${kx(Dd)}`,`cos ${kx(Dd)} − cos ${kx(S)}`,`cos ${kx(S)} − cos ${kx(Dd)}`,`sin ${kx(S)} − sin ${kx(Dd)}`];
    return QC({text:`Biến đổi thành tổng: <span class="mx">${L}</span>`, opts:[good,...shuffle(all.filter(x=>x!==good)).slice(0,3)], ans:good,
      hint:'2sin a cos b = sin(a + b) + sin(a − b); 2cos a cos b = cos(a + b) + cos(a − b); 2sin a sin b = cos(a − b) − cos(a + b).', sol:`${L} = <b>${good}</b>.`}); }
  if(lv===2){ let a,b; do{a=R(2,9);b=R(1,7)}while(a<=b||(a-b)%2); const h=(a+b)/2, d=(a-b)/2, t=pick(['s+','s-','c+','c-']);
    const L={'s+':`sin ${kx(a)} + sin ${kx(b)}`,'s-':`sin ${kx(a)} − sin ${kx(b)}`,'c+':`cos ${kx(a)} + cos ${kx(b)}`,'c-':`cos ${kx(a)} − cos ${kx(b)}`}[t];
    const cand={'s+':`2 sin ${kx(h)} cos ${kx(d)}`,'s-':`2 cos ${kx(h)} sin ${kx(d)}`,'c+':`2 cos ${kx(h)} cos ${kx(d)}`,'c-':`${M}2 sin ${kx(h)} sin ${kx(d)}`};
    const good=cand[t], W=[...Object.values(cand).filter(x=>x!==good),`2 sin ${kx(h)} sin ${kx(d)}`].filter(x=>x!==good);
    return QC({text:`Biến đổi thành tích: <span class="mx">${L}</span>`, opts:[good,...shuffle(W).slice(0,3)], ans:good,
      hint:'sin a + sin b = 2sin((a+b)/2)cos((a−b)/2); sin a − sin b = 2cos((a+b)/2)sin((a−b)/2); cos a + cos b = 2cos((a+b)/2)cos((a−b)/2); cos a − cos b = −2sin((a+b)/2)sin((a−b)/2).',
      sol:`${L} = <b>${good}</b>.`}); }
  const [m,d]=pick([[45,30],[60,45],[60,30],[90,45],[90,30]]), A=m+d, B=m-d, t=pick(['s+','s-','c+','c-']);
  const f=u=>Math.sin(u*D/PI*Math.PI), g=u=>Math.cos(u*D/PI*Math.PI);
  const val={'s+':Math.sin(rad(A*D))+Math.sin(rad(B*D)),'s-':Math.sin(rad(A*D))-Math.sin(rad(B*D)),'c+':Math.cos(rad(A*D))+Math.cos(rad(B*D)),'c-':Math.cos(rad(A*D))-Math.cos(rad(B*D))}[t];
  const k=keyOf(val); if(!k) return g2c(lv);
  const L={'s+':`sin ${A}° + sin ${B}°`,'s-':`sin ${A}° − sin ${B}°`,'c+':`cos ${A}° + cos ${B}°`,'c-':`cos ${A}° − cos ${B}°`}[t];
  const P={'s+':`2 sin ${m}° cos ${d}°`,'s-':`2 cos ${m}° sin ${d}°`,'c+':`2 cos ${m}° cos ${d}°`,'c-':`${M}2 sin ${m}° sin ${d}°`}[t];
  const good=valH(k), W=distractKeys(k,['0','1/2','√2/2','√3/2','1','√6/2','3/2']).map(valH);
  return QC({text:`Tính giá trị: <span class="mx">${L}</span>`, opts:[good,...W], ans:good,
    hint:'Biến tổng thành tích; (a + b)/2 và (a − b)/2 sẽ là các góc đặc biệt.', sol:`${L} = ${P} = <b>${good}</b>.`});
};

/* =====================================================================
   BÀI 3. HÀM SỐ LƯỢNG GIÁC
   ===================================================================== */
const Dm = c => `ℝ \\ {${c} | k ∈ ℤ}`;
const DOMS = [
  [1,'y = tan x',Dm(`${piStr(PI/2)} + kπ`)],[1,'y = cot x',Dm('kπ')],[1,`y = ${F(1,'sin x')}`,Dm('kπ')],[1,`y = ${F(1,'cos x')}`,Dm(`${piStr(PI/2)} + kπ`)],
  [2,'y = tan 2x',Dm(`${piStr(PI/4)} + k${piStr(PI/2)}`)],[2,`y = cot(x − ${piStr(PI/4)})`,Dm(`${piStr(PI/4)} + kπ`)],[2,'y = cot 3x',Dm(`k${piStr(PI/3)}`)],[2,`y = tan(x + ${piStr(PI/3)})`,Dm(`${piStr(PI/6)} + kπ`)],
  [3,`y = ${F(1,'sin x − 1')}`,Dm(`${piStr(PI/2)} + k2π`)],[3,`y = ${F(2,'cos x + 1')}`,Dm('π + k2π')],[3,`y = ${F('sin x','1 − cos x')}`,Dm('k2π')],[3,'y = √(1 − cos x)','ℝ'],[3,'y = √(sin x + 2)','ℝ'],
];
const g3a = lv => { const pool=DOMS.filter(d=>d[0]<=lv), it=pick(pool.filter(d=>d[0]===lv)), good=it[2];
  const W=shuffle([...new Set(DOMS.map(d=>d[2]))].filter(x=>x!==good)).slice(0,3);
  return QC({text:`Tìm tập xác định D của hàm số <span class="mx">${it[1]}</span>`, opts:[good,...W].map(s=>'D = '+s), ans:'D = '+good,
    hint:'tan u xác định khi cos u ≠ 0 (u ≠ π/2 + kπ); cot u xác định khi sin u ≠ 0 (u ≠ kπ); phân thức cần mẫu ≠ 0; căn bậc hai cần biểu thức dưới căn ≥ 0.',
    sol:`D = <b>${good}</b>.`}); };
const PAR = [
  [1,'y = sin x','lẻ'],[1,'y = cos x','chẵn'],[1,'y = tan x','lẻ'],[1,'y = cot x','lẻ'],
  [2,'y = x sin x','chẵn'],[2,'y = sin²x','chẵn'],[2,'y = sin x cos x','lẻ'],[2,'y = cos 2x','chẵn'],[2,'y = sin x + cos x','không chẵn, không lẻ'],[2,'y = x² cos x','chẵn'],
  [3,'y = x³ + sin x','lẻ'],[3,'y = sin x − 1','không chẵn, không lẻ'],[3,'y = |sin x|','chẵn'],[3,'y = tan x + sin 2x','lẻ'],[3,'y = cos x + x','không chẵn, không lẻ'],[3,'y = sin x · cos²x','lẻ'],[3,'y = x + tan x','lẻ'],
];
const g3b = lv => { const it=pick(PAR.filter(p=>p[0]===lv||(lv===3&&p[0]===2&&Math.random()<.3)));
  const opts=['Hàm số chẵn','Hàm số lẻ','Hàm số không chẵn, không lẻ'], ans='Hàm số '+it[2];
  return QC({text:`Xét tính chẵn, lẻ của hàm số <span class="mx">${it[1]}</span>`, opts, ans, keepOrder:true,
    hint:'Tập xác định đối xứng. Tính f(−x): nếu f(−x) = f(x) thì chẵn; f(−x) = −f(x) thì lẻ. Nhớ: sin, tan, cot lẻ; cos chẵn.',
    sol:`Tính f(−x) và so sánh với f(x): hàm số đã cho là <b>hàm số ${it[2]}</b>.`}); };
const g3c = lv => {   // chu kì
  let fn,T,why;
  if(lv===1){ const a=pick([2,3,4,5]), f=pick(['sin','cos','tan']); fn=`y = ${f} ${a}x`; T=(f==='tan'?PI:P2)/a; why=`chu kì ${f==='tan'?'π':'2π'}/${a}`; }
  else if(lv===2){ const a=pick([2,3,4]), A=R(2,5), c=R(-3,3), b=pick([PI/3,PI/4,PI/6]), f=pick(['sin','cos']);
    fn=`y = ${A}${f}(${a}x ${Math.random()<.5?'+':M} ${piStr(b)})${c?` ${c<0?M:'+'} ${Math.abs(c)}`:''}`; T=P2/a; why=`hệ số của x là ${a} nên T = 2π/${a}`; }
  else { const t=pick([['y = sin²x',PI,'sin²x = (1 − cos 2x)/2'],['y = cos²2x',PI/2,'cos²2x = (1 + cos 4x)/2'],['y = sin x cos x',PI,'sin x cos x = ½ sin 2x'],['y = tan(x/2)',P2,'tan(x/2) có T = π : ½'],['y = cos(x/2)',2*P2,'cos(x/2) có T = 2π : ½']]);
    [fn,T,why]=t; }
  const good=piStr(T), W=[...new Set([T*2,T/2,T*4,PI,P2,PI/2].map(piStr))].filter(s=>s!==good);
  return QC({text:`Tìm chu kì tuần hoàn của hàm số <span class="mx">${fn}</span>`, opts:[good,...shuffle(W).slice(0,3)], ans:good,
    hint:'y = sin(ax + b), cos(ax + b) có chu kì 2π/|a|; y = tan(ax + b), cot(ax + b) có chu kì π/|a|. Với sin², cos² hãy hạ bậc trước.',
    sol:`${why}: T = <b>${good}</b>.`}); };
const g3d = lv => {   // GTLN, GTNN
  let fn,mx,mn,why;
  if(lv<3){ const k=lv===1?R(2,6):sR(2,6), c=R(-5,6), f=pick(['sin x','cos x',...(lv===2?['sin 2x','cos(x − '+piStr(PI/3)+')']:[])]);
    fn=`y = ${c?c+' ':''}${c?(k<0?M+' ':'+ '):(k<0?M:'')}${Math.abs(k)}${f}`; if(!c) fn=`y = ${k<0?M:''}${Math.abs(k)}${f}`; else fn=`y = ${neg(c)} ${k<0?M:'+'} ${Math.abs(k)}${f}`;
    mx=Math.abs(k)+c; mn=c-Math.abs(k); why=`Vì −1 ≤ ${f} ≤ 1 nên ${neg(mn)} ≤ y ≤ ${neg(mx)}.`; }
  else { const k=sR(2,6), c=R(-4,6), f=pick(['sin²x','cos²x']);
    fn=`y = ${k<0?M:''}${Math.abs(k)}${f}${c?` ${c<0?M:'+'} ${Math.abs(c)}`:''}`; mx=Math.max(k,0)+c; mn=Math.min(k,0)+c; why=`Vì 0 ≤ ${f} ≤ 1 nên ${neg(mn)} ≤ y ≤ ${neg(mx)}.`; }
  return QB({text:`Tìm giá trị lớn nhất và giá trị nhỏ nhất của hàm số <span class="mx">${fn}</span>`, tpl:'<span class="eq">Max = [_]</span><br><span class="eq">Min = [_]</span>', ans:[mx,mn],
    hint:lv<3?'Dùng −1 ≤ sin, cos ≤ 1 rồi nhân (chú ý hệ số âm thì đổi chiều) và cộng hằng số.':'Dùng 0 ≤ sin²x, cos²x ≤ 1.',
    sol:`${why} GTLN = <b>${neg(mx)}</b>, GTNN = <b>${neg(mn)}</b>.`}); };

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
const fam = (b,P) => b===0?`k${piStr(P)}`:`${piStr(b)} + k${piStr(P)}`;
const showSol = s => s.pm ? `${X} = ±${piStr(s.pm[0])} + k${piStr(s.pm[1])}` : s.list.map(([b,P])=>`${X} = ${fam(b,P)}`).join('; ');
const argStr = (a,b) => { const ax=a===1?X:`${a}${X}`; return b===0?ax:`${ax} ${b<0?M:'+'} ${piStr(Math.abs(b))}`; };
const pickEq = lv => { let f,k;
  if(lv===1){ f=pick(['sin','cos']); k=pick(['1/2','√2/2','√3/2']); }
  else { f=pick(['sin','cos','tan','cot']); k=pick(f==='sin'||f==='cos'?withNeg(['1/2','√2/2','√3/2','1','0']):withNeg(['√3/3','1','√3','0'])); }
  const a=lv===3?pick([1,2,3]):1, b=lv===3?sR(1,1)*pick([PI/6,PI/4,PI/3]):0; if(lv===3&&a===1&&Math.random()<.3) return pickEq(lv);
  return {f,k,a,b,sol:toX(solveT(f,k),a,b)}; };
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
  return QC({text:`Giải phương trình <span class="mx">${f} ${a===1&&b===0?X:`(${argStr(a,b)})`} = ${valH(k)}</span>`, opts:[good,...shuffle(Wl).slice(0,3)], ans:good,
    hint:'sin u = sin α ⇔ u = α + k2π hoặc u = π − α + k2π; cos u = cos α ⇔ u = ±α + k2π; tan u = tan α ⇔ u = α + kπ; cot u = cot α ⇔ u = α + kπ (k ∈ ℤ).'+(a>1||b?' Giải theo u rồi chia/chuyển vế để tìm x.':''),
    sol:`Nghiệm: <b>${good}</b> (k ∈ ℤ).`}); };
const countIn = (sol,L,Rr) => { const L2=sol.pm?[[sol.pm[0],sol.pm[1]],[-sol.pm[0],sol.pm[1]]]:sol.list, s=new Set();
  L2.forEach(([b,P])=>{ for(let k=-80;k<=80;k++){ const x=b+k*P; if(x>=L-1e-9&&x<=Rr+1e-9) s.add(Math.round(x*1000)); } }); return [...s].sort((u,v)=>u-v); };
const g4b = lv => { const {f,k,a,b,sol}=pickEq(lv);
  const [L,Rr]=lv===1?[0,P2]:lv===2?pick([[-PI,PI],[0,3*PI],[-PI,2*PI]]):pick([[0,PI],[0,P2],[-PI/2,PI]]);
  const xs=countIn(sol,L,Rr);
  return QB({text:`Phương trình <span class="mx">${f} ${a===1&&b===0?X:`(${argStr(a,b)})`} = ${valH(k)}</span> có bao nhiêu nghiệm thuộc đoạn [${piStr(L)}; ${piStr(Rr)}]?`, tpl:'[_] nghiệm', ans:[xs.length],
    hint:'Viết công thức nghiệm, rồi với từng họ nghiệm tìm các số nguyên k để x nằm trong đoạn (hoặc dùng đường tròn lượng giác).',
    sol:`${showSol(sol)}. Các nghiệm thuộc đoạn: ${xs.length?xs.map(x=>piStr(x/1000)).join('; '):'không có'}. Có <b>${xs.length}</b> nghiệm.`}); };
const g4c = lv => {   // sin f = sin g, cos f = cos g
  if(lv===1){ const f=pick(['sin','cos','tan']), d=5*R(2,17);
    const good=f==='sin'?`x = ${d}° + k360°; x = ${180-d}° + k360°`:f==='cos'?`x = ±${d}° + k360°`:`x = ${d}° + k180°`;
    const all=[`x = ${d}° + k360°; x = ${180-d}° + k360°`,`x = ±${d}° + k360°`,`x = ${d}° + k180°`,`x = ${d}° + k360°; x = ${90-d}° + k360°`,`x = ${d}° + k360°; x = −${d}° + k180°`].filter(s=>s!==good);
    return QC({text:`Giải phương trình <span class="mx">${f} x = ${f} ${d}°</span>`, opts:[good,...shuffle(all).slice(0,3)], ans:good,
      hint:'sin x = sin α ⇔ x = α + k360° hoặc x = 180° − α + k360°; cos x = cos α ⇔ x = ±α + k360°; tan x = tan α ⇔ x = α + k180°.',
      sol:`Nghiệm: <b>${good}</b> (k ∈ ℤ).`}); }
  let a,b; do{a=R(2,5);b=R(1,4)}while(a<=b||a+b>6);
  const ax=kx(a), bx=kx(b); let eq,good,W,why;
  if(lv===2){ const f=pick(['sin','cos']); eq=`${f} ${ax} = ${f} ${bx}`;
    const A={list:[[0,P2/(a-b)]]}, Bc={list:[[0,P2/(a+b)]]}, Bs={list:[[PI/(a+b),P2/(a+b)]]};
    good=f==='cos'?`${showSol(A)}; ${showSol(Bc)}`:`${showSol(A)}; ${showSol(Bs)}`;
    W=[f==='cos'?`${showSol(A)}; ${showSol(Bs)}`:`${showSol(A)}; ${showSol(Bc)}`, `${showSol({list:[[0,PI/(a-b)]]})}; ${showSol(f==='cos'?Bc:Bs)}`, showSol(A), `${showSol({list:[[0,P2/(a+b)]]})}; ${showSol({list:[[PI/(a-b),P2/(a-b)]]})}`];
    why=f==='cos'?`${ax} = ±${bx} + k2π`:`${ax} = ${bx} + k2π hoặc ${ax} = π − ${bx} + k2π`; }
  else { eq=`sin ${ax} = cos ${bx}`;
    const A={list:[[PI/2/(a+b),P2/(a+b)]]}, B={list:[[PI/2/(a-b),P2/(a-b)]]};
    good=`${showSol(A)}; ${showSol(B)}`;
    W=[`${showSol({list:[[PI/2/(a+b),PI/(a+b)]]})}; ${showSol(B)}`, `${showSol(A)}; ${showSol({list:[[-PI/2/(a-b),P2/(a-b)]]})}`, `${showSol({list:[[PI/(a+b),P2/(a+b)]]})}; ${showSol({list:[[PI/(a-b),P2/(a-b)]]})}`, showSol(A)];
    why=`cos ${bx} = sin(${piStr(PI/2)} − ${bx}) nên ${ax} = ${piStr(PI/2)} − ${bx} + k2π hoặc ${ax} = ${piStr(PI/2)} + ${bx} + k2π`; }
  W=[...new Set(W)].filter(s=>s!==good);
  return QC({text:`Giải phương trình <span class="mx">${eq}</span>`, opts:[good,...shuffle(W).slice(0,3)], ans:good,
    hint:lv===3?'Đưa về cùng một hàm: cos v = sin(π/2 − v), rồi dùng sin u = sin v.':'Dùng sin u = sin v ⇔ u = v + k2π hoặc u = π − v + k2π; cos u = cos v ⇔ u = ±v + k2π. Sau đó chuyển vế, chia hệ số của x.',
    sol:`${why}. Vậy <b>${good}</b> (k ∈ ℤ).`}); };

lesson(1,'gia-tri-luong-giac','Bài 1. Giá trị lượng giác của góc lượng giác','Đổi độ – radian, độ dài cung; điểm biểu diễn; dấu và giá trị lượng giác; tính GTLG khi biết một GTLG.',[g1a,g1b,g1c,g1d,g1e]);
lesson(1,'cong-thuc-luong-giac','Bài 2. Công thức lượng giác','Công thức cộng; công thức nhân đôi; biến đổi tích thành tổng và tổng thành tích.',[g2a,g2b,g2c]);
lesson(1,'ham-so-luong-giac','Bài 3. Hàm số lượng giác','Tập xác định; tính chẵn lẻ; chu kì tuần hoàn; giá trị lớn nhất, nhỏ nhất.',[g3a,g3b,g3c,g3d]);
lesson(1,'pt-luong-giac-co-ban','Bài 4. Phương trình lượng giác cơ bản','Công thức nghiệm sin, cos, tan, cot; số nghiệm trên một đoạn; phương trình đưa về dạng cơ bản.',[g4a,g4b,g4c]);
lesson(1,'on-tap-c1','Ôn tập chương I','Tổng hợp giá trị lượng giác, công thức, hàm số và phương trình lượng giác.',[g1d,g1e,g2a,g3d,g4a,g4b]);
})();
