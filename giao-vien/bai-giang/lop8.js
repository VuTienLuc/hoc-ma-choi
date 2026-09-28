/* =====================================================================
   BÀI GIẢNG LỚP 8 – Toán, Kết nối tri thức (giáo viên trình chiếu)
   Chương II. Hằng đẳng thức đáng nhớ và ứng dụng (Bài 6 – Bài 9, Ôn tập)
   Cấu trúc trang chiếu: xem giao-vien/bai-giang/lop10.js và CLAUDE.md.
   ===================================================================== */
(() => {
const m = tm, d = td;
const box = h => `<div class="lk-box">${h}</div>`, note = h => `<div class="lk-note">⚠️ ${h}</div>`;
const S = t => `<p>${t}</p>`;
/* Hình vuông cạnh a + b chia 4 phần: minh hoạ (a + b)^2 = a^2 + 2ab + b^2 */
const sqFig = () => `<svg viewBox="0 0 240 240" role="img" aria-label="Hình vuông cạnh a + b">
  <rect class="sv-part on" x="20" y="20" width="130" height="130"/><rect class="sv-part" x="150" y="20" width="70" height="130"/>
  <rect class="sv-part" x="20" y="150" width="130" height="70"/><rect class="sv-part on" x="150" y="150" width="70" height="70"/>
  <text class="sv-txt" x="85" y="92" font-size="22" text-anchor="middle">a²</text><text class="sv-txt" x="185" y="92" font-size="20" text-anchor="middle">ab</text>
  <text class="sv-txt" x="85" y="192" font-size="20" text-anchor="middle">ab</text><text class="sv-txt" x="185" y="192" font-size="20" text-anchor="middle">b²</text>
  <text class="sv-muted" x="85" y="14" font-size="15" text-anchor="middle">a</text><text class="sv-muted" x="185" y="14" font-size="15" text-anchor="middle">b</text>
  <text class="sv-muted" x="10" y="90" font-size="15" text-anchor="middle">a</text><text class="sv-muted" x="10" y="190" font-size="15" text-anchor="middle">b</text></svg>`;
const HDT7 = `<table class="lk-table lk-left"><tr><th>Hằng đẳng thức</th></tr>
  <tr><td>${m('(A + B)^2 = A^2 + 2AB + B^2')}</td></tr><tr><td>${m('(A - B)^2 = A^2 - 2AB + B^2')}</td></tr><tr><td>${m('A^2 - B^2 = (A - B)(A + B)')}</td></tr>
  <tr><td>${m('(A + B)^3 = A^3 + 3A^2B + 3AB^2 + B^3')}</td></tr><tr><td>${m('(A - B)^3 = A^3 - 3A^2B + 3AB^2 - B^3')}</td></tr>
  <tr><td>${m('A^3 + B^3 = (A + B)(A^2 - AB + B^2)')}</td></tr><tr><td>${m('A^3 - B^3 = (A - B)(A^2 + AB + B^2)')}</td></tr></table>`;
const TITLE = (name, pts) => ({kind:'title', tag:'Toán 8 · Kết nối tri thức · Chương II', title:name, sub:'Mục tiêu bài học', points:pts});
const HOME = n => box(`Về nhà: làm các bài tập cuối ${n} trong SGK; luyện thêm trên web <b>Học mà chơi</b> – Toán 8, ${n}.`);

Lecture.add({ grade:'lop8', gradeName:'Toán 8', chapter:'Chương II. Hằng đẳng thức đáng nhớ và ứng dụng', lessons:[

/* ---------------- BÀI 6 ---------------- */
{ id:'bai-6', name:'Bài 6. Hiệu hai bình phương. Bình phương của một tổng hay một hiệu', desc:'Ba hằng đẳng thức đầu; khai triển, viết gọn, tính nhanh.', slides:[
  TITLE('Bài 6. Hiệu hai bình phương. Bình phương của một tổng hay một hiệu', [
    `Nhận biết và viết được ba hằng đẳng thức: bình phương của một tổng, bình phương của một hiệu, hiệu hai bình phương.`,
    'Vận dụng để khai triển, viết gọn biểu thức và tính nhanh.']),

  {kind:'kt', tag:'Kiến thức trọng tâm 1', title:'Bình phương của một tổng', fig:sqFig(),
   body: box(d('(A + B)^2 = A^2 + 2AB + B^2')) + S(`Với ${m('A, B')} là các biểu thức tuỳ ý.`) +
     S(`Hình bên: diện tích hình vuông cạnh ${m('a + b')} bằng tổng diện tích bốn phần ${m('a^2 + ab + ab + b^2')}.`)},

  {kind:'kt', tag:'Kiến thức trọng tâm 2', title:'Bình phương của một hiệu',
   body: box(d('(A - B)^2 = A^2 - 2AB + B^2')) + note(`Hạng tử giữa là ${m('2AB')}, <b>không phải</b> ${m('AB')}. Chú ý ${m('(A - B)^2 = (B - A)^2')}.`)},

  {kind:'kt', tag:'Kiến thức trọng tâm 3', title:'Hiệu hai bình phương',
   body: box(d('A^2 - B^2 = (A - B)(A + B)')) + S(`Đọc theo hai chiều: <b>khai triển</b> tích ${m('(A - B)(A + B)')}, hoặc <b>viết thành tích</b> hiệu ${m('A^2 - B^2')}.`) +
     note(`${m('A^2 + B^2')} <b>không</b> viết được thành tích theo hằng đẳng thức này.`)},

  {kind:'method', tag:'Dạng 1', title:'Khai triển biểu thức',
   steps:[`Xác định ${m('A')} và ${m('B')} trong biểu thức (chú ý hệ số, dấu).`, `Chọn hằng đẳng thức phù hợp và thay ${m('A, B')} vào.`, `Thu gọn: tính ${m('A^2')}, ${m('2AB')}, ${m('B^2')}.`]},

  {kind:'vd', tag:'Ví dụ 1 · Dạng 1', label:'Ví dụ 1', de:`Khai triển: a) ${m('(x + 3)^2')}; &nbsp; b) ${m('(2x - 1)^2')}.`,
   sol:[`a) ${m('A = x,\\ B = 3')}: ${m('(x + 3)^2 = x^2 + 2\\cdot x\\cdot 3 + 3^2 = x^2 + 6x + 9')}.`,
     `b) ${m('A = 2x,\\ B = 1')}: ${m('(2x - 1)^2 = (2x)^2 - 2\\cdot 2x\\cdot 1 + 1^2 = 4x^2 - 4x + 1')}.`]},

  {kind:'vd', tag:'Ví dụ 2 · Dạng 1', label:'Ví dụ 2', de:`Khai triển: a) ${m('(3x - 2y)^2')}; &nbsp; b) ${m('(x - 5)(x + 5)')}.`,
   sol:[`a) ${m('(3x - 2y)^2 = (3x)^2 - 2\\cdot 3x\\cdot 2y + (2y)^2 = 9x^2 - 12xy + 4y^2')}.`,
     `b) ${m('(x - 5)(x + 5) = x^2 - 5^2 = x^2 - 25')}.`]},

  {kind:'method', tag:'Dạng 2', title:'Viết biểu thức dưới dạng bình phương hoặc tích',
   steps:[`Tìm hai hạng tử là bình phương: ${m('A^2')} và ${m('B^2')}.`, `Kiểm tra hạng tử còn lại có bằng ${m('\\pm 2AB')} không → ${m('(A \\pm B)^2')}.`, `Hiệu của hai bình phương → ${m('(A - B)(A + B)')}.`]},

  {kind:'vd', tag:'Ví dụ 3 · Dạng 2', label:'Ví dụ 3', de:`Viết dưới dạng bình phương: a) ${m('x^2 + 6x + 9')}; &nbsp; b) ${m('4x^2 - 4xy + y^2')}.`,
   sol:[`a) ${m('x^2 = (x)^2,\\ 9 = 3^2,\\ 6x = 2\\cdot x\\cdot 3')} ⇒ ${m('x^2 + 6x + 9 = (x + 3)^2')}.`,
     `b) ${m('4x^2 = (2x)^2,\\ y^2 = (y)^2,\\ 4xy = 2\\cdot 2x\\cdot y')} ⇒ ${m('4x^2 - 4xy + y^2 = (2x - y)^2')}.`]},

  {kind:'vd', tag:'Ví dụ 4 · Dạng 2', label:'Ví dụ 4', de:`Viết ${m('9x^2 - 16')} dưới dạng tích.`,
   sol:[`${m('9x^2 = (3x)^2,\\ 16 = 4^2')}.`, `${m('9x^2 - 16 = (3x)^2 - 4^2 = (3x - 4)(3x + 4)')}.`], ans:`${tb('(3x - 4)(3x + 4)')}.`},

  {kind:'method', tag:'Dạng 3', title:'Tính nhanh, tính giá trị biểu thức',
   steps:[`Tách số thành tổng hoặc hiệu với số tròn chục, tròn trăm.`, `Hoặc viết biểu thức gọn lại bằng hằng đẳng thức <b>trước</b>, rồi mới thay số.`]},

  {kind:'vd', tag:'Ví dụ 5 · Dạng 3', label:'Ví dụ 5', de:`Tính nhanh: a) ${m('101^2')}; &nbsp; b) ${m('99\\cdot 101')}.`,
   sol:[`a) ${m('101^2 = (100 + 1)^2 = 10000 + 200 + 1 = 10201')}.`, `b) ${m('99\\cdot 101 = (100 - 1)(100 + 1) = 100^2 - 1 = 9999')}.`]},

  {kind:'vd', tag:'Ví dụ 6 · Dạng 3', label:'Ví dụ 6', de:`Tính giá trị của ${m('A = x^2 - 10x + 25')} tại ${m('x = 105')}.`,
   sol:[`Viết gọn: ${m('A = x^2 - 2\\cdot x\\cdot 5 + 5^2 = (x - 5)^2')}.`, `Tại ${m('x = 105')}: ${m('A = (105 - 5)^2 = 100^2')}.`], ans:`${tb('A = 10000')}.`},

  {kind:'lt', tag:'Luyện tập', label:'Bài 1', de:`Khai triển ${m('(x + 4)^2')} và ${m('(3 - x)(3 + x)')}.`,
   sol:[`${m('(x + 4)^2 = x^2 + 8x + 16')}.`, `${m('(3 - x)(3 + x) = 9 - x^2')}.`]},
  {kind:'lt', tag:'Luyện tập', label:'Bài 2', de:`Tính nhanh ${m('49\\cdot 51')}.`, sol:[`${m('49\\cdot 51 = (50 - 1)(50 + 1) = 2500 - 1')}.`], ans:`${tb('2499')}.`},

  {kind:'sum', tag:'Tổng kết', title:'Ghi nhớ',
   body:`<ul><li>${m('(A + B)^2 = A^2 + 2AB + B^2')}</li><li>${m('(A - B)^2 = A^2 - 2AB + B^2')}</li><li>${m('A^2 - B^2 = (A - B)(A + B)')}</li>
     <li>Luôn xác định đúng ${m('A, B')}; đừng quên hệ số 2 ở hạng tử giữa.</li></ul>` + HOME('Bài 6')},
]},

/* ---------------- BÀI 7 ---------------- */
{ id:'bai-7', name:'Bài 7. Lập phương của một tổng. Lập phương của một hiệu', desc:'Hai hằng đẳng thức lập phương; khai triển, viết gọn, tính giá trị.', slides:[
  TITLE('Bài 7. Lập phương của một tổng. Lập phương của một hiệu', ['Nhận biết và viết được hằng đẳng thức lập phương của một tổng, một hiệu.', 'Vận dụng để khai triển, viết gọn và tính giá trị biểu thức.']),

  {kind:'kt', tag:'Kiến thức trọng tâm 1', title:'Lập phương của một tổng',
   body: box(d('(A + B)^3 = A^3 + 3A^2B + 3AB^2 + B^3')) + S('Mẹo nhớ: hệ số <b>1 – 3 – 3 – 1</b>; số mũ của A giảm dần 3, 2, 1, 0; số mũ của B tăng dần 0, 1, 2, 3.')},

  {kind:'kt', tag:'Kiến thức trọng tâm 2', title:'Lập phương của một hiệu',
   body: box(d('(A - B)^3 = A^3 - 3A^2B + 3AB^2 - B^3')) + S('Dấu <b>xen kẽ</b>: + – + –.') + note(`${m('(A - B)^3 = -(B - A)^3')} (khác với bình phương!).`)},

  {kind:'method', tag:'Dạng 1', title:'Khai triển lập phương',
   steps:[`Xác định ${m('A, B')}.`, `Viết đủ 4 hạng tử theo hệ số 1 – 3 – 3 – 1 (lập phương hiệu: dấu xen kẽ).`, `Tính từng hạng tử cẩn thận: ${m('(2x)^3 = 8x^3')}.`]},

  {kind:'vd', tag:'Ví dụ 1 · Dạng 1', label:'Ví dụ 1', de:`Khai triển ${m('(x + 2)^3')}.`,
   sol:[`${m('A = x,\\ B = 2')}.`, `${m('(x + 2)^3 = x^3 + 3\\cdot x^2\\cdot 2 + 3\\cdot x\\cdot 2^2 + 2^3')}.`], ans:`${tb('x^3 + 6x^2 + 12x + 8')}.`},

  {kind:'vd', tag:'Ví dụ 2 · Dạng 1', label:'Ví dụ 2', de:`Khai triển ${m('(2x - 1)^3')}.`,
   sol:[`${m('A = 2x,\\ B = 1')}.`, `${m('(2x - 1)^3 = (2x)^3 - 3\\cdot(2x)^2\\cdot 1 + 3\\cdot 2x\\cdot 1^2 - 1^3')}.`], ans:`${tb('8x^3 - 12x^2 + 6x - 1')}.`},

  {kind:'method', tag:'Dạng 2', title:'Viết dưới dạng lập phương. Tính giá trị',
   steps:[`Hạng tử đầu ${m('= A^3')}, hạng tử cuối ${m('= \\pm B^3')} → tìm ${m('A, B')}.`, `Kiểm tra hai hạng tử giữa ${m('3A^2B')}, ${m('3AB^2')}.`, `Tính giá trị: viết gọn trước, thay số sau.`]},

  {kind:'vd', tag:'Ví dụ 3 · Dạng 2', label:'Ví dụ 3', de:`Viết ${m('x^3 + 9x^2 + 27x + 27')} dưới dạng lập phương của một tổng.`,
   sol:[`${m('x^3 = (x)^3,\\ 27 = 3^3')} ⇒ ${m('A = x,\\ B = 3')}.`, `Kiểm tra: ${m('3A^2B = 9x^2,\\ 3AB^2 = 27x')} ✓.`], ans:`${tb('(x + 3)^3')}.`},

  {kind:'vd', tag:'Ví dụ 4 · Dạng 2', label:'Ví dụ 4', de:`Tính giá trị của ${m('B = x^3 - 6x^2 + 12x - 8')} tại ${m('x = 22')}.`,
   sol:[`${m('B = x^3 - 3\\cdot x^2\\cdot 2 + 3\\cdot x\\cdot 2^2 - 2^3 = (x - 2)^3')}.`, `Tại ${m('x = 22')}: ${m('B = 20^3')}.`], ans:`${tb('B = 8000')}.`},

  {kind:'lt', tag:'Luyện tập', label:'Bài 1', de:`Khai triển ${m('(x - 3)^3')}.`, sol:[`${m('(x - 3)^3 = x^3 - 9x^2 + 27x - 27')}.`]},
  {kind:'lt', tag:'Luyện tập', label:'Bài 2', de:`Tính giá trị của ${m('x^3 + 3x^2 + 3x + 1')} tại ${m('x = 99')}.`, sol:[`Biểu thức bằng ${m('(x + 1)^3 = 100^3')}.`], ans:`${tb('1\\,000\\,000')}.`},

  {kind:'sum', tag:'Tổng kết', title:'Ghi nhớ',
   body:`<ul><li>${m('(A + B)^3 = A^3 + 3A^2B + 3AB^2 + B^3')}</li><li>${m('(A - B)^3 = A^3 - 3A^2B + 3AB^2 - B^3')}</li><li>Hệ số 1 – 3 – 3 – 1; lập phương hiệu có dấu xen kẽ.</li></ul>` + HOME('Bài 7')},
]},

/* ---------------- BÀI 8 ---------------- */
{ id:'bai-8', name:'Bài 8. Tổng và hiệu hai lập phương', desc:'Hai hằng đẳng thức cuối; viết thành tích, rút gọn, tính giá trị; bảng 7 hằng đẳng thức.', slides:[
  TITLE('Bài 8. Tổng và hiệu hai lập phương', ['Nhận biết và viết được hằng đẳng thức tổng hai lập phương, hiệu hai lập phương.', 'Vận dụng để viết thành tích, rút gọn và tính giá trị biểu thức.']),

  {kind:'kt', tag:'Kiến thức trọng tâm 1', title:'Tổng hai lập phương',
   body: box(d('A^3 + B^3 = (A + B)(A^2 - AB + B^2)')) + S(`Biểu thức ${m('A^2 - AB + B^2')} gọi là <b>bình phương thiếu</b> của hiệu (thiếu hệ số 2).`)},

  {kind:'kt', tag:'Kiến thức trọng tâm 2', title:'Hiệu hai lập phương',
   body: box(d('A^3 - B^3 = (A - B)(A^2 + AB + B^2)')) + note(`Dấu trong ngoặc thứ nhất và dấu của ${m('AB')} luôn <b>ngược nhau</b>.`)},

  {kind:'method', tag:'Dạng 1', title:'Viết thành tích',
   steps:[`Viết mỗi hạng tử dưới dạng lập phương: ${m('8 = 2^3')}, ${m('27x^3 = (3x)^3')}.`, `Áp dụng công thức tổng (hoặc hiệu) hai lập phương.`]},

  {kind:'vd', tag:'Ví dụ 1 · Dạng 1', label:'Ví dụ 1', de:`Viết dưới dạng tích: a) ${m('x^3 + 8')}; &nbsp; b) ${m('27x^3 - 1')}.`,
   sol:[`a) ${m('x^3 + 8 = x^3 + 2^3 = (x + 2)(x^2 - 2x + 4)')}.`, `b) ${m('27x^3 - 1 = (3x)^3 - 1^3 = (3x - 1)(9x^2 + 3x + 1)')}.`]},

  {kind:'method', tag:'Dạng 2', title:'Rút gọn, tính giá trị biểu thức',
   steps:[`Nhận ra tích dạng ${m('(A \\pm B)(A^2 \\mp AB + B^2)')} → thay bằng ${m('A^3 \\pm B^3')}.`, `Thu gọn rồi mới thay giá trị của biến.`]},

  {kind:'vd', tag:'Ví dụ 2 · Dạng 2', label:'Ví dụ 2', de:`Rút gọn ${m('C = (x + 3)(x^2 - 3x + 9) - x^3')}.`,
   sol:[`${m('(x + 3)(x^2 - 3x + 9) = x^3 + 3^3 = x^3 + 27')}.`, `${m('C = x^3 + 27 - x^3')}.`], ans:`${tb('C = 27')} (không phụ thuộc vào ${m('x')}).`},

  {kind:'vd', tag:'Ví dụ 3 · Dạng 2', label:'Ví dụ 3', de:`Tính giá trị của ${m('D = (x - 1)(x^2 + x + 1)')} tại ${m('x = 10')}.`,
   sol:[`${m('D = x^3 - 1')}.`, `Tại ${m('x = 10')}: ${m('D = 1000 - 1')}.`], ans:`${tb('D = 999')}.`},

  {kind:'kt', tag:'Hệ thống', title:'Bảy hằng đẳng thức đáng nhớ', body:HDT7},

  {kind:'lt', tag:'Luyện tập', label:'Bài 1', de:`Viết ${m('64x^3 + y^3')} dưới dạng tích.`, sol:[`${m('64x^3 + y^3 = (4x)^3 + y^3')}.`], ans:`${tb('(4x + y)(16x^2 - 4xy + y^2)')}.`},
  {kind:'lt', tag:'Luyện tập', label:'Bài 2', de:`Rút gọn ${m('(2x - 1)(4x^2 + 2x + 1) - 8x^3')}.`, sol:[`${m('(2x - 1)(4x^2 + 2x + 1) = 8x^3 - 1')}.`], ans:`Kết quả: ${tb('-1')}.`},

  {kind:'sum', tag:'Tổng kết', title:'Ghi nhớ',
   body:`<ul><li>${m('A^3 + B^3 = (A + B)(A^2 - AB + B^2)')}</li><li>${m('A^3 - B^3 = (A - B)(A^2 + AB + B^2)')}</li><li>Thuộc lòng cả <b>bảy</b> hằng đẳng thức và nhận ra chúng theo cả hai chiều.</li></ul>` + HOME('Bài 8')},
]},

/* ---------------- BÀI 9 ---------------- */
{ id:'bai-9', name:'Bài 9. Phân tích đa thức thành nhân tử', desc:'Đặt nhân tử chung, dùng hằng đẳng thức, nhóm hạng tử; ứng dụng tìm x.', slides:[
  TITLE('Bài 9. Phân tích đa thức thành nhân tử', ['Hiểu thế nào là phân tích đa thức thành nhân tử.', 'Phân tích bằng các phương pháp: đặt nhân tử chung, dùng hằng đẳng thức, nhóm hạng tử.', `Vận dụng để tìm ${m('x')}.`]),

  {kind:'kt', tag:'Kiến thức trọng tâm 1', title:'Phân tích đa thức thành nhân tử là gì?',
   body: box('Phân tích đa thức thành nhân tử (thừa số) là biến đổi đa thức đó thành một <b>tích</b> của những đa thức.') +
     S(`Ví dụ: ${m('x^2 - 3x = x(x - 3)')}.`) + note('Phân tích đến khi các nhân tử không phân tích được nữa.')},

  {kind:'kt', tag:'Kiến thức trọng tâm 2', title:'Các phương pháp',
   body:`<ol class="lk-steps"><li><b>Đặt nhân tử chung:</b> ${m('AB + AC = A(B + C)')}.</li><li><b>Dùng hằng đẳng thức:</b> đưa về ${m('(A \\pm B)^2')}, ${m('(A - B)(A + B)')}, ${m('(A \\pm B)^3')}, …</li>
     <li><b>Nhóm hạng tử:</b> nhóm thích hợp để mỗi nhóm có nhân tử chung (hoặc là hằng đẳng thức), rồi phân tích tiếp.</li></ol>` +
     note(`Đổi dấu khi cần: ${m('A - B = -(B - A)')}.`)},

  {kind:'method', tag:'Dạng 1', title:'Đặt nhân tử chung',
   steps:[`Tìm nhân tử chung: ƯCLN của các hệ số và các biến chung (lấy số mũ nhỏ nhất).`, `Nhân tử chung có thể là cả một biểu thức, ví dụ ${m('(x - 3)')}.`, `Viết ${m('\\text{nhân tử chung}\\times(\\ldots)')} và kiểm tra bằng cách nhân lại.`]},

  {kind:'vd', tag:'Ví dụ 1 · Dạng 1', label:'Ví dụ 1', de:`Phân tích thành nhân tử: a) ${m('6x^2y - 9xy^2')}; &nbsp; b) ${m('2x(x - 3) + 5(x - 3)')}.`,
   sol:[`a) Nhân tử chung ${m('3xy')}: ${m('6x^2y - 9xy^2 = 3xy(2x - 3y)')}.`, `b) Nhân tử chung ${m('(x - 3)')}: ${m('2x(x - 3) + 5(x - 3) = (x - 3)(2x + 5)')}.`]},

  {kind:'vd', tag:'Ví dụ 2 · Dạng 1', label:'Ví dụ 2', de:`Phân tích thành nhân tử ${m('3(x - 1) - x(1 - x)')}.`,
   sol:[`Đổi dấu: ${m('-x(1 - x) = x(x - 1)')}.`, `${m('3(x - 1) + x(x - 1) = (x - 1)(3 + x)')}.`], ans:`${tb('(x - 1)(x + 3)')}.`},

  {kind:'method', tag:'Dạng 2', title:'Dùng hằng đẳng thức',
   steps:[`Đếm số hạng tử: 2 hạng tử → thường là ${m('A^2 - B^2')}, ${m('A^3 \\pm B^3')}; 3 hạng tử → ${m('(A \\pm B)^2')}; 4 hạng tử → ${m('(A \\pm B)^3')}.`, `Viết mỗi hạng tử thành bình phương/lập phương rồi áp dụng.`]},

  {kind:'vd', tag:'Ví dụ 3 · Dạng 2', label:'Ví dụ 3', de:`Phân tích thành nhân tử: a) ${m('x^2 - 16')}; &nbsp; b) ${m('x^2 - 10x + 25')}; &nbsp; c) ${m('8x^3 - 1')}.`,
   sol:[`a) ${m('x^2 - 16 = (x - 4)(x + 4)')}.`, `b) ${m('x^2 - 10x + 25 = (x - 5)^2')}.`, `c) ${m('8x^3 - 1 = (2x - 1)(4x^2 + 2x + 1)')}.`]},

  {kind:'method', tag:'Dạng 3', title:'Nhóm hạng tử',
   steps:[`Nhóm các hạng tử có nhân tử chung (hoặc tạo thành hằng đẳng thức).`, `Phân tích từng nhóm.`, `Đặt nhân tử chung lần nữa (hoặc dùng hằng đẳng thức) cho cả biểu thức.`]},

  {kind:'vd', tag:'Ví dụ 4 · Dạng 3', label:'Ví dụ 4', de:`Phân tích thành nhân tử ${m('x^2 - xy + 2x - 2y')}.`,
   sol:[`Nhóm: ${m('(x^2 - xy) + (2x - 2y)')}.`, `${m('= x(x - y) + 2(x - y)')}.`], ans:`${tb('(x - y)(x + 2)')}.`},

  {kind:'vd', tag:'Ví dụ 5 · Dạng 3', label:'Ví dụ 5', de:`Phân tích thành nhân tử ${m('x^2 + 2x + 1 - y^2')}.`,
   sol:[`Nhóm ba hạng tử đầu: ${m('(x^2 + 2x + 1) - y^2 = (x + 1)^2 - y^2')}.`, `Hiệu hai bình phương: ${m('= (x + 1 - y)(x + 1 + y)')}.`]},

  {kind:'method', tag:'Dạng 4', title:`Tìm ${m('x')}`,
   steps:[`Chuyển hết sang một vế, vế kia bằng 0.`, `Phân tích vế trái thành nhân tử.`, `Dùng: ${m('A\\cdot B = 0 \\Leftrightarrow A = 0 \\text{ hoặc } B = 0')}.`]},

  {kind:'vd', tag:'Ví dụ 6 · Dạng 4', label:'Ví dụ 6', de:`Tìm ${m('x')}, biết: a) ${m('x^2 - 4x = 0')}; &nbsp; b) ${m('x^2 - 9 = 0')}.`,
   sol:[`a) ${m('x(x - 4) = 0 \\Leftrightarrow x = 0 \\text{ hoặc } x = 4')}.`, `b) ${m('(x - 3)(x + 3) = 0 \\Leftrightarrow x = 3 \\text{ hoặc } x = -3')}.`]},

  {kind:'lt', tag:'Luyện tập', label:'Bài 1', de:`Phân tích thành nhân tử ${m('x^3 - 4x')}.`, sol:[`${m('x^3 - 4x = x(x^2 - 4)')}.`, `${m('= x(x - 2)(x + 2)')}.`]},
  {kind:'lt', tag:'Luyện tập', label:'Bài 2', de:`Tìm ${m('x')}, biết ${m('x^2 + 5x + 6 = 0')}.`,
   sol:[`Tách ${m('5x = 2x + 3x')}: ${m('x^2 + 2x + 3x + 6 = x(x + 2) + 3(x + 2) = (x + 2)(x + 3)')}.`, `${m('(x + 2)(x + 3) = 0 \\Leftrightarrow x = -2 \\text{ hoặc } x = -3')}.`]},

  {kind:'sum', tag:'Tổng kết', title:'Ghi nhớ',
   body:`<ul><li>Thứ tự nên thử: <b>đặt nhân tử chung</b> → <b>hằng đẳng thức</b> → <b>nhóm hạng tử</b>.</li><li>Phân tích đến khi không phân tích được nữa.</li><li>Tìm ${m('x')}: đưa về tích bằng 0.</li></ul>` + HOME('Bài 9')},
]},

/* ---------------- ÔN TẬP ---------------- */
{ id:'on-tap-c2', name:'Ôn tập chương II', desc:'Bảng bảy hằng đẳng thức; ví dụ tổng hợp rút gọn, phân tích, tìm x.', slides:[
  {kind:'title', tag:'Toán 8 · Kết nối tri thức', title:'Ôn tập chương II', sub:'Hằng đẳng thức đáng nhớ và ứng dụng', points:['Hệ thống bảy hằng đẳng thức đáng nhớ.', 'Vận dụng rút gọn, tính nhanh, phân tích thành nhân tử và tìm x.']},
  {kind:'kt', tag:'Hệ thống kiến thức', title:'Bảy hằng đẳng thức đáng nhớ', body:HDT7},
  {kind:'vd', tag:'Ví dụ tổng hợp', label:'Ví dụ 1', de:`Rút gọn ${m('E = (x + 2)^2 - (x - 2)^2')}.`,
   sol:[`Cách 1: ${m('E = (x^2 + 4x + 4) - (x^2 - 4x + 4)')}.`, `Cách 2: hiệu hai bình phương ${m('E = [(x + 2) - (x - 2)][(x + 2) + (x - 2)] = 4\\cdot 2x')}.`], ans:`${tb('E = 8x')}.`},
  {kind:'vd', tag:'Ví dụ tổng hợp', label:'Ví dụ 2', de:`Phân tích thành nhân tử ${m('x^3 - 2x^2 + x')}.`,
   sol:[`Đặt nhân tử chung: ${m('x(x^2 - 2x + 1)')}.`, `Hằng đẳng thức: ${m('x^2 - 2x + 1 = (x - 1)^2')}.`], ans:`${tb('x(x - 1)^2')}.`},
  {kind:'lt', tag:'Luyện tập', label:'Bài 1', de:`Tính nhanh ${m('2024^2 - 2023^2')}.`, sol:[`${m('= (2024 - 2023)(2024 + 2023) = 4047')}.`]},
  {kind:'lt', tag:'Luyện tập', label:'Bài 2', de:`Tìm ${m('x')}, biết ${m('x^3 - x = 0')}.`, sol:[`${m('x(x - 1)(x + 1) = 0')}.`, `${m('x = 0')} hoặc ${m('x = 1')} hoặc ${m('x = -1')}.`]},
  {kind:'sum', tag:'Tổng kết', title:'Chuẩn bị kiểm tra',
   body:`<ul><li>Thuộc lòng bảy hằng đẳng thức theo cả hai chiều.</li><li>Phân tích nhân tử: nhân tử chung → hằng đẳng thức → nhóm.</li><li>Tính nhanh bằng cách tách số tròn chục, tròn trăm.</li></ul>` + box('Luyện thêm: web <b>Học mà chơi</b> – Toán 8, Ôn tập chương II (3 mức độ).')},
]},
]});
})();

