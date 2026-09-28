#!/usr/bin/env node
/* =====================================================================
   GÓI TÀI LIỆU CHO CHATGPT (Project) – một tệp duy nhất để tải lên.
   Chạy:  node tools/goi-chatgpt.js [thư-mục-ra]    (mặc định: dist/chatgpt)
   Tạo:   HOC-MA-CHOI-THAM-KHAO.md  = AGENTS.md + bản đồ nội dung hiện có
          + mã lõi (config, core, figures, lecture, giao-vien/index.html)
          + mẫu: chương V data/lop9.js, chương III bài giảng lop8.js, phiếu luyện tập lop8.
   Tệp cần SỬA thì thầy đính kèm thẳng vào tin nhắn (ChatGPT đọc trọn tệp đính kèm).
   ===================================================================== */
const fs = require('fs'), path = require('path'), cp = require('child_process');
const ROOT = path.resolve(__dirname, '..'), rd = p => fs.readFileSync(path.join(ROOT, p), 'utf8');
const OUT = path.resolve(process.argv[2] || path.join(ROOT, 'dist', 'chatgpt'));
fs.mkdirSync(OUT, {recursive: true});

// 1. Bản đồ nội dung (tự sinh từ dữ liệu thật) + kiểm tra
const bd = path.join(require('os').tmpdir(), 'hoc-ma-choi-ban-do-' + process.pid + '.md');
let kq = '';
try { kq = cp.execFileSync(process.execPath, [path.join(ROOT, 'tools/kiem-tra.js'), '3'], {env: {...process.env, BAN_DO: bd}, encoding: 'utf8'}); }
catch (e) { kq = String(e.stdout || ''); }
const banDo = fs.existsSync(bd) ? fs.readFileSync(bd, 'utf8') : '(không tạo được bản đồ)\n';
try { fs.unlinkSync(bd); } catch (e) {}

// 2. Cắt đoạn mẫu theo mốc (không thấy mốc thì lấy cả tệp)
const cut = (file, fromRe, toRe, block) => {
  const L = rd(file).split('\n'); let a = L.findIndex(x => fromRe.test(x)); if (a < 0) return rd(file);
  if (block) for (let i = a - 1; i >= 0 && !/^\}\)\(\);/.test(L[i]); i--) if (/^\(\(\) => \{/.test(L[i])) { a = i; break; }   // lùi về đầu khối (() => { … })();
  const c0 = L.slice(0, a).map(x => /^\s*\/\*/.test(x)).lastIndexOf(true), c1 = L.slice(0, a).map(x => /\*\/\s*$/.test(x)).lastIndexOf(true);
  if (c0 >= 0 && c1 >= c0 && L.slice(c1 + 1, a).every(x => !x.trim())) a = c0;          // kèm khối chú thích ngay phía trên
  else if (c0 >= 0 && c0 > c1) a = c0;                                                 // mốc nằm trong chú thích
  let b = toRe ? L.findIndex((x, i) => i > a && toRe.test(x)) : -1; if (b < 0) b = L.length - 1;
  return `// [TRÍCH ĐOẠN MẪU từ ${file} – phần trước đã lược; khi sửa luôn dùng tệp đầy đủ thầy đính kèm]\n` + L.slice(a, b + 1).join('\n');
};
const head = (file, n) => rd(file).split('\n').slice(0, n).join('\n') + `\n// [TRÍCH ĐOẠN MẪU – phần sau đã lược]`;

const parts = [
  ['AGENTS.md – QUY TẮC BẮT BUỘC (đọc trước tiên)', rd('AGENTS.md'), 'md'],
  ['BẢN ĐỒ NỘI DUNG HIỆN CÓ', banDo, 'md'],
  ['config.js', rd('config.js'), 'js'],
  ['assets/js/core.js – hàm tiện ích, QB/QC/QCmp/QS, App.addGrade', rd('assets/js/core.js'), 'js'],
  ['assets/js/figures.js – các hàm vẽ SVG', rd('assets/js/figures.js'), 'js'],
  ['assets/js/lecture.js – Lecture.add / Lecture.addPractice', rd('assets/js/lecture.js'), 'js'],
  ['giao-vien/index.html – thứ tự nạp thẻ <script>', rd('giao-vien/index.html'), 'html'],
  ['MẪU phần học sinh: data/lop9.js – đầu tệp (khai báo lớp, chủ đề)', head('data/lop9.js', 46), 'js'],
  ['MẪU phần học sinh: data/lop9.js – Chương V (khối { … } riêng)', cut('data/lop9.js', /CHƯƠNG V –/, null), 'js'],
  ['MẪU bài giảng: giao-vien/bai-giang/lop8.js – Chương III', cut('giao-vien/bai-giang/lop8.js', /chapter:'Chương III/, /^\}\)\(\);/, true), 'js'],
  ['MẪU phiếu luyện tập: giao-vien/bai-giang/lop8-luyen-tap.js', rd('giao-vien/bai-giang/lop8-luyen-tap.js'), 'js'],
];
const md = [
  '# HỌC MÀ CHƠI – TÀI LIỆU THAM KHẢO CHO CHATGPT',
  `> Tự sinh ngày ${new Date().toLocaleString('vi-VN')}. Bản này thay thế mọi bản cũ trong Project.`,
  '> Đọc theo thứ tự các mục. Tệp cần sửa: thầy sẽ đính kèm bản ĐẦY ĐỦ trong tin nhắn – luôn sửa trên bản đính kèm đó và trả lại TOÀN BỘ tệp.',
  `> Kết quả kiểm tra lúc tạo gói: ${(kq.match(/KẾT QUẢ:.*/) || ['(chưa rõ)'])[0]}`, '',
  '## Mục lục', ...parts.map((p, i) => `${i + 1}. ${p[0]}`), '',
  ...parts.flatMap((p, i) => [`\n---\n\n## ${i + 1}. ${p[0]}\n`, p[2] === 'md' ? p[1] : '```' + p[2] + '\n' + p[1] + '\n```']),
].join('\n');
const f = path.join(OUT, 'HOC-MA-CHOI-THAM-KHAO.md');
fs.writeFileSync(f, md);
console.log(`Đã tạo ${f} (${Math.round(md.length / 1024)} KB)`);
console.log((kq.match(/KẾT QUẢ:.*/) || [''])[0]);
