# Hướng dẫn cho AI – dự án "Học mà chơi"

> File này dành cho AI (Claude, ChatGPT, Gemini…). Hãy đọc hết trước khi sửa bất cứ thứ gì trong thư mục.
> Người dùng là giáo viên (thầy Vũ Tiến Lực). Trả lời bằng tiếng Việt và gọi người dùng là "thầy".

## 1. Dự án là gì

Web tĩnh cho **học sinh tiểu học/THCS tự luyện tập củng cố theo từng bài SGK**, chạy tốt nhất trên **iPad**.
- Học sinh chọn lớp → chọn bài → chọn mức (1 Làm quen · 2 Luyện tập · 3 Thử thách) → làm một bộ 6 câu xếp từ dễ đến khó.
- Câu hỏi **sinh ngẫu nhiên bằng code**, không lưu sẵn. Mỗi lần bấm "Làm bộ mới" sẽ ra câu khác.
- Chấm: sai lần 1 → hiện gợi ý; sai lần 2 → hiện lời giải và khoá câu. Đúng lần đầu được 1 điểm, đúng lần hai được ½ điểm. Hết bộ thì cho 1–3 sao, lưu trong localStorage.
- Hiện có: **Toán 4 – Kết nối tri thức (29 bài)**, **Toán 9 (chương I–IV, 16 bài)**, **Toán 10 (chương I–III, 9 bài)**, **Toán 11 (chương I–II, 9 bài)** – Kết nối tri thức. Lớp 9–11 xưng "em"; lớp 11 tính góc theo đơn vị U = 1/12 độ (π = 2160) trong `data/lop11.js`. **Từ lớp 6 trở lên mọi công thức viết bằng LaTeX, MathJax vẽ** (xem mục 4b). Mục tiêu là thêm dần các lớp và môn khác.

## 2. Cấu trúc và vai trò từng file

