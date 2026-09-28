# Dùng ChatGPT để phát triển tiếp "Học mà chơi"

Tài liệu cho **thầy**: cách giao việc cho ChatGPT sao cho nó hiểu đúng dự án và không làm hỏng web.
Mọi quy tắc kỹ thuật cho AI nằm trong **`AGENTS.md`**. ChatGPT Codex tự đọc tệp này; tệp `CLAUDE.md` có nội dung giống hệt.

---

## 1. Chọn cách dùng

### Cách A – ChatGPT Codex (nên dùng: tự sửa, tự kiểm tra, tự tạo Pull Request)
1. Vào chatgpt.com, mở **Codex**, rồi kết nối GitHub và chọn kho **`VuTienLuc/hoc-ma-choi`**.
2. Ở phần *Environment* (môi trường), điền:
   - Setup script: *để trống* (dự án không cần cài gì).
   - Lệnh kiểm tra: `node tools/kiem-tra.js`.
3. Giao việc bằng một trong các **lệnh mẫu ở mục 2**.
   - Codex tự đọc `AGENTS.md`, sửa mã, chạy `node tools/kiem-tra.js` rồi tạo Pull Request.
4. Thầy xem Pull Request. Kiểm tra đạt thì bấm **Merge**. Vercel tự đưa bản mới lên web sau khoảng 1 phút.

### Cách B – ChatGPT thường (trò chuyện, có Project)
1. Tạo một **Project** trong ChatGPT, đặt tên "Học mà chơi".
2. Tải lên Project các tệp sau:
   - `AGENTS.md`;
   - tệp mẫu gần nhất với việc cần làm (ví dụ `data/lop8.js`, `giao-vien/bai-giang/lop8.js`, `giao-vien/bai-giang/lop8-luyen-tap.js`);
   - `tools/kiem-tra.js`.
3. Dán **Lệnh khởi đầu** (ngay dưới đây) vào ô *Instructions* của Project.
4. ChatGPT trả về tệp đã sửa. Thầy chép tệp đó vào thư mục `hoc-tap` trên máy, rồi mở Terminal trong thư mục và chạy:
   ```
   node tools/kiem-tra.js
   ```
   - Thấy `KẾT QUẢ: ĐẠT ✓` mới đưa lên GitHub.
   - Thấy dòng ✗ thì dán nguyên các dòng đó cho ChatGPT sửa tiếp.

### Lệnh khởi đầu (dán vào Instructions của Project / Custom GPT)
```
Bạn là lập trình viên của dự án web tĩnh "Học mà chơi" (bài tập củng cố Toán theo từng bài SGK Kết nối tri thức, tối ưu iPad) của thầy Vũ Tiến Lực.
Luôn đọc và tuân thủ tuyệt đối AGENTS.md (hợp đồng dữ liệu, quy tắc nội dung, lỗi thường gặp, khuôn mẫu).
Nguyên tắc:
1. Trả lời bằng tiếng Việt, gọi người dùng là "thầy". Báo cáo ngắn: đã thêm/sửa gì, cần thầy kiểm tra gì.
2. Chỉ dùng JavaScript thuần (script thường, không module, không framework, không thư viện ngoài). Không đổi CONFIG.sheetAPI, không sửa engine.js khi chỉ thêm nội dung.
3. Làm theo đúng khuôn của tệp mẫu gần nhất (data/lop9.js, data/lop8.js; giao-vien/bai-giang/lop8.js; giao-vien/bai-giang/lop8-luyen-tap.js).
4. Mỗi dạng bài là hàm lv => câu hỏi (QB/QC/QS). Chọn ĐÁP ÁN TRƯỚC rồi mới dựng đề. hint không lộ đáp án; sol trình bày từng bước và in đậm đáp án bằng tb(...).
5. Công thức: tm/td/tb; không gõ < > trong công thức (dùng \\lt \\gt); ô trống [_] luôn nằm NGOÀI tm(...); trong chuỗi JS viết \\frac, \\widehat.
6. Chương mới trong tệp data đặt trong khối { … } riêng; bài giảng mới trong (() => { … })(); để không trùng tên hằng.
7. Phiếu luyện tập: 10 bài = 7 cơ bản + 3 vận dụng (hard:true).
8. Thêm tệp bài giảng mới thì thêm thẻ <script> vào giao-vien/index.html.
9. Luôn đưa lại TOÀN BỘ tệp đã sửa (không cắt bớt) và nhắc thầy chạy: node tools/kiem-tra.js (phải ĐẠT ✓).
10. Bám mục lục SGK; không chắc tên/số bài thì nói rõ để thầy đối chiếu, không bịa.
```

