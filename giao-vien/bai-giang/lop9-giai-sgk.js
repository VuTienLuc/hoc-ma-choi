/* =====================================================================
   GIẢI BÀI TẬP SGK – LỚP 9 (Kết nối tri thức, tập 1) – Chương II, Bài 4. Phương trình quy về phương trình bậc nhất một ẩn.
   Lecture.addSgk(lớp, mã bài giảng, [trang chiếu…]). Nạp SAU tệp bài giảng lop9.js.
   Đề lấy từ văn bản SGK tìm được trên mạng: Bài 2.2, 2.3, 2.5 (tr. 30). Thầy đối chiếu số trang với SGK in.
   ===================================================================== */
(() => {
const m = tm;
const box = h => `<div class="lk-box">${h}</div>`, note = h => `<div class="lk-note">⚠️ ${h}</div>`;

Lecture.addSgk('lop9', 'bai-4', [
  {kind:'title', tag:'Toán 9 · Kết nối tri thức · Giải bài tập SGK', title:'Bài 4. Phương trình quy về phương trình bậc nhất một ẩn', sub:'Các câu vận dụng, câu khó – SGK tập 1, trang 30',
   points:['Bài 2.2 (tr. 30): phương trình tích sau khi đặt nhân tử chung / dùng hằng đẳng thức.', 'Bài 2.3 (tr. 30): phương trình chứa ẩn ở mẫu, mẫu chung là tích hoặc ' + m('x^3 + 1') + '.', 'Bài 2.5 (tr. 30): bài toán hai người cùng làm một công việc.']},

  {kind:'kt', tag:'Nhắc nhanh', title:'Hai kĩ năng cần dùng',
   body: box(`<b>Phương trình tích:</b> ${m('A\\cdot B = 0 \\Leftrightarrow A = 0 \\text{ hoặc } B = 0')}. Đưa về dạng tích bằng cách đặt nhân tử chung hoặc dùng hằng đẳng thức ${m('a^2 - b^2 = (a - b)(a + b)')}.`) +
     `<ol class="lk-steps"><li>Tìm ĐKXĐ (mọi mẫu khác ${m('0')}).</li><li>Phân tích mẫu thành nhân tử, tìm mẫu chung, quy đồng và khử mẫu.</li><li>Giải phương trình nhận được.</li><li>Đối chiếu ĐKXĐ rồi kết luận.</li></ol>` +
     note(`${m('x^3 + 1 = (x + 1)(x^2 - x + 1)')} và ${m('x^2 - x + 1 \\gt 0')} với mọi ${m('x')}, nên ĐKXĐ của câu 2.3b chỉ là ${m('x \\ne -1')}.`)},

  {kind:'vd', tag:'SGK tr. 30 · Bài 2.2', label:'Câu 1', de:`Giải các phương trình sau: a) ${m('(x^2 - 4) + x(x - 2) = 0')}; &nbsp; b) ${m('(2x + 1)^2 - 9x^2 = 0')}.`,
   sol:[`a) ${m('x^2 - 4 = (x - 2)(x + 2)')} (hằng đẳng thức hiệu hai bình phương), nên phương trình thành ${m('(x - 2)(x + 2) + x(x - 2) = 0')}.`,
     `Đặt nhân tử chung ${m('x - 2')}: ${m('(x - 2)(x + 2 + x) = 0 \\Leftrightarrow (x - 2)(2x + 2) = 0')}.`,
     `${m('x - 2 = 0 \\Leftrightarrow x = 2')}; &nbsp; ${m('2x + 2 = 0 \\Leftrightarrow x = -1')}.`,
     `b) ${m('9x^2 = (3x)^2')} nên ${m('(2x + 1)^2 - (3x)^2 = 0 \\Leftrightarrow (2x + 1 - 3x)(2x + 1 + 3x) = 0 \\Leftrightarrow (1 - x)(5x + 1) = 0')}.`,
     `${m('1 - x = 0 \\Leftrightarrow x = 1')}; &nbsp; ${m('5x + 1 = 0 \\Leftrightarrow x = -\\dfrac{1}{5}')}.`],
   ans:`a) ${tb('x = 2')} hoặc ${tb('x = -1')}; &nbsp; b) ${tb('x = 1')} hoặc ${tb('x = -\\tfrac{1}{5}')}.`},

  {kind:'vd', tag:'SGK tr. 30 · Bài 2.3', label:'Câu 2', de:`Giải các phương trình sau: a) ${m('\\dfrac{2}{2x + 1} + \\dfrac{1}{x + 1} = \\dfrac{3}{(2x + 1)(x + 1)}')}; &nbsp; b) ${m('\\dfrac{1}{x + 1} - \\dfrac{x}{x^2 - x + 1} = \\dfrac{3x}{x^3 + 1}')}.`,
   sol:[`a) ĐKXĐ: ${m('2x + 1 \\ne 0')} và ${m('x + 1 \\ne 0')}, tức ${m('x \\ne -\\dfrac{1}{2}')} và ${m('x \\ne -1')}. Mẫu chung ${m('(2x + 1)(x + 1)')}.`,
     `Quy đồng, khử mẫu: ${m('2(x + 1) + (2x + 1) = 3 \\Leftrightarrow 4x + 3 = 3 \\Leftrightarrow x = 0')}. Giá trị ${m('x = 0')} thỏa mãn ĐKXĐ.`,
     `b) ĐKXĐ: ${m('x \\ne -1')}. Mẫu chung ${m('x^3 + 1 = (x + 1)(x^2 - x + 1)')}.`,
     `Khử mẫu: ${m('(x^2 - x + 1) - x(x + 1) = 3x \\Leftrightarrow 1 - 2x = 3x \\Leftrightarrow x = \\dfrac{1}{5}')}. Giá trị này thỏa mãn ĐKXĐ.`],
   ans:`a) ${tb('x = 0')}; &nbsp; b) ${tb('x = \\tfrac{1}{5}')}.`},

  {kind:'vd', tag:'SGK tr. 30 · Bài 2.5', label:'Câu 3', de:`Hai người cùng làm chung một công việc thì xong trong ${m('8')} giờ. Hai người cùng làm được ${m('4')} giờ thì người thứ nhất bị điều đi làm công việc khác; người thứ hai tiếp tục làm trong ${m('12')} giờ nữa thì xong công việc. Gọi ${m('x')} là thời gian người thứ nhất làm một mình xong công việc (giờ, ${m('x \\gt 0')}). a) Biểu thị theo ${m('x')} khối lượng công việc mỗi người làm được trong ${m('1')} giờ. b) Lập phương trình theo ${m('x')} và giải; cho biết nếu làm một mình thì mỗi người cần bao lâu.`,
   sol:[`a) Người thứ nhất làm được ${m('\\dfrac{1}{x}')} công việc trong 1 giờ. Cả hai làm được ${m('\\dfrac{1}{8}')} công việc trong 1 giờ nên người thứ hai làm được ${m('\\dfrac{1}{8} - \\dfrac{1}{x}')} công việc trong 1 giờ.`,
     `b) Hai người làm ${m('4')} giờ được ${m('4\\cdot\\dfrac{1}{8} = \\dfrac{1}{2}')} công việc; người thứ hai làm ${m('12')} giờ được ${m('12\\left(\\dfrac{1}{8} - \\dfrac{1}{x}\\right)')}. Tổng bằng ${m('1')} công việc: ${m('\\dfrac{1}{2} + 12\\left(\\dfrac{1}{8} - \\dfrac{1}{x}\\right) = 1')}.`,
     `Rút gọn: ${m('\\dfrac{1}{2} + \\dfrac{3}{2} - \\dfrac{12}{x} = 1 \\Leftrightarrow \\dfrac{12}{x} = 1 \\Leftrightarrow x = 12')} (thỏa mãn ĐKXĐ ${m('x \\ne 0')} và ${m('x \\gt 0')}).`,
     `Người thứ hai: ${m('\\dfrac{1}{8} - \\dfrac{1}{12} = \\dfrac{1}{24}')} công việc mỗi giờ, nên làm một mình xong trong ${m('24')} giờ.`],
   ans:`Người thứ nhất ${tb('12')} giờ; người thứ hai ${tb('24')} giờ. <i>Kiểm tra:</i> ${m('4\\cdot\\dfrac{1}{8} + 12\\cdot\\dfrac{1}{24} = \\dfrac{1}{2} + \\dfrac{1}{2} = 1')}.`},

  {kind:'sum', tag:'Tổng kết', title:'Lỗi hay gặp khi giải các bài này',
   body:`<ul><li>Chia hai vế cho biểu thức chứa ẩn (như ${m('x - 2')}) làm mất nghiệm; hãy chuyển vế và đặt nhân tử chung.</li>
     <li>Quên đối chiếu ĐKXĐ sau khi khử mẫu.</li>
     <li>Bài toán công việc: cộng <b>năng suất</b> (công việc mỗi giờ), không cộng thời gian.</li></ul>` +
     box('Giao về nhà: các bài tập còn lại của Bài 4 (SGK tr. 30); luyện thêm trên web <b>Học mà chơi</b> – Toán 9, Bài 4.')},
]);
})();
