/* =====================================================================
   PHIẾU LUYỆN TẬP LỚP 8 – Chương II và Chương III
   Lecture.addPractice(lớp, mã bài, [{dang, items:[{de, sol, ans, fig, hard}]}]) – 70% cơ bản, 30% vận dụng (★).
   Học sinh yếu hình: lời giải ghi rõ căn cứ từng bước. Hình: geoSVG (figures.js).
   ===================================================================== */
(() => {
const m = tm, dg = x => `${x}^\\circ`, h = s => `\\widehat{${s}}`;
const Q4 = ['AB','BC','CD','DA'];
const F_EFGH = () => geoSVG({P:{E:[1,3.2],F:[5.2,3.7],G:[6.2,0],H:[0,0]}, S:['EF','FG','GH','HE',['EG','dash'],['FH','dash']]});
const F_kite = () => geoSVG({P:{A:[3,4.4],B:[5.6,2],C:[3,-1.2],D:[0.4,2]}, S:Q4.concat([['AC','dash']]), T:{AB:1,AD:1,CB:2,CD:2}, A:[['DAB','100°'],['BCD','60°']]});
const F_dike = () => geoSVG({P:{A:[4,3],B:[8,3],C:[12,0],D:[0,0],H:[4,0]}, S:Q4.concat([['AH','dash']]), R:['AHC'], Pa:{AB:1,CD:1}, T:{AD:1,BC:1}, L:{AB:'4 m',CD:'12 m',AH:'3 m'}});
const F_pgO = () => geoSVG({P:{A:[1.6,3],B:[6.8,3],C:[5.2,0],D:[0,0],O:[3.4,1.5],M:[4.6,3],N:[2.2,0]}, S:Q4.concat([['AC','dash'],['BD','dash'],'MN']), Pa:{AB:1,CD:1}});
const F_pgEF = () => geoSVG({P:{A:[1.6,3],B:[6.8,3],C:[5.2,0],D:[0,0],E:[0.8,1.5],F:[6,1.5]}, S:Q4.concat(['EF']), T:{AE:1,ED:1,BF:1,FC:1}, Pa:{AB:1,CD:1}});
const F_mef = () => geoSVG({P:{A:[0,0],B:[6,0],C:[0,4.5],M:[3,2.25],E:[3,0],F:[0,2.25]}, S:['AB','AC','BC',['ME','dash'],['MF','dash'],['EF','dash']], R:['CAB','MEB','MFC']});
const F_sqIn = () => geoSVG({P:{A:[0,4],B:[4,4],C:[4,0],D:[0,0],E:[1,4],F:[4,3],G:[3,0],H:[0,1]}, S:Q4.concat(['EF','FG','GH','HE']), R:['DAB','ABC','BCD','CDA'], T:{AE:1,BF:1,CG:1,DH:1}});

/* =====================================================================  BÀI 6  */
Lecture.addPractice('lop8', 'bai-6', [
 {dang:'Khai triển bằng hằng đẳng thức', items:[
  {de:`Khai triển ${m('(x + 5)^2')}.`,
   sol:[`Áp dụng ${m('(A + B)^2 = A^2 + 2AB + B^2')} với ${m('A = x,\\ B = 5')}.`, `${m('(x + 5)^2 = x^2 + 2\\cdot x\\cdot 5 + 5^2')}.`], ans:`${tb('x^2 + 10x + 25')}.`, lines:3},
  {de:`Khai triển ${m('(3x - 2)^2')}.`,
   sol:[`Áp dụng ${m('(A - B)^2 = A^2 - 2AB + B^2')} với ${m('A = 3x,\\ B = 2')}.`, `${m('(3x - 2)^2 = (3x)^2 - 2\\cdot 3x\\cdot 2 + 2^2')}.`], ans:`${tb('9x^2 - 12x + 4')}.`, lines:3},
  {de:`Khai triển ${m('(2x - 3y)^2')}.`,
   sol:[`Xác định ${m('A = 2x,\\ B = 3y')}; dùng bình phương của một hiệu.`, `${m('(2x - 3y)^2 = (2x)^2 - 2\\cdot 2x\\cdot 3y + (3y)^2')}.`], ans:`${tb('4x^2 - 12xy + 9y^2')}.`, lines:3},
 ]},
 {dang:'Viết thành bình phương hoặc thành tích', items:[
  {de:`Viết ${m('x^2 + 10x + 25')} dưới dạng bình phương của một tổng.`,
   sol:[`${m('x^2 = x^2,\\ 25 = 5^2')} và ${m('10x = 2\\cdot x\\cdot 5')}.`, `Ba hạng tử khớp với ${m('A^2 + 2AB + B^2 = (A + B)^2')}.`], ans:`${tb('(x + 5)^2')}.`, lines:3},
  {de:`Viết ${m('9x^2 - 24xy + 16y^2')} dưới dạng bình phương của một hiệu.`,
   sol:[`${m('9x^2 = (3x)^2,\\ 16y^2 = (4y)^2')}.`, `Hạng tử giữa ${m('-24xy = -2\\cdot 3x\\cdot 4y')}, đúng dạng ${m('A^2 - 2AB + B^2')}.`], ans:`${tb('(3x - 4y)^2')}.`, lines:3},
  {de:`Phân tích ${m('25x^2 - 49')} thành nhân tử.`,
   sol:[`Nhận thấy ${m('25x^2 = (5x)^2')} và ${m('49 = 7^2')}.`, `Áp dụng ${m('A^2 - B^2 = (A - B)(A + B)')}.`], ans:`${tb('(5x - 7)(5x + 7)')}.`, lines:3},
  {hard:true, de:`Phân tích ${m('(x + 2)^2 - 9y^2')} thành nhân tử.`,
   sol:[`Viết ${m('9y^2 = (3y)^2')}, khi đó biểu thức là hiệu hai bình phương với ${m('A = x + 2,\\ B = 3y')}.`, `Áp dụng ${m('A^2 - B^2 = (A - B)(A + B)')}: ${m('(x + 2)^2 - (3y)^2 = [(x + 2) - 3y][(x + 2) + 3y]')}.`], ans:`${tb('(x + 2 - 3y)(x + 2 + 3y)')}.`, lines:4},
 ]},
 {dang:'Tính nhanh, rút gọn và tìm x', items:[
  {de:`Tính nhanh ${m('98\\cdot 102')}.`,
   sol:[`Hai thừa số cách đều ${m('100')}: ${m('98 = 100 - 2,\\ 102 = 100 + 2')}.`, `Dùng ${m('(A - B)(A + B) = A^2 - B^2')}: ${m('98\\cdot 102 = 100^2 - 2^2 = 10000 - 4')}.`], ans:`${tb('9996')}.`, lines:3},
  {hard:true, de:`Rút gọn ${m('A = (x + 3)^2 - (x - 3)^2')}, rồi tính ${m('A')} tại ${m('x = 25')}.`,
   sol:[`Coi biểu thức là hiệu hai bình phương với ${m('U = x + 3,\\ V = x - 3')}.`, `${m('A = (U - V)(U + V) = [(x + 3) - (x - 3)][(x + 3) + (x - 3)]')}.`, `Thu gọn: ${m('A = 6\\cdot 2x = 12x')}. Thay ${m('x = 25')}: ${m('A = 12\\cdot 25')}.`], ans:`${tb('A = 300')}.`, lines:5},
  {hard:true, de:`Tìm ${m('x')}, biết ${m('(x + 4)^2 - (x - 4)^2 = 64')}.`,
   sol:[`Dùng hiệu hai bình phương với ${m('U = x + 4,\\ V = x - 4')}.`, `${m('(U - V)(U + V) = 64')}, tức ${m('[(x + 4) - (x - 4)][(x + 4) + (x - 4)] = 64')}.`, `Thu gọn: ${m('8\\cdot 2x = 64 \\Rightarrow 16x = 64 \\Rightarrow x = 4')}.`], ans:`${tb('x = 4')}.`, lines:5},
 ]},
]);
// Bài 6: 7 bài cơ bản, 3 bài mức khá (đánh dấu ★).

/* =====================================================================  BÀI 7  */
Lecture.addPractice('lop8', 'bai-7', [
 {dang:'Khai triển lập phương của một tổng hoặc một hiệu', items:[
  {de:`Khai triển ${m('(x + 3)^3')}.`,
   sol:[`Áp dụng ${m('(A + B)^3 = A^3 + 3A^2B + 3AB^2 + B^3')} với ${m('A = x,\\ B = 3')}.`, `${m('(x + 3)^3 = x^3 + 3\\cdot x^2\\cdot 3 + 3\\cdot x\\cdot 3^2 + 3^3')}.`], ans:`${tb('x^3 + 9x^2 + 27x + 27')}.`, lines:4},
  {de:`Khai triển ${m('(x - 4)^3')}.`,
   sol:[`Áp dụng ${m('(A - B)^3 = A^3 - 3A^2B + 3AB^2 - B^3')} với ${m('A = x,\\ B = 4')}.`, `${m('(x - 4)^3 = x^3 - 3\\cdot x^2\\cdot 4 + 3\\cdot x\\cdot 4^2 - 4^3')}.`], ans:`${tb('x^3 - 12x^2 + 48x - 64')}.`, lines:4},
  {de:`Khai triển ${m('(2x + 1)^3')}.`,
   sol:[`Xác định ${m('A = 2x,\\ B = 1')}; viết đủ bốn hạng tử theo hệ số ${m('1,3,3,1')}.`, `${m('(2x + 1)^3 = (2x)^3 + 3(2x)^2\\cdot1 + 3(2x)\\cdot1^2 + 1^3')}.`], ans:`${tb('8x^3 + 12x^2 + 6x + 1')}.`, lines:4},
 ]},
 {dang:'Nhận dạng và viết dưới dạng lập phương', items:[
  {de:`Viết ${m('x^3 + 6x^2 + 12x + 8')} dưới dạng lập phương của một tổng.`,
   sol:[`Hạng tử đầu ${m('x^3 = (x)^3')}, hạng tử cuối ${m('8 = 2^3')}, nên chọn ${m('A = x,\\ B = 2')}.`, `Kiểm tra: ${m('3A^2B = 6x^2')} và ${m('3AB^2 = 12x')}; cả hai hạng tử giữa đều khớp.`], ans:`${tb('(x + 2)^3')}.`, lines:4},
  {de:`Viết ${m('8x^3 - 36x^2y + 54xy^2 - 27y^3')} dưới dạng lập phương của một hiệu.`,
   sol:[`${m('8x^3 = (2x)^3,\\ 27y^3 = (3y)^3')}, nên chọn ${m('A = 2x,\\ B = 3y')}.`, `Kiểm tra: ${m('-3A^2B = -3(2x)^2(3y) = -36x^2y')}; ${m('3AB^2 = 3(2x)(3y)^2 = 54xy^2')}.`], ans:`${tb('(2x - 3y)^3')}.`, lines:4},
  {de:`Điền các số còn thiếu: ${m('x^3 - a x^2 + b x - 27 = (x - 3)^3')}. Tìm ${m('a')} và ${m('b')}.`,
   sol:[`Dùng ${m('(x - 3)^3 = x^3 - 3\\cdot x^2\\cdot3 + 3\\cdot x\\cdot3^2 - 3^3')}.`, `Thu gọn: ${m('(x - 3)^3 = x^3 - 9x^2 + 27x - 27')}.`, `So sánh các hệ số tương ứng.`], ans:`${tb('a = 9,\\ b = 27')}.`, lines:4},
  {hard:true, de:`Viết ${m('27x^3 + 54x^2y + 36xy^2 + 8y^3')} dưới dạng lập phương của một tổng.`,
   sol:[`${m('27x^3 = (3x)^3')} và ${m('8y^3 = (2y)^3')}; chọn ${m('A = 3x,\\ B = 2y')}.`, `Hạng tử thứ hai: ${m('3A^2B = 3(3x)^2(2y) = 54x^2y')}.`, `Hạng tử thứ ba: ${m('3AB^2 = 3(3x)(2y)^2 = 36xy^2')}; vậy bốn hạng tử khớp hoàn toàn.`], ans:`${tb('(3x + 2y)^3')}.`, lines:5},
 ]},
 {dang:'Tính giá trị, rút gọn và tìm x', items:[
  {de:`Tính giá trị của ${m('A = x^3 + 3x^2 + 3x + 1')} tại ${m('x = 19')}.`,
   sol:[`Nhận dạng ${m('A = x^3 + 3x^2\\cdot1 + 3x\\cdot1^2 + 1^3 = (x + 1)^3')}.`, `Thay ${m('x = 19')}: ${m('A = (19 + 1)^3 = 20^3')}.`], ans:`${tb('A = 8000')}.`, lines:4},
  {hard:true, de:`Rút gọn ${m('B = (x + 2)^3 - (x - 2)^3')}, rồi tính ${m('B')} tại ${m('x = 3')}.`,
   sol:[`Khai triển: ${m('(x + 2)^3 = x^3 + 6x^2 + 12x + 8')}.`, `${m('(x - 2)^3 = x^3 - 6x^2 + 12x - 8')}.`, `Trừ hai đa thức và đổi dấu toàn bộ ngoặc thứ hai: ${m('B = x^3 + 6x^2 + 12x + 8 - x^3 + 6x^2 - 12x + 8 = 12x^2 + 16')}.`, `Thay ${m('x = 3')}: ${m('B = 12\\cdot3^2 + 16 = 108 + 16')}.`], ans:`${tb('B = 124')}.`, lines:6},
  {hard:true, de:`Tìm ${m('x')}, biết ${m('x^3 - 6x^2 + 12x - 8 = 125')}.`,
   sol:[`Vế trái có dạng lập phương của một hiệu: ${m('x^3 - 6x^2 + 12x - 8 = (x - 2)^3')}.`, `Phương trình trở thành ${m('(x - 2)^3 = 125 = 5^3')}.`, `Hai số có lập phương bằng nhau thì bằng nhau: ${m('x - 2 = 5 \\Rightarrow x = 7')}.`], ans:`${tb('x = 7')}.`, lines:5},
 ]},
]);
// Bài 7: 7 bài cơ bản, 3 bài mức khá (đánh dấu ★).

/* =====================================================================  BÀI 10  */
Lecture.addPractice('lop8', 'bai-10', [
 {dang:'Nhận biết các yếu tố của tứ giác', items:[
  {de:`Cho tứ giác ${m('EFGH')} như hình. Kể tên: hai cặp cạnh đối, hai đường chéo, hai cặp góc đối.`, fig:F_EFGH(),
   sol:[`Cạnh đối: ${m('EF')} và ${m('GH')}; ${m('FG')} và ${m('HE')}.`, `Đường chéo: ${m('EG')} và ${m('FH')}.`, `Góc đối: ${m(h('E'))} và ${m(h('G'))}; ${m(h('F'))} và ${m(h('H'))}.`]},
 ]},
 {dang:'Tính góc của tứ giác', items:[
  {de:`Tứ giác ${m('ABCD')} có ${m(`${h('A')} = 110^\\circ,\\ ${h('B')} = 75^\\circ,\\ ${h('C')} = 90^\\circ`)}. Tính ${m(h('D'))}.`, sol:[`${m(`${h('D')} = 360^\\circ - (110^\\circ + 75^\\circ + 90^\\circ)`)}.`], ans:`${tb(dg(85))}.`, lines:3},
  {de:`Tứ giác ${m('ABCD')} có ${m(`${h('A')} = ${h('B')} = ${h('C')} = 95^\\circ`)}. Tính ${m(h('D'))}.`, sol:[`${m(`${h('D')} = 360^\\circ - 3\\cdot 95^\\circ`)}.`], ans:`${tb(dg(75))}.`, lines:3},
  {de:`Tứ giác ${m('ABCD')} có ${m(`${h('A')} = 60^\\circ,\\ ${h('B')} = 100^\\circ`)} và ${m(`${h('C')} = ${h('D')} + 20^\\circ`)}. Tính ${m(h('C'))}, ${m(h('D'))}.`,
   sol:[`${m(`${h('C')} + ${h('D')} = 360^\\circ - 60^\\circ - 100^\\circ = 200^\\circ`)}.`, `Tổng ${m('200^\\circ')}, hiệu ${m('20^\\circ')}: ${m(`${h('C')} = (200^\\circ + 20^\\circ) : 2 = 110^\\circ`)}.`], ans:`${tb(`${h('C')} = 110^\\circ;\\ ${h('D')} = 90^\\circ`)}.`},
  {de:`Các góc ${m(`${h('A')}, ${h('B')}, ${h('C')}, ${h('D')}`)} của tứ giác tỉ lệ với ${m('2 : 3 : 3 : 4')}. Tính các góc.`, sol:[`Tổng số phần ${m('= 12')}; một phần ${m('= 360^\\circ : 12 = 30^\\circ')}.`], ans:`${tb('60^\\circ;\\ 90^\\circ;\\ 90^\\circ;\\ 120^\\circ')}.`},
  {hard:true, de:`Tứ giác ${m('ABCD')} có ${m(`${h('A')} = ${h('C')} = 90^\\circ`)} và ${m(`${h('B')} = 2\\,${h('D')}`)}. Tính ${m(h('B'))} và ${m(h('D'))}.`,
   sol:[`${m(`${h('B')} + ${h('D')} = 360^\\circ - 90^\\circ - 90^\\circ = 180^\\circ`)}.`, `${m(`2\\,${h('D')} + ${h('D')} = 180^\\circ \\Rightarrow ${h('D')} = 60^\\circ`)}.`], ans:`${tb(`${h('D')} = 60^\\circ;\\ ${h('B')} = 120^\\circ`)}.`},
 ]},
 {dang:'Góc ngoài; tứ giác có các cạnh bằng nhau', items:[
  {de:`Tứ giác ${m('ABCD')} có ${m(`${h('C')} = 128^\\circ`)}. Tính góc ngoài tại ${m('C')}.`, sol:[`Góc ngoài ${m('= 180^\\circ - 128^\\circ')}.`], ans:`${tb(dg(52))}.`, lines:2},
  {de:`Tứ giác ${m('ABCD')} có ${m(`${h('A')} = ${h('B')} = 90^\\circ,\\ ${h('C')} = 70^\\circ`)}. Tính ${m(h('D'))} và góc ngoài tại ${m('D')}.`, sol:[`${m(`${h('D')} = 360^\\circ - 90^\\circ - 90^\\circ - 70^\\circ = 110^\\circ`)}.`, `Góc ngoài tại ${m('D')}: ${m('180^\\circ - 110^\\circ = 70^\\circ')}.`]},
  {hard:true, de:`Góc ngoài tại ${m('A, B, C')} của tứ giác ${m('ABCD')} lần lượt bằng ${m('100^\\circ,\\ 80^\\circ,\\ 110^\\circ')}. Tính góc ngoài tại ${m('D')} và ${m(h('D'))}.`,
   sol:[`Tổng bốn góc ngoài bằng ${m('360^\\circ')} (vì bằng ${m('4\\cdot 180^\\circ - 360^\\circ')}).`, `Góc ngoài tại ${m('D')}: ${m('360^\\circ - 290^\\circ = 70^\\circ')}; ${m(`${h('D')} = 180^\\circ - 70^\\circ`)}.`], ans:`${tb('70^\\circ')}; ${m(h('D') + ' =')} ${tb(dg(110))}.`},
  {hard:true, de:`Tứ giác ${m('ABCD')} có ${m('AB = AD')}, ${m('CB = CD')}, ${m(`${h('A')} = 100^\\circ,\\ ${h('C')} = 60^\\circ`)}. Chứng minh ${m(`${h('B')} = ${h('D')}`)} và tính hai góc đó.`, fig:F_kite(),
   sol:[`${m('\\triangle ABC')} và ${m('\\triangle ADC')} có ${m('AB = AD')}, ${m('CB = CD')}, ${m('AC')} chung ⇒ bằng nhau (c.c.c) ⇒ ${m(`${h('B')} = ${h('D')}`)}.`, `${m(`${h('B')} + ${h('D')} = 360^\\circ - 100^\\circ - 60^\\circ = 200^\\circ`)}.`], ans:`${m(`${h('B')} = ${h('D')} =`)} ${tb(dg(100))}.`},
 ]},
]);

/* =====================================================================  BÀI 11  */
Lecture.addPractice('lop8', 'bai-11', [
 {dang:'Tính góc của hình thang, hình thang cân', items:[
  {de:`Hình thang ${m('ABCD')} (${m('AB \\parallel CD')}) có ${m(`${h('A')} = 120^\\circ,\\ ${h('C')} = 50^\\circ`)}. Tính ${m(h('D'))} và ${m(h('B'))}.`, sol:[`Hai góc kề một cạnh bên bù nhau: ${m(`${h('D')} = 180^\\circ - 120^\\circ = 60^\\circ`)}; ${m(`${h('B')} = 180^\\circ - 50^\\circ = 130^\\circ`)}.`]},
  {de:`Hình thang cân ${m('ABCD')} (${m('AB \\parallel CD')}) có ${m(`${h('D')} = 70^\\circ`)}. Tính các góc còn lại.`, sol:[`${m(`${h('C')} = ${h('D')} = 70^\\circ`)} (kề đáy ${m('CD')}).`, `${m(`${h('A')} = 180^\\circ - 70^\\circ = 110^\\circ`)} (kề cạnh bên), ${m(`${h('B')} = ${h('A')} = 110^\\circ`)}.`]},
  {de:`Hình thang cân ${m('ABCD')} (${m('AB \\parallel CD')}) có ${m(`${h('A')} = 2\\,${h('D')}`)}. Tính ${m(h('D'))}, ${m(h('A'))}.`, sol:[`${m(`${h('A')} + ${h('D')} = 180^\\circ \\Rightarrow 3\\,${h('D')} = 180^\\circ`)}.`], ans:`${tb(`${h('D')} = 60^\\circ;\\ ${h('A')} = 120^\\circ`)}.`},
 ]},
 {dang:'Tính độ dài trong hình thang cân', items:[
  {de:`Hình thang cân ${m('ABCD')} (${m('AB \\parallel CD')}) có cạnh bên ${m('AD = 7')} cm, đường chéo ${m('AC = 12')} cm. Tính ${m('BC')} và ${m('BD')}.`, sol:[`Hai cạnh bên bằng nhau: ${m('BC = 7')} cm; hai đường chéo bằng nhau: ${m('BD = 12')} cm.`], lines:3},
  {de:`Hình thang cân ${m('ABCD')} có ${m('AB = 5')} cm, ${m('CD = 13')} cm, ${m('AD = 5')} cm. Kẻ đường cao ${m('AH')}. Tính ${m('DH')} và ${m('AH')}.`,
   sol:[`${m('DH = \\dfrac{13 - 5}{2} = 4')} cm.`, `Tam giác ${m('AHD')} vuông tại ${m('H')}: ${m('AH = \\sqrt{25 - 16} = 3')} cm.`]},
  {de:`Hình thang cân có hai đáy ${m('4')} cm, ${m('10')} cm và cạnh bên ${m('5')} cm. Tính chu vi.`, sol:[`${m('4 + 10 + 5 + 5')}.`], ans:`${tb('24')} cm.`, lines:2},
  {hard:true, de:`Hình thang cân ${m('ABCD')} có ${m('AB = 7')} cm, ${m('CD = 17')} cm, đường cao ${m('12')} cm. Tính cạnh bên và chu vi.`,
   sol:[`Kẻ đường cao ${m('AH')}: ${m('DH = \\dfrac{17 - 7}{2} = 5')} cm.`, `${m('AD = \\sqrt{5^2 + 12^2} = 13')} cm.`, `Chu vi: ${m('7 + 17 + 13 + 13 = 50')} cm.`], ans:`Cạnh bên ${tb('13')} cm; chu vi ${tb('50')} cm.`},
  {hard:true, de:`Mặt cắt ngang của một con đê là hình thang cân có đáy dưới ${m('12')} m, đáy trên ${m('4')} m, chiều cao ${m('3')} m. Tính độ dài mái đê (cạnh bên) và diện tích mặt cắt.`, fig:F_dike(),
   sol:[`${m('DH = \\dfrac{12 - 4}{2} = 4')} m; mái đê ${m('AD = \\sqrt{4^2 + 3^2} = 5')} m.`, `Diện tích hình thang: ${m('\\dfrac{(12 + 4)\\cdot 3}{2} = 24')} m².`], ans:`Mái đê ${tb('5')} m; diện tích ${tb('24')} m².`},
 ]},
 {dang:'Chứng minh hình thang cân', items:[
  {de:`Hình thang ${m('ABCD')} (${m('AB \\parallel CD')}) có ${m('AC = BD')}, ${m(`${h('D')} = 65^\\circ`)}. Hình thang đó là hình gì? Tính ${m(h('C'))}.`, sol:[`Hình thang có hai đường chéo bằng nhau là hình thang cân.`, `${m(`${h('C')} = ${h('D')} = 65^\\circ`)}.`]},
  {hard:true, de:`Tam giác ${m('ABC')} cân tại ${m('A')}, ${m(`${h('A')} = 40^\\circ`)}. Lấy ${m('D \\in AB,\\ E \\in AC')} với ${m('AD = AE')}. Chứng minh ${m('BDEC')} là hình thang cân và tính các góc của nó.`,
   sol:[`${m(`${h('ADE')} = ${h('ABC')} = \\dfrac{180^\\circ - 40^\\circ}{2} = 70^\\circ`)} (hai tam giác cân) ⇒ ${m('DE \\parallel BC')} (đồng vị) ⇒ hình thang.`, `${m(`${h('B')} = ${h('C')}`)} ⇒ hình thang cân.`, `${m(`${h('B')} = ${h('C')} = 70^\\circ`)}; ${m(`${h('BDE')} = ${h('CED')} = 180^\\circ - 70^\\circ = 110^\\circ`)}.`], ans:`Các góc: ${tb('70^\\circ;\\ 70^\\circ;\\ 110^\\circ;\\ 110^\\circ')}.`},
 ]},
]);

/* =====================================================================  BÀI 12  */
Lecture.addPractice('lop8', 'bai-12', [
 {dang:'Tính cạnh, góc, đường chéo', items:[
  {de:`Hình bình hành ${m('ABCD')} có ${m(`${h('B')} = 115^\\circ`)}. Tính các góc còn lại.`, sol:[`${m(`${h('D')} = ${h('B')} = 115^\\circ`)}; ${m(`${h('A')} = 180^\\circ - 115^\\circ = 65^\\circ`)}; ${m(`${h('C')} = 65^\\circ`)}.`]},
  {de:`Hình bình hành ${m('ABCD')} có ${m('AB = 7')} cm, ${m('AD = 4')} cm. Tính chu vi.`, sol:[`Cạnh đối bằng nhau: chu vi ${m('= 2(7 + 4)')}.`], ans:`${tb('22')} cm.`, lines:2},
  {de:`Hình bình hành ${m('ABCD')} có ${m('AC = 10')} cm, ${m('BD = 6')} cm, hai đường chéo cắt nhau tại ${m('O')}. Tính ${m('OA')}, ${m('OD')}.`, sol:[`${m('O')} là trung điểm mỗi đường chéo: ${m('OA = 5')} cm, ${m('OD = 3')} cm.`], lines:2},
  {de:`Hình bình hành ${m('ABCD')} có ${m(`${h('A')} - ${h('B')} = 20^\\circ`)}. Tính ${m(h('A'))} và ${m(h('B'))}.`, sol:[`${m(`${h('A')} + ${h('B')} = 180^\\circ`)} ⇒ ${m(`${h('A')} = 100^\\circ,\\ ${h('B')} = 80^\\circ`)}.`]},
 ]},
 {dang:'Chứng minh tứ giác là hình bình hành', items:[
  {de:`Tứ giác ${m('ABCD')} có ${m('AB \\parallel CD')} và ${m('AB = CD')}. Tứ giác đó là hình gì? Vì sao?`, sol:[`Hai cạnh đối vừa song song vừa bằng nhau ⇒ hình bình hành (dấu hiệu 3).`], lines:2},
  {de:`Tam giác ${m('ABC')}, ${m('M')} là trung điểm ${m('BC')}; lấy ${m('D')} sao cho ${m('M')} là trung điểm ${m('AD')}. Chứng minh ${m('ABDC')} là hình bình hành.`, sol:[`Hai đường chéo ${m('AD')} và ${m('BC')} cắt nhau tại trung điểm ${m('M')} của mỗi đường ⇒ hình bình hành.`]},
  {hard:true, de:`Hình bình hành ${m('ABCD')}; ${m('E, F')} lần lượt là trung điểm của ${m('AD, BC')}. Chứng minh ${m('ABFE')} là hình bình hành.`, fig:F_pgEF(),
   sol:[`${m('AD \\parallel BC')} ⇒ ${m('AE \\parallel BF')}.`, `${m('AD = BC')} ⇒ ${m('AE = \\dfrac{AD}{2} = \\dfrac{BC}{2} = BF')}.`], ans:`${m('ABFE')} có hai cạnh đối ${m('AE, BF')} song song và bằng nhau ⇒ <b>hình bình hành</b>.`},
  {hard:true, de:`Hình bình hành ${m('ABCD')} có hai đường chéo cắt nhau tại ${m('O')}. Một đường thẳng qua ${m('O')} cắt ${m('AB, CD')} lần lượt tại ${m('M, N')}. Chứng minh ${m('AMCN')} là hình bình hành.`, fig:F_pgO(),
   sol:[`${m('\\triangle OAM')} và ${m('\\triangle OCN')}: ${m('OA = OC')}; ${m(`${h('OAM')} = ${h('OCN')}`)} (so le trong, ${m('AB \\parallel CD')}); ${m(`${h('AOM')} = ${h('CON')}`)} (đối đỉnh) ⇒ bằng nhau (g.c.g) ⇒ ${m('OM = ON')}.`, `Tứ giác ${m('AMCN')} có hai đường chéo ${m('AC, MN')} cắt nhau tại trung điểm ${m('O')} của mỗi đường.`], ans:`${m('AMCN')} là <b>hình bình hành</b>.`},
 ]},
 {dang:'Tìm x', items:[
  {de:`Hình bình hành ${m('ABCD')} có ${m('AD = 3x - 2')} (cm), ${m('BC = x + 6')} (cm). Tìm ${m('x')} và ${m('AD')}.`, sol:[`${m('AD = BC \\Rightarrow 3x - 2 = x + 6 \\Rightarrow x = 4')}.`], ans:`${tb('x = 4;\\ AD = 10')} cm.`, lines:3},
  {hard:true, de:`Hình bình hành ${m('ABCD')} có ${m(`${h('A')} = 2x + 10`)} và ${m(`${h('B')} = 3x - 5`)} (đơn vị độ). Tìm ${m('x')} và các góc.`,
   sol:[`${m(`${h('A')} + ${h('B')} = 180^\\circ \\Rightarrow 5x + 5 = 180 \\Rightarrow x = 35`)}.`, `${m(`${h('A')} = 80^\\circ,\\ ${h('B')} = 100^\\circ`)}; ${m(`${h('C')} = 80^\\circ,\\ ${h('D')} = 100^\\circ`)}.`], ans:`${tb('x = 35')}.`},
 ]},
]);
// Bài 12: 7 cơ bản (4 + 2 + 1), 3 vận dụng (2 + 1).

/* =====================================================================  BÀI 13  */
Lecture.addPractice('lop8', 'bai-13', [
 {dang:'Tính độ dài', items:[
  {de:`Hình chữ nhật ${m('ABCD')} có ${m('AB = 12')} cm, ${m('BC = 5')} cm, hai đường chéo cắt nhau tại ${m('O')}. Tính ${m('AC')} và ${m('OB')}.`, sol:[`${m('AC = \\sqrt{144 + 25} = 13')} cm; ${m('BD = AC')} ⇒ ${m('OB = 6{,}5')} cm.`]},
  {de:`Hình chữ nhật có đường chéo ${m('17')} cm, một cạnh ${m('15')} cm. Tính cạnh còn lại và diện tích.`, sol:[`${m('\\sqrt{289 - 225} = 8')} cm; diện tích ${m('15\\cdot 8 = 120')} cm².`]},
  {de:`Tam giác ${m('ABC')} vuông tại ${m('A')}, ${m('M')} là trung điểm của cạnh huyền ${m('BC = 14')} cm. Tính ${m('AM')}.`, sol:[`Trung tuyến ứng cạnh huyền bằng nửa cạnh huyền: ${m('AM = 7')} cm.`], lines:2},
  {de:`Tam giác ${m('ABC')} vuông tại ${m('A')}, ${m('AB = 9')} cm, ${m('AC = 12')} cm, ${m('M')} là trung điểm ${m('BC')}. Tính ${m('AM')}.`, sol:[`${m('BC = \\sqrt{81 + 144} = 15')} cm; ${m('AM = 7{,}5')} cm.`]},
 ]},
 {dang:'Chứng minh hình chữ nhật', items:[
  {de:`Hình bình hành ${m('ABCD')} có ${m(`${h('A')} = 90^\\circ`)}. Chứng minh ${m('ABCD')} là hình chữ nhật và tính các góc còn lại.`, sol:[`Hình bình hành có một góc vuông là hình chữ nhật.`, `Bốn góc đều bằng ${m('90^\\circ')}.`]},
  {de:`Tứ giác ${m('ABCD')} có ${m(`${h('A')} = ${h('B')} = ${h('C')} = 90^\\circ`)}, ${m('AC = 10')} cm. Tính ${m('BD')}.`, sol:[`Tứ giác có ba góc vuông là hình chữ nhật ⇒ hai đường chéo bằng nhau: ${m('BD = 10')} cm.`], lines:2},
  {hard:true, de:`Tam giác ${m('ABC')} vuông tại ${m('A')}, ${m('AB = 6')} cm, ${m('AC = 8')} cm, ${m('M')} là trung điểm ${m('BC')}, ${m('D')} đối xứng với ${m('A')} qua ${m('M')}. Chứng minh ${m('ABDC')} là hình chữ nhật và tính ${m('AD')}.`,
   sol:[`${m('M')} là trung điểm ${m('BC')} và ${m('AD')} ⇒ ${m('ABDC')} là hình bình hành; có ${m(`${h('A')} = 90^\\circ`)} ⇒ hình chữ nhật.`, `${m('AD = BC = \\sqrt{36 + 64} = 10')} cm.`], ans:`${tb('AD = 10')} cm.`},
  {hard:true, de:`Tam giác ${m('ABC')} vuông tại ${m('A')}, ${m('AB = 12')} cm, ${m('AC = 16')} cm, ${m('M')} là trung điểm ${m('BC')}; ${m('E, F')} là chân đường vuông góc kẻ từ ${m('M')} đến ${m('AB, AC')}. Chứng minh ${m('AEMF')} là hình chữ nhật và tính ${m('EF')}.`, fig:F_mef(),
   sol:[`${m('AEMF')} có ba góc vuông ${m('A, E, F')} ⇒ hình chữ nhật.`, `${m('EF = AM')} (hai đường chéo hình chữ nhật); ${m('BC = 20')} cm ⇒ ${m('AM = 10')} cm.`], ans:`${tb('EF = 10')} cm.`},
 ]},
 {dang:'Bài toán thực tế', items:[
  {de:`Một khung ảnh có hai cặp cạnh đối đo được ${m('30')} cm và ${m('20')} cm; hai đường chéo đều dài ${m('36')} cm. Khung ảnh có dạng hình chữ nhật không?`, sol:[`Các cạnh đối bằng nhau ⇒ hình bình hành; hai đường chéo bằng nhau ⇒ hình chữ nhật.`], ans:'<b>Có</b> (xấp xỉ, vì ' + m('\\sqrt{30^2 + 20^2} \\approx 36') + ').'},
  {hard:true, de:`Màn hình ti vi hình chữ nhật dài ${m('80')} cm, rộng ${m('60')} cm. Tính đường chéo và cho biết đó là ti vi khoảng bao nhiêu inch (${m('1')} inch ${m('= 2{,}54')} cm)?`,
   sol:[`Đường chéo ${m('= \\sqrt{80^2 + 60^2} = 100')} cm.`, `${m('100 : 2{,}54 \\approx 39{,}4')} inch.`], ans:`Khoảng ${tb('39')} inch.`},
 ]},
]);

/* =====================================================================  BÀI 14  */
Lecture.addPractice('lop8', 'bai-14', [
 {dang:'Tính toán trong hình thoi', items:[
  {de:`Hình thoi ${m('ABCD')} có ${m('AC = 16')} cm, ${m('BD = 12')} cm. Tính cạnh và chu vi.`, sol:[`${m('OA = 8,\\ OB = 6')}; ${m('AB = \\sqrt{64 + 36} = 10')} cm; chu vi ${m('40')} cm.`]},
  {de:`Hình thoi ${m('ABCD')} có ${m(`${h('A')} = 70^\\circ`)}. Tính các góc còn lại và ${m(h('BAC'))}.`, sol:[`${m(`${h('C')} = 70^\\circ,\\ ${h('B')} = ${h('D')} = 110^\\circ`)}.`, `${m('AC')} là phân giác góc ${m('A')}: ${m(`${h('BAC')} = 35^\\circ`)}.`]},
  {de:`Hình thoi cạnh ${m('13')} cm có một đường chéo ${m('24')} cm. Tính đường chéo còn lại.`, sol:[`Nửa đường chéo đã biết ${m('= 12')}; nửa còn lại ${m('= \\sqrt{169 - 144} = 5')}.`], ans:`${tb('10')} cm.`},
  {hard:true, de:`Hình thoi ${m('ABCD')} cạnh ${m('8')} cm có ${m(`${h('BAD')} = 60^\\circ`)}. Tính ${m('BD')} và ${m('AC')}.`,
   sol:[`Tam giác ${m('ABD')} cân có góc ${m('60^\\circ')} ⇒ đều ⇒ ${m('BD = 8')} cm, ${m('OB = 4')} cm.`, `${m('OA = \\sqrt{64 - 16} = 4\\sqrt{3}')} ⇒ ${m('AC = 8\\sqrt{3}')} cm.`], ans:`${tb('BD = 8;\\ AC = 8\\sqrt{3}')} (cm).`},
 ]},
 {dang:'Tính toán trong hình vuông', items:[
  {de:`Hình vuông cạnh ${m('6')} cm. Tính chu vi, diện tích và đường chéo.`, sol:[`Chu vi ${m('24')} cm; diện tích ${m('36')} cm²; đường chéo ${m('6\\sqrt{2}')} cm.`]},
  {de:`Hình vuông có đường chéo ${m('10')} cm. Tính diện tích.`, sol:[`${m('2a^2 = 100 \\Rightarrow a^2 = 50')}.`], ans:`${tb('50')} cm².`, lines:2},
  {hard:true, de:`Một mảnh vườn hình vuông có đường chéo ${m('20')} m. Tính diện tích và độ dài cạnh (làm tròn đến hàng phần mười).`,
   sol:[`${m('2a^2 = 400 \\Rightarrow a^2 = 200')} ⇒ diện tích ${m('200')} m².`, `${m('a = \\sqrt{200} = 10\\sqrt{2} \\approx 14{,}1')} m.`], ans:`${tb('200')} m²; cạnh ${tb('\\approx 14{,}1')} m.`},
 ]},
 {dang:'Nhận biết, chứng minh hình thoi, hình vuông', items:[
  {de:`Hình bình hành ${m('ABCD')} có ${m('AB = BC')}. Đó là hình gì? Vì sao?`, sol:[`Hình bình hành có hai cạnh kề bằng nhau là hình thoi.`], lines:2},
  {de:`Hình chữ nhật ${m('ABCD')} có ${m('AC \\perp BD')}. Đó là hình gì? Vì sao?`, sol:[`Hình chữ nhật có hai đường chéo vuông góc là hình vuông.`], lines:2},
  {hard:true, de:`Tam giác ${m('ABC')} cân tại ${m('A')}, ${m('AB = 5')} cm, ${m('BC = 6')} cm, ${m('M')} là trung điểm ${m('BC')}, ${m('D')} đối xứng với ${m('A')} qua ${m('M')}. Chứng minh ${m('ABDC')} là hình thoi; tính ${m('AD')} và diện tích hình thoi.`,
   sol:[`${m('ABDC')} là hình bình hành (đường chéo cắt nhau tại trung điểm ${m('M')}) có ${m('AB = AC')} ⇒ hình thoi.`, `${m('AM \\perp BC')}: ${m('AM = \\sqrt{25 - 9} = 4')} ⇒ ${m('AD = 8')} cm.`, `Diện tích hình thoi ${m('= \\dfrac{AD\\cdot BC}{2} = \\dfrac{8\\cdot 6}{2}')}.`], ans:`${tb('AD = 8')} cm; diện tích ${tb('24')} cm².`},
 ]},
]);
// Bài 14: 7 cơ bản (3 + 2 + 2), 3 vận dụng.

/* =====================================================================  ÔN TẬP CHƯƠNG III  */
Lecture.addPractice('lop8', 'on-tap-c3', [
 {dang:'Tính góc', items:[
  {de:`Tứ giác ${m('ABCD')} có ${m(`${h('A')} = 70^\\circ,\\ ${h('B')} = 100^\\circ,\\ ${h('C')} = 120^\\circ`)}. Tính ${m(h('D'))}.`, sol:[`${m('360^\\circ - 290^\\circ')}.`], ans:`${tb(dg(70))}.`, lines:2},
  {de:`Hình bình hành ${m('ABCD')} có ${m(`${h('C')} = 50^\\circ`)}. Tính các góc còn lại.`, sol:[`${m(`${h('A')} = 50^\\circ`)}; ${m(`${h('B')} = ${h('D')} = 130^\\circ`)}.`], lines:2},
  {de:`Hình thang cân ${m('ABCD')} (${m('AB \\parallel CD')}) có ${m(`${h('A')} = 105^\\circ`)}. Tính các góc còn lại.`, sol:[`${m(`${h('B')} = 105^\\circ`)}; ${m(`${h('C')} = ${h('D')} = 75^\\circ`)}.`], lines:2},
 ]},
 {dang:'Tính độ dài, diện tích', items:[
  {de:`Hình chữ nhật có hai cạnh ${m('9')} cm và ${m('12')} cm. Tính đường chéo.`, sol:[`${m('\\sqrt{81 + 144}')}.`], ans:`${tb('15')} cm.`, lines:2},
  {de:`Hình thoi có hai đường chéo ${m('10')} cm và ${m('24')} cm. Tính cạnh.`, sol:[`${m('\\sqrt{5^2 + 12^2}')}.`], ans:`${tb('13')} cm.`, lines:2},
  {de:`Hình vuông cạnh ${m('5')} cm. Tính đường chéo và diện tích.`, sol:[`Đường chéo ${m('5\\sqrt{2}')} cm; diện tích ${m('25')} cm².`], lines:2},
  {hard:true, de:`Hình thang cân có hai đáy ${m('6')} cm, ${m('16')} cm và cạnh bên ${m('13')} cm. Tính đường cao và diện tích.`,
   sol:[`${m('DH = (16 - 6) : 2 = 5')} cm; đường cao ${m('= \\sqrt{169 - 25} = 12')} cm.`, `Diện tích ${m('= \\dfrac{(6 + 16)\\cdot 12}{2}')}.`], ans:`Đường cao ${tb('12')} cm; diện tích ${tb('132')} cm².`},
 ]},
 {dang:'Nhận biết và chứng minh', items:[
  {de:`Điền vào chỗ trống: a) Hình bình hành có hai đường chéo bằng nhau là …; b) Hình bình hành có hai đường chéo vuông góc là …; c) Hình chữ nhật có hai cạnh kề bằng nhau là …`, sol:[`a) hình chữ nhật; b) hình thoi; c) hình vuông.`], lines:3},
  {hard:true, de:`Tam giác ${m('ABC')} vuông tại ${m('A')}, ${m('AB = 9')} cm, ${m('AC = 12')} cm, ${m('M')} là trung điểm ${m('BC')}; ${m('E, F')} là chân đường vuông góc kẻ từ ${m('M')} đến ${m('AB, AC')}. Tứ giác ${m('AEMF')} là hình gì? Tính ${m('EF')}.`, fig:F_mef(),
   sol:[`Ba góc vuông ⇒ hình chữ nhật.`, `${m('EF = AM = \\dfrac{BC}{2} = \\dfrac{15}{2}')}.`], ans:`Hình chữ nhật; ${tb('EF = 7{,}5')} cm.`},
  {hard:true, de:`Cho hình vuông ${m('ABCD')}. Lấy ${m('E, F, G, H')} lần lượt trên ${m('AB, BC, CD, DA')} sao cho ${m('AE = BF = CG = DH')}. Chứng minh ${m('EFGH')} là hình vuông.`, fig:F_sqIn(),
   sol:[`Bốn tam giác vuông ${m('AEH, BFE, CGF, DHG')} có hai cạnh góc vuông tương ứng bằng nhau (${m('AE = BF,\\ AH = BE')}…) ⇒ bằng nhau (c.g.c) ⇒ ${m('HE = EF = FG = GH')} ⇒ ${m('EFGH')} là hình thoi.`, `${m(`${h('AEH')} + ${h('BEF')} = ${h('AEH')} + ${h('AHE')} = 90^\\circ`)} ⇒ ${m(`${h('HEF')} = 90^\\circ`)}.`], ans:`Hình thoi có một góc vuông ⇒ ${m('EFGH')} là <b>hình vuông</b>.`},
 ]},
]);
})();
