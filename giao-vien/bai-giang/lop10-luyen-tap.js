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

/* =====================================================================
   PHIẾU LUYỆN TẬP – Toán 10 · Bài 6. Hệ thức lượng trong tam giác  (10 bài = 7 cơ bản + 3 vận dụng ★, xếp theo 4 dạng như bài giảng)
   ===================================================================== */
(() => {
const m = tm;
Lecture.addPractice('lop10', 'bai-6', [
 {dang:'Định lí côsin: tính cạnh, tính góc', items:[
  {de:`Cho tam giác ${m('ABC')} có ${m('AB = 3,\\ AC = 5')} và ${m('\\widehat{A} = 120^\\circ')}. Tính độ dài cạnh ${m('BC')}.`,
   sol:[`Biết hai cạnh và góc xen giữa nên dùng định lí côsin: ${m('BC^2 = AB^2 + AC^2 - 2\\cdot AB\\cdot AC\\cdot\\cos A')}.`, `${m('\\cos 120^\\circ = -\\dfrac{1}{2}')} nên ${m('BC^2 = 9 + 25 - 2\\cdot 3\\cdot 5\\cdot\\left(-\\dfrac{1}{2}\\right) = 9 + 25 + 15 = 49')}.`, `${m('BC \\gt 0')} nên ${m('BC = 7')}.`],
   ans:`${tb('BC = 7')}.`},
  {de:`Cho tam giác ${m('ABC')} có ${m('AB = 8,\\ BC = 7,\\ CA = 5')}. Tính số đo góc ${m('A')}.`,
   sol:[`Biết ba cạnh nên dùng hệ quả của định lí côsin: ${m('\\cos A = \\dfrac{AB^2 + AC^2 - BC^2}{2\\cdot AB\\cdot AC}')}.`, `${m('\\cos A = \\dfrac{64 + 25 - 49}{2\\cdot 8\\cdot 5} = \\dfrac{40}{80} = \\dfrac{1}{2}')}.`, `Vì ${m('0^\\circ \\lt A \\lt 180^\\circ')} và ${m('\\cos A = \\dfrac{1}{2}')} nên ${m('\\widehat{A} = 60^\\circ')}.`],
   ans:`${tb('\\widehat{A} = 60^\\circ')}.`},
 ]},
 {dang:'Định lí sin: tính cạnh, góc, bán kính R', items:[
  {de:`Cho tam giác ${m('ABC')} có ${m('BC = 8,\\ \\widehat{A} = 45^\\circ,\\ \\widehat{B} = 60^\\circ')}. Tính ${m('\\widehat{C}')}, cạnh ${m('AC')} và bán kính ${m('R')} của đường tròn ngoại tiếp.`,
   sol:[`Tổng ba góc bằng ${m('180^\\circ')} nên ${m('\\widehat{C} = 180^\\circ - 45^\\circ - 60^\\circ = 75^\\circ')}.`, `Định lí sin: ${m('\\dfrac{AC}{\\sin B} = \\dfrac{BC}{\\sin A}')}, suy ra ${m('AC = \\dfrac{8\\cdot\\sin 60^\\circ}{\\sin 45^\\circ} = \\dfrac{8\\cdot\\frac{\\sqrt{3}}{2}}{\\frac{\\sqrt{2}}{2}} = 4\\sqrt{6}')}.`, `${m('R = \\dfrac{BC}{2\\sin A} = \\dfrac{8}{2\\cdot\\frac{\\sqrt{2}}{2}} = 4\\sqrt{2}')}.`],
   ans:`${tb('\\widehat{C} = 75^\\circ,\\ AC = 4\\sqrt{6},\\ R = 4\\sqrt{2}')}.`},
  {de:`Tam giác ${m('ABC')} nội tiếp đường tròn bán kính ${m('R = 5')} và có ${m('\\widehat{B} = 60^\\circ')}. Tính độ dài cạnh ${m('AC')}.`,
   sol:[`Định lí sin: ${m('\\dfrac{AC}{\\sin B} = 2R')}, nên ${m('AC = 2R\\sin B')}.`, `${m('AC = 2\\cdot 5\\cdot\\sin 60^\\circ = 10\\cdot\\dfrac{\\sqrt{3}}{2} = 5\\sqrt{3}')}.`],
   ans:`${tb('AC = 5\\sqrt{3}')}.`},
  {hard:true, de:`Tam giác ${m('ABC')} có ${m('BC = 5,\\ CA = 5\\sqrt{2}')} và ${m('\\widehat{A} = 30^\\circ')}. Tính số đo góc ${m('B')}. Có bao nhiêu tam giác thoả mãn đề bài?`,
   sol:[`Định lí sin: ${m('\\dfrac{CA}{\\sin B} = \\dfrac{BC}{\\sin A}')}, nên ${m('\\sin B = \\dfrac{CA\\cdot\\sin A}{BC} = \\dfrac{5\\sqrt{2}\\cdot\\frac{1}{2}}{5} = \\dfrac{\\sqrt{2}}{2}')}.`, `Với ${m('0^\\circ \\lt B \\lt 180^\\circ')} có hai góc cùng ${m('\\sin B = \\dfrac{\\sqrt{2}}{2}')}: ${m('B = 45^\\circ')} hoặc ${m('B = 135^\\circ')}.`, `Kiểm tra tổng hai góc: ${m('30^\\circ + 45^\\circ = 75^\\circ \\lt 180^\\circ')} và ${m('30^\\circ + 135^\\circ = 165^\\circ \\lt 180^\\circ')}, cả hai đều chấp nhận được (góc ${m('C')} lần lượt là ${m('105^\\circ')} và ${m('15^\\circ')}).`],
   ans:`${tb('\\widehat{B} = 45^\\circ')} hoặc ${tb('\\widehat{B} = 135^\\circ')}; có ${tb('2')} tam giác thoả mãn.`},
 ]},
 {dang:'Diện tích tam giác, bán kính R, r', items:[
  {de:`Cho tam giác có ba cạnh ${m('a = 9,\\ b = 10,\\ c = 17')}. Tính diện tích ${m('S')}, bán kính nội tiếp ${m('r')} và bán kính ngoại tiếp ${m('R')}.`,
   sol:[`Nửa chu vi ${m('p = \\dfrac{9 + 10 + 17}{2} = 18')}.`, `Công thức Heron: ${m('S = \\sqrt{p(p - a)(p - b)(p - c)} = \\sqrt{18\\cdot 9\\cdot 8\\cdot 1} = \\sqrt{1\\,296} = 36')}.`, `${m('r = \\dfrac{S}{p} = \\dfrac{36}{18} = 2')}; &nbsp; ${m('R = \\dfrac{abc}{4S} = \\dfrac{9\\cdot 10\\cdot 17}{4\\cdot 36} = \\dfrac{85}{8}')}.`],
   ans:`${tb('S = 36,\\ r = 2,\\ R = \\dfrac{85}{8}')}.`},
  {de:`Tính diện tích tam giác ${m('ABC')} có ${m('AB = 12,\\ AC = 5')} và ${m('\\widehat{A} = 150^\\circ')}.`,
   sol:[`Biết hai cạnh và góc xen giữa: ${m('S = \\dfrac{1}{2}\\cdot AB\\cdot AC\\cdot\\sin A')}.`, `${m('\\sin 150^\\circ = \\sin 30^\\circ = \\dfrac{1}{2}')} nên ${m('S = \\dfrac{1}{2}\\cdot 12\\cdot 5\\cdot\\dfrac{1}{2} = 15')}.`],
   ans:`${tb('S = 15')} (đơn vị diện tích).`},
  {hard:true, de:`Tam giác ${m('ABC')} có ${m('AB = 6,\\ AC = 8')}, góc ${m('A')} nhọn và diện tích ${m('S = 12\\sqrt{3}')}. Tính số đo góc ${m('A')} và độ dài cạnh ${m('BC')}.`,
   sol:[`${m('S = \\dfrac{1}{2}\\cdot AB\\cdot AC\\cdot\\sin A')} nên ${m('12\\sqrt{3} = \\dfrac{1}{2}\\cdot 6\\cdot 8\\cdot\\sin A = 24\\sin A')}, suy ra ${m('\\sin A = \\dfrac{\\sqrt{3}}{2}')}.`, `Góc ${m('A')} nhọn nên ${m('\\widehat{A} = 60^\\circ')} (loại ${m('120^\\circ')}).`, `Định lí côsin: ${m('BC^2 = 36 + 64 - 2\\cdot 6\\cdot 8\\cdot\\dfrac{1}{2} = 52')}, suy ra ${m('BC = 2\\sqrt{13}')}.`],
   ans:`${tb('\\widehat{A} = 60^\\circ,\\ BC = 2\\sqrt{13}')}.`},
 ]},
 {dang:'Bài toán thực tế', items:[
  {de:`Để đo khoảng cách từ bờ sông đến cái cây ${m('C')} ở bờ bên kia, người ta chọn hai điểm ${m('A, B')} trên bờ này với ${m('AB = 200')} m, đo được ${m('\\widehat{CAB} = 60^\\circ')} và ${m('\\widehat{CBA} = 45^\\circ')}. Tính khoảng cách ${m('AC')} (làm tròn đến hàng phần mười).`,
   sol:[`Trong tam giác ${m('ABC')}: ${m('\\widehat{C} = 180^\\circ - 60^\\circ - 45^\\circ = 75^\\circ')}.`, `Định lí sin: ${m('\\dfrac{AC}{\\sin B} = \\dfrac{AB}{\\sin C}')}, nên ${m('AC = \\dfrac{200\\cdot\\sin 45^\\circ}{\\sin 75^\\circ}')}.`, `${m('\\sin 75^\\circ = \\dfrac{\\sqrt{6} + \\sqrt{2}}{4}')} nên ${m('AC = \\dfrac{200\\cdot\\frac{\\sqrt{2}}{2}\\cdot 4}{\\sqrt{6} + \\sqrt{2}} = \\dfrac{400}{\\sqrt{3} + 1} = 200(\\sqrt{3} - 1) \\approx 146{,}4')} (m).`],
   ans:`${tb('AC = 200(\\sqrt{3} - 1) \\approx 146{,}4')} m.`},
  {hard:true, de:`Để đo chiều cao tháp ${m('CD')} (${m('D')} là chân tháp), người ta chọn hai điểm ${m('A, B')} thẳng hàng với ${m('D')}, ${m('B')} nằm giữa ${m('A')} và ${m('D')}, ${m('AB = 30')} m. Đo được góc nâng ${m('\\widehat{CAD} = 30^\\circ')} và ${m('\\widehat{CBD} = 45^\\circ')}. Tính chiều cao tháp (làm tròn đến hàng phần mười).`,
   sol:[`${m('\\widehat{CBD} = 45^\\circ')} là góc ngoài của tam giác ${m('ABC')} tại ${m('B')} nên ${m('\\widehat{ABC} = 135^\\circ')} và ${m('\\widehat{ACB} = 180^\\circ - 30^\\circ - 135^\\circ = 15^\\circ')}.`, `Định lí sin trong tam giác ${m('ABC')}: ${m('\\dfrac{BC}{\\sin A} = \\dfrac{AB}{\\sin C}')}, nên ${m('BC = \\dfrac{30\\cdot\\sin 30^\\circ}{\\sin 15^\\circ} = \\dfrac{15}{\\sin 15^\\circ} = 15(\\sqrt{6} + \\sqrt{2})')} (vì ${m('\\sin 15^\\circ = \\dfrac{\\sqrt{6} - \\sqrt{2}}{4}')}).`, `Tam giác ${m('CBD')} vuông tại ${m('D')} có ${m('\\widehat{CBD} = 45^\\circ')}: ${m('CD = BC\\cdot\\sin 45^\\circ = 15(\\sqrt{6} + \\sqrt{2})\\cdot\\dfrac{\\sqrt{2}}{2} = 15(\\sqrt{3} + 1) \\approx 41{,}0')} (m).`],
   ans:`${tb('CD = 15(\\sqrt{3} + 1) \\approx 41{,}0')} m.`},
 ]},
]);
})();

