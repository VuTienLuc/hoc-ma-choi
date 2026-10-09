/* =====================================================================
   ENGINE – hiển thị, chấm bài, điều hướng. Dùng chung cho mọi lớp.
   Thường không cần sửa file này khi thêm lớp/bài mới.
   ===================================================================== */
const LEVELS=[{n:'Mức 1',d:'Làm quen'},{n:'Mức 2',d:'Luyện tập'},{n:'Mức 3',d:'Thử thách'}];
let S={grade:null,lesson:null,lv:1,qs:[]};
// Móc nối cho account.js (đăng nhập, thú cưng). Không có Account thì bỏ qua.
const hook=(n,...a)=>{try{if(typeof Account!=='undefined'&&Account.on)Account.on(n,...a)}catch(e){console.error(e)}try{if(typeof Present!=='undefined')Present.on(n,...a)}catch(e){console.error(e)}try{if(typeof Game!=='undefined'&&Game.on)Game.on(n,...a)}catch(e){console.error(e)}try{if(typeof TdSheet!=='undefined')TdSheet.on(n,...a)}catch(e){console.error(e)}try{if(typeof LessonMonitor!=='undefined')LessonMonitor.on(n,...a)}catch(e){console.error(e)}};
const PRAISE=['Giỏi quá!','Chính xác!','Tuyệt vời!','Đúng rồi, con làm tốt lắm!','Xuất sắc!'];
const norm=s=>String(s).replace(/[\s .]/g,'').replace(',','.').toUpperCase();
// Đáp án thập phân: nhận cả "0,6" và "0.6" (bàn phím iPad tiếng Anh dùng dấu chấm); với đáp án nguyên, dấu chấm vẫn là dấu tách nghìn.
const numEq=(s,v)=>{if(s==='')return false;if(!isNaN(+norm(s))&&+norm(s)===v)return true;const t=String(s).trim().replace(/\s/g,'');return !Number.isInteger(v)&&/^-?\d+\.\d+$/.test(t)&&+t===v};
function matchOne(s,spec){if(Array.isArray(spec))return spec.some(x=>matchOne(s,x));if(typeof spec==='number')return numEq(s,spec);return norm(s)===norm(spec)}
function matchFrac(n,d,spec){n=+norm(n);d=+norm(d);if(!d||isNaN(n)||isNaN(d))return false;const[N,D]=spec.frac;if(spec.mode==='exact')return n===N&&d===D;const eq=n*D===N*d;return spec.mode==='simplest'?eq&&gcd(n,d)===1:eq}

function genSet(){const les=S.lesson,n=CONFIG.setSize,T=les.gens;S.qs=[];for(let i=0;i<n;i++){const gi=Math.min(T.length-1,Math.floor(i*T.length/n));S.qs.push(mkQ(gi))}}
function mkQ(gi){let q,tries=0,seen=new Set(S.qs.map(x=>x.sig));do{q=S.lesson.gens[gi](S.lv);q.sig=(q.text||'')+(q.tpl||'')+(q.expr||'')+(q.target||'');tries++}while(seen.has(q.sig)&&tries<20);q.gi=gi;q.tries=0;q.status='open';return q}

/* ---------- Render ---------- */
const app=$('#app');
function starsHTML(k,max=3){return `<span class="stars" aria-label="${k} trên ${max} sao">${'★'.repeat(k)}<span class="off">${'★'.repeat(max-k)}</span></span>`}
const bestKey=(id,lv,g=S.grade)=>`hoctap:${g.id}:${id}:${lv}`;
const lessonStars=(id,g=S.grade)=>[1,2,3].reduce((s,lv)=>s+(store.get(bestKey(id,lv,g))||0),0);
const testStars=g=>typeof StudentTest!=='undefined'?StudentTest.stars(g.id):0;
const gameStars=g=>typeof Game!=='undefined'&&Game.stars?Game.stars(g.id):0;
const gradeStars=g=>g.lessons.reduce((s,l)=>s+lessonStars(l.id,g),0)+testStars(g)+gameStars(g);
const gradeMaxStars=g=>g.lessons.length*9+(typeof StudentTest!=='undefined'?StudentTest.maxStars(g.id):0)+(typeof Game!=='undefined'&&Game.maxStars?Game.maxStars(g.id):0);
const lessonHref=(l,lv)=>`#/${S.grade.id}/bai/${l.id}${lv?'/'+lv:''}`;
const foot=()=>`<p class="foot">${CONFIG.author}</p>`;

