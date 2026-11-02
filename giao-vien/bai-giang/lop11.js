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

  {kind:'method', tag:'Trắc nghiệm', title:'20 câu trắc nghiệm củng cố',
   steps:[`Câu 1–6: <b>nhận biết</b>.`,`Câu 7–12: <b>thông hiểu</b>.`,`Câu 13–17: <b>vận dụng thực tế</b>.`,`Câu 18–20: <b>vận dụng cao</b>.`]},
  {kind:'lt', tn:true, tag:'Trắc nghiệm · Nhận biết', label:'Câu 1', de:`Dãy số ${m('(u_n)')} nào sau đây là cấp số cộng?<div style="display:grid;grid-template-columns:1fr 1fr;gap:.35em 1.4em;margin-top:.6em"><span><b>A.</b> ${m('u_n = 2^n')}</span><span><b>B.</b> ${m('u_n = 3n - 1')}</span><span><b>C.</b> ${m('u_n = n^2 + 1')}</span><span><b>D.</b> ${m('u_n = (-1)^n')}</span></div>`,
   sol:[`Với ${m('u_n = 3n - 1')}: ${m('u_{n+1} - u_n = 3')} (hằng số).`,`Các dãy còn lại có hiệu ${m('u_{n+1} - u_n')} phụ thuộc ${m('n')} hoặc đổi dấu.`], ans:`Đáp án <b>B</b>: ${m('u_n = 3n - 1')}.`},
  {kind:'lt', tn:true, tag:'Trắc nghiệm · Nhận biết', label:'Câu 2', de:`Cấp số cộng ${m('(u_n)')} có ${m('u_1 = -3,\\ u_2 = 1')}. Công sai ${m('d')} bằng<div style="display:grid;grid-template-columns:1fr 1fr;gap:.35em 1.4em;margin-top:.6em"><span><b>A.</b> ${m('-4')}</span><span><b>B.</b> ${m('-2')}</span><span><b>C.</b> ${m('2')}</span><span><b>D.</b> ${m('4')}</span></div>`,
   sol:[`${m('d = u_2 - u_1 = 1 - (-3) = 4')}.`], ans:`Đáp án <b>D</b>: ${m('4')}.`},
  {kind:'lt', tn:true, tag:'Trắc nghiệm · Nhận biết', label:'Câu 3', de:`Cấp số cộng ${m('(u_n)')} có ${m('u_1 = 5,\\ d = -2')}. Số hạng ${m('u_5')} bằng<div style="display:grid;grid-template-columns:1fr 1fr;gap:.35em 1.4em;margin-top:.6em"><span><b>A.</b> ${m('-3')}</span><span><b>B.</b> ${m('-5')}</span><span><b>C.</b> ${m('13')}</span><span><b>D.</b> ${m('-1')}</span></div>`,
   sol:[`${m('u_5 = u_1 + 4d = 5 + 4 \\cdot (-2) = -3')}.`,`Chú ý: từ ${m('u_1')} đến ${m('u_5')} có ${m('4')} bước, không phải ${m('5')}.`], ans:`Đáp án <b>A</b>: ${m('-3')}.`},
  {kind:'lt', tn:true, tag:'Trắc nghiệm · Nhận biết', label:'Câu 4', de:`Cấp số cộng ${m('(u_n)')} có số hạng đầu ${m('u_1')} và công sai ${m('d')}. Tổng ${m('n')} số hạng đầu là<div style="display:grid;grid-template-columns:1fr 1fr;gap:.35em 1.4em;margin-top:.6em"><span><b>A.</b> ${m('S_n = \\dfrac{n\\,[2u_1 + nd]}{2}')}</span><span><b>B.</b> ${m('S_n = \\dfrac{n\\,[u_1 + (n - 1)d]}{2}')}</span><span><b>C.</b> ${m('S_n = \\dfrac{n\\,[2u_1 + (n - 1)d]}{2}')}</span><span><b>D.</b> ${m('S_n = \\dfrac{n\\,[2u_1 + (n + 1)d]}{2}')}</span></div>`,
   sol:[`${m('S_n = \\dfrac{n(u_1 + u_n)}{2}')} với ${m('u_n = u_1 + (n - 1)d')} cho ${m('S_n = \\dfrac{n\\,[2u_1 + (n - 1)d]}{2}')}.`], ans:`Đáp án <b>C</b>: ${m('S_n = \\dfrac{n\\,[2u_1 + (n - 1)d]}{2}')}.`},
  {kind:'lt', tn:true, tag:'Trắc nghiệm · Nhận biết', label:'Câu 5', de:`Ba số ${m('a, b, c')} theo thứ tự lập thành cấp số cộng khi và chỉ khi<div style="display:grid;grid-template-columns:1fr 1fr;gap:.35em 1.4em;margin-top:.6em"><span><b>A.</b> ${m('a + c = 2b')}</span><span><b>B.</b> ${m('ac = b^2')}</span><span><b>C.</b> ${m('a + b = 2c')}</span><span><b>D.</b> ${m('b = a + c')}</span></div>`,
   sol:[`${m('b - a = c - b \\Leftrightarrow a + c = 2b')} (${m('b')} là trung bình cộng của ${m('a\\ \\text{và}\\ c')}).`], ans:`Đáp án <b>A</b>: ${m('a + c = 2b')}.`},
  {kind:'lt', tn:true, tag:'Trắc nghiệm · Nhận biết', label:'Câu 6', de:`Cấp số cộng ${m('(u_n)')} có ${m('u_1 = 7,\\ d = 3')}. Số hạng tổng quát là<div style="display:grid;grid-template-columns:1fr 1fr;gap:.35em 1.4em;margin-top:.6em"><span><b>A.</b> ${m('u_n = 3n + 7')}</span><span><b>B.</b> ${m('u_n = 7n - 4')}</span><span><b>C.</b> ${m('u_n = 3n - 4')}</span><span><b>D.</b> ${m('u_n = 3n + 4')}</span></div>`,
   sol:[`${m('u_n = u_1 + (n - 1)d = 7 + 3(n - 1) = 3n + 4')}.`], ans:`Đáp án <b>D</b>: ${m('u_n = 3n + 4')}.`},
  {kind:'lt', tn:true, tag:'Trắc nghiệm · Thông hiểu', label:'Câu 7', de:`Cấp số cộng ${m('(u_n)')} có ${m('u_2 = 5\\ \\text{và}\\ u_5 = 14')}. Số hạng đầu ${m('u_1')} bằng<div style="display:grid;grid-template-columns:1fr 1fr;gap:.35em 1.4em;margin-top:.6em"><span><b>A.</b> ${m('3')}</span><span><b>B.</b> ${m('1')}</span><span><b>C.</b> ${m('2')}</span><span><b>D.</b> ${m('4')}</span></div>`,
   sol:[`${m('u_5 - u_2 = 3d \\Rightarrow 14 - 5 = 3d \\Rightarrow d = 3')}.`,`${m('u_1 = u_2 - d = 5 - 3 = 2')}.`], ans:`Đáp án <b>C</b>: ${m('2')}.`},
  {kind:'lt', tn:true, tag:'Trắc nghiệm · Thông hiểu', label:'Câu 8', de:`Tìm ${m('x')} để ba số ${m('2,\\ x + 1,\\ 10')} theo thứ tự lập thành cấp số cộng.<div style="display:grid;grid-template-columns:1fr 1fr;gap:.35em 1.4em;margin-top:.6em"><span><b>A.</b> ${m('x = 6')}</span><span><b>B.</b> ${m('x = 5')}</span><span><b>C.</b> ${m('x = 4')}</span><span><b>D.</b> ${m('x = 11')}</span></div>`,
   sol:[`${m('2 + 10 = 2(x + 1) \\Rightarrow x + 1 = 6')}.`,`Vậy ${m('x = 5')} (đừng dừng ở ${m('x + 1 = 6')}).`], ans:`Đáp án <b>B</b>: ${m('x = 5')}.`},
  {kind:'lt', tn:true, tag:'Trắc nghiệm · Thông hiểu', label:'Câu 9', de:`Cấp số cộng ${m('(u_n)')} có ${m('u_1 = 4,\\ d = 3')}. Số ${m('100')} là số hạng thứ mấy?<div style="display:grid;grid-template-columns:1fr 1fr;gap:.35em 1.4em;margin-top:.6em"><span><b>A.</b> ${m('33')}</span><span><b>B.</b> ${m('32')}</span><span><b>C.</b> ${m('34')}</span><span><b>D.</b> ${m('25')}</span></div>`,
   sol:[`${m('100 = 4 + (n - 1) \\cdot 3 \\Rightarrow n - 1 = 32')}.`,`Vậy ${m('n = 33')}.`], ans:`Đáp án <b>A</b>: ${m('33')}.`},
  {kind:'lt', tn:true, tag:'Trắc nghiệm · Thông hiểu', label:'Câu 10', de:`Tổng ${m('S = 2 + 5 + 8 + \\cdots + 98')} bằng<div style="display:grid;grid-template-columns:1fr 1fr;gap:.35em 1.4em;margin-top:.6em"><span><b>A.</b> ${m('1617')}</span><span><b>B.</b> ${m('1700')}</span><span><b>C.</b> ${m('3300')}</span><span><b>D.</b> ${m('1650')}</span></div>`,
   sol:[`Cấp số cộng ${m('u_1 = 2,\\ d = 3,\\ u_n = 98')}: ${m('n = \\dfrac{98 - 2}{3} + 1 = 33')}.`,`${m('S = \\dfrac{33(2 + 98)}{2} = 1650')}.`], ans:`Đáp án <b>D</b>: ${m('1650')}.`},
  {kind:'lt', tn:true, tag:'Trắc nghiệm · Thông hiểu', label:'Câu 11', de:`Cấp số cộng có ${m('u_n = 2n + 1')}. Tổng ${m('10')} số hạng đầu bằng<div style="display:grid;grid-template-columns:1fr 1fr;gap:.35em 1.4em;margin-top:.6em"><span><b>A.</b> ${m('110')}</span><span><b>B.</b> ${m('120')}</span><span><b>C.</b> ${m('130')}</span><span><b>D.</b> ${m('240')}</span></div>`,
   sol:[`${m('u_1 = 3,\\ u_{10} = 21')}.`,`${m('S_{10} = \\dfrac{10(3 + 21)}{2} = 120')}.`], ans:`Đáp án <b>B</b>: ${m('120')}.`},
  {kind:'lt', tn:true, tag:'Trắc nghiệm · Thông hiểu', label:'Câu 12', de:`Cấp số cộng ${m('(u_n)')} có ${m('u_1 + u_5 = 10')}. Giá trị ${m('u_3')} bằng<div style="display:grid;grid-template-columns:1fr 1fr;gap:.35em 1.4em;margin-top:.6em"><span><b>A.</b> ${m('10')}</span><span><b>B.</b> ${m('2')}</span><span><b>C.</b> ${m('5')}</span><span><b>D.</b> ${m('20')}</span></div>`,
   sol:[`Tính chất: ${m('u_1 + u_5 = 2u_3')}.`,`Suy ra ${m('u_3 = \\dfrac{10}{2} = 5')}.`], ans:`Đáp án <b>C</b>: ${m('5')}.`},
  {kind:'lt', tn:true, tag:'Trắc nghiệm · Vận dụng', label:'Câu 13', de:`Một rạp chiếu phim có hàng ghế đầu ${m('18')} ghế, mỗi hàng sau hơn hàng liền trước ${m('2')} ghế. Hàng thứ ${m('12')} có bao nhiêu ghế?<div style="display:grid;grid-template-columns:1fr 1fr;gap:.35em 1.4em;margin-top:.6em"><span><b>A.</b> ${m('40')} ghế</span><span><b>B.</b> ${m('42')} ghế</span><span><b>C.</b> ${m('38')} ghế</span><span><b>D.</b> ${m('36')} ghế</span></div>`,
   sol:[`Số ghế các hàng lập cấp số cộng ${m('u_1 = 18,\\ d = 2')}.`,`${m('u_{12} = 18 + 11 \\cdot 2 = 40')}.`], ans:`Đáp án <b>A</b>: ${m('40')} ghế.`},
  {kind:'lt', tn:true, tag:'Trắc nghiệm · Vận dụng', label:'Câu 14', de:`Một nhân viên ký hợp đồng lao động: năm đầu nhận ${m('120')} triệu đồng, mỗi năm sau được tăng ${m('12')} triệu đồng so với năm trước. Tổng thu nhập sau ${m('5')} năm là bao nhiêu?<div style="display:grid;grid-template-columns:1fr 1fr;gap:.35em 1.4em;margin-top:.6em"><span><b>A.</b> ${m('750')} triệu đồng</span><span><b>B.</b> ${m('600')} triệu đồng</span><span><b>C.</b> ${m('840')} triệu đồng</span><span><b>D.</b> ${m('720')} triệu đồng</span></div>`,
   sol:[`Thu nhập từng năm lập cấp số cộng ${m('u_1 = 120,\\ d = 12')}.`,`${m('S_5 = \\dfrac{5\\,[2 \\cdot 120 + 4 \\cdot 12]}{2} = 720')} (triệu đồng).`], ans:`Đáp án <b>D</b>: ${m('720')} triệu đồng.`},
  {kind:'lt', tn:true, tag:'Trắc nghiệm · Vận dụng', label:'Câu 15', de:`Một người tập chạy bộ: tuần đầu chạy ${m('3')} km, mỗi tuần sau chạy nhiều hơn tuần trước ${m('1{,}5')} km. Tuần thứ ${m('10')} người đó chạy bao nhiêu km?<div style="display:grid;grid-template-columns:1fr 1fr;gap:.35em 1.4em;margin-top:.6em"><span><b>A.</b> ${m('15')} km</span><span><b>B.</b> ${m('16{,}5')} km</span><span><b>C.</b> ${m('18')} km</span><span><b>D.</b> ${m('13{,}5')} km</span></div>`,
   sol:[`${m('u_1 = 3,\\ d = 1{,}5')}.`,`${m('u_{10} = 3 + 9 \\cdot 1{,}5 = 16{,}5')} (km).`], ans:`Đáp án <b>B</b>: ${m('16{,}5')} km.`},
  {kind:'lt', tn:true, tag:'Trắc nghiệm · Vận dụng', label:'Câu 16', de:`Người ta xếp các hộp thành hình tam giác: hàng dưới cùng có ${m('15')} hộp, mỗi hàng phía trên ít hơn hàng liền dưới ${m('1')} hộp, hàng trên cùng có ${m('1')} hộp. Tổng số hộp là<div style="display:grid;grid-template-columns:1fr 1fr;gap:.35em 1.4em;margin-top:.6em"><span><b>A.</b> ${m('105')} hộp</span><span><b>B.</b> ${m('135')} hộp</span><span><b>C.</b> ${m('120')} hộp</span><span><b>D.</b> ${m('240')} hộp</span></div>`,
   sol:[`Số hộp mỗi hàng lập cấp số cộng ${m('u_1 = 1,\\ d = 1,\\ u_{15} = 15')}.`,`${m('S_{15} = \\dfrac{15(1 + 15)}{2} = 120')}.`], ans:`Đáp án <b>C</b>: ${m('120')} hộp.`},
  {kind:'lt', tn:true, tag:'Trắc nghiệm · Vận dụng', label:'Câu 17', de:`Giá khoan giếng: mét đầu tiên là ${m('80\\,000')} đồng, kể từ mét thứ hai giá mỗi mét tăng thêm ${m('5\\,000')} đồng so với mét liền trước. Chi phí khoan giếng sâu ${m('20')} m là<div style="display:grid;grid-template-columns:1fr 1fr;gap:.35em 1.4em;margin-top:.6em"><span><b>A.</b> ${m('2\\,600\\,000')} đồng</span><span><b>B.</b> ${m('2\\,550\\,000')} đồng</span><span><b>C.</b> ${m('1\\,750\\,000')} đồng</span><span><b>D.</b> ${m('3\\,100\\,000')} đồng</span></div>`,
   sol:[`Giá từng mét lập cấp số cộng ${m('u_1 = 80\\,000,\\ d = 5\\,000')}.`,`${m('S_{20} = \\dfrac{20\\,[2 \\cdot 80\\,000 + 19 \\cdot 5\\,000]}{2} = 2\\,550\\,000')} (đồng).`], ans:`Đáp án <b>B</b>: ${m('2\\,550\\,000')} đồng.`},
  {kind:'lt', tn:true, tag:'Trắc nghiệm · Vận dụng cao', label:'Câu 18', de:`Tổng ${m('n')} số hạng đầu của một cấp số cộng là ${m('S_n = 2n^2 + 3n')}. Số hạng ${m('u_{10}')} bằng<div style="display:grid;grid-template-columns:1fr 1fr;gap:.35em 1.4em;margin-top:.6em"><span><b>A.</b> ${m('39')}</span><span><b>B.</b> ${m('230')}</span><span><b>C.</b> ${m('41')}</span><span><b>D.</b> ${m('43')}</span></div>`,
   sol:[`${m('u_{10} = S_{10} - S_9')}.`,`${m('S_{10} = 230,\\ S_9 = 189')} nên ${m('u_{10} = 41')}.`,`Kiểm tra: ${m('u_1 = S_1 = 5,\\ d = 4,\\ u_{10} = 5 + 9 \\cdot 4 = 41')}.`], ans:`Đáp án <b>C</b>: ${m('41')}.`},
  {kind:'lt', tn:true, tag:'Trắc nghiệm · Vận dụng cao', label:'Câu 19', de:`Bốn số lập thành cấp số cộng tăng, có tổng bằng ${m('20')} và tổng các bình phương bằng ${m('120')}. Số lớn nhất trong bốn số là<div style="display:grid;grid-template-columns:1fr 1fr;gap:.35em 1.4em;margin-top:.6em"><span><b>A.</b> ${m('8')}</span><span><b>B.</b> ${m('6')}</span><span><b>C.</b> ${m('7')}</span><span><b>D.</b> ${m('9')}</span></div>`,
   sol:[`Đặt bốn số ${m('x - 3y,\\ x - y,\\ x + y,\\ x + 3y')} với ${m('y \\gt 0')}.`,`Tổng: ${m('4x = 20 \\Rightarrow x = 5')}. Tổng bình phương: ${m('4x^2 + 20y^2 = 120 \\Rightarrow y^2 = 1')}.`,`Số lớn nhất: ${m('x + 3y = 8')} (bốn số là ${m('2;\\ 4;\\ 6;\\ 8')}).`], ans:`Đáp án <b>A</b>: ${m('8')}.`},
  {kind:'lt', tn:true, tag:'Trắc nghiệm · Vận dụng cao', label:'Câu 20', de:`Một người tiết kiệm: tháng đầu để dành ${m('5')} triệu đồng, mỗi tháng sau để dành nhiều hơn tháng trước ${m('1')} triệu đồng. Sau ít nhất bao nhiêu tháng thì tổng số tiền để dành đạt ${m('100')} triệu đồng trở lên?<div style="display:grid;grid-template-columns:1fr 1fr;gap:.35em 1.4em;margin-top:.6em"><span><b>A.</b> ${m('12')} tháng</span><span><b>B.</b> ${m('9')} tháng</span><span><b>C.</b> ${m('10')} tháng</span><span><b>D.</b> ${m('11')} tháng</span></div>`,
   sol:[`${m('u_1 = 5,\\ d = 1')}: ${m('S_n = \\dfrac{n\\,[10 + (n - 1)]}{2} = \\dfrac{n(n + 9)}{2}')}.`,`${m('S_n \\ge 100 \\Leftrightarrow n^2 + 9n - 200 \\ge 0')}. Có ${m('S_{10} = 95 \\lt 100\\ \\text{và}\\ S_{11} = 110 \\ge 100')}.`], ans:`Đáp án <b>D</b>: ${m('11')} tháng.`},

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

/* =====================================================================
   CHƯƠNG III. MẪU SỐ LIỆU GHÉP NHÓM – Bài 8 (thầy yêu cầu 14/10/2026, /tron-bo)
   5 dạng: xác định nhóm · chia nhóm · lập bảng tần số · đọc biểu đồ cột · tần số tương đối, tần số tích luỹ.
   Quy ước nhóm [a; b): chứa a, không chứa b. Tình huống tự soạn ghi [Minh họa] ở phiếu trên lớp.
   ===================================================================== */
