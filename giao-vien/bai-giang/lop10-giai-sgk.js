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

/* =====================================================================
   ÔN TẬP CHƯƠNG II. BẤT PHƯƠNG TRÌNH VÀ HỆ BẤT PHƯƠNG TRÌNH BẬC NHẤT HAI ẨN
   ===================================================================== */
(() => {
const m = tm, d = td;
const box = h => `<div class="lk-box">${h}</div>`, note = h => `<div class="lk-note">⚠️ ${h}</div>`;
const sys = rows => tsys(rows);

/* Phần bị gạch là phần không thuộc miền nghiệm. */
const F_29 = () => planeSVG({x:[-1,5], y:[-4,2], lines:[[1,-1,3,true,'d']], hatch:[[1,-1,3]], pts:[[0,0,'O']]});
const F_212 = () => planeSVG({x:[-3,5], y:[-2,3], lines:[[-1,5,2,false,'d']], hatch:[[1,-5,-2]], pts:[[-2,0,'A'],[3,1,'B']]});
const F_213 = () => planeSVG({x:[-2,5], y:[-4,3], lines:[[1,1,1,true,'d₁'],[2,-1,3,false,'d₂']], hatch:[[1,1,1],[-2,1,-3]], pts:[[4/3,-1/3,'A']]});
const F_214 = () => planeSVG({x:[-2,6], y:[-7,5],
  lines:[[-2,1,2,false,'d₁'],[0,1,4,false,'d₂'],[1,0,5,false,'d₃'],[1,1,-1,false,'d₄']],
  hatch:[[-2,1,2],[0,1,4],[1,0,5],[-1,-1,1]], pts:[[-1,0,'A'],[1,4,'B'],[5,4,'C'],[5,-6,'D']]});
const F_215 = () => planeSVG({x:[-1,4], y:[-1,3], unit:100,
  lines:[[1,0,0,false,'Oy'],[0,1,0,false,'Ox'],[0,1,2,false,'d₁'],[4,1,12,false,'d₂']],
  hatch:[[-1,0,0],[0,-1,0],[0,1,2],[4,1,12]], pts:[[0,0,'O'],[3,0,'A'],[2.5,2,'B'],[0,2,'C']]});
const F_216 = () => planeSVG({x:[-1,21], y:[-1,5], unit:100,
  lines:[[1,0,0,false,'Oy'],[0,1,0,false,'Ox'],[1,0,9,false,'d₁'],[0,1,3.6,false,'d₂'],[1,5,20,false,'d₃']],
  hatch:[[-1,0,0],[0,-1,0],[1,0,9],[0,1,3.6],[1,5,20]], pts:[[0,0,'O'],[9,0,'A'],[9,2.2,'B'],[2,3.6,'C'],[0,3.6,'D']]});

Lecture.addSgk('lop10', 'on-tap-c2', [
  {kind:'title', tag:'Toán 10 · Kết nối tri thức · Giải bài tập SGK', title:'Ôn tập chương II', sub:'Bài tập cuối chương II – SGK tập 1, trang 31 – 32',
   points:['Trắc nghiệm: Bài 2.7 – 2.11.', 'Tự luận: Bài 2.12 – 2.16.', 'Biểu diễn miền nghiệm và giải các bài toán tối ưu thực tế.']},

  {kind:'kt', tag:'Nhắc nhanh', title:'Kiến thức cần dùng',
   body:box(`Bất phương trình bậc nhất hai ẩn có dạng ${m('ax+by\\le c')} (hoặc ${m('\\lt,\\ \\ge,\\ \\gt')}) với ${m('a,b')} không đồng thời bằng ${m('0')}. Miền nghiệm của một hệ là <b>phần chung</b> của các miền nghiệm.`) +
     `<ul><li>Dấu ${m('\\lt,\\ \\gt')}: đường biên nét đứt; dấu ${m('\\le,\\ \\ge')}: đường biên nét liền.</li><li>Với bài toán tối ưu, tìm đủ các đỉnh của miền nghiệm rồi tính hàm mục tiêu tại từng đỉnh.</li></ul>` +
     note('Mỗi lời giải dưới đây trình bày theo các dòng lập luận, không đánh số bước.')},

  {kind:'vd', tag:'SGK tr. 31 · Bài 2.7', label:'Bài 2.7',
   de:`Bất phương trình nào là bất phương trình bậc nhất hai ẩn?<br>A. ${m('x+y\\gt3')} &nbsp; B. ${m('x^2+y^2\\lt4')} &nbsp; C. ${m('(x-y)(3x+y)\\gt1')} &nbsp; D. ${m('y^3-2\\lt0')}.`,
   sol:[`Bất phương trình ở A có dạng ${m('ax+by\\gt c')} với ${m('a=b=1')}.`,
     `Các biểu thức ở B, C, D chứa số mũ hoặc tích làm xuất hiện hạng tử bậc cao.`],
   ans:`Chọn ${tb('A')}.`},

  {kind:'vd', tag:'SGK tr. 31 · Bài 2.8', label:'Bài 2.8',
   de:`Cho bất phương trình ${m('2x+y\\gt3')}. Khẳng định nào đúng?<br>A. Có nghiệm duy nhất. &nbsp; B. Vô nghiệm. &nbsp; C. Có vô số nghiệm. &nbsp; D. Có tập nghiệm ${m('[3;+\\infty)')}.`,
   sol:[`Mỗi điểm thuộc nửa mặt phẳng ${m('y\\gt3-2x')} là một nghiệm.`,
     `Nửa mặt phẳng chứa vô số điểm nên bất phương trình có vô số nghiệm.`],
   ans:`Chọn ${tb('C')}.`},

  {kind:'vd', tag:'SGK tr. 31 · Bài 2.9', label:'Bài 2.9', fig:F_29(), figAt:2,
   de:`Chọn hình biểu diễn miền nghiệm của bất phương trình ${m('x-y\\lt3')}.`,
   sol:[`Ta có ${m('x-y\\lt3\\Leftrightarrow y\\gt x-3')}. Đường biên ${m('y=x-3')} đi qua ${m('(0;-3)')} và ${m('(3;0)')}, vẽ nét đứt.`,
     `Điểm ${m('O(0;0)')} thoả mãn ${m('0\\lt3')}, vì vậy miền nghiệm là nửa mặt phẳng chứa ${m('O')}.`],
   ans:`Chọn ${tb('C')}.`},

  {kind:'vd', tag:'SGK tr. 31 · Bài 2.10', label:'Bài 2.10',
   de:`Hệ nào là hệ bất phương trình bậc nhất hai ẩn?<br>A. ${m(sys(['x-y\\lt0','2y\\ge0']))} &nbsp; B. ${m(sys(['3x+y^3\\lt0','x+y\\gt3']))}<br>C. ${m(sys(['x+2y\\lt0','y^2+3\\lt0']))} &nbsp; D. ${m(sys(['-x^3+y\\lt4','x+2y\\lt1']))}.`,
   sol:[`Hệ A gồm hai bất phương trình đều có bậc nhất theo ${m('x,y')}.`,
     `Các hệ B, C, D lần lượt chứa ${m('y^3')}, ${m('y^2')}, ${m('x^3')}, nên không thoả mãn định nghĩa.`],
   ans:`Chọn ${tb('A')}.`},

  {kind:'vd', tag:'SGK tr. 32 · Bài 2.11', label:'Bài 2.11',
   de:`Điểm nào thuộc miền nghiệm của hệ ${d(sys(['x-y\\lt-3','2y\\ge-4']))}?<br>A. ${m('(0;0)')} &nbsp; B. ${m('(-2;1)')} &nbsp; C. ${m('(3;-1)')} &nbsp; D. ${m('(-3;1)')}.`,
   sol:[`Thử ${m('(-3;1)')}: ${m('-3-1=-4\\lt-3')} và ${m('2\\cdot1=2\\ge-4')}.`,
     `Điểm ${m('(-3;1)')} thoả mãn đồng thời cả hai bất phương trình; các điểm còn lại không thoả bất phương trình thứ nhất.`],
   ans:`Chọn ${tb('D')}.`},

  {kind:'vd', tag:'SGK tr. 32 · Bài 2.12', label:'Bài 2.12', fig:F_212(), figAt:3,
   de:`Biểu diễn miền nghiệm của bất phương trình ${m('\\dfrac{x+y}{2}\\ge\\dfrac{2x-y+1}{3}')}.`,
   sol:[`Nhân hai vế với ${m('6\\gt0')}: ${m('3(x+y)\\ge2(2x-y+1)')}.`,
     `Thu gọn được ${m('-x+5y\\ge2')}, hay ${m('y\\ge\\dfrac{x+2}{5}')}.`,
     `Đường biên ${m('d:-x+5y=2')} đi qua ${m('A(-2;0)')} và ${m('B(3;1)')}; vẽ nét liền. ${m('O')} không thoả mãn nên chọn nửa mặt phẳng không chứa ${m('O')}.`],
   ans:`Miền nghiệm là nửa mặt phẳng ${tb('-x+5y\\ge2')}, kể cả đường biên.`},

  {kind:'vd', tag:'SGK tr. 32 · Bài 2.13', label:'Bài 2.13', fig:F_213(), figAt:3,
   de:`Biểu diễn miền nghiệm của hệ ${d(sys(['x+y\\lt1','2x-y\\ge3']))}.`,
   sol:[`Bất phương trình thứ nhất cho ${m('y\\lt1-x')}; đường biên ${m('d_1:x+y=1')} vẽ nét đứt.`,
     `Bất phương trình thứ hai cho ${m('y\\le2x-3')}; đường biên ${m('d_2:2x-y=3')} vẽ nét liền.`,
     `Hai đường biên cắt nhau tại ${m('A\\left(\\dfrac43;-\\dfrac13\\right)')}. Miền nghiệm là phần chung nằm phía dưới cả hai đường.`],
   ans:`Miền nghiệm là phần chung của ${tb('y\\lt1-x')} và ${tb('y\\le2x-3')}.`},

  {kind:'vd', tag:'SGK tr. 32 · Bài 2.14', label:'Bài 2.14', fig:F_214(), figAt:3,
   de:`Biểu diễn miền nghiệm của hệ ${d(sys(['y-2x\\le2','y\\le4','x\\le5','x+y\\ge-1']))}. Tìm GTLN và GTNN của ${m('F(x,y)=-x-y')}.`,
   sol:[`Bốn đường biên tạo miền nghiệm là tứ giác ${m('ABCD')} với ${m('A(-1;0),\\ B(1;4),\\ C(5;4),\\ D(5;-6)')}.`,
     `Tại các đỉnh: ${m('F(A)=1,\\ F(B)=-5,\\ F(C)=-9,\\ F(D)=1')}.`,
     `Trên cạnh ${m('AD')}, ta có ${m('x+y=-1')} nên ${m('F=1')}; do đó giá trị lớn nhất đạt tại mọi điểm của cạnh ${m('AD')}.`],
   ans:`${tb('F_{\\max}=1')} trên đoạn ${m('AD')}; ${tb('F_{\\min}=-9')} tại ${m('C(5;4)')}.`},

  {kind:'vd', tag:'SGK tr. 32 · Bài 2.15', label:'Bài 2.15', fig:F_215(), figAt:3,
   de:`Bác An đầu tư ${m('1{,}2')} tỉ đồng vào trái phiếu chính phủ (lãi ${m('7\\%')}), ngân hàng (${m('8\\%')}) và doanh nghiệp (${m('12\\%')}). Tiền trái phiếu chính phủ ít nhất gấp ${m('3')} lần tiền trái phiếu ngân hàng; tiền trái phiếu doanh nghiệp không quá ${m('200')} triệu đồng. Phân bổ thế nào để lợi nhuận sau một năm lớn nhất?`,
   sol:[`Gọi ${m('x,y,z')} (triệu đồng) lần lượt là tiền đầu tư vào trái phiếu chính phủ, ngân hàng và doanh nghiệp. Ta có ${m('x+y+z=1\\,200')}, ${m('x\\ge3y')}, ${m('0\\le z\\le200')}.`,
     `Thay ${m('x=1\\,200-y-z')}, điều kiện còn lại là ${m('y\\ge0,\\ 0\\le z\\le200,\\ 4y+z\\le1\\,200')}. Các đỉnh của miền nghiệm theo ${m('(y,z)')} là ${m('(0;0),(300;0),(250;200),(0;200)')}.`,
     `Lợi nhuận ${m('L=0{,}07x+0{,}08y+0{,}12z=84+0{,}01y+0{,}05z')} (triệu đồng). Giá trị tại các đỉnh lần lượt là ${m('84;\\ 87;\\ 96{,}5;\\ 94')}.`,
     `Lợi nhuận lớn nhất tại ${m('(y,z)=(250;200)')}; khi đó ${m('x=1\\,200-250-200=750')}.`],
   ans:`Đầu tư ${tb('750\\text{ triệu}')} vào trái phiếu chính phủ, ${tb('250\\text{ triệu}')} vào trái phiếu ngân hàng và ${tb('200\\text{ triệu}')} vào trái phiếu doanh nghiệp; lợi nhuận lớn nhất ${tb('96{,}5\\text{ triệu đồng}')}.`},

  {kind:'vd', tag:'SGK tr. 32 · Bài 2.16', label:'Bài 2.16', fig:F_216(), figAt:3,
   de:`Công ty có tối đa ${m('160')} triệu đồng để quảng cáo. Phát thanh giá ${m('80')} nghìn đồng/giây, nhận tối đa ${m('900')} giây; truyền hình giá ${m('400')} nghìn đồng/giây, nhận tối đa ${m('360')} giây và hiệu quả gấp ${m('8')} lần phát thanh. Chọn thời lượng thế nào để hiệu quả lớn nhất?`,
   sol:[`Gọi ${m('x,y')} (giây) là thời lượng quảng cáo trên phát thanh và truyền hình. Điều kiện: ${m(sys(['0\\le x\\le900','0\\le y\\le360','80x+400y\\le160\\,000']))}, hay ${m('x+5y\\le2\\,000')}.`,
     `Miền nghiệm có các đỉnh ${m('O(0;0),\\ A(900;0),\\ B(900;220),\\ C(200;360),\\ D(0;360)')}.`,
     `Hiệu quả ${m('F=x+8y')}. Tại ${m('O,A,B,C,D')}, ta được ${m('0;\\ 900;\\ 2\\,660;\\ 3\\,080;\\ 2\\,880')}.`,
     `Giá trị lớn nhất là ${m('3\\,080')} tại ${m('C(200;360)')}. Chi phí khi đó là ${m('80\\cdot200+400\\cdot360=160\\,000')} nghìn đồng.`],
   ans:`Quảng cáo ${tb('200\\text{ giây trên phát thanh}')} và ${tb('360\\text{ giây trên truyền hình}')}.`},

  {kind:'sum', tag:'Tổng kết', title:'Đáp án và lỗi cần tránh',
   body:`<ul><li>Trắc nghiệm: ${m('2.7A;\\ 2.8C;\\ 2.9C;\\ 2.10A;\\ 2.11D')}.</li>
     <li>Vẽ đúng nét biên và chỉ lấy phần chung của tất cả các miền nghiệm.</li>
     <li>Khi hàm mục tiêu có cùng giá trị trên cả một cạnh, GTLN hoặc GTNN đạt tại <b>mọi điểm</b> của cạnh đó (Bài 2.14).</li>
     <li>Bài toán thực tế phải đổi cùng đơn vị, tìm đủ các đỉnh và kết luận bằng đơn vị của đề bài.</li></ul>` +
     box('Luyện thêm: web <b>Học mà chơi</b> – Toán 10, Ôn tập chương II.')},
]);
})();