function renderPicker(){
  let h=`<div class="toolbar"><span class="pill">${CONFIG.siteName}</span>${themeBtn()}</div>
  <h1>Con đang học lớp mấy?</h1><p class="lead">Chọn lớp để bắt đầu luyện tập theo từng bài.</p><div class="grid">`;
  App.grades.forEach(g=>{h+=`<a class="tile grade" href="#/${g.id}"><b class="gname">${g.name}</b><span>${g.subject} · ${g.book}</span><span class="meta"><span>${g.lessons.length} bài</span><span class="stars">⭐ ${gradeStars(g)}</span></span></a>`});
  (CONFIG.upcoming||[]).forEach(n=>{h+=`<div class="tile grade soon" aria-disabled="true"><b class="gname">${n}</b><span>Sắp có</span></div>`});
  app.innerHTML=h+`</div>`+foot();bindTheme();hook('picker');
}
const fold=x=>String(x).normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/đ/g,'d').toLowerCase();
const ST_TXT={todo:'Chưa làm',doing:'Đang làm',done:'Hoàn thành'};
const stOf=(pct,any)=>pct>=100?'done':any?'doing':'todo';
const stChip=st=>`<span class="chip st-${st}">${st==='done'?'✓ ':''}${ST_TXT[st]}</span>`;
const pbar=pct=>`<span class="prog"><span class="pbar"><i style="width:${pct}%"></i></span><span class="pct">${pct}%</span></span>`;
const lessonLevels=(l,g=S.grade)=>[1,2,3].map(lv=>Math.max(0,Math.min(3,+(store.get(bestKey(l.id,lv,g))||0))));
function lessonTile(l){const levels=lessonLevels(l),s=levels.reduce((a,b)=>a+b,0),pct=Math.round(s/9*100),st=stOf(pct,s>0);
  const lvHTML=levels.map((x,i)=>{const k=x>=3?'done':x>0?'doing':'todo',lab=x>=3?'✓':x?`${x}★`:'—';return `<span class="les-lv st-${k}" title="Mức ${i+1}: ${x}/3 sao"><b>M${i+1}</b><i>${lab}</i></span>`}).join('');
  return `<a class="tile les st-${st}" data-st="${st}" data-n="${fold(l.name)}" href="${lessonHref(l)}"><span class="les-top"><b>${l.name}</b>${stChip(st)}</span><span class="les-levels" aria-label="Tiến độ ba mức">${lvHTML}</span><span class="meta"><span>${l.gens.length} dạng bài</span><span>${s}/9 sao</span></span>${pbar(pct)}</a>`}
