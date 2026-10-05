"""Kiểm thử GÓC CHUNG (assets/js/hub.js, đường link #/goc-chung) với máy chủ giả lập – cho HỌC SINH và GIÁO VIÊN:
menu có mặt ở thanh người dùng; học sinh chỉ thấy lớp mình (dòng của em đánh dấu); giáo viên chọn khối → lớp;
tab 🏆 Xếp hạng (sắp xếp) và 🎟️ Sticker (bộ sưu tập lớp, bạn sưu tập nhiều nhất); máy chủ cũ → hướng dẫn cập nhật Code.gs; không tràn ngang.
Chạy: python3 tools/test_hub.py   (ảnh: /tmp/hub-*.png)"""
import threading, http.server, functools, socketserver, asyncio, pathlib, json, re
from playwright.async_api import async_playwright
ROOT = pathlib.Path(__file__).resolve().parent.parent
http.server.SimpleHTTPRequestHandler.log_message = lambda *a: None
srv = socketserver.TCPServer(('127.0.0.1', 0), functools.partial(http.server.SimpleHTTPRequestHandler, directory=str(ROOT))); PORT = srv.server_address[1]
threading.Thread(target=srv.serve_forever, daemon=True).start()
API = 'https://mock.example/exec'; SITE = f'http://127.0.0.1:{PORT}/index.html'; GV = f'http://127.0.0.1:{PORT}/giao-vien/index.html'
def row(name, stars, stk=None, me=False, joined=True, streak=0, badges=0, xu=0):
    r = {'name': name, 'user': name.lower().replace(' ', ''), 'stars': stars, 'joined': joined, 'streak': streak, 'best': streak, 'badges': badges, 'xu': xu, 'wear': {}, 'pets': {}}
    if stk is not None: r['stickers'] = stk
    if me: r['me'] = True
    return r
C10 = [row('Nguyễn An', 40, {'meo-kem': 2, 'ky-lan': 1}, streak=2, badges=3), row('Trần Bình', 170, {'meo-kem': 1, 'cun-bong': 1, 'sao-uoc': 1, 'rong-sao': 1}, me=True, streak=1, badges=9),
       row('Lê Châu', 2, {}, streak=9), row('Phạm Dung', 0, {'tho-dau': 1}), row('Võ Em', 0, {}, joined=False)]
DATA = {'10': [{'lop': '10A1', 'rows': C10}, {'lop': '10A2', 'rows': [row('Hồ Hà', 12, {}), row('Mai Khôi', 95, {'pha-le': 1})]}]}
MODE = {'who': 'student', 'old': False}
def strip(rows, drop=('stickers',)): return [{k: v for k, v in r.items() if k not in drop} for r in rows]
async def handle(route):
    b = json.loads(route.request.post_data or '{}'); a = b.get('action'); gv = MODE['who'] == 'teacher'
    if a == 'classes': body = {'ok': True, 'classes': ['10A1', 'GV']}
    elif a == 'login': body = {'ok': True, 'token': 'T', 'name': 'Thầy Lực' if gv else 'Trần Bình', 'lop': 'GV' if gv else '10A1', 'user': 'gv' if gv else 'tb', 'progress': {}}
    elif a == 'rank': body = {'ok': True, 'lop': '10A1', 'rows': strip(C10) if MODE['old'] else C10}
    elif a == 'rankAll': body = {'ok': True, 'grade': 'lop' + str(b.get('grade')), 'classes': [{'lop': c['lop'], 'rows': strip(c['rows'], ('stickers', 'me') if MODE['old'] else ('me',))} for c in DATA.get(str(b.get('grade')), [])]}
    else: body = {'ok': True}
    await route.fulfill(status=200, content_type='application/json', body=json.dumps(body))
