/* =====================================================================
   ĐỀ KIỂM TRA GIỮA HỌC KÌ I – TOÁN 11 (Kết nối tri thức) · 60 phút · 4 mã đề · THEO MA TRẬN CỦA TỔ (tuần 8)
   Cấu trúc 10 điểm (đúng ma trận “MA TRẬN ĐỀ KIỂM TRA GK 1 – LỚP 11 – 60 PHÚT”):
     Phần I   – 10 câu trắc nghiệm 1 đáp án × 0,4  = 4 điểm   (8 câu Biết + 2 câu Hiểu)
     Phần II  –  3 câu đúng/sai (mỗi câu 4 ý) × 1 = 3 điểm
     Phần III –  4 câu trả lời ngắn × 0,75         = 3 điểm   (vận dụng – mô hình hoá; câu 2 vận dụng cao)
   Nội dung: Hàm số lượng giác và phương trình lượng giác · Dãy số, cấp số cộng, cấp số nhân · Mẫu số liệu ghép nhóm
   và các số đặc trưng đo xu thế trung tâm. Câu hỏi lấy từ ngân hàng data/lop11-giua-ki-bank.js (GK11, bộ n = 0); mỗi mã đề
   (ci = 0..3) một bộ số riêng; đáp án đều suy ra bằng phép tính (tools/test_gk_ma_tran.js kiểm lại độc lập). Link: #/lop11/kiem-tra/gk-ma-tran/de · …/de-711 · …/da
   ===================================================================== */
(() => {
const {mc, tf, sh} = GK11;
KiemTra.add({
  grade:'lop11', id:'gk-ma-tran', title:'Kiểm tra giữa học kì I (theo ma trận tuần 8)', chapter:'Giữa học kì I',
  subject:'TOÁN 11', book:'', time:60, codes:['711', '712', '713', '714'],
  school:'TRƯỜNG THPT NGUYỄN HỮU CẢNH', group:'TỔ TOÁN', year:'2026 – 2027', short:true, mcPt:.4, pages:2, spread:true, keepOrder:true,
  levels:['Biết – Hiểu', 'Hiểu (giải quyết vấn đề)', 'Vận dụng (mô hình hoá)'],
  bai:['Hàm số lượng giác, phương trình lượng giác (10 tiết)', 'Dãy số, cấp số cộng, cấp số nhân (6 tiết)', 'Các số đặc trưng đo xu thế trung tâm (mẫu số liệu ghép nhóm)'],
  mc:mc.map(f => ci => { const x = f(ci, 0); return {bai:x.bai, q:x.q, opts:x.opts}; }),
  tf:tf.map(f => ci => { const x = f(ci, 0); return {bai:x.bai, stem:x.stem, items:x.items.map(it => it.t)}; }),
  essay:sh.map((f, i) => ({bai:f(0, 0).bai, pts:.75, make:ci => { const x = f(ci, 0), ans = String(x.ans).replace('.', ','); return {de:x.q, rows:[[`${x.sol.replace(/<\/?p>/g, ' ').replace(/\s+/g, ' ')} Đáp số: <b>${ans}</b>`, .75]]}; }})),
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
