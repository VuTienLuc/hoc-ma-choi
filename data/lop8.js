/* =====================================================================
   DỮ LIỆU LỚP 8 – Toán, Kết nối tri thức
   Chương I. Đa thức (Ôn tập chương I)
   Chương II. Hằng đẳng thức đáng nhớ và ứng dụng
   Bài 6 Hiệu hai bình phương. Bình phương của một tổng hay một hiệu
   Bài 7 Lập phương của một tổng. Lập phương của một hiệu
   Bài 8 Tổng và hiệu hai lập phương · Bài 9 Phân tích đa thức thành nhân tử
   Chương III. Tứ giác (Bài 10–14): hình vẽ geoSVG có kí hiệu cạnh bằng nhau, song song, góc
   Mỗi dạng bài: lv => câu hỏi. Chọn đáp án trước rồi mới dựng đề. Công thức LaTeX (tm/td/tb, core.js).
   ===================================================================== */
(() => {
const G = App.addGrade({
  id: 'lop8', name: 'Lớp 8', subject: 'Toán', book: 'Kết nối tri thức',
  topics: [ {id:1, hk:1, name:'Đa thức'}, {id:2, hk:1, name:'Hằng đẳng thức đáng nhớ và ứng dụng'} ],
});
const lesson = G.lesson;

/* ---------- Tiện ích đa thức (LaTeX) ---------- */
const sR = (a,b) => pick([-1,1])*R(a,b);
const P = (...t) => tpoly(...t);
const pw = (v,n) => !v || !n ? '' : n === 1 ? v : `${v}^${n}`;
const mono = (u,i,v,j) => pw(u,i) + pw(v,j);                         // u^i v^j
const bin = (p,u,q,v) => `(${P([p,u],[q,v])})`;                        // (pu + qv)
const sq2 = (p,u,q,v) => P([p*p,mono(u,2,'',0)],[2*p*q,mono(u,1,v,1)],[q*q,mono(v,2,'',0)]);
const cub = (p,u,q,v) => P([p**3,mono(u,3,'',0)],[3*p*p*q,mono(u,2,v,1)],[3*p*q*q,mono(u,1,v,2)],[q**3,mono(v,3,'',0)]);
const gp = t => /^[a-z]$|^\d+$/.test(t) ? t : `(${t})`;          // bọc ngoặc khi cần: x^2 nhưng (4x)^2
const blank = v => `<span class="eq">${tm(`${v} =`)} [_]</span>`;
const TPL2 = `<span class="eq">Nghiệm nhỏ: ${tm('x =')} [_]</span><br><span class="eq">Nghiệm lớn: ${tm('x =')} [_]</span>`;
const uniq = a => [...new Set(a)];
const HD1 = `${tm('(A + B)^2 = A^2 + 2AB + B^2')}; ${tm('(A - B)^2 = A^2 - 2AB + B^2')}; ${tm('A^2 - B^2 = (A - B)(A + B)')}`;
const HD2 = `${tm('(A + B)^3 = A^3 + 3A^2B + 3AB^2 + B^3')}; ${tm('(A - B)^3 = A^3 - 3A^2B + 3AB^2 - B^3')}`;
const HD3 = `${tm('A^3 + B^3 = (A + B)(A^2 - AB + B^2)')}; ${tm('A^3 - B^3 = (A - B)(A^2 + AB + B^2)')}`;
const pickUV = lv => lv === 3 && Math.random() < .6 ? ['x','y'] : ['x',''];
const mc = (good, bad, extra=[]) => uniq([good, ...bad, ...extra]).filter((x,i,a) => i === 0 || x !== good).slice(0,4);

/* =====================================================================
   CHƯƠNG I – ĐA THỨC (Ôn tập chương I)
   Sáu dạng cho một bộ 6 câu: đơn thức; đa thức; cộng trừ; nhân; chia; tổng hợp.
   ===================================================================== */
const xp = n => n === 0 ? '' : n === 1 ? 'x' : `x^${n}`;
const polyX = a => P(...a.map((c,i)=>[c,xp(i)]).reverse());          // a[i] là hệ số x^i
const addX = (a,b,k=1) => Array.from({length:Math.max(a.length,b.length)},(_,i)=>(a[i]||0)+k*(b[i]||0));
const mulX = (a,b) => { const c=Array(a.length+b.length-1).fill(0); a.forEach((u,i)=>b.forEach((v,j)=>c[i+j]+=u*v)); return c; };
const different = (...xs) => [...new Set(xs)];

/* Dạng 1. Đơn thức: thu gọn; hệ số, bậc; đơn thức đồng dạng. */
const gO1 = lv => {
  if(lv === 1 || (lv === 3 && Math.random() < .5)){
    const a=sR(1,7), b=sR(1,7), p=R(1,4), r=R(1,4), q=lv===1?0:R(1,3), s=lv===1?0:R(1,3);
    const coef=a*b, deg=p+r+q+s, A=mono('x',p,'y',q), B=mono('x',r,'y',s), M=mono('x',p+r,'y',q+s);
    return QB({text:`Thu gọn ${tm(`A=(${P([a,A])})(${P([b,B])})`)}, rồi xác định hệ số và bậc của đơn thức thu được.`,
      tpl:`Hệ số: [_] &nbsp; Bậc: [_]`, ans:[coef,deg],
      hint:`Nhân các hệ số; với cùng biến, dùng ${tm('x^m\\cdot x^n=x^{m+n}')}. Bậc là tổng số mũ của các biến sau khi thu gọn.`,
      sol:`${tm(`A=(${a})\\cdot(${b})\\cdot x^{${p}+${r}}${q+s?`y^{${q}+${s}}`:''}=${P([coef,M])}`)}. Hệ số là ${tb(coef)}; bậc là ${tm(`${p+r}+${q+s}=`)} ${tb(deg)}.`});
  }
  let a,b,c,sum; do{a=sR(1,9);b=sR(1,9);c=sR(1,9);sum=a+b+c;}while(!sum);
  const p=R(1,4), q=R(1,3), M=mono('x',p,'y',q), e=P([a,M],[b,M],[c,M]);
  return QB({text:`Thu gọn tổng các đơn thức đồng dạng ${td(`B=${e}`)}`,
    tpl:`${tm('B=')} [_]${tm(M)}`, ans:[sum],
    hint:'Các đơn thức có cùng phần biến. Chỉ cộng các hệ số rồi giữ nguyên phần biến.',
    sol:`${tm(`B=(${a}${b>=0?'+':''}${b}${c>=0?'+':''}${c})${M}=${sum}${M}`)}. Hệ số cần điền là ${tb(sum)}.`});
};

/* Dạng 2. Đa thức: thu gọn, tìm bậc, tính giá trị. */
const gO2 = lv => {
  let a,b,c,d,A,C; do{a=sR(1,7);b=sR(1,7);c=sR(1,7);d=sR(1,7);A=a+b;C=c+d;}while(!A||!C);
  const k=sR(1,9), raw=P([a,'x^2y'],[c,'xy'],[b,'x^2y'],[d,'xy'],[k,'']), good=P([A,'x^2y'],[C,'xy'],[k,'']);
  if(lv === 1){
    return QB({text:`Thu gọn đa thức ${tm(`P=${raw}`)}, rồi điền các hệ số và bậc.`,
      tpl:`Hệ số của ${tm('x^2y')}: [_] &nbsp; Hệ số của ${tm('xy')}: [_]<br>Hệ số tự do: [_] &nbsp; Bậc của ${tm('P')}: [_]`, ans:[A,C,k,3],
      hint:'Nhóm các hạng tử đồng dạng. Bậc của đa thức đã thu gọn là bậc lớn nhất của các hạng tử còn lại.',
      sol:`${tm(`P=((${a})+(${b}))x^2y+((${c})+(${d}))xy+(${k})=${good}`)}. Các hệ số lần lượt là ${tb(`${A};\ ${C};\ ${k}`)} và bậc là ${tb(3)}.`});
  }
  const x=pick([-2,-1,1,2,3]), y=pick([-2,-1,1,2]), val=A*x*x*y+C*x*y+k;
  return QB({text:`Cho ${tm(`P=${raw}`)}. Tính giá trị của ${tm('P')} tại ${tm(`x=${x},\ y=${y}`)}.`, tpl:`${tm('P=')} [_]`, ans:[val], wide:true,
    hint:'Thu gọn đa thức trước, sau đó thay giá trị của biến. Khi thay số âm, đặt số đó trong ngoặc.',
    sol:`Thu gọn: ${tm(`P=${good}`)}.<br>Thay ${tm(`x=${x},\ y=${y}`)}: ${tm(`P=${A}\cdot(${x})^2\cdot(${y})${C>=0?'+':''}${C}\cdot(${x})\cdot(${y})${k>=0?'+':''}${k}=${val}`)}. Vậy ${tb(`P=${val}`)}.`});
};

/* Dạng 3. Cộng và trừ đa thức. */
const gO3 = lv => {
  const A=[sR(1,8),sR(1,8),R(8,12)], B=[sR(1,8),sR(1,8),R(1,3)], C=[sR(1,6),sR(1,6),R(1,3)];
  const p=polyX(A), q=polyX(B), r=polyX(C);
  if(lv < 3){ const sub=lv===2||Math.random()<.5, good=polyX(addX(A,B,sub?-1:1));
    const bad=[polyX(addX(A,B,sub?1:-1)),polyX([A[0]-(sub?B[0]:-B[0]),A[1]+B[1],A[2]+B[2]]),polyX(A.map((v,i)=>v-(B[i]||0))),polyX(A.map((v,i)=>v+(B[i]||0)))];
    const opts=mc(good,bad);
    const target=sub?`(${p})-(${q})`:`(${p})+(${q})`;
    return QC({text:`Thu gọn ${tm(target)}.`, opts:opts.map(tm), ans:tm(good),
      hint:sub?'Bỏ ngoặc sau dấu trừ: đổi dấu tất cả hạng tử của đa thức Q, rồi nhóm các hạng tử đồng dạng.':'Bỏ ngoặc, giữ nguyên dấu rồi nhóm các hạng tử đồng dạng.',
      sol:sub?`${tm(`P-Q=(${p})-(${q})=${good}`)}. Vậy kết quả là ${tb(good)}.`:`${tm(`P+Q=(${p})+(${q})=${good}`)}. Vậy kết quả là ${tb(good)}.`});
  }
  const good=polyX(addX(addX(A,B,-1),C,1));
  const bad=[polyX(addX(addX(A,B,1),C,-1)),polyX(addX(addX(A,B,-1),C,-1)),polyX(addX(addX(A,B,1),C,1)),polyX(addX(addX(A,C,-1),B,1))];
  const target=`(${p})-((${q})-(${r}))`;
  return QC({text:`Thu gọn ${tm(target)}.`, opts:mc(good,bad).map(tm), ans:tm(good),
    hint:`Dùng ${tm('A-(B-C)=A-B+C')}: đa thức ${tm('B')} đổi dấu, đa thức ${tm('C')} giữ dấu cộng.`,
    sol:`${tm(`A-(B-C)=A-B+C=(${p})-(${q})+(${r})=${good}`)}. Đáp án: ${tb(good)}.`});
};

/* Dạng 4. Phép nhân đa thức. */
const gO4 = lv => {
  if(lv === 1){
    const a=R(1,8), b=R(1,8), p=R(1,4), q=R(1,4), good=P([a*b,xp(p+q)]), e=`(${P([a,xp(p)])})(${P([b,xp(q)])})`;
    const bad=[P([a+b,xp(p+q)]),P([a*b,xp(p*q)]),P([a*b,xp(Math.abs(p-q))]),P([a*b+1,xp(p+q)])];
    return QC({text:`Thực hiện phép nhân ${tm(e)}.`, opts:mc(good,bad).map(tm), ans:tm(good),
      hint:'Nhân các hệ số và cộng số mũ của cùng biến.', sol:`${tm(`${e}=(${a})\\cdot(${b})x^{${p}+${q}}=${good}`)}. Đáp án: ${tb(good)}.`});
  }
  if(lv === 2){
    const a=R(1,6), r=R(1,3), B=[sR(1,7),sR(1,7),R(1,5)], e=`${P([a,xp(r)])}(${polyX(B)})`, C=Array(r).fill(0).concat(B.map(v=>a*v)), good=polyX(C);
    const bad=[polyX(Array(r).fill(0).concat(B)),polyX(C.map((v,i)=>i===C.length-1?v+a:v)),polyX(mulX([0,a],B)),polyX(C.map((v,i)=>i===r?v/a:v))];
    return QC({text:`Khai triển và thu gọn ${tm(e)}.`, opts:mc(good,bad).map(tm), ans:tm(good),
      hint:'Dùng tính chất phân phối: nhân đơn thức với từng hạng tử của đa thức.',
      sol:`${tm(`${e}=${B.map((v,i)=>P([a*v,xp(r+i)])).reverse().join(' + ').replaceAll(' + -',' - ')}=${good}`)}. Đáp án: ${tb(good)}.`});
  }
  const A=[sR(1,6),R(1,5)], B=[sR(1,6),sR(1,6),R(1,4)], good=polyX(mulX(A,B)), e=`(${polyX(A)})(${polyX(B)})`;
  const bad=[polyX(addX(A,B)),polyX([A[0]*B[0],A[1]*B[1],A[1]*B[2]]),polyX(mulX([A[0],A[1]+1],B)),polyX(mulX(A,[B[0],-B[1],B[2]]))];
  return QC({text:`Khai triển và thu gọn ${tm(e)}.`, opts:mc(good,bad).map(tm), ans:tm(good),
    hint:'Nhân từng hạng tử của đa thức thứ nhất với từng hạng tử của đa thức thứ hai, sau đó cộng các hạng tử đồng dạng.',
    sol:`Thực hiện đầy đủ ${tm('2\\cdot3=6')} tích thành phần rồi thu gọn, ta được ${tm(`${e}=${good}`)}. Đáp án: ${tb(good)}.`});
};

/* Dạng 5. Chia đa thức cho đơn thức. */
const gO5 = lv => {
  const k=R(2,6), r=R(1,3), s=lv===3?R(1,2):0, D=P([k,mono('x',r,'y',s)]);
  if(lv === 1){
    const a=sR(1,8), p=R(1,4), dividend=P([k*a,mono('x',r+p,'y',s)]), good=P([a,xp(p)]);
    return QB({text:`Thực hiện phép chia ${tm(`(${dividend}):(${D})`)}.`, tpl:`${tm('Thương =')} [_]${tm(xp(p))}`, ans:[a],
      hint:'Chia hệ số; với cùng biến thì lấy số mũ của số bị chia trừ số mũ của số chia.',
      sol:`${tm(`(${dividend}):(${D})=${k*a}:${k}\cdot x^{${r+p}-${r}}=${good}`)}. Hệ số cần điền là ${tb(a)}.`});
  }
  const Q=[sR(1,7),sR(1,7),sR(1,5)], good=polyX(Q), terms=Q.map((c,i)=>[k*c,mono('x',r+i,'y',s)]).reverse(), dividend=P(...terms);
  return QB({text:`Thực hiện phép chia ${td(`(${dividend}):(${D})`)}`, tpl:`Hệ số của ${tm('x^2')}: [_] &nbsp; Hệ số của ${tm('x')}: [_]<br>Hệ số tự do: [_]`, ans:[Q[2],Q[1],Q[0]],
    hint:'Chia từng hạng tử của đa thức cho đơn thức, giữ nguyên dấu giữa các thương rồi thu gọn.',
    sol:`${terms.map(([c,v],i)=>`${tm(`${P([c,v])}:(${D})=${P([c/k,xp(Q.length-1-i)])}`)}`).join('; ')}.<br>Vậy thương là ${tb(good)}; các hệ số cần điền lần lượt là ${tb(`${Q[2]};\ ${Q[1]};\ ${Q[0]}`)}.`});
};

/* Dạng 6. Bài toán tổng hợp nhiều bước: lập, thu gọn và tính giá trị đa thức. */
const gO6 = lv => {
  const a=R(2,6), b=R(2,7), x=lv===1?R(1,4):lv===2?R(2,7):R(5,12), u=a+b, v=a*b, area=u*x+v;
  const formula=`(x+${a})(x+${b})-x^2`;
  return QS({text:`Một tấm bìa hình chữ nhật có kích thước ${tm(`x+${a}`)} cm và ${tm(`x+${b}`)} cm. Cắt bỏ một hình vuông cạnh ${tm('x')} cm. Tính diện tích phần còn lại khi ${tm(`x=${x}`)}.`, direct:lv===3,
    hint:'Lập diện tích hình chữ nhật, trừ diện tích hình vuông, thu gọn đa thức rồi mới thay giá trị của biến.',
    steps:[
      {tag:'Lập biểu thức', ask:'Biểu thức nào biểu thị diện tích phần còn lại?', opts:[formula,`(x+${a})+(x+${b})-x^2`,`(x+${a})(x+${b})+x^2`,`${a+b}x-${a*b}`].map(tm), ans:tm(formula), hint:'Diện tích còn lại = diện tích hình chữ nhật − diện tích hình vuông.'},
      {tag:'Thu gọn', ask:'Thu gọn biểu thức diện tích.', tpl:`${tm('S=')} [_]${tm('x+')} [_]`, ans:[u,v], hint:`Khai triển ${tm(`(x+${a})(x+${b})`)} rồi trừ ${tm('x^2')}.`},
      {tag:'Đáp số', ask:`Thay ${tm(`x=${x}`)} và tính diện tích.`, tpl:'[_] cm²', ans:[area], hint:`Thay ${tm(`x=${x}`)} vào ${tm(`S=${u}x+${v}`)}.`}
    ], sol:`${tm(`S=(x+${a})(x+${b})-x^2=x^2+${u}x+${v}-x^2=${u}x+${v}`)}. Với ${tm(`x=${x}`)}: ${tm(`S=${u}\\cdot${x}+${v}=${area}`)}. Đáp số: ${tb(area)} cm².`});
};

lesson(1,'on-tap-c1','Ôn tập chương I','Tổng hợp: đơn thức, đa thức; cộng, trừ, nhân đa thức; chia đa thức cho đơn thức và bài toán thực tế.',[gO1,gO2,gO3,gO4,gO5,gO6]);

/* =====================================================================
   BÀI 6. Hiệu hai bình phương. Bình phương của một tổng hay một hiệu
   ===================================================================== */
const g6a = lv => {   // khai triển
  const [u,v] = pickUV(lv), p = lv === 1 ? 1 : R(2,5), q = lv === 1 ? sR(1,9) : sR(1,7);
  if(Math.random() < .35){   // (pu − qv)(pu + qv)
    const A = P([p,u]), B = v ? P([Math.abs(q),v]) : String(Math.abs(q)), e = `${bin(p,u,-Math.abs(q),v)}${bin(p,u,Math.abs(q),v)}`;
    const good = P([p*p,mono(u,2,'',0)],[-q*q,mono(v,2,'',0)]);
    const opts = mc(good, [P([p*p,mono(u,2,'',0)],[q*q,mono(v,2,'',0)]), sq2(p,u,-Math.abs(q),v), P([p,mono(u,2,'',0)],[-Math.abs(q),mono(v,2,'',0)]), P([p*p,mono(u,2,'',0)],[-2*Math.abs(q),mono(u,1,v,1)],[-q*q,mono(v,2,'',0)])]);
    return QC({text:`Khai triển ${tm(e)} được`, opts:opts.map(tm), ans:tm(good), hint:`Dùng hằng đẳng thức ${tm('(A - B)(A + B) = A^2 - B^2')}.`,
      sol:`Với ${tm(`A = ${A},\\ B = ${B}`)}: ${tm(`${e} = (${A})^2 - ${v?`(${B})`:B}^2 = `)}${tb(good)}.`}); }
  const good = sq2(p,u,q,v), a = p*p, e = `${bin(p,u,q,v)}^2`;
  const bad = [P([a,mono(u,2,'',0)],[q*q,mono(v,2,'',0)]), P([a,mono(u,2,'',0)],[p*q,mono(u,1,v,1)],[q*q,mono(v,2,'',0)]), sq2(p,u,-q,v), P([p,mono(u,2,'',0)],[2*p*q,mono(u,1,v,1)],[q*q,mono(v,2,'',0)])];
  return QC({text:`Khai triển ${tm(e)} được`, opts:mc(good,bad).map(tm), ans:tm(good), hint:`Dùng ${q>0?tm('(A + B)^2 = A^2 + 2AB + B^2'):tm('(A - B)^2 = A^2 - 2AB + B^2')}. Đừng quên hạng tử ${tm('2AB')}.`,
    sol:`${tm(`${e} = ${gp(P([p,u]))}^2 ${q>0?'+':'-'} 2\\cdot ${P([p,u])}\\cdot ${v?P([Math.abs(q),v]):Math.abs(q)} + ${v?gp(P([Math.abs(q),v])):Math.abs(q)}^2 = `)}${tb(good)}.`});
};
const g6b = lv => {   // điền vào chỗ trống
  const q = R(2,9);
  if(lv === 1){ const s = pick([1,-1]);
    return QB({text:'Điền số thích hợp vào ô trống để được một hằng đẳng thức:', tpl:`<span class="eq">${tm('x^2')} ${s>0?'+':'−'} [_]${tm(`x + ${q*q} = (x ${s>0?'+':'-'} ${q})^2`)}</span>`, ans:[2*q],
      hint:`So sánh với ${tm(`(A ${s>0?'+':'-'} B)^2 = A^2 ${s>0?'+':'-'} 2AB + B^2`)} với ${tm(`A = x,\\ B = ${q}`)}.`, sol:`${tm(`2AB = 2\\cdot x\\cdot ${q} = ${2*q}x`)}. Số cần điền: ${tb(2*q)}.`}); }
  if(lv === 2){ const p = R(2,5), s = pick([1,-1]);
    return QB({text:'Điền số thích hợp vào ô trống:', tpl:`<span class="eq">${tm(`(${p}x ${s>0?'+':'-'}`)} [_]${tm(`)^2 = ${sq2(p,'x',s*q,'')}`)}</span>`, ans:[q],
      hint:`Hạng tử cuối là ${tm('B^2')}; hoặc từ ${tm('2AB')} với ${tm(`A = ${p}x`)} suy ra ${tm('B')}.`, sol:`${tm(`B^2 = ${q*q}`)} và ${tm(`2\\cdot ${p}x\\cdot B = ${2*p*q}x`)} nên ${tm(`B = ${q}`)}. Số cần điền: ${tb(q)}.`}); }
  const p = R(2,5), r = R(1,7);
  return QB({text:'Điền số thích hợp vào các ô trống:', tpl:`<span class="eq">${tm(`(${p}x - ${r}y)(${p}x + ${r}y) =`)} [_]${tm('x^2 -')} [_]${tm('y^2')}</span>`, ans:[p*p, r*r],
    hint:`${tm('(A - B)(A + B) = A^2 - B^2')} với ${tm(`A = ${p}x,\\ B = ${r}y`)}.`, sol:`${tm(`(${p}x)^2 - (${r}y)^2 = ${p*p}x^2 - ${r*r}y^2`)}. Các số cần điền: ${tb(p*p)} và ${tb(r*r)}.`});
};
const g6c = lv => {   // tính nhanh
  if(lv === 1){ const base = pick([10,20,30,50,100]), k = sR(1,3), n = base + k;
    return QB({text:`Tính nhanh ${tm(`${n}^2`)}.`, tpl:blank(`${n}^2`), ans:[n*n], wide:true, hint:`Viết ${tm(n)} thành ${tm(`${base} ${k>0?'+':'-'} ${Math.abs(k)}`)} rồi dùng hằng đẳng thức bình phương của một ${k>0?'tổng':'hiệu'}.`,
      sol:`${tm(`${n}^2 = (${base} ${k>0?'+':'-'} ${Math.abs(k)})^2 = ${base*base} ${k>0?'+':'-'} ${2*base*Math.abs(k)} + ${k*k} = `)}${tb(n*n)}.`}); }
  if(lv === 2){ const base = pick([20,30,40,50,60,100]), k = R(1,4), a = base + k, b = base - k;
    return QB({text:`Tính nhanh ${tm(`${a}\\cdot ${b}`)}.`, tpl:blank(`${a}\\cdot ${b}`), ans:[a*b], wide:true, hint:`Viết thành ${tm(`(${base} + ${k})(${base} - ${k})`)} và dùng ${tm('(A + B)(A - B) = A^2 - B^2')}.`,
      sol:`${tm(`${a}\\cdot ${b} = (${base} + ${k})(${base} - ${k}) = ${base}^2 - ${k}^2 = ${base*base} - ${k*k} = `)}${tb(a*b)}.`}); }
  if(Math.random() < .5){ const a = R(2020,2030), b = a - 1;
    return QB({text:`Tính nhanh ${tm(`${a}^2 - ${b}^2`)}.`, tpl:blank('E'), ans:[a+b], wide:true, hint:`Dùng ${tm('A^2 - B^2 = (A - B)(A + B)')}.`,
      sol:`${tm(`${a}^2 - ${b}^2 = (${a} - ${b})(${a} + ${b}) = 1\\cdot ${a+b} = `)}${tb(a+b)}.`}); }
  const a = R(11,49), b = pick([100,50]) - a, s = a + b;
  return QB({text:`Tính nhanh ${tm(`${a}^2 + 2\\cdot ${a}\\cdot ${b} + ${b}^2`)}.`, tpl:blank('E'), ans:[s*s], wide:true, hint:`Biểu thức có dạng ${tm('A^2 + 2AB + B^2 = (A + B)^2')}.`,
    sol:`${tm(`E = (${a} + ${b})^2 = ${s}^2 = `)}${tb(s*s)}.`});
};
const g6d = lv => {   // viết dưới dạng bình phương / tích
  const [u,v] = pickUV(lv), p = lv === 1 ? 1 : R(1,4), q = sR(1,7);
  if(Math.random() < .5){ const e = sq2(p,u,q,v), good = `${bin(p,u,q,v)}^2`;
    const opts = mc(good, [`${bin(p,u,-q,v)}^2`, `${bin(p,u,q*q,v)}^2`, `${bin(p,u,-Math.abs(q),v)}${bin(p,u,Math.abs(q),v)}`, `${bin(p*p,u,q,v)}^2`]);
    return QC({text:`Viết ${tm(e)} dưới dạng bình phương của một tổng hoặc một hiệu.`, opts:opts.map(tm), ans:tm(good), hint:`Tìm ${tm('A, B')} sao cho ${tm('A^2, B^2')} là hai hạng tử bình phương; hạng tử còn lại phải bằng ${tm('\\pm 2AB')}.`,
      sol:`${tm(`${e} = ${gp(P([p,u]))}^2 ${q>0?'+':'-'} 2\\cdot ${P([p,u])}\\cdot ${v?P([Math.abs(q),v]):Math.abs(q)} + ${v?gp(P([Math.abs(q),v])):Math.abs(q)}^2 = `)}${tb(good)}.`}); }
  const r = Math.abs(q), e = P([p*p,mono(u,2,'',0)],[-r*r,mono(v,2,'',0)]), good = `${bin(p,u,-r,v)}${bin(p,u,r,v)}`;
  const opts = mc(good, [`${bin(p,u,-r,v)}^2`, `${bin(p,u,r,v)}^2`, `${bin(p*p,u,-r,v)}${bin(p*p,u,r,v)}`, `${bin(p,u,-r*r,v)}${bin(p,u,r*r,v)}`]);
  return QC({text:`Viết ${tm(e)} dưới dạng tích.`, opts:opts.map(tm), ans:tm(good), hint:`Dùng ${tm('A^2 - B^2 = (A - B)(A + B)')}.`,
    sol:`${tm(`${e} = ${gp(P([p,u]))}^2 - ${v?gp(P([r,v])):r}^2 = `)}${tb(good)}.`});
};

/* =====================================================================
   BÀI 7. Lập phương của một tổng. Lập phương của một hiệu
   ===================================================================== */
const g7a = lv => {   // khai triển
  const [u,v] = pickUV(lv), p = lv === 1 ? 1 : R(1,3), q = lv === 1 ? sR(1,4) : sR(1,3), e = `${bin(p,u,q,v)}^3`, good = cub(p,u,q,v);
  const A = P([p,u]), B = v ? P([Math.abs(q),v]) : Math.abs(q);
  const bad = [P([p**3,mono(u,3,'',0)],[q**3,mono(v,3,'',0)]), P([p**3,mono(u,3,'',0)],[3*p*q,mono(u,2,v,1)],[3*p*q,mono(u,1,v,2)],[q**3,mono(v,3,'',0)]), cub(p,u,-q,v),
    P([p**3,mono(u,3,'',0)],[p*p*q,mono(u,2,v,1)],[p*q*q,mono(u,1,v,2)],[q**3,mono(v,3,'',0)]), P([p**3,mono(u,3,'',0)],[3*p*p*q,mono(u,2,v,1)],[3*p*q*q,mono(u,1,v,2)],[-(q**3),mono(v,3,'',0)])];
  return QC({text:`Khai triển ${tm(e)} được`, opts:mc(good,bad).map(tm), ans:tm(good), hint:HD2,
    sol:`Với ${tm(`A = ${A},\\ B = ${B}`)}: ${tm(`${e} = A^3 ${q>0?'+':'-'} 3A^2B + 3AB^2 ${q>0?'+':'-'} B^3 = `)}${tb(good)}.`});
};
const g7b = lv => {   // viết dưới dạng lập phương
  const [u,v] = pickUV(lv), p = lv === 1 ? 1 : R(1,3), q = lv === 1 ? sR(1,4) : sR(1,3), e = cub(p,u,q,v), good = `${bin(p,u,q,v)}^3`;
  const bad = [`${bin(p,u,-q,v)}^3`, `${bin(p,u,3*q,v)}^3`, `${bin(p,u,q**3,v)}^3`, `${bin(p**3,u,q,v)}^3`];
  return QC({text:`Viết biểu thức ${td(e)}dưới dạng lập phương của một tổng hoặc một hiệu.`, opts:mc(good,bad).map(tm), ans:tm(good),
    hint:`Hạng tử đầu là ${tm('A^3')}, hạng tử cuối là ${tm('\\pm B^3')}; kiểm tra lại hai hạng tử giữa ${tm('3A^2B')} và ${tm('3AB^2')}. ${HD2}`,
    sol:`${tm(`${P([p**3,mono(u,3,'',0)])} = ${gp(P([p,u]))}^3`)}, ${tm(`${P([q**3,mono(v,3,'',0)])} = (${P([q,v])})^3`)} và các hạng tử giữa khớp với ${tm('3A^2B,\\ 3AB^2')}. Vậy biểu thức bằng ${tb(good)}.`});
};
const g7c = lv => {   // tính giá trị biểu thức
  const q = sR(1,3), base = lv === 1 ? 10 : lv === 2 ? pick([10,20,100]) : pick([100,1000]), x = base - q, e = cub(1,'x',q,'');
  return QB({text:`Tính giá trị của biểu thức ${td(`A = ${e}`)}tại ${tm(`x = ${x}`)}.`, tpl:blank('A'), ans:[base**3], wide:true,
    hint:`Viết ${tm('A')} dưới dạng lập phương của một ${q>0?'tổng':'hiệu'}, rồi thay ${tm(`x = ${x}`)}.`,
    sol:`${tm(`A = (x ${q>0?'+':'-'} ${Math.abs(q)})^3`)}. Với ${tm(`x = ${x}`)}: ${tm(`A = ${base}^3 = `)}${tb(base**3)}.`});
};

/* =====================================================================
   BÀI 8. Tổng và hiệu hai lập phương
   ===================================================================== */
const g8a = lv => {   // viết thành tích
  const [u,v] = pickUV(lv), p = lv === 1 ? 1 : R(1,3), q = lv === 1 ? sR(1,5) : sR(1,4), s = q > 0 ? 1 : -1, r = Math.abs(q);
  const e = P([p**3,mono(u,3,'',0)],[q**3,mono(v,3,'',0)]);
  const tri = (k) => P([p*p,mono(u,2,'',0)],[k*p*r,mono(u,1,v,1)],[r*r,mono(v,2,'',0)]);
  const good = `${bin(p,u,q,v)}(${tri(-s)})`;
  const bad = [`${bin(p,u,q,v)}(${tri(s)})`, `${bin(p,u,-q,v)}(${tri(-s)})`, `${bin(p,u,q,v)}(${tri(-2*s)})`, `${bin(p,u,-q,v)}(${tri(s)})`];
  return QC({text:`Viết ${tm(e)} dưới dạng tích.`, opts:mc(good,bad).map(tm), ans:tm(good), hint:HD3,
    sol:`${tm(`${e} = ${gp(P([p,u]))}^3 ${s>0?'+':'-'} ${v?gp(P([r,v])):r}^3`)} ${tm('=')} ${tb(good)}.`});
};
const g8b = lv => {   // rút gọn
  const p = lv === 1 ? 1 : R(1,3), q = sR(1,5), r = Math.abs(q), s = q > 0 ? 1 : -1, c = lv === 3 ? R(-9,9) : 0;
  const tri = P([p*p,'x^2'],[-s*p*r,'x'],[r*r,'']), e = `${bin(p,'x',q,'')}(${tri}) - ${p**3===1?'':p**3}x^3${c ? ` ${c>0?'+':'-'} ${Math.abs(c)}` : ''}`;
  const v = q**3 + c;
  return QB({text:`Rút gọn biểu thức ${td(`A = ${e}`)}`, tpl:blank('A'), ans:[v], hint:`Nhận dạng tích đầu là ${tm(q>0?'A^3 + B^3':'A^3 - B^3')} viết dưới dạng tích. ${HD3}`,
    sol:`${tm(`${bin(p,'x',q,'')}(${tri}) = ${P([p**3,'x^3'],[q**3,''])}`)}. Do đó ${tm(`A = ${P([p**3,'x^3'],[q**3,''])} - ${p**3===1?'':p**3}x^3${c?` ${c>0?'+':'-'} ${Math.abs(c)}`:''} = `)}${tb(v)}.`});
};
const g8c = lv => {   // tính giá trị
  const q = R(1,4), s = pick([1,-1]), x = lv === 1 ? R(2,6) : lv === 2 ? R(5,12) : pick([10,20,100]) , val = x**3 + s*q**3;
  const e = `(x ${s>0?'+':'-'} ${q})(${P([1,'x^2'],[-s*q,'x'],[q*q,''])})`;
  return QB({text:`Tính giá trị của biểu thức ${td(`B = ${e}`)}tại ${tm(`x = ${x}`)}.`, tpl:blank('B'), ans:[val], wide:true,
    hint:`Thu gọn trước: ${tm('B')} có dạng ${tm(s>0?'(A + B)(A^2 - AB + B^2) = A^3 + B^3':'(A - B)(A^2 + AB + B^2) = A^3 - B^3')}.`,
    sol:`${tm(`B = x^3 ${s>0?'+':'-'} ${q**3}`)}. Với ${tm(`x = ${x}`)}: ${tm(`B = ${x**3} ${s>0?'+':'-'} ${q**3} = `)}${tb(val)}.`});
};

/* =====================================================================
   BÀI 9. Phân tích đa thức thành nhân tử
   ===================================================================== */
const g9a = lv => {   // đặt nhân tử chung
  if(lv < 3){ let k,a,b; do{ k = R(2,6); a = sR(1,5); b = sR(1,7); }while(gcd(Math.abs(a),Math.abs(b)) !== 1 || a < 0);
    const two = lv === 2, e = two ? P([k*a,'x^2y'],[k*b,'xy^2']) : P([k*a,'x^2'],[k*b,'x']), cf = two ? `${k}xy` : `${k}x`;
    const inner = two ? P([a,'x'],[b,'y']) : P([a,'x'],[b,'']), good = `${cf}(${inner})`;
    const bad = [two ? `${k}x(${P([a,'x'],[b,'y'])})` : `${k}x(${P([a,'x'],[k*b,''])})`, `${cf}(${two?P([a,'x'],[-b,'y']):P([a,'x'],[-b,''])})`,
      two ? `${k}xy(${P([k*a,'x'],[k*b,'y'])})` : `x(${P([a,'x'],[k*b,''])})`, `${cf}(${two?P([a,'x^2'],[b,'y']):P([a,'x^2'],[b,''])})`];
    return QC({text:`Phân tích đa thức ${tm(e)} thành nhân tử.`, opts:mc(good,bad).map(tm), ans:tm(good), hint:'Tìm nhân tử chung của các hạng tử (ƯCLN của các hệ số và biến có mặt ở mọi hạng tử với số mũ nhỏ nhất), rồi đặt ra ngoài dấu ngoặc.',
      sol:`Nhân tử chung là ${tm(cf)}: ${tm(`${e} = ${cf}\\cdot ${two?`${P([a,'x'])}`:P([a,'x'])} ${b>0?'+':'-'} ${cf}\\cdot ${two?P([Math.abs(b),'y']):Math.abs(b)} = `)}${tb(good)}.`}); }
  const a = R(1,4), b = sR(1,6), c = R(2,5), d = sR(1,7);          // cx(x − a) + d(x − a)… dạng (x + b)
  const f = P([1,'x'],[b,'']), e = `${c}x${`(${f})`} ${d>0?'+':'-'} ${Math.abs(d)}(${f})`, good = `(${f})(${P([c,'x'],[d,''])})`;
  const bad = [`(${f})(${P([c,'x'],[-d,''])})`, `(${f})(${P([c,'x'],[d,''])})^2`.replace('^2',''), `${c}x(${f})(${P([1,'x'],[d,''])})`, `(${P([1,'x'],[-b,''])})(${P([c,'x'],[d,''])})`, `(${f})\\cdot ${c*d}x`];
  return QC({text:`Phân tích đa thức ${tm(e)} thành nhân tử.`, opts:mc(good,bad).map(tm), ans:tm(good), hint:`Nhân tử chung là cả biểu thức ${tm(`(${f})`)}.`,
    sol:`Đặt ${tm(`(${f})`)} ra ngoài: ${tm(`${e} = `)}${tb(good)}.`});
};
const g9b = lv => {   // dùng hằng đẳng thức
  const t = lv === 1 ? pick(['d2','sq']) : lv === 2 ? pick(['d2','sq','c3']) : pick(['mix','c3','d2y']);
  let e, good, bad, why;
  if(t === 'd2'){ const p = lv === 1 ? 1 : R(1,4), r = R(2,9); e = P([p*p,'x^2'],[-r*r,'']); good = `${bin(p,'x',-r,'')}${bin(p,'x',r,'')}`;
    bad = [`${bin(p,'x',-r,'')}^2`, `${bin(p*p,'x',-r,'')}${bin(p*p,'x',r,'')}`, `${bin(p,'x',-r*r,'')}${bin(p,'x',r*r,'')}`]; why = tm('A^2 - B^2 = (A - B)(A + B)'); }
  if(t === 'd2y'){ let p, r; do{ p = R(1,4); r = R(1,5); }while(p === r); e = P([p*p,'x^2'],[-r*r,'y^2']); good = `${bin(p,'x',-r,'y')}${bin(p,'x',r,'y')}`;
    bad = [`${bin(p,'x',-r,'y')}^2`, `${bin(p*p,'x',-r*r,'y')}${bin(1,'x',1,'y')}`, `${bin(p,'x',r,'y')}^2`]; why = tm('A^2 - B^2 = (A - B)(A + B)'); }
  if(t === 'sq'){ const p = lv === 1 ? 1 : R(1,3), q = sR(1,6); e = sq2(p,'x',q,''); good = `${bin(p,'x',q,'')}^2`;
    bad = [`${bin(p,'x',-q,'')}^2`, `${bin(p,'x',-Math.abs(q),'')}${bin(p,'x',Math.abs(q),'')}`, `${bin(p,'x',2*q,'')}^2`]; why = tm('A^2 \\pm 2AB + B^2 = (A \\pm B)^2'); }
  if(t === 'c3'){ const p = R(1,2), q = sR(1,4), s = q > 0 ? 1 : -1, r = Math.abs(q); e = P([p**3,'x^3'],[q**3,'']);
    const tri = k => P([p*p,'x^2'],[k*p*r,'x'],[r*r,'']); good = `${bin(p,'x',q,'')}(${tri(-s)})`;
    bad = [`${bin(p,'x',q,'')}(${tri(s)})`, `${bin(p,'x',-q,'')}(${tri(-s)})`, `${bin(p,'x',q,'')}^3`]; why = HD3; }
  if(t === 'mix'){ const a = R(2,4), b = R(1,5); let c; do{ c = R(1,5) }while(c === a); // (ax)^2 − (x + b)^2 → (ax − x − b)(ax + x + b)
    e = `${a*a}x^2 - (x + ${b})^2`; good = `(${P([a-1,'x'],[-b,''])})(${P([a+1,'x'],[b,''])})`;
    bad = [`(${P([a-1,'x'],[b,''])})(${P([a+1,'x'],[-b,''])})`, `(${P([a-1,'x'],[-b,''])})^2`, `(${P([a,'x'],[-1,'x'],[-b,''])})(${P([a,'x'],[1,'x'],[b,''])})`.replace(/\(([^)]*)\)/g,'($1)')].slice(0,2).concat([`(${P([a+1,'x'],[-b,''])})(${P([a-1,'x'],[b,''])})`]);
    why = `${tm('A^2 - B^2 = (A - B)(A + B)')} với ${tm(`A = ${a}x,\\ B = x + ${b}`)}`; }
  return QC({text:`Phân tích đa thức ${tm(e)} thành nhân tử.`, opts:mc(good,bad).map(tm), ans:tm(good), hint:`Nhận dạng hằng đẳng thức phù hợp: ${why}.`,
    sol:`Áp dụng ${why}: ${tm(`${e} = `)}${tb(good)}.`});
};
const g9c = lv => {   // nhóm hạng tử, tách hạng tử
  if(lv === 1){ const a = sR(1,7), e = `x^2 - xy ${a>0?'+':'-'} ${Math.abs(a)}x ${a>0?'-':'+'} ${Math.abs(a)}y`, good = `(x - y)(${P([1,'x'],[a,''])})`;
    const bad = [`(x + y)(${P([1,'x'],[a,''])})`, `(x - y)(${P([1,'x'],[-a,''])})`, `x(x - y)${a>0?'+':'-'}${Math.abs(a)}`, `(x - y)(${P([1,'x'],[a,'y'])})`];
    return QC({text:`Phân tích đa thức ${tm(e)} thành nhân tử.`, opts:mc(good,bad).map(tm), ans:tm(good), hint:'Nhóm hai hạng tử đầu và hai hạng tử cuối, đặt nhân tử chung từng nhóm, rồi đặt nhân tử chung lần nữa.',
      sol:`${tm(`${e} = x(x - y) ${a>0?'+':'-'} ${Math.abs(a)}(x - y) = `)}${tb(good)}.`}); }
  if(lv === 2){ const a = sR(1,6), r = R(1,6), e = `${sq2(1,'x',a,'')} - ${r===1?'':r*r}y^2`.replace('- y^2','- y^2');
    const good = `(${P([1,'x'],[a,''],[-r,'y'])})(${P([1,'x'],[a,''],[r,'y'])})`;
    const bad = [`(${P([1,'x'],[a,''],[-r,'y'])})^2`, `(${P([1,'x'],[-a,''],[-r,'y'])})(${P([1,'x'],[-a,''],[r,'y'])})`, `(${P([1,'x'],[-r,'y'])})(${P([1,'x'],[r,'y'])})`];
    return QC({text:`Phân tích đa thức ${tm(e)} thành nhân tử.`, opts:mc(good,bad).map(tm), ans:tm(good), hint:`Nhóm ba hạng tử đầu thành bình phương ${tm(`(x ${a>0?'+':'-'} ${Math.abs(a)})^2`)}, rồi dùng hiệu hai bình phương.`,
      sol:`${tm(`${e} = (${P([1,'x'],[a,''])})^2 - ${gp((r===1?'':r)+'y')}^2 = `)}${tb(good)}.`}); }
  let a,b; do{ a = sR(1,7); b = sR(1,7); }while(a === b || a + b === 0);
  const e = P([1,'x^2'],[a+b,'x'],[a*b,'']), good = `(${P([1,'x'],[a,''])})(${P([1,'x'],[b,''])})`;
  const bad = [`(${P([1,'x'],[-a,''])})(${P([1,'x'],[-b,''])})`, `(${P([1,'x'],[a+b,''])})(${P([1,'x'],[1,''])})`, `(${P([1,'x'],[a,''])})(${P([1,'x'],[-b,''])})`, `(${P([1,'x'],[a*b,''])})(${P([1,'x'],[1,''])})`];
  return QC({text:`Phân tích đa thức ${tm(e)} thành nhân tử (tách hạng tử).`, opts:mc(good,bad).map(tm), ans:tm(good),
    hint:`Tìm hai số có tổng ${tm(a+b)} và tích ${tm(a*b)}; tách hạng tử ${tm(P([a+b,'x']))} thành tổng hai hạng tử rồi nhóm.`,
    sol:`${tm(`${e} = x^2 ${a>0?'+':'-'} ${Math.abs(a)===1?'':Math.abs(a)}x ${b>0?'+':'-'} ${Math.abs(b)===1?'':Math.abs(b)}x ${a*b>0?'+':'-'} ${Math.abs(a*b)} = x(${P([1,'x'],[a,''])}) ${b>0?'+':'-'} ${Math.abs(b)}(${P([1,'x'],[a,''])}) = `)}${tb(good)}.`});
};
const g9d = lv => {   // tìm x
  let r1, r2, e, sol;
  if(lv === 1){ const k = sR(1,9); r1 = 0; r2 = k; e = P([1,'x^2'],[-k,'x']);
    sol = `${tm(`${e} = 0 \\;\\Leftrightarrow\\; x(${P([1,'x'],[-k,''])}) = 0 \\;\\Leftrightarrow\\; x = 0 \\text{ hoặc } x = ${k}`)}.`; }
  else if(lv === 2){ const a = R(-5,5), b = R(1,6); r1 = a - b; r2 = a + b; e = `${a ? `(${P([1,'x'],[-a,''])})` : 'x'}^2 - ${b*b}`;
    sol = `${tm(`${e} = 0 \\;\\Leftrightarrow\\; (${P([1,'x'],[-a-b,''])})(${P([1,'x'],[-a+b,''])}) = 0 \\;\\Leftrightarrow\\; x = ${a-b} \\text{ hoặc } x = ${a+b}`)}.`; }
  else { do{ r1 = R(-7,7); r2 = R(-7,7); }while(r1 === r2 || r1 + r2 === 0 || !r1 || !r2); e = P([1,'x^2'],[-(r1+r2),'x'],[r1*r2,'']);
    sol = `${tm(`${e} = 0 \\;\\Leftrightarrow\\; (${P([1,'x'],[-r1,''])})(${P([1,'x'],[-r2,''])}) = 0 \\;\\Leftrightarrow\\; x = ${r1} \\text{ hoặc } x = ${r2}`)}.`; }
  const lo = Math.min(r1,r2), hi = Math.max(r1,r2);
  return QB({text:`Tìm ${tm('x')}, biết ${td(`${e} = 0`)}`, tpl:TPL2, ans:[lo,hi],
    hint:`Phân tích vế trái thành nhân tử (${lv===1?'đặt nhân tử chung':lv===2?'hiệu hai bình phương':'tách hạng tử'}), rồi dùng: tích bằng 0 khi một thừa số bằng 0.`,
    sol:`${sol} Nghiệm nhỏ ${tb(lo)}, nghiệm lớn ${tb(hi)}.`});
};

lesson(2,'hieu-hai-binh-phuong','Bài 6. Hiệu hai bình phương. Bình phương của một tổng hay một hiệu','Khai triển; điền vào chỗ trống; tính nhanh; viết dưới dạng bình phương hoặc tích.',[g6a,g6b,g6c,g6d]);
lesson(2,'lap-phuong','Bài 7. Lập phương của một tổng. Lập phương của một hiệu','Khai triển; viết dưới dạng lập phương; tính giá trị biểu thức.',[g7a,g7b,g7c]);
lesson(2,'tong-hieu-lap-phuong','Bài 8. Tổng và hiệu hai lập phương','Viết thành tích; rút gọn; tính giá trị biểu thức.',[g8a,g8b,g8c]);
lesson(2,'phan-tich-nhan-tu','Bài 9. Phân tích đa thức thành nhân tử','Đặt nhân tử chung; dùng hằng đẳng thức; nhóm, tách hạng tử; tìm x.',[g9a,g9b,g9c,g9d]);
lesson(2,'on-tap-c2','Ôn tập chương II','Tổng hợp: bảy hằng đẳng thức đáng nhớ và phân tích đa thức thành nhân tử.',[g6c,g6d,g7c,g8b,g9b,g9d]);

/* =====================================================================
   CHƯƠNG III – TỨ GIÁC (Bài 10–14). Hình vẽ có kí hiệu bằng geoSVG (figures.js).
   Học sinh yếu hình: mỗi câu đều có hình, gợi ý chỉ rõ TÍNH CHẤT cần dùng, lời giải chia nhỏ từng bước.
   Khối { } riêng để tên hằng không trùng chương II.
   ===================================================================== */
{
const m = tm, dg = x => `${x}^\\circ`, h = s => `\\widehat{${s}}`;
const B1 = (lab, unit='^\\circ') => `<span class="eq">${m(lab + ' =')} [_]${unit ? m(unit) : ''}</span>`;
const BL = (lab, u) => `<span class="eq">${m(lab + ' =')} [_] ${u}</span>`;
const NM = [['A','B','C','D'],['M','N','P','Q'],['E','F','G','H']];
const nms = lv => NM[lv === 1 ? 0 : lv === 2 ? pick([0,1]) : pick([0,1,2])];
const lab = (N, k, v) => ({[N[(k+3)%4] + N[k] + N[(k+1)%4]] : v});
// Toạ độ mẫu (A trên trái, B trên phải, C dưới phải, D dưới trái)
const XY = { quad:[[1,3.2],[5.2,3.7],[6.2,0],[0,0]], trap:[[1.6,3],[5.4,3],[7,0],[0,0]], pg:[[1.6,3],[6.8,3],[5.2,0],[0,0]],
             rect:[[0,3],[5.2,3],[5.2,0],[0,0]], rho:[[0,2],[3,4],[6,2],[3,0]], sq:[[0,3.4],[3.4,3.4],[3.4,0],[0,0]], kite:[[3,4.4],[5.6,2],[3,-1.2],[0.4,2]] };
const pts = (N, key, extra={}) => { const P = {}; N.forEach((n, i) => P[n] = XY[key][i]); return Object.assign(P, extra); };
const sides = N => [N[0]+N[1], N[1]+N[2], N[2]+N[3], N[3]+N[0]];
const angArr = (N, list) => list.map(([k, v, n]) => [N[(k+3)%4] + N[k] + N[(k+1)%4], v, n || 1]);
const quadFig = (N, key, o={}) => geoSVG({P:pts(N, key, o.extra || {}), S:sides(N).concat(o.S || []), ...o, extra:undefined});
const dup = a => new Set(a).size === a.length;

/* ---------- Bài 10. Tứ giác ---------- */
const g10a = lv => {   // tổng các góc của tứ giác
  const N = nms(lv), [A,B,C,D] = N;
  if(lv === 1){ let a, b, c, d; do{ a = 5*R(10,30); b = 5*R(10,30); c = 5*R(10,30); d = 360-a-b-c; }while(d < 40 || d > 170);
    return QB({text:`Cho tứ giác ${m(N.join(''))} có ${m(`${h(A)} = ${dg(a)},\\ ${h(B)} = ${dg(b)},\\ ${h(C)} = ${dg(c)}`)}. Tính ${m(h(D))}.`, tpl:B1(h(D)), ans:[d],
      fig:quadFig(N, 'quad', {A:angArr(N, [[0,m(dg(a))],[1,m(dg(b))],[2,m(dg(c))],[3,'?']])}),
      hint:`Tổng bốn góc của một tứ giác bằng ${m('360^\\circ')}. Lấy ${m('360^\\circ')} trừ tổng ba góc đã biết.`,
      sol:`Tổng ba góc đã biết: ${m(`${a}^\\circ + ${b}^\\circ + ${c}^\\circ = ${dg(a+b+c)}`)}.<br>${m(`${h(D)} = 360^\\circ - ${dg(a+b+c)} =`)} ${tb(dg(d))}.`}); }
  if(lv === 2){ let a, b, c; do{ c = 5*R(10,28); a = 5*R(10,30); b = 360-a-2*c; }while(b < 40 || b > 170);
    return QB({text:`Tứ giác ${m(N.join(''))} có ${m(`${h(A)} = ${dg(a)},\\ ${h(B)} = ${dg(b)}`)} và ${m(`${h(C)} = ${h(D)}`)}. Tính ${m(h(C))}.`, tpl:B1(h(C)), ans:[c],
      fig:quadFig(N, 'quad', {A:angArr(N, [[0,m(dg(a))],[1,m(dg(b))],[2,'',2],[3,'',2]])}),
      hint:`${m(`${h(C)} + ${h(D)} = 360^\\circ - ${h(A)} - ${h(B)}`)}, mà hai góc này bằng nhau nên mỗi góc bằng một nửa.`,
      sol:`${m(`${h(C)} + ${h(D)} = 360^\\circ - ${a}^\\circ - ${b}^\\circ = ${dg(2*c)}`)}.<br>Vì ${m(`${h(C)} = ${h(D)}`)} nên ${m(`${h(C)} = ${dg(2*c)} : 2 =`)} ${tb(dg(c))}.`}); }
  const [r, k] = pick([[[1,2,3,4],36],[[3,4,5,6],20],[[2,3,3,4],30],[[1,2,3,3],40],[[2,3,4,6],24]]), v = r.map(x => x*k);
  return QB({text:`Các góc ${m(`${h(A)},\\ ${h(B)},\\ ${h(C)},\\ ${h(D)}`)} của tứ giác ${m(N.join(''))} tỉ lệ với ${m(r.join(' : '))}. Tính các góc của tứ giác.`,
    tpl:`${B1(h(A))} &nbsp; ${B1(h(B))}<br>${B1(h(C))} &nbsp; ${B1(h(D))}`, ans:v,
    hint:`Tổng bốn góc là ${m('360^\\circ')}. Tổng số phần là ${m(r.join(' + '))}; tìm giá trị một phần rồi nhân lên.`,
    sol:`Tổng số phần: ${m(`${r.join(' + ')} = ${r.reduce((a,b)=>a+b,0)}`)}; một phần bằng ${m(`360^\\circ : ${r.reduce((a,b)=>a+b,0)} = ${dg(k)}`)}.<br>${m(`${h(A)} = ${dg(v[0])},\\ ${h(B)} = ${dg(v[1])},\\ ${h(C)} = ${dg(v[2])},\\ ${h(D)} = ${dg(v[3])}`)}. Đáp án: ${tb(v.map(dg).join(';\\ '))}.`});
};
const g10b = lv => {   // nhận biết các yếu tố của tứ giác
  const N = nms(lv), [A,B,C,D] = N, fig = quadFig(N, 'quad', {S:[[A+C,'dash'],[B+D,'dash']]});
  const Q = [
    [`Cạnh đối của cạnh ${m(A+B)} là`, [C+D, B+C, A+D, A+C].map(m), 'Hai cạnh đối là hai cạnh không có đỉnh chung.'],
    [`Hai đường chéo của tứ giác là`, [`${m(A+C)} và ${m(B+D)}`, `${m(A+B)} và ${m(C+D)}`, `${m(A+D)} và ${m(B+C)}`, `${m(A+B)} và ${m(A+C)}`], 'Đường chéo nối hai đỉnh KHÔNG kề nhau (hai đỉnh đối nhau).'],
    [`Góc đối của góc ${m(h(A))} là`, [h(C), h(B), h(D), h(A+C+B)].map(m), 'Hai góc đối là hai góc ở hai đỉnh đối nhau (không kề nhau).'],
    [`Hai cạnh kề với cạnh ${m(A+B)} là`, [`${m(A+D)} và ${m(B+C)}`, `${m(C+D)} và ${m(B+C)}`, `${m(A+C)} và ${m(B+D)}`, `${m(C+D)} và ${m(A+D)}`], 'Hai cạnh kề là hai cạnh có chung một đỉnh.'],
    [`Đỉnh đối với đỉnh ${m(B)} là`, [D, A, C, B].map(m), 'Hai đỉnh đối nhau là hai đỉnh không cùng thuộc một cạnh.'],
  ], q = pick(lv === 1 ? Q.slice(0,3) : Q);
  return QC({text:`Cho tứ giác ${m(N.join(''))} như hình. ${q[0]}`, fig, opts:q[1], ans:q[1][0], hint:q[2], sol:`${q[2]} Đáp án: <b>${q[1][0]}</b>.`});
};
const g10c = lv => {   // góc ngoài
  const N = nms(lv), [A,B,C,D] = N;
  if(lv === 1){ const x = 5*R(8,34); return QB({text:`Tứ giác ${m(N.join(''))} có ${m(`${h(A)} = ${dg(x)}`)}. Tính số đo góc ngoài tại đỉnh ${m(A)}.`, tpl:`Góc ngoài tại ${m(A)} = [_]${m('^\\circ')}`, ans:[180-x],
    hint:'Góc ngoài tại một đỉnh kề bù với góc trong tại đỉnh đó (tổng bằng 180°).', sol:`Góc ngoài tại ${m(A)} bằng ${m(`180^\\circ - ${dg(x)} =`)} ${tb(dg(180-x))}.`}); }
  if(lv === 2){ let a, b, c, d; do{ a = 5*R(10,30); b = 5*R(10,30); c = 5*R(10,30); d = 360-a-b-c; }while(d < 40 || d > 170);
    return QB({text:`Tứ giác ${m(N.join(''))} có ${m(`${h(A)} = ${dg(a)},\\ ${h(B)} = ${dg(b)},\\ ${h(C)} = ${dg(c)}`)}. Tính số đo góc ngoài tại đỉnh ${m(D)}.`, tpl:`Góc ngoài tại ${m(D)} = [_]${m('^\\circ')}`, ans:[180-d],
      hint:`Bước 1: tính ${m(h(D))} (tổng bốn góc là ${m('360^\\circ')}). Bước 2: góc ngoài tại ${m(D)} = ${m('180^\\circ')} − ${m(h(D))}.`,
      sol:`${m(`${h(D)} = 360^\\circ - (${a}^\\circ + ${b}^\\circ + ${c}^\\circ) = ${dg(d)}`)}.<br>Góc ngoài tại ${m(D)}: ${m(`180^\\circ - ${dg(d)} =`)} ${tb(dg(180-d))}.`}); }
  let e; do{ e = [0,0,0].map(() => 5*R(12,30)); }while(360 - e[0]-e[1]-e[2] < 20 || 360 - e[0]-e[1]-e[2] > 150);
  const x = 360 - e[0]-e[1]-e[2];
  return QB({text:`Các góc ngoài tại ${m(`${A}, ${B}, ${C}`)} của tứ giác ${m(N.join(''))} lần lượt bằng ${m(`${dg(e[0])},\\ ${dg(e[1])},\\ ${dg(e[2])}`)}. Tính góc ngoài tại ${m(D)} và góc trong ${m(h(D))}.`,
    tpl:`Góc ngoài tại ${m(D)} = [_]${m('^\\circ')} &nbsp; ${B1(h(D))}`, ans:[x, 180-x],
    hint:`Mỗi góc ngoài bằng ${m('180^\\circ')} trừ góc trong, nên tổng bốn góc ngoài bằng ${m('4\\cdot 180^\\circ - 360^\\circ = 360^\\circ')}.`,
    sol:`Tổng bốn góc ngoài bằng ${m('360^\\circ')}: góc ngoài tại ${m(D)} = ${m(`360^\\circ - ${dg(e[0]+e[1]+e[2])} =`)} ${tb(dg(x))}.<br>${m(`${h(D)} = 180^\\circ - ${dg(x)} =`)} ${tb(dg(180-x))}.`});
};
const g10d = lv => {
  const N = nms(lv), [A,B,C,D] = N;
  if(lv === 1){ const s = [R(3,12), R(3,12), R(3,12), R(3,12)], L = {}; sides(N).forEach((x, i) => L[x] = `${s[i]} cm`);
    return QB({text:`Tính chu vi tứ giác ${m(N.join(''))} có độ dài các cạnh như hình.`, tpl:'[_] cm', ans:[s.reduce((a,b)=>a+b,0)], fig:quadFig(N, 'quad', {L}),
      hint:'Chu vi tứ giác bằng tổng độ dài bốn cạnh.', sol:`${m(`${s.join(' + ')} =`)} ${tb(s.reduce((a,b)=>a+b,0))} cm.`}); }
  if(lv === 2){ const x = 5*R(12,30);
    return QB({text:`Tứ giác ${m(N.join(''))} có ${m(`${h(A)} = ${h(C)} = 90^\\circ`)} và ${m(`${h(B)} = ${dg(x)}`)}. Tính ${m(h(D))}.`, tpl:B1(h(D)), ans:[180-x],
      fig:geoSVG({P:pts(N,'rect',{[B]:[5.2,3],[D]:[0,0],[A]:[0,3],[C]:[3.6,0]}), S:sides(N), R:[D+A+B, B+C+D], A:[[A+B+C,m(dg(x))],[C+D+A,'?']]}),
      hint:`Tổng bốn góc là ${m('360^\\circ')}; đã biết hai góc vuông và ${m(h(B))}.`,
      sol:`${m(`${h(D)} = 360^\\circ - 90^\\circ - 90^\\circ - ${dg(x)} =`)} ${tb(dg(180-x))}.`}); }
  let a, c; do{ a = 10*R(5,14); c = 10*R(4,12); }while((360-a-c) % 2 || 360-a-c < 80 || 360-a-c > 300);
  const b = (360-a-c)/2;
  return QB({text:`Tứ giác ${m(N.join(''))} có ${m(`${A+B} = ${A+D}`)}, ${m(`${C+B} = ${C+D}`)} (hình “cánh diều”), ${m(`${h(A)} = ${dg(a)}`)}, ${m(`${h(C)} = ${dg(c)}`)}. Tính ${m(h(B))} và ${m(h(D))}.`,
    tpl:`${B1(h(B))} &nbsp; ${B1(h(D))}`, ans:[b, b], fig:geoSVG({P:pts(N,'kite'), S:sides(N).concat([[A+C,'dash']]), T:{[A+B]:1,[A+D]:1,[C+B]:2,[C+D]:2}}),
    hint:`Nối ${m(A+C)}: hai tam giác ${m(A+B+C)} và ${m(A+D+C)} bằng nhau (c.c.c) nên ${m(`${h(B)} = ${h(D)}`)}. Rồi dùng tổng bốn góc ${m('360^\\circ')}.`,
    sol:`${m(`\\triangle ${A+B+C} = \\triangle ${A+D+C}`)} (c.c.c) ⇒ ${m(`${h(B)} = ${h(D)}`)}.<br>${m(`${h(B)} + ${h(D)} = 360^\\circ - ${dg(a)} - ${dg(c)} = ${dg(2*b)}`)} ⇒ ${m(`${h(B)} = ${h(D)} =`)} ${tb(dg(b))}.`});
};

/* ---------- Bài 11. Hình thang cân ---------- */
const trapHead = N => `Cho hình thang ${m(N.join(''))} (${m(`${N[0]+N[1]} \\parallel ${N[3]+N[2]}`)})`;
const g11a = lv => {   // hình thang: hai góc kề một cạnh bên bù nhau
  const N = nms(lv), [A,B,C,D] = N, key = 'quad';
  const fig = (o={}) => geoSVG({P:pts(N,'trap',{[A]:[1.2,3],[B]:[5.8,3],[C]:[7,0],[D]:[0,0]}), S:sides(N), Pa:{[A+B]:1,[D+C]:1}, ...o});
  if(lv === 1){ const d = 5*R(8,28);
    return QB({text:`${trapHead(N)} có ${m(`${h(D)} = ${dg(d)}`)}. Tính ${m(h(A))}.`, tpl:B1(h(A)), ans:[180-d], fig:fig({A:[[C+D+A,m(dg(d))],[D+A+B,'?']]}),
      hint:`Hai góc kề một cạnh bên của hình thang bù nhau: ${m(`${h(A)} + ${h(D)} = 180^\\circ`)} (hai góc trong cùng phía, ${m(`${A+B} \\parallel ${D+C}`)}).`,
      sol:`${m(`${h(A)} = 180^\\circ - ${h(D)} = 180^\\circ - ${dg(d)} =`)} ${tb(dg(180-d))}.`}); }
  if(lv === 2){ const a = 5*R(20,32), c = 5*R(8,24);
    return QB({text:`${trapHead(N)} có ${m(`${h(A)} = ${dg(a)},\\ ${h(C)} = ${dg(c)}`)}. Tính ${m(h(D))} và ${m(h(B))}.`, tpl:`${B1(h(D))} &nbsp; ${B1(h(B))}`, ans:[180-a, 180-c], fig:fig({A:[[D+A+B,m(dg(a))],[B+C+D,m(dg(c))]]}),
      hint:`Cạnh bên ${m(A+D)}: ${m(`${h(A)} + ${h(D)} = 180^\\circ`)}; cạnh bên ${m(B+C)}: ${m(`${h(B)} + ${h(C)} = 180^\\circ`)}.`,
      sol:`${m(`${h(D)} = 180^\\circ - ${dg(a)} =`)} ${tb(dg(180-a))}; ${m(`${h(B)} = 180^\\circ - ${dg(c)} =`)} ${tb(dg(180-c))}.`}); }
  const dd = 10*R(1,8), a = (180+dd)/2, d = (180-dd)/2;
  return QB({text:`${trapHead(N)} có ${m(`${h(A)} - ${h(D)} = ${dg(dd)}`)}. Tính ${m(h(A))} và ${m(h(D))}.`, tpl:`${B1(h(A))} &nbsp; ${B1(h(D))}`, ans:[a, d], fig:fig(),
    hint:`Biết tổng ${m(`${h(A)} + ${h(D)} = 180^\\circ`)} và hiệu ${m(dg(dd))}: góc lớn = (tổng + hiệu) : 2.`,
    sol:`${m(`${h(A)} + ${h(D)} = 180^\\circ`)}.<br>${m(`${h(A)} = (180^\\circ + ${dg(dd)}) : 2 =`)} ${tb(dg(a))}; ${m(`${h(D)} = 180^\\circ - ${dg(a)} =`)} ${tb(dg(d))}.`});
};
const isoFig = (N, o={}) => geoSVG({P:pts(N,'trap'), S:sides(N).concat(o.S || []), Pa:{[N[0]+N[1]]:1,[N[3]+N[2]]:1}, T:{[N[0]+N[3]]:1,[N[1]+N[2]]:1}, ...o, S:sides(N).concat(o.S || [])});
const g11b = lv => {   // hình thang cân: góc
  const N = nms(lv), [A,B,C,D] = N, head = `Cho hình thang cân ${m(N.join(''))} (${m(`${A+B} \\parallel ${D+C}`)}, ${m(`${A+B} \\lt ${D+C}`)})`;
  if(lv === 1){ const d = 5*R(9,17);
    return QB({text:`${head} có ${m(`${h(D)} = ${dg(d)}`)}. Tính ${m(h(C))}.`, tpl:B1(h(C)), ans:[d], fig:isoFig(N, {A:[[C+D+A,m(dg(d))],[B+C+D,'?']]}),
      hint:'Trong hình thang cân, hai góc kề một đáy bằng nhau.', sol:`${m(h(C))} và ${m(h(D))} là hai góc kề đáy ${m(D+C)} nên ${m(`${h(C)} = ${h(D)} =`)} ${tb(dg(d))}.`}); }
  if(lv === 2){ const d = 5*R(9,17);
    return QB({text:`${head} có ${m(`${h(D)} = ${dg(d)}`)}. Tính các góc còn lại.`, tpl:`${B1(h(C))} &nbsp; ${B1(h(A))} &nbsp; ${B1(h(B))}`, ans:[d, 180-d, 180-d], fig:isoFig(N, {A:[[C+D+A,m(dg(d))]]}),
      hint:`Hai góc kề một đáy bằng nhau; hai góc kề một cạnh bên bù nhau (${m(`${A+B} \\parallel ${D+C}`)}).`,
      sol:`${m(`${h(C)} = ${h(D)} = ${dg(d)}`)} (kề đáy ${m(D+C)}).<br>${m(`${h(A)} = 180^\\circ - ${h(D)} = ${dg(180-d)}`)}; ${m(`${h(B)} = ${h(A)} = ${dg(180-d)}`)}. Đáp án: ${tb(`${dg(d)};\\ ${dg(180-d)};\\ ${dg(180-d)}`)}.`}); }
  const [k, d] = pick([[2,60],[3,45],[4,36],[5,30]]);
  return QB({text:`${head} có ${m(`${h(A)} = ${k}\\,${h(D)}`)}. Tính ${m(h(D))} và ${m(h(A))}.`, tpl:`${B1(h(D))} &nbsp; ${B1(h(A))}`, ans:[d, k*d], fig:isoFig(N),
    hint:`${m(`${h(A)} + ${h(D)} = 180^\\circ`)} (kề cạnh bên). Thay ${m(`${h(A)} = ${k}\\,${h(D)}`)} được ${m(`${k+1}\\,${h(D)} = 180^\\circ`)}.`,
    sol:`${m(`${k}\\,${h(D)} + ${h(D)} = 180^\\circ \\Rightarrow ${h(D)} = 180^\\circ : ${k+1} =`)} ${tb(dg(d))}; ${m(`${h(A)} = ${k}\\cdot ${dg(d)} =`)} ${tb(dg(k*d))}.`});
};
const HT = [[3,4,5],[6,8,10],[5,12,13],[4,3,5],[8,6,10],[9,12,15]];
const g11c = lv => {   // hình thang cân: cạnh bên, đường chéo, đường cao
  const N = nms(lv), [A,B,C,D] = N, head = `Cho hình thang cân ${m(N.join(''))} (${m(`${A+B} \\parallel ${D+C}`)})`;
  if(lv === 1){ const x = R(3,15), diag = Math.random() < .5;
    return diag ? QB({text:`${head} có đường chéo ${m(`${A+C} = ${x}`)} cm. Tính ${m(B+D)}.`, tpl:BL(B+D,'cm'), ans:[x], fig:isoFig(N, {S:[[A+C,'dash'],[B+D,'dash']]}),
        hint:'Trong hình thang cân, hai đường chéo bằng nhau.', sol:`${m(`${B+D} = ${A+C} =`)} ${tb(x)} cm.`})
      : QB({text:`${head} có cạnh bên ${m(`${A+D} = ${x}`)} cm. Tính ${m(B+C)}.`, tpl:BL(B+C,'cm'), ans:[x], fig:isoFig(N),
        hint:'Trong hình thang cân, hai cạnh bên bằng nhau.', sol:`${m(`${B+C} = ${A+D} =`)} ${tb(x)} cm.`}); }
  if(lv === 2){ const a = R(3,10), b = a + R(2,8), c = R(3,9);
    return QB({text:`${head} có ${m(`${A+B} = ${a}`)} cm, ${m(`${D+C} = ${b}`)} cm, ${m(`${A+D} = ${c}`)} cm. Tính chu vi hình thang.`, tpl:'[_] cm', ans:[a+b+2*c], fig:isoFig(N, {L:{[A+B]:`${a} cm`,[D+C]:`${b} cm`,[A+D]:`${c} cm`}}),
      hint:`Hai cạnh bên bằng nhau nên ${m(`${B+C} = ${A+D}`)}; chu vi là tổng bốn cạnh.`, sol:`${m(`${B+C} = ${A+D} = ${c}`)} cm. Chu vi: ${m(`${a} + ${b} + ${c} + ${c} =`)} ${tb(a+b+2*c)} cm.`}); }
  const [dh, ah, c] = pick(HT), a = R(2,8), b = a + 2*dh, sc = 7/b;
  const fig = geoSVG({P:{[A]:[dh*sc,ah*sc],[B]:[(dh+a)*sc,ah*sc],[C]:[b*sc,0],[D]:[0,0],K:[dh*sc,0]}, S:sides(N).concat([[A+'K','dash']]), R:[A+'K'+C], L:{[A+B]:`${a}`,[D+C]:`${b}`,[A+D]:`${c}`}, T:{[A+D]:1,[B+C]:1}, Pa:{[A+B]:1,[D+C]:1}});
  return QB({text:`${head}, ${m(`${A+B} = ${a}`)} cm, ${m(`${D+C} = ${b}`)} cm, ${m(`${A+D} = ${c}`)} cm. Kẻ đường cao ${m(A+'K')} (${m(`K \\in ${D+C}`)}). Tính ${m(D+'K')} và đường cao ${m(A+'K')}.`,
    tpl:`${BL(D+'K','cm')} &nbsp; ${BL(A+'K','cm')}`, ans:[dh, ah], fig,
    hint:`Trong hình thang cân, ${m(`${D}K = \\dfrac{${D+C} - ${A+B}}{2}`)}. Sau đó dùng Pythagore trong tam giác vuông ${m(A+'K'+D)}.`,
    sol:`${m(`${D}K = \\dfrac{${b} - ${a}}{2} = ${dh}`)} cm.<br>Tam giác ${m(A+D+'K')} vuông tại ${m('K')}: ${m(`${A}K = \\sqrt{${c}^2 - ${dh}^2} = \\sqrt{${c*c-dh*dh}} = ${ah}`)} cm. Đáp án: ${tb(`${D}K = ${dh};\\ ${A}K = ${ah}`)}.`});
};
const pickTF = (T, F, wantTrue) => { const good = pick(wantTrue ? T : F), bad = shuffle(wantTrue ? F : T).slice(0, 3); return [good, [good, ...bad]]; };
const g11d = lv => {   // nhận biết hình thang cân
  const T = ['Hình thang có hai góc kề một đáy bằng nhau là hình thang cân.', 'Hình thang có hai đường chéo bằng nhau là hình thang cân.', 'Trong hình thang cân, hai cạnh bên bằng nhau.', 'Trong hình thang cân, hai đường chéo bằng nhau.'];
  const F = ['Hình thang có hai cạnh bên bằng nhau là hình thang cân.', 'Tứ giác có hai đường chéo bằng nhau là hình thang cân.', 'Hình thang có hai góc đối bằng nhau là hình thang cân.', 'Tứ giác có hai góc kề một cạnh bằng nhau là hình thang cân.'];
  const wantTrue = lv < 3, [good, opts] = pickTF(T, F, wantTrue);
  return QC({text:`Khẳng định nào dưới đây <b>${wantTrue ? 'đúng' : 'sai'}</b>?`, opts, ans:good,
    hint:'Dấu hiệu nhận biết hình thang cân: (1) hình thang có hai góc kề một đáy bằng nhau; (2) hình thang có hai đường chéo bằng nhau. Chú ý: hình thang có hai cạnh bên bằng nhau chưa chắc là hình thang cân (có thể là hình bình hành).',
    sol:`Khẳng định ${wantTrue ? 'đúng' : 'sai'}: <b>${good}</b>${wantTrue ? '' : ' Ví dụ: hình bình hành là hình thang có hai cạnh bên bằng nhau nhưng không phải hình thang cân (nếu không là hình chữ nhật).'}`});
};

/* ---------- Bài 12. Hình bình hành ---------- */
const pgFig = (N, o={}) => geoSVG({P:pts(N,'pg', o.extra || {}), ...o, S:sides(N).concat(o.S || []), Pa:{[N[0]+N[1]]:1,[N[3]+N[2]]:1,[N[0]+N[3]]:2,[N[1]+N[2]]:2}, extra:undefined});
const g12a = lv => {   // góc hình bình hành
  const N = nms(lv), [A,B,C,D] = N, head = `Cho hình bình hành ${m(N.join(''))}`;
  if(lv === 1){ const a = 5*R(10,32); return QB({text:`${head} có ${m(`${h(A)} = ${dg(a)}`)}. Tính ${m(h(C))}.`, tpl:B1(h(C)), ans:[a], fig:pgFig(N, {A:[[D+A+B,m(dg(a))],[B+C+D,'?']]}),
    hint:'Trong hình bình hành, các góc đối bằng nhau.', sol:`${m(h(A))} và ${m(h(C))} là hai góc đối nên ${m(`${h(C)} = ${h(A)} =`)} ${tb(dg(a))}.`}); }
  if(lv === 2){ const a = 5*R(10,32); return QB({text:`${head} có ${m(`${h(A)} = ${dg(a)}`)}. Tính các góc còn lại.`, tpl:`${B1(h(B))} &nbsp; ${B1(h(C))} &nbsp; ${B1(h(D))}`, ans:[180-a, a, 180-a], fig:pgFig(N, {A:[[D+A+B,m(dg(a))]]}),
    hint:`Góc đối bằng nhau; hai góc kề một cạnh bù nhau (vì ${m(`${A+D} \\parallel ${B+C}`)}).`,
    sol:`${m(`${h(C)} = ${h(A)} = ${dg(a)}`)}; ${m(`${h(B)} = 180^\\circ - ${dg(a)} = ${dg(180-a)}`)}; ${m(`${h(D)} = ${h(B)} = ${dg(180-a)}`)}. Đáp án: ${tb(`${dg(180-a)};\\ ${dg(a)};\\ ${dg(180-a)}`)}.`}); }
  const dd = 10*R(1,12), a = (180+dd)/2;
  return QB({text:`${head} có ${m(`${h(A)} - ${h(B)} = ${dg(dd)}`)}. Tính ${m(h(A))} và ${m(h(B))}.`, tpl:`${B1(h(A))} &nbsp; ${B1(h(B))}`, ans:[a, 180-a], fig:pgFig(N),
    hint:`${m(`${h(A)} + ${h(B)} = 180^\\circ`)} (kề cạnh ${m(A+B)}). Biết tổng và hiệu: góc lớn = (tổng + hiệu) : 2.`,
    sol:`${m(`${h(A)} = (180^\\circ + ${dg(dd)}) : 2 =`)} ${tb(dg(a))}; ${m(`${h(B)} = 180^\\circ - ${dg(a)} =`)} ${tb(dg(180-a))}.`});
};
const g12b = lv => {   // cạnh, đường chéo
  const N = nms(lv), [A,B,C,D] = N, head = `Cho hình bình hành ${m(N.join(''))}`;
  if(lv === 1){ const a = R(4,15), b = R(3,12);
    return QB({text:`${head} có ${m(`${A+B} = ${a}`)} cm, ${m(`${B+C} = ${b}`)} cm. Tính ${m(C+D)}, ${m(A+D)} và chu vi.`, tpl:`${BL(C+D,'cm')} &nbsp; ${BL(A+D,'cm')} &nbsp; Chu vi: [_] cm`, ans:[a, b, 2*(a+b)], fig:pgFig(N, {L:{[A+B]:`${a} cm`,[B+C]:`${b} cm`}}),
      hint:'Trong hình bình hành, các cạnh đối bằng nhau. Chu vi = 2 × (tổng hai cạnh kề).', sol:`${m(`${C+D} = ${A+B} = ${a}`)}, ${m(`${A+D} = ${B+C} = ${b}`)}; chu vi ${m(`2(${a} + ${b}) =`)} ${tb(2*(a+b))} cm.`}); }
  if(lv === 2){ const x = R(2,12)/(pick([1,2])), y = R(2,12);
    return QB({text:`${head} có hai đường chéo cắt nhau tại ${m('O')}, ${m(`O${A} = ${tdec(x)}`)} cm, ${m(`O${B} = ${y}`)} cm. Tính ${m(A+C)} và ${m(B+D)}.`, tpl:`${BL(A+C,'cm')} &nbsp; ${BL(B+D,'cm')}`, ans:[2*x, 2*y],
      fig:pgFig(N, {extra:{O:[3.4,1.5]}, S:[[A+C,'dash'],[B+D,'dash']], T:{['O'+A]:1,['O'+C]:1,['O'+B]:2,['O'+D]:2}}),
      hint:'Hai đường chéo của hình bình hành cắt nhau tại trung điểm của mỗi đường.', sol:`${m('O')} là trung điểm ${m(A+C)} và ${m(B+D)}: ${m(`${A+C} = 2\\cdot ${tdec(x)} =`)} ${tb(tdec(2*x))} cm; ${m(`${B+D} = 2\\cdot ${y} =`)} ${tb(2*y)} cm.`}); }
  const b = R(3,12), d = R(1,8), a = b + d, P = 2*(a+b);
  return QB({text:`${head} có chu vi ${m(`${P}`)} cm và ${m(`${A+B} - ${B+C} = ${d}`)} cm. Tính ${m(A+B)} và ${m(B+C)}.`, tpl:`${BL(A+B,'cm')} &nbsp; ${BL(B+C,'cm')}`, ans:[a, b], fig:pgFig(N),
    hint:`Nửa chu vi ${m(`= ${A+B} + ${B+C}`)}. Biết tổng và hiệu hai cạnh: cạnh lớn = (tổng + hiệu) : 2.`,
    sol:`${m(`${A+B} + ${B+C} = ${P} : 2 = ${a+b}`)} cm.<br>${m(`${A+B} = (${a+b} + ${d}) : 2 =`)} ${tb(a)} cm; ${m(`${B+C} = ${a+b} - ${a} =`)} ${tb(b)} cm.`});
};
const PG_T = ['Tứ giác có các cạnh đối song song.', 'Tứ giác có các cạnh đối bằng nhau.', 'Tứ giác có hai cạnh đối song song và bằng nhau.', 'Tứ giác có các góc đối bằng nhau.', 'Tứ giác có hai đường chéo cắt nhau tại trung điểm của mỗi đường.'];
const PG_F = ['Tứ giác có hai đường chéo bằng nhau.', 'Tứ giác có hai cạnh đối song song.', 'Tứ giác có hai cạnh đối bằng nhau.', 'Tứ giác có hai đường chéo vuông góc.', 'Tứ giác có hai góc kề một cạnh bằng nhau.'];
const g12c = lv => {
  const wantTrue = lv < 3, [good, opts] = pickTF(PG_T, PG_F, wantTrue);
  return QC({text:wantTrue ? 'Tứ giác nào dưới đây <b>chắc chắn</b> là hình bình hành?' : 'Tứ giác nào dưới đây <b>chưa chắc</b> là hình bình hành?', opts, ans:good,
    hint:'Năm dấu hiệu nhận biết hình bình hành: các cạnh đối song song; các cạnh đối bằng nhau; hai cạnh đối song song và bằng nhau; các góc đối bằng nhau; hai đường chéo cắt nhau tại trung điểm mỗi đường.',
    sol:`Đáp án: <b>${good}</b>${wantTrue ? ' (đúng một trong năm dấu hiệu nhận biết).' : ' – đây không phải dấu hiệu nhận biết hình bình hành.'}`});
};
const g12d = lv => {   // tìm x
  const N = nms(lv), [A,B,C,D] = N, head = `Cho hình bình hành ${m(N.join(''))}`;
  if(lv === 1){ let x, p, q, r, s; do{ x = R(2,9); p = R(2,5); q = R(0,6); r = R(1,p-1); s = p*x + q - r*x; }while(s <= 0 || p === r);
    return QB({text:`${head} có ${m(`${A+B} = ${P([p,'x'],[q,''])}`)} (cm) và ${m(`${C+D} = ${P([r,'x'],[s,''])}`)} (cm). Tìm ${m('x')} và độ dài ${m(A+B)}.`, tpl:`${m('x =')} [_] &nbsp; ${BL(A+B,'cm')}`, ans:[x, p*x+q], fig:pgFig(N),
      hint:`${m(A+B)} và ${m(C+D)} là hai cạnh đối nên bằng nhau: lập phương trình rồi giải.`,
      sol:`${m(`${P([p,'x'],[q,''])} = ${P([r,'x'],[s,''])} \\Rightarrow ${p-r}x = ${s-q} \\Rightarrow x = ${x}`)}.<br>${m(`${A+B} = ${p}\\cdot ${x} + ${q} =`)} ${tb(p*x+q)} cm.`}); }
  let x, p, q, r, s, ang; do{ x = 5*R(3,20); p = R(2,4); r = R(1,p-1); ang = 5*R(12,32); q = ang - p*x; s = ang - r*x; }while(Math.abs(q) > 80 || Math.abs(s) > 120 || q === 0 || s === 0);
  if(lv === 2) return QB({text:`${head} có ${m(`${h(A)} = ${P([p,'x'],[q,''])}`)} và ${m(`${h(C)} = ${P([r,'x'],[s,''])}`)} (đơn vị độ). Tìm ${m('x')} và ${m(h(A))}.`, tpl:`${m('x =')} [_] &nbsp; ${B1(h(A))}`, ans:[x, ang], fig:pgFig(N),
    hint:`${m(h(A))} và ${m(h(C))} là hai góc đối nên bằng nhau.`, sol:`${m(`${P([p,'x'],[q,''])} = ${P([r,'x'],[s,''])} \\Rightarrow ${p-r}x = ${s-q} \\Rightarrow x = ${x}`)}; ${m(`${h(A)} =`)} ${tb(dg(ang))}.`});
  let y, a1, b1, c1, d1, A1; do{ y = 5*R(4,20); a1 = R(2,4); c1 = R(1,3); A1 = 5*R(14,30); b1 = A1 - a1*y; d1 = 180 - A1 - c1*y; }while(Math.abs(b1) > 90 || Math.abs(d1) > 90 || b1 === 0 || d1 === 0);
  return QB({text:`${head} có ${m(`${h(A)} = ${P([a1,'x'],[b1,''])}`)} và ${m(`${h(B)} = ${P([c1,'x'],[d1,''])}`)} (đơn vị độ). Tìm ${m('x')} và ${m(h(A))}.`, tpl:`${m('x =')} [_] &nbsp; ${B1(h(A))}`, ans:[y, A1], fig:pgFig(N),
    hint:`${m(h(A))} và ${m(h(B))} là hai góc kề cạnh ${m(A+B)} nên bù nhau: ${m(`${h(A)} + ${h(B)} = 180^\\circ`)}.`,
    sol:`${m(`${P([a1,'x'],[b1,''])} + ${P([c1,'x'],[d1,''])} = 180 \\Rightarrow ${a1+c1}x = ${180-b1-d1} \\Rightarrow x = ${y}`)}; ${m(`${h(A)} = ${a1}\\cdot ${y} ${b1<0?'-':'+'} ${Math.abs(b1)} =`)} ${tb(dg(A1))}.`});
};

/* ---------- Bài 13. Hình chữ nhật ---------- */
const TR = [[3,4,5],[6,8,10],[5,12,13],[8,15,17],[9,12,15],[12,16,20],[7,24,25]];
const rectFig = (N, o={}) => geoSVG({P:pts(N,'rect', o.extra || {}), ...o, S:sides(N).concat(o.S || []), R:[N[3]+N[0]+N[1], N[0]+N[1]+N[2], N[1]+N[2]+N[3], N[2]+N[3]+N[0]], extra:undefined});
const g13a = lv => {   // đường chéo – Pythagore
  const N = nms(lv), [A,B,C,D] = N, [p, q, r] = pick(lv===1 ? TR.slice(0,3) : TR), head = `Cho hình chữ nhật ${m(N.join(''))}`;
  if(lv === 1) return QB({text:`${head} có ${m(`${A+B} = ${q}`)} cm, ${m(`${B+C} = ${p}`)} cm. Tính đường chéo ${m(A+C)}.`, tpl:BL(A+C,'cm'), ans:[r], fig:rectFig(N, {S:[[A+C,'dash']], L:{[A+B]:`${q} cm`,[B+C]:`${p} cm`}}),
    hint:`Tam giác ${m(A+B+C)} vuông tại ${m(B)}: dùng định lí Pythagore ${m(`${A+C}^2 = ${A+B}^2 + ${B+C}^2`)}.`, sol:`${m(`${A+C}^2 = ${q}^2 + ${p}^2 = ${q*q} + ${p*p} = ${r*r}`)} ⇒ ${m(`${A+C} =`)} ${tb(r)} cm.`});
  if(lv === 2) return QB({text:`${head} có đường chéo ${m(`${A+C} = ${r}`)} cm và ${m(`${A+B} = ${q}`)} cm. Tính ${m(B+C)}.`, tpl:BL(B+C,'cm'), ans:[p], fig:rectFig(N, {S:[[A+C,'dash']], L:{[A+B]:`${q} cm`}}),
    hint:`Tam giác ${m(A+B+C)} vuông tại ${m(B)}: ${m(`${B+C}^2 = ${A+C}^2 - ${A+B}^2`)}.`, sol:`${m(`${B+C}^2 = ${r}^2 - ${q}^2 = ${r*r - q*q}`)} ⇒ ${m(`${B+C} =`)} ${tb(p)} cm.`});
  return QB({text:`${head} có ${m(`${A+B} = ${q}`)} cm, ${m(`${B+C} = ${p}`)} cm; hai đường chéo cắt nhau tại ${m('O')}. Tính ${m('O'+A)} và ${m('O'+B)}.`, tpl:`${BL('O'+A,'cm')} &nbsp; ${BL('O'+B,'cm')}`, ans:[r/2, r/2],
    fig:rectFig(N, {extra:{O:[2.6,1.5]}, S:[[A+C,'dash'],[B+D,'dash']], T:{['O'+A]:1,['O'+B]:1,['O'+C]:1,['O'+D]:1}}),
    hint:'Tính đường chéo bằng Pythagore; hai đường chéo hình chữ nhật bằng nhau và cắt nhau tại trung điểm mỗi đường.',
    sol:`${m(`${A+C} = \\sqrt{${q}^2 + ${p}^2} = ${r}`)} cm = ${m(B+D)}.<br>${m(`O${A} = O${B} = \\dfrac{${r}}{2} =`)} ${tb(tdec(r/2))} cm.`});
};
const g13b = lv => {   // trung tuyến ứng với cạnh huyền
  const N = nms(lv), [A,B,C] = N;
  if(lv === 1){ const x = R(4,20), [D] = [N[3]]; return QB({text:`Cho hình chữ nhật ${m(N.join(''))} có đường chéo ${m(`${A+C} = ${x}`)} cm, hai đường chéo cắt nhau tại ${m('O')}. Tính ${m(B+D)} và ${m('O'+B)}.`,
    tpl:`${BL(B+D,'cm')} &nbsp; ${BL('O'+B,'cm')}`, ans:[x, x/2], fig:rectFig(N, {extra:{O:[2.6,1.5]}, S:[[A+C,'dash'],[B+D,'dash']]}),
    hint:'Hình chữ nhật có hai đường chéo bằng nhau và cắt nhau tại trung điểm mỗi đường.', sol:`${m(`${B+D} = ${A+C} =`)} ${tb(x)} cm; ${m(`O${B} = \\dfrac{${B+D}}{2} =`)} ${tb(tdec(x/2))} cm.`}); }
  const [p, q, r] = pick(TR), sc = 5/r, fig = geoSVG({P:{[A]:[0,0],[B]:[q*sc,0],[C]:[0,p*sc],I:[q*sc/2,p*sc/2]}, S:[A+B,B+C,C+A,[A+'I','dash']], R:[C+A+B], T:{[B+'I']:1,['I'+C]:1}});
  if(lv === 2){ const x = r; return QB({text:`Cho tam giác ${m(A+B+C)} vuông tại ${m(A)}, ${m('I')} là trung điểm của cạnh huyền ${m(B+C)}, ${m(`${B+C} = ${x}`)} cm. Tính ${m(A+'I')}.`, tpl:BL(A+'I','cm'), ans:[x/2], fig,
    hint:'Trong tam giác vuông, đường trung tuyến ứng với cạnh huyền bằng nửa cạnh huyền (vì tam giác vuông là “nửa” hình chữ nhật).', sol:`${m(`${A}I = \\dfrac{${B+C}}{2} = \\dfrac{${x}}{2} =`)} ${tb(tdec(x/2))} cm.`}); }
  return QB({text:`Cho tam giác ${m(A+B+C)} vuông tại ${m(A)} có ${m(`${A+B} = ${q}`)} cm, ${m(`${A+C} = ${p}`)} cm; ${m('I')} là trung điểm của ${m(B+C)}. Tính ${m(A+'I')}.`, tpl:BL(A+'I','cm'), ans:[r/2], fig,
    hint:`Bước 1: tính cạnh huyền ${m(B+C)} bằng Pythagore. Bước 2: ${m(`${A}I = \\dfrac{${B+C}}{2}`)}.`, sol:`${m(`${B+C} = \\sqrt{${q}^2 + ${p}^2} = ${r}`)} cm; ${m(`${A}I = \\dfrac{${r}}{2} =`)} ${tb(tdec(r/2))} cm.`});
};
const HCN_T = ['Tứ giác có ba góc vuông.', 'Hình bình hành có một góc vuông.', 'Hình bình hành có hai đường chéo bằng nhau.', 'Hình thang cân có một góc vuông.'];
const HCN_F = ['Tứ giác có hai đường chéo bằng nhau.', 'Tứ giác có hai góc vuông.', 'Hình thang có một góc vuông.', 'Hình bình hành có hai đường chéo vuông góc.', 'Hình thang có hai đường chéo bằng nhau.'];
const g13c = lv => {
  const wantTrue = lv < 3, [good, opts] = pickTF(HCN_T, HCN_F, wantTrue);
  return QC({text:wantTrue ? 'Hình nào dưới đây <b>chắc chắn</b> là hình chữ nhật?' : 'Hình nào dưới đây <b>chưa chắc</b> là hình chữ nhật?', opts, ans:good,
    hint:'Dấu hiệu nhận biết hình chữ nhật: tứ giác có ba góc vuông; hình thang cân có một góc vuông; hình bình hành có một góc vuông; hình bình hành có hai đường chéo bằng nhau.',
    sol:`Đáp án: <b>${good}</b>${wantTrue ? ' (là một dấu hiệu nhận biết hình chữ nhật).' : ' – không phải dấu hiệu nhận biết hình chữ nhật.'}`});
};
const g13d = lv => {   // chu vi, diện tích
  const N = nms(lv), [A,B,C,D] = N;
  if(lv === 1){ const a = R(4,20), b = R(2,a-1); return QB({text:`Hình chữ nhật ${m(N.join(''))} có ${m(`${A+B} = ${a}`)} cm, ${m(`${B+C} = ${b}`)} cm. Tính chu vi và diện tích.`, tpl:`Chu vi: [_] cm &nbsp; Diện tích: [_] cm²`, ans:[2*(a+b), a*b],
    fig:rectFig(N, {L:{[A+B]:`${a} cm`,[B+C]:`${b} cm`}}), hint:'Chu vi = 2 × (dài + rộng); diện tích = dài × rộng.', sol:`Chu vi ${m(`2(${a} + ${b}) =`)} ${tb(2*(a+b))} cm; diện tích ${m(`${a}\\cdot ${b} =`)} ${tb(a*b)} cm².`}); }
  if(lv === 2){ const [p, q, r] = pick(TR); return QB({text:`Hình chữ nhật ${m(N.join(''))} có đường chéo ${m(`${A+C} = ${r}`)} cm, ${m(`${A+B} = ${q}`)} cm. Tính diện tích.`, tpl:'[_] cm²', ans:[p*q],
    fig:rectFig(N, {S:[[A+C,'dash']], L:{[A+B]:`${q} cm`}}), hint:`Tính ${m(B+C)} bằng Pythagore trong tam giác vuông ${m(A+B+C)}, rồi nhân hai cạnh.`, sol:`${m(`${B+C} = \\sqrt{${r}^2 - ${q}^2} = ${p}`)} cm; ${m(`S = ${q}\\cdot ${p} =`)} ${tb(p*q)} cm².`}); }
  const k = R(2,4), w = R(2,9), l = k*w, P2 = 2*(l+w);
  return QB({text:`Một mảnh vườn hình chữ nhật có chiều dài gấp ${k} lần chiều rộng và chu vi ${m(P2)} m. Tính diện tích mảnh vườn.`, tpl:'[_] m²', ans:[l*w], fig:rectFig(N),
    hint:`Nửa chu vi = dài + rộng = ${k+1} lần chiều rộng.`, sol:`Nửa chu vi: ${m(`${P2} : 2 = ${l+w}`)} m. Chiều rộng: ${m(`${l+w} : ${k+1} = ${w}`)} m; chiều dài ${m(`${l}`)} m.<br>Diện tích: ${m(`${l}\\cdot ${w} =`)} ${tb(l*w)} m².`});
};

/* ---------- Bài 14. Hình thoi và hình vuông ---------- */
const rhoFig = (N, o={}) => geoSVG({P:pts(N,'rho', {O:[3,2]}), ...o, S:sides(N).concat(o.S || [[N[0]+N[2],'dash'],[N[1]+N[3],'dash']]), T:{[N[0]+N[1]]:1,[N[1]+N[2]]:1,[N[2]+N[3]]:1,[N[3]+N[0]]:1}});
const g14a = lv => {   // cạnh hình thoi từ đường chéo
  const N = nms(lv), [A,B,C,D] = N, [p, q, r] = pick(lv===1 ? TR.slice(0,3) : TR), head = `Cho hình thoi ${m(N.join(''))}, hai đường chéo cắt nhau tại ${m('O')}`;
  const fig = rhoFig(N, {R:[A+'O'+B]});
  if(lv === 1) return QB({text:`${head}, ${m(`${A+C} = ${2*q}`)} cm, ${m(`${B+D} = ${2*p}`)} cm. Tính cạnh ${m(A+B)}.`, tpl:BL(A+B,'cm'), ans:[r], fig,
    hint:`Hai đường chéo hình thoi vuông góc và cắt nhau tại trung điểm mỗi đường: ${m(`O${A} = \\dfrac{${A+C}}{2},\\ O${B} = \\dfrac{${B+D}}{2}`)}; tam giác ${m('O'+A+B)} vuông tại ${m('O')}.`,
    sol:`${m(`O${A} = ${q}`)} cm, ${m(`O${B} = ${p}`)} cm. ${m(`${A+B} = \\sqrt{${q}^2 + ${p}^2} =`)} ${tb(r)} cm.`});
  if(lv === 2) return QB({text:`${head}, ${m(`${A+C} = ${2*q}`)} cm, ${m(`${B+D} = ${2*p}`)} cm. Tính chu vi hình thoi.`, tpl:'[_] cm', ans:[4*r], fig,
    hint:`Tính cạnh bằng Pythagore trong tam giác vuông ${m('O'+A+B)}; hình thoi có bốn cạnh bằng nhau.`, sol:`${m(`${A+B} = \\sqrt{${q}^2 + ${p}^2} = ${r}`)} cm; chu vi ${m(`4\\cdot ${r} =`)} ${tb(4*r)} cm.`});
  return QB({text:`Hình thoi ${m(N.join(''))} có cạnh ${m(`${r}`)} cm và đường chéo ${m(`${A+C} = ${2*q}`)} cm. Tính đường chéo ${m(B+D)}.`, tpl:BL(B+D,'cm'), ans:[2*p], fig,
    hint:`${m(`O${A} = ${A+C} : 2`)}; trong tam giác vuông ${m('O'+A+B)}: ${m(`O${B} = \\sqrt{${A+B}^2 - O${A}^2}`)}; ${m(`${B+D} = 2\\cdot O${B}`)}.`,
    sol:`${m(`O${A} = ${q}`)}; ${m(`O${B} = \\sqrt{${r}^2 - ${q}^2} = ${p}`)} cm; ${m(`${B+D} = 2\\cdot ${p} =`)} ${tb(2*p)} cm.`});
};
const g14b = lv => {   // góc hình thoi
  const N = nms(lv), [A,B,C,D] = N, head = `Cho hình thoi ${m(N.join(''))}`;
  if(lv === 1){ const a = 10*R(4,14); return QB({text:`${head} có ${m(`${h(A)} = ${dg(a)}`)}. Tính ${m(h(C))} và ${m(h(B))}.`, tpl:`${B1(h(C))} &nbsp; ${B1(h(B))}`, ans:[a, 180-a], fig:rhoFig(N, {S:[], A:[[D+A+B,m(dg(a))]]}),
    hint:'Hình thoi là một hình bình hành: góc đối bằng nhau, hai góc kề một cạnh bù nhau.', sol:`${m(`${h(C)} = ${h(A)} =`)} ${tb(dg(a))}; ${m(`${h(B)} = 180^\\circ - ${dg(a)} =`)} ${tb(dg(180-a))}.`}); }
  if(lv === 2){ const a = 10*R(4,14); return QB({text:`${head} có ${m(`${h(B+A+D)} = ${dg(a)}`)}. Tính ${m(h(B+A+C))}.`, tpl:B1(h(B+A+C)), ans:[a/2], fig:rhoFig(N, {A:[[B+A+C,'?'],[C+A+D,'']]}),
    hint:`Trong hình thoi, mỗi đường chéo là tia phân giác của các góc tại hai đỉnh nó đi qua: ${m(A+C)} chia ${m(h(A))} thành hai góc bằng nhau.`, sol:`${m(`${h(B+A+C)} = \\dfrac{${h(B+A+D)}}{2} = \\dfrac{${dg(a)}}{2} =`)} ${tb(dg(a/2))}.`}); }
  const be = 5*R(6,16), a = 180 - 2*be;
  return QB({text:`${head} có ${m(`${h(A+B+D)} = ${dg(be)}`)}. Tính ${m(h(B+A+D))} và ${m(h(A+B+C))}.`, tpl:`${B1(h(B+A+D))} &nbsp; ${B1(h(A+B+C))}`, ans:[a, 2*be], fig:rhoFig(N, {A:[[A+B+D,m(dg(be))]]}),
    hint:`Tam giác ${m(A+B+D)} cân tại ${m(A)} (${m(`${A+B} = ${A+D}`)}); ${m(B+D)} là tia phân giác của ${m(h(A+B+C))}.`,
    sol:`Tam giác ${m(A+B+D)} cân tại ${m(A)} ⇒ ${m(`${h(A+D+B)} = ${h(A+B+D)} = ${dg(be)}`)} ⇒ ${m(`${h(B+A+D)} = 180^\\circ - 2\\cdot ${dg(be)} =`)} ${tb(dg(a))}.<br>${m(`${h(A+B+C)} = 2\\,${h(A+B+D)} =`)} ${tb(dg(2*be))}.`});
};
const sqFig = (N, o={}) => geoSVG({P:pts(N,'sq', o.extra || {}), ...o, S:sides(N).concat(o.S || []), T:{[N[0]+N[1]]:1,[N[1]+N[2]]:1,[N[2]+N[3]]:1,[N[3]+N[0]]:1}, R:[N[3]+N[0]+N[1], N[0]+N[1]+N[2], N[1]+N[2]+N[3], N[2]+N[3]+N[0]], extra:undefined});
const g14c = lv => {   // hình vuông
  const N = nms(lv), [A,B,C,D] = N, head = `Cho hình vuông ${m(N.join(''))}`;
  if(lv === 1){ const a = R(2,15); return QB({text:`${head} cạnh ${m(a)} cm. Tính chu vi và diện tích.`, tpl:`Chu vi: [_] cm &nbsp; Diện tích: [_] cm²`, ans:[4*a, a*a], fig:sqFig(N, {L:{[A+B]:`${a} cm`}}),
    hint:'Chu vi hình vuông = 4 × cạnh; diện tích = cạnh × cạnh.', sol:`Chu vi ${m(`4\\cdot ${a} =`)} ${tb(4*a)} cm; diện tích ${m(`${a}\\cdot ${a} =`)} ${tb(a*a)} cm².`}); }
  if(lv === 2){ const a = R(2,15); return QB({text:`${head} cạnh ${m(a)} cm. Tính đường chéo ${m(A+C)}.`, tpl:`${m(`${A+C} =`)} [_] ${m('\\sqrt{2}')} cm`, ans:[a], fig:sqFig(N, {S:[[A+C,'dash']], L:{[A+B]:`${a} cm`}}),
    hint:`Tam giác ${m(A+B+C)} vuông cân tại ${m(B)}: ${m(`${A+C}^2 = ${A+B}^2 + ${B+C}^2 = 2\\cdot ${A+B}^2`)}.`, sol:`${m(`${A+C}^2 = ${a}^2 + ${a}^2 = ${2*a*a}`)} ⇒ ${m(`${A+C} = ${a}\\sqrt{2}`)} cm. Ô trống: ${tb(a)}.`}); }
  const d = R(3,16); return QB({text:`${head} có đường chéo ${m(`${A+C} = ${d}`)} cm. Tính diện tích hình vuông.`, tpl:'[_] cm²', ans:[d*d/2], fig:sqFig(N, {S:[[A+C,'dash'],[B+D,'dash']]}),
    hint:`Gọi cạnh là ${m('a')}: ${m(`a^2 + a^2 = ${d}^2`)}, mà diện tích chính là ${m('a^2')}.`, sol:`${m(`2a^2 = ${d}^2 = ${d*d} \\Rightarrow a^2 = ${tdec(d*d/2)}`)}. Diện tích ${m('S = a^2 =')} ${tb(tdec(d*d/2))} cm².`});
};
const TH_T = ['Hình bình hành có hai cạnh kề bằng nhau là hình thoi.', 'Hình bình hành có hai đường chéo vuông góc là hình thoi.', 'Hình bình hành có một đường chéo là phân giác của một góc là hình thoi.', 'Tứ giác có bốn cạnh bằng nhau là hình thoi.'];
const TH_F = ['Tứ giác có hai đường chéo vuông góc là hình thoi.', 'Hình bình hành có hai đường chéo bằng nhau là hình thoi.', 'Tứ giác có hai cạnh kề bằng nhau là hình thoi.', 'Hình thang có hai đường chéo vuông góc là hình thoi.'];
const HV_T = ['Hình chữ nhật có hai cạnh kề bằng nhau là hình vuông.', 'Hình chữ nhật có hai đường chéo vuông góc là hình vuông.', 'Hình thoi có một góc vuông là hình vuông.', 'Hình thoi có hai đường chéo bằng nhau là hình vuông.'];
const HV_F = ['Hình thoi có hai đường chéo vuông góc là hình vuông.', 'Tứ giác có bốn cạnh bằng nhau là hình vuông.', 'Hình chữ nhật có hai đường chéo bằng nhau là hình vuông.', 'Tứ giác có hai đường chéo vuông góc và bằng nhau là hình vuông.'];
const g14d = lv => {
  const sq = lv === 3 ? Math.random() < .5 : lv === 2, [good, opts] = pickTF(sq ? HV_T : TH_T, sq ? HV_F : TH_F, true);
  return QC({text:'Khẳng định nào dưới đây <b>đúng</b>?', opts, ans:good,
    hint:sq ? 'Dấu hiệu hình vuông: hình chữ nhật có hai cạnh kề bằng nhau, hoặc hai đường chéo vuông góc; hình thoi có một góc vuông, hoặc hai đường chéo bằng nhau.'
            : 'Dấu hiệu hình thoi: tứ giác có bốn cạnh bằng nhau; hình bình hành có hai cạnh kề bằng nhau, hoặc hai đường chéo vuông góc, hoặc một đường chéo là phân giác của một góc.',
    sol:`Đáp án: <b>${good}</b> Các khẳng định còn lại thiếu điều kiện “là hình bình hành / hình chữ nhật / hình thoi” nên chưa chắc đúng.`});
};

G.topics.push({id:3, hk:1, name:'Tứ giác'});
lesson(3,'tu-giac','Bài 10. Tứ giác','Nhận biết cạnh, góc, đường chéo; tổng các góc bằng 360°; góc ngoài; chu vi.',[g10b,g10a,g10c,g10d]);
lesson(3,'hinh-thang-can','Bài 11. Hình thang cân','Góc của hình thang; góc, cạnh, đường chéo của hình thang cân; dấu hiệu nhận biết.',[g11a,g11b,g11c,g11d]);
lesson(3,'hinh-binh-hanh','Bài 12. Hình bình hành','Tính chất về cạnh, góc, đường chéo; dấu hiệu nhận biết; tìm x.',[g12a,g12b,g12c,g12d]);
lesson(3,'hinh-chu-nhat','Bài 13. Hình chữ nhật','Đường chéo (Pythagore); trung tuyến ứng với cạnh huyền; dấu hiệu nhận biết; chu vi, diện tích.',[g13a,g13b,g13c,g13d]);
lesson(3,'hinh-thoi-hinh-vuong','Bài 14. Hình thoi và hình vuông','Cạnh, góc, đường chéo hình thoi; hình vuông; dấu hiệu nhận biết.',[g14a,g14b,g14c,g14d]);
lesson(3,'on-tap-c3','Ôn tập chương III','Tổng hợp: góc tứ giác, hình thang cân, hình bình hành, hình chữ nhật, hình thoi, hình vuông.',[g10a,g11b,g12b,g13a,g14a,g14c]);
}
})();
