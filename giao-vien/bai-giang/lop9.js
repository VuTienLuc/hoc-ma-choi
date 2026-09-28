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

/* =====================================================================
   CHƯƠNG V. ĐƯỜNG TRÒN (Bài 13 – Bài 17, Ôn tập). Hình vẽ: circleSVG (figures.js).
   ===================================================================== */
(() => {
const m = tm, d = td;
const box = h => `<div class="lk-box">${h}</div>`, note = h => `<div class="lk-note">⚠️ ${h}</div>`;
const S = t => `<p>${t}</p>`;
const dg = x => `${x}^\\circ`, hat = s => `\\widehat{${s}}`, arc = s => `\\text{sđ}\\,\\overset{\\frown}{${s}}`;
const at = (r, a) => [r*Math.cos(a*Math.PI/180), r*Math.sin(a*Math.PI/180)];
const dirOf = (p, q) => Math.atan2(q[1]-p[1], q[0]-p[0])*180/Math.PI;
const rightAt = (A, P, Q) => { const a1 = dirOf(A, P), a2 = dirOf(A, Q); return [A[0], A[1], Math.abs(((a2-a1+540)%360)-180-90) < 1 ? a1 : a2]; };
const TITLE = (name, pts) => ({kind:'title', tag:'Toán 9 · Kết nối tri thức · Chương V', title:name, sub:'Mục tiêu bài học', points:pts});
const HOME = n => box(`Về nhà: làm các bài tập cuối ${n} trong SGK; luyện thêm trên web <b>Học mà chơi</b> – Toán 9, ${n}.`);

/* ---------- Hình ---------- */
const F_circle = () => circleSVG({C:[{x:0,y:0,r:3,lab:'O'}], P:[[...at(3,40),'M']], S:[[0,0,...at(3,40),false,'R',-1]]});
const F_pos = () => circleSVG({C:[{x:0,y:0,r:3,lab:'O'}], P:[[...at(1.6,140),'A'],[...at(3,30),'B'],[...at(4.4,-20),'C']], S:[[0,0,...at(1.6,140),true],[0,0,...at(3,30),true],[0,0,...at(4.4,-20),true]]});
const F_sym = () => circleSVG({C:[{x:0,y:0,r:3,lab:'O'}], P:[[...at(3,50),'A'],[...at(3,230),"A'"],[...at(3,130),'B'],[...at(3,-130),"B'"]], S:[[...at(3,50),...at(3,230),true],[-3.6,0,3.6,0,false,'d',-1]]});
const F_rect = () => circleSVG({C:[{x:0,y:0,r:5,lab:'O'}], P:[[-4,3,'A'],[4,3,'B'],[4,-3,'C'],[-4,-3,'D']], S:[[-4,3,4,3],[4,3,4,-3],[4,-3,-4,-3],[-4,-3,-4,3],[-4,3,4,-3,true],[4,3,-4,-3,true]]});
const F_chord = (Rr, dd, h, lab=true) => { const s = 4/Rr; return circleSVG({C:[{x:0,y:0,r:4,lab:'O'}], P:[[-h*s,dd*s,'A'],[h*s,dd*s,'B'],[0,dd*s,'H',90]], S:[[-h*s,dd*s,h*s,dd*s],[0,0,0,dd*s,true],[0,0,-h*s,dd*s,false,lab?'R':'']], right:[rightAt([0,dd*s],[0,0],[h*s,dd*s])]}); };
const F_central = al => { const a1 = 90-al/2, a2 = 90+al/2; return circleSVG({C:[{x:0,y:0,r:3,lab:'O'}], P:[[...at(3,a2),'A'],[...at(3,a1),'B'],[...at(3,-90),'C']], S:[[0,0,...at(3,a1)],[0,0,...at(3,a2)]], arc:{x:0,y:0,r:3,a1,a2}, ang:[[0,0,a1,a2,'']]}); };
const F_arcLen = n => circleSVG({C:[{x:0,y:0,r:3,lab:'O'}], S:[[0,0,...at(3,20)],[0,0,...at(3,20+n)]], arc:{x:0,y:0,r:3,a1:20,a2:20+n}, ang:[[0,0,20,20+n,m(dg(n))]]});
const F_sector = n => circleSVG({C:[{x:0,y:0,r:3,lab:'O'}], sector:{x:0,y:0,r:3,a1:30,a2:30+n}, S:[[0,0,...at(3,30),false,'R',-1],[0,0,...at(3,30+n)]], ang:[[0,0,30,30+n,m(dg(n))]]});
const F_ring = () => circleSVG({C:[{x:0,y:0,r:4,lab:'O'},{x:0,y:0,r:2.4}], ring:{x:0,y:0,r1:4,r2:2.4}, S:[[0,0,...at(4,25),false,'R'],[0,0,...at(2.4,205),false,'r']]});
const F_line3 = () => circleSVG({C:[{x:0,y:0,r:2.2,lab:'O'}], L:[[-3,1.2,3,1.2,'a'],[-3,2.2,3,2.2,'b'],[-3,3.3,3,3.3,'c']], S:[[0,0,0,3.3,true]], box:[-3.2,-2.6,3.2,3.6]});
const F_tan = (Rr, t, dd) => { const s = 4/dd, A = [Rr*Rr/dd*s, Rr*t/dd*s], M = [4,0]; return circleSVG({C:[{x:0,y:0,r:Rr*s,lab:'O'}], P:[[...A,'A'],[...M,'M']], S:[[0,0,...A],[...A,...M],[0,0,...M,true]], right:[rightAt(A,[0,0],M)]}); };
const F_twoTan = be => { const hf = be/2, Rr = 5*Math.sin(hf*Math.PI/180), A = at(Rr, 90-hf), B = at(Rr, hf-90), M = [5,0];
  return circleSVG({C:[{x:0,y:0,r:Rr,lab:'O'}], P:[[...A,'A'],[...B,'B'],[...M,'M']], S:[[...M,...A],[...M,...B],[0,0,...A],[0,0,...B],[0,0,...M,true]], right:[rightAt(A,[0,0],M), rightAt(B,[0,0],M)]}); };
const F_two = (Rr, r, dd, pts) => circleSVG({C:[{x:0,y:0,r:Rr,lab:'O'},{x:dd,y:0,r:r,lab:"O'"}], P:pts||[], S:[[0,0,dd,0,true]]});
const cross = (Rr, r, dd) => { const x = (dd*dd + Rr*Rr - r*r)/(2*dd), y = Math.sqrt(Rr*Rr - x*x); return [[x,y,'A'],[x,-y,'B']]; };
const F_cut = () => { const [A,B] = cross(15,13,14); return circleSVG({C:[{x:0,y:0,r:15,lab:'O'},{x:14,y:0,r:13,lab:"O'"}], P:[A,B,[A[0],0,'H',-130]], S:[[0,0,14,0,true],[A[0],A[1],B[0],B[1]],[0,0,A[0],A[1]],[14,0,A[0],A[1]]], right:[rightAt([A[0],0],[0,0],[A[0],A[1]])]}); };
const F_review = () => { const O = [0,0], A = [8,6], B = [8,-6], M = [12.5,0]; return circleSVG({C:[{x:0,y:0,r:10,lab:'O'}], P:[[...A,'A'],[...B,'B'],[...M,'M'],[8,0,'H',-40]], S:[[...A,...B],[0,0,...A],[0,0,...B],[...A,...M],[...B,...M],[0,0,...M,true]], right:[rightAt(A,O,M)]}); };
const POS_T = `<table class="lk-table lk-left"><tr><th>Vị trí của ${m('M')}</th><th>Hệ thức</th></tr><tr><td>Nằm trong ${m('(O;\\,R)')}</td><td>${m('OM \\lt R')}</td></tr><tr><td>Nằm trên ${m('(O;\\,R)')}</td><td>${m('OM = R')}</td></tr><tr><td>Nằm ngoài ${m('(O;\\,R)')}</td><td>${m('OM \\gt R')}</td></tr></table>`;
const LINE_T = `<table class="lk-table lk-left"><tr><th>Vị trí của ${m('a')} và ${m('(O;\\,R)')}</th><th>Số điểm chung</th><th>Hệ thức</th></tr><tr><td>Cắt nhau</td><td>2</td><td>${m('d \\lt R')}</td></tr><tr><td>Tiếp xúc</td><td>1</td><td>${m('d = R')}</td></tr><tr><td>Không giao nhau</td><td>0</td><td>${m('d \\gt R')}</td></tr></table>`;
const TWO_T = `<table class="lk-table lk-left"><tr><th>Vị trí (${m('R \\ge r')}, ${m("d = OO'")})</th><th>Điểm chung</th><th>Hệ thức</th></tr><tr><td>Cắt nhau</td><td>2</td><td>${m('R - r \\lt d \\lt R + r')}</td></tr><tr><td>Tiếp xúc ngoài</td><td>1</td><td>${m('d = R + r')}</td></tr><tr><td>Tiếp xúc trong</td><td>1</td><td>${m('d = R - r \\gt 0')}</td></tr><tr><td>Ở ngoài nhau</td><td>0</td><td>${m('d \\gt R + r')}</td></tr><tr><td>Đựng nhau</td><td>0</td><td>${m('d \\lt R - r')}</td></tr></table>`;

Lecture.add({ grade:'lop9', gradeName:'Toán 9', chapter:'Chương V. Đường tròn', lessons:[

/* ---------------- BÀI 13 ---------------- */
{ id:'bai-13', name:'Bài 13. Mở đầu về đường tròn', desc:'Đường tròn; vị trí của điểm đối với đường tròn; điểm cùng thuộc một đường tròn; tính đối xứng.', slides:[
  TITLE('Bài 13. Mở đầu về đường tròn', ['Nhận biết đường tròn, tâm, bán kính, đường kính.', 'Xác định vị trí của một điểm đối với đường tròn; chứng minh các điểm cùng thuộc một đường tròn.', 'Nhận biết tâm đối xứng, trục đối xứng của đường tròn.']),
  {kind:'kt', tag:'Kiến thức trọng tâm 1', title:'Đường tròn', fig:F_circle(),
   body: box(`Đường tròn tâm ${m('O')} bán kính ${m('R')} (${m('R \\gt 0')}), kí hiệu ${m('(O;\\,R)')}, là hình gồm tất cả các điểm cách ${m('O')} một khoảng bằng ${m('R')}.`) + S(`${m('M \\in (O;\\,R) \\Leftrightarrow OM = R')}. Đường kính dài ${m('2R')}.`)},
  {kind:'kt', tag:'Kiến thức trọng tâm 2', title:'Vị trí của một điểm đối với đường tròn', fig:F_pos(), body: POS_T + S(`Trong hình: ${m('A')} nằm trong, ${m('B')} nằm trên, ${m('C')} nằm ngoài ${m('(O)')}.`)},
  {kind:'kt', tag:'Kiến thức trọng tâm 3', title:'Tính đối xứng của đường tròn', fig:F_sym(),
   body: box(`Đường tròn là hình có <b>tâm đối xứng</b>: tâm của đường tròn.`) + box(`Đường tròn là hình có <b>trục đối xứng</b>: mỗi đường thẳng đi qua tâm (có vô số trục đối xứng).`) + S(`Nếu ${m('A \\in (O)')} thì điểm ${m("A'")} đối xứng với ${m('A')} qua ${m('O')} (hoặc qua một đường kính) cũng thuộc ${m('(O)')}.`)},
  {kind:'method', tag:'Dạng 1', title:'Xác định vị trí của một điểm đối với đường tròn', steps:[`Tính khoảng cách ${m('OM')} (Pythagore, tọa độ: ${m('OM = \\sqrt{x^2 + y^2}')}).`, `So sánh ${m('OM')} với ${m('R')} (cùng đơn vị) rồi kết luận.`]},
  {kind:'vd', tag:'Ví dụ 1 · Dạng 1', label:'Ví dụ 1', de:`Cho đường tròn ${m('(O;\\,5\\text{ cm})')} và ba điểm ${m('A, B, C')} với ${m('OA = 3')} cm, ${m('OB = 5')} cm, ${m('OC = 7')} cm. Mỗi điểm nằm ở đâu so với đường tròn?`,
   sol:[`${m('OA = 3 \\lt 5')} ⇒ ${m('A')} nằm trong đường tròn.`, `${m('OB = 5 = R')} ⇒ ${m('B')} nằm trên đường tròn.`, `${m('OC = 7 \\gt 5')} ⇒ ${m('C')} nằm ngoài đường tròn.`]},
  {kind:'vd', tag:'Ví dụ 2 · Dạng 1', label:'Ví dụ 2', de:`Trong mặt phẳng tọa độ ${m('Oxy')}, cho đường tròn ${m('(O;\\,5)')} (${m('O')} là gốc tọa độ) và các điểm ${m('M(3;\\,4)')}, ${m('N({-1};\\,2)')}. Xác định vị trí của ${m('M, N')} đối với đường tròn.`,
   sol:[`${m('OM = \\sqrt{3^2 + 4^2} = 5 = R')} ⇒ ${m('M')} nằm trên đường tròn.`, `${m('ON = \\sqrt{1 + 4} = \\sqrt{5} \\lt 5')} ⇒ ${m('N')} nằm trong đường tròn.`]},
  {kind:'method', tag:'Dạng 2', title:'Chứng minh các điểm cùng thuộc một đường tròn', steps:[`Tìm một điểm ${m('O')} cách đều tất cả các điểm đã cho.`, `Kết luận các điểm cùng thuộc đường tròn tâm ${m('O')}, bán kính bằng khoảng cách chung đó.`, `Hay dùng: giao điểm hai đường chéo hình chữ nhật; trung điểm cạnh huyền của tam giác vuông.`]},
  {kind:'vd', tag:'Ví dụ 3 · Dạng 2', label:'Ví dụ 3', de:`Cho hình chữ nhật ${m('ABCD')} có ${m('AB = 8')} cm, ${m('BC = 6')} cm. Chứng minh bốn điểm ${m('A, B, C, D')} cùng thuộc một đường tròn. Tính bán kính.`, fig:F_rect(), figAt:1,
   sol:[`Gọi ${m('O')} là giao điểm hai đường chéo. Hai đường chéo hình chữ nhật bằng nhau và cắt nhau tại trung điểm mỗi đường nên ${m('OA = OB = OC = OD')}.`, `Vậy ${m('A, B, C, D')} cùng thuộc đường tròn tâm ${m('O')}, bán kính ${m('R = \\dfrac{AC}{2}')}.`, `${m('AC = \\sqrt{8^2 + 6^2} = 10')} cm.`], ans:`${tb('R = 5')} cm.`},
  {kind:'vd', tag:'Ví dụ 4 · Dạng 2', label:'Ví dụ 4', de:`Cho tam giác ${m('ABC')} vuông tại ${m('A')}, ${m('AB = 5')} cm, ${m('AC = 12')} cm. Xác định tâm và bán kính của đường tròn đi qua ba điểm ${m('A, B, C')}.`,
   sol:[`Gọi ${m('O')} là trung điểm của ${m('BC')}. Trong tam giác vuông, đường trung tuyến ứng với cạnh huyền bằng nửa cạnh huyền: ${m('OA = OB = OC = \\dfrac{BC}{2}')}.`, `${m('BC = \\sqrt{5^2 + 12^2} = 13')} cm.`], ans:`Tâm là trung điểm ${m('BC')}, ${tb('R = 6{,}5')} cm.`},
  {kind:'method', tag:'Dạng 3', title:'Vận dụng tính đối xứng', steps:[`Điểm đối xứng qua tâm ${m('O')}: ${m('O')} là trung điểm của đoạn nối hai điểm.`, `Trong tọa độ: ${m("x_{A'} = 2x_O - x_A,\\ y_{A'} = 2y_O - y_A")}.`]},
  {kind:'vd', tag:'Ví dụ 5 · Dạng 3', label:'Ví dụ 5', de:`Đường tròn tâm ${m('I(1;\\,2)')} đi qua ${m('A(4;\\,6)')}. Tính bán kính và tìm điểm ${m("A'")} thuộc đường tròn sao cho ${m("AA'")} là đường kính.`,
   sol:[`${m('R = IA = \\sqrt{3^2 + 4^2} = 5')}.`, `${m("AA'")} là đường kính nên ${m('I')} là trung điểm ${m("AA'")}: ${m("x_{A'} = 2 - 4 = -2,\\ y_{A'} = 4 - 6 = -2")}.`], ans:`${tb("R = 5;\\ A'({-2};\\,{-2})")}.`},
  {kind:'lt', tag:'Luyện tập', label:'Bài 1', de:`Cho ${m('(O;\\,4\\text{ cm})')} và ${m('OM = 3{,}5')} cm, ${m('ON = 40')} mm, ${m('OP = 4{,}2')} cm. Xác định vị trí của ${m('M, N, P')}.`, sol:[`${m('M')} nằm trong; ${m('N')} nằm trên (${m('40\\text{ mm} = 4\\text{ cm}')}); ${m('P')} nằm ngoài.`]},
  {kind:'lt', tag:'Luyện tập', label:'Bài 2', de:`Chứng minh bốn đỉnh của hình vuông cạnh 4 cm cùng thuộc một đường tròn và tính bán kính.`, sol:[`Tâm là giao điểm hai đường chéo; đường chéo ${m('= 4\\sqrt{2}')} cm.`, `${m('R = 2\\sqrt{2}')} cm.`]},
  {kind:'sum', tag:'Tổng kết', title:'Ghi nhớ', body:`<ul><li>${m('M \\in (O;\\,R) \\Leftrightarrow OM = R')}; so sánh ${m('OM')} với ${m('R')} để biết vị trí điểm.</li><li>Chứng minh nhiều điểm cùng thuộc đường tròn: tìm điểm cách đều.</li><li>Tâm là tâm đối xứng; mọi đường kính là trục đối xứng.</li></ul>` + HOME('Bài 13')},
]},

/* ---------------- BÀI 14 ---------------- */
{ id:'bai-14', name:'Bài 14. Cung và dây của một đường tròn', desc:'Dây và đường kính; khoảng cách từ tâm đến dây; góc ở tâm; số đo cung.', slides:[
  TITLE('Bài 14. Cung và dây của một đường tròn', ['Nhận biết dây, đường kính; so sánh dây với đường kính.', 'Tính độ dài dây, khoảng cách từ tâm đến dây.', 'Nhận biết góc ở tâm; tính số đo cung nhỏ, cung lớn.']),
  {kind:'kt', tag:'Kiến thức trọng tâm 1', title:'Dây và đường kính', fig:F_chord(5,3,4,false),
   body: box('Đoạn thẳng nối hai điểm của đường tròn là một <b>dây</b>. Dây đi qua tâm là <b>đường kính</b>.') + box(`Trong các dây của đường tròn, dây lớn nhất là đường kính: ${m('AB \\le 2R')}.`) +
     S(`Nhận xét: nếu ${m('H')} là trung điểm dây ${m('AB')} (không qua tâm) thì ${m('OH \\perp AB')} (tam giác ${m('OAB')} cân tại ${m('O')}), nên ${m('OH^2 + AH^2 = R^2')}.`)},
  {kind:'kt', tag:'Kiến thức trọng tâm 2', title:'Góc ở tâm. Số đo cung', fig:F_central(70),
   body: box(`Góc có đỉnh trùng tâm đường tròn là <b>góc ở tâm</b>. Góc ${m(hat('AOB'))} chia đường tròn thành cung nhỏ ${m('AB')} và cung lớn ${m('ACB')}.`) +
     box(`${m(arc('AB') + ' = ' + hat('AOB'))} (cung nhỏ); &nbsp; sđ cung lớn ${m('= 360^\\circ - ')} sđ cung nhỏ; nửa đường tròn có số đo ${m('180^\\circ')}.`)},
  {kind:'method', tag:'Dạng 1', title:'Tính độ dài dây, khoảng cách từ tâm đến dây', steps:[`Kẻ ${m('OH \\perp AB')} tại ${m('H')} (${m('H')} là trung điểm ${m('AB')}).`, `Áp dụng Pythagore trong tam giác ${m('OHA')}: ${m('OH^2 + AH^2 = R^2')}.`, `${m('AB = 2AH')}.`]},
  {kind:'vd', tag:'Ví dụ 1 · Dạng 1', label:'Ví dụ 1', de:`Cho đường tròn ${m('(O;\\,5\\text{ cm})')}, dây ${m('AB = 8')} cm. Tính khoảng cách từ ${m('O')} đến ${m('AB')}.`, fig:F_chord(5,3,4),
   sol:[`Kẻ ${m('OH \\perp AB')} ⇒ ${m('AH = \\dfrac{AB}{2} = 4')} cm.`, `${m('OH = \\sqrt{OA^2 - AH^2} = \\sqrt{25 - 16}')}.`], ans:`${tb('OH = 3')} cm.`},
  {kind:'vd', tag:'Ví dụ 2 · Dạng 1', label:'Ví dụ 2', de:`Cho đường tròn ${m('(O;\\,13\\text{ cm})')} và dây ${m('AB')} cách tâm ${m('5')} cm. Tính độ dài dây ${m('AB')}.`, fig:F_chord(13,5,12),
   sol:[`${m('AH = \\sqrt{13^2 - 5^2} = \\sqrt{144} = 12')} cm.`, `${m('AB = 2AH')}.`], ans:`${tb('AB = 24')} cm.`},
  {kind:'method', tag:'Dạng 2', title:'Tính số đo cung, góc ở tâm', steps:[`Số đo cung nhỏ bằng số đo góc ở tâm chắn cung đó.`, `Cung lớn: ${m('360^\\circ')} trừ cung nhỏ.`, `Dùng tam giác cân ${m('OAB')} (${m('OA = OB = R')}), tam giác đều, Pythagore đảo… để tìm góc ở tâm.`]},
  {kind:'vd', tag:'Ví dụ 3 · Dạng 2', label:'Ví dụ 3', de:`Cho ${m('A, B \\in (O)')} với ${m(`${hat('AOB')} = ${dg(70)}`)}. Tính số đo cung nhỏ và cung lớn ${m('AB')}.`, fig:F_central(70),
   sol:[`Cung nhỏ: ${m(`${arc('AB')} = ${hat('AOB')} = ${dg(70)}`)}.`, `Cung lớn: ${m(`360^\\circ - 70^\\circ = ${dg(290)}`)}.`], ans:`${tb(dg(70))} và ${tb(dg(290))}.`},
  {kind:'vd', tag:'Ví dụ 4 · Dạng 2', label:'Ví dụ 4', de:`Dây ${m('AB')} của đường tròn ${m('(O;\\,R)')} có ${m('AB = R')}. Tính số đo cung nhỏ và cung lớn ${m('AB')}.`, fig:F_central(60),
   sol:[`${m('OA = OB = AB = R')} ⇒ tam giác ${m('OAB')} đều ⇒ ${m(`${hat('AOB')} = ${dg(60)}`)}.`, `Cung nhỏ ${m(dg(60))}, cung lớn ${m(`360^\\circ - 60^\\circ`)}.`], ans:`${tb(dg(60))} và ${tb(dg(300))}.`},
  {kind:'vd', tag:'Ví dụ 5 · Dạng 2', label:'Ví dụ 5', de:`Trên ${m('(O)')} lấy ${m('A, B, C')} sao cho tia ${m('OB')} nằm giữa ${m('OA, OC')}; ${m(`${hat('AOB')} = ${dg(50)}`)}, ${m(`${hat('BOC')} = ${dg(80)}`)}. Tính số đo cung nhỏ ${m('AC')}.`,
   sol:[`Tia ${m('OB')} nằm giữa nên ${m(`${hat('AOC')} = ${dg(50)} + ${dg(80)} = ${dg(130)}`)}.`], ans:`${m(arc('AC') + ' =')} ${tb(dg(130))}.`},
  {kind:'lt', tag:'Luyện tập', label:'Bài 1', de:`Cho ${m('A, B \\in (O)')} với ${m(`${hat('OAB')} = ${dg(35)}`)}. Tính số đo cung nhỏ ${m('AB')}.`, sol:[`Tam giác ${m('OAB')} cân: ${m(`${hat('AOB')} = 180^\\circ - 2\\cdot 35^\\circ = ${dg(110)}`)}.`, `Cung nhỏ ${m('AB')} có số đo ${m(dg(110))}.`]},
  {kind:'lt', tag:'Luyện tập', label:'Bài 2', de:`Cho ${m('(O;\\,10\\text{ cm})')} và dây ${m('AB = 16')} cm. Tính khoảng cách từ tâm đến dây.`, sol:[`${m('AH = 8')} cm; ${m('OH = \\sqrt{100 - 64} = 6')} cm.`]},
  {kind:'sum', tag:'Tổng kết', title:'Ghi nhớ', body:`<ul><li>Đường kính là dây lớn nhất: ${m('AB \\le 2R')}.</li><li>${m('OH \\perp AB')} tại trung điểm ${m('H')}: ${m('OH^2 + AH^2 = R^2')}.</li><li>Cung nhỏ = góc ở tâm; cung lớn = ${m('360^\\circ')} − cung nhỏ.</li></ul>` + HOME('Bài 14')},
]},

/* ---------------- BÀI 15 ---------------- */
{ id:'bai-15', name:'Bài 15. Độ dài của cung tròn. Diện tích hình quạt tròn và hình vành khuyên', desc:'Độ dài đường tròn, cung tròn; diện tích hình tròn, hình quạt, hình vành khuyên; bài toán thực tế.', slides:[
  TITLE('Bài 15. Độ dài của cung tròn. Diện tích hình quạt tròn và hình vành khuyên', ['Tính độ dài đường tròn, độ dài cung tròn.', 'Tính diện tích hình quạt tròn, hình vành khuyên.', 'Giải bài toán thực tế liên quan.']),
  {kind:'kt', tag:'Kiến thức trọng tâm 1', title:'Độ dài đường tròn, cung tròn', fig:F_arcLen(60),
   body: box(`Độ dài đường tròn: ${m('C = 2\\pi R = \\pi d')}.`) + box(`Độ dài cung ${m(dg('n'))}: ${m('l = \\dfrac{\\pi R n}{180}')}.`) + note(`Kết quả thường viết theo ${m('\\pi')}; khi cần số gần đúng lấy ${m('\\pi \\approx 3{,}14')}.`)},
  {kind:'kt', tag:'Kiến thức trọng tâm 2', title:'Diện tích hình tròn, hình quạt tròn', fig:F_sector(120),
   body: box(`Hình tròn: ${m('S = \\pi R^2')}.`) + box(`Hình quạt tròn bán kính ${m('R')}, cung ${m(dg('n'))}: ${m('S = \\dfrac{\\pi R^2 n}{360} = \\dfrac{l R}{2}')}.`)},
  {kind:'kt', tag:'Kiến thức trọng tâm 3', title:'Diện tích hình vành khuyên', fig:F_ring(),
   body: box(`Hình vành khuyên giới hạn bởi hai đường tròn đồng tâm ${m('(O;\\,R)')} và ${m('(O;\\,r)')}, ${m('R \\gt r')}: ${m('S = \\pi(R^2 - r^2)')}.`)},
  {kind:'method', tag:'Dạng 1', title:'Tính độ dài cung, bán kính, số đo cung', steps:[`Viết công thức ${m('l = \\dfrac{\\pi R n}{180}')}.`, `Thay các đại lượng đã biết, giải tìm đại lượng còn lại.`]},
  {kind:'vd', tag:'Ví dụ 1 · Dạng 1', label:'Ví dụ 1', de:`Tính độ dài cung ${m(dg(60))} của đường tròn bán kính ${m('6')} cm.`, fig:F_arcLen(60), sol:[`${m('l = \\dfrac{\\pi\\cdot 6\\cdot 60}{180}')}.`], ans:`${tb('l = 2\\pi')} cm ${m('\\approx 6{,}28')} cm.`},
  {kind:'vd', tag:'Ví dụ 2 · Dạng 1', label:'Ví dụ 2', de:`Một cung ${m(dg(90))} có độ dài ${m('3\\pi')} cm. Tính bán kính đường tròn.`, sol:[`${m('3\\pi = \\dfrac{\\pi R\\cdot 90}{180} = \\dfrac{\\pi R}{2}')}.`], ans:`${tb('R = 6')} cm.`},
  {kind:'method', tag:'Dạng 2', title:'Tính diện tích hình quạt, hình vành khuyên', steps:[`Hình quạt: ${m('S = \\dfrac{\\pi R^2 n}{360}')} (biết ${m('n')}) hoặc ${m('S = \\dfrac{lR}{2}')} (biết độ dài cung).`, `Vành khuyên: ${m('S = \\pi(R^2 - r^2)')}.`]},
  {kind:'vd', tag:'Ví dụ 3 · Dạng 2', label:'Ví dụ 3', de:`Tính diện tích hình quạt tròn bán kính ${m('6')} cm, cung ${m(dg(120))}.`, fig:F_sector(120), sol:[`${m('S = \\dfrac{\\pi\\cdot 6^2\\cdot 120}{360}')}.`], ans:`${tb('S = 12\\pi')} cm².`},
  {kind:'vd', tag:'Ví dụ 4 · Dạng 2', label:'Ví dụ 4', de:`Hình quạt bán kính ${m('5')} cm có độ dài cung ${m('4')} cm. Tính diện tích.`, sol:[`${m('S = \\dfrac{lR}{2} = \\dfrac{4\\cdot 5}{2}')}.`], ans:`${tb('S = 10')} cm².`},
  {kind:'vd', tag:'Ví dụ 5 · Dạng 2', label:'Ví dụ 5', de:`Tính diện tích hình vành khuyên giới hạn bởi hai đường tròn đồng tâm bán kính ${m('5')} cm và ${m('3')} cm.`, fig:F_ring(), sol:[`${m('S = \\pi(5^2 - 3^2) = \\pi(25 - 9)')}.`], ans:`${tb('S = 16\\pi')} cm² ${m('\\approx 50{,}24')} cm².`},
  {kind:'method', tag:'Dạng 3', title:'Bài toán thực tế', steps:[`Nhận ra hình: bánh xe lăn một vòng đi được chu vi; mặt quạt, sân, đường chạy… là hình quạt hoặc vành khuyên.`, `Tính theo công thức, đổi đơn vị, làm tròn theo yêu cầu.`]},
  {kind:'vd', tag:'Ví dụ 6 · Dạng 3', label:'Ví dụ 6', de:`Bánh xe đạp có đường kính ${m('70')} cm. Khi bánh xe lăn ${m('100')} vòng thì xe đi được bao nhiêu mét? (${m('\\pi \\approx 3{,}14')})`,
   sol:[`Mỗi vòng: ${m('C = \\pi d \\approx 3{,}14\\cdot 70 = 219{,}8')} cm.`, `100 vòng: ${m('219{,}8\\cdot 100 = 21\\,980')} cm.`], ans:`Khoảng ${tb('219{,}8')} m.`},
  {kind:'lt', tag:'Luyện tập', label:'Bài 1', de:`Cho đường tròn bán kính ${m('9')} cm. Tính độ dài cung ${m(dg(40))} và diện tích hình quạt ứng với cung đó.`, sol:[`${m('l = \\dfrac{\\pi\\cdot 9\\cdot 40}{180} = 2\\pi')} cm.`, `${m('S = \\dfrac{lR}{2} = 9\\pi')} cm².`]},
  {kind:'lt', tag:'Luyện tập', label:'Bài 2', de:`Một đường chạy hình vành khuyên có bán kính ngoài ${m('40')} m, bán kính trong ${m('35')} m. Tính diện tích đường chạy (${m('\\pi \\approx 3{,}14')}).`, sol:[`${m('S = \\pi(40^2 - 35^2) = 375\\pi \\approx 1177{,}5')} m².`]},
  {kind:'sum', tag:'Tổng kết', title:'Ghi nhớ', body:`<ul><li>${m('C = 2\\pi R')}; &nbsp; ${m('l = \\dfrac{\\pi R n}{180}')}.</li><li>${m('S_{tròn} = \\pi R^2')}; &nbsp; ${m('S_{quạt} = \\dfrac{\\pi R^2 n}{360} = \\dfrac{lR}{2}')}.</li><li>${m('S_{vành\\ khuyên} = \\pi(R^2 - r^2)')}.</li></ul>` + HOME('Bài 15')},
]},

/* ---------------- BÀI 16 ---------------- */
{ id:'bai-16', name:'Bài 16. Vị trí tương đối của đường thẳng và đường tròn', desc:'Ba vị trí tương đối; tiếp tuyến và dấu hiệu nhận biết; tính chất hai tiếp tuyến cắt nhau.', slides:[
  TITLE('Bài 16. Vị trí tương đối của đường thẳng và đường tròn', ['Nhận biết ba vị trí tương đối của đường thẳng và đường tròn.', 'Nhận biết, chứng minh tiếp tuyến; tính độ dài liên quan.', 'Vận dụng tính chất hai tiếp tuyến cắt nhau.']),
  {kind:'kt', tag:'Kiến thức trọng tâm 1', title:'Ba vị trí tương đối', fig:F_line3(), body: LINE_T + S(`${m('d')} là khoảng cách từ tâm ${m('O')} đến đường thẳng. Trong hình: ${m('a')} cắt, ${m('b')} tiếp xúc, ${m('c')} không giao ${m('(O)')}.`)},
  {kind:'kt', tag:'Kiến thức trọng tâm 2', title:'Tiếp tuyến của đường tròn', fig:F_tan(3,4,5),
   body: box(`<b>Tính chất:</b> tiếp tuyến vuông góc với bán kính đi qua tiếp điểm.`) + box(`<b>Dấu hiệu:</b> đường thẳng đi qua điểm ${m('A \\in (O)')} và vuông góc với ${m('OA')} tại ${m('A')} là tiếp tuyến của ${m('(O)')} tại ${m('A')}.`)},
  {kind:'kt', tag:'Kiến thức trọng tâm 3', title:'Tính chất hai tiếp tuyến cắt nhau', fig:F_twoTan(60),
   body: box(`Nếu ${m('MA, MB')} là hai tiếp tuyến cắt nhau tại ${m('M')} thì: ${m('MA = MB')}; ${m('MO')} là tia phân giác của ${m(hat('AMB'))}; ${m('OM')} là tia phân giác của ${m(hat('AOB'))}.`) + S(`Hệ quả: ${m(`${hat('AOB')} + ${hat('AMB')} = 180^\\circ`)}.`)},
  {kind:'method', tag:'Dạng 1', title:'Xác định vị trí tương đối', steps:[`Tính khoảng cách ${m('d')} từ tâm đến đường thẳng.`, `So sánh ${m('d')} với ${m('R')} theo bảng.`]},
  {kind:'vd', tag:'Ví dụ 1 · Dạng 1', label:'Ví dụ 1', de:`Cho ${m('(O;\\,5\\text{ cm})')} và ba đường thẳng ${m('a, b, c')} cách ${m('O')} lần lượt ${m('3')} cm, ${m('5')} cm, ${m('7')} cm. Xác định vị trí tương đối của mỗi đường thẳng với ${m('(O)')}.`,
   sol:[`${m('3 \\lt 5')}: ${m('a')} cắt ${m('(O)')} (2 điểm chung).`, `${m('5 = 5')}: ${m('b')} tiếp xúc ${m('(O)')}.`, `${m('7 \\gt 5')}: ${m('c')} và ${m('(O)')} không giao nhau.`]},
  {kind:'vd', tag:'Ví dụ 2 · Dạng 1', label:'Ví dụ 2', de:`Trong mặt phẳng tọa độ, cho đường tròn tâm ${m('I(2;\\,3)')}, bán kính ${m('3')}. Xét vị trí tương đối của đường tròn với trục ${m('Ox')} và trục ${m('Oy')}.`,
   sol:[`Khoảng cách từ ${m('I')} đến ${m('Ox')} là ${m('|y_I| = 3 = R')} ⇒ tiếp xúc với ${m('Ox')}.`, `Khoảng cách từ ${m('I')} đến ${m('Oy')} là ${m('|x_I| = 2 \\lt 3')} ⇒ cắt ${m('Oy')} tại hai điểm.`]},
  {kind:'method', tag:'Dạng 2', title:'Tiếp tuyến: tính độ dài, chứng minh', steps:[`Tính toán: tam giác ${m('OAM')} vuông tại tiếp điểm ${m('A')} ⇒ ${m('OM^2 = OA^2 + MA^2')}.`, `Chứng minh ${m('a')} là tiếp tuyến tại ${m('A')}: chỉ ra ${m('A \\in (O)')} và ${m('a \\perp OA')} (hoặc ${m('d = R')}).`]},
  {kind:'vd', tag:'Ví dụ 3 · Dạng 2', label:'Ví dụ 3', de:`Cho ${m('(O;\\,6\\text{ cm})')}, điểm ${m('M')} với ${m('OM = 10')} cm. Kẻ tiếp tuyến ${m('MA')} (${m('A')} là tiếp điểm). Tính ${m('MA')}.`, fig:F_tan(6,8,10),
   sol:[`${m('MA \\perp OA')} ⇒ tam giác ${m('OAM')} vuông tại ${m('A')}.`, `${m('MA = \\sqrt{10^2 - 6^2} = \\sqrt{64}')}.`], ans:`${tb('MA = 8')} cm.`},
  {kind:'vd', tag:'Ví dụ 4 · Dạng 2', label:'Ví dụ 4', de:`Tam giác ${m('ABC')} có ${m('AB = 3')} cm, ${m('AC = 4')} cm, ${m('BC = 5')} cm. Chứng minh ${m('AC')} là tiếp tuyến của đường tròn ${m('(B;\\,BA)')}.`,
   sol:[`${m('AB^2 + AC^2 = 9 + 16 = 25 = BC^2')} ⇒ tam giác ${m('ABC')} vuông tại ${m('A')} (Pythagore đảo).`, `${m('A \\in (B;\\,BA)')} và ${m('AC \\perp BA')} tại ${m('A')}.`], ans:`Vậy ${m('AC')} là tiếp tuyến của ${m('(B;\\,BA)')} tại ${m('A')}.`},
  {kind:'method', tag:'Dạng 3', title:'Hai tiếp tuyến cắt nhau', steps:[`Dùng ${m('MA = MB')}, ${m('MO')} là phân giác ${m(hat('AMB'))}.`, `Xét tam giác vuông ${m('OAM')} (vuông tại ${m('A')}) để tính góc, cạnh.`]},
  {kind:'vd', tag:'Ví dụ 5 · Dạng 3', label:'Ví dụ 5', de:`Từ ${m('M')} ngoài ${m('(O;\\,3\\text{ cm})')} kẻ hai tiếp tuyến ${m('MA, MB')} với ${m(`${hat('AMB')} = ${dg(60)}`)}. Tính ${m(hat('AOB'))}, ${m('OM')} và ${m('MA')}.`, fig:F_twoTan(60),
   sol:[`${m(`${hat('AOB')} = 180^\\circ - 60^\\circ = ${dg(120)}`)}.`, `${m(`${hat('AMO')} = 30^\\circ`)}; tam giác ${m('OAM')} vuông tại ${m('A')}: ${m('OA = OM\\cdot\\sin 30^\\circ \\Rightarrow OM = 2OA = 6')} cm.`, `${m('MA = \\sqrt{36 - 9} = 3\\sqrt{3}')} cm.`], ans:`${tb(`${hat('AOB')} = ${dg(120)};\\ OM = 6;\\ MA = 3\\sqrt{3}`)} (cm).`},
  {kind:'lt', tag:'Luyện tập', label:'Bài 1', de:`Cho ${m('(O;\\,8\\text{ cm})')} và tiếp tuyến ${m('MA')} với ${m('MA = 15')} cm. Tính ${m('OM')}.`, sol:[`${m('OM = \\sqrt{8^2 + 15^2} = 17')} cm.`]},
  {kind:'lt', tag:'Luyện tập', label:'Bài 2', de:`Hai tiếp tuyến ${m('MA, MB')} của ${m('(O)')} tạo thành ${m(`${hat('AMB')} = ${dg(80)}`)}. Tính ${m(hat('AOB'))} và ${m(hat('AOM'))}.`, sol:[`${m(`${hat('AOB')} = ${dg(100)}`)}; ${m(`${hat('AOM')} = ${dg(50)}`)}.`]},
  {kind:'sum', tag:'Tổng kết', title:'Ghi nhớ', body:`<ul><li>So sánh ${m('d')} và ${m('R')}: cắt (${m('d \\lt R')}), tiếp xúc (${m('d = R')}), không giao (${m('d \\gt R')}).</li><li>Tiếp tuyến ⊥ bán kính tại tiếp điểm.</li><li>Hai tiếp tuyến cắt nhau: ${m('MA = MB')}, ${m('MO')} là phân giác.</li></ul>` + HOME('Bài 16')},
]},

/* ---------------- BÀI 17 ---------------- */
{ id:'bai-17', name:'Bài 17. Vị trí tương đối của hai đường tròn', desc:'Cắt nhau, tiếp xúc, không giao nhau; hệ thức giữa đoạn nối tâm và bán kính; tính chất đường nối tâm.', slides:[
  TITLE('Bài 17. Vị trí tương đối của hai đường tròn', ['Nhận biết các vị trí tương đối của hai đường tròn.', 'Dùng hệ thức giữa đoạn nối tâm và các bán kính.', 'Vận dụng tính chất đường nối tâm để tính toán.']),
  {kind:'kt', tag:'Kiến thức trọng tâm 1', title:'Các vị trí tương đối', body: TWO_T},
  {kind:'kt', tag:'Kiến thức trọng tâm 2', title:'Tính chất đường nối tâm', fig:F_two(3,2,4,cross(3,2,4)),
   body: box(`Đường nối tâm ${m("OO'")} là trục đối xứng của hình gồm hai đường tròn.`) + box(`Hai đường tròn cắt nhau tại ${m('A, B')} thì ${m("OO'")} là đường trung trực của ${m('AB')}.`) + box(`Hai đường tròn tiếp xúc nhau thì tiếp điểm nằm trên đường nối tâm.`)},
  {kind:'method', tag:'Dạng 1', title:'Xác định vị trí tương đối', steps:[`Tính ${m('R + r')}, ${m('R - r')} và ${m("d = OO'")}.`, `So sánh theo bảng.`]},
  {kind:'vd', tag:'Ví dụ 1 · Dạng 1', label:'Ví dụ 1', de:`Cho ${m('(O;\\,5\\text{ cm})')} và ${m("(O';\\,3\\text{ cm})")}. Xác định vị trí tương đối khi ${m("OO'")} lần lượt bằng ${m('9;\\ 8;\\ 6;\\ 2;\\ 1')} (cm).`,
   sol:[`${m('R + r = 8,\\ R - r = 2')}.`, `${m('9 \\gt 8')}: ở ngoài nhau; ${m('8 = 8')}: tiếp xúc ngoài.`, `${m('2 \\lt 6 \\lt 8')}: cắt nhau; ${m('2 = R - r')}: tiếp xúc trong; ${m('1 \\lt 2')}: đựng nhau.`]},
  {kind:'method', tag:'Dạng 2', title:'Tính đoạn nối tâm, bán kính', steps:[`Tiếp xúc ngoài: ${m("OO' = R + r")}; tiếp xúc trong: ${m("OO' = R - r")}.`, `Cắt nhau tại ${m('A, B')}: gọi ${m("H = AB \\cap OO'")} (trung điểm ${m('AB')}), dùng Pythagore trong các tam giác ${m("OHA,\\ O'HA")}.`]},
  {kind:'vd', tag:'Ví dụ 2 · Dạng 2', label:'Ví dụ 2', de:`Hai đường tròn ${m('(O;\\,7\\text{ cm})')} và ${m("(O';\\,4\\text{ cm})")} tiếp xúc ngoài tại ${m('A')}. Tính ${m("OO'")}.`, fig:F_two(7,4,11,[[7,0,'A',60]]),
   sol:[`Tiếp điểm ${m('A')} nằm giữa ${m("O, O'")}.`, `${m("OO' = OA + AO' = 7 + 4")}.`], ans:`${tb("OO' = 11")} cm.`},
  {kind:'vd', tag:'Ví dụ 3 · Dạng 2', label:'Ví dụ 3', de:`Hai đường tròn ${m('(O;\\,15\\text{ cm})')} và ${m("(O';\\,13\\text{ cm})")} cắt nhau tại ${m('A, B')} với ${m('AB = 24')} cm (${m("O, O'")} nằm khác phía đối với ${m('AB')}). Tính ${m("OO'")}.`, fig:F_cut(),
   sol:[`${m("OO'")} là trung trực của ${m('AB')}, cắt ${m('AB')} tại trung điểm ${m('H')}: ${m('AH = 12')} cm.`, `${m('OH = \\sqrt{15^2 - 12^2} = 9')} cm; ${m("O'H = \\sqrt{13^2 - 12^2} = 5")} cm.`, `${m("OO' = OH + HO' = 9 + 5")}.`], ans:`${tb("OO' = 14")} cm.`},
  {kind:'vd', tag:'Ví dụ 4 · Dạng 2', label:'Ví dụ 4', de:`Cho ${m('(O;\\,6\\text{ cm})')} và ${m("(O';\\,4\\text{ cm})")} cắt nhau. Đoạn nối tâm ${m("OO'")} có thể nhận những giá trị nào?`, sol:[`Cắt nhau ⇔ ${m("6 - 4 \\lt OO' \\lt 6 + 4")}.`], ans:`${tb("2 \\lt OO' \\lt 10")} (cm).`},
  {kind:'lt', tag:'Luyện tập', label:'Bài 1', de:`Cho ${m('(O;\\,8\\text{ cm})')} và ${m("(O';\\,3\\text{ cm})")} với ${m("OO' = 5")} cm. Xác định vị trí tương đối và số điểm chung.`, sol:[`${m("OO' = 5 = 8 - 3 = R - r")} ⇒ tiếp xúc trong, có 1 điểm chung.`]},
  {kind:'lt', tag:'Luyện tập', label:'Bài 2', de:`${m('(O;\\,10\\text{ cm})')} và ${m("(O';\\,17\\text{ cm})")} cắt nhau tại ${m('A, B')}, ${m('AB = 16')} cm (${m("O, O'")} khác phía với ${m('AB')}). Tính ${m("OO'")}.`, sol:[`${m('AH = 8')}; ${m('OH = 6')}; ${m("O'H = 15")}.`, `${m("OO' = 21")} cm.`]},
  {kind:'sum', tag:'Tổng kết', title:'Ghi nhớ', body:`<ul><li>So sánh ${m("OO'")} với ${m('R + r')} và ${m('R - r')}.</li><li>Cắt nhau: ${m("OO'")} là trung trực của dây chung.</li><li>Tiếp xúc: tiếp điểm nằm trên ${m("OO'")}.</li></ul>` + HOME('Bài 17')},
]},

/* ---------------- ÔN TẬP ---------------- */
{ id:'on-tap-c5', name:'Ôn tập chương V', desc:'Hệ thống kiến thức đường tròn; ví dụ tổng hợp tiếp tuyến – dây cung, hình quạt.', slides:[
  {kind:'title', tag:'Toán 9 · Kết nối tri thức', title:'Ôn tập chương V', sub:'Đường tròn', points:['Hệ thống: vị trí điểm, dây – cung, độ dài cung – diện tích quạt, tiếp tuyến, hai đường tròn.', 'Vận dụng tổng hợp vào bài toán hình và thực tế.']},
  {kind:'kt', tag:'Hệ thống kiến thức', title:'Công thức cần nhớ', body:`<table class="lk-table lk-left"><tr><th>Nội dung</th><th>Ghi nhớ</th></tr>
    <tr><td>Điểm – đường tròn</td><td>So sánh ${m('OM')} với ${m('R')}</td></tr><tr><td>Dây</td><td>${m('AB \\le 2R')}; ${m('OH^2 + AH^2 = R^2')}</td></tr>
    <tr><td>Cung</td><td>Cung nhỏ = góc ở tâm; ${m('l = \\dfrac{\\pi R n}{180}')}</td></tr><tr><td>Diện tích</td><td>${m('S_{quạt} = \\dfrac{\\pi R^2 n}{360}')}; ${m('S_{vk} = \\pi(R^2 - r^2)')}</td></tr>
    <tr><td>Đường thẳng – đường tròn</td><td>So sánh ${m('d')} với ${m('R')}; tiếp tuyến ⊥ bán kính</td></tr><tr><td>Hai đường tròn</td><td>So sánh ${m("OO'")} với ${m('R \\pm r')}</td></tr></table>`},
  {kind:'vd', tag:'Ví dụ tổng hợp', label:'Ví dụ 1', de:`Cho ${m('(O;\\,10\\text{ cm})')}, dây ${m('AB = 12')} cm. Các tiếp tuyến tại ${m('A')} và ${m('B')} cắt nhau tại ${m('M')}; ${m('OM')} cắt ${m('AB')} tại ${m('H')}. Tính ${m('OH')}, ${m('OM')}, ${m('MA')}.`, fig:F_review(),
   sol:[`${m('MA = MB')}, ${m('OA = OB')} ⇒ ${m('OM')} là trung trực của ${m('AB')}: ${m('OM \\perp AB')} tại trung điểm ${m('H')}, ${m('AH = 6')}; ${m('OH = \\sqrt{100 - 36} = 8')} cm.`, `Tam giác ${m('OAM')} vuông tại ${m('A')}, đường cao ${m('AH')}: ${m('OA^2 = OH\\cdot OM \\Rightarrow OM = \\dfrac{100}{8} = 12{,}5')} cm.`, `${m('MA = \\sqrt{12{,}5^2 - 10^2} = 7{,}5')} cm.`], ans:`${tb('OH = 8;\\ OM = 12{,}5;\\ MA = 7{,}5')} (cm).`},
  {kind:'vd', tag:'Ví dụ tổng hợp', label:'Ví dụ 2', de:`Một sân khấu có mặt sàn hình quạt tròn bán kính ${m('10')} m, góc ở tâm ${m(dg(120))}. Tính diện tích mặt sàn và độ dài mép cong (${m('\\pi \\approx 3{,}14')}, làm tròn đến hàng phần mười).`,
   sol:[`${m('S = \\dfrac{\\pi\\cdot 10^2\\cdot 120}{360} = \\dfrac{100\\pi}{3} \\approx 104{,}7')} m².`, `${m('l = \\dfrac{\\pi\\cdot 10\\cdot 120}{180} = \\dfrac{20\\pi}{3} \\approx 20{,}9')} m.`], ans:`${tb('S \\approx 104{,}7')} m²; ${tb('l \\approx 20{,}9')} m.`},
  {kind:'lt', tag:'Luyện tập', label:'Bài 1', de:`Cho ${m('(O;\\,6\\text{ cm})')}, ${m("(O';\\,2\\text{ cm})")}, ${m("OO' = 8")} cm. Xác định vị trí tương đối.`, sol:[`${m("OO' = 8 = 6 + 2")} ⇒ tiếp xúc ngoài.`]},
  {kind:'lt', tag:'Luyện tập', label:'Bài 2', de:`Tính diện tích hình vành khuyên giới hạn bởi hai đường tròn đồng tâm có đường kính ${m('20')} cm và ${m('12')} cm.`, sol:[`${m('R = 10,\\ r = 6')}: ${m('S = \\pi(100 - 36) = 64\\pi')} cm².`]},
  {kind:'sum', tag:'Tổng kết', title:'Chuẩn bị kiểm tra', body:`<ul><li>Vẽ hình cẩn thận, đánh dấu góc vuông ở tiếp điểm, trung điểm dây.</li><li>Tính toán chủ yếu bằng Pythagore và tỉ số lượng giác.</li><li>Công thức độ dài cung, diện tích quạt: chú ý đơn vị và làm tròn.</li></ul>` + box('Luyện thêm: web <b>Học mà chơi</b> – Toán 9, Ôn tập chương V (3 mức độ).')},
]},
]});
})();
