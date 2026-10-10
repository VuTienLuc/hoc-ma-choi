#!/usr/bin/env node
/* =====================================================================
   KIỂM TRA NHANH (không cần trình duyệt) – dành cho mọi AI (ChatGPT/Codex, Claude…) và thầy.
   Chạy:  node tools/kiem-tra.js            (mặc định 25 lần sinh câu cho mỗi dạng × mỗi mức)
          node tools/kiem-tra.js 60 lop8    (60 lần, chỉ lớp 8)
   Kiểm tra:
   1. Cú pháp mọi tệp .js (config, assets/js, data, giao-vien/bai-giang).
   2. Phần HỌC SINH: nạp config → core → figures → generators → data/<lớp>.js như trình duyệt; sinh câu hỏi ngẫu nhiên và soát
      hợp đồng dữ liệu: số ô trống = số đáp án, đáp án trắc nghiệm nằm trong phương án, không có NaN/undefined, có hint + sol,
      công thức LaTeX không có < > trần, ngoặc { } cân bằng, ô trống không nằm trong công thức, hình SVG không lỗi toạ độ.
   3. Phần GIÁO VIÊN: nạp các tệp bài giảng theo đúng thứ tự trong giao-vien/index.html; soát cấu trúc trang chiếu và phiếu
      luyện tập (tỉ lệ cơ bản 65–75 %), công thức LaTeX.
   4. Liên kết: mỗi lớp trong CONFIG.grades có tệp data; mọi tệp bài giảng đều được nạp trong giao-vien/index.html; mã bài không trùng.
   Công cụ này KHÔNG thay thế tools/test.py (chấm thật trong trình duyệt) nhưng bắt được phần lớn lỗi thường gặp.
   ===================================================================== */
const fs = require('fs'), path = require('path'), vm = require('vm'), cp = require('child_process');
const ROOT = path.resolve(__dirname, '..'), rd = p => fs.readFileSync(path.join(ROOT, p), 'utf8');
const REPS = +process.argv[2] || 25, ONLY = process.argv.slice(3);
const errs = [], warns = [], err = (w, m) => errs.push(`${w}: ${m}`), warn = (w, m) => warns.push(`${w}: ${m}`);

/* ---------- 1. Cú pháp ---------- */
const jsFiles = ['config.js', ...['assets/js', 'data', 'giao-vien/bai-giang'].flatMap(d => fs.readdirSync(path.join(ROOT, d)).filter(f => f.endsWith('.js')).map(f => `${d}/${f}`))];
jsFiles.forEach(f => { try { cp.execFileSync(process.execPath, ['--check', path.join(ROOT, f)], {stdio: 'pipe'}); } catch (e) { err(f, 'LỖI CÚ PHÁP\n' + String(e.stderr || e).split('\n').slice(0, 6).join('\n')); } });

