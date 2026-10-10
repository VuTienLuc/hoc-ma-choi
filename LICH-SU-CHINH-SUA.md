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

### 2026-10-10 – Đề kiểm tra giữa học kì I theo ma trận tuần 8 (Toán 10 và Toán 11)

- **Yêu cầu của thầy:** Dựa vào tệp "MA TRẬN GKI" (đề giữa kì 60 phút, tuần 8) dựng đề kiểm tra giữa kì cho lớp 10 và lớp 11 đúng chuẩn.
- **Kết quả:** Mỗi lớp một đề 4 mã (lớp 10: 701–704; lớp 11: 711–714), đúng cấu trúc ma trận: **10 TN × 0,4 (8 biết + 2 hiểu) + 3 Đúng/Sai × 1 + 4 trả lời ngắn × 0,75 = 10 điểm**. Giữ đúng thứ tự câu theo ma trận (TN-1…10, ĐS-1…3, TLN-1…4); các mã khác nhau ở số liệu và vị trí phương án (không 3 câu liền cùng đáp án). Lớp 10: Mệnh đề–tập hợp, BPT/hệ BPT bậc nhất hai ẩn, Hệ thức lượng (lấy từ ngân hàng `GK1`, bộ hạt giống riêng, có hình vẽ). Lớp 11: Hàm số lượng giác – PTLG, Dãy số – CSC – CSN, Mẫu số liệu ghép nhóm – số đặc trưng đo xu thế trung tâm (sinh mới, đáp án tính bằng phép tính). Trang đáp án có **bảng ma trận theo mẫu của tổ** (chủ đề × nội dung × năng lực × cấp độ, mã TN/ĐS/TLN và mã năng lực TD/GQ/MH), bảng phân bổ điểm và thang điểm. `KiemTra.add` hỗ trợ thêm `matrix`, `keepOrder`, `spread`; câu thang điểm Phần III nay ghi đúng điểm từng câu (trước đó luôn ghi "1 điểm").
- **Điều chỉnh khi đọc ma trận (thầy đối chiếu):** ma trận lớp 11 ghi TN-5 ở cả hai cột Biết và Hiểu; em xếp TN-5 vào **Hiểu** để đủ 8 Biết + 2 Hiểu. TLN-2 lớp 11 ghi "(TH)/VDC" – em ra dạng vận dụng cao (đếm nghiệm trong khoảng).
- **Tệp thay đổi:** `giao-vien/bai-giang/lop10-giua-ki-ma-tran.js` (mới), `giao-vien/bai-giang/lop11-giua-ki-ma-tran.js` (mới), `giao-vien/index.html`, `assets/js/kiemtra.js`, `assets/css/style.css`, `tools/test_gk_ma_tran.js` (mới), `tools/test_kiemtra.py` (thêm tham số mã đề), `tools/kiem-tra.js`, `CLAUDE.md`, `AGENTS.md`
- **Kiểm thử:** `node tools/test_gk_ma_tran.js` (tính lại độc lập đáp án 8 mã đề; đếm nghiệm PTLG bằng đổi dấu số) → ĐẠT; `node tools/kiem-tra.js` → ĐẠT; `python3 tools/test.py` → ĐẠT; `python3 tools/test_kiemtra.py lop10 gk-ma-tran` và `lop11 gk-ma-tran` (mỗi mã in đúng 2 trang A4 bằng PDF thật, không lỗi công thức) → ĐẠT. `python3 tools/test_kiemtra.py` (toàn bộ đề của mọi lớp, 101 kiểm tra) → ĐẠT.
- **Việc thủ công:** Thầy đọc lại đề và đáp án; chưa có bản cho học sinh làm trực tuyến (có thể thêm nếu thầy cần).

### 2026-10-10 – 10 vật phẩm cầm tay mở khóa bằng sao cho từng lớp

- **Yêu cầu của thầy:** Bổ sung phần thưởng đẹp theo phong cách phụ kiện cầm tay trong trò chơi khối; học sinh đạt điểm cao dùng để đổi; có gậy ngôi sao, kiếm và tổng cộng 10 vật phẩm phù hợp với từng lớp.
- **Kết quả:** Thêm một ô trang bị `hand` và 10 vật phẩm SVG vẽ trực tiếp, mỗi lớp 2 món: lớp 4 có Gậy Sao Số Học, Bút Chì Cầu Vồng; lớp 8 có Kiếm Đa Thức, Búa Hằng Đẳng Thức; lớp 9 có Trượng Căn Thức, Khiên Đường Tròn; lớp 10 có Kiếm Vectơ, Trượng Lượng Giác; lớp 11 có Kiếm Cấp Số, Quyền Trượng Hàm Số. Món thường mở ở 18 sao và đổi bằng 120 xu; món cao cấp mở ở 36 sao và đổi bằng 200 xu. Cửa hàng chỉ hiện hai món đúng lớp, báo số sao còn thiếu, ngăn đổi khi chưa đủ sao, tự trang bị sau khi đổi và cho phép đeo/tháo như phụ kiện cũ. Giao diện khóa/mở rõ ràng và thích ứng điện thoại.
- **Tệp thay đổi:** `assets/js/play.js`, `assets/css/style.css`, `tools/test_thucung.py`, `dist/hoc-tap.html`, `LICH-SU-CHINH-SUA.md`.
- **Kiểm thử:** `python3 tools/test_thucung.py` → ĐẠT (10 vật phẩm duy nhất, đúng 2 món/lớp, khóa theo sao, trừ đúng xu, tự trang bị, SVG riêng, không tràn điện thoại, không lỗi JavaScript); xem trực tiếp ảnh chụp cửa hàng → ĐẠT; `node tools/kiem-tra.js` → ĐẠT (40.650 lượt sinh câu); `python3 tools/test.py` → ĐẠT (24.360 câu); `python3 tools/build.py` → ĐẠT; `git diff --check` → ĐẠT.
- **Việc thầy cần làm thủ công:** Không có.

### 2026-10-10 – Cấp số cộng luyện tập thêm và luôn hiện lời giải khi làm đúng

- **Yêu cầu của thầy:** Bổ sung bài Cấp số cộng luyện thêm cho học sinh lớp 11; khi học sinh chọn hoặc điền đúng cũng phải hiện lời giải ở mọi bài.
- **Kết quả:** Thêm bài `cap-so-cong-luyen-tap` gồm 5 dạng × 3 mức: xác định vị trí số hạng; tổng một đoạn liên tiếp; chèn số để tạo cấp số cộng; tính chất hai số hạng cách đều; bài toán thực tế về khán đài, tiết kiệm và trồng cây. Bài có bốn thẻ công thức, lưu ý và mẹo; lời giải ghi từng bước và căn cứ. Chế độ chấm nay luôn hiện lời giải sau câu đúng ngay lần đầu, vẫn giữ lời giải khi thẻ câu được dựng lại; câu nhiều bước tiếp tục hiện lời giải đầy đủ. Bộ kiểm thử trình duyệt khóa hành vi này cho mọi lớp. Cập nhật số bài Toán 11 trong `AGENTS.md` và `CLAUDE.md` từ 11 lên 12.
- **Tệp thay đổi:** `data/lop11.js`, `assets/js/engine.js`, `tools/test.py`, `AGENTS.md`, `CLAUDE.md`, `dist/hoc-tap.html`, `LICH-SU-CHINH-SUA.md`.
- **Kiểm thử:** `node tools/kiem-tra.js 80 lop11` → ĐẠT (13.680 lượt sinh câu); `node tools/kiem-tra.js` → ĐẠT (40.650 lượt sinh câu); `python3 tools/test.py` → ĐẠT (24.360 câu, gồm kiểm tra lời giải sau câu đúng và sau khi dựng lại); phép quét riêng bài mới → ĐẠT (36 trạng thái MathJax, 0 lỗi); `python3 tools/test_trinhchieu.py cap-so-cong-luyen-tap` → ĐẠT (12 trang, không tràn/lỗi, không có chữ dưới 20 px, học sinh không có quyền trình chiếu); `python3 tools/test_congthuc.py` → ĐẠT (408 trang, 0 lỗi); `git diff --check` → ĐẠT.
- **Việc thầy cần làm thủ công:** Không có.

### 2026-10-10 – Chuẩn hóa hiển thị công thức Bài 6 Hệ thức lượng Toán 10