let HF={q:'',st:'all'};
function renderHome(){
  const g=S.grade,hkKey=`hoctap:${g.id}:hk`,hk=+(store.get(hkKey)||1),total=gradeStars(g),max=gradeMaxStars(g);
  const hks=[...new Set(g.topics.map(t=>t.hk))];
  const topics=[...g.topics.filter(t=>hks.length<2||t.hk===hk)].sort((a,b)=>(a.grp?1:0)-(b.grp?1:0));
  const vis=topics.flatMap(t=>g.lessons.filter(l=>l.t===t.id)),next=vis.find(l=>{const x=lessonStars(l.id);return x>0&&x<9})||vis.find(l=>!lessonStars(l.id));
  const cnt={all:vis.length,todo:0,doing:0,done:0};vis.forEach(l=>{const x=lessonStars(l.id);cnt[stOf(Math.round(x/9*100),x>0)]++});
  const got=vis.reduce((n,l)=>n+lessonStars(l.id),0),possible=vis.length*9,gp=possible?Math.round(got/possible*100):0;
  const missingLevels=vis.reduce((n,l)=>n+lessonLevels(l).filter(x=>x<3).length,0),openTopic=next?next.t:(topics[0]&&topics[0].id);
  let h=`<div class="toolbar">${App.grades.length>1||(CONFIG.upcoming||[]).length?`<a class="back" href="#/">← Chọn lớp</a>`:`<span class="pill">${g.name} · ${g.book}</span>`}<div class="row"><span class="stat">⭐ ${total}/${max}</span>${themeBtn()}</div></div>
  <span class="pill hide-sm">${g.subject} ${g.name.replace('Lớp ','')} · ${g.book}</span>
  <h1 class="home-h">Tổng quan bài học</h1><p class="lead hide-sm">Nhìn nhanh phần đã hoàn thành và chọn đúng bài còn thiếu để học tiếp.</p>
  <section class="overall learning-overview card" aria-label="Tổng quan tiến độ"><div class="ov-top"><b>${hks.length>1?`Học kì ${hk} · `:''}Hoàn thành ${gp}%</b><span>${got}/${possible} sao bài học</span></div><span class="pbar big"><i style="width:${gp}%"></i></span>
    <div class="home-stats"><button data-f="done" aria-pressed="${HF.st==='done'}"><b>${cnt.done}</b><span>✓ Hoàn thành</span></button><button data-f="doing" aria-pressed="${HF.st==='doing'}"><b>${cnt.doing}</b><span>◐ Đang làm</span></button><button data-f="todo" aria-pressed="${HF.st==='todo'}"><b>${cnt.todo}</b><span>○ Chưa làm</span></button></div>
    <p class="ov-missing">${missingLevels?`Còn <b>${cnt.todo+cnt.doing} bài</b> chưa hoàn thành và <b>${missingLevels} mức</b> cần bổ sung.`:'🎉 Con đã hoàn thành đủ cả ba mức của tất cả bài trong phần này.'}</p></section>
  ${next?`<a class="next-btn" href="${lessonHref(next)}"><span>▶ ${lessonStars(next.id)>0?'Làm tiếp':'Bắt đầu'}</span><b>${next.name}</b></a>`:''}
  ${hks.length>1?`<div class="tabs" role="tablist" aria-label="Học kì">${hks.map(k=>`<button role="tab" aria-selected="${hk===k}" data-hk="${k}">Học kì ${k}</button>`).join('')}</div>`:''}
  <div class="finder"><input id="fq" type="search" placeholder="🔍 Tìm bài (vd: phân số, hàm số…)" autocomplete="off" value="${HF.q.replace(/"/g,'&quot;')}" aria-label="Tìm bài"><div class="chips" role="group" aria-label="Lọc theo tiến độ">${[['all','Tất cả'],['todo','Chưa làm'],['doing','Đang làm'],['done','Xong']].map(([k,n])=>`<button class="fchip" data-f="${k}" aria-pressed="${HF.st===k}">${n} <small>${cnt[k]}</small></button>`).join('')}</div></div>`;
  let lastGrp='';topics.forEach(t=>{const ls=g.lessons.filter(l=>l.t===t.id),tests=typeof StudentTest!=='undefined'?StudentTest.tiles(g.id,t.id):'';if(!ls.length&&!tests)return;
    if((t.grp||'')!==lastGrp){lastGrp=t.grp||'';if(lastGrp)h+=`<h2 class="grp-title">${lastGrp}</h2>`}
    const dn=ls.filter(l=>lessonStars(l.id)>=9).length,ts=ls.reduce((n,l)=>n+lessonStars(l.id),0),tp=ls.length?Math.round(ts/(ls.length*9)*100):0;
    h+=`<details class="topic home-topic" data-topic="${t.id}" ${t.id===openTopic?'open':''}><summary class="home-topic-head"><span class="home-topic-title"><small>${t.label||'Chủ đề '+t.id}</small><strong>${t.name}</strong></span><span class="topic-summary"><em>${dn}/${ls.length} xong</em><span class="topic-pbar"><i style="width:${tp}%"></i></span><b>${tp}%</b><i class="topic-chev">⌄</i></span></summary><div class="grid home-grid">${ls.map(lessonTile).join('')}${tests}</div></details>`});
  app.innerHTML=h+`<p class="empty" id="fempty" hidden>Không có bài nào khớp. Thử bỏ bớt từ khóa hoặc chọn “Tất cả”.</p>`+foot();hook('home',g);
  if(matchMedia('(max-width:600px)').matches){const ov=$('.overall'),extra=[];for(let n=ov&&ov.previousElementSibling;n&&!n.matches('.lead,h1,.pill,.toolbar');n=n.previousElementSibling)extra.unshift(n);if(extra.length){const d=document.createElement('details');d.className='petfold card';d.innerHTML='<summary>🐣 Thú cưng · nhiệm vụ hôm nay</summary>';extra.forEach(n=>d.appendChild(n));ov.after(d)}}
  const apply=()=>{const q=fold(HF.q.trim());let any=false;$$('.topic').forEach(sec=>{let n=0;$$('.tile',sec).forEach(t=>{const ok=(HF.st==='all'||t.dataset.st===HF.st)&&(!q||(t.dataset.n||'').includes(q));t.hidden=!ok;if(ok)n++});sec.hidden=!n;if(n){any=true;if(q||HF.st!=='all')sec.open=true}});$('#fempty').hidden=any;$$('[data-f]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.f===HF.st))};
  $('#fq').oninput=e=>{HF.q=e.target.value;apply()};$$('[data-f]').forEach(b=>b.onclick=()=>{HF.st=b.dataset.f;apply()});apply();
  $$('[data-hk]').forEach(b=>b.onclick=()=>{store.set(hkKey,+b.dataset.hk);renderHome()});bindTheme();
}
const hasSound=()=>typeof Sound!=='undefined';
function themeBtn(){return `<span class="tbtns">${hasSound()?`<button class="theme-btn" id="soundBtn" aria-label="Bật/tắt âm thanh">${Sound.on?'🔊':'🔇'}</button>`:''}<button class="theme-btn" id="themeBtn" aria-label="Đổi giao diện sáng/tối">◐</button></span>`}
function bindTheme(){const sb=$('#soundBtn');if(sb)sb.onclick=()=>{sb.textContent=Sound.toggle()?'🔊':'🔇'};const b=$('#themeBtn');if(b)b.onclick=()=>{const cur=document.documentElement.dataset.theme||(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');const nx=cur==='dark'?'light':'dark';document.documentElement.dataset.theme=nx;store.set('hoctap:theme',nx)}}

function renderLesson(){
  const g=S.grade,l=S.lesson,t=g.topics.find(x=>x.id===l.t)||{id:l.t,name:''},idx=g.lessons.indexOf(l),next=g.lessons[idx+1],home=`#/${g.id}`;
  let h=`<div class="toolbar"><a class="back" href="${home}">← Các bài ${g.name}</a>${themeBtn()}</div>
  <span class="pill">${g.name} · ${t.label||'Chủ đề '+t.id} · ${t.name}</span><h1>${l.name}${l.en?`<small class="L-en h1en">${l.en}</small>`:''}</h1><p class="lead">${l.descEn?bi(l.desc,l.descEn):l.desc}</p>${l.bi?langSw():''}${l.intro?introHTML(l):''}
  <div class="levels" role="group" aria-label="Chọn mức độ">${LEVELS.map((x,i)=>`<button class="lvl" data-lv="${i+1}" aria-pressed="${S.lv===i+1}"><b>${x.n}</b><span>${x.d} · ${starsHTML(store.get(bestKey(l.id,i+1))||0)}</span></button>`).join('')}</div>
  <div class="row"><button class="btn" id="newSet">↻ Làm bộ mới</button><button class="btn" id="resetSet">Xoá để làm lại</button></div>
  <div class="progress"><div class="bar"><i id="pbar"></i></div><div class="txt"><span id="ptxt"></span><span id="pscore"></span></div></div>
  <div id="qs"></div><div id="sum"></div>
  <div class="row" style="margin-top:8px"><button class="btn" id="newSet2">↻ Làm bộ mới</button><a class="btn primary" href="${home}">← Các bài ${g.name}</a>${next?`<a class="btn" href="${lessonHref(next)}">Bài tiếp theo →</a>`:''}</div>`+foot();
  app.innerHTML=h;bindTheme();bindLang();
  $$('.lvl').forEach(b=>b.onclick=()=>{location.hash=lessonHref(l,+b.dataset.lv)});
  $('#newSet').onclick=$('#newSet2').onclick=()=>{genSet();renderQs();scrollTo({top:$('#qs').offsetTop-120,behavior:'smooth'})};
  $('#resetSet').onclick=()=>{S.qs.forEach(q=>{q.tries=0;q.status='open';q.user=null;q.pts=0;if(q.kind==='shade')q.on=[];if(q.kind==='rotate')q.val=q.target===90?40:90;delete q.sel;if(q.kind==='steps')stepsReset(q)});updateProgress._t=null;renderQs();toast('Đã xoá, con làm lại nhé!')};
  renderQs();hook('lesson',g,l);
}
/* Song ngữ + kiến thức trọng tâm (bài có l.bi / l.intro) */
const LANGS=[['vi','Tiếng Việt'],['bi','Song ngữ'],['en','English']];
function langSw(){const cur=document.documentElement.dataset.lang||'bi';return `<div class="langsw" role="group" aria-label="Ngôn ngữ / Language">${LANGS.map(([k,n])=>`<button class="btn small" data-lang="${k}" aria-pressed="${cur===k}">${n}</button>`).join('')}</div>`}
function bindLang(){$$('[data-lang]').forEach(b=>b.onclick=()=>{document.documentElement.dataset.lang=b.dataset.lang;store.set('hoctap:lang',b.dataset.lang);$$('[data-lang]').forEach(x=>x.setAttribute('aria-pressed',x===b))})}
const pair=a=>Array.isArray(a)?bi(a[0],a[1]):(a||'');
function introHTML(l){return `<details class="card kt-intro" open><summary>📘 ${l.bi?bin('Kiến thức trọng tâm – đọc trước khi làm bài','Key ideas – read before you start'):(l.introTitle||'Kiến thức cần nhớ, lưu ý và mẹo – đọc trước khi làm bài')}</summary>${l.intro.map((k,i)=>`<div class="kt-item ${k.fig?'has-fig':''}"><div><h3>${i+1}. ${pair(k.t)}</h3><div class="kt-b">${pair(k.b)}</div>${k.warn?`<div class="kt-warn">⚠️ ${pair(k.warn)}</div>`:''}${k.ex?`<div class="kt-ex">💡 ${pair(k.ex)}</div>`:''}</div>${k.fig?`<div class="fig">${k.fig}</div>`:''}</div>`).join('')}</details>`}
function renderQs(){const box=$('#qs');box.innerHTML='';S.qs.forEach((q,i)=>box.appendChild(cardEl(q,i)));updateProgress()}

function blanksHTML(q){let bi=0;return q.tpl.split(/(\[_\]|\[F\])/).map(p=>{if(p==='[_]'){const k=bi++;return `<input class="blank ${q.wide?'wide':''}" data-b="${k}" inputmode="${q.text&&/La Mã/.test(q.text)?'text':'decimal'}" autocomplete="off" autocapitalize="characters" spellcheck="false" aria-label="Ô trống ${k+1}">`}
  if(p==='[F]'){const k=bi++;return `<span class="fr"><input class="blank" data-b="${k}" data-part="n" inputmode="numeric" autocomplete="off" aria-label="Tử số"><i class="fbar"></i><input class="blank" data-b="${k}" data-part="d" inputmode="numeric" autocomplete="off" aria-label="Mẫu số"></span>`}return p}).join('')}

function cardEl(q,i){
  const el=document.createElement('article');el.className='card'+(q.kind==='steps'?' is-steps':'');el.setAttribute('aria-labelledby',`qt${i}`);
  const hasFig=!!(q.fig||q.kind==='rotate'||q.kind==='shade');
  let ans='';
  if(q.kind==='blanks')ans=`<div class="answer">${blanksHTML(q)}</div>`;
  else if(q.kind==='choice')ans=`${q.expr?`<div class="answer" style="margin-bottom:8px">${q.expr}</div>`:''}<div class="choices ${q.compact?'compact':''}" role="group" aria-label="Các lựa chọn">${q.opts.map((o,k)=>`<button class="choice" data-c="${k}" aria-pressed="false">${o}</button>`).join('')}</div>`;
  else if(q.kind==='rotate')ans=`<div class="ctrls">${[-10,-5,5,10].map(d=>`<button class="btn small" data-rot="${d}">${d>0?'+':'−'} ${Math.abs(d)}°</button>`).join('')}</div>`;
  else if(q.kind==='steps')ans=`<div data-steps>${stepsHTML(q)}</div>`;
  else if(q.kind==='shade')ans=`<div class="ctrls"><span style="font-size:17px;color:var(--muted)">Đã tô: <b data-cnt>0</b> phần</span></div>`;
  const fig=q.kind==='rotate'?protractorSVG(q.val,{interactive:true}):q.kind==='shade'?fracSVG(q.n,0,q.shape,true):(q.fig||'');
  el.innerHTML=`<div class="qhead"><span class="badge">Câu ${i+1}</span><span class="chip">${LEVELS[S.lv-1].n}</span><span class="spacer"></span><button class="linkbtn" data-swap>Đổi câu khác</button></div>
   <p class="qtext" id="qt${i}">${q.text}</p>
   <div class="qbody ${hasFig&&q.kind!=='rotate'&&q.kind!=='shade'?'has-fig':''}">${hasFig?`<div class="fig">${fig}</div>`:''}<div>${ans}</div></div>
   <div class="actions"><button class="btn primary" data-check>${q.kind==='steps'?'Kiểm tra bước này':'Kiểm tra câu này'}</button></div><div class="fb" data-fb></div>`;
  // restore state
  if(q.kind==='blanks'&&q.user)$$('.blank',el).forEach((inp,k)=>inp.value=q.user[k]||'');
  if(q.kind==='choice'&&q.sel!=null)$(`[data-c="${q.sel}"]`,el).setAttribute('aria-pressed','true');
  if(q.kind==='shade'){q.on.forEach(k=>$(`[data-i="${k}"]`,el).classList.add('on'));$('[data-cnt]',el).textContent=q.on.length}
  bindCard(el,q,i);if(q.kind==='steps')bindSteps(el,q);if(q.status!=='open')lockCard(el,q,true);return el;
}
function setRot(el,q,deg){q.val=Math.max(0,Math.min(180,deg));const cx=170,cy=178,[bx,by]=P(cx,cy,158,q.val),[lx,ly]=P(cx,cy,176,q.val);const ray=$('[data-ray]',el),hd=$('[data-handle]',el),lb=$('[data-lb]',el);
  ray.setAttribute('x2',bx);ray.setAttribute('y2',by);hd.setAttribute('cx',bx);hd.setAttribute('cy',by);lb.setAttribute('x',lx-6);lb.setAttribute('y',ly+6)}
function bindCard(el,q,i){
  $('[data-check]',el).onclick=()=>check(el,q);
  $('[data-swap]',el).onclick=()=>{const nq=mkQ(q.gi);S.qs[i]=nq;el.replaceWith(cardEl(nq,i));updateProgress()};
  $$('.blank',el).forEach(inp=>{inp.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();check(el,q)}});inp.addEventListener('input',()=>{inp.classList.remove('wrong');q.user=$$('.blank',el).map(x=>x.value)})});
  $$('[data-c]',el).forEach(b=>b.onclick=()=>{if(q.status!=='open')return;$$('[data-c]',el).forEach(x=>{x.setAttribute('aria-pressed','false');x.classList.remove('wrong')});b.setAttribute('aria-pressed','true');q.sel=+b.dataset.c});
  if(q.kind==='rotate'){$$('[data-rot]',el).forEach(b=>b.onclick=()=>q.status==='open'&&setRot(el,q,q.val+ +b.dataset.rot));
    const svg=$('svg',el);let drag=false;const ang=e=>{const pt=svg.createSVGPoint();pt.x=e.clientX;pt.y=e.clientY;const p=pt.matrixTransform(svg.getScreenCTM().inverse());let a=Math.atan2(178-p.y,p.x-170)*180/Math.PI;if(a<0)a=p.x>170?0:180;return Math.round(a/q.step)*q.step};
    svg.style.touchAction='none';svg.addEventListener('pointerdown',e=>{if(q.status!=='open')return;drag=true;svg.setPointerCapture(e.pointerId);setRot(el,q,ang(e))});
    svg.addEventListener('pointermove',e=>{if(drag)setRot(el,q,ang(e))});svg.addEventListener('pointerup',()=>drag=false);svg.addEventListener('pointercancel',()=>drag=false)}
  if(q.kind==='shade')$$('.sv-part',el).forEach(p=>p.addEventListener('click',()=>{if(q.status!=='open')return;const k=+p.dataset.i;const j=q.on.indexOf(k);j<0?q.on.push(k):q.on.splice(j,1);p.classList.toggle('on');$('[data-cnt]',el).textContent=q.on.length}));
}
function fb(el,type,title,body){const f=$('[data-fb]',el);f.className=`fb show ${type}`;f.innerHTML=`<b class="t">${title}</b>${body||''}`}
function check(el,q){
  if(q.status!=='open')return;if(q.kind==='steps')return stepCheck(el,q);let ok=false,empty=false;
  if(q.kind==='blanks'){const inputs=$$('.blank',el);q.user=inputs.map(x=>x.value);if(inputs.some(x=>x.value.trim()===''))empty=true;else{
    const groups=[];inputs.forEach(x=>{const k=+x.dataset.b;(groups[k]=groups[k]||[]).push(x)});
    const res=groups.map((g,k)=>{const spec=q.ans[k];return g.length===2?matchFrac(g[0].value,g[1].value,spec):matchOne(g[0].value,spec)});
    if(q.sameDen&&res.every(Boolean)){const d=groups.map(g=>+norm(g[1].value));if(new Set(d).size>1)res.fill(false)}
    ok=res.every(Boolean);groups.forEach((g,k)=>g.forEach(x=>x.classList.toggle('wrong',!res[k])))}}
  else if(q.kind==='choice'){if(q.sel==null)empty=true;else{ok=q.sel===q.correct;if(!ok)$(`[data-c="${q.sel}"]`,el).classList.add('wrong')}}
  else if(q.kind==='rotate')ok=q.val===q.target;
  else if(q.kind==='shade'){if(!q.on.length)empty=true;else ok=q.on.length*q.den===q.num*q.n}
  if(empty){fb(el,'note','Con chưa làm xong',q.kind==='choice'?'Hãy chọn một đáp án trước nhé.':q.kind==='shade'?'Hãy chạm vào hình để tô màu.':'Con điền đủ các ô trống nhé.');return}
  if(hasSound())Sound.play(ok?'ok':'bad');
  if(ok){q.status='ok';q.pts=q.tries===0?1:.5;fb(el,'ok',pick(PRAISE),q.tries?`<div>${q.sol}</div>`:'');lockCard(el,q)}
  else{q.tries++;if(q.tries===1)fb(el,'hint','Chưa đúng rồi, thử lại nhé!',`<div>💡 Gợi ý: ${q.hint}</div>`);else{q.status='fail';q.pts=0;fb(el,'sol','Mình cùng xem lời giải nhé',`<div>${q.sol}</div>`);lockCard(el,q)}}
  hook('answer',{ok,tries:q.tries,final:q.status!=='open',el});
  updateProgress();
}
function lockCard(el,q,restore){el.classList.add(q.status==='ok'?'ok':'fail');$('[data-check]',el).disabled=true;$('[data-swap]',el).hidden=true;
  $$('.blank',el).forEach(x=>{x.disabled=true;if(q.status==='ok')x.classList.add('right')});$$('[data-c],[data-rot],[data-sc],[data-guide]',el).forEach(b=>b.disabled=true);
  if(q.kind==='choice'){$(`[data-c="${q.correct}"]`,el).classList.add('right')}
  if(restore){q.status==='ok'?fb(el,'ok','Đúng rồi!',''):fb(el,'sol','Lời giải',`<div>${q.sol}</div>`)}}
/* ---------- Bài toán nhiều bước (kind 'steps', dựng bằng QS trong core.js) ----------
   Mỗi lần chỉ mở một bước. Sai lần 1 → gợi ý của bước; sai lần 2 → hiện đáp án bước đó rồi làm tiếp.
   Điểm: không sai bước nào = 1; có sai nhưng tự sửa được (hoặc mức 3 phải nhờ "làm từng bước") = ½; phải xem đáp án một bước = 0. */
const STEP_ICON={'Hiểu đề':'🔎','Tóm tắt':'📝','Kế hoạch':'🧭','Giải':'✏️','Thử lại':'✅','Đáp số':'🎯'};
const STEP_PRAISE=['Đúng rồi!','Chuẩn!','Tốt lắm!','Giỏi quá!'];
const stepVal=a=>{const v=Array.isArray(a)?a[0]:a;return typeof v==='number'?fmt(v):v};
function stepFill(s){let b=0;return s.tpl.split(/(\[_\])/).map(p=>p==='[_]'?`<b class="stp-v">${stepVal(s.ans[b++])}</b>`:p).join('')}
function stepAnsText(s){return s.kind==='choice'?s.opts[s.correct]:stepFill(s)}
function stepsHTML(q){const last=q.steps.length-1;let h='<ol class="stp">';
  q.steps.forEach((s,k)=>{if(q.guided?k>q.cur&&!q.done[k]:k!==last)return;const st=q.done[k],act=!st&&q.status==='open';
    const ctl=st?`<div class="${s.kind==='choice'?'stp-done':'answer stp-done'}">${stepAnsText(s)}</div>`:s.kind==='choice'?`<div class="choices" role="group">${s.opts.map((o,j)=>`<button class="choice" data-sc="${j}" aria-pressed="${q.sel===j}">${o}</button>`).join('')}</div>`:`<div class="answer">${blanksHTML(s)}</div>`;
    h+=`<li class="stp-i${st?' is-'+st:''}${act?' is-cur':''}" data-s="${k}"><div class="stp-h"><span class="stp-tag">${q.guided?`Bước ${k+1} · `:''}${STEP_ICON[s.tag]||''} ${s.tag}</span>${st==='ok'?'<span class="stp-mark ok">✓</span>':st==='shown'?'<span class="stp-mark">đã xem đáp án</span>':''}</div><p class="stp-ask">${s.ask}</p>${ctl}</li>`});
  h+='</ol>';if(!q.guided&&q.status==='open')h+=`<button class="btn small stp-guide" data-guide>🧭 Cần gợi ý? Làm theo từng bước</button>`;return h}
function drawSteps(el,q){$('[data-steps]',el).innerHTML=stepsHTML(q);bindSteps(el,q);const c=$('.stp-i.is-cur .blank',el);if(c&&q.cur>0)try{c.focus({preventScroll:true})}catch(e){}}
function bindSteps(el,q){
  $$('[data-sc]',el).forEach(b=>b.onclick=()=>{if(q.status!=='open')return;$$('[data-sc]',el).forEach(x=>{x.setAttribute('aria-pressed','false');x.classList.remove('wrong')});b.setAttribute('aria-pressed','true');q.sel=+b.dataset.sc});
  $$('[data-steps] .blank',el).forEach(inp=>{inp.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();check(el,q)}});inp.addEventListener('input',()=>inp.classList.remove('wrong'))});
  const g=$('[data-guide]',el);if(g)g.onclick=()=>{q.guided=true;q.usedGuide=true;q.cur=0;q.sel=null;drawSteps(el,q);fb(el,'note','Mình cùng làm từng bước nhé','Làm xong các bước, con sẽ được ½ điểm.')}}
