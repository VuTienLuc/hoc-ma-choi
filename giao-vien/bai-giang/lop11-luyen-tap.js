/* =====================================================================
   PHIẾU LUYỆN TẬP LỚP 11 – Chương I. Hàm số lượng giác và phương trình lượng giác (Ôn tập chương)
   Lecture.addPractice(lớp, mã bài, [{dang, items:[{de, sol, ans, hard}]}]) – 7 cơ bản + 3 vận dụng (★).
   Xếp theo 5 dạng như bài giảng Ôn tập chương I; lời giải từng bước, ghi rõ công thức đã dùng.
   ===================================================================== */
(() => {
const m = tm, f = (a, b) => `\\dfrac{${a}}{${b}}`, K = '(k \\in \\mathbb{Z})';

/* =====================================================================  ÔN TẬP CHƯƠNG I  */
Lecture.addPractice('lop11', 'on-tap-c1', [
 {dang:'Tính giá trị lượng giác khi biết một giá trị', items:[
  {de:`Cho ${m(`\\cos\\alpha = ${f(4,5)}`)} với ${m('\\dfrac{3\\pi}{2} \\lt \\alpha \\lt 2\\pi')}. Tính ${m('\\sin\\alpha')} và ${m('\\tan\\alpha')}.`,
   sol:[`Hệ thức cơ bản: ${m(`\\sin^2\\alpha = 1 - \\cos^2\\alpha = 1 - ${f(16,25)} = ${f(9,25)}`)}.`,
     `${m('\\alpha')} thuộc góc phần tư IV nên ${m('\\sin\\alpha \\lt 0')}: ${m(`\\sin\\alpha = -${f(3,5)}`)}.`,
     `${m(`\\tan\\alpha = \\dfrac{\\sin\\alpha}{\\cos\\alpha} = -${f(3,5)} : ${f(4,5)}`)}.`],
   ans:`${tb(`\\sin\\alpha = -${f(3,5)}`)}; ${tb(`\\tan\\alpha = -${f(3,4)}`)}.`},
  {de:`Cho ${m('\\tan\\alpha = 2')} với ${m('\\pi \\lt \\alpha \\lt \\dfrac{3\\pi}{2}')}. Tính ${m('\\cos\\alpha')} và ${m('\\sin\\alpha')}.`,
   sol:[`Hệ thức ${m('1 + \\tan^2\\alpha = \\dfrac{1}{\\cos^2\\alpha}')}: ${m(`\\dfrac{1}{\\cos^2\\alpha} = 1 + 4 = 5 \\Rightarrow \\cos^2\\alpha = ${f(1,5)}`)}.`,
     `${m('\\alpha')} thuộc góc phần tư III nên ${m('\\cos\\alpha \\lt 0')}: ${m(`\\cos\\alpha = -${f(1,'\\sqrt{5}')} = -${f('\\sqrt{5}',5)}`)}.`,
     `${m(`\\sin\\alpha = \\tan\\alpha\\cdot\\cos\\alpha = 2\\cdot\\left(-${f('\\sqrt{5}',5)}\\right)`)}.`],
   ans:`${tb(`\\cos\\alpha = -${f('\\sqrt{5}',5)}`)}; ${tb(`\\sin\\alpha = -${f('2\\sqrt{5}',5)}`)}.`},
 ]},
 {dang:'Công thức lượng giác: tính giá trị, chứng minh đẳng thức', items:[
  {de:`Không dùng máy tính, tính ${m('\\cos 15^\\circ')}.`,
   sol:[`Tách ${m('15^\\circ = 45^\\circ - 30^\\circ')}.`,
     `Công thức cộng: ${m('\\cos(45^\\circ - 30^\\circ) = \\cos 45^\\circ\\cos 30^\\circ + \\sin 45^\\circ\\sin 30^\\circ')}.`,
     `${m(`= ${f('\\sqrt{2}',2)}\\cdot${f('\\sqrt{3}',2)} + ${f('\\sqrt{2}',2)}\\cdot${f(1,2)} = ${f('\\sqrt{6}',4)} + ${f('\\sqrt{2}',4)}`)}.`],
   ans:`${tb(`\\cos 15^\\circ = ${f('\\sqrt{6} + \\sqrt{2}',4)}`)}.`},
  {hard:true, de:`Chứng minh rằng ${m('\\sin 3x = 3\\sin x - 4\\sin^3 x')} với mọi ${m('x')}.`,
   sol:[`Tách ${m('3x = 2x + x')}, công thức cộng: ${m('\\sin 3x = \\sin 2x\\cos x + \\cos 2x\\sin x')}.`,
     `Công thức nhân đôi: ${m('\\sin 2x = 2\\sin x\\cos x')}, ${m('\\cos 2x = 1 - 2\\sin^2 x')}, nên ${m('\\sin 3x = 2\\sin x\\cos^2 x + (1 - 2\\sin^2 x)\\sin x')}.`,
     `Hệ thức cơ bản ${m('\\cos^2 x = 1 - \\sin^2 x')}: ${m('\\sin 3x = 2\\sin x(1 - \\sin^2 x) + \\sin x - 2\\sin^3 x')}.`,
     `Thu gọn: ${m('\\sin 3x = 2\\sin x - 2\\sin^3 x + \\sin x - 2\\sin^3 x = 3\\sin x - 4\\sin^3 x')}.`],
   ans:`Vế trái bằng ${tb('3\\sin x - 4\\sin^3 x')} – đẳng thức được chứng minh.`},
 ]},
 {dang:'Hàm số lượng giác: tập xác định, giá trị lớn nhất – nhỏ nhất', items:[
  {de:`Tìm tập xác định của hàm số ${m('y = \\dfrac{2}{\\cos x - 1}')}.`,
   sol:[`Hàm số xác định khi mẫu khác 0: ${m('\\cos x - 1 \\ne 0 \\Leftrightarrow \\cos x \\ne 1')}.`, `${m('\\cos x = 1 \\Leftrightarrow x = k2\\pi')}.`],
   ans:`${tb('D = \\mathbb{R}\\setminus\\{k2\\pi \\mid k \\in \\mathbb{Z}\\}')}.`},
  {de:`Tìm giá trị lớn nhất và giá trị nhỏ nhất của hàm số ${m('y = 3 - 2\\cos^2 x')}.`,
   sol:[`Vì ${m('0 \\le \\cos^2 x \\le 1')} nên ${m('-2 \\le -2\\cos^2 x \\le 0')} (nhân với số âm thì đổi chiều).`, `Cộng 3: ${m('1 \\le y \\le 3')}.`,
     `${m('y = 3')} khi ${m('\\cos x = 0')}; ${m('y = 1')} khi ${m('\\cos^2 x = 1')}.`],
   ans:`GTLN ${tb('= 3')}, GTNN ${tb('= 1')}.`},
 ]},
 {dang:'Giải phương trình lượng giác, đếm nghiệm trên một đoạn', items:[
  {de:`Giải phương trình ${m('2\\cos\\left(x - \\dfrac{\\pi}{4}\\right) = \\sqrt{2}')}.`,
   sol:[`Chia 2: ${m(`\\cos\\left(x - \\tfrac{\\pi}{4}\\right) = ${f('\\sqrt{2}',2)} = \\cos\\tfrac{\\pi}{4}`)}.`,
     `Công thức nghiệm: ${m('x - \\tfrac{\\pi}{4} = \\tfrac{\\pi}{4} + k2\\pi')} hoặc ${m('x - \\tfrac{\\pi}{4} = -\\tfrac{\\pi}{4} + k2\\pi')}.`,
     `Chuyển vế: ${m('x = \\tfrac{\\pi}{2} + k2\\pi')} hoặc ${m('x = k2\\pi')}.`],
   ans:`${tb('x = \\tfrac{\\pi}{2} + k2\\pi')}; ${tb('x = k2\\pi')} ${m(K)}.`},
  {hard:true, de:`Giải phương trình ${m('\\sin 2x - \\sqrt{3}\\cos x = 0')} và cho biết phương trình có bao nhiêu nghiệm thuộc đoạn ${m('[0;\\ \\pi]')}.`,
   sol:[`Công thức nhân đôi: ${m('2\\sin x\\cos x - \\sqrt{3}\\cos x = 0 \\Leftrightarrow \\cos x(2\\sin x - \\sqrt{3}) = 0')} (đặt nhân tử chung, không chia cho ${m('\\cos x')}).`,
     `${m('\\cos x = 0 \\Leftrightarrow x = \\tfrac{\\pi}{2} + k\\pi')}.`,
     `${m(`\\sin x = ${f('\\sqrt{3}',2)} \\Leftrightarrow x = \\tfrac{\\pi}{3} + k2\\pi`)} hoặc ${m('x = \\tfrac{2\\pi}{3} + k2\\pi')}.`,
     `Trên ${m('[0;\\ \\pi]')}: ${m('\\tfrac{\\pi}{3};\\ \\tfrac{\\pi}{2};\\ \\tfrac{2\\pi}{3}')}.`],
   ans:`${tb('x = \\tfrac{\\pi}{2} + k\\pi')}; ${tb('x = \\tfrac{\\pi}{3} + k2\\pi')}; ${tb('x = \\tfrac{2\\pi}{3} + k2\\pi')} ${m(K)}; có ${tb('3')} nghiệm thuộc ${m('[0;\\ \\pi]')}.`},
 ]},
 {dang:'Bài toán thực tế', items:[
  {de:`Nhiệt độ ngoài trời (°C) ở một thành phố vào thời điểm ${m('t')} giờ trong ngày (${m('0 \\le t \\le 24')}) được cho bởi ${m('T(t) = 25 + 4\\sin\\dfrac{\\pi(t - 9)}{12}')}. Tìm nhiệt độ cao nhất và thấp nhất trong ngày.`,
   sol:[`Vì ${m('-1 \\le \\sin\\dfrac{\\pi(t - 9)}{12} \\le 1')} nên ${m('21 \\le T(t) \\le 29')}.`,
     `Cao nhất khi ${m('\\dfrac{\\pi(t - 9)}{12} = \\dfrac{\\pi}{2} \\Leftrightarrow t = 15')}; thấp nhất khi ${m('\\dfrac{\\pi(t - 9)}{12} = -\\dfrac{\\pi}{2} \\Leftrightarrow t = 3')} (đều thuộc ${m('[0;\\ 24]')}).`],
   ans:`Cao nhất ${tb('29')} °C (lúc 15 giờ), thấp nhất ${tb('21')} °C (lúc 3 giờ).`},
  {hard:true, de:`Độ cao (mét) so với mặt đất của một cabin đu quay sau ${m('t')} phút là ${m('h(t) = 20 - 18\\cos\\dfrac{\\pi t}{10}')}. a) Đu quay quay một vòng hết bao nhiêu phút? b) Sau bao nhiêu phút kể từ lúc bắt đầu thì cabin lên tới độ cao ${m('29')} m lần đầu tiên?`,
   sol:[`a) Một vòng ứng với chu kì của ${m('\\cos\\dfrac{\\pi t}{10}')}: ${m('T = 2\\pi : \\dfrac{\\pi}{10} = 20')} (phút).`,
     `b) ${m('20 - 18\\cos\\dfrac{\\pi t}{10} = 29 \\Leftrightarrow \\cos\\dfrac{\\pi t}{10} = -\\dfrac{1}{2} = \\cos\\dfrac{2\\pi}{3}')}.`,
     `${m('\\dfrac{\\pi t}{10} = \\pm\\dfrac{2\\pi}{3} + k2\\pi \\Leftrightarrow t = \\pm\\dfrac{20}{3} + 20k')}.`,
     `Giá trị dương nhỏ nhất: ${m('t = \\dfrac{20}{3} \\approx 6{,}67')} (phút).`],
   ans:`a) ${tb('20')} phút; b) sau ${tb('\\dfrac{20}{3} \\approx 6{,}67')} phút.`},
 ]},
]);
})();

