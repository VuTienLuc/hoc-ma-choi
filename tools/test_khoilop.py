"""Kiểm thử: đăng nhập lớp "10A12" chỉ thấy bộ đề Lớp 10; lớp "GV" thấy tất cả. Chạy: python3 tools/test_khoilop.py"""
import threading, http.server, functools, socketserver, asyncio, pathlib, json, re, sys
from playwright.async_api import async_playwright
ROOT=pathlib.Path(__file__).resolve().parent.parent
H=functools.partial(http.server.SimpleHTTPRequestHandler, directory=str(ROOT)); H.log_message=lambda *a:None
srv=socketserver.TCPServer(('127.0.0.1',0),H); PORT=srv.server_address[1]; threading.Thread(target=srv.serve_forever,daemon=True).start()
BASE=f'http://127.0.0.1:{PORT}/index.html'; API='https://mock.example/exec'
async def handle(route):
    b=json.loads(route.request.post_data or '{}'); a=b.get('action')
    if a=='classes': body={'ok':True,'classes':['10A12','9A','GV']}
    elif a=='login': body={'ok':True,'token':'T','name':'Học sinh','lop':b['lop'],'user':b['user'],'progress':{}}
    else: body={'ok':True}
    await route.fulfill(status=200, content_type='application/json', body=json.dumps(body))
async def main():
  res=[]; ok=lambda n,c: res.append(bool(c)) or print(('✓ ' if c else '✗ ')+n)
  async with async_playwright() as p:
    br=await p.chromium.launch()
    for lop, expect in [('10A12','lop10'),('9A','lop9'),('GV',None)]:
      pg=await br.new_page(viewport={'width':820,'height':1180}); errs=[]; pg.on('pageerror',lambda e: errs.append(str(e)))
      await pg.route(API, handle)
      async def cfg(route):
          t=re.sub(r"sheetAPI:\s*'[^']*'", f"sheetAPI: '{API}'", (ROOT/'config.js').read_text()); await route.fulfill(body=t, content_type='application/javascript')
      await pg.route('**/config.js', cfg)
      await pg.goto(BASE); await pg.wait_for_timeout(600)
      await pg.select_option('#lgLop',lop); await pg.fill('#lgUser','u'); await pg.fill('#lgPass','p'); await pg.click('#lgBtn'); await pg.wait_for_timeout(600)
      ids=await pg.evaluate("App.grades.map(g=>g.id)")
      if expect:
        ok(f'{lop}: chỉ còn {expect}', ids==[expect] and pg.url.endswith('#/'+expect))
        ok(f'{lop}: không có nút "Chọn lớp"', await pg.locator('a.back[href="#/"]').count()==0)
        other='lop9' if expect!='lop9' else 'lop10'
        await pg.goto(BASE+f'#/{other}/bai/x/1'); await pg.wait_for_timeout(300)
        ok(f'{lop}: gõ link khối khác → quay về {expect}', pg.url.endswith('#/'+expect))
        await pg.reload(); await pg.wait_for_timeout(700)
        ok(f'{lop}: tải lại trang (đã lưu phiên) vẫn khoá khối', await pg.evaluate("App.grades.map(g=>g.id)")==[expect])
      else:
        ok(f'{lop}: thấy tất cả {len(ids)} khối', len(ids)>=4)
      ok(f'{lop}: không lỗi trang', not errs)
      await pg.close()
    await br.close()
  print('KẾT QUẢ:', 'ĐẠT ✓' if all(res) else 'CHƯA ĐẠT ✗'); sys.exit(0 if all(res) else 1)
asyncio.run(main())