function stepCheck(el,q){
  const last=q.steps.length-1,k=q.guided?q.cur:last,s=q.steps[k],li=$(`[data-s="${k}"]`,el);let ok;
  if(s.kind==='choice'){if(q.sel==null){fb(el,'note','Con chưa chọn','Hãy chọn một đáp án cho bước này nhé.');return}ok=q.sel===s.correct;if(!ok)$(`[data-sc="${q.sel}"]`,li).classList.add('wrong')}
  else{const ins=$$('.blank',li);if(ins.some(x=>!x.value.trim())){fb(el,'note','Con chưa làm xong','Con điền đủ các ô của bước này nhé.');return}
    const res=ins.map((x,j)=>matchOne(x.value,s.ans[j]));ins.forEach((x,j)=>x.classList.toggle('wrong',!res[j]));ok=res.every(Boolean)}
  if(hasSound())Sound.play(ok?'ok':'bad');
  if(ok){q.done[k]='ok';q.sel=null;if(!q.guided||k===last)return stepFinish(el,q);q.cur++;drawSteps(el,q);fb(el,'ok',pick(STEP_PRAISE),'Con làm tiếp bước sau nhé.');return}
  q.errs++;q.st[k]=(q.st[k]||0)+1;
  if(!q.guided){q.guided=true;q.cur=0;q.sel=null;drawSteps(el,q);fb(el,'hint','Chưa đúng rồi. Mình cùng làm từng bước nhé!','Con làm lần lượt các bước bên dưới.');return}
  if(q.st[k]===1){fb(el,'hint','Chưa đúng, con thử lại nhé!',`<div>💡 Gợi ý: ${s.hint||q.hint}</div>`);return}
  q.done[k]='shown';q.sel=null;if(k===last)return stepFinish(el,q);
  q.cur++;drawSteps(el,q);fb(el,'sol','Mình xem đáp án bước này nhé',`<div>Đáp án: ${stepAnsText(s)}</div><div>Con làm tiếp bước sau.</div>`)}
