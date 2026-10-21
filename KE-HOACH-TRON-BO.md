# Kế hoạch “trọn bộ” mỗi ngày một bài – Toán 10 và Toán 11 (Kết nối tri thức)

Tệp này là **bảng việc chung** giữa thầy, ChatGPT (Codex) và Claude. Thầy yêu cầu ngày 14/10/2026:
ChatGPT mỗi ngày làm **một bài** theo dạng **/tron-bo** (đủ 6 phần) cho đến khi hết các bài còn lại của lớp 10 và lớp 11; **Claude kiểm lại mỗi ngày** sau khi ChatGPT làm xong.

- Tổng cộng **60 ngày** làm việc: lớp 10 có 27 mục, lớp 11 có 33 mục (gồm cả mục “Ôn tập chương” của mỗi chương). Xen kẽ lớp 10 – lớp 11 để thầy luôn có bài mới cho cả hai lớp.
- Đã có sẵn, **không làm lại**: lớp 10 Chương I–III (Bài 1–6), Bài 12 (phần học sinh); lớp 11 Chương I–II (Bài 1–7).
- **Tên bài, số bài, số trang SGK là theo trí nhớ về mục lục SGK Kết nối tri thức; thầy/Claude đối chiếu với sách trước khi dùng.** ChatGPT không chắc thì ghi rõ trong cột ghi chú, không bịa số trang.

## 1. Quy ước trạng thái

| Ký hiệu | Nghĩa | Ai đổi |
|:--:|---|---|
| ⬜ | Chưa làm | — |
| 🟦 | ChatGPT đang làm (đã nhận việc hôm nay) | ChatGPT |
| 🟨 | ChatGPT làm xong, **chờ Claude kiểm** (đã có Pull Request / nhánh) | ChatGPT |
| 🟧 | Claude kiểm thấy lỗi, đã ghi rõ lỗi ở cột Ghi chú, **ChatGPT sửa lại** | Claude |
| ✅ | Claude kiểm đạt và đã đưa lên web | Claude (hoặc thầy bấm Merge) |

Quy tắc: **chỉ làm ngày kế tiếp khi ngày trước đã ✅** (hoặc 🟧 đang sửa). Mỗi ngày chỉ làm **một hàng**.

## 2. Việc của ChatGPT mỗi ngày (6 phần của /tron-bo)

Làm đúng hàng đầu tiên còn ⬜ (hoặc hàng 🟧 phải sửa). Trước khi làm: kéo bản mới nhất, đọc `AGENTS.md`, `LICH-SU-CHINH-SUA.md` và tệp này.

1. **Học sinh luyện tập** – `data/lopN.js`: mỗi bài ≥ 4 dạng × 3 mức khác nhau thật sự (mức 3 không chỉ là số to hơn). Chương mới nằm trong khối `{ … }` riêng, thêm chủ đề mới vào `topics` **đúng thứ tự SGK** và **có `label:'Chương IV'`** (đúng số chương SGK; tên chủ đề = tên chương theo SGK). Chủ đề ôn tập / củng cố / kiểm tra thì thêm `grp:'📝 Ôn tập · Củng cố · Kiểm tra'` và `label` bắt đầu bằng 📝 (xem chủ đề 90–93 làm mẫu); web tự gom các chủ đề này vào mục riêng ở cuối trang chủ. Bài kiểm tra trực tuyến của chương gắn vào chủ đề ôn tập tương ứng. Các mã mới theo kế hoạch cũ (dùng `G.topics.splice(...)` như chủ đề 91/92; mã chủ đề mới chưa dùng: lớp 10 dùng 5, 6, 7, 8, 9 cho Chương IV, VI, VII, VIII, IX; lớp 11 dùng 4 đến 10 cho Chương III đến IX; **không dùng** mã ≥ 90). Chương V của lớp 10 dùng tiếp chủ đề 4 đã có.
2. **Bài giảng trình chiếu** – `giao-vien/bai-giang/lopN.js`: `title`, `kt`, `method` từng dạng, ≥ 1 ví dụ `vd` mỗi dạng, `lt`, `sum`.
3. **Phiếu luyện tập** – `lopN-luyen-tap.js`: 10 bài = 7 cơ bản + 3 `hard:true`, xếp theo dạng.
4. **Giải SGK** – `lopN-giai-sgk.js`: chỉ câu vận dụng, câu khó; ghi đúng số trang/bài SGK, không chắc thì nói rõ.
5. **Phiếu học tập trên lớp** – `lopN-khoi-dong.js`: Phần A in **đúng 2 trang A4**, đáp số cuối dòng, phương án A–D mỗi phương án một dòng; Phần B gợi ý giáo viên; ví dụ tự soạn ghi **[Minh hoạ]**.
6. **Phiếu in A4** – tự sinh từ bài giảng (nút 📝 Phiếu), không cần viết thêm.

