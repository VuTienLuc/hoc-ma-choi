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
