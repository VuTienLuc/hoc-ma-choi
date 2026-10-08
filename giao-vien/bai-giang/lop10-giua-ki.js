/* =====================================================================
   ĐỀ ÔN TẬP GIỮA HỌC KÌ I – TOÁN 10 (Kết nối tri thức) · 90 phút · 5 đề × 4 mã đề (in A4, có hình vẽ)
   Cấu trúc theo đề ôn tập giữa kì (Chương I – II – III):
     Phần I   – 12 câu trắc nghiệm 1 đáp án × 0,25 = 3 điểm
     Phần II  – 4 câu đúng/sai (mỗi câu 4 ý) × 1 = 4 điểm
     Phần III – 6 câu trả lời ngắn × 0,5 = 3 điểm
   Câu hỏi lấy từ ngân hàng data/lop10-giua-ki-bank.js (GK1), mỗi mã đề một bộ số riêng (hạt giống cố định);
   đáp án suy ra bằng phép tính trong ngân hàng. Link: #/lop10/kiem-tra/gk1/de · …/de-1101 · …/da
   ===================================================================== */
(() => {
const {PLAN, mcOf, tfOf, shOf, fmt} = GK1;
const sm = (h, w = 175) => h.replace(/<svg width="\d+"/g, `<svg width="${w}"`);       // hình nhỏ lại cho vừa trang in
for(let n = 1; n <= 5; n++){
  KiemTra.add({
    grade:'lop10', id:`gk${n}`, title:`Ôn tập giữa học kì I – Đề ${n}`, set:`Đề ${n}`, chapter:'Ôn tập giữa học kì I',
    subject:'TOÁN 10', book:'Kết nối tri thức với cuộc sống', time:90, codes:[`${n}01`, `${n}02`, `${n}03`, `${n}04`], pages:4,
    school:'TRƯỜNG THPT NGUYỄN HỮU CẢNH', group:'TỔ TOÁN', year:'2026 – 2027', short:true,
    levels:['Nhận biết – Thông hiểu', 'Thông hiểu – Vận dụng', 'Vận dụng'],
    bai:['Chương I. Mệnh đề và tập hợp', 'Chương II. Bất phương trình và hệ bất phương trình bậc nhất hai ẩn', 'Chương III. Hệ thức lượng trong tam giác'],
    mc:Array.from({length:12}, (_, i) => ci => { const x = mcOf(n, i, ci); return {bai:x.bai, q:sm(x.q), opts:x.opts}; }),
    tf:Array.from({length:4}, (_, i) => ci => { const x = tfOf(n, i, ci); return {bai:x.bai, stem:sm(x.stem), items:x.items.map(it => it.t)}; }),
    essay:Array.from({length:6}, (_, i) => ({bai:[1, 2, 3, 3, 2, 1][i], pts:.5, make:ci => { const x = shOf(n, i, ci); return {de:sm(x.q), rows:[[`${x.sol.replace(/<\/?(p|b)>/g, ' ').replace(/\s+/g, ' ')} Đáp số: <b>${fmt(x.ans)}</b>`, .5]]}; }}))
  });
}
})();