- **Yêu cầu của thầy:** Kiểm tra kỹ để công thức toán không lỗi khi hiển thị; Bài 6 Hệ thức lượng trong tam giác có một số câu hiển thị công thức chưa đúng.
- **Kết quả:** Chuẩn hóa phân số và căn thức trong Bài 6 về cú pháp có ngoặc đầy đủ; đưa phép so sánh khi nhận dạng tam giác vào cùng một khối MathJax; thay dấu nhỏ hơn, lớn hơn HTML bằng `\\lt`, `\\gt` trong công thức. Mở rộng `test_congthuc.py` để phát hiện thêm LaTeX thô (`tan`, `cot`, `widehat`, `cdot`, `text`, `approx`, `perp`…) và các ký tự điều khiển do gạch chéo đơn gây ra.
- **Tệp thay đổi:** `data/lop10.js`, `tools/test_congthuc.py`, `dist/hoc-tap.html`, `LICH-SU-CHINH-SUA.md`.
- **Kiểm thử:** `node tools/kiem-tra.js 80 lop10` → ĐẠT (21.120 lượt sinh câu); phép quét riêng ba bộ Bài 6 và Ôn tập chương III → ĐẠT (96 trạng thái, 0 lỗi); `python3 tools/test.py` → ĐẠT; `python3 tools/test_congthuc.py` → ĐẠT (408 trang, 0 lỗi); `git diff --check` → ĐẠT.
- **Việc thầy cần làm thủ công:** Không có.

### 2026-10-10 – Ôn tập Chương III Toán 10 theo bộ 20 câu

- **Yêu cầu của thầy:** Thêm Ôn tập Chương III Toán 10 cho học sinh, đầy đủ dạng bài và mỗi đề có 20 câu từ cơ bản đến nâng cao.
- **Kết quả:** Nâng cấp bài `on-tap-c3` thành “Ôn tập chương III – Bộ 20 câu”. Mỗi lần làm luôn tạo đúng 20 câu theo cấu trúc cố định 7 câu cơ bản, 7 câu thông hiểu–vận dụng và 6 câu nâng cao/thực tế; số liệu vẫn thay đổi ở mỗi bộ. Nội dung phủ đủ giá trị lượng giác góc đặc biệt và góc bù, dấu và hệ thức lượng giác, biểu thức, chọn công thức, định lí côsin, nhận dạng tam giác, định lí sin, diện tích, Heron, bán kính nội tiếp–ngoại tiếp, khoảng cách, chiều cao và chi phí thực tế. Thêm bảng tóm tắt công thức và cho phép từng bài khai báo số câu riêng mà không ảnh hưởng các bài sáu câu hiện có.
- **Tệp thay đổi:** `assets/js/engine.js`, `data/lop10.js`, `tools/test_on_tap_c3_20_cau.py`, `dist/hoc-tap.html`, `LICH-SU-CHINH-SUA.md`.
- **Kiểm thử:** `python3 tools/test_on_tap_c3_20_cau.py` → ĐẠT ở cả ba mức; `node tools/kiem-tra.js 100 lop10` → ĐẠT (26.400 lượt sinh câu); `node tools/kiem-tra.js` → ĐẠT (40.275 lượt sinh câu); `python3 tools/test.py` → ĐẠT (24.180 câu); `python3 tools/test_trinhchieu.py on-tap-c3` → ĐẠT (36 trang, không tràn/lỗi, không có chữ dưới 20 px); `python3 tools/test_congthuc.py` → ĐẠT (402 trang, 0 lỗi); `python3 tools/build.py` → ĐẠT (2.759 KB); `git diff --check` → ĐẠT.
- **Việc thầy cần làm thủ công:** Không có.

### 2026-10-09 – Thu gọn trang bài học sinh và tổng hợp phần còn thiếu

- **Yêu cầu của thầy:** Sửa chế độ xem bài của học sinh gọn, dễ nhìn và cho biết tổng quát mục nào đã hoàn thành, bài nào còn thiếu.
- **Kết quả:** Thay phần đầu trang lớp bằng bảng tổng quan đúng theo học kì đang xem, tách rõ số bài Hoàn thành, Đang làm và Chưa làm; bổ sung số bài và số mức còn thiếu. Mỗi bài hiện riêng tiến độ M1, M2, M3 bằng dấu hoàn thành, số sao hoặc dấu chưa làm. Các chương được thu gọn, chỉ mở chương cần học tiếp; tiêu đề chương có số bài hoàn thành và phần trăm tiến độ. Ba ô tổng quan hoạt động như bộ lọc; tìm kiếm hoặc lọc tự mở chương có kết quả. Trên điện thoại, bốn nút lọc nằm trọn một hàng và các vùng chạm đạt tối thiểu 44 px.
- **Tệp thay đổi:** `assets/js/engine.js`, `assets/css/style.css`, `tools/test_trang_bai_hoc_sinh.py`, `dist/hoc-tap.html`, `LICH-SU-CHINH-SUA.md`.
- **Kiểm thử:** `python3 tools/test_trang_bai_hoc_sinh.py` → ĐẠT trên 1280×900 và 390×844; `node tools/kiem-tra.js` → ĐẠT (39.225 lượt sinh câu); `python3 tools/test.py` → ĐẠT (23.760 câu); `python3 tools/build.py` → ĐẠT (2.756 KB); `git diff --check` → ĐẠT.
- **Việc thầy cần làm thủ công:** Không có.

### 2026-10-09 – Bài 6 Hệ thức lượng trong tam giác: luyện tập thêm 2 về toán thực tế

- **Yêu cầu của thầy:** Tạo tiếp một bộ mới cho Bài 6. Hệ thức lượng trong tam giác, tăng số lượng bài toán thực tế để học sinh lớp 10 luyện tập.
- **Kết quả:** Thêm bài riêng `he-thuc-luong-tam-giac-luyen-tap-2` gồm 5 dạng × 3 mức: khoảng cách trong hành trình và khảo sát; đo chiều rộng sông; đo chiều cao cột, tháp và cây; diện tích gắn với chi phí; bán kính nội tiếp, ngoại tiếp trong công trình tam giác. Mỗi câu có hình SVG phù hợp, dữ kiện thay đổi ngẫu nhiên, yêu cầu đơn vị và làm tròn rõ ràng; lời giải trình bày từng bước và nêu căn cứ. Bài có bốn thẻ hướng dẫn quy trình mô hình hóa, chọn hệ thức, xử lí đơn vị và kiểm tra kết quả.
- **Tệp thay đổi:** `data/lop10.js`, `dist/hoc-tap.html`, `LICH-SU-CHINH-SUA.md`.
- **Kiểm thử:** `node tools/kiem-tra.js 100 lop10` → ĐẠT (22.200 lượt sinh câu); `node tools/kiem-tra.js` → ĐẠT (39.225 lượt sinh câu); `python3 tools/test.py` → ĐẠT (23.760 câu); `python3 tools/test_congthuc.py` → ĐẠT (402 trang, 0 lỗi); `python3 tools/test_trinhchieu.py he-thuc-luong-tam-giac-luyen-tap-2` → ĐẠT (12 trang, không tràn hoặc lỗi); `python3 tools/build.py` → ĐẠT (2.751 KB); `git diff --check` → ĐẠT.
- **Việc thầy cần làm thủ công:** Không có.

### 2026-10-09 – Bài 6 Hệ thức lượng trong tam giác: luyện tập thêm cho học sinh

- **Yêu cầu của thầy:** Tạo thêm bài ở phần học sinh lớp 10 để củng cố tốt các công thức của Bài 6. Hệ thức lượng trong tam giác.
- **Kết quả:** Thêm bài riêng `he-thuc-luong-tam-giac-luyen-tap` gồm 5 dạng × 3 mức: chọn công thức phù hợp; định lí côsin; định lí sin; diện tích, bán kính và đường cao; bài toán thực tế. Bài có thẻ “Bảng công thức cần nhớ” gồm định lí côsin, định lí sin, bốn công thức diện tích, đường cao và bán kính; nêu lỗi dễ nhầm và mẹo chọn công thức. Câu hình học có hình tam giác trực quan; mức 3 yêu cầu chọn phương pháp hoặc giải nhiều bước. Toàn bộ công thức dùng LaTeX đúng và lời giải ghi rõ căn cứ.
- **Tệp thay đổi:** `data/lop10.js`, `dist/hoc-tap.html`, `LICH-SU-CHINH-SUA.md`.
- **Kiểm thử:** `node tools/kiem-tra.js 100 lop10` → ĐẠT (20.700 lượt sinh câu); `node tools/kiem-tra.js` → ĐẠT (38.850 lượt sinh câu); `python3 tools/test.py` → ĐẠT (23.580 câu); `python3 tools/test_congthuc.py` → ĐẠT (396 trang, 0 lỗi); `python3 tools/test_trinhchieu.py he-thuc-luong-tam-giac-luyen-tap` → ĐẠT (12 trang, không tràn, không lỗi, chữ từ 20 px); `python3 tools/build.py` → ĐẠT (2.736 KB).
- **Việc thầy cần làm thủ công:** Không có.

