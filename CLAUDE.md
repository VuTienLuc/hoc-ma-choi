# Hướng dẫn cho AI – dự án "Học mà chơi"

> File này dành cho AI (Claude, ChatGPT, Gemini…). Hãy đọc hết trước khi sửa bất cứ thứ gì trong thư mục.
> Người dùng là giáo viên (thầy Vũ Tiến Lực). Trả lời bằng tiếng Việt và gọi người dùng là "thầy".

## 1. Dự án là gì

Web tĩnh cho **học sinh tiểu học/THCS tự luyện tập củng cố theo từng bài SGK**, chạy tốt nhất trên **iPad**.
- Học sinh chọn lớp → chọn bài → chọn mức (1 Làm quen · 2 Luyện tập · 3 Thử thách) → làm một bộ 6 câu xếp từ dễ đến khó.
- Câu hỏi **sinh ngẫu nhiên bằng code**, không lưu sẵn. Mỗi lần bấm "Làm bộ mới" sẽ ra câu khác.
- Chấm: sai lần 1 → hiện gợi ý; sai lần 2 → hiện lời giải và khoá câu. Đúng lần đầu được 1 điểm, đúng lần hai được ½ điểm. Hết bộ thì cho 1–3 sao, lưu trong localStorage.
- Hiện có: **Toán 4 – Kết nối tri thức (29 bài)**, **Toán 9 (chương I–II, 8 bài)**, **Toán 10 (chương I, 3 bài)**, **Toán 11 (chương I, 5 bài)** – Kết nối tri thức. Lớp 9–11 xưng "em"; lớp 11 tính góc theo đơn vị U = 1/12 độ (π = 2160) trong `data/lop11.js`; hệ phương trình hiển thị bằng class `.sys`, dòng công thức bằng `.mx` (trong style.css). Mục tiêu là thêm dần các lớp và môn khác.

## 2. Cấu trúc và vai trò từng file

| File | Vai trò | Khi nào sửa |
|---|---|---|
| `config.js` | Tên web, người soạn, `setSize`, danh sách `grades` (lớp đang có), `upcoming` (lớp hiện chữ "Sắp có") | Khi thêm lớp |
| `data/<mã-lớp>.js` | **Toàn bộ nội dung một lớp**: chủ đề, bài, các dạng bài | Hầu hết mọi việc về nội dung |
| `data/_mau-lop-moi.js` | File mẫu có chú thích, chứa ví dụ Lớp 3 chạy được | Chép ra khi tạo lớp mới |
| `assets/js/core.js` | Tiện ích (`R`, `pick`, `fmt`, `F`, `gcd`, `lcm`, `roman`…), bộ dựng câu `QB`/`QC`/`QCmp`, sổ đăng ký `App.addGrade` | Khi cần thêm hàm tiện ích |
| `assets/js/figures.js` | Hàm vẽ SVG: `protractorSVG`, `angleSVG`, `fracSVG`, `barSVG`, `rectSVG`, `shapeSVG` | Khi cần loại hình mới |
| `assets/js/generators.js` | Dạng bài **dùng chung cho nhiều lớp**: `gPlace`, `gValue`, `gCompose`, `gCmp`, `gRound`, `gAddSub`, `gFindX`, `gConv` (+ `MASS`, `AREA`), `gReadProt`, `gRotate`, `gAngType`, `gAngDeg`, `gAngWhich` | Khi một dạng bài dùng được cho ≥2 lớp |
| `assets/js/engine.js` | Hiển thị, chấm, sao, điều hướng hash, nạp `data/*.js` | **Hạn chế sửa**. Chỉ sửa khi thêm loại câu hỏi mới hoặc tính năng mới |
| `assets/css/style.css` | Giao diện "vở ô chấm", token màu, chế độ tối, bố cục iPad | Khi đổi giao diện |
| `tools/test.py` | Kiểm thử tự động: làm hết mọi câu và báo câu nào bị chấm sai | Chạy sau **mọi** thay đổi |
| `tools/build.py` | Gộp cả thư mục thành `dist/hoc-tap.html` (một file) | Trước khi gửi hoặc publish |

Thứ tự nạp: `config.js → core.js → figures.js → generators.js → engine.js`. Sau đó engine tự nạp `data/<mã>.js` theo `CONFIG.grades`.
Dùng **script thường (không phải ES module), không build tool, không framework, không thư viện ngoài** (chỉ có Google Fonts). Nhờ vậy mở trực tiếp file `index.html` trên máy vẫn chạy.

## 3. Hợp đồng dữ liệu (phải tuân theo đúng)

### Khai báo một lớp – `data/lop5.js`
```js
(() => {
const G = App.addGrade({
  id: 'lop5', name: 'Lớp 5', subject: 'Toán', book: 'Kết nối tri thức',
  topics: [ {id:1, hk:1, name:'Ôn tập và bổ sung'}, /* … */ ],   // hk = học kì 1|2
});
const lesson = G.lesson;
// lesson(mãChủĐề, 'ma-bai-khong-dau', 'Tên bài', 'Mô tả 1 dòng', [dạngBài1, dạngBài2, …]);
lesson(1, 'on-so-thap-phan', 'Ôn tập số thập phân', 'Đọc, viết, so sánh số thập phân.', [gA, gB, gC]);
})();
```
- `id` của lớp trùng tên file. Mã bài viết không dấu, nối bằng gạch ngang, không trùng trong cùng một lớp.
- Các bài hiển thị theo thứ tự gọi `lesson`. Mảng dạng bài xếp **từ dễ đến khó**. Mỗi bộ 6 câu chia đều cho các dạng theo đúng thứ tự đó.
- Mỗi lớp nên có 3–5 dạng bài cho mỗi bài.

