# Bật đăng nhập theo lớp cho “Học mà chơi” (khoảng 10 phút, làm một lần)

Sau khi làm xong: học sinh **chọn lớp → nhập tài khoản, mật khẩu** rồi mới vào làm bài. Mỗi lần các em làm xong một bộ câu, kết quả tự ghi về Google Sheet của thầy/cô. Thú cưng và số sao của từng em đi theo tài khoản, đổi sang máy khác vẫn còn.

## Bước 1. Chuẩn bị danh sách lớp bằng Excel
1. Mở file **`mau-danh-sach-hoc-sinh.xlsx`**. File có 4 cột: **Lớp | Tài khoản | Họ tên | Mật khẩu**.
2. Mỗi học sinh ghi một dòng. Có thể gộp nhiều lớp vào cùng một trang.
   - **Lớp:** ghi đúng tên lớp sẽ hiện cho học sinh chọn, ví dụ `10A1`.
   - **Tài khoản:** viết liền, không dấu, không trùng trong cùng lớp, ví dụ `10a1_01` hoặc `an.nguyen`.
   - **Mật khẩu:** nên đặt 4–6 kí tự, ví dụ `2468`. Cột này đã được định dạng *Văn bản* để giữ số 0 ở đầu.

## Bước 2. Tạo Google Sheet và dán danh sách
1. Vào **sheets.new** (hoặc Google Drive → Mới → Google Trang tính). Đặt tên, ví dụ `Hoc ma choi – Ket qua`.
2. Chọn **Tệp → Nhập → Tải lên → chọn file Excel ở bước 1 → Thay thế bảng tính**.
3. Đổi tên trang tính chứa danh sách thành **HocSinh** (nháy đúp vào tên trang ở dưới cùng).

## Bước 3. Dán mã Apps Script
1. Trong Google Sheet: chọn **Tiện ích mở rộng → Apps Script**.
2. Xoá hết mã có sẵn, rồi **dán toàn bộ nội dung file `Code.gs`** (cùng thư mục với file hướng dẫn này). Bấm 💾 Lưu.
3. Chọn hàm **setup** ở thanh trên, bấm **▶ Chạy**. Google sẽ hỏi quyền, thầy/cô chọn tài khoản của mình → *Nâng cao* → *Đi tới… (không an toàn)* → *Cho phép*. Sau bước này sẽ có thêm hai trang **TienDo** và **KetQua**.

## Bước 4. Triển khai thành Ứng dụng web
1. Bấm **Triển khai → Tùy chọn triển khai mới**. Ở biểu tượng ⚙ chọn **Ứng dụng web**.
2. **Thực thi dưới dạng:** *Tôi (email của thầy/cô)*. **Người có quyền truy cập:** *Bất kỳ ai*.
3. Bấm **Triển khai** rồi **sao chép URL ứng dụng web** (có dạng `https://script.google.com/macros/s/…/exec`).

## Bước 5. Dán URL vào web
Có hai cách:
- **Nhắn URL cho Claude.** Claude dán vào `config.js` (dòng `sheetAPI: ''`) rồi đẩy lên GitHub, Vercel tự cập nhật.
- **Thầy/cô tự sửa.** Mở `config.js` trên GitHub, dán URL vào giữa hai dấu nháy của `sheetAPI: ''`, rồi bấm *Commit*.

## Xem kết quả học sinh
- **KetQua:** mỗi dòng là một lần làm bài, gồm thời gian, lớp, họ tên, bài, mức, điểm, số sao và thú cưng. Dùng *Dữ liệu → Tạo bộ lọc* để lọc theo lớp hoặc theo bài.
- **TienDo:** mỗi em một dòng, gồm tổng sao, cấp thú cưng từng khối và lần học gần nhất.
- Hai cột cuối của TienDo là dữ liệu máy dùng, thầy/cô **không sửa** hai cột này.

## Câu hỏi thường gặp
- **Thêm, sửa học sinh hoặc đổi mật khẩu:** sửa trực tiếp trên trang **HocSinh**, có hiệu lực ngay, không cần triển khai lại.
- **Sửa mã `Code.gs`:** phải vào *Triển khai → Quản lý triển khai → ✏ → Phiên bản: Mới → Triển khai* thì mới có hiệu lực. Nếu tạo triển khai mới thì URL sẽ đổi.
- **Học sinh làm bài khi mất mạng:** kết quả được giữ trên máy và tự gửi lại khi có mạng.
- **Một em đăng nhập trên nhiều máy:** được, tối đa 5 máy cùng lúc.
- **Bảo mật:** chỉ thầy/cô xem được Google Sheet. Web chỉ lấy được **danh sách tên lớp**, còn họ tên và mật khẩu không lộ ra ngoài. Không nên dùng mật khẩu thật (email, ngân hàng) của học sinh.
