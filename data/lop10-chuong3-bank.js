/* =====================================================================
   NGÂN HÀNG CÂU HỎI – KIỂM TRA CHƯƠNG III, TOÁN 10 (Kết nối tri thức): Hệ thức lượng trong tam giác
   Bài 5. Giá trị lượng giác của một góc từ 0° đến 180° · Bài 6. Hệ thức lượng trong tam giác. Xuất ra globalThis.C3B10, dùng chung cho:
     – giao-vien/bai-giang/lop10-kiem-tra-c3.js : đề in A4 cho giáo viên (mã 131–134, n = 0);
     – data/lop10-chuong3-kiem-tra.js           : bài làm trực tuyến 45 phút cho học sinh (n = 0, 1).
   Mỗi câu là hàm (ci, n) → số liệu của mã đề ci (0..3) ở bộ n; mỗi dạng có 8 phiên bản (ci + 4n).
   Cấu trúc 10 điểm (45 phút): 10 TN × 0,5 = 5 điểm · 3 Đ/S (mỗi câu 4 ý) × 1 = 3 điểm · 2 TLN × 1 = 2 điểm.
   Phân bổ mức: TN 1 · 2 · 4 · 7 nhận biết; TN 3 · 5 · 6 · 8 thông hiểu; TN 9 · 10 vận dụng thấp (đủ 7–8 điểm cho học sinh trung bình – khá);
   Đ/S: ý a, b nhận biết – thông hiểu, ý c thông hiểu, ý d vận dụng; TLN 1 vận dụng thực tế, TLN 2 vận dụng cao (dành cho học sinh giỏi).
   Toán thực tế chiếm 4/10 điểm: TN 5 · 7 · 8 · 10 (2 điểm) + Đ/S 3 (1 điểm) + TLN 1 (1 điểm).
   Mọi đáp số được đối chiếu bằng số (hàm must). Định dạng trả về giống data/lop11-chuong2-bank.js (C2B11).
   ===================================================================== */
