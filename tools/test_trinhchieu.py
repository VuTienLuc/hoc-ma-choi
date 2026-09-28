"""Kiểm thử trình chiếu: mở mọi bài (mức 2), chiếu từng câu kèm đáp án ở 1280×720 và 1024×768,
bảo đảm chữ vừa khung (không tràn), không lỗi công thức, thoát bằng Esc. Chạy: python3 tools/test_trinhchieu.py"""
import threading, http.server, functools, socketserver, asyncio, pathlib, sys
from playwright.async_api import async_playwright
ROOT=pathlib.Path(__file__).resolve().parent.parent
H=functools.partial(http.server.SimpleHTTPRequestHandler, directory=str(ROOT)); H.log_message=lambda *a:None
srv=socketserver.TCPServer(('127.0.0.1',0),H); PORT=srv.server_address[1]; threading.Thread(target=srv.serve_forever,daemon=True).start()
async def main():
  bad=[]; tot=0; small=[]
  async with async_playwright() as p:
    b=await p.chromium.launch()
    for vw,vh in [(1280,720),(1024,768)]:
      pg=await b.new_page(viewport={'width':vw,'height':vh}); errs=[]; pg.on('pageerror',lambda e: errs.append(str(e)))
      async def cfg(route):
          r=await route.fetch(); t=(await r.text()).replace("sheetAPI: 'https","sheetAPI: '', _x: 'https"); await route.fulfill(response=r, body=t)
      await pg.route('**/config.js', cfg)
      await pg.goto(f'http://127.0.0.1:{PORT}/index.html#/'); await pg.wait_for_timeout(1500)
      lessons=await pg.evaluate("App.grades.filter(g=>g.id!=='lop3').flatMap(g=>g.lessons.map(l=>g.id+'/bai/'+l.id))")
      if len(sys.argv)>1: lessons=[x for x in lessons if any(a in x for a in sys.argv[1:])]
      for L in lessons:
        await pg.evaluate(f"location.hash='#/{L}/2'"); await pg.wait_for_timeout(250)
        await pg.click('#presentBtn'); await pg.wait_for_timeout(250)
        for k in range(6):
          await pg.keyboard.press('Enter'); await pg.wait_for_timeout(700)
          r=await pg.evaluate("""(()=>{const s=document.getElementById('pvSlide');const over=[s,...s.querySelectorAll('.pv-q,.pv-side,.pv-note,.pv-ans')].some(x=>x.scrollWidth>x.clientWidth+1)||s.scrollHeight>s.clientHeight+1;
              return {fs:parseFloat(getComputedStyle(s).fontSize),over,err:document.querySelectorAll('#present mjx-merror').length}})()""")
          tot+=1
          if r['over'] or r['err']: bad.append((vw,L,k+1,r))
          if r['fs']<20: small.append((vw,L,k+1,r['fs']))
          await pg.keyboard.press('ArrowRight')
        await pg.keyboard.press('Escape'); await pg.wait_for_timeout(100)
        if await pg.locator('#present').count(): bad.append((vw,L,'không thoát được'))
      if errs: bad.append(('pageerror',errs[:2]))
      await pg.close()
    await b.close()
  print('Số trang chiếu đã thử:', tot, '| tràn/lỗi:', len(bad), '| chữ < 20px:', len(small))
  for x in (bad+small)[:10]: print(' ', x)
  print('KẾT QUẢ:', 'ĐẠT ✓' if not bad else 'CHƯA ĐẠT ✗'); sys.exit(0 if not bad else 1)
asyncio.run(main())
