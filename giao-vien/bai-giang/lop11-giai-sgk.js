/* =====================================================================
   GIẢI BÀI TẬP SGK – LỚP 11 (Kết nối tri thức, tập 1) – câu VẬN DỤNG / câu KHÓ, lời giải ngắn gọn.
   Một bộ chung: Bài 4. Phương trình lượng giác cơ bản + Bài tập cuối chương I (gắn vào bài giảng “Ôn tập chương I”).
   Lecture.addSgk(lớp, mã bài giảng, [trang chiếu…]) – nạp SAU tệp bài giảng lop11.js.
   Đề ghi tóm tắt, kèm số trang/số bài để thầy đối chiếu SGK.
   ===================================================================== */
(() => {
const m = tm;
const box = h => `<div class="lk-box">${h}</div>`, note = h => `<div class="lk-note">⚠️ ${h}</div>`;
const f = (a, b) => `\\dfrac{${a}}{${b}}`, K = '(k \\in \\mathbb{Z})';

Lecture.addSgk('lop11', 'on-tap-c1', [
  {kind:'title', tag:'Toán 11 · Kết nối tri thức · Giải bài tập SGK', title:'Phương trình lượng giác cơ bản và Ôn tập chương I', sub:'Các câu vận dụng, câu khó – SGK tập 1, trang 35 – 41',
   points:['Bài 4: Vận dụng (tr. 35) – pha của Mặt Trăng; Bài 1.20, 1.21 (đạn pháo), 1.22 (dao động điều hoà) – tr. 39.',
     'Cuối chương I (tr. 41): Bài 1.33b (tập giá trị), 1.34b, c (phương trình), 1.35 (huyết áp), 1.36 (khúc xạ ánh sáng).']},

  {kind:'kt', tag:'Nhắc nhanh', title:'Ba kĩ thuật dùng trong các bài này',
   body:`<ol class="lk-steps"><li><b>Đưa về cùng một hàm:</b> ${m('-\\cos v = \\cos(\\pi - v)')}, ${m('-\\sin v = \\cos\\left(\\tfrac{\\pi}{2} + v\\right)')}, ${m('2\\sin^2 x - 1 = -\\cos 2x')}; rồi dùng ${m('\\cos u = \\cos v \\Leftrightarrow u = \\pm v + k2\\pi')}.</li>
     <li><b>Mô hình thực tế</b> ${m('y = A + B\\sin(\\omega t + \\varphi)')}: giá trị trong ${m('[A - |B|;\\ A + |B|]')}, chu kì ${m('T = \\tfrac{2\\pi}{|\\omega|}')}.</li>
     <li><b>Đếm nghiệm theo thời gian:</b> viết họ nghiệm ${m('t = t_0 + kT')}, giải bất phương trình theo ${m('k \\in \\mathbb{Z}')}.</li></ol>` +
     note(`Phương trình ${m('\\tan u = \\tan v')}: nhớ điều kiện ${m('\\cos u \\ne 0,\\ \\cos v \\ne 0')}.`)},

  /* ---------- BÀI 4 ---------- */
  {kind:'vd', tag:'SGK tr. 35 · Vận dụng', label:'Câu 1', de:`Phần Mặt Trăng được chiếu sáng nhìn từ Trái Đất là ${m(`F = ${f(1, 2)}(1 - \\cos\\alpha)`)} với ${m('0^\\circ \\le \\alpha \\le 360^\\circ')} (${m('\\alpha')} là góc Mặt Trời – Trái Đất – Mặt Trăng). Tìm ${m('\\alpha')} ứng với: a) trăng mới ${m('F = 0')}; b) trăng lưỡi liềm ${m('F = 0{,}25')}; c) trăng bán nguyệt ${m('F = 0{,}5')}; d) trăng tròn ${m('F = 1')}.`,
   sol:[`${m(`${f(1, 2)}(1 - \\cos\\alpha) = F \\Leftrightarrow \\cos\\alpha = 1 - 2F`)}.`,
     `a) ${m('\\cos\\alpha = 1 \\Rightarrow \\alpha \\in \\{0^\\circ;\\ 360^\\circ\\}')}. b) ${m(`\\cos\\alpha = ${f(1, 2)} \\Rightarrow \\alpha \\in \\{60^\\circ;\\ 300^\\circ\\}`)}.`,
     `c) ${m('\\cos\\alpha = 0 \\Rightarrow \\alpha \\in \\{90^\\circ;\\ 270^\\circ\\}')}. d) ${m('\\cos\\alpha = -1 \\Rightarrow \\alpha = 180^\\circ')}.`],
   ans:`a) ${tb('0^\\circ;\\ 360^\\circ')} · b) ${tb('60^\\circ;\\ 300^\\circ')} · c) ${tb('90^\\circ;\\ 270^\\circ')} · d) ${tb('180^\\circ')}.`},

  {kind:'vd', tag:'SGK tr. 39 · Bài 1.20', label:'Câu 2', de:`Giải các phương trình: a) ${m('\\sin 2x + \\cos 4x = 0')}; b) ${m('\\cos 3x = -\\cos 7x')}.`,
   sol:[`a) ${m('\\cos 4x = -\\sin 2x = \\cos\\left(\\tfrac{\\pi}{2} + 2x\\right) \\Leftrightarrow 4x = \\pm\\left(\\tfrac{\\pi}{2} + 2x\\right) + k2\\pi')}.`,
     `${m('2x = \\tfrac{\\pi}{2} + k2\\pi \\Rightarrow x = \\tfrac{\\pi}{4} + k\\pi')}; ${m('6x = -\\tfrac{\\pi}{2} + k2\\pi \\Rightarrow x = -\\tfrac{\\pi}{12} + k\\tfrac{\\pi}{3}')}.`,
     `b) ${m('\\cos 3x = \\cos(\\pi - 7x) \\Leftrightarrow 3x = \\pm(\\pi - 7x) + k2\\pi')}.`,
     `${m('10x = \\pi + k2\\pi \\Rightarrow x = \\tfrac{\\pi}{10} + k\\tfrac{\\pi}{5}')}; ${m('-4x = -\\pi + k2\\pi \\Rightarrow x = \\tfrac{\\pi}{4} + k\\tfrac{\\pi}{2}')}.`],
   ans:`a) ${tb('x = \\tfrac{\\pi}{4} + k\\pi;\\ x = -\\tfrac{\\pi}{12} + k\\tfrac{\\pi}{3}')} · b) ${tb('x = \\tfrac{\\pi}{10} + k\\tfrac{\\pi}{5};\\ x = \\tfrac{\\pi}{4} + k\\tfrac{\\pi}{2}')} ${m(K)}.`},

  {kind:'vd', tag:'SGK tr. 39 · Bài 1.21', label:'Câu 3', de:`Đạn pháo bắn với vận tốc ban đầu ${m('v_0 = 500')} m/s, hợp với phương ngang góc ${m('\\alpha')}. Bỏ qua sức cản không khí, quỹ đạo là ${m(`y = -${f('g', '2v_0^2\\cos^2\\alpha')}x^2 + x\\tan\\alpha`)} (${m('g = 9{,}8')} m/s²). a) Tính tầm xa theo ${m('\\alpha')}. b) Tìm ${m('\\alpha')} để trúng mục tiêu cách ${m('22\\,000')} m.`,
   sol:[`a) Đạn chạm đất khi ${m('y = 0,\\ x \\gt 0')}: ${m(`x = ${f('2v_0^2\\sin\\alpha\\cos\\alpha', 'g')} = ${f('v_0^2\\sin 2\\alpha', 'g')} = ${f('1\\,250\\,000\\sin 2\\alpha', '49')}`)} (m).`,
     `b) ${m(`${f('1\\,250\\,000\\sin 2\\alpha', '49')} = 22\\,000 \\Leftrightarrow \\sin 2\\alpha = ${f(539, 625)} = 0{,}8624`)}.`,
     `${m('2\\alpha \\approx 59{,}6^\\circ')} hoặc ${m('2\\alpha \\approx 180^\\circ - 59{,}6^\\circ = 120{,}4^\\circ')} (với ${m('0^\\circ \\lt \\alpha \\lt 90^\\circ')}).`],
   ans:`a) ${tb(`x = ${f('1\\,250\\,000\\sin 2\\alpha', '49')}`)} m · b) ${tb('\\alpha \\approx 29{,}8^\\circ')} hoặc ${tb('\\alpha \\approx 60{,}2^\\circ')}.`},

  {kind:'vd', tag:'SGK tr. 39 · Bài 1.22', label:'Câu 4', de:`Một vật dao động điều hoà theo phương trình ${m('x = 2\\cos\\left(5t - \\dfrac{\\pi}{6}\\right)')} (${m('x')}: cm, ${m('t')}: giây). Từ ${m('t = 0')} đến ${m('t = 6')} giây, vật đi qua vị trí cân bằng bao nhiêu lần?`,
   sol:[`Vị trí cân bằng: ${m('x = 0 \\Leftrightarrow \\cos\\left(5t - \\tfrac{\\pi}{6}\\right) = 0 \\Leftrightarrow 5t - \\tfrac{\\pi}{6} = \\tfrac{\\pi}{2} + k\\pi')}.`,
     `${m(`t = ${f('2\\pi', 15)} + k${f('\\pi', 5)}`)} ${m(K)}.`,
     `${m(`0 \\le ${f('2\\pi', 15)} + k${f('\\pi', 5)} \\le 6 \\Leftrightarrow -${f(2, 3)} \\le k \\le ${f(30, '\\pi')} - ${f(2, 3)} \\approx 8{,}88`)} ⇒ ${m('k \\in \\{0;\\ 1;\\ \\ldots;\\ 8\\}')}.`],
   ans:`Vật qua vị trí cân bằng ${tb('9')} lần.`},

  /* ---------- CUỐI CHƯƠNG I ---------- */
  {kind:'vd', tag:'SGK tr. 41 · Bài 1.33b', label:'Câu 5', de:`Tìm tập giá trị của hàm số ${m('y = \\sin x + \\cos x')}.`,
   sol:[`Công thức cộng: ${m(`\\sin x + \\cos x = \\sqrt{2}\\left(\\sin x\\cos\\tfrac{\\pi}{4} + \\cos x\\sin\\tfrac{\\pi}{4}\\right) = \\sqrt{2}\\sin\\left(x + \\tfrac{\\pi}{4}\\right)`)}.`,
     `${m('-1 \\le \\sin\\left(x + \\tfrac{\\pi}{4}\\right) \\le 1 \\Rightarrow -\\sqrt{2} \\le y \\le \\sqrt{2}')}; hai giá trị đầu mút đều đạt được.`],
   ans:`Tập giá trị ${tb('[-\\sqrt{2};\\ \\sqrt{2}]')}.`},

  {kind:'vd', tag:'SGK tr. 41 · Bài 1.34b, c', label:'Câu 6', de:`Giải các phương trình: b) ${m('2\\sin^2 x - 1 + \\cos 3x = 0')}; c) ${m('\\tan\\left(2x + \\dfrac{\\pi}{5}\\right) = \\tan\\left(x - \\dfrac{\\pi}{6}\\right)')}.`,
   sol:[`b) ${m('2\\sin^2 x - 1 = -\\cos 2x')} nên phương trình ${m('\\Leftrightarrow \\cos 3x = \\cos 2x \\Leftrightarrow 3x = \\pm 2x + k2\\pi')}.`,
     `${m('x = k2\\pi')} hoặc ${m(`x = k${f('2\\pi', 5)}`)}; họ thứ nhất nằm trong họ thứ hai.`,
     `c) Điều kiện ${m('\\cos\\left(2x + \\tfrac{\\pi}{5}\\right) \\ne 0,\\ \\cos\\left(x - \\tfrac{\\pi}{6}\\right) \\ne 0')}. ${m('2x + \\tfrac{\\pi}{5} = x - \\tfrac{\\pi}{6} + k\\pi \\Leftrightarrow x = -\\tfrac{11\\pi}{30} + k\\pi')}.`,
     `Khi đó ${m('x - \\tfrac{\\pi}{6} = -\\tfrac{8\\pi}{15} + k\\pi')} và ${m('2x + \\tfrac{\\pi}{5} = -\\tfrac{8\\pi}{15} + 2k\\pi')}, đều không có dạng ${m('\\tfrac{\\pi}{2} + n\\pi')} ⇒ thoả mãn điều kiện.`],
   ans:`b) ${tb(`x = k${f('2\\pi', 5)}`)} · c) ${tb('x = -\\tfrac{11\\pi}{30} + k\\pi')} ${m(K)}.`},

  {kind:'vd', tag:'SGK tr. 41 · Bài 1.35', label:'Câu 7', de:`Huyết áp của một người được mô hình hoá bởi ${m('p(t) = 115 + 25\\sin(160\\pi t)')} (${m('p')}: mmHg, ${m('t')}: phút). a) Tìm chu kì của hàm số. b) Tính số nhịp tim mỗi phút. c) Tìm chỉ số huyết áp (tâm thu/tâm trương) và so sánh với mức bình thường 120/80.`,
   sol:[`a) ${m(`T = ${f('2\\pi', '160\\pi')} = ${f(1, 80)}`)} (phút).`,
     `b) Mỗi chu kì là một nhịp tim ⇒ số nhịp mỗi phút ${m(`= 1 : ${f(1, 80)} = 80`)}.`,
     `c) ${m('-1 \\le \\sin(160\\pi t) \\le 1 \\Rightarrow 90 \\le p(t) \\le 140')}: huyết áp ${m('140/90')}, cao hơn mức 120/80.`],
   ans:`a) ${tb(`T = ${f(1, 80)}`)} phút · b) ${tb('80')} nhịp/phút · c) ${tb('140/90')} mmHg – cao hơn bình thường.`},

  {kind:'vd', tag:'SGK tr. 41 · Bài 1.36', label:'Câu 8', de:`Tia sáng đi từ không khí (${m('n_1 = 1')}) vào nước (${m('n_2 = 1{,}33')}) với góc tới ${m('i = 50^\\circ')}. Theo định luật khúc xạ ${m(`${f('\\sin i', '\\sin r')} = ${f('n_2', 'n_1')}`)}, tính góc khúc xạ ${m('r')}.`,
   sol:[`${m(`\\sin r = ${f('n_1\\sin i', 'n_2')} = ${f('\\sin 50^\\circ', '1{,}33')} \\approx 0{,}5760`)}.`,
     `Vì ${m('0^\\circ \\lt r \\lt 90^\\circ')} nên dùng máy tính: ${m('r \\approx 35{,}17^\\circ')}.`],
   ans:`${tb("r \\approx 35^\\circ 10'")}.`},

  {kind:'sum', tag:'Tổng kết', title:'Lỗi hay gặp',
   body:`<ul><li>Chia hai vế cho biểu thức có thể bằng 0 – hãy chuyển về cùng một hàm hoặc đặt nhân tử chung.</li>
     <li>Quên điều kiện của ${m('\\tan, \\cot')}; quên ${m(K)}; không gộp họ nghiệm trùng (Bài 1.34b).</li>
     <li>Bài thực tế: nhầm đơn vị (phút/giây, độ/radian); với ${m('\\sin 2\\alpha = c')} phải lấy cả ${m('2\\alpha')} và ${m('180^\\circ - 2\\alpha')}.</li>
     <li>Đếm nghiệm theo thời gian: giải bất phương trình theo ${m('k')}, đếm số nguyên ${m('k')} (Bài 1.22).</li></ul>` +
     box('Luyện thêm: web <b>Học mà chơi</b> – Toán 11, Ôn tập chương I và phiếu 🏋️ Luyện tập.')},
], 'Bài 4. Phương trình lượng giác cơ bản và Ôn tập chương I');
})();