/* ---------- 1b. Làm tắt / bỏ dở (AI viết "…", "phần còn lại giữ nguyên", TODO) trong tệp nội dung ---------- */
const LAZY = [
  [/(^|[^:])\/\/\s*(\.\.\.|…)\s*$|\/\*\s*(\.\.\.|…)\s*\*\//, 'chú thích “…” thay cho nội dung'],
  [/(^|[^:])\/\/[^\n]*?(phần còn lại|giữ nguyên|(làm|viết|tương) tự như|rest of|same as above|unchanged)|\/\*[^*]*?(phần còn lại|giữ nguyên|rest of|unchanged)[^*]*\*\//i, 'chú thích làm tắt'],
  [/\b(TODO|FIXME|XXX)\b/, 'còn việc chưa làm'],
  [/\b(de|sol|ans|body|title|text|hint|name|desc|label)\s*:\s*(['"`])\s*(\.\.\.|…)\s*\2/, 'nội dung để trống bằng “…”'],
];
jsFiles.filter(f => /^(data|giao-vien\/bai-giang)\//.test(f)).forEach(f => rd(f).split('\n').forEach((line, i) => {
  for (const [re, what] of LAZY) if (re.test(line)) { err(`${f}:${i + 1}`, `${what} – phải viết đầy đủ: ${line.trim().slice(0, 90)}`); break; }
}));

/* ---------- Môi trường giả lập trình duyệt (đủ để nạp tệp, không vẽ giao diện) ---------- */
function sandbox() {
  const el = () => ({ style: {}, dataset: {}, classList: {add() {}, remove() {}, toggle() {}, contains: () => false}, setAttribute() {}, appendChild() {}, addEventListener() {},
    querySelector: () => null, querySelectorAll: () => [], insertAdjacentHTML() {}, remove() {}, innerHTML: '', textContent: '' });
  const doc = { querySelector: () => null, querySelectorAll: () => [], getElementById: () => null, createElement: el, addEventListener() {}, removeEventListener() {},
    documentElement: el(), head: el(), body: el(), fonts: {addEventListener() {}} };
  const store = {};
  const ctx = { console, document: doc, localStorage: {getItem: k => store[k] ?? null, setItem: (k, v) => store[k] = String(v), removeItem: k => delete store[k]},
    location: {hash: '', pathname: '/', replace() {}, reload() {}}, navigator: {onLine: false, userAgent: 'node'}, addEventListener() {}, removeEventListener() {},
    matchMedia: () => ({matches: false, addEventListener() {}}), fetch: () => Promise.reject(new Error('offline')), requestAnimationFrame: f => 0, setTimeout: () => 0, clearTimeout() {},
    innerWidth: 1280, innerHeight: 800, getComputedStyle: () => ({}), ResizeObserver: function () { this.observe = () => {}; this.disconnect = () => {}; }, Math, JSON, Date, Number, String, Array, Object, Set, Map, RegExp, Promise };
  ctx.window = ctx; ctx.globalThis = ctx; ctx.self = ctx;
  vm.createContext(ctx); return ctx;
}
const run = (ctx, file) => { try { vm.runInContext(rd(file), ctx, {filename: file}); return true; } catch (e) { err(file, 'lỗi khi nạp: ' + (e && e.stack || e).split('\n').slice(0, 3).join(' | ')); return false; } };

/* ---------- Soát chuỗi HTML + LaTeX ---------- */
const BAD = /\bNaN\b|\bundefined\b|\bInfinity\b|\[object Object\]/;
function checkTex(where, s) {
  if (typeof s !== 'string') return;
  if (BAD.test(s.replace(/<[^>]*>/g, ''))) err(where, `có "NaN/undefined/Infinity": ${s.slice(0, 140)}`);
  if (/\$\{/.test(s)) err(where, `còn nguyên "\${…}" – chuỗi phải viết bằng dấu \` (backtick), không dùng nháy đơn/kép: ${s.slice(0, 120)}`);
  const re = /\\\(([\s\S]*?)\\\)|\\\[([\s\S]*?)\\\]/g; let mm;
  while ((mm = re.exec(s))) {
    const t = mm[1] ?? mm[2];
    if (/[<>]/.test(t.replace(/\\lt|\\gt|\\le|\\ge/g, ''))) err(where, `dấu < hoặc > trần trong công thức (dùng \\lt, \\gt): ${t.slice(0, 100)}`);
    if (/\[_\]|\[F\]/.test(t)) err(where, `ô trống [_]/[F] nằm TRONG công thức: ${t.slice(0, 100)}`);
    let depth = 0; for (let i = 0; i < t.length; i++) { if (t[i] === '\\') { i++; continue; } if (t[i] === '{') depth++; if (t[i] === '}') depth--; if (depth < 0) break; }
    if (depth !== 0) err(where, `ngoặc { } không cân bằng trong công thức: ${t.slice(0, 100)}`);
  }
  if ((s.match(/\\\(/g) || []).length !== (s.match(/\\\)/g) || []).length) err(where, `thiếu \\( hoặc \\): ${s.slice(0, 120)}`);
}
const checkFig = (where, f) => { if (f == null || f === '') return; if (typeof f !== 'string' || !/^\s*<svg/.test(f)) err(where, 'fig phải là chuỗi SVG'); else if (/NaN|undefined|Infinity/.test(f)) err(where, 'hình SVG có toạ độ NaN/undefined'); };
const countBlanks = tpl => (tpl.match(/\[_\]|\[F\]/g) || []);

function checkQ(where, q) {
  if (!q || typeof q !== 'object') return err(where, 'dạng bài không trả về câu hỏi');
  const K = ['blanks', 'choice', 'rotate', 'shade', 'steps'];
  if (!K.includes(q.kind)) return err(where, `kind lạ: ${q.kind}`);
  if (!q.hint || !q.sol) err(where, 'thiếu hint hoặc sol');
  ['text', 'tpl', 'expr', 'hint', 'sol'].forEach(k => checkTex(`${where} (${k})`, q[k]));
  checkFig(where, q.fig);
  if (q.kind === 'blanks') {
    const b = countBlanks(q.tpl || ''); if (!b.length) err(where, 'tpl không có ô trống');
    if (!Array.isArray(q.ans) || q.ans.length !== b.length) err(where, `số ô trống (${b.length}) ≠ số đáp án (${(q.ans || []).length}): ${q.tpl}`);
    else b.forEach((t, i) => { const a = q.ans[i]; if (t === '[F]' && !(a && a.frac)) err(where, `ô [F] thứ ${i + 1} cần đáp án {frac:[tử,mẫu]}`); if (t === '[_]' && a && a.frac) err(where, `ô [_] thứ ${i + 1} lại có đáp án phân số`);
      const flat = [].concat(a); if (flat.some(v => v === undefined || v === null || (typeof v === 'number' && !isFinite(v)))) err(where, `đáp án ô ${i + 1} không hợp lệ: ${JSON.stringify(a)}`); });
  }
  if (q.kind === 'choice') {
    if (!Array.isArray(q.opts) || q.opts.length < 2) err(where, 'ít hơn 2 phương án');
    else { if (q.correct < 0 || q.opts[q.correct] !== q.ans) err(where, `đáp án không nằm trong phương án: ${String(q.ans).slice(0, 80)}`);
      if (new Set(q.opts).size !== q.opts.length) err(where, 'phương án bị trùng'); q.opts.forEach(o => checkTex(`${where} (phương án)`, o)); }
  }
  if (q.kind === 'steps') {
    if (!Array.isArray(q.steps) || !q.steps.length) err(where, 'QS thiếu steps');
    else q.steps.forEach((s, k) => { const w = `${where} bước ${k + 1}`; if (!s.tag || !s.ask) err(w, 'thiếu tag hoặc ask'); checkTex(w, s.ask); checkTex(w, s.hint);
      if (s.kind === 'choice') { if (s.correct < 0) err(w, 'đáp án không nằm trong phương án'); if (s.opts.length < 3) warn(w, 'nên có ≥ 3 phương án'); }
      else { const b = countBlanks(s.tpl || ''); if (b.length !== (s.ans || []).length) err(w, `số ô (${b.length}) ≠ số đáp án`); if (b.includes('[F]')) err(w, 'bước QS chỉ dùng ô [_]'); checkTex(w, s.tpl); } });
  }
  if (q.kind === 'rotate' && (q.target == null || !q.step)) err(where, 'rotate thiếu target/step');
  if (q.kind === 'shade' && (!q.n || !q.den || q.num * q.n % q.den)) err(where, 'shade: số phần tô phải là số nguyên (num × n chia hết cho den)');
}

/* ---------- 2. Phần học sinh ---------- */
const S = sandbox();
['config.js', 'assets/js/core.js', 'assets/js/figures.js', 'assets/js/generators.js'].forEach(f => run(S, f));
const CONFIG = S.CONFIG || vm.runInContext('typeof CONFIG !== "undefined" ? CONFIG : null', S);
let nQ = 0;
if (!CONFIG) err('config.js', 'không đọc được CONFIG');
else {
  [...idxSafe().matchAll(/<script src="(data\/[^"]+-bank\.js)"/g)].forEach(x => run(S, x[1]));     // ngân hàng câu hỏi dùng chung (vd data/lop10-giua-ki-bank.js) phải nạp trước data/<lớp>.js
  (CONFIG.grades || []).forEach(g => { if (!fs.existsSync(path.join(ROOT, 'data', g + '.js'))) err('config.js', `CONFIG.grades có "${g}" nhưng thiếu tệp data/${g}.js`); else run(S, `data/${g}.js`); });
  const App = vm.runInContext('App', S);
  App.grades.filter(g => !ONLY.length || ONLY.includes(g.id)).forEach(g => {
    const ids = new Set();
    g.lessons.forEach(l => {
      if (ids.has(l.id)) err(`${g.id}`, `trùng mã bài "${l.id}"`); ids.add(l.id);
      if (/^on-thi-/.test(l.id)) {   // chủ đề ôn thi vào 10: bắt buộc có kiến thức cần nhớ + lưu ý + mẹo
        const it = Array.isArray(l.intro) ? l.intro : [];
        if (it.length < 3) err(`${g.id}/${l.id}`, 'chủ đề ôn thi cần intro: ≥ 3 mục kiến thức cần nhớ');
        else if (!it.some(k => k.warn)) err(`${g.id}/${l.id}`, 'intro thiếu mục lưu ý (warn)');
        else if (!it.some(k => k.ex)) err(`${g.id}/${l.id}`, 'intro thiếu mẹo làm bài (ex)');
      }
      if (!g.topics.some(t => t.id === l.t)) err(`${g.id}/${l.id}`, `chủ đề ${l.t} chưa khai báo trong topics`);
      if (!Array.isArray(l.gens) || !l.gens.length) return err(`${g.id}/${l.id}`, 'không có dạng bài');
      l.gens.forEach((gen, gi) => { if (typeof gen !== 'function') return err(`${g.id}/${l.id}`, `dạng ${gi + 1} không phải hàm lv => câu hỏi`);
        [1, 2, 3].forEach(lv => { for (let r = 0; r < REPS; r++) { let q; const w = `${g.id}/${l.id} · dạng ${gi + 1} · mức ${lv}`;
          try { q = gen(lv); } catch (e) { err(w, 'lỗi khi sinh câu: ' + (e && e.message)); break; } nQ++; const before = errs.length; checkQ(w, q); if (errs.length > before) break; } }); });
    });
  });
}

/* ---------- 2b. Bài kiểm tra tương tác dành cho học sinh ---------- */
let nST = 0;
const studentTestFiles = [...idxSafe().matchAll(/<script src="(data\/[^"]+-kiem-tra\.js)"/g)].map(x => x[1]);
if (studentTestFiles.length) {
  run(S, 'assets/js/student-test.js');
  studentTestFiles.forEach(f => run(S, f));
  const ST = vm.runInContext('typeof StudentTest !== "undefined" ? StudentTest : null', S);
  (ST ? ST.TESTS : []).forEach(t => { const w0 = `bài kiểm tra học sinh ${t.grade}/${t.id}`; nST++;
    if (!t.grade || !t.id || !t.title || !t.topic || !t.time) err(w0, 'thiếu grade/id/title/topic/time');
    if (!Array.isArray(t.codes) || t.codes.length !== 4 || new Set(t.codes).size !== 4) err(w0, 'phải có đúng 4 mã đề khác nhau');
    const NC = t.counts || {mc: 12, tf: 3, short: 6};     // bài rút gọn khai báo counts + mcPt/tfPt/shortPt (tổng điểm phải = 10)
    if (!Array.isArray(t.mc) || t.mc.length !== NC.mc) err(w0, `Phần I phải có đúng ${NC.mc} câu`);
    if (!Array.isArray(t.tf) || t.tf.length !== NC.tf) err(w0, `Phần II phải có đúng ${NC.tf} câu`);
    if (!Array.isArray(t.short) || t.short.length !== NC.short) err(w0, `Phần III phải có đúng ${NC.short} câu`);
    if (t.counts) { const tot = NC.mc * (t.mcPt ?? .25) + NC.tf * (t.tfPt ?? 1) + NC.short * (t.shortPt ?? .5); if (Math.abs(tot - 10) > 1e-9) err(w0, `bài rút gọn phải có tổng điểm thô = 10 (đang ${tot})`); }
    (t.codes || []).forEach((code, ci) => { let v; const w1 = `${w0} mã ${code}`;
      try { v = ST.build(t, ci); } catch (e) { return err(w1, 'lỗi khi dựng đề: ' + e.message); }
      const cnt = [0, 0, 0, 0];
      v.mc.forEach((q, i) => { const w = `${w1} Phần I câu ${i + 1}`; cnt[q.a]++;
        if (!q.q || !q.sol || !Array.isArray(q.opts) || q.opts.length !== 4) err(w, 'cần q, sol và đúng 4 phương án');
        else if (new Set(q.opts).size !== 4) err(w, 'có phương án trùng nhau');
        [q.q, q.sol, ...(q.opts || [])].forEach(x => checkTex(w, x)); });
      if (Math.max(...cnt) - Math.min(...cnt) > 1) err(w1, `đáp án Phần I lệch: A/B/C/D = ${cnt.join('/')}`);
      v.tf.forEach((q, i) => { const w = `${w1} Phần II câu ${i + 1}`;
        if (!q.stem || !Array.isArray(q.items) || q.items.length !== 4) err(w, 'cần stem và đúng 4 ý');
        else { if (q.items.every(x => x.ok) || q.items.every(x => !x.ok)) err(w, 'phải có cả ý đúng và ý sai'); q.items.forEach(x => { if (!x.sol) err(w, 'mỗi ý cần lời giải'); [x.text,x.sol].forEach(y => checkTex(w,y)); }); }
        checkTex(w, q.stem); });
      v.short.forEach((q, i) => { const w = `${w1} Phần III câu ${i + 1}`;
        if (!q.q || q.ans == null || !q.sol) err(w, 'cần q, ans và sol'); [q.q,q.sol].forEach(x => checkTex(w,x)); });
    });
  });
}

/* ---------- 2c. Học mà chơi (20 câu/chủ đề, 4 phương án đổi vị trí) ---------- */
let nGame = 0;
const gameDataFiles = [...idxSafe().matchAll(/<script src="(data\/game-[^"]+\.js)"/g)].map(x => x[1]);
if (gameDataFiles.length) {
  if (!idxSafe().includes('src="assets/js/game.js"')) err('index.html', 'có kho trò chơi nhưng chưa nạp assets/js/game.js');
  run(S, 'assets/js/game.js');
  gameDataFiles.forEach(f => run(S, f));
  const GAME = vm.runInContext('typeof Game !== "undefined" ? Game : null', S);
  (GAME ? GAME.TOPICS : []).forEach(t => { const w0 = `Học mà chơi ${t.grade}/${t.id}`; nGame++;
    if (!t.grade || !t.id || !t.name || !t.desc || typeof t.generate !== 'function') err(w0, 'thiếu grade/id/name/desc/generate');
    if (!(CONFIG.grades || []).includes(t.grade)) err(w0, `lớp ${t.grade} chưa có trong CONFIG.grades`);
    const positions = [0, 0, 0, 0];
    for (let turn = 0; turn < 8; turn++) { let qs;
      try { qs = GAME.build(t.id, `kiem-tra-${turn}`, 20); } catch (e) { err(w0, 'không dựng được trận: ' + e.message); break; }
      if (!Array.isArray(qs) || qs.length !== 20) { err(w0, `mỗi trận phải có đúng 20 câu, hiện có ${(qs || []).length}`); break; }
      const signatures = new Set();
      qs.forEach((x, i) => { const w = `${w0} · trận ${turn + 1} · câu ${i + 1}`;
        if (!x.text || !x.explain || !Array.isArray(x.opts) || x.opts.length !== 4) err(w, 'cần đề, giải thích và đúng 4 phương án');
        else if (new Set(x.opts).size !== 4) err(w, 'có phương án trùng nhau');
        if (!Number.isInteger(x.correct) || x.correct < 0 || x.correct > 3) err(w, 'chỉ số đáp án đúng không hợp lệ'); else positions[x.correct]++;
        const sig = String(x.text).replace(/<[^>]+>/g, ''); if (signatures.has(sig)) err(w, 'trùng câu trong cùng một trận'); signatures.add(sig);
        [x.text, x.explain, ...(x.opts || [])].forEach(y => checkTex(w, y));
      });
    }
    if (positions.some(x => x === 0)) err(w0, `đáp án chưa đổi đủ bốn vị trí A/B/C/D: ${positions.join('/')}`);
  });
}

/* ---------- 3. Phần giáo viên ---------- */
const T = sandbox(), BOOKS = [], PRACT = [];
['config.js', 'assets/js/core.js', 'assets/js/figures.js', 'assets/js/generators.js'].forEach(f => run(T, f));
T.Lecture = { add: b => BOOKS.push(b), addPractice: (grade, id, groups) => PRACT.push({grade, id, groups}),
  addSgk: (grade, id, slides) => { const l = BOOKS.filter(b => b.grade === grade).flatMap(b => b.lessons).find(x => x.id === id); if (!l) err(`giải SGK ${grade}/${id}`, 'không tìm thấy bài giảng có mã này (addSgk phải nạp SAU tệp bài giảng)'); else l.sgk = slides; },
  addSheet: (grade, id, md) => { const w = `phiếu trên lớp ${grade}/${id}`, l = BOOKS.filter(b => b.grade === grade).flatMap(b => b.lessons).find(x => x.id === id);
    if (!l) { err(w, 'không tìm thấy bài giảng có mã này (addSheet phải nạp SAU tệp bài giảng)'); return; }
    l.sheet = md; const parts = String(md).split('<div style="page-break-after: always;"></div>');
    if (parts.length !== 2) err(w, 'cần đúng một thẻ page-break giữa Phần A (học sinh) và Phần B (giáo viên)');
    const t = String(md).replace(/\$\$[\s\S]+?\$\$|\$[^$\n]+?\$/g, ''); if (/\$/.test(t)) err(w, 'dấu $ chưa đóng/mở đủ cặp');
    if (/[²³π≤≥∈≠√∞±×÷⇒⇔]/.test(t)) err(w, 'còn ký tự toán Unicode ngoài $…$');
    if (!/Phần B|PHẦN B/.test(parts[1] || '')) err(w, 'thiếu Phần B (gợi ý giáo viên)'); } };
const gvHtml = fs.existsSync(path.join(ROOT, 'giao-vien/index.html')) ? rd('giao-vien/index.html') : '';
const gvFiles = [...gvHtml.matchAll(/<script src="(bai-giang\/[^"]+\.js)"/g)].map(x => 'giao-vien/' + x[1]);
fs.readdirSync(path.join(ROOT, 'giao-vien/bai-giang')).filter(f => f.endsWith('.js')).forEach(f => { if (!gvFiles.includes('giao-vien/bai-giang/' + f)) err('giao-vien/index.html', `chưa nạp tệp bai-giang/${f} (thêm thẻ <script>)`); });
run(T, 'assets/js/kiemtra.js');
if (/KiemTra\.add/.test(gvFiles.map(f => fs.existsSync(path.join(ROOT, f)) ? rd(f) : '').join('')) && !gvHtml.includes('src="../assets/js/kiemtra.js"')) err('giao-vien/index.html', 'có đề kiểm tra nhưng chưa nạp <script src="../assets/js/kiemtra.js">');
[...gvHtml.matchAll(/<script src="\.\.\/(data\/[^"]+-bank\.js)"/g)].forEach(x => run(T, x[1]));     // ngân hàng câu hỏi dùng chung (data/*-bank.js) nạp trước các tệp bài giảng
gvFiles.forEach(f => run(T, f));
const KINDS = ['title', 'kt', 'method', 'vd', 'lt', 'sum']; let nS = 0;
BOOKS.forEach(b => {
  if (!b.grade || !b.gradeName || !b.chapter || !Array.isArray(b.lessons)) return err('Lecture.add', `thiếu grade/gradeName/chapter/lessons (${b.chapter || '?'})`);
  b.lessons.forEach(l => { const w0 = `${b.grade}/${l.id}`;
    if (!l.id || !l.name || !Array.isArray(l.slides) || !l.slides.length) return err(w0, 'bài giảng thiếu id/name/slides');
    if (l.sgk && (!Array.isArray(l.sgk) || !l.sgk.some(x => x.kind === 'vd'))) err(w0, 'giải SGK cần mảng trang chiếu có ít nhất một trang vd');
    l.slides.concat(l.sgk || []).forEach((s, i) => { const w = `${w0} trang ${i + 1}${i >= l.slides.length ? ' (giải SGK)' : ''}`; nS++;
      if (!KINDS.includes(s.kind)) err(w, `kind lạ: ${s.kind}`);
      if ((s.kind === 'vd' || s.kind === 'lt') && (!s.de || !Array.isArray(s.sol))) err(w, 'ví dụ/luyện tập cần de và sol:[…]');
      if (['kt', 'method', 'sum', 'title'].includes(s.kind) && !s.title) err(w, 'thiếu title');
      if (s.figAt != null && s.figAt > (s.sol || []).length) err(w, 'figAt lớn hơn số bước lời giải');
      checkFig(w, s.fig); ['title', 'body', 'de', 'ans', 'sub'].forEach(k => checkTex(w, s[k])); (s.sol || []).concat(s.steps || [], s.points || []).forEach(x => checkTex(w, x)); }); });
  const ids = b.lessons.map(l => l.id), dup = ids.filter((x, i) => ids.indexOf(x) !== i); if (dup.length) warn(`${b.grade}`, `mã bài giảng trùng trong một chương: ${dup.join(', ')}`);
});
PRACT.forEach(p => { const w0 = `luyện tập ${p.grade}/${p.id}`;
  if (!BOOKS.some(b => b.grade === p.grade && b.lessons.some(l => l.id === p.id))) err(w0, 'không tìm thấy bài giảng có mã này (addPractice phải nạp SAU tệp bài giảng)');
  const items = p.groups.flatMap(g => { if (!g.dang || !Array.isArray(g.items)) err(w0, 'mỗi nhóm cần {dang, items:[…]}'); return g.items || []; });
  const cb = items.filter(x => !x.hard).length, r = items.length ? cb / items.length : 0;
  if (r < .65 || r > .75) err(w0, `tỉ lệ cơ bản ${Math.round(r * 100)}% (cần 65–75 %; 10 bài = 7 cơ bản + 3 vận dụng)`);
  items.forEach((x, i) => { const w = `${w0} bài ${i + 1}`; if (!x.de || !Array.isArray(x.sol) || !x.sol.length) err(w, 'cần de và sol:[…]'); if (x.draw && !x.fig) err(w, 'draw cần kèm fig (hình đáp án)');
    checkFig(w, x.fig); [x.de, x.ans, ...(x.sol || [])].forEach(t => checkTex(w, t)); }); });

/* ---------- 3b. Đề kiểm tra (KiemTra.add) ---------- */
let nKT = 0;
const KT = vm.runInContext('typeof KiemTra !== "undefined" ? KiemTra : null', T);
(KT ? KT.TESTS : []).forEach(t => { const w0 = `đề kiểm tra ${t.grade}/${t.id}`; nKT++;
  ['grade', 'id', 'title', 'chapter', 'subject', 'time', 'school', 'year'].forEach(k => { if (!t[k]) err(w0, `thiếu trường ${k}`); });
  if (!Array.isArray(t.codes) || !t.codes.length || new Set(t.codes).size !== t.codes.length) err(w0, 'codes phải là danh sách mã đề khác nhau');
  if (!Array.isArray(t.bai) || !t.bai.length) err(w0, 'thiếu danh sách bai (dùng cho ma trận)');
  const tot = t.mc.length * (t.mcPt || .25) + t.tf.length + t.essay.reduce((a, e) => a + e.pts, 0);
  if (Math.abs(tot - 10) > 1e-9) err(w0, `tổng điểm = ${tot} (phải bằng 10: Phần I theo mcPt (mặc định 0,25)/câu, Phần II 1/câu, Phần III theo pts)`);
  const orders = new Set(); const ABCD_ = 'ABCD';
  (t.codes || []).forEach((code, ci) => { const w1 = `${w0} mã ${code}`; let v;
    try { v = KT.build(t, ci); } catch (e) { return err(w1, 'lỗi khi trộn đề: ' + e.message); }
    orders.add(v.mc.map(x => x.src).join(','));
    if (t.like) { const bt = KT.TESTS.find(x => x.grade === t.grade && x.id === t.like), b = bt ? KT.build(bt, ci) : null;
      if (!b) err(w1, `like="${t.like}" không tìm thấy đề gốc`); else {
        v.mc.forEach((x, i) => { const y = b.mc[i]; if (x.q !== y.q || x.opts[x.a] !== y.opts[y.a] || [...x.opts].sort().join('|') !== [...y.opts].sort().join('|')) err(w1, `bộ đổi phương án: câu ${i + 1} khác đề gốc`); if (x.a === y.a) err(w1, `bộ đổi phương án: câu ${i + 1} đáp án vẫn ở chữ ${ABCD_[x.a]}`); if (x.opts.join('|') === y.opts.join('|')) err(w1, `bộ đổi phương án: câu ${i + 1} không đổi thứ tự phương án`); });
        if (JSON.stringify(v.tf) !== JSON.stringify(b.tf) || JSON.stringify(v.essay) !== JSON.stringify(b.essay)) err(w1, 'bộ đổi phương án: Phần II/III phải giống đề gốc'); } }
    v.mc.forEach((x, i) => { const w = `${w1} Phần I câu ${i + 1} (gốc ${x.src})`;
      if (!x.q || !Array.isArray(x.opts) || x.opts.length !== 4) err(w, 'cần q và đúng 4 phương án'); else if (new Set(x.opts).size !== 4) err(w, 'có phương án trùng nhau');
      if (!(x.bai >= 1 && x.bai <= (t.bai || []).length)) err(w, 'bai phải là số thứ tự bài trong t.bai');
      [x.q, ...(x.opts || [])].forEach(s => checkTex(w, s)); });
    const cnt = [0, 0, 0, 0]; v.mc.forEach(x => cnt[x.a]++); if (Math.max(...cnt) - Math.min(...cnt) > 1) err(w1, `đáp án Phần I lệch: A/B/C/D = ${cnt.join('/')}`);
    v.tf.forEach((x, i) => { const w = `${w1} Phần II câu ${i + 1}`; if (!x.stem || x.items.length !== 4) err(w, 'cần stem và đúng 4 ý');
      if (x.items.every(it => it.ok) || x.items.every(it => !it.ok)) err(w, 'mỗi câu phải có cả ý Đ và ý S'); checkTex(w, x.stem); x.items.forEach(it => checkTex(w, it.text)); });
    v.essay.forEach((e, i) => { const w = `${w1} Phần III bài ${i + 1}`; if (!e.de || !Array.isArray(e.rows) || !e.rows.length) return err(w, 'make(ci) phải trả về {de, rows:[[nội dung, điểm], …]}');
      const sp = e.rows.reduce((a, r) => a + r[1], 0); if (Math.abs(sp - e.pts) > 1e-9) err(w, `tổng điểm hướng dẫn chấm ${sp} ≠ pts ${e.pts}`); checkTex(w, e.de); e.rows.forEach(r => checkTex(w, r[0]));
      if (t.short) { const mm = e.rows.map(r => (r[0].match(/Đáp số: <b>([^<]*)<\/b>/) || [])[1]).filter(Boolean); if (!mm.length) err(w, 'đề trả lời ngắn: hướng dẫn chấm phải có "Đáp số: <b>…</b>"'); mm.forEach(x => { if (x.replace(/\s/g, '').length > 4) err(w, `đáp số trả lời ngắn "${x}" dài quá 4 kí tự`); }); } });
    try { checkTex(`${w1} (bản in)`, KT.paper(t, ci)); } catch (e) { err(w1, 'lỗi khi dựng bản in: ' + e.message); } });
  if (!t.keepOrder && (t.codes || []).length > 1 && orders.size < t.codes.length) warn(w0, 'có hai mã đề trùng thứ tự câu Phần I');
  try { checkTex(`${w0} (đáp án)`, KT.keyDoc(t)); } catch (e) { err(w0, 'lỗi khi dựng đáp án: ' + e.message); } });

/* ---------- 4. Liên kết trang học sinh ---------- */
const idx = rd('index.html');
['config.js', 'assets/js/core.js', 'assets/js/game.js', 'data/game-lop9.js', 'assets/js/engine.js'].forEach(f => { if (!idx.includes(`src="${f}"`)) err('index.html', `thiếu <script src="${f}">`); });
function idxSafe(){ return fs.existsSync(path.join(ROOT, 'index.html')) ? rd('index.html') : ''; }

/* ---------- Bản đồ nội dung (dùng cho tools/goi-chatgpt.js): BAN_DO=tệp.md node tools/kiem-tra.js 3 ---------- */
if (process.env.BAN_DO) try {
  const App = vm.runInContext('typeof App !== "undefined" ? App : null', S), L = ['# BẢN ĐỒ NỘI DUNG HIỆN CÓ (tự sinh – ' + new Date().toLocaleString('vi-VN') + ')', ''];
  L.push('## A. Phần học sinh (`data/<lớp>.js`)');
  (App ? App.grades : []).forEach(g => { L.push('', `### ${g.id} – ${g.name || ''} (${g.lessons.length} bài)`);
    g.topics.forEach(t => { const ls = g.lessons.filter(l => l.t === t.id); if (!ls.length) return;
      L.push(`- **Chủ đề ${t.id}. ${t.name}**`); ls.forEach(l => L.push(`  - \`${l.id}\` ${l.name} – ${l.gens.length} dạng`)); }); });
  L.push('', '## B. Bài giảng giáo viên (`giao-vien/bai-giang/<lớp>.js`) và phiếu luyện tập (`<lớp>-luyen-tap.js`)');
  BOOKS.forEach(b => { L.push('', `### ${b.grade} – ${b.chapter}`);
    b.lessons.forEach(l => L.push(`- \`${l.id}\` ${l.name} – ${l.slides.length} trang${PRACT.some(p => p.grade === b.grade && p.id === l.id) ? ' · **có phiếu luyện tập**' : ' · chưa có phiếu luyện tập'}`)); });
  fs.writeFileSync(process.env.BAN_DO, L.join('\n') + '\n');
} catch (e) { console.log('  ⚠ không tạo được bản đồ: ' + e.message); }

/* ---------- Báo cáo ---------- */
console.log(`Tệp JS: ${jsFiles.length} · Câu hỏi đã sinh: ${nQ} (${REPS} lần/dạng/mức) · Bài kiểm tra học sinh: ${nST} · Chủ đề trò chơi: ${nGame} · Trang bài giảng: ${nS} · Phiếu luyện tập: ${PRACT.length} · Đề kiểm tra: ${nKT}`);
[...new Set(warns)].slice(0, 15).forEach(x => console.log('  ⚠ ' + x));
[...new Set(errs)].slice(0, 40).forEach(x => console.log('  ✗ ' + x));
if (errs.length > 40) console.log(`  … và ${errs.length - 40} lỗi khác`);
console.log('KẾT QUẢ:', errs.length ? `CHƯA ĐẠT ✗ (${errs.length} lỗi)` : 'ĐẠT ✓');
process.exit(errs.length ? 1 : 0);
