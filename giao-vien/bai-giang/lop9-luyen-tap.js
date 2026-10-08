/* =====================================================================
   PHIẾU LUYỆN TẬP LỚP 9 – Chương II (Bài 4–6, Ôn tập)
   Mỗi phiếu: 10 bài = 7 cơ bản + 3 vận dụng; lời giải chia từng bước.
   ===================================================================== */
(() => {
const m = tm;

/* =====================================================================  BÀI 4  */
Lecture.addPractice('lop9', 'bai-4', [
 {dang:'Giải phương trình tích', items:[
  {de:`Giải phương trình ${m('(x - 4)(2x - 3) = 0')}.`,
   sol:[`Tích bằng không khi ${m('x - 4 = 0')} hoặc ${m('2x - 3 = 0')}.`], ans:`${tb('x = 4')} hoặc ${tb('x = \\dfrac{3}{2}')}.`, lines:3},
  {de:`Giải phương trình ${m('x(3x - 12) = 0')}.`,
   sol:[`${m('x = 0')} hoặc ${m('3x - 12 = 0')}.`], ans:`${tb('x = 0')} hoặc ${tb('x = 4')}.`, lines:3},
  {de:`Giải phương trình ${m('(x - 5)(x + 2) = 3(x - 5)')}.`,
   sol:[`Chuyển vế và đặt nhân tử chung: ${m('(x - 5)(x + 2 - 3) = 0')}.`, `${m('(x - 5)(x - 1) = 0')}.`], ans:`${tb('x = 5')} hoặc ${tb('x = 1')}.`},
  {hard:true, de:`Giải phương trình ${m('(2x - 3)^2 = (2x - 3)(x + 4)')}.`,
   sol:[`Chuyển vế, đặt nhân tử chung: ${m('(2x - 3)(2x - 3 - x - 4) = 0')}.`, `${m('(2x - 3)(x - 7) = 0')}. Không chia hai vế cho ${m('2x - 3')} vì có thể mất nghiệm.`], ans:`${tb('x = \\dfrac{3}{2}')} hoặc ${tb('x = 7')}.`},
 ]},
 {dang:'Tìm điều kiện xác định', items:[
  {de:`Tìm điều kiện xác định của phương trình ${m('\\dfrac{1}{x - 3} + \\dfrac{2}{x + 4} = 1')}.`,
   sol:[`Các mẫu khác không: ${m('x - 3 \\ne 0')} và ${m('x + 4 \\ne 0')}.`], ans:`${tb('x \\ne 3')} và ${tb('x \\ne -4')}.`, lines:3},
  {de:`Tìm điều kiện xác định của phương trình ${m('\\dfrac{x + 1}{x(x - 2)} = \\dfrac{3}{x - 2}')}.`,
   sol:[`${m('x(x - 2) \\ne 0')} và ${m('x - 2 \\ne 0')}.`], ans:`${tb('x \\ne 0')} và ${tb('x \\ne 2')}.`, lines:3},
 ]},
 {dang:'Giải phương trình chứa ẩn ở mẫu', items:[
  {de:`Giải phương trình ${m('\\dfrac{3}{x - 2} = \\dfrac{5}{x + 2}')}.`,
   sol:[`ĐKXĐ: ${m('x \\ne 2')} và ${m('x \\ne -2')}.`, `Khử mẫu: ${m('3(x + 2) = 5(x - 2) \\Leftrightarrow 2x = 16')}.`, `${m('x = 8')} thỏa mãn ĐKXĐ.`], ans:`${tb('x = 8')}.`},
  {de:`Giải phương trình ${m('\\dfrac{x + 2}{x - 1} = 2')}.`,
   sol:[`ĐKXĐ: ${m('x \\ne 1')}.`, `${m('x + 2 = 2(x - 1) \\Leftrightarrow x = 4')} (thỏa mãn).`], ans:`${tb('x = 4')}.`},
  {hard:true, de:`Giải phương trình ${m('\\dfrac{x}{x - 2} - \\dfrac{3}{x + 2} = \\dfrac{6}{x^2 - 4}')}.`,
   sol:[`ĐKXĐ: ${m('x \\ne 2')} và ${m('x \\ne -2')}; mẫu chung ${m('(x - 2)(x + 2)')}.`, `Khử mẫu: ${m('x(x + 2) - 3(x - 2) = 6')}.`, `${m('x^2 - x = 0 \\Leftrightarrow x(x - 1) = 0')}. Cả hai giá trị đều thỏa ĐKXĐ.`], ans:`${tb('x = 0')} hoặc ${tb('x = 1')}.`},
  {hard:true, de:`Giải phương trình ${m('\\dfrac{x + 1}{x - 2} = \\dfrac{3}{x - 2}')}.`,
   sol:[`ĐKXĐ: ${m('x \\ne 2')}.`, `Khử mẫu được ${m('x + 1 = 3 \\Leftrightarrow x = 2')}.`, `Giá trị ${m('x = 2')} không thỏa ĐKXĐ nên loại.`], ans:'Phương trình <b>vô nghiệm</b>.'},
 ]},
]);

/* =====================================================================  BÀI 5  */
Lecture.addPractice('lop9', 'bai-5', [
 {dang:'Diễn đạt và nhận biết bất đẳng thức', items:[
  {de:`Viết bằng kí hiệu: a) ${m('x')} không nhỏ hơn ${m('4')}; b) ${m('y')} nhỏ hơn ${m('9')}.`,
   sol:[`“Không nhỏ hơn” gồm lớn hơn hoặc bằng; “nhỏ hơn” không gồm bằng.`], ans:`a) ${tb('x \\ge 4')}; b) ${tb('y \\lt 9')}.`, lines:2},
  {de:`Một thang máy chở tổng khối lượng ${m('M')} (kg) không vượt quá ${m('600')} kg. Viết bất đẳng thức biểu thị giới hạn này.`,
   sol:[`“Không vượt quá” nghĩa là nhỏ hơn hoặc bằng.`], ans:`${tb('M \\le 600')}.`, lines:2},
  {de:`Cho ${m('a \\lt b')} và ${m('b \\le c')}. So sánh ${m('a')} với ${m('c')}.`,
   sol:[`Nếu ${m('b = c')} thì ${m('a \\lt c')}; nếu ${m('b \\lt c')} thì dùng tính chất bắc cầu.`], ans:`${tb('a \\lt c')}.`, lines:3},
 ]},
 {dang:'Vận dụng tính chất cộng và nhân', items:[
  {de:`Cho ${m('a \\lt b')}. So sánh ${m('4a + 3')} và ${m('4b + 3')}.`,
   sol:[`Nhân hai vế với ${m('4 \\gt 0')}: ${m('4a \\lt 4b')}.`, `Cộng hai vế với ${m('3')}, giữ nguyên chiều.`], ans:`${tb('4a + 3 \\lt 4b + 3')}.`, lines:3},
  {de:`Cho ${m('a \\le b')}. So sánh ${m('7 - 2a')} và ${m('7 - 2b')}.`,
   sol:[`Nhân với ${m('-2')}, đổi chiều: ${m('-2a \\ge -2b')}.`, `Cộng hai vế với ${m('7')}.`], ans:`${tb('7 - 2a \\ge 7 - 2b')}.`, lines:3},
  {de:`Cho ${m('a \\gt b')}. So sánh ${m('\\dfrac{a}{3} - 2')} và ${m('\\dfrac{b}{3} - 2')}.`,
   sol:[`Chia cho ${m('3 \\gt 0')} rồi trừ ${m('2')} ở hai vế đều giữ chiều.`], ans:`${tb('\\dfrac{a}{3} - 2 \\gt \\dfrac{b}{3} - 2')}.`, lines:3},
  {de:`Cho ${m('a \\ge 2')}. Chứng minh ${m('3a + 1 \\ge 7')}.`,
   sol:[`${m('a \\ge 2 \\Rightarrow 3a \\ge 6')}.`, `Cộng ${m('1')} vào hai vế.`], ans:`${tb('3a + 1 \\ge 7')}.`, lines:3},
  {hard:true, de:`Cho ${m('a \\lt b')}. Chứng minh ${m('5 - 3a \\gt 2 - 3b')}.`,
   sol:[`Nhân với ${m('-3')}, đổi chiều: ${m('-3a \\gt -3b')}.`, `Suy ra ${m('5 - 3a \\gt 5 - 3b')}; lại có ${m('5 - 3b \\gt 2 - 3b')}.`, `Áp dụng tính chất bắc cầu.`], ans:`${tb('5 - 3a \\gt 2 - 3b')}.`},
 ]},
 {dang:'Chứng minh bất đẳng thức bằng bình phương', items:[
  {hard:true, de:`Chứng minh ${m('x^2 + 9 \\ge 6x')} với mọi số thực ${m('x')}. Khi nào xảy ra dấu bằng?`,
   sol:[`Xét hiệu: ${m('x^2 + 9 - 6x = (x - 3)^2 \\ge 0')}.`, `Dấu bằng khi ${m('x - 3 = 0')}.`], ans:`${tb('x^2 + 9 \\ge 6x')}; dấu bằng khi ${tb('x = 3')}.`},
  {hard:true, de:`Chứng minh ${m('(a + b)^2 \\ge 4ab')} với mọi số thực ${m('a, b')}. Khi nào xảy ra dấu bằng?`,
   sol:[`${m('(a + b)^2 - 4ab = a^2 - 2ab + b^2 = (a - b)^2 \\ge 0')}.`, `Dấu bằng khi ${m('a - b = 0')}.`], ans:`${tb('(a + b)^2 \\ge 4ab')}; dấu bằng khi ${tb('a = b')}.`},
 ]},
]);

/* =====================================================================  BÀI 6  */
Lecture.addPractice('lop9', 'bai-6', [
 {dang:'Nhận biết bất phương trình, kiểm tra nghiệm', items:[
  {de:`Bất phương trình nào là bậc nhất một ẩn: a) ${m('4x - 7 \\gt 0')}; b) ${m('0x + 2 \\le 0')}; c) ${m('x^2 - 4 \\lt 0')}; d) ${m('-2x + 1 \\ge 0')}?`,
   sol:[`a), d) có dạng bậc nhất với hệ số của ${m('x')} khác không.`, `b) có hệ số bằng không; c) chứa ${m('x^2')}.`], ans:'<b>a) và d)</b>.', lines:3},
  {de:`Trong các số ${m('0;\\ 2;\\ 3')}, số nào là nghiệm của ${m('3x - 6 \\gt 0')}?`,
   sol:[`Thay lần lượt được ${m('-6 \\gt 0')} (sai), ${m('0 \\gt 0')} (sai), ${m('3 \\gt 0')} (đúng).`], ans:`Chỉ có ${tb('x = 3')}.`, lines:3},
 ]},
 {dang:'Giải bất phương trình', items:[
  {de:`Giải bất phương trình ${m('4x - 12 \\ge 0')}.`,
   sol:[`${m('4x \\ge 12')}. Chia cho ${m('4')} dương, giữ chiều.`], ans:`${tb('x \\ge 3')}.`, lines:3},
  {de:`Giải bất phương trình ${m('9 - 3x \\lt 0')}.`,
   sol:[`${m('-3x \\lt -9')}. Chia cho ${m('-3')}, đổi chiều.`], ans:`${tb('x \\gt 3')}.`, lines:3},
  {de:`Giải bất phương trình ${m('2(x + 1) \\le 5x - 7')}.`,
   sol:[`${m('2x + 2 \\le 5x - 7 \\Leftrightarrow -3x \\le -9')}.`, `Chia cho ${m('-3')}, đổi chiều.`], ans:`${tb('x \\ge 3')}.`, lines:3},
  {de:`Giải bất phương trình ${m('\\dfrac{x - 1}{3} \\gt 2')}.`,
   sol:[`Nhân với ${m('3')} dương: ${m('x - 1 \\gt 6')}.`], ans:`${tb('x \\gt 7')}.`, lines:3},
  {hard:true, de:`Giải bất phương trình ${m('\\dfrac{3x - 2}{4} - \\dfrac{x + 1}{2} \\le 1')}.`,
   sol:[`Nhân hai vế với ${m('4')} dương: ${m('3x - 2 - 2(x + 1) \\le 4')}.`, `${m('x - 4 \\le 4')}.`], ans:`${tb('x \\le 8')}.`},
  {hard:true, de:`Tìm tất cả số nguyên dương ${m('x')} thỏa mãn ${m('5 - 2(x - 1) \\gt x - 5')}.`,
   sol:[`${m('7 - 2x \\gt x - 5 \\Leftrightarrow -3x \\gt -12')}.`, `Chia cho ${m('-3')}, đổi chiều: ${m('x \\lt 4')}. Kết hợp ${m('x')} nguyên dương.`], ans:`${tb('x \\in \\{1;\\ 2;\\ 3\\}')}.`},
 ]},
 {dang:'Bài toán thực tế', items:[
  {de:`Một xe chở hàng có tải trọng tối đa ${m('500')} kg. Xe đang chở ${m('180')} kg. Có thể xếp thêm nhiều nhất bao nhiêu thùng, mỗi thùng ${m('20')} kg?`,
   sol:[`Gọi ${m('x')} là số thùng thêm, ${m('x')} nguyên không âm.`, `${m('180 + 20x \\le 500 \\Leftrightarrow x \\le 16')}.`], ans:`Nhiều nhất ${tb('16')} thùng.`},
  {hard:true, de:`Lan có ${m('75')} nghìn đồng, cần ít nhất ${m('200')} nghìn đồng để mua sách. Mỗi tuần Lan tiết kiệm thêm ${m('18')} nghìn đồng. Sau ít nhất bao nhiêu tuần Lan đủ tiền?`,
   sol:[`Gọi ${m('n')} là số tuần, ${m('n')} nguyên không âm.`, `${m('75 + 18n \\ge 200 \\Leftrightarrow n \\ge \\dfrac{125}{18}')}.`, `${m('n')} nhỏ nhất là ${m('7')}; khi đó có ${m('201')} nghìn đồng, còn sau ${m('6')} tuần chỉ có ${m('183')} nghìn đồng.`], ans:`Ít nhất ${tb('7')} tuần.`},
 ]},
]);

/* =====================================================================  ÔN TẬP CHƯƠNG II  */
Lecture.addPractice('lop9', 'on-tap-c2', [
 {dang:'Phương trình tích và phương trình chứa ẩn ở mẫu', items:[
  {de:`Giải phương trình ${m('(3x - 6)(x - 5) = 0')}.`,
   sol:[`${m('3x - 6 = 0')} hoặc ${m('x - 5 = 0')}.`], ans:`${tb('x = 2')} hoặc ${tb('x = 5')}.`, lines:3},
  {de:`Giải phương trình ${m('(x - 4)(x + 1) = 2(x - 4)')}.`,
   sol:[`Chuyển vế, đặt nhân tử chung: ${m('(x - 4)(x - 1) = 0')}.`], ans:`${tb('x = 4')} hoặc ${tb('x = 1')}.`, lines:3},
  {de:`Giải phương trình ${m('\\dfrac{2}{x - 1} = \\dfrac{4}{x + 1}')}.`,
   sol:[`ĐKXĐ: ${m('x \\ne 1')} và ${m('x \\ne -1')}.`, `${m('2(x + 1) = 4(x - 1) \\Leftrightarrow x = 3')} (thỏa mãn).`], ans:`${tb('x = 3')}.`},
  {hard:true, de:`Giải phương trình ${m('\\dfrac{x}{x - 3} - \\dfrac{4}{x + 3} = \\dfrac{12}{x^2 - 9}')}.`,
   sol:[`ĐKXĐ: ${m('x \\ne 3')} và ${m('x \\ne -3')}.`, `Khử mẫu: ${m('x(x + 3) - 4(x - 3) = 12')}.`, `${m('x^2 - x = 0 \\Leftrightarrow x(x - 1) = 0')}. Cả hai giá trị đều thỏa ĐKXĐ.`], ans:`${tb('x = 0')} hoặc ${tb('x = 1')}.`},
 ]},
 {dang:'Bất đẳng thức và tính chất', items:[
  {de:`Cho ${m('a \\gt b')}. So sánh ${m('2 - 5a')} và ${m('2 - 5b')}.`,
   sol:[`Nhân với ${m('-5')}, đổi chiều: ${m('-5a \\lt -5b')}.`, `Cộng ${m('2')} vào hai vế.`], ans:`${tb('2 - 5a \\lt 2 - 5b')}.`, lines:3},
  {de:`Cho ${m('a \\ge 3')}. Chứng minh ${m('2a - 1 \\ge 5')}.`,
   sol:[`${m('a \\ge 3 \\Rightarrow 2a \\ge 6 \\Rightarrow 2a - 1 \\ge 5')}.`], ans:`${tb('2a - 1 \\ge 5')}.`, lines:3},
  {hard:true, de:`Chứng minh ${m('x^2 + 4 \\ge 4x')} với mọi số thực ${m('x')}. Tìm giá trị nhỏ nhất của ${m('x^2 - 4x + 7')}.`,
   sol:[`${m('x^2 + 4 - 4x = (x - 2)^2 \\ge 0')}, suy ra bất đẳng thức cần chứng minh.`, `${m('x^2 - 4x + 7 = (x - 2)^2 + 3 \\ge 3')}. Dấu bằng khi ${m('x = 2')}.`], ans:`Giá trị nhỏ nhất là ${tb('3')}, đạt tại ${tb('x = 2')}.`},
 ]},
 {dang:'Bất phương trình và ứng dụng', items:[
  {de:`Giải bất phương trình ${m('7 - 2x \\ge 1')}.`,
   sol:[`${m('-2x \\ge -6')}. Chia cho ${m('-2')}, đổi chiều.`], ans:`${tb('x \\le 3')}.`, lines:3},
  {de:`Giải bất phương trình ${m('\\dfrac{2x + 1}{3} \\lt x - 1')}.`,
   sol:[`Nhân hai vế với ${m('3')}: ${m('2x + 1 \\lt 3x - 3')}.`, `Chuyển vế: ${m('-x \\lt -4')}.`], ans:`${tb('x \\gt 4')}.`, lines:3},
  {hard:true, de:`Một nhóm thuê sân với phí cố định ${m('40')} nghìn đồng và ${m('15')} nghìn đồng cho mỗi người. Nhóm có ${m('200')} nghìn đồng. Hỏi có thể có nhiều nhất bao nhiêu người tham gia?`,
   sol:[`Gọi ${m('n')} là số người, ${m('n')} nguyên dương.`, `${m('40 + 15n \\le 200 \\Leftrightarrow n \\le \\dfrac{160}{15}')}.`, `Số nguyên lớn nhất phù hợp là ${m('10')}: phí ${m('190')} nghìn đồng; ${m('11')} người cần ${m('205')} nghìn đồng.`], ans:`Nhiều nhất ${tb('10')} người.`},
 ]},
]);
})();