/* =====================================================================
   BÀI 5. DÃY SỐ – CÁC CÂU VẬN DỤNG
   ===================================================================== */
(() => {
const m = tm;
const box = h => `<div class="lk-box">${h}</div>`, note = h => `<div class="lk-note">⚠️ ${h}</div>`;
const F_luong = () => barSVG(['Năm 1','Năm 2','Năm 3','Năm 4','Năm 5'], [200,225,250,275,300], 50, 'triệu đồng');
const F_tietKiem = () => barSVG(['Ban đầu','Tháng 1','Tháng 2','Tháng 12'], [100,100.5,101.0025,106.1678], 20, 'triệu đồng');
const F_traGop = () => barSVG(['0','1','2','3','4','5','6'], [100,98.8,97.5904,96.3711,95.1421,93.9032,92.6545], 20, 'triệu đồng');

Lecture.addSgk('lop11', 'bai-5', [
  {kind:'title', tag:'Toán 11 · Kết nối tri thức · Giải bài tập SGK', title:'Bài 5. Dãy số', sub:'Các câu vận dụng – SGK tập 1, trang 46 – 47',
   points:['Vận dụng (tr. 46): mô hình tiền lương tăng hằng năm.', 'Bài 2.6 (tr. 46): gửi tiết kiệm theo lãi kép.', 'Bài 2.7 (tr. 47): số tiền còn nợ khi vay trả góp.']},

  {kind:'kt', tag:'Nhắc nhanh', title:'Ba mô hình dãy số thường gặp',
   body:box(`<b>Tăng đều một lượng cố định:</b> ${m('u_n=u_1+(n-1)d')}.`) +
     box(`<b>Lãi kép:</b> nếu lãi suất mỗi kì là ${m('r')} thì ${m('A_n=A_0(1+r)^n')}.`) +
     box(`<b>Vay trả góp:</b> nợ mới = nợ cũ + tiền lãi − tiền trả, nên ${m('A_n=(1+r)A_{n-1}-a')}.`) +
     note('Đổi lãi suất phần trăm về số thập phân và thống nhất đơn vị tiền trước khi tính.')},

  {kind:'vd', tag:'SGK tr. 46 · Vận dụng', label:'Vận dụng', fig:F_luong(), figAt:2,
   de:`Anh Thanh nhận lương năm đầu ${m('200')} triệu đồng; mỗi năm tiếp theo tăng ${m('25')} triệu đồng. Gọi ${m('s_n')} là lương năm thứ ${m('n')}, với ${m('s_1=200,\\ s_n=s_{n-1}+25')} (${m('n\\ge2')}). a) Tính lương năm thứ ${m('5')}. b) Chứng minh ${m('(s_n)')} tăng và giải thích ý nghĩa thực tế.`,
   sol:[`Do mỗi năm tăng ${m('25')} triệu đồng nên ${m('s_n=200+25(n-1)')}. Suy ra ${m('s_5=200+25\\cdot4=300')} (triệu đồng).`,
     `Với mọi ${m('n\\ge1')}, ${m('s_{n+1}-s_n=25\\gt0')}, do đó ${m('(s_n)')} là dãy số tăng.`,
     `Kết quả có nghĩa là tiền lương của anh Thanh năm sau luôn cao hơn năm trước ${m('25')} triệu đồng.`],
   ans:`Lương năm thứ ${m('5')} là ${tb('300\\text{ triệu đồng}')}; tiền lương tăng đều qua từng năm.`},

  {kind:'vd', tag:'SGK tr. 46 · Bài 2.6', label:'Bài 2.6', fig:F_tietKiem(), figAt:3,
   de:`Ông An gửi tiết kiệm ${m('100')} triệu đồng, kì hạn một tháng, lãi suất ${m('6\\%')} một năm và tính lãi kép. Số tiền sau ${m('n')} tháng là ${m('A_n=100\\left(1+\\dfrac{0{,}06}{12}\\right)^n')}. a) Tính số tiền sau tháng thứ nhất và thứ hai. b) Tính số tiền sau một năm.`,
   sol:[`Lãi suất một tháng là ${m('\\dfrac{0{,}06}{12}=0{,}005')}, nên mỗi tháng số tiền được nhân với ${m('1{,}005')}.`,
     `${m('A_1=100\\cdot1{,}005=100{,}5')} và ${m('A_2=100\\cdot1{,}005^2=101{,}0025')} (triệu đồng).`,
     `Một năm có ${m('12')} tháng: ${m('A_{12}=100\\cdot1{,}005^{12}\\approx106{,}17')} (triệu đồng).`],
   ans:`Sau tháng 1: ${tb('100{,}5\\text{ triệu đồng}')}; sau tháng 2: ${tb('101{,}0025\\text{ triệu đồng}')}; sau một năm: khoảng ${tb('106{,}17\\text{ triệu đồng}')}.`},

  {kind:'vd', tag:'SGK tr. 47 · Bài 2.7', label:'Bài 2.7', fig:F_traGop(), figAt:3,
   de:`Chị Hương vay ${m('100')} triệu đồng, trả ${m('2')} triệu đồng mỗi tháng; lãi suất bằng ${m('0{,}8\\%')} số tiền còn nợ. Gọi ${m('A_n')} là số tiền còn nợ sau ${m('n')} tháng. a) Tính ${m('A_0,A_1,\\ldots,A_6')}. b) Dự đoán hệ thức truy hồi của ${m('(A_n)')}.`,
   sol:[`Ban đầu ${m('A_0=100')}. Sau mỗi tháng, tiền nợ bằng nợ cũ cộng ${m('0{,}8\\%')} tiền lãi rồi trừ ${m('2')} triệu đồng đã trả.`,
     `${m('A_1=100\\cdot1{,}008-2=98{,}8')}; ${m('A_2=98{,}8\\cdot1{,}008-2=97{,}5904')}; ${m('A_3\\approx96{,}37')}.`,
     `${m('A_4\\approx95{,}14')}; ${m('A_5\\approx93{,}90')}; ${m('A_6\\approx92{,}65')} (triệu đồng).`,
     `Với ${m('n\\ge1')}, quy tắc trên cho ${m('A_n=A_{n-1}+0{,}008A_{n-1}-2=1{,}008A_{n-1}-2')}.`],
   ans:`Sau 6 tháng còn nợ khoảng ${tb('92{,}65\\text{ triệu đồng}')}; hệ thức truy hồi: ${tb('A_0=100,\\ A_n=1{,}008A_{n-1}-2')}.`},

  {kind:'sum', tag:'Tổng kết', title:'Ghi nhớ khi giải bài toán thực tế về dãy số',
   body:`<ul><li>Xác định rõ số hạng đầu và đơn vị của dãy số.</li>
     <li>Tăng một lượng cố định dùng phép cộng; tăng theo phần trăm dùng phép nhân.</li>
     <li>Lãi kép tính trên cả vốn và lãi của kì trước.</li>
     <li>Vay trả góp: cộng tiền lãi trước rồi trừ khoản tiền trả trong tháng theo mô hình của đề.</li>
     <li>Chỉ làm tròn ở kết quả cuối để tránh sai số tích luỹ.</li></ul>` +
     box('Luyện thêm: web <b>Học mà chơi</b> – Toán 11, Bài 5. Dãy số.')},
]);
Lecture.addSgk('lop11', 'bai-6', [
  {kind:'title', tag:'Toán 11 · Kết nối tri thức · Giải bài tập SGK', title:'Bài 6. Cấp số cộng', sub:'Các dạng vận dụng, câu khó của bài – lời giải ngắn gọn',
   points:['Chèn số vào giữa hai số để được cấp số cộng.', 'Ba góc của tam giác vuông lập thành cấp số cộng.', 'Tổng các số chia hết cho một số cho trước.', 'Bài toán thực tế: trồng cây theo hàng, tiền lương tăng đều.', 'Lưu ý: đề ghi tóm tắt theo dạng bài vận dụng của Bài 6; số bài và số trang SGK thầy đối chiếu với sách in trước khi dùng.']},

  {kind:'kt', tag:'Nhắc nhanh', title:'Ba công thức cần dùng',
   body: box(`${m('u_n = u_1 + (n - 1)d')} &nbsp;·&nbsp; ${m('S_n = \\dfrac{n(u_1 + u_n)}{2} = \\dfrac{n\\,[2u_1 + (n - 1)d]}{2}')}.`) +
     `<ol class="lk-steps"><li>Chèn ${m('k')} số giữa ${m('a')} và ${m('b')}: có ${m('k + 2')} số hạng, công sai ${m('d = \\dfrac{b - a}{k + 1}')}.</li><li>Ba số ${m('a - d,\\ a,\\ a + d')} lập cấp số cộng: tổng bằng ${m('3a')}.</li><li>Bài thực tế: nhận ra đại lượng tăng (giảm) <b>đều</b> rồi gọi ${m('u_1, d, n')}.</li></ol>` +
     note(`Đếm số số hạng: ${m('n = \\dfrac{u_n - u_1}{d} + 1')} (đừng quên cộng ${m('1')}).`)},

  {kind:'vd', tag:'Bài 6 · Vận dụng 1', label:'Câu 1', de:`Giữa hai số ${m('3')} và ${m('23')} hãy chèn thêm ${m('3')} số để được một cấp số cộng gồm ${m('5')} số hạng. Viết cấp số cộng đó.`,
   sol:[`Cấp số cộng có ${m('u_1 = 3,\\ u_5 = 23')} (tất cả ${m('5')} số hạng).`, `${m('u_5 = u_1 + 4d \\Rightarrow 23 = 3 + 4d \\Rightarrow d = 5')}.`, `Các số hạng: ${m('3,\\ 8,\\ 13,\\ 18,\\ 23')}.`],
   ans:`Ba số cần chèn là ${tb('8;\\ 13;\\ 18')} (công sai ${m('d = 5')}).`},

  {kind:'vd', tag:'Bài 6 · Vận dụng 2', label:'Câu 2', de:`Ba góc của một tam giác vuông lập thành một cấp số cộng. Tìm số đo ba góc đó.`,
   sol:[`Gọi ba góc theo thứ tự là ${m('a - d,\\ a,\\ a + d')} với ${m('d \\gt 0')}.`, `Tổng ba góc: ${m('3a = 180^\\circ \\Rightarrow a = 60^\\circ')}.`, `Tam giác vuông nên góc lớn nhất ${m('a + d = 90^\\circ \\Rightarrow d = 30^\\circ')}.`],
   ans:`Ba góc là ${tb('30^\\circ,\\ 60^\\circ,\\ 90^\\circ')}.`},

  {kind:'vd', tag:'Bài 6 · Vận dụng 3', label:'Câu 3', de:`Tính tổng tất cả các số nguyên dương chia hết cho ${m('3')} và không vượt quá ${m('200')}.`,
   sol:[`Các số đó: ${m('3,\\ 6,\\ 9,\\ \\ldots,\\ 198')} lập cấp số cộng ${m('u_1 = 3,\\ d = 3,\\ u_n = 198')}.`, `Số số hạng: ${m('n = \\dfrac{198 - 3}{3} + 1 = 66')}.`, `${m('S_{66} = \\dfrac{66\\,(3 + 198)}{2} = 33\\cdot 201 = 6\\,633')}.`],
   ans:`${tb('6\\,633')}.`},

  {kind:'vd', tag:'Bài 6 · Vận dụng 4', label:'Câu 4', de:`Người ta trồng ${m('465')} cây theo hình tam giác: hàng thứ nhất ${m('1')} cây, hàng thứ hai ${m('2')} cây, hàng thứ ba ${m('3')} cây, … Hỏi có bao nhiêu hàng cây?`,
   sol:[`Số cây các hàng lập cấp số cộng ${m('u_1 = 1,\\ d = 1')}; gọi ${m('n')} là số hàng thì ${m('S_n = \\dfrac{n(n + 1)}{2} = 465')}.`, `${m('n^2 + n - 930 = 0 \\Leftrightarrow (n - 30)(n + 31) = 0')}.`, `${m('n \\gt 0')} nên ${m('n = 30')}. Thử lại: ${m('\\dfrac{30\\cdot 31}{2} = 465')}.`],
   ans:`Có ${tb('30')} hàng cây.`},

  {kind:'vd', tag:'Bài 6 · Vận dụng 5', label:'Câu 5', de:`Một người đi làm: tháng đầu lương ${m('6')} triệu đồng, mỗi tháng sau tăng ${m('0{,}2')} triệu đồng so với tháng trước. Hỏi lương tháng thứ ${m('36')} là bao nhiêu và tổng thu nhập sau ${m('3')} năm là bao nhiêu?`,
   sol:[`Lương các tháng lập cấp số cộng ${m('u_1 = 6,\\ d = 0{,}2,\\ n = 36')}.`, `${m('u_{36} = 6 + 35\\cdot 0{,}2 = 13')} (triệu đồng).`, `${m('S_{36} = \\dfrac{36\\,(6 + 13)}{2} = 18\\cdot 19 = 342')} (triệu đồng).`],
   ans:`Lương tháng thứ 36 là ${tb('13')} triệu đồng; tổng sau 3 năm là ${tb('342')} triệu đồng.`},

  {kind:'sum', tag:'Tổng kết', title:'Lỗi hay gặp khi giải các bài này',
   body:`<ul><li>Nhầm ${m('u_n = u_1 + nd')} (đúng là ${m('(n - 1)d')}).</li>
     <li>Đếm thiếu một số hạng: quên cộng ${m('1')} trong ${m('n = \\dfrac{u_n - u_1}{d} + 1')}.</li>
     <li>Chèn ${m('k')} số mà chia công sai cho ${m('k')} thay vì ${m('k + 1')}.</li>
     <li>Dùng ${m('S_n')} khi chưa biết ${m('u_n')} mà không đổi sang công thức theo ${m('u_1, d')}.</li></ul>` +
     box('Luyện thêm: web <b>Học mà chơi</b> – Toán 11, Bài 6. Cấp số cộng.')},
]);
})();

