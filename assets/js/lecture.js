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
  // Giải bài tập SGK (câu vận dụng/khó): Lecture.addSgk('lop10', 'bai-3', [trang chiếu…]) – cùng kiểu trang như bài giảng (title, kt, vd, sum).
  const addSgk = (grade, id, slides, name) => { const l = BOOKS.filter(b => b.grade === grade).flatMap(b => b.lessons).find(x => x.id === id);
    slides.forEach(s => { if(s.sol && s.plainSol == null) s.plainSol = true; });
    if(l){ l.sgk = slides; l.sgkName = name; } else console.warn('Không thấy bài', grade, id); };
  // Phiếu học tập trên lớp (Khởi động – Củng cố, tệp Markdown): Lecture.addSheet('lop11', 'bai-5', markdown). Phần A (học sinh) và Phần B (giáo viên) ngăn bằng thẻ page-break.
  const addSheet = (grade, id, md) => { const l = BOOKS.filter(b => b.grade === grade).flatMap(b => b.lessons).find(x => x.id === id);
    if(l) l.sheet = md; else console.warn('Không thấy bài', grade, id); };
  const sgkDeck = l => ({ name:'Giải bài tập SGK – ' + (l.sgkName || l.name), slides:l.sgk });
  let deck = null, idx = 0, step = 0, dark = false, el = null, teamState = null, teamPanel = null, teamHopePending = null;
  const canPresent = () => typeof Account !== 'undefined' && typeof Account.isTeacher === 'function' && Account.isTeacher();
  function requireTeacher(){
    if(canPresent()) return true;
    try{ toast('🔒 Chỉ tài khoản GV mới sử dụng được chế độ trình chiếu.') }catch(e){}
    return false;
  }

  /* ---------- Trang chủ giáo viên: chọn lớp → danh sách bài của lớp đó (#/lop8) ---------- */
  const grades = () => { const m = new Map(); BOOKS.forEach((b, bi) => { if(!m.has(b.grade)) m.set(b.grade, {id:b.grade, name:b.gradeName, books:[]}); m.get(b.grade).books.push([b, bi]); }); return [...m.values()]; };
  const gradeNum = g => +(g.id.match(/\d+/) || [0])[0];
  let routed = false;
  function home(){
    if(!routed){ routed = true; addEventListener('hashchange', () => { if(!el) home(); }); }
    if(typeof Hub !== 'undefined' && Hub.route()) return;                   // #/goc-chung – Góc chung (xếp hạng, sticker) dùng chung với học sinh
    if(typeof KiemTra !== 'undefined' && KiemTra.route()) return;          // #/lop11/kiem-tra/<mã>/de|da – đề kiểm tra in A4
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
          <div class="lk-ch-acts"><button class="btn small" data-cs="${bi}" title="Một file in tiết kiệm giấy cho học sinh: kiến thức, ví dụ, bài luyện tập của mọi bài trong chương">📘 Phiếu cả chương (học sinh)</button></div>
          <ol class="lk-list">${b.lessons.map((l, li) => `<li><div class="lk-li"><b>${l.name}</b><small>${l.desc || ''} · ${l.slides.length} trang · ${l.slides.filter(s => s.kind === 'vd').length} ví dụ${l.practice ? ` · ${l.practice.reduce((t, g) => t + g.items.length, 0)} bài luyện tập` : ''}${l.sgk ? ` · giải ${l.sgk.filter(x => x.kind === 'vd').length} câu SGK` : ''}</small></div>
            <div class="lk-acts">${canPresent() ? `<button class="btn primary small" data-play="${bi}:${li}" title="Trình chiếu toàn màn hình">▶ Chiếu</button>` : ''}<button class="btn small" data-prev="${bi}:${li}" title="Xem dạng trang, in được">📄 Xem</button><button class="btn small" data-ws="${bi}:${li}" title="Phiếu học tập in A4">📝 Phiếu</button>${l.practice ? `<button class="btn small" data-pr="${bi}:${li}" title="Phiếu luyện tập: cơ bản → vận dụng">🏋️ Luyện tập</button>` : ''}${l.sgk ? `<button class="btn small" data-sgk="${bi}:${li}" title="Giải các câu vận dụng, câu khó trong SGK">📘 Giải SGK</button>` : ''}${l.sheet ? `<button class="btn small" data-kd="${bi}:${li}" title="Phiếu học tập trên lớp: khởi động – củng cố, kèm gợi ý sư phạm">📋 Phiếu trên lớp</button>` : ''}</div></li>`).join('')}</ol></section>`).join('') + (typeof KiemTra !== 'undefined' ? KiemTra.section(g.id) : '') + (typeof TestDeck !== 'undefined' && typeof StudentTest !== 'undefined' ? TestDeck.section(g.id) : '') + `</div><aside class="lk-rank card" id="lkRank" aria-label="Bảng xếp hạng học sinh"></aside></div><p class="foot">${CONFIG.author}</p>`;
      if(typeof GvRank !== 'undefined') GvRank.mount($('#lkRank'), g.id);
      $$('[data-play]').forEach(b => b.onclick = () => { const [bi, li] = b.dataset.play.split(':'); open(BOOKS[bi].lessons[li], 0); });
      $$('[data-prev]').forEach(b => b.onclick = () => { const [bi, li] = b.dataset.prev.split(':'); preview(BOOKS[bi], BOOKS[bi].lessons[li]); });
      $$('[data-cs]').forEach(b => b.onclick = () => chapterSheet(BOOKS[b.dataset.cs]));
      $$('[data-ws]').forEach(b => b.onclick = () => { const [bi, li] = b.dataset.ws.split(':'); worksheet(BOOKS[bi], BOOKS[bi].lessons[li], false); });
      $$('[data-pr]').forEach(b => b.onclick = () => { const [bi, li] = b.dataset.pr.split(':'); practice(BOOKS[bi], BOOKS[bi].lessons[li], false); });
      $$('[data-kd]').forEach(b => b.onclick = () => { const [bi, li] = b.dataset.kd.split(':'); classSheet(BOOKS[bi], BOOKS[bi].lessons[li], 'all'); });
      if(typeof TestDeck !== 'undefined' && typeof StudentTest !== 'undefined') TestDeck.bind($('#app'), g.id);
      $$('[data-sgk]').forEach(b => b.onclick = () => { const [bi, li] = b.dataset.sgk.split(':'); preview(BOOKS[bi], sgkDeck(BOOKS[bi].lessons[li])); });
    }
    document.body.classList.toggle('gv-wide', !!g);
    if(typeof Account !== 'undefined') Account.bindLogout();
    document.title = g ? `Bài giảng ${g.name} – ${CONFIG.brand || CONFIG.siteName}` : `Bài giảng – ${CONFIG.brand || CONFIG.siteName}`; scrollTo(0, 0);
  }

  /* ---------- Xem trước (dạng trang, in được) ---------- */
  function preview(b, l){ document.body.classList.remove('gv-wide');
    const app = $('#app');
    const present = canPresent();
    app.innerHTML = `<div class="toolbar"><button class="back linkbtn" id="lkBack">← Danh sách bài</button><div class="row"><button class="btn small" onclick="print()">🖨️ In</button><button class="btn small" id="lkWs">📝 Phiếu học tập</button>${l.practice ? '<button class="btn small" id="lkPr">🏋️ Luyện tập</button>' : ''}${present ? '<button class="btn primary small" id="lkPlay">▶ Trình chiếu</button>' : ''}</div></div>
      <span class="pill">${b.gradeName} · ${b.chapter}</span><h1>${l.name}</h1>
      <div class="lk-doc">${l.slides.map((s, i) => `<section class="card lk-page" data-i="${i}">${render(s, true)}${present ? `<button class="linkbtn lk-go" data-go="${i}">▶ Chiếu từ trang ${i+1}</button>` : ''}</section>`).join('')}</div>`;
    $('#lkBack').onclick = home; if(present) $('#lkPlay').onclick = () => open(l, 0); $('#lkWs').onclick = () => worksheet(b, l, false); if(l.practice) $('#lkPr').onclick = () => practice(b, l, false);
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
      <div class="lk-main ${fig ? 'has-fig' : ''}"><div class="lk-body">${n ? `<div class="lk-sol ${shown > 0 ? 'open' : ''}"><div class="lk-solh">Lời giải</div><ol class="lk-solsteps ${s.plainSol ? 'plain' : ''}">${solHTML}</ol>${s.ans ? `<div class="lk-ans ${shown >= n ? 'on' : ''}">${s.ans}</div>` : ''}</div>` : ''}</div>${fig}</div>`;
  }
  const stepsOf = s => (s.sol || []).length;

  /* ---------- Thi đua theo nhóm trong trình chiếu ---------- */
  const teamEsc = x => String(x ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const teamCfg = () => { try{ return JSON.parse(localStorage.getItem('hoctap:lecture-teams')) || {}; }catch(e){ return {}; } };
  const teamSort = () => [...teamState.teams].sort((a,b) => b.score-a.score || b.stars-a.stars || a.name.localeCompare(b.name,'vi'));
  const teamGrade = () => deck ? (deck.grade || (BOOKS.find(b => b.lessons.includes(deck) || b.lessons.some(x => x.sgk && x.sgk === deck.slides)) || {}).grade || '') : '';
  const teamShuffle = a => { const b=[...a];for(let i=b.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[b[i],b[j]]=[b[j],b[i]]}return b };
  const TEAM_W_KEY='hoctap:lecture-team-w',TEAM_MIN=300;let teamFrac=(()=>{try{const x=+localStorage.getItem(TEAM_W_KEY);return x>=.2&&x<=.58?x:.28}catch(e){return .28}})();
  let teamRoster={grade:'',classes:null},teamRosterPromise=null;
  const teamWidth = () => innerWidth<=850?innerWidth:Math.round(Math.min(Math.max(innerWidth*teamFrac,TEAM_MIN),innerWidth*.58));
  function teamButton(){ const b = el && el.querySelector('[data-k="team"]'); if(!b) return; b.classList.toggle('on', !!teamPanel && !teamPanel.hidden); b.textContent = teamState ? `👥 Vòng ${teamState.round}/${teamState.rounds}` : '👥 Thi nhóm'; }
  function teamApply(refit=true){if(!teamPanel||teamPanel.hidden||!el)return;const w=teamWidth();teamPanel.style.width=w+'px';el.style.setProperty('--team-w',w+'px');if(refit){fit();setTimeout(fit,120);setTimeout(fit,260)}}
  function teamBindGrip(){const g=teamPanel&&teamPanel.querySelector('.lk-team-grip');if(!g)return;g.onpointerdown=e=>{e.preventDefault();g.setPointerCapture(e.pointerId);teamPanel.classList.add('dragging')};g.onpointermove=e=>{if(!teamPanel.classList.contains('dragging')||innerWidth<=850)return;teamFrac=(innerWidth-e.clientX)/innerWidth;teamApply()};const end=()=>{if(!teamPanel.classList.contains('dragging'))return;teamPanel.classList.remove('dragging');teamFrac=teamWidth()/innerWidth;try{localStorage.setItem(TEAM_W_KEY,String(teamFrac))}catch(e){}teamApply()};g.onpointerup=end;g.onpointercancel=end;g.onkeydown=e=>{if(e.key!=='ArrowLeft'&&e.key!=='ArrowRight')return;e.preventDefault();e.stopPropagation();teamFrac+=e.key==='ArrowLeft'?.04:-.04;teamApply();try{localStorage.setItem(TEAM_W_KEY,String(teamWidth()/innerWidth))}catch(x){}}}
  function teamFrame(html){teamPanel.innerHTML=`<div class="lk-team-grip" role="separator" aria-orientation="vertical" aria-label="Kéo để đổi độ rộng bảng nhóm" tabindex="0" title="Kéo sang trái hoặc phải để đổi độ rộng"><i></i></div><div class="lk-team-main">${html}</div>`;teamBindGrip();teamApply(false)}
  function teamOpen(){
    if(typeof ClassPanel !== 'undefined') ClassPanel.hide();
    if(!teamPanel){ teamPanel=document.createElement('aside');teamPanel.className='lk-team-panel';teamPanel.setAttribute('aria-label','Thi đua theo nhóm');el.appendChild(teamPanel); }
    teamPanel.hidden=false;el.classList.add('team-on');renderTeam();teamApply();teamButton();setTimeout(fit,500);
  }
  function teamHide(){ if(teamPanel) teamPanel.hidden=true;if(el)el.classList.remove('team-on');teamButton();fit();setTimeout(fit,250); }
  function teamNameFields(n, vals=[]){ const box=teamPanel.querySelector('#lkTeamNames');if(!box)return;box.innerHTML=Array.from({length:n},(_,i)=>`<label>Đội ${i+1}<input data-team-name value="${teamEsc(vals[i]||`Nhóm ${i+1}`)}" maxlength="30"></label>`).join(''); }
  const teamMethodHTML = method => `<label>Cách chia nhóm<select id="lkTeamMethod"><option value="roster" ${method==='roster'?'selected':''}>Theo danh sách lớp có sẵn</option><option value="numbers" ${method==='numbers'?'selected':''}>Theo số thứ tự</option></select></label>`;
  const teamSaveCfg = c => { try{localStorage.setItem('hoctap:lecture-teams',JSON.stringify(c))}catch(e){} };
  function teamBindMethod(c){const x=$('#lkTeamMethod');if(x)x.onchange=e=>{teamSaveCfg({...c,method:e.target.value});teamSetup()}}
  function teamNumberSetup(c){
    const method='numbers',total=Math.max(2,Math.min(60,+c.numberTotal||40)),names=Array.isArray(c.names)&&c.names.length>=2?c.names:['Nhóm 1','Nhóm 2','Nhóm 3','Nhóm 4'],rounds=Math.max(1,Math.min(20,+c.rounds||5)),maxTeams=Math.min(8,total),count=Math.min(maxTeams,names.length);
    teamFrame(`<header><b>🔢 Chia nhóm theo số thứ tự</b><button data-team-hide>✕</button></header><div class="lk-team-setup">${teamMethodHTML(method)}<div class="lk-team-two"><label>Tổng số thứ tự<input id="lkTeamNumberTotal" type="number" min="2" max="60" value="${total}"></label><label>Số đội<select id="lkTeamCount">${Array.from({length:maxTeams-1},(_,i)=>i+2).map(n=>`<option ${n===count?'selected':''}>${n}</option>`).join('')}</select></label></div><label>Số vòng<input id="lkTeamRounds" type="number" min="1" max="20" value="${rounds}"></label><div class="lk-team-names" id="lkTeamNames"></div><label class="lk-team-hope-mode"><input id="lkTeamHope" type="checkbox" ${c.hopeMode?'checked':''}><span><b>🌟 Bật Ngôi sao hy vọng</b><small>Mỗi đội được đặt một lần: đúng +30 điểm, sai −30 điểm.</small></span></label><p>Hệ thống chia lần lượt các số từ <b>1 đến ${total}</b> vào các đội, cân bằng chênh lệch không quá một số.</p><button class="btn primary" id="lkTeamCreate">Lập bảng chia nhóm theo số →</button></div>`);
    teamNameFields(count,names);teamPanel.querySelector('[data-team-hide]').onclick=teamHide;teamBindMethod(c);
    $('#lkTeamNumberTotal').onchange=e=>{const n=Math.max(2,Math.min(60,+e.target.value||2));teamSaveCfg({...c,method,numberTotal:n});teamSetup()};
    $('#lkTeamCount').onchange=e=>{const old=[...teamPanel.querySelectorAll('[data-team-name]')].map(x=>x.value);teamNameFields(+e.target.value,old)};
    $('#lkTeamCreate').onclick=()=>{const n=Math.max(2,Math.min(60,+$('#lkTeamNumberTotal').value||2)),ns=[...teamPanel.querySelectorAll('[data-team-name]')].map((x,i)=>x.value.trim()||`Nhóm ${i+1}`),rs=Math.max(1,Math.min(20,+$('#lkTeamRounds').value||1)),hopeMode=$('#lkTeamHope').checked,people=Array.from({length:n},(_,i)=>({name:String(i+1),user:`stt-${i+1}`})),groups=ns.map(()=>[]);people.forEach((p,i)=>groups[i%groups.length].push(p));teamState={mode:method,className:`Số thứ tự 1–${n}`,rounds:rs,round:1,phase:'ready',hopeMode,teams:ns.map((name,i)=>({id:i,name,members:groups[i],score:0,stars:0,results:[],hope:null}))};teamSaveCfg({method,numberTotal:n,rounds:rs,names:ns,hopeMode});renderTeam();teamButton()};
  }
  function teamLoadRoster(){
    const grade=teamGrade();
    if(teamRoster.grade===grade&&Array.isArray(teamRoster.classes))return Promise.resolve(teamRoster.classes);
    if(teamRosterPromise)return teamRosterPromise;
    if(!grade||typeof Account==='undefined'||!CONFIG.sheetAPI)return Promise.reject(new Error('Danh sách lớp cần kết nối Google Sheet và tài khoản giáo viên.'));
    teamRosterPromise=Account.rankAll(+grade.replace(/\D/g,'')).then(r=>{if(!r||!r.ok||!Array.isArray(r.classes))throw new Error((r&&r.msg)||'Không tải được danh sách học sinh.');teamRoster={grade,classes:r.classes};return r.classes}).finally(()=>teamRosterPromise=null);
    return teamRosterPromise;
  }
  function teamSetup(){
    const grade=teamGrade(),c=teamCfg(),method=c.method==='numbers'?'numbers':'roster';
    if(method==='numbers'){teamNumberSetup(c);return}
    if(teamRoster.grade!==grade||!Array.isArray(teamRoster.classes)){
      teamFrame(`<header><b>👥 Chia nhóm thi đua</b><button data-team-hide>✕</button></header><div class="lk-team-setup">${teamMethodHTML(method)}<p class="lk-team-loading">⏳ Đang tải danh sách lớp và học sinh có sẵn…</p></div>`);teamPanel.querySelector('[data-team-hide]').onclick=teamHide;teamBindMethod(c);
      teamLoadRoster().then(()=>{if(teamPanel&&teamPanel.isConnected&&!teamState)teamSetup()}).catch(err=>{if(!teamPanel||!teamPanel.isConnected||teamCfg().method==='numbers')return;teamFrame(`<header><b>👥 Chia nhóm thi đua</b><button data-team-hide>✕</button></header><div class="lk-team-setup">${teamMethodHTML(method)}<p class="lk-team-error">Không tải được danh sách có sẵn.<br><small>${teamEsc(err.message||err)}</small></p><button class="btn" id="lkTeamRetry">↻ Tải lại</button></div>`);teamPanel.querySelector('[data-team-hide]').onclick=teamHide;teamBindMethod(c);$('#lkTeamRetry').onclick=()=>{teamRoster={grade:'',classes:null};teamSetup()}});return;
    }
    const classes=teamRoster.classes.filter(x=>x&&x.lop&&Array.isArray(x.rows)&&x.rows.length>=2),chosen=classes.find(x=>x.lop===c.className)||classes[0];
    if(!chosen){teamFrame(`<header><b>👥 Chia nhóm thi đua</b><button data-team-hide>✕</button></header><div class="lk-team-setup"><p class="lk-team-error">Khối này chưa có lớp nào đủ ít nhất 2 học sinh trong trang HocSinh.</p></div>`);teamPanel.querySelector('[data-team-hide]').onclick=teamHide;return}
    const names=Array.isArray(c.names)&&c.names.length>=2?c.names:['Nhóm 1','Nhóm 2','Nhóm 3','Nhóm 4'],rounds=Math.max(1,Math.min(20,+c.rounds||5)),maxTeams=Math.max(2,Math.min(8,chosen.rows.length)),count=Math.min(maxTeams,names.length);
    teamFrame(`<header><b>👥 Chia nhóm thi đua</b><button data-team-hide>✕</button></header><div class="lk-team-setup">${teamMethodHTML(method)}<label>Chọn lớp từ danh sách có sẵn<select id="lkTeamClass">${classes.map(x=>`<option value="${teamEsc(x.lop)}" ${x.lop===chosen.lop?'selected':''}>${teamEsc(x.lop)} · ${x.rows.length} học sinh</option>`).join('')}</select></label><div class="lk-team-two"><label>Số đội<select id="lkTeamCount">${Array.from({length:maxTeams-1},(_,i)=>i+2).map(n=>`<option ${n===count?'selected':''}>${n}</option>`).join('')}</select></label><label>Số vòng<input id="lkTeamRounds" type="number" min="1" max="20" value="${rounds}"></label></div><div class="lk-team-names" id="lkTeamNames"></div><label class="lk-team-hope-mode"><input id="lkTeamHope" type="checkbox" ${c.hopeMode?'checked':''}><span><b>🌟 Bật Ngôi sao hy vọng</b><small>Mỗi đội được đặt một lần: đúng +30 điểm, sai −30 điểm.</small></span></label><p id="lkTeamRosterInfo">Danh sách <b>${teamEsc(chosen.lop)}</b> có <b>${chosen.rows.length}</b> học sinh; hệ thống sẽ chia ngẫu nhiên và cân bằng.</p><button class="btn primary" id="lkTeamCreate">Chia học sinh vào các đội →</button></div>`);
    teamNameFields(count,names);teamPanel.querySelector('[data-team-hide]').onclick=teamHide;teamBindMethod(c);
    $('#lkTeamClass').onchange=e=>{teamSaveCfg({...c,method,className:e.target.value});teamSetup()};
    $('#lkTeamCount').onchange=e=>{const old=[...teamPanel.querySelectorAll('[data-team-name]')].map(x=>x.value);teamNameFields(+e.target.value,old)};
    $('#lkTeamCreate').onclick=()=>{const C=classes.find(x=>x.lop===$('#lkTeamClass').value),ns=[...teamPanel.querySelectorAll('[data-team-name]')].map((x,i)=>x.value.trim()||`Nhóm ${i+1}`),rs=Math.max(1,Math.min(20,+$('#lkTeamRounds').value||1)),hopeMode=$('#lkTeamHope').checked,people=teamShuffle(C.rows.map((x,i)=>({name:String(x.name||x.user||`Học sinh ${i+1}`),user:String(x.user||i)}))),groups=ns.map(()=>[]);people.forEach((p,i)=>groups[i%groups.length].push(p));teamState={mode:method,className:C.lop,rounds:rs,round:1,phase:'ready',hopeMode,teams:ns.map((name,i)=>({id:i,name,members:groups[i],score:0,stars:0,results:[],hope:null}))};teamSaveCfg({method,className:C.lop,rounds:rs,names:ns,hopeMode});renderTeam();teamButton()};
  }
  function teamDots(t){return `<div class="lk-team-rounds">${Array.from({length:teamState.rounds},(_,k)=>{const r=t.results[k],cur=k===teamState.round-1,hope=t.hope===k;return `<i class="${r||''} ${cur?'current':''} ${hope?'hope':''}" title="Vòng ${k+1}${r==='right'?': Đúng':r==='wrong'?': Sai':''}${hope?' · Ngôi sao hy vọng':''}">${r==='right'?'✓':r==='wrong'?'✕':hope?'★':k+1}</i>`}).join('')}</div>`}
  function teamCards(play){ return teamState.teams.map((t,i)=>{const k=teamState.round-1,r=t.results[k],hope=t.hope===k,used=t.hope!==null,pending=teamHopePending===i,memberNames=(t.members||[]).map(x=>x.name).join(', '),byNumber=teamState.mode==='numbers',memberText=byNumber?`STT: ${memberNames}`:memberNames,readyClass=!play?(byNumber?'number-ready':'roster-ready'):'',hopeText=hope?'🌟 Đã đặt cho vòng này':used?`🌟 Đã dùng ở vòng ${t.hope+1}`:r?'🌟 Có thể chọn ở vòng sau':'🌟 Chọn Ngôi sao hy vọng';return `<article class="lk-team-card ${r||''} ${hope?'hope':''} ${readyClass}"><div class="lk-team-info"><span class="lk-team-color c${i%8}"></span><b title="${teamEsc(memberText)}">${teamEsc(t.name)}</b><small>${t.score}đ · ${t.stars} đúng · ${(t.members||[]).length} ${byNumber?'số':'HS'}</small>${play&&!byNumber?`<span class="lk-team-compact" title="${teamEsc(memberNames)}">${teamEsc(memberNames)}</span>`:''}</div>${teamDots(t)}${play?`<div class="lk-team-actions"><div class="lk-team-mark"><button data-team-mark="${i}:right" class="${r==='right'?'on':''}" ${pending?'disabled':''} aria-label="${teamEsc(t.name)} đúng" title="Đúng: ${hope?'+30':'+10'} điểm, +1 câu đúng">✓</button><button data-team-mark="${i}:wrong" class="${r==='wrong'?'on':''}" ${pending?'disabled':''} aria-label="${teamEsc(t.name)} sai" title="Sai: ${hope?'−30':'0'} điểm">✕</button></div></div>${teamState.hopeMode?`<div class="lk-team-hope-row">${pending?`<div class="lk-team-hope-confirm"><b>Xác nhận ${teamEsc(t.name)} dùng 🌟 ở vòng ${teamState.round}?</b><span><button data-team-hope-confirm="${i}">Xác nhận</button><button data-team-hope-cancel>Hủy</button></span></div>`:`<button data-team-hope="${i}" class="${hope?'on':''}" ${used||r?'disabled':''}>${hopeText}</button>`}</div>`:''}`:`<p class="lk-team-members">${teamEsc(memberText)}</p>`}</article>`}).join(''); }
  function renderTeam(){
    if(!teamPanel)return;if(!teamState)return teamSetup();const s=teamState;
    if(s.phase==='ready'){const byNumber=s.mode==='numbers',total=s.teams.reduce((n,t)=>n+(t.members||[]).length,0);teamFrame(`<header><b>👥 ${teamEsc(s.className||'Lớp học')}</b><button data-team-hide>✕</button></header><div class="lk-team-ready"><small>BẢNG CHIA NHÓM</small><h2>${s.teams.length} đội · ${s.rounds} vòng · ${total} ${byNumber?'số thứ tự':'học sinh'}</h2><div class="lk-team-list">${teamCards(false)}</div>${s.hopeMode?'<p class="lk-team-hope-note">🌟 Mỗi đội có một Ngôi sao hy vọng trong cả cuộc thi.</p>':''}<button class="btn primary" id="lkTeamStart">Bắt đầu vòng 1</button>${byNumber?'':'<button class="btn" id="lkTeamReshuffle">🔀 Chia lại ngẫu nhiên</button>'}<button class="btn" id="lkTeamReset">Đổi cách chia hoặc số đội</button></div>`);teamPanel.querySelector('[data-team-hide]').onclick=teamHide;$('#lkTeamStart').onclick=()=>{teamHopePending=null;s.phase='play';renderTeam()};const reshuffle=$('#lkTeamReshuffle');if(reshuffle)reshuffle.onclick=()=>{const people=teamShuffle(s.teams.flatMap(t=>t.members||[])),groups=s.teams.map(()=>[]);people.forEach((p,i)=>groups[i%groups.length].push(p));s.teams.forEach((t,i)=>t.members=groups[i]);renderTeam()};$('#lkTeamReset').onclick=()=>{teamHopePending=null;teamState=null;renderTeam();teamButton()};return}
    if(s.phase==='play'){const done=s.teams.filter(t=>t.results[s.round-1]).length;teamFrame(`<header><b>🏁 Vòng ${s.round}/${s.rounds}</b><button data-team-hide>✕</button></header><div class="lk-team-play"><div class="lk-team-progress"><i style="width:${100*done/s.teams.length}%"></i></div><p>Đã chấm <b>${done}/${s.teams.length}</b> đội${s.hopeMode?' · Chọn 🌟 bên dưới đội trước khi chấm':''}</p><div class="lk-team-list">${teamCards(true)}</div><button class="btn primary" id="lkTeamEnd" ${done<s.teams.length?'disabled':''}>Kết thúc vòng ${s.round} · Xem xếp hạng</button></div>`);teamPanel.querySelector('[data-team-hide]').onclick=teamHide;teamPanel.querySelectorAll('[data-team-hope]').forEach(b=>b.onclick=()=>teamHopeAsk(+b.dataset.teamHope));teamPanel.querySelectorAll('[data-team-hope-confirm]').forEach(b=>b.onclick=()=>teamHopeConfirm(+b.dataset.teamHopeConfirm));teamPanel.querySelectorAll('[data-team-hope-cancel]').forEach(b=>b.onclick=teamHopeCancel);teamPanel.querySelectorAll('[data-team-mark]').forEach(b=>b.onclick=()=>{const [i,result]=b.dataset.teamMark.split(':');teamMark(+i,result)});$('#lkTeamEnd').onclick=()=>{teamHopePending=null;s.phase='rank';renderTeam()};return}
    const sorted=teamSort(),final=s.phase==='final';teamFrame(`<header><b>${final?'🏆 Chung cuộc':`📊 Xếp hạng vòng ${s.round}`}</b><button data-team-hide>✕</button></header><div class="lk-team-rank">${final?'<div class="lk-team-cup">🏆</div>':''}<ol>${sorted.map((t,i)=>`<li class="${i<3?'top top'+(i+1):''}"><em>${i+1}</em><span><b>${teamEsc(t.name)}</b><small>${t.stars} câu đúng${t.hope!==null?` · 🌟 vòng ${t.hope+1}`:''}</small></span><strong>${t.score}<small>điểm</small></strong>${teamDots(t)}</li>`).join('')}</ol>${final?`<h2>Chúc mừng ${teamEsc(sorted[0].name)}!</h2><button class="btn primary" id="lkTeamAgain">Cuộc thi mới</button>`:`<button class="btn primary" id="lkTeamNext">${s.round>=s.rounds?'Xem kết quả chung cuộc':`Bắt đầu vòng ${s.round+1}`}</button>`}<button class="btn" data-team-hide>Ẩn bảng thi đua</button></div>`);teamPanel.querySelectorAll('[data-team-hide]').forEach(b=>b.onclick=teamHide);const next=$('#lkTeamNext');if(next)next.onclick=()=>{if(s.round>=s.rounds)s.phase='final';else{s.round++;s.phase='play'}renderTeam();teamButton()};const again=$('#lkTeamAgain');if(again)again.onclick=()=>{teamState=null;renderTeam();teamButton()};
  }
  function teamHopeAsk(i){const s=teamState,t=s&&s.teams[i],k=s&&s.round-1;if(!t||!s.hopeMode||s.phase!=='play'||t.results[k]||t.hope!==null)return;teamHopePending=i;renderTeam()}
  function teamHopeConfirm(i){const s=teamState,t=s&&s.teams[i],k=s&&s.round-1;if(teamHopePending!==i||!t||t.results[k]||t.hope!==null)return;teamHopePending=null;t.hope=k;renderTeam()}
  function teamHopeCancel(){teamHopePending=null;renderTeam()}
  function teamMark(i,result){const s=teamState,t=s&&s.teams[i];if(!t||s.phase!=='play'||teamHopePending===i)return;const k=s.round-1,old=t.results[k],hope=t.hope===k,points=x=>x==='right'?(hope?30:10):x==='wrong'&&hope?-30:0;if(old){t.score-=points(old);if(old==='right')t.stars--}t.results[k]=result;t.score+=points(result);if(result==='right')t.stars++;renderTeam();teamButton()}

  /* ---------- Trình chiếu ---------- */
  function open(l, start){
    if(!requireTeacher()) return false;
    if(el) close();
    if(document.activeElement && document.activeElement.blur) document.activeElement.blur();
    deck = l; idx = start || 0; step = 0;
    el = document.createElement('div'); el.id = 'lecture'; el.className = 'pv lk' + (dark ? ' dark' : '');
    el.setAttribute('role', 'dialog'); el.setAttribute('aria-modal', 'true'); el.setAttribute('aria-label', 'Trình chiếu bài giảng');
    el.innerHTML = `<div class="pv-slide lk-slide" id="lkSlide"></div><div class="lk-menu" id="lkMenu" hidden></div>
      <div class="pv-bar"><button data-k="prev" aria-label="Trang trước">‹</button><span id="lkPos"></span><button data-k="next" aria-label="Tiếp">›</button>
      <button data-k="menu">☰ Mục lục</button><span class="pv-sp"></span><button data-k="team" title="Chia nhóm và tính điểm thi đua">👥 Thi nhóm</button>${typeof ClassPanel !== 'undefined' ? ClassPanel.button() : ''}<button data-k="all">👁 Hiện lời giải</button>
      <button data-k="dark" aria-label="Đổi nền sáng/tối">🌓</button><button data-k="close" aria-label="Thoát">✕</button></div>`;
    document.body.appendChild(el); document.body.classList.add('noscroll');
    el.querySelectorAll('[data-k]').forEach(b => b.onclick = e => { e.stopPropagation(); act(b.dataset.k); });
    $('#lkSlide').onclick = () => act('next');
    const R = document.documentElement, fs = R.requestFullscreen || R.webkitRequestFullscreen;   // toàn màn hình cả trang để khung “Lớp học” (ClassPanel) cùng hiện
    if(fs) try{ const p = fs.call(R); if(p && p.catch) p.catch(() => {}); }catch(e){}
    addEventListener('keydown', key); addEventListener('resize', fit);
    if(document.fonts && document.fonts.addEventListener) document.fonts.addEventListener('loadingdone', fit);
    document.addEventListener('fullscreenchange', fsChange); document.addEventListener('webkitfullscreenchange', fsChange);
    if(typeof ClassPanel !== 'undefined') ClassPanel.attach(el, fit);
    draw();
  }
  function close(){
    if(!el) return;
    removeEventListener('keydown', key); removeEventListener('resize', fit);
    if(document.fonts && document.fonts.removeEventListener) document.fonts.removeEventListener('loadingdone', fit);
    document.removeEventListener('fullscreenchange', fsChange); document.removeEventListener('webkitfullscreenchange', fsChange);
    if(document.fullscreenElement || document.webkitFullscreenElement){ const x = document.exitFullscreen || document.webkitExitFullscreen; try{ const p = x.call(document); if(p && p.catch) p.catch(() => {}); }catch(e){} }
    if(typeof ClassPanel !== 'undefined') ClassPanel.detach();
    el.remove(); el = null; teamPanel = null; teamState = null; document.body.classList.remove('noscroll');
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
    else if(/^[lL]$/.test(k)) act('cls');
    else if(/^[nN]$/.test(k)) act('team');
    else if(k === 'Home'){ idx = 0; step = 0; draw(); } else if(k === 'End'){ idx = deck.slides.length - 1; step = 0; draw(); }
  }
  function act(k){
    const n = deck.slides.length, s = deck.slides[idx];
    if(k === 'next'){ if(step < stepsOf(s)){ step++; drawSteps(); } else if(idx < n-1){ idx++; step = 0; draw(); } }
    if(k === 'prev'){ if(idx > 0){ idx--; step = 0; draw(); } }
    if(k === 'all'){ step = step >= stepsOf(s) ? 0 : stepsOf(s); draw(); }
    if(k === 'dark'){ dark = !dark; el.classList.toggle('dark', dark); }
    if(k === 'cls' && typeof ClassPanel !== 'undefined'){ teamHide(); ClassPanel.toggle(); }
    if(k === 'team'){ if(teamPanel && !teamPanel.hidden) teamHide(); else teamOpen(); }
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
    const H = s.clientHeight, W = s.clientWidth || (el ? el.clientWidth : innerWidth);   // bề rộng khung chiếu (hẹp lại khi mở khung Lớp học)
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


  /* ---------- Phiếu CẢ CHƯƠNG cho HỌC SINH (tiết kiệm in ấn) ----------
     Gộp mọi bài của một chương thành MỘT tệp in: 2 cột, chữ nhỏ, không dòng kẻ, các bài nối liền (không ngắt trang giữa bài), đáp số dồn cuối phiếu.
     Mỗi bài: kiến thức trọng tâm → dạng bài (phương pháp + ví dụ) → bài luyện tập (phiếu luyện tập của bài, nếu chưa có thì dùng các bài “Luyện tập” trong bài giảng).
     Tuỳ chọn: ví dụ (kèm lời giải / chỉ đề + đáp số / ẩn), luyện tập, đáp số cuối phiếu, lời giải luyện tập (bản giáo viên), 1–2 cột, cỡ chữ. */
  const CS_DEF = {kt:true, ex:'sol', pr:true, ansEnd:true, key:false, cols:2, fs:9.5, ln:true};
  function chapterSheet(b, opt){
    document.body.classList.remove('gv-wide');
    const o = Object.assign({}, CS_DEF, chapterSheet.opt && chapterSheet.opt.b === b ? chapterSheet.opt.o : {}, opt || {}); chapterSheet.opt = {b, o};
    const brand = CONFIG.brand || CONFIG.siteName, heads = b.chapter.split('.'), chNo = heads[0].replace(/^Chương\s*/i, '').trim(), chName = heads.slice(1).join('.').trim();
    const figOf = (f, blank) => f ? `<div class="cs-fig">${f}</div>` : '';
    const lessonBlock = l => {
      const S = l.slides, m = l.name.match(/Bài\s*(\d+)/), pre = m ? m[1] : 'ÔT', kts = S.filter(x => x.kind === 'kt'), groups = [];
      S.forEach(x => { if(x.kind === 'method') groups.push({m:x, vd:[]}); else if(x.kind === 'vd') (groups[groups.length - 1] || (groups[0] = {m:null, vd:[]})).vd.push(x); });
      let vi = 0, h = `<h3 class="cs-lesson">${l.name}</h3>`;
      if(o.kt && kts.length) h += `<h4 class="cs-sec">Kiến thức trọng tâm</h4>` + kts.map((x, i) => `<div class="cs-kt"><h5>${i + 1}. ${x.title}</h5><div class="cs-body">${x.body || ''}${figOf(x.fig)}</div></div>`).join('');
      if(o.ex !== 'hide' && groups.length){
        h += `<h4 class="cs-sec">Dạng bài và ví dụ</h4>` + groups.map((g, gi) => (g.m ? `<div class="cs-dang"><h5>Dạng ${gi + 1}. ${g.m.title}</h5>${o.kt ? `<ol class="cs-steps">${(g.m.steps || []).map(x => `<li>${x}</li>`).join('')}</ol>` : ''}</div>` : '')
          + g.vd.map(x => `<div class="cs-q"><p><b>VD${++vi}.</b> ${x.de}</p>${figOf(x.fig)}${o.ex === 'sol' ? `<ol class="cs-sol">${(x.sol || []).map(y => `<li>${y}</li>`).join('')}</ol>` : ''}${x.ans ? `<p class="cs-ans">${x.ans}</p>` : ''}</div>`).join('')).join('');
      }
      let items = [];
      if(o.pr){
        if(l.practice) items = prItems(l).map(x => ({...x, hard:!!x.hard}));
        else items = S.filter(x => x.kind === 'lt').map(x => ({...x, hard:false}));
        items.forEach((x, i) => { x.lab = `${pre}.${i + 1}`; });
        if(items.length) h += `<h4 class="cs-sec">Bài luyện tập${l.practice ? ' <small>(★ = vận dụng)</small>' : ''}</h4>` + items.map(x => {
          const fig = x.draw ? `<div class="cs-fig cs-blank">${x.key ? '' : planeSVG(x.draw)}</div>` : figOf(x.fig);
          return `<div class="cs-q"><p><b>${x.lab}${x.hard ? ' ★' : ''}.</b> ${x.de}</p>${fig}${o.key ? `<ol class="cs-sol">${(x.sol || []).map(y => `<li>${y}</li>`).join('')}</ol>` : ''}${o.key && x.ans ? `<p class="cs-ans">${x.ans}</p>` : ''}${o.ln && !o.key ? `<div class="ws-lines cs-lines">${'<i></i>'.repeat(x.hard ? 5 : 3)}</div>` : ''}</div>`; }).join('');
      }
      return {h, items};
    };
    const ansOf = x => x.ans || ((x.sol && x.sol.length) ? x.sol[x.sol.length - 1] : '');    // đáp số: trường ans, thiếu thì lấy bước kết luận cuối của lời giải
    const blocks = b.lessons.map(lessonBlock), answers = blocks.flatMap(x => x.items).filter(ansOf);
    const toc = b.lessons.map(l => l.name.replace(/\.\s.*$/, '').replace(/^Ôn tập chương.*/, 'Ôn tập')).join(' · ');
    const h = `<header class="ws-head cs-head"><div class="ws-brand"><span>${brand}</span><span>${b.gradeName} · Kết nối tri thức</span></div>
        <h1>PHIẾU ÔN TẬP CHƯƠNG ${chNo}${o.key ? ' <small>(bản có lời giải)</small>' : ''}</h1><h2>${chName}</h2>
        <p class="ws-who">Họ và tên: <span class="ws-fill"></span> Lớp: <span class="ws-fill s"></span> Ngày: <span class="ws-fill s"></span></p>
        <p class="cs-toc">Gồm: ${toc}. Kiến thức trọng tâm, ví dụ có lời giải và bài luyện tập cho từng bài; ${o.ln ? 'làm bài luyện tập vào các dòng kẻ dưới mỗi bài (3 dòng; câu ★ 5 dòng), cần thêm thì làm vào vở' : 'làm bài luyện tập vào vở'}.</p></header>
      <div class="cs-cols">${blocks.map(x => x.h).join('')}${o.pr && o.ansEnd && !o.key && answers.length ? `<h3 class="cs-lesson">Đáp số bài luyện tập</h3><ul class="cs-ansl">${answers.map(x => `<li><b>${x.lab}</b> ${ansOf(x)}</li>`).join('')}</ul>` : ''}</div>
      <footer class="ws-foot">${brand} · ${b.gradeName} · Chương ${chNo}</footer>`;
    const chk = (id, t, on) => `<label class="ws-toggle"><input type="checkbox" id="${id}" ${on ? 'checked' : ''}> ${t}</label>`;
    $('#app').innerHTML = `<div class="toolbar ws-bar cs-bar"><button class="back linkbtn" id="wsBack">← Danh sách bài</button><div class="row">
        ${chk('csKt', 'Kiến thức', o.kt)}
        <label class="ws-toggle">Ví dụ <select id="csEx"><option value="sol" ${o.ex === 'sol' ? 'selected' : ''}>kèm lời giải</option><option value="ans" ${o.ex === 'ans' ? 'selected' : ''}>chỉ đề + đáp số</option><option value="hide" ${o.ex === 'hide' ? 'selected' : ''}>ẩn</option></select></label>
        ${chk('csPr', 'Luyện tập', o.pr)}${chk('csLn', 'Dòng kẻ làm bài (3 · ★ 5)', o.ln)}${chk('csAe', 'Đáp số cuối phiếu', o.ansEnd)}${chk('csKey', 'Kèm lời giải luyện tập (GV)', o.key)}
        <label class="ws-toggle">Cột <select id="csCols"><option value="2" ${o.cols === 2 ? 'selected' : ''}>2</option><option value="1" ${o.cols === 1 ? 'selected' : ''}>1</option></select></label>
        <label class="ws-toggle">Chữ <select id="csFs">${[[9, 'nhỏ'], [9.5, 'vừa'], [10.5, 'lớn']].map(([v, t]) => `<option value="${v}" ${o.fs === v ? 'selected' : ''}>${t}</option>`).join('')}</select></label>
        <span class="cs-pages" id="csPages"></span><button class="btn primary small" onclick="print()">🖨️ In / Lưu PDF</button></div></div>
      <article class="ws cs ${o.cols === 1 ? 'one' : ''}" style="--cs-fs:${o.fs}pt">${h}</article>`;
    const redo = k => chapterSheet(b, k);
    $('#wsBack').onclick = home; $('#csKt').onchange = e => redo({kt:e.target.checked}); $('#csEx').onchange = e => redo({ex:e.target.value}); $('#csPr').onchange = e => redo({pr:e.target.checked});
    $('#csLn').onchange = e => redo({ln:e.target.checked}); $('#csAe').onchange = e => redo({ansEnd:e.target.checked}); $('#csKey').onchange = e => redo({key:e.target.checked}); $('#csCols').onchange = e => redo({cols:+e.target.value}); $('#csFs').onchange = e => redo({fs:+e.target.value});
    document.title = `Phiếu ôn tập chương ${chNo} – ${b.gradeName}`; scrollTo(0, 0);
    // ước lượng số trang A4 (cao in được ≈ 271mm) để thầy cô cân nhắc tiết kiệm giấy
    const pages = () => { const a = $('article.cs'), box = $('#csPages'); if(!a || !box) return; const mm = a.scrollHeight / (a.clientWidth / 190) * 1 / 3.7795; box.textContent = `≈ ${Math.max(1, Math.ceil(mm / 255))} trang A4 (${Math.max(1, Math.ceil(mm / 255 / 2))} tờ in 2 mặt)`; };
    // công thức riêng một dòng rộng hơn cột → thu nhỏ vừa cột (zoom), chạy sau khi MathJax vẽ xong
    const fit = () => { const L = $$('article.cs .mxd'); L.forEach(e => { e.style.zoom = ''; }); L.forEach(e => { if(e.scrollWidth > e.clientWidth + 1) e.style.zoom = String(Math.max(.55, (e.clientWidth - 1) / e.scrollWidth)); });
      const I = $$('article.cs mjx-container').filter(e => !e.closest('.mxd')); I.forEach(e => { e.style.zoom = ''; });
      I.forEach(e => { const host = e.closest('li,.cs-q,p,div'); const av = host ? host.clientWidth - 4 : 0; const w = e.getBoundingClientRect().width; if(av > 40 && w > av) e.style.zoom = String(Math.max(.55, av / w)); }); pages(); };
    chapterSheet.fit = fit;
    if(window.MathJax && MathJax.startup) MathJax.startup.promise.then(() => MathJax.typesetPromise([$('article.cs')])).then(fit, fit);
    setTimeout(fit, 700); setTimeout(fit, 1800);
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
    const present = canPresent();
    $('#app').innerHTML = `<div class="toolbar ws-bar"><button class="back linkbtn" id="wsBack">← Danh sách bài</button><div class="row">
        <label class="ws-toggle"><input type="checkbox" id="wsKey" ${key ? 'checked' : ''}> Kèm lời giải</label>${present ? '<button class="btn small" id="prPlay">▶ Chiếu bài tập</button>' : ''}<button class="btn primary small" onclick="print()">🖨️ In / Lưu PDF</button></div></div>
      <article class="ws pr">${h}</article>`;
    $('#wsBack').onclick = home; $('#wsKey').onchange = e => practice(b, l, e.target.checked); if(present) $('#prPlay').onclick = () => open(practiceDeck(b, l), 0);
    document.title = `Phiếu luyện tập – ${l.name}`; scrollTo(0, 0);
  }
  // Chiếu phiếu luyện tập: mỗi bài một trang (đề + lời giải từng bước; hình cần vẽ hiện ở bước cuối).
  function practiceDeck(b, l){
    const all = prItems(l), cb = all.filter(s => !s.hard).length;
    return { grade: b.grade, name: 'Luyện tập – ' + l.name, slides: [{kind:'title', tag:`${b.gradeName} · Phiếu luyện tập`, title:`Luyện tập: ${l.name}`, sub:'Từ cơ bản đến vận dụng',
        points:[`Phần I: ${cb} bài cơ bản`, `Phần II: ${all.length - cb} bài vận dụng ★`]}]
      .concat(all.map(s => ({kind:'lt', tag:`${s.hard ? 'Vận dụng ★' : 'Cơ bản'} · Dạng ${s.gi + 1}`, label:`Bài ${s.n}`, de:s.de, sol:s.sol, ans:s.ans, fig:s.fig, figAt:s.draw ? (s.sol || []).length : undefined}))) };
  }

  /* ---------- Phiếu học tập trên lớp (Markdown → trang xem/in; tải về .md) ---------- */
  const BREAK_RE = /<div style="page-break-after: always;"><\/div>/;
  function mdToHtml(md){
    const maths = [], esc = t => t.replace(/&(?!nbsp;|amp;|lt;|gt;)/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    md = md.replace(/\$\$([\s\S]+?)\$\$/g, (_, t) => { maths.push('\\[' + esc(t) + '\\]'); return `\u0001${maths.length - 1}\u0002`; })
           .replace(/\$([^$\n]+?)\$/g, (_, t) => { maths.push('\\(' + esc(t) + '\\)'); return `\u0001${maths.length - 1}\u0002`; });
    const inl = t => esc(t).replace(/\*\*([^*]+?)\*\*/g, '<b>$1</b>').replace(/\*([^*\s][^*]*?)\*/g, '<i>$1</i>').replace(/\u0001(\d+)\u0002/g, (_, k) => maths[+k]);
    const L = md.split('\n'), out = []; let i = 0;
    const isLi = x => /^(\s*)(\d+\.|-)\s+/.test(x), indent = x => x.match(/^\s*/)[0].length;
    function list(){ const base = indent(L[i]), ord = /^\s*\d+\./.test(L[i]); let h = ord ? '<ol>' : '<ul>';
      while(i < L.length && isLi(L[i]) && indent(L[i]) === base){
        let txt = L[i].replace(/^\s*(\d+\.|-)\s+/, ''); i++;
        while(i < L.length && L[i].trim() && !isLi(L[i]) && indent(L[i]) > base) txt += ' ' + L[i++].trim();
        let sub = ''; if(i < L.length && isLi(L[i]) && indent(L[i]) > base) sub = list();
        h += `<li>${inl(txt)}${sub}</li>`; }
      return h + (ord ? '</ol>' : '</ul>'); }
    while(i < L.length){
      const x = L[i];
      if(!x.trim()){ i++; continue; }
      if(BREAK_RE.test(x)){ out.push('<div class="kd-break"></div>'); i++; continue; }
      let m;
      if((m = x.match(/^(#{1,3})\s+(.*)/))){ out.push(`<h${m[1].length}>${inl(m[2])}</h${m[1].length}>`); i++; continue; }
      if(/^>/.test(x)){ let t = []; while(i < L.length && /^>/.test(L[i])) t.push(L[i++].replace(/^>\s?/, '')); out.push(`<blockquote>${t.map(inl).join('<br>')}</blockquote>`); continue; }
      if(/^\|/.test(x)){ const rows = []; while(i < L.length && /^\|/.test(L[i])) rows.push(L[i++].trim().replace(/^\||\|$/g, '').split('|').map(c => c.trim()));
        const head = rows[0], body = rows.slice(2); out.push(`<table><thead><tr>${head.map(c => `<th>${inl(c)}</th>`).join('')}</tr></thead><tbody>${body.map(r => `<tr>${r.map(c => `<td>${inl(c)}</td>`).join('')}</tr>`).join('')}</tbody></table>`); continue; }
      { const mo = x.match(/^([A-D]\.|[a-d]\))\s+/);   // phương án trắc nghiệm (A. B. C. D.) hoặc ý đúng–sai (a) b) c) d)) liên tiếp → một khối 1–2 dòng
        if(mo){ const first = mo[1], paren = first.endsWith(')'), items = []; let j = i, want = first.charCodeAt(0);
          while(j < L.length){ let k = j; while(k < L.length && !L[k].trim()) k++;
            const mm = k < L.length && L[k].match(paren ? /^([a-d])\)\s+(.*)/ : /^([A-D])\.\s+(.*)/);
            if(!mm || mm[1].charCodeAt(0) !== want) break; items.push(mm[2]); want++; j = k + 1; }
          if(items.length >= 2){ i = j; const len = Math.max(...items.map(t => t.replace(/\u0001\d+\u0002/g, 'xxxxxxx').length)), cols = len <= 16 ? items.length : len <= 54 ? 2 : 1;
            out.push(`<div class="kd-opts o${cols}">${items.map((t, k) => `<span><b>${paren ? String.fromCharCode(97 + k) + ')' : String.fromCharCode(65 + k) + '.'}</b> ${inl(t)}</span>`).join('')}</div>`); continue; } } }
      if(isLi(x)){ out.push(list()); continue; }
      let t = []; while(i < L.length && L[i].trim() && !/^(#|>|\||<div)/.test(L[i]) && !isLi(L[i])) t.push(L[i++].trim());
      if(!t.length){ i++; continue; } out.push(`<p>${inl(t.join(' '))}</p>`);
    }
    return out.join('\n');
  }
  const sheetFile = (b, l) => `KD-CC - Lớp ${(b.gradeName.match(/\d+/) || [''])[0]} - ${l.name.replace(/\./g, '')}.md`;
  /* Phần A (phiếu học sinh) luôn in ĐÚNG 2 TRANG A4 (1 tờ hai mặt): tự chọn cỡ chữ lớn nhất (≤ 12pt) mà các khối xếp vừa 2 trang; báo ⚠ nếu 8,5pt vẫn không vừa. */
  const KD_PAGE_W = 188, KD_PAGE_H = 279;   // mm: bề rộng/chiều cao vùng in (A4 trừ lề @page kdsheet 9mm × 11mm)
  function kdPages(root, fs){
    const m = document.createElement('div'); m.className = 'ws kd kd-meas'; m.style.cssText = `position:absolute;left:-9999px;top:0;width:${KD_PAGE_W}mm;padding:0;margin:0;visibility:hidden`;
    const a = root.cloneNode(true); a.style.setProperty('--kd-fs', fs + 'pt'); m.appendChild(a); document.body.appendChild(m);
    const H = KD_PAGE_H * 3.7795 - 6, blocks = [...a.children], units = [];
    blocks.forEach(b => { if(/^H[1-3]$/.test(b.tagName) && blocks[blocks.indexOf(b) + 1]) units.push([b, blocks[blocks.indexOf(b) + 1]]); else if(!units.length || units[units.length - 1][1] !== b) units.push([b]); });
    let pages = 1, y0 = 0, tallest = 0;
    units.forEach(u => { const t = u[0].offsetTop, bt = u[u.length - 1].offsetTop + u[u.length - 1].offsetHeight; tallest = Math.max(tallest, bt - t);
      if(bt - y0 > H && t > y0){ pages++; y0 = t; } });
    m.remove(); return {pages, tooTall: tallest > H};
  }
  function kdFit(root){
    if(!root) return;
    let fs = 12; while(fs > 8.5 && kdPages(root, fs).pages > 2) fs -= 0.25;
    root.style.setProperty('--kd-fs', fs + 'pt'); root.dataset.fs = fs; root.dataset.pages = kdPages(root, fs).pages;
    if(+root.dataset.pages > 2) console.warn('Phiếu trên lớp: Phần A vẫn quá 2 trang ở cỡ chữ 8,5pt – cần rút gọn nội dung.');
  }
  function classSheet(b, l, part){ document.body.classList.remove('gv-wide');
    const [a, bb] = l.sheet.split(BREAK_RE);
    const secs = html => { const c = html.split(/(?=<h2>)/); return c[0] + c.slice(1).map(x => `<div class="kd-sec">${x}</div>`).join(''); };   // mỗi mục (## …) là một khối không bị ngắt giữa chừng khi in
    const A = `<section class="kd-a">${secs(mdToHtml(a))}</section>`, B = `<section class="kd-b">${mdToHtml(bb)}</section>`;
    $('#app').innerHTML = `<div class="toolbar ws-bar"><button class="back linkbtn" id="kdBack">← Danh sách bài</button><div class="row">
        <label class="ws-toggle">Hiển thị <select id="kdPart"><option value="all">Cả hai phần</option><option value="A">Phần A – phiếu học sinh (2 trang)</option><option value="B">Phần B – gợi ý giáo viên</option></select></label>
        <button class="btn small" id="kdDl">⬇️ Tải Markdown</button><button class="btn primary small" onclick="print()">🖨️ In / Lưu PDF</button></div></div>
      <article class="ws kd">${part === 'B' ? '' : A}${part === 'A' ? '' : B}</article>`;
    $('#kdPart').value = part; $('#kdPart').onchange = e => classSheet(b, l, e.target.value);
    $('#kdBack').onclick = home;
    $('#kdDl').onclick = () => { const url = URL.createObjectURL(new Blob(['﻿' + l.sheet], {type:'text/markdown;charset=utf-8'})), a2 = document.createElement('a');
      a2.href = url; a2.download = sheetFile(b, l); document.body.appendChild(a2); a2.click(); a2.remove(); setTimeout(() => URL.revokeObjectURL(url), 1500); };
    document.title = `Phiếu trên lớp – ${l.name}`; scrollTo(0, 0);
    const fit = () => kdFit($('.kd-a'));
    if(window.MathJax && MathJax.typesetPromise) MathJax.typesetPromise([$('#app')]).then(fit, fit); else fit();
    setTimeout(fit, 1200);
    if(!window.__kdPrint){ window.__kdPrint = true; addEventListener('beforeprint', () => { const r = $('.kd-a'); if(r) kdFit(r); }); }
  }

  return { add, addPractice, addSgk, addSheet, classSheet, mdToHtml, sgkDeck, home, open, preview, worksheet, practice, practiceDeck, chapterSheet, BOOKS };
})();
