/* =====================================================================
   ĐỀ KIỂM TRA GIỮA HỌC KÌ I – TOÁN 11 (Kết nối tri thức) · 60 phút · 4 mã đề · BỘ ĐỀ THỨ HAI (thầy yêu cầu 28/10/2026)
   Cấu trúc 10 điểm (cùng ma trận tuần 8 với bộ 711–714, đổi tỉ trọng):
     Phần I   – 10 câu trắc nghiệm 1 đáp án × 0,5  = 5 điểm   (8 câu Biết + 2 câu Hiểu)
     Phần II  –  3 câu đúng/sai (mỗi câu 4 ý) × 1  = 3 điểm   (CÂU 2 = MÔ HÌNH HOÁ cấp số cộng – cấp số nhân)
     Phần III –  2 câu trả lời ngắn × 1            = 2 điểm   (câu 1 mô hình hoá hàm số lượng giác; câu 2 vận dụng cao: đếm nghiệm)
   Không in “Bảng trả lời Phần I, II” (noGrid): mỗi mã chỉ gồm đề; đáp án – hướng dẫn chấm ở trang riêng.
   Phần I, Phần II (câu 1, 3), Phần III lấy từ ngân hàng data/lop11-giua-ki-bank.js (GK11) ở bộ n = 1 (8 phiên bản mỗi dạng,
   n = 0 là bộ 711–714) nên số liệu khác bộ đề thứ nhất. Câu 2 Phần II tạo riêng ở đây: hai phương án theo cấp số cộng và cấp số nhân.
   Đáp án đều suy ra bằng phép tính; tools/test_gk_ma_tran.js kiểm lại độc lập. Link: #/lop11/kiem-tra/gk-ma-tran-2/de · …/de-721 · …/da
   ===================================================================== */
