"""Kiểm thử trang BÀI GIẢNG giáo viên (giao-vien/): tài khoản học sinh bị chặn, tài khoản GV vào được;
chiếu mọi trang của mọi bài ở 1280×720 và 1024×768 (hiện hết lời giải) – chữ không tràn, không lỗi công thức.
Chạy: python3 tools/test_baigiang.py   (ảnh mẫu: /tmp/baigiang-*.png)"""
import threading, http.server, functools, socketserver, asyncio, pathlib, json, re, sys
from playwright.async_api import async_playwright
ROOT=pathlib.Path(__file__).resolve().parent.parent
H=functools.partial(http.server.SimpleHTTPRequestHandler, directory=str(ROOT)); H.log_message=lambda *a:None
srv=socketserver.TCPServer(('127.0.0.1',0),H); PORT=srv.server_address[1]; threading.Thread(target=srv.serve_forever,daemon=True).start()
API='https://mock.example/exec'; BASE=f'http://127.0.0.1:{PORT}/giao-vien/index.html'
async def handle(route):
    b=json.loads(route.request.post_data or '{}'); a=b.get('action')
    body={'ok':True,'classes':['10A12','GV']} if a=='classes' else {'ok':True,'token':'T','name':'Thầy Lực' if b.get('lop')=='GV' else 'Học sinh A','lop':b.get('lop'),'user':b.get('user'),'progress':{}} if a=='login' else {'ok':True}
    await route.fulfill(status=200, content_type='application/json', body=json.dumps(body))
async def login(pg, lop):
    await pg.goto(BASE); await pg.wait_for_timeout(700)
    await pg.select_option('#lgLop',lop); await pg.fill('#lgUser','u'); await pg.fill('#lgPass','p'); await pg.click('#lgBtn'); await pg.wait_for_timeout(700)
async def main():
  res=[]; ok=lambda n,c: res.append(bool(c)) or print(('✓ ' if c else '✗ ')+n)
  async with async_playwright() as p:
    br=await p.chromium.launch()
    async def page(w,h):
      pg=await br.new_page(viewport={'width':w,'height':h}); pg.errs=[]; pg.on('pageerror',lambda e: pg.errs.append(str(e)))
      await pg.route(API, handle)
      async def cfg(route):
          t=re.sub(r"sheetAPI:\s*'[^']*'", f"sheetAPI: '{API}'", (ROOT/'config.js').read_text()); await route.fulfill(body=t, content_type='application/javascript')
      await pg.route('**/config.js', cfg); return pg
    pg=await page(1280,720); await login(pg,'10A12')
    ok('Tài khoản học sinh bị chặn', 'dành cho giáo viên' in (await pg.inner_text('#app')) and await pg.locator('[data-play]').count()==0)
    await pg.close()
    bad=[]; tot=0
    for w,h in [(1280,720),(1024,768)]:
      pg=await page(w,h); await login(pg,'GV')
      n=await pg.locator('[data-play]').count()
      if w==1280: ok(f'Tài khoản GV vào được, có {n} bài giảng', n>=3); await pg.screenshot(path='/tmp/baigiang-0-home.png')
      for i in range(n):
        await pg.locator('[data-play]').nth(i).click(); await pg.wait_for_timeout(500)
        cnt=await pg.evaluate("Lecture.BOOKS.flatMap(b=>b.lessons)[%d].slides.length"%i)
        for k in range(cnt):
          await pg.keyboard.press('Enter'); await pg.wait_for_timeout(650)
          r=await pg.evaluate("""(()=>{const s=document.getElementById('lkSlide');const over=s.scrollHeight>s.clientHeight+1||[s,...s.querySelectorAll('.lk-de,.lk-body,.lk-h,.lk-title')].some(x=>x.scrollWidth>x.clientWidth+1);
             return {fs:parseFloat(getComputedStyle(s).fontSize),over,err:document.querySelectorAll('#lecture mjx-merror').length,raw:/\\\\\\(|\\\\\\[/.test(s.innerText)}})()""")
          tot+=1
          if r['over'] or r['err'] or r['raw'] or r['fs']<18: bad.append((w,i,k+1,r))
          if w==1280 and i==0 and k in (2,7): await pg.screenshot(path=f'/tmp/baigiang-{i}-{k+1}.png')
          if w==1280 and i==1 and k in (7,11): await pg.screenshot(path=f'/tmp/baigiang-{i}-{k+1}.png')
          await pg.keyboard.press('PageDown'); await pg.wait_for_timeout(120)
          if k<cnt-1:
            pos=await pg.inner_text('#lkPos')
            if not pos.startswith(f'{k+2}/'): await pg.keyboard.press('PageDown'); await pg.wait_for_timeout(120)
        await pg.keyboard.press('Escape'); await pg.wait_for_timeout(200)
      # từng bước: bấm → hiện dần lời giải
      if w==1280:
        await pg.locator('[data-play]').nth(0).click(); await pg.wait_for_timeout(400)
        for _ in range(4): await pg.keyboard.press('ArrowRight'); await pg.wait_for_timeout(100)
        s1=await pg.evaluate("[document.querySelectorAll('#lkSlide .lk-solsteps li.on').length, document.getElementById('lkPos').textContent]")
        await pg.keyboard.press('ArrowRight'); await pg.wait_for_timeout(150)
        s2=await pg.evaluate("[document.querySelectorAll('#lkSlide .lk-solsteps li.on').length, document.getElementById('lkPos').textContent]")
        ok(f'Ví dụ: bấm → hiện từng bước ({s1[1]} → {s2[1]})', s2[0]==s1[0]+1)
        await pg.screenshot(path='/tmp/baigiang-buoc.png'); await pg.keyboard.press('Escape')
        await pg.locator('[data-prev]').nth(1).click(); await pg.wait_for_timeout(1500)
        ok('Xem trước: hiện đủ trang và lời giải', await pg.locator('.lk-page').count()>=10 and await pg.locator('.lk-page mjx-merror').count()==0)
        await pg.screenshot(path='/tmp/baigiang-xemtruoc.png', full_page=False)
      if pg.errs: bad.append(('pageerror',pg.errs[:2]))
      await pg.close()
    ok(f'Chiếu {tot} trang (2 cỡ màn hình): không tràn, không lỗi, chữ ≥ 18px', not bad)
    for x in bad[:8]: print('   ', x)
    await br.close()
  print('KẾT QUẢ:', 'ĐẠT ✓' if all(res) else 'CHƯA ĐẠT ✗'); sys.exit(0 if all(res) else 1)
asyncio.run(main())
