/* =====================================================================
   ĐỀ KIỂM TRA GIỮA HỌC KÌ I – TOÁN 10 · BỘ ĐỀ THỨ HAI (thầy yêu cầu 26/10/2026) · 60 phút · 4 mã đề 721–724
   Cùng cấu trúc và ma trận tuần 8 với bộ đề 701–704 (10 TN × 0,4 + 3 Đ/S + 4 TLN × 0,75), bộ hạt giống khác (đề số 8), chỉ ĐỔI
   câu TLN-2 (câu “số tập con của tập hợp”) thành một bài hệ thức lượng trong tam giác ở mức vận dụng cao (9–10 điểm), thuần hình học:
   TỨ GIÁC NỘI TIẾP biết bốn cạnh, tính diện tích (cần: B + D = 180° ⇒ cos D = −cos B; định lí côsin cho AC trong hai tam giác; công thức diện tích).
   Bốn mã dùng bốn bộ cạnh khác nhau, mọi bộ có B (hoặc D) bằng 60° hoặc 120° nên đáp số cho bằng một chữ số thập phân gọn (≤ 4 kí tự):
     mã 721: AB = 3, BC = 5, CD = 8, DA = 5  (B = 120°) → 23,8      mã 722: AB = 7, BC = 8, CD = 8, DA = 15 (B = 120°) → 76,2
     mã 723: AB = 10, BC = 16, CD = 6, DA = 10 (B = 60°) → 95,3     mã 724: AB = 2, BC = 5, CD = 5, DA = 7  (B = 120°) → 19,5
   Đáp số kiểm lại độc lập bằng toạ độ trong tools/test_gk_ma_tran.js. Link: #/lop10/kiem-tra/gk-ma-tran-2/de · …/de-721 · …/da
   ===================================================================== */
