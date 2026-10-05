# Hướng dẫn cho AI – dự án "Học mà chơi"

> File này dành cho AI (Claude, ChatGPT/Codex, Gemini…). Hãy đọc hết trước khi sửa bất cứ thứ gì trong thư mục.
> `AGENTS.md` (ChatGPT/Codex đọc) và `CLAUDE.md` (Claude đọc) có **nội dung giống hệt nhau** – sửa tệp này thì sửa luôn tệp kia.
> Người dùng là giáo viên (thầy Vũ Tiến Lực). Trả lời bằng tiếng Việt và gọi người dùng là "thầy".

## 0. DÀNH CHO CHATGPT / CODEX / MỌI AI – ĐỌC TRƯỚC KHI SỬA

**Quy trình bắt buộc cho mỗi yêu cầu:**
1. Đọc hết tệp này. Mở tệp mẫu gần nhất rồi làm **y hệt khuôn đó**:
   - bài học sinh: `data/lop9.js` (chương V);
   - bài giảng: `giao-vien/bai-giang/lop8.js` (chương III);
   - phiếu luyện tập: `giao-vien/bai-giang/lop8-luyen-tap.js`;
   - đề kiểm tra (4 mã đề, đáp án riêng): `giao-vien/bai-giang/lop11-kiem-tra.js`;
   - giải bài tập SGK (câu vận dụng): `giao-vien/bai-giang/lop10-giai-sgk.js`.
2. Chỉ sửa đúng tệp cần sửa. **Không** đổi `CONFIG.sheetAPI`, **không** đổi cấu trúc `engine.js`, **không** thêm framework / npm / ES module / thư viện ngoài.
3. Sửa xong, chạy **`node tools/kiem-tra.js`** (không cần trình duyệt, khoảng 2 giây) và đọc kết quả:
   - Chưa ĐẠT thì đọc từng dòng ✗, sửa rồi chạy lại cho tới khi in `KẾT QUẢ: ĐẠT ✓`.
   - Chạy riêng một lớp, nhiều lần sinh câu hơn: `node tools/kiem-tra.js 80 lop8`.
4. Máy có Python + Playwright thì chạy thêm `python3 tools/test.py` (chấm thật trong trình duyệt) và các test ở mục 5.
5. Chạy `python3 tools/build.py` để tạo `dist/hoc-tap.html`.
6. Báo cáo cho thầy bằng tiếng Việt, gọi là "thầy", ngắn gọn theo mục 8.

**Quy tắc làm ĐẦY ĐỦ (bắt buộc – thầy cần sản phẩm dùng được ngay, không phải bản nháp):**
- Làm **trọn** yêu cầu trong một lần; không dừng giữa chừng để hỏi "có muốn làm tiếp không". Chỉ hỏi khi yêu cầu thật sự mơ hồ (vd không rõ chương, lớp).
- Đủ số lượng như tệp mẫu:
  - phần học sinh: **mỗi bài 4 dạng**, mỗi dạng **3 mức khác nhau thật sự** (mức 3 không chỉ là số to hơn), bài hình học có hình vẽ, cuối chương có bài **Ôn tập chương**;
  - bài giảng: mỗi bài có `title`, `kt` (kèm hình khi là hình học), `method` cho từng dạng, **≥ 1 ví dụ `vd` mỗi dạng**, `lt`, `sum`;
  - phiếu luyện tập: **10 bài** = 7 cơ bản + 3 `hard:true`, xếp theo dạng.
- Lời giải cho học sinh trung bình: **chia từng bước, mỗi bước ghi rõ căn cứ** (quy tắc, định lí, tính chất); không gộp nhiều phép biến đổi vào một bước; đáp số in đậm bằng `tb(...)`.
- **Tuyệt đối không** viết `...`, `// phần còn lại giữ nguyên`, `// tương tự`, `TODO`, `FIXME` trong mã; luôn đưa lại **toàn bộ** tệp đã sửa. (`tools/kiem-tra.js` sẽ báo lỗi nếu gặp các chuỗi này.)
- Việc quá dài: chia Phần 1, Phần 2… và tự làm tiếp đến hết; cuối cùng ghi **"ĐÃ XONG TOÀN BỘ"** kèm danh sách bài/dạng đã làm.
- Trước khi kết thúc: tự rà theo bảng lỗi dưới đây, tự giải lại từng ví dụ/bài để chắc đáp số đúng, chạy `node tools/kiem-tra.js` tới khi ĐẠT, rồi báo cáo đã kiểm những gì.

**Lỗi thường gặp (công cụ `tools/kiem-tra.js` bắt được hầu hết):**