### 2026-10-09 – Xoá bản nhạc kte08w khỏi game

- **Yêu cầu của thầy:** Xoá nguồn `https://files.catbox.moe/kte08w.wav` khỏi nhạc phát khi vào game.
- **Kết quả:** Xoá tệp âm thanh `nhac-vao-game-kte08w.mp3` khỏi dự án và khỏi danh sách phát ngẫu nhiên. Game còn bốn âm thanh mở đầu cục bộ, tiếp tục chọn ngẫu nhiên và tránh lặp bản vừa phát. Kiểm thử âm thanh bổ sung điều kiện ngăn nguồn `kte08w` hoặc tệp cũ xuất hiện trở lại.
- **Tệp thay đổi:** `assets/js/game.js`, `assets/sounds/game/README.md`, `assets/sounds/game/nhac-vao-game-kte08w.mp3` (đã xoá), `tools/test_game_audio.py`, `dist/hoc-tap.html`, `LICH-SU-CHINH-SUA.md`.
- **Kiểm thử:** `node tools/kiem-tra.js` → ĐẠT (38.475 lượt sinh câu); `python3 tools/test.py` → ĐẠT (23.400 câu); `python3 tools/test_game_audio.py` → ĐẠT; `python3 tools/test_game_dienthoai.py` → ĐẠT; `python3 tools/build.py` → ĐẠT (2.724 KB).
- **Việc thầy cần làm thủ công:** Không có.

### 2026-10-09 – Ôn thi vào 10, chủ đề 4: Bài toán thực tế về đại số – hình học

- **Yêu cầu:** Soạn và đăng chủ đề ôn thi vào 10 kế tiếp (chủ đề 4) trọn bộ: bài học sinh, bài giảng, phiếu luyện tập in 2 trang A4 (tác vụ tự động hằng ngày).
- **Kết quả:** Thêm bài `on-thi-thuc-te-dai-so-hinh-hoc` (5 dạng gTt1–gTt5 × 3 mức, có thẻ Kiến thức cần nhớ · Lưu ý · Mẹo, có hình SVG), bài giảng cùng mã (3 trang kiến thức, 5 dạng × 1 ví dụ, tổng kết) và phiếu luyện tập 10 bài (7 cơ bản + 3 ★) in vừa đúng 2 trang A4 cả bản học sinh lẫn bản lời giải; đã xuất hai PDF.
- **Tệp thay đổi:** `data/lop9.js`, `giao-vien/bai-giang/lop9.js`, `giao-vien/bai-giang/lop9-luyen-tap.js`, `CLAUDE.md`, `AGENTS.md`, `dist/hoc-tap.html`, `LICH-SU-CHINH-SUA.md`.
- **Kiểm thử:** `node tools/kiem-tra.js 150 lop9` → ĐẠT; `python3 tools/test.py` → ĐẠT (23.400 câu); `python3 tools/test_phieu_tren_lop.py` → ĐẠT (37/37); `python3 tools/test_baigiang.py lop9` → ĐẠT; `python3 tools/build.py` → đã tạo; PDF phiếu: `pdfinfo` 2 trang mỗi bản, không merror.
- **Việc thủ công:** Không có. Chủ đề kế tiếp: 5 Giải bài toán bằng lập phương trình/PT bậc hai.

### 2026-10-08 – Pikachu suy luận 15 phút và xoá gợi ý

- **Yêu cầu của thầy:** Các câu suy luận trong Pikachu cần 15 phút cho mỗi game và xoá chức năng gợi ý.
- **Kết quả:** Tất cả ván Pikachu có 900 giây, hiển thị đồng hồ phút–giây từ `15:00` và thanh thời gian tính theo đủ 15 phút. Xoá hoàn toàn nút gợi ý, số lượt gợi ý, hiệu ứng đánh dấu cặp và hàm xử lý gợi ý khỏi giao diện lẫn mã nguồn. Thanh công cụ được sắp lại cho màn hình ngang và điện thoại dọc. Giữ ba lượt xáo, tự xáo khi hết nước đi, ba mạng, Game Over và âm thanh đúng–sai.
- **Tệp thay đổi:** `assets/js/game.js`, `assets/css/game.css`, `tools/test.py`, `tools/test_pikachu_toan.py`, `dist/hoc-tap.html`, `LICH-SU-CHINH-SUA.md`.
- **Kiểm thử:** `node tools/kiem-tra.js 100 lop10` → ĐẠT (19.200 lượt sinh câu); `node tools/kiem-tra.js` → ĐẠT (38.100 lượt sinh câu); `python3 tools/test_pikachu_toan.py` → ĐẠT, kiểm tra đồng hồ `15:00`, không có gợi ý, ba mạng, Game Over và hoàn thành 12/12 cặp; `python3 tools/test.py` → ĐẠT (23.220 câu); `python3 tools/test_game_dienthoai.py` → ĐẠT; `python3 tools/test_game_audio.py` → ĐẠT; `python3 tools/build.py` → ĐẠT (2.704 KB).
- **Việc thầy cần làm thủ công:** Không có.

### 2026-10-08 – Bổ sung thêm hai nhạc mở đầu wb1nzi và oi5spg

- **Yêu cầu của thầy:** Bổ sung hai nguồn `wb1nzi.mp3` và `oi5spg.mp3` vào nhạc mở đầu ngẫu nhiên của game.
- **Kết quả:** Tải hai tệp về máy chủ của dự án, giữ nguyên nội dung và nén MP3 96 kbps; mỗi tệp giảm từ khoảng 4,2 MB xuống khoảng 1,57 MB. Danh sách mở đầu hiện có năm âm thanh cục bộ. Mỗi lần bắt đầu game chọn ngẫu nhiên một bản và vẫn tránh lặp bản vừa phát. README và kiểm thử tự động đã cập nhật đủ năm nguồn.
- **Tệp thay đổi:** `assets/sounds/game/nhac-vao-game-wb1nzi.mp3`, `assets/sounds/game/nhac-vao-game-oi5spg.mp3`, `assets/sounds/game/README.md`, `assets/js/game.js`, `tools/test_game_audio.py`, `dist/hoc-tap.html`, `LICH-SU-CHINH-SUA.md`.
- **Kiểm thử:** `ffprobe` → hai tệp hợp lệ, dài 134,09 giây và 134,32 giây, cùng 96 kbps; `python3 tools/test_game_audio.py` → ĐẠT, đủ năm nguồn cục bộ và không lặp liên tiếp; `node tools/kiem-tra.js` → ĐẠT (38.100 lượt sinh câu); `python3 tools/test.py` → ĐẠT (23.220 câu); `python3 tools/test_game_dienthoai.py` → ĐẠT; `python3 tools/build.py` → ĐẠT (2.705 KB).
- **Việc thầy cần làm thủ công:** Không có.

### 2026-10-08 – Thêm hai nhạc mở đầu ngẫu nhiên cho game

- **Yêu cầu của thầy:** Bổ sung hai tệp âm thanh từ Catbox và mở ngẫu nhiên khi học sinh vào chơi game.
- **Kết quả:** Tải hai nguồn thầy cung cấp về `assets/sounds/game`, chuyển tệp WAV sang MP3 và nén cả hai ở 96 kbps để giảm tổng dung lượng từ gần 10 MB xuống khoảng 3,1 MB. Mỗi lần bấm bắt đầu một game, hệ thống chọn ngẫu nhiên giữa âm mở đầu cũ và hai bản nhạc mới; không lặp lại cùng một bản ở hai lượt liên tiếp. Âm thanh được phục vụ từ chính website, không phụ thuộc Catbox khi chơi; giữ nguyên nút bật/tắt và mức âm lượng nền 22%. Tệp README ghi rõ nguồn gốc và cách tối ưu.
- **Tệp thay đổi:** `assets/sounds/game/nhac-vao-game-ppg35c.mp3`, `assets/sounds/game/nhac-vao-game-kte08w.mp3`, `assets/sounds/game/README.md`, `assets/js/game.js`, `tools/test_game_audio.py`, `dist/hoc-tap.html`, `LICH-SU-CHINH-SUA.md`.
- **Kiểm thử:** `ffprobe` → hai tệp hợp lệ, dài 154,7 giây và 104,9 giây, cùng 96 kbps; `python3 tools/test_game_audio.py` → ĐẠT, kiểm tra đủ ba nguồn cục bộ, vào game hai lần phát hai bản khác nhau và không gọi Catbox; `node tools/kiem-tra.js` → ĐẠT (38.100 lượt sinh câu); `python3 tools/test.py` → ĐẠT (23.220 câu); `python3 tools/test_game_dienthoai.py` → ĐẠT; `python3 tools/build.py` → ĐẠT (2.705 KB).
- **Việc thầy cần làm thủ công:** Không có.

