/* =====================================================================
   DỮ LIỆU LỚP 8 – Toán, Kết nối tri thức
   Chương II. Hằng đẳng thức đáng nhớ và ứng dụng
   Bài 6 Hiệu hai bình phương. Bình phương của một tổng hay một hiệu
   Bài 7 Lập phương của một tổng. Lập phương của một hiệu
   Bài 8 Tổng và hiệu hai lập phương · Bài 9 Phân tích đa thức thành nhân tử
   Mỗi dạng bài: lv => câu hỏi. Chọn đáp án trước rồi mới dựng đề. Công thức LaTeX (tm/td/tb, core.js).
   ===================================================================== */
(() => {
const G = App.addGrade({
  id: 'lop8', name: 'Lớp 8', subject: 'Toán', book: 'Kết nối tri thức',
  topics: [ {id:2, hk:1, name:'Hằng đẳng thức đáng nhớ và ứng dụng'} ],
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
})();