/* =====================================================================
   GIẢI BÀI TẬP SGK – Toán 11 · Bài 7. Cấp số nhân (câu vận dụng, câu khó) – đề ghi tóm tắt, thầy đối chiếu số bài/số trang với sách in
   ===================================================================== */
(() => {
const m = tm;
const box = h => `<div class="lk-box">${h}</div>`, note = h => `<div class="lk-note">⚠️ ${h}</div>`;
Lecture.addSgk('lop11', 'bai-7', [
  {kind:'title', tag:'Toán 11 · Kết nối tri thức · Giải bài tập SGK', title:'Bài 7. Cấp số nhân', sub:'Các dạng vận dụng, câu khó của bài – lời giải ngắn gọn',
   points:['Chèn số vào giữa hai số để được cấp số nhân.', 'Ba số lập thành cấp số nhân: tổng và tích cho trước.', 'Tìm ' + m('x') + ' để ba biểu thức lập thành cấp số nhân.', 'Tổng nhiều số hạng với công bội nhỏ hơn 1.', 'Bài toán thực tế: dân số, lãi kép.', 'Lưu ý: đề ghi tóm tắt theo dạng bài vận dụng của Bài 7; số bài và số trang SGK thầy đối chiếu với sách in trước khi dùng.']},

  {kind:'kt', tag:'Nhắc nhanh', title:'Công thức cần dùng',
   body: box(`${m('u_n = u_1 q^{n-1}')} &nbsp;·&nbsp; ${m('S_n = \\dfrac{u_1(1 - q^n)}{1 - q}\\ (q \\ne 1)')} &nbsp;·&nbsp; ${m('a, b, c')} lập cấp số nhân ⇔ ${m('b^2 = ac')}.`) +
     `<ol class="lk-steps"><li>Chèn ${m('k')} số giữa ${m('a')} và ${m('b')}: có ${m('k + 2')} số hạng, ${m('b = a\\,q^{k+1}')}.</li><li>Ba số lập cấp số nhân: gọi ${m('\\dfrac{a}{q},\\ a,\\ aq')} thì tích bằng ${m('a^3')}.</li><li>Tăng ${m('r\\%')} mỗi kì: ${m('A_n = A_0(1 + r)^n')}.</li></ol>` +
     note(`Số mũ của ${m('q')} là ${m('n - 1')}, không phải ${m('n')}.`)},

  {kind:'vd', tag:'Bài 7 · Vận dụng 1', label:'Câu 1', de:`Giữa hai số ${m('3')} và ${m('24')} hãy chèn thêm hai số để được một cấp số nhân gồm bốn số hạng. Viết cấp số nhân đó.`,
   sol:[`Cấp số nhân có ${m('u_1 = 3,\\ u_4 = 24')}.`, `${m('u_4 = u_1 q^3 \\Rightarrow 24 = 3q^3 \\Rightarrow q^3 = 8 \\Rightarrow q = 2')}.`, `Các số hạng: ${m('3,\\ 6,\\ 12,\\ 24')}.`],
   ans:`Hai số cần chèn là ${tb('6;\\ 12')} (công bội ${m('q = 2')}).`},

  {kind:'vd', tag:'Bài 7 · Vận dụng 2', label:'Câu 2', de:`Ba số lập thành một cấp số nhân có tổng bằng ${m('21')} và tích bằng ${m('216')}. Tìm ba số đó.`,
   sol:[`Gọi ba số là ${m('\\dfrac{a}{q},\\ a,\\ aq')}. Tích: ${m('a^3 = 216 \\Rightarrow a = 6')}.`, `Tổng: ${m('\\dfrac{6}{q} + 6 + 6q = 21 \\Leftrightarrow 2q^2 - 5q + 2 = 0 \\Rightarrow q = 2')} hoặc ${m('q = \\dfrac{1}{2}')}.`, `${m('q = 2')}: ${m('3,\\ 6,\\ 12')}. &nbsp; ${m('q = \\dfrac{1}{2}')}: ${m('12,\\ 6,\\ 3')}.`],
   ans:`Ba số là ${tb('3,\\ 6,\\ 12')} (hoặc theo thứ tự ngược lại ${m('12,\\ 6,\\ 3')}).`},

  {kind:'vd', tag:'Bài 7 · Vận dụng 3', label:'Câu 3', de:`Tìm ${m('x')} để ba số ${m('x - 1,\\ x + 1,\\ 2x + 5')} theo thứ tự lập thành một cấp số nhân.`,
   sol:[`Điều kiện: ${m('(x + 1)^2 = (x - 1)(2x + 5)')}.`, `${m('x^2 + 2x + 1 = 2x^2 + 3x - 5 \\Leftrightarrow x^2 + x - 6 = 0')}.`, `${m('(x - 2)(x + 3) = 0 \\Rightarrow x = 2')} hoặc ${m('x = -3')}.`, `Thử lại: ${m('x = 2')} cho ${m('1,\\ 3,\\ 9')} (${m('q = 3')}); ${m('x = -3')} cho ${m('-4,\\ -2,\\ -1')} (${m('q = \\dfrac{1}{2}')}).`],
   ans:`${tb('x = 2')} hoặc ${tb('x = -3')}.`},

  {kind:'vd', tag:'Bài 7 · Vận dụng 4', label:'Câu 4', de:`Tính tổng ${m('S = 1 + \\dfrac{1}{2} + \\dfrac{1}{4} + \\cdots + \\dfrac{1}{2^9}')}.`,
   sol:[`Cấp số nhân ${m('u_1 = 1,\\ q = \\dfrac{1}{2}')}; các số mũ từ ${m('0')} đến ${m('9')} nên có ${m('n = 10')} số hạng.`, `${m('S = \\dfrac{1 - \\left(\\dfrac{1}{2}\\right)^{10}}{1 - \\dfrac{1}{2}} = 2\\left(1 - \\dfrac{1}{1\\,024}\\right) = \\dfrac{1\\,023}{512}')}.`],
   ans:`${tb('S = \\dfrac{1\\,023}{512}')}.`},

  {kind:'vd', tag:'Bài 7 · Vận dụng 5', label:'Câu 5', de:`Dân số một tỉnh hiện nay là ${m('1{,}2')} triệu người, mỗi năm tăng ${m('1{,}5\\%')}. Hỏi sau ${m('10')} năm dân số tỉnh đó khoảng bao nhiêu? (làm tròn đến hàng phần trăm triệu người)`,
   sol:[`Dân số các năm lập cấp số nhân với số hạng đầu ${m('1{,}2')} và công bội ${m('q = 1 + 1{,}5\\% = 1{,}015')}.`, `Sau ${m('10')} năm: ${m('1{,}2\\cdot 1{,}015^{10} \\approx 1{,}39')} (triệu người).`],
   ans:`Khoảng ${tb('1{,}39')} triệu người.`},

  {kind:'sum', tag:'Tổng kết', title:'Lỗi hay gặp khi giải các bài này',
   body:`<ul><li>Viết ${m('u_n = u_1 q^n')} (đúng là ${m('q^{n-1}')}).</li>
     <li>Đếm sai số số hạng khi tính tổng: các số mũ từ ${m('0')} đến ${m('k')} có ${m('k + 1')} số hạng.</li>
     <li>Giải ${m('b^2 = ac')} chỉ lấy một nghiệm mà quên thử lại điều kiện của đề.</li>
     <li>Lấy lãi suất ${m('r\\%')} làm công bội thay vì ${m('1 + r\\%')}.</li></ul>` +
     box('Luyện thêm: web <b>Học mà chơi</b> – Toán 11, Bài 7. Cấp số nhân.')},
]);
})();

/* =====================================================================
   GIẢI BÀI TẬP SGK – Toán 11 · Chương III · Bài 8. Mẫu số liệu ghép nhóm (câu vận dụng, câu khó) – thầy yêu cầu 14/10/2026
   LƯU Ý: đề ghi tóm tắt theo DẠNG của các bài vận dụng/bài tập cuối Bài 8; số trang và số bài chưa được tra trong sách in – thầy đối chiếu.
   ===================================================================== */
(() => {
const m = tm, gr = (a, b) => m(`[${a};\\,${b})`), box = h => `<div class="lk-box">${h}</div>`;
const T = (heads, vals) => `<table class="lk-table"><tr><th>Nhóm</th>${heads.map(h => `<th>${h}</th>`).join('')}</tr><tr><td>Tần số</td>${vals.map(v => `<td>${v}</td>`).join('')}</tr></table>`;
const HC = histSVG([0, 10, 20, 30, 40], [6, 14, 18, 12], 2, {unit:'phút'});
Lecture.addSgk('lop11', 'bai-8', [
  {kind:'title', tag:'Toán 11 · Kết nối tri thức · Giải bài tập SGK', title:'Bài 8. Mẫu số liệu ghép nhóm', sub:'Các câu vận dụng, câu khó – SGK tập 1 (thầy đối chiếu số trang, số bài)',
   points:['Lập bảng tần số tương đối từ bảng tần số ghép nhóm.', 'Ghép nhóm số liệu thô, đếm đúng số liệu nằm ở đầu mút.', 'Đọc biểu đồ cột: tần số tích luỹ, phần trăm.', 'Tìm tần số khuyết khi biết tần số tương đối.', 'Lưu ý: đề ghi tóm tắt theo dạng bài của SGK; số trang và số bài chưa tra, mời thầy đối chiếu.']},

  {kind:'kt', tag:'Nhắc nhanh', title:'Ba điều cần nhớ',
   body:`<ol class="lk-steps"><li>Nhóm ${m('[a;\\,b)')} chứa ${m('a')}, không chứa ${m('b')}.</li><li>Tần số tương đối ${m('= \\dfrac{\\text{tần số}}{n}\\cdot 100\\%')}; tần số tích luỹ là tổng cộng dồn.</li><li>Cỡ mẫu ${m('n')} bằng tổng tất cả tần số.</li></ol>`},

  {kind:'vd', tag:'Vận dụng · Bảng tần số tương đối', label:'Câu 1', de:`Khối lượng (g) của 40 củ khoai: ${T([gr(100, 150), gr(150, 200), gr(200, 250), gr(250, 300), gr(300, 350)], [4, 10, 14, 8, 4])}Lập bảng tần số tương đối ghép nhóm. Bao nhiêu phần trăm số củ khoai nặng dưới 250 g?`,
   sol:[`Cỡ mẫu ${m('n = 4 + 10 + 14 + 8 + 4 = 40')}.`, `Tần số tương đối: ${m('\\dfrac{4}{40} = 10\\%;\\ \\dfrac{10}{40} = 25\\%;\\ \\dfrac{14}{40} = 35\\%;\\ \\dfrac{8}{40} = 20\\%;\\ \\dfrac{4}{40} = 10\\%')} (tổng ${m('100\\%')}).`, `Dưới 250 g gồm ba nhóm đầu: ${m('10\\% + 25\\% + 35\\% = 70\\%')} (hoặc ${m('\\dfrac{28}{40}')}).`],
   ans:`${tb('10\\%,\\ 25\\%,\\ 35\\%,\\ 20\\%,\\ 10\\%')}; dưới 250 g: ${tb('70\\%')}.`},

  {kind:'vd', tag:'Vận dụng · Ghép nhóm số liệu thô', label:'Câu 2', de:`Thời gian chờ (phút) của 15 khách hàng: ${m('1;\\ 2;\\ 3;\\ 4;\\ 5;\\ 5;\\ 6;\\ 7;\\ 8;\\ 9;\\ 10;\\ 10;\\ 12;\\ 14;\\ 15')}. Ghép thành các nhóm ${gr(0, 5)}, ${gr(5, 10)}, ${gr(10, 15)}, ${gr(15, 20)}. Lập bảng tần số và tính tỉ lệ khách chờ từ 10 phút trở lên.`,
   sol:[`${gr(0, 5)}: 1; 2; 3; 4 → 4. &nbsp; ${gr(5, 10)}: 5; 5; 6; 7; 8; 9 → 6 (số 5 thuộc nhóm này).`, `${gr(10, 15)}: 10; 10; 12; 14 → 4. &nbsp; ${gr(15, 20)}: 15 → 1 (số 15 thuộc nhóm bên phải).`, `Kiểm tra: ${m('4 + 6 + 4 + 1 = 15')}. Từ 10 phút trở lên: ${m('4 + 1 = 5')} khách, ${m('\\dfrac{5}{15} \\approx 33{,}3\\%')}.`],
   ans:`Tần số ${tb('4,\\ 6,\\ 4,\\ 1')}; tỉ lệ ${tb('\\approx 33{,}3\\%')}.`},

  {kind:'vd', tag:'Vận dụng cao · Đọc biểu đồ cột', label:'Câu 3', de:`Biểu đồ cột cho thời gian (phút) 50 học sinh làm xong một bài tập. (a) Bao nhiêu phần trăm học sinh làm xong trong dưới 30 phút? (b) Nếu xếp thời gian từ nhỏ đến lớn, số liệu thứ 25 thuộc nhóm nào?`, fig:HC,
   sol:[`Đọc các cột: ${m('6,\\ 14,\\ 18,\\ 12')}; ${m('n = 50')}.`, `(a) Dưới 30 phút: ${m('6 + 14 + 18 = 38')} em, ${m('\\dfrac{38}{50}\\cdot 100\\% = 76\\%')}.`, `(b) Tần số tích luỹ: ${m('6;\\ 20;\\ 38;\\ 50')}. Vì ${m('20 \\lt 25 \\le 38')} nên số liệu thứ 25 thuộc nhóm ${gr(20, 30)}.`],
   ans:`(a) ${tb('76\\%')}; (b) nhóm ${tb('[20;\\,30)')}.`},

  {kind:'vd', tag:'Vận dụng cao · Tần số khuyết', label:'Câu 4', de:`Bảng tần số tương đối của các nhóm ${gr(0, 10)}, ${gr(10, 20)}, ${gr(20, 30)}, ${gr(30, 40)} lần lượt là ${m('15\\%;\\ x\\%;\\ 35\\%;\\ 20\\%')}. Biết nhóm ${gr(30, 40)} có ${m('12')} số liệu. Tìm ${m('x')}, cỡ mẫu và tần số của nhóm ${gr(10, 20)}.`,
   sol:[`Tổng tần số tương đối bằng ${m('100\\%')}: ${m('x = 100 - 15 - 35 - 20 = 30')}.`, `${m('20\\% \\cdot n = 12 \\Rightarrow n = 60')}.`, `Tần số nhóm ${gr(10, 20)}: ${m('30\\% \\cdot 60 = 18')}.`],
   ans:`${tb('x = 30')}; ${tb('n = 60')}; tần số ${tb('18')}.`},

  {kind:'sum', tag:'Tổng kết', title:'Lỗi hay gặp khi giải các bài này',
   body:`<ul><li>Xếp số đúng bằng đầu mút phải vào nhóm bên trái (đúng là nhóm bên phải).</li><li>Quên cộng lại để kiểm tra tổng tần số bằng cỡ mẫu.</li><li>Nhầm tần số tích luỹ với tần số của riêng nhóm.</li><li>Quên rằng tổng các tần số tương đối bằng ${m('100\\%')}.</li></ul>` +
     box('Luyện thêm: web <b>Học mà chơi</b> – Toán 11, Bài 8. Mẫu số liệu ghép nhóm.')},
]);
})();