/* =====================================================================
   CHƯƠNG III. ÔN TẬP CHƯƠNG III (Bài 5 – Bài 6)
   10 bài = 7 cơ bản + 3 vận dụng ★, xếp theo 4 dạng: giá trị lượng giác · giải tam giác · diện tích R r · thực tế.
   ===================================================================== */
(() => {
const m = tm;

Lecture.addPractice('lop10', 'on-tap-c3', [
 {dang:'Dạng 1. Giá trị lượng giác của góc từ 0° đến 180°', items:[
  {de:`Không dùng máy tính, tính ${m('P = \\sin 150^\\circ + \\cos 120^\\circ + \\tan 135^\\circ')}.`,
   sol:[`${m('\\sin 150^\\circ = \\sin 30^\\circ = \\dfrac{1}{2}')} (hai góc bù nhau).`, `${m('\\cos 120^\\circ = -\\cos 60^\\circ = -\\dfrac{1}{2}')}; ${m('\\tan 135^\\circ = -\\tan 45^\\circ = -1')}.`,
     `${m('P = \\dfrac{1}{2} - \\dfrac{1}{2} - 1')}.`], ans:`${tb('P = -1')}.`},
  {de:`Cho ${m('\\sin\\alpha = \\dfrac{3}{5}')} với ${m('90^\\circ \\lt \\alpha \\lt 180^\\circ')}. Tính ${m('\\cos\\alpha')} và ${m('\\tan\\alpha')}.`,
   sol:[`${m('\\cos^2\\alpha = 1 - \\sin^2\\alpha = 1 - \\dfrac{9}{25} = \\dfrac{16}{25}')}.`, `Góc ${m('\\alpha')} tù nên ${m('\\cos\\alpha \\lt 0')}, suy ra ${m('\\cos\\alpha = -\\dfrac{4}{5}')}.`,
     `${m('\\tan\\alpha = \\dfrac{\\sin\\alpha}{\\cos\\alpha} = \\dfrac{3}{5}:\\left(-\\dfrac{4}{5}\\right) = -\\dfrac{3}{4}')}.`], ans:`${tb('\\cos\\alpha = -\\dfrac{4}{5};\\ \\tan\\alpha = -\\dfrac{3}{4}')}.`},
 ]},
 {dang:'Dạng 2. Định lí côsin, định lí sin – giải tam giác', items:[
  {de:`Tam giác ${m('ABC')} có ${m('\\widehat{A} = 60^\\circ,\\ b = 8,\\ c = 3')}. Tính ${m('a')} và ${m('\\cos B')}; góc ${m('B')} nhọn hay tù?`,
   sol:[`${m('a^2 = b^2 + c^2 - 2bc\\cos A = 64 + 9 - 2\\cdot 8\\cdot 3\\cdot\\dfrac{1}{2} = 49')} ⇒ ${m('a = 7')}.`,
     `${m('\\cos B = \\dfrac{a^2 + c^2 - b^2}{2ac} = \\dfrac{49 + 9 - 64}{2\\cdot 7\\cdot 3} = -\\dfrac{1}{7}')}.`, `${m('\\cos B \\lt 0')} nên ${m('B')} là góc tù.`],
   ans:`${tb('a = 7;\\ \\cos B = -\\dfrac{1}{7}')}; ${m('B')} tù.`},
  {de:`Tam giác ${m('ABC')} có ${m('\\widehat{A} = 45^\\circ,\\ \\widehat{B} = 60^\\circ,\\ a = 4\\sqrt{2}')}. Tính ${m('R')} và ${m('b')}.`,
   sol:[`${m('2R = \\dfrac{a}{\\sin A} = \\dfrac{4\\sqrt{2}}{\\frac{\\sqrt{2}}{2}} = 8')} ⇒ ${m('R = 4')}.`, `${m('b = 2R\\sin B = 8\\cdot\\dfrac{\\sqrt{3}}{2} = 4\\sqrt{3}')}.`], ans:`${tb('R = 4;\\ b = 4\\sqrt{3}')}.`},
  {hard:true, de:`Tam giác ${m('ABC')} có ${m('AB = 6,\\ AC = 10')}, trung tuyến ${m('AM = 7')}. Tính ${m('BC')} và số đo góc ${m('A')}.`,
   sol:[`Công thức trung tuyến: ${m('AM^2 = \\dfrac{2(AB^2 + AC^2) - BC^2}{4}')} ⇒ ${m('196 = 2\\cdot 136 - BC^2')} ⇒ ${m('BC^2 = 76')}.`,
     `${m('\\cos A = \\dfrac{AB^2 + AC^2 - BC^2}{2\\cdot AB\\cdot AC} = \\dfrac{136 - 76}{120} = \\dfrac{1}{2}')}.`], ans:`${tb('BC = 2\\sqrt{19}')}; ${tb('\\widehat{A} = 60^\\circ')}.`},
 ]},
 {dang:'Dạng 3. Diện tích, bán kính đường tròn ngoại tiếp, nội tiếp', items:[
  {de:`Tam giác ${m('ABC')} có ${m('a = 13,\\ b = 14,\\ c = 15')}. Tính ${m('S')}, ${m('R')}, ${m('r')}.`,
   sol:[`${m('p = \\dfrac{13 + 14 + 15}{2} = 21')}; Heron: ${m('S = \\sqrt{21\\cdot 8\\cdot 7\\cdot 6} = 84')}.`, `${m('R = \\dfrac{abc}{4S} = \\dfrac{2\\,730}{336} = \\dfrac{65}{8}')}.`, `${m('r = \\dfrac{S}{p} = \\dfrac{84}{21} = 4')}.`],
   ans:`${tb('S = 84;\\ R = \\dfrac{65}{8};\\ r = 4')}.`, lines:3},
  {de:`Tam giác ${m('ABC')} có góc ${m('A')} nhọn, ${m('AB = 7,\\ AC = 8')} và diện tích ${m('S = 14\\sqrt{3}')}. Tính ${m('BC')}.`,
   sol:[`${m('S = \\dfrac{1}{2}\\cdot AB\\cdot AC\\cdot\\sin A')} ⇒ ${m('\\sin A = \\dfrac{14\\sqrt{3}}{28} = \\dfrac{\\sqrt{3}}{2}')}.`, `Góc ${m('A')} nhọn nên ${m('\\widehat{A} = 60^\\circ')}.`,
     `${m('BC^2 = 49 + 64 - 2\\cdot 7\\cdot 8\\cdot\\dfrac{1}{2} = 57')}.`], ans:`${tb('BC = \\sqrt{57} \\approx 7{,}55')}.`},
  {hard:true, de:`Tam giác ${m('ABC')} có ${m('\\widehat{B} = 60^\\circ,\\ \\widehat{C} = 45^\\circ,\\ AC = 10')}. Tính ${m('BC')}, ${m('R')}, ${m('S')} (làm tròn hai chữ số thập phân).`,
   sol:[`${m('\\widehat{A} = 180^\\circ - 60^\\circ - 45^\\circ = 75^\\circ')}.`, `${m('2R = \\dfrac{AC}{\\sin B} = \\dfrac{10}{\\frac{\\sqrt{3}}{2}} = \\dfrac{20}{\\sqrt{3}}')} ⇒ ${m('R = \\dfrac{10\\sqrt{3}}{3} \\approx 5{,}77')}.`,
     `${m('BC = 2R\\sin A \\approx 11{,}55\\cdot 0{,}9659 \\approx 11{,}15')}.`, `${m('S = \\dfrac{1}{2}\\cdot BC\\cdot AC\\cdot\\sin C \\approx \\dfrac{1}{2}\\cdot 11{,}15\\cdot 10\\cdot \\dfrac{\\sqrt{2}}{2} \\approx 39{,}43')}.`],
   ans:`${tb('BC \\approx 11{,}15;\\ R \\approx 5{,}77;\\ S \\approx 39{,}43')}.`},
 ]},
 {dang:'Dạng 4. Bài toán thực tế', items:[
  {de:`Hai tàu rời cảng cùng lúc theo hai hướng hợp nhau góc ${m('60^\\circ')}, tốc độ ${m('20')} km/h và ${m('30')} km/h. Sau 2 giờ hai tàu cách nhau bao nhiêu kilômét?`,
   sol:[`Sau 2 giờ: ${m('OA = 40')} km, ${m('OB = 60')} km, ${m('\\widehat{AOB} = 60^\\circ')}.`, `${m('AB^2 = 40^2 + 60^2 - 2\\cdot 40\\cdot 60\\cdot\\cos 60^\\circ = 2\\,800')}.`], ans:`${tb('AB = 20\\sqrt{7} \\approx 52{,}9')} km.`},
  {hard:true, de:`Để đo khoảng cách từ điểm ${m('A')} đến cây ${m('C')} ở bên kia sông, người ta chọn điểm ${m('B')} cùng bờ với ${m('A')} sao cho ${m('AB = 40')} m, đo được ${m('\\widehat{CAB} = 40^\\circ,\\ \\widehat{CBA} = 70^\\circ')}. Tính ${m('AC')}, ${m('BC')} và diện tích tam giác ${m('ABC')} (làm tròn một chữ số thập phân).`,
   sol:[`${m('\\widehat{C} = 180^\\circ - 40^\\circ - 70^\\circ = 70^\\circ')} nên tam giác ${m('ABC')} cân tại ${m('A')}.`, `${m('AC = \\dfrac{AB\\sin B}{\\sin C} = 40')} m; ${m('BC = \\dfrac{AB\\sin A}{\\sin C} = \\dfrac{40\\sin 40^\\circ}{\\sin 70^\\circ} \\approx 27{,}4')} m.`,
     `Góc xen giữa hai cạnh ${m('AB, AC')} là ${m('\\widehat{A} = 40^\\circ')}: ${m('S = \\dfrac{1}{2}\\cdot 40\\cdot 40\\cdot\\sin 40^\\circ \\approx 514{,}2')}.`],
   ans:`${tb('AC = 40')} m; ${tb('BC \\approx 27{,}4')} m; ${tb('S \\approx 514{,}2')} m².`},
 ]},
]);
})();