### 2026-10-08 – Pikachu có ba mạng, Game Over và đáp số Bài 6 chữ lớn

- **Yêu cầu của thầy:** Chọn sai ba lần thì Game Over, có âm thanh đúng–sai; riêng Hệ thức lượng trong tam giác, ô đáp án chỉ hiện số, bỏ biểu thức thay số và làm chữ số lớn, dễ nhìn.
- **Kết quả:** Mỗi ván Pikachu bắt đầu với ba tim; ghép sai mất một tim, phát âm báo sai và lần sai thứ ba kết thúc ngay ở màn hình **Game Over – sai 3 lần**. Ghép đúng phát chuỗi âm báo đúng riêng. Nút âm thanh tiếp tục cho phép bật/tắt. Màn hình kết quả ghi số lần sai và có nút chơi lại. Cả 20 đáp án Bài 6 đã rút gọn thành số nguyên, phân số hoặc căn thức chính xác, không còn phép thay số; cỡ chữ ô đáp án màu vàng được tăng và giữ tối thiểu 18 px trên điện thoại. Chủ đề dành riêng cho Pikachu cũng được ẩn khỏi Phòng thi kiến thức thông thường.
- **Tệp thay đổi:** `assets/js/game.js`, `assets/css/game.css`, `data/game-lop10.js`, `tools/test_pikachu_toan.py`, `dist/hoc-tap.html`, `LICH-SU-CHINH-SUA.md`.
- **Kiểm thử:** `node tools/kiem-tra.js 100 lop10` → ĐẠT (19.200 lượt sinh câu); `node tools/kiem-tra.js` → ĐẠT (38.100 lượt sinh câu); `python3 tools/test_pikachu_toan.py` → ĐẠT, kiểm tra ba tim, mất tim sau từng lần sai, Game Over ở lần thứ ba, chơi lại, nút âm thanh, đáp số không có dấu bằng, cỡ chữ tối thiểu 18 px và hoàn thành 12/12 cặp; `python3 tools/test_game_dienthoai.py` → ĐẠT; `python3 tools/test.py` → ĐẠT (23.220 câu); `python3 tools/build.py` → ĐẠT (2.704 KB).
- **Việc thầy cần làm thủ công:** Không có.

### 2026-10-08 – Ngân hàng Pikachu riêng cho Bài 6 Hệ thức lượng trong tam giác

- **Yêu cầu của thầy:** Tạo bộ câu hỏi dành riêng cho Pikachu ở Bài 6; câu hỏi cho dữ kiện để áp dụng định lí sin, định lí côsin và công thức diện tích; đáp án phải trình bày phép thay số cùng kết quả và không được trùng nhau.
- **Kết quả:** Thêm chủ đề **Bài 6. Hệ thức lượng trong tam giác** chỉ xuất hiện trong Pikachu Toán học của lớp 10. Ngân hàng gồm 20 cặp: 5 cặp định lí côsin, 5 cặp định lí sin và 10 cặp diện tích (góc xen giữa, Heron, bán kính nội tiếp–ngoại tiếp, đáy–chiều cao). Mỗi lượt xáo và lấy 12 cặp; toàn bộ 20 kết quả được thiết kế khác nhau. Mỗi đáp án hiện đầy đủ công thức đã thay số và kết quả. Bộ máy Pikachu kiểm tra đồng thời nội dung đáp án và giá trị kết quả, từ chối dựng ván nếu có đáp số trùng. Công thức dài tự co trong ô vuông và vẫn được phóng lớn trên thanh hướng dẫn khi chọn.
- **Tệp thay đổi:** `data/game-lop10.js`, `assets/js/game.js`, `tools/test_pikachu_toan.py`, `tools/test.py`, `dist/hoc-tap.html`, `LICH-SU-CHINH-SUA.md`.
- **Kiểm thử:** `node tools/kiem-tra.js 100 lop10` → ĐẠT (19.200 lượt sinh câu); `node tools/kiem-tra.js` → ĐẠT (38.100 lượt sinh câu); `python3 tools/test_pikachu_toan.py` → ĐẠT, kiểm tra 20 kết quả không trùng, đủ ba mảng kiến thức, 12 đáp số trong ván khác nhau, không tràn trên điện thoại và tự nối hết 12/12 cặp; `python3 tools/test_game_dienthoai.py` → ĐẠT; `python3 tools/test.py` → ĐẠT (23.220 câu); `python3 tools/build.py` → ĐẠT (2.705 KB).
- **Việc thầy cần làm thủ công:** Không có.

### 2026-10-08 – Pikachu Toán học nối câu hỏi với công thức

- **Yêu cầu của thầy:** Sáng tạo game kiểu Pikachu cho môn Toán, trong đó câu hỏi và công thức được xếp thành các ô vuông như ảnh mẫu.
- **Kết quả:** Thêm game thứ tư **⚡ Pikachu Toán học** vào Game củng cố của mọi lớp. Mỗi ván lấy 12 câu thông hiểu từ đúng ngân hàng chủ đề đã chọn và tạo 24 ô vuông: 12 câu hỏi màu xanh, 12 công thức hoặc đáp án màu vàng. Học sinh ghép một câu với đáp án tương ứng khi có đường đi qua ô trống và rẽ không quá hai lần; đường nối phát sáng trước khi hai ô biến mất. Game có 180 giây, điểm thưởng theo thời gian, phạt khi ghép sai, 3 lượt gợi ý, 3 lượt xáo, tự xáo miễn phí nếu hết nước đi và thưởng tối đa 3 sao. Khi chọn một ô, nội dung được phóng lớn ở thanh hướng dẫn để đọc rõ trên điện thoại. Lưới tự chuyển 4 × 6 trên điện thoại dọc và 6 × 4 trên màn hình ngang/iPad; dùng biểu tượng và đồ họa toán học riêng, không sao chép nhân vật trong ảnh mẫu.
- **Tệp thay đổi:** `assets/js/game.js`, `assets/css/game.css`, `tools/test.py`, `tools/test_pikachu_toan.py`, `dist/hoc-tap.html`, `LICH-SU-CHINH-SUA.md`.
- **Kiểm thử:** `node tools/kiem-tra.js` → ĐẠT (38.100 lượt sinh câu); `python3 tools/test.py` → ĐẠT (23.220 câu); `python3 tools/test_pikachu_toan.py` → ĐẠT, tự nối hoàn chỉnh 12/12 cặp và kiểm tra đường nối, gợi ý, xáo, kết quả, điện thoại dọc/ngang; `python3 tools/test_game_dienthoai.py` → ĐẠT; `python3 tools/build.py` → ĐẠT (2.698 KB).
- **Việc thầy cần làm thủ công:** Không có.

### 2026-10-08 – Đổi địa chỉ Apps Script (sheetAPI)

- **Yêu cầu của thầy:** Cập nhật `CONFIG.sheetAPI` sang bản triển khai Apps Script mới (đuôi `…GMKZMUtPh5Dx/exec`).
- **Kết quả:** `config.js` trỏ tới URL mới; không còn URL cũ trong mã nguồn.
- **Tệp thay đổi:** `config.js`
- **Kiểm thử:** `python3 tools/test.py` → ĐẠT. Chưa gọi thử máy chủ thật (không truy cập được từ môi trường này).
- **Việc thủ công:** Bản triển khai mới phải chứa `Code.gs` mới nhất, quyền "Anyone" và cùng Google Sheet với bản cũ; nếu không, tài khoản/tiến độ cũ sẽ không hiện.

### 2026-10-08 – Bảng tổng hợp tiến độ cả lớp + xuất Excel