/* =====================================================================
   PHIẾU LUYỆN TẬP – Toán 11 · Bài 6. Cấp số cộng  (10 bài = 7 cơ bản + 3 vận dụng ★, xếp theo 4 dạng như bài giảng)
   ===================================================================== */
(() => {
const m = tm, f = (a, b) => `\\dfrac{${a}}{${b}}`;
Lecture.addPractice('lop11', 'bai-6', [
 {dang:'Nhận biết cấp số cộng', items:[
  {de:`Dãy số ${m('u_n = 7 - 2n')} có phải cấp số cộng không? Nếu có, tìm ${m('u_1')} và công sai ${m('d')}.`,
   sol:[`Tính hiệu: ${m('u_{n+1} - u_n = [7 - 2(n + 1)] - (7 - 2n) = -2')}.`, `Hiệu là hằng số, không chứa ${m('n')}, nên dãy là cấp số cộng với công sai ${m('d = -2')}.`, `${m('u_1 = 7 - 2\\cdot 1 = 5')}.`],
   ans:`Là cấp số cộng với ${tb('u_1 = 5,\\ d = -2')}.`},
  {de:`Dãy số ${m('u_n = n^2 + 1')} có phải cấp số cộng không? Vì sao?`,
   sol:[`Tính hiệu: ${m('u_{n+1} - u_n = [(n + 1)^2 + 1] - (n^2 + 1) = 2n + 1')}.`, `Hiệu còn chứa ${m('n')} nên không phải hằng số; chẳng hạn ${m('u_2 - u_1 = 3')} còn ${m('u_3 - u_2 = 5')}.`],
   ans:`${tb('Không')} phải cấp số cộng (hiệu hai số hạng liên tiếp thay đổi theo ${m('n')}).`},
 ]},
 {dang:'Tìm số hạng, số hạng tổng quát', items:[
  {de:`Cấp số cộng ${m('(u_n)')} có ${m('u_1 = 3,\\ d = -2')}. Tìm số hạng tổng quát và tính ${m('u_{15}')}.`,
   sol:[`Công thức: ${m('u_n = u_1 + (n - 1)d')}.`, `${m('u_n = 3 + (n - 1)(-2) = 5 - 2n')}.`, `${m('u_{15} = 5 - 2\\cdot 15 = -25')}.`],
   ans:`${tb('u_n = 5 - 2n,\\ u_{15} = -25')}.`},
  {de:`Cấp số cộng ${m('(u_n)')} có ${m('u_4 = 11')} và ${m('u_9 = 31')}. Tìm ${m('u_1,\\ d')} và số hạng tổng quát.`,
   sol:[`Viết theo ${m('u_1')} và ${m('d')}: ${m('\\begin{cases} u_1 + 3d = 11 \\\\ u_1 + 8d = 31 \\end{cases}')}.`, `Trừ vế theo vế: ${m('5d = 20 \\Rightarrow d = 4')}.`, `${m('u_1 = 11 - 3\\cdot 4 = -1')}; ${m('u_n = -1 + (n - 1)\\cdot 4 = 4n - 5')}.`],
   ans:`${tb('u_1 = -1,\\ d = 4,\\ u_n = 4n - 5')}.`},
  {hard:true, de:`Cấp số cộng ${m('(u_n)')} có ${m('u_1 + u_5 = 14')} và ${m('u_2\\cdot u_4 = 45')}. Tìm ${m('u_1')} và công sai ${m('d')}.`,
   sol:[`${m('u_1 + u_5 = 2u_3')} (tính chất cấp số cộng) nên ${m('2u_3 = 14 \\Rightarrow u_3 = 7')}.`, `${m('u_2 = 7 - d,\\ u_4 = 7 + d')} nên ${m('u_2 u_4 = 49 - d^2 = 45 \\Rightarrow d^2 = 4 \\Rightarrow d = \\pm 2')}.`, `${m('d = 2')}: ${m('u_1 = u_3 - 2d = 3')}. &nbsp; ${m('d = -2')}: ${m('u_1 = u_3 - 2d = 11')}.`],
   ans:`${tb('u_1 = 3,\\ d = 2')} hoặc ${tb('u_1 = 11,\\ d = -2')}.`},
 ]},
 {dang:'Tính tổng n số hạng đầu', items:[
  {de:`Tính tổng ${m('S = 2 + 5 + 8 + \\cdots + 101')}.`,
   sol:[`Đây là cấp số cộng ${m('u_1 = 2,\\ d = 3,\\ u_n = 101')}.`, `Số số hạng: ${m('n = \\dfrac{101 - 2}{3} + 1 = 34')}.`, `${m('S = \\dfrac{n(u_1 + u_n)}{2} = \\dfrac{34\\cdot 103}{2} = 17\\cdot 103')}.`],
   ans:`${tb('S = 1\\,751')}.`},
  {de:`Cấp số cộng có ${m('u_1 = -4,\\ d = 3')}. Tính ${m('S_{15}')}.`,
   sol:[`Biết ${m('u_1, d')} nên dùng ${m('S_n = \\dfrac{n\\,[2u_1 + (n - 1)d]}{2}')}.`, `${m('S_{15} = \\dfrac{15\\,[2\\cdot(-4) + 14\\cdot 3]}{2} = \\dfrac{15\\cdot 34}{2}')}.`],
   ans:`${tb('S_{15} = 255')}.`},
  {hard:true, de:`Tổng ${m('n')} số hạng đầu của một cấp số cộng là ${m('S_n = 2n^2 + 3n')}. Tìm ${m('u_1,\\ d')} và số hạng tổng quát.`,
   sol:[`${m('u_1 = S_1 = 2 + 3 = 5')}.`, `${m('u_1 + u_2 = S_2 = 8 + 6 = 14')} nên ${m('u_2 = 9')}, suy ra ${m('d = u_2 - u_1 = 4')}.`, `${m('u_n = 5 + (n - 1)\\cdot 4 = 4n + 1')}.`, `Thử lại: ${m('\\dfrac{n\\,[2\\cdot 5 + (n - 1)\\cdot 4]}{2} = 2n^2 + 3n')} (đúng).`],
   ans:`${tb('u_1 = 5,\\ d = 4,\\ u_n = 4n + 1')}.`},
 ]},
 {dang:'Bài toán thực tế', items:[
  {de:`Một người tập chạy: ngày đầu chạy ${m('2')} km, mỗi ngày sau chạy thêm ${m('0{,}5')} km so với ngày trước. Hỏi ngày thứ ${m('10')} chạy bao nhiêu km và cả ${m('10')} ngày chạy tổng cộng bao nhiêu km?`,
   sol:[`Quãng đường mỗi ngày lập cấp số cộng ${m('u_1 = 2,\\ d = 0{,}5,\\ n = 10')}.`, `${m('u_{10} = 2 + 9\\cdot 0{,}5 = 6{,}5')} (km).`, `${m('S_{10} = \\dfrac{10\\,(2 + 6{,}5)}{2} = 42{,}5')} (km).`],
   ans:`Ngày thứ 10 chạy ${tb('6{,}5')} km; tổng cộng ${tb('42{,}5')} km.`},
  {hard:true, de:`Một nhân viên được thưởng: tháng đầu ${m('4')} triệu đồng, mỗi tháng sau hơn tháng trước ${m('0{,}3')} triệu đồng. Sau ít nhất bao nhiêu tháng thì tổng tiền thưởng nhận được đạt từ ${m('60')} triệu đồng trở lên?`,
   sol:[`Tiền thưởng các tháng lập cấp số cộng ${m('u_1 = 4,\\ d = 0{,}3')}; tổng ${m('S_n = \\dfrac{n\\,[8 + 0{,}3(n - 1)]}{2}')}.`, `Yêu cầu ${m('S_n \\ge 60 \\Leftrightarrow 0{,}3n^2 + 7{,}7n - 120 \\ge 0')}, tức ${m('3n^2 + 77n - 1\\,200 \\ge 0')}.`, `Giải bất phương trình (hoặc thử): ${m('S_{10} = \\dfrac{10\\,(8 + 2{,}7)}{2} = 53{,}5 \\lt 60')}, còn ${m('S_{11} = \\dfrac{11\\,(8 + 3)}{2} = 60{,}5 \\ge 60')}.`],
   ans:`Sau ít nhất ${tb('11')} tháng.`},
 ]},
]);
})();

