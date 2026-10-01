/* =====================================================================
   GvRank – BẢNG XẾP HẠNG CHO GIÁO VIÊN (cột phải trang bài giảng của một khối, giao-vien/#/lop10)
   - Lấy dữ liệu bằng Account.rankAll(khối) (Apps Script action 'rankAll', chỉ tài khoản giáo viên).
   - Mỗi lớp của khối một thẻ; xếp theo ⭐ sao · 🔥 chuỗi ngày · 🏅 huy hiệu · 📘 số bài.
   - Thú cưng vẽ đúng cấp tiến hoá theo số sao của khối (Pet.thresholds cần nạp data/<khối>.js → nạp khi cần).
   - Bấm một em: hiện toàn bộ chặng tiến hoá + chi tiết (sao còn thiếu, chuỗi ngày, huy hiệu, lần làm bài cuối).
   ===================================================================== */
const GvRank = (() => {
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const SORTS = [['stars','⭐ Sao'],['streak','🔥 Chuỗi'],['badges','🏅 Huy hiệu'],['lessons','📘 Bài']];
  const ICON = {stars:'⭐', streak:'🔥', badges:'🏅', lessons:'📘'};
  const cache = {};                          // gid → {t, data}
  let st = {gid:null, lop:null, sort:'stars', open:null}, box = null;

  /* Nạp data/<khối>.js để biết số bài của khối (ngưỡng tiến hoá). */
  function needGrade(gid){
    return new Promise(res => {
      if(App.grades.some(g => g.id === gid)) return res(App.grades.find(g => g.id === gid));
      const s = document.createElement('script'); s.src = `../data/${gid}.js`;
      s.onload = () => res(App.grades.find(g => g.id === gid) || null); s.onerror = () => res(null);
      document.head.appendChild(s);
    });
  }
  const stageOf = (G, r) => {
    if(!G){ const g = {id:st.gid}; return Math.min(Pet.count(g) - 1, Math.max(0, (r.pets && r.pets[st.gid]) || 0)); }
    const t = Pet.thresholds(G); let k = 0; t.forEach((v, i) => { if(r.stars >= v) k = i; }); return k;
  };

  async function mount(el, gid){
    box = el; if(!box) return;
    if(st.gid !== gid){ st = {gid, lop:null, sort:'stars', open:null}; }
    if(!CONFIG.sheetAPI || !Account.user){ box.innerHTML = head() + `<p class="note-line">Bảng xếp hạng cần bật đăng nhập Google Sheet (<code>CONFIG.sheetAPI</code>) và đăng nhập bằng tài khoản giáo viên.</p>`; return; }
    box.innerHTML = head() + `<p class="note-line">Đang tải bảng xếp hạng…</p>`;
    await load(false);
  }
  const head = (time) => `<div class="gr-head"><h2>🏆 Bảng xếp hạng</h2>${time ? `<button class="linkbtn" data-gr-reload title="Tải lại">↻ ${time}</button>` : ''}</div>`;

  async function load(force){
    const gid = st.gid, c = cache[gid];
    try{
      const G = await needGrade(gid);
      if(force || !c || Date.now() - c.t > 60000){
        const r = await Account.rankAll(+gid.replace(/\D/g, ''));
        if(!r || !r.ok || !Array.isArray(r.classes)) throw new Error(r && r.code === 'teacher' ? 'teacher' : (r && r.msg) || 'old');
        cache[gid] = {t: Date.now(), data: r.classes};
      }
      if(st.gid !== gid || !box || !box.isConnected) return;
      draw(G);
    }catch(e){
      if(!box || !box.isConnected) return;
      const msg = e.message === 'teacher' ? 'Chỉ tài khoản giáo viên mới xem được bảng xếp hạng.'
        : e.message === 'old' || /không hợp lệ/.test(e.message) ? 'Máy chủ chưa có chức năng này: thầy cô dán <b>Code.gs</b> mới vào Apps Script rồi triển khai lại (Quản lý bản triển khai → Chỉnh sửa → Phiên bản mới).'
        : 'Chưa tải được bảng xếp hạng. Kiểm tra mạng rồi bấm tải lại.';
      box.innerHTML = head('Tải lại') + `<p class="note-line">${msg}</p>`; bindReload();
    }
  }
  const bindReload = () => { const b = box.querySelector('[data-gr-reload]'); if(b) b.onclick = () => { box.innerHTML = head() + '<p class="note-line">Đang tải…</p>'; load(true); }; };

  function draw(G){
    const classes = cache[st.gid].data, time = new Date(cache[st.gid].t).toTimeString().slice(0, 5);
    if(!classes.length){ box.innerHTML = head(time) + `<p class="note-line">Chưa có lớp nào của khối này trên trang <b>HocSinh</b>.</p>`; bindReload(); return; }
    if(!classes.some(c => c.lop === st.lop)) st.lop = classes[0].lop;
    const C = classes.find(c => c.lop === st.lop), rows = C.rows.map(r => ({...r, k: stageOf(G, r)}));
    const on = rows.filter(r => r.joined).sort((a, b) => (b[st.sort] - a[st.sort]) || (b.stars - a.stars) || a.name.localeCompare(b.name, 'vi'));
    const off = rows.filter(r => !r.joined).sort((a, b) => a.name.localeCompare(b.name, 'vi'));
    const g = G || {id: st.gid}, T = G ? Pet.thresholds(G) : null;
    const last = Pet.count(g) - 1, sum = rows.reduce((t, r) => t + r.stars, 0), kings = rows.filter(r => r.k === last).length;
    const li = (r, i) => { const open = st.open === r.user;
      const next = T && T[r.k + 1], pct = T ? (next ? Math.round((r.stars - T[r.k]) / (next - T[r.k]) * 100) : 100) : 0;
      return `<li class="gr-row ${open ? 'open' : ''}" data-u="${esc(r.user)}" tabindex="0" role="button" aria-expanded="${open}">
        <span class="rk">${i < 3 ? ['🥇','🥈','🥉'][i] : i + 1}</span><span class="rp">${Pet.svg(g, r.k, '', {wear:{}, mood:'vui', mastery:0})}</span>
        <span class="gr-who"><b>${esc(r.name)}</b><small>${esc(Pet.name(g, r.k))}</small>${T ? `<i class="gr-bar"><i style="width:${pct}%"></i></i>` : ''}</span>
        <span class="rv">${ICON[st.sort]} ${r[st.sort]}</span></li>${open ? detail(g, T, r) : ''}`; };
    box.innerHTML = head(time)
      + `<div class="gr-tabs" role="tablist">${classes.map(c => `<button role="tab" class="${c.lop === st.lop ? 'on' : ''}" aria-selected="${c.lop === st.lop}" data-lop="${esc(c.lop)}">${esc(c.lop)}</button>`).join('')}</div>`
      + `<div class="gr-stats"><span><b>${on.length}</b>/${rows.length} em đã tham gia</span><span><b>${sum}</b> ⭐ cả lớp</span><span><b>${kings}</b> 👑 đạt cấp cao nhất</span></div>`
      + `<div class="gr-sort">${SORTS.map(([k, t]) => `<button class="btn small ${st.sort === k ? 'primary' : ''}" data-sort="${k}">${t}</button>`).join('')}</div>`
      + (on.length ? `<ol class="rank gr-list">${on.map(li).join('')}</ol>` : `<p class="note-line">Lớp ${esc(C.lop)} chưa có em nào đăng nhập.</p>`)
      + (off.length ? `<details class="gr-off"><summary>Chưa đăng nhập (${off.length})</summary><p>${off.map(r => esc(r.name)).join(', ')}</p></details>` : '')
      + `<p class="gr-note">Thú cưng tiến hoá theo số ⭐ của khối ${esc(g.name || st.gid)}${T ? ` (mốc: ${T.slice(1).join(' · ')} ⭐)` : ''}. Bấm vào tên để xem chặng tiến hoá.</p>`;
    box.querySelectorAll('[data-lop]').forEach(b => b.onclick = () => { st.lop = b.dataset.lop; st.open = null; draw(G); });
    box.querySelectorAll('[data-sort]').forEach(b => b.onclick = () => { st.sort = b.dataset.sort; draw(G); });
    box.querySelectorAll('.gr-row').forEach(el => { const tog = () => { st.open = st.open === el.dataset.u ? null : el.dataset.u; draw(G); };
      el.onclick = tog; el.onkeydown = e => { if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); tog(); } }; });
    bindReload();
  }
  function detail(g, T, r){
    const next = T && T[r.k + 1], total = Pet.count(g);
    return `<li class="gr-detail"><div class="gr-evo ${total > 5 ? 'long' : ''}">${Array.from({length:total}, (_,k) => `<figure class="${k < r.k ? 'done' : k === r.k ? 'now' : 'todo'}">${Pet.svg(g, k, '', {wear:{}, mood:'vui', mastery:0})}<figcaption>${esc(Pet.name(g, k))}${T ? `<br><small>${T[k]}⭐</small>` : ''}</figcaption></figure>`).join('<span class="gr-arrow">›</span>')}</div>
      <p>${r.k === total - 1 ? '👑 Đã đạt cấp tiến hoá cao nhất!' : next ? `Có <b>${r.stars}⭐</b> · cần thêm <b>${next - r.stars}⭐</b> để lên <b>${esc(Pet.name(g, r.k + 1))}</b>.` : `Có <b>${r.stars}⭐</b>.`}</p>
      <p class="gr-facts"><span>📘 ${r.lessons} bài có sao</span><span>🔥 ${r.streak} ngày (kỉ lục ${r.best || 0})</span><span>🏅 ${r.badges} huy hiệu</span><span>🪙 ${r.xu} xu</span>${r.last ? `<span>🕒 làm bài gần nhất ${esc(r.last)}</span>` : ''}</p></li>`;
  }
  return { mount };
})();