- **Yêu cầu của thầy:** "Có, hãy thêm bảng tổng hợp và xuất ra file Excel" (thống kê từng bài học sinh đã học / chưa học).
- **Kết quả:** Tài khoản giáo viên (lớp không có chữ số, vd GV) ở trang chủ mỗi khối có nút **📊 Thống kê lớp**: ma trận học sinh × bài, ô xanh = đủ 3 mức, vàng = 1–2 mức, đỏ = chưa làm; chọn lớp; bấm tên bài để xem danh sách em chưa làm / đang làm / đã xong; nút xuất `.xlsx` 2 sheet (ma trận tô màu; danh sách chưa làm theo bài). Apps Script thêm action `gradeProgress` (cả khối một lần gọi); nếu chưa đăng lại Apps Script, web tự dùng `lessonStatus` từng bài (chậm hơn). Tính năng nằm ở trang học sinh (đăng nhập GV), không phải trang bài giảng giáo viên.
- **Tệp thay đổi:** `Code.gs`, `tools/apps-script/Code.gs`, `assets/js/class-matrix.js` (mới), `assets/js/lesson-monitor.js`, `assets/css/style.css`, `index.html`, `tools/test_appscript.js`, `tools/test_classmatrix.py` (mới), `CLAUDE.md`, `AGENTS.md`
- **Kiểm thử:** `node tools/test_appscript.js` → ĐẠT; `node tools/kiem-tra.js` → ĐẠT; `python3 tools/test.py` → ĐẠT; `python3 tools/test_classmatrix.py` → ĐẠT (cả đường gradeProgress và dự phòng, mở xlsx bằng openpyxl); `python3 tools/test_theodoi_baihoc.py` → ĐẠT. Chưa thử với dữ liệu lớp thật.
- **Việc thủ công:** Đăng lại Apps Script từ `Code.gs` (Deploy → Manage deployments → New version) để dùng `gradeProgress`.

### 2026-10-08 – Giáo viên theo dõi học sinh trong từng bài

- **Yêu cầu của thầy:** Trong từng bài ở phần học sinh, giáo viên cần biết học sinh nào chưa làm được bài đó.
- **Kết quả:** Khi đăng nhập tài khoản giáo viên và mở một bài, thanh công cụ có nút **📋 Theo dõi lớp**. Báo cáo lấy đủ danh sách từ trang `HocSinh`, cho chọn lớp và chia học sinh thành ba nhóm: chưa làm mức nào, đã làm 1–2 mức, đã làm đủ 3 mức. Mỗi học sinh có kết quả M1–M3, tổng sao của bài, lần làm gần nhất, đồng thời phân biệt người chưa đăng nhập với người đã đăng nhập nhưng chưa làm bài. Học sinh không nhìn thấy nút hoặc dữ liệu báo cáo. Bảng thích ứng màn hình điện thoại.
- **Tệp thay đổi:** `Code.gs`, `tools/apps-script/Code.gs`, `assets/js/lesson-monitor.js`, `assets/js/engine.js`, `assets/css/style.css`, `index.html`, `tools/test_appscript.js`, `tools/test_theodoi_baihoc.py`, `dist/hoc-tap.html`, `LICH-SU-CHINH-SUA.md`.
- **Kiểm thử:** `node tools/kiem-tra.js` → ĐẠT (38.100 lượt sinh câu); `python3 tools/test.py` → ĐẠT (23.220 câu); `node tools/test_appscript.js` → ĐẠT, gồm xác thực chỉ giáo viên được xem và đủ học sinh chưa đăng nhập; `python3 tools/test_theodoi_baihoc.py` → ĐẠT, gồm giao diện điện thoại, ba trạng thái, chuyển lớp và ẩn hoàn toàn với học sinh; `python3 tools/build.py` → ĐẠT (2.656 KB).
- **Việc thầy cần làm thủ công:** Chép toàn bộ `Code.gs` mới vào Google Apps Script, bấm **Triển khai → Quản lý bản triển khai → Chỉnh sửa → Phiên bản mới → Triển khai**. Không đổi URL ứng dụng web.

### 2026-10-08 – Tối ưu toàn bộ game cho điện thoại dọc và ngang

- **Yêu cầu của thầy:** Sửa game để hoạt động tốt trên cả điện thoại.
- **Kết quả:** Các trò Câu cá, Chém trái cây và Bắn bóng dùng bốn vùng đáp án ổn định, không còn chạy khuất mép màn hình; vẫn giữ chuyển động nhẹ 10,5 giây để tạo cảm giác sinh động và đủ thời gian đọc. Ở màn hình dọc, đáp án xếp một cột rồi thu thành lưới 2 × 2 khi hiện lời giải; ở điện thoại xoay ngang, câu hỏi và đáp án tự thu gọn theo chiều cao. Chế độ Đấu với máy cũng được thu gọn khi xoay ngang. Nút âm thanh được dời hoặc chừa khoảng trống để không che đáp án, lời giải hay nút chuyển câu; chiều cao dùng `100dvh` và vùng an toàn của thiết bị.
- **Tệp thay đổi:** `assets/css/game.css`, `tools/test_game_dienthoai.py`, `dist/hoc-tap.html`, `LICH-SU-CHINH-SUA.md`.
- **Kiểm thử:** `node tools/kiem-tra.js` → ĐẠT (38.100 lượt sinh câu); `python3 tools/test.py` → ĐẠT (23.220 câu); `python3 tools/test_game_dienthoai.py` → ĐẠT tại 390 × 844 và 844 × 390 cho ba mini game và Đấu với máy; `python3 tools/build.py` → ĐẠT (2.646 KB).
- **Việc thầy cần làm thủ công:** Không có.

### 2026-10-08 – Game Toán 10: Ôn tập Chương III với 20 câu công thức

- **Yêu cầu của thầy:** Tạo nội dung game Ôn tập Chương III Toán 10 Kết nối tri thức, chủ yếu kiểm tra chọn công thức đúng về hệ thức lượng trong tam giác và giá trị lượng giác của góc từ 0° đến 180°, gồm 20 câu.
- **Kết quả:** Thêm chủ đề **Ôn tập Chương III. Hệ thức lượng trong tam giác** vào menu game Toán 10. Mỗi trận có đúng 20 câu thông hiểu: 10 câu về hệ thức lượng giác cơ bản, tan/cot, dấu, góc bù, góc đặc biệt và điều kiện xác định; 10 câu về quy ước cạnh–góc, định lí côsin, hệ quả côsin, nhận dạng tam giác, định lí sin, bán kính ngoại tiếp, các công thức diện tích, Heron, bán kính nội–ngoại tiếp và lựa chọn công cụ giải. Mỗi câu có bốn phương án trộn ngẫu nhiên và lời giải nêu rõ căn cứ công thức.
- **Tệp thay đổi:** `data/game-lop10.js`, `tools/test.py`, `dist/hoc-tap.html`, `LICH-SU-CHINH-SUA.md`.
- **Kiểm thử:** `node tools/kiem-tra.js 100 lop10` → ĐẠT; `python3 tools/test.py` → ĐẠT; dựng đồng thời 20 câu trong trình duyệt → đủ 20 câu, không lỗi MathJax, không `undefined`/`NaN`/`Infinity`, không tràn ngang; `python3 tools/build.py`, `git diff --check` → ĐẠT.
- **Việc thầy cần làm thủ công:** Không có.

### 2026-10-08 – Làm lại menu Học mà chơi để chữ dễ đọc

- **Yêu cầu của thầy:** Menu vào game khó đọc, đặc biệt khi nền tối làm chữ sáng gần như chìm vào nền thẻ sáng.
- **Kết quả:** Tách biểu tượng, tiêu đề, mô tả và thông tin trận thành bốn vùng rõ ràng; dùng chữ xanh đen tương phản cao trên nền thẻ sáng ở cả chế độ sáng và tối; phân biệt Game củng cố bằng sắc vàng và Phòng thi kiến thức bằng sắc xanh; tăng khoảng cách, viền, kích thước vùng chạm; tự chuyển về một cột trên điện thoại. Các thẻ chủ đề game cũng được cố định màu chữ tối để không tái diễn lỗi trong chế độ tối.
- **Tệp thay đổi:** `assets/js/game.js`, `assets/css/game.css`, `tools/test.py`, `dist/hoc-tap.html`, `LICH-SU-CHINH-SUA.md`.
- **Kiểm thử:** `node tools/kiem-tra.js`, `python3 tools/test.py` (có kiểm tra độ tương phản tối thiểu 4,5:1 trong chế độ tối), `python3 tools/build.py`, `git diff --check` → ĐẠT.
- **Việc thầy cần làm thủ công:** Không có.

### 2026-10-08 – Giảm tốc độ cá trong Câu cá Toán học

- **Yêu cầu của thầy:** Cá đang bơi hơi nhanh, cần giảm tốc để học sinh kịp đọc và chọn đáp án.
- **Kết quả:** Tăng thời gian một lượt bơi của bốn đáp án từ 6–8,55 giây lên 9,5–12,95 giây; chỉ thay đổi Câu cá Toán học, giữ nguyên tốc độ Chém trái cây và Bắn bóng đáp án. Bổ sung kiểm thử ngăn thời gian bơi thấp hơn 9,5 giây.
- **Tệp thay đổi:** `assets/js/game.js`, `tools/test.py`, `dist/hoc-tap.html`, `LICH-SU-CHINH-SUA.md`.
- **Kiểm thử:** `node tools/kiem-tra.js`, `python3 tools/test.py`, `python3 tools/build.py`, `git diff --check` → ĐẠT.
- **Việc thầy cần làm thủ công:** Không có.