---

## 2. Lệnh mẫu (chép, sửa phần in hoa rồi gửi)

**Thêm phần học sinh cho một chương**
```
Tạo phần học sinh cho Toán LỚP, CHƯƠNG … (SGK Kết nối tri thức) trong data/lopN.js, theo đúng khuôn chương V của data/lop9.js:
mỗi bài 4 dạng bài, 3 mức khác nhau thật sự, có hình vẽ khi là bài hình học, thêm bài Ôn tập chương.
Sau khi làm, chạy node tools/kiem-tra.js 60 lopN và sửa cho tới khi ĐẠT.
```

**Thêm bài giảng trình chiếu cho giáo viên**
```
Tạo bài giảng cho Toán LỚP, CHƯƠNG … trong giao-vien/bai-giang/lopN.js theo đúng khuôn chương III của giao-vien/bai-giang/lop8.js:
mỗi bài có trang mục tiêu, kiến thức trọng tâm (có hình), các dạng bài (phương pháp), ví dụ lời giải từng bước, luyện tập, tổng kết.
Học sinh trung bình – khá: lời giải chia nhỏ, ghi rõ căn cứ. Kiểm tra bằng node tools/kiem-tra.js.
```

**Thêm phiếu luyện tập**
```
Tạo phiếu luyện tập cho các bài giảng của Toán LỚP, CHƯƠNG … trong giao-vien/bai-giang/lopN-luyen-tap.js theo khuôn lop8-luyen-tap.js:
mỗi phiếu 10 bài (7 cơ bản, 3 vận dụng hard:true), xếp theo dạng như bài giảng, không nhắc lý thuyết, có lời giải từng bước.
Nhớ thêm thẻ <script> vào giao-vien/index.html (sau tệp bài giảng). Kiểm tra bằng node tools/kiem-tra.js.
```

**Sửa một lỗi thầy thấy khi dùng**
```
Trên web, bài … (lớp …, mức …) có lỗi: MÔ TẢ (ảnh chụp đính kèm).
Tìm nguyên nhân trong mã, sửa tận gốc để các câu sinh ngẫu nhiên khác cũng không bị, rồi chạy node tools/kiem-tra.js 80 lopN.
```

**Thêm tính năng giao diện**
```
Thêm tính năng: MÔ TẢ. Giữ phong cách "vở ô chấm" (mục 6 AGENTS.md), chỉ dùng biến màu trong :root, vùng chạm ≥ 48px, chạy tốt trên iPad.
Không phá các tính năng cũ (đăng nhập, thú cưng, trình chiếu, bài giảng). Cập nhật bảng tệp ở mục 2 của AGENTS.md và CLAUDE.md.
```

---

## 3. Những điều thầy cần nhớ
- `node tools/kiem-tra.js` chạy khoảng 2 giây, **chỉ cần Node.js** (máy Mac: cài từ nodejs.org).
  - Công cụ bắt được phần lớn lỗi: sai cú pháp, sai số ô trống, đáp án không có trong phương án, dấu `<` trong công thức, quên thẻ `<script>`, sai tỉ lệ 70/30.
  - Công cụ **không** biết một bài toán hay hay dở, hoặc có đúng SGK không. Thầy vẫn cần xem nội dung.
- Kiểm tra kỹ nhất vẫn là `python3 tools/test.py` (làm thử mọi câu trong trình duyệt thật); Codex chạy được nếu môi trường có Playwright.
- **Không** để ChatGPT sửa `tools/apps-script/Code.gs` nếu thầy chưa định triển khai lại Apps Script.
  - Nếu có sửa: dán `Code.gs` mới vào Apps Script, rồi vào *Triển khai → Quản lý triển khai → ✏ → Phiên bản mới*. Làm như vậy thì link giữ nguyên.
- Link Apps Script hiện dùng nằm ở `config.js` (`sheetAPI`). Đổi link thì chỉ sửa dòng đó.
- Nhiều AI (Claude, ChatGPT) cùng làm trên một dự án: luôn kéo bản mới nhất từ GitHub trước khi giao việc, để tránh ghi đè lên nhau.
