/* =====================================================================
   NGÂN HÀNG CÂU HỎI – KIỂM TRA GIỮA HỌC KÌ I, TOÁN 11 (theo ma trận tuần 8, 60 phút)
   Xuất ra globalThis.GK11, dùng chung cho:
     – giao-vien/bai-giang/lop11-giua-ki-ma-tran.js : đề in A4 cho giáo viên (mã 711–714, n = 0);
     – data/lop11-giua-ki-kiem-tra.js               : bài làm trực tuyến có đồng hồ cho học sinh (n = 0, 1).
   Mỗi câu là hàm (ci, n) → số liệu của mã đề ci (0..3) ở bộ n (n = 0: đề in; n = 1: bộ số khác).
   Mỗi dạng có 8 phiên bản (ci + 4n); đáp án suy ra bằng phép tính; phương án nhiễu là lỗi dễ nhầm.
   Định dạng trả về giống data/lop10-giua-ki-bank.js (GK1):
     mc: {bai, level, q, opts:[ĐÚNG, sai, sai, sai], sol}
     tf: {bai, stem, items:[{t:[câu đúng, câu sai], s:[lời giải, lời giải]}×4]}
     sh: {bai, pts, q, ans, sol}        (đáp số ≤ 4 kí tự)
   Kiểm tra độc lập: node tools/test_gk_ma_tran.js
   ===================================================================== */
