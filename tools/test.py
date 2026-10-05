"""Kiểm thử tự động: máy tự làm mọi câu của mọi bài × 3 mức và yêu cầu tất cả được chấm ĐÚNG.
Chạy:  python3 tools/test.py            (kiểm tra các lớp trong config.js + file mẫu)
Cần:   pip install playwright  &&  playwright install chromium   (trên máy cá nhân)
"""
import asyncio, pathlib, sys
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
    ok = not r['bad'] and not r['errs'] and not errs
    print('KẾT QUẢ:', 'ĐẠT ✓' if ok else f"CHƯA ĐẠT ✗ ({len(r['bad'])} câu lỗi)")
    await b.close(); sys.exit(0 if ok else 1)
asyncio.run(main())