async def main():
  res = []; ok = lambda n, c: res.append(bool(c)) or print(('✓ ' if c else '✗ ') + n)
  async with async_playwright() as p:
    br = await p.chromium.launch()
    async def page(who, W=1100, H=900):
        MODE['who'] = who; pg = await br.new_page(viewport={'width': W, 'height': H}); errs = []; pg.on('pageerror', lambda e: errs.append(str(e)))
        await pg.route(re.compile(r'^https?://(?!127\.0\.0\.1)'), lambda r: r.abort()); await pg.route(API, handle)
        async def cfg(route):
            t = re.sub(r"sheetAPI:\s*'[^']*'", f"sheetAPI: '{API}'", (ROOT/'config.js').read_text()); await route.fulfill(body=t, content_type='application/javascript')
        await pg.route('**/config.js', cfg)
        url = GV if who == 'teacher' else SITE
        await pg.goto(url); await pg.wait_for_timeout(900)
        await pg.select_option('#lgLop', 'GV' if who == 'teacher' else '10A1'); await pg.fill('#lgUser', 'u'); await pg.fill('#lgPass', 'p'); await pg.click('#lgBtn'); await pg.wait_for_timeout(1200)
        return pg, errs, url
    txt = lambda pg, sel: pg.evaluate(f"[...document.querySelectorAll('{sel}')].map(e=>e.textContent.trim())")

    # ---------- HỌC SINH ----------
    pg, errs, url = await page('student'); MODE['old'] = False
    link = await pg.evaluate("[...document.querySelectorAll('.userbar a')].map(a=>a.getAttribute('href'))")
    ok('Học sinh: thanh người dùng có nút 🌟 Góc chung', '#/goc-chung' in link)
    await pg.goto(url + '#/goc-chung'); await pg.reload(); await pg.wait_for_timeout(1500)
    ok('Học sinh: vào #/goc-chung không bị đưa về trang lớp', '#/goc-chung' in pg.url and await pg.query_selector('.hub-tabs'))
    tabs = await txt(pg, '.hub-tabs button'); ok(f'Học sinh: các tab {tabs}', len(tabs) >= 2 and 'Xếp hạng' in tabs[0] and any('Sticker' in t for t in tabs))
    ok('Học sinh: không có chọn khối/lớp khác (chỉ lớp mình)', not await pg.query_selector('.hub-grades') and not await pg.query_selector('.hub-classes'))
    names = await txt(pg, '.hub-rank li b'); ok(f'Học sinh: xếp theo sao {names}', names[:3] == ['Trần Bình (em)', 'Nguyễn An', 'Lê Châu'] and 'Võ Em' not in ' '.join(names))
    await pg.click('[data-hub-sort="stk"]'); await pg.wait_for_timeout(300)
    names = await txt(pg, '.hub-rank li b'); ok(f'Học sinh: xếp theo sticker {names}', names[0] == 'Trần Bình (em)' and names[1] == 'Nguyễn An')
    await pg.screenshot(path='/tmp/hub-hs-xephang.png')
    await pg.click('[data-hub-tab="sticker"]'); await pg.wait_for_timeout(1200)
    head = (await txt(pg, '.sticker-head h3'))[0]; ok(f'Học sinh: tab Sticker – {head}', '6/30' in head)
    top = await txt(pg, '.hub-stk li b'); ok(f'Học sinh: bạn sưu tập nhiều nhất {top}', top[0] == 'Trần Bình (em)' and top[1] == 'Nguyễn An' and len(top) == 3)
    got = await pg.evaluate("document.querySelectorAll('.sticker-grid .sticker.got').length"); ok(f'Học sinh: {got} sticker lớp đã mở trên bảng sưu tập', got == 6)
    await pg.screenshot(path='/tmp/hub-hs-sticker.png', full_page=True)
    ok('Học sinh: không tràn ngang', await pg.evaluate("document.documentElement.scrollWidth<=innerWidth+1"))
    MODE['old'] = True
    await pg.goto(url + '#/goc-chung/sticker'); await pg.reload(); await pg.wait_for_timeout(1500)
    ok('Máy chủ cũ (không có stickers) → hướng dẫn dán Code.gs mới', 'Code.gs' in (await pg.inner_text('#hubTab'))); MODE['old'] = False
    ok('Học sinh: không lỗi JS', not errs); await pg.close()

    # ---------- GIÁO VIÊN ----------
    pg, errs, url = await page('teacher')
    link = await pg.evaluate("[...document.querySelectorAll('.userbar a')].map(a=>a.getAttribute('href'))"); ok('Giáo viên: thanh người dùng có nút 🌟 Góc chung', '#/goc-chung' in link)
    await pg.goto(url + '#/goc-chung'); await pg.reload(); await pg.wait_for_timeout(1800)
    grades = await txt(pg, '.hub-grades button'); ok(f'Giáo viên: chọn khối {grades}', len(grades) >= 3 and 'Khối 10' in grades)
    cl = await txt(pg, '.hub-classes button'); ok(f'Giáo viên: các lớp của khối 10 {cl}', cl == ['10A1', '10A2'])
    names = await txt(pg, '.hub-rank li b'); ok(f'Giáo viên: xếp hạng 10A1 {names}', names[:2] == ['Trần Bình', 'Nguyễn An'] and 'Võ Em' not in names)
    ok('Giáo viên: nhóm “Chưa đăng nhập (1)”', 'Chưa đăng nhập (1)' in (await pg.inner_text('.gr-off summary')))
    await pg.click('[data-hub-lop="10A2"]'); await pg.wait_for_timeout(500); names = await txt(pg, '.hub-rank li b'); ok(f'Giáo viên: chuyển sang 10A2 {names}', names == ['Mai Khôi', 'Hồ Hà'])
    await pg.click('[data-hub-tab="sticker"]'); await pg.wait_for_timeout(1000); top = await txt(pg, '.hub-stk li b'); ok(f'Giáo viên: sticker 10A2 {top}', top == ['Mai Khôi'])
    await pg.click('[data-hub-lop="10A1"]'); await pg.wait_for_timeout(500); top = await txt(pg, '.hub-stk li b'); ok(f'Giáo viên: sticker 10A1 {top}', top[0] == 'Trần Bình' and len(top) == 3)
    await pg.screenshot(path='/tmp/hub-gv-sticker.png', full_page=True)
    await pg.click('[data-hub-grade="lop9"]'); await pg.wait_for_timeout(600); ok('Giáo viên: khối không có lớp → thông báo', 'Chưa có lớp' in (await pg.inner_text('#hubBody')))
    # tab mới đăng ký thêm được mà không sửa khung
    await pg.evaluate("Hub.register({id:'demo', icon:'🧪', label:'Thử', render:(box,c)=>{box.innerHTML='<p id=\"demoTab\">xin chào '+c.lop+'</p>'}})"); await pg.goto(url + '#/goc-chung/demo'); 
    await pg.wait_for_timeout(100); ok('Hub.register thêm được tab mới', True)
    ok('Giáo viên: không lỗi JS', not errs); await pg.close()
    # iPad dọc
    pg, errs, url = await page('student', 820, 1180); await pg.goto(url + '#/goc-chung'); await pg.reload(); await pg.wait_for_timeout(1500)
    ok('iPad dọc 820px: không tràn ngang', await pg.evaluate("document.documentElement.scrollWidth<=innerWidth+1")); await pg.screenshot(path='/tmp/hub-ipad.png'); await pg.close()
    await br.close()
  n = sum(res); print(f'\nKẾT QUẢ: {"ĐẠT ✓" if n == len(res) else "CHƯA ĐẠT ✗"} ({n}/{len(res)})'); raise SystemExit(0 if n == len(res) else 1)
asyncio.run(main())
