# Lịch sử chỉnh sửa dự án “Học mà chơi”

Tệp này giúp Claude, ChatGPT/Codex và người bảo trì hiểu các thay đổi đã hoàn thành, lý do thay đổi, tệp liên quan và cách kiểm tra. Sau khi đọc `AGENTS.md` hoặc `CLAUDE.md`, hãy đọc tệp này trước khi sửa mã.

## Quy tắc ghi lịch sử

- Mỗi yêu cầu hoàn thành phải thêm một mục mới ở đầu phần **Các lần thay đổi**.
- Không xoá hoặc viết lại mục cũ, trừ khi thông tin cũ sai.
- Mỗi mục phải có: ngày, yêu cầu, kết quả, tệp thay đổi, kiểm thử và việc cần làm thủ công.
- Chỉ ghi trạng thái **ĐẠT** khi lệnh kiểm tra đã thực sự chạy thành công.
- Nếu thay đổi cần đăng lại Firebase Rules, Apps Script, dữ liệu Google Sheets hoặc thao tác ngoài mã nguồn, phải ghi rõ.

## Khuôn ghi cho lần sau

```markdown
### YYYY-MM-DD – Tên thay đổi

- **Yêu cầu:** …
- **Kết quả:** …
- **Tệp thay đổi:** `…`, `…`
- **Kiểm thử:** `lệnh` → ĐẠT/CHƯA ĐẠT
- **Việc thủ công:** Không có / …
```

## Các lần thay đổi

### 2026-10-07 – Làm nổi bật số thứ tự và xác nhận Ngôi sao hy vọng

- **Yêu cầu của thầy:** Khi chia nhóm ban đầu, số thứ tự phải lớn nhất để học sinh nhìn từ xa; Ngôi sao hy vọng đặt bên dưới và giáo viên bấm, xác nhận đội chọn thật dễ dàng.
- **Kết quả đã làm:**
  - Phóng lớn hàng số thứ tự lên 32 px ở kích thước trình chiếu kiểm thử, dùng chữ đậm, nền tương phản và căn giữa; đây là nội dung nổi bật nhất trong thẻ đội.
  - Chuyển nút Ngôi sao hy vọng thành một hàng riêng bên dưới hàng chấm đúng/sai của từng đội.
  - Khi giáo viên bấm Ngôi sao hy vọng, hiện khung hỏi lại rõ tên đội và số vòng cùng hai nút **Xác nhận** và **Hủy**.
  - Chỉ ghi nhận quyền Ngôi sao hy vọng sau khi giáo viên bấm **Xác nhận**; khóa chấm đúng/sai của đội trong lúc hộp xác nhận đang mở để tránh nhầm thao tác.
  - Một đội đã xác nhận sử dụng sẽ không thể chọn lần thứ hai; cách tính `+30/−30` giữ nguyên.
  - Chuyển lời nhắc Ngôi sao hy vọng xuống dưới bảng chia nhóm ban đầu.
- **Tệp đã sửa:** `assets/js/lecture.js`, `assets/css/style.css`, `tools/test_thidua_nhom.py`, `dist/hoc-tap.html`, `LICH-SU-CHINH-SUA.md`.
- **Kiểm thử:**
  - `python3 tools/test_thidua_nhom.py` → ĐẠT; xác nhận chữ số 32 px, vị trí nút bên dưới, nội dung xác nhận đúng đội/vòng, chỉ áp dụng sau xác nhận và toàn bộ tính điểm/xếp hạng.
  - `python3 tools/test_lophoc.py` → ĐẠT.
  - `python3 tools/test.py` → ĐẠT; 22.320 câu đã thử.
  - `node tools/kiem-tra.js` → ĐẠT; 36.375 lượt sinh câu, 660 trang bài giảng và 33 phiếu luyện tập.
  - `python3 tools/build.py` → ĐẠT; tạo lại `dist/hoc-tap.html` (2.478 KB).
  - `git diff --check` → ĐẠT.
- **Việc thầy cần làm thủ công:** Không có.

### 2026-10-07 – Chia nhóm thi đua theo số thứ tự