/* =====================================================================
   PHIẾU LUYỆN TẬP – Toán 11 · Bài 5. Dãy số  (10 bài = 7 cơ bản + 3 vận dụng ★, xếp theo 4 dạng như bài giảng)
   ===================================================================== */
(() => {
const m = tm;
Lecture.addPractice('lop11', 'bai-5', [
 {dang:'Tính các số hạng của dãy số', items:[
  {de:`Cho dãy số ${m('u_n = n^2 + 2n')}. Tính ${m('u_3')}, ${m('u_{10}')} và cho biết số ${m('143')} là số hạng thứ mấy của dãy.`,
   sol:[`Thay ${m('n = 3')} và ${m('n = 10')} vào công thức: ${m('u_3 = 3^2 + 2\\cdot 3 = 15')}; ${m('u_{10} = 10^2 + 2\\cdot 10 = 120')}.`, `${m('u_n = 143')} nên ${m('n^2 + 2n - 143 = 0')}, tức ${m('(n - 11)(n + 13) = 0')}.`, `Vì ${m('n \\in \\mathbb{N}^*')} nên loại ${m('n = -13')}, chọn ${m('n = 11')}.`],
   ans:`${tb('u_3 = 15,\\ u_{10} = 120')}; số ${m('143')} là số hạng thứ ${tb('11')}.`},
  {de:`Cho dãy số ${m('(u_n)')} xác định bởi ${m('u_1 = 1')} và ${m('u_{n+1} = 2u_n + 3')} với mọi ${m('n \\ge 1')}. Tính năm số hạng đầu của dãy.`,
   sol:[`Dãy cho bằng hệ thức truy hồi nên tính lần lượt từng số hạng, ${m('u_1 = 1')}.`, `${m('u_2 = 2\\cdot 1 + 3 = 5')}; &nbsp; ${m('u_3 = 2\\cdot 5 + 3 = 13')}.`, `${m('u_4 = 2\\cdot 13 + 3 = 29')}; &nbsp; ${m('u_5 = 2\\cdot 29 + 3 = 61')}.`],
   ans:`${tb('1;\\ 5;\\ 13;\\ 29;\\ 61')}.`},
 ]},
 {dang:'Dự đoán số hạng tổng quát', items:[
  {de:`Dự đoán số hạng tổng quát của dãy số ${m('2,\\ 5,\\ 10,\\ 17,\\ 26,\\ \\ldots')}`,
   sol:[`Viết kèm chỉ số: ${m('u_1 = 2,\\ u_2 = 5,\\ u_3 = 10,\\ u_4 = 17,\\ u_5 = 26')}.`, `Mỗi số hạng lớn hơn một bình phương đúng một đơn vị: ${m('2 = 1^2 + 1,\\ 5 = 2^2 + 1,\\ 10 = 3^2 + 1,\\ 17 = 4^2 + 1')}.`, `Thử lại: ${m('u_5 = 5^2 + 1 = 26')} (đúng).`],
   ans:`${tb('u_n = n^2 + 1')}.`},
  {de:`Dự đoán số hạng tổng quát của dãy số ${m('\\dfrac{1}{2},\\ \\dfrac{2}{5},\\ \\dfrac{3}{8},\\ \\dfrac{4}{11},\\ \\ldots')}`,
   sol:[`Tử số của các số hạng là ${m('1, 2, 3, 4')}, tức là ${m('n')}.`, `Mẫu số ${m('2, 5, 8, 11')} tăng đều mỗi lần ${m('3')} đơn vị, bắt đầu từ ${m('2')}, nên mẫu là ${m('2 + 3(n - 1) = 3n - 1')}.`, `Thử lại: ${m('u_4 = \\dfrac{4}{3\\cdot 4 - 1} = \\dfrac{4}{11}')} (đúng).`],
   ans:`${tb('u_n = \\dfrac{n}{3n - 1}')}.`},
  {hard:true, de:`Cho dãy số ${m('u_1 = 3,\\ u_{n+1} = 2u_n - 1')}. Tính bốn số hạng đầu tiếp theo, dự đoán số hạng tổng quát ${m('u_n')} rồi kiểm tra lại bằng hệ thức truy hồi.`,
   sol:[`${m('u_2 = 2\\cdot 3 - 1 = 5')}; ${m('u_3 = 2\\cdot 5 - 1 = 9')}; ${m('u_4 = 2\\cdot 9 - 1 = 17')}; ${m('u_5 = 2\\cdot 17 - 1 = 33')}.`, `Bớt mỗi số hạng đi ${m('1')}: ${m('2, 4, 8, 16, 32')} chính là ${m('2^1, 2^2, 2^3, 2^4, 2^5')}. Dự đoán ${m('u_n = 2^n + 1')}.`, `Kiểm tra: ${m('u_1 = 2^1 + 1 = 3')} (đúng). Nếu ${m('u_n = 2^n + 1')} thì ${m('2u_n - 1 = 2(2^n + 1) - 1 = 2^{n+1} + 1 = u_{n+1}')}, khớp hệ thức truy hồi.`],
   ans:`Bốn số hạng tiếp theo: ${tb('5;\\ 9;\\ 17;\\ 33')}; số hạng tổng quát ${tb('u_n = 2^n + 1')}.`},
 ]},
 {dang:'Xét tính tăng, giảm của dãy số', items:[
  {de:`Xét tính tăng, giảm của dãy số ${m('u_n = 5 - 3n')}.`,
   sol:[`Tính hiệu: ${m('u_{n+1} - u_n = [5 - 3(n + 1)] - (5 - 3n) = -3')}.`, `${m('-3 \\lt 0')} với mọi ${m('n \\in \\mathbb{N}^*')}, tức ${m('u_{n+1} \\lt u_n')}.`],
   ans:`Dãy số ${tb('giảm')}.`},
  {de:`Xét tính tăng, giảm của dãy số ${m('u_n = \\dfrac{2n + 1}{n + 1}')}.`,
   sol:[`Tách phần nguyên: ${m('u_n = \\dfrac{2(n + 1) - 1}{n + 1} = 2 - \\dfrac{1}{n + 1}')}.`, `${m('u_{n+1} - u_n = \\dfrac{1}{n + 1} - \\dfrac{1}{n + 2} = \\dfrac{1}{(n + 1)(n + 2)}')}.`, `Hiệu này ${m('\\gt 0')} với mọi ${m('n \\in \\mathbb{N}^*')}.`],
   ans:`Dãy số ${tb('tăng')}.`},
  {hard:true, de:`Xét tính tăng, giảm của dãy số ${m('u_n = n^2 - 4n')}.`,
   sol:[`Tính hiệu: ${m('u_{n+1} - u_n = [(n + 1)^2 - 4(n + 1)] - (n^2 - 4n) = 2n - 3')}.`, `Với ${m('n = 1')}: hiệu bằng ${m('-1 \\lt 0')}, tức ${m('u_2 = -4 \\lt u_1 = -3')}.`, `Với ${m('n = 2')}: hiệu bằng ${m('1 \\gt 0')}, tức ${m('u_3 = -3 \\gt u_2 = -4')}.`, `Hiệu đổi dấu nên dãy không luôn tăng và không luôn giảm.`],
   ans:`Dãy số ${tb('không tăng, không giảm')}.`},
 ]},
 {dang:'Xét tính bị chặn của dãy số', items:[
  {de:`Chứng minh dãy số ${m('u_n = \\dfrac{3n + 1}{n + 2}')} bị chặn.`,
   sol:[`Tách phần nguyên: ${m('u_n = \\dfrac{3(n + 2) - 5}{n + 2} = 3 - \\dfrac{5}{n + 2}')}.`, `Vì ${m('\\dfrac{5}{n + 2} \\gt 0')} nên ${m('u_n \\lt 3')}: dãy bị chặn trên.`, `${m('u_{n+1} - u_n = \\dfrac{5}{n + 2} - \\dfrac{5}{n + 3} = \\dfrac{5}{(n + 2)(n + 3)} \\gt 0')} nên dãy tăng, suy ra ${m('u_n \\ge u_1 = \\dfrac{4}{3}')}: dãy bị chặn dưới.`],
   ans:`${tb('\\dfrac{4}{3} \\le u_n \\lt 3')} với mọi ${m('n')}: dãy số bị chặn.`},
  {hard:true, de:`Chứng minh dãy số ${m('u_n = \\dfrac{n}{n^2 + 1}')} bị chặn.`,
   sol:[`Vì ${m('n \\gt 0')} và ${m('n^2 + 1 \\gt 0')} nên ${m('u_n \\gt 0')}: dãy bị chặn dưới bởi ${m('0')}.`, `Có ${m('(n - 1)^2 \\ge 0 \\Rightarrow n^2 + 1 \\ge 2n')}.`, `Chia hai vế cho ${m('2(n^2 + 1) \\gt 0')}: ${m('u_n = \\dfrac{n}{n^2 + 1} \\le \\dfrac{1}{2}')}, dấu bằng khi ${m('n = 1')}.`],
   ans:`${tb('0 \\lt u_n \\le \\dfrac{1}{2}')}: dãy số bị chặn.`},
 ]},
]);
})();

