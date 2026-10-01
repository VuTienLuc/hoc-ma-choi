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
  const rankAll = grade => api({action:'rankAll', token:user.token, grade});   // giáo viên: mọi lớp của một khối
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
  function gate(start, opt={}){
    if(!API() || user){ restrict(); start(); flush(); return; }
    const app = document.getElementById('app');
    app.innerHTML = `<div class="login card">
      <h1>${opt.title || 'Chào em! 👋'}</h1><p class="lead">${opt.lead || 'Chọn lớp rồi đăng nhập bằng tài khoản thầy cô đã phát.'}</p>
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
        App.grades.forEach(g => store.set(`hoctap:petseen-v2:${g.id}`, Pet.stage(g)));   // không bật màn tiến hoá khi vừa đăng nhập
        restrict(); start();
      }catch(err){ say('Không kết nối được máy chủ. Em thử lại sau ít phút nhé.'); }
      finally{ btn.disabled = false; btn.textContent = 'Đăng nhập'; }
    };
  }
  const isTeacher = () => !!user && !/\d/.test(user.lop);        // lớp không có chữ số (vd "GV") = giáo viên
  const userBar = () => user ? `<div class="userbar"><span>👋 <b>${esc(user.name)}</b> · ${esc(user.lop)}</span>${isTeacher() && !/giao-vien/.test(location.pathname) ? '<a class="linkbtn" href="giao-vien/">📚 Bài giảng</a>' : ''}<button class="linkbtn" data-logout>Đăng xuất</button></div>` : '';
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
  return { gate, on, get user(){ return user }, logout, flush, syncPlay, rank, rankAll, gradeOfClass, isTeacher, userBar, bindLogout };
})();

/* =====================================================================
   PET – thú cưng tiến hoá theo tổng sao, vẽ bằng SVG (màu lấy từ biến CSS).
   Khối dùng Cú có hành trình 15 cấp: Cú → Phượng hoàng → Kỳ lân.
   ===================================================================== */
const Pet = (() => {
  const SPECIES = { lop4:['meo','Mèo Mây'], lop8:['cu','Cú Tí Hon'], lop9:['rong','Rồng Lửa'], lop10:['cu','Cú Tí Hon'], lop11:['tho','Thỏ Bông'] };
  const ORDER = ['meo','rong','cu','tho'], NAMES = {meo:'Mèo Mây', rong:'Rồng Lửa', cu:'Cú Tí Hon', tho:'Thỏ Bông'};
  const sp = g => SPECIES[g.id] ? SPECIES[g.id][0] : ORDER[Math.max(0, App.grades.indexOf(g)) % 4];
  const nm = g => NAMES[sp(g)];
  const STAGE = ['Quả trứng bí ẩn', 'Trứng sắp nở', 'Bé {n}', '{n}', '{n} Vương'];
  const OWL_STAGE = ['Trứng Ánh Sao', 'Cú Non Tò Mò', 'Cú Học Việc', 'Cú Thông Thái', 'Cú Vương Tri Thức',
    'Trứng Lửa', 'Chim Non', 'Phượng Lửa', 'Phượng Hoàng', 'Phượng Vương',
    'Mầm Cầu Vồng', 'Kỳ Lân Nhỏ', 'Kỳ Lân Ánh Sáng', 'Kỳ Lân Ngân Hà', 'Kỳ Lân Hoàng Gia'];
  const OWL_MSG = ['Trứng Ánh Sao đã xuất hiện!', 'Một chú Cú Non Tò Mò đã thức giấc!', 'Cú Học Việc đã sẵn sàng khám phá!', 'Cú Thông Thái đã mở kho tri thức!', 'Cú Vương Tri Thức đã đăng quang! 👑',
    'Cú Vương đã tái sinh thành Trứng Lửa!', 'Chim Non đã bước ra từ ngọn lửa!', 'Phượng Lửa đã tung đôi cánh rực rỡ!', 'Phượng Hoàng đã làm bừng sáng bầu trời!', 'Phượng Vương đã đăng quang giữa hào quang! 🔥',
    'Một Mầm Cầu Vồng nhiệm màu đã xuất hiện!', 'Kỳ Lân Nhỏ đã đến bên em!', 'Kỳ Lân Ánh Sáng đang toả sáng!', 'Kỳ Lân Ngân Hà đã mang theo cả trời sao!', 'Kỳ Lân Hoàng Gia đã đạt sức mạnh cao nhất! 🌈👑'];
  const MSG = ['', 'Quả trứng đang rung rinh… sắp nở rồi!', 'Trứng đã nở! Chào bé {n}!', '{n} đã lớn phổng phao rồi!', '{n} đã đội vương miện! Em thật xuất sắc! 👑'];
  const LEGEND = [[50,'Kỳ Lân Tinh Anh'],[120,'Kỳ Lân Kim Cương'],[250,'Kỳ Lân Thiên Hà'],[500,'Kỳ Lân Thần Thoại'],[1000,'Kỳ Lân Bất Diệt']];
  function legend(points){
    const p = Math.max(0, Number(points) || 0); let rank = 0;
    LEGEND.forEach((x, i) => { if(p >= x[0]) rank = i + 1; });
    const stars = rank === 5 ? Math.floor((p - 1000) / 250) + 1 : 0;
    const next = rank < 5 ? LEGEND[rank][0] : 1000 + stars * 250;
    return {points:p, rank, name:rank ? LEGEND[rank - 1][1] : 'Kỳ Lân Hoàng Gia', stars, next};
  }
  const count = g => sp(g) === 'cu' ? OWL_STAGE.length : STAGE.length;
  function thresholds(g){
    const M = g.lessons.length * 9;
    if(sp(g) === 'cu'){
      const t = [0, 10, 25, 42, 60];
      for(let i = 1; i <= 10; i++) t.push(60 + Math.ceil((M - 60) * i / 10));
      return t;
    }
    const t = [0, 3, Math.max(6, Math.ceil(.15*M)), Math.ceil(.4*M), Math.ceil(.75*M)];
    for(let i = 2; i < 5; i++) if(t[i] <= t[i-1]) t[i] = t[i-1] + 2; return t;
  }
  const stage = g => { const s = gradeStars(g), t = thresholds(g); let k = 0; t.forEach((v,i) => { if(s >= v) k = i }); return k; };
  const name = (g, k) => sp(g) === 'cu' ? OWL_STAGE[Math.max(0, Math.min(OWL_STAGE.length - 1, k))] : STAGE[Math.max(0, Math.min(STAGE.length - 1, k))].replace('{n}', nm(g));
  const masteryOf = (g, opt) => opt && opt.mastery != null ? Math.max(0, Number(opt.mastery) || 0) : typeof Play !== 'undefined' && Play.mastery ? Play.mastery(g) : 0;
  const title = (g, k, points) => sp(g) === 'cu' && k === count(g) - 1 && points > 0 ? `${legend(points).name}${legend(points).stars ? ` ★${legend(points).stars}` : ''}` : name(g, k);

  /* ---- Vẽ ---- */
  function svg(g, k, cls='', opt){
    const base = sp(g), phase = base === 'cu' ? Math.floor(k / 5) : 0, q = base === 'cu' ? k % 5 : k;
    const s = base === 'cu' && phase === 1 ? 'phuong' : base === 'cu' && phase >= 2 ? 'kylan' : base;
    const W = 120, L = opt || (typeof Play !== 'undefined' ? Play.look() : {}), wear = L.wear || {}, mood = L.mood || 'vui';
    const mastery = s === 'kylan' && q === 4 ? legend(masteryOf(g, L)) : legend(0);
    const bg = wear.bg && typeof Play !== 'undefined' ? Play.bgSVG(wear.bg) : '';
    const egg = (crack) => `<ellipse class="pet-shadow" cx="60" cy="110" rx="30" ry="5"/>
      <g class="${crack?'pet-wobble':'pet-float'}"><path class="pet-egg" d="M60 18 C 86 18 96 58 96 76 C 96 98 80 108 60 108 C 40 108 24 98 24 76 C 24 58 34 18 60 18 Z"/>
      <circle class="pet-spot" cx="46" cy="52" r="7"/><circle class="pet-spot" cx="72" cy="42" r="5"/><circle class="pet-spot" cx="74" cy="80" r="8"/><circle class="pet-spot" cx="42" cy="88" r="4"/>
      ${crack?`<path class="pet-crack" d="M30 66 L40 58 L48 68 L57 57 L66 69 L75 58 L84 67 L90 62"/>
      <ellipse class="pet-eye" cx="50" cy="50" rx="3.5" ry="4.5"/><ellipse class="pet-eye" cx="68" cy="50" rx="3.5" ry="4.5"/>`:''}</g>`;
    const fireEgg = () => `<ellipse class="pet-shadow" cx="60" cy="110" rx="31" ry="5"/><g class="pet-float"><path class="pet-flame-back" d="M60 8 C48 27 28 35 29 67 C30 94 43 108 60 108 C78 108 91 94 91 67 C92 38 74 30 68 15 C66 29 58 35 52 43 C53 28 59 18 60 8 Z"/><path class="pet-egg" d="M60 29 C80 29 88 62 88 78 C88 98 75 107 60 107 C45 107 32 98 32 78 C32 62 40 29 60 29 Z"/><path class="pet-flame-core" d="M60 18 C54 35 43 43 46 58 C48 68 53 72 60 74 C68 70 73 63 72 54 C71 43 64 36 60 18 Z"/><circle class="pet-spot" cx="48" cy="76" r="6"/><circle class="pet-spot" cx="70" cy="84" r="7"/></g>`;
    const rainbowSeed = () => `<ellipse class="pet-shadow" cx="60" cy="110" rx="31" ry="5"/><g class="pet-float"><path class="pet-rainbow r1" d="M22 72 A38 38 0 0 1 98 72"/><path class="pet-rainbow r2" d="M29 72 A31 31 0 0 1 91 72"/><path class="pet-rainbow r3" d="M36 72 A24 24 0 0 1 84 72"/><path class="pet-cloud" d="M24 78 C24 68 33 62 42 66 C47 52 68 52 74 65 C86 60 98 69 96 80 C94 91 82 94 69 91 C61 101 43 99 39 91 C30 93 23 88 24 78 Z"/><path class="pet-sprout" d="M60 86 C57 73 52 67 44 62 M60 85 C64 71 70 66 78 62"/><path class="pet-leaf" d="M44 62 C48 53 58 55 59 64 C52 68 47 67 44 62 Z"/><path class="pet-leaf alt" d="M78 62 C75 52 65 54 63 64 C69 68 75 67 78 62 Z"/><circle class="pet-gem" cx="60" cy="86" r="7"/></g>`;
    if(s === 'cu' && q <= 0) return `<svg class="pet sp-${s} ${cls}" viewBox="0 0 ${W} ${W}" aria-label="${name(g,k)}" role="img">${bg}${egg(false)}</svg>`;
    if(s === 'phuong' && q === 0) return `<svg class="pet sp-${s} ${cls}" viewBox="0 0 ${W} ${W}" aria-label="${name(g,k)}" role="img">${bg}${fireEgg()}</svg>`;
    if(s === 'kylan' && q === 0) return `<svg class="pet sp-${s} ${cls}" viewBox="0 0 ${W} ${W}" aria-label="${name(g,k)}" role="img">${bg}${rainbowSeed()}</svg>`;
    if(base !== 'cu' && q <= 1) return `<svg class="pet sp-${s} ${cls}" viewBox="0 0 ${W} ${W}" aria-label="${name(g,k)}" role="img">${bg}${egg(q===1)}</svg>`;
    const grown = q >= 3, r = grown ? 34 : 27, cx = 60, cy = grown ? 70 : 76;
    const P = (x,y) => `${(cx + x*r).toFixed(1)} ${(cy + y*r).toFixed(1)}`;
    let back = '', front = '';
    if(s === 'meo'){ front += `<path class="pet-body" d="M${P(-.85,-.45)} L${P(-.6,-1.2)} L${P(-.15,-.9)} Z"/><path class="pet-body" d="M${P(.85,-.45)} L${P(.6,-1.2)} L${P(.15,-.9)} Z"/>
        <path class="pet-belly" d="M${P(-.66,-.62)} L${P(-.57,-.98)} L${P(-.35,-.83)} Z"/><path class="pet-belly" d="M${P(.66,-.62)} L${P(.57,-.98)} L${P(.35,-.83)} Z"/>`;
      if(grown) back += `<path class="pet-tail" d="M${P(.8,.5)} C ${P(1.5,.5)} ${P(1.5,-.4)} ${P(1.15,-.55)}"/>`; }
    if(s === 'rong'){ front += `<path class="pet-horn" d="M${P(-.55,-.8)} L${P(-.45,-1.25)} L${P(-.25,-.92)} Z"/><path class="pet-horn" d="M${P(.55,-.8)} L${P(.45,-1.25)} L${P(.25,-.92)} Z"/>`;
      if(grown) back += `<path class="pet-wing" d="M${P(-.8,-.1)} L${P(-1.55,-.75)} L${P(-1.35,-.05)} L${P(-1.6,.25)} L${P(-.85,.35)} Z"/><path class="pet-wing" d="M${P(.8,-.1)} L${P(1.55,-.75)} L${P(1.35,-.05)} L${P(1.6,.25)} L${P(.85,.35)} Z"/>`; }
    if(s === 'cu'){ front += `<path class="pet-body" d="M${P(-.9,-.4)} L${P(-.75,-1.15)} L${P(-.3,-.9)} Z"/><path class="pet-body" d="M${P(.9,-.4)} L${P(.75,-1.15)} L${P(.3,-.9)} Z"/>`;
      if(grown) back += `<ellipse class="pet-wing" cx="${cx - r*.95}" cy="${cy + r*.2}" rx="${r*.32}" ry="${r*.6}"/><ellipse class="pet-wing" cx="${cx + r*.95}" cy="${cy + r*.2}" rx="${r*.32}" ry="${r*.6}"/>`; }
    if(s === 'phuong'){
      back += `<path class="pet-tail-fire" d="M${P(-.35,.65)} C ${P(-.9,1.1)} ${P(-.55,1.45)} ${P(-.15,1.02)} C ${P(-.2,1.52)} ${P(.2,1.48)} ${P(.18,1.0)} C ${P(.65,1.43)} ${P(.92,1.06)} ${P(.38,.62)} Z"/>`;
      front += `<path class="pet-crest" d="M${P(-.28,-.88)} Q ${P(-.18,-1.42)} ${P(.04,-.98)} Q ${P(.22,-1.5)} ${P(.34,-.82)} Z"/><path class="pet-beak" d="M${P(-.08,.08)} L${P(.2,.16)} L${P(-.03,.3)} Z"/>`;
      if(q >= 2) back += `<path class="pet-phoenix-wing" d="M${P(-.7,-.15)} C ${P(-1.38,-.88)} ${P(-1.65,-.2)} ${P(-1.05,.2)} L${P(-1.55,.35)} L${P(-.82,.55)} Z"/><path class="pet-phoenix-wing" d="M${P(.7,-.15)} C ${P(1.38,-.88)} ${P(1.65,-.2)} ${P(1.05,.2)} L${P(1.55,.35)} L${P(.82,.55)} Z"/>`;
    }
    if(s === 'kylan'){
      back += `<path class="pet-mane m1" d="M${P(-.58,-.7)} C ${P(-1.08,-.45)} ${P(-1.0,.15)} ${P(-.65,.35)} C ${P(-.92,.52)} ${P(-.65,.78)} ${P(-.38,.65)} Z"/><path class="pet-mane m2" d="M${P(-.48,-.86)} C ${P(-.92,-.8)} ${P(-.98,-.38)} ${P(-.64,-.2)} L${P(-.32,-.48)} Z"/>`;
      front += `<path class="pet-ear" d="M${P(-.68,-.56)} L${P(-.72,-1.12)} L${P(-.28,-.82)} Z"/><path class="pet-ear" d="M${P(.68,-.56)} L${P(.72,-1.12)} L${P(.28,-.82)} Z"/><path class="pet-unicorn-horn" d="M${P(-.12,-.88)} L${P(.05,-1.62)} L${P(.25,-.88)} Z"/><path class="pet-horn-line" d="M${P(-.04,-1.18)} L${P(.16,-1.1)} M${P(.0,-1.38)} L${P(.11,-1.34)}"/>`;
      if(q >= 2) back += `<path class="pet-star-wing" d="M${P(-.72,-.1)} C ${P(-1.35,-.68)} ${P(-1.58,-.16)} ${P(-1.05,.2)} L${P(-1.48,.42)} L${P(-.78,.52)} Z"/><path class="pet-star-wing alt" d="M${P(.72,-.1)} C ${P(1.35,-.68)} ${P(1.58,-.16)} ${P(1.05,.2)} L${P(1.48,.42)} L${P(.78,.52)} Z"/>`;
    }
    if(s === 'tho'){ const L = grown ? 1.35 : .95;
      back += `<ellipse class="pet-body" cx="${cx - r*.4}" cy="${cy - r*(.55+L/2)}" rx="${r*.2}" ry="${r*L/2+4}" transform="rotate(-10 ${cx - r*.4} ${cy - r*.8})"/><ellipse class="pet-body" cx="${cx + r*.4}" cy="${cy - r*(.55+L/2)}" rx="${r*.2}" ry="${r*L/2+4}" transform="rotate(10 ${cx + r*.4} ${cy - r*.8})"/>
        <ellipse class="pet-belly" cx="${cx - r*.4}" cy="${cy - r*(.55+L/2)}" rx="${r*.09}" ry="${r*L/2-2}" transform="rotate(-10 ${cx - r*.4} ${cy - r*.8})"/><ellipse class="pet-belly" cx="${cx + r*.4}" cy="${cy - r*(.55+L/2)}" rx="${r*.09}" ry="${r*L/2-2}" transform="rotate(10 ${cx + r*.4} ${cy - r*.8})"/>`; }
    const face = s === 'phuong' ? '' : s === 'cu'
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
    const shell = q < 2 && s === 'phuong' ? `<path class="pet-egg" d="M26 90 L34 82 L42 90 L51 81 L60 90 L69 81 L78 90 L86 82 L94 90 C 94 104 80 110 60 110 C 40 110 26 104 26 90 Z"/>` : '';
    const crown = q === 4 && !wear.hat ? `<path class="pet-crown" d="M${P(-.42,-.82)} L${P(-.45,-1.3)} L${P(-.2,-1.06)} L${P(0,-1.42)} L${P(.2,-1.06)} L${P(.45,-1.3)} L${P(.42,-.82)} Z"/><circle class="pet-gem" cx="${cx}" cy="${cy - r*1.0}" r="${r*.07}"/>` : '';
    const spark = q >= 3 ? `<path class="pet-spark" d="M16 30 l3 -8 l3 8 l8 3 l-8 3 l-3 8 l-3 -8 l-8 -3 Z"/><path class="pet-spark s2" d="M98 20 l2 -6 l2 6 l6 2 l-6 2 l-2 6 l-2 -6 l-6 -2 Z"/><path class="pet-spark s3" d="M104 86 l2 -5 l2 5 l5 2 l-5 2 l-2 5 l-2 -5 l-5 -2 Z"/>` : '';
    const aura = mastery.rank ? `<circle class="pet-legend-aura" cx="60" cy="61" r="47"/><path class="pet-legend-ring" d="M13 61 A47 47 0 0 1 107 61"/>${mastery.rank >= 2 ? '<path class="pet-diamond" d="M60 5 l7 9 -7 10 -7 -10 Z"/>' : ''}${mastery.rank >= 3 ? '<circle class="pet-cosmic c1" cx="18" cy="54" r="3"/><circle class="pet-cosmic c2" cx="102" cy="46" r="4"/><circle class="pet-cosmic c3" cx="94" cy="91" r="2.5"/>' : ''}` : '';
    return `<svg class="pet sp-${s} legend-r${mastery.rank} ${cls}" viewBox="0 0 ${W} ${W}" aria-label="${title(g,k,mastery.points)}" role="img">${bg}${aura}<ellipse class="pet-shadow" cx="60" cy="112" rx="${grown?34:30}" ry="5"/>${spark}
      <g class="pet-float">${back}${body}${feet}${front}${eyes}${face}${tear}${crown}${acc}</g>${shell}</svg>`;
  }

  /* ---- Thẻ thú cưng trên trang khối lớp ---- */
  function card(g){
    const s = gradeStars(g), k = stage(g), t = thresholds(g), total = count(g), next = t[k+1], mp = masteryOf(g), lg = legend(mp);
    const pct = next ? Math.round((s - t[k]) / (next - t[k]) * 100) : 100;
    const legendPct = Math.max(0, Math.min(100, Math.round((mp - (lg.rank ? LEGEND[lg.rank - 1][0] : 0)) / (lg.next - (lg.rank ? LEGEND[lg.rank - 1][0] : 0)) * 100)));
    return `<section class="pet-card card" aria-label="Thú cưng của em">
      <div class="pet-stage">${svg(g, k, 'big')}</div>
      <div class="pet-info"><small>Thú cưng ${g.name} · Cấp ${k+1}/${total}</small><h2>${title(g,k,mp)}</h2>
        <div class="bar"><i style="width:${next ? pct : legendPct}%"></i></div>
        <p>${next ? `Em có <b>${s} ⭐</b>. Còn <b>${next - s} ⭐</b> nữa để tiến hoá thành <b>${name(g,k+1)}</b>!` : count(g) > 5 ? `🔮 <b>${mp} Điểm Tinh Thông</b> · Còn <b>${lg.next - mp} điểm</b> để ${lg.rank < 5 ? `đạt <b>${LEGEND[lg.rank][1]}</b>` : `lên <b>★${lg.stars + 1}</b>`}.` : `Em có <b>${s} ⭐</b>. Thú cưng đã đạt cấp cao nhất! 👑`}</p>
        <div class="pet-steps ${total > 5 ? 'long' : ''}">${Array.from({length:total}, (_,i) => `<span class="${i<=k?'on':''}" title="${name(g,i)}">${svg(g, i, '', {mood:'vui'})}</span>`).join('')}</div>
        ${!next && count(g) > 5 ? `<div class="legend-path"><b>Hành trình Huyền thoại</b><span>${LEGEND.map((x,i) => `<i class="${lg.rank > i ? 'on' : ''}">${i+1}. ${x[1]}${i===4&&lg.stars?` ★${lg.stars}`:''}</i>`).join('')}</span></div>` : ''}
      </div></section>`;
  }
  function bindCard(){ const c = $('.pet-card .pet-stage'); if(c) c.onclick = () => { c.classList.remove('boing'); void c.offsetWidth; c.classList.add('boing'); }; }

  /* ---- Tiến hoá ---- */
  function check(g){
    const k = stage(g), key = `hoctap:petseen-v2:${g.id}`, seen = store.get(key);
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
        h.textContent = `${name(g, to)}`; p.textContent = (sp(g) === 'cu' ? OWL_MSG[to] : MSG[to].replace(/\{n\}/g, nm(g))); }, 350); }, 1100);
    const close = () => el.remove();
    el.querySelector('[data-close]').onclick = close; el.addEventListener('click', e => { if(e.target === el) close(); });
    el.querySelector('[data-close]').focus();
  }
  const summary = () => App.grades.map(g => { const k = stage(g), p = masteryOf(g); return `${g.name}: ${gradeStars(g)}⭐ – ${title(g, k, p)}${p ? ` – ${p}🔮` : ''}`; }).join(' | ');
  return { svg, card, bindCard, check, show, stage, name, title, legend, summary, thresholds, count };
})();
