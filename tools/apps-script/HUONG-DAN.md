# Bật đăng nhập theo lớp cho “Học mà chơi” (khoảng 10 phút, làm một lần)

Sau khi làm xong: học sinh **chọn lớp → nhập tài khoản, mật khẩu** rồi mới vào làm bài. Mỗi lần các em đăng nhập hoặc làm xong một bộ câu, thông tin tự ghi về Google Sheet của thầy/cô. Trang **TongHop** cho thầy/cô biết ngay em nào chưa vào học. Thú cưng và số sao của từng em đi theo tài khoản, đổi sang máy khác vẫn còn.

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
3. Chọn hàm **setup** ở thanh trên, bấm **▶ Chạy**. Google sẽ hỏi quyền, thầy/cô chọn tài khoản của mình → *Nâng cao* → *Đi tới… (không an toàn)* → *Cho phép*.
   Sau bước này sẽ có thêm các trang **TongHop, KetQua, DangNhap, TienDo**. Máy cũng tự hẹn giờ cập nhật TongHop **mỗi 30 phút**.
4. Tải lại (F5) Google Sheet. Trên thanh menu sẽ có thêm mục **🐣 Học mà chơi → Cập nhật bảng Tổng hợp** để xem số liệu mới ngay, không phải chờ.

## Bước 4. Triển khai thành Ứng dụng web
1. Bấm **Triển khai → Tùy chọn triển khai mới**. Ở biểu tượng ⚙ chọn **Ứng dụng web**.
2. **Thực thi dưới dạng:** *Tôi (email của thầy/cô)*. **Người có quyền truy cập:** *Bất kỳ ai*.
3. Bấm **Triển khai** rồi **sao chép URL ứng dụng web** (có dạng `https://script.google.com/macros/s/…/exec`).

## Bước 5. Dán URL vào web
Có hai cách:
- **Nhắn URL cho Claude.** Claude dán vào `config.js` (dòng `sheetAPI: ''`) rồi đẩy lên GitHub, Vercel tự cập nhật.
- **Thầy/cô tự sửa.** Mở `config.js` trên GitHub, dán URL vào giữa hai dấu nháy của `sheetAPI: ''`, rồi bấm *Commit*.

## Theo dõi học sinh: đăng nhập và làm bài
| Trang | Nội dung | Cập nhật |
|---|---|---|
| **TongHop** ⭐ | **Phần trên:** mỗi lớp một dòng, gồm sĩ số, số em đã và chưa đăng nhập, số em đăng nhập nhưng chưa làm bài, số em đã làm ≥ 1 bộ, số em quá 7 ngày chưa học, tổng số bộ đã làm, điểm trung bình. **Phần dưới:** mỗi học sinh một dòng, gồm tình trạng, số lần đăng nhập, lần đăng nhập gần nhất, số bộ đã làm, điểm trung bình (%), tổng sao, lần làm bài gần nhất, thú cưng. | Tự động mỗi 30 phút, hoặc bấm menu 🐣 |
| **KetQua** | Mỗi lần một em **làm xong một bộ 6 câu**: thời gian, lớp, họ tên, bài, mức, điểm, số sao, thú cưng | Ngay lập tức |
| **DangNhap** | Mỗi lần một em **đăng nhập**: thời gian, lớp, họ tên, thiết bị (iPad, iPhone, điện thoại Android, máy tính…) | Ngay lập tức |
| **TienDo** | Dữ liệu máy dùng để đồng bộ sao và thú cưng giữa các thiết bị | Ngay lập tức, **không sửa** |

Màu trong **TongHop**:
- 🟥 **Đỏ:** chưa đăng nhập lần nào.
- 🟨 **Vàng:** đã đăng nhập nhưng chưa làm bộ nào, hoặc đã quá 7 ngày chưa học.
- 🟩 **Xanh:** đang học đều.

Mẹo: ở trang KetQua hoặc DangNhap, bật *Dữ liệu → Tạo bộ lọc* để lọc theo lớp, theo bài hay theo ngày. Muốn đổi mốc 7 ngày thì sửa dòng `DAYS_WARN = 7` trong `Code.gs`.

Lưu ý: bộ câu nào học sinh **làm dở rồi bỏ ngang** thì không được ghi. Chỉ bộ làm xong mới có kết quả.

## Học sinh chỉ thấy bộ đề của khối mình
Web đọc **số đầu tiên trong tên lớp**: lớp `10A12`, `10A1` → chỉ thấy **Lớp 10**; `9A` → **Lớp 9**; `11B3` → **Lớp 11**. Vì vậy thầy/cô đặt tên lớp trên trang HocSinh bắt đầu bằng số khối. Tài khoản có tên lớp không chứa số (ví dụ `GV`) sẽ thấy mọi khối – dùng để thầy/cô kiểm tra. Khối chưa có nội dung trên web thì học sinh tạm thấy mọi khối. Muốn tắt tính năng này: trong `config.js` đặt `lockGrade: false`.

## Nhà thú cưng và bảng xếp hạng lớp
- Học sinh làm đúng được **xu 🪙**, xong mỗi bộ được **hạt 🍖** (mỗi ⭐ = 1 hạt) để cho thú cưng ăn, mua mũ, kính, nơ, nền phòng; mỗi ngày có 3 nhiệm vụ và có 14 huy hiệu để sưu tầm.
- Thú cưng đói và buồn dần nếu em nhiều ngày không học (không bao giờ chết); học mỗi ngày để giữ **chuỗi ngày 🔥**.
- Dữ liệu này lưu ở cột **Góc thú cưng (máy dùng)** của trang TienDo – thầy/cô **không sửa tay** cột này.
- Nút **🏆 Xếp hạng lớp** cho học sinh xem các bạn cùng lớp (đã đăng nhập ít nhất một lần) theo tổng sao, chuỗi ngày, huy hiệu, xu.
- Trang **TongHop** có thêm cột *Chuỗi ngày học 🔥* và *Huy hiệu 🏅* của từng em.
- **Khi cập nhật lên bản có Nhà thú cưng:** dán lại toàn bộ `Code.gs` mới rồi *Triển khai → Quản lý triển khai → ✏ → Phiên bản: Mới → Triển khai* (URL giữ nguyên). Chưa làm bước này thì mọi thứ vẫn chạy, chỉ riêng bảng xếp hạng báo “chưa tải được”.

## Câu hỏi thường gặp
- **Thêm, sửa học sinh hoặc đổi mật khẩu:** sửa trực tiếp trên trang **HocSinh**, có hiệu lực ngay, không cần triển khai lại.
- **Sửa mã `Code.gs`:** phải vào *Triển khai → Quản lý triển khai → ✏ → Phiên bản: Mới → Triển khai* thì mới có hiệu lực. Nếu tạo triển khai mới thì URL sẽ đổi.
- **Học sinh làm bài khi mất mạng:** kết quả được giữ trên máy và tự gửi lại khi có mạng.
- **Một em đăng nhập trên nhiều máy:** được, tối đa 5 máy cùng lúc.
- **Bảo mật:** chỉ thầy/cô xem được Google Sheet. Web chỉ lấy được **danh sách tên lớp**, còn họ tên và mật khẩu không lộ ra ngoài. Không nên dùng mật khẩu thật (email, ngân hàng) của học sinh.