/* =====================================================================
   PHIẾU LUYỆN TẬP – Toán 11 · Bài 7. Cấp số nhân  (10 bài = 7 cơ bản + 3 vận dụng ★, xếp theo 4 dạng như bài giảng)
   ===================================================================== */
(() => {
const m = tm;
Lecture.addPractice('lop11', 'bai-7', [
 {dang:'Nhận biết cấp số nhân', items:[
  {de:`Dãy số ${m('u_n = 5\\cdot(-2)^n')} có phải cấp số nhân không? Nếu có, tìm ${m('u_1')} và công bội ${m('q')}.`,
   sol:[`Tính thương: ${m('\\dfrac{u_{n+1}}{u_n} = \\dfrac{5\\cdot(-2)^{n+1}}{5\\cdot(-2)^n} = -2')}.`, `Thương là hằng số, không chứa ${m('n')}, nên dãy là cấp số nhân với công bội ${m('q = -2')}.`, `${m('u_1 = 5\\cdot(-2) = -10')}.`],
   ans:`Là cấp số nhân với ${tb('u_1 = -10,\\ q = -2')}.`},
  {de:`Dãy số ${m('u_n = 2^n + 1')} có phải cấp số nhân không? Vì sao?`,
   sol:[`Tính ba số hạng đầu: ${m('u_1 = 3,\\ u_2 = 5,\\ u_3 = 9')}.`, `${m('\\dfrac{u_2}{u_1} = \\dfrac{5}{3}')} còn ${m('\\dfrac{u_3}{u_2} = \\dfrac{9}{5}')}; hai thương khác nhau.`],
   ans:`${tb('Không')} phải cấp số nhân (thương hai số hạng liên tiếp thay đổi).`},
 ]},
 {dang:'Tìm số hạng, số hạng tổng quát', items:[
  {de:`Cấp số nhân ${m('(u_n)')} có ${m('u_1 = 3,\\ q = -2')}. Tìm số hạng tổng quát và tính ${m('u_6')}.`,
   sol:[`Công thức: ${m('u_n = u_1\\cdot q^{n-1}')}.`, `${m('u_n = 3\\cdot(-2)^{n-1}')}.`, `${m('u_6 = 3\\cdot(-2)^5 = 3\\cdot(-32)')}.`],
   ans:`${tb('u_n = 3\\cdot(-2)^{n-1},\\ u_6 = -96')}.`},
  {de:`Cấp số nhân ${m('(u_n)')} có ${m('u_2 = -6')} và ${m('u_5 = 162')}. Tìm ${m('u_1,\\ q')} và số hạng tổng quát.`,
   sol:[`Viết theo ${m('u_1')} và ${m('q')}: ${m('\\begin{cases} u_1 q = -6 \\\\ u_1 q^4 = 162 \\end{cases}')}.`, `Chia vế theo vế: ${m('q^3 = \\dfrac{162}{-6} = -27 \\Rightarrow q = -3')}.`, `${m('u_1 = \\dfrac{-6}{-3} = 2')}; ${m('u_n = 2\\cdot(-3)^{n-1}')}.`],
   ans:`${tb('u_1 = 2,\\ q = -3,\\ u_n = 2\\cdot(-3)^{n-1}')}.`},
  {hard:true, de:`Cấp số nhân ${m('(u_n)')} có các số hạng dương, ${m('u_1 + u_3 = 10')} và ${m('u_2 + u_4 = 20')}. Tìm ${m('u_1')}, công bội ${m('q')} và số hạng tổng quát.`,
   sol:[`${m('u_1 + u_3 = u_1(1 + q^2) = 10')} và ${m('u_2 + u_4 = u_1 q\\,(1 + q^2) = 20')}.`, `Chia vế theo vế (${m('1 + q^2 \\ne 0')}): ${m('q = \\dfrac{20}{10} = 2')}.`, `${m('u_1(1 + 4) = 10 \\Rightarrow u_1 = 2')}; ${m('u_n = 2\\cdot 2^{n-1} = 2^n')}.`, `Thử lại: ${m('u_1 + u_3 = 2 + 8 = 10')}, ${m('u_2 + u_4 = 4 + 16 = 20')} (đúng).`],
   ans:`${tb('u_1 = 2,\\ q = 2,\\ u_n = 2^n')}.`},
 ]},
 {dang:'Tính tổng n số hạng đầu', items:[
  {de:`Tính tổng ${m('S = 3 + 6 + 12 + \\cdots + 768')}.`,
   sol:[`Đây là cấp số nhân ${m('u_1 = 3,\\ q = 2,\\ u_n = 768')}.`, `${m('768 = 3\\cdot 2^8')} nên ${m('n - 1 = 8')}, tức ${m('n = 9')} số hạng.`, `${m('S = \\dfrac{u_1(1 - q^n)}{1 - q} = \\dfrac{3(1 - 2^9)}{1 - 2} = 3\\cdot 511')}.`],
   ans:`${tb('S = 1\\,533')}.`},
  {de:`Cấp số nhân có ${m('u_1 = 81,\\ q = \\dfrac{1}{3}')}. Tính ${m('S_5')}.`,
   sol:[`Áp dụng ${m('S_n = \\dfrac{u_1(1 - q^n)}{1 - q}')} với ${m('n = 5')}.`, `${m('q^5 = \\dfrac{1}{243}')} nên ${m('S_5 = \\dfrac{81\\left(1 - \\dfrac{1}{243}\\right)}{1 - \\dfrac{1}{3}} = \\dfrac{\\dfrac{242}{3}}{\\dfrac{2}{3}} = 121')}.`, `Kiểm tra: ${m('81 + 27 + 9 + 3 + 1 = 121')}.`],
   ans:`${tb('S_5 = 121')}.`},
  {hard:true, de:`Cấp số nhân có ${m('u_1 = 1')} và công bội ${m('q = 2')}. Tìm số nguyên dương ${m('n')} nhỏ nhất để ${m('S_n \\gt 1\\,000')}.`,
   sol:[`${m('S_n = \\dfrac{1\\cdot(1 - 2^n)}{1 - 2} = 2^n - 1')}.`, `${m('S_n \\gt 1\\,000 \\Leftrightarrow 2^n \\gt 1\\,001')}.`, `Thử: ${m('2^9 = 512 \\lt 1\\,001')} còn ${m('2^{10} = 1\\,024 \\gt 1\\,001')}; vì ${m('2^n')} tăng nên ${m('n = 10')} là số nhỏ nhất.`],
   ans:`${tb('n = 10')}.`},
 ]},
 {dang:'Bài toán thực tế', items:[
  {de:`Một quả bóng được thả từ độ cao ${m('8')} m. Mỗi lần chạm đất, bóng nảy lên đến ${m('\\dfrac{3}{4}')} độ cao của lần rơi trước. Tính độ cao bóng nảy lên sau lần chạm đất thứ ${m('4')}.`,
   sol:[`Độ cao sau mỗi lần nảy lập cấp số nhân với ${m('u_0 = 8')}, công bội ${m('q = \\dfrac{3}{4}')}.`, `Sau lần thứ ${m('4')}: ${m('8\\cdot\\left(\\dfrac{3}{4}\\right)^4 = 8\\cdot\\dfrac{81}{256} = \\dfrac{81}{32}')}.`],
   ans:`${tb('\\dfrac{81}{32} \\approx 2{,}53')} m.`},
  {hard:true, de:`Một mẫu có ${m('500')} vi khuẩn; cứ mỗi giờ số vi khuẩn tăng gấp đôi. Sau ít nhất bao nhiêu giờ thì số vi khuẩn vượt ${m('100\\,000')}?`,
   sol:[`Số vi khuẩn sau ${m('n')} giờ: ${m('500\\cdot 2^n')} (cấp số nhân công bội ${m('2')}).`, `Yêu cầu ${m('500\\cdot 2^n \\gt 100\\,000 \\Leftrightarrow 2^n \\gt 200')}.`, `Thử: ${m('2^7 = 128 \\lt 200')} (${m('64\\,000')} vi khuẩn), còn ${m('2^8 = 256 \\gt 200')} (${m('128\\,000')} vi khuẩn).`],
   ans:`Sau ít nhất ${tb('8')} giờ.`},
 ]},
]);
})();

