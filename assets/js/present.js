/* =====================================================================
   PRESENT – Trình chiếu câu hỏi lên máy chiếu (toàn màn hình).
   Mỗi lần một câu: đề sát mép trên và hai mép, chữ tự phóng to/thu nhỏ vừa màn hình,
   hình bên trái – phương án bên phải. Giáo viên bấm Gợi ý / Đáp án khi cần.
   Phím: ← → (hoặc Space) chuyển câu · G gợi ý · Đ/Enter đáp án · T nền tối · Esc thoát.
   Nạp SAU engine.js? Không cần: engine gọi Present.on('lesson', g, l) qua hook().
   ===================================================================== */
const Present = (() => {
  let el = null, i = 0, dark = false, shown = {}, ro = null, fitting = false;
  const LET = 'ABCDEFGH';
  const fmtAns = v => String(v).replace('.', ',');
  const ansOf = sp => sp && sp.frac ? sp.frac : Array.isArray(sp) ? ansOf(sp[0]) : sp;
  const canPresent = () => typeof Account !== 'undefined' && typeof Account.isTeacher === 'function' && Account.isTeacher();
  const requireTeacher = () => {
    if(canPresent()) return true;
    if(typeof toast === 'function') toast('Chế độ trình chiếu chỉ dành cho tài khoản giáo viên.');
    return false;
  };

  function on(ev){
    if(ev !== 'lesson') return;
    const old = $('#presentBtn');
    if(!canPresent()){ if(old) old.remove(); return; }
    const r = $('#resetSet'); if(!r || old) return;
    r.insertAdjacentHTML('afterend', `<button class="btn" id="presentBtn" title="Trình chiếu lên máy chiếu">📽️ Trình chiếu</button>`);
    $('#presentBtn').onclick = () => open(0);
  }

  function open(start){
    if(!requireTeacher()) return false;
    if(!S.qs.length || el) return false;                 // đang chiếu thì không mở chồng thêm
    if(document.activeElement && document.activeElement.blur) document.activeElement.blur();   // Enter không “bấm lại” nút Trình chiếu
    i = start || 0; shown = {};
    el = document.createElement('div'); el.id = 'present'; el.className = 'pv' + (dark ? ' dark' : '');
    el.setAttribute('role', 'dialog'); el.setAttribute('aria-modal', 'true'); el.setAttribute('aria-label', 'Trình chiếu câu hỏi');
    el.innerHTML = `<div class="pv-slide" id="pvSlide"></div>
      <div class="pv-bar"><button data-k="prev" aria-label="Câu trước">‹</button><span id="pvPos"></span><button data-k="next" aria-label="Câu sau">›</button>
      <span class="pv-sp"></span><button data-k="hint">💡 Gợi ý</button><button data-k="ans">✅ Đáp án</button><button data-k="new">↻ Bộ mới</button>${typeof ClassPanel !== 'undefined' ? ClassPanel.button() : ''}
      <button data-k="dark" aria-label="Đổi nền sáng/tối">🌓</button><button data-k="close" aria-label="Thoát trình chiếu">✕</button></div>`;
    document.body.appendChild(el); document.body.classList.add('noscroll');
    el.querySelectorAll('[data-k]').forEach(b => b.onclick = e => { e.stopPropagation(); act(b.dataset.k); });
    const R = document.documentElement, fs = R.requestFullscreen || R.webkitRequestFullscreen;   // cả trang: để khung “Lớp học” cùng hiện
    if(fs) try{ const p = fs.call(R); if(p && p.catch) p.catch(() => {}); }catch(e){}
    if(typeof ClassPanel !== 'undefined') ClassPanel.attach(el, fit);
    addEventListener('keydown', key); addEventListener('resize', fit);
    if(document.fonts && document.fonts.addEventListener) document.fonts.addEventListener('loadingdone', fit);   // phông công thức tải xong → co giãn lại
    document.addEventListener('fullscreenchange', fsChange); document.addEventListener('webkitfullscreenchange', fsChange);
    draw();
  }
  function close(){
    if(!el) return;
    removeEventListener('keydown', key); removeEventListener('resize', fit);
    if(document.fonts && document.fonts.removeEventListener) document.fonts.removeEventListener('loadingdone', fit);
    document.removeEventListener('fullscreenchange', fsChange); document.removeEventListener('webkitfullscreenchange', fsChange);
    const fe = document.fullscreenElement || document.webkitFullscreenElement;
    if(fe){ const x = document.exitFullscreen || document.webkitExitFullscreen; try{ const p = x.call(document); if(p && p.catch) p.catch(() => {}); }catch(e){} }
    if(ro){ ro.disconnect(); ro = null; }
    if(typeof ClassPanel !== 'undefined') ClassPanel.detach();
    el.remove(); el = null; document.body.classList.remove('noscroll');
  }
  function fsChange(){ if(el && !(document.fullscreenElement || document.webkitFullscreenElement)) close(); }
  function key(e){
    if(!el) return; const k = e.key;
    if(k === 'ArrowRight' || k === ' ' || k === 'PageDown'){ e.preventDefault(); act('next'); }
    else if(k === 'ArrowLeft' || k === 'PageUp'){ e.preventDefault(); act('prev'); }
    else if(k === 'Escape') close();
    else if(/^[gGhH]$/.test(k)) act('hint');
    else if(k === 'Enter' || /^[dDđĐ]$/.test(k)) act('ans');
    else if(/^[tT]$/.test(k)) act('dark');
    else if(/^[lL]$/.test(k)) act('cls');
    else if(/^[a-dA-D]$/.test(k)){ const b = el.querySelector(`[data-o="${'abcd'.indexOf(k.toLowerCase())}"]`); if(b) b.click(); }
  }
  function act(k){
    const n = S.qs.length;
    if(k === 'next' && i < n-1){ i++; draw(); }
    if(k === 'prev' && i > 0){ i--; draw(); }
    if(k === 'hint'){ shown[i] = shown[i] === 'hint' ? '' : 'hint'; draw(); }
    if(k === 'ans'){ shown[i] = shown[i] === 'ans' ? '' : 'ans'; draw(); }
    if(k === 'new'){ genSet(); try{ renderQs(); }catch(e){} i = 0; shown = {}; draw(); }
    if(k === 'dark'){ dark = !dark; el.classList.toggle('dark', dark); }
    if(k === 'cls' && typeof ClassPanel !== 'undefined') ClassPanel.toggle();
    if(k === 'close') close();
  }

  /* ---------- Dựng một trang chiếu ---------- */
  function body(q, reveal){
    if(q.kind === 'choice'){
      const long = q.opts.some(o => o.replace(/<[^>]+>|\\[a-z]+|[{}\\()]/gi, '').length > 26);
      const tall = q.opts.some(o => /cases/.test(o));   // phương án là hệ: xếp 2 cột cho đỡ cao
      return `<div class="pv-opts ${!tall && (long || q.fig) ? 'one' : ''}">${q.opts.map((o, k) => `<button class="pv-o ${reveal && k === q.correct ? 'right' : ''}" data-o="${k}"><b>${LET[k]}</b><span>${o}</span></button>`).join('')}</div>`;
    }
    if(q.kind === 'blanks'){
      let bi = 0;
      const box = () => { const sp = ansOf(q.ans[bi++]); return `<span class="pv-b">${reveal ? fmtAns(sp) : '&nbsp;'}</span>`; };
      const html = q.tpl.split(/(\[_\]|\[F\])/).map(p => {
        if(p === '[_]') return box();
        if(p === '[F]'){ const f = ansOf(q.ans[bi++]); return `<span class="fr pv-f"><span class="pv-b">${reveal ? f[0] : '&nbsp;'}</span><span class="pv-b">${reveal ? f[1] : '&nbsp;'}</span></span>`; }
        return p; }).join('');
      return `<div class="pv-ans">${html}</div>`;
    }
    if(q.kind === 'steps')
      return `<ol class="pv-steps">${q.steps.map(s => `<li><b>${s.tag}:</b> ${s.ask}${reveal ? ` <span class="pv-sa">${stepAnsText(s)}</span>` : ''}</li>`).join('')}</ol>`;
    return '';
  }
  function draw(){
    if(!el) return;
    const q = S.qs[i], n = S.qs.length, mode = shown[i] || '';
    $('#pvPos').textContent = `Câu ${i+1}/${n}`;
    el.querySelector('[data-k="prev"]').disabled = i === 0; el.querySelector('[data-k="next"]').disabled = i === n-1;
    el.querySelector('[data-k="hint"]').classList.toggle('on', mode === 'hint'); el.querySelector('[data-k="ans"]').classList.toggle('on', mode === 'ans');
    const fig = q.fig || (q.kind === 'rotate' ? protractorSVG(q.val) : q.kind === 'shade' ? fracSVG(q.n, 0, q.shape, false) : '');
    const extra = mode === 'hint' ? `<div class="pv-note hint"><b>💡 Gợi ý:</b> ${q.hint}</div>` : mode === 'ans' ? `<div class="pv-note sol"><b>✅ Lời giải:</b> ${q.sol}</div>` : '';
    const slide = $('#pvSlide');
    slide.className = 'pv-slide' + (fig ? ' has-fig' : '');
    slide.innerHTML = `<div class="pv-q"><span class="pv-n">Câu ${i+1}.</span> ${q.text}${q.expr ? `<div class="pv-expr">${q.expr}</div>` : ''}</div>
      <div class="pv-main">${fig ? `<div class="pv-fig">${fig}</div>` : ''}<div class="pv-side">${body(q, mode === 'ans')}${extra}</div></div>`;
    slide.querySelectorAll('[data-o]').forEach(b => b.onclick = () => {
      const k = +b.dataset.o, ok = k === q.correct; b.classList.remove('right', 'wrong'); void b.offsetWidth; b.classList.add(ok ? 'right' : 'wrong');
      if(typeof Sound !== 'undefined') Sound.play(ok ? 'ok' : 'bad'); });
    const done = () => requestAnimationFrame(fit);
    if(window.MathJax && MathJax.typesetPromise) MathJax.typesetPromise([slide]).then(done, done); else done();
    fit(); setTimeout(fit, 450); setTimeout(fit, 1200);
    if(window.ResizeObserver){ if(ro) ro.disconnect(); let raf = 0; ro = new ResizeObserver(() => { if(fitting) return; cancelAnimationFrame(raf); raf = requestAnimationFrame(fit); });
      slide.querySelectorAll('.pv-q,.pv-side,.pv-fig').forEach(x => ro.observe(x)); }
  }
  /* Chữ to nhất có thể mà vẫn vừa khung (không cuộn). */
  function fit(){
    const s = $('#pvSlide'); if(!s) return;
    fitting = true; try{ fit_(s); } finally { requestAnimationFrame(() => fitting = false); }
  }
  function fit_(s){
    const W = el ? el.clientWidth : innerWidth, H = s.clientHeight;   // khung chiếu hẹp lại khi mở khung Lớp học
    let hi = Math.min(W / 12, 110), lo = 16;
    const fits = f => { s.style.setProperty('--fs', f + 'px'); return s.scrollHeight <= H + 1 && [s, ...s.querySelectorAll('.pv-q,.pv-side,.pv-note,.pv-ans')].every(x => x.scrollWidth <= x.clientWidth + 1); };
    if(fits(hi)) return;
    for(let k = 0; k < 14; k++){ const m = (hi + lo) / 2; if(fits(m)) lo = m; else hi = m; }
    s.style.setProperty('--fs', Math.floor(lo) + 'px');
  }
  return { on, open, close };
})();