| File | Vai trò | Khi nào sửa |
|---|---|---|
| `config.js` | Tên web, người soạn, `setSize`, danh sách `grades` (lớp đang có), `upcoming` (lớp hiện chữ "Sắp có") | Khi thêm lớp |
| `data/<mã-lớp>.js` | **Toàn bộ nội dung một lớp**: chủ đề, bài, các dạng bài | Hầu hết mọi việc về nội dung |
| `data/_mau-lop-moi.js` | File mẫu có chú thích, chứa ví dụ Lớp 3 chạy được | Chép ra khi tạo lớp mới |
| `assets/js/core.js` | Tiện ích (`R`, `pick`, `fmt`, `F`, `gcd`, `lcm`, `roman`…), bộ dựng câu `QB`/`QC`/`QCmp`, sổ đăng ký `App.addGrade` | Khi cần thêm hàm tiện ích |
| `assets/js/figures.js` | Hàm vẽ SVG: `protractorSVG`, `angleSVG`, `fracSVG`, `barSVG`, `rectSVG`, `shapeSVG`, `rtTriSVG` (tam giác vuông có nhãn cạnh, cung góc), `triSVG` (tam giác bất kì theo 3 cạnh, nhãn cạnh/góc), `halfCircleSVG` (nửa đường tròn đơn vị), `planeSVG` (mặt phẳng Oxy: đường thẳng, gạch bỏ phần không là miền nghiệm theo quy ước KNTT, chấm điểm) | Khi cần loại hình mới |
| `assets/js/generators.js` | Dạng bài **dùng chung cho nhiều lớp**: `gPlace`, `gValue`, `gCompose`, `gCmp`, `gRound`, `gAddSub`, `gFindX`, `gConv` (+ `MASS`, `AREA`), `gReadProt`, `gRotate`, `gAngType`, `gAngDeg`, `gAngWhich` | Khi một dạng bài dùng được cho ≥2 lớp |
| `assets/js/math.js` + `assets/vendor/mathjax/` | Cấu hình MathJax 3.2.2 (bản đặt sẵn trong dự án, chạy không cần mạng) và tự vẽ lại công thức mỗi khi nội dung đổi | Hầu như không sửa |
| `assets/js/sound.js` | Âm thanh khi chấm (đúng/sai) lấy từ `CONFIG.sounds` (danh sách nguồn, thử lần lượt: `assets/sounds/*.mp3` rồi link ngoài); nút 🔊/🔇 bật tắt, lưu `hoctap:sound` | Khi đổi âm thanh: chỉ sửa `config.js` |
| `assets/js/play.js` | **Nhà thú cưng**: xu (đúng lần đầu +2, lần hai +1), hạt (mỗi ⭐ = 1 hạt), no/vui giảm dần theo ngày (không bao giờ chết), chuỗi ngày 🔥, 3 nhiệm vụ ngày (`QUESTS`), 14 huy hiệu (`BADGES`), cửa hàng phụ kiện vẽ SVG (`ITEMS`, lớp màu `acc-*`), bảng xếp hạng lớp (action `rank`). Lưu `hoctap:play`, đồng bộ cột 9 của TienDo | Khi thêm phụ kiện, nhiệm vụ, huy hiệu |
| `assets/js/present.js` | **Trình chiếu** (nút 📽️ ở trang bài): mỗi câu một màn hình toàn màn hình, chữ tự co giãn vừa khung (`fit`), hình trái – phương án phải, nút Gợi ý/Đáp án/Bộ mới/nền tối; phím ← → G Enter T Esc. Bảng màu riêng `--pv-*` | Khi đổi giao diện trình chiếu |
| `giao-vien/index.html` + `assets/js/lecture.js` + `giao-vien/bai-giang/<lớp>.js` | **Bài giảng trình chiếu cho GIÁO VIÊN** (hiện có: Toán 10 chương II–III) (không có liên kết cho học sinh; đăng nhập tài khoản lớp không có chữ số, vd `GV`). Mỗi bài: `{id,name,desc,slides:[…]}` với trang `kind`: `title` · `kt` (kiến thức trọng tâm, `body`, `fig`) · `method` (dạng bài, `steps`) · `vd`/`lt` (`label`, `de`, `sol:[bước…]`, `ans`, `fig`, `figAt` = hình hiện từ bước thứ mấy) · `sum`. Gọi `Lecture.add({grade, gradeName, chapter, lessons})`. Thêm lớp: tạo `giao-vien/bai-giang/lopN.js` và thêm thẻ `<script>` trong `giao-vien/index.html`. Nút **📝 Phiếu học tập** tự sinh phiếu in A4 tối giản từ chính bài giảng (mục tiêu, kiến thức trọng tâm + dòng ghi chép, dạng bài + ví dụ + dòng làm bài, ví dụ vẽ miền nghiệm có hệ trục trống, luyện tập; tuỳ chọn *Kèm lời giải*); tên trang lấy từ `CONFIG.brand` | Khi soạn bài giảng |
| `assets/js/account.js` | **Đăng nhập theo lớp** (Google Sheets qua Apps Script, bật khi `CONFIG.sheetAPI` khác rỗng) và **thú cưng tiến hoá** 5 cấp theo tổng sao của khối (`Pet`). Tiến độ lưu riêng từng học sinh (`hoctap:u:<lớp>|<tk>:…`). Đăng nhập xong chỉ hiện khối ứng với số đầu của tên lớp (`10A12` → `lop10`; `CONFIG.lockGrade`) | Khi đổi đăng nhập/thú cưng |
| `tools/apps-script/` | `Code.gs` (máy chủ trên Google Sheets: HocSinh, TongHop, KetQua, DangNhap, TienDo; menu 🐣 và hẹn giờ 30 phút cập nhật TongHop), `HUONG-DAN.md`, `mau-danh-sach-hoc-sinh.xlsx` | Khi đổi cách lưu kết quả |
| `assets/js/engine.js` | Hiển thị, chấm, sao, điều hướng hash, nạp `data/*.js` | **Hạn chế sửa**. Chỉ sửa khi thêm loại câu hỏi mới hoặc tính năng mới |
| `assets/css/style.css` | Giao diện "vở ô chấm", token màu, chế độ tối, bố cục iPad | Khi đổi giao diện |
| `tools/test.py` | Kiểm thử tự động: làm hết mọi câu và báo câu nào bị chấm sai | Chạy sau **mọi** thay đổi |
| `tools/build.py` | Gộp cả thư mục thành `dist/hoc-tap.html` (một file) | Trước khi gửi hoặc publish |