/* ---------- Ôn tập giữa học kì I (có hình vẽ) ---------- */
(() => {
const m = tm;
Lecture.addPractice('lop10', 'on-tap-giua-ki-1', [
 {dang:'Dạng 1. Mệnh đề, tập hợp, đếm bằng sơ đồ Venn', items:[
  {de:`Lập mệnh đề phủ định của ${m('P: \\forall x \\in \\mathbb{R},\\ x^2 + x + 1 \\gt 0')} và cho biết mệnh đề nào đúng.`,
   sol:[`${m('\\overline{P}: \\exists x \\in \\mathbb{R},\\ x^2 + x + 1 \\le 0')}.`, `${m('x^2 + x + 1 = \\left(x + \\dfrac{1}{2}\\right)^2 + \\dfrac{3}{4} \\ge \\dfrac{3}{4} \\gt 0')} với mọi ${m('x')}.`], ans:`${m('P')} đúng, ${m('\\overline{P}')} sai.`},
  {de:`Cho ${m('A = [-2;\\ 3)')}, ${m('B = (1;\\ 6]')}. Tìm ${m('A \\cap B,\\ A \\cup B,\\ A \\setminus B,\\ B \\setminus A')}.`,
   sol:[`Vẽ hai tập hợp lên trục số.`, `${m('A \\cap B = (1;\\ 3)')}; ${m('A \\cup B = [-2;\\ 6]')}.`, `${m('A \\setminus B = [-2;\\ 1]')} (1 không thuộc ${m('B')}); ${m('B \\setminus A = [3;\\ 6]')} (3 không thuộc ${m('A')}).`],
   ans:`${tb('(1;\\ 3),\\ [-2;\\ 6],\\ [-2;\\ 1],\\ [3;\\ 6]')}.`, lines:2},
  {de:`Lớp 10B có 40 học sinh, 22 em tham gia câu lạc bộ bóng đá, 17 em tham gia câu lạc bộ cờ vua, 8 em tham gia cả hai. Hỏi có bao nhiêu em không tham gia câu lạc bộ nào? Bao nhiêu em chỉ tham gia bóng đá?`,
   fig:venn2SVG({labelA:'Bóng đá', labelB:'Cờ vua', aOnly:null, both:8, bOnly:null, none:null}),
   sol:[`${m('n(A \\cup B) = 22 + 17 - 8 = 31')}.`, `Không tham gia: ${m('40 - 31 = 9')}. Chỉ bóng đá: ${m('22 - 8 = 14')}.`], ans:`${tb('9')} em; ${tb('14')} em.`},
 ]},
 {dang:'Dạng 2. Hệ bất phương trình, miền nghiệm, tối ưu', items:[
  {de:`Phần không bị gạch trong hình (kể cả biên) là miền nghiệm của hệ bất phương trình nào?`,
   fig:planeSVG({x:[-1,5], y:[-1,5], lines:[[1,2,6,false,'d₁'],[2,1,6,false,'d₂']], hatch:[[-1,0,0],[0,-1,0],[1,2,6],[2,1,6]], pts:[[3,0,''],[0,3,''],[2,2,'']]}),
   sol:[`Hai đường nét liền; điểm thử ${m('O(0;\\ 0)')} thuộc phần không gạch.`, `${m('d_1: x + 2y = 6')} ⇒ ${m('x + 2y \\le 6')}; ${m('d_2: 2x + y = 6')} ⇒ ${m('2x + y \\le 6')}; phần không gạch nằm trong góc phần tư thứ nhất.`],
   ans:`${tb('\\begin{cases}x \\ge 0 \\\\ y \\ge 0 \\\\ x + 2y \\le 6 \\\\ 2x + y \\le 6\\end{cases}')}`, lines:2},
  {de:`Với miền nghiệm ở bài trên, tìm giá trị lớn nhất của ${m('F(x;\\ y) = 2x + 3y')}.`,
   sol:[`Các đỉnh: ${m('O(0;\\ 0),\\ A(3;\\ 0),\\ B(2;\\ 2),\\ C(0;\\ 3)')} (B là giao điểm của ${m('d_1, d_2')}).`, `${m('F(O) = 0,\\ F(A) = 6,\\ F(B) = 10,\\ F(C) = 9')}.`], ans:`${tb('F_{\\max} = 10')} tại ${m('B(2;\\ 2)')}.`},
  {hard:true, de:`Mỗi bao thức ăn ${m('X')} chứa 2 đơn vị chất ${m('A')} và 1 đơn vị chất ${m('B')}; mỗi bao ${m('Y')} chứa 1 đơn vị ${m('A')} và 3 đơn vị ${m('B')}. Hỗn hợp cần ít nhất 10 đơn vị ${m('A')} và 15 đơn vị ${m('B')}. Giá mỗi bao ${m('X')} là 4 nghìn đồng, ${m('Y')} là 5 nghìn đồng. Tìm chi phí nhỏ nhất.`,
   fig:planeSVG({x:[-1,16], y:[-1,11], lines:[[2,1,10,false,'d₁'],[1,3,15,false,'d₂']], hatch:[[-1,0,0],[0,-1,0],[-2,-1,-10],[-1,-3,-15]], pts:[[3,4,'A'],[0,10,'B'],[15,0,'C']], unit:1}),
   sol:[`${m('x \\ge 0,\\ y \\ge 0,\\ 2x + y \\ge 10,\\ x + 3y \\ge 15')}; chi phí ${m('F = 4x + 5y')}.`, `Các đỉnh: ${m('A(3;\\ 4),\\ B(0;\\ 10),\\ C(15;\\ 0)')}.`, `${m('F(A) = 12 + 20 = 32,\\ F(B) = 50,\\ F(C) = 60')}.`], ans:`${tb('32')} nghìn đồng (3 bao ${m('X')}, 4 bao ${m('Y')}).`, lines:3},
 ]},
 {dang:'Dạng 3. Giá trị lượng giác và tam giác', items:[
  {de:`Cho ${m('\\sin\\alpha = \\dfrac{12}{13}')} và ${m('90^\\circ \\lt \\alpha \\lt 180^\\circ')}. Tính ${m('\\cos\\alpha,\\ \\tan\\alpha')} và ${m('P = \\sin\\alpha - \\cos\\alpha')}.`,
   sol:[`${m('\\cos^2\\alpha = 1 - \\dfrac{144}{169} = \\dfrac{25}{169}')}; góc tù nên ${m('\\cos\\alpha = -\\dfrac{5}{13}')}.`, `${m('\\tan\\alpha = -\\dfrac{12}{5}')}; ${m('P = \\dfrac{12}{13} + \\dfrac{5}{13} = \\dfrac{17}{13}')}.`], ans:`${tb('\\cos\\alpha = -\\dfrac{5}{13};\\ \\tan\\alpha = -\\dfrac{12}{5};\\ P = \\dfrac{17}{13}')}.`, lines:2},
  {de:`Tam giác ${m('ABC')} có ${m('AB = 5,\\ AC = 3,\\ \\widehat{A} = 120^\\circ')}. Tính ${m('BC')}, ${m('S')} và ${m('R')}.`, fig:triSVG({a:7, b:3, c:5, la:'?', lb:'3', lc:'5', gA:'120°'}),
   sol:[`${m('BC^2 = 25 + 9 - 2\\cdot 5\\cdot 3\\cdot\\left(-\\dfrac{1}{2}\\right) = 49')} ⇒ ${m('BC = 7')}.`, `${m('S = \\dfrac{1}{2}\\cdot 5\\cdot 3\\cdot\\sin 120^\\circ = \\dfrac{15\\sqrt{3}}{4}')}.`, `${m('R = \\dfrac{BC}{2\\sin A} = \\dfrac{7}{\\sqrt{3}} = \\dfrac{7\\sqrt{3}}{3}')}.`],
   ans:`${tb('BC = 7;\\ S = \\dfrac{15\\sqrt{3}}{4};\\ R = \\dfrac{7\\sqrt{3}}{3}')}.`, lines:3},
 ]},
 {dang:'Dạng 4. Bài toán đo đạc thực tế (có hình)', items:[
  {hard:true, de:`Từ vị trí ${m('A')} người ta nhìn ngọn cây ${m('T')} dưới góc ${m('35^\\circ')} so với mặt đất; tiến thẳng về phía gốc cây 30 m đến ${m('B')} thì nhìn ngọn cây dưới góc ${m('50^\\circ')}. Tính chiều cao của cây (làm tròn đến hàng phần mười).`,
   fig:treeSVG({d:'30 m', a:'35°', b:'50°', h:'?'}),
   sol:[`${m('\\widehat{ATB} = 50^\\circ - 35^\\circ = 15^\\circ')} (góc ngoài tại ${m('B')}).`, `Định lí sin trong tam giác ${m('ATB')}: ${m('BT = \\dfrac{AB\\sin 35^\\circ}{\\sin 15^\\circ} \\approx \\dfrac{30\\cdot 0{,}5736}{0{,}2588} \\approx 66{,}5')}.`, `${m('TH = BT\\sin 50^\\circ \\approx 66{,}5\\cdot 0{,}7660 \\approx 50{,}9')} m.`], ans:`${tb('\\approx 50{,}9')} m.`, lines:3},
  {hard:true, de:`Anh Bắc đứng trên đài quan sát cao 15 m, cách toà nhà (theo phương ngang) ${m('20\\sqrt{3}')} m. Từ đài, anh nhìn chân cột cờ trên nóc toà nhà dưới góc ${m('30^\\circ')} và đỉnh cột cờ dưới góc ${m('60^\\circ')} so với phương ngang. Tính chiều cao toà nhà và cột cờ.`,
   fig:obsSVG({h:'15 m', d:'20√3 m', a:'30°', b:'60°', hb:'?', hf:'?'}),
   sol:[`Phần toà nhà cao hơn tầm mắt: ${m('20\\sqrt{3}\\tan 30^\\circ = 20')} m ⇒ toà nhà cao ${m('15 + 20 = 35')} m.`, `Đỉnh cột cờ cao hơn tầm mắt ${m('20\\sqrt{3}\\tan 60^\\circ = 60')} m ⇒ cột cờ cao ${m('60 - 20 = 40')} m.`],
   ans:`Toà nhà ${tb('35')} m; cột cờ ${tb('40')} m.`, lines:3},
 ]},
]);
})();

