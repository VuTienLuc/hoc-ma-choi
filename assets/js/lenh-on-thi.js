/* Biểu mẫu “Tạo lệnh ôn thi vào 10” (trang giáo viên, đường link #/lenh-on-thi).
 * Thầy chọn sản phẩm + chủ đề + mức độ + ghi chú → tạo sẵn đoạn lệnh mô tả đúng dạng đề ôn thi vào 10 TP.HCM
 * để dán cho Claude / ChatGPT. Thêm chủ đề mới: thêm một dòng vào TOPICS. */
const LenhOnThi = (() => {
  const $ = (s, r = document) => r.querySelector(s);
  const esc = s => String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

  /* [id bài, tên, nhóm, mô tả dạng đề] */
  const TOPICS = [
    ['on-thi-ham-so-parabol', 'Đại số 1. Hàm số y = ax² và đồ thị', 'Đại số', 'Bài 1 (1,5 điểm): giá trị hàm số, bảng giá trị vẽ đồ thị, tính chất parabol, đọc đồ thị tìm a, điểm thuộc đồ thị.'],
    ['on-thi-pt-bac-hai-viete', 'Đại số 2. Phương trình bậc hai, hệ thức Viète', 'Đại số', 'Bài 2 (1,5 điểm): giải phương trình bậc hai, biệt thức và số nghiệm, Viète và giá trị biểu thức, biết một nghiệm, tham số m.'],
    ['on-thi-xac-suat', 'Đại số 3. Xác suất đơn giản', 'Đại số', 'Xác suất cổ điển (hộp bi, xúc xắc, đồng xu, thẻ số), biến cố đối, xác suất thực nghiệm.'],
    ['on-thi-thuc-te-dai-so-hinh-hoc', 'Đại số 4. Thực tế đại số – hình học', 'Đại số', 'Chu vi, diện tích, lát gạch, hình tròn (π ≈ 3,14), hình quạt, hình ghép, lập phương trình từ hình.'],
    ['on-thi-giai-bai-toan-lap-pt', 'Đại số 5. Giải bài toán bằng cách lập biểu thức, phương trình', 'Đại số', 'Lập biểu thức (cước phí, giảm giá), phương trình bậc nhất và bậc hai: tuổi, chuyển động, công việc, phần trăm.'],
    ['on-thi-he-phuong-trinh-thuc-te', 'Đại số 6. Thực tế lập hệ phương trình', 'Đại số', 'Lập hệ từ mua hàng, vé, khuyến mãi; số học; chuyển động; công việc; phần trăm, dung dịch.'],
    ['on-thi-hinh-khong-gian', 'Hình học 4. Hình không gian thực tế', 'Hình học', 'Hình trụ, nón, cầu, hộp, lăng trụ, chóp đều, hình ghép; công thức cho sẵn trong đề.'],
    ['on-thi-tiep-tuyen', 'Hình học 1. Tiếp tuyến của đường tròn', 'Hình học', 'Nhận biết và chứng minh tiếp tuyến, hai tiếp tuyến, dây tiếp điểm, tiếp tuyến – cát tuyến.'],
    ['on-thi-goc-duong-tron', 'Hình học 2. Góc ở tâm, góc nội tiếp', 'Hình học', 'Cung và góc ở tâm, góc nội tiếp, tứ giác nội tiếp, góc tiếp tuyến – dây, góc có đỉnh trong/ngoài đường tròn.'],
    ['on-thi-hinh-quat-vanh-khuyen', 'Hình học 3. Hình quạt tròn, hình vành khuyên', 'Hình học', 'Độ dài cung, diện tích quạt, vành khuyên, quạt vành khuyên, hình ghép.'],
    ['on-thi-hinh-hoc-chung-minh-1', 'Hình học 7a. Chứng minh (câu a, b)', 'Hình học', 'Bài 7 câu a, b: bốn điểm cùng đường tròn, tứ giác nội tiếp, song song, vuông góc – trực tâm, hệ thức tam giác đồng dạng.'],
    ['on-thi-hinh-hoc-chung-minh-2', 'Hình học 7b. Hệ thức, thẳng hàng, đồng quy (câu c, d)', 'Hình học', 'Bài 7 câu c, d: hệ thức, ba điểm thẳng hàng, đồng quy – phân giác tam giác DEF, tiếp tuyến.'],
    ['on-thi-hinh-hoc-tinh-toan', 'Hình học 7c. Tính độ dài, chu vi, diện tích, số đo góc', 'Hình học', 'Bài 7 câu cuối (vận dụng cao): độ dài, tam giác nội tiếp góc 60°, ∠OAH, đồng dạng, cung – quạt – viên phân.'],
    ['on-thi-kien-thuc-thong-nhat', 'Kiến thức thống nhất: dùng ngay hay phải chứng minh lại', 'Hình học', 'Phân loại kiến thức được dùng trực tiếp / phải chứng minh lại; tam giác đều, vuông cân, trung tuyến, sin–cos–tan, đường kính – dây.']
  ];

  const PRODUCTS = {
    phieu: {label: '📋 Phiếu học tập trên lớp (2 trang A4)', file: 'giao-vien/bai-giang/lop9-khoi-dong.js', fn: `Lecture.addSheet('lop9', '<id bài>', String.raw\`…markdown…\`)`,
      body: `Soạn đúng MỘT phiếu học tập trên lớp, lấy phiếu "on-thi-hinh-hoc-tinh-toan" (hoặc phiếu gần nhất cùng nhóm) trong giao-vien/bai-giang/lop9-khoi-dong.js làm khuôn:
- Phần A (phiếu học sinh) in ĐÚNG 2 trang A4: 1) Vào lớp làm ngay (Do Now 4 câu) · 2) Tình huống mở đầu (có [Minh họa]) · 3) Hai câu hỏi bản lề A–D · 4) Bảy câu luyện tập xen kẽ ★/★★/★★★ (gồm 1 câu thực tế [Minh họa]) · 5) Tìm lỗi sai · 6) Phiếu ra khỏi lớp (1 trắc nghiệm + 1 đúng/sai 4 ý + 1 điền) · 7) Một phút suy ngẫm · 8) Vận dụng về nhà.
- Phần B (gợi ý giáo viên): thông tin bài, mục tiêu, tiến trình 45 phút, đáp án và lỗi dự kiến từng hoạt động, xử lý phiếu ra khỏi lớp, phân hóa, bảng đáp án toàn bộ Phần A.
- Phương án A–D mỗi phương án một dòng trong tệp; công thức trong $…$; không dùng dấu backtick trong chuỗi String.raw; đặt phiếu mới ở cuối tệp.` },
    hocsinh: {label: '🧮 Bài học sinh luyện tập (sinh ngẫu nhiên)', file: 'data/lop9.js (chương 6)', fn: `lesson(6, '<id bài>', 'Tên bài', 'Mô tả', [dạng…], {intro:[{t,b,warn,ex}…]})`,
      body: `Thêm/bổ sung bài cho học sinh luyện tập theo khuôn các chủ đề "on-thi-…" trong chương 6 của data/lop9.js: 4–5 dạng, mỗi dạng 3 mức khác nhau thật sự (mức 3 là câu nhiều bước QS hoặc vận dụng cao), đáp số nguyên hoặc gọn, hint không lộ đáp án, có hình SVG cục bộ khi là bài hình. Có tham số thứ năm {intro:[…]} với ≥ 3 mục "Kiến thức cần nhớ · Lưu ý · Mẹo" (ít nhất một warn và một ex).` },
    baigiang: {label: '📽️ Bài giảng trình chiếu', file: 'giao-vien/bai-giang/lop9.js', fn: `{id:'<id bài>', name, desc, slides:[…]}`,
      body: `Soạn bài giảng trình chiếu theo khuôn các bài "on-thi-…" trong giao-vien/bai-giang/lop9.js: trang title, 3 trang kt (kiến thức nền, có hình với bài hình), mỗi dạng có method + ít nhất 1 ví dụ vd (lời giải từng bước, mỗi bước ghi căn cứ), sum "Checklist trước khi nộp bài".` },
    luyentap: {label: '🏋️ Phiếu luyện tập (7 cơ bản + 3 ★)', file: 'giao-vien/bai-giang/lop9-luyen-tap.js', fn: `Lecture.addPractice('lop9', '<id bài>', [{dang, items:[…]}])`,
      body: `Soạn phiếu luyện tập in 2 trang A4: 10 bài = 7 cơ bản + 3 vận dụng (hard:true), xếp theo dạng, theo khuôn các phiếu "on-thi-…" trong giao-vien/bai-giang/lop9-luyen-tap.js. Không có lý thuyết; mỗi bài có đề, lời giải từng bước, đáp số.` },
    trongbo: {label: '📦 Trọn bộ (học sinh + bài giảng + luyện tập + phiếu trên lớp)', file: 'nhiều tệp', fn: '',
      body: `Làm trọn bộ cho chủ đề này theo mục 0b của CLAUDE.md, bỏ phần Giải SGK: (1) học sinh luyện tập; (2) bài giảng; (3) phiếu luyện tập; (4) phiếu học tập trên lớp. Thêm thẻ <script> vào giao-vien/index.html nếu có tệp mới.` }
  };

  const LEVELS = {
    co: 'cơ bản – đại trà (mục tiêu 7–8 điểm)',
    kha: 'khá – giỏi (mục tiêu 9–10 điểm), nhiều câu vận dụng cao hơn',
    mix: 'phân hóa 70% cơ bản – 30% vận dụng cao (★)'
  };

  const ruleOnThi = `QUY ƯỚC ĐỀ THI VÀO LỚP 10 TP.HCM NĂM NAY (bắt buộc bám sát):
- Dạng đề: tự luận theo bài (Bài 1 hàm số y = ax² và đồ thị; Bài 2 phương trình bậc hai, Viète; các bài xác suất, thực tế, lập phương trình/hệ phương trình; Bài hình học 7 gồm câu a, b, c, d từ chứng minh đến vận dụng cao). Câu hình dùng tam giác nhọn ABC nội tiếp, đường cao AF, BD, CE, trực tâm H. Nếu không chắc cấu trúc/điểm số của một bài, ghi rõ "chưa rõ" để thầy đối chiếu, không bịa.
- Kiến thức "PHẢI CHỨNG MINH LẠI" (không viện dẫn trực tiếp): phân giác ngoài, hệ thức cạnh – đường cao trong tam giác vuông, tan = sin/cos, sin² + cos² = 1, đường kính vuông góc dây, dấu hiệu tứ giác nội tiếp (và AH = 2OM, OM ⟂ BC). Lời giải phải chứng minh lại các điều này.
- Kiến thức "ĐƯỢC DÙNG TRỰC TIẾP": góc nội tiếp chắn nửa đường tròn, góc nội tiếp – góc ở tâm, trung tuyến ứng cạnh huyền bằng nửa cạnh huyền, tam giác đồng dạng (g.g, c.g.c), Pythagore, tỉ số lượng giác, công thức diện tích – độ dài cung – hình quạt.
- Lời giải cho học sinh trung bình: chia từng bước, mỗi bước ghi rõ căn cứ; đáp số in đậm; đáp số nguyên hoặc gọn (giữ π, √3 nếu đề không bắt làm tròn).`;

  function build(o){
    const t = TOPICS.find(x => x[0] === o.topic), p = PRODUCTS[o.product];
    const topicLine = t ? `Chủ đề: ${t[1]} (id bài: ${t[0]}). Dạng đề: ${t[3]}` : `Chủ đề (thầy nhập): ${o.custom || '(chưa nhập)'}`;
    return [
      `Dự án "Học mà chơi" (GitHub VuTienLuc/hoc-ma-choi). Trả lời tiếng Việt, gọi người dùng là "thầy". Đọc CLAUDE.md và LICH-SU-CHINH-SUA.md trước khi sửa.`,
      ``,
      `VIỆC CẦN LÀM: ${p.label.replace(/^\S+\s/, '')}`,
      topicLine,
      `Mức độ: ${LEVELS[o.level]}`,
      `Tệp cần sửa: ${p.file}${p.fn ? '\nHàm đăng ký: ' + p.fn : ''}`,
      o.note ? `Ghi chú của thầy: ${o.note}` : '',
      ``,
      p.body,
      ``,
      ruleOnThi,
      ``,
      `CÁCH LÀM: chọn đáp án trước rồi mới dựng đề; tự tính lại mọi đáp số bằng máy (sympy/tọa độ); công thức LaTeX (viết \\lt, \\le…); không để "...", TODO, "tương tự" trong mã; đưa lại toàn bộ tệp đã sửa.`,
      `KIỂM TRA: node tools/kiem-tra.js 30 lop9 · python3 tools/test.py · python3 tools/test_phieu_tren_lop.py (nếu là phiếu trên lớp) · python3 tools/build.py. ĐẠT thì ghi mục mới ở đầu "Các lần thay đổi" trong LICH-SU-CHINH-SUA.md, commit và git push origin HEAD:main; không ĐẠT thì không đăng.`,
      `BÁO CÁO: ngắn gọn – đã làm gì, kết quả kiểm tra, thầy cần đối chiếu gì.`
    ].filter((x, i, a) => x !== '' || a[i - 1] !== '').join('\n');
  }

  function route(){
    if(!/^#\/lenh-on-thi/.test(location.hash)) return false;
    document.body.classList.remove('gv-wide');
    const app = $('#app'), bar = (typeof Account !== 'undefined' ? Account.userBar() : '');
    const groups = ['Đại số', 'Hình học'];
    app.innerHTML = bar + `<div class="toolbar"><a class="back" href="#/">← Chọn lớp</a><span class="pill">Lệnh ôn thi vào 10</span></div>
      <h1>Tạo lệnh ôn thi vào 10</h1>
      <p class="lead">Chọn sản phẩm và chủ đề, trang tạo sẵn đoạn lệnh mô tả đúng dạng đề thi vào lớp 10 TP.HCM để thầy dán cho Claude hoặc ChatGPT.</p>
      <div class="card" style="display:grid;gap:12px;padding:16px">
        <label>Sản phẩm cần làm <select id="lotProduct">${Object.entries(PRODUCTS).map(([k, v]) => `<option value="${k}">${esc(v.label)}</option>`).join('')}</select></label>
        <label>Chủ đề <select id="lotTopic">${groups.map(g => `<optgroup label="${g}">${TOPICS.filter(x => x[2] === g).map(x => `<option value="${x[0]}">${esc(x[1])}</option>`).join('')}</optgroup>`).join('')}<option value="">Chủ đề khác (tự nhập)…</option></select></label>
        <label id="lotCustomRow" hidden>Tên chủ đề / dạng đề <input id="lotCustom" style="width:100%" placeholder="Ví dụ: Bài 4 – bài toán thực tế về lãi suất"></label>
        <label>Mức độ <select id="lotLevel">${Object.entries(LEVELS).map(([k, v]) => `<option value="${k}">${esc(v)}</option>`).join('')}</select></label>
        <label>Ghi chú thêm (không bắt buộc) <input id="lotNote" style="width:100%" placeholder="Ví dụ: bám đề minh họa 2026, thêm 1 câu có hình"></label>
        <div><button class="btn primary" id="lotCopy">📋 Sao chép lệnh</button> <button class="btn small" id="lotDown">⬇️ Tải .txt</button> <span id="lotStatus" role="status"></span></div>
      </div>
      <textarea id="lotOut" class="mw-text" readonly spellcheck="false" aria-label="Lệnh đã tạo" style="width:100%;min-height:360px;margin-top:12px"></textarea>
      <p class="foot">${CONFIG.author}</p>`;
    const val = id => $(id).value, st = $('#lotStatus');
    const draw = () => {
      $('#lotCustomRow').hidden = val('#lotTopic') !== '';
      $('#lotOut').value = build({product: val('#lotProduct'), topic: val('#lotTopic'), custom: val('#lotCustom').trim(), level: val('#lotLevel'), note: val('#lotNote').trim()});
    };
    ['#lotProduct', '#lotTopic', '#lotLevel'].forEach(s => $(s).onchange = draw);
    ['#lotCustom', '#lotNote'].forEach(s => $(s).oninput = draw);
    $('#lotCopy').onclick = async () => { const ta = $('#lotOut'); try{ await navigator.clipboard.writeText(ta.value); }catch(e){ ta.select(); document.execCommand('copy'); } st.textContent = '✓ Đã sao chép'; };
    $('#lotDown').onclick = () => { const a = document.createElement('a'), u = URL.createObjectURL(new Blob(['﻿' + $('#lotOut').value], {type: 'text/plain;charset=utf-8'}));
      a.href = u; a.download = 'lenh-on-thi-vao-10.txt'; document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(u), 1500); };
    draw(); document.title = 'Lệnh ôn thi vào 10 – ' + (CONFIG.brand || CONFIG.siteName);
    if(typeof Account !== 'undefined') Account.bindLogout();
    scrollTo(0, 0); return true;
  }
  return {route, build, TOPICS, PRODUCTS};
})();
