"""Kiểm thử trang BÀI GIẢNG giáo viên (giao-vien/): tài khoản học sinh bị chặn, tài khoản GV vào được;
chiếu mọi trang của mọi bài ở 1280×720 và 1024×768 (hiện hết lời giải) – chữ không tràn, không lỗi công thức.
Chạy: python3 tools/test_baigiang.py [lop8]   (tham số: chỉ chiếu bài giảng của một lớp; ảnh mẫu: /tmp/baigiang-*.png)"""
import threading, http.server, functools, socketserver, asyncio, pathlib, json, re, sys
from playwright.async_api import async_playwright
ROOT=pathlib.Path(__file__).resolve().parent.parent
H=functools.partial(http.server.SimpleHTTPRequestHandler, directory=str(ROOT)); http.server.SimpleHTTPRequestHandler.log_message=lambda *a:None
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
      tiles=await pg.eval_on_selector_all('a.tile.grade','els=>els.map(e=>e.getAttribute("href").slice(2))')
      if w==1280:
        ok(f'Tài khoản GV vào được, chọn lớp: {", ".join(tiles)}', len(tiles)>=2 and await pg.locator('[data-play]').count()==0); await pg.screenshot(path='/tmp/baigiang-0-home.png')
        await pg.click('a.tile.grade[href="#/lop8"]'); await pg.wait_for_timeout(500)
        ok('Trang lớp: các chương thu gọn sẵn (không thấy nút ▶ Chiếu), bấm “Mở tất cả” thì hiện', await pg.locator('[data-play]:visible').count()==0 and await pg.locator('.lk-lessons section.fold').count()>=1 and await pg.locator('.lk-lessons section.fold.open').count()==0)
        await pg.click('#foldAll'); await pg.wait_for_timeout(200); ok('Mở tất cả → hiện các nút bài giảng', await pg.locator('[data-play]:visible').count()>=1)
        await pg.click('#foldNone'); await pg.wait_for_timeout(100); await pg.locator('.lk-lessons section.fold>h2').first.click(); ok('Bấm tiêu đề một chương → chỉ chương đó mở', await pg.locator('.lk-lessons section.fold.open').count()==1)
        await pg.evaluate("Lecture.foldAll(true)")
        ids=await pg.eval_on_selector_all('[data-play]','els=>els.map(e=>e.dataset.play)')
        gs=await pg.evaluate("[...new Set(%s.map(k=>Lecture.BOOKS[k.split(':')[0]].grade))]"%json.dumps(ids))
        ok(f'Bấm Lớp 8 → chỉ hiện {len(ids)} bài giảng lớp 8', ids and gs==['lop8']); await pg.screenshot(path='/tmp/baigiang-0-lop8.png', full_page=True)
      plays=[]
      for gid in tiles:
        if len(sys.argv)>1 and gid not in sys.argv[1:]: continue
        await pg.goto(BASE+'#/'+gid); await pg.wait_for_timeout(500); await pg.evaluate("Lecture.foldAll(true)"); 
        plays+= [(gid,x) for x in await pg.eval_on_selector_all('[data-play]','els=>els.map(e=>e.dataset.play)')]
      for i,(gid,key) in enumerate(plays):
        if not pg.url.endswith('#/'+gid): await pg.goto(BASE+'#/'+gid); await pg.wait_for_timeout(500); await pg.evaluate("Lecture.foldAll(true)"); 
        await pg.click(f'[data-play="{key}"]'); await pg.wait_for_timeout(500)
        cnt=await pg.evaluate("(([b,l])=>Lecture.BOOKS[b].lessons[l].slides.length)(%s)"%json.dumps(key.split(':')))
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
        await pg.goto(BASE+'#/lop10'); await pg.wait_for_timeout(500); await pg.evaluate("Lecture.foldAll(true)"); 
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
        await pg.click('#lkWs'); await pg.wait_for_timeout(1800)
        w1=await pg.evaluate("[document.querySelectorAll('.ws h3').length, document.querySelectorAll('.ws-lines i').length, document.querySelectorAll('.ws mjx-merror').length, document.querySelector('.ws-brand').textContent]")
        await pg.click('#wsKey'); await pg.wait_for_timeout(1800)
        w2=await pg.evaluate("[document.querySelectorAll('.ws-sol li').length, document.querySelectorAll('.ws mjx-merror').length]")
        ok(f'Phiếu học tập: {w1[0]} phần, {w1[1]} dòng ghi; bản lời giải {w2[0]} bước; tên trang “{w1[3][:26]}”', w1[0]>=3 and w1[1]>20 and not w1[2] and w2[0]>5 and not w2[1] and 'Vũ Tiến Lực' in w1[3])
      if pg.errs: bad.append(('pageerror',pg.errs[:2]))
      await pg.close()
    ok(f'Chiếu {tot} trang (2 cỡ màn hình): không tràn, không lỗi, chữ ≥ 18px', not bad)
    for x in bad[:8]: print('   ', x)
    await br.close()
  print('KẾT QUẢ:', 'ĐẠT ✓' if all(res) else 'CHƯA ĐẠT ✗'); sys.exit(0 if all(res) else 1)
asyncio.run(main())
