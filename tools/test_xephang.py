"""Kiểm thử BẢNG XẾP HẠNG GIÁO VIÊN (cột phải trang bài giảng một khối, assets/js/xephang.js) với máy chủ giả lập:
cột phải nằm bên phải danh sách bài (màn rộng), xuống dưới (iPad dọc); thẻ lớp; sắp xếp; thú cưng đúng cấp tiến hoá theo sao;
bấm một em → chặng tiến hoá 5 cấp; nhóm “chưa đăng nhập”; máy chủ cũ → hướng dẫn cập nhật Code.gs.
Chạy: python3 tools/test_xephang.py   (ảnh: /tmp/xephang-*.png)"""
import threading, http.server, functools, socketserver, asyncio, pathlib, json, re, sys
from playwright.async_api import async_playwright
ROOT = pathlib.Path(__file__).resolve().parent.parent
http.server.SimpleHTTPRequestHandler.log_message = lambda *a: None
srv = socketserver.TCPServer(('127.0.0.1', 0), functools.partial(http.server.SimpleHTTPRequestHandler, directory=str(ROOT))); PORT = srv.server_address[1]
threading.Thread(target=srv.serve_forever, daemon=True).start()
API = 'https://mock.example/exec'; BASE = f'http://127.0.0.1:{PORT}/giao-vien/index.html'
def row(name, stars, joined=True, streak=0, badges=0, lessons=0, xu=0):
    return {'name': name, 'user': name.lower().replace(' ', ''), 'stars': stars, 'lessons': lessons, 'joined': joined, 'last': '27/09/2026' if joined else '',
            'streak': streak, 'best': streak, 'badges': badges, 'xu': xu, 'wear': {}, 'pets': {}}
DATA = {'9': [{'lop': '9A1', 'rows': [row('Nguyễn An', 40, streak=2, badges=3, lessons=12), row('Trần Bình', 170, streak=1, badges=9, lessons=20), row('Lê Châu', 2, streak=9, lessons=1),
                                      row('Phạm Dung', 0), row('Võ Em', 0, joined=False), row('Đỗ Giang', 0, joined=False)]},
              {'lop': '9A2', 'rows': [row('Hồ Hà', 12, lessons=4), row('Mai Khôi', 95, lessons=15)]}]}
MODE = {'old': False}
async def handle(route):
    b = json.loads(route.request.post_data or '{}'); a = b.get('action')
    if a == 'classes': body = {'ok': True, 'classes': ['9A1', 'GV']}
    elif a == 'login': body = {'ok': True, 'token': 'T', 'name': 'Thầy Lực', 'lop': 'GV', 'user': 'gv', 'progress': {}}
    elif a == 'rankAll': body = {'ok': False, 'msg': 'Yêu cầu không hợp lệ'} if MODE['old'] else {'ok': True, 'grade': 'lop' + str(b.get('grade')), 'classes': DATA.get(str(b.get('grade')), [])}
    else: body = {'ok': True}
    await route.fulfill(status=200, content_type='application/json', body=json.dumps(body))