Thứ tự nạp: `config.js → core.js → figures.js → generators.js → math.js → vendor/mathjax/tex-chtml.js (async) → sound.js → account.js → play.js → present.js → engine.js`. Engine gọi `hook('picker'|'home'|'lesson'|'answer'|'done', …)` → `Account.on(...)`, và `Account.gate(start)` khi khởi động (hiện màn đăng nhập nếu cần). Sau đó engine tự nạp `data/<mã>.js` theo `CONFIG.grades`.
Dùng **script thường (không phải ES module), không build tool, không framework, không thư viện ngoài** (chỉ có Google Fonts và MathJax đặt sẵn trong `assets/vendor/`). Bản gộp `dist/hoc-tap.html` lấy MathJax từ CDN jsDelivr. Nhờ vậy mở trực tiếp file `index.html` trên máy vẫn chạy.

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
- phân số: `{frac:[3,4], mode:'exact'|'eq'|'simplest'}`;
- số thập phân: `ans:[0.6]` nhận cả “0,6” và “0.6”; kết quả làm tròn nên cho đề sẵn giá trị gần đúng (vd. `sin 40° ≈ 0,64`) và chấp nhận thêm kết quả bấm máy trực tiếp: `ans:[[7.7, 7.6]]`.

Token có thể nằm trong markup. Ví dụ `<span class="fr"><span>[_]</span><span>12</span></span>` hỏi riêng tử số.

## 4. Quy tắc nội dung (quan trọng nhất)

1. **Đáp án phải luôn đúng.** Chọn đáp án trước rồi mới dựng đề: chọn thương và số chia rồi nhân ra số bị chia; chọn số bé và hiệu rồi tính tổng; chọn trung bình trước rồi tính các số hạng.
2. Không để kết quả âm, số có chữ số 0 đứng đầu, phép chia không hết (trừ khi đề hỏi phép chia có dư), hoặc hai phương án trắc nghiệm cùng đúng.
3. Khi hỏi "chữ số X ở hàng nào", chữ số X chỉ được xuất hiện đúng một lần trong số.
4. `hint` chỉ nói **cách làm**, không lộ đáp án. `sol` trình bày ngắn gọn các bước và **in đậm đáp án** bằng `<b>…</b>`.
5. Văn phong gửi học sinh nhỏ: gọi học sinh là "con" (tiểu học) hoặc "em" (THCS, THPT), câu ngắn, ấm áp, không chê. Số viết có khoảng cách hàng nghìn bằng `fmt()`. Tiểu học: phân số bằng `F(a,b)`; lớp 6 trở lên: LaTeX theo mục 4b.
6. Mức 1, 2, 3 khác nhau thật sự: độ lớn của số, số bước tính, có bẫy hay không.
7. Bám **mục lục SGK** của bộ sách đã chọn. Nếu không chắc tên hoặc số bài, hãy nói rõ để giáo viên đối chiếu, không bịa số bài.
8. Không chép tên, logo, ảnh hoặc thương hiệu của trang web người khác, kể cả khi người dùng gửi ảnh mẫu. Chỉ học bố cục.