/* =====================================================================
   CHƯƠNG IV. VECTƠ – Bài 7 và Bài 8 (10 bài mỗi phiếu = 7 cơ bản + 3 vận dụng ★)
   ===================================================================== */
(() => {
const m = tm, d = td;
const v = (a, b) => `\\overrightarrow{${a}${b}}`, len = (a, b) => `\\left|${v(a, b)}\\right|`, ZERO = '\\vec{0}';
const s3 = Math.sqrt(3);
const PAR = {A:[0, 0], B:[4, 0], C:[5, 3], D:[1, 3], O:[2.5, 1.5]};
const HEX = {A:[2, 0], B:[1, s3], C:[-1, s3], D:[-2, 0], E:[-1, -s3], F:[1, -s3], O:[0, 0]};
const pts = P => Object.entries(P).map(([k, [x, y]]) => [x, y, k]);
const F_par = () => vecSVG({pts:pts(PAR), poly:['A', 'B', 'C', 'D'], dash:[['A', 'C'], ['B', 'D']], h:200});
const F_hex = () => vecSVG({pts:pts(HEX), poly:['A', 'B', 'C', 'D', 'E', 'F'], dash:[['A', 'D'], ['B', 'E'], ['C', 'F']], h:210});
const F_med = () => vecSVG({pts:[[0, 0, 'A'], [4, 0, 'B'], [1, 3, 'C'], [2.5, 1.5, 'M'], [0.5, 1.5, 'N'], [2, 0, 'P']], poly:['A', 'B', 'C'], dash:[['M', 'N'], ['N', 'P'], ['P', 'M']], h:200});
const F_rect = (w, h) => vecSVG({pts:[[0, 0, 'A'], [w, 0, 'B'], [w, h, 'C'], [0, h, 'D']], poly:['A', 'B', 'C', 'D'], dash:[['A', 'C'], ['B', 'D']], h:170});
const F_lc = (a, b) => vecSVG({pts:[[0, 0, 'O'], [a, 0, 'A'], [0, b, 'B'], [a, b, 'C']], dash:[['A', 'C'], ['B', 'C']], vecs:[['O', 'A', 'F₁'], ['O', 'B', 'F₂'], ['O', 'C', 'F', 'alt']], h:170});

Lecture.addPractice('lop10', 'bai-7', [
 {dang:'Dạng 1. Đếm vectơ', items:[
  {de:`Cho 7 điểm phân biệt. Có bao nhiêu vectơ khác ${m(ZERO)} có điểm đầu và điểm cuối thuộc 7 điểm đó?`, sol:[`Điểm đầu: 7 cách; điểm cuối khác điểm đầu: 6 cách.`, `${m('7\\cdot 6 = 42')}.`], ans:`${tb('42')} vectơ.`, lines:2},
  {hard:true, de:`Trên đường thẳng ${m('d')} lấy 5 điểm, trên đường thẳng ${m('d\'')} lấy 6 điểm (11 điểm khác nhau). Có bao nhiêu vectơ khác ${m(ZERO)} có điểm đầu và điểm cuối cùng nằm trên ${m('d')} hoặc cùng nằm trên ${m('d\'')}?`,
   sol:[`Trên ${m('d')}: ${m('5\\cdot 4 = 20')} vectơ.`, `Trên ${m('d\'')}: ${m('6\\cdot 5 = 30')} vectơ.`, `Tổng: ${m('20 + 30 = 50')}.`], ans:`${tb('50')} vectơ.`, lines:3},
 ]},
 {dang:'Dạng 2. Nhận biết vectơ bằng nhau, đối nhau, cùng phương, cùng hướng', items:[
  {de:`Cho hình bình hành ${m('ABCD')} có tâm ${m('O')}. Tìm vectơ bằng ${m(v('A', 'O'))} và hai vectơ đối của ${m(v('A', 'B'))}.`, fig:F_par(),
   sol:[`${m('O')} là trung điểm ${m('AC')}: ${m(`${v('A', 'O')} = ${v('O', 'C')}`)}.`, `Vectơ đối của ${m(v('A', 'B'))} là ${m(v('B', 'A'))}; vì ${m(`${v('A', 'B')} = ${v('D', 'C')}`)} nên ${m(v('C', 'D'))} cũng là vectơ đối của ${m(v('A', 'B'))}.`], ans:`${tb(v('O', 'C'))}; ${tb(`${v('B', 'A')},\\ ${v('C', 'D')}`)}.`, lines:3},
  {de:`Cho lục giác đều ${m('ABCDEF')} tâm ${m('O')}. Tìm tất cả các vectơ khác ${m(ZERO)} bằng ${m(v('O', 'A'))} có điểm đầu, điểm cuối thuộc ${m('\\{A, B, C, D, E, F, O\\}')} (không kể ${m(v('O', 'A'))}).`, fig:F_hex(),
   sol:[`Các tam giác ${m('OAB, OBC, \\ldots')} đều nên các cạnh đối của hình thoi ${m('OABC')} … song song và bằng nhau.`, `Kiểm tra hướng: ${m(v('C', 'B'))}, ${m(v('D', 'O'))}, ${m(v('E', 'F'))} cùng hướng với ${m(v('O', 'A'))} và cùng độ dài.`], ans:`${tb(`${v('C', 'B')},\\ ${v('D', 'O')},\\ ${v('E', 'F')}`)}.`, lines:3},
  {hard:true, de:`Cho tam giác ${m('ABC')}; ${m('M, N, P')} lần lượt là trung điểm ${m('BC, CA, AB')}. Tìm các vectơ khác ${m(ZERO)} bằng ${m(v('A', 'P'))}, có điểm đầu và điểm cuối thuộc ${m('\\{A, B, C, M, N, P\\}')} (không kể ${m(v('A', 'P'))}).`, fig:F_med(),
   sol:[`${m('NM')} là đường trung bình của tam giác ${m('ABC')}: ${m('NM \\parallel AB')}, ${m('NM = \\dfrac{AB}{2} = AP')}.`, `Hướng: ${m(v('N', 'M'))} cùng hướng ${m(v('A', 'B'))} nên cùng hướng ${m(v('A', 'P'))}. Cũng có ${m(`${v('P', 'B')} = ${v('A', 'P')}`)} vì ${m('P')} là trung điểm ${m('AB')}.`], ans:`${tb(`${v('P', 'B')},\\ ${v('N', 'M')}`)}.`, lines:3},
 ]},
 {dang:'Dạng 3. Độ dài vectơ', items:[
  {de:`Hình chữ nhật ${m('ABCD')} có ${m('AB = 9')}, ${m('AD = 12')}. Tính ${m(len('A', 'C'))} và ${m(len('B', 'D'))}.`, fig:F_rect(9, 6.4),
   sol:[`${m(`${len('A', 'C')} = AC = \\sqrt{9^2 + 12^2} = 15`)}.`, `Hai đường chéo hình chữ nhật bằng nhau: ${m(`${len('B', 'D')} = 15`)}.`], ans:`${tb('15')} và ${tb('15')}.`, lines:2},
  {de:`Hình thoi ${m('ABCD')} có hai đường chéo ${m('AC = 10')}, ${m('BD = 24')}. Tính ${m(len('A', 'B'))}.`,
   sol:[`Hai đường chéo vuông góc tại trung điểm mỗi đường: ${m('OA = 5,\\ OB = 12')}.`, `Tam giác ${m('OAB')} vuông tại ${m('O')}: ${m('AB = \\sqrt{5^2 + 12^2} = 13')}.`], ans:`${tb('13')}.`, lines:2},
  {de:`Tam giác ${m('ABC')} vuông tại ${m('A')} có ${m('AB = 5')}, ${m('AC = 12')}; ${m('M')} là trung điểm ${m('BC')}. Tính ${m(len('A', 'M'))}.`,
   sol:[`${m('BC = \\sqrt{5^2 + 12^2} = 13')}.`, `Trung tuyến ứng với cạnh huyền: ${m('AM = \\dfrac{BC}{2} = 6{,}5')}.`], ans:`${tb('6{,}5')}.`, lines:2},
 ]},
 {dang:'Dạng 4. Biểu diễn lực, vận tốc bằng vectơ', items:[
  {de:`Một lực 150 N được biểu diễn bởi vectơ, tỉ lệ xích 1 cm ứng với 30 N. Vectơ có độ dài bao nhiêu xentimét? Nếu có một lực khác 90 N cùng hướng thì vectơ biểu diễn dài bao nhiêu?`, sol:[`${m('150 : 30 = 5')} cm.`, `${m('90 : 30 = 3')} cm; hai vectơ cùng hướng, độ dài khác nhau.`], ans:`${tb('5')} cm và ${tb('3')} cm.`, lines:2},
  {hard:true, de:`Bốn xe cùng ghi vận tốc: xe A hướng Bắc 40 km/h, xe B hướng Nam 40 km/h, xe C hướng Bắc 40 km/h, xe D hướng Bắc 30 km/h. Với mỗi cặp (A,C), (A,B), (A,D): hai vectơ vận tốc bằng nhau, đối nhau hay cùng hướng nhưng độ dài khác nhau?`,
   sol:[`(A,C): cùng hướng Bắc, cùng độ lớn 40 ⇒ <b>bằng nhau</b>.`, `(A,B): Bắc – Nam ngược hướng, cùng độ lớn ⇒ <b>đối nhau</b>.`, `(A,D): cùng hướng Bắc, độ lớn 40 ≠ 30 ⇒ <b>cùng hướng, độ dài khác nhau</b>.`], ans:`(A,C): ${tb('bằng nhau')}; (A,B): ${tb('đối nhau')}; (A,D): ${tb('cùng hướng, khác độ dài')}.`, lines:3},
 ]},
]);

Lecture.addPractice('lop10', 'bai-8', [
 {dang:'Dạng 1. Rút gọn biểu thức vectơ', items:[
  {de:`Rút gọn ${m(`u = ${v('M', 'N')} + ${v('N', 'P')} + ${v('P', 'Q')} - ${v('M', 'Q')}`)}.`, sol:[`${m(`${v('M', 'N')} + ${v('N', 'P')} + ${v('P', 'Q')} = ${v('M', 'Q')}`)} (quy tắc ba điểm liên tiếp).`, `${m(`u = ${v('M', 'Q')} - ${v('M', 'Q')} = ${ZERO}`)}.`], ans:`${m('u =')} ${tb(ZERO)}.`, lines:2},
  {de:`Cho bốn điểm ${m('A, B, C, D')}. Rút gọn ${m(`u = ${v('A', 'B')} + ${v('B', 'C')} - ${v('D', 'C')}`)}.`, sol:[`${m(`${v('A', 'B')} + ${v('B', 'C')} = ${v('A', 'C')}`)}.`, `${m(`-${v('D', 'C')} = ${v('C', 'D')}`)} nên ${m(`u = ${v('A', 'C')} + ${v('C', 'D')} = ${v('A', 'D')}`)}.`], ans:`${m('u =')} ${tb(v('A', 'D'))}.`, lines:2},
  {hard:true, de:`Cho bốn điểm ${m('A, B, C, D')}. Chứng minh ${m(`${v('A', 'C')} + ${v('B', 'D')} = ${v('A', 'D')} + ${v('B', 'C')}`)}.`,
   sol:[`Biến đổi vế trái: ${m(`${v('A', 'C')} = ${v('A', 'D')} + ${v('D', 'C')}`)}.`, `${m(`${v('A', 'C')} + ${v('B', 'D')} = ${v('A', 'D')} + ${v('D', 'C')} + ${v('B', 'D')}`)}; sắp xếp: ${m(`${v('B', 'D')} + ${v('D', 'C')} = ${v('B', 'C')}`)}.`, `Suy ra vế trái ${m(`= ${v('A', 'D')} + ${v('B', 'C')}`)}.`], ans:`Đẳng thức được chứng minh.`, lines:3},
 ]},
 {dang:'Dạng 2. Độ dài của tổng và hiệu hai vectơ', items:[
  {de:`Hình chữ nhật ${m('ABCD')} có ${m('AB = 9')}, ${m('AD = 12')}. Tính ${m(`\\left|${v('A', 'B')} + ${v('A', 'D')}\\right|`)}.`, fig:F_rect(9, 6.4),
   sol:[`${m(`${v('A', 'B')} + ${v('A', 'D')} = ${v('A', 'C')}`)} (quy tắc hình bình hành).`, `${m('AC = \\sqrt{9^2 + 12^2} = 15')}.`], ans:`${tb('15')}.`, lines:2},
  {de:`Hình thoi ${m('ABCD')} cạnh 13, đường chéo ${m('AC = 24')}. Tính ${m(`\\left|${v('A', 'B')} + ${v('A', 'D')}\\right|`)} và ${m(`\\left|${v('A', 'B')} - ${v('A', 'D')}\\right|`)}.`,
   sol:[`${m(`${v('A', 'B')} + ${v('A', 'D')} = ${v('A', 'C')}`)} nên độ dài là ${m('AC = 24')}.`, `${m(`${v('A', 'B')} - ${v('A', 'D')} = ${v('D', 'B')}`)} nên độ dài là ${m('BD')}: nửa đường chéo ${m('OA = 12')}, ${m('OB = \\sqrt{13^2 - 12^2} = 5')}, ${m('BD = 10')}.`], ans:`${tb('24')} và ${tb('10')}.`, lines:3},
  {de:`Tam giác ${m('ABC')} vuông tại ${m('A')} có ${m('AB = 5')}, ${m('AC = 12')}. Tính ${m(`\\left|${v('A', 'B')} + ${v('A', 'C')}\\right|`)} và ${m(`\\left|${v('A', 'B')} - ${v('A', 'C')}\\right|`)}.`,
   sol:[`${m(`${v('A', 'B')} + ${v('A', 'C')} = 2${v('A', 'M')}`)} (${m('M')} là trung điểm ${m('BC')}); ${m('BC = 13')}, ${m('AM = 6{,}5')} nên độ dài bằng ${m('13')}.`, `${m(`${v('A', 'B')} - ${v('A', 'C')} = ${v('C', 'B')}`)} nên độ dài bằng ${m('CB = 13')}.`], ans:`${tb('13')} và ${tb('13')}.`, lines:3},
 ]},
 {dang:'Dạng 3. Chứng minh đẳng thức vectơ, trung điểm, trọng tâm', items:[
  {de:`Cho hình bình hành ${m('ABCD')} tâm ${m('O')}. Chứng minh ${m(`${v('O', 'A')} + ${v('O', 'B')} + ${v('O', 'C')} + ${v('O', 'D')} = ${ZERO}`)}.`, fig:F_par(),
   sol:[`${m('O')} là trung điểm của ${m('AC')} và ${m('BD')} nên ${m(`${v('O', 'A')} + ${v('O', 'C')} = ${ZERO}`)} và ${m(`${v('O', 'B')} + ${v('O', 'D')} = ${ZERO}`)}.`, `Cộng hai đẳng thức, ta được điều phải chứng minh.`], ans:`Đẳng thức được chứng minh.`, lines:3},
  {hard:true, de:`Cho tam giác ${m('ABC')}; ${m('D, E, F')} là trung điểm ${m('BC, CA, AB')}. Chứng minh ${m(`${v('A', 'D')} + ${v('B', 'E')} + ${v('C', 'F')} = ${ZERO}`)}.`, fig:vecSVG({pts:[[0, 0, 'A'], [4, 0, 'B'], [1, 3, 'C'], [2.5, 1.5, 'D'], [0.5, 1.5, 'E'], [2, 0, 'F']], poly:['A', 'B', 'C'], dash:[['F', 'D'], ['D', 'E'], ['E', 'F']], h:200}),
   sol:[`${m('AFDE')} là hình bình hành (${m('FD \\parallel AC,\\ DE \\parallel AB')}): ${m(`${v('A', 'D')} = ${v('A', 'F')} + ${v('A', 'E')}`)}.`, `Tương tự ${m(`${v('B', 'E')} = ${v('B', 'D')} + ${v('B', 'F')}`)} và ${m(`${v('C', 'F')} = ${v('C', 'D')} + ${v('C', 'E')}`)}.`, `Cộng lại: ${m(`(${v('A', 'F')} + ${v('B', 'F')}) + (${v('A', 'E')} + ${v('C', 'E')}) + (${v('B', 'D')} + ${v('C', 'D')})`)}; mỗi ngoặc bằng ${m(ZERO)} vì ${m('F, E, D')} là trung điểm.`], ans:`Đẳng thức được chứng minh.`, lines:4},
 ]},
 {dang:'Dạng 4. Hợp lực, vận tốc', items:[
  {de:`Hai lực ${m('\\vec{F_1}, \\vec{F_2}')} có độ lớn 20 N và 21 N, cùng tác dụng vào một vật tại ${m('O')}, phương vuông góc với nhau. Tính độ lớn hợp lực.`, fig:F_lc(2, 2.1),
   sol:[`Hợp lực là đường chéo của hình chữ nhật hai cạnh 20 và 21.`, `${m('F = \\sqrt{20^2 + 21^2} = \\sqrt{841} = 29')}.`], ans:`${tb('29')} N.`, lines:2},
  {hard:true, de:`Một con sông rộng 200 m, nước chảy với vận tốc 3 km/h. Thuyền chạy với vận tốc 4 km/h so với nước, hướng luôn vuông góc với bờ. Tính vận tốc thực của thuyền so với bờ và thời gian qua sông; khi sang đến bờ bên kia, thuyền bị nước đẩy xuôi dòng bao nhiêu mét?`,
   sol:[`Vận tốc thực: ${m('v = \\sqrt{3^2 + 4^2} = 5')} km/h.`, `Thời gian qua sông: ${m('\\dfrac{0{,}2}{4} = 0{,}05')} giờ (3 phút) vì thành phần vận tốc vuông góc với bờ là 4 km/h.`, `Quãng bị đẩy xuôi dòng: ${m('3\\cdot 0{,}05 = 0{,}15')} km = 150 m.`], ans:`${tb('5')} km/h; ${tb('3')} phút; trôi ${tb('150')} m.`, lines:4},
 ]},
]);
})();