function stepFinish(el,q){const shown=q.done.includes('shown');
  q.status=shown?'fail':'ok';q.pts=shown?0:q.errs===0&&!q.usedGuide?1:.5;q.tries=q.pts===1?0:1;drawSteps(el,q);
  if(shown)fb(el,'sol','Mình cùng xem bài giải nhé',`<div class="stp-sol">${q.sol}</div>`);else fb(el,'ok',pick(PRAISE),`<div class="stp-sol">${q.sol}</div>`);
  lockCard(el,q);hook('answer',{ok:!shown,tries:q.tries,final:true,el});updateProgress()}
function updateProgress(){const n=S.qs.length,done=S.qs.filter(q=>q.status!=='open').length,pts=S.qs.reduce((s,q)=>s+(q.pts||0),0);
  $('#pbar').style.width=(done/n*100)+'%';$('#ptxt').textContent=`Đã làm ${done}/${n} câu`;$('#pscore').textContent=`Điểm: ${fmtPts(pts)}/${n}`;
  const sum=$('#sum');if(done<n){sum.innerHTML='';return}
  const r=pts/n,st=r>=.9?3:r>=.7?2:r>=.4?1:0,k=bestKey(S.lesson.id,S.lv),prev=store.get(k)||0;if(st>prev)store.set(k,st);
  const msg=st===3?'Con làm rất giỏi!':st===2?'Làm tốt lắm, cố thêm chút nữa nhé!':st===1?'Con đã cố gắng! Làm thêm bộ mới nhé.':'Không sao cả, mình luyện thêm nhé!';
  sum.innerHTML=`<div class="card summary"><div>${starsHTML(st)}</div><h3>${msg}</h3><p class="lead" style="margin:0">Điểm của con: <b>${fmtPts(pts)}/${n}</b> (đúng ngay lần đầu được 1 điểm, đúng lần hai được ½ điểm).</p>
   <div class="row" style="justify-content:center;margin-top:14px">${S.lv<3&&st>=2?`<button class="btn primary" id="upLv">Lên ${LEVELS[S.lv].n} →</button>`:''}<button class="btn" id="again">↻ Làm bộ mới</button></div></div>`;
  $('#again').onclick=()=>{genSet();renderQs();scrollTo({top:$('#qs').offsetTop-120,behavior:'smooth'})};const up=$('#upLv');if(up)up.onclick=()=>location.hash=lessonHref(S.lesson,S.lv+1);
  $$('.lvl .stars').forEach((s,i)=>s.outerHTML=starsHTML(store.get(bestKey(S.lesson.id,i+1))||0));
  if(!updateProgress._t||updateProgress._t!==S.qs){toast(`Hoàn thành! ${'⭐'.repeat(st)||'💪'}`);hook('done',{g:S.grade,l:S.lesson,lv:S.lv,st,pts,n})}updateProgress._t=S.qs;
}
const fmtPts=p=>Number.isInteger(p)?p:String(p).replace('.',',');
let tT;function toast(m){const t=$('#toast');t.textContent=m;t.classList.add('show');clearTimeout(tT);tT=setTimeout(()=>t.classList.remove('show'),1800)}