- **Yêu cầu của thầy:** Bổ sung cách chia nhóm theo số thứ tự; giáo viên chọn có bao nhiêu số, hệ thống lập bảng đưa từng số về đội và không cần dùng danh sách học sinh có sẵn.
- **Kết quả đã làm:**
  - Thêm mục **Cách chia nhóm** với hai lựa chọn: `Theo danh sách lớp có sẵn` và `Theo số thứ tự`.
  - Ở chế độ số thứ tự, giáo viên chọn tổng số từ 2 đến 60, số đội từ 2 đến 8, số vòng và tên đội.
  - Tự phân đều lần lượt các số vào đội. Ví dụ 10 số và 3 đội cho bảng: đội 1 có `1, 4, 7, 10`; đội 2 có `2, 5, 8`; đội 3 có `3, 6, 9`.
  - Hiển thị bảng `STT` của từng đội trước khi bắt đầu; không tải và không phụ thuộc tên học sinh ở chế độ này.
  - Giữ đầy đủ chấm đúng/sai, tính điểm, xếp hạng và Ngôi sao hy vọng cho cả hai cách chia.
- **Tệp đã sửa:** `assets/js/lecture.js`, `tools/test_thidua_nhom.py`, `dist/hoc-tap.html`, `LICH-SU-CHINH-SUA.md`.
- **Kiểm thử:**
  - `python3 tools/test_thidua_nhom.py` → ĐẠT; kiểm tra chia 10 số vào 3 đội, chuyển lại chia theo danh sách lớp, Ngôi sao hy vọng, xếp hạng, kéo ngăn và lỗi JavaScript.
  - `python3 tools/test_lophoc.py` → ĐẠT.
  - `python3 tools/test.py` → ĐẠT; 22.140 câu đã thử.
  - `node tools/kiem-tra.js` → ĐẠT; 36.000 lượt sinh câu.
  - `python3 tools/build.py` → ĐẠT; tạo lại `dist/hoc-tap.html` (2.455 KB).
  - `git diff --check` → ĐẠT.
- **Việc thầy cần làm thủ công:** Không có.
### 2026-10-07 – Sửa lỗi "Không tải được danh sách có sẵn" ở Thi đua theo nhóm

- **Yêu cầu của thầy:** Đã đăng nhập giáo viên nhưng bảng Chia nhóm báo "Danh sách lớp cần kết nối Google Sheet và tài khoản giáo viên".
- **Kết quả:** Nguyên nhân là mã: khi trình chiếu **Phiếu luyện tập** hoặc **Giải SGK**, bài được tạo thành đối tượng mới nên `teamGrade()` không xác định được khối (rỗng) và từ chối tải danh sách. Đã sửa: `practiceDeck` mang theo `grade`, `teamGrade()` nhận ra cả bài giải SGK. Không liên quan Apps Script/`Code.gs`.
- **Tệp thay đổi:** `assets/js/lecture.js`, `tools/test_thidua_nhom.py` (thêm 2 kiểm thử: phiếu luyện tập, giải SGK; đã xác nhận bản cũ không đạt), `dist/hoc-tap.html`, `LICH-SU-CHINH-SUA.md`
- **Kiểm thử:** `test_thidua_nhom.py`, `test_lophoc.py`, `test.py`, `test_baigiang.py lop10` → ĐẠT
- **Việc thủ công:** Tải lại trang (Ctrl+F5 / xóa bộ nhớ đệm) sau khi Vercel triển khai.

### 2026-10-07 – Đổi địa chỉ Apps Script (CONFIG.sheetAPI)

- **Yêu cầu của thầy:** Cập nhật web sang URL Apps Script mới (bản triển khai mới).
- **Kết quả:** `sheetAPI` trong `config.js` trỏ tới `.../AKfycbzPfRV…SKcx1/exec`; dựng lại `dist/hoc-tap.html`. Chưa gọi thử được Apps Script thật từ môi trường của Claude.
- **Tệp thay đổi:** `config.js`, `dist/hoc-tap.html`, `LICH-SU-CHINH-SUA.md`
- **Kiểm thử:** `python3 tools/test.py`, `python3 tools/test_thidua_nhom.py`, `python3 tools/build.py` → ĐẠT
- **Việc thủ công:** Bản Apps Script mới phải chứa `Code.gs` mới nhất (có `rankAll`) và quyền truy cập "Bất kỳ ai"; thử đăng nhập giáo viên và Chia nhóm trên web.
### 2026-10-07 – Ôn thi vào 10, chủ đề 2: Phương trình bậc hai, điều kiện có nghiệm, hệ thức Viète

