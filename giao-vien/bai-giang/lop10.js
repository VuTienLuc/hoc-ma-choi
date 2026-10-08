/* =====================================================================
   BÀI GIẢNG LỚP 10 – Toán, Kết nối tri thức (dành cho giáo viên trình chiếu)
   Chương II. Bất phương trình và hệ bất phương trình bậc nhất hai ẩn
   Chương III. Hệ thức lượng trong tam giác
   Mỗi trang chiếu: {kind, tag, title|de, body|steps|sol, fig, figAt, ans}
     kind: 'title' (mở bài) · 'kt' (kiến thức trọng tâm) · 'method' (phương pháp một dạng)
           'vd' (ví dụ: đề + lời giải từng bước) · 'lt' (luyện tập) · 'sum' (tổng kết)
     figAt: hình (thường là đáp án) chỉ hiện từ bước lời giải thứ figAt.
   Công thức: tm() trong dòng, td() riêng dòng, tb() đáp án đậm (core.js).
   ===================================================================== */
(() => {
const m = tm, d = td;
const box = h => `<div class="lk-box">${h}</div>`, note = h => `<div class="lk-note">⚠️ ${h}</div>`;
const sys = rows => tsys(rows);
const P = (x,y) => `(${x};\\,${y})`;

/* ---------- Hình ---------- */
const F_2x_y = (sol=true) => planeSVG({x:[-1,5], y:[-1,5], lines:[[2,1,4,false,'d']], hatch:sol?[[2,1,4]]:[], pts:[[2,0,'A'],[0,4,'B']]});
const F_x_2y = () => planeSVG({x:[-1,5], y:[-3,3], lines:[[1,-2,2,true,'d']], hatch:[[-1,2,-2]], pts:[[2,0,''],[0,-1,'']]});
const F_y_2x = () => planeSVG({x:[-2,4], y:[-2,5], lines:[[2,-1,0,false,'d']], hatch:[[2,-1,0]], pts:[[1,2,''],[1,0,'M']]});
const F_xy3  = () => planeSVG({x:[-1,5], y:[-1,5], lines:[[1,1,3,true,'d']], hatch:[[1,1,3]]});
const F_sys = (lab=true) => planeSVG({x:[-1,9], y:[-1,11], lines:[[1,2,8,false,'d₁'],[2,1,10,false,'d₂']],
  hatch:[[-1,0,0],[0,-1,0],[1,2,8],[2,1,10]], pts:lab?[[0,0,''],[5,0,'A'],[4,2,'B'],[0,4,'C']]:[]});
const F_sysMin = () => planeSVG({x:[-1,10], y:[-1,11], lines:[[1,2,8,false,'d₁'],[2,1,10,false,'d₂']],
  hatch:[[-1,0,0],[0,-1,0],[-1,-2,-8],[-2,-1,-10]], pts:[[8,0,'A'],[4,2,'B'],[0,10,'C']]});
const F_tri = () => planeSVG({x:[-1,5], y:[-1,4], lines:[[3,4,12,false,'']], hatch:[[-1,0,0],[0,-1,0],[3,4,12]], pts:[[4,0,'A'],[0,3,'B']]});

Lecture.add({ grade:'lop10', gradeName:'Toán 10', chapter:'Chương II. Bất phương trình và hệ bất phương trình bậc nhất hai ẩn', lessons:[

/* =====================================================================
   BÀI 3. BẤT PHƯƠNG TRÌNH BẬC NHẤT HAI ẨN
   ===================================================================== */
{ id:'bai-3', name:'Bài 3. Bất phương trình bậc nhất hai ẩn', desc:'Khái niệm, nghiệm, miền nghiệm; 3 dạng bài với 6 ví dụ và 2 bài luyện tập.', slides:[
  {kind:'title', tag:'Toán 10 · Kết nối tri thức · Chương II', title:'Bài 3. Bất phương trình bậc nhất hai ẩn',
   sub:'Mục tiêu bài học', points:[
     'Nhận biết bất phương trình bậc nhất hai ẩn và nghiệm của nó.',
     'Biểu diễn miền nghiệm của bất phương trình trên mặt phẳng toạ độ.',
     'Vận dụng vào bài toán thực tế.']},

  {kind:'kt', tag:'Kiến thức trọng tâm 1', title:'Bất phương trình bậc nhất hai ẩn',
   body: box(`Bất phương trình bậc nhất hai ẩn ${m('x, y')} có dạng ${d('ax + by \\lt c\\quad (ax + by \\gt c,\\ \\ ax + by \\le c,\\ \\ ax + by \\ge c)')}trong đó ${m('a, b, c')} là các số thực, ${m('a')} và ${m('b')} <b>không đồng thời bằng 0</b>.`) +
     `<p>• Cặp số ${m(P('x_0','y_0'))} là <b>một nghiệm</b> nếu ${m('ax_0 + by_0 \\lt c')} là mệnh đề đúng.</p>
      <p>• Ví dụ: ${m('2x - y \\le 3')} là bất phương trình bậc nhất hai ẩn; ${m(P(1,0))} là nghiệm vì ${m('2\\cdot 1 - 0 = 2 \\le 3')}.</p>` +
     note('Bất phương trình bậc nhất hai ẩn luôn có <b>vô số nghiệm</b>.')},

  {kind:'kt', tag:'Kiến thức trọng tâm 2', title:'Miền nghiệm', fig:F_2x_y(),
   body:`<p>• Tập hợp các điểm ${m('M(x;\\,y)')} có toạ độ là nghiệm gọi là <b>miền nghiệm</b> của bất phương trình.</p>
     <p>• Đường thẳng ${m('d: ax + by = c')} chia mặt phẳng thành <b>hai nửa mặt phẳng</b>; một nửa là miền nghiệm.</p>
     <p>• Quy ước: <b>gạch bỏ</b> phần không phải miền nghiệm.</p>` +
     box(`Dấu ${m('\\le,\\ \\ge')}: miền nghiệm <b>kể cả bờ</b> ${m('d')} (vẽ nét liền).<br>Dấu ${m('\\lt,\\ \\gt')}: <b>không kể bờ</b> (vẽ nét đứt).`)},

  {kind:'method', tag:'Dạng 1', title:'Nhận biết bất phương trình bậc nhất hai ẩn. Kiểm tra nghiệm',
   steps:[`Đưa bất phương trình về dạng ${m('ax + by \\lt c')} (hoặc ${m('\\gt, \\le, \\ge')}).`,
     `Là bất phương trình bậc nhất hai ẩn khi: chỉ có ${m('x, y')} với số mũ 1 (không có ${m('x^2, y^2, xy')}, không có ẩn ở mẫu) và ${m('a, b')} không đồng thời bằng 0.`,
     `Kiểm tra ${m(P('x_0','y_0'))}: thay vào bất phương trình; được mệnh đề <b>đúng</b> thì là nghiệm.`]},

  {kind:'vd', tag:'Ví dụ 1 · Dạng 1', label:'Ví dụ 1',
   de:`Trong các bất phương trình sau, bất phương trình nào là bất phương trình bậc nhất hai ẩn?<br>a) ${m('2x - 3y + 1 \\gt 0')}; &nbsp; b) ${m('x^2 + y \\le 4')}; &nbsp; c) ${m('3y - 5 \\ge 0')}; &nbsp; d) ${m('xy - x \\lt 2')}.`,
   sol:[`a) ${m('2x - 3y \\gt -1')} có ${m('a = 2,\\ b = -3')} ⇒ <b>là</b> bất phương trình bậc nhất hai ẩn.`,
     `b) Có ${m('x^2')} ⇒ <b>không phải</b>.`,
     `c) ${m('0x + 3y \\ge 5')} có ${m('a = 0,\\ b = 3')} (không đồng thời bằng 0) ⇒ <b>là</b>.`,
     `d) Có tích ${m('xy')} ⇒ <b>không phải</b>.`],
   ans:`Kết luận: ${tb('\\text{a) và c)}')}.`},

  {kind:'vd', tag:'Ví dụ 2 · Dạng 1', label:'Ví dụ 2',
   de:`Cho bất phương trình ${m('3x - 2y \\le 6')}. Trong các cặp số ${m(P(0,0))}, ${m(P(4,1))}, ${m(P(2,'-1'))}, cặp nào là nghiệm của bất phương trình?`,
   sol:[`Với ${m(P(0,0))}: ${m('3\\cdot 0 - 2\\cdot 0 = 0 \\le 6')} <b>đúng</b> ⇒ là nghiệm.`,
     `Với ${m(P(4,1))}: ${m('3\\cdot 4 - 2\\cdot 1 = 10 \\le 6')} <b>sai</b> ⇒ không là nghiệm.`,
     `Với ${m(P(2,'-1'))}: ${m('3\\cdot 2 - 2\\cdot(-1) = 8 \\le 6')} <b>sai</b> ⇒ không là nghiệm.`],
   ans:`Chỉ có ${tb(P(0,0))} là nghiệm.`},

  {kind:'method', tag:'Dạng 2', title:'Biểu diễn miền nghiệm của bất phương trình',
   steps:[`<b>Bước 1.</b> Vẽ đường thẳng ${m('d: ax + by = c')} (lấy hai điểm, thường là giao với hai trục).`,
     `<b>Bước 2.</b> Lấy điểm ${m('M(x_0;\\,y_0) \\notin d')} (thường là ${m('O(0;\\,0)')}), tính ${m('ax_0 + by_0')} rồi so sánh với ${m('c')}.`,
     `<b>Bước 3.</b> Nếu thoả mãn: miền nghiệm là nửa mặt phẳng bờ ${m('d')} <b>chứa</b> ${m('M')}; nếu không: nửa mặt phẳng <b>không chứa</b> ${m('M')}. Gạch bỏ phần còn lại.`],
   body: note(`Nếu ${m('d')} đi qua gốc ${m('O')} thì chọn điểm khác, chẳng hạn ${m('M(1;\\,0)')} hoặc ${m('M(0;\\,1)')}.`)},

  {kind:'vd', tag:'Ví dụ 3 · Dạng 2', label:'Ví dụ 3', de:`Biểu diễn miền nghiệm của bất phương trình ${m('2x + y \\le 4')}.`, fig:F_2x_y(), figAt:3,
   sol:[`Vẽ ${m('d: 2x + y = 4')} đi qua ${m('A(2;\\,0)')} và ${m('B(0;\\,4)')}; dấu ${m('\\le')} nên vẽ <b>nét liền</b>.`,
     `Thay ${m('O(0;\\,0)')}: ${m('2\\cdot 0 + 0 = 0 \\le 4')} <b>đúng</b>.`,
     `Miền nghiệm là nửa mặt phẳng bờ ${m('d')} <b>chứa</b> ${m('O')}, kể cả bờ ${m('d')} (phần không bị gạch).`]},

  {kind:'vd', tag:'Ví dụ 4 · Dạng 2', label:'Ví dụ 4', de:`Biểu diễn miền nghiệm của bất phương trình ${m('x - 2y \\gt 2')}.`, fig:F_x_2y(), figAt:3,
   sol:[`Vẽ ${m('d: x - 2y = 2')} đi qua ${m('(2;\\,0)')} và ${m('(0;\\,-1)')}; dấu ${m('\\gt')} nên vẽ <b>nét đứt</b>.`,
     `Thay ${m('O(0;\\,0)')}: ${m('0 - 2\\cdot 0 = 0 \\gt 2')} <b>sai</b>.`,
     `Miền nghiệm là nửa mặt phẳng bờ ${m('d')} <b>không chứa</b> ${m('O')}, không kể bờ ${m('d')}.`]},

  {kind:'vd', tag:'Ví dụ 5 · Dạng 2', label:'Ví dụ 5', de:`Biểu diễn miền nghiệm của bất phương trình ${m('y \\ge 2x')}.`, fig:F_y_2x(), figAt:3,
   sol:[`Viết lại: ${m('-2x + y \\ge 0')}. Đường thẳng ${m('d: y = 2x')} đi qua ${m('O(0;\\,0)')} và ${m('(1;\\,2)')}; vẽ nét liền.`,
     `${m('d')} đi qua ${m('O')} nên chọn ${m('M(1;\\,0)')}: ${m('-2\\cdot 1 + 0 = -2 \\ge 0')} <b>sai</b>.`,
     `Miền nghiệm là nửa mặt phẳng bờ ${m('d')} <b>không chứa</b> ${m('M(1;\\,0)')}, kể cả bờ ${m('d')}.`]},

  {kind:'method', tag:'Dạng 3', title:'Bài toán thực tế',
   steps:[`Gọi ẩn ${m('x, y')} (nêu đơn vị và điều kiện, thường ${m('x \\ge 0,\\ y \\ge 0')}).`,
     `Biểu diễn các đại lượng (tiền, khối lượng, thời gian…) theo ${m('x, y')}.`,
     `Lập bất phương trình: “không quá, tối đa” → ${m('\\le')}; “ít nhất, tối thiểu” → ${m('\\ge')}.`,
     `Trả lời câu hỏi (kiểm tra một phương án bằng cách thay số).`]},

  {kind:'vd', tag:'Ví dụ 6 · Dạng 3', label:'Ví dụ 6',
   de:`Cô Lan có <b>300 nghìn đồng</b> để mua ${m('x')} kg cam (giá 30 nghìn đồng/kg) và ${m('y')} kg táo (giá 50 nghìn đồng/kg).<br>a) Viết bất phương trình mô tả điều kiện của ${m('x, y')}.<br>b) Cô Lan mua 5 kg cam và 3 kg táo được không? 6 kg cam và 3 kg táo thì sao?`,
   sol:[`Số tiền mua cam là ${m('30x')}, mua táo là ${m('50y')} (nghìn đồng), với ${m('x \\ge 0,\\ y \\ge 0')}.`,
     `a) Tổng số tiền không quá 300 nghìn: ${m('30x + 50y \\le 300 \\;\\Leftrightarrow\\; 3x + 5y \\le 30')}.`,
     `b) ${m(P(5,3))}: ${m('3\\cdot 5 + 5\\cdot 3 = 30 \\le 30')} đúng ⇒ <b>mua được</b>.`,
     `${m(P(6,3))}: ${m('3\\cdot 6 + 5\\cdot 3 = 33 \\le 30')} sai ⇒ <b>không đủ tiền</b>.`],
   ans:`a) ${tb('3x + 5y \\le 30')}; b) 5 kg cam, 3 kg táo: được; 6 kg cam, 3 kg táo: không được.`},

  {kind:'lt', tag:'Luyện tập', label:'Bài 1', de:`Cặp số ${m(P(-1,2))} có là nghiệm của bất phương trình ${m('x + 3y \\gt 4')} không?`,
   sol:[`Thay ${m('x = -1,\\ y = 2')}: ${m('-1 + 3\\cdot 2 = 5 \\gt 4')} <b>đúng</b>.`], ans:`${tb(P(-1,2))} <b>là</b> nghiệm.`},

  {kind:'lt', tag:'Luyện tập', label:'Bài 2', de:`Biểu diễn miền nghiệm của bất phương trình ${m('x + y \\lt 3')}.`, fig:F_xy3(), figAt:3,
   sol:[`Vẽ ${m('d: x + y = 3')} qua ${m('(3;\\,0)')}, ${m('(0;\\,3)')}; dấu ${m('\\lt')} nên vẽ nét đứt.`,
     `Thay ${m('O')}: ${m('0 + 0 = 0 \\lt 3')} đúng.`,
     `Miền nghiệm là nửa mặt phẳng bờ ${m('d')} chứa ${m('O')}, không kể bờ.`]},

  {kind:'sum', tag:'Tổng kết', title:'Ghi nhớ',
   body:`<ul><li>Dạng: ${m('ax + by \\lt c')} (hoặc ${m('\\gt, \\le, \\ge')}), ${m('a, b')} không đồng thời bằng 0.</li>
     <li>Kiểm tra nghiệm: thay ${m('x_0, y_0')} → mệnh đề đúng.</li>
     <li>Miền nghiệm: vẽ ${m('d')} → thử điểm ${m('O')} (hoặc điểm khác nếu ${m('d')} qua ${m('O')}) → gạch bỏ phần không thoả.</li>
     <li>Có dấu “=” → kể cả bờ (nét liền); không có → không kể bờ (nét đứt).</li></ul>` +
     box('Về nhà: làm các bài tập cuối Bài 3 trong SGK; luyện thêm trên web <b>Học mà chơi</b> – Toán 10, Bài 3.')},
]},

/* =====================================================================
   BÀI 4. HỆ BẤT PHƯƠNG TRÌNH BẬC NHẤT HAI ẨN
   ===================================================================== */
{ id:'bai-4', name:'Bài 4. Hệ bất phương trình bậc nhất hai ẩn', desc:'Hệ và nghiệm; miền nghiệm; GTLN – GTNN của F = ax + by; bài toán tối ưu. 4 dạng, 4 ví dụ.', slides:[
  {kind:'title', tag:'Toán 10 · Kết nối tri thức · Chương II', title:'Bài 4. Hệ bất phương trình bậc nhất hai ẩn',
   sub:'Mục tiêu bài học', points:[
     'Nhận biết hệ bất phương trình bậc nhất hai ẩn và nghiệm của hệ.',
     'Biểu diễn miền nghiệm của hệ trên mặt phẳng toạ độ.',
     `Tìm giá trị lớn nhất, nhỏ nhất của ${m('F = ax + by')} trên miền đa giác.`,
     'Giải bài toán tối ưu trong thực tế.']},

  {kind:'kt', tag:'Kiến thức trọng tâm 1', title:'Hệ bất phương trình bậc nhất hai ẩn',
   body: box(`Hệ bất phương trình bậc nhất hai ẩn gồm <b>hai hay nhiều</b> bất phương trình bậc nhất hai ẩn. Ví dụ: ${d(sys(['x + y \\le 4','2x - y \\ge 0','x \\ge 0']))}`) +
     `<p>• Cặp ${m(P('x_0','y_0'))} là <b>nghiệm của hệ</b> nếu nó là nghiệm của <b>tất cả</b> các bất phương trình trong hệ.</p>
      <p>• <b>Miền nghiệm của hệ</b> là phần chung (giao) miền nghiệm của các bất phương trình.</p>`},

  {kind:'kt', tag:'Kiến thức trọng tâm 2', title:'Biểu diễn miền nghiệm của hệ', fig:F_sys(false),
   body:`<p>• Trên cùng một hệ trục, biểu diễn miền nghiệm của <b>từng</b> bất phương trình và <b>gạch bỏ</b> phần không thuộc miền nghiệm.</p>
     <p>• Phần <b>không bị gạch</b> là miền nghiệm của hệ.</p>` +
     note(`Với ${m('x \\ge 0')}: gạch bỏ bên trái trục ${m('Oy')}; với ${m('y \\ge 0')}: gạch bỏ phía dưới trục ${m('Ox')}.`)},

  {kind:'kt', tag:'Kiến thức trọng tâm 3', title:`Giá trị lớn nhất, nhỏ nhất của ${m('F = ax + by')}`,
   body: box(`Nếu miền nghiệm của hệ là một <b>đa giác</b> thì ${m('F = ax + by')} đạt giá trị lớn nhất và giá trị nhỏ nhất tại <b>các đỉnh</b> của đa giác đó.`) +
     `<ol class="lk-steps"><li>Xác định miền nghiệm và toạ độ các đỉnh (giao điểm của các đường thẳng).</li><li>Tính ${m('F')} tại từng đỉnh.</li><li>So sánh: số lớn nhất là ${m('F_{\\max}')}, số nhỏ nhất là ${m('F_{\\min}')}.</li></ol>`},

  {kind:'method', tag:'Dạng 1', title:'Kiểm tra nghiệm của hệ',
   steps:[`Thay ${m(P('x_0','y_0'))} vào <b>từng</b> bất phương trình của hệ.`,
     `Nếu <b>tất cả</b> đều đúng ⇒ là nghiệm của hệ; chỉ cần <b>một</b> bất phương trình sai ⇒ không là nghiệm.`]},

  {kind:'vd', tag:'Ví dụ 1 · Dạng 1', label:'Ví dụ 1',
   de:`Cho hệ ${d(sys(['x + y \\le 4','2x - y \\ge 0','x \\ge 0']))}Các cặp số ${m(P(1,2))} và ${m(P(3,2))} có là nghiệm của hệ không?`,
   sol:[`${m(P(1,2))}: ${m('1 + 2 = 3 \\le 4')} ✓; ${m('2\\cdot 1 - 2 = 0 \\ge 0')} ✓; ${m('1 \\ge 0')} ✓ ⇒ <b>là nghiệm</b> của hệ.`,
     `${m(P(3,2))}: ${m('3 + 2 = 5 \\le 4')} ✗ (sai ngay bất phương trình thứ nhất) ⇒ <b>không là nghiệm</b>.`],
   ans:`${tb(P(1,2))} là nghiệm; ${m(P(3,2))} không là nghiệm.`},

  {kind:'method', tag:'Dạng 2', title:'Biểu diễn miền nghiệm của hệ',
   steps:[`Vẽ các đường thẳng bờ trên cùng một hệ trục.`,
     `Với mỗi bất phương trình: thử điểm ${m('O')} (hoặc điểm khác), gạch bỏ nửa mặt phẳng <b>không</b> thoả mãn.`,
     `Phần không bị gạch là miền nghiệm; tìm toạ độ các đỉnh bằng cách giải hệ hai phương trình đường thẳng.`]},

  {kind:'vd', tag:'Ví dụ 2 · Dạng 2', label:'Ví dụ 2', de:`Biểu diễn miền nghiệm của hệ ${d(sys(['x \\ge 0','y \\ge 0','x + 2y \\le 8','2x + y \\le 10']))}`, fig:F_sys(), figAt:4,
   sol:[`${m('x \\ge 0,\\ y \\ge 0')}: gạch bỏ phần bên trái ${m('Oy')} và phần phía dưới ${m('Ox')}.`,
     `${m('d_1: x + 2y = 8')} qua ${m('(8;\\,0)')}, ${m('(0;\\,4)')}; thay ${m('O')}: ${m('0 \\le 8')} đúng ⇒ gạch bỏ nửa mặt phẳng không chứa ${m('O')}.`,
     `${m('d_2: 2x + y = 10')} qua ${m('(5;\\,0)')}, ${m('(0;\\,10)')}; thay ${m('O')}: ${m('0 \\le 10')} đúng ⇒ gạch bỏ nửa mặt phẳng không chứa ${m('O')}.`,
     `Miền nghiệm là tứ giác ${m('OABC')} (kể cả biên). Giao ${m('d_1, d_2')}: ${m(sys(['x + 2y = 8','2x + y = 10']))} ⇒ ${m('B(4;\\,2)')}.`],
   ans:`Tứ giác ${tb('OABC')} với ${m('O(0;\\,0),\\ A(5;\\,0),\\ B(4;\\,2),\\ C(0;\\,4)')}.`},

  {kind:'method', tag:'Dạng 3', title:`Tìm GTLN, GTNN của ${m('F = ax + by')}`,
   steps:[`Biểu diễn miền nghiệm, xác định các đỉnh của đa giác.`, `Tính ${m('F')} tại từng đỉnh.`, `Kết luận giá trị lớn nhất, nhỏ nhất và điểm đạt được.`]},

  {kind:'vd', tag:'Ví dụ 3 · Dạng 3', label:'Ví dụ 3', de:`Tìm giá trị lớn nhất và nhỏ nhất của ${m('F = 3x + 2y')} trên miền nghiệm của hệ ở Ví dụ 2.`, fig:F_sys(),
   sol:[`Miền nghiệm là tứ giác ${m('OABC')} với ${m('O(0;\\,0),\\ A(5;\\,0),\\ B(4;\\,2),\\ C(0;\\,4)')}.`,
     `${m('F(O) = 0')}; ${m('F(A) = 3\\cdot 5 + 0 = 15')}; ${m('F(B) = 3\\cdot 4 + 2\\cdot 2 = 16')}; ${m('F(C) = 0 + 2\\cdot 4 = 8')}.`,
     `So sánh các giá trị: lớn nhất là 16, nhỏ nhất là 0.`],
   ans:`${tb('F_{\\max} = 16')} tại ${m(P(4,2))}; ${tb('F_{\\min} = 0')} tại ${m(P(0,0))}.`},

  {kind:'method', tag:'Dạng 4', title:'Bài toán tối ưu trong thực tế',
   steps:[`Gọi ẩn ${m('x, y')} và nêu điều kiện.`, `Lập hệ bất phương trình từ các ràng buộc (thời gian, nguyên liệu, tiền…).`,
     `Biểu diễn miền nghiệm, tìm các đỉnh.`, `Lập biểu thức ${m('F')} cần lớn nhất (lãi) hoặc nhỏ nhất (chi phí); tính tại các đỉnh và kết luận.`]},

  {kind:'vd', tag:'Ví dụ 4 · Dạng 4', label:'Ví dụ 4', fig:F_sys(), figAt:3,
   de:`Một xưởng làm hai loại sản phẩm I và II. Mỗi sản phẩm I cần 1 giờ trên máy A và 2 giờ trên máy B; mỗi sản phẩm II cần 2 giờ trên máy A và 1 giờ trên máy B. Mỗi ngày máy A làm tối đa 8 giờ, máy B tối đa 10 giờ. Lãi mỗi sản phẩm I là 3 triệu đồng, mỗi sản phẩm II là 2 triệu đồng. Mỗi ngày nên làm bao nhiêu sản phẩm mỗi loại để lãi nhiều nhất?`,
   sol:[`Gọi ${m('x, y')} là số sản phẩm I, II làm mỗi ngày (${m('x \\ge 0,\\ y \\ge 0')}).`,
     `Máy A: ${m('x + 2y \\le 8')}; máy B: ${m('2x + y \\le 10')}. Ta có hệ như Ví dụ 2.`,
     `Miền nghiệm là tứ giác ${m('OABC')}: ${m('O(0;\\,0),\\ A(5;\\,0),\\ B(4;\\,2),\\ C(0;\\,4)')}.`,
     `Tiền lãi ${m('F = 3x + 2y')} (triệu đồng): ${m('F(O) = 0,\\ F(A) = 15,\\ F(B) = 16,\\ F(C) = 8')}.`],
   ans:`Làm <b>4 sản phẩm I</b> và <b>2 sản phẩm II</b>, lãi lớn nhất ${tb('16')} triệu đồng.`},

  {kind:'lt', tag:'Luyện tập', label:'Bài 1', de:`Cặp số ${m(P(2,1))} có là nghiệm của hệ ${m(sys(['2x + y \\le 6','x - y \\ge 0']))} không?`,
   sol:[`${m('2\\cdot 2 + 1 = 5 \\le 6')} ✓; ${m('2 - 1 = 1 \\ge 0')} ✓.`], ans:`${tb(P(2,1))} <b>là</b> nghiệm của hệ.`},

  {kind:'lt', tag:'Luyện tập', label:'Bài 2', de:`Miền nghiệm của một hệ là tam giác ${m('OAB')} với ${m('O(0;\\,0),\\ A(4;\\,0),\\ B(0;\\,3)')}. Tìm giá trị lớn nhất của ${m('F = x + 2y')}.`, fig:F_tri(),
   sol:[`${m('F(O) = 0')}; ${m('F(A) = 4')}; ${m('F(B) = 0 + 2\\cdot 3 = 6')}.`], ans:`${tb('F_{\\max} = 6')} tại ${m('B(0;\\,3)')}.`},

  {kind:'sum', tag:'Tổng kết', title:'Ghi nhớ',
   body:`<ul><li>Nghiệm của hệ phải thoả mãn <b>tất cả</b> các bất phương trình.</li>
     <li>Miền nghiệm của hệ: phần <b>không bị gạch</b> sau khi gạch bỏ miền không thoả của từng bất phương trình.</li>
     <li>${m('F = ax + by')} đạt GTLN, GTNN tại <b>đỉnh</b> của miền đa giác.</li>
     <li>Bài toán tối ưu: gọi ẩn → lập hệ → vẽ miền nghiệm → tìm đỉnh → tính ${m('F')} → kết luận.</li></ul>` +
     box('Về nhà: làm các bài tập cuối Bài 4 trong SGK; luyện thêm trên web <b>Học mà chơi</b> – Toán 10, Bài 4.')},
]},

/* =====================================================================
   ÔN TẬP CHƯƠNG II
   ===================================================================== */
{ id:'on-tap-c2', name:'Ôn tập chương II', desc:'Sơ đồ kiến thức; bài toán chi phí nhỏ nhất (miền nghiệm không bị chặn); luyện tập tổng hợp.', slides:[
  {kind:'title', tag:'Toán 10 · Kết nối tri thức', title:'Ôn tập chương II',
   sub:'Bất phương trình và hệ bất phương trình bậc nhất hai ẩn', points:['Hệ thống kiến thức của Bài 3 và Bài 4.','Luyện tập bài toán tối ưu: lãi lớn nhất, chi phí nhỏ nhất.']},

  {kind:'sum', tag:'Hệ thống kiến thức', title:'Sơ đồ ghi nhớ',
   body:`<ol class="lk-steps"><li><b>Bất phương trình bậc nhất hai ẩn</b> ${m('ax + by \\lt c')}: nghiệm là cặp ${m(P('x_0','y_0'))}; miền nghiệm là một nửa mặt phẳng bờ ${m('d: ax + by = c')}.</li>
     <li><b>Biểu diễn miền nghiệm:</b> vẽ ${m('d')} → thử điểm ${m('O')} → gạch bỏ nửa không thoả (nét đứt khi dấu ${m('\\lt, \\gt')}).</li>
     <li><b>Hệ bất phương trình:</b> miền nghiệm là giao các miền nghiệm (phần không bị gạch).</li>
     <li><b>Tối ưu:</b> ${m('F = ax + by')} đạt GTLN, GTNN tại các đỉnh của miền nghiệm.</li></ol>`},

  {kind:'vd', tag:'Ví dụ tổng hợp', label:'Ví dụ', fig:F_sysMin(), figAt:3,
   de:`Mỗi gói thức ăn loại I chứa 1 đơn vị đạm và 2 đơn vị vitamin; mỗi gói loại II chứa 2 đơn vị đạm và 1 đơn vị vitamin. Mỗi ngày vật nuôi cần <b>ít nhất</b> 8 đơn vị đạm và 10 đơn vị vitamin. Giá gói I là 30 nghìn đồng, gói II là 20 nghìn đồng. Cần dùng bao nhiêu gói mỗi loại để chi phí thấp nhất?`,
   sol:[`Gọi ${m('x, y')} là số gói loại I, II (${m('x \\ge 0,\\ y \\ge 0')}). Đạm: ${m('x + 2y \\ge 8')}; vitamin: ${m('2x + y \\ge 10')}.`,
     `Chi phí ${m('F = 30x + 20y')} (nghìn đồng) cần <b>nhỏ nhất</b>.`,
     `Miền nghiệm (không bị chặn) có các đỉnh ${m('A(8;\\,0),\\ B(4;\\,2),\\ C(0;\\,10)')}.`,
     `${m('F(A) = 240')}; ${m('F(B) = 120 + 40 = 160')}; ${m('F(C) = 200')}. Nhỏ nhất tại ${m('B')}.`],
   ans:`Dùng <b>4 gói loại I</b> và <b>2 gói loại II</b>, chi phí thấp nhất ${tb('160')} nghìn đồng.`},

  {kind:'lt', tag:'Luyện tập', label:'Bài 1', de:`Miền nghiệm của bất phương trình ${m('3x - y \\ge 3')} có chứa gốc ${m('O')} không? Có chứa điểm ${m('M(2;\\,1)')} không?`,
   sol:[`${m('O')}: ${m('0 \\ge 3')} sai ⇒ <b>không chứa</b> ${m('O')}.`, `${m('M')}: ${m('3\\cdot 2 - 1 = 5 \\ge 3')} đúng ⇒ <b>chứa</b> ${m('M')}.`]},

  {kind:'lt', tag:'Luyện tập', label:'Bài 2', de:`Tìm giá trị nhỏ nhất của ${m('F = x - y')} trên miền nghiệm của hệ ở Ví dụ 2 của Bài 4 (tứ giác ${m('OABC')} với ${m('O(0;\\,0),\\ A(5;\\,0),\\ B(4;\\,2),\\ C(0;\\,4)')}).`, fig:F_sys(),
   sol:[`${m('F(O) = 0')}; ${m('F(A) = 5')}; ${m('F(B) = 2')}; ${m('F(C) = -4')}.`], ans:`${tb('F_{\\min} = -4')} tại ${m('C(0;\\,4)')}.`},

  {kind:'sum', tag:'Tổng kết', title:'Chuẩn bị kiểm tra',
   body:`<ul><li>Luyện thành thạo 3 bước biểu diễn miền nghiệm.</li><li>Nhớ: nghiệm của hệ phải đúng với <b>mọi</b> bất phương trình.</li><li>Bài toán tối ưu: đọc kĩ “nhiều nhất / ít nhất”, lập đúng hệ, tìm đủ các đỉnh.</li></ul>` +
     box('Luyện thêm: web <b>Học mà chơi</b> – Toán 10, Ôn tập chương II (3 mức độ).')},
]},
]});

/* =====================================================================
   CHƯƠNG III. HỆ THỨC LƯỢNG TRONG TAM GIÁC
   ===================================================================== */
{
const DG = x => `${x}^\\circ`, H = tf(1,2), R2 = tf('\\sqrt{2}',2), R3 = tf('\\sqrt{3}',2), T3 = tf('\\sqrt{3}',3);
const ROWS = [['\\sin\\alpha',['0',H,R2,R3,'1',R3,R2,H,'0']],['\\cos\\alpha',['1',R3,R2,H,'0','-'+H,'-'+R2,'-'+R3,'-1']],
  ['\\tan\\alpha',['0',T3,'1','\\sqrt{3}','\\|','-\\sqrt{3}','-1','-'+T3,'0']],['\\cot\\alpha',['\\|','\\sqrt{3}','1',T3,'0','-'+T3,'-1','-\\sqrt{3}','\\|']]];
const TABLE = `<table class="lk-table"><tr><th>${m('\\alpha')}</th>${[0,30,45,60,90,120,135,150,180].map(a => `<th>${m(DG(a))}</th>`).join('')}</tr>` +
  ROWS.map(([f,v]) => `<tr><th>${m(f)}</th>${v.map(x => `<td>${m(x)}</td>`).join('')}</tr>`).join('') + '</table>';
const TRI = (o) => triSVG(o);

Lecture.add({ grade:'lop10', gradeName:'Toán 10', chapter:'Chương III. Hệ thức lượng trong tam giác', lessons:[

/* ---------------- BÀI 5 ---------------- */
{ id:'bai-5', name:'Bài 5. Giá trị lượng giác của một góc từ 0° đến 180°', desc:'Định nghĩa trên nửa đường tròn đơn vị; dấu; hệ thức cơ bản; góc bù; bảng giá trị. 3 dạng, 7 ví dụ.', slides:[
  {kind:'title', tag:'Toán 10 · Kết nối tri thức · Chương III', title:'Bài 5. Giá trị lượng giác của một góc từ 0° đến 180°', sub:'Mục tiêu bài học', points:[
    `Nhận biết giá trị lượng giác của góc ${m('\\alpha')} (${m('0^\\circ \\le \\alpha \\le 180^\\circ')}) qua nửa đường tròn đơn vị.`,
    'Nắm dấu, các hệ thức cơ bản và quan hệ giữa hai góc bù nhau.',
    'Tính giá trị lượng giác và giá trị biểu thức (không dùng máy tính).']},

  {kind:'kt', tag:'Kiến thức trọng tâm 1', title:'Định nghĩa', fig:halfCircleSVG(135),
   body: `<p>Trên nửa đường tròn đơn vị, lấy điểm ${m('M(x_0;\\,y_0)')} sao cho ${m('\\widehat{xOM} = \\alpha')}. Khi đó:</p>` +
     box(`${m('\\sin\\alpha = y_0')}; &nbsp;&nbsp; ${m('\\cos\\alpha = x_0')};<br>${m('\\tan\\alpha = \\dfrac{y_0}{x_0}')} ${m('(x_0 \\ne 0)')}; &nbsp;&nbsp; ${m('\\cot\\alpha = \\dfrac{x_0}{y_0}')} ${m('(y_0 \\ne 0)')}.`) +
     note(`${m('\\tan 90^\\circ')} và ${m('\\cot 0^\\circ,\\ \\cot 180^\\circ')} <b>không xác định</b>.`)},

  {kind:'kt', tag:'Kiến thức trọng tâm 2', title:'Dấu và các hệ thức cơ bản',
   body:`<p>• ${m('0^\\circ \\lt \\alpha \\lt 90^\\circ')}: cả bốn giá trị đều <b>dương</b>.</p>
     <p>• ${m('90^\\circ \\lt \\alpha \\lt 180^\\circ')} (góc tù): ${m('\\sin\\alpha \\gt 0')}; ${m('\\cos\\alpha,\\ \\tan\\alpha,\\ \\cot\\alpha')} <b>âm</b>.</p>` +
     box(`${m('\\tan\\alpha = \\dfrac{\\sin\\alpha}{\\cos\\alpha}')}; &nbsp; ${m('\\cot\\alpha = \\dfrac{\\cos\\alpha}{\\sin\\alpha}')}; &nbsp; ${m('\\tan\\alpha\\cdot\\cot\\alpha = 1')}<br>
       ${m('\\sin^2\\alpha + \\cos^2\\alpha = 1')}; &nbsp; ${m('1 + \\tan^2\\alpha = \\dfrac{1}{\\cos^2\\alpha}')}; &nbsp; ${m('1 + \\cot^2\\alpha = \\dfrac{1}{\\sin^2\\alpha}')}`) +
     note(`Với ${m('0^\\circ \\le \\alpha \\le 180^\\circ')} luôn có ${m('\\sin\\alpha \\ge 0')}.`)},

  {kind:'kt', tag:'Kiến thức trọng tâm 3', title:'Hai góc bù nhau. Bảng giá trị đặc biệt',
   body: box(`${m('\\sin(180^\\circ - \\alpha) = \\sin\\alpha')}; &nbsp; ${m('\\cos(180^\\circ - \\alpha) = -\\cos\\alpha')}; &nbsp; ${m('\\tan(180^\\circ - \\alpha) = -\\tan\\alpha')}; &nbsp; ${m('\\cot(180^\\circ - \\alpha) = -\\cot\\alpha')}`) + TABLE +
     `<p>(Kí hiệu ${m('\\|')}: không xác định.)</p>`},

  {kind:'method', tag:'Dạng 1', title:'Tính giá trị lượng giác của góc đặc biệt',
   steps:[`Góc nhọn đặc biệt (${m('30^\\circ, 45^\\circ, 60^\\circ')}): dùng bảng giá trị.`,
     `Góc tù: viết ${m('\\alpha = 180^\\circ - \\beta')} (${m('\\beta')} nhọn) rồi dùng công thức góc bù – nhớ <b>đổi dấu</b> cos, tan, cot.`,
     `Thay các giá trị vào biểu thức rồi tính.`]},

  {kind:'vd', tag:'Ví dụ 1 · Dạng 1', label:'Ví dụ 1', de:`Tính ${m('\\sin 120^\\circ')}, ${m('\\cos 135^\\circ')}, ${m('\\tan 150^\\circ')}.`,
   sol:[`${m(`\\sin 120^\\circ = \\sin(180^\\circ - 60^\\circ) = \\sin 60^\\circ = ${R3}`)}.`,
     `${m(`\\cos 135^\\circ = -\\cos 45^\\circ = -${R2}`)}.`,
     `${m(`\\tan 150^\\circ = -\\tan 30^\\circ = -${T3}`)}.`]},

  {kind:'vd', tag:'Ví dụ 2 · Dạng 1', label:'Ví dụ 2', de:`Tính giá trị biểu thức ${d('A = 2\\sin 150^\\circ + \\cos 120^\\circ - \\tan 135^\\circ')}`,
   sol:[`${m(`\\sin 150^\\circ = ${H}`)}; ${m(`\\cos 120^\\circ = -${H}`)}; ${m('\\tan 135^\\circ = -1')}.`,
     `${m(`A = 2\\cdot ${H} + \\left(-${H}\\right) - (-1) = 1 - ${H} + 1`)}.`],
   ans:`${tb(`A = ${tf(3,2)}`)}.`},

  {kind:'method', tag:'Dạng 2', title:'Biết một giá trị lượng giác, tính các giá trị còn lại',
   steps:[`Dùng ${m('\\sin^2\\alpha + \\cos^2\\alpha = 1')} (hoặc ${m('1 + \\tan^2\\alpha = \\dfrac{1}{\\cos^2\\alpha}')}) để tìm giá trị còn thiếu.`,
     `<b>Xét dấu</b>: ${m('\\sin\\alpha \\ge 0')}; góc tù thì ${m('\\cos, \\tan, \\cot')} âm.`,
     `Tính ${m('\\tan\\alpha = \\dfrac{\\sin\\alpha}{\\cos\\alpha}')}, ${m('\\cot\\alpha = \\dfrac{1}{\\tan\\alpha}')}.`]},

  {kind:'vd', tag:'Ví dụ 3 · Dạng 2', label:'Ví dụ 3', de:`Cho ${m(`\\sin\\alpha = ${tf(3,5)}`)} với ${m('90^\\circ \\lt \\alpha \\lt 180^\\circ')}. Tính ${m('\\cos\\alpha,\\ \\tan\\alpha,\\ \\cot\\alpha')}.`,
   sol:[`${m(`\\cos^2\\alpha = 1 - \\sin^2\\alpha = 1 - ${tf(9,25)} = ${tf(16,25)}`)}.`,
     `${m('\\alpha')} là góc tù nên ${m('\\cos\\alpha \\lt 0')}: ${m(`\\cos\\alpha = -${tf(4,5)}`)}.`,
     `${m(`\\tan\\alpha = ${tf(3,5)} : \\left(-${tf(4,5)}\\right) = -${tf(3,4)}`)}; ${m(`\\cot\\alpha = -${tf(4,3)}`)}.`],
   ans:`${tb(`\\cos\\alpha = -${tf(4,5)},\\ \\tan\\alpha = -${tf(3,4)},\\ \\cot\\alpha = -${tf(4,3)}`)}.`},

  {kind:'vd', tag:'Ví dụ 4 · Dạng 2', label:'Ví dụ 4', de:`Cho ${m(`\\cos\\alpha = -${tf(1,3)}`)} với ${m('0^\\circ \\le \\alpha \\le 180^\\circ')}. Tính ${m('\\sin\\alpha')} và ${m('\\tan\\alpha')}.`,
   sol:[`${m(`\\sin^2\\alpha = 1 - ${tf(1,9)} = ${tf(8,9)}`)}.`,
     `Vì ${m('\\sin\\alpha \\ge 0')} nên ${m(`\\sin\\alpha = ${tf('2\\sqrt{2}',3)}`)}.`,
     `${m(`\\tan\\alpha = ${tf('2\\sqrt{2}',3)} : \\left(-${tf(1,3)}\\right) = -2\\sqrt{2}`)}.`],
   ans:`${tb(`\\sin\\alpha = ${tf('2\\sqrt{2}',3)},\\ \\tan\\alpha = -2\\sqrt{2}`)}.`},

  {kind:'vd', tag:'Ví dụ 5 · Dạng 2', label:'Ví dụ 5', de:`Cho ${m('\\tan\\alpha = -2')} với ${m('0^\\circ \\le \\alpha \\le 180^\\circ')}. Tính ${m('\\cos\\alpha')} và ${m('\\sin\\alpha')}.`,
   sol:[`${m(`\\dfrac{1}{\\cos^2\\alpha} = 1 + \\tan^2\\alpha = 5 \;\\Rightarrow\; \\cos^2\\alpha = ${tf(1,5)}`)}.`,
     `${m('\\tan\\alpha \\lt 0')} nên ${m('\\alpha')} tù, ${m('\\cos\\alpha \\lt 0')}: ${m(`\\cos\\alpha = -${tf(1,'\\sqrt{5}')} = -${tf('\\sqrt{5}',5)}`)}.`,
     `${m(`\\sin\\alpha = \\tan\\alpha\\cdot\\cos\\alpha = (-2)\\cdot\\left(-${tf('\\sqrt{5}',5)}\\right) = ${tf('2\\sqrt{5}',5)}`)}.`]},

  {kind:'method', tag:'Dạng 3', title:'Tính giá trị biểu thức, chứng minh đẳng thức',
   steps:[`Ghép các cặp góc <b>bù nhau</b> (tổng ${m('180^\\circ')}) để đưa về cùng một góc.`,
     `Dùng ${m('\\sin^2\\alpha + \\cos^2\\alpha = 1')}, ${m('\\tan\\alpha\\cdot\\cot\\alpha = 1')} để rút gọn.`,
     `Chứng minh: biến đổi vế phức tạp về vế đơn giản.`]},

  {kind:'vd', tag:'Ví dụ 6 · Dạng 3', label:'Ví dụ 6', de:`Tính ${d('B = \\cos 10^\\circ + \\cos 170^\\circ + \\sin 80^\\circ - \\sin 100^\\circ')}`,
   sol:[`${m('10^\\circ + 170^\\circ = 180^\\circ')} nên ${m('\\cos 170^\\circ = -\\cos 10^\\circ')}.`,
     `${m('80^\\circ + 100^\\circ = 180^\\circ')} nên ${m('\\sin 100^\\circ = \\sin 80^\\circ')}.`,
     `${m('B = \\cos 10^\\circ - \\cos 10^\\circ + \\sin 80^\\circ - \\sin 80^\\circ')}.`], ans:`${tb('B = 0')}.`},

  {kind:'vd', tag:'Ví dụ 7 · Dạng 3', label:'Ví dụ 7', de:`Chứng minh rằng với mọi góc ${m('\\alpha')} (${m('0^\\circ \\le \\alpha \\le 180^\\circ')}): ${d('(\\sin\\alpha + \\cos\\alpha)^2 = 1 + 2\\sin\\alpha\\cos\\alpha')}`,
   sol:[`Khai triển vế trái: ${m('(\\sin\\alpha + \\cos\\alpha)^2 = \\sin^2\\alpha + 2\\sin\\alpha\\cos\\alpha + \\cos^2\\alpha')}.`,
     `Nhóm: ${m('= (\\sin^2\\alpha + \\cos^2\\alpha) + 2\\sin\\alpha\\cos\\alpha = 1 + 2\\sin\\alpha\\cos\\alpha')} (điều phải chứng minh).`]},

  {kind:'lt', tag:'Luyện tập', label:'Bài 1', de:`Tính ${m('C = \\cos 150^\\circ + \\sin 120^\\circ + \\tan 45^\\circ')}.`,
   sol:[`${m(`C = -${R3} + ${R3} + 1`)}.`], ans:`${tb('C = 1')}.`},
  {kind:'lt', tag:'Luyện tập', label:'Bài 2', de:`Cho ${m(`\\cos\\alpha = ${tf(4,5)}`)} với ${m('0^\\circ \\lt \\alpha \\lt 90^\\circ')}. Tính ${m('\\sin\\alpha')} và ${m('\\tan\\alpha')}.`,
   sol:[`${m(`\\sin^2\\alpha = 1 - ${tf(16,25)} = ${tf(9,25)}`)}, ${m('\\sin\\alpha \\gt 0')} nên ${m(`\\sin\\alpha = ${tf(3,5)}`)}.`, `${m(`\\tan\\alpha = ${tf(3,5)} : ${tf(4,5)} = ${tf(3,4)}`)}.`]},

  {kind:'sum', tag:'Tổng kết', title:'Ghi nhớ',
   body:`<ul><li>${m('\\sin\\alpha = y_0,\\ \\cos\\alpha = x_0')} với ${m('M(x_0;\\,y_0)')} trên nửa đường tròn đơn vị.</li>
     <li>Góc tù: ${m('\\sin \\gt 0')}; ${m('\\cos, \\tan, \\cot \\lt 0')}.</li>
     <li>Góc bù: sin <b>giữ nguyên</b>; cos, tan, cot <b>đổi dấu</b>.</li>
     <li>${m('\\sin^2\\alpha + \\cos^2\\alpha = 1')} – nhớ xét dấu khi khai căn.</li></ul>` +
     box('Về nhà: làm các bài tập cuối Bài 5 trong SGK; luyện thêm trên web <b>Học mà chơi</b> – Toán 10, Bài 5.')},
]},

/* ---------------- BÀI 6 ---------------- */
{ id:'bai-6', name:'Bài 6. Hệ thức lượng trong tam giác', desc:'Định lí côsin, định lí sin, công thức diện tích, giải tam giác; 4 dạng, 7 ví dụ, bài toán thực tế.', slides:[
  {kind:'title', tag:'Toán 10 · Kết nối tri thức · Chương III', title:'Bài 6. Hệ thức lượng trong tam giác', sub:'Mục tiêu bài học', points:[
    'Vận dụng định lí côsin, định lí sin để tính cạnh, góc.',
    'Tính diện tích tam giác, bán kính đường tròn ngoại tiếp, nội tiếp.',
    'Giải tam giác và giải quyết bài toán thực tế (đo khoảng cách, diện tích).']},

  {kind:'kt', tag:'Kiến thức trọng tâm 1', title:'Định lí côsin', fig:TRI({a:7,b:5,c:8,la:'a',lb:'b',lc:'c',gA:'A'}),
   body:`<p>Trong tam giác ${m('ABC')} với ${m('BC = a,\\ CA = b,\\ AB = c')}:</p>` +
     box(`${m('a^2 = b^2 + c^2 - 2bc\\cos A')}<br>${m('b^2 = c^2 + a^2 - 2ca\\cos B')}<br>${m('c^2 = a^2 + b^2 - 2ab\\cos C')}`) +
     `<p><b>Hệ quả:</b> ${m('\\cos A = \\dfrac{b^2 + c^2 - a^2}{2bc}')} (tương tự cho ${m('\\cos B, \\cos C')}).</p>` + note(`Khi ${m('A = 90^\\circ')}: định lí côsin trở thành định lí Pythagore.`)},

  {kind:'kt', tag:'Kiến thức trọng tâm 2', title:'Định lí sin', fig:TRI({a:6,b:7,c:8,la:'a',lb:'b',lc:'c',gA:'A',gB:'B',gC:'C'}),
   body: box(`${d('\\dfrac{a}{\\sin A} = \\dfrac{b}{\\sin B} = \\dfrac{c}{\\sin C} = 2R')}trong đó ${m('R')} là bán kính đường tròn ngoại tiếp tam giác.`) +
     `<p>Suy ra: ${m('a = 2R\\sin A')}, ${m('\\sin A = \\dfrac{a}{2R}')}, ${m('R = \\dfrac{a}{2\\sin A}')}.</p>`},

  {kind:'kt', tag:'Kiến thức trọng tâm 3', title:'Công thức tính diện tích tam giác',
   body: box(`${m('S = \\dfrac{1}{2}ab\\sin C = \\dfrac{1}{2}bc\\sin A = \\dfrac{1}{2}ca\\sin B')}`) +
     `<p>• ${m('S = \\dfrac{abc}{4R}')} &nbsp;(${m('R')}: bán kính đường tròn ngoại tiếp)</p><p>• ${m('S = pr')} &nbsp;(${m('p = \\dfrac{a + b + c}{2}')}, ${m('r')}: bán kính đường tròn nội tiếp)</p>
      <p>• Công thức Heron: ${m('S = \\sqrt{p(p - a)(p - b)(p - c)}')}</p>`},

  {kind:'kt', tag:'Kiến thức trọng tâm 4', title:'Giải tam giác',
   body:`<p>Giải tam giác là tìm các cạnh, các góc còn lại khi biết một số yếu tố (trong đó có ít nhất một cạnh).</p>
     <table class="lk-table lk-left"><tr><th>Đã biết</th><th>Dùng</th></tr>
     <tr><td>Hai cạnh và góc xen giữa</td><td>Định lí côsin (tìm cạnh thứ ba)</td></tr>
     <tr><td>Ba cạnh</td><td>Hệ quả định lí côsin (tìm góc)</td></tr>
     <tr><td>Một cạnh và hai góc</td><td>Tổng ba góc ${m('180^\\circ')} và định lí sin</td></tr></table>`},

  {kind:'method', tag:'Dạng 1', title:'Tính cạnh, góc bằng định lí côsin',
   steps:[`Biết hai cạnh và góc xen giữa: ${m('a^2 = b^2 + c^2 - 2bc\\cos A')}, rồi khai căn.`,
     `Biết ba cạnh: ${m('\\cos A = \\dfrac{b^2 + c^2 - a^2}{2bc}')}, suy ra góc (bảng giá trị hoặc máy tính).`]},

  {kind:'vd', tag:'Ví dụ 1 · Dạng 1', label:'Ví dụ 1', de:`Cho tam giác ${m('ABC')} có ${m('AB = 5,\\ AC = 8')} và ${m('\\widehat{A} = 60^\\circ')}. Tính ${m('BC')}.`,
   fig:TRI({a:7,b:8,c:5,la:'?',lb:'8',lc:'5',gA:'60°'}),
   sol:[`Theo định lí côsin: ${m('BC^2 = AB^2 + AC^2 - 2\\cdot AB\\cdot AC\\cdot\\cos A')}.`,
     `${m(`BC^2 = 5^2 + 8^2 - 2\\cdot 5\\cdot 8\\cdot ${H} = 25 + 64 - 40 = 49`)}.`], ans:`${tb('BC = 7')}.`},

  {kind:'vd', tag:'Ví dụ 2 · Dạng 1', label:'Ví dụ 2', de:`Cho tam giác ${m('ABC')} có ${m('BC = 7,\\ CA = 3,\\ AB = 5')}. Tính góc ${m('A')}.`,
   fig:TRI({a:7,b:3,c:5,la:'7',lb:'3',lc:'5',gA:'?'}),
   sol:[`${m(`\\cos A = \\dfrac{AB^2 + AC^2 - BC^2}{2\\cdot AB\\cdot AC} = \\dfrac{25 + 9 - 49}{2\\cdot 5\\cdot 3} = \\dfrac{-15}{30} = -${H}`)}.`,
     `Suy ra ${m('\\widehat{A} = 120^\\circ')} (góc tù vì ${m('\\cos A \\lt 0')}).`], ans:`${tb('\\widehat{A} = 120^\\circ')}.`},

  {kind:'method', tag:'Dạng 2', title:'Vận dụng định lí sin',
   steps:[`Biết hai góc: tính góc thứ ba ${m('C = 180^\\circ - A - B')}.`,
     `Tính cạnh: ${m('b = \\dfrac{a\\sin B}{\\sin A}')}; tính ${m('R = \\dfrac{a}{2\\sin A}')}.`]},

  {kind:'vd', tag:'Ví dụ 3 · Dạng 2', label:'Ví dụ 3', de:`Cho tam giác ${m('ABC')} có ${m('BC = 6')}, ${m('\\widehat{A} = 30^\\circ')}, ${m('\\widehat{B} = 45^\\circ')}. Tính ${m('\\widehat{C}')}, cạnh ${m('AC')} và bán kính ${m('R')} của đường tròn ngoại tiếp.`,
   sol:[`${m('\\widehat{C} = 180^\\circ - 30^\\circ - 45^\\circ = 105^\\circ')}.`,
     `${m(`AC = \\dfrac{BC\\cdot\\sin B}{\\sin A} = \\dfrac{6\\cdot ${R2}}{${H}} = 6\\sqrt{2}`)}.`,
     `${m(`R = \\dfrac{BC}{2\\sin A} = \\dfrac{6}{2\\cdot ${H}} = 6`)}.`],
   ans:`${tb('\\widehat{C} = 105^\\circ,\\ AC = 6\\sqrt{2},\\ R = 6')}.`},

  {kind:'method', tag:'Dạng 3', title:'Tính diện tích, bán kính R, r',
   steps:[`Biết hai cạnh và góc xen giữa: ${m('S = \\dfrac{1}{2}bc\\sin A')}.`, `Biết ba cạnh: công thức Heron (tính ${m('p')} trước).`,
     `Sau khi có ${m('S')}: ${m('R = \\dfrac{abc}{4S}')}, ${m('r = \\dfrac{S}{p}')}.`]},

  {kind:'vd', tag:'Ví dụ 4 · Dạng 3', label:'Ví dụ 4', de:`Tính diện tích tam giác ${m('ABC')} có ${m('AB = 8,\\ AC = 6')} và ${m('\\widehat{A} = 30^\\circ')}.`,
   fig:TRI({a:4.1,b:6,c:8,lb:'6',lc:'8',gA:'30°'}),
   sol:[`${m(`S = \\dfrac{1}{2}\\cdot AB\\cdot AC\\cdot\\sin A = \\dfrac{1}{2}\\cdot 8\\cdot 6\\cdot ${H}`)}.`], ans:`${tb('S = 12')} (đơn vị diện tích).`},

  {kind:'vd', tag:'Ví dụ 5 · Dạng 3', label:'Ví dụ 5', de:`Cho tam giác có ba cạnh ${m('a = 13,\\ b = 14,\\ c = 15')}. Tính diện tích ${m('S')}, bán kính ${m('R')} và ${m('r')}.`,
   fig:TRI({a:13,b:14,c:15,la:'13',lb:'14',lc:'15'}),
   sol:[`Nửa chu vi ${m('p = \\dfrac{13 + 14 + 15}{2} = 21')}.`,
     `${m('S = \\sqrt{21\\cdot 8\\cdot 7\\cdot 6} = \\sqrt{7056} = 84')}.`,
     `${m('R = \\dfrac{abc}{4S} = \\dfrac{13\\cdot 14\\cdot 15}{4\\cdot 84} = \\dfrac{65}{8}')}; &nbsp; ${m('r = \\dfrac{S}{p} = \\dfrac{84}{21} = 4')}.`],
   ans:`${tb(`S = 84,\\ R = ${tf(65,8)},\\ r = 4`)}.`},

  {kind:'method', tag:'Dạng 4', title:'Bài toán thực tế',
   steps:[`Vẽ hình, xác định tam giác chứa đại lượng cần tìm.`, `Ghi các yếu tố đã biết (cạnh, góc) lên hình.`,
     `Chọn công thức phù hợp (côsin, sin, diện tích) rồi tính; trả lời có đơn vị.`]},

  {kind:'vd', tag:'Ví dụ 6 · Dạng 4', label:'Ví dụ 6', fig:TRI({a:140,b:60,c:100,la:'?',lb:'60 m',lc:'100 m',gA:'120°'}),
   de:`Hai điểm ${m('B, C')} ở hai bên bờ hồ. Chọn điểm ${m('A')} với ${m('AB = 100')} m, ${m('AC = 60')} m, ${m('\\widehat{BAC} = 120^\\circ')}. Tính ${m('BC')}.`,
   sol:[`Biết hai cạnh và góc xen giữa: dùng định lí côsin.`,
     `${m(`BC^2 = 100^2 + 60^2 - 2\\cdot 100\\cdot 60\\cdot\\left(-${H}\\right)`)}`,
     `${m('BC^2 = 10000 + 3600 + 6000 = 19600')}.`], ans:`${tb('BC = 140')} m.`},

  {kind:'vd', tag:'Ví dụ 7 · Dạng 4', label:'Ví dụ 7', fig:TRI({a:48.4,b:20,c:30,lb:'20 m',lc:'30 m',gA:'150°'}),
   de:`Một mảnh đất hình tam giác có hai cạnh dài ${m('20')} m và ${m('30')} m, góc xen giữa hai cạnh đó bằng ${m('150^\\circ')}. Tính diện tích mảnh đất.`,
   sol:[`${m('S = \\dfrac{1}{2}\\cdot 20\\cdot 30\\cdot\\sin 150^\\circ')}; ${m(`\\sin 150^\\circ = \\sin 30^\\circ = ${H}`)}.`,
     `${m(`S = \\dfrac{1}{2}\\cdot 600\\cdot ${H} = 150`)}.`], ans:`${tb('S = 150')} m².`},

  {kind:'lt', tag:'Luyện tập', label:'Bài 1', de:`Cho tam giác ${m('ABC')} có ${m('AB = 8,\\ AC = 3,\\ \\widehat{A} = 60^\\circ')}. Tính ${m('BC')}.`,
   sol:[`${m(`BC^2 = 64 + 9 - 2\\cdot 8\\cdot 3\\cdot ${H} = 49`)}.`], ans:`${tb('BC = 7')}.`},
  {kind:'lt', tag:'Luyện tập', label:'Bài 2', de:`Tính diện tích tam giác có ba cạnh ${m('5,\\ 5,\\ 6')}.`,
   sol:[`${m('p = 8')}; ${m('S = \\sqrt{8\\cdot 3\\cdot 3\\cdot 2} = \\sqrt{144}')}.`], ans:`${tb('S = 12')}.`},

  {kind:'sum', tag:'Tổng kết', title:'Ghi nhớ',
   body:`<ul><li>Định lí côsin: ${m('a^2 = b^2 + c^2 - 2bc\\cos A')}; hệ quả tính ${m('\\cos A')}.</li>
     <li>Định lí sin: ${m('\\dfrac{a}{\\sin A} = \\dfrac{b}{\\sin B} = \\dfrac{c}{\\sin C} = 2R')}.</li>
     <li>Diện tích: ${m('\\dfrac{1}{2}bc\\sin A')}, ${m('\\dfrac{abc}{4R}')}, ${m('pr')}, Heron.</li>
     <li>Bài toán thực tế: vẽ hình → ghi dữ kiện → chọn công thức.</li></ul>` +
     box('Về nhà: làm các bài tập cuối Bài 6 trong SGK; luyện thêm trên web <b>Học mà chơi</b> – Toán 10, Bài 6.')},
]},

/* ---------------- ÔN TẬP CHƯƠNG III ---------------- */
{ id:'on-tap-c3', name:'Ôn tập chương III', desc:'Sơ đồ kiến thức; ví dụ giải tam giác trọn vẹn; luyện tập tổng hợp.', slides:[
  {kind:'title', tag:'Toán 10 · Kết nối tri thức', title:'Ôn tập chương III', sub:'Hệ thức lượng trong tam giác', points:['Hệ thống kiến thức Bài 5, Bài 6.','Giải một tam giác trọn vẹn: cạnh, góc, diện tích, bán kính.']},
  {kind:'sum', tag:'Hệ thống kiến thức', title:'Sơ đồ ghi nhớ',
   body:`<ol class="lk-steps"><li><b>Giá trị lượng giác</b> ${m('0^\\circ \\to 180^\\circ')}: nửa đường tròn đơn vị; góc bù (sin giữ nguyên, còn lại đổi dấu); ${m('\\sin^2\\alpha + \\cos^2\\alpha = 1')}.</li>
     <li><b>Định lí côsin</b>: tìm cạnh khi biết hai cạnh và góc xen giữa; tìm góc khi biết ba cạnh.</li>
     <li><b>Định lí sin</b>: tìm cạnh khi biết hai góc; tìm ${m('R')}.</li>
     <li><b>Diện tích</b>: ${m('\\dfrac{1}{2}bc\\sin A')}, Heron, ${m('\\dfrac{abc}{4R}')}, ${m('pr')}.</li></ol>`},
  {kind:'vd', tag:'Ví dụ tổng hợp', label:'Ví dụ', fig:TRI({a:7,b:5,c:8,la:'?',lb:'5',lc:'8',gA:'60°'}),
   de:`Cho tam giác ${m('ABC')} có ${m('AB = 8,\\ AC = 5,\\ \\widehat{A} = 60^\\circ')}. Tính ${m('BC')}, diện tích ${m('S')} và bán kính ${m('R')} của đường tròn ngoại tiếp.`,
   sol:[`${m(`BC^2 = 64 + 25 - 2\\cdot 8\\cdot 5\\cdot ${H} = 49`)} ⇒ ${m('BC = 7')}.`,
     `${m(`S = \\dfrac{1}{2}\\cdot 8\\cdot 5\\cdot\\sin 60^\\circ = 20\\cdot ${R3} = 10\\sqrt{3}`)}.`,
     `${m(`R = \\dfrac{BC}{2\\sin A} = \\dfrac{7}{2\\cdot ${R3}} = \\dfrac{7}{\\sqrt{3}} = \\dfrac{7\\sqrt{3}}{3}`)}.`],
   ans:`${tb(`BC = 7,\\ S = 10\\sqrt{3},\\ R = ${tf('7\\sqrt{3}',3)}`)}.`},
  {kind:'lt', tag:'Luyện tập', label:'Bài 1', de:`Tính ${m('\\sin 135^\\circ + \\cos 135^\\circ + \\tan 120^\\circ\\cdot\\cot 120^\\circ')}.`,
   sol:[`${m(`${R2} - ${R2} + 1`)} (vì ${m('\\tan\\alpha\\cdot\\cot\\alpha = 1')}).`], ans:`${tb('1')}.`},
  {kind:'lt', tag:'Luyện tập', label:'Bài 2', de:`Tam giác có ba cạnh ${m('6,\\ 8,\\ 11')} là tam giác nhọn, vuông hay tù?`,
   sol:[`Cạnh lớn nhất là 11: ${m('6^2 + 8^2 - 11^2 = 100 - 121 = -21 \\lt 0')}.`, `Góc đối diện cạnh 11 có cosin âm nên là góc tù.`], ans:`Tam giác <b>tù</b>.`},
  {kind:'sum', tag:'Tổng kết', title:'Chuẩn bị kiểm tra',
   body:`<ul><li>Thuộc bảng giá trị đặc biệt và công thức góc bù.</li><li>Nhận biết khi nào dùng định lí côsin, khi nào dùng định lí sin.</li><li>Bài toán thực tế: luôn vẽ hình và ghi đơn vị.</li></ul>` +
     box('Luyện thêm: web <b>Học mà chơi</b> – Toán 10, Ôn tập chương III (3 mức độ).')},
]},
]});
}
})();

