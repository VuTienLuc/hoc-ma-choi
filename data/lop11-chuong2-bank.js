/* =====================================================================
   NGÂN HÀNG CÂU HỎI – KIỂM TRA CHƯƠNG II, TOÁN 11 (Kết nối tri thức): Dãy số – Cấp số cộng – Cấp số nhân
   Bài 5. Dãy số · Bài 6. Cấp số cộng · Bài 7. Cấp số nhân. Xuất ra globalThis.C2B11, dùng chung cho:
     – giao-vien/bai-giang/lop11-kiem-tra-c2.js : đề in A4 cho giáo viên (mã 121–124, n = 0);
     – data/lop11-chuong2-kiem-tra.js           : bài làm trực tuyến 45 phút cho học sinh (n = 0, 1).
   Mỗi câu là hàm (ci, n) → số liệu của mã đề ci (0..3) ở bộ n (n = 0: đề in; n = 1: bộ số khác); mỗi dạng có 8 phiên bản (ci + 4n).
   Cấu trúc 10 điểm (45 phút): 10 TN × 0,5 = 5 điểm · 3 Đ/S (mỗi câu 4 ý) × 1 = 3 điểm · 2 TLN × 1 = 2 điểm.
   Phân bổ mức: TN 1–2 · 4 · 7 nhận biết; TN 3 · 5 · 6 · 8 thông hiểu; TN 9 · 10 vận dụng thấp (đủ 7–8 điểm cho học sinh trung bình – khá);
   Đ/S: ý a, b nhận biết – thông hiểu, ý c thông hiểu, ý d vận dụng; TLN 1 vận dụng thực tế, TLN 2 vận dụng cao (dành cho học sinh giỏi).
   Đáp án suy ra bằng phép tính và được đối chiếu bằng liệt kê số hạng (hàm must). Định dạng trả về giống data/lop11-giua-ki-bank.js (GK11):
     mc: {bai, level, q, opts:[ĐÚNG, sai, sai, sai], sol} · tf: {bai, stem, items:[{t:[câu đúng, câu sai], s:[lời giải, lời giải]}×4]} · sh: {bai, pts, q, ans, sol}
   ===================================================================== */
