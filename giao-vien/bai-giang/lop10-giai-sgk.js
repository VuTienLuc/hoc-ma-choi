/* =====================================================================
   GIẢI BÀI TẬP SGK – LỚP 10 (Kết nối tri thức, tập 1) – chỉ chọn câu VẬN DỤNG / câu KHÓ, lời giải từng bước có căn cứ.
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

/* =====================================================================
   BÀI 4. HỆ BẤT PHƯƠNG TRÌNH BẬC NHẤT HAI ẨN
   ===================================================================== */
(() => {
const m = tm, d = td;
const box = h => `<div class="lk-box">${h}</div>`, note = h => `<div class="lk-note">⚠️ ${h}</div>`;
const P = (x, y) => `(${x};\\,${y})`;
const sys = rows => tsys(rows);

/* Phần bị gạch là phần không thuộc miền nghiệm. */
const F_25a = () => planeSVG({x:[-1,5], y:[-4,2],
  lines:[[-1,1,-1,true,'d₁'],[1,0,0,true,'d₂'],[0,1,0,true,'d₃']],
  hatch:[[-1,1,-1],[-1,0,0],[0,1,0]], pts:[[0,-1,'A'],[1,0,'B']]});
const F_25b = () => planeSVG({x:[-1,4], y:[-1,6],
  lines:[[1,0,0,false,'Oy'],[0,1,0,false,'Ox'],[2,1,4,false,'d']],
  hatch:[[-1,0,0],[0,-1,0],[2,1,4]], pts:[[0,0,'O'],[2,0,'A'],[0,4,'B']]});
const F_25c = () => planeSVG({x:[-1,7], y:[-1,8],
  lines:[[1,0,0,false,'Oy'],[1,1,5,true,'d₁'],[1,-1,0,true,'d₂']],
  hatch:[[-1,0,0],[-1,-1,-5],[1,-1,0]], pts:[[0,5,'A'],[2.5,2.5,'B']]});
const F_mayTinh = () => planeSVG({x:[-1,6], y:[-1,5], unit:50,
  lines:[[1,1,5,false,'d₁'],[1,2,8,false,'d₂']],
  hatch:[[-1,0,0],[0,-1,0],[1,1,5],[1,2,8]],
  pts:[[0,0,'O'],[0,4,'A'],[2,3,'B'],[5,0,'C']]});
const F_thit = () => planeSVG({x:[-.1,1.8], y:[-.1,1.3],
  lines:[[4,3,4.5,false,'d₁'],[1,2,2,false,'d₂'],[1,0,1.6,false,''],[0,1,1.1,false,'']],
  hatch:[[-1,0,0],[0,-1,0],[-4,-3,-4.5],[-1,-2,-2],[1,0,1.6],[0,1,1.1]],
  pts:[[.3,1.1,'A'],[.6,.7,'B'],[1.6,.2,'C'],[1.6,1.1,'D']]});

Lecture.addSgk('lop10', 'bai-4', [
  {kind:'title', tag:'Toán 10 · Kết nối tri thức · Giải bài tập SGK', title:'Bài 4. Hệ bất phương trình bậc nhất hai ẩn', sub:'Các câu vận dụng, câu khó – SGK tập 1, trang 26 – 30',
   points:['Bài 2.5 (tr. 30): biểu diễn miền nghiệm của ba hệ.', 'Vận dụng (tr. 30): nhập máy tính để lãi lớn nhất.', 'Bài 2.6 (tr. 30): chọn lượng thịt để chi phí nhỏ nhất.']},

  {kind:'kt', tag:'Nhắc nhanh', title:'Hai bước cần nhớ',
   body: box(`<b>Miền nghiệm của hệ</b> là phần chung của các miền nghiệm.`) +
     `<ol class="lk-steps"><li>Vẽ các đường biên, gạch phần không thoả mãn; phần còn lại là miền nghiệm.</li><li>Với ${m('F=ax+by')}, tính ${m('F')} tại các đỉnh rồi chọn giá trị lớn nhất hoặc nhỏ nhất.</li></ol>` +
     note(`Dấu ${m('\\lt,\\ \\gt')}: bờ nét đứt; dấu ${m('\\le,\\ \\ge')}: bờ nét liền.`)},

  {kind:'vd', tag:'SGK tr. 30 · Bài 2.5a', label:'Câu 1a', de:`Biểu diễn miền nghiệm của hệ ${d(sys(['y - x \\lt -1','x \\gt 0','y \\lt 0']))}`,
   sol:[`Vẽ nét đứt ba bờ: ${m('d_1:y-x=-1')}, ${m('Oy')} và ${m('Ox')}.`,
     `${m('y-x\\lt-1')} cho miền dưới ${m('d_1')}; ${m('x\\gt0')} cho miền bên phải ${m('Oy')}; ${m('y\\lt0')} cho miền dưới ${m('Ox')}.`,
     `Lấy phần chung của ba miền; không lấy các đường biên vì đều là dấu chặt.`],
   ans:`Miền nghiệm là phần chung của ${tb('y \\lt x - 1,\\ x \\gt 0,\\ y \\lt 0')}; không kể các đường biên.`, fig:F_25a(), figAt:3},

  {kind:'vd', tag:'SGK tr. 30 · Bài 2.5b', label:'Câu 1b', de:`Biểu diễn miền nghiệm của hệ ${d(sys(['x \\ge 0','y \\ge 0','2x + y \\le 4']))}`,
   sol:[`${m('x\\ge0,\\ y\\ge0')} cho miền góc phần tư thứ nhất, kể cả hai trục.`,
     `Vẽ nét liền ${m('d:2x+y=4')} qua ${m('A(2;\\,0)')}, ${m('B(0;\\,4)')}; ${m('O')} thoả mãn nên chọn phía chứa ${m('O')}.`,
     `Phần chung là tam giác ${m('OAB')}, kể cả ba cạnh.`],
   ans:`Miền nghiệm là tam giác ${tb('OAB')} với ${m('O(0;\\,0),\\ A(2;\\,0),\\ B(0;\\,4)')}, kể cả biên.`, fig:F_25b(), figAt:3},

  {kind:'vd', tag:'SGK tr. 30 · Bài 2.5c', label:'Câu 1c', de:`Biểu diễn miền nghiệm của hệ ${d(sys(['x \\ge 0','x + y \\gt 5','x - y \\lt 0']))}`,
   sol:[`${m('x\\ge0')} cho miền bên phải ${m('Oy')}, kể cả trục.`,
     `Vẽ nét đứt ${m('d_1:x+y=5')} và ${m('d_2:y=x')}; chọn phía ${m('y\\gt5-x')} và ${m('y\\gt x')}.`,
     `Hai bờ cắt nhau tại ${m('B(2{,}5;\\,2{,}5)')}. Lấy phần chung phía trên hai bờ và bên phải ${m('Oy')}.`],
   ans:`Miền nghiệm là phần chung của ${tb('x \\ge 0,\\ y \\gt 5 - x,\\ y \\gt x')}.`, fig:F_25c(), figAt:3},

  {kind:'vd', tag:'SGK tr. 30 · Vận dụng', label:'Câu 2', de:`Máy A giá ${m('10')} triệu, lãi ${m('2{,}5')} triệu; máy B giá ${m('20')} triệu, lãi ${m('4')} triệu. Cửa hàng có không quá ${m('4')} tỉ đồng và nhập không quá ${m('250')} máy. Nên nhập mỗi loại bao nhiêu để lãi lớn nhất?`,
   sol:[`Gọi ${m('x,y\\in\\mathbb{N}')} là số máy A, B. Điều kiện: ${m(sys(['x\\ge0,\\ y\\ge0','x+y\\le250','x+2y\\le400']))}.`,
     `Miền nghiệm có các đỉnh ${m('O(0;\\,0),\\ A(0;\\,200),\\ B(100;\\,150),\\ C(250;\\,0)')}.`,
     `Lợi nhuận ${m('F=2{,}5x+4y')} (triệu đồng). Tại ${m('O,A,B,C')}, ta được ${m('0;\\ 800;\\ 850;\\ 625')}.`,
     `Giá trị lớn nhất là ${m('850')} tại ${m('B(100;\\,150)')}.`],
   ans:`Cửa hàng nên nhập ${tb('100\\text{ máy A và }150\\text{ máy B}')}; lợi nhuận lớn nhất ${tb('850\\text{ triệu đồng}')}.`, fig:F_mayTinh(), figAt:2},

  {kind:'vd', tag:'SGK tr. 30 · Bài 2.6', label:'Câu 3', de:`Mỗi ngày cần ít nhất ${m('900')} đơn vị protein và ${m('400')} đơn vị lipit. Một kilôgam thịt bò chứa ${m('800')} protein, ${m('200')} lipit, giá ${m('250')} nghìn đồng; thịt lợn chứa ${m('600')} protein, ${m('400')} lipit, giá ${m('160')} nghìn đồng. Mua không quá ${m('1{,}6')} kg bò và ${m('1{,}1')} kg lợn. Mua thế nào để chi phí nhỏ nhất?`,
   sol:[`Gọi ${m('x,y')} (kg) là lượng thịt bò, lợn. Hệ điều kiện: ${m(sys(['0\\le x\\le1{,}6','0\\le y\\le1{,}1','8x+6y\\ge9','x+2y\\ge2']))}.`,
     `Miền nghiệm có các đỉnh ${m('A(0{,}3;\\,1{,}1),\\ B(0{,}6;\\,0{,}7),\\ C(1{,}6;\\,0{,}2),\\ D(1{,}6;\\,1{,}1)')}.`,
     `Chi phí ${m('F=250x+160y')} (nghìn đồng). Tại ${m('A,B,C,D')}, ta được ${m('251;\\ 262;\\ 432;\\ 576')}.`,
     `Giá trị nhỏ nhất là ${m('251')} tại ${m('A(0{,}3;\\,1{,}1)')}.`],
   ans:`Gia đình nên mua ${tb('0{,}3\\text{ kg thịt bò và }1{,}1\\text{ kg thịt lợn}')}; chi phí nhỏ nhất ${tb('251\\text{ nghìn đồng}')}.`, fig:F_thit(), figAt:2},

  {kind:'sum', tag:'Tổng kết', title:'Lỗi hay gặp khi giải các bài này',
   body:`<ul><li>Vẽ sai nét biên: dấu ${m('\\lt,\\ \\gt')} phải dùng nét đứt; dấu ${m('\\le,\\ \\ge')} dùng nét liền.</li>
     <li>Chỉ biểu diễn một bất phương trình mà quên lấy <b>giao</b> tất cả các miền nghiệm.</li>
     <li>Bài thực tế quên đổi tỉ đồng sang triệu đồng hoặc quên điều kiện ${m('x, y \\ge 0')}.</li>
     <li>Tìm thiếu đỉnh, tính sai giao điểm hoặc chỉ tính hàm mục tiêu tại một vài đỉnh.</li>
     <li>Kết luận bằng toạ độ mà không đổi về số máy, số kilôgam và đơn vị tiền.</li></ul>` +
     box('Giao về nhà: Bài 2.4 (SGK tr. 30); luyện thêm trên web <b>Học mà chơi</b> – Toán 10, Bài 4.')},
]);
})();
