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