- **Yêu cầu:** Soạn và đăng trọn bộ chủ đề 2 của kế hoạch ôn thi vào 10 TP.HCM (bài học sinh, bài giảng, phiếu luyện tập 2 trang A4 kèm PDF).
- **Kết quả:** Thêm bài `on-thi-pt-bac-hai-viete` vào chương 6 Toán 9: 5 dạng × 3 mức (giải PT; biệt thức và số nghiệm; Viète và giá trị biểu thức; biết một nghiệm, lập PT mới; tham số m và hệ thức giữa hai nghiệm – mức 3 làm từng bước có loại nghiệm). Bài giảng 15 trang (3 kiến thức, 5 dạng có ví dụ, tổng kết). Phiếu luyện tập 10 bài (7 cơ bản + 3 ★); xuất PDF bản học sinh và bản có lời giải đều đúng 2 trang A4.
- **Tệp thay đổi:** `data/lop9.js`, `giao-vien/bai-giang/lop9.js`, `giao-vien/bai-giang/lop9-luyen-tap.js`, `CLAUDE.md`, `AGENTS.md`, `LICH-SU-CHINH-SUA.md`, `dist/hoc-tap.html`
- **Kiểm thử:** `node tools/kiem-tra.js 150 lop9` → ĐẠT; `python3 tools/test.py` → ĐẠT (22.320 câu); `python3 tools/test_phieu_tren_lop.py` → ĐẠT (37/37); `python3 tools/test_luyentap.py` → ĐẠT; `python3 tools/test_baigiang.py lop9` → ĐẠT (456 trang); `python3 tools/test_congthuc.py` → ĐẠT (354 trang, 0 lỗi); `python3 tools/build.py` → ĐẠT. Đã kiểm số học các công thức Viète và bài tham số bằng nghiệm thực.
- **Việc thủ công:** Không có.

### 2026-10-07 – Chia nhóm từ danh sách lớp và Ngôi sao hy vọng

- **Yêu cầu của thầy:** Chia nhóm phải lấy học sinh từ danh sách có sẵn. Giáo viên có thể bật chế độ Ngôi sao hy vọng; mỗi đội chỉ được đặt một lần, đúng nhân ba điểm và sai bị trừ ba lần điểm.
- **Kết quả đã làm:**
  - Tải các lớp và toàn bộ học sinh có sẵn từ trang `HocSinh` thông qua dữ liệu bảng xếp hạng dành cho giáo viên; không nhập tên lớp thủ công.
  - Cho giáo viên chọn lớp, số đội và số vòng; tự chia ngẫu nhiên, cân bằng toàn bộ học sinh, đồng thời cho phép chia lại ngẫu nhiên trước khi bắt đầu.
  - Hiển thị thành viên của từng đội để giáo viên kiểm tra trước cuộc thi.
  - Thêm lựa chọn bật Ngôi sao hy vọng. Mỗi đội chỉ được sử dụng ở một vòng trong cả cuộc thi; giáo viên phải đặt trước khi chấm.
  - Vòng có Ngôi sao hy vọng: đúng nhận `+30` điểm, sai nhận `−30` điểm. Vòng thường giữ `+10` điểm khi đúng và `0` điểm khi sai.
  - Đánh dấu vòng đã dùng Ngôi sao hy vọng trên thẻ đội và bảng xếp hạng; giữ giao diện gọn trong ngăn kéo bên phải.
  - Sửa thời điểm tự co chữ sau khi kéo ngăn thi nhóm để trang chiếu không bị khuất nội dung.
- **Tệp đã sửa:** `assets/js/lecture.js`, `assets/css/style.css`, `tools/test_thidua_nhom.py`, `dist/hoc-tap.html`, `LICH-SU-CHINH-SUA.md`.
- **Kiểm thử:**
  - `python3 tools/test_thidua_nhom.py` → ĐẠT; kiểm tra danh sách hai lớp có sẵn, chia đủ 9 học sinh vào 3 đội, mỗi học sinh xuất hiện đúng một lần, điểm `+30/−30`, giới hạn một Ngôi sao hy vọng mỗi đội, xếp hạng, kéo ngăn và lỗi JavaScript.
  - `python3 tools/test_lophoc.py` → ĐẠT.
  - `python3 tools/test_baigiang.py lop10` → ĐẠT; 156 trang ở hai kích thước màn hình, không tràn và không lỗi.
  - `python3 tools/test.py` → ĐẠT; 22.140 câu đã thử.
  - `node tools/kiem-tra.js` → ĐẠT; 36.000 lượt sinh câu.
  - `python3 tools/build.py` → ĐẠT; tạo lại `dist/hoc-tap.html` (2.452 KB).
  - `git diff --check` → ĐẠT.
- **Việc thầy cần làm thủ công:** Không có; tính năng dùng trực tiếp danh sách học sinh đang có trong trang `HocSinh`.

### 2026-10-07 – Claude rà soát phần ChatGPT/Codex đã làm