/* =====================================================================
   PHIẾU LUYỆN TẬP LỚP 9 – Chương V. Đường tròn (Bài 13 – 17, Ôn tập)
   Lecture.addPractice(lớp, mã bài, [{dang, items:[{de, sol, ans, fig, hard}]}])
   Tỉ lệ 70% cơ bản – 30% vận dụng (hard:true, ★). Không nhắc lại lý thuyết. Hình: circleSVG.
   ===================================================================== */
(() => {
const m = tm;
const dg = x => `${x}^\\circ`, hat = s => `\\widehat{${s}}`, arc = s => `\\text{sđ}\\,\\overset{\\frown}{${s}}`;
const at = (r, a) => [r*Math.cos(a*Math.PI/180), r*Math.sin(a*Math.PI/180)];
const dirOf = (p, q) => Math.atan2(q[1]-p[1], q[0]-p[0])*180/Math.PI;
const rightAt = (A, P, Q) => { const a1 = dirOf(A, P), a2 = dirOf(A, Q); return [A[0], A[1], Math.abs(((a2-a1+540)%360)-180-90) < 1 ? a1 : a2]; };

/* ---------- Hình ---------- */
const F_alt = () => { const B = [-4,0], C = [4,0], A = [-1,5], foot = (P, U, V) => { const dx = V[0]-U[0], dy = V[1]-U[1], t = ((P[0]-U[0])*dx + (P[1]-U[1])*dy)/(dx*dx + dy*dy); return [U[0]+t*dx, U[1]+t*dy]; };
  const D = foot(B, A, C), E = foot(C, A, B);
  return circleSVG({C:[{x:0,y:0,r:4,lab:'M'}], P:[[...A,'A'],[...B,'B'],[...C,'C'],[...D,'D'],[...E,'E']], S:[[...A,...B],[...A,...C],[...B,...C],[...B,...D],[...C,...E]], right:[rightAt(D,B,C), rightAt(E,C,B)]}); };
const F_par = () => { const s = 4/25; return circleSVG({C:[{x:0,y:0,r:4,lab:'O'}], P:[[-24*s,7*s,'A'],[24*s,7*s,'B'],[-20*s,-15*s,'C'],[20*s,-15*s,'D'],[0,7*s,'H',90],[0,-15*s,'K',-90]], S:[[-24*s,7*s,24*s,7*s],[-20*s,-15*s,20*s,-15*s],[0,7*s,0,-15*s,true]]}); };
const F_twoTanE = () => { const A = at(5, 60), B = at(5, -60), M = [10,0]; return circleSVG({C:[{x:0,y:0,r:5,lab:'O'}], P:[[...A,'A'],[...B,'B'],[...M,'M']], S:[[...M,...A],[...M,...B],[0,0,...A],[0,0,...B],[...A,...B],[0,0,...M,true]], right:[rightAt(A,[0,0],M), rightAt(B,[0,0],M)]}); };
const F_three = () => circleSVG({C:[{x:0,y:0,r:1,lab:'A'},{x:3,y:0,r:2,lab:'B'},{x:0,y:4,r:3,lab:'C'}], S:[[0,0,3,0,true],[0,0,0,4,true],[3,0,0,4,true]]});
const F_common = () => { const O = [0,0], P = [13,0], a = Math.acos(5/13)*180/Math.PI, B = at(9, a), C = [P[0]+4*Math.cos(a*Math.PI/180), 4*Math.sin(a*Math.PI/180)];
  return circleSVG({C:[{x:0,y:0,r:9,lab:'O'},{x:13,y:0,r:4,lab:"O'"}], P:[[...B,'B'],[...C,'C'],[9,0,'A',-60]], S:[[...B,...C],[0,0,...B],[...P,...C],[0,0,...P,true]], right:[rightAt(B,O,C), rightAt(C,P,B)]}); };

/* =====================================================================  BÀI 13  */
Lecture.addPractice('lop9', 'bai-13', [
 {dang:'Xác định vị trí của một điểm đối với đường tròn', items:[
  {de:`Cho đường tròn ${m('(O;\\,6\\text{ cm})')} và các điểm ${m('A, B, C')} với ${m('OA = 4')} cm, ${m('OB = 6')} cm, ${m('OC = 8{,}5')} cm. Mỗi điểm nằm ở đâu so với đường tròn?`,
   sol:[`${m('OA \\lt 6')}: ${m('A')} nằm trong; ${m('OB = 6')}: ${m('B')} nằm trên; ${m('OC \\gt 6')}: ${m('C')} nằm ngoài.`], lines:3},
  {de:`Trong mặt phẳng tọa độ ${m('Oxy')}, cho đường tròn ${m('(O;\\,10)')} (${m('O')} là gốc tọa độ) và các điểm ${m('M(6;\\,8)')}, ${m('N({-5};\\,9)')}, ${m('P(7;\\,{-7})')}. Xác định vị trí của mỗi điểm.`,
   sol:[`${m('OM = \\sqrt{36 + 64} = 10')}: ${m('M')} nằm trên.`, `${m('ON = \\sqrt{25 + 81} = \\sqrt{106} \\gt 10')}: ${m('N')} nằm ngoài.`, `${m('OP = \\sqrt{49 + 49} = \\sqrt{98} \\lt 10')}: ${m('P')} nằm trong.`]},
  {de:`Cho đoạn thẳng ${m('AB = 6')} cm. Vẽ đường tròn ${m('(A;\\,4\\text{ cm})')}. Điểm ${m('B')} nằm trong, nằm trên hay nằm ngoài đường tròn? Trung điểm ${m('I')} của ${m('AB')} thì sao?`,
   sol:[`${m('AB = 6 \\gt 4')}: ${m('B')} nằm ngoài.`, `${m('AI = 3 \\lt 4')}: ${m('I')} nằm trong.`], lines:3},
  {hard:true, de:`Trong mặt phẳng tọa độ, cho điểm ${m('A(3;\\,4)')}. Có bao nhiêu số nguyên ${m('R \\le 10')} để điểm ${m('A')} nằm trong đường tròn ${m('(O;\\,R)')} (${m('O')} là gốc tọa độ)?`,
   sol:[`${m('OA = \\sqrt{9 + 16} = 5')}.`, `${m('A')} nằm trong ⇔ ${m('OA \\lt R \\Leftrightarrow R \\gt 5')}; kết hợp ${m('R \\le 10')}: ${m('R \\in \\{6;\\,7;\\,8;\\,9;\\,10\\}')}.`], ans:`Có ${tb('5')} giá trị.`},
  {hard:true, de:`Một vòi tưới đặt tại ${m('O')} tưới được mọi điểm cách ${m('O')} không quá ${m('5')} m. Ba cây ${m('A, B, C')} cách ${m('O')} lần lượt ${m('4')} m, ${m('5{,}5')} m và ${m('5')} m. Những cây nào được tưới?`,
   sol:[`Vùng tưới là hình tròn ${m('(O;\\,5\\text{ m})')}: gồm các điểm nằm trong hoặc nằm trên đường tròn.`, `${m('OA = 4 \\lt 5')}, ${m('OC = 5')}: được tưới; ${m('OB = 5{,}5 \\gt 5')}: không được tưới.`], ans:`Cây ${tb('A')} và ${tb('C')} được tưới.`},
 ]},
 {dang:'Chứng minh các điểm cùng thuộc một đường tròn', items:[
  {de:`Cho hình chữ nhật ${m('ABCD')} có ${m('AB = 12')} cm, ${m('BC = 5')} cm. Chứng minh bốn đỉnh cùng thuộc một đường tròn và tính bán kính.`,
   sol:[`Giao điểm ${m('O')} của hai đường chéo cách đều bốn đỉnh (hai đường chéo bằng nhau, cắt nhau tại trung điểm mỗi đường).`, `${m('AC = \\sqrt{144 + 25} = 13')} cm.`], ans:`${m('R = \\dfrac{AC}{2} =')} ${tb('6{,}5')} cm.`},
  {de:`Cho tam giác ${m('ABC')} vuông tại ${m('A')}, ${m('AB = 6')} cm, ${m('AC = 8')} cm. Xác định tâm và bán kính đường tròn đi qua ${m('A, B, C')}.`,
   sol:[`Trung điểm ${m('O')} của cạnh huyền ${m('BC')} cách đều ba đỉnh.`, `${m('BC = \\sqrt{36 + 64} = 10')} cm.`], ans:`Tâm là trung điểm ${m('BC')}, ${tb('R = 5')} cm.`},
  {hard:true, de:`Cho tam giác nhọn ${m('ABC')} có hai đường cao ${m('BD, CE')}. Chứng minh bốn điểm ${m('B, C, D, E')} cùng thuộc một đường tròn; chỉ rõ tâm.`, fig:F_alt(),
   sol:[`Gọi ${m('M')} là trung điểm ${m('BC')}.`, `Tam giác ${m('BDC')} vuông tại ${m('D')} ⇒ ${m('MD = \\dfrac{BC}{2}')}; tam giác ${m('BEC')} vuông tại ${m('E')} ⇒ ${m('ME = \\dfrac{BC}{2}')}.`, `Lại có ${m('MB = MC = \\dfrac{BC}{2}')}.`], ans:`${m('B, C, D, E')} cùng thuộc đường tròn tâm ${tb('M')}, bán kính ${m('\\dfrac{BC}{2}')}.`},
 ]},
 {dang:'Vận dụng tính đối xứng', items:[
  {de:`Đường tròn có bao nhiêu trục đối xứng? Tâm đối xứng của đường tròn ${m('(O)')} là điểm nào?`, sol:[`Mọi đường thẳng đi qua tâm đều là trục đối xứng ⇒ vô số trục.`, `Tâm đối xứng là tâm ${m('O')}.`], ans:'Vô số trục đối xứng; tâm đối xứng là O.', lines:3},
  {de:`Đường tròn tâm ${m('I({-1};\\,2)')} đi qua ${m('A(2;\\,6)')}. Tính bán kính và tìm ${m("A'")} thuộc đường tròn sao cho ${m("AA'")} là đường kính.`,
   sol:[`${m('R = IA = \\sqrt{3^2 + 4^2} = 5')}.`, `${m('I')} là trung điểm ${m("AA'")}: ${m("x_{A'} = -2 - 2 = -4,\\ y_{A'} = 4 - 6 = -2")}.`], ans:`${tb("R = 5;\\ A'({-4};\\,{-2})")}.`},
 ]},
]);

/* =====================================================================  BÀI 14  */
Lecture.addPractice('lop9', 'bai-14', [
 {dang:'Tính độ dài dây, khoảng cách từ tâm đến dây', items:[
  {de:`Cho ${m('(O;\\,5\\text{ cm})')}, dây ${m('AB = 6')} cm. Tính khoảng cách từ ${m('O')} đến ${m('AB')}.`, sol:[`Kẻ ${m('OH \\perp AB')} ⇒ ${m('AH = 3')} cm.`, `${m('OH = \\sqrt{25 - 9}')}.`], ans:`${tb('OH = 4')} cm.`},
  {de:`Cho ${m('(O;\\,10\\text{ cm})')}, dây ${m('AB')} cách tâm ${m('6')} cm. Tính ${m('AB')}.`, sol:[`${m('AH = \\sqrt{100 - 36} = 8')} cm.`], ans:`${tb('AB = 16')} cm.`},
  {de:`Dây ${m('AB = 24')} cm của một đường tròn cách tâm ${m('5')} cm. Tính bán kính.`, sol:[`${m('AH = 12')} cm; ${m('R = \\sqrt{12^2 + 5^2}')}.`], ans:`${tb('R = 13')} cm.`},
  {de:`Đường tròn ${m('(O;\\,5\\text{ cm})')} có thể có dây dài ${m('7')} cm, ${m('9')} cm, ${m('10')} cm, ${m('11')} cm không?`, sol:[`Mọi dây đều không lớn hơn đường kính ${m('2R = 10')} cm.`], ans:`Có dây 7, 9, 10 cm; ${tb('không')} có dây 11 cm.`, lines:3},
  {hard:true, de:`Cho ${m('(O;\\,25\\text{ cm})')} có hai dây song song ${m('AB = 48')} cm, ${m('CD = 40')} cm nằm khác phía đối với tâm. Tính khoảng cách giữa hai dây.`, fig:F_par(),
   sol:[`Kẻ đường thẳng qua ${m('O')} vuông góc với hai dây tại ${m('H, K')} (${m('H, K')} là trung điểm ${m('AB, CD')}).`, `${m('OH = \\sqrt{625 - 576} = 7')} cm; ${m('OK = \\sqrt{625 - 400} = 15')} cm.`, `Hai dây khác phía tâm: ${m('HK = OH + OK')}.`], ans:`${tb('HK = 22')} cm.`},
 ]},
 {dang:'Tính số đo cung, góc ở tâm', items:[
  {de:`Cho ${m('A, B \\in (O)')}, ${m(`${hat('AOB')} = ${dg(80)}`)}. Tính số đo cung nhỏ và cung lớn ${m('AB')}.`, sol:[`Cung nhỏ ${m(dg(80))}; cung lớn ${m(`360^\\circ - 80^\\circ`)}.`], ans:`${tb(dg(80))} và ${tb(dg(280))}.`},
  {de:`Dây ${m('AB')} của ${m('(O;\\,R)')} có ${m('AB = R\\sqrt{2}')}. Tính ${m(hat('AOB'))} và số đo cung lớn ${m('AB')}.`, sol:[`${m('OA^2 + OB^2 = 2R^2 = AB^2')} ⇒ tam giác ${m('OAB')} vuông tại ${m('O')}.`], ans:`${m(hat('AOB') + ' =')} ${tb(dg(90))}; cung lớn ${tb(dg(270))}.`},
  {de:`Trên ${m('(O)')} lấy ${m('A, B, C')} sao cho tia ${m('OB')} nằm giữa ${m('OA, OC')}, ${m(`${hat('AOB')} = ${dg(45)}`)}, ${m(`${hat('BOC')} = ${dg(75)}`)}. Tính số đo cung nhỏ ${m('AC')}.`, sol:[`${m(`${hat('AOC')} = 45^\\circ + 75^\\circ`)}.`], ans:`${m(arc('AC') + ' =')} ${tb(dg(120))}.`},
  {hard:true, de:`Cho ${m('(O;\\,4\\text{ cm})')}, dây ${m('AB')} với ${m(`${hat('OAB')} = ${dg(30)}`)}. Tính số đo cung nhỏ ${m('AB')} và độ dài dây ${m('AB')}.`,
   sol:[`Tam giác ${m('OAB')} cân tại ${m('O')}: ${m(`${hat('AOB')} = 180^\\circ - 2\\cdot 30^\\circ = ${dg(120)}`)} ⇒ cung nhỏ ${m(dg(120))}.`, `Kẻ ${m('OH \\perp AB')}: ${m('AH = OA\\cos 30^\\circ = 2\\sqrt{3}')} cm.`], ans:`Cung nhỏ ${tb(dg(120))}; ${tb('AB = 4\\sqrt{3}')} cm.`},
  {hard:true, de:`Lúc ${m('2')} giờ ${m('30')} phút, kim giờ và kim phút của đồng hồ tạo thành góc ở tâm bao nhiêu độ? (Mặt đồng hồ chia 12 phần bằng nhau.)`,
   sol:[`Mỗi giờ ứng với ${m('30^\\circ')}; mỗi phút kim giờ quay ${m('0{,}5^\\circ')}.`, `Kim phút chỉ số 6. Kim giờ nằm giữa số 2 và số 3 (quá số 2 một góc ${m('15^\\circ')}).`, `Từ số 2 đến số 6 là ${m('4\\cdot 30^\\circ = 120^\\circ')}; trừ ${m('15^\\circ')}.`], ans:`${tb(dg(105))}.`},
 ]},
]);

/* =====================================================================  BÀI 15  */
Lecture.addPractice('lop9', 'bai-15', [
 {dang:'Tính độ dài đường tròn, cung tròn', items:[
  {de:`Tính độ dài đường tròn bán kính ${m('7')} cm (theo ${m('\\pi')} và gần đúng với ${m('\\pi \\approx 3{,}14')}).`, sol:[`${m('C = 2\\pi\\cdot 7 = 14\\pi \\approx 43{,}96')} cm.`], ans:`${tb('14\\pi')} cm ${m('\\approx 43{,}96')} cm.`, lines:3},
  {de:`Tính độ dài cung ${m(dg(45))} của đường tròn bán kính ${m('8')} cm.`, sol:[`${m('l = \\dfrac{\\pi\\cdot 8\\cdot 45}{180}')}.`], ans:`${tb('l = 2\\pi')} cm.`, lines:3},
  {de:`Một cung tròn của đường tròn bán kính ${m('9')} cm có độ dài ${m('3\\pi')} cm. Tính số đo của cung.`, sol:[`${m('3\\pi = \\dfrac{\\pi\\cdot 9\\cdot n}{180} \\Rightarrow n = \\dfrac{3\\cdot 180}{9}')}.`], ans:`${tb(dg(60))}.`},
 ]},
 {dang:'Tính diện tích hình quạt, hình vành khuyên', items:[
  {de:`Tính diện tích hình quạt tròn bán kính ${m('4')} cm, cung ${m(dg(90))}.`, sol:[`${m('S = \\dfrac{\\pi\\cdot 16\\cdot 90}{360}')}.`], ans:`${tb('4\\pi')} cm².`, lines:3},
  {de:`Hình quạt tròn bán kính ${m('10')} cm có độ dài cung ${m('6')} cm. Tính diện tích.`, sol:[`${m('S = \\dfrac{lR}{2} = \\dfrac{6\\cdot 10}{2}')}.`], ans:`${tb('30')} cm².`, lines:3},
  {de:`Tính diện tích hình vành khuyên giới hạn bởi hai đường tròn đồng tâm bán kính ${m('7')} cm và ${m('4')} cm.`, sol:[`${m('S = \\pi(49 - 16)')}.`], ans:`${tb('33\\pi')} cm².`, lines:3},
  {hard:true, de:`Một hình quạt tròn bán kính ${m('6')} cm có diện tích ${m('6\\pi')} cm². Tính số đo cung và độ dài cung của hình quạt.`,
   sol:[`${m('6\\pi = \\dfrac{\\pi\\cdot 36\\cdot n}{360} \\Rightarrow n = 60')}.`, `${m('l = \\dfrac{\\pi\\cdot 6\\cdot 60}{180} = 2\\pi')} cm (hoặc ${m('l = \\dfrac{2S}{R}')}).`], ans:`${tb(dg(60))}; ${tb('l = 2\\pi')} cm.`},
 ]},
 {dang:'Bài toán thực tế', items:[
  {de:`Bánh xe đường kính ${m('60')} cm lăn ${m('50')} vòng. Xe đi được bao nhiêu mét? (${m('\\pi \\approx 3{,}14')})`, sol:[`Mỗi vòng: ${m('3{,}14\\cdot 60 = 188{,}4')} cm; 50 vòng: ${m('9\\,420')} cm.`], ans:`${tb('94{,}2')} m.`},
  {hard:true, de:`Một chiếc quạt giấy khi xòe ra có dạng hình quạt tròn góc ${m(dg(150))}, bán kính ${m('30')} cm; phần dán giấy nằm giữa hai cung bán kính ${m('10')} cm và ${m('30')} cm. Tính diện tích phần giấy (${m('\\pi \\approx 3{,}14')}, làm tròn đến hàng đơn vị).`,
   sol:[`Phần giấy = quạt lớn − quạt nhỏ (cùng góc ${m(dg(150))}): ${m('S = \\dfrac{\\pi(30^2 - 10^2)\\cdot 150}{360}')}.`, `${m('S = \\dfrac{1000\\pi}{3} \\approx 1046{,}7')} cm².`], ans:`Khoảng ${tb('1047')} cm².`},
  {hard:true, de:`Bánh xe bán kính ${m('35')} cm. Xe đi quãng đường ${m('1{,}1')} km thì bánh xe quay khoảng bao nhiêu vòng? (${m('\\pi \\approx 3{,}14')}, làm tròn đến hàng đơn vị)`,
   sol:[`Chu vi bánh: ${m('2\\cdot 3{,}14\\cdot 35 = 219{,}8')} cm.`, `${m('1{,}1\\text{ km} = 110\\,000')} cm; số vòng ${m('= 110\\,000 : 219{,}8 \\approx 500{,}5')}.`], ans:`Khoảng ${tb('500')} vòng.`},
 ]},
]);

/* =====================================================================  BÀI 16  */
Lecture.addPractice('lop9', 'bai-16', [
 {dang:'Xác định vị trí tương đối', items:[
  {de:`Cho ${m('(O;\\,6\\text{ cm})')} và ba đường thẳng cách ${m('O')} lần lượt ${m('4')} cm, ${m('6')} cm, ${m('7{,}5')} cm. Mỗi đường thẳng có vị trí thế nào với đường tròn?`, sol:[`${m('4 \\lt 6')}: cắt nhau; ${m('6 = 6')}: tiếp xúc; ${m('7{,}5 \\gt 6')}: không giao nhau.`], lines:3},
  {de:`Đường tròn tâm ${m('I({-3};\\,2)')}, bán kính ${m('2')}. Xét vị trí tương đối của đường tròn với trục ${m('Ox')} và với trục ${m('Oy')}.`, sol:[`Đến ${m('Ox')}: ${m('d = |2| = R')} ⇒ tiếp xúc.`, `Đến ${m('Oy')}: ${m('d = |{-3}| = 3 \\gt 2')} ⇒ không giao nhau.`]},
  {de:`Đường thẳng ${m('a')} cách tâm ${m('O')} một khoảng ${m('5')} cm. Tìm ${m('R')} để ${m('a')} tiếp xúc với ${m('(O;\\,R)')}; để ${m('a')} cắt ${m('(O;\\,R)')}.`, sol:[`Tiếp xúc ⇔ ${m('R = 5')}; cắt nhau ⇔ ${m('R \\gt 5')} (cm).`], lines:3},
  {hard:true, de:`Trong mặt phẳng tọa độ, đường tròn tâm ${m('I(m;\\,3)')} bán kính ${m('5')} tiếp xúc với trục ${m('Oy')}. Tìm ${m('m')}. Khi đó đường tròn và trục ${m('Ox')} có vị trí thế nào?`,
   sol:[`Tiếp xúc ${m('Oy')} ⇔ ${m('|m| = 5 \\Leftrightarrow m = \\pm 5')}.`, `Khoảng cách từ ${m('I')} đến ${m('Ox')} là ${m('3 \\lt 5')} ⇒ cắt ${m('Ox')} tại hai điểm.`], ans:`${tb('m = 5')} hoặc ${tb('m = -5')}; cắt trục ${m('Ox')}.`},
 ]},
 {dang:'Tiếp tuyến: tính độ dài, chứng minh', items:[
  {de:`${m('MA')} là tiếp tuyến của ${m('(O;\\,5\\text{ cm})')} tại ${m('A')}, ${m('OM = 13')} cm. Tính ${m('MA')}.`, sol:[`${m('OA \\perp MA')}: ${m('MA = \\sqrt{169 - 25}')}.`], ans:`${tb('12')} cm.`, lines:3},
  {de:`${m('MA')} là tiếp tuyến của ${m('(O;\\,9\\text{ cm})')} tại ${m('A')}, ${m('MA = 12')} cm. Tính ${m('OM')}.`, sol:[`${m('OM = \\sqrt{81 + 144}')}.`], ans:`${tb('15')} cm.`, lines:3},
  {de:`Tam giác ${m('ABC')} có ${m('AB = 6')} cm, ${m('AC = 8')} cm, ${m('BC = 10')} cm. Chứng minh ${m('AB')} là tiếp tuyến của đường tròn ${m('(C;\\,CA)')}.`,
   sol:[`${m('6^2 + 8^2 = 10^2')} ⇒ tam giác vuông tại ${m('A')}.`, `${m('A \\in (C;\\,CA)')} và ${m('AB \\perp CA')} tại ${m('A')} ⇒ ${m('AB')} là tiếp tuyến.`]},
  {hard:true, de:`Một người đứng trên ngọn hải đăng, mắt cách mặt biển ${m('50')} m. Coi Trái Đất là hình cầu bán kính ${m('6400')} km. Người đó nhìn xa tối đa bao nhiêu ki-lô-mét (tầm nhìn là đoạn tiếp tuyến)? Làm tròn đến hàng phần mười.`,
   sol:[`Gọi ${m('O')} là tâm Trái Đất, ${m('M')} là mắt, ${m('A')} là tiếp điểm: ${m('OM = 6400{,}05')} km, ${m('OA = 6400')} km, ${m('OA \\perp MA')}.`, `${m('MA = \\sqrt{6400{,}05^2 - 6400^2} = \\sqrt{0{,}05\\cdot 12\\,800{,}05} \\approx \\sqrt{640}')}.`], ans:`Khoảng ${tb('25{,}3')} km.`},
 ]},
 {dang:'Hai tiếp tuyến cắt nhau', items:[
  {de:`Từ ${m('M')} kẻ hai tiếp tuyến ${m('MA, MB')} của ${m('(O)')}, ${m('MA = 7')} cm, ${m(`${hat('AMB')} = ${dg(50)}`)}. Tính ${m('MB')} và ${m(hat('AOB'))}.`, sol:[`${m('MB = MA = 7')} cm.`, `${m(`${hat('AOB')} = 180^\\circ - 50^\\circ = ${dg(130)}`)}.`]},
  {hard:true, de:`Cho ${m('(O;\\,5\\text{ cm})')} và ${m('M')} với ${m('OM = 10')} cm. Kẻ hai tiếp tuyến ${m('MA, MB')}. Tính ${m(hat('AMB'))}, ${m('MA')} và ${m('AB')}.`, fig:F_twoTanE(),
   sol:[`Tam giác ${m('OAM')} vuông tại ${m('A')}: ${m(`\\sin ${hat('AMO')} = \\dfrac{5}{10} = \\dfrac{1}{2} \\Rightarrow ${hat('AMO')} = 30^\\circ`)} ⇒ ${m(`${hat('AMB')} = ${dg(60)}`)}.`, `${m('MA = \\sqrt{100 - 25} = 5\\sqrt{3}')} cm.`, `Tam giác ${m('MAB')} cân tại ${m('M')} có góc ${m(dg(60))} nên đều: ${m('AB = MA')}.`], ans:`${tb(`${hat('AMB')} = ${dg(60)};\\ MA = AB = 5\\sqrt{3}`)} cm.`},
 ]},
]);

/* =====================================================================  BÀI 17  */
Lecture.addPractice('lop9', 'bai-17', [
 {dang:'Xác định vị trí tương đối của hai đường tròn', items:[
  {de:`Cho ${m('(O;\\,6\\text{ cm})')} và ${m("(O';\\,4\\text{ cm})")}. Xác định vị trí tương đối khi ${m("OO'")} bằng ${m('10')} cm; ${m('12')} cm; ${m('5')} cm.`, sol:[`${m('R + r = 10,\\ R - r = 2')}.`, `10: tiếp xúc ngoài; 12: ở ngoài nhau; 5: cắt nhau.`]},
  {de:`Cho ${m('(O;\\,9\\text{ cm})')} và ${m("(O';\\,4\\text{ cm})")}. Xác định vị trí tương đối và số điểm chung khi ${m("OO' = 5")} cm; ${m("OO' = 3")} cm.`, sol:[`${m('R - r = 5')}: ${m("OO' = 5")} ⇒ tiếp xúc trong, 1 điểm chung.`, `${m("OO' = 3 \\lt 5")} ⇒ đựng nhau, không có điểm chung.`]},
  {de:`Hai đường tròn ${m('(O;\\,7\\text{ cm})')} và ${m("(O';\\,3\\text{ cm})")} có ${m("OO' = 8")} cm. Chúng có bao nhiêu điểm chung?`, sol:[`${m('4 \\lt 8 \\lt 10')} ⇒ cắt nhau.`], ans:`${tb('2')} điểm chung.`, lines:3},
  {hard:true, de:`Ba đường tròn ${m('(A;\\,1\\text{ cm})')}, ${m('(B;\\,2\\text{ cm})')}, ${m('(C;\\,3\\text{ cm})')} đôi một tiếp xúc ngoài. Tính chu vi tam giác ${m('ABC')} và chứng minh tam giác ${m('ABC')} vuông.`, fig:F_three(),
   sol:[`Tiếp xúc ngoài: ${m('AB = 1 + 2 = 3,\\ AC = 1 + 3 = 4,\\ BC = 2 + 3 = 5')} (cm).`, `Chu vi ${m('= 12')} cm; ${m('3^2 + 4^2 = 5^2')} ⇒ vuông tại ${m('A')}.`], ans:`Chu vi ${tb('12')} cm; tam giác vuông tại ${m('A')}.`},
 ]},
 {dang:'Tính đoạn nối tâm, bán kính', items:[
  {de:`Hai đường tròn ${m('(O;\\,5\\text{ cm})')} và ${m("(O';\\,3\\text{ cm})")} tiếp xúc ngoài. Tính ${m("OO'")}.`, sol:[`${m("OO' = 5 + 3")}.`], ans:`${tb('8')} cm.`, lines:2},
  {de:`${m('(O;\\,9\\text{ cm})')} và ${m("(O';\\,r)")} tiếp xúc trong, ${m("OO' = 4")} cm, ${m('r \\lt 9')}. Tính ${m('r')}.`, sol:[`${m("OO' = R - r \\Rightarrow r = 9 - 4")}.`], ans:`${tb('r = 5')} cm.`, lines:2},
  {de:`${m('(O;\\,8\\text{ cm})')} và ${m("(O';\\,5\\text{ cm})")} cắt nhau. Tìm điều kiện của ${m("OO'")}.`, sol:[`${m("8 - 5 \\lt OO' \\lt 8 + 5")}.`], ans:`${tb("3 \\lt OO' \\lt 13")} (cm).`, lines:2},
  {de:`Hai đường tròn cùng bán kính ${m('5')} cm cắt nhau tại ${m('A, B')} với ${m('AB = 8')} cm. Tính đoạn nối tâm.`, sol:[`${m("OO'")} là trung trực của ${m('AB')}, cắt ${m('AB')} tại trung điểm ${m('H')}: ${m('AH = 4')}; ${m("OH = O'H = \\sqrt{25 - 16} = 3")}.`], ans:`${tb("OO' = 6")} cm.`},
  {hard:true, de:`${m('(O;\\,20\\text{ cm})')} và ${m("(O';\\,15\\text{ cm})")} cắt nhau tại ${m('A, B')}, ${m("OO' = 25")} cm. Tính độ dài dây chung ${m('AB')}.`,
   sol:[`${m('20^2 + 15^2 = 625 = 25^2')} ⇒ tam giác ${m("OAO'")} vuông tại ${m('A')}.`, `${m("OO'")} là trung trực của ${m('AB')} nên ${m('AH')} là đường cao: ${m("AH = \\dfrac{OA\\cdot O'A}{OO'} = \\dfrac{20\\cdot 15}{25} = 12")} cm.`], ans:`${tb('AB = 24')} cm.`},
  {hard:true, de:`Hai bánh răng tiếp xúc ngoài có bán kính ${m('12')} cm và ${m('4')} cm. Tính khoảng cách giữa hai trục. Khi bánh lớn quay ${m('5')} vòng thì bánh nhỏ quay bao nhiêu vòng?`,
   sol:[`Khoảng cách hai trục: ${m("OO' = 12 + 4 = 16")} cm.`, `Quãng đường đi được trên vành hai bánh bằng nhau: ${m('5\\cdot 2\\pi\\cdot 12 = n\\cdot 2\\pi\\cdot 4')}.`], ans:`${tb('16')} cm; bánh nhỏ quay ${tb('15')} vòng.`},
 ]},
]);

/* =====================================================================  ÔN TẬP CHƯƠNG V  */
Lecture.addPractice('lop9', 'on-tap-c5', [
 {dang:'Điểm, dây và cung', items:[
  {de:`Cho ${m('(O;\\,13\\text{ cm})')}, dây ${m('AB = 10')} cm. Tính khoảng cách từ tâm đến dây.`, sol:[`${m('AH = 5')}; ${m('OH = \\sqrt{169 - 25}')}.`], ans:`${tb('12')} cm.`, lines:3},
  {de:`Cho ${m(`${hat('AOB')} = ${dg(100)}`)} là góc ở tâm của ${m('(O)')}. Tính số đo cung lớn ${m('AB')}.`, sol:[`${m('360^\\circ - 100^\\circ')}.`], ans:`${tb(dg(260))}.`, lines:2},
  {de:`Tam giác ${m('ABC')} vuông tại ${m('A')}, ${m('AB = 9')} cm, ${m('AC = 12')} cm. Tính bán kính đường tròn đi qua ba đỉnh.`, sol:[`${m('BC = 15')} cm; ${m('R = \\dfrac{BC}{2}')}.`], ans:`${tb('7{,}5')} cm.`, lines:3},
 ]},
 {dang:'Độ dài cung, diện tích hình quạt, vành khuyên', items:[
  {de:`Tính độ dài cung ${m(dg(72))} của đường tròn bán kính ${m('10')} cm.`, sol:[`${m('l = \\dfrac{\\pi\\cdot 10\\cdot 72}{180}')}.`], ans:`${tb('4\\pi')} cm.`, lines:2},
  {de:`Tính diện tích hình vành khuyên giới hạn bởi hai đường tròn đồng tâm bán kính ${m('6')} cm và ${m('2')} cm.`, sol:[`${m('S = \\pi(36 - 4)')}.`], ans:`${tb('32\\pi')} cm².`, lines:2},
  {hard:true, de:`Kim phút dài ${m('10')} cm quét trong ${m('20')} phút tạo thành một hình quạt. Tính diện tích hình quạt đó (${m('\\pi \\approx 3{,}14')}, làm tròn đến hàng phần mười).`,
   sol:[`20 phút ứng với ${m('\\dfrac{20}{60}\\cdot 360^\\circ = 120^\\circ')}.`, `${m('S = \\dfrac{\\pi\\cdot 100\\cdot 120}{360} = \\dfrac{100\\pi}{3} \\approx 104{,}7')} cm².`], ans:`Khoảng ${tb('104{,}7')} cm².`},
 ]},
 {dang:'Tiếp tuyến và hai đường tròn', items:[
  {de:`Cho ${m('(O;\\,7\\text{ cm})')} và ${m('M')} với ${m('OM = 25')} cm. Tính độ dài tiếp tuyến ${m('MA')}.`, sol:[`${m('MA = \\sqrt{625 - 49}')}.`], ans:`${tb('24')} cm.`, lines:2},
  {de:`${m('(O;\\,10\\text{ cm})')} và ${m("(O';\\,6\\text{ cm})")} có ${m("OO' = 4")} cm. Xác định vị trí tương đối.`, sol:[`${m("OO' = 10 - 6 = R - r")}.`], ans:'Tiếp xúc trong.', lines:2},
  {hard:true, de:`Từ ${m('M')} kẻ hai tiếp tuyến ${m('MA, MB')} của ${m('(O;\\,4\\text{ cm})')} sao cho ${m(`${hat('AMB')} = ${dg(90)}`)}. Tứ giác ${m('OAMB')} là hình gì? Tính ${m('OM')}.`,
   sol:[`Tứ giác ${m('OAMB')} có ba góc vuông (tại ${m('A, M, B')}) nên là hình chữ nhật; lại có ${m('OA = OB')} nên là hình vuông.`, `${m('OM')} là đường chéo hình vuông cạnh 4 cm.`], ans:`Hình vuông; ${tb('OM = 4\\sqrt{2}')} cm.`},
  {hard:true, de:`${m('(O;\\,9\\text{ cm})')} và ${m("(O';\\,4\\text{ cm})")} tiếp xúc ngoài tại ${m('A')}. Tiếp tuyến chung ngoài ${m('BC')} (${m("B \\in (O),\\ C \\in (O')")}). Tính ${m('BC')}.`, fig:F_common(),
   sol:[`${m("OO' = 9 + 4 = 13")} cm; ${m("OB \\perp BC,\\ O'C \\perp BC")} nên ${m("OB \\parallel O'C")}.`, `Kẻ ${m("O'K \\perp OB")} (${m('K \\in OB')}): ${m("BCO'K")} là hình chữ nhật, ${m('OK = 9 - 4 = 5')} cm.`, `${m("BC = O'K = \\sqrt{13^2 - 5^2}")}.`], ans:`${tb('BC = 12')} cm.`},
 ]},
]);
})();

