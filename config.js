/* =====================================================================
   CẤU HÌNH CHUNG – thầy/cô chỉ cần sửa file này khi thêm lớp mới
   ===================================================================== */
const CONFIG = {
  siteName: 'Học mà chơi',
  brandHTML: 'Học mà <span>chơi</span>',           // chữ lớn trên đầu trang
  author:   'Soạn bởi thầy Vũ Tiến Lực · Bài tập củng cố theo bài',
  setSize:  6,                                     // số câu mỗi bộ

  // Danh sách lớp đang có: mỗi mục ứng với một file data/<mã>.js
  // Thêm lớp mới: tạo data/lop5.js (chép từ data/_mau-lop-moi.js) rồi thêm 'lop5' vào đây.
  grades:   ['lop4', 'lop9', 'lop10', 'lop11'],

  // ĐĂNG NHẬP THEO LỚP (tuỳ chọn): dán địa chỉ Web App của Google Apps Script vào đây.
  // Để trống '' thì không cần đăng nhập (thú cưng vẫn chạy, tiến độ lưu trên máy).
  // Cách tạo: xem tools/apps-script/HUONG-DAN.md
  sheetAPI: 'https://script.google.com/macros/s/AKfycbyg7aav_7X5eOZKHWS9TMNqyUwTKEQ6hyiDbdJag-ojacN0ky4JUXtYjAgLw88BzB7D/exec',

  // ÂM THANH khi chấm (thử lần lượt từng nguồn; muốn tắt hẳn thì để []).
  // Nên chép file mp3 vào assets/sounds/ để chạy cả khi không có mạng.
  sounds: {
    ok:  ['assets/sounds/dung.mp3', 'https://files.catbox.moe/841969.mp3'],   // chọn đúng
    bad: ['assets/sounds/sai.mp3',  'https://files.catbox.moe/05culf.mp3'],   // chọn sai
  },

  // Các lớp hiển thị "Sắp có" trên trang chọn lớp (để trống [] nếu không muốn hiện)
  upcoming: ['Lớp 3', 'Lớp 5'],
};
