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
2. Bấm đúp nút **“Gói tài liệu cho ChatGPT”** trên Desktop. Nút này:
   - lấy bản mới nhất từ GitHub;
   - tạo **một tệp duy nhất** `HOC-MA-CHOI-THAM-KHAO.md` trong thư mục *Học mà chơi – cho ChatGPT* trên Desktop. Tệp gồm quy tắc, bản đồ các bài đang có, mã lõi và các tệp mẫu;
   - mở sẵn Finder (đã chọn tệp) và trang ChatGPT.
3. Trong Project → **Files**: **xoá** tệp `HOC-MA-CHOI-THAM-KHAO.md` cũ (nếu có), rồi **kéo** tệp mới vào. Chỉ một tệp, nên xoá và tải lại rất nhanh.
4. Dán **Lệnh khởi đầu** (ngay dưới đây) vào ô *Instructions* của Project.
5. Khi giao việc: **đính kèm thêm tệp cần sửa** (ví dụ `data/lop10.js`) ngay trong tin nhắn. ChatGPT đọc trọn tệp đính kèm và trả lại tệp đã sửa.
6. Chép tệp ChatGPT trả về vào đúng chỗ trong thư mục `hoc-tap`, rồi bấm đúp nút **“Đăng Học mà chơi lên web”** (mục 4). Nút này tự kiểm tra; có lỗi thì dừng và chép sẵn lỗi để thầy dán cho ChatGPT sửa.
   - Làm tay (không dùng nút): mở Terminal trong thư mục và chạy `node tools/kiem-tra.js`. Thấy `KẾT QUẢ: ĐẠT ✓` mới đưa lên GitHub.

**Khi nào tải lại gói?** Mỗi khi Claude hoặc Codex vừa cập nhật dự án: bấm lại nút “Gói tài liệu cho ChatGPT”, xoá tệp cũ trong Project, kéo tệp mới vào.

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

QUY TẮC LÀM ĐẦY ĐỦ (bắt buộc):
- Làm TRỌN yêu cầu trong một lần; không hỏi "có muốn làm tiếp không" giữa chừng.
- Mỗi bài đủ số dạng như tệp mẫu (học sinh: 4 dạng × 3 mức khác nhau thật sự); bài giảng ≥ 1 ví dụ mỗi dạng; phiếu luyện tập đủ 10 bài (7 + 3).
- Lời giải chia từng bước, mỗi bước ghi rõ căn cứ, dành cho học sinh trung bình.
- TUYỆT ĐỐI không viết "...", "// phần còn lại giữ nguyên", "tương tự như trên", "TODO". Luôn đưa lại TOÀN BỘ tệp.
- Nếu quá dài: chia thành Phần 1, Phần 2… và tự viết tiếp đến hết, cuối cùng ghi "ĐÃ XONG TOÀN BỘ".
- Trước khi kết thúc: tự giải lại từng bài để chắc đáp số đúng, tự rà theo bảng "lỗi thường gặp" trong AGENTS.md và liệt kê đã kiểm những gì.
```

### Cài đặt chung của ChatGPT (một lần, áp dụng mọi cuộc trò chuyện)
Vào **Cài đặt → Cá nhân hoá → Hướng dẫn tuỳ chỉnh**, dán:
```
Tôi là giáo viên Toán. Trả lời bằng tiếng Việt, gọi tôi là "thầy".
Khi làm việc kỹ thuật: ưu tiên đầy đủ và chính xác hơn ngắn gọn; không bỏ bớt, không viết tắt nội dung;
suy nghĩ kỹ và tự kiểm tra kết quả trước khi trả lời.
```

### Chọn mô hình (gói Plus)
Tên mô hình của ChatGPT thay đổi thường xuyên. Nguyên tắc chung: **chọn mô hình lớn nhất, mức suy nghĩ cao nhất**.
| Việc | Nên chọn | Tránh |
|---|---|---|
| Soạn chương, bài giảng, phiếu luyện tập | **Codex** với mô hình lớn nhất (GPT‑6 Astra; nếu không có thì Sol), mức suy nghĩ **High / Extra high** | Instant, mini, Luna |
| Trò chuyện trong Project | Mô hình **Thinking** mới nhất, mức **Extended** | Instant (hay làm tắt, cắt bớt tệp) |
| Việc nhỏ (sửa chữ, đổi màu) | Sol hoặc Thinking ở mức Standard | |

- Plus có giới hạn lượt dùng: dành mô hình lớn cho việc lớn.
- Giao **từng bài hoặc 2–3 bài một lần**, thay vì cả chương.
- Cuối mỗi lệnh thêm câu: *"Làm đầy đủ, không cắt bớt; xong thì chạy node tools/kiem-tra.js và báo kết quả."*

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

**Tạo đề kiểm tra (4 mã đề, đáp án riêng, in A4)**
```
Tạo đề kiểm tra CHƯƠNG … Toán LỚP trong giao-vien/bai-giang/lopN-kiem-tra.js theo đúng khuôn giao-vien/bai-giang/lop11-kiem-tra.js:
Phần I 16 câu trắc nghiệm 1 đáp án (nhận biết), Phần II 4 câu đúng/sai (mỗi ý có bản đúng và bản sai), Phần III 2 bài tự luận vận dụng thực tế 2 điểm (mỗi mã đề một bộ số, hướng dẫn chấm 0,25 điểm/bước).
Phương án đúng viết đầu tiên. Tổng 10 điểm. Thêm thẻ <script> vào giao-vien/index.html (sau tệp luyện tập của lớp).
Tự giải lại mọi câu, chạy node tools/kiem-tra.js tới khi ĐẠT.
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
  - Công cụ bắt được phần lớn lỗi: sai cú pháp, sai số ô trống, đáp án không có trong phương án, dấu `<` trong công thức, quên thẻ `<script>`, sai tỉ lệ 70/30, chỗ ChatGPT làm tắt ("…", "phần còn lại giữ nguyên", TODO).
  - Công cụ **không** biết một bài toán hay hay dở, hoặc có đúng SGK không. Thầy vẫn cần xem nội dung.