/* =====================================================================
   CHƯƠNG III. BÀI 5. GIÁ TRỊ LƯỢNG GIÁC CỦA MỘT GÓC TỪ 0° ĐẾN 180° – SGK tập 1, trang 37 (Bài 3.1 – 3.4)
   Đề ghi theo bản tra cứu; thầy đối chiếu lại câu chữ với SGK in. Mở rộng ở Bài 3.4 do người soạn thêm.
   ===================================================================== */
(() => {
const m = tm, d = td;
const box = h => `<div class="lk-box">${h}</div>`, note = h => `<div class="lk-note">⚠️ ${h}</div>`;
const R2 = '\\dfrac{\\sqrt{2}}{2}', T3 = '\\dfrac{\\sqrt{3}}{3}', H = '\\dfrac{1}{2}';

Lecture.addSgk('lop10', 'bai-5', [
  {kind:'title', tag:'Toán 10 · Kết nối tri thức · Giải bài tập SGK', title:'Bài 5. Giá trị lượng giác của một góc từ 0° đến 180°', sub:'Các câu vận dụng, câu khó – SGK tập 1, trang 37 (Bài 3.1 – 3.4)',
   points:['Bài 3.1 (tr. 37): tính giá trị biểu thức với góc đặc biệt và góc bù nhau.', 'Bài 3.2 (tr. 37): rút gọn biểu thức bằng quan hệ hai góc bù nhau.',
     'Bài 3.3 (tr. 37): chứng minh ba hệ thức lượng giác cơ bản.', 'Bài 3.4 (tr. 37): biết ' + m('\\tan\\alpha') + ', tính giá trị biểu thức bằng cách chia cả tử và mẫu.']},

  {kind:'kt', tag:'Nhắc nhanh', title:'Ba kĩ năng cần dùng',
   body: box(`<b>Góc bù nhau:</b> ${m('\\sin(180^\\circ - \\alpha) = \\sin\\alpha')}; ${m('\\cos,\\ \\tan,\\ \\cot')} của góc bù thì <b>đổi dấu</b>.`) +
     `<ol class="lk-steps"><li>Đưa góc tù về góc nhọn bù với nó, rồi tra bảng giá trị đặc biệt.</li><li>Biểu thức có ${m('\\sin\\alpha,\\ \\cos\\alpha')} cùng bậc và biết ${m('\\tan\\alpha')}: chia cả tử và mẫu cho ${m('\\cos\\alpha')} (hoặc ${m('\\cos^2\\alpha')}).</li><li>Chứng minh: dùng ${m('\\sin^2\\alpha + \\cos^2\\alpha = 1')} rồi chia hai vế.</li></ol>` +
     note(`Cẩn thận dấu khi nhân hai nhóm số có căn; viết từng giá trị ra trước rồi mới nhân.`)},

  {kind:'vd', tag:'SGK tr. 37 · Bài 3.1a', label:'Bài 3.1a', de:`Không dùng máy tính, tính giá trị biểu thức ${d('A = (2\\sin 30^\\circ + \\cos 135^\\circ - 3\\tan 150^\\circ)\\cdot(\\cos 180^\\circ - \\cot 60^\\circ)')}`,
   sol:[`${m(`\\sin 30^\\circ = ${H}`)}; ${m(`\\cos 135^\\circ = -${R2}`)}; ${m(`\\tan 150^\\circ = -${T3}`)}; ${m('\\cos 180^\\circ = -1')}; ${m(`\\cot 60^\\circ = ${T3}`)}.`,
     `Thừa số thứ nhất: ${m(`2\\cdot ${H} - ${R2} - 3\\cdot\\left(-${T3}\\right) = 1 - ${R2} + \\sqrt{3}`)}.`,
     `Thừa số thứ hai: ${m(`-1 - ${T3}`)}.`,
     `${m(`A = -\\left(1 - ${R2} + \\sqrt{3}\\right)\\left(1 + ${T3}\\right) = -\\left(2 + \\dfrac{4\\sqrt{3}}{3} - ${R2} - \\dfrac{\\sqrt{6}}{6}\\right)`)}.`],
   ans:`${tb('A = -\\dfrac{12 + 8\\sqrt{3} - 3\\sqrt{2} - \\sqrt{6}}{6}')}.`},

  {kind:'vd', tag:'SGK tr. 37 · Bài 3.1b, c', label:'Bài 3.1b, c', de:`Tính: b) ${m('B = \\sin^2 90^\\circ + \\cos^2 120^\\circ + \\cos^2 0^\\circ - \\tan^2 60^\\circ + \\cot^2 135^\\circ')}; &nbsp; c) ${m('C = \\cos 60^\\circ\\cdot\\sin 30^\\circ + \\cos^2 30^\\circ')}.`,
   sol:[`b) ${m('\\sin 90^\\circ = 1')}; ${m(`\\cos 120^\\circ = -${H}`)} nên ${m('\\cos^2 120^\\circ = \\dfrac{1}{4}')}; ${m('\\cos 0^\\circ = 1')}; ${m('\\tan^2 60^\\circ = 3')}; ${m('\\cot 135^\\circ = -1')} nên ${m('\\cot^2 135^\\circ = 1')}.`,
     `${m('B = 1 + \\dfrac{1}{4} + 1 - 3 + 1 = \\dfrac{1}{4}')}.`,
     `c) ${m(`C = ${H}\\cdot ${H} + \\left(\\dfrac{\\sqrt{3}}{2}\\right)^2 = \\dfrac{1}{4} + \\dfrac{3}{4}`)}.`],
   ans:`${tb('B = \\dfrac{1}{4}')}; &nbsp; ${tb('C = 1')}.`},

  {kind:'vd', tag:'SGK tr. 37 · Bài 3.2', label:'Bài 3.2', de:`Đơn giản các biểu thức: a) ${m('\\sin 100^\\circ + \\sin 80^\\circ + \\cos 16^\\circ + \\cos 164^\\circ')}; &nbsp; b) ${m('2\\sin(180^\\circ - \\alpha)\\cot\\alpha - \\cos(180^\\circ - \\alpha)\\tan\\alpha\\cot(180^\\circ - \\alpha)')} (với ${m('0^\\circ \\lt \\alpha \\lt 90^\\circ')}).`,
   sol:[`a) ${m('100^\\circ + 80^\\circ = 180^\\circ')} nên ${m('\\sin 100^\\circ = \\sin 80^\\circ')}; ${m('16^\\circ + 164^\\circ = 180^\\circ')} nên ${m('\\cos 164^\\circ = -\\cos 16^\\circ')}. Biểu thức bằng ${m('2\\sin 80^\\circ')}.`,
     `b) ${m('\\sin(180^\\circ - \\alpha) = \\sin\\alpha')}; ${m('\\cos(180^\\circ - \\alpha) = -\\cos\\alpha')}; ${m('\\cot(180^\\circ - \\alpha) = -\\cot\\alpha')}.`,
     `${m('2\\sin\\alpha\\cdot\\dfrac{\\cos\\alpha}{\\sin\\alpha} - (-\\cos\\alpha)\\cdot\\tan\\alpha\\cdot(-\\cot\\alpha) = 2\\cos\\alpha - \\cos\\alpha\\cdot(\\tan\\alpha\\cot\\alpha)')}.`,
     `Vì ${m('\\tan\\alpha\\cot\\alpha = 1')} nên biểu thức bằng ${m('2\\cos\\alpha - \\cos\\alpha')}.`],
   ans:`a) ${tb('2\\sin 80^\\circ')}; &nbsp; b) ${tb('\\cos\\alpha')}.`},

  {kind:'vd', tag:'SGK tr. 37 · Bài 3.3', label:'Bài 3.3', fig:halfCircleSVG(135), figAt:1, de:`Chứng minh các hệ thức: a) ${m('\\sin^2\\alpha + \\cos^2\\alpha = 1')}; b) ${m('1 + \\tan^2\\alpha = \\dfrac{1}{\\cos^2\\alpha}')} (${m('\\alpha \\ne 90^\\circ')}); c) ${m('1 + \\cot^2\\alpha = \\dfrac{1}{\\sin^2\\alpha}')} (${m('0^\\circ \\lt \\alpha \\lt 180^\\circ')}).`,
   sol:[`a) Lấy ${m('M(x_0;\\,y_0)')} trên nửa đường tròn đơn vị với ${m('\\widehat{xOM} = \\alpha')}: ${m('x_0 = \\cos\\alpha,\\ y_0 = \\sin\\alpha')}. Vì ${m('OM = 1')} nên ${m('x_0^2 + y_0^2 = 1')}, tức là ${m('\\sin^2\\alpha + \\cos^2\\alpha = 1')}.`,
     `b) ${m('\\alpha \\ne 90^\\circ')} nên ${m('\\cos\\alpha \\ne 0')}. Chia hai vế của hệ thức a) cho ${m('\\cos^2\\alpha')}: ${m('\\tan^2\\alpha + 1 = \\dfrac{1}{\\cos^2\\alpha}')}.`,
     `c) ${m('\\sin\\alpha \\ne 0')} khi ${m('0^\\circ \\lt \\alpha \\lt 180^\\circ')}. Chia hai vế của hệ thức a) cho ${m('\\sin^2\\alpha')}: ${m('1 + \\cot^2\\alpha = \\dfrac{1}{\\sin^2\\alpha}')}.`],
   ans:`Cả ba hệ thức được chứng minh.`},

  {kind:'vd', tag:'SGK tr. 37 · Bài 3.4', label:'Bài 3.4', de:`Cho góc ${m('\\alpha')} (${m('0^\\circ \\lt \\alpha \\lt 180^\\circ')}) với ${m('\\tan\\alpha = 3')}. Tính ${m('P = \\dfrac{2\\sin\\alpha - 3\\cos\\alpha}{3\\sin\\alpha + 2\\cos\\alpha}')}. <i>(Mở rộng: tính ${m('\\sin^2\\alpha')} và ${m('\\sin\\alpha\\cos\\alpha')}.)</i>`,
   sol:[`${m('\\tan\\alpha = 3')} xác định nên ${m('\\cos\\alpha \\ne 0')}: chia cả tử và mẫu cho ${m('\\cos\\alpha')}.`,
     `${m('P = \\dfrac{2\\tan\\alpha - 3}{3\\tan\\alpha + 2} = \\dfrac{2\\cdot 3 - 3}{3\\cdot 3 + 2} = \\dfrac{3}{11}')}.`,
     `Mở rộng: ${m('\\cos^2\\alpha = \\dfrac{1}{1 + \\tan^2\\alpha} = \\dfrac{1}{10}')} nên ${m('\\sin^2\\alpha = 1 - \\dfrac{1}{10} = \\dfrac{9}{10}')}; ${m('\\tan\\alpha \\gt 0')} nên ${m('\\cos\\alpha \\gt 0')} và ${m('\\sin\\alpha\\cos\\alpha = \\tan\\alpha\\cdot\\cos^2\\alpha = \\dfrac{3}{10}')}.`],
   ans:`${tb('P = \\dfrac{3}{11}')}; mở rộng: ${tb('\\sin^2\\alpha = \\dfrac{9}{10},\\ \\sin\\alpha\\cos\\alpha = \\dfrac{3}{10}')}.`},

  {kind:'sum', tag:'Tổng kết', title:'Lỗi hay gặp',
   body:`<ul><li>Quên đổi dấu ${m('\\cos,\\ \\tan,\\ \\cot')} khi chuyển sang góc bù (chỉ ${m('\\sin')} giữ nguyên).</li><li>Khi khai căn từ ${m('\\sin^2\\alpha,\\ \\cos^2\\alpha')}, quên xét dấu theo loại góc.</li><li>Chia tử và mẫu cho ${m('\\cos\\alpha')} mà quên chia hạng tử tự do (không có ${m('\\cos\\alpha')}).</li></ul>` +
     box('Giao về nhà: các bài còn lại cuối Bài 5 (SGK tr. 37); luyện thêm trên web <b>Học mà chơi</b> – Toán 10, Bài 5.')},
]);
})();

