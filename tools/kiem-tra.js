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
  (CONFIG.grades || []).forEach(g => { if (!fs.existsSync(path.join(ROOT, 'data', g + '.js'))) err('config.js', `CONFIG.grades có "${g}" nhưng thiếu tệp data/${g}.js`); else run(S, `data/${g}.js`); });
  const App = vm.runInContext('App', S);
  App.grades.filter(g => !ONLY.length || ONLY.includes(g.id)).forEach(g => {
    const ids = new Set();
    g.lessons.forEach(l => {
      if (ids.has(l.id)) err(`${g.id}`, `trùng mã bài "${l.id}"`); ids.add(l.id);
      if (!g.topics.some(t => t.id === l.t)) err(`${g.id}/${l.id}`, `chủ đề ${l.t} chưa khai báo trong topics`);
      if (!Array.isArray(l.gens) || !l.gens.length) return err(`${g.id}/${l.id}`, 'không có dạng bài');
      l.gens.forEach((gen, gi) => { if (typeof gen !== 'function') return err(`${g.id}/${l.id}`, `dạng ${gi + 1} không phải hàm lv => câu hỏi`);
        [1, 2, 3].forEach(lv => { for (let r = 0; r < REPS; r++) { let q; const w = `${g.id}/${l.id} · dạng ${gi + 1} · mức ${lv}`;
          try { q = gen(lv); } catch (e) { err(w, 'lỗi khi sinh câu: ' + (e && e.message)); break; } nQ++; const before = errs.length; checkQ(w, q); if (errs.length > before) break; } }); });
    });
  });
}

/* ---------- 3. Phần giáo viên ---------- */
const T = sandbox(), BOOKS = [], PRACT = [];
['config.js', 'assets/js/core.js', 'assets/js/figures.js', 'assets/js/generators.js'].forEach(f => run(T, f));
T.Lecture = { add: b => BOOKS.push(b), addPractice: (grade, id, groups) => PRACT.push({grade, id, groups}) };
const gvHtml = fs.existsSync(path.join(ROOT, 'giao-vien/index.html')) ? rd('giao-vien/index.html') : '';
const gvFiles = [...gvHtml.matchAll(/<script src="(bai-giang\/[^"]+\.js)"/g)].map(x => 'giao-vien/' + x[1]);
fs.readdirSync(path.join(ROOT, 'giao-vien/bai-giang')).filter(f => f.endsWith('.js')).forEach(f => { if (!gvFiles.includes('giao-vien/bai-giang/' + f)) err('giao-vien/index.html', `chưa nạp tệp bai-giang/${f} (thêm thẻ <script>)`); });
gvFiles.forEach(f => run(T, f));
const KINDS = ['title', 'kt', 'method', 'vd', 'lt', 'sum']; let nS = 0;
BOOKS.forEach(b => {
  if (!b.grade || !b.gradeName || !b.chapter || !Array.isArray(b.lessons)) return err('Lecture.add', `thiếu grade/gradeName/chapter/lessons (${b.chapter || '?'})`);
  b.lessons.forEach(l => { const w0 = `${b.grade}/${l.id}`;
    if (!l.id || !l.name || !Array.isArray(l.slides) || !l.slides.length) return err(w0, 'bài giảng thiếu id/name/slides');
    l.slides.forEach((s, i) => { const w = `${w0} trang ${i + 1}`; nS++;
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

/* ---------- 4. Liên kết trang học sinh ---------- */
const idx = rd('index.html');
['config.js', 'assets/js/core.js', 'assets/js/engine.js'].forEach(f => { if (!idx.includes(`src="${f}"`)) err('index.html', `thiếu <script src="${f}">`); });

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
console.log(`Tệp JS: ${jsFiles.length} · Câu hỏi đã sinh: ${nQ} (${REPS} lần/dạng/mức) · Trang bài giảng: ${nS} · Phiếu luyện tập: ${PRACT.length}`);
[...new Set(warns)].slice(0, 15).forEach(x => console.log('  ⚠ ' + x));
[...new Set(errs)].slice(0, 40).forEach(x => console.log('  ✗ ' + x));
if (errs.length > 40) console.log(`  … và ${errs.length - 40} lỗi khác`);
console.log('KẾT QUẢ:', errs.length ? `CHƯA ĐẠT ✗ (${errs.length} lỗi)` : 'ĐẠT ✓');
process.exit(errs.length ? 1 : 0);