### 2026-10-08 – Menu Game củng cố riêng và câu hỏi thông hiểu theo lớp

- **Yêu cầu của thầy:** Tạo menu chơi game riêng; mỗi lớp dùng ngân hàng câu hỏi riêng ở mức độ thông hiểu.
- **Kết quả:**
  - Thêm lối vào **🕹️ Game củng cố** riêng trên trang học của từng lớp, tách khỏi **Phòng thi kiến thức** chơi với máy, hai người và cả lớp.
  - Thêm menu ba trò chơi cảm ứng: **Câu cá Toán học**, **Chém trái cây** và **Bắn bóng đáp án**. Mỗi lượt gồm 10 câu, 18 giây mỗi câu; bốn phương án được trộn và chuyển động; kết thúc lượt tính điểm, độ chính xác và thưởng tối đa 3 sao theo hệ thống hiện có.
  - Mỗi lớp chỉ thấy chủ đề thuộc đúng lớp của mình. Giữ các ngân hàng đã có cho lớp 9, 10, 11; bổ sung ngân hàng riêng cho lớp 4 và lớp 8, mỗi ngân hàng có 10 dạng sinh câu thông hiểu và lời giải.
  - Giao diện tự co giãn cho màn hình ngang, iPad và điện thoại dọc; câu hỏi cố định phía trên, vùng đáp án chuyển động phía dưới, nút chạm đủ lớn.
  - Bổ sung kiểm thử tự động cho năm lớp đang phát hành (`lop4`, `lop8`, `lop9`, `lop10`, `lop11`): kiểm tra lối vào, đủ ba game, không lẫn chủ đề giữa các lớp, đủ bốn đáp án chuyển động và có lời giải sau khi chọn.
- **Tệp thay đổi:** `assets/js/game.js`, `assets/css/game.css`, `data/game-lop4.js`, `data/game-lop8.js`, `index.html`, `tools/test.py`, `dist/hoc-tap.html`, `LICH-SU-CHINH-SUA.md`.
- **Kiểm thử:** `node tools/kiem-tra.js` → ĐẠT (38.100 lượt sinh câu, 13 chủ đề trò chơi); `python3 tools/test.py` → ĐẠT (23.220 câu và toàn bộ luồng Học mà chơi); kiểm tra trực quan ở 1366×768 và 430×932 → đủ bốn đáp án, không tràn ngang; `python3 tools/build.py` → ĐẠT (2.629 KB); `git diff --check` → ĐẠT.
- **Việc thầy cần làm thủ công:** Không có.

### 2026-10-08 – Bài giảng giáo viên: chương, chủ đề, đề kiểm tra thu gọn, bấm để mở

- **Yêu cầu của thầy:** Sắp xếp các chương, chủ đề, bài kiểm tra ở dạng ẩn, bấm vào hiện ra để trang bài giảng giáo viên gọn hơn.
- **Kết quả:** Trên trang mỗi lớp, mỗi chương (kể cả “Ôn tập giữa học kì I”), mục “Đề kiểm tra in A4” và mục “Bài kiểm tra của học sinh – chiếu trên lớp” chỉ hiện một hàng tiêu đề kèm số bài/đề; bấm vào hàng để mở danh sách và các nút (▶ Chiếu, 📄 Xem, 📝 Phiếu, 🏋️ Luyện tập, 📘 Giải SGK, 📋 Phiếu trên lớp, 📘 Phiếu cả chương, 📄 Đề, 🔑 Đáp án). Có nút “Mở tất cả” và “Thu gọn tất cả”. Mặc định thu gọn hết; khi mở phiếu rồi quay lại, các mục đã mở được giữ nguyên trong phiên.
- **Tệp thay đổi:** `assets/js/lecture.js` (hàm `fold`, `Lecture.foldAll`), `assets/css/style.css`, `tools/test_baigiang.py`, `tools/test_luyentap.py`, `tools/test_chieu_kiemtra.py` (mở tất cả trước khi bấm nút; thêm kiểm tra thu gọn/mở), `CLAUDE.md`, `AGENTS.md`, `dist/hoc-tap.html`, `LICH-SU-CHINH-SUA.md`
- **Kiểm thử:** `python3 tools/test_baigiang.py` (cả hai cỡ màn hình, kèm kiểm tra thu gọn/mở), `node tools/kiem-tra.js 3`, `python3 tools/test.py 1`, `python3 tools/build.py` → ĐẠT; `test_luyentap.py` lượt 1280×720 (bấm nút trên trang lớp sau khi mở tất cả) → ĐẠT, lượt 1024×768 và `test_chieu_kiemtra.py` chưa chờ kết quả cuối khi đăng (chưa có ✗).
- **Việc thủ công:** Không có.

### 2026-10-08 – Phiếu in trong bài giảng giáo viên: bỏ câu chú thích, tiêu đề chuẩn

- **Yêu cầu của thầy:** Sửa các phiếu trên lớp, phiếu in cho học sinh… không có những câu chú thích, để phiếu có tiêu đề chuẩn nhất trong bài giảng giáo viên.
- **Kết quả:** (1) Phiếu trên lớp (Phần A, 8 phiếu Toán 10 và 11): tiêu đề “PHIẾU HỌC TẬP” và dòng tên bài bên dưới; bỏ khối chú thích đầu phiếu, thời lượng và nhãn giáo viên ở tiêu đề mục (“Do Now”, “4 phút”, “[Minh họa]”, “nộp tiết sau”, “khoanh rồi giơ thẻ”…), bỏ nhãn nhỏ sau số câu (“bài trước”, “bắc cầu vào bài mới”, “trắc nghiệm”…). Phần B (gợi ý giáo viên) giữ nguyên. (2) Phiếu luyện tập: bỏ dòng “Gồm N bài…” và số bài trong tiêu đề mục. (3) Phiếu ôn tập cả chương: bỏ dòng “Gồm: …” và chú thích “(★ = vận dụng)”. (4) Bản có lời giải ghi trong tiêu đề “– LỜI GIẢI” thay cho ghi chú trong ngoặc.
- **Tệp thay đổi:** `assets/js/lecture.js`, `assets/css/style.css`, `giao-vien/bai-giang/lop10-khoi-dong.js`, `lop11-khoi-dong.js`, `CLAUDE.md`, `AGENTS.md`, `dist/hoc-tap.html`, `LICH-SU-CHINH-SUA.md`
- **Kiểm thử:** `python3 tools/test_phieu_tren_lop.py` 37/37, `node tools/kiem-tra.js 5`, `python3 tools/test.py 1`, `python3 tools/build.py` → ĐẠT; `test_luyentap.py` lượt 1280×720 (35 phiếu, 415 trang chiếu) → ĐẠT, lượt 1024×768 chưa chờ kết quả cuối. `tools/test_phieu_chuong.py` không chạy được trên Python 3.11 (lỗi cú pháp f-string có sẵn từ trước); phiếu chương đã kiểm bằng `tools/phieu_chuong_pdf.py`.
- **Việc thủ công:** Thầy xem lại một phiếu trên lớp và một phiếu luyện tập; muốn giữ lại câu nào thì báo em.

### 2026-10-08 – Sửa lỗi công thức trong phiếu PDF ô li (ôn thi vào 10, Đại số 3 Xác suất và các chủ đề khác)

- **Yêu cầu của thầy:** Phiếu PDF in ra ở chủ đề ôn thi 9 lên 10 bị lỗi công thức toán, ví dụ bài Đại số 3. Xác suất của biến cố.
- **Nguyên nhân:** Nút “📄 Phiếu PDF (ô li)” dựng phiếu trong một khung in riêng không nạp MathJax, nên công thức in ra là mã LaTeX thô `\( … \)` (lớp 4 không có công thức nên trước đây không lộ lỗi). Ngoài ra thẻ Kiến thức của bài Xác suất có 2 công thức bị cụt (“lấy 1 −” và “lấy n −”).
- **Kết quả:** Khung in tự nạp MathJax riêng khi phiếu có công thức và chỉ mở hộp thoại in sau khi công thức đã vẽ xong (chờ tối đa 12 giây); sửa 2 công thức cụt thành `1 − P(Ā)` và `n − k_đối`; bỏ dấu “·” thừa ở dòng đầu phiếu.
- **Tệp thay đổi:** `assets/js/tuduy-pdf.js`, `data/lop9.js`, `tools/test_tuduy_pdf.py` (thêm kiểm tra cả 6 bài lớp 9, bản học sinh và bản đáp án: công thức đã vẽ, không merror, không mã thô, không tràn lề), `CLAUDE.md`, `AGENTS.md`, `dist/hoc-tap.html`, `LICH-SU-CHINH-SUA.md`
- **Kiểm thử:** xem kết quả cuối trong báo cáo `python3 tools/test_tuduy_pdf.py` 31/31 ĐẠT, `node tools/kiem-tra.js 30 lop9` ĐẠT, `python3 tools/test.py 2` ĐẠT, `python3 tools/build.py` ĐẠT.
- **Việc thủ công:** Thầy in thử lại một phiếu (nhớ nạp lại trang để lấy bản mới).

