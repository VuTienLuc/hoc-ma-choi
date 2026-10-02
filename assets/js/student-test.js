/* =====================================================================
   STUDENT TEST – bài kiểm tra tương tác ba phần cho học sinh.
   Tệp dữ liệu gọi StudentTest.add({...}); engine dùng tiles() và route().
   - Phần I: trắc nghiệm 4 phương án.
   - Phần II: đúng/sai, mỗi câu 4 ý; chấm 0,1 / 0,25 / 0,5 / 1 điểm.
   - Phần III: trả lời ngắn, mỗi câu 0,5 điểm.
   ===================================================================== */
const StudentTest = (() => {
  const TESTS = [], ABCD = 'ABCD'; let timer = null;
  const add = t => TESTS.push(t);
  const find = (grade, id) => TESTS.find(t => t.grade === grade && t.id === id);
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const make = (x, ci) => typeof x === 'function' ? x(ci) : {...x};
  const round = (x, n=2) => Math.round((x + Number.EPSILON) * 10**n) / 10**n;
  const vn = x => String(x).replace('.', ',');
  const stateKey = t => `hoctap:test:${t.grade}:${t.id}:state`;
  const metaKey = t => `hoctap:test:${t.grade}:${t.id}:meta`;
  const starKey = t => `hoctap:${t.grade}:kiem-tra-${t.id}:1`;
  const meta = t => Object.assign({attempts:0,best:0,bestStars:0}, store.get(metaKey(t)) || {});
  const typeset = el => { try{ if(window.MathJax && MathJax.typesetPromise) MathJax.typesetPromise(el ? [el] : undefined); }catch(e){} };

  function build(t, ci){
    const mc = t.mc.map((x, i) => { const q = make(x, ci), pos = (i + ci) % 4, opts = q.opts.slice(1); opts.splice(pos, 0, q.opts[0]); return {...q, opts, a:pos}; });
    const tf = t.tf.map(x => make(x, ci));
    const short = t.short.map(x => make(x, ci));
    return {code:t.codes[ci], ci, mc, tf, short};
  }
  function maxStars(grade){ return TESTS.filter(t => t.grade === grade).length * 3; }
  function stars(grade){ return TESTS.filter(t => t.grade === grade).reduce((n, t) => n + (Number(store.get(starKey(t))) || 0), 0); }
  function tiles(grade, topic){
    return TESTS.filter(t => t.grade === grade && t.topic === topic).map(t => { const m = meta(t), st = Number(store.get(starKey(t))) || 0;
      return `<a class="tile test-tile" href="#/${t.grade}/kiem-tra/${t.id}"><b>📝 ${esc(t.title)}</b><span>${t.time} phút · ${t.mc.length} câu chọn đáp án · ${t.tf.length} câu đúng–sai · ${t.short.length} câu trả lời ngắn</span><span class="meta"><span>${m.attempts ? `Đã làm ${m.attempts} lần · Cao nhất ${vn(m.best)}/10` : 'Chưa làm bài'}</span>${starsHTML(st)}</span></a>`;
    }).join('');
  }
  function blankState(t, ci, attempts){
    const q = build(t, ci); return {v:1, code:q.code, ci, startedAt:Date.now(), endsAt:Date.now()+t.time*60000,
      mc:Array(q.mc.length).fill(null), tf:q.tf.map(x => Array(x.items.length).fill(null)), short:Array(q.short.length).fill(''), submitted:false, rewarded:false, attempts};
  }
  function userBar(){ return typeof Account !== 'undefined' && Account.userBar ? Account.userBar() : ''; }
  function shell(t, g, body){
    document.title = `${t.title} – ${g.name}`;
    $('#app').innerHTML = `${userBar()}<div class="toolbar"><a class="back" href="#/${g.id}">← Các bài ${g.name}</a>${themeBtn()}</div>${body}${foot()}`;
    bindTheme(); if(typeof Account !== 'undefined' && Account.bindLogout) Account.bindLogout(); typeset($('#app'));
  }
  function intro(t, g){
    const m = meta(t), old = store.get(stateKey(t));
    if(old && old.submitted) return result(t, g, old);
    if(old && !old.submitted) return exam(t, g, old);
    const chapter = typeof roman === 'function' ? roman(t.topic) : t.topic;
    const lead = t.lead || (t.grade === 'lop9' ? 'Định dạng ba phần theo hướng đánh giá năng lực, nội dung từ cơ bản đến nâng cao dành cho tuyển sinh lớp 10.' : 'Định dạng ba phần theo hướng đánh giá năng lực, nội dung được sắp xếp từ cơ bản đến nâng cao.');
    shell(t, g, `<section class="card test-intro"><span class="pill">KIỂM TRA CHƯƠNG ${chapter}</span><h1>${esc(t.title)}</h1>
      <p class="lead">${esc(lead)}</p>
      <div class="test-facts"><span>⏱️ <b>${t.time} phút</b></span><span>🔘 <b>${t.mc.length}</b> câu chọn đáp án</span><span>✅ <b>${t.tf.length}</b> câu đúng–sai</span><span>⌨️ <b>${t.short.length}</b> câu trả lời ngắn</span></div>
      <div class="test-rules"><h3>Quy định làm bài</h3><ul><li>Không có gợi ý và không hiện đáp án trước khi nộp bài.</li><li>Bài được lưu tự động trên thiết bị; tải lại trang vẫn tiếp tục đúng mã đề và thời gian còn lại.</li><li>Câu đúng–sai chấm theo số ý đúng; điểm thô tối đa 9 và được quy đổi về thang 10.</li><li>Sau khi nộp, em được xem đáp án và lời giải chi tiết từng bước.</li></ul></div>
      ${m.attempts ? `<p class="test-best">Kết quả tốt nhất: <b>${vn(m.best)}/10</b> · ${starsHTML(m.bestStars)}</p>` : ''}
      <button class="btn primary big" id="testStart">Bắt đầu làm bài</button></section>`);
    $('#testStart').onclick = () => { const mm = meta(t), ci = mm.attempts % t.codes.length, s = blankState(t, ci, mm.attempts + 1); mm.attempts++; store.set(metaKey(t), mm); store.set(stateKey(t), s); exam(t, g, s); };
  }
  const countAnswered = s => s.mc.filter(x => x != null).length + s.tf.flat().filter(x => x != null).length + s.short.filter(x => String(x).trim()).length;
  const totalCommands = q => q.mc.length + q.tf.reduce((n,x)=>n+x.items.length,0) + q.short.length;
  function navHTML(q, s){
    const one = (id, label, done) => `<a href="#${id}" class="test-nav-q ${done?'done':''}" data-jump="${id}">${label}</a>`;
    return `<nav class="test-nav card" aria-label="Danh sách câu hỏi"><b>Đi đến câu</b><div><span>Phần I</span>${q.mc.map((_,i)=>one(`mc${i+1}`,i+1,s.mc[i]!=null)).join('')}</div>
      <div><span>Phần II</span>${q.tf.map((x,i)=>one(`tf${i+1}`,i+1,s.tf[i].every(v=>v!=null))).join('')}</div>
      <div><span>Phần III</span>${q.short.map((_,i)=>one(`sr${i+1}`,i+1,String(s.short[i]).trim())).join('')}</div></nav>`;
  }
  function exam(t, g, s){
    clearInterval(timer); const q = build(t, s.ci), answered = countAnswered(s), total = totalCommands(q);
    const mc = q.mc.map((x,i)=>`<article class="card test-q" id="mc${i+1}"><div class="qhead"><span class="badge">Câu ${i+1}</span><span class="chip">${esc(x.level||'Nhận biết')}</span></div><div class="qtext">${x.q}</div><div class="test-options">${x.opts.map((o,k)=>`<button data-mc="${i}" data-v="${k}" aria-pressed="${s.mc[i]===k}"><b>${ABCD[k]}.</b> ${o}</button>`).join('')}</div></article>`).join('');
    const tf = q.tf.map((x,i)=>`<article class="card test-q" id="tf${i+1}"><div class="qhead"><span class="badge">Câu ${i+1}</span><span class="chip">Đúng–sai</span></div><div class="qtext">${x.stem}</div><div class="test-tf">${x.items.map((it,k)=>`<div><span><b>${'abcd'[k]})</b> ${it.text}</span><span class="tf-buttons"><button data-tf="${i}" data-it="${k}" data-v="1" aria-pressed="${s.tf[i][k]===true}">Đúng</button><button data-tf="${i}" data-it="${k}" data-v="0" aria-pressed="${s.tf[i][k]===false}">Sai</button></span></div>`).join('')}</div></article>`).join('');
    const sh = q.short.map((x,i)=>`<article class="card test-q" id="sr${i+1}"><div class="qhead"><span class="badge">Câu ${i+1}</span><span class="chip">Trả lời ngắn</span></div><div class="qtext">${x.q}</div><label class="test-short">Đáp án <input data-short="${i}" value="${esc(s.short[i])}" inputmode="decimal" autocomplete="off" aria-label="Đáp án câu ${i+1} phần III"></label></article>`).join('');
    shell(t, g, `<div class="test-head card"><div><small>MÃ ĐỀ</small><b>${s.code}</b></div><div><small>ĐÃ TRẢ LỜI</small><b id="testCount">${answered}/${total}</b></div><div class="test-clock" id="testClock" aria-live="polite">60:00</div></div>${navHTML(q,s)}
      <section class="test-part"><h2>Phần I. Trắc nghiệm nhiều phương án lựa chọn</h2><p>Mỗi câu chỉ chọn một phương án. Mỗi câu đúng được 0,25 điểm.</p>${mc}</section>
      <section class="test-part"><h2>Phần II. Trắc nghiệm đúng–sai</h2><p>Với mỗi ý a), b), c), d), em chọn Đúng hoặc Sai.</p>${tf}</section>
      <section class="test-part"><h2>Phần III. Trắc nghiệm trả lời ngắn</h2><p>Nhập kết quả cuối cùng. Có thể dùng dấu phẩy hoặc dấu chấm cho số thập phân.</p>${sh}</section>
      <section class="card test-submit"><p>Bài làm được lưu tự động. Hãy kiểm tra các câu còn trống trước khi nộp.</p><button class="btn primary big" id="testSubmit">Nộp bài</button></section>`);
    const save = () => { store.set(stateKey(t), s); $('#testCount').textContent = `${countAnswered(s)}/${total}`; refreshNav(q,s); };
    $$('[data-mc]').forEach(b=>b.onclick=()=>{const i=+b.dataset.mc;s.mc[i]=+b.dataset.v;$$(`[data-mc="${i}"]`).forEach(x=>x.setAttribute('aria-pressed',x===b));save()});
    $$('[data-tf]').forEach(b=>b.onclick=()=>{const i=+b.dataset.tf,k=+b.dataset.it;s.tf[i][k]=b.dataset.v==='1';$$(`[data-tf="${i}"][data-it="${k}"]`).forEach(x=>x.setAttribute('aria-pressed',x===b));save()});
    $$('[data-short]').forEach(inp=>inp.oninput=()=>{s.short[+inp.dataset.short]=inp.value;save()});
    $$('[data-jump]').forEach(a=>a.onclick=e=>{e.preventDefault();document.getElementById(a.dataset.jump).scrollIntoView({behavior:'smooth',block:'start'})});
    $('#testSubmit').onclick=()=>submit(t,g,s,q,false);
    const tick=()=>{const left=Math.max(0,s.endsAt-Date.now()), sec=Math.ceil(left/1000), el=$('#testClock');if(!el)return clearInterval(timer);el.textContent=`${String(Math.floor(sec/60)).padStart(2,'0')}:${String(sec%60).padStart(2,'0')}`;el.classList.toggle('urgent',sec<=300);if(left<=0){clearInterval(timer);submit(t,g,s,q,true)}}; tick();timer=setInterval(tick,1000);
  }
  function refreshNav(q,s){
    q.mc.forEach((_,i)=>{const a=$(`[data-jump="mc${i+1}"]`);if(a)a.classList.toggle('done',s.mc[i]!=null)});
    q.tf.forEach((_,i)=>{const a=$(`[data-jump="tf${i+1}"]`);if(a)a.classList.toggle('done',s.tf[i].every(v=>v!=null))});
    q.short.forEach((_,i)=>{const a=$(`[data-jump="sr${i+1}"]`);if(a)a.classList.toggle('done',!!String(s.short[i]).trim())});
  }
  function shortOK(value, ans){ return typeof matchOne === 'function' ? matchOne(value, ans) : String(value).trim() === String(ans); }
  function grade(q,s){
    const mcOK=q.mc.map((x,i)=>s.mc[i]===x.a), mcPts=mcOK.filter(Boolean).length*.25;
    const tfOK=q.tf.map((x,i)=>x.items.map((it,k)=>s.tf[i][k]===it.ok)), tfCount=tfOK.map(a=>a.filter(Boolean).length), scale=[0,.1,.25,.5,1], tfPts=tfCount.reduce((n,k)=>n+scale[k],0);
    const shortOKs=q.short.map((x,i)=>shortOK(s.short[i],x.ans)), shortPts=shortOKs.filter(Boolean).length*.5;
    const raw=round(mcPts+tfPts+shortPts), score=round(raw*10/9,1), st=score>=8.5?3:score>=7?2:score>=5?1:0;
    return {mcOK,mcPts,tfOK,tfCount,tfPts,shortOK:shortOKs,shortPts,raw,score,stars:st};
  }
  function submit(t,g,s,q,auto){
    const missing=totalCommands(q)-countAnswered(s);if(!auto&&missing&&!confirm(`Em còn ${missing} ý hoặc câu chưa trả lời. Em vẫn muốn nộp bài?`))return;
    clearInterval(timer);s.submitted=true;s.submittedAt=Date.now();s.result=grade(q,s);store.set(stateKey(t),s);
    const m=meta(t);if(s.result.score>m.best)m.best=s.result.score;if(s.result.stars>m.bestStars)m.bestStars=s.result.stars;store.set(metaKey(t),m);
    const prev=Number(store.get(starKey(t)))||0;if(s.result.stars>prev)store.set(starKey(t),s.result.stars);
    if(!s.rewarded){s.rewarded=true;store.set(stateKey(t),s);try{if(typeof Account!=='undefined'&&Account.on)Account.on('done',{g,l:{id:`kiem-tra-${t.id}`,name:t.title},lv:1,st:s.result.stars,pts:s.result.score,n:10})}catch(e){console.error(e)}}
    result(t,g,s,auto?'Hết giờ – hệ thống đã tự nộp bài.':'');
  }
  const mark = ok => `<span class="test-mark ${ok?'ok':'bad'}">${ok?'✓ Đúng':'✗ Chưa đúng'}</span>`;
  function result(t,g,s,note=''){
    clearInterval(timer);const q=build(t,s.ci),r=s.result||grade(q,s),used=Math.max(0,(s.submittedAt||Date.now())-s.startedAt),mins=Math.floor(used/60000),secs=Math.floor(used/1000)%60;
    const mc=q.mc.map((x,i)=>`<article class="card test-review ${r.mcOK[i]?'ok':'bad'}"><h3>Câu ${i+1}. ${mark(r.mcOK[i])}</h3><div class="qtext">${x.q}</div><p>Em chọn: <b>${s.mc[i]==null?'Chưa trả lời':ABCD[s.mc[i]]}</b> · Đáp án: <b>${ABCD[x.a]}</b></p><div class="test-solution"><b>Lời giải</b>${x.sol}</div></article>`).join('');
    const tf=q.tf.map((x,i)=>`<article class="card test-review"><h3>Câu ${i+1}. Đúng ${r.tfCount[i]}/4 ý · ${vn([0,.1,.25,.5,1][r.tfCount[i]])} điểm</h3><div class="qtext">${x.stem}</div>${x.items.map((it,k)=>`<div class="review-tf ${r.tfOK[i][k]?'ok':'bad'}"><p><b>${'abcd'[k]})</b> ${it.text}</p><small>Em chọn: ${s.tf[i][k]==null?'chưa trả lời':s.tf[i][k]?'Đúng':'Sai'} · Đáp án: <b>${it.ok?'Đúng':'Sai'}</b></small><div>${it.sol}</div></div>`).join('')}</article>`).join('');
    const sh=q.short.map((x,i)=>`<article class="card test-review ${r.shortOK[i]?'ok':'bad'}"><h3>Câu ${i+1}. ${mark(r.shortOK[i])}</h3><div class="qtext">${x.q}</div><p>Em trả lời: <b>${esc(s.short[i]||'Chưa trả lời')}</b> · Đáp án: <b>${esc(Array.isArray(x.ans)?x.ans[0]:x.ans)}</b></p><div class="test-solution"><b>Lời giải</b>${x.sol}</div></article>`).join('');
    shell(t,g,`${note?`<div class="fb show note test-timeout">${note}</div>`:''}<section class="card test-result"><span class="pill">KẾT QUẢ MÃ ${s.code}</span><div class="result-score"><b>${vn(r.score)}</b><span>/10</span></div>${starsHTML(r.stars)}<h1>${r.score>=8.5?'Xuất sắc!':r.score>=7?'Làm tốt lắm!':r.score>=5?'Em đã đạt yêu cầu':'Em cần ôn lại một số dạng'}</h1><div class="result-parts"><span>Phần I <b>${vn(r.mcPts)}/3</b></span><span>Phần II <b>${vn(r.tfPts)}/3</b></span><span>Phần III <b>${vn(r.shortPts)}/3</b></span><span>Thời gian <b>${mins}:${String(secs).padStart(2,'0')}</b></span></div><p>Điểm thô ${vn(r.raw)}/9 được quy đổi về thang 10.</p><div class="row"><button class="btn primary" id="testAgain">Làm mã đề khác</button><a class="btn" href="#/${g.id}">Về danh sách bài</a></div></section>
      <section class="test-part test-review-part"><h2>Phần I – Đáp án và lời giải</h2>${mc}</section><section class="test-part test-review-part"><h2>Phần II – Đáp án và lời giải</h2>${tf}</section><section class="test-part test-review-part"><h2>Phần III – Đáp án và lời giải</h2>${sh}</section>`);
    $('#testAgain').onclick=()=>{if(confirm('Bắt đầu mã đề mới? Kết quả tốt nhất vẫn được giữ lại.')){store.set(stateKey(t),null);intro(t,g)}};
  }
  function route(){
    clearInterval(timer);timer=null;const m=location.hash.match(/^#\/(lop\d+)\/kiem-tra\/([\w-]+)$/);if(!m)return false;
    const t=find(m[1],m[2]),g=App.grades.find(x=>x.id===m[1]);if(!t||!g)return false;intro(t,g);scrollTo(0,0);return true;
  }
  return {add,find,build,tiles,route,stars,maxStars,TESTS};
})();
