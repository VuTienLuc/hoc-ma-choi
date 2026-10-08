"""Kiểm thử tự động: máy tự làm mọi câu của mọi bài × 3 mức và yêu cầu tất cả được chấm ĐÚNG.
Chạy:  python3 tools/test.py            (kiểm tra các lớp trong config.js + file mẫu)
Cần:   pip install playwright  &&  playwright install chromium   (trên máy cá nhân)
"""
import asyncio, json, pathlib, sys
from playwright.async_api import async_playwright
ROOT = pathlib.Path(__file__).resolve().parent.parent
REPS = int(sys.argv[1]) if len(sys.argv) > 1 else 10
JS = r"""
async (REPS) => {
 const out={errs:[],bad:[],count:0,grades:[],studentTest:false,game:false};
 for(const g of App.grades){ out.grades.push(g.id+':'+g.lessons.length);
  for(const l of g.lessons){ for(const lv of [1,2,3]){ for(let rep=0;rep<REPS;rep++){
   S.grade=g; S.lesson=l; S.lv=lv; renderLesson(); genSet(); renderQs();
   const cards=[...document.querySelectorAll('#qs .card')];
   S.qs.forEach((q,i)=>{ out.count++; const el=cards[i]; const where=[g.id,l.id,lv];
     const stx=q.kind==='steps'?q.steps.map(s=>s.ask+(s.tpl||'')+(s.opts||[]).join('|')+(s.hint||'')).join('|'):'';
     if(/NaN|undefined|Infinity|null/.test((q.text||'')+(q.tpl||'')+(q.expr||'')+q.sol+q.hint+stx)) out.bad.push(['text',...where,q.text,q.tpl]);
     if(q.kind==='steps') q.steps.forEach(s=>{ if(s.kind==='choice'&&(s.correct<0||s.opts.length<3)) out.bad.push(['bước: phương án lỗi',...where,s.ask,s.opts]);
       if(s.kind==='blanks'&&(s.tpl.match(/\[_\]/g)||[]).length!==s.ans.length) out.bad.push(['bước: số ô ≠ số đáp án',...where,s.tpl]); });
     if(!q.hint||!q.sol) out.bad.push(['thiếu hint/sol',...where]);
     try{
     if(q.kind==='blanks'){ const ins=[...el.querySelectorAll('.blank')]; let j=0;
       q.ans.forEach(sp=>{ if(sp&&sp.frac){let[n,d]=sp.frac; if(sp.mode==='simplest'){const k=gcd(n,d);n/=k;d/=k} ins[j++].value=n; ins[j++].value=d;}
         else { const v=Array.isArray(sp)?sp[0]:sp; ins[j++].value=String(v);} });
       if(q.sameDen){const d1=q.ans[0].frac[1],d2=q.ans[1].frac[1],M=lcm(d1,d2);ins[0].value=q.ans[0].frac[0]*M/d1;ins[1].value=M;ins[2].value=q.ans[1].frac[0]*M/d2;ins[3].value=M}
       if(j!==ins.length) out.bad.push(['số ô ≠ số đáp án',...where,q.tpl]);
     } else if(q.kind==='choice'){ if(q.correct<0||q.opts.length<2) out.bad.push(['phương án lỗi',...where,q.text]); el.querySelector(`[data-c="${q.correct}"]`).click(); }
     else if(q.kind==='rotate'){ setRot(el,q,q.target); }
     else if(q.kind==='steps'){ let g=0; while(q.status==='open'&&g++<20){ const k=q.guided?q.cur:q.steps.length-1, s=q.steps[k], li=el.querySelector(`[data-s="${k}"]`);
         if(s.kind==='choice') li.querySelector(`[data-sc="${s.correct}"]`).click(); else s.ans.forEach((a,j)=>li.querySelectorAll('.blank')[j].value=String(Array.isArray(a)?a[0]:a));
         el.querySelector('[data-check]').click(); }
       if(q.pts!==1) out.bad.push(['bước: làm đúng hết mà không được 1 điểm',...where,q.text]); return; }
     else if(q.kind==='shade'){ const need=q.num*q.n/q.den; [...el.querySelectorAll('.sv-part')].slice(0,need).forEach(p=>p.dispatchEvent(new MouseEvent('click'))); }
     el.querySelector('[data-check]').click();
     if(!el.classList.contains('ok')) out.bad.push(['chấm SAI',...where,q.text,q.tpl,JSON.stringify(q.ans)]);
     }catch(e){out.errs.push([...where,String(e)])}
   });
 }}}}
 if(typeof StudentTest!=='undefined'&&StudentTest.TESTS.length){
  try{
   for(const t of StudentTest.TESTS){
    const stateKey=`hoctap:test:${t.grade}:${t.id}:state`, metaKey=`hoctap:test:${t.grade}:${t.id}:meta`, seen=new Set();
    localStorage.removeItem(metaKey); location.hash=`#/${t.grade}/kiem-tra/${t.id}`;
    for(let attempt=0;attempt<4;attempt++){
     localStorage.removeItem(stateKey); StudentTest.route();
     document.querySelector('#testStart').click();
     const s=store.get(stateKey), q=StudentTest.build(t,s.ci); seen.add(q.code);
     q.mc.forEach((x,i)=>document.querySelector(`[data-mc="${i}"][data-v="${x.a}"]`).click());
     q.tf.forEach((x,i)=>x.items.forEach((it,k)=>document.querySelector(`[data-tf="${i}"][data-it="${k}"][data-v="${it.ok?1:0}"]`).click()));
     q.short.forEach((x,i)=>{const el=document.querySelector(`[data-short="${i}"]`);el.value=Array.isArray(x.ans)?x.ans[0]:x.ans;el.dispatchEvent(new Event('input',{bubbles:true}))});
     document.querySelector('#testSubmit').click();
     const score=document.querySelector('.result-score b');
     if(!score||score.textContent.trim()!=='10')out.bad.push(['bài kiểm tra học sinh: làm đúng toàn bộ nhưng không được 10 điểm',t.id,q.code,score&&score.textContent]);
     if(document.querySelectorAll('.test-review').length!==q.mc.length+q.tf.length+q.short.length)out.bad.push(['bài kiểm tra học sinh: trang lời giải không đủ câu',t.id,q.code]);
    }
    if(seen.size!==4)out.bad.push(['bài kiểm tra học sinh: chưa luân phiên đủ bốn mã đề',t.id,[...seen]]);
   }
   out.studentTest=true;
  }catch(e){out.errs.push(['bài kiểm tra học sinh',String(e)])}
 }
 if(typeof Game!=='undefined'&&Game.TOPICS.length){
  try{
   for(const t of Game.TOPICS){const qs=Game.build(t.id,'trinh-duyet-'+t.id,20);
    if(qs.length!==20)out.bad.push(['Học mà chơi: không đủ 20 câu',t.id,qs.length]);
    qs.forEach((q,i)=>{if(q.opts.length!==4||new Set(q.opts).size!==4||q.correct<0)out.bad.push(['Học mà chơi: phương án lỗi',t.id,i+1]);});
   }
   const miniGrades=CONFIG.grades;
   for(const grade of miniGrades){
    const g=App.grades.find(x=>x.id===grade),topics=Game.TOPICS.filter(x=>x.grade===grade);
    if(!g||!topics.length){out.bad.push(['Game củng cố: lớp chưa có ngân hàng riêng',grade]);continue}
    S.grade=g;renderHome();
    if(!document.querySelector('a[href="#/game-mini"]'))out.bad.push(['Game củng cố: thiếu menu riêng tại trang lớp',grade]);
    location.hash='#/game-mini';Game.route();
    if(document.querySelectorAll('.mini-game-card').length!==3)out.bad.push(['Game củng cố: menu không đủ ba trò chơi',grade]);
    for(const style of ['fishing','fruit','balloon']){
     location.hash=`#/game-mini/${style}`;Game.route();
     const links=[...document.querySelectorAll('.game-topics a')].map(a=>a.getAttribute('href'));
     if(links.length!==topics.length||links.some(h=>!topics.some(t=>h.endsWith('/'+t.id))))out.bad.push(['Game củng cố: lẫn chủ đề giữa các lớp',grade,style,links]);
     location.hash=`#/game-mini/${style}/${topics[0].id}`;Game.route();document.querySelector('#miniStart').click();await new Promise(ok=>setTimeout(ok,700));
     const buttons=[...document.querySelectorAll('#gameArena [data-mini-o]')];
     if(buttons.length!==4||!document.querySelector('.mini-question'))out.bad.push(['Game củng cố: không dựng đủ câu hỏi và đáp án',grade,style]);
     else if(buttons.some(b=>getComputedStyle(b).animationName==='none'))out.bad.push(['Game củng cố: đáp án chưa chuyển động',grade,style]);
     if(buttons[0]){buttons[0].click();if(!document.querySelector('#miniNext'))out.bad.push(['Game củng cố: không hiện lời giải sau khi chọn',grade,style])}
     const miniExit=document.querySelector('#gameArena [data-exit]');if(miniExit)miniExit.click();
    }
   }
   S.grade=App.grades.find(g=>g.id==='lop9');renderHome();
   if(!document.querySelector('.game-entry'))out.bad.push(['Học mà chơi: thiếu lối vào ở trang lớp 9']);
   location.hash='#/game/game-tiep-tuyen';Game.route();
   if(document.querySelectorAll('[data-mode]').length!==3)out.bad.push(['Học mà chơi: thiếu ba chế độ chơi']);
   document.querySelector('[data-mode="bot"]').click();await new Promise(ok=>setTimeout(ok,1000));
   if(!document.querySelector('#gameArena')||document.querySelectorAll('#gameArena [data-o]').length!==4)out.bad.push(['Học mà chơi: không dựng được màn đấu máy']);
   let exit=document.querySelector('#gameArena [data-exit]');if(exit)exit.click();
   location.hash='#/game/game-tiep-tuyen';Game.route();document.querySelector('[data-mode="duel"]').click();await new Promise(ok=>setTimeout(ok,1000));
   if(document.querySelectorAll('#gameArena [data-o]').length!==8)out.bad.push(['Học mà chơi: màn hai người không đủ hai bộ đáp án']);
   exit=document.querySelector('#gameArena [data-exit]');if(exit)exit.click();
   location.hash='#/game/game-tiep-tuyen';Game.route();document.querySelector('[data-mode="class"]').click();
   if(!document.querySelector('#gjCode')&&!document.querySelector('#gcCreate'))out.bad.push(['Học mà chơi: không mở được phần chơi cả lớp']);
   for(const T of Game.TOPICS){location.hash='#/game/'+T.id;Game.route();const ab=document.querySelector('[data-adventure]');
    if(!ab){out.bad.push(['Phiêu lưu: chủ đề '+T.id+' thiếu lối vào']);continue}
    ab.click();await new Promise(ok=>setTimeout(ok,250));
    for(let i=0;i<9&&document.querySelector('[data-adv-o]');i++){const gate=document.querySelector('.adv-gate');if(gate)gate.click();document.querySelector('[data-adv-o]').click();const nx=document.querySelector('#advNext');if(!nx){out.bad.push(['Phiêu lưu: '+T.id+' không chuyển được cổng',i+1]);break}nx.click()}
    if(!document.querySelector('.adv-result'))out.bad.push(['Phiêu lưu: '+T.id+' không ra trang tổng kết']);
    const ex=document.querySelector('#advExit');if(ex)ex.click()}
   const realNow=Date.now;Date.now=()=>12345;const advQs=Game.build('game-lop10-on-tap-c1','12345-adventure',9);
   const playAdv=async(pickRight)=>{location.hash='#/game/game-lop10-on-tap-c1';Game.route();const adv=document.querySelector('[data-adventure]');
    if(!adv){out.bad.push(['Phiêu lưu Toán 10: thiếu lối vào']);return null}
    adv.click();await new Promise(ok=>setTimeout(ok,300));
    if(!document.querySelector('#gameArena.adventure-bg')||document.querySelectorAll('[data-adv-o]').length!==4){out.bad.push(['Phiêu lưu Toán 10: không dựng được cảnh chạy']);return null}
    if(!document.querySelector('.adv-challenge[hidden]'))out.bad.push(['Phiêu lưu Toán 10: câu hỏi hiện trước khi gặp chướng ngại lớn'])
    let n=0;for(let i=0;i<9&&document.querySelector('[data-adv-o]');i++){const gate=document.querySelector('.adv-gate');if(gate)gate.click();if(document.querySelector('.adv-challenge[hidden]'))out.bad.push(['Phiêu lưu Toán 10: chạm chướng ngại nhưng câu hỏi chưa hiện',i+1]);const q=advQs[i],k=pickRight?q.correct:(q.correct+1)%4;document.querySelector('[data-adv-o="'+k+'"]').click();n++;const next=document.querySelector('#advNext');if(!next){out.bad.push(['Phiêu lưu Toán 10: không chuyển được cổng',i+1]);return null}next.click()}
    return n};
   try{
    const food0=(typeof Play!=='undefined'&&Play.state)?Play.state.food:0,xu0=(typeof Play!=='undefined'&&Play.state)?Play.state.xu:0;
    const nRight=await playAdv(true);
    if(nRight!==null&&(nRight!==9||!document.querySelector('.adv-result-numbers')||/Hết tim/.test(document.querySelector('.adv-result h1').textContent)))out.bad.push(['Phiêu lưu Toán 10: trả lời đúng hết mà không về trang tổng kết thắng']);
    if(nRight===9){const sk='hoctap:lop10:game-game-lop10-on-tap-c1:1';if(store.get(sk)!==3)out.bad.push(['Phiêu lưu Toán 10: đúng hết 9 cổng mà chưa được 3 sao vào xếp hạng',store.get(sk)]);
     if(typeof Play!=='undefined'&&Play.state&&(Play.state.food!==food0+3||Play.state.xu!==xu0+5))out.bad.push(['Phiêu lưu: sao trò chơi chưa thưởng đúng 3 🍖 + 5 🪙 cho thú cưng',Play.state.food-food0,Play.state.xu-xu0]);
     if(!document.querySelector('.game-stars'))out.bad.push(['Phiêu lưu Toán 10: thiếu dòng sao trên trang tổng kết']);
     const g10=App.grades.find(x=>x.id==='lop10');if(g10&&typeof Game.stars==='function'&&Game.stars('lop10')<3)out.bad.push(['Sao trò chơi không được cộng vào Game.stars']);
     if(g10&&gradeStars(g10)<3)out.bad.push(['Sao trò chơi không được cộng vào gradeStars']);store.set(sk,0)}
    const exit1=document.querySelector('#advExit');if(exit1)exit1.click();
    const nWrong=await playAdv(false);
    if(nWrong!==null){if(nWrong!==3)out.bad.push(['Phiêu lưu Toán 10: sai 3 câu mà chưa hết tim (số cổng đã chơi)',nWrong]);
     const h=document.querySelector('.adv-result h1');if(!h||!/Hết tim/.test(h.textContent)||document.querySelectorAll('.adv-review article').length!==3)out.bad.push(['Phiêu lưu Toán 10: hết tim nhưng không vào phòng luyện đủ 3 câu sai']);
     const retry=document.querySelector('#advRetry');if(!retry)out.bad.push(['Phiêu lưu Toán 10: thiếu nút Luyện lại câu sai']);else{retry.click();await new Promise(ok=>setTimeout(ok,300));
      for(let i=0;i<3&&document.querySelector('[data-adv-o]');i++){const gate=document.querySelector('.adv-gate');if(gate)gate.click();document.querySelector('[data-adv-o="'+((advQs[i].correct+1)%4)+'"]').click();const nx=document.querySelector('#advNext');if(nx)nx.click()}
      if(!document.querySelector('.adv-result'))out.bad.push(['Phiêu lưu Toán 10: phòng luyện lại không kết thúc bình thường'])}}
   }finally{Date.now=realNow}
   location.hash='#/game/game-lop10-on-tap-c1';Game.route();
   const race=document.querySelector('[data-race]');
   if(!race)out.bad.push(['Đường đua Toán học: thiếu lối vào ở chủ đề Toán 10']);
   else{race.click();await new Promise(ok=>setTimeout(ok,300));
    if(!document.querySelector('#gameArena.race-bg')||document.querySelectorAll('[data-race-car]').length!==4||document.querySelectorAll('[data-race-o]').length!==4)out.bad.push(['Đường đua Toán học: không dựng đủ đường đua, bốn xe và bốn đáp án']);
    for(let i=0;i<10&&document.querySelector('[data-race-o]');i++){document.querySelector('[data-race-o]').click();const nx=document.querySelector('#raceNext');if(!nx){out.bad.push(['Đường đua Toán học: không chuyển được vòng',i+1]);break}nx.click()}
    if(!document.querySelector('.race-result')||document.querySelectorAll('.race-podium>div').length!==4)out.bad.push(['Đường đua Toán học: thiếu trang về đích hoặc bảng xếp hạng bốn xe']);
    const rex=document.querySelector('#raceExit');if(rex)rex.click()}
   out.game=true;
  }catch(e){out.errs.push(['Học mà chơi',String(e)])}
 }
 return out;
}
"""
async def main():
  async with async_playwright() as p:
    b = await p.chromium.launch()
    pg = await b.new_page(viewport={'width':820,'height':1180}, has_touch=True)
    errs=[]; pg.on('pageerror', lambda e: errs.append(str(e)))
    await pg.goto((ROOT/'index.html').as_uri()); await pg.wait_for_timeout(600)
    await pg.add_script_tag(path=str(ROOT/'data'/'_mau-lop-moi.js'))   # kiểm tra luôn file mẫu
    r = await pg.evaluate(JS, REPS)
    print('Các lớp:', ', '.join(r['grades']), '| Số câu đã thử:', r['count'], '| Bài kiểm tra học sinh:', 'đã thử' if r['studentTest'] else 'chưa thử', '| Học mà chơi:', 'đã thử' if r['game'] else 'chưa thử')
    for x in r['bad'][:20]: print('  ✗', x)
    for x in r['errs'][:10]: print('  ! lỗi JS', x)
    for x in errs[:5]: print('  ! lỗi trang', x)
    static_bad=[]
    game_src=(ROOT/'assets/js/game.js').read_text()
    for token in ["gameMode==='race'",'drawClassRace','classRaceTrackHTML','studentRaceBody','slice(0,8)','concat([sorted[place-1]])']:
      if token not in game_src: static_bad.append('Đường đua cả lớp thiếu '+token)
    rules=json.loads((ROOT/'firebase-database.rules.json').read_text())['rules']['rooms']['$code']
    meta_rule=rules['meta']['.validate']; player_rule=rules['players']['$uid']['.validate']
    if "val() >= 10" not in meta_rule or "gameMode" not in meta_rule: static_bad.append('Firebase Rules chưa cho phép phòng đua 10 vòng')
    if any(x not in player_rule for x in ['distance','combo','energy','nitro']): static_bad.append('Firebase Rules thiếu kiểm tra trạng thái xe')
    for x in static_bad: print('  ✗',x)
    ok = not r['bad'] and not r['errs'] and not errs and not static_bad
    print('KẾT QUẢ:', 'ĐẠT ✓' if ok else f"CHƯA ĐẠT ✗ ({len(r['bad'])+len(static_bad)} lỗi)")
    await b.close(); sys.exit(0 if ok else 1)
asyncio.run(main())