/* =====================================================================
   GIẢI BÀI TẬP SGK – Toán 11 · Chương III · Bài 9. Các số đặc trưng đo xu thế trung tâm (câu vận dụng, câu khó) – thầy yêu cầu 16/10/2026
   LƯU Ý: đề ghi tóm tắt theo DẠNG của các bài vận dụng/bài tập cuối Bài 9; số trang và số bài chưa được tra trong sách in – thầy đối chiếu.
   ===================================================================== */
(() => {
const m = tm, gr = (a, b) => m(`[${a};\\,${b})`), box = h => `<div class="lk-box">${h}</div>`;
const T = (heads, vals) => `<table class="lk-table"><tr><th>Nhóm</th>${heads.map(h => `<th>${h}</th>`).join('')}</tr><tr><td>Tần số</td>${vals.map(v => `<td>${v}</td>`).join('')}</tr></table>`;
const TB = T([gr(0, 2), gr(2, 4), gr(4, 6), gr(6, 8)], [5, 10, 3, 2]);
Lecture.addSgk('lop11', 'bai-9', [
  {kind:'title', tag:'Toán 11 · Kết nối tri thức · Giải bài tập SGK', title:'Bài 9. Các số đặc trưng đo xu thế trung tâm', sub:'Các câu vận dụng, câu khó – SGK tập 1 (thầy đối chiếu số trang, số bài)',
   points:['Số trung bình cộng của mẫu số liệu ghép nhóm.', 'Trung vị và tứ phân vị.', 'Mốt.', 'Tìm tần số khuyết khi biết số trung bình.', 'Lưu ý: đề ghi tóm tắt theo dạng bài của SGK; số trang và số bài chưa tra, mời thầy đối chiếu.']},

  {kind:'kt', tag:'Nhắc nhanh', title:'Công thức cần dùng',
   body:`<ol class="lk-steps"><li>${m('\\bar{x} = \\dfrac{\\sum m_ix_i}{n}')}, ${m('x_i')} là trung điểm nhóm.</li><li>${m('M_e,\\ Q_1,\\ Q_3')}: nhóm đầu tiên có tần số tích luỹ ${m('\\ge \\dfrac{n}{2},\\ \\dfrac{n}{4},\\ \\dfrac{3n}{4}')}; kết quả ${m('= u_m + \\dfrac{q - C}{n_m}\\cdot h')}.</li><li>${m('M_o = u_j + \\dfrac{m_j - m_{j-1}}{(m_j - m_{j-1}) + (m_j - m_{j+1})}\\cdot h')}.</li></ol>`},

  {kind:'vd', tag:'Vận dụng · Số trung bình', label:'Câu 1', de:`Quãng đường (km) từ nhà đến trường của 20 học sinh: ${TB}Tính số trung bình cộng.`,
   sol:[`Giá trị đại diện ${m('1;\\ 3;\\ 5;\\ 7')}; ${m('n = 20')}.`, `${m('\\bar{x} = \\dfrac{5\\cdot 1 + 10\\cdot 3 + 3\\cdot 5 + 2\\cdot 7}{20} = \\dfrac{64}{20}')}.`], ans:`${tb('\\bar{x} = 3{,}2')} km.`},

  {kind:'vd', tag:'Vận dụng · Trung vị', label:'Câu 2', de:`Với bảng ở Câu 1, tính trung vị.`,
   sol:[`${m('\\dfrac{n}{2} = 10')}. Tần số tích luỹ ${m('5;\\ 15;\\ 18;\\ 20')}.`, `Nhóm ${gr(2, 4)}: ${m('C = 5,\\ n_m = 10,\\ h = 2')}.`, `${m('M_e = 2 + \\dfrac{10 - 5}{10}\\cdot 2 = 3')}.`], ans:`${tb('M_e = 3')} km.`},

  {kind:'vd', tag:'Vận dụng · Tứ phân vị', label:'Câu 3', de:`Với bảng ở Câu 1, tính ${m('Q_1')} và ${m('Q_3')}.`,
   sol:[`${m('\\dfrac{n}{4} = 5')}: tần số tích luỹ của nhóm đầu là ${m('5 \\ge 5')} nên nhóm ${gr(0, 2)}: ${m('Q_1 = 0 + \\dfrac{5 - 0}{5}\\cdot 2 = 2')}.`, `${m('\\dfrac{3n}{4} = 15')}: tần số tích luỹ ${m('5;\\ 15')} nên nhóm ${gr(2, 4)}: ${m('Q_3 = 2 + \\dfrac{15 - 5}{10}\\cdot 2 = 4')}.`], ans:`${tb('Q_1 = 2')}; ${tb('Q_3 = 4')}.`},

  {kind:'vd', tag:'Vận dụng · Mốt', label:'Câu 4', de:`Với bảng ở Câu 1, tính mốt.`,
   sol:[`Nhóm có tần số lớn nhất: ${gr(2, 4)} (10); nhóm trước 5, nhóm sau 3, ${m('h = 2')}.`, `${m('M_o = 2 + \\dfrac{10 - 5}{(10 - 5) + (10 - 3)}\\cdot 2 = 2 + \\dfrac{5}{12}\\cdot 2 = \\dfrac{17}{6}')}.`], ans:`${tb('M_o = \\dfrac{17}{6} \\approx 2{,}83')} km.`},

  {kind:'vd', tag:'Vận dụng cao · Tần số khuyết', label:'Câu 5', de:`Bảng tần số về quãng đường (km): ${gr(0, 2)}: 5; ${gr(2, 4)}: ${m('x')}; ${gr(4, 6)}: 3; ${gr(6, 8)}: 2. Biết số trung bình cộng là ${m('3{,}2')}. Tìm ${m('x')}.`,
   sol:[`${m('n = 10 + x')}; tổng ${m('5\\cdot 1 + 3x + 3\\cdot 5 + 2\\cdot 7 = 34 + 3x')}.`, `${m('\\dfrac{34 + 3x}{10 + x} = 3{,}2 \\Rightarrow 34 + 3x = 32 + 3{,}2x')}.`, `${m('0{,}2x = 2 \\Rightarrow x = 10')}.`], ans:`${tb('x = 10')} (khớp Câu 1).`},

  {kind:'sum', tag:'Tổng kết', title:'Lỗi hay gặp',
   body:`<ul><li>Dùng đầu mút thay cho trung điểm khi tính số trung bình.</li><li>Lấy ${m('C')} là tần số tích luỹ của <b>chính</b> nhóm chứa trung vị thay vì nhóm đứng trước.</li><li>Quên coi tần số nhóm thiếu bằng ${m('0')} khi mốt ở nhóm đầu hoặc nhóm cuối.</li></ul>` +
     box('Luyện thêm: web <b>Học mà chơi</b> – Toán 11, Bài 9. Các số đặc trưng đo xu thế trung tâm.')},
]);
})();

/* =====================================================================
   GIẢI BÀI TẬP SGK – TOÁN 11 – CHƯƠNG IV · Bài 10. Đường thẳng và mặt phẳng trong không gian (SGK KNTT tập 1, tr. 70–76)
   Các câu Luyện tập 1–6 và Vận dụng 1–2 (đề lấy từ ảnh chụp SGK; số trang 72–75 suy ra từ thứ tự trang, thầy đối chiếu).
   ===================================================================== */
(() => {
const m = tm;
const box = h => `<div class="lk-box">${h}</div>`, note = h => `<div class="lk-note">⚠️ ${h}</div>`;
const mid = (p, q, t = .5) => [p[0] + t * (q[0] - p[0]), p[1] + t * (q[1] - p[1])];
const ix = (p, q, r, s) => { const dd = (q[0] - p[0]) * (s[1] - r[1]) - (q[1] - p[1]) * (s[0] - r[0]); const t = ((r[0] - p[0]) * (s[1] - r[1]) - (r[1] - p[1]) * (s[0] - r[0])) / dd; return [p[0] + t * (q[0] - p[0]), p[1] + t * (q[1] - p[1])]; };
const T = [[160, 22], [48, 160], [168, 196], [288, 128]];     // A, B, C, D
const E = [.3 * T[1][0] + .35 * T[2][0] + .35 * T[3][0], .3 * T[1][1] + .35 * T[2][1] + .35 * T[3][1]];
const P = ix(T[3], E, T[1], T[2]), F = mid(T[0], E, .55), Q = ix(T[3], F, T[0], P);
const fig6 = spaceSVG({pts:{A:T[0], B:T[1], C:T[2], D:T[3], E, F, P, Q}, s:[['A', 'B'], ['A', 'C'], ['A', 'D'], ['B', 'C'], ['C', 'D'], ['A', 'P']], d:[['B', 'D'], ['D', 'P'], ['A', 'E'], ['D', 'Q']], ht:218, off:{E:[0, 15], F:[-14, 0], P:[0, 15], Q:[12, 8]}, aria:'Tứ diện ABCD, E trong tam giác BCD, F trên AE, P = DE ∩ BC, Q = DF ∩ AP'});
const G = [(T[1][0] + T[2][0] + T[3][0]) / 3, (T[1][1] + T[2][1] + T[3][1]) / 3];
const fig3 = spaceSVG({pts:{S:T[0], B:T[1], A:T[2], C:T[3], M:mid(T[1], T[2]), N:mid(T[2], T[3])}, s:[['S', 'A'], ['S', 'B'], ['S', 'C'], ['A', 'B'], ['A', 'C']], d:[['B', 'C']], h:[['S', 'A']], ht:218, off:{M:[-14, 6], N:[14, 6]}, aria:'Tứ diện S.ABC với M, N là trung điểm AB, AC; giao tuyến SA tô đậm'});

Lecture.addSgk('lop11', 'bai-10', [
  {kind:'title', tag:'Toán 11 · Kết nối tri thức · Giải bài tập SGK', title:'Bài 10. Đường thẳng và mặt phẳng trong không gian', sub:'Luyện tập 1 – 6 và Vận dụng 1 – 2 – SGK tập 1, trang 72 – 76',
   points:['Luyện tập 1 (tr. 72) · Vận dụng 1 (tr. 72) – đếm mặt phẳng, ba chân đỡ.', 'Luyện tập 2 (tr. 73) · Luyện tập 3 (tr. 74) – đường thẳng nằm trong mặt phẳng, giao tuyến.', 'Luyện tập 4 · Vận dụng 2 (tr. 75) · Luyện tập 5, 6 (tr. 76) – giao tuyến, hình chóp, giao điểm.', 'Đề ghi tóm tắt theo ảnh chụp SGK; số trang thầy đối chiếu bản in.']},

  {kind:'kt', tag:'Nhắc nhanh', title:'Ba kĩ năng dùng trong các câu này',
   body:`<ol class="lk-steps"><li><b>Hai điểm phân biệt của đường thẳng thuộc mặt phẳng</b> ⇒ cả đường thẳng nằm trong mặt phẳng.</li><li><b>Giao tuyến:</b> tìm hai điểm chung (một điểm thấy ngay, điểm còn lại là giao của hai đường thẳng, mỗi đường nằm trong một mặt phẳng).</li><li><b>Giao điểm của ${m('d')} và ${m('(P)')}:</b> chọn mặt phẳng phụ chứa ${m('d')}, tìm giao tuyến của nó với ${m('(P)')}, rồi cắt ${m('d')} với giao tuyến.</li></ol>` + note(`Mặt phẳng chứa tứ giác ${m('ABCD')}: bốn đỉnh luôn đồng phẳng.`)},

  {kind:'vd', tag:'SGK tr. 72 · Luyện tập 1', label:'Câu 1', de:`Cho tứ giác ${m('ABCD')}. Có bao nhiêu mặt phẳng đi qua ba trong số bốn đỉnh của tứ giác đó?`,
   sol:[`Tứ giác ${m('ABCD')} là hình phẳng nên bốn đỉnh ${m('A, B, C, D')} cùng nằm trong một mặt phẳng.`, `Ba đỉnh bất kì của tứ giác không thẳng hàng nên xác định một mặt phẳng, mà mặt phẳng đó chính là mặt phẳng chứa tứ giác.`, `Cả bốn bộ ba đều cho cùng một mặt phẳng.`],
   ans:`Chỉ có ${tb('1')} mặt phẳng (khác với tứ diện: 4 mặt phẳng).`},

  {kind:'vd', tag:'SGK tr. 72 · Vận dụng 1', label:'Câu 2', de:`Giải thích vì sao nhiều đồ vật (chân đỡ máy ảnh, giá treo tranh, kiềng ba chân…) được thiết kế gồm ba chân.`,
   sol:[`Ba điểm không thẳng hàng xác định đúng một mặt phẳng: ba đầu chân luôn nằm trên một mặt phẳng.`, `Vì vậy ba chân luôn chạm mặt phẳng nền (mặt đất, sàn) cùng lúc, vật đứng vững trên mọi nền phẳng.`, `Nếu có bốn chân thì bốn điểm có thể không đồng phẳng, vật dễ bị cập kênh.`],
   ans:`${tb('Ba chân')} ứng với ba điểm không thẳng hàng nên xác định đúng một mặt phẳng ⇒ vật đứng vững.`},

  {kind:'vd', tag:'SGK tr. 73 · Luyện tập 2', label:'Câu 3', de:`Trong Ví dụ 2 (tam giác ${m('ABC')}, ${m('M')} thuộc đường thẳng ${m('BC')}), lấy điểm ${m('N')} thuộc đường thẳng ${m('AB')} sao cho ${m('N')} khác ${m('M')}. Đường thẳng ${m('MN')} có thuộc mặt phẳng ${m('(ABC)')} hay không?`,
   sol:[`${m('B, C \\in (ABC)')} nên ${m('BC \\subset (ABC)')}; ${m('M \\in BC')} nên ${m('M \\in (ABC)')}.`, `${m('A, B \\in (ABC)')} nên ${m('AB \\subset (ABC)')}; ${m('N \\in AB')} nên ${m('N \\in (ABC)')}.`, `${m('M, N')} là hai điểm phân biệt thuộc ${m('(ABC)')} nên ${m('MN \\subset (ABC)')}.`], ans:`${tb('Có')}: ${m('MN \\subset (ABC)')}.`},

  {kind:'vd', tag:'SGK tr. 74 · Luyện tập 3', label:'Câu 4', de:`Trong Ví dụ 3 (hình chóp tam giác ${m('S.ABC')}, ${m('M, N')} là trung điểm ${m('AB, AC')}), xác định giao tuyến của hai mặt phẳng ${m('(SBM)')} và ${m('(SCN)')}.`, fig: fig3,
   sol:[`${m('S')} là điểm chung.`, `${m('M \\in AB')} nên ${m('AB \\subset (SBM)')} (hai điểm ${m('B, M')} thuộc mặt phẳng), do đó ${m('A \\in (SBM)')}.`, `${m('N \\in AC')} nên ${m('AC \\subset (SCN)')}, do đó ${m('A \\in (SCN)')}.`, `${m('S')} và ${m('A')} là hai điểm chung phân biệt.`], ans:`${tb('(SBM) \\cap (SCN) = SA')}.`},

  {kind:'vd', tag:'SGK tr. 75 · Luyện tập 4', label:'Câu 5', de:`Trong Ví dụ 4 (${m('a, b')} cắt nhau tại ${m('M')}, ${m('S')} không thuộc ${m('mp(a,b)')}), vẽ đường thẳng ${m('c')} cắt cả ${m('a')} và ${m('b')} (không đi qua ${m('M')}). Xác định giao tuyến của ${m('mp(S,a)')} và ${m('mp(S,c)')}; của ${m('mp(S,b)')} và ${m('mp(S,c)')}.`,
   sol:[`Gọi ${m('P = c \\cap a')}, ${m('Q = c \\cap b')}; ${m('P \\ne Q')} vì ${m('c')} không qua ${m('M')}. Khi đó ${m('c \\subset mp(a,b)')} nên ${m('S \\notin c')} và ${m('mp(S,c)')} xác định được.`, `${m('mp(S,a)')} và ${m('mp(S,c)')}: ${m('S')} chung; ${m('P \\in a \\subset mp(S,a)')} và ${m('P \\in c \\subset mp(S,c)')}. Giao tuyến ${m('SP')}.`, `${m('mp(S,b)')} và ${m('mp(S,c)')}: ${m('S')} chung; ${m('Q \\in b')} và ${m('Q \\in c')}. Giao tuyến ${m('SQ')}.`],
   ans:`${tb('mp(S,a) \\cap mp(S,c) = SP')}; ${tb('mp(S,b) \\cap mp(S,c) = SQ')}.`},

  {kind:'vd', tag:'SGK tr. 75 · Vận dụng 2', label:'Câu 6', de:`Để cửa ra vào không bị va đập vào đồ dùng xung quanh, người ta dùng hít cửa nam châm. Giải thích vì sao khi cửa được hút tới vị trí của nam châm thì cánh cửa được giữ cố định.`,
   sol:[`Cánh cửa là một phần của mặt phẳng; hai bản lề (hai điểm cố định) xác định một đường thẳng – cánh cửa chỉ quay quanh đường thẳng này.`, `Khi cánh cửa chạm nam châm, có thêm một điểm cố định của cánh cửa <b>không nằm trên đường thẳng nối hai bản lề</b>.`, `Ba điểm không thẳng hàng xác định đúng một mặt phẳng nên cánh cửa hoàn toàn xác định, không quay được nữa.`],
   ans:`Hai bản lề + điểm hút nam châm = ${tb('ba điểm không thẳng hàng')} ⇒ vị trí cánh cửa cố định. <i>(Lời giải gợi ý – thầy đối chiếu SGV.)</i>`},

  {kind:'vd', tag:'SGK tr. 76 · Luyện tập 5', label:'Câu 7', de:`Cho hình chóp ${m('S.ABCD')}. Gọi tên các mặt bên và mặt đáy của hình chóp đó.`,
   sol:[`Hình chóp ${m('S.ABCD')} có đáy là tứ giác ${m('ABCD')}.`, `Các mặt bên là các tam giác ${m('SAB, SBC, SCD, SDA')}.`], ans:`Mặt đáy: ${tb('(ABCD)')}. Mặt bên: ${tb('(SAB), (SBC), (SCD), (SDA)')}.`},

  {kind:'vd', tag:'SGK tr. 76 · Luyện tập 6', label:'Câu 8', de:`Trong Ví dụ 6 (tứ diện ${m('ABCD')}, ${m('E')} nằm trong tam giác ${m('BCD')}, ${m('F')} nằm giữa ${m('A')} và ${m('E')}), xác định giao điểm của đường thẳng ${m('DF')} và mặt phẳng ${m('(ABC)')}.`, fig: fig6,
   sol:[`Chọn mặt phẳng phụ chứa ${m('DF')}: vì ${m('F \\in AE')} nên ${m('DF \\subset (ADE)')}.`, `${m('E')} nằm trong tam giác ${m('BCD')} nên ${m('DE')} cắt cạnh ${m('BC')} tại ${m('P')}. Khi đó ${m('(ADE) = (ADP)')}.`, `${m('(ADP) \\cap (ABC) = AP')} (hai điểm chung ${m('A, P')}; ${m('P \\in BC \\subset (ABC)')}).`, `Trong ${m('(ADP)')}: ${m('DF')} cắt ${m('AP')} tại ${m('Q')}; ${m('Q \\in AP \\subset (ABC)')}.`], ans:`${tb('Q = DF \\cap (ABC)')}, với ${m('P = DE \\cap BC')}, ${m('Q = DF \\cap AP')}.`},

  {kind:'sum', tag:'Tổng kết', title:'Lỗi hay gặp',
   body:`<ul><li>Đếm mặt phẳng của <b>tứ giác</b> như của tứ diện (Luyện tập 1: đáp số là 1, không phải 4).</li><li>Quên chứng minh điểm chung thuộc <b>cả hai</b> mặt phẳng khi tìm giao tuyến.</li><li>Tìm giao điểm mà không chọn mặt phẳng phụ chứa đường thẳng.</li></ul>` + box('Luyện thêm: web <b>Học mà chơi</b> – Toán 11, Chương IV, Bài 10. Đường thẳng và mặt phẳng trong không gian.')},
]);
})();

