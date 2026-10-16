/* =====================================================================
   ĐỀ KIỂM TRA CHƯƠNG III – TOÁN 10 (Kết nối tri thức) · 45 phút · 4 mã đề (131–134)
   Chương III. Hệ thức lượng trong tam giác (Bài 5, Bài 6).
   Cấu trúc 10 điểm:
     Phần I   – 10 câu trắc nghiệm 1 đáp án × 0,5 = 5 điểm   (nhận biết – thông hiểu; 2 câu vận dụng thấp; 4 câu TN 5·7·8·10 là toán thực tế)
     Phần II  –  3 câu đúng/sai (mỗi câu 4 ý) × 1 = 3 điểm   (nhận biết → vận dụng)
     Phần III –  2 câu trả lời ngắn × 1 = 2 điểm              (vận dụng thực tế; vận dụng cao)
   Học sinh trung bình – khá làm được Phần I và các ý a–c của Phần II (≈ 7–8 điểm); toán thực tế chiếm 4/10 điểm (TN5,7,8,10 = 2đ; Đ/S 3 = 1đ; TLN1 = 1đ); học sinh giỏi làm thêm ý d và Phần III (9–10 điểm).
   Câu hỏi lấy từ ngân hàng data/lop10-chuong3-bank.js (C3B10, bộ n = 0): mỗi mã đề (ci = 0..3) một bộ số riêng, đáp án suy ra bằng phép tính.
   Link: #/lop10/kiem-tra/c3/de · …/de-132 · …/da
   ===================================================================== */
(() => {
const {mc, tf, sh} = C3B10;
KiemTra.add({
  grade:'lop10', id:'c3', title:'Kiểm tra chương III', chapter:'Chương III. Hệ thức lượng trong tam giác',
  subject:'TOÁN 10', book:'Kết nối tri thức với cuộc sống', time:45, codes:['131', '132', '133', '134'], mcPt:.5, short:true,
  levels:['Nhận biết – Thông hiểu', 'Thông hiểu – Vận dụng', 'Vận dụng – Vận dụng cao'],
  school:'TRƯỜNG THPT NGUYỄN HỮU CẢNH', group:'TỔ TOÁN', year:'2026 – 2027',
  bai:['Bài 5. Giá trị lượng giác của một góc từ 0° đến 180°', 'Bài 6. Hệ thức lượng trong tam giác'],
  mc:mc.map(f => ci => { const x = f(ci, 0); return {bai:x.bai, q:x.q, opts:x.opts}; }),
  tf:tf.map(f => ci => { const x = f(ci, 0); return {bai:x.bai, stem:x.stem, items:x.items.map(it => it.t)}; }),
  essay:sh.map(f => ({bai:f(0, 0).bai, pts:1, make:ci => { const x = f(ci, 0), ans = String(x.ans).replace('.', ','); return {de:x.q, rows:[[`${x.sol.replace(/<\/?p>/g, ' ').replace(/\s+/g, ' ')} Đáp số: <b>${ans}</b>`, 1]]}; }}))
});
})();