async def main():
  res = []; ok = lambda n, c: res.append(bool(c)) or print(('✓ ' if c else '✗ ') + n)
  async with async_playwright() as p:
    br = await p.chromium.launch()
    for W, H in [(1366, 900), (820, 1180)]:
      pg = await br.new_page(viewport={'width': W, 'height': H}); errs = []; pg.on('pageerror', lambda e: errs.append(str(e)))
      await pg.route(API, handle)
      async def cfg(route):
          t = re.sub(r"sheetAPI:\s*'[^']*'", f"sheetAPI: '{API}'", (ROOT/'config.js').read_text()); await route.fulfill(body=t, content_type='application/javascript')
      await pg.route('**/config.js', cfg)
      await pg.goto(BASE); await pg.wait_for_timeout(700)
      await pg.select_option('#lgLop', 'GV'); await pg.fill('#lgUser', 'gv'); await pg.fill('#lgPass', 'p'); await pg.click('#lgBtn'); await pg.wait_for_timeout(700)
      await pg.goto(BASE + '#/lop9'); await pg.wait_for_timeout(2000)
      r = await pg.evaluate("""(()=>{const a=document.querySelector('#lkRank').getBoundingClientRect(),l=document.querySelector('.lk-lessons').getBoundingClientRect();
        const G=App.grades.find(g=>g.id==='lop9'),T=Pet.thresholds(G);const st=s=>{let k=0;T.forEach((v,i)=>{if(s>=v)k=i});return k};
        const rows=[...document.querySelectorAll('.gr-row')].map(li=>({name:li.querySelector('b').textContent,stage:li.querySelector('small').textContent,val:li.querySelector('.rv').textContent}));
        return {right:a.left>l.right-2,below:a.top>=l.bottom-2,rows,T,tabs:[...document.querySelectorAll('.gr-tabs button')].map(b=>b.textContent),
          pets:document.querySelectorAll('.gr-row svg.pet').length,off:document.querySelector('.gr-off summary')&&document.querySelector('.gr-off summary').textContent,
          want:{'Trần Bình':Pet.name(G,st(170)),'Nguyễn An':Pet.name(G,st(40)),'Lê Châu':Pet.name(G,st(2))},sw:document.documentElement.scrollWidth-innerWidth}})()""")
      if W == 1366:
        ok(f'Màn rộng {W}px: bảng xếp hạng nằm bên phải danh sách bài', r['right'])
        ok(f'Thẻ lớp của khối 9: {", ".join(r["tabs"])}', r['tabs'] == ['9A1', '9A2'])
        ok(f'Xếp theo sao: {" > ".join(x["name"] for x in r["rows"])}', [x['name'] for x in r['rows']] == ['Trần Bình', 'Nguyễn An', 'Lê Châu', 'Phạm Dung'])
        ok(f'Thú cưng đúng cấp theo sao (mốc {r["T"]}): ' + '; '.join(f'{k}: {v}' for k, v in r['want'].items()),
           all(next(x for x in r['rows'] if x['name'] == k)['stage'] == v for k, v in r['want'].items()) and r['pets'] == 4)
        ok(f'Nhóm “{r["off"]}”', r['off'] == 'Chưa đăng nhập (2)')
        await pg.screenshot(path='/tmp/xephang-rong.png')
        await pg.click('[data-sort="streak"]'); await pg.wait_for_timeout(200)
        n = await pg.eval_on_selector_all('.gr-row b', 'e=>e.map(x=>x.textContent)'); ok(f'Xếp theo chuỗi ngày: {n[0]} đứng đầu', n[0] == 'Lê Châu')
        await pg.click('.gr-row:has-text("Trần Bình")'); await pg.wait_for_timeout(300)
        d = await pg.evaluate("[document.querySelectorAll('.gr-evo figure').length, document.querySelectorAll('.gr-evo .now').length, document.querySelector('.gr-detail').innerText]")
        ok(f'Bấm một em → chặng tiến hoá {d[0]} cấp, đánh dấu cấp hiện tại', d[0] == 5 and d[1] == 1 and 'huy hiệu' in d[2])
        await pg.locator('#lkRank').screenshot(path='/tmp/xephang-chitiet.png')
        await pg.click('[data-lop="9A2"]'); await pg.wait_for_timeout(200)
        n = await pg.eval_on_selector_all('.gr-row b', 'e=>e.map(x=>x.textContent)'); ok(f'Chuyển sang lớp 9A2: {", ".join(n)}', n == ['Mai Khôi', 'Hồ Hà'])
        MODE['old'] = True
        await pg.goto(BASE + '#/lop10'); await pg.wait_for_timeout(1500)
        t = await pg.inner_text('#lkRank'); ok('Máy chủ cũ (chưa cập nhật Code.gs) → hướng dẫn cập nhật', 'Code.gs' in t)
        MODE['old'] = False
      else:
        ok(f'iPad dọc {W}px: bảng xếp hạng xuống dưới, không cuộn ngang', r['below'] and r['sw'] <= 0)
        await pg.locator('#lkRank').screenshot(path='/tmp/xephang-ipad.png')
      ok(f'{W}×{H}: không có lỗi JS', not errs)
      for e in errs[:3]: print('   ', e)
      await pg.close()
    await br.close()
  print('KẾT QUẢ:', 'ĐẠT ✓' if all(res) else 'CHƯA ĐẠT ✗'); sys.exit(0 if all(res) else 1)
asyncio.run(main())