### 2026-10-08 – Ôn thi vào 10, chủ đề 3: Xác suất đơn giản (trọn bộ)

- **Yêu cầu:** Đăng chủ đề ôn thi vào lớp 10 kế tiếp theo kế hoạch: Xác suất đơn giản (học sinh + bài giảng + phiếu luyện tập in 2 trang A4).
- **Kết quả:** Thêm bài `on-thi-xac-suat` (Đại số 3) với 5 dạng × 3 mức (hộp bi · xúc xắc · đồng xu và lập số · thẻ đánh số · xác suất thực nghiệm, tìm số bi, thêm/bớt bi), có thẻ 📘 Kiến thức cần nhớ · Lưu ý · Mẹo (4 mục); 1 bài giảng (4 trang kiến thức, 5 dạng có ví dụ, tổng kết); phiếu luyện tập 10 bài (7 cơ bản + 3 ★) vừa 2 trang A4 cả bản học sinh lẫn bản có lời giải. Đã xuất 2 tệp PDF.
- **Tệp thay đổi:** `data/lop9.js`, `giao-vien/bai-giang/lop9.js`, `giao-vien/bai-giang/lop9-luyen-tap.js`, `CLAUDE.md`, `AGENTS.md`, `dist/hoc-tap.html`, `LICH-SU-CHINH-SUA.md`
- **Kiểm thử:** `node tools/kiem-tra.js 150 lop9`, `python3 tools/test.py`, `python3 tools/test_phieu_tren_lop.py`, `python3 tools/test_baigiang.py lop9`, `python3 tools/build.py` → ĐẠT; PDF phiếu đo bằng `pdfinfo` đúng 2 trang.
- **Việc thủ công:** Thầy xem lại cách trình bày xác suất (không gian mẫu, biến cố) so với hướng dẫn của Sở.
### 2026-10-08 – Toán 10: Ôn tập giữa học kì I (5 đề, có hình vẽ) cho học sinh và giáo viên

- **Yêu cầu của thầy:** Từ tệp “Toán 10 – Đề ôn tập giữa học kì I 2026-2027” (5 đề), tạo bài luyện tập cho học sinh và đề thi trong bài giảng giáo viên mục ôn tập giữa kì 1, có hình vẽ.
- **Kết quả:** Ngân hàng câu hỏi chung (12 dạng TN, 6 dạng Đ/S, 8 dạng trả lời ngắn; số liệu và tình huống do em soạn lại theo cấu trúc đề, không chép nguyên văn). Học sinh: chủ đề 4 gồm 4 bài luyện (3 mức, có hình) và 5 đề làm có đồng hồ `giua-ki-1…5`. Giáo viên: bài giảng 10 ví dụ có hình, phiếu luyện tập 10 bài (7 + 3★), 5 đề in A4 × 4 mã (4 trang/mã) kèm đáp án. Hình mới: đài quan sát – cột cờ, đo cây hai góc, tam giác nội tiếp.
- **Tệp thay đổi:** `data/lop10-giua-ki-bank.js`, `data/lop10-giua-ki-kiem-tra.js`, `data/lop10.js`, `assets/js/figures.js`, `assets/js/kiemtra.js`, `assets/css/style.css`, `giao-vien/bai-giang/lop10.js`, `lop10-luyen-tap.js`, `lop10-giua-ki.js`, `index.html`, `giao-vien/index.html`, `tools/kiem-tra.js`, `tools/test_kiemtra.py`, `CLAUDE.md`, `AGENTS.md`, `dist/hoc-tap.html`
- **Kiểm thử:** `node tools/kiem-tra.js`, `python3 tools/test.py`, `test_kiemtra.py lop10` (65/65, mỗi mã đúng 4 trang), `test_baigiang.py lop10`, `test_luyentap.py` → ĐẠT (xem kết quả cuối trong báo cáo).
- **Việc thủ công:** Thầy đối chiếu đề với đáp án của thầy (số liệu là bản biến thể, không phải nguyên văn đề gốc); in thử một mã đề để xem hình.

### 2026-10-07 – Ôn thi 9 lên 10: thêm "Kiến thức cần nhớ · Lưu ý · Mẹo" cho học sinh

- **Yêu cầu của thầy:** Ở phần chủ đề ôn tập 9 lên 10 của học sinh phải có kiến thức cần nhớ, lưu ý và mẹo để củng cố và làm bài.
- **Kết quả:** Thêm thẻ 📘 (mở sẵn đầu trang bài) cho cả 5 chủ đề đã đăng: Hàm số y = ax², PT bậc hai – Viète, Tiếp tuyến, Góc ở tâm – góc nội tiếp, Hình quạt – vành khuyên. Mỗi chủ đề 3–4 mục: công thức/kiến thức cần nhớ, ⚠️ lưu ý lỗi hay mất điểm, 💡 mẹo. Engine hỗ trợ trường `warn` (ô vàng) và tiêu đề tiếng Việt cho bài không song ngữ. `kiem-tra.js` từ nay báo lỗi nếu chủ đề `on-thi-…` thiếu intro/lưu ý/mẹo. Đã cập nhật tác vụ đăng mỗi ngày để chủ đề 3–11 đều có phần này.
- **Tệp thay đổi:** `data/lop9.js`, `assets/js/engine.js`, `assets/css/style.css`, `tools/kiem-tra.js`, `CLAUDE.md`, `AGENTS.md`, `dist/hoc-tap.html`, `LICH-SU-CHINH-SUA.md`
- **Kiểm thử:** `node tools/kiem-tra.js`, `python3 tools/test.py`, `test_lophoc.py` → ĐẠT; đã chụp thử trang học sinh: công thức hiển thị đúng, không còn chữ tiếng Anh.
- **Việc thủ công:** Thầy đối chiếu nội dung "phải chứng minh lại" ở các chủ đề hình học với hướng dẫn của Sở.

### 2026-10-07 – Thiết kế trò chơi Mở khóa kho báu cho thi đua nhóm

- **Yêu cầu của thầy:** Thiết kế trò chơi **Mở khóa kho báu** có đồ họa đẹp mắt, phù hợp với ứng dụng “Học mà chơi”.
- **Kết quả đã làm:**
  - Thêm tùy chọn **🏝️ Mở khóa kho báu** trong phần thiết lập thi đua nhóm; lựa chọn được ghi nhớ và dùng được cho cả chia theo danh sách lớp lẫn chia theo số thứ tự.
  - Mỗi lượt đội đạt yêu cầu nhận một chìa khóa. Nút **Mở kho báu** xuất hiện ngay dưới thẻ đội và hiện rõ số chìa khóa đang có.
  - Tạo bản đồ biển–đảo bằng CSS nhẹ, không tải ảnh ngoài: bầu trời, mặt biển, các đảo, đường khám phá và 16 rương khóa; giữ phần câu hỏi lớn ở bên trái khi trình chiếu.
  - Giáo viên chọn rương, xác nhận rõ tên đội và số rương rồi mới mở. Rương đã mở đổi trạng thái và không thể chọn lại.
  - Mỗi rương chứa phần thưởng bí mật từ 5 đến 30 điểm: Túi xu vàng, Ngọc lục bảo, Hồng ngọc bí ẩn, Kim cương đại dương hoặc Kho báu huyền thoại.
  - Hiện thẻ chúc mừng có hiệu ứng khi mở rương; cộng điểm ngay cho đội, sử dụng một chìa khóa và ghi riêng tổng thưởng kho báu bằng biểu tượng `🪙` trong bảng xếp hạng.
  - Nếu giáo viên kết thúc vòng khi đội vẫn còn chìa khóa, bảng xếp hạng tiếp tục hiện nút mở kho báu; sau khi xem bản đồ có thể quay lại đúng màn hình xếp hạng.
  - Cơ chế kho báu hoạt động đồng thời với chấm đúng/sai, Săn lỗi vàng, Ngôi sao hy vọng, Đại sứ bất ngờ và Thẻ quyền năng.