- **Yêu cầu của thầy:** Kiểm tra lại code ChatGPT cùng làm trên dự án có lỗi không; từ nay luôn đọc và cập nhật tệp này.
- **Kết quả:** Đọc mã Đường đua cả lớp (`game.js`), `firebase-database.rules.json`, ngăn kéo Thi đua theo nhóm. Không thấy lỗi chặn. Quy tắc Firebase khớp với mã (thầy ghi được điểm/quãng đường của học sinh; học sinh chỉ tự vào phòng khi còn ở sảnh, tự trả lời đúng câu hiện tại). Sao thưởng chỉ trao cho học sinh, một lần mỗi trận. Lưu ý nhỏ: học sinh vào phòng sau khi đã bắt đầu sẽ bị chặn (đúng thiết kế); tải lại trang giữa trận vẫn giữ điểm vì không ghi lại hồ sơ.
- **Tệp thay đổi:** `LICH-SU-CHINH-SUA.md`, `CLAUDE.md`, `AGENTS.md`
- **Kiểm thử:** `node tools/kiem-tra.js`, `python3 tools/test.py`, `test_thidua_nhom.py`, `test_lophoc.py`, `test_baigiang.py lop10`, `test_phieu_tren_lop.py` → ĐẠT (chạy trên d5b99b8)
- **Việc thủ công:** Đăng lại Firebase Rules (từ mục Đường đua cả lớp) nếu chưa làm; thử Đường đua trên iPad thật.

### 2026-10-07 – Chuẩn hóa tệp lịch sử để Claude và Codex kiểm tra

- **Yêu cầu của thầy:** Sau khi hoàn thành công việc, ghi lại lịch sử chỉnh sửa trong một tệp để Claude có thể đọc và hiểu toàn bộ quá trình thay đổi.
- **Kết quả đã làm:**
  - Tạo tệp lịch sử tập trung, có hướng dẫn sử dụng và khuôn ghi thống nhất.
  - Ghi lại các thay đổi gần nhất của chức năng Đường đua Toán học và thi đua theo nhóm.
  - Bổ sung quy định bắt buộc đọc và cập nhật tệp lịch sử vào cả `AGENTS.md` và `CLAUDE.md`.
  - Giữ `AGENTS.md` và `CLAUDE.md` đồng bộ hoàn toàn.
- **Tệp đã thêm/sửa:**
  - `LICH-SU-CHINH-SUA.md`
  - `AGENTS.md`
  - `CLAUDE.md`
- **Kiểm thử:**
  - `node tools/kiem-tra.js` → ĐẠT; 36.000 lượt sinh câu, 13 bài kiểm tra học sinh, 11 chủ đề trò chơi, 645 trang bài giảng, 32 phiếu luyện tập và 4 đề kiểm tra.
  - `python3 tools/build.py` → ĐẠT; tạo lại `dist/hoc-tap.html` (2.445 KB).
  - `python3 tools/test.py` → không chạy trong môi trường hiện tại vì chưa cài mô-đun Playwright; lần kiểm thử trình duyệt gần nhất của phần thi nhóm đã ĐẠT và được ghi ngay bên dưới.
  - `git diff --check` → ĐẠT.
- **Việc thầy cần làm thủ công:** Không có.

### 2026-10-07 – Bảng Thi đua theo nhóm dạng ngăn kéo nhỏ gọn

- **Yêu cầu:** Trong trình chiếu bài giảng, menu chia nhóm mở thành cửa sổ bên phải giống menu Lớp học, kéo được sang trái/phải; sau khi chia nhóm phải hiển thị tên đội và kết quả từng vòng thật gọn để giữ không gian cho bài chiếu.
- **Kết quả:**
  - Nút **👥 Thi nhóm** và phím **N** mở/ẩn ngăn kéo bên phải.
  - Thanh dọc ở mép trái ngăn kéo cho phép kéo thay đổi độ rộng; lưu tỉ lệ ở `hoctap:lecture-team-w`.
  - Bài giảng bên trái tự co chữ theo diện tích còn lại.
  - Mỗi đội nằm trên một dòng: tên, điểm, sao, vòng tròn số vòng; vòng đã chấm hiện ✓ xanh hoặc ✕ đỏ; nút chấm đúng/sai thu gọn thành hai nút vuông.
  - Bảng xếp hạng từng vòng và chung cuộc giữ đầy đủ dấu đúng/sai của từng đội.
  - Mở khung **🧑‍🏫 Lớp học** sẽ ẩn bảng nhóm để hai ngăn kéo không chồng nhau.
