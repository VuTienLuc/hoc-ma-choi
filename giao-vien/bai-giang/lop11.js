/* =====================================================================
   BÀI GIẢNG LỚP 11 – Toán, Kết nối tri thức (giáo viên trình chiếu)
   Chương II. Dãy số. Cấp số cộng và cấp số nhân (Bài 5 – Bài 7, Ôn tập)
   Cấu trúc trang chiếu: xem giao-vien/bai-giang/lop10.js và CLAUDE.md.
   ===================================================================== */
(() => {
const m = tm, d = td;
const box = h => `<div class="lk-box">${h}</div>`, note = h => `<div class="lk-note">⚠️ ${h}</div>`;
const S = t => `<p>${t}</p>`;
const TITLE = (name, pts) => ({kind:'title', tag:'Toán 11 · Kết nối tri thức · Chương II', title:name, sub:'Mục tiêu bài học', points:pts});
const HOME = n => box(`Về nhà: làm các bài tập cuối ${n} trong SGK; luyện thêm trên web <b>Học mà chơi</b> – Toán 11, ${n}.`);
const CMP = `<table class="lk-table lk-left"><tr><th></th><th>Cấp số cộng</th><th>Cấp số nhân</th></tr>
  <tr><td>Định nghĩa</td><td>${m('u_{n+1} = u_n + d')}</td><td>${m('u_{n+1} = u_n\\cdot q')}</td></tr>
  <tr><td>Số hạng tổng quát</td><td>${m('u_n = u_1 + (n - 1)d')}</td><td>${m('u_n = u_1\\cdot q^{n-1}')}</td></tr>
  <tr><td>Ba số liên tiếp</td><td>${m('u_k = \\dfrac{u_{k-1} + u_{k+1}}{2}')}</td><td>${m('u_k^2 = u_{k-1}\\cdot u_{k+1}')}</td></tr>
  <tr><td>Tổng ${m('n')} số hạng đầu</td><td>${m('S_n = \\dfrac{n(u_1 + u_n)}{2}')}</td><td>${m('S_n = \\dfrac{u_1(1 - q^n)}{1 - q}\\ (q \\ne 1)')}</td></tr></table>`;

Lecture.add({ grade:'lop11', gradeName:'Toán 11', chapter:'Chương II. Dãy số. Cấp số cộng và cấp số nhân', lessons:[

/* ---------------- BÀI 5 ---------------- */
{ id:'bai-5', name:'Bài 5. Dãy số', desc:'Cách cho dãy số; tính số hạng; dự đoán số hạng tổng quát; dãy tăng, giảm, bị chặn.', slides:[
  TITLE('Bài 5. Dãy số', ['Nhận biết dãy số hữu hạn, vô hạn; các cách cho một dãy số.', 'Tính được các số hạng; dự đoán số hạng tổng quát.', 'Xét được tính tăng, giảm và bị chặn của dãy số đơn giản.']),

  {kind:'kt', tag:'Kiến thức trọng tâm 1', title:'Dãy số là gì?',
   body: box(`Mỗi hàm số ${m('u')} xác định trên tập ${m('\\mathbb{N}^*')} gọi là một <b>dãy số vô hạn</b>. Viết ${m('(u_n)')}, với ${m('u_n = u(n)')}.`) +
     S(`${m('u_1')} là số hạng đầu, ${m('u_n')} là <b>số hạng tổng quát</b> (số hạng thứ ${m('n')}).`) +
     S(`Hàm số xác định trên ${m('\\{1; 2; \\ldots; m\\}')} gọi là <b>dãy số hữu hạn</b>; ${m('u_m')} là số hạng cuối.`)},

  {kind:'kt', tag:'Kiến thức trọng tâm 2', title:'Các cách cho một dãy số',
   body:`<ol class="lk-steps"><li><b>Công thức số hạng tổng quát:</b> ${m('u_n = \\dfrac{2n - 1}{n + 1}')}.</li>
     <li><b>Hệ thức truy hồi:</b> cho ${m('u_1')} và công thức tính ${m('u_{n+1}')} theo ${m('u_n')}, ví dụ ${m('u_1 = 2,\\ u_{n+1} = 2u_n - 1')}.</li>
     <li><b>Liệt kê</b> hoặc <b>mô tả</b> bằng lời: dãy các số nguyên tố ${m('2, 3, 5, 7, 11, \\ldots')}</li></ol>`},

  {kind:'kt', tag:'Kiến thức trọng tâm 3', title:'Dãy số tăng, giảm, bị chặn',
   body: box(`${m('(u_n)')} <b>tăng</b> nếu ${m('u_{n+1} \\gt u_n')}; <b>giảm</b> nếu ${m('u_{n+1} \\lt u_n')} với mọi ${m('n \\in \\mathbb{N}^*')}.`) +
     box(`${m('(u_n)')} <b>bị chặn trên</b> nếu có ${m('M')}: ${m('u_n \\le M')}; <b>bị chặn dưới</b> nếu có ${m('m')}: ${m('u_n \\ge m')} với mọi ${m('n')}. Bị chặn cả trên và dưới thì gọi là <b>bị chặn</b>.`)},

  {kind:'method', tag:'Dạng 1', title:'Tính các số hạng của dãy số',
   steps:[`Cho bằng công thức: thay ${m('n = 1, 2, 3, \\ldots')} vào ${m('u_n')}.`, `Cho bằng truy hồi: tính lần lượt ${m('u_2')} từ ${m('u_1')}, rồi ${m('u_3')} từ ${m('u_2')}, …`]},

  {kind:'vd', tag:'Ví dụ 1 · Dạng 1', label:'Ví dụ 1', de:`Cho dãy số ${m('u_n = \\dfrac{2n - 1}{n + 1}')}. Tính ${m('u_1, u_2, u_3')} và ${m('u_5')}.`,
   sol:[`${m('u_1 = \\dfrac{1}{2}')}; &nbsp; ${m('u_2 = \\dfrac{3}{3} = 1')}; &nbsp; ${m('u_3 = \\dfrac{5}{4}')}.`, `${m('u_5 = \\dfrac{9}{6} = \\dfrac{3}{2}')}.`]},

  {kind:'vd', tag:'Ví dụ 2 · Dạng 1', label:'Ví dụ 2', de:`Cho dãy số ${m('u_1 = 2,\\ u_{n+1} = 2u_n - 1')}. Tính năm số hạng đầu.`,
   sol:[`${m('u_2 = 2\\cdot 2 - 1 = 3')}; &nbsp; ${m('u_3 = 2\\cdot 3 - 1 = 5')}.`, `${m('u_4 = 2\\cdot 5 - 1 = 9')}; &nbsp; ${m('u_5 = 2\\cdot 9 - 1 = 17')}.`], ans:`${tb('2;\\ 3;\\ 5;\\ 9;\\ 17')}.`},

  {kind:'method', tag:'Dạng 2', title:'Dự đoán số hạng tổng quát',
   steps:[`Viết vài số hạng đầu cạnh chỉ số ${m('n')} tương ứng.`, `Tìm quy luật liên hệ giữa ${m('u_n')} và ${m('n')} (bình phương, tử – mẫu, …).`, `Thử lại với các số hạng đã cho.`]},

  {kind:'vd', tag:'Ví dụ 3 · Dạng 2', label:'Ví dụ 3', de:`Dự đoán số hạng tổng quát: a) ${m('1, 4, 9, 16, \\ldots')}; &nbsp; b) ${m('\\dfrac{1}{2}, \\dfrac{2}{3}, \\dfrac{3}{4}, \\dfrac{4}{5}, \\ldots')}`,
   sol:[`a) ${m('u_1 = 1^2,\\ u_2 = 2^2,\\ u_3 = 3^2,\\ u_4 = 4^2')} ⇒ ${m('u_n = n^2')}.`, `b) Tử là ${m('n')}, mẫu là ${m('n + 1')} ⇒ ${m('u_n = \\dfrac{n}{n + 1}')}.`]},

  {kind:'method', tag:'Dạng 3', title:'Xét tính tăng, giảm',
   steps:[`Tính hiệu ${m('u_{n+1} - u_n')} và rút gọn.`, `Hiệu ${m('\\gt 0')} với mọi ${m('n')} ⇒ dãy tăng; hiệu ${m('\\lt 0')} ⇒ dãy giảm.`, `(Nếu ${m('u_n \\gt 0')} có thể so sánh thương ${m('\\dfrac{u_{n+1}}{u_n}')} với 1.)`]},

  {kind:'vd', tag:'Ví dụ 4 · Dạng 3', label:'Ví dụ 4', de:`Xét tính tăng, giảm của dãy số ${m('u_n = 3n - 2')}.`,
   sol:[`${m('u_{n+1} - u_n = [3(n + 1) - 2] - (3n - 2) = 3')}.`, `${m('3 \\gt 0')} với mọi ${m('n')}.`], ans:`Dãy số ${tb('tăng')}.`},

  {kind:'vd', tag:'Ví dụ 5 · Dạng 3', label:'Ví dụ 5', de:`Xét tính tăng, giảm của dãy số ${m('u_n = \\dfrac{n + 2}{n + 1}')}.`,
   sol:[`Viết ${m('u_n = 1 + \\dfrac{1}{n + 1}')}.`, `${m('u_{n+1} - u_n = \\dfrac{1}{n + 2} - \\dfrac{1}{n + 1} = \\dfrac{-1}{(n + 1)(n + 2)}')}.`, `Hiệu này ${m('\\lt 0')} với mọi ${m('n \\in \\mathbb{N}^*')}.`], ans:`Dãy số ${tb('giảm')}.`},

  {kind:'method', tag:'Dạng 4', title:'Xét tính bị chặn',
   steps:[`Biến đổi ${m('u_n')} về dạng dễ đánh giá (tách phần nguyên, …).`, `Tìm số ${m('m, M')} sao cho ${m('m \\le u_n \\le M')} với mọi ${m('n')}.`, `Với dãy giảm: ${m('u_n \\le u_1')}; với dãy tăng: ${m('u_n \\ge u_1')}.`]},

  {kind:'vd', tag:'Ví dụ 6 · Dạng 4', label:'Ví dụ 6', de:`Chứng minh dãy số ${m('u_n = \\dfrac{n + 2}{n + 1}')} bị chặn.`,
   sol:[`${m('u_n = 1 + \\dfrac{1}{n + 1} \\gt 1')} ⇒ bị chặn dưới bởi 1.`, `Dãy giảm (Ví dụ 5) nên ${m('u_n \\le u_1 = \\dfrac{3}{2}')} ⇒ bị chặn trên.`], ans:`${tb('1 \\lt u_n \\le \\tfrac{3}{2}')}: dãy số bị chặn.`},

  {kind:'lt', tag:'Luyện tập', label:'Bài 1', de:`Cho ${m('u_n = n^2 - 1')}. Tính ${m('u_4')} và xét tính tăng, giảm.`,
   sol:[`${m('u_4 = 16 - 1 = 15')}.`, `${m('u_{n+1} - u_n = (n + 1)^2 - n^2 = 2n + 1 \\gt 0')} ⇒ dãy tăng.`]},
  {kind:'lt', tag:'Luyện tập', label:'Bài 2', de:`Xét tính tăng, giảm và bị chặn của dãy ${m('u_n = \\dfrac{1}{n}')}.`,
   sol:[`${m('u_{n+1} - u_n = \\dfrac{1}{n + 1} - \\dfrac{1}{n} = \\dfrac{-1}{n(n + 1)} \\lt 0')} ⇒ dãy giảm.`, `${m('0 \\lt u_n \\le 1')} ⇒ dãy bị chặn.`]},

  {kind:'sum', tag:'Tổng kết', title:'Ghi nhớ',
   body:`<ul><li>Dãy số cho bằng công thức, truy hồi hoặc mô tả.</li><li>Tăng/giảm: xét dấu ${m('u_{n+1} - u_n')}.</li><li>Bị chặn: tìm ${m('m \\le u_n \\le M')} với mọi ${m('n')}.</li></ul>` + HOME('Bài 5')},
]},

/* ---------------- BÀI 6 ---------------- */
{ id:'bai-6', name:'Bài 6. Cấp số cộng', desc:'Nhận biết; công sai; số hạng tổng quát; tổng n số hạng đầu; bài toán thực tế.', slides:[
  TITLE('Bài 6. Cấp số cộng', ['Nhận biết cấp số cộng và công sai.', 'Tìm số hạng tổng quát và tính tổng n số hạng đầu.', 'Giải bài toán thực tế gắn với cấp số cộng.']),

  {kind:'kt', tag:'Kiến thức trọng tâm 1', title:'Định nghĩa cấp số cộng',
   body: box(`${m('(u_n)')} là cấp số cộng ⇔ ${m('u_{n+1} = u_n + d')} với mọi ${m('n \\ge 1')}. Số ${m('d')} gọi là <b>công sai</b>.`) +
     S(`Công sai: ${m('d = u_{n+1} - u_n')} (không đổi).`) +
     S(`Tính chất: ${m('u_k = \\dfrac{u_{k-1} + u_{k+1}}{2}')} ${m('(k \\ge 2)')} — mỗi số hạng (trừ số hạng đầu, cuối) là trung bình cộng hai số hạng kề nó.`)},

  {kind:'kt', tag:'Kiến thức trọng tâm 2', title:'Số hạng tổng quát',
   body: box(d('u_n = u_1 + (n - 1)d\\qquad (n \\ge 2)')) + note(`Là ${m('(n - 1)d')}, không phải ${m('nd')}: từ ${m('u_1')} đến ${m('u_n')} có ${m('n - 1')} bước.`)},

  {kind:'kt', tag:'Kiến thức trọng tâm 3', title:'Tổng n số hạng đầu',
   body: box(d('S_n = u_1 + u_2 + \\cdots + u_n = \\dfrac{n(u_1 + u_n)}{2} = \\dfrac{n\\,[2u_1 + (n - 1)d]}{2}')) +
     S('Dùng công thức thứ nhất khi đã biết số hạng cuối; công thức thứ hai khi biết số hạng đầu và công sai.')},

  {kind:'method', tag:'Dạng 1', title:'Nhận biết cấp số cộng',
   steps:[`Tính ${m('u_{n+1} - u_n')}.`, `Nếu hiệu là <b>hằng số</b> ${m('d')} (không chứa ${m('n')}) thì dãy là cấp số cộng với công sai ${m('d')}.`, `Nếu hiệu còn chứa ${m('n')} thì không phải cấp số cộng.`]},

  {kind:'vd', tag:'Ví dụ 1 · Dạng 1', label:'Ví dụ 1', de:`Dãy số ${m('u_n = 5 - 3n')} có phải cấp số cộng không? Tìm ${m('u_1')} và công sai.`,
   sol:[`${m('u_{n+1} - u_n = [5 - 3(n + 1)] - (5 - 3n) = -3')} (hằng số).`, `${m('u_1 = 5 - 3 = 2')}.`], ans:`Là cấp số cộng với ${tb('u_1 = 2,\\ d = -3')}.`},

  {kind:'method', tag:'Dạng 2', title:'Tìm số hạng, số hạng tổng quát',
   steps:[`Đưa mọi dữ kiện về ${m('u_1')} và ${m('d')}: ${m('u_k = u_1 + (k - 1)d')}.`, `Giải hệ tìm ${m('u_1, d')}.`, `Thay vào ${m('u_n = u_1 + (n - 1)d')}.`]},

  {kind:'vd', tag:'Ví dụ 2 · Dạng 2', label:'Ví dụ 2', de:`Cấp số cộng có ${m('u_1 = 3,\\ d = 4')}. Tìm số hạng tổng quát và ${m('u_{20}')}.`,
   sol:[`${m('u_n = 3 + (n - 1)\\cdot 4 = 4n - 1')}.`, `${m('u_{20} = 4\\cdot 20 - 1')}.`], ans:`${tb('u_n = 4n - 1,\\ u_{20} = 79')}.`},

  {kind:'vd', tag:'Ví dụ 3 · Dạng 2', label:'Ví dụ 3', de:`Cấp số cộng có ${m('u_3 = 7')} và ${m('u_8 = 22')}. Tìm ${m('u_1, d')} và số hạng tổng quát.`,
   sol:[`Ta có hệ ${m('\\begin{cases} u_1 + 2d = 7 \\\\ u_1 + 7d = 22 \\end{cases}')}.`,
     `Trừ vế: ${m('5d = 15 \\Rightarrow d = 3')}, suy ra ${m('u_1 = 1')}.`, `${m('u_n = 1 + (n - 1)\\cdot 3')}.`], ans:`${tb('u_n = 3n - 2')}.`},

  {kind:'method', tag:'Dạng 3', title:'Tính tổng n số hạng đầu',
   steps:[`Xác định ${m('u_1')}, ${m('d')} (hoặc ${m('u_n')}) và <b>số số hạng</b> ${m('n')}.`, `Số số hạng từ ${m('u_1')} đến ${m('u_n')}: ${m('n = \\dfrac{u_n - u_1}{d} + 1')}.`, `Áp dụng công thức ${m('S_n')}.`]},

  {kind:'vd', tag:'Ví dụ 4 · Dạng 3', label:'Ví dụ 4', de:`Cấp số cộng có ${m('u_1 = 2,\\ d = 3')}. Tính ${m('S_{20}')}.`,
   sol:[`${m('S_{20} = \\dfrac{20\\,[2\\cdot 2 + 19\\cdot 3]}{2} = 10\\cdot 61')}.`], ans:`${tb('S_{20} = 610')}.`},

  {kind:'vd', tag:'Ví dụ 5 · Dạng 3', label:'Ví dụ 5', de:`Tính tổng ${m('T = 1 + 3 + 5 + \\cdots + 99')}.`,
   sol:[`Cấp số cộng ${m('u_1 = 1,\\ d = 2,\\ u_n = 99')}.`, `Số số hạng: ${m('n = \\dfrac{99 - 1}{2} + 1 = 50')}.`, `${m('T = \\dfrac{50(1 + 99)}{2}')}.`], ans:`${tb('T = 2500')}.`},

  {kind:'method', tag:'Dạng 4', title:'Bài toán thực tế',
   steps:[`Nhận ra đại lượng tăng (giảm) <b>đều</b> một lượng không đổi ⇒ cấp số cộng.`, `Xác định ${m('u_1')}, ${m('d')}, ${m('n')} theo ngữ cảnh.`, `Tính ${m('u_n')} hoặc ${m('S_n')} và trả lời bằng lời.`]},

  {kind:'vd', tag:'Ví dụ 6 · Dạng 4', label:'Ví dụ 6', de:`Một hội trường có 20 hàng ghế. Hàng đầu có 15 ghế, mỗi hàng sau hơn hàng trước 2 ghế. Hỏi hàng cuối có bao nhiêu ghế và cả hội trường có bao nhiêu ghế?`,
   sol:[`Số ghế các hàng lập cấp số cộng ${m('u_1 = 15,\\ d = 2,\\ n = 20')}.`, `Hàng cuối: ${m('u_{20} = 15 + 19\\cdot 2 = 53')} ghế.`, `Tổng: ${m('S_{20} = \\dfrac{20(15 + 53)}{2} = 680')}.`], ans:`Hàng cuối ${tb('53')} ghế; cả hội trường ${tb('680')} ghế.`},

  {kind:'lt', tag:'Luyện tập', label:'Bài 1', de:`Tìm ${m('x')} để ba số ${m('x,\\ 5,\\ 11')} theo thứ tự lập thành cấp số cộng.`,
   sol:[`${m('5 = \\dfrac{x + 11}{2} \\Rightarrow x + 11 = 10')}.`], ans:`${tb('x = -1')}.`},
  {kind:'lt', tag:'Luyện tập', label:'Bài 2', de:`Cấp số cộng có ${m('u_1 = -5,\\ d = 2')}. Tính ${m('u_{10}')} và ${m('S_{10}')}.`,
   sol:[`${m('u_{10} = -5 + 9\\cdot 2 = 13')}.`, `${m('S_{10} = \\dfrac{10(-5 + 13)}{2} = 40')}.`]},

  {kind:'sum', tag:'Tổng kết', title:'Ghi nhớ',
   body:`<ul><li>${m('u_{n+1} = u_n + d')}; &nbsp; ${m('u_n = u_1 + (n - 1)d')}.</li><li>${m('S_n = \\dfrac{n(u_1 + u_n)}{2} = \\dfrac{n\\,[2u_1 + (n - 1)d]}{2}')}.</li><li>Ba số ${m('a, b, c')} lập cấp số cộng ⇔ ${m('a + c = 2b')}.</li></ul>` + HOME('Bài 6')},
]},

/* ---------------- BÀI 7 ---------------- */
{ id:'bai-7', name:'Bài 7. Cấp số nhân', desc:'Nhận biết; công bội; số hạng tổng quát; tổng n số hạng đầu; bài toán thực tế.', slides:[
  TITLE('Bài 7. Cấp số nhân', ['Nhận biết cấp số nhân và công bội.', 'Tìm số hạng tổng quát và tính tổng n số hạng đầu.', 'Giải bài toán thực tế: tăng trưởng, lãi kép.']),

  {kind:'kt', tag:'Kiến thức trọng tâm 1', title:'Định nghĩa cấp số nhân',
   body: box(`${m('(u_n)')} là cấp số nhân ⇔ ${m('u_{n+1} = u_n\\cdot q')} với mọi ${m('n \\ge 1')}. Số ${m('q')} gọi là <b>công bội</b>.`) +
     S(`Nếu ${m('u_n \\ne 0')}: ${m('q = \\dfrac{u_{n+1}}{u_n}')} (không đổi).`) +
     S(`Tính chất: ${m('u_k^2 = u_{k-1}\\cdot u_{k+1}')} ${m('(k \\ge 2)')}.`)},

  {kind:'kt', tag:'Kiến thức trọng tâm 2', title:'Số hạng tổng quát',
   body: box(d('u_n = u_1\\cdot q^{\\,n-1}\\qquad (n \\ge 2)')) + note(`Số mũ là ${m('n - 1')}. Với ${m('q \\lt 0')}, các số hạng đổi dấu xen kẽ.`)},

  {kind:'kt', tag:'Kiến thức trọng tâm 3', title:'Tổng n số hạng đầu',
   body: box(d('S_n = u_1 + u_2 + \\cdots + u_n = \\dfrac{u_1(1 - q^n)}{1 - q}\\qquad (q \\ne 1)')) + S(`Khi ${m('q = 1')}: ${m('S_n = n\\,u_1')}.`)},

  {kind:'method', tag:'Dạng 1', title:'Nhận biết cấp số nhân',
   steps:[`Tính thương ${m('\\dfrac{u_{n+1}}{u_n}')} (khi ${m('u_n \\ne 0')}).`, `Thương là hằng số ${m('q')} ⇒ cấp số nhân công bội ${m('q')}.`]},

  {kind:'vd', tag:'Ví dụ 1 · Dạng 1', label:'Ví dụ 1', de:`Dãy số ${m('u_n = 3\\cdot 2^n')} có phải cấp số nhân không? Tìm ${m('u_1')} và công bội.`,
   sol:[`${m('\\dfrac{u_{n+1}}{u_n} = \\dfrac{3\\cdot 2^{n+1}}{3\\cdot 2^n} = 2')} (hằng số).`, `${m('u_1 = 3\\cdot 2 = 6')}.`], ans:`Là cấp số nhân với ${tb('u_1 = 6,\\ q = 2')}.`},

  {kind:'method', tag:'Dạng 2', title:'Tìm số hạng, số hạng tổng quát',
   steps:[`Viết dữ kiện theo ${m('u_1')} và ${m('q')}: ${m('u_k = u_1 q^{k-1}')}.`, `Chia vế theo vế để khử ${m('u_1')}, tìm ${m('q')}.`, `Suy ra ${m('u_1')} và ${m('u_n')}.`]},

  {kind:'vd', tag:'Ví dụ 2 · Dạng 2', label:'Ví dụ 2', de:`Cấp số nhân có ${m('u_1 = 2,\\ q = 3')}. Tìm số hạng tổng quát và ${m('u_5')}.`,
   sol:[`${m('u_n = 2\\cdot 3^{n-1}')}.`, `${m('u_5 = 2\\cdot 3^4 = 2\\cdot 81')}.`], ans:`${tb('u_5 = 162')}.`},

  {kind:'vd', tag:'Ví dụ 3 · Dạng 2', label:'Ví dụ 3', de:`Cấp số nhân có ${m('u_2 = 6')} và ${m('u_5 = 48')}. Tìm ${m('u_1')} và ${m('q')}.`,
   sol:[`${m('u_1 q = 6')} và ${m('u_1 q^4 = 48')}.`, `Chia vế theo vế: ${m('q^3 = 8 \\Rightarrow q = 2')}.`, `${m('u_1 = \\dfrac{6}{2} = 3')}.`], ans:`${tb('u_1 = 3,\\ q = 2')}.`},

  {kind:'method', tag:'Dạng 3', title:'Tính tổng n số hạng đầu',
   steps:[`Xác định ${m('u_1')}, ${m('q')} và số số hạng ${m('n')} (đếm cẩn thận số mũ).`, `Áp dụng ${m('S_n = \\dfrac{u_1(1 - q^n)}{1 - q}')}.`]},

  {kind:'vd', tag:'Ví dụ 4 · Dạng 3', label:'Ví dụ 4', de:`Cấp số nhân có ${m('u_1 = 1,\\ q = 2')}. Tính ${m('S_{10}')}.`,
   sol:[`${m('S_{10} = \\dfrac{1\\cdot(1 - 2^{10})}{1 - 2} = 2^{10} - 1')}.`], ans:`${tb('S_{10} = 1023')}.`},

  {kind:'vd', tag:'Ví dụ 5 · Dạng 3', label:'Ví dụ 5', de:`Tính tổng ${m('T = 1 + 3 + 9 + \\cdots + 3^6')}.`,
   sol:[`Cấp số nhân ${m('u_1 = 1,\\ q = 3')}; các số mũ từ 0 đến 6 nên có ${m('n = 7')} số hạng.`, `${m('T = \\dfrac{1 - 3^7}{1 - 3} = \\dfrac{3^7 - 1}{2} = \\dfrac{2186}{2}')}.`], ans:`${tb('T = 1093')}.`},

  {kind:'method', tag:'Dạng 4', title:'Bài toán thực tế',
   steps:[`Đại lượng được <b>nhân</b> với cùng một số sau mỗi giai đoạn ⇒ cấp số nhân.`, `Tăng ${m('r\\%')} mỗi kì: ${m('q = 1 + r\\%')}; sau ${m('n')} kì: ${m('A_n = A_0(1 + r)^n')}.`, `Chú ý đếm đúng số lần nhân.`]},

  {kind:'vd', tag:'Ví dụ 6 · Dạng 4', label:'Ví dụ 6', de:`Một tế bào vi khuẩn cứ 20 phút phân đôi một lần. Từ 1 tế bào, sau 3 giờ có bao nhiêu tế bào?`,
   sol:[`3 giờ = 180 phút = 9 lần phân đôi.`, `Mỗi lần số tế bào nhân 2 ⇒ sau 9 lần: ${m('1\\cdot 2^9')}.`], ans:`${tb('512')} tế bào.`},

  {kind:'lt', tag:'Luyện tập', label:'Bài 1', de:`Tìm ${m('x')} để ba số ${m('2,\\ x,\\ 18')} theo thứ tự lập thành cấp số nhân.`,
   sol:[`${m('x^2 = 2\\cdot 18 = 36')}.`], ans:`${tb('x = 6')} hoặc ${tb('x = -6')}.`},
  {kind:'lt', tag:'Luyện tập', label:'Bài 2', de:`Gửi 100 triệu đồng, lãi suất 6%/năm, lãi nhập gốc mỗi năm. Sau 3 năm được bao nhiêu tiền (làm tròn đến hàng phần trăm triệu)?`,
   sol:[`Số tiền sau mỗi năm lập cấp số nhân công bội ${m('q = 1{,}06')}.`, `Sau 3 năm: ${m('100\\cdot 1{,}06^3 \\approx 119{,}10')} (triệu đồng).`]},

  {kind:'sum', tag:'Tổng kết', title:'Ghi nhớ',
   body:`<ul><li>${m('u_{n+1} = u_n q')}; &nbsp; ${m('u_n = u_1 q^{n-1}')}.</li><li>${m('S_n = \\dfrac{u_1(1 - q^n)}{1 - q}\\ (q \\ne 1)')}.</li><li>Ba số ${m('a, b, c')} lập cấp số nhân ⇔ ${m('b^2 = ac')}.</li></ul>` + HOME('Bài 7')},
]},

/* ---------------- ÔN TẬP ---------------- */
{ id:'on-tap-c2', name:'Ôn tập chương II', desc:'Bảng so sánh cấp số cộng – cấp số nhân; ví dụ tổng hợp.', slides:[
  {kind:'title', tag:'Toán 11 · Kết nối tri thức', title:'Ôn tập chương II', sub:'Dãy số. Cấp số cộng và cấp số nhân', points:['Hệ thống công thức cấp số cộng, cấp số nhân.', 'Vận dụng tìm số hạng, tính tổng, giải bài toán thực tế.']},
  {kind:'kt', tag:'Hệ thống kiến thức', title:'Cấp số cộng và cấp số nhân', body:CMP},
  {kind:'vd', tag:'Ví dụ tổng hợp', label:'Ví dụ 1', de:`Cấp số cộng có ${m('u_5 = 9')} và ${m('S_5 = 25')}. Tìm ${m('u_1')} và công sai ${m('d')}.`,
   sol:[`${m('S_5 = \\dfrac{5(u_1 + u_5)}{2} = 25 \\Rightarrow u_1 + 9 = 10 \\Rightarrow u_1 = 1')}.`, `${m('u_5 = u_1 + 4d \\Rightarrow 9 = 1 + 4d')}.`], ans:`${tb('u_1 = 1,\\ d = 2')}.`},
  {kind:'vd', tag:'Ví dụ tổng hợp', label:'Ví dụ 2', de:`Cấp số nhân có ${m('u_1 = 3')} và ${m('u_4 = 24')}. Tính ${m('S_6')}.`,
   sol:[`${m('u_4 = 3q^3 = 24 \\Rightarrow q^3 = 8 \\Rightarrow q = 2')}.`, `${m('S_6 = \\dfrac{3(1 - 2^6)}{1 - 2} = 3\\cdot 63')}.`], ans:`${tb('S_6 = 189')}.`},
  {kind:'lt', tag:'Luyện tập', label:'Bài 1', de:`Dãy số ${m('u_n = 2n + 1')} có phải cấp số cộng không? Tính ${m('S_{10}')}.`,
   sol:[`${m('u_{n+1} - u_n = 2')} ⇒ cấp số cộng, ${m('u_1 = 3,\\ d = 2')}.`, `${m('u_{10} = 21,\\ S_{10} = \\dfrac{10(3 + 21)}{2} = 120')}.`]},
  {kind:'lt', tag:'Luyện tập', label:'Bài 2', de:`Một cây giống cao 20 cm; mỗi tuần chiều cao tăng thêm 10% so với tuần trước. Sau 5 tuần cây cao khoảng bao nhiêu? (làm tròn đến hàng phần mười)`,
   sol:[`Chiều cao sau mỗi tuần lập cấp số nhân công bội ${m('1{,}1')}.`, `Sau 5 tuần: ${m('20\\cdot 1{,}1^5 \\approx 32{,}2')} (cm).`]},
  {kind:'sum', tag:'Tổng kết', title:'Chuẩn bị kiểm tra',
   body:`<ul><li>Cộng đều ⇒ cấp số cộng; nhân đều ⇒ cấp số nhân.</li><li>Đưa mọi dữ kiện về ${m('u_1')} và ${m('d')} (hoặc ${m('q')}).</li><li>Đếm đúng số số hạng ${m('n')} trước khi tính tổng.</li></ul>` + box('Luyện thêm: web <b>Học mà chơi</b> – Toán 11, Ôn tập chương II (3 mức độ).')},
]},
]});
})();
