"""Kiểm tra công thức LaTeX/MathJax: mở mọi bài của các lớp dùng LaTeX, hiện cả gợi ý và lời giải,
báo trang nào có công thức lỗi (mjx-merror) hoặc còn sót mã LaTeX chưa được vẽ.
Chạy:  python3 tools/test_congthuc.py [số bộ mỗi mức, mặc định 2]
"""
import threading, http.server, functools, socketserver, pathlib, sys
ROOT=pathlib.Path(__file__).resolve().parent.parent
REPS=int(sys.argv[1]) if len(sys.argv)>1 else 2
H=functools.partial(http.server.SimpleHTTPRequestHandler, directory=str(ROOT)); H.log_message=lambda *a:None
srv=socketserver.TCPServer(('127.0.0.1',0),H); PORT=srv.server_address[1]
threading.Thread(target=srv.serve_forever,daemon=True).start()
import asyncio, json
from playwright.async_api import async_playwright
async def main():
  async with async_playwright() as p:
    b=await p.chromium.launch(); pg=await b.new_page(viewport={'width':820,'height':1180})
    errs=[]; pg.on('pageerror',lambda e: errs.append(str(e)))
    async def cfg(route):
        r=await route.fetch(); t=(await r.text()).replace("sheetAPI: 'https","sheetAPI: '', _x: 'https"); await route.fulfill(response=r, body=t)
    await pg.route('**/config.js', cfg)
    await pg.goto(f'http://127.0.0.1:{PORT}/index.html#/'); await pg.wait_for_timeout(2000)
    lessons=await pg.evaluate("App.grades.filter(g=>!['lop4','lop3'].includes(g.id)).flatMap(g=>g.lessons.map(l=>g.id+'/bai/'+l.id))")
    bad=[]; tot=0
    for L in lessons:
      for lv in [1,2,3]:
        for rep in range(REPS):
          await pg.evaluate(f"location.hash='#/{L}/{lv}'"); 
          if rep: await pg.evaluate("document.getElementById('newSet').click()")
          await pg.wait_for_timeout(700)
          # mở lời giải + gợi ý: làm sai 2 lần mọi câu để hiện sol
          await pg.evaluate("""()=>{const cards=[...document.querySelectorAll('#qs .card')];S.qs.forEach((q,i)=>{const el=cards[i];
             if(q.kind==='blanks'){el.querySelectorAll('.blank').forEach(x=>x.value='987654')} else {const w=[...el.querySelectorAll('[data-c]')].find(x=>+x.dataset.c!==q.correct); if(w) w.click();}
             el.querySelector('[data-check]').click(); el.querySelector('[data-check]')&&el.querySelector('[data-check]').click(); if(q.status==='open'){ el.querySelector('[data-check]').click(); }})}""")
          await pg.wait_for_timeout(900)
          r=await pg.evaluate("""(()=>{const app=document.getElementById('app');const walker=document.createTreeWalker(app,NodeFilter.SHOW_TEXT);let raw=[],control=[];let n;while(n=walker.nextNode()){if(n.parentElement.closest('mjx-container'))continue; const t=n.textContent;
             if(/\\\\[\\(\\[]|\\\\(frac|dfrac|sqrt|pi|sin|cos|tan|cot|widehat|cdot|text|left|right|le|ge|lt|gt|approx|perp)\\b/.test(t)) raw.push(t.slice(0,120));
             if(/[\\u0008\\u0009\\u000b\\u000c]/.test(t)) control.push(JSON.stringify(t.slice(0,120)))}
             return {mjx:document.querySelectorAll('mjx-container').length, err:[...document.querySelectorAll('mjx-merror')].map(e=>e.getAttribute('data-mjx-error')), raw:raw.slice(0,3), control:control.slice(0,3)}})()""")
          tot+=1
          if r['err'] or r['raw'] or r['control']: bad.append((L,lv,r['err'][:2],r['raw'][:2],r['control'][:2]))
    print('Số trang đã quét:', tot, '| trang lỗi:', len(bad))
    for x in bad[:15]: print(' ', x)
    print('pageerrors', errs[:3]); await b.close()
    print('KẾT QUẢ:', 'ĐẠT ✓' if not bad and not errs else 'CHƯA ĐẠT ✗'); sys.exit(0 if not bad and not errs else 1)
asyncio.run(main())
