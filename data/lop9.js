/* =====================================================================
   DỮ LIỆU LỚP 9 – Toán, Kết nối tri thức
   Chương I.  Phương trình và hệ hai phương trình bậc nhất hai ẩn (Bài 1–3)
   Chương II. Phương trình và bất phương trình bậc nhất một ẩn (Bài 4–6)
   Mỗi dạng bài: lv => câu hỏi. Luôn chọn NGHIỆM trước rồi mới dựng đề.
   ===================================================================== */
(() => {
const G = App.addGrade({
  id: 'lop9', name: 'Lớp 9', subject: 'Toán', book: 'Kết nối tri thức',
  topics: [
    {id:1, hk:1, name:'Phương trình và hệ hai phương trình bậc nhất hai ẩn'},
    {id:2, hk:1, name:'Phương trình và bất phương trình bậc nhất một ẩn'},
  ],
});
const lesson = G.lesson;

/* ---------- Tiện ích hiển thị biểu thức đại số ---------- */
const M = '−';
const neg = n => n < 0 ? M + (-n) : String(n);             // −3 dùng dấu trừ chuẩn
const par = n => n < 0 ? `(${neg(n)})` : String(n);         // (−3) khi nhân
const V = s => `<i>${s}</i>`, X = V('x'), Y = V('y'), X2 = `${X}²`;
const A_ = V('a'), B_ = V('b'), M_ = V('m');
// poly([hệ số, biến], …): bỏ hệ số 1, bỏ hạng tử 0, nối dấu đúng
function poly(...ts){let s='';for(const [c,v] of ts){if(!c)continue;const a=Math.abs(c),body=v?(a===1?'':a)+v:String(a);
  s+=s?(c<0?` ${M} `:' + ')+body:(c<0?M:'')+body}return s||'0'}
const eq2 = (a,b,c) => `${poly([a,X],[b,Y])} = ${neg(c)}`;
const sys = (e1,e2,lab) => `<span class="sys"><span>${e1}${lab?' <small>(1)</small>':''}</span><span>${e2}${lab?' <small>(2)</small>':''}</span></span>`;
const pr = (x,y) => `(${neg(x)}; ${neg(y)})`;
const sR = (a,b) => pick([-1,1])*R(a,b);                    // số khác 0, có dấu ngẫu nhiên
const frac = (p,q) => {if(q<0){p=-p;q=-q}const g=gcd(p,q)||1;p/=g;q/=g;return q===1?neg(p):(p<0?M:'')+F(Math.abs(p),q)};
const dec = n => String(+n.toFixed(4)).replace('.',',');
const subst = (a,b,x,y) => `${neg(a)}·${par(x)} ${b<0?M:'+'} ${Math.abs(b)}·${par(y)}`;
const minus = (c,t) => t===0 ? neg(c) : `${neg(c)} ${t<0?'+':M} ${Math.abs(t)}`;   // c − t, bỏ “− 0”
const det = (a1,b1,a2,b2) => a1*b2-a2*b1;
const uniqBy = arr => {const seen=new Set();return arr.filter(p=>{const k=JSON.stringify(p);if(seen.has(k))return false;seen.add(k);return true})};
const fac = (p,q) => q===0 ? poly([p,X]) : `(${poly([p,X],[q,''])})`;   // thừa số px + q
const mulStr = c => c===1?'':c===-1?M:neg(c);
const FLIP = {'<':'>','>':'<','≤':'≥','≥':'≤'};
const TEST = (l,op,r) => op==='<'?l<r:op==='>'?l>r:op==='≤'?l<=r:l>=r;
const ANS2 = `<span class="eq">(${X}; ${Y}) = ([_]; [_])</span>`;

/* =====================================================================
   CHƯƠNG I – BÀI 1. Khái niệm phương trình và hệ hai PT bậc nhất hai ẩn
   ===================================================================== */
const zeroX = (b,c) => `0${X} ${b<0?M:'+'} ${Math.abs(b)===1?'':Math.abs(b)}${Y} = ${neg(c)}`;
const zeroY = (a,c) => `${poly([a,X])} + 0${Y} = ${neg(c)}`;
const wrongPT = () => { const a=sR(1,6), b=sR(1,6), c=sR(1,9); return shuffle([
  {s:`${poly([a,X2],[b,Y])} = ${neg(c)}`, why:'có x² (bậc hai)'},
  {s:`${poly([a,X+Y],[b,X])} = ${neg(c)}`, why:'có tích xy'},
  {s:`${poly([Math.sign(a),F(Math.abs(a),X)],[b,Y])} = ${neg(c)}`, why:'có ẩn ở mẫu'},
  {s:`${poly([a,X],[b,`${Y}²`])} = ${neg(c)}`, why:'có y² (bậc hai)'},
  {s:`0${X} + 0${Y} = ${neg(c)}`, why:'hai hệ số a, b đều bằng 0'},
])};
const g1a = lv => {
  const a=sR(1,7), b=sR(1,7), c=sR(1,12);
  const goods=[eq2(a,b,c), zeroX(sR(1,6),sR(1,9)), zeroY(sR(2,6),sR(1,9)), `${poly([1,F(1,2)+X],[-1,Y])} = ${neg(sR(1,9))}`];
  const hint='Phương trình bậc nhất hai ẩn có dạng <i>ax</i> + <i>by</i> = <i>c</i>, trong đó <i>a</i> và <i>b</i> không đồng thời bằng 0. Ẩn không được nằm ở mẫu, không có x², y² hay tích xy.';
  if(lv<3){
    let W=wrongPT(); if(lv===1) W=W.filter(w=>!/0<i>x<\/i> \+ 0/.test(w.s));
    const good=lv===1?goods[0]:pick(goods);
    return QC({text:'Phương trình nào sau đây là <b>phương trình bậc nhất hai ẩn</b>?', opts:[good,...W.slice(0,3).map(w=>w.s)], ans:good, hint,
      sol:`<b>${good}</b> có dạng <i>ax</i> + <i>by</i> = <i>c</i> với <i>a</i>, <i>b</i> không đồng thời bằng 0. Các phương trình còn lại có ẩn ở mẫu, có bậc hai hoặc có a = b = 0.`});
  }
  const w=pick(wrongPT());
  return QC({text:'Phương trình nào sau đây <b>không phải</b> là phương trình bậc nhất hai ẩn?', opts:[w.s,...shuffle(goods).slice(0,3)], ans:w.s, hint,
    sol:`<b>${w.s}</b> không phải phương trình bậc nhất hai ẩn vì ${w.why}. Chú ý: 0x + 3y = 5 vẫn là phương trình bậc nhất hai ẩn (chỉ cần a, b không đồng thời bằng 0).`});
};
const g1b = lv => {
  const a=lv===1?R(1,5):sR(1,6), b=lv===1?R(1,5):sR(1,6), lo=lv===1?0:-6, hi=lv===1?5:6;
  const x=R(lo,hi), y=R(lo,hi), c=a*x+b*y, ok=(p,q)=>a*p+b*q===c;
  let W=uniqBy(shuffle([[y,x],[x,y+1],[x+1,y],[-x,y],[x,-y],[x-1,y+1],[x+1,y+1],[y,-x],[x+2,y-1]])).filter(([p,q])=>!ok(p,q)&&(lv>1||(p>=0&&q>=0)));
  if(W.length<3) W=[[x+1,y],[x,y+1],[x+1,y+1]];
  return QC({text:`Cặp số nào sau đây là nghiệm của phương trình <span class="mx">${eq2(a,b,c)}</span>`,
    opts:[pr(x,y),...W.slice(0,3).map(([p,q])=>pr(p,q))], ans:pr(x,y),
    hint:'Thay lần lượt <i>x</i>, <i>y</i> của từng cặp số vào vế trái. Cặp số nào làm vế trái bằng vế phải thì đó là nghiệm.',
    sol:`Thay x = ${neg(x)}, y = ${neg(y)}: ${subst(a,b,x,y)} = ${neg(c)} (đúng). Vậy <b>${pr(x,y)}</b> là nghiệm.`});
};
const g1c = lv => {
  if(lv<3){
    const a=lv===1?R(1,5):sR(1,6), b=lv===1?R(1,5):sR(1,6), x=R(lv===1?0:-6,6), y=R(lv===1?0:-6,6), c=a*x+b*y;
    const askY=lv===1||Math.random()<.5;
    return askY
      ? QB({text:`Tìm <i>y</i> để cặp số (${neg(x)}; <i>y</i>) là nghiệm của phương trình <span class="mx">${eq2(a,b,c)}</span>`, tpl:`<span class="eq">${Y} = [_]</span>`, ans:[y],
          hint:`Thay x = ${neg(x)} vào phương trình rồi giải phương trình bậc nhất ẩn y.`,
          sol:`Thay x = ${neg(x)}: ${neg(a)}·${par(x)} ${b<0?M:'+'} ${poly([Math.abs(b),Y])} = ${neg(c)} ⇒ ${poly([b,Y])} = ${neg(c-a*x)} ⇒ y = <b>${neg(y)}</b>.`})
      : QB({text:`Tìm <i>x</i> để cặp số (<i>x</i>; ${neg(y)}) là nghiệm của phương trình <span class="mx">${eq2(a,b,c)}</span>`, tpl:`<span class="eq">${X} = [_]</span>`, ans:[x],
          hint:`Thay y = ${neg(y)} vào phương trình rồi giải phương trình bậc nhất ẩn x.`,
          sol:`Thay y = ${neg(y)}: ${poly([a,X])} ${b<0?M:'+'} ${Math.abs(b)}·${par(y)} = ${neg(c)} ⇒ ${poly([a,X])} = ${neg(c-b*y)} ⇒ x = <b>${neg(x)}</b>.`});
  }
  const A=sR(1,6), k=sR(1,5), m=A-k, b=sR(1,6), x=sR(1,5), y=R(-5,5), c=A*x+b*y;
  const coef=`(${poly([1,M_],[k,''])})`;
  return QB({text:`Tìm <i>m</i> để cặp số ${pr(x,y)} là nghiệm của phương trình <span class="mx">${coef}${X} ${b<0?M:'+'} ${Math.abs(b)===1?'':Math.abs(b)}${Y} = ${neg(c)}</span>`,
    tpl:`<span class="eq">${M_} = [_]</span>`, ans:[m],
    hint:'Thay x, y của cặp số vào phương trình, được một phương trình ẩn m. Giải phương trình đó.',
    sol:`Thay x = ${neg(x)}, y = ${neg(y)}: ${coef}·${par(x)} ${b<0?M:'+'} ${Math.abs(b)}·${par(y)} = ${neg(c)} ⇒ ${coef}·${par(x)} = ${neg(A*x)} ⇒ ${poly([1,M_],[k,''])} = ${neg(A)} ⇒ m = <b>${neg(m)}</b>.`});
};
const pickSys = (lv, big) => { let a1,b1,a2,b2; const r=big||(lv===1?4:6);
  do{ a1=lv===1?R(1,r):sR(1,r); b1=lv===1?R(1,r):sR(1,r); a2=sR(1,r); b2=sR(1,r); }while(det(a1,b1,a2,b2)===0);
  return [a1,b1,a2,b2]; };
const g1d = lv => {
  const [a1,b1,a2,b2]=pickSys(lv), lo=lv===1?0:-5, x=R(lo,5), y=R(lo,5), c1=a1*x+b1*y, c2=a2*x+b2*y;
  const both=(p,q)=>a1*p+b1*q===c1&&a2*p+b2*q===c2;
  const g1=gcd(a1,b1), g2=gcd(a2,b2);
  let W=uniqBy([[x+b1/g1,y-a1/g1],[x-b2/g2,y+a2/g2],[y,x],[x+1,y-1],[-x,-y],[x-b1/g1,y+a1/g1]]).filter(([p,q])=>!both(p,q));
  return QC({text:`Cặp số nào sau đây là nghiệm của hệ phương trình <span class="mx">${sys(eq2(a1,b1,c1),eq2(a2,b2,c2))}</span>`,
    opts:[pr(x,y),...W.slice(0,3).map(([p,q])=>pr(p,q))], ans:pr(x,y),
    hint:'Nghiệm của hệ phải thoả mãn <b>cả hai</b> phương trình. Có cặp số chỉ đúng với một phương trình – hãy thử cả hai.',
    sol:`Với ${pr(x,y)}: PT thứ nhất ${subst(a1,b1,x,y)} = ${neg(c1)} ✓; PT thứ hai ${subst(a2,b2,x,y)} = ${neg(c2)} ✓. Vậy nghiệm là <b>${pr(x,y)}</b>.`});
};
const g1e = lv => {
  const x=sR(1,4), y=sR(1,5);
  if(lv===1){ const a=sR(1,5), b1=sR(1,4), a2=sR(1,4), b2=sR(1,4), c1=a*x+b1*y, c2=a2*x+b2*y;
    return QB({text:`Biết hệ phương trình <span class="mx">${sys(`${A_}${X} ${b1<0?M:'+'} ${Math.abs(b1)===1?'':Math.abs(b1)}${Y} = ${neg(c1)}`,eq2(a2,b2,c2))}</span> có nghiệm ${pr(x,y)}. Tìm <i>a</i>.`,
      tpl:`<span class="eq">${A_} = [_]</span>`, ans:[a],
      hint:'Thay x, y vào phương trình chứa a, được phương trình bậc nhất ẩn a.',
      sol:`Thay vào PT thứ nhất: ${A_}·${par(x)} ${b1<0?M:'+'} ${Math.abs(b1)}·${par(y)} = ${neg(c1)} ⇒ ${poly([x,A_])} = ${neg(a*x)} ⇒ a = <b>${neg(a)}</b>.`}); }
  const a=sR(1,5), b=sR(1,5), k1=lv===3?sR(1,3):0, k2=lv===3?sR(1,3):0, B1=sR(1,4), A2=sR(1,4);
  const c1=(a+k1)*x+B1*y, c2=A2*x+(b+k2)*y;
  const ca=k1?`(${poly([1,A_],[k1,''])})`:A_, cb=k2?`(${poly([1,B_],[k2,''])})`:B_;
  return QB({text:`Biết hệ phương trình <span class="mx">${sys(`${ca}${X} ${B1<0?M:'+'} ${Math.abs(B1)===1?'':Math.abs(B1)}${Y} = ${neg(c1)}`,`${poly([A2,X])} + ${cb}${Y} = ${neg(c2)}`)}</span> có nghiệm ${pr(x,y)}. Tìm <i>a</i> và <i>b</i>.`,
    tpl:`<span class="eq">${A_} = [_]; ${B_} = [_]</span>`, ans:[a,b],
    hint:'Thay x, y vào từng phương trình: PT thứ nhất cho ta a, PT thứ hai cho ta b.',
    sol:`PT thứ nhất: ${ca}·${par(x)} = ${minus(c1,B1*y)} = ${neg(c1-B1*y)} ⇒ ${k1?`${poly([1,A_],[k1,''])} = ${neg(a+k1)} ⇒ `:''}a = <b>${neg(a)}</b>.<br>PT thứ hai: ${cb}·${par(y)} = ${minus(c2,A2*x)} = ${neg(c2-A2*x)} ⇒ ${k2?`${poly([1,B_],[k2,''])} = ${neg(b+k2)} ⇒ `:''}b = <b>${neg(b)}</b>.`});
};

/* =====================================================================
   BÀI 2. Giải hệ hai phương trình bậc nhất hai ẩn
   ===================================================================== */
const g2a = lv => {   // phương pháp thế
  let x,y,a1,b1,a2,b2; const r=lv===1?4:6;
  do{ x=R(-r,r); y=R(-r,r); a2=sR(1,5); b2=sR(1,5);
    if(lv===2){a1=1;b1=sR(1,5)}else{a1=sR(1,lv===1?4:6);b1=lv===1?-1:pick([-1,1])}
  }while(det(a1,b1,a2,b2)===0);
  const c1=a1*x+b1*y, c2=a2*x+b2*y; let e1, sol;
  if(lv===2){ // rút x = c1 − b1·y
    e1=eq2(1,b1,c1); const ex=poly([-b1,Y],[c1,'']), B=b2-a2*b1;
    sol=`Từ PT (1): x = ${ex}. Thế vào PT (2): ${mulStr(a2)}(${ex}) ${b2<0?M:'+'} ${poly([Math.abs(b2),Y])} = ${neg(c2)} ⇔ ${poly([B,Y])} = ${neg(c2-a2*c1)} ⇔ y = ${neg(y)}. Suy ra x = ${neg(x)}. Nghiệm của hệ: <b>${pr(x,y)}</b>.`;
  } else {    // rút y = k·x + m
    const k=-a1*b1, m=c1*b1, ey=poly([k,X],[m,'']), A=a2+b2*k;
    e1=lv===1?`${Y} = ${ey}`:eq2(a1,b1,c1);
    sol=`${lv===1?'PT (1) cho':'Từ PT (1):'} y = ${ey}. Thế vào PT (2): ${poly([a2,X])} ${b2<0?M:'+'} ${Math.abs(b2)===1?'':Math.abs(b2)}(${ey}) = ${neg(c2)} ⇔ ${poly([A,X])} = ${neg(c2-b2*m)} ⇔ x = ${neg(x)}. Suy ra y = ${neg(y)}. Nghiệm của hệ: <b>${pr(x,y)}</b>.`;
  }
  return QB({text:`Giải hệ phương trình bằng <b>phương pháp thế</b>: <span class="mx">${sys(e1,eq2(a2,b2,c2),true)}</span>`, tpl:ANS2, ans:[x,y],
    hint:lv===2?'Từ PT (1) rút x theo y, thế vào PT (2) để được phương trình một ẩn y.':'Từ PT (1) rút y theo x, thế vào PT (2) để được phương trình một ẩn x.', sol});
};
const g2b = lv => {   // phương pháp cộng đại số
  let x,y,a1,b1,a2,b2,elimY=Math.random()<.5; const r=lv===3?7:5;
  do{ x=R(-6,6); y=R(-6,6); a1=sR(1,r); b1=sR(1,r);
    if(lv===1){ if(elimY){b2=-b1;a2=sR(1,r)}else{a2=-a1;b2=sR(1,r)} }
    else if(lv===2){ if(elimY){b2=b1;a2=sR(1,r)}else{a2=a1;b2=sR(1,r)} }
    else { a2=sR(2,r); b2=sR(2,r); a1=sR(2,r); b1=sR(2,r); elimY=false; }
  }while(det(a1,b1,a2,b2)===0 || (lv===3 && Math.abs(a1)===Math.abs(a2)));
  const c1=a1*x+b1*y, c2=a2*x+b2*y; let sol;
  const back = v => v==='x' ? `Thay x = ${neg(x)} vào PT (1): ${poly([b1,Y])} = ${minus(c1,a1*x)} ⇒ y = ${neg(y)}.`
                           : `Thay y = ${neg(y)} vào PT (1): ${poly([a1,X])} = ${minus(c1,b1*y)} ⇒ x = ${neg(x)}.`;
  if(lv<3){ const add=lv===1, s=add?1:-1;
    sol = elimY
      ? `${add?'Cộng':'Trừ'} vế theo vế hai phương trình: ${poly([a1+s*a2,X])} = ${neg(c1+s*c2)} ⇒ x = ${neg(x)}. ${back('x')}`
      : `${add?'Cộng':'Trừ'} vế theo vế hai phương trình: ${poly([b1+s*b2,Y])} = ${neg(c1+s*c2)} ⇒ y = ${neg(y)}. ${back('y')}`;
  } else { const L=lcm(Math.abs(a1),Math.abs(a2)), k1=L/a1, k2=L/a2;
    sol=`Nhân hai vế PT (1) với ${neg(k1)} và PT (2) với ${neg(k2)}: ${sys(eq2(L,k1*b1,k1*c1),eq2(L,k2*b2,k2*c2))} Trừ vế theo vế: ${poly([k1*b1-k2*b2,Y])} = ${neg(k1*c1-k2*c2)} ⇒ y = ${neg(y)}. ${back('y')}`; }
  return QB({text:`Giải hệ phương trình bằng <b>phương pháp cộng đại số</b>: <span class="mx">${sys(eq2(a1,b1,c1),eq2(a2,b2,c2),true)}</span>`, tpl:ANS2, ans:[x,y],
    hint:lv===1?'Hai phương trình có một ẩn với hệ số đối nhau: cộng vế theo vế để khử ẩn đó.':lv===2?'Hai phương trình có một ẩn với hệ số bằng nhau: trừ vế theo vế để khử ẩn đó.':'Nhân mỗi phương trình với một số thích hợp để hệ số của x bằng nhau, rồi trừ vế theo vế.',
    sol:sol+` Nghiệm của hệ: <b>${pr(x,y)}</b>.`});
};
const g2c = lv => {   // số nghiệm của hệ
  const kind=pick(['one','none','many']); let a1,b1,c1,a2,b2,c2,sol;
  if(kind==='one'){ let x,y; do{ [a1,b1,a2,b2]=pickSys(2); x=R(-5,5); y=R(-5,5); c1=a1*x+b1*y; c2=a2*x+b2*y }while(!c1||!c2);
    sol=`Hai phương trình không tỉ lệ với nhau; giải hệ (thế hoặc cộng đại số) được đúng một nghiệm ${pr(x,y)}. Hệ <b>có nghiệm duy nhất</b>.`;
  } else { let p,q,m1,m2,r1,r2;
    do{ p=sR(1,5); q=sR(1,5); m1=lv===1?1:sR(1,3); m2=sR(2,4); r1=sR(1,6) }while(gcd(p,q)!==1||m1===m2);
    r2=kind==='many'?r1:r1+sR(1,3); a1=m1*p; b1=m1*q; c1=m1*r1; a2=m2*p; b2=m2*q; c2=m2*r2;
    const L=lcm(Math.abs(m1),Math.abs(m2)), k1=L/m1, k2=L/m2, d=L*(r1-r2);
    sol=`${k1===1?'Giữ PT (1)':`Nhân hai vế PT (1) với ${neg(k1)}`}, ${k2===1?'giữ PT (2)':`nhân hai vế PT (2) với ${neg(k2)}`}: ${sys(eq2(L*p,L*q,L*r1),eq2(L*p,L*q,L*r2))} Trừ vế theo vế: 0x + 0y = ${neg(d)}. `+
      (d===0?'Đẳng thức đúng với mọi x, y (hai phương trình thực chất là một). Hệ <b>vô số nghiệm</b>.':'Không có x, y nào thoả mãn. Hệ <b>vô nghiệm</b>.');
  }
  const e1=lv===3?`${poly([a1,X])} = ${poly([-b1,Y],[c1,''])}`:eq2(a1,b1,c1);
  const ans={one:'Có nghiệm duy nhất',none:'Vô nghiệm',many:'Vô số nghiệm'}[kind];
  return QC({text:`Hệ phương trình sau có bao nhiêu nghiệm? <span class="mx">${sys(e1,eq2(a2,b2,c2),true)}</span>`,
    opts:['Có nghiệm duy nhất','Vô nghiệm','Vô số nghiệm'], ans, keepOrder:true,
    hint:'Thử khử một ẩn. Nếu cả hai ẩn cùng mất và còn lại 0 = 0 thì hệ vô số nghiệm; còn lại 0 = số khác 0 thì hệ vô nghiệm; nếu tìm được giá trị cụ thể thì hệ có nghiệm duy nhất.'+(lv===3?' Nhớ chuyển PT (1) về dạng ax + by = c trước.':''),
    sol:(lv===3?`PT (1) ⇔ ${eq2(a1,b1,c1)}. `:'')+sol});
};
const g2d = lv => {   // tìm hệ số
  if(lv<3){ let a,b,x1,x2; do{ a=sR(1,5); b=R(-6,6); x1=lv===1?0:R(-4,4); x2=R(-4,4) }while(x1===x2||(lv===2&&(x1===0||x2===0)));
    const y1=a*x1+b, y2=a*x2+b;
    return QB({text:`Tìm <i>a</i>, <i>b</i> để đồ thị hàm số <i>y</i> = <i>ax</i> + <i>b</i> đi qua hai điểm A${pr(x1,y1)} và B${pr(x2,y2)}.`,
      tpl:`<span class="eq">${A_} = [_]; ${B_} = [_]</span>`, ans:[a,b],
      hint:'Thay toạ độ mỗi điểm vào y = ax + b, được hệ hai phương trình ẩn a, b. Trừ vế theo vế để khử b.',
      sol:`Ta có hệ ${sys(`${poly([x1,A_],[1,B_])} = ${neg(y1)}`,`${poly([x2,A_],[1,B_])} = ${neg(y2)}`)} Trừ vế theo vế: ${poly([x1-x2,A_])} = ${neg(y1-y2)} ⇒ a = <b>${neg(a)}</b>; b = ${x1===0?'':minus(y1,a*x1)+' = '}<b>${neg(b)}</b>.`});
  }
  const a=sR(1,5), b=sR(1,5), x=sR(1,4), y=sR(1,4), c1=a*x+b*y, c2=b*x-a*y;
  return QB({text:`Biết hệ phương trình <span class="mx">${sys(`${A_}${X} + ${B_}${Y} = ${neg(c1)}`,`${B_}${X} ${M} ${A_}${Y} = ${neg(c2)}`)}</span> có nghiệm ${pr(x,y)}. Tìm <i>a</i>, <i>b</i>.`,
    tpl:`<span class="eq">${A_} = [_]; ${B_} = [_]</span>`, ans:[a,b],
    hint:'Thay x, y vào cả hai phương trình, được một hệ mới với hai ẩn là a và b. Giải hệ đó.',
    sol:`Thay x = ${neg(x)}, y = ${neg(y)}: ${sys(`${poly([x,A_],[y,B_])} = ${neg(c1)}`,`${poly([-y,A_],[x,B_])} = ${neg(c2)}`)} Giải hệ (ẩn a, b) được a = <b>${neg(a)}</b>, b = <b>${neg(b)}</b>.`});
};

/* =====================================================================
   BÀI 3. Giải bài toán bằng cách lập hệ phương trình
   Mỗi mẫu trả về: story, let (gọi ẩn), right (hệ đúng), wrong (3 hệ sai),
   tpl/ans (câu hỏi điền số), solve (lời giải).
   ===================================================================== */
const S2 = (e1,e2) => sys(e1,e2);
const P = {
  gaCho(){ const x=R(8,30), y=R(4,20), N=x+y, C=2*x+4*y;
    return {story:`Vừa gà vừa chó có tất cả <b>${N}</b> con, đếm được <b>${C}</b> chân.`, let:'Gọi x là số gà, y là số chó (x, y nguyên dương).',
      right:S2(eq2(1,1,N),eq2(2,4,C)), wrong:[S2(eq2(1,1,N),eq2(4,2,C)),S2(eq2(1,1,C),eq2(2,4,N)),S2(eq2(1,1,N),eq2(1,2,C))],
      ask:'Hỏi có bao nhiêu con gà, bao nhiêu con chó?', tpl:'Gà: [_] con; chó: [_] con', ans:[x,y],
      hint:'Một PT cho tổng số con, một PT cho tổng số chân (gà 2 chân, chó 4 chân).',
      solve:`Nhân PT thứ nhất với 2 rồi trừ vế theo vế: 2y = ${C-2*N} ⇒ y = ${y}; x = ${N} − ${y} = ${x}. Vậy có <b>${x} con gà</b> và <b>${y} con chó</b>.`}; },
  haiSo(){ const y=R(5,40), k=R(2,6), x=k*y, S=x+y;
    return {story:`Tổng của hai số là <b>${S}</b>. Số lớn gấp <b>${k}</b> lần số bé.`, let:'Gọi x là số lớn, y là số bé.',
      right:S2(eq2(1,1,S),`${X} = ${k}${Y}`), wrong:[S2(eq2(1,1,S),`${Y} = ${k}${X}`),S2(eq2(1,-1,S),`${X} = ${k}${Y}`),S2(eq2(1,1,S),`${X} = ${Y} + ${k}`)],
      ask:'Tìm hai số đó.', tpl:'Số lớn: [_]; số bé: [_]', ans:[x,y],
      hint:'Một PT cho tổng, một PT cho quan hệ "gấp k lần": số lớn = k × số bé.',
      solve:`Thế x = ${k}y vào PT thứ nhất: ${k+1}y = ${S} ⇒ y = ${y}; x = ${x}. Vậy số lớn là <b>${x}</b>, số bé là <b>${y}</b>.`}; },
  muaHang(){ const it=pick([['quyển vở','cây bút',[6,8,10,12],[3,4,5,7],'quyển vở và cây bút'],['vé người lớn','vé trẻ em',[40,50,60],[20,25,30],'vé gồm vé người lớn và vé trẻ em'],['kg cam','kg táo',[25,30,35],[40,45,50],'kg cam và táo']]);
    let p,q; do{p=pick(it[2]);q=pick(it[3])}while(p===q);
    const x=R(2,12), y=R(2,12), n=x+y, T=p*x+q*y, nm=pick(NAMES);
    return {story:`${nm} mua tổng cộng <b>${n}</b> ${it[4]}, hết <b>${fmt(T)} nghìn đồng</b>. Giá mỗi ${it[0]} là ${p} nghìn đồng, mỗi ${it[1]} là ${q} nghìn đồng.`,
      let:`Gọi x là số ${it[0]}, y là số ${it[1]}.`,
      right:S2(eq2(1,1,n),eq2(p,q,T)), wrong:[S2(eq2(1,1,n),eq2(q,p,T)),S2(eq2(1,1,T),eq2(p,q,n)),S2(eq2(1,-1,n),eq2(p,q,T))],
      ask:`Hỏi ${nm} mua bao nhiêu ${it[0]} và bao nhiêu ${it[1]}?`, tpl:`[_] ${it[0]}; [_] ${it[1]}`, ans:[x,y],
      hint:'Một PT cho tổng số lượng, một PT cho tổng số tiền (số lượng × đơn giá).',
      solve:`Nhân PT thứ nhất với ${q} rồi lấy PT thứ hai trừ đi: ${poly([p-q,X])} = ${neg(T-q*n)} ⇒ x = ${x}; y = ${n} − ${x} = ${y}. Vậy <b>${x} ${it[0]}</b> và <b>${y} ${it[1]}</b>.`}; },
  xuoiNguoc(){ const v=R(12,30), w=R(1,4), t1=R(2,4), t2=R(2,5), s1=t1*(v+w), s2=t2*(v-w);
    return {story:`Một ca nô xuôi dòng trong <b>${t1} giờ</b> được <b>${s1} km</b> và ngược dòng trong <b>${t2} giờ</b> được <b>${s2} km</b>.`,
      let:'Gọi x (km/h) là vận tốc ca nô khi nước yên lặng, y (km/h) là vận tốc dòng nước (x > y > 0).',
      right:S2(`${t1}(${X} + ${Y}) = ${s1}`,`${t2}(${X} ${M} ${Y}) = ${s2}`),
      wrong:[S2(`${t1}(${X} ${M} ${Y}) = ${s1}`,`${t2}(${X} + ${Y}) = ${s2}`),S2(`${t1}(${X} + ${Y}) = ${s2}`,`${t2}(${X} ${M} ${Y}) = ${s1}`),S2(`${X} + ${Y} = ${s1*t1}`,`${X} ${M} ${Y} = ${s2*t2}`)],
      ask:'Tìm vận tốc của ca nô khi nước yên lặng và vận tốc dòng nước.', tpl:'Ca nô: [_] km/h; dòng nước: [_] km/h', ans:[v,w],
      hint:'Vận tốc xuôi dòng = x + y; ngược dòng = x − y. Quãng đường = vận tốc × thời gian.',
      solve:`Hệ ⇔ ${S2(`${X} + ${Y} = ${v+w}`,`${X} ${M} ${Y} = ${v-w}`)} Cộng vế theo vế: 2x = ${2*v} ⇒ x = ${v}; y = ${w}. Vận tốc ca nô <b>${v} km/h</b>, dòng nước <b>${w} km/h</b>.`}; },
  phanTram(){ let a,b; do{a=pick([10,15,20,25]);b=pick([10,15,20,25])}while(a===b);
    const x=20*R(5,20), y=20*R(5,20), N=x+y, E=a*x/100+b*y/100, Mx=N+E;
    return {story:`Theo kế hoạch, hai tổ phải sản xuất <b>${N}</b> sản phẩm. Thực tế tổ I vượt mức <b>${a}%</b>, tổ II vượt mức <b>${b}%</b> nên cả hai tổ làm được <b>${Mx}</b> sản phẩm.`,
      let:'Gọi x, y lần lượt là số sản phẩm tổ I, tổ II phải làm theo kế hoạch.',
      right:S2(eq2(1,1,N),`${dec(1+a/100)}${X} + ${dec(1+b/100)}${Y} = ${Mx}`),
      wrong:[S2(eq2(1,1,N),`${dec(a/100)}${X} + ${dec(b/100)}${Y} = ${Mx}`),S2(eq2(1,1,Mx),`${dec(1+a/100)}${X} + ${dec(1+b/100)}${Y} = ${N}`),S2(eq2(1,1,N),`${dec(1+b/100)}${X} + ${dec(1+a/100)}${Y} = ${Mx}`)],
      ask:'Hỏi theo kế hoạch mỗi tổ phải làm bao nhiêu sản phẩm?', tpl:'Tổ I: [_] sản phẩm; tổ II: [_] sản phẩm', ans:[x,y],
      hint:`Vượt mức ${a}% nghĩa là làm được (100% + ${a}%) = ${dec(1+a/100)} lần kế hoạch.`,
      solve:`Lấy PT thứ hai trừ PT thứ nhất: ${dec(a/100)}x + ${dec(b/100)}y = ${E}. Kết hợp x + y = ${N} giải được x = ${x}, y = ${y}. Vậy tổ I: <b>${x}</b>, tổ II: <b>${y}</b> sản phẩm.`}; },
};
const POOL = {1:['gaCho','haiSo'], 2:['muaHang','gaCho','haiSo'], 3:['xuoiNguoc','phanTram']};
const g3a = lv => { const t=P[pick(POOL[lv])]();
  return QC({text:`${t.story} ${t.let}<br>Hệ phương trình nào mô tả đúng bài toán?`, opts:[t.right,...t.wrong], ans:t.right, hint:t.hint,
    sol:`${t.let} ${t.hint} Hệ đúng là <b>${t.right}</b>`});
};
const g3b = lv => { const t=P[pick(POOL[lv])]();
  return QB({text:`${t.story} ${t.ask}`, tpl:t.tpl, ans:t.ans, hint:t.hint+' Gọi hai ẩn, lập hệ rồi giải.',
    sol:`${t.let} Ta có hệ ${t.right} ${t.solve}`});
};
const g3c = lv => {
  const k=lv===1?'hcn1':lv===2?pick(['hcn2','tuoi']):pick(['so2','hcn3','tuoi']);
  if(k.startsWith('hcn')){ let x,y; do{x=R(8,30);y=R(3,x-1)}while(x===y);
    const Pc=2*(x+y), d=x-y;
    if(k==='hcn1') return QB({text:`Một mảnh vườn hình chữ nhật có chu vi <b>${Pc} m</b>, chiều dài hơn chiều rộng <b>${d} m</b>. Tính chiều dài và chiều rộng.`,
      tpl:'Dài: [_] m; rộng: [_] m', ans:[x,y], hint:'Gọi x là chiều dài, y là chiều rộng. Nửa chu vi = x + y; hiệu = x − y.',
      sol:`Ta có hệ ${S2(`${X} + ${Y} = ${x+y}`,`${X} ${M} ${Y} = ${d}`)} ⇒ x = <b>${x}</b> m, y = <b>${y}</b> m.`});
    if(k==='hcn2') return QB({text:`Một mảnh vườn hình chữ nhật có chu vi <b>${Pc} m</b>, chiều dài hơn chiều rộng <b>${d} m</b>. Tính diện tích mảnh vườn.`,
      tpl:'[_] m²', ans:[x*y], wide:true, hint:'Lập hệ tìm chiều dài và chiều rộng trước, rồi mới tính diện tích.',
      sol:`Gọi x, y là chiều dài, chiều rộng: ${S2(`${X} + ${Y} = ${x+y}`,`${X} ${M} ${Y} = ${d}`)} ⇒ x = ${x}, y = ${y}. Diện tích: ${x} × ${y} = <b>${fmt(x*y)} m²</b>.`});
    const i=R(1,4), j=R(1,3), D=-j*x+i*y-i*j; if(D===0) return g3c(lv);
    return QB({text:`Một mảnh vườn hình chữ nhật có chu vi <b>${Pc} m</b>. Nếu tăng chiều dài thêm ${i} m và giảm chiều rộng đi ${j} m thì diện tích ${D>0?'tăng':'giảm'} <b>${Math.abs(D)} m²</b>. Tính diện tích ban đầu của mảnh vườn.`,
      tpl:'[_] m²', ans:[x*y], wide:true, hint:'Gọi x, y là chiều dài, chiều rộng. Viết (x + i)(y − j) = xy ± D rồi khai triển: các hạng tử xy triệt tiêu.',
      sol:`Ta có x + y = ${x+y} và (x + ${i})(y − ${j}) = xy ${D>0?'+':M} ${Math.abs(D)} ⇔ ${poly([-j,X],[i,Y])} = ${neg(D+i*j)}. Giải hệ được x = ${x}, y = ${y}. Diện tích: <b>${fmt(x*y)} m²</b>.`});
  }
  if(k==='tuoi'){ let C,kk,n,Mm; do{C=R(5,15);kk=R(2,3);n=R(3,10);Mm=kk*(C+n)-n}while(Mm-C<20||Mm>55);
    return QB({text:`Hiện nay tổng số tuổi của mẹ và con là <b>${Mm+C}</b>. Sau <b>${n}</b> năm nữa, tuổi mẹ gấp <b>${kk}</b> lần tuổi con. Tính tuổi mỗi người hiện nay.`,
      tpl:'Mẹ: [_] tuổi; con: [_] tuổi', ans:[Mm,C], hint:`Gọi x, y là tuổi mẹ, tuổi con hiện nay. Sau ${n} năm, mỗi người thêm ${n} tuổi.`,
      sol:`Ta có hệ ${S2(`${X} + ${Y} = ${Mm+C}`,`${X} + ${n} = ${kk}(${Y} + ${n})`)} ⇔ ${S2(`${X} + ${Y} = ${Mm+C}`,`${X} ${M} ${kk}${Y} = ${kk*n-n}`)} ⇒ y = ${C}, x = ${Mm}. Mẹ <b>${Mm} tuổi</b>, con <b>${C} tuổi</b>.`});
  }
  let a,b; do{a=R(1,9);b=R(1,9)}while(a===b);
  const n=10*a+b, m=10*b+a, D=Math.abs(m-n);
  return QB({text:`Tìm số tự nhiên có hai chữ số, biết tổng hai chữ số của nó bằng <b>${a+b}</b> và nếu đổi chỗ hai chữ số thì được số mới ${m>n?'lớn':'nhỏ'} hơn số ban đầu <b>${D}</b> đơn vị.`,
    tpl:'Số cần tìm: [_]', ans:[n], hint:'Gọi chữ số hàng chục là x, hàng đơn vị là y: số đó bằng 10x + y, số đổi chỗ là 10y + x.',
    sol:`Ta có hệ ${S2(`${X} + ${Y} = ${a+b}`,m>n?`(10${Y} + ${X}) ${M} (10${X} + ${Y}) = ${D}`:`(10${X} + ${Y}) ${M} (10${Y} + ${X}) = ${D}`)} ⇔ ${S2(`${X} + ${Y} = ${a+b}`,m>n?`${Y} ${M} ${X} = ${D/9}`:`${X} ${M} ${Y} = ${D/9}`)} ⇒ x = ${a}, y = ${b}. Số cần tìm là <b>${n}</b>.`});
};

lesson(1,'khai-niem-he','Bài 1. Khái niệm phương trình và hệ hai phương trình bậc nhất hai ẩn','Nhận biết PT bậc nhất hai ẩn; kiểm tra nghiệm của PT và của hệ; tìm tham số.',[g1a,g1b,g1c,g1d,g1e]);
lesson(1,'giai-he','Bài 2. Giải hệ hai phương trình bậc nhất hai ẩn','Phương pháp thế, phương pháp cộng đại số; số nghiệm của hệ; tìm hệ số a, b.',[g2a,g2b,g2c,g2d]);
lesson(1,'lap-he','Bài 3. Giải bài toán bằng cách lập hệ phương trình','Chọn hệ đúng cho bài toán; giải các bài toán thực tế bằng hệ phương trình.',[g3a,g3b,g3c]);
lesson(1,'on-tap-c1','Ôn tập chương I','Tổng hợp: nghiệm của PT, giải hệ, số nghiệm và bài toán lập hệ.',[g1d,g2a,g2b,g2c,g3b,g3c]);

/* =====================================================================
   CHƯƠNG II – BÀI 4. Phương trình quy về phương trình bậc nhất một ẩn
   ===================================================================== */
const TPL2 = `<span class="eq">Nghiệm nhỏ: ${X} = [_]</span><br><span class="eq">Nghiệm lớn: ${X} = [_]</span>`;
const g4a = lv => {   // phương trình tích
  let r1,r2,pt,sol;
  if(lv<3){ do{r1=R(-8,8);r2=R(-8,8)}while(r1===r2);
    const p=lv===1?1:R(2,5), f1=fac(p,-p*r1), f2=fac(1,-r2), [A,B]=r1===0?[f1,f2]:r2===0?[f2,f1]:[f1,f2];
    pt=`${A}${B} = 0`;
    sol=`${pt} ⇔ ${poly([p,X],[-p*r1,''])} = 0 hoặc ${poly([1,X],[-r2,''])} = 0 ⇔ x = ${neg(r1)} hoặc x = ${neg(r2)}.`;
  } else { const k=pick(['xx','chung','hdt']);
    if(k==='xx'){ r1=0; r2=sR(1,9); pt=`${X2} = ${poly([r2,X])}`;
      sol=`${pt} ⇔ ${poly([1,X2],[-r2,X])} = 0 ⇔ ${X}${fac(1,-r2)} = 0 ⇔ x = 0 hoặc x = ${neg(r2)}.`; }
    else if(k==='chung'){ let a,b,c; do{a=R(-6,6);b=R(-6,6);c=sR(1,5)}while(c-b===a||b===0||a===-b); r1=a; r2=c-b;
      pt=`${fac(1,-a)}${fac(1,b)} = ${mulStr(c)}${fac(1,-a)}`;
      sol=`${pt} ⇔ ${fac(1,-a)}${fac(1,b)} ${c<0?'+':M} ${Math.abs(c)===1?'':Math.abs(c)}${fac(1,-a)} = 0 ⇔ ${fac(1,-a)}${fac(1,b-c)} = 0 ⇔ x = ${neg(a)} hoặc x = ${neg(c-b)}.<br><i>Chú ý: không chia hai vế cho ${fac(1,-a)} vì sẽ mất nghiệm.</i>`; }
    else { const t=R(1,9); r1=-t; r2=t; pt=`${poly([1,X2],[-t*t,''])} = 0`;
      sol=`${pt} ⇔ ${fac(1,-t)}${fac(1,t)} = 0 (hằng đẳng thức a² − b²) ⇔ x = ${t} hoặc x = ${M}${t}.`; }
  }
  const lo=Math.min(r1,r2), hi=Math.max(r1,r2);
  return QB({text:`Giải phương trình <span class="mx">${pt}</span>`, tpl:TPL2, ans:[lo,hi],
    hint:lv<3?'Tích bằng 0 khi một trong các thừa số bằng 0. Cho từng thừa số bằng 0 rồi giải.':'Chuyển hết sang vế trái, đặt nhân tử chung (hoặc dùng hằng đẳng thức) để đưa về phương trình tích.',
    sol:`${sol} Nghiệm nhỏ <b>${neg(lo)}</b>, nghiệm lớn <b>${neg(hi)}</b>.`});
};
const ne = v => `${X} ≠ ${neg(v)}`;
const g4b = lv => {   // điều kiện xác định
  let pt, good, opts;
  if(lv===1){ let p,a; do{p=sR(1,9);a=sR(1,9)}while(Math.abs(a)===Math.abs(p));
    pt=`${F(poly([1,X],[a,'']),poly([1,X],[-p,'']))} = ${neg(sR(1,5))}`; good=ne(p); opts=[good,ne(-p),ne(a),ne(-a)];
  } else if(lv===2){ let p,q; do{p=R(1,9);q=R(1,9)}while(p===q);
    pt=`${F(neg(sR(1,5)),poly([1,X],[-p,'']))} + ${F(R(1,5),poly([1,X],[q,'']))} = ${neg(R(1,4))}`;
    good=`${ne(p)} và ${ne(-q)}`; opts=[good,`${ne(-p)} và ${ne(q)}`,`${ne(p)} và ${ne(q)}`,`${ne(-p)} và ${ne(-q)}`];
  } else { const p=sR(1,6), k=R(2,5);
    pt=`${F(poly([1,X],[R(1,5),'']),poly([k,X],[-k*p,'']))} ${M} ${F(R(1,4),X)} = ${F(1,`${X}(${poly([1,X],[-p,''])})`)}`;
    good=`${ne(p)} và ${ne(0)}`; opts=[good,`${ne(k*p)} và ${ne(0)}`,`${ne(-p)} và ${ne(0)}`,ne(p)];
  }
  return QC({text:`Điều kiện xác định của phương trình <span class="mx">${pt}</span> là`, opts, ans:good,
    hint:'Điều kiện xác định: <b>mọi mẫu thức</b> phải khác 0. Cho từng mẫu khác 0 rồi tìm x.',
    sol:`Các mẫu phải khác 0 nên ĐKXĐ là <b>${good}</b>.`});
};
const g4c = lv => {   // giải phương trình chứa ẩn ở mẫu
  if(lv===1){ let x0,b,c,a; do{x0=R(-8,8);b=R(-6,6);c=pick([-3,-2,-1,2,3,4]);a=c*(x0-b)-x0}while(b===x0||a===0||b===0);
    return QB({text:`Giải phương trình <span class="mx">${F(poly([1,X],[a,'']),poly([1,X],[-b,'']))} = ${neg(c)}</span>`, tpl:`<span class="eq">${X} = [_]</span>`, ans:[x0],
      hint:'Tìm ĐKXĐ, nhân hai vế với mẫu để khử mẫu, giải phương trình bậc nhất rồi đối chiếu điều kiện.',
      sol:`ĐKXĐ: x ≠ ${neg(b)}. Khử mẫu: ${poly([1,X],[a,''])} = ${mulStr(c)}${fac(1,-b)} ⇔ ${poly([1-c,X])} = ${neg(-c*b-a)} ⇔ x = ${neg(x0)} (thoả mãn ĐKXĐ). Nghiệm: x = <b>${neg(x0)}</b>.`});
  }
  if(lv===2){ let x0,p,q; do{x0=R(-4,8);p=x0-R(1,6);q=x0-R(1,6)}while(p===q||p===0||q===0);
    const A=x0-p, B=x0-q;
    return QB({text:`Giải phương trình <span class="mx">${F(A,poly([1,X],[-p,'']))} = ${F(B,poly([1,X],[-q,'']))}</span>`, tpl:`<span class="eq">${X} = [_]</span>`, ans:[x0],
      hint:'ĐKXĐ: hai mẫu khác 0. Nhân chéo (hoặc quy đồng) để khử mẫu, giải rồi đối chiếu điều kiện.',
      sol:`ĐKXĐ: x ≠ ${neg(p)}, x ≠ ${neg(q)}. Khử mẫu: ${mulStr(A)}${fac(1,-q)} = ${mulStr(B)}${fac(1,-p)} ⇔ ${poly([A-B,X])} = ${neg(A*q-B*p)} ⇔ x = ${neg(x0)} (thoả mãn). Nghiệm: x = <b>${neg(x0)}</b>.`});
  }
  let a,r,e,Q,p,T; do{a=sR(1,5);r=R(-6,6);e=pick([0,a]);Q=R(1,4);p=Q-e-r;T=Q*a-e*r}while(r===0||r===a||T===0);
  const den2=`${X}(${poly([1,X],[-a,''])})`;
  return QB({text:`Giải phương trình <span class="mx">${F(poly([1,X],[p,'']),poly([1,X],[-a,'']))} ${M} ${F(Q,X)} = ${T<0?M:''}${F(Math.abs(T),den2)}</span>`, tpl:`<span class="eq">${X} = [_]</span>`, ans:[r],
    hint:`Tìm ĐKXĐ (mọi mẫu khác 0). Quy đồng với mẫu chung ${den2}, khử mẫu, đưa về phương trình tích. Nhớ loại giá trị không thoả mãn ĐKXĐ.`,
    sol:`ĐKXĐ: x ≠ 0, x ≠ ${neg(a)}. Quy đồng và khử mẫu: ${p===0?X2:X+fac(1,p)} ${M} ${mulStr(Q)}${fac(1,-a)} = ${neg(T)} ⇔ ${poly([1,X2],[p-Q,X],[Q*a-T,''])} = 0 ⇔ ${e===0?X:fac(1,-e)}${fac(1,-r)} = 0 ⇔ x = ${neg(e)} (loại vì không thoả mãn ĐKXĐ) hoặc x = ${neg(r)} (nhận). Nghiệm: x = <b>${neg(r)}</b>.`});
};

/* =====================================================================
   BÀI 5. Bất đẳng thức và tính chất
   ===================================================================== */
const g5a = lv => {   // diễn đạt bằng lời
  const OPS=['≥','≤','>','<'];
  if(lv===1){ const v=V(pick(['a','x','m','b'])), n=R(-9,15), [w,op]=pick([['không nhỏ hơn','≥'],['không lớn hơn','≤'],['nhỏ hơn','<'],['lớn hơn','>'],['không vượt quá','≤'],['không bé hơn','≥']]);
    const S=o=>`${v} ${o} ${neg(n)}`;
    return QC({text:`Khẳng định “${v} ${w} ${neg(n)}” được viết là:`, opts:OPS.map(S), ans:S(op),
      hint:'“không nhỏ hơn” nghĩa là lớn hơn hoặc bằng (≥); “không lớn hơn”, “không vượt quá” nghĩa là nhỏ hơn hoặc bằng (≤).',
      sol:`“${w}” ứng với dấu “${op}”: <b>${S(op)}</b>.`});
  }
  if(lv===2){ const c=pick([
      ()=>{const n=pick([40,50,60,80]);return [`Biển báo giới hạn tốc độ <b>tối đa</b> ${n} km/h. Gọi <i>v</i> (km/h) là tốc độ cho phép của xe.`,'v','≤',n]},
      ()=>{const n=pick([450,630,750,1000]);return [`Một thang máy chở được <b>tối đa</b> ${n} kg. Gọi <i>m</i> (kg) là khối lượng được phép chở.`,'m','≤',n]},
      ()=>{const n=pick([20,25,30]);return [`Để vào vòng trong, đội cần ghi được <b>ít nhất</b> ${n} điểm. Gọi <i>s</i> là số điểm đội cần có.`,'s','≥',n]},
      ()=>{const n=pick([4,5,8]);return [`Sữa chua cần bảo quản ở nhiệt độ <b>dưới</b> ${n} °C. Gọi <i>t</i> (°C) là nhiệt độ bảo quản.`,'t','<',n]},
      ()=>{const n=pick([120,130,140]);return [`Trò chơi chỉ dành cho người cao <b>trên</b> ${n} cm. Gọi <i>h</i> (cm) là chiều cao người chơi.`,'h','>',n]},
      ()=>{const n=pick([35,40,45]);return [`Mỗi lớp học có <b>không quá</b> ${n} học sinh. Gọi <i>n</i> là số học sinh của một lớp.`,'n','≤',n]},
      ()=>{const n=pick([20,30,45]);return [`Mỗi ngày em đọc sách <b>không ít hơn</b> ${n} phút. Gọi <i>t</i> là số phút đọc sách.`,'t','≥',n]},
    ])(); const [txt,v,op,n]=c, S=o=>`${V(v)} ${o} ${n}`;
    return QC({text:`${txt} Bất đẳng thức nào diễn tả đúng?`, opts:OPS.map(S), ans:S(op),
      hint:'“tối đa, không quá” → ≤ ; “ít nhất, không ít hơn” → ≥ ; “dưới” → < ; “trên” → >.', sol:`Ta viết <b>${S(op)}</b>.`});
  }
  const a=R(2,9), b=R(3,20), k=R(2,5), c=pick([
    [`Tổng của ${X} và ${a} không nhỏ hơn ${b}`, `${X} + ${a}`, '≥', String(b)],
    [`Hiệu của ${X} và ${a} nhỏ hơn ${b}`, `${X} ${M} ${a}`, '<', String(b)],
    [`${k} lần ${X} không lớn hơn ${b}`, `${k}${X}`, '≤', String(b)],
    [`${X} cộng ${a} thì lớn hơn ${k} lần ${X}`, `${X} + ${a}`, '>', `${k}${X}`],
    [`Bình phương của ${X} luôn không âm`, X2, '≥', '0'],
  ]); const S=o=>`${c[1]} ${o} ${c[3]}`;
  return QC({text:`Viết bất đẳng thức diễn tả: “${c[0]}”.`, opts:OPS.map(S), ans:S(c[2]),
    hint:'Viết biểu thức ở mỗi vế trước, rồi chọn dấu: không nhỏ hơn (≥), không lớn hơn (≤), nhỏ hơn (<), lớn hơn (>), không âm (≥ 0).',
    sol:`Ta viết <b>${S(c[2])}</b>.`});
};
const g5b = lv => {   // so sánh nhờ tính chất
  const rel=pick(['<','>']), s=rel==='<'?-1:1;
  let k=lv===1?1:lv===2?-R(2,6):sR(2,6), c1=sR(1,9), c2=c1;
  if(lv===1&&Math.random()<.5){ k=R(2,6); }
  if(lv===3){ const dir=Math.sign(k*s); c2=c1-dir*R(1,5); } // chênh hằng số cùng chiều → vẫn so sánh được
  const L=poly([k,A_],[c1,'']), Rr=poly([k,B_],[c2,'']), sgn=Math.sign(k*s), ansOp=sgn>0?'>':'<';
  const step1=k===1?`Vì ${A_} ${rel} ${B_} nên cộng ${neg(c1)} vào hai vế giữ nguyên chiều`:`Vì ${A_} ${rel} ${B_} và ${neg(k)} ${k>0?'> 0':'< 0'} nên ${poly([k,A_])} ${k>0?rel:FLIP[rel]} ${poly([k,B_])}${k<0?' (nhân với số âm thì đổi chiều)':''}`;
  const sol = c1===c2 ? `${step1} ⇒ ${L} <b>${ansOp}</b> ${Rr}.`
    : `${step1} ⇒ ${L} ${ansOp} ${poly([k,B_],[c1,''])}. Mà ${poly([k,B_],[c1,''])} ${ansOp} ${Rr} (vì ${neg(c1)} ${ansOp} ${neg(c2)}). Theo tính chất bắc cầu: ${L} <b>${ansOp}</b> ${Rr}.`;
  return QCmp(`Cho ${A_} ${rel} ${B_}. So sánh hai biểu thức:`, L, Rr, sgn, 0,
    {hint:lv===1?'Cộng cùng một số vào hai vế thì giữ nguyên chiều; nhân với số dương cũng giữ nguyên chiều.':lv===2?'Nhân hai vế với một số âm thì bất đẳng thức <b>đổi chiều</b>.':'So sánh qua một biểu thức trung gian rồi dùng tính chất bắc cầu.', sol});
};
const g5c = lv => {   // khẳng định đúng
  if(lv===3){ const k=sR(2,6), c=sR(1,9), op=pick(['<','>','≤','≥']), d=k>0?op:FLIP[op], S=o=>`${A_} ${o} ${B_}`;
    return QC({text:`Cho ${poly([k,A_],[c,''])} ${op} ${poly([k,B_],[c,''])}. Khẳng định nào sau đây đúng?`, opts:['<','>','≤','≥'].map(S), ans:S(d),
      hint:`Cộng ${neg(-c)} vào hai vế, rồi chia hai vế cho ${neg(k)}. Chia cho số âm thì đổi chiều.`,
      sol:`Cộng ${neg(-c)} vào hai vế: ${poly([k,A_])} ${op} ${poly([k,B_])}. Chia hai vế cho ${neg(k)}${k<0?' (số âm, đổi chiều)':''}: <b>${S(d)}</b>.`}); }
  const rel=pick(['<','>']);
  const mk=()=>{const t=pick(lv===1?['add','sub','mul','mix']:['add','mul','neg','neg','mixneg']);const c=R(1,9);let k=R(2,6);
    if(t==='add')return [`${A_} + ${c}`,`${B_} + ${c}`,rel];
    if(t==='sub')return [`${A_} ${M} ${c}`,`${B_} ${M} ${c}`,rel];
    if(t==='mul')return [`${k}${A_}`,`${k}${B_}`,rel];
    if(t==='mix')return [poly([k,A_],[-c,'']),poly([k,B_],[-c,'']),rel];
    if(t==='neg')return [poly([-k,A_]),poly([-k,B_]),FLIP[rel]];
    return [poly([-k,A_],[c,'']),poly([-k,B_],[c,'']),FLIP[rel]];};
  const items=[];const seen=new Set();while(items.length<4){const it=mk();if(!seen.has(it[0])){seen.add(it[0]);items.push(it)}}
  const st=(it,right)=>`${it[0]} ${right?it[2]:FLIP[it[2]]} ${it[1]}`;
  const good=st(items[0],true);
  return QC({text:`Cho ${A_} ${rel} ${B_}. Khẳng định nào sau đây <b>đúng</b>?`, opts:[good,...items.slice(1).map(it=>st(it,false))], ans:good,
    hint:'Cộng/trừ cùng một số hoặc nhân với số dương: giữ chiều. Nhân với số âm: đổi chiều.',
    sol:`Khẳng định đúng: <b>${good}</b>. Các khẳng định còn lại đều viết sai chiều.`});
};
const g5d = lv => {   // điền số
  if(lv<3){ const op=pick(['≥','≤']), m=R(-5,6), k=lv===1?R(2,6):-R(2,6), c=R(-9,9), v=k*m+c, op2=k>0?op:FLIP[op];
    return QB({text:`Cho ${A_} ${op} ${neg(m)}. Điền số thích hợp vào ô trống:`, tpl:`<span class="eq">${poly([k,A_],[c,''])} ${op2} [_]</span>`, ans:[v],
      hint:`Nhân hai vế của ${A_} ${op} ${neg(m)} với ${neg(k)}${k<0?' (nhớ đổi chiều)':''}, sau đó cộng ${neg(c)} vào hai vế.`,
      sol:`${A_} ${op} ${neg(m)} ⇒ ${poly([k,A_])} ${op2} ${neg(k*m)} ⇒ ${poly([k,A_],[c,''])} ${op2} ${minus(k*m,-c)} = <b>${neg(v)}</b>.`}); }
  const op=pick(['≥','≤']), m=R(-3,5), n=R(-3,5), p=R(2,5), q=R(2,5), v=p*m+q*n;
  return QB({text:`Cho ${A_} ${op} ${neg(m)} và ${B_} ${op} ${neg(n)}. Điền số thích hợp:`, tpl:`<span class="eq">${p}${A_} + ${q}${B_} ${op} [_]</span>`, ans:[v],
    hint:'Nhân mỗi bất đẳng thức với số dương thích hợp, rồi cộng vế theo vế hai bất đẳng thức cùng chiều.',
    sol:`${p}${A_} ${op} ${neg(p*m)}; ${q}${B_} ${op} ${neg(q*n)}. Cộng vế theo vế: ${p}${A_} + ${q}${B_} ${op} <b>${neg(v)}</b>.`});
};

/* =====================================================================
   BÀI 6. Bất phương trình bậc nhất một ẩn
   ===================================================================== */
const OP4=['<','>','≤','≥'];
const g6a = lv => {   // nhận biết
  const a=sR(1,7), b=sR(1,9), op=pick(OP4);
  const goods=[`${poly([a,X],[b,''])} ${op} 0`, `${poly([1,F(1,2)+X],[-R(1,5),''])} ≤ 0`, `${poly([-1,X],[R(1,9),''])} > 0`, `${R(2,9)} ${M} ${poly([R(2,5),X])} ≥ 0`, `${poly([R(2,6),X])} < 0`];
  const W=shuffle([
    {s:`0${X} + ${R(1,9)} > 0`, why:'hệ số của x bằng 0'},
    {s:`${poly([1,X2],[-R(1,9),''])} < 0`, why:'có x² (bậc hai)'},
    {s:`${F(1,X)} + ${R(1,5)} ≥ 0`, why:'ẩn nằm ở mẫu'},
    {s:`${X} + ${Y} > ${R(1,5)}`, why:'có hai ẩn'},
  ]);
  const hint='Bất phương trình bậc nhất một ẩn có dạng <i>ax</i> + <i>b</i> > 0 (hoặc <, ≤, ≥) với <b><i>a</i> ≠ 0</b>.';
  if(lv<3){ const good=lv===1?goods[0]:pick(goods);
    return QC({text:'Bất phương trình nào sau đây là <b>bất phương trình bậc nhất một ẩn</b>?', opts:[good,...W.slice(0,3).map(w=>w.s)], ans:good, hint,
      sol:`<b>${good}</b> đưa được về dạng ax + b ${'>'} 0 (hoặc <, ≤, ≥) với a ≠ 0.`}); }
  const w=W[0];
  return QC({text:'Bất phương trình nào sau đây <b>không phải</b> là bất phương trình bậc nhất một ẩn?', opts:[w.s,...shuffle(goods).slice(0,3)], ans:w.s, hint,
    sol:`<b>${w.s}</b> không phải BPT bậc nhất một ẩn vì ${w.why}.`});
};
// Dựng BPT: lhs(x) op rhs(x) với ngưỡng nguyên t.  Trả về {s, f(x) đúng/sai, t, op2 (dạng x op2 t), steps}
const mkBPT = (lv, fracOK) => {
  let a,b,c,d,op=pick(OP4),t,num,den;
  do{ if(lv===1){a=R(2,6);c=0}else if(lv===2){a=-R(2,6);c=0}else{a=sR(1,7);c=sR(1,7)}
    b=R(-9,9); t=R(-6,6);
    if(fracOK&&lv>1){d=R(-12,12)} else d=(a-c)*t+b;   // (a−c)x op d−b
    num=d-b; den=a-c;
  }while(a===c||num===0);
  const L=poly([a,X],[b,'']), Rr=c?poly([c,X],[d,'']):neg(d), A=a-c, op2=A>0?op:FLIP[op], th=frac(num,den);
  const steps=`${c?`${poly([A,X])} ${op} ${neg(num)}`:(b?`${poly([a,X])} ${op} ${minus(d,b)} = ${neg(num)}`:`${poly([a,X])} ${op} ${neg(d)}`)} ⇔ ${X} ${op2} ${th}${A<0?' (chia cho số âm, đổi chiều)':''}`;
  return {s:`${L} ${op} ${Rr}`, f:x=>TEST(a*x+b,op,c*x+d), op, op2, num, den, th, steps};
};
const g6b = lv => {   // số nào là nghiệm
  const B=mkBPT(lv,false), t=Math.round(B.num/((B.den)));
  const cand=shuffle([...Array(9)].map((_,i)=>t-4+i)), good=cand.find(B.f), bad=cand.filter(x=>!B.f(x)).slice(0,3);
  return QC({text:`Số nào sau đây là nghiệm của bất phương trình <span class="mx">${B.s}</span>`, opts:[good,...bad].map(neg), ans:neg(good),
    hint:'Thay từng số vào hai vế và kiểm tra khẳng định có đúng không. (Hoặc giải bất phương trình trước.)',
    sol:`Giải: ${B.s} ⇔ ${B.steps}. Trong các số đã cho chỉ có <b>${neg(good)}</b> thoả mãn.`});
};
const g6c = lv => {   // giải BPT – chọn tập nghiệm
  const B=mkBPT(lv,lv===3);
  const S=(o,v)=>`${X} ${o} ${v}`, mth=frac(-B.num,B.den);
  const opts=[S(B.op2,B.th),S(FLIP[B.op2],B.th),S(B.op2,mth),S(FLIP[B.op2],mth)];
  return QC({text:`Nghiệm của bất phương trình <span class="mx">${B.s}</span> là`, opts, ans:opts[0],
    hint:'Chuyển các hạng tử chứa x sang một vế, số sang vế kia (nhớ đổi dấu), rồi chia hai vế cho hệ số của x. Chia cho số âm phải <b>đổi chiều</b>.',
    sol:`${B.s} ⇔ ${B.steps}. Vậy nghiệm là <b>${S(B.op2,B.th)}</b>.`});
};
const g6d = lv => {   // nghiệm nguyên lớn nhất / nhỏ nhất
  let s,f,A,C,op,num; // dạng k(x − m) + n op px + q
  do{ const k=lv===1?R(2,5):sR(1,5), m=R(-5,5), n=R(-9,9), p=lv===3?sR(1,4):0, q=R(-9,9); op=pick(OP4);
    A=k-p; C=q+k*m-n; num=C;
    const nS=n?` ${n<0?M:'+'} ${Math.abs(n)}`:'';
    s=lv===1?`${poly([k,X],[-k*m+n,''])} ${op} ${neg(q)}`:`${mulStr(k)}${fac(1,-m)}${nS} ${op} ${p?poly([p,X],[q,'']):neg(q)}`;
    f=x=>TEST(k*(x-m)+n,op,p*x+q);
  }while(A===0||(lv===1&&(C%A!==0))||Math.abs(C/A)>12);
  const op2=A>0?op:FLIP[op], big=op2==='<'||op2==='≤';
  let ans=null; for(let x=-40;x<=40;x++) if(f(x)){ if(big) ans=x; else if(ans===null) ans=x; }
  return QB({text:`Tìm số nguyên <i>x</i> <b>${big?'lớn nhất':'nhỏ nhất'}</b> thoả mãn <span class="mx">${s}</span>`, tpl:`<span class="eq">${X} = [_]</span>`, ans:[ans],
    hint:`Giải bất phương trình để được dạng x ${op2} (một số), rồi chọn số nguyên ${big?'lớn nhất':'nhỏ nhất'} thoả mãn. Chú ý dấu ${/[≤≥]/.test(op2)?'có':'không có'} dấu bằng.`,
    sol:`Biến đổi: ${poly([A,X])} ${op} ${neg(C)} ⇔ ${X} ${op2} ${frac(C,A)}${A<0?' (chia cho số âm, đổi chiều)':''}. Số nguyên ${big?'lớn nhất':'nhỏ nhất'} thoả mãn là <b>${neg(ans)}</b>.`});
};
const g6e = lv => {   // bài toán thực tế
  const nm=pick(NAMES);
  if(lv===1){ if(Math.random()<.5){ const p=pick([15,20,25,30]), q=pick([6,8,9,12]), Mo=pick([100,150,200,250]), ans=Math.floor((Mo-p)/q);
      return QB({text:`${nm} có <b>${Mo} nghìn đồng</b>. ${nm} mua một hộp bút giá ${p} nghìn đồng, số tiền còn lại mua vở giá ${q} nghìn đồng một quyển. ${nm} mua được <b>nhiều nhất</b> bao nhiêu quyển vở?`,
        tpl:'[_] quyển', ans:[ans], hint:'Gọi x là số quyển vở. Lập bất phương trình: tiền bút + tiền vở ≤ số tiền có. Giải rồi chọn số tự nhiên lớn nhất.',
        sol:`${p} + ${q}x ≤ ${Mo} ⇔ x ≤ ${frac(Mo-p,q)}. Số tự nhiên lớn nhất là <b>${ans}</b> quyển.`}); }
    const W=pick([450,630,750]), m=pick([60,65,70,75]), h=pick([40,45,50,55]), ans=Math.floor((W-m)/h);
    return QB({text:`Một thang máy chở tối đa <b>${W} kg</b>. Một người nặng ${m} kg cần chở các thùng hàng, mỗi thùng nặng ${h} kg. Mỗi chuyến chở được <b>nhiều nhất</b> bao nhiêu thùng hàng (kể cả người đi cùng)?`,
      tpl:'[_] thùng', ans:[ans], hint:'Gọi x là số thùng. Tổng khối lượng người và hàng phải ≤ tải trọng tối đa.',
      sol:`${m} + ${h}x ≤ ${W} ⇔ x ≤ ${frac(W-m,h)}. Nhiều nhất <b>${ans}</b> thùng.`});
  }
  if(lv===2){ const O=pick([10,12,15]), r=pick([12,14,15,16]), Mo=pick([150,200,250,300]), ans=Math.floor((Mo-O)/r)+1;
    return QB({text:`Giá cước một hãng taxi: km đầu tiên ${O} nghìn đồng, mỗi km tiếp theo ${r} nghìn đồng. ${nm} có <b>${Mo} nghìn đồng</b>. Hỏi ${nm} đi được <b>tối đa</b> bao nhiêu km (số nguyên)?`,
      tpl:'[_] km', ans:[ans], hint:'Gọi x là số km (x ≥ 1). Số tiền phải trả: km đầu + (x − 1) km tiếp theo. Lập bất phương trình ≤ số tiền có.',
      sol:`${O} + ${r}(x − 1) ≤ ${Mo} ⇔ ${r}x ≤ ${Mo-O+r} ⇔ x ≤ ${frac(Mo-O+r,r)}. Tối đa <b>${ans} km</b>.`});
  }
  let a,b,T,need; do{a=R(5,10);b=R(5,10);T=pick([7,7.5,8,8.5]);need=Math.ceil((4*T-a-b)/2)}while(need>10||need<1);
  return QB({text:`Điểm trung bình môn của ${nm} tính theo công thức (bài 1 + bài 2 + 2 × bài 3) : 4. ${nm} đã có bài 1 được <b>${a}</b> điểm, bài 2 được <b>${b}</b> điểm. Bài 3 phải được <b>ít nhất</b> bao nhiêu điểm (số nguyên) để điểm trung bình không dưới ${dec(T)}?`,
    tpl:'[_] điểm', ans:[need], hint:'Gọi x là điểm bài 3. Lập bất phương trình (a + b + 2x) : 4 ≥ T rồi giải, chọn số nguyên nhỏ nhất.',
    sol:`(${a} + ${b} + 2x) : 4 ≥ ${dec(T)} ⇔ 2x ≥ ${dec(4*T-a-b)} ⇔ x ≥ ${dec((4*T-a-b)/2)}. Bài 3 cần ít nhất <b>${need}</b> điểm.`});
};

lesson(2,'pt-quy-ve-bac-nhat','Bài 4. Phương trình quy về phương trình bậc nhất một ẩn','Phương trình tích; điều kiện xác định và cách giải phương trình chứa ẩn ở mẫu.',[g4a,g4b,g4c]);
lesson(2,'bat-dang-thuc','Bài 5. Bất đẳng thức và tính chất','Diễn đạt bằng lời; tính chất liên hệ với phép cộng, phép nhân; tính chất bắc cầu.',[g5a,g5b,g5c,g5d]);
lesson(2,'bat-phuong-trinh','Bài 6. Bất phương trình bậc nhất một ẩn','Nhận biết, kiểm tra nghiệm, giải BPT; nghiệm nguyên; bài toán thực tế.',[g6a,g6b,g6c,g6d,g6e]);
lesson(2,'on-tap-c2','Ôn tập chương II','Tổng hợp: phương trình tích, chứa ẩn ở mẫu, bất đẳng thức, bất phương trình.',[g4a,g4c,g5b,g6c,g6d,g6e]);
})();
