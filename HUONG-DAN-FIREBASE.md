# Cấu hình Firebase cho phòng Học mà chơi

1. Mở [Firebase Console](https://console.firebase.google.com/) → **Add project** → tạo dự án.
2. Chọn **Build → Authentication → Get started → Sign-in method → Anonymous → Enable → Save**.
3. Chọn **Build → Realtime Database → Create Database** → chọn vị trí gần Việt Nam → **Start in locked mode**.
4. Trong Realtime Database, mở thẻ **Rules**. Chép toàn bộ nội dung tệp `firebase-database.rules.json`, rồi bấm **Publish**.
5. Chọn biểu tượng bánh răng → **Project settings → General → Your apps → Web (`</>`)** → đặt tên `Hoc ma choi` → **Register app**.
6. Chép các giá trị trong `firebaseConfig` sang đúng các dòng `CONFIG.firebase` trong `config.js`, gồm: `apiKey`, `authDomain`, `databaseURL`, `projectId`, `storageBucket`, `messagingSenderId`, `appId`.
7. Vào **Authentication → Settings → Authorized domains → Add domain** và thêm:
   - `hoc-ma-choi-six.vercel.app`
   - tên miền riêng của thầy, nếu có.
8. Chạy `node tools/kiem-tra.js`, sau đó `python3 tools/build.py` và đăng web như bình thường.
9. Kiểm tra bằng hai thiết bị: tài khoản giáo viên tạo phòng; tài khoản học sinh nhập mã sáu ký tự; giáo viên bấm **Bắt đầu**.

Không đưa tệp khóa quản trị Firebase hoặc tài khoản dịch vụ vào dự án. Cấu hình Web App trong `config.js` được phép xuất hiện trên trang web; quyền truy cập được bảo vệ bằng Authentication và Database Rules.