/* =====================================================================
   GIẢI BÀI TẬP SGK – Toán 11 KNTT, tập 1, Bài 11. Hai đường thẳng song song (02/11/2026)
   Luyện tập 1 (tr. 79), Luyện tập 3 (tr. 81), Luyện tập 4 (tr. 82), Đố vui (tr. 82–83). Đề đối chiếu từ văn bản SGK trên mạng; thầy đối chiếu số trang.
   ===================================================================== */
(() => {
const m = tm, tw = t => `<b class="ans">${t}</b>`;
const box = h => `<div class="lk-box">${h}</div>`;
const mid = (p, q, t = .5) => [p[0] + t * (q[0] - p[0]), p[1] + t * (q[1] - p[1])];
const PG0 = [[150, 16], [40, 142], [104, 186], [262, 186], [198, 142]];
const pgFig = (o = {}) => spaceSVG({pts:{S:PG0[0], A:PG0[1], B:PG0[2], C:PG0[3], D:PG0[4], ...(o.pts || {})}, s:[['S', 'A'], ['S', 'B'], ['S', 'C'], ['S', 'D'], ['A', 'B'], ['B', 'C'], ['C', 'D'], ...(o.s || [])], d:[['A', 'D'], ...(o.d || [])], h:o.h, nolabel:o.nolabel, ht:218, aria:o.aria});
const figLT1 = pgFig({pts:{M:mid(PG0[0], PG0[1], .6), N:mid(PG0[0], PG0[2], .6)}, s:[['M', 'N']], aria:'Hình chóp S.ABCD, M thuộc SA, N thuộc SB'});
const figLT4 = pgFig({pts:{u:[60, 16], x:[262, 16]}, nolabel:['u'], h:[['u', 'x']], aria:'Giao tuyến của (SAD) và (SBC) là đường thẳng qua S song song AD và BC'});
const figLT3 = spaceSVG({pts:{A:[50, 176], B:[170, 176], C:[250, 126], D:[130, 126], F:[60, 70], E:[180, 70]}, s:[['A', 'B'], ['B', 'C'], ['C', 'D'], ['A', 'F'], ['B', 'E'], ['E', 'F'], ['C', 'E'], ['D', 'F']], d:[['A', 'D']], ht:218, aria:'Hai hình bình hành ABCD và ABEF có chung cạnh AB'});

Lecture.addSgk('lop11', 'bai-11', [
  {kind:'title', tag:'Toán 11 · Kết nối tri thức · Giải bài tập SGK', title:'Bài 11. Hai đường thẳng song song', sub:'Luyện tập 1, 3, 4 và Đố vui – SGK tập 1, trang 79 – 83',
   points:['Luyện tập 1 (tr. 79) – vị trí tương đối của các cạnh trên hình chóp có đáy hình bình hành.', 'Luyện tập 3 (tr. 81) – bốn điểm đồng phẳng, hình bình hành CDFE.', 'Luyện tập 4 (tr. 82) – giao tuyến của (SAD) và (SBC).', 'Đố vui (tr. 82–83) – hai mép ngoài của hai cánh cửa sổ.', 'Đề ghi tóm tắt theo văn bản SGK trên mạng; số trang và các bài tập cuối bài 4.9 – 4.14 thầy đối chiếu SGK (chưa đưa vào bộ này).']},

  {kind:'kt', tag:'Nhắc nhanh', title:'Ba kĩ năng dùng trong các câu này',
   body:`<ol class="lk-steps"><li><b>Vị trí tương đối:</b> chung đỉnh ⇒ cắt nhau; cạnh đối của hình bình hành ⇒ song song; cùng nằm trong một mặt phẳng ⇒ không thể chéo nhau.</li><li><b>Bắc cầu:</b> hai đường cùng song song với đường thứ ba thì song song với nhau.</li><li><b>Hệ quả giao tuyến:</b> hai mặt phẳng chứa hai đường thẳng song song ⇒ giao tuyến song song với chúng.</li></ol>`},

  {kind:'vd', tag:'SGK tr. 79 · Luyện tập 1', label:'Câu 1', de:`Cho hình chóp ${m('S.ABCD')} có đáy ${m('ABCD')} là hình bình hành. a) Trong ba đường thẳng ${m('AB, AC, CD')}, cặp nào song song, cặp nào cắt nhau? b) ${m('M, N')} lần lượt thuộc cạnh ${m('SA, SB')}. Trong ba đường thẳng ${m('SA, MN, AB')}, có cặp nào chéo nhau không?`, fig: figLT1,
   sol:[`a) ${m('AB')} và ${m('AC')} có chung điểm ${m('A')}; ${m('AC')} và ${m('CD')} có chung điểm ${m('C')}: các cặp này cắt nhau. ${m('AB \\parallel CD')} vì ${m('ABCD')} là hình bình hành.`, `b) ${m('S, A, B, M, N')} đều thuộc mặt phẳng ${m('(SAB)')} nên ${m('SA, MN, AB')} cùng nằm trong ${m('(SAB)')}.`, `Ba đường thẳng đồng phẳng thì không có cặp nào chéo nhau.`],
   ans:`a) ${tw('AB ∥ CD')}; ${tw('AB cắt AC')}; ${tw('AC cắt CD')}. b) ${tw('Không có cặp nào chéo nhau')}.`},

  {kind:'vd', tag:'SGK tr. 81 · Luyện tập 3', label:'Câu 2', de:`Trong Ví dụ 1 (hai hình bình hành ${m('ABCD')} và ${m('ABEF')} không cùng nằm trong một mặt phẳng), chứng minh bốn điểm ${m('C, D, E, F')} cùng thuộc một mặt phẳng và tứ giác ${m('CDFE')} là hình bình hành.`, fig: figLT3,
   sol:[`${m('ABEF')} là hình bình hành nên ${m('EF \\parallel AB')} và ${m('EF = AB')}.`, `${m('ABCD')} là hình bình hành nên ${m('CD \\parallel AB')} và ${m('CD = AB')}.`, `Suy ra ${m('CD \\parallel EF')} (bắc cầu) nên ${m('C, D, E, F')} đồng phẳng.`, `Tứ giác ${m('CDFE')} có ${m('CD \\parallel EF')} và ${m('CD = EF')} nên là hình bình hành.`],
   ans:`${tw('C, D, E, F đồng phẳng')} và ${tw('CDFE là hình bình hành')}. <i>(Đề tóm tắt theo văn bản SGK – thầy đối chiếu hình vẽ của Ví dụ 1.)</i>`},

  {kind:'vd', tag:'SGK tr. 82 · Luyện tập 4', label:'Câu 3', de:`Trong Ví dụ 4 (hình chóp ${m('S.ABCD')} có đáy ${m('ABCD')} là hình bình hành hoặc hình thang với ${m('AD \\parallel BC')}), xác định giao tuyến của hai mặt phẳng ${m('(SAD)')} và ${m('(SBC)')}.`, fig: figLT4,
   sol:[`${m('S')} là điểm chung của ${m('(SAD)')} và ${m('(SBC)')}.`, `${m('AD \\subset (SAD)')}, ${m('BC \\subset (SBC)')} và ${m('AD \\parallel BC')}.`, `Theo hệ quả của định lí về giao tuyến của ba mặt phẳng, giao tuyến là đường thẳng ${m('Sx')} qua ${m('S')}, song song với ${m('AD')} và ${m('BC')}.`],
   ans:`${tb('(SAD) \\cap (SBC) = Sx,\\ Sx \\parallel AD \\parallel BC')}.`},

  {kind:'vd', tag:'SGK tr. 82–83 · Đố vui', label:'Câu 4', de:`(Đố vui) Khi hai cánh cửa sổ hình chữ nhật được mở, dù ở vị trí nào, hai mép ngoài của chúng luôn song song với nhau. Hãy giải thích.`,
   sol:[`Mỗi cánh cửa quay quanh bản lề là cạnh thẳng đứng của khung cửa; hai bản lề đều thẳng đứng nên song song với nhau.`, `Mép ngoài của mỗi cánh là cạnh đối diện của cạnh bản lề trong hình chữ nhật, nên song song với bản lề của cánh đó, ở vị trí mở bất kì.`, `Hai mép ngoài cùng song song với các bản lề, mà hai bản lề song song với nhau; theo tính chất bắc cầu, hai mép ngoài song song với nhau.`],
   ans:`Hai mép ngoài cùng song song với hai bản lề thẳng đứng ⇒ ${tw('song song (bắc cầu)')}. <i>(Đề đọc từ bản tóm tắt bị cắt – thầy đối chiếu SGK.)</i>`},

  {kind:'sum', tag:'Tổng kết', title:'Lỗi hay gặp',
   body:`<ul><li>Cho rằng “không có điểm chung” là song song: còn có thể chéo nhau (cần kiểm tra đồng phẳng).</li><li>Dùng bắc cầu mà không chỉ ra rõ đường thẳng trung gian.</li><li>Dùng hệ quả giao tuyến khi hai mặt phẳng chưa chắc cắt nhau hoặc quên chỉ ra điểm chung.</li></ul>` + box('Luyện thêm: web <b>Học mà chơi</b> – Toán 11, Chương IV, Bài 11. Hai đường thẳng song song.')},
]);
})();