Mục “Ôn tập chương”: làm cả 6 phần cho nội dung tổng hợp của chương (mã `on-tap-cN`), có bài toán thực tế; khuôn mẫu: `on-tap-c1`, `on-tap-c2` của lớp 11 và `on-tap-c3` của lớp 10.

**Quy tắc nội dung bắt buộc** (nhắc lại từ `AGENTS.md`): chọn đáp án trước rồi mới dựng đề; hint không lộ đáp án; `sol` chia bước, in đậm đáp án bằng `tb(...)`; không gõ `<` `>` trong công thức (dùng `\lt` `\gt`); ô `[_]` nằm ngoài `tm(...)`; đáp số là số nguyên hoặc phân số (ô `[F]`), tối đa 4 ký tự khi đưa vào đề kiểm tra; không sửa `engine.js`, không đổi `CONFIG.sheetAPI`, không thêm thư viện. Hình vẽ mới đặt trong `assets/js/figures.js` (lớp CSS `sv-*`), có chú thích “Hình minh hoạ”.

**Lưu ý theo chương** (để hình vẽ và đáp số làm được trong hệ thống hiện tại):
- Lớp 10 Chương IV (vectơ): vẽ vectơ, hình bình hành, toạ độ bằng SVG (dùng `planeSVG` và hàm mới); đáp số là số hoặc toạ độ (hai ô `[_]`).
- Lớp 10 Chương VI, VII: đồ thị hàm số bậc hai, đường thẳng, đường tròn, ba đường conic cần hàm vẽ mới; phương trình dạng số, phân số.
- Lớp 10 Chương VIII, IX: tổ hợp, xác suất – đáp số là số nguyên hoặc phân số; bài thực tế có sơ đồ cây (`treeSVG`) hoặc bảng.
- Lớp 11 Chương III: bảng tần số ghép nhóm, biểu đồ cột (`barSVG`) – đáp số làm tròn **sẵn** theo yêu cầu đề (chọn số liệu để kết quả đẹp).
- Lớp 11 Chương IV, VII: hình không gian (hình chóp, hình lăng trụ, hình hộp) cần hàm SVG mới: nét liền – nét đứt, đặt tên đỉnh rõ; đề dạng chứng minh nên chuyển thành câu chọn hoặc điền ô.
- Lớp 11 Chương V, VI, IX: giới hạn, lôgarit, đạo hàm – đáp số số/phân số; không dùng ký hiệu vô cực trong ô điền (dùng câu chọn nếu đáp án là ±∞).

## 3. Kiểm tra trước khi báo xong (ChatGPT tự chạy)