| Lỗi | Cách đúng |
|---|---|
| Gõ `<`, `>` trong công thức | Dùng `\lt`, `\gt`, `\le`, `\ge` (trong chuỗi JS viết `\\lt`) |
| Ô trống `[_]` nằm trong `tm(...)` | `` `${tm('x =')} [_]` `` |
| Số ô `[_]`/`[F]` khác số phần tử `ans` | Đếm lại; ô `[F]` cần `{frac:[tử, mẫu], mode}` |
| `ans` của `QC` không có trong `opts`; phương án trùng nhau | Tạo `good` trước, thêm nhiễu, kiểm tra không trùng |
| Hai file/chương khai báo trùng `const` (vd `g5a`, `m`, `box`) | Bọc chương mới trong khối `{ … }` (dữ liệu học sinh) hoặc `(() => { … })();` (bài giảng) |
| Thêm tệp bài giảng mà quên thẻ `<script>` | Thêm vào `giao-vien/index.html`, đúng thứ tự: `lopN.js` rồi `lopN-luyen-tap.js` |
| Phiếu luyện tập sai tỉ lệ | 10 bài = 7 cơ bản + 3 `hard:true` |
| Đáp án sai do dựng đề trước | Luôn **chọn đáp án trước** rồi mới dựng đề (mục 4) |
| Chuỗi JS có `\` đơn (`\frac`) | Trong chuỗi JS phải viết `\\frac`, `\\widehat` |
| Tên điểm phụ trùng tên đỉnh (vd `H` khi hình tên `EFGH`) | Dùng tên chắc chắn không trùng: `K`, `I`, `O` |
| Chuỗi có `${…}` viết trong nháy đơn `'…'` (hiện nguyên chữ `${m(…)}`) | Chuỗi có `${…}` phải dùng dấu backtick `` `…` `` |
| Hằng như `'\;\\Rightarrow\;'` thiếu `\` (hiện dấu `;` thừa) | Mọi dấu `\` trong chuỗi JS đều gấp đôi: `'\\;\\Rightarrow\\;'` |

**Khuôn mẫu nhanh:**
```js
// data/lop8.js – thêm một CHƯƠNG mới cho học sinh (đặt TRƯỚC dòng cuối "})();")
{
const m = tm;
const g15a = lv => {                        // một dạng bài: lv = 1, 2, 3 (khó dần)
  const a = R(2, 9), b = R(2, 9), kq = a * b;  // chọn đáp án trước
  return QB({ text:`Tính ${m(`${a}\\cdot ${b}`)}.`, tpl:`${m('=')} [_]`, ans:[kq],
    hint:'Nhân hai số.', sol:`${m(`${a}\\cdot ${b} =`)} ${tb(kq)}.` });
};
G.topics.push({id:4, hk:1, name:'Tên chương'});
lesson(4, 'ma-bai-khong-dau', 'Bài 15. Tên bài', 'Mô tả một dòng.', [g15a /*, g15b, g15c */]);
}
```
```js
// giao-vien/bai-giang/lop8.js – thêm bài giảng (một khối (() => { … })(); riêng)
Lecture.add({ grade:'lop8', gradeName:'Toán 8', chapter:'Chương IV. …', lessons:[
  { id:'bai-15', name:'Bài 15. …', desc:'…', slides:[
    {kind:'title', tag:'…', title:'…', sub:'Mục tiêu bài học', points:['…']},
    {kind:'kt', tag:'Kiến thức trọng tâm 1', title:'…', body:'…', fig: geoSVG({...})},
    {kind:'method', tag:'Dạng 1', title:'…', steps:['…','…']},
    {kind:'vd', tag:'Ví dụ 1 · Dạng 1', label:'Ví dụ 1', de:'…', sol:['bước 1','bước 2'], ans:'…'},
    {kind:'lt', tag:'Luyện tập', label:'Bài 1', de:'…', sol:['…']},
    {kind:'sum', tag:'Tổng kết', title:'Ghi nhớ', body:'…'} ]} ]});