- **Tệp thay đổi:** `assets/js/lecture.js`, `assets/css/style.css`, `tools/test_thidua_nhom.py`, `tools/test_lophoc.py`, `AGENTS.md`, `CLAUDE.md`, `dist/hoc-tap.html`.
- **Kiểm thử:**
  - `python3 tools/test_thidua_nhom.py` → ĐẠT; kiểm tra 3 đội, 2 vòng, đúng/sai, điểm/sao, xếp hạng, kéo rộng 403 → 533 px và không tràn.
  - `python3 tools/test_lophoc.py` → ĐẠT.
  - `python3 tools/test_baigiang.py lop10` → ĐẠT; 156 trang ở hai kích thước màn hình.
  - `python3 tools/test.py` → ĐẠT; 22.140 câu đã thử.
  - `node tools/kiem-tra.js` → ĐẠT.
- **Việc thủ công:** Không có.

### 2026-10-07 – Thêm Thi đua theo nhóm trong trình chiếu

- **Yêu cầu:** Giáo viên chia nhóm theo lớp, đặt số vòng, chấm đúng/sai, tính điểm và sao; sau mỗi vòng hiện xếp hạng đội.
- **Kết quả:** Cho phép nhập tên lớp, tạo 2–8 đội, đặt 1–20 vòng. Đúng được 10 điểm và 1 ⭐, sai không cộng điểm. Chỉ được kết thúc vòng khi đã chấm đủ đội. Tên lớp, tên đội và số vòng lưu ở `hoctap:lecture-teams`.
- **Tệp thay đổi:** `assets/js/lecture.js`, `assets/css/style.css`, `tools/test_thidua_nhom.py`, `tools/test_lophoc.py`, `AGENTS.md`, `CLAUDE.md`, `dist/hoc-tap.html`.
- **Kiểm thử:** `python3 tools/test_thidua_nhom.py`, `python3 tools/test_lophoc.py`, `python3 tools/test_baigiang.py lop10`, `python3 tools/test.py`, `node tools/kiem-tra.js` → ĐẠT.
- **Việc thủ công:** Không có.

### 2026-10-07 – Đường đua Toán học cho cả lớp

- **Yêu cầu:** Dùng Firebase để tổ chức Đường đua Toán học Toán 10 cho cả lớp; máy chiếu hiện 8 xe dẫn đầu, học sinh luôn thấy xe của mình, có combo, năng lượng, Nitro và tổng kết câu sai.
- **Kết quả:** Phòng đua 10 vòng hoạt động cùng mã phòng Firebase; giáo viên có điều khiển tự động hoặc thủ công; đáp án đảo trên thiết bị học sinh; 3 câu đúng liên tiếp tự kích hoạt Nitro; tổng kết có xếp hạng và các câu sai nhiều nhất.
- **Tệp thay đổi:** `assets/js/game.js`, `assets/css/game.css`, `firebase-database.rules.json`, `HUONG-DAN-FIREBASE.md`, `tools/test.py`, `dist/hoc-tap.html`.
- **Kiểm thử:** Mô phỏng 12 học sinh → máy chiếu hiện 8 xe, học sinh hạng 12 vẫn thấy xe và vị trí, Nitro kích hoạt sau 3 câu; `node tools/kiem-tra.js` và `python3 tools/test.py` → ĐẠT.
- **Việc thủ công:** Sau khi thay đổi Rules, phải chép lại `firebase-database.rules.json` vào **Firebase Console → Realtime Database → Rules** và bấm **Publish**.

### 2026-10-06 – Đường đua Toán học cá nhân cho Toán 10

- **Yêu cầu:** Tạo trò chơi đua xe Toán 10, xe chạy đúng hướng trái sang phải, có đối thủ máy, Nitro và luyện lại câu sai.
- **Kết quả:** Mỗi trận 10 vòng, học sinh đua với 3 xe máy; trả lời đúng tăng tốc, sai đi chậm, đủ năng lượng mở Nitro; có bục kết quả, độ chính xác và trạm sửa lỗi kiến thức; giao diện thích ứng điện thoại dọc và màn hình ngang.
- **Tệp thay đổi:** `assets/js/game.js`, `assets/css/game.css`, `tools/test.py`, `dist/hoc-tap.html`.
- **Kiểm thử:** Đủ 4 xe, 4 đáp án, 10 vòng, Nitro, bảng về đích; `node tools/kiem-tra.js` và kiểm thử trình duyệt → ĐẠT.
- **Việc thủ công:** Không có.