## 4b. Công thức toán (lớp 6 trở lên) – LaTeX + MathJax
Dùng các hàm trong `core.js`, **không** dùng `<i>x</i>`, `F(a,b)`, `x²` như lớp 4:
| Hàm | Kết quả | Ví dụ |
|---|---|---|
| `tm(s)` | công thức trong dòng `\( … \)` | ``text:`Tìm ${tm('x')} biết ${tm('2x+1=5')}` `` |
| `td(s)` | công thức riêng một dòng `\[ … \]` (đề chính, hệ phương trình) | ``text:`Giải phương trình ${td(pt)}` `` |
| `tb(s)` | đáp án in đậm, tô màu trong lời giải | ``sol:`… Vậy ${tb('x = 3')}.` `` |
| `tpoly([2,'x'],[-3,'y'],[5,''])` | `2x - 3y + 5` (bỏ hệ số 1, bỏ hạng tử 0) | |
| `tfrac(p,q)`, `tf(a,b)` | phân số rút gọn / `\dfrac{a}{b}` | |
| `tsys(['x+y=3','x-y=1'], true)` | hệ `\begin{cases}` có nhãn (1), (2) | |
| `tp(n)`, `tdec(1.25)` | `(-3)` khi nhân; `1{,}25` | |

Quy tắc:
- Viết `\lt`, `\gt`, `\le`, `\ge`, `\ne` – **không** gõ `<`, `>` trần trong công thức (trình duyệt sẽ hiểu nhầm là thẻ HTML).
- Chữ tiếng Việt trong công thức: `\text{ hoặc }`. Số âm đứng sau `;` hoặc `(` trong tập hợp/khoảng/cặp số: bọc `{-4}` để không bị giãn thành “− 4”.
- `opts` của câu trắc nghiệm: `.map(tm)`; `ans` phải là đúng chuỗi đã bọc: `ans: tm(good)`.
- **Ô trống `[_]`/`[F]` phải nằm ngoài công thức**: `` tpl:`${tm('x =')} [_]` ``.
- Kiểm tra: ngoài `test.py`, mở vài bài trong trình duyệt (qua máy chủ http) và xác nhận không còn `mjx-merror` hay chữ `\(` sót lại.

## 5. Quy trình chuẩn khi nhận việc

**Thêm lớp mới:** chép `data/_mau-lop-moi.js` → `data/<mã>.js` → khai báo `topics` và các bài → thêm mã lớp vào `CONFIG.grades` và xoá lớp đó khỏi `upcoming` → chạy test → chạy build.
**Thêm hoặc sửa bài:** chỉ sửa trong `data/<mã>.js`. Nếu dạng bài dùng được cho lớp khác thì chuyển sang `generators.js`.
**Thêm loại câu hỏi hoặc loại hình mới:** sửa `figures.js` và `engine.js` (các hàm `cardEl`, `check`, `lockCard`), đồng thời bổ sung nhánh tương ứng trong `tools/test.py`.

**Sau mọi thay đổi:**
```bash
python3 tools/test.py        # phải in "KẾT QUẢ: ĐẠT ✓"   (tham số tuỳ chọn: số vòng/bài, mặc định 10)
python3 tools/build.py       # tạo dist/hoc-tap.html
python3 tools/test_dangnhap.py  # nếu sửa account.js: thử đăng nhập + thú cưng với máy chủ giả lập
python3 tools/test_khoilop.py   # nếu sửa đăng nhập: lớp 10A12 chỉ thấy Lớp 10
python3 tools/test_trinhchieu.py # nếu sửa present.js hoặc thêm bài: chiếu mọi câu, không tràn khung (chạy ~12 phút)
python3 tools/test_baigiang.py   # nếu sửa bài giảng giáo viên: chặn học sinh, chiếu mọi trang không tràn
python3 tools/test_thucung.py   # nếu sửa play.js: xu, hạt, cho ăn, cửa hàng, nhiệm vụ, huy hiệu, xếp hạng
node tools/test_appscript.js    # nếu sửa tools/apps-script/Code.gs
python3 tools/test_congthuc.py  # nếu sửa nội dung lớp 6+ (LaTeX): không còn công thức lỗi
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