/* =====================================================================
   ÔN THI TUYỂN SINH – HÌNH HỌC 1. TIẾP TUYẾN CỦA ĐƯỜNG TRÒN
   20 bài: 14 cơ bản + 6 vận dụng (★), lời giải ghi rõ căn cứ.
   ===================================================================== */
(() => {
const m=tm;
const at=(r,a)=>[r*Math.cos(a*Math.PI/180),r*Math.sin(a*Math.PI/180)];
const F=()=>{const O=[0,0],A=[2.5,3],B=[2.5,-3],M=[6.1,0],H=[2.5,0];return circleSVG({C:[{x:0,y:0,r:Math.sqrt(15.25),lab:'O'}],P:[[...A,'A'],[...B,'B'],[...M,'M'],[...H,'H',-70]],S:[[...M,...A],[...M,...B],[...O,...A],[...O,...B],[...A,...B],[...O,...M,true]]});};
Lecture.addPractice('lop9','on-thi-tiep-tuyen',[
 {dang:'Nhận biết và chứng minh tiếp tuyến',items:[
  {de:`Cho ${m('(O;\\,5\\text{ cm})')} và đường thẳng ${m('d')} cách ${m('O')} một khoảng ${m('5')} cm. Chứng minh ${m('d')} là tiếp tuyến của ${m('(O)')}.`,sol:[`Gọi ${m('H')} là chân đường vuông góc từ ${m('O')} xuống ${m('d')}; khi đó ${m('OH=5=R')}.`,`Khoảng cách từ tâm đến đường thẳng bằng bán kính nên ${m('d')} tiếp xúc với ${m('(O)')} tại ${m('H')}.`],ans:`${m('d')} là tiếp tuyến của ${m('(O)')}.`,lines:4},
  {de:`Cho tam giác ${m('ABC')} có ${m('AB=9')} cm, ${m('AC=12')} cm, ${m('BC=15')} cm. Chứng minh ${m('AB')} là tiếp tuyến của đường tròn ${m('(C;\\,CA)')}.`,sol:[`${m('AB^2+AC^2=9^2+12^2=225=BC^2')}, nên tam giác ${m('ABC')} vuông tại ${m('A')} theo Pythagore đảo.`,`Suy ra ${m('AB\\perp AC')}. Vì ${m('A\\in(C;\\,CA)')}, ${m('AB')} là tiếp tuyến tại ${m('A')}.`],lines:5},
  {de:`Cho ${m('A\\in(O)')}. Đường thẳng ${m('a')} đi qua ${m('A')} và ${m('\\widehat{OAx}=90^\\circ')} với tia ${m('Ax\\subset a')}. Hãy kết luận vị trí của ${m('a')} đối với ${m('(O)')}.`,sol:[`${m('OA\\perp a')} tại ${m('A')}.`,`Đường thẳng đi qua một điểm của đường tròn và vuông góc với bán kính tại điểm đó là tiếp tuyến.`],ans:`${m('a')} là tiếp tuyến của ${m('(O)')} tại ${m('A')}.`,lines:4},
 ]},
 {dang:'Tam giác vuông tạo bởi một tiếp tuyến',items:[
  {de:`Từ ${m('M')} kẻ tiếp tuyến ${m('MA')} đến ${m('(O;\\,6\\text{ cm})')}. Biết ${m('OM=10')} cm. Tính ${m('MA')}.`,sol:[`${m('OA\\perp MA')} nên tam giác ${m('OAM')} vuông tại ${m('A')}.`,`${m('MA=\\sqrt{OM^2-OA^2}=\\sqrt{100-36}=8')} cm.`],ans:`${tb('8')} cm.`,lines:4},
  {de:`${m('MA')} là tiếp tuyến của ${m('(O)')} tại ${m('A')}. Biết ${m('OA=8')} cm, ${m('MA=15')} cm. Tính ${m('OM')}.`,sol:[`Tam giác ${m('OAM')} vuông tại ${m('A')}.`,`${m('OM=\\sqrt{OA^2+MA^2}=\\sqrt{64+225}=17')} cm.`],ans:`${tb('17')} cm.`,lines:4},
  {de:`${m('MA')} là tiếp tuyến của ${m('(O)')} tại ${m('A')}. Biết ${m('OM=25')} cm, ${m('MA=24')} cm. Tính bán kính.`,sol:[`${m('OA\\perp MA')}; áp dụng Pythagore trong tam giác ${m('OAM')}.`,`${m('R=OA=\\sqrt{OM^2-MA^2}=\\sqrt{625-576}=7')} cm.`],ans:`${tb('7')} cm.`,lines:4},
 ]},
 {dang:'Hai tiếp tuyến cắt nhau',items:[
  {de:`Từ ${m('M')} kẻ hai tiếp tuyến ${m('MA,MB')} của ${m('(O)')}. Biết ${m('MA=13')} cm. Tính ${m('MB')}.`,sol:[`Hai tiếp tuyến xuất phát từ cùng một điểm ngoài có độ dài bằng nhau: ${m('MA=MB')}.`],ans:`${tb('MB=13')} cm.`,lines:3},
  {de:`Hai tiếp tuyến ${m('MA,MB')} của ${m('(O)')} tạo thành góc ${m('70^\\circ')}. Tính ${m('\\widehat{AOB}')}.`,sol:[`Tứ giác ${m('OAMB')} có ${m('\\widehat{OAM}=\\widehat{OBM}=90^\\circ')}.`,`Vì tổng bốn góc của tứ giác bằng ${m('360^\\circ')}, ${m('\\widehat{AOB}=180^\\circ-70^\\circ=110^\\circ')}.`],ans:`${tb('110^\\circ')}.`,lines:4},
  {de:`Từ ${m('M')} kẻ hai tiếp tuyến ${m('MA,MB')} của ${m('(O)')}. Biết ${m('\\widehat{AOB}=124^\\circ')}. Tính ${m('\\widehat{AMB}')} và ${m('\\widehat{AMO}')}.`,sol:[`${m('\\widehat{AMB}=180^\\circ-124^\\circ=56^\\circ')}.`,`Vì ${m('MO')} là tia phân giác của ${m('\\widehat{AMB}')}, ${m('\\widehat{AMO}=28^\\circ')}.`],ans:`${tb('\\widehat{AMB}=56^\\circ;\\ \\widehat{AMO}=28^\\circ')}.`,lines:4},
 ]},
 {dang:'Dây tiếp điểm',items:[
  {de:`Từ ${m('M')} kẻ hai tiếp tuyến ${m('MA,MB')} của ${m('(O)')}; ${m('H=OM\\cap AB')}. Chứng minh ${m('OM\\perp AB')} và ${m('HA=HB')}.`,fig:F(),sol:[`${m('OA=OB')} vì là bán kính, nên ${m('O')} thuộc đường trung trực của ${m('AB')}.`,`${m('MA=MB')} vì là hai tiếp tuyến xuất phát từ ${m('M')}, nên ${m('M')} cũng thuộc đường trung trực của ${m('AB')}.`,`Vậy ${m('OM')} là đường trung trực của ${m('AB')}; suy ra ${m('OM\\perp AB')} và ${m('HA=HB')}.`],lines:6},
  {de:`Cho ${m('(O;\\,6\\text{ cm})')}, ${m('OM=10')} cm. Từ ${m('M')} kẻ hai tiếp tuyến ${m('MA,MB')}; ${m('H=OM\\cap AB')}. Tính ${m('OH')}.`,fig:F(),sol:[`${m('OM\\perp AB')} nên ${m('AH')} là đường cao ứng với cạnh huyền của tam giác vuông ${m('OAM')}.`,`Theo hệ thức lượng: ${m('OA^2=OH\\cdot OM')}.`,`Suy ra ${m('OH=6^2/10=3{,}6')} cm.`],ans:`${tb('3{,}6')} cm.`,lines:5},
  {hard:true,de:`Cho ${m('(O;\\,10\\text{ cm})')}, ${m('OM=12{,}5')} cm. Hai tiếp tuyến từ ${m('M')} tiếp xúc tại ${m('A,B')}. Tính độ dài dây tiếp điểm ${m('AB')}.`,fig:F(),sol:[`${m('MA=\\sqrt{OM^2-OA^2}=\\sqrt{12{,}5^2-10^2}=7{,}5')} cm.`,`Gọi ${m('H=OM\\cap AB')}. Ta có ${m('OM\\perp AB')} và ${m('AH=HB')}.`,`Trong tam giác vuông ${m('OAM')}, ${m('AH\\cdot OM=OA\\cdot AM')}; do đó ${m('AH=10\\cdot7{,}5/12{,}5=6')} cm.`,`Vậy ${m('AB=2AH=12')} cm.`],ans:`${tb('12')} cm.`},
  {hard:true,de:`Từ ${m('M')} kẻ hai tiếp tuyến ${m('MA,MB')} đến ${m('(O;\\,5\\text{ cm})')}. Biết ${m('AB=8')} cm. Tính ${m('OM')}.`,fig:F(),sol:[`Gọi ${m('H=OM\\cap AB')}; khi đó ${m('AH=AB/2=4')} cm và ${m('OM\\perp AB')}.`,`Tam giác ${m('OHA')} vuông tại ${m('H')}: ${m('OH=\\sqrt{OA^2-AH^2}=\\sqrt{25-16}=3')} cm.`,`Hệ thức lượng trong tam giác vuông ${m('OAM')}: ${m('OA^2=OH\\cdot OM')}.`,`Suy ra ${m('OM=25/3')} cm.`],ans:`${tb('\\dfrac{25}{3}')} cm.`},
 ]},
 {dang:'Tiếp tuyến – cát tuyến',items:[
  {de:`Từ ${m('M')} kẻ tiếp tuyến ${m('MA')} và cát tuyến ${m('MCD')} của ${m('(O)')}. Biết ${m('MC=4')} cm, ${m('MD=9')} cm. Tính ${m('MA')}.`,sol:[`Theo định lí tiếp tuyến–cát tuyến, ${m('MA^2=MC\\cdot MD=4\\cdot9=36')}.`,`Vì ${m('MA\\gt0')}, ${m('MA=6')} cm.`],ans:`${tb('6')} cm.`,lines:4},
  {de:`Từ ${m('M')} kẻ tiếp tuyến ${m('MA')} và cát tuyến ${m('MCD')}. Biết ${m('MA=12')} cm, ${m('MC=8')} cm. Tính ${m('MD')} và ${m('CD')}.`,sol:[`${m('MA^2=MC\\cdot MD')}, nên ${m('MD=144/8=18')} cm.`,`Vì ${m('C')} nằm giữa ${m('M,D')}, ${m('CD=MD-MC=18-8=10')} cm.`],ans:`${tb('MD=18\\text{ cm};\\ CD=10\\text{ cm}')}.`,lines:4},
  {hard:true,de:`Từ ${m('M')} kẻ tiếp tuyến ${m('MA')} và cát tuyến ${m('MCD')} của ${m('(O)')}. Biết ${m('MC=5')} cm, ${m('CD=15')} cm. Tính ${m('MA')}.`,sol:[`Vì ${m('C')} nằm giữa ${m('M,D')}, ${m('MD=MC+CD=20')} cm.`,`Theo định lí tiếp tuyến–cát tuyến, ${m('MA^2=MC\\cdot MD=5\\cdot20=100')}.`,`Suy ra ${m('MA=10')} cm.`],ans:`${tb('10')} cm.`,lines:5},
  {hard:true,de:`Từ ${m('M')} kẻ hai cát tuyến ${m('MAB')} và ${m('MCD')} của cùng một đường tròn. Biết ${m('MA=3')} cm, ${m('MB=12')} cm, ${m('MC=4')} cm. Tính ${m('MD')}.`,sol:[`Kẻ thêm tiếp tuyến ${m('MT')}. Theo định lí tiếp tuyến–cát tuyến, ${m('MT^2=MA\\cdot MB')} và ${m('MT^2=MC\\cdot MD')}.`,`Do đó ${m('MA\\cdot MB=MC\\cdot MD')}.`,`Suy ra ${m('MD=3\\cdot12/4=9')} cm.`],ans:`${tb('9')} cm.`},
 ]},
 {dang:'Chứng minh tổng hợp và cực trị',items:[
  {de:`Từ ${m('M')} ngoài ${m('(O)')} kẻ hai tiếp tuyến ${m('MA,MB')}. Chứng minh bốn điểm ${m('O,A,M,B')} cùng thuộc một đường tròn và xác định đường kính của đường tròn đó.`,fig:F(),sol:[`${m('OA\\perp MA')} và ${m('OB\\perp MB')} nên ${m('\\widehat{OAM}=\\widehat{OBM}=90^\\circ')}.`,`Hai điểm ${m('A,B')} cùng nhìn đoạn ${m('OM')} dưới góc vuông, nên cùng thuộc đường tròn có đường kính ${m('OM')}.`],ans:`Đường tròn đi qua ${m('O,A,M,B')} có đường kính ${tb('OM')}.`,lines:5},
  {hard:true,de:`Cho nửa đường tròn đường kính ${m('AB=10')} cm. Tiếp tuyến tại ${m('A')} và tiếp tuyến tại điểm ${m('M')} trên nửa đường tròn cắt nhau tại ${m('C')}. Chứng minh ${m('CA=CM')} và ${m('OC')} là phân giác của ${m('\\widehat{AOM}')}.`,sol:[`${m('CA,CM')} là hai tiếp tuyến của cùng đường tròn xuất phát từ ${m('C')}, nên ${m('CA=CM')}.`,`Ta có ${m('OA=OM')} (bán kính), ${m('CA=CM')} và ${m('OC')} chung; hai tam giác ${m('OAC,OMC')} bằng nhau theo c.c.c.`,`Suy ra ${m('\\widehat{AOC}=\\widehat{COM}')}; vậy ${m('OC')} là tia phân giác của ${m('\\widehat{AOM}')}.`],lines:7},
  {hard:true,de:`Cho ${m('(O;\\,R)')} và điểm ${m('M')} cố định ở ngoài đường tròn. Một đường thẳng qua ${m('M')} cắt đường tròn tại ${m('C,D')}. Chứng minh tích ${m('MC\\cdot MD')} không đổi khi cát tuyến thay đổi.`,sol:[`Kẻ tiếp tuyến ${m('MA')} đến ${m('(O)')}. Độ dài ${m('MA')} cố định vì ${m('M')} và đường tròn cố định.`,`Với mọi cát tuyến ${m('MCD')}, định lí tiếp tuyến–cát tuyến cho ${m('MC\\cdot MD=MA^2')}.`,`Vế phải không đổi, do đó ${m('MC\\cdot MD')} không đổi và bằng ${m('MA^2=OM^2-R^2')}.`],ans:`${tb('MC\\cdot MD=OM^2-R^2')}.`,lines:7},
 ]},
]);
})();

