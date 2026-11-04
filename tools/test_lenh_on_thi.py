"""Kiểm thử biểu mẫu “Lệnh ôn thi vào 10” (assets/js/lenh-on-thi.js, đường link #/lenh-on-thi).
Chạy: python3 tools/test_lenh_on_thi.py"""
import threading, http.server, functools, socketserver, asyncio, pathlib, json, re
from playwright.async_api import async_playwright
ROOT = pathlib.Path(__file__).resolve().parent.parent
http.server.SimpleHTTPRequestHandler.log_message = lambda *a: None
H = functools.partial(http.server.SimpleHTTPRequestHandler, directory=str(ROOT))
srv = socketserver.TCPServer(('127.0.0.1', 0), H); PORT = srv.server_address[1]; threading.Thread(target=srv.serve_forever, daemon=True).start()
API = 'https://mock.example/exec'
async def handle(route):
    b = json.loads(route.request.post_data or '{}'); a = b.get('action')
    body = {'ok': True, 'classes': ['GV']} if a == 'classes' else {'ok': True, 'token': 'T', 'name': 'Thầy', 'lop': 'GV', 'user': 'u', 'progress': {}} if a == 'login' else {'ok': True}
    await route.fulfill(status=200, content_type='application/json', body=json.dumps(body))
async def main():
    res = []; ok = lambda n, c: res.append(bool(c)) or print(('✓ ' if c else '✗ ') + n)
    async with async_playwright() as p:
        br = await p.chromium.launch(); pg = await br.new_page(viewport={'width': 1200, 'height': 900}); errs = []
        pg.on('pageerror', lambda e: errs.append(str(e)))
        await pg.route(re.compile(r'^https?://(?!127\.0\.0\.1)'), lambda r: r.abort()); await pg.route(API, handle)
        async def cfg(route):
            t = re.sub(r"sheetAPI:\s*'[^']*'", f"sheetAPI: '{API}'", (ROOT/'config.js').read_text()); await route.fulfill(body=t, content_type='application/javascript')
        await pg.route('**/config.js', cfg)
        await pg.goto(f'http://127.0.0.1:{PORT}/giao-vien/index.html'); await pg.wait_for_timeout(800)
        await pg.select_option('#lgLop', 'GV'); await pg.fill('#lgUser', 'u'); await pg.fill('#lgPass', 'p'); await pg.click('#lgBtn'); await pg.wait_for_timeout(900)
        ok('trang chủ có nút “Lệnh ôn thi vào 10”', await pg.locator('a[href="#/lenh-on-thi"]').count() >= 1)
        await pg.click('a[href="#/lenh-on-thi"]'); await pg.wait_for_timeout(500)
        ok('mở được biểu mẫu', await pg.locator('#lotOut').count() == 1)
        out = await pg.input_value('#lotOut')
        ok('lệnh có quy ước “phải chứng minh lại” và “được dùng trực tiếp”', 'PHẢI CHỨNG MINH LẠI' in out and 'ĐƯỢC DÙNG TRỰC TIẾP' in out)
        await pg.select_option('#lotTopic', 'on-thi-hinh-hoc-tinh-toan'); await pg.select_option('#lotProduct', 'phieu'); await pg.fill('#lotNote', 'thêm 1 câu có hình')
        out = await pg.input_value('#lotOut')
        ok('đổi chủ đề/sản phẩm/ghi chú cập nhật lệnh', 'on-thi-hinh-hoc-tinh-toan' in out and 'ĐÚNG 2 trang A4' in out and 'thêm 1 câu có hình' in out and 'node tools/kiem-tra.js' in out)
        await pg.select_option('#lotTopic', ''); await pg.fill('#lotCustom', 'Bài 4 lãi suất')
        ok('chủ đề tự nhập', 'Bài 4 lãi suất' in await pg.input_value('#lotOut') and await pg.locator('#lotCustomRow').is_visible())
        ids = await pg.evaluate('LenhOnThi.TOPICS.map(t=>t[0])'); L9 = (ROOT/'data/lop9.js').read_text()
        ok(f'{len(ids)} chủ đề đều có bài thật trong data/lop9.js', all(f"'{i}'" in L9 for i in ids))
        ok('không lỗi JS', not errs)
        if errs: print(errs)
        await br.close()
    bad = res.count(False); print(f"\nKẾT QUẢ: {'ĐẠT ✓' if not bad else 'CHƯA ĐẠT ✗'} ({len(res)-bad}/{len(res)})"); raise SystemExit(1 if bad else 0)
asyncio.run(main())
