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
})();
