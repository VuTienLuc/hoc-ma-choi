/* =====================================================================
   ENGINE – hiển thị, chấm bài, điều hướng. Dùng chung cho mọi lớp.
   Thường không cần sửa file này khi thêm lớp/bài mới.
   ===================================================================== */
const LEVELS=[{n:'Mức 1',d:'Làm quen'},{n:'Mức 2',d:'Luyện tập'},{n:'Mức 3',d:'Thử thách'}];
let S={grade:null,lesson:null,lv:1,qs:[]};
const PRAISE=['Giỏi quá!','Chính xác!','Tuyệt vời!','Đúng rồi, con làm tốt lắm!','Xuất sắc!'];
const norm=s=>String(s).replace(/[\s .]/g,'').replace(',','.').toUpperCase();
const numEq=(s,v)=>s!==''&&!isNaN(+norm(s))&&+norm(s)===v;
function matchOne(s,spec){if(Array.isArray(spec))return spec.some(x=>matchOne(s,x));if(typeof spec==='number')return numEq(s,spec);return norm(s)===norm(spec)}
function matchFrac(n,d,spec){n=+norm(n);d=+norm(d);if(!d||isNaN(n)||isNaN(d))return false;const[N,D]=spec.frac;if(spec.mode==='exact')return n===N&&d===D;const eq=n*D===N*d;return spec.mode==='simplest'?eq&&gcd(n,d)===1:eq}

function genSet(){const les=S.lesson,n=CONFIG.setSize,T=les.gens;S.qs=[];for(let i=0;i<n;i++){const gi=Math.min(T.length-1,Math.floor(i*T.length/n));S.qs.push(mkQ(gi))}}
function mkQ(gi){let q,tries=0,seen=new Set(S.qs.map(x=>x.sig));do{q=S.lesson.gens[gi](S.lv);q.sig=(q.text||'')+(q.tpl||'')+(q.expr||'')+(q.target||'');tries++}while(seen.has(q.sig)&&tries<20);q.gi=gi;q.tries=0;q.status='open';return q}

/* ---------- Render ---------- */
const app=$('#app');
function starsHTML(k,max=3){return `<span class="stars" aria-label="${k} trên ${max} sao">${'★'.repeat(k)}<span class="off">${'★'.repeat(max-k)}</span></span>`}
const bestKey=(id,lv,g=S.grade)=>`hoctap:${g.id}:${id}:${lv}`;
const lessonStars=(id,g=S.grade)=>[1,2,3].reduce((s,lv)=>s+(store.get(bestKey(id,lv,g))||0),0);
const gradeStars=g=>g.lessons.reduce((s,l)=>s+lessonStars(l.id,g),0);
const lessonHref=(l,lv)=>`#/${S.grade.id}/bai/${l.id}${lv?'/'+lv:''}`;
const foot=()=>`<p class="foot">${CONFIG.author}</p>`;

