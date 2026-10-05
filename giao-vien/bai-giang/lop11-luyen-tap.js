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
