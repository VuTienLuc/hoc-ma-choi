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