function renderPicker(){
  let h=`<div class="toolbar"><span class="pill">${CONFIG.siteName}</span>${themeBtn()}</div>
  <h1>Con đang học lớp mấy?</h1><p class="lead">Chọn lớp để bắt đầu luyện tập theo từng bài.</p><div class="grid">`;
  App.grades.forEach(g=>{h+=`<a class="tile grade" href="#/${g.id}"><b class="gname">${g.name}</b><span>${g.subject} · ${g.book}</span><span class="meta"><span>${g.lessons.length} bài</span><span class="stars">⭐ ${gradeStars(g)}</span></span></a>`});
  (CONFIG.upcoming||[]).forEach(n=>{h+=`<div class="tile grade soon" aria-disabled="true"><b class="gname">${n}</b><span>Sắp có</span></div>`});
  app.innerHTML=h+`</div>`+foot();bindTheme();
}
function renderHome(){
  const g=S.grade,hkKey=`hoctap:${g.id}:hk`,hk=+(store.get(hkKey)||1),total=gradeStars(g);
  const hks=[...new Set(g.topics.map(t=>t.hk))];
  let h=`<div class="toolbar">${App.grades.length>1||(CONFIG.upcoming||[]).length?`<a class="back" href="#/">← Chọn lớp</a>`:`<span class="pill">${g.name} · ${g.book}</span>`}<div class="row"><span class="stat">⭐ ${total} / ${g.lessons.length*9} sao</span>${themeBtn()}</div></div>
  <span class="pill">${g.subject} ${g.name.replace('Lớp ','')} · ${g.book}</span>
  <h1>Con muốn ôn bài nào hôm nay?</h1><p class="lead">Mỗi bài có 3 mức. Mỗi bộ ${CONFIG.setSize} câu, xếp từ dễ đến khó. Sai lần một có gợi ý, sai lần hai mới hiện lời giải.</p>
  ${hks.length>1?`<div class="tabs" role="tablist" aria-label="Học kì">${hks.map(k=>`<button role="tab" aria-selected="${hk===k}" data-hk="${k}">Học kì ${k}</button>`).join('')}</div>`:''}`;
  g.topics.filter(t=>hks.length<2||t.hk===hk).forEach(t=>{const ls=g.lessons.filter(l=>l.t===t.id);if(!ls.length)return;
    h+=`<section class="topic"><h2><small>Chủ đề ${t.id}</small>${t.name}</h2><div class="grid">${ls.map(l=>`<a class="tile" href="${lessonHref(l)}"><b>${l.name}</b><span class="meta"><span>${l.gens.length} dạng bài</span>${starsHTML(Math.round(lessonStars(l.id)/3))}</span></a>`).join('')}</div></section>`});
  app.innerHTML=h+foot();
  $$('[data-hk]').forEach(b=>b.onclick=()=>{store.set(hkKey,+b.dataset.hk);renderHome()});bindTheme();
}
function themeBtn(){return `<button class="theme-btn" id="themeBtn" aria-label="Đổi giao diện sáng/tối">◐</button>`}
function bindTheme(){const b=$('#themeBtn');if(b)b.onclick=()=>{const cur=document.documentElement.dataset.theme||(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');const nx=cur==='dark'?'light':'dark';document.documentElement.dataset.theme=nx;store.set('hoctap:theme',nx)}}

function renderLesson(){
  const g=S.grade,l=S.lesson,t=g.topics.find(x=>x.id===l.t)||{id:l.t,name:''},idx=g.lessons.indexOf(l),next=g.lessons[idx+1],home=`#/${g.id}`;
  let h=`<div class="toolbar"><a class="back" href="${home}">← Các bài ${g.name}</a>${themeBtn()}</div>
  <span class="pill">${g.name} · Chủ đề ${t.id} · ${t.name}</span><h1>${l.name}</h1><p class="lead">${l.desc}</p>
  <div class="levels" role="group" aria-label="Chọn mức độ">${LEVELS.map((x,i)=>`<button class="lvl" data-lv="${i+1}" aria-pressed="${S.lv===i+1}"><b>${x.n}</b><span>${x.d} · ${starsHTML(store.get(bestKey(l.id,i+1))||0)}</span></button>`).join('')}</div>
  <div class="row"><button class="btn" id="newSet">↻ Làm bộ mới</button><button class="btn" id="resetSet">Xoá để làm lại</button></div>
  <div class="progress"><div class="bar"><i id="pbar"></i></div><div class="txt"><span id="ptxt"></span><span id="pscore"></span></div></div>
  <div id="qs"></div><div id="sum"></div>
  <div class="row" style="margin-top:8px"><button class="btn" id="newSet2">↻ Làm bộ mới</button><a class="btn primary" href="${home}">← Các bài ${g.name}</a>${next?`<a class="btn" href="${lessonHref(next)}">Bài tiếp theo →</a>`:''}</div>`+foot();
  app.innerHTML=h;bindTheme();
  $$('.lvl').forEach(b=>b.onclick=()=>{location.hash=lessonHref(l,+b.dataset.lv)});
  $('#newSet').onclick=$('#newSet2').onclick=()=>{genSet();renderQs();scrollTo({top:$('#qs').offsetTop-120,behavior:'smooth'})};
  $('#resetSet').onclick=()=>{S.qs.forEach(q=>{q.tries=0;q.status='open';q.user=null;q.pts=0;if(q.kind==='shade')q.on=[];if(q.kind==='rotate')q.val=q.target===90?40:90;delete q.sel});updateProgress._t=null;renderQs();toast('Đã xoá, con làm lại nhé!')};
  renderQs();
}
function renderQs(){const box=$('#qs');box.innerHTML='';S.qs.forEach((q,i)=>box.appendChild(cardEl(q,i)));updateProgress()}

function blanksHTML(q){let bi=0;return q.tpl.split(/(\[_\]|\[F\])/).map(p=>{if(p==='[_]'){const k=bi++;return `<input class="blank ${q.wide?'wide':''}" data-b="${k}" inputmode="${q.text&&/La Mã/.test(q.text)?'text':'decimal'}" autocomplete="off" autocapitalize="characters" spellcheck="false" aria-label="Ô trống ${k+1}">`}
  if(p==='[F]'){const k=bi++;return `<span class="fr"><input class="blank" data-b="${k}" data-part="n" inputmode="numeric" autocomplete="off" aria-label="Tử số"><i class="fbar"></i><input class="blank" data-b="${k}" data-part="d" inputmode="numeric" autocomplete="off" aria-label="Mẫu số"></span>`}return p}).join('')}

function cardEl(q,i){
  const el=document.createElement('article');el.className='card';el.setAttribute('aria-labelledby',`qt${i}`);
  const hasFig=!!(q.fig||q.kind==='rotate'||q.kind==='shade');
  let ans='';
  if(q.kind==='blanks')ans=`<div class="answer">${blanksHTML(q)}</div>`;
  else if(q.kind==='choice')ans=`${q.expr?`<div class="answer" style="margin-bottom:8px">${q.expr}</div>`:''}<div class="choices ${q.compact?'compact':''}" role="group" aria-label="Các lựa chọn">${q.opts.map((o,k)=>`<button class="choice" data-c="${k}" aria-pressed="false">${o}</button>`).join('')}</div>`;
  else if(q.kind==='rotate')ans=`<div class="ctrls">${[-10,-5,5,10].map(d=>`<button class="btn small" data-rot="${d}">${d>0?'+':'−'} ${Math.abs(d)}°</button>`).join('')}</div>`;
  else if(q.kind==='shade')ans=`<div class="ctrls"><span style="font-size:17px;color:var(--muted)">Đã tô: <b data-cnt>0</b> phần</span></div>`;
  const fig=q.kind==='rotate'?protractorSVG(q.val,{interactive:true}):q.kind==='shade'?fracSVG(q.n,0,q.shape,true):(q.fig||'');
  el.innerHTML=`<div class="qhead"><span class="badge">Câu ${i+1}</span><span class="chip">${LEVELS[S.lv-1].n}</span><span class="spacer"></span><button class="linkbtn" data-swap>Đổi câu khác</button></div>
   <p class="qtext" id="qt${i}">${q.text}</p>
   <div class="qbody ${hasFig&&q.kind!=='rotate'&&q.kind!=='shade'?'has-fig':''}">${hasFig?`<div class="fig">${fig}</div>`:''}<div>${ans}</div></div>
   <div class="actions"><button class="btn primary" data-check>Kiểm tra câu này</button></div><div class="fb" data-fb></div>`;
  // restore state
  if(q.kind==='blanks'&&q.user)$$('.blank',el).forEach((inp,k)=>inp.value=q.user[k]||'');
  if(q.kind==='choice'&&q.sel!=null)$(`[data-c="${q.sel}"]`,el).setAttribute('aria-pressed','true');
  if(q.kind==='shade'){q.on.forEach(k=>$(`[data-i="${k}"]`,el).classList.add('on'));$('[data-cnt]',el).textContent=q.on.length}
  bindCard(el,q,i);if(q.status!=='open')lockCard(el,q,true);return el;
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
  if(q.status!=='open')return;let ok=false,empty=false;
  if(q.kind==='blanks'){const inputs=$$('.blank',el);q.user=inputs.map(x=>x.value);if(inputs.some(x=>x.value.trim()===''))empty=true;else{
    const groups=[];inputs.forEach(x=>{const k=+x.dataset.b;(groups[k]=groups[k]||[]).push(x)});
    const res=groups.map((g,k)=>{const spec=q.ans[k];return g.length===2?matchFrac(g[0].value,g[1].value,spec):matchOne(g[0].value,spec)});
    if(q.sameDen&&res.every(Boolean)){const d=groups.map(g=>+norm(g[1].value));if(new Set(d).size>1)res.fill(false)}
    ok=res.every(Boolean);groups.forEach((g,k)=>g.forEach(x=>x.classList.toggle('wrong',!res[k])))}}
  else if(q.kind==='choice'){if(q.sel==null)empty=true;else{ok=q.sel===q.correct;if(!ok)$(`[data-c="${q.sel}"]`,el).classList.add('wrong')}}
  else if(q.kind==='rotate')ok=q.val===q.target;
  else if(q.kind==='shade'){if(!q.on.length)empty=true;else ok=q.on.length*q.den===q.num*q.n}
  if(empty){fb(el,'note','Con chưa làm xong',q.kind==='choice'?'Hãy chọn một đáp án trước nhé.':q.kind==='shade'?'Hãy chạm vào hình để tô màu.':'Con điền đủ các ô trống nhé.');return}
  if(ok){q.status='ok';q.pts=q.tries===0?1:.5;fb(el,'ok',pick(PRAISE),q.tries?`<div>${q.sol}</div>`:'');lockCard(el,q)}
  else{q.tries++;if(q.tries===1)fb(el,'hint','Chưa đúng rồi, thử lại nhé!',`<div>💡 Gợi ý: ${q.hint}</div>`);else{q.status='fail';q.pts=0;fb(el,'sol','Mình cùng xem lời giải nhé',`<div>${q.sol}</div>`);lockCard(el,q)}}
  updateProgress();
}
function lockCard(el,q,restore){el.classList.add(q.status==='ok'?'ok':'fail');$('[data-check]',el).disabled=true;$('[data-swap]',el).hidden=true;
  $$('.blank',el).forEach(x=>{x.disabled=true;if(q.status==='ok')x.classList.add('right')});$$('[data-c],[data-rot]',el).forEach(b=>b.disabled=true);
  if(q.kind==='choice'){$(`[data-c="${q.correct}"]`,el).classList.add('right')}
  if(restore){q.status==='ok'?fb(el,'ok','Đúng rồi!',''):fb(el,'sol','Lời giải',`<div>${q.sol}</div>`)}}
function updateProgress(){const n=S.qs.length,done=S.qs.filter(q=>q.status!=='open').length,pts=S.qs.reduce((s,q)=>s+(q.pts||0),0);
  $('#pbar').style.width=(done/n*100)+'%';$('#ptxt').textContent=`Đã làm ${done}/${n} câu`;$('#pscore').textContent=`Điểm: ${fmtPts(pts)}/${n}`;
  const sum=$('#sum');if(done<n){sum.innerHTML='';return}
  const r=pts/n,st=r>=.9?3:r>=.7?2:r>=.4?1:0,k=bestKey(S.lesson.id,S.lv),prev=store.get(k)||0;if(st>prev)store.set(k,st);
  const msg=st===3?'Con làm rất giỏi!':st===2?'Làm tốt lắm, cố thêm chút nữa nhé!':st===1?'Con đã cố gắng! Làm thêm bộ mới nhé.':'Không sao cả, mình luyện thêm nhé!';
  sum.innerHTML=`<div class="card summary"><div>${starsHTML(st)}</div><h3>${msg}</h3><p class="lead" style="margin:0">Điểm của con: <b>${fmtPts(pts)}/${n}</b> (đúng ngay lần đầu được 1 điểm, đúng lần hai được ½ điểm).</p>
   <div class="row" style="justify-content:center;margin-top:14px">${S.lv<3&&st>=2?`<button class="btn primary" id="upLv">Lên ${LEVELS[S.lv].n} →</button>`:''}<button class="btn" id="again">↻ Làm bộ mới</button></div></div>`;
  $('#again').onclick=()=>{genSet();renderQs();scrollTo({top:$('#qs').offsetTop-120,behavior:'smooth'})};const up=$('#upLv');if(up)up.onclick=()=>location.hash=lessonHref(S.lesson,S.lv+1);
  $$('.lvl .stars').forEach((s,i)=>s.outerHTML=starsHTML(store.get(bestKey(S.lesson.id,i+1))||0));
  if(!updateProgress._t||updateProgress._t!==S.qs)toast(`Hoàn thành! ${'⭐'.repeat(st)||'💪'}`);updateProgress._t=S.qs;
}
const fmtPts=p=>Number.isInteger(p)?p:String(p).replace('.',',');
let tT;function toast(m){const t=$('#toast');t.textContent=m;t.classList.add('show');clearTimeout(tT);tT=setTimeout(()=>t.classList.remove('show'),1800)}

/* ---------- Điều hướng: #/  ·  #/lop4  ·  #/lop4/bai/ma-bai/2 ---------- */
function route(){
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
(function init(){const th=store.get('hoctap:theme');if(th)document.documentElement.dataset.theme=th;$('#author').textContent=CONFIG.author;$('#brand').innerHTML=CONFIG.brandHTML||CONFIG.siteName;
  loadGrades(CONFIG.grades,()=>{App.grades.sort((a,b)=>CONFIG.grades.indexOf(a.id)-CONFIG.grades.indexOf(b.id));addEventListener('hashchange',route);route()})})();
