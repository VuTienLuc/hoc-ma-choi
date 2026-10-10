/* Bài luyện tập trực tuyến cho HỌC SINH – Kiểm tra giữa học kì I, Toán 11, THEO MA TRẬN tuần 8.
   60 phút: 10 TN × 0,4 + 3 Đ/S × 1 + 4 TLN × 0,75 = 10 điểm. Câu hỏi lấy từ ngân hàng data/lop11-giua-ki-bank.js (GK11).
   Đề 1 trùng đề in cho giáo viên (mã 711–714); Đề 2 là bộ số khác. */
(() => {
const {mc, tf, sh} = GK11;
[0, 1].forEach(n => StudentTest.add({grade:'lop11', id:`gk-mt-${n + 1}`, topic:3, title:`Luyện tập giữa học kì I theo ma trận – Đề ${n + 1}`, time:60, pill:'LUYỆN TẬP GIỮA HỌC KÌ I', counts:{mc:10, tf:3, short:4}, mcPt:.4, tfPt:1, shortPt:.75, codes:['A', 'B', 'C', 'D'].map(c => `M${n + 1}${c}`),
  lead:'Cấu trúc đề giữa học kì I của tổ Toán: 10 câu trắc nghiệm (4 điểm), 3 câu đúng/sai (3 điểm), 4 câu trả lời ngắn (3 điểm); làm trong 60 phút. Nội dung: Hàm số lượng giác và phương trình lượng giác, Dãy số – cấp số cộng – cấp số nhân, Mẫu số liệu ghép nhóm và các số đặc trưng đo xu thế trung tâm.',
  mc:mc.map(f => ci => f(ci, n)),
  tf:tf.map((f, i) => ci => { const q = f(ci, n); return {stem:q.stem, items:q.items.map((it, j) => { const ok = (j + ci + i) % 2 === 0; return {text:it.t[ok ? 0 : 1], ok, sol:it.s[ok ? 0 : 1]}; })}; }),
  short:sh.map(f => ci => { const q = f(ci, n); return {q:q.q, ans:q.ans, sol:q.sol}; })}));
})();
