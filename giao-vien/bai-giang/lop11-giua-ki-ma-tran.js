/* =====================================================================
   ĐỀ KIỂM TRA GIỮA HỌC KÌ I – TOÁN 11 (Kết nối tri thức) · 60 phút · 4 mã đề · THEO MA TRẬN CỦA TỔ (tuần 8)
   Cấu trúc 10 điểm (đúng ma trận “MA TRẬN ĐỀ KIỂM TRA GK 1 – LỚP 11 – 60 PHÚT”):
     Phần I   – 10 câu trắc nghiệm 1 đáp án × 0,4  = 4 điểm   (8 câu Biết + 2 câu Hiểu)
     Phần II  –  3 câu đúng/sai (mỗi câu 4 ý) × 1 = 3 điểm
     Phần III –  4 câu trả lời ngắn × 0,75         = 3 điểm   (vận dụng – mô hình hoá; câu 2 vận dụng cao)
   Nội dung: Hàm số lượng giác và phương trình lượng giác · Dãy số, cấp số cộng, cấp số nhân · Mẫu số liệu ghép nhóm
   và các số đặc trưng đo xu thế trung tâm. Mỗi mã đề (ci = 0..3) một bộ số riêng; đáp án đều suy ra bằng phép tính
   (tools/test_gk_ma_tran.js kiểm lại độc lập). Link: #/lop11/kiem-tra/gk-ma-tran/de · …/de-711 · …/da
   ===================================================================== */
