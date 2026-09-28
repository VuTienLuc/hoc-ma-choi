/* =====================================================================
   BÀI GIẢNG LỚP 11 – Toán, Kết nối tri thức (giáo viên trình chiếu)
   Chương I (Ôn tập chương) · Chương II. Dãy số. Cấp số cộng và cấp số nhân (Bài 5 – Bài 7, Ôn tập)
   Cấu trúc trang chiếu: xem giao-vien/bai-giang/lop10.js và CLAUDE.md.
   ===================================================================== */
/* =====================================================================
   CHƯƠNG I. HÀM SỐ LƯỢNG GIÁC VÀ PHƯƠNG TRÌNH LƯỢNG GIÁC – Ôn tập chương
   Hệ thống kiến thức (4 trang, có đường tròn lượng giác) → 5 dạng bài, mỗi dạng
   có phương pháp và ví dụ giải từng bước → luyện tập → ghi nhớ, sai lầm thường gặp.
   ===================================================================== */
(() => {
const m = tm, d = td;
const box = h => `<div class="lk-box">${h}</div>`, note = h => `<div class="lk-note">⚠️ ${h}</div>`;
const S = t => `<p>${t}</p>`;
const f = (a, b) => `\\dfrac{${a}}{${b}}`;
const K = '(k \\in \\mathbb{Z})';
const c30 = Math.sqrt(3) / 2;
// Đường tròn lượng giác: trục Ox, Oy; P = [[x, y, nhãn, hướng nhãn]]; extra = các tuỳ chọn khác của circleSVG
const UC = (P, extra = {}) => circleSVG({C:[{x:0, y:0, r:1}], L:[[0, 0, 1, 0], [0, 0, 0, 1]], P:[[0, 0, 'O', 225], ...P], box:[-1.15, -1.15, 1.15, 1.15], ...extra});

Lecture.add({ grade:'lop11', gradeName:'Toán 11', chapter:'Chương I. Hàm số lượng giác và phương trình lượng giác', lessons:[

{ id:'on-tap-c1', name:'Ôn tập chương I', desc:'Hệ thống giá trị lượng giác, công thức, hàm số và phương trình lượng giác; 5 dạng bài có ví dụ giải từng bước; bài toán thực tế.', slides:[
  {kind:'title', tag:'Toán 11 · Kết nối tri thức · Chương I', title:'Ôn tập chương I', sub:'Hàm số lượng giác và phương trình lượng giác',
   points:['Hệ thống: giá trị lượng giác, công thức lượng giác, hàm số lượng giác, phương trình lượng giác cơ bản.', 'Giải thành thạo 5 dạng bài trọng tâm của chương.', 'Vận dụng vào bài toán thực tế (chuyển động tuần hoàn, mực nước).']},

  /* ---------- HỆ THỐNG KIẾN THỨC ---------- */
  {kind:'kt', tag:'Hệ thống kiến thức 1', title:'Giá trị lượng giác của góc lượng giác',
   body: box(`${m('180^\\circ = \\pi')} rad; cung có số đo ${m('\\alpha')} (rad) trên đường tròn bán kính ${m('R')} dài ${m('l = R\\alpha')}.`) +
     S(`Điểm ${m('M')} trên đường tròn lượng giác biểu diễn góc ${m('\\alpha')}: ${m('M(\\cos\\alpha;\\ \\sin\\alpha)')}, ${m('\\tan\\alpha = \\dfrac{\\sin\\alpha}{\\cos\\alpha}')}, ${m('\\cot\\alpha = \\dfrac{\\cos\\alpha}{\\sin\\alpha}')}.`) +
     `<table class="lk-table"><tr><th>Góc phần tư</th><th>I</th><th>II</th><th>III</th><th>IV</th></tr>
      <tr><td>${m('\\sin\\alpha')}</td><td>+</td><td>+</td><td>−</td><td>−</td></tr><tr><td>${m('\\cos\\alpha')}</td><td>+</td><td>−</td><td>−</td><td>+</td></tr>
      <tr><td>${m('\\tan\\alpha,\\ \\cot\\alpha')}</td><td>+</td><td>−</td><td>+</td><td>−</td></tr></table>` +
     S(`${m('\\sin^2\\alpha + \\cos^2\\alpha = 1')}; ${m('1 + \\tan^2\\alpha = \\dfrac{1}{\\cos^2\\alpha}')}; ${m('\\tan\\alpha\\cdot\\cot\\alpha = 1')}.`),
   fig: UC([[.5, c30, 'M', 60], [.5, 0, 'cos α', -90], [0, c30, 'sin α', 180], [1, 0, 'A', -45]], {S:[[.5, c30, .5, 0, true], [.5, c30, 0, c30, true], [0, 0, .5, c30]]})},

  {kind:'kt', tag:'Hệ thống kiến thức 2', title:'Công thức lượng giác',
   body:`<table class="lk-table lk-left">
      <tr><th>Công thức cộng</th><td>${m('\\sin(a \\pm b) = \\sin a\\cos b \\pm \\cos a\\sin b')}<br>${m('\\cos(a \\pm b) = \\cos a\\cos b \\mp \\sin a\\sin b')}<br>${m('\\tan(a \\pm b) = \\dfrac{\\tan a \\pm \\tan b}{1 \\mp \\tan a\\tan b}')}</td></tr>
      <tr><th>Nhân đôi</th><td>${m('\\sin 2a = 2\\sin a\\cos a')}; ${m('\\cos 2a = \\cos^2 a - \\sin^2 a = 2\\cos^2 a - 1 = 1 - 2\\sin^2 a')}</td></tr>
      <tr><th>Hạ bậc</th><td>${m('\\cos^2 a = \\dfrac{1 + \\cos 2a}{2}')}; ${m('\\sin^2 a = \\dfrac{1 - \\cos 2a}{2}')}</td></tr>
      <tr><th>Tích → tổng</th><td>${m('\\cos a\\cos b = \\tfrac{1}{2}[\\cos(a - b) + \\cos(a + b)]')}; ${m('\\sin a\\sin b = \\tfrac{1}{2}[\\cos(a - b) - \\cos(a + b)]')}; ${m('\\sin a\\cos b = \\tfrac{1}{2}[\\sin(a - b) + \\sin(a + b)]')}</td></tr>
      <tr><th>Tổng → tích</th><td>${m('\\sin u + \\sin v = 2\\sin\\tfrac{u + v}{2}\\cos\\tfrac{u - v}{2}')}; ${m('\\cos u + \\cos v = 2\\cos\\tfrac{u + v}{2}\\cos\\tfrac{u - v}{2}')}; ${m('\\cos u - \\cos v = -2\\sin\\tfrac{u + v}{2}\\sin\\tfrac{u - v}{2}')}</td></tr></table>`},

  {kind:'kt', tag:'Hệ thống kiến thức 3', title:'Hàm số lượng giác',
   body:`<table class="lk-table"><tr><th>Hàm số</th><th>Tập xác định</th><th>Tập giá trị</th><th>Tính chẵn, lẻ</th><th>Chu kì</th></tr>
      <tr><td>${m('y = \\sin x')}</td><td>${m('\\mathbb{R}')}</td><td>${m('[-1;\\ 1]')}</td><td>lẻ</td><td>${m('2\\pi')}</td></tr>
      <tr><td>${m('y = \\cos x')}</td><td>${m('\\mathbb{R}')}</td><td>${m('[-1;\\ 1]')}</td><td>chẵn</td><td>${m('2\\pi')}</td></tr>
      <tr><td>${m('y = \\tan x')}</td><td>${m('x \\ne \\tfrac{\\pi}{2} + k\\pi')}</td><td>${m('\\mathbb{R}')}</td><td>lẻ</td><td>${m('\\pi')}</td></tr>
      <tr><td>${m('y = \\cot x')}</td><td>${m('x \\ne k\\pi')}</td><td>${m('\\mathbb{R}')}</td><td>lẻ</td><td>${m('\\pi')}</td></tr></table>` +
     box(`${m('y = \\sin(ax + b)')}, ${m('y = \\cos(ax + b)')} có chu kì ${m('\\dfrac{2\\pi}{|a|}')}; ${m('y = \\tan(ax + b)')}, ${m('y = \\cot(ax + b)')} có chu kì ${m('\\dfrac{\\pi}{|a|}')}.`)},

  {kind:'kt', tag:'Hệ thống kiến thức 4', title:'Phương trình lượng giác cơ bản',
   body:`<table class="lk-table lk-left">
      <tr><td>${m('\\sin x = \\sin\\alpha')}</td><td>${m('\\Leftrightarrow x = \\alpha + k2\\pi')} hoặc ${m('x = \\pi - \\alpha + k2\\pi')}</td></tr>
      <tr><td>${m('\\cos x = \\cos\\alpha')}</td><td>${m('\\Leftrightarrow x = \\pm\\alpha + k2\\pi')}</td></tr>
      <tr><td>${m('\\tan x = \\tan\\alpha')}</td><td>${m('\\Leftrightarrow x = \\alpha + k\\pi')}</td></tr>
      <tr><td>${m('\\cot x = \\cot\\alpha')}</td><td>${m('\\Leftrightarrow x = \\alpha + k\\pi')}</td></tr></table>` +
     S(`${m('\\sin x = m')}, ${m('\\cos x = m')} chỉ có nghiệm khi ${m('-1 \\le m \\le 1')}. Luôn ghi ${m(K)}.`) +
     note(`Ví dụ ${m('\\sin x = \\tfrac{1}{2}')}: đường thẳng ${m('y = \\tfrac{1}{2}')} cắt đường tròn tại 2 điểm ứng với ${m('\\tfrac{\\pi}{6}')} và ${m('\\tfrac{5\\pi}{6}')}.`),
   fig: UC([[c30, .5, 'π/6', 55], [-c30, .5, '5π/6', 125]], {S:[[-1.1, .5, 1.1, .5, true]]})},

  /* ---------- DẠNG 1 ---------- */
  {kind:'method', tag:'Dạng 1', title:'Tính giá trị lượng giác khi biết một giá trị',
   steps:[`Dùng ${m('\\sin^2\\alpha + \\cos^2\\alpha = 1')} (hoặc ${m('1 + \\tan^2\\alpha = \\tfrac{1}{\\cos^2\\alpha}')}) để tìm bình phương giá trị cần tìm.`,
     `<b>Xét góc phần tư</b> để chọn dấu (bảng dấu ở trang Hệ thống kiến thức 1).`,
     `Các giá trị còn lại: dùng ${m('\\tan\\alpha = \\tfrac{\\sin\\alpha}{\\cos\\alpha}')}, công thức nhân đôi, công thức cộng.`]},
  {kind:'vd', tag:'Ví dụ 1 · Dạng 1', label:'Ví dụ 1', de:`Cho ${m(`\\cos\\alpha = -${f(3,5)}`)} với ${m('\\dfrac{\\pi}{2} \\lt \\alpha \\lt \\pi')}. Tính ${m('\\sin\\alpha')}, ${m('\\tan\\alpha')}, ${m('\\sin 2\\alpha')} và ${m('\\cos\\left(\\alpha - \\dfrac{\\pi}{3}\\right)')}.`,
   sol:[`${m(`\\sin^2\\alpha = 1 - \\cos^2\\alpha = 1 - ${f(9,25)} = ${f(16,25)}`)} (hệ thức cơ bản).`,
     `${m('\\alpha')} thuộc góc phần tư II nên ${m('\\sin\\alpha \\gt 0')}: ${m(`\\sin\\alpha = ${f(4,5)}`)}.`,
     `${m(`\\tan\\alpha = \\dfrac{\\sin\\alpha}{\\cos\\alpha} = ${f(4,5)} : \\left(-${f(3,5)}\\right) = -${f(4,3)}`)}.`,
     `Công thức nhân đôi: ${m(`\\sin 2\\alpha = 2\\sin\\alpha\\cos\\alpha = 2\\cdot${f(4,5)}\\cdot\\left(-${f(3,5)}\\right) = -${f(24,25)}`)}.`,
     `Công thức cộng: ${m(`\\cos\\left(\\alpha - \\tfrac{\\pi}{3}\\right) = \\cos\\alpha\\cos\\tfrac{\\pi}{3} + \\sin\\alpha\\sin\\tfrac{\\pi}{3} = -${f(3,5)}\\cdot${f(1,2)} + ${f(4,5)}\\cdot${f('\\sqrt{3}',2)}`)}.`],
   ans:`${tb(`\\sin\\alpha = ${f(4,5)}`)}; ${tb(`\\tan\\alpha = -${f(4,3)}`)}; ${tb(`\\sin 2\\alpha = -${f(24,25)}`)}; ${tb(`\\cos\\left(\\alpha - \\tfrac{\\pi}{3}\\right) = ${f('4\\sqrt{3} - 3',10)}`)}.`},

  /* ---------- DẠNG 2 ---------- */
  {kind:'method', tag:'Dạng 2', title:'Tính giá trị biểu thức, chứng minh đẳng thức lượng giác',
   steps:[`Nhận dạng biểu thức: có tổng/hiệu hai góc? có góc gấp đôi? có tích hay tổng các sin, cos?`,
     `Chọn công thức phù hợp: <b>cộng</b>, <b>nhân đôi – hạ bậc</b>, <b>tích ↔ tổng</b>; góc lạ thì tách thành góc đặc biệt (${m('75^\\circ = 45^\\circ + 30^\\circ')}).`,
     `Chứng minh đẳng thức: biến đổi vế phức tạp về vế đơn giản, <b>mỗi bước ghi rõ công thức đã dùng</b>.`]},
  {kind:'vd', tag:'Ví dụ 2 · Dạng 2', label:'Ví dụ 2', de:`Không dùng máy tính, tính ${m('A = \\sin 75^\\circ + \\cos 75^\\circ')}.`,
   sol:[`Vì ${m('\\cos 75^\\circ = \\sin 15^\\circ')} (hai góc phụ nhau) nên ${m('A = \\sin 75^\\circ + \\sin 15^\\circ')}.`,
     `Tổng thành tích: ${m('A = 2\\sin\\dfrac{75^\\circ + 15^\\circ}{2}\\cos\\dfrac{75^\\circ - 15^\\circ}{2} = 2\\sin 45^\\circ\\cos 30^\\circ')}.`,
     `${m(`A = 2\\cdot${f('\\sqrt{2}',2)}\\cdot${f('\\sqrt{3}',2)}`)}.`], ans:`${tb(`A = ${f('\\sqrt{6}',2)}`)}.`},
  {kind:'vd', tag:'Ví dụ 3 · Dạng 2', label:'Ví dụ 3', de:`Chứng minh rằng ${m('\\cos^4 x - \\sin^4 x = \\cos 2x')} với mọi ${m('x')}.`,
   sol:[`Hằng đẳng thức ${m('a^2 - b^2 = (a - b)(a + b)')}: ${m('\\cos^4 x - \\sin^4 x = (\\cos^2 x - \\sin^2 x)(\\cos^2 x + \\sin^2 x)')}.`,
     `Hệ thức cơ bản: ${m('\\cos^2 x + \\sin^2 x = 1')}.`, `Công thức nhân đôi: ${m('\\cos^2 x - \\sin^2 x = \\cos 2x')}.`], ans:`Vế trái bằng ${tb('\\cos 2x')} – đẳng thức được chứng minh.`},

  /* ---------- DẠNG 3 ---------- */
  {kind:'method', tag:'Dạng 3', title:'Hàm số lượng giác: tập xác định, chẵn – lẻ, chu kì, GTLN – GTNN',
   steps:[`<b>Tập xác định:</b> ${m('\\tan u')} cần ${m('u \\ne \\tfrac{\\pi}{2} + k\\pi')}; ${m('\\cot u')} cần ${m('u \\ne k\\pi')}; mẫu khác 0; biểu thức dưới căn ${m('\\ge 0')}.`,
     `<b>Chẵn – lẻ:</b> tập xác định đối xứng, tính ${m('f(-x)')} rồi so sánh với ${m('f(x)')}.`,
     `<b>GTLN – GTNN:</b> biến đổi về <b>một</b> hàm ${m('\\sin')} hoặc ${m('\\cos')} (dùng nhân đôi, hạ bậc…), rồi dùng ${m('-1 \\le \\sin u, \\cos u \\le 1')}.`]},
  {kind:'vd', tag:'Ví dụ 4 · Dạng 3', label:'Ví dụ 4', de:`Tìm giá trị lớn nhất và giá trị nhỏ nhất của hàm số ${m('y = 5 - 4\\sin x\\cos x')}.`,
   sol:[`Công thức nhân đôi: ${m('4\\sin x\\cos x = 2\\cdot 2\\sin x\\cos x = 2\\sin 2x')}, nên ${m('y = 5 - 2\\sin 2x')}.`,
     `Vì ${m('-1 \\le \\sin 2x \\le 1')} nên ${m('-2 \\le -2\\sin 2x \\le 2')} (nhân với số âm thì đổi chiều).`,
     `Cộng 5: ${m('3 \\le y \\le 7')}.`,
     `${m('y = 7')} khi ${m('\\sin 2x = -1 \\Leftrightarrow x = -\\tfrac{\\pi}{4} + k\\pi')}; ${m('y = 3')} khi ${m('\\sin 2x = 1 \\Leftrightarrow x = \\tfrac{\\pi}{4} + k\\pi')}.`],
   ans:`GTLN ${tb('= 7')}, GTNN ${tb('= 3')}.`},
  {kind:'vd', tag:'Ví dụ 5 · Dạng 3', label:'Ví dụ 5', de:`Cho hàm số ${m('y = \\tan\\left(2x - \\dfrac{\\pi}{3}\\right)')}. Tìm tập xác định và chu kì của hàm số.`,
   sol:[`Hàm số xác định khi ${m('\\cos\\left(2x - \\tfrac{\\pi}{3}\\right) \\ne 0 \\Leftrightarrow 2x - \\tfrac{\\pi}{3} \\ne \\tfrac{\\pi}{2} + k\\pi')}.`,
     `${m('\\Leftrightarrow 2x \\ne \\tfrac{5\\pi}{6} + k\\pi \\Leftrightarrow x \\ne \\tfrac{5\\pi}{12} + k\\tfrac{\\pi}{2}')}.`,
     `Hàm ${m('\\tan(ax + b)')} có chu kì ${m('\\tfrac{\\pi}{|a|}')}, ở đây ${m('a = 2')}.`],
   ans:`${tb('D = \\mathbb{R}\\setminus\\left\\{\\tfrac{5\\pi}{12} + k\\tfrac{\\pi}{2} \\mid k \\in \\mathbb{Z}\\right\\}')}; chu kì ${tb('T = \\tfrac{\\pi}{2}')}.`},

  /* ---------- DẠNG 4 ---------- */
  {kind:'method', tag:'Dạng 4', title:'Giải phương trình lượng giác và đếm nghiệm trên một đoạn',
   steps:[`Đưa về dạng cơ bản: chuyển vế; viết số thành giá trị lượng giác của góc đặc biệt (${m('\\tfrac{\\sqrt{3}}{2} = \\sin\\tfrac{\\pi}{3}')}…).`,
     `Nếu có hai hàm khác nhau: dùng công thức (nhân đôi, ${m('\\cos v = \\sin(\\tfrac{\\pi}{2} - v)')}) hoặc <b>đặt nhân tử chung</b> để được tích bằng 0.`,
     `Viết công thức nghiệm, ghi ${m(K)}.`,
     `Đếm nghiệm trên đoạn: với từng họ nghiệm, tìm các số nguyên ${m('k')} thoả mãn (hoặc đánh dấu trên đường tròn lượng giác); <b>bỏ nghiệm trùng</b>.`]},
  {kind:'vd', tag:'Ví dụ 6 · Dạng 4', label:'Ví dụ 6', de:`Giải phương trình ${m('2\\sin\\left(x + \\dfrac{\\pi}{6}\\right) - \\sqrt{3} = 0')}.`,
   sol:[`Chuyển vế, chia 2: ${m('\\sin\\left(x + \\tfrac{\\pi}{6}\\right) = \\tfrac{\\sqrt{3}}{2} = \\sin\\tfrac{\\pi}{3}')}.`,
     `${m('x + \\tfrac{\\pi}{6} = \\tfrac{\\pi}{3} + k2\\pi')} hoặc ${m('x + \\tfrac{\\pi}{6} = \\pi - \\tfrac{\\pi}{3} + k2\\pi')}.`,
     `Chuyển ${m('\\tfrac{\\pi}{6}')} sang vế phải: ${m('x = \\tfrac{\\pi}{6} + k2\\pi')} hoặc ${m('x = \\tfrac{2\\pi}{3} - \\tfrac{\\pi}{6} + k2\\pi = \\tfrac{\\pi}{2} + k2\\pi')}.`],
   ans:`${tb('x = \\tfrac{\\pi}{6} + k2\\pi')}; ${tb('x = \\tfrac{\\pi}{2} + k2\\pi')} ${m(K)}.`},
  {kind:'vd', tag:'Ví dụ 7 · Dạng 4', label:'Ví dụ 7', de:`Giải phương trình ${m('\\sin 2x = \\cos x')} và tìm các nghiệm thuộc đoạn ${m('[0;\\ 2\\pi]')}.`,
   sol:[`Công thức nhân đôi: ${m('2\\sin x\\cos x - \\cos x = 0 \\Leftrightarrow \\cos x(2\\sin x - 1) = 0')}.`,
     `${m('\\cos x = 0 \\Leftrightarrow x = \\tfrac{\\pi}{2} + k\\pi')}.`,
     `${m('\\sin x = \\tfrac{1}{2} \\Leftrightarrow x = \\tfrac{\\pi}{6} + k2\\pi')} hoặc ${m('x = \\tfrac{5\\pi}{6} + k2\\pi')}.`,
     `Trên ${m('[0;\\ 2\\pi]')}: họ thứ nhất cho ${m('\\tfrac{\\pi}{2};\\ \\tfrac{3\\pi}{2}')}; họ thứ hai cho ${m('\\tfrac{\\pi}{6}')}; họ thứ ba cho ${m('\\tfrac{5\\pi}{6}')}.`],
   ans:`Nghiệm thuộc đoạn: ${tb('\\tfrac{\\pi}{6};\\ \\tfrac{\\pi}{2};\\ \\tfrac{5\\pi}{6};\\ \\tfrac{3\\pi}{2}')} (4 nghiệm).`},

  /* ---------- DẠNG 5 ---------- */
  {kind:'method', tag:'Dạng 5', title:`Bài toán thực tế: mô hình ${m('h(t) = A + B\\sin(\\omega t)')}`,
   steps:[`Giá trị lớn nhất, nhỏ nhất: dùng ${m('-1 \\le \\sin(\\omega t) \\le 1')} ⇒ ${m('A - |B| \\le h \\le A + |B|')}.`,
     `Thời điểm ${m('h(t) = c')}: giải phương trình ${m('\\sin(\\omega t) = \\tfrac{c - A}{B}')} theo ẩn ${m('t')}.`,
     `Chọn các giá trị ${m('t')} thuộc khoảng thời gian đề cho (thường ${m('t \\ge 0')}); trả lời bằng lời, có đơn vị.`]},
  {kind:'vd', tag:'Ví dụ 8 · Dạng 5', label:'Ví dụ 8', de:`Độ sâu (mét) của mực nước ở một cảng biển tại thời điểm ${m('t')} giờ (${m('0 \\le t \\le 24')}) là ${m('h(t) = 10 + 3\\sin\\dfrac{\\pi t}{6}')}. a) Tìm độ sâu lớn nhất, nhỏ nhất. b) Lần đầu tiên mực nước sâu ${m('11{,}5')} m là lúc mấy giờ? c) Trong ngày có mấy lần mực nước sâu nhất?`,
   sol:[`a) ${m('-1 \\le \\sin\\tfrac{\\pi t}{6} \\le 1 \\Rightarrow 7 \\le h(t) \\le 13')}.`,
     `b) ${m('10 + 3\\sin\\tfrac{\\pi t}{6} = 11{,}5 \\Leftrightarrow \\sin\\tfrac{\\pi t}{6} = \\tfrac{1}{2}')}.`,
     `${m('\\tfrac{\\pi t}{6} = \\tfrac{\\pi}{6} + k2\\pi')} hoặc ${m('\\tfrac{\\pi t}{6} = \\tfrac{5\\pi}{6} + k2\\pi')} ⇒ ${m('t = 1 + 12k')} hoặc ${m('t = 5 + 12k')}; nhỏ nhất ${m('t = 1')}.`,
     `c) Sâu nhất khi ${m('\\sin\\tfrac{\\pi t}{6} = 1 \\Leftrightarrow t = 3 + 12k')}; trong ${m('[0;\\ 24]')}: ${m('t = 3')} và ${m('t = 15')}.`],
   ans:`a) Lớn nhất ${tb('13')} m, nhỏ nhất ${tb('7')} m; b) lúc ${tb('1')} giờ; c) ${tb('2')} lần (3 giờ và 15 giờ).`},

  /* ---------- LUYỆN TẬP ---------- */
  {kind:'lt', tag:'Luyện tập', label:'Bài 1', de:`Cho ${m(`\\sin\\alpha = ${f(5,13)}`)} với ${m('\\dfrac{\\pi}{2} \\lt \\alpha \\lt \\pi')}. Tính ${m('\\cos\\alpha')}, ${m('\\tan\\alpha')} và ${m('\\cos 2\\alpha')}.`,
   sol:[`${m(`\\cos^2\\alpha = 1 - ${f(25,169)} = ${f(144,169)}`)}; góc phần tư II nên ${m(`\\cos\\alpha = -${f(12,13)}`)}.`, `${m(`\\tan\\alpha = ${f(5,13)} : \\left(-${f(12,13)}\\right) = -${f(5,12)}`)}.`, `${m(`\\cos 2\\alpha = 1 - 2\\sin^2\\alpha = 1 - ${f(50,169)} = ${f(119,169)}`)}.`]},
  {kind:'lt', tag:'Luyện tập', label:'Bài 2', de:`Tìm giá trị lớn nhất và giá trị nhỏ nhất của hàm số ${m('y = 3\\sin x + 4\\cos x - 1')}.`,
   sol:[`${m('r = \\sqrt{3^2 + 4^2} = 5')}; ${m('3\\sin x + 4\\cos x = 5\\sin(x + \\varphi)')} với ${m('\\cos\\varphi = \\tfrac{3}{5},\\ \\sin\\varphi = \\tfrac{4}{5}')}.`, `${m('-5 \\le 5\\sin(x + \\varphi) \\le 5 \\Rightarrow -6 \\le y \\le 4')}.`, `GTLN ${m('= 4')}, GTNN ${m('= -6')}.`]},
  {kind:'lt', tag:'Luyện tập', label:'Bài 3', de:`Phương trình ${m('\\cos 2x = \\cos x')} có bao nhiêu nghiệm thuộc đoạn ${m('[0;\\ 2\\pi]')}?`,
   sol:[`${m('2x = \\pm x + k2\\pi \\Rightarrow x = k2\\pi')} hoặc ${m('x = k\\tfrac{2\\pi}{3}')}; họ thứ nhất nằm trong họ thứ hai.`, `Trên ${m('[0;\\ 2\\pi]')}: ${m('0;\\ \\tfrac{2\\pi}{3};\\ \\tfrac{4\\pi}{3};\\ 2\\pi')}.`, `Có <b>4 nghiệm</b>.`]},
  {kind:'lt', tag:'Luyện tập', label:'Bài 4', de:`Xét tính chẵn, lẻ của hàm số ${m('y = \\sin x\\cos 2x')}.`,
   sol:[`Tập xác định ${m('\\mathbb{R}')} đối xứng.`, `${m('f(-x) = \\sin(-x)\\cos(-2x) = -\\sin x\\cos 2x = -f(x)')} (sin lẻ, cos chẵn).`, `Hàm số <b>lẻ</b>.`]},

  /* ---------- TỔNG KẾT ---------- */
  {kind:'sum', tag:'Tổng kết', title:'Ghi nhớ và sai lầm thường gặp',
   body:`<ul><li><b>Luôn xét góc phần tư</b> trước khi lấy dấu của ${m('\\sin, \\cos, \\tan')}.</li>
     <li>${m('\\sin x = m')}, ${m('\\cos x = m')} vô nghiệm khi ${m('|m| \\gt 1')}.</li>
     <li>Không chia hai vế cho biểu thức có thể bằng 0 (như ${m('\\cos x')}) – hãy <b>đặt nhân tử chung</b>.</li>
     <li>Nghiệm luôn kèm ${m(K)}; đếm nghiệm trên đoạn thì <b>bỏ nghiệm trùng</b>.</li>
     <li>Tìm GTLN – GTNN: đưa về <b>một</b> hàm ${m('\\sin')} hoặc ${m('\\cos')} rồi mới đánh giá.</li></ul>` +
     box('Về nhà: làm Bài tập cuối chương I trong SGK; luyện thêm trên web <b>Học mà chơi</b> – Toán 11, Ôn tập chương I (3 mức độ) và phiếu 🏋️ Luyện tập.')},
]},
]});
})();

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