```
node tools/kiem-tra.js            # phải in "KẾT QUẢ: ĐẠT ✓"
node tools/kiem-tra.js 300 lopN   # lớp vừa sửa
python3 tools/test.py             # chạy nền, chậm; phải ĐẠT
python3 tools/test_phieu_tren_lop.py   # Phần A đúng 2 trang, phương án 1–2 dòng
python3 tools/build.py            # đóng gói dist/hoc-tap.html
```
- Có tệp bài giảng mới thì thêm thẻ `<script>` vào `giao-vien/index.html` đúng thứ tự (bài giảng, luyện tập, giải SGK, khởi động).
- Tự giải lại mọi ví dụ và đáp số bằng code độc lập (Python/sympy hoặc bộ giải đọc lại đề), quét câu sinh ngẫu nhiên: không âm vô lý, không NaN, phương án không trùng.
- Thêm **một mục mới ở đầu** “Các lần thay đổi” của `LICH-SU-CHINH-SUA.md` (chỉ ghi ĐẠT cho lệnh thực sự đã chạy).
- Sửa hàng của ngày hôm nay trong bảng dưới đây: Trạng thái → 🟨; Ghi chú: ngày, mã Pull Request (hoặc tên nhánh), những chỗ cần đối chiếu SGK.
- **Không** tự đẩy lên nhánh `main` khi chưa có Claude kiểm: mở Pull Request (Codex tự làm) hoặc để trên nhánh riêng `chatgpt/ngay-NN`.

## 4. Lệnh giao việc hằng ngày (thầy chép, dán cho ChatGPT / Codex)

```
Đọc AGENTS.md, LICH-SU-CHINH-SUA.md và KE-HOACH-TRON-BO.md.
Làm trọn bộ (/tron-bo, đủ 6 phần) cho HÀNG ĐẦU TIÊN còn trạng thái ⬜ trong bảng KE-HOACH-TRON-BO.md
(nếu có hàng 🟧 thì sửa hàng đó trước, theo lỗi Claude ghi ở cột Ghi chú).
Làm đủ, không cắt bớt, không hỏi lại giữa chừng. Chạy node tools/kiem-tra.js, python3 tools/test.py,
python3 tools/test_phieu_tren_lop.py, python3 tools/build.py (phải ĐẠT). Cập nhật LICH-SU-CHINH-SUA.md và hàng của ngày hôm nay
trong KE-HOACH-TRON-BO.md (🟨 + ghi chú). Mở Pull Request, không đẩy thẳng lên main.
Báo cáo ngắn tiếng Việt: đã thêm gì (số dạng, số ví dụ, số bài), kết quả kiểm tra, chỗ thầy cần đối chiếu với SGK.
```
Muốn tự động hằng ngày: trong ChatGPT dùng **Tasks (nhiệm vụ đã lên lịch)** hoặc Codex, đặt lịch mỗi ngày một lần với đúng nội dung lệnh trên.

## 5. Việc của Claude mỗi ngày (kiểm lại sau khi ChatGPT xong)

Thầy nhắn Claude: **“Kiểm bài hôm nay trong KE-HOACH-TRON-BO”** (hoặc Claude tự kiểm khi thầy mở phiên). Claude làm lần lượt:

1. Kéo bản mới, lấy Pull Request/nhánh của hàng 🟨 và xem toàn bộ thay đổi: đủ **6 phần**, số dạng × mức, ví dụ, phiếu 7 + 3, giải SGK, phiếu trên lớp Phần A 2 trang; không đụng `engine.js`, `CONFIG.sheetAPI`, `Code.gs`.
2. Chạy `node tools/kiem-tra.js 1000 lopN`, `python3 tools/test.py` (nền), `tools/test_phieu_tren_lop.py`, `tools/build.py`.
3. **Kiểm độc lập đáp số**: bộ giải riêng (đọc đề đã sinh rồi tính lại) trên vài trăm câu mỗi dạng; kiểm ví dụ trong bài giảng và câu giải SGK; soát lỗi chuyên môn (điều kiện, dấu, nghiệm loại, làm tròn).
4. Soát giao diện: chụp ảnh trang bài mới (hình vẽ không chồng chữ, không tràn trên iPad 1024×768; công thức hiển thị đúng); xem hint không lộ đáp án, `sol` in đậm đáp án.
5. Đối chiếu tên bài, số bài, số trang SGK; chỗ không chắc ghi vào cột Ghi chú để thầy kiểm sách.
6. Kết luận: **lỗi nhỏ thì Claude sửa thẳng trong nhánh** rồi chạy lại kiểm tra; **lỗi lớn** (thiếu phần, sai nhiều) thì chuyển 🟧 và ghi rõ từng lỗi để ChatGPT sửa. Đạt thì chuyển ✅, ghi mục vào `LICH-SU-CHINH-SUA.md`, báo thầy bấm Merge (hoặc đăng lên web nếu thầy đã cho phép).
7. Báo thầy ngắn: bài nào đã ✅, Claude đã sửa gì, thầy cần đối chiếu gì.