### Một dạng bài = hàm `lv => câu hỏi` (lv = 1, 2, 3)
| Loại | Cách tạo | Trường riêng |
|---|---|---|
| Điền ô trống | `QB({...})` | `tpl` chứa `[_]` (ô số/chữ) và `[F]` (ô phân số); `ans` là mảng theo thứ tự ô; `wide:true` cho số dài; `sameDen:true` cho bài quy đồng |
| Chọn đáp án | `QC({...})` | `opts` (các phương án), `ans` (phương án đúng, phải nằm trong `opts`), `keepOrder`, `compact`, `expr` |
| Chọn dấu | `QCmp(text, trái, phải, giáTrịTrái, giáTrịPhải, {hint, sol})` | — |
| Xoay tia | `{kind:'rotate', target, val, step, text, hint, sol}` | dùng với thước đo góc |
| Tô màu | `{kind:'shade', n, shape:'rect'|'circle', num, den, on:[], text, hint, sol}` | số phần tô × den = num × n |

Trường chung cho mọi câu: `text` (đề, được dùng HTML), `fig` (SVG, không bắt buộc), `hint`, `sol`.

Cách viết `ans` cho ô trống:
- số: `ans:[1250]`, chấm đúng dù học sinh gõ "1 250" hay "1250";
- chấp nhận nhiều cách viết: `ans:[['XX', 20]]`;
- phân số: `{frac:[3,4], mode:'exact'|'eq'|'simplest'}`.

Token có thể nằm trong markup. Ví dụ `<span class="fr"><span>[_]</span><span>12</span></span>` hỏi riêng tử số.

## 4. Quy tắc nội dung (quan trọng nhất)

1. **Đáp án phải luôn đúng.** Chọn đáp án trước rồi mới dựng đề: chọn thương và số chia rồi nhân ra số bị chia; chọn số bé và hiệu rồi tính tổng; chọn trung bình trước rồi tính các số hạng.
2. Không để kết quả âm, số có chữ số 0 đứng đầu, phép chia không hết (trừ khi đề hỏi phép chia có dư), hoặc hai phương án trắc nghiệm cùng đúng.
3. Khi hỏi "chữ số X ở hàng nào", chữ số X chỉ được xuất hiện đúng một lần trong số.
4. `hint` chỉ nói **cách làm**, không lộ đáp án. `sol` trình bày ngắn gọn các bước và **in đậm đáp án** bằng `<b>…</b>`.
5. Văn phong gửi học sinh nhỏ: gọi học sinh là "con", câu ngắn, ấm áp, không chê. Số viết có khoảng cách hàng nghìn bằng `fmt()`, phân số hiển thị bằng `F(a,b)`.
6. Mức 1, 2, 3 khác nhau thật sự: độ lớn của số, số bước tính, có bẫy hay không.
7. Bám **mục lục SGK** của bộ sách đã chọn. Nếu không chắc tên hoặc số bài, hãy nói rõ để giáo viên đối chiếu, không bịa số bài.
8. Không chép tên, logo, ảnh hoặc thương hiệu của trang web người khác, kể cả khi người dùng gửi ảnh mẫu. Chỉ học bố cục.

## 5. Quy trình chuẩn khi nhận việc

**Thêm lớp mới:** chép `data/_mau-lop-moi.js` → `data/<mã>.js` → khai báo `topics` và các bài → thêm mã lớp vào `CONFIG.grades` và xoá lớp đó khỏi `upcoming` → chạy test → chạy build.
**Thêm hoặc sửa bài:** chỉ sửa trong `data/<mã>.js`. Nếu dạng bài dùng được cho lớp khác thì chuyển sang `generators.js`.
**Thêm loại câu hỏi hoặc loại hình mới:** sửa `figures.js` và `engine.js` (các hàm `cardEl`, `check`, `lockCard`), đồng thời bổ sung nhánh tương ứng trong `tools/test.py`.

**Sau mọi thay đổi:**
```bash
python3 tools/test.py        # phải in "KẾT QUẢ: ĐẠT ✓"   (tham số tuỳ chọn: số vòng/bài, mặc định 10)
python3 tools/build.py       # tạo dist/hoc-tap.html
```
Khi có thể, chụp màn hình ở kích thước iPad dọc 820×1180 và ngang 1180×820 để kiểm tra: chữ không đè lên hình, không có cuộn ngang, hình không quá to.

## 6. Giao diện – giữ nhất quán
- Phong cách "vở ô chấm": nền chấm tròn, thẻ viền đậm 2.5px với bóng lệch `6px 6px 0`, nút bo tròn dạng viên thuốc. Font: Baloo 2 cho tiêu đề, Be Vietnam Pro cho nội dung.
- Chỉ dùng biến màu trên `:root` (có bộ màu chế độ tối). Không viết màu cứng trong component, kể cả trong SVG: tô màu bằng class `sv-*`.
- Vùng chạm ≥ 48px, đề bài 20px, ô trống 24px. Từ 900px trở lên thì hình và phần trả lời xếp 2 cột.

## 7. Đường link
`#/` chọn lớp · `#/lop4` danh sách bài · `#/lop4/bai/<mã-bài>/<mức>` mở thẳng một bài.

## 8. Khi báo cáo lại cho giáo viên
Viết ngắn gọn: đã thêm hoặc sửa gì (lớp, bài, số dạng), kết quả `test.py` (số câu đã thử, ĐẠT hay không), những gì thầy cần tự kiểm tra (tên bài so với mục lục SGK). Không kể lại từng bước kỹ thuật.