/* =====================================================================
   BÀI 8. MẪU SỐ LIỆU GHÉP NHÓM (thầy yêu cầu 14/10/2026) – 7 cơ bản + 3 vận dụng (★), xếp theo 5 dạng của bài giảng bai-8.
   ===================================================================== */
(() => {
const m = tm, gr = (a, b) => m(`[${a};\\,${b})`);
const HA = histSVG([40, 50, 60, 70, 80, 90], [2, 6, 10, 8, 4], 2, {unit:'điểm'});
const HB = histSVG([0, 5, 10, 15, 20], [4, 10, 12, 8], 2, {unit:'phút'});
const T = (heads, vals) => `<table class="lk-table"><tr><th>Nhóm</th>${heads.map(h => `<th>${h}</th>`).join('')}</tr><tr><td>Tần số</td>${vals.map(v => `<td>${v}</td>`).join('')}</tr></table>`;
Lecture.addPractice('lop11', 'bai-8', [
 {dang:'Xác định nhóm và độ dài nhóm', items:[
  {de:`Cho nhóm số liệu ${gr(30, 50)}. Tìm độ dài của nhóm và cho biết số ${m('50')} có thuộc nhóm này không.`,
   sol:[`Độ dài nhóm bằng đầu mút phải trừ đầu mút trái: ${m('50 - 30 = 20')}.`, `Nhóm ${m('[a;\\,b)')} không chứa ${m('b')} nên ${m('50 \\notin [30;\\,50)')}.`],
   ans:`Độ dài ${tb('20')}; số ${m('50')} <b>không</b> thuộc nhóm.`},
  {de:`Các nhóm liên tiếp ${gr(0, 10)}, ${gr(10, 20)}, ${gr(20, 30)}, ${gr(30, 40)}, ${gr(40, 50)}. Số liệu ${m('x = 30')} thuộc nhóm nào?`,
   sol:[`Xét ${m('a \\le x \\lt b')}: ${m('20 \\le 30 \\lt 30')} sai; ${m('30 \\le 30 \\lt 40')} đúng.`, `Số liệu bằng đầu mút chung thì thuộc nhóm bên phải.`],
   ans:`${tb('x \\in [30;\\,40)')}.`},
 ]},
 {dang:'Chia nhóm số liệu', items:[
  {de:`Mẫu số liệu có giá trị nhỏ nhất ${m('8')}, lớn nhất ${m('53')}. Chia thành các nhóm độ dài ${m('10')}, nhóm đầu bắt đầu từ ${m('8')}. Cần bao nhiêu nhóm? Viết các nhóm.`,
   sol:[`${m('53 - 8 = 45')}; ${m('45:10 = 4{,}5')}, làm tròn lên được ${m('5')} nhóm.`, `Các nhóm: ${gr(8, 18)}, ${gr(18, 28)}, ${gr(28, 38)}, ${gr(38, 48)}, ${gr(48, 58)}.`],
   ans:`${tb('5')} nhóm; ${m('53 \\in [48;\\,58)')}.`},
  {hard:true, de:`Mẫu số liệu có giá trị nhỏ nhất ${m('5')}, lớn nhất ${m('45')}. Chia thành các nhóm độ dài ${m('10')}, nhóm đầu bắt đầu từ ${m('5')}, mỗi nhóm dạng ${m('[a;\\,b)')}. Cần ít nhất bao nhiêu nhóm để chứa mọi số liệu? Vì sao không phải ${m('4')}?`,
   sol:[`${m('45 - 5 = 40')} chia hết cho ${m('10')}, nhưng ${m('4')} nhóm chỉ phủ đến ${gr(35, 45)}, mà nhóm này <b>không chứa</b> ${m('45')}.`, `Nhóm thứ 5 là ${gr(45, 55)} chứa ${m('45')}.`],
   ans:`Cần ít nhất ${tb('5')} nhóm.`},
 ]},
 {dang:'Lập bảng tần số ghép nhóm', items:[
  {de:`Điểm kiểm tra của 12 học sinh: ${m('4;\\ 5;\\ 6;\\ 6;\\ 7;\\ 7;\\ 7;\\ 8;\\ 8;\\ 9;\\ 9;\\ 10')}. Ghép nhóm ${gr(4, 6)}, ${gr(6, 8)}, ${gr(8, 10)}, ${gr(10, 12)}. Lập bảng tần số và cho biết nhóm có tần số lớn nhất.`,
   sol:[`${gr(4, 6)}: 4; 5 → 2. &nbsp; ${gr(6, 8)}: 6; 6; 7; 7; 7 → 5.`, `${gr(8, 10)}: 8; 8; 9; 9 → 4. &nbsp; ${gr(10, 12)}: 10 → 1 (10 thuộc nhóm bên phải).`, `Kiểm tra: ${m('2 + 5 + 4 + 1 = 12')}.`],
   ans:`Tần số ${tb('2,\\ 5,\\ 4,\\ 1')}; lớn nhất ở nhóm ${tb('[6;\\,8)')}.`},
  {hard:true, de:`Thời gian đi từ nhà đến trường (phút) của 20 học sinh: ${m('12;\\ 15;\\ 15;\\ 18;\\ 20;\\ 20;\\ 22;\\ 25;\\ 25;\\ 25;\\ 28;\\ 30;\\ 30;\\ 32;\\ 35;\\ 35;\\ 38;\\ 40;\\ 40;\\ 45')}. Ghép nhóm ${gr(10, 20)}, ${gr(20, 30)}, ${gr(30, 40)}, ${gr(40, 50)}. Lập bảng tần số; tính tỉ lệ phần trăm học sinh đi từ 30 phút trở lên.`,
   sol:[`${gr(10, 20)}: 12; 15; 15; 18 → 4. &nbsp; ${gr(20, 30)}: 20; 20; 22; 25; 25; 25; 28 → 7.`, `${gr(30, 40)}: 30; 30; 32; 35; 35; 38 → 6. &nbsp; ${gr(40, 50)}: 40; 40; 45 → 3.`, `Kiểm tra: ${m('4 + 7 + 6 + 3 = 20')}.`, `Từ 30 phút trở lên: ${m('6 + 3 = 9')} em, ${m('\\dfrac{9}{20}\\cdot 100\\% = 45\\%')}.`],
   ans:`Tần số ${tb('4,\\ 7,\\ 6,\\ 3')}; tỉ lệ ${tb('45\\%')}.`},
 ]},
 {dang:'Đọc biểu đồ cột', items:[
  {de:`Biểu đồ cột cho điểm kiểm tra của học sinh một lớp. Có bao nhiêu học sinh được kiểm tra? Bao nhiêu em có điểm từ 60 đến dưới 80?`, fig:HA,
   sol:[`Các cột: ${m('2,\\ 6,\\ 10,\\ 8,\\ 4')}; ${m('n = 2 + 6 + 10 + 8 + 4 = 30')}.`, `Từ 60 đến dưới 80 gồm hai nhóm ${gr(60, 70)} và ${gr(70, 80)}: ${m('10 + 8 = 18')}.`],
   ans:`${tb('30')} học sinh; ${tb('18')} học sinh.`},
  {hard:true, de:`Biểu đồ cột cho thời gian luyện tập (phút) của các thành viên một câu lạc bộ, nhưng cột của nhóm ${gr(20, 25)} đã bị mờ. Biết có tất cả ${m('40')} thành viên. Tìm tần số nhóm ${gr(20, 25)} và tỉ lệ phần trăm thành viên luyện tập <b>dưới 10 phút</b>.`, fig:HB,
   sol:[`Bốn cột còn lại: ${m('4,\\ 10,\\ 12,\\ 8')}, tổng ${m('34')}.`, `Tần số nhóm ${gr(20, 25)}: ${m('40 - 34 = 6')}.`, `Dưới 10 phút gồm ${gr(0, 5)} và ${gr(5, 10)}: ${m('4 + 10 = 14')} em, ${m('\\dfrac{14}{40}\\cdot 100\\% = 35\\%')}.`],
   ans:`Tần số ${tb('6')}; tỉ lệ ${tb('35\\%')}.`},
 ]},
 {dang:'Tần số tương đối và tần số tích luỹ', items:[
  {de:`Bảng tần số ghép nhóm số quả bóng rổ ném trúng của 25 bạn:<br>${T([gr(0, 5), gr(5, 10), gr(10, 15), gr(15, 20), gr(20, 25)], [3, 6, 8, 5, 3])}Tính tần số tương đối của nhóm ${gr(10, 15)} và tần số tích luỹ của nhóm này.`,
   sol:[`Cỡ mẫu ${m('3 + 6 + 8 + 5 + 3 = 25')}.`, `Tần số tương đối: ${m('\\dfrac{8}{25}\\cdot 100\\% = 32\\%')}.`, `Tần số tích luỹ: ${m('3 + 6 + 8 = 17')} (số bạn ném trúng dưới 15 quả).`],
   ans:`${tb('32\\%')}; ${tb('17')}.`},
  {de:`Bảng tần số ghép nhóm có một ô bị mờ:<br>${T([gr(0, 10), gr(10, 20), gr(20, 30), gr(30, 40)], ['<b>x</b>', 12, 8, 4])}Biết nhóm ${gr(20, 30)} có tần số tương đối ${m('25\\%')}. Tìm ${m('x')}.`,
   sol:[`${m('\\dfrac{8}{n} = 25\\%')} nên ${m('n = 32')}.`, `${m('x = 32 - (12 + 8 + 4) = 8')}.`],
   ans:`${tb('x = 8')}.`},
 ]},
]);
})();