(() => {
const m = tm, d = td;
const box = h => `<div class="lk-box">${h}</div>`, note = h => `<div class="lk-note">⚠️ ${h}</div>`;
const S = t => `<p>${t}</p>`;
const TITLE = (name, pts) => ({kind:'title', tag:'Toán 11 · Kết nối tri thức · Chương III', title:name, sub:'Mục tiêu bài học', points:pts});
const HOME = n => box(`Về nhà: làm các bài tập cuối ${n} trong SGK; luyện thêm trên web <b>Học mà chơi</b> – Toán 11, ${n}.`);
const gr = (a, b) => m(`[${a};\\,${b})`);
const E1 = [150, 155, 160, 165, 170, 175], F1 = [4, 8, 12, 10, 6];     // biểu đồ chiều cao (40 học sinh)
const HIST1 = histSVG(E1, F1, 2, {unit:'cm'});
const TAB3 = `<table class="lk-table"><tr><th>Nhóm</th>${[[40,45],[45,50],[50,55],[55,60],[60,65],[65,70]].map(g => `<th>${gr(g[0], g[1])}</th>`).join('')}</tr><tr><td>Tần số</td><td>1</td><td>3</td><td>4</td><td>4</td><td>2</td><td>1</td></tr></table>`;

Lecture.add({ grade:'lop11', gradeName:'Toán 11', chapter:'Chương III. Mẫu số liệu ghép nhóm', lessons:[

/* ---------------- BÀI 8 ---------------- */
{ id:'bai-8', name:'Bài 8. Mẫu số liệu ghép nhóm', desc:'Nhóm số liệu; chia nhóm; bảng tần số ghép nhóm; biểu đồ cột; tần số tương đối và tần số tích luỹ.', slides:[
  TITLE('Bài 8. Mẫu số liệu ghép nhóm', ['Nhận biết nhóm số liệu dạng [a; b), độ dài nhóm; biết số liệu thuộc nhóm nào.', 'Chia nhóm và lập bảng tần số ghép nhóm từ số liệu thô.', 'Đọc biểu đồ cột; tính tần số tương đối, tần số tích luỹ.']),

  {kind:'kt', tag:'Kiến thức trọng tâm 1', title:'Ghép nhóm số liệu',
   body: box(`Khi có nhiều số liệu, ta chia chúng thành các <b>nhóm</b> kề nhau, mỗi nhóm có dạng ${m('[a;\\,b)')}: gồm các số ${m('x')} thoả ${m('a \\le x \\lt b')}.`) +
     S(`Độ dài của nhóm là ${m('b - a')}; các nhóm thường chọn có cùng độ dài.`) +
     note(`Nhóm ${m('[a;\\,b)')} <b>chứa</b> ${m('a')}, <b>không chứa</b> ${m('b')}: số liệu đúng bằng ${m('b')} thuộc nhóm kế tiếp.`)},

  {kind:'kt', tag:'Kiến thức trọng tâm 2', title:'Bảng tần số ghép nhóm',
   body: S(`<b>Tần số</b> ${m('m_i')} của một nhóm là số số liệu thuộc nhóm đó. <b>Cỡ mẫu</b> ${m('n = m_1 + m_2 + \\cdots + m_k')}.`) + TAB3 +
     S(`Bảng cho biết cân nặng (kg) của ${m('15')} học sinh: ${m('n = 1 + 3 + 4 + 4 + 2 + 1 = 15')}.`)},

  {kind:'kt', tag:'Kiến thức trọng tâm 3', title:'Tần số tương đối và tần số tích luỹ',
   body: box(`Tần số tương đối của nhóm: ${m('f_i = \\dfrac{m_i}{n}\\cdot 100\\%')}. Tổng các tần số tương đối bằng ${m('100\\%')}.`) +
     S(`<b>Tần số tích luỹ</b> của một nhóm là tổng tần số của nhóm đó và tất cả các nhóm đứng trước: ${m('M_i = m_1 + m_2 + \\cdots + m_i')}.`) +
     S(`${m('M_i')} cho biết có bao nhiêu số liệu <b>nhỏ hơn</b> đầu mút phải của nhóm thứ ${m('i')}.`)},

  {kind:'kt', tag:'Kiến thức trọng tâm 4', title:'Biểu đồ cột (histogram)',
   body: S('Mỗi nhóm ứng với một cột; các cột liền nhau, chiều cao cột bằng tần số (hoặc tần số tương đối).') + S('Mốc các nhóm ghi trên trục ngang; cỡ mẫu bằng tổng chiều cao các cột.') +
     note('Đọc đúng vạch trên trục tung. Nếu trục chia theo bước 2, một cột chạm vạch thứ ba nghĩa là tần số 6.'), fig:HIST1},

  {kind:'method', tag:'Dạng 1', title:'Xác định số liệu thuộc nhóm nào',
   steps:[`Với từng nhóm ${m('[a;\\,b)')}, kiểm tra ${m('a \\le x \\lt b')}.`, `Số liệu bằng đầu mút chung của hai nhóm thì thuộc nhóm bên <b>phải</b>.`]},

  {kind:'vd', tag:'Ví dụ 1 · Dạng 1', label:'Ví dụ 1', de:`Các nhóm: ${gr(10, 20)}, ${gr(20, 30)}, ${gr(30, 40)}. Số liệu ${m('x = 20')} thuộc nhóm nào? Độ dài mỗi nhóm bằng bao nhiêu?`,
   sol:[`${m('10 \\le 20 \\lt 20')} sai (không lấy đầu mút phải); ${m('20 \\le 20 \\lt 30')} đúng.`, `Độ dài nhóm: ${m('20 - 10 = 10')}.`], ans:`${tb('20 \\in [20;\\,30)')}, độ dài nhóm ${tb('10')}.`},

  {kind:'method', tag:'Dạng 2', title:'Chia nhóm số liệu',
   steps:[`Tìm giá trị nhỏ nhất ${m('m')} và lớn nhất ${m('M')}.`, `Số nhóm = ${m('\\dfrac{M - m}{\\text{độ dài nhóm}}')} làm tròn <b>lên</b> (nếu chia hết mà ${m('M')} nằm đúng đầu mút phải thì cần thêm một nhóm).`, `Viết các nhóm nối liền nhau từ ${m('m')}.`]},

  {kind:'vd', tag:'Ví dụ 2 · Dạng 2', label:'Ví dụ 2', de:`Mẫu số liệu có giá trị nhỏ nhất ${m('12')}, lớn nhất ${m('47')}. Chia thành các nhóm độ dài ${m('10')}, nhóm đầu bắt đầu từ ${m('12')}. Viết các nhóm.`,
   sol:[`${m('47 - 12 = 35')}; ${m('35:10 = 3{,}5')}, làm tròn lên: ${m('4')} nhóm.`, `Các nhóm: ${gr(12, 22)}, ${gr(22, 32)}, ${gr(32, 42)}, ${gr(42, 52)}.`], ans:`${tb('4')} nhóm; ${m('47 \\in [42;\\,52)')}.`},

  {kind:'method', tag:'Dạng 3', title:'Lập bảng tần số ghép nhóm từ số liệu thô',
   steps:[`Chia nhóm (dạng 2).`, `Duyệt từng số liệu, gạch vào nhóm chứa nó (chú ý số bằng đầu mút).`, `Đếm tần số từng nhóm; cộng lại, kiểm tra bằng số số liệu ban đầu.`]},

  {kind:'vd', tag:'Ví dụ 3 · Dạng 3', label:'Ví dụ 3', de:`Cân nặng (kg) của 15 học sinh: ${m('42;\\ 45;\\ 48;\\ 50;\\ 50;\\ 52;\\ 53;\\ 55;\\ 55;\\ 56;\\ 58;\\ 60;\\ 61;\\ 65;\\ 49')}. Lập bảng tần số ghép nhóm với các nhóm ${gr(40, 45)}, ${gr(45, 50)}, …, ${gr(65, 70)}.`,
   sol:[`${gr(40, 45)}: ${m('42')} → 1. &nbsp; ${gr(45, 50)}: ${m('45;\\ 48;\\ 49')} → 3 (45 thuộc nhóm này).`, `${gr(50, 55)}: ${m('50;\\ 50;\\ 52;\\ 53')} → 4. &nbsp; ${gr(55, 60)}: ${m('55;\\ 55;\\ 56;\\ 58')} → 4.`, `${gr(60, 65)}: ${m('60;\\ 61')} → 2. &nbsp; ${gr(65, 70)}: ${m('65')} → 1.`, `Kiểm tra: ${m('1 + 3 + 4 + 4 + 2 + 1 = 15')}.`], ans:`Tần số: ${tb('1,\\ 3,\\ 4,\\ 4,\\ 2,\\ 1')}.`},

  {kind:'method', tag:'Dạng 4', title:'Đọc biểu đồ cột',
   steps:[`Ghi tần số của từng cột (đọc theo vạch trục tung).`, `Cỡ mẫu = tổng tần số các cột.`, `Hỏi “từ … đến dưới …” thì cộng tần số các nhóm nằm trọn trong khoảng đó.`]},

  {kind:'vd', tag:'Ví dụ 4 · Dạng 4', label:'Ví dụ 4', de:`Biểu đồ cho chiều cao của học sinh một lớp. (a) Có bao nhiêu học sinh được khảo sát? (b) Có bao nhiêu em cao từ 160 cm đến dưới 170 cm?`,
   sol:[`Đọc các cột: ${m('4,\\ 8,\\ 12,\\ 10,\\ 6')}.`, `(a) ${m('n = 4 + 8 + 12 + 10 + 6 = 40')}.`, `(b) Gồm hai nhóm ${gr(160, 165)} và ${gr(165, 170)}: ${m('12 + 10 = 22')}.`], ans:`(a) ${tb('40')} học sinh; (b) ${tb('22')} học sinh.`, fig:HIST1},

  {kind:'method', tag:'Dạng 5', title:'Tần số tương đối và tần số tích luỹ',
   steps:[`Cỡ mẫu ${m('n')} = tổng tần số.`, `Tần số tương đối của nhóm: ${m('\\dfrac{m_i}{n}\\cdot 100\\%')}.`, `Tần số tích luỹ: cộng dồn từ nhóm đầu đến nhóm cần tìm.`]},

  {kind:'vd', tag:'Ví dụ 5 · Dạng 5', label:'Ví dụ 5', de:`Với biểu đồ chiều cao ở Ví dụ 4, tính tần số tương đối của nhóm ${gr(160, 165)} và cho biết có bao nhiêu em cao dưới 165 cm.`,
   sol:[`${m('n = 40')}, tần số nhóm ${gr(160, 165)} là ${m('12')}: ${m('\\dfrac{12}{40}\\cdot 100\\% = 30\\%')}.`, `Dưới 165 cm: cộng dồn đến nhóm ${gr(160, 165)}: ${m('4 + 8 + 12 = 24')}.`], ans:`${tb('30\\%')}; tần số tích luỹ ${tb('24')} học sinh.`, fig:HIST1},

  {kind:'vd', tag:'Ví dụ 6 · Dạng 5', label:'Ví dụ 6', de:`Bảng tần số ghép nhóm: nhóm ${gr(0, 10)} có ${m('x')} số liệu, nhóm ${gr(10, 20)} có ${m('12')}, nhóm ${gr(20, 30)} có ${m('8')}. Biết nhóm ${gr(20, 30)} có tần số tương đối ${m('20\\%')}. Tìm ${m('x')}.`,
   sol:[`${m('\\dfrac{8}{n} = 20\\% \\Rightarrow n = 40')}.`, `${m('x = 40 - 12 - 8 = 20')}.`], ans:`${tb('x = 20')}.`},

  {kind:'lt', tag:'Luyện tập', label:'Bài 1', de:`Mẫu số liệu có giá trị nhỏ nhất ${m('3')}, lớn nhất ${m('29')}. Muốn chia thành <b>đúng 4 nhóm</b> cùng độ dài, nhóm đầu bắt đầu từ ${m('3')}, độ dài nhóm (số nguyên) nhỏ nhất là bao nhiêu?`,
   sol:[`${m('29 - 3 = 26')}; cần ${m('4L \\gt 26')}.`, `${m('L = 6 \\Rightarrow 24 \\le 26')} (thiếu); ${m('L = 7 \\Rightarrow 28 \\gt 26')} (đủ).`], ans:`Độ dài nhỏ nhất ${tb('7')}.`},
  {kind:'lt', tag:'Luyện tập', label:'Bài 2', de:`Số lần chạm bóng của 12 bạn: ${m('3;\\ 5;\\ 5;\\ 7;\\ 8;\\ 10;\\ 10;\\ 12;\\ 13;\\ 15;\\ 17;\\ 20')}. Ghép nhóm ${gr(0, 5)}, ${gr(5, 10)}, ${gr(10, 15)}, ${gr(15, 20)}, ${gr(20, 25)}. Lập bảng tần số và tính tần số tương đối nhóm ${gr(10, 15)}.`,
   sol:[`${gr(0, 5)}: 3 → 1. ${gr(5, 10)}: 5; 5; 7; 8 → 4. ${gr(10, 15)}: 10; 10; 12; 13 → 4. ${gr(15, 20)}: 15; 17 → 2. ${gr(20, 25)}: 20 → 1.`, `Tổng ${m('1 + 4 + 4 + 2 + 1 = 12')}. Tần số tương đối nhóm ${gr(10, 15)}: ${m('\\dfrac{4}{12}\\cdot 100\\% \\approx 33{,}3\\%')}.`]},
  {kind:'lt', tag:'Luyện tập', label:'Bài 3', de:`Từ biểu đồ Ví dụ 4, tính tỉ lệ phần trăm học sinh cao từ 165 cm trở lên.`,
   sol:[`Từ 165 cm trở lên: ${m('10 + 6 = 16')} em, ${m('\\dfrac{16}{40}\\cdot 100\\% = 40\\%')}.`], ans:`${tb('40\\%')}.`, fig:HIST1},

  {kind:'sum', tag:'Tổng kết', title:'Ghi nhớ',
   body:`<ul><li>Nhóm ${m('[a;\\,b)')} chứa ${m('a')}, không chứa ${m('b')}; độ dài ${m('b - a')}.</li><li>Cỡ mẫu ${m('n = m_1 + \\cdots + m_k')}; tần số tương đối ${m('\\dfrac{m_i}{n}\\cdot 100\\%')}; tần số tích luỹ là tổng cộng dồn.</li><li>Biểu đồ cột: cột liền nhau, chiều cao bằng tần số.</li></ul>` + HOME('Bài 8')},
]},
/* ---------------- BÀI 9 ---------------- */
{ id:'bai-9', name:'Bài 9. Các số đặc trưng đo xu thế trung tâm', desc:'Số trung bình, trung vị, tứ phân vị, mốt của mẫu số liệu ghép nhóm; chọn số đặc trưng phù hợp; tìm tần số khuyết.', slides:[
  TITLE('Bài 9. Các số đặc trưng đo xu thế trung tâm', ['Tính số trung bình cộng của mẫu số liệu ghép nhóm bằng giá trị đại diện.', 'Tính trung vị, tứ phân vị và mốt từ bảng tần số ghép nhóm.', 'Chọn số đặc trưng phù hợp với tình huống thực tế.']),

  {kind:'kt', tag:'Kiến thức trọng tâm 1', title:'Số trung bình cộng',
   body: S(`Với mẫu số liệu ghép nhóm, lấy <b>giá trị đại diện</b> ${m('x_i')} của mỗi nhóm là <b>trung điểm</b> của nhóm: ${m('x_i = \\dfrac{a + b}{2}')} với nhóm ${m('[a;\\,b)')}.`) +
     box(`${m('\\bar{x} = \\dfrac{m_1x_1 + m_2x_2 + \\cdots + m_kx_k}{n}')}, với ${m('m_i')} là tần số, ${m('n = m_1 + \\cdots + m_k')}.`) +
     note(`Giá trị đại diện là trung điểm của nhóm, không phải đầu mút. Kết quả chỉ là giá trị <b>gần đúng</b> của số trung bình thật.`)},

  {kind:'kt', tag:'Kiến thức trọng tâm 2', title:'Trung vị',
   body: S(`Nhóm chứa trung vị là nhóm <b>đầu tiên</b> có tần số tích luỹ ${m('\\ge \\dfrac{n}{2}')}. Giả sử đó là nhóm ${m('[u_m;\\,u_{m+1})')}.`) +
     box(`${m('M_e = u_m + \\dfrac{\\dfrac{n}{2} - C}{n_m}\\cdot (u_{m+1} - u_m)')}`) +
     S(`${m('n_m')}: tần số của nhóm chứa trung vị; ${m('C')}: tổng tần số các nhóm <b>đứng trước</b> nhóm đó.`)},

  {kind:'kt', tag:'Kiến thức trọng tâm 3', title:'Tứ phân vị',
   body: S(`${m('Q_2 = M_e')} (chia mẫu thành hai nửa); ${m('Q_1')} là trung vị của nửa dưới, ${m('Q_3')} là trung vị của nửa trên.`) +
     box(`${m('Q_1')}: dùng công thức trung vị với ${m('\\dfrac{n}{4}')} thay cho ${m('\\dfrac{n}{2}')}. &nbsp; ${m('Q_3')}: dùng ${m('\\dfrac{3n}{4}')}.`) +
     note(`Mỗi tứ phân vị có nhóm chứa riêng; phải tìm nhóm bằng tần số tích luỹ cho từng mốc ${m('\\dfrac{n}{4}')}, ${m('\\dfrac{n}{2}')}, ${m('\\dfrac{3n}{4}')}.`)},

  {kind:'kt', tag:'Kiến thức trọng tâm 4', title:'Mốt',
   body: S(`Nhóm chứa mốt là nhóm có <b>tần số lớn nhất</b>, giả sử là ${m('[u_j;\\,u_{j+1})')}, độ dài ${m('h')}.`) +
     box(`${m('M_o = u_j + \\dfrac{m_j - m_{j-1}}{(m_j - m_{j-1}) + (m_j - m_{j+1})}\\cdot h')}`) +
     note(`Nhóm đầu không có nhóm trước, nhóm cuối không có nhóm sau: coi tần số nhóm thiếu bằng ${m('0')}.`)},

  {kind:'kt', tag:'Kiến thức trọng tâm 5', title:'Ý nghĩa và cách chọn',
   body: `<ul><li><b>Số trung bình</b>: đại diện cho cả mẫu, dễ bị kéo lệch bởi số liệu quá lớn hoặc quá nhỏ.</li><li><b>Trung vị</b>: mốc chia mẫu thành hai nửa bằng nhau, ít chịu ảnh hưởng của số liệu bất thường.</li><li><b>Tứ phân vị</b>: các mốc 25%, 50%, 75% của mẫu.</li><li><b>Mốt</b>: giá trị (nhóm) xuất hiện nhiều nhất, dùng khi cần biết điều phổ biến nhất.</li></ul>`},

  {kind:'method', tag:'Dạng 1', title:'Tính số trung bình cộng',
   steps:[`Với mỗi nhóm, tính giá trị đại diện ${m('x_i')} (trung điểm).`, `Tính ${m('n')} và tổng ${m('m_1x_1 + \\cdots + m_kx_k')}.`, `Chia tổng cho ${m('n')}.`]},

  {kind:'vd', tag:'Ví dụ 1 · Dạng 1', label:'Ví dụ 1', de:`Thời gian tự học (phút) mỗi tối của 40 học sinh: ${gr(20, 40)}: 6 em; ${gr(40, 60)}: 8 em; ${gr(60, 80)}: 10 em; ${gr(80, 100)}: 10 em; ${gr(100, 120)}: 6 em. Tính số trung bình cộng.`,
   sol:[`Giá trị đại diện: ${m('30;\\ 50;\\ 70;\\ 90;\\ 110')}; ${m('n = 6 + 8 + 10 + 10 + 6 = 40')}.`, `${m('\\bar{x} = \\dfrac{6\\cdot 30 + 8\\cdot 50 + 10\\cdot 70 + 10\\cdot 90 + 6\\cdot 110}{40} = \\dfrac{2840}{40}')}.`], ans:`${tb('\\bar{x} = 71')} phút.`},

  {kind:'method', tag:'Dạng 2', title:'Tính trung vị',
   steps:[`Tính ${m('\\dfrac{n}{2}')} và tần số tích luỹ từng nhóm.`, `Chọn nhóm đầu tiên có tần số tích luỹ ${m('\\ge \\dfrac{n}{2}')}; ghi ${m('u_m,\\ n_m,\\ C,\\ h')}.`, `Thay vào ${m('M_e = u_m + \\dfrac{n/2 - C}{n_m}\\cdot h')}.`]},

  {kind:'vd', tag:'Ví dụ 2 · Dạng 2', label:'Ví dụ 2', de:`Với bảng ở Ví dụ 1, tính trung vị.`,
   sol:[`${m('\\dfrac{n}{2} = 20')}. Tần số tích luỹ: ${m('6;\\ 14;\\ 24;\\ 34;\\ 40')}.`, `Nhóm đầu tiên có tần số tích luỹ ${m('\\ge 20')} là ${gr(60, 80)}: ${m('u_m = 60,\\ n_m = 10,\\ C = 14,\\ h = 20')}.`, `${m('M_e = 60 + \\dfrac{20 - 14}{10}\\cdot 20 = 72')}.`], ans:`${tb('M_e = 72')} phút.`},

  {kind:'method', tag:'Dạng 3', title:'Tính tứ phân vị',
   steps:[`Tính ba mốc ${m('\\dfrac{n}{4},\\ \\dfrac{n}{2},\\ \\dfrac{3n}{4}')}.`, `Với mỗi mốc, tìm nhóm chứa nó bằng tần số tích luỹ.`, `Áp dụng công thức trung vị với mốc tương ứng.`]},

  {kind:'vd', tag:'Ví dụ 3 · Dạng 3', label:'Ví dụ 3', de:`Với bảng ở Ví dụ 1, tính ${m('Q_1')} và ${m('Q_3')}.`,
   sol:[`${m('Q_1')}: ${m('\\dfrac{n}{4} = 10')}; tần số tích luỹ ${m('6;\\ 14;\\ \\ldots')} nên nhóm ${gr(40, 60)}, ${m('C = 6,\\ n_m = 8')}: ${m('Q_1 = 40 + \\dfrac{10 - 6}{8}\\cdot 20 = 50')}.`, `${m('Q_3')}: ${m('\\dfrac{3n}{4} = 30')}; tần số tích luỹ ${m('24;\\ 34')} nên nhóm ${gr(80, 100)}, ${m('C = 24,\\ n_m = 10')}: ${m('Q_3 = 80 + \\dfrac{30 - 24}{10}\\cdot 20 = 92')}.`], ans:`${tb('Q_1 = 50')}; ${tb('Q_3 = 92')}.`},

  {kind:'method', tag:'Dạng 4', title:'Tính mốt',
   steps:[`Tìm nhóm có tần số lớn nhất; xác định ${m('m_{j-1},\\ m_j,\\ m_{j+1}')} (nhóm thiếu coi là 0).`, `Thay vào công thức ${m('M_o')} và kiểm tra kết quả nằm trong nhóm đó.`]},

  {kind:'vd', tag:'Ví dụ 4 · Dạng 4', label:'Ví dụ 4', de:`Thời gian tự học của 40 học sinh khác: ${gr(20, 40)}: 4; ${gr(40, 60)}: 6; ${gr(60, 80)}: 12; ${gr(80, 100)}: 10; ${gr(100, 120)}: 8. Tính mốt.`,
   sol:[`Tần số lớn nhất là ${m('12')}, nhóm ${gr(60, 80)}: ${m('u_j = 60,\\ m_{j-1} = 6,\\ m_{j+1} = 10,\\ h = 20')}.`, `${m('M_o = 60 + \\dfrac{12 - 6}{(12 - 6) + (12 - 10)}\\cdot 20 = 60 + 15')}.`], ans:`${tb('M_o = 75')} phút.`},

  {kind:'method', tag:'Dạng 5', title:'Tìm tần số khuyết, chọn số đặc trưng',
   steps:[`Đọc dữ kiện (số trung bình hoặc trung vị) để biết nhóm và cỡ mẫu.`, `Lập phương trình ẩn ${m('x')} từ công thức, giải rồi kiểm tra lại.`, `Chọn số đặc trưng: “phổ biến nhất” → mốt; “một nửa” → trung vị; “trung bình” → số trung bình; “25%, 75%” → tứ phân vị.`]},

  {kind:'vd', tag:'Ví dụ 5 · Dạng 5', label:'Ví dụ 5', de:`Bảng tần số ghép nhóm: ${gr(0, 10)}: 5; ${gr(10, 20)}: 6; ${gr(20, 30)}: 3; ${gr(30, 40)}: ${m('x')}. Biết trung vị bằng ${m('15')}. Tìm ${m('x')}.`,
   sol:[`${m('M_e = 15')} thuộc nhóm ${gr(10, 20)}: ${m('C = 5,\\ n_m = 6,\\ h = 10')}.`, `${m('15 = 10 + \\dfrac{n/2 - 5}{6}\\cdot 10 \\Rightarrow \\dfrac{n}{2} - 5 = 3 \\Rightarrow n = 16')}.`, `${m('n = 5 + 6 + 3 + x = 14 + x')} nên ${m('x = 2')}.`], ans:`${tb('x = 2')}.`},

  {kind:'vd', tag:'Ví dụ 6 · Dạng 5', label:'Ví dụ 6', de:`Một cửa hàng giày muốn nhập hàng theo cỡ giày bán chạy nhất. Nên dùng số đặc trưng nào? Nhà trường muốn tìm mốc điểm để 25% học sinh điểm thấp nhất được phụ đạo: dùng số đặc trưng nào?`,
   sol:[`Bán chạy nhất = xuất hiện nhiều nhất ⇒ <b>mốt</b>.`, `Mốc ngăn 25% số liệu nhỏ nhất ⇒ <b>tứ phân vị thứ nhất ${m('Q_1')}</b>.`], ans:`${tb('Mốt')}; ${tb('Q_1')}.`},

  {kind:'lt', tag:'Luyện tập', label:'Bài 1', de:`Số bàn thắng trong các trận (n = 10): ${gr(0, 4)}: 2 trận; ${gr(4, 8)}: 5 trận; ${gr(8, 12)}: 3 trận. Tính số trung bình cộng.`,
   sol:[`Giá trị đại diện: ${m('2;\\ 6;\\ 10')}.`, `${m('\\bar{x} = \\dfrac{2\\cdot 2 + 5\\cdot 6 + 3\\cdot 10}{10} = \\dfrac{64}{10}')}.`], ans:`${tb('6{,}4')}.`},
  {kind:'lt', tag:'Luyện tập', label:'Bài 2', de:`Bảng tần số: ${gr(10, 20)}: 3; ${gr(20, 30)}: 7; ${gr(30, 40)}: 6; ${gr(40, 50)}: 4. Tính trung vị.`,
   sol:[`${m('n = 20')}, ${m('\\dfrac{n}{2} = 10')}; tần số tích luỹ ${m('3;\\ 10;\\ 16;\\ 20')}.`, `Nhóm đầu tiên đạt ${m('\\ge 10')} là ${gr(20, 30)}: ${m('M_e = 20 + \\dfrac{10 - 3}{7}\\cdot 10 = 30')}.`], ans:`${tb('M_e = 30')}.`},
  {kind:'lt', tag:'Luyện tập', label:'Bài 3', de:`Bảng tần số: ${gr(0, 5)}: 3; ${gr(5, 10)}: 9; ${gr(10, 15)}: 5; ${gr(15, 20)}: 3. Tính mốt.`,
   sol:[`Nhóm có tần số lớn nhất: ${gr(5, 10)} (9).`, `${m('M_o = 5 + \\dfrac{9 - 3}{(9 - 3) + (9 - 5)}\\cdot 5 = 5 + 3 = 8')}.`], ans:`${tb('M_o = 8')}.`},

  {kind:'sum', tag:'Tổng kết', title:'Ghi nhớ',
   body:`<ul><li>${m('\\bar{x} = \\dfrac{\\sum m_ix_i}{n}')} với ${m('x_i')} là trung điểm nhóm.</li><li>${m('M_e')}, ${m('Q_1')}, ${m('Q_3')}: tìm nhóm bằng tần số tích luỹ rồi dùng ${m('u + \\dfrac{q - C}{n_m}\\cdot h')} với ${m('q = \\dfrac{n}{2},\\ \\dfrac{n}{4},\\ \\dfrac{3n}{4}')}.</li><li>${m('M_o')}: nhóm có tần số lớn nhất, nhóm thiếu coi tần số 0.</li></ul>` + HOME('Bài 9')},
]},
]});
})();

/* =====================================================================
   CHƯƠNG IV. QUAN HỆ SONG SONG TRONG KHÔNG GIAN – Bài 10 (thầy yêu cầu 02/11/2026, /tron-bo)
   SGK KNTT Toán 11 tập 1, tr. 70–76: mặt phẳng và hình biểu diễn · 6 tính chất thừa nhận · ba cách xác định mặt phẳng ·
   giao tuyến, giao điểm · hình chóp và tứ diện. 6 dạng bài, hình vẽ bằng spaceSVG (nét liền – nét đứt).
   ===================================================================== */
