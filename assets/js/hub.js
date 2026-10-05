/* =====================================================================
   Hub – “🌟 GÓC CHUNG”: menu riêng cho HỌC SINH và GIÁO VIÊN cùng xem (đường link #/goc-chung[/<tab>]).
   - Học sinh: xem lớp của mình (Account.rank → máy chủ action 'rank').
   - Giáo viên (tài khoản lớp không có chữ số, vd "GV"): chọn khối → chọn lớp (Account.rankAll → action 'rankAll').
   - Mỗi mục là một TAB đăng ký bằng Hub.register({id, icon, label, render(box, ctx)}). Hiện có: 🏆 Xếp hạng lớp · 🎟️ Sticker của lớp · (hub-plus.js) 🎯 Hôm nay & Thử thách · ❓ Câu hỏi của thầy · 🔥 Bài hot tuần · 🗺️ Lộ trình · 🔁 Ôn bài cũ · 🏁 Đua lớp. Tab có thể đặt order (nhỏ = đứng trước).
     Thêm tính năng mới = viết một hàm render rồi gọi Hub.register(...) (xem cuối tệp); không phải sửa phần khung.
   - ctx đưa cho render: {role:'student'|'teacher', lop, cls:{lop,rows}, rows, hasSticker, esc, STICKERS, RARITY, uniq(r), reload()}.
     Mỗi dòng rows: {name, stars, streak, best, badges, xu, stickers:{id:số lần}, me?, joined?}.
   - Nạp SAU account.js và stickers.js. Engine học sinh và trang giáo viên gọi Hub.route() khi đổi đường link.
   ===================================================================== */