/* =====================================================================
   BÀI 9. CÁC SỐ ĐẶC TRƯNG ĐO XU THẾ TRUNG TÂM (thầy yêu cầu 16/10/2026) – 7 cơ bản + 3 vận dụng (★), xếp theo 5 dạng của bài giảng bai-9.
   ===================================================================== */
(() => {
const m = tm, gr = (a, b) => m(`[${a};\\,${b})`);
const T = (heads, vals) => `<table class="lk-table"><tr><th>Nhóm</th>${heads.map(h => `<th>${h}</th>`).join('')}</tr><tr><td>Tần số</td>${vals.map(v => `<td>${v}</td>`).join('')}</tr></table>`;
Lecture.addPractice('lop11', 'bai-9', [
 {dang:'Số trung bình cộng', items:[
  {de:`Số bài tập làm được trong tuần của 20 học sinh:<br>${T([gr(0, 10), gr(10, 20), gr(20, 30)], [4, 6, 10])}Tính số trung bình cộng.`,
   sol:[`Giá trị đại diện của các nhóm: ${m('5;\\ 15;\\ 25')}.`, `${m('\\bar{x} = \\dfrac{4\\cdot 5 + 6\\cdot 15 + 10\\cdot 25}{20} = \\dfrac{360}{20} = 18')}.`],
   ans:`${tb('\\bar{x} = 18')}.`},
  {hard:true, de:`Bảng tần số ghép nhóm: ${gr(0, 10)} có ${m('x')} số liệu; ${gr(10, 20)}: 6; ${gr(20, 30)}: 4. Biết số trung bình cộng bằng ${m('12')}. Tìm ${m('x')}.`,
   sol:[`Giá trị đại diện ${m('5;\\ 15;\\ 25')}; cỡ mẫu ${m('n = x + 10')}.`, `${m('\\bar{x} = \\dfrac{5x + 15\\cdot 6 + 25\\cdot 4}{x + 10} = \\dfrac{5x + 190}{x + 10} = 12')}.`, `${m('5x + 190 = 12x + 120 \\Rightarrow 7x = 70')}.`],
   ans:`${tb('x = 10')}.`},
 ]},
 {dang:'Trung vị', items:[
  {de:`Điểm kiểm tra của 20 học sinh:<br>${T([gr(50, 60), gr(60, 70), gr(70, 80), gr(80, 90)], [4, 8, 6, 2])}Tính trung vị.`,
   sol:[`${m('\\dfrac{n}{2} = 10')}. Tần số tích luỹ: ${m('4;\\ 12;\\ 18;\\ 20')}.`, `Nhóm đầu tiên có tần số tích luỹ ${m('\\ge 10')} là ${gr(60, 70)}: ${m('u_m = 60,\\ n_m = 8,\\ C = 4,\\ h = 10')}.`, `${m('M_e = 60 + \\dfrac{10 - 4}{8}\\cdot 10 = 67{,}5')}.`],
   ans:`${tb('M_e = 67{,}5')}.`},
  {de:`Tần số tương đối của các nhóm số tiền tiêu vặt (nghìn đồng):<br>${T([gr(0, 10), gr(10, 20), gr(20, 30), gr(30, 40)], ['10%', '30%', '40%', '20%'])}Tính trung vị.`,
   sol:[`Tần số tương đối tích luỹ: ${m('10\\%;\\ 40\\%;\\ 80\\%;\\ 100\\%')}.`, `Mốc ${m('50\\%')} nằm ở nhóm ${gr(20, 30)}: phần trăm các nhóm trước là ${m('40')}, của nhóm là ${m('40')}.`, `${m('M_e = 20 + \\dfrac{50 - 40}{40}\\cdot 10 = 22{,}5')}.`],
   ans:`${tb('M_e = 22{,}5')}.`},
 ]},
 {dang:'Tứ phân vị', items:[
  {de:`Với bảng điểm 20 học sinh ở dạng 2 (${gr(50, 60)}: 4; ${gr(60, 70)}: 8; ${gr(70, 80)}: 6; ${gr(80, 90)}: 2), tính ${m('Q_1')} và ${m('Q_3')}.`,
   sol:[`${m('Q_1')}: ${m('\\dfrac{n}{4} = 5')}, nhóm ${gr(60, 70)} (tần số tích luỹ nhóm trước 4): ${m('Q_1 = 60 + \\dfrac{5 - 4}{8}\\cdot 10 = 61{,}25')}.`, `${m('Q_3')}: ${m('\\dfrac{3n}{4} = 15')}, tần số tích luỹ ${m('4;\\ 12;\\ 18')} nên nhóm ${gr(70, 80)} (nhóm trước có 12): ${m('Q_3 = 70 + \\dfrac{15 - 12}{6}\\cdot 10 = 75')}.`],
   ans:`${tb('Q_1 = 61{,}25')}; ${tb('Q_3 = 75')}.`},
 ]},
 {dang:'Mốt', items:[
  {de:`Thời gian làm bài (phút) của 30 học sinh:<br>${T([gr(20, 30), gr(30, 40), gr(40, 50), gr(50, 60)], [6, 12, 8, 4])}Tính mốt.`,
   sol:[`Nhóm có tần số lớn nhất: ${gr(30, 40)} (12); nhóm trước 6, nhóm sau 8, ${m('h = 10')}.`, `${m('M_o = 30 + \\dfrac{12 - 6}{(12 - 6) + (12 - 8)}\\cdot 10 = 36')}.`],
   ans:`${tb('M_o = 36')}.`},
  {hard:true, de:`Bảng tần số: ${gr(0, 10)}: 12; ${gr(10, 20)}: 8; ${gr(20, 30)}: 6; ${gr(30, 40)}: 4. Tính mốt. Vì sao không có “nhóm trước”?`,
   sol:[`Tần số lớn nhất ${m('12')} ở nhóm đầu ${gr(0, 10)}, nên coi tần số nhóm trước bằng ${m('0')}.`, `${m('M_o = 0 + \\dfrac{12 - 0}{(12 - 0) + (12 - 8)}\\cdot 10 = \\dfrac{12}{16}\\cdot 10 = 7{,}5')}.`],
   ans:`${tb('M_o = 7{,}5')}.`},
 ]},
 {dang:'Chọn số đặc trưng và bài toán thực tế', items:[
  {de:`Cửa hàng đồ thể thao muốn nhập nhiều nhất loại áo có cỡ được mua nhiều nhất; nhà trường muốn tìm mốc điểm ngăn 25% học sinh có điểm cao nhất. Mỗi trường hợp nên dùng số đặc trưng nào?`,
   sol:[`Cỡ được mua nhiều nhất = giá trị xuất hiện nhiều nhất: <b>mốt</b>.`, `Mốc ngăn 25% số liệu lớn nhất: <b>tứ phân vị thứ ba ${m('Q_3')}</b> (75% số liệu nhỏ hơn hoặc bằng nó).`],
   ans:`${tb('Mốt')}; ${tb('Q_3')}.`},
  {de:`Chiều cao (cm) của 20 học sinh:<br>${T([gr(150, 160), gr(160, 170), gr(170, 180), gr(180, 190)], [4, 10, 4, 2])}Tính số trung bình cộng và trung vị, rồi cho biết số nào lớn hơn.`,
   sol:[`Giá trị đại diện ${m('155;\\ 165;\\ 175;\\ 185')}: ${m('\\bar{x} = \\dfrac{4\\cdot 155 + 10\\cdot 165 + 4\\cdot 175 + 2\\cdot 185}{20} = \\dfrac{3340}{20} = 167')}.`, `${m('\\dfrac{n}{2} = 10')}; tần số tích luỹ ${m('4;\\ 14')} nên nhóm ${gr(160, 170)}: ${m('M_e = 160 + \\dfrac{10 - 4}{10}\\cdot 10 = 166')}.`, `Số liệu lệch về phía cao nên số trung bình lớn hơn trung vị.`],
   ans:`${tb('\\bar{x} = 167')}; ${tb('M_e = 166')}; số trung bình lớn hơn.`},
  {hard:true, de:`Bảng tần số ghép nhóm: ${gr(0, 10)}: 4; ${gr(10, 20)}: 8; ${gr(20, 30)}: 6; ${gr(30, 40)}: ${m('x')}. Biết trung vị bằng ${m('17{,}5')}. Tìm ${m('x')}.`,
   sol:[`${m('17{,}5 \\in [10;\\,20)')}: ${m('C = 4,\\ n_m = 8,\\ h = 10')}.`, `${m('17{,}5 = 10 + \\dfrac{n/2 - 4}{8}\\cdot 10 \\Rightarrow \\dfrac{n}{2} - 4 = 6 \\Rightarrow n = 20')}.`, `${m('n = 4 + 8 + 6 + x = 18 + x')} nên ${m('x = 2')}.`],
   ans:`${tb('x = 2')}.`},
 ]},
]);

/* =====================================================================  ÔN TẬP CHƯƠNG II
   5 dạng: nhận biết · tìm yếu tố từ dữ kiện · tính tổng · ba số liên tiếp · bài toán thực tế. 7 cơ bản + 3 ★ */
Lecture.addPractice('lop11', 'on-tap-c2', [
 {dang:'Nhận biết cấp số cộng, cấp số nhân', items:[
  {de:`Dãy số ${m('u_n = 5n - 3')} có phải cấp số cộng không? Nếu có, tìm ${m('u_1,\\ d')} và tính ${m('u_{10}')}.`,
   sol:[`Tính hiệu: ${m('u_{n+1} - u_n = [5(n+1) - 3] - (5n - 3) = 5')}.`, `Hiệu là hằng số nên dãy là cấp số cộng, công sai ${m('d = 5')}; ${m('u_1 = 5\\cdot 1 - 3 = 2')}.`, `${m('u_{10} = u_1 + 9d = 2 + 45 = 47')}.`],
   ans:`Là cấp số cộng, ${tb('u_1 = 2,\\ d = 5,\\ u_{10} = 47')}.`},
  {de:`Dãy số ${m('u_n = 3\\cdot 2^n')} có phải cấp số nhân không? Nếu có, tìm ${m('u_1,\\ q')} và tính ${m('u_5')}.`,
   sol:[`Tính thương: ${m('\\dfrac{u_{n+1}}{u_n} = \\dfrac{3\\cdot 2^{n+1}}{3\\cdot 2^n} = 2')}.`, `Thương là hằng số khác 0 nên là cấp số nhân, ${m('q = 2')}; ${m('u_1 = 3\\cdot 2 = 6')}.`, `${m('u_5 = u_1 q^4 = 6\\cdot 16 = 96')}.`],
   ans:`Là cấp số nhân, ${tb('u_1 = 6,\\ q = 2,\\ u_5 = 96')}.`},
 ]},
 {dang:'Tìm số hạng đầu, công sai, công bội', items:[
  {de:`Cấp số cộng có ${m('u_3 = 7')} và ${m('u_7 = 19')}. Tìm ${m('u_1')} và ${m('d')}.`,
   sol:[`${m('u_7 - u_3 = 4d')} (cách nhau 4 số hạng): ${m('4d = 19 - 7 = 12 \\Rightarrow d = 3')}.`, `${m('u_1 = u_3 - 2d = 7 - 6 = 1')}.`],
   ans:`${tb('u_1 = 1,\\ d = 3')}.`},
  {de:`Cấp số nhân có ${m('u_2 = -6')} và ${m('u_5 = 162')}. Tìm ${m('u_1')} và ${m('q')}.`,
   sol:[`${m('u_5 = u_2 q^3')}: ${m('q^3 = \\dfrac{162}{-6} = -27')}.`, `${m('q = -3')} (vì ${m('(-3)^3 = -27')}).`, `${m('u_1 = \\dfrac{u_2}{q} = \\dfrac{-6}{-3} = 2')}.`],
   ans:`${tb('u_1 = 2,\\ q = -3')}.`},
  {hard:true, de:`Cấp số cộng có ${m('u_1 + u_5 = 14')} và ${m('u_2\\cdot u_4 = 45')}. Tìm ${m('u_1')} và ${m('d')}.`,
   sol:[`${m('u_1 + u_5 = 2u_3')} nên ${m('u_3 = 7')}.`, `${m('u_2 = 7 - d,\\ u_4 = 7 + d')}: ${m('(7 - d)(7 + d) = 45 \\Rightarrow 49 - d^2 = 45 \\Rightarrow d^2 = 4')}.`, `${m('d = 2')}: ${m('u_1 = u_3 - 2d = 3')}. ${m('d = -2')}: ${m('u_1 = 7 + 4 = 11')}.`],
   ans:`${tb('u_1 = 3,\\ d = 2')} hoặc ${tb('u_1 = 11,\\ d = -2')}.`},
 ]},
 {dang:'Tính tổng n số hạng đầu', items:[
  {de:`Cấp số cộng có ${m('u_1 = 4,\\ d = 3')}. Tính ${m('S_{20}')}.`,
   sol:[`${m('u_{20} = u_1 + 19d = 4 + 57 = 61')}.`, `${m('S_{20} = \\dfrac{20(u_1 + u_{20})}{2} = 10\\cdot 65')}.`],
   ans:`${tb('S_{20} = 650')}.`},
  {de:`Tính tổng ${m('T = 2 + 6 + 18 + \\cdots + 4374')}.`,
   sol:[`Cấp số nhân ${m('u_1 = 2,\\ q = 3')}; ${m('4374 = 2\\cdot 3^7')} nên ${m('4374 = u_8')}, có ${m('n = 8')} số hạng.`, `${m('T = \\dfrac{u_1(1 - q^8)}{1 - q} = \\dfrac{2(1 - 6561)}{-2}')}.`],
   ans:`${tb('T = 6560')}.`},
 ]},
 {dang:'Ba số lập thành cấp số cộng, cấp số nhân', items:[
  {hard:true, de:`Ba số lập thành cấp số cộng có tổng bằng ${m('21')} và tích bằng ${m('280')}. Tìm ba số đó.`,
   sol:[`Gọi ba số ${m('a - d,\\ a,\\ a + d')}; tổng ${m('3a = 21 \\Rightarrow a = 7')}.`, `Tích: ${m('7(49 - d^2) = 280 \\Rightarrow d^2 = 9 \\Rightarrow d = \\pm 3')}.`, `${m('d = 3')} cho ${m('4,\\ 7,\\ 10')}; ${m('d = -3')} cho ${m('10,\\ 7,\\ 4')} (cùng một bộ ba số).`],
   ans:`Ba số là ${tb('4,\\ 7,\\ 10')} (hoặc ${m('10,\\ 7,\\ 4')}).`},
 ]},
 {dang:'Bài toán thực tế', items:[
  {de:`Một rạp có 20 hàng ghế: hàng thứ nhất có 15 ghế, mỗi hàng sau nhiều hơn hàng liền trước 2 ghế. Rạp có tất cả bao nhiêu ghế?`,
   sol:[`Số ghế mỗi hàng lập cấp số cộng ${m('u_1 = 15,\\ d = 2')}.`, `${m('u_{20} = 15 + 19\\cdot 2 = 53')}.`, `${m('S_{20} = \\dfrac{20(15 + 53)}{2} = 680')}.`],
   ans:`Rạp có ${tb('680')} ghế.`},
  {hard:true, de:`Gửi tiết kiệm ${m('50')} triệu đồng, lãi suất ${m('0{,}5\\%')}/tháng, lãi nhập gốc mỗi tháng. Sau ít nhất bao nhiêu tháng thì số tiền đạt từ ${m('60')} triệu đồng trở lên?`,
   sol:[`Số tiền sau ${m('n')} tháng: ${m('A_n = 50\\cdot 1{,}005^n')} (triệu đồng).`, `Cần ${m('50\\cdot 1{,}005^n \\ge 60 \\Leftrightarrow 1{,}005^n \\ge 1{,}2 \\Leftrightarrow n \\ge \\dfrac{\\ln 1{,}2}{\\ln 1{,}005} \\approx 36{,}56')}.`, `${m('n')} nguyên dương nên lấy số nguyên nhỏ nhất thoả điều kiện.`],
   ans:`Sau ít nhất ${tb('37')} tháng.`},
 ]},
]);
})();
