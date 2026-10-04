/* =====================================================================
   PHIẾU LUYỆN TẬP LỚP 10 – Chương II (Bất phương trình và hệ bất phương trình bậc nhất hai ẩn)
   Lecture.addPractice(lớp, mã bài, [{dang, items:[{de, sol, ans, fig, draw, hard}]}])
   Tỉ lệ: 70% cơ bản – 30% vận dụng (hard:true, đánh dấu ★). Không nhắc lại lý thuyết.
   planeSVG: lines [a,b,c,nétĐứt,nhãn] là đường ax + by = c; hatch [a,b,c] gạch phần ax + by > c (phần KHÔNG là nghiệm).
   ===================================================================== */
(() => {
const m = tm;
const P = (x, y) => `(${x};\\,${y})`;
const sys = rows => m(`\\begin{cases}${rows.join(' \\\\ ')}\\end{cases}`);

/* ---------- Hình ---------- */
const F_b3_4 = () => planeSVG({x:[-1,5], y:[-1,4], lines:[[1,2,4,false,'d']], hatch:[[1,2,4]], pts:[[4,0,''],[0,2,'']]});                    // x + 2y ≤ 4
const F_b3_5 = () => planeSVG({x:[-2,4], y:[-4,3], lines:[[3,-1,3,true,'d']], hatch:[[-3,1,-3]], pts:[[1,0,''],[0,-3,'']]});                  // 3x − y > 3
const F_b3_6 = () => planeSVG({x:[-1,5], y:[-2,3], lines:[[1,0,2,false,'d']], hatch:[[-1,0,-2]], pts:[[2,0,'']]});                                // x ≥ 2
const F_b3_8 = () => planeSVG({x:[-1,5], y:[-1,4], lines:[[2,3,6,false,'']], hatch:[[-2,-3,-6]], pts:[[3,0,''],[0,2,'']]});                       // 2x + 3y ≥ 6
const F_b4_3 = () => planeSVG({x:[-1,5], y:[-1,5], lines:[[1,1,4,false,'']], hatch:[[-1,0,0],[0,-1,0],[1,1,4]], pts:[[0,0,'O'],[4,0,'A'],[0,4,'B']]});
const F_b4_4 = () => planeSVG({x:[-1,6], y:[-1,5], lines:[[1,2,6,false,'d₁'],[1,0,4,false,'d₂']], hatch:[[-1,0,0],[0,-1,0],[1,2,6],[1,0,4]], pts:[[0,0,'O'],[4,0,'A'],[4,1,'B'],[0,3,'C']]});
const F_b4_9 = () => planeSVG({x:[-1,7], y:[-1,9], lines:[[1,1,6,false,'d₁'],[2,1,8,false,'d₂']], hatch:[[-1,0,0],[0,-1,0],[1,1,6],[2,1,8]], pts:[[0,0,'O'],[4,0,'A'],[2,4,'B'],[0,6,'C']]});
const F_b4_10 = () => planeSVG({x:[-1,10], y:[-1,7], lines:[[1,1,5,false,'d₁'],[1,3,9,false,'d₂']], hatch:[[-1,0,0],[0,-1,0],[-1,-1,-5],[-1,-3,-9]], pts:[[9,0,'A'],[3,2,'B'],[0,5,'C']]});
const F_ot_2 = () => planeSVG({x:[-1,4], y:[-1,5], lines:[[2,1,4,true,'d']], hatch:[[2,1,4]], pts:[[2,0,''],[0,4,'']]});                          // 2x + y < 4
const F_ot_4 = () => planeSVG({x:[-1,5], y:[-1,5], lines:[[1,1,4,false,'d₁'],[0,1,1,false,'d₂']], hatch:[[-1,0,0],[0,-1,-1],[1,1,4]], pts:[[0,1,'A'],[3,1,'B'],[0,4,'C']]});
const F_ot_8 = () => planeSVG({x:[-1,4], y:[-1,4], lines:[[1,1,3,false,'']], hatch:[[-1,0,0],[0,-1,0],[1,1,3]], pts:[[0,0,'O'],[3,0,'A'],[0,3,'B']]});
const F_ot_9 = () => planeSVG({x:[-1,8], y:[-1,8], lines:[[1,2,10,false,'d₁'],[2,1,14,false,'d₂']], hatch:[[-1,0,0],[0,-1,0],[1,2,10],[2,1,14]], pts:[[0,0,'O'],[7,0,'A'],[6,2,'B'],[0,5,'C']]});

/* =====================================================================
   BÀI 3. BẤT PHƯƠNG TRÌNH BẬC NHẤT HAI ẨN
   ===================================================================== */
Lecture.addPractice('lop10', 'bai-3', [
 {dang:'Nhận biết bất phương trình bậc nhất hai ẩn. Kiểm tra nghiệm', items:[
  {de:`Trong các bất phương trình sau, bất phương trình nào là bất phương trình bậc nhất hai ẩn? <br>a) ${m('2x - 3y \\gt 1')}; &nbsp; b) ${m('x^2 + y \\le 2')}; &nbsp; c) ${m('3x + 0y \\ge 5')}; &nbsp; d) ${m('xy - y \\gt 0')}.`,
   sol:[`b) có ${m('x^2')}; d) có ${m('xy')}: không phải bậc nhất.`, `a) và c) có dạng ${m('ax + by \\gt c')} (hoặc ${m('\\ge')}) với ${m('a, b')} không đồng thời bằng 0.`], ans:`Đáp án: ${tb('a) \\text{ và } c)')}.`, lines:3},
  {de:`Cặp số nào là nghiệm của bất phương trình ${m('3x - 2y \\le 6')}? &nbsp; ${m(P(0,0))}; ${m(P(2,'-1'))}; ${m(P(4,3))}; ${m(P(-1,-5))}.`,
   sol:[`${m(P(0,0))}: ${m('0 \\le 6')} đúng.`, `${m(P(2,'-1'))}: ${m('6 + 2 = 8 \\le 6')} sai.`, `${m(P(4,3))}: ${m('12 - 6 = 6 \\le 6')} đúng.`, `${m(P(-1,-5))}: ${m('-3 + 10 = 7 \\le 6')} sai.`], ans:`Nghiệm: ${tb(P(0,0))} và ${tb(P(4,3))}.`},
  {de:`Tìm ${m('m')} để cặp số ${m(P(1,'m'))} là nghiệm của bất phương trình ${m('2x + y \\lt 5')}.`,
   sol:[`Thay ${m('x = 1,\\ y = m')}: ${m('2 + m \\lt 5')}.`], ans:`${tb('m \\lt 3')}.`},
 ]},
 {dang:'Biểu diễn miền nghiệm của bất phương trình', items:[
  {de:`Biểu diễn miền nghiệm của bất phương trình ${m('x + 2y \\le 4')}.`, draw:{x:[-1,5], y:[-1,4]}, fig:F_b3_4(),
   sol:[`Vẽ đường thẳng ${m('d: x + 2y = 4')} (nét liền) qua ${m(P(4,0))} và ${m(P(0,2))}.`, `Thay ${m('O(0;\\,0)')}: ${m('0 \\le 4')} đúng ⇒ ${m('O')} thuộc miền nghiệm.`, `Gạch bỏ nửa mặt phẳng không chứa ${m('O')}.`], ans:'Miền nghiệm: nửa mặt phẳng bờ d chứa O (kể cả đường thẳng d).'},
  {de:`Biểu diễn miền nghiệm của bất phương trình ${m('3x - y \\gt 3')}.`, draw:{x:[-2,4], y:[-4,3]}, fig:F_b3_5(),
   sol:[`Vẽ ${m('d: 3x - y = 3')} bằng <b>nét đứt</b> (dấu ${m('\\gt')}) qua ${m(P(1,0))} và ${m(P(0,-3))}.`, `Thay ${m('O')}: ${m('0 \\gt 3')} sai ⇒ ${m('O')} không thuộc miền nghiệm.`, `Gạch bỏ nửa mặt phẳng chứa ${m('O')}.`], ans:'Miền nghiệm: nửa mặt phẳng bờ d không chứa O (bỏ đường thẳng d).'},
  {de:`Biểu diễn miền nghiệm của bất phương trình ${m('x \\ge 2')} trên mặt phẳng tọa độ ${m('Oxy')}.`, draw:{x:[-1,5], y:[-2,3]}, fig:F_b3_6(),
   sol:[`Đây là bất phương trình bậc nhất hai ẩn ${m('x + 0y \\ge 2')}; bờ là đường thẳng ${m('x = 2')} (song song ${m('Oy')}).`, `${m('O')}: ${m('0 \\ge 2')} sai ⇒ gạch bỏ phần bên trái (chứa ${m('O')}).`], ans:'Miền nghiệm: nửa mặt phẳng bên phải đường thẳng x = 2 (kể cả bờ).'},
  {hard:true, de:`Miền không bị gạch (kể cả đường thẳng) trong hình là miền nghiệm của bất phương trình nào?`, fig:F_b3_8(),
   sol:[`Đường thẳng qua ${m(P(3,0))} và ${m(P(0,2))}: ${m('\\dfrac{x}{3} + \\dfrac{y}{2} = 1 \\Leftrightarrow 2x + 3y = 6')}.`, `${m('O')} nằm ở phần bị gạch và thay ${m('O')} vào ${m('2x + 3y')} được ${m('0 \\lt 6')} ⇒ miền nghiệm là ${m('2x + 3y \\ge 6')} (bờ nét liền).`], ans:`${tb('2x + 3y \\ge 6')}.`},
 ]},
 {dang:'Bài toán thực tế', items:[
  {de:`Một cửa hàng bán áo giá 150 nghìn đồng/chiếc và quần giá 200 nghìn đồng/chiếc. Gọi ${m('x, y')} lần lượt là số áo, số quần bán được trong ngày. Viết bất phương trình biểu thị doanh thu <b>ít nhất 3 triệu đồng</b>. Bán 10 áo và 8 quần thì có đạt không?`,
   sol:[`Doanh thu (nghìn đồng): ${m('150x + 200y \\ge 3000')}.`, `Thay ${m(P(10,8))}: ${m('1500 + 1600 = 3100 \\ge 3000')} đúng.`], ans:`${tb('150x + 200y \\ge 3000')}; bán 10 áo, 8 quần thì <b>đạt</b>.`},
  {hard:true, de:`Mỗi ngày Lan dành <b>không quá 120 phút</b> để tập: chạy bộ tiêu hao 10 kcal/phút, đạp xe tiêu hao 8 kcal/phút. Lan muốn tiêu hao <b>ít nhất 800 kcal</b>. Gọi ${m('x, y')} là số phút chạy bộ, đạp xe. Viết các bất phương trình và cho biết phương án ${m('x = 40,\\ y = 50')} có đáp ứng không.`,
   sol:[`Thời gian: ${m('x + y \\le 120')}.`, `Năng lượng: ${m('10x + 8y \\ge 800')}.`, `Thay ${m(P(40,50))}: ${m('90 \\le 120')} đúng; ${m('400 + 400 = 800 \\ge 800')} đúng.`], ans:`Phương án ${m(P(40,50))} <b>đáp ứng</b> cả hai điều kiện.`},
  {hard:true, de:`Một xe tải chở tối đa 2 tấn hàng. Mỗi thùng hàng loại A nặng 50 kg, loại B nặng 80 kg. Xe đã xếp 20 thùng loại A. Hỏi có thể xếp thêm <b>nhiều nhất</b> bao nhiêu thùng loại B?`,
   sol:[`Gọi ${m('x, y')} là số thùng A, B: ${m('50x + 80y \\le 2000')}.`, `Với ${m('x = 20')}: ${m('1000 + 80y \\le 2000 \\Leftrightarrow y \\le 12{,}5')}.`, `${m('y')} là số tự nhiên lớn nhất ⇒ ${m('y = 12')}.`], ans:`Nhiều nhất ${tb('12')} thùng loại B.`},
 ]},
]);

/* =====================================================================
   BÀI 4. HỆ BẤT PHƯƠNG TRÌNH BẬC NHẤT HAI ẨN
   ===================================================================== */
Lecture.addPractice('lop10', 'bai-4', [
 {dang:'Nhận biết hệ. Kiểm tra nghiệm của hệ', items:[
  {de:`Hệ nào là hệ bất phương trình bậc nhất hai ẩn? <br>a) ${sys(['x + y \\le 2', 'x - y \\gt 0'])}; &nbsp; b) ${sys(['x^2 + y \\gt 1', 'x \\le 3'])}; &nbsp; c) ${sys(['2x - y \\ge 1', 'y \\lt 4'])}.`,
   sol:[`Hệ b) có ${m('x^2')} nên không phải.`, `Các bất phương trình của a) và c) đều bậc nhất hai ẩn.`], ans:`${tb('a) \\text{ và } c)')}.`, lines:3},
  {de:`Cặp số nào là nghiệm của hệ ${sys(['x + y \\le 3', '2x - y \\gt 0'])}? &nbsp; ${m(P(1,1))}; ${m(P(3,0))}; ${m(P(0,2))}.`,
   sol:[`${m(P(1,1))}: ${m('2 \\le 3')} và ${m('1 \\gt 0')} ⇒ là nghiệm.`, `${m(P(3,0))}: ${m('3 \\le 3')} và ${m('6 \\gt 0')} ⇒ là nghiệm.`, `${m(P(0,2))}: ${m('-2 \\gt 0')} sai ⇒ không là nghiệm.`], ans:`${tb(P(1,1))} và ${tb(P(3,0))}.`},
  {de:`Tìm ${m('m')} để ${m(P('m',1))} là nghiệm của hệ ${sys(['x + y \\le 5', 'x - y \\ge 0'])}.`,
   sol:[`${m('m + 1 \\le 5 \\Leftrightarrow m \\le 4')}.`, `${m('m - 1 \\ge 0 \\Leftrightarrow m \\ge 1')}.`], ans:`${tb('1 \\le m \\le 4')}.`},
 ]},
 {dang:'Biểu diễn miền nghiệm của hệ', items:[
  {de:`Biểu diễn miền nghiệm của hệ ${sys(['x \\ge 0', 'y \\ge 0', 'x + y \\le 4'])}.`, draw:{x:[-1,5], y:[-1,5]}, fig:F_b4_3(),
   sol:[`Vẽ đường thẳng ${m('x + y = 4')} qua ${m('A(4;\\,0)')}, ${m('B(0;\\,4)')}.`, `${m('x \\ge 0')}: gạch bên trái ${m('Oy')}; ${m('y \\ge 0')}: gạch phía dưới ${m('Ox')}; ${m('O')} thỏa ${m('x + y \\le 4')} ⇒ gạch phía trên đường thẳng.`], ans:`Miền nghiệm là miền tam giác ${m('OAB')} (kể cả biên).`},
  {de:`Biểu diễn miền nghiệm của hệ ${sys(['x \\ge 0', 'y \\ge 0', 'x + 2y \\le 6', 'x \\le 4'])} và tìm tọa độ các đỉnh.`, draw:{x:[-1,6], y:[-1,5]}, fig:F_b4_4(),
   sol:[`Vẽ ${m('d_1: x + 2y = 6')} qua ${m(P(6,0))}, ${m(P(0,3))}; ${m('d_2: x = 4')}.`, `Gạch bỏ các phần không thỏa mãn từng bất phương trình (thử điểm ${m('O')}).`, `Giao của ${m('d_1')} và ${m('d_2')}: ${m('x = 4 \\Rightarrow y = 1')}.`], ans:`Tứ giác ${m('OABC')} với ${m('O(0;\\,0),\\ A(4;\\,0),\\ B(4;\\,1),\\ C(0;\\,3)')}.`},
 ]},
 {dang:`Tìm GTLN, GTNN của ${m('F = ax + by')}`, items:[
  {de:`Tìm giá trị lớn nhất, nhỏ nhất của ${m('F = 2x + 3y')} trên miền nghiệm của hệ ${sys(['x \\ge 0', 'y \\ge 0', 'x + y \\le 4'])}.`, fig:F_b4_3(),
   sol:[`Miền nghiệm là tam giác ${m('O(0;\\,0),\\ A(4;\\,0),\\ B(0;\\,4)')}.`, `${m('F(O) = 0;\\ F(A) = 8;\\ F(B) = 12')}.`], ans:`${tb('F_{\\max} = 12')} tại ${m(P(0,4))}; ${tb('F_{\\min} = 0')} tại ${m(P(0,0))}.`},
  {de:`Tìm giá trị lớn nhất, nhỏ nhất của ${m('F = x + y')} trên miền tứ giác ${m('OABC')} với ${m('O(0;\\,0),\\ A(4;\\,0),\\ B(4;\\,1),\\ C(0;\\,3)')}.`,
   sol:[`${m('F(O) = 0;\\ F(A) = 4;\\ F(B) = 5;\\ F(C) = 3')}.`], ans:`${tb('F_{\\max} = 5')} tại ${m(P(4,1))}; ${tb('F_{\\min} = 0')} tại ${m(P(0,0))}.`},
  {hard:true, de:`Trên miền tứ giác ${m('OABC')} ở bài 5, tìm giá trị lớn nhất, nhỏ nhất của ${m('F = x - 2y')}.`,
   sol:[`${m('F(O) = 0;\\ F(A) = 4;\\ F(B) = 4 - 2 = 2;\\ F(C) = -6')}.`, `So sánh các giá trị tại đỉnh.`], ans:`${tb('F_{\\max} = 4')} tại ${m(P(4,0))}; ${tb('F_{\\min} = -6')} tại ${m(P(0,3))}.`},
 ]},
 {dang:'Bài toán tối ưu trong thực tế', items:[
  {hard:true, de:`Một hộ nông dân trồng đậu và cà trên diện tích <b>không quá 6 ha</b>. Mỗi ha đậu cần 20 ngày công, mỗi ha cà cần 10 ngày công; tổng số ngày công <b>không quá 80</b>. Lãi mỗi ha đậu là 3 triệu đồng, mỗi ha cà là 2 triệu đồng. Trồng mỗi loại bao nhiêu ha để lãi nhiều nhất?`, draw:{x:[-1,7], y:[-1,9]}, fig:F_b4_9(),
   sol:[`Gọi ${m('x, y')} (ha) là diện tích đậu, cà: ${sys(['x \\ge 0,\\ y \\ge 0', 'x + y \\le 6', '20x + 10y \\le 80 \\Leftrightarrow 2x + y \\le 8'])}.`, `Miền nghiệm là tứ giác ${m('O(0;\\,0),\\ A(4;\\,0),\\ B(2;\\,4),\\ C(0;\\,6)')}.`, `Lãi ${m('F = 3x + 2y')}: ${m('F(O) = 0;\\ F(A) = 12;\\ F(B) = 14;\\ F(C) = 12')}.`], ans:`Trồng ${tb('2')} ha đậu và ${tb('4')} ha cà, lãi lớn nhất 14 triệu đồng.`},
  {hard:true, de:`Một người cần ít nhất 5 đơn vị chất đạm và 9 đơn vị chất béo mỗi ngày. Mỗi kg thực phẩm X chứa 1 đơn vị đạm, 1 đơn vị béo, giá 20 nghìn đồng; mỗi kg thực phẩm Y chứa 1 đơn vị đạm, 3 đơn vị béo, giá 30 nghìn đồng. Mua mỗi loại bao nhiêu kg để chi phí ít nhất?`, draw:{x:[-1,10], y:[-1,7]}, fig:F_b4_10(),
   sol:[`Gọi ${m('x, y')} (kg) là lượng X, Y: ${sys(['x \\ge 0,\\ y \\ge 0', 'x + y \\ge 5', 'x + 3y \\ge 9'])}.`, `Miền nghiệm không bị chặn, các đỉnh ${m('A(9;\\,0),\\ B(3;\\,2),\\ C(0;\\,5)')}.`, `Chi phí ${m('F = 20x + 30y')}: ${m('F(A) = 180;\\ F(B) = 120;\\ F(C) = 150')}.`], ans:`Mua ${tb('3')} kg X và ${tb('2')} kg Y, chi phí nhỏ nhất 120 nghìn đồng.`},
 ]},
]);

/* =====================================================================
   ÔN TẬP CHƯƠNG II
   ===================================================================== */
Lecture.addPractice('lop10', 'on-tap-c2', [
 {dang:'Bất phương trình bậc nhất hai ẩn', items:[
  {de:`Cặp số ${m(P(2,'-1'))} là nghiệm của bất phương trình nào? &nbsp; a) ${m('x + y \\gt 2')}; &nbsp; b) ${m('2x - y \\ge 5')}; &nbsp; c) ${m('x - 3y \\lt 4')}.`,
   sol:[`a) ${m('1 \\gt 2')} sai; b) ${m('4 + 1 = 5 \\ge 5')} đúng; c) ${m('2 + 3 = 5 \\lt 4')} sai.`], ans:`${tb('b)')}.`, lines:3},
  {de:`Tìm ${m('m')} để ${m(P('m',2))} thuộc miền nghiệm của bất phương trình ${m('3x - y \\ge 4')}.`, sol:[`${m('3m - 2 \\ge 4 \\Leftrightarrow 3m \\ge 6')}.`], ans:`${tb('m \\ge 2')}.`, lines:3},
  {de:`Biểu diễn miền nghiệm của bất phương trình ${m('2x + y \\lt 4')}.`, draw:{x:[-1,4], y:[-1,5]}, fig:F_ot_2(),
   sol:[`Vẽ ${m('d: 2x + y = 4')} bằng nét đứt qua ${m(P(2,0))}, ${m(P(0,4))}.`, `${m('O')}: ${m('0 \\lt 4')} đúng ⇒ gạch bỏ nửa mặt phẳng không chứa ${m('O')}.`], ans:'Nửa mặt phẳng bờ d chứa O (không kể d).'},
  {de:`Vé xem xiếc: người lớn 60 nghìn đồng, trẻ em 40 nghìn đồng. Một nhóm có không quá 1 triệu đồng. Gọi ${m('x, y')} là số vé người lớn, trẻ em. Viết bất phương trình và cho biết nhóm có mua được 10 vé người lớn và 8 vé trẻ em không.`,
   sol:[`${m('60x + 40y \\le 1000')}.`, `${m('600 + 320 = 920 \\le 1000')} đúng.`], ans:`${tb('60x + 40y \\le 1000')}; <b>mua được</b>.`},
 ]},
 {dang:'Hệ bất phương trình và miền nghiệm', items:[
  {de:`Các điểm ${m('O(0;\\,0)')}, ${m('A(1;\\,3)')}, ${m('B(3;\\,1)')} có thuộc miền nghiệm của hệ ${sys(['x - y \\le 0', 'x + y \\le 5'])} không?`,
   sol:[`${m('O')}: ${m('0 \\le 0')}, ${m('0 \\le 5')} ⇒ thuộc.`, `${m('A')}: ${m('-2 \\le 0')}, ${m('4 \\le 5')} ⇒ thuộc.`, `${m('B')}: ${m('2 \\le 0')} sai ⇒ không thuộc.`], ans:`${m('O, A')} thuộc; ${m('B')} không thuộc.`},
  {de:`Biểu diễn miền nghiệm của hệ ${sys(['x \\ge 0', 'y \\ge 1', 'x + y \\le 4'])} và tìm các đỉnh.`, draw:{x:[-1,5], y:[-1,5]}, fig:F_ot_4(),
   sol:[`Vẽ ${m('d_1: x + y = 4')}, ${m('d_2: y = 1')}.`, `Gạch bỏ phần ${m('x \\lt 0')}, phần ${m('y \\lt 1')} và phần phía trên ${m('d_1')}.`], ans:`Tam giác ${m('A(0;\\,1),\\ B(3;\\,1),\\ C(0;\\,4)')}.`},
  {de:`Tìm GTLN, GTNN của ${m('F = x + 2y')} trên miền tam giác ${m('A(0;\\,1),\\ B(3;\\,1),\\ C(0;\\,4)')}.`, sol:[`${m('F(A) = 2;\\ F(B) = 5;\\ F(C) = 8')}.`], ans:`${tb('F_{\\max} = 8')} tại ${m('C')}; ${tb('F_{\\min} = 2')} tại ${m('A')}.`},
 ]},
 {dang:'Vận dụng tổng hợp', items:[
  {hard:true, de:`Miền không bị gạch (kể cả biên) là tam giác ${m('OAB')} như hình. Viết hệ bất phương trình có miền nghiệm đó.`, fig:F_ot_8(),
   sol:[`Đường thẳng ${m('AB')} qua ${m(P(3,0))}, ${m(P(0,3))}: ${m('x + y = 3')}; ${m('O')} thuộc miền nên ${m('x + y \\le 3')}.`, `Miền nằm bên phải ${m('Oy')}, phía trên ${m('Ox')}: ${m('x \\ge 0,\\ y \\ge 0')}.`], ans:`${sys(['x \\ge 0', 'y \\ge 0', 'x + y \\le 3'])}.`},
  {hard:true, de:`Mỗi ngày một xưởng may có 10 m vải và 14 giờ công. Một áo cần 1 m vải, 2 giờ công, lãi 50 nghìn đồng; một quần cần 2 m vải, 1 giờ công, lãi 80 nghìn đồng. Mỗi ngày may bao nhiêu áo, bao nhiêu quần để lãi nhiều nhất?`, draw:{x:[-1,8], y:[-1,8]}, fig:F_ot_9(),
   sol:[`Gọi ${m('x, y')} là số áo, quần: ${sys(['x \\ge 0,\\ y \\ge 0', 'x + 2y \\le 10', '2x + y \\le 14'])}.`, `Đỉnh: ${m('O(0;\\,0),\\ A(7;\\,0),\\ B(6;\\,2),\\ C(0;\\,5)')}.`, `${m('F = 50x + 80y')}: ${m('F(A) = 350;\\ F(B) = 460;\\ F(C) = 400')}.`], ans:`May ${tb('6')} áo và ${tb('2')} quần, lãi lớn nhất 460 nghìn đồng.`},
  {hard:true, de:`Tìm ${m('m \\lt 4')} để miền nghiệm của hệ ${sys(['x \\ge 0', 'y \\ge m', 'x + y \\le 4'])} là một tam giác có diện tích bằng 2.`,
   sol:[`Các đỉnh: ${m(P(0,'m'))}, ${m(P('4 - m','m'))}, ${m(P(0,4))} — tam giác vuông tại ${m(P(0,'m'))}, hai cạnh góc vuông bằng ${m('4 - m')}.`, `Diện tích ${m('\\dfrac{(4 - m)^2}{2} = 2 \\Leftrightarrow (4 - m)^2 = 4 \\Leftrightarrow 4 - m = 2')} (vì ${m('4 - m \\gt 0')}).`], ans:`${tb('m = 2')}.`},
 ]},
]);
})();