/* ---------- Điều hướng: #/  ·  #/lop4  ·  #/lop4/bai/ma-bai/2 ---------- */
function route(){
  if(typeof Hub!=='undefined'&&Hub.route())return;
  if(typeof Game!=='undefined'&&Game.route())return;
  if(typeof StudentTest!=='undefined'&&StudentTest.route())return;
  const m=location.hash.match(/^#\/([\w-]+)(?:\/bai\/([\w-]+)(?:\/(\d))?)?/);
  const g=m&&App.grades.find(x=>x.id===m[1]);
  if(!g){ if(App.grades.length===1&&!(CONFIG.upcoming||[]).length){location.replace('#/'+App.grades[0].id);return}
    S.grade=null;S.lesson=null;S.qs=[];document.title=CONFIG.siteName;renderPicker();scrollTo(0,0);return}
  S.grade=g;
  const l=m[2]&&g.lessons.find(x=>x.id===m[2]);
  if(l){const lv=Math.min(3,Math.max(1,+(m[3]||1)));const changed=S.lesson!==l||S.lv!==lv;S.lesson=l;S.lv=lv;if(changed||!S.qs.length)genSet();renderLesson();document.title=`${l.name} – ${g.subject} ${g.name}`;scrollTo(0,0);return}
  S.lesson=null;S.qs=[];document.title=`${g.subject} ${g.name} – ${CONFIG.siteName}`;renderHome();scrollTo(0,0)}

/* Tải lần lượt các file data/<lớp>.js khai báo trong config.js (bản gộp một file thì đã có sẵn) */
function loadGrades(ids,done){const need=ids.filter(id=>!App.grades.some(g=>g.id===id));let i=0;
  const next=()=>{if(i>=need.length)return done();const id=need[i++],sc=document.createElement('script');sc.src=`data/${id}.js`;sc.onload=next;
    sc.onerror=()=>{app.insertAdjacentHTML('beforeend',`<div class="fb show sol"><b class="t">Không tải được data/${id}.js</b>Kiểm tra lại tên file trong config.js.</div>`);next()};document.body.appendChild(sc)};next()}
(function init(){const th=store.get('hoctap:theme');if(th)document.documentElement.dataset.theme=th;document.documentElement.dataset.lang=store.get('hoctap:lang')||'bi';$('#author').textContent=CONFIG.author;$('#brand').innerHTML=CONFIG.brandHTML||CONFIG.siteName;
  loadGrades(CONFIG.grades,()=>{App.grades.sort((a,b)=>CONFIG.grades.indexOf(a.id)-CONFIG.grades.indexOf(b.id));const start=()=>{addEventListener('hashchange',route);route()};typeof Account!=='undefined'&&Account.gate?Account.gate(start):start()})})();