const Hub = (() => {
  const TABS = [];
  const register = t => { const i = TABS.findIndex(x => x.id === t.id); if(i >= 0) TABS[i] = t; else TABS.push(t); TABS.sort((a, b) => (a.order ?? 50) - (b.order ?? 50)); };   // order nhỏ hơn = đứng trước (mặc định 50)
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const SD = () => (typeof StickerDB !== 'undefined' ? StickerDB : {STICKERS:[], RARITY:{}});
  const uniq = r => SD().STICKERS.filter(x => ((r && r.stickers) || {})[x.id] > 0).length;
  const total = r => Object.values((r && r.stickers) || {}).reduce((n, v) => n + (Number(v) || 0), 0);
  const isTeacher = () => typeof Account !== 'undefined' && Account.isTeacher && Account.isTeacher();
  const st = {tab:'rank', gid:null, lop:null, sort:'stars'}, cache = {};     // cache[khóa] = {t, classes}
  const app = () => document.getElementById('app');

  /* ---------- Lấy dữ liệu: danh sách lớp [{lop, rows}] ---------- */
  async function load(force){
    const teacher = isTeacher(), key = teacher ? st.gid : 'me', c = cache[key];
    if(!force && c && Date.now() - c.t < 60000) return c.classes;
    let classes;
    if(teacher){
      const r = await Account.rankAll(+String(st.gid).replace(/\D/g, ''));
      if(!r || !r.ok || !Array.isArray(r.classes)) throw new Error(r && r.code === 'teacher' ? 'teacher' : (r && r.msg) || 'old');
      classes = r.classes;
    } else {
      const r = await Account.rank(); if(!r || !r.ok) throw new Error((r && r.msg) || 'old');
      const mine = (typeof Play !== 'undefined' && Play.state) ? Play.state : null;       // dòng của chính em: dùng dữ liệu máy (mới nhất)
      const merge = (x, m) => { const o = {...(x || {})}; Object.entries(m || {}).forEach(([k, v]) => { o[k] = Math.max(Number(o[k]) || 0, Number(v) || 0); }); return o; };   // lấy số lớn hơn giữa máy chủ và máy này
      classes = [{lop:r.lop, rows:r.rows.map(x => x.me && mine && x.stickers !== undefined ? {...x, stickers:merge(x.stickers, mine.stickers), badges:Math.max(Number(x.badges) || 0, Object.keys(mine.badges || {}).length)} : x)}];
    }
    cache[key] = {t:Date.now(), classes}; return classes;
  }

  /* ---------- Khung trang ---------- */
  const gradeIds = () => (CONFIG.grades || []).filter(g => /^lop\d+$/.test(g)).sort((a, b) => parseInt(a.slice(3)) - parseInt(b.slice(3)));
  function frame(inner){
    const bar = typeof Account !== 'undefined' && Account.userBar ? Account.userBar() : '';
    const tabs = TABS.map(t => `<button role="tab" class="${t.id === st.tab ? 'on' : ''}" aria-selected="${t.id === st.tab}" data-hub-tab="${t.id}">${t.icon} ${esc(t.label)}</button>`).join('');
    app().innerHTML = `${bar}<div class="toolbar"><a class="back" href="#/">← Quay lại</a><span class="pill">🌟 Góc chung</span></div>
      <h1>🌟 Góc chung</h1><p class="lead">Nơi cả lớp cùng xem: xếp hạng, sticker và những điều vui sắp tới.</p>
      <div class="gr-tabs hub-tabs" role="tablist">${tabs}</div><div id="hubBody">${inner}</div>`;
    app().querySelectorAll('[data-hub-tab]').forEach(b => b.onclick = () => { location.hash = `#/goc-chung/${b.dataset.hubTab}`; });
    if(typeof Account !== 'undefined' && Account.bindLogout) try{ Account.bindLogout() }catch(e){}
  }
  const note = html => `<p class="note-line">${html}</p>`;

  async function show(force){
    const body0 = () => document.getElementById('hubBody');
    if(!CONFIG.sheetAPI || typeof Account === 'undefined' || !Account.user){ frame(note('Góc chung cần đăng nhập (bật <code>CONFIG.sheetAPI</code> và đăng nhập bằng tài khoản lớp hoặc tài khoản giáo viên).')); return; }
    if(isTeacher() && !st.gid) st.gid = gradeIds().includes('lop10') ? 'lop10' : gradeIds()[0];
    frame(note('Đang tải…'));
    let classes;
    try{ classes = await load(force); }
    catch(e){ frame(note(e.message === 'teacher' ? 'Chỉ tài khoản giáo viên mới xem được nhiều lớp.'
      : e.message === 'old' || /không hợp lệ/.test(e.message) ? 'Máy chủ chưa có chức năng này: thầy cô dán <b>Code.gs</b> mới vào Apps Script rồi triển khai lại.'
      : 'Chưa tải được dữ liệu. Kiểm tra mạng rồi bấm tải lại.') + `<button class="linkbtn" data-hub-reload>↻ Tải lại</button>`);
      const b = document.querySelector('[data-hub-reload]'); if(b) b.onclick = () => show(true); return; }
    if(!classes.some(c => c.lop === st.lop)) st.lop = classes[0] && classes[0].lop;
    const cls = classes.find(c => c.lop === st.lop) || {lop:'', rows:[]}, teacher = isTeacher();
    const pick = (teacher ? `<div class="gr-tabs hub-grades" role="tablist" aria-label="Khối">${gradeIds().map(g => `<button class="${g === st.gid ? 'on' : ''}" data-hub-grade="${g}">Khối ${g.slice(3)}</button>`).join('')}</div>` : '')
      + (classes.length > 1 || teacher ? `<div class="gr-tabs hub-classes" role="tablist" aria-label="Lớp">${classes.map(c => `<button class="${c.lop === st.lop ? 'on' : ''}" data-hub-lop="${esc(c.lop)}">${esc(c.lop)}</button>`).join('')}</div>` : '');
    const rows = cls.rows.filter(r => r.joined !== false);
    frame(`${pick}<div id="hubTab"></div><p class="gr-note"><button class="linkbtn" data-hub-reload>↻ Tải lại</button> · Dữ liệu cập nhật khi các em đăng nhập và làm bài.</p>`);
    app().querySelectorAll('[data-hub-grade]').forEach(b => b.onclick = () => { st.gid = b.dataset.hubGrade; st.lop = null; show(false); });
    app().querySelectorAll('[data-hub-lop]').forEach(b => b.onclick = () => { st.lop = b.dataset.hubLop; show(false); });
    app().querySelector('[data-hub-reload]').onclick = () => show(true);
    const tab = TABS.find(t => t.id === st.tab) || TABS[0], box = document.getElementById('hubTab');
    if(!classes.length){ box.innerHTML = note('Chưa có lớp nào của khối này trên trang <b>HocSinh</b>.'); return; }
    tab.render(box, {role:teacher ? 'teacher' : 'student', lop:cls.lop, cls, rows, all:cls.rows, hasSticker:cls.rows.some(r => r.stickers !== undefined),
      esc, STICKERS:SD().STICKERS, RARITY:SD().RARITY, uniq, total, redraw:() => show(false), state:st});
  }

  /* Trả về true nếu đường link là Góc chung (đã vẽ) */
  function route(){
    const m = location.hash.match(/^#\/goc-chung(?:\/([\w-]+))?/); if(!m) return false;
    if(m[1] && TABS.some(t => t.id === m[1])) st.tab = m[1]; else if(!TABS.some(t => t.id === st.tab)) st.tab = TABS[0].id;
    document.title = 'Góc chung'; show(false); scrollTo(0, 0); return true;
  }

  /* ---------- TAB 1: 🏆 Xếp hạng lớp ---------- */
  const SORTS = [['stars','⭐ Sao'],['wk','📈 Tuần này'],['streak','🔥 Chuỗi'],['badges','🏅 Huy hiệu'],['stk','🎟️ Sticker'],['xu','🪙 Xu']];
  const val = (r, k) => k === 'stk' ? uniq(r) : (Number(r[k]) || 0);
  register({id:'rank', order:10, icon:'🏆', label:'Xếp hạng lớp', render(box, c){
    const k = c.state.sort, list = c.rows.slice().sort((a, b) => (val(b, k) - val(a, k)) || (val(b, 'stars') - val(a, 'stars')) || String(a.name).localeCompare(String(b.name), 'vi'));
    const off = c.all.filter(r => r.joined === false);
    box.innerHTML = `<div class="gr-sort">${SORTS.map(([id, t]) => `<button class="btn small ${k === id ? 'primary' : ''}" data-hub-sort="${id}">${t}</button>`).join('')}</div>
      <div class="gr-stats"><span>Lớp <b>${c.esc(c.lop)}</b></span><span><b>${list.length}</b> bạn tham gia</span><span><b>${list.reduce((t, r) => t + (Number(r.stars) || 0), 0)}</b> ⭐ cả lớp</span></div>
      ${list.length ? `<ol class="rank hub-rank">${list.map((r, i) => `<li class="${r.me ? 'me' : ''}"><span class="rk">${i < 3 ? ['🥇','🥈','🥉'][i] : i + 1}</span><span class="rp hub-av">${c.esc((String(r.name).trim().split(/\s+/).pop() || '?').charAt(0).toUpperCase())}</span><b>${c.esc(r.name)}${r.me ? ' (em)' : ''}</b><span class="rv">${SORTS.find(s => s[0] === k)[1].split(' ')[0]} ${k === 'wk' ? '+' : ''}${val(r, k)}</span></li>`).join('')}</ol>` : note('Lớp này chưa có bạn nào đăng nhập.')}
      ${off.length ? `<details class="gr-off"><summary>Chưa đăng nhập (${off.length})</summary><p>${off.map(r => c.esc(r.name)).join(', ')}</p></details>` : ''}`;
    box.querySelectorAll('[data-hub-sort]').forEach(b => b.onclick = () => { c.state.sort = b.dataset.hubSort; c.redraw(); });
  }});

  /* ---------- TAB 2: 🎟️ Sticker của lớp ---------- */
  register({id:'sticker', order:80, icon:'🎟️', label:'Sticker của lớp', render(box, c){
    const S = c.STICKERS, R = c.RARITY, W = {legend:4, epic:3, rare:2, common:1};
    if(!c.hasSticker){ box.innerHTML = note('Máy chủ chưa gửi dữ liệu sticker: thầy cô dán <b>Code.gs</b> mới (hàm <code>pub_</code> có <code>stickers</code>) vào Apps Script rồi triển khai lại.'); return; }
    const owners = {}; S.forEach(x => owners[x.id] = c.rows.filter(r => ((r.stickers || {})[x.id] || 0) > 0));
    const opened = S.filter(x => owners[x.id].length).length, times = c.rows.reduce((t, r) => t + c.total(r), 0);
    const top = c.rows.filter(r => c.uniq(r) > 0).sort((a, b) => (c.uniq(b) - c.uniq(a)) || (c.total(b) - c.total(a)) || String(a.name).localeCompare(String(b.name), 'vi'));
    const icons = r => { const mine = S.filter(x => ((r.stickers || {})[x.id] || 0) > 0).sort((a, b) => W[b.r] - W[a.r]);
      return mine.slice(0, 14).map(x => `<span class="hub-ic ${x.r}" title="${c.esc(x.name)}${r.stickers[x.id] > 1 ? ' ×' + r.stickers[x.id] : ''}">${x.icon}</span>`).join('') + (mine.length > 14 ? `<small>+${mine.length - 14}</small>` : ''); };
    const groups = [...new Set(S.map(x => x.group))];
    box.innerHTML = `<section class="sticker-head"><div><small>BỘ SƯU TẬP CỦA LỚP ${c.esc(c.lop)}</small><h3>${opened === S.length ? '🌟 Cả lớp đã mở đủ sticker!' : `Cả lớp đã mở ${opened}/${S.length} loại sticker`}</h3><p>Mỗi lần làm đúng tuyệt đối <b>6/6</b> là mở được một sticker. Cùng nhau sưu tập nhé!</p></div><div class="sticker-score"><b>${times}</b><span>lần đạt<br>6/6</span></div></section>
      <h3>🏅 Bạn sưu tập nhiều nhất</h3>${top.length ? `<ol class="rank hub-rank hub-stk">${top.map((r, i) => `<li class="${r.me ? 'me' : ''}"><span class="rk">${i < 3 ? ['🥇','🥈','🥉'][i] : i + 1}</span><span class="rp hub-av">${c.esc((String(r.name).trim().split(/\s+/).pop() || '?').charAt(0).toUpperCase())}</span><span class="hub-who"><b>${c.esc(r.name)}${r.me ? ' (em)' : ''}</b><span class="hub-icons">${icons(r)}</span></span><span class="rv">🎟️ ${c.uniq(r)}/${S.length}</span></li>`).join('')}</ol>` : note('Chưa có bạn nào mở sticker. Chinh phục một bộ 6/6 để mở sticker đầu tiên! 🎁')}
      ${groups.map(g => `<h3>${c.esc(g)}</h3><div class="sticker-grid">${S.filter(x => x.group === g).map(x => { const n = owners[x.id].length, rr = R[x.r] || {name:'', icon:''};
        return `<div class="sticker ${n ? 'got' : ''} ${x.r}" title="${n ? c.esc(owners[x.id].map(r => r.name).join(', ')) : 'Chưa bạn nào mở'}"><span class="sticker-icon">${n ? x.icon : '❔'}</span><b>${n ? c.esc(x.name) : 'Chưa ai mở'}</b><small>${n ? `${rr.icon} ${rr.name} · ${n} bạn` : 'Đang chờ ai đó mở'}</small></div>`; }).join('')}</div>`).join('')}`;
  }});

  return { register, route, load, TABS, state:st };
})();
