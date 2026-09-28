/* =====================================================================
   LECTURE – Bài giảng trình chiếu cho GIÁO VIÊN (trang giao-vien/).
   Mỗi bài là một dãy trang chiếu: tiêu đề → kiến thức trọng tâm → dạng bài (phương pháp)
   → ví dụ (đề + lời giải tự luận hiện TỪNG BƯỚC) → luyện tập → tổng kết.
   Nội dung: giao-vien/bai-giang/<lớp>.js gọi Lecture.add({...}).
   Phím: → / Space / PageDown = hiện bước tiếp hoặc sang trang · ← / PageUp = trang trước
         Enter = hiện hết lời giải · M = mục lục · T = nền tối · Esc = thoát.
   ===================================================================== */
const Lecture = (() => {
  const BOOKS = [];                        // [{grade, gradeName, chapter, lessons:[{id,name,desc,slides}]}]
  const add = b => BOOKS.push(b);
  // Phiếu luyện tập: Lecture.addPractice('lop10', 'bai-3', [{dang:'Tên dạng', items:[{de, sol:[…], ans, fig, draw:{x,y}, hard:true}]}])
  //   hard:true = bài vận dụng (★); còn lại là cơ bản. draw: học sinh tự vẽ trên hệ trục trống (fig chỉ hiện ở bản lời giải / cuối lời giải khi chiếu).
  const addPractice = (grade, id, groups) => { const l = BOOKS.filter(b => b.grade === grade).flatMap(b => b.lessons).find(x => x.id === id);
    if(l) l.practice = groups; else console.warn('Không thấy bài', grade, id); };
  let deck = null, idx = 0, step = 0, dark = false, el = null;

  /* ---------- Trang chủ giáo viên: chọn lớp → danh sách bài của lớp đó (#/lop8) ---------- */
  const grades = () => { const m = new Map(); BOOKS.forEach((b, bi) => { if(!m.has(b.grade)) m.set(b.grade, {id:b.grade, name:b.gradeName, books:[]}); m.get(b.grade).books.push([b, bi]); }); return [...m.values()]; };
  const gradeNum = g => +(g.id.match(/\d+/) || [0])[0];
  let routed = false;
  function home(){
    if(!routed){ routed = true; addEventListener('hashchange', () => { if(!el) home(); }); }
    const app = $('#app'), gs = grades().sort((a,b) => gradeNum(a) - gradeNum(b)), m = location.hash.match(/^#\/(lop\d+)/), g = m && gs.find(x => x.id === m[1]);
    const bar = (typeof Account !== 'undefined' ? Account.userBar() : '');
    if(!g){
      app.innerHTML = bar + `<div class="toolbar"><a class="back" href="../">← Trang học sinh</a><span class="pill">Chỉ dành cho giáo viên</span></div>
        <h1>Bài giảng trình chiếu</h1><p class="lead">Chọn lớp để xem các bài giảng: kiến thức trọng tâm, dạng bài, ví dụ có lời giải từng bước, kèm phiếu học tập in được.</p>
        <div class="grid lk-grades">${gs.map(x => { const ls = x.books.flatMap(([b]) => b.lessons);
          return `<a class="tile grade" href="#/${x.id}"><b class="gname">${x.name}</b><span>${x.books.map(([b]) => b.chapter.replace(/\..*/, '')).join(' · ')}</span><span class="meta"><span>${ls.length} bài giảng</span><span>${ls.reduce((t, l) => t + l.slides.length, 0)} trang chiếu</span></span></a>`; }).join('')}</div>
        <p class="foot">${CONFIG.author}</p>`;
    } else {
      app.innerHTML = bar + `<div class="toolbar"><a class="back" href="#/">← Chọn lớp</a><span class="pill">${g.name} · Bài giảng</span></div>
        <div class="lk-2col"><div class="lk-lessons"><h1>${g.name}</h1>` + g.books.map(([b, bi]) => `<section class="topic"><h2><small>${b.chapter.split('.')[0]}</small>${b.chapter.split('.').slice(1).join('.').trim()}</h2>
          <ol class="lk-list">${b.lessons.map((l, li) => `<li><div class="lk-li"><b>${l.name}</b><small>${l.desc || ''} · ${l.slides.length} trang · ${l.slides.filter(s => s.kind === 'vd').length} ví dụ${l.practice ? ` · ${l.practice.reduce((t, g) => t + g.items.length, 0)} bài luyện tập` : ''}</small></div>
            <div class="lk-acts"><button class="btn primary small" data-play="${bi}:${li}" title="Trình chiếu toàn màn hình">▶ Chiếu</button><button class="btn small" data-prev="${bi}:${li}" title="Xem dạng trang, in được">📄 Xem</button><button class="btn small" data-ws="${bi}:${li}" title="Phiếu học tập in A4">📝 Phiếu</button>${l.practice ? `<button class="btn small" data-pr="${bi}:${li}" title="Phiếu luyện tập: cơ bản → vận dụng">🏋️ Luyện tập</button>` : ''}</div></li>`).join('')}</ol></section>`).join('') + `</div><aside class="lk-rank card" id="lkRank" aria-label="Bảng xếp hạng học sinh"></aside></div><p class="foot">${CONFIG.author}</p>`;
      if(typeof GvRank !== 'undefined') GvRank.mount($('#lkRank'), g.id);
      $$('[data-play]').forEach(b => b.onclick = () => { const [bi, li] = b.dataset.play.split(':'); open(BOOKS[bi].lessons[li], 0); });
      $$('[data-prev]').forEach(b => b.onclick = () => { const [bi, li] = b.dataset.prev.split(':'); preview(BOOKS[bi], BOOKS[bi].lessons[li]); });
      $$('[data-ws]').forEach(b => b.onclick = () => { const [bi, li] = b.dataset.ws.split(':'); worksheet(BOOKS[bi], BOOKS[bi].lessons[li], false); });
      $$('[data-pr]').forEach(b => b.onclick = () => { const [bi, li] = b.dataset.pr.split(':'); practice(BOOKS[bi], BOOKS[bi].lessons[li], false); });
    }
    document.body.classList.toggle('gv-wide', !!g);
    if(typeof Account !== 'undefined') Account.bindLogout();
    document.title = g ? `Bài giảng ${g.name} – ${CONFIG.brand || CONFIG.siteName}` : `Bài giảng – ${CONFIG.brand || CONFIG.siteName}`; scrollTo(0, 0);
  }

  /* ---------- Xem trước (dạng trang, in được) ---------- */
  function preview(b, l){ document.body.classList.remove('gv-wide');
    const app = $('#app');
    app.innerHTML = `<div class="toolbar"><button class="back linkbtn" id="lkBack">← Danh sách bài</button><div class="row"><button class="btn small" onclick="print()">🖨️ In</button><button class="btn small" id="lkWs">📝 Phiếu học tập</button>${l.practice ? '<button class="btn small" id="lkPr">🏋️ Luyện tập</button>' : ''}<button class="btn primary small" id="lkPlay">▶ Trình chiếu</button></div></div>
      <span class="pill">${b.gradeName} · ${b.chapter}</span><h1>${l.name}</h1>
      <div class="lk-doc">${l.slides.map((s, i) => `<section class="card lk-page" data-i="${i}">${render(s, true)}<button class="linkbtn lk-go" data-go="${i}">▶ Chiếu từ trang ${i+1}</button></section>`).join('')}</div>`;
    $('#lkBack').onclick = home; $('#lkPlay').onclick = () => open(l, 0); $('#lkWs').onclick = () => worksheet(b, l, false); if(l.practice) $('#lkPr').onclick = () => practice(b, l, false);
    $$('[data-go]').forEach(x => x.onclick = () => open(l, +x.dataset.go));
    scrollTo(0, 0);
  }

  /* ---------- Dựng nội dung một trang ---------- */
  const tag = s => s.tag ? `<span class="lk-tag ${s.kind}">${s.tag}</span>` : '';
  function render(s, all){
    const shown = all ? 1e9 : step;
    const fig = s.fig ? `<div class="lk-fig ${!all && s.figAt != null && shown < s.figAt ? 'off' : ''}">${s.fig}</div>` : '';   // figAt: hình hiện từ bước thứ mấy của lời giải
    if(s.kind === 'title') return `<div class="lk-title">${tag(s)}<h1>${s.title}</h1>${s.sub ? `<p class="lk-sub">${s.sub}</p>` : ''}${s.points ? `<ul class="lk-goals">${s.points.map(p => `<li>${p}</li>`).join('')}</ul>` : ''}</div>`;
    if(s.kind === 'kt' || s.kind === 'method' || s.kind === 'sum'){
      return `${tag(s)}<h2 class="lk-h">${s.title}</h2><div class="lk-main ${fig ? 'has-fig' : ''}"><div class="lk-body">${s.body || ''}${s.steps ? `<ol class="lk-steps">${s.steps.map(x => `<li>${x}</li>`).join('')}</ol>` : ''}</div>${fig}</div>`;
    }
    // ví dụ / luyện tập: đề + lời giải từng bước
    const sol = s.sol || [], n = sol.length;
    const solHTML = sol.map((x, k) => `<li class="${k < shown ? 'on' : ''}">${x}</li>`).join('');
    return `${tag(s)}<div class="lk-de"><b>${s.label || 'Đề bài'}.</b> ${s.de}</div>
      <div class="lk-main ${fig ? 'has-fig' : ''}"><div class="lk-body">${n ? `<div class="lk-sol ${shown > 0 ? 'open' : ''}"><div class="lk-solh">Lời giải</div><ol class="lk-solsteps">${solHTML}</ol>${s.ans ? `<div class="lk-ans ${shown >= n ? 'on' : ''}">${s.ans}</div>` : ''}</div>` : ''}</div>${fig}</div>`;
  }
  const stepsOf = s => (s.sol || []).length;

  /* ---------- Trình chiếu ---------- */
  function open(l, start){
    deck = l; idx = start || 0; step = 0;
    el = document.createElement('div'); el.id = 'lecture'; el.className = 'pv lk' + (dark ? ' dark' : '');
    el.setAttribute('role', 'dialog'); el.setAttribute('aria-modal', 'true'); el.setAttribute('aria-label', 'Trình chiếu bài giảng');
    el.innerHTML = `<div class="pv-slide lk-slide" id="lkSlide"></div><div class="lk-menu" id="lkMenu" hidden></div>
      <div class="pv-bar"><button data-k="prev" aria-label="Trang trước">‹</button><span id="lkPos"></span><button data-k="next" aria-label="Tiếp">›</button>
      <button data-k="menu">☰ Mục lục</button><span class="pv-sp"></span><button data-k="all">👁 Hiện lời giải</button>
      <button data-k="dark" aria-label="Đổi nền sáng/tối">🌓</button><button data-k="close" aria-label="Thoát">✕</button></div>`;
    document.body.appendChild(el); document.body.classList.add('noscroll');
    el.querySelectorAll('[data-k]').forEach(b => b.onclick = e => { e.stopPropagation(); act(b.dataset.k); });
    $('#lkSlide').onclick = () => act('next');
    const fs = el.requestFullscreen || el.webkitRequestFullscreen;
    if(fs) try{ const p = fs.call(el); if(p && p.catch) p.catch(() => {}); }catch(e){}
    addEventListener('keydown', key); addEventListener('resize', fit);
    if(document.fonts && document.fonts.addEventListener) document.fonts.addEventListener('loadingdone', fit);
    document.addEventListener('fullscreenchange', fsChange); document.addEventListener('webkitfullscreenchange', fsChange);
    draw();
  }
  function close(){
    if(!el) return;
    removeEventListener('keydown', key); removeEventListener('resize', fit);
    if(document.fonts && document.fonts.removeEventListener) document.fonts.removeEventListener('loadingdone', fit);
    document.removeEventListener('fullscreenchange', fsChange); document.removeEventListener('webkitfullscreenchange', fsChange);
    if(document.fullscreenElement || document.webkitFullscreenElement){ const x = document.exitFullscreen || document.webkitExitFullscreen; try{ const p = x.call(document); if(p && p.catch) p.catch(() => {}); }catch(e){} }
    el.remove(); el = null; document.body.classList.remove('noscroll');
  }
  function fsChange(){ if(el && !(document.fullscreenElement || document.webkitFullscreenElement)) close(); }
  function key(e){
    if(!el) return; const k = e.key;
    if(k === 'ArrowRight' || k === ' ' || k === 'PageDown' || k === 'ArrowDown'){ e.preventDefault(); act('next'); }
    else if(k === 'ArrowLeft' || k === 'PageUp' || k === 'ArrowUp'){ e.preventDefault(); act('prev'); }
    else if(k === 'Enter'){ e.preventDefault(); act('all'); }
    else if(k === 'Escape'){ const m = $('#lkMenu'); if(m && !m.hidden) m.hidden = true; else close(); }
    else if(/^[mM]$/.test(k)) act('menu');
    else if(/^[tT]$/.test(k)) act('dark');
    else if(k === 'Home'){ idx = 0; step = 0; draw(); } else if(k === 'End'){ idx = deck.slides.length - 1; step = 0; draw(); }
  }
  function act(k){
    const n = deck.slides.length, s = deck.slides[idx];
    if(k === 'next'){ if(step < stepsOf(s)){ step++; drawSteps(); } else if(idx < n-1){ idx++; step = 0; draw(); } }
    if(k === 'prev'){ if(idx > 0){ idx--; step = 0; draw(); } }
    if(k === 'all'){ step = step >= stepsOf(s) ? 0 : stepsOf(s); draw(); }
    if(k === 'dark'){ dark = !dark; el.classList.toggle('dark', dark); }
    if(k === 'menu'){ const m = $('#lkMenu'); m.hidden = !m.hidden; if(!m.hidden){
      m.innerHTML = `<h3>${deck.name}</h3><ol>${deck.slides.map((x, i) => `<li><button data-j="${i}" class="${i === idx ? 'on' : ''}"><span>${x.tag || ''}</span> ${strip(x.title || x.de || '')}</button></li>`).join('')}</ol>`;
      m.querySelectorAll('[data-j]').forEach(b => b.onclick = () => { idx = +b.dataset.j; step = 0; m.hidden = true; draw(); }); } }
    if(k === 'close') close();
  }
  const strip = h => { const d = document.createElement('div'); d.innerHTML = h; let t = d.textContent.replace(/\\\(|\\\)|\\\[|\\\]/g, '').replace(/\\[a-z]+/g, '').replace(/[{}]/g, ''); return t.length > 70 ? t.slice(0, 68) + '…' : t; };
  function drawSteps(){   // hiện thêm một bước lời giải, không dựng lại cả trang (công thức không nhấp nháy)
    const s = deck.slides[idx], box = $('#lkSlide .lk-sol'); if(!box){ draw(); return; }
    box.classList.add('open'); const li = box.querySelectorAll('.lk-solsteps li');
    li.forEach((x, k) => x.classList.toggle('on', k < step));
    const a = box.querySelector('.lk-ans'); if(a) a.classList.toggle('on', step >= stepsOf(s));
    const f = $('#lkSlide .lk-fig'); if(f && s.figAt != null) f.classList.toggle('off', step < s.figAt);
    bar(); fit();
  }
  function bar(){
    const n = deck.slides.length, s = deck.slides[idx], ns = stepsOf(s);
    $('#lkPos').textContent = `${idx+1}/${n}` + (ns ? ` · bước ${Math.min(step, ns)}/${ns}` : '');
    el.querySelector('[data-k="prev"]').disabled = idx === 0;
    el.querySelector('[data-k="next"]').disabled = idx === n-1 && step >= ns;
    const a = el.querySelector('[data-k="all"]'); a.hidden = !ns; a.textContent = step >= ns && ns ? '🙈 Ẩn lời giải' : '👁 Hiện lời giải';
  }
  const typeset = node => (window.MathJax && MathJax.typesetPromise) ? MathJax.typesetPromise([node]).then(fit, fit) : fit();
  function draw(){
    if(!el) return;
    const s = deck.slides[idx], slide = $('#lkSlide');
    slide.className = `pv-slide lk-slide k-${s.kind}`;
    slide.innerHTML = render(s, false);
    bar(); typeset(slide); fit(); setTimeout(fit, 450); setTimeout(fit, 1200);
  }
  /* Chữ to nhất mà vẫn vừa khung – tính cả các bước lời giải CHƯA hiện để khi hiện thêm chữ không bị nhảy cỡ. */
  function fit(){
    const s = $('#lkSlide'); if(!s) return;
    const H = s.clientHeight, W = innerWidth;
    let hi = Math.min(W / 13, 96), lo = 14;
    const fits = f => { s.style.setProperty('--fs', f + 'px'); return s.scrollHeight <= H + 1 && [s, ...s.querySelectorAll('.lk-de,.lk-body,.lk-h,.lk-title')].every(x => x.scrollWidth <= x.clientWidth + 1); };
    if(!fits(hi)){ for(let k = 0; k < 14; k++){ const m = (hi + lo) / 2; if(fits(m)) lo = m; else hi = m; } s.style.setProperty('--fs', Math.floor(lo) + 'px'); }
  }
  /* ---------- Phiếu học tập (in A4, tối giản) ----------
     Học sinh: I. Mục tiêu · II. Kiến thức trọng tâm (tiêu đề + dòng ghi chép) · III. Dạng bài và ví dụ (đề + dòng làm bài;
     ví dụ vẽ hình thì có ô lưới) · IV. Luyện tập. Bản giáo viên (kèm lời giải) thay các dòng bằng nội dung/lời giải. */
  const lines = n => `<div class="ws-lines">${'<i></i>'.repeat(n)}</div>`;
  const plain = h => { const d = document.createElement('div'); d.innerHTML = h; return d.textContent.length; };
  function worksheet(b, l, key){ document.body.classList.remove('gv-wide');
    const S = l.slides, title = S.find(s => s.kind === 'title'), brand = CONFIG.brand || CONFIG.siteName;
    let n = 0, dang = 0, h = '';
    const kts = S.filter(s => s.kind === 'kt'), groups = [];
    S.forEach(s => { if(s.kind === 'method'){ groups.push({m:s, vd:[]}); } else if(s.kind === 'vd'){ (groups[groups.length-1] || (groups[0] = {m:null, vd:[]})).vd.push(s); } });
    const vdBlock = (s, lab) => {
      const fig = s.fig ? (s.figAt == null || key ? `<div class="ws-fig">${s.fig}</div>` : `<div class="ws-fig ws-blank">${planeSVG({x:[-3,5], y:[-3,5]})}</div>`) : '';
      const body = key ? `<ol class="ws-sol">${(s.sol || []).map(x => `<li>${x}</li>`).join('')}</ol>${s.ans ? `<p class="ws-ans">${s.ans}</p>` : ''}`
                       : lines(Math.max(4, Math.min(10, (s.sol || []).length * 2 + (s.ans ? 1 : 0))));
      return `<div class="ws-q"><p><b>${lab}.</b> ${s.de}</p><div class="ws-row ${fig ? 'has-fig' : ''}"><div class="ws-work">${body}</div>${fig}</div></div>`; };
    h += `<header class="ws-head"><div class="ws-brand"><span>${brand}</span><span>${b.gradeName} · Kết nối tri thức</span></div>
      <h1>PHIẾU HỌC TẬP${key ? ' <small>(bản có lời giải)</small>' : ''}</h1><h2>${l.name}</h2>
      <p class="ws-who">Họ và tên: <span class="ws-fill"></span> Lớp: <span class="ws-fill s"></span> Ngày: <span class="ws-fill s"></span></p></header>`;
    if(title && title.points) h += `<section><h3>I. Mục tiêu</h3><ul class="ws-goals">${title.points.map(p => `<li>${p}</li>`).join('')}</ul></section>`;
    if(kts.length) h += `<section><h3>II. Kiến thức trọng tâm</h3>${kts.map((s, i) => `<div class="ws-kt"><h4>${i+1}. ${s.title}</h4>${key ? `<div class="ws-key">${s.body || ''}</div>` : lines(Math.max(4, Math.min(7, Math.round(plain(s.body || '') / 80) + 2)))}</div>`).join('')}</section>`;
    if(groups.length) h += `<section><h3>III. Dạng bài và ví dụ</h3>${groups.map(g => `${g.m ? `<div class="ws-dang"><h4>Dạng ${++dang}. ${g.m.title}</h4>${key ? `<ol class="ws-steps">${(g.m.steps || []).map(x => `<li>${x}</li>`).join('')}</ol>` : `<p class="ws-hint">Phương pháp:</p>${lines(Math.max(2, (g.m.steps || []).length))}`}</div>` : ''}${g.vd.map(s => vdBlock(s, `Ví dụ ${++n}`)).join('')}`).join('')}</section>`;
    const lt = S.filter(s => s.kind === 'lt');
    if(lt.length) h += `<section><h3>IV. Luyện tập</h3>${lt.map((s, i) => vdBlock(s, `Bài ${i+1}`)).join('')}</section>`;
    h += `<footer class="ws-foot">${brand} · ${l.name}</footer>`;
    const app = $('#app');
    app.innerHTML = `<div class="toolbar ws-bar"><button class="back linkbtn" id="wsBack">← Danh sách bài</button><div class="row">
        <label class="ws-toggle"><input type="checkbox" id="wsKey" ${key ? 'checked' : ''}> Kèm lời giải</label><button class="btn primary small" onclick="print()">🖨️ In / Lưu PDF</button></div></div>
      <article class="ws">${h}</article>`;
    $('#wsBack').onclick = home; $('#wsKey').onchange = e => worksheet(b, l, e.target.checked);
    document.title = `Phiếu học tập – ${l.name}`; scrollTo(0, 0);
  }

  /* ---------- Phiếu luyện tập (bỏ lý thuyết; cơ bản → vận dụng, theo từng dạng như bài giảng) ----------
     I. Cơ bản: các dạng lần lượt · II. Vận dụng ★. Bản kèm lời giải thay dòng kẻ bằng lời giải. Có thể chiếu từng bài. */
  const prItems = l => { let n = 0; const out = [];
    [false, true].forEach(hard => l.practice.forEach((g, gi) => g.items.forEach(s => { if(!!s.hard === hard) out.push({...s, g, gi, n: ++n}); }))); return out; };
  function practice(b, l, key){ document.body.classList.remove('gv-wide');
    const brand = CONFIG.brand || CONFIG.siteName, all = prItems(l), cb = all.filter(s => !s.hard), vd = all.filter(s => s.hard), pct = k => Math.round(k / all.length * 100);
    const q = s => {
      const fig = s.draw ? `<div class="ws-fig ${key ? '' : 'ws-blank'}">${key ? s.fig : planeSVG(s.draw)}</div>` : s.fig ? `<div class="ws-fig">${s.fig}</div>` : '';
      const body = key ? `<ol class="ws-sol">${(s.sol || []).map(x => `<li>${x}</li>`).join('')}</ol>${s.ans ? `<p class="ws-ans">${s.ans}</p>` : ''}`
                       : lines(s.lines || Math.max(3, Math.min(10, (s.sol || []).length * 2 + (s.ans ? 1 : 0))));
      return `<div class="ws-q"><p><b>Bài ${s.n}${s.hard ? ' ★' : ''}.</b> ${s.de}</p><div class="ws-row ${fig ? 'has-fig' : ''}"><div class="ws-work">${body}</div>${fig}</div></div>`; };
    const part = (list, head) => { if(!list.length) return ''; let h = `<section><h3>${head}</h3>`, gi = -1;
      list.forEach(s => { if(s.gi !== gi){ gi = s.gi; h += `<h4 class="pr-dang">Dạng ${gi + 1}. ${s.g.dang}</h4>`; } h += q(s); }); return h + '</section>'; };
    const h = `<header class="ws-head"><div class="ws-brand"><span>${brand}</span><span>${b.gradeName} · Kết nối tri thức</span></div>
        <h1>PHIẾU LUYỆN TẬP${key ? ' <small>(bản có lời giải)</small>' : ''}</h1><h2>${l.name}</h2>
        <p class="ws-who">Họ và tên: <span class="ws-fill"></span> Lớp: <span class="ws-fill s"></span> Ngày: <span class="ws-fill s"></span></p>
        <p class="pr-legend">Gồm <b>${all.length} bài</b>: ${cb.length} bài cơ bản (${pct(cb.length)}%) · ${vd.length} bài vận dụng ★ (${pct(vd.length)}%). Làm lần lượt từ Phần I đến Phần II.</p></header>`
      + part(cb, `I. Bài tập cơ bản <small>(${cb.length} bài)</small>`) + part(vd, `II. Bài tập vận dụng ★ <small>(${vd.length} bài)</small>`)
      + `<footer class="ws-foot">${brand} · Luyện tập ${l.name}</footer>`;
    $('#app').innerHTML = `<div class="toolbar ws-bar"><button class="back linkbtn" id="wsBack">← Danh sách bài</button><div class="row">
        <label class="ws-toggle"><input type="checkbox" id="wsKey" ${key ? 'checked' : ''}> Kèm lời giải</label><button class="btn small" id="prPlay">▶ Chiếu bài tập</button><button class="btn primary small" onclick="print()">🖨️ In / Lưu PDF</button></div></div>
      <article class="ws pr">${h}</article>`;
    $('#wsBack').onclick = home; $('#wsKey').onchange = e => practice(b, l, e.target.checked); $('#prPlay').onclick = () => open(practiceDeck(b, l), 0);
    document.title = `Phiếu luyện tập – ${l.name}`; scrollTo(0, 0);
  }
  // Chiếu phiếu luyện tập: mỗi bài một trang (đề + lời giải từng bước; hình cần vẽ hiện ở bước cuối).
  function practiceDeck(b, l){
    const all = prItems(l), cb = all.filter(s => !s.hard).length;
    return { name: 'Luyện tập – ' + l.name, slides: [{kind:'title', tag:`${b.gradeName} · Phiếu luyện tập`, title:`Luyện tập: ${l.name}`, sub:'Từ cơ bản đến vận dụng',
        points:[`Phần I: ${cb} bài cơ bản`, `Phần II: ${all.length - cb} bài vận dụng ★`]}]
      .concat(all.map(s => ({kind:'lt', tag:`${s.hard ? 'Vận dụng ★' : 'Cơ bản'} · Dạng ${s.gi + 1}`, label:`Bài ${s.n}`, de:s.de, sol:s.sol, ans:s.ans, fig:s.fig, figAt:s.draw ? (s.sol || []).length : undefined}))) };
  }
  return { add, addPractice, home, open, preview, worksheet, practice, practiceDeck, BOOKS };
})();
