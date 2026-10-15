/* Thử thách hôm nay – đề ngẫu nhiên theo NGÀY cho Toán 10 và Toán 11 (cả khối cùng một đề trong ngày).
   14 câu, 25 phút: 8 TN × 0,5 + 2 Đ/S × 1 + 4 TLN × 1 = 10 điểm. Câu hỏi sinh từ ngân hàng data/thu-thach-*.js (TTB).
   Ngày mới → mã đề mới; sao và điểm tính riêng từng ngày (bài daily:true của student-test.js). */
(() => {
  [['lop10', 'Toán 10'], ['lop11', 'Toán 11']].forEach(([grade, nm]) => StudentTest.add({
    grade, id:'thu-thach-ngay', daily:true, topic:94, title:`Thử thách hôm nay – ${nm}`, time:25, pill:'THỬ THÁCH HÔM NAY',
    lead:'Đề mới mỗi ngày, gồm những câu hay và dễ sai: đọc kĩ đề, chú ý dấu, điều kiện và đầu mút. Điểm và sao được ghi cho tài khoản của em.',
    codes:['T1', 'T2', 'T3', 'T4'], counts:{mc:8, tf:2, short:4}, mcPt:.5, tfPt:1, shortPt:1,
    mc:[...Array(8)].map((_, i) => ci => TTB.get(grade, 'mc', i, ci)),
    tf:[...Array(2)].map((_, i) => ci => TTB.get(grade, 'tf', i, ci)),
    short:[...Array(4)].map((_, i) => ci => TTB.get(grade, 'sh', i, ci))}));
})();
