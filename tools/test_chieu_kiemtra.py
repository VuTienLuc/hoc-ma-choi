"""Kiểm thử CHIẾU bài kiểm tra học sinh (test-deck.js) trên trang giáo viên: mỗi bài × mỗi mã đề mở được,
đủ trang (1 + số câu), hiện hết lời giải ở 1280×720 và 1024×768 không tràn khung, không lỗi công thức, học sinh không thấy.
Chạy: python3 tools/test_chieu_kiemtra.py   (ảnh mẫu: /tmp/chieu-kt-*.png)"""
import threading, http.server, functools, socketserver, asyncio, pathlib, json, re
from playwright.async_api import async_playwright
ROOT=pathlib.Path(__file__).resolve().parent.parent
H=functools.partial(http.server.SimpleHTTPRequestHandler, directory=str(ROOT)); http.server.SimpleHTTPRequestHandler.log_message=lambda *a:None
srv=socketserver.TCPServer(('127.0.0.1',0),H); PORT=srv.server_address[1]; threading.Thread(target=srv.serve_forever,daemon=True).start()
API='https://mock.example/exec'; BASE=f'http://127.0.0.1:{PORT}/giao-vien/index.html'
async def handle(route):
    b=json.loads(route.request.post_data or '{}'); a=b.get('action')
    body={'ok':True,'classes':['10A12','GV']} if a=='classes' else {'ok':True,'token':'T','name':'Thầy Lực' if b.get('lop')=='GV' else 'Học sinh A','lop':b.get('lop'),'user':b.get('user'),'progress':{}} if a=='login' else {'ok':True}
    await route.fulfill(status=200, content_type='application/json', body=json.dumps(body))
async def main():
  res=[]; ok=lambda n,c: res.append(bool(c)) or print(('✓ ' if c else '✗ ')+n)
  async with async_playwright() as p:
    br=await p.chromium.launch(); bad=[]; tot=0
    for w,h in [(1280,720),(1024,768)]:
      pg=await br.new_page(viewport={'width':w,'height':h}); pg.errs=[]; pg.on('pageerror',lambda e: pg.errs.append(str(e)))
      await pg.route(API, handle)
      async def cfg(route):
          t=re.sub(r"sheetAPI:\s*'[^']*'", f"sheetAPI: '{API}'", (ROOT/'config.js').read_text()); await route.fulfill(body=t, content_type='application/javascript')
      await pg.route('**/config.js', cfg)
      await pg.goto(BASE); await pg.wait_for_timeout(700)
      await pg.select_option('#lgLop','10A12' if w==0 else 'GV'); await pg.fill('#lgUser','u'); await pg.fill('#lgPass','p'); await pg.click('#lgBtn'); await pg.wait_for_timeout(700)
      await pg.goto(BASE+'#/lop10'); await pg.wait_for_timeout(700)
      keys=await pg.eval_on_selector_all('[data-tdeck]','els=>els.map(e=>e.dataset.tdeck)')
      if w==1280: ok(f'Trang lớp 10 có {len(keys)} nút chiếu (5 test + bài cuối chương × mã đề)', len(keys)>=24)
      for key in keys:
        if w==1024 and not key.endswith(':0'): continue
        await pg.click(f'[data-tdeck="{key}"]'); await pg.wait_for_timeout(400)
        t,ci=key.split(':'); n=await pg.evaluate("(([t,c])=>TestDeck.deck(StudentTest.find('lop10',t),+c).slides.length)(%s)"%json.dumps([t,ci]))
        for k in range(n):
          await pg.keyboard.press('Enter'); await pg.wait_for_timeout(750)
          r=await pg.evaluate("""(()=>{const s=document.getElementById('lkSlide');const over=s.scrollHeight>s.clientHeight+1||[s,...s.querySelectorAll('.lk-de,.lk-body,.lk-h,.lk-title')].some(x=>x.scrollWidth>x.clientWidth+2);
             return {fs:parseFloat(getComputedStyle(s).fontSize),over,err:document.querySelectorAll('#lecture mjx-merror').length,raw:/\\\\\\(|\\\\\\[/.test(s.innerText)}})()""")
          tot+=1
          if r['over'] or r['err'] or r['raw'] or r['fs']<16: bad.append((w,key,k+1,r))
          if w==1280 and key=='tong-hop-1:0' and k in (1,9,12): await pg.screenshot(path=f'/tmp/chieu-kt-{k+1}.png')
          if k<n-1: await pg.keyboard.press('PageDown'); await pg.wait_for_timeout(100)
        pos=await pg.inner_text('#lkPos'); await pg.keyboard.press('Escape'); await pg.wait_for_timeout(150)
        if not pos.replace(' ','').startswith(f'{n}/'): bad.append((w,key,'số trang',pos,n))
      ok(f'Chiếu {w}×{h}: {tot} trang không tràn, không lỗi công thức', not bad and not pg.errs); await pg.close()
    pg=await br.new_page(); await pg.route(API, handle)
    async def cfg2(route):
        t=re.sub(r"sheetAPI:\s*'[^']*'", f"sheetAPI: '{API}'", (ROOT/'config.js').read_text()); await route.fulfill(body=t, content_type='application/javascript')
    await pg.route('**/config.js', cfg2); await pg.goto(BASE); await pg.wait_for_timeout(700)
    await pg.select_option('#lgLop','10A12'); await pg.fill('#lgUser','u'); await pg.fill('#lgPass','p'); await pg.click('#lgBtn'); await pg.wait_for_timeout(700)
    ok('Học sinh không thấy nút chiếu', await pg.locator('[data-tdeck]').count()==0)
    for x in bad[:10]: print('  ✗',x)
  print('KẾT QUẢ:', 'ĐẠT ✓' if all(res) and not bad else 'CHƯA ĐẠT ✗'); raise SystemExit(0 if all(res) and not bad else 1)
asyncio.run(main())