(() => {
const m = tm;
const p = s => `<p>${s}</p>`;
const pick = (pool, ci, n) => pool[(ci + 4 * n) % pool.length];
const uniq = (arr, what) => { if(new Set(arr).size !== arr.length) throw new Error('Phương án trùng nhau: ' + what + ' → ' + arr.join(' | ')); return arr; };
const must = (ok, what) => { if(!ok) throw new Error('Đáp án không khớp phép liệt kê: ' + what); };
const sg = x => x < 0 ? `(${x})` : `${x}`;
const co = x => x === 1 ? '' : x === -1 ? '-' : `${x}`;
const lin = (a, b, v = 'n') => `${co(a)}${v} ${b < 0 ? '-' : '+'} ${Math.abs(b)}`;
const gcd = (a, b) => b ? gcd(b, a % b) : Math.abs(a);
const fr = (a, b) => { const g = gcd(a, b) || 1; a /= g; b /= g; if(b < 0){ a = -a; b = -b; } return b === 1 ? `${a}` : a < 0 ? `-\\dfrac{${-a}}{${b}}` : `\\dfrac{${a}}{${b}}`; };
const dec = x => String(x).replace('.', '{,}');
const nth = n => `u_{${n}}`;
const Z = (k, e = 6) => [...Array(k)].map((_, i) => i + 1);
const seq = (f, k) => Z(k).map(f);
const isDec = f => Z(60).every(i => f(i + 1) < f(i));
const isArith = f => { const d = f(2) - f(1); return Z(30).every(i => Math.abs(f(i + 1) - f(i) - d) < 1e-9); };
const isGeo = f => { const q = f(2) / f(1); return f(1) !== 0 && q !== 0 && Math.abs(q) !== 1 && Z(12).every(i => Math.abs(f(i + 1) / f(i) - q) < 1e-9); };
const S_ar = (u1, d, k) => k * (2 * u1 + (k - 1) * d) / 2;
const S_ge = (u1, q, k) => u1 * (q ** k - 1) / (q - 1);

/* ======================= PHẦN I: 10 câu trắc nghiệm ======================= */
// TN1 (Bài 5, nhận biết): giá trị một số hạng khi biết công thức số hạng tổng quát
const tn1 = (ci, n = 0) => { const [a, b, k] = pick([[2, 3, 5], [3, -2, 4], [2, -5, 6], [3, 1, 4], [2, 4, 7], [4, -3, 3], [5, 2, 3], [2, -1, 8]], ci, n), u = x => a ** x + b * x;
  must(u(k) === seq(i => a ** i + b * i, k)[k - 1], 'TN1');
  return {bai:1, level:'Nhận biết', q:`Cho dãy số ${m('(u_n)')} với ${m(`u_n = ${a}^n ${b < 0 ? '-' : '+'} ${Math.abs(b)}n`)}. Số hạng ${m(nth(k))} bằng`,
    opts:uniq([u(k), a * k + b * k, a ** k + b, a ** (k - 1) + b * k].map(x => m(x)), 'TN1'),
    sol:p(`${m(`${nth(k)} = ${a}^{${k}} ${b < 0 ? '-' : '+'} ${Math.abs(b)}\\cdot ${k} = ${a ** k} ${b < 0 ? '-' : '+'} ${Math.abs(b) * k} = ${u(k)}`)}.`)}; };
// TN2 (Bài 5, nhận biết): dãy cho bằng hệ thức truy hồi
const tn2 = (ci, n = 0) => { const [a, pp, q] = pick([[2, 2, 1], [1, 3, -1], [3, 2, -2], [-1, 2, 3], [3, -2, 5], [1, 2, 5], [4, 3, -5], [2, 3, 1]], ci, n);
  const u = [a]; for(let i = 1; i < 6; i++) u.push(pp * u[i - 1] + q);
  return {bai:1, level:'Nhận biết', q:`Cho dãy số ${m('(u_n)')} xác định bởi ${m(`u_1 = ${a}`)} và ${m(`u_{n+1} = ${co(pp)}u_n ${q < 0 ? '-' : '+'} ${Math.abs(q)}`)} với mọi ${m('n \\ge 1')}. Số hạng ${m('u_4')} bằng`,
    opts:uniq([u[3], u[2], u[4], pp * u[2] - q].map(x => m(x)), 'TN2'),
    sol:p(`${m(`u_2 = ${co(pp)}\\cdot ${sg(a)} ${q < 0 ? '-' : '+'} ${Math.abs(q)} = ${u[1]}`)}; ${m(`u_3 = ${u[2]}`)}; ${m(`u_4 = ${co(pp)}\\cdot ${sg(u[2])} ${q < 0 ? '-' : '+'} ${Math.abs(q)} = ${u[3]}`)}.`)}; };
// TN3 (Bài 5, thông hiểu): dãy số giảm
const DEC = [['u_n = 7 - 2n', i => 7 - 2 * i], ['u_n = \\dfrac{1}{n + 2}', i => 1 / (i + 2)], ['u_n = \\dfrac{2n + 3}{n + 1}', i => (2 * i + 3) / (i + 1)], ['u_n = \\left(\\dfrac{1}{2}\\right)^n', i => 0.5 ** i],
  ['u_n = -n^2', i => -i * i], ['u_n = \\dfrac{5}{n}', i => 5 / i], ['u_n = 10 - 3n', i => 10 - 3 * i], ['u_n = \\dfrac{n + 4}{n}', i => (i + 4) / i]];
const NOD = [['u_n = 3n + 1', i => 3 * i + 1], ['u_n = n^2 + 1', i => i * i + 1], ['u_n = \\dfrac{n}{n + 1}', i => i / (i + 1)], ['u_n = 2^n', i => 2 ** i], ['u_n = (-1)^n', i => (-1) ** i],
  ['u_n = \\dfrac{(-1)^n}{n}', i => (-1) ** i / i], ['u_n = n^2 - 6n', i => i * i - 6 * i], ['u_n = (-2)^n', i => (-2) ** i], ['u_n = \\dfrac{3n + 5}{n + 2}', i => (3 * i + 5) / (i + 2)]];
const tn3 = (ci, n = 0) => { const j = ci + 4 * n, d = DEC[j % DEC.length], o = [NOD[j % NOD.length], NOD[(j + 3) % NOD.length], NOD[(j + 6) % NOD.length]];
  must(isDec(d[1]) && o.every(x => !isDec(x[1])), 'TN3');
  return {bai:1, level:'Thông hiểu', q:'Dãy số nào sau đây là dãy số giảm?', opts:[d, ...o].map(x => m(x[0])),
    sol:p(`Xét hiệu ${m('u_{n+1} - u_n')} của từng dãy: chỉ dãy ${m(d[0])} có ${m('u_{n+1} \\lt u_n')} với mọi ${m('n \\ge 1')}.`) + p(`Các dãy còn lại là dãy tăng hoặc không tăng, không giảm (đổi dấu hoặc luôn tăng).`)}; };
// TN4 (Bài 6, nhận biết): nhận dạng cấp số cộng
const AR = [['u_n = 3n - 2', i => 3 * i - 2], ['u_n = 5 - 2n', i => 5 - 2 * i], ['u_n = 4n + 7', i => 4 * i + 7], ['u_n = -3n', i => -3 * i], ['u_n = 6n - 1', i => 6 * i - 1], ['u_n = 2 - n', i => 2 - i], ['u_n = 7n + 4', i => 7 * i + 4], ['u_n = \\dfrac{n + 3}{2}', i => (i + 3) / 2]];
const NAR = [['u_n = n^2 + 1', i => i * i + 1], ['u_n = 2^n', i => 2 ** i], ['u_n = \\dfrac{1}{n}', i => 1 / i], ['u_n = 3^n - 1', i => 3 ** i - 1], ['u_n = (-1)^n', i => (-1) ** i], ['u_n = n^3', i => i ** 3], ['u_n = 2n^2 - n', i => 2 * i * i - i], ['u_n = n(n + 1)', i => i * (i + 1)]];
const tn4 = (ci, n = 0) => { const j = ci + 4 * n, a = AR[j % AR.length], o = [NAR[j % NAR.length], NAR[(j + 3) % NAR.length], NAR[(j + 5) % NAR.length]];
  must(isArith(a[1]) && o.every(x => !isArith(x[1])), 'TN4');
  const d = a[1](2) - a[1](1);
  return {bai:2, level:'Nhận biết', q:`Dãy số ${m('(u_n)')} nào sau đây là cấp số cộng?`, opts:[a, ...o].map(x => m(x[0])),
    sol:p(`Dãy ${m(a[0])} có ${m(`u_{n+1} - u_n = ${fr(Math.round(d * 2), 2)}`)} không đổi nên là cấp số cộng.`) + p('Các dãy còn lại có hiệu hai số hạng liên tiếp thay đổi theo ' + m('n') + '.')}; };
// TN5 (Bài 6, thông hiểu): công sai khi biết hai số hạng
const tn5 = (ci, n = 0) => { const [u1, d, pp, q] = pick([[3, 4, 2, 7], [-5, 3, 3, 8], [7, -2, 2, 6], [2, 5, 4, 9], [10, -3, 3, 7], [-4, 6, 1, 5], [1, -4, 2, 9], [6, 2, 3, 12]], ci, n), u = k => u1 + (k - 1) * d, A = u(pp), B = u(q);
  must((B - A) / (q - pp) === d, 'TN5');
  return {bai:2, level:'Thông hiểu', q:`Cho cấp số cộng ${m('(u_n)')} có ${m(`${nth(pp)} = ${A}`)} và ${m(`${nth(q)} = ${B}`)}. Công sai ${m('d')} của cấp số cộng bằng`, opts:uniq([d, -d, B - A, d + 1].map(x => m(x)), 'TN5'),
    sol:p(`${m(`${nth(q)} - ${nth(pp)} = ${q - pp}d`)}, suy ra ${m(`d = \\dfrac{${B} - ${sg(A)}}{${q - pp}} = ${d}`)}.`)}; };
// TN6 (Bài 6, thông hiểu): tổng của một dãy cách đều
const tn6 = (ci, n = 0) => { const [a, d, N] = pick([[2, 3, 20], [5, 4, 15], [1, 2, 30], [10, -3, 12], [4, 5, 18], [7, 3, 25], [-3, 4, 16], [8, -2, 14]], ci, n), last = a + (N - 1) * d, S = S_ar(a, d, N);
  must(seq(i => a + (i - 1) * d, N).reduce((s, x) => s + x, 0) === S, 'TN6');
  return {bai:2, level:'Thông hiểu', q:`Tổng ${m(`S = ${a} + ${sg(a + d)} + ${sg(a + 2 * d)} + \\cdots + ${sg(last)}`)} bằng`, opts:uniq([S, S_ar(a, d, N - 1), S_ar(a, d, N + 1), N * (a + last)].map(x => m(x)), 'TN6'),
    sol:p(`Đây là tổng của cấp số cộng có ${m(`u_1 = ${a},\\ d = ${d}`)}, số hạng cuối ${m(last)}.`) + p(`Số số hạng: ${m(`\\dfrac{${sg(last)} - ${sg(a)}}{${sg(d)}} + 1 = ${N}`)}. Tổng ${m(`S = \\dfrac{${N}(${a} + ${sg(last)})}{2} = ${S}`)}.`)}; };
// TN7 (Bài 7, nhận biết): nhận dạng cấp số nhân
const GE = [['u_n = 3\\cdot 2^n', i => 3 * 2 ** i], ['u_n = (-2)^n', i => (-2) ** i], ['u_n = 5^n', i => 5 ** i], ['u_n = 4\\cdot 3^{n-1}', i => 4 * 3 ** (i - 1)], ['u_n = \\left(\\dfrac{1}{3}\\right)^n', i => (1 / 3) ** i], ['u_n = -7\\cdot 2^n', i => -7 * 2 ** i], ['u_n = 2\\cdot(-3)^n', i => 2 * (-3) ** i], ['u_n = \\dfrac{3^n}{2}', i => 3 ** i / 2]];
const NGE = [['u_n = n^2', i => i * i], ['u_n = 3n + 2', i => 3 * i + 2], ['u_n = 2^n + 1', i => 2 ** i + 1], ['u_n = \\dfrac{1}{n}', i => 1 / i], ['u_n = n^3', i => i ** 3], ['u_n = 4n - 3', i => 4 * i - 3], ['u_n = 3^n - 2', i => 3 ** i - 2], ['u_n = n + 5', i => i + 5]];
const tn7 = (ci, n = 0) => { const j = ci + 4 * n, g = GE[j % GE.length], o = [NGE[j % NGE.length], NGE[(j + 3) % NGE.length], NGE[(j + 5) % NGE.length]];
  must(isGeo(g[1]) && o.every(x => !isGeo(x[1])), 'TN7');
  return {bai:3, level:'Nhận biết', q:`Dãy số ${m('(u_n)')} nào sau đây là cấp số nhân?`, opts:[g, ...o].map(x => m(x[0])),
    sol:p(`Dãy ${m(g[0])} có ${m('\\dfrac{u_{n+1}}{u_n}')} không đổi (bằng công bội) nên là cấp số nhân.`) + p('Các dãy còn lại có thương hai số hạng liên tiếp thay đổi theo ' + m('n') + '.')}; };
// TN8 (Bài 7, thông hiểu): công bội khi biết hai số hạng
const tn8 = (ci, n = 0) => { const [u1, q, pp, r] = pick([[2, 2, 2, 5], [3, -2, 2, 5], [1, 3, 2, 5], [-2, 2, 3, 6], [5, -2, 1, 4], [2, 3, 3, 6], [1, -3, 2, 5], [6, 2, 1, 4]], ci, n), u = k => u1 * q ** (k - 1), A = u(pp), B = u(r);
  must(B / A === q ** (r - pp), 'TN8');
  return {bai:3, level:'Thông hiểu', q:`Cho cấp số nhân ${m('(u_n)')} có ${m(`${nth(pp)} = ${A}`)} và ${m(`${nth(r)} = ${B}`)}. Công bội ${m('q')} của cấp số nhân bằng`, opts:uniq([q, -q, q ** 3, q + 1].map(x => m(x)), 'TN8'),
    sol:p(`${m(`\\dfrac{${nth(r)}}{${nth(pp)}} = q^{${r - pp}}`)} nên ${m(`q^{3} = \\dfrac{${B}}{${sg(A)}} = ${q ** 3}`)}, suy ra ${m(`q = ${q}`)}.`)}; };
// TN9 (Bài 6, vận dụng thấp): ba số lập cấp số cộng
const tn9 = (ci, n = 0) => { const [p1, p2, p3, a, b, x0] = pick([[1, 2, 2, 3, -1, 4], [2, 1, 3, -2, 5, 3], [3, 2, 2, 1, 0, 5], [1, 3, 2, 4, -2, 2], [2, 2, 1, 3, 1, 6], [1, 1, 2, -1, 3, 4], [3, 1, 1, 2, 4, 3], [2, 3, 1, 0, -1, 2]], ci, n);
  must(p1 + p3 !== 2 * p2, 'TN9 thoái hoá'); const c = 2 * (p2 * x0 + b) - (p1 * x0 + a) - p3 * x0, A = p1 * x0 + a, B = p2 * x0 + b, C = p3 * x0 + c;
  must(A + C === 2 * B, 'TN9');
  return {bai:2, level:'Vận dụng thấp', q:`Tìm ${m('x')} để ba số ${m(lin(p1, a, 'x'))}, ${m(lin(p2, b, 'x'))}, ${m(lin(p3, c, 'x'))} theo thứ tự đó lập thành một cấp số cộng.`, opts:uniq([x0, x0 + 1, x0 - 1, -x0].map(x => m(`x = ${x}`)), 'TN9'),
    sol:p(`Ba số lập thành cấp số cộng khi ${m(`(${lin(p1, a, 'x')}) + (${lin(p3, c, 'x')}) = 2(${lin(p2, b, 'x')})`)}.`) + p(`${m(`${lin(p1 + p3, a + c, 'x')} = ${lin(2 * p2, 2 * b, 'x')}`)} nên ${m(`x = ${x0}`)}.`)}; };
// TN10 (Bài 7, vận dụng thấp): tổng n số hạng đầu của cấp số nhân
const tn10 = (ci, n = 0) => { const [u1, q, k] = pick([[2, 3, 5], [1, 2, 8], [3, 2, 7], [5, 2, 6], [1, -2, 6], [4, 3, 4], [2, -3, 5], [3, 4, 4]], ci, n), S = S_ge(u1, q, k);
  must(seq(i => u1 * q ** (i - 1), k).reduce((s, x) => s + x, 0) === S, 'TN10');
  return {bai:3, level:'Vận dụng thấp', q:`Cho cấp số nhân ${m('(u_n)')} có ${m(`u_1 = ${u1}`)} và công bội ${m(`q = ${q}`)}. Tổng ${k} số hạng đầu tiên của cấp số nhân bằng`, opts:uniq([S, S_ge(u1, q, k + 1), S_ge(u1, q, k - 1), u1 * q ** k].map(x => m(x)), 'TN10'),
    sol:p(`${m(`S_{${k}} = u_1\\cdot\\dfrac{q^{${k}} - 1}{q - 1} = ${u1}\\cdot\\dfrac{${sg(q)}^{${k}} - 1}{${sg(q)} - 1} = ${S}`)}.`)}; };

/* ======================= PHẦN II: 3 câu đúng – sai ======================= */
// Đ/S 1 (Bài 5): u_n = (an + b)/(n + c) – tăng giảm, bị chặn, đếm số hạng
const ds1 = (ci, n = 0) => { const [a, b, c] = pick([[3, 1, 2], [2, 7, 1], [1, 5, 2], [4, -1, 1], [3, 8, 1], [2, 3, 3], [5, 2, 1], [1, 9, 2]], ci, n), u = i => (a * i + b) / (i + c), delta = b - a * c, down = delta > 0, k = 4;
  must(down === isDec(u), 'DS1 đơn điệu');
  const t = 4 + (ci + n) % 3, cnt = t - 1; must(Z(300).filter(i => down ? u(i) > u(t) : u(i) < u(t)).length === cnt, 'DS1 đếm');
  return {bai:1, stem:`Cho dãy số ${m('(u_n)')} với ${m(`u_n = \\dfrac{${lin(a, b)}}{n ${c < 0 ? '-' : '+'} ${Math.abs(c)}}`)}. Xét tính đúng sai của các mệnh đề sau:`, items:[
    {t:[`Số hạng ${m(nth(k))} bằng ${m(fr(a * k + b, k + c))}.`, `Số hạng ${m(nth(k))} bằng ${m(fr(a * k + b, k + c + 1))}.`],
     s:[p(`${m(`${nth(k)} = \\dfrac{${a}\\cdot ${k} ${b < 0 ? '-' : '+'} ${Math.abs(b)}}{${k} ${c < 0 ? '-' : '+'} ${Math.abs(c)}} = ${fr(a * k + b, k + c)}`)}.`), p(`Sai: ${m(`${nth(k)} = ${fr(a * k + b, k + c)}`)}.`)]},
    {t:[`Dãy số ${m('(u_n)')} là dãy số ${down ? 'giảm' : 'tăng'}.`, `Dãy số ${m('(u_n)')} là dãy số ${down ? 'tăng' : 'giảm'}.`],
     s:[p(`${m(`u_n = ${a} + \\dfrac{${delta}}{n ${c < 0 ? '-' : '+'} ${Math.abs(c)}}`)}; ${down ? 'phân số có tử dương, mẫu tăng nên giá trị giảm' : 'phân số có tử âm, mẫu tăng nên giá trị tăng'}. Dãy ${down ? 'giảm' : 'tăng'}.`), p(`Sai: dãy là dãy ${down ? 'giảm' : 'tăng'}, không phải dãy ${down ? 'tăng' : 'giảm'}.`)]},
    {t:[`Mọi số hạng của dãy đều ${down ? 'lớn' : 'nhỏ'} hơn ${m(a)}.`, `Mọi số hạng của dãy đều ${down ? 'nhỏ' : 'lớn'} hơn ${m(a)}.`],
     s:[p(`${m(`u_n - ${a} = \\dfrac{${delta}}{n ${c < 0 ? '-' : '+'} ${Math.abs(c)}} ${down ? '\\gt' : '\\lt'} 0`)} với mọi ${m('n \\ge 1')}.`), p(`Sai: ${m(`u_n - ${a}`)} ${down ? 'dương' : 'âm'} với mọi ${m('n')}.`)]},
    {t:[`Có đúng ${cnt} số hạng của dãy ${down ? 'lớn' : 'bé'} hơn ${m(nth(t))}.`, `Có đúng ${cnt + 1} số hạng của dãy ${down ? 'lớn' : 'bé'} hơn ${m(nth(t))}.`],
     s:[p(`Dãy ${down ? 'giảm' : 'tăng'}: ${m(down ? `u_1 \\gt u_2 \\gt \\cdots \\gt ${nth(t)}` : `u_1 \\lt u_2 \\lt \\cdots \\lt ${nth(t)}`)}. Các số hạng ${down ? 'lớn' : 'bé'} hơn ${m(nth(t))} là ${m(`u_1,\\ \\ldots,\\ u_{${t - 1}}`)}: đúng ${cnt} số hạng.`), p(`Sai: chỉ có ${cnt} số hạng (${m(nth(t))} không ${down ? 'lớn' : 'bé'} hơn chính nó).`)]}]}; };
// Đ/S 2 (Bài 6): u_n = an + b là cấp số cộng
const ds2 = (ci, n = 0) => { const [a, b] = pick([[3, -5], [4, 1], [-2, 17], [5, -3], [2, 7], [-3, 20], [6, -4], [7, 2]], ci, n), u = i => a * i + b, k = 10 + (ci + n) % 3, N = 20;
  must(isArith(u) && u(2) - u(1) === a, 'DS2');
  const cnt0 = 5 + (ci + n) % 4, M = a > 0 ? u(cnt0) + 1 : u(cnt0) - 1, cnt = Z(500).filter(i => a > 0 ? u(i) < M : u(i) > M).length; must(cnt === cnt0, 'DS2 đếm');
  return {bai:2, stem:`Cho dãy số ${m('(u_n)')} với ${m(`u_n = ${lin(a, b)}`)}. Xét tính đúng sai của các mệnh đề sau:`, items:[
    {t:[`Dãy số ${m('(u_n)')} là cấp số cộng có công sai ${m(`d = ${a}`)}.`, `Dãy số ${m('(u_n)')} là cấp số cộng có công sai ${m(`d = ${-a}`)}.`],
     s:[p(`${m(`u_{n+1} - u_n = ${sg(a)}(n + 1) ${b < 0 ? '-' : '+'} ${Math.abs(b)} - (${lin(a, b)}) = ${a}`)} không đổi.`), p(`Sai: ${m(`u_{n+1} - u_n = ${a}`)}, không phải ${m(-a)}.`)]},
    {t:[`Số hạng ${m(nth(k))} bằng ${m(u(k))}.`, `Số hạng ${m(nth(k))} bằng ${m(u(k) + a)}.`],
     s:[p(`${m(`${nth(k)} = ${a}\\cdot ${k} ${b < 0 ? '-' : '+'} ${Math.abs(b)} = ${u(k)}`)}.`), p(`Sai: ${m(`${nth(k)} = ${u(k)}`)}.`)]},
    {t:[`Tổng ${N} số hạng đầu tiên của dãy bằng ${m(S_ar(u(1), a, N))}.`, `Tổng ${N} số hạng đầu tiên của dãy bằng ${m(S_ar(u(1), a, N) + N)}.`],
     s:[p(`${m(`u_1 = ${u(1)}`)}; ${m(`S_{${N}} = \\dfrac{${N}[2\\cdot ${sg(u(1))} + 19\\cdot ${sg(a)}]}{2} = ${S_ar(u(1), a, N)}`)}.`), p(`Sai: ${m(`S_{${N}} = ${S_ar(u(1), a, N)}`)}.`)]},
    {t:[`Có đúng ${cnt} số hạng của dãy ${a > 0 ? 'bé' : 'lớn'} hơn ${m(M)}.`, `Có đúng ${cnt + 1} số hạng của dãy ${a > 0 ? 'bé' : 'lớn'} hơn ${m(M)}.`],
     s:[p(`${m(`u_n ${a > 0 ? '\\lt' : '\\gt'} ${M} \\Leftrightarrow ${lin(a, b)} ${a > 0 ? '\\lt' : '\\gt'} ${M}`)}; có đúng ${cnt} giá trị nguyên dương của ${m('n')} thoả mãn (${m(`n = 1,\\ \\ldots,\\ ${cnt}`)}).`), p(`Sai: chỉ có ${cnt} số hạng.`)]}]}; };
// Đ/S 3 (Bài 7): bài toán thực tế – cấp số nhân
const CTX = [['Một quần thể vi khuẩn lúc 0 giờ có {a} con. Cứ sau mỗi giờ, số vi khuẩn tăng gấp {q} lần so với giờ trước.', 'giờ', 'con vi khuẩn'],
  ['Một bài đăng trên mạng xã hội lúc đầu có {a} lượt xem. Cứ sau mỗi giờ, số lượt xem tăng gấp {q} lần so với giờ trước.', 'giờ', 'lượt xem']];
const ds3 = (ci, n = 0) => { const [a, q, k, t0] = pick([[200, 2, 3, 5], [100, 3, 2, 4], [50, 2, 4, 6], [40, 3, 3, 5], [500, 2, 3, 4], [25, 4, 2, 4], [10, 5, 2, 4], [300, 2, 4, 5]], ci, n), [txt, unit, noun] = CTX[(ci + n) % 2];
  const u = i => a * q ** (i - 1), M = a * q ** (t0 - 1); let first = 0; while(a * q ** first <= M) first++; must(first === t0, 'DS3');
  must(seq(u, k + 1).reduce((s, x) => s + x, 0) === S_ge(a, q, k + 1), 'DS3 tổng');
  return {bai:3, stem:`${txt.replace('{a}', a).replace('{q}', q)} Gọi ${m('u_n')} là số ${noun} tại mốc thứ ${m('n')} (mốc thứ nhất là lúc đầu). Xét tính đúng sai của các mệnh đề sau:`, items:[
    {t:[`Dãy ${m('(u_n)')} là cấp số nhân có công bội ${m(`q = ${q}`)}.`, `Dãy ${m('(u_n)')} là cấp số nhân có công bội ${m(`q = ${q - 1}`)}.`],
     s:[p(`Mỗi ${unit} số ${noun} gấp ${q} lần ${unit} trước nên ${m('u_{n+1} = ' + q + 'u_n')}: cấp số nhân, công bội ${m(q)}.`), p(`Sai: công bội là ${m(q)}.`)]},
    {t:[`Sau ${k} ${unit}, có ${m(u(k + 1))} ${noun}.`, `Sau ${k} ${unit}, có ${m(a * q * k)} ${noun}.`],
     s:[p(`Sau ${k} ${unit} là mốc thứ ${k + 1}: ${m(`u_{${k + 1}} = ${a}\\cdot ${q}^{${k}} = ${u(k + 1)}`)}.`), p(`Sai: số ${noun} là ${m(`${a}\\cdot ${q}^{${k}} = ${u(k + 1)}`)}, không phải ${m(`${a}\\cdot ${q}\\cdot ${k}`)}.`)]},
    {t:[`Tổng số ${noun} ghi được tại ${k + 1} mốc đầu tiên bằng ${m(S_ge(a, q, k + 1))}.`, `Tổng số ${noun} ghi được tại ${k + 1} mốc đầu tiên bằng ${m(S_ge(a, q, k + 1) - a)}.`],
     s:[p(`${m(`S_{${k + 1}} = ${a}\\cdot\\dfrac{${q}^{${k + 1}} - 1}{${q} - 1} = ${S_ge(a, q, k + 1)}`)}.`), p(`Sai: ${m(`S_{${k + 1}} = ${S_ge(a, q, k + 1)}`)}.`)]},
    {t:[`Sau ít nhất ${t0} ${unit} thì số ${noun} vượt quá ${m(M)}.`, `Sau ít nhất ${t0 - 1} ${unit} thì số ${noun} vượt quá ${m(M)}.`],
     s:[p(`Số ${noun} sau ${t0 - 1} ${unit} là ${m(`${a}\\cdot ${q}^{${t0 - 1}} = ${M}`)}, chưa vượt quá ${m(M)}; sau ${t0} ${unit} là ${m(a * q ** t0)} ${m('\\gt')} ${m(M)}.`), p(`Sai: sau ${t0 - 1} ${unit} số ${noun} đúng bằng ${m(M)}, chưa vượt quá.`)]}]}; };

/* ======================= PHẦN III: 2 câu trả lời ngắn ======================= */
const short = s => { if(String(s).length > 4) throw new Error('Đáp số quá 4 kí tự: ' + s); return s; };
const tln1 = (ci, n = 0) => { const v = pick([
    ['Bạn Lan để dành tiền trong 12 tháng: tháng thứ nhất để dành 100 nghìn đồng, mỗi tháng sau để dành nhiều hơn tháng liền trước 20 nghìn đồng. Hỏi sau 12 tháng Lan để dành được tất cả bao nhiêu nghìn đồng?', 'ar', 100, 20, 12],
    ['Một rạp hát có 15 hàng ghế: hàng thứ nhất có 50 ghế, mỗi hàng sau nhiều hơn hàng liền trước 10 ghế. Rạp hát có tất cả bao nhiêu ghế?', 'ar', 50, 10, 15],
    ['Một hội trường có 25 hàng ghế: hàng thứ nhất có 18 ghế, mỗi hàng sau nhiều hơn hàng liền trước 2 ghế. Hàng ghế cuối cùng (hàng thứ 25) có bao nhiêu ghế?', 'arN', 18, 2, 25],
    ['Người ta trồng cây thành 18 hàng: hàng thứ nhất có 5 cây, mỗi hàng sau nhiều hơn hàng liền trước 3 cây. Có tất cả bao nhiêu cây được trồng?', 'ar', 5, 3, 18],
    ['Một tờ giấy dày 2 mm được gấp đôi liên tiếp 7 lần (mỗi lần gấp, độ dày tăng gấp đôi). Hỏi sau 7 lần gấp, độ dày của tờ giấy gấp là bao nhiêu milimét?', 'geN', 2, 2, 8],
    ['Ngày đầu tiên một dịch bệnh có 3 ca mắc; mỗi ngày sau số ca mắc mới gấp 2 lần ngày hôm trước. Hỏi ngày thứ 8 có bao nhiêu ca mắc mới?', 'geN', 3, 2, 8],
    ['Một tế bào phân chia: sau mỗi giờ, mỗi tế bào tạo thành 3 tế bào. Lúc đầu có 4 tế bào. Hỏi sau 5 giờ có tất cả bao nhiêu tế bào?', 'geN', 4, 3, 6],
    ['Một tin nhắn được chuyển tiếp theo vòng: vòng 1 có 1 người nhận; mỗi người ở vòng trước chuyển cho 3 người mới ở vòng sau. Hỏi sau 5 vòng, tổng số người đã nhận tin là bao nhiêu?', 'ge', 1, 3, 5]], ci, n);
  const [t, kind, u1, x, k] = v; let ans, sol;
  if(kind === 'ar'){ ans = S_ar(u1, x, k); sol = p(`Các số lập thành cấp số cộng ${m(`u_1 = ${u1},\\ d = ${x}`)}.`) + p(`${m(`S_{${k}} = \\dfrac{${k}[2\\cdot ${u1} + ${k - 1}\\cdot ${x}]}{2} = ${ans}`)}.`); }
  else if(kind === 'arN'){ ans = u1 + (k - 1) * x; sol = p(`Cấp số cộng ${m(`u_1 = ${u1},\\ d = ${x}`)}.`) + p(`${m(`u_{${k}} = u_1 + ${k - 1}d = ${u1} + ${k - 1}\\cdot ${x} = ${ans}`)}.`); }
  else if(kind === 'geN'){ ans = u1 * x ** (k - 1); sol = p(`Cấp số nhân ${m(`u_1 = ${u1},\\ q = ${x}`)}; độ dày/số lượng ở mốc thứ ${k} là ${m(`u_{${k}} = ${u1}\\cdot ${x}^{${k - 1}} = ${ans}`)}.`); }
  else { ans = S_ge(u1, x, k); sol = p(`Số người nhận ở các vòng lập thành cấp số nhân ${m(`u_1 = ${u1},\\ q = ${x}`)}.`) + p(`${m(`S_{${k}} = ${u1}\\cdot\\dfrac{${x}^{${k}} - 1}{${x} - 1} = ${ans}`)}.`); }
  return {bai:kind.startsWith('ar') ? 2 : 3, pts:1, q:t, ans:short(ans), sol}; };
const tln2 = (ci, n = 0) => { const v = pick([['A', 5, 3, 300], ['B', 3, 2, 8], ['C', 3, 2, [2, 5, 3, 7], 10], ['A', 2, 4, 500], ['B', 2, 3, 5], ['C', -1, 3, [3, 6, 2, 8], 9], ['A', 4, 5, 600], ['B', 5, 2, 6]], ci, n);
  const [kind] = v;
  if(kind === 'A'){ const [, u1, d, M] = v; let k = 1; while(S_ar(u1, d, k) <= M) k++;
    return {bai:2, pts:1, q:`Cho cấp số cộng ${m('(u_n)')} có số hạng đầu ${m(`u_1 = ${u1}`)} và công sai ${m(`d = ${d}`)}. Tìm số nguyên dương ${m('n')} nhỏ nhất để tổng ${m('n')} số hạng đầu tiên lớn hơn ${m(M)}.`, ans:short(k),
      sol:p(`${m(`S_n = \\dfrac{n[2\\cdot ${u1} + (n - 1)\\cdot ${d}]}{2}`)}.`) + p(`${m(`S_{${k - 1}} = ${S_ar(u1, d, k - 1)} \\le ${M}`)} còn ${m(`S_{${k}} = ${S_ar(u1, d, k)} \\gt ${M}`)}. Vậy ${m('n')} nhỏ nhất là ${m(k)}.`)}; }
  if(kind === 'B'){ const [, u1, q, k] = v, S = S_ge(u1, q, k); let t = 1; while(S_ge(u1, q, t) < S) t++; must(t === k, 'TLN2 B');
    return {bai:3, pts:1, q:`Cho cấp số nhân ${m('(u_n)')} có số hạng đầu ${m(`u_1 = ${u1}`)}, công bội ${m(`q = ${q}`)}. Biết tổng ${m('n')} số hạng đầu tiên bằng ${m(S)}. Tìm ${m('n')}.`, ans:short(k),
      sol:p(`${m(`S_n = ${u1}\\cdot\\dfrac{${q}^n - 1}{${q} - 1} = ${S}`)} nên ${m(`${q}^n - 1 = ${S * (q - 1) / u1}`)}, suy ra ${m(`${q}^n = ${q ** k}`)}.`) + p(`Vậy ${m(`n = ${k}`)}.`)}; }
  const [, u1, d, [pp, q, r, s], N] = v, A = 2 * u1 + (pp + q - 2) * d, B = 2 * u1 + (r + s - 2) * d; must(pp + q !== r + s, 'TLN2 C');
  return {bai:2, pts:1, q:`Cho cấp số cộng ${m('(u_n)')} thoả mãn ${m(`${nth(pp)} + ${nth(q)} = ${A}`)} và ${m(`${nth(r)} + ${nth(s)} = ${B}`)}. Tính tổng ${N} số hạng đầu tiên ${m(`S_{${N}}`)} của cấp số cộng.`, ans:short(S_ar(u1, d, N)),
    sol:p(`${m(`${nth(pp)} + ${nth(q)} = 2u_1 + ${pp + q - 2}d = ${A}`)} và ${m(`${nth(r)} + ${nth(s)} = 2u_1 + ${r + s - 2}d = ${B}`)}.`) + p(`Trừ hai vế: ${m(`${r + s - pp - q}d = ${B - A}`)}, suy ra ${m(`d = ${d}`)}, ${m(`u_1 = ${u1}`)}.`) + p(`${m(`S_{${N}} = \\dfrac{${N}[2\\cdot ${sg(u1)} + ${N - 1}\\cdot ${sg(d)}]}{2} = ${S_ar(u1, d, N)}`)}.`)}; };

globalThis.C2B11 = {mc:[tn1, tn2, tn3, tn4, tn5, tn6, tn7, tn8, tn9, tn10], tf:[ds1, ds2, ds3], sh:[tln1, tln2]};
})();