- Kiểm tra kỹ nhất vẫn là `python3 tools/test.py` (làm thử mọi câu trong trình duyệt thật); Codex chạy được nếu môi trường có Playwright.
- **Không** để ChatGPT sửa `tools/apps-script/Code.gs` nếu thầy chưa định triển khai lại Apps Script.
  - Nếu có sửa: dán `Code.gs` mới vào Apps Script, rồi vào *Triển khai → Quản lý triển khai → ✏ → Phiên bản mới*. Làm như vậy thì link giữ nguyên.
- Link Apps Script hiện dùng nằm ở `config.js` (`sheetAPI`). Đổi link thì chỉ sửa dòng đó.
- Nhiều AI (Claude, ChatGPT) cùng làm trên một dự án: luôn kéo bản mới nhất từ GitHub trước khi giao việc, để tránh ghi đè lên nhau.
  - Bấm nút ở mục 4 khi *không có gì mới* là máy tự lấy bản mới nhất về.

---

## 4. Nút “Đăng lên web” trên Desktop (bấm đúp là xong)

Tệp **`Đăng Học mà chơi lên web.command`** nằm trên màn hình Desktop (bản gốc: `tools/dang-len-web.command`).
Sau khi chép tệp ChatGPT làm vào thư mục `hoc-tap`, thầy **bấm đúp** tệp này. Cửa sổ Terminal mở ra và tự làm lần lượt:

1. Liệt kê các tệp đã thay đổi.
2. Chạy `node tools/kiem-tra.js`.
   - **Có lỗi thì dừng, không đăng.** Các dòng lỗi được chép sẵn: thầy mở ChatGPT, dán (⌘V) và bảo nó sửa.
3. Đóng gói lại `dist/hoc-tap.html`.
4. Hỏi *“Đăng các thay đổi trên lên web?”*. Nhấn **Enter** là đồng ý.
5. Hợp với bản mới nhất trên GitHub (phòng khi Claude vừa sửa chỗ khác), kiểm tra lại, rồi gửi lên.
   - Vercel tự cập nhật web sau khoảng 1 phút.
6. Nếu GitHub có người vừa sửa **đúng cùng dòng** thì dừng, không mất gì. Thầy nhờ Claude: *“Hợp bản trên máy với GitHub”*.

### Lần đầu tiên (làm một lần)
- **Nếu macOS chặn không cho mở:** chuột phải vào tệp → **Mở** → **Mở**.
- **Nếu máy báo cần “Command Line Tools”:** bấm *Cài đặt*, chờ xong rồi bấm lại tệp.
- **Nếu máy báo thiếu Node.js:** trang nodejs.org tự mở ra. Cài bản **LTS** rồi bấm lại tệp.
- **Đăng nhập GitHub:** khi Terminal hỏi `Username` và `Password`:
  1. Vào github.com → ảnh đại diện → **Settings** → **Developer settings** → **Personal access tokens** → **Fine-grained tokens** → **Generate new token**.
  2. Đặt tên “May Mac”, thời hạn 1 năm. Ở *Repository access*, chọn **Only select repositories** → `hoc-ma-choi`. Ở *Permissions → Contents*, chọn **Read and write**. Bấm **Generate token**.
  3. Quay lại Terminal:
     - `Username`: gõ `VuTienLuc`, rồi Enter.
     - `Password`: **dán token** vừa tạo (chữ không hiện ra, cứ dán), rồi Enter.
     - Máy Mac tự nhớ, các lần sau không hỏi nữa.
  4. **Không gửi token này cho bất kỳ AI nào** (kể cả Claude, ChatGPT).