/* =====================================================================
   ÔN THI TUYỂN SINH – HÌNH HỌC 2. GÓC Ở TÂM, GÓC NỘI TIẾP
   20 bài: 14 cơ bản + 6 vận dụng (★), lời giải ghi rõ căn cứ.
   ===================================================================== */
(() => {
const m=tm, arc=s=>`\\overset{\\frown}{${s}}`, hat=s=>`\\widehat{${s}}`;
const at=(r,a)=>[r*Math.cos(a*Math.PI/180),r*Math.sin(a*Math.PI/180)];
const Fang=()=>{const A=at(3,150),B=at(3,30),C=at(3,260),D=at(3,220);return circleSVG({C:[{x:0,y:0,r:3,lab:'O'}],P:[[...A,'A'],[...B,'B'],[...C,'C'],[...D,'D']],S:[[0,0,...A],[0,0,...B],[...C,...A],[...C,...B],[...D,...A],[...D,...B]]});};
const Fquad=()=>{const A=at(3,145),B=at(3,35),C=at(3,-45),D=at(3,225);return circleSVG({C:[{x:0,y:0,r:3,lab:'O'}],P:[[...A,'A'],[...B,'B'],[...C,'C'],[...D,'D']],S:[[...A,...B],[...B,...C],[...C,...D],[...D,...A]]});};
Lecture.addPractice('lop9','on-thi-goc-duong-tron',[
 {dang:'Cung và góc ở tâm',items:[
  {de:`Cho góc ở tâm ${m(`${hat('AOB')}=86^\\circ`)}. Tính số đo cung nhỏ và cung lớn ${m('AB')}.`,sol:[`Số đo cung nhỏ bằng số đo góc ở tâm chắn cung đó, nên bằng ${m('86^\\circ')}.`,`Số đo cung lớn bằng ${m('360^\\circ-86^\\circ=274^\\circ')}.`],ans:`Cung nhỏ: ${tb('86^\\circ')}; cung lớn: ${tb('274^\\circ')}.`,lines:4},
  {de:`Trên ${m('(O)')}, tia ${m('OB')} nằm giữa ${m('OA,OC')}; ${m(`${hat('AOB')}=48^\\circ`)}, ${m(`${hat('BOC')}=72^\\circ`)}. Tính số đo cung nhỏ ${m('AC')}.`,sol:[`${m(`${hat('AOC')}=${hat('AOB')}+${hat('BOC')}=48^\\circ+72^\\circ=120^\\circ`)}.`,`Cung nhỏ ${m('AC')} có số đo bằng góc ở tâm ${m(hat('AOC'))}.`],ans:`${tb('120^\\circ')}.`,lines:4},
  {de:`Đường kính ${m('AB')} chia đường tròn thành hai nửa. Điểm ${m('C')} nằm trên một nửa đường tròn và cung nhỏ ${m('AC')} bằng ${m('68^\\circ')}. Tính cung nhỏ ${m('CB')}.`,sol:[`Cung ${m('ACB')} là nửa đường tròn nên có số đo ${m('180^\\circ')}.`,`Do đó ${m(`\\text{sđ}${arc('CB')}=180^\\circ-68^\\circ=112^\\circ`)}.`],ans:`${tb('112^\\circ')}.`,lines:4},
 ]},
 {dang:'Góc nội tiếp và góc cùng chắn cung',items:[
  {de:`Góc nội tiếp ${m(hat('ACB'))} chắn cung ${m('AB')} có số đo ${m('124^\\circ')}. Tính ${m(hat('ACB'))}.`,fig:Fang(),sol:[`Góc nội tiếp bằng nửa số đo cung bị chắn.`,`${m(`${hat('ACB')}=\\dfrac12\\cdot124^\\circ=62^\\circ`)}.`],ans:`${tb('62^\\circ')}.`,lines:4},
  {de:`Góc nội tiếp ${m(`${hat('ADB')}=37^\\circ`)} chắn cung ${m('AB')}. Tính số đo cung ${m('AB')}.`,fig:Fang(),sol:[`Số đo cung bị chắn bằng hai lần số đo góc nội tiếp.`,`${m(`\\text{sđ}${arc('AB')}=2\\cdot37^\\circ=74^\\circ`)}.`],ans:`${tb('74^\\circ')}.`,lines:4},
  {de:`Các điểm ${m('A,B,C,D')} cùng thuộc một đường tròn; ${m('C,D')} nằm trên cùng cung ${m('AB')}. Biết ${m(`${hat('ACB')}=46^\\circ`)}. Tính ${m(hat('ADB'))}.`,fig:Fang(),sol:[`${m(hat('ACB'))} và ${m(hat('ADB'))} là hai góc nội tiếp cùng chắn cung ${m('AB')}.`,`Vì vậy hai góc bằng nhau.`],ans:`${tb(`${hat('ADB')}=46^\\circ`)}.`,lines:4},
 ]},
 {dang:'Góc chắn đường kính và tam giác vuông',items:[
  {de:`Tam giác ${m('ABC')} nội tiếp đường tròn có ${m('AB')} là đường kính. Tính ${m(hat('ACB'))}.`,sol:[`Góc ${m(hat('ACB'))} là góc nội tiếp chắn nửa đường tròn ${m('AB')}.`,`Góc nội tiếp chắn nửa đường tròn bằng ${m('90^\\circ')}.`],ans:`${tb('90^\\circ')}.`,lines:3},
  {de:`Tam giác ${m('ABC')} nội tiếp đường tròn có ${m('AB')} là đường kính; ${m(`${hat('CAB')}=34^\\circ`)}. Tính ${m(hat('ABC'))}.`,sol:[`${m(`${hat('ACB')}=90^\\circ`)} vì chắn đường kính ${m('AB')}.`,`Tổng ba góc tam giác bằng ${m('180^\\circ')}, nên ${m(`${hat('ABC')}=180^\\circ-90^\\circ-34^\\circ=56^\\circ`)}.`],ans:`${tb('56^\\circ')}.`,lines:4},
  {hard:true,de:`Tam giác ${m('ABC')} nội tiếp đường tròn có ${m('AB')} là đường kính, ${m('AB=13')} cm, ${m('AC=5')} cm. Tính ${m('BC')} và bán kính đường tròn.`,sol:[`${m(`${hat('ACB')}=90^\\circ`)} vì chắn đường kính; tam giác ${m('ABC')} vuông tại ${m('C')}.`,`Theo Pythagore, ${m('BC=\\sqrt{AB^2-AC^2}=\\sqrt{169-25}=12')} cm.`,`Bán kính bằng nửa đường kính: ${m('R=AB/2=6{,}5')} cm.`],ans:`${tb('BC=12\\text{ cm};\\ R=6{,}5\\text{ cm}')}.`},
 ]},
 {dang:'Tứ giác nội tiếp',items:[
  {de:`Tứ giác ${m('ABCD')} nội tiếp có ${m(`${hat('A')}=72^\\circ`)}. Tính ${m(hat('C'))}.`,fig:Fquad(),sol:[`Hai góc đối của tứ giác nội tiếp bù nhau: ${m(`${hat('A')}+${hat('C')}=180^\\circ`)}.`,`Suy ra ${m(`${hat('C')}=180^\\circ-72^\\circ=108^\\circ`)}.`],ans:`${tb('108^\\circ')}.`,lines:4},
  {de:`Tứ giác ${m('ABCD')} nội tiếp. Tia ${m('Bx')} là tia đối của ${m('BA')}; ${m(`${hat('xBC')}=65^\\circ`)}. Tính ${m(hat('ADC'))}.`,sol:[`Góc ngoài của tứ giác nội tiếp bằng góc trong đối diện.`,`Do đó ${m(`${hat('ADC')}=${hat('xBC')}=65^\\circ`)}.`],ans:`${tb('65^\\circ')}.`,lines:4},
  {de:`Tứ giác ${m('MNPQ')} có ${m(`${hat('M')}=83^\\circ`)}, ${m(`${hat('P')}=97^\\circ`)}. Chứng minh tứ giác nội tiếp được một đường tròn.`,sol:[`${m(`${hat('M')}+${hat('P')}=83^\\circ+97^\\circ=180^\\circ`)}.`,`Tứ giác có tổng hai góc đối bằng ${m('180^\\circ')} nên nội tiếp được một đường tròn.`],lines:4},
  {hard:true,de:`Cho tam giác ${m('ABC')} có hai đường cao ${m('BE,CF')} cắt nhau tại ${m('H')}. Chứng minh tứ giác ${m('AEHF')} nội tiếp và ${m(`${hat('EHF')}+${hat('EAF')}=180^\\circ`)}.`,sol:[`${m('BE\\perp AC')} nên ${m(`${hat('AEH')}=90^\\circ`)}; ${m('CF\\perp AB')} nên ${m(`${hat('AFH')}=90^\\circ`)}.`,`Hai góc đối ${m(hat('AEH'))} và ${m(hat('AFH'))} có tổng ${m('180^\\circ')}; do đó ${m('AEHF')} nội tiếp đường tròn đường kính ${m('AH')}.`,`Hai góc ${m(hat('EHF'))} và ${m(hat('EAF'))} là hai góc đối của tứ giác nội tiếp nên tổng bằng ${m('180^\\circ')}.`],lines:7},
 ]},
 {dang:'Góc tạo bởi tiếp tuyến và dây',items:[
  {de:`Tiếp tuyến tại ${m('A')} tạo với dây ${m('AB')} góc ${m('38^\\circ')}. Tính số đo cung nhỏ ${m('AB')}.`,sol:[`Góc tạo bởi tiếp tuyến và dây bằng nửa số đo cung bị chắn.`,`Vì vậy cung nhỏ ${m('AB')} có số đo ${m('2\\cdot38^\\circ=76^\\circ')}.`],ans:`${tb('76^\\circ')}.`,lines:4},
  {de:`Tiếp tuyến ${m('Ax')} tại ${m('A')} tạo với dây ${m('AB')} góc ${m('44^\\circ')}. Điểm ${m('C')} nằm trên cung lớn ${m('AB')}. Tính ${m(hat('ACB'))}.`,sol:[`${m(hat('xAB'))} là góc tạo bởi tiếp tuyến và dây; ${m(hat('ACB'))} là góc nội tiếp cùng chắn cung nhỏ ${m('AB')}.`,`Hai góc bằng nhau, nên ${m(`${hat('ACB')}=44^\\circ`)}.`],ans:`${tb('44^\\circ')}.`,lines:4},
  {hard:true,de:`Cho tam giác ${m('ABC')} nội tiếp ${m('(O)')}. Tiếp tuyến tại ${m('A')} song song với ${m('BC')}. Chứng minh tam giác ${m('ABC')} cân tại ${m('A')}.`,sol:[`Gọi ${m('Ax')} là tiếp tuyến tại ${m('A')}. Vì ${m('Ax\\parallel BC')}, ${m(`${hat('xAB')}=${hat('ABC')}`)} (so le trong).`,`Theo định lí góc tạo bởi tiếp tuyến và dây, ${m(`${hat('xAB')}=${hat('ACB')}`)} vì cùng chắn cung ${m('AB')}.`,`Suy ra ${m(`${hat('ABC')}=${hat('ACB')}`)}, nên hai cạnh đối diện bằng nhau: ${m('AC=AB')}. Vậy tam giác cân tại ${m('A')}.`],lines:7},
  {hard:true,de:`Cho đường tròn ${m('(O)')} và dây ${m('AB')}. Hai tiếp tuyến tại ${m('A,B')} cắt nhau tại ${m('M')}. Biết cung nhỏ ${m('AB')} bằng ${m('116^\\circ')}. Tính ${m(hat('AMB'))}.`,sol:[`Góc ở tâm chắn cung nhỏ ${m('AB')} là ${m(`${hat('AOB')}=116^\\circ`)}.`,`Bán kính vuông góc với tiếp tuyến nên tứ giác ${m('OAMB')} có hai góc tại ${m('A,B')} bằng ${m('90^\\circ')}.`,`Do đó ${m(`${hat('AMB')}=180^\\circ-${hat('AOB')}=180^\\circ-116^\\circ=64^\\circ`)}.`],ans:`${tb('64^\\circ')}.`},
 ]},
 {dang:'Góc có đỉnh trong hoặc ngoài đường tròn',items:[
  {de:`Hai dây ${m('AB,CD')} cắt nhau tại ${m('E')} trong đường tròn. Biết cung ${m('AC')} bằng ${m('70^\\circ')}, cung ${m('BD')} bằng ${m('50^\\circ')}. Tính ${m(hat('AEC'))}.`,sol:[`Góc có đỉnh trong đường tròn bằng nửa tổng số đo hai cung bị chắn.`,`${m(`${hat('AEC')}=\\dfrac{70^\\circ+50^\\circ}{2}=60^\\circ`)}.`],ans:`${tb('60^\\circ')}.`,lines:4},
  {hard:true,de:`Từ ${m('M')} ngoài đường tròn kẻ hai cát tuyến tạo góc chắn hai cung có số đo ${m('164^\\circ')} và ${m('72^\\circ')}. Tính góc tại ${m('M')}.`,sol:[`Góc có đỉnh ngoài đường tròn bằng nửa hiệu cung lớn và cung nhỏ.`,`${m(`${hat('M')}=\\dfrac{164^\\circ-72^\\circ}{2}=46^\\circ`)}.`],ans:`${tb('46^\\circ')}.`},
  {hard:true,de:`Hai dây ${m('AB,CD')} cắt nhau tại ${m('E')} trong đường tròn. Biết ${m(`${hat('AEC')}=75^\\circ`)} và cung ${m('AC')} bằng ${m('96^\\circ')}. Tính số đo cung ${m('BD')}.`,sol:[`Theo công thức góc có đỉnh trong đường tròn: ${m(`${hat('AEC')}=\\dfrac{\\text{sđ}${arc('AC')}+\\text{sđ}${arc('BD')}}{2}`)}.`,`Suy ra ${m(`150^\\circ=96^\\circ+\\text{sđ}${arc('BD')}`)}.`,`Vậy ${m(`\\text{sđ}${arc('BD')}=54^\\circ`)}.`],ans:`${tb('54^\\circ')}.`},
 ]},
]);
})();

