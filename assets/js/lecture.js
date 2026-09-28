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
  let deck = null, idx = 0, step = 0, dark = false, el = null;

  /* ---------- Trang chủ giáo viên ---------- */
  function home(){
    const app = $('#app');
    let h = (typeof Account !== 'undefined' ? Account.userBar() : '') +
      `<div class="toolbar"><a class="back" href="../">← Trang học sinh</a><span class="pill">Chỉ dành cho giáo viên</span></div>
      <h1>Bài giảng trình chiếu</h1><p class="lead">Kiến thức trọng tâm và các dạng bài có ví dụ, lời giải tự luận từng bước – dành cho học sinh trung bình – khá. Bấm <b>▶ Trình chiếu</b> để chiếu toàn màn hình; <b>📄 Xem trước</b> để đọc hoặc in.</p>`;
    BOOKS.forEach((b, bi) => {
      h += `<section class="topic"><h2><small>${b.gradeName}</small>${b.chapter}</h2><div class="grid">` +
        b.lessons.map((l, li) => `<div class="tile lk-tile"><b>${l.name}</b><span>${l.desc || ''}</span>
          <span class="meta"><span>${l.slides.length} trang chiếu · ${l.slides.filter(s => s.kind === 'vd').length} ví dụ</span></span>
          <div class="row"><button class="btn primary small" data-play="${bi}:${li}">▶ Trình chiếu</button><button class="btn small" data-prev="${bi}:${li}">📄 Xem trước</button></div></div>`).join('') + `</div></section>`;
    });
    app.innerHTML = h + `<p class="foot">${CONFIG.author}</p>`;
    if(typeof Account !== 'undefined') Account.bindLogout();
    $$('[data-play]').forEach(b => b.onclick = () => { const [bi, li] = b.dataset.play.split(':'); open(BOOKS[bi].lessons[li], 0); });
    $$('[data-prev]').forEach(b => b.onclick = () => { const [bi, li] = b.dataset.prev.split(':'); preview(BOOKS[bi], BOOKS[bi].lessons[li]); });
  }

  /* ---------- Xem trước (dạng trang, in được) ---------- */
  function preview(b, l){
    const app = $('#app');
    app.innerHTML = `<div class="toolbar"><button class="back linkbtn" id="lkBack">← Danh sách bài giảng</button><div class="row"><button class="btn small" onclick="print()">🖨️ In</button><button class="btn primary small" id="lkPlay">▶ Trình chiếu</button></div></div>
      <span class="pill">${b.gradeName} · ${b.chapter}</span><h1>${l.name}</h1>
      <div class="lk-doc">${l.slides.map((s, i) => `<section class="card lk-page" data-i="${i}">${render(s, true)}<button class="linkbtn lk-go" data-go="${i}">▶ Chiếu từ trang ${i+1}</button></section>`).join('')}</div>`;
    $('#lkBack').onclick = home; $('#lkPlay').onclick = () => open(l, 0);
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
  return { add, home, open, preview, BOOKS };
})();