## 7. Lịch tự động (đặt 14/10/2026, giờ Việt Nam)

| Giờ | Ai | Việc | Cách đặt |
|---|---|---|---|
| **05:30 mỗi ngày** | ChatGPT | Làm hàng ⬜ đầu tiên (hoặc sửa hàng 🟧), mở Pull Request, đổi hàng sang 🟨 | **Thầy tự đặt** trong ChatGPT: *Tasks / Nhiệm vụ đã lên lịch* (hoặc Codex) → Daily 05:30 → dán lệnh ở mục 4. Claude không đặt được lịch trong tài khoản ChatGPT của thầy. |
| **12:07 mỗi ngày** | Claude | Kiểm hàng 🟨, sửa lỗi nhỏ, chạy kiểm tra; đạt thì ✅ và đưa lên web, không đạt thì 🟧 kèm lỗi; báo thầy qua thông báo | Đã đặt sẵn (nhiệm vụ “Kiểm bài ChatGPT hằng ngày – Học mà chơi”). Chạy tự động, không cần thầy mở máy. |

- Claude chỉ đưa lên web khi **mọi kiểm tra ĐẠT**; có lỗi lớn thì không đưa, đợi ChatGPT sửa vào hôm sau.
- Muốn tạm dừng hoặc đổi giờ: nói với Claude “tạm dừng / đổi giờ lịch kiểm”; với ChatGPT thì tắt hoặc sửa nhiệm vụ trong Tasks.
- Nếu ChatGPT chưa đặt lịch, thầy vẫn có thể dán lệnh mục 4 bằng tay mỗi ngày; Claude vẫn kiểm vào 12:07.

## 6. Bảng kế hoạch