/* =====================================================================
   ÔN THI TUYỂN SINH – HÌNH HỌC 3. HÌNH QUẠT, HÌNH VÀNH KHUYÊN
   20 bài: 14 cơ bản + 6 vận dụng (★), lời giải ghi rõ căn cứ.
   ===================================================================== */
(() => {
const m=tm;
const at=(r,a)=>[r*Math.cos(a*Math.PI/180),r*Math.sin(a*Math.PI/180)];
const Fsec=(n=90)=>circleSVG({C:[{x:0,y:0,r:3,lab:'O'}],sector:{x:0,y:0,r:3,a1:20,a2:20+n},S:[[0,0,...at(3,20),false,'R'],[0,0,...at(3,20+n)]],ang:[[0,0,20,20+n,m(`${n}^\\circ`)]]});
const Fring=()=>circleSVG({C:[{x:0,y:0,r:4,lab:'O'},{x:0,y:0,r:2.2}],ring:{x:0,y:0,r1:4,r2:2.2},S:[[0,0,...at(4,25),false,'R'],[0,0,...at(2.2,205),false,'r']]});
Lecture.addPractice('lop9','on-thi-hinh-quat-vanh-khuyen',[
 {dang:'Độ dài cung và bài toán ngược',items:[
  {de:`Tính độ dài cung ${m('60^\\circ')} của đường tròn bán kính ${m('6')} cm.`,fig:Fsec(60),sol:[`Áp dụng ${m('l=\\dfrac{\\pi Rn}{180}')}.`,`${m('l=\\dfrac{\\pi\\cdot6\\cdot60}{180}=2\\pi')} cm.`],ans:`${tb('2\\pi')} cm.`,lines:4},
  {de:`Một cung tròn bán kính ${m('10')} cm có độ dài ${m('5\\pi')} cm. Tính số đo cung.`,sol:[`${m('5\\pi=\\dfrac{\\pi\\cdot10\\cdot n}{180}')}.`,`Rút gọn ${m('\\pi')} rồi giải: ${m('n=90^\\circ')}.`],ans:`${tb('90^\\circ')}.`,lines:4},
  {de:`Cung ${m('120^\\circ')} có độ dài ${m('10\\pi')} cm. Tính bán kính đường tròn.`,sol:[`${m('10\\pi=\\dfrac{\\pi R\\cdot120}{180}')}.`,`Suy ra ${m('R=10\\cdot180/120=15')} cm.`],ans:`${tb('15')} cm.`,lines:4},
 ]},
 {dang:'Diện tích hình quạt tròn',items:[
  {de:`Tính diện tích hình quạt bán kính ${m('8')} cm, góc ở tâm ${m('90^\\circ')}.`,fig:Fsec(90),sol:[`${m('S=\\dfrac{\\pi R^2n}{360}')}.`,`${m('S=\\dfrac{\\pi\\cdot8^2\\cdot90}{360}=16\\pi')} cm².`],ans:`${tb('16\\pi')} cm².`,lines:4},
  {de:`Hình quạt bán kính ${m('12')} cm có diện tích ${m('24\\pi')} cm². Tính góc ở tâm.`,sol:[`${m('24\\pi=\\dfrac{\\pi\\cdot12^2n}{360}')}.`,`Suy ra ${m('n=60^\\circ')}.`],ans:`${tb('60^\\circ')}.`,lines:4},
  {de:`Hình quạt bán kính ${m('10')} cm có diện tích ${m('20\\pi')} cm². Tính độ dài cung.`,sol:[`Dùng ${m('S=\\dfrac{lR}{2}')}.`,`Suy ra ${m('l=\\dfrac{2S}{R}=\\dfrac{2\\cdot20\\pi}{10}=4\\pi')} cm.`],ans:`${tb('4\\pi')} cm.`,lines:4},
 ]},
 {dang:'Hình vành khuyên',items:[
  {de:`Tính diện tích hình vành khuyên có bán kính ngoài ${m('10')} cm và bán kính trong ${m('6')} cm.`,fig:Fring(),sol:[`${m('S=\\pi(R^2-r^2)')}.`,`${m('S=\\pi(10^2-6^2)=64\\pi')} cm².`],ans:`${tb('64\\pi')} cm².`,lines:4},
  {de:`Hình vành khuyên có bán kính ngoài ${m('13')} cm, diện tích ${m('144\\pi')} cm². Tính bán kính trong.`,sol:[`${m('144\\pi=\\pi(13^2-r^2)')}.`,`Suy ra ${m('r^2=169-144=25')}. Vì bán kính dương, ${m('r=5')} cm.`],ans:`${tb('5')} cm.`,lines:4},
  {de:`Hình vành khuyên có bán kính trong ${m('8')} cm, diện tích ${m('225\\pi')} cm². Tính bán kính ngoài.`,sol:[`${m('225\\pi=\\pi(R^2-8^2)')}.`,`Suy ra ${m('R^2=225+64=289')}; do ${m('R\\gt0')}, ${m('R=17')} cm.`],ans:`${tb('17')} cm.`,lines:4},
  {hard:true,de:`Một lối đi rộng đều ${m('2')} m bao quanh một hồ tròn bán kính ${m('8')} m. Tính diện tích lối đi.`,fig:Fring(),sol:[`Bán kính ngoài gồm bán kính hồ và bề rộng lối đi: ${m('R=8+2=10')} m; bán kính trong ${m('r=8')} m.`,`Diện tích lối đi là diện tích vành khuyên: ${m('S=\\pi(10^2-8^2)=36\\pi')} m².`],ans:`${tb('36\\pi')} m².`},
 ]},
 {dang:'Quạt vành khuyên và hình tô màu',items:[
  {de:`Tính diện tích quạt vành khuyên có bán kính ngoài ${m('10')} cm, bán kính trong ${m('6')} cm và góc ở tâm ${m('90^\\circ')}.`,sol:[`${m('S=\\dfrac{\\pi(R^2-r^2)n}{360}')}.`,`${m('S=\\dfrac{\\pi(10^2-6^2)90}{360}=16\\pi')} cm².`],ans:`${tb('16\\pi')} cm².`,lines:4},
  {de:`Từ hình tròn bán kính ${m('12')} cm, người ta bỏ đi hình quạt ${m('60^\\circ')}. Tính diện tích phần còn lại.`,sol:[`Diện tích hình tròn: ${m('144\\pi')} cm².`,`Diện tích quạt bị bỏ: ${m('\\dfrac{60}{360}\\cdot144\\pi=24\\pi')} cm².`,`Diện tích còn lại: ${m('144\\pi-24\\pi=120\\pi')} cm².`],ans:`${tb('120\\pi')} cm².`,lines:5},
  {hard:true,de:`Một quạt vành khuyên có bán kính ngoài ${m('12')} cm, bán kính trong ${m('6')} cm và góc ở tâm ${m('120^\\circ')}. Tính diện tích và chu vi của hình.`,sol:[`Diện tích: ${m('S=\\dfrac{\\pi(12^2-6^2)120}{360}=36\\pi')} cm².`,`Cung ngoài: ${m('l_1=\\dfrac{\\pi\\cdot12\\cdot120}{180}=8\\pi')} cm; cung trong: ${m('l_2=4\\pi')} cm.`,`Hai cạnh thẳng có tổng độ dài ${m('2(12-6)=12')} cm.`,`Chu vi: ${m('P=8\\pi+4\\pi+12=12\\pi+12')} cm.`],ans:`${tb('S=36\\pi')} cm²; ${tb('P=12\\pi+12')} cm.`},
  {hard:true,de:`Một hình vuông cạnh ${m('10')} cm chứa một phần tư hình tròn bán kính ${m('10')} cm có tâm tại một đỉnh. Tính diện tích phần trong hình vuông nhưng ngoài phần tư hình tròn.`,sol:[`Diện tích hình vuông: ${m('S_v=10^2=100')} cm².`,`Diện tích phần tư hình tròn: ${m('S_q=\\dfrac14\\pi\\cdot10^2=25\\pi')} cm².`,`Phần cần tìm: ${m('S=100-25\\pi')} cm².`],ans:`${tb('100-25\\pi')} cm².`},
 ]},
 {dang:'Chu vi và bài toán thực tế',items:[
  {de:`Tính chu vi hình quạt nửa đường tròn bán kính ${m('7')} cm.`,fig:Fsec(180),sol:[`Cung nửa đường tròn dài ${m('l=\\pi R=7\\pi')} cm.`,`Chu vi hình quạt gồm cung và hai bán kính: ${m('P=7\\pi+14')} cm.`],ans:`${tb('7\\pi+14')} cm.`,lines:4},
  {de:`Một bồn hoa hình quạt ${m('90^\\circ')} bán kính ${m('10')} m được rào quanh toàn bộ biên. Lấy ${m('\\pi\\approx3{,}14')}. Tính chiều dài hàng rào.`,sol:[`Độ dài cung: ${m('l=5\\pi\\approx15{,}7')} m.`,`Cộng hai bán kính: ${m('P=15{,}7+20=35{,}7')} m.`],ans:`${tb('35{,}7')} m.`,lines:4},
  {hard:true,de:`Một vòi phun quay góc ${m('120^\\circ')} và phun xa ${m('9')} m. Tính diện tích mặt đất được tưới và độ dài cung ngoài của vùng tưới, lấy ${m('\\pi\\approx3{,}14')}; làm tròn đến hàng phần mười.`,sol:[`Vùng tưới là hình quạt bán kính ${m('9')} m, góc ${m('120^\\circ')}.`,`Diện tích: ${m('S=\\dfrac{120}{360}\\pi\\cdot9^2=27\\pi\\approx84{,}8')} m².`,`Độ dài cung: ${m('l=\\dfrac{\\pi\\cdot9\\cdot120}{180}=6\\pi\\approx18{,}8')} m.`],ans:`Khoảng ${tb('84{,}8')} m² và ${tb('18{,}8')} m.`},
 ]},
 {dang:'Tỉ lệ và bài toán tổng hợp',items:[
  {de:`Hai hình quạt có cùng góc ở tâm. Bán kính hình thứ hai gấp ${m('2')} lần hình thứ nhất. Diện tích hình thứ hai gấp bao nhiêu lần?`,sol:[`Với góc ở tâm không đổi, diện tích hình quạt tỉ lệ với bình phương bán kính.`,`Tỉ số diện tích là ${m('2^2=4')}.`],ans:`${tb('4')} lần.`,lines:4},
  {hard:true,de:`Một hình quạt có diện tích ${m('54\\pi')} cm² và độ dài cung ${m('6\\pi')} cm. Tính bán kính và góc ở tâm.`,sol:[`Dùng ${m('S=\\dfrac{lR}{2}')}: ${m('54\\pi=\\dfrac{6\\pi\\cdot R}{2}=3\\pi R')}, nên ${m('R=18')} cm.`,`Dùng ${m('l=\\dfrac{\\pi Rn}{180}')}: ${m('6\\pi=\\dfrac{\\pi\\cdot18n}{180}')}.`,`Suy ra ${m('n=60^\\circ')}.`],ans:`${tb('R=18')} cm; ${tb('n=60^\\circ')}.`},
  {hard:true,de:`Một hình vành khuyên có diện tích ${m('96\\pi')} cm². Bán kính ngoài hơn bán kính trong ${m('4')} cm. Tính hai bán kính.`,sol:[`Gọi bán kính ngoài, trong lần lượt là ${m('R,r')}. Ta có ${m('R-r=4')}.`,`Từ diện tích: ${m('R^2-r^2=96')}, hay ${m('(R-r)(R+r)=96')}.`,`Thay ${m('R-r=4')} được ${m('R+r=24')}. Giải hệ ${m('R-r=4,\\ R+r=24')} được ${m('R=14,r=10')}.`],ans:`Bán kính ngoài ${tb('14')} cm; bán kính trong ${tb('10')} cm.`},
 ]},
]);

/* ---------- Đại số 1. Hàm số y = ax² và đồ thị – 5 dạng × 2 câu tương tự ---------- */
Lecture.addPractice('lop9','on-thi-ham-so-parabol',[
 {dang:'Điểm thuộc parabol, tìm a, tìm m',items:[
  {de:`Cho ${m('(P):\\; y = -2x^2')}. Trong các điểm ${m('A(2;\\,-8)')}, ${m('B(-1;\\,2)')}, ${m('C(3;\\,-12)')}, ${m('D(-2;\\,8)')}, điểm nào thuộc ${m('(P)')}?`,
   sol:[`Với ${m('x = 2')}: ${m('y = -2\\cdot 2^2 = -8')}, khớp với ${m('A')}.`,`${m('B')}: ${m('y(-1) = -2')} (khác ${m('2')}); ${m('C')}: ${m('y(3) = -18')} (khác ${m('-12')}); ${m('D')}: ${m('y(-2) = -8')} (khác ${m('8')}).`],ans:`Chỉ ${tb('A(2;\\,-8)')} thuộc ${m('(P)')}.`,lines:2},
  {hard:true,de:`Biết ${m('(P):\\; y = ax^2')} đi qua ${m('A(-2;\\,-12)')}. a) Tìm ${m('a')}. b) Tìm ${m('m')} để điểm ${m('B(m;\\,-27)')} thuộc ${m('(P)')}.`,
   sol:[`a) Thay ${m('x = -2,\\ y = -12')}: ${m('-12 = a\\cdot 4')}, suy ra ${m('a = -3')}.`,`b) ${m('(P):\\; y = -3x^2')}. ${m('B')} thuộc ${m('(P)')} nên ${m('-27 = -3m^2')}, tức ${m('m^2 = 9')}.`],ans:`a) ${tb('a = -3')}. b) ${tb('m = 3')} hoặc ${tb('m = -3')}.`,lines:3},
 ]},
 {dang:'Bảng giá trị và vẽ đồ thị',items:[
  {de:`Lập bảng giá trị với ${m('x = -4;\\,-2;\\,0;\\,2;\\,4')} và vẽ đồ thị ${m('(P):\\; y = \\dfrac{1}{2}x^2')}.`,
   draw:{x:[-4,4],y:[-1,8]},fig:ParabFig(1,2,[[-4,8],[-2,2],[0,0],[2,2],[4,8]]),
   sol:[`Bảng giá trị: ${m('x = -4;\\,-2;\\,0;\\,2;\\,4')} cho ${m('y = 8;\\,2;\\,0;\\,2;\\,8')}.`,`Chấm các điểm rồi nối bằng đường cong trơn, nhận ${m('Oy')} làm trục đối xứng.`],ans:`${tb('(P)')} là parabol quay lên, đỉnh ${tb('O')}.`,lines:3},
  {de:`Lập bảng giá trị với ${m('x = -3;\\,-2;\\,-1;\\,0;\\,1;\\,2;\\,3')} và vẽ đồ thị ${m('(P):\\; y = -x^2')}.`,
   draw:{x:[-3,3],y:[-9,1]},fig:ParabFig(-1,1,[[-3,-9],[-2,-4],[-1,-1],[0,0],[1,-1],[2,-4],[3,-9]]),
   sol:[`Bảng giá trị: ${m('x = -3;\\,-2;\\,-1;\\,0;\\,1;\\,2;\\,3')} cho ${m('y = -9;\\,-4;\\,-1;\\,0;\\,-1;\\,-4;\\,-9')}.`,`Chấm các điểm và nối thành parabol quay xuống, đi qua ${m('O')}.`],ans:`${tb('(P)')} là parabol quay xuống, đỉnh ${tb('O')}.`,lines:3},
 ]},
 {dang:'Tính chất của đồ thị, so sánh giá trị hàm số',items:[
  {de:`Cho hàm số ${m('y = -2x^2')}. Không dùng máy tính, so sánh ${m('y(-3)')} và ${m('y(2)')}.`,
   sol:[`${m('a = -2 \\lt 0')} nên ${m('x^2')} càng lớn thì ${m('y')} càng nhỏ.`,`${m('(-3)^2 = 9 \\gt 2^2 = 4')}, do đó ${m('y(-3) \\lt y(2)')}. (Kiểm tra: ${m('-18 \\lt -8')}.)`],ans:`${tb('y(-3) \\lt y(2)')}.`,lines:2},
  {hard:true,de:`Cho hàm số ${m('y = 3x^2')}. a) So sánh ${m('y(-4)')} và ${m('y(3)')}. b) Với giá trị nào của ${m('x')} thì hàm số đạt giá trị nhỏ nhất? Giá trị nhỏ nhất bằng bao nhiêu?`,
   sol:[`a) ${m('a = 3 \\gt 0')}, ${m('(-4)^2 = 16 \\gt 3^2 = 9')} nên ${m('y(-4) \\gt y(3)')} (${m('48 \\gt 27')}).`,`b) ${m('y = 3x^2 \\ge 0')} với mọi ${m('x')}, dấu bằng khi ${m('x = 0')}.`],ans:`a) ${tb('y(-4) \\gt y(3)')}. b) ${tb('y_{\\min} = 0')} khi ${tb('x = 0')}.`,lines:3},
 ]},
 {dang:'Đọc đồ thị, tìm hệ số a',items:[
  {de:`Parabol ${m('(P):\\; y = ax^2')} được vẽ như hình, đi qua ${m('A')}. Tìm ${m('a')} và tính tung độ của điểm ${m('B')} thuộc ${m('(P)')} có hoành độ ${m('4')}.`,
   fig:ParabFig(1,2,[[2,2,'A']]),
   sol:[`Từ hình, ${m('A(2;\\,2)')}. Thay vào ${m('y = ax^2')}: ${m('2 = a\\cdot 4')}, suy ra ${m('a = \\dfrac{1}{2}')}.`,`Với ${m('x = 4')}: ${m('y = \\dfrac{1}{2}\\cdot 16 = 8')}.`],ans:`${tb('a = \\dfrac{1}{2}')}; ${tb('y_B = 8')}.`,lines:3},
  {de:`Parabol ${m('(P):\\; y = ax^2')} được vẽ như hình, đi qua ${m('A')}. Tìm ${m('a')} và tính tung độ của điểm ${m('B')} thuộc ${m('(P)')} có hoành độ ${m('3')}.`,
   fig:ParabFig(-1,1,[[-2,-4,'A']]),
   sol:[`Từ hình, ${m('A(-2;\\,-4)')}. Thay vào ${m('y = ax^2')}: ${m('-4 = a\\cdot 4')}, suy ra ${m('a = -1')}.`,`Với ${m('x = 3')}: ${m('y = -1\\cdot 3^2 = -9')}.`],ans:`${tb('a = -1')}; ${tb('y_B = -9')}.`,lines:2},
 ]},
 {dang:'Tìm điểm thuộc parabol theo điều kiện',items:[
  {de:`Cho ${m('(P):\\; y = 2x^2')}. Tìm các điểm thuộc ${m('(P)')} có tung độ bằng ${m('8')}.`,
   sol:[`Gọi ${m('M(x;\\,8)')} thuộc ${m('(P)')}: ${m('2x^2 = 8')}, suy ra ${m('x^2 = 4')}, tức ${m('x = \\pm 2')}.`],ans:`${tb('M_1(2;\\,8)')} và ${tb('M_2(-2;\\,8)')}.`,lines:3},
  {hard:true,de:`Cho ${m('(P):\\; y = \\dfrac{1}{2}x^2')}. Tìm điểm ${m('N')} khác gốc toạ độ thuộc ${m('(P)')} có tung độ gấp ${m('3')} lần hoành độ.`,
   sol:[`${m('N(x;\\,y)')} thuộc ${m('(P)')} nên ${m('y = \\dfrac{1}{2}x^2')}; theo đề ${m('y = 3x')}.`,`${m('\\dfrac{1}{2}x^2 = 3x \\Leftrightarrow x(x - 6) = 0')}. Vì ${m('N \\ne O')} nên ${m('x \\ne 0')}, suy ra ${m('x = 6')}.`,`${m('y = 3\\cdot 6 = 18')}.`],ans:`${tb('N(6;\\,18)')}.`,lines:3},
 ]},
]);


/* ---------- Đại số 2. Phương trình bậc hai, điều kiện có nghiệm và Viète – 5 dạng × 2 câu tương tự ---------- */
Lecture.addPractice('lop9','on-thi-pt-bac-hai-viete',[
 {dang:'Giải phương trình bậc hai',items:[
  {de:`Giải phương trình ${m('2x^2 - 7x + 3 = 0')}.`,
   sol:[`Có ${m('a = 2,\\ b = -7,\\ c = 3')}. ${m('\\Delta = (-7)^2 - 4\\cdot2\\cdot3 = 49 - 24 = 25 \\gt 0')}, ${m('\\sqrt{\\Delta} = 5')}.`,`${m('x_1 = \\dfrac{7 - 5}{4} = \\dfrac{1}{2}')}; ${m('x_2 = \\dfrac{7 + 5}{4} = 3')}.`],ans:`${tb('x = \\dfrac{1}{2}')} hoặc ${tb('x = 3')}.`,lines:3},
  {de:`Giải phương trình ${m('(x + 1)(x + 2) = 12')}.`,
   sol:[`Khai triển: ${m('x^2 + 3x + 2 = 12')}, chuyển vế: ${m('x^2 + 3x - 10 = 0')}.`,`${m('\\Delta = 3^2 - 4\\cdot1\\cdot(-10) = 49 \\gt 0')}, ${m('\\sqrt{\\Delta} = 7')}.`,`${m('x_1 = \\dfrac{-3 - 7}{2} = -5')}; ${m('x_2 = \\dfrac{-3 + 7}{2} = 2')}.`],ans:`${tb('x = -5')} hoặc ${tb('x = 2')}.`,lines:4},
 ]},
 {dang:'Biệt thức Δ và điều kiện về số nghiệm',items:[
  {de:`Tìm ${m('m')} để phương trình ${m('x^2 - 8x + m = 0')} có nghiệm kép. Tìm nghiệm kép đó.`,
   sol:[`${m('\\Delta\' = (-4)^2 - 1\\cdot m = 16 - m')}.`,`Nghiệm kép khi ${m('\\Delta\' = 0')}, suy ra ${m('m = 16')}.`,`Nghiệm kép ${m('x = -\\dfrac{b}{2a} = \\dfrac{8}{2} = 4')}.`],ans:`${tb('m = 16')}, nghiệm kép ${tb('x = 4')}.`,lines:3},
  {de:`Tìm ${m('m')} để phương trình ${m('mx^2 - 6x + 3 = 0')} có hai nghiệm phân biệt.`,
   sol:[`Phương trình bậc hai nên ${m('m \\ne 0')}.`,`${m('\\Delta\' = (-3)^2 - m\\cdot3 = 9 - 3m')}. Hai nghiệm phân biệt khi ${m('\\Delta\' \\gt 0')}, tức ${m('m \\lt 3')}.`,`Kết hợp ${m('m \\ne 0')}.`],ans:`${tb('m \\lt 3')} và ${tb('m \\ne 0')}.`,lines:3},
 ]},
 {dang:'Hệ thức Viète: tổng, tích, giá trị biểu thức',items:[
  {de:`Gọi ${m('x_1, x_2')} là hai nghiệm của ${m('x^2 - 7x + 5 = 0')}. Không giải phương trình, tính ${m('x_1 + x_2')}, ${m('x_1x_2')} và ${m('x_1^2 + x_2^2')}.`,
   sol:[`${m('\\Delta = (-7)^2 - 4\\cdot1\\cdot5 = 29 \\gt 0')} nên phương trình có hai nghiệm phân biệt.`,`Viète: ${m('x_1 + x_2 = 7')}, ${m('x_1x_2 = 5')}.`,`${m('x_1^2 + x_2^2 = (x_1 + x_2)^2 - 2x_1x_2 = 7^2 - 2\\cdot5 = 39')}.`],ans:`${tb('x_1 + x_2 = 7')}; ${tb('x_1x_2 = 5')}; ${tb('x_1^2 + x_2^2 = 39')}.`,lines:4},
  {hard:true,de:`Gọi ${m('x_1, x_2')} là hai nghiệm của ${m('x^2 - 3x - 5 = 0')}. Không giải phương trình, tính ${m('A = x_1^3 + x_2^3')} và ${m('B = (x_1^2 - 1)(x_2^2 - 1)')}.`,
   sol:[`${m('\\Delta = (-3)^2 - 4\\cdot1\\cdot(-5) = 29 \\gt 0')}; Viète: ${m('S = x_1 + x_2 = 3')}, ${m('P = x_1x_2 = -5')}.`,`${m('A = S^3 - 3PS = 3^3 - 3\\cdot(-5)\\cdot3 = 27 + 45 = 72')}.`,`${m('B = (x_1x_2)^2 - (x_1^2 + x_2^2) + 1')}, với ${m('x_1^2 + x_2^2 = S^2 - 2P = 9 + 10 = 19')}.`,`${m('B = (-5)^2 - 19 + 1 = 7')}.`],ans:`${tb('A = 72')}; ${tb('B = 7')}.`,lines:5},
 ]},
 {dang:'Biết một nghiệm; lập phương trình từ nghiệm mới',items:[
  {de:`Biết ${m('x = -2')} là một nghiệm của ${m('x^2 + 5x + m = 0')}. Tìm ${m('m')} và nghiệm còn lại.`,
   sol:[`Thay ${m('x = -2')}: ${m('(-2)^2 + 5\\cdot(-2) + m = 0')}, tức ${m('-6 + m = 0')}, suy ra ${m('m = 6')}.`,`Viète: ${m('x_1 + x_2 = -5')} nên ${m('x_2 = -5 - (-2) = -3')} (kiểm tra: ${m('x_1x_2 = 6')} ✓).`],ans:`${tb('m = 6')}; nghiệm còn lại ${tb('x_2 = -3')}.`,lines:3},
  {hard:true,de:`Gọi ${m('x_1, x_2')} là hai nghiệm của ${m('x^2 - 5x + 2 = 0')}. Lập phương trình bậc hai có <b>hệ số nguyên</b> nhận ${m('\\dfrac{1}{x_1}')} và ${m('\\dfrac{1}{x_2}')} làm nghiệm.`,
   sol:[`${m('\\Delta = (-5)^2 - 4\\cdot1\\cdot2 = 17 \\gt 0')}; Viète: ${m('x_1 + x_2 = 5')}, ${m('x_1x_2 = 2')} (khác 0).`,`${m('S\' = \\dfrac{1}{x_1} + \\dfrac{1}{x_2} = \\dfrac{x_1 + x_2}{x_1x_2} = \\dfrac{5}{2}')}; ${m('P\' = \\dfrac{1}{x_1x_2} = \\dfrac{1}{2}')}.`,`Phương trình: ${m('x^2 - \\dfrac{5}{2}x + \\dfrac{1}{2} = 0')}; nhân hai vế với 2 để hệ số nguyên.`],ans:`${tb('2x^2 - 5x + 1 = 0')}.`,lines:4},
 ]},
 {dang:'Tham số m và hệ thức giữa hai nghiệm',items:[
  {de:`Cho phương trình ${m('x^2 - (2m - 1)x + m - 1 = 0')}. Tìm ${m('m')} để phương trình có hai nghiệm ${m('x_1, x_2')} thoả ${m('x_1 + x_2 = 3x_1x_2')}.`,
   sol:[`${m('\\Delta = (2m - 1)^2 - 4(m - 1) = 4m^2 - 8m + 5 = 4(m - 1)^2 + 1 \\gt 0')} với mọi ${m('m')}, nên phương trình luôn có hai nghiệm phân biệt.`,`Viète: ${m('x_1 + x_2 = 2m - 1')}, ${m('x_1x_2 = m - 1')}.`,`Theo đề: ${m('2m - 1 = 3(m - 1)')}, suy ra ${m('2m - 1 = 3m - 3')}, tức ${m('m = 2')}.`],ans:`${tb('m = 2')}.`,lines:5},
  {hard:true,de:`Cho phương trình ${m('x^2 - 2(m + 1)x + m^2 - 2 = 0')}. Tìm ${m('m')} để phương trình có hai nghiệm phân biệt ${m('x_1, x_2')} thoả ${m('x_1^2 + x_2^2 = 18')}.`,
   sol:[`Điều kiện: ${m('\\Delta\' = (m + 1)^2 - (m^2 - 2) = 2m + 3 \\gt 0')}, tức ${m('m \\gt -\\dfrac{3}{2}')}.`,`Viète: ${m('x_1 + x_2 = 2(m + 1)')}, ${m('x_1x_2 = m^2 - 2')}.`,`${m('x_1^2 + x_2^2 = (x_1 + x_2)^2 - 2x_1x_2 = 4(m + 1)^2 - 2(m^2 - 2) = 2m^2 + 8m + 8')}.`,`Theo đề: ${m('2m^2 + 8m + 8 = 18')}, chia 2: ${m('m^2 + 4m - 5 = 0')}, suy ra ${m('(m - 1)(m + 5) = 0')}, tức ${m('m = 1')} hoặc ${m('m = -5')}.`,`Đối chiếu ${m('m \\gt -\\dfrac{3}{2}')}: nhận ${m('m = 1')}, loại ${m('m = -5')}.`],ans:`${tb('m = 1')}.`,lines:8},
 ]},
]);

/* ---------- Đại số 3. Xác suất đơn giản – 5 dạng × 2 câu tương tự ---------- */
Lecture.addPractice('lop9','on-thi-xac-suat',[
 {dang:'Hộp bi, rút thẻ',items:[
  {de:`Hộp chứa 5 viên bi đỏ, 4 viên bi xanh và 6 viên bi trắng, cùng kích thước. Lấy ngẫu nhiên 1 viên bi. Tính xác suất để viên bi lấy ra có màu xanh hoặc màu trắng.`,
   sol:[`Tổng số bi: ${m('5 + 4 + 6 = 15')}, nên có 15 kết quả cùng khả năng.`,`Số kết quả thuận lợi: ${m('4 + 6 = 10')} (hai màu không có bi chung).`],ans:`${tb('P = \\dfrac{10}{15} = \\dfrac{2}{3}')}.`,lines:2},
  {hard:true,de:`Hộp chứa 4 viên bi đỏ và 3 viên bi xanh, cùng kích thước. Lấy ngẫu nhiên <b>đồng thời</b> 2 viên bi. Tính xác suất để 2 viên bi lấy ra cùng màu.`,
   sol:[`Số cặp bi (không kể thứ tự): ${m('\\dfrac{7\\cdot 6}{2} = 21')} kết quả cùng khả năng.`,`Cặp hai bi đỏ: ${m('\\dfrac{4\\cdot 3}{2} = 6')}; cặp hai bi xanh: ${m('\\dfrac{3\\cdot 2}{2} = 3')}. Số kết quả thuận lợi: ${m('6 + 3 = 9')}.`],ans:`${tb('P = \\dfrac{9}{21} = \\dfrac{3}{7}')}.`,lines:6},
 ]},
 {dang:'Xúc xắc',items:[
  {de:`Tung hai con xúc xắc cân đối, đồng chất. Tính xác suất để tổng số chấm của hai mặt bằng 9.`,
   sol:[`Có ${m('6\\cdot 6 = 36')} kết quả cùng khả năng.`,`Các cặp có tổng 9: ${m('(3;\\,6),(4;\\,5),(5;\\,4),(6;\\,3)')}, tức 4 kết quả.`],ans:`${tb('P = \\dfrac{4}{36} = \\dfrac{1}{9}')}.`,lines:2},
  {de:`Tung hai con xúc xắc cân đối, đồng chất. Tính xác suất để có ít nhất một con xuất hiện mặt 6 chấm.`,
   sol:[`Có 36 kết quả cùng khả năng. Biến cố đối: "không con nào ra 6", mỗi con có 5 mặt, nên có ${m('5\\cdot 5 = 25')} kết quả.`,`Số kết quả thuận lợi: ${m('36 - 25 = 11')}.`],ans:`${tb('P = \\dfrac{11}{36}')}.`,lines:2},
 ]},
 {dang:'Đồng xu và lập số',items:[
  {de:`Tung ba đồng xu cân đối cùng một lúc. Tính xác suất để có đúng một đồng xu ra mặt ngửa.`,
   sol:[`Có ${m('2\\cdot 2\\cdot 2 = 8')} kết quả cùng khả năng.`,`Thuận lợi: SSN, SNS, NSS, tức 3 kết quả.`],ans:`${tb('P = \\dfrac{3}{8}')}.`,lines:2},
  {de:`Từ các chữ số 1, 3, 4, 6, 9 lập ngẫu nhiên một số tự nhiên có hai chữ số khác nhau. Tính xác suất để số lập được lớn hơn 40.`,
   sol:[`Chữ số hàng chục có 5 cách, hàng đơn vị có 4 cách, nên có ${m('5\\cdot 4 = 20')} số.`,`Số lớn hơn 40 có hàng chục là 4, 6 hoặc 9, mỗi trường hợp có 4 cách chọn hàng đơn vị: ${m('3\\cdot 4 = 12')} số.`],ans:`${tb('P = \\dfrac{12}{20} = \\dfrac{3}{5}')}.`,lines:2},
 ]},
 {dang:'Thẻ đánh số từ 1 đến n',items:[
  {de:`Hộp có 25 tấm thẻ giống nhau đánh số từ 1 đến 25. Rút ngẫu nhiên 1 thẻ. Tính xác suất để số trên thẻ là số nguyên tố.`,
   sol:[`Có 25 kết quả cùng khả năng.`,`Các số nguyên tố từ 1 đến 25: 2, 3, 5, 7, 11, 13, 17, 19, 23, tức 9 thẻ (số 1 không nguyên tố).`],ans:`${tb('P = \\dfrac{9}{25}')}.`,lines:2},
  {hard:true,de:`Hộp có 60 tấm thẻ giống nhau đánh số từ 1 đến 60. Rút ngẫu nhiên 1 thẻ. Tính xác suất để số trên thẻ chia hết cho 4 hoặc chia hết cho 6.`,
   sol:[`Có 60 kết quả. Chia hết cho 4: ${m('\\dfrac{60}{4} = 15')} thẻ. Chia hết cho 6: ${m('\\dfrac{60}{6} = 10')} thẻ.`,`Chia hết cho cả 4 và 6 tức chia hết cho 12 (không phải 24): ${m('\\dfrac{60}{12} = 5')} thẻ, bị đếm hai lần.`,`Số kết quả thuận lợi: ${m('15 + 10 - 5 = 20')}. ${m('P = \\dfrac{20}{60} = \\dfrac{1}{3}')}.`],ans:`${tb('\\dfrac{1}{3}')}.`,lines:6},
 ]},
 {dang:'Xác suất thực nghiệm và tìm số bi',items:[
  {de:`Hộp có ${m('x')} viên bi đỏ và 8 viên bi xanh, cùng kích thước. Biết xác suất lấy ngẫu nhiên được bi đỏ là ${m('\\dfrac{3}{7}')}. Tìm ${m('x')}.`,
   sol:[`Tổng số bi: ${m('x + 8')}. Xác suất lấy bi đỏ: ${m('\\dfrac{x}{x + 8} = \\dfrac{3}{7}')}.`,`Nhân chéo: ${m('7x = 3(x + 8)')}, suy ra ${m('4x = 24')}, tức ${m('x = 6')} (thử lại: ${m('\\dfrac{6}{14} = \\dfrac{3}{7}')} ✓).`],ans:`${tb('x = 6')}.`,lines:2},
  {hard:true,de:`Hộp có 4 viên bi đỏ và 8 viên bi xanh, cùng kích thước. Cần bỏ thêm vào hộp bao nhiêu viên bi đỏ (cùng loại) để xác suất lấy ngẫu nhiên được bi đỏ bằng ${m('\\dfrac{3}{5}')}?`,
   sol:[`Gọi ${m('t')} là số bi đỏ thêm vào: có ${m('4 + t')} bi đỏ trong tổng ${m('12 + t')} bi.`,`${m('\\dfrac{4 + t}{12 + t} = \\dfrac{3}{5}')}. Nhân chéo: ${m('5(4 + t) = 3(12 + t)')}, tức ${m('20 + 5t = 36 + 3t')}.`,`Suy ra ${m('2t = 16')}, vậy ${m('t = 8')}.`],ans:`Thêm ${tb('8')} viên bi đỏ.`,lines:6},
 ]},
]);
})();