(() => {
const {mc, tf, sh} = GK11, m = tm, N1 = 1;
const p = s => `<p>${s}</p>`, br = x => x < 0 ? `(${x})` : `${x}`;

/* ---------- Phần II, câu 2: mô hình hoá cấp số cộng – cấp số nhân ---------- */
// mỗi mã đề một tình huống: cách 1 theo cấp số cộng (a, d), cách 2 theo cấp số nhân (b, q); hỏi số hạng thứ k và tổng N số hạng đầu
const MH = [
  {who:'Lan lập kế hoạch tiết kiệm trong 8 tuần theo hai cách.', l1:'Cách 1', l2:'Cách 2', c1:'tuần đầu gửi 50 nghìn đồng, mỗi tuần sau gửi nhiều hơn tuần liền trước 20 nghìn đồng', c2:'tuần đầu gửi 10 nghìn đồng, mỗi tuần sau gửi gấp đôi tuần liền trước', a:50, d:20, b:10, q:2, k:7, N:8, noun:'số tiền gửi', unit:'nghìn đồng', per:'tuần', tot:'tổng số tiền gửi'},
  {who:'Một cửa hàng khai trương và so sánh hai phương án bán hàng trong 6 ngày đầu.', l1:'Phương án A', l2:'Phương án B', c1:'ngày đầu bán 40 sản phẩm, mỗi ngày sau bán nhiều hơn ngày liền trước 15 sản phẩm', c2:'ngày đầu bán 5 sản phẩm, mỗi ngày sau bán gấp đôi ngày liền trước', a:40, d:15, b:5, q:2, k:6, N:6, noun:'số sản phẩm bán được', unit:'sản phẩm', per:'ngày', tot:'tổng số sản phẩm bán được'},
  {who:'Một trang web so sánh hai kênh quảng cáo trong 5 ngày đầu.', l1:'Kênh A', l2:'Kênh B', c1:'ngày đầu có 200 lượt truy cập, mỗi ngày sau nhiều hơn ngày liền trước 100 lượt', c2:'ngày đầu có 25 lượt truy cập, mỗi ngày sau gấp 3 lần ngày liền trước', a:200, d:100, b:25, q:3, k:5, N:5, noun:'số lượt truy cập', unit:'lượt', per:'ngày', tot:'tổng số lượt truy cập'},
  {who:'Một nhân viên được chọn một trong hai cách nhận tiền thưởng trong 4 tháng đầu.', l1:'Cách 1', l2:'Cách 2', c1:'tháng đầu nhận 8 triệu đồng, mỗi tháng sau nhận nhiều hơn tháng liền trước 2 triệu đồng', c2:'tháng đầu nhận 2 triệu đồng, mỗi tháng sau nhận gấp đôi tháng liền trước', a:8, d:2, b:2, q:2, k:3, N:4, noun:'số tiền thưởng', unit:'triệu đồng', per:'tháng', tot:'tổng số tiền thưởng'}];
const ds2m = ci => { const v = MH[ci], {a, d, b, q, k, N, l1, l2} = v;
  const uk = a + (k - 1) * d, vk = b * q ** (k - 1), S1 = N * (2 * a + (N - 1) * d) / 2, S2 = b * (q ** N - 1) / (q - 1), D = Math.abs(S2 - S1), more = S2 > S1;
  const at = `${v.per} thứ ${k}`;
  return {bai:2, stem:`${v.who} ${l1}: ${v.c1}. ${l2}: ${v.c2}. Xét tính đúng sai của các mệnh đề sau:`, items:[
    {t:[`Theo ${l1}, ${v.noun} lập thành một cấp số cộng với công sai ${m(`d = ${d}`)}; ${v.noun} ở ${at} là ${m(uk)} ${v.unit}.`, `Theo ${l1}, ${v.noun} lập thành một cấp số cộng với công sai ${m(`d = ${d}`)}; ${v.noun} ở ${at} là ${m(a + k * d)} ${v.unit}.`],
      s:[p(`${m(`u_{${k}} = u_1 + ${k - 1}d = ${a} + ${k - 1}\\cdot ${d} = ${uk}`)}.`), p(`Sai: ${m(`u_{${k}} = u_1 + ${k - 1}d = ${uk}`)} (cộng ${m(k - 1)} lần công sai, không phải ${m(k)} lần).`)]},
    {t:[`Theo ${l1}, ${v.tot} sau ${v.N} ${v.per} là ${m(S1)} ${v.unit}.`, `Theo ${l1}, ${v.tot} sau ${v.N} ${v.per} là ${m(N * (2 * a + (N - 1) * d))} ${v.unit}.`],
      s:[p(`${m(`S_{${N}} = \\dfrac{${N}[2\\cdot ${a} + ${N - 1}\\cdot ${d}]}{2} = ${S1}`)}.`), p(`Sai: ${m(`S_{${N}} = \\dfrac{${N}(2u_1 + ${N - 1}d)}{2} = ${S1}`)}; kết quả đã nêu quên chia cho ${m('2')}.`)]},
    {t:[`Theo ${l2}, ${v.noun} lập thành một cấp số nhân với công bội ${m(`q = ${q}`)}; ${v.noun} ở ${at} là ${m(vk)} ${v.unit}.`, `Theo ${l2}, ${v.noun} lập thành một cấp số nhân với công bội ${m(`q = ${q}`)}; ${v.noun} ở ${at} là ${m(b * q ** k)} ${v.unit}.`],
      s:[p(`${m(`v_{${k}} = v_1\\cdot q^{${k - 1}} = ${b}\\cdot ${q}^{${k - 1}} = ${vk}`)}.`), p(`Sai: ${m(`v_{${k}} = v_1\\cdot q^{${k - 1}} = ${vk}`)} (số mũ của công bội là ${m(k - 1)}, không phải ${m(k)}).`)]},
    {t:[`Sau ${v.N} ${v.per}, ${v.tot} theo ${l2} ${more ? 'nhiều' : 'ít'} hơn theo ${l1} là ${m(D)} ${v.unit}.`, `Sau ${v.N} ${v.per}, ${v.tot} theo ${l2} ${more ? 'ít' : 'nhiều'} hơn theo ${l1} là ${m(D)} ${v.unit}.`],
      s:[p(`${m(`S'_{${N}} = ${b}\\cdot\\dfrac{${q}^{${N}} - 1}{${q} - 1} = ${S2}`)} và ${m(`S_{${N}} = ${S1}`)}; chênh lệch ${m(D)}, ${l2} ${more ? 'nhiều' : 'ít'} hơn.`), p(`Sai: ${m(S2)} ${more ? 'lớn' : 'nhỏ'} hơn ${m(S1)}, nên ${l2} ${more ? 'nhiều' : 'ít'} hơn chứ không phải ${more ? 'ít' : 'nhiều'} hơn.`)]}]}; };

const flat = s => s.replace(/<\/?p>/g, ' ').replace(/\s+/g, ' ');
const shOne = i => ({bai:sh[i](0, N1).bai, pts:1, make:ci => { const x = sh[i](ci, N1); return {de:x.q, rows:[[`${flat(x.sol)} Đáp số: <b>${String(x.ans).replace('.', ',')}</b>`, 1]]}; }});

KiemTra.add({
  grade:'lop11', id:'gk-ma-tran-2', title:'Kiểm tra giữa học kì I (theo ma trận tuần 8) – bộ đề thứ hai', chapter:'Giữa học kì I',
  subject:'TOÁN 11', book:'', time:60, codes:['721', '722', '723', '724'],
  school:'TRƯỜNG THPT NGUYỄN HỮU CẢNH', group:'TỔ TOÁN', year:'2026 – 2027', short:true, mcPt:.5, pages:2, spread:true, keepOrder:true, noGrid:true,
  levels:['Biết – Hiểu', 'Hiểu (giải quyết vấn đề)', 'Vận dụng (mô hình hoá)'],
  bai:['Hàm số lượng giác, phương trình lượng giác (10 tiết)', 'Dãy số, cấp số cộng, cấp số nhân (6 tiết)', 'Các số đặc trưng đo xu thế trung tâm (mẫu số liệu ghép nhóm)'],
  mc:mc.map(f => ci => { const x = f(ci, N1); return {bai:x.bai, q:x.q, opts:x.opts}; }),
  tf:[tf[0], ds2m, tf[2]].map(f => ci => { const x = f(ci, N1); return {bai:x.bai, stem:x.stem, items:x.items.map(it => it.t)}; }),
  essay:[shOne(0), shOne(1)],
  matrix:{rows:[
    ['Hàm số lượng giác, phương trình lượng giác (10 tiết)', 'Giá trị lượng giác của một góc lượng giác', 'TN-1\n(TD1.2)', '', '', '', '', '', '', '', ''],
    ['Hàm số lượng giác, phương trình lượng giác (10 tiết)', 'Công thức lượng giác', 'TN-2\n(TD1.2)', '', '', '', 'ĐS-1\n(GQ2.1)', '', '', '', ''],
    ['Hàm số lượng giác, phương trình lượng giác (10 tiết)', 'Hàm số lượng giác và đồ thị', 'TN-3\n(TD1.2)', 'TN-4\n(TD1.2)', '', '', 'ĐS-1\n(GQ2.1)', '', '', '', 'TLN-1\n(MH2.1)'],
    ['Hàm số lượng giác, phương trình lượng giác (10 tiết)', 'Phương trình lượng giác cơ bản', '', 'TN-5\n(TD2.1)', '', '', '', '', '', '', 'TLN-2\n(TH)\nVDC'],
    ['Dãy số, cấp số cộng, cấp số nhân (6 tiết)', 'Dãy số', 'TN-6\n(TD1.2)', '', '', '', '', '', '', '', ''],
    ['Dãy số, cấp số cộng, cấp số nhân (6 tiết)', 'Cấp số cộng', 'TN-7\n(TD1.2)', '', '', '', 'ĐS-2\n(MH2.1)', '', '', '', ''],
    ['Dãy số, cấp số cộng, cấp số nhân (6 tiết)', 'Cấp số nhân', 'TN-8\n(TD2.3)', '', '', '', 'ĐS-2\n(MH2.1)', '', '', '', ''],
    ['Các số đặc trưng đo xu thế trung tâm', 'Mẫu số liệu ghép nhóm', 'TN-9\n(TD1.1)', '', '', '', 'ĐS-3\n(MH2.1)', '', '', '', ''],
    ['Các số đặc trưng đo xu thế trung tâm', 'Các số đặc trưng đo xu thế trung tâm', 'TN-10\n(TD2.1)', '', '', '', '', '', '', '', '']],
    foot:[['Tổng', '08 TN', '02 TN', '', '', '03 ĐS', '', '', '', '02 TLN'], ['Tỉ lệ', '40%', '10%', '', '', '30%', '', '', '', '20%']]}
});
})();