(() => {
const m = tm, K = '(k \\in \\mathbb{Z})';
const gcd = (a, b) => b ? gcd(b, a % b) : Math.abs(a);
const R = (n, d = 1) => { const k = gcd(n, d) || 1; n /= k; d /= k; if(d < 0){ n = -n; d = -d; } return [n, d]; };
const rf = (n, d = 1) => { [n, d] = R(n, d); return d === 1 ? `${n}` : n < 0 ? `-\\dfrac{${-n}}{${d}}` : `\\dfrac{${n}}{${d}}`; };
const piT = (n, d = 1) => { [n, d] = R(n, d); if(n === 0) return '0'; const s = n < 0 ? '-' : '', a = Math.abs(n), top = a === 1 ? '\\pi' : `${a}\\pi`; return d === 1 ? `${s}${top}` : `${s}\\dfrac{${top}}{${d}}`; };
const dec = x => String(x).replace('.', '{,}');
const uniq = (arr, what) => { if(new Set(arr).size !== arr.length) throw new Error('Phương án trùng nhau: ' + what + ' → ' + arr.join(' | ')); return arr; };

/* ---------- Phần I ---------- */
// TN-1 (Biết): giá trị lượng giác của góc đặc biệt
const tn1 = ci => { const v = [['\\sin\\dfrac{5\\pi}{6}', '\\dfrac{1}{2}', ['-\\dfrac{1}{2}', '\\dfrac{\\sqrt{3}}{2}', '-\\dfrac{\\sqrt{3}}{2}']],
    ['\\cos\\dfrac{2\\pi}{3}', '-\\dfrac{1}{2}', ['\\dfrac{1}{2}', '-\\dfrac{\\sqrt{3}}{2}', '\\dfrac{\\sqrt{3}}{2}']],
    ['\\tan\\dfrac{3\\pi}{4}', '-1', ['1', '0', '-\\sqrt{3}']],
    ['\\sin\\left(-\\dfrac{\\pi}{3}\\right)', '-\\dfrac{\\sqrt{3}}{2}', ['\\dfrac{\\sqrt{3}}{2}', '-\\dfrac{1}{2}', '\\dfrac{1}{2}']]][ci];
  return {bai:1, q:`Giá trị của ${m(v[0])} bằng`, opts:uniq([v[1], ...v[2]], 'TN1').map(m)}; };
// TN-2 (Biết): cos 2α = 1 − 2 sin²α
const tn2 = ci => { const [sn, sd] = [[3, 5], [1, 3], [2, 3], [4, 5]][ci], s2 = [sn * sn, sd * sd], c = [sd * sd - 2 * sn * sn, sd * sd];
  const opts = [rf(...c), rf(-c[0], c[1]), rf(sd * sd - sn * sn, sd * sd), rf(2 * sn * sn, sd * sd)];
  return {bai:1, q:`Cho ${m(`\\sin\\alpha = ${rf(sn, sd)}`)}. Giá trị của ${m('\\cos 2\\alpha')} bằng`, opts:uniq(opts, 'TN2').map(m)}; };
// TN-3 (Biết): tập xác định của y = tan / cot
const tn3 = ci => { const ex = {a:'\\dfrac{\\pi}{2} + k\\pi', b:'k\\pi', c:'\\dfrac{\\pi}{2} + k2\\pi', d:'\\dfrac{k\\pi}{2}', e:'\\dfrac{\\pi}{4} + \\dfrac{k\\pi}{2}', f:'\\dfrac{\\pi}{4} + k\\pi'},
    S = e => `\\mathbb{R} \\setminus \\left\\{${e} \\mid k \\in \\mathbb{Z}\\right\\}`;
  const v = [['y = \\tan x', 'a', ['b', 'c', 'd']], ['y = \\cot x', 'b', ['a', 'd', 'c']], ['y = \\tan 2x', 'e', ['a', 'f', 'd']], ['y = \\cot 2x', 'd', ['b', 'e', 'a']]][ci];
  return {bai:1, q:`Tập xác định của hàm số ${m(v[0])} là`, opts:uniq([v[1], ...v[2]].map(k => m(S(ex[k]))), 'TN3')}; };
// TN-4 (Hiểu): tập giá trị của y = a sin x + b
const tn4 = ci => { const [a, b] = [[3, -1], [2, 5], [4, -3], [5, 2]][ci], I = (x, y) => m(`[${x};\\ ${y}]`);
  const opts = [I(b - a, b + a), I(-a, a), I(b, a + b), I(-a - b, a - b)];
  return {bai:1, q:`Tập giá trị của hàm số ${m(`y = ${a}\\sin x ${b < 0 ? '-' : '+'} ${Math.abs(b)}`)} là`, opts:uniq(opts, 'TN4')}; };
// TN-5 (Hiểu): sin nx = sin α, cos nx = cos α
const tn5 = ci => { const [kind, n, an, ad] = [['sin', 2, 1, 6], ['cos', 2, 1, 3], ['sin', 3, 1, 6], ['cos', 3, 1, 4]][ci];
  const per = n === 2 ? 'k\\pi' : 'k\\dfrac{2\\pi}{3}', two = 'k2\\pi', Ad = ad, an_ = an, fr = (num, den) => piT(num, den);   // α = an_/Ad (đơn vị π)
  let right, wr;
  if(kind === 'sin'){ right = `x = ${fr(an_, Ad * n)} + ${per};\\ x = ${fr(Ad - an_, Ad * n)} + ${per}`;
    wr = [`x = ${fr(an_, Ad)} + ${two};\\ x = ${fr(Ad - an_, Ad)} + ${two}`, `x = ${fr(an_, Ad * n)} + ${two};\\ x = ${fr(Ad - an_, Ad * n)} + ${two}`, `x = \\pm ${fr(an_, Ad * n)} + ${per}`]; }
  else { right = `x = \\pm ${fr(an_, Ad * n)} + ${per}`;
    wr = [`x = \\pm ${fr(an_, Ad)} + ${two}`, `x = \\pm ${fr(an_, Ad * n)} + ${two}`, `x = ${fr(an_, Ad * n)} + ${per};\\ x = ${fr(Ad - an_, Ad * n)} + ${per}`]; }
  return {bai:1, q:`Nghiệm của phương trình ${m(`\\${kind} ${n}x = \\${kind}\\dfrac{${an === 1 ? '' : an}\\pi}{${ad}}`)} là`, opts:uniq([right, ...wr].map(x => m(x) + ' ' + m(K)), 'TN5')}; };
// TN-6 (Biết): dãy số cho bởi công thức số hạng tổng quát
const tn6 = ci => { const [a, b, c, n] = [[2, -3, 1, 4], [3, -2, 5, 3], [1, 4, -3, 5], [2, 1, -4, 6]][ci], u = k => a * k * k + b * k + c;
  const f = `u_n = ${a === 1 ? '' : a}n^2 ${b < 0 ? '-' : '+'} ${Math.abs(b)}n ${c < 0 ? '-' : '+'} ${Math.abs(c)}`;
  return {bai:2, q:`Cho dãy số ${m('(u_n)')} với ${m(f)}. Số hạng ${m(`u_{${n}}`)} bằng`, opts:uniq([u(n), a * n * n - b * n + c, a * n * n + b * n - c, u(n + 1)].map(x => m(x)), 'TN6')}; };
// TN-7 (Biết): số hạng của cấp số cộng
const tn7 = ci => { const [u1, d, k] = [[3, 4, 10], [-5, 3, 8], [7, -2, 12], [2, 5, 15]][ci];
  return {bai:2, q:`Cho cấp số cộng ${m('(u_n)')} có ${m(`u_1 = ${u1}`)} và công sai ${m(`d = ${d}`)}. Số hạng ${m(`u_{${k}}`)} bằng`, opts:uniq([u1 + (k - 1) * d, u1 + k * d, u1 + (k - 2) * d, k * d].map(x => m(x)), 'TN7')}; };
// TN-8 (Biết): số hạng của cấp số nhân
const tn8 = ci => { const [u1, q, k] = [[2, 3, 5], [3, 2, 6], [5, -2, 4], [1, 4, 4]][ci];
  return {bai:2, q:`Cho cấp số nhân ${m('(u_n)')} có ${m(`u_1 = ${u1}`)} và công bội ${m(`q = ${q}`)}. Số hạng ${m(`u_{${k}}`)} bằng`, opts:uniq([u1 * q ** (k - 1), u1 * q ** k, u1 + (k - 1) * q, u1 * q ** (k - 2)].map(x => m(x)), 'TN8')}; };
// TN-9 (Biết): khoảng biến thiên của mẫu số liệu ghép nhóm
const tn9 = ci => { const [x0, h, what, un] = [[10, 5, 'Thời gian tự học ở nhà mỗi ngày của một nhóm học sinh', 'phút'], [20, 10, 'Quãng đường đi học mỗi ngày của một nhóm học sinh', 'trăm mét'], [140, 10, 'Chiều cao của một nhóm học sinh khối 11', 'cm'], [4, 2, 'Số giờ ngủ mỗi ngày của một nhóm học sinh', 'giờ']][ci];
  const grp = Array.from({length:5}, (_, i) => m(`[${x0 + h * i};\\ ${x0 + h * (i + 1)})`)).join(', ');
  return {bai:3, q:`${what} (đơn vị: ${un}) được ghép thành các nhóm ${grp}. Khoảng biến thiên của mẫu số liệu ghép nhóm này là`, opts:uniq([5 * h, x0 + 5 * h, x0 + 4 * h, 4 * h].map(x => m(x)), 'TN9')}; };
// TN-10 (Biết): số trung bình cộng của mẫu số liệu ghép nhóm
const DT = [[10, 5, [5, 6, 15, 4, 10], 'Thời gian (phút) học sinh dùng điện thoại mỗi ngày'], [20, 10, [7, 14, 5, 15, 9], 'Số tiền (nghìn đồng) học sinh ăn sáng mỗi tuần'], [140, 10, [8, 15, 4, 10, 13], 'Chiều cao (cm) của học sinh một lớp'], [4, 2, [7, 3, 10, 11, 9], 'Số giờ tự học (giờ) mỗi tuần của học sinh một lớp']];
const dtTable = (x0, h, f) => `<table class="kt-dt"><tr><th>Nhóm</th>${f.map((_, i) => `<td>${m(`[${x0 + h * i};\\ ${x0 + h * (i + 1)})`)}</td>`).join('')}</tr><tr><th>Tần số</th>${f.map(v => `<td>${v}</td>`).join('')}</tr></table>`;
const stat = (x0, h, f) => { const n = f.reduce((a, b) => a + b, 0), sum = (pt) => f.reduce((s, v, i) => s + v * pt(i), 0), mean = sum(i => x0 + h * (i + .5)) / n;
  let c = 0, mi = 0; for(let i = 0; i < f.length; i++){ if(c + f[i] >= n / 2){ mi = i; break; } c += f[i]; }
  return {n, mean, lower:sum(i => x0 + h * i) / n, upper:sum(i => x0 + h * (i + 1)) / n, mi, lo:x0 + h * mi, me:x0 + h * mi + (n / 2 - c) / f[mi] * h, mids:sum(i => x0 + h * (i + .5)) / f.length * 1}; };
const tn10 = ci => { const [x0, h, f, what] = DT[ci], s = stat(x0, h, f), r1 = x => Math.round(x * 10) / 10;
  return {bai:3, q:`${what} được cho trong bảng sau:${dtTable(x0, h, f)}Số trung bình cộng của mẫu số liệu ghép nhóm trên bằng`, opts:uniq([s.mean, s.lower, s.upper, x0 + h * 2.5].map(x => m(dec(r1(x)))), 'TN10')}; };

/* ---------- Phần II ---------- */
const pair = (a, b) => [m(a), m(b)];
// ĐS-1: hàm số y = 2 sin x cos x … (công thức nhân đôi + hàm số lượng giác)
const ds1 = ci => { const v = [
    {f:'y = 2\\sin x \\cos x', it:[['y = \\sin 2x', 'y = \\cos 2x'], ['T = \\pi', 'T = 2\\pi'], ['[-1;\\ 1]', '[-2;\\ 2]'], 'lẻ']},
    {f:'y = 4\\sin x \\cos x', it:[['y = 2\\sin 2x', 'y = 4\\sin 2x'], ['T = \\pi', 'T = 2\\pi'], ['2', '4'], 'lẻ']},
    {f:'y = 6\\sin 2x \\cos 2x', it:[['y = 3\\sin 4x', 'y = 3\\sin 2x'], ['T = \\dfrac{\\pi}{2}', 'T = \\pi'], ['-3', '-6'], 'lẻ']},
    {f:'y = \\cos^2 x - \\sin^2 x', it:[['y = \\cos 2x', 'y = \\sin 2x'], ['T = \\pi', 'T = 2\\pi'], ['[-1;\\ 1]', '[0;\\ 1]'], 'chẵn']}][ci], I = v.it;
  const c = ['Tập giá trị của hàm số là ', 'Giá trị lớn nhất của hàm số bằng ', 'Giá trị nhỏ nhất của hàm số bằng ', 'Tập giá trị của hàm số là '][ci];
  const odd = I[3] === 'lẻ';
  return {bai:1, stem:`Cho hàm số ${m(v.f)}. Xét tính đúng sai của các mệnh đề sau:`, items:[
    [`Hàm số đã cho viết được thành ${m(I[0][0])}.`, `Hàm số đã cho viết được thành ${m(I[0][1])}.`],
    [`Hàm số tuần hoàn với chu kì ${m(I[1][0])}.`, `Hàm số tuần hoàn với chu kì ${m(I[1][1])}.`],
    [c + m(I[2][0]) + '.', c + m(I[2][1]) + '.'],
    [`Hàm số đã cho là hàm số ${odd ? 'lẻ' : 'chẵn'}.`, `Hàm số đã cho là hàm số ${odd ? 'chẵn' : 'lẻ'}.`]]}; };
// ĐS-2: cấp số cộng cho bởi hai số hạng
const ds2 = ci => { const [u1, d] = [[5, 3], [2, 4], [-3, 5], [9, -2]][ci], u = k => u1 + (k - 1) * d, S = n => n * (2 * u1 + (n - 1) * d) / 2;
  return {bai:2, stem:`Cho cấp số cộng ${m('(u_n)')} có ${m(`u_2 = ${u(2)}`)} và ${m(`u_5 = ${u(5)}`)}. Xét tính đúng sai của các mệnh đề sau:`, items:[
    [`Công sai của cấp số cộng là ${m(`d = ${d}`)}.`, `Công sai của cấp số cộng là ${m(`d = ${d + 1}`)}.`],
    [`Số hạng đầu là ${m(`u_1 = ${u1}`)}.`, `Số hạng đầu là ${m(`u_1 = ${u1 + d}`)}.`],
    [`Số hạng ${m('u_{10}')} bằng ${m(u(10))}.`, `Số hạng ${m('u_{10}')} bằng ${m(u(10) + d)}.`],
    [`Tổng của 12 số hạng đầu bằng ${m(S(12))}.`, `Tổng của 12 số hạng đầu bằng ${m(S(12) + 12 * d)}.`]]}; };
// ĐS-3: mẫu số liệu ghép nhóm – số trung bình, trung vị
const DS3 = [[20, 10, [14, 9, 8, 4, 15], 'Thời gian (phút) tập thể dục mỗi tuần của các học sinh một khối'], [140, 10, [11, 10, 8, 7, 14], 'Chiều cao (cm) của các học sinh một lớp'], [4, 2, [2, 11, 8, 6, 3], 'Số giờ đọc sách (giờ) mỗi tuần của các học sinh một lớp'], [15, 5, [10, 15, 3, 9, 13], 'Số tiền (nghìn đồng) mỗi học sinh góp quỹ lớp']];
const ds3 = ci => { const [x0, h, f, what] = DS3[ci], s = stat(x0, h, f), r1 = x => dec(Math.round(x * 10) / 10), grp = i => `[${x0 + h * i};\\ ${x0 + h * (i + 1)})`, alt = s.mi < 4 ? s.mi + 1 : s.mi - 1;
  return {bai:3, stem:`${what} được cho trong bảng sau:${dtTable(x0, h, f)}Xét tính đúng sai của các mệnh đề sau:`, items:[
    [`Cỡ mẫu là ${m(`n = ${s.n}`)}.`, `Cỡ mẫu là ${m(`n = ${s.n + 5}`)}.`],
    [`Nhóm chứa trung vị là ${m(grp(s.mi))}.`, `Nhóm chứa trung vị là ${m(grp(alt))}.`],
    [`Số trung bình cộng của mẫu số liệu xấp xỉ ${m(r1(s.mean))}.`, `Số trung bình cộng của mẫu số liệu xấp xỉ ${m(r1(s.lower))}.`],
    [`Trung vị của mẫu số liệu xấp xỉ ${m(r1(s.me))}.`, `Trung vị của mẫu số liệu xấp xỉ ${m(r1(s.lo))}.`]]}; };

/* ---------- Phần III (trả lời ngắn, mỗi câu 0,75 điểm) ---------- */
const E = (bai, make) => ({bai, pts:.75, make});
// TLN-1: hàm số lượng giác – mô hình thuỷ triều
const tln1 = E(1, ci => { const [a, b, c] = [[10, 4, 6], [12, 3, 3], [8, 2, 4], [9, 5, 12]][ci], cnt = Math.floor((24 - c / 2) / (2 * c)) + 1, ts = Array.from({length:cnt}, (_, k) => c / 2 + 2 * c * k).map(x => dec(x));
  return {de:`Mực nước (đơn vị: m) tại một cảng biển ở thời điểm ${m('t')} giờ (${m('0 \\le t \\le 24')}) được mô hình hoá bởi hàm số ${m(`h(t) = ${a} + ${b}\\sin\\dfrac{\\pi t}{${c}}`)}. Trong một ngày (${m('0 \\le t \\le 24')}), có bao nhiêu thời điểm mực nước đạt mức cao nhất?`,
    rows:[[`Mực nước cao nhất khi ${m(`\\sin\\dfrac{\\pi t}{${c}} = 1`)}, tức ${m(`t = ${dec(c / 2)} + ${2 * c}k`)} ${m(K)}. Với ${m('0 \\le t \\le 24')}: ${m(`t \\in \\{${ts.join(';\\ ')}\\}`)}. Đáp số: <b>${cnt}</b>`, .75]]}; });
// TLN-2: số nghiệm của phương trình lượng giác trong một khoảng (vận dụng cao)
const countSol = (kind, a, b, al, lo, hi, closed) => { // sin/cos(π(aX + b)) = sin/cos(π·al), X = x/π; b, al: [tử, mẫu]; trả về các nghiệm X = M/(60a)
  const u = x => x[0] * (60 / x[1]), bN = u(b), fam = kind === 'sin' ? [u(al), 60 - u(al)] : [u(al), -u(al)], out = new Map();
  for(const c of fam) for(let k = -60; k <= 60; k++){ const M = c - bN + 120 * k, [n, d] = R(M, 60 * a), inside = closed ? n >= lo * d && n <= hi * d : n > lo * d && n < hi * d; if(inside) out.set(`${n}/${d}`, [n, d]); }
  return [...out.values()].sort((x, y) => x[0] / x[1] - y[0] / y[1]); };
const tln2 = E(1, ci => { const v = [
    {k:'sin', a:2, b:[-1, 3], al:[1, 6], lo:0, hi:2, cl:false, eq:'2\\sin\\left(2x - \\dfrac{\\pi}{3}\\right) = 1', iv:'(0;\\ 2\\pi)', fam:'2x - \\dfrac{\\pi}{3} = \\dfrac{\\pi}{6} + k2\\pi \\text{ hoặc } 2x - \\dfrac{\\pi}{3} = \\dfrac{5\\pi}{6} + k2\\pi'},
    {k:'cos', a:1, b:[1, 4], al:[3, 4], lo:0, hi:3, cl:false, eq:'\\sqrt{2}\\cos\\left(x + \\dfrac{\\pi}{4}\\right) = -1', iv:'(0;\\ 3\\pi)', fam:'x + \\dfrac{\\pi}{4} = \\pm\\dfrac{3\\pi}{4} + k2\\pi'},
    {k:'sin', a:3, b:[0, 1], al:[1, 6], lo:0, hi:2, cl:true, eq:'2\\sin 3x - 1 = 0', iv:'[0;\\ 2\\pi]', fam:'3x = \\dfrac{\\pi}{6} + k2\\pi \\text{ hoặc } 3x = \\dfrac{5\\pi}{6} + k2\\pi'},
    {k:'cos', a:2, b:[0, 1], al:[2, 3], lo:0, hi:2, cl:true, eq:'2\\cos 2x + 1 = 0', iv:'[0;\\ 2\\pi]', fam:'2x = \\pm\\dfrac{2\\pi}{3} + k2\\pi'}][ci];
  const s = countSol(v.k, v.a, v.b, v.al, v.lo, v.hi, v.cl);
  return {de:`Tìm số nghiệm của phương trình ${m(v.eq)} trên ${v.iv.startsWith('(') ? 'khoảng' : 'đoạn'} ${m(v.iv)}.`,
    rows:[[`${m(v.fam)} ${m(K)}. Các nghiệm thuộc ${m(v.iv)}: ${m(s.map(([n, d]) => piT(n, d)).join(';\\ '))}. Đáp số: <b>${s.length}</b>`, .75]]}; });
// TLN-3: cấp số cộng thực tế – tổng n số hạng đầu
const tln3 = E(2, ci => { const [t, u1, d, n] = [['Một rạp chiếu phim có 15 hàng ghế, hàng thứ nhất có 20 ghế, mỗi hàng sau nhiều hơn hàng liền trước 3 ghế. Rạp có tất cả bao nhiêu ghế?', 20, 3, 15],
    ['Một tháp xếp bằng các viên gạch có 12 tầng; tầng thứ nhất có 30 viên, mỗi tầng trên ít hơn tầng liền dưới 2 viên. Tháp dùng tất cả bao nhiêu viên gạch?', 30, -2, 12],
    ['Bạn An tiết kiệm trong 20 tuần: tuần đầu tiên để dành 50 nghìn đồng, mỗi tuần sau để dành nhiều hơn tuần trước 10 nghìn đồng. Sau 20 tuần, An để dành được tất cả bao nhiêu nghìn đồng?', 50, 10, 20],
    ['Một hội trường có 18 hàng ghế, hàng đầu có 16 ghế, mỗi hàng sau nhiều hơn hàng liền trước 2 ghế. Hội trường có tất cả bao nhiêu ghế?', 16, 2, 18]][ci], S = n * (2 * u1 + (n - 1) * d) / 2;
  return {de:t, rows:[[`Các số lập thành cấp số cộng ${m(`u_1 = ${u1},\\ d = ${d}`)}: ${m(`S_{${n}} = \\dfrac{${n}[2\\cdot ${u1 < 0 ? `(${u1})` : u1} + ${n - 1}\\cdot ${d < 0 ? `(${d})` : d}]}{2} = ${S}`)}. Đáp số: <b>${S}</b>`, .75]]}; });
// TLN-4: cấp số nhân thực tế – tổng n số hạng đầu
const tln4 = E(2, ci => { const [t, u1, q, n] = [['Một quần thể vi khuẩn ban đầu có 4 nghìn con; sau mỗi giờ số vi khuẩn tăng gấp 3 lần so với giờ trước. Người ta ghi số vi khuẩn (nghìn con) tại 5 mốc: lúc ban đầu và sau 1, 2, 3, 4 giờ. Tính tổng 5 số đã ghi.', 4, 3, 5],
    ['Một tế bào sau mỗi lần phân chia thì thành 2 tế bào. Từ 3 tế bào ban đầu, người ta ghi số tế bào tại 10 mốc: lúc ban đầu và sau mỗi lần phân chia thứ 1, 2, …, 9. Tính tổng 10 số đã ghi.', 3, 2, 10],
    ['Một bài đăng được chia sẻ: giờ thứ nhất có 5 lượt, mỗi giờ sau số lượt chia sẻ gấp đôi giờ liền trước. Tổng số lượt chia sẻ trong 8 giờ đầu là bao nhiêu?', 5, 2, 8],
    ['Trong một trò chơi, tiền thưởng ở vòng 1 là 2 triệu đồng, mỗi vòng sau gấp 3 lần vòng liền trước. Tổng tiền thưởng (triệu đồng) sau 6 vòng là bao nhiêu?', 2, 3, 6]][ci], S = u1 * (q ** n - 1) / (q - 1);
  return {de:t, rows:[[`Lập thành cấp số nhân ${m(`u_1 = ${u1},\\ q = ${q}`)}: ${m(`S_{${n}} = ${u1}\\cdot\\dfrac{${q}^{${n}} - 1}{${q} - 1} = ${S}`)}. Đáp số: <b>${S}</b>`, .75]]}; });

KiemTra.add({
  grade:'lop11', id:'gk-ma-tran', title:'Kiểm tra giữa học kì I (theo ma trận tuần 8)', set:'Theo ma trận', chapter:'Giữa học kì I',
  subject:'TOÁN 11', book:'Kết nối tri thức với cuộc sống', time:60, codes:['711', '712', '713', '714'],
  school:'TRƯỜNG THPT NGUYỄN HỮU CẢNH', group:'TỔ TOÁN', year:'2026 – 2027', short:true, mcPt:.4, pages:2, spread:true, keepOrder:true,
  levels:['Biết – Hiểu', 'Hiểu (giải quyết vấn đề)', 'Vận dụng (mô hình hoá)'],
  bai:['Hàm số lượng giác, phương trình lượng giác (10 tiết)', 'Dãy số, cấp số cộng, cấp số nhân (6 tiết)', 'Các số đặc trưng đo xu thế trung tâm (mẫu số liệu ghép nhóm)'],
  mc:[tn1, tn2, tn3, tn4, tn5, tn6, tn7, tn8, tn9, tn10], tf:[ds1, ds2, ds3], essay:[tln1, tln2, tln3, tln4],
  matrix:{rows:[
    ['Hàm số lượng giác, phương trình lượng giác (10 tiết)', 'Giá trị lượng giác của một góc lượng giác', 'TN-1\n(TD1.2)', '', '', '', '', '', '', '', ''],
    ['Hàm số lượng giác, phương trình lượng giác (10 tiết)', 'Công thức lượng giác', 'TN-2\n(TD1.2)', '', '', '', 'ĐS-1\n(GQ2.1)', '', '', '', ''],
    ['Hàm số lượng giác, phương trình lượng giác (10 tiết)', 'Hàm số lượng giác và đồ thị', 'TN-3\n(TD1.2)', 'TN-4\n(TD1.2)', '', '', 'ĐS-1\n(GQ2.1)', '', '', '', 'TLN-1\n(MH2.1)'],
    ['Hàm số lượng giác, phương trình lượng giác (10 tiết)', 'Phương trình lượng giác cơ bản', '', 'TN-5\n(TD2.1)', '', '', '', '', '', '', 'TLN-2\n(TH)\nVDC'],
    ['Dãy số, cấp số cộng, cấp số nhân (6 tiết)', 'Dãy số', 'TN-6\n(TD1.2)', '', '', '', '', '', '', '', ''],
    ['Dãy số, cấp số cộng, cấp số nhân (6 tiết)', 'Cấp số cộng', 'TN-7\n(TD1.2)', '', '', '', 'ĐS-2\n(GQ2.1)', '', '', '', 'TLN-3\n(MH2.1)'],
    ['Dãy số, cấp số cộng, cấp số nhân (6 tiết)', 'Cấp số nhân', 'TN-8\n(TD2.3)', '', '', '', '', '', '', '', 'TLN-4\n(MH2.1)'],
    ['Các số đặc trưng đo xu thế trung tâm', 'Mẫu số liệu ghép nhóm', 'TN-9\n(TD1.1)', '', '', '', 'ĐS-3\n(MH2.1)', '', '', '', ''],
    ['Các số đặc trưng đo xu thế trung tâm', 'Các số đặc trưng đo xu thế trung tâm', 'TN-10\n(TD2.1)', '', '', '', '', '', '', '', '']],
    foot:[['Tổng', '08 TN', '02 TN', '', '', '03 ĐS', '', '', '', '04 TLN'], ['Tỉ lệ', '30%', '10%', '', '', '30%', '', '', '', '30%']]}
});
})();
