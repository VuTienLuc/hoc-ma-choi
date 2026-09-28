/* =====================================================================
   BÀI GIẢNG LỚP 9 – Toán, Kết nối tri thức (giáo viên trình chiếu)
   Chương II. Phương trình và bất phương trình bậc nhất một ẩn (Bài 4 – Bài 6, Ôn tập)
   Cấu trúc trang chiếu: xem giao-vien/bai-giang/lop10.js và CLAUDE.md.
   ===================================================================== */
(() => {
const m = tm, d = td;
const box = h => `<div class="lk-box">${h}</div>`, note = h => `<div class="lk-note">⚠️ ${h}</div>`;
const S = t => `<p>${t}</p>`;
const TITLE = (name, pts) => ({kind:'title', tag:'Toán 9 · Kết nối tri thức · Chương II', title:name, sub:'Mục tiêu bài học', points:pts});
const HOME = n => box(`Về nhà: làm các bài tập cuối ${n} trong SGK; luyện thêm trên web <b>Học mà chơi</b> – Toán 9, ${n}.`);

Lecture.add({ grade:'lop9', gradeName:'Toán 9', chapter:'Chương II. Phương trình và bất phương trình bậc nhất một ẩn', lessons:[

/* ---------------- BÀI 4 ---------------- */
{ id:'bai-4', name:'Bài 4. Phương trình quy về phương trình bậc nhất một ẩn', desc:'Phương trình tích; điều kiện xác định; giải phương trình chứa ẩn ở mẫu.', slides:[
  TITLE('Bài 4. Phương trình quy về phương trình bậc nhất một ẩn', ['Giải được phương trình tích có dạng ' + m('(ax + b)(cx + d) = 0') + '.', 'Tìm được điều kiện xác định của phương trình chứa ẩn ở mẫu.', 'Giải được phương trình chứa ẩn ở mẫu quy về phương trình bậc nhất.']),

  {kind:'kt', tag:'Kiến thức trọng tâm 1', title:'Phương trình tích',
   body: box(d('(ax + b)(cx + d) = 0 \\Leftrightarrow ax + b = 0 \\text{ hoặc } cx + d = 0')) +
     S('Muốn giải: giải từng phương trình <b>ax + b = 0</b>, <b>cx + d = 0</b> rồi lấy tất cả các nghiệm.') +
     note(`Phải đưa về dạng <b>tích bằng 0</b> (chuyển hết sang một vế, phân tích thành nhân tử). Không chia hai vế cho biểu thức chứa ẩn.`)},

  {kind:'kt', tag:'Kiến thức trọng tâm 2', title:'Điều kiện xác định của phương trình',
   body: box('Điều kiện xác định (ĐKXĐ) của phương trình chứa ẩn ở mẫu: <b>tất cả các mẫu thức khác 0</b>.') +
     S(`Ví dụ: ${m('\\dfrac{1}{x - 2} = \\dfrac{3}{x}')} có ĐKXĐ ${m('x \\ne 2')} và ${m('x \\ne 0')}.`)},

  {kind:'kt', tag:'Kiến thức trọng tâm 3', title:'Các bước giải phương trình chứa ẩn ở mẫu',
   body:`<ol class="lk-steps"><li>Tìm điều kiện xác định.</li><li>Quy đồng mẫu hai vế rồi khử mẫu.</li><li>Giải phương trình vừa nhận được.</li><li><b>Đối chiếu điều kiện</b>, kết luận nghiệm.</li></ol>` +
     note('Giá trị tìm được ở bước 3 mà không thỏa ĐKXĐ thì <b>loại</b>.')},

  {kind:'method', tag:'Dạng 1', title:'Giải phương trình tích',
   steps:[`Chuyển mọi hạng tử sang vế trái, vế phải bằng 0.`, `Phân tích vế trái thành tích (đặt nhân tử chung, hằng đẳng thức).`, `Cho từng nhân tử bằng 0, giải và kết luận.`]},

  {kind:'vd', tag:'Ví dụ 1 · Dạng 1', label:'Ví dụ 1', de:`Giải phương trình ${m('(2x - 1)(x + 3) = 0')}.`,
   sol:[`${m('2x - 1 = 0 \\Leftrightarrow x = \\dfrac{1}{2}')}.`, `${m('x + 3 = 0 \\Leftrightarrow x = -3')}.`], ans:`Phương trình có hai nghiệm ${tb('x = \\tfrac{1}{2};\\ x = -3')}.`},

  {kind:'vd', tag:'Ví dụ 2 · Dạng 1', label:'Ví dụ 2', de:`Giải phương trình ${m('(x - 2)(x + 1) = 2(x - 2)')}.`,
   sol:[`Chuyển vế: ${m('(x - 2)(x + 1) - 2(x - 2) = 0')}.`, `Đặt nhân tử chung: ${m('(x - 2)(x + 1 - 2) = 0 \\Leftrightarrow (x - 2)(x - 1) = 0')}.`, `${m('x - 2 = 0')} hoặc ${m('x - 1 = 0')}.`], ans:`${tb('x = 2;\\ x = 1')}.`},

  {kind:'vd', tag:'Ví dụ 3 · Dạng 1', label:'Ví dụ 3', de:`Giải phương trình ${m('4x^2 - 1 = (2x + 1)(x + 3)')}.`,
   sol:[`${m('4x^2 - 1 = (2x - 1)(2x + 1)')}.`, `${m('(2x + 1)(2x - 1) - (2x + 1)(x + 3) = 0 \\Leftrightarrow (2x + 1)(x - 4) = 0')}.`], ans:`${tb('x = -\\tfrac{1}{2};\\ x = 4')}.`},

  {kind:'method', tag:'Dạng 2', title:'Tìm điều kiện xác định',
   steps:[`Liệt kê tất cả các mẫu có chứa ẩn.`, `Cho từng mẫu ${m('\\ne 0')} và giải.`, `Kết hợp các điều kiện (dùng chữ “và”).`]},

  {kind:'vd', tag:'Ví dụ 4 · Dạng 2', label:'Ví dụ 4', de:`Tìm điều kiện xác định của phương trình ${m('\\dfrac{x}{x - 2} + \\dfrac{1}{x + 3} = 2')}.`,
   sol:[`${m('x - 2 \\ne 0 \\Leftrightarrow x \\ne 2')}.`, `${m('x + 3 \\ne 0 \\Leftrightarrow x \\ne -3')}.`], ans:`ĐKXĐ: ${tb('x \\ne 2 \\text{ và } x \\ne -3')}.`},

  {kind:'method', tag:'Dạng 3', title:'Giải phương trình chứa ẩn ở mẫu',
   steps:[`Tìm ĐKXĐ.`, `Tìm mẫu thức chung (phân tích các mẫu thành nhân tử), quy đồng và khử mẫu.`, `Giải phương trình bậc nhất (hoặc phương trình tích) nhận được.`, `Đối chiếu ĐKXĐ, loại giá trị không thỏa mãn.`]},

  {kind:'vd', tag:'Ví dụ 5 · Dạng 3', label:'Ví dụ 5', de:`Giải phương trình ${m('\\dfrac{2}{x - 1} = \\dfrac{3}{x + 1}')}.`,
   sol:[`ĐKXĐ: ${m('x \\ne 1,\\ x \\ne -1')}.`, `Khử mẫu: ${m('2(x + 1) = 3(x - 1) \\Leftrightarrow 2x + 2 = 3x - 3')}.`, `${m('x = 5')} (thỏa mãn ĐKXĐ).`], ans:`${tb('x = 5')}.`},

  {kind:'vd', tag:'Ví dụ 6 · Dạng 3', label:'Ví dụ 6', de:`Giải phương trình ${m('\\dfrac{x}{x - 1} - \\dfrac{2}{x + 1} = \\dfrac{2}{x^2 - 1}')}.`,
   sol:[`ĐKXĐ: ${m('x \\ne \\pm 1')}. Mẫu thức chung ${m('x^2 - 1 = (x - 1)(x + 1)')}.`, `Khử mẫu: ${m('x(x + 1) - 2(x - 1) = 2 \\Leftrightarrow x^2 - x = 0')}.`, `${m('x(x - 1) = 0 \\Leftrightarrow x = 0 \\text{ hoặc } x = 1')}.`, `${m('x = 1')} không thỏa ĐKXĐ nên <b>loại</b>; ${m('x = 0')} thỏa mãn.`], ans:`${tb('x = 0')}.`},

  {kind:'lt', tag:'Luyện tập', label:'Bài 1', de:`Giải phương trình ${m('(3x + 2)(x - 5) = 0')}.`, sol:[`${m('3x + 2 = 0 \\Leftrightarrow x = -\\dfrac{2}{3}')}; &nbsp; ${m('x - 5 = 0 \\Leftrightarrow x = 5')}.`]},
  {kind:'lt', tag:'Luyện tập', label:'Bài 2', de:`Giải phương trình ${m('\\dfrac{3}{x + 2} = \\dfrac{1}{x - 2}')}.`,
   sol:[`ĐKXĐ: ${m('x \\ne \\pm 2')}.`, `${m('3(x - 2) = x + 2 \\Leftrightarrow 2x = 8 \\Leftrightarrow x = 4')} (thỏa mãn).`]},

  {kind:'sum', tag:'Tổng kết', title:'Ghi nhớ',
   body:`<ul><li>${m('A\\cdot B = 0 \\Leftrightarrow A = 0 \\text{ hoặc } B = 0')}.</li><li>Phương trình chứa ẩn ở mẫu: <b>ĐKXĐ → quy đồng, khử mẫu → giải → đối chiếu</b>.</li><li>Không chia hai vế cho biểu thức chứa ẩn; không quên loại nghiệm.</li></ul>` + HOME('Bài 4')},
]},

/* ---------------- BÀI 5 ---------------- */
{ id:'bai-5', name:'Bài 5. Bất đẳng thức và tính chất', desc:'Diễn đạt bằng lời; tính chất bắc cầu, liên hệ với phép cộng, phép nhân; chứng minh bất đẳng thức đơn giản.', slides:[
  TITLE('Bài 5. Bất đẳng thức và tính chất', ['Nhận biết bất đẳng thức; diễn đạt được bất đẳng thức bằng lời và ngược lại.', 'Vận dụng tính chất bắc cầu, liên hệ với phép cộng, phép nhân.', 'Chứng minh được một số bất đẳng thức đơn giản.']),

  {kind:'kt', tag:'Kiến thức trọng tâm 1', title:'Bất đẳng thức',
   body: box(`Hệ thức dạng ${m('a \\gt b')} (hay ${m('a \\lt b,\\ a \\ge b,\\ a \\le b')}) gọi là <b>bất đẳng thức</b>; ${m('a')} là vế trái, ${m('b')} là vế phải.`) +
     `<table class="lk-table lk-left"><tr><th>Kí hiệu</th><th>Đọc là</th></tr><tr><td>${m('a \\gt b')}</td><td>a lớn hơn b</td></tr><tr><td>${m('a \\ge b')}</td><td>a lớn hơn hoặc bằng b · a <b>không nhỏ hơn</b> b · a <b>ít nhất</b> bằng b</td></tr><tr><td>${m('a \\le b')}</td><td>a nhỏ hơn hoặc bằng b · a <b>không lớn hơn</b> b · a <b>nhiều nhất</b> (tối đa) bằng b</td></tr></table>`},

  {kind:'kt', tag:'Kiến thức trọng tâm 2', title:'Tính chất bắc cầu. Liên hệ với phép cộng',
   body: box(`<b>Bắc cầu:</b> ${m('a \\gt b')} và ${m('b \\gt c')} ${m('\\Rightarrow a \\gt c')}.`) +
     box(`<b>Cộng:</b> ${m('a \\gt b \\Rightarrow a + c \\gt b + c')} với mọi số ${m('c')}.`) + S('Cộng (trừ) cùng một số vào hai vế: bất đẳng thức <b>giữ nguyên chiều</b>.')},

  {kind:'kt', tag:'Kiến thức trọng tâm 3', title:'Liên hệ với phép nhân',
   body: box(`${m('a \\gt b')} và ${m('c \\gt 0 \\Rightarrow ac \\gt bc')} &nbsp; (giữ chiều).`) + box(`${m('a \\gt b')} và ${m('c \\lt 0 \\Rightarrow ac \\lt bc')} &nbsp; (<b>đổi chiều</b>).`) +
     note('Nhân (chia) hai vế với số <b>âm</b> thì phải <b>đổi chiều</b> bất đẳng thức.')},

  {kind:'method', tag:'Dạng 1', title:'Diễn đạt bất đẳng thức bằng lời',
   steps:[`“không nhỏ hơn”, “ít nhất”, “tối thiểu” → ${m('\\ge')}.`, `“không lớn hơn”, “nhiều nhất”, “tối đa”, “không vượt quá” → ${m('\\le')}.`, `“lớn hơn”, “vượt quá” → ${m('\\gt')}; “nhỏ hơn”, “chưa đến” → ${m('\\lt')}.`]},

  {kind:'vd', tag:'Ví dụ 1 · Dạng 1', label:'Ví dụ 1', de:`Viết bất đẳng thức: a) ${m('x')} không nhỏ hơn 5; &nbsp; b) Tốc độ ${m('v')} (km/h) không vượt quá 60; &nbsp; c) Số tiền ${m('t')} (nghìn đồng) ít nhất là 50.`,
   sol:[`a) ${m('x \\ge 5')}.`, `b) ${m('v \\le 60')}.`, `c) ${m('t \\ge 50')}.`]},

  {kind:'method', tag:'Dạng 2', title:'So sánh hai biểu thức nhờ tính chất',
   steps:[`Xuất phát từ bất đẳng thức đã cho.`, `Nhân hai vế với hệ số (chú ý dấu), rồi cộng cùng một số.`, `Viết chiều bất đẳng thức cuối cùng.`]},

  {kind:'vd', tag:'Ví dụ 2 · Dạng 2', label:'Ví dụ 2', de:`Cho ${m('a \\lt b')}. So sánh: a) ${m('3a - 1')} và ${m('3b - 1')}; &nbsp; b) ${m('5 - 2a')} và ${m('5 - 2b')}.`,
   sol:[`a) ${m('a \\lt b \\Rightarrow 3a \\lt 3b')} (nhân với ${m('3 \\gt 0')}) ${m('\\Rightarrow 3a - 1 \\lt 3b - 1')}.`, `b) ${m('a \\lt b \\Rightarrow -2a \\gt -2b')} (nhân với ${m('-2 \\lt 0')}, đổi chiều) ${m('\\Rightarrow 5 - 2a \\gt 5 - 2b')}.`], ans:`${tb('3a - 1 \\lt 3b - 1')}; &nbsp; ${tb('5 - 2a \\gt 5 - 2b')}.`},

  {kind:'vd', tag:'Ví dụ 3 · Dạng 2', label:'Ví dụ 3', de:`Cho ${m('a \\gt b')}. Chứng minh ${m('2a + 1 \\gt 2b - 3')}.`,
   sol:[`${m('a \\gt b \\Rightarrow 2a \\gt 2b \\Rightarrow 2a + 1 \\gt 2b + 1')}.`, `Mà ${m('2b + 1 \\gt 2b - 3')}.`, `Theo tính chất bắc cầu: ${m('2a + 1 \\gt 2b - 3')}.`]},

  {kind:'method', tag:'Dạng 3', title:'Chứng minh bất đẳng thức đơn giản',
   steps:[`Xét hiệu ${m('A - B')}.`, `Biến đổi hiệu về dạng bình phương (hoặc tổng các số không âm).`, `Kết luận: ${m('A - B \\ge 0 \\Rightarrow A \\ge B')}.`]},

  {kind:'vd', tag:'Ví dụ 4 · Dạng 3', label:'Ví dụ 4', de:`Chứng minh ${m('a^2 + b^2 \\ge 2ab')} với mọi số ${m('a, b')}.`,
   sol:[`Xét hiệu: ${m('a^2 + b^2 - 2ab = (a - b)^2')}.`, `${m('(a - b)^2 \\ge 0')} với mọi ${m('a, b')}.`], ans:`Vậy ${tb('a^2 + b^2 \\ge 2ab')}; dấu “=” khi ${m('a = b')}.`},

  {kind:'lt', tag:'Luyện tập', label:'Bài 1', de:`Cho ${m('a \\ge b')}. So sánh ${m('-3a + 2')} và ${m('-3b + 2')}.`, sol:[`${m('a \\ge b \\Rightarrow -3a \\le -3b \\Rightarrow -3a + 2 \\le -3b + 2')}.`]},
  {kind:'lt', tag:'Luyện tập', label:'Bài 2', de:`Chứng minh ${m('(a + 1)^2 \\ge 4a')} với mọi ${m('a')}.`, sol:[`${m('(a + 1)^2 - 4a = a^2 - 2a + 1 = (a - 1)^2 \\ge 0')}.`]},

  {kind:'sum', tag:'Tổng kết', title:'Ghi nhớ',
   body:`<ul><li>Bắc cầu: ${m('a \\gt b,\\ b \\gt c \\Rightarrow a \\gt c')}.</li><li>Cộng cùng một số: giữ chiều.</li><li>Nhân số dương: giữ chiều; nhân số <b>âm</b>: <b>đổi chiều</b>.</li><li>Chứng minh ${m('A \\ge B')}: xét hiệu ${m('A - B \\ge 0')}.</li></ul>` + HOME('Bài 5')},
]},

/* ---------------- BÀI 6 ---------------- */
{ id:'bai-6', name:'Bài 6. Bất phương trình bậc nhất một ẩn', desc:'Nhận biết, kiểm tra nghiệm; quy tắc chuyển vế, quy tắc nhân; giải bất phương trình; bài toán thực tế.', slides:[
  TITLE('Bài 6. Bất phương trình bậc nhất một ẩn', ['Nhận biết bất phương trình bậc nhất một ẩn và nghiệm của nó.', 'Giải được bất phương trình bậc nhất một ẩn.', 'Giải bài toán thực tế bằng bất phương trình.']),

  {kind:'kt', tag:'Kiến thức trọng tâm 1', title:'Bất phương trình bậc nhất một ẩn',
   body: box(`Dạng ${m('ax + b \\gt 0')} (hoặc ${m('ax + b \\lt 0,\\ ax + b \\ge 0,\\ ax + b \\le 0')}), với ${m('a, b')} là hai số đã cho, <b>${m('a \\ne 0')}</b>.`) +
     S(`Số ${m('x_0')} là <b>nghiệm</b> nếu thay ${m('x = x_0')} vào ta được một bất đẳng thức đúng.`)},

  {kind:'kt', tag:'Kiến thức trọng tâm 2', title:'Hai quy tắc biến đổi',
   body: box('<b>Chuyển vế:</b> chuyển một hạng tử từ vế này sang vế kia thì <b>đổi dấu</b> hạng tử đó.') +
     box('<b>Nhân (chia):</b> nhân hai vế với số dương → giữ chiều; với số <b>âm</b> → <b>đổi chiều</b> bất phương trình.') +
     S(`Ví dụ: ${m('-2x \\lt 6 \\Leftrightarrow x \\gt -3')} (chia cho ${m('-2')}, đổi chiều).`)},

  {kind:'method', tag:'Dạng 1', title:'Nhận biết. Kiểm tra nghiệm',
   steps:[`Bậc nhất một ẩn: đưa được về ${m('ax + b')} so với 0 với ${m('a \\ne 0')}.`, `Kiểm tra nghiệm: thay giá trị vào, xem bất đẳng thức đúng hay sai.`]},

  {kind:'vd', tag:'Ví dụ 1 · Dạng 1', label:'Ví dụ 1', de:`Bất phương trình nào là bất phương trình bậc nhất một ẩn? &nbsp; ${m('2x - 3 \\gt 0')}; &nbsp; ${m('0x + 5 \\lt 0')}; &nbsp; ${m('x^2 - 1 \\ge 0')}; &nbsp; ${m('-x + 4 \\le 0')}.`,
   sol:[`${m('0x + 5 \\lt 0')} có ${m('a = 0')}: không phải.`, `${m('x^2 - 1 \\ge 0')} có ${m('x^2')}: không phải.`], ans:`${tb('2x - 3 \\gt 0')} và ${tb('-x + 4 \\le 0')}.`},

  {kind:'vd', tag:'Ví dụ 2 · Dạng 1', label:'Ví dụ 2', de:`${m('x = 3')} có là nghiệm của bất phương trình ${m('2x - 5 \\gt 0')} không? Còn ${m('x = 2')}?`,
   sol:[`${m('x = 3')}: ${m('2\\cdot 3 - 5 = 1 \\gt 0')} đúng ⇒ là nghiệm.`, `${m('x = 2')}: ${m('2\\cdot 2 - 5 = -1 \\gt 0')} sai ⇒ không là nghiệm.`]},

  {kind:'method', tag:'Dạng 2', title:'Giải bất phương trình',
   steps:[`Bỏ ngoặc; nếu có mẫu thì nhân hai vế với mẫu chung (số dương).`, `Chuyển các hạng tử chứa ẩn sang một vế, số sang vế kia.`, `Thu gọn về ${m('ax \\gt c')} (hoặc ${m('\\lt, \\ge, \\le')}) rồi chia cho ${m('a')} — <b>đổi chiều nếu ${m('a \\lt 0')}</b>.`]},

  {kind:'vd', tag:'Ví dụ 3 · Dạng 2', label:'Ví dụ 3', de:`Giải các bất phương trình: a) ${m('3x - 6 \\gt 0')}; &nbsp; b) ${m('-2x + 5 \\ge 11')}.`,
   sol:[`a) ${m('3x \\gt 6 \\Leftrightarrow x \\gt 2')}.`, `b) ${m('-2x \\ge 6 \\Leftrightarrow x \\le -3')} (chia cho ${m('-2')}, đổi chiều).`], ans:`a) ${tb('x \\gt 2')}; &nbsp; b) ${tb('x \\le -3')}.`},

  {kind:'vd', tag:'Ví dụ 4 · Dạng 2', label:'Ví dụ 4', de:`Giải bất phương trình ${m('3(x - 1) \\lt 5x + 7')}.`,
   sol:[`${m('3x - 3 \\lt 5x + 7')}.`, `${m('3x - 5x \\lt 7 + 3 \\Leftrightarrow -2x \\lt 10')}.`, `${m('x \\gt -5')} (đổi chiều).`], ans:`${tb('x \\gt -5')}.`},

  {kind:'vd', tag:'Ví dụ 5 · Dạng 2', label:'Ví dụ 5', de:`Giải bất phương trình ${m('\\dfrac{2x + 1}{3} - \\dfrac{x - 2}{2} \\le 1')}.`,
   sol:[`Nhân hai vế với 6 (dương, giữ chiều): ${m('2(2x + 1) - 3(x - 2) \\le 6')}.`, `${m('4x + 2 - 3x + 6 \\le 6 \\Leftrightarrow x + 8 \\le 6')}.`], ans:`${tb('x \\le -2')}.`},

  {kind:'method', tag:'Dạng 3', title:'Bài toán thực tế',
   steps:[`Gọi ẩn ${m('x')} (kèm đơn vị, điều kiện của ẩn).`, `Dịch “không vượt quá, tối đa, ít nhất…” thành bất phương trình.`, `Giải, rồi chọn giá trị phù hợp với điều kiện thực tế (thường là số tự nhiên lớn nhất / nhỏ nhất).`]},

  {kind:'vd', tag:'Ví dụ 6 · Dạng 3', label:'Ví dụ 6', de:`Bạn An có 200 nghìn đồng. An mua một hộp bút giá 50 nghìn đồng và một số quyển vở, mỗi quyển 12 nghìn đồng. Hỏi An mua được nhiều nhất bao nhiêu quyển vở?`,
   sol:[`Gọi ${m('x')} là số quyển vở (${m('x \\in \\mathbb{N}')}).`, `Số tiền không vượt quá 200: ${m('50 + 12x \\le 200 \\Leftrightarrow 12x \\le 150 \\Leftrightarrow x \\le 12{,}5')}.`, `${m('x')} là số tự nhiên lớn nhất thỏa mãn: ${m('x = 12')}.`], ans:`Nhiều nhất ${tb('12')} quyển vở.`},

  {kind:'lt', tag:'Luyện tập', label:'Bài 1', de:`Giải bất phương trình ${m('5 - 3x \\lt 2x + 20')}.`, sol:[`${m('-5x \\lt 15 \\Leftrightarrow x \\gt -3')}.`]},
  {kind:'lt', tag:'Luyện tập', label:'Bài 2', de:`Giá cước taxi: 12 nghìn đồng cho km đầu tiên, mỗi km tiếp theo 15 nghìn đồng. Với 150 nghìn đồng, có thể đi tối đa bao nhiêu ki-lô-mét (số nguyên)?`,
   sol:[`Gọi quãng đường là ${m('x')} km (${m('x \\ge 1')}): ${m('12 + 15(x - 1) \\le 150')}.`, `${m('15x \\le 153 \\Leftrightarrow x \\le 10{,}2')} ⇒ tối đa 10 km.`]},

  {kind:'sum', tag:'Tổng kết', title:'Ghi nhớ',
   body:`<ul><li>Dạng ${m('ax + b \\gt 0')} (${m('\\lt, \\ge, \\le')}), ${m('a \\ne 0')}.</li><li>Chuyển vế: đổi dấu hạng tử.</li><li>Nhân/chia số âm: <b>đổi chiều</b>.</li><li>Bài toán thực tế: đối chiếu điều kiện của ẩn.</li></ul>` + HOME('Bài 6')},
]},

/* ---------------- ÔN TẬP ---------------- */
{ id:'on-tap-c2', name:'Ôn tập chương II', desc:'Hệ thống phương trình quy về bậc nhất, bất đẳng thức, bất phương trình; ví dụ tổng hợp.', slides:[
  {kind:'title', tag:'Toán 9 · Kết nối tri thức', title:'Ôn tập chương II', sub:'Phương trình và bất phương trình bậc nhất một ẩn', points:['Hệ thống cách giải phương trình tích, phương trình chứa ẩn ở mẫu.', 'Tính chất bất đẳng thức; giải bất phương trình bậc nhất một ẩn.']},
  {kind:'kt', tag:'Hệ thống kiến thức', title:'Sơ đồ chương II',
   body:`<table class="lk-table lk-left"><tr><th>Nội dung</th><th>Ghi nhớ</th></tr>
     <tr><td>Phương trình tích</td><td>${m('A\\cdot B = 0 \\Leftrightarrow A = 0 \\text{ hoặc } B = 0')}</td></tr>
     <tr><td>Chứa ẩn ở mẫu</td><td>ĐKXĐ → khử mẫu → giải → đối chiếu</td></tr>
     <tr><td>Bất đẳng thức</td><td>Cộng: giữ chiều · Nhân số âm: đổi chiều · Bắc cầu</td></tr>
     <tr><td>Bất phương trình</td><td>Chuyển vế đổi dấu · Chia số âm đổi chiều</td></tr></table>`},
  {kind:'vd', tag:'Ví dụ tổng hợp', label:'Ví dụ 1', de:`Giải phương trình ${m('(x + 1)(x - 2) = x + 1')}.`,
   sol:[`${m('(x + 1)(x - 2) - (x + 1) = 0 \\Leftrightarrow (x + 1)(x - 3) = 0')}.`], ans:`${tb('x = -1;\\ x = 3')}.`},
  {kind:'vd', tag:'Ví dụ tổng hợp', label:'Ví dụ 2', de:`Tìm ${m('x')} để giá trị của ${m('\\dfrac{2x - 1}{3}')} không nhỏ hơn giá trị của ${m('\\dfrac{x + 2}{2}')}.`,
   sol:[`Ta cần ${m('\\dfrac{2x - 1}{3} \\ge \\dfrac{x + 2}{2}')}.`, `Nhân hai vế với 6: ${m('2(2x - 1) \\ge 3(x + 2) \\Leftrightarrow 4x - 2 \\ge 3x + 6')}.`], ans:`${tb('x \\ge 8')}.`},
  {kind:'lt', tag:'Luyện tập', label:'Bài 1', de:`Giải phương trình ${m('\\dfrac{1}{x - 3} + 2 = \\dfrac{x - 2}{x - 3}')}.`,
   sol:[`ĐKXĐ: ${m('x \\ne 3')}. Khử mẫu: ${m('1 + 2(x - 3) = x - 2 \\Leftrightarrow x = 3')}.`, `${m('x = 3')} không thỏa ĐKXĐ ⇒ phương trình vô nghiệm.`]},
  {kind:'lt', tag:'Luyện tập', label:'Bài 2', de:`Giải bất phương trình ${m('-4x + 1 \\gt 9')}.`, sol:[`${m('-4x \\gt 8 \\Leftrightarrow x \\lt -2')}.`]},
  {kind:'sum', tag:'Tổng kết', title:'Chuẩn bị kiểm tra',
   body:`<ul><li>Luôn tìm ĐKXĐ trước và đối chiếu sau khi giải phương trình chứa ẩn ở mẫu.</li><li>Nhân/chia với số âm phải đổi chiều.</li><li>Bài toán thực tế: đặt ẩn, điều kiện, chọn nghiệm phù hợp.</li></ul>` + box('Luyện thêm: web <b>Học mà chơi</b> – Toán 9, Ôn tập chương II (3 mức độ).')},
]},
]});
})();