(() => {
const {mtMc, mtTf, mtSh, fmt, M} = GK1, N = 8;
const sm = (h, w = 135) => h.replace(/<svg width="\d+"/g, `<svg width="${w}"`);
const mc = i => ci => { const x = mtMc(N, i, ci); return {bai:x.bai, q:sm(x.q), opts:x.opts}; };
const tf = i => ci => { const x = mtTf(N, i, ci); return {bai:x.bai, stem:sm(x.stem), items:x.items.map(it => it.t)}; };
const flat = s => s.replace(/<\/?(p|b)>/g, ' ').replace(/\s+/g, ' ').replace(/\s*Đáp số:[^.]*\.?\s*$/, '').trim();
const sh = i => ({bai:GK1.MT.shBai[i], pts:.75, make:ci => { const x = mtSh(N, i, ci); return {de:sm(x.q), rows:[[`${flat(x.sol)} Đáp số: <b>${fmt(x.ans)}</b>`, .75]]}; }});

/* Bốn bộ cạnh (AB, BC, CD, DA) của tứ giác nội tiếp ABCD; cos B = (AB² + BC² − CD² − DA²) / (2(AB·BC + CD·DA)) = ±1/2 */
const QUADS = [[3, 5, 8, 5], [7, 8, 8, 15], [10, 16, 6, 10], [2, 5, 5, 7]];
const cycQuad = ci => {
  const [a, b, c, d] = QUADS[ci], num = a * a + b * b - c * c - d * d, den = 2 * (a * b + c * d), cB = num / den, big = a * b + c * d;
  const sinB = Math.sqrt(1 - cB * cB), S = big * sinB / 2, ans = Math.round(S * 10) / 10, B = cB > 0 ? 60 : 120, D = 180 - B;
  if(Math.abs(Math.abs(cB) - .5) > 1e-12 || Math.abs(S * 10 - Math.floor(S * 10) - .5) < .06 || fmt(ans).length > 4) throw new Error('cycQuad: bộ cạnh không hợp lệ ' + QUADS[ci]);
  const frac = n => `${n < 0 ? '-' : ''}\\dfrac{${Math.abs(n)}}{${den}}`, p = s => `<p>${s}</p>`;
  const tex = x => M(x);
  return {
    de:`Cho tứ giác ${tex('ABCD')} nội tiếp một đường tròn, có ${tex(`AB = ${a}`)}, ${tex(`BC = ${b}`)}, ${tex(`CD = ${c}`)}, ${tex(`DA = ${d}`)}. Tính diện tích của tứ giác ${tex('ABCD')} (làm tròn đến hàng phần mười).`,
    ans,
    sol:p(`Tứ giác nội tiếp nên ${tex('\\widehat{B} + \\widehat{D} = 180^\\circ')}, suy ra ${tex('\\cos D = -\\cos B')}.`) +
      p(`Định lí côsin cho ${tex('AC')} trong hai tam giác ${tex('ABC')} và ${tex('ADC')}: ${tex(`AC^2 = ${a * a} + ${b * b} - ${2 * a * b}\\cos B = ${c * c} + ${d * d} + ${2 * c * d}\\cos B`)}.`) +
      p(`Suy ra ${tex(`${2 * a * b + 2 * c * d}\\cos B = ${num}`)}, tức ${tex(`\\cos B = ${frac(num)} = ${cB > 0 ? '' : '-'}\\dfrac{1}{2}`)}, nên ${tex(`\\widehat{B} = ${B}^\\circ`)}, ${tex(`\\widehat{D} = ${D}^\\circ`)}.`) +
      p(`${tex(`S = \\dfrac{1}{2}\\cdot AB\\cdot BC\\sin B + \\dfrac{1}{2}\\cdot CD\\cdot DA\\sin D = \\dfrac{1}{2}(${a * b} + ${c * d})\\cdot\\dfrac{\\sqrt{3}}{2} = ${big}\\cdot\\dfrac{\\sqrt{3}}{4} \\approx ${fmt(S)}`)}.`)
  };
};
const quad = () => ({bai:3, pts:.75, make:ci => { const x = cycQuad(ci); return {de:x.de, rows:[[`${flat(x.sol)} Đáp số: <b>${fmt(x.ans)}</b>`, .75]]}; }});

KiemTra.add({
  grade:'lop10', id:'gk-ma-tran-2', title:'Kiểm tra giữa học kì I (theo ma trận tuần 8) – bộ đề thứ hai', chapter:'Giữa học kì I',
  subject:'TOÁN 10', book:'', time:60, codes:['721', '722', '723', '724'],
  school:'TRƯỜNG THPT NGUYỄN HỮU CẢNH', group:'TỔ TOÁN', year:'2026 – 2027', short:true, mcPt:.4, pages:2, spread:true, keepOrder:true,
  levels:['Biết – Hiểu', 'Hiểu (giải quyết vấn đề)', 'Vận dụng (mô hình hoá)'],
  bai:['Mệnh đề và tập hợp (6 tiết)', 'Bất phương trình và hệ bất phương trình bậc nhất hai ẩn (5 tiết)', 'Hệ thức lượng trong tam giác (10 tiết)'],
  mc:Array.from({length:10}, (_, i) => mc(i)),
  tf:Array.from({length:3}, (_, i) => tf(i)),
  essay:[sh(0), quad(), sh(2), sh(3)],
  matrix:{rows:[
    ['Mệnh đề và tập hợp (6 tiết)', 'Mệnh đề', 'TN-1,2\n(TD1.2)', '', '', '', '', '', '', '', ''],
    ['Mệnh đề và tập hợp (6 tiết)', 'Tập hợp. Các phép toán trên tập hợp', 'TN-3\n(TD1.2)', 'TN-4\n(TD2.1)', '', '', 'ĐS-1\n(GQ2.1)', '', '', '', 'TLN-1\n(MH2.1)'],
    ['Bất phương trình và hệ bất phương trình bậc nhất hai ẩn (5 tiết)', 'Bất phương trình bậc nhất hai ẩn', 'TN-5\n(TD1.2)', '', '', '', 'ĐS-2\n(MH2.1)', '', '', '', ''],
    ['Bất phương trình và hệ bất phương trình bậc nhất hai ẩn (5 tiết)', 'Hệ bất phương trình bậc nhất hai ẩn', 'TN-6\n(TD1.2)', '', '', '', 'ĐS-2\n(MH2.1)', '', '', '', 'TLN-3\n(MH2.1)\nVDC'],
    ['Hệ thức lượng trong tam giác (10 tiết)', 'Giá trị lượng giác của một góc từ 0° đến 180°', 'TN-7\n(TD1.2)', '', '', '', '', '', '', '', ''],
    ['Hệ thức lượng trong tam giác (10 tiết)', 'Hệ thức lượng trong tam giác', 'TN-8,9\n(TD1.2)', 'TN-10\n(TD1.2)', '', '', 'ĐS-3\n(GQ2.1)', '', '', '', 'TLN-2\n(MH2.1)\nVDC\nTLN-4\n(MH2.1)']],
    foot:[['Tổng', '08 TN', '02 TN', '', '', '03 ĐS', '', '', '', '04 TLN'], ['Tỉ lệ', '30%', '10%', '', '', '30%', '', '', '', '30%']]}
});
})();