/* =====================================================================
   CHƯƠNG III. BÀI 5. GIÁ TRỊ LƯỢNG GIÁC CỦA MỘT GÓC TỪ 0° ĐẾN 180°
   10 bài = 7 cơ bản + 3 vận dụng ★, xếp theo 3 dạng của bài giảng (không nhắc lại lý thuyết).
   ===================================================================== */
(() => {
const m = tm;
const R2 = '\\dfrac{\\sqrt{2}}{2}', R3 = '\\dfrac{\\sqrt{3}}{2}', T3 = '\\dfrac{\\sqrt{3}}{3}', H = '\\dfrac{1}{2}';

Lecture.addPractice('lop10', 'bai-5', [
 {dang:'Dạng 1. Tính giá trị lượng giác của góc đặc biệt, góc bù nhau', items:[
  {de:`Không dùng máy tính, tính ${m('\\sin 135^\\circ')}, ${m('\\cos 150^\\circ')}, ${m('\\tan 120^\\circ')}, ${m('\\cot 150^\\circ')}.`,
   sol:[`${m('135^\\circ = 180^\\circ - 45^\\circ')} nên ${m(`\\sin 135^\\circ = \\sin 45^\\circ = ${R2}`)}.`,
     `${m(`\\cos 150^\\circ = -\\cos 30^\\circ = -${R3}`)}.`,
     `${m('\\tan 120^\\circ = -\\tan 60^\\circ = -\\sqrt{3}')}; ${m('\\cot 150^\\circ = -\\cot 30^\\circ = -\\sqrt{3}')}.`],
   ans:`${tb(`${R2};\\ -${R3};\\ -\\sqrt{3};\\ -\\sqrt{3}`)}.`, lines:3},
  {de:`Tính ${m('A = \\cos 135^\\circ + \\sin 45^\\circ + \\sqrt{3}\\tan 150^\\circ')}.`,
   sol:[`${m(`\\cos 135^\\circ = -${R2}`)}; ${m(`\\sin 45^\\circ = ${R2}`)}; ${m(`\\tan 150^\\circ = -${T3}`)}.`,
     `${m(`A = -${R2} + ${R2} + \\sqrt{3}\\cdot\\left(-${T3}\\right) = 0 - 1`)}.`], ans:`${tb('A = -1')}.`},
  {de:`Tìm các góc ${m('\\alpha')} với ${m('0^\\circ \\le \\alpha \\le 180^\\circ')} biết: a) ${m(`\\sin\\alpha = ${R3}`)}; &nbsp; b) ${m(`\\cos\\alpha = -${H}`)}.`,
   sol:[`a) ${m(`\\sin 60^\\circ = ${R3}`)} và hai góc bù nhau có cùng sin nên ${m('\\alpha = 60^\\circ')} hoặc ${m('\\alpha = 120^\\circ')}.`,
     `b) ${m('\\cos\\alpha \\lt 0')} nên ${m('\\alpha')} tù; ${m(`\\cos 60^\\circ = ${H}`)} nên ${m('\\alpha = 180^\\circ - 60^\\circ = 120^\\circ')} (mỗi giá trị cos chỉ ứng với một góc).`],
   ans:`a) ${tb('60^\\circ \\text{ hoặc } 120^\\circ')}; b) ${tb('120^\\circ')}.`, lines:3},
 ]},
 {dang:'Dạng 2. Biết một giá trị lượng giác, tính các giá trị còn lại', items:[
  {de:`Cho ${m('\\sin\\alpha = \\dfrac{5}{13}')} với ${m('90^\\circ \\lt \\alpha \\lt 180^\\circ')}. Tính ${m('\\cos\\alpha,\\ \\tan\\alpha,\\ \\cot\\alpha')}.`,
   sol:[`${m('\\cos^2\\alpha = 1 - \\dfrac{25}{169} = \\dfrac{144}{169}')}.`, `${m('\\alpha')} tù nên ${m('\\cos\\alpha \\lt 0')}: ${m('\\cos\\alpha = -\\dfrac{12}{13}')}.`,
     `${m('\\tan\\alpha = \\dfrac{5}{13} : \\left(-\\dfrac{12}{13}\\right) = -\\dfrac{5}{12}')}; ${m('\\cot\\alpha = -\\dfrac{12}{5}')}.`],
   ans:`${tb('\\cos\\alpha = -\\dfrac{12}{13},\\ \\tan\\alpha = -\\dfrac{5}{12},\\ \\cot\\alpha = -\\dfrac{12}{5}')}.`},
  {de:`Cho ${m('\\tan\\alpha = -\\dfrac{3}{4}')} với ${m('0^\\circ \\lt \\alpha \\lt 180^\\circ')}. Tính ${m('\\cos\\alpha')} và ${m('\\sin\\alpha')}.`,
   sol:[`${m('\\dfrac{1}{\\cos^2\\alpha} = 1 + \\tan^2\\alpha = 1 + \\dfrac{9}{16} = \\dfrac{25}{16}')} nên ${m('\\cos^2\\alpha = \\dfrac{16}{25}')}.`,
     `${m('\\tan\\alpha \\lt 0')} nên ${m('\\alpha')} tù, ${m('\\cos\\alpha \\lt 0')}: ${m('\\cos\\alpha = -\\dfrac{4}{5}')}.`,
     `${m('\\sin\\alpha = \\tan\\alpha\\cdot\\cos\\alpha = \\left(-\\dfrac{3}{4}\\right)\\cdot\\left(-\\dfrac{4}{5}\\right) = \\dfrac{3}{5}')}.`],
   ans:`${tb('\\cos\\alpha = -\\dfrac{4}{5},\\ \\sin\\alpha = \\dfrac{3}{5}')}.`},
  {hard:true, de:`Cho ${m('\\cot\\alpha = -3')} với ${m('0^\\circ \\lt \\alpha \\lt 180^\\circ')}. Tính ${m('P = \\dfrac{2\\sin\\alpha + \\cos\\alpha}{\\sin\\alpha - 3\\cos\\alpha}')}.`,
   sol:[`${m('\\cot\\alpha = -3')} nên ${m('\\sin\\alpha \\ne 0')}; chia cả tử và mẫu cho ${m('\\sin\\alpha')}.`,
     `${m('P = \\dfrac{2 + \\cot\\alpha}{1 - 3\\cot\\alpha} = \\dfrac{2 - 3}{1 + 9}')}.`], ans:`${tb('P = -\\dfrac{1}{10}')}.`},
 ]},
 {dang:'Dạng 3. Tính giá trị biểu thức, rút gọn, chứng minh đẳng thức', items:[
  {de:`Tính ${m('B = \\cos 20^\\circ + \\cos 40^\\circ + \\cos 140^\\circ + \\cos 160^\\circ')}.`,
   sol:[`${m('20^\\circ + 160^\\circ = 180^\\circ')} nên ${m('\\cos 160^\\circ = -\\cos 20^\\circ')}.`, `${m('40^\\circ + 140^\\circ = 180^\\circ')} nên ${m('\\cos 140^\\circ = -\\cos 40^\\circ')}.`,
     `${m('B = \\cos 20^\\circ + \\cos 40^\\circ - \\cos 40^\\circ - \\cos 20^\\circ = 0')}.`], ans:`${tb('B = 0')}.`},
  {de:`Rút gọn ${m('C = \\sin(180^\\circ - \\alpha)\\cdot\\cot\\alpha - \\cos(180^\\circ - \\alpha)')} (với ${m('0^\\circ \\lt \\alpha \\lt 90^\\circ')}).`,
   sol:[`${m('\\sin(180^\\circ - \\alpha) = \\sin\\alpha')}; ${m('\\cos(180^\\circ - \\alpha) = -\\cos\\alpha')}.`,
     `${m('C = \\sin\\alpha\\cdot\\dfrac{\\cos\\alpha}{\\sin\\alpha} + \\cos\\alpha = \\cos\\alpha + \\cos\\alpha')}.`], ans:`${tb('C = 2\\cos\\alpha')}.`},
  {hard:true, de:`Chứng minh rằng với ${m('0^\\circ \\lt \\alpha \\lt 180^\\circ')}, ${m('\\alpha \\ne 90^\\circ')}: ${m('\\tan^2\\alpha - \\sin^2\\alpha = \\tan^2\\alpha\\cdot\\sin^2\\alpha')}.`,
   sol:[`Vế trái ${m('= \\dfrac{\\sin^2\\alpha}{\\cos^2\\alpha} - \\sin^2\\alpha = \\sin^2\\alpha\\cdot\\dfrac{1 - \\cos^2\\alpha}{\\cos^2\\alpha}')}.`,
     `Vì ${m('1 - \\cos^2\\alpha = \\sin^2\\alpha')} nên vế trái ${m('= \\sin^2\\alpha\\cdot\\dfrac{\\sin^2\\alpha}{\\cos^2\\alpha} = \\sin^2\\alpha\\cdot\\tan^2\\alpha')} = vế phải (điều phải chứng minh).`]},
  {hard:true, de:`Cho ${m('0^\\circ \\lt \\alpha \\lt 180^\\circ')} và ${m('\\sin\\alpha + \\cos\\alpha = \\dfrac{4}{3}')}. Tính ${m('\\sin\\alpha\\cos\\alpha')} và ${m('\\sin^3\\alpha + \\cos^3\\alpha')}.`,
   sol:[`Bình phương: ${m('1 + 2\\sin\\alpha\\cos\\alpha = \\dfrac{16}{9}')} nên ${m('\\sin\\alpha\\cos\\alpha = \\dfrac{7}{18}')}.`,
     `${m('\\sin^3\\alpha + \\cos^3\\alpha = (\\sin\\alpha + \\cos\\alpha)(1 - \\sin\\alpha\\cos\\alpha) = \\dfrac{4}{3}\\cdot\\dfrac{11}{18}')}.`],
   ans:`${tb('\\sin\\alpha\\cos\\alpha = \\dfrac{7}{18};\\ \\sin^3\\alpha + \\cos^3\\alpha = \\dfrac{22}{27}')}.`},
 ]},
]);
})();