/* =====================================================================
   GIẢI BÀI TẬP SGK – Toán 11 KNTT, tập 1, Bài 12. Đường thẳng và mặt phẳng song song (02/11/2026)
   Luyện tập (tr. 86) và Bài 4.19 (tr. 87). Đề tra từ văn bản SGK trên mạng; các câu còn lại của bài (HĐ, Luyện tập tr. 85, Bài 4.15–4.18) chưa tra được –
   thầy gửi ảnh SGK thì bổ sung. Thầy đối chiếu số trang, số thứ tự.
   ===================================================================== */
(() => {
const m = tm, tw = t => `<b class="ans">${t}</b>`;
const mid = (p, q, t = .5) => [p[0] + t * (q[0] - p[0]), p[1] + t * (q[1] - p[1])];
/* hình chóp S.ABCD có đáy hình thang AB ∥ CD (AB dài hơn, bị che khuất) */
const T0 = {S:[160, 16], A:[298, 142], B:[40, 142], C:[104, 186], D:[262, 186]};
const trap = (o = {}) => spaceSVG({pts:{...T0, ...(o.pts || {})}, s:[['S', 'A'], ['S', 'B'], ['S', 'C'], ['S', 'D'], ['B', 'C'], ['C', 'D'], ['D', 'A'], ...(o.s || [])], d:[['A', 'B'], ...(o.d || [])], h:o.h, hd:o.hd, fill:o.fill, off:o.off, ht:218, aria:o.aria});
const figLT = trap({h:[['S', 'D']], hd:[['A', 'B']], fill:[['S', 'C', 'D']], aria:'Hình chóp S.ABCD có đáy là hình thang AB song song CD; đường thẳng SD, AB và mặt phẳng (SCD)'});
const E = mid(T0.S, T0.A), F = mid(T0.S, T0.B), H = mid(T0.S, T0.C), G = mid(T0.S, T0.D);
const fig419 = trap({pts:{E, F, G, H}, s:[['F', 'H'], ['H', 'G'], ['G', 'E']], d:[['E', 'F']], aria:'Thiết diện EFHG của hình chóp S.ABCD cắt bởi mặt phẳng qua E song song với AB và AD'});

Lecture.addSgk('lop11', 'bai-12', [
  {kind:'title', tag:'Toán 11 · Kết nối tri thức · Giải bài tập SGK', title:'Bài 12. Đường thẳng và mặt phẳng song song', sub:'Luyện tập (tr. 86) và Bài 4.19 (tr. 87) – SGK tập 1',
   points:['Luyện tập (tr. 86) – hình chóp có đáy hình thang: SD và AB có chéo nhau không? Mặt phẳng chứa SD và song song với AB.', 'Bài 4.19 (tr. 87) – mặt phẳng qua E song song với AB và AD: giao tuyến với các mặt bên và hình tạo thành.', 'Các câu còn lại của bài (HĐ, Luyện tập tr. 85, Bài 4.15 – 4.18): chưa tra được đề – thầy gửi ảnh SGK để bổ sung.']},

  {kind:'kt', tag:'Nhắc nhanh', title:'Ba kĩ năng dùng trong các câu này',
   body:`<ol class="lk-steps"><li><b>Chéo nhau:</b> giả sử hai đường thẳng đồng phẳng rồi suy ra bốn điểm đồng phẳng – mâu thuẫn với hình chóp.</li><li><b>Đường thẳng song song mặt phẳng:</b> ${m("d \\not\\subset (P),\\ d \\parallel d' \\subset (P) \\Rightarrow d \\parallel (P)")}.</li><li><b>Giao tuyến:</b> mặt phẳng ${m('(P) \\parallel d')} cắt mặt phẳng chứa ${m('d')} theo giao tuyến song song ${m('d')}.</li></ol>`},

  {kind:'vd', tag:'SGK tr. 86 · Luyện tập', label:'Câu 1', de:`Cho hình chóp ${m('S.ABCD')} có đáy là hình thang với ${m('AB \\parallel CD')}. Hai đường thẳng ${m('SD')} và ${m('AB')} có chéo nhau không? Hãy chỉ ra mặt phẳng chứa ${m('SD')} và song song với ${m('AB')}.`, fig: figLT,
   sol:[`Giả sử ${m('SD')} và ${m('AB')} đồng phẳng thì bốn điểm ${m('S, A, B, D')} cùng thuộc một mặt phẳng; mặt phẳng đó chính là ${m('(ABD)')} = ${m('(ABCD)')} nên ${m('S \\in (ABCD)')} – vô lí. Vậy ${m('SD')} và ${m('AB')} không đồng phẳng; chúng cũng không có điểm chung, nên chéo nhau.`, `${m('AB \\parallel CD')}, ${m('CD \\subset (SCD)')} và ${m('AB \\not\\subset (SCD)')} (vì ${m('A \\notin (SCD)')}) nên ${m('AB \\parallel (SCD)')}.`, `${m('(SCD)')} chứa ${m('SD')} nên đó là mặt phẳng cần tìm.`],
   ans:`${tw('SD và AB chéo nhau')}; mặt phẳng chứa ${tw('SD')} và song song với ${tw('AB')} là ${tb('(SCD)')}.`},

  {kind:'vd', tag:'SGK tr. 87 · Bài 4.19', label:'Câu 2', de:`Cho hình chóp ${m('S.ABCD')} có đáy là hình thang với ${m('AB \\parallel CD')}. Lấy điểm ${m('E')} nằm giữa ${m('S')} và ${m('A')}. Mặt phẳng ${m('(P)')} đi qua ${m('E')} và song song với ${m('AB')}, ${m('AD')}. Xác định giao tuyến của ${m('(P)')} với các mặt bên của hình chóp và cho biết hình tạo bởi các giao tuyến đó là hình gì.`, fig: fig419,
   sol:[`${m('AB \\parallel (P)')} và ${m('(SAB) \\supset AB')} nên ${m('(P) \\cap (SAB)')} đi qua ${m('E')} và song song ${m('AB')}: kẻ ${m('EF \\parallel AB')}, ${m('F \\in SB')}.`, `${m('AD \\parallel (P)')} và ${m('(SAD) \\supset AD')} nên giao tuyến với ${m('(SAD)')} là ${m('EG \\parallel AD')}, ${m('G \\in SD')}.`, `Trong ${m('(SCD)')}: giao tuyến đi qua ${m('G')} và song song ${m('CD')} (vì ${m('CD \\parallel AB \\parallel (P)')}): kẻ ${m('GH \\parallel CD')}, ${m('H \\in SC')}. Giao tuyến với ${m('(SBC)')} là ${m('FH')}.`, `Ta có ${m('EF \\parallel AB \\parallel CD \\parallel GH')} nên tứ giác ${m('EFHG')} có hai cạnh ${m('EF, GH')} song song. Hai cạnh này không bằng nhau (${m('EF = k\\cdot AB')}, ${m('GH = k\\cdot CD')} với ${m('AB \\neq CD')}), nên ${m('EFHG')} là hình thang.`],
   ans:`Giao tuyến: ${tb('EF, FH, HG, GE')} (${tb('EF \\parallel AB')}, ${tb('EG \\parallel AD')}, ${tb('GH \\parallel CD')}); hình tạo thành là ${tw('hình thang EFHG')} (${m('EF \\parallel GH')}). <i>(Kết luận “hình thang” do em tự suy luận – thầy đối chiếu đáp án SGK.)</i>`},

  {kind:'vd', tag:'Mở rộng · Bài 4.19', label:'Câu 2 (mở rộng)', de:`Với Bài 4.19, giả sử ${m('E')} là trung điểm của ${m('SA')}, ${m('AB = 6')}, ${m('CD = 10')}. Tính độ dài hai đáy của hình thang ${m('EFHG')}.`, fig: fig419,
   sol:[`${m('E')} là trung điểm ${m('SA')} và ${m('EF \\parallel AB')} nên ${m('F')} là trung điểm ${m('SB')}, ${m('EF = \\dfrac{1}{2}AB = 3')}.`, `${m('EG \\parallel AD')} nên ${m('G')} là trung điểm ${m('SD')}; ${m('GH \\parallel CD')} nên ${m('H')} là trung điểm ${m('SC')} và ${m('GH = \\dfrac{1}{2}CD = 5')}.`],
   ans:`${tb('EF = 3')}, ${tb('GH = 5')}.`},

  {kind:'sum', tag:'Tổng kết', title:'Lỗi hay gặp',
   body:`<ul><li>Kết luận ${m('d \\parallel (P)')} mà quên chỉ ra ${m('d \\not\\subset (P)')}.</li><li>Cho rằng không có điểm chung nghĩa là chéo nhau: phải kiểm tra không đồng phẳng.</li><li>Khi vẽ thiết diện song song với mặt đáy, quên rằng mọi giao tuyến đều song song với cạnh đáy tương ứng.</li></ul><div class="lk-box">Đề tra từ văn bản SGK trên mạng – thầy đối chiếu số trang, số thứ tự.</div>`},
]);
})();

/* =====================================================================
   GIẢI BÀI TẬP SGK – Toán 11 KNTT, tập 1, Bài 13. Hai mặt phẳng song song (02/11/2026)
   Luyện tập 6 (tr. 93), Bài 4.21 (tr. 93), Bài 4.22, 4.23, 4.24 (tr. 94). Đề tra từ văn bản SGK/lời giải trên mạng, nhiều chỗ ghi tóm tắt (nhất là 4.21, 4.22, 4.23):
   thầy đối chiếu số trang, số thứ tự và nội dung. Chưa làm: Hoạt động, Luyện tập 1–5, Vận dụng 1–2, Bài 4.20 và bài tập cuối chương (tr. 95) – thầy gửi ảnh SGK thì bổ sung.
   ===================================================================== */
