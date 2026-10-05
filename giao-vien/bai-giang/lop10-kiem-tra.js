/* =====================================================================
   ĐỀ KIỂM TRA CHƯƠNG II – TOÁN 10 (Kết nối tri thức) · 45 phút · 4 mã đề
   Chương II. Bất phương trình và hệ bất phương trình bậc nhất hai ẩn (Bài 3, Bài 4).
   Cấu trúc 10 điểm (khuôn lop11-kiem-tra.js, thêm mcPt và short):
     Phần I   – 10 câu trắc nghiệm 1 đáp án × 0,5 = 5 điểm   (nhận biết – thông hiểu)
     Phần II  – 3 câu đúng/sai (mỗi câu 4 ý) × 1 = 3 điểm    (thông hiểu – vận dụng thấp)
     Phần III – 2 câu trả lời ngắn (vận dụng) × 1 = 2 điểm
   Mỗi mã đề in vừa 2 trang A4 (1 tờ hai mặt). Câu Phần I và Phần III có số liệu riêng cho từng mã đề.
   Đáp án đúng của mọi câu Phần I được suy ra bằng phép tính trong mã (đúng 1 phương án thoả điều kiện).
   ===================================================================== */
(() => {
const m = tm, f = (a, b) => `\\dfrac{${a}}{${b}}`;
const lin = (a, b) => tpoly([a, 'x'], [b, 'y']);
const REL = {le:'\\le', ge:'\\ge', lt:'\\lt', gt:'\\gt'};
const hold = (v, op, c) => op === 'le' ? v <= c : op === 'ge' ? v >= c : op === 'lt' ? v < c : v > c;
const ineq = ([a, b, op, c]) => m(`${lin(a, b)} ${REL[op]} ${c}`);
const sat = (q, [x, y]) => hold(q[0] * x + q[1] * y, q[2], q[3]);
const P = ([x, y]) => `(${x};\\ ${y})`;
// Chọn đúng một phần tử thoả pred (không thì báo lỗi ngay khi dựng đề) – đáp án đúng đặt đầu danh sách.
const one = (arr, pred) => { const ok = arr.filter(pred); if(ok.length !== 1) throw new Error('Câu trắc nghiệm không có đúng 1 đáp án: ' + JSON.stringify(arr)); return [ok[0], ...arr.filter(x => x !== ok[0])]; };

/* ---- LP: đỉnh của miền {x ≥ 0, y ≥ 0, a1x + b1y ≤ c1, a2x + b2y ≤ c2} và giá trị lớn nhất của F = px + qy ---- */
const lpSolve = (a1, b1, c1, a2, b2, c2, p, q) => {
  const L = [[a1, b1, c1], [a2, b2, c2], [1, 0, 0], [0, 1, 0]], pts = [];
  for(let i = 0; i < 4; i++) for(let j = i + 1; j < 4; j++){
    const [A, B, C] = L[i], [D, E, F] = L[j], det = A * E - B * D; if(!det) continue;
    const x = (C * E - B * F) / det, y = (A * F - C * D) / det;
    if(x >= -1e-9 && y >= -1e-9 && a1 * x + b1 * y <= c1 + 1e-9 && a2 * x + b2 * y <= c2 + 1e-9 && !pts.some(t => Math.abs(t[0] - x) + Math.abs(t[1] - y) < 1e-9)) pts.push([x, y]);
  }
  const best = pts.reduce((a, t) => p * t[0] + q * t[1] > p * a[0] + q * a[1] ? t : a, pts[0]);
  return {pts, best, max:p * best[0] + q * best[1]};
};

KiemTra.add({
  grade:'lop10', id:'c2', title:'Kiểm tra chương II', chapter:'Chương II. Bất phương trình và hệ bất phương trình bậc nhất hai ẩn',
  subject:'TOÁN 10', book:'Kết nối tri thức với cuộc sống', time:45, codes:['101', '102', '103', '104'], mcPt:0.5, short:true,
  levels:['Nhận biết – Thông hiểu', 'Thông hiểu – Vận dụng thấp', 'Vận dụng'],
  school:'TRƯỜNG THPT NGUYỄN HỮU CẢNH', group:'TỔ TOÁN', year:'2026 – 2027',
  bai:['Bài 3. Bất phương trình bậc nhất hai ẩn', 'Bài 4. Hệ bất phương trình bậc nhất hai ẩn'],

  /* ---------------- PHẦN I: 10 câu, 0,5 điểm/câu ---------------- */
  mc:[
    ci => { const g = [
        ['2x - 3y \\le 5', ['x^2 + y \\gt 1', '\\dfrac{1}{x} - y \\ge 2', 'x^2 + y^2 \\lt 4']], ['x + 4y \\gt 7', ['xy \\ge 3', 'x^2 - 2y \\lt 0', '\\sqrt{x} + y \\le 1']],
        ['3x - y \\lt 2', ['x^3 + y \\ge 0', 'y^2 - x \\le 1', 'xy \\lt 5']], ['-x + 5y \\ge 1', ['x^2y \\lt 2', '|x| + y \\le 3', 'x^2 - y \\gt 0']]][ci];
      return {bai:1, q:'Bất phương trình nào sau đây là bất phương trình bậc nhất hai ẩn?', opts:[g[0], ...g[1]].map(x => m(x))}; },
    ci => { const q = [[2, 1, 'le', 3], [1, 3, 'gt', 6], [3, -2, 'ge', 4], [2, -5, 'lt', 1]][ci], pts = [[[1, 1], [2, 1], [1, 2], [0, 4]], [[3, 2], [1, 1], [0, 2], [2, 1]], [[2, 1], [1, 1], [0, -1], [1, 0]], [[1, 1], [3, 1], [4, 1], [2, 0]]][ci];
      return {bai:1, q:`Cặp số nào sau đây là nghiệm của bất phương trình ${ineq(q)}?`, opts:one(pts, t => sat(q, t)).map(t => m(P(t)))}; },
    ci => { const q = [[1, -2, 'gt', 2], [3, 1, 'le', 4], [2, -1, 'ge', 1], [1, 2, 'lt', 5]][ci], strict = q[2] === 'gt' || q[2] === 'lt', hasO = hold(0, q[2], q[3]);
      const t = (s, o) => `Đường thẳng biên vẽ nét ${s ? 'đứt' : 'liền'}, miền nghiệm ${o ? 'chứa' : 'không chứa'} gốc toạ độ ${m('O')}`;
      return {bai:1, q:`Khi biểu diễn miền nghiệm của bất phương trình ${ineq(q)} trên mặt phẳng ${m('Oxy')}, khẳng định nào sau đây đúng?`, opts:[t(strict, hasO), t(strict, !hasO), t(!strict, hasO), t(!strict, !hasO)]}; },
    ci => { const q = [[1, 1, 'ge', 2], [2, -1, 'le', 1], [1, -3, 'lt', 4], [3, 2, 'gt', 5]][ci], pts = [[[1, 1], [2, 0], [3, -1], [0, 1]], [[0, 0], [1, 1], [0, -1], [2, 1]], [[1, 0], [0, -1], [2, -1], [-1, 0]], [[1, 1], [2, 1], [0, 3], [3, 0]]][ci];
      return {bai:1, q:`Cặp số nào sau đây <b>không</b> là nghiệm của bất phương trình ${ineq(q)}?`, opts:one(pts, t => !sat(q, t)).map(t => m(P(t)))}; },
    ci => { const g = [[[1, 1, 'gt', 1], [2, -1, 'ge', 3], [1, -3, 'lt', 2], [3, 1, 'le', -1]], [[1, -1, 'lt', -2], [2, 1, 'ge', 1], [1, 4, 'le', 3], [3, -1, 'gt', 1]],
        [[1, 2, 'le', -1], [1, -1, 'gt', 0], [2, -3, 'gt', -4], [4, 1, 'ge', 2]], [[2, 1, 'lt', -3], [1, -2, 'ge', 1], [3, 1, 'gt', -1], [1, 5, 'ge', 4]]][ci];
      return {bai:1, q:`Miền nghiệm của bất phương trình nào sau đây chứa gốc toạ độ ${m('O(0;\\ 0)')}?`, opts:one(g, q => hold(0, q[2], q[3])).map(ineq)}; },
    ci => { const s = [[[2, -1, 'ge', 1], [1, 1, 'le', 5]], [[1, -1, 'le', 2], [2, 1, 'ge', 4]], [[1, 2, 'le', 6], [3, -1, 'ge', 2]], [[1, -2, 'ge', -1], [1, 1, 'le', 4]]][ci],
        pts = [[[2, 1], [0, 1], [3, 3], [1, 3]], [[2, 1], [0, 1], [5, 1], [1, 0]], [[1, 1], [0, 3], [4, 2], [2, 3]], [[1, 1], [0, 1], [3, 3], [4, 1]]][ci];
      return {bai:2, q:`Cặp số nào sau đây là nghiệm của hệ bất phương trình ${m(`\\begin{cases}${s.map(q => `${lin(q[0], q[1])} ${REL[q[2]]} ${q[3]}`).join(' \\\\ ')}\\end{cases}`)}?`, opts:one(pts, t => s.every(q => sat(q, t))).map(t => m(P(t)))}; },
    ci => { const g = [[['x \\ge 0', 'y \\ge 0'], 'Góc phần tư thứ nhất, kể cả hai trục toạ độ'], [['x \\le 0', 'y \\ge 0'], 'Góc phần tư thứ hai, kể cả hai trục toạ độ'],
        [['x \\gt 0', 'y \\gt 0'], 'Góc phần tư thứ nhất, không kể hai trục toạ độ'], [['x \\ge 0', 'y \\le 0'], 'Góc phần tư thứ tư, kể cả hai trục toạ độ']][ci];
      const all = ['Góc phần tư thứ nhất, kể cả hai trục toạ độ', 'Góc phần tư thứ nhất, không kể hai trục toạ độ', 'Góc phần tư thứ hai, kể cả hai trục toạ độ', 'Góc phần tư thứ tư, kể cả hai trục toạ độ', 'Góc phần tư thứ ba, kể cả hai trục toạ độ'];
      return {bai:2, q:`Miền nghiệm của hệ bất phương trình ${m(`\\begin{cases}${g[0].join(' \\\\ ')}\\end{cases}`)} là`, opts:[g[1], ...all.filter(x => x !== g[1]).slice(0, 3)]}; },
    ci => { const a = [3, 4, 5, 6][ci];
      return {bai:2, q:`Miền nghiệm của hệ bất phương trình ${m(`\\begin{cases}x \\ge 0 \\\\ y \\ge 0 \\\\ x + y \\le ${a}\\end{cases}`)} là`,
        opts:[`Tam giác có ba đỉnh ${m(`O(0;\\ 0)`)}, ${m(`A(${a};\\ 0)`)}, ${m(`B(0;\\ ${a})`)}`, `Tam giác có ba đỉnh ${m(`O(0;\\ 0)`)}, ${m(`A(${a};\\ 0)`)}, ${m(`B(0;\\ -${a})`)}`,
          `Hình vuông có bốn đỉnh ${m(`O(0;\\ 0)`)}, ${m(`A(${a};\\ 0)`)}, ${m(`C(${a};\\ ${a})`)}, ${m(`B(0;\\ ${a})`)}`, `Nửa mặt phẳng bờ là đường thẳng ${m(`x + y = ${a}`)}`]}; },
    ci => { const g = [{poly:[[0, 0], [4, 0], [2, 3], [0, 3]], F:[2, 3], kind:'max', w:[[4, 3]]}, {poly:[[1, 1], [5, 1], [2, 4]], F:[1, 2], kind:'min', w:[[5, 4], [0, 0]]},
        {poly:[[0, 0], [5, 0], [3, 4], [0, 2]], F:[4, 1], kind:'max', w:[[5, 4]]}, {poly:[[0, 2], [4, 0], [3, 3]], F:[3, -1], kind:'min', w:[[0, 0]]}][ci];
      const val = t => g.F[0] * t[0] + g.F[1] * t[1], vs = g.poly.map(val), ans = g.kind === 'max' ? Math.max(...vs) : Math.min(...vs);
      const others = vs.filter(v => v !== ans), extra = g.w.map(val), pool = [...new Set([...others, ...extra, g.kind === 'min' && ans < 0 ? -ans : null].filter(v => v !== null && v !== ans))].slice(0, 3);
      const names = 'OABCD'.split(''), ptxt = g.poly.map((t, i) => m(`${ci === 1 || ci === 3 ? 'ABC'[i] : names[i]}(${t[0]};\\ ${t[1]})`)).join(', ');
      return {bai:2, q:`Giá trị ${g.kind === 'max' ? 'lớn' : 'nhỏ'} nhất của biểu thức ${m(`F(x;\\ y) = ${lin(g.F[0], g.F[1])}`)} trên miền ${g.poly.length === 3 ? 'tam giác' : 'tứ giác'} có các đỉnh ${ptxt} là`, opts:[ans, ...pool].map(v => m(String(v)))}; },
    ci => { const g = [['bánh loại I dùng 2 kg bột, mỗi bánh loại II dùng 3 kg bột; có tối đa 30 kg bột', 'bánh loại I', 'bánh loại II', 2, 3, 'le', 30],
        ['bút xanh giá 4 nghìn đồng, mỗi bút đỏ giá 5 nghìn đồng; số tiền không quá 60 nghìn đồng', 'bút xanh', 'bút đỏ', 4, 5, 'le', 60],
        ['thùng loại I nặng 3 kg, mỗi thùng loại II nặng 2 kg; tổng khối lượng không vượt quá 120 kg', 'thùng loại I', 'thùng loại II', 3, 2, 'le', 120],
        ['buổi học Toán kéo dài 2 giờ, mỗi buổi học Văn kéo dài 3 giờ; tổng thời gian học ít nhất 12 giờ', 'buổi học Toán', 'buổi học Văn', 2, 3, 'ge', 12]][ci];
      const [txt, n1, n2, a, b, op, c] = g, flip = op === 'le' ? 'ge' : 'le', sys = (a_, b_, o) => m(`${lin(a_, b_)} ${REL[o]} ${c},\\ x \\ge 0,\\ y \\ge 0`);
      return {bai:2, q:`Gọi ${m('x')}, ${m('y')} lần lượt là số ${n1} và số ${n2}; mỗi ${txt}. Các điều kiện ràng buộc của ${m('x, y')} là`,
        opts:[sys(a, b, op), sys(a, b, flip), sys(b, a, op), m(`x + y ${REL[op]} ${c},\\ x \\ge 0,\\ y \\ge 0`)]}; },
  ],

  /* ---------------- PHẦN II: 3 câu đúng – sai (mỗi câu 4 ý) ---------------- */
  tf:[
    {bai:1, stem:`Cho bất phương trình ${m('2x - y \\ge 3')} ${m('(1)')}.`, items:[
      [`Cặp số ${m('(2;\\ 1)')} là một nghiệm của ${m('(1)')}.`, `Cặp số ${m('(1;\\ 2)')} là một nghiệm của ${m('(1)')}.`],
      [`Gốc toạ độ ${m('O')} không thuộc miền nghiệm của ${m('(1)')}.`, `Gốc toạ độ ${m('O')} thuộc miền nghiệm của ${m('(1)')}.`],
      [`Khi biểu diễn miền nghiệm của ${m('(1)')}, đường thẳng ${m('2x - y = 3')} được vẽ bằng nét liền.`, `Khi biểu diễn miền nghiệm của ${m('(1)')}, đường thẳng ${m('2x - y = 3')} được vẽ bằng nét đứt.`],
      [`Điểm ${m('M(m;\\ 1)')} thuộc miền nghiệm của ${m('(1)')} khi và chỉ khi ${m('m \\ge 2')}.`, `Điểm ${m('M(m;\\ 1)')} thuộc miền nghiệm của ${m('(1)')} khi và chỉ khi ${m('m \\ge 1')}.`]]},
    {bai:2, stem:`Cho hệ bất phương trình ${m('\\begin{cases}x \\ge 0 \\\\ y \\ge 0 \\\\ x + y \\le 4 \\\\ x \\le 3\\end{cases}')} ${m('(2)')}.`, items:[
      [`Cặp số ${m('(1;\\ 2)')} là một nghiệm của hệ ${m('(2)')}.`, `Cặp số ${m('(3;\\ 2)')} là một nghiệm của hệ ${m('(2)')}.`],
      [`Cặp số ${m('(4;\\ 0)')} không là nghiệm của hệ ${m('(2)')}.`, `Cặp số ${m('(4;\\ 0)')} là một nghiệm của hệ ${m('(2)')}.`],
      [`Miền nghiệm của hệ ${m('(2)')} là một tứ giác.`, `Miền nghiệm của hệ ${m('(2)')} là một tam giác.`],
      [`Miền nghiệm của hệ ${m('(2)')} có diện tích bằng ${m('7{,}5')}.`, `Miền nghiệm của hệ ${m('(2)')} có diện tích bằng ${m('8')}.`]]},
    {bai:2, stem:`Một xưởng sản xuất hai loại sản phẩm ${m('A')}, ${m('B')}. Mỗi ngày làm ${m('x')} sản phẩm ${m('A')} và ${m('y')} sản phẩm ${m('B')}. Mỗi sản phẩm ${m('A')} cần 2 giờ máy, lãi 3 triệu đồng; mỗi sản phẩm ${m('B')} cần 1 giờ máy, lãi 2 triệu đồng. Máy chạy không quá 8 giờ/ngày và tổng số sản phẩm không quá 6 mỗi ngày.`, items:[
      [`Các ràng buộc là ${m('x \\ge 0,\\ y \\ge 0,\\ 2x + y \\le 8,\\ x + y \\le 6')}.`, `Các ràng buộc là ${m('x \\ge 0,\\ y \\ge 0,\\ 2x + y \\ge 8,\\ x + y \\le 6')}.`],
      [`Phương án làm 2 sản phẩm ${m('A')}, 4 sản phẩm ${m('B')} thoả mãn mọi ràng buộc.`, `Phương án làm 3 sản phẩm ${m('A')}, 3 sản phẩm ${m('B')} thoả mãn mọi ràng buộc.`],
      [`Làm 4 sản phẩm ${m('A')} và không làm sản phẩm ${m('B')} thì lãi 12 triệu đồng.`, `Làm 4 sản phẩm ${m('A')} và không làm sản phẩm ${m('B')} thì lãi 8 triệu đồng.`],
      [`Lãi lớn nhất mỗi ngày là 14 triệu đồng.`, `Lãi lớn nhất mỗi ngày là 12 triệu đồng.`]]},
  ],

  /* ---------------- PHẦN III: 2 câu trả lời ngắn (vận dụng) ---------------- */
  essay:[
    {bai:2, pts:1, make: ci => { const [a1, b1, c1, a2, b2, c2, p, q] = [[2, 3, 18, 2, 1, 14, 5, 3], [3, 2, 15, 2, 3, 15, 5, 4], [1, 3, 12, 3, 3, 24, 4, 5], [4, 2, 16, 1, 3, 9, 5, 3]][ci];
      const r = lpSolve(a1, b1, c1, a2, b2, c2, p, q), [bx, by] = r.best, ts = r.pts.map(t => `${m(`(${t[0]};\\ ${t[1]})`)}: ${m(`F = ${p * t[0] + q * t[1]}`)}`).join('; ');
      return { de:`Mỗi ngày một xưởng sản xuất ${m('x')} sản phẩm loại I và ${m('y')} sản phẩm loại II. Mỗi sản phẩm loại I cần ${a1} kg nguyên liệu và ${a2} giờ công, mỗi sản phẩm loại II cần ${b1} kg nguyên liệu và ${b2} giờ công. Mỗi ngày xưởng có tối đa ${c1} kg nguyên liệu và ${c2} giờ công. Tiền lãi mỗi sản phẩm loại I là ${p} triệu đồng, loại II là ${q} triệu đồng. Tính số tiền lãi lớn nhất (triệu đồng) xưởng thu được mỗi ngày.`,
        rows:[[`Ràng buộc: ${m(`x \\ge 0,\\ y \\ge 0,\\ ${a1}x + ${b1}y \\le ${c1},\\ ${a2}x + ${b2}y \\le ${c2}`)}; lãi ${m(`F = ${p}x + ${q}y`)}. Đỉnh miền nghiệm và giá trị ${m('F')}: ${ts}. Lớn nhất tại ${m(`(${bx};\\ ${by})`)}. Đáp số: <b>${r.max}</b> (triệu đồng).`, 1]] }; }},
    {bai:2, pts:1, make: ci => { const c = [8, 10, 12, 6][ci], S = (c - 2) * (c - 2) / 4;
      return { de:`Tính diện tích (đơn vị diện tích) của miền nghiệm của hệ bất phương trình ${m(`\\begin{cases}x \\ge 0 \\\\ y \\ge 1 \\\\ x + 2y \\le ${c}\\end{cases}`)}.`,
        rows:[[`Miền nghiệm là tam giác có ba đỉnh ${m('(0;\\ 1)')}, ${m(`(${c - 2};\\ 1)`)}, ${m(`(0;\\ ${c / 2})`)}, vuông tại ${m('(0;\\ 1)')}, hai cạnh góc vuông dài ${m(c - 2)} và ${m(c / 2 - 1)}. Diện tích ${m(`\\dfrac{1}{2}\\cdot ${c - 2}\\cdot ${c / 2 - 1}`)}. Đáp số: <b>${S}</b>.`, 1]] }; }},
  ],
});
})();