| Ngày | Lớp | Chương | Bài (tên theo SGK KNTT – cần đối chiếu) | Mã bài trong `data/` | Mã bài giảng | Trạng thái | Ghi chú của ChatGPT / Claude |
|---:|:--:|:--:|---|---|---|:--:|---|
| 1 | 10 | IV | Bài 7. Các khái niệm mở đầu | `vecto-khai-niem` | `bai-7` | ✅ | 16/10 · Claude |
| 2 | 11 | III | Bài 8. Mẫu số liệu ghép nhóm | `mau-so-lieu-ghep-nhom` | `bai-8` | ✅ | Claude làm trực tiếp 14/10/2026 (chủ đề 4 “Chương III”); giải SGK ghi đề theo dạng, chưa tra số trang |
| 3 | 10 | IV | Bài 8. Tổng và hiệu của hai vectơ | `vecto-tong-hieu` | `bai-8` | ✅ | 16/10 · Claude |
| 4 | 11 | III | Bài 9. Các số đặc trưng đo xu thế trung tâm | `ghep-nhom-xu-the` | `bai-9` | ✅ | 16/10 · Claude làm trực tiếp (chủ đề 4 “Chương III”); giải SGK ghi đề theo dạng, chưa tra số trang |
| 5 | 10 | IV | Bài 9. Tích của một số với một vectơ | `vecto-tich-so` | `bai-9` | ✅ | 17/10 · Claude làm trực tiếp; giải SGK ghi đề theo dạng, chưa tra số trang |
| 6 | 11 | III | Bài 10. Các số đặc trưng đo mức độ phân tán | `ghep-nhom-phan-tan` | `bai-10` | ⬜ | |
| 7 | 10 | IV | Bài 10. Vectơ trong mặt phẳng toạ độ | `vecto-toa-do` | `bai-10` | ✅ | 21/10 · Claude làm trực tiếp; giải SGK ghi đề theo dạng, chưa tra số trang |
| 8 | 11 | III | Ôn tập chương III | `on-tap-c3` | `on-tap-c3` | ⬜ | |
| 9 | 10 | IV | Bài 11. Tích vô hướng của hai vectơ | `tich-vo-huong` | `bai-11` | ⬜ | |
| 10 | 11 | IV | Bài 11. Đường thẳng và mặt phẳng trong không gian | `dt-mp-khong-gian` | `bai-11` | ⬜ | |
| 11 | 10 | IV | Ôn tập chương IV | `on-tap-c4` | `on-tap-c4` | ⬜ | |
| 12 | 11 | IV | Bài 12. Hai đường thẳng song song | `hai-dt-song-song` | `bai-12` | ⬜ | |
| 13 | 10 | V | Bài 12. Số gần đúng và sai số (đã có phần học sinh; chỉ làm các phần còn thiếu) | `so-gan-dung-sai-so` | `bai-12` | ⬜ | |
| 14 | 11 | IV | Bài 13. Đường thẳng và mặt phẳng song song | `dt-mp-song-song` | `bai-13` | ⬜ | |
| 15 | 10 | V | Bài 13. Các số đặc trưng đo xu thế trung tâm | `so-dac-trung-xu-the` | `bai-13` | ⬜ | |
| 16 | 11 | IV | Bài 14. Hai mặt phẳng song song | `hai-mp-song-song` | `bai-14` | ⬜ | |
| 17 | 10 | V | Bài 14. Các số đặc trưng đo độ phân tán | `so-dac-trung-phan-tan` | `bai-14` | ⬜ | |
| 18 | 11 | IV | Bài 15. Phép chiếu song song | `phep-chieu-song-song` | `bai-15` | ⬜ | |
| 19 | 10 | V | Ôn tập chương V | `on-tap-c5` | `on-tap-c5` | ⬜ | |
| 20 | 11 | IV | Ôn tập chương IV | `on-tap-c4` | `on-tap-c4` | ⬜ | |
| 21 | 10 | VI | Bài 15. Hàm số | `ham-so` | `bai-15` | ⬜ | |
| 22 | 11 | V | Bài 16. Giới hạn của dãy số | `gioi-han-day-so` | `bai-16` | ⬜ | |
| 23 | 10 | VI | Bài 16. Hàm số bậc hai | `ham-so-bac-hai` | `bai-16` | ⬜ | |
| 24 | 11 | V | Bài 17. Giới hạn của hàm số | `gioi-han-ham-so` | `bai-17` | ⬜ | |
| 25 | 10 | VI | Bài 17. Dấu của tam thức bậc hai | `dau-tam-thuc` | `bai-17` | ⬜ | |
| 26 | 11 | V | Bài 18. Hàm số liên tục | `ham-so-lien-tuc` | `bai-18` | ⬜ | |
| 27 | 10 | VI | Bài 18. Phương trình quy về phương trình bậc hai | `pt-quy-ve-bac-hai` | `bai-18` | ⬜ | |
| 28 | 11 | V | Ôn tập chương V | `on-tap-c5` | `on-tap-c5` | ⬜ | |
| 29 | 10 | VI | Ôn tập chương VI | `on-tap-c6` | `on-tap-c6` | ⬜ | |
| 30 | 11 | VI | Bài 19. Luỹ thừa với số mũ thực | `luy-thua` | `bai-19` | ⬜ | |
| 31 | 10 | VII | Bài 19. Phương trình đường thẳng | `pt-duong-thang` | `bai-19` | ⬜ | |
| 32 | 11 | VI | Bài 20. Lôgarit | `logarit` | `bai-20` | ⬜ | |
| 33 | 10 | VII | Bài 20. Vị trí tương đối và góc giữa hai đường thẳng. Khoảng cách từ một điểm đến một đường thẳng | `vi-tri-goc-khoang-cach` | `bai-20` | ⬜ | |
| 34 | 11 | VI | Bài 21. Hàm số mũ và hàm số lôgarit | `ham-so-mu-logarit` | `bai-21` | ⬜ | |
| 35 | 10 | VII | Bài 21. Đường tròn trong mặt phẳng toạ độ | `duong-tron` | `bai-21` | ⬜ | |
| 36 | 11 | VI | Bài 22. Phương trình, bất phương trình mũ và lôgarit | `pt-bpt-mu-logarit` | `bai-22` | ⬜ | |
| 37 | 10 | VII | Bài 22. Ba đường conic | `ba-duong-conic` | `bai-22` | ⬜ | |
| 38 | 11 | VI | Ôn tập chương VI | `on-tap-c6` | `on-tap-c6` | ⬜ | |
| 39 | 10 | VII | Ôn tập chương VII | `on-tap-c7` | `on-tap-c7` | ⬜ | |
| 40 | 11 | VII | Bài 23. Hai đường thẳng vuông góc | `hai-dt-vuong-goc` | `bai-23` | ⬜ | |
| 41 | 10 | VIII | Bài 23. Quy tắc đếm | `quy-tac-dem` | `bai-23` | ⬜ | |
| 42 | 11 | VII | Bài 24. Đường thẳng vuông góc với mặt phẳng | `dt-vuong-goc-mp` | `bai-24` | ⬜ | |
| 43 | 10 | VIII | Bài 24. Hoán vị, chỉnh hợp và tổ hợp | `hoan-vi-chinh-hop-to-hop` | `bai-24` | ⬜ | |
| 44 | 11 | VII | Bài 25. Hai mặt phẳng vuông góc | `hai-mp-vuong-goc` | `bai-25` | ⬜ | |
| 45 | 10 | VIII | Bài 25. Nhị thức Newton | `nhi-thuc-newton` | `bai-25` | ⬜ | |
| 46 | 11 | VII | Bài 26. Khoảng cách | `khoang-cach-khong-gian` | `bai-26` | ⬜ | |
| 47 | 10 | VIII | Ôn tập chương VIII | `on-tap-c8` | `on-tap-c8` | ⬜ | |
| 48 | 11 | VII | Bài 27. Thể tích | `the-tich` | `bai-27` | ⬜ | |
| 49 | 10 | IX | Bài 26. Biến cố và định nghĩa cổ điển của xác suất | `bien-co-dinh-nghia` | `bai-26` | ⬜ | |
| 50 | 11 | VII | Ôn tập chương VII | `on-tap-c7` | `on-tap-c7` | ⬜ | |
| 51 | 10 | IX | Bài 27. Thực hành tính xác suất theo định nghĩa cổ điển | `thuc-hanh-xac-suat` | `bai-27` | ⬜ | |
| 52 | 11 | VIII | Bài 28. Biến cố hợp, biến cố giao, biến cố độc lập | `bien-co-hop-giao` | `bai-28` | ⬜ | |
| 53 | 10 | IX | Ôn tập chương IX | `on-tap-c9` | `on-tap-c9` | ⬜ | |
| 54 | 11 | VIII | Bài 29. Công thức cộng xác suất | `cong-thuc-cong-xs` | `bai-29` | ⬜ | |
| 55 | 11 | VIII | Bài 30. Công thức nhân xác suất cho hai biến cố độc lập | `cong-thuc-nhan-xs` | `bai-30` | ⬜ | |
| 56 | 11 | VIII | Ôn tập chương VIII | `on-tap-c8` | `on-tap-c8` | ⬜ | |
| 57 | 11 | IX | Bài 31. Định nghĩa và ý nghĩa của đạo hàm | `dinh-nghia-dao-ham` | `bai-31` | ⬜ | |
| 58 | 11 | IX | Bài 32. Các quy tắc tính đạo hàm | `quy-tac-dao-ham` | `bai-32` | ⬜ | |
| 59 | 11 | IX | Bài 33. Đạo hàm cấp hai | `dao-ham-cap-hai` | `bai-33` | ⬜ | |
| 60 | 11 | IX | Ôn tập chương IX | `on-tap-c9` | `on-tap-c9` | ⬜ | |

Ghi chú: khi SGK có thêm hoặc đổi tên bài, thầy/Claude sửa bảng này trước; ChatGPT không tự thêm, bớt, đổi thứ tự hàng.