(() => {
const m = tm;
const p = s => `<p>${s}</p>`;
const pick = (pool, ci, n) => pool[(ci + 4 * n) % pool.length];
const uniq = (arr, what) => { if(new Set(arr).size !== arr.length) throw new Error('Phương án trùng nhau: ' + what + ' → ' + arr.join(' | ')); return arr; };
const must = (ok, what) => { if(!ok) throw new Error('Đáp án không khớp phép kiểm tra số: ' + what); };
const gcd = (a, b) => b ? gcd(b, a % b) : Math.abs(a);
const rad = a => a * Math.PI / 180;
const D = a => `${a}^\\circ`;
const near = (x, y) => Math.abs(x - y) < 1e-9;
// term(num, den, r) = (num/den)·√r, rút gọn phân số, có dấu
const term = (num, den, r = 1) => { const g = gcd(num, den) || 1; num /= g; den /= g; if(den < 0){ num = -num; den = -den; }
  const a = Math.abs(num), rs = r === 1 ? '' : `\\sqrt{${r}}`, top = r === 1 ? `${a}` : (a === 1 ? rs : `${a}${rs}`), body = den === 1 ? top : `\\dfrac{${top}}{${den}}`;
  return num < 0 ? '-' + body : body; };
const tv = (num, den, r = 1) => num * Math.sqrt(r) / den;
const sqS = x => { const s = Math.round(Math.sqrt(x)); return s * s === x ? `${s}` : `\\sqrt{${x}}`; };
const fill = (correct, cands, what) => { const o = [correct]; cands.forEach(c => { if(c != null && !o.includes(c) && o.length < 4) o.push(c); }); if(o.length < 4) throw new Error('Thiếu phương án nhiễu: ' + what); return o; };
const fr = (a, b) => `\\dfrac{${a}}{${b}}`;
const ng = s => s.startsWith('-') ? s.slice(1) : '-' + s;
// bảng giá trị lượng giác góc đặc biệt: [num, r, den] ứng với (num/den)·√r
const TAB = {
  sin: {30: [1, 1, 2], 45: [1, 2, 2], 60: [1, 3, 2], 120: [1, 3, 2], 135: [1, 2, 2], 150: [1, 1, 2]},
  cos: {30: [1, 3, 2], 45: [1, 2, 2], 60: [1, 1, 2], 120: [-1, 1, 2], 135: [-1, 2, 2], 150: [-1, 3, 2]},
  tan: {30: [1, 3, 3], 45: [1, 1, 1], 60: [1, 3, 1], 120: [-1, 3, 1], 135: [-1, 1, 1], 150: [-1, 3, 3]}};
const TF = {sin: Math.sin, cos: Math.cos, tan: Math.tan};
const tval = (fn, a) => { const [u, r, d] = TAB[fn][a]; must(near(tv(u, d, r), TF[fn](rad(a))), `${fn} ${a}`); return term(u, d, r); };
// góc cho trước: dạng căn (num, den, r) sau khi nhân hệ số k
const scale = (k, fn, a) => { const [u, r, d] = TAB[fn][a]; return [k * u, d, r]; };
const tsc = (k, fn, a) => term(...scale(k, fn, a));
// các bộ (b, c, A, z) với z² = b² + c² − 2bc·cos A (A = 60° hoặc 120°)
const COS = [[3, 8, 60], [5, 8, 60], [7, 15, 60], [8, 15, 60], [3, 5, 120], [7, 8, 120], [5, 16, 120], [6, 10, 120]].map(([b, c, A]) => { const z2 = b * b + c * c - 2 * b * c * (A === 60 ? .5 : -.5), z = Math.round(Math.sqrt(z2)); must(z * z === z2, 'COS ' + [b, c, A]); return {b, c, A, z, z2}; });
const TRI = [[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25], [20, 21, 29], [9, 40, 41], [12, 35, 37], [11, 60, 61]];

/* ======================= PHẦN I: 10 câu trắc nghiệm ======================= */
// TN1 (Bài 5, nhận biết): giá trị lượng giác của góc tù đặc biệt
const tn1 = (ci, n = 0) => { const [fn, a] = pick([['sin', 150], ['cos', 120], ['tan', 135], ['cos', 150], ['sin', 120], ['cos', 135], ['tan', 150], ['sin', 135]], ci, n), ok = tval(fn, a), others = ['sin', 'cos', 'tan'].filter(f => f !== fn).map(f => tval(f, a));
  const sgn = fn === 'sin' ? '' : '-';
  return {bai:1, level:'Nhận biết', q:`Giá trị của ${m(`\\${fn}\\ ${D(a)}`)} bằng`, opts:uniq(fill(ok, [ng(ok), others[0], ng(others[0]), others[1], ng(others[1])], 'TN1').map(x => m(x)), 'TN1'),
    sol:p(`Hai góc bù nhau: ${m(fn === 'sin' ? `\\sin ${D(a)} = \\sin ${D(180 - a)}` : `\\${fn}\\ ${D(a)} = -\\${fn}\\ ${D(180 - a)}`)}.`) + p(`${m(`\\${fn}\\ ${D(a)} = ${sgn}\\${fn}\\ ${D(180 - a)} = ${ok}`)}.`)}; };
// TN2 (Bài 5, nhận biết): góc bù
const tn2 = (ci, n = 0) => { const [a, b, c] = pick(TRI, ci, n), s = (ci + n) % 2 === 0;
  return s ? {bai:1, level:'Nhận biết', q:`Cho góc nhọn ${m('\\alpha')} có ${m(`\\sin\\alpha = ${fr(a, c)}`)}. Giá trị của ${m(`\\sin(180^\\circ - \\alpha)`)} bằng`, opts:uniq([fr(a, c), '-' + fr(a, c), fr(b, c), '-' + fr(b, c)].map(x => m(x)), 'TN2'),
      sol:p(`Hai góc bù nhau có sin bằng nhau: ${m(`\\sin(180^\\circ - \\alpha) = \\sin\\alpha = ${fr(a, c)}`)}.`)}
    : {bai:1, level:'Nhận biết', q:`Cho góc nhọn ${m('\\alpha')} có ${m(`\\cos\\alpha = ${fr(b, c)}`)}. Giá trị của ${m(`\\cos(180^\\circ - \\alpha)`)} bằng`, opts:uniq(['-' + fr(b, c), fr(b, c), '-' + fr(a, c), fr(a, c)].map(x => m(x)), 'TN2'),
      sol:p(`Hai góc bù nhau có côsin đối nhau: ${m(`\\cos(180^\\circ - \\alpha) = -\\cos\\alpha = -${fr(b, c)}`)}.`)}; };
// TN3 (Bài 5, thông hiểu): góc tù biết sin
const tn3 = (ci, n = 0) => { const [a, b, c] = pick(TRI, ci + 2, n), t = (ci + n) % 2 === 1; must(a * a + b * b === c * c, 'TN3');
  return {bai:1, level:'Thông hiểu', q:`Cho góc ${m('\\alpha')} thoả mãn ${m(`90^\\circ \\lt \\alpha \\lt 180^\\circ`)} và ${m(`\\sin\\alpha = ${fr(a, c)}`)}. Giá trị của ${m(t ? '\\tan\\alpha' : '\\cos\\alpha')} bằng`,
    opts:(t ? ['-' + fr(a, b), fr(a, b), '-' + fr(b, a), fr(b, a)] : ['-' + fr(b, c), fr(b, c), '-' + fr(a, c), fr(a, c)]).map(x => m(x)),
    sol:p(`Vì ${m('\\alpha')} là góc tù nên ${m('\\cos\\alpha \\lt 0')}: ${m(`\\cos\\alpha = -\\sqrt{1 - ${fr(a * a, c * c)}} = -${fr(b, c)}`)}.`) + (t ? p(`${m(`\\tan\\alpha = \\dfrac{\\sin\\alpha}{\\cos\\alpha} = -${fr(a, b)}`)}.`) : '')}; };
// TN4 (Bài 5, nhận biết): hệ thức giữa hai góc bù nhau
const S1 = x => Math.sin(rad(x)), C1 = x => Math.cos(rad(x)), T1 = x => Math.tan(rad(x));
const OKS = [['\\sin(180^\\circ - \\alpha) = \\sin\\alpha', x => S1(180 - x), x => S1(x)], ['\\cos(180^\\circ - \\alpha) = -\\cos\\alpha', x => C1(180 - x), x => -C1(x)], ['\\tan(180^\\circ - \\alpha) = -\\tan\\alpha', x => T1(180 - x), x => -T1(x)], ['\\sin\\alpha = \\sin(180^\\circ - \\alpha)', x => S1(x), x => S1(180 - x)]];
const BAD = [['\\sin(180^\\circ - \\alpha) = -\\sin\\alpha', x => S1(180 - x), x => -S1(x)], ['\\cos(180^\\circ - \\alpha) = \\cos\\alpha', x => C1(180 - x), x => C1(x)], ['\\tan(180^\\circ - \\alpha) = \\tan\\alpha', x => T1(180 - x), x => T1(x)], ['\\sin(180^\\circ - \\alpha) = \\cos\\alpha', x => S1(180 - x), x => C1(x)], ['\\cos(180^\\circ - \\alpha) = \\sin\\alpha', x => C1(180 - x), x => S1(x)], ['\\cos\\alpha = \\cos(180^\\circ - \\alpha)', x => C1(x), x => C1(180 - x)]];
const tn4 = (ci, n = 0) => { const j = ci + 4 * n, g = OKS[j % 4], o = [0, 1, 2].map(i => BAD[(j + 2 * i) % 6]);
  must(near(g[1](37), g[2](37)) && o.every(x => !near(x[1](37), x[2](37))), 'TN4');
  return {bai:1, level:'Nhận biết', q:`Với góc ${m('\\alpha')} (${m('0^\\circ \\lt \\alpha \\lt 180^\\circ')}, ${m('\\alpha \\ne 90^\\circ')}), khẳng định nào sau đây đúng?`, opts:[g, ...o].map(x => m(x[0])),
    sol:p('Hai góc bù nhau có sin bằng nhau, còn côsin và tang đối nhau.') + p(`Vậy ${m(g[0])}.`)}; };
// TN5 (Bài 5, thông hiểu, thực tế): chiếc thang dựa tường
const tn5 = (ci, n = 0) => { const [L, a, fn] = pick([[10, 30, 'sin'], [8, 60, 'sin'], [12, 60, 'cos'], [8, 30, 'cos'], [6, 60, 'sin'], [14, 30, 'sin'], [10, 60, 'cos'], [12, 30, 'cos']], ci, n), o = fn === 'sin' ? 'cos' : 'sin', ok = tsc(L, fn, a);
  return {bai:1, level:'Thông hiểu', tt:true, q:`Một chiếc thang dài ${L} m được dựa vào bức tường thẳng đứng, thang tạo với mặt đất (phẳng, nằm ngang) một góc ${m(D(a))}. ${fn === 'sin' ? 'Đỉnh thang chạm tường ở độ cao bao nhiêu mét so với mặt đất?' : 'Chân thang cách tường bao nhiêu mét?'}`,
    opts:uniq(fill(ok, [tsc(L, o, a), `${L}`, tsc(2 * L, fn, a), tsc(L, 'tan', a)], 'TN5').map(x => m(x)), 'TN5'),
    sol:p(`Thang, tường và mặt đất tạo thành tam giác vuông, cạnh huyền ${m(L)} m, góc nhọn ${m(D(a))}.`) + p(`${fn === 'sin' ? 'Độ cao' : 'Khoảng cách'} ${m(`= ${L}\\${fn}\\ ${D(a)} = ${ok}`)} (m).`)}; };
// TN6 (Bài 6, thông hiểu): định lí côsin tính cạnh
const tn6 = (ci, n = 0) => { const {b, c, A, z, z2} = pick(COS, ci, n), w = A === 60 ? b * b + c * c + b * c : b * b + c * c - b * c;
  return {bai:2, level:'Thông hiểu', q:`Cho tam giác ${m('ABC')} có ${m(`AB = ${b}`)}, ${m(`AC = ${c}`)} và ${m(`\\widehat{A} = ${D(A)}`)}. Độ dài cạnh ${m('BC')} bằng`, opts:uniq([`${z}`, sqS(b * b + c * c), sqS(w), `${b + c}`].map(x => m(x)), 'TN6'),
    sol:p(`Theo định lí côsin: ${m(`BC^2 = AB^2 + AC^2 - 2\\cdot AB\\cdot AC\\cos ${D(A)}`)}.`) + p(`${m(`BC^2 = ${b * b} + ${c * c} - 2\\cdot ${b}\\cdot ${c}\\cdot ${A === 60 ? '\\dfrac12' : '\\left(-\\dfrac12\\right)'} = ${z2}`)}, suy ra ${m(`BC = ${z}`)}.`)}; };
// TN7 (Bài 6, nhận biết, thực tế): bán kính vùng phủ sóng = bán kính đường tròn ngoại tiếp
const tn7 = (ci, n = 0) => { const [a, A] = pick([[6, 30], [8, 150], [10, 45], [12, 60], [6, 45], [9, 60], [14, 30], [4, 45]], ci, n), [u, r, d] = TAB.sin[A], R = term(a * d, 2 * u * r, r);
  must(near(tv(a * d, 2 * u * r, r), a / (2 * Math.sin(rad(A)))), 'TN7');
  return {bai:2, level:'Nhận biết', tt:true, q:`Ba trạm phát sóng ${m('A')}, ${m('B')}, ${m('C')} nằm ở ba đỉnh của một tam giác. Vùng phủ sóng là hình tròn đi qua cả ba trạm. Biết ${m(`BC = ${a}`)} km và ${m(`\\widehat{BAC} = ${D(A)}`)}. Bán kính vùng phủ sóng bằng (km)`,
    opts:uniq(fill(R, [term(a * d, u * r, r), `${a}`, term(a, 2), `${a}\\sqrt{3}`, `${a}\\sqrt{2}`], 'TN7').map(x => m(x)), 'TN7'),
    sol:p(`Vùng phủ sóng là đường tròn ngoại tiếp tam giác ${m('ABC')}. Theo định lí sin: ${m(`\\dfrac{BC}{\\sin A} = 2R`)}.`) + p(`${m(`R = \\dfrac{${a}}{2\\sin ${D(A)}} = ${R}`)} (km).`)}; };
// TN8 (Bài 6, thông hiểu, thực tế): diện tích mảnh đất
const tn8 = (ci, n = 0) => { const [b, c, A] = pick([[20, 30, 30], [12, 10, 30], [10, 12, 60], [8, 15, 60], [12, 10, 45], [14, 20, 45], [10, 24, 150], [16, 15, 120]], ci, n), [u, r, d] = TAB.sin[A], [cu, cr, cd] = TAB.cos[A], S = term(b * c * u, 2 * d, r);
  return {bai:2, level:'Thông hiểu', tt:true, q:`Một mảnh đất hình tam giác ${m('ABC')} có ${m(`AB = ${b}`)} m, ${m(`AC = ${c}`)} m và ${m(`\\widehat{BAC} = ${D(A)}`)}. Diện tích mảnh đất bằng (m²)`,
    opts:uniq(fill(S, [term(b * c * u, d, r), term(b * c, 2), term(b * c * Math.abs(cu), 2 * cd, cr), `${b * c}`], 'TN8').map(x => m(x)), 'TN8'),
    sol:p(`Diện tích tam giác: ${m(`S = \\dfrac12\\cdot AB\\cdot AC\\cdot\\sin A`)}.`) + p(`${m(`S = \\dfrac12\\cdot ${b}\\cdot ${c}\\cdot\\sin ${D(A)} = ${S}`)} (m²).`)}; };
// TN9 (Bài 6, vận dụng thấp): tìm góc khi biết ba cạnh
const tn9 = (ci, n = 0) => { const T = [[7, 3, 8, 60], [7, 5, 8, 60], [13, 7, 15, 60], [13, 8, 15, 60], [7, 3, 5, 120], [13, 7, 8, 120], [19, 5, 16, 120], [14, 6, 10, 120]], [a, b, c, A] = pick(T, ci, n), num = b * b + c * c - a * a;
  must(near(num / (2 * b * c), A === 60 ? .5 : -.5), 'TN9');
  return {bai:2, level:'Vận dụng thấp', q:`Cho tam giác ${m('ABC')} có ${m(`BC = ${a}`)}, ${m(`CA = ${b}`)}, ${m(`AB = ${c}`)}. Số đo góc ${m('A')} bằng`, opts:uniq([A, 180 - A, 30, 150].map(x => m(D(x))), 'TN9'),
    sol:p(`${m(`\\cos A = \\dfrac{AB^2 + AC^2 - BC^2}{2\\cdot AB\\cdot AC} = \\dfrac{${c * c} + ${b * b} - ${a * a}}{2\\cdot ${c}\\cdot ${b}} = ${A === 60 ? '\\dfrac12' : '-\\dfrac12'}`)}.`) + p(`Vậy ${m(`\\widehat{A} = ${D(A)}`)}.`)}; };
// TN10 (Bài 6, vận dụng thấp, thực tế): khoảng cách hai tàu
const tn10 = (ci, n = 0) => { const {b, c, A, z} = pick(COS, ci + 3, n), t = 2 + (ci + n) % 2, w = A === 60 ? b * b + c * c + b * c : b * b + c * c - b * c;
  return {bai:2, level:'Vận dụng thấp', tt:true, q:`Hai tàu cùng rời cảng ${m('O')} lúc 8 giờ theo hai hướng tạo với nhau góc ${m(D(A))}. Tàu thứ nhất chạy với vận tốc ${b} km/h, tàu thứ hai chạy với vận tốc ${c} km/h. Hỏi sau ${t} giờ hai tàu cách nhau bao nhiêu ki-lô-mét?`,
    opts:uniq([`${t * z}`, `${t}\\sqrt{${b * b + c * c}}`, `${t * (b + c)}`, `${t}\\sqrt{${w}}`].map(x => m(x)), 'TN10'),
    sol:p(`Sau ${m(t)} giờ: ${m(`OA = ${t * b}`)} km, ${m(`OB = ${t * c}`)} km, ${m(`\\widehat{AOB} = ${D(A)}`)}.`) + p(`${m(`AB^2 = ${(t * b) ** 2} + ${(t * c) ** 2} - 2\\cdot ${t * b}\\cdot ${t * c}\\cos ${D(A)} = ${t * t * z * z}`)}, suy ra ${m(`AB = ${t * z}`)} (km).`)}; };

/* ======================= PHẦN II: 3 câu đúng – sai ======================= */
// Đ/S 1 (Bài 5): góc tù biết sin
const ds1 = (ci, n = 0) => { const [a, b, c] = pick(TRI, ci, n); must(a * a + b * b === c * c, 'DS1');
  return {bai:1, stem:`Cho góc ${m('\\alpha')} thoả mãn ${m('90^\\circ \\lt \\alpha \\lt 180^\\circ')} và ${m(`\\sin\\alpha = ${fr(a, c)}`)}. Xét tính đúng sai của các mệnh đề sau:`, items:[
    {t:[`${m('\\sin(180^\\circ - \\alpha)')} bằng ${m(fr(a, c))}.`, `${m('\\sin(180^\\circ - \\alpha)')} bằng ${m('-' + fr(a, c))}.`],
     s:[p(`Hai góc bù nhau có sin bằng nhau nên ${m(`\\sin(180^\\circ - \\alpha) = ${fr(a, c)}`)}.`), p(`Sai: ${m(`\\sin(180^\\circ - \\alpha) = \\sin\\alpha = ${fr(a, c)} \\gt 0`)}.`)]},
    {t:[`${m('\\cos\\alpha')} bằng ${m('-' + fr(b, c))}.`, `${m('\\cos\\alpha')} bằng ${m(fr(b, c))}.`],
     s:[p(`${m(`\\cos^2\\alpha = 1 - ${fr(a * a, c * c)} = ${fr(b * b, c * c)}`)} và ${m('\\alpha')} tù nên ${m(`\\cos\\alpha = -${fr(b, c)}`)}.`), p(`Sai: ${m('\\alpha')} là góc tù nên ${m('\\cos\\alpha \\lt 0')}.`)]},
    {t:[`${m('\\tan\\alpha')} bằng ${m('-' + fr(a, b))}.`, `${m('\\tan\\alpha')} bằng ${m('-' + fr(b, a))}.`],
     s:[p(`${m(`\\tan\\alpha = \\dfrac{\\sin\\alpha}{\\cos\\alpha} = \\dfrac{${fr(a, c)}}{-${fr(b, c)}} = -${fr(a, b)}`)}.`), p(`Sai: ${m(`\\tan\\alpha = -${fr(a, b)}`)}.`)]},
    {t:[`${m('\\sin\\alpha - \\cos\\alpha')} bằng ${m(fr(a + b, c))}.`, `${m('\\sin\\alpha - \\cos\\alpha')} bằng ${m(fr(Math.abs(a - b), c))}.`],
     s:[p(`${m(`\\sin\\alpha - \\cos\\alpha = ${fr(a, c)} - \\left(-${fr(b, c)}\\right) = ${fr(a + b, c)}`)}.`), p(`Sai: do ${m('\\cos\\alpha \\lt 0')} nên phải cộng: ${m(fr(a + b, c))}.`)]}]}; };
// Đ/S 2 (Bài 5): giá trị lượng giác góc tù đặc biệt
const ds2 = (ci, n = 0) => { const th = pick([120, 135, 150, 120, 135, 150, 120, 135], ci, n), sn = tval('sin', th), cs = tval('cos', th), tg = tval('tan', th),
    sc = th === 135 ? '\\sqrt{2}' : '\\dfrac{1 + \\sqrt{3}}{2}', scBad = th === 135 ? '0' : '\\dfrac{\\sqrt{3} - 1}{2}';
  must(near(Math.sin(rad(th)) - Math.cos(rad(th)), th === 135 ? Math.SQRT2 : (1 + Math.sqrt(3)) / 2), 'DS2');
  return {bai:1, stem:`Cho góc ${m(`\\theta = ${D(th)}`)}. Xét tính đúng sai của các mệnh đề sau:`, items:[
    {t:[`${m('\\sin\\theta')} bằng ${m(sn)}.`, `${m('\\sin\\theta')} bằng ${m(ng(sn))}.`],
     s:[p(`${m(`\\sin ${D(th)} = \\sin ${D(180 - th)} = ${sn}`)}.`), p(`Sai: ${m(`\\sin ${D(th)} = ${sn} \\gt 0`)}.`)]},
    {t:[`${m('\\cos\\theta')} bằng ${m(cs)}.`, `${m('\\cos\\theta')} bằng ${m(ng(cs))}.`],
     s:[p(`${m(`\\cos ${D(th)} = -\\cos ${D(180 - th)} = ${cs}`)}.`), p(`Sai: góc tù có côsin âm, ${m(`\\cos ${D(th)} = ${cs}`)}.`)]},
    {t:[`${m('\\tan\\theta')} bằng ${m(tg)}.`, `${m('\\tan\\theta')} bằng ${m(ng(tg))}.`],
     s:[p(`${m(`\\tan ${D(th)} = \\dfrac{\\sin ${D(th)}}{\\cos ${D(th)}} = ${tg}`)}.`), p(`Sai: ${m(`\\tan ${D(th)} = ${tg}`)} (góc tù có tang âm).`)]},
    {t:[`${m('\\sin\\theta - \\cos\\theta')} bằng ${m(sc)}.`, `${m('\\sin\\theta - \\cos\\theta')} bằng ${m(scBad)}.`],
     s:[p(`${m(`\\sin ${D(th)} - \\cos ${D(th)} = ${sn} - \\left(${cs}\\right) = ${sc}`)}.`), p(`Sai: ${m('\\cos\\theta')} âm nên hiệu là tổng hai giá trị tuyệt đối: ${m(sc)}.`)]}]}; };
// Đ/S 3 (Bài 6): bài toán thực tế – đo khoảng cách qua ao
const CTX = ['Để đo khoảng cách giữa hai điểm {A} và {B} nằm ở hai phía của một cái ao, người ta chọn điểm {C} rồi đo được', 'Để biết khoảng cách giữa hai ngọn đồi {A} và {B} bị ngăn cách bởi một thung lũng, người ta chọn điểm {C} và đo được'];
const ds3 = (ci, n = 0) => { const {b: x, c: y, A: g, z, z2} = pick(COS, ci + 1, n), ctx = CTX[(ci + n) % 2].replace('{A}', m('A')).replace('{B}', m('B')).replace('{C}', m('C')), w = g === 60 ? x * x + y * y + x * y : x * x + y * y - x * y,
    cosA = (x * x + z2 - y * y) / (2 * x * z), acute = cosA > 0, S = term(x * y, 4, 3);
  must(Math.abs(cosA) > 1e-9, 'DS3 góc vuông'); must(near(Math.sqrt(z2), z), 'DS3');
  return {bai:2, stem:`${ctx} ${m(`CA = ${x}`)} m, ${m(`CB = ${y}`)} m và ${m(`\\widehat{ACB} = ${D(g)}`)}. Xét tính đúng sai của các mệnh đề sau:`, items:[
    {t:[`Khoảng cách ${m('AB')} bằng ${m(z)} m.`, `Khoảng cách ${m('AB')} bằng ${m(sqS(w))} m.`],
     s:[p(`${m(`AB^2 = ${x * x} + ${y * y} - 2\\cdot ${x}\\cdot ${y}\\cos ${D(g)} = ${z2}`)}, suy ra ${m(`AB = ${z}`)} m.`), p(`Sai: ${g === 60 ? 'trừ' : 'cộng'} chứ không ${g === 60 ? 'cộng' : 'trừ'} tích ${m(`${x}\\cdot ${y}`)} (do ${m(`\\cos ${D(g)}`)} ${g === 60 ? 'dương' : 'âm'}); ${m(`AB = ${z}`)} m.`)]},
    {t:[`Diện tích tam giác ${m('ABC')} bằng ${m(S)} ${m('\\text{m}^2')}.`, `Diện tích tam giác ${m('ABC')} bằng ${m(term(x * y, 2, 3))} ${m('\\text{m}^2')}.`],
     s:[p(`${m(`S = \\dfrac12\\cdot CA\\cdot CB\\cdot\\sin ${D(g)} = \\dfrac12\\cdot ${x}\\cdot ${y}\\cdot\\dfrac{\\sqrt{3}}{2} = ${S}`)}.`), p(`Sai: đã quên nhân ${m('\\dfrac12')}; đúng là ${m(S)}.`)]},
    {t:[`Góc ${m('A')} của tam giác ${m('ABC')} là góc ${acute ? 'nhọn' : 'tù'}.`, `Góc ${m('A')} của tam giác ${m('ABC')} là góc ${acute ? 'tù' : 'nhọn'}.`],
     s:[p(`${m(`\\cos A = \\dfrac{AB^2 + CA^2 - CB^2}{2\\cdot AB\\cdot CA} = \\dfrac{${z2} + ${x * x} - ${y * y}}{${2 * x * z}} ${acute ? '\\gt' : '\\lt'} 0`)} nên ${m('A')} là góc ${acute ? 'nhọn' : 'tù'}.`), p(`Sai: ${m('\\cos A')} ${acute ? 'dương' : 'âm'} nên ${m('A')} là góc ${acute ? 'nhọn' : 'tù'}.`)]},
    {t:[`Bán kính đường tròn ngoại tiếp tam giác ${m('ABC')} bằng ${m(term(z, 3, 3))} m.`, `Bán kính đường tròn ngoại tiếp tam giác ${m('ABC')} bằng ${m(term(z, 2, 3))} m.`],
     s:[p(`${m(`R = \\dfrac{AB}{2\\sin ${D(g)}} = \\dfrac{${z}}{\\sqrt{3}} = ${term(z, 3, 3)}`)} m.`), p(`Sai: ${m(`2\\sin ${D(g)} = \\sqrt{3}`)} nên ${m(`R = ${term(z, 3, 3)}`)}.`)]}]}; };

/* ======================= PHẦN III: 2 câu trả lời ngắn ======================= */
const short = s => { if(String(s).length > 4) throw new Error('Đáp số quá 4 kí tự: ' + s); return s; };
const HER = [[13, 14, 15], [7, 15, 20], [9, 10, 17], [10, 17, 21]];
const heron = (a, b, c) => { const pp = (a + b + c) / 2, s2 = pp * (pp - a) * (pp - b) * (pp - c), S = Math.round(Math.sqrt(s2)); must(S * S === s2, 'Heron ' + [a, b, c]); return {pp, S}; };
const tln1 = (ci, n = 0) => { const v = pick([['S', 40, 30, 30], ['H', 0], ['S', 36, 50, 150], ['H', 1], ['S', 60, 20, 30], ['H', 2], ['S', 44, 50, 150], ['H', 3]], ci, n);
  if(v[0] === 'S'){ const [, b, c, A] = v, S = b * c / 4; must(Number.isInteger(S), 'TLN1 S');
    return {bai:2, pts:1, q:`Một mảnh vườn hình tam giác ${m('ABC')} có ${m(`AB = ${b}`)} m, ${m(`AC = ${c}`)} m và ${m(`\\widehat{BAC} = ${D(A)}`)}. Tính diện tích mảnh vườn (đơn vị: ${m('\\text{m}^2')}).`, ans:short(S),
      sol:p(`${m(`S = \\dfrac12\\cdot AB\\cdot AC\\cdot\\sin ${D(A)} = \\dfrac12\\cdot ${b}\\cdot ${c}\\cdot\\dfrac12 = ${S}`)} (${m('\\text{m}^2')}).`)}; }
  const [a, b, c] = HER[v[1]], {pp, S} = heron(a, b, c);
  return {bai:2, pts:1, q:`Một mảnh đất hình tam giác có ba cạnh dài ${a} m, ${b} m và ${c} m. Tính diện tích mảnh đất (đơn vị: ${m('\\text{m}^2')}).`, ans:short(S),
    sol:p(`Nửa chu vi ${m(`p = \\dfrac{${a} + ${b} + ${c}}{2} = ${pp}`)}.`) + p(`Theo công thức Heron: ${m(`S = \\sqrt{${pp}(${pp} - ${a})(${pp} - ${b})(${pp} - ${c})} = ${S}`)} (${m('\\text{m}^2')}).`)}; };
// TLN2: vận dụng cao – (A) tìm cạnh khi biết hai cạnh và diện tích; (B) bán kính đường tròn nội tiếp
const PA = []; TRI.slice(0, 4).forEach(([s, k, t]) => { let got = 0; for(let b = 4; b <= 40 && got < 2; b++) for(let c = b + 1; c <= 40 && got < 2; c++){ const S2 = b * c * s, z2 = b * b + c * c - 2 * b * c * k / t; if(S2 % (2 * t) === 0 && Number.isInteger(z2) && z2 > 0 && Number.isInteger(Math.sqrt(z2))){ PA.push({s, k, t, b, c, S:S2 / (2 * t), z:Math.sqrt(z2)}); got++; } } });
must(PA.length === 8, 'TLN2 thiếu bộ số');
const PB = [[8, 15, 17], [9, 12, 15], [20, 21, 29], [17, 25, 28], [5, 12, 13], [6, 8, 10], [12, 16, 20], [15, 20, 25]];
const tln2 = (ci, n = 0) => { const j = (ci + 4 * n) % 8;
  if(j % 2 === 0){ const {s, k, t, b, c, S, z} = PA[(j >> 1) * 2 + (n % 2)];
    return {bai:2, pts:1, q:`Cho tam giác ${m('ABC')} có góc ${m('A')} nhọn, ${m(`AB = ${c}`)}, ${m(`AC = ${b}`)} và diện tích ${m(`S = ${S}`)}. Tính độ dài cạnh ${m('BC')}.`, ans:short(z),
      sol:p(`${m(`S = \\dfrac12\\cdot AB\\cdot AC\\cdot\\sin A`)} nên ${m(`\\sin A = \\dfrac{2\\cdot ${S}}{${b}\\cdot ${c}} = ${fr(s, t)}`)}.`) + p(`Góc ${m('A')} nhọn nên ${m(`\\cos A = \\sqrt{1 - ${fr(s * s, t * t)}} = ${fr(k, t)}`)}.`) + p(`${m(`BC^2 = ${c * c} + ${b * b} - 2\\cdot ${c}\\cdot ${b}\\cdot ${fr(k, t)} = ${z * z}`)}, suy ra ${m(`BC = ${z}`)}.`)}; }
  const [a, b, c] = PB[(j >> 1) + 4 * (n % 2)], {pp, S} = heron(a, b, c), r = S / pp; must(Number.isInteger(r), 'TLN2 r');
  return {bai:2, pts:1, q:`Cho tam giác ${m('ABC')} có ba cạnh ${m(`BC = ${a}`)}, ${m(`CA = ${b}`)}, ${m(`AB = ${c}`)} (cùng đơn vị cm). Tính bán kính ${m('r')} của đường tròn nội tiếp tam giác (đơn vị: cm).`, ans:short(r),
    sol:p(`Nửa chu vi ${m(`p = ${pp}`)}; theo công thức Heron: ${m(`S = \\sqrt{${pp}(${pp} - ${a})(${pp} - ${b})(${pp} - ${c})} = ${S}`)}.`) + p(`${m(`S = pr`)} nên ${m(`r = \\dfrac{S}{p} = \\dfrac{${S}}{${pp}} = ${r}`)}.`)}; };

globalThis.C3B10 = {mc:[tn1, tn2, tn3, tn4, tn5, tn6, tn7, tn8, tn9, tn10], tf:[ds1, ds2, ds3], sh:[tln1, tln2]};
})();