(() => {
const m = tm, tw = t => `<b class="ans">${t}</b>`;
const mid = (p, q, t = .5) => [p[0] + t * (q[0] - p[0]), p[1] + t * (q[1] - p[1])];
const CUBE0 = {A:[80, 192], B:[190, 192], C:[250, 152], D:[140, 152], "A'":[80, 94], "B'":[190, 94], "C'":[250, 54], "D'":[140, 54]};
const figLT6 = spaceSVG({pts:CUBE0, s:[['A', 'B'], ['B', 'C'], ["A'", "B'"], ["B'", "C'"], ["C'", "D'"], ["D'", "A'"], ['A', "A'"], ['B', "B'"], ['C', "C'"]], d:[['A', 'D'], ['D', 'C'], ['D', "D'"]], fill:[['A', 'D', "D'", "A'"], ['B', 'C', "C'", "B'"]], ht:218, aria:"Hình hộp ABCD.A'B'C'D' với hai mặt (ADD'A') và (BCC'B') được tô"});
const PRI0 = {A:[50, 172], B:[130, 198], C:[270, 172], "A'":[50, 60], "B'":[130, 86], "C'":[270, 60]};
const fig422 = spaceSVG({pts:{...PRI0, M:mid(PRI0.A, PRI0["A'"]), N:mid(PRI0.B, PRI0["B'"]), P:mid(PRI0.C, PRI0["C'"])},
  s:[['A', 'B'], ['B', 'C'], ["A'", "B'"], ["B'", "C'"], ["C'", "A'"], ['A', "A'"], ['B', "B'"], ['C', "C'"], ['M', 'N'], ['N', 'P']], d:[['A', 'C'], ['M', 'P']], fill:[['M', 'N', 'P']], ht:218, aria:"Lăng trụ ABC.A'B'C' với M, N, P là trung điểm AA', BB', CC'"});
const fig423 = spaceSVG({pts:{A:[40, 172], B:[190, 172], C:[150, 132], D:[80, 132], x:[100, 60], y:[140, 20]}, nolabel:['x', 'y'], s:[['A', 'B'], ['B', 'C'], ['C', 'D'], ['D', 'A'], ['A', 'x'], ['D', 'y']], fill:[['B', 'A', 'x'], ['C', 'D', 'y']], txt:[[112, 62, 'm'], [152, 24, 'n']], w:260, ht:200, aria:'Hình thang ABCD (AB song song CD) và hai tia Am, Dn song song với nhau; hai mặt phẳng (B, m) và (C, n)'});
const T0 = [[160, 22], [48, 160], [168, 196], [288, 128]];
const fig424 = spaceSVG({pts:{S:T0[0], A:T0[1], B:T0[2], C:T0[3], 'A₁':mid(T0[0], T0[1], 2 / 3), 'A₂':mid(T0[0], T0[1], 1 / 3), 'B₁':mid(T0[0], T0[2], 2 / 3), 'B₂':mid(T0[0], T0[2], 1 / 3), 'C₁':mid(T0[0], T0[3], 2 / 3), 'C₂':mid(T0[0], T0[3], 1 / 3)},
  s:[['S', 'A'], ['S', 'B'], ['S', 'C'], ['A', 'B'], ['B', 'C'], ['A₁', 'B₁'], ['B₁', 'C₁'], ['A₂', 'B₂'], ['B₂', 'C₂']], d:[['A', 'C'], ['A₁', 'C₁'], ['A₂', 'C₂']], fill:[['A₁', 'B₁', 'C₁'], ['A₂', 'B₂', 'C₂']], ht:218, aria:'Hình chóp S.ABC; hai mặt phẳng (P), (Q) song song với (ABC) đi qua A₁, A₂'});

Lecture.addSgk('lop11', 'bai-13', [
  {kind:'title', tag:'Toán 11 · Kết nối tri thức · Giải bài tập SGK', title:'Bài 13. Hai mặt phẳng song song', sub:'Luyện tập 6, Bài 4.21 (tr. 93); Bài 4.22, 4.23, 4.24 (tr. 94) – SGK tập 1',
   points:['Luyện tập 6 (tr. 93) – hình hộp: hai mặt bên đối diện song song.', 'Bài 4.21 (tr. 93) – mệnh đề đúng về ba mặt phẳng phân biệt.', 'Bài 4.22 (tr. 94) – lăng trụ, các trung điểm của ba cạnh bên: (MNP) ∥ (ABC).', 'Bài 4.23 (tr. 94) – hình thang và hai tia song song: hai mặt phẳng song song.', 'Bài 4.24 (tr. 94) – chia đều cạnh SA, suy ra chia đều SB, SC (Thales không gian).', 'Các câu còn lại của bài (Hoạt động, Luyện tập 1–5, Vận dụng, Bài 4.20, bài tập cuối chương) chưa có đề – thầy gửi ảnh SGK thì bổ sung.']},

  {kind:'kt', tag:'Nhắc nhanh', title:'Bốn công cụ dùng trong các câu này',
   body:`<ol class="lk-steps"><li><b>Điều kiện song song:</b> mặt phẳng chứa hai đường thẳng <b>cắt nhau</b> cùng song song với mặt phẳng kia.</li><li><b>Bắc cầu:</b> hai mặt phẳng phân biệt cùng song song với mặt phẳng thứ ba thì song song với nhau.</li><li><b>Giao tuyến:</b> mặt phẳng thứ ba cắt hai mặt phẳng song song theo hai giao tuyến song song.</li><li><b>Thales không gian:</b> ba mặt phẳng song song chắn trên hai cát tuyến những đoạn tương ứng tỉ lệ.</li></ol>`},

  {kind:'vd', tag:'SGK tr. 93 · Luyện tập 6', label:'Câu 1', de:`Cho hình hộp ${m("ABCD.A'B'C'D'")}. Chứng minh ${m("(ADD'A') \\parallel (BCC'B')")}.`, fig: figLT6,
   sol:[`${m('ABCD')} là hình bình hành nên ${m('AD \\parallel BC')}; ${m("BC \\subset (BCC'B')")} và ${m("AD \\not\\subset (BCC'B')")} nên ${m("AD \\parallel (BCC'B')")}.`, `${m("ABB'A'")} là hình bình hành nên ${m("AA' \\parallel BB'")}; ${m("BB' \\subset (BCC'B')")} và ${m("AA' \\not\\subset (BCC'B')")} nên ${m("AA' \\parallel (BCC'B')")}.`, `${m("AD, AA'")} cắt nhau tại ${m('A')} và cùng nằm trong ${m("(ADD'A')")}. Theo điều kiện song song: ${m("(ADD'A') \\parallel (BCC'B')")}.`],
   ans:`${tb("(ADD'A') \\parallel (BCC'B')")}. <i>Mở rộng:</i> hai cặp mặt đối diện còn lại chứng minh tương tự; hình hộp có đúng 3 cặp mặt song song.`},

  {kind:'vd', tag:'SGK tr. 93 · Bài 4.21', label:'Câu 2', de:`Trong không gian cho ba mặt phẳng phân biệt ${m('(P), (Q), (R)')}. Trong các mệnh đề a)–d) của SGK, mệnh đề nào đúng? <i>(Đề ghi tóm tắt: em chỉ nắm chắc mệnh đề đúng c) – thầy đối chiếu nội dung a), b), d) trong SGK.)</i>`,
   sol:[`Mệnh đề c): nếu ${m('(P) \\parallel (R)')} và ${m('(Q) \\parallel (R)')} thì ${m('(P) \\parallel (Q)')} – <b>đúng</b> (tính chất bắc cầu).`, `Các mệnh đề còn lại sai vì có phản ví dụ: hai mặt phẳng cùng cắt ${m('(R)')}, hoặc cùng song song với một đường thẳng, vẫn có thể cắt nhau (ví dụ hai mặt bên kề nhau của hình lập phương cùng song song với một cạnh bên, hoặc cùng cắt mặt đáy).`],
   ans:`Chỉ mệnh đề ${tw('c)')} đúng.`},

  {kind:'vd', tag:'SGK tr. 94 · Bài 4.22', label:'Câu 3', de:`Cho hình lăng trụ ${m("ABC.A'B'C'")}. Gọi ${m('M, N, P')} lần lượt là trung điểm của ${m("AA', BB', CC'")}. Chứng minh ${m('(MNP) \\parallel (ABC)')}. <i>(Đề ghi tóm tắt – thầy đối chiếu.)</i>`, fig: fig422,
   sol:[`${m("ABB'A'")} là hình bình hành (hình thang), ${m('M, N')} là trung điểm hai cạnh đối ${m("AA', BB'")} nên ${m('MN')} là đường trung bình: ${m('MN \\parallel AB')}.`, `Tương tự ${m("BCC'B'")}: ${m('NP \\parallel BC')}.`, `${m('MN, NP')} cắt nhau tại ${m('N')} trong ${m('(MNP)')} và không nằm trong ${m('(ABC)')}, lần lượt song song với ${m('AB, BC \\subset (ABC)')}. Theo điều kiện song song: ${m('(MNP) \\parallel (ABC)')}.`],
   ans:`${tb('(MNP) \\parallel (ABC)')}. <i>Mở rộng:</i> ${m('MN = AB')}, ${m('NP = BC')}, ${m('PM = CA')} nên tam giác ${m('MNP')} bằng tam giác ${m('ABC')} (cùng chu vi, cùng diện tích).`},

  {kind:'vd', tag:'SGK tr. 94 · Bài 4.23', label:'Câu 4', de:`Cho hình thang ${m('ABCD')} có hai đáy ${m('AB, CD')}. Qua ${m('A')} và ${m('D')} lần lượt kẻ hai tia ${m('Am, Dn')} song song với nhau, cùng chiều và không nằm trong mặt phẳng ${m('(ABCD)')}. Chứng minh hai mặt phẳng ${m('(B, Am)')} và ${m('(C, Dn)')} song song. <i>(Đề ghi tóm tắt từ lời giải – thầy đối chiếu.)</i>`, fig: fig423,
   sol:[`${m('Am \\parallel Dn')} và ${m('Dn \\subset (C, Dn)')}; ${m('Am \\not\\subset (C, Dn)')} (nếu có thì ${m('A \\in (C, Dn)')}, mặt phẳng này chứa ${m('A, C, D')} nên là ${m('(ABCD)')} và chứa ${m('Dn')} – trái giả thiết). Vậy ${m('Am \\parallel (C, Dn)')}.`, `${m('AB \\parallel CD')}, ${m('CD \\subset (C, Dn)')} và ${m('AB \\not\\subset (C, Dn)')} (cùng lí do) nên ${m('AB \\parallel (C, Dn)')}.`, `${m('Am, AB')} cắt nhau tại ${m('A')} và nằm trong ${m('(B, Am)')}. Theo điều kiện song song: ${m('(B, Am) \\parallel (C, Dn)')}.`],
   ans:`${tb('(B, Am) \\parallel (C, Dn)')}.`},

  {kind:'vd', tag:'SGK tr. 94 · Bài 4.24', label:'Câu 5', de:`Cho hình chóp ${m('S.ABC')}. Trên cạnh ${m('SA')} lấy ${m('A_1, A_2')} sao cho ${m('AA_1 = A_1A_2 = A_2S')}. Qua ${m('A_1, A_2')} dựng hai mặt phẳng ${m('(P), (Q)')} cùng song song với ${m('(ABC)')}; ${m('(P)')} cắt ${m('SB, SC')} tại ${m('B_1, C_1')}, ${m('(Q)')} cắt ${m('SB, SC')} tại ${m('B_2, C_2')}. Chứng minh ${m('BB_1 = B_1B_2 = B_2S')} và ${m('CC_1 = C_1C_2 = C_2S')}.`, fig: fig424,
   sol:[`${m('(ABC), (P), (Q)')} đôi một song song và cắt hai cát tuyến ${m('SA, SB')} lần lượt tại ${m('A, A_1, A_2')} và ${m('B, B_1, B_2')}.`, `Theo định lí Thales trong không gian: ${m('\\dfrac{BB_1}{AA_1} = \\dfrac{B_1B_2}{A_1A_2} = \\dfrac{B_2S}{A_2S}')}.`, `Vì ${m('AA_1 = A_1A_2 = A_2S')} nên ${m('BB_1 = B_1B_2 = B_2S')}. Làm tương tự với cát tuyến ${m('SA, SC')} ta được ${m('CC_1 = C_1C_2 = C_2S')}.`],
   ans:`${tb('BB_1 = B_1B_2 = B_2S')} và ${tb('CC_1 = C_1C_2 = C_2S')}.`},

  {kind:'vd', tag:'Mở rộng · Bài 4.24', label:'Câu 5 (mở rộng)', de:`Với Bài 4.24, biết diện tích tam giác ${m('ABC')} bằng ${m('18')}. Tính diện tích các tam giác ${m('A_1B_1C_1')} và ${m('A_2B_2C_2')}.`, fig: fig424,
   sol:[`${m('SA_1 = \\dfrac{2}{3}SA')} nên tam giác ${m('A_1B_1C_1')} đồng dạng ${m('ABC')} theo tỉ số ${m('\\dfrac{2}{3}')}: diện tích ${m('\\dfrac{4}{9}\\cdot 18 = 8')}.`, `${m('SA_2 = \\dfrac{1}{3}SA')} nên tỉ số đồng dạng ${m('\\dfrac{1}{3}')}: diện tích ${m('\\dfrac{1}{9}\\cdot 18 = 2')}.`],
   ans:`${tb('8')} và ${tb('2')}.`},

  {kind:'sum', tag:'Tổng kết', title:'Lỗi hay gặp',
   body:`<ul><li>Chứng minh song song mà chỉ nêu <b>một</b> đường thẳng hoặc hai đường thẳng song song nhau: phải là hai đường thẳng <b>cắt nhau</b>.</li><li>Quên nói đường thẳng không nằm trong mặt phẳng kia khi dùng “đường thẳng song song mặt phẳng”.</li><li>Lập tỉ lệ Thales sai đoạn tương ứng (lấy ${m('SA_1')} với ${m('AA_1')}).</li><li>Tỉ số diện tích là ${m('k^2')}, không phải ${m('k')}.</li></ul>`},
]);
})();

