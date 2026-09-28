/* =====================================================================
   CLASSPANEL – Mở ỨNG DỤNG QUẢN LÝ LỚP (CONFIG.classApp) trong khung bên phải khi trình chiếu.
   - Mặc định rộng 1/3 màn hình; kéo thanh dọc ở mép trái khung để rộng/hẹp (nhớ trên máy).
   - Bản trình chiếu (khung .pv) co lại vừa phần bên trái và tự tính lại cỡ chữ (fit).
   - Nút “✕ Ẩn” chỉ ẩn khung: trang trong khung vẫn chạy, mở lại còn nguyên nội dung.
   - Khung nằm ngoài khung trình chiếu nên đóng/mở lại bài chiếu vẫn giữ trang; vì vậy trình chiếu
     bật toàn màn hình cho CẢ trang (document.documentElement), không chỉ khung .pv.
   Dùng: ClassPanel.attach(khungTrìnhChiếu, hàmFit) khi mở · ClassPanel.detach() khi đóng · ClassPanel.toggle().
   ===================================================================== */
const ClassPanel = (() => {
  const url = () => String((typeof CONFIG !== 'undefined' && CONFIG.classApp) || '').trim();
  const KEY = 'hoctap:classpanel:w', MIN = 280;
  let box = null, host = null, fitFn = null, visible = false, frac = 1/3;
  try{ const f = +localStorage.getItem(KEY); if(f > .15 && f <= .75) frac = f; }catch(e){}
  const enabled = () => !!url() && (typeof Account === 'undefined' || !Account.user || !Account.isTeacher || Account.isTeacher());
  const width = () => Math.round(Math.min(Math.max(innerWidth * frac, MIN), innerWidth * .75));

  function build(){
    box = document.createElement('aside'); box.className = 'cp'; box.hidden = true; box.setAttribute('aria-label', 'Ứng dụng quản lý lớp học');
    box.innerHTML = `<div class="cp-grip" role="separator" aria-orientation="vertical" aria-label="Kéo để đổi độ rộng" tabindex="0" title="Kéo sang trái/phải để đổi độ rộng"><i></i></div>
      <div class="cp-main"><div class="cp-bar"><b>🧑‍🏫 Lớp học</b><span class="cp-sp"></span>
        <button data-cp="reload" title="Tải lại ứng dụng">↻</button><a href="${url()}" target="_blank" rel="noopener" title="Mở trong thẻ mới">↗</a>
        <button data-cp="hide" title="Ẩn khung (nội dung vẫn giữ nguyên)">✕ Ẩn</button></div>
        <iframe src="${url()}" title="Ứng dụng quản lý lớp học" allow="clipboard-read; clipboard-write; fullscreen; autoplay; microphone; camera"></iframe>
        <div class="cp-shield"></div></div>`;
    document.body.appendChild(box);
    box.querySelector('[data-cp="hide"]').onclick = hide;
    box.querySelector('[data-cp="reload"]').onclick = () => { box.querySelector('iframe').src = url(); };
    const grip = box.querySelector('.cp-grip');
    grip.addEventListener('pointerdown', e => { e.preventDefault(); grip.setPointerCapture(e.pointerId); box.classList.add('dragging'); });
    grip.addEventListener('pointermove', e => { if(!box.classList.contains('dragging')) return; frac = (innerWidth - e.clientX) / innerWidth; apply(); });
    const end = () => { if(!box.classList.contains('dragging')) return; box.classList.remove('dragging'); frac = width() / innerWidth; save(); apply(); };
    grip.addEventListener('pointerup', end); grip.addEventListener('pointercancel', end);
    grip.addEventListener('keydown', e => { if(e.key === 'ArrowLeft' || e.key === 'ArrowRight'){ e.preventDefault(); e.stopPropagation(); frac = width() / innerWidth + (e.key === 'ArrowLeft' ? .05 : -.05); apply(); frac = width() / innerWidth; save(); } });
    addEventListener('resize', () => { if(visible) apply(); });
  }
  const save = () => { try{ localStorage.setItem(KEY, String(frac)); }catch(e){} };
  function apply(){
    const on = visible && !!host, w = width();
    if(box){ box.hidden = !on; box.style.width = w + 'px'; }
    if(host){ host.style.right = on ? w + 'px' : '0px'; host.classList.toggle('narrow', (on ? innerWidth - w : innerWidth) < 900); }
    document.querySelectorAll('[data-k="cls"]').forEach(b => { b.classList.toggle('on', on); b.setAttribute('aria-pressed', on); });
    if(fitFn) requestAnimationFrame(() => fitFn && fitFn());
  }
  function show(){ if(!enabled()) return; if(!box) build(); visible = true; apply(); }
  function hide(){ visible = false; apply(); }
  const toggle = () => visible ? hide() : show();
  function attach(el, fit){ host = el; fitFn = fit; if(visible){ if(!box) build(); } apply(); }
  function detach(){ if(host) host.style.right = ''; host = null; fitFn = null; if(box) box.hidden = true; }
  const button = () => enabled() ? `<button data-k="cls" aria-pressed="false" title="Ứng dụng quản lý lớp học (phím L)">🧑‍🏫 Lớp học</button>` : '';
  return { enabled, attach, detach, toggle, show, hide, button, get visible(){ return visible; } };
})();
