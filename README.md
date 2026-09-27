# Học mà chơi – Web bài tập củng cố theo bài

Web cho học sinh tự luyện theo từng bài. Câu hỏi được sinh ngẫu nhiên, mỗi bài có 3 mức. Sai lần 1 thì hiện gợi ý, sai lần 2 thì hiện lời giải. Giao diện tối ưu cho iPad.
Hiện có **Toán lớp 4 – Kết nối tri thức** (29 bài). Muốn có thêm lớp khác thì chỉ cần thêm một file dữ liệu.

## Cấu trúc thư mục

```
hoc-tap/
├── CLAUDE.md / AGENTS.md  Hướng dẫn cho AI (đưa cho Claude/ChatGPT đọc trước khi nhờ làm tiếp)
├── index.html              Trang chính (thường không cần sửa)
├── config.js               ★ Cấu hình: tên web, người soạn, số câu/bộ, DANH SÁCH LỚP
├── data/
│   ├── lop4.js             ★ Nội dung Toán 4: chủ đề, bài, các dạng bài
│   └── _mau-lop-moi.js     ★ File mẫu có chú thích để tạo lớp mới (ví dụ Lớp 3, 2 bài)
├── assets/
│   ├── css/style.css       Giao diện: màu, cỡ chữ, bố cục iPad, chế độ tối
│   └── js/
│       ├── core.js         Hàm tiện ích, QB/QC/QCmp, sổ đăng ký lớp (App.addGrade)
│       ├── figures.js      Hình SVG: thước đo góc, góc, phân số, biểu đồ cột, hình chữ nhật…
│       ├── generators.js   Dạng bài DÙNG CHUNG cho mọi lớp (hàng/lớp, so sánh, làm tròn, đổi đơn vị, góc…)
│       └── engine.js       Hiển thị, chấm bài, tính sao, điều hướng
├── tools/
│   ├── test.py             Kiểm thử tự động: máy làm hết mọi câu, báo câu nào bị chấm sai
│   └── build.py            Gộp tất cả thành 1 file dist/hoc-tap.html để gửi hoặc mở offline
└── dist/hoc-tap.html       Bản gộp một file (tạo bằng build.py)
```

★ = những file thầy/cô sẽ sửa thường xuyên.

## Thêm một lớp mới (ví dụ Lớp 5)

1. Chép `data/_mau-lop-moi.js` thành `data/lop5.js`.
2. Trong file mới, sửa `id: 'lop5'`, `name: 'Lớp 5'`, `book`, danh sách `topics`, rồi viết các bài bằng `lesson(...)`.
3. Mở `config.js`:
   - thêm `'lop5'` vào `grades: ['lop4', 'lop5']`;
   - xoá `'Lớp 5'` khỏi `upcoming` (danh sách các lớp đang hiện chữ "Sắp có").
4. Chạy `python3 tools/test.py` (hoặc nhờ Claude chạy). Kết quả phải là **ĐẠT ✓**.
5. Chạy `python3 tools/build.py` nếu cần bản một file.

## Thêm hoặc sửa một bài trong lớp đã có

Mở file `data/lop4.js`. Mỗi bài là một dòng như sau:

```js
lesson(10, 'rut-gon', 'Rút gọn phân số', 'Mô tả ngắn', [dạngBài1, dạngBài2, dạngBài3]);
//     ^chủ đề ^mã bài (không dấu, không trùng)                ^các dạng, xếp từ dễ đến khó
```

- **Sửa tên hoặc mô tả bài:** sửa chữ trong dấu nháy.
- **Chuyển bài sang chủ đề khác:** đổi số đầu tiên (số này phải có trong `topics`).
- **Thêm dạng bài:** thêm một hàm vào mảng `[...]`. Có thể dùng dạng bài có sẵn, ví dụ `gCmp(6)` để so sánh số có 6 chữ số, hoặc tự viết một dạng mới theo mẫu trong `_mau-lop-moi.js`.
- **Thứ tự hiển thị:** các bài hiện theo đúng thứ tự dòng trong file.

## Các loại câu hỏi

| Loại | Dùng khi | Khai báo |
|---|---|---|
| Điền ô trống | tính, đổi đơn vị, viết số, phân số | `QB({text, tpl:'[_] kg', ans:[500], hint, sol})`; `[F]` là ô phân số |
| Chọn đáp án | nhận dạng, chọn số lớn nhất… | `QC({text, opts:[...], ans:'đúng', hint, sol})` |
| Chọn dấu | so sánh | `QCmp(text, 'vế trái', 'vế phải', giáTrịTrái, giáTrịPhải, {hint, sol})` |
| Xoay kim/tia | đo góc, (đồng hồ) | `{kind:'rotate', target, val, step, text, hint, sol}` |
| Tô màu | phân số | `{kind:'shade', n, shape, num, den, on:[], text, hint, sol}` |

Đáp án cho ô trống:
- `ans:[42]`: một đáp án số. Học sinh gõ "1 000" hay "1000" đều được chấm đúng.
- `ans:[['XX', 20]]`: nhiều cách viết đều đúng.
- Phân số `{frac:[3,4], mode:'exact'}` (phải viết đúng 3/4), `'eq'` (mọi phân số bằng nhau đều đúng), `'simplest'` (phải là phân số tối giản).

**Nguyên tắc vàng:** chọn đáp án trước rồi mới dựng đề. Làm như vậy thì phép chia luôn chia hết, không ra số âm, và mỗi câu chỉ có một phương án đúng.

## Đường link

- `index.html#/`: trang chọn lớp.
- `index.html#/lop4`: danh sách bài của lớp 4.
- `index.html#/lop4/bai/khai-niem-ps/2`: mở thẳng bài "Khái niệm phân số" ở Mức 2 (dùng để gửi cho học sinh).

## Đưa lên mạng

Cả thư mục là web tĩnh nên có thể đưa lên Vercel, Netlify hoặc GitHub Pages.
Nếu chỉ cần gửi một file (qua Zalo, Drive…), chạy `tools/build.py` rồi gửi `dist/hoc-tap.html`.
Tiến độ (số sao) được lưu trong trình duyệt của từng máy, không gửi đi đâu cả.