- **Tệp đã sửa:** `assets/js/lecture.js`, `assets/css/style.css`, `tools/test_thidua_nhom.py`, `dist/hoc-tap.html`, `LICH-SU-CHINH-SUA.md`.
- **Kiểm thử:**
  - `python3 tools/test_thidua_nhom.py` → ĐẠT; kiểm tra nhận chìa khóa, đủ 16 rương, đúng đội khám phá, xác nhận số rương, phần thưởng 5–30 điểm, sử dụng chìa khóa, cộng điểm và ghi thưởng trong xếp hạng.
  - `python3 tools/test_lophoc.py` → ĐẠT; bảng trình chiếu co giãn, kéo, ẩn và mở lại không tràn.
  - `python3 tools/test.py` → ĐẠT; 22.320 câu đã thử.
  - `python3 tools/test_baigiang.py lop10` → ĐẠT; 156 trang ở hai cỡ màn hình, không tràn, không lỗi, chữ tối thiểu 18 px.
  - `node tools/kiem-tra.js` → ĐẠT; 36.375 lượt sinh câu, 13 bài kiểm tra học sinh, 11 chủ đề trò chơi, 681 trang bài giảng, 33 phiếu luyện tập và 4 đề kiểm tra.
  - `python3 tools/build.py` → ĐẠT; tạo lại `dist/hoc-tap.html` (2.511 KB).
  - `git diff --check` → ĐẠT.
- **Việc thầy cần làm thủ công:** Không có.

### 2026-10-07 – Toán 11 Bài 6: thêm 20 câu trắc nghiệm vào bài giảng

- **Yêu cầu của thầy:** Trong bài giảng Bài 6. Cấp số cộng, tạo 20 trắc nghiệm đủ mức độ, củng cố kiến thức và vận dụng thực tế.
- **Kết quả:** Thêm 1 trang giới thiệu và 20 trang trắc nghiệm vào cuối phần luyện tập (trước "Tổng kết"): Câu 1–6 nhận biết, 7–12 thông hiểu, 13–17 vận dụng thực tế (hàng ghế, thu nhập, chạy bộ, xếp hộp, khoan giếng), 18–20 vận dụng cao. Mỗi câu có 4 phương án A–D (hai cột), lời giải từng bước và đáp án; đáp án A/B/C/D mỗi chữ 5 câu, không có 3 câu liên tiếp cùng chữ. Mọi đáp số đã kiểm tra lại bằng mã. Trang trắc nghiệm đánh dấu `tn:true` (kind `lt`) để **không** chen vào phiếu học tập in và phiếu theo chương.
- **Tệp thay đổi:** `giao-vien/bai-giang/lop11.js`, `assets/js/lecture.js` (bỏ `tn` khỏi phiếu in), `dist/hoc-tap.html`, `LICH-SU-CHINH-SUA.md`
- **Kiểm thử:** `node tools/kiem-tra.js 5 lop11`, `python3 tools/test.py`, `test_baigiang.py lop11`, `test_phieu_tren_lop.py` → ĐẠT
- **Việc thủ công:** Thầy đối chiếu các câu thực tế với lớp mình dạy; chưa lấy câu từ SGK/SBT nên không cần tra số trang.

### 2026-10-07 – Bổ sung Đại sứ bất ngờ, Săn lỗi vàng và Thẻ quyền năng

- **Yêu cầu của thầy:** Triển khai ba hình thức dạy học tích cực trong hệ thống thi đua nhóm: Đại sứ bất ngờ, Săn lỗi – Bắt lỗi vàng và Thẻ quyền năng Toán học.
- **Kết quả đã làm:**
  - Thêm ba tùy chọn bật/tắt ngay khi giáo viên thiết lập cuộc thi; lựa chọn được ghi nhớ cho lần sử dụng sau.
  - **Đại sứ bất ngờ:** sau khi các đội thảo luận, giáo viên bấm một lần để bốc ngẫu nhiên một thành viên của mỗi đội; ưu tiên học sinh chưa làm đại sứ ở các vòng trước. Thẻ **Đổi đại sứ** có thể bốc lại người khác trong đội.
  - **Săn lỗi vàng:** giáo viên có thể đổi từng vòng sang chế độ tìm và sửa lỗi trước khi chấm. Mỗi đội được chấm theo bốn mức rõ ràng: chưa đạt `0`, tìm được lỗi `10`, giải thích được lỗi `20`, sửa hoàn chỉnh `30`; bảng kết quả vòng và xếp hạng dùng đúng số điểm này.
  - **Thẻ quyền năng:** mỗi đội có năm thẻ dùng một lần trong cả cuộc thi: Xin gợi ý, Thêm 30 giây, Loại một đáp án, Đổi đại sứ và Thách đấu. Mỗi lần dùng đều có hộp xác nhận ngay trong bảng trình chiếu, hiện rõ đội, tên thẻ và đội bị thách đấu nếu có; thẻ đã dùng tự khóa và lưu trạng thái trên thẻ đội.
  - Giữ đầy đủ Ngôi sao hy vọng; trong vòng Săn lỗi, một lần đạt được nhân ba điểm khi đội đã đặt Ngôi sao hy vọng, còn mức chưa đạt bị trừ 30 điểm.
  - Tránh hộp thoại trình duyệt để không làm thoát toàn màn hình khi giáo viên đang trình chiếu.
- **Tệp đã sửa:** `assets/js/lecture.js`, `assets/css/style.css`, `tools/test_thidua_nhom.py`, `dist/hoc-tap.html`, `LICH-SU-CHINH-SUA.md`.
- **Kiểm thử:**
  - `python3 tools/test_thidua_nhom.py` → ĐẠT; kiểm tra bốc đại sứ, đủ năm thẻ cho mỗi đội, xác nhận và khóa thẻ, đổi đại sứ, thêm thời gian, bốn mức Săn lỗi, tính điểm, xếp hạng, Ngôi sao hy vọng và không có lỗi JavaScript.
  - `python3 tools/test_lophoc.py` → ĐẠT; bảng lớp học kéo, ẩn, mở lại và nội dung trình chiếu không tràn.
  - `python3 tools/test.py` → ĐẠT; 22.320 câu đã thử.
  - `python3 tools/test_baigiang.py lop10` → ĐẠT; 156 trang ở hai cỡ màn hình, không tràn, không lỗi, chữ tối thiểu 18 px.
  - `node tools/kiem-tra.js` → ĐẠT; 36.375 lượt sinh câu, 13 bài kiểm tra học sinh, 11 chủ đề trò chơi, 681 trang bài giảng, 33 phiếu luyện tập và 4 đề kiểm tra.
  - `python3 tools/build.py` → ĐẠT; tạo lại `dist/hoc-tap.html` (2.489 KB).
  - `git diff --check` → ĐẠT.
- **Việc thầy cần làm thủ công:** Không có.

### 2026-10-07 – Phóng to tên học sinh ở bảng chia nhóm theo lớp

- **Yêu cầu của thầy:** Khi chia nhóm từ danh sách lớp có sẵn, màn hình đầu tiên phải hiển thị tên học sinh lớn nhất để nhìn từ xa; khi vào cuộc thi thì tên tự thu nhỏ.
- **Kết quả đã làm:**
  - Ở bảng chia nhóm ban đầu, danh sách tên học sinh dùng chữ đậm 22 px trong kiểm thử máy chiếu, căn giữa, nền xanh nhạt tương phản và lớn hơn tên đội.
  - Giữ cách chia ngẫu nhiên, cân bằng và hiển thị đủ mọi học sinh trong từng đội.
  - Khi bắt đầu cuộc thi, danh sách tên tự chuyển thành một dòng nhỏ 9 px dưới tên đội, có dấu rút gọn khi dài và vẫn xem được đầy đủ qua chú thích.
  - Không thay đổi không gian chấm đúng/sai, kết quả vòng hoặc hàng Ngôi sao hy vọng bên dưới.
- **Tệp đã sửa:** `assets/js/lecture.js`, `assets/css/style.css`, `tools/test_thidua_nhom.py`, `dist/hoc-tap.html`, `LICH-SU-CHINH-SUA.md`.
- **Kiểm thử:**
  - `python3 tools/test_thidua_nhom.py` → ĐẠT; tên học sinh 22 px ở bảng chia nhóm, lớn hơn tên đội và tự thu nhỏ khi bắt đầu thi.
  - `python3 tools/test_lophoc.py` → ĐẠT.
  - `python3 tools/test.py` → ĐẠT; 22.320 câu đã thử.
  - `node tools/kiem-tra.js` → ĐẠT; 36.375 lượt sinh câu, 660 trang bài giảng và 33 phiếu luyện tập.
  - `python3 tools/build.py` → ĐẠT; tạo lại `dist/hoc-tap.html` (2.478 KB).
  - `git diff --check` → ĐẠT.
- **Việc thầy cần làm thủ công:** Không có.

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
