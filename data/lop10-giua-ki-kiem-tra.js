/* Bài kiểm tra tương tác cho HỌC SINH – Ôn tập giữa học kì I (Toán 10). Câu hỏi lấy từ ngân hàng data/lop10-giua-ki-bank.js (GK1). */
(() => {
const {mcOf, tfOf, shOf} = GK1;
/* 12 TN × 0,25 + 4 Đ/S × 1 + 6 TLN × 0,5 = 10 điểm; 90 phút; 4 mã đề */
{
  for(let n = 1; n <= 5; n++){
    StudentTest.add({grade:'lop10', id:`giua-ki-${n}`, topic:4, title:`Đề ôn tập giữa học kì I – Đề ${n}`, time:90, counts:{mc:12, tf:4, short:6}, mcPt:.25, tfPt:1, shortPt:.5, codes:[`G${n}A`, `G${n}B`, `G${n}C`, `G${n}D`],
      mc:Array.from({length:12}, (_, i) => ci => mcOf(n, i, ci)),
      tf:Array.from({length:4}, (_, i) => ci => { const q = tfOf(n, i, ci); return {stem:q.stem, items:q.items.map((it, j) => { const ok = (j + ci) % 2 === 0; return {text:it.t[ok ? 0 : 1], ok, sol:it.s[ok ? 0 : 1]}; })}; }),
      short:Array.from({length:6}, (_, i) => ci => { const q = shOf(n, i, ci); return {q:q.q, ans:q.ans, sol:q.sol}; })});
  }
}
/* ---- Luyện tập THEO MA TRẬN giữa kì (tuần 8): 60 phút, 10 TN × 0,4 + 3 Đ/S × 1 + 4 TLN × 0,75 = 10 điểm. Đề 1 trùng đề in cho giáo viên (bộ 7: mã 701–704), Đề 2 là bộ số khác. ---- */
{
  const {mtMc, mtTf, mtSh} = GK1;
  [[1, 7], [2, 8]].forEach(([k, n]) => StudentTest.add({grade:'lop10', id:`gk-mt-${k}`, topic:4, title:`Luyện tập giữa học kì I theo ma trận – Đề ${k}`, time:60, pill:'LUYỆN TẬP GIỮA HỌC KÌ I', counts:{mc:10, tf:3, short:4}, mcPt:.4, tfPt:1, shortPt:.75, codes:['A', 'B', 'C', 'D'].map(c => `M${k}${c}`),
    lead:'Cấu trúc đề giữa học kì I của tổ Toán: 10 câu trắc nghiệm (4 điểm), 3 câu đúng/sai (3 điểm), 4 câu trả lời ngắn (3 điểm); làm trong 60 phút. Nội dung: Mệnh đề và tập hợp, Bất phương trình và hệ bất phương trình bậc nhất hai ẩn, Hệ thức lượng trong tam giác.',
    mc:Array.from({length:10}, (_, i) => ci => mtMc(n, i, ci)),
    tf:Array.from({length:3}, (_, i) => ci => { const q = mtTf(n, i, ci); return {stem:q.stem, items:q.items.map((it, j) => { const ok = (j + ci + i) % 2 === 0; return {text:it.t[ok ? 0 : 1], ok, sol:it.s[ok ? 0 : 1]}; })}; }),
    short:Array.from({length:4}, (_, i) => ci => { const q = mtSh(n, i, ci); return {q:q.q, ans:q.ans, sol:q.sol}; })}));
}
})();
