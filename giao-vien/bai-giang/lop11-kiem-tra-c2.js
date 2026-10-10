/* =====================================================================
   ĐỀ KIỂM TRA CHƯƠNG II – TOÁN 11 (Kết nối tri thức) · 45 phút · 4 mã đề (121–124)
   Chương II. Dãy số. Cấp số cộng và cấp số nhân (Bài 5, 6, 7).
   Cấu trúc 10 điểm:
     Phần I   – 10 câu trắc nghiệm 1 đáp án × 0,5 = 5 điểm   (nhận biết – thông hiểu; 2 câu vận dụng thấp)
     Phần II  –  3 câu đúng/sai (mỗi câu 4 ý) × 1 = 3 điểm   (nhận biết → vận dụng)
     Phần III –  2 câu trả lời ngắn × 1 = 2 điểm              (vận dụng thực tế; vận dụng cao)
   Học sinh trung bình – khá làm được Phần I và các ý a–c của Phần II (≈ 7–8 điểm); học sinh giỏi làm thêm ý d và Phần III (9–10 điểm).
   Câu hỏi lấy từ ngân hàng data/lop11-chuong2-bank.js (C2B11, bộ n = 0): mỗi mã đề (ci = 0..3) một bộ số riêng, đáp án suy ra bằng phép tính.
   Link: #/lop11/kiem-tra/c2/de · …/de-122 · …/da
   ===================================================================== */
(() => {
const {mc, tf, sh} = C2B11;
KiemTra.add({
  grade:'lop11', id:'c2', title:'Kiểm tra chương II', chapter:'Chương II. Dãy số. Cấp số cộng và cấp số nhân',
  subject:'TOÁN 11', book:'Kết nối tri thức với cuộc sống', time:45, codes:['121', '122', '123', '124'], mcPt:.5, short:true,
  levels:['Nhận biết – Thông hiểu', 'Thông hiểu – Vận dụng', 'Vận dụng – Vận dụng cao'],
  school:'TRƯỜNG THPT NGUYỄN HỮU CẢNH', group:'TỔ TOÁN', year:'2026 – 2027',
  bai:['Bài 5. Dãy số', 'Bài 6. Cấp số cộng', 'Bài 7. Cấp số nhân'],
  mc:mc.map(f => ci => { const x = f(ci, 0); return {bai:x.bai, q:x.q, opts:x.opts}; }),
  tf:tf.map(f => ci => { const x = f(ci, 0); return {bai:x.bai, stem:x.stem, items:x.items.map(it => it.t)}; }),
  essay:sh.map(f => ({bai:f(0, 0).bai, pts:1, make:ci => { const x = f(ci, 0), ans = String(x.ans).replace('.', ','); return {de:x.q, rows:[[`${x.sol.replace(/<\/?p>/g, ' ').replace(/\s+/g, ' ')} Đáp số: <b>${ans}</b>`, 1]]}; }}))
});
})();