/* =====================================================================
   GIẢI BÀI TẬP SGK – Toán 10 · Bài 6. Hệ thức lượng trong tam giác (SGK tập 1: Luyện tập 4 tr. 41; Bài 3.5 – 3.7 tr. 42)
   ===================================================================== */
(() => {
const m = tm;
const box = h => `<div class="lk-box">${h}</div>`, note = h => `<div class="lk-note">⚠️ ${h}</div>`;

Lecture.addSgk('lop10', 'bai-6', [
  {kind:'title', tag:'Toán 10 · Kết nối tri thức · Giải bài tập SGK', title:'Bài 6. Hệ thức lượng trong tam giác', sub:'Các câu vận dụng – SGK tập 1, trang 41 – 43',
   points:['Luyện tập 4 (tr. 41): biết một cạnh và hai góc, tính diện tích bằng định lí sin.', 'Bài 3.5 (tr. 42): biết ba cạnh, tính ' + m('\\cos A') + ', diện tích ' + m('S') + ' và bán kính nội tiếp ' + m('r') + '.',
     'Bài 3.6 (tr. 42): biết một cạnh và hai góc, tính ' + m('R, b, c') + '.', 'Bài 3.7 (tr. 42): giải tam giác và tính diện tích khi biết hai góc và một cạnh.', 'Bài 3.8 – 3.10 (tr. 42 – 43): bài toán thực tế – tàu đánh cá, cột ăng-ten, bề rộng hòn đảo.']},

  {kind:'kt', tag:'Nhắc nhanh', title:'Chọn công thức theo dữ kiện',
   body: box(`<b>Biết ba cạnh:</b> dùng ${m('\\cos A = \\dfrac{b^2 + c^2 - a^2}{2bc}')}, công thức Heron hoặc ${m('S = \\dfrac{1}{2}bc\\sin A')}; sau đó ${m('r = \\dfrac{S}{p}')}, ${m('R = \\dfrac{abc}{4S}')}.`) +
     `<ol class="lk-steps"><li>Biết hai góc: tính góc còn lại bằng ${m('A + B + C = 180^\\circ')}.</li><li>Biết một cạnh và hai góc: định lí sin ${m('\\dfrac{a}{\\sin A} = \\dfrac{b}{\\sin B} = \\dfrac{c}{\\sin C} = 2R')}.</li><li>Có hai cạnh và góc xen giữa: ${m('S = \\dfrac{1}{2}bc\\sin A')}.</li></ol>` +
     note(`Đề SGK yêu cầu kết quả gần đúng thì làm tròn ở bước cuối; các bước giữa nên giữ dạng căn hoặc nhiều chữ số thập phân.`)},

  {kind:'vd', tag:'SGK tr. 41 · Luyện tập 4', label:'Luyện tập 4', de:`Tính diện tích tam giác ${m('ABC')} có ${m('b = 2,\\ \\widehat{B} = 30^\\circ,\\ \\widehat{C} = 45^\\circ')}.`,
   sol:[`${m('\\widehat{A} = 180^\\circ - 30^\\circ - 45^\\circ = 105^\\circ')}.`, `Định lí sin: ${m('\\dfrac{c}{\\sin C} = \\dfrac{b}{\\sin B}')}, nên ${m('c = \\dfrac{2\\sin 45^\\circ}{\\sin 30^\\circ} = \\dfrac{2\\cdot\\frac{\\sqrt{2}}{2}}{\\frac{1}{2}} = 2\\sqrt{2}')}.`,
     `${m('\\sin 105^\\circ = \\sin 75^\\circ = \\dfrac{\\sqrt{6} + \\sqrt{2}}{4}')}.`, `${m('S = \\dfrac{1}{2}bc\\sin A = \\dfrac{1}{2}\\cdot 2\\cdot 2\\sqrt{2}\\cdot\\dfrac{\\sqrt{6} + \\sqrt{2}}{4} = \\dfrac{\\sqrt{12} + 2}{2} = \\sqrt{3} + 1')}.`],
   ans:`${tb('S = 1 + \\sqrt{3}')} (đơn vị diện tích).`},

  {kind:'vd', tag:'SGK tr. 42 · Bài 3.5', label:'Bài 3.5', fig:triSVG({a:6,b:5,c:8,la:'6',lb:'5',lc:'8',gA:'A'}), figAt:1, de:`Cho tam giác ${m('ABC')} có ${m('a = 6,\\ b = 5,\\ c = 8')}. Tính ${m('\\cos A')}, diện tích ${m('S')} và bán kính đường tròn nội tiếp ${m('r')}.`,
   sol:[`Hệ quả định lí côsin: ${m('\\cos A = \\dfrac{b^2 + c^2 - a^2}{2bc} = \\dfrac{25 + 64 - 36}{2\\cdot 5\\cdot 8} = \\dfrac{53}{80}')}.`,
     `${m('\\sin A \\gt 0')} nên ${m('\\sin A = \\sqrt{1 - \\left(\\dfrac{53}{80}\\right)^2} = \\dfrac{\\sqrt{3\\,591}}{80} = \\dfrac{3\\sqrt{399}}{80}')}.`,
     `${m('S = \\dfrac{1}{2}bc\\sin A = \\dfrac{1}{2}\\cdot 5\\cdot 8\\cdot\\dfrac{3\\sqrt{399}}{80} = \\dfrac{3\\sqrt{399}}{4} \\approx 14{,}98')}. (Kiểm tra bằng Heron: ${m('p = 9{,}5')}, ${m('S = \\sqrt{9{,}5\\cdot 3{,}5\\cdot 4{,}5\\cdot 1{,}5} \\approx 14{,}98')}.)`,
     `${m('r = \\dfrac{S}{p} = \\dfrac{14{,}98}{9{,}5} \\approx 1{,}58')}.`],
   ans:`${tb('\\cos A = \\dfrac{53}{80}')}; &nbsp; ${tb('S = \\dfrac{3\\sqrt{399}}{4} \\approx 14{,}98')}; &nbsp; ${tb('r \\approx 1{,}58')}.`},

  {kind:'vd', tag:'SGK tr. 42 · Bài 3.6', label:'Bài 3.6', de:`Cho tam giác ${m('ABC')} có ${m('a = 10,\\ \\widehat{A} = 45^\\circ,\\ \\widehat{B} = 70^\\circ')}. Tính ${m('R,\\ b,\\ c')}.`,
   sol:[`${m('\\widehat{C} = 180^\\circ - 45^\\circ - 70^\\circ = 65^\\circ')}.`, `Định lí sin: ${m('2R = \\dfrac{a}{\\sin A} = \\dfrac{10}{\\sin 45^\\circ} = 10\\sqrt{2}')}, nên ${m('R = 5\\sqrt{2} \\approx 7{,}07')}.`,
     `${m('b = 2R\\sin B = 10\\sqrt{2}\\cdot\\sin 70^\\circ \\approx 13{,}29')}.`, `${m('c = 2R\\sin C = 10\\sqrt{2}\\cdot\\sin 65^\\circ \\approx 12{,}82')}.`],
   ans:`${tb('R = 5\\sqrt{2} \\approx 7{,}07')}; &nbsp; ${tb('b \\approx 13{,}29')}; &nbsp; ${tb('c \\approx 12{,}82')}.`},

  {kind:'vd', tag:'SGK tr. 42 · Bài 3.7', label:'Bài 3.7', de:`Giải tam giác ${m('ABC')} và tính diện tích tam giác đó, biết ${m('\\widehat{A} = 15^\\circ,\\ \\widehat{B} = 130^\\circ,\\ c = 6')}.`,
   sol:[`${m('\\widehat{C} = 180^\\circ - 15^\\circ - 130^\\circ = 35^\\circ')}.`, `Định lí sin: ${m('\\dfrac{a}{\\sin A} = \\dfrac{b}{\\sin B} = \\dfrac{c}{\\sin C} = \\dfrac{6}{\\sin 35^\\circ} \\approx 10{,}46')}.`,
     `${m('a = 10{,}46\\cdot\\sin 15^\\circ \\approx 2{,}71')}; &nbsp; ${m('b = 10{,}46\\cdot\\sin 130^\\circ \\approx 8{,}01')}.`, `${m('S = \\dfrac{1}{2}ca\\sin B = \\dfrac{1}{2}\\cdot 6\\cdot 2{,}71\\cdot\\sin 130^\\circ \\approx 6{,}22')}.`],
   ans:`${tb('\\widehat{C} = 35^\\circ,\\ a \\approx 2{,}71,\\ b \\approx 8{,}01')}; &nbsp; ${tb('S \\approx 6{,}22')}.`},

  {kind:'vd', tag:'SGK tr. 42 · Bài 3.8', label:'Bài 3.8', de:`Tàu đánh cá rời cảng ${m('A')} theo hướng ${m('S70^\\circ E')} với vận tốc ${m('70')} km/h. Sau 90 phút động cơ hỏng, tàu trôi theo hướng nam với vận tốc ${m('8')} km/h. Sau 2 giờ nữa tàu neo ở đảo ${m('C')}. Tính khoảng cách ${m('AC')} và hướng từ ${m('A')} đến ${m('C')}.`,
   sol:[`Đoạn đầu: ${m('AB = 70\\cdot 1{,}5 = 105')} km. Đoạn trôi: ${m('BC = 8\\cdot 2 = 16')} km.`,
     `Đường thẳng đứng (hướng nam–bắc) tại ${m('B')} tạo với ${m('BA')} một góc ${m('70^\\circ')} nên ${m('\\widehat{ABC} = 180^\\circ - 70^\\circ = 110^\\circ')}.`,
     `${m('AC^2 = 105^2 + 16^2 - 2\\cdot 105\\cdot 16\\cos 110^\\circ \\approx 12\\,430{,}2')} ⇒ ${m('AC \\approx 111{,}5')} km.`,
     `${m('\\sin\\widehat{CAB} = \\dfrac{BC\\sin 110^\\circ}{AC} \\approx 0{,}135')} ⇒ ${m('\\widehat{CAB} \\approx 7{,}8^\\circ')}. Đảo nằm gần hướng nam hơn: ${m('70^\\circ - 7{,}8^\\circ \\approx 62{,}2^\\circ')}.`],
   ans:`${tb('AC \\approx 111{,}5')} km, hướng ${tb('S62{,}2^\\circ E')} (xấp xỉ). <i>Đề tóm tắt theo SGK – thầy đối chiếu số liệu với sách.</i>`},

  {kind:'vd', tag:'SGK tr. 43 · Bài 3.9', label:'Bài 3.9', de:`Trên nóc tòa nhà có cột ăng-ten cao ${m('5')} m. Từ vị trí quan sát ${m('A')} cao ${m('7')} m so với mặt đất, nhìn thấy đỉnh ${m('B')} và chân ${m('C')} của cột với các góc ${m('50^\\circ')} và ${m('40^\\circ')} so với phương nằm ngang. a) Tính các góc của tam giác ${m('ABC')}. b) Tính chiều cao tòa nhà.`,
   sol:[`a) ${m('\\widehat{BAC} = 50^\\circ - 40^\\circ = 10^\\circ')}; ${m('\\widehat{CBA} = 90^\\circ - 50^\\circ = 40^\\circ')}; ${m('\\widehat{ACB} = 180^\\circ - 10^\\circ - 40^\\circ = 130^\\circ')}.`,
     `b) Định lí sin trong tam giác ${m('ABC')} (${m('BC = 5')}): ${m('AC = \\dfrac{BC\\sin B}{\\sin A} = \\dfrac{5\\sin 40^\\circ}{\\sin 10^\\circ} \\approx 18{,}51')} m.`,
     `Chân cột ${m('C')} cao hơn ${m('A')}: ${m('AC\\sin 40^\\circ \\approx 11{,}90')} m, nên tòa nhà cao ${m('7 + 11{,}90 \\approx 18{,}9')} m.`,
     `Kiểm tra: ${m('AB = \\dfrac{5\\sin 130^\\circ}{\\sin 10^\\circ} \\approx 22{,}06')}; đỉnh ${m('B')} cao ${m('7 + 22{,}06\\sin 50^\\circ \\approx 23{,}9')} m, trừ cột ${m('5')} m còn ${m('18{,}9')} m ✓.`],
   ans:`a) ${tb('10^\\circ,\\ 40^\\circ,\\ 130^\\circ')}; b) ${tb('\\approx 18{,}9')} m. <i>Một số trang giải trên mạng ghi khác; kết quả này đã kiểm bằng hai cách.</i>`},

  {kind:'vd', tag:'SGK tr. 43 · Bài 3.10', label:'Bài 3.10', de:`Từ bãi biển Vũng Chùa (Quảng Bình) ngắm được Đảo Yến. Hãy đề xuất cách xác định bề rộng của hòn đảo theo chiều ngắm.`,
   sol:[`Đặt hai cọc ${m('A, B')} trên bờ, đo ${m('AB')}; gọi ${m('H, K')} là hai mép đảo theo chiều ngắm.`,
     `Ngắm ${m('H')} từ ${m('A')} và ${m('B')}: đo ${m('\\widehat{BAH},\\ \\widehat{ABH}')}; định lí sin trong ${m('\\triangle ABH')} cho ${m('AH')}.`,
     `Ngắm ${m('K')} từ ${m('A')} và một cọc thứ ba ${m('C')} (đo ${m('AC')}): đo ${m('\\widehat{CAK},\\ \\widehat{ACK}')}; định lí sin trong ${m('\\triangle ACK')} cho ${m('AK')}.`,
     `Đo ${m('\\widehat{HAK}')} (hoặc suy ra từ các góc đã đo), áp dụng định lí côsin trong ${m('\\triangle AHK')}: ${m('HK^2 = AH^2 + AK^2 - 2\\,AH\\cdot AK\\cos\\widehat{HAK}')}.`],
   ans:`Bề rộng đảo là ${tb('HK')} tính bằng định lí sin (hai lần) rồi định lí côsin. <i>Bài mở – nhiều cách đo đúng.</i>`},

  {kind:'sum', tag:'Tổng kết', title:'Lỗi hay gặp',
   body:`<ul><li>Dùng định lí sin để tìm góc mà quên xét khả năng góc tù (${m('\\sin B = \\sin(180^\\circ - B)')}); thường kiểm tra bằng tổng ba góc.</li><li>Làm tròn quá sớm ở các bước giữa nên đáp số cuối lệch.</li><li>Nhầm góc xen giữa khi dùng ${m('S = \\dfrac{1}{2}bc\\sin A')}: góc phải nằm giữa hai cạnh đã dùng.</li></ul>` +
     box('Giao về nhà: các bài tập còn lại cuối Bài 6 và Ôn tập chương III; luyện thêm trên web <b>Học mà chơi</b> – Toán 10, Bài 6.')},
]);
})();

