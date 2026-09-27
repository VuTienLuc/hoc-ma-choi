/* =====================================================================
   PLAY – "Nhà thú cưng": chăm sóc hằng ngày, cửa hàng phụ kiện, nhiệm vụ ngày,
   huy hiệu và bảng xếp hạng lớp. Nạp SAU account.js, TRƯỚC engine.js.
   - Làm đúng: +2 xu (đúng ngay lần đầu) / +1 xu (đúng lần hai). Xong một bộ: mỗi ⭐ = 1 hạt thức ăn.
   - Thú cưng đói (no) và buồn (vui) dần theo thời gian nếu em không học; KHÔNG bao giờ chết.
   - Trạng thái lưu trong store 'hoctap:play' (riêng từng học sinh) và đồng bộ lên Google Sheet.
   ===================================================================== */
const Play = (() => {
  const KEY = 'hoctap:play';
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const pad = n => String(n).padStart(2,'0');
  const today = () => { const d = new Date(); return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`; };
  const dayNum = s => s ? Math.round(new Date(s + 'T12:00:00').getTime() / 864e5) : -1e9;
  const clamp = v => Math.max(0, Math.min(100, Math.round(v)));
  const uid = () => (typeof Account !== 'undefined' && Account.user) ? `${Account.user.lop}|${Account.user.user}` : '';
  const blankStats = () => ({correct:0, sets:0, three:0, run:0, bestRun:0, fed:0, played:0, bought:0});
  const blank = () => ({v:1, ts:0, xu:0, xuTotal:0, food:3, no:80, vui:80, t:Date.now(), lastPlay:0,
    streak:0, best:0, last:'', owned:[], wear:{}, q:{day:'', list:[]}, qDone:0, badges:{}, st:blankStats(), seen:{}});
  let S = null, who = null;

  /* ---------- Lưu / nạp ---------- */
  function st(){
    if(S && who === uid()) return S;
    who = uid(); const d = store.get(KEY) || {};
    S = Object.assign(blank(), d); S.st = Object.assign(blankStats(), d.st || {}); S.wear = S.wear || {};
    tick(); rollQuests(); return S;
  }
  function tick(){   // đói, buồn dần theo thời gian; chuỗi ngày bị ngắt nếu bỏ quá 1 ngày
    const now = Date.now(), days = Math.max(0, (now - (S.t || now)) / 864e5);
    S.no = clamp(S.no - 22*days); S.vui = clamp(S.vui - 28*days); S.t = now;
    if(S.last && dayNum(today()) - dayNum(S.last) > 1) S.streak = 0;
  }
  let syncT = null;
  function save(sync){
    S.ts = Date.now(); store.set(KEY, S);
    if(sync && typeof Account !== 'undefined' && Account.syncPlay){ clearTimeout(syncT); syncT = setTimeout(() => Account.syncPlay(snapshot()), 3000); }
  }
  function snapshot(){ st(); const pets = {}; App.grades.forEach(g => pets[g.id] = Pet.stage(g)); return JSON.stringify({...S, pets}); }
  function adopt(raw){   // nhận dữ liệu từ máy chủ khi đăng nhập (nếu mới hơn dữ liệu trên máy)
    S = null; if(!raw) return; let d; try{ d = typeof raw === 'string' ? JSON.parse(raw) : raw; }catch(e){ return; }
    const cur = store.get(KEY); if(cur && (cur.ts||0) >= (d.ts||0)) return;
    delete d.pets; store.set(KEY, d); S = null;
  }

  /* ---------- Thông báo nối tiếp ---------- */
  const Q = []; let busy = false;
  function note(m){ Q.push(m); if(!busy) nextNote(); }
  function nextNote(){ const m = Q.shift(); if(!m){ busy = false; return; } busy = true; try{ toast(m) }catch(e){} setTimeout(nextNote, 1700); }

  /* ---------- Nhiệm vụ ngày ---------- */
  const QUESTS = {
    bo1:   {text:'Hoàn thành 1 bộ câu hỏi', n:1, xu:10, food:1},
    bo3:   {text:'Hoàn thành 3 bộ câu hỏi', n:3, xu:25, food:2},
    dung10:{text:'Trả lời đúng 10 câu', n:10, xu:15, food:1},
    dung20:{text:'Trả lời đúng 20 câu', n:20, xu:25, food:1},
    lien5: {text:'Đúng liền 5 câu ngay lần đầu', n:5, xu:20, food:1},
    sao3:  {text:'Đạt ⭐⭐⭐ ở một bộ', n:1, xu:20, food:1},
    muc2:  {text:'Làm xong một bộ ở Mức 2 hoặc Mức 3', n:1, xu:15, food:1},
    moi:   {text:'Làm một bài em chưa làm bao giờ', n:1, xu:20, food:1},
    an:    {text:'Cho thú cưng ăn 1 lần', n:1, xu:5, food:0},
    choi:  {text:'Chơi với thú cưng 1 lần', n:1, xu:5, food:0},
  };
  function seeded(str){ let h = 2166136261; for(const c of str){ h ^= c.charCodeAt(0); h = Math.imul(h, 16777619); } return () => { h += 0x6D2B79F5; let t = h; t = Math.imul(t ^ t >>> 15, t | 1); t ^= t + Math.imul(t ^ t >>> 7, t | 61); return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
  function rollQuests(){
    const d = today(); if(S.q.day === d) return;
    const rnd = seeded(d + uid()), pk = a => a.splice(Math.floor(rnd()*a.length), 1)[0];
    const setQ = ['bo1','bo1','bo3'], ansQ = ['dung10','dung20','lien5','sao3','muc2','moi'], care = ['an','choi'];
    S.q = {day:d, list:[pk(setQ), pk(ansQ), rnd() < .5 ? pk(care) : pk(ansQ)].map(id => ({id, p:0, done:false}))};
  }
  function quest(id, add = 1, setTo){
    for(const it of S.q.list){ if(it.id !== id || it.done) continue; const Qd = QUESTS[id];
      it.p = setTo != null ? Math.max(it.p, setTo) : it.p + add;
      if(it.p >= Qd.n){ it.p = Qd.n; it.done = true; S.qDone++; S.xu += Qd.xu; S.xuTotal += Qd.xu; S.food += Qd.food;
        note(`🎯 Xong nhiệm vụ: ${Qd.text}! +${Qd.xu} 🪙${Qd.food?` +${Qd.food} 🍖`:''}`); } }
  }

  /* ---------- Huy hiệu ---------- */
  const BADGES = [
    ['buoc-dau','🌱','Bước đầu tiên','Hoàn thành bộ câu hỏi đầu tiên', s => s.st.sets >= 1],
    ['ba-sao','⭐','Ba sao đầu tiên','Lần đầu đạt ⭐⭐⭐ một bộ', s => s.st.three >= 1],
    ['sieu-sao','🌟','Siêu sao','Đạt ⭐⭐⭐ ở 10 bộ', s => s.st.three >= 10],
    ['cham-chi','🔥','Chăm chỉ','Học 3 ngày liên tiếp', s => s.best >= 3],
    ['ben-bi','💪','Bền bỉ','Học 7 ngày liên tiếp', s => s.best >= 7],
    ['kien-tri','🏆','Kiên trì','Học 30 ngày liên tiếp', s => s.best >= 30],
    ['tram-cau','💯','Trăm câu đúng','Trả lời đúng 100 câu', s => s.st.correct >= 100],
    ['nghin-cau','🧠','Bộ óc vàng','Trả lời đúng 500 câu', s => s.st.correct >= 500],
    ['lien-tay','⚡','Nhanh tay chắc chắn','Đúng liền 10 câu ngay lần đầu', s => s.st.bestRun >= 10],
    ['dau-bep','🍖','Người nuôi tận tâm','Cho thú cưng ăn 20 lần', s => s.st.fed >= 20],
    ['ban-than','🎾','Bạn thân','Chơi với thú cưng 20 lần', s => s.st.played >= 20],
    ['thoi-trang','🎀','Nhà tạo mẫu','Mua 3 món phụ kiện', s => s.st.bought >= 3],
    ['nhiem-vu','🎯','Hoàn thành nhiệm vụ','Xong 10 nhiệm vụ ngày', s => s.qDone >= 10],
    ['vuong-mien','👑','Vương miện','Thú cưng một khối đạt cấp 5', () => App.grades.some(g => Pet.stage(g) === 4)],
  ];
  function checkBadges(){
    for(const [id, ic, nm, , ok] of BADGES) if(!S.badges[id] && ok(S)){ S.badges[id] = today(); S.xu += 10; S.xuTotal += 10; note(`🏅 Huy hiệu mới: ${ic} ${nm}! +10 🪙`); }
  }

  /* ---------- Phụ kiện (vẽ SVG, màu lấy từ biến CSS acc-*) ---------- */
  const ITEMS = [
    {id:'mu-tiec',   slot:'hat',  name:'Mũ sinh nhật', price:30},
    {id:'mu-len',    slot:'hat',  name:'Mũ len ấm áp', price:40},
    {id:'no-hoa',    slot:'hat',  name:'Bông hoa xinh', price:25},
    {id:'mu-tn',     slot:'hat',  name:'Mũ tốt nghiệp', price:80},
    {id:'kinh-tron', slot:'eye',  name:'Kính tròn thông thái', price:35},
    {id:'kinh-ram',  slot:'eye',  name:'Kính râm sành điệu', price:45},
    {id:'kinh-tim',  slot:'eye',  name:'Kính trái tim', price:50},
    {id:'no-co',     slot:'neck', name:'Nơ đỏ', price:20},
    {id:'khan',      slot:'neck', name:'Khăn quàng xanh', price:30},
    {id:'huy-chuong',slot:'neck', name:'Huy chương vàng', price:70},
    {id:'nen-vuon',  slot:'bg',   name:'Khu vườn', price:50},
    {id:'nen-bien',  slot:'bg',   name:'Bãi biển', price:60},
    {id:'nen-dem',   slot:'bg',   name:'Bầu trời đêm', price:70},
    {id:'nen-lop',   slot:'bg',   name:'Lớp học', price:60},
  ];
  const SLOT = {hat:'Mũ & hoa', eye:'Kính', neck:'Nơ & khăn', bg:'Phòng / nền'};
  function bgSVG(id){
    const box = inner => `<g class="acc-bg"><clipPath id="clip-${id}"><rect x="2" y="2" width="116" height="116" rx="18"/></clipPath><g clip-path="url(#clip-${id})">${inner}</g></g>`;
    if(id === 'nen-vuon') return box(`<rect class="acc-sky" width="120" height="120"/><circle class="acc-yellow" cx="96" cy="24" r="11"/><ellipse class="acc-grass" cx="30" cy="118" rx="60" ry="26"/><ellipse class="acc-grass2" cx="100" cy="122" rx="55" ry="24"/><circle class="acc-pink" cx="18" cy="100" r="4"/><circle class="acc-yellow" cx="104" cy="104" r="3.5"/>`);
    if(id === 'nen-bien') return box(`<rect class="acc-sky" width="120" height="120"/><rect class="acc-sea" y="70" width="120" height="30"/><path class="acc-foam" d="M0 72 q10 -6 20 0 t20 0 t20 0 t20 0 t20 0 t20 0"/><rect class="acc-sand" y="98" width="120" height="22"/><circle class="acc-yellow" cx="22" cy="24" r="10"/>`);
    if(id === 'nen-dem') return box(`<rect class="acc-night" width="120" height="120"/><circle class="acc-moon" cx="94" cy="24" r="10"/><circle class="acc-night" cx="99" cy="20" r="9"/>${[[16,18],[40,10],[64,26],[22,50],[108,54],[80,44]].map(([x,y]) => `<path class="acc-yellow" d="M${x} ${y-4} l1.2 3 3 1.2 -3 1.2 -1.2 3 -1.2 -3 -3 -1.2 3 -1.2 Z"/>`).join('')}<rect class="acc-grass-dark" y="104" width="120" height="16"/>`);
    if(id === 'nen-lop') return box(`<rect class="acc-wall" width="120" height="120"/><rect class="acc-board" x="14" y="10" width="92" height="44" rx="4"/><text class="acc-chalk" x="60" y="40" text-anchor="middle" font-size="15" font-family="var(--f-head)">1 + 1 = 2</text><rect class="acc-wood" y="104" width="120" height="16"/>`);
    return '';
  }
  function accSVG(w, cx, cy, r){
    const top = cy - r*.95, P = (x,y) => `${(cx + x*r).toFixed(1)} ${(cy + y*r).toFixed(1)}`; let s = '';
    const ey = cy - r*.12, ex = r*.36;
    if(w.neck === 'no-co') s += `<path class="acc-red acc-st" d="M${cx} ${cy+r*.62} L${cx-r*.34} ${cy+r*.46} L${cx-r*.34} ${cy+r*.8} Z M${cx} ${cy+r*.62} L${cx+r*.34} ${cy+r*.46} L${cx+r*.34} ${cy+r*.8} Z"/><circle class="acc-red acc-st" cx="${cx}" cy="${cy+r*.62}" r="${r*.1}"/>`;
    if(w.neck === 'khan') s += `<path class="acc-blue acc-st" d="M${P(-.78,.42)} Q ${P(0,.72)} ${P(.78,.42)} L${P(.74,.62)} Q ${P(0,.92)} ${P(-.74,.62)} Z"/><path class="acc-blue acc-st" d="M${P(.3,.7)} L${P(.52,1.08)} L${P(.24,1.1)} L${P(.12,.74)} Z"/>`;
    if(w.neck === 'huy-chuong') s += `<path class="acc-red acc-st" d="M${P(-.3,.38)} L${P(0,.72)} L${P(.3,.38)} L${P(.16,.38)} L${P(0,.58)} L${P(-.16,.38)} Z"/><circle class="acc-gold acc-st" cx="${cx}" cy="${cy+r*.82}" r="${r*.17}"/><path class="acc-gold-dark" d="M${cx} ${cy+r*.72} l${r*.03} ${r*.07} ${r*.07} 0 -${r*.055} ${r*.045} ${r*.02} ${r*.075} -${r*.065} -${r*.045} -${r*.065} ${r*.045} ${r*.02} -${r*.075} -${r*.055} -${r*.045} ${r*.07} 0 Z"/>`;
    if(w.eye === 'kinh-tron') s += `<circle class="acc-glass acc-st" cx="${cx-ex}" cy="${ey}" r="${r*.22}"/><circle class="acc-glass acc-st" cx="${cx+ex}" cy="${ey}" r="${r*.22}"/><path class="acc-line" d="M${cx-ex+r*.22} ${ey} Q ${cx} ${ey-r*.1} ${cx+ex-r*.22} ${ey}"/>`;
    if(w.eye === 'kinh-ram') s += `<rect class="acc-dark acc-st" x="${cx-ex-r*.25}" y="${ey-r*.16}" width="${r*.5}" height="${r*.32}" rx="${r*.12}"/><rect class="acc-dark acc-st" x="${cx+ex-r*.25}" y="${ey-r*.16}" width="${r*.5}" height="${r*.32}" rx="${r*.12}"/><path class="acc-line" d="M${cx-ex+r*.25} ${ey-r*.04} L${cx+ex-r*.25} ${ey-r*.04}"/><path class="acc-shine" d="M${cx-ex-r*.14} ${ey-r*.06} l${r*.1} -${r*.06} M${cx+ex-r*.14} ${ey-r*.06} l${r*.1} -${r*.06}"/>`;
    if(w.eye === 'kinh-tim'){ const H = x => `<path class="acc-pink acc-st" d="M${x} ${ey+r*.2} C ${x-r*.34} ${ey-r*.02} ${x-r*.2} ${ey-r*.3} ${x} ${ey-r*.12} C ${x+r*.2} ${ey-r*.3} ${x+r*.34} ${ey-r*.02} ${x} ${ey+r*.2} Z"/>`;
      s += H(cx-ex) + H(cx+ex) + `<path class="acc-line" d="M${cx-ex+r*.2} ${ey-r*.08} L${cx+ex-r*.2} ${ey-r*.08}"/>`; }
    if(w.hat === 'mu-tiec') s += `<path class="acc-purple acc-st" d="M${cx-r*.34} ${top+r*.14} L${cx} ${top-r*.72} L${cx+r*.34} ${top+r*.14} Z"/><path class="acc-yellow" d="M${cx-r*.2} ${top-r*.2} L${cx+r*.2} ${top-r*.2} L${cx+r*.26} ${top-r*.06} L${cx-r*.26} ${top-r*.06} Z"/><circle class="acc-pink acc-st" cx="${cx}" cy="${top-r*.76}" r="${r*.12}"/>`;
    if(w.hat === 'mu-len') s += `<path class="acc-red acc-st" d="M${cx-r*.78} ${top+r*.36} C ${cx-r*.8} ${top-r*.42} ${cx+r*.8} ${top-r*.42} ${cx+r*.78} ${top+r*.36} Z"/><rect class="acc-white acc-st" x="${cx-r*.84}" y="${top+r*.22}" width="${r*1.68}" height="${r*.22}" rx="${r*.1}"/><circle class="acc-white acc-st" cx="${cx}" cy="${top-r*.3}" r="${r*.14}"/>`;
    if(w.hat === 'no-hoa'){ const fx = cx + r*.5, fy = top + r*.2, pr = r*.12;
      s += [0,72,144,216,288].map(a => `<circle class="acc-pink acc-st" cx="${fx + Math.cos(a*Math.PI/180)*pr*1.3}" cy="${fy + Math.sin(a*Math.PI/180)*pr*1.3}" r="${pr}"/>`).join('') + `<circle class="acc-yellow acc-st" cx="${fx}" cy="${fy}" r="${pr*.9}"/>`; }
    if(w.hat === 'mu-tn') s += `<rect class="acc-dark acc-st" x="${cx-r*.36}" y="${top-r*.06}" width="${r*.72}" height="${r*.26}" rx="${r*.05}"/><path class="acc-dark acc-st" d="M${cx} ${top-r*.42} L${cx+r*.78} ${top-r*.18} L${cx} ${top+r*.06} L${cx-r*.78} ${top-r*.18} Z"/><path class="acc-gold-line" d="M${cx} ${top-r*.18} L${cx+r*.56} ${top-r*.06} L${cx+r*.56} ${top+r*.3}"/><circle class="acc-gold" cx="${cx+r*.56}" cy="${top+r*.34}" r="${r*.07}"/>`;
    return s;
  }
  function look(){ const s = st(), m = Math.min(s.no, s.vui); return {wear:s.wear, mood: m >= 55 ? 'vui' : m >= 25 ? 'binh' : 'buon'}; }
  const moodText = () => { const s = st();
    if(s.no < 25) return 'Bé đói bụng lắm rồi… Em làm bài để có hạt cho bé ăn nhé! 🥺';
    if(s.vui < 25) return 'Bé buồn vì nhớ em. Chơi với bé một chút nhé!';
    if(s.no < 55) return 'Bé hơi đói rồi đấy.';
    if(s.vui < 55) return 'Bé muốn được chơi cùng em.';
    return 'Bé đang rất vui và no nê! 💖'; };

  /* ---------- Hành động ---------- */
  function feed(){ const s = st(); if(s.food < 1) return 'Hết hạt rồi! Em làm bài để có thêm hạt nhé (mỗi ⭐ = 1 hạt).';
    if(s.no >= 100) return 'Bé no căng bụng rồi, lát nữa cho ăn tiếp nhé!';
    s.food--; s.no = clamp(s.no + 25); s.vui = clamp(s.vui + 5); s.st.fed++; quest('an'); checkBadges(); save(true); return 'Măm măm… Ngon quá! 😋'; }
  function playWith(){ const s = st(), wait = 20*60*1000 - (Date.now() - s.lastPlay);
    if(s.no < 20) return 'Bé đói quá, không chơi nổi. Cho bé ăn trước nhé!';
    if(wait > 0) return `Bé đang nghỉ mệt. ${Math.ceil(wait/60000)} phút nữa lại chơi tiếp nhé!`;
    s.lastPlay = Date.now(); s.vui = clamp(s.vui + 25); s.no = clamp(s.no - 5); s.st.played++; quest('choi'); checkBadges(); save(true); return 'Vui quá! Bé nhảy tưng tưng! 🎉'; }
  function buy(id){ const s = st(), it = ITEMS.find(i => i.id === id); if(!it || s.owned.includes(id)) return '';
    if(s.xu < it.price) return `Em cần thêm ${it.price - s.xu} 🪙 nữa. Làm thêm bài nhé!`;
    s.xu -= it.price; s.owned.push(id); s.wear[it.slot] = id; s.st.bought++; checkBadges(); save(true); return `Đã mua ${it.name}! 🎁`; }
  function wear(id){ const s = st(), it = ITEMS.find(i => i.id === id); if(!it || !s.owned.includes(id)) return;
    if(s.wear[it.slot] === id) delete s.wear[it.slot]; else s.wear[it.slot] = id; save(true); }

  /* ---------- Sự kiện từ engine / account ---------- */
  function on(ev, a){
    const s = st();
    if(ev === 'answer'){
      if(a.ok){ const c = a.tries === 0 ? 2 : 1; s.xu += c; s.xuTotal += c; s.st.correct++;
        s.st.run = a.tries === 0 ? s.st.run + 1 : 0; s.st.bestRun = Math.max(s.st.bestRun, s.st.run);
        quest('dung10'); quest('dung20'); quest('lien5', 0, s.st.run);
        if(a.el){ const b = document.createElement('span'); b.className = 'coin-pop'; b.textContent = `+${c} 🪙`; a.el.appendChild(b); setTimeout(() => b.remove(), 1400); }
      } else if(a.tries === 1) s.st.run = 0;
      checkBadges(); save(false); updateMini();
    }
    if(ev === 'done'){
      const {g, l, lv, st: stars, pts} = a, food = pts > 0 ? Math.max(1, stars) : 0, bonus = stars === 3 ? 5 : 0;
      s.food += food; s.xu += bonus; s.xuTotal += bonus; s.st.sets++; if(stars === 3) s.st.three++;
      const d = today();
      if(s.last !== d){ s.streak = dayNum(d) - dayNum(s.last) === 1 ? s.streak + 1 : 1; s.last = d; s.best = Math.max(s.best, s.streak);
        if(s.streak > 1) note(`🔥 Chuỗi ${s.streak} ngày học liên tiếp! Giỏi quá!`); }
      if(food) note(`🍖 +${food} hạt cho thú cưng${bonus ? ` · +${bonus} 🪙 thưởng 3 sao` : ''}`);
      quest('bo1'); quest('bo3'); if(stars === 3) quest('sao3'); if(lv >= 2) quest('muc2');
      const lk = `${g.id}:${l.id}`; if(!s.seen[lk]){ s.seen[lk] = 1; quest('moi'); }
      checkBadges(); save(false); updateMini();
    }
    if(ev === 'home') decorateHome(a);
    if(ev === 'lesson') updateMini();
  }

  /* ---------- Giao diện ---------- */
  const meter = (ic, lab, v) => `<div class="meter ${v < 25 ? 'low' : v < 55 ? 'mid' : ''}"><span>${ic} ${lab}</span><div class="bar"><i style="width:${v}%"></i></div><b>${v}</b></div>`;
  const chips = () => { const s = st(); return `<div class="pchips"><span title="Chuỗi ngày học liên tiếp">🔥 <b>${s.streak}</b> ngày</span><span title="Xu">🪙 <b>${s.xu}</b></span><span title="Hạt thức ăn">🍖 <b>${s.food}</b></span><span title="Huy hiệu">🏅 <b>${Object.keys(s.badges).length}</b></span></div>`; };
  function questRows(){ const s = st(); return s.q.list.map(it => { const Qd = QUESTS[it.id];
    return `<li class="${it.done?'done':''}"><span class="qi">${it.done?'✅':'🎯'}</span><div><b>${Qd.text}</b><div class="bar"><i style="width:${Math.round(it.p/Qd.n*100)}%"></i></div></div><small>${it.p}/${Qd.n}<br>+${Qd.xu} 🪙</small></li>`; }).join(''); }
  function decorateHome(g){
    const info = $('.pet-card .pet-info'); if(!info) return; const s = st();
    info.insertAdjacentHTML('afterbegin', chips());
    info.insertAdjacentHTML('beforeend', `<div class="meters">${meter('🍖','No',s.no)}${meter('💖','Vui',s.vui)}</div><p class="mood">${moodText()}</p>
      <div class="row"><button class="btn primary" data-ph="care">🏠 Nhà thú cưng</button><button class="btn" data-ph="shop">🛍️ Cửa hàng</button>${Account.user?'<button class="btn" data-ph="rank">🏆 Xếp hạng lớp</button>':''}</div>`);
    const card = $('.pet-card'); if(card) card.insertAdjacentHTML('afterend', `<section class="quests card"><h3>🎯 Nhiệm vụ hôm nay</h3><ul>${questRows()}</ul><button class="linkbtn" data-ph="badge">Xem huy hiệu (${Object.keys(s.badges).length}/${BADGES.length}) →</button></section>`);
    $$('[data-ph]').forEach(b => b.onclick = () => open(g, b.dataset.ph));
  }
  function updateMini(){ const m = $('.pet-mini'); if(!m) return; let c = m.querySelector('.mini-xu');
    if(!c){ m.insertAdjacentHTML('beforeend', '<b class="mini-xu"></b>'); c = m.querySelector('.mini-xu'); } c.textContent = `🪙 ${st().xu}`; }

  let G = null, TAB = 'care', rankSort = 'stars', rankData = null;
  function open(g, tab){
    G = g; TAB = tab || 'care'; const old = $('#petHome'); if(old) old.remove();
    const el = document.createElement('div'); el.id = 'petHome'; el.className = 'evolve pethome'; el.setAttribute('role','dialog'); el.setAttribute('aria-modal','true');
    el.innerHTML = `<div class="ph card"><button class="ph-x" data-close aria-label="Đóng">✕</button><div class="ph-top" id="phTop"></div>
      <div class="ph-tabs" role="tablist">${[['care','🏠 Chăm sóc'],['shop','🛍️ Cửa hàng'],['quest','🎯 Nhiệm vụ'],['badge','🏅 Huy hiệu'],['rank','🏆 Xếp hạng']].map(([k,t]) => `<button role="tab" data-tab="${k}">${t}</button>`).join('')}</div>
      <div class="ph-body" id="phBody"></div></div>`;
    document.body.appendChild(el); document.body.classList.add('noscroll');
    const close = () => { el.remove(); document.body.classList.remove('noscroll'); if(location.hash === `#/${g.id}`) try{ renderHome() }catch(e){} };
    el.querySelector('[data-close]').onclick = close; el.addEventListener('click', e => { if(e.target === el) close(); });
    el.querySelectorAll('[data-tab]').forEach(b => b.onclick = () => { TAB = b.dataset.tab; draw(); });
    draw();
  }
  function drawTop(msg){ const g = G, k = Pet.stage(g);
    $('#phTop').innerHTML = `<div class="ph-pet" id="phPet">${Pet.svg(g, k, 'big')}</div><div><small>Thú cưng ${esc(g.name)} · Cấp ${k+1}/5</small><h2>${Pet.name(g,k)}</h2>${chips()}<p class="mood" id="phMsg">${msg || moodText()}</p></div>`; }
  function jump(){ const p = $('#phPet'); if(p){ p.classList.remove('boing'); void p.offsetWidth; p.classList.add('boing'); } }
  function draw(msg){
    drawTop(msg); $$('#petHome [data-tab]').forEach(b => b.setAttribute('aria-selected', b.dataset.tab === TAB));
    const s = st(), body = $('#phBody');
    if(TAB === 'care'){
      body.innerHTML = `<div class="meters">${meter('🍖','No bụng',s.no)}${meter('💖','Vui vẻ',s.vui)}</div>
        <div class="row care-btns"><button class="btn primary big" data-act="feed">🍖 Cho ăn <small>(còn ${s.food} hạt)</small></button><button class="btn big" data-act="play">🎾 Chơi cùng bé</button></div>
        <ul class="tips"><li>Làm đúng ngay lần đầu: <b>+2 🪙</b>; đúng lần hai: <b>+1 🪙</b>.</li><li>Xong một bộ: mỗi ⭐ được <b>1 hạt 🍖</b>; đạt ⭐⭐⭐ thưởng thêm <b>5 🪙</b>.</li>
        <li>Mỗi ngày không học, bé sẽ đói và buồn dần – nhưng bé luôn chờ em quay lại. 💖</li><li>Học mỗi ngày để giữ chuỗi 🔥 (dài nhất của em: <b>${s.best}</b> ngày).</li></ul>`;
      body.querySelector('[data-act="feed"]').onclick = () => { const m = feed(); draw(m); if(/Măm/.test(m)) jump(); };
      body.querySelector('[data-act="play"]').onclick = () => { const m = playWith(); draw(m); if(/Vui quá/.test(m)) jump(); };
    }
    if(TAB === 'shop'){
      const k = Math.max(2, Pet.stage(G));
      body.innerHTML = `<p class="note-line">Em đang có <b>${s.xu} 🪙</b>. Chạm vào món đã mua để đeo/tháo.${Pet.stage(G) < 2 ? ' <i>(Trứng nở rồi mới đeo được mũ, kính, nơ; nền phòng thì dùng được ngay.)</i>' : ''}</p>` +
        Object.entries(SLOT).map(([slot, t]) => `<h3>${t}</h3><div class="shop">${ITEMS.filter(i => i.slot === slot).map(i => { const own = s.owned.includes(i.id), on = s.wear[slot] === i.id;
          return `<button class="item ${on?'on':''} ${own?'own':''}" data-item="${i.id}">${Pet.svg(G, k, '', {wear:{[slot]:i.id}, mood:'vui'})}<b>${i.name}</b><span>${on ? '✔ Đang dùng' : own ? 'Dùng' : `${i.price} 🪙`}</span></button>`; }).join('')}</div>`).join('');
      body.querySelectorAll('[data-item]').forEach(b => b.onclick = () => { const id = b.dataset.item;
        if(s.owned.includes(id)){ wear(id); draw(); } else draw(buy(id)); });
    }
    if(TAB === 'quest'){
      body.innerHTML = `<h3>Nhiệm vụ hôm nay</h3><ul class="qlist">${questRows()}</ul><p class="note-line">Mỗi ngày có 3 nhiệm vụ mới. Em đã hoàn thành <b>${s.qDone}</b> nhiệm vụ.</p>
        <h3>Thành tích của em</h3><div class="stats"><span>✅ <b>${s.st.correct}</b> câu đúng</span><span>📚 <b>${s.st.sets}</b> bộ</span><span>⭐⭐⭐ <b>${s.st.three}</b> bộ</span><span>⚡ Đúng liền nhiều nhất <b>${s.st.bestRun}</b></span><span>🔥 Chuỗi dài nhất <b>${s.best}</b> ngày</span><span>🪙 Đã kiếm <b>${s.xuTotal}</b> xu</span></div>`;
    }
    if(TAB === 'badge'){
      body.innerHTML = `<p class="note-line">Mỗi huy hiệu mới thưởng <b>10 🪙</b>. Em có <b>${Object.keys(s.badges).length}/${BADGES.length}</b>.</p><div class="badges">${BADGES.map(([id, ic, nm, desc]) => {
        const got = s.badges[id]; return `<div class="badge ${got?'got':''}"><span class="bi">${ic}</span><b>${nm}</b><small>${desc}${got?`<br>✔ ${got.split('-').reverse().join('/')}`:''}</small></div>`; }).join('')}</div>`;
    }
    if(TAB === 'rank') drawRank(body);
  }
  async function drawRank(body){
    if(!Account.user){ body.innerHTML = '<p class="note-line">Bảng xếp hạng lớp chỉ có khi em <b>đăng nhập</b> bằng tài khoản thầy cô phát.</p>'; return; }
    const head = () => `<div class="row rank-sort">${[['stars','⭐ Tổng sao'],['streak','🔥 Chuỗi ngày'],['badges','🏅 Huy hiệu'],['xu','🪙 Xu đã kiếm']].map(([k,t]) => `<button class="btn small ${rankSort===k?'primary':''}" data-rs="${k}">${t}</button>`).join('')}</div>`;
    const render = () => { const rows = rankData.slice().sort((a,b) => (b[rankSort]-a[rankSort]) || (b.stars-a.stars) || a.name.localeCompare(b.name,'vi'));
      body.innerHTML = head() + `<p class="note-line">Lớp <b>${esc(Account.user.lop)}</b> · ${rows.length} bạn đã tham gia. Cố lên nhé! 💪</p><ol class="rank">${rows.map((r, i) => {
        const k = Math.min(4, Math.max(0, r.pets && r.pets[G.id] != null ? r.pets[G.id] : 0));
        return `<li class="${r.me?'me':''}"><span class="rk">${i<3?['🥇','🥈','🥉'][i]:i+1}</span><span class="rp">${Pet.svg(G, k, '', {wear:r.wear||{}, mood:'vui'})}</span><b>${esc(r.name)}${r.me?' (em)':''}</b><span class="rv">${{stars:'⭐',streak:'🔥',badges:'🏅',xu:'🪙'}[rankSort]} ${r[rankSort]}</span></li>`; }).join('')}</ol>`;
      body.querySelectorAll('[data-rs]').forEach(b => b.onclick = () => { rankSort = b.dataset.rs; render(); }); };
    if(rankData){ render(); }
    else body.innerHTML = '<p class="note-line">Đang tải bảng xếp hạng…</p>';
    try{ const r = await Account.rank(); if(!r.ok) throw new Error(r.msg); rankData = r.rows; if(TAB === 'rank') render(); setTimeout(() => rankData = null, 60000); }
    catch(e){ if(!rankData) body.innerHTML = '<p class="note-line">Chưa tải được bảng xếp hạng. Em kiểm tra mạng rồi thử lại nhé. (Nếu vẫn lỗi: thầy cô cần cập nhật lại Apps Script.)</p>'; }
  }

  addEventListener('hashchange', () => { const m = $('#petHome'); if(m){ m.remove(); document.body.classList.remove('noscroll'); } });
  return { on, look, bgSVG, accSVG, snapshot, adopt, open, get state(){ return st(); }, reset(){ S = null; }, ITEMS, BADGES, QUESTS, feed, playWith, buy, wear };
})();