(() => {
const m = tm, tw = t => `<b class="ans">${t}</b>`;
const note = h => `<div class="lk-note">⚠️ ${h}</div>`;
/* hình hộp ABCD.EFGH: E, F, G, H nằm trên A, B, C, D */
const BX = {A:[80, 192], B:[190, 192], C:[250, 152], D:[140, 152], E:[80, 94], F:[190, 94], G:[250, 54], H:[140, 54]};
const figBox = (h, fill) => spaceSVG({pts:BX, s:[['A', 'B'], ['B', 'C'], ['E', 'F'], ['F', 'G'], ['G', 'H'], ['H', 'E'], ['A', 'E'], ['B', 'F'], ['C', 'G']], d:[['A', 'D'], ['D', 'C'], ['D', 'H']], h, fill, ht:218, aria:'Hình hộp ABCD.EFGH'});
const SK14 = [[60, 15], [170, 85], [300, 70]];
const fgTriS = () => { const [A, B, C] = SK14, pj = X => { const t = (170 - X[1]) / 100; return [X[0] - 20 * t + 35, 170]; }, M = [(B[0] + C[0]) / 2, (B[1] + C[1]) / 2], G = [(A[0] + B[0] + C[0]) / 3, (A[1] + B[1] + C[1]) / 3];
  return spaceSVG({pts:{A, B, C, M, G, "A'":pj(A), "B'":pj(B), "C'":pj(C), "M'":pj(M), "G'":pj(G)}, planes:[{q:[[10, 182], [320, 182], [350, 150], [40, 150]], lab:'(P)', at:[326, 176]}], s:[['A', 'B'], ['B', 'C'], ['C', 'A'], ['A', 'M']], d:[['A', "A'"], ['G', "G'"], ['B', "B'"], ['C', "C'"], ['M', "M'"]], off:{"A'":[-14, 8], "B'":[0, 16], "C'":[14, 8], "M'":[0, 16], "G'":[0, 16], G:[10, 8]}, w:360, ht:210, aria:"Phép chiếu song song biến tam giác ABC, trung điểm M của BC, trọng tâm G thành tam giác A′B′C′, M′, G′"}); };

Lecture.addSgk('lop11', 'bai-14', [
  {kind:'title', tag:'Toán 11 · Kết nối tri thức · Giải bài tập SGK', title:'Bài 14. Phép chiếu song song', sub:'Luyện tập 1, 2 (tr. 97–98); Bài 4.31, 4.33 (tr. 100) – SGK tập 1',
   points:['Luyện tập 1 (tr. 97) – hình hộp ABCD.EFGH: hình chiếu của A lên (DCGH) theo hai phương BC và BG.', 'Luyện tập 2 (tr. 98) – hình chiếu của hình thang.', 'Bài 4.31 (tr. 100) – phép chiếu song song biến trọng tâm tam giác thành trọng tâm tam giác hình chiếu.', 'Bài 4.33 (tr. 100) – hình biểu diễn của hình chóp có đáy là hình thang, tính độ dài trên hình biểu diễn.', 'Đề các câu ghi tóm tắt theo nguồn mạng, thầy đối chiếu số trang/số bài với SGK; các câu còn lại của bài (Vận dụng, Bài 4.29, 4.30, 4.32, 4.34) chưa đưa vào vì chưa có đề chính xác – thầy gửi ảnh SGK thì bổ sung.']},

  {kind:'kt', tag:'Nhắc nhanh', title:'Ba công cụ dùng trong các câu này',
   body:`<ul><li><b>Tìm hình chiếu của điểm:</b> kẻ qua điểm đó đường thẳng song song phương chiếu, lấy giao với mặt phẳng chiếu.</li><li><b>Bảo toàn:</b> thẳng hàng, thứ tự, song song, tỉ số độ dài (trung điểm, trọng tâm).</li><li><b>Không bảo toàn:</b> độ dài, góc, vuông góc, hình đều/tròn.</li></ul>` + note(`Hình chiếu của hình thang là hình thang chỉ khi mặt phẳng chứa hình không song song phương chiếu.`)},

  {kind:'vd', tag:'SGK tr. 97 · Luyện tập 1', label:'Câu 1', de:`Cho hình hộp ${m('ABCD.EFGH')} (${m('E, F, G, H')} lần lượt nằm trên ${m('A, B, C, D')}). Tìm hình chiếu song song của điểm ${m('A')} lên mặt phẳng ${m('(DCGH)')} theo phương: a) ${m('BC')}; b) ${m('BG')}.`, fig: figBox([['A', 'D'], ['B', 'C']], [['D', 'C', 'G', 'H']]),
   sol:[`a) ${m('ABCD')} là hình bình hành nên ${m('AD \\parallel BC')}; ${m('D \\in (DCGH)')}. Hình chiếu của ${m('A')} là ${m('D')}.`, `b) ${m('ABGH')} là hình bình hành (${m('AH \\parallel BG')}, vì ${m('AB \\parallel DC \\parallel HG')} và ${m('AB = DC = HG')}); ${m('H \\in (DCGH)')}. Hình chiếu của ${m('A')} là ${m('H')}.`],
   ans:`a) ${tb('D')}; b) ${tb('H')}.`},

  {kind:'vd', tag:'SGK tr. 98 · Luyện tập 2', label:'Câu 2', de:`Chứng minh hình chiếu song song của một hình thang (nằm trong mặt phẳng không song song với phương chiếu) là một hình thang.`,
   sol:[`Hình thang ${m('ABCD')} có ${m('AB \\parallel CD')}, ${m('AB \\ne CD')}.`, `Phép chiếu giữ quan hệ song song: ${m("A'B' \\parallel C'D'")}.`, `Phép chiếu giữ tỉ số hai đoạn song song: ${m("\\dfrac{C'D'}{A'B'} = \\dfrac{CD}{AB} \\ne 1")}, nên ${m("A'B' \\ne C'D'")}.`, `Tứ giác ${m("A'B'C'D'")} có hai cạnh đối song song, hai cạnh kia không song song (cạnh bên ${m('AD, BC')} cắt nhau nên ${m("A'D', B'C'")} cắt nhau): đó là hình thang.`],
   ans:`Hình chiếu của hình thang là ${tw('hình thang')} (tỉ số hai đáy được giữ nguyên).`},

  {kind:'vd', tag:'SGK tr. 100 · Bài 4.31', label:'Câu 3', de:`Chứng minh phép chiếu song song biến trọng tâm của một tam giác thành trọng tâm của tam giác hình chiếu.`, fig: fgTriS(),
   sol:[`Gọi ${m('M')} là trung điểm ${m('BC')}, ${m('G')} là trọng tâm tam giác ${m('ABC')}: ${m('G \\in AM')}, ${m('AG = \\dfrac{2}{3}AM')}.`, `Phép chiếu biến trung điểm thành trung điểm: ${m("M'")} là trung điểm ${m("B'C'")}, nên ${m("A'M'")} là trung tuyến của tam giác ${m("A'B'C'")}.`, `Giữ tỉ số trên đường thẳng ${m('AM')}: ${m("A'G' = \\dfrac{2}{3}A'M'")}; mà ${m("G' \\in A'M'")} nên ${m("G'")} là điểm chia trung tuyến ${m("A'M'")} theo tỉ số ${m('2:3')} tính từ ${m("A'")}.`, `Vậy ${m("G'")} là trọng tâm tam giác ${m("A'B'C'")}.`],
   ans:`Hình chiếu của trọng tâm là ${tw('trọng tâm của tam giác hình chiếu')}.`},

  {kind:'vd', tag:'SGK tr. 100 · Bài 4.33', label:'Câu 4', de:`Hình chóp ${m('S.ABCD')} có đáy ${m('ABCD')} là hình thang, ${m('AB \\parallel CD')}, ${m('AB = 2')} cm, ${m('CD = 6')} cm. Trên hình biểu diễn đáy, ${m("A'B' = 3")} cm. Tính ${m("C'D'")} và nêu cách vẽ hình biểu diễn của hình chóp.`,
   sol:[`${m("A'B' \\parallel C'D'")} và tỉ số hai đoạn song song được bảo toàn: ${m("\\dfrac{C'D'}{A'B'} = \\dfrac{CD}{AB} = \\dfrac{6}{2} = 3")}.`, `${m("C'D' = 3\\cdot 3 = 9")} cm.`, `Cách vẽ: vẽ hình thang ${m("A'B'C'D'")} (đáy ${m("A'B' = 3")} cm, ${m("C'D' = 9")} cm, song song nhau); chọn điểm ${m("S'")} ngoài mặt phẳng hình vẽ, nối ${m("S'A', S'B', S'C', S'D'")}; cạnh bị đáy che khuất vẽ nét đứt.`],
   ans:`${tb("C'D' = 9")} cm.`},

  {kind:'vd', tag:'Mở rộng · Bài 4.31', label:'Câu 5 (mở rộng)', de:`Với Bài 4.31, biết ${m("A'G' = 8")}. Tính ${m("G'M'")} và ${m("A'M'")}.`, fig: fgTriS(),
   sol:[`${m("\\dfrac{A'G'}{A'M'} = \\dfrac{2}{3}")} nên ${m("A'M' = \\dfrac{3}{2}\\cdot 8 = 12")}.`, `${m("G'M' = A'M' - A'G' = 12 - 8 = 4")}.`], ans:`${tb("A'M' = 12")}, ${tb("G'M' = 4")}.`},

  {kind:'sum', tag:'Tổng kết', title:'Lỗi hay gặp',
   body:`<ul><li>Cho rằng phép chiếu giữ độ dài hoặc góc: chỉ giữ <b>tỉ số</b> (trên cùng đường thẳng hoặc hai đường song song).</li><li>So sánh tỉ số hai đoạn <b>không</b> song song cũng không cùng đường thẳng: không được bảo toàn.</li><li>Quên điều kiện mặt phẳng chứa hình không song song phương chiếu.</li><li>Vẽ cạnh khuất bằng nét liền: phải vẽ <b>nét đứt</b>.</li></ul>`},
]);
})();

(() => {
const m = tm, tw = t => `<b class="ans">${t}</b>`;
const note = h => `<div class="lk-note">⚠️ ${h}</div>`;
const mid = (p, q, t = .5) => [p[0] + t * (q[0] - p[0]), p[1] + t * (q[1] - p[1])];
/* hình chóp S.ABCD đáy hình bình hành (A trái, B dưới trái, C dưới phải, D phải) */
const PG = {S:[150, 16], A:[40, 142], B:[104, 186], C:[262, 186], D:[198, 142]};
const base = (pts, d, s2, fill) => spaceSVG({pts, s:[['S', 'A'], ['S', 'B'], ['S', 'C'], ['S', 'D'], ['A', 'B'], ['B', 'C'], ['C', 'D'], ...(s2 || [])], d, fill, ht:218, aria:'Hình chóp S.ABCD'});
const fig436 = (() => { const O = mid(PG.A, PG.C), M = mid(PG.S, PG.D);
  return base({...PG, M, O}, [['A', 'D'], ['A', 'C'], ['B', 'D'], ['O', 'M']], [['A', 'M'], ['C', 'M']]); })();
const fig443 = (() => { const M = mid(PG.S, PG.C, 1 / 3), K = mid(PG.S, PG.D, 1 / 3), N = mid(PG.A, PG.B, 1 / 3);
  return base({...PG, M, K, N}, [['A', 'D'], ['K', 'M'], ['A', 'K']], [['N', 'M'], ['A', 'N']]); })();
const PT = {S:[150, 16], A:[110, 142], B:[190, 142], C:[290, 186], D:[70, 186]};
const fig441 = spaceSVG({pts:PT, s:[['S', 'A'], ['S', 'B'], ['S', 'C'], ['S', 'D'], ['D', 'C'], ['A', 'D'], ['B', 'C']], d:[['A', 'B']], ht:218, aria:'Hình chóp S.ABCD có đáy là hình thang ABCD với AB song song CD, AB nhỏ hơn CD'});

Lecture.addSgk('lop11', 'on-tap-c4', [
  {kind:'title', tag:'Toán 11 · Kết nối tri thức · Giải bài tập SGK', title:'Bài tập cuối chương IV', sub:'Bài 4.36 (tr. 102); Bài 4.41, 4.43 (tr. 103) – SGK tập 1',
   points:['Bài 4.36 (tr. 102) – trắc nghiệm: đường thẳng SB song song với mặt phẳng nào.', 'Bài 4.41 (tr. 103) – giao tuyến của các cặp mặt phẳng trong hình chóp có đáy là hình thang.', 'Bài 4.43 (tr. 103) – giao điểm K của (ABM) với SD, tính SK/SD và chứng minh MN ∥ (SAD).', 'Đề lấy từ nguồn mạng (vietjack.com), thầy đối chiếu số trang/số bài với SGK; các bài còn lại của cuối chương (4.35, 4.37–4.40, 4.42) chưa đưa vào vì chưa có đề chính xác.']},

  {kind:'kt', tag:'Nhắc nhanh', title:'Ba công cụ dùng trong các câu này',
   body:`<ul><li><b>Giao tuyến:</b> hai điểm chung; hoặc một điểm chung + phương song song (khi hai mặt phẳng chứa hai đường song song).</li><li><b>Đường thẳng ∥ mặt phẳng:</b> song song một đường nằm trong mặt phẳng và không nằm trong mặt phẳng.</li><li><b>Thales / đường trung bình:</b> đoạn thẳng song song đáy chia hai cạnh theo cùng tỉ số.</li></ul>` + note(`Đường thẳng không nằm trong mặt phẳng là điều kiện không được quên khi kết luận song song.`)},

  {kind:'vd', tag:'SGK tr. 102 · Bài 4.36', label:'Câu 1', de:`Cho hình chóp ${m('S.ABCD')} có đáy ${m('ABCD')} là hình bình hành. ${m('M')} là trung điểm của ${m('SD')}. Đường thẳng ${m('SB')} song song với mặt phẳng: A. ${m('(CDM)')}; B. ${m('(ACM)')}; C. ${m('(ADM)')}; D. ${m('(ACD)')}.`, fig: fig436,
   sol:[`Gọi ${m('O = AC \\cap BD')}: ${m('O')} là trung điểm ${m('BD')} (hình bình hành).`, `Trong tam giác ${m('SBD')}, ${m('OM')} là đường trung bình nên ${m('OM \\parallel SB')}.`, `${m('OM \\subset (ACM)')} (vì ${m('O \\in AC')}) và ${m('SB \\not\\subset (ACM)')} nên ${m('SB \\parallel (ACM)')}.`, `Các mặt phẳng còn lại: ${m('(CDM)')}, ${m('(ADM)')} chứa ${m('D')}, ${m('M')} thuộc ${m('SD')} nên ${m('SB')} cắt chúng tại ${m('S')} hoặc ${m('B')}; ${m('(ACD)')} chứa ${m('B')}.`],
   ans:`Đáp án ${tb('B. (ACM)')}.`},

  {kind:'vd', tag:'SGK tr. 103 · Bài 4.41', label:'Câu 2', de:`Cho hình chóp ${m('S.ABCD')} có đáy ${m('ABCD')} là hình thang, ${m('AB \\parallel CD')}, ${m('AB \\lt CD')}. Xác định giao tuyến của: a) ${m('(SAD)')} và ${m('(SBC)')}; b) ${m('(SAB)')} và ${m('(SCD)')}; c) ${m('(SAC)')} và ${m('(SBD)')}.`, fig: fig441,
   sol:[`a) ${m('AB \\parallel CD')}, ${m('AB \\lt CD')} nên ${m('AD')} cắt ${m('BC')} tại ${m('F')}. ${m('S, F')} là hai điểm chung: giao tuyến ${m('SF')}.`, `b) ${m('S')} chung; ${m('AB \\subset (SAB)')}, ${m('CD \\subset (SCD)')}, ${m('AB \\parallel CD')}: giao tuyến là đường thẳng qua ${m('S')} song song với ${m('AB, CD')}.`, `c) Gọi ${m('O = AC \\cap BD')} (hai đường chéo của hình thang cắt nhau). ${m('S, O')} là hai điểm chung: giao tuyến ${m('SO')}.`],
   ans:`a) ${tb('SF')} (${m('F = AD \\cap BC')}); b) ${tb('Sx \\parallel AB \\parallel CD')}; c) ${tb('SO')} (${m('O = AC \\cap BD')}).`},

  {kind:'vd', tag:'SGK tr. 103 · Bài 4.43', label:'Câu 3', de:`Cho hình chóp ${m('S.ABCD')} có đáy ${m('ABCD')} là hình bình hành. Trên cạnh ${m('SC')} và ${m('AB')} lần lượt lấy ${m('M')} và ${m('N')} sao cho ${m('CM = 2SM')} và ${m('BN = 2AN')}. a) Xác định giao điểm ${m('K')} của ${m('(ABM)')} với ${m('SD')}; tính ${m('\\dfrac{SK}{SD}')}. b) Chứng minh ${m('MN \\parallel (SAD)')}.`, fig: fig443,
   sol:[`a) ${m('AB \\parallel CD')} nên ${m('(ABM)')} cắt ${m('(SCD)')} theo đường thẳng qua ${m('M')} song song ${m('CD')}; đường đó cắt ${m('SD')} tại ${m('K')}. Vậy ${m('K = SD \\cap (ABM)')}.`, `Thales trong ${m('\\triangle SCD')} với ${m('MK \\parallel CD')}: ${m('\\dfrac{SK}{SD} = \\dfrac{SM}{SC} = \\dfrac{1}{3}')} (vì ${m('CM = 2SM')} nên ${m('SC = 3SM')}).`, `b) ${m('\\dfrac{KM}{CD} = \\dfrac{SM}{SC} = \\dfrac{1}{3}')} nên ${m('KM = \\dfrac{1}{3}CD = \\dfrac{1}{3}AB')}; ${m('AN = \\dfrac{1}{3}AB')}. Do đó ${m('KM \\parallel AN')} và ${m('KM = AN')}: ${m('ANMK')} là hình bình hành.`, `Suy ra ${m('MN \\parallel AK')}, ${m('AK \\subset (SAD)')}, ${m('MN \\not\\subset (SAD)')} (vì ${m('N \\notin (SAD)')}). Vậy ${m('MN \\parallel (SAD)')}.`],
   ans:`a) ${tb('SK/SD = 1/3')}; b) ${tb('MN \\parallel (SAD)')}.`},

  {kind:'vd', tag:'Mở rộng · Bài 4.43', label:'Câu 4 (mở rộng)', de:`Với Bài 4.43, biết ${m('AB = 12')}, ${m('CD = 12')}. Tính độ dài ${m('KM')} và ${m('AN')}.`, fig: fig443,
   sol:[`${m('KM = \\dfrac{1}{3}CD = 4')}.`, `${m('AN = \\dfrac{1}{3}AB = 4')}.`], ans:`${tb('KM = 4')}, ${tb('AN = 4')}.`},

  {kind:'sum', tag:'Tổng kết', title:'Lỗi hay gặp',
   body:`<ul><li>Giao tuyến hình chóp đáy hình thang: không dùng “qua ${m('S')} song song ${m('AB')}” cho ${m('(SAD)')} và ${m('(SBC)')} (hai cạnh bên cắt nhau tại ${m('F')}).</li><li>Kết luận đường thẳng song song mặt phẳng mà không nói đường thẳng <b>không nằm trong</b> mặt phẳng.</li><li>Lập tỉ lệ Thales sai: ${m('\\dfrac{SK}{SD}')} chứ không phải ${m('\\dfrac{SK}{KD}')}.</li></ul>`},
]);
})();