/* =====================================================================
   CHƯƠNG III. TỨ GIÁC (Bài 10 – Bài 14, Ôn tập). Hình vẽ có kí hiệu: geoSVG (figures.js).
   Soạn tỉ mỉ cho học sinh yếu hình: mỗi định nghĩa/tính chất đều có hình, lời giải chia nhỏ từng bước, luôn ghi căn cứ.
   ===================================================================== */
(() => {
const m = tm;
const box = h => `<div class="lk-box">${h}</div>`, note = h => `<div class="lk-note">⚠️ ${h}</div>`;
const S = t => `<p>${t}</p>`;
const dg = x => `${x}^\\circ`, h = s => `\\widehat{${s}}`;
const TITLE = (name, pts) => ({kind:'title', tag:'Toán 8 · Kết nối tri thức · Chương III', title:name, sub:'Mục tiêu bài học', points:pts});
const HOME = n => box(`Về nhà: làm các bài tập cuối ${n} trong SGK; luyện thêm trên web <b>Học mà chơi</b> – Toán 8, ${n}.`);
const Q4 = ['AB','BC','CD','DA'];
/* ---------- Hình ---------- */
const P_Q = {A:[1,3.2],B:[5.2,3.7],C:[6.2,0],D:[0,0]}, P_T = {A:[1.6,3],B:[5.4,3],C:[7,0],D:[0,0]}, P_PG = {A:[1.6,3],B:[6.8,3],C:[5.2,0],D:[0,0]};
const P_R = {A:[0,3],B:[5.2,3],C:[5.2,0],D:[0,0]}, P_RH = {A:[0,2],B:[3,4],C:[6,2],D:[3,0]}, P_SQ = {A:[0,3.4],B:[3.4,3.4],C:[3.4,0],D:[0,0]};
const RECT_R = ['DAB','ABC','BCD','CDA'];
const F_quad = (o={}) => geoSVG({P:P_Q, S:Q4.concat(o.S || []), ...o, S:Q4.concat(o.S || [])});
const F_trap = (o={}) => geoSVG({P:P_T, Pa:{AB:1,CD:1}, ...o, S:Q4.concat(o.S || [])});
const F_iso = (o={}) => geoSVG({P:P_T, Pa:{AB:1,CD:1}, T:{AD:1,BC:1}, ...o, S:Q4.concat(o.S || [])});
const F_pg = (o={}) => geoSVG({P:Object.assign({}, P_PG, o.extra || {}), Pa:{AB:1,CD:1,AD:2,BC:2}, ...o, S:Q4.concat(o.S || []), extra:undefined});
const F_rect = (o={}) => geoSVG({P:Object.assign({}, P_R, o.extra || {}), R:RECT_R, ...o, S:Q4.concat(o.S || []), extra:undefined});
const F_rho = (o={}) => geoSVG({P:Object.assign({O:[3,2]}, P_RH), T:{AB:1,BC:1,CD:1,DA:1}, ...o, S:Q4.concat(o.S || [['AC','dash'],['BD','dash']])});
const F_sq = (o={}) => geoSVG({P:Object.assign({}, P_SQ, o.extra || {}), R:RECT_R, T:{AB:1,BC:1,CD:1,DA:1}, ...o, S:Q4.concat(o.S || []), extra:undefined});
const F_kite = () => geoSVG({P:{A:[3,4.4],B:[5.6,2],C:[3,-1.2],D:[0.4,2]}, S:Q4.concat([['AC','dash']]), T:{AB:1,AD:1,CB:2,CD:2}, R:['DAB'], A:[['BCD','120°']]});
const F_isoTri = () => geoSVG({P:{A:[3,5],B:[0,0],C:[6,0],D:[1.5,2.5],E:[4.5,2.5]}, S:['AB','AC','BC','DE'], T:{AD:1,AE:1}, Pa:{DE:1,BC:1}});
const F_med = sq => geoSVG({P:sq ? {A:[0,0],B:[4,0],C:[0,4],M:[2,2],D:[4,4]} : {A:[0,0],B:[5.2,0],C:[0,3.4],M:[2.6,1.7],D:[5.2,3.4]}, S:['AB','AC','BC',['AD','dash'],'BD','CD'], R:['CAB'], T:{BM:1,MC:1,AM:2,MD:2}});
const F_isoMed = () => geoSVG({P:{A:[3,4],B:[0,1],C:[6,1],M:[3,1],D:[3,-2]}, S:['AB','AC','BC',['AD','dash'],'BD','CD'], T:{AB:1,AC:1,BM:2,MC:2}});
const F_pgMid = () => geoSVG({P:Object.assign({M:[4.2,3],N:[2.6,0]}, P_PG), S:Q4.concat(['AN','CM']), T:{AM:1,MB:1,DN:2,NC:2}, Pa:{AB:1,CD:1}});
const F_review = () => geoSVG({P:{A:[0,0],B:[6,0],C:[0,4.5],M:[3,2.25],E:[3,0],F:[0,2.25]}, S:['AB','AC','BC',['ME','dash'],['MF','dash'],['AM','dash'],['EF','dash']], R:['CAB','MEB','MFC']});
const REL = `<table class="lk-table lk-left"><tr><th>Hình</th><th>Định nghĩa</th><th>Đường chéo</th></tr>
  <tr><td>Hình thang cân</td><td>Hình thang, hai góc kề một đáy bằng nhau</td><td>Bằng nhau</td></tr>
  <tr><td>Hình bình hành</td><td>Các cạnh đối song song</td><td>Cắt nhau tại trung điểm mỗi đường</td></tr>
  <tr><td>Hình chữ nhật</td><td>Bốn góc vuông</td><td>Bằng nhau, cắt nhau tại trung điểm</td></tr>
  <tr><td>Hình thoi</td><td>Bốn cạnh bằng nhau</td><td>Vuông góc, cắt nhau tại trung điểm, là phân giác các góc</td></tr>
  <tr><td>Hình vuông</td><td>Bốn góc vuông, bốn cạnh bằng nhau</td><td>Bằng nhau, vuông góc, cắt nhau tại trung điểm</td></tr></table>`;

Lecture.add({ grade:'lop8', gradeName:'Toán 8', chapter:'Chương III. Tứ giác', lessons:[

/* ---------------- BÀI 10 ---------------- */
{ id:'bai-10', name:'Bài 10. Tứ giác', desc:'Các yếu tố của tứ giác; tổng các góc bằng 360°; góc ngoài.', slides:[
  TITLE('Bài 10. Tứ giác', ['Nhận biết đỉnh, cạnh, góc, đường chéo; cạnh kề, cạnh đối của tứ giác.', 'Biết và vận dụng: tổng các góc của một tứ giác bằng 360°.', 'Tính góc ngoài của tứ giác.']),
  {kind:'kt', tag:'Kiến thức trọng tâm 1', title:'Tứ giác và các yếu tố', fig:F_quad({S:[['AC','dash'],['BD','dash']]}),
   body: box(`Tứ giác ${m('ABCD')} gồm bốn đoạn ${m('AB, BC, CD, DA')}, trong đó không có hai đoạn nào cùng nằm trên một đường thẳng. (Ta chỉ xét tứ giác lồi.)`) +
     `<ul><li><b>Đỉnh:</b> ${m('A, B, C, D')}; <b>cạnh:</b> ${m('AB, BC, CD, DA')}.</li><li><b>Hai cạnh kề</b> có chung một đỉnh (${m('AB')} và ${m('BC')}); <b>hai cạnh đối</b> không có đỉnh chung (${m('AB')} và ${m('CD')}).</li><li><b>Đường chéo</b> nối hai đỉnh đối nhau: ${m('AC, BD')}.</li><li><b>Góc:</b> ${m(`${h('A')}, ${h('B')}, ${h('C')}, ${h('D')}`)}; ${m(h('A'))} và ${m(h('C'))} là hai góc đối.</li></ul>`},
  {kind:'kt', tag:'Kiến thức trọng tâm 2', title:'Tổng các góc của một tứ giác', fig:F_quad({S:[['AC','dash']]}),
   body: box(d360()) + S(`Vì sao? Đường chéo ${m('AC')} chia tứ giác thành hai tam giác ${m('ABC')} và ${m('ACD')}; mỗi tam giác có tổng ba góc ${m('180^\\circ')} ⇒ tổng các góc tứ giác ${m('= 2\\cdot 180^\\circ = 360^\\circ')}.`)},
  {kind:'kt', tag:'Kiến thức trọng tâm 3', title:'Góc ngoài của tứ giác', fig:geoSVG({P:{A:[1,3.2],B:[5.2,3.7],C:[6.2,0],D:[0,0],X:[-1.6,0]}, S:[...Q4,['DX','dash']], A:[['ADC','',1],['XDA','góc ngoài',2]]}),
   body: box('Góc kề bù với một góc của tứ giác gọi là <b>góc ngoài</b> của tứ giác tại đỉnh đó.') + S(`Góc ngoài tại ${m('D')} ${m('= 180^\\circ - ' + h('D'))}.`) + S('Tổng bốn góc ngoài (mỗi đỉnh một góc) bằng ' + m('360^\\circ') + '.')},
  {kind:'method', tag:'Dạng 1', title:'Nhận biết các yếu tố của tứ giác', steps:['Đọc tên tứ giác theo thứ tự các đỉnh (ví dụ MNPQ: M kề N và Q).', 'Cạnh đối: không chung đỉnh. Đường chéo: nối hai đỉnh không kề nhau.', 'Góc đối: ở hai đỉnh đối nhau.']},
  {kind:'vd', tag:'Ví dụ 1 · Dạng 1', label:'Ví dụ 1', de:`Cho tứ giác ${m('MNPQ')}. Hãy kể tên: a) cạnh đối của ${m('MN')}; b) hai đường chéo; c) góc đối của ${m(h('M'))}; d) hai cạnh kề với ${m('MN')}.`,
   fig:geoSVG({P:{M:[1,3.2],N:[5.2,3.7],P:[6.2,0],Q:[0,0]}, S:['MN','NP','PQ','QM',['MP','dash'],['NQ','dash']]}),
   sol:[`a) Cạnh đối của ${m('MN')} là ${m('PQ')}.`, `b) Hai đường chéo: ${m('MP')} và ${m('NQ')}.`, `c) Góc đối của ${m(h('M'))} là ${m(h('P'))}.`, `d) Hai cạnh kề với ${m('MN')}: ${m('NP')} và ${m('QM')}.`]},
  {kind:'method', tag:'Dạng 2', title:'Tính góc của tứ giác', steps:[`Viết: ${m(`${h('A')} + ${h('B')} + ${h('C')} + ${h('D')} = 360^\\circ`)}.`, 'Thay các góc đã biết; nếu có góc bằng nhau hoặc tỉ lệ thì đặt ẩn/đếm số phần.', 'Tính góc cần tìm và kiểm tra tổng bằng 360°.']},
  {kind:'vd', tag:'Ví dụ 2 · Dạng 2', label:'Ví dụ 2', de:`Tứ giác ${m('ABCD')} có ${m(`${h('A')} = 80^\\circ,\\ ${h('B')} = 110^\\circ,\\ ${h('C')} = 70^\\circ`)}. Tính ${m(h('D'))}.`,
   fig:F_quad({A:[['DAB','80°'],['ABC','110°'],['BCD','70°'],['CDA','?']]}),
   sol:[`Tổng các góc: ${m(`${h('A')} + ${h('B')} + ${h('C')} + ${h('D')} = 360^\\circ`)}.`, `${m(`80^\\circ + 110^\\circ + 70^\\circ = 260^\\circ`)}.`, `${m(`${h('D')} = 360^\\circ - 260^\\circ`)}.`], ans:`${m(h('D') + ' =')} ${tb(dg(100))}.`},
  {kind:'vd', tag:'Ví dụ 3 · Dạng 2', label:'Ví dụ 3', de:`Tứ giác ${m('ABCD')} có ${m(`${h('A')} = 100^\\circ,\\ ${h('B')} = 80^\\circ`)} và ${m(`${h('C')} = ${h('D')}`)}. Tính ${m(h('C'))}.`,
   fig:F_quad({A:[['DAB','100°'],['ABC','80°'],['BCD','',2],['CDA','',2]]}),
   sol:[`${m(`${h('C')} + ${h('D')} = 360^\\circ - 100^\\circ - 80^\\circ = 180^\\circ`)}.`, `Hai góc bằng nhau nên mỗi góc bằng ${m('180^\\circ : 2')}.`], ans:`${m(`${h('C')} = ${h('D')} =`)} ${tb(dg(90))}.`},
  {kind:'vd', tag:'Ví dụ 4 · Dạng 2', label:'Ví dụ 4', de:`Các góc ${m(`${h('A')}, ${h('B')}, ${h('C')}, ${h('D')}`)} của tứ giác ${m('ABCD')} tỉ lệ với ${m('1 : 2 : 3 : 4')}. Tính các góc.`,
   sol:[`Tổng số phần: ${m('1 + 2 + 3 + 4 = 10')}.`, `Một phần: ${m('360^\\circ : 10 = 36^\\circ')}.`, `${m(`${h('A')} = 36^\\circ,\\ ${h('B')} = 72^\\circ,\\ ${h('C')} = 108^\\circ,\\ ${h('D')} = 144^\\circ`)}.`], ans:`${tb('36^\\circ;\\ 72^\\circ;\\ 108^\\circ;\\ 144^\\circ')}.`},
  {kind:'method', tag:'Dạng 3', title:'Góc ngoài; tứ giác có yếu tố bằng nhau', steps:[`Góc ngoài tại một đỉnh ${m('= 180^\\circ -')} góc trong tại đỉnh đó.`, 'Nếu tứ giác có các cạnh bằng nhau, hãy kẻ đường chéo để tạo hai tam giác bằng nhau rồi suy ra góc bằng nhau.']},
  {kind:'vd', tag:'Ví dụ 5 · Dạng 3', label:'Ví dụ 5', de:`Tứ giác ${m('ABCD')} có ${m(`${h('A')} = 75^\\circ`)}. Tính góc ngoài tại đỉnh ${m('A')}.`, sol:[`Góc ngoài tại ${m('A')} kề bù với ${m(h('A'))}.`, `Góc ngoài tại ${m('A')} ${m('= 180^\\circ - 75^\\circ')}.`], ans:`${tb(dg(105))}.`},
  {kind:'vd', tag:'Ví dụ 6 · Dạng 3', label:'Ví dụ 6', de:`Tứ giác ${m('ABCD')} có ${m('AB = AD')}, ${m('CB = CD')}, ${m(`${h('A')} = 90^\\circ`)}, ${m(`${h('C')} = 120^\\circ`)}. Tính ${m(h('B'))} và ${m(h('D'))}.`, fig:F_kite(),
   sol:[`Xét ${m('\\triangle ABC')} và ${m('\\triangle ADC')}: ${m('AB = AD')}, ${m('CB = CD')}, ${m('AC')} chung ⇒ ${m('\\triangle ABC = \\triangle ADC')} (c.c.c) ⇒ ${m(`${h('B')} = ${h('D')}`)}.`, `${m(`${h('B')} + ${h('D')} = 360^\\circ - 90^\\circ - 120^\\circ = 150^\\circ`)}.`], ans:`${m(`${h('B')} = ${h('D')} =`)} ${tb(dg(75))}.`},
  {kind:'lt', tag:'Luyện tập', label:'Bài 1', de:`Tứ giác ${m('ABCD')} có ${m(`${h('A')} = 65^\\circ,\\ ${h('B')} = 117^\\circ,\\ ${h('C')} = 71^\\circ`)}. Tính ${m(h('D'))} và góc ngoài tại ${m('D')}.`, sol:[`${m(`${h('D')} = 360^\\circ - (65^\\circ + 117^\\circ + 71^\\circ) = 107^\\circ`)}.`, `Góc ngoài tại ${m('D')}: ${m('180^\\circ - 107^\\circ = 73^\\circ')}.`]},
  {kind:'lt', tag:'Luyện tập', label:'Bài 2', de:`Tứ giác có bốn góc bằng nhau thì mỗi góc bằng bao nhiêu độ?`, sol:[`Mỗi góc bằng ${m('360^\\circ : 4 = 90^\\circ')}.`]},
  {kind:'sum', tag:'Tổng kết', title:'Ghi nhớ', body:`<ul><li>Tứ giác ${m('ABCD')}: cạnh kề – cạnh đối; đường chéo nối hai đỉnh đối nhau.</li><li>${d360()}</li><li>Góc ngoài ${m('= 180^\\circ -')} góc trong; tổng bốn góc ngoài bằng ${m('360^\\circ')}.</li></ul>` + HOME('Bài 10')},
]},

/* ---------------- BÀI 11 ---------------- */
{ id:'bai-11', name:'Bài 11. Hình thang cân', desc:'Hình thang, hình thang vuông; hình thang cân: tính chất, dấu hiệu nhận biết.', slides:[
  TITLE('Bài 11. Hình thang cân', ['Nhận biết hình thang, hình thang vuông, hình thang cân.', 'Vận dụng tính chất về góc, cạnh bên, đường chéo của hình thang cân.', 'Chứng minh một tứ giác là hình thang cân.']),
  {kind:'kt', tag:'Kiến thức trọng tâm 1', title:'Hình thang', fig:F_trap({S:[['AH','dash']], P:Object.assign({H:[1.6,0]}, P_T), R:['AHC'], A:[['CDA','',1],['DAB','',2]]}),
   body: box(`<b>Hình thang</b> là tứ giác có hai cạnh đối song song. Hình thang ${m('ABCD')} (${m('AB \\parallel CD')}): ${m('AB, CD')} là hai <b>đáy</b>; ${m('AD, BC')} là hai <b>cạnh bên</b>; ${m('AH')} là <b>đường cao</b>.`) +
     box(`Hai góc kề một cạnh bên bù nhau: ${m(`${h('A')} + ${h('D')} = 180^\\circ`)}, ${m(`${h('B')} + ${h('C')} = 180^\\circ`)} (hai góc trong cùng phía).`) + S('Hình thang có một góc vuông gọi là <b>hình thang vuông</b>.')},
  {kind:'kt', tag:'Kiến thức trọng tâm 2', title:'Hình thang cân và tính chất', fig:F_iso({S:[['AC','dash'],['BD','dash']], A:[['CDA','',1],['BCD','',1],['DAB','',2],['ABC','',2]]}),
   body: box('<b>Hình thang cân</b> là hình thang có hai góc kề một đáy bằng nhau.') +
     `<ul><li>Hai góc kề mỗi đáy bằng nhau: ${m(`${h('C')} = ${h('D')}`)}, ${m(`${h('A')} = ${h('B')}`)}.</li><li>Hai <b>cạnh bên bằng nhau</b>: ${m('AD = BC')}.</li><li>Hai <b>đường chéo bằng nhau</b>: ${m('AC = BD')}.</li></ul>`},
  {kind:'kt', tag:'Kiến thức trọng tâm 3', title:'Dấu hiệu nhận biết hình thang cân',
   body:`<ol class="lk-steps"><li>Hình thang có hai góc kề một đáy bằng nhau là hình thang cân (định nghĩa).</li><li>Hình thang có hai đường chéo bằng nhau là hình thang cân.</li></ol>` +
     note('Hình thang có hai cạnh bên bằng nhau <b>chưa chắc</b> là hình thang cân (hình bình hành cũng có hai cạnh bên bằng nhau).')},
  {kind:'method', tag:'Dạng 1', title:'Tính góc của hình thang, hình thang cân', steps:[`Hình thang: hai góc kề một cạnh bên bù nhau (tổng ${m('180^\\circ')}).`, 'Hình thang cân: thêm “hai góc kề một đáy bằng nhau”.', 'Viết rõ căn cứ cho từng góc.']},
  {kind:'vd', tag:'Ví dụ 1 · Dạng 1', label:'Ví dụ 1', de:`Hình thang ${m('ABCD')} (${m('AB \\parallel CD')}) có ${m(`${h('D')} = 70^\\circ`)}, ${m(`${h('B')} = 125^\\circ`)}. Tính ${m(h('A'))} và ${m(h('C'))}.`, fig:F_trap({A:[['CDA','70°'],['ABC','125°']]}),
   sol:[`${m('AB \\parallel CD')} nên ${m(`${h('A')} + ${h('D')} = 180^\\circ`)} ⇒ ${m(`${h('A')} = 110^\\circ`)}.`, `Tương tự ${m(`${h('B')} + ${h('C')} = 180^\\circ`)} ⇒ ${m(`${h('C')} = 55^\\circ`)}.`], ans:`${tb(`${h('A')} = 110^\\circ;\\ ${h('C')} = 55^\\circ`)}.`},
  {kind:'vd', tag:'Ví dụ 2 · Dạng 1', label:'Ví dụ 2', de:`Hình thang cân ${m('ABCD')} (${m('AB \\parallel CD')}) có ${m(`${h('D')} = 65^\\circ`)}. Tính các góc còn lại.`, fig:F_iso({A:[['CDA','65°']]}),
   sol:[`Hai góc kề đáy ${m('CD')} bằng nhau: ${m(`${h('C')} = ${h('D')} = 65^\\circ`)}.`, `Hai góc kề cạnh bên ${m('AD')} bù nhau: ${m(`${h('A')} = 180^\\circ - 65^\\circ = 115^\\circ`)}.`, `Hai góc kề đáy ${m('AB')} bằng nhau: ${m(`${h('B')} = ${h('A')} = 115^\\circ`)}.`], ans:`${tb(`${h('C')} = 65^\\circ;\\ ${h('A')} = ${h('B')} = 115^\\circ`)}.`},
  {kind:'method', tag:'Dạng 2', title:'Tính độ dài trong hình thang cân', steps:[`Dùng: cạnh bên bằng nhau, đường chéo bằng nhau.`, `Kẻ đường cao ${m('AH')}: ${m('DH = \\dfrac{CD - AB}{2}')} (đáy lớn trừ đáy nhỏ, chia 2).`, `Dùng Pythagore trong tam giác vuông ${m('AHD')}.`]},
  {kind:'vd', tag:'Ví dụ 3 · Dạng 2', label:'Ví dụ 3', de:`Hình thang cân ${m('ABCD')} (${m('AB \\parallel CD')}) có ${m('AB = 6')} cm, ${m('CD = 14')} cm, ${m('AD = 5')} cm. Kẻ đường cao ${m('AH')}. Tính ${m('DH')}, ${m('AH')}.`,
   fig:geoSVG({P:{A:[4,3],B:[10,3],C:[14,0],D:[0,0],H:[4,0]}, S:[...Q4,['AH','dash']], R:['AHC'], Pa:{AB:1,CD:1}, T:{AD:1,BC:1}, L:{AB:'6',CD:'14',AD:'5'}}),
   sol:[`Kẻ thêm ${m('BK \\perp CD')}. Hai tam giác vuông ${m('AHD')} và ${m('BKC')} có ${m('AD = BC')}, ${m(`${h('D')} = ${h('C')}`)} nên bằng nhau ⇒ ${m('DH = CK')}; lại có ${m('HK = AB = 6')} cm (${m('ABKH')} có bốn góc vuông – sẽ học ở Bài 13).`, `${m('DH = \\dfrac{14 - 6}{2} = 4')} cm.`, `Tam giác ${m('AHD')} vuông tại ${m('H')}: ${m('AH = \\sqrt{5^2 - 4^2} = 3')} cm.`], ans:`${tb('DH = 4;\\ AH = 3')} (cm).`},
  {kind:'vd', tag:'Ví dụ 4 · Dạng 2', label:'Ví dụ 4', de:`Hình thang cân ${m('ABCD')} có đường chéo ${m('AC = 9')} cm, đáy ${m('AB = 4')} cm, ${m('CD = 10')} cm, cạnh bên ${m('AD = 5')} cm. Tính ${m('BD')} và chu vi.`,
   sol:[`Hai đường chéo bằng nhau: ${m('BD = AC = 9')} cm.`, `Hai cạnh bên bằng nhau: ${m('BC = AD = 5')} cm.`, `Chu vi: ${m('4 + 10 + 5 + 5 = 24')} cm.`], ans:`${tb('BD = 9')} cm; chu vi ${tb('24')} cm.`},
  {kind:'method', tag:'Dạng 3', title:'Chứng minh một tứ giác là hình thang cân', steps:['Bước 1: chứng minh tứ giác là hình thang (có hai cạnh đối song song).', 'Bước 2: chứng minh hai góc kề một đáy bằng nhau HOẶC hai đường chéo bằng nhau.']},
  {kind:'vd', tag:'Ví dụ 5 · Dạng 3', label:'Ví dụ 5', de:`Cho tam giác ${m('ABC')} cân tại ${m('A')}. Lấy ${m('D \\in AB,\\ E \\in AC')} sao cho ${m('AD = AE')}. Chứng minh ${m('BDEC')} là hình thang cân.`, fig:F_isoTri(),
   sol:[`Tam giác ${m('ADE')} cân tại ${m('A')} ⇒ ${m(`${h('ADE')} = \\dfrac{180^\\circ - ${h('A')}}{2}`)}.`, `Tam giác ${m('ABC')} cân tại ${m('A')} ⇒ ${m(`${h('ABC')} = \\dfrac{180^\\circ - ${h('A')}}{2}`)}.`, `Suy ra ${m(`${h('ADE')} = ${h('ABC')}`)}, hai góc ở vị trí đồng vị ⇒ ${m('DE \\parallel BC')} ⇒ ${m('BDEC')} là hình thang.`, `Lại có ${m(`${h('B')} = ${h('C')}`)} (hai góc kề đáy ${m('BC')}).`], ans:`Vậy ${m('BDEC')} là <b>hình thang cân</b>.`},
  {kind:'lt', tag:'Luyện tập', label:'Bài 1', de:`Hình thang cân ${m('ABCD')} (${m('AB \\parallel CD')}) có ${m(`${h('A')} = 3\\,${h('D')}`)}. Tính các góc.`, sol:[`${m(`${h('A')} + ${h('D')} = 180^\\circ \\Rightarrow 4\\,${h('D')} = 180^\\circ \\Rightarrow ${h('D')} = 45^\\circ`)}.`, `${m(`${h('C')} = 45^\\circ,\\ ${h('A')} = ${h('B')} = 135^\\circ`)}.`]},
  {kind:'lt', tag:'Luyện tập', label:'Bài 2', de:`Hình thang cân ${m('ABCD')} có ${m('AB = 4')}, ${m('CD = 16')}, ${m('AD = 10')} (cm). Tính đường cao.`, sol:[`${m('DH = (16 - 4) : 2 = 6')} cm.`, `${m('AH = \\sqrt{100 - 36} = 8')} cm.`]},
  {kind:'sum', tag:'Tổng kết', title:'Ghi nhớ', body:`<ul><li>Hình thang: hai góc kề một cạnh bên bù nhau.</li><li>Hình thang cân: góc kề một đáy bằng nhau; cạnh bên bằng nhau; đường chéo bằng nhau.</li><li>Nhận biết: hình thang + (góc kề đáy bằng nhau hoặc đường chéo bằng nhau).</li></ul>` + HOME('Bài 11')},
]},

/* ---------------- BÀI 12 ---------------- */
{ id:'bai-12', name:'Bài 12. Hình bình hành', desc:'Định nghĩa, tính chất về cạnh, góc, đường chéo; năm dấu hiệu nhận biết.', slides:[
  TITLE('Bài 12. Hình bình hành', ['Nhận biết hình bình hành; vận dụng tính chất về cạnh, góc, đường chéo.', 'Dùng dấu hiệu nhận biết để chứng minh một tứ giác là hình bình hành.']),
  {kind:'kt', tag:'Kiến thức trọng tâm 1', title:'Hình bình hành và tính chất', fig:F_pg({extra:{O:[3.4,1.5]}, S:[['AC','dash'],['BD','dash']], T:{OA:1,OC:1,OB:2,OD:2}}),
   body: box(`<b>Hình bình hành</b> là tứ giác có các cạnh đối song song: ${m('AB \\parallel CD,\\ AD \\parallel BC')}.`) +
     `<ul><li>Các <b>cạnh đối bằng nhau</b>: ${m('AB = CD,\\ AD = BC')}.</li><li>Các <b>góc đối bằng nhau</b>: ${m(`${h('A')} = ${h('C')},\\ ${h('B')} = ${h('D')}`)}.</li><li>Hai <b>đường chéo cắt nhau tại trung điểm</b> mỗi đường: ${m('OA = OC,\\ OB = OD')}.</li></ul>`},
  {kind:'kt', tag:'Kiến thức trọng tâm 2', title:'Dấu hiệu nhận biết hình bình hành',
   body:`<ol class="lk-steps"><li>Tứ giác có các cạnh đối song song.</li><li>Tứ giác có các cạnh đối bằng nhau.</li><li>Tứ giác có <b>hai cạnh đối song song và bằng nhau</b>.</li><li>Tứ giác có các góc đối bằng nhau.</li><li>Tứ giác có hai đường chéo cắt nhau tại trung điểm của mỗi đường.</li></ol>` + note('Dấu hiệu 3: phải là <b>cùng một cặp</b> cạnh đối vừa song song vừa bằng nhau.')},
  {kind:'method', tag:'Dạng 1', title:'Tính cạnh, góc, đường chéo', steps:['Cạnh đối bằng nhau; góc đối bằng nhau.', `Hai góc kề một cạnh bù nhau (tổng ${m('180^\\circ')}).`, `Giao điểm ${m('O')} của hai đường chéo là trung điểm mỗi đường.`]},
  {kind:'vd', tag:'Ví dụ 1 · Dạng 1', label:'Ví dụ 1', de:`Hình bình hành ${m('ABCD')} có ${m(`${h('A')} = 70^\\circ`)}. Tính các góc còn lại.`, fig:F_pg({A:[['DAB','70°']]}),
   sol:[`Góc đối: ${m(`${h('C')} = ${h('A')} = 70^\\circ`)}.`, `Hai góc kề cạnh ${m('AB')} bù nhau: ${m(`${h('B')} = 180^\\circ - 70^\\circ = 110^\\circ`)}.`, `Góc đối: ${m(`${h('D')} = ${h('B')} = 110^\\circ`)}.`], ans:`${tb(`${h('B')} = ${h('D')} = 110^\\circ;\\ ${h('C')} = 70^\\circ`)}.`},
  {kind:'vd', tag:'Ví dụ 2 · Dạng 1', label:'Ví dụ 2', de:`Hình bình hành ${m('ABCD')} có ${m('AB = 8')} cm, ${m('BC = 5')} cm, hai đường chéo cắt nhau tại ${m('O')} và ${m('OA = 3')} cm. Tính ${m('CD')}, ${m('AD')}, ${m('AC')} và chu vi.`,
   fig:F_pg({extra:{O:[3.4,1.5]}, S:[['AC','dash'],['BD','dash']], L:{AB:'8 cm',BC:'5 cm'}, T:{OA:1,OC:1}}),
   sol:[`Cạnh đối bằng nhau: ${m('CD = AB = 8')} cm; ${m('AD = BC = 5')} cm.`, `${m('O')} là trung điểm ${m('AC')}: ${m('AC = 2\\cdot OA = 6')} cm.`, `Chu vi: ${m('2(8 + 5) = 26')} cm.`], ans:`${tb('CD = 8;\\ AD = 5;\\ AC = 6')} (cm); chu vi ${tb('26')} cm.`},
  {kind:'method', tag:'Dạng 2', title:'Chứng minh tứ giác là hình bình hành', steps:['Xác định dữ kiện đang có (song song? bằng nhau? trung điểm?).', 'Chọn dấu hiệu phù hợp nhất (hay dùng dấu hiệu 3 và 5).', 'Trình bày: “Tứ giác … có … nên là hình bình hành (dấu hiệu …)”.']},
  {kind:'vd', tag:'Ví dụ 3 · Dạng 2', label:'Ví dụ 3', de:`Cho hình bình hành ${m('ABCD')}; ${m('M, N')} lần lượt là trung điểm của ${m('AB, CD')}. Chứng minh ${m('AMCN')} là hình bình hành.`, fig:F_pgMid(),
   sol:[`${m('AB \\parallel CD')} ⇒ ${m('AM \\parallel NC')}.`, `${m('AB = CD')} ⇒ ${m('AM = \\dfrac{AB}{2} = \\dfrac{CD}{2} = NC')}.`, `Tứ giác ${m('AMCN')} có hai cạnh đối ${m('AM, NC')} song song và bằng nhau.`], ans:`Vậy ${m('AMCN')} là <b>hình bình hành</b> (dấu hiệu 3).`},
  {kind:'vd', tag:'Ví dụ 4 · Dạng 2', label:'Ví dụ 4', de:`Cho tam giác ${m('ABC')}, ${m('M')} là trung điểm ${m('BC')}. Lấy ${m('D')} sao cho ${m('M')} là trung điểm của ${m('AD')}. Chứng minh ${m('ABDC')} là hình bình hành.`,
   fig:geoSVG({P:{A:[1.5,3.6],B:[0,0],C:[6,0],M:[3,0],D:[4.5,-3.6]}, S:['AB','AC','BD','CD',['AD','dash'],'BC'], T:{BM:1,MC:1,AM:2,MD:2}}),
   sol:[`Tứ giác ${m('ABDC')} có hai đường chéo ${m('AD')} và ${m('BC')}.`, `${m('M')} là trung điểm của ${m('BC')} và của ${m('AD')}.`], ans:`Hai đường chéo cắt nhau tại trung điểm mỗi đường ⇒ ${m('ABDC')} là <b>hình bình hành</b> (dấu hiệu 5).`},
  {kind:'method', tag:'Dạng 3', title:'Tìm x', steps:['Chọn hai yếu tố bằng nhau (cạnh đối, góc đối) hoặc bù nhau (góc kề).', 'Lập phương trình theo x và giải.', 'Thay x để tính yếu tố cần tìm.']},
  {kind:'vd', tag:'Ví dụ 5 · Dạng 3', label:'Ví dụ 5', de:`Hình bình hành ${m('ABCD')} có ${m('AB = 2x + 1')} (cm) và ${m('CD = x + 5')} (cm). Tìm ${m('x')} và ${m('AB')}.`,
   sol:[`${m('AB = CD')} (cạnh đối) ⇒ ${m('2x + 1 = x + 5')}.`, `${m('x = 4')}.`, `${m('AB = 2\\cdot 4 + 1 = 9')} cm.`], ans:`${tb('x = 4;\\ AB = 9')} cm.`},
  {kind:'lt', tag:'Luyện tập', label:'Bài 1', de:`Hình bình hành ${m('ABCD')} có ${m(`${h('A')} - ${h('B')} = 40^\\circ`)}. Tính các góc.`, sol:[`${m(`${h('A')} + ${h('B')} = 180^\\circ`)} ⇒ ${m(`${h('A')} = 110^\\circ,\\ ${h('B')} = 70^\\circ`)}.`, `${m(`${h('C')} = 110^\\circ,\\ ${h('D')} = 70^\\circ`)}.`]},
  {kind:'lt', tag:'Luyện tập', label:'Bài 2', de:`Tứ giác ${m('ABCD')} có ${m('AB = CD = 5')} cm và ${m('AD = BC = 3')} cm. Tứ giác đó là hình gì? Vì sao?`, sol:[`Các cạnh đối bằng nhau ⇒ hình bình hành (dấu hiệu 2).`]},
  {kind:'sum', tag:'Tổng kết', title:'Ghi nhớ', body:`<ul><li>Tính chất: cạnh đối bằng nhau; góc đối bằng nhau; đường chéo cắt nhau tại trung điểm.</li><li>Năm dấu hiệu nhận biết (nhớ dấu hiệu 3 và 5).</li><li>Hai góc kề một cạnh bù nhau.</li></ul>` + HOME('Bài 12')},
]},

/* ---------------- BÀI 13 ---------------- */
{ id:'bai-13', name:'Bài 13. Hình chữ nhật', desc:'Định nghĩa, tính chất đường chéo; dấu hiệu nhận biết; trung tuyến ứng với cạnh huyền.', slides:[
  TITLE('Bài 13. Hình chữ nhật', ['Nhận biết hình chữ nhật; tính chất hai đường chéo.', 'Dùng dấu hiệu nhận biết để chứng minh hình chữ nhật.', 'Vận dụng vào tam giác vuông: trung tuyến ứng với cạnh huyền.']),
  {kind:'kt', tag:'Kiến thức trọng tâm 1', title:'Hình chữ nhật và tính chất', fig:F_rect({extra:{O:[2.6,1.5]}, S:[['AC','dash'],['BD','dash']], T:{OA:1,OB:1,OC:1,OD:1}}),
   body: box('<b>Hình chữ nhật</b> là tứ giác có bốn góc vuông.') + S('Hình chữ nhật cũng là hình bình hành và hình thang cân, nên có đủ tính chất của hai hình đó.') +
     box(`Hai đường chéo của hình chữ nhật <b>bằng nhau</b> và <b>cắt nhau tại trung điểm</b> mỗi đường: ${m('OA = OB = OC = OD')}.`)},
  {kind:'kt', tag:'Kiến thức trọng tâm 2', title:'Dấu hiệu nhận biết hình chữ nhật',
   body:`<ol class="lk-steps"><li>Tứ giác có ba góc vuông.</li><li>Hình thang cân có một góc vuông.</li><li>Hình bình hành có một góc vuông.</li><li>Hình bình hành có hai đường chéo bằng nhau.</li></ol>` + note('Tứ giác có hai đường chéo bằng nhau <b>chưa chắc</b> là hình chữ nhật (có thể là hình thang cân).')},
  {kind:'kt', tag:'Kiến thức trọng tâm 3', title:'Áp dụng vào tam giác vuông', fig:F_med(false),
   body: box('Trong tam giác vuông, đường trung tuyến ứng với cạnh huyền bằng nửa cạnh huyền: ' + m('AM = \\dfrac{BC}{2}') + '.') + S(`Giải thích: lấy ${m('D')} đối xứng với ${m('A')} qua ${m('M')} thì ${m('ABDC')} là hình chữ nhật, nên ${m('AD = BC')}.`) +
     S('Ngược lại: tam giác có đường trung tuyến ứng với một cạnh bằng nửa cạnh ấy thì là tam giác vuông.')},
  {kind:'method', tag:'Dạng 1', title:'Tính độ dài', steps:[`Tam giác tạo bởi hai cạnh và đường chéo là tam giác vuông ⇒ dùng Pythagore: ${m('AC^2 = AB^2 + BC^2')}.`, `Hai đường chéo bằng nhau, ${m('O')} là trung điểm: ${m('OA = \\dfrac{AC}{2}')}.`, `Tam giác vuông: trung tuyến ứng cạnh huyền ${m('= \\dfrac{\\text{cạnh huyền}}{2}')}.`]},
  {kind:'vd', tag:'Ví dụ 1 · Dạng 1', label:'Ví dụ 1', de:`Hình chữ nhật ${m('ABCD')} có ${m('AB = 8')} cm, ${m('BC = 6')} cm, hai đường chéo cắt nhau tại ${m('O')}. Tính ${m('AC')}, ${m('BD')}, ${m('OA')}.`,
   fig:F_rect({extra:{O:[2.6,1.5]}, S:[['AC','dash'],['BD','dash']], L:{AB:'8 cm',BC:'6 cm'}}),
   sol:[`Tam giác ${m('ABC')} vuông tại ${m('B')}: ${m('AC = \\sqrt{8^2 + 6^2} = \\sqrt{100} = 10')} cm.`, `Hai đường chéo bằng nhau: ${m('BD = AC = 10')} cm.`, `${m('O')} là trung điểm ${m('AC')}: ${m('OA = 5')} cm.`], ans:`${tb('AC = BD = 10;\\ OA = 5')} (cm).`},
  {kind:'vd', tag:'Ví dụ 2 · Dạng 1', label:'Ví dụ 2', de:`Tam giác ${m('ABC')} vuông tại ${m('A')}, ${m('AB = 5')} cm, ${m('AC = 12')} cm, ${m('M')} là trung điểm ${m('BC')}. Tính ${m('AM')}.`,
   fig:geoSVG({P:{A:[0,0],B:[5.2,0],C:[0,3.4],M:[2.6,1.7]}, S:['AB','AC','BC',['AM','dash']], R:['CAB'], T:{BM:1,MC:1}, L:{AB:'5',AC:'12'}}),
   sol:[`${m('BC = \\sqrt{5^2 + 12^2} = 13')} cm.`, `${m('AM')} là trung tuyến ứng với cạnh huyền: ${m('AM = \\dfrac{BC}{2}')}.`], ans:`${tb('AM = 6{,}5')} cm.`},
  {kind:'method', tag:'Dạng 2', title:'Chứng minh tứ giác là hình chữ nhật', steps:['Thường chứng minh trước là hình bình hành (hoặc hình thang cân).', 'Sau đó chỉ ra một góc vuông, hoặc hai đường chéo bằng nhau.', 'Hoặc chứng minh trực tiếp tứ giác có ba góc vuông.']},
  {kind:'vd', tag:'Ví dụ 3 · Dạng 2', label:'Ví dụ 3', de:`Tam giác ${m('ABC')} vuông tại ${m('A')}, ${m('M')} là trung điểm ${m('BC')}. Lấy ${m('D')} đối xứng với ${m('A')} qua ${m('M')}. Chứng minh ${m('ABDC')} là hình chữ nhật.`, fig:F_med(false),
   sol:[`${m('M')} là trung điểm của ${m('BC')} và ${m('AD')} ⇒ ${m('ABDC')} là hình bình hành (hai đường chéo cắt nhau tại trung điểm mỗi đường).`, `Hình bình hành ${m('ABDC')} có ${m(`${h('BAC')} = 90^\\circ`)}.`], ans:`Vậy ${m('ABDC')} là <b>hình chữ nhật</b> (hình bình hành có một góc vuông).`},
  {kind:'vd', tag:'Ví dụ 4 · Dạng 2', label:'Ví dụ 4', de:`Tứ giác ${m('MNPQ')} có ${m(`${h('M')} = ${h('N')} = ${h('P')} = 90^\\circ`)}. Tứ giác đó là hình gì? Tính ${m(h('Q'))}.`,
   sol:[`Tứ giác có ba góc vuông là hình chữ nhật.`, `${m(`${h('Q')} = 360^\\circ - 3\\cdot 90^\\circ = 90^\\circ`)}.`], ans:`Hình chữ nhật; ${m(h('Q') + ' =')} ${tb(dg(90))}.`},
  {kind:'method', tag:'Dạng 3', title:'Bài toán thực tế', steps:['Muốn kiểm tra một khung có là hình chữ nhật: đo hai cặp cạnh đối (bằng nhau ⇒ hình bình hành).', 'Đo tiếp hai đường chéo: bằng nhau ⇒ hình chữ nhật.']},
  {kind:'vd', tag:'Ví dụ 5 · Dạng 3', label:'Ví dụ 5', de:`Bác thợ mộc làm khung cửa có hai cặp cạnh đối lần lượt bằng ${m('2{,}1')} m và ${m('0{,}9')} m, hai đường chéo đo được đều bằng ${m('2{,}28')} m. Khung cửa có phải hình chữ nhật không?`,
   sol:[`Các cạnh đối bằng nhau ⇒ khung là hình bình hành.`, `Hình bình hành có hai đường chéo bằng nhau ⇒ hình chữ nhật.`, `(Kiểm tra: ${m('\\sqrt{2{,}1^2 + 0{,}9^2} = \\sqrt{5{,}22} \\approx 2{,}28')} m.)`], ans:`Khung cửa <b>là hình chữ nhật</b>.`},
  {kind:'lt', tag:'Luyện tập', label:'Bài 1', de:`Hình chữ nhật có đường chéo ${m('13')} cm, một cạnh ${m('5')} cm. Tính cạnh còn lại và diện tích.`, sol:[`Cạnh còn lại ${m('= \\sqrt{169 - 25} = 12')} cm.`, `Diện tích ${m('5\\cdot 12 = 60')} cm².`]},
  {kind:'lt', tag:'Luyện tập', label:'Bài 2', de:`Tam giác ${m('ABC')} có trung tuyến ${m('AM = \\dfrac{BC}{2}')}. Tính ${m(h('BAC'))}.`, sol:[`Trung tuyến bằng nửa cạnh tương ứng ⇒ tam giác vuông tại ${m('A')}: ${m(`${h('BAC')} = 90^\\circ`)}.`]},
  {kind:'sum', tag:'Tổng kết', title:'Ghi nhớ', body:`<ul><li>Hình chữ nhật: bốn góc vuông; hai đường chéo bằng nhau, cắt nhau tại trung điểm.</li><li>Nhận biết: ba góc vuông; hình bình hành (hoặc hình thang cân) có một góc vuông; hình bình hành có hai đường chéo bằng nhau.</li><li>Tam giác vuông: trung tuyến ứng cạnh huyền bằng nửa cạnh huyền.</li></ul>` + HOME('Bài 13')},
]},

/* ---------------- BÀI 14 ---------------- */
{ id:'bai-14', name:'Bài 14. Hình thoi và hình vuông', desc:'Hình thoi: tính chất đường chéo, dấu hiệu; hình vuông: tính chất, dấu hiệu.', slides:[
  TITLE('Bài 14. Hình thoi và hình vuông', ['Nhận biết hình thoi, hình vuông; vận dụng tính chất đường chéo.', 'Dùng dấu hiệu nhận biết để chứng minh hình thoi, hình vuông.']),
  {kind:'kt', tag:'Kiến thức trọng tâm 1', title:'Hình thoi và tính chất', fig:F_rho({R:['AOB'], A:[['BAC','',1],['CAD','',1]]}),
   body: box('<b>Hình thoi</b> là tứ giác có bốn cạnh bằng nhau. Hình thoi cũng là hình bình hành.') +
     `<ul><li>Hai đường chéo <b>vuông góc</b> với nhau.</li><li>Hai đường chéo là các <b>đường phân giác</b> của các góc của hình thoi (${m(`${h('BAC')} = ${h('CAD')}`)}).</li><li>Hai đường chéo cắt nhau tại trung điểm mỗi đường.</li></ul>`},
  {kind:'kt', tag:'Kiến thức trọng tâm 2', title:'Dấu hiệu nhận biết hình thoi',
   body:`<ol class="lk-steps"><li>Tứ giác có bốn cạnh bằng nhau.</li><li>Hình bình hành có hai cạnh kề bằng nhau.</li><li>Hình bình hành có hai đường chéo vuông góc.</li><li>Hình bình hành có một đường chéo là đường phân giác của một góc.</li></ol>` + note('Tứ giác có hai đường chéo vuông góc <b>chưa chắc</b> là hình thoi.')},
  {kind:'kt', tag:'Kiến thức trọng tâm 3', title:'Hình vuông', fig:F_sq({extra:{O:[1.7,1.7]}, S:[['AC','dash'],['BD','dash']]}),
   body: box('<b>Hình vuông</b> là tứ giác có bốn góc vuông và bốn cạnh bằng nhau. Hình vuông vừa là hình chữ nhật vừa là hình thoi.') +
     S('Hai đường chéo: bằng nhau, vuông góc, cắt nhau tại trung điểm mỗi đường, là phân giác các góc.') +
     S('<b>Dấu hiệu:</b> hình chữ nhật có hai cạnh kề bằng nhau / hai đường chéo vuông góc / một đường chéo là phân giác của một góc; hình thoi có một góc vuông / hai đường chéo bằng nhau.')},
  {kind:'method', tag:'Dạng 1', title:'Tính toán trong hình thoi', steps:[`Gọi ${m('O')} là giao điểm hai đường chéo: ${m('OA = \\dfrac{AC}{2},\\ OB = \\dfrac{BD}{2}')}.`, `Tam giác ${m('OAB')} vuông tại ${m('O')} ⇒ ${m('AB^2 = OA^2 + OB^2')}.`, 'Góc: đường chéo là phân giác; hai góc kề một cạnh bù nhau.']},
  {kind:'vd', tag:'Ví dụ 1 · Dạng 1', label:'Ví dụ 1', de:`Hình thoi ${m('ABCD')} có ${m('AC = 8')} cm, ${m('BD = 6')} cm. Tính cạnh và chu vi.`, fig:F_rho({R:['AOB'], L:{AB:'?'}}),
   sol:[`${m('OA = 4')} cm, ${m('OB = 3')} cm; ${m('AC \\perp BD')}.`, `Tam giác ${m('OAB')} vuông tại ${m('O')}: ${m('AB = \\sqrt{4^2 + 3^2} = 5')} cm.`, `Chu vi ${m('= 4\\cdot 5')}.`], ans:`Cạnh ${tb('5')} cm; chu vi ${tb('20')} cm.`},
  {kind:'vd', tag:'Ví dụ 2 · Dạng 1', label:'Ví dụ 2', de:`Hình thoi ${m('ABCD')} cạnh ${m('6')} cm có ${m(`${h('BAD')} = 60^\\circ`)}. Tính ${m('BD')} và ${m(h('ABC'))}.`, fig:F_rho({S:[['BD','dash']], A:[['BAD','60°']]}),
   sol:[`Tam giác ${m('ABD')} có ${m('AB = AD')} và ${m(`${h('A')} = 60^\\circ`)} ⇒ tam giác đều ⇒ ${m('BD = AB = 6')} cm.`, `${m(`${h('ABC')} = 180^\\circ - 60^\\circ = 120^\\circ`)} (hai góc kề một cạnh bù nhau).`], ans:`${tb(`BD = 6`)} cm; ${m(h('ABC') + ' =')} ${tb(dg(120))}.`},
  {kind:'method', tag:'Dạng 2', title:'Tính toán trong hình vuông', steps:[`Cạnh ${m('a')} ⇒ chu vi ${m('4a')}, diện tích ${m('a^2')}.`, `Đường chéo ${m('d = a\\sqrt{2}')} (Pythagore trong tam giác vuông cân).`, `Biết đường chéo ${m('d')} ⇒ diện tích ${m('S = \\dfrac{d^2}{2}')}.`]},
  {kind:'vd', tag:'Ví dụ 3 · Dạng 2', label:'Ví dụ 3', de:`Hình vuông ${m('ABCD')} cạnh ${m('4')} cm. Tính đường chéo và diện tích.`, fig:F_sq({S:[['AC','dash']], L:{AB:'4 cm'}}),
   sol:[`Tam giác ${m('ABC')} vuông cân tại ${m('B')}: ${m('AC^2 = 4^2 + 4^2 = 32')}.`, `${m('AC = \\sqrt{32} = 4\\sqrt{2}')} cm; diện tích ${m('4^2 = 16')} cm².`], ans:`${tb('AC = 4\\sqrt{2}')} cm; ${tb('S = 16')} cm².`},
  {kind:'vd', tag:'Ví dụ 4 · Dạng 2', label:'Ví dụ 4', de:`Một hình vuông có đường chéo dài ${m('6')} cm. Tính diện tích.`, sol:[`Gọi cạnh là ${m('a')}: ${m('a^2 + a^2 = 6^2 \\Rightarrow 2a^2 = 36 \\Rightarrow a^2 = 18')}.`], ans:`${tb('S = 18')} cm².`},
  {kind:'method', tag:'Dạng 3', title:'Chứng minh hình thoi, hình vuông', steps:['Chứng minh trước là hình bình hành (hoặc hình chữ nhật).', 'Hình thoi: thêm hai cạnh kề bằng nhau / hai đường chéo vuông góc.', 'Hình vuông: hình chữ nhật có hai cạnh kề bằng nhau, hoặc hình thoi có một góc vuông.']},
  {kind:'vd', tag:'Ví dụ 5 · Dạng 3', label:'Ví dụ 5', de:`Tam giác ${m('ABC')} cân tại ${m('A')}, ${m('M')} là trung điểm ${m('BC')}. Lấy ${m('D')} đối xứng với ${m('A')} qua ${m('M')}. Chứng minh ${m('ABDC')} là hình thoi.`, fig:F_isoMed(),
   sol:[`${m('M')} là trung điểm của ${m('BC')} và ${m('AD')} ⇒ ${m('ABDC')} là hình bình hành.`, `Hình bình hành ${m('ABDC')} có hai cạnh kề ${m('AB = AC')}.`], ans:`Vậy ${m('ABDC')} là <b>hình thoi</b>.`},
  {kind:'vd', tag:'Ví dụ 6 · Dạng 3', label:'Ví dụ 6', de:`Tam giác ${m('ABC')} vuông cân tại ${m('A')}, ${m('M')} là trung điểm ${m('BC')}, ${m('D')} đối xứng với ${m('A')} qua ${m('M')}. Chứng minh ${m('ABDC')} là hình vuông.`, fig:F_med(true),
   sol:[`Như ví dụ 3 bài 13: ${m('ABDC')} là hình chữ nhật (hình bình hành có ${m(`${h('A')} = 90^\\circ`)}).`, `Hình chữ nhật ${m('ABDC')} có hai cạnh kề ${m('AB = AC')}.`], ans:`Vậy ${m('ABDC')} là <b>hình vuông</b>.`},
  {kind:'lt', tag:'Luyện tập', label:'Bài 1', de:`Hình thoi có chu vi ${m('40')} cm và một đường chéo ${m('12')} cm. Tính đường chéo còn lại.`, sol:[`Cạnh ${m('= 10')} cm; nửa đường chéo đã biết ${m('= 6')} cm.`, `Nửa đường chéo còn lại ${m('= \\sqrt{100 - 36} = 8')} ⇒ đường chéo ${m('16')} cm.`]},
  {kind:'lt', tag:'Luyện tập', label:'Bài 2', de:`Hình thoi ${m('ABCD')} có ${m(`${h('A')} = 90^\\circ`)}. Đó là hình gì?`, sol:[`Hình thoi có một góc vuông là hình vuông.`]},
  {kind:'sum', tag:'Tổng kết', title:'Ghi nhớ', body:`<ul><li>Hình thoi: bốn cạnh bằng nhau; đường chéo vuông góc, là phân giác các góc.</li><li>Hình vuông = hình chữ nhật + hình thoi; đường chéo ${m('a\\sqrt{2}')}.</li><li>Nhận biết: xuất phát từ hình bình hành / hình chữ nhật / hình thoi rồi thêm điều kiện.</li></ul>` + HOME('Bài 14')},
]},

/* ---------------- ÔN TẬP ---------------- */
{ id:'on-tap-c3', name:'Ôn tập chương III', desc:'Bảng hệ thống các tứ giác đặc biệt; ví dụ tổng hợp chứng minh và tính toán.', slides:[
  {kind:'title', tag:'Toán 8 · Kết nối tri thức', title:'Ôn tập chương III', sub:'Tứ giác', points:['Hệ thống định nghĩa, tính chất, dấu hiệu các tứ giác đặc biệt.', 'Luyện chứng minh và tính toán tổng hợp.']},
  {kind:'kt', tag:'Hệ thống kiến thức', title:'Các tứ giác đặc biệt', body:REL},
  {kind:'kt', tag:'Hệ thống kiến thức', title:'Sơ đồ nhận biết', body:`<ul><li><b>Tứ giác</b> → (hai cạnh đối song song) → <b>hình thang</b> → (góc kề đáy bằng nhau / đường chéo bằng nhau) → <b>hình thang cân</b>.</li><li><b>Tứ giác</b> → (5 dấu hiệu) → <b>hình bình hành</b> → (1 góc vuông / đường chéo bằng nhau) → <b>hình chữ nhật</b>.</li><li><b>Hình bình hành</b> → (2 cạnh kề bằng nhau / đường chéo vuông góc / đường chéo là phân giác) → <b>hình thoi</b>.</li><li><b>Hình chữ nhật</b> + <b>hình thoi</b> → <b>hình vuông</b>.</li></ul>`},
  {kind:'vd', tag:'Ví dụ tổng hợp', label:'Ví dụ 1', de:`Tam giác ${m('ABC')} vuông tại ${m('A')}, ${m('AB = 6')} cm, ${m('AC = 8')} cm, ${m('M')} là trung điểm ${m('BC')}. Gọi ${m('E, F')} lần lượt là chân đường vuông góc kẻ từ ${m('M')} đến ${m('AB, AC')}. a) Tứ giác ${m('AEMF')} là hình gì? b) Tính ${m('EF')}.`, fig:F_review(),
   sol:[`a) Tứ giác ${m('AEMF')} có ${m(`${h('A')} = ${h('AEM')} = ${h('AFM')} = 90^\\circ`)} (ba góc vuông) ⇒ <b>hình chữ nhật</b>.`, `b) Hai đường chéo hình chữ nhật bằng nhau: ${m('EF = AM')}.`, `${m('BC = \\sqrt{36 + 64} = 10')} cm; ${m('AM = \\dfrac{BC}{2} = 5')} cm (trung tuyến ứng cạnh huyền).`], ans:`Hình chữ nhật; ${tb('EF = 5')} cm.`},
  {kind:'vd', tag:'Ví dụ tổng hợp', label:'Ví dụ 2', de:`Ở ví dụ 1, nếu tam giác ${m('ABC')} vuông cân tại ${m('A')} thì tứ giác ${m('AEMF')} là hình gì? Vì sao?`,
   sol:[`${m('M')} cách đều ${m('AB')} và ${m('AC')} (vì ${m('AM')} là phân giác góc ${m('A')} trong tam giác vuông cân) ⇒ ${m('ME = MF')}.`, `Hình chữ nhật ${m('AEMF')} có hai cạnh kề ${m('ME = MF')}.`], ans:`${m('AEMF')} là <b>hình vuông</b>.`},
  {kind:'lt', tag:'Luyện tập', label:'Bài 1', de:`Hình thang cân có hai đáy ${m('5')} cm, ${m('11')} cm, cạnh bên ${m('5')} cm. Tính đường cao.`, sol:[`${m('DH = (11 - 5) : 2 = 3')} cm; đường cao ${m('= \\sqrt{25 - 9} = 4')} cm.`]},
  {kind:'lt', tag:'Luyện tập', label:'Bài 2', de:`Hình thoi có hai đường chéo ${m('10')} cm và ${m('24')} cm. Tính cạnh.`, sol:[`Nửa đường chéo: ${m('5')} và ${m('12')}; cạnh ${m('= \\sqrt{25 + 144} = 13')} cm.`]},
  {kind:'sum', tag:'Tổng kết', title:'Chuẩn bị kiểm tra', body:`<ul><li>Vẽ hình to, rõ; đánh dấu kí hiệu cạnh bằng nhau, song song, góc vuông.</li><li>Chứng minh: nêu đủ dữ kiện rồi mới gọi tên dấu hiệu.</li><li>Tính toán: tìm tam giác vuông để dùng Pythagore.</li></ul>` + box('Luyện thêm: web <b>Học mà chơi</b> – Toán 8, Ôn tập chương III (3 mức độ).')},
]},
]});
function d360(){ return m(`${h('A')} + ${h('B')} + ${h('C')} + ${h('D')} = 360^\\circ`); }
})();
