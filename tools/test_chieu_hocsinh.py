"""Kiểm thử nút ▶ Trình chiếu trên trang bài kiểm tra của HỌC SINH: tài khoản học sinh không thấy nút,
tài khoản GV thấy đủ các mã đề và bấm chiếu được (trang tiêu đề + từng câu).  Chạy: python3 tools/test_chieu_hocsinh.py"""
import threading, http.server, functools, socketserver, asyncio, pathlib, json, re
from playwright.async_api import async_playwright
ROOT=pathlib.Path(__file__).resolve().parent.parent
H=functools.partial(http.server.SimpleHTTPRequestHandler, directory=str(ROOT)); http.server.SimpleHTTPRequestHandler.log_message=lambda *a:None
srv=socketserver.TCPServer(('127.0.0.1',0),H); PORT=srv.server_address[1]; threading.Thread(target=srv.serve_forever,daemon=True).start()
API='https://mock.example/exec'; BASE=f'http://127.0.0.1:{PORT}/index.html'
async def handle(route):
    b=json.loads(route.request.post_data or '{}'); a=b.get('action')
    body={'ok':True,'classes':['10A12','GV']} if a=='classes' else {'ok':True,'token':'T','name':'Thầy Lực' if b.get('lop')=='GV' else 'Học sinh A','lop':b.get('lop'),'user':b.get('user'),'progress':{}} if a=='login' else {'ok':True}
    await route.fulfill(status=200, content_type='application/json', body=json.dumps(body))
async def cfg(route):
    t=re.sub(r"sheetAPI:\s*'[^']*'", f"sheetAPI: '{API}'", (ROOT/'config.js').read_text()); await route.fulfill(body=t, content_type='application/javascript')
async def main():
  res=[]; ok=lambda n,c: res.append(bool(c)) or print(('✓ ' if c else '✗ ')+n)
  async with async_playwright() as p:
    br=await p.chromium.launch()
    for lop in ['10A12','GV']:
      pg=await br.new_page(viewport={'width':1180,'height':820}); errs=[]; pg.on('pageerror',lambda e: errs.append(str(e)))
      await pg.route(API,handle); await pg.route('**/config.js',cfg)
      await pg.goto(BASE); await pg.wait_for_selector('#lgLop'); await pg.wait_for_timeout(1500)
      await pg.select_option('#lgLop',lop); await pg.fill('#lgUser','u'); await pg.fill('#lgPass','p'); await pg.click('#lgBtn'); await pg.wait_for_timeout(900)
      for tid in ['tong-hop-1','tong-hop-5']:
        await pg.goto(BASE+f'#/lop10/kiem-tra/{tid}'); await pg.reload(); await pg.wait_for_timeout(1200)
        await pg.evaluate("location.hash='#/lop10/kiem-tra/%s'"%tid); await pg.wait_for_timeout(800)
        n=await pg.locator('[data-tdplay]').count()
        if lop=='GV':
          ok(f'GV thấy {n} nút chiếu ({tid})', n==4)
          await pg.click('[data-tdplay="1"]'); await pg.wait_for_timeout(1200)
          pos=await pg.inner_text('#lkPos'); ok(f'Chiếu được, vị trí {pos}', pos.replace(' ','').startswith('1/15'))
          await pg.keyboard.press('PageDown'); await pg.wait_for_timeout(600); await pg.keyboard.press('Enter'); await pg.wait_for_timeout(700)
          ok('Câu 1 hiện đáp án', await pg.locator('.lk-ans.on').count()==1)
          await pg.screenshot(path=f'/tmp/hs-chieu-{tid}.png'); await pg.keyboard.press('Escape'); await pg.wait_for_timeout(300)
        else:
          ok(f'Học sinh không thấy nút chiếu ({tid})', n==0 and await pg.locator('#testStart').count()==1)
      ok('Không lỗi JS', not errs); await pg.close()
  print('KẾT QUẢ:', 'ĐẠT ✓' if all(res) else 'CHƯA ĐẠT ✗'); raise SystemExit(0 if all(res) else 1)
asyncio.run(main())