// giao-vien/bai-giang/lop8-luyen-tap.js – phiếu luyện tập 10 bài (7 cơ bản + 3 vận dụng)
Lecture.addPractice('lop8', 'bai-15', [ {dang:'Tên dạng', items:[ {de:'…', sol:['…'], ans:'…'}, {hard:true, de:'…', sol:['…']} ]} ]);
```

## 0b. LỆNH "TRỌN BỘ" – khi thầy chỉ nói tên bài
Thầy nói **"Làm trọn bộ <Toán N> <Bài X. Tên bài>"** (hoặc "đầy đủ các bộ", "đủ bộ", "làm bài <tên bài> như Bài 5 Dãy số") thì làm **một lần, đủ 6 phần**, không hỏi lại, rồi báo cáo ngắn:
1. **Học sinh luyện tập** – `data/lopN.js`: mỗi bài ≥ 4 dạng × 3 mức (khuôn mục 3–4).
2. **Bài giảng trình chiếu** – `giao-vien/bai-giang/lopN.js`: title, kt, method, ≥ 1 ví dụ mỗi dạng, luyện tập, sum.
3. **Phiếu luyện tập** – `lopN-luyen-tap.js`: 10 bài = 7 cơ bản + 3 vận dụng ★.
4. **Giải SGK (câu vận dụng, câu khó)** – `lopN-giai-sgk.js`: tra đúng số trang/số bài SGK, không bịa; không chắc thì ghi rõ để thầy đối chiếu.
5. **Phiếu học tập trên lớp (khởi động – củng cố, theo skill giao-vien-toan-khoi-dong-cung-co)** – `lopN-khoi-dong.js`: Phần A in đúng 2 trang A4, phương án A–D 1–2 dòng; bám các ví dụ của bài giảng.
6. **Phiếu học tập in A4 tự sinh** – không cần viết thêm (nút 📝 Phiếu lấy từ bài giảng).
Không làm thêm **đề kiểm tra** (chỉ làm khi thầy nói "đề kiểm tra chương …"). Sau cùng chạy: `node tools/kiem-tra.js`, `python3 tools/test.py`, `python3 tools/test_phieu_tren_lop.py`, `python3 tools/build.py`; thêm thẻ `<script>` vào `giao-vien/index.html` nếu có tệp mới; cập nhật bảng ở mục 2 nếu thêm loại tệp. Thầy muốn bớt phần nào thì nói "trọn bộ, bỏ giải SGK" (hoặc phần khác).

## 1. Dự án là gì

Web tĩnh cho **học sinh tiểu học/THCS tự luyện tập củng cố theo từng bài SGK**, chạy tốt nhất trên **iPad**.
- Học sinh chọn lớp → chọn bài → chọn mức (1 Làm quen · 2 Luyện tập · 3 Thử thách) → làm một bộ 6 câu xếp từ dễ đến khó.
- Câu hỏi **sinh ngẫu nhiên bằng code**, không lưu sẵn. Mỗi lần bấm "Làm bộ mới" sẽ ra câu khác.
- Chấm: sai lần 1 → hiện gợi ý; sai lần 2 → hiện lời giải và khoá câu. Đúng lần đầu được 1 điểm, đúng lần hai được ½ điểm. Hết bộ thì cho 1–3 sao, lưu trong localStorage.
- Menu lớp 4: mọi bài 🧠 Toán tư duy (Singapore Math) đều ở HỌC KÌ 1, khai báo hk:1 + grp:'🧠 Toán tư duy · Singapore Math' → engine gom thành một khối riêng sau các bài SGK.
- **Phiếu PDF ô li cho 🧠 Toán tư duy (lớp 4):** `assets/js/tuduy-pdf.js` – mọi bài có `intro` (kiến thức trọng tâm) tự có 3 nút trên trang bài: 📄 Phiếu PDF (ô li) · 📄 Kèm đáp án · 🌐 Song ngữ. Phiếu = kiến thức trọng tâm + 9 câu (3 mức × 3, sinh ngẫu nhiên mỗi lần) + khung ô li 5 mm; dựng trong iframe riêng rồi in (Lưu thành PDF), học sinh ≤ 5 trang. Bài tư duy mới chỉ cần có `intro` là tự có phiếu. Kiểm thử: `python3 tools/test_tuduy_pdf.py`.
- Hiện có: **Toán 4 – Kết nối tri thức (29 bài + 6 bài ✍️ Giải toán 3 bước (mỗi chủ đề 1–6 học kì 1 một bài: Hiểu đề → Lập kế hoạch → Giải, mã `gt3-*`, bộ dựng `h3` trong `data/lop4.js`) + 2 bài 🧠 Giải toán từng bước + 🧠 Toán tư duy song ngữ: 6 bài Phép cộng và phép trừ, 1 bài Phép nhân và phép chia – Giả thiết tạm, đề khuôn theo Singapore Math Challenge Word Problems)**, **Toán 8 (chương II–III, 11 bài)**, **Toán 9 (chương I–V, 22 bài)**, **Toán 10 (chương I–III, 9 bài)**, **Toán 11 (chương I–II, 11 bài – Bài 5 có thêm 2 bài Luyện tập thêm)** – Kết nối tri thức. Lớp 9–11 xưng "em"; lớp 11 tính góc theo đơn vị U = 1/12 độ (π = 2160) trong `data/lop11.js`. **Từ lớp 6 trở lên mọi công thức viết bằng LaTeX, MathJax vẽ** (xem mục 4b). Mục tiêu là thêm dần các lớp và môn khác.

## 2. Cấu trúc và vai trò từng file

| File | Vai trò | Khi nào sửa |
|---|---|---|
| `config.js` | Tên web, người soạn, `setSize`, danh sách `grades` (lớp đang có), `upcoming` (lớp hiện chữ "Sắp có") | Khi thêm lớp |
| `data/<mã-lớp>.js` | **Toàn bộ nội dung một lớp**: chủ đề, bài, các dạng bài | Hầu hết mọi việc về nội dung |
| `data/_mau-lop-moi.js` | File mẫu có chú thích, chứa ví dụ Lớp 3 chạy được | Chép ra khi tạo lớp mới |
| `assets/js/core.js` | Tiện ích (`R`, `pick`, `fmt`, `F`, `gcd`, `lcm`, `roman`…), bộ dựng câu `QB`/`QC`/`QCmp`, sổ đăng ký `App.addGrade` | Khi cần thêm hàm tiện ích |
| `assets/js/figures.js` | Hàm vẽ SVG: `protractorSVG`, `angleSVG`, `fracSVG`, `barSVG`, `rectSVG`, `shapeSVG`, `rtTriSVG` (tam giác vuông có nhãn cạnh, cung góc), `triSVG` (tam giác bất kì theo 3 cạnh, nhãn cạnh/góc), `halfCircleSVG` (nửa đường tròn đơn vị), `planeSVG` (mặt phẳng Oxy: đường thẳng, gạch bỏ phần không là miền nghiệm theo quy ước KNTT, chấm điểm), `segSVG` (sơ đồ đoạn thẳng cho toán lời văn tiểu học: các hàng, phần tô đậm/nét đứt, ngoặc gộp), `geoSVG` (hình phẳng có kí hiệu cho Toán 8 tứ giác: vạch cạnh bằng nhau `T`, mũi tên song song `Pa`, cung góc `A`, góc vuông `R`, nhãn cạnh `L`; toạ độ thực, nhãn đỉnh tự đặt ra ngoài), `circleSVG` (đường tròn: tâm, điểm, đoạn/đường thẳng, dây, tiếp tuyến, hình quạt, vành khuyên, cung tô đậm, kí hiệu góc – toạ độ thực, y hướng lên) | Khi cần loại hình mới |
| `assets/js/generators.js` | Dạng bài **dùng chung cho nhiều lớp**: `gPlace`, `gValue`, `gCompose`, `gCmp`, `gRound`, `gAddSub`, `gFindX`, `gConv` (+ `MASS`, `AREA`), `gReadProt`, `gRotate`, `gAngType`, `gAngDeg`, `gAngWhich` | Khi một dạng bài dùng được cho ≥2 lớp |
| `assets/js/math.js` + `assets/vendor/mathjax/` | Cấu hình MathJax 3.2.2 (bản đặt sẵn trong dự án, chạy không cần mạng) và tự vẽ lại công thức mỗi khi nội dung đổi | Hầu như không sửa |
| `assets/js/sound.js` | Âm thanh khi chấm (đúng/sai) lấy từ `CONFIG.sounds` (danh sách nguồn, thử lần lượt: `assets/sounds/*.mp3` rồi link ngoài); nút 🔊/🔇 bật tắt, lưu `hoctap:sound` | Khi đổi âm thanh: chỉ sửa `config.js` |
| `assets/js/play.js` | **Nhà thú cưng**: xu (đúng lần đầu +2, lần hai +1), hạt (mỗi ⭐ = 1 hạt), no/vui giảm dần theo ngày (không bao giờ chết), chuỗi ngày 🔥, 3 nhiệm vụ ngày (`QUESTS`), 14 huy hiệu (`BADGES`), cửa hàng phụ kiện vẽ SVG (`ITEMS`, lớp màu `acc-*`), bảng xếp hạng lớp (action `rank`). Lưu `hoctap:play`, đồng bộ cột 9 của TienDo; có thêm `rev` (lịch ôn bài cũ) và `bonusDay` (đã nhận thưởng 3 nhiệm vụ hôm nay) | Khi thêm phụ kiện, nhiệm vụ, huy hiệu |
| `assets/js/present.js` | **Trình chiếu** (nút 📽️ ở trang bài): mỗi câu một màn hình toàn màn hình, chữ tự co giãn vừa khung (`fit`), hình trái – phương án phải, nút Gợi ý/Đáp án/Bộ mới/nền tối; phím ← → G Enter T Esc. Bảng màu riêng `--pv-*` | Khi đổi giao diện trình chiếu |
| `giao-vien/index.html` + `assets/js/lecture.js` + `giao-vien/bai-giang/<lớp>.js` | **Bài giảng trình chiếu cho GIÁO VIÊN** (hiện có: Toán 8 chương II–III, Toán 9 chương II và V, Toán 10 chương II–III, Toán 11 chương I (ôn tập chương) và II; trang chủ chọn lớp → `#/lopN` hiện danh sách bài gọn của lớp đó) (không có liên kết cho học sinh; đăng nhập tài khoản lớp không có chữ số, vd `GV`). Mỗi bài: `{id,name,desc,slides:[…]}` với trang `kind`: `title` · `kt` (kiến thức trọng tâm, `body`, `fig`) · `method` (dạng bài, `steps`) · `vd`/`lt` (`label`, `de`, `sol:[bước…]`, `ans`, `fig`, `figAt` = hình hiện từ bước thứ mấy) · `sum`. Gọi `Lecture.add({grade, gradeName, chapter, lessons})`. Thêm lớp: tạo `giao-vien/bai-giang/lopN.js` và thêm thẻ `<script>` trong `giao-vien/index.html`. Nút **📝 Phiếu học tập** tự sinh phiếu in A4 tối giản từ chính bài giảng (mục tiêu, kiến thức trọng tâm + dòng ghi chép, dạng bài + ví dụ + dòng làm bài, ví dụ vẽ miền nghiệm có hệ trục trống, luyện tập; tuỳ chọn *Kèm lời giải*); tên trang lấy từ `CONFIG.brand`. Nút **🏋️ Luyện tập** (khi bài có phiếu luyện tập): `Lecture.addPractice(lớp, mãBài, [{dang, items:[{de, sol, ans, fig, draw:{x,y}, hard}]}])` trong `giao-vien/bai-giang/<lớp>-luyen-tap.js` (nạp sau file bài giảng). Không lý thuyết; Phần I cơ bản rồi Phần II vận dụng ★ (`hard:true`), trong mỗi phần xếp theo dạng; **tỉ lệ 70% cơ bản – 30% vận dụng** (10 bài: 7 + 3); `draw` = học sinh vẽ trên hệ trục trống, `fig` hiện ở bản lời giải; in A4, *Kèm lời giải*, ▶ Chiếu từng bài. Hiện có: Toán 8 chương III, Toán 9 chương II và V, Toán 10 chương II và chương III (Bài 5–6, Ôn tập chương III), Toán 11 ôn tập chương I và Bài 5–7 | Khi soạn bài giảng |
| `tools/phieu_chuong_pdf.py` + `Lecture.chapterSheet` (lecture.js) | **📘 Phiếu cả chương (học sinh)** – nút ở đầu mỗi chương trên trang bài giảng: gom kiến thức trọng tâm, dạng bài, ví dụ (kèm lời giải gọn) và bài luyện tập của MỌI bài trong chương thành một phiếu in tiết kiệm giấy (2 cột, 9,5pt, không dòng chấm, các bài chảy liền, đáp số gom ở cuối, `@page cs`). Tuỳ chọn trên trang: kiến thức, dòng kẻ làm bài (mặc định bật: 3 dòng mỗi bài luyện tập, câu ★ 5 dòng; `o.ln`), ví dụ (lời giải/chỉ đáp số/ẩn), luyện tập, đáp số cuối, cột, cỡ chữ; công thức rộng tự thu (`fit`). Bài chưa có phiếu luyện tập thì lấy các trang `lt` của bài giảng. Xuất PDF không cần mở web: `python3 tools/phieu_chuong_pdf.py lop11 "Chương II" /tmp [--ex=sol|ans|hide] [--cols=2] [--fs=9.5] [--key] [--no-pr] [--no-kt]` (Toán 11 chương II: có dòng kẻ làm bài 3 dòng, câu ★ 5 dòng = 6 trang; tắt dòng kẻ `--no-ln` = 5 trang). Kiểm thử: `python3 tools/test_phieu_chuong.py` | Khi sửa bài giảng/phiếu chương |
| `giao-vien/bai-giang/<lớp>-giai-sgk.js` | **Giải bài tập SGK (câu vận dụng, câu khó)** – nút **📘 Giải SGK** trên dòng bài giảng: mở trang xem/in, ▶ Chiếu. `Lecture.addSgk(lớp, mãBài, [trang chiếu…], tênBộ?)` (tên bộ tuỳ chọn, dùng khi gộp nhiều bài vào một bộ) cùng kiểu trang như bài giảng (`title` liệt kê các câu đã chọn, `kt` nhắc nhanh kĩ năng, mỗi câu một trang `vd` có `tag:'SGK tr. 25 · Bài 2.3'`, lời giải ngắn gọn, có thể thêm ý *Mở rộng*, `sum` lỗi hay gặp). Nạp SAU tệp bài giảng. Đề ghi tóm tắt kèm số trang/số bài để đối chiếu SGK – **tra đúng số bài, không bịa**. `planeSVG` có `unit` (1 ô = unit đơn vị) cho số liệu lớn. Hiện có: Toán 10 Bài 3, Bài 4, Ôn tập chương II, Bài 5 (tr. 37, Bài 3.1–3.4; `lop10-giai-sgk.js` – tệp mẫu) và Bài 6 (Luyện tập 4 tr. 41; Bài 3.5–3.10 tr. 42–43) và Ôn tập chương III (Bài 3.12–3.17 tr. 44); Toán 11 Bài 4 + cuối chương I gộp một bộ, gắn vào “Ôn tập chương I” (`lop11-giai-sgk.js`); Toán 11 Bài 5–7 (Bài 7: Vận dụng 1–5, đề ghi tóm tắt, thầy đối chiếu số bài/số trang) | Khi thêm phần giải SGK |
| `giao-vien/bai-giang/<lớp>-khoi-dong.js` | **Phiếu học tập trên lớp (khởi động – củng cố, theo skill giao-vien-toan-khoi-dong-cung-co)** – nút **📋 Phiếu trên lớp** trên dòng bài giảng: xem dạng trang, chọn Phần A (phiếu học sinh) / Phần B (gợi ý giáo viên), **🖨️ In / Lưu PDF**, **⬇️ Tải Markdown** (tệp `KD-CC - Lớp NN - Tên bài.md`). `Lecture.addSheet(lớp, mãBài, String.raw`…markdown…`)`: Phần A và B ngăn bằng `<div style="page-break-after: always;"></div>`, công thức trong `$…$`, ví dụ tự soạn ghi **[Minh họa]**, bám các ví dụ của bài giảng. Bộ hiển thị `Lecture.mdToHtml` hỗ trợ tiêu đề, danh sách lồng, bảng, trích dẫn, in đậm/nghiêng. **QUY TẮC BẮT BUỘC cho mọi phiếu trên lớp sau này (thầy yêu cầu):** (1) **Phần A (phiếu học sinh) in ĐÚNG 2 TRANG A4** (1 tờ hai mặt, tiết kiệm giấy) – trang xem tự co cỡ chữ (≤ 12pt, ≥ 8,5pt) qua `kdFit`; mỗi mục `## …` không bị ngắt giữa chừng; viết gọn, chỗ trống ghi đáp số ngay cuối dòng đề (`Đáp số: ………`), chỉ thêm 1–2 dòng chấm cho câu cần trình bày; (2) **phương án trắc nghiệm A–D (và ý đúng–sai a)–d)) viết mỗi phương án một dòng trong tệp .md, nhưng khi xem/in tự gộp thành 1 dòng (4 cột) hoặc 2 dòng (2 cột)**, không để mỗi phương án một dòng riêng; (3) chạy `python3 tools/test_phieu_tren_lop.py` – phải ĐẠT (kiểm Phần A đúng 2 trang bằng PDF thật, phương án 1–2 dòng, công thức, tải .md). Hiện có: Toán 11 Bài 5. Dãy số (`lop11-khoi-dong.js` – tệp mẫu); Toán 11 Bài 6. Cấp số cộng và Bài 7. Cấp số nhân; Toán 10 Bài 5. Giá trị lượng giác, Bài 6. Hệ thức lượng trong tam giác, Ôn tập chương II và Ôn tập chương III (`lop10-khoi-dong.js`). Nạp SAU tệp bài giảng | Khi thêm phiếu trên lớp |
| `assets/js/kiemtra.js` + `giao-vien/bai-giang/<lớp>-kiem-tra.js` | **Đề kiểm tra in A4 cho giáo viên** (mục “Kiểm tra” cuối trang lớp; link `#/lop11/kiem-tra/c1/de`, `…/de-112`, `…/da`). `KiemTra.add({grade, id, title, chapter, subject, book, time, codes:['111',…], school, group, year, bai:[tên bài…], mc:[{bai, q, opts:[ĐÚNG, sai, sai, sai]} hoặc ci => {…}], tf:[{bai, stem, items:[[câu ĐÚNG, câu SAI]×4]}], essay:[{bai, pts, make: ci => ({de, rows:[[nội dung chấm, điểm]…]})}]})`. Trộn mã đề có **hạt giống cố định** (in lại ra đúng đề cũ): đảo câu + phương án, đáp án rải đều A/B/C/D; Đ/S mỗi mã chọn bản đúng/sai (mỗi câu có cả Đ và S, cả phần gần 50/50); tự luận mỗi mã một bộ số. Tổng phải = 10 điểm (Phần I 0,25/câu, Phần II 1/câu). Đáp án – hướng dẫn chấm tự sinh kèm ma trận. In: font Times, trang `@page kt` lề hẹp, mỗi mã 2 trang (in 2 mặt = 1 tờ). Tuỳ chọn: `mcPt` (điểm mỗi câu Phần I, mặc định 0,25; đề 10 câu dùng 0,5) và `short:true` (Phần III là **trả lời ngắn**: “Câu n”, ô `Đáp số: ………`, mỗi câu 1 điểm) và `levels:[mức I, II, III]` (ghi vào ma trận). Hiện có: Toán 10 chương II – 10 TN × 0,5 + 3 Đ/S + 2 TLN, mã 101–104 và **Bộ 2 mã 201–204 (`like:'c2'`: cùng câu, cùng thứ tự câu, cùng ý Đ/S và Phần III với bộ 1, chỉ đổi vị trí phương án; đáp án mỗi câu đổi chữ)** (`lop10-kiem-tra.js`, câu Phần I/III có số liệu riêng từng mã, đáp án đúng suy ra bằng phép tính); Toán 11 chương I – Đề số 1 (mã 111–114) và Đề số 2 (mã 211–214), cùng tệp `lop11-kiem-tra.js` (tệp mẫu; đề thứ hai trong khối `(() => {…})();` riêng, có `set:'Đề số 2'` in lên tiêu đề) | Khi thêm/sửa đề kiểm tra |
| `assets/js/student-test.js` + `data/<lớp>-kiem-tra.js` | **Bài kiểm tra tương tác cho HỌC SINH (lấy sao, có đồng hồ)** – ô “Kiểm tra” dưới chủ đề; link `#/lop10/kiem-tra/<id>`. `StudentTest.add({grade, id, topic, title, time (phút), codes:[4 mã khác nhau], mc:[ci=>({level,q,opts:[ĐÚNG,sai,sai,sai],sol})], tf:[ci=>({stem,items:[{text,ok,sol}×4]})], short:[ci=>({q,ans,sol})]})`; vị trí đáp án xoay theo `(i+ci)%4`, Đ/S chấm thang 0–.1–.25–.5–1, sao theo điểm 8,5/7/5, khóa sao `hoctap:<lớp>:kiem-tra-<id>:1`. **Bài đủ (mặc định)**: 12 TN × 0,25 + 3 Đ/S × 1 + 6 TLN × 0,5 (điểm thô 9, quy về 10). **Bài rút gọn**: khai `counts:{mc,tf,short}` và `mcPt/tfPt/shortPt` sao cho tổng điểm thô = 10 (kiem-tra.js kiểm tra). Toán 11: **5 bài `tong-hop-1…5` chủ đề 1 (Chương I, 20 phút, cùng cấu trúc 8+2+4, `data/lop11-kiem-tra.js`, mã đề TH1A…)**. Toán 10: `c2` (60 phút) và **5 bài `tong-hop-1…5` (20 phút, 8 TN × 0,5 + 2 Đ/S × 1 + 4 TLN × 1 = 10 điểm, trộn Chương I + II)** – câu sinh bằng hạt giống cố định (`R`, `L`), đáp án tính bằng vét cạn, phương án nhiễu là lỗi dễ nhầm (ngoặc tròn/vuông, đổi lượng từ nhưng quên đổi dấu, đảo/phản đảo, điều kiện cần ≠ đủ, nét đứt/liền, điểm thử trên đường biên…). Thêm bài mới = thêm một `StudentTest.add`, không sửa engine. **Chiếu trên lớp (giáo viên):** `assets/js/test-deck.js` (`TestDeck.deck(t, ci)`, nạp ở `giao-vien/index.html` cùng `student-test.js` và `data/lop10-kiem-tra.js`) biến mỗi (bài kiểm tra, mã đề) thành một bộ trang chiếu dùng bộ máy `Lecture.open`: trang tiêu đề → từng câu (đề + phương án A–D / 4 ý Đ–S) → bấm tiếp hiện lời giải từng bước rồi đáp án; mục “Bài kiểm tra của học sinh – chiếu trên lớp” ở cuối trang lớp, mỗi mã đề một nút ▶ (chỉ tài khoản giáo viên). Bài kiểm tra mới tự có nút chiếu, không cần viết thêm. **Trang HỌC SINH (`index.html`) cũng nạp `lecture.js` + `test-deck.js`: ngay dưới thanh đầu mỗi bài kiểm tra có hàng “📽️ Trình chiếu trên lớp” với nút ▶ từng mã đề – chỉ hiện khi `Account.isTeacher()` (tài khoản lớp không có chữ số, vd GV); học sinh không thấy (`teacherBar` trong student-test.js).** Kiểm thử: `python3 tools/test_chieu_hocsinh.py`. Kiểm thử: `node tools/kiem-tra.js` + `python3 tools/test.py` (làm đúng hết phải được 10 điểm, đủ 4 mã) | Khi thêm/sửa bài kiểm tra học sinh |
| `assets/js/classpanel.js` | **Khung “🧑‍🏫 Lớp học”** khi trình chiếu (cả `present.js` và bài giảng `lecture.js`): mở `CONFIG.classApp` (ứng dụng quản lý lớp) trong iframe bên phải, mặc định 1/3 màn hình; kéo thanh dọc để đổi độ rộng (nhớ ở `hoctap:classpanel:w`, tối thiểu 280px, tối đa 75%); bản chiếu `.pv` co lại (`right`) và `fit()` tính theo bề rộng khung; nút ✕ Ẩn / phím L chỉ ẩn – iframe vẫn chạy nên mở lại còn nguyên nội dung. Vì khung nằm ngoài `.pv`, trình chiếu bật toàn màn hình cho `document.documentElement`. `CONFIG.classApp = ''` thì ẩn nút | Khi đổi khung Lớp học |
| `assets/js/hub.js` + `assets/js/stickers.js` | **🌟 Góc chung – menu riêng cho HỌC SINH và GIÁO VIÊN cùng xem** (đường link `#/goc-chung[/<tab>]`; nút “🌟 Góc chung” nằm trên thanh người dùng `Account.userBar()` của cả hai trang). Học sinh thấy lớp của mình (`Account.rank`); giáo viên chọn khối → lớp (`Account.rankAll`). Mỗi mục là một TAB đăng ký bằng `Hub.register({id, icon, label, render(box, ctx)})` – hiện có 8 tab, sắp bằng `order` (nhỏ = đứng trước): **🏆 Xếp hạng lớp** (sắp theo ⭐ / 📈 Tuần này / 🔥 / 🏅 / 🎟️ / 🪙), **🎯 Hôm nay & Thử thách**, **❓ Câu hỏi của thầy**, **🔥 Bài hot tuần**, **🗺️ Lộ trình**, **🔁 Ôn bài cũ**, **🏁 Đua lớp** (6 tab này nằm trong `assets/js/hub-plus.js`, nạp sau hub.js ở cả hai trang) và **🎟️ Sticker của lớp** (bộ sưu tập cả lớp, bạn sưu tập nhiều nhất, sticker từng em). **Tính năng mới sau này = thêm một `Hub.register(...)`, không sửa khung.**
  **Chi tiết 6 tab của `hub-plus.js`** (gọi máy chủ qua `Account.call(action, body)`, nhớ 45 giây): (1) *Hôm nay & Thử thách*: 3 nhiệm vụ ngày của em (`Play.QUESTS`), số bạn trong lớp xong nhiệm vụ hôm nay (`qd`), **Thử thách tuần** (mục tiêu = `CONFIG.weeklyPerStudent` ⭐ × số bạn đã tham gia, mốc 25/50/75/100%, `CONFIG.weeklyReward` = phần thưởng thầy hứa), **Vua tiến bộ** (xếp theo `wk` = ⭐ tăng trong tuần, tuần tính từ thứ Hai). Xong cả 3 nhiệm vụ ngày: `Play.claimDay` gọi action `bonus` → +1 ⭐ (khóa tiến độ `gv:day:<ngày>`, mỗi ngày 1 lần, máy chủ tự kiểm tra từ Góc thú cưng gửi kèm) và +20 🪙. (2) *Câu hỏi của thầy*: nút **🎲 Bốc câu** lấy nhanh từ ngân hàng bài tập (`drawFromBank`: chọn bài + mức, bốc ngẫu nhiên một câu trắc nghiệm không hình từ `data/<khối>.js`, tự điền câu hỏi/4 phương án/đáp án/giải thích; công thức `\(…\)` đổi thành `$…$`; trang giáo viên tự nạp `data/<khối>.js`); giáo viên đăng (`qPost`: câu hỏi có `$…$`, 2–4 phương án, đáp án, giải thích, thưởng 1–3 ⭐, dành cho khối/lớp/mọi lớp, hạn 1–7 ngày; `qClose` đóng); học sinh chọn đáp án một lần (`qAnswer`), đúng thì máy chủ cộng ⭐ (khóa `gv:q:<id>`); thống kê đúng/sai cho giáo viên. Dữ liệu ở trang tính `CauHoi`, `TraLoi` (thầy cũng gõ thẳng vào `CauHoi` được). (3) *Bài hot tuần*: action `hot` đọc `KetQua` 7 ngày qua của lớp: “Cần ôn lại” (điểm TB thấp nhất, bài có ≥ 2 bộ) và “Được làm nhiều nhất”; khóa bài = tên khối + tên bài. (4) *Lộ trình*: các bài của khối theo chủ đề, sao 3 mức của em (`hoctap:<khối>:<bài>:<mức>`), “x/y bạn đã làm” (action `hot`, trường `all`), gợi ý bài nên làm tiếp; chỉ có trên trang học sinh (trang giáo viên trỏ sang). (5) *Ôn bài cũ*: `Play.state.rev` – bộ chưa trọn điểm hẹn ôn sau 1 → 3 → 7 ngày, ôn đúng hạn trọn điểm +15 🪙, xong mốc 7 ngày là nhớ chắc (`reviewDone` trong play.js). (6) *Đua lớp*: action `race` – mọi lớp cùng khối, xếp theo ⭐ mới trung bình mỗi bạn (theo sĩ số) trong tuần. **Máy chủ:** cột 10 của TienDo (“Tuần (tự động)”) giữ mốc sao đầu tuần; `pub_` trả thêm `wk`, `qd`. `ctx` gồm `{role, lop, cls, rows, all, hasSticker, esc, STICKERS, RARITY, uniq(r), total(r), redraw()}`; mỗi dòng `rows`: `{name, stars, streak, best, badges, xu, stickers:{id:số lần}, me?, joined?}`. **Hạng kim loại** (biến đổi theo số lần mở cùng một sticker, suy ra từ số lần – không lưu thêm dữ liệu): ×2 🥈 Bạc · ×3 🥇 Vàng · ×5 💠 Bạch kim · ×8 💎 Kim cương, `StickerDB.TIERS/tierOf/nextTier`; thẻ có viền kim loại, vệt sáng quét, nhãn hạng (`.sticker.t-silver|gold|plat|diamond`, `.tchip`, `.tier-chip`, token `--mt-*` ở cuối style.css); hộp thưởng và Góc chung dùng cùng lớp `t-*`; từ khi có ≥ 3 loại, 35% lượt thưởng 6/6 là nâng cấp một sticker đang có (`chooseSticker` trong play.js). Kiểm thử: `python3 tools/test_sticker_hang.py`. `stickers.js` giữ danh mục `StickerDB.STICKERS/RARITY` dùng chung (play.js đọc từ đây; thêm sticker = thêm một dòng, id không đổi). **Máy chủ:** `pub_` trong `tools/apps-script/Code.gs` phải trả thêm `stickers` – thầy dán Code.gs mới và triển khai lại, nếu chưa thì tab Sticker hiện hướng dẫn. Engine gọi `Hub.route()` đầu `route()`, trang giáo viên gọi trong `home()` của lecture.js; `Account.restrict` cho phép đường link này. Kiểm thử: `python3 tools/test_hub.py` | Khi thêm tính năng cho Góc chung |
| `assets/js/xephang.js` | **Bảng xếp hạng cho giáo viên** (`GvRank.mount(el, 'lop9')`): cột phải trang bài giảng một khối (`.lk-2col`, `body.gv-wide`); gọi `Account.rankAll(khối)` → Apps Script `rankAll` (chỉ tài khoản không có chữ số); thẻ từng lớp, sắp xếp ⭐/🔥/🏅/📘, thú cưng đúng cấp theo sao của khối (`Pet.thresholds`, tự nạp `data/<khối>.js` – vì vậy `giao-vien/index.html` nạp cả `generators.js`), bấm tên → chặng tiến hoá 5 cấp; em chưa đăng nhập ở nhóm riêng | Khi đổi bảng xếp hạng giáo viên |
| `assets/js/account.js` | **Đăng nhập theo lớp** (Google Sheets qua Apps Script, bật khi `CONFIG.sheetAPI` khác rỗng) và **thú cưng tiến hoá** 5 cấp theo tổng sao của khối (`Pet`). Tiến độ lưu riêng từng học sinh (`hoctap:u:<lớp>|<tk>:…`). Đăng nhập xong chỉ hiện khối ứng với số đầu của tên lớp (`10A12` → `lop10`; `CONFIG.lockGrade`) | Khi đổi đăng nhập/thú cưng |
| `tools/apps-script/` | `Code.gs` (máy chủ trên Google Sheets: HocSinh, TongHop, KetQua, DangNhap, TienDo, CauHoi, TraLoi; action của Góc chung: `hot`, `race`, `qList`, `qAnswer`, `qPost`, `qClose`, `bonus`; menu 🐣 và hẹn giờ 30 phút cập nhật TongHop), `HUONG-DAN.md`, `mau-danh-sach-hoc-sinh.xlsx` | Khi đổi cách lưu kết quả |
| `assets/js/engine.js` | Hiển thị, chấm, sao, điều hướng hash, nạp `data/*.js` | **Hạn chế sửa**. Chỉ sửa khi thêm loại câu hỏi mới hoặc tính năng mới |
| `assets/css/style.css` | Giao diện "vở ô chấm", token màu, chế độ tối, bố cục iPad | Khi đổi giao diện |
| `HUONG-DAN-CHATGPT.md` | Hướng dẫn cho thầy: dùng ChatGPT Codex/Project, *Lệnh khởi đầu* và các lệnh mẫu giao việc | Khi đổi quy trình làm việc với AI |
| `tools/kiem-tra.js` | **Kiểm tra nhanh bằng Node** (không cần trình duyệt): cú pháp mọi tệp JS; chỗ làm tắt (`// ...`, “phần còn lại giữ nguyên”, TODO, nội dung “…”); sinh câu hỏi mọi dạng × 3 mức và soát hợp đồng dữ liệu, LaTeX, SVG; bài giảng, phiếu luyện tập 70/30; thẻ `<script>` | Chạy sau **mọi** thay đổi (mọi AI chạy được) |
| `tools/dang-len-web.command` | **Nút “Đăng lên web” của thầy** (macOS, bấm đúp; có bản sao trên Desktop). Lần đầu tự biến thư mục `hoc-tap` trên máy thành bản sao git của kho. Mỗi lần: `git add -A` → `node tools/kiem-tra.js` (lỗi thì dừng, chép lỗi vào clipboard) → build → hỏi xác nhận → commit → `pull --rebase` → kiểm tra lại → push. Xung đột thì dừng, giữ nguyên tệp trên máy | Khi đổi quy trình đăng; AI **không** cần tự đẩy lên khi thầy dùng nút này |
| `tools/goi-chatgpt.js` + `tools/goi-cho-chatgpt.command` | **Gói tài liệu cho ChatGPT Project**: một tệp `HOC-MA-CHOI-THAM-KHAO.md` = AGENTS.md + bản đồ nội dung tự sinh (`BAN_DO=… node tools/kiem-tra.js`) + mã lõi + trích đoạn mẫu. Nút `.command` (có bản trên Desktop) lấy bản mới nhất từ GitHub, tạo gói vào Desktop, mở Finder và ChatGPT | Khi đổi tệp mẫu hoặc thêm mã lõi cần AI biết |
| `tools/test.py` | Kiểm thử tự động: làm hết mọi câu và báo câu nào bị chấm sai | Chạy sau **mọi** thay đổi |
| `tools/build.py` | Gộp cả thư mục thành `dist/hoc-tap.html` (một file) | Trước khi gửi hoặc publish |

Thứ tự nạp: `config.js → core.js → figures.js → generators.js → math.js → vendor/mathjax/tex-chtml.js (async) → sound.js → account.js → play.js → classpanel.js → present.js → engine.js`. Engine gọi `hook('picker'|'home'|'lesson'|'answer'|'done', …)` → `Account.on(...)`, và `Account.gate(start)` khi khởi động (hiện màn đăng nhập nếu cần). Sau đó engine tự nạp `data/<mã>.js` theo `CONFIG.grades`.
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
| Nhiều bước (giải toán có lời văn) | `QS({...})` | `steps:[{tag, ask, hint, opts+ans \| tpl+ans}]` – tag: Hiểu đề, Tóm tắt, Kế hoạch, Giải, Thử lại, Đáp số; bước điền chỉ dùng `[_]`; `direct:true` (mức 3) chỉ hiện bước cuối, có nút "Làm theo từng bước". Chấm từng bước: sai 1 lần → `hint` của bước, sai 2 lần → hiện đáp án bước rồi làm tiếp. Điểm: không sai = 1; có sai hoặc nhờ làm từng bước = ½; phải xem đáp án bước = 0. `sol` trình bày kiểu tiểu học (câu lời giải, phép tính, Đáp số) |
| Tô màu | `{kind:'shade', n, shape:'rect'|'circle', num, den, on:[], text, hint, sol}` | số phần tô × den = num × n |

Trường chung cho mọi câu: `text` (đề, được dùng HTML), `fig` (SVG, không bắt buộc), `hint`, `sol`.

Cách viết `ans` cho ô trống:
- số: `ans:[1250]`, chấm đúng dù học sinh gõ "1 250" hay "1250";
- chấp nhận nhiều cách viết: `ans:[['XX', 20]]`;
- phân số: `{frac:[3,4], mode:'exact'|'eq'|'simplest'}`;
- số thập phân: `ans:[0.6]` nhận cả “0,6” và “0.6”; kết quả làm tròn nên cho đề sẵn giá trị gần đúng (vd. `sin 40° ≈ 0,64`) và chấp nhận thêm kết quả bấm máy trực tiếp: `ans:[[7.7, 7.6]]`.

Token có thể nằm trong markup. Ví dụ `<span class="fr"><span>[_]</span><span>12</span></span>` hỏi riêng tử số.

## 3b. Toán tư duy song ngữ + kiến thức trọng tâm (mẫu: cuối `data/lop4.js`, khối “🧠 TOÁN TƯ DUY”)
- Nhóm riêng: `G.topics.splice(…, {id:51, hk:1, name:'Phép cộng và phép trừ', label:'🧠 Toán tư duy'})` – `label` thay chữ “Chủ đề N”.
- `lesson(51, 'td-…', 'Tên bài', 'Mô tả', [dạng…], {bi:true, en:'English title', descEn:'…', intro:[{t:[vi,en], b:[vi,en], ex:[vi,en], fig}]})`.
  `intro` = thẻ **📘 Kiến thức trọng tâm** hiện đầu trang bài (mở sẵn); `bi:true` hiện nút **Tiếng Việt / Song ngữ / English** (lưu `hoctap:lang`, mặc định song ngữ).
- Mọi chữ trong đề, gợi ý, lời giải viết song ngữ: `bi(vi, en)` cho câu/đoạn, `bin(vi, en)` cho nhãn ngắn trong dòng (đơn vị, tên ô, phương án) – cả hai ở `core.js`. Đáp án số không phụ thuộc ngôn ngữ.
- Dữ liệu thầy gửi theo mẫu Excel `Mau-du-lieu-Toan-tu-duy-lop4-song-ngu.xlsx` (trang BaiHoc, KienThuc, CauHoi, TuVung); câu `doi_so = Có` được lập trình thành dạng sinh số ngẫu nhiên.

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
node tools/kiem-tra.js       # KIỂM TRA NHANH không cần trình duyệt (cú pháp, hợp đồng dữ liệu, LaTeX, bài giảng, phiếu 70/30) – phải in ĐẠT ✓
python3 tools/test.py        # phải in "KẾT QUẢ: ĐẠT ✓"   (tham số tuỳ chọn: số vòng/bài, mặc định 10)
python3 tools/build.py       # tạo dist/hoc-tap.html
python3 tools/test_dangnhap.py  # nếu sửa account.js: thử đăng nhập + thú cưng với máy chủ giả lập
python3 tools/test_khoilop.py   # nếu sửa đăng nhập: lớp 10A12 chỉ thấy Lớp 10
python3 tools/test_trinhchieu.py # nếu sửa present.js hoặc thêm bài: chiếu mọi câu, không tràn khung (chạy ~12 phút)
python3 tools/test_baigiang.py [lop8] # nếu sửa bài giảng giáo viên: chặn học sinh, chọn lớp, chiếu mọi trang không tràn (tham số: chỉ một lớp)
python3 tools/test_phieu_tren_lop.py # nếu thêm/sửa phiếu trên lớp (lop11-khoi-dong.js…): Phần A đúng 2 trang A4, phương án 1–2 dòng, công thức, tải .md
python3 tools/test_phieu_chuong.py # nếu sửa phiếu cả chương (lecture.js › chapterSheet, `.cs-*` trong style.css): mọi chương xuất PDF không lỗi công thức, không tràn cột, số trang hợp lý
python3 tools/test_kiemtra.py [lop10] # nếu thêm/sửa đề kiểm tra: mỗi mã đề in ĐÚNG 2 trang A4 (PDF thật), không lỗi công thức, đáp án dựng được
python3 tools/test_chieu_kiemtra.py # nếu sửa test-deck.js hoặc thêm/sửa bài kiểm tra học sinh: chiếu mọi mã đề của mọi bài (không tràn khung, không lỗi công thức, học sinh không thấy nút; chạy ~6 phút)
python3 tools/test_luyentap.py   # nếu sửa phiếu luyện tập: tỉ lệ 65–75% cơ bản, đánh số, lời giải, hệ trục trống, chiếu không tràn
python3 tools/test_lophoc.py    # nếu sửa classpanel.js / trình chiếu: khung Lớp học mở 1/3, kéo đổi độ rộng, ẩn–mở còn nội dung, không tràn
python3 tools/test_sticker_hang.py # nếu sửa hạng sticker (stickers.js, `.t-*` trong style.css, Phòng Sticker trong play.js)
python3 tools/test_hub.py      # nếu sửa hub.js / stickers.js: Góc chung cho học sinh + giáo viên (xếp hạng, sticker, đăng ký tab mới, máy chủ cũ)
python3 tools/test_hub_plus.py # nếu sửa hub-plus.js hoặc phần ôn bài cũ/thưởng nhiệm vụ trong play.js: thử thách tuần, câu hỏi của thầy, bài hot, lộ trình, ôn bài cũ, đua lớp (học sinh + giáo viên)
python3 tools/test_xephang.py   # nếu sửa xephang.js: bảng xếp hạng giáo viên (cột phải, thẻ lớp, sắp xếp, cấp tiến hoá, máy chủ cũ)
python3 tools/test_thucung.py   # nếu sửa play.js: xu, hạt, cho ăn, cửa hàng, nhiệm vụ, huy hiệu, xếp hạng
node tools/test_appscript.js    # nếu sửa tools/apps-script/Code.gs
python3 tools/test_congthuc.py  # nếu sửa nội dung lớp 6+ (LaTeX): không còn công thức lỗi
python3 tools/test_nhieubuoc.py  # nếu sửa loại câu nhiều bước (QS): sai→gợi ý, sai 2 lần→đáp án bước, điểm ½/0, mức 3
node tools/verify8.js           # nếu sửa lớp 8: kiểm tra đại số (đáp án bằng đề, phương án sai không bằng)
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