/* =====================================================================
   BÀI 9. TÍCH CỦA MỘT SỐ VỚI MỘT VECTƠ (thầy yêu cầu 17/10/2026) – 7 cơ bản + 3 vận dụng (★), xếp theo 4 dạng của bài giảng bai-9.
   ===================================================================== */
(() => {
const m = tm, v = (a, b) => `\\overrightarrow{${a}${b}}`, ZERO = '\\vec{0}';
Lecture.addPractice('lop10', 'bai-9', [
 {dang:'Dạng 1. Độ dài và hướng của k·a', items:[
  {de:`Cho ${m('\\left|\\vec{a}\\right| = 7')}. Tính ${m('\\left|-4\\vec{a}\\right|')} và ${m('\\left|\\dfrac{1}{2}\\vec{a}\\right|')}; nêu hướng của mỗi vectơ so với ${m('\\vec{a}')}.`,
   sol:[`${m('\\left|-4\\vec{a}\\right| = |-4|\\cdot 7 = 28')}; ${m('-4 \\lt 0')} nên ngược hướng với ${m('\\vec{a}')}.`, `${m('\\left|\\dfrac{1}{2}\\vec{a}\\right| = \\dfrac{1}{2}\\cdot 7 = 3{,}5')}; ${m('\\dfrac{1}{2} \\gt 0')} nên cùng hướng.`],
   ans:`${tb('28')} (ngược hướng); ${tb('3{,}5')} (cùng hướng).`},
  {de:`Ô tô A chạy hướng Bắc với vận tốc ${m('\\vec{a}')} có độ lớn 60 km/h. Ô tô B chạy hướng Nam với tốc độ 40 km/h. Viết vận tốc ${m('\\vec{b}')} của ô tô B dưới dạng ${m('k\\vec{a}')}.`,
   sol:[`Hai xe đi ngược hướng nên ${m('k \\lt 0')}.`, `${m('|k| = \\dfrac{40}{60} = \\dfrac{2}{3}')}.`],
   ans:`${tb('\\vec{b} = -\\dfrac{2}{3}\\vec{a}')}.`},
 ]},
 {dang:'Dạng 2. Hệ thức trung điểm, trọng tâm', items:[
  {de:`Cho hình bình hành ${m('ABCD')} tâm ${m('O')}. Với điểm ${m('M')} bất kì, ${m(`${v('M', 'A')} + ${v('M', 'B')} + ${v('M', 'C')} + ${v('M', 'D')} = k${v('M', 'O')}`)}. Tìm ${m('k')}.`,
   sol:[`${m('O')} là trung điểm ${m('AC')}: ${m(`${v('M', 'A')} + ${v('M', 'C')} = 2${v('M', 'O')}`)}.`, `${m('O')} là trung điểm ${m('BD')}: ${m(`${v('M', 'B')} + ${v('M', 'D')} = 2${v('M', 'O')}`)}. Cộng lại được ${m('4')}.`],
   ans:`${tb('k = 4')}.`},
  {de:`Tam giác ${m('ABC')} có trọng tâm ${m('G')}. Biết ${m(`${v('G', 'A')} + ${v('G', 'B')} = k${v('G', 'C')}`)}. Tìm ${m('k')}.`,
   sol:[`${m('G')} là trọng tâm nên ${m(`${v('G', 'A')} + ${v('G', 'B')} + ${v('G', 'C')} = ${ZERO}`)}.`, `Suy ra ${m(`${v('G', 'A')} + ${v('G', 'B')} = -${v('G', 'C')}`)}.`],
   ans:`${tb('k = -1')}.`},
  {hard:true, de:`Tam giác ${m('ABC')} có ${m('M, N, P')} lần lượt là trung điểm ${m('BC, CA, AB')}. Chứng minh ${m(`${v('A', 'M')} + ${v('B', 'N')} + ${v('C', 'P')} = ${ZERO}`)}.`,
   sol:[`${m(`${v('A', 'M')} = \\dfrac{1}{2}(${v('A', 'B')} + ${v('A', 'C')})`)}, ${m(`${v('B', 'N')} = \\dfrac{1}{2}(${v('B', 'A')} + ${v('B', 'C')})`)}, ${m(`${v('C', 'P')} = \\dfrac{1}{2}(${v('C', 'A')} + ${v('C', 'B')})`)} (hệ thức trung điểm).`, `Cộng ba đẳng thức: ${m(`\\dfrac{1}{2}[(${v('A', 'B')} + ${v('B', 'A')}) + (${v('A', 'C')} + ${v('C', 'A')}) + (${v('B', 'C')} + ${v('C', 'B')})] = ${ZERO}`)}.`],
   ans:`Đẳng thức được chứng minh.`},
 ]},
 {dang:'Dạng 3. Hai vectơ cùng phương, ba điểm thẳng hàng', items:[
  {de:`Cho ${m('\\vec{u} = 2\\vec{a} - 4\\vec{b}')} và ${m('\\vec{v} = -6\\vec{a} + 12\\vec{b}')}. Tìm ${m('k')} để ${m('\\vec{v} = k\\vec{u}')}.`,
   sol:[`${m('-6 = 2k')} nên ${m('k = -3')}.`, `Kiểm tra hệ số của ${m('\\vec{b}')}: ${m('(-3)\\cdot(-4) = 12')} đúng.`],
   ans:`${tb('k = -3')}.`},
  {hard:true, de:`Cho hai vectơ ${m('\\vec{a}, \\vec{b}')} không cùng phương; ${m(`${v('A', 'B')} = 2\\vec{a} - \\vec{b}`)}, ${m(`${v('B', 'C')} = -6\\vec{a} + 3\\vec{b}`)}. Tính ${m(v('A', 'C'))} theo ${m(v('A', 'B'))} và chứng minh ${m('A, B, C')} thẳng hàng.`,
   sol:[`${m(`${v('A', 'C')} = ${v('A', 'B')} + ${v('B', 'C')} = -4\\vec{a} + 2\\vec{b}`)}.`, `${m(`-4\\vec{a} + 2\\vec{b} = -2(2\\vec{a} - \\vec{b}) = -2${v('A', 'B')}`)}, hai vectơ cùng phương và chung điểm ${m('A')}.`],
   ans:`${tb(`${v('A', 'C')} = -2${v('A', 'B')}`)}; ${m('A, B, C')} thẳng hàng.`},
 ]},
 {dang:'Dạng 4. Phân tích vectơ theo hai vectơ không cùng phương', items:[
  {de:`Tam giác ${m('ABC')} có trọng tâm ${m('G')}. Phân tích ${m(v('A', 'G'))} theo ${m(v('A', 'B'))} và ${m(v('A', 'C'))}.`,
   sol:[`Gọi ${m('M')} là trung điểm ${m('BC')}: ${m(`${v('A', 'G')} = \\dfrac{2}{3}${v('A', 'M')}`)}.`, `${m(`${v('A', 'M')} = \\dfrac{1}{2}(${v('A', 'B')} + ${v('A', 'C')})`)} nên ${m(`${v('A', 'G')} = \\dfrac{1}{3}(${v('A', 'B')} + ${v('A', 'C')})`)}.`],
   ans:`${tb(`${v('A', 'G')} = \\dfrac{1}{3}${v('A', 'B')} + \\dfrac{1}{3}${v('A', 'C')}`)}.`},
  {de:`Tam giác ${m('ABC')}, điểm ${m('N')} thuộc ${m('AC')} sao cho ${m(`${v('A', 'N')} = \\dfrac{1}{4}${v('A', 'C')}`)}. Phân tích ${m(v('B', 'N'))} theo ${m(v('A', 'B'))} và ${m(v('A', 'C'))}.`,
   sol:[`${m(`${v('B', 'N')} = ${v('B', 'A')} + ${v('A', 'N')}`)}.`, `${m(`${v('B', 'A')} = -${v('A', 'B')}`)} nên ${m(`${v('B', 'N')} = -${v('A', 'B')} + \\dfrac{1}{4}${v('A', 'C')}`)}.`],
   ans:`${tb(`${v('B', 'N')} = -${v('A', 'B')} + \\dfrac{1}{4}${v('A', 'C')}`)}.`},
  {hard:true, de:`Tam giác ${m('ABC')}, điểm ${m('I')} thoả ${m(`${v('I', 'A')} + 2${v('I', 'B')} + 3${v('I', 'C')} = ${ZERO}`)}. Phân tích ${m(v('A', 'I'))} theo ${m(v('A', 'B'))} và ${m(v('A', 'C'))}.`,
   sol:[`Chèn ${m('A')}: ${m(`${v('I', 'A')} = -${v('A', 'I')}`)}, ${m(`${v('I', 'B')} = ${v('A', 'B')} - ${v('A', 'I')}`)}, ${m(`${v('I', 'C')} = ${v('A', 'C')} - ${v('A', 'I')}`)}.`, `${m(`-${v('A', 'I')} + 2${v('A', 'B')} - 2${v('A', 'I')} + 3${v('A', 'C')} - 3${v('A', 'I')} = ${ZERO}`)} suy ra ${m(`6${v('A', 'I')} = 2${v('A', 'B')} + 3${v('A', 'C')}`)}.`],
   ans:`${tb(`${v('A', 'I')} = \\dfrac{1}{3}${v('A', 'B')} + \\dfrac{1}{2}${v('A', 'C')}`)}.`},
 ]},
]);
})();
