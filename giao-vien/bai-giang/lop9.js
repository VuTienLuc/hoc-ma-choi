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

/* =====================================================================
   ÔN THI TUYỂN SINH VÀO LỚP 10 – HÌNH HỌC 1. TIẾP TUYẾN CỦA ĐƯỜNG TRÒN
   ===================================================================== */
(() => {
const m=tm;
const box=h=>`<div class="lk-box">${h}</div>`, note=h=>`<div class="lk-note">⚠️ ${h}</div>`;
const at=(r,a)=>[r*Math.cos(a*Math.PI/180),r*Math.sin(a*Math.PI/180)];
const dir=(P,Q)=>Math.atan2(Q[1]-P[1],Q[0]-P[0])*180/Math.PI;
const rightAt=(A,P)=>[A[0],A[1],dir(A,P)];
const Fone=()=>{const O=[0,0],A=[1.8,2.4],M=[5,0];return circleSVG({C:[{x:0,y:0,r:3,lab:'O'}],P:[[...A,'A'],[...M,'M']],S:[[...O,...A],[...A,...M],[...O,...M,true]],right:[rightAt(A,O)]});};
const Ftwo=()=>{const O=[0,0],A=[2.5,3],B=[2.5,-3],M=[6.1,0],H=[2.5,0];return circleSVG({C:[{x:0,y:0,r:Math.sqrt(15.25),lab:'O'}],P:[[...A,'A'],[...B,'B'],[...M,'M'],[...H,'H',-70]],S:[[...M,...A],[...M,...B],[...O,...A],[...O,...B],[...A,...B],[...O,...M,true]],right:[rightAt(A,O),rightAt(B,O)]});};
const Fsec=()=>{const O=[0,0],A=[1.8,2.4],M=[5,0],C=[3,0],D=[-3,0];return circleSVG({C:[{x:0,y:0,r:3,lab:'O'}],P:[[...A,'A'],[...M,'M'],[...C,'C',-70],[...D,'D',-70]],S:[[...M,...A],[...O,...A],[...M,...D]],right:[rightAt(A,O)]});};
const table=`<table class="lk-table lk-left"><tr><th>Dạng</th><th>Dấu hiệu cần nhìn thấy</th><th>Công cụ chính</th></tr>
<tr><td>Nhận biết, chứng minh tiếp tuyến</td><td>Điểm thuộc đường tròn và góc vuông</td><td>${m('A\\in(O),\\ OA\\perp d')}</td></tr>
<tr><td>Một tiếp tuyến</td><td>Tam giác vuông tại tiếp điểm</td><td>${m('OM^2=OA^2+MA^2')}</td></tr>
<tr><td>Hai tiếp tuyến</td><td>${m('MA,MB')} cùng xuất phát từ ${m('M')}</td><td>${m('MA=MB')}, các tia phân giác</td></tr>
<tr><td>Dây tiếp điểm</td><td>${m('AB')} nối hai tiếp điểm</td><td>${m('OM\\perp AB')}, ${m('OH\\cdot OM=R^2')}</td></tr>
<tr><td>Tiếp tuyến – cát tuyến</td><td>${m('MA')} tiếp tuyến, ${m('MCD')} cát tuyến</td><td>${m('MA^2=MC\\cdot MD')}</td></tr></table>`;

const Fang=(arcDeg=100)=>{const A=at(3,200),B=at(3,200+arcDeg),C=at(3,45);return circleSVG({C:[{x:0,y:0,r:3,lab:'O'}],P:[[...A,'A'],[...B,'B'],[...C,'C']],S:[[0,0,...A],[0,0,...B],[...C,...A],[...C,...B]],arc:{x:0,y:0,r:3,a1:200,a2:200+arcDeg}});};
const Fdiam=()=>{const A=[-3,0],B=[3,0],C=at(3,70);return circleSVG({C:[{x:0,y:0,r:3,lab:'O'}],P:[[...A,'A'],[...B,'B'],[...C,'C']],S:[[...A,...B],[...A,...C],[...B,...C]]});};
const Fquad=()=>{const A=at(3,145),B=at(3,35),C=at(3,-45),D=at(3,225);return circleSVG({C:[{x:0,y:0,r:3,lab:'O'}],P:[[...A,'A'],[...B,'B'],[...C,'C'],[...D,'D']],S:[[...A,...B],[...B,...C],[...C,...D],[...D,...A],[...A,...C,true]]});};
const FtanChord=()=>{const A=at(3,180),B=at(3,300),C=at(3,70);return circleSVG({C:[{x:0,y:0,r:3,lab:'O'}],P:[[...A,'A'],[...B,'B'],[...C,'C']],S:[[...A,...B],[...C,...A],[...C,...B]],L:[[-3,-4,-3,4,'x']]});};
const Fcross=()=>{const A=at(3,150),B=at(3,20),C=at(3,230),D=at(3,320);return circleSVG({C:[{x:0,y:0,r:3,lab:'O'}],P:[[...A,'A'],[...B,'B'],[...C,'C'],[...D,'D'],[0,0,'E',-60]],S:[[...A,...D],[...B,...C]]});};

const Fsector2=(n=90)=>circleSVG({C:[{x:0,y:0,r:3,lab:'O'}],sector:{x:0,y:0,r:3,a1:20,a2:20+n},S:[[0,0,...at(3,20),false,'R'],[0,0,...at(3,20+n)]],ang:[[0,0,20,20+n,m(`${n}^\\circ`)]]});
const Fring2=()=>circleSVG({C:[{x:0,y:0,r:4,lab:'O'},{x:0,y:0,r:2.2}],ring:{x:0,y:0,r1:4,r2:2.2},S:[[0,0,...at(4,25),false,'R'],[0,0,...at(2.2,205),false,'r']]});
const FannSector=()=>circleSVG({C:[{x:0,y:0,r:4,lab:'O'},{x:0,y:0,r:2}],S:[[...at(2,20),...at(4,20)],[...at(2,120),...at(4,120)],[0,0,...at(4,20),true],[0,0,...at(4,120),true]],arc:{x:0,y:0,r:4,a1:20,a2:120},ang:[[0,0,20,120,m('100^\\circ')]]});

/* Hình parabol y = ax² (a = p/q) cho bài giảng và phiếu in; pts = [[x, y, 'A'], …] */
window.ParabFig = (p,q,pts=[]) => {
  const a=p/q, m=Math.max(2,...pts.map(t=>Math.abs(t[0]))), ymax=Math.max(Math.ceil(Math.abs(a)*m*m),...pts.map(t=>Math.abs(t[1])));
  const U=26, W=(2*m+2)*U, ytop=a>0?ymax+1:1, H=(ymax+2)*U, X=x=>(x+m+1)*U, Y=y=>(ytop-y)*U, ly=a>0?14:-5;
  let s=`<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Parabol y = ax²" style="max-height:340px">`;
  for(let x=-m-1;x<=m+1;x++) s+=`<line class="sv-grid" x1="${X(x)}" y1="0" x2="${X(x)}" y2="${H}"/>`;
  for(let y=Math.ceil(ytop-ymax-2);y<=ytop;y++) s+=`<line class="sv-grid" x1="0" y1="${Y(y)}" x2="${W}" y2="${Y(y)}"/>`;
  s+=`<line class="sv-axis" x1="0" y1="${Y(0)}" x2="${W}" y2="${Y(0)}"/><line class="sv-axis" x1="${X(0)}" y1="0" x2="${X(0)}" y2="${H}"/>`;
  s+=`<text class="sv-txt" x="${W-12}" y="${Y(0)+(a>0?-6:16)}" font-size="14">x</text><text class="sv-txt" x="${X(0)+7}" y="13" font-size="14">y</text><text class="sv-muted" x="${X(0)-5}" y="${Y(0)+ly}" font-size="12" text-anchor="end">O</text>`;
  for(let x=-m;x<=m;x++) if(x) s+=`<text class="sv-muted" x="${X(x)}" y="${Y(0)+ly}" font-size="11" text-anchor="middle">${x}</text>`;
  for(let y=Math.ceil(ytop-ymax-2);y<ytop;y++) if(y) s+=`<text class="sv-muted" x="${X(0)-5}" y="${Y(y)+4}" font-size="11" text-anchor="end">${y}</text>`;
  let d=''; for(let i=-m*20;i<=m*20;i++){const x=i/20; d+=(d?'L':'M')+X(x).toFixed(1)+' '+Y(a*x*x).toFixed(1);}
  s+=`<path class="sv-ink" fill="none" stroke-width="2.6" d="${d}"/>`;
  pts.forEach(([x,y,l])=>{s+=`<circle class="sv-dot" cx="${X(x)}" cy="${Y(y)}" r="4.5"/>`+(l?`<text class="sv-txt" x="${X(x)+8}" y="${Y(y)-8}" font-size="15">${l}</text>`:'')});
  return s+'</svg>';
};

Lecture.add({grade:'lop9',gradeName:'Toán 9',chapter:'Ôn thi tuyển sinh vào lớp 10 · Đại số và Hình học',lessons:[
{id:'on-thi-tiep-tuyen',name:'Hình học 1. Tiếp tuyến của đường tròn',desc:'Hệ thống đầy đủ các dạng tiếp tuyến từ nhận biết, tính toán đến chứng minh tổng hợp và vận dụng nâng cao.',slides:[
 {kind:'title',tag:'Ôn thi tuyển sinh · Hình học 1',title:'Tiếp tuyến của đường tròn',sub:'Từ nền tảng đến vận dụng nâng cao',points:['Nắm chắc tính chất, dấu hiệu và các mô hình hình học thường gặp.','Giải thành thạo sáu dạng bài tính toán và chứng minh.','Biết trình bày lời giải có căn cứ, tránh suy luận thiếu điều kiện.']},
 {kind:'kt',tag:'Bản đồ chuyên đề',title:'Sáu dạng cần làm chủ',body:table},
 {kind:'kt',tag:'Kiến thức nền 1',title:'Tính chất và dấu hiệu nhận biết',fig:Fone(),body:box(`<b>Tính chất:</b> nếu ${m('MA')} là tiếp tuyến của ${m('(O)')} tại ${m('A')} thì ${m('OA\\perp MA')}.`)+box(`<b>Dấu hiệu:</b> nếu ${m('A\\in(O)')} và đường thẳng ${m('d')} vuông góc với ${m('OA')} tại ${m('A')} thì ${m('d')} là tiếp tuyến của ${m('(O)')} tại ${m('A')}.`)+note(`Khi chứng minh tiếp tuyến phải nêu đủ hai ý: tiếp điểm nằm trên đường tròn và đường thẳng vuông góc với bán kính tại tiếp điểm.`)},
 {kind:'kt',tag:'Kiến thức nền 2',title:'Hai tiếp tuyến xuất phát từ một điểm',fig:Ftwo(),body:box(`Nếu ${m('MA,MB')} là hai tiếp tuyến của ${m('(O)')} thì ${m('MA=MB')}; ${m('MO')} là phân giác ${m('\\widehat{AMB}')}; ${m('OM')} là phân giác ${m('\\widehat{AOB}')}.`)+box(`Hai góc ${m('\\widehat{OAM},\\widehat{OBM}')} đều bằng ${m('90^\\circ')}, do đó ${m('O,A,M,B')} cùng thuộc đường tròn có đường kính ${m('OM')} và ${m('\\widehat{AOB}+\\widehat{AMB}=180^\\circ')}.`)},
 {kind:'kt',tag:'Kiến thức nền 3',title:'Dây tiếp điểm và hệ thức quan trọng',fig:Ftwo(),body:box(`Gọi ${m('H=OM\\cap AB')}. Vì ${m('OA=OB')} và ${m('MA=MB')}, cả ${m('O,M')} nằm trên đường trung trực của ${m('AB')}. Suy ra ${m('OM\\perp AB')} và ${m('HA=HB')}.`)+box(`Trong tam giác vuông ${m('OAM')}, ${m('AH')} là đường cao ứng với cạnh huyền: ${m('OH\\cdot OM=OA^2=R^2')}; ${m('AH\\cdot OM=OA\\cdot AM')}.`)},
 {kind:'kt',tag:'Kiến thức nâng cao',title:'Định lí tiếp tuyến – cát tuyến',fig:Fsec(),body:box(`Từ ${m('M')} ngoài ${m('(O)')}, kẻ tiếp tuyến ${m('MA')} và cát tuyến ${m('MCD')} (${m('C')} nằm giữa ${m('M,D')}). Khi đó ${m('MA^2=MC\\cdot MD')}.`)+`<p><b>Căn cứ:</b> góc tạo bởi tiếp tuyến và dây bằng góc nội tiếp chắn cùng cung, suy ra hai tam giác thích hợp đồng dạng.</p>`+note(`Luôn dùng toàn bộ đoạn ${m('MD')}, không dùng riêng phần nằm trong đường tròn ${m('CD')}.`)},

 {kind:'method',tag:'Dạng 1',title:'Nhận biết và chứng minh một đường thẳng là tiếp tuyến',steps:[`Xác định tiếp điểm dự kiến ${m('A')} và chứng minh ${m('A\\in(O)')}.`,`Chứng minh đường thẳng cần xét vuông góc với ${m('OA')} tại ${m('A')}. Có thể dùng góc vuông, Pythagore đảo, hai góc phụ nhau hoặc khoảng cách từ tâm đến đường thẳng bằng bán kính.`,`Kết luận bằng đúng dấu hiệu nhận biết tiếp tuyến.`]},
 {kind:'vd',tag:'Ví dụ 1 · Dạng 1',label:'Ví dụ 1',de:`Cho tam giác ${m('ABC')} có ${m('AB=6')} cm, ${m('AC=8')} cm, ${m('BC=10')} cm. Chứng minh ${m('AB')} là tiếp tuyến của đường tròn ${m('(C;\\,CA)')}.`,sol:[`${m('AB^2+AC^2=6^2+8^2=100=BC^2')}. Theo định lí Pythagore đảo, tam giác ${m('ABC')} vuông tại ${m('A')}; vì thế ${m('AB\\perp AC')}.`,`Điểm ${m('A')} thuộc đường tròn ${m('(C;\\,CA)')} vì khoảng cách từ ${m('A')} đến tâm ${m('C')} bằng bán kính ${m('CA')}.`,`Vậy ${m('AB')} đi qua ${m('A\\in(C;\\,CA)')} và vuông góc với bán kính ${m('CA')} tại ${m('A')}; do đó ${m('AB')} là tiếp tuyến tại ${m('A')}.`]},
 {kind:'vd',tag:'Ví dụ 2 · Dạng 1',label:'Ví dụ 2',de:`Cho đường tròn ${m('(O;\\,5\\text{ cm})')} và điểm ${m('M')} với ${m('OM=13')} cm. Lấy ${m('A\\in(O)')} sao cho ${m('AM=12')} cm. Chứng minh ${m('MA')} là tiếp tuyến của ${m('(O)')}.`,fig:Fone(),sol:[`${m('OA^2+AM^2=5^2+12^2=169=OM^2')}. Theo Pythagore đảo, tam giác ${m('OAM')} vuông tại ${m('A')}.`,`Suy ra ${m('OA\\perp AM')}. Vì ${m('A\\in(O)')}, ${m('MA')} là tiếp tuyến của ${m('(O)')} tại ${m('A')}.`]},

 {kind:'method',tag:'Dạng 2',title:'Tính độ dài với một tiếp tuyến',steps:[`Nối tâm ${m('O')} với tiếp điểm ${m('A')}; ghi ngay ${m('OA\\perp MA')}.`,`Áp dụng Pythagore trong tam giác vuông ${m('OAM')}: ${m('OM^2=OA^2+AM^2')}.`,`Kiểm tra điều kiện ${m('OM\\gt R')} và đơn vị của kết quả.`]},
 {kind:'vd',tag:'Ví dụ 3 · Dạng 2',label:'Ví dụ 3',de:`Từ ${m('M')} kẻ tiếp tuyến ${m('MA')} đến ${m('(O;\\,6\\text{ cm})')}. Biết ${m('OM=10')} cm. Tính ${m('MA')}.`,fig:Fone(),sol:[`Vì ${m('MA')} là tiếp tuyến tại ${m('A')}, ${m('OA\\perp MA')}; tam giác ${m('OAM')} vuông tại ${m('A')}.`,`${m('MA^2=OM^2-OA^2=10^2-6^2=64')}.`,`Vì độ dài dương, ${m('MA=8')} cm.`],ans:`${tb('MA=8')} cm.`},

 {kind:'method',tag:'Dạng 3',title:'Hai tiếp tuyến cắt nhau: cạnh và góc',steps:[`Ghi ${m('MA=MB')} và các cặp bán kính vuông góc với tiếp tuyến.`,`Dùng hai tam giác vuông ${m('OAM,OBM')} bằng nhau để suy ra hai đường phân giác.`,`Tính góc bằng ${m('\\widehat{AOB}+\\widehat{AMB}=180^\\circ')}; tính cạnh trong tam giác vuông ${m('OAM')}.`]},
 {kind:'vd',tag:'Ví dụ 4 · Dạng 3',label:'Ví dụ 4',de:`Từ ${m('M')} kẻ hai tiếp tuyến ${m('MA,MB')} đến ${m('(O;\\,5\\text{ cm})')}. Biết ${m('OM=10')} cm. Tính ${m('MA')}, ${m('\\widehat{AMB}')} và ${m('\\widehat{AOB}')}.`,fig:Ftwo(),sol:[`Tam giác ${m('OAM')} vuông tại ${m('A')}: ${m('MA=\\sqrt{10^2-5^2}=5\\sqrt3')} cm.`,`Trong tam giác vuông ${m('OAM')}, ${m('\\sin\\widehat{AMO}=OA/OM=1/2')}, nên ${m('\\widehat{AMO}=30^\\circ')}. Vì ${m('MO')} là phân giác, ${m('\\widehat{AMB}=60^\\circ')}.`,`${m('\\widehat{AOB}=180^\\circ-\\widehat{AMB}=120^\\circ')}.`],ans:`${tb('MA=5\\sqrt3\\text{ cm};\\ \\widehat{AMB}=60^\\circ;\\ \\widehat{AOB}=120^\\circ')}.`},

 {kind:'method',tag:'Dạng 4',title:'Dây tiếp điểm',steps:[`Gọi ${m('H=OM\\cap AB')}; chứng minh ${m('OM')} là đường trung trực của ${m('AB')}.`,`Dùng hệ thức lượng ${m('OH=R^2/OM')} hoặc Pythagore để tìm ${m('OH')}.`,`Tính ${m('AH=R\\cdot MA/OM')} rồi suy ra ${m('AB=2AH')}.`]},
 {kind:'vd',tag:'Ví dụ 5 · Dạng 4',label:'Ví dụ 5',de:`Cho ${m('(O;\\,6\\text{ cm})')} và ${m('OM=10')} cm. Hai tiếp tuyến từ ${m('M')} tiếp xúc tại ${m('A,B')}; ${m('H=OM\\cap AB')}. Tính ${m('OH,AB')}.`,fig:Ftwo(),sol:[`${m('OA=OB')} và ${m('MA=MB')} nên ${m('OM')} là đường trung trực của ${m('AB')}: ${m('OM\\perp AB')}, ${m('HA=HB')}.`,`Trong tam giác vuông ${m('OAM')}, đường cao ${m('AH')}: ${m('OH\\cdot OM=OA^2')}. Vậy ${m('OH=36/10=3{,}6')} cm.`,`Ta có ${m('MA=\\sqrt{10^2-6^2}=8')} cm và ${m('AH\\cdot OM=OA\\cdot MA')}; do đó ${m('AH=6\\cdot8/10=4{,}8')} cm.`,`Suy ra ${m('AB=2AH=9{,}6')} cm.`],ans:`${tb('OH=3{,}6\\text{ cm};\\ AB=9{,}6\\text{ cm}')}.`},

 {kind:'method',tag:'Dạng 5',title:'Tiếp tuyến – cát tuyến',steps:[`Xác định đúng điểm ngoài ${m('M')}, đoạn tiếp tuyến ${m('MA')} và hai đoạn từ ${m('M')} đến giao điểm của cát tuyến: ${m('MC,MD')}.`,`Viết ${m('MA^2=MC\\cdot MD')}. Nếu đề cho ${m('MC,CD')}, phải tính ${m('MD=MC+CD')}.`,`Giải hệ thức, chọn độ dài dương và kết luận.`]},
 {kind:'vd',tag:'Ví dụ 6 · Dạng 5',label:'Ví dụ 6',de:`Từ ${m('M')} kẻ tiếp tuyến ${m('MA')} và cát tuyến ${m('MCD')} của ${m('(O)')}, ${m('C')} nằm giữa ${m('M,D')}. Biết ${m('MC=4')} cm, ${m('CD=5')} cm. Tính ${m('MA')}.`,fig:Fsec(),sol:[`${m('MD=MC+CD=4+5=9')} cm.`,`Theo định lí tiếp tuyến–cát tuyến: ${m('MA^2=MC\\cdot MD=4\\cdot9=36')}.`,`Vì ${m('MA\\gt0')}, ${m('MA=6')} cm.`],ans:`${tb('MA=6')} cm.`},

 {kind:'method',tag:'Dạng 6',title:'Bài chứng minh tổng hợp',steps:[`Đánh dấu ngay các góc vuông tại tiếp điểm; tìm tứ giác nội tiếp có đường kính là đoạn nối tâm với điểm ngoài.`,`Khai thác đường trung trực của dây tiếp điểm và các tam giác đồng dạng sinh ra từ đường cao trong tam giác vuông.`,`Mỗi kết luận phải gắn với căn cứ: hai tiếp tuyến, bán kính vuông góc tiếp tuyến, Pythagore, hệ thức lượng hoặc đồng dạng.`]},
 {kind:'vd',tag:'Ví dụ 7 · Dạng 6',label:'Ví dụ 7',de:`Từ ${m('M')} ngoài ${m('(O)')} kẻ hai tiếp tuyến ${m('MA,MB')}; gọi ${m('H=OM\\cap AB')}. Chứng minh: a) ${m('O,A,M,B')} cùng thuộc một đường tròn; b) ${m('OM\\perp AB')}; c) ${m('OH\\cdot OM=OA^2')}.`,fig:Ftwo(),sol:[`Vì ${m('OA\\perp MA')} và ${m('OB\\perp MB')}, ${m('\\widehat{OAM}=\\widehat{OBM}=90^\\circ')}. Hai điểm ${m('A,B')} cùng nhìn đoạn ${m('OM')} dưới góc vuông, nên ${m('O,A,M,B')} cùng thuộc đường tròn đường kính ${m('OM')}.`,`Ta có ${m('OA=OB')} (bán kính) và ${m('MA=MB')} (hai tiếp tuyến từ ${m('M')}). Vậy ${m('O,M')} cùng nằm trên đường trung trực của ${m('AB')}; suy ra ${m('OM\\perp AB')}.`,`Trong tam giác vuông ${m('OAM')}, ${m('AH\\perp OM')} nên ${m('AH')} là đường cao ứng với cạnh huyền. Theo hệ thức lượng, ${m('OA^2=OH\\cdot OM')}.`]},
 {kind:'lt',tag:'Tự luyện',label:'Bài 1',de:`Cho ${m('(O;\\,8\\text{ cm})')}, ${m('OM=17')} cm. Kẻ hai tiếp tuyến ${m('MA,MB')}. Tính ${m('MA')} và ${m('MB')}.`,sol:[`${m('MA=\\sqrt{17^2-8^2}=15')} cm.`,`Do ${m('MA,MB')} là hai tiếp tuyến xuất phát từ ${m('M')}, ${m('MB=MA=15')} cm.`]},
 {kind:'lt',tag:'Tự luyện',label:'Bài 2',de:`Từ ${m('M')} kẻ tiếp tuyến ${m('MA')} và cát tuyến ${m('MCD')}. Biết ${m('MA=12')} cm, ${m('MC=8')} cm. Tính ${m('MD')} và ${m('CD')}.`,sol:[`${m('MD=MA^2/MC=144/8=18')} cm.`,`${m('CD=MD-MC=18-8=10')} cm.`]},
 {kind:'sum',tag:'Tổng kết',title:'Checklist trước khi nộp bài',body:`<ul><li>Đã ghi rõ bán kính vuông góc với tiếp tuyến tại tiếp điểm.</li><li>Đã phân biệt ${m('MD')} với ${m('CD')} trong bài cát tuyến.</li><li>Đã nêu căn cứ khi dùng ${m('MA=MB')}, đường phân giác hoặc đường trung trực.</li><li>Đã chọn nghiệm độ dài dương và ghi đúng đơn vị.</li><li>Với bài tổng hợp, mỗi dòng biến đổi đều gắn với tính chất hoặc định lí.</li></ul>`+box(`Luyện tiếp bằng <b>Phiếu luyện tập 20 bài</b>, sắp xếp từ cơ bản đến nâng cao.`)}
]},
{id:'on-thi-goc-duong-tron',name:'Hình học 2. Góc ở tâm, góc nội tiếp',desc:'Hệ thống đầy đủ quan hệ giữa góc và cung, tứ giác nội tiếp, tiếp tuyến–dây và các dạng góc nâng cao.',slides:[
 {kind:'title',tag:'Ôn thi tuyển sinh · Hình học 2',title:'Góc ở tâm, góc nội tiếp',sub:'Quan hệ giữa góc, cung và tứ giác nội tiếp',points:['Tính đúng số đo cung, góc ở tâm và góc nội tiếp.','Nhận biết, chứng minh tứ giác nội tiếp và vận dụng góc cùng chắn cung.','Giải các bài tổng hợp có tiếp tuyến, dây, cát tuyến từ cơ bản đến nâng cao.']},
 {kind:'kt',tag:'Bản đồ chuyên đề',title:'Sáu dạng cần làm chủ',body:`<table class="lk-table lk-left"><tr><th>Dạng</th><th>Quan hệ chính</th></tr><tr><td>Cung và góc ở tâm</td><td>${m('\\text{sđ}\\overset{\\frown}{AB}=\\widehat{AOB}')}</td></tr><tr><td>Góc nội tiếp</td><td>${m('\\widehat{ACB}=\\dfrac12\\text{sđ}\\overset{\\frown}{AB}')}</td></tr><tr><td>Góc cùng chắn cung; đường kính</td><td>Cùng chắn một cung thì bằng nhau; chắn nửa đường tròn thì bằng ${m('90^\\circ')}</td></tr><tr><td>Tứ giác nội tiếp</td><td>Tổng hai góc đối bằng ${m('180^\\circ')}</td></tr><tr><td>Tiếp tuyến và dây</td><td>Góc tiếp tuyến–dây bằng góc nội tiếp cùng chắn cung</td></tr><tr><td>Đỉnh trong hoặc ngoài đường tròn</td><td>Nửa tổng hoặc nửa hiệu hai cung</td></tr></table>`},
 {kind:'kt',tag:'Kiến thức nền 1',title:'Góc ở tâm và số đo cung',fig:Fang(100),body:box(`Góc ${m('\\widehat{AOB}')} có đỉnh tại tâm là <b>góc ở tâm</b>. Số đo cung nhỏ ${m('AB')} bằng số đo góc ở tâm chắn cung đó.`)+box(`Cung lớn ${m('AB')} có số đo ${m('360^\\circ-\\widehat{AOB}')}; nửa đường tròn có số đo ${m('180^\\circ')}.`)+note('Trước khi tính phải xác định đề đang hỏi cung nhỏ hay cung lớn.')},
 {kind:'kt',tag:'Kiến thức nền 2',title:'Góc nội tiếp',fig:Fang(100),body:box(`Góc ${m('\\widehat{ACB}')} có đỉnh ${m('C')} nằm trên đường tròn và hai cạnh chứa hai dây là <b>góc nội tiếp</b>.`)+box(`${m('\\widehat{ACB}=\\dfrac12\\text{sđ}\\overset{\\frown}{AB}=\\dfrac12\\widehat{AOB}')}, khi góc ở tâm và góc nội tiếp cùng chắn cung ${m('AB')}.`)+`<p>Vì vậy góc ở tâm chắn cùng một cung bằng hai lần góc nội tiếp.</p>`},
 {kind:'kt',tag:'Hệ quả quan trọng',title:'Cùng chắn một cung và chắn đường kính',fig:Fdiam(),body:box('Các góc nội tiếp cùng chắn một cung hoặc chắn các cung bằng nhau thì bằng nhau.')+box(`Góc nội tiếp chắn nửa đường tròn bằng ${m('90^\\circ')}. Ngược lại, một góc nội tiếp bằng ${m('90^\\circ')} thì chắn một đường kính.`)+`<p>Đây là cách thường dùng để chứng minh hai đường thẳng vuông góc hoặc chứng minh bốn điểm cùng thuộc một đường tròn.</p>`},
 {kind:'kt',tag:'Kiến thức nền 3',title:'Tứ giác nội tiếp',fig:Fquad(),body:box(`Nếu ${m('ABCD')} nội tiếp thì ${m('\\widehat A+\\widehat C=180^\\circ')} và ${m('\\widehat B+\\widehat D=180^\\circ')}.`)+box(`Dấu hiệu thường dùng: một tứ giác có tổng hai góc đối bằng ${m('180^\\circ')}; hoặc hai đỉnh cùng nhìn một đoạn dưới hai góc bằng nhau.`)+box('Góc ngoài của tứ giác nội tiếp bằng góc trong đối diện.')},
 {kind:'kt',tag:'Kiến thức mở rộng',title:'Góc với tiếp tuyến, dây và cát tuyến',fig:FtanChord(),body:box('Góc tạo bởi tiếp tuyến và dây bằng góc nội tiếp chắn cùng cung, đồng thời bằng nửa số đo cung bị chắn.')+box(`Hai dây cắt nhau <b>trong</b> đường tròn: số đo góc bằng <b>nửa tổng</b> số đo hai cung bị chắn.`)+box(`Hai cát tuyến, hoặc tiếp tuyến và cát tuyến, gặp nhau <b>ngoài</b> đường tròn: số đo góc bằng <b>nửa hiệu</b> cung lớn và cung nhỏ.`)},

 {kind:'method',tag:'Dạng 1',title:'Tính cung và góc ở tâm',steps:[`Xác định cung nhỏ, cung lớn và góc ở tâm tương ứng.`,`Dùng số đo cung nhỏ bằng số đo góc ở tâm; cung lớn bằng ${m('360^\\circ')} trừ cung nhỏ.`,`Nếu có nhiều cung liên tiếp, cộng hoặc trừ các góc ở tâm tương ứng.`]},
 {kind:'vd',tag:'Ví dụ 1 · Dạng 1',label:'Ví dụ 1',de:`Trên ${m('(O)')}, tia ${m('OB')} nằm giữa ${m('OA,OC')}; ${m('\\widehat{AOB}=65^\\circ')}, ${m('\\widehat{BOC}=45^\\circ')}. Tính số đo cung nhỏ và cung lớn ${m('AC')}.`,sol:[`${m('\\widehat{AOC}=\\widehat{AOB}+\\widehat{BOC}=65^\\circ+45^\\circ=110^\\circ')}.`,`Cung nhỏ ${m('AC')} có số đo bằng góc ở tâm ${m('\\widehat{AOC}')}, nên bằng ${m('110^\\circ')}.`,`Cung lớn ${m('AC')} có số đo ${m('360^\\circ-110^\\circ=250^\\circ')}.`],ans:`Cung nhỏ ${tb('110^\\circ')}; cung lớn ${tb('250^\\circ')}.`},

 {kind:'method',tag:'Dạng 2',title:'Tính góc nội tiếp và góc cùng chắn cung',steps:[`Chỉ rõ cung bị chắn của mỗi góc.`,`Dùng góc nội tiếp bằng nửa số đo cung bị chắn.`,`Nếu hai góc cùng chắn một cung, kết luận chúng bằng nhau; chú ý hai đỉnh phải nằm trên cùng một phía của dây.`]},
 {kind:'vd',tag:'Ví dụ 2 · Dạng 2',label:'Ví dụ 2',de:`Các điểm ${m('A,B,C,D')} cùng thuộc ${m('(O)')}; ${m('C,D')} nằm trên cùng cung lớn ${m('AB')}. Biết ${m('\\widehat{ACB}=38^\\circ')}. Tính số đo cung nhỏ ${m('AB')} và góc ${m('\\widehat{ADB}')}.`,fig:Fquad(),sol:[`Góc nội tiếp ${m('\\widehat{ACB}')} chắn cung nhỏ ${m('AB')}, nên cung đó có số đo ${m('2\\cdot38^\\circ=76^\\circ')}.`,`Hai góc ${m('\\widehat{ACB},\\widehat{ADB}')} cùng chắn cung nhỏ ${m('AB')}, nên bằng nhau.`,`Suy ra ${m('\\widehat{ADB}=38^\\circ')}.`],ans:`Cung nhỏ ${m('AB')}: ${tb('76^\\circ')}; ${tb('\\widehat{ADB}=38^\\circ')}.`},

 {kind:'method',tag:'Dạng 3',title:'Đường kính và tam giác vuông nội tiếp',steps:[`Nhận ra góc nội tiếp chắn đường kính hoặc chứng minh hai mút cung là hai đầu đường kính.`,`Kết luận góc đó bằng ${m('90^\\circ')}.`,`Kết hợp tổng góc tam giác, Pythagore hoặc hệ thức lượng để tính tiếp.`]},
 {kind:'vd',tag:'Ví dụ 3 · Dạng 3',label:'Ví dụ 3',de:`Tam giác ${m('ABC')} nội tiếp đường tròn có ${m('AB')} là đường kính. Biết ${m('AB=10')} cm, ${m('AC=6')} cm. Tính ${m('BC')}.`,fig:Fdiam(),sol:[`Góc ${m('\\widehat{ACB}')} chắn đường kính ${m('AB')}, nên ${m('\\widehat{ACB}=90^\\circ')}. Tam giác ${m('ABC')} vuông tại ${m('C')}.`,`Theo Pythagore, ${m('BC=\\sqrt{AB^2-AC^2}=\\sqrt{10^2-6^2}=8')} cm.`],ans:`${tb('BC=8')} cm.`},

 {kind:'method',tag:'Dạng 4',title:'Chứng minh và khai thác tứ giác nội tiếp',steps:[`Chọn một dấu hiệu phù hợp: tổng hai góc đối bằng ${m('180^\\circ')}; hai góc cùng nhìn một đoạn bằng nhau; hoặc hai góc vuông cùng chắn một đoạn.`,`Nêu rõ đường tròn đi qua bốn điểm hoặc kết luận tứ giác nội tiếp.`,`Sau đó dùng góc đối bù nhau, góc ngoài bằng góc trong đối diện, hoặc các góc nội tiếp cùng chắn cung.`]},
 {kind:'vd',tag:'Ví dụ 4 · Dạng 4',label:'Ví dụ 4',de:`Cho tam giác ${m('ABC')} có hai đường cao ${m('BE,CF')} cắt nhau tại ${m('H')} (${m('E\\in AC,F\\in AB')}). Chứng minh tứ giác ${m('AEHF')} nội tiếp và suy ra ${m('\\widehat{EHF}+\\widehat{EAF}=180^\\circ')}.`,sol:[`Vì ${m('BE\\perp AC')} nên ${m('\\widehat{AEH}=90^\\circ')}; vì ${m('CF\\perp AB')} nên ${m('\\widehat{AFH}=90^\\circ')}.`,`Hai góc đối của tứ giác ${m('AEHF')} có tổng ${m('180^\\circ')}, nên ${m('AEHF')} nội tiếp đường tròn có đường kính ${m('AH')}.`,`Vì ${m('\\widehat{EHF}')} và ${m('\\widehat{EAF}')} là hai góc đối của tứ giác nội tiếp, ${m('\\widehat{EHF}+\\widehat{EAF}=180^\\circ')}.`]},

 {kind:'method',tag:'Dạng 5',title:'Góc tạo bởi tiếp tuyến và dây cung',steps:[`Xác định dây và cung bị chắn bởi góc tiếp tuyến–dây.`,`Dùng góc tiếp tuyến–dây bằng nửa số đo cung bị chắn hoặc bằng góc nội tiếp cùng chắn cung.`,`Nếu có bán kính tại tiếp điểm, dùng thêm tính chất bán kính vuông góc với tiếp tuyến.`]},
 {kind:'vd',tag:'Ví dụ 5 · Dạng 5',label:'Ví dụ 5',de:`Tiếp tuyến ${m('Ax')} của ${m('(O)')} tại ${m('A')} tạo với dây ${m('AB')} góc ${m('42^\\circ')}. Điểm ${m('C')} nằm trên cung lớn ${m('AB')}. Tính số đo cung nhỏ ${m('AB')}, ${m('\\widehat{ACB}')} và ${m('\\widehat{OAB}')}.`,fig:FtanChord(),sol:[`Góc tạo bởi tiếp tuyến và dây bằng nửa số đo cung bị chắn, nên cung nhỏ ${m('AB')} có số đo ${m('2\\cdot42^\\circ=84^\\circ')}.`,`Góc nội tiếp ${m('\\widehat{ACB}')} cùng chắn cung nhỏ ${m('AB')}, nên ${m('\\widehat{ACB}=42^\\circ')}.`,`Vì ${m('OA\\perp Ax')}, ${m('\\widehat{OAB}=90^\\circ-42^\\circ=48^\\circ')}.`],ans:`${tb('84^\\circ;\\ 42^\\circ;\\ 48^\\circ')}.`},

 {kind:'method',tag:'Dạng 6',title:'Góc có đỉnh trong hoặc ngoài đường tròn',steps:[`Xác định vị trí đỉnh của góc: trong hay ngoài đường tròn.`,`Đỉnh trong: lấy nửa <b>tổng</b> hai cung bị chắn. Đỉnh ngoài: lấy nửa <b>hiệu</b> cung lớn và cung nhỏ.`,`Kiểm tra góc kết quả phải dương và phù hợp với hình vẽ.`]},
 {kind:'vd',tag:'Ví dụ 6 · Dạng 6',label:'Ví dụ 6',de:`Hai dây ${m('AB,CD')} cắt nhau tại ${m('E')} trong đường tròn. Biết cung ${m('AC')} bằng ${m('80^\\circ')}, cung ${m('BD')} bằng ${m('40^\\circ')}. Tính ${m('\\widehat{AEC}')}.`,fig:Fcross(),sol:[`Đỉnh ${m('E')} nằm trong đường tròn, nên góc bằng nửa tổng hai cung bị chắn.`,`${m('\\widehat{AEC}=\\dfrac{80^\\circ+40^\\circ}{2}=60^\\circ')}.`],ans:`${tb('60^\\circ')}.`},
 {kind:'vd',tag:'Ví dụ 7 · Dạng 6',label:'Ví dụ 7',de:`Từ điểm ${m('M')} ngoài đường tròn kẻ hai cát tuyến tạo một góc chắn hai cung có số đo ${m('150^\\circ')} và ${m('70^\\circ')}. Tính góc tại ${m('M')}.`,sol:[`Đỉnh ${m('M')} nằm ngoài đường tròn, nên góc bằng nửa hiệu cung lớn và cung nhỏ.`,`${m('\\widehat M=\\dfrac{150^\\circ-70^\\circ}{2}=40^\\circ')}.`],ans:`${tb('40^\\circ')}.`},
 {kind:'lt',tag:'Tự luyện',label:'Bài 1',de:`Tứ giác ${m('ABCD')} nội tiếp có ${m('\\widehat A=72^\\circ')}, ${m('\\widehat B=105^\\circ')}. Tính ${m('\\widehat C,\\widehat D')}.`,sol:[`Hai góc đối của tứ giác nội tiếp bù nhau.`,`Suy ra ${m('\\widehat C=180^\\circ-72^\\circ=108^\\circ')}; ${m('\\widehat D=180^\\circ-105^\\circ=75^\\circ')}.`]},
 {kind:'lt',tag:'Tự luyện',label:'Bài 2',de:`Hai góc nội tiếp cùng chắn cung ${m('AB')}. Một góc bằng ${m('47^\\circ')}. Tính góc còn lại và số đo cung ${m('AB')}.`,sol:[`Hai góc cùng chắn một cung nên góc còn lại bằng ${m('47^\\circ')}.`,`Cung ${m('AB')} có số đo ${m('2\\cdot47^\\circ=94^\\circ')}.`]},
 {kind:'sum',tag:'Tổng kết',title:'Checklist trước khi nộp bài',body:`<ul><li>Đã xác định đúng cung bị chắn và cung nhỏ hay cung lớn.</li><li>Đã kiểm tra đỉnh của góc nằm ở tâm, trên, trong hay ngoài đường tròn.</li><li>Đã nêu rõ hai góc cùng chắn cung nào trước khi kết luận bằng nhau.</li><li>Khi chứng minh tứ giác nội tiếp, đã ghi đủ dấu hiệu và cặp góc được sử dụng.</li><li>Đỉnh trong dùng nửa tổng; đỉnh ngoài dùng nửa hiệu.</li></ul>`+box('Luyện tiếp bằng <b>Phiếu luyện tập 20 bài</b>, có đủ bài tính toán và chứng minh tổng hợp.')}
]},
{id:'on-thi-hinh-quat-vanh-khuyen',name:'Hình học 3. Hình quạt tròn và hình vành khuyên',desc:'Độ dài cung, diện tích quạt và vành khuyên; hình ghép, chu vi và bài toán thực tế từ cơ bản đến nâng cao.',slides:[
 {kind:'title',tag:'Ôn thi tuyển sinh · Hình học 3',title:'Hình quạt tròn và hình vành khuyên',sub:'Độ dài, diện tích và các hình ghép thường gặp',points:['Phân biệt và sử dụng đúng công thức độ dài cung, diện tích quạt, diện tích vành khuyên.','Giải bài toán ngược, hình tô màu và quạt vành khuyên.','Vận dụng vào bài toán thực tế, đổi đơn vị và làm tròn chính xác.']},
 {kind:'kt',tag:'Bản đồ chuyên đề',title:'Sáu dạng cần làm chủ',body:`<table class="lk-table lk-left"><tr><th>Dạng</th><th>Công thức hoặc thao tác chính</th></tr><tr><td>Độ dài cung</td><td>${m('l=\\dfrac{\\pi Rn}{180}')}</td></tr><tr><td>Diện tích hình quạt</td><td>${m('S=\\dfrac{\\pi R^2n}{360}=\\dfrac{lR}{2}')}</td></tr><tr><td>Hình vành khuyên</td><td>${m('S=\\pi(R^2-r^2)')}</td></tr><tr><td>Quạt vành khuyên, hình tô màu</td><td>Diện tích quạt lớn trừ quạt nhỏ</td></tr><tr><td>Chu vi và thực tế</td><td>Cộng đúng các đoạn biên của hình</td></tr><tr><td>Bài toán ngược, tỉ lệ</td><td>Đổi công thức; diện tích tỉ lệ với ${m('R^2')}</td></tr></table>`},
 {kind:'kt',tag:'Kiến thức nền 1',title:'Độ dài đường tròn và độ dài cung',fig:Fsector2(90),body:box(`Chu vi đường tròn bán kính ${m('R')}: ${m('C=2\\pi R=\\pi d')}.`)+box(`Cung có số đo ${m('n^\\circ')}: ${m('l=\\dfrac{n}{360}\\cdot2\\pi R=\\dfrac{\\pi Rn}{180}')}.`)+note(`Độ dài cung là đại lượng độ dài, đơn vị thường là cm hoặc m; không viết đơn vị diện tích.`)},
 {kind:'kt',tag:'Kiến thức nền 2',title:'Diện tích hình quạt tròn',fig:Fsector2(120),body:box(`Hình quạt bán kính ${m('R')}, góc ở tâm ${m('n^\\circ')}: ${m('S=\\dfrac{n}{360}\\cdot\\pi R^2')}.`)+box(`Nếu biết độ dài cung ${m('l')}, có thể dùng ${m('S=\\dfrac{lR}{2}')}.`)+`<p>Chu vi hình quạt gồm <b>cung tròn và hai bán kính</b>: ${m('P=l+2R')}.</p>`},
 {kind:'kt',tag:'Kiến thức nền 3',title:'Hình vành khuyên',fig:Fring2(),body:box(`Hình vành khuyên được giới hạn bởi hai đường tròn đồng tâm bán kính ${m('R')} và ${m('r')}, với ${m('R\\gt r')}.`)+box(`Diện tích: ${m('S=\\pi R^2-\\pi r^2=\\pi(R^2-r^2)')}.`)+note(`Không dùng ${m('\\pi(R-r)^2')}; bình phương của hiệu không bằng hiệu hai bình phương.`)},
 {kind:'kt',tag:'Kiến thức nền 4',title:'Quạt vành khuyên và hình ghép',fig:FannSector(),body:box(`Phần giữa hai cung đồng tâm, có cùng góc ${m('n^\\circ')}, là quạt vành khuyên: ${m('S=\\dfrac{\\pi(R^2-r^2)n}{360}')}.`)+box('Hình tô màu thường được tách thành các hình quen thuộc rồi cộng hoặc trừ diện tích.')+`<p>Chu vi quạt vành khuyên gồm cung ngoài, cung trong và hai đoạn thẳng dài ${m('R-r')}.</p>`},
 {kind:'kt',tag:'Lỗi thường gặp',title:'Bốn kiểm tra trước khi thay số',body:`<ul><li>Xác định đề hỏi <b>độ dài</b>, <b>diện tích</b> hay <b>chu vi</b>.</li><li>Đổi đường kính thành bán kính và đổi các đại lượng về cùng đơn vị.</li><li>Góc ${m('n^\\circ')} dùng tỉ lệ ${m('n/360')}; riêng công thức độ dài cung rút gọn thành mẫu ${m('180')}.</li><li>Giữ kết quả theo ${m('\\pi')} nếu đề không yêu cầu số gần đúng; chỉ làm tròn ở bước cuối.</li></ul>`},

 {kind:'method',tag:'Dạng 1',title:'Tính độ dài cung và bài toán ngược',steps:[`Viết ${m('l=\\dfrac{\\pi Rn}{180}')}.`,`Thay hai đại lượng đã biết để tìm đại lượng còn lại ${m('l,R')} hoặc ${m('n')}.`,`Kiểm tra ${m('0\\lt n\\le360^\\circ')} và đơn vị độ dài.`]},
 {kind:'vd',tag:'Ví dụ 1 · Dạng 1',label:'Ví dụ 1',de:`Một cung ${m('72^\\circ')} thuộc đường tròn bán kính ${m('10')} cm. Tính độ dài cung. Nếu một cung khác của cùng đường tròn dài ${m('5\\pi')} cm thì cung đó có số đo bao nhiêu?`,fig:Fsector2(72),sol:[`Cung thứ nhất: ${m('l=\\dfrac{\\pi\\cdot10\\cdot72}{180}=4\\pi')} cm.`,`Với cung thứ hai: ${m('5\\pi=\\dfrac{\\pi\\cdot10\\cdot n}{180}')}.`,`Rút gọn ${m('\\pi')} và giải phương trình được ${m('n=90^\\circ')}.`],ans:`${tb('4\\pi')} cm; ${tb('90^\\circ')}.`},

 {kind:'method',tag:'Dạng 2',title:'Diện tích hình quạt',steps:[`Nếu biết góc ở tâm, dùng ${m('S=\\dfrac{\\pi R^2n}{360}')}.`,`Nếu biết độ dài cung, dùng nhanh ${m('S=\\dfrac{lR}{2}')}.`,`Với bài toán ngược, thay số rồi giải tìm ${m('R')} hoặc ${m('n')}; chọn bán kính dương.`]},
 {kind:'vd',tag:'Ví dụ 2 · Dạng 2',label:'Ví dụ 2',de:`Hình quạt bán kính ${m('12')} cm có góc ở tâm ${m('60^\\circ')}. Tính diện tích và độ dài cung.`,fig:Fsector2(60),sol:[`${m('S=\\dfrac{\\pi\\cdot12^2\\cdot60}{360}=24\\pi')} cm².`,`${m('l=\\dfrac{\\pi\\cdot12\\cdot60}{180}=4\\pi')} cm.`,`Kiểm tra bằng ${m('S=lR/2=4\\pi\\cdot12/2=24\\pi')} cm².`],ans:`${tb('S=24\\pi')} cm²; ${tb('l=4\\pi')} cm.`},

 {kind:'method',tag:'Dạng 3',title:'Diện tích hình vành khuyên',steps:[`Xác định bán kính ngoài ${m('R')} và bán kính trong ${m('r')}.`,`Tính hiệu bình phương ${m('R^2-r^2')}; có thể dùng ${m('(R-r)(R+r)')}.`,`Nhân với ${m('\\pi')} và ghi đơn vị diện tích.`]},
 {kind:'vd',tag:'Ví dụ 3 · Dạng 3',label:'Ví dụ 3',de:`Một hình vành khuyên có bán kính ngoài ${m('13')} cm, bán kính trong ${m('5')} cm. Tính diện tích. Nếu diện tích giữ nguyên và bán kính ngoài là ${m('15')} cm thì bán kính trong mới bằng bao nhiêu?`,fig:Fring2(),sol:[`${m('S=\\pi(13^2-5^2)=\\pi(169-25)=144\\pi')} cm².`,`Gọi bán kính trong mới là ${m('r')}. Ta có ${m('\\pi(15^2-r^2)=144\\pi')}.`,`Suy ra ${m('225-r^2=144')}, nên ${m('r^2=81')}. Vì ${m('r\\gt0')}, ${m('r=9')} cm.`],ans:`${tb('144\\pi')} cm²; ${tb('r=9')} cm.`},

 {kind:'method',tag:'Dạng 4',title:'Quạt vành khuyên, hình tô màu',steps:[`Tách phần cần tính thành quạt lớn trừ quạt nhỏ hoặc tổng–hiệu các hình quen thuộc.`,`Dùng cùng góc ở tâm cho hai hình quạt: ${m('S=\\dfrac{\\pi(R^2-r^2)n}{360}')}.`,`Nếu tính phần còn lại, lấy diện tích toàn hình trừ diện tích đã bỏ; kiểm tra kết quả dương.`]},
 {kind:'vd',tag:'Ví dụ 4 · Dạng 4',label:'Ví dụ 4',de:`Một quạt vành khuyên có bán kính ngoài ${m('12')} cm, bán kính trong ${m('6')} cm và góc ở tâm ${m('120^\\circ')}. Tính diện tích.`,fig:FannSector(),sol:[`Diện tích quạt lớn: ${m('S_1=\\dfrac{\\pi\\cdot12^2\\cdot120}{360}=48\\pi')} cm².`,`Diện tích quạt nhỏ: ${m('S_2=\\dfrac{\\pi\\cdot6^2\\cdot120}{360}=12\\pi')} cm².`,`Diện tích quạt vành khuyên: ${m('S=S_1-S_2=36\\pi')} cm².`],ans:`${tb('36\\pi')} cm².`},
 {kind:'vd',tag:'Ví dụ 5 · Dạng 4',label:'Ví dụ 5',de:`Từ hình tròn bán kính ${m('10')} cm, người ta bỏ đi một hình quạt ${m('90^\\circ')}. Tính diện tích phần còn lại.`,sol:[`Diện tích hình tròn: ${m('100\\pi')} cm².`,`Diện tích quạt bị bỏ: ${m('\\dfrac{90}{360}\\cdot100\\pi=25\\pi')} cm².`,`Phần còn lại: ${m('100\\pi-25\\pi=75\\pi')} cm².`],ans:`${tb('75\\pi')} cm².`},

 {kind:'method',tag:'Dạng 5',title:'Chu vi hình quạt và ứng dụng thực tế',steps:[`Vẽ hoặc tô lại đường biên cần đo; không mặc nhiên dùng chu vi đường tròn đầy đủ.`,`Hình quạt: ${m('P=l+2R')}. Quạt vành khuyên: cộng hai cung và hai đoạn ${m('R-r')}.`,`Đổi đơn vị trước khi tính; dùng ${m('\\pi')} hoặc giá trị gần đúng theo đề và làm tròn ở cuối.`]},
 {kind:'vd',tag:'Ví dụ 6 · Dạng 5',label:'Ví dụ 6',de:`Một bồn hoa hình quạt ${m('90^\\circ')} bán kính ${m('10')} m được làm hàng rào quanh toàn bộ biên. Tính chiều dài hàng rào, lấy ${m('\\pi\\approx3{,}14')}.`,fig:Fsector2(90),sol:[`Độ dài cung: ${m('l=\\dfrac{\\pi\\cdot10\\cdot90}{180}=5\\pi\\approx15{,}7')} m.`,`Biên còn có hai bán kính, tổng dài ${m('20')} m.`,`Chiều dài hàng rào: ${m('P=15{,}7+20=35{,}7')} m.`],ans:`${tb('35{,}7')} m.`},

 {kind:'method',tag:'Dạng 6',title:'Bài toán tỉ lệ và tổng hợp',steps:[`Cùng góc ở tâm: độ dài cung tỉ lệ với ${m('R')}, diện tích quạt tỉ lệ với ${m('R^2')}.`,`Cùng bán kính: độ dài cung và diện tích quạt đều tỉ lệ với góc ở tâm ${m('n')}.`,`Với hình ghép, đặt tên từng phần và viết biểu thức diện tích trước khi thay số.`]},
 {kind:'vd',tag:'Ví dụ 7 · Dạng 6',label:'Ví dụ 7',de:`Hai hình quạt có cùng góc ở tâm. Bán kính hình quạt thứ hai gấp ${m('3')} lần hình thứ nhất. So sánh độ dài cung và diện tích của hai hình quạt.`,sol:[`Vì ${m('l=\\dfrac{\\pi Rn}{180}')}, khi ${m('n')} không đổi thì ${m('l')} tỉ lệ với ${m('R')}; độ dài cung thứ hai gấp ${m('3')} lần.`,`Vì ${m('S=\\dfrac{\\pi R^2n}{360}')}, diện tích tỉ lệ với ${m('R^2')}; diện tích thứ hai gấp ${m('3^2=9')} lần.`],ans:`Độ dài cung gấp ${tb('3')} lần; diện tích gấp ${tb('9')} lần.`},
 {kind:'lt',tag:'Tự luyện',label:'Bài 1',de:`Tính diện tích hình vành khuyên có bán kính ngoài ${m('10')} cm, bán kính trong ${m('6')} cm.`,sol:[`${m('S=\\pi(10^2-6^2)=64\\pi')} cm².`]},
 {kind:'lt',tag:'Tự luyện',label:'Bài 2',de:`Hình quạt có bán kính ${m('8')} cm, góc ở tâm ${m('90^\\circ')}. Tính diện tích và chu vi hình quạt.`,sol:[`${m('S=\\dfrac{90}{360}\\pi\\cdot8^2=16\\pi')} cm².`,`Cung dài ${m('l=\\dfrac{\\pi\\cdot8\\cdot90}{180}=4\\pi')} cm; chu vi ${m('P=4\\pi+16')} cm.`]},
 {kind:'sum',tag:'Tổng kết',title:'Checklist trước khi nộp bài',body:`<ul><li>Đã dùng bán kính, không nhầm với đường kính.</li><li>Đã phân biệt độ dài cung, chu vi quạt và diện tích quạt.</li><li>Đã viết đúng ${m('R^2-r^2')}, không đổi thành ${m('(R-r)^2')}.</li><li>Đã xác định đủ các đoạn tạo nên đường biên khi tính chu vi.</li><li>Đã đổi đơn vị và chỉ làm tròn ở kết quả cuối.</li></ul>`+box('Luyện tiếp bằng <b>Phiếu luyện tập 20 bài</b>, gồm bài cơ bản, hình ghép và ứng dụng thực tế.')}
]},
{id:'on-thi-ham-so-parabol',name:'Đại số 1. Hàm số y = ax² và đồ thị',desc:'Ôn thi vào 10 – Bài 1 (1,5 điểm): điểm thuộc parabol, bảng giá trị và vẽ đồ thị, tính chất, đọc đồ thị tìm a, tìm điểm theo điều kiện.',slides:[
 {kind:'title',tag:'Ôn thi tuyển sinh · Đại số 1',title:'Hàm số y = ax² và đồ thị',sub:'Bài 1 của cấu trúc đề TP.HCM 2026–2027',points:['Tính giá trị hàm số, kiểm tra và tìm điểm thuộc parabol.','Lập bảng giá trị và vẽ đúng, đẹp đồ thị '+m('y = ax^2')+'.','Đọc đồ thị để tìm '+m('a')+', tìm điểm thoả điều kiện cho trước.']},
 {kind:'kt',tag:'Kiến thức nền 1',title:'Hàm số y = ax² và điểm thuộc đồ thị',body:box(`Hàm số ${m('y = ax^2')} (${m('a \\ne 0')}) xác định với mọi ${m('x \\in \\mathbb{R}')}. Đồ thị là một <b>parabol</b> ${m('(P)')} có đỉnh ${m('O')}.`)+box(`Điểm ${m('M(x_0;\\,y_0)')} thuộc ${m('(P)')} khi và chỉ khi ${m('y_0 = ax_0^2')}.`)+note(`Hai điểm có hoành độ đối nhau thì có cùng tung độ (vì ${m('(-x)^2 = x^2')}).`)},
 {kind:'kt',tag:'Kiến thức nền 2',title:'Tính chất của parabol',fig:ParabFig(1,2,[[2,2,'A']]),body:box(`${m('(P)')} nhận trục ${m('Oy')} làm trục đối xứng và đi qua gốc toạ độ ${m('O')}.`)+box(`${m('a \\gt 0')}: ${m('(P)')} nằm phía trên trục hoành, ${m('O')} là điểm thấp nhất, ${m('y_{\\min} = 0')} tại ${m('x = 0')}. Hàm số nghịch biến khi ${m('x \\lt 0')}, đồng biến khi ${m('x \\gt 0')}.`)+box(`${m('a \\lt 0')}: ${m('(P)')} nằm phía dưới trục hoành, ${m('O')} là điểm cao nhất, ${m('y_{\\max} = 0')} tại ${m('x = 0')}. Hàm số đồng biến khi ${m('x \\lt 0')}, nghịch biến khi ${m('x \\gt 0')}.`)},
 {kind:'kt',tag:'Kiến thức nền 3',title:'Các bước vẽ parabol',body:`<ol><li>Lập bảng giá trị với các ${m('x')} đối nhau: ${m('-2;\\,-1;\\,0;\\,1;\\,2')} (hoặc ${m('-4;\\,-2;\\,0;\\,2;\\,4')} khi ${m('a')} có mẫu).</li><li>Chọn ${m('x')} sao cho ${m('y')} nguyên để dễ chấm điểm.</li><li>Chấm các điểm lên hệ trục, ghi toạ độ, nối bằng đường cong trơn, đối xứng qua ${m('Oy')}.</li><li>Ghi tên đồ thị ${m('(P)')}, đánh dấu đỉnh ${m('O')}.</li></ol>`+note(`Không nối các điểm bằng đoạn thẳng; đường cong phải trơn tại đỉnh ${m('O')}.`)},

 {kind:'method',tag:'Dạng 1',title:'Kiểm tra điểm thuộc parabol, tìm a, tìm m',steps:[`Thay hoành độ ${m('x_0')} của điểm vào ${m('y = ax^2')} để tính ${m('y')}.`,`So sánh với tung độ đề cho: bằng nhau thì điểm thuộc ${m('(P)')}.`,`Tìm ${m('a')} (hoặc ${m('m')}): thay toạ độ điểm vào phương trình, giải phương trình ẩn ${m('a')} (hoặc ${m('m')}).`]},
 {kind:'vd',tag:'Ví dụ 1 · Dạng 1',label:'Ví dụ 1',de:`Cho ${m('(P):\\; y = \\dfrac{1}{2}x^2')}. Trong các điểm ${m('A(2;\\,2)')}, ${m('B(-4;\\,8)')}, ${m('C(3;\\,4)')}, điểm nào thuộc ${m('(P)')}?`,sol:[`Với ${m('x = 2')}: ${m('y = \\dfrac{1}{2}\\cdot 4 = 2')}, khớp với ${m('A')}.`,`Với ${m('x = -4')}: ${m('y = \\dfrac{1}{2}\\cdot 16 = 8')}, khớp với ${m('B')}.`,`Với ${m('x = 3')}: ${m('y = \\dfrac{9}{2} \\ne 4')}, nên ${m('C')} không thuộc ${m('(P)')}.`],ans:`${tb('A')} và ${tb('B')} thuộc ${m('(P)')}.`},
 {kind:'method',tag:'Dạng 2',title:'Lập bảng giá trị và vẽ đồ thị',steps:[`Chọn các giá trị ${m('x')} đối nhau, tính ${m('y = ax^2')} (nhớ bình phương trước rồi nhân với ${m('a')}).`,`Chấm các điểm ${m('(x;\\,y)')} lên hệ trục có chia vạch đều.`,`Nối thành đường cong trơn, đối xứng qua ${m('Oy')}, đi qua ${m('O')}.`]},
 {kind:'vd',tag:'Ví dụ 2 · Dạng 2',label:'Ví dụ 2',de:`Lập bảng giá trị và vẽ đồ thị ${m('(P):\\; y = -\\dfrac{1}{2}x^2')}.`,fig:ParabFig(-1,2,[[-4,-8],[-2,-2],[0,0],[2,-2],[4,-8]]),sol:[`Bảng giá trị: ${m('x = -4;\\,-2;\\,0;\\,2;\\,4')} cho ${m('y = -8;\\,-2;\\,0;\\,-2;\\,-8')}.`,`Chấm các điểm ${m('(-4;\\,-8)')}, ${m('(-2;\\,-2)')}, ${m('O(0;\\,0)')}, ${m('(2;\\,-2)')}, ${m('(4;\\,-8)')} rồi nối thành parabol quay xuống, nhận ${m('Oy')} làm trục đối xứng.`]},
 {kind:'method',tag:'Dạng 3',title:'Tính chất của đồ thị và so sánh giá trị hàm số',steps:[`Xét dấu của ${m('a')} để biết parabol quay lên hay quay xuống.`,`So sánh ${m('x^2')} của hai giá trị (không so sánh trực tiếp ${m('x')} khi hai số khác dấu).`,`${m('a \\gt 0')}: ${m('x^2')} lớn hơn thì ${m('y')} lớn hơn. ${m('a \\lt 0')}: ngược lại.`]},
 {kind:'vd',tag:'Ví dụ 3 · Dạng 3',label:'Ví dụ 3',de:`Cho hàm số ${m('y = 2x^2')}. So sánh ${m('y(-5)')} và ${m('y(4)')}.`,sol:[`${m('a = 2 \\gt 0')} nên ${m('x^2')} càng lớn thì ${m('y')} càng lớn.`,`${m('(-5)^2 = 25 \\gt 4^2 = 16')}.`,`Kiểm tra: ${m('y(-5) = 50')}, ${m('y(4) = 32')}.`],ans:`${tb('y(-5) \\gt y(4)')}.`},
 {kind:'method',tag:'Dạng 4',title:'Đọc đồ thị, tìm hệ số a',steps:[`Chọn một điểm nằm đúng giao điểm của lưới, đọc toạ độ ${m('(x_0;\\,y_0)')}.`,`Thay vào ${m('y = ax^2')}: ${m('a = \\dfrac{y_0}{x_0^2}')}.`,`Có ${m('a')} rồi mới tính tung độ (hoặc hoành độ) của các điểm khác.`]},
 {kind:'vd',tag:'Ví dụ 4 · Dạng 4',label:'Ví dụ 4',de:`Parabol ${m('(P):\\; y = ax^2')} được vẽ như hình, đi qua ${m('A')}. Tìm ${m('a')} và tính tung độ điểm ${m('B')} thuộc ${m('(P)')} có hoành độ ${m('3')}.`,fig:ParabFig(2,1,[[-1,2,'A']]),sol:[`Từ hình, ${m('A(-1;\\,2)')}. Thay vào: ${m('2 = a\\cdot(-1)^2')}, suy ra ${m('a = 2')}.`,`Với ${m('x = 3')}: ${m('y = 2\\cdot 3^2 = 18')}.`],ans:`${tb('a = 2')}; ${tb('y_B = 18')}.`},
 {kind:'method',tag:'Dạng 5',title:'Tìm điểm thuộc parabol theo điều kiện',steps:[`Gọi ${m('M(x;\\,y)')} thuộc ${m('(P)')}, nên ${m('y = ax^2')}.`,`Dịch điều kiện của đề thành phương trình thứ hai (tung độ bằng ${m('c')}, tung độ gấp ${m('k')} lần hoành độ, cách trục ${m('Oy')} bao nhiêu...).`,`Giải phương trình ẩn ${m('x')}, <b>loại nghiệm không phù hợp</b> (ví dụ ${m('x = 0')} khi đề nói "khác gốc toạ độ"), rồi tính ${m('y')}.`]},
 {kind:'vd',tag:'Ví dụ 5 · Dạng 5',label:'Ví dụ 5',de:`Cho ${m('(P):\\; y = 2x^2')}. Tìm điểm ${m('M')} khác gốc toạ độ thuộc ${m('(P)')} có tung độ gấp ${m('6')} lần hoành độ.`,sol:[`${m('M(x;\\,y)')} thuộc ${m('(P)')} nên ${m('y = 2x^2')}; theo đề ${m('y = 6x')}.`,`${m('2x^2 = 6x \\Leftrightarrow 2x(x - 3) = 0')}. Vì ${m('M \\ne O')} nên ${m('x \\ne 0')}, suy ra ${m('x = 3')}.`,`${m('y = 6\\cdot 3 = 18')}.`],ans:`${tb('M(3;\\,18)')}.`},
 {kind:'sum',tag:'Tổng kết',title:'Checklist trước khi nộp bài',body:`<ul><li>Đã bình phương ${m('x')} trước rồi mới nhân với ${m('a')} (chú ý ${m('x')} âm).</li><li>Bảng giá trị có các ${m('x')} đối nhau và ${m('y')} tính đúng dấu.</li><li>Đồ thị là đường cong trơn, đi qua ${m('O')}, có ghi toạ độ các điểm.</li><li>Điều kiện "khác gốc toạ độ" đã loại ${m('x = 0')}.</li></ul>`}
]},
{id:'on-thi-pt-bac-hai-viete',name:'Đại số 2. Phương trình bậc hai, điều kiện có nghiệm và hệ thức Viète',desc:'Ôn thi vào 10 – Bài 2 (1,5 điểm): giải phương trình bậc hai, biệt thức và số nghiệm, hệ thức Viète và giá trị biểu thức, biết một nghiệm – lập phương trình mới, tham số m với hệ thức giữa hai nghiệm.',slides:[
 {kind:'title',tag:'Ôn thi tuyển sinh · Đại số 2',title:'Phương trình bậc hai và hệ thức Viète',sub:'Bài 2 của cấu trúc đề TP.HCM 2026–2027',points:['Giải phương trình bậc hai; xét số nghiệm theo '+m('\\Delta')+'.','Dùng hệ thức Viète tính giá trị biểu thức của hai nghiệm mà không giải phương trình.','Giải bài toán tham số '+m('m')+': điều kiện '+m('\\Delta')+', hệ thức giữa hai nghiệm, đối chiếu và loại nghiệm.']},
 {kind:'kt',tag:'Kiến thức nền 1',title:'Công thức nghiệm và biệt thức Δ',body:box(`Phương trình ${m('ax^2 + bx + c = 0')} (${m('a \\ne 0')}), biệt thức ${m('\\Delta = b^2 - 4ac')}.`)+box(`${m('\\Delta \\lt 0')}: vô nghiệm. ${m('\\Delta = 0')}: nghiệm kép ${m('x_1 = x_2 = -\\dfrac{b}{2a}')}. ${m('\\Delta \\gt 0')}: hai nghiệm phân biệt ${m('x_{1,2} = \\dfrac{-b \\pm \\sqrt{\\Delta}}{2a}')}.`)+box(`Khi ${m('b = 2b\'')}: dùng ${m('\\Delta\' = b\'^2 - ac')}, nghiệm ${m('x_{1,2} = \\dfrac{-b\' \\pm \\sqrt{\\Delta\'}}{a}')}.`)+note(`Đề cho tham số ở hệ số của ${m('x^2')}: phải có ${m('a \\ne 0')} thì mới là phương trình bậc hai.`)},
 {kind:'kt',tag:'Kiến thức nền 2',title:'Hệ thức Viète',body:box(`Nếu phương trình ${m('ax^2 + bx + c = 0')} có hai nghiệm ${m('x_1, x_2')} thì ${m('S = x_1 + x_2 = -\\dfrac{b}{a}')} và ${m('P = x_1x_2 = \\dfrac{c}{a}')}.`)+box(`Ngược lại, hai số có tổng ${m('S')} và tích ${m('P')} là nghiệm của phương trình ${m('x^2 - Sx + P = 0')} (có nghiệm khi ${m('S^2 - 4P \\ge 0')}).`)+note(`Chỉ dùng Viète khi phương trình <b>có nghiệm</b> (${m('\\Delta \\ge 0')}): luôn kiểm tra ${m('\\Delta')} trước.`)},
 {kind:'kt',tag:'Kiến thức nền 3',title:'Biến đổi biểu thức đối xứng và quy trình bài tham số',body:`<ul><li>${m('x_1^2 + x_2^2 = S^2 - 2P')}; ${m('(x_1 - x_2)^2 = S^2 - 4P')}.</li><li>${m('x_1^3 + x_2^3 = S^3 - 3PS')}; ${m('x_1^2x_2 + x_1x_2^2 = PS')}.</li><li>${m('\\dfrac{1}{x_1} + \\dfrac{1}{x_2} = \\dfrac{S}{P}')} (khi ${m('P \\ne 0')}).</li></ul><ol><li>Tìm điều kiện của ${m('m')} để có hai nghiệm phân biệt (${m('a \\ne 0')} và ${m('\\Delta \\gt 0')}).</li><li>Viết ${m('S, P')} theo ${m('m')} bằng Viète.</li><li>Biến đổi hệ thức của đề về ${m('S, P')}, giải phương trình ẩn ${m('m')}.</li><li><b>Đối chiếu điều kiện</b>, loại giá trị không thoả.</li></ol>`},

 {kind:'method',tag:'Dạng 1',title:'Giải phương trình bậc hai',steps:[`Đưa về dạng ${m('ax^2 + bx + c = 0')} (khai triển, chuyển hết sang một vế).`,`Xác định ${m('a, b, c')} (chú ý dấu), tính ${m('\\Delta = b^2 - 4ac')}.`,`Dùng công thức nghiệm theo dấu của ${m('\\Delta')}, rồi kết luận tập nghiệm.`]},
 {kind:'vd',tag:'Ví dụ 1 · Dạng 1',label:'Ví dụ 1',de:`Giải các phương trình: a) ${m('x^2 - 3x - 10 = 0')}; b) ${m('(x - 2)(x + 4) = 7')}.`,sol:[`a) ${m('a = 1,\\ b = -3,\\ c = -10')}; ${m('\\Delta = (-3)^2 - 4\\cdot1\\cdot(-10) = 49 \\gt 0')}, ${m('\\sqrt{\\Delta} = 7')}.`,`${m('x_1 = \\dfrac{3 - 7}{2} = -2')}; ${m('x_2 = \\dfrac{3 + 7}{2} = 5')}.`,`b) Khai triển: ${m('x^2 + 2x - 8 = 7')}, chuyển vế: ${m('x^2 + 2x - 15 = 0')}. Có ${m('\\Delta = 2^2 - 4\\cdot1\\cdot(-15) = 64')}, ${m('\\sqrt{\\Delta} = 8')}.`,`${m('x_1 = \\dfrac{-2 - 8}{2} = -5')}; ${m('x_2 = \\dfrac{-2 + 8}{2} = 3')}.`],ans:`a) ${tb('x = -2')} hoặc ${tb('x = 5')}. b) ${tb('x = -5')} hoặc ${tb('x = 3')}.`},
 {kind:'method',tag:'Dạng 2',title:'Biệt thức Δ và điều kiện về số nghiệm',steps:[`Xác định hệ số ${m('a, b, c')} (có thể chứa ${m('m')}); nhớ điều kiện ${m('a \\ne 0')} nếu hệ số ${m('a')} chứa ${m('m')}.`,`Lập ${m('\\Delta')} (hoặc ${m('\\Delta\'')}) theo ${m('m')}.`,`Nghiệm kép: ${m('\\Delta = 0')}; hai nghiệm phân biệt: ${m('\\Delta \\gt 0')}; vô nghiệm: ${m('\\Delta \\lt 0')}. Giải phương trình/bất phương trình ẩn ${m('m')}.`]},
 {kind:'vd',tag:'Ví dụ 2 · Dạng 2',label:'Ví dụ 2',de:`Tìm ${m('m')} để: a) ${m('x^2 - 6x + m = 0')} có hai nghiệm phân biệt; b) ${m('x^2 - 2mx + 3m - 2 = 0')} có nghiệm kép.`,sol:[`a) ${m('\\Delta\' = (-3)^2 - 1\\cdot m = 9 - m')}. Hai nghiệm phân biệt khi ${m('\\Delta\' \\gt 0')}, tức ${m('m \\lt 9')}.`,`b) ${m('\\Delta\' = (-m)^2 - 1\\cdot(3m - 2) = m^2 - 3m + 2 = (m - 1)(m - 2)')}.`,`Nghiệm kép khi ${m('\\Delta\' = 0')}: ${m('m = 1')} hoặc ${m('m = 2')}.`],ans:`a) ${tb('m \\lt 9')}. b) ${tb('m = 1')} hoặc ${tb('m = 2')}.`},
 {kind:'method',tag:'Dạng 3',title:'Hệ thức Viète: tổng, tích và giá trị biểu thức',steps:[`Tính ${m('\\Delta')} để chắc chắn phương trình có nghiệm.`,`Viết ${m('S = -\\dfrac{b}{a}')}, ${m('P = \\dfrac{c}{a}')}.`,`Biến đổi biểu thức cần tính về ${m('S')} và ${m('P')} (xem bảng ở trang kiến thức), rồi thay số. <b>Không giải ra nghiệm.</b>`]},
 {kind:'vd',tag:'Ví dụ 3 · Dạng 3',label:'Ví dụ 3',de:`Gọi ${m('x_1, x_2')} là hai nghiệm của ${m('x^2 - 5x + 3 = 0')}. Không giải phương trình, tính ${m('A = x_1^2 + x_2^2')} và ${m('B = x_1^3 + x_2^3')}.`,sol:[`${m('\\Delta = (-5)^2 - 4\\cdot1\\cdot3 = 13 \\gt 0')} nên có hai nghiệm phân biệt.`,`Viète: ${m('S = x_1 + x_2 = 5')}, ${m('P = x_1x_2 = 3')}.`,`${m('A = (x_1 + x_2)^2 - 2x_1x_2 = 5^2 - 2\\cdot3 = 19')}.`,`${m('B = (x_1 + x_2)^3 - 3x_1x_2(x_1 + x_2) = 5^3 - 3\\cdot3\\cdot5 = 80')}.`],ans:`${tb('A = 19')}; ${tb('B = 80')}.`},
 {kind:'method',tag:'Dạng 4',title:'Biết một nghiệm; lập phương trình từ nghiệm mới',steps:[`Biết nghiệm ${m('x_0')}: thay ${m('x = x_0')} vào phương trình để tìm tham số.`,`Tìm nghiệm còn lại bằng tổng ${m('x_1 + x_2 = -\\dfrac{b}{a}')} hoặc tích ${m('x_1x_2 = \\dfrac{c}{a}')}.`,`Lập phương trình nhận hai số mới làm nghiệm: tính tổng ${m('S\'')} và tích ${m('P\'')} qua ${m('S, P')} cũ, rồi viết ${m('x^2 - S\'x + P\' = 0')}.`]},
 {kind:'vd',tag:'Ví dụ 4 · Dạng 4',label:'Ví dụ 4',de:`a) Phương trình ${m('x^2 - (m + 1)x + 6 = 0')} có một nghiệm ${m('x_1 = 2')}. Tìm ${m('m')} và nghiệm còn lại. b) Gọi ${m('x_1, x_2')} là hai nghiệm của ${m('x^2 - 4x + 1 = 0')}. Lập phương trình bậc hai nhận ${m('x_1^2')} và ${m('x_2^2')} làm nghiệm.`,sol:[`a) Thay ${m('x = 2')}: ${m('4 - 2(m + 1) + 6 = 0')}, suy ra ${m('2(m + 1) = 10')}, tức ${m('m = 4')}.`,`Khi đó ${m('x_1 + x_2 = m + 1 = 5')} nên ${m('x_2 = 5 - 2 = 3')} (kiểm tra: ${m('x_1x_2 = 6')} ✓).`,`b) ${m('\\Delta\' = (-2)^2 - 1 = 3 \\gt 0')}; Viète: ${m('x_1 + x_2 = 4')}, ${m('x_1x_2 = 1')}.`,`${m('S\' = x_1^2 + x_2^2 = 4^2 - 2\\cdot1 = 14')}; ${m('P\' = (x_1x_2)^2 = 1')}.`,`Phương trình cần lập: ${m('x^2 - 14x + 1 = 0')}.`],ans:`a) ${tb('m = 4')}, ${tb('x_2 = 3')}. b) ${tb('x^2 - 14x + 1 = 0')}.`},
 {kind:'method',tag:'Dạng 5',title:'Tham số m và hệ thức giữa hai nghiệm',steps:[`Điều kiện: ${m('a \\ne 0')} và ${m('\\Delta \\gt 0')} (hoặc ${m('\\Delta\' \\gt 0')}) để có hai nghiệm phân biệt.`,`Viète: ${m('x_1 + x_2')} và ${m('x_1x_2')} theo ${m('m')}; đưa hệ thức của đề về ${m('S, P')} rồi giải phương trình ẩn ${m('m')}.`,`<b>Đối chiếu điều kiện</b>: giá trị nào thoả thì nhận, không thoả thì loại; kết luận.`]},
 {kind:'vd',tag:'Ví dụ 5 · Dạng 5',label:'Ví dụ 5',de:`Cho phương trình ${m('x^2 - 2(m - 1)x + m^2 - 3 = 0')}. Tìm ${m('m')} để phương trình có hai nghiệm phân biệt ${m('x_1, x_2')} thoả ${m('x_1^2 + x_2^2 = 4')}.`,sol:[`Điều kiện: ${m('\\Delta\' = (m - 1)^2 - (m^2 - 3) = -2m + 4 \\gt 0')}, tức ${m('m \\lt 2')}.`,`Viète: ${m('x_1 + x_2 = 2(m - 1)')}, ${m('x_1x_2 = m^2 - 3')}.`,`${m('x_1^2 + x_2^2 = (x_1 + x_2)^2 - 2x_1x_2 = 4(m - 1)^2 - 2(m^2 - 3) = 2m^2 - 8m + 10')}.`,`Theo đề: ${m('2m^2 - 8m + 10 = 4')}, chia hai vế cho 2: ${m('m^2 - 4m + 3 = 0')}, suy ra ${m('m = 1')} hoặc ${m('m = 3')}.`,`Đối chiếu ${m('m \\lt 2')}: nhận ${m('m = 1')}, loại ${m('m = 3')} (khi đó ${m('\\Delta\' = -2 \\lt 0')}).`],ans:`${tb('m = 1')}.`},
 {kind:'sum',tag:'Tổng kết',title:'Checklist trước khi nộp bài',body:`<ul><li>Đã đưa phương trình về dạng ${m('ax^2 + bx + c = 0')} và xác định đúng dấu của ${m('a, b, c')}.</li><li>Đã tính ${m('\\Delta')} (hoặc ${m('\\Delta\'')}) và kiểm tra ${m('\\Delta \\ge 0')} <b>trước khi</b> dùng Viète.</li><li>Bài tham số: đã ghi điều kiện ${m('a \\ne 0')}, ${m('\\Delta \\gt 0')} và <b>đối chiếu</b> để loại giá trị ${m('m')} không thoả.</li><li>Biểu thức đối xứng đã biến đổi về ${m('S')} và ${m('P')}, không giải ra nghiệm vô tỉ.</li></ul>`}
]},
{id:'on-thi-xac-suat',name:'Đại số 3. Xác suất của biến cố trong một số mô hình xác suất đơn giản',desc:'Ôn thi vào 10 – xác suất cổ điển với hộp bi, xúc xắc, đồng xu, thẻ đánh số; biến cố đối; xác suất thực nghiệm; tìm số phần tử khi biết xác suất.',slides:[
 {kind:'title',tag:'Ôn thi tuyển sinh · Đại số 3',title:'Xác suất của biến cố trong các mô hình đơn giản',sub:'Câu xác suất trong cấu trúc đề TP.HCM 2026–2027',points:['Xác định không gian mẫu và các kết quả thuận lợi.','Tính '+m('P(A) = \\dfrac{k}{n}')+' cho hộp bi, xúc xắc, đồng xu, thẻ số.','Dùng biến cố đối, xác suất thực nghiệm và giải bài toán thêm/bớt bi.']},
 {kind:'kt',tag:'Kiến thức nền 1',title:'Phép thử, không gian mẫu, biến cố',body:box(`<b>Phép thử</b>: hành động có nhiều kết quả. <b>Không gian mẫu</b>: tập mọi kết quả, có ${m('n')} phần tử.`)+box(`<b>Biến cố</b> ${m('A')}: các kết quả thuận lợi, có ${m('k')} phần tử. Các kết quả phải <b>cùng khả năng</b>.`)+box(`${m('P(A) = \\dfrac{k}{n}')}, ${m('0 \\le P(A) \\le 1')}.`)},
 {kind:'kt',tag:'Kiến thức nền 2',title:'Biến cố đối và biến cố "hoặc"',body:box(`Biến cố đối: ${m('P(\\overline{A}) = 1 - P(A)')}. Gặp "ít nhất", "không phải" thì dùng biến cố đối.`)+box(`"${m('A')} hoặc ${m('B')}" không có kết quả chung: ${m('k = k_A + k_B')}. Có kết quả chung: ${m('k = k_A + k_B - k_{\\text{chung}}')}.`)+note(`Đáp số là phân số <b>rút gọn</b>, không vượt quá 1.`)},
 {kind:'kt',tag:'Kiến thức nền 3',title:'Cách đếm kết quả',body:`<ul><li>1 xúc xắc: 6 kết quả; 2 xúc xắc phân biệt: ${m('6 \\cdot 6 = 36')}.</li><li>2 đồng xu: 4 kết quả; 3 đồng xu: 8 kết quả.</li><li>Quy tắc nhân: số có hai chữ số khác nhau lập từ 5 chữ số: ${m('5 \\cdot 4 = 20')}.</li><li>Lấy 2 vật cùng lúc: ${m('\\dfrac{n(n-1)}{2}')} cặp.</li></ul>`+note(`${m('(1;\\,2)')} và ${m('(2;\\,1)')} là hai kết quả khác nhau.`)},

 {kind:'method',tag:'Dạng 1',title:'Hộp bi, rút thẻ: một lần lấy',steps:[`Đếm tổng số bi: đó là ${m('n')}.`,`Đếm số bi thuận lợi: đó là ${m('k')} (hoặc dùng biến cố đối).`,`Viết ${m('P = \\dfrac{k}{n}')} và rút gọn.`]},
 {kind:'vd',tag:'Ví dụ 1 · Dạng 1',label:'Ví dụ 1',de:`Hộp có 4 bi đỏ, 3 bi xanh, 5 bi vàng, cùng kích thước. Lấy ngẫu nhiên 1 bi. Tính xác suất để bi lấy ra: a) màu xanh; b) không phải màu vàng.`,sol:[`Tổng số bi: ${m('4 + 3 + 5 = 12')}, nên ${m('n = 12')}.`,`a) Có 3 bi xanh: ${m('P = \\dfrac{3}{12} = \\dfrac{1}{4}')}.`,`b) Biến cố đối là "lấy bi vàng", có 5 kết quả. Số kết quả thuận lợi: ${m('12 - 5 = 7')}.`,`${m('P = \\dfrac{7}{12}')}.`],ans:`a) ${tb('\\dfrac{1}{4}')}. b) ${tb('\\dfrac{7}{12}')}.`},
 {kind:'method',tag:'Dạng 2',title:'Xúc xắc',steps:[`Một con: 6 kết quả. Hai con phân biệt: 36 kết quả (cặp có thứ tự).`,`Liệt kê các cặp thoả đề, hoặc đếm biến cố đối rồi lấy 36 trừ đi.`,`Viết ${m('P = \\dfrac{k}{36}')} rồi rút gọn.`]},
 {kind:'vd',tag:'Ví dụ 2 · Dạng 2',label:'Ví dụ 2',de:`Tung hai con xúc xắc cân đối, đồng chất. Tính xác suất để: a) tổng số chấm bằng 8; b) tích hai số chấm là số chẵn.`,sol:[`Có ${m('6 \\cdot 6 = 36')} kết quả cùng khả năng.`,`a) Các cặp có tổng 8: ${m('(2;\\,6),(3;\\,5),(4;\\,4),(5;\\,3),(6;\\,2)')}, tức 5 kết quả. ${m('P = \\dfrac{5}{36}')}.`,`b) Biến cố đối "tích lẻ": cả hai mặt lẻ, ${m('3 \\cdot 3 = 9')} kết quả.`,`Số kết quả thuận lợi: ${m('36 - 9 = 27')}. ${m('P = \\dfrac{27}{36} = \\dfrac{3}{4}')}.`],ans:`a) ${tb('\\dfrac{5}{36}')}. b) ${tb('\\dfrac{3}{4}')}.`},
 {kind:'method',tag:'Dạng 3',title:'Đồng xu và lập số',steps:[`Liệt kê kết quả theo thứ tự (S: sấp, N: ngửa); với lập số thì dùng quy tắc nhân để biết ${m('n')}.`,`Chọn ra các kết quả thoả đề và đếm.`,`Viết ${m('P = \\dfrac{k}{n}')} và rút gọn.`]},
 {kind:'vd',tag:'Ví dụ 3 · Dạng 3',label:'Ví dụ 3',de:`a) Tung ba đồng xu cân đối. Tính xác suất có ít nhất hai đồng xu ra mặt sấp. b) Từ các chữ số 1, 2, 3, 4, 5 lập ngẫu nhiên số có hai chữ số khác nhau. Tính xác suất được số chẵn.`,sol:[`a) Có ${m('2 \\cdot 2 \\cdot 2 = 8')} kết quả. Thuận lợi: SSS, SSN, SNS, NSS, tức 4 kết quả. ${m('P = \\dfrac{4}{8} = \\dfrac{1}{2}')}.`,`b) Có ${m('5 \\cdot 4 = 20')} số. Số chẵn có chữ số hàng đơn vị là 2 hoặc 4: mỗi trường hợp có 4 cách chọn hàng chục.`,`Số kết quả thuận lợi: ${m('2 \\cdot 4 = 8')} (12, 32, 42, 52, 14, 24, 34, 54). ${m('P = \\dfrac{8}{20} = \\dfrac{2}{5}')}.`],ans:`a) ${tb('\\dfrac{1}{2}')}. b) ${tb('\\dfrac{2}{5}')}.`},
 {kind:'method',tag:'Dạng 4',title:'Thẻ đánh số từ 1 đến n',steps:[`Tổng số kết quả là ${m('n')}.`,`Liệt kê hoặc đếm các số thoả đề (bội của ${m('a')}: ${m('\\lfloor n/a \\rfloor')} số; số nguyên tố: nhớ 1 không nguyên tố).`,`Chia hết cho ${m('a')} <b>hoặc</b> ${m('b')}: ${m('k = k_a + k_b - k_{ab}')}.`]},
 {kind:'vd',tag:'Ví dụ 4 · Dạng 4',label:'Ví dụ 4',de:`Hộp có 40 thẻ giống nhau đánh số từ 1 đến 40. Rút ngẫu nhiên 1 thẻ. Tính xác suất để số trên thẻ chia hết cho 3 hoặc chia hết cho 5.`,sol:[`Có ${m('n = 40')} kết quả.`,`Chia hết cho 3: ${m('\\lfloor 40/3 \\rfloor = 13')} thẻ. Chia hết cho 5: ${m('\\lfloor 40/5 \\rfloor = 8')} thẻ.`,`Chia hết cho cả hai (bội của 15): 15, 30, tức 2 thẻ, bị đếm hai lần.`,`Số kết quả thuận lợi: ${m('13 + 8 - 2 = 19')}. ${m('P = \\dfrac{19}{40}')}.`],ans:`${tb('\\dfrac{19}{40}')}.`},
 {kind:'method',tag:'Dạng 5',title:'Xác suất thực nghiệm và tìm số bi',steps:[`Thực nghiệm: ${m('P = \\dfrac{\\text{số lần xảy ra}}{\\text{tổng số lần}}')}.`,`Biết xác suất: gọi ẩn, viết xác suất theo ẩn, nhân chéo, giải.`,`Thêm ${m('t')} bi đỏ: tử và mẫu cùng tăng ${m('t')}. Kiểm tra lại đáp số.`]},
 {kind:'vd',tag:'Ví dụ 5 · Dạng 5',label:'Ví dụ 5',de:`Hộp có ${m('x')} bi đỏ và 6 bi xanh. a) Biết xác suất lấy bi đỏ là ${m('\\dfrac{2}{5}')}, tìm ${m('x')}. b) Hộp có 6 bi đỏ và 9 bi xanh. Cần thêm bao nhiêu bi đỏ để xác suất lấy bi đỏ bằng ${m('\\dfrac{1}{2}')}?`,sol:[`a) ${m('\\dfrac{x}{x + 6} = \\dfrac{2}{5}')}. Nhân chéo: ${m('5x = 2(x + 6)')}, suy ra ${m('3x = 12')}, tức ${m('x = 4')}.`,`b) Thêm ${m('t')} bi đỏ: ${m('\\dfrac{6 + t}{15 + t} = \\dfrac{1}{2}')}. Nhân chéo: ${m('2(6 + t) = 15 + t')}.`,`Suy ra ${m('12 + 2t = 15 + t')}, tức ${m('t = 3')}. Kiểm tra: ${m('\\dfrac{9}{18} = \\dfrac{1}{2}')} ✓.`],ans:`a) ${tb('x = 4')}. b) Thêm ${tb('3')} viên bi đỏ.`},
 {kind:'sum',tag:'Tổng kết',title:'Checklist trước khi nộp bài',body:`<ul><li>Đã kiểm tra các kết quả <b>cùng khả năng</b> và ghi rõ ${m('n')}.</li><li>Đếm ${m('k')} có hệ thống; cặp có thứ tự hay không đã được chú ý.</li><li>Biến cố "ít nhất", "không phải" đã cân nhắc dùng biến cố đối.</li><li>Đáp số là phân số rút gọn, ${m('0 \\le P \\le 1')}; bài tìm số đã thay lại để kiểm tra.</li></ul>`}
]}
]});
})();