(() => {
const m = tm, d = td;
const box = h => `<div class="lk-box">${h}</div>`, note = h => `<div class="lk-note">⚠️ ${h}</div>`;
const S = t => `<p>${t}</p>`;
const TITLE = (name, pts) => ({kind:'title', tag:'Toán 11 · Kết nối tri thức · Chương IV', title:name, sub:'Mục tiêu bài học', points:pts});
const mid = (p, q, t = .5) => [p[0] + t * (q[0] - p[0]), p[1] + t * (q[1] - p[1])];
const ix = (p, q, r, s) => { const dd = (q[0] - p[0]) * (s[1] - r[1]) - (q[1] - p[1]) * (s[0] - r[0]); const t = ((r[0] - p[0]) * (s[1] - r[1]) - (r[1] - p[1]) * (s[0] - r[0])) / dd; return [p[0] + t * (q[0] - p[0]), p[1] + t * (q[1] - p[1])]; };
const TET0 = [[160, 22], [48, 160], [168, 196], [288, 128]];
const tetFig = (L, o = {}) => {
  const [v, x, y, z] = L, pts = {[v]:TET0[0], [x]:TET0[1], [y]:TET0[2], [z]:TET0[3], ...(o.pts || {})};
  return spaceSVG({pts, s:[[v, x], [v, y], [v, z], [x, y], [y, z], ...(o.s || [])], d:[[x, z], ...(o.d || [])], h:o.h, hd:o.hd, fill:o.fill, off:o.off, ht:218, aria:o.aria || 'Hình tứ diện'});
};
const PY0 = [[160, 16], [40, 142], [104, 186], [262, 186], [298, 142]];
const pyFig = (o = {}) => spaceSVG({pts:{S:PY0[0], A:PY0[1], B:PY0[2], C:PY0[3], D:PY0[4], ...(o.pts || {})}, s:[['S', 'A'], ['S', 'B'], ['S', 'C'], ['S', 'D'], ['A', 'B'], ['B', 'C'], ['C', 'D'], ...(o.s || [])], d:[['A', 'D'], ...(o.d || [])], h:o.h, off:o.off, ht:218, aria:o.aria || 'Hình chóp S.ABCD'});
const planeFig = spaceSVG({pts:{A:[150, 138], B:[96, 48], d1:[70, 150], d2:[260, 120]}, planes:[{q:[[28, 172], [232, 172], [308, 98], [104, 98]], lab:'(P)', at:[250, 160]}], ht:190, off:{A:[-16, 0], B:[16, 0]}, nolabel:['d1', 'd2'], aria:'Mặt phẳng (P), điểm A thuộc (P), điểm B không thuộc (P)'});
const O = ix(PY0[1], PY0[3], PY0[2], PY0[4]);
const figE = (() => { const A = [60, 150], B = [150, 153], C = [260, 128], D = [200, 100], Sx = [150, 15], E = ix(A, B, D, C);
  return spaceSVG({pts:{S:Sx, A, B, C, D, E}, w:360, ht:200, s:[['S', 'A'], ['S', 'B'], ['S', 'C'], ['A', 'B'], ['B', 'C']], d:[['S', 'D'], ['A', 'D'], ['C', 'D'], ['B', 'E'], ['C', 'E']], off:{E:[15, 0], D:[10, -12]}, aria:'Hình chóp S.ABCD có AB cắt CD tại E'}); })();
const Mp = mid(PY0[0], PY0[1], .9), Np = ix(Mp, O, PY0[0], PY0[3]);
const figN = pyFig({pts:{M:Mp, O, N:Np}, d:[['A', 'C'], ['B', 'D'], ['M', 'B'], ['M', 'D'], ['M', 'O']], s:[['C', 'N']], off:{N:[14, 10]}});
const Gp = [(TET0[1][0] + TET0[2][0] + TET0[3][0]) / 3, (TET0[1][1] + TET0[2][1] + TET0[3][1]) / 3];
const figG = tetFig(['S', 'B', 'A', 'C'], {pts:{M:mid(TET0[1], TET0[2]), N:mid(TET0[2], TET0[3]), G:Gp}, d:[['B', 'N'], ['C', 'M']], off:{G:[0, 16], N:[16, 6], M:[-16, 6]}});

const tw = t => `<b class="ans">${t}</b>`;
/* ---- Bài 11: hình bổ sung (hình chóp đáy hình bình hành, hình lập phương, lăng trụ) ---- */
const PG0 = [[150, 16], [40, 142], [104, 186], [262, 186], [198, 142]];
const pgFig = (o = {}) => spaceSVG({pts:{S:PG0[0], A:PG0[1], B:PG0[2], C:PG0[3], D:PG0[4], ...(o.pts || {})}, s:[['S', 'A'], ['S', 'B'], ['S', 'C'], ['S', 'D'], ['A', 'B'], ['B', 'C'], ['C', 'D'], ...(o.s || [])], d:[['A', 'D'], ...(o.d || [])], h:o.h, hd:o.hd, fill:o.fill, off:o.off, nolabel:o.nolabel, ht:218, aria:o.aria || 'Hình chóp S.ABCD có đáy là hình bình hành'});
const CUBE0 = {A:[80, 192], B:[190, 192], C:[250, 152], D:[140, 152], "A'":[80, 94], "B'":[190, 94], "C'":[250, 54], "D'":[140, 54]};
const cubeFig = (o = {}) => spaceSVG({pts:{...CUBE0, ...(o.pts || {})},
  s:[['A', 'B'], ['B', 'C'], ["A'", "B'"], ["B'", "C'"], ["C'", "D'"], ["D'", "A'"], ['A', "A'"], ['B', "B'"], ['C', "C'"], ...(o.s || [])],
  d:[['A', 'D'], ['D', 'C'], ['D', "D'"], ...(o.d || [])], h:o.h, hd:o.hd, fill:o.fill, off:o.off, ht:218, aria:o.aria || "Hình lập phương ABCD.A'B'C'D'"});
const tet4 = ['A', 'B', 'C', 'D'];
const midsMNPQ = {M:mid(TET0[0], TET0[1]), N:mid(TET0[1], TET0[2]), P:mid(TET0[2], TET0[3]), Q:mid(TET0[3], TET0[0])};
const figMNPQ = tetFig(tet4, {pts:midsMNPQ, s:[['M', 'N'], ['P', 'Q']], d:[['N', 'P'], ['Q', 'M']], aria:'Tứ diện ABCD với trung điểm M, N, P, Q của AB, BC, CD, DA'});
const figSkew = tetFig(tet4, {h:[['A', 'C']], hd:[['B', 'D']], aria:'Hai cạnh đối AC và BD của tứ diện chéo nhau'});
const figMN = tetFig(tet4, {pts:{M:mid(TET0[0], TET0[1]), N:mid(TET0[0], TET0[2])}, s:[['M', 'N']], aria:'Tứ diện ABCD, M, N là trung điểm AB, AC'});
const figMid = pgFig({pts:{M:mid(PG0[0], PG0[1]), N:mid(PG0[0], PG0[4])}, s:[['M', 'B'], ['N', 'C']], d:[['M', 'N']], aria:'Hình chóp S.ABCD, M trung điểm SA, mặt phẳng (MBC) cắt SD tại N'});
const figSx = pgFig({pts:{u:[60, 16], x:[262, 16]}, nolabel:['u'], h:[['u', 'x']], aria:'Giao tuyến Sx của (SAD) và (SBC) song song với AD và BC'});
const figMNCD = pgFig({pts:{M:mid(PG0[0], PG0[1]), N:mid(PG0[0], PG0[2])}, s:[['M', 'N'], ['N', 'C']], d:[['M', 'D']], aria:'Hình chóp S.ABCD, M, N trung điểm SA, SB; hình thang MNCD'});

/* ---- Bài 12: hình lăng trụ, hình tô mặt phẳng, các hình dùng chung ---- */
const PRI0 = {A:[50, 172], B:[130, 198], C:[270, 172], "A'":[50, 60], "B'":[130, 86], "C'":[270, 60]};
const prismFig = (o = {}) => spaceSVG({pts:{...PRI0, ...(o.pts || {})},
  s:[['A', 'B'], ['B', 'C'], ["A'", "B'"], ["B'", "C'"], ["C'", "A'"], ['A', "A'"], ['B', "B'"], ['C', "C'"], ...(o.s || [])],
  d:[['A', 'C'], ...(o.d || [])], h:o.h, hd:o.hd, fill:o.fill, off:o.off, nolabel:o.nolabel, ht:218, aria:o.aria || "Hình lăng trụ tam giác ABC.A'B'C'"});
const figPos = spaceSVG({pts:{a:[110, 28], a2:[152, 188], A:[138, 136], b:[110, 64], b2:[246, 64], c:[66, 152], c2:[206, 152]},
  planes:[{q:[[28, 172], [232, 172], [308, 98], [104, 98]], lab:'(P)', at:[262, 166]}], s:[['a', 'a2'], ['b', 'b2'], ['c', 'c2']], nolabel:['a2', 'b2', 'c2'], off:{a:[-14, 0], b:[-14, 0], c:[-14, 0], A:[14, 8]}, ht:200,
  aria:'Mặt phẳng (P) và ba đường thẳng: a cắt (P) tại A, b song song với (P), c nằm trong (P)'});
const figParMN = tetFig(tet4, {pts:{M:mid(TET0[0], TET0[1]), N:mid(TET0[0], TET0[2])}, s:[['M', 'N']], fill:[['B', 'C', 'D']], aria:'Tứ diện ABCD, M, N trung điểm AB, AC; MN song song với mặt phẳng (BCD)'});
const figADSBC = pgFig({hd:[['A', 'D']], fill:[['S', 'B', 'C']], aria:'Hình chóp S.ABCD, đường thẳng AD song song với mặt phẳng (SBC)'});
const figCubeCC = cubeFig({h:[['A', "A'"], ['C', "C'"]], fill:[['B', 'C', "C'", "B'"], ['C', 'D', "D'", "C'"]], aria:"Hình lập phương: AA' song song với hai mặt (BCC'B') và (CDD'C'); giao tuyến CC'"});
const figSxAB = pgFig({pts:{u:[131, 3], x:[227, 69]}, nolabel:['u'], h:[['u', 'x'], ['A', 'B'], ['C', 'D']], aria:'Giao tuyến Sx của (SAB) và (SCD) song song với AB và CD'});
const Oc = ix(PG0[1], PG0[3], PG0[2], PG0[4]);
const figSAMBD = pgFig({pts:{O:Oc, M:mid(PG0[0], PG0[3])}, s:[['M', 'B'], ['M', 'D']], d:[['A', 'C'], ['B', 'D'], ['M', 'O']], h:[['S', 'A']], aria:'Hình chóp S.ABCD, tâm O, M trung điểm SC; SA song song với OM'});
const figEF = tetFig(tet4, {pts:{E:mid(TET0[0], TET0[1], 2 / 3), F:mid(TET0[0], TET0[2], 2 / 3)}, s:[['E', 'F']], fill:[['B', 'C', 'D']], aria:'Tứ diện ABCD, E thuộc AB, F thuộc AC với AE/AB = AF/AC = 2/3'});
const figPrismAA = prismFig({h:[['A', "A'"]], fill:[['B', 'C', "C'", "B'"]], aria:"Lăng trụ ABC.A'B'C': AA' song song với mặt (BCC'B')"});
const figPrismBC = prismFig({h:[['B', 'C']], fill:[["A'", "B'", "C'"]], aria:"Lăng trụ ABC.A'B'C': BC song song với mặt (A'B'C')"});
const figCubeFace = cubeFig({fill:[['A', 'B', "B'", "A'"]], aria:"Hình lập phương với mặt (ABB'A') được tô"});
const secFig = k => { const Mq = mid(TET0[0], TET0[1], k), Nq = mid(TET0[0], TET0[2], k), Qq = mid(TET0[1], TET0[3], 1 - k), Pq = mid(TET0[2], TET0[3], 1 - k);
  return tetFig(tet4, {pts:{M:Mq, N:Nq, P:Pq, Q:Qq}, s:[['M', 'N'], ['N', 'P']], d:[['P', 'Q'], ['Q', 'M']], aria:'Thiết diện MNPQ của tứ diện ABCD cắt bởi mặt phẳng song song với BC và AD'}); };
const figIJ = (() => { const Mq = mid(TET0[0], TET0[1]); return tetFig(tet4, {pts:{M:Mq, I:mid(Mq, TET0[2], 1 / 3), J:mid(Mq, TET0[3], 1 / 3)}, s:[['M', 'C']], d:[['M', 'D'], ['I', 'J']], aria:'Tứ diện ABCD, M trung điểm AB, I và J là trọng tâm tam giác ABC và ABD'}); })();

/* ---- Bài 13: hình hai mặt phẳng song song, định lí Thales, chóp cắt bởi mặt phẳng song song đáy ---- */
const figTri2 = cubeFig({fill:[['A', "B'", "D'"], ['B', "C'", 'D']], aria:"Hình lập phương: hai mặt phẳng (AB'D') và (BC'D) song song"});
const figBase2 = cubeFig({fill:[['A', 'B', 'C', 'D'], ["A'", "B'", "C'", "D'"]], aria:'Hình lập phương: hai mặt đáy song song'});
const figCut3 = cubeFig({h:[['A', 'C'], ["A'", "C'"]], fill:[['A', 'B', 'C', 'D'], ["A'", "B'", "C'", "D'"], ['A', 'C', "C'", "A'"]], aria:"Mặt phẳng (ACC'A') cắt hai đáy song song theo AC và A'C'"});
const figTwoPar = spaceSVG({pts:{A:[70, 170], B:[190, 170], C:[250, 130], D:[130, 130], E:[190, 78], F:[70, 78]}, s:[['A', 'B'], ['B', 'C'], ['C', 'D'], ['D', 'A'], ['B', 'E'], ['E', 'F'], ['F', 'A']], fill:[['A', 'D', 'F'], ['B', 'C', 'E']], ht:200, aria:'Hai hình bình hành ABCD và ABEF; hai mặt phẳng (ADF) và (BCE)'});
const THY = [44, 104, 168];
const thalesFig = spaceSVG({pts:{A:[40, 44], B:[69, 104], C:[100, 168], "A'":[190, 44], "B'":[222, 104], "C'":[256, 168]},
  planes:THY.map((y, i) => ({q:[[0, y + 14], [230, y + 14], [290, y - 10], [60, y - 10]], lab:['(P)', '(Q)', '(R)'][i], at:[304, y + 4]})),
  s:[['A', 'C'], ["A'", "C'"]], w:340, ht:200, aria:'Ba mặt phẳng song song (P), (Q), (R) cắt hai đường thẳng tại A, B, C và A′, B′, C′'});
const stFig = k => tetFig(['S', 'A', 'B', 'C'], {pts:{"A'":mid(TET0[0], TET0[1], k), "B'":mid(TET0[0], TET0[2], k), "C'":mid(TET0[0], TET0[3], k)}, s:[["A'", "B'"], ["B'", "C'"]], d:[["A'", "C'"]], fill:[["A'", "B'", "C'"]], aria:'Mặt phẳng song song với đáy cắt hình chóp S.ABC theo tam giác A′B′C′'});
const figPrismAB = prismFig({h:[["B'", "C'"]], fill:[['A', "B'", "C'"]], aria:"Lăng trụ ABC.A'B'C': mặt phẳng (AB'C') cắt đáy trên theo B'C'"});
const PRI_MID = {M:mid(PRI0.A, PRI0["A'"]), N:mid(PRI0.B, PRI0["B'"]), P:mid(PRI0.C, PRI0["C'"])};
const figPrismMNP = prismFig({pts:PRI_MID, s:[['M', 'N'], ['N', 'P']], d:[['M', 'P']], fill:[['M', 'N', 'P']], aria:"Lăng trụ ABC.A'B'C' với mặt phẳng (MNP) song song đáy"});

/* ---- Bài 14: phép chiếu song song ---- */
const fgProj = (f, o = {}) => { const A = [40, 30], Cc = [160, 50], dx = 30, dy = 100, B = [A[0] + f * (Cc[0] - A[0]), A[1] + f * (Cc[1] - A[1])];
  const pj = X => { const t = (170 - X[1]) / dy; return [X[0] + t * dx, 170]; };
  return spaceSVG({pts:{A, B, C:Cc, "A'":pj(A), "B'":pj(B), "C'":pj(Cc)}, planes:[{q:[[20, 178], [250, 178], [310, 150], [80, 150]], lab:'(P)', at:[286, 176]}], s:[['A', 'C']], d:[['A', "A'"], ['B', "B'"], ['C', "C'"]], off:{"A'":[-14, 8], "B'":[0, 16], "C'":[14, 8]}, w:330, ht:200, aria:o.aria || 'Phép chiếu song song lên mặt phẳng (P) biến ba điểm thẳng hàng A, B, C thành A′, B′, C′'}); };
const fgTri = () => { const A = [95, 15], B = [170, 85], C = [300, 70], pj = X => { const t = (170 - X[1]) / 100; return [X[0] - 20 * t, 170]; }, M = [(B[0] + C[0]) / 2, (B[1] + C[1]) / 2];
  return spaceSVG({pts:{A, B, C, M, "A'":pj(A), "B'":pj(B), "C'":pj(C), "M'":pj(M)}, planes:[{q:[[10, 182], [320, 182], [350, 150], [40, 150]], lab:'(P)', at:[326, 176]}], s:[['A', 'B'], ['B', 'C'], ['C', 'A'], ['A', 'M']], d:[['A', "A'"], ['B', "B'"], ['C', "C'"], ['M', "M'"]], h:[["A'", "B'"], ["B'", "C'"], ["C'", "A'"], ["A'", "M'"]], off:{"A'":[-14, 8], "B'":[0, 16], "C'":[14, 8], "M'":[0, 16]}, w:360, ht:210, aria:"Phép chiếu song song lên (P) biến tam giác ABC thành tam giác A′B′C′, trung điểm M của BC thành trung điểm M′ của B′C′"}); };
const figCubeP1 = cubeFig({h:[['A', 'D'], ['B', 'C']], fill:[['D', 'C', "C'", "D'"]], aria:"Hình lập phương: chiếu A lên (DCC'D') theo phương BC được D"});
const figCubeP2 = cubeFig({h:[['A', "D'"], ['B', "C'"]], fill:[['D', 'C', "C'", "D'"]], aria:"Hình lập phương: chiếu AB lên (DCC'D') theo phương BC' được D'C'"});
const figCubeP3 = cubeFig({h:[['A', "B'"], ['D', 'C']], fill:[['A', 'B', 'C', 'D']], aria:"Hình lập phương: chiếu C' lên (ABCD) theo phương AB' được D"});
const SHY = 150;
const figShadow = spaceSVG({pts:{A:[50, SHY - 60], B:[50, SHY], C:[120, SHY], D:[200, SHY - 90], E:[200, SHY], F:[305, SHY]}, planes:[{q:[[10, SHY + 12], [330, SHY + 12], [336, SHY - 8], [16, SHY - 8]], lab:'', at:[330, SHY + 10]}], s:[['A', 'B'], ['D', 'E'], ['B', 'C'], ['E', 'F']], d:[['A', 'C'], ['D', 'F']], off:{A:[-12, 0], D:[-12, 0], B:[-12, 4], E:[-12, 4], C:[0, 14], F:[0, 14]}, w:340, ht:180, aria:'Hai cột thẳng đứng AB và DE có bóng BC và EF trên mặt đất: các tia nắng AC và DF song song'});

Lecture.add({ grade:'lop11', gradeName:'Toán 11', chapter:'Chương IV. Quan hệ song song trong không gian', lessons:[

{ id:'bai-10', name:'Bài 10. Đường thẳng và mặt phẳng trong không gian', desc:'Mặt phẳng, hình biểu diễn; sáu tính chất thừa nhận; ba cách xác định mặt phẳng; giao tuyến, giao điểm; hình chóp và tứ diện.', slides:[
  TITLE('Bài 10. Đường thẳng và mặt phẳng trong không gian', ['Biết kí hiệu điểm, đường thẳng, mặt phẳng và đọc hình biểu diễn (nét liền, nét đứt).', 'Nắm sáu tính chất thừa nhận và ba cách xác định một mặt phẳng.', 'Tìm giao tuyến của hai mặt phẳng và giao điểm của đường thẳng với mặt phẳng.', 'Nhận biết hình chóp, tứ diện; đếm mặt, cạnh, đỉnh.']),

  {kind:'kt', tag:'Kiến thức trọng tâm 1', title:'Mặt phẳng và hình biểu diễn',
   body: box(`Mặt phẳng không có bề dày, không có giới hạn; ta vẽ nó bằng một <b>hình bình hành</b> và ghi tên ${m('(P)')}, ${m('(Q)')}, ${m('(\\alpha)')}…`) +
     S(`Điểm ${m('A')} thuộc ${m('(P)')}: ${m('A \\in (P)')}. Điểm ${m('B')} không thuộc: ${m('B \\notin (P)')}. Đường thẳng ${m('d')} nằm trong ${m('(P)')}: ${m('d \\subset (P)')}.`) +
     S(`Trong hình biểu diễn: cạnh nhìn thấy vẽ <b>nét liền</b>, cạnh bị che khuất vẽ <b>nét đứt</b>; hai đường thẳng song song được vẽ song song; giữ nguyên quan hệ điểm thuộc đường thẳng.`),
   fig: planeFig},

  {kind:'kt', tag:'Kiến thức trọng tâm 2', title:'Sáu tính chất thừa nhận',
   body: `<ol><li>Qua hai điểm phân biệt có đúng một đường thẳng.</li><li>Qua ba điểm <b>không thẳng hàng</b> có đúng một mặt phẳng.</li><li>Nếu đường thẳng có hai điểm phân biệt thuộc mặt phẳng thì mọi điểm của nó thuộc mặt phẳng đó.</li><li>Tồn tại bốn điểm không cùng thuộc một mặt phẳng.</li><li>Hai mặt phẳng phân biệt có một điểm chung thì có chung đúng một đường thẳng, gọi là <b>giao tuyến</b>.</li><li>Trên mỗi mặt phẳng, các kết quả của hình học phẳng đều đúng.</li></ol>`},

  {kind:'kt', tag:'Kiến thức trọng tâm 3', title:'Ba cách xác định một mặt phẳng',
   body: box(`① Ba điểm không thẳng hàng: ${m('(ABC)')}.<br>② Một đường thẳng và một điểm không thuộc nó: ${m('(A,\\,d)')}.<br>③ Hai đường thẳng cắt nhau: ${m('(a,\\,b)')}.`) +
     note(`Ba điểm thẳng hàng chưa xác định mặt phẳng: có vô số mặt phẳng chứa chúng.`),
   fig: tetFig(['S', 'A', 'B', 'C'], {h:[['S', 'A'], ['S', 'B'], ['A', 'B']], aria:'Mặt phẳng (SAB) xác định bởi ba điểm S, A, B'})},

  {kind:'kt', tag:'Kiến thức trọng tâm 4', title:'Giao tuyến và giao điểm',
   body: box(`<b>Giao tuyến</b> của hai mặt phẳng là đường thẳng đi qua <b>hai điểm chung</b>.`) +
     S(`Cách làm: (1) tìm điểm chung thứ nhất (thường là đỉnh chóp); (2) tìm điểm chung thứ hai bằng cách lấy giao của hai đường thẳng, mỗi đường nằm trong một mặt phẳng.`) +
     S(`<b>Giao điểm</b> của đường thẳng ${m('d')} và mặt phẳng ${m('(P)')}: chọn mặt phẳng phụ ${m('(Q)')} chứa ${m('d')}, tìm giao tuyến ${m('a = (P) \\cap (Q)')}; khi đó ${m('d \\cap a')} chính là điểm cần tìm.`)},

  {kind:'kt', tag:'Kiến thức trọng tâm 5', title:'Hình chóp và tứ diện',
   body: box(`Hình chóp ${m('S.A_1A_2\\dots A_n')}: đỉnh ${m('S')}, đáy là đa giác ${m('n')} cạnh; có ${m('n')} mặt bên, ${m('n')} cạnh bên.<br>Tổng cộng ${m('n+1')} mặt, ${m('2n')} cạnh, ${m('n+1')} đỉnh.`) +
     S(`<b>Tứ diện</b> ${m('ABCD')}: 4 đỉnh, 6 cạnh, 4 mặt (mỗi mặt là một tam giác). Hai cạnh không có đỉnh chung gọi là hai cạnh đối diện.`),
   fig: pyFig()},

  /* ---- Dạng 1 ---- */
  {kind:'method', tag:'Dạng 1', title:'Kí hiệu và đọc hình biểu diễn',
   steps:[`Điểm với mặt phẳng: dùng ${m('\\in')}, ${m('\\notin')}; đường thẳng với mặt phẳng: dùng ${m('\\subset')}.`, `Điểm vẽ trong hình bình hành là thuộc mặt phẳng, điểm vẽ ngoài là không thuộc.`, `Nét liền – nét đứt cho biết cạnh nhìn thấy hay bị che khuất.`]},
  {kind:'vd', tag:'Ví dụ 1 · Dạng 1', label:'Ví dụ 1', de:`Quan sát hình: điểm ${m('A')} nằm trong hình bình hành ${m('(P)')}, điểm ${m('B')} nằm ngoài. Viết kí hiệu quan hệ của ${m('A')}, ${m('B')} với ${m('(P)')}; nêu quan hệ của đường thẳng ${m('AB')} với ${m('(P)')}.`, fig: planeFig,
   sol:[`${m('A')} vẽ trong hình bình hành nên ${m('A \\in (P)')}.`, `${m('B')} vẽ ngoài hình bình hành nên ${m('B \\notin (P)')}.`, `Nếu ${m('AB \\subset (P)')} thì mọi điểm của ${m('AB')}, kể cả ${m('B')}, thuộc ${m('(P)')} – trái giả thiết.`], ans:`${tb('A \\in (P)')}, ${tb('B \\notin (P)')}, ${tb('AB \\not\\subset (P)')}.`},

  /* ---- Dạng 2 ---- */
  {kind:'method', tag:'Dạng 2', title:'Vận dụng tính chất thừa nhận',
   steps:[`Xác định hai điểm phân biệt của đường thẳng thuộc mặt phẳng ⇒ cả đường thẳng nằm trong mặt phẳng (tính chất 3).`, `Dùng đúng điều kiện “không thẳng hàng” khi nói mặt phẳng đi qua ba điểm (tính chất 2).`, `Nhận ra phát biểu sai: ba điểm thẳng hàng, hai mặt phẳng phân biệt có đúng một điểm chung…`]},
  {kind:'vd', tag:'Ví dụ 2 · Dạng 2', label:'Ví dụ 2', de:`Cho ba điểm ${m('A, B, C')} không thẳng hàng, ${m('M')} là trung điểm của ${m('BC')}. Chứng minh ${m('AM \\subset (ABC)')}.`,
   sol:[`${m('B, C \\in (ABC)')} nên ${m('BC \\subset (ABC)')} (tính chất 3).`, `${m('M')} thuộc ${m('BC')} nên ${m('M \\in (ABC)')}.`, `${m('A, M')} là hai điểm phân biệt của ${m('(ABC)')} nên đường thẳng ${m('AM')} nằm trong ${m('(ABC)')} (tính chất 3).`], ans:`${tb('AM \\subset (ABC)')}.`},
  {kind:'vd', tag:'Ví dụ 3 · Dạng 2', label:'Ví dụ 3', de:`Hai đường thẳng ${m('a, b')} cắt nhau tại ${m('O')}; ${m('M \\in a')}, ${m('N \\in b')} (${m('M, N')} khác ${m('O')}). Chứng minh ${m('a, b, MN')} cùng nằm trong một mặt phẳng.`,
   sol:[`Hai đường thẳng cắt nhau ${m('a, b')} xác định đúng một mặt phẳng ${m('(a,b)')}.`, `${m('M \\in a \\subset (a,b)')} và ${m('N \\in b \\subset (a,b)')}, hai điểm phân biệt.`, `Nên ${m('MN \\subset (a,b)')} (tính chất 3).`], ans:`${tb('a, b, MN')} đồng phẳng trong ${tb('(a,b)')}.`},

  /* ---- Dạng 3 ---- */
  {kind:'method', tag:'Dạng 3', title:'Đếm số mặt phẳng xác định bởi các điểm',
   steps:[`Ba điểm không thẳng hàng xác định đúng một mặt phẳng: ban đầu có ${m('C_n^3')} bộ ba điểm.`, `Nếu có ${m('k')} điểm cùng thuộc một mặt phẳng (không ba điểm thẳng hàng): ${m('C_k^3')} bộ ba chỉ cho 1 mặt phẳng ⇒ lấy ${m('C_n^3 - C_k^3 + 1')}.`, `Có điểm thẳng hàng thì bỏ các bộ ba thẳng hàng.`]},
  {kind:'vd', tag:'Ví dụ 4 · Dạng 3', label:'Ví dụ 4', de:`Cho 5 điểm phân biệt, không có bốn điểm nào cùng thuộc một mặt phẳng. Hỏi xác định được bao nhiêu mặt phẳng đi qua ba trong năm điểm đó?`,
   sol:[`Ba điểm bất kì không thẳng hàng (vì không có 4 điểm đồng phẳng) nên mỗi bộ ba cho một mặt phẳng.`, `Các bộ ba khác nhau cho mặt phẳng khác nhau.`, `Số mặt phẳng: ${m('C_5^3 = 10')}.`], ans:`${tb('10')} mặt phẳng.`},
  {kind:'vd', tag:'Ví dụ 5 · Dạng 3', label:'Ví dụ 5', de:`Cho 6 điểm phân biệt, trong đó có đúng 4 điểm cùng thuộc một mặt phẳng, không có ba điểm nào thẳng hàng. Hỏi có bao nhiêu mặt phẳng phân biệt đi qua ba trong sáu điểm?`,
   sol:[`Số bộ ba điểm: ${m('C_6^3 = 20')}.`, `4 điểm đồng phẳng cho ${m('C_4^3 = 4')} bộ ba nhưng chỉ ứng với 1 mặt phẳng.`, `Số mặt phẳng: ${m('20 - 4 + 1 = 17')}.`], ans:`${tb('17')} mặt phẳng.`},

  /* ---- Dạng 4 ---- */
  {kind:'method', tag:'Dạng 4', title:'Tìm giao tuyến của hai mặt phẳng',
   steps:[`Tìm điểm chung thứ nhất (thường nhìn thấy ngay: đỉnh chóp).`, `Tìm điểm chung thứ hai: giao của hai đường thẳng, mỗi đường nằm trong một mặt phẳng.`, `Nối hai điểm chung: đó là giao tuyến.`]},
  {kind:'vd', tag:'Ví dụ 6 · Dạng 4', label:'Ví dụ 6', de:`Cho hình chóp ${m('S.ABCD')} có đáy là tứ giác lồi, hai đường chéo ${m('AC, BD')} cắt nhau tại ${m('O')}. Tìm giao tuyến của ${m('(SAC)')} và ${m('(SBD)')}.`, fig: pyFig({pts:{O}, d:[['A', 'C'], ['B', 'D'], ['S', 'O']]}),
   sol:[`${m('S')} thuộc cả hai mặt phẳng.`, `${m('O \\in AC \\subset (SAC)')} và ${m('O \\in BD \\subset (SBD)')} nên ${m('O')} là điểm chung thứ hai.`, `Giao tuyến đi qua ${m('S')} và ${m('O')}.`], ans:`${tb('(SAC) \\cap (SBD) = SO')}.`},
  {kind:'vd', tag:'Ví dụ 7 · Dạng 4', label:'Ví dụ 7', de:`Cho tam giác ${m('ABC')} và điểm ${m('S')} không thuộc ${m('(ABC)')}. ${m('M, N')} lần lượt là trung điểm của ${m('AB, AC')}. Tìm giao tuyến của ${m('(SBN)')} và ${m('(SCM)')}.`, fig: figG,
   sol:[`${m('BN, CM')} là hai trung tuyến của tam giác ${m('ABC')} nên cắt nhau tại trọng tâm ${m('G')}.`, `${m('G \\in BN \\subset (SBN)')}, ${m('G \\in CM \\subset (SCM)')}; ${m('S')} cũng là điểm chung.`, `Giao tuyến đi qua ${m('S, G')}.`], ans:`${tb('(SBN) \\cap (SCM) = SG')}.`},
  {kind:'vd', tag:'Ví dụ 8 · Dạng 4', label:'Ví dụ 8', de:`Cho hình chóp ${m('S.ABCD')} đáy là tứ giác lồi, ${m('AB')} cắt ${m('CD')} tại ${m('E')}. Tìm giao tuyến của ${m('(SAB)')} và ${m('(SCD)')}.`, fig: figE,
   sol:[`${m('S')} thuộc cả hai mặt phẳng.`, `${m('E \\in AB \\subset (SAB)')} và ${m('E \\in CD \\subset (SCD)')}.`, `Hai điểm chung ${m('S, E')}.`], ans:`${tb('(SAB) \\cap (SCD) = SE')}.`},

  /* ---- Dạng 5 ---- */
  {kind:'method', tag:'Dạng 5', title:'Hình chóp và tứ diện: đếm mặt, cạnh, đỉnh',
   steps:[`Gọi ${m('n')} là số cạnh đáy: ${m('n')} mặt bên, ${m('n+1')} mặt, ${m('2n')} cạnh, ${m('n+1')} đỉnh.`, `Đặt phương trình theo ${m('n')} từ dữ kiện (số mặt, tổng mặt và cạnh…).`, `Tứ diện: 4 đỉnh, 6 cạnh, 4 mặt; cạnh đối diện không chung đỉnh.`]},
  {kind:'vd', tag:'Ví dụ 9 · Dạng 5', label:'Ví dụ 9', de:`Hình chóp có đáy là lục giác có bao nhiêu mặt, cạnh, đỉnh?`,
   sol:[`Đáy lục giác: ${m('n = 6')}.`, `Số mặt ${m('n + 1 = 7')}; số cạnh ${m('2n = 12')}; số đỉnh ${m('n + 1 = 7')}.`], ans:`${tb('7 mặt, 12 cạnh, 7 đỉnh')}.`},
  {kind:'vd', tag:'Ví dụ 10 · Dạng 5', label:'Ví dụ 10', de:`Một hình chóp có tổng số mặt và số cạnh bằng 31. Đáy của hình chóp là đa giác bao nhiêu cạnh?`,
   sol:[`Gọi ${m('n')} là số cạnh đáy: số mặt ${m('n + 1')}, số cạnh ${m('2n')}.`, `${m('(n + 1) + 2n = 31 \\Rightarrow 3n = 30')}.`, `${m('n = 10')}.`], ans:`Đáy là ${tb('thập giác (10 cạnh)')}.`},

  /* ---- Dạng 6 ---- */
  {kind:'method', tag:'Dạng 6', title:'Giao điểm của đường thẳng và mặt phẳng',
   steps:[`Nếu đường thẳng ${m('d')} cắt một đường thẳng ${m('a \\subset (P)')} tại ${m('M')} thì ${m('M = d \\cap (P)')}.`, `Không thấy ngay: chọn mặt phẳng phụ chứa ${m('d')}.`, `Tìm giao tuyến của mặt phẳng phụ với ${m('(P)')}; giao của ${m('d')} với giao tuyến đó là điểm cần tìm.`]},
  {kind:'vd', tag:'Ví dụ 11 · Dạng 6', label:'Ví dụ 11', de:`Với ${m('S.ABCD')}, ${m('AB \\cap CD = E')} (hình ở Ví dụ 8). Tìm giao điểm của ${m('AB')} và ${m('(SCD)')}.`, fig: figE,
   sol:[`${m('E \\in AB')}.`, `${m('E \\in CD \\subset (SCD)')} nên ${m('E \\in (SCD)')}.`, `${m('AB \\not\\subset (SCD)')} nên giao điểm duy nhất là ${m('E')}.`], ans:`${tb('E = AB \\cap (SCD)')}.`},
  {kind:'vd', tag:'Ví dụ 12 · Dạng 6', label:'Ví dụ 12', de:`Hình chóp ${m('S.ABCD')}, đáy lồi, ${m('AC \\cap BD = O')}. ${m('M')} thuộc cạnh ${m('SA')} (khác ${m('S, A')}). Tìm giao điểm của ${m('SC')} và ${m('(MBD)')}.`, fig: figN,
   sol:[`Chọn mặt phẳng phụ ${m('(SAC)')} chứa ${m('SC')}.`, `${m('M, O')} thuộc cả ${m('(SAC)')} và ${m('(MBD)')} (vì ${m('O \\in BD')}) nên giao tuyến là ${m('MO')}.`, `Trong ${m('(SAC)')}, ${m('MO')} cắt ${m('SC')} tại ${m('N')}.`], ans:`${tb('N = SC \\cap (MBD)')}.`},

  /* ---- Luyện tập ---- */
  {kind:'lt', tag:'Luyện tập', label:'Bài 1', de:`Cho 4 điểm ${m('A, B, C, D')} không đồng phẳng. Có bao nhiêu mặt phẳng đi qua ba trong bốn điểm đó?`,
   sol:[`Không có ba điểm thẳng hàng (nếu có thì 4 điểm đồng phẳng).`, `Số mặt phẳng: ${m('C_4^3 = 4')}.`], ans:`${tb('4')} mặt phẳng.`},
  {kind:'lt', tag:'Luyện tập', label:'Bài 2', de:`Cho tứ diện ${m('ABCD')}, ${m('K')} là trung điểm của ${m('BC')}. Tìm giao tuyến của ${m('(AKD)')} và ${m('(ABC)')}.`, fig: tetFig(['A', 'B', 'D', 'C'], {pts:{K:mid(TET0[1], TET0[3])}, d:[['D', 'K']]}),
   sol:[`${m('A')} thuộc cả hai mặt phẳng.`, `${m('K \\in (AKD)')} và ${m('K \\in BC \\subset (ABC)')}.`], ans:`${tb('AK')}.`},
  {kind:'lt', tag:'Luyện tập', label:'Bài 3', de:`Một hình chóp có tổng số mặt và số đỉnh bằng 16. Đáy là đa giác bao nhiêu cạnh và hình chóp có bao nhiêu cạnh?`,
   sol:[`Gọi ${m('n')} là số cạnh đáy: số mặt ${m('n+1')}, số đỉnh ${m('n+1')}.`, `${m('(n+1) + (n+1) = 16 \\Rightarrow n = 7')}.`, `Số cạnh: ${m('2n = 14')}.`], ans:`Đáy ${tb('7')} cạnh; hình chóp có ${tb('14')} cạnh.`},
  {kind:'lt', tag:'Luyện tập', label:'Bài 4', de:`Cho hình chóp ${m('S.ABCD')} đáy là hình bình hành tâm ${m('O')}, ${m('M')} là trung điểm ${m('SC')}. Tìm giao điểm của ${m('SC')} và ${m('(MBD)')}.`,
   sol:[`${m('M \\in SC')}.`, `${m('M \\in (MBD)')}.`, `${m('SC \\not\\subset (MBD)')} nên giao điểm là ${m('M')}.`], ans:`${tb('M')}.`},

  {kind:'sum', tag:'Tổng kết', title:'Ghi nhớ',
   body:`<ul><li>${m('\\in, \\notin')} cho điểm; ${m('\\subset')} cho đường thẳng – mặt phẳng.</li><li>Ba cách xác định mặt phẳng: 3 điểm không thẳng hàng · điểm + đường thẳng · hai đường cắt nhau.</li><li>Giao tuyến: hai điểm chung; giao điểm: dùng mặt phẳng phụ.</li><li>Hình chóp đáy ${m('n')}-giác: ${m('n+1')} mặt, ${m('2n')} cạnh, ${m('n+1')} đỉnh.</li></ul>` + note(`Ba điểm thẳng hàng không xác định mặt phẳng; giao điểm hai đường phải ở cùng một mặt phẳng.`)}
]},

{ id:'bai-11', name:'Bài 11. Hai đường thẳng song song', desc:'Vị trí tương đối của hai đường thẳng; tính chất hai đường thẳng song song; định lí giao tuyến của ba mặt phẳng; đường trung bình và định lí Thales trong tứ diện, hình chóp.', slides:[
  TITLE('Bài 11. Hai đường thẳng song song', ['Phân biệt ba vị trí: cắt nhau, song song, chéo nhau; nhận biết trên tứ diện, hình chóp, hình lập phương.', 'Vận dụng tính chất bắc cầu và tính chất tồn tại duy nhất của đường thẳng song song.', 'Dùng định lí về giao tuyến của ba mặt phẳng và hệ quả để tìm giao tuyến.', 'Chứng minh hai đường thẳng song song bằng đường trung bình, định lí Thales, hình bình hành.']),

  {kind:'kt', tag:'Kiến thức trọng tâm 1', title:'Vị trí tương đối của hai đường thẳng',
   body: box(`Hai đường thẳng phân biệt có đúng một trong ba vị trí:<br>① <b>cắt nhau</b> – có đúng một điểm chung;<br>② <b>song song</b> – cùng nằm trong một mặt phẳng và không có điểm chung;<br>③ <b>chéo nhau</b> – <b>không</b> cùng nằm trong một mặt phẳng.`) +
     S(`Hai đường thẳng cắt nhau hoặc song song thì xác định một mặt phẳng; hai đường thẳng chéo nhau thì không có mặt phẳng nào chứa cả hai.`) +
     note(`“Không có điểm chung” chưa đủ để kết luận song song: hai đường thẳng chéo nhau cũng không có điểm chung.`),
   fig: figSkew},

  {kind:'kt', tag:'Kiến thức trọng tâm 2', title:'Tính chất của hai đường thẳng song song',
   body: box(`<b>Tồn tại duy nhất:</b> qua một điểm nằm ngoài đường thẳng ${m('d')} có <b>duy nhất</b> một đường thẳng song song với ${m('d')}.`) +
     box(`<b>Bắc cầu:</b> hai đường thẳng phân biệt cùng song song với một đường thẳng thứ ba thì song song với nhau.<br>${m('a \\parallel c,\\ b \\parallel c \\Rightarrow a \\parallel b')}`) +
     S(`Trong hình lập phương (hình hộp, lăng trụ): các cạnh bên đôi một song song.`),
   fig: cubeFig({h:[['A', "A'"], ['B', "B'"], ['C', "C'"]], hd:[], aria:"Ba cạnh AA', BB', CC' đôi một song song"})},

  {kind:'kt', tag:'Kiến thức trọng tâm 3', title:'Định lí về giao tuyến của ba mặt phẳng',
   body: box(`<b>Định lí.</b> Nếu ba mặt phẳng phân biệt đôi một cắt nhau theo ba giao tuyến phân biệt thì ba giao tuyến đó hoặc <b>đồng quy</b>, hoặc <b>đôi một song song</b>.`) +
     box(`<b>Hệ quả.</b> Hai mặt phẳng phân biệt lần lượt chứa hai đường thẳng song song thì giao tuyến của chúng (nếu có) song song với hai đường thẳng đó hoặc trùng với một trong hai đường thẳng đó.`) +
     S(`Ví dụ: ${m('S.ABCD')} có ${m('AD \\parallel BC')} thì ${m('(SAD) \\cap (SBC)')} là đường thẳng ${m('Sx')} qua ${m('S')}, ${m('Sx \\parallel AD \\parallel BC')}.`),
   fig: figSx},

  {kind:'kt', tag:'Kiến thức trọng tâm 4', title:'Các cách chứng minh hai đường thẳng song song',
   body: `<ul><li><b>Đường trung bình</b> của tam giác: ${m('MN \\parallel BC,\\ MN = \\dfrac{1}{2}BC')}.</li><li><b>Định lí Thales đảo</b>: ${m('\\dfrac{AM}{AB} = \\dfrac{AN}{AC} \\Rightarrow MN \\parallel BC')}.</li><li>Hình bình hành, hình thang (cạnh đối song song).</li><li><b>Bắc cầu</b> qua đường thẳng thứ ba.</li><li><b>Hệ quả</b> của định lí giao tuyến.</li></ul>`,
   fig: figMN},

  /* ---- Dạng 1 ---- */
  {kind:'method', tag:'Dạng 1', title:'Xác định vị trí tương đối của hai đường thẳng',
   steps:[`Hai cạnh có chung một đỉnh ⇒ <b>cắt nhau</b>.`, `Hai cạnh đối của một mặt (hình bình hành, hình vuông) hoặc cùng song song một cạnh thứ ba ⇒ <b>song song</b>.`, `Hai đường thẳng không có điểm chung và bốn đầu mút không đồng phẳng ⇒ <b>chéo nhau</b>.`]},
  {kind:'vd', tag:'Ví dụ 1 · Dạng 1', label:'Ví dụ 1', de:`Cho tứ diện ${m('ABCD')}. Xét vị trí tương đối của các cặp đường thẳng: a) ${m('AB')} và ${m('AC')}; b) ${m('AB')} và ${m('CD')}.`, fig: tetFig(tet4, {h:[['A', 'B'], ['C', 'D']], aria:'Tứ diện ABCD, hai cạnh AB và CD'}),
   sol:[`a) ${m('AB')} và ${m('AC')} có chung đỉnh ${m('A')} nên cắt nhau.`, `b) Nếu ${m('AB')} và ${m('CD')} cùng nằm trong một mặt phẳng thì bốn điểm ${m('A, B, C, D')} đồng phẳng – vô lí vì ${m('ABCD')} là tứ diện.`, `Hai đường thẳng này cũng không có điểm chung (không cắt nhau) nên chúng chéo nhau.`], ans:`a) ${tw('cắt nhau')}; b) ${tw('chéo nhau')}.`},
  {kind:'vd', tag:'Ví dụ 2 · Dạng 1', label:'Ví dụ 2', de:`Cho hình lập phương ${m("ABCD.A'B'C'D'")}. Xét vị trí tương đối của: a) ${m('AB')} và ${m('CD')}; b) ${m('BC')} và ${m("AA'")}; c) ${m('AC')} và ${m("A'C'")}.`, fig: cubeFig({h:[['B', 'C'], ['A', "A'"]], aria:"Hình lập phương, hai cạnh BC và AA'"}),
   sol:[`a) ${m('AB')} và ${m('CD')} là hai cạnh đối của hình vuông ${m('ABCD')} nên song song.`, `b) ${m('BC')} nằm trong mặt đáy, ${m("AA'")} cắt mặt đáy tại ${m('A')} (${m('A \\notin BC')}); hai đường thẳng không có điểm chung và không đồng phẳng nên chéo nhau.`, `c) ${m("AA'C'C")} là hình chữ nhật nên ${m("AC \\parallel A'C'")}.`], ans:`a) ${tw('song song')}; b) ${tw('chéo nhau')}; c) ${tw('song song')}.`},

  /* ---- Dạng 2 ---- */
  {kind:'method', tag:'Dạng 2', title:'Vận dụng tính chất của hai đường thẳng song song',
   steps:[`Muốn chứng minh ${m('a \\parallel b')}: tìm đường thẳng thứ ba ${m('c')} cùng song song với ${m('a')} và ${m('b')}.`, `Muốn chỉ ra hai đường không song song: giả sử chúng song song rồi dùng bắc cầu để dẫn tới mâu thuẫn.`, `Nhớ điều kiện: ba đường thẳng phải phân biệt.`]},
  {kind:'vd', tag:'Ví dụ 3 · Dạng 2', label:'Ví dụ 3', de:`Cho hình lập phương ${m("ABCD.A'B'C'D'")}. Chứng minh ${m("BB' \\parallel DD'")}.`, fig: cubeFig({h:[['B', "B'"]], hd:[['D', "D'"]], aria:"Hai cạnh BB' và DD' của hình lập phương"}),
   sol:[`${m("ABB'A'")} là hình vuông nên ${m("AA' \\parallel BB'")}.`, `${m("ADD'A'")} là hình vuông nên ${m("AA' \\parallel DD'")}.`, `${m("BB'")} và ${m("DD'")} phân biệt, cùng song song với ${m("AA'")} nên theo tính chất bắc cầu ${m("BB' \\parallel DD'")}.`], ans:`${tb("BB' \\parallel DD'")}.`},
  {kind:'vd', tag:'Ví dụ 4 · Dạng 2', label:'Ví dụ 4', de:`Cho ${m('a \\parallel b')} và đường thẳng ${m('c')} cắt ${m('a')}. Chứng minh ${m('c')} và ${m('b')} hoặc cắt nhau hoặc chéo nhau.`,
   sol:[`${m('c')} không trùng ${m('b')}: nếu trùng thì ${m('c \\parallel a')}, trái với giả thiết ${m('c')} cắt ${m('a')}.`, `${m('c')} không song song ${m('b')}: nếu ${m('c \\parallel b')} thì ${m('a \\parallel b')} và ${m('b \\parallel c')} suy ra ${m('a \\parallel c')} (bắc cầu), mâu thuẫn.`, `Vậy ${m('c')} và ${m('b')} không trùng, không song song: chúng cắt nhau hoặc chéo nhau.`], ans:`${tw('c cắt b hoặc c chéo b')}.`},

  /* ---- Dạng 3 ---- */
  {kind:'method', tag:'Dạng 3', title:'Đếm cặp đường thẳng theo vị trí tương đối',
   steps:[`Tổng số cặp cạnh: ${m('C_n^2')} với ${m('n')} là số cạnh.`, `Cặp cắt nhau (chung đỉnh): mỗi đỉnh có ${m('k')} cạnh cho ${m('C_k^2')} cặp.`, `Cặp song song: gom cạnh theo nhóm song song. Cặp chéo nhau = tổng − cắt − song song.`]},
  {kind:'vd', tag:'Ví dụ 5 · Dạng 3', label:'Ví dụ 5', de:`Cho tứ diện ${m('ABCD')}. Có bao nhiêu cặp cạnh chéo nhau?`, fig: figSkew,
   sol:[`Tứ diện có 6 cạnh, tổng ${m('C_6^2 = 15')} cặp.`, `Mỗi đỉnh có 3 cạnh, cho ${m('C_3^2 = 3')} cặp cắt nhau; 4 đỉnh cho ${m('4 \\cdot 3 = 12')} cặp.`, `Tứ diện không có cạnh song song nên số cặp chéo nhau là ${m('15 - 12 = 3')} (ba cặp cạnh đối).`], ans:`${tb('3')} cặp.`},
  {kind:'vd', tag:'Ví dụ 6 · Dạng 3', label:'Ví dụ 6', de:`Cho hình lập phương ${m("ABCD.A'B'C'D'")}. Có bao nhiêu cạnh chéo nhau với cạnh ${m('AB')}?`, fig: cubeFig({h:[['A', 'B']], aria:'Cạnh AB của hình lập phương'}),
   sol:[`Loại các cạnh có chung đỉnh với ${m('AB')}: ${m("AD, AA', BC, BB'")}.`, `Loại các cạnh song song với ${m('AB')}: ${m("CD, A'B', C'D'")}.`, `Còn lại ${m("CC', DD', B'C', A'D'")}: đều chéo nhau với ${m('AB')}.`], ans:`${tb('4')} cạnh.`},

  /* ---- Dạng 4 ---- */
  {kind:'method', tag:'Dạng 4', title:'Giao tuyến của hai mặt phẳng chứa hai đường thẳng song song',
   steps:[`Chỉ ra điểm chung thứ nhất (thường là đỉnh chóp ${m('S')}).`, `Tìm hai đường thẳng song song, mỗi đường nằm trong một mặt phẳng.`, `Kết luận: giao tuyến là đường thẳng qua điểm chung và song song với hai đường thẳng đó.`]},
  {kind:'vd', tag:'Ví dụ 7 · Dạng 4', label:'Ví dụ 7', de:`Cho hình chóp ${m('S.ABCD')} có đáy là hình bình hành. Tìm giao tuyến của hai mặt phẳng ${m('(SAD)')} và ${m('(SBC)')}.`, fig: figSx,
   sol:[`${m('S')} là điểm chung của hai mặt phẳng.`, `${m('AD \\subset (SAD)')}, ${m('BC \\subset (SBC)')} và ${m('AD \\parallel BC')} (đáy là hình bình hành).`, `Theo hệ quả của định lí giao tuyến, giao tuyến là đường thẳng ${m('Sx')} qua ${m('S')}, song song với ${m('AD')} và ${m('BC')}.`], ans:`${tb('Sx \\parallel AD \\parallel BC')}.`},
  {kind:'vd', tag:'Ví dụ 8 · Dạng 4', label:'Ví dụ 8', de:`Cho hình chóp ${m('S.ABCD')} có đáy là hình bình hành. ${m('M')} là trung điểm của ${m('SA')}. Tìm giao tuyến của ${m('(MBC)')} và ${m('(SAD)')}. Giao tuyến cắt ${m('SD')} tại ${m('N')}: tính ${m('MN')} khi ${m('AD = 8')}.`, fig: figMid,
   sol:[`${m('M')} là điểm chung của ${m('(MBC)')} và ${m('(SAD)')}.`, `${m('BC \\subset (MBC)')}, ${m('AD \\subset (SAD)')}, ${m('BC \\parallel AD')} nên giao tuyến là đường thẳng qua ${m('M')} song song ${m('AD')}; nó cắt ${m('SD')} tại ${m('N')}.`, `${m('M')} là trung điểm ${m('SA')} và ${m('MN \\parallel AD')} nên ${m('N')} là trung điểm ${m('SD')}; ${m('MN')} là đường trung bình của tam giác ${m('SAD')}: ${m('MN = \\dfrac{1}{2}AD = 4')}.`], ans:`Giao tuyến ${tb('MN \\parallel AD')}; ${tb('MN = 4')}.`},

  /* ---- Dạng 5 ---- */
  {kind:'method', tag:'Dạng 5', title:'Đường trung bình và định lí Thales trong tứ diện',
   steps:[`Nhìn ra tam giác chứa hai trung điểm (hoặc hai điểm chia cùng tỉ số).`, `Đường nối hai trung điểm là đường trung bình: song song cạnh thứ ba và bằng một nửa.`, `Hai điểm chia cạnh theo cùng tỉ số ${m('k')}: song song cạnh thứ ba và bằng ${m('k')} lần (Thales).`]},
  {kind:'vd', tag:'Ví dụ 9 · Dạng 5', label:'Ví dụ 9', de:`Cho tứ diện ${m('ABCD')}. ${m('M, N')} lần lượt là trung điểm của ${m('AB, AC')}. Chứng minh ${m('MN \\parallel BC')} và tính ${m('MN')} khi ${m('BC = 8')}.`, fig: figMN,
   sol:[`Trong tam giác ${m('ABC')}, ${m('MN')} nối trung điểm của ${m('AB')} và ${m('AC')}.`, `Nên ${m('MN')} là đường trung bình: ${m('MN \\parallel BC')}.`, `${m('MN = \\dfrac{1}{2}BC = 4')}.`], ans:`${tb('MN \\parallel BC')}, ${tb('MN = 4')}.`},
  {kind:'vd', tag:'Ví dụ 10 · Dạng 5', label:'Ví dụ 10', de:`Cho tứ diện ${m('ABCD')}. Gọi ${m('M, N, P, Q')} lần lượt là trung điểm của ${m('AB, BC, CD, DA')}. Chứng minh ${m('MNPQ')} là hình bình hành.`, fig: figMNPQ,
   sol:[`${m('MN')} là đường trung bình của tam giác ${m('ABC')}: ${m('MN \\parallel AC')}, ${m('MN = \\dfrac{1}{2}AC')}.`, `${m('QP')} là đường trung bình của tam giác ${m('ACD')}: ${m('QP \\parallel AC')}, ${m('QP = \\dfrac{1}{2}AC')}.`, `Suy ra ${m('MN \\parallel QP')} và ${m('MN = QP')}. Tứ giác ${m('MNPQ')} có hai cạnh đối song song và bằng nhau.`], ans:`${tb('MNPQ')} là hình bình hành; chu vi bằng ${m('AC + BD')}.`},
  {kind:'vd', tag:'Ví dụ 11 · Dạng 5', label:'Ví dụ 11', de:`Cho tứ diện ${m('ABCD')}. ${m('M \\in AB')}, ${m('N \\in AC')} sao cho ${m('\\dfrac{AM}{AB} = \\dfrac{AN}{AC} = \\dfrac{2}{3}')}. Chứng minh ${m('MN \\parallel BC')} và tính ${m('MN')} khi ${m('BC = 9')}.`, fig: tetFig(tet4, {pts:{M:mid(TET0[0], TET0[1], 2 / 3), N:mid(TET0[0], TET0[2], 2 / 3)}, s:[['M', 'N']], aria:'Tứ diện ABCD, AM/AB = AN/AC = 2/3'}),
   sol:[`Trong tam giác ${m('ABC')}: ${m('\\dfrac{AM}{AB} = \\dfrac{AN}{AC}')}.`, `Theo định lí Thales đảo, ${m('MN \\parallel BC')}.`, `Tỉ số đồng dạng ${m('\\dfrac{2}{3}')} nên ${m('MN = \\dfrac{2}{3} \\cdot 9 = 6')}.`], ans:`${tb('MN \\parallel BC')}, ${tb('MN = 6')}.`},

  /* ---- Dạng 6 ---- */
  {kind:'method', tag:'Dạng 6', title:'Chứng minh song song và đồng phẳng trong hình chóp',
   steps:[`Dùng đường trung bình để có một cặp đường song song trong mặt bên.`, `Bắc cầu qua cạnh đáy song song để chứng minh bốn điểm đồng phẳng (hình thang).`, `Muốn chứng minh một đường song song với cạnh đáy: dùng giao tuyến của ba mặt phẳng.`]},
  {kind:'vd', tag:'Ví dụ 12 · Dạng 6', label:'Ví dụ 12', de:`Cho hình chóp ${m('S.ABCD')} có đáy là hình bình hành. ${m('M, N')} lần lượt là trung điểm của ${m('SA, SB')}. Chứng minh bốn điểm ${m('M, N, C, D')} cùng thuộc một mặt phẳng và ${m('MNCD')} là hình thang.`, fig: figMNCD,
   sol:[`${m('MN')} là đường trung bình của tam giác ${m('SAB')}: ${m('MN \\parallel AB')} và ${m('MN = \\dfrac{1}{2}AB')}.`, `${m('AB \\parallel CD')} (hình bình hành) nên ${m('MN \\parallel CD')} (bắc cầu).`, `Hai đường thẳng song song ${m('MN, CD')} xác định một mặt phẳng nên ${m('M, N, C, D')} đồng phẳng. Vì ${m('MN = \\dfrac{1}{2}CD \\neq CD')} nên ${m('MNCD')} là hình thang.`], ans:`${tb('MNCD')} là hình thang (đáy ${m('MN, CD')}).`},
  {kind:'vd', tag:'Ví dụ 13 · Dạng 6', label:'Ví dụ 13', de:`Với giả thiết của Ví dụ 12, gọi ${m('I')} là giao điểm của ${m('MD')} và ${m('NC')}. Chứng minh ${m('SI \\parallel AD')}.`, fig: figMNCD,
   sol:[`${m('I \\in MD \\subset (SAD)')} và ${m('I \\in NC \\subset (SBC)')}, nên ${m('I')} thuộc giao tuyến của ${m('(SAD)')} và ${m('(SBC)')}.`, `${m('S')} cũng là điểm chung, vậy giao tuyến của hai mặt phẳng này là ${m('SI')}.`, `${m('AD \\parallel BC')}, ${m('AD \\subset (SAD)')}, ${m('BC \\subset (SBC)')} nên giao tuyến ${m('SI')} song song với ${m('AD')}.`], ans:`${tb('SI \\parallel AD')}.`},

  {kind:'lt', tag:'Luyện tập', label:'Bài 1', de:`Cho hình chóp ${m('S.ABCD')} có đáy ${m('ABCD')} là hình thang với ${m('AB \\parallel CD')}, ${m('AB \\neq CD')}. a) Tìm giao tuyến của ${m('(SAB)')} và ${m('(SCD)')}. b) Gọi ${m('E = AD \\cap BC')}. Tìm giao tuyến của ${m('(SAD)')} và ${m('(SBC)')}.`,
   sol:[`a) ${m('S')} chung, ${m('AB \\subset (SAB)')}, ${m('CD \\subset (SCD)')}, ${m('AB \\parallel CD')} nên giao tuyến là đường thẳng qua ${m('S')} song song với ${m('AB')} và ${m('CD')}.`, `b) ${m('E \\in AD \\subset (SAD)')} và ${m('E \\in BC \\subset (SBC)')}; ${m('S')} cũng là điểm chung.`, `Vậy giao tuyến của ${m('(SAD)')} và ${m('(SBC)')} là ${m('SE')}.`], ans:`a) ${tb('Sx \\parallel AB \\parallel CD')}; b) ${tb('SE')}.`},
  {kind:'lt', tag:'Luyện tập', label:'Bài 2', de:`Cho tứ diện ${m('ABCD')}. Các điểm ${m('M, N, P')} lần lượt thuộc ${m('AB, AC, AD')} sao cho ${m('\\dfrac{AM}{AB} = \\dfrac{AN}{AC} = \\dfrac{AP}{AD} = \\dfrac{1}{3}')}. Chứng minh ${m('MN \\parallel BC')}, ${m('NP \\parallel CD')} và tính tỉ số chu vi hai tam giác ${m('MNP')} và ${m('BCD')}.`,
   sol:[`Thales đảo: ${m('MN \\parallel BC')}, ${m('NP \\parallel CD')}, ${m('MP \\parallel BD')}.`, `${m('MN = \\dfrac{1}{3}BC')}, ${m('NP = \\dfrac{1}{3}CD')}, ${m('MP = \\dfrac{1}{3}BD')}.`, `Chu vi ${m('MNP')} bằng ${m('\\dfrac{1}{3}')} chu vi ${m('BCD')}.`], ans:`Tỉ số chu vi ${tb('\\dfrac{1}{3}')}.`},
  {kind:'lt', tag:'Luyện tập', label:'Bài 3', de:`Cho hình lập phương ${m("ABCD.A'B'C'D'")}. Xét vị trí tương đối của ${m('AC')} và ${m("B'D'")}.`, fig: cubeFig({h:[['A', 'C'], ["B'", "D'"]], aria:"Hai đường chéo AC và B'D' của hai mặt đối diện"}),
   sol:[`${m('AC \\subset (ABCD)')}, ${m("B'D' \\subset (A'B'C'D')")}; hai mặt phẳng này song song nên hai đường không có điểm chung.`, `${m("AC \\parallel A'C'")} mà ${m("A'C'")} cắt ${m("B'D'")} nên ${m("AC")} không song song ${m("B'D'")} (nếu song song thì ${m("A'C' \\parallel B'D'")}, vô lí).`, `Không có điểm chung và không song song ⇒ chéo nhau.`], ans:`${tw('chéo nhau')}.`},
  {kind:'lt', tag:'Luyện tập', label:'Bài 4', de:`Cho tứ diện ${m('ABCD')} có ${m('AC \\perp BD')}. ${m('M, N, P, Q')} là trung điểm của ${m('AB, BC, CD, DA')}. Chứng minh ${m('MNPQ')} là hình chữ nhật.`, fig: figMNPQ,
   sol:[`${m('MNPQ')} là hình bình hành (Ví dụ 10).`, `${m('MN \\parallel AC')} và ${m('NP \\parallel BD')}; mà ${m('AC \\perp BD')} nên ${m('MN \\perp NP')}.`, `Hình bình hành có một góc vuông là hình chữ nhật.`], ans:`${tw('MNPQ là hình chữ nhật')}.`},

  {kind:'sum', tag:'Tổng kết', title:'Ghi nhớ',
   body:`<ul><li>Hai đường thẳng phân biệt: <b>cắt nhau</b>, <b>song song</b> (đồng phẳng, không điểm chung) hoặc <b>chéo nhau</b> (không đồng phẳng).</li><li>Qua một điểm ngoài ${m('d')} có duy nhất một đường thẳng song song ${m('d')}; hai đường cùng song song đường thứ ba thì song song với nhau.</li><li>Ba mặt phẳng đôi một cắt nhau: ba giao tuyến đồng quy hoặc đôi một song song; hệ quả cho giao tuyến của hai mặt phẳng chứa hai đường song song.</li><li>Công cụ chứng minh song song: đường trung bình, Thales đảo, bắc cầu, hình bình hành.</li></ul>` + note(`Không có điểm chung chưa chắc song song – còn có thể chéo nhau.`)},
]},
{ id:'bai-12', name:'Bài 12. Đường thẳng và mặt phẳng song song', desc:'Vị trí tương đối của đường thẳng và mặt phẳng; điều kiện và tính chất song song; chứng minh đường thẳng song song mặt phẳng; giao tuyến; thiết diện song song với hai đường thẳng chéo nhau.', slides:[
  TITLE('Bài 12. Đường thẳng và mặt phẳng song song', ['Phân biệt ba vị trí của đường thẳng và mặt phẳng: cắt nhau, song song, đường thẳng nằm trong mặt phẳng.', 'Nắm điều kiện để đường thẳng song song với mặt phẳng và các tính chất, hệ quả.', 'Chứng minh đường thẳng song song với mặt phẳng bằng đường trung bình, định lí Thales.', 'Xác định giao tuyến, thiết diện song song với hai đường thẳng chéo nhau và tính độ dài.']),

  {kind:'kt', tag:'Kiến thức trọng tâm 1', title:'Vị trí tương đối của đường thẳng và mặt phẳng',
   body: box(`Đường thẳng ${m('d')} và mặt phẳng ${m('(P)')} có đúng một trong ba vị trí:<br>① <b>cắt nhau</b> – có đúng một điểm chung;<br>② <b>song song</b> – không có điểm chung, kí hiệu ${m('d \\parallel (P)')};<br>③ <b>${m('d')} nằm trong ${m('(P)')}</b> – có ít nhất hai điểm chung, kí hiệu ${m('d \\subset (P)')}.`) +
     note(`Nếu ${m('d')} có hai điểm chung với ${m('(P)')} thì ${m('d')} nằm trong ${m('(P)')} (tính chất thừa nhận của Bài 10).`),
   fig: figPos},

  {kind:'kt', tag:'Kiến thức trọng tâm 2', title:'Điều kiện để đường thẳng song song với mặt phẳng',
   body: box(`<b>Định lí.</b> Nếu đường thẳng ${m('d')} <b>không nằm</b> trong ${m('(P)')} và ${m('d')} song song với một đường thẳng ${m("d'")} nằm trong ${m('(P)')} thì ${m('d \\parallel (P)')}.<br>${m("d \\not\\subset (P),\\ d \\parallel d' \\subset (P) \\Rightarrow d \\parallel (P)")}`) +
     S(`Ví dụ: ${m('M, N')} là trung điểm ${m('AB, AC')} thì ${m('MN \\parallel BC')} và ${m('BC \\subset (BCD)')}, ${m('MN \\not\\subset (BCD)')} nên ${m('MN \\parallel (BCD)')}.`) +
     note(`Hai điều kiện đi cùng nhau: thiếu “${m('d \\not\\subset (P)')}” thì ${m('d')} có thể nằm trong ${m('(P)')}.`),
   fig: figParMN},

  {kind:'kt', tag:'Kiến thức trọng tâm 3', title:'Tính chất của đường thẳng song song với mặt phẳng',
   body: box(`<b>Tính chất 1.</b> Nếu ${m('d \\parallel (P)')} thì trong ${m('(P)')} có đường thẳng song song với ${m('d')}.`) +
     box(`<b>Tính chất 2.</b> Nếu ${m('d \\parallel (P)')}, mặt phẳng ${m('(Q)')} chứa ${m('d')} và cắt ${m('(P)')} theo giao tuyến ${m("d'")} thì ${m("d' \\parallel d")}.`) +
     box(`<b>Hệ quả.</b> Hai mặt phẳng cắt nhau cùng song song với một đường thẳng thì giao tuyến của chúng song song với đường thẳng đó.`) +
     note(`${m('d \\parallel (P)')} không có nghĩa ${m('d')} song song với <b>mọi</b> đường thẳng trong ${m('(P)')}: có đường thẳng trong ${m('(P)')} chéo nhau với ${m('d')}.`),
   fig: figCubeCC},

  {kind:'kt', tag:'Kiến thức trọng tâm 4', title:'Thiết diện song song với hai đường thẳng chéo nhau',
   body: S(`Cho tứ diện ${m('ABCD')}, điểm ${m('M')} thuộc ${m('AB')}. Mặt phẳng ${m('(\\alpha)')} qua ${m('M')} và song song với ${m('BC')}, ${m('AD')} cắt các mặt của tứ diện theo hình bình hành ${m('MNPQ')} (${m('MN \\parallel PQ \\parallel BC')}, ${m('MQ \\parallel NP \\parallel AD')}).`) +
     box(`Với ${m('\\dfrac{AM}{AB} = k')}: ${m('MN = k\\cdot BC')}, ${m('MQ = (1 - k)\\cdot AD')}, chu vi ${m('MNPQ = 2\\,[k\\cdot BC + (1 - k)\\cdot AD]')}.`) +
     note(`Hai cạnh kề của hình bình hành lấy tỉ lệ <b>${m('k')}</b> và <b>${m('1 - k')}</b>: đừng dùng cùng một tỉ số cho cả hai.`),
   fig: secFig(1 / 3)},

  /* ---- Dạng 1 ---- */
  {kind:'method', tag:'Dạng 1', title:'Xác định vị trí tương đối của đường thẳng và mặt phẳng',
   steps:[`Hai đầu mút của đoạn thẳng cùng thuộc mặt phẳng ⇒ đường thẳng <b>nằm trong</b> mặt phẳng.`, `Có một điểm chung và đường thẳng không nằm trong mặt phẳng ⇒ <b>cắt nhau</b>.`, `Không có điểm chung: tìm đường thẳng trong mặt phẳng song song với nó; có ⇒ <b>song song</b>.`]},
  {kind:'vd', tag:'Ví dụ 1 · Dạng 1', label:'Ví dụ 1', de:`Cho hình lập phương ${m("ABCD.A'B'C'D'")}. Xét vị trí tương đối của: a) ${m("AA'")} và ${m("(BCC'B')")}; b) ${m('BD')} và ${m("(A'B'C'D')")}; c) ${m("AC'")} và ${m('(ABCD)')}.`, fig: cubeFig({h:[['A', "A'"], ['B', 'D'], ['A', "C'"]], fill:[['B', 'C', "C'", "B'"]], aria:"Hình lập phương, các đường AA', BD, AC'"}),
   sol:[`a) ${m("AA' \\parallel BB'")}, ${m("BB' \\subset (BCC'B')")} và ${m("AA'")} không nằm trong mặt phẳng này, nên ${m("AA' \\parallel (BCC'B')")}.`, `b) ${m("BD \\parallel B'D'")} (hai đường chéo của hai đáy), ${m("B'D' \\subset (A'B'C'D')")} và ${m('BD')} không nằm trong ${m("(A'B'C'D')")}, nên ${m("BD \\parallel (A'B'C'D')")}.`, `c) ${m("AC'")} có điểm chung ${m('A')} với ${m('(ABCD)')} và ${m("C' \\notin (ABCD)")} nên ${m("AC'")} cắt ${m('(ABCD)')} tại ${m('A')}.`], ans:`a) ${tw('song song')}; b) ${tw('song song')}; c) ${tw('cắt nhau tại A')}.`},
  {kind:'vd', tag:'Ví dụ 2 · Dạng 1', label:'Ví dụ 2', de:`Cho hình chóp ${m('S.ABCD')} có đáy là hình bình hành. Xét vị trí tương đối của: a) ${m('AB')} và ${m('(SCD)')}; b) ${m('SA')} và ${m('(SBC)')}; c) ${m('BC')} và ${m('(SAD)')}.`, fig: pgFig({h:[['A', 'B']], fill:[['S', 'C', 'D']], aria:'Hình chóp S.ABCD, đường AB và mặt phẳng (SCD)'}),
   sol:[`a) ${m('AB \\parallel CD')}, ${m('CD \\subset (SCD)')}, ${m('AB \\not\\subset (SCD)')} nên ${m('AB \\parallel (SCD)')}.`, `b) ${m('SA')} có điểm chung ${m('S')} với ${m('(SBC)')} và ${m('A \\notin (SBC)')} nên ${m('SA')} cắt ${m('(SBC)')} tại ${m('S')}.`, `c) ${m('BC \\parallel AD')}, ${m('AD \\subset (SAD)')}, ${m('BC \\not\\subset (SAD)')} nên ${m('BC \\parallel (SAD)')}.`], ans:`a) ${tw('song song')}; b) ${tw('cắt nhau tại S')}; c) ${tw('song song')}.`},

  /* ---- Dạng 2 ---- */
  {kind:'method', tag:'Dạng 2', title:'Vận dụng điều kiện và tính chất',
   steps:[`Muốn chứng minh ${m('d \\parallel (P)')}: chỉ ra ${m("d' \\subset (P)")}, ${m("d \\parallel d'")} và nói rõ ${m('d \\not\\subset (P)')}.`, `Biết ${m('d \\parallel (P)')}: mặt phẳng chứa ${m('d')} cắt ${m('(P)')} theo giao tuyến song song ${m('d')}.`, `Phát biểu thiếu điều kiện hoặc “mọi”, “bất kì” thường là phát biểu sai: tìm phản ví dụ trên hình hộp, hình chóp.`]},
  {kind:'vd', tag:'Ví dụ 3 · Dạng 2', label:'Ví dụ 3', de:`Cho đường thẳng ${m('a \\parallel (P)')}. Các khẳng định sau đúng hay sai? a) Trong ${m('(P)')} có vô số đường thẳng song song với ${m('a')}. b) ${m('a')} song song với mọi đường thẳng nằm trong ${m('(P)')}. c) Mọi đường thẳng ${m('b')} song song ${m('a')} đều song song ${m('(P)')}.`,
   sol:[`a) Đúng: qua mỗi điểm của ${m('(P)')} kẻ được một đường thẳng song song ${m('a')} và nằm trong ${m('(P)')} (Tính chất 1).`, `b) Sai: những đường thẳng trong ${m('(P)')} không song song ${m('a')} thì chéo nhau với ${m('a')} (không có điểm chung vì ${m('a \\parallel (P)')}).`, `c) Sai: ${m('b')} có thể nằm trong ${m('(P)')} (khi ${m('b')} là đường thẳng trong ${m('(P)')} song song ${m('a')}); thiếu điều kiện ${m('b \\not\\subset (P)')}.`], ans:`a) ${tw('Đúng')}; b) ${tw('Sai')}; c) ${tw('Sai')}.`},
  {kind:'vd', tag:'Ví dụ 4 · Dạng 2', label:'Ví dụ 4', de:`Cho hình lăng trụ ${m("ABC.A'B'C'")}. Chứng minh ${m("AA' \\parallel (BCC'B')")} và ${m("BC \\parallel (A'B'C')")}.`, fig: figPrismAA,
   sol:[`${m("AA' \\parallel BB'")} (hình bình hành ${m("ABB'A'")}), ${m("BB' \\subset (BCC'B')")}.`, `${m("AA' \\not\\subset (BCC'B')")} vì ${m('A \\notin (BCC\'B\')')}. Vậy ${m("AA' \\parallel (BCC'B')")}.`, `${m("BC \\parallel B'C'")} (hình bình hành ${m("BCC'B'")}), ${m("B'C' \\subset (A'B'C')")} và ${m('BC \\not\\subset (A\'B\'C\')')}, nên ${m("BC \\parallel (A'B'C')")}.`], ans:`${tb("AA' \\parallel (BCC'B')")}, ${tb("BC \\parallel (A'B'C')")}.`},

  /* ---- Dạng 3 ---- */
  {kind:'method', tag:'Dạng 3', title:'Đếm cạnh, đếm cặp (cạnh, mặt phẳng)',
   steps:[`Với một mặt cho trước, phân loại từng cạnh của hình: <b>nằm trong</b>, <b>song song</b>, <b>cắt</b>.`, `Hình lập phương: mỗi mặt có 4 cạnh nằm trong, 4 cạnh song song (mặt đối diện), 4 cạnh cắt.`, `Đếm cặp (cạnh, mặt): nhân theo nhóm rồi cộng; kiểm tra tổng bằng (số cạnh) × (số mặt).`]},
  {kind:'vd', tag:'Ví dụ 5 · Dạng 3', label:'Ví dụ 5', de:`Cho hình lập phương ${m("ABCD.A'B'C'D'")}. Có bao nhiêu cạnh của hình song song với ${m("(ABB'A')")}? Bao nhiêu cạnh nằm trong mặt phẳng đó? Bao nhiêu cạnh cắt nó?`, fig: figCubeFace,
   sol:[`Nằm trong ${m("(ABB'A')")}: ${m("AB, BB', A'B', AA'")} – 4 cạnh.`, `Song song: các cạnh của mặt đối diện ${m("(CDD'C')")}: ${m("CD, DD', C'D', CC'")} – 4 cạnh.`, `Còn lại ${m("AD, BC, A'D', B'C'")} cắt mặt phẳng lần lượt tại ${m("A, B, A', B'")}: 4 cạnh. Kiểm tra: ${m('4 + 4 + 4 = 12')}.`], ans:`${tb('4')} cạnh song song, ${tb('4')} cạnh nằm trong, ${tb('4')} cạnh cắt.`},
  {kind:'vd', tag:'Ví dụ 6 · Dạng 3', label:'Ví dụ 6', de:`Cho hình lập phương ${m("ABCD.A'B'C'D'")}. Xét các cặp gồm một cạnh và một mặt của hình (12 cạnh, 6 mặt). Có bao nhiêu cặp mà cạnh song song với mặt?`,
   sol:[`Mỗi mặt có đúng 4 cạnh song song với nó (4 cạnh của mặt đối diện).`, `Có 6 mặt nên số cặp là ${m('6\\cdot 4 = 24')}.`, `Kiểm tra theo cạnh: mỗi cạnh song song với 2 mặt, ${m('12\\cdot 2 = 24')}.`], ans:`${tb('24')} cặp.`},

  /* ---- Dạng 4 ---- */
  {kind:'method', tag:'Dạng 4', title:'Giao tuyến liên quan đến đường thẳng song song mặt phẳng',
   steps:[`Tìm điểm chung thứ nhất của hai mặt phẳng (đỉnh chóp, điểm đã cho).`, `Nếu một đường thẳng song song với <b>cả hai</b> mặt phẳng thì giao tuyến song song với đường thẳng đó (hệ quả).`, `Nếu ${m('d \\parallel (P)')} và ${m('(Q) \\supset d')} thì giao tuyến ${m('(P) \\cap (Q)')} đi qua điểm chung và song song ${m('d')}.`]},
  {kind:'vd', tag:'Ví dụ 7 · Dạng 4', label:'Ví dụ 7', de:`Cho hình lập phương ${m("ABCD.A'B'C'D'")}. Chứng minh ${m("AA'")} song song với cả hai mặt phẳng ${m("(BCC'B')")} và ${m("(CDD'C')")}, rồi suy ra quan hệ của ${m("AA'")} với giao tuyến của hai mặt phẳng đó.`, fig: figCubeCC,
   sol:[`${m("AA' \\parallel BB'")}, ${m("BB' \\subset (BCC'B')")} và ${m("AA' \\not\\subset (BCC'B')")} nên ${m("AA' \\parallel (BCC'B')")}.`, `${m("AA' \\parallel DD'")}, ${m("DD' \\subset (CDD'C')")} và ${m("AA' \\not\\subset (CDD'C')")} nên ${m("AA' \\parallel (CDD'C')")}.`, `Hai mặt phẳng có chung hai điểm ${m("C, C'")} nên giao tuyến là ${m("CC'")}. Theo hệ quả: ${m("CC' \\parallel AA'")}.`], ans:`${tb("(BCC'B') \\cap (CDD'C') = CC'")}, ${tb("CC' \\parallel AA'")}.`},
  {kind:'vd', tag:'Ví dụ 8 · Dạng 4', label:'Ví dụ 8', de:`Cho hình chóp ${m('S.ABCD')} có đáy là hình bình hành. Tìm giao tuyến của hai mặt phẳng ${m('(SAB)')} và ${m('(SCD)')}.`, fig: figSxAB,
   sol:[`${m('S')} là điểm chung của hai mặt phẳng.`, `${m('CD \\parallel AB')}, ${m('AB \\subset (SAB)')}, ${m('CD \\not\\subset (SAB)')} nên ${m('CD \\parallel (SAB)')}.`, `${m('(SCD)')} chứa ${m('CD')} và cắt ${m('(SAB)')}, nên giao tuyến là đường thẳng ${m('Sx')} qua ${m('S')} song song ${m('CD')} (và song song ${m('AB')}).`], ans:`${tb('(SAB) \\cap (SCD) = Sx,\\ Sx \\parallel AB \\parallel CD')}.`},

  /* ---- Dạng 5 ---- */
  {kind:'method', tag:'Dạng 5', title:'Chứng minh đường thẳng song song với mặt phẳng',
   steps:[`Tìm đường thẳng ${m("d'")} nằm trong mặt phẳng và song song ${m('d')}: đường trung bình, Thales đảo, cạnh đối hình bình hành.`, `Kiểm tra ${m('d')} không nằm trong mặt phẳng (chỉ ra một điểm của ${m('d')} không thuộc mặt phẳng).`, `Viết kết luận đủ hai điều kiện rồi mới tính độ dài (nếu có).`]},
  {kind:'vd', tag:'Ví dụ 9 · Dạng 5', label:'Ví dụ 9', de:`Cho tứ diện ${m('ABCD')}. ${m('M, N')} là trung điểm của ${m('AB, AC')}. Chứng minh ${m('MN \\parallel (BCD)')} và tính ${m('MN')} khi ${m('BC = 10')}.`, fig: figParMN,
   sol:[`${m('MN')} là đường trung bình của tam giác ${m('ABC')}: ${m('MN \\parallel BC')}, ${m('MN = \\dfrac{1}{2}BC = 5')}.`, `${m('BC \\subset (BCD)')}; ${m('M \\notin (BCD)')} (vì ${m('A \\notin (BCD)')} và ${m('M')} nằm giữa ${m('A, B')}) nên ${m('MN \\not\\subset (BCD)')}.`, `Theo điều kiện song song: ${m('MN \\parallel (BCD)')}.`], ans:`${tb('MN \\parallel (BCD)')}, ${tb('MN = 5')}.`},
  {kind:'vd', tag:'Ví dụ 10 · Dạng 5', label:'Ví dụ 10', de:`Cho hình chóp ${m('S.ABCD')} có đáy là hình bình hành tâm ${m('O')}. ${m('M')} là trung điểm của ${m('SC')}. Chứng minh ${m('SA \\parallel (MBD)')}.`, fig: figSAMBD,
   sol:[`${m('O')} là trung điểm ${m('AC')} (hai đường chéo của hình bình hành cắt nhau tại trung điểm), ${m('M')} là trung điểm ${m('SC')}.`, `${m('OM')} là đường trung bình của tam giác ${m('SAC')}: ${m('OM \\parallel SA')}. Và ${m('O \\in BD')} nên ${m('OM \\subset (MBD)')}.`, `${m('A \\notin (MBD)')} (vì ${m('(MBD) \\cap (ABCD) = BD')} và ${m('A \\notin BD')}) nên ${m('SA \\not\\subset (MBD)')}. Vậy ${m('SA \\parallel (MBD)')}.`], ans:`${tb('SA \\parallel (MBD)')}.`},
  {kind:'vd', tag:'Ví dụ 11 · Dạng 5', label:'Ví dụ 11', de:`Cho tứ diện ${m('ABCD')}. ${m('E \\in AB')}, ${m('F \\in AC')} sao cho ${m('\\dfrac{AE}{AB} = \\dfrac{AF}{AC} = \\dfrac{2}{3}')}. Chứng minh ${m('EF \\parallel (BCD)')} và tính ${m('EF')} khi ${m('BC = 9')}.`, fig: figEF,
   sol:[`Trong tam giác ${m('ABC')}: ${m('\\dfrac{AE}{AB} = \\dfrac{AF}{AC}')} nên ${m('EF \\parallel BC')} (Thales đảo).`, `${m('BC \\subset (BCD)')} và ${m('EF \\not\\subset (BCD)')} (vì ${m('E \\notin (BCD)')}) nên ${m('EF \\parallel (BCD)')}.`, `${m('\\dfrac{EF}{BC} = \\dfrac{2}{3}')} nên ${m('EF = \\dfrac{2}{3}\\cdot 9 = 6')}.`], ans:`${tb('EF \\parallel (BCD)')}, ${tb('EF = 6')}.`},

  /* ---- Dạng 6 ---- */
  {kind:'method', tag:'Dạng 6', title:'Thiết diện song song với hai đường thẳng chéo nhau',
   steps:[`Qua ${m('M')} kẻ ${m('MN \\parallel BC')} (trong ${m('(ABC)')}) và ${m('MQ \\parallel AD')} (trong ${m('(ABD)')}).`, `Tương tự tìm ${m('P')}: ${m('NP \\parallel AD')}, ${m('QP \\parallel BC')} ⇒ ${m('MNPQ')} là hình bình hành.`, `Tính: ${m('MN = \\dfrac{AM}{AB}\\cdot BC')}, ${m('MQ = \\dfrac{BM}{BA}\\cdot AD')}.`]},
  {kind:'vd', tag:'Ví dụ 12 · Dạng 6', label:'Ví dụ 12', de:`Cho tứ diện ${m('ABCD')} có ${m('BC = 9')}, ${m('AD = 6')}. Điểm ${m('M')} thuộc ${m('AB')} sao cho ${m('AM = \\dfrac{1}{3}AB')}. Mặt phẳng ${m('(\\alpha)')} đi qua ${m('M')}, song song với ${m('BC')} và ${m('AD')}, cắt ${m('AC, CD, BD')} lần lượt tại ${m('N, P, Q')}. Tính chu vi tứ giác ${m('MNPQ')}.`, fig: secFig(1 / 3),
   sol:[`${m('BC \\parallel (\\alpha)')} nên ${m('(\\alpha) \\cap (ABC) = MN \\parallel BC')}; tương tự ${m('PQ \\parallel BC')}. ${m('AD \\parallel (\\alpha)')} nên ${m('MQ \\parallel AD')} và ${m('NP \\parallel AD')}. Vậy ${m('MNPQ')} là hình bình hành.`, `${m('MN = \\dfrac{AM}{AB}\\cdot BC = \\dfrac{1}{3}\\cdot 9 = 3')}.`, `${m('MQ = \\dfrac{BM}{BA}\\cdot AD = \\dfrac{2}{3}\\cdot 6 = 4')}. Chu vi bằng ${m('2\\,(3 + 4) = 14')}.`], ans:`Chu vi ${tb('14')}.`},
  {kind:'vd', tag:'Ví dụ 13 · Dạng 6', label:'Ví dụ 13', de:`Với tứ diện ${m('ABCD')} có ${m('BC = 8')}, ${m('AD = 6')}, ${m('BC \\perp AD')}, ${m('M')} là trung điểm ${m('AB')} và mặt phẳng ${m('(\\alpha)')} như ở Ví dụ 12. Chứng minh ${m('MNPQ')} là hình chữ nhật và tính diện tích.`, fig: secFig(1 / 2),
   sol:[`${m('MN \\parallel BC')}, ${m('MQ \\parallel AD')} và ${m('BC \\perp AD')} nên ${m('MN \\perp MQ')}. Hình bình hành có một góc vuông là hình chữ nhật.`, `${m('M')} là trung điểm ${m('AB')} nên ${m('MN = \\dfrac{1}{2}BC = 4')}, ${m('MQ = \\dfrac{1}{2}AD = 3')}.`, `Diện tích bằng ${m('4\\cdot 3 = 12')}.`], ans:`${tw('MNPQ là hình chữ nhật')}, diện tích ${tb('12')}.`},

  {kind:'lt', tag:'Luyện tập', label:'Bài 1', de:`Cho hình lăng trụ ${m("ABC.A'B'C'")}. Chứng minh ${m("AB \\parallel (A'B'C')")} và ${m("CC' \\parallel (ABB'A')")}.`, fig: prismFig({h:[['A', 'B']], fill:[["A'", "B'", "C'"]], aria:"Lăng trụ ABC.A'B'C', AB song song với (A'B'C')"}),
   sol:[`${m("ABB'A'")} là hình bình hành nên ${m("AB \\parallel A'B'")}; ${m("A'B' \\subset (A'B'C')")} và ${m('A \\notin (A\'B\'C\')')}, nên ${m("AB \\parallel (A'B'C')")}.`, `${m("CC' \\parallel AA'")} (cạnh bên), ${m("AA' \\subset (ABB'A')")} và ${m('C \\notin (ABB\'A\')')}, nên ${m("CC' \\parallel (ABB'A')")}.`], ans:`${tb("AB \\parallel (A'B'C')")}, ${tb("CC' \\parallel (ABB'A')")}.`},
  {kind:'lt', tag:'Luyện tập', label:'Bài 2', de:`Cho tứ diện ${m('ABCD')}. Gọi ${m('I, J')} lần lượt là trọng tâm các tam giác ${m('ABC')} và ${m('ABD')}. Chứng minh ${m('IJ \\parallel CD')} và ${m('IJ \\parallel (BCD)')}; tính ${m('IJ')} khi ${m('CD = 12')}.`, fig: figIJ,
   sol:[`Gọi ${m('M')} là trung điểm ${m('AB')}: ${m('I \\in MC')}, ${m('J \\in MD')} và ${m('\\dfrac{MI}{MC} = \\dfrac{MJ}{MD} = \\dfrac{1}{3}')}.`, `Theo Thales đảo trong tam giác ${m('MCD')}: ${m('IJ \\parallel CD')} và ${m('IJ = \\dfrac{1}{3}CD = 4')}.`, `${m('CD \\subset (BCD)')} và ${m('IJ \\not\\subset (BCD)')} (vì ${m('I \\notin (BCD)')}), nên ${m('IJ \\parallel (BCD)')}.`], ans:`${tb('IJ \\parallel (BCD)')}, ${tb('IJ = 4')}.`},
  {kind:'lt', tag:'Luyện tập', label:'Bài 3', de:`Cho hình lăng trụ tam giác ${m("ABC.A'B'C'")}. Có bao nhiêu cạnh của lăng trụ song song với mặt phẳng ${m("(ABB'A')")}?`, fig: prismFig({fill:[['A', 'B', "B'", "A'"]], aria:"Lăng trụ với mặt (ABB'A') được tô"}),
   sol:[`Nằm trong ${m("(ABB'A')")}: ${m("AB, BB', A'B', AA'")}.`, `Cắt mặt phẳng: ${m("AC, BC, A'C', B'C'")} (mỗi cạnh có một đầu mút thuộc mặt phẳng).`, `Còn lại ${m("CC'")}: ${m("CC' \\parallel AA'")} và ${m("C \\notin (ABB'A')")} nên song song. Kiểm tra ${m('4 + 4 + 1 = 9')}.`], ans:`${tb('1')} cạnh.`},
  {kind:'lt', tag:'Luyện tập', label:'Bài 4', de:`Cho tứ diện ${m('ABCD')} có ${m('BC = 10')}, ${m('AD = 6')}. Mặt phẳng ${m('(\\alpha)')} qua trung điểm ${m('M')} của ${m('AB')}, song song với ${m('BC')} và ${m('AD')}. Tính chu vi thiết diện.`, fig: secFig(1 / 2),
   sol:[`Thiết diện là hình bình hành ${m('MNPQ')} với ${m('MN \\parallel BC')}, ${m('MQ \\parallel AD')}.`, `${m('M')} là trung điểm ${m('AB')}: ${m('MN = 5')}, ${m('MQ = 3')}.`, `Chu vi bằng ${m('2\\,(5 + 3) = 16')}.`], ans:`Chu vi ${tb('16')}.`},

  {kind:'sum', tag:'Tổng kết', title:'Ghi nhớ',
   body:`<ul><li>Đường thẳng và mặt phẳng: <b>cắt nhau</b> (1 điểm chung), <b>song song</b> (không điểm chung) hoặc <b>đường thẳng nằm trong mặt phẳng</b>.</li><li>${m("d \\not\\subset (P),\\ d \\parallel d' \\subset (P) \\Rightarrow d \\parallel (P)")} – luôn ghi đủ hai điều kiện.</li><li>${m('d \\parallel (P)')}, ${m('(Q) \\supset d')}, ${m('(Q) \\cap (P) = d\'')} thì ${m("d' \\parallel d")}; hai mặt phẳng cắt nhau cùng song song ${m('d')} thì giao tuyến song song ${m('d')}.</li><li>Thiết diện song song với ${m('BC')} và ${m('AD')} là hình bình hành; cạnh kề lấy theo tỉ lệ ${m('k')} và ${m('1 - k')}.</li></ul>` + box('Về nhà: làm các bài tập cuối Bài 12 trong SGK; luyện thêm trên web <b>Học mà chơi</b> – Toán 11, Bài 12.')},
]},
{ id:'bai-13', name:'Bài 13. Hai mặt phẳng song song', desc:'Vị trí tương đối của hai mặt phẳng; điều kiện và tính chất hai mặt phẳng song song; giao tuyến với hai mặt phẳng song song; định lí Thales trong không gian; hình chóp cắt bởi mặt phẳng song song với đáy.', slides:[
  TITLE('Bài 13. Hai mặt phẳng song song', ['Phân biệt hai vị trí của hai mặt phẳng: song song và cắt nhau.', 'Nắm điều kiện để hai mặt phẳng song song và các tính chất (duy nhất, đường thẳng trong mặt phẳng, giao tuyến).', 'Chứng minh hai mặt phẳng song song; tìm giao tuyến khi có hai mặt phẳng song song.', 'Vận dụng định lí Thales trong không gian và tính chất hình chóp cắt bởi mặt phẳng song song với đáy.']),

  {kind:'kt', tag:'Kiến thức trọng tâm 1', title:'Vị trí tương đối của hai mặt phẳng',
   body: box(`Hai mặt phẳng phân biệt ${m('(P)')}, ${m('(Q)')} chỉ có <b>hai</b> vị trí:<br>① <b>song song</b> – không có điểm chung, kí hiệu ${m('(P) \\parallel (Q)')};<br>② <b>cắt nhau</b> – có một đường thẳng chung, gọi là <b>giao tuyến</b>.`) +
     S(`Hai mặt đối diện của hình hộp, hai đáy của lăng trụ là các mặt phẳng song song; hai mặt có chung một cạnh thì cắt nhau theo cạnh đó.`) +
     note(`Hai mặt phẳng <b>không</b> có vị trí “chéo nhau”. Chỉ cần có một điểm chung là chúng cắt nhau (hoặc trùng nhau).`),
   fig: figBase2},

  {kind:'kt', tag:'Kiến thức trọng tâm 2', title:'Điều kiện để hai mặt phẳng song song',
   body: box(`<b>Định lí.</b> Nếu mặt phẳng ${m('(P)')} chứa hai đường thẳng ${m('a, b')} <b>cắt nhau</b> và cả hai cùng song song với ${m('(Q)')} thì ${m('(P) \\parallel (Q)')}.<br>${m('a, b \\subset (P),\\ a \\cap b \\ne \\varnothing,\\ a \\parallel (Q),\\ b \\parallel (Q) \\Rightarrow (P) \\parallel (Q)')}`) +
     S(`Cách dùng: tìm hai đường thẳng cắt nhau trong mặt phẳng này, mỗi đường song song với một đường thẳng trong mặt phẳng kia.`) +
     note(`Hai đường thẳng trong ${m('(P)')} phải <b>cắt nhau</b>. Hai đường thẳng song song thì chưa đủ: ${m('(P)')} vẫn có thể cắt ${m('(Q)')}.`),
   fig: figTri2},

  {kind:'kt', tag:'Kiến thức trọng tâm 3', title:'Tính chất của hai mặt phẳng song song',
   body: box(`<b>Tính chất 1.</b> Qua một điểm nằm ngoài mặt phẳng ${m('(P)')} có <b>duy nhất</b> một mặt phẳng song song với ${m('(P)')}.`) +
     box(`<b>Tính chất 2.</b> Nếu ${m('(P) \\parallel (Q)')} thì mọi đường thẳng nằm trong ${m('(P)')} đều song song với ${m('(Q)')}.`) +
     box(`<b>Tính chất 3.</b> Mặt phẳng ${m('(R)')} cắt hai mặt phẳng song song ${m('(P)')}, ${m('(Q)')} thì hai giao tuyến <b>song song</b> với nhau.`) +
     note(`${m('(P) \\parallel (Q)')} không kéo theo mọi đường thẳng trong ${m('(P)')} song song mọi đường thẳng trong ${m('(Q)')}: có những cặp đường thẳng chéo nhau.`),
   fig: figCut3},

  {kind:'kt', tag:'Kiến thức trọng tâm 4', title:'Định lí Thales trong không gian',
   body: box(`<b>Định lí.</b> Ba mặt phẳng đôi một song song ${m('(P), (Q), (R)')} chắn trên hai cát tuyến bất kì những đoạn thẳng tương ứng tỉ lệ:<br>${m("\\dfrac{AB}{BC} = \\dfrac{A'B'}{B'C'}")}, ${m("\\dfrac{AB}{AC} = \\dfrac{A'B'}{A'C'}")}.`) +
     S(`Ở đây ${m('A, B, C')} và ${m("A', B', C'")} lần lượt là giao điểm của hai đường thẳng với ba mặt phẳng.`) +
     note(`Các đoạn thẳng phải <b>tương ứng</b>: ${m('AB')} ứng với ${m("A'B'")}, ${m('BC')} ứng với ${m("B'C'")}; đừng lập tỉ lệ chéo.`),
   fig: thalesFig},

  {kind:'kt', tag:'Kiến thức trọng tâm 5', title:'Hình chóp cắt bởi mặt phẳng song song với đáy',
   body: box(`Mặt phẳng ${m('(\\alpha) \\parallel (ABC)')} cắt các cạnh ${m('SA, SB, SC')} của hình chóp ${m('S.ABC')} tại ${m("A', B', C'")} thì: ${m("\\dfrac{SA'}{SA} = \\dfrac{SB'}{SB} = \\dfrac{SC'}{SC} = k")} và tam giác ${m("A'B'C'")} đồng dạng tam giác ${m('ABC')} theo tỉ số ${m('k')}.`) +
     S(`Chu vi nhân ${m('k')}, diện tích nhân ${m('k^2')}. Với hình lăng trụ, mặt phẳng song song với đáy cắt các cạnh bên cho thiết diện <b>bằng</b> đáy.`) +
     note(`Phần còn lại ${m("AA' = SA - SA'")}; đừng nhầm ${m("SA'")} với ${m("AA'")}.`),
   fig: stFig(1 / 2)},

  /* ---- Dạng 1 ---- */
  {kind:'method', tag:'Dạng 1', title:'Xác định vị trí tương đối của hai mặt phẳng; tìm giao tuyến',
   steps:[`Hai mặt có chung cạnh hoặc chung đỉnh ⇒ <b>cắt nhau</b>; giao tuyến là đường thẳng qua hai điểm chung.`, `Hai mặt đối diện của hình hộp, hai đáy của lăng trụ ⇒ <b>song song</b>.`, `Hình chóp: mọi cặp mặt đều cắt nhau (không có cặp song song).`]},
  {kind:'vd', tag:'Ví dụ 1 · Dạng 1', label:'Ví dụ 1', de:`Cho hình lập phương ${m("ABCD.A'B'C'D'")}. Xét vị trí tương đối của: a) ${m('(ABCD)')} và ${m("(A'B'C'D')")}; b) ${m("(ABB'A')")} và ${m("(ADD'A')")}; c) ${m('(ABCD)')} và ${m("(BCC'B')")}.`, fig: cubeFig({fill:[['A', 'B', "B'", "A'"], ['A', 'D', "D'", "A'"]], aria:"Hình lập phương với hai mặt (ABB'A') và (ADD'A') được tô"}),
   sol:[`a) Hai đáy của hình lập phương không có điểm chung: ${m("(ABCD) \\parallel (A'B'C'D')")}.`, `b) Hai mặt có chung hai điểm ${m("A, A'")} nên cắt nhau theo giao tuyến ${m("AA'")}.`, `c) Hai mặt có chung hai điểm ${m('B, C')} nên cắt nhau theo giao tuyến ${m('BC')}.`], ans:`a) ${tw('song song')}; b) ${tw("cắt nhau theo AA'")}; c) ${tw('cắt nhau theo BC')}.`},
  {kind:'vd', tag:'Ví dụ 2 · Dạng 1', label:'Ví dụ 2', de:`Cho hình chóp ${m('S.ABCD')} có đáy là hình bình hành. Xét vị trí tương đối của ${m('(SAB)')} và ${m('(SCD)')}; tìm giao tuyến.`, fig: figSxAB,
   sol:[`${m('(SAB)')} và ${m('(SCD)')} có điểm chung ${m('S')} nên cắt nhau.`, `${m('AB \\subset (SAB)')}, ${m('CD \\subset (SCD)')}, ${m('AB \\parallel CD')} nên giao tuyến là đường thẳng ${m('Sx')} qua ${m('S')} và song song với ${m('AB')}, ${m('CD')}.`], ans:`${tw('Cắt nhau')} theo đường thẳng ${tb('Sx \\parallel AB \\parallel CD')}.`},

  /* ---- Dạng 2 ---- */
  {kind:'method', tag:'Dạng 2', title:'Chứng minh hai mặt phẳng song song',
   steps:[`Trong mặt phẳng thứ nhất chọn hai đường thẳng <b>cắt nhau</b> ${m('a, b')}.`, `Chỉ ra ${m('a \\parallel a_1')}, ${m('b \\parallel b_1')} với ${m('a_1, b_1')} nằm trong mặt phẳng thứ hai (cạnh đối hình bình hành, đường trung bình, Thales đảo).`, `Nói rõ ${m('a, b')} không nằm trong mặt phẳng thứ hai rồi kết luận theo định lí.`]},
  {kind:'vd', tag:'Ví dụ 3 · Dạng 2', label:'Ví dụ 3', de:`Cho hình lập phương ${m("ABCD.A'B'C'D'")}. Chứng minh ${m("(AB'D') \\parallel (BC'D)")}.`, fig: figTri2,
   sol:[`${m("AB'C'D")} là hình chữ nhật nên ${m("AB' \\parallel DC'")}; ${m("ABC'D'")} là hình chữ nhật nên ${m("AD' \\parallel BC'")}.`, `${m("DC'")} và ${m("BC'")} nằm trong ${m("(BC'D)")}; ${m("AB'")} và ${m("AD'")} cắt nhau tại ${m('A')}, nằm trong ${m("(AB'D')")} và không nằm trong ${m("(BC'D)")}.`, `Theo điều kiện hai mặt phẳng song song: ${m("(AB'D') \\parallel (BC'D)")}.`], ans:`${tb("(AB'D') \\parallel (BC'D)")}.`},
  {kind:'vd', tag:'Ví dụ 4 · Dạng 2', label:'Ví dụ 4', de:`Cho hình lăng trụ ${m("ABC.A'B'C'")}. Chứng minh ${m('(ABC) \\parallel (A\'B\'C\')')}.`, fig: prismFig({fill:[['A', 'B', 'C'], ["A'", "B'", "C'"]], aria:"Lăng trụ ABC.A'B'C' với hai đáy được tô"}),
   sol:[`${m("ABB'A'")} là hình bình hành nên ${m("AB \\parallel A'B'")}; ${m("BCC'B'")} là hình bình hành nên ${m("BC \\parallel B'C'")}.`, `${m('AB')}, ${m('BC')} cắt nhau tại ${m('B')} trong ${m('(ABC)')} và không nằm trong ${m("(A'B'C')")}; ${m("A'B', B'C' \\subset (A'B'C')")}.`, `Theo điều kiện: ${m("(ABC) \\parallel (A'B'C')")}.`], ans:`${tb("(ABC) \\parallel (A'B'C')")}.`},
  {kind:'vd', tag:'Ví dụ 5 · Dạng 2', label:'Ví dụ 5', de:`Cho hai hình bình hành ${m('ABCD')} và ${m('ABEF')} không cùng nằm trong một mặt phẳng. Chứng minh ${m('(ADF) \\parallel (BCE)')}.`, fig: figTwoPar,
   sol:[`${m('ABCD')} là hình bình hành nên ${m('AD \\parallel BC')}; ${m('ABEF')} là hình bình hành nên ${m('AF \\parallel BE')}.`, `${m('AD')}, ${m('AF')} cắt nhau tại ${m('A')} trong ${m('(ADF)')}; ${m('BC, BE \\subset (BCE)')}. Hai đường thẳng ${m('AD, AF')} không nằm trong ${m('(BCE)')} (nếu không thì ${m('A \\in (BCE)')}, suy ra hai hình bình hành cùng nằm trong ${m('(ABE)')} – trái giả thiết).`, `Theo điều kiện: ${m('(ADF) \\parallel (BCE)')}.`], ans:`${tb('(ADF) \\parallel (BCE)')}.`},

  /* ---- Dạng 3 ---- */
  {kind:'method', tag:'Dạng 3', title:'Đếm cặp mặt phẳng song song, cắt nhau',
   steps:[`Số cặp mặt của khối có ${m('n')} mặt là ${m('C_n^2')}.`, `Hình hộp (kể cả lập phương): 3 cặp song song; lăng trụ tam giác: 1 cặp (hai đáy); hình chóp, tứ diện: không có cặp nào.`, `Số cặp cắt nhau = tổng số cặp − số cặp song song.`]},
  {kind:'vd', tag:'Ví dụ 6 · Dạng 3', label:'Ví dụ 6', de:`Cho hình lập phương ${m("ABCD.A'B'C'D'")}. Xét các cặp mặt của hình. Có bao nhiêu cặp song song? Bao nhiêu cặp cắt nhau?`, fig: figBase2,
   sol:[`Hình có 6 mặt nên có ${m('C_6^2 = 15')} cặp mặt.`, `Các mặt chia thành 3 cặp đối diện, đó là các cặp song song.`, `Số cặp cắt nhau: ${m('15 - 3 = 12')}.`], ans:`${tb('3')} cặp song song, ${tb('12')} cặp cắt nhau.`},
  {kind:'vd', tag:'Ví dụ 7 · Dạng 3', label:'Ví dụ 7', de:`Cho hình lăng trụ tam giác ${m("ABC.A'B'C'")}. Có bao nhiêu cặp mặt song song? Bao nhiêu cặp mặt bên cắt nhau theo một cạnh bên?`, fig: prismFig({fill:[['A', 'B', 'C'], ["A'", "B'", "C'"]], aria:'Lăng trụ tam giác với hai đáy được tô'}),
   sol:[`Hình có 5 mặt (2 đáy, 3 mặt bên) nên có ${m('C_5^2 = 10')} cặp mặt. Chỉ hai đáy song song: 1 cặp; còn ${m('10 - 1 = 9')} cặp cắt nhau.`, `Ba mặt bên đôi một cắt nhau theo ba cạnh bên: 3 cặp.`], ans:`${tb('1')} cặp song song; ${tb('3')} cặp mặt bên cắt nhau theo cạnh bên.`},

  /* ---- Dạng 4 ---- */
  {kind:'method', tag:'Dạng 4', title:'Giao tuyến khi có hai mặt phẳng song song',
   steps:[`Tìm một điểm chung của hai mặt phẳng cần tìm giao tuyến.`, `Mặt phẳng thứ ba cắt hai mặt phẳng song song theo hai giao tuyến <b>song song</b> (Tính chất 3).`, `Giao tuyến cần tìm là đường thẳng qua điểm chung và song song với giao tuyến đã biết.`]},
  {kind:'vd', tag:'Ví dụ 8 · Dạng 4', label:'Ví dụ 8', de:`Cho hình lập phương ${m("ABCD.A'B'C'D'")}. Biết ${m("(AB'D')")} cắt ${m("(A'B'C'D')")} theo ${m("B'D'")}. Tìm giao tuyến của ${m("(AB'D')")} và ${m('(ABCD)')}.`, fig: cubeFig({h:[["B'", "D'"]], fill:[['A', "B'", "D'"]], aria:"Mặt phẳng (AB'D') cắt đáy trên theo B'D'"}),
   sol:[`${m('A')} là điểm chung của ${m("(AB'D')")} và ${m('(ABCD)')}.`, `${m('(ABCD) \\parallel (A\'B\'C\'D\')')} và ${m("(AB'D')")} cắt cả hai nên hai giao tuyến song song: giao tuyến cần tìm song song với ${m("B'D'")}.`, `${m("BDD'B'")} là hình chữ nhật nên ${m("B'D' \\parallel BD")}. Vậy giao tuyến là đường thẳng qua ${m('A')} song song với ${m('BD')}.`], ans:`Đường thẳng ${tb('qua A, song song với BD')}.`},
  {kind:'vd', tag:'Ví dụ 9 · Dạng 4', label:'Ví dụ 9', de:`Cho hình lăng trụ ${m("ABC.A'B'C'")}. Tìm giao tuyến của hai mặt phẳng ${m("(AB'C')")} và ${m('(ABC)')}.`, fig: figPrismAB,
   sol:[`${m('A')} là điểm chung của hai mặt phẳng.`, `${m("(AB'C')")} cắt hai đáy song song ${m("(A'B'C')")} và ${m('(ABC)')}; giao tuyến với đáy trên là ${m("B'C'")}, nên giao tuyến với đáy dưới song song ${m("B'C'")}.`, `${m("B'C' \\parallel BC")} nên giao tuyến là đường thẳng qua ${m('A')} song song với ${m('BC')}.`], ans:`Đường thẳng ${tb('qua A, song song với BC')}.`},

  /* ---- Dạng 5 ---- */
  {kind:'method', tag:'Dạng 5', title:'Vận dụng định lí Thales trong không gian',
   steps:[`Xác định hai cát tuyến và ba mặt phẳng song song; ghi ba giao điểm trên mỗi cát tuyến theo cùng thứ tự.`, `Lập tỉ lệ các đoạn <b>tương ứng</b>: ${m("\\dfrac{AB}{BC} = \\dfrac{A'B'}{B'C'}")} hoặc ${m("\\dfrac{AB}{AC} = \\dfrac{A'B'}{A'C'}")}.`, `Tính đoạn chưa biết; nhớ ${m('AC = AB + BC')} khi ${m('B')} nằm giữa ${m('A, C')}.`]},
  {kind:'vd', tag:'Ví dụ 10 · Dạng 5', label:'Ví dụ 10', de:`Ba mặt phẳng song song ${m('(P), (Q), (R)')} cắt hai đường thẳng tại ${m('A, B, C')} và ${m("A', B', C'")} (${m('B')} nằm giữa ${m('A, C')}; ${m("B'")} nằm giữa ${m("A', C'")}). Biết ${m('AB = 6')}, ${m('BC = 9')}, ${m("A'B' = 4")}. Tính ${m("B'C'")}.`, fig: thalesFig,
   sol:[`Theo định lí Thales trong không gian: ${m("\\dfrac{AB}{BC} = \\dfrac{A'B'}{B'C'}")}.`, `${m("B'C' = \\dfrac{A'B' \\cdot BC}{AB} = \\dfrac{4\\cdot 9}{6} = 6")}.`], ans:`${tb("B'C' = 6")}.`},
  {kind:'vd', tag:'Ví dụ 11 · Dạng 5', label:'Ví dụ 11', de:`Với cách đặt như Ví dụ 10, biết ${m('AB = 4')}, ${m('BC = 6')}, ${m("A'C' = 15")}. Tính ${m("A'B'")} và ${m("B'C'")}.`, fig: thalesFig,
   sol:[`${m('AC = AB + BC = 10')}.`, `${m("\\dfrac{A'B'}{A'C'} = \\dfrac{AB}{AC}")} nên ${m("A'B' = 15\\cdot \\dfrac{4}{10} = 6")}.`, `${m("B'C' = A'C' - A'B' = 15 - 6 = 9")} (kiểm tra: ${m("\\dfrac{AB}{BC} = \\dfrac{4}{6} = \\dfrac{6}{9}")}).`], ans:`${tb("A'B' = 6")}, ${tb("B'C' = 9")}.`},

  /* ---- Dạng 6 ---- */
  {kind:'method', tag:'Dạng 6', title:'Hình chóp, hình lăng trụ cắt bởi mặt phẳng song song với đáy',
   steps:[`Mặt phẳng song song đáy cắt các cạnh bên theo cùng một tỉ lệ ${m('k')} (tính từ đỉnh).`, `Thiết diện đồng dạng đáy theo tỉ số ${m('k')}: chu vi nhân ${m('k')}, diện tích nhân ${m('k^2')}.`, `Lăng trụ: thiết diện song song đáy <b>bằng</b> đáy (cùng chu vi, cùng diện tích).`]},
  {kind:'vd', tag:'Ví dụ 12 · Dạng 6', label:'Ví dụ 12', de:`Cho hình chóp ${m('S.ABC')} có ${m('AB = 9')}, ${m('BC = 12')}, ${m('CA = 15')}. Mặt phẳng ${m('(\\alpha)')} song song với ${m('(ABC)')} cắt ${m('SA, SB, SC')} lần lượt tại ${m("A', B', C'")} với ${m("\\dfrac{SA'}{SA} = \\dfrac{2}{3}")}. Tính chu vi và diện tích tam giác ${m("A'B'C'")}.`, fig: stFig(2 / 3),
   sol:[`${m("(\\alpha) \\parallel (ABC)")} nên ${m("A'B'C'")} đồng dạng ${m('ABC')} theo tỉ số ${m("k = \\dfrac{2}{3}")}.`, `Chu vi ${m('ABC')} bằng ${m('9 + 12 + 15 = 36')} nên chu vi ${m("A'B'C'")} bằng ${m('\\dfrac{2}{3}\\cdot 36 = 24')}.`, `Tam giác ${m('ABC')} có ${m('9^2 + 12^2 = 15^2')} nên vuông tại ${m('B')}, diện tích ${m('\\dfrac{9\\cdot 12}{2} = 54')}. Diện tích ${m("A'B'C'")} bằng ${m('\\dfrac{4}{9}\\cdot 54 = 24')}.`], ans:`Chu vi ${tb('24')}, diện tích ${tb('24')}.`},
  {kind:'vd', tag:'Ví dụ 13 · Dạng 6', label:'Ví dụ 13', de:`Cho hình chóp ${m('S.ABC')} có ${m('SA = 12')} và diện tích tam giác ${m('ABC')} bằng ${m('80')}. Mặt phẳng song song với ${m('(ABC)')} cắt ${m('SA, SB, SC')} tại ${m("A', B', C'")} sao cho ${m("SA' = 3")}. Tính ${m("AA'")} và diện tích tam giác ${m("A'B'C'")}.`, fig: stFig(1 / 4),
   sol:[`${m("k = \\dfrac{SA'}{SA} = \\dfrac{3}{12} = \\dfrac{1}{4}")}.`, `${m("AA' = SA - SA' = 12 - 3 = 9")}.`, `Diện tích ${m("A'B'C'")} bằng ${m('k^2 \\cdot 80 = \\dfrac{1}{16}\\cdot 80 = 5')}.`], ans:`${tb("AA' = 9")}, diện tích ${tb('5')}.`},

  {kind:'lt', tag:'Luyện tập', label:'Bài 1', de:`Cho hình lập phương ${m("ABCD.A'B'C'D'")}. Chứng minh ${m("(A'BD) \\parallel (B'D'C)")}.`, fig: cubeFig({fill:[["A'", 'B', 'D'], ["B'", "D'", 'C']], aria:"Hình lập phương: (A'BD) và (B'D'C)"}),
   sol:[`${m("A'BCD'")} là hình chữ nhật nên ${m("A'B \\parallel D'C")}; ${m("A'B'CD")} là hình chữ nhật nên ${m("A'D \\parallel B'C")}.`, `${m("A'B, A'D")} cắt nhau tại ${m("A'")} trong ${m("(A'BD)")} và không nằm trong ${m("(B'D'C)")}; ${m("D'C, B'C \\subset (B'D'C)")}.`, `Theo điều kiện: ${m("(A'BD) \\parallel (B'D'C)")}.`], ans:`${tb("(A'BD) \\parallel (B'D'C)")}.`},
  {kind:'lt', tag:'Luyện tập', label:'Bài 2', de:`Ba mặt phẳng song song cắt hai đường thẳng tại ${m('A, B, C')} và ${m("A', B', C'")} (${m('B')} giữa ${m('A, C')}; ${m("B'")} giữa ${m("A', C'")}). Biết ${m('AB = 6')}, ${m('AC = 16')}, ${m("A'C' = 24")}. Tính ${m("A'B'")} và ${m("B'C'")}.`, fig: thalesFig,
   sol:[`${m("\\dfrac{A'B'}{A'C'} = \\dfrac{AB}{AC}")} nên ${m("A'B' = 24\\cdot \\dfrac{6}{16} = 9")}.`, `${m("B'C' = 24 - 9 = 15")}.`], ans:`${tb("A'B' = 9")}, ${tb("B'C' = 15")}.`},
  {kind:'lt', tag:'Luyện tập', label:'Bài 3', de:`Cho hình lăng trụ ${m("ABC.A'B'C'")} có ${m('AB = 5')}, ${m('BC = 6')}, ${m('CA = 7')}. ${m('M, N, P')} lần lượt là trung điểm của ${m("AA', BB', CC'")}. Chứng minh ${m('(MNP) \\parallel (ABC)')} và tính chu vi tam giác ${m('MNP')}.`, fig: figPrismMNP,
   sol:[`${m('AMNB')} có ${m('AM \\parallel BN')} và ${m('AM = BN')} nên là hình bình hành: ${m('MN \\parallel AB')}, ${m('MN = AB = 5')}. Tương tự ${m('NP \\parallel BC')}, ${m('NP = 6')}; ${m('MP \\parallel AC')}, ${m('MP = 7')}.`, `${m('MN, NP')} cắt nhau tại ${m('N')} và song song với hai đường thẳng ${m('AB, BC')} của ${m('(ABC)')} nên ${m('(MNP) \\parallel (ABC)')}.`, `Chu vi ${m('MNP')} bằng ${m('5 + 6 + 7 = 18')}.`], ans:`${tb('(MNP) \\parallel (ABC)')}, chu vi ${tb('18')}.`},
  {kind:'lt', tag:'Luyện tập', label:'Bài 4', de:`Cho hình chóp ${m('S.ABC')} có ${m('AB = 10')}, ${m('BC = 15')}, ${m('CA = 20')}. Mặt phẳng song song với ${m('(ABC)')} cắt ${m('SA, SB, SC')} tại ${m("A', B', C'")} với ${m("\\dfrac{SA'}{SA} = \\dfrac{3}{5}")}. Tính chu vi tam giác ${m("A'B'C'")}.`, fig: stFig(3 / 5),
   sol:[`Tam giác ${m("A'B'C'")} đồng dạng ${m('ABC')} theo tỉ số ${m('\\dfrac{3}{5}')}.`, `Chu vi ${m('ABC')} bằng ${m('45')} nên chu vi ${m("A'B'C'")} bằng ${m('\\dfrac{3}{5}\\cdot 45 = 27')}.`], ans:`${tb('27')}.`},

  {kind:'sum', tag:'Tổng kết', title:'Ghi nhớ',
   body:`<ul><li>Hai mặt phẳng phân biệt: <b>song song</b> (không điểm chung) hoặc <b>cắt nhau</b> (một giao tuyến).</li><li>${m('(P) \\parallel (Q)')} khi ${m('(P)')} chứa hai đường thẳng <b>cắt nhau</b> cùng song song với ${m('(Q)')}.</li><li>Mặt phẳng thứ ba cắt hai mặt phẳng song song theo hai giao tuyến <b>song song</b>.</li><li>Thales không gian: ${m("\\dfrac{AB}{BC} = \\dfrac{A'B'}{B'C'}")}; chóp cắt song song đáy: chu vi nhân ${m('k')}, diện tích nhân ${m('k^2')}.</li></ul>` + box('Về nhà: làm Luyện tập 1–4 và các bài trong phiếu luyện tập.')},
]},
{ id:'bai-14', name:'Bài 14. Phép chiếu song song', desc:'Phép chiếu song song và hình chiếu của điểm, đoạn thẳng; tính chất (thẳng hàng, song song, tỉ số); hình chiếu của một hình; hình biểu diễn của hình không gian; bài toán bóng nắng.', slides:[
  TITLE('Bài 14. Phép chiếu song song', ['Nắm định nghĩa phép chiếu song song, mặt phẳng chiếu và phương chiếu.', 'Nhớ các tính chất được bảo toàn (thẳng hàng, song song, tỉ số) và không được bảo toàn (độ dài, góc, vuông góc).', 'Tìm hình chiếu của điểm, đoạn thẳng, hình; tính độ dài nhờ bảo toàn tỉ số.', 'Hiểu hình biểu diễn của hình không gian và giải các bài toán bóng nắng.']),

  {kind:'kt', tag:'Kiến thức trọng tâm 1', title:'Phép chiếu song song',
   body: box(`Cho mặt phẳng ${m('(P)')} và đường thẳng ${m('\\ell')} cắt ${m('(P)')}. Với mỗi điểm ${m('M')}, đường thẳng qua ${m('M')} song song với ${m('\\ell')} cắt ${m('(P)')} tại ${m("M'")}. Điểm ${m("M'")} là <b>hình chiếu song song</b> của ${m('M')} lên ${m('(P)')} theo phương ${m('\\ell')}.`) +
     S(`${m('(P)')} là <b>mặt phẳng chiếu</b>, ${m('\\ell')} là <b>phương chiếu</b>. Hình chiếu của một hình ${m('\\mathcal H')} là tập hợp các hình chiếu của mọi điểm của ${m('\\mathcal H')}.`) +
     note(`Điểm nằm trong ${m('(P)')} có hình chiếu là chính nó. Phương chiếu <b>không</b> được song song hoặc nằm trong ${m('(P)')}.`),
   fig: fgProj(.4)},

  {kind:'kt', tag:'Kiến thức trọng tâm 2', title:'Tính chất của phép chiếu song song',
   body: box(`<b>Được bảo toàn:</b><br>① Hình chiếu của đường thẳng là đường thẳng (hoặc một điểm nếu đường thẳng song song phương chiếu).<br>② Ba điểm thẳng hàng → ba điểm thẳng hàng, <b>giữ nguyên thứ tự</b>.<br>③ Hai đường thẳng song song → hai đường thẳng song song (hoặc trùng nhau).<br>④ <b>Tỉ số</b> độ dài hai đoạn thẳng nằm trên một đường thẳng, hoặc trên hai đường thẳng song song, được giữ nguyên.`) +
     S(`Hệ quả: trung điểm → trung điểm; trọng tâm tam giác → trọng tâm tam giác hình chiếu; hình bình hành → hình bình hành; hình thang → hình thang (tỉ số hai đáy giữ nguyên).`) +
     note(`<b>Không</b> được bảo toàn: độ dài, số đo góc, quan hệ vuông góc, tính chất “đều”, hình tròn. Hai đường thẳng chéo nhau có thể có hình chiếu cắt nhau hoặc song song.`),
   fig: fgTri()},

  {kind:'kt', tag:'Kiến thức trọng tâm 3', title:'Hình chiếu của một hình',
   body: box(`Với mặt phẳng chứa hình không song song phương chiếu:<br>• tam giác → <b>tam giác</b> (bất kì, không còn đều, vuông, cân);<br>• hình bình hành (hình chữ nhật, hình thoi, hình vuông) → <b>hình bình hành</b>;<br>• hình thang → <b>hình thang</b>; • đường tròn → <b>elip</b>.`) +
     S(`Muốn chứng minh hình chiếu là hình bình hành: chỉ ra hai cặp cạnh đối song song, rồi dùng tính chất bảo toàn song song.`) +
     note(`Nếu mặt phẳng chứa hình <b>song song</b> với phương chiếu thì hình chiếu suy biến thành một đoạn thẳng (một đường thẳng).`),
   fig: figCubeP1},

  {kind:'kt', tag:'Kiến thức trọng tâm 4', title:'Hình biểu diễn của hình không gian',
   body: box(`Hình biểu diễn của một hình không gian là <b>hình chiếu song song</b> của nó lên một mặt phẳng (tờ giấy).<br>Quy ước: cạnh nhìn thấy vẽ <b>nét liền</b>, cạnh bị che khuất vẽ <b>nét đứt</b>; giữ quan hệ song song và tỉ số độ dài.`) +
     S(`Hình vuông, hình chữ nhật, hình thoi thường vẽ thành hình bình hành; tam giác vuông, đều vẽ thành tam giác tuỳ ý; hình chóp có đáy hình thang thì vẽ đáy là hình thang với tỉ số hai đáy đúng như thật.`) +
     note(`Trên hình biểu diễn không đo được góc vuông hay độ dài thật: chỉ tin vào quan hệ song song và tỉ số.`),
   fig: pgFig()},

  /* ---- Dạng 1 ---- */
  {kind:'method', tag:'Dạng 1', title:'Tìm hình chiếu của điểm, đoạn thẳng',
   steps:[`Kẻ qua điểm cần chiếu đường thẳng <b>song song với phương chiếu</b>.`, `Tìm giao điểm của đường thẳng đó với mặt phẳng chiếu: đó là hình chiếu (trong hình hộp, thường là một đỉnh).`, `Hình chiếu của đoạn thẳng = đoạn nối hình chiếu của hai đầu mút (hai ảnh trùng nhau thì ảnh là một điểm).`]},
  {kind:'vd', tag:'Ví dụ 1 · Dạng 1', label:'Ví dụ 1', de:`Cho hình lập phương ${m("ABCD.A'B'C'D'")}. Tìm hình chiếu song song của điểm ${m('A')} lên mặt phẳng ${m("(DCC'D')")} theo phương ${m('BC')}.`, fig: figCubeP1,
   sol:[`Đường thẳng qua ${m('A')} song song với ${m('BC')} là đường thẳng ${m('AD')} (vì ${m('ABCD')} là hình vuông, ${m('AD \\parallel BC')}).`, `${m('AD')} cắt ${m("(DCC'D')")} tại ${m('D')}.`], ans:`Hình chiếu của ${m('A')} là điểm ${tb('D')}.`},
  {kind:'vd', tag:'Ví dụ 2 · Dạng 1', label:'Ví dụ 2', de:`Cho hình lập phương ${m("ABCD.A'B'C'D'")}. Tìm hình chiếu song song của đoạn thẳng ${m('AB')} lên mặt phẳng ${m("(DCC'D')")} theo phương ${m("BC'")}.`, fig: figCubeP2,
   sol:[`${m("AD' \\parallel BC'")} (hai cạnh đối của hình chữ nhật ${m("ABC'D'")}) và ${m("D' \\in (DCC'D')")} nên hình chiếu của ${m('A')} là ${m("D'")}.`, `${m("C'")} thuộc ${m("(DCC'D')")} và đường thẳng qua ${m('B')} song song ${m("BC'")} chính là ${m("BC'")}: hình chiếu của ${m('B')} là ${m("C'")}.`, `Vậy hình chiếu của đoạn ${m('AB')} là đoạn ${m("D'C'")}.`], ans:`Đoạn ${tb("D'C'")}.`},

  /* ---- Dạng 2 ---- */
  {kind:'method', tag:'Dạng 2', title:'Nhận biết tính chất đúng – sai',
   steps:[`Nhớ: giữ <b>thẳng hàng, thứ tự, song song, tỉ số</b>; không giữ <b>độ dài, góc, vuông góc</b>.`, `Phát biểu về độ dài tuyệt đối, góc, vuông góc, “đều”, hình tròn: thường <b>sai</b>.`, `Phát biểu về trung điểm, trọng tâm, tỉ số, song song: thường <b>đúng</b>.`]},
  {kind:'vd', tag:'Ví dụ 3 · Dạng 2', label:'Ví dụ 3', de:`Mệnh đề nào đúng? (1) Phép chiếu song song giữ nguyên độ dài đoạn thẳng. (2) Phép chiếu song song biến trung điểm thành trung điểm. (3) Hình chiếu của hai đường thẳng vuông góc luôn vuông góc. (4) Hình chiếu của hai đường thẳng song song là hai đường thẳng song song hoặc trùng nhau.`,
   sol:[`(1) Sai: độ dài thay đổi (đoạn song song phương chiếu biến thành một điểm).`, `(2) Đúng: tỉ số độ dài trên một đường thẳng được bảo toàn (tỉ số 1 : 1).`, `(3) Sai: vuông góc không được bảo toàn.`, `(4) Đúng: tính chất bảo toàn song song.`], ans:`Các mệnh đề đúng: ${tb('(2) và (4)')}.`},

  /* ---- Dạng 3 ---- */
  {kind:'method', tag:'Dạng 3', title:'Tính độ dài, tỉ số bằng tính chất bảo toàn tỉ số',
   steps:[`Chọn hai đoạn nằm trên cùng một đường thẳng (hoặc hai đường thẳng song song) cần so sánh.`, `Viết tỉ số các đoạn gốc bằng tỉ số các đoạn hình chiếu: ${m("\\dfrac{A'B'}{B'C'} = \\dfrac{AB}{BC}")}.`, `Giải tìm độ dài chưa biết; với trung điểm, trọng tâm dùng tỉ số ${m('1:2')}, ${m('2:3')}.`]},
  {kind:'vd', tag:'Ví dụ 4 · Dạng 3', label:'Ví dụ 4', de:`Phép chiếu song song biến ba điểm thẳng hàng ${m('A, B, C')} (${m('B')} giữa ${m('A, C')}) thành ${m("A', B', C'")}. Biết ${m('AB = 6')}, ${m('BC = 9')}, ${m("A'B' = 4")}. Tính ${m("B'C'")}.`, fig: fgProj(.4),
   sol:[`Tỉ số được bảo toàn: ${m("\\dfrac{B'C'}{A'B'} = \\dfrac{BC}{AB} = \\dfrac{9}{6}")}.`, `${m("B'C' = 4 \\cdot \\dfrac{9}{6} = 6")}.`], ans:`${tb("B'C' = 6")}.`},
  {kind:'vd', tag:'Ví dụ 5 · Dạng 3', label:'Ví dụ 5', de:`Phép chiếu song song biến tam giác ${m('ABC')} thành tam giác ${m("A'B'C'")}; ${m('M')} là trung điểm ${m('BC')}, ${m('G')} là trọng tâm tam giác ${m('ABC')}. Biết ${m("A'M' = 9")}. Tính ${m("A'G'")}.`, fig: fgTri(),
   sol:[`${m("M'")} là trung điểm ${m("B'C'")}, ${m("G'")} là trọng tâm tam giác ${m("A'B'C'")}.`, `${m("\\dfrac{A'G'}{A'M'} = \\dfrac{AG}{AM} = \\dfrac{2}{3}")}, nên ${m("A'G' = \\dfrac{2}{3}\\cdot 9 = 6")}.`], ans:`${tb("A'G' = 6")}.`},
  {kind:'vd', tag:'Ví dụ 6 · Dạng 3', label:'Ví dụ 6', de:`Hình thang ${m('ABCD')} có ${m('AB \\parallel CD')}, ${m('CD = 3AB')}. Phép chiếu song song biến ${m('ABCD')} thành tứ giác ${m("A'B'C'D'")} với ${m("A'B' = 4")}. Tính ${m("C'D'")}.`,
   sol:[`${m('AB \\parallel CD')} nên ${m("A'B' \\parallel C'D'")}; tỉ số hai đoạn song song được bảo toàn.`, `${m("\\dfrac{C'D'}{A'B'} = \\dfrac{CD}{AB} = 3")} nên ${m("C'D' = 3\\cdot 4 = 12")}.`], ans:`${tb("C'D' = 12")}.`},

  /* ---- Dạng 4 ---- */
  {kind:'method', tag:'Dạng 4', title:'Hình chiếu của một hình (tam giác, hình bình hành, hình thang)',
   steps:[`Liệt kê các quan hệ song song của hình gốc (cạnh đối, đường chéo cắt tại trung điểm).`, `Các quan hệ đó được bảo toàn ⇒ suy ra hình chiếu là hình gì.`, `Nhớ các tính chất <b>mất đi</b>: vuông góc, bằng nhau, đều.`]},
  {kind:'vd', tag:'Ví dụ 7 · Dạng 4', label:'Ví dụ 7', de:`Hình vuông ${m('ABCD')} tâm ${m('O')} được chiếu song song thành tứ giác ${m("A'B'C'D'")} (không suy biến). Hỏi ${m("A'B'C'D'")} là hình gì? ${m("O")} biến thành điểm nào?`,
   sol:[`${m('AB \\parallel CD')} và ${m('AD \\parallel BC')} nên ${m("A'B' \\parallel C'D'")} và ${m("A'D' \\parallel B'C'")}.`, `Vậy ${m("A'B'C'D'")} là hình bình hành.`, `${m('O')} là trung điểm ${m('AC')} nên ${m("O'")} là trung điểm ${m("A'C'")} (cũng là trung điểm ${m("B'D'")}).`], ans:`${tw('Hình bình hành')}; ${m("O'")} là ${tw('giao điểm hai đường chéo')} của ${m("A'B'C'D'")}.`},

  /* ---- Dạng 5 ---- */
  {kind:'method', tag:'Dạng 5', title:'Hình biểu diễn của hình không gian',
   steps:[`Vẽ đáy trước theo đúng quan hệ song song và tỉ số (hình bình hành, hình thang).`, `Nối đỉnh với các đỉnh đáy: cạnh bị che vẽ <b>nét đứt</b>.`, `Từ độ dài trên hình biểu diễn và tỉ số trên hình thật, tính độ dài còn lại.`]},
  {kind:'vd', tag:'Ví dụ 8 · Dạng 5', label:'Ví dụ 8', de:`Hình chóp ${m('S.ABCD')} có đáy ${m('ABCD')} là hình thang, ${m('AD \\parallel BC')}, ${m('BC = 2')} cm, ${m('AD = 6')} cm. Trong hình biểu diễn, ${m("B'C' = 3")} cm. Tính ${m("A'D'")} (cm) và nêu cách vẽ hình biểu diễn đáy.`, fig: pyFig({pts:{A:[60, 142], D:[240, 142], B:[135, 186], C:[195, 186]}}),
   sol:[`${m("\\dfrac{A'D'}{B'C'} = \\dfrac{AD}{BC} = \\dfrac{6}{2} = 3")}.`, `${m("A'D' = 3\\cdot 3 = 9")} cm.`, `Vẽ ${m("A'D' \\parallel B'C'")} sao cho ${m("A'D'")} dài gấp ba lần ${m("B'C'")}.`], ans:`${tb("A'D' = 9")} cm.`},

  /* ---- Dạng 6 ---- */
  {kind:'method', tag:'Dạng 6', title:'Bài toán bóng nắng (tia sáng song song)',
   steps:[`Tia nắng song song: bóng trên mặt đất là hình chiếu song song của vật; cột thẳng đứng đặt trên mặt đất.`, `Hai cột cùng thời điểm: ${m('\\dfrac{\\text{chiều cao}}{\\text{độ dài bóng}}')} bằng nhau.`, `Lập tỉ lệ và giải; cẩn thận đổi đơn vị.`]},
  {kind:'vd', tag:'Ví dụ 9 · Dạng 6', label:'Ví dụ 9', de:`Cùng một lúc, thanh thẳng đứng cao ${m('2')} m có bóng dài ${m('3')} m. Cột cờ thẳng đứng có bóng dài ${m('12')} m. Tính chiều cao cột cờ.`, fig: figShadow,
   sol:[`Ánh nắng là các tia song song: tỉ số chiều cao : bóng được bảo toàn.`, `${m("\\dfrac{h}{12} = \\dfrac{2}{3}")} nên ${m("h = 12\\cdot\\dfrac{2}{3} = 8")}.`], ans:`Cột cờ cao ${tb('8')} m.`},
  {kind:'vd', tag:'Ví dụ 10 · Dạng 6', label:'Ví dụ 10', de:`Cùng một lúc, thanh cao ${m('2')} m có bóng dài ${m('3')} m. Hai cột thẳng đứng cao ${m('4')} m và ${m('6')} m. Tính tổng độ dài bóng của hai cột.`,
   sol:[`Bóng cột ${m('4')} m: ${m("4\\cdot\\dfrac{3}{2} = 6")} m.`, `Bóng cột ${m('6')} m: ${m("6\\cdot\\dfrac{3}{2} = 9")} m.`, `Tổng ${m('6 + 9 = 15')} m.`], ans:`${tb('15')} m.`},

  /* ---- Luyện tập ---- */
  {kind:'lt', tag:'Luyện tập', label:'Bài 1', de:`Cho hình lập phương ${m("ABCD.A'B'C'D'")}. Tìm hình chiếu song song của điểm ${m("C'")} lên mặt phẳng ${m('(ABCD)')} theo phương ${m("AB'")}.`, fig: figCubeP3,
   sol:[`Đường thẳng qua ${m("C'")} song song với ${m("AB'")} là ${m("C'D")} (vì ${m("AB'C'D")} là hình chữ nhật).`, `${m("C'D")} cắt ${m('(ABCD)')} tại ${m('D')}.`], ans:`Hình chiếu của ${m("C'")} là ${tb('D')}.`},
  {kind:'lt', tag:'Luyện tập', label:'Bài 2', de:`Phép chiếu song song biến ba điểm thẳng hàng ${m('A, B, C')} (${m('B')} giữa ${m('A, C')}) thành ${m("A', B', C'")}. Biết ${m('AB = 10')}, ${m('BC = 15')}, ${m("A'C' = 20")}. Tính ${m("A'B'")} và ${m("B'C'")}.`, fig: fgProj(.4),
   sol:[`${m('AC = 10 + 15 = 25')}, ${m("\\dfrac{A'B'}{A'C'} = \\dfrac{AB}{AC} = \\dfrac{10}{25}")}.`, `${m("A'B' = 20\\cdot\\dfrac{10}{25} = 8")}; ${m("B'C' = 20 - 8 = 12")}.`], ans:`${tb("A'B' = 8")}, ${tb("B'C' = 12")}.`},
  {kind:'lt', tag:'Luyện tập', label:'Bài 3', de:`Phép chiếu song song biến tam giác ${m('ABC')} thành tam giác ${m("A'B'C'")}; ${m('M')} là trung điểm ${m('BC')}, ${m('G')} là trọng tâm tam giác ${m('ABC')}. Biết ${m("G'M' = 2")}. Tính ${m("A'M'")}.`, fig: fgTri(),
   sol:[`${m('GM = \\dfrac{1}{3}AM')}, tỉ số được bảo toàn nên ${m("G'M' = \\dfrac{1}{3}A'M'")}.`, `${m("A'M' = 3\\cdot 2 = 6")}.`], ans:`${tb("A'M' = 6")}.`},
  {kind:'lt', tag:'Luyện tập', label:'Bài 4', de:`Cùng một lúc, cọc thẳng đứng cao ${m('4')} m có bóng dài ${m('5')} m. Một cây có bóng dài ${m('15')} m và một toà nhà có bóng dài ${m('25')} m (cùng mặt đất phẳng). Tính tổng chiều cao của cây và toà nhà.`, fig: figShadow,
   sol:[`Chiều cao cây: ${m("15\\cdot\\dfrac{4}{5} = 12")} m.`, `Chiều cao toà nhà: ${m("25\\cdot\\dfrac{4}{5} = 20")} m.`, `Tổng ${m('12 + 20 = 32')} m.`], ans:`${tb('32')} m.`},

  {kind:'sum', tag:'Tổng kết', title:'Ghi nhớ',
   body:`<ul><li>Hình chiếu song song của ${m('M')}: giao điểm của ${m('(P)')} với đường thẳng qua ${m('M')} song song phương chiếu.</li><li><b>Giữ:</b> thẳng hàng và thứ tự, song song, <b>tỉ số</b> (trung điểm, trọng tâm).</li><li><b>Không giữ:</b> độ dài, góc, vuông góc, “đều”, hình tròn.</li><li>Hình biểu diễn: nét liền – nét đứt; hình bình hành, hình thang giữ quan hệ song song và tỉ số.</li><li>Bóng nắng: tỉ số chiều cao : bóng bằng nhau cho mọi cột thẳng đứng cùng lúc.</li></ul>` + box('Về nhà: làm Luyện tập 1–4 và các bài trong phiếu luyện tập.')},
]},
{ id:'on-tap-c4', name:'Ôn tập chương IV', desc:'Hệ thống kiến thức chương IV (giao tuyến, đường thẳng – mặt phẳng song song, hai mặt phẳng song song, phép chiếu song song); ví dụ tổng hợp từng dạng.', slides:[
  TITLE('Ôn tập chương IV. Quan hệ song song trong không gian', ['Hệ thống hoá kiến thức Bài 10–14.', 'Phân loại và giải 5 dạng bài tổng hợp: giao tuyến; đường thẳng – mặt phẳng song song và thiết diện; hai mặt phẳng song song; Thales và chóp cắt; phép chiếu song song.', 'Tự phát hiện các lỗi hay gặp (thiếu “cắt nhau”, thiếu “không nằm trong”).']),

  {kind:'kt', tag:'Hệ thống kiến thức 1', title:'Hai đường thẳng – đường thẳng và mặt phẳng',
   body: box(`<b>Hai đường thẳng song song:</b> cùng song song đường thứ ba thì song song nhau; hai mặt phẳng cắt nhau chứa hai đường song song thì giao tuyến song song với chúng.<br><b>Đường thẳng ∥ mặt phẳng:</b> ${m('d \\parallel a,\\ a \\subset (P),\\ d \\not\\subset (P) \\Rightarrow d \\parallel (P)')}.`) +
     S(`Mặt phẳng ${m('(\\alpha)')} chứa ${m('d \\parallel (P)')} và cắt ${m('(P)')} thì giao tuyến song song với ${m('d')}.`) +
     note(`Hai đường thẳng không có điểm chung có thể <b>chéo nhau</b>; hai đường thẳng cùng song song với một mặt phẳng có thể cắt nhau hoặc chéo nhau.`),
   fig: figParMN},

  {kind:'kt', tag:'Hệ thống kiến thức 2', title:'Hai mặt phẳng song song và phép chiếu song song',
   body: box(`${m('(P) \\parallel (Q)')} khi ${m('(P)')} chứa hai đường thẳng <b>cắt nhau</b> cùng song song với ${m('(Q)')}. Mặt phẳng thứ ba cắt hai mặt phẳng song song theo hai giao tuyến song song. Thales trong không gian: các đoạn tương ứng tỉ lệ; chóp cắt bởi mặt phẳng song song đáy: chu vi nhân ${m('k')}, diện tích nhân ${m('k^2')}.`) +
     S(`Phép chiếu song song giữ thẳng hàng, thứ tự, song song và <b>tỉ số</b> (trung điểm, trọng tâm); không giữ độ dài, góc, vuông góc.`) +
     note(`Điều kiện “hai đường thẳng <b>cắt nhau</b>” không được bỏ khi chứng minh hai mặt phẳng song song.`),
   fig: thalesFig},

  /* ---- Dạng 1 ---- */
  {kind:'method', tag:'Dạng 1', title:'Tìm giao tuyến của hai mặt phẳng',
   steps:[`Tìm hai điểm chung của hai mặt phẳng (thường nối giao điểm của các đường thẳng cắt nhau).`, `Nếu hai mặt phẳng chứa hai đường thẳng <b>song song</b>: giao tuyến là đường thẳng qua điểm chung và song song với chúng.`, `Kiểm tra lại: giao tuyến thuộc cả hai mặt phẳng.`]},
  {kind:'vd', tag:'Ví dụ 1 · Dạng 1', label:'Ví dụ 1', de:`Cho hình chóp ${m('S.ABCD')} có đáy là hình bình hành. Tìm giao tuyến của ${m('(SAD)')} và ${m('(SBC)')}.`, fig: figSx,
   sol:[`${m('S')} là điểm chung.`, `${m('AD \\subset (SAD)')}, ${m('BC \\subset (SBC)')}, ${m('AD \\parallel BC')} nên giao tuyến là đường thẳng ${m('Sx')} qua ${m('S')} song song với ${m('AD, BC')}.`], ans:`${tb('Sx \\parallel AD \\parallel BC')}.`},

  /* ---- Dạng 2 ---- */
  {kind:'method', tag:'Dạng 2', title:'Đường thẳng song song mặt phẳng; thiết diện',
   steps:[`Tìm trong mặt phẳng một đường thẳng song song với đường đã cho (đường trung bình, cạnh đối hình bình hành).`, `Nêu rõ đường thẳng đã cho <b>không nằm trong</b> mặt phẳng.`, `Thiết diện song song hai đường thẳng: vẽ lần lượt các đoạn giao tuyến, dùng Thales tính độ dài.`]},
  {kind:'vd', tag:'Ví dụ 2 · Dạng 2', label:'Ví dụ 2', de:`Cho tứ diện ${m('ABCD')}, ${m('M, N')} lần lượt là trung điểm ${m('AB, AC')}. Chứng minh ${m('MN \\parallel (BCD)')}.`, fig: figParMN,
   sol:[`${m('MN')} là đường trung bình của tam giác ${m('ABC')} nên ${m('MN \\parallel BC')}.`, `${m('BC \\subset (BCD)')} và ${m('MN \\not\\subset (BCD)')} (vì ${m('M \\notin (BCD)')}).`, `Vậy ${m('MN \\parallel (BCD)')}.`], ans:`${tb('MN \\parallel (BCD)')}.`},
  {kind:'vd', tag:'Ví dụ 3 · Dạng 2', label:'Ví dụ 3', de:`Cho tứ diện ${m('ABCD')} có ${m('AD = 9')}, ${m('BC = 6')}. Điểm ${m('M')} thuộc ${m('AB')} với ${m('AM = \\dfrac{1}{3}AB')}. Mặt phẳng qua ${m('M')} song song với ${m('BC')} và ${m('AD')} cắt ${m('AC, CD, BD')} lần lượt tại ${m('N, P, Q')}. Tính chu vi ${m('MNPQ')}.`, fig: secFig(1 / 3),
   sol:[`${m('MN \\parallel BC')} nên ${m('\\dfrac{MN}{BC} = \\dfrac{AM}{AB} = \\dfrac{1}{3}')}, ${m('MN = 2')}.`, `${m('MQ \\parallel AD')} nên ${m('\\dfrac{MQ}{AD} = \\dfrac{BM}{BA} = \\dfrac{2}{3}')}, ${m('MQ = 6')}.`, `${m('MNPQ')} là hình bình hành (${m('NP \\parallel AD \\parallel MQ')}, ${m('PQ \\parallel BC \\parallel MN')}): chu vi ${m('2(2 + 6) = 16')}.`], ans:`${tb('16')}.`},

  /* ---- Dạng 3 ---- */
  {kind:'method', tag:'Dạng 3', title:'Chứng minh hai mặt phẳng song song',
   steps:[`Chọn hai đường thẳng <b>cắt nhau</b> trong mặt phẳng thứ nhất.`, `Chỉ ra mỗi đường song song với một đường thẳng nằm trong mặt phẳng thứ hai.`, `Kiểm tra hai đường thẳng đó không nằm trong mặt phẳng thứ hai, rồi kết luận.`]},
  {kind:'vd', tag:'Ví dụ 4 · Dạng 3', label:'Ví dụ 4', de:`Cho hình lập phương ${m("ABCD.A'B'C'D'")}. Chứng minh ${m("(AB'D') \\parallel (BC'D)")}.`, fig: figTri2,
   sol:[`${m("AB' \\parallel DC'")} và ${m("AD' \\parallel BC'")} (cạnh đối của các hình chữ nhật ${m("AB'C'D")}, ${m("ABC'D'")}).`, `${m("AB', AD'")} cắt nhau tại ${m('A')} trong ${m("(AB'D')")} và không nằm trong ${m("(BC'D)")}.`, `Vậy ${m("(AB'D') \\parallel (BC'D)")}.`], ans:`${tb("(AB'D') \\parallel (BC'D)")}.`},

  /* ---- Dạng 4 ---- */
  {kind:'method', tag:'Dạng 4', title:'Định lí Thales và hình chóp cắt bởi mặt phẳng song song đáy',
   steps:[`Ba mặt phẳng song song chắn trên hai cát tuyến các đoạn tương ứng tỉ lệ.`, `Mặt phẳng song song đáy cắt chóp theo đa giác đồng dạng đáy, tỉ số ${m('k = \\dfrac{SA\'}{SA}')}.`, `Chu vi nhân ${m('k')}, diện tích nhân ${m('k^2')}.`]},
  {kind:'vd', tag:'Ví dụ 5 · Dạng 4', label:'Ví dụ 5', de:`Ba mặt phẳng song song cắt hai đường thẳng tại ${m('A, B, C')} và ${m("A', B', C'")} (${m('B, B\'')} ở giữa). ${m('AB = 6')}, ${m('BC = 9')}, ${m("A'C' = 25")}. Tính ${m("A'B'")}.`, fig: thalesFig,
   sol:[`${m('AC = 6 + 9 = 15')}; Thales: ${m("\\dfrac{A'B'}{A'C'} = \\dfrac{AB}{AC} = \\dfrac{6}{15}")}.`, `${m("A'B' = 25\\cdot\\dfrac{6}{15} = 10")}.`], ans:`${tb("A'B' = 10")}.`},
  {kind:'vd', tag:'Ví dụ 6 · Dạng 4', label:'Ví dụ 6', de:`Hình chóp ${m('S.ABC')}, mặt phẳng song song với ${m('(ABC)')} cắt ${m('SA, SB, SC')} tại ${m("A', B', C'")} với ${m("\\dfrac{SA'}{SA} = \\dfrac{2}{5}")}. Chu vi ${m('ABC')} bằng ${m('35')}, diện tích ${m('50')}. Tính chu vi và diện tích ${m("A'B'C'")}.`, fig: stFig(2 / 5),
   sol:[`${m("A'B'C'")} đồng dạng ${m('ABC')} theo tỉ số ${m('k = \\dfrac{2}{5}')}.`, `Chu vi ${m('\\dfrac{2}{5}\\cdot 35 = 14')}; diện tích ${m('\\dfrac{4}{25}\\cdot 50 = 8')}.`], ans:`Chu vi ${tb('14')}, diện tích ${tb('8')}.`},

  /* ---- Dạng 5 ---- */
  {kind:'method', tag:'Dạng 5', title:'Phép chiếu song song và mệnh đề đúng – sai',
   steps:[`Bảo toàn: thẳng hàng, thứ tự, song song, tỉ số. Không bảo toàn: độ dài, góc, vuông góc.`, `Mệnh đề thiếu điều kiện (“cắt nhau”, “không nằm trong”): thường sai; tìm phản ví dụ.`, `Tính độ dài trên hình chiếu bằng tỉ số của các đoạn trên cùng đường thẳng hoặc hai đường song song.`]},
  {kind:'vd', tag:'Ví dụ 7 · Dạng 5', label:'Ví dụ 7', de:`Phép chiếu song song biến ba điểm thẳng hàng ${m('A, B, C')} (${m('B')} giữa ${m('A, C')}) thành ${m("A', B', C'")}; ${m('AB = 10')}, ${m('BC = 15')}, ${m("B'C' = 6")}. Tính ${m("A'B'")}.`, fig: fgProj(.4),
   sol:[`${m("\\dfrac{A'B'}{B'C'} = \\dfrac{AB}{BC} = \\dfrac{10}{15}")}.`, `${m("A'B' = 6\\cdot\\dfrac{10}{15} = 4")}.`], ans:`${tb("A'B' = 4")}.`},
  {kind:'vd', tag:'Ví dụ 8 · Dạng 5', label:'Ví dụ 8', de:`Mệnh đề nào đúng? (1) Hai đường thẳng không có điểm chung thì song song. (2) Nếu ${m('(P)')} chứa hai đường thẳng cắt nhau cùng song song với ${m('(Q)')} thì ${m('(P) \\parallel (Q)')}. (3) Phép chiếu song song giữ nguyên độ dài. (4) Hai mặt phẳng cùng song song với một đường thẳng thì song song nhau.`,
   sol:[`(1) Sai: có thể chéo nhau.`, `(2) Đúng: điều kiện hai mặt phẳng song song.`, `(3) Sai: độ dài không được bảo toàn.`, `(4) Sai: hai mặt phẳng có thể cắt nhau (theo giao tuyến song song với đường thẳng đó).`], ans:`Chỉ mệnh đề ${tb('(2)')} đúng.`},

  /* ---- Luyện tập ---- */
  {kind:'lt', tag:'Luyện tập', label:'Bài 1', de:`Cho hình chóp ${m('S.ABCD')} có đáy là hình bình hành. Tìm giao tuyến của ${m('(SAB)')} và ${m('(SCD)')}.`, fig: figSxAB,
   sol:[`${m('S')} là điểm chung; ${m('AB \\subset (SAB)')}, ${m('CD \\subset (SCD)')}, ${m('AB \\parallel CD')}.`, `Giao tuyến là đường thẳng ${m('Sx')} qua ${m('S')} song song ${m('AB, CD')}.`], ans:`${tb('Sx \\parallel AB \\parallel CD')}.`},
  {kind:'lt', tag:'Luyện tập', label:'Bài 2', de:`Cho tứ diện ${m('ABCD')} có ${m('AD = 12')}, ${m('BC = 8')}. Điểm ${m('M')} thuộc ${m('AB')} với ${m('AM = \\dfrac{1}{4}AB')}. Mặt phẳng qua ${m('M')} song song với ${m('BC')} và ${m('AD')} cắt các cạnh tại ${m('N, P, Q')}. Tính chu vi thiết diện.`, fig: secFig(1 / 4),
   sol:[`${m('MN = \\dfrac{1}{4}BC = 2')}.`, `${m('MQ = \\dfrac{3}{4}AD = 9')}.`, `Thiết diện là hình bình hành, chu vi ${m('2(2 + 9) = 22')}.`], ans:`${tb('22')}.`},
  {kind:'lt', tag:'Luyện tập', label:'Bài 3', de:`Cho hình lập phương ${m("ABCD.A'B'C'D'")}. Chứng minh ${m("(A'BD) \\parallel (CB'D')")}.`, fig: cubeFig({fill:[['A\'', 'B', 'D'], ['C', "B'", "D'"]], aria:"Hình lập phương: hai mặt phẳng (A'BD) và (CB'D') song song"}),
   sol:[`${m("A'BCD'")} là hình chữ nhật nên ${m("A'B \\parallel D'C")}; ${m("BDD'B'")} là hình chữ nhật nên ${m("BD \\parallel B'D'")}.`, `${m("A'B, BD")} cắt nhau tại ${m('B')} trong ${m("(A'BD)")}, không nằm trong ${m("(CB'D')")}; ${m("D'C, B'D' \\subset (CB'D')")}.`, `Vậy ${m("(A'BD) \\parallel (CB'D')")}.`], ans:`${tb("(A'BD) \\parallel (CB'D')")}.`},
  {kind:'lt', tag:'Luyện tập', label:'Bài 4', de:`Hình thang ${m('ABCD')} có ${m('AB \\parallel CD')}, ${m('AB = 3')}, ${m('CD = 9')}; hai đường chéo cắt nhau tại ${m('I')}. Phép chiếu song song biến ${m('ABCD')} thành ${m("A'B'C'D'")}, ${m('I')} thành ${m("I'")}. Biết ${m("B'D' = 16")}. Tính ${m("B'I'")}.`,
   sol:[`${m('\\dfrac{IB}{ID} = \\dfrac{AB}{CD} = \\dfrac{1}{3}')} nên ${m('IB = \\dfrac{1}{4}BD')}.`, `Tỉ số trên cùng đường thẳng ${m('BD')} được bảo toàn: ${m("B'I' = \\dfrac{1}{4}B'D' = 4")}.`], ans:`${tb("B'I' = 4")}.`},

  {kind:'sum', tag:'Tổng kết', title:'Ghi nhớ',
   body:`<ul><li>Giao tuyến: hai điểm chung, hoặc điểm chung + phương song song.</li><li>${m('d \\parallel (P)')}: song song một đường trong ${m('(P)')} và ${m('d \\not\\subset (P)')}.</li><li>${m('(P) \\parallel (Q)')}: hai đường thẳng <b>cắt nhau</b> trong ${m('(P)')} cùng song song ${m('(Q)')}.</li><li>Thales, chóp cắt song song đáy: chu vi × ${m('k')}, diện tích × ${m('k^2')}.</li><li>Phép chiếu song song giữ tỉ số, thẳng hàng, song song; không giữ độ dài, góc, vuông góc.</li></ul>` + box('Về nhà: làm Luyện tập 1–4 và các bài trong phiếu luyện tập.')},
]},
]});
})();
