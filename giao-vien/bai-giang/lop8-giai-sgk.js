/* =====================================================================
   GIẢI BÀI TẬP SGK – LỚP 8 (Kết nối tri thức, tập 1) – chỉ chọn câu VẬN DỤNG / câu khó, lời giải từng bước có căn cứ.
   Lecture.addSgk(lớp, mã bài giảng, [trang chiếu…]) – cùng kiểu trang như bài giảng (title, kt, vd, sum).
   Nạp SAU tệp bài giảng lop8.js. Đề ghi theo văn bản SGK tra trên mạng, kèm số trang/số bài để thầy đối chiếu SGK in.
   ===================================================================== */
(() => {
const m = tm;
const box = h => `<div class="lk-box">${h}</div>`, note = h => `<div class="lk-note">⚠️ ${h}</div>`;

Lecture.addSgk('lop8', 'bai-6', [
  {kind:'title', tag:'Toán 8 · Kết nối tri thức · Giải bài tập SGK', title:'Bài 6. Hiệu hai bình phương. Bình phương của một tổng hay một hiệu',
   sub:'Các câu vận dụng, câu khó – SGK tập 1, trang 30 – 33',
   points:['Vận dụng 1, 2 (tr. 31 – 32): tính nhanh 198 · 202 và 1002² như bạn trong trò chơi truyền hình.',
     'Luyện tập 2 (tr. 31) và Bài 2.3: tính nhanh bằng hằng đẳng thức.',
     'Bài 2.2, 2.4: điền biểu thức còn thiếu; viết thành bình phương.',
     'Bài 2.5, 2.6: rút gọn và chứng minh chia hết.',
     'Số trang của phần Bài tập cuối bài thầy đối chiếu thêm với SGK in.']},

  {kind:'kt', tag:'Nhắc nhanh', title:'Ba hằng đẳng thức và cách tính nhanh',
   body: box(`${m('(A + B)^2 = A^2 + 2AB + B^2')}<br>${m('(A - B)^2 = A^2 - 2AB + B^2')}<br>${m('A^2 - B^2 = (A - B)(A + B)')}`) +
     `<ol class="lk-steps"><li>Số gần số tròn chục, tròn trăm: viết thành <b>tổng hoặc hiệu</b> với số tròn rồi dùng hằng đẳng thức.</li>
     <li>Hai thừa số đối xứng quanh một số tròn (như ${m('198, 202')}): dùng ${m('(A - B)(A + B)')}.</li></ol>` +
     note(`Hạng tử giữa của bình phương là ${m('2AB')}, không phải ${m('AB')}; ${m('(A + B)^2 \\ne A^2 + B^2')}.`)},

  {kind:'vd', tag:'SGK tr. 31 · Vận dụng 1 (bài toán mở đầu)', label:'Câu 1',
   de:`Trò chơi trí tuệ trên truyền hình: người dẫn chương trình yêu cầu cho biết kết quả phép tính ${m('198\\cdot 202')}; một bạn trả lời đúng ngay. Hãy giải thích bạn ấy tính nhanh như thế nào.`,
   sol:[`Nhận xét: ${m('198 = 200 - 2')} và ${m('202 = 200 + 2')} – hai thừa số đối xứng quanh ${m('200')}.`,
     `Dùng ${m('(A - B)(A + B) = A^2 - B^2')} với ${m('A = 200,\\ B = 2')}: ${m('198\\cdot 202 = (200 - 2)(200 + 2) = 200^2 - 2^2')}.`,
     `${m('200^2 = 40\\,000')} và ${m('2^2 = 4')} nên ${m('198\\cdot 202 = 40\\,000 - 4')}.`],
   ans:`${tb('198\\cdot 202 = 39\\,996')}.`},

  {kind:'vd', tag:'SGK tr. 32 · Vận dụng 2', label:'Câu 2',
   de:`Trò chơi “Ai thông minh hơn học sinh lớp 8”: yêu cầu cho biết kết quả của phép tính ${m('1\\,002^2')} (đề trên nguồn tra được ghi “1 0022” – thầy đối chiếu SGK in); Nam tính được sau vài giây. Hãy giải thích Nam tính nhanh như thế nào.`,
   sol:[`Tách ${m('1\\,002 = 1\\,000 + 2')} (tổng của số tròn nghìn và một số nhỏ).`,
     `Dùng ${m('(A + B)^2 = A^2 + 2AB + B^2')} với ${m('A = 1\\,000,\\ B = 2')}: ${m('1\\,002^2 = 1\\,000^2 + 2\\cdot 1\\,000\\cdot 2 + 2^2')}.`,
     `${m('= 1\\,000\\,000 + 4\\,000 + 4')}.`,
     `Mở rộng: ${m('999^2 = (1\\,000 - 1)^2 = 1\\,000\\,000 - 2\\,000 + 1 = 998\\,001')}.`],
   ans:`${tb('1\\,002^2 = 1\\,004\\,004')}; mở rộng ${m('999^2 =')} ${tb('998\\,001')}.`},

  {kind:'vd', tag:'SGK tr. 31 · Luyện tập 2', label:'Câu 3',
   de:`a) Tính nhanh ${m('99^2 - 1')}; &nbsp; b) Viết ${m('x^2 - 9')} dưới dạng tích.`,
   sol:[`a) ${m('1 = 1^2')} nên ${m('99^2 - 1 = 99^2 - 1^2 = (99 - 1)(99 + 1)')} (hiệu hai bình phương).`,
     `${m('(99 - 1)(99 + 1) = 98\\cdot 100 = 9\\,800')}.`,
     `b) ${m('9 = 3^2')} nên ${m('x^2 - 9 = x^2 - 3^2 = (x - 3)(x + 3)')}.`],
   ans:`a) ${tb('9\\,800')}; &nbsp; b) ${tb('(x - 3)(x + 3)')}.`},

  {kind:'vd', tag:'SGK · Bài 2.2 (Bài tập cuối bài)', label:'Câu 4',
   de:`Thay dấu “?” bằng biểu thức thích hợp: a) ${m('(x - 3y)(x + 3y) = x^2 - ?')}; &nbsp; b) ${m('(2x - y)(2x + y) = 4\\,? - y^2')}; &nbsp; c) ${m('x^2 + 8xy + ? = (? + 4y)^2')}; &nbsp; d) ${m('? - 12xy + 9y^2 = (2x - ?)^2')}.`,
   sol:[`a) ${m('(x - 3y)(x + 3y) = x^2 - (3y)^2 = x^2 - 9y^2')} ⇒ dấu “?” là ${m('9y^2')}.`,
     `b) ${m('(2x - y)(2x + y) = (2x)^2 - y^2 = 4x^2 - y^2')} ⇒ “?” là ${m('x^2')}.`,
     `c) Vế phải ${m('(A + 4y)^2')} có hạng tử giữa ${m('2\\cdot A\\cdot 4y = 8Ay')}; so với ${m('8xy')} suy ra ${m('A = x')}. Hạng tử cuối ${m('(4y)^2 = 16y^2')}.`,
     `d) Hạng tử cuối ${m('9y^2 = (3y)^2')} nên ${m('B = 3y')}. Hạng tử đầu ${m('(2x)^2 = 4x^2')}; kiểm tra hạng tử giữa ${m('2\\cdot 2x\\cdot 3y = 12xy')} (đúng).`],
   ans:`a) ${tb('9y^2')}; b) ${tb('x^2')}; c) ${tb('16y^2')} và ${tb('x')}; d) ${tb('4x^2')} và ${tb('3y')}.`},

  {kind:'vd', tag:'SGK · Bài 2.3 (Bài tập cuối bài)', label:'Câu 5',
   de:`Tính nhanh: a) ${m('54\\cdot 66')}; &nbsp; b) ${m('203^2')}.`,
   sol:[`a) ${m('54 = 60 - 6')} và ${m('66 = 60 + 6')} – đối xứng quanh ${m('60')}: ${m('54\\cdot 66 = (60 - 6)(60 + 6) = 60^2 - 6^2')}.`,
     `${m('60^2 - 6^2 = 3\\,600 - 36 = 3\\,564')}.`,
     `b) ${m('203 = 200 + 3')}: ${m('203^2 = 200^2 + 2\\cdot 200\\cdot 3 + 3^2 = 40\\,000 + 1\\,200 + 9')}.`],
   ans:`a) ${tb('3\\,564')}; &nbsp; b) ${tb('41\\,209')}.`},

  {kind:'vd', tag:'SGK · Bài 2.4 (Bài tập cuối bài)', label:'Câu 6',
   de:`Viết các biểu thức sau dưới dạng bình phương của một tổng hoặc một hiệu: a) ${m('x^2 + 4x + 4')}; &nbsp; b) ${m('16a^2 - 16ab + 4b^2')}.`,
   sol:[`a) ${m('x^2 = x^2,\\ 4 = 2^2')} và ${m('4x = 2\\cdot x\\cdot 2')} ⇒ ${m('x^2 + 4x + 4 = (x + 2)^2')}.`,
     `b) ${m('16a^2 = (4a)^2,\\ 4b^2 = (2b)^2')}; kiểm tra ${m('2\\cdot 4a\\cdot 2b = 16ab')} (hạng tử giữa mang dấu trừ) ⇒ ${m('16a^2 - 16ab + 4b^2 = (4a - 2b)^2')}.`],
   ans:`a) ${tb('(x + 2)^2')}; &nbsp; b) ${tb('(4a - 2b)^2')}.`},

  {kind:'vd', tag:'SGK · Bài 2.5 (Bài tập cuối bài)', label:'Câu 7',
   de:`Rút gọn: a) ${m('(x - 3y)^2 - (x + 3y)^2')}; &nbsp; b) ${m('(3x + 4y)^2 + (4x - 3y)^2')}.`,
   sol:[`a) Khai triển: ${m('(x - 3y)^2 = x^2 - 6xy + 9y^2')} và ${m('(x + 3y)^2 = x^2 + 6xy + 9y^2')}.`,
     `Trừ hai vế, <b>đổi dấu cả ngoặc thứ hai</b>: ${m('x^2 - 6xy + 9y^2 - x^2 - 6xy - 9y^2 = -12xy')}.`,
     `b) ${m('(3x + 4y)^2 = 9x^2 + 24xy + 16y^2')} và ${m('(4x - 3y)^2 = 16x^2 - 24xy + 9y^2')}.`,
     `Cộng lại: ${m('9x^2 + 16x^2 + 24xy - 24xy + 16y^2 + 9y^2 = 25x^2 + 25y^2')}.`],
   ans:`a) ${tb('-12xy')}; &nbsp; b) ${tb('25x^2 + 25y^2')}.`},

  {kind:'vd', tag:'SGK · Bài 2.6 (Bài tập cuối bài)', label:'Câu 8',
   de:`Chứng minh rằng với mọi số tự nhiên ${m('n')}, ${m('(n + 2)^2 - n^2')} chia hết cho ${m('4')}.`,
   sol:[`Hiệu hai bình phương: ${m('(n + 2)^2 - n^2 = (n + 2 - n)(n + 2 + n)')}.`,
     `Thu gọn: ${m('= 2\\cdot (2n + 2) = 4(n + 1)')}.`,
     `${m('n + 1')} là số tự nhiên nên ${m('4(n + 1)')} chia hết cho ${m('4')} với mọi ${m('n')}.`,
     `Mở rộng: ${m('(n + 3)^2 - (n - 1)^2 = 4\\cdot (2n + 2) = 8(n + 1)')} chia hết cho ${m('8')}.`],
   ans:`${tb('(n + 2)^2 - n^2 = 4(n + 1)')} chia hết cho ${m('4')}.`},

  {kind:'sum', tag:'Tổng kết', title:'Lỗi hay gặp khi giải các bài này',
   body:`<ul><li>Quên hạng tử giữa ${m('2AB')}: viết ${m('(x + 3)^2 = x^2 + 9')}.</li>
     <li>Bình phương hệ số sai: ${m('(3x)^2 = 9x^2')}, không phải ${m('3x^2')}.</li>
     <li>Trừ hai biểu thức mà không đổi dấu cả ngoặc (Bài 2.5a).</li>
     <li>Tính nhanh: chọn số tròn gần nhất; hai thừa số đối xứng quanh số tròn thì dùng hiệu hai bình phương.</li></ul>` +
     box('Giao về nhà: Bài 2.1 (SGK); luyện thêm trên web <b>Học mà chơi</b> – Toán 8, Bài 6.')},
]);
})();
