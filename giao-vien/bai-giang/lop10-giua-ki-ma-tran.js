/* =====================================================================
   ĐỀ KIỂM TRA GIỮA HỌC KÌ I – TOÁN 10 (Kết nối tri thức) · 60 phút · 4 mã đề · THEO MA TRẬN CỦA TỔ (tuần 8)
   Cấu trúc 10 điểm (đúng ma trận “MA TRẬN ĐỀ KIỂM TRA GHK 1 – LỚP 10 – 60 PHÚT”):
     Phần I   – 10 câu trắc nghiệm 1 đáp án × 0,4  = 4 điểm   (8 câu Biết + 2 câu Hiểu)
     Phần II  –  3 câu đúng/sai (mỗi câu 4 ý) × 1 = 3 điểm
     Phần III –  4 câu trả lời ngắn × 0,75         = 3 điểm   (vận dụng – mô hình hoá; câu 3 vận dụng cao)
   Nội dung: Mệnh đề và tập hợp · Bất phương trình, hệ bất phương trình bậc nhất hai ẩn · Hệ thức lượng trong tam giác.
   Câu hỏi sinh từ ngân hàng data/lop10-giua-ki-bank.js (GK1) với bộ hạt giống riêng (đề số 7): mỗi mã đề một bộ số,
   đáp án suy ra bằng phép tính. Link: #/lop10/kiem-tra/gk-ma-tran/de · …/de-701 · …/da
   ===================================================================== */
(() => {
const {mtMc, mtTf, mtSh, fmt} = GK1, N = 7;
const sm = (h, w = 135) => h.replace(/<svg width="\d+"/g, `<svg width="${w}"`);
const mc = i => ci => { const x = mtMc(N, i, ci); return {bai:x.bai, q:sm(x.q), opts:x.opts}; };
const tf = i => ci => { const x = mtTf(N, i, ci); return {bai:x.bai, stem:sm(x.stem), items:x.items.map(it => it.t)}; };
const sh = i => ({bai:GK1.MT.shBai[i], pts:.75, make:ci => { const x = mtSh(N, i, ci); return {de:sm(x.q), rows:[[`${x.sol.replace(/<\/?(p|b)>/g, ' ').replace(/\s+/g, ' ')} Đáp số: <b>${fmt(x.ans)}</b>`, .75]]}; }});

KiemTra.add({
  grade:'lop10', id:'gk-ma-tran', title:'Kiểm tra giữa học kì I (theo ma trận tuần 8)', chapter:'Giữa học kì I',
  subject:'TOÁN 10', book:'', time:60, codes:['701', '702', '703', '704'],
  school:'TRƯỜNG THPT NGUYỄN HỮU CẢNH', group:'TỔ TOÁN', year:'2026 – 2027', short:true, mcPt:.4, pages:2, spread:true, keepOrder:true,
  levels:['Biết – Hiểu', 'Hiểu (giải quyết vấn đề)', 'Vận dụng (mô hình hoá)'],
  bai:['Mệnh đề và tập hợp (6 tiết)', 'Bất phương trình và hệ bất phương trình bậc nhất hai ẩn (5 tiết)', 'Hệ thức lượng trong tam giác (10 tiết)'],
  mc:Array.from({length:10}, (_, i) => mc(i)),
  tf:Array.from({length:3}, (_, i) => tf(i)),
  essay:Array.from({length:4}, (_, i) => sh(i)),
  matrix:{rows:[
    ['Mệnh đề và tập hợp (6 tiết)', 'Mệnh đề', 'TN-1,2\n(TD1.2)', '', '', '', '', '', '', '', ''],
    ['Mệnh đề và tập hợp (6 tiết)', 'Tập hợp. Các phép toán trên tập hợp', 'TN-3\n(TD1.2)', 'TN-4\n(TD2.1)', '', '', 'ĐS-1\n(GQ2.1)', '', '', '', 'TLN-1\n(MH2.1)\nTLN-2\n(TH2.1)'],
    ['Bất phương trình và hệ bất phương trình bậc nhất hai ẩn (5 tiết)', 'Bất phương trình bậc nhất hai ẩn', 'TN-5\n(TD1.2)', '', '', '', 'ĐS-2\n(MH2.1)', '', '', '', ''],
    ['Bất phương trình và hệ bất phương trình bậc nhất hai ẩn (5 tiết)', 'Hệ bất phương trình bậc nhất hai ẩn', 'TN-6\n(TD1.2)', '', '', '', 'ĐS-2\n(MH2.1)', '', '', '', 'TLN-3\n(MH2.1)\nVDC'],
    ['Hệ thức lượng trong tam giác (10 tiết)', 'Giá trị lượng giác của một góc từ 0° đến 180°', 'TN-7\n(TD1.2)', '', '', '', '', '', '', '', ''],
    ['Hệ thức lượng trong tam giác (10 tiết)', 'Hệ thức lượng trong tam giác', 'TN-8,9\n(TD1.2)', 'TN-10\n(TD1.2)', '', '', 'ĐS-3\n(GQ2.1)', '', '', '', 'TLN-4\n(MH2.1)']],
    foot:[['Tổng', '08 TN', '02 TN', '', '', '03 ĐS', '', '', '', '04 TLN'], ['Tỉ lệ', '30%', '10%', '', '', '30%', '', '', '', '30%']]}
});
})();
