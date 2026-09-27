/* =====================================================================
   ACCOUNT – Đăng nhập theo lớp (Google Sheets) và thú cưng tiến hoá.
   - Nếu CONFIG.sheetAPI để trống: không cần đăng nhập, thú cưng vẫn chạy (lưu trên máy).
   - Nếu có sheetAPI: học sinh chọn lớp + tài khoản + mật khẩu; tiến độ lưu theo từng em
     trên máy và gửi về Google Sheet của giáo viên (xem tools/apps-script/).
   Nạp SAU generators.js và TRƯỚC engine.js. Engine gọi Account.on(sự kiện, …).
   ===================================================================== */
const Account = (() => {
  const API = () => String(CONFIG.sheetAPI || '').trim();
  const LS = {
    get(k){ try{ return JSON.parse(localStorage.getItem(k)) }catch(e){ return null } },
    set(k,v){ try{ localStorage.setItem(k, JSON.stringify(v)) }catch(e){} },
    del(k){ try{ localStorage.removeItem(k) }catch(e){} },
  };
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  let user = API() ? LS.get('hoctap:session') : null;          // {token, name, lop, user}

  /* ---- Mỗi học sinh một “ngăn” lưu riêng trên cùng một máy ---- */
  const rawGet = store.get.bind(store), rawSet = store.set.bind(store);
  const SKIP = new Set(['hoctap:theme','hoctap:session','hoctap:queue']);
  const ns = k => (user && k.startsWith('hoctap:') && !SKIP.has(k)) ? `hoctap:u:${user.lop}|${user.user}:${k.slice(7)}` : k;
  store.get = k => rawGet(ns(k));
  store.set = (k,v) => rawSet(ns(k), v);

  /* ---- Gọi Apps Script (POST text/plain để không cần preflight CORS) ---- */
  async function api(body){
    const r = await fetch(API(), { method:'POST', body: JSON.stringify(body), redirect:'follow' });
    if(!r.ok) throw new Error('HTTP '+r.status);
    return r.json();
  }
  const queue = () => LS.get('hoctap:queue') || [];
  async function flush(){
    if(!API() || !navigator.onLine) return;
    let q = queue(); if(!q.length) return;
    const rest = [];
    for(const item of q){ try{ const r = await api(item); if(!r.ok && r.code !== 'auth') rest.push(item); }catch(e){ rest.push(item) } }
    LS.set('hoctap:queue', rest);
  }
  function send(body){
    if(!API() || !user) return;
    const item = {...body, action:'save', token:user.token};
    api(item).then(r => { if(!r.ok){ if(r.code==='auth') expired(); else LS.set('hoctap:queue', [...queue(), item]); } else flush(); })
             .catch(() => LS.set('hoctap:queue', [...queue(), item]));
  }
  let playBusy = false;
  function syncPlay(play){
    if(!API() || !user || playBusy) return; playBusy = true;
    api({action:'play', token:user.token, play}).then(r => { if(!r.ok && r.code==='auth') expired(); }).catch(() => {}).finally(() => playBusy = false);
  }
  const rank = () => api({action:'rank', token:user.token});
  const P = () => typeof Play !== 'undefined';
  function expired(){ toastSafe('Phiên đăng nhập đã hết hạn, em đăng nhập lại nhé.'); setTimeout(logout, 1500); }
  function logout(){ LS.del('hoctap:session'); user = null; location.hash = '#/'; location.reload(); }
  const toastSafe = m => { try{ toast(m) }catch(e){} };

  /* ---- Chỉ hiện đúng khối của lớp: "10A12" → lop10, "9A" → lop9 ----
     Lớp không có số (vd "GV") hoặc khối chưa có nội dung → hiện mọi khối. Tắt bằng CONFIG.lockGrade = false. */
  const gradeOfClass = lop => { const m = String(lop || '').match(/\d{1,2}/); return m ? 'lop' + (+m[0]) : null; };
  function restrict(){
    if(!user || CONFIG.lockGrade === false) return;
    const id = gradeOfClass(user.lop), g = id && App.grades.find(x => x.id === id);
    if(!g) return;
    App.grades = [g]; CONFIG.upcoming = [];
    const h = location.hash.match(/^#\/([\w-]+)/);
    if(!h || h[1] !== g.id) location.replace('#/' + g.id);
  }

  /* ---- Màn hình đăng nhập ---- */
  function gate(start){
    if(!API() || user){ restrict(); start(); flush(); return; }
    const app = document.getElementById('app');
    app.innerHTML = `<div class="login card">
      <h1>Chào em! 👋</h1><p class="lead">Chọn lớp rồi đăng nhập bằng tài khoản thầy cô đã phát.</p>
      <form id="lgForm" autocomplete="off">
        <label>Lớp<select id="lgLop" required><option value="">Đang tải danh sách lớp…</option></select></label>
        <label>Tài khoản<input id="lgUser" required autocapitalize="none" spellcheck="false" inputmode="text"></label>
        <label>Mật khẩu<input id="lgPass" type="password" required></label>
        <div class="fb" id="lgMsg"></div>
        <button class="btn primary big" id="lgBtn" type="submit">Đăng nhập</button>
      </form></div><p class="foot">${esc(CONFIG.author)}</p>`;
    const sel = $('#lgLop'), msg = $('#lgMsg'), btn = $('#lgBtn');
    const say = (t, type='sol') => { msg.className = `fb show ${type}`; msg.innerHTML = t; };
    const loadClasses = () => api({action:'classes'}).then(r => {
      if(!r.ok) throw new Error(r.msg);
      sel.innerHTML = `<option value="">— Chọn lớp —</option>` + r.classes.map(c => `<option>${esc(c)}</option>`).join('');
      const last = LS.get('hoctap:lastLop'); if(last && r.classes.includes(last)) sel.value = last;
    }).catch(() => { sel.innerHTML = `<option value="">Không tải được</option>`; say('Không kết nối được máy chủ. Em kiểm tra mạng rồi bấm <b>Thử lại</b>. <button type="button" class="btn small" id="lgRetry">Thử lại</button>'); $('#lgRetry').onclick = () => { msg.className='fb'; loadClasses(); }; });
    loadClasses();
    $('#lgForm').onsubmit = async e => {
      e.preventDefault();
      const lop = sel.value, u = $('#lgUser').value.trim(), p = $('#lgPass').value;
      if(!lop){ say('Em chọn lớp trước nhé.','note'); return; }
      btn.disabled = true; btn.textContent = 'Đang đăng nhập…';
      try{
        const ua = navigator.userAgent, device = /iPad|Macintosh/.test(ua) && 'ontouchend' in document ? 'iPad' : /iPhone/.test(ua) ? 'iPhone' : /Android/.test(ua) ? (/Mobile/.test(ua) ? 'Điện thoại Android' : 'Máy tính bảng Android') : /Windows/.test(ua) ? 'Máy tính Windows' : /Mac/.test(ua) ? 'Máy Mac' : 'Khác';
        const r = await api({action:'login', lop, user:u, pass:p, device});
        if(!r.ok){ say(esc(r.msg || 'Sai tài khoản hoặc mật khẩu.')); return; }
        user = {token:r.token, name:r.name, lop:r.lop, user:r.user};
        LS.set('hoctap:session', user); LS.set('hoctap:lastLop', lop);
        if(P()){ Play.reset(); Play.adopt(r.play); }
        Object.entries(r.progress || {}).forEach(([k,v]) => { const key = 'hoctap:'+k; if((+v||0) > (store.get(key)||0)) store.set(key, +v); });
        App.grades.forEach(g => store.set(`hoctap:petseen:${g.id}`, Pet.stage(g)));   // không bật màn tiến hoá khi vừa đăng nhập
        restrict(); start();
      }catch(err){ say('Không kết nối được máy chủ. Em thử lại sau ít phút nhé.'); }
      finally{ btn.disabled = false; btn.textContent = 'Đăng nhập'; }
    };
  }
  const userBar = () => user ? `<div class="userbar"><span>👋 <b>${esc(user.name)}</b> · ${esc(user.lop)}</span><button class="linkbtn" data-logout>Đăng xuất</button></div>` : '';
  const bindLogout = () => $$('[data-logout]').forEach(b => b.onclick = () => { if(queue().length) flush(); logout(); });

  /* ---- Sự kiện từ engine ---- */
  function on(ev, a, b){
    if(ev === 'answer'){ if(P()) Play.on('answer', a); return; }
    if(ev === 'picker'){
      $('#app').insertAdjacentHTML('afterbegin', userBar()); bindLogout();
      App.grades.forEach(g => { const t = $(`.tile.grade[href="#/${g.id}"]`); if(t) t.insertAdjacentHTML('beforeend', `<span class="tile-pet">${Pet.svg(g, Pet.stage(g))}</span>`); });
    }
    if(ev === 'home'){
      $('#app').insertAdjacentHTML('afterbegin', userBar()); bindLogout();
      const lead = $('#app .lead'); if(lead) lead.insertAdjacentHTML('afterend', Pet.card(a));
      Pet.bindCard(); if(P()) Play.on('home', a);
    }
    if(ev === 'lesson'){
      const tb = $('#app .toolbar .tbtns') || $('#app .toolbar #themeBtn'); if(tb){ const s = gradeStars(a); tb.insertAdjacentHTML('beforebegin', `<a class="pet-mini" href="#/${a.id}" title="Thú cưng của em">${Pet.svg(a, Pet.stage(a))}<b>${s}⭐</b></a>`); }
      if(P()) Play.on('lesson', a);
    }
    if(ev === 'done'){
      const {g, l, lv, st, pts, n} = a;
      if(P()) Play.on('done', a);
      Pet.check(g);
      send({ key:`${g.id}:${l.id}:${lv}`, stars: store.get(`hoctap:${g.id}:${l.id}:${lv}`) || 0, setStars: st, score: pts, total: n,
             grade: g.name, lesson: l.name, level: lv, gradeStars: gradeStars(g), pet: Pet.name(g, Pet.stage(g)), summary: Pet.summary(), play: P() ? Play.snapshot() : '' });
    }
  }
  addEventListener('online', flush);
  return { gate, on, get user(){ return user }, logout, flush, syncPlay, rank, gradeOfClass };
})();

/* =====================================================================
   PET – thú cưng 5 cấp cho mỗi khối lớp, vẽ bằng SVG (màu lấy từ biến CSS).
   ===================================================================== */
const Pet = (() => {
  const SPECIES = { lop4:['meo','Mèo Mây'], lop9:['rong','Rồng Lửa'], lop10:['cu','Cú Tí Hon'], lop11:['tho','Thỏ Bông'] };
  const ORDER = ['meo','rong','cu','tho'], NAMES = {meo:'Mèo Mây', rong:'Rồng Lửa', cu:'Cú Tí Hon', tho:'Thỏ Bông'};
  const sp = g => SPECIES[g.id] ? SPECIES[g.id][0] : ORDER[Math.max(0, App.grades.indexOf(g)) % 4];
  const nm = g => NAMES[sp(g)];
  const STAGE = ['Quả trứng bí ẩn', 'Trứng sắp nở', 'Bé {n}', '{n}', '{n} Vương'];
  const MSG = ['', 'Quả trứng đang rung rinh… sắp nở rồi!', 'Trứng đã nở! Chào bé {n}!', '{n} đã lớn phổng phao rồi!', '{n} đã đội vương miện! Em thật xuất sắc! 👑'];
  function thresholds(g){ const M = g.lessons.length * 9, t = [0, 3, Math.max(6, Math.ceil(.15*M)), Math.ceil(.4*M), Math.ceil(.75*M)];
    for(let i = 2; i < 5; i++) if(t[i] <= t[i-1]) t[i] = t[i-1] + 2; return t; }
  const stage = g => { const s = gradeStars(g), t = thresholds(g); let k = 0; t.forEach((v,i) => { if(s >= v) k = i }); return k; };
  const name = (g, k) => STAGE[k].replace('{n}', nm(g));

  /* ---- Vẽ ---- */
  function svg(g, k, cls='', opt){
    const s = sp(g), W = 120, L = opt || (typeof Play !== 'undefined' ? Play.look() : {}), wear = L.wear || {}, mood = L.mood || 'vui';
    const bg = wear.bg && typeof Play !== 'undefined' ? Play.bgSVG(wear.bg) : '';
    const egg = (crack) => `<ellipse class="pet-shadow" cx="60" cy="110" rx="30" ry="5"/>
      <g class="${crack?'pet-wobble':'pet-float'}"><path class="pet-egg" d="M60 18 C 86 18 96 58 96 76 C 96 98 80 108 60 108 C 40 108 24 98 24 76 C 24 58 34 18 60 18 Z"/>
      <circle class="pet-spot" cx="46" cy="52" r="7"/><circle class="pet-spot" cx="72" cy="42" r="5"/><circle class="pet-spot" cx="74" cy="80" r="8"/><circle class="pet-spot" cx="42" cy="88" r="4"/>
      ${crack?`<path class="pet-crack" d="M30 66 L40 58 L48 68 L57 57 L66 69 L75 58 L84 67 L90 62"/>
      <ellipse class="pet-eye" cx="50" cy="50" rx="3.5" ry="4.5"/><ellipse class="pet-eye" cx="68" cy="50" rx="3.5" ry="4.5"/>`:''}</g>`;
    if(k <= 1) return `<svg class="pet sp-${s} ${cls}" viewBox="0 0 ${W} ${W}" aria-label="${name(g,k)}" role="img">${bg}${egg(k===1)}</svg>`;
    const grown = k >= 3, r = grown ? 34 : 27, cx = 60, cy = grown ? 70 : 76;
    const P = (x,y) => `${(cx + x*r).toFixed(1)} ${(cy + y*r).toFixed(1)}`;
    let back = '', front = '';
    if(s === 'meo'){ front += `<path class="pet-body" d="M${P(-.85,-.45)} L${P(-.6,-1.2)} L${P(-.15,-.9)} Z"/><path class="pet-body" d="M${P(.85,-.45)} L${P(.6,-1.2)} L${P(.15,-.9)} Z"/>
        <path class="pet-belly" d="M${P(-.66,-.62)} L${P(-.57,-.98)} L${P(-.35,-.83)} Z"/><path class="pet-belly" d="M${P(.66,-.62)} L${P(.57,-.98)} L${P(.35,-.83)} Z"/>`;
      if(grown) back += `<path class="pet-tail" d="M${P(.8,.5)} C ${P(1.5,.5)} ${P(1.5,-.4)} ${P(1.15,-.55)}"/>`; }
    if(s === 'rong'){ front += `<path class="pet-horn" d="M${P(-.55,-.8)} L${P(-.45,-1.25)} L${P(-.25,-.92)} Z"/><path class="pet-horn" d="M${P(.55,-.8)} L${P(.45,-1.25)} L${P(.25,-.92)} Z"/>`;
      if(grown) back += `<path class="pet-wing" d="M${P(-.8,-.1)} L${P(-1.55,-.75)} L${P(-1.35,-.05)} L${P(-1.6,.25)} L${P(-.85,.35)} Z"/><path class="pet-wing" d="M${P(.8,-.1)} L${P(1.55,-.75)} L${P(1.35,-.05)} L${P(1.6,.25)} L${P(.85,.35)} Z"/>`; }
    if(s === 'cu'){ front += `<path class="pet-body" d="M${P(-.9,-.4)} L${P(-.75,-1.15)} L${P(-.3,-.9)} Z"/><path class="pet-body" d="M${P(.9,-.4)} L${P(.75,-1.15)} L${P(.3,-.9)} Z"/>`;
      if(grown) back += `<ellipse class="pet-wing" cx="${cx - r*.95}" cy="${cy + r*.2}" rx="${r*.32}" ry="${r*.6}"/><ellipse class="pet-wing" cx="${cx + r*.95}" cy="${cy + r*.2}" rx="${r*.32}" ry="${r*.6}"/>`; }
    if(s === 'tho'){ const L = grown ? 1.35 : .95;
      back += `<ellipse class="pet-body" cx="${cx - r*.4}" cy="${cy - r*(.55+L/2)}" rx="${r*.2}" ry="${r*L/2+4}" transform="rotate(-10 ${cx - r*.4} ${cy - r*.8})"/><ellipse class="pet-body" cx="${cx + r*.4}" cy="${cy - r*(.55+L/2)}" rx="${r*.2}" ry="${r*L/2+4}" transform="rotate(10 ${cx + r*.4} ${cy - r*.8})"/>
        <ellipse class="pet-belly" cx="${cx - r*.4}" cy="${cy - r*(.55+L/2)}" rx="${r*.09}" ry="${r*L/2-2}" transform="rotate(-10 ${cx - r*.4} ${cy - r*.8})"/><ellipse class="pet-belly" cx="${cx + r*.4}" cy="${cy - r*(.55+L/2)}" rx="${r*.09}" ry="${r*L/2-2}" transform="rotate(10 ${cx + r*.4} ${cy - r*.8})"/>`; }
    const face = s === 'cu'
      ? `<circle class="pet-belly" cx="${cx - r*.36}" cy="${cy - r*.12}" r="${r*.28}"/><circle class="pet-belly" cx="${cx + r*.36}" cy="${cy - r*.12}" r="${r*.28}"/><path class="pet-beak" d="M${P(-.1,.12)} L${P(.1,.12)} L${P(0,.32)} Z"/>`
      : mood === 'buon' ? `<path class="pet-mouth" d="M${P(-.14,.3)} Q ${P(0,.16)} ${P(.14,.3)}"/>`
      : `<path class="pet-mouth" d="M${P(-.14,.2)} Q ${P(-.07,.32)} ${P(0,.2)} Q ${P(.07,.32)} ${P(.14,.2)}"/>`;
    const tear = mood === 'buon' ? `<path class="pet-tear" d="M${P(.44,.02)} q ${r*.07} ${r*.14} 0 ${r*.2} q ${-r*.07} ${-r*.06} 0 ${-r*.2} Z"/>` : '';
    const acc = typeof Play !== 'undefined' ? Play.accSVG(wear, cx, cy, r) : '';
    const eyes = `<ellipse class="pet-eye" cx="${cx - r*.36}" cy="${cy - r*.12}" rx="${r*.12}" ry="${r*.15}"/><ellipse class="pet-eye" cx="${cx + r*.36}" cy="${cy - r*.12}" rx="${r*.12}" ry="${r*.15}"/>
      <circle class="pet-shine" cx="${cx - r*.32}" cy="${cy - r*.18}" r="${r*.045}"/><circle class="pet-shine" cx="${cx + r*.4}" cy="${cy - r*.18}" r="${r*.045}"/>
      <ellipse class="pet-cheek" cx="${cx - r*.62}" cy="${cy + r*.12}" rx="${r*.13}" ry="${r*.08}"/><ellipse class="pet-cheek" cx="${cx + r*.62}" cy="${cy + r*.12}" rx="${r*.13}" ry="${r*.08}"/>`;
    const body = `<ellipse class="pet-body" cx="${cx}" cy="${cy}" rx="${r}" ry="${r*.95}"/><ellipse class="pet-belly" cx="${cx}" cy="${cy + r*.42}" rx="${r*.5}" ry="${r*.38}"/>`;
    const feet = grown ? `<ellipse class="pet-body" cx="${cx - r*.45}" cy="${cy + r*.95}" rx="${r*.24}" ry="${r*.13}"/><ellipse class="pet-body" cx="${cx + r*.45}" cy="${cy + r*.95}" rx="${r*.24}" ry="${r*.13}"/>` : '';
    const shell = grown ? '' : `<path class="pet-egg" d="M26 90 L34 82 L42 90 L51 81 L60 90 L69 81 L78 90 L86 82 L94 90 C 94 104 80 110 60 110 C 40 110 26 104 26 90 Z"/>`;
    const crown = k === 4 && !wear.hat ? `<path class="pet-crown" d="M${P(-.42,-.82)} L${P(-.45,-1.3)} L${P(-.2,-1.06)} L${P(0,-1.42)} L${P(.2,-1.06)} L${P(.45,-1.3)} L${P(.42,-.82)} Z"/><circle class="pet-gem" cx="${cx}" cy="${cy - r*1.0}" r="${r*.07}"/>` : '';
    const spark = k === 4 ? `<path class="pet-spark" d="M16 30 l3 -8 l3 8 l8 3 l-8 3 l-3 8 l-3 -8 l-8 -3 Z"/><path class="pet-spark s2" d="M98 20 l2 -6 l2 6 l6 2 l-6 2 l-2 6 l-2 -6 l-6 -2 Z"/><path class="pet-spark s3" d="M104 86 l2 -5 l2 5 l5 2 l-5 2 l-2 5 l-2 -5 l-5 -2 Z"/>` : '';
    return `<svg class="pet sp-${s} ${cls}" viewBox="0 0 ${W} ${W}" aria-label="${name(g,k)}" role="img">${bg}<ellipse class="pet-shadow" cx="60" cy="112" rx="${grown?34:30}" ry="5"/>${spark}
      <g class="pet-float">${back}${body}${feet}${front}${eyes}${face}${tear}${crown}${acc}</g>${shell}</svg>`;
  }

  /* ---- Thẻ thú cưng trên trang khối lớp ---- */
  function card(g){
    const s = gradeStars(g), k = stage(g), t = thresholds(g), next = t[k+1];
    const pct = next ? Math.round((s - t[k]) / (next - t[k]) * 100) : 100;
    return `<section class="pet-card card" aria-label="Thú cưng của em">
      <div class="pet-stage">${svg(g, k, 'big')}</div>
      <div class="pet-info"><small>Thú cưng ${g.name} · Cấp ${k+1}/5</small><h2>${name(g,k)}</h2>
        <div class="bar"><i style="width:${pct}%"></i></div>
        <p>${next ? `Em có <b>${s} ⭐</b>. Còn <b>${next - s} ⭐</b> nữa để tiến hoá!` : `Em có <b>${s} ⭐</b>. Thú cưng đã đạt cấp cao nhất! 👑`}</p>
        <div class="pet-steps">${[0,1,2,3,4].map(i => `<span class="${i<=k?'on':''}" title="${name(g,i)}">${svg(g, i, '', {mood:'vui'})}</span>`).join('')}</div>
      </div></section>`;
  }
  function bindCard(){ const c = $('.pet-card .pet-stage'); if(c) c.onclick = () => { c.classList.remove('boing'); void c.offsetWidth; c.classList.add('boing'); }; }

  /* ---- Tiến hoá ---- */
  function check(g){
    const k = stage(g), key = `hoctap:petseen:${g.id}`, seen = store.get(key);
    if(seen == null){ store.set(key, k); if(k === 0) return; }
    if(seen != null && k <= seen) return;
    store.set(key, k); show(g, seen == null ? Math.max(0, k-1) : seen, k);
  }
  function show(g, from, to){
    const old = document.getElementById('evolve'); if(old) old.remove();
    const el = document.createElement('div'); el.id = 'evolve'; el.className = 'evolve'; el.setAttribute('role','dialog'); el.setAttribute('aria-modal','true');
    el.innerHTML = `<div class="evolve-card card"><div class="evolve-stage">${svg(g, from, 'big')}</div>
      <h2>Ơ kìa… có điều kì diệu!</h2><p class="lead">&nbsp;</p><button class="btn primary" data-close>Tuyệt vời!</button></div>`;
    document.body.appendChild(el);
    const st = el.querySelector('.evolve-stage'), h = el.querySelector('h2'), p = el.querySelector('p');
    st.classList.add('shake');
    setTimeout(() => { st.classList.remove('shake'); st.classList.add('flash');
      setTimeout(() => { st.innerHTML = svg(g, to, 'big'); st.classList.remove('flash'); st.classList.add('pop');
        h.textContent = `${name(g, to)}`; p.textContent = MSG[to].replace(/\{n\}/g, nm(g)); }, 350); }, 1100);
    const close = () => el.remove();
    el.querySelector('[data-close]').onclick = close; el.addEventListener('click', e => { if(e.target === el) close(); });
    el.querySelector('[data-close]').focus();
  }
  const summary = () => App.grades.map(g => `${g.name}: ${gradeStars(g)}⭐ – ${name(g, stage(g))}`).join(' | ');
  return { svg, card, bindCard, check, show, stage, name, summary, thresholds };
})();
