/* Bài kiểm tra trực tuyến cho HỌC SINH – Chương II, Toán 11 (Dãy số. Cấp số cộng và cấp số nhân).
   45 phút: 10 TN × 0,5 + 3 Đ/S × 1 + 2 TLN × 1 = 10 điểm. Câu hỏi lấy từ ngân hàng data/lop11-chuong2-bank.js (C2B11).
   Đề 1 trùng đề in cho giáo viên (mã 121–124); Đề 2 là bộ số khác. */
(() => {
const {mc, tf, sh} = C2B11;
[0, 1].forEach(n => StudentTest.add({grade:'lop11', id:`c2-${n + 1}`, topic:2, title:`Kiểm tra chương II – Đề ${n + 1}`, time:45, counts:{mc:10, tf:3, short:2}, mcPt:.5, tfPt:1, shortPt:1, codes:['A', 'B', 'C', 'D'].map(c => `C2${n + 1}${c}`),
  lead:'Chương II. Dãy số. Cấp số cộng và cấp số nhân: 10 câu trắc nghiệm (5 điểm), 3 câu đúng/sai (3 điểm), 2 câu trả lời ngắn (2 điểm); làm trong 45 phút. Làm chắc phần trắc nghiệm và các ý đầu của câu đúng/sai để đạt 7–8 điểm; ý cuối và hai câu trả lời ngắn dành cho mục tiêu 9–10 điểm.',
  mc:mc.map(f => ci => f(ci, n)),
  tf:tf.map((f, i) => ci => { const q = f(ci, n); return {stem:q.stem, items:q.items.map((it, j) => { const ok = (j + ci + i) % 2 === 0; return {text:it.t[ok ? 0 : 1], ok, sol:it.s[ok ? 0 : 1]}; })}; }),
  short:sh.map(f => ci => { const q = f(ci, n); return {q:q.q, ans:q.ans, sol:q.sol}; })}));
})();