(() => {
const m = tm, K = '(k \\in \\mathbb{Z})';
const gcd = (a, b) => b ? gcd(b, a % b) : Math.abs(a);
const R = (n, d = 1) => { const k = gcd(n, d) || 1; n /= k; d /= k; if(d < 0){ n = -n; d = -d; } return [n, d]; };
const rf = (n, d = 1) => { [n, d] = R(n, d); return d === 1 ? `${n}` : n < 0 ? `-\\dfrac{${-n}}{${d}}` : `\\dfrac{${n}}{${d}}`; };
const piT = (n, d = 1) => { [n, d] = R(n, d); if(n === 0) return '0'; const s = n < 0 ? '-' : '', a = Math.abs(n), top = a === 1 ? '\\pi' : `${a}\\pi`; return d === 1 ? `${s}${top}` : `${s}\\dfrac{${top}}{${d}}`; };
const dec = x => String(x).replace('.', '{,}');
const p = s => `<p>${s}</p>`;
const uniq = (arr, what) => { if(new Set(arr).size !== arr.length) throw new Error('Phương án trùng nhau: ' + what + ' → ' + arr.join(' | ')); return arr; };
const pick = (pool, ci, n) => pool[(ci + 4 * n) % pool.length];
const r1 = x => Math.round(x * 10) / 10;

/* ---------- Phần I ---------- */
const GT = [
  ['\\sin\\dfrac{5\\pi}{6}', '\\dfrac{1}{2}', ['-\\dfrac{1}{2}', '\\dfrac{\\sqrt{3}}{2}', '-\\dfrac{\\sqrt{3}}{2}'], '\\sin\\dfrac{5\\pi}{6} = \\sin\\left(\\pi - \\dfrac{\\pi}{6}\\right) = \\sin\\dfrac{\\pi}{6}'],
  ['\\cos\\dfrac{2\\pi}{3}', '-\\dfrac{1}{2}', ['\\dfrac{1}{2}', '-\\dfrac{\\sqrt{3}}{2}', '\\dfrac{\\sqrt{3}}{2}'], '\\cos\\dfrac{2\\pi}{3} = \\cos\\left(\\pi - \\dfrac{\\pi}{3}\\right) = -\\cos\\dfrac{\\pi}{3}'],
  ['\\tan\\dfrac{3\\pi}{4}', '-1', ['1', '0', '-\\sqrt{3}'], '\\tan\\dfrac{3\\pi}{4} = \\tan\\left(\\pi - \\dfrac{\\pi}{4}\\right) = -\\tan\\dfrac{\\pi}{4}'],
  ['\\sin\\left(-\\dfrac{\\pi}{3}\\right)', '-\\dfrac{\\sqrt{3}}{2}', ['\\dfrac{\\sqrt{3}}{2}', '-\\dfrac{1}{2}', '\\dfrac{1}{2}'], '\\sin\\left(-\\dfrac{\\pi}{3}\\right) = -\\sin\\dfrac{\\pi}{3}'],
  ['\\cos\\dfrac{5\\pi}{6}', '-\\dfrac{\\sqrt{3}}{2}', ['\\dfrac{\\sqrt{3}}{2}', '-\\dfrac{1}{2}', '\\dfrac{1}{2}'], '\\cos\\dfrac{5\\pi}{6} = \\cos\\left(\\pi - \\dfrac{\\pi}{6}\\right) = -\\cos\\dfrac{\\pi}{6}'],
  ['\\sin\\dfrac{7\\pi}{6}', '-\\dfrac{1}{2}', ['\\dfrac{1}{2}', '-\\dfrac{\\sqrt{3}}{2}', '\\dfrac{\\sqrt{3}}{2}'], '\\sin\\dfrac{7\\pi}{6} = \\sin\\left(\\pi + \\dfrac{\\pi}{6}\\right) = -\\sin\\dfrac{\\pi}{6}'],
  ['\\cot\\dfrac{\\pi}{3}', '\\dfrac{\\sqrt{3}}{3}', ['\\sqrt{3}', '-\\dfrac{\\sqrt{3}}{3}', '\\dfrac{1}{2}'], '\\cot\\dfrac{\\pi}{3} = \\dfrac{\\cos\\frac{\\pi}{3}}{\\sin\\frac{\\pi}{3}} = \\dfrac{1/2}{\\sqrt{3}/2}'],
  ['\\cos\\left(-\\dfrac{\\pi}{4}\\right)', '\\dfrac{\\sqrt{2}}{2}', ['-\\dfrac{\\sqrt{2}}{2}', '\\dfrac{1}{2}', '\\dfrac{\\sqrt{3}}{2}'], '\\cos\\left(-\\dfrac{\\pi}{4}\\right) = \\cos\\dfrac{\\pi}{4}']];
const tn1 = (ci, n = 0) => { const v = pick(GT, ci, n);
  return {bai:1, level:'Nhận biết', q:`Giá trị của ${m(v[0])} bằng`, opts:uniq([v[1], ...v[2]], 'TN1').map(m), sol:p(`${m(v[3])} ${m('=')} ${m(v[1])}.`)}; };
const tn2 = (ci, n = 0) => { const [sn, sd] = pick([[3, 5], [1, 3], [2, 3], [4, 5], [1, 4], [2, 5], [5, 13], [3, 4]], ci, n), c = [sd * sd - 2 * sn * sn, sd * sd];
  const opts = [rf(...c), rf(-c[0], c[1]), rf(sd * sd - sn * sn, sd * sd), rf(2 * sn * sn, sd * sd)];
  return {bai:1, level:'Nhận biết', q:`Cho ${m(`\\sin\\alpha = ${rf(sn, sd)}`)}. Giá trị của ${m('\\cos 2\\alpha')} bằng`, opts:uniq(opts, 'TN2').map(m),
    sol:p(`${m(`\\cos 2\\alpha = 1 - 2\\sin^2\\alpha = 1 - 2\\cdot\\left(${rf(sn, sd)}\\right)^2 = ${rf(...c)}`)}.`)}; };
const EX = {a:'\\dfrac{\\pi}{2} + k\\pi', b:'k\\pi', c:'\\dfrac{\\pi}{2} + k2\\pi', d:'\\dfrac{k\\pi}{2}', e:'\\dfrac{\\pi}{4} + \\dfrac{k\\pi}{2}', f:'\\dfrac{\\pi}{4} + k\\pi', g:'\\dfrac{\\pi}{6} + \\dfrac{k\\pi}{3}', h:'\\dfrac{k\\pi}{3}', i:'\\dfrac{k\\pi}{6}', j:'\\dfrac{\\pi}{4} + k\\pi', l:'-\\dfrac{\\pi}{3} + k\\pi', o:'\\dfrac{\\pi}{3} + k\\pi', q:'\\dfrac{\\pi}{6} + k\\pi', r:'\\dfrac{3\\pi}{4} + k\\pi'};
const TXD = [['y = \\tan x', 'a', ['b', 'c', 'd'], '\\cos x \\ne 0 \\Leftrightarrow x \\ne \\dfrac{\\pi}{2} + k\\pi'],
  ['y = \\cot x', 'b', ['a', 'd', 'c'], '\\sin x \\ne 0 \\Leftrightarrow x \\ne k\\pi'],
  ['y = \\tan 2x', 'e', ['a', 'f', 'd'], '\\cos 2x \\ne 0 \\Leftrightarrow 2x \\ne \\dfrac{\\pi}{2} + k\\pi \\Leftrightarrow x \\ne \\dfrac{\\pi}{4} + \\dfrac{k\\pi}{2}'],
  ['y = \\cot 2x', 'd', ['b', 'e', 'a'], '\\sin 2x \\ne 0 \\Leftrightarrow 2x \\ne k\\pi \\Leftrightarrow x \\ne \\dfrac{k\\pi}{2}'],
  ['y = \\tan 3x', 'g', ['a', 'h', 'q'], '\\cos 3x \\ne 0 \\Leftrightarrow 3x \\ne \\dfrac{\\pi}{2} + k\\pi \\Leftrightarrow x \\ne \\dfrac{\\pi}{6} + \\dfrac{k\\pi}{3}'],
  ['y = \\cot 3x', 'h', ['b', 'g', 'i'], '\\sin 3x \\ne 0 \\Leftrightarrow 3x \\ne k\\pi \\Leftrightarrow x \\ne \\dfrac{k\\pi}{3}'],
  ['y = \\tan\\left(x + \\dfrac{\\pi}{4}\\right)', 'j', ['a', 'r', 'b'], '\\cos\\left(x + \\dfrac{\\pi}{4}\\right) \\ne 0 \\Leftrightarrow x + \\dfrac{\\pi}{4} \\ne \\dfrac{\\pi}{2} + k\\pi \\Leftrightarrow x \\ne \\dfrac{\\pi}{4} + k\\pi'],
  ['y = \\cot\\left(x + \\dfrac{\\pi}{3}\\right)', 'l', ['o', 'b', 'q'], '\\sin\\left(x + \\dfrac{\\pi}{3}\\right) \\ne 0 \\Leftrightarrow x + \\dfrac{\\pi}{3} \\ne k\\pi \\Leftrightarrow x \\ne -\\dfrac{\\pi}{3} + k\\pi']];
const tn3 = (ci, n = 0) => { const v = pick(TXD, ci, n), S = e => `\\mathbb{R} \\setminus \\left\\{${EX[e]} \\mid k \\in \\mathbb{Z}\\right\\}`;
  return {bai:1, level:'Nhận biết', q:`Tập xác định của hàm số ${m(v[0])} là`, opts:uniq([v[1], ...v[2]].map(k => m(S(k))), 'TN3'),
    sol:p(`Hàm số xác định khi ${m(v[3])}.`) + p(`Tập xác định: ${m(S(v[1]))}.`)}; };
const tn4 = (ci, n = 0) => { const [a, b] = pick([[3, -1], [2, 5], [4, -3], [5, 2], [6, -4], [3, 4], [2, -5], [4, 1]], ci, n), I = (x, y) => m(`[${x};\\ ${y}]`);
  return {bai:1, level:'Thông hiểu', q:`Tập giá trị của hàm số ${m(`y = ${a}\\sin x ${b < 0 ? '-' : '+'} ${Math.abs(b)}`)} là`, opts:uniq([I(b - a, b + a), I(-a, a), I(b, a + b), I(-a - b, a - b)], 'TN4'),
    sol:p(`${m('-1 \\le \\sin x \\le 1')} nên ${m(`${-a} \\le ${a}\\sin x \\le ${a}`)}, suy ra ${m(`${b - a} \\le y \\le ${b + a}`)}.`)}; };
const SN = [['sin', 2, 1, 6], ['cos', 2, 1, 3], ['sin', 3, 1, 6], ['cos', 3, 1, 4], ['sin', 2, 1, 4], ['cos', 2, 1, 6], ['sin', 3, 1, 3], ['cos', 3, 1, 3]];
const tn5 = (ci, n = 0) => { const [kind, nn, an, ad] = pick(SN, ci, n), per = nn === 2 ? 'k\\pi' : 'k\\dfrac{2\\pi}{3}', two = 'k2\\pi', fr = (a, b) => piT(a, b);
  let right, wr, how;
  if(kind === 'sin'){ right = `x = ${fr(an, ad * nn)} + ${per};\\ x = ${fr(ad - an, ad * nn)} + ${per}`;
    wr = [`x = ${fr(an, ad)} + ${two};\\ x = ${fr(ad - an, ad)} + ${two}`, `x = ${fr(an, ad * nn)} + ${two};\\ x = ${fr(ad - an, ad * nn)} + ${two}`, `x = \\pm ${fr(an, ad * nn)} + ${per}`];
    how = `${m(`\\sin ${nn}x = \\sin\\dfrac{${an === 1 ? '' : an}\\pi}{${ad}}`)} ⇔ ${m(`${nn}x = ${fr(an, ad)} + k2\\pi`)} hoặc ${m(`${nn}x = ${fr(ad - an, ad)} + k2\\pi`)}`; }
  else { right = `x = \\pm ${fr(an, ad * nn)} + ${per}`;
    wr = [`x = \\pm ${fr(an, ad)} + ${two}`, `x = \\pm ${fr(an, ad * nn)} + ${two}`, `x = ${fr(an, ad * nn)} + ${per};\\ x = ${fr(ad - an, ad * nn)} + ${per}`];
    how = `${m(`\\cos ${nn}x = \\cos\\dfrac{${an === 1 ? '' : an}\\pi}{${ad}}`)} ⇔ ${m(`${nn}x = \\pm ${fr(an, ad)} + k2\\pi`)}`; }
  return {bai:1, level:'Thông hiểu', q:`Nghiệm của phương trình ${m(`\\${kind} ${nn}x = \\${kind}\\dfrac{${an === 1 ? '' : an}\\pi}{${ad}}`)} là`, opts:uniq([right, ...wr].map(x => m(x) + ' ' + m(K)), 'TN5'),
    sol:p(`${how}.`) + p(`Chia hai vế cho ${nn}: ${m(right)} ${m(K)}.`)}; };
const tn6 = (ci, n = 0) => { const [a, b, c, k] = pick([[2, -3, 1, 4], [3, -2, 5, 3], [1, 4, -3, 5], [2, 1, -4, 6], [3, -1, 2, 5], [1, -5, 6, 4], [2, 3, -1, 3], [4, -3, 2, 2]], ci, n), u = t => a * t * t + b * t + c;
  const f = `u_n = ${a === 1 ? '' : a}n^2 ${b < 0 ? '-' : '+'} ${Math.abs(b)}n ${c < 0 ? '-' : '+'} ${Math.abs(c)}`;
  return {bai:2, level:'Nhận biết', q:`Cho dãy số ${m('(u_n)')} với ${m(f)}. Số hạng ${m(`u_{${k}}`)} bằng`, opts:uniq([u(k), a * k * k - b * k + c, a * k * k + b * k - c, u(k + 1)].map(x => m(x)), 'TN6'),
    sol:p(`${m(`u_{${k}} = ${a === 1 ? '' : a}\\cdot ${k}^2 ${b < 0 ? '-' : '+'} ${Math.abs(b)}\\cdot ${k} ${c < 0 ? '-' : '+'} ${Math.abs(c)} = ${u(k)}`)}.`)}; };
const tn7 = (ci, n = 0) => { const [u1, d, k] = pick([[3, 4, 10], [-5, 3, 8], [7, -2, 12], [2, 5, 15], [4, 3, 9], [-2, 5, 7], [10, -3, 6], [1, 6, 11]], ci, n);
  return {bai:2, level:'Nhận biết', q:`Cho cấp số cộng ${m('(u_n)')} có ${m(`u_1 = ${u1}`)} và công sai ${m(`d = ${d}`)}. Số hạng ${m(`u_{${k}}`)} bằng`, opts:uniq([u1 + (k - 1) * d, u1 + k * d, u1 + (k - 2) * d, k * d].map(x => m(x)), 'TN7'),
    sol:p(`${m(`u_{${k}} = u_1 + ${k - 1}d = ${u1} + ${k - 1}\\cdot ${d < 0 ? `(${d})` : d} = ${u1 + (k - 1) * d}`)}.`)}; };
const tn8 = (ci, n = 0) => { const [u1, q, k] = pick([[2, 3, 5], [3, 2, 6], [5, -2, 4], [1, 4, 4], [2, 2, 7], [3, 3, 4], [1, 5, 4], [6, 2, 5]], ci, n);
  return {bai:2, level:'Nhận biết', q:`Cho cấp số nhân ${m('(u_n)')} có ${m(`u_1 = ${u1}`)} và công bội ${m(`q = ${q}`)}. Số hạng ${m(`u_{${k}}`)} bằng`, opts:uniq([u1 * q ** (k - 1), u1 * q ** k, u1 + (k - 1) * q, u1 * q ** (k - 2)].map(x => m(x)), 'TN8'),
    sol:p(`${m(`u_{${k}} = u_1\\cdot q^{${k - 1}} = ${u1}\\cdot ${q < 0 ? `(${q})` : q}^{${k - 1}} = ${u1 * q ** (k - 1)}`)}.`)}; };
const tn9 = (ci, n = 0) => { const [x0, h, what, un] = pick([[10, 5, 'Thời gian tự học ở nhà mỗi ngày của một nhóm học sinh', 'phút'], [20, 10, 'Quãng đường đi học mỗi ngày của một nhóm học sinh', 'trăm mét'], [140, 10, 'Chiều cao của một nhóm học sinh khối 11', 'cm'], [4, 2, 'Số giờ ngủ mỗi ngày của một nhóm học sinh', 'giờ'],
    [40, 5, 'Cân nặng của một nhóm học sinh', 'kg'], [8, 4, 'Số tiền ăn trưa mỗi ngày của một nhóm học sinh', 'nghìn đồng'], [60, 10, 'Nhịp tim lúc nghỉ của một nhóm học sinh', 'nhịp/phút'], [2, 1, 'Số bài tập về nhà mỗi tuần của một nhóm học sinh', 'bài']], ci, n);
  const grp = Array.from({length:5}, (_, i) => m(`[${x0 + h * i};\\ ${x0 + h * (i + 1)})`)).join(', ');
  return {bai:3, level:'Nhận biết', q:`${what} (đơn vị: ${un}) được ghép thành các nhóm ${grp}. Khoảng biến thiên của mẫu số liệu ghép nhóm này là`, opts:uniq([5 * h, x0 + 5 * h, x0 + 4 * h, 4 * h].map(x => m(x)), 'TN9'),
    sol:p(`Khoảng biến thiên = đầu mút phải của nhóm cuối − đầu mút trái của nhóm đầu: ${m(`${x0 + 5 * h} - ${x0} = ${5 * h}`)}.`)}; };
const DT = [[10, 5, [5, 6, 15, 4, 10], 'Thời gian (phút) học sinh dùng điện thoại mỗi ngày'], [20, 10, [7, 14, 5, 15, 9], 'Số tiền (nghìn đồng) học sinh ăn sáng mỗi tuần'], [140, 10, [8, 15, 4, 10, 13], 'Chiều cao (cm) của học sinh một lớp'], [4, 2, [7, 3, 10, 11, 9], 'Số giờ tự học (giờ) mỗi tuần của học sinh một lớp'],
  [15, 5, [5, 7, 13, 14, 11], 'Thời gian (phút) đi từ nhà đến trường của học sinh một lớp'], [50, 10, [15, 4, 2, 8, 11], 'Số bước chân (trăm bước) học sinh đi mỗi ngày'], [0, 10, [10, 4, 12, 8, 6], 'Số trang sách (trang) học sinh đọc mỗi tuần'], [2, 2, [9, 10, 2, 4, 15], 'Số giờ (giờ) học sinh chơi thể thao mỗi tuần']];
const dtTable = (x0, h, f) => `<table class="kt-dt"><tr><th>Nhóm</th>${f.map((_, i) => `<td>${m(`[${x0 + h * i};\\ ${x0 + h * (i + 1)})`)}</td>`).join('')}</tr><tr><th>Tần số</th>${f.map(v => `<td>${v}</td>`).join('')}</tr></table>`;
const stat = (x0, h, f) => { const N = f.reduce((a, b) => a + b, 0), sum = pt => f.reduce((s, v, i) => s + v * pt(i), 0);
  let c = 0, mi = 0; for(let i = 0; i < f.length; i++){ if(c + f[i] >= N / 2){ mi = i; break; } c += f[i]; }
  return {n:N, c, mean:sum(i => x0 + h * (i + .5)) / N, lower:sum(i => x0 + h * i) / N, upper:sum(i => x0 + h * (i + 1)) / N, mi, lo:x0 + h * mi, me:x0 + h * mi + (N / 2 - c) / f[mi] * h}; };
const tn10 = (ci, n = 0) => { const [x0, h, f, what] = pick(DT, ci, n), s = stat(x0, h, f), mids = f.map((_, i) => x0 + h * (i + .5));
  return {bai:3, level:'Nhận biết', q:`${what} được cho trong bảng sau:${dtTable(x0, h, f)}Số trung bình cộng của mẫu số liệu ghép nhóm trên bằng`, opts:uniq([s.mean, s.lower, s.upper, x0 + h * 2.5].map(x => m(dec(r1(x)))), 'TN10'),
    sol:p(`Giá trị đại diện các nhóm: ${m(mids.map(dec).join(';\\ '))}.`) + p(`${m(`\\bar{x} = \\dfrac{${f.map((v, i) => `${v}\\cdot ${dec(mids[i])}`).join(' + ')}}{${s.n}} = ${dec(r1(s.mean))}`)}.`)}; };

/* ---------- Phần II ---------- */
const DS1 = [
  {f:'y = 2\\sin x \\cos x', a:['y = \\sin 2x', 'y = \\cos 2x'], b:['T = \\pi', 'T = 2\\pi'], k:['Tập giá trị của hàm số là ', '[-1;\\ 1]', '[-2;\\ 2]'], par:'lẻ', ex:['Công thức nhân đôi: ', 'chu kì ', 'Vì ', 'Hàm ']},
  {f:'y = 4\\sin x \\cos x', a:['y = 2\\sin 2x', 'y = 4\\sin 2x'], b:['T = \\pi', 'T = 2\\pi'], k:['Giá trị lớn nhất của hàm số bằng ', '2', '4'], par:'lẻ'},
  {f:'y = 6\\sin 2x \\cos 2x', a:['y = 3\\sin 4x', 'y = 3\\sin 2x'], b:['T = \\dfrac{\\pi}{2}', 'T = \\pi'], k:['Giá trị nhỏ nhất của hàm số bằng ', '-3', '-6'], par:'lẻ'},
  {f:'y = \\cos^2 x - \\sin^2 x', a:['y = \\cos 2x', 'y = \\sin 2x'], b:['T = \\pi', 'T = 2\\pi'], k:['Tập giá trị của hàm số là ', '[-1;\\ 1]', '[0;\\ 1]'], par:'chẵn'},
  {f:'y = 2\\sin\\dfrac{x}{2}\\cos\\dfrac{x}{2}', a:['y = \\sin x', 'y = \\sin\\dfrac{x}{2}'], b:['T = 2\\pi', 'T = \\pi'], k:['Tập giá trị của hàm số là ', '[-1;\\ 1]', '[-2;\\ 2]'], par:'lẻ'},
  {f:'y = 1 - 2\\sin^2 x', a:['y = \\cos 2x', 'y = \\sin 2x'], b:['T = \\pi', 'T = 2\\pi'], k:['Giá trị lớn nhất của hàm số bằng ', '1', '2'], par:'chẵn'},
  {f:'y = \\sin x \\cos x', a:['y = \\dfrac{1}{2}\\sin 2x', 'y = \\sin 2x'], b:['T = \\pi', 'T = 2\\pi'], k:['Giá trị lớn nhất của hàm số bằng ', '\\dfrac{1}{2}', '1'], par:'lẻ'},
  {f:'y = 2\\sin 2x \\cos 2x', a:['y = \\sin 4x', 'y = \\sin 2x'], b:['T = \\dfrac{\\pi}{2}', 'T = \\pi'], k:['Tập giá trị của hàm số là ', '[-1;\\ 1]', '[-2;\\ 2]'], par:'lẻ'}];
const ds1 = (ci, n = 0) => { const v = pick(DS1, ci, n), odd = v.par === 'lẻ';
  return {bai:1, stem:`Cho hàm số ${m(v.f)}. Xét tính đúng sai của các mệnh đề sau:`, items:[
    {t:[`Hàm số đã cho viết được thành ${m(v.a[0])}.`, `Hàm số đã cho viết được thành ${m(v.a[1])}.`], s:[p(`Dùng công thức nhân đôi (${m('\\sin 2a = 2\\sin a\\cos a,\\ \\cos 2a = \\cos^2 a - \\sin^2 a = 1 - 2\\sin^2 a')}): ${m(v.a[0])}.`), p(`Sai: theo công thức nhân đôi, hàm số bằng ${m(v.a[0])}, không phải ${m(v.a[1])}.`)]},
    {t:[`Hàm số tuần hoàn với chu kì ${m(v.b[0])}.`, `Hàm số tuần hoàn với chu kì ${m(v.b[1])}.`], s:[p(`Hàm ${m(v.a[0])} có chu kì ${m(v.b[0])} (chu kì của ${m('\\sin ax,\\ \\cos ax')} là ${m('\\dfrac{2\\pi}{|a|}')}).`), p(`Sai: chu kì đúng là ${m(v.b[0])}.`)]},
    {t:[v.k[0] + m(v.k[1]) + '.', v.k[0] + m(v.k[2]) + '.'], s:[p(`Từ ${m(v.a[0])} và ${m('-1 \\le \\sin u,\\ \\cos u \\le 1')} suy ra: ${m(v.k[1])}.`), p(`Sai: đúng là ${m(v.k[1])}.`)]},
    {t:[`Hàm số đã cho là hàm số ${odd ? 'lẻ' : 'chẵn'}.`, `Hàm số đã cho là hàm số ${odd ? 'chẵn' : 'lẻ'}.`], s:[p(odd ? `${m(v.a[0])} là hàm số lẻ vì sin là hàm lẻ (${m('f(-x) = -f(x)')}).` : `${m(v.a[0])} là hàm số chẵn vì cos là hàm chẵn (${m('f(-x) = f(x)')}).`), p(`Sai: hàm số này là hàm số ${odd ? 'lẻ' : 'chẵn'}.`)]}]}; };
const ds2 = (ci, n = 0) => { const [u1, d] = pick([[5, 3], [2, 4], [-3, 5], [9, -2], [4, 6], [-1, 3], [7, -3], [1, 2]], ci, n), u = k => u1 + (k - 1) * d, S = k => k * (2 * u1 + (k - 1) * d) / 2;
  return {bai:2, stem:`Cho cấp số cộng ${m('(u_n)')} có ${m(`u_2 = ${u(2)}`)} và ${m(`u_5 = ${u(5)}`)}. Xét tính đúng sai của các mệnh đề sau:`, items:[
    {t:[`Công sai của cấp số cộng là ${m(`d = ${d}`)}.`, `Công sai của cấp số cộng là ${m(`d = ${d + 1}`)}.`], s:[p(`${m(`u_5 - u_2 = 3d`)} ⇒ ${m(`d = \\dfrac{${u(5)} - ${u(2) < 0 ? `(${u(2)})` : u(2)}}{3} = ${d}`)}.`), p(`Sai: ${m(`3d = u_5 - u_2 = ${u(5) - u(2)}`)} nên ${m(`d = ${d}`)}.`)]},
    {t:[`Số hạng đầu là ${m(`u_1 = ${u1}`)}.`, `Số hạng đầu là ${m(`u_1 = ${u1 + d}`)}.`], s:[p(`${m(`u_1 = u_2 - d = ${u(2)} - ${d < 0 ? `(${d})` : d} = ${u1}`)}.`), p(`Sai: ${m(`u_1 = u_2 - d = ${u1}`)}.`)]},
    {t:[`Số hạng ${m('u_{10}')} bằng ${m(u(10))}.`, `Số hạng ${m('u_{10}')} bằng ${m(u(10) + d)}.`], s:[p(`${m(`u_{10} = u_1 + 9d = ${u1} + 9\\cdot ${d < 0 ? `(${d})` : d} = ${u(10)}`)}.`), p(`Sai: ${m(`u_{10} = u_1 + 9d = ${u(10)}`)}.`)]},
    {t:[`Tổng của 12 số hạng đầu bằng ${m(S(12))}.`, `Tổng của 12 số hạng đầu bằng ${m(S(12) + 12 * d)}.`], s:[p(`${m(`S_{12} = \\dfrac{12(2u_1 + 11d)}{2} = 6(${2 * u1} + ${d < 0 ? `(${11 * d})` : 11 * d}) = ${S(12)}`)}.`), p(`Sai: ${m(`S_{12} = 6(2u_1 + 11d) = ${S(12)}`)}.`)]}]}; };
const DS3 = [[20, 10, [14, 9, 8, 4, 15], 'Thời gian (phút) tập thể dục mỗi tuần của các học sinh một khối'], [140, 10, [11, 10, 8, 7, 14], 'Chiều cao (cm) của các học sinh một lớp'], [4, 2, [2, 11, 8, 6, 3], 'Số giờ đọc sách (giờ) mỗi tuần của các học sinh một lớp'], [15, 5, [10, 15, 3, 9, 13], 'Số tiền (nghìn đồng) mỗi học sinh góp quỹ lớp'],
  [30, 10, [14, 5, 15, 7, 9], 'Số tiền (nghìn đồng) ăn vặt mỗi tuần của các học sinh một lớp'], [5, 5, [12, 6, 14, 3, 15], 'Số lượt mượn sách thư viện mỗi tháng của các học sinh một khối'], [100, 20, [8, 14, 5, 7, 16], 'Quãng đường (mét) các học sinh chạy trong 12 phút'], [8, 4, [11, 8, 4, 3, 14], 'Số trang sách (trang) học sinh đọc mỗi tuần']];
const ds3 = (ci, n = 0) => { const [x0, h, f, what] = pick(DS3, ci, n), s = stat(x0, h, f), g = i => `[${x0 + h * i};\\ ${x0 + h * (i + 1)})`, alt = s.mi < 4 ? s.mi + 1 : s.mi - 1, fs = f.join(' + ');
  return {bai:3, stem:`${what} được cho trong bảng sau:${dtTable(x0, h, f)}Xét tính đúng sai của các mệnh đề sau:`, items:[
    {t:[`Cỡ mẫu là ${m(`n = ${s.n}`)}.`, `Cỡ mẫu là ${m(`n = ${s.n + 5}`)}.`], s:[p(`${m(`n = ${fs} = ${s.n}`)}.`), p(`Sai: ${m(`n = ${fs} = ${s.n}`)}.`)]},
    {t:[`Nhóm chứa trung vị là ${m(g(s.mi))}.`, `Nhóm chứa trung vị là ${m(g(alt))}.`], s:[p(`${m(`\\dfrac{n}{2} = ${dec(s.n / 2)}`)}; tần số tích luỹ đến nhóm trước là ${m(s.c)}, đến nhóm ${m(g(s.mi))} là ${m(s.c + f[s.mi])} ≥ ${m(dec(s.n / 2))}.`), p(`Sai: nhóm đầu tiên có tần số tích luỹ ≥ ${m(dec(s.n / 2))} là ${m(g(s.mi))}.`)]},
    {t:[`Số trung bình cộng của mẫu số liệu xấp xỉ ${m(dec(r1(s.mean)))}.`, `Số trung bình cộng của mẫu số liệu xấp xỉ ${m(dec(r1(s.lower)))}.`], s:[p(`Dùng giá trị đại diện của mỗi nhóm: ${m(`\\bar{x} = \\dfrac{\\sum f_i x_i}{n} \\approx ${dec(r1(s.mean))}`)}.`), p(`Sai: ${m(dec(r1(s.lower)))} là trung bình các đầu mút trái, không phải giá trị đại diện; đúng là ${m(dec(r1(s.mean)))}.`)]},
    {t:[`Trung vị của mẫu số liệu xấp xỉ ${m(dec(r1(s.me)))}.`, `Trung vị của mẫu số liệu xấp xỉ ${m(dec(r1(s.lo)))}.`], s:[p(`${m(`M_e = ${s.lo} + \\dfrac{${dec(s.n / 2)} - ${s.c}}{${f[s.mi]}}\\cdot ${h} \\approx ${dec(r1(s.me))}`)}.`), p(`Sai: ${m(`M_e = ${s.lo} + \\dfrac{${dec(s.n / 2)} - ${s.c}}{${f[s.mi]}}\\cdot ${h} \\approx ${dec(r1(s.me))}`)}.`)]}]}; };

/* ---------- Phần III (trả lời ngắn, mỗi câu 0,75 điểm) ---------- */
const E = (bai, f) => (ci, n = 0) => { const x = f(ci, n); return {bai, pts:.75, ...x}; };
const tln1 = E(1, (ci, n) => { const [a, b, c] = pick([[10, 4, 6], [12, 3, 3], [8, 2, 4], [9, 5, 12], [7, 3, 8], [15, 6, 2], [6, 2, 5], [13, 5, 24]], ci, n), cnt = Math.floor((24 - c / 2) / (2 * c)) + 1, ts = Array.from({length:cnt}, (_, k) => c / 2 + 2 * c * k).map(dec);
  return {q:`Mực nước (đơn vị: m) tại một cảng biển ở thời điểm ${m('t')} giờ (${m('0 \\le t \\le 24')}) được mô hình hoá bởi hàm số ${m(`h(t) = ${a} + ${b}\\sin\\dfrac{\\pi t}{${c}}`)}. Trong một ngày (${m('0 \\le t \\le 24')}), có bao nhiêu thời điểm mực nước đạt mức cao nhất?`, ans:cnt,
    sol:p(`Mực nước cao nhất khi ${m(`\\sin\\dfrac{\\pi t}{${c}} = 1`)}, tức ${m(`t = ${dec(c / 2)} + ${2 * c}k`)} ${m(K)}.`) + p(`Với ${m('0 \\le t \\le 24')}: ${m(`t \\in \\{${ts.join(';\\ ')}\\}`)}, có ${m(cnt)} thời điểm.`)}; });
const countSol = (kind, a, b, al, lo, hi, closed) => {            // sin/cos(π(aX + b)) = sin/cos(π·al), X = x/π
  const u = x => x[0] * (60 / x[1]), bN = u(b), fam = kind === 'sin' ? [u(al), 60 - u(al)] : [u(al), -u(al)], out = new Map();
  for(const c of fam) for(let k = -60; k <= 60; k++){ const M = c - bN + 120 * k, [nn, d] = R(M, 60 * a), inside = closed ? nn >= lo * d && nn <= hi * d : nn > lo * d && nn < hi * d; if(inside) out.set(`${nn}/${d}`, [nn, d]); }
  return [...out.values()].sort((x, y) => x[0] / x[1] - y[0] / y[1]); };
const PT = [
  {k:'sin', a:2, b:[-1, 3], al:[1, 6], lo:0, hi:2, cl:false, eq:'2\\sin\\left(2x - \\dfrac{\\pi}{3}\\right) = 1', iv:'(0;\\ 2\\pi)', fam:'2x - \\dfrac{\\pi}{3} = \\dfrac{\\pi}{6} + k2\\pi \\text{ hoặc } 2x - \\dfrac{\\pi}{3} = \\dfrac{5\\pi}{6} + k2\\pi'},
  {k:'cos', a:1, b:[1, 4], al:[3, 4], lo:0, hi:3, cl:false, eq:'\\sqrt{2}\\cos\\left(x + \\dfrac{\\pi}{4}\\right) = -1', iv:'(0;\\ 3\\pi)', fam:'x + \\dfrac{\\pi}{4} = \\pm\\dfrac{3\\pi}{4} + k2\\pi'},
  {k:'sin', a:3, b:[0, 1], al:[1, 6], lo:0, hi:2, cl:true, eq:'2\\sin 3x - 1 = 0', iv:'[0;\\ 2\\pi]', fam:'3x = \\dfrac{\\pi}{6} + k2\\pi \\text{ hoặc } 3x = \\dfrac{5\\pi}{6} + k2\\pi'},
  {k:'cos', a:2, b:[0, 1], al:[2, 3], lo:0, hi:2, cl:true, eq:'2\\cos 2x + 1 = 0', iv:'[0;\\ 2\\pi]', fam:'2x = \\pm\\dfrac{2\\pi}{3} + k2\\pi'},
  {k:'cos', a:1, b:[-1, 6], al:[1, 6], lo:0, hi:4, cl:true, eq:'2\\cos\\left(x - \\dfrac{\\pi}{6}\\right) = \\sqrt{3}', iv:'[0;\\ 4\\pi]', fam:'x - \\dfrac{\\pi}{6} = \\pm\\dfrac{\\pi}{6} + k2\\pi'},
  {k:'sin', a:2, b:[1, 4], al:[1, 4], lo:0, hi:2, cl:false, eq:'\\sqrt{2}\\sin\\left(2x + \\dfrac{\\pi}{4}\\right) = 1', iv:'(0;\\ 2\\pi)', fam:'2x + \\dfrac{\\pi}{4} = \\dfrac{\\pi}{4} + k2\\pi \\text{ hoặc } 2x + \\dfrac{\\pi}{4} = \\dfrac{3\\pi}{4} + k2\\pi'},
  {k:'cos', a:3, b:[0, 1], al:[3, 4], lo:0, hi:2, cl:true, eq:'\\sqrt{2}\\cos 3x + 1 = 0', iv:'[0;\\ 2\\pi]', fam:'3x = \\pm\\dfrac{3\\pi}{4} + k2\\pi'},
  {k:'sin', a:1, b:[-1, 3], al:[-1, 6], lo:-1, hi:2, cl:false, eq:'2\\sin\\left(x - \\dfrac{\\pi}{3}\\right) + 1 = 0', iv:'(-\\pi;\\ 2\\pi)', fam:'x - \\dfrac{\\pi}{3} = -\\dfrac{\\pi}{6} + k2\\pi \\text{ hoặc } x - \\dfrac{\\pi}{3} = \\dfrac{7\\pi}{6} + k2\\pi'}];
const tln2 = E(1, (ci, n) => { const v = pick(PT, ci, n), s = countSol(v.k, v.a, v.b, v.al, v.lo, v.hi, v.cl);
  return {q:`Tìm số nghiệm của phương trình ${m(v.eq)} trên ${v.iv.startsWith('(') ? 'khoảng' : 'đoạn'} ${m(v.iv)}.`, ans:s.length,
    sol:p(`${m(v.fam)} ${m(K)}.`) + p(`Các nghiệm thuộc ${m(v.iv)}: ${m(s.map(([a, b]) => piT(a, b)).join(';\\ '))}.`) + p(`Có ${m(s.length)} nghiệm.`)}; });
const tln3 = E(2, (ci, n) => { const [t, u1, d, k] = pick([['Một rạp chiếu phim có 15 hàng ghế, hàng thứ nhất có 20 ghế, mỗi hàng sau nhiều hơn hàng liền trước 3 ghế. Rạp có tất cả bao nhiêu ghế?', 20, 3, 15],
    ['Một tháp xếp bằng các viên gạch có 12 tầng; tầng thứ nhất có 30 viên, mỗi tầng trên ít hơn tầng liền dưới 2 viên. Tháp dùng tất cả bao nhiêu viên gạch?', 30, -2, 12],
    ['Bạn An tiết kiệm trong 20 tuần: tuần đầu tiên để dành 50 nghìn đồng, mỗi tuần sau để dành nhiều hơn tuần trước 10 nghìn đồng. Sau 20 tuần, An để dành được tất cả bao nhiêu nghìn đồng?', 50, 10, 20],
    ['Một hội trường có 18 hàng ghế, hàng đầu có 16 ghế, mỗi hàng sau nhiều hơn hàng liền trước 2 ghế. Hội trường có tất cả bao nhiêu ghế?', 16, 2, 18],
    ['Một sân vận động có 20 hàng ghế; hàng đầu có 25 ghế, mỗi hàng sau nhiều hơn hàng liền trước 4 ghế. Sân vận động có tất cả bao nhiêu ghế?', 25, 4, 20],
    ['Anh Nam trả một khoản nợ trong 10 tháng: tháng đầu trả 4 triệu đồng, mỗi tháng sau trả nhiều hơn tháng trước 2 triệu đồng. Tổng số tiền anh Nam đã trả (đơn vị: triệu đồng) là bao nhiêu?', 4, 2, 10],
    ['Một đống gỗ tròn xếp thành 14 lớp: lớp dưới cùng có 40 cây, mỗi lớp trên ít hơn lớp liền dưới 2 cây. Đống gỗ có tất cả bao nhiêu cây?', 40, -2, 14],
    ['Một người tập chạy trong 15 ngày: ngày đầu chạy 3 km, mỗi ngày sau chạy nhiều hơn ngày trước 2 km. Tổng quãng đường người đó đã chạy (đơn vị: km) là bao nhiêu?', 3, 2, 15]], ci, n), S = k * (2 * u1 + (k - 1) * d) / 2;
  return {q:t, ans:S, sol:p(`Các số lập thành cấp số cộng ${m(`u_1 = ${u1},\\ d = ${d}`)}.`) + p(`${m(`S_{${k}} = \\dfrac{${k}[2\\cdot ${u1 < 0 ? `(${u1})` : u1} + ${k - 1}\\cdot ${d < 0 ? `(${d})` : d}]}{2} = ${S}`)}.`)}; });
const tln4 = E(2, (ci, n) => { const [t, u1, q, k] = pick([['Một quần thể vi khuẩn ban đầu có 4 nghìn con; sau mỗi giờ số vi khuẩn tăng gấp 3 lần so với giờ trước. Người ta ghi số vi khuẩn (nghìn con) tại 5 mốc: lúc ban đầu và sau 1, 2, 3, 4 giờ. Tính tổng 5 số đã ghi.', 4, 3, 5],
    ['Một tế bào sau mỗi lần phân chia thì thành 2 tế bào. Từ 3 tế bào ban đầu, người ta ghi số tế bào tại 10 mốc: lúc ban đầu và sau mỗi lần phân chia thứ 1, 2, …, 9. Tính tổng 10 số đã ghi.', 3, 2, 10],
    ['Một bài đăng được chia sẻ: giờ thứ nhất có 5 lượt, mỗi giờ sau số lượt chia sẻ gấp đôi giờ liền trước. Tổng số lượt chia sẻ trong 8 giờ đầu là bao nhiêu?', 5, 2, 8],
    ['Trong một trò chơi, tiền thưởng ở vòng 1 là 2 triệu đồng, mỗi vòng sau gấp 3 lần vòng liền trước. Tổng tiền thưởng (đơn vị: triệu đồng) sau 6 vòng là bao nhiêu?', 2, 3, 6],
    ['Một nhóm tin nhắn lan truyền: giờ thứ nhất có 3 tin, mỗi giờ sau số tin gấp 3 lần giờ liền trước. Tổng số tin nhắn trong 5 giờ đầu là bao nhiêu?', 3, 3, 5],
    ['Một tin đồn lan truyền: ngày thứ nhất có 1 người biết thêm, mỗi ngày sau số người biết thêm gấp đôi ngày liền trước. Tổng số người biết tin sau 12 ngày là bao nhiêu?', 1, 2, 12],
    ['Một quán cà phê mới mở: ngày đầu có 6 khách, mỗi ngày sau số khách gấp đôi ngày liền trước. Tổng số khách trong 7 ngày đầu là bao nhiêu?', 6, 2, 7],
    ['Trong một cuộc thi, tiền thưởng ở vòng 1 là 1 triệu đồng, mỗi vòng sau gấp 4 lần vòng liền trước. Tổng tiền thưởng (đơn vị: triệu đồng) sau 5 vòng là bao nhiêu?', 1, 4, 5]], ci, n), S = u1 * (q ** k - 1) / (q - 1);
  return {q:t, ans:S, sol:p(`Các số lập thành cấp số nhân ${m(`u_1 = ${u1},\\ q = ${q}`)}.`) + p(`${m(`S_{${k}} = ${u1}\\cdot\\dfrac{${q}^{${k}} - 1}{${q} - 1} = ${S}`)}.`)}; });

globalThis.GK11 = {mc:[tn1, tn2, tn3, tn4, tn5, tn6, tn7, tn8, tn9, tn10], tf:[ds1, ds2, ds3], sh:[tln1, tln2, tln3, tln4], countSol, stat};
})();