/* =====================================================================
   ÔN TẬP CHƯƠNG III – Bài tập cuối chương III (SGK tập 1, tr. 44): Bài 3.12 – 3.17
   ===================================================================== */
(() => {
const m = tm;
const box = h => `<div class="lk-box">${h}</div>`, note = h => `<div class="lk-note">⚠️ ${h}</div>`;

Lecture.addSgk('lop10', 'on-tap-c3', [
  {kind:'title', tag:'Toán 10 · Kết nối tri thức · Giải bài tập SGK', title:'Ôn tập chương III', sub:'Bài tập cuối chương III – SGK tập 1, trang 44',
   points:['Trắc nghiệm: Bài 3.12 (tam giác có góc ' + m('B = 135^\\circ') + '), Bài 3.13 (khẳng định đúng).', 'Bài 3.14: tính giá trị biểu thức lượng giác. Bài 3.15: giải tam giác, tính ' + m('R, S, r') + '.',
     'Bài 3.16 – 3.17: chứng minh công thức trung tuyến và quan hệ giữa góc và cạnh.']},

  {kind:'kt', tag:'Nhắc nhanh', title:'Công thức cần dùng',
   body: box(`${m('\\sin(180^\\circ - \\alpha) = \\sin\\alpha')}, ${m('\\cos(180^\\circ - \\alpha) = -\\cos\\alpha')}; &nbsp; ${m('a^2 = b^2 + c^2 - 2bc\\cos A')}; &nbsp; ${m('\\dfrac{a}{\\sin A} = 2R')}; &nbsp; ${m('S = \\dfrac{1}{2}bc\\sin A = pr = \\dfrac{abc}{4R}')}.`) +
     note('Bài 3.12, 3.13 là trắc nghiệm: dưới đây ghi mệnh đề đúng, thầy đối chiếu với chữ cái A–D trong sách.')},

  {kind:'vd', tag:'SGK tr. 44 · Bài 3.12', label:'Bài 3.12', de:`Cho tam giác ${m('ABC')} có ${m('\\widehat{B} = 135^\\circ')}. Chọn công thức đúng: a) diện tích ${m('S')}; b) bán kính ${m('R')}; c) ${m('b^2')}.`,
   sol:[`a) ${m('S = \\dfrac{1}{2}ca\\sin B = \\dfrac{1}{2}ca\\sin 135^\\circ = \\dfrac{\\sqrt{2}}{4}ca')}.`, `b) ${m('2R = \\dfrac{b}{\\sin 135^\\circ} = b\\sqrt{2}')} ⇒ ${m('R = \\dfrac{\\sqrt{2}}{2}b')}.`,
     `c) ${m('b^2 = c^2 + a^2 - 2ca\\cos 135^\\circ = c^2 + a^2 + \\sqrt{2}\\,ca')}.`],
   ans:`${tb('S = \\dfrac{\\sqrt{2}}{4}ca')}; &nbsp; ${tb('R = \\dfrac{\\sqrt{2}}{2}b')}; &nbsp; ${tb('b^2 = c^2 + a^2 - 2ca\\cos 135^\\circ')}.`},

  {kind:'vd', tag:'SGK tr. 44 · Bài 3.13', label:'Bài 3.13', de:`Cho tam giác ${m('ABC')}. Khẳng định nào đúng? a) ${m('S = \\dfrac{abc}{4r}')}; ${m('r = \\dfrac{2S}{a + b + c}')}; ${m('a^2 = b^2 + c^2 + 2bc\\cos A')}; ${m('S = r(a + b + c)')}. b) ${m('\\sin A = \\sin(B + C)')}; ${m('\\cos A = \\cos(B + C)')}; ${m('\\cos A \\gt 0')}; ${m('\\sin A \\le 0')}.`,
   sol:[`a) Từ ${m('S = pr = \\dfrac{a + b + c}{2}\\,r')} suy ra ${m('r = \\dfrac{2S}{a + b + c}')}. Công thức ${m('S = \\dfrac{abc}{4R}')} dùng bán kính ngoại tiếp ${m('R')}, không phải ${m('r')}; định lí côsin có dấu <b>trừ</b>; ${m('S = r(a + b + c)')} thiếu hệ số ${m('\\dfrac{1}{2}')}.`,
     `b) ${m('A = 180^\\circ - (B + C)')} nên ${m('\\sin A = \\sin(B + C)')}; còn ${m('\\cos A = -\\cos(B + C)')}. Góc ${m('A')} có thể tù (${m('\\cos A \\lt 0')}) và luôn có ${m('\\sin A \\gt 0')}.`],
   ans:`a) ${tb('r = \\dfrac{2S}{a + b + c}')}; &nbsp; b) ${tb('\\sin A = \\sin(B + C)')}.`},

  {kind:'vd', tag:'SGK tr. 44 · Bài 3.14', label:'Bài 3.14', de:`Tính: a) ${m('M = \\sin 45^\\circ\\cos 45^\\circ + \\sin 30^\\circ')}; b) ${m('N = \\sin 60^\\circ\\cos 30^\\circ + \\dfrac{1}{2}\\sin 45^\\circ\\cos 45^\\circ')}; c) ${m('P = 1 + \\tan^2 60^\\circ')}; d) ${m('Q = \\dfrac{1}{\\sin^2 120^\\circ} - \\cot^2 120^\\circ')}.`,
   sol:[`a) ${m('M = \\dfrac{\\sqrt{2}}{2}\\cdot\\dfrac{\\sqrt{2}}{2} + \\dfrac{1}{2} = \\dfrac{1}{2} + \\dfrac{1}{2} = 1')}.`, `b) ${m('N = \\dfrac{\\sqrt{3}}{2}\\cdot\\dfrac{\\sqrt{3}}{2} + \\dfrac{1}{2}\\cdot\\dfrac{1}{2} = \\dfrac{3}{4} + \\dfrac{1}{4} = 1')}.`,
     `c) ${m('P = 1 + (\\sqrt{3})^2 = 4')}.`, `d) ${m('\\sin 120^\\circ = \\dfrac{\\sqrt{3}}{2}')}, ${m('\\cot 120^\\circ = -\\dfrac{1}{\\sqrt{3}}')}: ${m('Q = \\dfrac{4}{3} - \\dfrac{1}{3} = 1')}.`],
   ans:`${tb('M = 1;\\ N = 1;\\ P = 4;\\ Q = 1')}.`},

  {kind:'vd', tag:'SGK tr. 44 · Bài 3.15', label:'Bài 3.15', de:`Tam giác ${m('ABC')} có ${m('\\widehat{B} = 60^\\circ,\\ \\widehat{C} = 45^\\circ,\\ AC = 10')}. Tính ${m('BC')}, ${m('R')}, ${m('S')}, ${m('r')}.`,
   sol:[`${m('\\widehat{A} = 75^\\circ')}. Định lí sin: ${m('2R = \\dfrac{AC}{\\sin B} = \\dfrac{20}{\\sqrt{3}}')} ⇒ ${m('R = \\dfrac{10\\sqrt{3}}{3} \\approx 5{,}77')}.`,
     `${m('BC = 2R\\sin A \\approx 11{,}55\\cdot\\sin 75^\\circ \\approx 11{,}15')}; ${m('AB = 2R\\sin C \\approx 8{,}16')}.`,
     `${m('S = \\dfrac{1}{2}\\cdot BC\\cdot AC\\cdot\\sin C \\approx \\dfrac{1}{2}\\cdot 11{,}15\\cdot 10\\cdot\\dfrac{\\sqrt{2}}{2} \\approx 39{,}43')}.`,
     `${m('p = \\dfrac{11{,}15 + 10 + 8{,}16}{2} \\approx 14{,}66')}, nên ${m('r = \\dfrac{S}{p} \\approx 2{,}69')}.`],
   ans:`${tb('BC \\approx 11{,}15;\\ R \\approx 5{,}77;\\ S \\approx 39{,}43;\\ r \\approx 2{,}69')}.`},

  {kind:'vd', tag:'SGK tr. 44 · Bài 3.16', label:'Bài 3.16', de:`Tam giác ${m('ABC')} có trung tuyến ${m('AM')}. Chứng minh: a) ${m('\\cos\\widehat{AMB} + \\cos\\widehat{AMC} = 0')}; b) ${m('MA^2 + MB^2 - AB^2 = 2MA\\cdot MB\\cos\\widehat{AMB}')} và ${m('MA^2 + MC^2 - AC^2 = 2MA\\cdot MC\\cos\\widehat{AMC}')}; c) ${m('MA^2 = \\dfrac{2(AB^2 + AC^2) - BC^2}{4}')}.`,
   sol:[`a) ${m('\\widehat{AMB} + \\widehat{AMC} = 180^\\circ')} (kề bù) nên ${m('\\cos\\widehat{AMC} = -\\cos\\widehat{AMB}')}.`,
     `b) Định lí côsin trong ${m('\\triangle AMB')}: ${m('AB^2 = MA^2 + MB^2 - 2MA\\cdot MB\\cos\\widehat{AMB}')}; tương tự trong ${m('\\triangle AMC')}.`,
     `c) Đặt ${m('MB = MC = \\dfrac{BC}{2}')}. Cộng hai đẳng thức ở b): ${m('2MA^2 + 2\\cdot\\dfrac{BC^2}{4} - (AB^2 + AC^2) = 2MA\\cdot\\dfrac{BC}{2}(\\cos\\widehat{AMB} + \\cos\\widehat{AMC}) = 0')}.`,
     `Suy ra ${m('MA^2 = \\dfrac{AB^2 + AC^2}{2} - \\dfrac{BC^2}{4} = \\dfrac{2(AB^2 + AC^2) - BC^2}{4}')}.`],
   ans:`${tb('MA^2 = \\dfrac{2(AB^2 + AC^2) - BC^2}{4}')} (công thức đường trung tuyến).`},

  {kind:'vd', tag:'SGK tr. 44 · Bài 3.17', label:'Bài 3.17', de:`Tam giác ${m('ABC')}. Chứng minh: a) góc ${m('A')} nhọn thì ${m('b^2 + c^2 \\gt a^2')}; b) góc ${m('A')} tù thì ${m('b^2 + c^2 \\lt a^2')}; c) góc ${m('A')} vuông thì ${m('b^2 + c^2 = a^2')}.`,
   sol:[`Định lí côsin: ${m('a^2 = b^2 + c^2 - 2bc\\cos A')}, tức ${m('b^2 + c^2 - a^2 = 2bc\\cos A')}.`, `${m('2bc \\gt 0')} nên dấu của ${m('b^2 + c^2 - a^2')} là dấu của ${m('\\cos A')}.`,
     `${m('A')} nhọn: ${m('\\cos A \\gt 0')} ⇒ ${m('b^2 + c^2 \\gt a^2')}. ${m('A')} tù: ${m('\\cos A \\lt 0')} ⇒ ${m('b^2 + c^2 \\lt a^2')}. ${m('A')} vuông: ${m('\\cos A = 0')} ⇒ ${m('b^2 + c^2 = a^2')} (định lí Pythagore).`],
   ans:`Dấu của ${tb('b^2 + c^2 - a^2')} trùng dấu của ${tb('\\cos A')}.`},

  {kind:'sum', tag:'Tổng kết', title:'Lỗi hay gặp',
   body:`<ul><li>Quên rằng ${m('\\cos')}, ${m('\\tan')}, ${m('\\cot')} của góc tù <b>âm</b>, còn ${m('\\sin')} luôn dương.</li><li>Nhầm ${m('R')} (ngoại tiếp) với ${m('r')} (nội tiếp) trong các công thức diện tích.</li><li>Viết sai dấu trong định lí côsin khi góc tù.</li></ul>` +
     box('Bài 3.11 (Hình 3.19, đường hầm) thuộc Bài 6 – chưa đưa vào bộ này vì cần đối chiếu hình trong sách.')},
]);
})();
