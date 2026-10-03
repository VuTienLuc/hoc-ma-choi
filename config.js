/* =====================================================================
   CẤU HÌNH CHUNG – thầy/cô chỉ cần sửa file này khi thêm lớp mới
   ===================================================================== */
const CONFIG = {
  siteName: 'Học mà chơi',
  brandHTML: 'Học mà <span>chơi</span>',           // chữ lớn trên đầu trang
  author:   'Soạn bởi thầy Vũ Tiến Lực · Bài tập củng cố theo bài',
  brand:    'Lớp Toán Thầy Vũ Tiến Lực',                // tên trang in trên phiếu học tập
  classApp: 'https://hoc-ma-choi-six.vercel.app/',          // ứng dụng quản lý lớp: mở ở khung phải khi trình chiếu (nút 🧑‍🏫 Lớp học); để '' thì ẩn nút
  setSize:  6,                                     // số câu mỗi bộ

  // PHÒNG HỌC MÀ CHƠI: tạo Web App + Realtime Database theo HUONG-DAN-FIREBASE.md rồi điền các giá trị dưới đây.
  firebase: {
    apiKey: 'AIzaSyD7Rqnn_hFMs2fjq_Yqgl4iMNl6cSh7mXo',
    authDomain: 'hoc-ma.firebaseapp.com',
    databaseURL: 'https://hoc-ma-default-rtdb.asia-southeast1.firebasedatabase.app',
    projectId: 'hoc-ma',
    storageBucket: 'hoc-ma.firebasestorage.app',
    messagingSenderId: '324062548291',
    appId: '1:324062548291:web:fd522126b754db4391dff6',
    measurementId: 'G-XFZVNPY6N6',
  },

  // Danh sách lớp đang có: mỗi mục ứng với một file data/<mã>.js
  // Thêm lớp mới: tạo data/lop5.js (chép từ data/_mau-lop-moi.js) rồi thêm 'lop5' vào đây.
  grades:   ['lop4', 'lop8', 'lop9', 'lop10', 'lop11'],

  // ĐĂNG NHẬP THEO LỚP (tuỳ chọn): dán địa chỉ Web App của Google Apps Script vào đây.
  // Để trống '' thì không cần đăng nhập (thú cưng vẫn chạy, tiến độ lưu trên máy).
  // Cách tạo: xem tools/apps-script/HUONG-DAN.md
  sheetAPI: 'https://script.google.com/macros/s/AKfycbxWs1A7LYGV5fNZte1oNpyzOqUrc_3XJU8Trb1bh1SfKh6PRXiVTurxP3P5RRVzcR5j/exec',

  // Khi đăng nhập, học sinh chỉ thấy bộ đề của khối mình, nhận theo SỐ ĐẦU trong tên lớp:
  // "10A12" → Lớp 10, "9A" → Lớp 9. Lớp không có số (vd "GV") thấy tất cả. Đặt false để tắt.
  lockGrade: true,

  // ÂM THANH khi chấm (thử lần lượt từng nguồn; muốn tắt hẳn thì để []).
  // Nên chép file mp3 vào assets/sounds/ để chạy cả khi không có mạng.
  sounds: {
    ok:  ['assets/sounds/dung.mp3', 'https://files.catbox.moe/841969.mp3'],   // chọn đúng
    bad: ['assets/sounds/sai.mp3',  'https://files.catbox.moe/05culf.mp3'],   // chọn sai
  },

  // Các lớp hiển thị "Sắp có" trên trang chọn lớp (để trống [] nếu không muốn hiện)
  upcoming: ['Lớp 3', 'Lớp 5'],
};
