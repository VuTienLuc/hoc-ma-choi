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
