/* =====================================================================
   KIỂM TRA – đề kiểm tra in A4 cho GIÁO VIÊN (trang giao-vien/).
   Nội dung: giao-vien/bai-giang/<lớp>-kiem-tra.js gọi KiemTra.add({...}) (xem tệp mẫu lop11-kiem-tra.js).
   – Trộn mã đề có HẠT GIỐNG CỐ ĐỊNH theo (lớp, mã bài kiểm tra, mã đề): in lại bao nhiêu lần cũng ra đúng đề cũ.
   – Phần I: đảo thứ tự câu và phương án; đáp án đúng được rải đều A/B/C/D.
   – Phần II: đảo thứ tự câu; mỗi ý chọn bản ĐÚNG hoặc bản SAI (mỗi câu luôn có cả Đ và S).
   – Phần III: mỗi mã đề một bộ số (hàm make(ci)).
   Đường link: #/lop11/kiem-tra/c1/de (đề, cả các mã) · …/de-112 (một mã) · …/da (đáp án – hướng dẫn chấm).
   ===================================================================== */
const KiemTra = (() => {
  const TESTS = [];
  const add = t => TESTS.push(t);
  const ABCD = 'ABCD';
  const rng = s => { let h = 2166136261; for(const c of s) h = Math.imul(h ^ c.charCodeAt(0), 16777619);
    return () => { h = h + 0x6D2B79F5 | 0; let x = Math.imul(h ^ h >>> 15, 1 | h); x = x + Math.imul(x ^ x >>> 7, 61 | x) ^ x; return ((x ^ x >>> 14) >>> 0) / 4294967296; }; };
  const vn = x => String(x).replace('.', ',');
  const mcP = t => t.mcPt || .25;                                            // điểm mỗi câu Phần I (mặc định 0,25; đề 10 câu dùng 0,5)
  const pt = x => vn((+x).toFixed(2).replace(/0+$/, '').replace(/\.$/, ''));   // 0,25 · 1 · 0,5

  /* ---------- Trộn một mã đề ---------- */
  function build(t, ci){
    const r = rng(`${t.grade}|${t.id}|${t.codes[ci]}`);
    const sh = a => { a = a.slice(); for(let i = a.length - 1; i > 0; i--){ const j = Math.floor(r() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
    if(t.like){                                   // Bộ đề "đổi vị trí phương án": giữ nguyên câu hỏi, thứ tự câu, ý Đ/S và Phần III của đề gốc cùng số thứ tự mã; chỉ xáo lại phương án A–D
      const b = build(TESTS.find(x => x.grade === t.grade && x.id === t.like), ci), n = b.mc.length; let letters;
      for(let k = 0; k < 500; k++){ letters = sh(b.mc.map((_, i) => i % 4)); if(letters.every((l, i) => l !== b.mc[i].a)) break; }   // đáp án mỗi câu đổi sang chữ khác đề gốc
      const mc = b.mc.map((x, i) => { const right = x.opts[x.a], opts = sh(x.opts.filter((_, j) => j !== x.a)); opts.splice(letters[i], 0, right); return {...x, opts, a:letters[i]}; });
      return {code:t.codes[ci], mc, tf:b.tf, essay:b.essay};
    }
    const order = sh(t.mc.map((x, i) => ({...(typeof x === 'function' ? x(ci) : x), src:i + 1})));
    const letters = sh(order.map((_, i) => i % 4));                       // rải đều đáp án A/B/C/D
    const mc = order.map((x, i) => { const k = letters[i], opts = sh(x.opts.slice(1)); opts.splice(k, 0, x.opts[0]); return {...x, opts, a:k}; });
    const tfs = sh(t.tf.map((x, i) => ({...x, src:i + 1}))), nIt = tfs.reduce((s, x) => s + x.items.length, 0); let picks;
    do { picks = tfs.map(x => { let p; do { p = x.items.map(() => r() < .5); } while(p.every(Boolean) || !p.some(Boolean)); return p; }); }   // mỗi câu có cả Đ và S
    while(Math.abs(picks.flat().filter(Boolean).length - nIt / 2) > nIt / 8);                                                                // cả phần: Đ/S gần cân bằng
    const tf = tfs.map((x, i) => ({...x, items:x.items.map((p, j) => ({text:p[picks[i][j] ? 0 : 1], ok:picks[i][j]}))}));
    const essay = t.essay.map(e => ({...e, ...e.make(ci)}));
    return {code:t.codes[ci], mc, tf, essay};
  }

  /* ---------- Dàn phương án theo độ dài: 4 cột / 2 cột / 1 cột ---------- */
  const plain = s => s.replace(/<[^>]+>/g, '').replace(/\\\(|\\\)/g, '').replace(/\\dfrac\{([^{}]*)\}\{([^{}]*)\}/g, '$1/$2').replace(/\\(left|right|mathbb|tfrac|dfrac|quad|,|;|\s)/g, '').replace(/\\[a-zA-Z]+/g, 'x').replace(/[{}^_\\]/g, '');
  const cols = opts => { const n = Math.max(...opts.map(o => plain(o).length)); return n <= 13 ? 4 : n <= 30 ? 2 : 1; };

  /* ---------- Phần đầu đề ---------- */
  const head = (t, code, key) => `<header class="kt-head">
      <div class="kt-l"><b>${t.school}</b><br><b>${t.group}</b><br><span class="kt-small">${key ? '' : `(Đề gồm 3 phần, ${t.mc.length + t.tf.length + t.essay.length} câu)`}</span></div>
      <div class="kt-r"><b>${key ? 'ĐÁP ÁN – HƯỚNG DẪN CHẤM<br>' : ''}ĐỀ KIỂM TRA ${t.chapter.split('.')[0].toUpperCase()}${t.set ? ' – ' + t.set.toUpperCase() : ''}</b><br>NĂM HỌC ${t.year}<br>Môn: <b>${t.subject}</b> – Sách ${t.book}<br><i>Thời gian làm bài: ${t.time} phút, không kể thời gian phát đề</i></div></header>`
    + (key ? '' : `<div class="kt-who"><span>Họ và tên: <i class="kt-dots"></i></span><span class="kt-cls">Lớp: <i class="kt-dots"></i></span><span class="kt-code">Mã đề ${code}</span></div>`);

  const grid = t => `<table class="kt-grid"><tr><th>Phần I</th>${t.mc.map((_, i) => `<td>${i + 1}</td>`).join('')}</tr><tr><th>Chọn</th>${t.mc.map(() => '<td></td>').join('')}</tr></table>
    <table class="kt-grid"><tr><th>Phần II</th>${t.tf.map((_, i) => `<td colspan="4">Câu ${i + 1}</td>`).join('')}</tr><tr><th>Ý</th>${t.tf.map(() => 'abcd'.split('').map(x => `<td>${x}</td>`).join('')).join('')}</tr><tr><th>Đ / S</th>${t.tf.map(() => '<td></td>'.repeat(4)).join('')}</tr></table>`;

  /* ---------- Đề một mã ---------- */
  function paper(t, ci){
    const v = build(t, ci);
    const I = v.mc.map((x, i) => { const c = cols(x.opts);
      return `<div class="kt-q"><b>Câu ${i + 1}.</b> ${x.q}<div class="kt-opts c${c}">${x.opts.map((o, k) => `<span><b>${ABCD[k]}.</b> ${o}</span>`).join('')}</div></div>`; }).join('');
    const II = v.tf.map((x, i) => `<div class="kt-q"><b>Câu ${i + 1}.</b> ${x.stem}<div class="kt-tf">${x.items.map((it, k) => `<span><b>${'abcd'[k]})</b> ${it.text}</span>`).join('')}</div></div>`).join('');
    const III = v.essay.map((x, i) => t.short ? `<div class="kt-q"><b>Câu ${i + 1} (${pt(x.pts)} điểm).</b> ${x.de} <span class="kt-fill">Đáp số: <i class="kt-dots"></i></span></div>` : `<div class="kt-q"><b>Bài ${i + 1} (${pt(x.pts)} điểm).</b> ${x.de}</div>`).join('');
    const sI = t.mc.length * mcP(t), sII = t.tf.length, sIII = t.essay.reduce((s, e) => s + e.pts, 0);
    return `<article class="ws kt">${head(t, v.code, false)}
      <div class="kt-ans"><p class="kt-small"><b>Bảng trả lời Phần I, II</b> (học sinh ghi vào bảng; Phần III làm vào giấy kiểm tra):</p>${grid(t)}</div>
      <h3>Phần I. Trắc nghiệm nhiều phương án lựa chọn <small>(${pt(sI)} điểm)</small></h3>
      <p class="kt-small">Học sinh trả lời từ câu 1 đến câu ${t.mc.length}. Mỗi câu hỏi chỉ chọn <b>một</b> phương án.</p>${I}
      <h3>Phần II. Trắc nghiệm đúng sai <small>(${pt(sII)} điểm)</small></h3>
      <p class="kt-small">Học sinh trả lời từ câu 1 đến câu ${t.tf.length}. Trong mỗi ý a), b), c), d) ở mỗi câu, học sinh chọn <b>đúng (Đ)</b> hoặc <b>sai (S)</b>.</p>${II}
      <h3>Phần III. ${t.short ? 'Trắc nghiệm trả lời ngắn' : 'Tự luận'} <small>(${pt(sIII)} điểm)</small></h3>${t.short ? '<p class="kt-small">Học sinh ghi kết quả (không cần trình bày) vào chỗ trống; làm nháp ở mặt sau.</p>' : ''}${III}
      <p class="kt-end">———— HẾT ————<small>Học sinh không được sử dụng tài liệu. Giáo viên coi kiểm tra không giải thích gì thêm.</small></p></article>`;
  }

  /* ---------- Đáp án – hướng dẫn chấm (mọi mã) ---------- */
  function keyDoc(t){
    const nb = t.bai.length, cnt = (arr, get) => t.bai.map((_, b) => arr.filter(x => get(x) === b + 1).length);
    const mcB = cnt(t.mc.map((x, i) => typeof x === 'function' ? x(0) : x), x => x.bai), tfB = cnt(t.tf, x => x.bai), esB = t.bai.map((_, b) => t.essay.filter(e => e.bai === b + 1).reduce((s, e) => s + e.pts, 0));
    const pts = t.bai.map((_, b) => mcB[b] * mcP(t) + tfB[b] + esB[b]);
    const matrix = `<table class="kt-mx"><tr><th rowspan="2">Nội dung</th><th>Phần I – TN 1 đáp án</th><th>Phần II – Đúng/Sai</th><th>Phần III – ${t.short ? 'Trả lời ngắn' : 'Tự luận'}</th><th rowspan="2">Tổng điểm</th></tr>
        <tr><th>${(t.levels||[])[0] || 'Nhận biết'} · số câu</th><th>${(t.levels||[])[1] || 'Nhận biết'} · số câu (4 ý)</th><th>${(t.levels||[])[2] || 'Vận dụng thực tế'} · số ${t.short ? 'câu' : 'bài'}</th></tr>
        ${t.bai.map((b, i) => `<tr><td class="kt-lft">${b}</td><td>${mcB[i] || ''}</td><td>${tfB[i] || ''}</td><td>${esB[i] ? t.essay.filter(e => e.bai === i + 1).length : ''}</td><td>${pt(pts[i])}</td></tr>`).join('')}
        <tr><th class="kt-lft">Tổng</th><th>${t.mc.length} câu · ${pt(t.mc.length * mcP(t))} đ</th><th>${t.tf.length} câu · ${t.tf.length} đ</th><th>${t.essay.length} ${t.short ? 'câu' : 'bài'} · ${pt(t.essay.reduce((s, e) => s + e.pts, 0))} đ</th><th>${pt(pts.reduce((a, b) => a + b, 0))}</th></tr></table>`;
    const scale = `<ul class="kt-scale"><li><b>Phần I:</b> mỗi câu đúng <b>${pt(mcP(t))}</b> điểm.</li>
        <li><b>Phần II:</b> mỗi câu tối đa 1 điểm – đúng 1 ý: <b>0,1</b> đ; đúng 2 ý: <b>0,25</b> đ; đúng 3 ý: <b>0,5</b> đ; đúng cả 4 ý: <b>1</b> đ.</li>
        <li><b>Phần III:</b> ${t.short ? 'mỗi câu đúng kết quả cho <b>1</b> điểm, sai kết quả không cho điểm.' : 'chấm theo hướng dẫn từng mã đề; học sinh làm cách khác đúng vẫn cho điểm tối đa phần đó.'}</li></ul>`;
    const one = ci => { const v = build(t, ci);
      return `<section class="kt-key"><h3>Mã đề ${v.code}</h3>
        <table class="kt-grid"><tr><th>Phần I</th>${v.mc.map((_, i) => `<td>${i + 1}</td>`).join('')}</tr><tr><th>Đáp án</th>${v.mc.map(x => `<td><b>${ABCD[x.a]}</b></td>`).join('')}</tr></table>
        <table class="kt-grid kt-tfk"><tr><th>Phần II</th>${v.tf.map((_, i) => `<td colspan="4">Câu ${i + 1}</td>`).join('')}</tr><tr><th>Ý</th>${v.tf.map(() => 'abcd'.split('').map(x => `<td>${x}</td>`).join('')).join('')}</tr><tr><th>Đáp án</th>${v.tf.map(x => x.items.map(it => `<td><b>${it.ok ? 'Đ' : 'S'}</b></td>`).join('')).join('')}</tr></table>
        <table class="kt-rub"><tr><th>Phần III</th><th>Nội dung</th><th>Điểm</th></tr>${v.essay.map((e, i) => e.rows.map((r, k) => `<tr>${k === 0 ? `<td rowspan="${e.rows.length}"><b>${t.short ? 'Câu' : 'Bài'} ${i + 1}</b><br>(${pt(e.pts)} đ)</td>` : ''}<td class="kt-lft">${r[0]}</td><td>${pt(r[1])}</td></tr>`).join('')).join('')}</table></section>`; };
    return `<article class="ws kt kt-da">${head(t, '', true)}
      <h3>1. Ma trận đề</h3>${matrix}<h3>2. Thang điểm</h3>${scale}<h3>3. Đáp án các mã đề</h3>${t.codes.map((_, ci) => one(ci)).join('')}
      <p class="kt-end">———— HẾT ————</p></article>`;
  }

  /* ---------- Trang giáo viên ---------- */
  const find = (g, id) => TESTS.find(t => t.grade === g && t.id === id);
  const section = gid => { const ts = TESTS.filter(t => t.grade === gid); if(!ts.length) return '';
    return `<section class="topic kt-sec"><h2><small>Kiểm tra</small>Đề kiểm tra in A4 (4 mã đề, đáp án riêng)</h2><ol class="lk-list">${ts.map(t => `<li><div class="lk-li"><b>${t.title} – ${t.subject}</b>
      <small>${t.chapter} · ${t.time} phút · ${t.codes.length} mã đề (${t.codes.join(', ')}) · ${t.mc.length} câu trắc nghiệm + ${t.tf.length} câu đúng/sai + ${t.essay.length} ${t.short ? 'câu trả lời ngắn' : 'bài tự luận'}</small></div>
      <div class="lk-acts"><a class="btn primary small" href="#/${gid}/kiem-tra/${t.id}/de">📄 Đề ${t.codes.length} mã</a><a class="btn small" href="#/${gid}/kiem-tra/${t.id}/da">🔑 Đáp án</a></div></li>`).join('')}</ol></section>`; };

  // Trả về true nếu đường link là trang kiểm tra (đã vẽ xong)
  function route(){
    const mm = location.hash.match(/^#\/(lop\d+)\/kiem-tra\/([^/]+)\/(de|da)(?:-(\d+))?$/); if(!mm) return false;
    const t = find(mm[1], mm[2]); if(!t) return false;
    const view = mm[3], one = mm[4], ci = t.codes.indexOf(one);
    const body = view === 'da' ? keyDoc(t) : (ci >= 0 ? [ci] : t.codes.map((_, i) => i)).map(i => paper(t, i)).join('');
    const sel = `<select id="ktSel" aria-label="Chọn mã đề"><option value="de">Đề – cả ${t.codes.length} mã</option>${t.codes.map(c => `<option value="de-${c}" ${one === c ? 'selected' : ''}>Đề – mã ${c}</option>`).join('')}<option value="da" ${view === 'da' ? 'selected' : ''}>Đáp án – hướng dẫn chấm</option></select>`;
    document.body.classList.remove('gv-wide');
    $('#app').innerHTML = `<div class="toolbar ws-bar"><a class="back" href="#/${mm[1]}">← Danh sách bài</a><div class="row">${sel}<button class="btn primary small" onclick="print()">🖨️ In / Lưu PDF</button></div></div>
      <p class="kt-tip">Mẹo in: khổ A4, <b>in 2 mặt</b> – mỗi mã đề vừa 1 tờ; bật “Đồ hoạ nền” nếu muốn in viền bảng đậm.</p><div class="kt-doc">${body}</div>`;
    $('#ktSel').onchange = e => { location.hash = `#/${mm[1]}/kiem-tra/${t.id}/${e.target.value}`; };
    document.title = `${view === 'da' ? 'Đáp án' : 'Đề'} ${t.title} – ${t.subject}${one ? ' – mã ' + one : ''}`; scrollTo(0, 0);
    return true;
  }
  return { add, build, paper, keyDoc, section, route, TESTS };
})();