/* =====================================================================
   ÔN TẬP GIỮA HỌC KÌ I (Chương I – II – III) – có hình vẽ. Cùng mã bài 'on-tap-giua-ki-1' với phần học sinh luyện tập.
   Đề ôn tập 5 đề (12 TN + 4 Đ/S + 6 TLN): giao-vien/bai-giang/lop10-giua-ki.js (mục “Kiểm tra”).
   ===================================================================== */
(() => {
const m = tm, box = h => `<div class="lk-box">${h}</div>`, note = h => `<div class="lk-note">⚠️ ${h}</div>`;
const sys = rows => tsys(rows);
const F_miền = () => planeSVG({x:[-1,6], y:[-1,6], lines:[[1,1,4,false,'d₁'],[1,-1,2,false,'d₂']], hatch:[[-1,0,0],[0,-1,0],[1,1,4],[1,-1,2]], pts:[[0,0,'O'],[2,0,'A'],[3,1,'B'],[0,4,'C']]});
const F_min = () => planeSVG({x:[-1,11], y:[-1,9], lines:[[2,1,8,false,'d₁'],[1,2,10,false,'d₂']], hatch:[[-1,0,0],[0,-1,0],[-2,-1,-8],[-1,-2,-10]], pts:[[2,4,'A'],[0,8,'B'],[10,0,'C']]});
const FRAC = (a, b) => tf(a, b);

Lecture.add({ grade:'lop10', gradeName:'Toán 10', chapter:'Ôn tập giữa học kì I', lessons:[
{ id:'on-tap-giua-ki-1', name:'Ôn tập giữa học kì I', desc:'Hệ thống Chương I – II – III; 9 ví dụ có hình vẽ (Venn, miền nghiệm, tối ưu, đo cây, cột cờ, tam giác nội tiếp); luyện tập tổng hợp. Có 5 đề ôn tập (mục Kiểm tra).', slides:[
  {kind:'title', tag:'Toán 10 · Kết nối tri thức · Giữa học kì I', title:'Ôn tập giữa học kì I', sub:'Mục tiêu', points:[
    'Hệ thống kiến thức Chương I (mệnh đề, tập hợp), Chương II (bất phương trình, hệ bất phương trình bậc nhất hai ẩn), Chương III (hệ thức lượng trong tam giác).',
    'Giải các dạng bài thường gặp trong đề: đếm bằng sơ đồ Venn, đọc hình miền nghiệm, bài toán tối ưu, tam giác, đo đạc thực tế.',
    'Làm quen cấu trúc đề: 12 trắc nghiệm · 4 đúng/sai · 6 trả lời ngắn.']},
  {kind:'sum', tag:'Hệ thống kiến thức', title:'Sơ đồ ghi nhớ ba chương', body:`<ol class="lk-steps">
    <li><b>Chương I.</b> Phủ định: ${m('\\forall \\leftrightarrow \\exists')} và đổi dấu so sánh (${m('\\gt \\to \\le')}). Tập hợp: ${m('A \\cap B,\\ A \\cup B,\\ A \\setminus B')}; ${m('n(A \\cup B) = n(A) + n(B) - n(A \\cap B)')}; tập hợp ${m('n')} phần tử có ${m('2^n')} tập con.</li>
    <li><b>Chương II.</b> Nghiệm = thay vào đúng; miền nghiệm = nửa mặt phẳng (điểm thử); nét đứt ↔ dấu ngặt; hệ → phần chung; tối ưu → giá trị tại các <b>đỉnh</b> của miền nghiệm.</li>
    <li><b>Chương III.</b> Góc bù: ${m('\\sin')} giữ nguyên, ${m('\\cos, \\tan, \\cot')} đổi dấu; ${m('\\sin^2\\alpha + \\cos^2\\alpha = 1')}; côsin ${m('a^2 = b^2 + c^2 - 2bc\\cos A')}; sin ${m('\\dfrac{a}{\\sin A} = 2R')}; diện tích ${m('S = \\dfrac{1}{2}bc\\sin A = \\sqrt{p(p-a)(p-b)(p-c)} = pr = \\dfrac{abc}{4R}')}.</li></ol>`},

  {kind:'method', tag:'Dạng 1 · Chương I', title:'Đếm bằng sơ đồ Venn; phủ định; phép toán tập hợp', steps:[
    `Vẽ sơ đồ Venn, điền số vào phần giao trước (${m('A \\cap B')}).`,
    `Phần chỉ thuộc ${m('A')} = ${m('n(A) - n(A \\cap B)')}; hợp = ${m('n(A) + n(B) - n(A \\cap B)')}; ngoài cả hai = tổng − hợp.`,
    `Phủ định: đổi lượng từ ${m('\\forall \\leftrightarrow \\exists')} và đổi dấu so sánh; xét tính đúng sai bằng cách đánh giá biểu thức.`,
    'Khoảng, đoạn: vẽ trục số, chú ý ngoặc tròn/vuông ở đầu mút.']},
  {kind:'vd', tag:'Ví dụ 1 · Sơ đồ Venn', label:'Ví dụ 1', fig:venn2SVG({labelA:'Bóng đá', labelB:'Bóng rổ', aOnly:14, both:9, bOnly:9, none:13}), figAt:3,
   de:`Lớp 10A có 45 học sinh; 23 em tham gia câu lạc bộ bóng đá, 18 em tham gia câu lạc bộ bóng rổ và 9 em tham gia cả hai. Hỏi: a) có bao nhiêu em tham gia ít nhất một câu lạc bộ? b) bao nhiêu em chỉ tham gia bóng đá? c) bao nhiêu em không tham gia câu lạc bộ nào?`,
   sol:[`Điền giao: ${m('n(A \\cap B) = 9')}.`, `a) ${m('n(A \\cup B) = 23 + 18 - 9 = 32')} em.`, `b) Chỉ bóng đá: ${m('23 - 9 = 14')} em. c) Không tham gia: ${m('45 - 32 = 13')} em.`],
   ans:`${tb('32')} em; ${tb('14')} em; ${tb('13')} em.`},
  {kind:'vd', tag:'Ví dụ 2 · Phủ định và tập hợp', label:'Ví dụ 2',
   de:`a) Lập mệnh đề phủ định của ${m('P: \\forall x \\in \\mathbb{R},\\ x^2 - 4x + 5 \\gt 0')} và cho biết mệnh đề nào đúng. b) Cho ${m('A = (-3;\\ 2]')}, ${m('B = [0;\\ 5)')}. Tìm ${m('A \\cap B,\\ A \\cup B,\\ A \\setminus B')}.`,
   sol:[`a) ${m('\\overline{P}: \\exists x \\in \\mathbb{R},\\ x^2 - 4x + 5 \\le 0')}.`, `${m('x^2 - 4x + 5 = (x-2)^2 + 1 \\ge 1 \\gt 0')} với mọi ${m('x')} nên ${m('P')} đúng, ${m('\\overline{P}')} sai.`,
     `b) Trên trục số: ${m('A \\cap B = [0;\\ 2]')} (0 thuộc ${m('B')}, 2 thuộc ${m('A')}).`, `${m('A \\cup B = (-3;\\ 5)')} (hai đầu mút đều không lấy); ${m('A \\setminus B = (-3;\\ 0)')} (0 thuộc ${m('B')} nên bị loại).`],
   ans:`${tb('P')} đúng; ${tb('A \\cap B = [0;\\ 2]')}, ${tb('A \\cup B = (-3;\\ 5)')}, ${tb('A \\setminus B = (-3;\\ 0)')}.`},

  {kind:'method', tag:'Dạng 2 · Chương II', title:'Đọc hình miền nghiệm; bài toán tối ưu', steps:[
    'Mỗi đường thẳng biên: nét liền → có dấu bằng; nét đứt → dấu ngặt. Lấy điểm thử (gốc toạ độ) để chọn phía được giữ lại.',
    'Phần <b>không bị gạch</b> là miền nghiệm của hệ; viết lần lượt từng bất phương trình.',
    `Tối ưu: lập ràng buộc (“tối đa” ${m('\\le')}, “ít nhất” ${m('\\ge')}), tìm <b>các đỉnh</b> của miền nghiệm, tính ${m('F')} tại từng đỉnh rồi so sánh.`]},
  {kind:'vd', tag:'Ví dụ 3 · Đọc hình', label:'Ví dụ 3', fig:F_miền(), figAt:0,
   de:`Phần không bị gạch trong hình (kể cả biên) là miền nghiệm của hệ bất phương trình nào? Tìm các đỉnh của miền nghiệm.`,
   sol:[`Hai đường ${m('d_1, d_2')} nét liền → có dấu bằng. ${m('d_1: x + y = 4')} đi qua ${m('(4;\\ 0), (0;\\ 4)')}; ${m('d_2: x - y = 2')} đi qua ${m('(2;\\ 0), (0;\\ -2)')}.`,
     `Điểm thử ${m('O(0;\\ 0)')} nằm ở phần không gạch: ${m('0 + 0 \\le 4')} và ${m('0 - 0 \\le 2')} đều đúng ⇒ ${m('x + y \\le 4')}, ${m('x - y \\le 2')}.`,
     `Phần không gạch nằm trong góc phần tư thứ nhất: ${m('x \\ge 0,\\ y \\ge 0')}.`, `Các đỉnh: ${m('O(0;\\ 0),\\ A(2;\\ 0),\\ B(3;\\ 1),\\ C(0;\\ 4)')} (B là giao điểm của ${m('d_1, d_2')}).`],
   ans:`${tb(`\\begin{cases}x \\ge 0 \\\\ y \\ge 0 \\\\ x + y \\le 4 \\\\ x - y \\le 2\\end{cases}`)}`},
  {kind:'vd', tag:'Ví dụ 4 · Giá trị lớn nhất', label:'Ví dụ 4', fig:F_miền(),
   de:`Với miền nghiệm ở Ví dụ 3, tìm giá trị lớn nhất của ${m('F(x;\\ y) = 3x + 2y')}.`,
   sol:[`Tại ${m('O(0;\\ 0)')}: ${m('F = 0')}; tại ${m('A(2;\\ 0)')}: ${m('F = 6')}.`, `Tại ${m('B(3;\\ 1)')}: ${m('F = 9 + 2 = 11')}; tại ${m('C(0;\\ 4)')}: ${m('F = 8')}.`, `So sánh: lớn nhất là ${m('11')}, đạt tại ${m('B(3;\\ 1)')}.`],
   ans:`${tb('F_{\\max} = 11')} tại ${m('B(3;\\ 1)')}.`},
  {kind:'vd', tag:'Ví dụ 5 · Chi phí nhỏ nhất', label:'Ví dụ 5', fig:F_min(),
   de:`Mỗi bao thức ăn ${m('X')} chứa 2 đơn vị chất ${m('A')}, 1 đơn vị chất ${m('B')}; mỗi bao ${m('Y')} chứa 1 đơn vị ${m('A')}, 2 đơn vị ${m('B')}. Hỗn hợp cần ít nhất 8 đơn vị ${m('A')} và 10 đơn vị ${m('B')}. Giá mỗi bao ${m('X')} là 3 nghìn đồng, ${m('Y')} là 4 nghìn đồng. Tìm chi phí nhỏ nhất.`,
   sol:[`Gọi ${m('x, y')} là số bao ${m('X, Y')}: ${m('x \\ge 0,\\ y \\ge 0,\\ 2x + y \\ge 8,\\ x + 2y \\ge 10')}; chi phí ${m('F = 3x + 4y')}.`,
     `Miền nghiệm (không bị chặn) có các đỉnh ${m('A(2;\\ 4),\\ B(0;\\ 8),\\ C(10;\\ 0)')}.`, `${m('F(A) = 6 + 16 = 22')}; ${m('F(B) = 32')}; ${m('F(C) = 30')}.`, `Chi phí nhỏ nhất ${m('22')} nghìn đồng, đạt khi mua 2 bao ${m('X')} và 4 bao ${m('Y')}.`],
   ans:`${tb('22')} nghìn đồng.`},

  {kind:'method', tag:'Dạng 3 · Chương III', title:'Giá trị lượng giác, tam giác, đo đạc thực tế', steps:[
    `Từ ${m('\\sin\\alpha')} suy ra ${m('\\cos\\alpha')} bằng ${m('\\sin^2\\alpha + \\cos^2\\alpha = 1')}, chọn dấu theo góc nhọn/tù.`,
    'Biết hai cạnh và góc xen giữa → định lí côsin; biết cạnh và góc đối → định lí sin (tìm R).',
    'Bài đo đạc: vẽ hình, dùng <b>góc ngoài</b> của tam giác để tìm góc ở ngọn rồi định lí sin; hoặc dùng tang trong tam giác vuông.']},
  {kind:'vd', tag:'Ví dụ 6 · Lượng giác', label:'Ví dụ 6',
   de:`Cho ${m('\\sin\\alpha = \\dfrac{5}{13}')} và ${m('90^\\circ \\lt \\alpha \\lt 180^\\circ')}. Tính ${m('\\cos\\alpha')}, ${m('\\tan\\alpha')} và ${m('P = \\sin\\alpha + 2\\cos\\alpha')}.`,
   sol:[`${m('\\cos^2\\alpha = 1 - \\dfrac{25}{169} = \\dfrac{144}{169}')}.`, `Góc ${m('\\alpha')} tù nên ${m('\\cos\\alpha \\lt 0')}: ${m('\\cos\\alpha = -\\dfrac{12}{13}')}.`, `${m('\\tan\\alpha = \\dfrac{\\sin\\alpha}{\\cos\\alpha} = -\\dfrac{5}{12}')}.`, `${m('P = \\dfrac{5}{13} + 2\\cdot\\left(-\\dfrac{12}{13}\\right) = -\\dfrac{19}{13}')}.`],
   ans:`${tb('\\cos\\alpha = -\\dfrac{12}{13};\\ \\tan\\alpha = -\\dfrac{5}{12};\\ P = -\\dfrac{19}{13}')}.`},
  {kind:'vd', tag:'Ví dụ 7 · Tam giác', label:'Ví dụ 7', fig:triSVG({a:7, b:8, c:5, la:'?', lb:'8', lc:'5', gA:'60°'}),
   de:`Tam giác ${m('ABC')} có ${m('AB = 5,\\ AC = 8,\\ \\widehat{A} = 60^\\circ')}. Tính ${m('BC')}, diện tích ${m('S')}, bán kính ${m('R')} và ${m('r')}.`,
   sol:[`${m('BC^2 = 25 + 64 - 2\\cdot 5\\cdot 8\\cdot\\dfrac{1}{2} = 49')} ⇒ ${m('BC = 7')}.`, `${m('S = \\dfrac{1}{2}\\cdot 5\\cdot 8\\cdot\\sin 60^\\circ = 10\\sqrt{3}')}.`, `${m('R = \\dfrac{BC}{2\\sin A} = \\dfrac{7}{\\sqrt{3}} = \\dfrac{7\\sqrt{3}}{3}')}.`, `${m('p = \\dfrac{5 + 7 + 8}{2} = 10')} nên ${m('r = \\dfrac{S}{p} = \\sqrt{3}')}.`],
   ans:`${tb('BC = 7;\\ S = 10\\sqrt{3};\\ R = \\dfrac{7\\sqrt{3}}{3};\\ r = \\sqrt{3}')}.`},
  {kind:'vd', tag:'Ví dụ 8 · Đo cây từ hai vị trí', label:'Ví dụ 8', fig:treeSVG({d:'20 m', a:'30°', b:'60°', h:'?'}),
   de:`Từ vị trí ${m('A')} người ta nhìn ngọn cây ${m('T')} dưới góc ${m('30^\\circ')} so với mặt đất; tiến thẳng về phía gốc cây 20 m đến ${m('B')} thì nhìn ngọn cây dưới góc ${m('60^\\circ')}. Tính chiều cao ${m('TH')} của cây.`,
   sol:[`Góc ngoài tại ${m('B')} của tam giác ${m('ATB')}: ${m('\\widehat{ATB} = 60^\\circ - 30^\\circ = 30^\\circ')}.`, `Tam giác ${m('ATB')} có ${m('\\widehat{A} = \\widehat{T} = 30^\\circ')} nên cân tại ${m('B')}: ${m('BT = AB = 20')}.`, `Trong tam giác vuông ${m('BHT')}: ${m('TH = BT\\sin 60^\\circ = 20\\cdot\\dfrac{\\sqrt{3}}{2} = 10\\sqrt{3} \\approx 17{,}3')} m.`],
   ans:`${tb('10\\sqrt{3} \\approx 17{,}3')} m.`},
  {kind:'vd', tag:'Ví dụ 9 · Cột cờ trên toà nhà', label:'Ví dụ 9', fig:obsSVG({h:'12 m', d:'15√3 m', a:'30°', b:'60°', hb:'27 m', hf:'30 m'}), figAt:3,
   de:`Anh Bắc đứng trên đài quan sát cao 12 m, cách toà nhà (theo phương ngang) ${m('15\\sqrt{3}')} m. Từ đài, anh nhìn chân cột cờ trên nóc toà nhà dưới góc ${m('30^\\circ')} và đỉnh cột cờ dưới góc ${m('60^\\circ')} so với phương ngang. Tính chiều cao của toà nhà và của cột cờ.`,
   sol:[`Phần toà nhà cao hơn tầm mắt: ${m('15\\sqrt{3}\\cdot\\tan 30^\\circ = 15')} m.`, `Chiều cao toà nhà: ${m('12 + 15 = 27')} m.`, `Đỉnh cột cờ cao hơn tầm mắt ${m('15\\sqrt{3}\\cdot\\tan 60^\\circ = 45')} m, nên cột cờ cao ${m('45 - 15 = 30')} m.`],
   ans:`Toà nhà ${tb('27')} m; cột cờ ${tb('30')} m.`},
  {kind:'vd', tag:'Ví dụ 10 · Tam giác đều nội tiếp', label:'Ví dụ 10', fig:circTriSVG({R:'R = 6'}),
   de:`Tam giác đều ${m('ABC')} nội tiếp đường tròn bán kính ${m('R = 6')} cm. Tính cạnh và diện tích (làm tròn đến hàng phần mười).`,
   sol:[`${m('R = \\dfrac{a}{2\\sin 60^\\circ} = \\dfrac{a}{\\sqrt{3}}')} ⇒ ${m('a = 6\\sqrt{3}')} cm.`, `${m('S = \\dfrac{1}{2}a^2\\sin 60^\\circ = \\dfrac{1}{2}\\cdot 108\\cdot\\dfrac{\\sqrt{3}}{2} = 27\\sqrt{3} \\approx 46{,}8')} cm².`],
   ans:`${tb('a = 6\\sqrt{3}')} cm; ${tb('S \\approx 46{,}8')} cm².`},

  {kind:'lt', tag:'Luyện tập', label:'Bài 1', de:`Một nhóm 30 học sinh, có 16 em thích Toán, 14 em thích Văn, 5 em thích cả hai. Có bao nhiêu em không thích môn nào trong hai môn đó?`,
   sol:[`${m('n(A \\cup B) = 16 + 14 - 5 = 25')}.`, `${m('30 - 25 = 5')}.`], ans:`${tb('5')} em.`},
  {kind:'lt', tag:'Luyện tập', label:'Bài 2', de:`Điểm nào thuộc miền nghiệm của hệ ${m('\\begin{cases}x \\ge 0 \\\\ y \\ge 0 \\\\ 2x + y \\le 6\\end{cases}')}: ${m('M(1;\\ 3)')}, ${m('N(3;\\ 1)')}, ${m('P(2;\\ 2)')}?`,
   sol:[`${m('M')}: ${m('2 + 3 = 5 \\le 6')} ✓; ${m('N')}: ${m('6 + 1 = 7 \\gt 6')} ✗; ${m('P')}: ${m('4 + 2 = 6 \\le 6')} ✓.`], ans:`${tb('M')} và ${tb('P')}.`},
  {kind:'lt', tag:'Luyện tập', label:'Bài 3', de:`Tam giác ${m('ABC')} có ${m('a = 13,\\ b = 14,\\ c = 15')}. Tính ${m('S')} và ${m('R')}.`,
   sol:[`${m('p = 21')}, ${m('S = \\sqrt{21\\cdot 8\\cdot 7\\cdot 6} = 84')}.`, `${m('R = \\dfrac{abc}{4S} = \\dfrac{2730}{336} = \\dfrac{65}{8}')}.`], ans:`${tb('S = 84;\\ R = \\dfrac{65}{8}')}.`},
  {kind:'lt', tag:'Luyện tập', label:'Bài 4', de:`Để đo khoảng cách giữa hai điểm ${m('B, C')} bị ngăn cách bởi hồ nước, người ta chọn điểm ${m('A')} sao cho ${m('AB = 60')} m, ${m('AC = 80')} m, ${m('\\widehat{BAC} = 60^\\circ')}. Tính ${m('BC')}.`,
   fig:triSVG({a:72.1, b:80, c:60, la:'?', lb:'80', lc:'60', gA:'60°'}),
   sol:[`${m('BC^2 = 60^2 + 80^2 - 2\\cdot 60\\cdot 80\\cdot\\dfrac{1}{2} = 3600 + 6400 - 4800 = 5200')}.`, `${m('BC = 20\\sqrt{13} \\approx 72{,}1')} m.`], ans:`${tb('BC \\approx 72{,}1')} m.`},
  {kind:'sum', tag:'Tổng kết', title:'Lỗi hay mất điểm', body:`<ul><li>Quên trừ phần giao khi đếm hợp; nhầm “chỉ thuộc A” với |A|.</li><li>Phủ định ${m('\\gt')} thành ${m('\\lt')} (đúng là ${m('\\le')}); quên đổi ${m('\\forall \\leftrightarrow \\exists')}.</li><li>Chọn sai phía của miền nghiệm; nhầm nét đứt/nét liền.</li><li>Quên dấu âm của côsin, tang ở góc tù; dùng định lí sai trường hợp.</li><li>Bài đo đạc: không dùng góc ngoài; quên đơn vị và làm tròn.</li></ul>` +
     box('Luyện thêm: web <b>Học mà chơi</b> – Toán 10, chủ đề “Ôn tập giữa học kì I”; 5 đề ôn tập in A4 ở mục “Kiểm tra”.')},
]},
]});
})();
