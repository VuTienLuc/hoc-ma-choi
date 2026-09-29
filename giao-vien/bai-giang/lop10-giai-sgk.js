/* =====================================================================
   GIẢI BÀI TẬP SGK – LỚP 10 (Kết nối tri thức, tập 1) – chỉ chọn câu VẬN DỤNG / câu KHÓ, lời giải ngắn gọn.
   Lecture.addSgk(lớp, mã bài giảng, [trang chiếu…]) – cùng kiểu trang như bài giảng (title, kt, vd, sum).
   Nạp SAU tệp bài giảng lop10.js. Đề ghi tóm tắt, kèm số trang/số bài để thầy đối chiếu SGK.
   ===================================================================== */
(() => {
const m = tm, d = td;
const box = h => `<div class="lk-box">${h}</div>`, note = h => `<div class="lk-note">⚠️ ${h}</div>`;
const P = (x, y) => `(${x};\\,${y})`;

/* ---------- Hình (1 ô = unit đơn vị; phần bị gạch là phần KHÔNG thuộc miền nghiệm) ---------- */
const F_rap  = () => planeSVG({x:[-1,5], y:[-1,3], unit:100, lines:[[1,2,4,false,'d']], hatch:[[-1,-2,-4]], pts:[[1,1,'A'],[1.5,1.5,'B']]});
const F_goi  = () => planeSVG({x:[-1,5], y:[-1,3], unit:50,  lines:[[1,2,4,true,'d']],  hatch:[[1,2,4]],    pts:[[2,0.8,'N']]});
const F_7x20 = () => planeSVG({x:[-4,4], y:[-2,2], lines:[[7,20,0,true,'d']], hatch:[[7,20,0]], pts:[[1,1,'M']]});
const F_xe   = () => planeSVG({x:[-1,4], y:[-1,3], unit:250, lines:[[4,5,13,false,'d']], hatch:[[4,5,13]]});

Lecture.addSgk('lop10', 'bai-3', [
  {kind:'title', tag:'Toán 10 · Kết nối tri thức · Giải bài tập SGK', title:'Bài 3. Bất phương trình bậc nhất hai ẩn', sub:'Các câu vận dụng, câu khó – SGK tập 1, trang 22 – 25',
   points:['Mở đầu + HĐ2 (tr. 22 – 23): rạp chiếu phim – khi nào phải bù lỗ?', 'Vận dụng (tr. 25): cước điện thoại nội mạng, ngoại mạng.', 'Bài 2.2b (tr. 25): bờ đi qua gốc toạ độ – chọn điểm thử khác O.', 'Bài 2.3 (tr. 25): thuê ô tô trong một tuần.']},

  {kind:'kt', tag:'Nhắc nhanh', title:'Hai kĩ năng cần dùng',
   body: box(`<b>Lập bất phương trình từ bài toán thực tế:</b> gọi ẩn ${m('x, y')} (kèm điều kiện ${m('x, y \\ge 0')}) → viết biểu thức tiền/diện tích/… → dịch lời: “không quá” ${m('\\le')}, “ít hơn” ${m('\\lt')}, “tối thiểu” ${m('\\ge')}.`) +
     `<ol class="lk-steps"><li>Vẽ bờ ${m('d: ax + by = c')} (nét đứt nếu dấu ${m('\\lt, \\gt')}).</li><li>Thử một điểm <b>không nằm trên</b> ${m('d')} (thường là ${m('O')}).</li><li>Gạch bỏ nửa mặt phẳng không thoả mãn – phần còn lại là miền nghiệm.</li></ol>` +
     note(`Bờ đi qua ${m('O')} thì phải thử điểm khác, ví dụ ${m(P(1, 1))} hoặc ${m(P(0, 1))}.`)},

  {kind:'vd', tag:'SGK tr. 22 – 23 · Mở đầu + HĐ2', label:'Câu 1', de:`Vé xem phim: loại 1 (trẻ 6 – 13 tuổi) ${m('50')} nghìn đồng, loại 2 (trên 13 tuổi) ${m('100')} nghìn đồng. Để không bù lỗ, tiền vé phải đạt tối thiểu ${m('20')} triệu đồng. Gọi ${m('x, y')} là số vé loại 1, loại 2 bán được. a) Lập bất phương trình để rạp <b>không</b> bù lỗ. b) Bán ${m(P(100, 100))} vé và ${m(P(150, 150))} vé thì rạp có bù lỗ không? c) Biểu diễn miền nghiệm.`,
   sol:[`a) Tiền vé (nghìn đồng): ${m('50x + 100y \\ge 20\\,000 \\Leftrightarrow x + 2y \\ge 400')} ${m('(x, y \\in \\mathbb{N})')}.`,
     `b) ${m(P(100, 100))}: ${m('100 + 200 = 300 \\lt 400')} ⇒ thu ${m('15')} triệu, <b>bù lỗ</b>. ${m(P(150, 150))}: ${m('150 + 300 = 450 \\ge 400')} ⇒ thu ${m('22{,}5')} triệu, <b>không bù lỗ</b>.`,
     `c) Bờ ${m('d: x + 2y = 400')} (nét liền) qua ${m(P(400, 0))}, ${m(P(0, 200))}; ${m('O')} cho ${m('0 \\ge 400')} sai ⇒ gạch nửa chứa ${m('O')}.`],
   ans:`Không bù lỗ ⇔ ${tb('x + 2y \\ge 400')}; miền nghiệm: nửa mặt phẳng bờ ${m('d')} <b>không chứa</b> ${m('O')} (kể cả bờ).`, fig:F_rap(), figAt:3},

  {kind:'vd', tag:'SGK tr. 25 · Vận dụng', label:'Câu 2', de:`Cước gọi: ${m('1')} nghìn đồng/phút nội mạng, ${m('2')} nghìn đồng/phút ngoại mạng. Em có thể gọi bao nhiêu phút mỗi loại trong một tháng để tiền cước <b>ít hơn</b> ${m('200')} nghìn đồng? Biểu diễn miền nghiệm. <i>(Mở rộng: nếu đã gọi ${m('120')} phút nội mạng thì gọi ngoại mạng tối đa bao nhiêu phút nguyên?)</i>`,
   sol:[`Gọi ${m('x, y')} (phút) là thời gian gọi nội mạng, ngoại mạng; ${m('x, y \\ge 0')}. Ta có ${m('x + 2y \\lt 200')}.`,
     `Bờ ${m('d: x + 2y = 200')} (nét đứt) qua ${m(P(200, 0))}, ${m(P(0, 100))}; ${m('O')}: ${m('0 \\lt 200')} đúng ⇒ miền nghiệm là nửa mặt phẳng chứa ${m('O')}, bỏ bờ.`,
     `Ví dụ ${m(`N${P(100, 40)}`)}: ${m('100 + 80 = 180 \\lt 200')} – gọi 100 phút nội mạng, 40 phút ngoại mạng là được.`,
     `Mở rộng: ${m('120 + 2y \\lt 200 \\Leftrightarrow y \\lt 40')} ⇒ tối đa ${m('39')} phút ngoại mạng.`],
   ans:`${tb('x + 2y \\lt 200')} (${m('x, y \\ge 0')}); mở rộng: tối đa ${tb('39')} phút.`, fig:F_goi(), figAt:2},

  {kind:'vd', tag:'SGK tr. 25 · Bài 2.2b', label:'Câu 3', de:`Biểu diễn miền nghiệm của bất phương trình ${m('7x + 20y \\lt 0')} trên mặt phẳng toạ độ.`,
   sol:[`Bờ ${m('d: 7x + 20y = 0')} đi qua ${m('O')} và ${m(P(20, -7))}; vẽ nét đứt (dấu ${m('\\lt')}).`,
     `${m('O')} nằm trên ${m('d')} nên <b>không</b> dùng ${m('O')} để thử. Thử ${m(`M${P(1, 1)}`)}: ${m('7 + 20 = 27 \\lt 0')} sai.`,
     `Gạch bỏ nửa mặt phẳng chứa ${m('M')}.`],
   ans:`Miền nghiệm: nửa mặt phẳng bờ ${m('d')} <b>không chứa</b> ${m(`M${P(1, 1)}`)}, <b>bỏ</b> đường thẳng ${m('d')}.`, fig:F_7x20(), figAt:3},

  {kind:'vd', tag:'SGK tr. 25 · Bài 2.3', label:'Câu 4', de:`Ông An thuê ô tô (có lái xe) một tuần. Thứ Hai – Thứ Sáu: ${m('900')} nghìn đồng/ngày và ${m('8')} nghìn đồng/km; Thứ Bảy – Chủ nhật: ${m('1\\,500')} nghìn đồng/ngày và ${m('10')} nghìn đồng/km. Gọi ${m('x, y')} (km) là quãng đường đi trong các ngày thường và hai ngày cuối tuần. a) Viết bất phương trình để tổng tiền <b>không quá</b> ${m('14')} triệu đồng. b) Biểu diễn miền nghiệm. <i>(Mở rộng: 5 ngày đầu đi ${m('400')} km thì cuối tuần đi tối đa bao nhiêu km?)</i>`,
   sol:[`Tiền ngày thuê: ${m('5\\cdot 900 + 2\\cdot 1\\,500 = 7\\,500')} (nghìn đồng); tiền km: ${m('8x + 10y')}.`,
     `a) ${m('7\\,500 + 8x + 10y \\le 14\\,000 \\Leftrightarrow 8x + 10y \\le 6\\,500 \\Leftrightarrow 4x + 5y \\le 3\\,250')} ${m('(x, y \\ge 0)')}.`,
     `b) Bờ ${m('d: 4x + 5y = 3\\,250')} (nét liền) qua ${m(P('812{,}5', 0))}, ${m(P(0, 650))}; ${m('O')}: ${m('0 \\le 3\\,250')} đúng ⇒ miền nghiệm là nửa mặt phẳng chứa ${m('O')}, kể cả bờ.`,
     `Mở rộng: ${m('4\\cdot 400 + 5y \\le 3\\,250 \\Leftrightarrow y \\le 330')}.`],
   ans:`${tb('4x + 5y \\le 3\\,250')}; mở rộng: cuối tuần đi tối đa ${tb('330')} km.`, fig:F_xe(), figAt:3},

  {kind:'sum', tag:'Tổng kết', title:'Lỗi hay gặp khi giải các bài này',
   body:`<ul><li>Dịch sai lời: “tối thiểu” là ${m('\\ge')}; “không quá” là ${m('\\le')}; “ít hơn” là ${m('\\lt')}.</li>
     <li>Quên đổi cùng đơn vị (nghìn đồng, triệu đồng) trước khi lập bất phương trình.</li>
     <li>Bờ qua gốc ${m('O')} mà vẫn thử ${m('O')}; vẽ nét liền cho dấu ${m('\\lt, \\gt')}.</li>
     <li>Bài thực tế: nhớ điều kiện ${m('x, y \\ge 0')} (số vé, số phút… còn phải là số nguyên).</li></ul>` +
     box('Giao về nhà: Bài 2.1, 2.2a (SGK tr. 25); luyện thêm trên web <b>Học mà chơi</b> – Toán 10, Bài 3.')},
]);
})();
