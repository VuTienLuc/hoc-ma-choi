/* =====================================================================
   FILE MẪU ĐỂ THÊM LỚP MỚI
   Cách dùng:
     1. Chép file này thành data/lop3.js (hoặc lop5.js …)
     2. Sửa id, name, book, topics bên dưới; viết các bài bằng lesson(...)
     3. Mở config.js, thêm 'lop3' vào mảng grades (và xoá 'Lớp 3' khỏi upcoming)
     4. Chạy kiểm thử: python3 tools/test.py  (máy tự làm hàng nghìn câu)
   File này chạy được ngay: nó là ví dụ Lớp 3 với 2 bài.
   ===================================================================== */
(() => {
const G = App.addGrade({
  id: 'lop3',                    // mã lớp – trùng tên file, dùng trong đường link #/lop3
  name: 'Lớp 3',
  subject: 'Toán',
  book: 'Kết nối tri thức',
  topics: [                      // id = số chủ đề, hk = học kì (1 hoặc 2)
    { id: 2, hk: 1, name: 'Bảng nhân, bảng chia' },
    { id: 8, hk: 2, name: 'Các số đến 10 000' },
  ],
});
const lesson = G.lesson;

/* ---------------------------------------------------------------------
   CÁCH VIẾT MỘT DẠNG BÀI
   Mỗi dạng bài là một hàm nhận lv (1 = Làm quen, 2 = Luyện tập, 3 = Thử thách)
   và trả về một câu hỏi. Có 4 loại câu hỏi:

   QB({...})   Điền ô trống.  tpl: chuỗi có [_] (ô số/chữ) hoặc [F] (ô phân số)
               ans: mảng đáp án theo thứ tự ô. Ví dụ ans:[42]  ans:[['XX',20]]
               phân số: {frac:[3,4], mode:'exact' | 'eq' | 'simplest'}
   QC({...})   Chọn đáp án.  opts: các phương án, ans: phương án đúng (tự trộn)
               keepOrder:true nếu không muốn trộn.
   QCmp(text, vếTrái, vếPhải, giáTrịTrái, giáTrịPhải)   Chọn dấu <, >, =
   {kind:'rotate'…} / {kind:'shade'…}  – xem ví dụ trong data/lop4.js

   Mọi câu đều cần: text (đề), hint (gợi ý – nói cách làm, không lộ đáp án),
   sol (lời giải – in đậm đáp án bằng <b>…</b>). fig: hình SVG (tuỳ chọn).

   Mẹo để đáp án luôn đúng: chọn đáp án TRƯỚC rồi mới dựng đề.
   Hàm tiện ích: R(a,b) số ngẫu nhiên, pick([…]), fmt(12345) → "12 345",
   F(3,4) → hiển thị phân số, randDigits(n) số có n chữ số.
   Dạng bài dùng chung (assets/js/generators.js): gPlace, gValue, gCompose,
   gCmp, gRound, gAddSub, gFindX, gConv, gReadProt, gRotate, gAngType…
   --------------------------------------------------------------------- */

// Dạng bài tự viết: bảng nhân
const gBangNhan = lv => {
  const a = lv === 1 ? R(2, 5) : R(2, 9), b = R(2, 10);
  return QB({
    text: 'Tính nhẩm:',
    tpl: `<span class="eq">${a} × ${b} = [_]</span>`,
    ans: [a * b],
    hint: `Nhớ lại bảng nhân ${a}: cộng ${a} liên tiếp ${b} lần.`,
    sol: `${a} × ${b} = <b>${a * b}</b>.`,
  });
};
// Dạng bài tự viết: tìm thừa số / bài toán chia
const gBangChia = lv => {
  const b = R(2, 9), q = R(2, 10);
  if (lv < 3) return QB({
    text: 'Tính nhẩm:', tpl: `<span class="eq">${b * q} : ${b} = [_]</span>`, ans: [q],
    hint: `Tìm số nhân với ${b} được ${b * q}.`, sol: `${b * q} : ${b} = <b>${q}</b>.`,
  });
  return QB({
    text: `Có <b>${b * q}</b> cái kẹo chia đều cho <b>${b}</b> bạn. Mỗi bạn được mấy cái kẹo?`,
    tpl: '[_] cái kẹo', ans: [q],
    hint: 'Chia đều → dùng phép chia.', sol: `${b * q} : ${b} = <b>${q}</b> cái kẹo.`,
  });
};

lesson(2, 'bang-nhan-chia', 'Bảng nhân, bảng chia 2 – 9', 'Nhân, chia nhẩm trong bảng; bài toán chia đều.',
  [gBangNhan, gBangChia]);

// Bài chỉ dùng dạng bài có sẵn (số có 4 chữ số)
lesson(8, 'so-4-chu-so', 'Các số có bốn chữ số', 'Hàng, viết số, so sánh và làm tròn số có bốn chữ số.',
  [gPlace(4, false), gCompose(4), gCmp(4), gRound(4, [2, 3])]);
})();
