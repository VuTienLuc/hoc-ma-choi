/* =====================================================================
   DỮ LIỆU LỚP 9 – Toán, Kết nối tri thức
   Chương I.  Phương trình và hệ hai phương trình bậc nhất hai ẩn (Bài 1–3)
   Chương II. Phương trình và bất phương trình bậc nhất một ẩn (Bài 4–6)
   Chương III. Căn bậc hai và căn bậc ba (Bài 7–10)
   Chương IV. Hệ thức lượng trong tam giác vuông (Bài 11–12)
   Chương V.  Đường tròn (Bài 13–17)
   Mỗi dạng bài: lv => câu hỏi. Luôn chọn NGHIỆM trước rồi mới dựng đề.
   Công thức viết LaTeX: tm() trong dòng, td() riêng dòng, tb() đáp án đậm (xem core.js).
   ===================================================================== */
(() => {
const G = App.addGrade({
  id: 'lop9', name: 'Lớp 9', subject: 'Toán', book: 'Kết nối tri thức',
  topics: [
    {id:1, hk:1, name:'Phương trình và hệ hai phương trình bậc nhất hai ẩn', label:'Chương I'},
    {id:2, hk:1, name:'Phương trình và bất phương trình bậc nhất một ẩn', label:'Chương II'},
    {id:3, hk:1, name:'Căn bậc hai và căn bậc ba', label:'Chương III'},
    {id:4, hk:1, name:'Hệ thức lượng trong tam giác vuông', label:'Chương IV'},
  ],
});
const lesson = G.lesson;

/* ---------- Tiện ích LaTeX riêng của lớp 9 ---------- */
const X = 'x', Y = 'y', X2 = 'x^2';
const poly = tpoly, frac = tfrac, par = tp;
const RA = '\\;\\Rightarrow\\;', EQ = '\\;\\Leftrightarrow\\;';
const OPS = {'<':'\\lt', '>':'\\gt', '≤':'\\le', '≥':'\\ge'};
const op_ = o => OPS[o];
const eq2 = (a,b,c) => `${poly([a,X],[b,Y])} = ${c}`;
const sys = (e1,e2,lab) => tsys([e1,e2], lab);
const pr = (x,y) => `({${x}};\\,{${y}})`;
const sR = (a,b) => pick([-1,1])*R(a,b);
const subst = (a,b,x,y) => `${a}\\cdot${par(x)} ${b<0?'-':'+'} ${Math.abs(b)}\\cdot${par(y)}`;
const minus = (c,t) => t===0 ? String(c) : `${c} ${t<0?'+':'-'} ${Math.abs(t)}`;   // c − t, bỏ “− 0”
const det = (a1,b1,a2,b2) => a1*b2-a2*b1;
const uniqBy = arr => {const seen=new Set();return arr.filter(p=>{const k=JSON.stringify(p);if(seen.has(k))return false;seen.add(k);return true})};
const fac = (p,q) => q===0 ? poly([p,X]) : `(${poly([p,X],[q,''])})`;
const mulStr = c => c===1?'':c===-1?'-':String(c);
const cf = c => Math.abs(c)===1 ? '' : Math.abs(c);            // hệ số khi đã tách dấu
const sg = c => c<0 ? '-' : '+';
const FLIP = {'<':'>','>':'<','≤':'≥','≥':'≤'};
const TEST = (l,op,r) => op==='<'?l<r:op==='>'?l>r:op==='≤'?l<=r:l>=r;
const ANS2 = `<span class="eq">${tm('(x;\\,y) = (')}[_]${tm(';')}[_]${tm(')')}</span>`;
const blank = v => `<span class="eq">${tm(v+' =')} [_]</span>`;

/* =====================================================================
   CHƯƠNG I – BÀI 1. Khái niệm phương trình và hệ hai PT bậc nhất hai ẩn
   ===================================================================== */
const zeroX = (b,c) => `0x ${sg(b)} ${cf(b)}y = ${c}`;
const zeroY = (a,c) => `${poly([a,X])} + 0y = ${c}`;
const wrongPT = () => { const a=sR(1,6), b=sR(1,6), c=sR(1,9); return shuffle([
  {s:`${poly([a,X2],[b,Y])} = ${c}`, why:`có ${tm('x^2')} (bậc hai)`},
  {s:`${poly([a,'xy'],[b,X])} = ${c}`, why:`có tích ${tm('xy')}`},
  {s:`${a<0?'-':''}${tf(Math.abs(a),'x')} ${sg(b)} ${cf(b)}y = ${c}`, why:'có ẩn ở mẫu'},
  {s:`${poly([a,X],[b,'y^2'])} = ${c}`, why:`có ${tm('y^2')} (bậc hai)`},
  {s:`0x + 0y = ${c}`, why:`hai hệ số ${tm('a, b')} đều bằng 0`, zero:true},
])};
const PT2 = tm('ax + by = c');
const g1a = lv => {
  const a=sR(1,7), b=sR(1,7), c=sR(1,12);
  const goods=[eq2(a,b,c), zeroX(sR(1,6),sR(1,9)), zeroY(sR(2,6),sR(1,9)), `\\tfrac{1}{2}x - y = ${sR(1,9)}`];
  const hint=`Phương trình bậc nhất hai ẩn có dạng ${PT2}, trong đó ${tm('a')} và ${tm('b')} không đồng thời bằng 0. Ẩn không nằm ở mẫu, không có ${tm('x^2, y^2')} hay tích ${tm('xy')}.`;
  if(lv<3){
    let W=wrongPT(); if(lv===1) W=W.filter(w=>!w.zero);
    const good=lv===1?goods[0]:pick(goods);
    return QC({text:'Phương trình nào sau đây là <b>phương trình bậc nhất hai ẩn</b>?', opts:[good,...W.slice(0,3).map(w=>w.s)].map(tm), ans:tm(good), hint,
      sol:`${tb(good)} có dạng ${PT2} với ${tm('a, b')} không đồng thời bằng 0. Các phương trình còn lại có ẩn ở mẫu, có bậc hai hoặc có ${tm('a = b = 0')}.`});
  }
  const w=pick(wrongPT());
  return QC({text:'Phương trình nào sau đây <b>không phải</b> là phương trình bậc nhất hai ẩn?', opts:[w.s,...shuffle(goods).slice(0,3)].map(tm), ans:tm(w.s), hint,
    sol:`${tb(w.s)} không phải phương trình bậc nhất hai ẩn vì ${w.why}. Chú ý: ${tm('0x + 3y = 5')} vẫn là phương trình bậc nhất hai ẩn (chỉ cần ${tm('a, b')} không đồng thời bằng 0).`});
};
const g1b = lv => {
  const a=lv===1?R(1,5):sR(1,6), b=lv===1?R(1,5):sR(1,6), lo=lv===1?0:-6, hi=lv===1?5:6;
  const x=R(lo,hi), y=R(lo,hi), c=a*x+b*y, ok=(p,q)=>a*p+b*q===c;
  let W=uniqBy(shuffle([[y,x],[x,y+1],[x+1,y],[-x,y],[x,-y],[x-1,y+1],[x+1,y+1],[y,-x],[x+2,y-1]])).filter(([p,q])=>!ok(p,q)&&(lv>1||(p>=0&&q>=0)));
  if(W.length<3) W=[[x+1,y],[x,y+1],[x+1,y+1]];
  return QC({text:`Cặp số nào sau đây là nghiệm của phương trình ${td(eq2(a,b,c))}`,
    opts:[pr(x,y),...W.slice(0,3).map(([p,q])=>pr(p,q))].map(tm), ans:tm(pr(x,y)),
    hint:`Thay lần lượt ${tm('x, y')} của từng cặp số vào vế trái. Cặp số nào làm vế trái bằng vế phải thì đó là nghiệm.`,
    sol:`Thay ${tm(`x = ${x},\\ y = ${y}`)}: ${tm(`${subst(a,b,x,y)} = ${c}`)} (đúng). Vậy ${tb(pr(x,y))} là nghiệm.`});
};
const g1c = lv => {
  if(lv<3){
    const a=lv===1?R(1,5):sR(1,6), b=lv===1?R(1,5):sR(1,6), x=R(lv===1?0:-6,6), y=R(lv===1?0:-6,6), c=a*x+b*y;
    const askY=lv===1||Math.random()<.5;
    return askY
      ? QB({text:`Tìm ${tm('y')} để cặp số ${tm(pr(x,'y'))} là nghiệm của phương trình ${td(eq2(a,b,c))}`, tpl:blank('y'), ans:[y],
          hint:`Thay ${tm(`x = ${x}`)} vào phương trình rồi giải phương trình bậc nhất ẩn ${tm('y')}.`,
          sol:`Thay ${tm(`x = ${x}`)}: ${tm(`${a}\\cdot${par(x)} ${sg(b)} ${poly([Math.abs(b),Y])} = ${c}${RA}${poly([b,Y])} = ${c-a*x}${RA}y = ${y}`)}. Vậy ${tb(`y = ${y}`)}.`})
      : QB({text:`Tìm ${tm('x')} để cặp số ${tm(pr('x',y))} là nghiệm của phương trình ${td(eq2(a,b,c))}`, tpl:blank('x'), ans:[x],
          hint:`Thay ${tm(`y = ${y}`)} vào phương trình rồi giải phương trình bậc nhất ẩn ${tm('x')}.`,
          sol:`Thay ${tm(`y = ${y}`)}: ${tm(`${poly([a,X])} ${sg(b)} ${Math.abs(b)}\\cdot${par(y)} = ${c}${RA}${poly([a,X])} = ${c-b*y}${RA}x = ${x}`)}. Vậy ${tb(`x = ${x}`)}.`});
  }
  const A=sR(1,6), k=sR(1,5), m=A-k, b=sR(1,6), x=sR(1,5), y=R(-5,5), c=A*x+b*y;
  const coef=`(${poly([1,'m'],[k,''])})`;
  return QB({text:`Tìm ${tm('m')} để cặp số ${tm(pr(x,y))} là nghiệm của phương trình ${td(`${coef}x ${sg(b)} ${cf(b)}y = ${c}`)}`,
    tpl:blank('m'), ans:[m],
    hint:`Thay ${tm('x, y')} của cặp số vào phương trình, được một phương trình ẩn ${tm('m')}. Giải phương trình đó.`,
    sol:`Thay ${tm(`x = ${x},\\ y = ${y}`)}: ${tm(`${coef}\\cdot${par(x)} ${sg(b)} ${Math.abs(b)}\\cdot${par(y)} = ${c}${RA}${coef}\\cdot${par(x)} = ${A*x}${RA}${poly([1,'m'],[k,''])} = ${A}`)}. Vậy ${tb(`m = ${m}`)}.`});
};
const pickSys = (lv, big) => { let a1,b1,a2,b2; const r=big||(lv===1?4:6);
  do{ a1=lv===1?R(1,r):sR(1,r); b1=lv===1?R(1,r):sR(1,r); a2=sR(1,r); b2=sR(1,r); }while(det(a1,b1,a2,b2)===0);
  return [a1,b1,a2,b2]; };
const g1d = lv => {
  const [a1,b1,a2,b2]=pickSys(lv), lo=lv===1?0:-5, x=R(lo,5), y=R(lo,5), c1=a1*x+b1*y, c2=a2*x+b2*y;
  const both=(p,q)=>a1*p+b1*q===c1&&a2*p+b2*q===c2;
  const g1=gcd(a1,b1), g2=gcd(a2,b2);
  let W=uniqBy([[x+b1/g1,y-a1/g1],[x-b2/g2,y+a2/g2],[y,x],[x+1,y-1],[-x,-y],[x-b1/g1,y+a1/g1]]).filter(([p,q])=>!both(p,q));
  return QC({text:`Cặp số nào sau đây là nghiệm của hệ phương trình ${td(sys(eq2(a1,b1,c1),eq2(a2,b2,c2)))}`,
    opts:[pr(x,y),...W.slice(0,3).map(([p,q])=>pr(p,q))].map(tm), ans:tm(pr(x,y)),
    hint:'Nghiệm của hệ phải thoả mãn <b>cả hai</b> phương trình. Có cặp số chỉ đúng với một phương trình – hãy thử cả hai.',
    sol:`Với ${tm(pr(x,y))}: PT thứ nhất ${tm(`${subst(a1,b1,x,y)} = ${c1}`)} ✓; PT thứ hai ${tm(`${subst(a2,b2,x,y)} = ${c2}`)} ✓. Vậy nghiệm là ${tb(pr(x,y))}.`});
};
const g1e = lv => {
  const x=sR(1,4), y=sR(1,5);
  if(lv===1){ const a=sR(1,5), b1=sR(1,4), a2=sR(1,4), b2=sR(1,4), c1=a*x+b1*y, c2=a2*x+b2*y;
    return QB({text:`Biết hệ phương trình ${td(sys(`ax ${sg(b1)} ${cf(b1)}y = ${c1}`,eq2(a2,b2,c2)))} có nghiệm ${tm(pr(x,y))}. Tìm ${tm('a')}.`,
      tpl:blank('a'), ans:[a],
      hint:`Thay ${tm('x, y')} vào phương trình chứa ${tm('a')}, được phương trình bậc nhất ẩn ${tm('a')}.`,
      sol:`Thay vào PT thứ nhất: ${tm(`a\\cdot${par(x)} ${sg(b1)} ${Math.abs(b1)}\\cdot${par(y)} = ${c1}${RA}${poly([x,'a'])} = ${a*x}`)}. Vậy ${tb(`a = ${a}`)}.`}); }
  const a=sR(1,5), b=sR(1,5), k1=lv===3?sR(1,3):0, k2=lv===3?sR(1,3):0, B1=sR(1,4), A2=sR(1,4);
  const c1=(a+k1)*x+B1*y, c2=A2*x+(b+k2)*y;
  const ca=k1?`(${poly([1,'a'],[k1,''])})`:'a', cb=k2?`(${poly([1,'b'],[k2,''])})`:'b';
  return QB({text:`Biết hệ phương trình ${td(sys(`${ca}x ${sg(B1)} ${cf(B1)}y = ${c1}`,`${poly([A2,X])} + ${cb}y = ${c2}`))} có nghiệm ${tm(pr(x,y))}. Tìm ${tm('a')} và ${tm('b')}.`,
    tpl:`<span class="eq">${tm('a =')} [_]${tm(';\\quad b =')} [_]</span>`, ans:[a,b],
    hint:`Thay ${tm('x, y')} vào từng phương trình: PT thứ nhất cho ta ${tm('a')}, PT thứ hai cho ta ${tm('b')}.`,
    sol:`PT thứ nhất: ${tm(`${ca}\\cdot${par(x)} = ${minus(c1,B1*y)} = ${c1-B1*y}${k1?`${RA}${poly([1,'a'],[k1,''])} = ${a+k1}`:''}`)}, nên ${tb(`a = ${a}`)}.<br>PT thứ hai: ${tm(`${cb}\\cdot${par(y)} = ${minus(c2,A2*x)} = ${c2-A2*x}${k2?`${RA}${poly([1,'b'],[k2,''])} = ${b+k2}`:''}`)}, nên ${tb(`b = ${b}`)}.`});
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
    sol=`Từ (1): ${tm(`x = ${ex}`)}. Thế vào (2): ${tm(`${mulStr(a2)}(${ex}) ${sg(b2)} ${poly([Math.abs(b2),Y])} = ${c2}${EQ}${poly([B,Y])} = ${c2-a2*c1}${EQ}y = ${y}`)}. Suy ra ${tm(`x = ${x}`)}. Nghiệm của hệ: ${tb(pr(x,y))}.`;
  } else {    // rút y = k·x + m
    const k=-a1*b1, m=c1*b1, ey=poly([k,X],[m,'']), A=a2+b2*k;
    e1=lv===1?`y = ${ey}`:eq2(a1,b1,c1);
    sol=`${lv===1?'(1) cho':'Từ (1):'} ${tm(`y = ${ey}`)}. Thế vào (2): ${tm(`${poly([a2,X])} ${sg(b2)} ${cf(b2)}(${ey}) = ${c2}${EQ}${poly([A,X])} = ${c2-b2*m}${EQ}x = ${x}`)}. Suy ra ${tm(`y = ${y}`)}. Nghiệm của hệ: ${tb(pr(x,y))}.`;
  }
  return QB({text:`Giải hệ phương trình bằng <b>phương pháp thế</b>: ${td(sys(e1,eq2(a2,b2,c2),true))}`, tpl:ANS2, ans:[x,y],
    hint:lv===2?`Từ (1) rút ${tm('x')} theo ${tm('y')}, thế vào (2) để được phương trình một ẩn ${tm('y')}.`:`Từ (1) rút ${tm('y')} theo ${tm('x')}, thế vào (2) để được phương trình một ẩn ${tm('x')}.`, sol});
};
const g2b = lv => {   // phương pháp cộng đại số
  let x,y,a1,b1,a2,b2,elimY=Math.random()<.5; const r=lv===3?7:5;
  do{ x=R(-6,6); y=R(-6,6); a1=sR(1,r); b1=sR(1,r);
    if(lv===1){ if(elimY){b2=-b1;a2=sR(1,r)}else{a2=-a1;b2=sR(1,r)} }
    else if(lv===2){ if(elimY){b2=b1;a2=sR(1,r)}else{a2=a1;b2=sR(1,r)} }
    else { a2=sR(2,r); b2=sR(2,r); a1=sR(2,r); b1=sR(2,r); elimY=false; }
  }while(det(a1,b1,a2,b2)===0 || (lv===3 && Math.abs(a1)===Math.abs(a2)));
  const c1=a1*x+b1*y, c2=a2*x+b2*y; let sol;
  const back = v => v==='x' ? `Thay ${tm(`x = ${x}`)} vào (1): ${tm(`${poly([b1,Y])} = ${minus(c1,a1*x)}${RA}y = ${y}`)}.`
                           : `Thay ${tm(`y = ${y}`)} vào (1): ${tm(`${poly([a1,X])} = ${minus(c1,b1*y)}${RA}x = ${x}`)}.`;
  if(lv<3){ const add=lv===1, s=add?1:-1;
    sol = elimY
      ? `${add?'Cộng':'Trừ'} vế theo vế hai phương trình: ${tm(`${poly([a1+s*a2,X])} = ${c1+s*c2}${RA}x = ${x}`)}. ${back('x')}`
      : `${add?'Cộng':'Trừ'} vế theo vế hai phương trình: ${tm(`${poly([b1+s*b2,Y])} = ${c1+s*c2}${RA}y = ${y}`)}. ${back('y')}`;
  } else { const L=lcm(Math.abs(a1),Math.abs(a2)), k1=L/a1, k2=L/a2;
    sol=`Nhân hai vế của (1) với ${tm(k1)} và (2) với ${tm(k2)}: ${td(sys(eq2(L,k1*b1,k1*c1),eq2(L,k2*b2,k2*c2)))}Trừ vế theo vế: ${tm(`${poly([k1*b1-k2*b2,Y])} = ${k1*c1-k2*c2}${RA}y = ${y}`)}. ${back('y')}`; }
  return QB({text:`Giải hệ phương trình bằng <b>phương pháp cộng đại số</b>: ${td(sys(eq2(a1,b1,c1),eq2(a2,b2,c2),true))}`, tpl:ANS2, ans:[x,y],
    hint:lv===1?'Hai phương trình có một ẩn với hệ số đối nhau: cộng vế theo vế để khử ẩn đó.':lv===2?'Hai phương trình có một ẩn với hệ số bằng nhau: trừ vế theo vế để khử ẩn đó.':`Nhân mỗi phương trình với một số thích hợp để hệ số của ${tm('x')} bằng nhau, rồi trừ vế theo vế.`,
    sol:sol+` Nghiệm của hệ: ${tb(pr(x,y))}.`});
};
const g2c = lv => {   // số nghiệm của hệ
  const kind=pick(['one','none','many']); let a1,b1,c1,a2,b2,c2,sol;
  if(kind==='one'){ let x,y; do{ [a1,b1,a2,b2]=pickSys(2); x=R(-5,5); y=R(-5,5); c1=a1*x+b1*y; c2=a2*x+b2*y }while(!c1||!c2);
    sol=`Hai phương trình không tỉ lệ với nhau; giải hệ (thế hoặc cộng đại số) được đúng một nghiệm ${tm(pr(x,y))}. Hệ <b>có nghiệm duy nhất</b>.`;
  } else { let p,q,m1,m2,r1,r2;
    do{ p=sR(1,5); q=sR(1,5); m1=lv===1?1:sR(1,3); m2=sR(2,4); r1=sR(1,6) }while(gcd(p,q)!==1||m1===m2);
    r2=kind==='many'?r1:r1+sR(1,3); a1=m1*p; b1=m1*q; c1=m1*r1; a2=m2*p; b2=m2*q; c2=m2*r2;
    const L=lcm(Math.abs(m1),Math.abs(m2)), k1=L/m1, k2=L/m2, d=L*(r1-r2);
    sol=`${k1===1?'Giữ (1)':`Nhân hai vế của (1) với ${tm(k1)}`}, ${k2===1?'giữ (2)':`nhân hai vế của (2) với ${tm(k2)}`}: ${td(sys(eq2(L*p,L*q,L*r1),eq2(L*p,L*q,L*r2)))}Trừ vế theo vế: ${tm(`0x + 0y = ${d}`)}. `+
      (d===0?`Đẳng thức đúng với mọi ${tm('x, y')} (hai phương trình thực chất là một). Hệ <b>vô số nghiệm</b>.`:`Không có ${tm('x, y')} nào thoả mãn. Hệ <b>vô nghiệm</b>.`);
  }
  const e1=lv===3?`${poly([a1,X])} = ${poly([-b1,Y],[c1,''])}`:eq2(a1,b1,c1);
  const ans={one:'Có nghiệm duy nhất',none:'Vô nghiệm',many:'Vô số nghiệm'}[kind];
  return QC({text:`Hệ phương trình sau có bao nhiêu nghiệm? ${td(sys(e1,eq2(a2,b2,c2),true))}`,
    opts:['Có nghiệm duy nhất','Vô nghiệm','Vô số nghiệm'], ans, keepOrder:true,
    hint:`Thử khử một ẩn. Nếu cả hai ẩn cùng mất và còn lại ${tm('0 = 0')} thì hệ vô số nghiệm; còn lại ${tm('0 =')} số khác 0 thì hệ vô nghiệm; nếu tìm được giá trị cụ thể thì hệ có nghiệm duy nhất.`+(lv===3?` Nhớ chuyển (1) về dạng ${PT2} trước.`:''),
    sol:(lv===3?`${tm(`(1)${EQ}${eq2(a1,b1,c1)}`)}. `:'')+sol});
};
const g2d = lv => {   // tìm hệ số
  const AB = `<span class="eq">${tm('a =')} [_]${tm(';\\quad b =')} [_]</span>`;
  if(lv<3){ let a,b,x1,x2; do{ a=sR(1,5); b=R(-6,6); x1=lv===1?0:R(-4,4); x2=R(-4,4) }while(x1===x2||(lv===2&&(x1===0||x2===0)));
    const y1=a*x1+b, y2=a*x2+b;
    return QB({text:`Tìm ${tm('a, b')} để đồ thị hàm số ${tm('y = ax + b')} đi qua hai điểm ${tm(`A${pr(x1,y1)}`)} và ${tm(`B${pr(x2,y2)}`)}.`,
      tpl:AB, ans:[a,b],
      hint:`Thay toạ độ mỗi điểm vào ${tm('y = ax + b')}, được hệ hai phương trình ẩn ${tm('a, b')}. Trừ vế theo vế để khử ${tm('b')}.`,
      sol:`Ta có hệ ${td(sys(`${poly([x1,'a'],[1,'b'])} = ${y1}`,`${poly([x2,'a'],[1,'b'])} = ${y2}`))}Trừ vế theo vế: ${tm(`${poly([x1-x2,'a'])} = ${y1-y2}`)}, nên ${tb(`a = ${a}`)}; ${x1===0?'':tm(`b = ${minus(y1,a*x1)}`)+', '}${tb(`b = ${b}`)}.`});
  }
  const a=sR(1,5), b=sR(1,5), x=sR(1,4), y=sR(1,4), c1=a*x+b*y, c2=b*x-a*y;
  return QB({text:`Biết hệ phương trình ${td(sys(`ax + by = ${c1}`,`bx - ay = ${c2}`))} có nghiệm ${tm(pr(x,y))}. Tìm ${tm('a, b')}.`,
    tpl:AB, ans:[a,b],
    hint:`Thay ${tm('x, y')} vào cả hai phương trình, được một hệ mới với hai ẩn là ${tm('a')} và ${tm('b')}. Giải hệ đó.`,
    sol:`Thay ${tm(`x = ${x},\\ y = ${y}`)}: ${td(sys(`${poly([x,'a'],[y,'b'])} = ${c1}`,`${poly([-y,'a'],[x,'b'])} = ${c2}`))}Giải hệ (ẩn ${tm('a, b')}) được ${tb(`a = ${a}`)}, ${tb(`b = ${b}`)}.`});
};

/* =====================================================================
   BÀI 3. Giải bài toán bằng cách lập hệ phương trình
   Mỗi mẫu trả về: story, let (gọi ẩn), right (hệ đúng – LaTeX), wrong (3 hệ sai),
   tpl/ans (câu hỏi điền số), solve (lời giải).
   ===================================================================== */
const S2 = (e1,e2) => sys(e1,e2);
const P = {
  gaCho(){ const x=R(8,30), y=R(4,20), N=x+y, C=2*x+4*y;
    return {story:`Vừa gà vừa chó có tất cả <b>${N}</b> con, đếm được <b>${C}</b> chân.`, let:`Gọi ${tm('x')} là số gà, ${tm('y')} là số chó (${tm('x, y')} nguyên dương).`,
      right:S2(eq2(1,1,N),eq2(2,4,C)), wrong:[S2(eq2(1,1,N),eq2(4,2,C)),S2(eq2(1,1,C),eq2(2,4,N)),S2(eq2(1,1,N),eq2(1,2,C))],
      ask:'Hỏi có bao nhiêu con gà, bao nhiêu con chó?', tpl:'Gà: [_] con; chó: [_] con', ans:[x,y],
      hint:'Một phương trình cho tổng số con, một phương trình cho tổng số chân (gà 2 chân, chó 4 chân).',
      solve:`Nhân PT thứ nhất với 2 rồi trừ vế theo vế: ${tm(`2y = ${C-2*N}${RA}y = ${y};\\ x = ${N} - ${y} = ${x}`)}. Vậy có <b>${x} con gà</b> và <b>${y} con chó</b>.`}; },
  haiSo(){ const y=R(5,40), k=R(2,6), x=k*y, S=x+y;
    return {story:`Tổng của hai số là <b>${S}</b>. Số lớn gấp <b>${k}</b> lần số bé.`, let:`Gọi ${tm('x')} là số lớn, ${tm('y')} là số bé.`,
      right:S2(eq2(1,1,S),`x = ${k}y`), wrong:[S2(eq2(1,1,S),`y = ${k}x`),S2(eq2(1,-1,S),`x = ${k}y`),S2(eq2(1,1,S),`x = y + ${k}`)],
      ask:'Tìm hai số đó.', tpl:'Số lớn: [_]; số bé: [_]', ans:[x,y],
      hint:'Một phương trình cho tổng, một phương trình cho quan hệ “gấp k lần”: số lớn = k × số bé.',
      solve:`Thế ${tm(`x = ${k}y`)} vào PT thứ nhất: ${tm(`${k+1}y = ${S}${RA}y = ${y};\\ x = ${x}`)}. Vậy số lớn là <b>${x}</b>, số bé là <b>${y}</b>.`}; },
  muaHang(){ const it=pick([['quyển vở','cây bút',[6,8,10,12],[3,4,5,7],'quyển vở và cây bút'],['vé người lớn','vé trẻ em',[40,50,60],[20,25,30],'vé gồm vé người lớn và vé trẻ em'],['kg cam','kg táo',[25,30,35],[40,45,50],'kg cam và táo']]);
    let p,q; do{p=pick(it[2]);q=pick(it[3])}while(p===q);
    const x=R(2,12), y=R(2,12), n=x+y, T=p*x+q*y, nm=pick(NAMES);
    return {story:`${nm} mua tổng cộng <b>${n}</b> ${it[4]}, hết <b>${fmt(T)} nghìn đồng</b>. Giá mỗi ${it[0]} là ${p} nghìn đồng, mỗi ${it[1]} là ${q} nghìn đồng.`,
      let:`Gọi ${tm('x')} là số ${it[0]}, ${tm('y')} là số ${it[1]}.`,
      right:S2(eq2(1,1,n),eq2(p,q,T)), wrong:[S2(eq2(1,1,n),eq2(q,p,T)),S2(eq2(1,1,T),eq2(p,q,n)),S2(eq2(1,-1,n),eq2(p,q,T))],
      ask:`Hỏi ${nm} mua bao nhiêu ${it[0]} và bao nhiêu ${it[1]}?`, tpl:`[_] ${it[0]}; [_] ${it[1]}`, ans:[x,y],
      hint:'Một phương trình cho tổng số lượng, một phương trình cho tổng số tiền (số lượng × đơn giá).',
      solve:`Nhân PT thứ nhất với ${tm(q)} rồi lấy PT thứ hai trừ đi: ${tm(`${poly([p-q,X])} = ${T-q*n}${RA}x = ${x};\\ y = ${n} - ${x} = ${y}`)}. Vậy <b>${x} ${it[0]}</b> và <b>${y} ${it[1]}</b>.`}; },
  xuoiNguoc(){ const v=R(12,30), w=R(1,4), t1=R(2,4), t2=R(2,5), s1=t1*(v+w), s2=t2*(v-w);
    return {story:`Một ca nô xuôi dòng trong <b>${t1} giờ</b> được <b>${s1} km</b> và ngược dòng trong <b>${t2} giờ</b> được <b>${s2} km</b>.`,
      let:`Gọi ${tm('x')} (km/h) là vận tốc ca nô khi nước yên lặng, ${tm('y')} (km/h) là vận tốc dòng nước (${tm('x \\gt y \\gt 0')}).`,
      right:S2(`${t1}(x + y) = ${s1}`,`${t2}(x - y) = ${s2}`),
      wrong:[S2(`${t1}(x - y) = ${s1}`,`${t2}(x + y) = ${s2}`),S2(`${t1}(x + y) = ${s2}`,`${t2}(x - y) = ${s1}`),S2(`x + y = ${s1*t1}`,`x - y = ${s2*t2}`)],
      ask:'Tìm vận tốc của ca nô khi nước yên lặng và vận tốc dòng nước.', tpl:'Ca nô: [_] km/h; dòng nước: [_] km/h', ans:[v,w],
      hint:`Vận tốc xuôi dòng ${tm('= x + y')}; ngược dòng ${tm('= x - y')}. Quãng đường = vận tốc × thời gian.`,
      solve:`Hệ ${tm(`${EQ}${S2(`x + y = ${v+w}`,`x - y = ${v-w}`)}`)}. Cộng vế theo vế: ${tm(`2x = ${2*v}${RA}x = ${v};\\ y = ${w}`)}. Vận tốc ca nô <b>${v} km/h</b>, dòng nước <b>${w} km/h</b>.`}; },
  phanTram(){ let a,b; do{a=pick([10,15,20,25]);b=pick([10,15,20,25])}while(a===b);
    const x=20*R(5,20), y=20*R(5,20), N=x+y, E=a*x/100+b*y/100, Mx=N+E, d=tdec;
    return {story:`Theo kế hoạch, hai tổ phải sản xuất <b>${N}</b> sản phẩm. Thực tế tổ I vượt mức <b>${a}%</b>, tổ II vượt mức <b>${b}%</b> nên cả hai tổ làm được <b>${Mx}</b> sản phẩm.`,
      let:`Gọi ${tm('x, y')} lần lượt là số sản phẩm tổ I, tổ II phải làm theo kế hoạch.`,
      right:S2(eq2(1,1,N),`${d(1+a/100)}x + ${d(1+b/100)}y = ${Mx}`),
      wrong:[S2(eq2(1,1,N),`${d(a/100)}x + ${d(b/100)}y = ${Mx}`),S2(eq2(1,1,Mx),`${d(1+a/100)}x + ${d(1+b/100)}y = ${N}`),S2(eq2(1,1,N),`${d(1+b/100)}x + ${d(1+a/100)}y = ${Mx}`)],
      ask:'Hỏi theo kế hoạch mỗi tổ phải làm bao nhiêu sản phẩm?', tpl:'Tổ I: [_] sản phẩm; tổ II: [_] sản phẩm', ans:[x,y],
      hint:`Vượt mức ${a}% nghĩa là làm được (100% + ${a}%) = ${tm(d(1+a/100))} lần kế hoạch.`,
      solve:`Lấy PT thứ hai trừ PT thứ nhất: ${tm(`${d(a/100)}x + ${d(b/100)}y = ${E}`)}. Kết hợp ${tm(`x + y = ${N}`)} giải được ${tm(`x = ${x},\\ y = ${y}`)}. Vậy tổ I: <b>${x}</b>, tổ II: <b>${y}</b> sản phẩm.`}; },
};
const POOL = {1:['gaCho','haiSo'], 2:['muaHang','gaCho','haiSo'], 3:['xuoiNguoc','phanTram']};
const g3a = lv => { const t=P[pick(POOL[lv])]();
  return QC({text:`${t.story} ${t.let}<br>Hệ phương trình nào mô tả đúng bài toán?`, opts:[t.right,...t.wrong].map(tm), ans:tm(t.right), hint:t.hint,
    sol:`${t.let} ${t.hint} Hệ đúng là ${tb(t.right)}.`});
};
const g3b = lv => { const t=P[pick(POOL[lv])]();
  return QB({text:`${t.story} ${t.ask}`, tpl:t.tpl, ans:t.ans, hint:t.hint+' Gọi hai ẩn, lập hệ rồi giải.',
    sol:`${t.let} Ta có hệ ${td(t.right)}${t.solve}`});
};
const g3c = lv => {
  const k=lv===1?'hcn1':lv===2?pick(['hcn2','tuoi']):pick(['so2','hcn3','tuoi']);
  if(k.startsWith('hcn')){ let x,y; do{x=R(8,30);y=R(3,x-1)}while(x===y);
    const Pc=2*(x+y), d=x-y, H=S2(`x + y = ${x+y}`,`x - y = ${d}`);
    if(k==='hcn1') return QB({text:`Một mảnh vườn hình chữ nhật có chu vi <b>${Pc} m</b>, chiều dài hơn chiều rộng <b>${d} m</b>. Tính chiều dài và chiều rộng.`,
      tpl:'Dài: [_] m; rộng: [_] m', ans:[x,y], hint:`Gọi ${tm('x')} là chiều dài, ${tm('y')} là chiều rộng. Nửa chu vi ${tm('= x + y')}; hiệu ${tm('= x - y')}.`,
      sol:`Ta có hệ ${tm(`${H}${RA}x = ${x},\\ y = ${y}`)}. Chiều dài <b>${x} m</b>, chiều rộng <b>${y} m</b>.`});
    if(k==='hcn2') return QB({text:`Một mảnh vườn hình chữ nhật có chu vi <b>${Pc} m</b>, chiều dài hơn chiều rộng <b>${d} m</b>. Tính diện tích mảnh vườn.`,
      tpl:'[_] m²', ans:[x*y], wide:true, hint:'Lập hệ tìm chiều dài và chiều rộng trước, rồi mới tính diện tích.',
      sol:`Gọi ${tm('x, y')} là chiều dài, chiều rộng: ${tm(`${H}${RA}x = ${x},\\ y = ${y}`)}. Diện tích: ${tm(`${x}\\cdot ${y} = ${x*y}`)}, tức là <b>${fmt(x*y)} m²</b>.`});
    const i=R(1,4), j=R(1,3), D=-j*x+i*y-i*j; if(D===0) return g3c(lv);
    return QB({text:`Một mảnh vườn hình chữ nhật có chu vi <b>${Pc} m</b>. Nếu tăng chiều dài thêm ${i} m và giảm chiều rộng đi ${j} m thì diện tích ${D>0?'tăng':'giảm'} <b>${Math.abs(D)} m²</b>. Tính diện tích ban đầu của mảnh vườn.`,
      tpl:'[_] m²', ans:[x*y], wide:true, hint:`Gọi ${tm('x, y')} là chiều dài, chiều rộng. Viết ${tm('(x + i)(y - j) = xy \\pm D')} rồi khai triển: các hạng tử ${tm('xy')} triệt tiêu.`,
      sol:`Ta có ${tm(`x + y = ${x+y}`)} và ${tm(`(x + ${i})(y - ${j}) = xy ${D>0?'+':'-'} ${Math.abs(D)}${EQ}${poly([-j,X],[i,Y])} = ${D+i*j}`)}. Giải hệ được ${tm(`x = ${x},\\ y = ${y}`)}. Diện tích: <b>${fmt(x*y)} m²</b>.`});
  }
  if(k==='tuoi'){ let C,kk,n,Mm; do{C=R(5,15);kk=R(2,3);n=R(3,10);Mm=kk*(C+n)-n}while(Mm-C<20||Mm>55);
    return QB({text:`Hiện nay tổng số tuổi của mẹ và con là <b>${Mm+C}</b>. Sau <b>${n}</b> năm nữa, tuổi mẹ gấp <b>${kk}</b> lần tuổi con. Tính tuổi mỗi người hiện nay.`,
      tpl:'Mẹ: [_] tuổi; con: [_] tuổi', ans:[Mm,C], hint:`Gọi ${tm('x, y')} là tuổi mẹ, tuổi con hiện nay. Sau ${n} năm, mỗi người thêm ${n} tuổi.`,
      sol:`Ta có hệ ${td(`${S2(`x + y = ${Mm+C}`,`x + ${n} = ${kk}(y + ${n})`)}${EQ}${S2(`x + y = ${Mm+C}`,`x - ${kk}y = ${kk*n-n}`)}`)}Giải được ${tm(`y = ${C},\\ x = ${Mm}`)}. Mẹ <b>${Mm} tuổi</b>, con <b>${C} tuổi</b>.`});
  }
  let a,b; do{a=R(1,9);b=R(1,9)}while(a===b);
  const n=10*a+b, m=10*b+a, D=Math.abs(m-n);
  return QB({text:`Tìm số tự nhiên có hai chữ số, biết tổng hai chữ số của nó bằng <b>${a+b}</b> và nếu đổi chỗ hai chữ số thì được số mới ${m>n?'lớn':'nhỏ'} hơn số ban đầu <b>${D}</b> đơn vị.`,
    tpl:'Số cần tìm: [_]', ans:[n], hint:`Gọi chữ số hàng chục là ${tm('x')}, hàng đơn vị là ${tm('y')}: số đó bằng ${tm('10x + y')}, số đổi chỗ là ${tm('10y + x')}.`,
    sol:`Ta có hệ ${td(`${S2(`x + y = ${a+b}`,m>n?`(10y + x) - (10x + y) = ${D}`:`(10x + y) - (10y + x) = ${D}`)}${EQ}${S2(`x + y = ${a+b}`,m>n?`y - x = ${D/9}`:`x - y = ${D/9}`)}`)}Giải được ${tm(`x = ${a},\\ y = ${b}`)}. Số cần tìm là <b>${n}</b>.`});
};

lesson(1,'khai-niem-he','Bài 1. Khái niệm phương trình và hệ hai phương trình bậc nhất hai ẩn','Nhận biết PT bậc nhất hai ẩn; kiểm tra nghiệm của PT và của hệ; tìm tham số.',[g1a,g1b,g1c,g1d,g1e]);
lesson(1,'giai-he','Bài 2. Giải hệ hai phương trình bậc nhất hai ẩn','Phương pháp thế, phương pháp cộng đại số; số nghiệm của hệ; tìm hệ số a, b.',[g2a,g2b,g2c,g2d]);
lesson(1,'lap-he','Bài 3. Giải bài toán bằng cách lập hệ phương trình','Chọn hệ đúng cho bài toán; giải các bài toán thực tế bằng hệ phương trình.',[g3a,g3b,g3c]);
lesson(1,'on-tap-c1','Ôn tập chương I','Tổng hợp: nghiệm của PT, giải hệ, số nghiệm và bài toán lập hệ.',[g1d,g2a,g2b,g2c,g3b,g3c]);

/* =====================================================================
   CHƯƠNG II – BÀI 4. Phương trình quy về phương trình bậc nhất một ẩn
   ===================================================================== */
const TPL2 = `<span class="eq">Nghiệm nhỏ: ${tm('x =')} [_]</span><br><span class="eq">Nghiệm lớn: ${tm('x =')} [_]</span>`;
const g4a = lv => {   // phương trình tích
  let r1,r2,pt,sol;
  if(lv<3){ do{r1=R(-8,8);r2=R(-8,8)}while(r1===r2);
    const p=lv===1?1:R(2,5), f1=fac(p,-p*r1), f2=fac(1,-r2), [A,B]=r1===0?[f1,f2]:r2===0?[f2,f1]:[f1,f2];
    pt=`${A}${B} = 0`;
    sol=tm(`${pt}${EQ}${poly([p,X],[-p*r1,''])} = 0 \\text{ hoặc } ${poly([1,X],[-r2,''])} = 0${EQ}x = ${r1} \\text{ hoặc } x = ${r2}`)+'.';
  } else { const k=pick(['xx','chung','hdt']);
    if(k==='xx'){ r1=0; r2=sR(1,9); pt=`x^2 = ${poly([r2,X])}`;
      sol=tm(`${pt}${EQ}${poly([1,X2],[-r2,X])} = 0${EQ}x${fac(1,-r2)} = 0${EQ}x = 0 \\text{ hoặc } x = ${r2}`)+'.'; }
    else if(k==='chung'){ let a,b,c; do{a=R(-6,6);b=R(-6,6);c=sR(1,5)}while(c-b===a||b===0||a===-b); r1=a; r2=c-b;
      pt=`${fac(1,-a)}${fac(1,b)} = ${mulStr(c)}${fac(1,-a)}`;
      sol=td(`\\begin{aligned}&${pt}\\\\${EQ}&${fac(1,-a)}${fac(1,b)} ${c<0?'+':'-'} ${cf(c)}${fac(1,-a)} = 0\\\\${EQ}&${fac(1,-a)}${fac(1,b-c)} = 0${EQ}x = ${a} \\text{ hoặc } x = ${c-b}\\end{aligned}`)+`<i>Chú ý: không chia hai vế cho ${tm(fac(1,-a))} vì sẽ mất nghiệm.</i><br>`; }
    else { const t=R(1,9); r1=-t; r2=t; pt=`${poly([1,X2],[-t*t,''])} = 0`;
      sol=tm(`${pt}${EQ}${fac(1,-t)}${fac(1,t)} = 0`)+` (hằng đẳng thức ${tm('a^2-b^2')}) ${tm(`${EQ}x = ${t} \\text{ hoặc } x = -${t}`)}.`; }
  }
  const lo=Math.min(r1,r2), hi=Math.max(r1,r2);
  return QB({text:`Giải phương trình ${td(pt)}`, tpl:TPL2, ans:[lo,hi],
    hint:lv<3?'Tích bằng 0 khi một trong các thừa số bằng 0. Cho từng thừa số bằng 0 rồi giải.':'Chuyển hết sang vế trái, đặt nhân tử chung (hoặc dùng hằng đẳng thức) để đưa về phương trình tích.',
    sol:`${sol} Nghiệm nhỏ ${tb(lo)}, nghiệm lớn ${tb(hi)}.`});
};
const ne = v => `x \\ne ${v}`;
const g4b = lv => {   // điều kiện xác định
  let pt, good, opts;
  const both = (u,v) => `${ne(u)} \\text{ và } ${ne(v)}`;
  if(lv===1){ let p,a; do{p=sR(1,9);a=sR(1,9)}while(Math.abs(a)===Math.abs(p));
    pt=`${tf(poly([1,X],[a,'']),poly([1,X],[-p,'']))} = ${sR(1,5)}`; good=ne(p); opts=[good,ne(-p),ne(a),ne(-a)];
  } else if(lv===2){ let p,q; do{p=R(1,9);q=R(1,9)}while(p===q);
    const u=sR(1,5); pt=`${u<0?'-':''}${tf(Math.abs(u),poly([1,X],[-p,'']))} + ${tf(R(1,5),poly([1,X],[q,'']))} = ${-R(1,4)}`;
    good=both(p,-q); opts=[good,both(-p,q),both(p,q),both(-p,-q)];
  } else { const p=sR(1,6), k=R(2,5);
    pt=`${tf(poly([1,X],[R(1,5),'']),poly([k,X],[-k*p,'']))} - ${tf(R(1,4),'x')} = ${tf(1,`x(${poly([1,X],[-p,''])})`)}`;
    good=both(p,0); opts=[good,both(k*p,0),both(-p,0),ne(p)];
  }
  return QC({text:`Điều kiện xác định của phương trình ${td(pt)} là`, opts:opts.map(tm), ans:tm(good),
    hint:`Điều kiện xác định: <b>mọi mẫu thức</b> phải khác 0. Cho từng mẫu khác 0 rồi tìm ${tm('x')}.`,
    sol:`Các mẫu phải khác 0 nên ĐKXĐ là ${tb(good)}.`});
};
const g4c = lv => {   // giải phương trình chứa ẩn ở mẫu
  if(lv===1){ let x0,b,c,a; do{x0=R(-8,8);b=R(-6,6);c=pick([-3,-2,-1,2,3,4]);a=c*(x0-b)-x0}while(b===x0||a===0||b===0);
    return QB({text:`Giải phương trình ${td(`${tf(poly([1,X],[a,'']),poly([1,X],[-b,'']))} = ${c}`)}`, tpl:blank('x'), ans:[x0],
      hint:'Tìm ĐKXĐ, nhân hai vế với mẫu để khử mẫu, giải phương trình bậc nhất rồi đối chiếu điều kiện.',
      sol:`ĐKXĐ: ${tm(ne(b))}. Khử mẫu: ${tm(`${poly([1,X],[a,''])} = ${mulStr(c)}${fac(1,-b)}${EQ}${poly([1-c,X])} = ${-c*b-a}${EQ}x = ${x0}`)} (thoả mãn ĐKXĐ). Nghiệm: ${tb(`x = ${x0}`)}.`});
  }
  if(lv===2){ let x0,p,q; do{x0=R(-4,8);p=x0-R(1,6);q=x0-R(1,6)}while(p===q||p===0||q===0);
    const A=x0-p, B=x0-q;
    return QB({text:`Giải phương trình ${td(`${tf(A,poly([1,X],[-p,'']))} = ${tf(B,poly([1,X],[-q,'']))}`)}`, tpl:blank('x'), ans:[x0],
      hint:'ĐKXĐ: hai mẫu khác 0. Nhân chéo (hoặc quy đồng) để khử mẫu, giải rồi đối chiếu điều kiện.',
      sol:`ĐKXĐ: ${tm(`${ne(p)},\\ ${ne(q)}`)}. Khử mẫu: ${tm(`${mulStr(A)}${fac(1,-q)} = ${mulStr(B)}${fac(1,-p)}${EQ}${poly([A-B,X])} = ${A*q-B*p}${EQ}x = ${x0}`)} (thoả mãn). Nghiệm: ${tb(`x = ${x0}`)}.`});
  }
  let a,r,e,Q,p,T; do{a=sR(1,5);r=R(-6,6);e=pick([0,a]);Q=R(1,4);p=Q-e-r;T=Q*a-e*r}while(r===0||r===a||T===0);
  const den2=`x(${poly([1,X],[-a,''])})`;
  return QB({text:`Giải phương trình ${td(`${tf(poly([1,X],[p,'']),poly([1,X],[-a,'']))} - ${tf(Q,'x')} = ${T<0?'-':''}${tf(Math.abs(T),den2)}`)}`, tpl:blank('x'), ans:[r],
    hint:`Tìm ĐKXĐ (mọi mẫu khác 0). Quy đồng với mẫu chung ${tm(den2)}, khử mẫu, đưa về phương trình tích. Nhớ loại giá trị không thoả mãn ĐKXĐ.`,
    sol:`ĐKXĐ: ${tm(`x \\ne 0,\\ ${ne(a)}`)}. Quy đồng và khử mẫu: ${td(`\\begin{aligned}&${p===0?X2:'x'+fac(1,p)} - ${mulStr(Q)}${fac(1,-a)} = ${T}\\\\${EQ}&${poly([1,X2],[p-Q,X],[Q*a-T,''])} = 0\\\\${EQ}&${e===0?'x':fac(1,-e)}${fac(1,-r)} = 0\\end{aligned}`)}${tm(`x = ${e}`)} (loại vì không thoả mãn ĐKXĐ) hoặc ${tm(`x = ${r}`)} (nhận). Nghiệm: ${tb(`x = ${r}`)}.`});
};

/* =====================================================================
   BÀI 5. Bất đẳng thức và tính chất
   ===================================================================== */
const g5a = lv => {   // diễn đạt bằng lời
  const OPL=['≥','≤','>','<'];
  if(lv===1){ const v=pick(['a','x','m','b']), n=R(-9,15), [w,op]=pick([['không nhỏ hơn','≥'],['không lớn hơn','≤'],['nhỏ hơn','<'],['lớn hơn','>'],['không vượt quá','≤'],['không bé hơn','≥']]);
    const S=o=>tm(`${v} ${op_(o)} ${n}`);
    return QC({text:`Khẳng định “${tm(v)} ${w} ${tm(n)}” được viết là:`, opts:OPL.map(S), ans:S(op),
      hint:`“không nhỏ hơn” nghĩa là lớn hơn hoặc bằng (${tm('\\ge')}); “không lớn hơn”, “không vượt quá” nghĩa là nhỏ hơn hoặc bằng (${tm('\\le')}).`,
      sol:`“${w}” ứng với dấu ${tm(op_(op))}: ${tb(`${v} ${op_(op)} ${n}`)}.`});
  }
  if(lv===2){ const c=pick([
      ()=>{const n=pick([40,50,60,80]);return [`Biển báo giới hạn tốc độ <b>tối đa</b> ${n} km/h. Gọi ${tm('v')} (km/h) là tốc độ cho phép của xe.`,'v','≤',n]},
      ()=>{const n=pick([450,630,750,1000]);return [`Một thang máy chở được <b>tối đa</b> ${n} kg. Gọi ${tm('m')} (kg) là khối lượng được phép chở.`,'m','≤',n]},
      ()=>{const n=pick([20,25,30]);return [`Để vào vòng trong, đội cần ghi được <b>ít nhất</b> ${n} điểm. Gọi ${tm('s')} là số điểm đội cần có.`,'s','≥',n]},
      ()=>{const n=pick([4,5,8]);return [`Sữa chua cần bảo quản ở nhiệt độ <b>dưới</b> ${n} °C. Gọi ${tm('t')} (°C) là nhiệt độ bảo quản.`,'t','<',n]},
      ()=>{const n=pick([120,130,140]);return [`Trò chơi chỉ dành cho người cao <b>trên</b> ${n} cm. Gọi ${tm('h')} (cm) là chiều cao người chơi.`,'h','>',n]},
      ()=>{const n=pick([35,40,45]);return [`Mỗi lớp học có <b>không quá</b> ${n} học sinh. Gọi ${tm('n')} là số học sinh của một lớp.`,'n','≤',n]},
      ()=>{const n=pick([20,30,45]);return [`Mỗi ngày em đọc sách <b>không ít hơn</b> ${n} phút. Gọi ${tm('t')} là số phút đọc sách.`,'t','≥',n]},
    ])(); const [txt,v,op,n]=c, S=o=>tm(`${v} ${op_(o)} ${n}`);
    return QC({text:`${txt} Bất đẳng thức nào diễn tả đúng?`, opts:OPL.map(S), ans:S(op),
      hint:`“tối đa, không quá” → ${tm('\\le')}; “ít nhất, không ít hơn” → ${tm('\\ge')}; “dưới” → ${tm('\\lt')}; “trên” → ${tm('\\gt')}.`, sol:`Ta viết ${tb(`${v} ${op_(op)} ${n}`)}.`});
  }
  const a=R(2,9), b=R(3,20), k=R(2,5), c=pick([
    [`Tổng của ${tm('x')} và ${a} không nhỏ hơn ${b}`, `x + ${a}`, '≥', String(b)],
    [`Hiệu của ${tm('x')} và ${a} nhỏ hơn ${b}`, `x - ${a}`, '<', String(b)],
    [`${k} lần ${tm('x')} không lớn hơn ${b}`, `${k}x`, '≤', String(b)],
    [`${tm('x')} cộng ${a} thì lớn hơn ${k} lần ${tm('x')}`, `x + ${a}`, '>', `${k}x`],
    [`Bình phương của ${tm('x')} luôn không âm`, X2, '≥', '0'],
  ]); const S=o=>`${c[1]} ${op_(o)} ${c[3]}`;
  return QC({text:`Viết bất đẳng thức diễn tả: “${c[0]}”.`, opts:OPL.map(o=>tm(S(o))), ans:tm(S(c[2])),
    hint:`Viết biểu thức ở mỗi vế trước, rồi chọn dấu: không nhỏ hơn (${tm('\\ge')}), không lớn hơn (${tm('\\le')}), nhỏ hơn (${tm('\\lt')}), lớn hơn (${tm('\\gt')}), không âm (${tm('\\ge 0')}).`,
    sol:`Ta viết ${tb(S(c[2]))}.`});
};
const g5b = lv => {   // so sánh nhờ tính chất
  const rel=pick(['<','>']), s=rel==='<'?-1:1;
  let k=lv===1?1:lv===2?-R(2,6):sR(2,6), c1=sR(1,9), c2=c1;
  if(lv===1&&Math.random()<.5){ k=R(2,6); }
  if(lv===3){ const dir=Math.sign(k*s); c2=c1-dir*R(1,5); } // chênh hằng số cùng chiều → vẫn so sánh được
  const L=poly([k,'a'],[c1,'']), Rr=poly([k,'b'],[c2,'']), sgn=Math.sign(k*s), ansOp=sgn>0?'>':'<';
  const AB=tm(`a ${op_(rel)} b`);
  const step1=k===1?`Vì ${AB} nên cộng ${tm(c1)} vào hai vế, giữ nguyên chiều`:`Vì ${AB} và ${tm(`${k} ${k>0?'\\gt':'\\lt'} 0`)} nên ${tm(`${poly([k,'a'])} ${op_(k>0?rel:FLIP[rel])} ${poly([k,'b'])}`)}${k<0?' (nhân với số âm thì đổi chiều)':''}`;
  const sol = c1===c2 ? `${step1}. Vậy ${tb(`${L} ${op_(ansOp)} ${Rr}`)}.`
    : `${step1}, suy ra ${tm(`${L} ${op_(ansOp)} ${poly([k,'b'],[c1,''])}`)}. Mà ${tm(`${poly([k,'b'],[c1,''])} ${op_(ansOp)} ${Rr}`)} (vì ${tm(`${c1} ${op_(ansOp)} ${c2}`)}). Theo tính chất bắc cầu: ${tb(`${L} ${op_(ansOp)} ${Rr}`)}.`;
  return QCmp(`Cho ${AB}. So sánh hai biểu thức:`, tm(L), tm(Rr), sgn, 0,
    {hint:lv===1?'Cộng cùng một số vào hai vế thì giữ nguyên chiều; nhân với số dương cũng giữ nguyên chiều.':lv===2?'Nhân hai vế với một số âm thì bất đẳng thức <b>đổi chiều</b>.':'So sánh qua một biểu thức trung gian rồi dùng tính chất bắc cầu.', sol});
};
const g5c = lv => {   // khẳng định đúng
  if(lv===3){ const k=sR(2,6), c=sR(1,9), op=pick(['<','>','≤','≥']), d=k>0?op:FLIP[op], S=o=>`a ${op_(o)} b`;
    return QC({text:`Cho ${tm(`${poly([k,'a'],[c,''])} ${op_(op)} ${poly([k,'b'],[c,''])}`)}. Khẳng định nào sau đây đúng?`, opts:['<','>','≤','≥'].map(o=>tm(S(o))), ans:tm(S(d)),
      hint:`Cộng ${tm(-c)} vào hai vế, rồi chia hai vế cho ${tm(k)}. Chia cho số âm thì đổi chiều.`,
      sol:`Cộng ${tm(-c)} vào hai vế: ${tm(`${poly([k,'a'])} ${op_(op)} ${poly([k,'b'])}`)}. Chia hai vế cho ${tm(k)}${k<0?' (số âm, đổi chiều)':''}: ${tb(S(d))}.`}); }
  const rel=pick(['<','>']);
  const mk=()=>{const t=pick(lv===1?['add','sub','mul','mix']:['add','mul','neg','neg','mixneg']);const c=R(1,9);let k=R(2,6);
    if(t==='add')return [`a + ${c}`,`b + ${c}`,rel];
    if(t==='sub')return [`a - ${c}`,`b - ${c}`,rel];
    if(t==='mul')return [`${k}a`,`${k}b`,rel];
    if(t==='mix')return [poly([k,'a'],[-c,'']),poly([k,'b'],[-c,'']),rel];
    if(t==='neg')return [poly([-k,'a']),poly([-k,'b']),FLIP[rel]];
    return [poly([-k,'a'],[c,'']),poly([-k,'b'],[c,'']),FLIP[rel]];};
  const items=[];const seen=new Set();while(items.length<4){const it=mk();if(!seen.has(it[0])){seen.add(it[0]);items.push(it)}}
  const st=(it,right)=>`${it[0]} ${op_(right?it[2]:FLIP[it[2]])} ${it[1]}`;
  const good=st(items[0],true);
  return QC({text:`Cho ${tm(`a ${op_(rel)} b`)}. Khẳng định nào sau đây <b>đúng</b>?`, opts:[good,...items.slice(1).map(it=>st(it,false))].map(tm), ans:tm(good),
    hint:'Cộng/trừ cùng một số hoặc nhân với số dương: giữ chiều. Nhân với số âm: đổi chiều.',
    sol:`Khẳng định đúng: ${tb(good)}. Các khẳng định còn lại đều viết sai chiều.`});
};
const g5d = lv => {   // điền số
  if(lv<3){ const op=pick(['≥','≤']), m=R(-5,6), k=lv===1?R(2,6):-R(2,6), c=R(-9,9), v=k*m+c, op2=k>0?op:FLIP[op];
    return QB({text:`Cho ${tm(`a ${op_(op)} ${m}`)}. Điền số thích hợp vào ô trống:`, tpl:`<span class="eq">${tm(`${poly([k,'a'],[c,''])} ${op_(op2)}`)} [_]</span>`, ans:[v],
      hint:`Nhân hai vế của ${tm(`a ${op_(op)} ${m}`)} với ${tm(k)}${k<0?' (nhớ đổi chiều)':''}, sau đó cộng ${tm(c)} vào hai vế.`,
      sol:`${tm(`a ${op_(op)} ${m}${RA}${poly([k,'a'])} ${op_(op2)} ${k*m}${RA}${poly([k,'a'],[c,''])} ${op_(op2)} ${minus(k*m,-c)} = ${v}`)}. Số cần điền: ${tb(v)}.`}); }
  const op=pick(['≥','≤']), m=R(-3,5), n=R(-3,5), p=R(2,5), q=R(2,5), v=p*m+q*n;
  return QB({text:`Cho ${tm(`a ${op_(op)} ${m}`)} và ${tm(`b ${op_(op)} ${n}`)}. Điền số thích hợp:`, tpl:`<span class="eq">${tm(`${p}a + ${q}b ${op_(op)}`)} [_]</span>`, ans:[v],
    hint:'Nhân mỗi bất đẳng thức với số dương thích hợp, rồi cộng vế theo vế hai bất đẳng thức cùng chiều.',
    sol:`${tm(`${p}a ${op_(op)} ${p*m}`)}; ${tm(`${q}b ${op_(op)} ${q*n}`)}. Cộng vế theo vế: ${tm(`${p}a + ${q}b ${op_(op)} ${v}`)}. Số cần điền: ${tb(v)}.`});
};

/* =====================================================================
   BÀI 6. Bất phương trình bậc nhất một ẩn
   ===================================================================== */
const OP4=['<','>','≤','≥'];
const g6a = lv => {   // nhận biết
  const a=sR(1,7), b=sR(1,9), op=pick(OP4);
  const goods=[`${poly([a,X],[b,''])} ${op_(op)} 0`, `\\tfrac{1}{2}x - ${R(1,5)} \\le 0`, `${poly([-1,X],[R(1,9),''])} \\gt 0`, `${R(2,9)} - ${poly([R(2,5),X])} \\ge 0`, `${poly([R(2,6),X])} \\lt 0`];
  const W=shuffle([
    {s:`0x + ${R(1,9)} \\gt 0`, why:`hệ số của ${tm('x')} bằng 0`},
    {s:`${poly([1,X2],[-R(1,9),''])} \\lt 0`, why:`có ${tm('x^2')} (bậc hai)`},
    {s:`${tf(1,'x')} + ${R(1,5)} \\ge 0`, why:'ẩn nằm ở mẫu'},
    {s:`x + y \\gt ${R(1,5)}`, why:'có hai ẩn'},
  ]);
  const hint=`Bất phương trình bậc nhất một ẩn có dạng ${tm('ax + b \\gt 0')} (hoặc ${tm('\\lt,\\ \\le,\\ \\ge')}) với <b>${tm('a \\ne 0')}</b>.`;
  if(lv<3){ const good=lv===1?goods[0]:pick(goods);
    return QC({text:'Bất phương trình nào sau đây là <b>bất phương trình bậc nhất một ẩn</b>?', opts:[good,...W.slice(0,3).map(w=>w.s)].map(tm), ans:tm(good), hint,
      sol:`${tb(good)} đưa được về dạng ${tm('ax + b \\gt 0')} (hoặc ${tm('\\lt,\\ \\le,\\ \\ge')}) với ${tm('a \\ne 0')}.`}); }
  const w=W[0];
  return QC({text:'Bất phương trình nào sau đây <b>không phải</b> là bất phương trình bậc nhất một ẩn?', opts:[w.s,...shuffle(goods).slice(0,3)].map(tm), ans:tm(w.s), hint,
    sol:`${tb(w.s)} không phải bất phương trình bậc nhất một ẩn vì ${w.why}.`});
};
// Dựng BPT: lhs(x) op rhs(x). Trả về {s (LaTeX), f(x) đúng/sai, op2 (dạng x op2 ngưỡng), th (ngưỡng LaTeX), steps (LaTeX)}
const mkBPT = (lv, fracOK) => {
  let a,b,c,d,op=pick(OP4),t,num,den;
  do{ if(lv===1){a=R(2,6);c=0}else if(lv===2){a=-R(2,6);c=0}else{a=sR(1,7);c=sR(1,7)}
    b=R(-9,9); t=R(-6,6);
    if(fracOK&&lv>1){d=R(-12,12)} else d=(a-c)*t+b;   // (a−c)x op d−b
    num=d-b; den=a-c;
  }while(a===c||num===0);
  const L=poly([a,X],[b,'']), Rr=c?poly([c,X],[d,'']):String(d), A=a-c, op2=A>0?op:FLIP[op], th=frac(num,den);
  const steps=`${c?`${poly([A,X])} ${op_(op)} ${num}`:(b?`${poly([a,X])} ${op_(op)} ${minus(d,b)} = ${num}`:`${poly([a,X])} ${op_(op)} ${d}`)}${EQ}x ${op_(op2)} ${th}`;
  return {s:`${L} ${op_(op)} ${Rr}`, f:x=>TEST(a*x+b,op,c*x+d), op, op2, num, den, th, steps, neg:A<0};
};
const g6b = lv => {   // số nào là nghiệm
  const B=mkBPT(lv,false), t=Math.round(B.num/((B.den)));
  const cand=shuffle([...Array(9)].map((_,i)=>t-4+i)), good=cand.find(B.f), bad=cand.filter(x=>!B.f(x)).slice(0,3);
  return QC({text:`Số nào sau đây là nghiệm của bất phương trình ${td(B.s)}`, opts:[good,...bad].map(v=>tm(v)), ans:tm(good), compact:true,
    hint:'Thay từng số vào hai vế và kiểm tra khẳng định có đúng không. (Hoặc giải bất phương trình trước.)',
    sol:`Giải: ${tm(`${B.s}${EQ}${B.steps}`)}${B.neg?' (chia cho số âm, đổi chiều)':''}. Trong các số đã cho chỉ có ${tb(good)} thoả mãn.`});
};
const g6c = lv => {   // giải BPT – chọn tập nghiệm
  const B=mkBPT(lv,lv===3);
  const S=(o,v)=>`x ${op_(o)} ${v}`, mth=frac(-B.num,B.den);
  const opts=[S(B.op2,B.th),S(FLIP[B.op2],B.th),S(B.op2,mth),S(FLIP[B.op2],mth)];
  return QC({text:`Nghiệm của bất phương trình ${td(B.s)} là`, opts:opts.map(tm), ans:tm(opts[0]),
    hint:`Chuyển các hạng tử chứa ${tm('x')} sang một vế, số sang vế kia (nhớ đổi dấu), rồi chia hai vế cho hệ số của ${tm('x')}. Chia cho số âm phải <b>đổi chiều</b>.`,
    sol:`${tm(`${B.s}${EQ}${B.steps}`)}${B.neg?' (chia cho số âm, đổi chiều)':''}. Vậy nghiệm là ${tb(opts[0])}.`});
};
const g6d = lv => {   // nghiệm nguyên lớn nhất / nhỏ nhất
  let s,f,A,C,op; // dạng k(x − m) + n op px + q
  do{ const k=lv===1?R(2,5):sR(1,5), m=R(-5,5), n=R(-9,9), p=lv===3?sR(1,4):0, q=R(-9,9); op=pick(OP4);
    A=k-p; C=q+k*m-n;
    const nS=n?` ${sg(n)} ${Math.abs(n)}`:'';
    s=lv===1?`${poly([k,X],[-k*m+n,''])} ${op_(op)} ${q}`:`${mulStr(k)}${fac(1,-m)}${nS} ${op_(op)} ${p?poly([p,X],[q,'']):q}`;
    f=x=>TEST(k*(x-m)+n,op,p*x+q);
  }while(A===0||(lv===1&&(C%A!==0))||Math.abs(C/A)>12);
  const op2=A>0?op:FLIP[op], big=op2==='<'||op2==='≤';
  let ans=null; for(let x=-40;x<=40;x++) if(f(x)){ if(big) ans=x; else if(ans===null) ans=x; }
  return QB({text:`Tìm số nguyên ${tm('x')} <b>${big?'lớn nhất':'nhỏ nhất'}</b> thoả mãn ${td(s)}`, tpl:blank('x'), ans:[ans],
    hint:`Giải bất phương trình để được dạng ${tm(`x ${op_(op2)} \\ldots`)}, rồi chọn số nguyên ${big?'lớn nhất':'nhỏ nhất'} thoả mãn. Chú ý dấu ${/[≤≥]/.test(op2)?'có':'không có'} dấu bằng.`,
    sol:`Biến đổi: ${tm(`${poly([A,X])} ${op_(op)} ${C}${EQ}x ${op_(op2)} ${frac(C,A)}`)}${A<0?' (chia cho số âm, đổi chiều)':''}. Số nguyên ${big?'lớn nhất':'nhỏ nhất'} thoả mãn là ${tb(ans)}.`});
};
const g6e = lv => {   // bài toán thực tế
  const nm=pick(NAMES);
  if(lv===1){ if(Math.random()<.5){ const p=pick([15,20,25,30]), q=pick([6,8,9,12]), Mo=pick([100,150,200,250]), ans=Math.floor((Mo-p)/q);
      return QB({text:`${nm} có <b>${Mo} nghìn đồng</b>. ${nm} mua một hộp bút giá ${p} nghìn đồng, số tiền còn lại mua vở giá ${q} nghìn đồng một quyển. ${nm} mua được <b>nhiều nhất</b> bao nhiêu quyển vở?`,
        tpl:'[_] quyển', ans:[ans], hint:`Gọi ${tm('x')} là số quyển vở. Lập bất phương trình: tiền bút + tiền vở ${tm('\\le')} số tiền có. Giải rồi chọn số tự nhiên lớn nhất.`,
        sol:`${tm(`${p} + ${q}x \\le ${Mo}${EQ}x \\le ${frac(Mo-p,q)}`)}. Số tự nhiên lớn nhất là ${tb(ans)} quyển.`}); }
    const W=pick([450,630,750]), m=pick([60,65,70,75]), h=pick([40,45,50,55]), ans=Math.floor((W-m)/h);
    return QB({text:`Một thang máy chở tối đa <b>${W} kg</b>. Một người nặng ${m} kg cần chở các thùng hàng, mỗi thùng nặng ${h} kg. Mỗi chuyến chở được <b>nhiều nhất</b> bao nhiêu thùng hàng (kể cả người đi cùng)?`,
      tpl:'[_] thùng', ans:[ans], hint:`Gọi ${tm('x')} là số thùng. Tổng khối lượng người và hàng phải ${tm('\\le')} tải trọng tối đa.`,
      sol:`${tm(`${m} + ${h}x \\le ${W}${EQ}x \\le ${frac(W-m,h)}`)}. Nhiều nhất ${tb(ans)} thùng.`});
  }
  if(lv===2){ const O=pick([10,12,15]), r=pick([12,14,15,16]), Mo=pick([150,200,250,300]), ans=Math.floor((Mo-O)/r)+1;
    return QB({text:`Giá cước một hãng taxi: km đầu tiên ${O} nghìn đồng, mỗi km tiếp theo ${r} nghìn đồng. ${nm} có <b>${Mo} nghìn đồng</b>. Hỏi ${nm} đi được <b>tối đa</b> bao nhiêu km (số nguyên)?`,
      tpl:'[_] km', ans:[ans], hint:`Gọi ${tm('x')} là số km (${tm('x \\ge 1')}). Số tiền phải trả: km đầu + ${tm('(x - 1)')} km tiếp theo. Lập bất phương trình ${tm('\\le')} số tiền có.`,
      sol:`${tm(`${O} + ${r}(x - 1) \\le ${Mo}${EQ}${r}x \\le ${Mo-O+r}${EQ}x \\le ${frac(Mo-O+r,r)}`)}. Tối đa ${tb(ans)} km.`});
  }
  let a,b,T,need; do{a=R(5,10);b=R(5,10);T=pick([7,7.5,8,8.5]);need=Math.ceil((4*T-a-b)/2)}while(need>10||need<1);
  return QB({text:`Điểm trung bình môn của ${nm} tính theo công thức ${tm('(\\text{bài 1} + \\text{bài 2} + 2\\times\\text{bài 3}) : 4')}. ${nm} đã có bài 1 được <b>${a}</b> điểm, bài 2 được <b>${b}</b> điểm. Bài 3 phải được <b>ít nhất</b> bao nhiêu điểm (số nguyên) để điểm trung bình không dưới ${tm(tdec(T))}?`,
    tpl:'[_] điểm', ans:[need], hint:`Gọi ${tm('x')} là điểm bài 3. Lập bất phương trình ${tm('(a + b + 2x) : 4 \\ge T')} rồi giải, chọn số nguyên nhỏ nhất.`,
    sol:`${tm(`(${a} + ${b} + 2x) : 4 \\ge ${tdec(T)}${EQ}2x \\ge ${tdec(4*T-a-b)}${EQ}x \\ge ${tdec((4*T-a-b)/2)}`)}. Bài 3 cần ít nhất ${tb(need)} điểm.`});
};

const g4d = lv => {   // bài toán công việc: lập phương trình chứa ẩn ở mẫu
  const nm = pick(NAMES), nm2 = pick(NAMES.filter(n => n !== nm));
  const pairs = []; for (let x = 4; x <= 40; x++) for (let y = x; y <= 60; y++) if ((x * y) % (x + y) === 0 && y > x) pairs.push([x, y, x * y / (x + y)]);
  if (lv === 1) {
    const [x, y, T] = pick(pairs.filter(p => p[0] <= 20 && p[1] <= 40));
    return QB({text:`${nm} và ${nm2} cùng làm chung một công việc thì xong trong <b>${T} giờ</b>. Nếu ${nm} làm một mình thì xong trong <b>${x} giờ</b>. Hỏi ${nm2} làm một mình thì xong công việc đó trong bao lâu?`,
      tpl:`${nm2} làm một mình: [_] giờ`, ans:[y],
      hint:`Gọi ${tm('y')} là số giờ ${nm2} làm một mình. Mỗi giờ: ${nm} làm được ${tm('\\dfrac{1}{'+x+'}')} công việc, ${nm2} làm được ${tm('\\dfrac{1}{y}')}; cả hai làm được ${tm('\\dfrac{1}{'+T+'}')}. Lập phương trình rồi giải.`,
      sol:`Mỗi giờ hai người làm được ${tm(`\\dfrac{1}{${T}}`)} công việc, ${nm} làm được ${tm(`\\dfrac{1}{${x}}`)}. ${tm(`\\dfrac{1}{${x}} + \\dfrac{1}{y} = \\dfrac{1}{${T}}`)} (ĐKXĐ ${tm('y \\ne 0')}). ${tm(`\\dfrac{1}{y} = \\dfrac{1}{${T}} - \\dfrac{1}{${x}} = \\dfrac{${x - T}}{${x * T}}`)}${tm(`\\Rightarrow y = ${y}`)} (thoả mãn). ${nm2} làm một mình xong trong ${tb(y)} giờ.`});
  }
  if (lv === 2) {
    const c = []; for (const [x, y, T] of pairs) for (let t = 1; t < T; t++) { const s = y * (T - t) / T; if (Number.isInteger(s) && s > 0) c.push([x, y, T, t, s]); }
    const [x, y, T, t, s] = pick(c.filter(q => q[1] <= 40));
    return QB({text:`${nm} và ${nm2} cùng làm chung một công việc thì xong trong <b>${T} giờ</b>. Hai người cùng làm được <b>${t} giờ</b> thì ${nm} đi làm việc khác; ${nm2} làm tiếp <b>${s} giờ</b> nữa thì xong. Hỏi nếu làm một mình thì ${nm} xong công việc trong bao lâu?`,
      tpl:`${nm} làm một mình: [_] giờ`, ans:[x],
      hint:`Gọi ${tm('x')} là số giờ ${nm} làm một mình. Hai người làm ${t} giờ được ${tm('\\dfrac{'+t+'}{'+T+'}')} công việc; phần còn lại do ${nm2} làm trong ${s} giờ. Tính trước năng suất của ${nm2}, rồi suy ra của ${nm}.`,
      sol:`Phần việc còn lại: ${tm(`1 - \\dfrac{${t}}{${T}} = \\dfrac{${T - t}}{${T}}`)}, ${nm2} làm trong ${s} giờ nên mỗi giờ làm được ${tm(`\\dfrac{${T - t}}{${T}} : ${s} = \\dfrac{1}{${y}}`)}. Mỗi giờ ${nm} làm được ${tm(`\\dfrac{1}{x} = \\dfrac{1}{${T}} - \\dfrac{1}{${y}} = \\dfrac{${y - T}}{${T * y}}`)}${tm(`\\Rightarrow x = ${x}`)} (thoả mãn ĐKXĐ ${tm('x \\ne 0')}). ${nm} làm một mình xong trong ${tb(x)} giờ.`});
  }
  const k = pick([2, 3, 4]), mm = R(2, 6), x = (k + 1) * mm, y = k * x, T = x * k / (k + 1);
  return QB({text:`${nm} và ${nm2} cùng làm chung một công việc thì xong trong <b>${T} giờ</b>. Nếu làm một mình thì ${nm2} cần thời gian <b>gấp ${k} lần</b> ${nm}. Hỏi mỗi người làm một mình xong công việc trong bao lâu?`,
    tpl:`${nm}: [_] giờ<br>${nm2}: [_] giờ`, ans:[x, y],
    hint:`Gọi ${tm('x')} là số giờ ${nm} làm một mình (${tm('x \\gt 0')}); khi đó ${nm2} làm một mình trong ${tm(k+'x')} giờ. Mỗi giờ hai người làm được ${tm('\\dfrac{1}{'+T+'}')} công việc. Lập phương trình chứa ẩn ở mẫu, khử mẫu và giải.`,
    sol:`${nm2} làm một mình trong ${tm(`${k}x`)} giờ. Mỗi giờ: ${tm(`\\dfrac{1}{x} + \\dfrac{1}{${k}x} = \\dfrac{1}{${T}}`)} (ĐKXĐ ${tm('x \\ne 0')}). Quy đồng: ${tm(`\\dfrac{${k + 1}}{${k}x} = \\dfrac{1}{${T}}`)}. Khử mẫu: ${tm(`${T * (k + 1)} = ${k}x${EQ}x = ${x}`)} (thoả mãn ĐKXĐ). Vậy ${nm}: ${tb(x)} giờ; ${nm2}: ${tm(`${k}\\cdot ${x} =`)} ${tb(y)} giờ.`});
};
lesson(2,'pt-quy-ve-bac-nhat','Bài 4. Phương trình quy về phương trình bậc nhất một ẩn','Phương trình tích; điều kiện xác định, giải phương trình chứa ẩn ở mẫu và bài toán công việc.',[g4a,g4b,g4c,g4d]);
lesson(2,'bat-dang-thuc','Bài 5. Bất đẳng thức và tính chất','Diễn đạt bằng lời; tính chất liên hệ với phép cộng, phép nhân; tính chất bắc cầu.',[g5a,g5b,g5c,g5d]);
lesson(2,'bat-phuong-trinh','Bài 6. Bất phương trình bậc nhất một ẩn','Nhận biết, kiểm tra nghiệm, giải BPT; nghiệm nguyên; bài toán thực tế.',[g6a,g6b,g6c,g6d,g6e]);
lesson(2,'on-tap-c2','Ôn tập chương II','Tổng hợp: phương trình tích, chứa ẩn ở mẫu, bất đẳng thức, bất phương trình.',[g4a,g4c,g5b,g6c,g6d,g6e]);

/* =====================================================================
   CHƯƠNG III – BÀI 7. Căn bậc hai và căn thức bậc hai
   ===================================================================== */
const SQF = [2,3,5,6,7,10,11,13,14,15];                 // số không có ước chính phương > 1
const sq = n => `\\sqrt{${n}}`;
const cb = n => `\\sqrt[3]{${n}}`;
const rt = (k,b) => b===1 ? String(k) : k===1 ? sq(b) : k===-1 ? `-${sq(b)}` : `${k}${sq(b)}`;   // k√b
const isSq = n => n>=0 && Number.isInteger(Math.sqrt(n));
const opT = (a,b) => a<b ? '\\lt' : a>b ? '\\gt' : '=';
const eqB = (lhs, unit='') => `<span class="eq">${tm(lhs+' =')} [_]${unit}</span>`;
const R1 = x => Math.round((x+1e-9)*10)/10;              // làm tròn đến hàng phần mười
const ansR = (a,b) => [R1(a)===R1(b) ? R1(a) : [R1(a),R1(b)]];   // chấp nhận cả kết quả bấm máy trực tiếp
const pickBy = (good, pool, n=3) => {                    // chọn n phương án sai có GIÁ TRỊ khác đáp án
  const out=[], seen=new Set([good.s]);
  for(const o of shuffle(pool)) if(out.length<n && !seen.has(o.s) && Math.abs(o.v-good.v)>1e-9){ seen.add(o.s); out.push(o); }
  return out; };

const g7a = lv => {   // căn bậc hai, căn bậc hai số học
  if(lv===1){ const n=R(2,15), N=n*n;
    return QB({text:`Tính ${tm(sq(N))}.`, tpl:eqB(sq(N)), ans:[n],
      hint:`${tm(sq('a'))} là số <b>không âm</b> mà bình phương của nó bằng ${tm('a')}. Tìm số không âm có bình phương bằng ${tm(N)}.`,
      sol:`Vì ${tm(`${n} \\ge 0`)} và ${tm(`${n}^2 = ${N}`)} nên ${tm(sq(N)+' =')} ${tb(n)}.`}); }
  if(lv===2){
    if(Math.random()<.5){ let k; do{k=R(2,19)}while(k===10); const v=k/10, N=+(v*v).toFixed(4);
      return QB({text:`Tính ${tm(sq(tdec(N)))}.`, tpl:eqB(sq(tdec(N))), ans:[v],
        hint:`Tìm số thập phân không âm mà bình phương lên bằng ${tm(tdec(N))}. Chú ý số chữ số sau dấu phẩy.`,
        sol:`Vì ${tm(`${tdec(v)}^2 = ${tdec(N)}`)} nên ${tm(sq(tdec(N))+' =')} ${tb(tdec(v))}.`}); }
    let p,q; do{p=R(1,12);q=R(2,15)}while(gcd(p,q)!==1);
    const e=sq(tf(p*p,q*q));
    return QB({text:`Tính ${tm(e)}.`, tpl:`<span class="eq">${tm(e+' =')} [F]</span>`, ans:[{frac:[p,q],mode:'eq'}],
      hint:`Khai căn tử và mẫu: ${tm('\\sqrt{\\dfrac{a}{b}} = \\dfrac{\\sqrt{a}}{\\sqrt{b}}')} (${tm('a \\ge 0,\\ b \\gt 0')}).`,
      sol:`${tm(`${e} = ${tf(sq(p*p),sq(q*q))} = `)}${tb(tf(p,q))}.`}); }
  const n=R(2,15), N=n*n, all=Math.random()<.5;
  const A=`${n} \\text{ và } {-${n}}`, B=String(n), C=`-${n}`, D=`${sq(n)} \\text{ và } {-${sq(n)}}`;
  return QC({text:all?`Các <b>căn bậc hai</b> của ${tm(N)} là`:`<b>Căn bậc hai số học</b> của ${tm(N)} là`, opts:[A,B,C,D].map(tm), ans:tm(all?A:B), keepOrder:true,
    hint:`Số dương ${tm('a')} có <b>hai</b> căn bậc hai là ${tm(sq('a'))} và ${tm('-'+sq('a'))}. Căn bậc hai số học chỉ là số <b>không âm</b> ${tm(sq('a'))}.`,
    sol:`Vì ${tm(`${n}^2 = (-${n})^2 = ${N}`)} nên ${N} có hai căn bậc hai là ${tm(`${n}`)} và ${tm(`-${n}`)}; căn bậc hai số học của ${N} là ${tm(`${sq(N)} = ${n}`)}. Đáp án: ${tb(all?A:B)}.`});
};
const g7b = lv => {   // so sánh căn bậc hai
  const put = (l,r,vl,vr,hint,why) => { const sw=Math.random()<.5; const [L,Rr,a,b]=sw?[r,l,vr,vl]:[l,r,vl,vr];
    return QCmp('So sánh hai số:', tm(L), tm(Rr), a, b, {hint, sol:`${why(sw)} Vậy ${tb(`${L} ${opT(a,b)} ${Rr}`)}.`}); };
  if(lv===1){ let a,b; do{a=R(2,60);b=R(2,60)}while(a===b);
    return put(sq(a),sq(b),a,b,`Với ${tm('a, b \\ge 0')}: ${tm('a \\lt b \\Leftrightarrow \\sqrt{a} \\lt \\sqrt{b}')}. So sánh hai số dưới dấu căn.`,
      ()=>`Vì ${tm(`${a} ${opT(a,b)} ${b}`)} nên ${tm(`${sq(a)} ${opT(a,b)} ${sq(b)}`)}.`); }
  if(lv===2){ const n=R(2,12); let a; do{a=n*n+sR(1,Math.min(4,n))}while(isSq(a)||a<2);
    return put(String(n),sq(a),n*n,a,`Viết số nguyên dưới dạng căn bậc hai: ${tm('n = \\sqrt{n^2}')} (${tm('n \\ge 0')}), rồi so sánh hai số dưới dấu căn.`,
      ()=>`Ta có ${tm(`${n} = ${sq(n*n)}`)}. Vì ${tm(`${n*n} ${opT(n*n,a)} ${a}`)} nên ${tm(`${n} ${opT(n*n,a)} ${sq(a)}`)}.`); }
  let k; do{k=R(11,39)}while(k%10===0); const v=k/10, V=+(v*v).toFixed(4); let a; do{a=Math.round(V)+pick([-1,0,1])}while(a<2||isSq(a));
  return put(tdec(v),sq(a),V,a,'Hai số đều dương: so sánh bình phương của chúng.',
    ()=>`Ta có ${tm(`${tdec(v)}^2 = ${tdec(V)}`)} và ${tm(`(${sq(a)})^2 = ${a}`)}. Vì ${tm(`${tdec(V)} ${opT(V,a)} ${a}`)} và hai số đều dương nên ${tm(`${tdec(v)} ${opT(V,a)} ${sq(a)}`)}.`);
};
const g7c = lv => {   // điều kiện xác định của căn thức bậc hai
  const S=(o,v)=>`x ${o} ${v}`; let e, good, opts, sol, hint=`${tm('\\sqrt{A}')} xác định khi ${tm('A \\ge 0')}.`;
  if(lv===1){ const a=R(1,4), r=sR(1,9), A=poly([a,X],[-a*r,'']); e=sq(A);
    good=S('\\ge',r); opts=[good,S('\\le',r),S('\\gt',r),S('\\ge',-r)];
    sol=`${tm(e)} xác định khi ${tm(`${A} \\ge 0${EQ}${a===1?'':`${poly([a,X])} \\ge ${a*r}${EQ}`}x \\ge ${r}`)}.`; }
  else if(lv===2){ const a=-R(1,5), b=R(1,12), A=poly([b,''],[a,X]), th=frac(b,-a); e=sq(A);
    good=S('\\le',th); opts=[good,S('\\ge',th),S('\\lt',th),S('\\le',frac(-b,-a))];
    hint+=' Khi chia hai vế cho số âm, nhớ <b>đổi chiều</b>.';
    sol=`${tm(e)} xác định khi ${tm(`${A} \\ge 0${EQ}${poly([a,X])} \\ge ${-b}${EQ}x \\le ${th}`)} (chia cho số âm, đổi chiều).`; }
  else { const a=sR(1,4), r=R(-6,6), c=R(1,9), A=poly([a,X],[-a*r,'']); e=sq(tf(c,A));
    const o=a>0?'\\gt':'\\lt'; good=S(o,r); opts=[S('\\gt',r),S('\\ge',r),S('\\lt',r),S('\\le',r)];
    hint+=` Ngoài ra <b>mẫu phải khác 0</b>. Vì tử ${tm(c)} dương nên phân thức không âm khi mẫu ${tm('\\gt 0')}.`;
    sol=`Cần ${tm(`${tf(c,A)} \\ge 0`)} và mẫu khác 0. Vì ${tm(`${c} \\gt 0`)} nên ${tm(`${A} \\gt 0${EQ}${poly([a,X])} \\gt ${a*r}${EQ}x ${o} ${r}`)}${a<0?' (chia cho số âm, đổi chiều)':''}.`; }
  return QC({text:`Căn thức ${tm(e)} xác định khi`, opts:opts.map(tm), ans:tm(good), hint, sol:sol+` Đáp án: ${tb(good)}.`});
};
const g7d = lv => {   // hằng đẳng thức √(A²) = |A|
  const HD=`${tm('\\sqrt{A^2} = |A|')}: bằng ${tm('A')} nếu ${tm('A \\ge 0')}, bằng ${tm('-A')} nếu ${tm('A \\lt 0')}.`;
  if(lv===1){ if(Math.random()<.5){ const n=R(2,30), e=`\\sqrt{(-${n})^2}`;
      return QB({text:`Tính ${tm(e)}.`, tpl:eqB(e), ans:[n], hint:HD, sol:`${tm(`${e} = |-${n}| = `)}${tb(n)}.`}); }
    let p,q; do{p=R(1,12);q=R(1,15)}while(p>=q); const e=`\\sqrt{(${p} - ${q})^2}`;
    return QB({text:`Tính ${tm(e)}.`, tpl:eqB(e), ans:[q-p], hint:HD, sol:`${tm(`${e} = |${p} - ${q}| = |${p-q}| = `)}${tb(q-p)}.`}); }
  if(lv===2){ const a=R(2,7); let b; do{b=a*a+sR(1,a+2)}while(b<2||isSq(b));
    const e=`\\sqrt{(${a} - ${sq(b)})^2}`, big=a*a>b, good=big?`${a} - ${sq(b)}`:`${sq(b)} - ${a}`;
    return QC({text:`Rút gọn ${tm(e)}.`, opts:[`${a} - ${sq(b)}`,`${sq(b)} - ${a}`,`${a} + ${sq(b)}`,`-${a} - ${sq(b)}`].map(tm), ans:tm(good),
      hint:HD+` Hãy so sánh ${tm(a)} với ${tm(sq(b))} để biết dấu của ${tm(`${a} - ${sq(b)}`)}.`,
      sol:`Ta có ${tm(`${a} = ${sq(a*a)}`)} và ${tm(`${a*a} ${opT(a*a,b)} ${b}`)} nên ${tm(`${a} - ${sq(b)} ${big?'\\gt':'\\lt'} 0`)}. Do đó ${tm(`${e} = |${a} - ${sq(b)}| = `)}${tb(good)}.`}); }
  const k=sR(1,9), lt=Math.random()<.5, e=`\\sqrt{${poly([1,X2],[-2*k,X],[k*k,''])}} + x`;
  const good=lt?String(k):poly([2,X],[-k,'']);
  return QC({text:`Rút gọn biểu thức ${tm(`A = ${e}`)} với ${tm(`x ${lt?'\\lt':'\\ge'} ${k}`)}.`,
    opts:[String(k),poly([2,X],[-k,'']),String(-k),poly([-2,X],[k,''])].map(tm), ans:tm(good),
    hint:`Viết biểu thức dưới dấu căn thành bình phương của một hiệu, rồi dùng ${HD}`,
    sol:`${tm(`${poly([1,X2],[-2*k,X],[k*k,''])} = ${fac(1,-k)}^2`)} nên ${tm(`A = |${poly([1,X],[-k,''])}| + x`)}. Với ${tm(`x ${lt?'\\lt':'\\ge'} ${k}`)}: ${tm(lt?`A = ${poly([-1,X],[k,''])} + x`:`A = ${poly([1,X],[-k,''])} + x`)} ${tm('=')} ${tb(good)}.`});
};

/* =====================================================================
   BÀI 8. Khai căn bậc hai với phép nhân và phép chia
   ===================================================================== */
const g8a = lv => {   // √a·√b = √(ab)
  if(lv<3){ const s=pick(lv===1?[2,3,5]:[3,5,6,7,10,11]), M=lv===1?4:6; let p,q; do{p=R(1,M);q=R(1,M)}while(p===1&&q===1);
    const a=s*p*p, b=s*q*q, e=`${sq(a)}\\cdot${sq(b)}`;
    return QB({text:`Tính ${tm(e)}.`, tpl:eqB(e), ans:[s*p*q],
      hint:`Dùng ${tm('\\sqrt{a}\\cdot\\sqrt{b} = \\sqrt{a\\cdot b}')} (${tm('a, b \\ge 0')}), rồi khai căn số chính phương.`,
      sol:`${tm(`${e} = \\sqrt{${a}\\cdot ${b}} = ${sq(a*b)} = `)}${tb(s*p*q)}.`}); }
  const s=pick([2,3,5,6,7]); let p,q; do{p=R(1,5);q=R(1,5)}while(p===q); const pl=Math.random()<.5, v=s*(pl?p+q:p-q);
  const e=`(${sq(s*p*p)} ${pl?'+':'-'} ${sq(s*q*q)})\\cdot${sq(s)}`;
  return QB({text:`Tính ${tm(e)}.`, tpl:eqB(e), ans:[v],
    hint:`Nhân ${tm(sq(s))} vào từng số hạng trong ngoặc, dùng ${tm('\\sqrt{a}\\cdot\\sqrt{b} = \\sqrt{ab}')}.`,
    sol:`${tm(`${e} = ${sq(s*p*p*s)} ${pl?'+':'-'} ${sq(s*q*q*s)} = ${s*p} ${pl?'+':'-'} ${s*q} = `)}${tb(v)}.`});
};
const g8b = lv => {   // √a : √b = √(a/b)
  if(lv===1){ let b; do{b=R(2,12)}while(isSq(b)); const n=R(2,7), a=b*n*n, e=tf(sq(a),sq(b));
    return QB({text:`Tính ${tm(e)}.`, tpl:eqB(e), ans:[n],
      hint:`Dùng ${tm('\\dfrac{\\sqrt{a}}{\\sqrt{b}} = \\sqrt{\\dfrac{a}{b}}')} (${tm('a \\ge 0,\\ b \\gt 0')}).`,
      sol:`${tm(`${e} = ${sq(tf(a,b))} = ${sq(n*n)} = `)}${tb(n)}.`}); }
  let p,q;
  if(lv===2){ do{p=R(1,15);q=R(2,20)}while(gcd(p,q)!==1);
    const e=sq(tf(p*p,q*q));
    return QB({text:`Tính ${tm(e)}.`, tpl:`<span class="eq">${tm(e+' =')} [F]</span>`, ans:[{frac:[p,q],mode:'eq'}],
      hint:`Khai căn tử và khai căn mẫu: ${tm('\\sqrt{\\dfrac{a}{b}} = \\dfrac{\\sqrt{a}}{\\sqrt{b}}')}.`,
      sol:`${tm(`${e} = ${tf(sq(p*p),sq(q*q))} = `)}${tb(tf(p,q))}.`}); }
  do{q=R(2,9);p=R(q+1,3*q)}while(gcd(p,q)!==1);
  const P=p*p, Q=q*q, w=Math.floor(P/Q), r=P%Q, e=sq(`${w}${tf(r,Q)}`);
  return QB({text:`Tính ${tm(e)} (viết kết quả dưới dạng phân số).`, tpl:`<span class="eq">${tm(e+' =')} [F]</span>`, ans:[{frac:[p,q],mode:'eq'}],
    hint:'Đổi hỗn số thành phân số trước, rồi khai căn tử và mẫu.',
    sol:`${tm(`${e} = ${sq(tf(P,Q))} = ${tf(sq(P),sq(Q))} = `)}${tb(tf(p,q))}.`});
};
const g8c = lv => {   // rút gọn biểu thức chứa chữ
  if(lv===1){ const s=pick([2,3,5,6,7]), u=R(1,3), v=R(1,3), k=s*u*u, m=s*v*v, n=s*u*v, e=`${sq(k+'a')}\\cdot${sq(m+'a')}`;
    return QC({text:`Rút gọn ${tm(e)} với ${tm('a \\ge 0')}.`, opts:[`${n}a`,`${n}a^2`,`${n*n}a`,`${n}${sq('a')}`].map(tm), ans:tm(`${n}a`),
      hint:`Gộp thành một căn: ${tm('\\sqrt{A}\\cdot\\sqrt{B} = \\sqrt{AB}')}, rồi dùng ${tm('\\sqrt{a^2} = a')} khi ${tm('a \\ge 0')}.`,
      sol:`${tm(`${e} = \\sqrt{${k*m}a^2} = ${n}|a| = `)}${tb(`${n}a`)} (vì ${tm('a \\ge 0')}).`}); }
  if(lv===2){ const m=pick([2,3,5,6,7]), n=R(2,6), k=m*n*n, e=tf(sq(k+'a^3'),sq(m+'a'));
    return QC({text:`Rút gọn ${tm(e)} với ${tm('a \\gt 0')}.`, opts:[`${n}a`,`${n}a^2`,`${n*n}a`,`${n}${sq('a')}`].map(tm), ans:tm(`${n}a`),
      hint:`Gộp thành một căn: ${tm('\\dfrac{\\sqrt{A}}{\\sqrt{B}} = \\sqrt{\\dfrac{A}{B}}')}, rút gọn phân thức dưới dấu căn rồi khai căn.`,
      sol:`${tm(`${e} = \\sqrt{${tf(k+'a^3',m+'a')}} = \\sqrt{${n*n}a^2} = ${n}|a| = `)}${tb(`${n}a`)} (vì ${tm('a \\gt 0')}).`}); }
  const s=pick([2,3,5,6,7]), u=R(1,3), v=R(1,3), k=s*u*u, m=s*v*v, n=s*u*v, e=`${sq(k+'a^2')}\\cdot${sq(m)}`;
  return QC({text:`Rút gọn ${tm(e)} với ${tm('a \\lt 0')}.`, opts:[`-${n}a`,`${n}a`,`-${n}a^2`,`${n}a^2`].map(tm), ans:tm(`-${n}a`),
    hint:`Gộp thành một căn rồi dùng ${tm('\\sqrt{a^2} = |a|')}. Chú ý ${tm('a \\lt 0')} thì ${tm('|a| = -a')}.`,
    sol:`${tm(`${e} = \\sqrt{${k*m}a^2} = ${n}|a| = `)}${tb(`-${n}a`)} (vì ${tm('a \\lt 0')}).`});
};

/* =====================================================================
   BÀI 9. Biến đổi đơn giản và rút gọn biểu thức chứa căn thức bậc hai
   ===================================================================== */
const AB2 = `<span class="eq">${tm('a =')} [_]${tm(';\\quad b =')} [_]</span>`;
const g9a = lv => {   // đưa thừa số ra ngoài dấu căn
  if(lv<3){ const k=lv===1?R(2,4):R(3,10), b=lv===1?pick([2,3,5]):pick(SQF), N=k*k*b;
    return QB({text:`Đưa thừa số ra ngoài dấu căn: viết ${tm(sq(N))} dưới dạng ${tm('a\\sqrt{b}')} với ${tm('a, b')} là số tự nhiên và ${tm('b')} nhỏ nhất có thể.`,
      tpl:AB2, ans:[k,b],
      hint:`Tách số dưới dấu căn thành tích của một số chính phương lớn nhất với một số khác, rồi dùng ${tm('\\sqrt{A^2B} = |A|\\sqrt{B}')}.`,
      sol:`${tm(`${sq(N)} = \\sqrt{${k*k}\\cdot ${b}} = ${rt(k,b)}`)}. Vậy ${tb(`a = ${k}`)}, ${tb(`b = ${b}`)}.`}); }
  const k=R(2,6), b=pick([2,3,5,6,7]), neg=Math.random()<.5, e=sq(`${k*k*b}x^2`), good=`${neg?'-':''}${k}x${sq(b)}`;
  return QC({text:`Đưa thừa số ra ngoài dấu căn: ${tm(e)} với ${tm(`x ${neg?'\\lt':'\\ge'} 0`)}.`,
    opts:[`${k}x${sq(b)}`,`-${k}x${sq(b)}`,`${k}x^2${sq(b)}`,`${k*k}x${sq(b)}`].map(tm), ans:tm(good),
    hint:`${tm('\\sqrt{A^2B} = |A|\\sqrt{B}')}. Xét dấu của ${tm('x')} để bỏ dấu giá trị tuyệt đối.`,
    sol:`${tm(`${e} = \\sqrt{(${k}x)^2\\cdot ${b}} = |${k}x|${sq(b)}`)}. Vì ${tm(`x ${neg?'\\lt':'\\ge'} 0`)} nên ${tm(`|${k}x| = ${neg?'-':''}${k}x`)}. Kết quả: ${tb(good)}.`});
};
const g9b = lv => {   // đưa thừa số vào trong dấu căn
  if(lv<3){ const neg=lv===2, k=lv===1?R(2,6):R(2,9), b=lv===1?pick([2,3,5,6,7]):pick(SQF), a=k*k*b, e=`${neg?'-':''}${k}${sq(b)} = ${neg?'-':''}${sq('a')}`;
    return QB({text:`Đưa thừa số vào trong dấu căn: ${tm(e)}. Tìm ${tm('a')}.`, tpl:blank('a'), ans:[a],
      hint:`Với ${tm('A \\ge 0')}: ${tm('A\\sqrt{B} = \\sqrt{A^2B}')}.`+(neg?` Dấu “${tm('-')}” giữ ở ngoài: ${tm('-A\\sqrt{B} = -\\sqrt{A^2B}')}.`:''),
      sol:`${tm(`${neg?'-':''}${k}${sq(b)} = ${neg?'-':''}\\sqrt{${k}^2\\cdot ${b}} = ${neg?'-':''}${sq(a)}`)}. Vậy ${tb(`a = ${a}`)}.`}); }
  let m,n,a,b; do{m=R(2,6);n=R(2,6);a=pick([2,3,5,6,7]);b=pick([2,3,5,6,7])}while(a===b||m*m*a===n*n*b||Math.abs(m*m*a-n*n*b)>24);
  const L=rt(m,a), Rr=rt(n,b), sw=Math.random()<.5, [l,r,vl,vr]=sw?[Rr,L,n*n*b,m*m*a]:[L,Rr,m*m*a,n*n*b];
  return QCmp('So sánh hai số:', tm(l), tm(r), vl, vr, {hint:'Đưa thừa số vào trong dấu căn ở cả hai số, rồi so sánh hai số dưới dấu căn.',
    sol:`${tm(`${L} = ${sq(m*m*a)}`)}; ${tm(`${Rr} = ${sq(n*n*b)}`)}. So sánh ${tm(m*m*a)} và ${tm(n*n*b)}: ${tb(`${l} ${opT(vl,vr)} ${r}`)}.`});
};
const g9c = lv => {   // cộng, trừ căn thức đồng dạng
  let b,T,m; do{ b=pick(lv===1?[2,3,5]:[2,3,5,6,7]); const cnt=lv===1?2:3;
    T=[...Array(cnt)].map((_,i)=>({k:R(1,lv===1?4:5), c:lv===3?R(1,3):1, s:i&&Math.random()<.5?-1:1}));
    m=T.reduce((t,x)=>t+x.s*x.c*x.k,0);
  }while(m===0||T.every(t=>t.k===1)||new Set(T.map(t=>t.k)).size<T.length);
  const term=(t,i,f)=>(i?(t.s<0?' - ':' + '):(t.s<0?'-':''))+f(t);
  const E=T.map((t,i)=>term(t,i,x=>(x.c>1?x.c:'')+sq(x.k*x.k*b))).join('');
  const E2=T.map((t,i)=>term(t,i,x=>rt(x.c*x.k,b))).join('');
  return QB({text:`Rút gọn biểu thức ${td(`E = ${E}`)}`, tpl:`<span class="eq">${tm('E =')} [_] ${tm(sq(b))}</span>`, ans:[m],
    hint:`Đưa thừa số ra ngoài dấu căn ở từng số hạng để được các căn đồng dạng ${tm(sq(b))}, rồi cộng trừ các hệ số.`,
    sol:`${tm(`E = ${E2} = `)}${tb(rt(m,b))}.`});
};
const g9d = lv => {   // trục căn thức ở mẫu
  const mul=(t,e)=>t===1?e:t===-1?`-(${e})`:`${t}(${e})`, cs=c=>c===1?'':c===-1?'-':c, fr=(c,d)=>c<0?`-${tf(-c,d)}`:tf(c,d);
  if(lv===1){ const a=R(1,12), b=pick([2,3,5,6,7,10,11]), g=gcd(a,b), A=a/g, B=b/g, e=tf(a,sq(b)), v=a/Math.sqrt(b);
    const good={s:B===1?rt(A,b):tf(`${A===1?'':A}${sq(b)}`,B), v};
    const pool=[{s:`${a}${sq(b)}`,v:a*Math.sqrt(b)},{s:tf(sq(b),a),v:Math.sqrt(b)/a},{s:tf(`${a}${sq(b)}`,b*b),v:a*Math.sqrt(b)/b/b},{s:tf(a,b),v:a/b},{s:tf(sq(b),b),v:1/Math.sqrt(b)}];
    return QC({text:`Trục căn thức ở mẫu: ${tm(e)} bằng`, opts:[good,...pickBy(good,pool)].map(o=>tm(o.s)), ans:tm(good.s),
      hint:`Nhân cả tử và mẫu với ${tm(sq(b))}: ${tm('\\dfrac{A}{\\sqrt{B}} = \\dfrac{A\\sqrt{B}}{B}')}. Rút gọn nếu được.`,
      sol:`${tm(`${e} = ${tf(`${a}${sq(b)}`,`${sq(b)}\\cdot${sq(b)}`)} = ${tf(`${a}${sq(b)}`,b)} = `)}${tb(good.s)}.`}); }
  if(lv===2){ let n,a,d; do{n=R(1,4);a=R(2,30);d=a-n*n}while(isSq(a)||d===0||Math.abs(d)>6);
    const t=sR(1,3), c=t*d, minus=Math.random()<.5, den=`${sq(a)} ${minus?'-':'+'} ${n}`, conj=`${sq(a)} ${minus?'+':'-'} ${n}`, r=Math.sqrt(a);
    const good={s:mul(t,conj), v:c/(minus?r-n:r+n)};
    const pool=[{s:mul(t,den),v:t*(minus?r-n:r+n)},{s:mul(-t,conj),v:-t*(minus?r+n:r-n)},{s:mul(-t,den),v:-t*(minus?r-n:r+n)},{s:tf(`${cs(c)}(${conj})`,a+n*n),v:c*(minus?r+n:r-n)/(a+n*n)}];
    return QC({text:`Trục căn thức ở mẫu: ${tm(fr(c,den))} bằng`, opts:[good,...pickBy(good,pool)].map(o=>tm(o.s)), ans:tm(good.s),
      hint:`Nhân cả tử và mẫu với biểu thức liên hợp của mẫu ${tm(`(${conj})`)}, dùng ${tm('(A - B)(A + B) = A^2 - B^2')}.`,
      sol:`${tm(`${fr(c,den)} = ${tf(`${cs(c)}(${conj})`,`(${den})(${conj})`)} = ${tf(`${cs(c)}(${conj})`,`${a} - ${n*n}`)} = ${tf(`${cs(c)}(${conj})`,d<0?`(${d})`:d)} = `)}${tb(good.s)}.`}); }
  let a,b,d; do{b=R(2,20);d=sR(1,3);a=b+d}while(isSq(a)||isSq(b)||a<2);
  const t=R(1,3), c=t*d, minus=Math.random()<.5, den=`${sq(a)} ${minus?'-':'+'} ${sq(b)}`, conj=`${sq(a)} ${minus?'+':'-'} ${sq(b)}`, x=Math.sqrt(a), y=Math.sqrt(b);
  const good={s:mul(t,conj), v:c/(minus?x-y:x+y)};
  const pool=[{s:mul(t,den),v:t*(minus?x-y:x+y)},{s:mul(-t,conj),v:-t*(minus?x+y:x-y)},{s:mul(-t,den),v:-t*(minus?x-y:x+y)},{s:tf(`${Math.abs(c)===1?(c<0?'-':''):c}(${conj})`,a+b),v:c*(minus?x+y:x-y)/(a+b)}];
  return QC({text:`Trục căn thức ở mẫu: ${tm(fr(c,den))} bằng`, opts:[good,...pickBy(good,pool)].map(o=>tm(o.s)), ans:tm(good.s),
    hint:`Nhân cả tử và mẫu với biểu thức liên hợp ${tm(`(${conj})`)}; mẫu trở thành ${tm('(\\sqrt{A})^2 - (\\sqrt{B})^2 = A - B')}.`,
    sol:`${tm(`${fr(c,den)} = ${tf(`${cs(c)}(${conj})`,`${a} - ${b}`)} = ${tf(`${cs(c)}(${conj})`,d<0?`(${d})`:d)} = `)}${tb(good.s)}.`});
};
const g9e = lv => {   // rút gọn biểu thức chứa căn, tính giá trị
  const sx=sq('x');
  if(lv===1){ const k=R(1,9), e=tf(`x - ${k*k}`,`${sx} - ${k}`), good=`${sx} + ${k}`;
    return QC({text:`Rút gọn ${tm(e)} với ${tm(`x \\ge 0,\\ x \\ne ${k*k}`)}.`, opts:[good,`${sx} - ${k}`,`x + ${k}`,`${sx} + ${k*k}`].map(tm), ans:tm(good),
      hint:`Với ${tm('x \\ge 0')} ta có ${tm('x = (\\sqrt{x})^2')}. Phân tích tử thành hiệu hai bình phương rồi rút gọn.`,
      sol:`${tm(`x - ${k*k} = (${sx} - ${k})(${sx} + ${k})`)} nên ${tm(`${e} = `)}${tb(good)}.`}); }
  if(lv===2){ const k=R(1,9);
    if(Math.random()<.5){ const pl=Math.random()<.5, e=tf(`x ${pl?'+':'-'} ${k===1?'':k}${sx}`,sx), good=`${sx} ${pl?'+':'-'} ${k}`;
      return QC({text:`Rút gọn ${tm(e)} với ${tm('x \\gt 0')}.`, opts:[good,`${sx} ${pl?'-':'+'} ${k}`,`x ${pl?'+':'-'} ${k}`,`${pl?'':'-'}${k}${sx}`].map(tm), ans:tm(good),
        hint:`Viết ${tm('x = \\sqrt{x}\\cdot\\sqrt{x}')}, đặt nhân tử chung ${tm(sx)} ở tử rồi rút gọn.`,
        sol:`${tm(`${e} = ${tf(`${sx}(${sx} ${pl?'+':'-'} ${k})`,sx)} = `)}${tb(good)}.`}); }
    const e=tf(`x - ${2*k}${sx} + ${k*k}`,`${sx} - ${k}`), good=`${sx} - ${k}`;
    return QC({text:`Rút gọn ${tm(e)} với ${tm(`x \\ge 0,\\ x \\ne ${k*k}`)}.`, opts:[good,`${sx} + ${k}`,`x - ${k}`,`(${sx} - ${k})^2`].map(tm), ans:tm(good),
      hint:`Tử là bình phương của một hiệu: ${tm('A^2 - 2AB + B^2 = (A - B)^2')} với ${tm('A = \\sqrt{x}')}.`,
      sol:`${tm(`x - ${2*k}${sx} + ${k*k} = (${sx} - ${k})^2`)} nên ${tm(`${e} = `)}${tb(good)}.`}); }
  let k,m; do{k=R(1,4);m=R(k+1,9)}while(m===k);
  const A=`${tf(`${sx} + ${k}`,`${sx} - ${k}`)} - ${tf(`${sx} - ${k}`,`${sx} + ${k}`)}`, p=4*k*m, q=m*m-k*k;
  return QB({text:`Cho biểu thức ${td(`A = ${A}`)}với ${tm(`x \\ge 0,\\ x \\ne ${k*k}`)}. Rút gọn ${tm('A')} rồi tính giá trị của ${tm('A')} khi ${tm(`x = ${m*m}`)}.`,
    tpl:`<span class="eq">${tm('A =')} [F]</span>`, ans:[{frac:[p,q],mode:'eq'}],
    hint:`Quy đồng với mẫu chung ${tm(`(${sx} - ${k})(${sx} + ${k}) = x - ${k*k}`)}, khai triển tử rồi rút gọn. Sau đó thay ${tm(`\\sqrt{x} = \\sqrt{${m*m}}`)}.`,
    sol:`${tm(`A = ${tf(`(${sx} + ${k})^2 - (${sx} - ${k})^2`,`x - ${k*k}`)} = ${tf(`${4*k}${sx}`,`x - ${k*k}`)}`)}. Khi ${tm(`x = ${m*m}`)} thì ${tm(`\\sqrt{x} = ${m}`)}: ${tm(`A = ${tf(`${4*k}\\cdot ${m}`,`${m*m} - ${k*k}`)} = `)}${tb(tfrac(p,q))}.`});
};

/* =====================================================================
   BÀI 10. Căn bậc ba và căn thức bậc ba
   ===================================================================== */
const g10a = lv => {   // tính căn bậc ba
  if(lv===1){ const n=R(2,10), e=cb(n**3);
    return QB({text:`Tính ${tm(e)}.`, tpl:eqB(e), ans:[n], hint:`${tm(cb('a'))} là số ${tm('x')} sao cho ${tm('x^3 = a')}.`,
      sol:`Vì ${tm(`${n}^3 = ${n**3}`)} nên ${tm(e+' =')} ${tb(n)}.`}); }
  if(lv===2){ if(Math.random()<.5){ const n=R(2,10), e=cb(-(n**3));
      return QB({text:`Tính ${tm(e)}.`, tpl:eqB(e), ans:[-n], hint:`Số âm cũng có căn bậc ba (là một số âm). Tìm ${tm('x')} sao cho ${tm(`x^3 = ${-(n**3)}`)}.`,
        sol:`Vì ${tm(`(-${n})^3 = ${-(n**3)}`)} nên ${tm(e+' =')} ${tb(-n)}.`}); }
    const k=R(1,9), sgn=pick([1,-1]), v=sgn*k/10, N=+(v**3).toFixed(4), e=cb(tdec(N));
    return QB({text:`Tính ${tm(e)}.`, tpl:eqB(e), ans:[v], hint:`Tìm số thập phân ${tm('x')} sao cho ${tm(`x^3 = ${tdec(N)}`)}. Chú ý số chữ số sau dấu phẩy.`,
      sol:`Vì ${tm(`${v<0?`(${tdec(v)})`:tdec(v)}^3 = ${tdec(N)}`)} nên ${tm(e+' =')} ${tb(tdec(v))}.`}); }
  let T,val; do{ T=[...Array(3)].map((_,i)=>({c:R(1,3),n:R(-5,5)||2,s:i&&Math.random()<.5?-1:1})); val=T.reduce((t,x)=>t+x.s*x.c*x.n,0); }while(new Set(T.map(t=>t.n)).size<3);
  const term=(t,i,f)=>(i?(t.s<0?' - ':' + '):(t.s<0?'-':''))+f(t);
  const E=T.map((t,i)=>term(t,i,x=>(x.c>1?x.c:'')+cb(x.n**3))).join(''), E2=T.map((t,i)=>term(t,i,x=>(x.c>1?`${x.c}\\cdot`:'')+tp(x.n))).join('');
  return QB({text:`Tính giá trị biểu thức ${td(`E = ${E}`)}`, tpl:eqB('E'), ans:[val], hint:'Tính từng căn bậc ba trước (chú ý căn bậc ba của số âm là số âm), rồi thực hiện phép tính.',
    sol:`${tm(`E = ${E2} = `)}${tb(val)}.`});
};
const g10b = lv => {   // so sánh căn bậc ba
  const put=(l,r,vl,vr,hint,why)=>{const sw=Math.random()<.5,[L,Rr,a,b]=sw?[r,l,vr,vl]:[l,r,vl,vr];
    return QCmp('So sánh hai số:', tm(L), tm(Rr), a, b, {hint, sol:`${why} Vậy ${tb(`${L} ${opT(a,b)} ${Rr}`)}.`})};
  const H=`${tm('a \\lt b \\Leftrightarrow \\sqrt[3]{a} \\lt \\sqrt[3]{b}')} (đúng với mọi số ${tm('a, b')}, kể cả số âm).`;
  if(lv===1){ const n=R(2,6); let a; do{a=n**3+sR(1,6)}while(a<2);
    return put(String(n),cb(a),n**3,a,`Viết ${tm(n)} dưới dạng căn bậc ba: ${tm(`${n} = ${cb('\\ldots')}`)}. `+H, `Ta có ${tm(`${n} = ${cb(n**3)}`)} và ${tm(`${n**3} ${opT(n**3,a)} ${a}`)}.`); }
  if(lv===2){ let a,b; do{a=R(-60,60);b=R(-60,60)}while(a===b||!a||!b);
    return put(cb(a),cb(b),a,b,H,`Vì ${tm(`${a} ${opT(a,b)} ${b}`)} nên ${tm(`${cb(a)} ${opT(a,b)} ${cb(b)}`)}.`); }
  const k=R(2,4), a=R(2,6), A=k**3*a; let b; do{b=A+sR(1,8)}while(b<2);
  return put(`${k}${cb(a)}`,cb(b),A,b,`Đưa thừa số vào trong dấu căn bậc ba: ${tm('A\\sqrt[3]{B} = \\sqrt[3]{A^3B}')}. `+H,
    `Ta có ${tm(`${k}${cb(a)} = \\sqrt[3]{${k}^3\\cdot ${a}} = ${cb(A)}`)}; so sánh ${tm(A)} với ${tm(b)}.`);
};
const g10c = lv => {   // giải phương trình chứa căn bậc ba
  if(lv===1){ const c=sR(1,5), x=c**3, e=`${cb('x')} = ${c}`;
    return QB({text:`Tìm ${tm('x')}, biết ${td(e)}`, tpl:blank('x'), ans:[x], hint:`Lập phương hai vế: ${tm('\\sqrt[3]{x} = c \\Leftrightarrow x = c^3')}.`,
      sol:`${tm(`${e}${EQ}x = ${tp(c)}^3`)}, nên ${tb(`x = ${x}`)}.`}); }
  if(lv===2){ const b=sR(1,20), c=R(-4,4), x=c**3-b, A=poly([1,X],[b,'']), e=`${cb(A)} = ${c}`;
    return QB({text:`Giải phương trình ${td(e)}`, tpl:blank('x'), ans:[x], hint:'Lập phương hai vế để bỏ căn bậc ba, rồi giải phương trình bậc nhất.',
      sol:`${tm(`${e}${EQ}${A} = ${tp(c)}^3 = ${c**3}${EQ}x = ${x}`)}. Nghiệm: ${tb(`x = ${x}`)}.`}); }
  let x,a,c,b; do{x=R(-10,10);a=R(2,5);c=R(-4,4);b=c**3-a*x}while(!b);
  const A=poly([a,X],[b,'']), e=`${cb(A)} = ${c}`;
  return QB({text:`Giải phương trình ${td(e)}`, tpl:blank('x'), ans:[x], hint:'Lập phương hai vế để bỏ căn bậc ba, rồi giải phương trình bậc nhất.',
    sol:`${tm(`${e}${EQ}${A} = ${c**3}${EQ}${poly([a,X])} = ${c**3-b}${EQ}x = ${x}`)}. Nghiệm: ${tb(`x = ${x}`)}.`});
};
const g10d = lv => {   // rút gọn căn thức bậc ba
  const uq=a=>[...new Set(a)];
  if(lv===1){ const k=R(2,5), s=pick([1,-1]), good=`${s<0?'-':''}${k}x`, e=cb(`${s*k**3}x^3`);
    return QC({text:`Rút gọn ${tm(e)}.`, opts:[`${k}x`,`-${k}x`,`${k**3}x`,`${k}x^3`].map(tm), ans:tm(good),
      hint:`${tm('\\sqrt[3]{A^3} = A')} với mọi ${tm('A')}. Viết biểu thức dưới dấu căn thành lập phương của một biểu thức.`,
      sol:`${tm(`${s*k**3}x^3 = (${s<0?'-':''}${k}x)^3`)} nên ${tm(`${e} = `)}${tb(good)}.`}); }
  if(lv===2){ const k=sR(1,4), A=poly([1,'x^3'],[3*k,X2],[3*k*k,X],[k**3,'']), good=poly([1,X],[k,'']);
    const opts=uq([good,poly([1,X],[-k,'']),poly([1,X],[3*k,'']),poly([1,X],[k**3,'']),poly([-1,X],[k,''])]).slice(0,4);
    return QC({text:`Rút gọn ${tm(cb(A))}.`, opts:opts.map(tm), ans:tm(good),
      hint:`Biểu thức dưới dấu căn có dạng ${tm('A^3 + 3A^2B + 3AB^2 + B^3 = (A + B)^3')}.`,
      sol:`${tm(`${A} = ${fac(1,k)}^3`)} nên ${tm(`${cb(A)} = `)}${tb(good)}.`}); }
  let k,m; do{k=R(2,4);m=R(2,6)}while(k===m);
  const e=`${cb(`${k**3}x^3`)} - ${sq(`${m*m}x^2`)}`, good=poly([k+m,X]);
  const opts=uq([good,poly([k-m,X]),poly([-(k+m),X]),poly([m-k,X])]);
  return QC({text:`Rút gọn ${tm(e)} với ${tm('x \\lt 0')}.`, opts:opts.map(tm), ans:tm(good),
    hint:`${tm('\\sqrt[3]{A^3} = A')} với mọi ${tm('A')}; còn ${tm('\\sqrt{A^2} = |A|')}. Chú ý ${tm('x \\lt 0')}.`,
    sol:`${tm(`${cb(`${k**3}x^3`)} = ${k}x`)}; ${tm(`${sq(`${m*m}x^2`)} = ${m}|x| = -${m}x`)} (vì ${tm('x \\lt 0')}). Vậy ${tm(`${e} = ${k}x + ${m}x = `)}${tb(good)}.`});
};

lesson(3,'can-bac-hai','Bài 7. Căn bậc hai và căn thức bậc hai','Căn bậc hai, căn bậc hai số học; so sánh; điều kiện xác định; hằng đẳng thức √(A²) = |A|.',[g7a,g7b,g7c,g7d]);
lesson(3,'khai-can-nhan-chia','Bài 8. Khai căn bậc hai với phép nhân và phép chia','Khai căn một tích, một thương; nhân, chia các căn bậc hai; rút gọn biểu thức chứa chữ.',[g8a,g8b,g8c]);
lesson(3,'bien-doi-can-thuc','Bài 9. Biến đổi đơn giản và rút gọn biểu thức chứa căn thức bậc hai','Đưa thừa số ra ngoài, vào trong dấu căn; căn đồng dạng; trục căn thức ở mẫu; rút gọn.',[g9a,g9b,g9c,g9d,g9e]);
lesson(3,'can-bac-ba','Bài 10. Căn bậc ba và căn thức bậc ba','Tính căn bậc ba; so sánh; giải phương trình chứa căn bậc ba; rút gọn.',[g10a,g10b,g10c,g10d]);
lesson(3,'on-tap-c3','Ôn tập chương III','Tổng hợp: so sánh căn, khai căn thương, biến đổi, trục căn thức, căn bậc ba.',[g7b,g8b,g9a,g9c,g9d,g10c]);

/* =====================================================================
   CHƯƠNG IV – BÀI 11. Tỉ số lượng giác của góc nhọn
   Tam giác vuông tại N[0]; góc nhọn N[1] (trên), N[2] (phải) – hình vẽ bằng rtTriSVG (figures.js).
   ===================================================================== */
const NAMESETS = [['A','B','C'],['M','N','P'],['D','E','F'],['H','I','K'],['A','D','E']];
const TRIPLES = [[3,4,5],[5,12,13],[8,15,17],[7,24,25],[20,21,29],[9,40,41],[6,8,10],[9,12,15]];
const DEG = d => `${d}^\\circ`;
const FN = ['sin','cos','tan','cot'];
const OTHER = {sin:'cos',cos:'sin',tan:'cot',cot:'tan'};
const DEF = `${tm('\\sin = \\dfrac{\\text{đối}}{\\text{huyền}}')}, ${tm('\\cos = \\dfrac{\\text{kề}}{\\text{huyền}}')}, ${tm('\\tan = \\dfrac{\\text{đối}}{\\text{kề}}')}, ${tm('\\cot = \\dfrac{\\text{kề}}{\\text{đối}}')}`;
// Thông tin các cạnh đối với góc nhọn V (V = 1 hoặc 2 là chỉ số đỉnh trong N)
const sides = (N,V) => { const hyp=N[1]+N[2], leg1=N[0]+N[1], leg2=N[0]+N[2];   // leg1 thẳng đứng, leg2 nằm ngang
  return V===1 ? {opp:leg2, adj:leg1, hyp} : {opp:leg1, adj:leg2, hyp}; };
const ratio = (f,s) => ({sin:[s.opp,s.hyp],cos:[s.adj,s.hyp],tan:[s.opp,s.adj],cot:[s.adj,s.opp]})[f];
const tri = lv => { const t=pick(lv===1?[[3,4,5],[6,8,10],[5,12,13]]:TRIPLES), k=lv===1?R(1,2):1, sw=Math.random()<.5;
  return {v:t[sw?0:1]*k, h:t[sw?1:0]*k, c:t[2]*k}; };   // v: cạnh đứng N0N1, h: cạnh ngang N0N2, c: huyền
const g11a = lv => {   // nhận biết tỉ số lượng giác
  const N=lv===3?pick(NAMESETS):NAMESETS[0], V=pick([1,2]), f=pick(FN), s=sides(N,V), name=N.join('');
  let opts, good, fig, t;
  if(lv===2){ t=tri(2); const len={[N[0]+N[1]]:t.v,[N[0]+N[2]]:t.h,[N[1]+N[2]]:t.c};
    const val=f=>{const [a,b]=ratio(f,s);return tfrac(len[a],len[b])};
    opts=FN.map(val); good=val(f);
    fig=rtTriSVG({n:N,w:t.h,h:t.v,ab:t.v,ac:t.h,bc:t.c,[V===1?'aB':'aC']:true}); }
  else { opts=FN.map(g=>{const [a,b]=ratio(g,s);return tf(a,b)}); const [a,b]=ratio(f,s); good=tf(a,b);
    fig=rtTriSVG({n:N,[V===1?'aB':'aC']:true}); }
  const ang=`\\${f} ${N[V]}`;
  return QC({text:`Cho tam giác ${tm(name)} vuông tại ${tm(N[0])} (hình bên). Khi đó ${tm(ang)} bằng`, fig, opts:opts.map(tm), ans:tm(good), keepOrder:lv===1,
    hint:`Xác định cạnh đối, cạnh kề của góc ${tm(N[V])} và cạnh huyền. Nhớ: ${DEF}.`,
    sol:`Với góc ${tm(N[V])}: cạnh đối là ${tm(s.opp)}, cạnh kề là ${tm(s.adj)}, cạnh huyền là ${tm(s.hyp)}. Vậy ${lv===2?tm(`${ang} = ${tf(...ratio(f,s))} =`):tm(ang+' =')} ${tb(good)}.`});
};
const g11b = lv => {   // tính tỉ số lượng giác
  if(lv<3){ const N=NAMESETS[0], V=pick([1,2]), f=pick(FN), s=sides(N,V), t=tri(lv), len={AB:t.v,AC:t.h,BC:t.c};
    let hide=null; const [a,b]=ratio(f,s); if(lv===2) hide=pick([a,b]);
    const lab=k=>k===hide?'?':len[k], known=Object.keys(len).filter(k=>k!==hide);
    const fig=rtTriSVG({n:N,w:t.h,h:t.v,ab:lab('AB'),ac:lab('AC'),bc:lab('BC'),[V===1?'aB':'aC']:true});
    const given=known.map(k=>tm(`${k} = ${len[k]}`)).join(', ');
    let py='';
    if(hide) py = hide==='BC' ? `Theo định lí Pythagore: ${tm(`BC = \\sqrt{AB^2 + AC^2} = \\sqrt{${t.v*t.v} + ${t.h*t.h}} = ${t.c}`)}. `
      : `Theo định lí Pythagore: ${tm(`${hide} = \\sqrt{BC^2 - ${known.find(k=>k!=='BC')}^2} = \\sqrt{${t.c*t.c} - ${(hide==='AB'?t.h:t.v)**2}} = ${len[hide]}`)}. `;
    return QB({text:`Cho tam giác ${tm('ABC')} vuông tại ${tm('A')} có ${given} (cùng đơn vị độ dài). Tính ${tm(`\\${f} ${N[V]}`)}.`, fig,
      tpl:`<span class="eq">${tm(`\\${f} ${N[V]} =`)} [F]</span>`, ans:[{frac:[len[a],len[b]],mode:'eq'}],
      hint:(hide?'Dùng định lí Pythagore để tính cạnh còn thiếu trước. ':'')+`Xác định cạnh đối, kề, huyền của góc ${tm(N[V])}; ${DEF}.`,
      sol:`${py}${tm(`\\${f} ${N[V]} = ${tf(a,b)} = ${tf(len[a],len[b])}`)} ${tm('=')} ${tb(tfrac(len[a],len[b]))}.`}); }
  const [p,q,h]=pick(TRIPLES.slice(0,6)), sw=Math.random()<.5, o=sw?p:q, a=sw?q:p;   // o: đối, a: kề, h: huyền
  const V={sin:[o,h],cos:[a,h],tan:[o,a],cot:[a,o]}, f1=pick(['sin','cos','tan']), f2=pick(FN.filter(g=>g!==f1));
  const [n1,d1]=V[f1], [n2,d2]=V[f2];
  const known = f1==='sin'?`cạnh đối ${tm(o+'k')}, cạnh huyền ${tm(h+'k')}`:f1==='cos'?`cạnh kề ${tm(a+'k')}, cạnh huyền ${tm(h+'k')}`:`cạnh đối ${tm(o+'k')}, cạnh kề ${tm(a+'k')}`;
  const third = f1==='sin'?`cạnh kề ${tm(`\\sqrt{${h}^2 - ${o}^2}\\,k = ${a}k`)}`:f1==='cos'?`cạnh đối ${tm(`\\sqrt{${h}^2 - ${a}^2}\\,k = ${o}k`)}`:`cạnh huyền ${tm(`\\sqrt{${o}^2 + ${a}^2}\\,k = ${h}k`)}`;
  return QB({text:`Cho ${tm('\\alpha')} là góc nhọn và ${tm(`\\${f1}\\alpha = ${tf(n1,d1)}`)}. Tính ${tm(`\\${f2}\\alpha`)}.`,
    tpl:`<span class="eq">${tm(`\\${f2}\\alpha =`)} [F]</span>`, ans:[{frac:[n2,d2],mode:'eq'}],
    hint:`Vẽ một tam giác vuông có góc nhọn ${tm('\\alpha')} với hai cạnh tỉ lệ theo ${tm(`\\${f1}\\alpha`)}, dùng định lí Pythagore tính cạnh thứ ba rồi lập tỉ số cần tìm.`,
    sol:`Xét tam giác vuông có góc nhọn ${tm('\\alpha')} với ${known} (${tm('k \\gt 0')}). Theo định lí Pythagore, ${third}. Vậy ${tm(`\\${f2}\\alpha = ${tf(n2+'k',d2+'k')} =`)} ${tb(tf(n2,d2))}.`});
};
const g11c = lv => {   // tỉ số lượng giác của hai góc phụ nhau
  const HP=`Hai góc phụ nhau (tổng bằng ${tm(DEG(90))}): sin góc này bằng cos góc kia, tan góc này bằng cot góc kia.`;
  let a; do{a=R(10,80)}while(a===45);
  if(lv===1){ const f=pick(FN), g=OTHER[f];
    return QB({text:'Điền số thích hợp vào ô trống:', tpl:`<span class="eq">${tm(`\\${f} ${DEG(a)} = \\${g}`)} [_]°</span>`, ans:[90-a], hint:HP,
      sol:`Vì ${tm(`${DEG(a)} + ${DEG(90-a)} = ${DEG(90)}`)} nên ${tm(`\\${f} ${DEG(a)} = \\${g} ${DEG(90-a)}`)}. Số cần điền: ${tb(90-a)}.`}); }
  if(lv===2){ const b=90-a, T=[`\\sin ${DEG(a)} = \\cos ${DEG(b)}`,`\\tan ${DEG(a)} = \\cot ${DEG(b)}`,`\\cos ${DEG(a)} = \\sin ${DEG(b)}`,`\\cot ${DEG(a)} = \\tan ${DEG(b)}`];
    const Fz=[`\\sin ${DEG(a)} = \\sin ${DEG(b)}`,`\\sin ${DEG(a)} = \\cos ${DEG(a)}`,`\\tan ${DEG(a)} = \\tan ${DEG(b)}`,`\\cos ${DEG(a)} = \\cos ${DEG(b)}`,`\\tan ${DEG(a)} = \\cot ${DEG(a)}`,`\\cot ${DEG(a)} = \\cot ${DEG(b)}`];
    const good=pick(T);
    return QC({text:'Khẳng định nào sau đây <b>đúng</b>?', opts:[good,...shuffle(Fz).slice(0,3)].map(tm), ans:tm(good), hint:HP,
      sol:`${tm(`${DEG(a)} + ${DEG(b)} = ${DEG(90)}`)} nên ${tb(good)}. Các khẳng định còn lại chỉ đúng khi góc bằng ${tm(DEG(45))}.`}); }
  let c,d; do{c=R(10,80);d=R(10,80)}while(c===45||d===45||c===a||d===a||c===d);
  const k=[R(1,4),R(1,4),R(1,4)], s=[1,pick([1,-1]),pick([1,-1])], v=k[0]*s[0]+k[1]*s[1]+k[2]*s[2];
  const K=(i,e,wrap)=>(i?(s[i]<0?' - ':' + '):'')+(k[i]>1?(wrap?`${k[i]}\\cdot`:`${k[i]}`):'')+e;
  const T1=tf(`\\sin ${DEG(a)}`,`\\cos ${DEG(90-a)}`), T2=`\\tan ${DEG(c)}\\cdot\\tan ${DEG(90-c)}`, T3=tf(`\\cot ${DEG(d)}`,`\\tan ${DEG(90-d)}`);
  const E=K(0,T1,true)+K(1,T2,true)+K(2,T3,true);
  return QB({text:`Tính giá trị biểu thức (không dùng máy tính): ${td(`E = ${E}`)}`, tpl:eqB('E'), ans:[v],
    hint:HP+` Ngoài ra ${tm('\\tan\\alpha\\cdot\\cot\\alpha = 1')}.`,
    sol:`${tm(`\\cos ${DEG(90-a)} = \\sin ${DEG(a)}`)} nên ${tm(`${T1} = 1`)}; ${tm(`\\tan ${DEG(90-c)} = \\cot ${DEG(c)}`)} nên ${tm(`${T2} = 1`)}; ${tm(`\\tan ${DEG(90-d)} = \\cot ${DEG(d)}`)} nên ${tm(`${T3} = 1`)}. Vậy ${tm(`E = ${k[0]}${s[1]<0?' - ':' + '}${k[1]}${s[2]<0?' - ':' + '}${k[2]} =`)} ${tb(v)}.`});
};
const SV = {sin:{30:tf(1,2),45:tf(sq(2),2),60:tf(sq(3),2)}, cos:{30:tf(sq(3),2),45:tf(sq(2),2),60:tf(1,2)},
            tan:{30:tf(sq(3),3),45:'1',60:sq(3)}, cot:{30:sq(3),45:'1',60:tf(sq(3),3)}};
const SVPOOL = [tf(1,2),tf(sq(2),2),tf(sq(3),2),'1',sq(3),tf(sq(3),3)];
const SVTERMS = [['2\\sin 30^\\circ',`2\\cdot${tf(1,2)}`,1],['2\\cos 60^\\circ',`2\\cdot${tf(1,2)}`,1],['\\tan 45^\\circ','1',1],['\\cot 45^\\circ','1',1],
  ['4\\sin^2 60^\\circ',`4\\cdot\\left(${tf(sq(3),2)}\\right)^2`,3],['4\\cos^2 30^\\circ',`4\\cdot\\left(${tf(sq(3),2)}\\right)^2`,3],
  ['2\\sin^2 45^\\circ',`2\\cdot\\left(${tf(sq(2),2)}\\right)^2`,1],['\\tan^2 60^\\circ',`(${sq(3)})^2`,3],['3\\tan^2 30^\\circ',`3\\cdot\\left(${tf(sq(3),3)}\\right)^2`,1],
  ['\\cot^2 30^\\circ',`(${sq(3)})^2`,3],[`${sq(3)}\\tan 60^\\circ`,`${sq(3)}\\cdot${sq(3)}`,3],[`${sq(2)}\\cos 45^\\circ`,`${sq(2)}\\cdot${tf(sq(2),2)}`,1],['6\\sin 30^\\circ',`6\\cdot${tf(1,2)}`,3]];
const g11d = lv => {   // tỉ số lượng giác của góc đặc biệt
  const HT=`Nhớ bảng giá trị: ${tm(`\\sin 30^\\circ = \\cos 60^\\circ = ${tf(1,2)}`)}, ${tm(`\\sin 45^\\circ = \\cos 45^\\circ = ${tf(sq(2),2)}`)}, ${tm(`\\sin 60^\\circ = \\cos 30^\\circ = ${tf(sq(3),2)}`)}; ${tm('\\tan = \\dfrac{\\sin}{\\cos}')}, ${tm('\\cot = \\dfrac{\\cos}{\\sin}')}.`;
  const f=pick(FN), t=pick([30,45,60]), good=SV[f][t];
  if(lv===1) return QC({text:`${tm(`\\${f} ${DEG(t)}`)} bằng`, opts:[good,...shuffle(SVPOOL.filter(x=>x!==good)).slice(0,3)].map(tm), ans:tm(good), hint:HT,
    sol:`Theo bảng giá trị lượng giác của các góc đặc biệt: ${tm(`\\${f} ${DEG(t)} =`)} ${tb(good)}.`});
  if(lv===2) return QB({text:`Tìm góc nhọn ${tm('\\alpha')}, biết ${tm(`\\${f}\\alpha = ${good}`)}.`, tpl:`<span class="eq">${tm('\\alpha =')} [_]°</span>`, ans:[t], hint:HT,
    sol:`Vì ${tm(`\\${f} ${DEG(t)} = ${good}`)} nên ${tb(`\\alpha = ${DEG(t)}`)}.`});
  let T; do{T=shuffle(SVTERMS).slice(0,3)}while(new Set(T.map(x=>x[1])).size<3);
  const s=[1,pick([1,-1]),pick([1,-1])], v=T.reduce((a,x,i)=>a+s[i]*x[2],0);
  const J=f=>T.map((x,i)=>(i?(s[i]<0?' - ':' + '):'')+f(x)).join('');
  return QB({text:`Tính giá trị biểu thức (không dùng máy tính): ${td(`E = ${J(x=>x[0])}`)}`, tpl:eqB('E'), ans:[v], hint:HT,
    sol:`${tm(`E = ${J(x=>x[1])} = ${J(x=>x[2])} =`)} ${tb(v)}.`});
};

/* =====================================================================
   BÀI 12. Một số hệ thức giữa cạnh, góc trong tam giác vuông và ứng dụng
   ===================================================================== */
const TR = `${tm('\\text{cạnh góc vuông} = \\text{huyền}\\cdot\\sin(\\text{góc đối}) = \\text{huyền}\\cdot\\cos(\\text{góc kề})')}; ${tm('\\text{cạnh góc vuông} = \\text{cạnh kia}\\cdot\\tan(\\text{góc đối}) = \\text{cạnh kia}\\cdot\\cot(\\text{góc kề})')}`;
const g12a = lv => {   // chọn hệ thức đúng
  const N=lv===3?pick(NAMESETS):NAMESETS[0], V=lv===3?pick([1,2]):1, W=3-V, s=sides(N,V);   // hỏi cạnh s.opp (đối diện góc V)
  const L=s.opp, H=s.hyp, O=s.adj, P=N[V], Q=N[W], eq=r=>`${L} = ${r}`;
  const T={hs:`${H}\\cdot\\sin ${P}`, hc:`${H}\\cdot\\cos ${Q}`, ot:`${O}\\cdot\\tan ${P}`, oc:`${O}\\cdot\\cot ${Q}`};
  const Fz={hc2:`${H}\\cdot\\cos ${P}`, hs2:`${H}\\cdot\\sin ${Q}`, ot2:`${O}\\cdot\\tan ${Q}`, oc2:`${O}\\cdot\\cot ${P}`, ht:`${H}\\cdot\\tan ${P}`, os:`${O}\\cdot\\sin ${P}`};
  let good, bad;
  if(lv===1){ good=pick([T.hs,T.hc]); bad=[Fz.hc2,Fz.hs2,Fz.ht]; }
  else if(lv===2){ good=pick([T.ot,T.oc]); bad=[Fz.ot2,Fz.oc2,Fz.os]; }
  else { good=pick(Object.values(T)); bad=shuffle(Object.values(Fz)).slice(0,3); }
  return QC({text:`Cho tam giác ${tm(N.join(''))} vuông tại ${tm(N[0])} (hình bên). Khẳng định nào sau đây <b>đúng</b>?`, fig:rtTriSVG({n:N}),
    opts:[good,...bad].map(r=>tm(eq(r))), ans:tm(eq(good)), hint:TR,
    sol:`Cạnh ${tm(L)} đối diện góc ${tm(P)}, kề góc ${tm(Q)}. Do đó ${tm(`${L} = ${T.hs} = ${T.hc}`)} và ${tm(`${L} = ${T.ot} = ${T.oc}`)}. Đáp án: ${tb(eq(good))}.`});
};
const g12b = lv => {   // tính cạnh với góc đặc biệt
  const k=R(2,12), fg=(b,o)=>rtTriSVG({n:['A','B','C'],w:Math.tan(b*Math.PI/180),h:1,aB:`${b}°`,...o});
  const U='&nbsp;cm';
  if(lv===1){ const b=pick([30,60]), a=2*k, leg=b===30?'AC':'AB', f=b===30?'\\sin':'\\cos';
    return QB({text:`Cho tam giác ${tm('ABC')} vuông tại ${tm('A')} có ${tm(`BC = ${a}`)} cm và ${tm(`\\widehat{B} = ${DEG(b)}`)}. Tính độ dài cạnh ${tm(leg)}.`,
      fig:fg(b,{bc:`${a} cm`,[leg==='AC'?'ac':'ab']:'?'}), tpl:eqB(leg,U), ans:[k], hint:TR,
      sol:`${tm(`${leg} = BC\\cdot${f} B = ${a}\\cdot${f} ${DEG(b)} = ${a}\\cdot${tf(1,2)} = ${k}`)}. Vậy ${tb(`${leg} = ${k}\\text{ cm}`)}.`}); }
  if(lv===2){ const c=pick(['ac60','bc60','bc45']);
    if(c==='ac60') return QB({text:`Cho tam giác ${tm('ABC')} vuông tại ${tm('A')} có ${tm(`AB = ${k}`)} cm và ${tm(`\\widehat{B} = ${DEG(60)}`)}. Tính ${tm('AC')}.`,
      fig:fg(60,{ab:`${k} cm`,ac:'?'}), tpl:`<span class="eq">${tm('AC =')} [_] ${tm(sq(3))} cm</span>`, ans:[k], hint:TR,
      sol:`${tm(`AC = AB\\cdot\\tan B = ${k}\\cdot\\tan ${DEG(60)} = ${k}${sq(3)}`)}. Vậy ${tb(`AC = ${k}${sq(3)}\\text{ cm}`)}.`});
    const b=c==='bc60'?60:45;
    return QB({text:`Cho tam giác ${tm('ABC')} vuông tại ${tm('A')} có ${tm(`AB = ${k}`)} cm và ${tm(`\\widehat{B} = ${DEG(b)}`)}. Tính ${tm('BC')}.`,
      fig:fg(b,{ab:`${k} cm`,bc:'?'}), tpl:b===60?eqB('BC',U):`<span class="eq">${tm('BC =')} [_] ${tm(sq(2))} cm</span>`, ans:[b===60?2*k:k],
      hint:`${tm('AB = BC\\cdot\\cos B')}, suy ra ${tm('BC = \\dfrac{AB}{\\cos B}')}.`,
      sol:b===60?`${tm(`BC = ${tf('AB','\\cos B')} = ${tf(k,`\\cos ${DEG(60)}`)} = ${tf(k,tf(1,2))} = ${2*k}`)}. Vậy ${tb(`BC = ${2*k}\\text{ cm}`)}.`
        :`${tm(`BC = ${tf('AB','\\cos B')} = ${tf(k,tf(sq(2),2))} = ${tf(2*k,sq(2))} = ${k}${sq(2)}`)}. Vậy ${tb(`BC = ${k}${sq(2)}\\text{ cm}`)}.`}); }
  return QB({text:`Giải tam giác vuông: tam giác ${tm('ABC')} vuông tại ${tm('A')} có ${tm(`AC = ${k}`)} cm và ${tm(`\\widehat{B} = ${DEG(30)}`)}. Tính ${tm('BC')} và ${tm('AB')}.`,
    fig:fg(30,{ac:`${k} cm`,bc:'?',ab:'?'}), tpl:`<span class="eq">${tm('BC =')} [_] cm</span><br><span class="eq">${tm('AB =')} [_] ${tm(sq(3))} cm</span>`, ans:[2*k,k],
    hint:`${tm('AC = BC\\cdot\\sin B')} cho ta ${tm('BC')}; ${tm('AC = AB\\cdot\\tan B')} cho ta ${tm('AB')}.`,
    sol:`${tm(`BC = ${tf('AC','\\sin B')} = ${tf(k,tf(1,2))} = ${2*k}`)}; ${tm(`AB = ${tf('AC','\\tan B')} = ${tf(k,tf(sq(3),3))} = ${tf(3*k,sq(3))} = ${k}${sq(3)}`)}. Vậy ${tb(`BC = ${2*k}\\text{ cm}`)}, ${tb(`AB = ${k}${sq(3)}\\text{ cm}`)}.`});
};
const trig = (f,d) => Math[f==='cot'?'tan':f](d*Math.PI/180)**(f==='cot'?-1:1);
const r2 = x => Math.round(x*100)/100;
const g12c = lv => {   // giải tam giác vuông (dùng giá trị gần đúng cho sẵn)
  let b; do{b=R(20,70)}while(b===30||b===45||b===60);
  const fg=o=>rtTriSVG({n:['A','B','C'],w:Math.tan(b*Math.PI/180),h:1,aB:`${b}°`,...o});
  if(lv===1) return QB({text:`Cho tam giác ${tm('ABC')} vuông tại ${tm('A')} có ${tm(`\\widehat{B} = ${DEG(b)}`)}. Tính số đo góc ${tm('C')}.`, fig:fg({aC:'?'}),
    tpl:`<span class="eq">${tm('\\widehat{C} =')} [_]°</span>`, ans:[90-b], hint:`Trong tam giác vuông, hai góc nhọn phụ nhau: ${tm(`\\widehat{B} + \\widehat{C} = ${DEG(90)}`)}.`,
    sol:`${tm(`\\widehat{C} = ${DEG(90)} - ${DEG(b)} = ${DEG(90-b)}`)}. Vậy ${tb(`\\widehat{C} = ${DEG(90-b)}`)}.`});
  if(lv===2){ const a=R(5,30), f=pick(['sin','cos']), leg=f==='sin'?'AC':'AB', v=r2(trig(f,b)), res=a*v;
    return QB({text:`Cho tam giác ${tm('ABC')} vuông tại ${tm('A')} có ${tm(`BC = ${a}`)} cm, ${tm(`\\widehat{B} = ${DEG(b)}`)}. Biết ${tm(`\\${f} ${DEG(b)} \\approx ${tdec(v)}`)}. Tính ${tm(leg)} (làm tròn đến hàng phần mười).`,
      fig:fg({bc:`${a} cm`,[leg==='AC'?'ac':'ab']:'?'}), tpl:eqB(leg,'&nbsp;cm'), ans:ansR(res,a*trig(f,b)), hint:TR,
      sol:`${tm(`${leg} = BC\\cdot\\${f} B \\approx ${a}\\cdot ${tdec(v)} = ${tdec(res)}`)}. Vậy ${tb(`${leg} \\approx ${tdec(R1(res))}\\text{ cm}`)}.`}); }
  const c=R(4,20), t=r2(trig('tan',b)), co=r2(trig('cos',b)), ac=c*t, bc=c/co;
  return QB({text:`Cho tam giác ${tm('ABC')} vuông tại ${tm('A')} có ${tm(`AB = ${c}`)} cm, ${tm(`\\widehat{B} = ${DEG(b)}`)}. Biết ${tm(`\\tan ${DEG(b)} \\approx ${tdec(t)}`)}, ${tm(`\\cos ${DEG(b)} \\approx ${tdec(co)}`)}. Tính ${tm('AC')} và ${tm('BC')} (làm tròn đến hàng phần mười).`,
    fig:fg({ab:`${c} cm`,ac:'?',bc:'?'}), tpl:`<span class="eq">${tm('AC \\approx')} [_] cm</span><br><span class="eq">${tm('BC \\approx')} [_] cm</span>`,
    ans:[...ansR(ac,c*trig('tan',b)),...ansR(bc,c/trig('cos',b))],
    hint:`${tm('AC = AB\\cdot\\tan B')}; ${tm('AB = BC\\cdot\\cos B')} nên ${tm('BC = \\dfrac{AB}{\\cos B}')}.`,
    sol:`${tm(`AC = AB\\cdot\\tan B \\approx ${c}\\cdot ${tdec(t)} = ${tdec(ac)}`)}; ${tm(`BC = ${tf('AB','\\cos B')} \\approx ${tf(c,tdec(co))} \\approx ${tdec(Math.round(bc*1000)/1000)}`)}. Vậy ${tb(`AC \\approx ${tdec(R1(ac))}\\text{ cm}`)}, ${tb(`BC \\approx ${tdec(R1(bc))}\\text{ cm}`)}.`});
};
const g12d = lv => {   // bài toán thực tế
  if(lv===1){ if(Math.random()<.5){ const L=R(4,9), v=L/2;
      return QB({text:`Một chiếc thang dài <b>${L} m</b> dựa vào tường, thang tạo với mặt đất một góc ${tm(DEG(60))}. Hỏi chân thang cách chân tường bao nhiêu mét?`,
        fig:rtTriSVG({n:['A','B','C'],w:.5,h:.866,bc:`${L} m`,ac:'?',aC:'60°'}), tpl:'[_] m', ans:[v],
        hint:`Thang, tường và mặt đất tạo thành tam giác vuông tại chân tường ${tm('A')}. Khoảng cách cần tìm là cạnh kề với góc ${tm(DEG(60))}.`,
        sol:`${tm(`AC = BC\\cdot\\cos C = ${L}\\cdot\\cos ${DEG(60)} = ${L}\\cdot${tf(1,2)} = ${tdec(v)}`)}. Chân thang cách tường ${tb(`${tdec(v)}\\text{ m}`)}.`}); }
    const s=R(5,20);
    return QB({text:`Bóng của một cây trên mặt đất dài <b>${s} m</b>, tia nắng mặt trời tạo với mặt đất một góc ${tm(DEG(45))}. Tính chiều cao của cây.`,
      fig:rtTriSVG({n:['A','B','C'],w:1,h:1,ac:`${s} m`,ab:'?',aC:'45°'}), tpl:'[_] m', ans:[s],
      hint:`Cây (${tm('AB')}), bóng (${tm('AC')}) và tia nắng tạo thành tam giác vuông tại gốc cây ${tm('A')}. Dùng ${tm('AB = AC\\cdot\\tan C')}.`,
      sol:`${tm(`AB = AC\\cdot\\tan C = ${s}\\cdot\\tan ${DEG(45)} = ${s}\\cdot 1 = ${s}`)}. Cây cao ${tb(`${s}\\text{ m}`)}.`}); }
  let al; do{al=R(25,65)}while(al===45);
  if(lv===2){ const s=R(6,25), t=r2(trig('tan',al)), h=s*t, obj=pick(['một cột cờ','một toà nhà','một cây thông']);
    return QB({text:`Bóng của ${obj} trên mặt đất dài <b>${s} m</b>, tia nắng tạo với mặt đất góc ${tm(DEG(al))}. Biết ${tm(`\\tan ${DEG(al)} \\approx ${tdec(t)}`)}. Tính chiều cao của ${obj.replace('một ','')} (làm tròn đến hàng phần mười).`,
      fig:rtTriSVG({n:['A','B','C'],w:1,h:trig('tan',al),ac:`${s} m`,ab:'?',aC:`${al}°`}), tpl:'[_] m', ans:ansR(h,s*trig('tan',al)),
      hint:`Chiều cao ${tm('AB')}, bóng ${tm('AC')} và tia nắng tạo thành tam giác vuông tại ${tm('A')}. Chiều cao là cạnh đối, bóng là cạnh kề của góc ${tm(DEG(al))}.`,
      sol:`${tm(`AB = AC\\cdot\\tan C \\approx ${s}\\cdot ${tdec(t)} = ${tdec(h)}`)}. Chiều cao khoảng ${tb(`${tdec(R1(h))}\\text{ m}`)}.`}); }
  const L=R(30,80), hh=pick([1,1.2,1.5]), sv=r2(trig('sin',al)), H=L*sv+hh, nm=pick(NAMES);
  return QB({text:`${nm} thả diều với sợi dây dài <b>${L} m</b> (coi như căng thẳng), dây tạo với phương nằm ngang góc ${tm(DEG(al))}. Tay ${nm} cầm dây ở độ cao ${tm(tdec(hh))} m so với mặt đất. Biết ${tm(`\\sin ${DEG(al)} \\approx ${tdec(sv)}`)}. Hỏi diều bay cao bao nhiêu mét so với mặt đất (làm tròn đến hàng phần mười)?`,
    fig:rtTriSVG({n:['A','B','C'],w:trig('cos',al),h:trig('sin',al),bc:`${L} m`,ab:'?',aC:`${al}°`}), tpl:'[_] m', ans:ansR(H,L*trig('sin',al)+hh),
    hint:`Gọi ${tm('C')} là tay cầm dây, ${tm('B')} là diều, ${tm('A')} là hình chiếu của ${tm('B')} trên đường nằm ngang qua ${tm('C')}. Tính ${tm('AB')} trong tam giác vuông rồi cộng thêm độ cao của tay.`,
    sol:`${tm(`AB = BC\\cdot\\sin C \\approx ${L}\\cdot ${tdec(sv)} = ${tdec(L*sv)}`)}. Độ cao của diều: ${tm(`${tdec(L*sv)} + ${tdec(hh)} = ${tdec(H)}`)}, khoảng ${tb(`${tdec(R1(H))}\\text{ m}`)}.`});
};

lesson(4,'ti-so-luong-giac','Bài 11. Tỉ số lượng giác của góc nhọn','Định nghĩa sin, cos, tan, cot; tính tỉ số; hai góc phụ nhau; giá trị của góc đặc biệt.',[g11a,g11b,g11c,g11d]);
lesson(4,'he-thuc-canh-goc','Bài 12. Một số hệ thức giữa cạnh, góc trong tam giác vuông và ứng dụng','Hệ thức cạnh – góc; tính cạnh, giải tam giác vuông; bài toán thực tế.',[g12a,g12b,g12c,g12d]);
lesson(4,'on-tap-c4','Ôn tập chương IV','Tổng hợp: tỉ số lượng giác, góc phụ nhau, góc đặc biệt, giải tam giác vuông, ứng dụng.',[g11b,g11c,g11d,g12b,g12c,g12d]);

/* =====================================================================
   CHƯƠNG V – ĐƯỜNG TRÒN (Bài 13–17). Hình vẽ bằng circleSVG (figures.js).
   Khối { } riêng để tên hằng không trùng các chương trên.
   ===================================================================== */
{
const m = tm, dg = x => `${x}^\\circ`, hat = s => `\\widehat{${s}}`, arcS = s => `\\text{sđ}\\,\\overset{\\frown}{${s}}`;
const cm = x => `${tdec(x)}\\text{ cm}`, sq = x => `\\sqrt{${x}}`;
const at = (r, a) => [r*Math.cos(a*Math.PI/180), r*Math.sin(a*Math.PI/180)];
const dirOf = (p, q) => Math.atan2(q[1]-p[1], q[0]-p[0])*180/Math.PI;
const rightAt = (A, P, Q) => { const a1 = dirOf(A, P), a2 = dirOf(A, Q); return [A[0], A[1], Math.abs(((a2-a1+540)%360)-180-90) < 1 ? a1 : a2]; };   // kí hiệu vuông tại A giữa AP, AQ
const POS = ['Nằm trong đường tròn', 'Nằm trên đường tròn', 'Nằm ngoài đường tròn'];
const LINE = ['Cắt nhau (2 điểm chung)', 'Tiếp xúc (1 điểm chung)', 'Không giao nhau (0 điểm chung)'];
const TWO = ['Cắt nhau', 'Tiếp xúc ngoài', 'Tiếp xúc trong', 'Ở ngoài nhau', 'Đựng nhau'];
const TRIP = [[3,4,5],[6,8,10],[5,12,13],[8,15,17],[9,12,15],[7,24,25],[12,16,20]];
const pos3 = (R, d) => d < R ? 0 : d === R ? 1 : 2;

/* ---------- Bài 13. Mở đầu về đường tròn ---------- */
const g13a = lv => {   // vị trí của điểm đối với đường tròn
  const k = R(0,2);
  if(lv === 3){ const t = pick(TRIP.slice(0,4)), sw = Math.random()<.5, a = (sw?t[0]:t[1])*pick([-1,1]), b = (sw?t[1]:t[0])*pick([-1,1]), c = t[2], Rr = c + [1,0,-1][k];
    return QC({text:`Trong mặt phẳng tọa độ ${m('Oxy')}, cho đường tròn ${m(`(O;\\,${Rr})`)} với ${m('O')} là gốc tọa độ và điểm ${m(`M({${a}};\\,{${b}})`)}. Điểm ${m('M')}`, opts:POS, ans:POS[k], keepOrder:true,
      hint:`Tính ${m('OM = \\sqrt{x_M^2 + y_M^2}')} rồi so sánh với bán kính.`, sol:`${m(`OM = \\sqrt{${a*a} + ${b*b}} = ${c}`)} ${m(['\\lt','=','\\gt'][k])} ${Rr} nên điểm ${m('M')} <b>${POS[k].toLowerCase()}</b>.`}); }
  let Rr, d, show, showR;
  if(lv === 1){ Rr = R(3,9); d = [R(1,Rr-1), Rr, Rr+R(1,5)][k]; show = cm(d); showR = cm(Rr); }
  else { Rr = R(15,60); d = [Rr-R(2,12), Rr, Rr+R(2,12)][k]; showR = cm(Rr/10); show = `${d}\\text{ mm}`; }
  return QC({text:`Cho đường tròn ${m(`(O;\\,${showR})`)} và điểm ${m('M')} với ${m(`OM = ${show}`)}. Điểm ${m('M')}`, opts:POS, ans:POS[k], keepOrder:true,
    fig:lv===1 ? circleSVG({C:[{x:0,y:0,r:Rr,lab:'O'}], S:[[0,0,...at(Rr,-30),false,m(`R = ${Rr}`)]]}) : '',
    hint:`So sánh ${m('OM')} với bán kính ${m('R')}${lv===2?' (đổi về cùng đơn vị)':''}: ${m('OM \\lt R')} thì nằm trong, ${m('OM = R')} thì nằm trên, ${m('OM \\gt R')} thì nằm ngoài.`,
    sol:`${lv===2?`${m(`R = ${showR} = ${Rr}\\text{ mm}`)}; `:''}${m(`OM = ${lv===2?d+'\\text{ mm}':show}`)} ${m(['\\lt','=','\\gt'][k])} ${m('R')} nên điểm ${m('M')} <b>${POS[k].toLowerCase()}</b>.`});
};
const g13b = lv => {   // bán kính – đường kính
  if(lv === 3){ const t = pick(TRIP), sw = Math.random()<.5, b = sw?t[0]:t[1], c = sw?t[1]:t[0], h = t[2];
    return QB({text:`Cho tam giác ${m('ABC')} vuông tại ${m('A')} có ${m(`AB = ${b}`)} cm, ${m(`AC = ${c}`)} cm. Tính bán kính đường tròn đi qua ba điểm ${m('A, B, C')}.`, tpl:`${m('R =')} [_] cm`, ans:[h/2],
      hint:`Trong tam giác vuông, trung điểm cạnh huyền cách đều ba đỉnh; bán kính bằng nửa cạnh huyền ${m('BC')}.`,
      sol:`${m(`BC = \\sqrt{${b*b} + ${c*c}} = ${h}`)} cm. Tâm là trung điểm ${m('O')} của ${m('BC')}, nên ${m(`R = \\dfrac{BC}{2} =`)} ${tb(tdec(h/2))} cm.`,
      fig:circleSVG({C:[{x:0,y:0,r:h/2,lab:'O'}], P:[[-h/2,0,'B'],[h/2,0,'C'],[(c*c-b*b)/(2*h), b*c/h,'A']], S:[[-h/2,0,h/2,0],[-h/2,0,(c*c-b*b)/(2*h),b*c/h],[h/2,0,(c*c-b*b)/(2*h),b*c/h]]})}); }
  const toD = Math.random() < .5, Rr = lv===1 ? R(2,15) : R(3,30)/2;
  if(lv === 2){ const AB = 2*Rr; return QB({text:`Cho ${m('AB')} là một đường kính của đường tròn ${m('(O)')}, ${m(`AB = ${cm(AB)}`)}. Điểm ${m('C')} thuộc đường tròn. Tính ${m('OC')}.`, tpl:`${m('OC =')} [_] cm`, ans:[Rr],
    hint:'Tâm O là trung điểm của đường kính; mọi điểm trên đường tròn cách tâm một khoảng bằng bán kính.', sol:`${m(`OC = R = \\dfrac{AB}{2} =`)} ${tb(tdec(Rr))} cm.`}); }
  return toD ? QB({text:`Đường tròn ${m(`(O;\\,${cm(Rr)})`)} có đường kính bằng bao nhiêu?`, tpl:'[_] cm', ans:[2*Rr], hint:'Đường kính bằng hai lần bán kính.', sol:`${m(`2R = 2\\cdot ${Rr} =`)} ${tb(2*Rr)} cm.`})
             : QB({text:`Một đường tròn có đường kính ${m(cm(2*Rr))}. Bán kính của nó bằng bao nhiêu?`, tpl:'[_] cm', ans:[Rr], hint:'Bán kính bằng một nửa đường kính.', sol:`${m(`R = \\dfrac{${2*Rr}}{2} =`)} ${tb(Rr)} cm.`});
};
const g13c = lv => {   // tính đối xứng
  if(lv === 1){ const q = pick([['Tâm đối xứng của đường tròn là', ['Tâm của đường tròn','Một điểm bất kì trên đường tròn','Một điểm bất kì','Đường tròn không có tâm đối xứng'], 'Đường tròn là hình có tâm đối xứng; tâm đối xứng chính là tâm của nó.'],
      ['Đường tròn có bao nhiêu trục đối xứng?', ['Vô số','1','2','0'], 'Mỗi đường thẳng đi qua tâm (chứa một đường kính) đều là trục đối xứng, nên có vô số trục.'],
      ['Trục đối xứng của đường tròn là', ['Mọi đường thẳng đi qua tâm','Mọi dây của đường tròn','Mọi tiếp tuyến của đường tròn','Chỉ một đường kính cố định'], 'Mọi đường thẳng đi qua tâm đều là trục đối xứng của đường tròn.']]);
    return QC({text:q[0], opts:q[1], ans:q[1][0], hint:'Nhớ lại tính đối xứng của đường tròn: tâm đối xứng và trục đối xứng.', sol:`${q[2]} Đáp án: <b>${q[1][0]}</b>.`}); }
  const a = sR(1,5), b = sR(1,5), t = pick([[3,4],[4,3],[0,5],[5,0],[6,8],[8,6]]).map(v => v*pick([-1,1])), x = a+t[0], y = b+t[1], r = Math.hypot(...t), xp = 2*a-x, yp = 2*b-y;
  if(lv === 2) return QB({text:`Cho đường tròn tâm ${m(`I({${a}};\\,{${b}})`)} đi qua điểm ${m(`A({${x}};\\,{${y}})`)}. Tìm tọa độ điểm ${m("A'")} đối xứng với ${m('A')} qua tâm ${m('I')}.`, tpl:`${m("A'(")}[_]${m(';')} [_]${m(')')}`, ans:[xp, yp],
    hint:`${m('I')} là trung điểm của ${m("AA'")}: ${m("x_{A'} = 2x_I - x_A,\\ y_{A'} = 2y_I - y_A")}.`, sol:`${m(`x_{A'} = 2\\cdot${tp(a)} - ${tp(x)} = ${xp}`)}, ${m(`y_{A'} = 2\\cdot${tp(b)} - ${tp(y)} = ${yp}`)}. Vậy ${tb(`A'({${xp}};\\,{${yp}})`)}. ${m("A'")} cũng thuộc đường tròn.`});
  return QB({text:`Cho đường tròn tâm ${m(`I({${a}};\\,{${b}})`)} đi qua ${m(`A({${x}};\\,{${y}})`)}. Tính bán kính ${m('R')} và tìm điểm ${m("A'")} đối xứng với ${m('A')} qua ${m('I')}.`, tpl:`${m('R =')} [_] &nbsp; ${m("A'(")}[_]${m(';')} [_]${m(')')}`, ans:[r, xp, yp],
    hint:`${m('R = IA = \\sqrt{(x_A - x_I)^2 + (y_A - y_I)^2}')}; ${m('I')} là trung điểm ${m("AA'")}.`, sol:`${m(`R = \\sqrt{${t[0]*t[0]} + ${t[1]*t[1]}} = ${r}`)}; ${m(`A'({${xp}};\\,{${yp}})`)}. Đáp án: ${tb(`R = ${r};\\ A'({${xp}};\\,{${yp}})`)}.`});
};
const g13d = lv => {   // điều kiện của R để M ở vị trí cho trước
  const d = R(3,12), cases = lv===3 ? [['không nằm ngoài','R \\ge '+d],['không nằm trong','R \\le '+d]] : [['nằm trong','R \\gt '+d],['nằm trên','R = '+d],['nằm ngoài','R \\lt '+d]], c = pick(cases);
  const opts = [`R \\gt ${d}`, `R \\lt ${d}`, `R = ${d}`, `R \\ge ${d}`, `R \\le ${d}`];
  return QC({text:`Cho điểm ${m('M')} với ${m(`OM = ${d}`)} cm. Điểm ${m('M')} <b>${c[0]}</b> đường tròn ${m('(O;\\,R)')} khi và chỉ khi`, opts:(lv===3?opts:opts.slice(0,3)).map(x => m(x+'\\text{ cm}')), ans:m(c[1]+'\\text{ cm}'), keepOrder:true,
    hint:`M nằm trong ⇔ ${m('OM \\lt R')}; nằm trên ⇔ ${m('OM = R')}; nằm ngoài ⇔ ${m('OM \\gt R')}.${lv===3?' “Không nằm ngoài” nghĩa là nằm trong hoặc nằm trên.':''}`,
    sol:`M ${c[0]} đường tròn ⇔ ${tb(c[1]+'\\text{ cm}')}.`});
};

/* ---------- Bài 14. Cung và dây của một đường tròn ---------- */
const figAOB = (al, labs=true) => { const a1 = 90 - al/2, a2 = 90 + al/2, A = at(4, a2), B = at(4, a1);
  return circleSVG({C:[{x:0,y:0,r:4,lab:'O'}], P:[[...A,'A'],[...B,'B']], S:[[0,0,...A],[0,0,...B]], ang:[[0,0,a1,a2,labs?'':'']], arc:{x:0,y:0,r:4,a1,a2}}); };
const g14a = lv => {   // góc ở tâm và số đo cung
  if(lv === 3){ const x = R(10,80), al = 180-2*x;
    return QB({text:`Cho ${m('A, B')} thuộc đường tròn ${m('(O)')} sao cho ${m(`${hat('OAB')} = ${dg(x)}`)}. Tính số đo cung nhỏ ${m('AB')} và cung lớn ${m('AB')}.`, tpl:`Cung nhỏ: [_]${m('^\\circ')} &nbsp; Cung lớn: [_]${m('^\\circ')}`, ans:[al, 360-al], fig:figAOB(al),
      hint:`Tam giác ${m('OAB')} cân tại ${m('O')} nên tính được ${m(hat('AOB'))}; số đo cung nhỏ bằng góc ở tâm, cung lớn bằng ${m('360^\\circ')} trừ cung nhỏ.`,
      sol:`${m(`${hat('AOB')} = 180^\\circ - 2\\cdot ${dg(x)} = ${dg(al)}`)}. Cung nhỏ: ${tb(dg(al))}; cung lớn: ${m(`360^\\circ - ${dg(al)} =`)} ${tb(dg(360-al))}.`}); }
  const al = 5*R(4,34), big = lv === 2;
  return QB({text:`Cho ${m('A, B')} thuộc đường tròn ${m('(O)')} với ${m(`${hat('AOB')} = ${dg(al)}`)}. Tính số đo cung ${big?'lớn':'nhỏ'} ${m('AB')}.`, tpl:`${m(arcS('AB')+' =')} [_]${m('^\\circ')}`, ans:[big?360-al:al], fig:figAOB(al),
    hint:big?`Số đo cung lớn bằng ${m('360^\\circ')} trừ số đo cung nhỏ (cung nhỏ bằng góc ở tâm).`:'Số đo của cung nhỏ bằng số đo góc ở tâm chắn cung đó.',
    sol:big?`Cung nhỏ ${m('AB')} có số đo ${m(dg(al))}, nên cung lớn có số đo ${m(`360^\\circ - ${dg(al)} =`)} ${tb(dg(360-al))}.`:`${m(`${arcS('AB')} = ${hat('AOB')} =`)} ${tb(dg(al))}.`});
};
const g14b = lv => {   // độ dài dây ↔ góc ở tâm
  const all = [['R',60,'Tam giác OAB có OA = OB = AB = R nên là tam giác đều'],['2R',180,'AB = 2R nên AB là đường kính, A, O, B thẳng hàng'],['R\\sqrt{2}',90,'OA² + OB² = 2R² = AB² nên tam giác OAB vuông tại O (Pythagore đảo)'],['R\\sqrt{3}',120,'Gọi H là trung điểm AB thì OH ⊥ AB, sin AOH = AH : OA = √3 : 2 nên góc AOH = 60°']];
  const c = pick(lv===1 ? all.slice(0,2) : all), Rr = R(2,9), AB = lv===3 ? (c[0]==='R'?String(Rr):c[0]==='2R'?String(2*Rr):c[0].replace('R', Rr)) : c[0];
  return QC({text:`Dây ${m('AB')} của đường tròn ${m(lv===3?`(O;\\,${Rr}\\text{ cm})`:'(O;\\,R)')} có ${m(`AB = ${AB}${lv===3?'\\text{ cm}':''}`)}. Số đo góc ở tâm ${m(hat('AOB'))} là`, opts:[60,90,120,180].map(x => m(dg(x))), ans:m(dg(c[1])), keepOrder:true,
    hint:'Xét tam giác OAB có OA = OB = R: so sánh AB với R để nhận dạng tam giác.', sol:`${c[2]}. Vậy ${m(hat('AOB')+' =')} ${tb(dg(c[1]))}.`});
};
const CH = [[5,3,4],[5,4,3],[10,6,8],[10,8,6],[13,5,12],[13,12,5],[17,8,15],[17,15,8],[25,7,24],[15,9,12],[15,12,9]];
const g14c = lv => {   // khoảng cách từ tâm đến dây – độ dài dây
  const [Rr, d, h] = pick(lv===1 ? CH.slice(0,6) : CH), s = 4/Rr, fig = circleSVG({C:[{x:0,y:0,r:Rr*s,lab:'O'}], P:[[-h*s,d*s,'A'],[h*s,d*s,'B'],[0,d*s,'H',90]], S:[[-h*s,d*s,h*s,d*s],[0,0,0,d*s,true],[0,0,-h*s,d*s]], right:[rightAt([0,d*s],[0,0],[h*s,d*s])]});
  const base = `Cho đường tròn ${m('(O)')}, dây ${m('AB')}; ${m('H')} là trung điểm của ${m('AB')} (khi đó ${m('OH \\perp AB')}). `;
  if(lv === 1) return QB({text:base + `Biết ${m(`R = ${Rr}`)} cm, ${m(`OH = ${d}`)} cm. Tính độ dài dây ${m('AB')}.`, tpl:`${m('AB =')} [_] cm`, ans:[2*h], fig,
    hint:`Tam giác ${m('OHA')} vuông tại ${m('H')}: ${m('AH = \\sqrt{OA^2 - OH^2}')}, rồi ${m('AB = 2AH')}.`, sol:`${m(`AH = \\sqrt{${Rr}^2 - ${d}^2} = ${h}`)} cm, ${m(`AB = 2\\cdot ${h} =`)} ${tb(2*h)} cm.`});
  if(lv === 2) return QB({text:base + `Biết ${m(`R = ${Rr}`)} cm, ${m(`AB = ${2*h}`)} cm. Tính khoảng cách ${m('OH')} từ tâm đến dây.`, tpl:`${m('OH =')} [_] cm`, ans:[d], fig,
    hint:`${m('AH = AB : 2')}; tam giác ${m('OHA')} vuông tại ${m('H')} nên ${m('OH = \\sqrt{OA^2 - AH^2}')}.`, sol:`${m(`AH = ${h}`)} cm, ${m(`OH = \\sqrt{${Rr}^2 - ${h}^2} =`)} ${tb(d)} cm.`});
  return QB({text:base + `Biết ${m(`AB = ${2*h}`)} cm và khoảng cách từ tâm đến dây là ${m(`OH = ${d}`)} cm. Tính bán kính.`, tpl:`${m('R =')} [_] cm`, ans:[Rr], fig,
    hint:`${m('R = OA = \\sqrt{OH^2 + AH^2}')} với ${m('AH = AB : 2')}.`, sol:`${m(`R = \\sqrt{${d}^2 + ${h}^2} =`)} ${tb(Rr)} cm.`});
};
const g14d = lv => {
  if(lv === 3){ const a = 5*R(4,16), b = 5*R(4,34-a/5);
    return QB({text:`Trên đường tròn ${m('(O)')} lấy ba điểm ${m('A, B, C')} sao cho tia ${m('OB')} nằm giữa hai tia ${m('OA, OC')}, ${m(`${hat('AOB')} = ${dg(a)}`)}, ${m(`${hat('BOC')} = ${dg(b)}`)}. Tính số đo cung nhỏ ${m('AC')}.`, tpl:`[_]${m('^\\circ')}`, ans:[a+b],
      hint:'Góc ở tâm AOC bằng tổng hai góc AOB và BOC (tia OB nằm giữa); số đo cung nhỏ bằng góc ở tâm.', sol:`${m(`${hat('AOC')} = ${dg(a)} + ${dg(b)} = ${dg(a+b)}`)} nên ${m(arcS('AC')+' =')} ${tb(dg(a+b))}.`}); }
  const Rr = R(3,12);
  if(lv === 1) return QC({text:`Dây lớn nhất của đường tròn ${m(`(O;\\,${Rr}\\text{ cm})`)} có độ dài bằng`, opts:[2*Rr, Rr, Rr+2, 4*Rr].map(x => `${x} cm`), ans:`${2*Rr} cm`,
    hint:'Trong các dây của một đường tròn, dây lớn nhất là đường kính.', sol:`Dây lớn nhất là đường kính: ${m(`2R = 2\\cdot${Rr} =`)} ${tb(2*Rr)} cm.`});
  const bad = 2*Rr + R(1,4), ok3 = [2*Rr, 2*Rr-1, Rr+1];
  return QC({text:`Độ dài nào dưới đây <b>không thể</b> là độ dài một dây của đường tròn ${m(`(O;\\,${Rr}\\text{ cm})`)}?`, opts:[bad, ...ok3].map(x => `${x} cm`), ans:`${bad} cm`,
    hint:'Mọi dây đều không lớn hơn đường kính 2R.', sol:`Đường kính bằng ${2*Rr} cm là dây lớn nhất, nên dây dài ${tb(bad)} cm là không thể.`});
};

/* ---------- Bài 15. Độ dài cung tròn. Hình quạt tròn, hình vành khuyên ---------- */
const NS = [30,36,40,45,60,72,90,120,135,150];
const arcPick = () => { const n = pick(NS), base = 180/gcd(180,n); let Rr; do{ Rr = base*R(1,6) }while(Rr > 30); return {n, Rr, k:Rr*n/180}; };
const g15a = lv => {   // độ dài đường tròn, độ dài cung
  if(lv === 1){ const Rr = R(2,20); return QB({text:`Tính độ dài ${m('C')} của đường tròn bán kính ${m(cm(Rr))} (kết quả viết theo ${m('\\pi')}).`, tpl:`${m('C =')} [_]${m('\\pi')} cm`, ans:[2*Rr],
    hint:`${m('C = 2\\pi R')}.`, sol:`${m(`C = 2\\pi\\cdot ${Rr} =`)} ${tb(`${2*Rr}\\pi`)} cm.`}); }
  const {n, Rr, k} = arcPick(), fig = circleSVG({C:[{x:0,y:0,r:3,lab:'O'}], S:[[0,0,...at(3,20)],[0,0,...at(3,20+n)]], arc:{x:0,y:0,r:3,a1:20,a2:20+n}, ang:[[0,0,20,20+n,m(dg(n))]]});
  if(lv === 2) return QB({text:`Tính độ dài cung ${m(dg(n))} của đường tròn bán kính ${m(cm(Rr))} (theo ${m('\\pi')}).`, tpl:`${m('l =')} [_]${m('\\pi')} cm`, ans:[k], fig,
    hint:`${m('l = \\dfrac{\\pi R n}{180}')}.`, sol:`${m(`l = \\dfrac{\\pi\\cdot ${Rr}\\cdot ${n}}{180} =`)} ${tb(`${k}\\pi`)} cm.`});
  return QB({text:`Một cung tròn có số đo ${m(dg(n))} và độ dài ${m(`${k}\\pi`)} cm. Tính bán kính của đường tròn.`, tpl:`${m('R =')} [_] cm`, ans:[Rr], fig,
    hint:`Từ ${m('l = \\dfrac{\\pi R n}{180}')} suy ra ${m('R = \\dfrac{180\\, l}{\\pi n}')}.`, sol:`${m(`R = \\dfrac{180\\cdot ${k}\\pi}{\\pi\\cdot ${n}} =`)} ${tb(Rr)} cm.`});
};
const g15b = lv => {   // diện tích hình quạt
  if(lv === 3){ const l = R(3,20), Rr = 2*R(2,10); return QB({text:`Một hình quạt tròn bán kính ${m(cm(Rr))} có độ dài cung là ${m(cm(l))}. Tính diện tích hình quạt đó.`, tpl:'[_] cm²', ans:[l*Rr/2],
    hint:`${m('S = \\dfrac{l R}{2}')}.`, sol:`${m(`S = \\dfrac{${l}\\cdot ${Rr}}{2} =`)} ${tb(l*Rr/2)} cm².`}); }
  let n, Rr, k; do{ n = pick(lv===1 ? [90,180,60,120] : NS); Rr = R(2,lv===1?12:18); k = Rr*Rr*n/360; }while(!Number.isInteger(k));
  return QB({text:`Tính diện tích hình quạt tròn bán kính ${m(cm(Rr))}, ứng với cung ${m(dg(n))} (theo ${m('\\pi')}).`, tpl:`${m('S =')} [_]${m('\\pi')} cm²`, ans:[k],
    fig:circleSVG({C:[{x:0,y:0,r:3,lab:'O'}], sector:{x:0,y:0,r:3,a1:30,a2:30+n}, S:[[0,0,...at(3,30)],[0,0,...at(3,30+n)]], ang:[[0,0,30,30+n,m(dg(n))]]}),
    hint:`${m('S_{quạt} = \\dfrac{\\pi R^2 n}{360}')}.`, sol:`${m(`S = \\dfrac{\\pi\\cdot ${Rr}^2\\cdot ${n}}{360} =`)} ${tb(`${k}\\pi`)} cm².`});
};
const g15c = lv => {   // hình vành khuyên
  const r = R(1,9), Rr = r + R(1,8), k = Rr*Rr - r*r, fig = circleSVG({C:[{x:0,y:0,r:4,lab:'O'},{x:0,y:0,r:4*r/Rr}], ring:{x:0,y:0,r1:4,r2:4*r/Rr}, S:[[0,0,...at(4,20),false,'R'],[0,0,...at(4*r/Rr,200),false,'r']]});
  if(lv === 3) return QB({text:`Hình vành khuyên giới hạn bởi hai đường tròn đồng tâm có diện tích ${m(`${k}\\pi`)} cm²; bán kính đường tròn lớn là ${m(cm(Rr))}. Tính bán kính đường tròn nhỏ.`, tpl:`${m('r =')} [_] cm`, ans:[r], fig,
    hint:`${m('S = \\pi(R^2 - r^2)')} suy ra ${m('r^2 = R^2 - \\dfrac{S}{\\pi}')}.`, sol:`${m(`r^2 = ${Rr*Rr} - ${k} = ${r*r}`)} nên ${m('r =')} ${tb(r)} cm.`});
  const dia = lv === 2;
  return QB({text:`Tính diện tích hình vành khuyên giới hạn bởi hai đường tròn đồng tâm có ${dia?`đường kính ${m(cm(2*Rr))} và ${m(cm(2*r))}`:`bán kính ${m(cm(Rr))} và ${m(cm(r))}`} (theo ${m('\\pi')}).`, tpl:`${m('S =')} [_]${m('\\pi')} cm²`, ans:[k], fig,
    hint:`${m('S = \\pi(R^2 - r^2)')}${dia?' – nhớ đổi đường kính ra bán kính':''}.`, sol:`${dia?`${m(`R = ${Rr},\\ r = ${r}`)}. `:''}${m(`S = \\pi(${Rr}^2 - ${r}^2) =`)} ${tb(`${k}\\pi`)} cm².`});
};
const g15d = lv => {   // bài toán thực tế, π ≈ 3,14
  const r2 = v => Math.round(v*100)/100, r1 = v => Math.round(v*10)/10;
  if(lv === 1){ const Rr = R(2,30), v = r2(6.28*Rr); return QB({text:`Một chiếc đĩa hình tròn bán kính ${m(cm(Rr))}. Tính chu vi của đĩa (lấy ${m('\\pi \\approx 3{,}14')}).`, tpl:'[_] cm', ans:[[v, r2(2*Math.PI*Rr), r1(2*Math.PI*Rr)]], wide:true,
    hint:`${m('C = 2\\pi R')}.`, sol:`${m(`C \\approx 2\\cdot 3{,}14\\cdot ${Rr} =`)} ${tb(tdec(v))} cm.`}); }
  if(lv === 2){ const D = 5*R(10,16), n = 10*R(2,50), v = r2(3.14*D*n/100); return QB({text:`Bánh xe đạp có đường kính ${m(cm(D))}. Khi bánh xe lăn được ${n} vòng thì xe đi được bao nhiêu mét (lấy ${m('\\pi \\approx 3{,}14')})?`, tpl:'[_] m', ans:[[v, r2(Math.PI*D*n/100), r1(Math.PI*D*n/100)]], wide:true,
    hint:`Mỗi vòng xe đi được đúng chu vi bánh ${m('\\pi d')}; nhân với số vòng rồi đổi cm ra m.`, sol:`Mỗi vòng: ${m(`3{,}14\\cdot ${D} = ${tdec(3.14*D)}`)} cm. ${n} vòng: ${m(`${tdec(3.14*D)}\\cdot ${n} = ${tdec(r2(3.14*D*n))}`)} cm ${m('=')} ${tb(tdec(v))} m.`}); }
  const r = R(4,12), t = pick([5,10,15,20,30,40,45]), v = r2(2*3.14*r*t/60);
  return QB({text:`Kim phút của một đồng hồ dài ${m(cm(r))}. Trong ${t} phút, đầu kim phút đi được quãng đường bao nhiêu xăng-ti-mét (lấy ${m('\\pi \\approx 3{,}14')}, làm tròn đến hàng phần trăm)?`, tpl:'[_] cm', ans:[[v, r2(2*Math.PI*r*t/60)]],
    hint:`Trong 60 phút kim quay một vòng (${m('360^\\circ')}), nên ${t} phút ứng với cung ${m(dg(6*t))}; dùng ${m('l = \\dfrac{\\pi R n}{180}')}.`,
    sol:`Cung ${m(dg(6*t))}: ${m(`l \\approx \\dfrac{3{,}14\\cdot ${r}\\cdot ${6*t}}{180} \\approx`)} ${tb(tdec(v))} cm.`});
};

/* ---------- Bài 16. Vị trí tương đối của đường thẳng và đường tròn ---------- */
const g16a = lv => {
  const k = R(0,2);
  if(lv === 3){ const a = sR(1,6), b = sR(1,6), ax = pick(['Ox','Oy']), d = Math.abs(ax==='Ox' ? b : a), Rr = d + [1,0,-1][k];
    if(Rr < 1) return g16a(3);
    return QC({text:`Trong mặt phẳng tọa độ, đường tròn tâm ${m(`I({${a}};\\,{${b}})`)} bán kính ${m(`R = ${Rr}`)} và trục ${m(ax)} có vị trí tương đối nào?`, opts:LINE, ans:LINE[k], keepOrder:true,
      hint:`Khoảng cách từ ${m('I')} đến trục ${m(ax)} bằng ${ax==='Ox'?'|tung độ|':'|hoành độ|'} của ${m('I')}; so sánh với ${m('R')}.`, sol:`${m(`d = |${ax==='Ox'?b:a}| = ${d}`)} ${m(['\\lt','=','\\gt'][k])} ${m(`R = ${Rr}`)} nên <b>${LINE[k].toLowerCase()}</b>.`}); }
  let Rr, d, sR_, sd;
  if(lv === 1){ Rr = R(3,12); d = [R(1,Rr-1), Rr, Rr+R(1,6)][k]; sR_ = cm(Rr); sd = cm(d); }
  else { Rr = R(15,80); d = [Rr-R(2,12), Rr, Rr+R(2,12)][k]; sR_ = cm(Rr/10); sd = `${d}\\text{ mm}`; }
  return QC({text:`Cho đường tròn ${m(`(O;\\,${sR_})`)} và đường thẳng ${m('a')} cách tâm ${m('O')} một khoảng ${m(`d = ${sd}`)}. Vị trí tương đối của ${m('a')} và ${m('(O)')} là`, opts:LINE, ans:LINE[k], keepOrder:true,
    hint:`${m('d \\lt R')}: cắt nhau; ${m('d = R')}: tiếp xúc; ${m('d \\gt R')}: không giao nhau${lv===2?' (đổi cùng đơn vị)':''}.`, sol:`${lv===2?`${m(`R = ${Rr}\\text{ mm}`)}; `:''}${m('d')} ${m(['\\lt','=','\\gt'][k])} ${m('R')} nên <b>${LINE[k].toLowerCase()}</b>.`});
};
const TAN = [[3,4,5],[5,12,13],[6,8,10],[8,15,17],[9,12,15],[7,24,25],[12,5,13],[4,3,5]];
const figTan = (Rr, t, d) => { const s = 4/d, A = [Rr*Rr/d*s, Rr*t/d*s], M = [4,0], O = [0,0];
  return circleSVG({C:[{x:0,y:0,r:Rr*s,lab:'O'}], P:[[...A,'A'],[...M,'M']], S:[[0,0,...A],[...A,...M],[0,0,...M,true]], right:[rightAt(A,O,M)]}); };
const g16b = lv => {   // tiếp tuyến vuông góc bán kính – Pythagore
  const [Rr, t, d] = pick(lv===1 ? TAN.slice(0,4) : TAN), fig = figTan(Rr, t, d), base = `Cho đường tròn ${m('(O;\\,R)')} và ${m('MA')} là tiếp tuyến tại ${m('A')} (${m('A')} là tiếp điểm). `;
  if(lv === 1) return QB({text:base + `Biết ${m(`R = ${Rr}`)} cm, ${m(`OM = ${d}`)} cm. Tính ${m('MA')}.`, tpl:`${m('MA =')} [_] cm`, ans:[t], fig,
    hint:`Tiếp tuyến vuông góc với bán kính tại tiếp điểm: tam giác ${m('OAM')} vuông tại ${m('A')}.`, sol:`${m(`MA = \\sqrt{OM^2 - OA^2} = \\sqrt{${d}^2 - ${Rr}^2} =`)} ${tb(t)} cm.`});
  if(lv === 2) return QB({text:base + `Biết ${m(`R = ${Rr}`)} cm, ${m(`MA = ${t}`)} cm. Tính ${m('OM')}.`, tpl:`${m('OM =')} [_] cm`, ans:[d], fig,
    hint:`${m('OA \\perp MA')} nên ${m('OM^2 = OA^2 + MA^2')}.`, sol:`${m(`OM = \\sqrt{${Rr}^2 + ${t}^2} =`)} ${tb(d)} cm.`});
  return QB({text:base + `Biết ${m(`MA = ${t}`)} cm, ${m(`OM = ${d}`)} cm. Tính bán kính ${m('R')}.`, tpl:`${m('R =')} [_] cm`, ans:[Rr], fig,
    hint:`Tam giác ${m('OAM')} vuông tại ${m('A')}: ${m('OA = \\sqrt{OM^2 - MA^2}')}.`, sol:`${m(`R = \\sqrt{${d}^2 - ${t}^2} =`)} ${tb(Rr)} cm.`});
};
const g16c = lv => {   // hai tiếp tuyến cắt nhau
  const be = 2*R(15,75), hf = be/2, O = [0,0], M = [5,0], Rr = 5*Math.sin(hf*Math.PI/180), A = at(Rr, 90-hf), B = at(Rr, -(90-hf));
  const fig = circleSVG({C:[{x:0,y:0,r:Rr,lab:'O'}], P:[[...A,'A'],[...B,'B'],[...M,'M']], S:[[...M,...A],[...M,...B],[0,0,...A],[0,0,...B],[0,0,...M,true]], right:[rightAt(A,O,M),rightAt(B,O,M)]});
  const base = `Từ điểm ${m('M')} nằm ngoài đường tròn ${m('(O)')} kẻ hai tiếp tuyến ${m('MA, MB')} (${m('A, B')} là tiếp điểm). `;
  if(lv === 1){ const x = R(3,20); return QB({text:base + `Biết ${m(`MA = ${x}`)} cm. Tính ${m('MB')}.`, tpl:`${m('MB =')} [_] cm`, ans:[x], fig,
    hint:'Hai tiếp tuyến cắt nhau tại một điểm thì điểm đó cách đều hai tiếp điểm.', sol:`Theo tính chất hai tiếp tuyến cắt nhau: ${m('MB = MA =')} ${tb(x)} cm.`}); }
  if(lv === 2) return QB({text:base + `Biết ${m(`${hat('AMB')} = ${dg(be)}`)}. Tính ${m(hat('AOB'))}.`, tpl:`${m(hat('AOB')+' =')} [_]${m('^\\circ')}`, ans:[180-be], fig,
    hint:`Tứ giác ${m('OAMB')} có hai góc vuông tại ${m('A')} và ${m('B')}; tổng các góc của tứ giác bằng ${m('360^\\circ')}.`, sol:`${m(`${hat('AOB')} = 360^\\circ - 90^\\circ - 90^\\circ - ${dg(be)} =`)} ${tb(dg(180-be))}.`});
  return QB({text:base + `Biết ${m(`${hat('AMB')} = ${dg(be)}`)}. Tính ${m(hat('AMO'))} và ${m(hat('AOM'))}.`, tpl:`${m(hat('AMO')+' =')} [_]${m('^\\circ')} &nbsp; ${m(hat('AOM')+' =')} [_]${m('^\\circ')}`, ans:[hf, 90-hf], fig,
    hint:`${m('MO')} là tia phân giác của ${m(hat('AMB'))}; tam giác ${m('OAM')} vuông tại ${m('A')}.`, sol:`${m(`${hat('AMO')} = \\dfrac{${dg(be)}}{2} = ${dg(hf)}`)} nên ${m(hat('AMO'))} = ${tb(dg(hf))}; ${m(`${hat('AOM')} = 90^\\circ - ${dg(hf)} =`)} ${tb(dg(90-hf))}.`});
};
const g16d = lv => {
  if(lv === 2){ const good = `${m('a')} đi qua ${m('A \\in (O)')} và ${m('a \\perp OA')} tại ${m('A')}`;
    return QC({text:`Đường thẳng ${m('a')} là tiếp tuyến của đường tròn ${m('(O)')} tại ${m('A')} nếu`, opts:[good, `${m('a')} đi qua tâm ${m('O')} và điểm ${m('A')}`, `${m('a \\perp OA')} tại ${m('O')}`, `${m('a')} cắt ${m('(O)')} tại hai điểm ${m('A, B')}`], ans:good,
      hint:'Dấu hiệu nhận biết tiếp tuyến: đi qua một điểm của đường tròn và vuông góc với bán kính đi qua điểm đó.', sol:`Đáp án: <b>${good}</b>.`}); }
  if(lv === 3){ const d = R(3,12), c = pick([['cắt',`R \\gt ${d}`],['tiếp xúc với',`R = ${d}`],['không giao',`R \\lt ${d}`],['có điểm chung với',`R \\ge ${d}`]]);
    return QC({text:`Đường thẳng ${m('a')} cách tâm ${m('O')} một khoảng ${m(`${d}`)} cm. Đường thẳng ${m('a')} <b>${c[0]}</b> đường tròn ${m('(O;\\,R)')} khi và chỉ khi`, opts:[`R \\gt ${d}`,`R = ${d}`,`R \\lt ${d}`,`R \\ge ${d}`,`R \\le ${d}`].map(x => m(x+'\\text{ cm}')), ans:m(c[1]+'\\text{ cm}'), keepOrder:true,
      hint:'Cắt nhau ⇔ d < R; tiếp xúc ⇔ d = R; không giao nhau ⇔ d > R. “Có điểm chung” gồm cắt nhau hoặc tiếp xúc.', sol:`Đáp án: ${tb(c[1]+'\\text{ cm}')}.`}); }
  const Rr = R(3,10), k = R(0,2), d = [R(1,Rr-1), Rr, Rr+R(1,5)][k];
  return QB({text:`Đường thẳng ${m('a')} cách tâm của đường tròn ${m(`(O;\\,${Rr}\\text{ cm})`)} một khoảng ${m(cm(d))}. Đường thẳng ${m('a')} và đường tròn có bao nhiêu điểm chung?`, tpl:'[_] điểm chung', ans:[2-k],
    hint:'So sánh khoảng cách d với bán kính R.', sol:`${m(`d = ${d}`)} ${m(['\\lt','=','\\gt'][k])} ${m(`R = ${Rr}`)} nên có ${tb(2-k)} điểm chung.`});
};

/* ---------- Bài 17. Vị trí tương đối của hai đường tròn ---------- */
const twoCase = (lv, k) => { let Rr, r, d;
  for(;;){ Rr = R(4,15); r = R(1,Rr-1); const s = Rr+r, t = Rr-r;
    d = [R(t+1, s-1), s, t, s+R(1,8), R(0,t-1)][k]; if(d > t && k===0 && d < s) break; if(k!==0 && d >= 0) break; }
  return {Rr, r, d}; };
const g17a = lv => {
  const k = pick(lv===1 ? [0,1,3] : lv===2 ? [0,1,2,3] : [0,1,2,3,4]); let {Rr, r, d} = twoCase(lv, k); if(k===4 && d===0) d = 1;
  if(k===4 && d >= Rr-r) return g17a(lv);
  return QC({text:`Cho hai đường tròn ${m(`(O;\\,${Rr}\\text{ cm})`)} và ${m(`(O';\\,${r}\\text{ cm})`)} với ${m(`OO' = ${d}`)} cm. Vị trí tương đối của hai đường tròn là`, opts:TWO.slice(0, lv===1?4:5), ans:TWO[k], keepOrder:true,
    hint:`So sánh ${m("d = OO'")} với ${m('R + r')} và ${m('R - r')}.`,
    sol:`${m(`R + r = ${Rr+r},\\ R - r = ${Rr-r}`)}; ${m(`d = ${d}`)} ${['nằm giữa R − r và R + r','= R + r','= R − r','> R + r','< R − r'][k]} nên hai đường tròn <b>${TWO[k].toLowerCase()}</b>.`});
};
const g17b = lv => {
  const k = pick([0,1,2,3,4].slice(0, lv===1?4:5)); let {Rr, r, d} = twoCase(lv, k); if(k===4 && (d===0 || d >= Rr-r)) return g17b(lv);
  const n = [2,1,1,0,0][k];
  return QB({text:`Hai đường tròn ${m(`(O;\\,${Rr}\\text{ cm})`)} và ${m(`(O';\\,${r}\\text{ cm})`)} có ${m(`OO' = ${d}`)} cm. Hai đường tròn có bao nhiêu điểm chung?`, tpl:'[_] điểm chung', ans:[n],
    hint:'Cắt nhau: 2 điểm chung; tiếp xúc (ngoài hoặc trong): 1 điểm chung; ở ngoài nhau hoặc đựng nhau: không có điểm chung.', sol:`Hai đường tròn ${TWO[k].toLowerCase()} nên có ${tb(n)} điểm chung.`});
};
const g17c = lv => {
  const Rr = R(4,15), r = R(1,Rr-1), ext = lv===1 || Math.random() < .5;
  if(lv === 3){ const d = ext ? Rr + r : Rr - r;
    return QB({text:`Đường tròn ${m(`(O;\\,${Rr}\\text{ cm})`)} và đường tròn ${m(`(O';\\,r)`)} với ${m('r \\lt '+Rr)} cm, ${m(`OO' = ${d}`)} cm, <b>tiếp xúc ${ext?'ngoài':'trong'}</b> với nhau. Tính ${m('r')}.`, tpl:`${m('r =')} [_] cm`, ans:[r],
      hint:`Tiếp xúc ngoài: ${m("OO' = R + r")}; tiếp xúc trong: ${m("OO' = R - r")}.`, sol:`${ext?m(`r = OO' - R = ${d} - ${Rr}`):m(`r = R - OO' = ${Rr} - ${d}`)} ${m('=')} ${tb(r)} cm.`}); }
  return QB({text:`Hai đường tròn ${m(`(O;\\,${Rr}\\text{ cm})`)} và ${m(`(O';\\,${r}\\text{ cm})`)} tiếp xúc ${ext?'ngoài':'trong'}. Tính độ dài đoạn nối tâm ${m("OO'")}.`, tpl:`${m("OO' =")} [_] cm`, ans:[ext?Rr+r:Rr-r],
    fig:ext ? circleSVG({C:[{x:0,y:0,r:Rr,lab:'O'},{x:Rr+r,y:0,r:r,lab:"O'"}], P:[[Rr,0,'A',60]], S:[[0,0,Rr+r,0,true]]}) : circleSVG({C:[{x:0,y:0,r:Rr,lab:'O'},{x:Rr-r,y:0,r:r,lab:"O'"}], P:[[Rr,0,'A',0]], S:[[0,0,Rr-r,0,true]]}),
    hint:`Tiếp xúc ngoài: ${m("OO' = R + r")}; tiếp xúc trong: ${m("OO' = R - r")}.`, sol:`${m(`OO' = ${Rr} ${ext?'+':'-'} ${r} =`)} ${tb(ext?Rr+r:Rr-r)} cm.`});
};
const g17d = lv => {
  const Rr = R(4,15), r = R(1,Rr-1);
  if(lv === 3){ const d = R(Rr-r+1, Rr+r-1), xs = []; for(let x = d-Rr+1; x < d+Rr; x++) if(x >= 1 && x < Rr && Math.abs(Rr-x) < d && d < Rr+x) xs.push(x);
    return QB({text:`Cho ${m(`(O;\\,${Rr}\\text{ cm})`)} và ${m("(O';\\,r)")} với ${m(`OO' = ${d}`)} cm, ${m('r')} là số nguyên, ${m(`r \\lt ${Rr}`)}. Có bao nhiêu giá trị của ${m('r')} để hai đường tròn cắt nhau?`, tpl:'[_] giá trị', ans:[xs.length],
      hint:`Cắt nhau ⇔ ${m("R - r \\lt OO' \\lt R + r")}; giải ra điều kiện của ${m('r')}.`, sol:`${m(`${Rr} - r \\lt ${d} \\lt ${Rr} + r \\Leftrightarrow r \\gt ${Rr-d}`)}${Rr-d<0?` (luôn đúng)`:''} và ${m(`r \\gt ${d-Rr}`)}; kết hợp ${m(`1 \\le r \\lt ${Rr}`)} được ${m(`r \\in \\{${xs.join(';\\,')}\\}`)}: ${tb(xs.length)} giá trị.`}); }
  return QB({text:`Hai đường tròn ${m(`(O;\\,${Rr}\\text{ cm})`)} và ${m(`(O';\\,${r}\\text{ cm})`)} cắt nhau. Độ dài ${m("OO'")} thỏa mãn`, tpl:`[_] ${m("\\lt OO' \\lt")} [_] (cm)`, ans:[Rr-r, Rr+r],
    hint:`Hai đường tròn cắt nhau ⇔ ${m("R - r \\lt OO' \\lt R + r")}.`, sol:`${tb(Rr-r)} ${m("\\lt OO' \\lt")} ${tb(Rr+r)}.`});
};

G.topics.push({id:5, hk:1, name:'Đường tròn', label:'Chương V'});
lesson(5,'mo-dau-duong-tron','Bài 13. Mở đầu về đường tròn','Vị trí của điểm đối với đường tròn; bán kính, đường kính; tính đối xứng của đường tròn.',[g13b,g13a,g13d,g13c]);
lesson(5,'cung-va-day','Bài 14. Cung và dây của một đường tròn','Dây và đường kính; khoảng cách từ tâm đến dây; góc ở tâm, số đo cung.',[g14d,g14a,g14b,g14c]);
lesson(5,'do-dai-cung-quat','Bài 15. Độ dài của cung tròn. Diện tích hình quạt tròn và hình vành khuyên','Độ dài đường tròn, cung tròn; diện tích hình quạt, hình vành khuyên; bài toán thực tế.',[g15a,g15b,g15c,g15d]);
lesson(5,'duong-thang-duong-tron','Bài 16. Vị trí tương đối của đường thẳng và đường tròn','So sánh d và R; tiếp tuyến vuông góc với bán kính; hai tiếp tuyến cắt nhau.',[g16d,g16a,g16b,g16c]);
lesson(5,'hai-duong-tron','Bài 17. Vị trí tương đối của hai đường tròn','Cắt nhau, tiếp xúc, không giao nhau; số điểm chung; đoạn nối tâm.',[g17b,g17a,g17c,g17d]);
lesson(5,'on-tap-c5','Ôn tập chương V','Tổng hợp: vị trí điểm, dây cung, độ dài cung – diện tích quạt, tiếp tuyến, hai đường tròn.',[g13a,g14c,g15b,g15c,g16b,g17a]);
}

/* =====================================================================
   ÔN THI TUYỂN SINH VÀO LỚP 10 – HÌNH HỌC 1. TIẾP TUYẾN CỦA ĐƯỜNG TRÒN
   ===================================================================== */
{
const TANG_TRIPLES = [[3,4,5],[5,12,13],[6,8,10],[7,24,25],[8,15,17],[9,12,15]];
const tangentFig = (r,t,d) => { const s=4/d, A=[r*r/d*s,r*t/d*s], M=[4,0];
  const dir=(P,Q)=>Math.atan2(Q[1]-P[1],Q[0]-P[0])*180/Math.PI;
  return circleSVG({C:[{x:0,y:0,r:r*s,lab:'O'}],P:[[...A,'A'],[...M,'M']],S:[[0,0,...A],[...A,...M],[0,0,...M,true]],right:[[A[0],A[1],dir(A,[0,0])]]}); };

const gTs1 = lv => {
  const good = pick([
    [`${tm('A \\in (O)')} và ${tm('OA \\perp d')} tại ${tm('A')}`,`Đường thẳng ${tm('d')} là tiếp tuyến của ${tm('(O)')} tại ${tm('A')}.`],
    [`Khoảng cách từ ${tm('O')} đến ${tm('d')} bằng bán kính ${tm('R')}`,`Đường thẳng ${tm('d')} tiếp xúc với ${tm('(O;\\,R)')}.`],
    [`${tm('MA, MB')} là hai tiếp tuyến kẻ từ ${tm('M')}`,`${tm('MA = MB')}.`]
  ]);
  if(lv===1) return QC({text:`Khẳng định nào là <b>dấu hiệu nhận biết tiếp tuyến</b>?`,opts:[good[0],`${tm('d')} đi qua một điểm nằm trong ${tm('(O)')}.`,`${tm('d \\parallel OA')} tại ${tm('A')}.`,`${tm('d')} cắt ${tm('(O)')} tại hai điểm.`],ans:good[0],hint:'Tiếp tuyến vuông góc với bán kính tại tiếp điểm.',sol:`${good[1]} Đây là dấu hiệu nhận biết tiếp tuyến.`});
  const Rr=R(3,12), dist=pick([Rr-2,Rr,Rr+2]), n=dist<Rr?2:dist===Rr?1:0;
  return QB({text:`Đường thẳng ${tm('d')} cách tâm của đường tròn ${tm(`(O;\\,${Rr}\\text{ cm})`)} một khoảng ${tm(`${dist}`)} cm. Hai hình có bao nhiêu điểm chung?`,tpl:'[_] điểm chung',ans:[n],hint:'So sánh khoảng cách từ tâm đến đường thẳng với bán kính.',sol:`Vì ${tm(`d=${dist}`)} ${tm(dist<Rr?'\\lt R':dist===Rr?'=R':'\\gt R')} nên có ${tb(n)} điểm chung${n===1?', đường thẳng là tiếp tuyến':''}.`});
};

const gTs2 = lv => {
  const [r,t,d]=pick(TANG_TRIPLES);
  const ask=lv===1?0:R(0,2), fig=tangentFig(r,t,d);
  if(ask===0) return QB({text:`Từ ${tm('M')} kẻ tiếp tuyến ${tm('MA')} đến ${tm(`(O;\\,${r}\\text{ cm})`)} tại ${tm('A')}. Biết ${tm(`OM=${d}`)} cm. Tính ${tm('MA')}.`,tpl:`${tm('MA =')} [_] cm`,ans:[t],fig,hint:`${tm('OA \\perp MA')}; áp dụng định lí Pythagore trong tam giác vuông ${tm('OAM')}.`,sol:`${tm(`MA=\\sqrt{OM^2-OA^2}=\\sqrt{${d}^2-${r}^2}=${t}`)} cm.`});
  if(ask===1) return QB({text:`${tm('MA')} là tiếp tuyến của ${tm('(O)')} tại ${tm('A')}. Biết ${tm(`OA=${r}`)} cm, ${tm(`MA=${t}`)} cm. Tính ${tm('OM')}.`,tpl:`${tm('OM =')} [_] cm`,ans:[d],fig,hint:'Tam giác OAM vuông tại A.',sol:`${tm(`OM=\\sqrt{OA^2+MA^2}=\\sqrt{${r}^2+${t}^2}=${d}`)} cm.`});
  return QB({text:`${tm('MA')} là tiếp tuyến của ${tm('(O)')} tại ${tm('A')}. Biết ${tm(`OM=${d}`)} cm, ${tm(`MA=${t}`)} cm. Tính bán kính.`,tpl:`${tm('R =')} [_] cm`,ans:[r],fig,hint:'Bán kính OA vuông góc với tiếp tuyến MA.',sol:`${tm(`R=OA=\\sqrt{OM^2-MA^2}=\\sqrt{${d}^2-${t}^2}=${r}`)} cm.`});
};

const gTs3 = lv => {
  const be=2*R(20,70), half=be/2;
  if(lv===1){const x=R(4,20);return QB({text:`Từ ${tm('M')} kẻ hai tiếp tuyến ${tm('MA, MB')} của ${tm('(O)')}. Biết ${tm(`MA=${x}`)} cm. Tính ${tm('MB')}.`,tpl:`${tm('MB =')} [_] cm`,ans:[x],hint:'Hai tiếp tuyến xuất phát từ cùng một điểm ngoài thì có độ dài bằng nhau.',sol:`Theo tính chất hai tiếp tuyến cắt nhau, ${tm('MB=MA')} nên ${tm(`MB=${x}`)} cm.`});}
  if(lv===2) return QB({text:`Hai tiếp tuyến ${tm('MA, MB')} của ${tm('(O)')} tạo thành góc ${tm(`\\widehat{AMB}=${be}^\\circ`)}. Tính ${tm('\\widehat{AOB}')}.`,tpl:`${tm('\\widehat{AOB} =')} [_]${tm('^\\circ')}`,ans:[180-be],hint:'Tứ giác OAMB có hai góc vuông tại A và B.',sol:`${tm(`\\widehat{AOB}=180^\\circ-\\widehat{AMB}=180^\\circ-${be}^\\circ=${180-be}^\\circ`)}.`});
  return QB({text:`Từ ${tm('M')} kẻ hai tiếp tuyến ${tm('MA, MB')} của ${tm('(O)')}. Biết ${tm(`\\widehat{AMB}=${be}^\\circ`)}. Tính ${tm('\\widehat{AMO}')} và ${tm('\\widehat{AOM}')}.`,tpl:`${tm('\\widehat{AMO} =')} [_]${tm('^\\circ')} &nbsp; ${tm('\\widehat{AOM} =')} [_]${tm('^\\circ')}`,ans:[half,90-half],hint:'MO phân giác góc AMB; tam giác OAM vuông tại A.',sol:`${tm(`\\widehat{AMO}=\\dfrac{${be}^\\circ}{2}=${half}^\\circ`)}; do ${tm('\\widehat{OAM}=90^\\circ')} nên ${tm(`\\widehat{AOM}=${90-half}^\\circ`)}.`});
};

const gTs4 = lv => {
  const [r,t,d]=pick(TANG_TRIPLES), oh=r*r/d, ah=r*t/d;
  if(lv===1) return QC({text:`Từ ${tm('M')} kẻ hai tiếp tuyến ${tm('MA, MB')} của ${tm('(O)')}; ${tm('H=OM\\cap AB')}. Kết luận nào <b>luôn đúng</b>?`,opts:[tm('OM\\perp AB'),tm('OM\\parallel AB'),tm('HA=OM'),tm('OA\\parallel MB')],ans:tm('OM\\perp AB'),hint:'OA = OB và MA = MB nên O và M cùng nằm trên đường trung trực của AB.',sol:`${tm('OA=OB')} và ${tm('MA=MB')} nên ${tm('OM')} là đường trung trực của ${tm('AB')}. Do đó ${tb('OM\\perp AB')}.`});
  if(lv===2) return QB({text:`Cho ${tm(`(O;\\,${r}\\text{ cm})`)}, ${tm(`OM=${d}`)} cm. Từ ${tm('M')} kẻ hai tiếp tuyến ${tm('MA, MB')}; ${tm('H=OM\\cap AB')}. Tính ${tm('OH')}.`,tpl:`${tm('OH =')} [_] cm`,ans:[oh],hint:`Trong tam giác vuông ${tm('OAM')}, ${tm('AH')} là đường cao ứng với cạnh huyền: ${tm('OA^2=OH\\cdot OM')}.`,sol:`${tm(`OH=\\dfrac{OA^2}{OM}=\\dfrac{${r}^2}{${d}}=${oh}`)} cm.`});
  return QB({text:`Cho ${tm(`(O;\\,${r}\\text{ cm})`)}, ${tm(`OM=${d}`)} cm. Hai tiếp tuyến từ ${tm('M')} tiếp xúc tại ${tm('A,B')}. Tính độ dài dây tiếp điểm ${tm('AB')}.`,tpl:`${tm('AB =')} [_] cm`,ans:[2*ah],hint:`Gọi ${tm('H=OM\\cap AB')}. Khi đó ${tm('OH=OA^2/OM')} và ${tm('AB=2AH')}.`,sol:`${tm(`OH=${r}^2/${d}=${oh}`)} cm; ${tm(`AH=\\sqrt{OA^2-OH^2}=${ah}`)} cm, nên ${tm(`AB=2AH=${2*ah}`)} cm.`});
};

const gTs5 = lv => {
  const triples=[[3,12,6],[4,21,10],[5,32,8],[6,27,12],[8,45,15]], [x,y,t]=pick(triples); // MC=x, MD=y, MA=t
  if(lv===1) return QC({text:`Từ điểm ${tm('M')} ngoài ${tm('(O)')}, ${tm('MA')} là tiếp tuyến và cát tuyến qua ${tm('M')} cắt đường tròn tại ${tm('C,D')} (${tm('C')} nằm giữa ${tm('M,D')}). Hệ thức đúng là`,opts:[tm('MA^2=MC\\cdot MD'),tm('MA=MC+MD'),tm('MA^2=MC^2+MD^2'),tm('MA\\cdot MD=MC^2')],ans:tm('MA^2=MC\\cdot MD'),hint:'Bình phương độ dài tiếp tuyến bằng tích hai đoạn của cát tuyến tính từ điểm ngoài.',sol:`Theo định lí tiếp tuyến–cát tuyến: ${tb('MA^2=MC\\cdot MD')}.`});
  if(lv===2) return QB({text:`Từ ${tm('M')} kẻ tiếp tuyến ${tm('MA')} và cát tuyến ${tm('MCD')} của ${tm('(O)')}. Biết ${tm(`MC=${x}`)} cm, ${tm(`MD=${y}`)} cm. Tính ${tm('MA')}.`,tpl:`${tm('MA =')} [_] cm`,ans:[t],hint:`Dùng ${tm('MA^2=MC\\cdot MD')}.`,sol:`${tm(`MA=\\sqrt{MC\\cdot MD}=\\sqrt{${x}\\cdot${y}}=${t}`)} cm.`});
  return QB({text:`Từ ${tm('M')} kẻ tiếp tuyến ${tm('MA')} và cát tuyến ${tm('MCD')} của ${tm('(O)')}; ${tm('C')} nằm giữa ${tm('M,D')}. Biết ${tm(`MA=${t}`)} cm, ${tm(`MC=${x}`)} cm. Tính ${tm('CD')}.`,tpl:`${tm('CD =')} [_] cm`,ans:[y-x],hint:`Tính ${tm('MD=MA^2/MC')} rồi dùng ${tm('CD=MD-MC')}.`,sol:`${tm(`MD=\\dfrac{MA^2}{MC}=\\dfrac{${t}^2}{${x}}=${y}`)} cm; ${tm(`CD=MD-MC=${y}-${x}=${y-x}`)} cm.`});
};

const gTs6 = lv => {
  const [r,t,d]=pick(TANG_TRIPLES), oh=r*r/d, ab=2*r*t/d;
  const text=`Cho ${tm(`(O;\\,${r}\\text{ cm})`)} và điểm ${tm('M')} ở ngoài sao cho ${tm(`OM=${d}`)} cm. Kẻ hai tiếp tuyến ${tm('MA, MB')}; gọi ${tm('H=OM\\cap AB')}.`;
  const steps=[
    {tag:'Nhận xét',ask:`Tứ giác ${tm('OAMB')} nội tiếp đường tròn có đường kính nào?`,opts:[tm('OM'),tm('AB'),tm('OA'),tm('MA')],ans:tm('OM'),hint:'Hai góc OAM và OBM đều vuông.'},
    {tag:'Tính tiếp tuyến',ask:`Tính ${tm('MA')}.`,tpl:`${tm('MA =')} [_] cm`,ans:[t],hint:'Dùng Pythagore trong tam giác OAM vuông tại A.'},
    {tag:'Dây tiếp điểm',ask:`Tính ${tm('OH')}.`,tpl:`${tm('OH =')} [_] cm`,ans:[oh],hint:'Dùng hệ thức OA² = OH·OM.'},
    {tag:'Kết quả',ask:`Tính ${tm('AB')}.`,tpl:`${tm('AB =')} [_] cm`,ans:[ab],hint:'Trong tam giác vuông OAM, AH = OA·MA/OM và AB = 2AH.'}
  ];
  return QS({direct:lv===3,text,hint:'Nối tâm với hai tiếp điểm; khai thác hai góc vuông và tính chất hai tiếp tuyến.',steps:lv===1?steps.slice(0,3):steps,sol:`Vì ${tm('OA\\perp MA')} và ${tm('OB\\perp MB')}, bốn điểm ${tm('O,A,M,B')} cùng thuộc đường tròn đường kính ${tm('OM')}. ${tm(`MA=${t}`)} cm; ${tm(`OH=${oh}`)} cm; ${tm(`AB=${ab}`)} cm.`});
};

G.topics.push({id:6, hk:2, name:'Ôn thi tuyển sinh vào lớp 10 · Đại số và Hình học', label:'🎓 Ôn thi vào 10', grp:'📝 Ôn tập · Củng cố · Kiểm tra'});
lesson(6,'on-thi-tiep-tuyen','Hình học 1. Tiếp tuyến của đường tròn','Ôn tuyển sinh từ cơ bản đến nâng cao: nhận biết và chứng minh tiếp tuyến; tính độ dài; hai tiếp tuyến; dây tiếp điểm; tiếp tuyến–cát tuyến; bài tổng hợp.',[gTs1,gTs2,gTs3,gTs4,gTs5,gTs6], {intro:[
  {t:`Tiếp tuyến và bán kính`, b:`<ul><li>Tiếp tuyến của đường tròn vuông góc với bán kính tại tiếp điểm.</li><li>Đường thẳng ${tm('d')} tiếp xúc với ${tm('(O;R)')} khi và chỉ khi khoảng cách từ ${tm('O')} đến ${tm('d')} bằng ${tm('R')}.</li><li>Dấu hiệu: đường thẳng đi qua một điểm của đường tròn và vuông góc với bán kính tại điểm đó là tiếp tuyến.</li></ul>`, ex:`Thấy chữ “tiếp tuyến” hay “tiếp điểm”: nối ngay tâm với tiếp điểm để có góc vuông.`},
  {t:`Hai tiếp tuyến cắt nhau`, b:`Từ ${tm('A')} vẽ hai tiếp tuyến ${tm('AB')}, ${tm('AC')} với ${tm('(O)')} (${tm('B')}, ${tm('C')} là tiếp điểm): ${tm('AB = AC')}; ${tm('AO')} là tia phân giác của ${tm('\\widehat{BAC}')} và của ${tm('\\widehat{BOC}')}; ${tm('AO \\perp BC')} tại trung điểm của ${tm('BC')}.`, warn:`Độ dài tiếp tuyến tính bằng định lí Pythagore trong tam giác vuông ${tm('OBA')}: ${tm('AB^2 = OA^2 - R^2')}. Hệ thức dạng ${tm('OH \\cdot OA = R^2')} (đường cao trong tam giác vuông) không được viện dẫn trực tiếp — phải chứng minh lại bằng tam giác đồng dạng.`},
  {t:`Chứng minh một đường thẳng là tiếp tuyến`, b:`<ul><li>Cách 1: chỉ ra điểm ${tm('A')} thuộc đường tròn và ${tm('d \\perp OA')} tại ${tm('A')}.</li><li>Cách 2: chứng minh khoảng cách từ tâm ${tm('O')} đến ${tm('d')} bằng bán kính ${tm('R')}.</li></ul>`, warn:`Phải nói rõ “A thuộc đường tròn” và “vuông góc với bán kính”; không kết luận theo hình vẽ.`},
  {t:`Mẹo làm bài hình`, b:`<ul><li>Vẽ hình đủ lớn, đúng điều kiện đề; ghi sẵn các cặp bằng nhau và góc vuông ngay trên hình.</li><li>Bài chứng minh nhiều câu: câu sau thường dùng kết quả câu trước — hãy tận dụng.</li><li>Tính độ dài: tìm một tam giác vuông chứa đoạn cần tính rồi dùng Pythagore.</li></ul>`}
]});
}
/* =====================================================================
   ÔN THI TUYỂN SINH VÀO LỚP 10 – HÌNH HỌC 2. GÓC Ở TÂM, GÓC NỘI TIẾP
   ===================================================================== */
{
const angAt=(r,a)=>[r*Math.cos(a*Math.PI/180),r*Math.sin(a*Math.PI/180)];
const insFig=(arcDeg=100)=>{const A=angAt(3,200),B=angAt(3,200+arcDeg),C=angAt(3,50);return circleSVG({C:[{x:0,y:0,r:3,lab:'O'}],P:[[...A,'A'],[...B,'B'],[...C,'C']],S:[[...A,...B],[...C,...A],[...C,...B],[0,0,...A,true],[0,0,...B,true]],arc:{x:0,y:0,r:3,a1:200,a2:200+arcDeg}});};
const arcName=s=>`\\overset{\\frown}{${s}}`, hatA=s=>`\\widehat{${s}}`;

const gGa1=lv=>{
  const n=R(4,28)*10;
  if(lv===1)return QB({text:`Trên đường tròn ${tm('(O)')}, góc ở tâm ${tm(`${hatA('AOB')}=${n}^\\circ`)} chắn cung nhỏ ${tm('AB')}. Tính số đo cung nhỏ ${tm('AB')}.`,tpl:`${tm(`\\text{sđ}${arcName('AB')} =`)} [_]${tm('^\\circ')}`,ans:[n],fig:insFig(Math.min(n,160)),hint:'Số đo cung nhỏ bằng số đo góc ở tâm chắn cung đó.',sol:`Góc ${tm(hatA('AOB'))} là góc ở tâm chắn cung nhỏ ${tm('AB')}, nên ${tm(`\\text{sđ}${arcName('AB')}=${n}^\\circ`)}.`});
  if(lv===2)return QB({text:`Cung nhỏ ${tm('AB')} của ${tm('(O)')} có số đo ${tm(`${n}^\\circ`)}. Tính số đo cung lớn ${tm('AB')}.`,tpl:'[_]'+tm('^\\circ'),ans:[360-n],hint:'Tổng số đo cung nhỏ và cung lớn có chung hai mút bằng 360°.',sol:`Cung lớn ${tm('AB')} có số đo ${tm(`360^\\circ-${n}^\\circ=${360-n}^\\circ`)}.`});
  const a=R(3,10)*10,b=R(3,10)*10;
  return QB({text:`Ba tia ${tm('OA,OB,OC')} theo thứ tự nằm trong cùng một nửa mặt phẳng, tia ${tm('OB')} nằm giữa ${tm('OA,OC')}. Biết ${tm(`${hatA('AOB')}=${a}^\\circ`)}, ${tm(`${hatA('BOC')}=${b}^\\circ`)}. Tính số đo cung nhỏ ${tm('AC')}.`,tpl:'[_]'+tm('^\\circ'),ans:[a+b],hint:'Cộng hai góc ở tâm kề nhau.',sol:`${tm(`${hatA('AOC')}=${hatA('AOB')}+${hatA('BOC')}=${a}^\\circ+${b}^\\circ=${a+b}^\\circ`)}. Vì vậy cung nhỏ ${tm('AC')} có số đo ${tb(`${a+b}^\\circ`)}.`});
};

const gGa2=lv=>{
  const x=R(2,8)*10, arc=2*x;
  if(lv===1)return QB({text:`Góc nội tiếp ${tm(hatA('ACB'))} chắn cung nhỏ ${tm('AB')} có số đo ${tm(`${arc}^\\circ`)}. Tính ${tm(hatA('ACB'))}.`,tpl:`${tm(`${hatA('ACB')} =`)} [_]${tm('^\\circ')}`,ans:[x],fig:insFig(arc),hint:'Góc nội tiếp bằng nửa số đo cung bị chắn.',sol:`${tm(`${hatA('ACB')}=\\dfrac12\\text{sđ}${arcName('AB')}=\\dfrac12\\cdot${arc}^\\circ=${x}^\\circ`)}.`});
  if(lv===2)return QB({text:`Góc nội tiếp ${tm(`${hatA('ACB')}=${x}^\\circ`)} chắn cung ${tm('AB')}. Tính số đo cung ${tm('AB')}.`,tpl:'[_]'+tm('^\\circ'),ans:[arc],fig:insFig(arc),hint:'Cung bị chắn có số đo gấp đôi góc nội tiếp.',sol:`${tm(`\\text{sđ}${arcName('AB')}=2${hatA('ACB')}=2\\cdot${x}^\\circ=${arc}^\\circ`)}.`});
  return QB({text:`Trên ${tm('(O)')}, góc ở tâm ${tm(`${hatA('AOB')}=${arc}^\\circ`)} và điểm ${tm('C')} nằm trên cung lớn ${tm('AB')}. Tính góc nội tiếp ${tm(hatA('ACB'))}.`,tpl:'[_]'+tm('^\\circ'),ans:[x],fig:insFig(arc),hint:'Góc ở tâm và góc nội tiếp cùng chắn cung nhỏ AB; góc nội tiếp bằng nửa góc ở tâm.',sol:`${tm(`${hatA('ACB')}=\\dfrac12${hatA('AOB')}=\\dfrac12\\cdot${arc}^\\circ=${x}^\\circ`)}.`});
};

const gGa3=lv=>{
  if(lv===1)return QC({text:`Cho ${tm('AB')} là đường kính của ${tm('(O)')} và ${tm('C\\in(O)')}, ${tm('C\\ne A,B')}. Góc ${tm(hatA('ACB'))} bằng`,opts:[tm('90^\\circ'),tm('45^\\circ'),tm('60^\\circ'),tm('180^\\circ')],ans:tm('90^\\circ'),hint:'Góc nội tiếp chắn nửa đường tròn là góc vuông.',sol:`Góc ${tm(hatA('ACB'))} chắn cung ${tm('AB')} có số đo ${tm('180^\\circ')}, nên bằng ${tb('90^\\circ')}.`});
  const x=R(2,7)*10;
  if(lv===2)return QB({text:`Các điểm ${tm('A,B,C,D')} cùng thuộc ${tm('(O)')}; ${tm('C,D')} nằm trên cùng một cung ${tm('AB')}. Biết ${tm(`${hatA('ACB')}=${x}^\\circ`)}. Tính ${tm(hatA('ADB'))}.`,tpl:'[_]'+tm('^\\circ'),ans:[x],hint:'Hai góc nội tiếp cùng chắn một cung thì bằng nhau.',sol:`${tm(hatA('ACB'))} và ${tm(hatA('ADB'))} cùng chắn cung ${tm('AB')}, nên ${tm(`${hatA('ADB')}=${hatA('ACB')}=${x}^\\circ`)}.`});
  const a=R(2,7)*10;
  return QB({text:`Tam giác ${tm('ABC')} nội tiếp đường tròn có ${tm('AB')} là đường kính. Biết ${tm(`${hatA('CAB')}=${a}^\\circ`)}. Tính ${tm(hatA('ABC'))}.`,tpl:'[_]'+tm('^\\circ'),ans:[90-a],hint:'Góc ACB chắn đường kính nên bằng 90°; dùng tổng ba góc của tam giác.',sol:`${tm(`${hatA('ACB')}=90^\\circ`)} vì chắn đường kính. Do đó ${tm(`${hatA('ABC')}=180^\\circ-90^\\circ-${a}^\\circ=${90-a}^\\circ`)}.`});
};

const gGa4=lv=>{
  const a=R(5,13)*10;
  if(lv===1)return QB({text:`Tứ giác ${tm('ABCD')} nội tiếp một đường tròn. Biết ${tm(`${hatA('BAD')}=${a}^\\circ`)}. Tính ${tm(hatA('BCD'))}.`,tpl:'[_]'+tm('^\\circ'),ans:[180-a],hint:'Tổng hai góc đối của tứ giác nội tiếp bằng 180°.',sol:`${tm(`${hatA('BAD')}+${hatA('BCD')}=180^\\circ`)}, nên ${tm(`${hatA('BCD')}=180^\\circ-${a}^\\circ=${180-a}^\\circ`)}.`});
  if(lv===2){const b=180-a;return QC({text:`Tứ giác ${tm('ABCD')} có ${tm(`${hatA('A')}=${a}^\\circ`)}, ${tm(`${hatA('C')}=${b}^\\circ`)}. Kết luận đúng là`,opts:['Tứ giác ABCD nội tiếp được một đường tròn','AB song song CD','Hai đường chéo vuông góc','AB = CD'],ans:'Tứ giác ABCD nội tiếp được một đường tròn',hint:'Một tứ giác có tổng hai góc đối bằng 180° thì nội tiếp.',sol:`Vì ${tm(`${hatA('A')}+${hatA('C')}=${a}^\\circ+${b}^\\circ=180^\\circ`)}, tứ giác ${tb('ABCD')} nội tiếp được một đường tròn.`});}
  const ext=R(4,12)*10;
  return QB({text:`Tứ giác ${tm('ABCD')} nội tiếp. Tia ${tm('Bx')} là tia đối của ${tm('BA')}. Biết góc ngoài ${tm(`${hatA('xBC')}=${ext}^\\circ`)}. Tính góc trong đối diện ${tm(hatA('ADC'))}.`,tpl:'[_]'+tm('^\\circ'),ans:[ext],hint:'Góc ngoài của tứ giác nội tiếp bằng góc trong đối diện.',sol:`Trong tứ giác nội tiếp, góc ngoài tại ${tm('B')} bằng góc trong đối diện tại ${tm('D')}; do đó ${tm(`${hatA('ADC')}=${ext}^\\circ`)}.`});
};

const gGa5=lv=>{
  const x=R(2,8)*10, arc=2*x;
  if(lv===1)return QB({text:`Tiếp tuyến tại ${tm('A')} của ${tm('(O)')} tạo với dây ${tm('AB')} một góc ${tm(`${x}^\\circ`)}. Tính số đo cung nhỏ ${tm('AB')}.`,tpl:'[_]'+tm('^\\circ'),ans:[arc],hint:'Góc tạo bởi tiếp tuyến và dây bằng nửa số đo cung bị chắn.',sol:`${tm(`\\text{sđ}${arcName('AB')}=2\\cdot${x}^\\circ=${arc}^\\circ`)}.`});
  if(lv===2)return QB({text:`Tiếp tuyến ${tm('Ax')} của ${tm('(O)')} tại ${tm('A')} tạo với dây ${tm('AB')} góc ${tm(`${hatA('xAB')}=${x}^\\circ`)}. Điểm ${tm('C')} nằm trên cung lớn ${tm('AB')}. Tính ${tm(hatA('ACB'))}.`,tpl:'[_]'+tm('^\\circ'),ans:[x],hint:'Góc tạo bởi tiếp tuyến và dây bằng góc nội tiếp chắn cùng cung.',sol:`Hai góc cùng chắn cung nhỏ ${tm('AB')}, nên ${tm(`${hatA('ACB')}=${hatA('xAB')}=${x}^\\circ`)}.`});
  const y=90-x;
  return QB({text:`Tại ${tm('A\\in(O)')}, tiếp tuyến ${tm('Ax')} tạo với dây ${tm('AB')} góc ${tm(`${x}^\\circ`)}. Tính góc giữa bán kính ${tm('OA')} và dây ${tm('AB')}.`,tpl:'[_]'+tm('^\\circ'),ans:[y],hint:'Bán kính OA vuông góc với tiếp tuyến Ax.',sol:`Vì ${tm('OA\\perp Ax')}, góc giữa ${tm('OA')} và ${tm('AB')} bằng ${tm(`90^\\circ-${x}^\\circ=${y}^\\circ`)}.`});
};

const gGa6=lv=>{
  const a=R(2,7)*10,b=R(2,7)*10,sum=a+b,diff=Math.abs(a-b), inside=sum/2,outside=diff/2;
  const text=lv<3?`Hai dây ${tm('AB')} và ${tm('CD')} của một đường tròn cắt nhau tại ${tm('E')} ở trong đường tròn. Biết ${tm(`\\text{sđ}${arcName('AC')}=${a}^\\circ`)}, ${tm(`\\text{sđ}${arcName('BD')}=${b}^\\circ`)}.`:`Từ điểm ${tm('M')} ngoài đường tròn kẻ hai cát tuyến. Hai cung bị chắn có số đo ${tm(`${Math.max(a,b)}^\\circ`)} và ${tm(`${Math.min(a,b)}^\\circ`)}.`;
  const steps=lv<3?[
   {tag:'Chọn công thức',ask:`Góc tạo bởi hai dây cắt nhau <b>trong</b> đường tròn bằng`,opts:['Nửa tổng số đo hai cung bị chắn','Nửa hiệu số đo hai cung bị chắn','Tổng hai cung bị chắn','Hiệu hai cung bị chắn'],ans:'Nửa tổng số đo hai cung bị chắn',hint:'Giao điểm nằm trong đường tròn nên dùng nửa tổng.'},
   {tag:'Tính góc',ask:`Tính góc ${tm(hatA('AEC'))}.`,tpl:'[_]'+tm('^\\circ'),ans:[inside],hint:'Lấy nửa tổng số đo hai cung AC và BD.'}
  ]:[
   {tag:'Chọn công thức',ask:'Góc có đỉnh ngoài đường tròn bằng',opts:['Nửa hiệu số đo cung lớn và cung nhỏ','Nửa tổng số đo hai cung','Hiệu hai cung','Tổng hai cung'],ans:'Nửa hiệu số đo cung lớn và cung nhỏ',hint:'Đỉnh ở ngoài đường tròn nên dùng nửa hiệu.'},
   {tag:'Tính góc',ask:'Tính số đo góc tạo bởi hai cát tuyến.',tpl:'[_]'+tm('^\\circ'),ans:[outside],hint:'Lấy nửa hiệu số đo hai cung bị chắn.'}
  ];
  return QS({direct:lv===3,text,steps,hint:lv<3?'Giao điểm trong: nửa tổng hai cung.':'Giao điểm ngoài: nửa hiệu hai cung.',sol:lv<3?`${tm(`${hatA('AEC')}=\\dfrac{${a}^\\circ+${b}^\\circ}{2}=${inside}^\\circ`)}.`:`Góc cần tìm bằng ${tm(`\\dfrac{${Math.max(a,b)}^\\circ-${Math.min(a,b)}^\\circ}{2}=${outside}^\\circ`)}.`});
};

lesson(6,'on-thi-goc-duong-tron','Hình học 2. Góc ở tâm, góc nội tiếp','Ôn tuyển sinh từ cơ bản đến nâng cao: cung và góc ở tâm; góc nội tiếp; đường kính; tứ giác nội tiếp; tiếp tuyến–dây; góc có đỉnh trong và ngoài đường tròn.',[gGa1,gGa2,gGa3,gGa4,gGa5,gGa6], {intro:[
  {t:`Góc ở tâm và góc nội tiếp`, b:`<ul><li>Góc ở tâm có số đo bằng số đo cung bị chắn.</li><li>Góc nội tiếp có số đo bằng <b>nửa</b> số đo cung bị chắn; các góc nội tiếp cùng chắn một cung thì bằng nhau.</li><li>Góc nội tiếp chắn nửa đường tròn là góc vuông; ngược lại, góc vuông nội tiếp thì chắn đường kính.</li></ul>`, ex:`Gặp góc ${tm('90^\\circ')} trong đường tròn, nghĩ ngay đến <b>đường kính</b>; gặp đường kính thì nghĩ ngay đến góc vuông ở điểm còn lại.`},
  {t:`Tứ giác nội tiếp`, b:`<ul><li>Tứ giác nội tiếp có tổng hai góc đối bằng ${tm('180^\\circ')}; góc ngoài bằng góc trong của đỉnh đối diện.</li><li>Hai góc nội tiếp cùng chắn một cung thì bằng nhau — rất hay dùng để “chuyển góc”.</li></ul>`, warn:`Dấu hiệu nhận biết tứ giác nội tiếp không được viện dẫn trực tiếp: phải chứng minh lại (chỉ ra bốn đỉnh cùng cách đều một điểm, hoặc dựa vào định nghĩa).`},
  {t:`Góc có đỉnh bên trong và bên ngoài đường tròn`, b:`<ul><li>Đỉnh bên trong: số đo góc bằng nửa <b>tổng</b> số đo hai cung bị chắn.</li><li>Đỉnh bên ngoài: số đo góc bằng nửa <b>hiệu</b> số đo hai cung bị chắn (cung lớn trừ cung nhỏ).</li></ul>`, warn:`Xác định đúng hai cung bị chắn và cung nào lớn hơn trước khi cộng hoặc trừ.`},
  {t:`Mẹo làm bài`, b:`<ul><li>Mỗi lần ghi một góc, nêu rõ “chắn cung nào” — thầy cô chấm theo lập luận.</li><li>Chứng minh các góc bằng nhau: thử các góc nội tiếp cùng chắn một cung, hoặc cùng phụ với một góc.</li><li>Bài tính số đo góc: viết ra các cung đã biết, đổi sang góc theo “nội tiếp bằng nửa cung”.</li></ul>`, warn:`Không viện dẫn trực tiếp: đường kính vuông góc với dây thì đi qua trung điểm dây (phải chứng minh lại khi cần dùng).`}
]});
}

/* =====================================================================
   ÔN THI TUYỂN SINH VÀO LỚP 10 – HÌNH HỌC 3. HÌNH QUẠT, HÌNH VÀNH KHUYÊN
   ===================================================================== */
{
const SEC_ARC=[[6,60,2],[8,45,2],[9,80,4],[10,72,4],[12,90,6],[15,120,10]];
const SEC_AREA=[[6,90,9],[8,90,16],[10,72,20],[12,60,24],[15,80,50],[18,40,36]];
const ANN=[[5,3,16],[10,6,64],[13,5,144],[15,9,144],[17,8,225],[20,12,256]];
const ANN_SEC=[[6,2,90,8],[10,6,90,16],[9,3,120,24],[12,6,120,36],[15,9,60,24],[18,12,120,60]];
const secAt=(r,a)=>[r*Math.cos(a*Math.PI/180),r*Math.sin(a*Math.PI/180)];
const secFig=(n=90)=>circleSVG({C:[{x:0,y:0,r:3,lab:'O'}],sector:{x:0,y:0,r:3,a1:20,a2:20+n},S:[[0,0,...secAt(3,20),false,'R'],[0,0,...secAt(3,20+n)]],ang:[[0,0,20,20+n,tm(`${n}^\\circ`)]]});
const ringFig=()=>circleSVG({C:[{x:0,y:0,r:4,lab:'O'},{x:0,y:0,r:2.2}],ring:{x:0,y:0,r1:4,r2:2.2},S:[[0,0,...secAt(4,25),false,'R'],[0,0,...secAt(2.2,205),false,'r']]});

const gSq1=lv=>{
  const [r,n,k]=pick(SEC_ARC);
  if(lv===1)return QB({text:`Tính độ dài cung ${tm(`${n}^\\circ`)} của đường tròn bán kính ${tm(`${r}`)} cm. Điền hệ số của ${tm('\\pi')}.`,tpl:`${tm('l =')} [_]${tm('\\pi')} cm`,ans:[k],fig:secFig(n),hint:`Dùng ${tm('l=\\dfrac{\\pi Rn}{180}')}.`,sol:`${tm(`l=\\dfrac{\\pi\\cdot${r}\\cdot${n}}{180}=${k}\\pi`)} cm.`});
  if(lv===2)return QB({text:`Một cung tròn bán kính ${tm(`${r}`)} cm có độ dài ${tm(`${k}\\pi`)} cm. Tính số đo cung.`,tpl:'[_]'+tm('^\\circ'),ans:[n],hint:`Thay vào ${tm('l=\\dfrac{\\pi Rn}{180}')} rồi giải tìm ${tm('n')}.`,sol:`${tm(`${k}\\pi=\\dfrac{\\pi\\cdot${r}\\cdot n}{180}`)}, suy ra ${tm(`n=${n}^\\circ`)}.`});
  return QB({text:`Cung ${tm(`${n}^\\circ`)} có độ dài ${tm(`${k}\\pi`)} cm. Tính bán kính đường tròn.`,tpl:`${tm('R =')} [_] cm`,ans:[r],hint:'Đổi công thức độ dài cung để tìm bán kính.',sol:`${tm(`R=\\dfrac{180l}{\\pi n}=\\dfrac{180\\cdot${k}\\pi}{\\pi\\cdot${n}}=${r}`)} cm.`});
};

const gSq2=lv=>{
  const [r,n,k]=pick(SEC_AREA);
  if(lv===1)return QB({text:`Tính diện tích hình quạt tròn bán kính ${tm(`${r}`)} cm, góc ở tâm ${tm(`${n}^\\circ`)}. Điền hệ số của ${tm('\\pi')}.`,tpl:`${tm('S =')} [_]${tm('\\pi')} cm²`,ans:[k],fig:secFig(n),hint:`Dùng ${tm('S=\\dfrac{\\pi R^2n}{360}')}.`,sol:`${tm(`S=\\dfrac{\\pi\\cdot${r}^2\\cdot${n}}{360}=${k}\\pi`)} cm².`});
  if(lv===2)return QB({text:`Hình quạt bán kính ${tm(`${r}`)} cm có diện tích ${tm(`${k}\\pi`)} cm². Tính góc ở tâm.`,tpl:'[_]'+tm('^\\circ'),ans:[n],hint:`Thay vào ${tm('S=\\dfrac{\\pi R^2n}{360}')}.`,sol:`${tm(`${k}\\pi=\\dfrac{\\pi\\cdot${r}^2n}{360}`)}, suy ra ${tm(`n=${n}^\\circ`)}.`});
  const l=2*k/r;
  return QB({text:`Hình quạt tròn bán kính ${tm(`${r}`)} cm có diện tích ${tm(`${k}\\pi`)} cm². Tính độ dài cung của hình quạt. Điền hệ số của ${tm('\\pi')}.`,tpl:`${tm('l =')} [_]${tm('\\pi')} cm`,ans:[l],hint:`Dùng hệ thức ${tm('S=\\dfrac{lR}{2}')}.`,sol:`${tm(`l=\\dfrac{2S}{R}=\\dfrac{2\\cdot${k}\\pi}{${r}}=${l}\\pi`)} cm.`});
};

const gSq3=lv=>{
  const [Rr,r,k]=pick(ANN);
  if(lv===1)return QB({text:`Tính diện tích hình vành khuyên giới hạn bởi hai đường tròn đồng tâm bán kính ${tm(`${Rr}`)} cm và ${tm(`${r}`)} cm. Điền hệ số của ${tm('\\pi')}.`,tpl:`${tm('S =')} [_]${tm('\\pi')} cm²`,ans:[k],fig:ringFig(),hint:`Dùng ${tm('S=\\pi(R^2-r^2)')}.`,sol:`${tm(`S=\\pi(${Rr}^2-${r}^2)=${k}\\pi`)} cm².`});
  if(lv===2)return QB({text:`Một hình vành khuyên có bán kính ngoài ${tm(`${Rr}`)} cm và diện tích ${tm(`${k}\\pi`)} cm². Tính bán kính trong.`,tpl:`${tm('r =')} [_] cm`,ans:[r],fig:ringFig(),hint:`Từ ${tm('R^2-r^2=S/\\pi')} suy ra ${tm('r')}.`,sol:`${tm(`r^2=R^2-\\dfrac S\\pi=${Rr}^2-${k}=${r*r}`)}, nên ${tm(`r=${r}`)} cm.`});
  return QB({text:`Hình vành khuyên có bán kính trong ${tm(`${r}`)} cm và diện tích ${tm(`${k}\\pi`)} cm². Tính bán kính ngoài.`,tpl:`${tm('R =')} [_] cm`,ans:[Rr],hint:`Dùng ${tm('R^2=r^2+S/\\pi')}.`,sol:`${tm(`R^2=${r}^2+${k}=${Rr*Rr}`)}, nên ${tm(`R=${Rr}`)} cm.`});
};

const gSq4=lv=>{
  const [Rr,r,n,k]=pick(ANN_SEC);
  if(lv===1)return QC({text:'Diện tích một hình quạt vành khuyên có bán kính ngoài '+tm('R')+', bán kính trong '+tm('r')+' và góc ở tâm '+tm('n^\\circ')+' được tính bởi',opts:[tm('\\dfrac{\\pi(R^2-r^2)n}{360}'),tm('\\pi(R-r)^2'),tm('\\dfrac{\\pi(R-r)n}{180}'),tm('\\pi(R^2+r^2)')],ans:tm('\\dfrac{\\pi(R^2-r^2)n}{360}'),hint:'Lấy diện tích quạt lớn trừ diện tích quạt nhỏ có cùng góc ở tâm.',sol:`Diện tích cần tìm là ${tb('\\dfrac{\\pi(R^2-r^2)n}{360}')}.`});
  if(lv===2)return QB({text:`Một hình quạt vành khuyên có bán kính ngoài ${tm(`${Rr}`)} cm, bán kính trong ${tm(`${r}`)} cm và góc ở tâm ${tm(`${n}^\\circ`)}. Điền hệ số của ${tm('\\pi')} trong diện tích.`,tpl:`${tm('S =')} [_]${tm('\\pi')} cm²`,ans:[k],fig:ringFig(),hint:'Lấy diện tích quạt lớn trừ diện tích quạt nhỏ.',sol:`${tm(`S=\\dfrac{\\pi(${Rr}^2-${r}^2)${n}}{360}=${k}\\pi`)} cm².`});
  const full=(Rr*Rr-r*r), remain=full-k;
  return QB({text:`Từ hình vành khuyên bán kính ngoài ${tm(`${Rr}`)} cm, bán kính trong ${tm(`${r}`)} cm, người ta bỏ đi một phần quạt ${tm(`${n}^\\circ`)}. Điền hệ số của ${tm('\\pi')} trong diện tích còn lại.`,tpl:`${tm('S =')} [_]${tm('\\pi')} cm²`,ans:[remain],hint:'Diện tích còn lại bằng diện tích vành khuyên trừ diện tích quạt vành khuyên bị bỏ.',sol:`${tm(`S=\\pi(${Rr}^2-${r}^2)-${k}\\pi=${full}\\pi-${k}\\pi=${remain}\\pi`)} cm².`});
};

const gSq5=lv=>{
  if(lv===1){const r=R(3,12);return QB({text:`Một hình quạt nửa đường tròn bán kính ${tm(`${r}`)} cm. Tính chu vi hình quạt. Điền hệ số của ${tm('\\pi')} và phần số thường.`,tpl:`${tm('P =')} [_]${tm('\\pi +')} [_] cm`,ans:[r,2*r],hint:'Chu vi hình quạt bằng độ dài cung cộng hai bán kính.',sol:`Cung nửa đường tròn dài ${tm(`\\pi R=${r}\\pi`)} cm; hai bán kính dài ${tm(`${2*r}`)} cm. Vậy ${tm(`P=${r}\\pi+${2*r}`)} cm.`});}
  if(lv===2){const r=10,n=90,l=5*Math.PI;return QB({text:`Một bồn hoa là hình quạt ${tm('90^\\circ')} bán kính ${tm('10')} m. Người ta làm hàng rào dọc theo toàn bộ chu vi bồn hoa. Lấy ${tm('\\pi\\approx3{,}14')}. Hỏi cần bao nhiêu mét hàng rào?`,tpl:'[_] m',ans:[35.7],hint:'Chu vi quạt bằng độ dài cung cộng hai bán kính.',sol:`Độ dài cung ${tm('l=\\dfrac{\\pi\\cdot10\\cdot90}{180}=5\\pi\\approx15{,}7')} m. Chu vi ${tm('P=15{,}7+20=35{,}7')} m.`});}
  return QC({text:'Khi giữ nguyên góc ở tâm và tăng bán kính hình quạt lên 2 lần thì diện tích hình quạt',opts:['tăng 4 lần','tăng 2 lần','không đổi','giảm 2 lần'],ans:'tăng 4 lần',hint:'Diện tích hình quạt tỉ lệ với bình phương bán kính.',sol:`Vì ${tm('S=\\dfrac{\\pi R^2n}{360}')}, thay ${tm('R')} bởi ${tm('2R')} làm diện tích ${tb('tăng 4 lần')}.`});
};

const gSq6=lv=>{
  const [Rr,r,n,k]=pick(ANN_SEC), outer=Rr*Rr*n/360, inner=r*r*n/360;
  const text=`Một khu trang trí có dạng hình quạt vành khuyên tâm ${tm('O')}, bán kính ngoài ${tm(`${Rr}`)} m, bán kính trong ${tm(`${r}`)} m và góc ở tâm ${tm(`${n}^\\circ`)}.`;
  const steps=[
   {tag:'Chọn công thức',ask:'Diện tích phần trang trí được tính bằng',opts:['Diện tích quạt lớn trừ diện tích quạt nhỏ','Diện tích hai quạt cộng lại','Diện tích vành khuyên đầy đủ','Chu vi quạt lớn trừ chu vi quạt nhỏ'],ans:'Diện tích quạt lớn trừ diện tích quạt nhỏ',hint:'Hai hình quạt đồng tâm và có cùng góc ở tâm.'},
   {tag:'Quạt lớn',ask:`Điền hệ số của ${tm('\\pi')} trong diện tích quạt lớn.`,tpl:'[_]'+tm('\\pi')+' m²',ans:[outer],hint:`Dùng ${tm('S=\\pi R^2n/360')}.`},
   {tag:'Quạt nhỏ',ask:`Điền hệ số của ${tm('\\pi')} trong diện tích quạt nhỏ.`,tpl:'[_]'+tm('\\pi')+' m²',ans:[inner],hint:'Dùng bán kính trong.'},
   {tag:'Kết quả',ask:`Điền hệ số của ${tm('\\pi')} trong diện tích phần trang trí.`,tpl:'[_]'+tm('\\pi')+' m²',ans:[k],hint:'Lấy diện tích quạt lớn trừ diện tích quạt nhỏ.'}
  ];
  return QS({direct:lv===3,text,steps:lv===1?steps.slice(0,3):steps,hint:'Tách hình quạt vành khuyên thành quạt lớn trừ quạt nhỏ.',sol:`Diện tích quạt lớn là ${tm(`${outer}\\pi`)} m², quạt nhỏ là ${tm(`${inner}\\pi`)} m². Diện tích cần tìm: ${tm(`${outer}\\pi-${inner}\\pi=${k}\\pi`)} m².`});
};

lesson(6,'on-thi-hinh-quat-vanh-khuyen','Hình học 3. Hình quạt tròn và hình vành khuyên','Ôn tuyển sinh từ cơ bản đến nâng cao: độ dài cung; diện tích quạt; vành khuyên; quạt vành khuyên; chu vi, hình ghép và bài toán thực tế.',[gSq1,gSq2,gSq3,gSq4,gSq5,gSq6], {intro:[
  {t:`Công thức cần thuộc`, b:`<ul><li>Chu vi hình tròn ${tm('C = 2\\pi R')}; diện tích ${tm('S = \\pi R^2')}.</li><li>Độ dài cung ${tm('n^\\circ')}: ${tm('l = \\dfrac{\\pi R n}{180}')}.</li><li>Diện tích hình quạt tròn: ${tm('S_q = \\dfrac{\\pi R^2 n}{360} = \\dfrac{lR}{2}')}.</li><li>Hình vành khuyên: ${tm('S = \\pi(R^2 - r^2) = \\pi(R - r)(R + r)')} với ${tm('R \\gt r')}.</li></ul>`, ex:`Hình quạt là phần ${tm('\\dfrac{n}{360}')} của hình tròn: độ dài cung ${tm('= \\dfrac{n}{360} \\cdot C')}, diện tích quạt ${tm('= \\dfrac{n}{360} \\cdot S')} — chỉ cần nhớ một tỉ số.`},
  {t:`Lưu ý dễ sai`, b:`<ul><li>Chu vi hình quạt ${tm('= l + 2R')} (cung cộng hai bán kính), đừng chỉ lấy ${tm('l')}.</li><li>Đổi về cùng đơn vị trước khi tính; diện tích có đơn vị bình phương.</li><li>${tm('n')} là số đo <b>độ</b>; đủ một vòng là ${tm('360^\\circ')}.</li></ul>`, warn:`Đề cho “lấy ${tm('\\pi \\approx 3{,}14')}” thì dùng đúng giá trị đó và làm tròn theo yêu cầu; nếu không dặn, giữ nguyên ${tm('\\pi')} trong kết quả.`},
  {t:`Bài toán ghép hình và thực tế`, b:`Tách hình phức tạp thành các hình quen thuộc (hình tròn, quạt, tam giác, hình chữ nhật). Diện tích phần tô = diện tích hình lớn trừ diện tích phần bỏ đi; vành khuyên là hiệu của hai hình tròn đồng tâm.`, ex:`Viết rõ từng bước: bán kính → công thức → thay số → kết quả kèm đơn vị. Kiểm tra bằng ước lượng: quạt ${tm('90^\\circ')} phải bằng đúng ${tm('\\dfrac14')} hình tròn.`}
]});
}

/* =====================================================================
   ÔN THI TUYỂN SINH VÀO LỚP 10 – ĐẠI SỐ 1. HÀM SỐ y = ax² VÀ ĐỒ THỊ
   (Bài 1 của cấu trúc đề TP.HCM 2026–2027: vẽ đồ thị y = ax², tìm điểm thuộc đồ thị)
   Luôn chọn a và x trước, tính y sau → mọi đáp số đều nguyên.
   ===================================================================== */
{
const aTerm = (p,q) => q===1 ? (p===1?'':p===-1?'-':String(p)) : (p<0?'-':'')+tf(Math.abs(p),q);
const aTxt  = (p,q) => q===1 ? String(p) : (p<0?'-':'')+tf(Math.abs(p),q);
const aMul  = (p,q) => q===1 ? tp(p) : (p<0?'-':'')+tf(Math.abs(p),q);
const fnStr = (p,q) => `y = ${aTerm(p,q)}x^2`;
const parab = (p,q) => tm(`(P):\\; ${fnStr(p,q)}`);
const yAt   = (p,q,x) => p*x*x/q;
const okX   = q => [-4,-3,-2,-1,0,1,2,3,4].filter(x => (x*x)%q===0);
const ptS   = (x,y) => `(${x};\\,${y})`;
const parabSVG = (p,q,pts) => {
  const a=p/q, m=Math.max(2,...pts.map(t=>Math.abs(t[0]))), ymax=Math.max(Math.ceil(Math.abs(a)*m*m),...pts.map(t=>Math.abs(t[1])));
  const U=26, W=(2*m+2)*U, ytop=a>0?ymax+1:1, H=(ymax+2)*U;
  const X=x=>(x+m+1)*U, Y=y=>(ytop-y)*U;
  let s=`<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Parabol y = ax²" style="max-height:340px">`;
  for(let x=-m-1;x<=m+1;x++) s+=`<line class="sv-grid" x1="${X(x)}" y1="0" x2="${X(x)}" y2="${H}"/>`;
  for(let y=Math.ceil(ytop-ymax-2);y<=ytop;y++) s+=`<line class="sv-grid" x1="0" y1="${Y(y)}" x2="${W}" y2="${Y(y)}"/>`;
  s+=`<line class="sv-axis" x1="0" y1="${Y(0)}" x2="${W}" y2="${Y(0)}"/><line class="sv-axis" x1="${X(0)}" y1="0" x2="${X(0)}" y2="${H}"/>`;
  s+=`<text class="sv-txt" x="${W-12}" y="${Y(0)+(a>0?-6:16)}" font-size="14">x</text><text class="sv-txt" x="${X(0)+7}" y="13" font-size="14">y</text><text class="sv-muted" x="${X(0)-5}" y="${Y(0)+(a>0?14:-5)}" font-size="12" text-anchor="end">O</text>`;
  for(let x=-m;x<=m;x++) if(x) s+=`<text class="sv-muted" x="${X(x)}" y="${Y(0)+(a>0?14:-5)}" font-size="11" text-anchor="middle">${x}</text>`;
  for(let y=Math.ceil(ytop-ymax-2);y<ytop;y++) if(y) s+=`<text class="sv-muted" x="${X(0)-5}" y="${Y(y)+4}" font-size="11" text-anchor="end">${y}</text>`;
  let d=''; for(let i=-m*20;i<=m*20;i++){const x=i/20; d+=(d?'L':'M')+X(x).toFixed(1)+' '+Y(a*x*x).toFixed(1);}
  s+=`<path class="sv-ink" fill="none" stroke-width="2.6" d="${d}"/>`;
  pts.forEach(([x,y,l])=>{s+=`<circle class="sv-dot" cx="${X(x)}" cy="${Y(y)}" r="4.5"/><text class="sv-txt" x="${X(x)+8}" y="${Y(y)-8}" font-size="15">${l}</text>`});
  return s+'</svg>';
};
const POOL = [[1,1],[2,1],[3,1],[-1,1],[-2,1],[-3,1],[1,2],[-1,2],[1,4],[-1,4]];

/* Dạng 1. Điểm nào thuộc parabol / tìm a, tìm m để điểm thuộc parabol */
const gHs1 = lv => {
  if(lv<3){
    const [p,q]=pick(lv===1?[[1,1],[2,1],[3,1],[-1,1],[-2,1]]:[[-1,1],[-2,1],[-3,1],[1,2],[-1,2],[3,1],[1,4]]);
    const x=pick(okX(q).filter(t=>t!==0)), y=yAt(p,q,x), on=(px,py)=>p*px*px===q*py;
    const cand=[[x,-y],[x,y+1],[x,y-1],[x+1,y],[x-1,y],[x,y*2]];
    const lin=p*x/q; if(Number.isInteger(lin)) cand.unshift([x,lin]);
    let W=uniqBy(cand).filter(([px,py])=>!on(px,py)&&!(px===x&&py===y)); W=lv===1?W.slice(0,3):shuffle(W).slice(0,3);
    return QC({text:`Cho parabol ${parab(p,q)}. Điểm nào sau đây thuộc ${tm('(P)')}?`,
      opts:[ptS(x,y),...W.map(([px,py])=>ptS(px,py))].map(tm), ans:tm(ptS(x,y)),
      hint:`Điểm ${tm('(x_0;\\,y_0)')} thuộc ${tm('(P)')} khi thay ${tm('x = x_0')} vào hàm số ta được đúng ${tm('y_0')}. Hãy thay từng điểm.`,
      sol:`Thay ${tm('x = '+x)} vào ${tm(fnStr(p,q))}: ${tm(`y = ${aMul(p,q)}\\cdot${tp(x)}^2 = ${y}`)}. Vậy điểm ${tb(ptS(x,y))} thuộc ${tm('(P)')}; các điểm còn lại có tung độ không bằng ${tm(String(y))}.`});
  }
  if(Math.random()<0.5){
    const a=pick([-4,-3,-2,-1,1,2,3,4]), x0=pick([-4,-3,-2,2,3,4]), y0=a*x0*x0;
    return QB({text:`Biết parabol ${tm('(P):\\; y = ax^2')} đi qua điểm ${tm('A'+ptS(x0,y0))}. Tính hệ số ${tm('a')}.`,tpl:`${tm('a =')} [_]`,ans:[a],
      hint:`Điểm ${tm('A')} thuộc ${tm('(P)')} nên toạ độ của ${tm('A')} thoả mãn phương trình ${tm('y = ax^2')}. Thay vào rồi giải phương trình ẩn ${tm('a')}.`,
      sol:`Thay ${tm(`x = ${x0},\\; y = ${y0}`)} vào ${tm('y = ax^2')}: ${tm(`${y0} = a\\cdot${tp(x0)}^2 = ${x0*x0}a`)}. Suy ra ${tb('a = '+a)}.`});
  }
  const a=pick([-3,-1,1,3]), x1=pick([-3,-1,1,3]), v=a*x1*x1, m=(v-1)/2;
  return QB({text:`Tìm ${tm('m')} để điểm ${tm('B'+`(${x1};\\,2m + 1)`)} thuộc parabol ${parab(a,1)}.`,tpl:`${tm('m =')} [_]`,ans:[m],
    hint:`Điểm thuộc ${tm('(P)')} thì toạ độ nghiệm đúng phương trình của ${tm('(P)')}. Thay hoành độ vào để tính tung độ rồi cho bằng ${tm('2m + 1')}.`,
    sol:`Thay ${tm('x = '+x1)} vào ${tm(fnStr(a,1))}: ${tm(`y = ${aMul(a,1)}\\cdot${tp(x1)}^2 = ${v}`)}. Điểm ${tm('B')} thuộc ${tm('(P)')} nên ${tm(`2m + 1 = ${v}`)}, suy ra ${tb('m = '+m)}.`});
};

/* Dạng 2. Lập bảng giá trị để vẽ đồ thị */
const gHs2 = lv => {
  const [p,q]=pick(lv===1?[[1,1],[2,1],[-1,1],[3,1]]:lv===2?[[-2,1],[-3,1],[1,2],[-1,2]]:[[1,2],[-1,2],[1,4],[-1,4],[-3,1]]);
  const r=lv===1?2:4, n=lv===3?4:3;
  const xs=shuffle(okX(q).filter(t=>Math.abs(t)<=r)).slice(0,n).sort((u,v)=>u-v), ys=xs.map(t=>yAt(p,q,t));
  return QB({text:`Cho hàm số ${tm(fnStr(p,q))}. Hoàn thành bảng giá trị để chuẩn bị vẽ đồ thị.`,
    tpl:xs.map(t=>`${tm(`x = ${t}:\\; y =`)} [_]`).join(' &emsp; '), ans:ys,
    hint:`Thay từng giá trị của ${tm('x')} vào công thức ${tm('y = ax^2')}: bình phương ${tm('x')} trước, rồi nhân với ${tm('a')}.`,
    sol:xs.map((t,i)=>`${tm(`x = ${t}:\\; y = ${aMul(p,q)}\\cdot${tp(t)}^2 =`)} ${tb(String(ys[i]))}`).join('<br>')+`<br>Các điểm ${xs.map((t,i)=>tm(ptS(t,ys[i]))).join(', ')} nằm trên đồ thị.`});
};

/* Dạng 3. Tính chất của đồ thị và so sánh giá trị hàm số */
const gHs3 = lv => {
  const [p,q]=pick(POOL), pos=p>0;
  if(lv===1){
    const good = pos ? `Đồ thị nằm phía trên trục hoành, nhận trục ${tm('Oy')} làm trục đối xứng`
                     : `Đồ thị nằm phía dưới trục hoành, nhận trục ${tm('Oy')} làm trục đối xứng`;
    const wrong=[ pos ? `Đồ thị nằm phía dưới trục hoành, nhận trục ${tm('Oy')} làm trục đối xứng` : `Đồ thị nằm phía trên trục hoành, nhận trục ${tm('Oy')} làm trục đối xứng`,
      `Đồ thị là đường thẳng đi qua gốc toạ độ ${tm('O')}`,
      `Đồ thị nhận trục ${tm('Ox')} làm trục đối xứng`];
    return QC({text:`Cho hàm số ${tm(fnStr(p,q))}. Khẳng định nào về đồ thị ${tm('(P)')} là <b>đúng</b>?`,opts:[good,...wrong],ans:good,
      hint:`Đồ thị ${tm('y = ax^2')} là parabol đỉnh ${tm('O')}. Hãy xét dấu của ${tm('a')} để biết parabol quay lên hay quay xuống.`,
      sol:`Vì ${tm(pos?'a \\gt 0':'a \\lt 0')} nên ${tb(pos?'(P) nằm phía trên trục hoành (quay bề lõm lên)':'(P) nằm phía dưới trục hoành (quay bề lõm xuống)')} và nhận ${tm('Oy')} làm trục đối xứng vì ${tm('(-x)^2 = x^2')}.`});
  }
  let x1,x2;
  if(lv===2){ x1=R(1,3); x2=x1+R(1,2); if(Math.random()<.5){[x1,x2]=[-x2,-x1];} }
  else { do{ x1=-R(2,4); x2=R(1,4);}while(Math.abs(x1)===x2); if(Math.random()<.5)[x1,x2]=[x2,x1]; }
  const v1=p*x1*x1/q, v2=p*x2*x2/q;
  return QCmp(`Cho hàm số ${tm(fnStr(p,q))}. So sánh hai giá trị hàm số (không cần dùng máy tính).`, tm(`y(${x1})`), tm(`y(${x2})`), v1, v2,
    {hint:`Giá trị ${tm('y')} chỉ phụ thuộc ${tm('x^2')}. Hãy so sánh ${tm('x^2')} của hai giá trị, rồi xét dấu của ${tm('a')} (${tm('a \\gt 0')}: ${tm('x^2')} càng lớn thì ${tm('y')} càng lớn).`,
     sol:`${tm(`y(${x1}) = ${aMul(p,q)}\\cdot${tp(x1)}^2 = ${v1}`)}; ${tm(`y(${x2}) = ${aMul(p,q)}\\cdot${tp(x2)}^2 = ${v2}`)}. Vậy ${tb(`y(${x1}) ${op_(cmp(v1,v2))} y(${x2})`)}.`});
};

/* Dạng 4. Đọc đồ thị, xác định hệ số a và tính tung độ điểm khác */
const gHs4 = lv => {
  const pool = lv===1?[[1,1],[2,1],[-1,1],[-2,1]]:[[1,2],[-1,2],[3,1],[-3,1],[2,1],[-2,1],[1,4],[-1,4]];
  const [p,q]=pick(pool), x0=pick(okX(q).filter(t=>t&&Math.abs(t)<=(lv===1?2:4))), y0=yAt(p,q,x0);
  const fig=parabSVG(p,q,[[x0,y0,'A']]);
  if(lv<3){
    let others=shuffle(POOL.filter(([u,v])=>!(u===p&&v===q)&&!(u===-p&&v===q))).slice(0,2);
    const opts=[[p,q],[-p,q],...others].map(([u,v])=>tm(`a = ${aTxt(u,v)}`));
    return QC({text:`Parabol ${tm('(P):\\; y = ax^2')} được vẽ như hình và đi qua điểm ${tm('A')}. Hệ số ${tm('a')} bằng bao nhiêu?`,fig,opts,ans:tm(`a = ${aTxt(p,q)}`),
      hint:`Đọc toạ độ điểm ${tm('A')} trên lưới ô vuông. Điểm ${tm('A')} thuộc ${tm('(P)')} nên toạ độ của nó thoả mãn ${tm('y = ax^2')}.`,
      sol:`Từ hình, ${tm('A'+ptS(x0,y0))}. Thay vào ${tm('y = ax^2')}: ${tm(`${y0} = a\\cdot${tp(x0)}^2 = ${x0*x0}a`)}. Suy ra ${tb(`a = ${aTxt(p,q)}`)}.`});
  }
  const x1=pick(okX(q).filter(t=>t&&Math.abs(t)!==Math.abs(x0))), y1=yAt(p,q,x1);
  return QB({text:`Parabol ${tm('(P):\\; y = ax^2')} được vẽ như hình và đi qua điểm ${tm('A')}. Tính tung độ của điểm ${tm('B')} thuộc ${tm('(P)')} có hoành độ ${tm('x = '+x1)}.`,fig,tpl:`${tm('y_B =')} [_]`,ans:[y1],
    hint:`Đọc toạ độ ${tm('A')} từ lưới để tìm ${tm('a')} trước, sau đó thay hoành độ của ${tm('B')} vào hàm số.`,
    sol:`Từ hình, ${tm('A'+ptS(x0,y0))}, nên ${tm(`a = ${aTxt(p,q)}`)} và ${tm(fnStr(p,q))}. Với ${tm('x = '+x1)}: ${tm(`y = ${aMul(p,q)}\\cdot${tp(x1)}^2`)} ${tb('= '+y1)}.`});
};

/* Dạng 5. Tìm điểm thuộc parabol thoả điều kiện cho trước (Bài 1b của đề thi) */
const gHs5 = lv => {
  if(lv===1){
    const [p,q]=pick([[1,1],[2,1],[3,1],[-1,1],[-2,1]]), x0=R(2,5), y0=yAt(p,q,x0);
    if(Math.random()<.5) return QB({text:`Điểm ${tm('M')} thuộc parabol ${parab(p,q)}, có tung độ bằng ${tm(String(y0))} và nằm bên phải trục tung. Tìm hoành độ của ${tm('M')}.`,tpl:`${tm('x_M =')} [_]`,ans:[x0],
      hint:`Thay tung độ vào phương trình ${tm('y = ax^2')} để được phương trình ẩn ${tm('x')}; chú ý ${tm('M')} nằm bên phải trục tung.`,
      sol:`Thay ${tm('y = '+y0)}: ${tm(`${aTerm(p,q)}x^2 = ${y0}`)}, suy ra ${tm(`x^2 = ${x0*x0}`)}, tức ${tm(`x = \\pm ${x0}`)}. ${tm('M')} nằm bên phải trục tung nên ${tb('x_M = '+x0)}.`});
    return QB({text:`Điểm ${tm('N')} thuộc parabol ${parab(p,q)} và cách trục tung ${tm(String(x0))} đơn vị. Tính tung độ của ${tm('N')}.`,tpl:`${tm('y_N =')} [_]`,ans:[y0],
      hint:`Điểm cách trục tung ${tm('d')} đơn vị có hoành độ ${tm('x = \\pm d')}. Hai hoành độ đối nhau cho cùng một tung độ.`,
      sol:`Hoành độ của ${tm('N')} là ${tm(`x = \\pm ${x0}`)}. Thay vào ${tm(fnStr(p,q))}: ${tm(`y = ${aMul(p,q)}\\cdot${x0}^2`)} ${tb('= '+y0)}.`});
  }
  const q=pick(lv===2?[1,2]:[1,2]), p=pick(q===1?[1,2,3,-1,-2,-3]:[1,-1]), mag=q===1?R(2,lv===2?5:6):pick(lv===2?[2,4]:[2,4,6]);
  const x0=(p>0?1:-1)*mag, k=p*x0/q, y0=yAt(p,q,x0);
  if(lv===2) return QB({text:`Tìm hoành độ của điểm ${tm('M')} khác gốc toạ độ, thuộc parabol ${parab(p,q)}, biết tung độ của ${tm('M')} gấp ${tm(String(k))} lần hoành độ.`,tpl:`${tm('x_M =')} [_]`,ans:[x0],
    hint:`Điểm ${tm('M(x;\\,y)')} thuộc ${tm('(P)')} nên ${tm('y = ax^2')}. Kết hợp điều kiện tung độ gấp ${tm('k')} lần hoành độ để lập phương trình ẩn ${tm('x')}, chú ý ${tm('x \\ne 0')}.`,
    sol:`Gọi ${tm('M(x;\\,y)')}, ${tm('x \\ne 0')}. Có ${tm(`y = ${aTerm(p,q)}x^2`)} và ${tm(`y = ${k}x`)}, nên ${tm(`${aTerm(p,q)}x^2 = ${k}x`)}. Chia hai vế cho ${tm('x')}: ${tm(`${aTerm(p,q)}x = ${k}`)}. Vậy ${tb('x_M = '+x0)}.`});
  const eq=`${aTerm(p,q)}x^2 = ${k}x`;
  return QS({direct:true,text:`Parabol ${parab(p,q)}. Điểm ${tm('M')} khác gốc toạ độ thuộc ${tm('(P)')} và có tung độ gấp ${tm(String(k))} lần hoành độ. Tính tung độ của ${tm('M')}.`,
    hint:`Lập phương trình ẩn ${tm('x')} từ hai điều kiện, giải (loại ${tm('x = 0')}), rồi tính tung độ.`,
    steps:[
      {tag:'Kế hoạch',ask:`${tm('M(x;\\,y)')} thuộc ${tm('(P)')} và ${tm(`y = ${k}x`)}. Phương trình ẩn ${tm('x')} là:`,
       opts:[eq,`${aTerm(p,q)}x = ${k}x^2`,`${aTerm(p,q)}x^2 = ${k}`,`${aTerm(p,q)}x^2 + ${k}x = 0`].map(tm),ans:tm(eq),
       hint:`Tung độ của ${tm('M')} vừa bằng ${tm('ax^2')} (vì ${tm('M \\in (P)')}) vừa bằng ${tm(`${k}x`)}.`},
      {tag:'Giải',ask:`Giải phương trình (${tm('x \\ne 0')}):`,tpl:`${tm('x =')} [_]`,ans:[x0],hint:`Chuyển vế, đặt ${tm('x')} làm nhân tử chung và loại nghiệm ${tm('x = 0')}.`},
      {tag:'Đáp số',ask:`Tính tung độ của ${tm('M')}:`,tpl:`${tm('y_M =')} [_]`,ans:[y0],hint:`Thay hoành độ vừa tìm vào ${tm(fnStr(p,q))}.`}
    ],
    sol:`${tm('M \\in (P)')} nên ${tm(`y = ${aTerm(p,q)}x^2`)}; theo đề ${tm(`y = ${k}x`)}. Suy ra ${tm(eq)}, ${tm('x \\ne 0')} nên ${tm(`${aTerm(p,q)}x = ${k}`)}, được ${tm('x = '+x0)}. Tung độ ${tm(`y = ${k}\\cdot${tp(x0)}`)} ${tb('= '+y0)}.`});
};

lesson(6,'on-thi-ham-so-parabol','Đại số 1. Hàm số y = ax² và đồ thị','Ôn tuyển sinh Bài 1 (1,5 điểm): giá trị hàm số, bảng giá trị để vẽ đồ thị, tính chất parabol, đọc đồ thị tìm a, tìm điểm thuộc đồ thị theo điều kiện.',[gHs1,gHs2,gHs3,gHs4,gHs5], {intro:[
  {t:`Hàm số ${tm('y = ax^2')} và đồ thị`, b:`<ul><li>Hàm số ${tm('y = ax^2')} ${tm('(a \\ne 0)')} xác định với mọi ${tm('x')}; đồ thị là <b>parabol</b> ${tm('(P)')} có đỉnh ${tm('O(0;0)')}, nhận trục ${tm('Oy')} làm trục đối xứng.</li><li>${tm('a \\gt 0')}: bề lõm hướng lên, ${tm('y \\ge 0')}, ${tm('O')} là điểm thấp nhất; hàm số nghịch biến khi ${tm('x \\lt 0')}, đồng biến khi ${tm('x \\gt 0')}.</li><li>${tm('a \\lt 0')}: bề lõm hướng xuống, ${tm('y \\le 0')}, ${tm('O')} là điểm cao nhất; hàm số đồng biến khi ${tm('x \\lt 0')}, nghịch biến khi ${tm('x \\gt 0')}.</li></ul>`, warn:`Điểm ${tm('(x;y)')} và ${tm('(-x;y)')} cùng thuộc ${tm('(P)')} vì ${tm('(-x)^2 = x^2')}. Khi thay ${tm('x')} âm phải đặt trong ngoặc: ${tm('(-3)^2 = 9')}, không phải ${tm('-3^2 = -9')}.`},
  {t:`Điểm thuộc đồ thị – tìm ${tm('a')}`, b:`Điểm ${tm('A(x_0;y_0)')} thuộc ${tm('(P)')}: ${tm('y = ax^2')} ${tm('\\Leftrightarrow')} ${tm('y_0 = a x_0^2')}. Biết một điểm (khác ${tm('O')}) thì tìm được ${tm('a = \\dfrac{y_0}{x_0^2}')}; biết ${tm('a')} và ${tm('x_0')} thì tính được ${tm('y_0')}.`, ex:`Đọc đồ thị: chọn điểm có tọa độ <b>nguyên, rõ ràng</b> (khác gốc ${tm('O')}), thay vào ${tm('y = ax^2')} để tìm ${tm('a')}, rồi kiểm tra lại bằng một điểm thứ hai.`},
  {t:`Lập bảng giá trị và vẽ đồ thị`, b:`Chọn các giá trị ${tm('x')} đối xứng quanh ${tm('0')} (như ${tm('-2;\\ -1;\\ 0;\\ 1;\\ 2')}), tính ${tm('y')}, biểu diễn các điểm rồi nối bằng <b>đường cong trơn</b> đi qua ${tm('O')}.`, warn:`Không nối các điểm bằng đoạn thẳng; ${tm('O')} phải nằm đúng gốc tọa độ và đồ thị đối xứng qua ${tm('Oy')}. Nhớ ghi tên ${tm('(P)')} và các điểm đã dùng.`},
  {t:`Tìm điểm theo điều kiện`, b:`Khi đề cho tung độ (hoặc hoành độ), thay vào phương trình ${tm('y = ax^2')} rồi giải. Giải ${tm('ax^2 = k')} có thể ra <b>hai nghiệm đối nhau</b> ${tm('x = \\pm\\sqrt{\\dfrac{k}{a}}')} — tức là hai điểm đối xứng qua ${tm('Oy')}.`, ex:`Trước khi giải hãy kiểm tra dấu: ${tm('a \\gt 0')} thì ${tm('y \\ge 0')}, ${tm('a \\lt 0')} thì ${tm('y \\le 0')}. Nếu tung độ trái dấu với ${tm('a')} thì không có điểm nào.`}
]});
}

/* =====================================================================
   ÔN THI VÀO 10 – Đại số 2. Phương trình bậc hai: điều kiện có nghiệm, hệ thức Viète
   Dạng 1 giải PT · Dạng 2 biệt thức/điều kiện nghiệm · Dạng 3 Viète – giá trị biểu thức
   Dạng 4 biết một nghiệm, lập PT mới · Dạng 5 tham số m và hệ thức giữa hai nghiệm
   ===================================================================== */
{
const sg = n => n<0 ? `- ${-n}` : `+ ${n}`;
const isSq = n => n>=0 && Number.isInteger(Math.sqrt(n));
const quad = (a,b,c) => `${tpoly([a,'x^2'],[b,'x'],[c,''])} = 0`;
const pickSP = (smax,plo,phi,nonsq) => { for(let i=0;i<800;i++){ const S=R(-smax,smax), P=R(plo,phi), D=S*S-4*P; if(S&&P&&D>0&&!(nonsq&&isSq(D))) return [S,P]; } return [3,-1]; };
const divisors = n => { const r=[]; for(let d=2;d<=n;d++) if(n%d===0) r.push(d); return r; };

/* Dạng 1. Giải phương trình bậc hai (nghiệm nguyên) */
const gPq1 = lv => {
  let a,b,c,r1,r2,text,pre='';
  if(lv<3){
    a = lv===1 ? 1 : pick([2,3,4,-1,-2]);
    do{ r1=R(-7,4); r2=R(-4,8); }while(r1>=r2 || r1*r2===0 || r1+r2===0);
    b=-a*(r1+r2); c=a*r1*r2;
    text=`Giải phương trình ${tm(quad(a,b,c))}. Ghi nghiệm nhỏ ${tm('x_1')} và nghiệm lớn ${tm('x_2')}.`;
  } else {
    let u,v,w;
    do{ u=R(-5,5); v=R(-5,5); r1=R(-7,7); r2=-(u+v)-r1; w=u*v-r1*r2; }while(!u||!v||r1===r2||!w);
    if(r1>r2) [r1,r2]=[r2,r1];
    a=1; b=u+v; c=u*v-w;
    const lin = k => `x ${k<0?'-':'+'} ${Math.abs(k)}`;
    text=`Giải phương trình ${tm(`(${lin(u)})(${lin(v)}) = ${w}`)}. Ghi nghiệm nhỏ ${tm('x_1')} và nghiệm lớn ${tm('x_2')}.`;
    pre=`Khai triển và chuyển vế: ${tm(`${tpoly([1,'x^2'],[u+v,'x'],[u*v,'']) } = ${w}`)}, tức ${tm(quad(a,b,c))}.<br>`;
  }
  const D=b*b-4*a*c, s=Math.abs(a)*(r2-r1), xa=(-b-s)/(2*a), xb=(-b+s)/(2*a);
  return QB({text,tpl:`${tm('x_1 =')} [_] &emsp; ${tm('x_2 =')} [_]`,ans:[r1,r2],
    hint: lv===3 ? `Khai triển vế trái, chuyển hết về một vế để có dạng ${tm('ax^2 + bx + c = 0')}, rồi tính ${tm('\\Delta = b^2 - 4ac')} và dùng công thức nghiệm.`
                 : `Xác định ${tm('a,\\ b,\\ c')} (chú ý dấu), tính ${tm('\\Delta = b^2 - 4ac')} rồi dùng công thức nghiệm ${tm('x = \\dfrac{-b \\pm \\sqrt{\\Delta}}{2a}')}.`,
    sol:`${pre}Phương trình có ${tm(`a = ${a},\\ b = ${b},\\ c = ${c}`)}.<br>`+
      `${tm(`\\Delta = b^2 - 4ac = ${tp(b)}^2 - 4\\cdot${tp(a)}\\cdot${tp(c)} = ${D}`)}, ${tm(`\\Delta \\gt 0`)} nên phương trình có hai nghiệm phân biệt, ${tm(`\\sqrt{\\Delta} = ${s}`)}.<br>`+
      `${tm(`x = \\dfrac{-b \\pm \\sqrt{\\Delta}}{2a}`)}: ${tm(`\\dfrac{${-b} - ${s}}{${2*a}} = ${xa}`)} và ${tm(`\\dfrac{${-b} + ${s}}{${2*a}} = ${xb}`)}.<br>`+
      `Vậy ${tb('x_1 = '+r1)} và ${tb('x_2 = '+r2)}.`});
};

/* Dạng 2. Biệt thức Δ và điều kiện về số nghiệm */
const gPq2 = lv => {
  if(lv===1){
    const kind=pick([0,1,2]); let a,b,c;
    if(kind===1){ a=pick([1,2,3,-1,-2]); const r=pick([-4,-3,-2,-1,1,2,3,4]); b=-2*a*r; c=a*r*r; }
    else for(;;){ a=pick([1,2,3,-1,-2]); b=R(-8,8); c=R(-8,8); if(!b||!c) continue; const D=b*b-4*a*c; if(kind===2?D>0:D<0) break; }
    const D=b*b-4*a*c, good=['Vô nghiệm','Có nghiệm kép','Có hai nghiệm phân biệt'][kind];
    const why=[`${tm('\\Delta \\lt 0')} nên phương trình vô nghiệm`,`${tm('\\Delta = 0')} nên phương trình có nghiệm kép`,`${tm('\\Delta \\gt 0')} nên phương trình có hai nghiệm phân biệt`][kind];
    return QC({text:`Phương trình ${tm(quad(a,b,c))} có bao nhiêu nghiệm?`,opts:['Vô nghiệm','Có nghiệm kép','Có hai nghiệm phân biệt','Có vô số nghiệm'],ans:good,keepOrder:true,
      hint:`Tính biệt thức ${tm('\\Delta = b^2 - 4ac')}, rồi xét dấu của ${tm('\\Delta')}: âm, bằng ${tm('0')} hay dương.`,
      sol:`Có ${tm(`a = ${a},\\ b = ${b},\\ c = ${c}`)}. ${tm(`\\Delta = ${tp(b)}^2 - 4\\cdot${tp(a)}\\cdot${tp(c)} = ${D}`)}. Vì ${why}. Đáp án: <b>${good}</b>.`});
  }
  if(lv===2){
    const v=pick(['A','B','C']);
    if(v==='B'){
      const t=pick([2,3,4,5,6]), c=pick(divisors(t*t)), m0=t*t/c, sgn=pick([-1,1]);
      return QB({text:`Tìm ${tm('m')} để phương trình ${tm(`mx^2 ${sgn<0?'-':'+'} ${2*t}x + ${c} = 0`)} có nghiệm kép.`,tpl:`${tm('m =')} [_]`,ans:[m0],
        hint:`Phương trình bậc hai ${tm('(m \\ne 0)')} có nghiệm kép khi ${tm('\\Delta = 0')} (hoặc ${tm('\\Delta\' = 0')}). Hãy lập ${tm('\\Delta')} theo ${tm('m')} rồi giải phương trình bậc nhất.`,
        sol:`Phương trình bậc hai nên ${tm('m \\ne 0')}. Có ${tm(`a = m,\\ b = ${sgn*2*t},\\ c = ${c}`)}.<br>`+
          `${tm(`\\Delta = ${tp(sgn*2*t)}^2 - 4\\cdot m\\cdot ${c} = ${4*t*t} - ${4*c}m`)}.<br>`+
          `Nghiệm kép khi ${tm('\\Delta = 0')}: ${tm(`${4*t*t} - ${4*c}m = 0`)}, suy ra ${tm(`m = \\dfrac{${4*t*t}}{${4*c}}`)} ${tb('= '+m0)} (thoả ${tm('m \\ne 0')}).`});
    }
    const t=R(2,7), b=pick([-1,1])*2*t, bt=`x^2 ${b<0?'-':'+'} ${Math.abs(b)}x + m = 0`;
    if(v==='A') return QB({text:`Tìm ${tm('m')} để phương trình ${tm(bt)} có nghiệm kép.`,tpl:`${tm('m =')} [_]`,ans:[t*t],
      hint:`Nghiệm kép khi ${tm('\\Delta = 0')}. Lập ${tm('\\Delta = b^2 - 4ac')} theo ${tm('m')} rồi giải phương trình ẩn ${tm('m')}.`,
      sol:`Có ${tm(`a = 1,\\ b = ${b},\\ c = m`)}. ${tm(`\\Delta = ${tp(b)}^2 - 4\\cdot1\\cdot m = ${b*b} - 4m`)}.<br>Nghiệm kép khi ${tm('\\Delta = 0')}: ${tm(`${b*b} - 4m = 0`)}, suy ra ${tb('m = '+t*t)}.`});
    return QB({text:`Tìm số nguyên ${tm('m')} <b>lớn nhất</b> để phương trình ${tm(bt)} có hai nghiệm phân biệt.`,tpl:`${tm('m =')} [_]`,ans:[t*t-1],
      hint:`Hai nghiệm phân biệt khi ${tm('\\Delta \\gt 0')}. Lập ${tm('\\Delta')} theo ${tm('m')}, giải bất phương trình rồi chọn số nguyên lớn nhất thoả mãn.`,
      sol:`${tm(`\\Delta = ${tp(b)}^2 - 4\\cdot1\\cdot m = ${b*b} - 4m`)}. Hai nghiệm phân biệt khi ${tm('\\Delta \\gt 0')}: ${tm(`${b*b} - 4m \\gt 0`)}, tức ${tm(`m \\lt ${t*t}`)}.<br>Số nguyên lớn nhất thoả ${tm(`m \\lt ${t*t}`)} là ${tb('m = '+(t*t-1))}.`});
  }
  let r1,r2;
  do{ r1=-R(1,5); r2=R(1,6); }while(r1+r2===0);
  const s=r1+r2, p=r1*r2, cm = `${s===1?'':s===-1?'-':s}m ${sg(-p)}`;
  return QB({text:`Tìm giá trị <b>dương</b> của ${tm('m')} để phương trình ${tm(`x^2 - 2mx + ${cm} = 0`)} có nghiệm kép.`,tpl:`${tm('m =')} [_]`,ans:[r2],
    hint:`Nghiệm kép khi ${tm('\\Delta\' = 0')} (hoặc ${tm('\\Delta = 0')}). Lúc này ${tm('\\Delta')} là một biểu thức bậc hai theo ${tm('m')}: giải phương trình đó rồi chọn giá trị dương.`,
    sol:`Có ${tm(`a = 1,\\ b = -2m,\\ c = ${cm}`)}, dùng ${tm(`\\Delta' = (b/2)^2 - ac`)} với ${tm('b/2 = -m')}.<br>`+
      `${tm(`\\Delta' = (-m)^2 - 1\\cdot(${cm}) = ${tpoly([1,'m^2'],[-s,'m'],[p,''])}`)}.<br>`+
      `Nghiệm kép khi ${tm("\\Delta' = 0")}: ${tm(`(m ${sg(-r1)})(m ${sg(-r2)}) = 0`)}, suy ra ${tm(`m = ${r1}`)} hoặc ${tm(`m = ${r2}`)}.<br>`+
      `Chọn giá trị dương: ${tb('m = '+r2)}.`});
};

/* Dạng 3. Hệ thức Viète – tổng, tích, giá trị biểu thức (không giải phương trình) */
const E2 = [
  {t:'x_1^2 + x_2^2', tr:'(x_1 + x_2)^2 - 2x_1x_2', sub:(S,P)=>`${tp(S)}^2 - 2\\cdot${tp(P)}`, f:(S,P)=>S*S-2*P},
  {t:'(x_1 + 1)(x_2 + 1)', tr:'x_1x_2 + (x_1 + x_2) + 1', sub:(S,P)=>`${tp(P)} + ${tp(S)} + 1`, f:(S,P)=>P+S+1},
  {t:'x_1^2x_2 + x_1x_2^2', tr:'x_1x_2(x_1 + x_2)', sub:(S,P)=>`${tp(P)}\\cdot${tp(S)}`, f:(S,P)=>P*S},
  {t:'(x_1 - 2)(x_2 - 2)', tr:'x_1x_2 - 2(x_1 + x_2) + 4', sub:(S,P)=>`${tp(P)} - 2\\cdot${tp(S)} + 4`, f:(S,P)=>P-2*S+4},
  {t:'(x_1 - x_2)^2', tr:'(x_1 + x_2)^2 - 4x_1x_2', sub:(S,P)=>`${tp(S)}^2 - 4\\cdot${tp(P)}`, f:(S,P)=>S*S-4*P}
];
const E3 = [
  {t:'x_1^3 + x_2^3', tr:'(x_1 + x_2)^3 - 3x_1x_2(x_1 + x_2)', sub:(S,P)=>`${tp(S)}^3 - 3\\cdot${tp(P)}\\cdot${tp(S)}`, f:(S,P)=>S*S*S-3*P*S},
  {t:'(x_1^2 - 1)(x_2^2 - 1)', tr:'(x_1x_2)^2 - \\left[(x_1 + x_2)^2 - 2x_1x_2\\right] + 1', sub:(S,P)=>`${tp(P)}^2 - (${tp(S)}^2 - 2\\cdot${tp(P)}) + 1`, f:(S,P)=>P*P-(S*S-2*P)+1},
  {t:'x_1^3x_2 + x_1x_2^3', tr:'x_1x_2\\left[(x_1 + x_2)^2 - 2x_1x_2\\right]', sub:(S,P)=>`${tp(P)}\\cdot(${tp(S)}^2 - 2\\cdot${tp(P)})`, f:(S,P)=>P*(S*S-2*P)},
  {t:'(2x_1 + x_2)(2x_2 + x_1)', tr:'2(x_1 + x_2)^2 + x_1x_2', sub:(S,P)=>`2\\cdot${tp(S)}^2 + ${tp(P)}`, f:(S,P)=>2*S*S+P}
];
const gPq3 = lv => {
  const a = lv===1 ? pick([1,1,2]) : lv===2 ? pick([1,1,2]) : pick([1,2,-1,3]);
  const [S,P] = lv===1 ? pickSP(7,-8,8,false) : lv===2 ? pickSP(7,-8,8,true) : pickSP(5,-6,6,true);
  const b=-a*S, c=a*P, D=b*b-4*a*c, pt=tm(quad(a,b,c));
  const delta=`${tm(`\\Delta = ${tp(b)}^2 - 4\\cdot${tp(a)}\\cdot${tp(c)} = ${D} \\gt 0`)} nên phương trình có hai nghiệm phân biệt ${tm('x_1,\\,x_2')}`;
  const viete=`Theo hệ thức Viète: ${tm(`x_1 + x_2 = -\\dfrac{b}{a} = ${S}`)} và ${tm(`x_1x_2 = \\dfrac{c}{a} = ${P}`)}`;
  if(lv===1) return QB({text:`Cho phương trình ${pt} có hai nghiệm ${tm('x_1,\\,x_2')}. Không giải phương trình, tính tổng và tích hai nghiệm.`,
    tpl:`${tm('x_1 + x_2 =')} [_] &emsp; ${tm('x_1x_2 =')} [_]`,ans:[S,P],
    hint:`Kiểm tra ${tm('\\Delta \\ge 0')} rồi áp dụng hệ thức Viète: tổng bằng ${tm('-\\dfrac{b}{a}')}, tích bằng ${tm('\\dfrac{c}{a}')}.`,
    sol:`${delta}.<br>${viete}: ${tb(`x_1 + x_2 = ${S}`)}, ${tb(`x_1x_2 = ${P}`)}.`});
  const e = lv===2 ? pick(E2) : pick(E3), val=e.f(S,P);
  return QB({text:`Cho phương trình ${pt} có hai nghiệm ${tm('x_1,\\,x_2')}. Không giải phương trình, tính ${tm('A = '+e.t)}.`,tpl:`${tm('A =')} [_]`,ans:[val],
    hint:`Tìm ${tm('x_1 + x_2')} và ${tm('x_1x_2')} bằng hệ thức Viète, rồi biến đổi ${tm('A')} thành biểu thức chỉ chứa tổng và tích hai nghiệm.`,
    sol:`${delta}.<br>${viete}.<br>Biến đổi: ${tm(`A = ${e.t} = ${e.tr}`)}.<br>Thay số: ${tm(`A = ${e.sub(S,P)}`)} ${tb('= '+val)}.`});
};

/* Dạng 4. Biết một nghiệm – tìm tham số, nghiệm còn lại; lập phương trình từ hai nghiệm mới */
const gPq4 = lv => {
  if(lv===1){
    if(Math.random()<.5){
      let r,b; do{ r=pick([-5,-4,-3,-2,-1,1,2,3,4,5]); b=pick([-6,-5,-4,-3,-2,-1,1,2,3,4,5,6]); }while(b===-r);
      const m0=-r*r-b*r;
      return QB({text:`Biết ${tm('x = '+r)} là một nghiệm của phương trình ${tm(`x^2 ${sg(b)}x + m = 0`)}. Tìm ${tm('m')}.`,tpl:`${tm('m =')} [_]`,ans:[m0],
        hint:`Nếu ${tm('x_0')} là nghiệm của phương trình thì thay ${tm('x = x_0')} vào, hai vế bằng nhau. Giải phương trình ẩn ${tm('m')}.`,
        sol:`Thay ${tm('x = '+r)} vào phương trình: ${tm(`${tp(r)}^2 ${sg(b*r)} + m = 0`)}, tức ${tm(`${r*r+b*r} + m = 0`)}. Suy ra ${tb('m = '+m0)}.`});
    }
    let r,b,m0,c; do{ r=pick([-3,-2,-1,1,2,3]); b=pick([-5,-4,-3,-2,-1,1,2,3,4,5]); m0=pick([-3,-2,-1,1,2,3]); c=-m0*r*r-b*r; }while(!c);
    return QB({text:`Biết ${tm('x = '+r)} là một nghiệm của phương trình ${tm(`mx^2 ${sg(b)}x ${sg(c)} = 0`)} (${tm('m')} là tham số). Tìm ${tm('m')}.`,tpl:`${tm('m =')} [_]`,ans:[m0],
      hint:`Thay ${tm('x = '+r)} vào phương trình để được phương trình bậc nhất ẩn ${tm('m')}.`,
      sol:`Thay ${tm('x = '+r)}: ${tm(`m\\cdot${tp(r)}^2 ${sg(b*r)} ${sg(c)} = 0`)}, tức ${tm(`${r*r}m ${sg(b*r+c)} = 0`)}.<br>Suy ra ${tm(`${r*r}m = ${-(b*r+c)}`)}, vậy ${tb('m = '+m0)}.`});
  }
  if(lv===2){
    let r,m0,k,c,S0; do{ r=pick([-4,-3,-2,-1,1,2,3,4]); m0=R(-4,5); k=pick([1,2,3,-1,-2]); S0=m0+k; c=S0*r-r*r; }while(!c||S0-r===r||S0-r===0||!S0);
    const x2=S0-r;
    return QB({text:`Cho phương trình ${tm(`x^2 - (m ${sg(k)})x ${sg(c)} = 0`)} (${tm('m')} là tham số) có một nghiệm ${tm('x_1 = '+r)}. Tìm ${tm('m')} và nghiệm còn lại ${tm('x_2')}.`,
      tpl:`${tm('m =')} [_] &emsp; ${tm('x_2 =')} [_]`,ans:[m0,x2],
      hint:`Thay ${tm('x_1 = '+r)} vào phương trình để tìm ${tm('m')}. Sau đó dùng hệ thức Viète (tổng hai nghiệm) để tìm ${tm('x_2')}.`,
      sol:`Thay ${tm('x = '+r)}: ${tm(`${tp(r)}^2 - (m ${sg(k)})\\cdot${tp(r)} ${sg(c)} = 0`)}, suy ra ${tm(`(m ${sg(k)})\\cdot${tp(r)} = ${r*r+c}`)}, tức ${tm(`m ${sg(k)} = ${S0}`)}. Vậy ${tb('m = '+m0)}.<br>`+
        `Khi đó tổng hai nghiệm là ${tm(`x_1 + x_2 = m ${sg(k)} = ${S0}`)} (Viète), nên ${tm(`x_2 = ${S0} - ${tp(r)}`)} ${tb('= '+x2)}.<br>Kiểm tra bằng tích: ${tm(`x_1x_2 = ${r}\\cdot${tp(x2)} = ${r*x2} = c`)} ✓.`});
  }
  const [S,P]=pickSP(5,-5,6,true), D=S*S-4*P, orig=tm(quad(1,-S,P));
  const kind=pick(['sq','shift','dbl']);
  let desc,S2,P2,how;
  if(kind==='sq'){ desc=`${tm('x_1^2')} và ${tm('x_2^2')}`; S2=S*S-2*P; P2=P*P;
    how=`${tm(`S' = x_1^2 + x_2^2 = (x_1 + x_2)^2 - 2x_1x_2 = ${tp(S)}^2 - 2\\cdot${tp(P)} = ${S2}`)}; ${tm(`P' = x_1^2x_2^2 = (x_1x_2)^2 = ${tp(P)}^2 = ${P2}`)}`; }
  else if(kind==='shift'){ const k=pick([1,2,-1,-2]); desc=`${tm('x_1 '+sg(k))} và ${tm('x_2 '+sg(k))}`; S2=S+2*k; P2=P+k*S+k*k;
    how=`${tm(`S' = (x_1 ${sg(k)}) + (x_2 ${sg(k)}) = (x_1 + x_2) ${sg(2*k)} = ${S2}`)}; ${tm(`P' = (x_1 ${sg(k)})(x_2 ${sg(k)}) = x_1x_2 ${sg(k)}(x_1 + x_2) + ${k*k} = ${P2}`)}`; }
  else { desc=`${tm('2x_1')} và ${tm('2x_2')}`; S2=2*S; P2=4*P;
    how=`${tm(`S' = 2x_1 + 2x_2 = 2(x_1 + x_2) = ${S2}`)}; ${tm(`P' = 2x_1\\cdot2x_2 = 4x_1x_2 = ${P2}`)}`; }
  return QB({text:`Gọi ${tm('x_1,\\,x_2')} là hai nghiệm của phương trình ${orig}. Lập phương trình bậc hai ${tm('x^2 + bx + c = 0')} nhận ${desc} làm hai nghiệm (không giải phương trình ban đầu). Tìm ${tm('b')} và ${tm('c')}.`,
    tpl:`${tm('b =')} [_] &emsp; ${tm('c =')} [_]`,ans:[-S2,P2],
    hint:`Tìm tổng ${tm("S'")} và tích ${tm("P'")} của hai nghiệm mới bằng Viète (từ ${tm('x_1 + x_2')} và ${tm('x_1x_2')} của phương trình ban đầu). Phương trình cần lập là ${tm("x^2 - S'x + P' = 0")}.`,
    sol:`${tm(`\\Delta = ${tp(-S)}^2 - 4\\cdot${tp(P)} = ${D} \\gt 0`)} nên phương trình ban đầu có hai nghiệm; Viète: ${tm(`x_1 + x_2 = ${S}`)}, ${tm(`x_1x_2 = ${P}`)}.<br>`+
      `${how}.<br>Phương trình cần lập: ${tm(`x^2 - S'x + P' = 0`)}, tức ${tm(quad(1,-S2,P2))}. Vậy ${tb('b = '+(-S2))}, ${tb('c = '+P2)}.`});
};

/* Dạng 5. Tham số m và hệ thức giữa hai nghiệm (Bài 2b của đề thi) */
const gPq5 = lv => {
  if(lv===1){
    let a,b,m0,t; do{ a=pick([-3,-2,-1,1,2,3]); b=pick([-4,-3,-2,-1,1,2,3,4]); m0=R(-4,5); t=m0+b; }while((m0+a)*(m0+a)-(m0+b)<=0);
    const dl=(m0+a)*(m0+a)-(m0+b);
    return QB({text:`Cho phương trình ${tm(`x^2 - 2(m ${sg(a)})x + m ${sg(b)} = 0`)} (${tm('m')} là tham số). Tìm ${tm('m')} để phương trình có hai nghiệm phân biệt ${tm('x_1,\\,x_2')} thoả ${tm(`x_1x_2 = ${t}`)}.`,tpl:`${tm('m =')} [_]`,ans:[m0],
      hint:`Dùng Viète để viết ${tm('x_1x_2')} theo ${tm('m')}, giải phương trình tìm ${tm('m')}; sau đó thay lại để kiểm tra điều kiện hai nghiệm phân biệt ${tm("(\\Delta' \\gt 0)")}.`,
      sol:`Theo Viète: ${tm(`x_1x_2 = \\dfrac{c}{a} = m ${sg(b)}`)}. Theo đề ${tm(`x_1x_2 = ${t}`)} nên ${tm(`m ${sg(b)} = ${t}`)}, suy ra ${tm('m = '+m0)}.<br>`+
        `Kiểm tra điều kiện: ${tm(`\\Delta' = (m ${sg(a)})^2 - (m ${sg(b)})`)}; với ${tm('m = '+m0)}: ${tm(`\\Delta' = ${tp(m0+a)}^2 - ${tp(m0+b)} = ${dl} \\gt 0`)}, thoả mãn. Vậy ${tb('m = '+m0)}.`});
  }
  if(lv===2){
    let u,b,k,m0,t; const kc=[1,3,4];
    for(let i=0;i<500;i++){ u=pick([-3,-2,-1,1,2,3]); b=pick([-3,-2,-1,1,2,3]); k=pick(kc); m0=R(-4,5); const S0=2*m0+u, P0=m0+b; if(S0*S0-4*P0>0){ t=S0-k*P0; break; } }
    const S0=2*m0+u, P0=m0+b, dl=S0*S0-4*P0, kk=k===1?'':String(k);
    return QB({text:`Cho phương trình ${tm(`x^2 - (2m ${sg(u)})x + m ${sg(b)} = 0`)} (${tm('m')} là tham số). Tìm ${tm('m')} để phương trình có hai nghiệm phân biệt ${tm('x_1,\\,x_2')} thoả ${tm(`x_1 + x_2 - ${kk}x_1x_2 = ${t}`)}.`,tpl:`${tm('m =')} [_]`,ans:[m0],
      hint:`Viết ${tm('x_1 + x_2')} và ${tm('x_1x_2')} theo ${tm('m')} bằng Viète, thay vào hệ thức của đề để được phương trình bậc nhất ẩn ${tm('m')}. Nhớ kiểm tra ${tm('\\Delta \\gt 0')} với giá trị ${tm('m')} tìm được.`,
      sol:`Viète: ${tm(`x_1 + x_2 = 2m ${sg(u)}`)}, ${tm(`x_1x_2 = m ${sg(b)}`)}.<br>`+
        `Thay vào hệ thức: ${tm(`(2m ${sg(u)}) - ${k===1?'':k}(m ${sg(b)}) = ${t}`)}, rút gọn: ${tm(`${tpoly([2-k,'m'],[u-k*b,''])} = ${t}`)}, suy ra ${tm('m = '+m0)}.<br>`+
        `Kiểm tra: ${tm(`\\Delta = (2m ${sg(u)})^2 - 4(m ${sg(b)})`)}; với ${tm('m = '+m0)}: ${tm(`\\Delta = ${tp(S0)}^2 - 4\\cdot${tp(P0)} = ${dl} \\gt 0`)}, thoả mãn. Vậy ${tb('m = '+m0)}.`});
  }
  let a,mg,mb,t,k,ok=false;
  for(let i=0;i<5000&&!ok;i++){ a=pick([-3,-2,-1,1,2,3]); mg=R(-5,5); mb=-4*a-mg; if(mg===mb) continue; t=R(-6,6); if(!t) continue;
    k=2*a*a-t-mg*mb; if(k<1||k>30) continue; const D=m=>2*a*m+a*a-t; if(D(mg)>0&&D(mb)<0) ok=true; }
  if(!ok){ a=1; mg=3; mb=-7; t=-2; k=2*a*a-t-mg*mb; }
  const K=2*k, pt=`x^2 - 2(m ${sg(a)})x + m^2 ${sg(t)} = 0`, thr=tfrac(t-a*a,2*a), dir=a>0?'\\gt':'\\lt', lo=Math.min(mg,mb), hi=Math.max(mg,mb);
  const good=`m ${dir} ${thr}`, ds=`${tpoly([2*a,'m'],[a*a-t,''])}`;
  const bad=[`m ${a>0?'\\lt':'\\gt'} ${thr}`,`m ${a>0?'\\ge':'\\le'} ${thr}`,`m ${a>0?'\\le':'\\ge'} ${thr}`];
  return QS({direct:true,text:`Cho phương trình ${tm(pt)} (${tm('m')} là tham số). Tìm ${tm('m')} để phương trình có hai nghiệm phân biệt ${tm('x_1,\\,x_2')} thoả ${tm(`x_1^2 + x_2^2 = ${K}`)}.`,
    hint:`Bước 1: điều kiện ${tm("\\Delta' \\gt 0")}. Bước 2: ${tm('x_1^2 + x_2^2 = (x_1 + x_2)^2 - 2x_1x_2')} rồi thay Viète, giải phương trình ẩn ${tm('m')}. Bước 3: đối chiếu điều kiện, loại giá trị không thoả.`,
    steps:[
      {tag:'Điều kiện',ask:`Phương trình có hai nghiệm phân biệt khi ${tm("\\Delta' \\gt 0")}. Điều kiện của ${tm('m')} là:`,opts:[good,...bad].map(tm),ans:tm(good),
       hint:`${tm(`\\Delta' = (m ${sg(a)})^2 - (m^2 ${sg(t)})`)} là biểu thức bậc nhất theo ${tm('m')}. Giải bất phương trình bậc nhất; chia cho số âm thì đổi chiều.`},
      {tag:'Lập và giải',ask:`Từ Viète, ${tm(`x_1^2 + x_2^2 = (x_1 + x_2)^2 - 2x_1x_2 = ${K}`)} dẫn tới phương trình ẩn ${tm('m')}. Giải phương trình, ghi hai giá trị ${tm('m_1 \\lt m_2')}:`,tpl:`${tm('m_1 =')} [_] &emsp; ${tm('m_2 =')} [_]`,ans:[lo,hi],
       hint:`Thay ${tm(`x_1 + x_2 = 2(m ${sg(a)})`)} và ${tm(`x_1x_2 = m^2 ${sg(t)}`)} vào, khai triển, đưa về phương trình bậc hai ẩn ${tm('m')} và giải.`},
      {tag:'Đáp số',ask:`Đối chiếu với điều kiện ở bước 1, giá trị của ${tm('m')} thoả đề bài là:`,tpl:`${tm('m =')} [_]`,ans:[mg],hint:`Giá trị nào làm ${tm("\\Delta' \\gt 0")} thì nhận, giá trị còn lại thì loại.`}
    ],
    sol:`Viète: ${tm(`x_1 + x_2 = 2(m ${sg(a)})`)}, ${tm(`x_1x_2 = m^2 ${sg(t)}`)}.<br>`+
      `<b>Điều kiện:</b> ${tm(`\\Delta' = (m ${sg(a)})^2 - (m^2 ${sg(t)}) = ${ds}`)}. Hai nghiệm phân biệt khi ${tm("\\Delta' \\gt 0")}, tức ${tm(good)}.<br>`+
      `<b>Hệ thức:</b> ${tm(`x_1^2 + x_2^2 = (x_1 + x_2)^2 - 2x_1x_2 = 4(m ${sg(a)})^2 - 2(m^2 ${sg(t)}) = ${tpoly([2,'m^2'],[8*a,'m'],[4*a*a-2*t,''])}`)}.<br>`+
      `Theo đề bằng ${tm(String(K))}: ${tm(`${tpoly([2,'m^2'],[8*a,'m'],[4*a*a-2*t-K,''])} = 0`)}, chia hai vế cho 2: ${tm(`${tpoly([1,'m^2'],[4*a,'m'],[2*a*a-t-k,''])} = 0`)}, suy ra ${tm(`m = ${lo}`)} hoặc ${tm(`m = ${hi}`)}.<br>`+
      `<b>Đối chiếu:</b> với ${tm('m = '+mg)}: ${tm(`\\Delta' = ${2*a*mg+a*a-t} \\gt 0`)} (nhận); với ${tm('m = '+mb)}: ${tm(`\\Delta' = ${2*a*mb+a*a-t} \\lt 0`)} (loại). Vậy ${tb('m = '+mg)}.`});
};

lesson(6,'on-thi-pt-bac-hai-viete','Đại số 2. Phương trình bậc hai, điều kiện có nghiệm và hệ thức Viète','Ôn tuyển sinh Bài 2 (1,5 điểm): giải phương trình bậc hai, biệt thức và số nghiệm, hệ thức Viète và giá trị biểu thức, biết một nghiệm – lập phương trình mới, tham số m với hệ thức giữa hai nghiệm.',[gPq1,gPq2,gPq3,gPq4,gPq5], {intro:[
  {t:`Giải phương trình bậc hai ${tm('ax^2 + bx + c = 0')} ${tm('(a \\ne 0)')}`, b:`<ul><li>${tm('\\Delta = b^2 - 4ac')}.</li><li>${tm('\\Delta \\lt 0')}: vô nghiệm; ${tm('\\Delta = 0')}: nghiệm kép ${tm('x = -\\dfrac{b}{2a}')}; ${tm('\\Delta \\gt 0')}: hai nghiệm ${tm('x_{1,2} = \\dfrac{-b \\pm \\sqrt{\\Delta}}{2a}')}.</li><li>Khi ${tm('b = 2b\\prime')}: ${tm('\\Delta\\prime = b\\prime^2 - ac')}, nghiệm ${tm('x_{1,2} = \\dfrac{-b\\prime \\pm \\sqrt{\\Delta\\prime}}{a}')}.</li></ul>`, warn:`“Có nghiệm” là ${tm('\\Delta \\ge 0')}; “có hai nghiệm phân biệt” là ${tm('\\Delta \\gt 0')}. Với phương trình chứa tham số, nhớ kiểm tra ${tm('a \\ne 0')} trước.`},
  {t:`Hệ thức Viète`, b:`<ul><li>Nếu ${tm('\\Delta \\ge 0')}: ${tm('S = x_1 + x_2 = -\\dfrac{b}{a}')}, ${tm('P = x_1 x_2 = \\dfrac{c}{a}')}.</li><li>Nhẩm nghiệm: ${tm('a + b + c = 0')} thì ${tm('x_1 = 1,\\ x_2 = \\dfrac{c}{a}')}; ${tm('a - b + c = 0')} thì ${tm('x_1 = -1,\\ x_2 = -\\dfrac{c}{a}')}.</li><li>Hai số có tổng ${tm('S')} và tích ${tm('P')} là hai nghiệm của ${tm('X^2 - SX + P = 0')} (điều kiện ${tm('S^2 - 4P \\ge 0')}).</li></ul>`, warn:`Phải nêu điều kiện ${tm('\\Delta \\ge 0')} (hoặc ${tm('\\Delta \\gt 0')}) <b>trước khi</b> dùng Viète. Hay quên dấu trừ ở ${tm('S = -\\dfrac{b}{a}')}.`},
  {t:`Biểu thức đối xứng hai nghiệm`, b:`<ul><li>${tm('x_1^2 + x_2^2 = S^2 - 2P')};  ${tm('(x_1 - x_2)^2 = S^2 - 4P')}.</li><li>${tm('\\dfrac{1}{x_1} + \\dfrac{1}{x_2} = \\dfrac{S}{P}')} ${tm('(P \\ne 0)')};  ${tm('x_1^3 + x_2^3 = S^3 - 3PS')}.</li></ul>`, ex:`Mọi biểu thức đối xứng đều đưa được về ${tm('S')} và ${tm('P')}. Thay ${tm('S')}, ${tm('P')} bằng số rồi mới tính — đừng tính từng nghiệm.`},
  {t:`Phương trình có tham số ${tm('m')}`, b:`Quy trình: (1) điều kiện ${tm('a \\ne 0')} và ${tm('\\Delta')}; (2) viết ${tm('S')}, ${tm('P')} theo ${tm('m')}; (3) đưa hệ thức đề cho về ${tm('S')}, ${tm('P')} rồi giải tìm ${tm('m')}; (4) <b>đối chiếu điều kiện</b> và kết luận.`, warn:`Giải ra ${tm('m')} mà không thử lại điều kiện ${tm('\\Delta')} là lỗi mất điểm phổ biến nhất. Có thể phải loại bớt giá trị ${tm('m')}.`}
]});
}

/* =====================================================================
   ÔN THI VÀO 10 – Đại số 3. Xác suất của biến cố trong các mô hình đơn giản
   Dạng 1 hộp bi · Dạng 2 xúc xắc · Dạng 3 đồng xu và ghép số · Dạng 4 thẻ đánh số
   Dạng 5 xác suất thực nghiệm, tìm số phần tử, thêm/bớt bi
   ===================================================================== */
{
const pr = (k,n) => { const g = gcd(k,n); return {frac:[k/g, n/g], mode:'simplest'}; };
const pf = (k,n) => { const g = gcd(k,n); return g>1 ? `${tf(k,n)} = ${tf(k/g,n/g)}` : tf(k,n); };
const PQ = tm('P =');
const hintP = 'Xác suất bằng số kết quả thuận lợi chia cho số kết quả có thể xảy ra (các kết quả cùng khả năng). Rút gọn phân số.';
const listS = a => a.join(', ');

/* Dạng 1. Hộp bi: một bi, biến cố đối / "hoặc", hai bi lấy cùng lúc */
const gXs1 = lv => {
  if(lv===1){
    const a=R(2,7), b=R(2,7), c=R(1,6), n=a+b+c, cnt=[a,b,c], nm=['đỏ','xanh','vàng'], i=pick([0,1,2]), k=cnt[i];
    return QB({text:`Một hộp chứa ${a} viên bi đỏ, ${b} viên bi xanh và ${c} viên bi vàng, cùng kích thước và khối lượng. Lấy ngẫu nhiên 1 viên bi từ hộp. Tính xác suất để lấy được viên bi ${nm[i]}.`,
      tpl:`${PQ} [F]`,ans:[pr(k,n)],hint:hintP,
      sol:`Lấy 1 viên bi từ ${a} + ${b} + ${c} = ${n} viên nên có ${tb(n)} kết quả có thể xảy ra, khả năng như nhau.<br>Có ${k} viên bi ${nm[i]} nên có ${tb(k)} kết quả thuận lợi.<br>Vậy ${tm(`P = ${pf(k,n)}`)}.`});
  }
  if(lv===2){
    const a=R(2,7), b=R(2,7), c=R(2,6), n=a+b+c, cnt=[a,b,c], nm=['đỏ','xanh','vàng'];
    if(pick([0,1])===0){
      const i=pick([0,1,2]), k=n-cnt[i];
      return QB({text:`Một hộp chứa ${a} viên bi đỏ, ${b} viên bi xanh và ${c} viên bi vàng, cùng kích thước. Lấy ngẫu nhiên 1 viên bi. Tính xác suất để viên bi lấy ra <b>không phải</b> màu ${nm[i]}.`,
        tpl:`${PQ} [F]`,ans:[pr(k,n)],hint:`Có thể đếm trực tiếp các viên bi còn lại, hoặc lấy 1 trừ xác suất của biến cố đối ("lấy được bi ${nm[i]}").`,
        sol:`Có ${tb(n)} kết quả có thể xảy ra.<br>Biến cố đối "lấy được bi ${nm[i]}" có ${cnt[i]} kết quả, nên số kết quả thuận lợi là ${n} - ${cnt[i]} = ${tb(k)}.<br>Vậy ${tm(`P = ${pf(k,n)}`)} (cũng bằng ${tm(`1 - ${tf(cnt[i],n)}`)}).`});
    }
    const i=pick([0,1,2]), j=(i+pick([1,2]))%3, k=cnt[i]+cnt[j];
    return QB({text:`Một hộp chứa ${a} viên bi đỏ, ${b} viên bi xanh và ${c} viên bi vàng, cùng kích thước. Lấy ngẫu nhiên 1 viên bi. Tính xác suất để lấy được viên bi màu ${nm[i]} <b>hoặc</b> màu ${nm[j]}.`,
      tpl:`${PQ} [F]`,ans:[pr(k,n)],hint:`Hai màu khác nhau không có viên bi chung, nên số kết quả thuận lợi là tổng số bi của hai màu.`,
      sol:`Có ${tb(n)} kết quả có thể xảy ra.<br>Số kết quả thuận lợi: ${cnt[i]} + ${cnt[j]} = ${tb(k)} (hai màu không có bi chung).<br>Vậy ${tm(`P = ${pf(k,n)}`)}.`});
  }
  const r=R(2,4), x=R(2,4), n=r+x, tot=n*(n-1)/2, same=r*(r-1)/2+x*(x-1)/2, diff=r*x;
  const kind=pick(['same','diff']), k=kind==='same'?same:diff;
  return QB({text:`Một hộp chứa ${r} viên bi đỏ và ${x} viên bi xanh, cùng kích thước. Lấy ngẫu nhiên <b>đồng thời</b> 2 viên bi từ hộp. Tính xác suất để 2 viên bi lấy ra ${kind==='same'?'<b>cùng màu</b>':'<b>khác màu</b>'}.`,
    tpl:`${PQ} [F]`,ans:[pr(k,tot)],hint:`Lấy cùng lúc nên không phân biệt thứ tự: đếm số cặp bi có thể có, rồi đếm số cặp thuận lợi theo màu.`,
    sol:`Mỗi cặp bi gồm 2 viên khác nhau và không kể thứ tự. Mỗi viên ghép với ${n - 1} viên còn lại, mỗi cặp bị đếm hai lần, nên số cặp là ${tm(`\\dfrac{${n}\\cdot ${n-1}}{2}`)} ${tb('= '+tot)} kết quả có thể xảy ra.<br>`+
      (kind==='same'
        ? `Cặp hai bi đỏ: ${tm(`\\dfrac{${r}\\cdot ${r-1}}{2} = ${r*(r-1)/2}`)}; cặp hai bi xanh: ${tm(`\\dfrac{${x}\\cdot ${x-1}}{2} = ${x*(x-1)/2}`)}. Số kết quả thuận lợi: ${r*(r-1)/2} + ${x*(x-1)/2} = ${tb(same)}.`
        : `Cặp gồm một bi đỏ và một bi xanh: ${r}\\cdot ${x} cách chọn, tức ${tb(diff)} kết quả thuận lợi.`.replace(/\\cdot/g,'×'))+
      `<br>Vậy ${tm(`P = ${pf(k,tot)}`)}.`});
};

/* Dạng 2. Xúc xắc: một con, hai con */
const DICE2 = [];
for(let a=1;a<=6;a++) for(let b=1;b<=6;b++) DICE2.push([a,b]);
const gXs2 = lv => {
  if(lv===1){
    const ev=pick([
      {d:'số chấm là số nguyên tố',s:[2,3,5]},{d:'số chấm chia hết cho 3',s:[3,6]},{d:'số chấm lớn hơn 4',s:[5,6]},
      {d:'số chấm là số chẵn',s:[2,4,6]},{d:'số chấm nhỏ hơn 3',s:[1,2]},{d:'số chấm là số chính phương',s:[1,4]},
      {d:'số chấm lớn hơn 1 và nhỏ hơn 5',s:[2,3,4]},{d:'số chấm không chia hết cho 2 và không chia hết cho 3',s:[1,5]}]);
    return QB({text:`Tung một con xúc xắc cân đối, đồng chất một lần. Tính xác suất để mặt xuất hiện có ${ev.d}.`,
      tpl:`${PQ} [F]`,ans:[pr(ev.s.length,6)],hint:hintP,
      sol:`Các kết quả có thể xảy ra: ${tm('1;\\,2;\\,3;\\,4;\\,5;\\,6')}, tức ${tb(6)} kết quả, khả năng như nhau.<br>Kết quả thuận lợi: ${tm(listS(ev.s).replace(/, /g,';\\,'))}, tức ${tb(ev.s.length)} kết quả.<br>Vậy ${tm(`P = ${pf(ev.s.length,6)}`)}.`});
  }
  if(lv===2){
    const s=pick([4,5,6,7,8,9,10]), fav=DICE2.filter(p=>p[0]+p[1]===s), k=fav.length;
    return QB({text:`Tung hai con xúc xắc cân đối, đồng chất (phân biệt được, ví dụ một xanh, một đỏ). Tính xác suất để tổng số chấm của hai mặt xuất hiện bằng ${s}.`,
      tpl:`${PQ} [F]`,ans:[pr(k,36)],hint:`Mỗi con có 6 kết quả; liệt kê các cặp (số chấm con thứ nhất; số chấm con thứ hai) có tổng cần tìm, cặp (1;2) khác cặp (2;1).`,
      sol:`Mỗi con có 6 kết quả nên có ${tm('6 \\cdot 6')} = ${tb(36)} kết quả có thể xảy ra, khả năng như nhau.<br>Các cặp có tổng bằng ${s}: ${fav.map(p=>tm(`(${p[0]};\\,${p[1]})`)).join(', ')}, tức ${tb(k)} kết quả thuận lợi.<br>Vậy ${tm(`P = ${pf(k,36)}`)}.`});
  }
  const K=pick([
    {d:'tích hai số chấm là số chẵn',f:p=>p[0]*p[1]%2===0,how:`Dùng biến cố đối "tích là số lẻ": chỉ xảy ra khi cả hai mặt đều lẻ, mỗi con có 3 mặt lẻ nên có ${tm('3 \\cdot 3 = 9')} kết quả. Số kết quả thuận lợi: 36 - 9 = `},
    {d:'tích hai số chấm chia hết cho 3',f:p=>p[0]*p[1]%3===0,how:`Dùng biến cố đối "tích không chia hết cho 3": cả hai mặt đều không chia hết cho 3, mỗi con có 4 mặt (1, 2, 4, 5) nên có ${tm('4 \\cdot 4 = 16')} kết quả. Số kết quả thuận lợi: 36 - 16 = `},
    {d:'hai mặt có số chấm khác nhau',f:p=>p[0]!==p[1],how:`Dùng biến cố đối "hai mặt giống nhau": có 6 kết quả ${tm('(1;\\,1),\\ldots,(6;\\,6)')}. Số kết quả thuận lợi: 36 - 6 = `},
    {d:'có ít nhất một con xuất hiện mặt 6 chấm',f:p=>p[0]===6||p[1]===6,how:`Dùng biến cố đối "không con nào ra 6": mỗi con có 5 mặt nên có ${tm('5 \\cdot 5 = 25')} kết quả. Số kết quả thuận lợi: 36 - 25 = `},
    {d:'tổng số chấm là số nguyên tố',f:p=>[2,3,5,7,11].includes(p[0]+p[1]),how:`Tổng nguyên tố có thể là 2, 3, 5, 7, 11 với số cặp lần lượt là 1, 2, 4, 6, 2. Số kết quả thuận lợi: 1 + 2 + 4 + 6 + 2 = `},
    {d:'giá trị tuyệt đối của hiệu hai số chấm bằng 1',f:p=>Math.abs(p[0]-p[1])===1,how:`Các cặp ${tm('(1;\\,2),(2;\\,3),(3;\\,4),(4;\\,5),(5;\\,6)')} và 5 cặp đảo thứ tự. Số kết quả thuận lợi: 5 + 5 = `}]);
  const k=DICE2.filter(K.f).length;
  return QB({text:`Tung hai con xúc xắc cân đối, đồng chất (phân biệt được). Tính xác suất để ${K.d}.`,
    tpl:`${PQ} [F]`,ans:[pr(k,36)],hint:`Có 36 kết quả. Với biến cố có "ít nhất" hoặc "chẵn", tính biến cố đối sẽ nhanh hơn rồi lấy 36 trừ đi.`,
    sol:`Có ${tm('6 \\cdot 6')} = ${tb(36)} kết quả có thể xảy ra, khả năng như nhau.<br>${K.how}${tb(k)}.<br>Vậy ${tm(`P = ${pf(k,36)}`)}.`});
};

/* Dạng 3. Đồng xu (liệt kê) và lập số có hai chữ số khác nhau */
const coinsAll = n => { let r=['']; for(let i=0;i<n;i++) r=r.flatMap(s=>[s+'S',s+'N']); return r; };
const cnt = (s,ch) => s.split(ch).length-1;
const gXs3 = lv => {
  if(lv<=2){
    const n=lv===1?2:3, all=coinsAll(n), tot=all.length;
    const E = lv===1
      ? [{d:'có ít nhất một đồng xu ra mặt sấp',f:s=>cnt(s,'S')>=1},{d:'hai đồng xu ra hai mặt giống nhau',f:s=>cnt(s,'S')===0||cnt(s,'S')===2},
         {d:'có đúng một đồng xu ra mặt ngửa',f:s=>cnt(s,'N')===1},{d:'cả hai đồng xu đều ra mặt sấp',f:s=>cnt(s,'S')===2},{d:'có ít nhất một đồng xu ra mặt ngửa',f:s=>cnt(s,'N')>=1}]
      : [{d:'có đúng hai đồng xu ra mặt sấp',f:s=>cnt(s,'S')===2},{d:'có ít nhất hai đồng xu ra mặt sấp',f:s=>cnt(s,'S')>=2},
         {d:'có đúng một đồng xu ra mặt ngửa',f:s=>cnt(s,'N')===1},{d:'cả ba đồng xu ra cùng một mặt',f:s=>cnt(s,'S')===0||cnt(s,'S')===3},
         {d:'có ít nhất một đồng xu ra mặt sấp',f:s=>cnt(s,'S')>=1}];
    const e=pick(E), fav=all.filter(e.f), k=fav.length;
    return QB({text:`Tung ${n===2?'hai':'ba'} đồng xu cân đối, đồng chất (phân biệt được) cùng một lúc. Kí hiệu S là mặt sấp, N là mặt ngửa. Tính xác suất để ${e.d}.`,
      tpl:`${PQ} [F]`,ans:[pr(k,tot)],hint:`Liệt kê đầy đủ các kết quả theo thứ tự các đồng xu (ví dụ SN khác NS), rồi chọn ra các kết quả thoả đề.`,
      sol:`Mỗi đồng xu có 2 mặt nên có ${tm(Array(n).fill('2').join(' \\cdot '))} = ${tb(tot)} kết quả có thể xảy ra: ${all.join(', ')}.<br>Kết quả thuận lợi: ${fav.join(', ')}, tức ${tb(k)} kết quả.<br>Vậy ${tm(`P = ${pf(k,tot)}`)}.`});
  }
  let digs,e,fav,all,k;
  for(let t=0;t<400;t++){
    const pool=[1,2,3,4,5,6,7,8,9]; digs=[]; while(digs.length<5){ const d=pick(pool); if(!digs.includes(d)) digs.push(d); } digs.sort((a,b)=>a-b);
    all=[]; for(const a of digs) for(const b of digs) if(a!==b) all.push(10*a+b);
    const T=pick([20,30,40,50,60,70]);
    const E=[{d:'số lập được là số chẵn',f:v=>v%2===0},{d:`số lập được lớn hơn ${T}`,f:v=>v>T},{d:'số lập được chia hết cho 3',f:v=>v%3===0}];
    if(digs.includes(5)) E.push({d:'số lập được chia hết cho 5',f:v=>v%5===0});
    e=pick(E); fav=all.filter(e.f); k=fav.length;
    if(k>=3&&k<=15) break;
  }
  return QB({text:`Từ năm chữ số ${digs.join(', ')}, lập ngẫu nhiên một số tự nhiên có hai chữ số khác nhau. Tính xác suất để ${e.d}.`,
    tpl:`${PQ} [F]`,ans:[pr(k,20)],hint:`Chữ số hàng chục có 5 cách chọn, chữ số hàng đơn vị có 4 cách chọn (khác hàng chục). Liệt kê các số thoả đề.`,
    sol:`Chữ số hàng chục có 5 cách chọn, hàng đơn vị có 4 cách (khác hàng chục) nên có ${tm('5 \\cdot 4')} = ${tb(20)} số, khả năng như nhau.<br>Các số thoả đề: ${fav.join(', ')}, tức ${tb(k)} số.<br>Vậy ${tm(`P = ${pf(k,20)}`)}.`});
};

/* Dạng 4. Thẻ đánh số từ 1 đến n */
const PRIMES = [2,3,5,7,11,13,17,19,23,29,31,37,41,43,47];
const gXs4 = lv => {
  if(lv===1){
    const n=R(20,40), a=pick([3,4,5,6,7]); const fav=[]; for(let v=a;v<=n;v+=a) fav.push(v); const k=fav.length;
    return QB({text:`Một hộp có ${n} tấm thẻ giống nhau, đánh số từ 1 đến ${n}. Rút ngẫu nhiên 1 thẻ. Tính xác suất để số ghi trên thẻ chia hết cho ${a}.`,
      tpl:`${PQ} [F]`,ans:[pr(k,n)],hint:`Liệt kê các số từ 1 đến ${n} chia hết cho ${a}: đó là các bội của ${a} không vượt quá ${n}.`,
      sol:`Có ${tb(n)} thẻ nên có ${n} kết quả có thể xảy ra, khả năng như nhau.<br>Các số chia hết cho ${a}: ${fav.join(', ')}, tức ${tb(k)} thẻ.<br>Vậy ${tm(`P = ${pf(k,n)}`)}.`});
  }
  if(lv===2){
    if(pick([0,1])===0){
      const n=pick([20,25,30]), fav=PRIMES.filter(p=>p<=n), k=fav.length;
      return QB({text:`Một hộp có ${n} tấm thẻ giống nhau, đánh số từ 1 đến ${n}. Rút ngẫu nhiên 1 thẻ. Tính xác suất để số ghi trên thẻ là số nguyên tố.`,
        tpl:`${PQ} [F]`,ans:[pr(k,n)],hint:`Số 1 không phải số nguyên tố. Liệt kê các số nguyên tố không vượt quá ${n}.`,
        sol:`Có ${tb(n)} kết quả có thể xảy ra.<br>Các số nguyên tố từ 1 đến ${n}: ${fav.join(', ')} (số 1 không phải số nguyên tố), tức ${tb(k)} thẻ.<br>Vậy ${tm(`P = ${pf(k,n)}`)}.`});
    }
    const n=R(30,50), fav=[]; for(let v=1;v*v<=n;v++) fav.push(v*v); const k=fav.length;
    return QB({text:`Một hộp có ${n} tấm thẻ giống nhau, đánh số từ 1 đến ${n}. Rút ngẫu nhiên 1 thẻ. Tính xác suất để số ghi trên thẻ là số chính phương.`,
      tpl:`${PQ} [F]`,ans:[pr(k,n)],hint:`Số chính phương là bình phương của một số nguyên; liệt kê các bình phương không vượt quá ${n}.`,
      sol:`Có ${tb(n)} kết quả có thể xảy ra.<br>Các số chính phương từ 1 đến ${n}: ${fav.join(', ')}, tức ${tb(k)} thẻ.<br>Vậy ${tm(`P = ${pf(k,n)}`)}.`});
  }
  const ab=pick([[2,3],[2,5],[3,4],[3,5],[2,7],[4,5]]), a=ab[0], b=ab[1], n=R(30,60);
  const na=Math.floor(n/a), nb=Math.floor(n/b), nab=Math.floor(n/(a*b)), k=na+nb-nab;
  return QB({text:`Một hộp có ${n} tấm thẻ giống nhau, đánh số từ 1 đến ${n}. Rút ngẫu nhiên 1 thẻ. Tính xác suất để số ghi trên thẻ chia hết cho ${a} <b>hoặc</b> chia hết cho ${b}.`,
    tpl:`${PQ} [F]`,ans:[pr(k,n)],hint:`Đếm số thẻ chia hết cho ${a}, số thẻ chia hết cho ${b}; số chia hết cho cả hai (bội của ${a*b}) bị đếm hai lần nên phải trừ đi một lần.`,
    sol:`Có ${tb(n)} kết quả có thể xảy ra.<br>Chia hết cho ${a}: ${tm(`\\left\\lfloor\\dfrac{${n}}{${a}}\\right\\rfloor = ${na}`)} thẻ. Chia hết cho ${b}: ${tm(`\\left\\lfloor\\dfrac{${n}}{${b}}\\right\\rfloor = ${nb}`)} thẻ.<br>`+
      `Chia hết cho cả ${a} và ${b} (tức chia hết cho ${a*b}): ${nab} thẻ, đã bị đếm hai lần.<br>Số kết quả thuận lợi: ${na} + ${nb} - ${nab} = ${tb(k)}.<br>Vậy ${tm(`P = ${pf(k,n)}`)}.`});
};

/* Dạng 5. Xác suất thực nghiệm; tìm số bi; thêm/bớt bi */
const gXs5 = lv => {
  if(lv===1){
    if(pick([0,1])===0){
      const n=pick([40,50,60,80,100]), k0=R(Math.round(n*0.2),Math.round(n*0.45)), ev=pick([0,1]);
      const sc=[{c:`Lan tung một đồng xu ${n} lần liên tiếp, thấy mặt sấp xuất hiện ${k0} lần`,e:'mặt ngửa xuất hiện'},{c:`Kiểm tra ngẫu nhiên ${n} sản phẩm của một nhà máy, có ${k0} sản phẩm bị lỗi`,e:'sản phẩm đạt chuẩn (không lỗi)'}][ev];
      const k=n-k0;
      return QB({text:`${sc.c}. Tính xác suất thực nghiệm của biến cố "${sc.e}".`,tpl:`${PQ} [F]`,ans:[pr(k,n)],hint:`Xác suất thực nghiệm bằng số lần biến cố xảy ra chia cho tổng số lần thực hiện. Chú ý đề cho số lần của biến cố đối.`,
        sol:`Tổng số lần thực hiện: ${tb(n)}.<br>Số lần "${sc.e}": ${n} - ${k0} = ${tb(k)}.<br>Xác suất thực nghiệm: ${tm(`P = ${pf(k,n)}`)}.`});
    }
    const cs=[R(4,15),R(4,15),R(4,15),R(4,15)], N=cs[0]+cs[1]+cs[2]+cs[3], nm=['đỏ','xanh','vàng','trắng'], i=pick([0,1,2,3]), j=(i+pick([1,2,3]))%4, k=cs[i]+cs[j];
    return QB({text:`Một túi có bốn loại thẻ: đỏ, xanh, vàng, trắng. Bạn Nam rút ngẫu nhiên một thẻ, ghi màu rồi trả lại túi, làm như vậy nhiều lần. Kết quả: đỏ ${cs[0]} lần, xanh ${cs[1]} lần, vàng ${cs[2]} lần, trắng ${cs[3]} lần. Tính xác suất thực nghiệm của biến cố "rút được thẻ ${nm[i]} hoặc thẻ ${nm[j]}".`,
      tpl:`${PQ} [F]`,ans:[pr(k,N)],hint:`Cộng các tần số để biết tổng số lần rút; số lần thuận lợi là tổng tần số của hai màu được hỏi.`,
      sol:`Tổng số lần rút: ${cs.join(' + ')} = ${tb(N)}.<br>Số lần rút được thẻ ${nm[i]} hoặc ${nm[j]}: ${cs[i]} + ${cs[j]} = ${tb(k)}.<br>Xác suất thực nghiệm: ${tm(`P = ${pf(k,N)}`)}.`});
  }
  if(lv===2){
    const b=R(3,9), x=R(2,9), n=x+b, g=gcd(x,n);
    return QB({text:`Một hộp chứa ${tm('x')} viên bi đỏ và ${b} viên bi xanh, cùng kích thước. Lấy ngẫu nhiên 1 viên bi, xác suất lấy được bi đỏ là ${tm(tfrac(x,n))}. Tìm ${tm('x')}.`,
      tpl:`${tm('x =')} [_]`,ans:[x],hint:`Viết xác suất lấy bi đỏ theo ${tm('x')} (tổng số bi là ${tm('x + '+b)}), cho bằng xác suất đề cho rồi giải phương trình (nhân chéo).`,
      sol:`Tổng số bi: ${tm('x + '+b)}. Xác suất lấy bi đỏ: ${tm(`\\dfrac{x}{x + ${b}}`)}.<br>Theo đề: ${tm(`\\dfrac{x}{x + ${b}} = ${tf(x/g,n/g)}`)}. Nhân chéo: ${tm(`${n/g}x = ${x/g}(x + ${b})`)}, suy ra ${tm(`${n/g - x/g}x = ${x/g*b}`)}.<br>Vậy ${tb('x = '+x)} (kiểm tra: ${tm(`\\dfrac{${x}}{${n}} = ${tf(x/g,n/g)}`)} ✓).`});
  }
  // lv3: thêm bi đỏ hoặc bớt bi xanh để đạt xác suất cho trước
  if(pick([0,1])===0){
    let r,x,t,n,p,q; do{ r=R(2,6); x=R(4,9); t=R(1,6); n=r+x; const g=gcd(r+t,n+t); p=(r+t)/g; q=(n+t)/g; }while(q-p<1||q>16||(r+t)/(n+t)>=1);
    return QB({text:`Một hộp chứa ${r} viên bi đỏ và ${x} viên bi xanh, cùng kích thước. Cần bỏ thêm vào hộp bao nhiêu viên bi đỏ (cùng loại) để xác suất lấy ngẫu nhiên được viên bi đỏ bằng ${tm(tf(p,q))}?`,
      tpl:`Số viên bi đỏ cần thêm: [_]`,ans:[t],hint:`Gọi ${tm('t')} là số bi đỏ thêm vào: số bi đỏ là ${tm('r + t')} và tổng số bi cũng tăng thêm ${tm('t')}. Lập phương trình xác suất bằng ${tm(tf(p,q))} rồi nhân chéo.`,
      sol:`Gọi ${tm('t')} là số bi đỏ thêm vào. Khi đó có ${tm(`${r} + t`)} bi đỏ trong tổng ${tm(`${n} + t`)} bi.<br>Theo đề: ${tm(`\\dfrac{${r} + t}{${n} + t} = ${tf(p,q)}`)}. Nhân chéo: ${tm(`${q}(${r} + t) = ${p}(${n} + t)`)}, tức ${tm(`${q*r} + ${q}t = ${p*n} + ${p}t`)}.<br>`+
        `Suy ra ${tm(`${q - p}t = ${p*n - q*r}`)}, vậy ${tb('t = '+t)} viên (kiểm tra: ${tm(`\\dfrac{${r + t}}{${n + t}} = ${tf(p,q)}`)} ✓).`});
  }
  let r,x,t,n,p,q; do{ r=R(2,6); x=R(5,10); t=R(1,x-2); n=r+x; const g=gcd(r,n-t); p=r/g; q=(n-t)/g; }while(q-p<1||q>16);
  return QB({text:`Một hộp chứa ${r} viên bi đỏ và ${x} viên bi xanh, cùng kích thước. Cần lấy ra khỏi hộp bao nhiêu viên bi xanh để xác suất lấy ngẫu nhiên được viên bi đỏ bằng ${tm(tf(p,q))}?`,
    tpl:`Số viên bi xanh cần lấy ra: [_]`,ans:[t],hint:`Gọi ${tm('t')} là số bi xanh lấy ra: số bi đỏ không đổi, tổng số bi giảm ${tm('t')}. Lập phương trình xác suất bằng ${tm(tf(p,q))}.`,
    sol:`Gọi ${tm('t')} là số bi xanh lấy ra. Khi đó còn ${r} bi đỏ trong tổng ${tm(`${n} - t`)} bi.<br>Theo đề: ${tm(`\\dfrac{${r}}{${n} - t} = ${tf(p,q)}`)}. Nhân chéo: ${tm(`${q}\\cdot ${r} = ${p}(${n} - t)`)}.<br>`+
      `Suy ra ${tm(`${n} - t = ${q*r/p}`)}, vậy ${tb('t = '+t)} viên (kiểm tra: ${tm(`\\dfrac{${r}}{${n - t}} = ${tf(p,q)}`)} ✓).`});
};

lesson(6,'on-thi-xac-suat','Đại số 3. Xác suất của biến cố trong một số mô hình xác suất đơn giản','Ôn tuyển sinh: xác suất cổ điển với hộp bi, xúc xắc, đồng xu, thẻ đánh số; biến cố đối; xác suất thực nghiệm; tìm số phần tử khi biết xác suất.',[gXs1,gXs2,gXs3,gXs4,gXs5], {intro:[
  {t:`Phép thử, không gian mẫu, biến cố`, b:`<ul><li><b>Phép thử</b>: hành động có nhiều kết quả, chưa biết trước (tung xúc xắc, rút thẻ, lấy bi…).</li><li><b>Không gian mẫu</b>: tập mọi kết quả có thể xảy ra; gọi ${tm('n')} là số phần tử.</li><li><b>Biến cố</b> ${tm('A')}: tập các kết quả <b>thuận lợi</b> cho ${tm('A')}; gọi ${tm('k')} là số phần tử.</li></ul>`, warn:`Chỉ dùng công thức cổ điển khi các kết quả có <b>khả năng xảy ra như nhau</b> (đồng xu, xúc xắc cân đối, đồng chất; các bi, thẻ cùng kích thước…). Đề thi thường nêu rõ điều này.`},
  {t:`Công thức xác suất`, b:`<ul><li>${tm('P(A) = \\dfrac{k}{n}')} với ${tm('0 \\le P(A) \\le 1')}.</li><li>Biến cố đối ${tm('\\overline{A}')}: ${tm('P(\\overline{A}) = 1 - P(A)')}.</li><li>Hai biến cố không có kết quả chung: ${tm('P(A \\text{ hoặc } B) = P(A) + P(B)')}. Nếu có kết quả chung, số kết quả thuận lợi là ${tm('k_A + k_B - k_{A\\text{ và }B}')}.</li></ul>`, warn:`Đáp số viết dưới dạng <b>phân số rút gọn</b> (hoặc số thập phân đúng). Xác suất không bao giờ lớn hơn 1: nếu ra ${tm('\\gt 1')} là đã đếm sai.`, ex:`Gặp "<b>ít nhất</b>", "<b>không phải</b>", "<b>có</b>…" thì tính biến cố đối rồi lấy ${tm('1 - P(\\overline{A})')} (hoặc số kết quả ${tm('n - k_{\\text{đối}}')}): nhanh và ít sót.`},
  {t:`Cách đếm kết quả`, b:`<ul><li>1 xúc xắc: 6 kết quả. 2 xúc xắc phân biệt: ${tm('6 \\cdot 6 = 36')}. 2 đồng xu: 4; 3 đồng xu: 8.</li><li>Quy tắc nhân: làm hai việc nối tiếp, việc 1 có ${tm('p')} cách, việc 2 có ${tm('q')} cách thì có ${tm('p \\cdot q')} cách. Số có hai chữ số khác nhau từ 5 chữ số cho trước: ${tm('5 \\cdot 4 = 20')}.</li><li>Lấy 2 vật cùng lúc (không kể thứ tự): ${tm('\\dfrac{n(n-1)}{2}')} cặp.</li></ul>`, warn:`Hai xúc xắc (hay hai đồng xu) phân biệt thì cặp ${tm('(1;\\,2)')} và ${tm('(2;\\,1)')} là <b>hai</b> kết quả khác nhau. Lấy cùng lúc thì không kể thứ tự.`, ex:`Liệt kê có hệ thống (theo thứ tự tăng dần, hoặc lập bảng ${tm('6 \\times 6')}) rồi đếm; đếm xong hãy đếm lại bằng cách khác (đối, quy tắc nhân) để kiểm tra.`},
  {t:`Xác suất thực nghiệm và bài toán tìm số`, b:`<ul><li>Xác suất thực nghiệm của ${tm('A')} = ${tm('\\dfrac{\\text{số lần } A \\text{ xảy ra}}{\\text{tổng số lần thực hiện}}')}.</li><li>Biết xác suất, tìm số phần tử: gọi ẩn, viết xác suất theo ẩn, cho bằng giá trị đề, <b>nhân chéo</b> và giải.</li><li>Thêm hoặc bớt phần tử: nhớ cả <b>tổng số</b> cũng thay đổi.</li></ul>`, warn:`Khi thêm ${tm('t')} bi đỏ, tử số tăng ${tm('t')} <b>và</b> mẫu số cũng tăng ${tm('t')} (không chỉ tăng tử số). Khi bớt bi xanh thì chỉ mẫu số giảm.`, ex:`Sau khi tìm được số cần tìm, hãy thay ngược vào để tính lại xác suất — 10 giây kiểm tra giúp tránh mất điểm.`}
]});
}


/* =====================================================================
   ÔN THI VÀO 10 – Đại số 4. Bài toán thực tế về đại số – hình học
   Dạng 1 chu vi, diện tích, lát gạch, chi phí · Dạng 2 hình tròn thực tế (π ≈ 3,14)
   Dạng 3 hình quạt, quạt vành khuyên thực tế · Dạng 4 hình ghép, phần tô, viên phân
   Dạng 5 lập phương trình từ hình học (chu vi – diện tích, lối đi)
   ===================================================================== */
{
const P14 = tm('\\pi \\approx 3{,}14');
const dec = x => String(Math.round(x*1000)/1000).replace('.', ',');
const p14 = x => Math.round(x*314)/100;
const svgTxt = (x,y,s,fs=17) => `<text class="sv-txt" x="${x}" y="${y}" font-size="${fs}" text-anchor="middle">${s}</text>`;
const rectFig = (la,lb) => `<svg viewBox="0 0 320 190" role="img" aria-label="Hình chữ nhật"><rect class="sv-ink" stroke-width="3" x="50" y="35" width="220" height="110" style="fill:var(--primary-soft)"/>${svgTxt(160,170,la)}${svgTxt(24,95,lb)}</svg>`;
const trapFig = (B,b,h) => `<svg viewBox="0 0 320 190" role="img" aria-label="Hình thang"><polygon class="sv-ink" stroke-width="3" points="30,150 290,150 230,40 90,40" style="fill:var(--primary-soft)"/><line class="sv-ink" stroke-width="2" stroke-dasharray="6 4" x1="230" y1="40" x2="230" y2="150"/>${svgTxt(160,175,B)}${svgTxt(160,28,b)}${svgTxt(262,100,h)}</svg>`;
const secAt = (r,a) => [r*Math.cos(a*Math.PI/180), r*Math.sin(a*Math.PI/180)];

/* Dạng 1. Chu vi, diện tích, lát gạch, chi phí */
const gTt1 = lv => {
  if(lv===1){
    const c = pick([50,50,20]), a = c===50 ? R(4,12) : R(3,6), b = c===50 ? R(3,10) : R(3,5);
    const one = (c/100)*(c/100), n = Math.round(a*b/one);
    return QB({text:`Nền một căn phòng hình chữ nhật dài ${a} m, rộng ${b} m được lát kín bằng gạch hình vuông cạnh ${c} cm (không tính hao hụt). Hỏi cần bao nhiêu viên gạch?`,
      tpl:`Số viên gạch: [_]`, ans:[n], fig:rectFig(`${a} m`,`${b} m`),
      hint:`Tính diện tích nền (m²) và diện tích một viên gạch (đổi cm sang m), rồi chia diện tích nền cho diện tích một viên.`,
      sol:`Diện tích nền: ${tm(`${a}\\cdot ${b} = ${a*b}`)} m².<br>Cạnh viên gạch ${c} cm ${tm(`= ${dec(c/100)}`)} m nên diện tích một viên: ${tm(`${dec(c/100)}^2 = ${dec(one)}`)} m².<br>Số viên gạch: ${tm(`${a*b} : ${dec(one)} =`)} ${tb(n)} viên.`});
  }
  if(lv===2){
    let B,b,h; do{ B=R(10,24); b=R(4,B-3); h=R(4,12); }while(((B+b)*h)%2!==0);
    const g = pick([20,25,30,40,50]), S = (B+b)*h/2;
    return QB({text:`Một mảnh vườn hình thang có hai đáy dài ${B} m và ${b} m, chiều cao ${h} m. Người ta trồng rau trên toàn bộ mảnh vườn, chi phí ${g} nghìn đồng cho mỗi mét vuông. Tính tổng chi phí (đơn vị: nghìn đồng).`,
      tpl:`Chi phí: [_] nghìn đồng`, ans:[S*g], fig:trapFig(`${B} m`,`${b} m`,`${h} m`),
      hint:`Tính diện tích hình thang bằng nửa tổng hai đáy nhân chiều cao, rồi nhân với giá tiền mỗi mét vuông.`,
      sol:`Diện tích mảnh vườn: ${tm(`S = \\dfrac{(${B} + ${b})\\cdot ${h}}{2} = ${S}`)} m².<br>Chi phí: ${tm(`${S}\\cdot ${g} =`)} ${tb(S*g)} nghìn đồng.`});
  }
  const w = R(6,15), d = R(2,8), l = w + d, half = l + w, g = pick([20,30,50]), S = l*w;
  return QB({text:`Một khu đất hình chữ nhật có chu vi ${2*half} m, chiều dài hơn chiều rộng ${d} m. Người ta trồng cỏ kín khu đất, chi phí ${g} nghìn đồng cho mỗi mét vuông. Tính tổng chi phí (đơn vị: nghìn đồng).`,
    tpl:`Chi phí: [_] nghìn đồng`, ans:[S*g],
    hint:`Nửa chu vi bằng chiều dài cộng chiều rộng. Biết tổng và hiệu của dài và rộng thì tìm được từng cạnh, rồi tính diện tích.`,
    sol:`Nửa chu vi: ${tm(`${2*half} : 2 = ${half}`)} m, tức ${tm(`l + w = ${half}`)}; theo đề ${tm(`l - w = ${d}`)}.<br>Chiều dài: ${tm(`l = \\dfrac{${half} + ${d}}{2} = ${l}`)} m; chiều rộng: ${tm(`w = ${half} - ${l} = ${w}`)} m.<br>Diện tích: ${tm(`${l}\\cdot ${w} = ${S}`)} m².<br>Chi phí: ${tm(`${S}\\cdot ${g} =`)} ${tb(S*g)} nghìn đồng.`});
};

/* Dạng 2. Hình tròn thực tế (π ≈ 3,14) */
const RING_OK = []; for(const r of [10,15,20,25,30,40]) for(const w of [5,10,15,20]) if((w*(2*r+w))%50===0) RING_OK.push([r,w]);
const WHEEL_OK = []; for(const d of [40,50,60,70,80,90]) for(const N of [50,100,150,200,250,300,400,500]) if((314*d*N)%10000===0) WHEEL_OK.push([d,N]);
const gTt2 = lv => {
  if(lv===1){
    const d = pick([50,100,200]), k = R(2,6), C = p14(d), tot = C*k;
    return QB({text:`Một hồ nước hình tròn có đường kính ${d} m. Bạn Nam chạy bộ đúng ${k} vòng quanh bờ hồ. Lấy ${P14}, tính quãng đường Nam đã chạy.`,
      tpl:`Quãng đường: [_] m`, ans:[tot],
      hint:`Chu vi hình tròn bằng ${tm('\\pi')} nhân đường kính; chạy ${k} vòng thì nhân chu vi với ${k}.`,
      sol:`Chu vi bờ hồ: ${tm(`C = \\pi d \\approx 3{,}14\\cdot ${d} = ${dec(C)}`)} m.<br>Quãng đường ${k} vòng: ${tm(`${dec(C)}\\cdot ${k} =`)} ${tb(dec(tot))} m.`});
  }
  if(lv===2){
    const [r,w] = pick(RING_OK), Rr = r + w, S = p14(Rr*Rr - r*r);
    return QB({text:`Một hồ nước hình tròn bán kính ${r} m. Người ta làm một lối đi rộng ${w} m bao quanh hồ (ngoài hồ). Lấy ${P14}, tính diện tích lối đi.`,
      tpl:`Diện tích lối đi: [_] m²`, ans:[S],
      fig:circleSVG({C:[{x:0,y:0,r:4,lab:'O'},{x:0,y:0,r:4*r/Rr}], ring:{x:0,y:0,r1:4,r2:4*r/Rr}}),
      hint:`Lối đi là phần nằm giữa hai đường tròn đồng tâm. Tìm bán kính đường tròn ngoài rồi lấy diện tích hình tròn lớn trừ diện tích hình tròn nhỏ.`,
      sol:`Bán kính đường tròn ngoài (tính cả lối đi): ${tm(`${r} + ${w} = ${Rr}`)} m.<br>Diện tích lối đi: ${tm(`S = \\pi(${Rr}^2 - ${r}^2) \\approx 3{,}14\\cdot ${Rr*Rr - r*r}`)}.<br>Vậy ${tb(dec(S) + ' m²')}.`});
  }
  const [d,N] = pick(WHEEL_OK), D = 314*d*N/10000;
  return QB({text:`Một bánh xe lăn không trượt trên đường, quay đúng ${N} vòng thì xe đi được ${D} m. Lấy ${P14}, tính đường kính của bánh xe (đơn vị: cm).`,
    tpl:`Đường kính: [_] cm`, ans:[d],
    hint:`Mỗi vòng quay xe đi được đúng một chu vi bánh xe. Chia quãng đường cho số vòng rồi đổi sang cm, sau đó dùng ${tm('C = \\pi d')}.`,
    sol:`Chu vi bánh xe: ${tm(`C = ${D} : ${N} = ${dec(D/N)}`)} m ${tm(`= ${dec(D/N*100)}`)} cm.<br>Từ ${tm('C = \\pi d')} suy ra ${tm(`d = \\dfrac{C}{\\pi} \\approx \\dfrac{${dec(D/N*100)}}{3{,}14} =`)} ${tb(d)} cm.`});
};

/* Dạng 3. Hình quạt, quạt vành khuyên trong thực tế */
const SEC_TT = [[30,120],[40,45],[60,60],[24,150],[36,50],[20,90],[50,72]];
const FAN_OK = []; for(const Rr of [20,24,30,36,40]) for(const r of [5,6,10,12,15]) if(r<Rr) for(const n of [60,90,120,150,180]) if(((Rr*Rr-r*r)*n)%360===0) FAN_OK.push([Rr,r,n]);
const GARD_OK = [[30,120],[36,50],[60,60],[24,150],[40,45],[20,90],[50,72],[30,60]].filter(([Rr,n]) => (Rr*Rr*n)%360===0 && (Rr*n)%180===0);
const sectorFig = n => circleSVG({C:[{x:0,y:0,r:3,lab:'O'}], sector:{x:0,y:0,r:3,a1:20,a2:20+n}, S:[[0,0,...secAt(3,20),false,'R'],[0,0,...secAt(3,20+n)]], ang:[[0,0,20,20+n,tm(`${n}^\\circ`)]]});
const gTt3 = lv => {
  if(lv===1){
    const [Rr,n] = pick(SEC_TT), k = Rr*Rr*n/360;
    return QB({text:`Một vòi tưới cây tự động quay trong góc ${tm(`${n}^\\circ`)} và phun nước xa nhất ${Rr} m (vùng được tưới là một hình quạt tròn). Tính diện tích vùng được tưới. Điền hệ số của ${tm('\\pi')}.`,
      tpl:`${tm('S =')} [_]${tm('\\pi')} m²`, ans:[k], fig:sectorFig(n),
      hint:`Vùng được tưới là hình quạt tâm là vòi, bán kính là tầm phun xa nhất. Dùng ${tm('S = \\dfrac{\\pi R^2 n}{360}')}.`,
      sol:`Thay ${tm(`R = ${Rr}`)}, ${tm(`n = ${n}`)} vào công thức: ${tm(`S = \\dfrac{\\pi\\cdot ${Rr}^2\\cdot ${n}}{360}`)}.<br>Vậy ${tb(`S = ${k}\\pi`)} (m²).`});
  }
  if(lv===2){
    const [Rr,r,n] = pick(FAN_OK), k = (Rr*Rr - r*r)*n/360;
    return QB({text:`Một chiếc quạt giấy khi xòe ra có dạng hình quạt vành khuyên: phần giấy nằm giữa hai đường tròn đồng tâm bán kính ${Rr} cm và ${r} cm, góc mở ${tm(`${n}^\\circ`)}. Tính diện tích phần giấy. Điền hệ số của ${tm('\\pi')}.`,
      tpl:`${tm('S =')} [_]${tm('\\pi')} cm²`, ans:[k],
      hint:`Lấy diện tích hình quạt lớn trừ diện tích hình quạt nhỏ (cùng góc ở tâm), hoặc dùng ${tm('S = \\dfrac{\\pi(R^2 - r^2)n}{360}')}.`,
      sol:`Quạt lớn: ${tm(`\\dfrac{\\pi\\cdot ${Rr}^2\\cdot ${n}}{360} = ${Rr*Rr*n/360}\\pi`)}; quạt nhỏ: ${tm(`\\dfrac{\\pi\\cdot ${r}^2\\cdot ${n}}{360} = ${r*r*n/360}\\pi`)}.<br>Phần giấy: ${tm(`${Rr*Rr*n/360}\\pi - ${r*r*n/360}\\pi =`)} ${tb(k + '\\pi')} cm².`});
  }
  const [Rr,n] = pick(GARD_OK), k = Rr*Rr*n/360, l = Rr*n/180;
  return QB({text:`Một mảnh vườn có dạng hình quạt tròn với góc ở tâm ${tm(`${n}^\\circ`)} và diện tích ${tm(`${k}\\pi`)} m². Người ta rào quanh toàn bộ chu vi mảnh vườn (cung và hai bán kính). Tính độ dài hàng rào, điền dạng ${tm('a\\pi + b')}.`,
    tpl:`${tm('P =')} [_]${tm('\\pi +')} [_] m`, ans:[l, 2*Rr], fig:sectorFig(n),
    hint:`Từ diện tích tìm bán kính ${tm('R')} (giải ${tm('R^2')} rồi lấy căn). Chu vi quạt bằng độ dài cung ${tm('l = \\dfrac{\\pi R n}{180}')} cộng hai bán kính.`,
    sol:`Từ ${tm(`\\dfrac{\\pi R^2\\cdot ${n}}{360} = ${k}\\pi`)} suy ra ${tm(`R^2 = ${Rr*Rr}`)}, nên ${tm(`R = ${Rr}`)} m.<br>Độ dài cung: ${tm(`l = \\dfrac{\\pi\\cdot ${Rr}\\cdot ${n}}{180} = ${l}\\pi`)} m. Hai bán kính dài ${tm(`2\\cdot ${Rr} = ${2*Rr}`)} m.<br>Chu vi: ${tb(`P = ${l}\\pi + ${2*Rr}`)} (m).`});
};

/* Dạng 4. Hình ghép, phần tô, viên phân */
const doorFig = (R2,h) => `<svg viewBox="0 0 320 210" role="img" aria-label="Tấm kính hình chữ nhật ghép nửa hình tròn"><path class="sv-ink" stroke-width="3" d="M80 190 V100 A80 80 0 0 1 240 100 V190 Z" style="fill:var(--primary-soft)"/><line class="sv-ink" stroke-width="2" stroke-dasharray="6 4" x1="80" y1="100" x2="240" y2="100"/>${svgTxt(160,206,`${2*R2} cm`)}${svgTxt(290,150,`${h} cm`)}</svg>`;
const sqCircFig = a => `<svg viewBox="0 0 320 210" role="img" aria-label="Hình vuông có hình tròn nội tiếp"><rect class="sv-ink" stroke-width="3" x="70" y="15" width="180" height="180" style="fill:var(--primary-soft)"/><circle cx="160" cy="105" r="90" style="fill:var(--bg,#fff)" class="sv-ink" stroke-width="2.5"/>${svgTxt(160,208,`${a} cm`,15)}</svg>`;
const gTt4 = lv => {
  if(lv===1){
    const R2 = pick([10,20,30,40,50]), h = R(30,80), rect = 2*R2*h, half = p14(R2*R2/2), S = rect + half;
    return QB({text:`Một tấm kính có dạng hình chữ nhật chiều rộng ${2*R2} cm, chiều cao ${h} cm, ghép phía trên với một nửa hình tròn đường kính bằng chiều rộng (hình bên). Lấy ${P14}, tính diện tích tấm kính.`,
      tpl:`Diện tích: [_] cm²`, ans:[S], fig:doorFig(R2,h),
      hint:`Chia hình thành hình chữ nhật và nửa hình tròn. Bán kính nửa hình tròn bằng một nửa chiều rộng hình chữ nhật.`,
      sol:`Hình chữ nhật: ${tm(`${2*R2}\\cdot ${h} = ${rect}`)} cm².<br>Nửa hình tròn bán kính ${R2} cm: ${tm(`\\dfrac{\\pi\\cdot ${R2}^2}{2} \\approx \\dfrac{3{,}14\\cdot ${R2*R2}}{2} = ${dec(half)}`)} cm².<br>Diện tích tấm kính: ${tm(`${rect} + ${dec(half)} =`)} ${tb(dec(S))} cm².`});
  }
  if(lv===2){
    const a = pick([20,40,60,80,100]), circ = p14(a*a/4), S = a*a - circ;
    return QB({text:`Một viên gạch men hình vuông cạnh ${a} cm có hoa văn là hình tròn nội tiếp hình vuông (hình bên); phần còn lại được tráng men trắng. Lấy ${P14}, tính diện tích phần men trắng.`,
      tpl:`Diện tích: [_] cm²`, ans:[S], fig:sqCircFig(a),
      hint:`Hình tròn nội tiếp hình vuông có đường kính bằng cạnh hình vuông. Diện tích phần trắng bằng diện tích hình vuông trừ diện tích hình tròn.`,
      sol:`Diện tích hình vuông: ${tm(`${a}^2 = ${a*a}`)} cm².<br>Bán kính hình tròn: ${tm(`${a} : 2 = ${a/2}`)} cm; diện tích: ${tm(`\\pi\\cdot ${a/2}^2 \\approx 3{,}14\\cdot ${a*a/4} = ${dec(circ)}`)} cm².<br>Phần men trắng: ${tm(`${a*a} - ${dec(circ)} =`)} ${tb(dec(S))} cm².`});
  }
  const Rr = pick([20,40,60,80,100]), q = p14(Rr*Rr/4), tri = Rr*Rr/2, S = q - tri, [ax,ay] = secAt(3,45), [bx,by] = secAt(3,135);
  return QB({text:`Một mảnh đất có dạng hình viên phân: phần hình tròn giới hạn bởi dây ${tm('AB')} và cung nhỏ ${tm('AB')} của đường tròn tâm ${tm('O')}, bán kính ${Rr} m, biết ${tm('\\widehat{AOB} = 90^\\circ')}. Lấy ${P14}, tính diện tích mảnh đất.`,
    tpl:`Diện tích: [_] m²`, ans:[S],
    fig:circleSVG({C:[{x:0,y:0,r:3,lab:'O'}], sector:{x:0,y:0,r:3,a1:45,a2:135}, P:[[ax,ay,'B',45],[bx,by,'A',135]], S:[[0,0,ax,ay],[0,0,bx,by],[ax,ay,bx,by]], right:[[0,0,45]]}),
    hint:`Diện tích viên phân bằng diện tích hình quạt ${tm('OAB')} trừ diện tích tam giác ${tm('OAB')} (tam giác vuông cân tại ${tm('O')}).`,
    sol:`Hình quạt ${tm('OAB')}: ${tm(`\\dfrac{\\pi\\cdot ${Rr}^2\\cdot 90}{360} = \\dfrac{\\pi\\cdot ${Rr*Rr}}{4} \\approx ${dec(q)}`)} m².<br>Tam giác vuông ${tm('OAB')}: ${tm(`\\dfrac{1}{2}\\cdot ${Rr}\\cdot ${Rr} = ${tri}`)} m².<br>Diện tích mảnh đất: ${tm(`${dec(q)} - ${tri} =`)} ${tb(dec(S))} m².`});
};

/* Dạng 5. Lập phương trình từ hình học */
const gTt5 = lv => {
  if(lv===1){
    let w,l; do{ w=R(5,16); l=R(w+2,w+10); }while(l===w);
    const s = l + w, S = l*w, Dl = (l-w)*(l-w);
    return QB({text:`Một mảnh vườn hình chữ nhật có nửa chu vi ${s} m và diện tích ${S} m². Tính chiều dài của mảnh vườn.`,
      tpl:`Chiều dài: [_] m`, ans:[l],
      hint:`Gọi ${tm('x')} là độ dài một cạnh thì cạnh kia là nửa chu vi trừ ${tm('x')}. Lập phương trình từ diện tích, giải được hai nghiệm; chiều dài là nghiệm lớn hơn.`,
      sol:`Gọi ${tm('x')} (m) là độ dài một cạnh, cạnh kia là ${tm(`${s} - x`)}. Diện tích: ${tm(`x(${s} - x) = ${S}`)}, tức ${tm(`x^2 - ${s}x + ${S} = 0`)}.<br>${tm(`\\Delta = ${s}^2 - 4\\cdot ${S} = ${Dl}`)}, ${tm(`\\sqrt{\\Delta} = ${l-w}`)}.<br>${tm(`x_1 = \\dfrac{${s} + ${l-w}}{2} = ${l}`)}, ${tm(`x_2 = \\dfrac{${s} - ${l-w}}{2} = ${w}`)}.<br>Hai cạnh là ${w} m và ${l} m; chiều dài là cạnh lớn hơn: ${tb(l + ' m')}.`});
  }
  if(lv===2){
    const w = R(4,14), d = R(2,9), S = w*(w+d), Dl = d*d + 4*S, sq = 2*w + d;
    return QB({text:`Một khu đất hình chữ nhật có chiều dài hơn chiều rộng ${d} m và diện tích ${S} m². Tính chiều rộng của khu đất.`,
      tpl:`Chiều rộng: [_] m`, ans:[w],
      hint:`Gọi chiều rộng là ${tm('x')} (m), điều kiện ${tm('x \\gt 0')}; chiều dài là ${tm('x + '+d)}. Lập phương trình từ diện tích, giải rồi loại nghiệm không phù hợp.`,
      sol:`Gọi ${tm('x')} (m, ${tm('x \\gt 0')}) là chiều rộng, chiều dài là ${tm(`x + ${d}`)}. Diện tích: ${tm(`x(x + ${d}) = ${S}`)}, tức ${tm(`x^2 + ${d}x - ${S} = 0`)}.<br>${tm(`\\Delta = ${d}^2 + 4\\cdot ${S} = ${Dl}`)}, ${tm(`\\sqrt{\\Delta} = ${sq}`)}.<br>${tm(`x_1 = \\dfrac{-${d} + ${sq}}{2} = ${w}`)} (nhận); ${tm(`x_2 = \\dfrac{-${d} - ${sq}}{2} = ${-(d+sq)/2}`)} (loại vì ${tm('x \\gt 0')}).<br>Chiều rộng: ${tb(w + ' m')}.`});
  }
  const a = R(8,20), b = R(5,14), x = R(1,4), T = 4*x*x + 2*(a+b)*x, sq = 4*x + a + b, ab = a + b;
  return QB({text:`Một mảnh vườn hình chữ nhật có chiều dài ${a} m, chiều rộng ${b} m. Người ta làm một lối đi có chiều rộng bằng nhau bao quanh mảnh vườn (nằm ngoài mảnh vườn). Biết diện tích lối đi là ${T} m². Tính chiều rộng lối đi.`,
    tpl:`Chiều rộng lối đi: [_] m`, ans:[x],
    hint:`Gọi chiều rộng lối đi là ${tm('x')} (m). Hình chữ nhật lớn (cả vườn và lối đi) có hai kích thước tăng thêm ${tm('2x')}. Diện tích lối đi bằng diện tích hình lớn trừ diện tích mảnh vườn.`,
    sol:`Gọi ${tm('x')} (m, ${tm('x \\gt 0')}) là chiều rộng lối đi. Hình lớn có kích thước ${tm(`${a} + 2x`)} và ${tm(`${b} + 2x`)}.<br>Diện tích lối đi: ${tm(`(${a} + 2x)(${b} + 2x) - ${a}\\cdot ${b} = ${T}`)}, khai triển: ${tm(`4x^2 + ${2*ab}x = ${T}`)}, chia hai vế cho 2: ${tm(`2x^2 + ${ab}x - ${T/2} = 0`)}.<br>${tm(`\\Delta = ${ab}^2 + 8\\cdot ${T/2} = ${ab*ab + 4*T}`)}, ${tm(`\\sqrt{\\Delta} = ${sq}`)}.<br>${tm(`x_1 = \\dfrac{-${ab} + ${sq}}{4} = ${x}`)} (nhận); ${tm(`x_2 = \\dfrac{-${ab} - ${sq}}{4} = ${-(ab+sq)/4}`)} (loại).<br>Chiều rộng lối đi: ${tb(x + ' m')}.`});
};

lesson(6,'on-thi-thuc-te-dai-so-hinh-hoc','Đại số 4. Bài toán thực tế về đại số – hình học','Ôn tuyển sinh: chu vi, diện tích, chi phí lát gạch – trồng cỏ; hình tròn thực tế (π ≈ 3,14); hình quạt, quạt vành khuyên; hình ghép, phần tô, viên phân; lập phương trình từ chu vi – diện tích – lối đi.',[gTt1,gTt2,gTt3,gTt4,gTt5], {intro:[
  {t:`Công thức diện tích – chu vi cần thuộc`, b:`<ul><li>Hình chữ nhật: ${tm('P = 2(a + b)')}, ${tm('S = ab')}. Hình thang: ${tm('S = \\dfrac{(B + b)h}{2}')}. Tam giác: ${tm('S = \\dfrac{ah}{2}')}.</li><li>Hình tròn: ${tm('C = 2\\pi R')}, ${tm('S = \\pi R^2')}. Hình vành khuyên: ${tm('S = \\pi(R^2 - r^2)')}.</li><li>Hình quạt ${tm('n^\\circ')}: ${tm('l = \\dfrac{\\pi R n}{180}')}, ${tm('S = \\dfrac{\\pi R^2 n}{360}')}. Chu vi quạt ${tm('= l + 2R')}.</li><li>Viên phân = quạt trừ tam giác (hoặc quạt cộng tam giác nếu góc lớn hơn ${tm('180^\\circ')}).</li></ul>`, ex:`Phần tô, phần còn lại, lối đi, viên phân: hầu hết đều là <b>“hình lớn trừ hình nhỏ”</b> hoặc <b>“ghép các hình quen thuộc”</b>. Vẽ phác hình và chia hình trước khi tính.`},
  {t:`Đọc đề thực tế: đơn vị và số π`, b:`<ul><li>Đổi mọi độ dài về <b>cùng đơn vị</b> trước khi tính; diện tích có đơn vị bình phương (1 m² = 10 000 cm²).</li><li>Đề cho “lấy ${tm('\\pi \\approx 3{,}14')}” thì dùng đúng giá trị đó; không dặn thì giữ ${tm('\\pi')} trong kết quả (nếu đề cho điền hệ số của ${tm('\\pi')} thì viết đúng dạng ${tm('k\\pi')}).</li><li>Tiền = số lượng × đơn giá: nhớ đơn vị của đơn giá (nghìn đồng/m²).</li></ul>`, warn:`Hay mất điểm: nhầm đường kính với bán kính; quên cộng hai bán kính khi tính chu vi hình quạt; lối đi bao quanh làm kích thước tăng thêm ${tm('2x')} (không phải ${tm('x')}); đổi cm sang m sai.`},
  {t:`Lập phương trình từ hình học`, b:`Gọi ẩn là một độ dài (kèm đơn vị và điều kiện ${tm('x \\gt 0')}), biểu diễn các kích thước còn lại theo ${tm('x')}, viết phương trình theo <b>diện tích</b> hoặc <b>chu vi</b>, rồi giải. Phương trình bậc hai: tính ${tm('\\Delta')}, tìm hai nghiệm, <b>đối chiếu điều kiện</b> rồi kết luận.`, warn:`Giải xong phải loại nghiệm âm hoặc nghiệm không hợp đề (chiều dài phải lớn hơn chiều rộng, lối đi không rộng hơn mảnh vườn...). Ghi rõ đáp số kèm đơn vị.`, ex:`Thử lại đáp số vào đề (tính lại chu vi hoặc diện tích) trong 10 giây: nếu không khớp là sai ở đâu đó. Cho nửa chu vi ${tm('s')} và diện tích ${tm('S')}, hai cạnh là nghiệm của ${tm('x^2 - sx + S = 0')}.`}
]});
}


/* =====================================================================
   ÔN THI VÀO 10 – Đại số 5. Giải bài toán bằng cách lập biểu thức, phương trình, phương trình bậc hai
   Dạng 1 lập biểu thức (cước, giảm giá) · Dạng 2 lập PT bậc nhất (tuổi, mua hàng, phần trăm)
   Dạng 3 chuyển động · Dạng 4 công việc – năng suất · Dạng 5 tích hai số, lãi kép, chia hàng ghế
   ===================================================================== */
{
const BT_WORK = []; for(let a=3;a<=40;a++) for(let b=a+1;b<=60;b++) if((a*b)%(a+b)===0){ const T=a*b/(a+b); if(T>=2 && T<=30) BT_WORK.push([a,b,T]); }
const BT_PLAN = []; for(const a of [2,3,4,5,6,8,10]) for(let x=8;x<=60;x++) for(const d of [1,2,3]){ const N=d*x*(x+a)/a; if(Number.isInteger(N) && N>=120 && N<=900) BT_PLAN.push([x,a,d,N]); }
const BT_MOVE = []; for(const a of [4,5,6,8,10,12,15]) for(let x=20;x<=60;x++) for(const h of [1,2]){ const s=h*x*(x+a)/a; if(Number.isInteger(s) && s>=60 && s<=500) BT_MOVE.push([x,a,h,s]); }
const BT_STREAM = []; for(let v=12;v<=40;v++) for(let u=2;u<=8;u++) if(v>u+3) for(let s=20;s<=200;s++){ const num=2*s*v, den=v*v-u*u; if(num%den===0){ const T=num/den; if(T>=2 && T<=8) BT_STREAM.push([v,u,s,T]); } }
const BT_TWO = []; for(let x=3;x<=40;x++) for(let d=1;d<=15;d++) if((x*(x+d))%(2*x+d)===0){ const T=x*(x+d)/(2*x+d); if(T>=2 && T<=24) BT_TWO.push([x,d,T]); }
const BT_ROWS = []; for(const p of [2,3,4,5]) for(const q of [1,2,3]) for(let x=6;x<=30;x++){ if((q*(x+p))%p===0){ const s=q*(x+p)/p, N=x*s; if(s>q+1 && N>=60 && N<=500) BT_ROWS.push([p,q,x,s,N]); } }
const BT_SAVE = []; for(const x of [5,10,15,20,25]){ const sq=(100+x)*(100+x), g=gcd(sq,10000), step=10000/g; for(let P=step;P<=600;P+=step) if(P>=40) BT_SAVE.push([x,P,P*sq/10000]); }

/* Dạng 1. Lập biểu thức từ tình huống thực tế */
const gBt1 = lv => {
  if(lv===1){
    const A = pick([12,14,15,16]), B = pick([10,11,12,13]), k = R(6,20), cost = A + B*(k-1);
    return QB({text:`Một hãng taxi tính cước như sau: 1 km đầu tiên giá ${A} nghìn đồng, từ km thứ hai trở đi mỗi km giá ${B} nghìn đồng. Với quãng đường ${tm('x')} km (${tm('x \\ge 1')}), số tiền phải trả là ${tm(`T = ${A} + ${B}(x - 1)`)} (nghìn đồng). Tính số tiền phải trả khi đi ${k} km.`,
      tpl:`Số tiền: [_] nghìn đồng`, ans:[cost],
      hint:`Thay ${tm('x')} bằng số km đã đi vào biểu thức ${tm('T')}, tính phần trong ngoặc trước.`,
      sol:`Thay ${tm(`x = ${k}`)} vào biểu thức: ${tm(`T = ${A} + ${B}(${k} - 1)`)}.<br>Tính trong ngoặc: ${tm(`${k} - 1 = ${k-1}`)}, nên ${tm(`T = ${A} + ${B}\\cdot ${k-1} = ${A} + ${B*(k-1)}`)}.<br>Số tiền phải trả: ${tb(cost)} nghìn đồng.`});
  }
  if(lv===2){
    const A = pick([12,14,15,16]), B = pick([10,11,12,13]), k = R(8,25), cost = A + B*(k-1);
    return QB({text:`Một hãng taxi tính cước như sau: 1 km đầu tiên giá ${A} nghìn đồng, từ km thứ hai trở đi mỗi km giá ${B} nghìn đồng. Một hành khách đã trả ${cost} nghìn đồng. Hỏi hành khách đã đi bao nhiêu km?`,
      tpl:`Quãng đường: [_] km`, ans:[k],
      hint:`Gọi ${tm('x')} là số km, viết biểu thức số tiền theo ${tm('x')} (1 km đầu và các km còn lại tính giá khác nhau) rồi cho bằng số tiền đã trả.`,
      sol:`Gọi ${tm('x')} (km, ${tm('x \\ge 1')}) là quãng đường đã đi. Số tiền phải trả: ${tm(`${A} + ${B}(x - 1)`)} (nghìn đồng).<br>Theo đề: ${tm(`${A} + ${B}(x - 1) = ${cost}`)}, suy ra ${tm(`${B}(x - 1) = ${cost} - ${A} = ${cost - A}`)}.<br>${tm(`x - 1 = ${cost - A} : ${B} = ${k-1}`)}, nên ${tm(`x = ${k}`)} (thỏa ${tm('x \\ge 1')}).<br>Hành khách đã đi ${tb(k)} km.`});
  }
  const a = pick([10,20,30,40]), b = pick([10,20,30,40,50]), k = R(5,30), P = 100*k, F = k*(100-a)*(100-b)/100, fac = (100-a)*(100-b)/10000;
  return QB({text:`Một chiếc xe đạp được giảm ${a}% so với giá niêm yết. Khách có thẻ thành viên được giảm thêm ${b}% trên giá đã giảm, nên chỉ phải trả ${F} nghìn đồng. Tính giá niêm yết của chiếc xe (nghìn đồng).`,
    tpl:`Giá niêm yết: [_] nghìn đồng`, ans:[P],
    hint:`Gọi giá niêm yết là ${tm('x')}. Giá sau lần giảm thứ nhất là ${tm('x')} nhân với phần trăm còn lại; lần giảm thứ hai tính trên giá <b>đã giảm</b>, không tính trên ${tm('x')}.`,
    sol:`Gọi ${tm('x')} (nghìn đồng, ${tm('x \\gt 0')}) là giá niêm yết.<br>Sau lần giảm thứ nhất còn ${tm(`${100-a}\\%`)}: giá là ${tm(`${tdec((100-a)/100)}x`)}.<br>Giảm thêm ${b}% trên giá này nên còn ${tm(`${100-b}\\%`)}: giá phải trả là ${tm(`${tdec((100-b)/100)}\\cdot ${tdec((100-a)/100)}x = ${tdec(fac)}x`)}.<br>Theo đề: ${tm(`${tdec(fac)}x = ${F}`)}, suy ra ${tm(`x = ${F} : ${tdec(fac)} =`)} ${tb(P)} (nghìn đồng).`});
};

/* Dạng 2. Lập phương trình bậc nhất một ẩn */
const gBt2 = lv => {
  if(lv===1){
    let k, c, n, mm, d; do{ k = pick([2,3]); c = R(5,15); n = R(3,10); mm = k*(c+n) - n; d = mm - c; }while(mm > 50 || d < 15);
    const rhs = d + n - k*n;
    return QB({text:`Hiện nay mẹ hơn con ${d} tuổi. Sau ${n} năm nữa thì tuổi mẹ gấp ${k} lần tuổi con. Tính tuổi của con hiện nay.`,
      tpl:`Tuổi con: [_] tuổi`, ans:[c],
      hint:`Gọi tuổi con hiện nay là ${tm('x')}, suy ra tuổi mẹ; sau ${n} năm cả hai cùng tăng ${n} tuổi. Lập phương trình từ quan hệ “gấp ${k} lần”.`,
      sol:`Gọi ${tm('x')} (tuổi, ${tm('x \\gt 0')}) là tuổi con hiện nay; tuổi mẹ hiện nay là ${tm(`x + ${d}`)}.<br>Sau ${n} năm: con ${tm(`x + ${n}`)} tuổi, mẹ ${tm(`x + ${d+n}`)} tuổi.<br>Theo đề: ${tm(`x + ${d+n} = ${k}(x + ${n})`)}, tức ${tm(`x + ${d+n} = ${k}x + ${k*n}`)}.<br>Chuyển vế: ${tm(`${k-1===1?'':k-1}x = ${d+n} - ${k*n} = ${rhs}`)}, suy ra ${tm(`x = ${c}`)} (thỏa ${tm('x \\gt 0')}).<br>Tuổi con hiện nay: ${tb(c)} tuổi.`});
  }
  if(lv===2){
    const a = pick([5,6,8,10,12]), b = pick([8,10,12,15,18,20]), x = R(3,12), t = R(2,6), T = a*x + b*(x+t);
    return QB({text:`Bạn Lan mua một số cái bút giá ${a} nghìn đồng một cái và số quyển vở nhiều hơn số bút ${t} quyển, giá ${b} nghìn đồng một quyển. Tổng số tiền Lan phải trả là ${T} nghìn đồng. Hỏi Lan đã mua bao nhiêu cái bút?`,
      tpl:`Số bút: [_] cái`, ans:[x],
      hint:`Gọi ${tm('x')} là số bút, biểu diễn số vở theo ${tm('x')}. Tổng tiền bằng tiền bút cộng tiền vở.`,
      sol:`Gọi ${tm('x')} (cái, ${tm('x')} nguyên dương) là số bút; số vở là ${tm(`x + ${t}`)} quyển.<br>Tiền bút: ${tm(`${a}x`)}; tiền vở: ${tm(`${b}(x + ${t})`)} (nghìn đồng).<br>Theo đề: ${tm(`${a}x + ${b}(x + ${t}) = ${T}`)}, tức ${tm(`${a+b}x + ${b*t} = ${T}`)}.<br>${tm(`${a+b}x = ${T} - ${b*t} = ${T - b*t}`)}, suy ra ${tm(`x = ${T - b*t} : ${a+b} = ${x}`)}.<br>Lan đã mua ${tb(x)} cái bút.`});
  }
  let N, p, q, t; do{ N = pick([40,60,80]); p = pick([20,25,30,35,40,45]); q = p + pick([5,10,15,20,25,30]); t = (q-p)*N/100; }while(t < 2 || t > 24);
  return QB({text:`Số học sinh giỏi của một lớp chiếm ${p}% sĩ số lớp. Cuối học kì có thêm ${t} bạn đạt loại giỏi nên số học sinh giỏi chiếm ${q}% sĩ số (sĩ số lớp không đổi). Tính sĩ số của lớp.`,
    tpl:`Sĩ số: [_] học sinh`, ans:[N],
    hint:`Gọi sĩ số là ${tm('x')}. Số học sinh giỏi lúc đầu là ${p}% của ${tm('x')}; lập phương trình “số giỏi lúc đầu cộng ${t} bạn bằng số giỏi lúc sau”.`,
    sol:`Gọi ${tm('x')} (học sinh, ${tm('x')} nguyên dương) là sĩ số lớp.<br>Lúc đầu có ${tm(`\\dfrac{${p}}{100}x`)} học sinh giỏi; lúc sau có ${tm(`\\dfrac{${q}}{100}x`)} học sinh giỏi.<br>Theo đề: ${tm(`\\dfrac{${p}}{100}x + ${t} = \\dfrac{${q}}{100}x`)}, suy ra ${tm(`${t} = \\dfrac{${q - p}}{100}x`)}.<br>Vậy ${tm(`x = \\dfrac{100\\cdot ${t}}{${q - p}} = ${N}`)}.<br>Sĩ số của lớp là ${tb(N)} học sinh.`});
};

/* Dạng 3. Chuyển động */
const gBt3 = lv => {
  if(lv===1){
    const v1 = R(35,55), v2 = R(40,60), t = R(2,4), s = (v1+v2)*t;
    return QB({text:`Hai ô tô khởi hành cùng lúc từ hai địa điểm ${tm('A')} và ${tm('B')} cách nhau ${s} km, đi ngược chiều nhau trên cùng một đường và gặp nhau sau ${t} giờ. Biết ô tô đi từ ${tm('A')} có vận tốc ${v1} km/h. Tính vận tốc của ô tô đi từ ${tm('B')} (km/h).`,
      tpl:`Vận tốc: [_] km/h`, ans:[v2],
      hint:`Quãng đường = vận tốc × thời gian. Khi gặp nhau, tổng quãng đường hai xe đã đi bằng độ dài ${tm('AB')}.`,
      sol:`Gọi ${tm('x')} (km/h, ${tm('x \\gt 0')}) là vận tốc ô tô đi từ ${tm('B')}.<br>Sau ${t} giờ: ô tô từ ${tm('A')} đi ${tm(`${v1}\\cdot ${t} = ${v1*t}`)} km; ô tô từ ${tm('B')} đi ${tm(`${t}x`)} km.<br>Hai xe gặp nhau nên tổng quãng đường bằng ${tm('AB')}: ${tm(`${v1*t} + ${t}x = ${s}`)}.<br>${tm(`${t}x = ${s - v1*t}`)}, suy ra ${tm(`x = ${v2}`)} (thỏa ${tm('x \\gt 0')}).<br>Vận tốc ô tô từ ${tm('B')}: ${tb(v2)} km/h.`});
  }
  if(lv===2){
    const [x,a,h,s] = pick(BT_MOVE), c = x*(x+a), D = a*a + 4*c;
    return QB({text:`Một ô tô đi từ ${tm('A')} đến ${tm('B')} dài ${s} km, rồi quay về ${tm('A')} trên cùng quãng đường đó với vận tốc lớn hơn vận tốc lúc đi ${a} km/h. Thời gian về ít hơn thời gian đi ${h} giờ. Tính vận tốc lúc đi (km/h).`,
      tpl:`Vận tốc lúc đi: [_] km/h`, ans:[x],
      hint:`Gọi vận tốc lúc đi là ${tm('x')}, vận tốc lúc về là ${tm('x + '+a)}. Thời gian = quãng đường : vận tốc; lập phương trình “thời gian đi trừ thời gian về bằng ${h} giờ”, quy đồng rồi giải phương trình bậc hai.`,
      sol:`Gọi ${tm('x')} (km/h, ${tm('x \\gt 0')}) là vận tốc lúc đi; vận tốc lúc về là ${tm(`x + ${a}`)} km/h.<br>Thời gian đi: ${tm(`\\dfrac{${s}}{x}`)} giờ; thời gian về: ${tm(`\\dfrac{${s}}{x + ${a}}`)} giờ.<br>Theo đề: ${tm(`\\dfrac{${s}}{x} - \\dfrac{${s}}{x + ${a}} = ${h}`)}. Quy đồng, khử mẫu: ${tm(`${s}(x + ${a}) - ${s}x = ${h>1?h:''}x(x + ${a})`)}, tức ${tm(`${s*a} = ${h>1?h:''}x(x + ${a})`)}.<br>${h>1?`Chia hai vế cho ${h}: `:''}${tm(`x^2 + ${a}x - ${c} = 0`)}.<br>${tm(`\\Delta = ${a}^2 + 4\\cdot ${c} = ${D}`)}, ${tm(`\\sqrt{\\Delta} = ${2*x+a}`)}.<br>${tm(`x_1 = \\dfrac{-${a} + ${2*x+a}}{2} = ${x}`)} (nhận); ${tm(`x_2 = \\dfrac{-${a} - ${2*x+a}}{2} = ${-(x+a)}`)} (loại vì ${tm('x \\gt 0')}).<br>Vận tốc lúc đi: ${tb(x)} km/h.`});
  }
  const [v,u,s,T] = pick(BT_STREAM), D4 = s*s + T*T*u*u, r = T*v - s, x2n = 2*s - T*v;
  return QB({text:`Một ca nô xuôi dòng ${s} km rồi quay lại ngược dòng về chỗ xuất phát, tổng thời gian đi và về là ${T} giờ (không kể thời gian nghỉ). Biết vận tốc dòng nước là ${u} km/h. Tính vận tốc riêng của ca nô (km/h).`,
    tpl:`Vận tốc riêng: [_] km/h`, ans:[v],
    hint:`Gọi vận tốc riêng của ca nô là ${tm('x')} (phải lớn hơn vận tốc dòng nước). Xuôi dòng vận tốc ${tm('x + '+u)}, ngược dòng vận tốc ${tm('x - '+u)}; tổng hai thời gian bằng ${T} giờ.`,
    sol:`Gọi ${tm('x')} (km/h, ${tm(`x \\gt ${u}`)}) là vận tốc riêng của ca nô. Vận tốc xuôi dòng ${tm(`x + ${u}`)}, ngược dòng ${tm(`x - ${u}`)}.<br>Theo đề: ${tm(`\\dfrac{${s}}{x + ${u}} + \\dfrac{${s}}{x - ${u}} = ${T}`)}. Quy đồng, khử mẫu: ${tm(`${s}(x - ${u}) + ${s}(x + ${u}) = ${T}(x^2 - ${u*u})`)}, tức ${tm(`${2*s}x = ${T}x^2 - ${T*u*u}`)}.<br>Đưa về dạng: ${tm(`${T}x^2 - ${2*s}x - ${T*u*u} = 0`)}.<br>Dùng ${tm("\\Delta'")} với ${tm(`b' = -${s}`)}: ${tm(`\\Delta' = ${s}^2 + ${T}\\cdot ${T*u*u} = ${D4}`)}, ${tm(`\\sqrt{\\Delta'} = ${r}`)}.<br>${tm(`x_1 = \\dfrac{${s} + ${r}}{${T}} = ${v}`)} (nhận vì ${tm(`\\gt ${u}`)}); ${tm(`x_2 = \\dfrac{${s} - ${r}}{${T}} = ${x2n%T===0 ? x2n/T : `\\dfrac{${x2n}}{${T}}`}`)} (loại vì âm).<br>Vận tốc riêng của ca nô: ${tb(v)} km/h.`});
};

/* Dạng 4. Công việc – năng suất */
const gBt4 = lv => {
  if(lv===1){
    const [a,b,T] = pick(BT_WORK);
    return QB({text:`Một bể nước không có nước. Nếu mở riêng vòi thứ nhất thì sau ${a} giờ đầy bể, nếu mở riêng vòi thứ hai thì sau ${b} giờ đầy bể. Hỏi mở cả hai vòi cùng lúc thì sau bao nhiêu giờ đầy bể?`,
      tpl:`Thời gian: [_] giờ`, ans:[T],
      hint:`Coi cả bể là 1 công việc. Trong 1 giờ mỗi vòi chảy được bao nhiêu phần bể? Cộng hai phần đó lại, rồi tìm thời gian đầy bể.`,
      sol:`Trong 1 giờ: vòi thứ nhất chảy ${tm(`\\dfrac{1}{${a}}`)} bể, vòi thứ hai chảy ${tm(`\\dfrac{1}{${b}}`)} bể.<br>Hai vòi cùng chảy trong 1 giờ được: ${tm(`\\dfrac{1}{${a}} + \\dfrac{1}{${b}} = \\dfrac{${b} + ${a}}{${a*b}} = \\dfrac{${a+b}}{${a*b}}`)} bể.<br>Thời gian để đầy bể: ${tm(`1 : \\dfrac{${a+b}}{${a*b}} = \\dfrac{${a*b}}{${a+b}} =`)} ${tb(T)} giờ.`});
  }
  if(lv===2){
    const [x,a,d,N] = pick(BT_PLAN), c = x*(x+a), D = a*a + 4*c;
    return QB({text:`Một tổ sản xuất phải làm xong ${N} sản phẩm theo kế hoạch. Thực tế mỗi ngày tổ làm nhiều hơn kế hoạch ${a} sản phẩm nên hoàn thành sớm hơn kế hoạch ${d} ngày. Hỏi theo kế hoạch, mỗi ngày tổ phải làm bao nhiêu sản phẩm?`,
      tpl:`Kế hoạch mỗi ngày: [_] sản phẩm`, ans:[x],
      hint:`Gọi số sản phẩm làm mỗi ngày theo kế hoạch là ${tm('x')}; số ngày = tổng sản phẩm : số sản phẩm mỗi ngày. Lập phương trình “ngày theo kế hoạch trừ ngày thực tế bằng ${d}”.`,
      sol:`Gọi ${tm('x')} (sản phẩm/ngày, ${tm('x \\gt 0')}) là năng suất theo kế hoạch; năng suất thực tế là ${tm(`x + ${a}`)}.<br>Số ngày theo kế hoạch: ${tm(`\\dfrac{${N}}{x}`)}; số ngày thực tế: ${tm(`\\dfrac{${N}}{x + ${a}}`)}.<br>Theo đề: ${tm(`\\dfrac{${N}}{x} - \\dfrac{${N}}{x + ${a}} = ${d}`)}. Quy đồng, khử mẫu: ${tm(`${N}(x + ${a}) - ${N}x = ${d>1?d:''}x(x + ${a})`)}, tức ${tm(`${N*a} = ${d>1?d:''}x(x + ${a})`)}.<br>${d>1?`Chia hai vế cho ${d}: `:''}${tm(`x^2 + ${a}x - ${c} = 0`)}.<br>${tm(`\\Delta = ${a}^2 + 4\\cdot ${c} = ${D}`)}, ${tm(`\\sqrt{\\Delta} = ${2*x+a}`)}.<br>${tm(`x_1 = \\dfrac{-${a} + ${2*x+a}}{2} = ${x}`)} (nhận); ${tm(`x_2 = \\dfrac{-${a} - ${2*x+a}}{2} = ${-(x+a)}`)} (loại vì ${tm('x \\gt 0')}).<br>Theo kế hoạch, mỗi ngày tổ làm ${tb(x)} sản phẩm.`});
  }
  const [x,d,T] = pick(BT_TWO), b = d - 2*T, c = T*d, D = b*b + 4*c, r = 2*x + d - 2*T, x2 = -b - x;
  return QB({text:`Hai vòi nước cùng chảy vào một bể không có nước thì sau ${T} giờ đầy bể. Nếu chảy riêng một mình thì vòi thứ nhất đầy bể nhanh hơn vòi thứ hai ${d} giờ. Hỏi vòi thứ nhất chảy riêng một mình thì sau bao lâu đầy bể?`,
    tpl:`Vòi thứ nhất: [_] giờ`, ans:[x],
    hint:`Gọi thời gian vòi thứ nhất chảy riêng đầy bể là ${tm('x')} giờ, thì vòi thứ hai là ${tm('x + '+d)} giờ. Trong 1 giờ hai vòi chảy được ${tm(`\\dfrac{1}{${T}}`)} bể; lập phương trình theo phần bể chảy được trong 1 giờ.`,
    sol:`Gọi ${tm('x')} (giờ, ${tm('x \\gt 0')}) là thời gian vòi thứ nhất chảy riêng đầy bể; vòi thứ hai cần ${tm(`x + ${d}`)} giờ.<br>Trong 1 giờ: vòi thứ nhất chảy ${tm(`\\dfrac{1}{x}`)} bể, vòi thứ hai ${tm(`\\dfrac{1}{x + ${d}}`)} bể, cả hai ${tm(`\\dfrac{1}{${T}}`)} bể.<br>Phương trình: ${tm(`\\dfrac{1}{x} + \\dfrac{1}{x + ${d}} = \\dfrac{1}{${T}}`)}. Quy đồng, khử mẫu: ${tm(`${T}(x + ${d}) + ${T}x = x(x + ${d})`)}, tức ${tm(`${tpoly([1,'x^2'],[b,'x'],[-c,''])} = 0`)}.<br>${tm(`\\Delta = (${b})^2 + 4\\cdot ${c} = ${D}`)}, ${tm(`\\sqrt{\\Delta} = ${r}`)}.<br>${tm(`x_1 = \\dfrac{${-b} + ${r}}{2} = ${x}`)} (nhận); ${tm(`x_2 = \\dfrac{${-b} - ${r}}{2} = ${x2}`)} (loại vì ${tm('x \\gt 0')}).<br>Vòi thứ nhất chảy riêng đầy bể sau ${tb(x)} giờ.`});
};

/* Dạng 5. Tích hai số, lãi kép, chia hàng ghế */
const gBt5 = lv => {
  if(lv===1){
    const x = R(3,20), d = R(2,9), P = x*(x+d), D = d*d + 4*P;
    return QB({text:`Hai số dương hơn kém nhau ${d} đơn vị và tích của chúng bằng ${P}. Tìm số lớn.`,
      tpl:`Số lớn: [_]`, ans:[x+d],
      hint:`Gọi số bé là ${tm('x')}, suy ra số lớn; lập phương trình từ tích bằng ${P} rồi giải. Nhớ loại nghiệm không thỏa điều kiện dương.`,
      sol:`Gọi ${tm('x')} (${tm('x \\gt 0')}) là số bé; số lớn là ${tm(`x + ${d}`)}.<br>Theo đề: ${tm(`x(x + ${d}) = ${P}`)}, tức ${tm(`x^2 + ${d}x - ${P} = 0`)}.<br>${tm(`\\Delta = ${d}^2 + 4\\cdot ${P} = ${D}`)}, ${tm(`\\sqrt{\\Delta} = ${2*x+d}`)}.<br>${tm(`x_1 = \\dfrac{-${d} + ${2*x+d}}{2} = ${x}`)} (nhận); ${tm(`x_2 = \\dfrac{-${d} - ${2*x+d}}{2} = ${-(x+d)}`)} (loại vì ${tm('x \\gt 0')}).<br>Số bé là ${x}, số lớn là ${tm(`${x} + ${d} =`)} ${tb(x+d)}.`});
  }
  if(lv===2){
    const [x,P,T] = pick(BT_SAVE), e = (100+x)/100;
    return QB({text:`Bác Hòa gửi tiết kiệm ${P} triệu đồng với lãi suất ${tm('x')}%/năm, lãi mỗi năm được nhập vào gốc để tính lãi năm sau. Sau 2 năm, bác nhận được cả gốc lẫn lãi là ${T} triệu đồng. Tìm lãi suất ${tm('x')} (đơn vị: %/năm).`,
      tpl:`${tm('x =')} [_] %/năm`, ans:[x],
      hint:`Sau 1 năm số tiền là gốc nhân ${tm('(1 + \\dfrac{x}{100})')}; năm thứ hai lại nhân thêm một lần nữa. Lập phương trình, chia hai vế cho ${P}, rồi lấy căn bậc hai (chú ý hệ số ${tm('1 + \\dfrac{x}{100}')} dương).`,
      sol:`Sau 1 năm: ${tm(`${P}\\left(1 + \\dfrac{x}{100}\\right)`)} triệu đồng. Sau 2 năm: ${tm(`${P}\\left(1 + \\dfrac{x}{100}\\right)^2`)} triệu đồng.<br>Theo đề: ${tm(`${P}\\left(1 + \\dfrac{x}{100}\\right)^2 = ${T}`)}, suy ra ${tm(`\\left(1 + \\dfrac{x}{100}\\right)^2 = \\dfrac{${T}}{${P}} = ${tdec(e*e)} = ${tdec(e)}^2`)}.<br>Do ${tm('1 + \\dfrac{x}{100} \\gt 0')} nên ${tm(`1 + \\dfrac{x}{100} = ${tdec(e)}`)} (loại giá trị âm ${tm(`-${tdec(e)}`)}).<br>${tm(`\\dfrac{x}{100} = ${tdec(e-1)}`)}, suy ra ${tb('x = '+x)} (%/năm).`});
  }
  const [p,q,x,s,N] = pick(BT_ROWS), D = (p*q)*(p*q) + 4*q*p*N, r = q*(2*x+p);
  return QB({text:`Một phòng họp có ${N} ghế, xếp thành các hàng có số ghế bằng nhau. Nếu mỗi hàng bớt đi ${q} ghế thì phải xếp thêm ${p} hàng mới đủ chỗ cho ${N} ghế. Hỏi ban đầu phòng họp có bao nhiêu hàng ghế?`,
    tpl:`Số hàng ban đầu: [_] hàng`, ans:[x],
    hint:`Gọi số hàng ban đầu là ${tm('x')}; số ghế mỗi hàng ban đầu là ${tm(`\\dfrac{${N}}{x}`)}. Sau khi thay đổi: số hàng là ${tm('x + '+p)}, số ghế mỗi hàng giảm ${q}; tích hai số này vẫn bằng ${N}.`,
    sol:`Gọi ${tm('x')} (hàng, ${tm('x')} nguyên dương) là số hàng ban đầu; mỗi hàng có ${tm(`\\dfrac{${N}}{x}`)} ghế.<br>Sau khi thay đổi: ${tm(`x + ${p}`)} hàng, mỗi hàng ${tm(`\\dfrac{${N}}{x} - ${q}`)} ghế.<br>Theo đề: ${tm(`(x + ${p})\\left(\\dfrac{${N}}{x} - ${q}\\right) = ${N}`)}. Khai triển: ${tm(`${N} - ${q}x + \\dfrac{${p*N}}{x} - ${p*q} = ${N}`)}.<br>Nhân hai vế với ${tm('x')} rồi rút gọn: ${tm(`${p*N} - ${q}x^2 - ${p*q}x = 0`)}, tức ${tm(`${tpoly([q,'x^2'],[p*q,'x'],[-p*N,''])} = 0`)}.<br>${tm(`\\Delta = ${p*q}^2 + 4\\cdot ${q}\\cdot ${p*N} = ${D}`)}, ${tm(`\\sqrt{\\Delta} = ${r}`)}.<br>${tm(`x_1 = \\dfrac{-${p*q} + ${r}}{${2*q}} = ${x}`)} (nhận); ${tm(`x_2 = \\dfrac{-${p*q} - ${r}}{${2*q}} = ${-(x+p)}`)} (loại vì âm).<br>Ban đầu phòng họp có ${tb(x)} hàng ghế.`});
};

lesson(6,'on-thi-giai-bai-toan-lap-pt','Đại số 5. Giải bài toán bằng cách lập biểu thức, phương trình, phương trình bậc hai','Ôn tuyển sinh: lập biểu thức từ tình huống (cước phí, giảm giá); lập phương trình bậc nhất (tuổi, mua hàng, phần trăm); chuyển động; công việc – năng suất; tích hai số, lãi kép, chia hàng ghế.',[gBt1,gBt2,gBt3,gBt4,gBt5], {intro:[
  {t:`Các bước giải bài toán bằng cách lập phương trình`, b:`<ol><li><b>Chọn ẩn</b>, ghi đơn vị và <b>điều kiện</b> của ẩn (dương, nguyên, lớn hơn…).</li><li>Biểu diễn các đại lượng còn lại theo ẩn.</li><li><b>Lập phương trình</b> từ mối quan hệ trong đề (tổng, hiệu, gấp, tổng quãng đường, tổng phần việc…).</li><li>Giải phương trình.</li><li><b>Đối chiếu điều kiện</b>, loại nghiệm không phù hợp, kết luận kèm đơn vị.</li></ol>`, warn:`Mất điểm nhiều nhất ở hai chỗ: <b>quên điều kiện của ẩn</b> và <b>quên loại nghiệm</b> (nghiệm âm, nghiệm không nguyên khi ẩn là số người, số hàng…). Kết luận phải trả lời đúng câu hỏi của đề (có khi đề hỏi đại lượng khác với ẩn).`, ex:`Chọn ẩn chính là đại lượng đề hỏi thì kết luận nhanh nhất. Thử lại nghiệm vào đề (tính lại tổng, tích, thời gian) trong 10 giây để chắc đáp số.`},
  {t:`Các công thức hay dùng`, b:`<ul><li>Chuyển động: ${tm('s = vt')}, ${tm('t = \\dfrac{s}{v}')}. Xuôi dòng: ${tm('v_{\\text{riêng}} + v_{\\text{nước}}')}; ngược dòng: ${tm('v_{\\text{riêng}} - v_{\\text{nước}}')}.</li><li>Công việc: năng suất = khối lượng : thời gian. Nếu làm riêng xong trong ${tm('a')} giờ thì 1 giờ làm được ${tm('\\dfrac{1}{a}')} công việc; làm chung thì <b>cộng các phần việc trong 1 giờ</b>.</li><li>Phần trăm: tăng ${tm('p\\%')} thì nhân ${tm('1 + \\dfrac{p}{100}')}; giảm ${tm('p\\%')} thì nhân ${tm('1 - \\dfrac{p}{100}')}. Lãi kép sau ${tm('n')} năm: ${tm('A\\left(1 + \\dfrac{r}{100}\\right)^n')}.</li></ul>`, warn:`Giảm giá hai lần liên tiếp thì lần sau tính trên giá <b>đã giảm</b> (nhân hai hệ số), không cộng hai phần trăm lại. Trong bài chuyển động phải đổi cùng đơn vị (giờ – phút, km – m).`, ex:`Bài có “sớm hơn”, “nhanh hơn”, “ít hơn ${tm('d')} giờ” thường dẫn tới phương trình có ẩn ở mẫu: <b>quy đồng, khử mẫu</b> rồi đưa về ${tm('ax^2 + bx + c = 0')}.`},
  {t:`Giải phương trình bậc hai và đối chiếu nghiệm`, b:`Với ${tm('ax^2 + bx + c = 0')}: ${tm('\\Delta = b^2 - 4ac')}. Nếu ${tm('\\Delta \\gt 0')} có hai nghiệm ${tm('x_{1,2} = \\dfrac{-b \\pm \\sqrt{\\Delta}}{2a}')}. Khi ${tm('b = 2b\'')} dùng ${tm("\\Delta' = b'^2 - ac")}: ${tm("x_{1,2} = \\dfrac{-b' \\pm \\sqrt{\\Delta'}}{a}")}. Với phương trình có ẩn ở mẫu, nhớ <b>điều kiện mẫu khác 0</b> trước khi quy đồng.`, warn:`Hai nghiệm đều phải được đối chiếu với điều kiện của bài toán. Thường một nghiệm bị loại (âm, nhỏ hơn vận tốc dòng nước, không nguyên…); hiếm khi cả hai cùng nhận.`, ex:`Trước khi giải, hãy chia hai vế cho ước chung của các hệ số để số nhỏ lại; sau đó tính ${tm('\\Delta')} cẩn thận, đáp số của đề thi hầu hết là số nguyên nên ${tm('\\Delta')} phải là số chính phương.`}
]});
}


/* =====================================================================
   ÔN THI VÀO 10 – Hình học 4. Hình không gian thực tế (công thức cho sẵn trong đề)
   Dạng 1 hình trụ · Dạng 2 hình nón · Dạng 3 hình cầu
   Dạng 4 hình hộp, lăng trụ, hình chóp đều (mái nhà, bể nước) · Dạng 5 hình ghép và bài toán thể tích bảo toàn
   Đáp số là số nguyên (hệ số của π hoặc số đo); công thức luôn được ghi trong đề.
   ===================================================================== */
{
const PI = tm('\\pi');
const svgT = (x,y,s,anc='middle',fs=16) => `<text class="sv-txt" x="${x}" y="${y}" font-size="${fs}" text-anchor="${anc}">${s}</text>`;
const FL = 'style="fill:var(--primary-soft)"';
const DS = 'stroke-dasharray="6 4"';
const cylFig = (lr,lh) => `<svg viewBox="0 0 320 190" role="img" aria-label="Hình trụ"><path class="sv-ink" stroke-width="3" d="M100,45 V140 A60,16 0 0 0 220,140 V45" ${FL}/><path class="sv-ink" stroke-width="2" ${DS} d="M100,140 A60,16 0 0 1 220,140"/><ellipse class="sv-ink" stroke-width="3" cx="160" cy="45" rx="60" ry="16" ${FL}/><line class="sv-ink" stroke-width="2" ${DS} x1="160" y1="45" x2="220" y2="45"/>${svgT(190,36,lr)}${svgT(236,98,lh,'start')}</svg>`;
const coneFig = (lr,lh,ll) => `<svg viewBox="0 0 320 190" role="img" aria-label="Hình nón"><path class="sv-ink" stroke-width="3" d="M90,140 L160,22 L230,140 A70,16 0 0 1 90,140 Z" ${FL}/><path class="sv-ink" stroke-width="2" ${DS} d="M90,140 A70,16 0 0 0 230,140"/><line class="sv-ink" stroke-width="2" ${DS} x1="160" y1="22" x2="160" y2="140"/><line class="sv-ink" stroke-width="2" ${DS} x1="160" y1="140" x2="230" y2="140"/>${svgT(150,86,lh,'end')}${svgT(195,134,lr)}${svgT(212,70,ll,'start')}</svg>`;
const sphFig = lr => `<svg viewBox="0 0 320 190" role="img" aria-label="Hình cầu"><circle class="sv-ink" stroke-width="3" cx="160" cy="95" r="72" ${FL}/><path class="sv-ink" stroke-width="2" ${DS} d="M88,95 A72,18 0 0 0 232,95"/><path class="sv-ink" stroke-width="2" d="M88,95 A72,18 0 0 1 232,95"/><line class="sv-ink" stroke-width="2" x1="160" y1="95" x2="232" y2="95"/><circle class="sv-ink" cx="160" cy="95" r="3" style="fill:var(--ink)"/>${svgT(198,88,lr)}</svg>`;
const boxFig = (la,lb,lc) => `<svg viewBox="0 0 320 200" role="img" aria-label="Hình hộp chữ nhật"><polygon class="sv-ink" stroke-width="3" points="50,80 210,80 210,170 50,170" ${FL}/><polygon class="sv-ink" stroke-width="3" points="50,80 110,40 270,40 210,80" ${FL}/><polygon class="sv-ink" stroke-width="3" points="210,80 270,40 270,130 210,170" ${FL}/>${svgT(130,192,la)}${svgT(32,128,lc,'end')}${svgT(258,34,lb,'middle')}</svg>`;
const pyrFig = (la,lh,ld) => `<svg viewBox="0 0 320 200" role="img" aria-label="Hình chóp tứ giác đều"><polygon class="sv-ink" stroke-width="2" ${DS} points="60,160 110,125 270,125 220,160" ${FL}/><polygon class="sv-ink" stroke-width="3" points="60,160 220,160 165,22" ${FL}/><polygon class="sv-ink" stroke-width="3" points="220,160 270,125 165,22" ${FL}/><line class="sv-ink" stroke-width="2" ${DS} x1="165" y1="22" x2="165" y2="142"/><line class="sv-ink" stroke-width="2" ${DS} x1="165" y1="22" x2="140" y2="160"/>${svgT(140,180,la)}${svgT(157,92,lh,'end')}${svgT(138,84,ld,'end')}</svg>`;
const iceFig = (lr,lh) => `<svg viewBox="0 0 320 200" role="img" aria-label="Que kem ốc quế"><path class="sv-ink" stroke-width="3" d="M105,85 L160,185 L215,85 Z" ${FL}/><path class="sv-ink" stroke-width="3" d="M105,85 A55,55 0 0 1 215,85 Z" ${FL}/><line class="sv-ink" stroke-width="2" ${DS} x1="160" y1="85" x2="215" y2="85"/><line class="sv-ink" stroke-width="2" ${DS} x1="160" y1="85" x2="160" y2="185"/>${svgT(188,78,lr)}${svgT(150,140,lh,'end')}</svg>`;
const siloFig = (lr,lH,lh) => `<svg viewBox="0 0 320 200" role="img" aria-label="Tháp chứa có mái nón"><path class="sv-ink" stroke-width="3" d="M100,80 V160 A60,14 0 0 0 220,160 V80 Z" ${FL}/><path class="sv-ink" stroke-width="3" d="M100,80 L160,12 L220,80 A60,14 0 0 1 100,80 Z" ${FL}/><line class="sv-ink" stroke-width="2" ${DS} x1="160" y1="80" x2="220" y2="80"/>${svgT(190,74,lr)}${svgT(236,126,lH,'start')}${svgT(150,50,lh,'end')}</svg>`;
const capFig = (lr,lh) => `<svg viewBox="0 0 320 170" role="img" aria-label="Bồn chứa hai đầu bán cầu"><path class="sv-ink" stroke-width="3" d="M90,50 H230 A45,45 0 0 1 230,140 H90 A45,45 0 0 1 90,50 Z" ${FL}/><line class="sv-ink" stroke-width="2" ${DS} x1="90" y1="50" x2="90" y2="140"/><line class="sv-ink" stroke-width="2" ${DS} x1="230" y1="50" x2="230" y2="140"/>${svgT(160,92,lh)}${svgT(62,100,lr,'end')}</svg>`;

/* Dạng 1. Hình trụ */
const gHk1 = lv => {
  if(lv===1){
    const r = R(2,9), h = R(3,12);
    if(pick([0,1])===0){
      return QB({text:`Một lon sữa hình trụ có bán kính đáy ${r} cm, chiều cao ${h} cm. Cho biết công thức diện tích xung quanh hình trụ ${tm('S_{xq} = 2\\pi rh')} (${tm('r')} là bán kính đáy, ${tm('h')} là chiều cao). Tính diện tích xung quanh của lon sữa (kết quả theo ${PI}).`,
        tpl:`${tm('S_{xq} =')} [_]${PI} cm²`, ans:[2*r*h], fig:cylFig(`r = ${r}`,`h = ${h}`),
        hint:`Thay ${tm('r')} và ${tm('h')} vào công thức, nhân các số và giữ nguyên ${PI}.`,
        sol:`${tm(`S_{xq} = 2\\pi rh = 2\\pi\\cdot ${r}\\cdot ${h}`)}.<br>Vậy ${tb(`S_{xq} = ${2*r*h}\\pi`)} cm².`});
    }
    return QB({text:`Một thùng nước hình trụ có bán kính đáy ${r} dm, chiều cao ${h} dm. Cho biết công thức thể tích hình trụ ${tm('V = \\pi r^2 h')}. Tính thể tích thùng (kết quả theo ${PI}).`,
      tpl:`${tm('V =')} [_]${PI} dm³`, ans:[r*r*h], fig:cylFig(`r = ${r}`,`h = ${h}`),
      hint:`Bình phương bán kính trước, rồi nhân với chiều cao.`,
      sol:`${tm(`V = \\pi r^2 h = \\pi\\cdot ${r}^2\\cdot ${h} = \\pi\\cdot ${r*r}\\cdot ${h}`)}.<br>Vậy ${tb(`V = ${r*r*h}\\pi`)} dm³.`});
  }
  if(lv===2){
    const r = R(3,9), h = R(4,12), k = pick([0,1,2]);
    if(k===0){
      return QB({text:`Một bình chứa hình trụ có bán kính đáy ${r} cm và thể tích ${r*r*h}${PI} cm³. Cho biết ${tm('V = \\pi r^2 h')}. Tính chiều cao của bình.`,
        tpl:`${tm('h =')} [_] cm`, ans:[h], fig:cylFig(`r = ${r}`,`h = ?`),
        hint:`Viết ${tm('V = \\pi r^2 h')} với các số đã biết rồi chia hai vế cho ${tm('\\pi r^2')}.`,
        sol:`${tm(`\\pi\\cdot ${r}^2\\cdot h = ${r*r*h}\\pi`)}, suy ra ${tm(`${r*r}h = ${r*r*h}`)}.<br>${tm(`h = ${r*r*h} : ${r*r} =`)} ${tb(h)} cm.`});
    }
    if(k===1){
      return QB({text:`Một hộp bánh hình trụ có bán kính đáy ${r} cm, chiều cao ${h} cm. Cho biết diện tích toàn phần hình trụ ${tm('S_{tp} = 2\\pi rh + 2\\pi r^2')}. Tính diện tích toàn phần của hộp (kết quả theo ${PI}).`,
        tpl:`${tm('S_{tp} =')} [_]${PI} cm²`, ans:[2*r*h+2*r*r], fig:cylFig(`r = ${r}`,`h = ${h}`),
        hint:`Tính riêng phần xung quanh ${tm('2\\pi rh')} và hai đáy ${tm('2\\pi r^2')} rồi cộng lại.`,
        sol:`Phần xung quanh: ${tm(`2\\pi rh = ${2*r*h}\\pi`)}.<br>Hai đáy: ${tm(`2\\pi r^2 = 2\\pi\\cdot ${r*r} = ${2*r*r}\\pi`)}.<br>${tm(`S_{tp} = ${2*r*h}\\pi + ${2*r*r}\\pi =`)} ${tb(`${2*r*h+2*r*r}\\pi`)} cm².`});
    }
    return QB({text:`Một ống tre hình trụ có chiều cao ${h} cm, diện tích xung quanh ${2*r*h}${PI} cm². Cho biết ${tm('S_{xq} = 2\\pi rh')}. Tính bán kính đáy của ống.`,
      tpl:`${tm('r =')} [_] cm`, ans:[r], fig:cylFig(`r = ?`,`h = ${h}`),
      hint:`Thay ${tm('S_{xq}')} và ${tm('h')} vào công thức, rồi chia hai vế cho ${tm('2\\pi h')}.`,
      sol:`${tm(`2\\pi\\cdot r\\cdot ${h} = ${2*r*h}\\pi`)}, suy ra ${tm(`${2*h}r = ${2*r*h}`)}.<br>${tm(`r = ${2*r*h} : ${2*h} =`)} ${tb(r)} cm.`});
  }
  if(pick([0,1])===0){
    const k = pick([2,2,3]), r1 = R(2,5), r2 = k*r1, t = R(2,7), h1 = k*k*t;
    return QB({text:`Bình ${tm('A')} hình trụ bán kính đáy ${r1} cm đang đựng nước cao ${h1} cm. Đổ toàn bộ nước sang bình ${tm('B')} hình trụ bán kính đáy ${r2} cm (bình ${tm('B')} đủ cao, nước không tràn). Cho biết ${tm('V = \\pi r^2 h')}. Tính chiều cao mực nước trong bình ${tm('B')}.`,
      tpl:`Chiều cao mực nước: [_] cm`, ans:[t],
      hint:`Lượng nước không đổi khi đổ sang bình khác: thể tích nước ở bình ${tm('A')} bằng thể tích nước ở bình ${tm('B')}.`,
      sol:`Thể tích nước: ${tm(`V = \\pi\\cdot ${r1}^2\\cdot ${h1} = ${r1*r1*h1}\\pi`)} cm³.<br>Gọi ${tm('x')} (cm) là chiều cao mực nước ở bình ${tm('B')}: ${tm(`\\pi\\cdot ${r2}^2\\cdot x = ${r1*r1*h1}\\pi`)}, tức ${tm(`${r2*r2}x = ${r1*r1*h1}`)}.<br>${tm(`x = ${r1*r1*h1} : ${r2*r2} =`)} ${tb(t)} cm.`});
  }
  const Rr = R(5,10), r = R(2,Rr-2), h = R(5,15);
  return QB({text:`Một ống nước hình trụ rỗng dài ${h} cm, bán kính ngoài ${Rr} cm, bán kính trong ${r} cm. Thể tích vật liệu làm ống bằng thể tích hình trụ ngoài trừ thể tích hình trụ trong (cùng chiều dài). Cho biết ${tm('V = \\pi r^2 h')}. Tính thể tích vật liệu (kết quả theo ${PI}).`,
    tpl:`${tm('V =')} [_]${PI} cm³`, ans:[(Rr*Rr-r*r)*h],
    hint:`Tính thể tích hình trụ bán kính ${Rr} cm và hình trụ bán kính ${r} cm (cùng chiều cao), rồi lấy hiệu; có thể đặt ${tm('\\pi h')} làm thừa số chung.`,
    sol:`Thể tích hình trụ ngoài: ${tm(`\\pi\\cdot ${Rr}^2\\cdot ${h} = ${Rr*Rr*h}\\pi`)}.<br>Thể tích hình trụ trong: ${tm(`\\pi\\cdot ${r}^2\\cdot ${h} = ${r*r*h}\\pi`)}.<br>Thể tích vật liệu: ${tm(`${Rr*Rr*h}\\pi - ${r*r*h}\\pi =`)} ${tb(`${(Rr*Rr-r*r)*h}\\pi`)} cm³.`});
};

/* Dạng 2. Hình nón */
const CONE3 = [[3,4,5],[4,3,5],[6,8,10],[8,6,10],[5,12,13],[12,5,13],[9,12,15],[12,9,15],[8,15,17],[15,8,17],[12,16,20],[16,12,20]];
const gHk2 = lv => {
  const [r,h,l] = pick(CONE3);
  if(lv===1){
    if(pick([0,1])===0){
      return QB({text:`Một chiếc mũ sinh nhật hình nón có bán kính đáy ${r} cm, chiều cao ${h} cm. Cho biết thể tích hình nón ${tm('V = \\dfrac{1}{3}\\pi r^2 h')}. Tính thể tích hình nón (kết quả theo ${PI}).`,
        tpl:`${tm('V =')} [_]${PI} cm³`, ans:[r*r*h/3], fig:coneFig(`r = ${r}`,`h = ${h}`,''),
        hint:`Tính ${tm('r^2 h')} trước rồi chia cho ${tm('3')}.`,
        sol:`${tm(`V = \\dfrac{1}{3}\\pi r^2 h = \\dfrac{1}{3}\\pi\\cdot ${r}^2\\cdot ${h} = \\dfrac{${r*r*h}}{3}\\pi`)}.<br>Vậy ${tb(`V = ${r*r*h/3}\\pi`)} cm³.`});
    }
    return QB({text:`Một chiếc phễu hình nón có bán kính đáy ${r} cm, độ dài đường sinh ${l} cm. Cho biết diện tích xung quanh hình nón ${tm('S_{xq} = \\pi rl')}. Tính diện tích xung quanh của phễu (kết quả theo ${PI}).`,
      tpl:`${tm('S_{xq} =')} [_]${PI} cm²`, ans:[r*l], fig:coneFig(`r = ${r}`,'',`l = ${l}`),
      hint:`Thay bán kính đáy và đường sinh vào công thức, giữ nguyên ${PI}.`,
      sol:`${tm(`S_{xq} = \\pi rl = \\pi\\cdot ${r}\\cdot ${l}`)}.<br>Vậy ${tb(`S_{xq} = ${r*l}\\pi`)} cm².`});
  }
  if(lv===2){
    if(pick([0,1])===0){
      return QB({text:`Một chiếc nón lá hình nón có bán kính đáy ${r} cm, chiều cao ${h} cm. Gọi ${tm('l')} là độ dài đường sinh, ta có ${tm('l^2 = r^2 + h^2')}. Cho biết ${tm('S_{xq} = \\pi rl')}. Tính diện tích phần lá phủ xung quanh nón (kết quả theo ${PI}).`,
        tpl:`${tm('S_{xq} =')} [_]${PI} cm²`, ans:[r*l], fig:coneFig(`r = ${r}`,`h = ${h}`,`l = ?`),
        hint:`Tính đường sinh ${tm('l')} bằng ${tm('l^2 = r^2 + h^2')} trước, rồi mới dùng công thức diện tích xung quanh.`,
        sol:`${tm(`l^2 = ${r}^2 + ${h}^2 = ${r*r} + ${h*h} = ${l*l}`)}, suy ra ${tm(`l = ${l}`)} cm.<br>${tm(`S_{xq} = \\pi rl = \\pi\\cdot ${r}\\cdot ${l} =`)} ${tb(`${r*l}\\pi`)} cm².`});
    }
    return QB({text:`Một đống cát hình nón có bán kính đáy ${r} m, đường sinh ${l} m. Gọi ${tm('h')} là chiều cao, ta có ${tm('l^2 = r^2 + h^2')}. Cho biết ${tm('V = \\dfrac{1}{3}\\pi r^2 h')}. Tính thể tích đống cát (kết quả theo ${PI}).`,
      tpl:`${tm('V =')} [_]${PI} m³`, ans:[r*r*h/3], fig:coneFig(`r = ${r}`,`h = ?`,`l = ${l}`),
      hint:`Tìm chiều cao ${tm('h')} từ ${tm('h^2 = l^2 - r^2')} trước, rồi tính thể tích.`,
      sol:`${tm(`h^2 = l^2 - r^2 = ${l}^2 - ${r}^2 = ${l*l} - ${r*r} = ${h*h}`)}, suy ra ${tm(`h = ${h}`)} m.<br>${tm(`V = \\dfrac{1}{3}\\pi r^2 h = \\dfrac{1}{3}\\pi\\cdot ${r*r}\\cdot ${h} =`)} ${tb(`${r*r*h/3}\\pi`)} m³.`});
  }
  if(pick([0,1])===0){
    return QB({text:`Một hình nón có bán kính đáy ${r} cm và diện tích xung quanh ${r*l}${PI} cm². Cho biết ${tm('S_{xq} = \\pi rl')}, ${tm('l^2 = r^2 + h^2')} và ${tm('V = \\dfrac{1}{3}\\pi r^2 h')}. Tính thể tích hình nón (kết quả theo ${PI}).`,
      tpl:`${tm('V =')} [_]${PI} cm³`, ans:[r*r*h/3],
      hint:`Từ diện tích xung quanh tìm đường sinh ${tm('l')}, sau đó tìm chiều cao ${tm('h')}, cuối cùng tính thể tích.`,
      sol:`${tm(`\\pi\\cdot ${r}\\cdot l = ${r*l}\\pi`)}, suy ra ${tm(`l = ${r*l} : ${r} = ${l}`)} cm.<br>${tm(`h^2 = l^2 - r^2 = ${l*l} - ${r*r} = ${h*h}`)}, suy ra ${tm(`h = ${h}`)} cm.<br>${tm(`V = \\dfrac{1}{3}\\pi\\cdot ${r*r}\\cdot ${h} =`)} ${tb(`${r*r*h/3}\\pi`)} cm³.`});
  }
  const k = R(2,4), big = pick([[216,3,4],[288,4,3]]), L = 5*k, n = big[0], rr = big[1]*k, hh = big[2]*k;
  return QB({text:`Một tấm bìa hình quạt có bán kính ${L} cm, góc ở tâm ${n}° được cuộn lại (hai mép khít nhau) thành mặt xung quanh của một chiếc phễu hình nón (không tính đáy). Cho biết độ dài cung tròn ${tm('n^\\circ')}, bán kính ${tm('l')} là ${tm('\\dfrac{\\pi l n}{180}')} và độ dài đó bằng chu vi đáy hình nón. Tính chiều cao của phễu.`,
    tpl:`${tm('h =')} [_] cm`, ans:[hh],
    hint:`Cho độ dài cung bằng chu vi đáy ${tm('2\\pi r')} để tìm bán kính đáy ${tm('r')}; đường sinh chính là bán kính hình quạt, rồi dùng ${tm('h^2 = l^2 - r^2')}.`,
    sol:`Độ dài cung: ${tm(`\\dfrac{\\pi\\cdot ${L}\\cdot ${n}}{180} = ${L*n/180}\\pi`)} cm.<br>Chu vi đáy: ${tm(`2\\pi r = ${L*n/180}\\pi`)}, suy ra ${tm(`r = ${rr}`)} cm.<br>Đường sinh ${tm(`l = ${L}`)} cm nên ${tm(`h^2 = ${L}^2 - ${rr}^2 = ${L*L} - ${rr*rr} = ${hh*hh}`)}.<br>${tm('h =')} ${tb(hh)} cm.`});
};

/* Dạng 3. Hình cầu */
const gHk3 = lv => {
  if(lv===1){
    if(pick([0,1])===0){
      const Rr = R(2,9);
      return QB({text:`Một quả bóng hình cầu có bán kính ${Rr} cm. Cho biết diện tích mặt cầu ${tm('S = 4\\pi R^2')}. Tính diện tích mặt ngoài của quả bóng (kết quả theo ${PI}).`,
        tpl:`${tm('S =')} [_]${PI} cm²`, ans:[4*Rr*Rr], fig:sphFig(`R = ${Rr}`),
        hint:`Bình phương bán kính rồi nhân với ${tm('4')}.`,
        sol:`${tm(`S = 4\\pi R^2 = 4\\pi\\cdot ${Rr}^2 = 4\\pi\\cdot ${Rr*Rr}`)}.<br>Vậy ${tb(`S = ${4*Rr*Rr}\\pi`)} cm².`});
    }
    const Rr = pick([3,6,9]);
    return QB({text:`Một bể chứa hình cầu có bán kính ${Rr} m. Cho biết thể tích hình cầu ${tm('V = \\dfrac{4}{3}\\pi R^3')}. Tính thể tích bể (kết quả theo ${PI}).`,
      tpl:`${tm('V =')} [_]${PI} m³`, ans:[4*Rr*Rr*Rr/3], fig:sphFig(`R = ${Rr}`),
      hint:`Tính ${tm('R^3')} trước, nhân với ${tm('4')} rồi chia cho ${tm('3')}.`,
      sol:`${tm(`V = \\dfrac{4}{3}\\pi R^3 = \\dfrac{4}{3}\\pi\\cdot ${Rr}^3 = \\dfrac{4}{3}\\pi\\cdot ${Rr*Rr*Rr}`)}.<br>Vậy ${tb(`V = ${4*Rr*Rr*Rr/3}\\pi`)} m³.`});
  }
  if(lv===2){
    if(pick([0,1])===0){
      const Rr = pick([3,6,9]);
      return QB({text:`Một mô hình quả địa cầu có diện tích mặt ngoài ${4*Rr*Rr}${PI} cm². Cho biết ${tm('S = 4\\pi R^2')} và ${tm('V = \\dfrac{4}{3}\\pi R^3')}. Tính thể tích mô hình (kết quả theo ${PI}).`,
        tpl:`${tm('V =')} [_]${PI} cm³`, ans:[4*Rr*Rr*Rr/3],
        hint:`Từ ${tm('S = 4\\pi R^2')} tìm bán kính ${tm('R')} trước, rồi mới tính thể tích.`,
        sol:`${tm(`4\\pi R^2 = ${4*Rr*Rr}\\pi`)}, suy ra ${tm(`R^2 = ${Rr*Rr}`)}, nên ${tm(`R = ${Rr}`)} cm.<br>${tm(`V = \\dfrac{4}{3}\\pi\\cdot ${Rr}^3 = \\dfrac{4}{3}\\pi\\cdot ${Rr*Rr*Rr} =`)} ${tb(`${4*Rr*Rr*Rr/3}\\pi`)} cm³.`});
    }
    const Rr = pick([3,6,9]), V = 4*Rr*Rr*Rr/3;
    return QB({text:`Một viên bi hình cầu có thể tích ${V}${PI} cm³. Cho biết ${tm('V = \\dfrac{4}{3}\\pi R^3')} và ${tm('S = 4\\pi R^2')}. Tính diện tích mặt ngoài của viên bi (kết quả theo ${PI}).`,
      tpl:`${tm('S =')} [_]${PI} cm²`, ans:[4*Rr*Rr],
      hint:`Từ thể tích suy ra ${tm('R^3')}, tìm ${tm('R')} (số mà lập phương bằng ${tm('R^3')}), sau đó tính diện tích.`,
      sol:`${tm(`\\dfrac{4}{3}\\pi R^3 = ${V}\\pi`)}, suy ra ${tm(`R^3 = \\dfrac{3\\cdot ${V}}{4} = ${Rr*Rr*Rr} = ${Rr}^3`)}, nên ${tm(`R = ${Rr}`)} cm.<br>${tm(`S = 4\\pi\\cdot ${Rr}^2 =`)} ${tb(`${4*Rr*Rr}\\pi`)} cm².`});
  }
  if(pick([0,1])===0){
    const [Rr, r, dh] = pick([[3,3,4],[3,6,1],[6,6,8],[6,12,2],[9,9,12],[9,18,3]]), V = 4*Rr*Rr*Rr/3;
    return QB({text:`Một bình thủy tinh hình trụ có bán kính đáy ${r} cm đang chứa nước. Thả chìm hoàn toàn một viên bi sắt hình cầu bán kính ${Rr} cm vào bình (nước không tràn ra ngoài). Cho biết ${tm('V_{\\text{cầu}} = \\dfrac{4}{3}\\pi R^3')} và ${tm('V_{\\text{trụ}} = \\pi r^2 h')}. Mực nước trong bình dâng thêm bao nhiêu centimet?`,
      tpl:`Mực nước dâng thêm: [_] cm`, ans:[dh],
      hint:`Thể tích nước dâng thêm trong bình trụ chính bằng thể tích viên bi: coi phần nước dâng là hình trụ bán kính ${r} cm, chiều cao ${tm('x')}.`,
      sol:`Thể tích viên bi: ${tm(`\\dfrac{4}{3}\\pi\\cdot ${Rr}^3 = ${V}\\pi`)} cm³.<br>Phần nước dâng thêm là hình trụ bán kính ${r} cm, chiều cao ${tm('x')}: ${tm(`\\pi\\cdot ${r}^2\\cdot x = ${V}\\pi`)}, tức ${tm(`${r*r}x = ${V}`)}.<br>${tm(`x = ${V} : ${r*r} =`)} ${tb(dh)} cm.`});
  }
  const k = pick([8,27]), c = k===8 ? 2 : 3, r = R(1,5), Rr = c*r;
  return QB({text:`Người ta nung chảy ${k} viên bi sắt hình cầu có cùng bán kính ${r} cm rồi đúc lại thành một viên bi lớn hình cầu (không hao hụt). Cho biết ${tm('V = \\dfrac{4}{3}\\pi R^3')}. Tính bán kính viên bi lớn.`,
    tpl:`${tm('R =')} [_] cm`, ans:[Rr],
    hint:`Thể tích sắt không đổi: thể tích viên bi lớn bằng ${k} lần thể tích một viên bi nhỏ. Rút gọn ${tm('\\dfrac{4}{3}\\pi')} ở hai vế.`,
    sol:`Thể tích ${k} viên nhỏ: ${tm(`${k}\\cdot\\dfrac{4}{3}\\pi\\cdot ${r}^3`)}; viên lớn: ${tm('\\dfrac{4}{3}\\pi R^3')}.<br>Hai thể tích bằng nhau nên ${tm(`R^3 = ${k}\\cdot ${r}^3 = ${k*r*r*r} = ${Rr}^3`)}.<br>Vậy ${tm('R =')} ${tb(Rr)} cm.`});
};

/* Dạng 4. Hình hộp, lăng trụ, hình chóp đều */
const PYR3 = [[3,4,5],[4,3,5],[6,8,10],[5,12,13],[12,5,13],[9,12,15],[12,9,15]];
const CUBE_OK = [[8,8,4,1],[4,8,4,2],[6,6,6,6],[9,8,6,3],[12,6,6,3],[12,18,6,1],[20,10,10,5],[25,20,10,2],[10,10,10,10]];
const gHk4 = lv => {
  if(lv===1){
    const a = R(4,12), b = R(3,9), c = R(3,8);
    if(pick([0,1])===0){
      return QB({text:`Một bể cá hình hộp chữ nhật có chiều dài ${a} dm, chiều rộng ${b} dm, chiều cao ${c} dm. Cho biết thể tích hình hộp chữ nhật ${tm('V = abc')} và ${tm('1\\ \\text{dm}^3 = 1')} lít. Bể chứa được tối đa bao nhiêu lít nước?`,
        tpl:`Thể tích: [_] lít`, ans:[a*b*c], fig:boxFig(`${a} dm`,`${b} dm`,`${c} dm`),
        hint:`Nhân ba kích thước (cùng đơn vị dm) để được thể tích tính bằng dm³, mỗi dm³ là một lít.`,
        sol:`${tm(`V = abc = ${a}\\cdot ${b}\\cdot ${c} = ${a*b*c}`)} dm³.<br>Vì ${tm('1\\ \\text{dm}^3 = 1')} lít nên bể chứa được ${tb(a*b*c)} lít nước.`});
    }
    return QB({text:`Một hộp quà hình hộp chữ nhật có chiều dài ${a} cm, chiều rộng ${b} cm, chiều cao ${c} cm. Cho biết diện tích toàn phần ${tm('S_{tp} = 2(ab + bc + ca)')}. Tính diện tích giấy gói vừa đủ bọc kín hộp (bỏ qua mép dán).`,
      tpl:`${tm('S_{tp} =')} [_] cm²`, ans:[2*(a*b+b*c+c*a)], fig:boxFig(`${a} cm`,`${b} cm`,`${c} cm`),
      hint:`Tính ba tích đôi một ${tm('ab,\\ bc,\\ ca')}, cộng lại rồi nhân với ${tm('2')}.`,
      sol:`${tm(`ab = ${a*b},\\ bc = ${b*c},\\ ca = ${c*a}`)}.<br>${tm(`S_{tp} = 2(${a*b} + ${b*c} + ${c*a}) = 2\\cdot ${a*b+b*c+c*a} =`)} ${tb(2*(a*b+b*c+c*a))} cm².`});
  }
  if(lv===2){
    if(pick([0,1])===0){
      const [hf,h] = pick(PYR3), a = 2*hf;
      return QB({text:`Một mô hình kim tự tháp là hình chóp tứ giác đều có cạnh đáy ${a} cm, chiều cao ${h} cm. Cho biết thể tích hình chóp ${tm('V = \\dfrac{1}{3}S_{\\text{đáy}}\\cdot h')}. Tính thể tích mô hình.`,
        tpl:`${tm('V =')} [_] cm³`, ans:[a*a*h/3], fig:pyrFig(`${a} cm`,`${h} cm`,''),
        hint:`Đáy là hình vuông cạnh ${a} cm nên ${tm('S_{\\text{đáy}} = a^2')}; nhân với chiều cao rồi chia ${tm('3')}.`,
        sol:`Diện tích đáy: ${tm(`S_{\\text{đáy}} = ${a}^2 = ${a*a}`)} cm².<br>${tm(`V = \\dfrac{1}{3}\\cdot ${a*a}\\cdot ${h} =`)} ${tb(a*a*h/3)} cm³.`});
    }
    let p, q, H; do{ p = R(2,9); q = R(2,9); H = R(3,10); }while((p*q*H)%2!==0);
    return QB({text:`Một chiếc lều có dạng lăng trụ đứng, đáy là tam giác vuông có hai cạnh góc vuông ${p} m và ${q} m, chiều dài lều (chiều cao lăng trụ) ${H} m. Cho biết thể tích lăng trụ ${tm('V = S_{\\text{đáy}}\\cdot h')}. Tính thể tích không khí trong lều.`,
      tpl:`${tm('V =')} [_] m³`, ans:[p*q*H/2],
      hint:`Diện tích đáy tam giác vuông bằng nửa tích hai cạnh góc vuông; nhân với chiều dài lều.`,
      sol:`Diện tích đáy: ${tm(`S_{\\text{đáy}} = \\dfrac{1}{2}\\cdot ${p}\\cdot ${q} = ${p*q/2}`)} m².<br>${tm(`V = S_{\\text{đáy}}\\cdot h = ${p*q/2}\\cdot ${H} =`)} ${tb(p*q*H/2)} m³.`});
  }
  if(pick([0,1])===0){
    const [hf,h,d] = pick(PYR3), a = 2*hf, g = pick([50,60,80,100,120]), S = 2*a*d;
    return QB({text:`Mái của một ngôi đình có dạng hình chóp tứ giác đều (không tính đáy) với cạnh đáy ${a} m và chiều cao ${h} m. Gọi ${tm('d')} là trung đoạn (đường cao của một mặt bên), ${tm('d')} là cạnh huyền của tam giác vuông có hai cạnh góc vuông là ${tm('h')} và nửa cạnh đáy. Cho biết ${tm('S_{xq} = p\\cdot d')} với ${tm('p')} là nửa chu vi đáy. Lợp mái giá ${g} nghìn đồng mỗi mét vuông, tính tiền lợp mái (đơn vị: nghìn đồng).`,
      tpl:`Chi phí: [_] nghìn đồng`, ans:[S*g], fig:pyrFig(`${a} m`,`${h} m`,'d'),
      hint:`Tìm trung đoạn ${tm('d')} bằng định lí Pythagore với hai cạnh góc vuông ${tm('h')} và ${tm('\\dfrac{a}{2}')}; nửa chu vi đáy là ${tm('2a')}; nhân diện tích với giá tiền.`,
      sol:`${tm(`d^2 = ${h}^2 + ${hf}^2 = ${h*h} + ${hf*hf} = ${d*d}`)}, suy ra ${tm(`d = ${d}`)} m.<br>Nửa chu vi đáy: ${tm(`p = 2a = ${2*a}`)} m. Diện tích mái: ${tm(`S_{xq} = ${2*a}\\cdot ${d} = ${S}`)} m².<br>Chi phí: ${tm(`${S}\\cdot ${g} =`)} ${tb(S*g)} nghìn đồng.`});
  }
  const [a,b,c,dh] = pick(CUBE_OK);
  return QB({text:`Một bể nước hình hộp chữ nhật có đáy là hình chữ nhật ${a} cm × ${b} cm, đang chứa nước. Thả chìm hoàn toàn một khối sắt hình lập phương cạnh ${c} cm vào bể (nước không tràn). Cho biết thể tích hình lập phương ${tm('V = c^3')}. Mực nước trong bể dâng thêm bao nhiêu centimet?`,
    tpl:`Mực nước dâng thêm: [_] cm`, ans:[dh],
    hint:`Nước dâng thêm chiếm một khối hộp có đáy ${a} cm × ${b} cm; thể tích khối đó bằng thể tích khối sắt.`,
    sol:`Thể tích khối sắt: ${tm(`V = ${c}^3 = ${c*c*c}`)} cm³.<br>Gọi ${tm('x')} (cm) là mực nước dâng thêm: ${tm(`${a}\\cdot ${b}\\cdot x = ${c*c*c}`)}, tức ${tm(`${a*b}x = ${c*c*c}`)}.<br>${tm(`x = ${c*c*c} : ${a*b} =`)} ${tb(dh)} cm.`});
};

/* Dạng 5. Hình ghép và bài toán thể tích */
const gHk5 = lv => {
  if(lv===1){
    const r = R(2,6), H = R(3,10), h2 = 3*R(1,4);
    return QB({text:`Một kho chứa thóc gồm phần thân hình trụ bán kính đáy ${r} m, chiều cao ${H} m và mái hình nón cùng bán kính đáy, chiều cao ${h2} m. Cho biết ${tm('V_{\\text{trụ}} = \\pi r^2 h')} và ${tm('V_{\\text{nón}} = \\dfrac{1}{3}\\pi r^2 h')}. Tính thể tích của kho (kết quả theo ${PI}).`,
      tpl:`${tm('V =')} [_]${PI} m³`, ans:[r*r*H + r*r*h2/3], fig:siloFig(`r = ${r}`,`${H} m`,`${h2} m`),
      hint:`Thể tích kho bằng thể tích phần trụ cộng thể tích phần nón.`,
      sol:`Phần trụ: ${tm(`\\pi\\cdot ${r}^2\\cdot ${H} = ${r*r*H}\\pi`)}.<br>Phần nón: ${tm(`\\dfrac{1}{3}\\pi\\cdot ${r}^2\\cdot ${h2} = ${r*r*h2/3}\\pi`)}.<br>${tm(`V = ${r*r*H}\\pi + ${r*r*h2/3}\\pi =`)} ${tb(`${r*r*H + r*r*h2/3}\\pi`)} m³.`});
  }
  if(lv===2){
    const r = pick([3,3,6]), h = R(4,12), v1 = r*r*h/3, v2 = 2*r*r*r/3;
    return QB({text:`Một chiếc kem ốc quế gồm phần ốc quế hình nón bán kính đáy ${r} cm, chiều cao ${h} cm và phần kem phía trên là nửa hình cầu bán kính ${r} cm (kem đầy ốc quế). Cho biết ${tm('V_{\\text{nón}} = \\dfrac{1}{3}\\pi r^2 h')} và ${tm('V_{\\text{cầu}} = \\dfrac{4}{3}\\pi R^3')}. Tính thể tích cả chiếc kem (kết quả theo ${PI}).`,
      tpl:`${tm('V =')} [_]${PI} cm³`, ans:[v1+v2], fig:iceFig(`r = ${r}`,`h = ${h}`),
      hint:`Nửa hình cầu có thể tích bằng một nửa thể tích hình cầu cùng bán kính; cộng với thể tích hình nón.`,
      sol:`Hình nón: ${tm(`\\dfrac{1}{3}\\pi\\cdot ${r}^2\\cdot ${h} = ${v1}\\pi`)}.<br>Nửa hình cầu: ${tm(`\\dfrac{1}{2}\\cdot\\dfrac{4}{3}\\pi\\cdot ${r}^3 = \\dfrac{2}{3}\\pi\\cdot ${r*r*r} = ${v2}\\pi`)}.<br>${tm(`V = ${v1}\\pi + ${v2}\\pi =`)} ${tb(`${v1+v2}\\pi`)} cm³.`});
  }
  if(pick([0,1])===0){
    const r = pick([3,6]), h = R(2,8), N = r*r*h + 4*r*r*r/3;
    return QB({text:`Một bồn chứa khí gồm phần giữa là hình trụ bán kính đáy ${r} m, chiều dài ${tm('h')} m, hai đầu là hai nửa hình cầu bán kính ${r} m. Thể tích cả bồn là ${N}${PI} m³. Cho biết ${tm('V_{\\text{trụ}} = \\pi r^2 h')} và ${tm('V_{\\text{cầu}} = \\dfrac{4}{3}\\pi R^3')}. Tính chiều dài ${tm('h')} của phần trụ.`,
      tpl:`${tm('h =')} [_] m`, ans:[h], fig:capFig(`r = ${r}`,'h = ?'),
      hint:`Hai nửa hình cầu ghép lại thành một hình cầu bán kính ${r} m; thể tích bồn bằng thể tích hình trụ cộng thể tích hình cầu đó.`,
      sol:`Hai nửa cầu ghép thành một hình cầu: ${tm(`\\dfrac{4}{3}\\pi\\cdot ${r}^3 = ${4*r*r*r/3}\\pi`)}.<br>Thể tích phần trụ: ${tm(`\\pi\\cdot ${r}^2\\cdot h = ${r*r}\\pi h`)}.<br>Theo đề: ${tm(`${r*r}\\pi h + ${4*r*r*r/3}\\pi = ${N}\\pi`)}, suy ra ${tm(`${r*r}h = ${N} - ${4*r*r*r/3} = ${r*r*h}`)}.<br>${tm('h =')} ${tb(h)} m.`});
  }
  const r = pick([3,6,9]), h = R(3,9), V = 2*r*r*h/3;
  return QB({text:`Từ một khối gỗ hình trụ bán kính đáy ${r} cm, chiều cao ${h} cm, người ta khoét bỏ một phần hình nón có cùng đáy và cùng chiều cao với khối trụ. Cho biết ${tm('V_{\\text{trụ}} = \\pi r^2 h')} và ${tm('V_{\\text{nón}} = \\dfrac{1}{3}\\pi r^2 h')}. Tính thể tích phần gỗ còn lại (kết quả theo ${PI}).`,
    tpl:`${tm('V =')} [_]${PI} cm³`, ans:[V],
    hint:`Phần còn lại bằng thể tích hình trụ trừ thể tích hình nón khoét đi.`,
    sol:`Hình trụ: ${tm(`\\pi\\cdot ${r}^2\\cdot ${h} = ${r*r*h}\\pi`)}.<br>Hình nón khoét: ${tm(`\\dfrac{1}{3}\\pi\\cdot ${r}^2\\cdot ${h} = ${r*r*h/3}\\pi`)}.<br>${tm(`V = ${r*r*h}\\pi - ${r*r*h/3}\\pi =`)} ${tb(`${V}\\pi`)} cm³.`});
};

lesson(6,'on-thi-hinh-khong-gian','Hình học 4. Hình không gian thực tế (công thức cho sẵn)','Ôn tuyển sinh: hình trụ; hình nón (kể cả hình quạt cuộn thành nón); hình cầu (thả vật, nung chảy); hình hộp, lăng trụ, chóp đều; hình ghép (kho, kem ốc quế, bồn chứa).',[gHk1,gHk2,gHk3,gHk4,gHk5], {intro:[
  {t:`Công thức thường cho sẵn trong đề`, b:`<ul><li>Hình trụ (bán kính đáy ${tm('r')}, chiều cao ${tm('h')}): ${tm('S_{xq} = 2\\pi rh')}; ${tm('S_{tp} = 2\\pi rh + 2\\pi r^2')}; ${tm('V = \\pi r^2 h')}.</li><li>Hình nón (đường sinh ${tm('l')}): ${tm('S_{xq} = \\pi rl')}; ${tm('V = \\dfrac{1}{3}\\pi r^2 h')}; ${tm('l^2 = r^2 + h^2')}.</li><li>Hình cầu: ${tm('S = 4\\pi R^2')}; ${tm('V = \\dfrac{4}{3}\\pi R^3')}.</li><li>Lăng trụ: ${tm('V = S_{\\text{đáy}}\\cdot h')}. Hình chóp: ${tm('V = \\dfrac{1}{3}S_{\\text{đáy}}\\cdot h')}; chóp đều ${tm('S_{xq} = p\\cdot d')} (${tm('p')} là nửa chu vi đáy, ${tm('d')} là trung đoạn).</li></ul>`, warn:`Đề cho công thức nhưng <b>không nhắc</b> đổi đơn vị: kiểm tra đề cho đường kính hay bán kính (${tm('r = \\dfrac{d}{2}')}), đường sinh ${tm('l')} hay chiều cao ${tm('h')} trước khi thay số.`, ex:`Trước khi tính, gạch chân và ghi ra giấy nháp các đại lượng ${tm('r,\\ h,\\ l')}; chỉ thay số sau khi chắc từng đại lượng đúng tên.`},
  {t:`Quy trình giải bài hình không gian thực tế`, b:`<ol><li>Xác định hình (hoặc các hình ghép) và đại lượng cần tính: diện tích hay thể tích.</li><li>Tìm đại lượng còn thiếu (đường sinh bằng Pythagore, bán kính từ diện tích hoặc thể tích).</li><li>Thay vào công thức, <b>giữ nguyên ${tm('\\pi')}</b> nếu đề cho kết quả theo ${tm('\\pi')}.</li><li>Đổi đơn vị: ${tm('1\\ \\text{dm}^3 = 1')} lít; ${tm('1\\ \\text{m}^3 = 1000')} lít.</li></ol>`, warn:`Diện tích tính bằng đơn vị bình phương (cm², m²), thể tích tính bằng đơn vị lập phương (cm³, m³); ghi sai đơn vị mất điểm. Hình ghép: cộng thể tích các phần, không cộng nhầm phần chung.`, ex:`Bài ngược (cho thể tích hay diện tích, tìm bán kính, chiều cao) chỉ là phương trình bậc nhất: thay số vào công thức rồi <b>rút gọn ${tm('\\pi')}</b> hai vế.`},
  {t:`Đổ nước, thả vật, nung chảy: thể tích không đổi`, b:`<ul><li>Đổ nước từ bình này sang bình khác: ${tm('V_{\\text{trước}} = V_{\\text{sau}}')}.</li><li>Thả chìm vật vào bình: thể tích nước dâng thêm = thể tích vật = (diện tích đáy bình) ${tm('\\times')} (mực nước dâng).</li><li>Nung chảy rồi đúc lại: tổng thể tích các phần cũ bằng thể tích vật mới.</li></ul>`, warn:`Mực nước dâng thêm tính bằng thể tích vật chia cho <b>diện tích đáy của bình</b> (không phải đáy của vật). Chỉ dùng được khi vật chìm hoàn toàn và nước không tràn.`, ex:`Viết ngay một phương trình “thể tích = thể tích” với ẩn là đại lượng cần tìm; ${tm('\\pi')} hoặc ${tm('\\dfrac{4}{3}\\pi')} ở hai vế thường rút gọn được.`}
]});
}


/* =====================================================================
   ÔN THI VÀO 10 – Đại số 6. Thực tế lập hệ phương trình (vận dụng cao)
   Dạng 1 mua hàng, vé, khuyến mãi · Dạng 2 số học, gà–thỏ, chuyển kho, chữ số
   Dạng 3 chuyển động (gặp nhau, xuôi–ngược dòng, đuổi kịp, đường nhựa–đường đất)
   Dạng 4 công việc – năng suất · Dạng 5 phần trăm, tăng–giảm, dung dịch
   Mọi hệ đều có nghiệm nguyên; lời giải dùng phương pháp cộng đại số, chia từng bước.
   ===================================================================== */
{
const heq = (a,b,c,vx='x',vy='y') => `${tpoly([a,vx],[b,vy])} = ${c}`;
const hdk = () => tm('x \\gt 0,\\ y \\gt 0');
/* Giải hệ hai phương trình bậc nhất hai ẩn bằng cộng đại số; trả về lời giải (HTML) và nghiệm */
const hSolve = (a1,b1,c1,a2,b2,c2,vx='x',vy='y') => {
  const mu = (u,v) => { const L = lcm(Math.abs(u),Math.abs(v)); return [L/Math.abs(u), L/Math.abs(v)]; };
  const [mx1,mx2] = mu(a1,a2), [my1,my2] = mu(b1,b2);
  const byX = (mx1+mx2) <= (my1+my2);
  const [p1,q1,p2,q2,vp,vq] = byX ? [a1,b1,a2,b2,vx,vy] : [b1,a1,b2,a2,vy,vx];
  const [m1,m2] = byX ? [mx1,mx2] : [my1,my2];
  const sub = (m1*p1 === m2*p2);
  const t1 = m1*q1, t2 = m2*q2, r1 = m1*c1, r2 = m2*c2;
  const Q = sub ? t1-t2 : t1+t2, RR = sub ? r1-r2 : r1+r2;
  if(!Q || RR % Q) throw new Error('hSolve: nghiệm không nguyên');
  const vqv = RR/Q, N = c1 - q1*vqv;
  if(N % p1) throw new Error('hSolve: nghiệm không nguyên');
  const vpv = N/p1, X = byX ? vpv : vqv, Y = byX ? vqv : vpv;
  const lines = [`Giải hệ phương trình: ${td(tsys([heq(a1,b1,c1,vx,vy), heq(a2,b2,c2,vx,vy)], true))}`];
  if(m1===1 && m2===1) lines.push(`Hệ số của ${tm(vp)} ở hai phương trình ${sub?'bằng nhau':'đối nhau'}, nên ta ${sub?'trừ':'cộng'} vế theo vế (1) và (2).`);
  else {
    const nh = m1!==1 && m2!==1 ? `Nhân hai vế của (1) với ${m1} và hai vế của (2) với ${m2}` : m1!==1 ? `Nhân hai vế của (1) với ${m1}` : `Nhân hai vế của (2) với ${m2}`;
    lines.push(`${nh} để hệ số của ${tm(vp)} ${sub?'bằng nhau':'đối nhau'}: ${td(tsys([heq(m1*a1,m1*b1,m1*c1,vx,vy), heq(m2*a2,m2*b2,m2*c2,vx,vy)], true))}`);
    lines.push(`${sub?'Trừ':'Cộng'} vế theo vế hai phương trình vừa nhận được.`);
  }
  lines.push(`${tm(`(${t1} ${sub?'-':'+'} ${tp(t2)})${vq} = ${r1} ${sub?'-':'+'} ${tp(r2)}`)}, tức ${tm(`${tpoly([Q,vq])} = ${RR}`)}, suy ra ${tm(`${vq} = ${Q===1?RR:`${RR} : ${tp(Q)}`} = ${vqv}`)}.`);
  const pc = p1===1 ? '' : p1===-1 ? '-' : String(p1);
  lines.push(`Thay ${tm(`${vq} = ${vqv}`)} vào (1): ${tm(`${pc}${vp} = ${c1} - ${tp(q1)}\\cdot ${tp(vqv)} = ${N}`)}, suy ra ${tm(`${vp} = ${p1===1?N:`${N} : ${tp(p1)}`} = ${vpv}`)}.`);
  lines.push(`Hệ có nghiệm ${tm(`${vx} = ${X}`)}, ${tm(`${vy} = ${Y}`)}.`);
  return {txt: lines.join('<br>'), X, Y};
};
const hChk = (r, X, Y) => { if(r.X !== X || r.Y !== Y) throw new Error(`hSolve lệch nghiệm: ${r.X},${r.Y} ≠ ${X},${Y}`); return r.txt; };
const hDet = (a1,b1,a2,b2) => a1*b2 - a2*b1;

/* Dạng 1. Mua hàng, vé, khuyến mãi */
const gHe1 = lv => {
  if(lv===1){
    let a1,b1,a2,b2; do{ a1=R(1,5); b1=R(1,5); a2=R(2,6); b2=R(1,6); }while(hDet(a1,b1,a2,b2)===0);
    const p = R(3,12), q = R(8,25), S1 = a1*p+b1*q, S2 = a2*p+b2*q, askQ = R(0,1)===1;
    const r = hSolve(a1,b1,S1,a2,b2,S2);
    return QB({text:`Bạn Lan mua ${a1} cái bút và ${b1} quyển vở hết ${S1} nghìn đồng. Bạn Mai mua ${a2} cái bút và ${b2} quyển vở cùng loại hết ${S2} nghìn đồng. Tính giá tiền một ${askQ?'quyển vở':'cái bút'}.`,
      tpl:`Giá một ${askQ?'quyển vở':'cái bút'}: [_] nghìn đồng`, ans:[askQ?q:p],
      hint:`Gọi ${tm('x')} là giá một cái bút, ${tm('y')} là giá một quyển vở. Mỗi lần mua cho một phương trình “số lượng × giá + số lượng × giá = tổng tiền”; giải hệ hai phương trình.`,
      sol:`Gọi ${tm('x')}, ${tm('y')} (nghìn đồng, ${hdk()}) lần lượt là giá một cái bút và một quyển vở.<br>Lan mua: ${tm(heq(a1,b1,S1))} (1). Mai mua: ${tm(heq(a2,b2,S2))} (2).<br>${hChk(r,p,q)}<br>Cả hai giá trị đều dương, thỏa điều kiện. Giá một ${askQ?'quyển vở':'cái bút'} là ${tb(askQ?q:p)} nghìn đồng.`});
  }
  if(lv===2){
    let a1,b1,a2,b2; do{ a1=R(2,9); b1=R(2,9); a2=R(2,9); b2=R(2,9); }while(hDet(a1,b1,a2,b2)===0);
    const x = pick([40,45,50,60,70,80,90]), y = pick([20,25,30,35,40]), c = R(2,4), d = R(1,4), S1 = a1*x+b1*y, S2 = a2*x+b2*y, T = c*x+d*y;
    const r = hSolve(a1,b1,S1,a2,b2,S2);
    return QB({text:`Một rạp chiếu phim bán vé người lớn và vé trẻ em. Buổi sáng bán ${a1} vé người lớn và ${b1} vé trẻ em, thu ${S1} nghìn đồng; buổi chiều bán ${a2} vé người lớn và ${b2} vé trẻ em, thu ${S2} nghìn đồng (giá vé không đổi). Một gia đình mua ${c} vé người lớn và ${d} vé trẻ em thì phải trả bao nhiêu nghìn đồng?`,
      tpl:`Số tiền phải trả: [_] nghìn đồng`, ans:[T],
      hint:`Đừng vội trả lời: trước hết tìm giá một vé người lớn ${tm('x')} và giá một vé trẻ em ${tm('y')} bằng hệ phương trình, sau đó mới tính tiền của gia đình.`,
      sol:`Gọi ${tm('x')}, ${tm('y')} (nghìn đồng, ${hdk()}) lần lượt là giá một vé người lớn và một vé trẻ em.<br>Buổi sáng: ${tm(heq(a1,b1,S1))} (1). Buổi chiều: ${tm(heq(a2,b2,S2))} (2).<br>${hChk(r,x,y)}<br>Giá vé người lớn ${x} nghìn đồng, vé trẻ em ${y} nghìn đồng.<br>Gia đình phải trả: ${tm(`${c}\\cdot ${x} + ${d}\\cdot ${y} = ${c*x} + ${d*y} =`)} ${tb(T)} nghìn đồng.`});
  }
  let a,b,c,d,x,y,S2,S1;
  do{ a=R(1,4); b=R(1,4); c=R(1,4); d=R(1,4); x=R(5,20)*10; y=R(5,30)*5; }while(hDet(a,b,9*c,8*d)===0);
  S2 = a*x + b*y; S1 = (9*c*x + 8*d*y)/10;
  const askA = R(0,1)===1, r = hSolve(a,b,S2,9*c,8*d,10*S1);
  return QB({text:`Một cửa hàng bán hai mặt hàng ${tm('A')} và ${tm('B')}. Theo giá niêm yết, mua ${a} món ${tm('A')} và ${b} món ${tm('B')} hết ${S2} nghìn đồng. Trong tuần khuyến mãi, món ${tm('A')} được giảm 10%, món ${tm('B')} được giảm 20% so với giá niêm yết; khi đó mua ${c} món ${tm('A')} và ${d} món ${tm('B')} hết ${S1} nghìn đồng. Tính giá niêm yết của một món ${tm(askA?'A':'B')} (nghìn đồng).`,
    tpl:`Giá niêm yết món ${tm(askA?'A':'B')}: [_] nghìn đồng`, ans:[askA?x:y],
    hint:`Gọi ${tm('x')}, ${tm('y')} là giá niêm yết của một món ${tm('A')}, ${tm('B')}. Giảm 10% thì giá mới bằng 90% giá cũ; giảm 20% thì bằng 80%. Lập phương trình cho từng cách mua, rồi nhân hai vế để bỏ số thập phân.`,
    sol:`Gọi ${tm('x')}, ${tm('y')} (nghìn đồng, ${hdk()}) lần lượt là giá niêm yết một món ${tm('A')}, ${tm('B')}.<br>Giá niêm yết: ${tm(heq(a,b,S2))} (1).<br>Khuyến mãi: món ${tm('A')} còn 90% giá, tức ${tm('0{,}9x')}; món ${tm('B')} còn 80% giá, tức ${tm('0{,}8y')}. Ta có ${tm(`${c}\\cdot 0{,}9x + ${d}\\cdot 0{,}8y = ${S1}`)}. Nhân hai vế với 10: ${tm(heq(9*c,8*d,10*S1))} (2).<br>${hChk(r,x,y)}<br>Giá niêm yết một món ${tm(askA?'A':'B')} là ${tb(askA?x:y)} nghìn đồng.`});
};

/* Dạng 2. Số học, gà – thỏ, chuyển kho, chữ số */
const gHe2 = lv => {
  if(lv===1){
    const cx = R(8,40), cy = R(5,30), S = cx+cy, C = 2*cx+4*cy, askY = R(0,1)===1;
    const r = hSolve(1,1,S,2,4,C);
    return QB({text:`Một bãi giữ xe có xe máy (2 bánh) và ô tô (4 bánh). Tổng số xe là ${S} chiếc và tổng số bánh xe là ${C} bánh. Hỏi bãi có bao nhiêu ${askY?'ô tô':'xe máy'}?`,
      tpl:`Số ${askY?'ô tô':'xe máy'}: [_] chiếc`, ans:[askY?cy:cx],
      hint:`Gọi ${tm('x')} là số xe máy, ${tm('y')} là số ô tô. Một phương trình theo tổng số xe, một phương trình theo tổng số bánh.`,
      sol:`Gọi ${tm('x')}, ${tm('y')} (chiếc, nguyên dương) lần lượt là số xe máy và số ô tô.<br>Tổng số xe: ${tm(heq(1,1,S))} (1). Tổng số bánh: ${tm(heq(2,4,C))} (2).<br>${hChk(r,cx,cy)}<br>Các giá trị đều nguyên dương, thỏa đề. Bãi có ${tb(askY?cy:cx)} ${askY?'ô tô':'xe máy'}.`});
  }
  if(lv===2){
    const k = pick([2,3]), t = R(10,30), x = R(80,200), y = k*(x-t) - t, S = x+y, askA = R(0,1)===1;
    const r = hSolve(1,1,S,k,-1,(k+1)*t);
    return QB({text:`Hai kho gạo ${tm('A')} và ${tm('B')} chứa tất cả ${S} tấn gạo. Nếu chuyển ${t} tấn từ kho ${tm('A')} sang kho ${tm('B')} thì lượng gạo ở kho ${tm('B')} gấp ${k} lần lượng gạo còn lại ở kho ${tm('A')}. Hỏi lúc đầu kho ${tm(askA?'A':'B')} chứa bao nhiêu tấn gạo?`,
      tpl:`Kho ${tm(askA?'A':'B')}: [_] tấn`, ans:[askA?x:y],
      hint:`Gọi ${tm('x')}, ${tm('y')} là lượng gạo lúc đầu của kho ${tm('A')}, ${tm('B')}. Sau khi chuyển: kho ${tm('A')} còn ${tm('x - '+t)}, kho ${tm('B')} có ${tm('y + '+t)}; lập phương trình từ quan hệ “gấp ${k} lần”.`,
      sol:`Gọi ${tm('x')}, ${tm('y')} (tấn, ${hdk()}) là lượng gạo lúc đầu của kho ${tm('A')}, ${tm('B')}.<br>Tổng cộng: ${tm(heq(1,1,S))} (1).<br>Sau khi chuyển ${t} tấn: kho ${tm('A')} còn ${tm(`x - ${t}`)}, kho ${tm('B')} có ${tm(`y + ${t}`)}. Theo đề: ${tm(`y + ${t} = ${k}(x - ${t})`)}, tức ${tm(`${k}x - y = ${k+1}\\cdot ${t} = ${(k+1)*t}`)} (2).<br>${hChk(r,x,y)}<br>Kho ${tm(askA?'A':'B')} lúc đầu chứa ${tb(askA?x:y)} tấn gạo.`});
  }
  if(R(0,1)===0){
    let a,b; do{ a=R(1,9); b=R(1,9); }while(a===b);
    const S = a+b, N = 10*a+b, up = b > a, dd = 9*Math.abs(b-a), e2 = up ? [-1,1,b-a] : [1,-1,a-b];
    const r = hSolve(1,1,S,e2[0],e2[1],e2[2]);
    return QB({text:`Một số tự nhiên có hai chữ số, tổng hai chữ số bằng ${S}. Nếu đổi chỗ hai chữ số cho nhau thì được số mới ${up?'lớn':'nhỏ'} hơn số ban đầu ${dd} đơn vị. Tìm số ban đầu.`,
      tpl:`Số ban đầu: [_]`, ans:[N],
      hint:`Gọi ${tm('x')} là chữ số hàng chục, ${tm('y')} là chữ số hàng đơn vị; số ban đầu là ${tm('10x + y')}, số mới là ${tm('10y + x')}. Lập hai phương trình rồi giải hệ.`,
      sol:`Gọi ${tm('x')} (hàng chục, ${tm('1 \\le x \\le 9')}) và ${tm('y')} (hàng đơn vị, ${tm('1 \\le y \\le 9')}) là các chữ số; số ban đầu là ${tm('10x + y')}, số mới là ${tm('10y + x')}.<br>Tổng hai chữ số: ${tm(heq(1,1,S))} (1).<br>Số mới ${up?'lớn':'nhỏ'} hơn số cũ ${dd} đơn vị: ${tm(up?`(10y + x) - (10x + y) = ${dd}`:`(10x + y) - (10y + x) = ${dd}`)}, tức ${tm(up?`9y - 9x = ${dd}`:`9x - 9y = ${dd}`)}. Chia hai vế cho 9: ${tm(heq(e2[0],e2[1],e2[2]))} (2).<br>${hChk(r,a,b)}<br>Các chữ số thỏa điều kiện nên số ban đầu là ${tm(`10\\cdot ${a} + ${b} =`)} ${tb(N)}.`});
  }
  const y = R(8,40), q = pick([2,3,4,5]), rr = R(1,y-1), x = q*y + rr, S = x + y;
  const r = hSolve(1,1,S,1,-q,rr);
  return QB({text:`Tìm hai số tự nhiên, biết tổng của chúng bằng ${S} và khi chia số lớn cho số bé thì được thương là ${q} và số dư là ${rr}. Tìm số lớn.`,
    tpl:`Số lớn: [_]`, ans:[x],
    hint:`Gọi số lớn là ${tm('x')}, số bé là ${tm('y')}. Phép chia có dư: số bị chia = số chia × thương + số dư (số dư nhỏ hơn số chia).`,
    sol:`Gọi ${tm('x')}, ${tm('y')} (số tự nhiên) là số lớn và số bé.<br>Tổng: ${tm(heq(1,1,S))} (1).<br>Chia ${tm('x')} cho ${tm('y')} được thương ${q}, dư ${rr}: ${tm(`x = ${q}y + ${rr}`)}, tức ${tm(heq(1,-q,rr))} (2).<br>${hChk(r,x,y)}<br>Kiểm tra: số dư ${rr} nhỏ hơn số chia ${y} nên thỏa. Số lớn là ${tb(x)}.`});
};

/* Dạng 3. Chuyển động */
const HE_CHASE = []; for(let x=22;x<=70;x++) for(let y=8;y<x;y++){ const s1=x+y, s2=x-y, L=lcm(s1,s2), t1=L/s1, t2=L/s2; if(t1>=1 && t1<=5 && t2>=2 && t2<=10 && t1!==t2 && L>=120 && L<=480) HE_CHASE.push([x,y,t1,t2,L]); }
const gHe3 = lv => {
  if(lv===1){
    const x = R(40,70), y = R(30,x-5), t = pick([2,3,4]), s = t*(x+y), d = x-y;
    const r = hSolve(t,t,s,1,-1,d);
    return QB({text:`Hai ô tô khởi hành cùng lúc từ hai địa điểm ${tm('A')} và ${tm('B')} cách nhau ${s} km, đi ngược chiều nhau và gặp nhau sau ${t} giờ. Biết vận tốc ô tô đi từ ${tm('A')} lớn hơn vận tốc ô tô đi từ ${tm('B')} ${d} km/h. Tính vận tốc ô tô đi từ ${tm('A')} (km/h).`,
      tpl:`Vận tốc ô tô từ ${tm('A')}: [_] km/h`, ans:[x],
      hint:`Gọi ${tm('x')}, ${tm('y')} là vận tốc hai ô tô. Khi đi ngược chiều và gặp nhau, tổng quãng đường hai xe đã đi bằng ${tm('AB')}.`,
      sol:`Gọi ${tm('x')}, ${tm('y')} (km/h, ${hdk()}) là vận tốc ô tô đi từ ${tm('A')}, ${tm('B')}.<br>Sau ${t} giờ hai xe đi được ${tm(`${t}x`)} km và ${tm(`${t}y`)} km; gặp nhau nên ${tm(heq(t,t,s))} (1).<br>Vận tốc xe ${tm('A')} lớn hơn xe ${tm('B')} ${d} km/h: ${tm(heq(1,-1,d))} (2).<br>${hChk(r,x,y)}<br>Vận tốc ô tô từ ${tm('A')} là ${tb(x)} km/h.`});
  }
  if(lv===2){
    const x = R(20,40), y = R(2,6), t1 = R(2,5), t2 = R(2,5), s1 = t1*(x+y), s2 = t2*(x-y), askY = R(0,1)===1;
    const r = hSolve(t1,t1,s1,t2,-t2,s2);
    return QB({text:`Một ca nô chạy xuôi dòng ${t1} giờ được ${s1} km, rồi chạy ngược dòng ${t2} giờ được ${s2} km. Coi vận tốc riêng của ca nô và vận tốc dòng nước không đổi. Tính vận tốc ${askY?'dòng nước':'riêng của ca nô'} (km/h).`,
      tpl:`Vận tốc ${askY?'dòng nước':'riêng của ca nô'}: [_] km/h`, ans:[askY?y:x],
      hint:`Gọi ${tm('x')} là vận tốc riêng của ca nô, ${tm('y')} là vận tốc dòng nước. Xuôi dòng: vận tốc ${tm('x + y')}; ngược dòng: vận tốc ${tm('x - y')}. Quãng đường = vận tốc × thời gian.`,
      sol:`Gọi ${tm('x')} (km/h) là vận tốc riêng của ca nô, ${tm('y')} (km/h) là vận tốc dòng nước; ${tm('x \\gt y \\gt 0')}.<br>Xuôi dòng vận tốc ${tm('x + y')}: ${tm(`${t1}(x + y) = ${s1}`)}, tức ${tm(heq(t1,t1,s1))} (1).<br>Ngược dòng vận tốc ${tm('x - y')}: ${tm(`${t2}(x - y) = ${s2}`)}, tức ${tm(heq(t2,-t2,s2))} (2).<br>${hChk(r,x,y)}<br>Thỏa ${tm('x \\gt y \\gt 0')}. Vận tốc ${askY?'dòng nước':'riêng của ca nô'} là ${tb(askY?y:x)} km/h.`});
  }
  if(R(0,1)===0){
    const [x,y,t1,t2,s] = pick(HE_CHASE);
    const r = hSolve(t1,t1,s,t2,-t2,s);
    return QB({text:`Hai xe máy xuất phát cùng lúc từ ${tm('A')} và ${tm('B')} cách nhau ${s} km. Nếu hai xe đi ngược chiều nhau thì sau ${t1} giờ gặp nhau; nếu hai xe cùng đi theo chiều từ ${tm('A')} đến ${tm('B')} thì sau ${t2} giờ xe từ ${tm('A')} đuổi kịp xe từ ${tm('B')}. Tính vận tốc của xe đi từ ${tm('A')} (km/h).`,
      tpl:`Vận tốc xe từ ${tm('A')}: [_] km/h`, ans:[x],
      hint:`Gọi ${tm('x')}, ${tm('y')} là vận tốc xe từ ${tm('A')}, ${tm('B')}. Đi ngược chiều: quãng đường hai xe đi cộng lại bằng ${tm('AB')}. Đi cùng chiều: quãng đường xe ${tm('A')} đi hơn xe ${tm('B')} đúng bằng ${tm('AB')}.`,
      sol:`Gọi ${tm('x')}, ${tm('y')} (km/h, ${tm('x \\gt y \\gt 0')}) là vận tốc xe từ ${tm('A')}, ${tm('B')}.<br>Ngược chiều, sau ${t1} giờ gặp nhau: ${tm(`${t1}x + ${t1}y = ${s}`)} (1).<br>Cùng chiều, sau ${t2} giờ xe ${tm('A')} đuổi kịp xe ${tm('B')} nên xe ${tm('A')} đi nhiều hơn xe ${tm('B')} đúng ${s} km: ${tm(`${t2}x - ${t2}y = ${s}`)} (2).<br>${hChk(r,x,y)}<br>Thỏa ${tm('x \\gt y \\gt 0')}. Vận tốc xe từ ${tm('A')} là ${tb(x)} km/h.`});
  }
  const v1 = pick([40,45,48,50,60]), v2 = pick([20,24,25,30]), a1 = R(1,4), a2 = R(1,4), x = v1*a1, y = v2*a2, S = x+y, T = a1+a2, L = lcm(v1,v2);
  const r = hSolve(1,1,S,L/v1,L/v2,L*T);
  return QB({text:`Quãng đường ${tm('AB')} dài ${S} km gồm một đoạn đường nhựa và một đoạn đường đất. Ô tô đi trên đường nhựa với vận tốc ${v1} km/h, trên đường đất với vận tốc ${v2} km/h và đi từ ${tm('A')} đến ${tm('B')} hết ${T} giờ. Tính độ dài đoạn đường đất (km).`,
    tpl:`Đoạn đường đất: [_] km`, ans:[y],
    hint:`Lần này ẩn là <b>quãng đường</b>: gọi ${tm('x')} là đoạn đường nhựa, ${tm('y')} là đoạn đường đất. Thời gian đi mỗi đoạn là quãng đường : vận tốc; tổng hai thời gian bằng ${T} giờ. Nhân hai vế với bội chung của hai vận tốc để bỏ mẫu.`,
    sol:`Gọi ${tm('x')}, ${tm('y')} (km, ${hdk()}) lần lượt là độ dài đoạn đường nhựa và đoạn đường đất.<br>Tổng quãng đường: ${tm(heq(1,1,S))} (1).<br>Thời gian đi đoạn nhựa ${tm(`\\dfrac{x}{${v1}}`)} giờ, đoạn đất ${tm(`\\dfrac{y}{${v2}}`)} giờ; tổng ${T} giờ: ${tm(`\\dfrac{x}{${v1}} + \\dfrac{y}{${v2}} = ${T}`)}. Nhân hai vế với ${L} (là bội chung của ${v1} và ${v2}): ${tm(heq(L/v1,L/v2,L*T))} (2).<br>${hChk(r,x,y)}<br>Đoạn đường đất dài ${tb(y)} km.`});
};

/* Dạng 4. Công việc – năng suất */
const HE_JOB = []; for(let x=4;x<=40;x++) for(let y=x+1;y<=60;y++){ if((x*y)%(x+y)) continue; const T = x*y/(x+y); if(T<2 || T>30) continue; for(let m=2;m<x;m++){ const num = y*(x-m); if(num % x) continue; const n = num/x; if(n>=2 && n!==m) HE_JOB.push([x,y,T,m,n]); } }
const gHe4 = lv => {
  if(lv===1){
    const x = R(10,30), y = R(5,x-2), a = pick([2,3,4,5]), S = a*(x+y), d = x-y;
    const r = hSolve(a,a,S,1,-1,d);
    return QB({text:`Hai công nhân cùng làm trong ${a} giờ thì được ${S} sản phẩm. Mỗi giờ người thứ nhất làm nhiều hơn người thứ hai ${d} sản phẩm. Hỏi mỗi giờ người thứ nhất làm được bao nhiêu sản phẩm?`,
      tpl:`Người thứ nhất: [_] sản phẩm/giờ`, ans:[x],
      hint:`Gọi ${tm('x')}, ${tm('y')} là số sản phẩm mỗi giờ của hai người. Trong ${a} giờ, mỗi người làm được (số sản phẩm mỗi giờ) × ${a}.`,
      sol:`Gọi ${tm('x')}, ${tm('y')} (sản phẩm/giờ, ${hdk()}) là năng suất của người thứ nhất, thứ hai.<br>Cùng làm ${a} giờ: ${tm(heq(a,a,S))} (1).<br>Người thứ nhất làm nhiều hơn ${d} sản phẩm mỗi giờ: ${tm(heq(1,-1,d))} (2).<br>${hChk(r,x,y)}<br>Người thứ nhất mỗi giờ làm ${tb(x)} sản phẩm.`});
  }
  if(lv===2){
    let a1,b1,a2,b2; do{ a1=R(2,6); b1=R(1,6); a2=R(1,6); b2=R(2,7); }while(hDet(a1,b1,a2,b2)===0);
    const x = R(8,25), y = R(6,25), S1 = a1*x+b1*y, S2 = a2*x+b2*y, askA = R(0,1)===1;
    const r = hSolve(a1,b1,S1,a2,b2,S2);
    return QB({text:`Máy ${tm('A')} làm ${a1} giờ và máy ${tm('B')} làm ${b1} giờ thì được ${S1} sản phẩm. Nếu máy ${tm('A')} làm ${a2} giờ và máy ${tm('B')} làm ${b2} giờ thì được ${S2} sản phẩm. Hỏi mỗi giờ máy ${tm(askA?'A':'B')} làm được bao nhiêu sản phẩm? (Năng suất mỗi máy không đổi.)`,
      tpl:`Máy ${tm(askA?'A':'B')}: [_] sản phẩm/giờ`, ans:[askA?x:y],
      hint:`Gọi ${tm('x')}, ${tm('y')} là số sản phẩm mỗi giờ của máy ${tm('A')}, ${tm('B')}. Số sản phẩm = năng suất × số giờ; lập hệ từ hai lần làm việc.`,
      sol:`Gọi ${tm('x')}, ${tm('y')} (sản phẩm/giờ, ${hdk()}) là năng suất của máy ${tm('A')}, ${tm('B')}.<br>Lần thứ nhất: ${tm(heq(a1,b1,S1))} (1). Lần thứ hai: ${tm(heq(a2,b2,S2))} (2).<br>${hChk(r,x,y)}<br>Máy ${tm(askA?'A':'B')} mỗi giờ làm ${tb(askA?x:y)} sản phẩm.`});
  }
  const [x,y,T,m,n] = pick(HE_JOB), num = n - T, den = T*(n-m), g = gcd(Math.abs(num),Math.abs(den)), pn = Math.abs(num)/g, pd = Math.abs(den)/g;
  if(pn !== 1 || pd !== x) throw new Error('gHe4: sai năng suất');
  return QB({text:`Hai đội công nhân cùng làm chung một công việc thì sau ${T} ngày xong. Nếu đội thứ nhất làm một mình ${m} ngày, sau đó đội thứ hai làm tiếp một mình ${n} ngày thì cũng xong công việc. Hỏi nếu làm một mình thì đội thứ nhất cần bao nhiêu ngày để xong công việc?`,
    tpl:`Đội thứ nhất: [_] ngày`, ans:[x],
    hint:`Gọi ${tm('x')}, ${tm('y')} là số ngày mỗi đội làm một mình xong việc; một ngày hai đội làm được ${tm('\\dfrac{1}{x}')} và ${tm('\\dfrac{1}{y}')} công việc. Hãy đặt ${tm('u = \\dfrac{1}{x}')}, ${tm('v = \\dfrac{1}{y}')} để được hệ bậc nhất.`,
    sol:`Gọi ${tm('x')}, ${tm('y')} (ngày, ${hdk()}) là thời gian đội thứ nhất, thứ hai làm một mình xong công việc. Mỗi ngày hai đội làm được ${tm('u = \\dfrac{1}{x}')} và ${tm('v = \\dfrac{1}{y}')} công việc.<br>Làm chung ${T} ngày xong: ${tm(`${T}(u + v) = 1`)}, tức ${tm(`${T}u + ${T}v = 1`)} (1).<br>Đội 1 làm ${m} ngày, đội 2 làm ${n} ngày xong: ${tm(`${m}u + ${n}v = 1`)} (2).<br>Nhân (1) với ${n}, nhân (2) với ${T}: ${td(tsys([`${n*T}u + ${n*T}v = ${n}`, `${m*T}u + ${n*T}v = ${T}`], true))}Trừ vế theo vế: ${tm(`${T*(n-m)}u = ${n} - ${T} = ${n-T}`)}, suy ra ${tm(`u = ${tf(Math.abs(num),Math.abs(den))} = ${tf(1,x)}`)}.<br>Vậy ${tm(`x = ${x}`)}. Từ (1): ${tm(`v = ${tf(1,T)} - ${tf(1,x)} = ${tf(1,y)}`)}, nên ${tm(`y = ${y}`)} (cả hai đều dương).<br>Đội thứ nhất làm một mình xong sau ${tb(x)} ngày.`});
};

/* Dạng 5. Phần trăm, tăng – giảm, dung dịch */
const gHe5 = lv => {
  if(lv===1){
    let p1,p2; do{ p1 = pick([5,10,15,20,25,30]); p2 = pick([5,10,15,20,25,30]); }while(p1===p2);
    const x = R(5,20)*20, y = R(5,20)*20, S = x+y, V = (p1*x + p2*y)/100, S2 = S + V, askA = R(0,1)===1;
    const r = hSolve(1,1,S,p1,p2,100*V);
    return QB({text:`Tháng trước hai tổ sản xuất được tất cả ${S} sản phẩm. Tháng này tổ I vượt mức ${p1}%, tổ II vượt mức ${p2}% so với tháng trước nên cả hai tổ làm được ${S2} sản phẩm. Hỏi tháng trước tổ ${askA?'I':'II'} sản xuất được bao nhiêu sản phẩm?`,
      tpl:`Tổ ${askA?'I':'II'}: [_] sản phẩm`, ans:[askA?x:y],
      hint:`Gọi ${tm('x')}, ${tm('y')} là số sản phẩm tháng trước của tổ I, II. Số sản phẩm tăng thêm của tổ I là ${p1}% của ${tm('x')}, của tổ II là ${p2}% của ${tm('y')}; tổng số tăng thêm bằng ${S2} − ${S}.`,
      sol:`Gọi ${tm('x')}, ${tm('y')} (sản phẩm, ${hdk()}) là số sản phẩm tháng trước của tổ I, II.<br>Tháng trước: ${tm(heq(1,1,S))} (1).<br>Số sản phẩm tăng thêm ở tháng này: ${tm(`${S2} - ${S} = ${V}`)}. Tổ I tăng ${tm(`\\dfrac{${p1}}{100}x`)}, tổ II tăng ${tm(`\\dfrac{${p2}}{100}y`)}: ${tm(`\\dfrac{${p1}}{100}x + \\dfrac{${p2}}{100}y = ${V}`)}. Nhân hai vế với 100: ${tm(heq(p1,p2,100*V))} (2).<br>${hChk(r,x,y)}<br>Tháng trước tổ ${askA?'I':'II'} sản xuất ${tb(askA?x:y)} sản phẩm.`});
  }
  if(lv===2){
    let p1,p2,x,y,D; do{ p1 = pick([4,5,6,8,10]); p2 = pick([3,4,5,6,8]); x = R(5,25)*20; y = R(5,25)*20; D = p1*x - p2*y; }while(D===0 || p1===p2);
    const S = x+y, V = D/100, S2 = S + V, askA = R(0,1)===1;
    const r = hSolve(1,1,S,p1,-p2,D);
    return QB({text:`Năm ngoái hai trường ${tm('A')} và ${tm('B')} có tất cả ${S} học sinh dự thi. Năm nay số học sinh dự thi của trường ${tm('A')} tăng ${p1}% còn trường ${tm('B')} giảm ${p2}% so với năm ngoái, nên cả hai trường có ${S2} học sinh dự thi. Hỏi năm ngoái trường ${tm(askA?'A':'B')} có bao nhiêu học sinh dự thi?`,
      tpl:`Trường ${tm(askA?'A':'B')}: [_] học sinh`, ans:[askA?x:y],
      hint:`Gọi ${tm('x')}, ${tm('y')} là số học sinh dự thi năm ngoái của trường ${tm('A')}, ${tm('B')}. Phần tăng của ${tm('A')} là ${p1}% của ${tm('x')}, phần giảm của ${tm('B')} là ${p2}% của ${tm('y')}; hiệu của hai phần này bằng ${S2} − ${S}.`,
      sol:`Gọi ${tm('x')}, ${tm('y')} (học sinh, ${hdk()}) là số học sinh dự thi năm ngoái của trường ${tm('A')}, ${tm('B')}.<br>Năm ngoái: ${tm(heq(1,1,S))} (1).<br>Tổng số thay đổi: ${tm(`${S2} - ${S} = ${V}`)}. Trường ${tm('A')} tăng ${tm(`\\dfrac{${p1}}{100}x`)}, trường ${tm('B')} giảm ${tm(`\\dfrac{${p2}}{100}y`)}: ${tm(`\\dfrac{${p1}}{100}x - \\dfrac{${p2}}{100}y = ${V}`)}. Nhân hai vế với 100: ${tm(heq(p1,-p2,D))} (2).<br>${hChk(r,x,y)}<br>Năm ngoái trường ${tm(askA?'A':'B')} có ${tb(askA?x:y)} học sinh dự thi.`});
  }
  let p1,p3,p2; do{ p1 = pick([5,10,15,20]); p3 = p1 + pick([5,10,15]); p2 = p3 + pick([5,10,15]); }while(p2>40);
  const t = R(2,6), x = (p2-p3)*t, y = (p3-p1)*t, M = x+y, askA = R(0,1)===1;
  const r = hSolve(1,1,M,p1,p2,p3*M);
  return QB({text:`Người ta trộn dung dịch muối nồng độ ${p1}% với dung dịch muối nồng độ ${p2}% để được ${M} kg dung dịch muối nồng độ ${p3}%. Hỏi phải dùng bao nhiêu kg dung dịch nồng độ ${askA?p1:p2}%?`,
    tpl:`Dung dịch ${askA?p1:p2}%: [_] kg`, ans:[askA?x:y],
    hint:`Gọi ${tm('x')}, ${tm('y')} là khối lượng hai dung dịch cần trộn. Một phương trình theo tổng khối lượng; một phương trình theo <b>khối lượng muối nguyên chất</b> (khối lượng dung dịch × nồng độ), muối trước khi trộn bằng muối sau khi trộn.`,
    sol:`Gọi ${tm('x')}, ${tm('y')} (kg, ${hdk()}) là khối lượng dung dịch nồng độ ${p1}% và ${p2}% cần dùng.<br>Tổng khối lượng: ${tm(heq(1,1,M))} (1).<br>Khối lượng muối: ${tm(`\\dfrac{${p1}}{100}x + \\dfrac{${p2}}{100}y = \\dfrac{${p3}}{100}\\cdot ${M}`)}. Nhân hai vế với 100: ${tm(heq(p1,p2,p3*M))} (2).<br>${hChk(r,x,y)}<br>Cần dùng ${tb(askA?x:y)} kg dung dịch nồng độ ${askA?p1:p2}%.`});
};

lesson(6,'on-thi-he-phuong-trinh-thuc-te','Đại số 6. Thực tế lập hệ phương trình (vận dụng cao)','Ôn tuyển sinh: lập hệ từ bài toán mua hàng, vé, khuyến mãi; số học, chuyển kho, chữ số; chuyển động (gặp nhau, xuôi – ngược dòng, đuổi kịp); công việc – năng suất; phần trăm, tăng – giảm, dung dịch.',[gHe1,gHe2,gHe3,gHe4,gHe5], {intro:[
  {t:`Các bước giải bài toán bằng cách lập hệ phương trình`, b:`<ol><li><b>Chọn hai ẩn</b> ${tm('x,\\ y')}, ghi đơn vị và điều kiện (dương, nguyên, ${tm('x \\gt y')}…).</li><li>Biểu diễn các đại lượng liên quan theo ${tm('x,\\ y')}.</li><li><b>Lập hai phương trình</b> từ <b>hai dữ kiện khác nhau</b> của đề.</li><li>Giải hệ bằng phương pháp thế hoặc cộng đại số.</li><li><b>Đối chiếu điều kiện</b>, kết luận đúng đại lượng đề hỏi, kèm đơn vị.</li></ol>`, warn:`Hai ẩn cần <b>hai phương trình độc lập</b>: không dùng một dữ kiện hai lần. Hay mất điểm khi kết luận ${tm('x')} trong khi đề hỏi ${tm('y')} (hoặc hỏi một đại lượng tính từ ${tm('x,\\ y')}), và khi quên điều kiện của ẩn.`, ex:`Chọn ẩn là hai đại lượng đề yêu cầu tìm thì lập hệ nhanh nhất. Giải xong, thử lại vào <b>cả hai</b> dữ kiện của đề trong 10 giây.`},
  {t:`Giải hệ bằng cộng đại số`, b:`<ul><li>Nhân hai vế để hệ số của một ẩn ở hai phương trình <b>bằng nhau</b> (rồi trừ vế) hoặc <b>đối nhau</b> (rồi cộng vế).</li><li>Tìm được một ẩn, <b>thay vào một phương trình</b> để tìm ẩn còn lại.</li><li>Phần trăm: tăng ${tm('p\\%')} thì phần tăng là ${tm('\\dfrac{p}{100}\\cdot\\text{gốc}')}; nồng độ: khối lượng chất tan = khối lượng dung dịch × nồng độ.</li></ul>`, warn:`Sai dấu khi trừ vế theo vế là lỗi tính toán phổ biến nhất: viết rõ ${tm('(a - b)y = c - d')} và đặt ngoặc khi trừ số âm. Nhân hệ số thập phân thì nhân <b>cả hai vế</b> (ví dụ nhân 10 hoặc 100) để bỏ số thập phân.`, ex:`Máy tính cầm tay giải được hệ hai ẩn, dùng để kiểm tra nghiệm nhưng bài thi vẫn phải trình bày phép giải.`},
  {t:`Các dạng chuyển động và công việc hay gặp`, b:`<ul><li>Hai xe đi <b>ngược chiều</b> gặp nhau: ${tm('S = (v_1 + v_2)t')}. Đi <b>cùng chiều</b>, xe nhanh đuổi kịp: ${tm('S = (v_1 - v_2)t')}.</li><li>Ca nô: xuôi dòng ${tm('v + u')}, ngược dòng ${tm('v - u')}.</li><li>Bài có hai đoạn đường với hai vận tốc: ẩn là <b>quãng đường</b> mỗi đoạn.</li><li>Công việc: làm một mình xong trong ${tm('x')} ngày thì mỗi ngày làm ${tm('\\dfrac{1}{x}')} việc; đặt ${tm('u = \\dfrac{1}{x}')}, ${tm('v = \\dfrac{1}{y}')} để hệ trở thành bậc nhất.</li></ul>`, warn:`Với bài công việc, nếu đặt ẩn là thời gian rồi cộng phân thức thì hệ không còn bậc nhất. Phải <b>đặt ẩn phụ</b> ${tm('u,\\ v')} rồi giải, <b>đừng quên đổi lại</b> ${tm('x = \\dfrac{1}{u}')}.`, ex:`Xác định rõ “ngược chiều” (cộng vận tốc) hay “cùng chiều” (trừ vận tốc) trước khi viết phương trình, và đổi cùng đơn vị giờ – phút, km – m.`}
]});
}

/* =====================================================================
   ÔN THI TUYỂN SINH VÀO LỚP 10 – HÌNH HỌC 7a. CHỨNG MINH: BỐN ĐIỂM CÙNG THUỘC ĐƯỜNG TRÒN, SONG SONG, VUÔNG GÓC, HỆ THỨC
   ===================================================================== */
{
const m = tm, hv = s => `\\widehat{${s}}`;
const dirH = (p, q) => Math.atan2(q[1]-p[1], q[0]-p[0])*180/Math.PI;
const rightH = (A, P, Q) => { const a1 = dirH(A, P), a2 = dirH(A, Q); return [A[0], A[1], Math.abs(((a2-a1+540)%360)-180-90) < 1 ? a1 : a2]; };
const footH = (X, P, Q) => { const dx = Q[0]-P[0], dy = Q[1]-P[1], t = ((X[0]-P[0])*dx + (X[1]-P[1])*dy)/(dx*dx + dy*dy); return [P[0]+t*dx, P[1]+t*dy]; };
const meetH = (P1, P2, P3, P4) => { const d1 = [P2[0]-P1[0], P2[1]-P1[1]], d2 = [P4[0]-P3[0], P4[1]-P3[1]], den = d1[0]*d2[1] - d1[1]*d2[0], t = ((P3[0]-P1[0])*d2[1] - (P3[1]-P1[1])*d2[0])/den; return [P1[0]+t*d1[0], P1[1]+t*d1[1]]; };
const A7 = [2, 5.2], B7 = [0, 0], C7 = [6, 0];
const D7 = footH(B7, A7, C7), E7 = footH(C7, A7, B7), H7 = meetH(B7, D7, C7, E7), F7 = footH(A7, B7, C7);

/* Tam giác nhọn ABC, hai đường cao BD, CE cắt nhau tại H; o.circ = 'BC' | 'AH' vẽ đường tròn đường kính tương ứng; o.af vẽ AF vuông góc BC */
const ortho7 = (o = {}) => {
  const C = [];
  if(o.circ === 'BC') C.push({x:3, y:0, r:3, lab:'M'});
  if(o.circ === 'AH'){ const N = [(A7[0]+H7[0])/2, (A7[1]+H7[1])/2]; C.push({x:N[0], y:N[1], r:Math.hypot(A7[0]-H7[0], A7[1]-H7[1])/2, lab:'N'}); }
  const S = [[...A7,...B7],[...A7,...C7],[...B7,...C7],[...B7,...D7],[...C7,...E7]];
  if(o.af) S.push([...A7,...F7,true]);
  if(o.def) S.push([...E7,...F7,true],[...D7,...F7,true]);
  if(o.md) S.push([3,0,...E7,true],[3,0,...D7,true]);
  if(o.mn) S.push([...E7,3,0,true],[(A7[0]+H7[0])/2,(A7[1]+H7[1])/2,3,0,true],[(A7[0]+H7[0])/2,(A7[1]+H7[1])/2,...E7,true]);
  const P = [[...A7,'A',90],[...B7,'B',-135],[...C7,'C',-45],[...D7,'D',20],[...E7,'E',160],[...H7,'H',-100]];
  if(o.af || o.def) P.push([...F7,'F',-90]);
  if(o.mn) P.push([3,0,'M',-60]);
  const right = [rightH(D7,B7,A7), rightH(E7,C7,A7)];
  if(o.af || o.def) right.push(rightH(F7,A7,C7));
  if(o.mn) right.push(rightH(E7,[(A7[0]+H7[0])/2,(A7[1]+H7[1])/2],[3,0]));
  return circleSVG({C, P, S, right});
};

/* Đường tròn ngoại tiếp tam giác ABC, tiếp tuyến d tại A, đoạn DE */
const tan7 = () => {
  const a2 = A7[0]**2 + A7[1]**2, b2 = B7[0]**2 + B7[1]**2, c2 = C7[0]**2 + C7[1]**2;
  const dd = 2*(A7[0]*(B7[1]-C7[1]) + B7[0]*(C7[1]-A7[1]) + C7[0]*(A7[1]-B7[1]));
  const O = [(a2*(B7[1]-C7[1]) + b2*(C7[1]-A7[1]) + c2*(A7[1]-B7[1]))/dd, (a2*(C7[0]-B7[0]) + b2*(A7[0]-C7[0]) + c2*(B7[0]-A7[0]))/dd];
  const r = Math.hypot(A7[0]-O[0], A7[1]-O[1]), dir = [-(A7[1]-O[1]), A7[0]-O[0]];
  return circleSVG({C:[{x:O[0], y:O[1], r, lab:'O'}],
    P:[[...A7,'A',90],[...B7,'B',-135],[...C7,'C',-45],[...D7,'D',20],[...E7,'E',160]],
    S:[[...A7,...B7],[...A7,...C7],[...B7,...C7],[...B7,...D7,true],[...C7,...E7,true],[...D7,...E7]],
    L:[[A7[0], A7[1], A7[0]+dir[0], A7[1]+dir[1], 'd']]});
};

const quad7 = () => {
  const pt = t => [3*Math.cos(t*Math.PI/180), 3*Math.sin(t*Math.PI/180)];
  const A = pt(140), B = pt(220), C = pt(320), D = pt(40);
  return circleSVG({C:[{x:0, y:0, r:3, lab:'O', lp:14}], P:[[...A,'A',140],[...B,'B',220],[...C,'C',320],[...D,'D',40]],
    S:[[...A,...B],[...B,...C],[...C,...D],[...D,...A],[...A,...C,true],[...B,...D,true]]});
};

const head7 = `Cho tam giác nhọn ${m('ABC')} có hai đường cao ${m('BD')} và ${m('CE')} cắt nhau tại ${m('H')} (${m('D \\in AC')}, ${m('E \\in AB')}).`;
const tanHead7 = `Tam giác nhọn ${m('ABC')} nội tiếp đường tròn ${m('(O)')}; ${m('d')} là tiếp tuyến của ${m('(O)')} tại ${m('A')}, ${m('Ax')} là tia của ${m('d')} nằm trên nửa mặt phẳng bờ ${m('AB')} không chứa ${m('C')}; ${m('BD \\perp AC')}, ${m('CE \\perp AB')} (${m('D \\in AC')}, ${m('E \\in AB')}).`;

/* Dạng 1. Bốn điểm cùng thuộc một đường tròn (hai góc vuông cùng nhìn một đoạn) */
const CFG7 = [
  {pts:'B, C, D, E', p:['B','C','D','E'], dia:'BC', other:'AH', circ:'BC', mid:'M', r1:'D', t1:'BDC', r2:'E', t2:'BEC', ang:'\\widehat{BDC} = \\widehat{BEC} = 90^\\circ'},
  {pts:'A, E, H, D', p:['A','H','E','D'], dia:'AH', other:'BC', circ:'AH', mid:'N', r1:'E', t1:'AEH', r2:'D', t2:'ADH', ang:'\\widehat{AEH} = \\widehat{ADH} = 90^\\circ'}
];
const gHa1 = lv => {
  const c = pick(CFG7), fig = ortho7({circ:c.circ});
  if(lv === 1){
    const good = `đường tròn đường kính ${m(c.dia)}`;
    return QC({text:`${head7} Vì ${m(c.ang)} nên bốn điểm ${m(c.pts)} cùng thuộc đường tròn nào?`, fig,
      opts:[good, `đường tròn đường kính ${m(c.other)}`, `đường tròn đường kính ${m('DE')}`, `đường tròn tâm ${m('A')} bán kính ${m('AH')}`], ans:good,
      hint:'Trong tam giác vuông, trung điểm cạnh huyền cách đều ba đỉnh. Hãy tìm cạnh huyền chung của hai tam giác vuông.',
      sol:`Hai tam giác vuông ${m(c.t1)} (vuông tại ${m(c.r1)}) và ${m(c.t2)} (vuông tại ${m(c.r2)}) có chung cạnh huyền ${m(c.dia)}. Trung điểm ${m(c.mid)} của ${m(c.dia)} cách đều bốn điểm, nên bốn điểm thuộc <b>đường tròn đường kính ${m(c.dia)}</b>.`});
  }
  const k = R(3, 12);
  if(lv === 2){
    const askR = R(0, 1) === 0;
    return QB({text:askR ? `${head7} Biết ${m(`${c.dia} = ${2*k}`)} cm. Tính bán kính của đường tròn đi qua bốn điểm ${m(c.pts)}.`
                         : `${head7} Đường tròn đi qua bốn điểm ${m(c.pts)} có bán kính ${m(`${k}`)} cm. Tính độ dài ${m(c.dia)}.`,
      tpl:askR ? `${m('R =')} [_] cm` : `${m(c.dia + ' =')} [_] cm`, ans:[askR ? k : 2*k], fig,
      hint:'Bốn điểm cùng thuộc đường tròn có đường kính là cạnh huyền chung của hai tam giác vuông; bán kính bằng nửa đường kính.',
      sol:`Vì ${m(c.ang)} nên ${m(c.pts)} cùng thuộc đường tròn đường kính ${m(c.dia)}.<br>${askR ? `${m(`R = \\dfrac{${c.dia}}{2} = \\dfrac{${2*k}}{2} =`)} ${tb(k)} cm.` : `${m(`${c.dia} = 2R = 2\\cdot ${k} =`)} ${tb(2*k)} cm.`}`});
  }
  const [P, Q, X, Y] = c.p, M = c.mid, half = s => m(`\\dfrac{1}{2}${s}`);
  const mkOpts = () => [half(c.dia), m(c.dia), m(`2${c.dia}`), m(`\\dfrac{1}{3}${c.dia}`)];
  const good3 = `${m(`${M}${P} = ${M}${Q} = ${M}${X} = ${M}${Y}`)}, nên bốn điểm cùng thuộc đường tròn tâm ${m(M)}`;
  return QS({direct:true, fig,
    text:`${head7} Gọi ${m(M)} là trung điểm của ${m(c.dia)}. Biết ${m(`${c.dia} = ${2*k}`)} cm. Tính bán kính đường tròn đi qua bốn điểm ${m(c.pts)}.`,
    hint:`Chứng minh bốn điểm cách đều ${m(M)} (trung tuyến ứng với cạnh huyền).`,
    steps:[
      {tag:'Trung tuyến thứ nhất', ask:`Tam giác ${m(c.t1)} vuông tại ${m(c.r1)} có ${m(M + c.r1)} là trung tuyến ứng với cạnh huyền ${m(c.dia)}. Khi đó ${m(M + c.r1)} bằng`, opts:mkOpts(), ans:half(c.dia),
        hint:'Trong tam giác vuông, trung tuyến ứng với cạnh huyền bằng nửa cạnh huyền.'},
      {tag:'Trung tuyến thứ hai', ask:`Tương tự, tam giác ${m(c.t2)} vuông tại ${m(c.r2)} có ${m(M + c.r2)} là trung tuyến ứng với cạnh huyền ${m(c.dia)}. Khi đó ${m(M + c.r2)} bằng`, opts:mkOpts(), ans:half(c.dia),
        hint:'Cùng lập luận như bước trước.'},
      {tag:'Kết luận', ask:`Kết luận nào đúng?`, opts:[good3, `${m(`${M}${P} = ${M}${Q}`)} nhưng ${m(X + ',\\ ' + Y)} thẳng hàng với ${m(M)}`, `${m(M)} là trọng tâm của tứ giác`, `${m(`${M}${X} \\gt ${M}${Y}`)} nên không cùng đường tròn`], ans:good3,
        hint:`${m(M + P)} và ${m(M + Q)} cũng bằng nửa ${m(c.dia)}.`},
      {tag:'Tính bán kính', ask:`Với ${m(`${c.dia} = ${2*k}`)} cm, bán kính đường tròn tâm ${m(M)} là`, tpl:`${m('R =')} [_] cm`, ans:[k], hint:'Bán kính là khoảng cách từ tâm đến một điểm trên đường tròn.'}
    ],
    sol:`Trong tam giác vuông ${m(c.t1)}: ${m(`${M}${X} = \\dfrac{1}{2}${c.dia}`)}; trong tam giác vuông ${m(c.t2)}: ${m(`${M}${Y} = \\dfrac{1}{2}${c.dia}`)}. Lại có ${m(`${M}${P} = ${M}${Q} = \\dfrac{1}{2}${c.dia}`)}. Vậy ${m(c.pts)} cách đều ${m(M)} một khoảng ${m(`\\dfrac{${2*k}}{2}`)} = ${tb(k)} cm, tức là cùng thuộc đường tròn tâm ${m(M)}, bán kính ${tb(k)} cm.`});
};

/* Dạng 2. Tứ giác nội tiếp: tính góc */
const gHa2 = lv => {
  const fig = quad7();
  if(lv === 1){
    const al = R(12, 24)*5, p = pick([['BAD','BCD'],['ABC','ADC'],['BCD','BAD'],['ADC','ABC']]);
    return QB({text:`Tứ giác ${m('ABCD')} nội tiếp đường tròn ${m('(O)')}. Biết ${m(`${hv(p[0])} = ${al}^\\circ`)}. Tính ${m(hv(p[1]))}.`, fig,
      tpl:`${m(hv(p[1]) + ' =')} [_]${m('^\\circ')}`, ans:[180-al],
      hint:'Trong tứ giác nội tiếp, hai góc đối có tổng số đo bằng 180°.',
      sol:`${m(hv(p[0]))} và ${m(hv(p[1]))} là hai góc đối của tứ giác nội tiếp nên ${m(`${hv(p[0])} + ${hv(p[1])} = 180^\\circ`)}.<br>${m(`${hv(p[1])} = 180^\\circ - ${al}^\\circ =`)} ${tb(`${180-al}^\\circ`)}.`});
  }
  if(lv === 2){
    const g = R(5, 12)*5, b = R(5, 13)*5;
    return QB({text:`Tứ giác ${m('ABCD')} nội tiếp đường tròn ${m('(O)')}, hai đường chéo ${m('AC, BD')}. Biết ${m(`${hv('BAC')} = ${g}^\\circ`)} và ${m(`${hv('ABD')} = ${b}^\\circ`)}. Tính ${m(hv('BDC'))} và ${m(hv('ACD'))}.`, fig,
      tpl:`${m(hv('BDC') + ' =')} [_]${m('^\\circ')} &nbsp; ${m(hv('ACD') + ' =')} [_]${m('^\\circ')}`, ans:[g, b],
      hint:'Hai góc nội tiếp cùng chắn một cung thì bằng nhau. Xác định mỗi góc chắn cung nào.',
      sol:`${m(hv('BAC'))} và ${m(hv('BDC'))} là hai góc nội tiếp cùng chắn cung ${m('BC')} nên ${m(`${hv('BDC')} = ${hv('BAC')} =`)} ${tb(`${g}^\\circ`)}.<br>${m(hv('ABD'))} và ${m(hv('ACD'))} là hai góc nội tiếp cùng chắn cung ${m('AD')} nên ${m(`${hv('ACD')} = ${hv('ABD')} =`)} ${tb(`${b}^\\circ`)}.`});
  }
  const al = R(14, 20)*5, b = R(5, 10)*5;
  return QB({text:`Tứ giác ${m('ABCD')} nội tiếp đường tròn ${m('(O)')}, hai đường chéo ${m('AC, BD')}. Biết ${m(`${hv('BAD')} = ${al}^\\circ`)} và ${m(`${hv('ABD')} = ${b}^\\circ`)}. Tính ${m(hv('ACB'))} và ${m(hv('BCD'))}.`, fig,
    tpl:`${m(hv('ACB') + ' =')} [_]${m('^\\circ')} &nbsp; ${m(hv('BCD') + ' =')} [_]${m('^\\circ')}`, ans:[180-al-b, 180-al],
    hint:'Tam giác ABD cho góc ADB; góc ACB và góc ADB cùng chắn một cung. Góc BCD đối với góc BAD.',
    sol:`Tam giác ${m('ABD')}: ${m(`${hv('ADB')} = 180^\\circ - ${al}^\\circ - ${b}^\\circ = ${180-al-b}^\\circ`)}.<br>${m(hv('ACB'))} và ${m(hv('ADB'))} là hai góc nội tiếp cùng chắn cung ${m('AB')} nên ${m(`${hv('ACB')} =`)} ${tb(`${180-al-b}^\\circ`)}.<br>${m(hv('BCD'))} và ${m(hv('BAD'))} là hai góc đối của tứ giác nội tiếp nên ${m(`${hv('BCD')} = 180^\\circ - ${al}^\\circ =`)} ${tb(`${180-al}^\\circ`)}.`});
};

/* Dạng 3. Chứng minh hai đường thẳng song song */
const gHa3 = lv => {
  if(lv === 1){
    const goods = ['hai góc so le trong bằng nhau', 'hai góc đồng vị bằng nhau', 'hai góc trong cùng phía bù nhau'];
    const bads = ['hai góc so le trong bù nhau', 'hai góc đồng vị bù nhau', 'hai góc trong cùng phía bằng nhau', 'hai góc kề bù'];
    const good = pick(goods), opts = [good, ...bads.slice().sort(() => Math.random() - .5).slice(0, 3)];
    return QC({text:`Hai đường thẳng ${m('a, b')} bị cắt bởi đường thẳng ${m('c')}. Điều kiện nào <b>đủ</b> để kết luận ${m('a \\parallel b')}?`, opts, ans:good,
      hint:'Nhớ lại ba dấu hiệu nhận biết hai đường thẳng song song ở lớp 7.',
      sol:`Dấu hiệu song song: hai góc so le trong bằng nhau, hoặc hai góc đồng vị bằng nhau, hoặc hai góc trong cùng phía bù nhau. Đáp án: <b>${good}</b>.`});
  }
  const g = R(8, 13)*5, fig = tan7();
  if(lv === 2)
    return QB({text:`${tanHead7} Biết ${m(`${hv('ACB')} = ${g}^\\circ`)}. Tính ${m(hv('xAB'))} và ${m(hv('BED'))}.`, fig,
      tpl:`${m(hv('xAB') + ' =')} [_]${m('^\\circ')} &nbsp; ${m(hv('BED') + ' =')} [_]${m('^\\circ')}`, ans:[g, 180-g],
      hint:'Góc tạo bởi tiếp tuyến và dây cung bằng góc nội tiếp chắn cung đó. Tứ giác BCDE nội tiếp (đường kính BC): hai góc đối bù nhau.',
      sol:`Góc tạo bởi tiếp tuyến ${m('Ax')} và dây ${m('AB')} bằng góc nội tiếp chắn cung ${m('AB')}: ${m(`${hv('xAB')} = ${hv('ACB')} =`)} ${tb(`${g}^\\circ`)}.<br>${m(`${hv('BDC')} = ${hv('BEC')} = 90^\\circ`)} nên ${m('B, C, D, E')} thuộc đường tròn đường kính ${m('BC')}. Trong tứ giác nội tiếp ${m('BCDE')}: ${m(`${hv('BED')} + ${hv('BCD')} = 180^\\circ`)}, mà ${m(`${hv('BCD')} = ${hv('ACB')} = ${g}^\\circ`)} nên ${m(`${hv('BED')} = 180^\\circ - ${g}^\\circ =`)} ${tb(`${180-g}^\\circ`)}.<br>Suy ra ${m(`${hv('AED')} = 180^\\circ - ${hv('BED')} = ${g}^\\circ = ${hv('xAB')}`)}: hai góc so le trong bằng nhau, nên ${m('d \\parallel DE')}.`});
  const g1 = m(hv('ACB'));
  return QS({direct:true, fig,
    text:`${tanHead7} Chứng minh ${m('d \\parallel DE')} rồi tính ${m(hv('BED'))}, biết ${m(`${hv('ACB')} = ${g}^\\circ`)}.`,
    hint:'Chứng minh hai góc so le trong cùng bằng góc ACB.',
    steps:[
      {tag:'Tứ giác BCDE', ask:`${m('B, C, D, E')} thuộc đường tròn đường kính ${m('BC')} (vì ${m(`${hv('BDC')} = ${hv('BEC')} = 90^\\circ`)}). Khi đó ${m(hv('AED'))} bằng góc nào?`, opts:[g1, m(hv('ABC')), m(hv('BAC')), m(hv('BDE'))], ans:g1,
        hint:`${m(hv('AED'))} và ${m(hv('ACB'))} cùng bù với ${m(hv('BED'))}.`},
      {tag:'Tiếp tuyến – dây', ask:`Vì ${m('d')} tiếp xúc với ${m('(O)')} tại ${m('A')}, góc ${m(hv('xAB'))} bằng góc nào?`, opts:[g1, m(hv('ABC')), m(hv('BAC')), m(hv('AOB'))], ans:g1,
        hint:'Góc tạo bởi tiếp tuyến và dây cung bằng góc nội tiếp chắn cung đó.'},
      {tag:'Song song', ask:`Vậy ${m(`${hv('xAB')} = ${hv('AED')}`)}; hai góc này ở vị trí nào đối với cát tuyến ${m('AB')}?`, opts:['so le trong', 'đồng vị', 'trong cùng phía', 'kề bù'], ans:'so le trong',
        hint:'Hai góc nằm ở hai phía khác nhau của cát tuyến, ở trong hai đường thẳng.'},
      {tag:'Tính góc', ask:`Với ${m(`${hv('ACB')} = ${g}^\\circ`)}, tính ${m(hv('BED'))}.`, tpl:`${m(hv('BED') + ' =')} [_]${m('^\\circ')}`, ans:[180-g], hint:`${m(hv('BED'))} kề bù với ${m(hv('AED'))}.`}
    ],
    sol:`${m(`${hv('AED')} = ${hv('ACB')}`)} (cùng bù với ${m(hv('BED'))} trong tứ giác nội tiếp ${m('BCDE')}); ${m(`${hv('xAB')} = ${hv('ACB')}`)} (tiếp tuyến – dây cung). Vậy ${m(`${hv('xAB')} = ${hv('AED')}`)}, hai góc so le trong nên ${m('d \\parallel DE')}. ${m(`${hv('BED')} = 180^\\circ - ${g}^\\circ =`)} ${tb(`${180-g}^\\circ`)}.`});
};

/* Dạng 4. Chứng minh vuông góc, trực tâm */
const gHa4 = lv => {
  if(lv === 1){
    const al = R(5, 14)*5;
    return QB({text:`${head7} Biết ${m(`${hv('BAC')} = ${al}^\\circ`)}. Tính ${m(hv('BHC'))}.`, fig:ortho7(),
      tpl:`${m(hv('BHC') + ' =')} [_]${m('^\\circ')}`, ans:[180-al],
      hint:`Xét tứ giác AEHD có hai góc vuông; ${m(hv('BHC'))} đối đỉnh với ${m(hv('EHD'))}.`,
      sol:`Tứ giác ${m('AEHD')} có ${m(`${hv('AEH')} = ${hv('ADH')} = 90^\\circ`)} nên ${m(`${hv('EHD')} = 360^\\circ - 90^\\circ - 90^\\circ - ${al}^\\circ = ${180-al}^\\circ`)}.<br>${m(hv('BHC'))} và ${m(hv('EHD'))} là hai góc đối đỉnh nên ${m(`${hv('BHC')} =`)} ${tb(`${180-al}^\\circ`)}.`});
  }
  const b = R(10, 15)*5, g = R(10, 15)*5, al = 180 - b - g;
  if(lv === 2)
    return QB({text:`${head7} Tia ${m('AH')} cắt ${m('BC')} tại ${m('F')}. Biết ${m(`${hv('ABC')} = ${b}^\\circ`)} và ${m(`${hv('ACB')} = ${g}^\\circ`)}. Tính ${m(hv('BAF'))} và ${m(hv('CAF'))}.`, fig:ortho7({af:true}),
      tpl:`${m(hv('BAF') + ' =')} [_]${m('^\\circ')} &nbsp; ${m(hv('CAF') + ' =')} [_]${m('^\\circ')}`, ans:[90-b, 90-g],
      hint:`Ba đường cao của tam giác đồng quy tại H nên ${m('AF')} cũng là đường cao. Dùng tam giác vuông ${m('ABF')}, ${m('ACF')}.`,
      sol:`${m('H')} là giao của hai đường cao ${m('BD, CE')} nên ${m('H')} là trực tâm; ba đường cao đồng quy nên ${m('AH \\perp BC')} tại ${m('F')}.<br>Tam giác ${m('ABF')} vuông tại ${m('F')}: ${m(`${hv('BAF')} = 90^\\circ - ${b}^\\circ =`)} ${tb(`${90-b}^\\circ`)}.<br>Tam giác ${m('ACF')} vuông tại ${m('F')}: ${m(`${hv('CAF')} = 90^\\circ - ${g}^\\circ =`)} ${tb(`${90-g}^\\circ`)}.`});
  const goodH = 'trực tâm', goodP = m('AF \\perp BC');
  return QS({direct:true, fig:ortho7({af:true}),
    text:`${head7} Tia ${m('AH')} cắt ${m('BC')} tại ${m('F')}. Biết ${m(`${hv('BAC')} = ${al}^\\circ`)} và ${m(`${hv('ACB')} = ${g}^\\circ`)}. Chứng minh ${m('AF \\perp BC')} rồi tính ${m(hv('BHC'))}.`,
    hint:'Nhận ra H là trực tâm, rồi dùng góc ở tứ giác AEHD.',
    steps:[
      {tag:'Nhận diện H', ask:`${m('H')} là giao điểm của hai đường cao ${m('BD')} và ${m('CE')} của tam giác ${m('ABC')}. Vậy ${m('H')} là`, opts:[goodH, 'trọng tâm', 'tâm đường tròn ngoại tiếp', 'tâm đường tròn nội tiếp'], ans:goodH,
        hint:'Giao điểm các đường cao có một tên riêng.'},
      {tag:'Vuông góc', ask:`Ba đường cao của tam giác đồng quy tại ${m('H')}, nên`, opts:[goodP, m('AF \\parallel BC'), m('AF = BC'), `${m('F')} là trung điểm của ${m('BC')}`], ans:goodP,
        hint:`${m('AH')} là đường cao thứ ba.`},
      {tag:'Tính góc CAF', ask:`Tam giác ${m('ACF')} vuông tại ${m('F')}, ${m(`${hv('ACB')} = ${g}^\\circ`)}. Tính ${m(hv('CAF'))}.`, tpl:`${m(hv('CAF') + ' =')} [_]${m('^\\circ')}`, ans:[90-g], hint:'Hai góc nhọn của tam giác vuông phụ nhau.'},
      {tag:'Tính góc BHC', ask:`Tứ giác ${m('AEHD')} có hai góc vuông tại ${m('E, D')} và ${m(`${hv('BAC')} = ${al}^\\circ`)}. Tính ${m(hv('BHC'))} (đối đỉnh với ${m(hv('EHD'))}).`, tpl:`${m(hv('BHC') + ' =')} [_]${m('^\\circ')}`, ans:[180-al], hint:'Tổng bốn góc của một tứ giác bằng 360°.'}
    ],
    sol:`${m('H')} là trực tâm nên ${m('AH \\perp BC')} tại ${m('F')}. ${m(`${hv('CAF')} = 90^\\circ - ${g}^\\circ = ${90-g}^\\circ`)}. Trong tứ giác ${m('AEHD')}: ${m(`${hv('EHD')} = 360^\\circ - 90^\\circ - 90^\\circ - ${al}^\\circ = ${180-al}^\\circ`)}, nên ${m(`${hv('BHC')} =`)} ${tb(`${180-al}^\\circ`)} (đối đỉnh).`});
};

/* Dạng 5. Hệ thức bằng tam giác đồng dạng */
const gHa5 = lv => {
  const SIM = [
    {rel:'AD\\cdot AC = AE\\cdot AB', nm:['AD','AC','AE','AB'], good:'\\triangle ADB \\sim \\triangle AEC', bad:['\\triangle ADB \\sim \\triangle ACE','\\triangle AEC \\sim \\triangle BDC','\\triangle ABD \\sim \\triangle BCE'],
      ang:'\\widehat{ADB} = \\widehat{AEC} = 90^\\circ', com:'\\widehat{A}', ratio:'\\dfrac{AD}{AE} = \\dfrac{AB}{AC}', t1:'\\triangle ADB', t2:'\\triangle AEC'},
    {rel:'BE\\cdot BA = BD\\cdot BC', nm:['BE','BA','BD','BC'], good:'\\triangle BEC \\sim \\triangle BDA', bad:['\\triangle BEC \\sim \\triangle BAD','\\triangle BDA \\sim \\triangle CEB','\\triangle BDC \\sim \\triangle AEC'],
      ang:'\\widehat{BEC} = \\widehat{BDA} = 90^\\circ', com:'\\widehat{B}', ratio:'\\dfrac{BE}{BD} = \\dfrac{BC}{BA}', t1:'\\triangle BEC', t2:'\\triangle BDA'}
  ];
  if(lv === 1){
    const t = pick(SIM);
    return QC({text:`${head7} Để chứng minh hệ thức ${m(t.rel)}, ta cần chứng minh hai tam giác nào đồng dạng?`, fig:ortho7(),
      opts:[m(t.good), ...t.bad.map(m)], ans:m(t.good),
      hint:'Hệ thức a·b = c·d suy ra từ tỉ số a/c = d/b. Tìm hai tam giác vuông có chung một góc nhọn và chứa cả bốn đoạn.',
      sol:`Hai tam giác ${m(t.good)} có ${m(t.ang)} và ${m(t.com)} chung nên đồng dạng (g.g). Từ đó suy ra tỉ số các cạnh tương ứng bằng nhau và được ${m(t.rel)}.`});
  }
  if(lv === 2){
    const t = pick(SIM), nm = t.nm, u = pick([[1,2],[2,3],[3,4],[2,5],[3,5],[1,3]]), s1 = R(2, 5), s2 = R(2, 5);
    const vals = [u[0]*s1, u[1]*s2, u[0]*s2, u[1]*s1];            // nm0·nm1 = nm2·nm3, cos = u0/u1
    const k = R(0, 3), pr = k < 2 ? 1 - k : 5 - k, o1 = k < 2 ? 2 : 0, o2 = k < 2 ? 3 : 1;
    const given = [0, 1, 2, 3].filter(i => i !== k).map(i => `${m(`${nm[i]} = ${vals[i]}`)} cm`).join(', ');
    return QB({text:`${head7} Biết ${given}. Tính ${m(nm[k])}.`, fig:ortho7(),
      tpl:`${m(nm[k] + ' =')} [_] cm`, ans:[vals[k]],
      hint:`Chứng minh hai tam giác vuông đồng dạng để có hệ thức ${m(t.rel)}, rồi thay số.`,
      sol:`Xét ${m(t.t1)} và ${m(t.t2)}: ${m(t.ang)}, ${m(t.com)} chung nên ${m(t.good)} (g.g).<br>Suy ra ${m(t.ratio)}, tức ${m(t.rel)}.<br>${m(`${nm[k]} = \\dfrac{${nm[o1]}\\cdot ${nm[o2]}}{${nm[pr]}} = \\dfrac{${vals[o1]}\\cdot ${vals[o2]}}{${vals[pr]}} =`)} ${tb(vals[k])} cm.`});
  }
  const a = R(2, 5), b = R(2, 5), c = R(2, 5), d = R(2, 5), hb = a*b, hd = c*d, hc = a*c, he = b*d;
  const goodR = m('HB\\cdot HD = HC\\cdot HE'), goodS = m('\\triangle HBE \\sim \\triangle HCD');
  return QS({direct:true, fig:ortho7(),
    text:`${head7} Biết ${m(`HB = ${hb}`)} cm, ${m(`HD = ${hd}`)} cm, ${m(`HC = ${hc}`)} cm. Tính ${m('HE')}.`,
    hint:`Chứng minh ${m('\\triangle HBE \\sim \\triangle HCD')} để có hệ thức giữa bốn đoạn.`,
    steps:[
      {tag:'Góc bằng nhau', ask:`Trong hai tam giác ${m('HBE')} và ${m('HCD')} có ${m(`${hv('HEB')} = ${hv('HDC')} = 90^\\circ`)}. Hai góc ${m(hv('BHE'))} và ${m(hv('CHD'))} bằng nhau vì hai góc này`, opts:['đối đỉnh', 'so le trong', 'kề bù', 'cùng phụ với một góc'], ans:'đối đỉnh',
        hint:`${m('B, H, D')} thẳng hàng và ${m('C, H, E')} thẳng hàng.`},
      {tag:'Đồng dạng', ask:`Vậy hai tam giác đồng dạng là`, opts:[goodS, m('\\triangle HBE \\sim \\triangle HDC'), m('\\triangle HBE \\sim \\triangle HBD'), m('\\triangle HEB \\sim \\triangle HCB')], ans:goodS,
        hint:'Ghép các đỉnh có góc bằng nhau: góc vuông với góc vuông, góc ở H với góc ở H.'},
      {tag:'Hệ thức', ask:`Từ đồng dạng suy ra hệ thức`, opts:[goodR, m('HB\\cdot HE = HC\\cdot HD'), m('HB\\cdot HC = HD\\cdot HE'), m('HB + HD = HC + HE')], ans:goodR,
        hint:`Tỉ số các cạnh tương ứng: ${m('\\dfrac{HB}{HC} = \\dfrac{HE}{HD}')}.`},
      {tag:'Tính HE', ask:`Với ${m(`HB = ${hb}`)}, ${m(`HD = ${hd}`)}, ${m(`HC = ${hc}`)} (cm), tính ${m('HE')}.`, tpl:`${m('HE =')} [_] cm`, ans:[he], hint:'Thay số vào hệ thức rồi chia.'}
    ],
    sol:`Xét ${m('\\triangle HBE')} và ${m('\\triangle HCD')}: ${m(`${hv('HEB')} = ${hv('HDC')} = 90^\\circ`)}, ${m(`${hv('BHE')} = ${hv('CHD')}`)} (đối đỉnh) nên ${m('\\triangle HBE \\sim \\triangle HCD')} (g.g). Suy ra ${m('\\dfrac{HB}{HC} = \\dfrac{HE}{HD}')}, tức ${m('HB\\cdot HD = HC\\cdot HE')}. Vậy ${m(`HE = \\dfrac{HB\\cdot HD}{HC} = \\dfrac{${hb}\\cdot ${hd}}{${hc}} =`)} ${tb(he)} cm.`});
};

lesson(6,'on-thi-hinh-hoc-chung-minh-1','Hình học 7a. Chứng minh: bốn điểm cùng đường tròn, song song, vuông góc, hệ thức','Ôn tuyển sinh Bài 7 (câu a, b): bốn điểm cùng thuộc một đường tròn; tứ giác nội tiếp và tính góc; chứng minh song song; vuông góc – trực tâm; hệ thức bằng tam giác đồng dạng.',[gHa1,gHa2,gHa3,gHa4,gHa5], {intro:[
  {t:`Chứng minh bốn điểm cùng thuộc một đường tròn`, b:`<ul><li>Hai tam giác vuông <b>chung cạnh huyền</b>: trung điểm cạnh huyền cách đều cả bốn đỉnh (trung tuyến ứng với cạnh huyền bằng nửa cạnh huyền).</li><li>Tổng quát: chỉ ra một điểm cách đều bốn điểm — đó là tâm của đường tròn.</li><li>Ví dụ: ${tm('\\widehat{BDC} = \\widehat{BEC} = 90^\\circ')} thì ${tm('B, C, D, E')} thuộc đường tròn đường kính ${tm('BC')}.</li></ul>`, warn:`Đề năm nay không cho viện dẫn trực tiếp “dấu hiệu nhận biết tứ giác nội tiếp” (hai góc đối bù nhau, hai góc cùng nhìn một cạnh bằng nhau): hãy chứng minh lại bằng trung điểm cạnh huyền như trên.`, ex:`Thấy hai góc ${tm('90^\\circ')} cùng “nhìn” một đoạn thẳng thì nghĩ ngay đến đường tròn có đường kính là đoạn đó.`},
  {t:`Tứ giác nội tiếp và “chuyển góc”`, b:`<ul><li>Tứ giác nội tiếp có hai góc đối bù nhau; góc ngoài bằng góc trong của đỉnh đối diện.</li><li>Hai góc nội tiếp cùng chắn một cung thì bằng nhau.</li><li>Góc tạo bởi tiếp tuyến và dây cung bằng góc nội tiếp chắn cung đó.</li></ul>`, warn:`Mỗi lần dùng góc nội tiếp phải nói rõ hai góc cùng chắn <b>cung nào</b> và hai đỉnh nằm cùng phía đối với dây.`, ex:`Tìm bốn điểm cùng đường tròn trước, rồi mới “chuyển góc”: chứng minh song song hay đồng dạng thường bắt đầu từ một cặp góc bằng nhau.`},
  {t:`Song song và vuông góc`, b:`<ul><li>Hai đường thẳng song song nếu có cặp góc <b>so le trong</b> bằng nhau, hoặc <b>đồng vị</b> bằng nhau, hoặc <b>trong cùng phía</b> bù nhau.</li><li>Ba đường cao của tam giác đồng quy tại <b>trực tâm</b>: nếu ${tm('BD, CE')} là hai đường cao cắt nhau tại ${tm('H')} thì ${tm('AH \\perp BC')}.</li><li>Tính góc: ${tm('\\widehat{BHC} = 180^\\circ - \\widehat{BAC}')} (tam giác nhọn).</li></ul>`, warn:`Khi kết luận song song, phải nêu đúng tên cặp góc, vị trí (so le trong, đồng vị…) và cát tuyến.`, ex:`Chứng minh vuông góc: thử đường cao, góc nội tiếp chắn nửa đường tròn, hoặc “cùng vuông góc với đường thứ ba thì song song”.`},
  {t:`Hệ thức và tam giác đồng dạng`, b:`<ul><li>Hệ thức ${tm('a\\cdot b = c\\cdot d')} đổi thành tỉ số ${tm('\\dfrac{a}{c} = \\dfrac{d}{b}')}: tìm hai tam giác chứa đủ bốn đoạn ${tm('a, b, c, d')}.</li><li>Hai tam giác vuông có chung một góc nhọn (hoặc một cặp góc đối đỉnh) thì đồng dạng (g.g).</li><li>Với trực tâm: ${tm('\\triangle HBE \\sim \\triangle HCD')} cho ${tm('HB\\cdot HD = HC\\cdot HE')}.</li></ul>`, warn:`Viết các đỉnh đồng dạng <b>đúng thứ tự tương ứng</b>: viết lệch thứ tự thì tỉ số suy ra sẽ sai.`, ex:`Chép bốn đoạn của hệ thức ra nháp, mỗi tam giác lấy hai đoạn; nếu hai tam giác tìm được “cùng góc nhọn” là chắc đúng hướng.`}
]});
/* ---------- Chủ đề 9. Hình học 7b: hệ thức, thẳng hàng, đồng quy (cùng hình tam giác nhọn ABC, đường cao BD, CE, AF, trực tâm H) ---------- */
const N7 = [(A7[0]+H7[0])/2, (A7[1]+H7[1])/2], M7 = [3, 0];
const O7 = (() => {
  const a2 = A7[0]**2 + A7[1]**2, b2 = B7[0]**2 + B7[1]**2, c2 = C7[0]**2 + C7[1]**2;
  const dd = 2*(A7[0]*(B7[1]-C7[1]) + B7[0]*(C7[1]-A7[1]) + C7[0]*(A7[1]-B7[1]));
  return [(a2*(B7[1]-C7[1]) + b2*(C7[1]-A7[1]) + c2*(A7[1]-B7[1]))/dd, (a2*(C7[0]-B7[0]) + b2*(A7[0]-C7[0]) + c2*(B7[0]-A7[0]))/dd];
})();
const K7 = [2*O7[0]-A7[0], 2*O7[1]-A7[1]];

/* Đường tròn ngoại tiếp (O), đường kính AK, trung điểm M của BC, trực tâm H */
const kfig7 = () => circleSVG({C:[{x:O7[0], y:O7[1], r:Math.hypot(A7[0]-O7[0], A7[1]-O7[1]), lab:'O', lp:14}],
  P:[[...A7,'A',90],[...B7,'B',-135],[...C7,'C',-45],[...K7,'K',-90],[...H7,'H',140],[...M7,'M',30]],
  S:[[...A7,...B7],[...A7,...C7],[...B7,...C7],[...B7,...K7],[...C7,...K7],[...A7,...K7,true],[...B7,...H7],[...C7,...H7],[...H7,...K7,true]],
  right:[rightH(B7,A7,K7), rightH(C7,A7,K7)]});

const headF7 = `${head7} Gọi ${m('F')} là chân đường cao kẻ từ ${m('A')} (${m('F \\in BC')}).`;

/* Dạng 1. Hệ thức BE·BA = BF·BC, CD·CA = CF·CB và BE·BA + CD·CA = BC² */
const VB7 = [
  {X:'BE', Y:'BA', f:'BF', g:'FC', side:'B', other:'C', tri:'\\triangle BEC \\sim \\triangle BFA', t1:'\\triangle BEC', t2:'\\triangle BFA', ang:'\\widehat{BEC} = \\widehat{BFA} = 90^\\circ', com:'\\widehat{B}',
   ratio:'\\dfrac{BE}{BF} = \\dfrac{BC}{BA}', rel:'BE\\cdot BA = BF\\cdot BC', bad:['\\triangle BEC \\sim \\triangle BAF','\\triangle BDC \\sim \\triangle BFA','\\triangle BED \\sim \\triangle BFA']},
  {X:'CD', Y:'CA', f:'CF', g:'FB', side:'C', other:'B', tri:'\\triangle CDB \\sim \\triangle CFA', t1:'\\triangle CDB', t2:'\\triangle CFA', ang:'\\widehat{CDB} = \\widehat{CFA} = 90^\\circ', com:'\\widehat{C}',
   ratio:'\\dfrac{CD}{CF} = \\dfrac{CB}{CA}', rel:'CD\\cdot CA = CF\\cdot CB', bad:['\\triangle CDB \\sim \\triangle CAF','\\triangle CEB \\sim \\triangle CFA','\\triangle CDE \\sim \\triangle CFA']}
];
const gHb1 = lv => {
  const fig = ortho7({af:true});
  if(lv === 1){
    const t = pick(VB7), good = m(t.tri);
    return QC({text:`${headF7} Để chứng minh hệ thức ${m(t.rel)}, ta cần chứng minh hai tam giác nào đồng dạng?`, fig,
      opts:[good, ...t.bad.map(m)], ans:good,
      hint:'Hai tam giác vuông cần có chung một góc nhọn tại đỉnh B (hoặc C). Viết các đỉnh theo đúng thứ tự tương ứng: góc vuông với góc vuông.',
      sol:`Hai tam giác ${m(t.tri.split('\\sim')[0])} và ${m(t.tri.split('\\sim')[1])} có ${m(t.ang)} và ${m(t.com)} chung nên ${m(t.tri)} (g.g).<br>Suy ra ${m(t.ratio)}, tức là ${m(t.rel)}.<br>Đáp án: ${tb(t.tri)}.`});
  }
  if(lv === 2){
    const t = pick(VB7);
    let p, q, N, divs;
    do{ p = R(2, 7); q = R(2, 7); N = p*(p+q); divs = []; for(let e = 2; e*e < N; e++) if(N % e === 0) divs.push(e); }while(!divs.length);
    const e = pick(divs), s = N/e, askX = R(0, 1) === 0;
    const given = askX ? `${m(`${t.f} = ${p}`)} cm, ${m(`${t.g} = ${q}`)} cm, ${m(`${t.Y} = ${s}`)} cm` : `${m(`${t.f} = ${p}`)} cm, ${m(`${t.g} = ${q}`)} cm, ${m(`${t.X} = ${e}`)} cm`;
    const rest = askX ? `${m(t.X)}` : `${m(t.Y)}`;
    return QB({text:`${headF7} Biết ${given}. Tính ${rest}.`, fig,
      tpl:`${m((askX ? t.X : t.Y) + ' =')} [_] cm`, ans:[askX ? e : s],
      hint:`Chứng minh hai tam giác vuông đồng dạng để có hệ thức ${m(t.rel)}. Đoạn ${m('BC')} bằng tổng hai đoạn cho sẵn.`,
      sol:`Xét ${m(t.t1)} và ${m(t.t2)}: ${m(t.ang)}, ${m(t.com)} chung nên ${m(t.tri)} (g.g).<br>Suy ra ${m(t.ratio)}, tức là ${m(t.rel)}.<br>${m('BC')} = ${m(`${t.f} + ${t.g} = ${p} + ${q} = ${p+q}`)} cm nên ${m(`${t.f}\\cdot ${t.side}${t.other} = ${p}\\cdot ${p+q} = ${N}`)}.<br>${askX ? `${m(`${t.X} = \\dfrac{${N}}{${s}} =`)} ${tb(e)} cm.` : `${m(`${t.Y} = \\dfrac{${N}}{${e}} =`)} ${tb(s)} cm.`}`});
  }
  const p = R(2, 7), q = R(2, 7), a = p + q, x = p*a, y = q*a;
  const goodS = m('\\triangle BEC \\sim \\triangle BFA'), goodT = m('CD\\cdot CA = CF\\cdot CB'), goodU = m('BC\\cdot (BF + CF) = BC^2');
  return QS({direct:true, fig,
    text:`${headF7} Biết ${m(`BC = ${a}`)} cm và ${m(`BE\\cdot BA = ${x}`)}. Chứng minh ${m('BE\\cdot BA + CD\\cdot CA = BC^2')} rồi tính ${m('CD\\cdot CA')}.`,
    hint:`Lập hai hệ thức ${m('BE\\cdot BA = BF\\cdot BC')} và ${m('CD\\cdot CA = CF\\cdot CB')} bằng tam giác đồng dạng, rồi cộng vế với vế.`,
    steps:[
      {tag:'Hệ thức thứ nhất', ask:`Để có ${m('BE\\cdot BA = BF\\cdot BC')}, ta chứng minh hai tam giác đồng dạng nào?`, opts:[goodS, m('\\triangle BEC \\sim \\triangle BAF'), m('\\triangle BDC \\sim \\triangle BFA'), m('\\triangle BED \\sim \\triangle BFA')], ans:goodS,
        hint:'Hai tam giác vuông có chung góc nhọn B; góc vuông tại E và tại F.'},
      {tag:'Hệ thức thứ hai', ask:`Tương tự, tam giác ${m('CDB')} và ${m('CFA')} đồng dạng, ta được hệ thức`, opts:[goodT, m('CD\\cdot CB = CF\\cdot CA'), m('CD\\cdot CF = CA\\cdot CB'), m('CD\\cdot CA = CB^2')], ans:goodT,
        hint:'Tỉ số các cạnh tương ứng: CD/CF = CB/CA.'},
      {tag:'Cộng vế', ask:`Cộng hai hệ thức: ${m('BE\\cdot BA + CD\\cdot CA = BF\\cdot BC + CF\\cdot CB')}. Vế phải bằng`, opts:[goodU, m('BC\\cdot (BF - CF)'), m('BF\\cdot CF'), m('BC + BF + CF')], ans:goodU,
        hint:'Đặt thừa số chung BC; F nằm giữa B và C nên BF + CF = BC.'},
      {tag:'Tính', ask:`Với ${m(`BC = ${a}`)} cm và ${m(`BE\\cdot BA = ${x}`)}, tính ${m('CD\\cdot CA')}.`, tpl:`${m('CD\\cdot CA =')} [_]`, ans:[y], hint:`${m('CD\\cdot CA = BC^2 - BE\\cdot BA')}.`}
    ],
    sol:`${m('\\triangle BEC \\sim \\triangle BFA')} (g.g) cho ${m('BE\\cdot BA = BF\\cdot BC')}; ${m('\\triangle CDB \\sim \\triangle CFA')} (g.g) cho ${m('CD\\cdot CA = CF\\cdot CB')}. Cộng vế: ${m('BE\\cdot BA + CD\\cdot CA = BC(BF + CF) = BC^2')} (vì ${m('F')} nằm giữa ${m('B, C')}).<br>${m(`CD\\cdot CA = ${a}^2 - ${x} = ${a*a} - ${x} =`)} ${tb(y)}.`});
};

/* Dạng 2. Ba điểm thẳng hàng: H, M, K (AK là đường kính của (O)) */
const headK7 = `Tam giác nhọn ${m('ABC')} nội tiếp đường tròn ${m('(O)')}, hai đường cao ${m('BD')}, ${m('CE')} cắt nhau tại ${m('H')}. Kẻ đường kính ${m('AK')} của ${m('(O)')}; ${m('M')} là trung điểm của ${m('BC')}.`;
const gHb2 = lv => {
  const fig = kfig7();
  if(lv === 1){
    const good = 'hình bình hành';
    return QC({text:`${headK7} Tứ giác ${m('BHCK')} là hình gì?`, fig,
      opts:[good, 'hình thoi', 'hình chữ nhật', 'hình thang cân'], ans:good,
      hint:`${m('AK')} là đường kính nên ${m('\\widehat{ABK}')} và ${m('\\widehat{ACK}')} là góc nội tiếp chắn nửa đường tròn. Xét các cặp cạnh đối cùng vuông góc với ${m('AB')} hoặc ${m('AC')}.`,
      sol:`${m('AK')} là đường kính nên ${m(`${hv('ABK')} = ${hv('ACK')} = 90^\\circ`)}, tức ${m('KB \\perp AB')}, ${m('KC \\perp AC')}.<br>Mà ${m('CE \\perp AB')}, ${m('BD \\perp AC')} nên ${m('KB \\parallel CH')} và ${m('KC \\parallel BH')}.<br>Tứ giác ${m('BHCK')} có các cặp cạnh đối song song nên là <b>${good}</b>.`});
  }
  const k = R(2, 15);
  if(lv === 2){
    const askAH = R(0, 1) === 0;
    return QB({text:askAH ? `${headK7} Biết ${m(`OM = ${k}`)} cm. Tính ${m('AH')}.` : `${headK7} Biết ${m(`AH = ${2*k}`)} cm. Tính ${m('OM')}.`, fig,
      tpl:`${m((askAH ? 'AH' : 'OM') + ' =')} [_] cm`, ans:[askAH ? 2*k : k],
      hint:`Chứng minh ${m('BHCK')} là hình bình hành để có ${m('M')} là trung điểm của ${m('HK')}; khi đó ${m('OM')} là đường trung bình của một tam giác.`,
      sol:`${m('BHCK')} là hình bình hành (${m('KB \\parallel CH')}, ${m('KC \\parallel BH')}) nên hai đường chéo ${m('BC, HK')} cắt nhau tại trung điểm ${m('M')} của mỗi đường.<br>Tam giác ${m('AHK')} có ${m('O')} là trung điểm ${m('AK')}, ${m('M')} là trung điểm ${m('HK')} nên ${m('OM')} là đường trung bình: ${m('OM = \\dfrac{1}{2}AH')}.<br>${askAH ? `${m(`AH = 2\\cdot OM = 2\\cdot ${k} =`)} ${tb(2*k)} cm.` : `${m(`OM = \\dfrac{AH}{2} = \\dfrac{${2*k}}{2} =`)} ${tb(k)} cm.`}`});
  }
  const hm = R(3, 12), goodP = 'cùng vuông góc với một đường thẳng', goodM = m('M') + ' cũng là trung điểm của ' + m('HK') + ', nên ' + m('H, M, K') + ' thẳng hàng';
  return QS({direct:true, fig,
    text:`${headK7} Chứng minh ba điểm ${m('H, M, K')} thẳng hàng. Biết ${m(`OM = ${k}`)} cm và ${m(`HM = ${hm}`)} cm. Tính ${m('AH')} và ${m('HK')}.`,
    hint:`Chứng minh ${m('BHCK')} là hình bình hành, từ đó có ${m('M')} là trung điểm của ${m('HK')}.`,
    steps:[
      {tag:'Song song', ask:`Vì ${m('AK')} là đường kính nên ${m('KB \\perp AB')}. Lại có ${m('CH \\perp AB')}. Vậy ${m('KB \\parallel CH')} vì hai đường thẳng`, opts:[goodP, 'cùng đi qua điểm ' + m('A'), 'có độ dài bằng nhau', 'cùng cắt ' + m('BC')], ans:goodP,
        hint:'Hai đường thẳng cùng vuông góc với một đường thẳng thì song song.'},
      {tag:'Hình bình hành', ask:`Tương tự ${m('KC \\parallel BH')}. Tứ giác ${m('BHCK')} có hai cặp cạnh đối song song, hai đường chéo ${m('BC')} và ${m('HK')} cắt nhau tại trung điểm của mỗi đường. Kết luận:`, opts:[goodM, m('H') + ' là trung điểm của ' + m('BC'), m('HK \\perp BC') + ' tại ' + m('M'), m('M') + ' là trung điểm của ' + m('AH')], ans:goodM,
        hint:`${m('M')} là trung điểm của đường chéo ${m('BC')}.`},
      {tag:'Trung bình', ask:`Tam giác ${m('AHK')} có ${m('OM')} là đường trung bình (${m('O, M')} là trung điểm ${m('AK, HK')}). Với ${m(`OM = ${k}`)} cm, tính ${m('AH')}.`, tpl:`${m('AH =')} [_] cm`, ans:[2*k], hint:`${m('OM')} bằng nửa cạnh ${m('AH')}.`},
      {tag:'Tính HK', ask:`${m('M')} là trung điểm ${m('HK')} và ${m(`HM = ${hm}`)} cm. Tính ${m('HK')}.`, tpl:`${m('HK =')} [_] cm`, ans:[2*hm], hint:'Trung điểm chia đoạn thẳng thành hai phần bằng nhau.'}
    ],
    sol:`${m('KB \\parallel CH')} và ${m('KC \\parallel BH')} (cùng vuông góc với ${m('AB')}, ${m('AC')}) nên ${m('BHCK')} là hình bình hành, hai đường chéo ${m('BC, HK')} cắt nhau tại trung điểm ${m('M')} của ${m('BC')}. Do đó ${m('M')} là trung điểm ${m('HK')} và ${m('H, M, K')} thẳng hàng.<br>${m('OM')} là đường trung bình của tam giác ${m('AHK')}: ${m(`AH = 2OM = 2\\cdot ${k} =`)} ${tb(2*k)} cm; ${m(`HK = 2HM = 2\\cdot ${hm} =`)} ${tb(2*hm)} cm.`});
};

/* Dạng 3. Ba đường cao đồng quy: H là tâm đường tròn nội tiếp tam giác DEF */
const gHb3 = lv => {
  const fig = ortho7({af:true, def:true});
  const hd = `${head7} Gọi ${m('F')} là chân đường cao kẻ từ ${m('A')}; ${m('AF, BD, CE')} đồng quy tại ${m('H')}.`;
  if(lv === 1){
    const good = m(hv('EBH'));
    return QC({text:`${hd} Hai tam giác vuông ${m('BEH')} và ${m('BFH')} (${m(`${hv('BEH')} = ${hv('BFH')} = 90^\\circ`)}) chung cạnh huyền ${m('BH')}, nên trung điểm của ${m('BH')} cách đều ${m('B, F, H, E')}: bốn điểm này cùng thuộc đường tròn đường kính ${m('BH')}. Góc ${m(hv('EFH'))} bằng góc nào (cùng chắn cung ${m('EH')})?`, fig,
      opts:[good, m(hv('FBH')), m(hv('BCE')), m(hv('BAC'))], ans:good,
      hint:'Hai góc nội tiếp cùng chắn một cung thì bằng nhau: tìm góc có đỉnh trên đường tròn và cùng nhìn cung EH.',
      sol:`${m(hv('EFH'))} và ${m(hv('EBH'))} là hai góc nội tiếp của đường tròn đường kính ${m('BH')}, cùng chắn cung ${m('EH')} nên ${m(`${hv('EFH')} = ${hv('EBH')}`)}. Đáp án: ${tb(hv('EBH'))}.`});
  }
  const al = R(8, 16)*5;
  if(lv === 2)
    return QB({text:`${hd} Biết ${m(`${hv('BAC')} = ${al}^\\circ`)}. Tính ${m(hv('EFH'))} và ${m(hv('EFD'))}.`, fig,
      tpl:`${m(hv('EFH') + ' =')} [_]${m('^\\circ')} &nbsp; ${m(hv('EFD') + ' =')} [_]${m('^\\circ')}`, ans:[90-al, 180-2*al],
      hint:`${m(hv('EFH') + ' = ' + hv('EBH') + ' = ' + hv('ABD'))}. Tương tự ${m(hv('DFH') + ' = ' + hv('DCH'))}; ${m(hv('EFD'))} là tổng hai góc ${m(hv('EFH'))}, ${m(hv('DFH'))}.`,
      sol:`Tam giác ${m('ABD')} vuông tại ${m('D')}: ${m(`${hv('ABD')} = 90^\\circ - ${al}^\\circ = ${90-al}^\\circ`)}.<br>${m(`${hv('EFH')} = ${hv('EBH')} = ${hv('ABD')} =`)} ${tb(`${90-al}^\\circ`)} (cùng chắn cung ${m('EH')}).<br>Tương tự (đường tròn đường kính ${m('CH')}) ${m(`${hv('DFH')} = ${hv('DCH')} = ${hv('ACE')} = ${90-al}^\\circ`)}. Vậy ${m(`${hv('EFD')} = ${hv('EFH')} + ${hv('DFH')} = 2\\cdot ${90-al}^\\circ =`)} ${tb(`${180-2*al}^\\circ`)}.`});
  const b = R(10, 15)*5, g = R(10, 15)*5, A = 180 - b - g;
  const goodH = 'tâm đường tròn nội tiếp', goodE = m(`${hv('EFH')} = ${hv('DFH')}`);
  return QS({direct:true, fig,
    text:`${hd} Biết ${m(`${hv('ABC')} = ${b}^\\circ`)} và ${m(`${hv('ACB')} = ${g}^\\circ`)}. Chứng minh ${m('FA')} là tia phân giác của ${m(hv('DFE'))}, rồi tính ${m(hv('DFE'))}.`,
    hint:`Chứng minh ${m(hv('EFH') + ' = ' + hv('DFH'))} bằng hai đường tròn đường kính ${m('BH')} và ${m('CH')}.`,
    steps:[
      {tag:'Tính góc A', ask:`Tính ${m(hv('BAC'))} trong tam giác ${m('ABC')}.`, tpl:`${m(hv('BAC') + ' =')} [_]${m('^\\circ')}`, ans:[A], hint:'Tổng ba góc của tam giác bằng 180°.'},
      {tag:'Góc EFH', ask:`Trong đường tròn đường kính ${m('BH')}: ${m(`${hv('EFH')} = ${hv('EBH')} = ${hv('ABD')}`)}. Tính ${m(hv('ABD'))} (tam giác ${m('ABD')} vuông tại ${m('D')}).`, tpl:`${m(hv('ABD') + ' =')} [_]${m('^\\circ')}`, ans:[90-A], hint:'Hai góc nhọn của tam giác vuông phụ nhau.'},
      {tag:'Phân giác', ask:`Tương tự ${m(`${hv('DFH')} = ${hv('DCH')} = ${hv('ACE')} = ${90-A}^\\circ`)}. Vậy`, opts:[goodE + ', nên ' + m('FA') + ' là phân giác của ' + m(hv('DFE')), m(hv('EFH') + ' \\ne ' + hv('DFH')), m('FA \\perp DE'), m('FA') + ' là trung tuyến của tam giác ' + m('DEF')], ans:goodE + ', nên ' + m('FA') + ' là phân giác của ' + m(hv('DFE')),
        hint:'So sánh hai góc EFH và DFH vừa tính; tia FH trùng tia FA.'},
      {tag:'Kết luận', ask:`Tương tự ${m('DB')}, ${m('EC')} là phân giác của hai góc còn lại. Vậy ${m('H')} là`, opts:[goodH, 'trọng tâm', 'trực tâm', 'tâm đường tròn ngoại tiếp'], ans:goodH + '', hint:`${m('H')} là giao của ba tia phân giác của tam giác ${m('DEF')}.`},
      {tag:'Tính DFE', ask:`Tính ${m(hv('DFE'))}.`, tpl:`${m(hv('DFE') + ' =')} [_]${m('^\\circ')}`, ans:[180-2*A], hint:`${m(hv('DFE') + ' = ' + hv('EFH') + ' + ' + hv('DFH'))}.`}
    ],
    sol:`${m(`${hv('BAC')} = 180^\\circ - ${b}^\\circ - ${g}^\\circ = ${A}^\\circ`)}. ${m(`${hv('ABD')} = 90^\\circ - ${A}^\\circ = ${90-A}^\\circ`)}. Trong đường tròn đường kính ${m('BH')}: ${m(`${hv('EFH')} = ${hv('EBH')} = ${90-A}^\\circ`)}; trong đường tròn đường kính ${m('CH')}: ${m(`${hv('DFH')} = ${hv('DCH')} = ${90-A}^\\circ`)}. Hai góc bằng nhau nên ${m('FA')} là phân giác của ${m(hv('DFE'))}; tương tự ở ${m('D, E')}, ${m('H')} là tâm đường tròn nội tiếp tam giác ${m('DEF')}.<br>${m(`${hv('DFE')} = 2\\cdot ${90-A}^\\circ =`)} ${tb(`${180-2*A}^\\circ`)}.`});
};

/* Dạng 4. Tiếp tuyến ME của đường tròn đường kính AH (tâm N) */
const gHb4 = lv => {
  const fig = ortho7({circ:'AH', mn:true});
  const hn = `${head7} Gọi ${m('N')} là trung điểm của ${m('AH')}, ${m('M')} là trung điểm của ${m('BC')}.`;
  if(lv === 1){
    const good = m('NE = NA = NH = \\dfrac{AH}{2}');
    return QC({text:`${hn} Tam giác ${m('AEH')} vuông tại ${m('E')}. Khẳng định nào đúng?`, fig,
      opts:[good, m('NE = AH'), m('NE = \\dfrac{1}{2}AE'), m('NE = \\dfrac{1}{2}EH')], ans:good,
      hint:'Trung tuyến ứng với cạnh huyền của tam giác vuông bằng nửa cạnh huyền.',
      sol:`${m('NE')} là trung tuyến ứng với cạnh huyền ${m('AH')} của tam giác vuông ${m('AEH')} nên ${good}.`});
  }
  const b = R(6, 15)*5;
  if(lv === 2)
    return QB({text:`${hn} Biết ${m(`${hv('ABC')} = ${b}^\\circ`)}. Tính ${m(hv('AEN'))} và ${m(hv('BEM'))}.`, fig,
      tpl:`${m(hv('AEN') + ' =')} [_]${m('^\\circ')} &nbsp; ${m(hv('BEM') + ' =')} [_]${m('^\\circ')}`, ans:[90-b, b],
      hint:`${m('NE = NA')} nên tam giác ${m('NAE')} cân tại ${m('N')}; ${m('ME = MB')} nên tam giác ${m('MBE')} cân tại ${m('M')}. Gọi ${m('F')} là chân đường cao kẻ từ ${m('A')}.`,
      sol:`Tam giác ${m('NAE')} cân tại ${m('N')} (${m('NA = NE')}) nên ${m(`${hv('AEN')} = ${hv('EAN')} = ${hv('BAF')}`)} (${m('A, H, F')} thẳng hàng). Tam giác ${m('ABF')} vuông tại ${m('F')}: ${m(`${hv('BAF')} = 90^\\circ - ${b}^\\circ =`)} ${tb(`${90-b}^\\circ`)}.<br>Tam giác ${m('BEC')} vuông tại ${m('E')} có ${m('EM')} là trung tuyến ứng với cạnh huyền nên ${m('ME = MB')}; tam giác ${m('MBE')} cân tại ${m('M')}: ${m(`${hv('BEM')} = ${hv('MBE')} = ${hv('ABC')} =`)} ${tb(`${b}^\\circ`)}.`});
  const pyth = pick([[3,4,5],[6,8,10],[5,12,13],[9,12,15],[8,15,17],[12,16,20],[7,24,25],[15,20,25]]);
  const [n, mm, d] = pyth, ang = 90 - b;
  return QS({direct:true, fig,
    text:`${hn} Chứng minh ${m('ME')} là tiếp tuyến của đường tròn đường kính ${m('AH')}, rồi tính ${m('MN')} biết ${m(`AH = ${2*n}`)} cm, ${m(`BC = ${2*mm}`)} cm và ${m(`${hv('ABC')} = ${b}^\\circ`)}.`,
    hint:`Chứng minh ${m(hv('NEM') + ' = 90^\\circ')} bằng hai tam giác cân ${m('NAE')} và ${m('MBE')}; sau đó dùng định lí Pythagore trong tam giác ${m('NEM')}.`,
    steps:[
      {tag:'Tam giác NAE', ask:`Tam giác ${m('NAE')} cân tại ${m('N')} nên ${m(hv('AEN'))} bằng ${m(hv('BAF'))} (với ${m('F')} là chân đường cao từ ${m('A')}). Tính ${m(hv('AEN'))}.`, tpl:`${m(hv('AEN') + ' =')} [_]${m('^\\circ')}`, ans:[ang], hint:`Tam giác ${m('ABF')} vuông tại ${m('F')} có ${m(hv('ABF') + ' = ' + b + '^\\circ')}.`},
      {tag:'Tam giác MBE', ask:`Tam giác ${m('MBE')} cân tại ${m('M')} (${m('ME = MB')}). Tính ${m(hv('BEM'))}.`, tpl:`${m(hv('BEM') + ' =')} [_]${m('^\\circ')}`, ans:[b], hint:`Hai góc ở đáy của tam giác cân bằng nhau.`},
      {tag:'Góc NEM', ask:`${m('A, E, B')} thẳng hàng nên ${m(hv('NEM') + ' = 180^\\circ - ' + hv('AEN') + ' - ' + hv('BEM'))}. Tính ${m(hv('NEM'))}.`, tpl:`${m(hv('NEM') + ' =')} [_]${m('^\\circ')}`, ans:[90], hint:`Trừ hai góc vừa tính khỏi ${m('180^\\circ')}. Kết quả cho biết ${m('ME')} vuông góc với bán kính ${m('NE')} tại ${m('E')}.`},
      {tag:'Tính MN', ask:`${m('NE = \\dfrac{AH}{2}')}, ${m('ME = \\dfrac{BC}{2}')}. Tam giác ${m('NEM')} vuông tại ${m('E')}; tính ${m('MN')}.`, tpl:`${m('MN =')} [_] cm`, ans:[d], hint:`${m('NE = ' + n)} cm, ${m('ME = ' + mm)} cm; ${m('MN^2 = NE^2 + ME^2')}.`}
    ],
    sol:`${m(`${hv('AEN')} = ${hv('BAF')} = 90^\\circ - ${b}^\\circ = ${ang}^\\circ`)} (tam giác ${m('NAE')} cân tại ${m('N')}); ${m(`${hv('BEM')} = ${hv('ABC')} = ${b}^\\circ`)} (tam giác ${m('MBE')} cân tại ${m('M')}). Suy ra ${m(`${hv('NEM')} = 180^\\circ - ${ang}^\\circ - ${b}^\\circ = 90^\\circ`)}, tức ${m('ME \\perp NE')} tại ${m('E')} thuộc đường tròn đường kính ${m('AH')}: ${m('ME')} là tiếp tuyến.<br>${m(`NE = ${n}`)} cm, ${m(`ME = ${mm}`)} cm nên ${m(`MN = \\sqrt{${n}^2 + ${mm}^2} = \\sqrt{${n*n + mm*mm}} =`)} ${tb(d)} cm.`});
};

/* Dạng 5. Hệ thức HA·HF = HB·HD = HC·HE */
const gHb5 = lv => {
  const fig = ortho7({af:true});
  const hf = `${head7} Tia ${m('AH')} cắt ${m('BC')} tại ${m('F')}.`;
  if(lv === 1){
    const good = m('\\triangle HAD \\sim \\triangle HBF');
    return QC({text:`${hf} Để chứng minh ${m('HA\\cdot HF = HB\\cdot HD')}, ta cần chứng minh hai tam giác nào đồng dạng?`, fig,
      opts:[good, m('\\triangle HAD \\sim \\triangle HFB'), m('\\triangle HAB \\sim \\triangle HBF'), m('\\triangle HAE \\sim \\triangle HBF')], ans:good,
      hint:'Ba điểm A, H, F thẳng hàng; B, H, D thẳng hàng. Tìm hai tam giác vuông có một cặp góc đối đỉnh tại H, ghép góc vuông với góc vuông.',
      sol:`Xét ${m('\\triangle HAD')} và ${m('\\triangle HBF')}: ${m(`${hv('ADH')} = ${hv('BFH')} = 90^\\circ`)}, ${m(`${hv('AHD')} = ${hv('BHF')}`)} (đối đỉnh) nên ${good} (g.g).<br>Suy ra ${m('\\dfrac{HA}{HB} = \\dfrac{HD}{HF}')}, tức ${m('HA\\cdot HF = HB\\cdot HD')}.`});
  }
  const u = R(1, 4), v = R(2, 5), w = R(1, 4), z = R(2, 5);
  const val = {HA:u*v, HF:w*z, HB:u*w, HD:v*z}, ks = ['HA','HF','HB','HD'];
  if(lv === 2){
    const ask = pick(ks), given = ks.filter(x => x !== ask).map(x => m(`${x} = ${val[x]}`) + ' cm').join(', ');
    const pair = {HA:['HB','HD','HF'], HF:['HB','HD','HA'], HB:['HA','HF','HD'], HD:['HA','HF','HB']}[ask];
    return QB({text:`${hf} Biết ${given}. Tính ${m(ask)}.`, fig,
      tpl:`${m(ask + ' =')} [_] cm`, ans:[val[ask]],
      hint:`Chứng minh ${m('\\triangle HAD \\sim \\triangle HBF')} để có hệ thức ${m('HA\\cdot HF = HB\\cdot HD')}, rồi thay số.`,
      sol:`Xét ${m('\\triangle HAD')} và ${m('\\triangle HBF')}: ${m(`${hv('ADH')} = ${hv('BFH')} = 90^\\circ`)}, ${m(`${hv('AHD')} = ${hv('BHF')}`)} (đối đỉnh) nên ${m('\\triangle HAD \\sim \\triangle HBF')} (g.g).<br>Suy ra ${m('HA\\cdot HF = HB\\cdot HD')}.<br>${m(`${ask} = \\dfrac{${pair[0]}\\cdot ${pair[1]}}{${pair[2]}} = \\dfrac{${val[pair[0]]}\\cdot ${val[pair[1]]}}{${val[pair[2]]}} =`)} ${tb(val[ask])} cm.`});
  }
  const goodS = m('\\triangle HAD \\sim \\triangle HBF'), goodR = m('HA\\cdot HF = HB\\cdot HD');
  return QS({direct:true, fig,
    text:`${hf} Biết ${m(`HB = ${val.HB}`)} cm, ${m(`HD = ${val.HD}`)} cm, ${m(`HF = ${val.HF}`)} cm. Tính ${m('AF')}.`,
    hint:`Chứng minh hệ thức ${m('HA\\cdot HF = HB\\cdot HD')} để tính ${m('HA')}; ${m('H')} nằm giữa ${m('A')} và ${m('F')}.`,
    steps:[
      {tag:'Đồng dạng', ask:`Hai tam giác vuông có cặp góc đối đỉnh tại ${m('H')} là`, opts:[goodS, m('\\triangle HAD \\sim \\triangle HFB'), m('\\triangle HAB \\sim \\triangle HBF'), m('\\triangle HAE \\sim \\triangle HBF')], ans:goodS,
        hint:`Góc vuông tại ${m('D')} ứng với góc vuông tại ${m('F')}.`},
      {tag:'Hệ thức', ask:`Từ đồng dạng suy ra`, opts:[goodR, m('HA\\cdot HB = HD\\cdot HF'), m('HA + HF = HB + HD'), m('HA\\cdot HD = HB\\cdot HF')], ans:goodR,
        hint:`Tỉ số cạnh tương ứng: ${m('\\dfrac{HA}{HB} = \\dfrac{HD}{HF}')}.`},
      {tag:'Tính HA', ask:`Với ${m(`HB = ${val.HB}`)}, ${m(`HD = ${val.HD}`)}, ${m(`HF = ${val.HF}`)} (cm), tính ${m('HA')}.`, tpl:`${m('HA =')} [_] cm`, ans:[val.HA], hint:`${m('HA = \\dfrac{HB\\cdot HD}{HF}')}.`},
      {tag:'Tính AF', ask:`${m('H')} nằm giữa ${m('A')} và ${m('F')}. Tính ${m('AF')}.`, tpl:`${m('AF =')} [_] cm`, ans:[val.HA + val.HF], hint:`${m('AF = HA + HF')}.`}
    ],
    sol:`${m('\\triangle HAD \\sim \\triangle HBF')} (g.g) nên ${m('HA\\cdot HF = HB\\cdot HD')}. ${m(`HA = \\dfrac{${val.HB}\\cdot ${val.HD}}{${val.HF}} = ${val.HA}`)} cm. ${m('H')} nằm giữa ${m('A, F')} nên ${m(`AF = HA + HF = ${val.HA} + ${val.HF} =`)} ${tb(val.HA + val.HF)} cm.`});
};

lesson(6,'on-thi-hinh-hoc-chung-minh-2','Hình học 7b. Hệ thức, thẳng hàng, đồng quy','Ôn tuyển sinh Bài 7 (câu c, d): hệ thức bằng tam giác đồng dạng; ba điểm thẳng hàng; ba đường đồng quy – phân giác của tam giác DEF; tiếp tuyến và tính độ dài; hệ thức HA·HF = HB·HD.',[gHb1,gHb2,gHb3,gHb4,gHb5], {intro:[
  {t:`Hệ thức từ tam giác đồng dạng`, b:`<ul><li>Với ${tm('AF, BD, CE')} là ba đường cao: ${tm('\\triangle BEC \\sim \\triangle BFA')} cho ${tm('BE\\cdot BA = BF\\cdot BC')}; ${tm('\\triangle CDB \\sim \\triangle CFA')} cho ${tm('CD\\cdot CA = CF\\cdot CB')}.</li><li>Cộng vế: ${tm('BE\\cdot BA + CD\\cdot CA = BC\\cdot (BF + CF) = BC^2')}.</li></ul>`, warn:`Viết đúng thứ tự đỉnh tương ứng (góc vuông với góc vuông); và chỉ cộng vế được khi ${tm('F')} nằm giữa ${tm('B')} và ${tm('C')} (tam giác nhọn).`, ex:`Muốn chứng minh ${tm('a\\cdot b = c\\cdot d')}, đổi thành ${tm('\\dfrac{a}{c} = \\dfrac{d}{b}')} rồi tìm hai tam giác chứa đủ bốn đoạn.`},
  {t:`Chứng minh ba điểm thẳng hàng`, b:`<ul><li>Kẻ đường kính ${tm('AK')}: ${tm('KB \\perp AB')}, ${tm('KC \\perp AC')} (góc nội tiếp chắn nửa đường tròn).</li><li>Cùng vuông góc với ${tm('AB')} nên ${tm('KB \\parallel CH')}; tương tự ${tm('KC \\parallel BH')}: ${tm('BHCK')} là hình bình hành.</li><li>Đường chéo ${tm('HK')} đi qua trung điểm ${tm('M')} của ${tm('BC')}, nên ${tm('H, M, K')} thẳng hàng và ${tm('AH = 2OM')}.</li></ul>`, warn:`Muốn nói “hình bình hành” phải nêu đủ hai cặp cạnh đối song song; không kết luận chỉ bằng hình vẽ.`, ex:`Ba điểm thẳng hàng thường đến từ “đường chéo của hình bình hành đi qua trung điểm” hoặc “hai góc kề bù”.`},
  {t:`Đồng quy và tia phân giác`, b:`<ul><li>${tm('B, F, H, E')} thuộc đường tròn đường kính ${tm('BH')}: ${tm('\\widehat{EFH} = \\widehat{EBH} = 90^\\circ - \\widehat{BAC}')}.</li><li>Tương tự ${tm('\\widehat{DFH} = \\widehat{DCH} = 90^\\circ - \\widehat{BAC}')}, nên ${tm('FA')} là phân giác của ${tm('\\widehat{DFE}')} và ${tm('\\widehat{DFE} = 180^\\circ - 2\\widehat{BAC}')}.</li><li>Ba phân giác đồng quy tại ${tm('H')}: ${tm('H')} là tâm đường tròn nội tiếp tam giác ${tm('DEF')}.</li></ul>`, warn:`Đề năm nay không cho viện dẫn dấu hiệu tứ giác nội tiếp: phải chứng minh bốn điểm cùng thuộc đường tròn bằng trung điểm cạnh huyền (hai tam giác vuông chung cạnh huyền ${tm('BH')}).`, ex:`Nghĩ đến tam giác vuông tại hai đỉnh khác nhau cùng “nhìn” một đoạn: đó là cặp đường tròn cần dựng.`},
  {t:`Tiếp tuyến và độ dài`, b:`<ul><li>${tm('N')} là trung điểm ${tm('AH')}: ${tm('NE = NA = NH')} (trung tuyến ứng với cạnh huyền).</li><li>${tm('\\widehat{AEN} = \\widehat{BAF} = 90^\\circ - \\widehat{ABC}')}, ${tm('\\widehat{BEM} = \\widehat{ABC}')} nên ${tm('\\widehat{NEM} = 90^\\circ')}: ${tm('ME')} là tiếp tuyến của đường tròn đường kính ${tm('AH')}.</li><li>Tính ${tm('MN')} bằng Pythagore trong tam giác vuông ${tm('NEM')}.</li></ul>`, warn:`Tiếp tuyến cần cả hai ý: ${tm('E')} thuộc đường tròn và ${tm('ME')} vuông góc với bán kính ${tm('NE')} tại ${tm('E')}.`, ex:`Thấy “trung điểm” của cạnh huyền thì nghĩ ngay đến tam giác cân và các cặp góc ở đáy bằng nhau.`},
  {t:`Hệ thức HA·HF = HB·HD`, b:`<ul><li>${tm('\\triangle HAD \\sim \\triangle HBF')} (góc vuông và góc đối đỉnh tại ${tm('H')}) cho ${tm('HA\\cdot HF = HB\\cdot HD')}; tương tự ${tm('= HC\\cdot HE')}.</li><li>${tm('H')} nằm giữa ${tm('A')} và ${tm('F')} (tam giác nhọn): ${tm('AF = HA + HF')}.</li></ul>`, warn:`Đừng ghép nhầm đỉnh: góc vuông ở ${tm('D')} ứng với góc vuông ở ${tm('F')}, không phải ở ${tm('B')}.`, ex:`Tích “đoạn × đoạn” cùng đi qua một điểm (ở đây ${tm('H')}) thường đến từ cặp tam giác đối đỉnh.`}
]});


/* ---------- Chủ đề 10. Hình học 7c: tính độ dài, chu vi, diện tích, số đo góc – vận dụng cao ---------- */
const sq3c = '\\sqrt{3}';

/* Hình đường tròn (O) ngoại tiếp tam giác nhọn ABC vẽ ĐÚNG theo số đo ba góc; BC nằm ngang.
   mode 'R' (dạng 2): OB, OC, OM nét đứt, AF là đường cao; mode 'ang' (dạng 3): AO nét đứt, AF là đường cao */
const figO7 = (Ad, Bd, Cd, mode) => {
  const rd = t => t*Math.PI/180, pol = t => [3*Math.cos(rd(t)), 3*Math.sin(rd(t))];
  const Bp = pol(270 - Ad), Cp = pol(270 + Ad), Ap = pol(270 + Ad + 2*Bd);
  const Hp = [Ap[0] + Bp[0] + Cp[0], Ap[1] + Bp[1] + Cp[1]], yb = Bp[1], Fp = [Ap[0], yb], Mp = [0, yb];
  const S = [[...Ap,...Bp],[...Ap,...Cp],[...Bp,...Cp],[...Ap,...Fp]];
  if(mode === 'R') S.push([0,0,...Bp,true],[0,0,...Cp,true],[0,0,...Mp,true]);
  else S.push([...Ap,0,0,true]);
  const fl = Fp[0] < Mp[0];
  const P = [[...Ap,'A',Math.atan2(Ap[1],Ap[0])*180/Math.PI],[...Bp,'B',225],[...Cp,'C',315],[...Fp,'F',fl ? 250 : 290],[...Hp,'H',Ap[0] < 0 ? 180 : 0]];
  if(mode === 'R') P.push([...Mp,'M',fl ? 290 : 250]);
  return circleSVG({C:[{x:0, y:0, r:3, lab:'O', lp:14}], P, S, right:[[Fp[0], Fp[1], fl ? 0 : 90]]});
};

/* ===== Dạng 1. Độ dài với ba đường cao: FH·FA = FB·FC ===== */
const c7head1 = `Tam giác nhọn ${m('ABC')} có đường cao ${m('AF')} (${m('F \\in BC')}); hai đường cao ${m('BD')} và ${m('CE')} cắt nhau tại ${m('H')}.`;
const c7why1 = `${m('\\widehat{HBF} = 90^\\circ - \\widehat{C}')} (tam giác ${m('BDC')} vuông tại ${m('D')}) và ${m('\\widehat{FAC} = 90^\\circ - \\widehat{C}')} (tam giác ${m('AFC')} vuông tại ${m('F')}), cùng ${m('\\widehat{BFH} = \\widehat{AFC} = 90^\\circ')} nên ${m('\\triangle FBH \\sim \\triangle FAC')} (g.g). Suy ra ${m('\\dfrac{FH}{FC} = \\dfrac{FB}{FA}')}, tức ${m('FH\\cdot FA = FB\\cdot FC')}.`;
const c7d1 = () => {
  for(;;){
    const a = R(5, 12), h = R(2, a - 1), n = a*h, fs = [];
    for(let b = 2; b <= n; b++) if(n % b === 0 && n/b >= 2 && b + n/b <= 22) fs.push(b);
    if(!fs.length) continue;
    const b = pick(fs);
    return {a, b, c:n/b, h};
  }
};
const T3c = [];
for(let b = 3; b <= 24; b++) for(let a = 3; a <= 24; a++){
  const ab = Math.hypot(a, b);
  if(ab % 1) continue;
  for(let c = 3; c <= 24; c++){
    if((b*c) % a) continue;
    const h = b*c/a;
    if(h >= a || h < 2 || ((b + c)*h) % 2 || b + c > 26) continue;
    T3c.push({a, b, c, h, ab});
  }
}
const gHc1 = lv => {
  const fig = ortho7({af:true});
  if(lv === 1){
    const {a, b, c, h} = c7d1();
    return QB({text:`${c7head1} Biết ${m(`BF = ${b}`)} cm, ${m(`CF = ${c}`)} cm, ${m(`AF = ${a}`)} cm. Tính ${m('HF')}.`, fig,
      tpl:`${m('HF =')} [_] cm`, ans:[h],
      hint:`Hai góc ${m('\\widehat{HBF}')} và ${m('\\widehat{FAC}')} cùng phụ với góc ${m('C')}: tìm hai tam giác vuông đồng dạng có chứa ${m('HF')}.`,
      sol:`${c7why1}<br>${m(`HF = \\dfrac{FB\\cdot FC}{FA} = \\dfrac{${b}\\cdot ${c}}{${a}} =`)} ${tb(h)} cm.`});
  }
  if(lv === 2){
    let d;
    do{ d = c7d1(); }while((d.b + d.c)*d.a % 2);
    const {a, b, c, h} = d, S = (b + c)*a/2;
    return QB({text:`${c7head1} Biết ${m(`BF = ${b}`)} cm, ${m(`CF = ${c}`)} cm, ${m(`HF = ${h}`)} cm. Tính ${m('AH')} và diện tích tam giác ${m('ABC')}.`, fig,
      tpl:`<span class="eq">${m('AH =')} [_] cm</span><br><span class="eq">${m('S_{ABC} =')} [_] cm²</span>`, ans:[a - h, S],
      hint:`Từ ${m('FH\\cdot FA = FB\\cdot FC')} tính ${m('FA')}. Điểm ${m('H')} nằm giữa ${m('A')} và ${m('F')}; ${m('AF')} là đường cao ứng với đáy ${m('BC')}.`,
      sol:`${c7why1}<br>${m(`FA = \\dfrac{FB\\cdot FC}{FH} = \\dfrac{${b}\\cdot ${c}}{${h}} = ${a}`)} cm.<br>${m('H')} nằm giữa ${m('A')} và ${m('F')} nên ${m(`AH = AF - HF = ${a} - ${h} =`)} ${tb(a - h)} cm.<br>${m(`BC = ${b} + ${c} = ${b + c}`)} cm, ${m(`S_{ABC} = \\dfrac{1}{2}\\cdot ${b + c}\\cdot ${a} =`)} ${tb(S)} ${m('\\text{cm}^2')}.`});
  }
  const t = pick(T3c), {a, b, c, h, ab} = t, good = m('FH\\cdot FA = FB\\cdot FC'), SB = (b + c)*h/2;
  return QS({direct:true, fig,
    text:`${c7head1} Biết ${m(`AB = ${ab}`)} cm, ${m(`BF = ${b}`)} cm, ${m(`CF = ${c}`)} cm. Tính diện tích tam giác ${m('BHC')}.`,
    hint:`Tính ${m('AF')} bằng định lí Pythagore, rồi dùng cặp tam giác vuông đồng dạng để tính ${m('HF')}; ${m('HF')} là đường cao của tam giác ${m('BHC')}.`,
    steps:[
      {tag:'Tính AF', ask:`Tam giác ${m('ABF')} vuông tại ${m('F')}. Tính ${m('AF')}.`, tpl:`${m('AF =')} [_] cm`, ans:[a], hint:`${m('AF^2 = AB^2 - BF^2')}.`},
      {tag:'Hệ thức', ask:`Từ ${m('\\triangle FBH \\sim \\triangle FAC')} (cùng phụ với góc ${m('C')}) ta có`, opts:[good, m('FH\\cdot FB = FA\\cdot FC'), m('FH\\cdot FC = FA\\cdot FB'), m('FH + FA = FB + FC')], ans:good,
        hint:`Tỉ số cạnh tương ứng: ${m('\\dfrac{FH}{FC} = \\dfrac{FB}{FA}')}.`},
      {tag:'Tính HF', ask:`Tính ${m('HF')}.`, tpl:`${m('HF =')} [_] cm`, ans:[h], hint:`${m('HF = \\dfrac{FB\\cdot FC}{FA}')}.`},
      {tag:'Diện tích', ask:`Tính diện tích tam giác ${m('BHC')} (đáy ${m('BC')}, đường cao ${m('HF')}).`, tpl:`${m('S_{BHC} =')} [_] cm²`, ans:[SB], hint:`${m('BC = BF + FC')}; ${m('S = \\dfrac{1}{2}\\cdot BC\\cdot HF')}.`}
    ],
    sol:`${m(`AF = \\sqrt{${ab}^2 - ${b}^2} = ${a}`)} cm. ${c7why1}<br>${m(`HF = \\dfrac{${b}\\cdot ${c}}{${a}} = ${h}`)} cm; ${m(`BC = ${b} + ${c} = ${b + c}`)} cm.<br>${m(`S_{BHC} = \\dfrac{1}{2}\\cdot ${b + c}\\cdot ${h} =`)} ${tb(SB)} ${m('\\text{cm}^2')}.`});
};

/* ===== Dạng 2. Tam giác nội tiếp có góc A = 60°: OM = R/2, AH = R ===== */
const c7head2 = `Tam giác nhọn ${m('ABC')} có ${m('\\widehat{BAC} = 60^\\circ')}, nội tiếp đường tròn ${m('(O; R)')}; ${m('AF')} là đường cao, ${m('H')} là trực tâm, ${m('M')} là trung điểm của ${m('BC')}.`;
const c7why2 = `${m('\\widehat{BOC} = 2\\widehat{BAC} = 120^\\circ')} (góc ở tâm gấp đôi góc nội tiếp cùng chắn cung ${m('BC')}). Tam giác ${m('OBC')} cân tại ${m('O')} có ${m('OM')} là trung tuyến nên cũng là đường cao và phân giác: ${m('\\widehat{BOM} = 60^\\circ')}, ${m('OM \\perp BC')}, nên ${m('OM = OB\\cdot \\cos 60^\\circ = \\dfrac{R}{2}')}.`;
const c7why2b = `Kẻ đường kính ${m('AK')}: ${m('KB \\parallel CH')}, ${m('KC \\parallel BH')} nên ${m('BHCK')} là hình bình hành, ${m('M')} là trung điểm ${m('HK')}; ${m('OM')} là đường trung bình của tam giác ${m('AHK')} nên ${m('AH = 2OM = R')}.`;
const c7ang2 = () => { const B = pick([45, 50, 55, 65, 70, 75]); return [B, 120 - B]; };
const gHc2 = lv => {
  const [Bd, Cd] = c7ang2(), fig = figO7(60, Bd, Cd, 'R');
  if(lv === 1){
    const k = R(2, 9);
    return QB({text:`${c7head2} Biết ${m(`R = ${2*k}`)} cm. Tính ${m('\\widehat{BOC}')} và ${m('OM')}.`, fig,
      tpl:`<span class="eq">${m('\\widehat{BOC} =')} [_]°</span><br><span class="eq">${m('OM =')} [_] cm</span>`, ans:[120, k],
      hint:`Góc ở tâm gấp đôi góc nội tiếp cùng chắn một cung. Tam giác ${m('OBC')} cân tại ${m('O')}: ${m('OM')} cũng là phân giác của góc ${m('BOC')}; dùng ${m('\\cos')} trong tam giác vuông ${m('OMB')}.`,
      sol:`${c7why2}<br>${m(`OM = \\dfrac{${2*k}}{2} =`)} ${tb(k)} cm; ${m('\\widehat{BOC} =')} ${tb('120')}°.`});
  }
  if(lv === 2){
    if(R(0, 1) === 0){
      const h = R(3, 12);
      return QB({text:`${c7head2} Biết ${m(`AH = ${h}`)} cm. Tính bán kính ${m('R')} và diện tích hình tròn ${m('(O)')} (kết quả có dạng ${m('a\\pi')}).`, fig,
        tpl:`<span class="eq">${m('R =')} [_] cm</span><br><span class="eq">${m('S_{(O)} =')} [_]${m('\\pi')} cm²</span>`, ans:[h, h*h],
        hint:`Nối đường kính ${m('AK')} để chứng minh ${m('BHCK')} là hình bình hành, từ đó ${m('AH = 2OM')}; rồi tính ${m('OM')} theo ${m('R')}.`,
        sol:`${c7why2}<br>${c7why2b}<br>Vậy ${m(`R = AH =`)} ${tb(h)} cm và ${m(`S_{(O)} = \\pi R^2 = ${h}^2\\pi =`)} ${tb(h*h)}${m('\\pi')} ${m('\\text{cm}^2')}.`});
    }
    const k = R(2, 9);
    return QB({text:`${c7head2} Biết ${m(`OM = ${k}`)} cm. Tính ${m('AH')} và chu vi đường tròn ${m('(O)')} (kết quả có dạng ${m('a\\pi')}).`, fig,
      tpl:`<span class="eq">${m('AH =')} [_] cm</span><br><span class="eq">${m('C_{(O)} =')} [_]${m('\\pi')} cm</span>`, ans:[2*k, 4*k],
      hint:`${m('AH = 2OM')} (đường kính ${m('AK')}, hình bình hành ${m('BHCK')}); ${m('OM')} bằng nửa bán kính khi ${m('\\widehat{BAC} = 60^\\circ')}.`,
      sol:`${c7why2}<br>${m(`R = 2\\cdot OM = ${2*k}`)} cm.<br>${c7why2b}<br>${m(`AH = 2OM =`)} ${tb(2*k)} cm; ${m(`C_{(O)} = 2\\pi R = 2\\pi\\cdot ${2*k} =`)} ${tb(4*k)}${m('\\pi')} cm.`});
  }
  const k = pick([4, 6, 8, 10, 12]), half = k/2, good = m('60^\\circ');
  return QS({direct:true, fig,
    text:`${c7head2} Biết ${m(`BC = ${k}${sq3c}`)} cm. Tính ${m('R')}, ${m('OM')}, ${m('AH')} và diện tích hình tròn ${m('(O)')}.`,
    hint:`Tính ${m('\\widehat{BOM}')} từ góc ở tâm; trong tam giác vuông ${m('OMB')} dùng ${m('\\sin')} để tính ${m('R')}; rồi ${m('OM = \\dfrac{R}{2}')}, ${m('AH = 2OM')}.`,
    steps:[
      {tag:'Góc BOM', ask:`Tính ${m('\\widehat{BOM}')} (nhờ ${m('\\widehat{BOC} = 2\\widehat{BAC}')} và ${m('OM')} là phân giác).`, opts:[good, m('30^\\circ'), m('120^\\circ'), m('90^\\circ')], ans:good,
        hint:`${m('\\widehat{BOC} = 120^\\circ')}, ${m('OM')} chia đôi góc đó.`},
      {tag:'Tính R', ask:`Trong tam giác vuông ${m('OMB')}: ${m('BM = R\\sin 60^\\circ = \\dfrac{R\\sqrt{3}}{2}')}. Tính ${m('R')}.`, tpl:`${m('R =')} [_] cm`, ans:[k], hint:`${m(`BM = \\dfrac{BC}{2} = \\dfrac{${k}${sq3c}}{2}`)}.`},
      {tag:'Tính OM', ask:`Tính ${m('OM')}.`, tpl:`${m('OM =')} [_] cm`, ans:[half], hint:`${m('OM = R\\cos 60^\\circ')}.`},
      {tag:'Tính AH', ask:`Tính ${m('AH')}.`, tpl:`${m('AH =')} [_] cm`, ans:[k], hint:`${m('AH = 2OM')}.`},
      {tag:'Diện tích', ask:`Diện tích hình tròn ${m('(O)')} (kết quả có dạng ${m('a\\pi')}).`, tpl:`${m('S =')} [_]${m('\\pi')} cm²`, ans:[k*k], hint:`${m('S = \\pi R^2')}.`}
    ],
    sol:`${c7why2}<br>${m(`BM = \\dfrac{${k}${sq3c}}{2}`)} và ${m('BM = R\\sin 60^\\circ = \\dfrac{R\\sqrt{3}}{2}')} nên ${m(`R =`)} ${tb(k)} cm.<br>${m(`OM = \\dfrac{R}{2} =`)} ${tb(half)} cm.<br>${c7why2b} ${m(`AH =`)} ${tb(k)} cm; ${m(`S_{(O)} = ${k}^2\\pi =`)} ${tb(k*k)}${m('\\pi')} ${m('\\text{cm}^2')}.`});
};

/* ===== Dạng 3. Số đo góc: ∠BOC = 2A, ∠OAH = |B − C| ===== */
const c7head3b = (B, C) => `Tam giác nhọn ${m('ABC')} nội tiếp đường tròn ${m('(O)')} có ${m(`\\widehat{ABC} = ${B}^\\circ`)}, ${m(`\\widehat{ACB} = ${C}^\\circ`)}; ${m('AF')} là đường cao, ${m('H')} là trực tâm.`;
const c7ang3 = () => {
  for(;;){
    const B = R(45, 80), C = R(45, 80), A = 180 - B - C;
    if(B !== C && A >= 40 && A <= 80) return [A, B, C];
  }
};
const gHc3 = lv => {
  const [Ad, Bd, Cd] = c7ang3(), fig = figO7(Ad, Bd, Cd, 'ang'), head = c7head3b(Bd, Cd);
  if(lv === 1){
    return QB({text:`${head} Tính ${m('\\widehat{BAC}')} và ${m('\\widehat{BOC}')}.`, fig,
      tpl:`<span class="eq">${m('\\widehat{BAC} =')} [_]°</span><br><span class="eq">${m('\\widehat{BOC} =')} [_]°</span>`, ans:[Ad, 2*Ad],
      hint:`Tổng ba góc của tam giác ${m('ABC')}; góc ở tâm ${m('BOC')} và góc nội tiếp ${m('BAC')} cùng chắn cung ${m('BC')}.`,
      sol:`${m(`\\widehat{BAC} = 180^\\circ - ${Bd}^\\circ - ${Cd}^\\circ =`)} ${tb(`${Ad}^\\circ`)}.<br>${m(`\\widehat{BOC} = 2\\widehat{BAC} = 2\\cdot ${Ad}^\\circ =`)} ${tb(`${2*Ad}^\\circ`)}.`});
  }
  const bAF = 90 - Bd, oAB = 90 - Cd;
  if(lv === 2){
    return QB({text:`${head} Tính ${m('\\widehat{BAF}')} và ${m('\\widehat{OAB}')}.`, fig,
      tpl:`<span class="eq">${m('\\widehat{BAF} =')} [_]°</span><br><span class="eq">${m('\\widehat{OAB} =')} [_]°</span>`, ans:[bAF, oAB],
      hint:`${m('\\widehat{BAF}')} nằm trong tam giác vuông ${m('ABF')}. Góc ở tâm ${m('\\widehat{AOB} = 2\\widehat{ACB}')}, tam giác ${m('OAB')} cân tại ${m('O')}.`,
      sol:`Tam giác ${m('ABF')} vuông tại ${m('F')}: ${m(`\\widehat{BAF} = 90^\\circ - ${Bd}^\\circ =`)} ${tb(`${bAF}^\\circ`)}.<br>${m(`\\widehat{AOB} = 2\\widehat{ACB} = ${2*Cd}^\\circ`)}; tam giác ${m('OAB')} cân tại ${m('O')} nên ${m(`\\widehat{OAB} = \\dfrac{180^\\circ - ${2*Cd}^\\circ}{2} =`)} ${tb(`${oAB}^\\circ`)}.`});
  }
  const dif = Math.abs(Bd - Cd), good = m('|\\widehat{B} - \\widehat{C}|');
  return QS({direct:true, fig,
    text:`${head} Tính góc giữa hai đường thẳng ${m('AO')} và ${m('AH')}, tức là ${m('\\widehat{OAH}')}.`,
    hint:`Tính ${m('\\widehat{BAF}')} và ${m('\\widehat{OAB}')}, hai tia ${m('AH')} (= ${m('AF')}) và ${m('AO')} cùng nằm trong góc ${m('BAC')}; ${m('\\widehat{OAH}')} là hiệu của hai góc đó.`,
    steps:[
      {tag:'Góc BAF', ask:`Tính ${m('\\widehat{BAF}')} (tam giác ${m('ABF')} vuông tại ${m('F')}).`, tpl:`${m('\\widehat{BAF} =')} [_]°`, ans:[bAF], hint:`${m('\\widehat{BAF} = 90^\\circ - \\widehat{B}')}.`},
      {tag:'Góc OAB', ask:`Tính ${m('\\widehat{OAB}')} (dùng ${m('\\widehat{AOB} = 2\\widehat{C}')}, tam giác ${m('OAB')} cân).`, tpl:`${m('\\widehat{OAB} =')} [_]°`, ans:[oAB], hint:`${m('\\widehat{OAB} = 90^\\circ - \\widehat{C}')}.`},
      {tag:'Kết luận chung', ask:`Với mọi tam giác nhọn ${m('ABC')}, ${m('\\widehat{OAH}')} bằng`, opts:[good, m('\\widehat{B} + \\widehat{C}'), m('90^\\circ - \\widehat{A}'), m('2\\widehat{A}')], ans:good,
        hint:`Hiệu của ${m('90^\\circ - \\widehat{C}')} và ${m('90^\\circ - \\widehat{B}')}.`},
      {tag:'Tính OAH', ask:`Tính ${m('\\widehat{OAH}')}.`, tpl:`${m('\\widehat{OAH} =')} [_]°`, ans:[dif], hint:`Lấy góc lớn trừ góc bé.`}
    ],
    sol:`${m(`\\widehat{BAF} = 90^\\circ - ${Bd}^\\circ = ${bAF}^\\circ`)}; ${m(`\\widehat{AOB} = 2\\widehat{C} = ${2*Cd}^\\circ`)} nên ${m(`\\widehat{OAB} = 90^\\circ - ${Cd}^\\circ = ${oAB}^\\circ`)}.<br>${m('AH')} (trùng ${m('AF')}) và ${m('AO')} cùng nằm trong góc ${m('BAC')}, nên ${m('\\widehat{OAH} = |\\widehat{OAB} - \\widehat{BAF}| = |\\widehat{B} - \\widehat{C}|')}.<br>${m(`\\widehat{OAH} = |${Bd}^\\circ - ${Cd}^\\circ| =`)} ${tb(`${dif}^\\circ`)}.`});
};

/* ===== Dạng 4. Tam giác ADE đồng dạng ABC: tỉ số, chu vi, diện tích ===== */
const c7head4 = `Tam giác nhọn ${m('ABC')} có hai đường cao ${m('BD')} và ${m('CE')} (${m('D \\in AC')}, ${m('E \\in AB')}). Biết ${m('AD\\cdot AC = AE\\cdot AB')}, nên ${m('\\triangle ADE \\sim \\triangle ABC')} (c.g.c).`;
const c7why4 = `Từ ${m('AD\\cdot AC = AE\\cdot AB')} suy ra ${m('\\dfrac{AD}{AB} = \\dfrac{AE}{AC}')}; hai tam giác có chung góc ${m('A')} nên ${m('\\triangle ADE \\sim \\triangle ABC')} (c.g.c), tỉ số đồng dạng ${m('k = \\dfrac{AD}{AB}')}. Tỉ số chu vi bằng ${m('k')}, tỉ số diện tích bằng ${m('k^2')}.`;
const K4 = [[1,2],[1,3],[2,3],[3,4],[2,5],[3,5],[4,5]];
const T4c = [];
for(let ab = 6; ab <= 30; ab++) for(let ac = 6; ac <= 30; ac++) for(let bc = 6; bc <= 30; bc++){
  const a2 = ab*ab, b2 = ac*ac, c2 = bc*bc;
  if(a2 + b2 <= c2 || a2 + c2 <= b2 || b2 + c2 <= a2 || (ab === ac && ac === bc)) continue;
  const n = a2 + b2 - c2;
  if(n % (2*ac) || n % (2*ab)) continue;
  const ad = n/(2*ac), ae = n/(2*ab);
  if((ad*bc) % ab) continue;
  T4c.push({ab, ac, bc, ad, ae, de:ad*bc/ab});
}
const gHc4 = lv => {
  const fig = ortho7();
  if(lv === 1){
    const [p, q] = pick(K4), s = R(2, 5), u = R(2, 6), AD = p*s, AB = q*s, DE = p*u, BC = q*u;
    return QB({text:`${c7head4} Biết ${m(`AD = ${AD}`)} cm, ${m(`AB = ${AB}`)} cm, ${m(`DE = ${DE}`)} cm. Tính ${m('BC')}.`, fig,
      tpl:`${m('BC =')} [_] cm`, ans:[BC],
      hint:`Tam giác đồng dạng thì các cạnh tương ứng tỉ lệ: ${m('DE')} ứng với ${m('BC')}, ${m('AD')} ứng với ${m('AB')}.`,
      sol:`${c7why4}<br>${m(`\\dfrac{DE}{BC} = \\dfrac{AD}{AB} = \\dfrac{${AD}}{${AB}}`)} nên ${m(`BC = \\dfrac{${DE}\\cdot ${AB}}{${AD}} =`)} ${tb(BC)} cm.`});
  }
  if(lv === 2){
    const [p, q] = pick(K4), s = R(2, 5);
    if(R(0, 1) === 0){
      const t = R(1, 4), S = q*q*t;
      return QB({text:`${c7head4} Biết ${m(`AD = ${p*s}`)} cm, ${m(`AB = ${q*s}`)} cm và diện tích tam giác ${m('ABC')} bằng ${m(`${S}`)} ${m('\\text{cm}^2')}. Tính diện tích tam giác ${m('ADE')} và diện tích tứ giác ${m('BCDE')}.`, fig,
        tpl:`<span class="eq">${m('S_{ADE} =')} [_] cm²</span><br><span class="eq">${m('S_{BCDE} =')} [_] cm²</span>`, ans:[p*p*t, (q*q - p*p)*t],
        hint:`Tỉ số diện tích bằng bình phương tỉ số đồng dạng. Tứ giác ${m('BCDE')} là phần còn lại của tam giác ${m('ABC')} sau khi bỏ tam giác ${m('ADE')}.`,
        sol:`${c7why4}<br>${m(`k = \\dfrac{${p*s}}{${q*s}} = \\dfrac{${p}}{${q}}`)} nên ${m(`S_{ADE} = k^2\\cdot S_{ABC} = \\dfrac{${p*p}}{${q*q}}\\cdot ${S} =`)} ${tb(p*p*t)} ${m('\\text{cm}^2')}.<br>${m(`S_{BCDE} = S_{ABC} - S_{ADE} = ${S} - ${p*p*t} =`)} ${tb((q*q - p*p)*t)} ${m('\\text{cm}^2')}.`});
    }
    const t1 = R(2, 5), t2 = R(1, 3), P = q*t1, S = q*q*t2;
    return QB({text:`${c7head4} Biết ${m(`AD = ${p*s}`)} cm, ${m(`AB = ${q*s}`)} cm; tam giác ${m('ABC')} có chu vi ${m(`${P}`)} cm và diện tích ${m(`${S}`)} ${m('\\text{cm}^2')}. Tính chu vi và diện tích tam giác ${m('ADE')}.`, fig,
      tpl:`<span class="eq">${m('P_{ADE} =')} [_] cm</span><br><span class="eq">${m('S_{ADE} =')} [_] cm²</span>`, ans:[p*t1, p*p*t2],
      hint:`Chu vi nhân với ${m('k')}, diện tích nhân với ${m('k^2')} (${m('k = \\dfrac{AD}{AB}')}).`,
      sol:`${c7why4}<br>${m(`k = \\dfrac{${p*s}}{${q*s}} = \\dfrac{${p}}{${q}}`)}. ${m(`P_{ADE} = k\\cdot P_{ABC} = \\dfrac{${p}}{${q}}\\cdot ${P} =`)} ${tb(p*t1)} cm; ${m(`S_{ADE} = k^2\\cdot S_{ABC} = \\dfrac{${p*p}}{${q*q}}\\cdot ${S} =`)} ${tb(p*p*t2)} ${m('\\text{cm}^2')}.`});
  }
  const t = pick(T4c), {ab, ac, bc, ad, ae, de} = t, good = m('\\triangle ADE \\sim \\triangle ABC');
  const per = bc + (ac - ad) + de + (ab - ae);
  return QS({direct:true, fig,
    text:`${c7head4} Biết ${m(`AB = ${ab}`)} cm, ${m(`AC = ${ac}`)} cm, ${m(`BC = ${bc}`)} cm, ${m(`AD = ${ad}`)} cm. Tính chu vi tứ giác ${m('BCDE')}.`,
    hint:`Chu vi ${m('BCDE = BC + CD + DE + EB')} với ${m('CD = AC - AD')}, ${m('EB = AB - AE')}. Tính ${m('AE')} và ${m('DE')} bằng tam giác đồng dạng.`,
    steps:[
      {tag:'Đồng dạng', ask:`Từ ${m('AD\\cdot AC = AE\\cdot AB')} và góc ${m('A')} chung, ta có`, opts:[good, m('\\triangle ADE \\sim \\triangle ACB'), m('\\triangle AED \\sim \\triangle ABC'), m('\\triangle ADE \\sim \\triangle ABD')], ans:good,
        hint:`${m('\\dfrac{AD}{AB} = \\dfrac{AE}{AC}')}: ${m('D')} ứng với ${m('B')}, ${m('E')} ứng với ${m('C')}.`},
      {tag:'Tính AE', ask:`Tính ${m('AE')} từ ${m('AD\\cdot AC = AE\\cdot AB')}.`, tpl:`${m('AE =')} [_] cm`, ans:[ae], hint:`${m('AE = \\dfrac{AD\\cdot AC}{AB}')}.`},
      {tag:'Tính DE', ask:`Tính ${m('DE')} từ ${m('\\dfrac{DE}{BC} = \\dfrac{AD}{AB}')}.`, tpl:`${m('DE =')} [_] cm`, ans:[de], hint:`${m('DE = \\dfrac{AD\\cdot BC}{AB}')}.`},
      {tag:'Chu vi', ask:`Tính chu vi tứ giác ${m('BCDE')}.`, tpl:`${m('P_{BCDE} =')} [_] cm`, ans:[per], hint:`${m('P = BC + (AC - AD) + DE + (AB - AE)')}.`}
    ],
    sol:`${c7why4}<br>${m(`AE = \\dfrac{${ad}\\cdot ${ac}}{${ab}} = ${ae}`)} cm; ${m(`DE = \\dfrac{${ad}\\cdot ${bc}}{${ab}} = ${de}`)} cm.<br>${m(`CD = ${ac} - ${ad} = ${ac - ad}`)}, ${m(`EB = ${ab} - ${ae} = ${ab - ae}`)}.<br>${m(`P_{BCDE} = ${bc} + ${ac - ad} + ${de} + ${ab - ae} =`)} ${tb(per)} cm.`});
};

/* ===== Dạng 5. Đường tròn đường kính BC: cung, hình quạt, viên phân ===== */
const c7head5 = Ad => `Tam giác nhọn ${m('ABC')} có ${m(`\\widehat{BAC} = ${Ad}^\\circ`)}, hai đường cao ${m('BD')}, ${m('CE')}; ${m('M')} là trung điểm của ${m('BC')}. Bốn điểm ${m('B, C, D, E')} thuộc đường tròn ${m('(M)')} đường kính ${m('BC')}.`;
const c7why5 = Ad => `${m(`\\widehat{EBD} = \\widehat{ABD} = 90^\\circ - ${Ad}^\\circ = ${90 - Ad}^\\circ`)} (tam giác ${m('ABD')} vuông tại ${m('D')}). Góc ${m('EMD')} là góc ở tâm, ${m('EBD')} là góc nội tiếp cùng chắn cung nhỏ ${m('ED')}, nên ${m(`\\widehat{EMD} = 2\\widehat{EBD} = ${180 - 2*Ad}^\\circ`)}.`;
const gHc5 = lv => {
  const fig = ortho7({circ:'BC', md:true});
  if(lv === 1){
    const Ad = pick([30, 36, 40, 45, 50, 54, 60, 65, 70]);
    return QB({text:`${c7head5(Ad)} Tính ${m('\\widehat{EBD}')} và ${m('\\widehat{EMD}')}.`, fig,
      tpl:`<span class="eq">${m('\\widehat{EBD} =')} [_]°</span><br><span class="eq">${m('\\widehat{EMD} =')} [_]°</span>`, ans:[90 - Ad, 180 - 2*Ad],
      hint:`${m('\\widehat{EBD} = \\widehat{ABD}')} nằm trong tam giác vuông ${m('ABD')}. Góc ở tâm gấp đôi góc nội tiếp cùng chắn một cung.`,
      sol:`${c7why5(Ad)}<br>Đáp số: ${m('\\widehat{EBD} =')} ${tb(`${90 - Ad}^\\circ`)}, ${m('\\widehat{EMD} =')} ${tb(`${180 - 2*Ad}^\\circ`)}.`});
  }
  if(lv === 2){
    const cfg = pick([{A:30, n:120, Rs:[3, 6, 9, 12]}, {A:45, n:90, Rs:[4, 6, 8, 10, 12]}, {A:60, n:60, Rs:[6, 12, 18]}]), r = pick(cfg.Rs), n = cfg.n;
    const l = r*n/180, S = r*r*n/360;
    return QB({text:`${c7head5(cfg.A)} Biết ${m(`BC = ${2*r}`)} cm. Tính độ dài cung nhỏ ${m('ED')} và diện tích hình quạt tròn ${m('MED')} (kết quả có dạng ${m('a\\pi')}).`, fig,
      tpl:`<span class="eq">${m('l_{ED} =')} [_]${m('\\pi')} cm</span><br><span class="eq">${m('S_{quat} =')} [_]${m('\\pi')} cm²</span>`, ans:[l, S],
      hint:`Tìm số đo cung ${m('ED')} (bằng góc ${m('EMD')}), bán kính ${m('R = \\dfrac{BC}{2}')}; rồi dùng ${m('l = \\dfrac{\\pi Rn}{180}')} và ${m('S = \\dfrac{\\pi R^2 n}{360}')}.`,
      sol:`${c7why5(cfg.A)}<br>${m(`R = \\dfrac{${2*r}}{2} = ${r}`)} cm, cung ${m('ED')} có số đo ${m(`${n}^\\circ`)}.<br>${m(`l_{ED} = \\dfrac{\\pi\\cdot ${r}\\cdot ${n}}{180} =`)} ${tb(l)}${m('\\pi')} cm.<br>${m(`S_{quat} = \\dfrac{\\pi\\cdot ${r}^2\\cdot ${n}}{360} =`)} ${tb(S)}${m('\\pi')} ${m('\\text{cm}^2')}.`});
  }
  const rt = pick([{A:45, n:90, Rs:[4, 6, 8, 10]}, {A:60, n:60, Rs:[6, 12]}]), r = pick(rt.Rs), isSq = rt.A === 45;
  const sec = r*r*rt.n/360, tri = isSq ? r*r/2 : r*r/4;
  const goodN = m(`${rt.n}^\\circ`), optsN = [...new Set([rt.n, 180 - rt.n, 2*rt.n, rt.A, 45, 30, 150])].slice(0, 4).map(v => m(`${v}^\\circ`));
  return QS({direct:true, fig,
    text:`${c7head5(rt.A)} Biết ${m(`BC = ${2*r}`)} cm. Tính diện tích hình viên phân giới hạn bởi dây ${m('ED')} và cung nhỏ ${m('ED')} của ${m('(M)')} (kết quả có dạng ${isSq ? m('a\\pi - b') : m('a\\pi - b\\sqrt{3}')}).`,
    hint:`Diện tích viên phân = diện tích hình quạt ${m('MED')} − diện tích tam giác ${m('MED')}. Tam giác ${m('MED')} cân tại ${m('M')} có góc ở đỉnh ${m('\\widehat{EMD}')}.`,
    steps:[
      {tag:'Góc EMD', ask:`Tính ${m('\\widehat{EMD}')} (góc ở tâm gấp đôi góc nội tiếp ${m('\\widehat{EBD} = 90^\\circ - \\widehat{A}')}).`, opts:optsN, ans:goodN, hint:`${m('\\widehat{EMD} = 2(90^\\circ - \\widehat{A})')}.`},
      {tag:'Hình quạt', ask:`Với ${m(`R = ${r}`)} cm, tính diện tích hình quạt ${m('MED')}.`, tpl:`${m('S_{quat} =')} [_]${m('\\pi')} cm²`, ans:[sec], hint:`${m(`S = \\dfrac{\\pi R^2 n}{360}`)} với ${m(`n = ${rt.n}`)}.`},
      {tag:'Tam giác MED', ask: isSq ? `Tam giác ${m('MED')} vuông cân tại ${m('M')} với ${m('ME = MD = R')}. Tính diện tích.` : `Tam giác ${m('MED')} cân có góc ở đỉnh ${m('60^\\circ')} nên là tam giác đều cạnh ${m('R')}. Tính diện tích (kết quả có dạng ${m('b\\sqrt{3}')}).`,
        tpl: isSq ? `${m('S_{MED} =')} [_] cm²` : `${m('S_{MED} =')} [_]${m('\\sqrt{3}')} cm²`, ans:[tri],
        hint: isSq ? `${m('S = \\dfrac{1}{2}\\cdot ME\\cdot MD')}.` : `Diện tích tam giác đều cạnh ${m('a')}: ${m('\\dfrac{a^2\\sqrt{3}}{4}')}.`},
      {tag:'Viên phân', ask:`Diện tích viên phân bằng hiệu hai diện tích trên.`, tpl: isSq ? `${m('S =')} [_]${m('\\pi -')} [_] cm²` : `${m('S =')} [_]${m('\\pi -')} [_]${m('\\sqrt{3}')} cm²`, ans:[sec, tri], hint:`${m('S = S_{quat} - S_{MED}')}.`}
    ],
    sol:`${c7why5(rt.A)}<br>${m(`S_{quat} = \\dfrac{\\pi\\cdot ${r}^2\\cdot ${rt.n}}{360} = ${sec}\\pi`)}. ` + (isSq
      ? `Tam giác ${m('MED')} vuông cân: ${m(`S_{MED} = \\dfrac{1}{2}\\cdot ${r}\\cdot ${r} = ${tri}`)}.<br>${m('S_{vienphan} =')} ${tb(`${sec}\\pi - ${tri}`)} ${m('\\text{cm}^2')}.`
      : `Tam giác ${m('MED')} đều cạnh ${m(`${r}`)}: ${m(`S_{MED} = \\dfrac{${r}^2\\sqrt{3}}{4} = ${tri}\\sqrt{3}`)}.<br>${m('S_{vienphan} =')} ${tb(`${sec}\\pi - ${tri}\\sqrt{3}`)} ${m('\\text{cm}^2')}.`)});
};

lesson(6,'on-thi-hinh-hoc-tinh-toan','Hình học 7c. Tính độ dài, chu vi, diện tích, số đo góc (vận dụng cao)','Ôn tuyển sinh Bài 7 (câu cuối, vận dụng cao): độ dài từ tam giác đồng dạng và Pythagore; tam giác nội tiếp có góc 60°; số đo góc ∠OAH; tỉ số chu vi, diện tích; cung, hình quạt, viên phân.',[gHc1,gHc2,gHc3,gHc4,gHc5], {intro:[
  {t:`Độ dài với ba đường cao`, b:`<ul><li>${tm('\\widehat{HBF}')} và ${tm('\\widehat{FAC}')} cùng phụ với ${tm('\\widehat{C}')} nên ${tm('\\triangle FBH \\sim \\triangle FAC')} (g.g), cho ${tm('FH\\cdot FA = FB\\cdot FC')}.</li><li>${tm('H')} nằm giữa ${tm('A')} và ${tm('F')} (tam giác nhọn): ${tm('AH = AF - HF')}.</li><li>Diện tích: ${tm('S_{ABC} = \\dfrac{1}{2}\\cdot BC\\cdot AF')}; ${tm('S_{BHC} = \\dfrac{1}{2}\\cdot BC\\cdot HF')}.</li></ul>`, warn:`Chọn đúng cặp tam giác đồng dạng và viết đúng thứ tự đỉnh (góc vuông với góc vuông); đừng lấy ${tm('AF')} thay cho ${tm('AH')}.`, ex:`Cần một đoạn chưa biết nằm trong hình có nhiều góc vuông: tìm hai tam giác vuông có góc nhọn cùng phụ với một góc, rồi lập tỉ số.`},
  {t:`Tam giác nội tiếp có góc ${tm('60^\\circ')}`, b:`<ul><li>${tm('\\widehat{BOC} = 2\\widehat{BAC} = 120^\\circ')}; tam giác ${tm('OBC')} cân, ${tm('OM')} là phân giác: ${tm('\\widehat{BOM} = 60^\\circ')}.</li><li>${tm('OM = R\\cos 60^\\circ = \\dfrac{R}{2}')}, ${tm('BM = R\\sin 60^\\circ = \\dfrac{R\\sqrt{3}}{2}')}, ${tm('BC = R\\sqrt{3}')}.</li><li>Đường kính ${tm('AK')} cho hình bình hành ${tm('BHCK')} và ${tm('AH = 2OM = R')}.</li></ul>`, warn:`Muốn dùng ${tm('AH = 2OM')} phải chứng minh lại bằng hình bình hành ${tm('BHCK')}; góc ở tâm ${tm('BOC')} là ${tm('120^\\circ')}, đừng nhầm với ${tm('60^\\circ')}.`, ex:`Gặp góc ${tm('60^\\circ')} (hoặc ${tm('30^\\circ')}, ${tm('45^\\circ')}) trong đường tròn, hãy vẽ bán kính ${tm('OB, OC')} để có tam giác cân với góc ở tâm biết sẵn.`},
  {t:`Số đo góc với tâm ${tm('O')} và trực tâm ${tm('H')}`, b:`<ul><li>${tm('\\widehat{BAF} = 90^\\circ - \\widehat{B}')} (tam giác ${tm('ABF')} vuông).</li><li>${tm('\\widehat{AOB} = 2\\widehat{C}')} nên ${tm('\\widehat{OAB} = 90^\\circ - \\widehat{C}')} (tam giác ${tm('OAB')} cân).</li><li>Hai tia ${tm('AH')} và ${tm('AO')} cùng nằm trong góc ${tm('BAC')}: ${tm('\\widehat{OAH} = |\\widehat{B} - \\widehat{C}|')}.</li></ul>`, warn:`Phải tính ${tm('\\widehat{BAF}')} và ${tm('\\widehat{OAB}')} rồi lấy hiệu; nếu ${tm('\\widehat{B} = \\widehat{C}')} thì ${tm('AO')} trùng ${tm('AH')}.`, ex:`Mọi góc ở đỉnh ${tm('A')} đều quy về ${tm('90^\\circ - \\widehat{B}')} hoặc ${tm('90^\\circ - \\widehat{C}')}: ghi hai giá trị này ra trước.`},
  {t:`Tam giác đồng dạng: tỉ số, chu vi, diện tích`, b:`<ul><li>${tm('AD\\cdot AC = AE\\cdot AB')} cho ${tm('\\triangle ADE \\sim \\triangle ABC')} (c.g.c), ${tm('k = \\dfrac{AD}{AB}')}.</li><li>Cạnh tương ứng tỉ lệ: ${tm('DE = k\\cdot BC')}, ${tm('AE = k\\cdot AC')}.</li><li>Chu vi nhân ${tm('k')}, diện tích nhân ${tm('k^2')}; ${tm('S_{BCDE} = S_{ABC} - S_{ADE}')}.</li></ul>`, warn:`Tỉ số diện tích là ${tm('k^2')}, không phải ${tm('k')}; chu vi tứ giác ${tm('BCDE')} phải cộng cả ${tm('CD = AC - AD')} và ${tm('EB = AB - AE')}.`, ex:`Muốn chu vi hay diện tích một hình “cắt ra” từ tam giác lớn: tính phần bị cắt bằng tỉ số đồng dạng rồi lấy hiệu.`},
  {t:`Cung, hình quạt, viên phân`, b:`<ul><li>${tm('\\widehat{EMD} = 2\\widehat{EBD} = 2(90^\\circ - \\widehat{A}) = 180^\\circ - 2\\widehat{A}')}.</li><li>${tm('l = \\dfrac{\\pi Rn}{180}')}; ${tm('S_{quat} = \\dfrac{\\pi R^2 n}{360}')}.</li><li>Viên phân = quạt − tam giác ${tm('MED')} (vuông cân: ${tm('\\dfrac{R^2}{2}')}; đều: ${tm('\\dfrac{R^2\\sqrt{3}}{4}')}).</li></ul>`, warn:`Đường kính là ${tm('BC = 2R')}: đừng thay ${tm('BC')} vào công thức như bán kính; viên phân là hiệu, không phải tổng.`, ex:`Kết quả chứa ${tm('\\pi')} nên giữ nguyên ${tm('a\\pi - b')}; chỉ đổi ra số thập phân khi đề yêu cầu làm tròn.`}
]});

}

/* =====================================================================
   ÔN THI TUYỂN SINH VÀO LỚP 10 – KIẾN THỨC THỐNG NHẤT: ĐƯỢC DÙNG NGAY HAY PHẢI CHỨNG MINH LẠI
   ===================================================================== */
{
const m = tm;
const bt = s => `<b class="ans">${s}</b>`;
const USE = 'Được dùng trực tiếp', PROVE = 'Phải chứng minh lại';

/* Kho phát biểu: KD = được dùng trực tiếp; KC = phải chứng minh lại (kèm cách chứng minh) */
const KD = [
  {s:`Trong tam giác cân, hai góc ở đáy bằng nhau.`, why:`đây là tính chất của tam giác cân.`},
  {s:`Tam giác vuông cân có hai góc nhọn đều bằng ${m('45^\\circ')}.`, why:`tam giác vuông cân là trường hợp riêng của tam giác cân.`},
  {s:`Tam giác đều có ba góc đều bằng ${m('60^\\circ')}.`, why:`đây là tính chất của tam giác đều.`},
  {s:`Hai góc cùng phụ với một góc thứ ba thì bằng nhau.`, why:`kiến thức về hai góc cùng phụ.`},
  {s:`Hai góc cùng bù với một góc thứ ba thì bằng nhau.`, why:`kiến thức về hai góc cùng bù.`},
  {s:`Tam giác đều cạnh ${m('a')} có diện tích ${m('\\dfrac{a^2\\sqrt{3}}{4}')}.`, why:`công thức diện tích tam giác đều.`},
  {s:`Tam giác vuông cân có cạnh góc vuông ${m('a')} thì cạnh huyền bằng ${m('a\\sqrt{2}')} và diện tích bằng ${m('\\dfrac{a^2}{2}')}.`, why:`công thức độ dài và diện tích tam giác vuông cân.`},
  {s:`Tam giác đều cạnh ${m('a')} có bán kính đường tròn ngoại tiếp bằng ${m('\\dfrac{a\\sqrt{3}}{3}')}.`, why:`công thức bán kính đường tròn ngoại tiếp tam giác đều.`},
  {s:`Tam giác đều cạnh ${m('a')} có bán kính đường tròn nội tiếp bằng ${m('\\dfrac{a\\sqrt{3}}{6}')}.`, why:`công thức bán kính đường tròn nội tiếp tam giác đều.`},
  {s:`Tam giác có đường trung tuyến ứng với một cạnh bằng nửa cạnh ấy thì tam giác đó vuông.`, why:`được phép dùng trực tiếp (vuông tại đỉnh đối diện với cạnh đó).`},
  {s:`Góc nội tiếp chắn nửa đường tròn là góc vuông.`, why:`nhận xét về góc nội tiếp trong SGK.`},
  {s:`Các góc nội tiếp cùng chắn một cung thì bằng nhau.`, why:`nhận xét về góc nội tiếp trong SGK.`},
  {s:`Số đo góc nội tiếp bằng nửa số đo góc ở tâm cùng chắn một cung.`, why:`chú ý về góc nội tiếp trong SGK.`}
];
const KC = [
  {s:`Đường phân giác ngoài tại ${m('A')} của tam giác ${m('ABC')} cắt ${m('BC')} tại ${m('D')} thì ${m('\\dfrac{DB}{DC} = \\dfrac{AB}{AC}')}.`, how:`qua ${m('B')} kẻ đường thẳng song song với ${m('AD')}, cắt đường thẳng ${m('AC')} tại ${m('E')}; chứng minh ${m('AE = AB')} (tam giác cân) rồi dùng định lí Thalès.`},
  {s:`Tam giác ${m('ABC')} vuông tại ${m('A')}, đường cao ${m('AH')}: ${m('AB^2 = BH\\cdot BC')}.`, how:`chứng minh ${m('\\triangle HBA \\sim \\triangle ABC')} (g.g) rồi lập tỉ số các cạnh tương ứng.`},
  {s:`Tam giác ${m('ABC')} vuông tại ${m('A')}, đường cao ${m('AH')}: ${m('AH^2 = BH\\cdot CH')}.`, how:`chứng minh ${m('\\triangle HBA \\sim \\triangle HAC')} (g.g) rồi lập tỉ số các cạnh tương ứng.`},
  {s:`Tam giác ${m('ABC')} vuông tại ${m('A')}, đường cao ${m('AH')}: ${m('AH\\cdot BC = AB\\cdot AC')}.`, how:`tính diện tích tam giác ${m('ABC')} theo hai cách (đáy ${m('BC')} và đáy ${m('AB')}).`},
  {s:`Tam giác ${m('ABC')} vuông tại ${m('A')}, đường cao ${m('AH')}: ${m('\\dfrac{1}{AH^2} = \\dfrac{1}{AB^2} + \\dfrac{1}{AC^2}')}.`, how:`từ ${m('AH\\cdot BC = AB\\cdot AC')} và định lí Pythagore ${m('BC^2 = AB^2 + AC^2')}.`},
  {s:`Với góc nhọn ${m('\\alpha')}: ${m('\\tan\\alpha = \\dfrac{\\sin\\alpha}{\\cos\\alpha}')}.`, how:`đặt ${m('\\alpha')} là một góc nhọn của tam giác vuông, viết ${m('\\sin\\alpha')}, ${m('\\cos\\alpha')}, ${m('\\tan\\alpha')} bằng các tỉ số cạnh rồi chia.`},
  {s:`Với góc nhọn ${m('\\alpha')}: ${m('\\sin^2\\alpha + \\cos^2\\alpha = 1')}.`, how:`đặt ${m('\\alpha')} là một góc nhọn của tam giác vuông, viết hai tỉ số bằng cạnh rồi dùng định lí Pythagore.`},
  {s:`Đường kính vuông góc với một dây (không đi qua tâm) thì đi qua trung điểm của dây ấy.`, how:`tam giác cân ${m('OAB')} (hai cạnh là bán kính) có ${m('OH')} là đường cao nên cũng là trung tuyến.`},
  {s:`Đường kính đi qua trung điểm của một dây (không đi qua tâm) thì vuông góc với dây ấy.`, how:`tam giác cân ${m('OAB')} có ${m('OH')} là trung tuyến nên cũng là đường cao.`},
  {s:`Tứ giác có tổng hai góc đối bằng ${m('180^\\circ')} thì nội tiếp được đường tròn.`, how:`chỉ ra bốn đỉnh cùng cách đều một điểm (ví dụ hai tam giác vuông chung cạnh huyền có tâm là trung điểm cạnh huyền).`},
  {s:`Tứ giác có hai đỉnh kề nhau cùng nhìn cạnh nối hai đỉnh còn lại dưới hai góc bằng nhau thì nội tiếp được đường tròn.`, how:`chỉ ra bốn đỉnh cùng cách đều một điểm hoặc cùng thuộc đường tròn đường kính một đoạn đã biết.`}
];
const solUse = it => `${it.s}<br>Đây là kiến thức ${bt(USE)}: ${it.why}`;
const solProve = it => `${it.s}<br>Đây là kiến thức ${bt(PROVE)} trước khi dùng; cách làm: ${it.how}`;

/* ===== Dạng 1. Nhận biết: được dùng trực tiếp hay phải chứng minh lại ===== */
const gKt1 = lv => {
  if(lv === 1){
    const useIt = R(0, 1) === 0, it = useIt ? pick(KD) : pick(KC);
    return QC({text:`Theo quy ước đề thi vào lớp 10 năm nay, trong bài hình, khẳng định sau được dùng trực tiếp hay phải chứng minh lại?<br><b>${it.s}</b>`,
      opts:[USE, PROVE], ans:useIt ? USE : PROVE, keepOrder:true,
      hint:`Đối chiếu với hai danh sách trong thẻ “Kiến thức cần nhớ” ở đầu trang.`,
      sol: useIt ? solUse(it) : solProve(it)});
  }
  if(lv === 2){
    const askUse = R(0, 1) === 0;
    const good = askUse ? pick(KD) : pick(KC), bad = askUse ? shuffle(KC).slice(0, 3) : shuffle(KD).slice(0, 3);
    const all = shuffle([good, ...bad]), letters = ['A', 'B', 'C', 'D'];
    const opts = all.map((it, i) => `${letters[i]}. ${it.s}`);
    return QC({text:`Trong bốn khẳng định sau, khẳng định nào ${askUse ? '<b>được dùng trực tiếp</b>' : '<b>phải chứng minh lại</b>'} khi trình bày bài hình thi vào lớp 10?`,
      opts, ans:opts[all.indexOf(good)], keepOrder:true, wide:true,
      hint:`Loại dần từng phương án bằng cách xếp mỗi khẳng định vào đúng danh sách.`,
      sol:`Phương án đúng: ${bt(letters[all.indexOf(good)])}.<br>` + (askUse ? solUse(good) : solProve(good)) + `<br>Ba phương án còn lại thuộc nhóm ngược lại.`});
  }
  const k = R(2, 4), ds = shuffle(KD).slice(0, k), cs = shuffle(KC).slice(0, 6 - k), all = shuffle([...ds.map(x => ({x, u:true})), ...cs.map(x => ({x, u:false}))]);
  const list = all.map((e, i) => `${m(`(${i + 1})`)} ${e.x.s}`).join('<br>');
  const uses = all.map((e, i) => e.u ? i + 1 : 0).filter(Boolean);
  return QB({text:`Cho sáu khẳng định:<br>${list}<br>Có bao nhiêu khẳng định được dùng trực tiếp, bao nhiêu khẳng định phải chứng minh lại?`,
    tpl:`<span class="eq">Được dùng trực tiếp: [_]</span><br><span class="eq">Phải chứng minh lại: [_]</span>`, ans:[k, 6 - k],
    hint:`Xét lần lượt từng khẳng định, đánh dấu vào nhóm của nó; hai số phải cộng lại bằng 6.`,
    sol:`Được dùng trực tiếp: ${uses.map(i => m(`(${i})`)).join(', ')} — ${bt(k)} khẳng định.<br>` +
      all.map((e, i) => e.u ? '' : `${m(`(${i + 1})`)} phải chứng minh lại (${e.x.how.replace(/\.$/, '')}).`).filter(Boolean).join('<br>') + `<br>Phải chứng minh lại: ${bt(6 - k)} khẳng định.`});
};

/* ===== Dạng 2. Công thức được dùng ngay: tam giác đều, tam giác vuông cân ===== */
const gKt2 = lv => {
  if(lv === 1){
    const k = R(2, 9), a = 2*k;
    return QB({text:`Tam giác đều ${m('ABC')} có cạnh ${m(`${a}`)} cm. Dùng công thức đã được phép, tính chiều cao ${m('AH')} và diện tích tam giác ${m('ABC')}.`,
      tpl:`<span class="eq">${m('AH =')} [_]${m('\\sqrt{3}')} cm</span><br><span class="eq">${m('S =')} [_]${m('\\sqrt{3}')} ${m('\\text{cm}^2')}</span>`, ans:[k, k*k],
      hint:`Chiều cao tam giác đều cạnh ${m('a')} là ${m('\\dfrac{a\\sqrt{3}}{2}')}; diện tích là ${m('\\dfrac{a^2\\sqrt{3}}{4}')}.`,
      sol:`${m(`AH = \\dfrac{a\\sqrt{3}}{2} = \\dfrac{${a}\\sqrt{3}}{2} =`)} ${tb(`${k}\\sqrt{3}`)} cm.<br>${m(`S = \\dfrac{a^2\\sqrt{3}}{4} = \\dfrac{${a*a}\\sqrt{3}}{4} =`)} ${tb(`${k*k}\\sqrt{3}`)} ${m('\\text{cm}^2')}.`});
  }
  if(lv === 2){
    if(R(0, 1) === 0){
      const r = R(3, 12);
      return QB({text:`Tam giác vuông cân ${m('ABC')} (vuông tại ${m('A')}) nội tiếp đường tròn bán kính ${m(`${r}`)} cm. Tính cạnh huyền, cạnh góc vuông và diện tích tam giác.`,
        tpl:`<span class="eq">${m('BC =')} [_] cm</span><br><span class="eq">${m('AB =')} [_]${m('\\sqrt{2}')} cm</span><br><span class="eq">${m('S =')} [_] ${m('\\text{cm}^2')}</span>`, ans:[2*r, r, r*r],
        hint:`Tam giác vuông có trung tuyến ứng với cạnh huyền bằng nửa cạnh huyền, nên tâm đường tròn ngoại tiếp là trung điểm cạnh huyền. Cạnh huyền của tam giác vuông cân là ${m('a\\sqrt{2}')}.`,
        sol:`Tâm đường tròn ngoại tiếp là trung điểm của ${m('BC')} nên ${m(`BC = 2R = 2\\cdot ${r} =`)} ${tb(2*r)} cm.<br>Cạnh huyền ${m('BC = AB\\sqrt{2}')} nên ${m(`AB = \\dfrac{${2*r}}{\\sqrt{2}} =`)} ${tb(`${r}\\sqrt{2}`)} cm.<br>${m(`S = \\dfrac{AB^2}{2} = \\dfrac{${2*r*r}}{2} =`)} ${tb(r*r)} ${m('\\text{cm}^2')}.`});
    }
    const r = R(2, 9), a = 2*r;
    return QB({text:`Tam giác đều ${m('ABC')} ngoại tiếp đường tròn bán kính ${m(`${r}`)} cm. Tính bán kính đường tròn ngoại tiếp, chiều cao và diện tích tam giác.`,
      tpl:`<span class="eq">${m('R =')} [_] cm</span><br><span class="eq">${m('h =')} [_] cm</span><br><span class="eq">${m('S =')} [_]${m('\\sqrt{3}')} ${m('\\text{cm}^2')}</span>`, ans:[2*r, 3*r, 3*r*r],
      hint:`Tam giác đều cạnh ${m('a')}: ${m('r = \\dfrac{a\\sqrt{3}}{6}')}, ${m('R = \\dfrac{a\\sqrt{3}}{3}')}. Tính ${m('a')} từ ${m('r')} trước.`,
      sol:`${m(`r = \\dfrac{a\\sqrt{3}}{6} = ${r}`)} nên ${m(`a = ${a}\\sqrt{3}`)} cm.<br>${m(`R = \\dfrac{a\\sqrt{3}}{3} = \\dfrac{${a}\\sqrt{3}\\cdot\\sqrt{3}}{3} =`)} ${tb(2*r)} cm; ${m(`h = \\dfrac{a\\sqrt{3}}{2} =`)} ${tb(3*r)} cm.<br>${m(`S = \\dfrac{a^2\\sqrt{3}}{4} = \\dfrac{${3*a*a}\\sqrt{3}}{4} =`)} ${tb(`${3*r*r}\\sqrt{3}`)} ${m('\\text{cm}^2')}.`});
  }
  const k = R(2, 6), Rr = 2*k, Sc = Rr*Rr, St = 3*k*k, good = m(`a = R\\sqrt{3}`);
  const fig = circleSVG({C:[{x:0, y:0, r:1, lab:'O', lp:12}], P:[[Math.cos(Math.PI/2), Math.sin(Math.PI/2), 'A', 90], [Math.cos(Math.PI*7/6), Math.sin(Math.PI*7/6), 'B', 210], [Math.cos(Math.PI*11/6), Math.sin(Math.PI*11/6), 'C', -30]],
    S:[[0, 1, Math.cos(Math.PI*7/6), Math.sin(Math.PI*7/6)], [Math.cos(Math.PI*7/6), Math.sin(Math.PI*7/6), Math.cos(Math.PI*11/6), Math.sin(Math.PI*11/6)], [Math.cos(Math.PI*11/6), Math.sin(Math.PI*11/6), 0, 1]]});
  return QS({direct:true, fig,
    text:`Tam giác đều ${m('ABC')} nội tiếp đường tròn ${m('(O)')} bán kính ${m(`${Rr}`)} cm. Tính diện tích phần hình tròn nằm ngoài tam giác (kết quả có dạng ${m('a\\pi - b\\sqrt{3}')}).`,
    hint:`Phần cần tìm = diện tích hình tròn − diện tích tam giác đều. Tính cạnh tam giác đều từ ${m('R')} bằng công thức đã được phép dùng.`,
    steps:[
      {tag:'Cạnh tam giác', ask:`Từ ${m('R = \\dfrac{a\\sqrt{3}}{3}')}, cạnh ${m('a')} của tam giác đều là`, opts:[good, m('a = R\\sqrt{2}'), m('a = 2R'), m('a = \\dfrac{R\\sqrt{3}}{3}')], ans:good, hint:`Nhân hai vế với ${m('\\dfrac{3}{\\sqrt{3}} = \\sqrt{3}')}.`},
      {tag:'Tam giác', ask:`Tính diện tích tam giác đều ${m('ABC')} với ${m(`a = ${Rr}\\sqrt{3}`)} cm.`, tpl:`${m('S_{ABC} =')} [_]${m('\\sqrt{3}')} cm²`, ans:[St], hint:`${m('S = \\dfrac{a^2\\sqrt{3}}{4}')}.`},
      {tag:'Hình tròn', ask:`Tính diện tích hình tròn ${m('(O)')}.`, tpl:`${m('S_{(O)} =')} [_]${m('\\pi')} cm²`, ans:[Sc], hint:`${m('S = \\pi R^2')}.`},
      {tag:'Đáp số', ask:`Diện tích phần hình tròn nằm ngoài tam giác.`, tpl:`${m('S =')} [_]${m('\\pi -')} [_]${m('\\sqrt{3}')} cm²`, ans:[Sc, St], hint:`Lấy diện tích hình tròn trừ diện tích tam giác.`}
    ],
    sol:`${m(`R = \\dfrac{a\\sqrt{3}}{3}`)} nên ${m(`a = R\\sqrt{3} = ${Rr}\\sqrt{3}`)} cm.<br>${m(`S_{ABC} = \\dfrac{a^2\\sqrt{3}}{4} = \\dfrac{${3*Rr*Rr}\\sqrt{3}}{4} = ${St}\\sqrt{3}`)}; ${m(`S_{(O)} = \\pi\\cdot ${Rr}^2 = ${Sc}\\pi`)}.<br>${m('S =')} ${tb(`${Sc}\\pi - ${St}\\sqrt{3}`)} ${m('\\text{cm}^2')}.`});
};

/* ===== Dạng 3. Trung tuyến bằng nửa cạnh ⇒ tam giác vuông (được dùng ngay) ===== */
const KT3 = [];
for(let p = 6; p <= 60; p++) for(let q = p + 1; q <= 60; q++){
  const r = Math.round(Math.hypot(p, q));
  if(r*r === p*p + q*q && r % 2 === 0 && (p*q) % 4 === 0) KT3.push([p, q, r]);
}
const gKt3 = lv => {
  let [p, q, r] = pick(KT3);
  if(R(0, 1)) [p, q] = [q, p];
  const half = r/2, head = `Cho tam giác ${m('ABC')}, ${m('M')} là trung điểm của ${m('BC')}`;
  if(lv === 1){
    return QB({text:`${head}, ${m(`AM = ${half}`)} cm, ${m(`AB = ${p}`)} cm, ${m(`BC = ${r}`)} cm. Tính ${m('AC')}.`,
      tpl:`${m('AC =')} [_] cm`, ans:[q],
      hint:`So sánh ${m('AM')} với nửa cạnh ${m('BC')} để biết tam giác ${m('ABC')} có góc vuông ở đâu, rồi dùng Pythagore.`,
      sol:`${m(`AM = ${half} = \\dfrac{${r}}{2} = \\dfrac{BC}{2}`)}: trung tuyến bằng nửa cạnh ${m('BC')} nên tam giác ${m('ABC')} vuông tại ${m('A')} (được dùng trực tiếp).<br>${m(`AC^2 = BC^2 - AB^2 = ${r*r} - ${p*p} = ${q*q}`)} nên ${m('AC =')} ${tb(q)} cm.`});
  }
  if(lv === 2){
    return QB({text:`${head}, ${m(`AB = ${p}`)} cm, ${m(`AC = ${q}`)} cm và ${m('AM = \\dfrac{BC}{2}')}. Tính ${m('BC')}, ${m('AM')} và diện tích tam giác ${m('ABC')}.`,
      tpl:`<span class="eq">${m('BC =')} [_] cm</span><br><span class="eq">${m('AM =')} [_] cm</span><br><span class="eq">${m('S =')} [_] ${m('\\text{cm}^2')}</span>`, ans:[r, half, p*q/2],
      hint:`${m('AM = \\dfrac{BC}{2}')} cho biết tam giác ${m('ABC')} vuông ở đỉnh nào; hai cạnh góc vuông là hai cạnh đã cho.`,
      sol:`Trung tuyến ${m('AM = \\dfrac{BC}{2}')} nên tam giác ${m('ABC')} vuông tại ${m('A')} (được dùng trực tiếp).<br>${m(`BC^2 = ${p}^2 + ${q}^2 = ${r*r}`)} nên ${m('BC =')} ${tb(r)} cm, ${m(`AM = \\dfrac{BC}{2} =`)} ${tb(half)} cm.<br>${m(`S = \\dfrac{1}{2}\\cdot AB\\cdot AC = \\dfrac{1}{2}\\cdot ${p}\\cdot ${q} =`)} ${tb(p*q/2)} ${m('\\text{cm}^2')}.`});
  }
  const good = m('90^\\circ'), s = p*q/2;
  return QS({direct:true,
    text:`${head}, ${m(`AM = ${half}`)} cm, ${m(`AB = ${p}`)} cm, ${m(`BC = ${r}`)} cm. Tính diện tích tam giác ${m('ABM')}.`,
    hint:`Chứng minh góc ${m('A')} vuông, tìm ${m('AC')}, tính diện tích tam giác ${m('ABC')}; trung tuyến ${m('AM')} chia tam giác thành hai phần có cùng diện tích (chung đường cao từ ${m('A')}, hai đáy ${m('BM = MC')}).`,
    steps:[
      {tag:'Góc A', ask:`Vì ${m(`AM = ${half} = \\dfrac{BC}{2}`)}, số đo góc ${m('\\widehat{BAC}')} là`, opts:[good, m('60^\\circ'), m('45^\\circ'), m('120^\\circ')], ans:good, hint:`Trung tuyến bằng nửa cạnh đối diện.`},
      {tag:'Cạnh AC', ask:`Tính ${m('AC')}.`, tpl:`${m('AC =')} [_] cm`, ans:[q], hint:`${m('AC^2 = BC^2 - AB^2')}.`},
      {tag:'Tam giác ABC', ask:`Tính diện tích tam giác ${m('ABC')}.`, tpl:`${m('S_{ABC} =')} [_] cm²`, ans:[s], hint:`Nửa tích hai cạnh góc vuông.`},
      {tag:'Tam giác ABM', ask:`Tính diện tích tam giác ${m('ABM')}.`, tpl:`${m('S_{ABM} =')} [_] cm²`, ans:[s/2], hint:`${m('BM = \\dfrac{BC}{2}')} và chung đường cao hạ từ ${m('A')}.`}
    ],
    sol:`${m(`AM = \\dfrac{BC}{2}`)} nên ${m('\\widehat{BAC} = 90^\\circ')}. ${m(`AC = \\sqrt{${r}^2 - ${p}^2} = ${q}`)} cm.<br>${m(`S_{ABC} = \\dfrac{1}{2}\\cdot ${p}\\cdot ${q} = ${s}`)}.<br>Hai tam giác ${m('ABM')}, ${m('ACM')} chung đường cao hạ từ ${m('A')} và có đáy ${m('BM = MC')} nên ${m('S_{ABM} = \\dfrac{1}{2}S_{ABC} =')} ${tb(s/2)} ${m('\\text{cm}^2')}.`});
};

/* ===== Dạng 4. Phải chứng minh lại: tan = sin/cos, sin² + cos² = 1 (qua tam giác vuông) ===== */
const KT4 = [[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25], [20, 21, 29]];
const frA = (a, b) => ({frac:[a, b], mode:'simplest'});
const gKt4 = lv => {
  if(lv === 1){
    const [p, q, h] = pick(KT4), s = R(1, 3), AB = p*s, AC = q*s;
    const fig = rtTriSVG({n:['A', 'B', 'C'], w:AC, h:AB, ab:`${AB}`, ac:`${AC}`, bc:'?', aC:true});
    return QB({text:`Tam giác ${m('ABC')} vuông tại ${m('A')} có ${m(`AB = ${AB}`)} cm, ${m(`AC = ${AC}`)} cm. Tính ${m('BC')}, ${m('\\sin C')} và ${m('\\cos C')} (viết phân số tối giản).`, fig,
      tpl:`<span class="eq">${m('BC =')} [_] cm</span><br><span class="eq">${m('\\sin C =')} [F]</span><br><span class="eq">${m('\\cos C =')} [F]</span>`, ans:[h*s, frA(p, h), frA(q, h)],
      hint:`Tính ${m('BC')} bằng Pythagore; ${m('\\sin C')} là tỉ số cạnh đối trên cạnh huyền, ${m('\\cos C')} là cạnh kề trên cạnh huyền.`,
      sol:`${m(`BC^2 = ${AB}^2 + ${AC}^2 = ${h*s*h*s}`)} nên ${m('BC =')} ${tb(h*s)} cm.<br>${m(`\\sin C = \\dfrac{AB}{BC} = \\dfrac{${AB}}{${h*s}} =`)} ${tb(tfrac(p, h))}; ${m(`\\cos C = \\dfrac{AC}{BC} = \\dfrac{${AC}}{${h*s}} =`)} ${tb(tfrac(q, h))}.`});
  }
  if(lv === 2){
    const [p, q, h] = pick(KT4), sw = R(0, 1) === 1, o = sw ? q : p, k = sw ? p : q;
    return QB({text:`Cho góc nhọn ${m('\\alpha')} có ${m(`\\sin\\alpha = \\dfrac{${o}}{${h}}`)}. Không dùng công thức ${m('\\sin^2\\alpha + \\cos^2\\alpha = 1')} (chưa được dùng ngay), hãy dựng tam giác vuông có góc ${m('\\alpha')} để tính ${m('\\cos\\alpha')} và ${m('\\tan\\alpha')} (phân số tối giản).`,
      tpl:`<span class="eq">${m('\\cos\\alpha =')} [F]</span><br><span class="eq">${m('\\tan\\alpha =')} [F]</span>`, ans:[frA(k, h), frA(o, k)],
      hint:`Dựng tam giác vuông có cạnh đối của ${m('\\alpha')} bằng ${o} và cạnh huyền bằng ${h}; tìm cạnh kề bằng Pythagore.`,
      sol:`Dựng tam giác vuông có góc nhọn ${m('\\alpha')}, cạnh đối ${m(`${o}`)} và cạnh huyền ${m(`${h}`)} (vì ${m('\\sin\\alpha = \\dfrac{\\text{đối}}{\\text{huyền}}')}).<br>Cạnh kề: ${m(`\\sqrt{${h}^2 - ${o}^2} = \\sqrt{${k*k}} = ${k}`)}.<br>${m(`\\cos\\alpha = \\dfrac{\\text{kề}}{\\text{huyền}} =`)} ${tb(tfrac(k, h))}; ${m(`\\tan\\alpha = \\dfrac{\\text{đối}}{\\text{kề}} =`)} ${tb(tfrac(o, k))}.`});
  }
  let ex;
  for(let tries = 0; tries < 4000; tries++){
    const [p, q, h] = pick(KT4), sw = R(0, 1) === 1, o = sw ? q : p, k = sw ? p : q;
    const a = R(1, 5), b = R(1, 5), c = R(1, 5), d = R(-4, 4);
    if(d === 0) continue;
    const num = a*o + b*k, den = c*o + d*k;
    if(den <= 0 || num % den !== 0 || num/den < 1 || num/den > 9) continue;
    ex = {o, k, h, a, b, c, d, v:num/den, num, den}; break;
  }
  const {o, k, h, a, b, c, d, v, num, den} = ex;
  const expr = `\\dfrac{${tpoly([a, '\\sin\\alpha'], [b, '\\cos\\alpha'])}}{${tpoly([c, '\\sin\\alpha'], [d, '\\cos\\alpha'])}}`;
  const optsH = [...new Set([h, k, o, o + k])], fo = (u, w) => [...new Set([tfrac(u, w), tfrac(w - 1, w), tfrac(o, k), tfrac(k, o), tfrac(u + 1, w)])].slice(0, 4).map(m);
  if(!fo(o, h).includes(m(tfrac(o, h))) || !fo(k, h).includes(m(tfrac(k, h)))) throw new Error('kt4 opts');
  return QS({direct:true,
    text:`Cho góc nhọn ${m('\\alpha')} có ${m(`\\tan\\alpha = \\dfrac{${o}}{${k}}`)}. Tính ${m(`P = ${expr}`)}. (Chưa được dùng ngay ${m('\\tan = \\dfrac{\\sin}{\\cos}')}: hãy dựng tam giác vuông.)`,
    hint:`Dựng tam giác vuông có cạnh đối ${o}, cạnh kề ${k} (vì ${m('\\tan\\alpha = \\dfrac{\\text{đối}}{\\text{kề}}')}), tính cạnh huyền rồi suy ra ${m('\\sin\\alpha')}, ${m('\\cos\\alpha')}.`,
    steps:[
      {tag:'Cạnh huyền', ask:`Tam giác vuông có cạnh đối ${m(`${o}`)}, cạnh kề ${m(`${k}`)}. Cạnh huyền bằng`, opts:optsH.map(x => m(`${x}`)), ans:m(`${h}`), hint:`Pythagore: ${m('\\text{huyền}^2 = \\text{đối}^2 + \\text{kề}^2')}.`},
      {tag:'sin', ask:`Tính ${m('\\sin\\alpha')} (cạnh đối chia cạnh huyền).`, opts:fo(o, h), ans:m(tfrac(o, h)), hint:`Cạnh đối chia cạnh huyền.`},
      {tag:'cos', ask:`Tính ${m('\\cos\\alpha')} (cạnh kề chia cạnh huyền).`, opts:fo(k, h), ans:m(tfrac(k, h)), hint:`Cạnh kề chia cạnh huyền.`},
      {tag:'Giá trị P', ask:`Thay vào ${m('P')} và tính.`, tpl:`${m('P =')} [_]`, ans:[v], hint:`Quy đồng tử và mẫu; ${m(`\\dfrac{${o}}{${h}}`)} và ${m(`\\dfrac{${k}}{${h}}`)} có cùng mẫu.`}
    ],
    sol:`Dựng tam giác vuông có cạnh đối ${m(`${o}`)}, cạnh kề ${m(`${k}`)}: cạnh huyền ${m(`\\sqrt{${o}^2 + ${k}^2} = ${h}`)}.<br>${m(`\\sin\\alpha = \\dfrac{${o}}{${h}}`)}, ${m(`\\cos\\alpha = \\dfrac{${k}}{${h}}`)}.<br>${m(`P = \\dfrac{${a}\\cdot\\frac{${o}}{${h}} + ${b}\\cdot\\frac{${k}}{${h}}}{${c}\\cdot\\frac{${o}}{${h}} ${d < 0 ? '-' : '+'} ${Math.abs(d)}\\cdot\\frac{${k}}{${h}}} = \\dfrac{${num}}{${den}} =`)} ${tb(v)}.`});
};

/* ===== Dạng 5. Đường kính – dây: chứng minh lại rồi tính ===== */
const KT5 = [];
for(let Rr = 5; Rr <= 40; Rr++){
  const pairs = [];
  for(let a = 1; a < Rr; a++){ const d = Math.round(Math.sqrt(Rr*Rr - a*a)); if(d > 0 && d*d + a*a === Rr*Rr) pairs.push([a, d]); }
  if(pairs.length >= 2) KT5.push({R:Rr, pairs});
}
const figChord = (a, d) => circleSVG({C:[{x:0, y:0, r:Math.sqrt(a*a + d*d), lab:'O', lp:12}], P:[[-a, -d, 'A', 200], [a, -d, 'B', -20], [0, -d, 'H', -90]],
  S:[[-a, -d, a, -d], [0, 0, 0, -d], [0, 0, -a, -d, true]], right:[[0, -d, 0]]});
const why5 = `Tam giác ${m('OAB')} cân tại ${m('O')} (${m('OA = OB = R')}), ${m('OH')} là đường cao nên cũng là trung tuyến: ${m('HA = HB')}.`;
const gKt5 = lv => {
  const cfg = pick(KT5), Rr = cfg.R, [a, d] = pick(cfg.pairs);
  if(lv === 1){
    return QB({text:`Đường tròn ${m(`(O;${Rr})`)} cm có dây ${m('AB')}; ${m('H')} là chân đường vuông góc hạ từ ${m('O')} xuống ${m('AB')}, ${m(`OH = ${d}`)} cm. Tính độ dài dây ${m('AB')}.`, fig:figChord(a, d),
      tpl:`${m('AB =')} [_] cm`, ans:[2*a],
      hint:`Chứng minh ${m('H')} là trung điểm ${m('AB')} (tam giác ${m('OAB')} cân), rồi dùng Pythagore trong tam giác ${m('OHA')}.`,
      sol:`${why5}<br>${m(`HA^2 = OA^2 - OH^2 = ${Rr}^2 - ${d}^2 = ${a*a}`)} nên ${m(`HA = ${a}`)} cm.<br>${m(`AB = 2HA =`)} ${tb(2*a)} cm.`});
  }
  if(lv === 2){
    if(R(0, 1) === 0){
      return QB({text:`Đường tròn ${m(`(O;${Rr})`)} cm có dây ${m(`AB = ${2*a}`)} cm. Tính khoảng cách ${m('OH')} từ tâm ${m('O')} đến dây ${m('AB')} (${m('OH \\perp AB')} tại ${m('H')}).`, fig:figChord(a, d),
        tpl:`${m('OH =')} [_] cm`, ans:[d],
        hint:`Chứng minh ${m('H')} là trung điểm ${m('AB')}, tính ${m('HA')}, rồi Pythagore trong tam giác ${m('OHA')}.`,
        sol:`${why5}<br>${m(`HA = \\dfrac{AB}{2} = ${a}`)} cm.<br>${m(`OH^2 = OA^2 - HA^2 = ${Rr}^2 - ${a}^2 = ${d*d}`)} nên ${m('OH =')} ${tb(d)} cm.`});
    }
    return QB({text:`Dây ${m(`AB = ${2*a}`)} cm của đường tròn ${m('(O)')} cách tâm ${m('O')} một khoảng ${m(`OH = ${d}`)} cm (${m('OH \\perp AB')} tại ${m('H')}). Tính bán kính ${m('R')} và chu vi đường tròn (dạng ${m('a\\pi')}).`, fig:figChord(a, d),
      tpl:`<span class="eq">${m('R =')} [_] cm</span><br><span class="eq">${m('C =')} [_]${m('\\pi')} cm</span>`, ans:[Rr, 2*Rr],
      hint:`Chứng minh ${m('H')} là trung điểm ${m('AB')}, rồi Pythagore trong tam giác ${m('OHA')} để tìm ${m('OA')}.`,
      sol:`${why5}<br>${m(`HA = ${a}`)} cm; ${m(`OA^2 = OH^2 + HA^2 = ${d}^2 + ${a}^2 = ${Rr*Rr}`)} nên ${m('R =')} ${tb(Rr)} cm.<br>${m(`C = 2\\pi R =`)} ${tb(`${2*Rr}\\pi`)} cm.`});
  }
  const [a2, d2] = pick(cfg.pairs.filter(x => x[0] !== a)), same = R(0, 1) === 0, dist = same ? Math.abs(d - d2) : d + d2;
  if(same && d === d2) return gKt5(3);
  const y2 = same ? -d2 : d2;
  const fig = circleSVG({C:[{x:0, y:0, r:Rr, lab:'O', lp:12}], P:[[-a, -d, 'A', 200], [a, -d, 'B', -20], [-a2, y2, 'C', 160], [a2, y2, 'D', 20], [0, -d, 'H', -80], [0, y2, 'K', same ? -80 : 80]],
    S:[[-a, -d, a, -d], [-a2, y2, a2, y2], [0, -d, 0, y2]]});
  return QS({direct:true, fig,
    text:`Đường tròn ${m(`(O;${Rr})`)} cm có hai dây song song ${m(`AB = ${2*a}`)} cm và ${m(`CD = ${2*a2}`)} cm, hai dây nằm ${same ? '<b>cùng phía</b>' : '<b>khác phía</b>'} đối với tâm ${m('O')}. Đường thẳng qua ${m('O')} vuông góc với hai dây cắt ${m('AB, CD')} tại ${m('H, K')}. Tính khoảng cách ${m('HK')} giữa hai dây.`,
    hint:`Chứng minh ${m('H, K')} là trung điểm các dây (tam giác cân), tính ${m('OH')}, ${m('OK')} bằng Pythagore; ${same ? 'cùng phía thì trừ' : 'khác phía thì cộng'}.`,
    steps:[
      {tag:'HA', ask:`${m('H')} là trung điểm ${m('AB')} (tam giác ${m('OAB')} cân, ${m('OH')} là đường cao nên là trung tuyến). Tính ${m('HA')}.`, tpl:`${m('HA =')} [_] cm`, ans:[a], hint:`${m('HA = \\dfrac{AB}{2}')}.`},
      {tag:'OH', ask:`Tính ${m('OH')}.`, tpl:`${m('OH =')} [_] cm`, ans:[d], hint:`${m('OH^2 = OA^2 - HA^2')}.`},
      {tag:'OK', ask:`Tương tự, tính ${m('OK')} (${m(`KC = ${a2}`)} cm).`, tpl:`${m('OK =')} [_] cm`, ans:[d2], hint:`${m('OK^2 = OC^2 - KC^2')}.`},
      {tag:'HK', ask:`${same ? `Hai dây cùng phía đối với ${m('O')}` : `Hai dây khác phía đối với ${m('O')}`}, tính ${m('HK')}.`, tpl:`${m('HK =')} [_] cm`, ans:[dist], hint: same ? `${m('H, K')} cùng phía của ${m('O')} nên ${m('HK = |OH - OK|')}.` : `${m('O')} nằm giữa ${m('H, K')} nên ${m('HK = OH + OK')}.`}
    ],
    sol:`${why5} Tương tự ${m('K')} là trung điểm ${m('CD')}.<br>${m(`HA = ${a}`)}, ${m(`OH = \\sqrt{${Rr}^2 - ${a}^2} = ${d}`)} cm; ${m(`KC = ${a2}`)}, ${m(`OK = \\sqrt{${Rr}^2 - ${a2}^2} = ${d2}`)} cm.<br>` + (same ? `Hai dây cùng phía: ${m(`HK = |${d} - ${d2}| =`)} ` : `Hai dây khác phía: ${m(`HK = ${d} + ${d2} =`)} `) + `${tb(dist)} cm.`});
};

lesson(6,'on-thi-kien-thuc-thong-nhat','Kiến thức thống nhất. Được dùng ngay hay phải chứng minh lại','Ôn tuyển sinh: phân loại kiến thức được dùng trực tiếp và phải chứng minh lại; công thức tam giác đều, vuông cân; trung tuyến bằng nửa cạnh; sin – cos – tan; đường kính và dây.',[gKt1,gKt2,gKt3,gKt4,gKt5], {intro:[
  {t:`Được dùng trực tiếp`, b:`<ul><li>Tính chất tam giác cân, vuông cân, đều; hai góc cùng phụ (cùng bù) với một góc thì bằng nhau.</li><li>Công thức độ dài, bán kính đường tròn ngoại tiếp – nội tiếp, diện tích của tam giác vuông cân và tam giác đều: ${tm('S = \\dfrac{a^2\\sqrt{3}}{4}')}, ${tm('R = \\dfrac{a\\sqrt{3}}{3}')}, ${tm('r = \\dfrac{a\\sqrt{3}}{6}')}.</li><li>Tam giác có trung tuyến bằng nửa cạnh tương ứng thì vuông.</li><li>Các chú ý và nhận xét về góc nội tiếp trong SGK (chắn nửa đường tròn, cùng chắn một cung, bằng nửa góc ở tâm).</li></ul>`, warn:`Chỉ được dùng đúng những gì thuộc danh sách này; “nghe quen” chưa đủ để viện dẫn.`, ex:`Gặp tam giác đều hay vuông cân trong hình, ghi ngay công thức rồi thay số, không cần chứng minh.`},
  {t:`Phải chứng minh lại`, b:`<ul><li>Tính chất đường phân giác ngoài của tam giác.</li><li>Hệ thức cạnh – đường cao trong tam giác vuông: ${tm('AB^2 = BH\\cdot BC')}, ${tm('AH^2 = BH\\cdot CH')}, ${tm('AH\\cdot BC = AB\\cdot AC')}, ${tm('\\dfrac{1}{AH^2} = \\dfrac{1}{AB^2} + \\dfrac{1}{AC^2}')}.</li><li>${tm('\\tan\\alpha = \\dfrac{\\sin\\alpha}{\\cos\\alpha}')} và ${tm('\\sin^2\\alpha + \\cos^2\\alpha = 1')}.</li><li>Đường kính vuông góc dây thì chia đôi dây (và ngược lại); các dấu hiệu nhận biết tứ giác nội tiếp.</li></ul>`, warn:`Viết thẳng “theo hệ thức lượng” hoặc “vì tứ giác có tổng hai góc đối bằng ${tm('180^\\circ')}” mà không chứng minh sẽ mất điểm.`, ex:`Chứng minh lại thường chỉ cần 1–2 dòng: tam giác đồng dạng (g.g), diện tích hai cách, Pythagore, hoặc tam giác cân có đường cao là trung tuyến.`},
  {t:`Cách chứng minh lại nhanh`, b:`<ul><li>${tm('AB^2 = BH\\cdot BC')}: từ ${tm('\\triangle HBA \\sim \\triangle ABC')} (g.g).</li><li>${tm('AH\\cdot BC = AB\\cdot AC')}: diện tích tam giác ${tm('ABC')} tính theo hai cách.</li><li>${tm('\\tan\\alpha')}, ${tm('\\sin^2 + \\cos^2')}: viết bằng tỉ số cạnh của tam giác vuông, dùng Pythagore.</li><li>Đường kính – dây: tam giác ${tm('OAB')} cân tại ${tm('O')}, ${tm('OH')} vừa là đường cao vừa là trung tuyến.</li></ul>`, warn:`Khi bài cho ${tm('\\sin\\alpha')} (hoặc ${tm('\\tan\\alpha')}) rồi hỏi các tỉ số còn lại, đừng dùng ${tm('\\sin^2\\alpha + \\cos^2\\alpha = 1')}; hãy dựng tam giác vuông.`, ex:`Cho ${tm('\\tan\\alpha = \\dfrac{p}{q}')}: lấy cạnh đối ${tm('p')}, cạnh kề ${tm('q')}, tính cạnh huyền; mọi tỉ số hiện ra ngay.`}
]});

}

})();
