"""Kiểm thử ĐỀ KIỂM TRA (KiemTra.add): mỗi mã đề in ĐÚNG số trang A4 khai báo (mặc định 2; đề giữa kì 90 phút khai pages:4) (PDF thật, Chromium), không lỗi công thức (mjx-merror),
bản đáp án dựng được. Chạy: python3 tools/test_kiemtra.py [mã-lớp]   (ảnh chụp: biến môi trường KT_SHOT=thư-mục)"""
import threading, http.server, functools, socketserver, asyncio, pathlib, json, re, subprocess, tempfile
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
def pdf_pages(path):
    out = subprocess.run(['pdfinfo', path], capture_output=True, text=True).stdout
    return int(re.search(r'Pages:\s+(\d+)', out).group(1))
async def main():
    import os, sys
    res = []; ok = lambda n, c: res.append(bool(c)) or print(('✓ ' if c else '✗ ') + n)
    only = sys.argv[1] if len(sys.argv) > 1 else None; shot = os.environ.get('KT_SHOT')
    async with async_playwright() as p:
        br = await p.chromium.launch(); pg = await br.new_page(viewport={'width': 1100, 'height': 900}); errs = []
        pg.on('pageerror', lambda e: errs.append(str(e)))
        await pg.route(re.compile(r'^https?://(?!127\.0\.0\.1)'), lambda r: r.abort()); await pg.route(API, handle)
        async def cfg(route):
            t = re.sub(r"sheetAPI:\s*'[^']*'", f"sheetAPI: '{API}'", (ROOT/'config.js').read_text()); await route.fulfill(body=t, content_type='application/javascript')
        await pg.route('**/config.js', cfg)
        await pg.goto(f'http://127.0.0.1:{PORT}/giao-vien/index.html'); await pg.wait_for_timeout(800)
        await pg.select_option('#lgLop', 'GV'); await pg.fill('#lgUser', 'u'); await pg.fill('#lgPass', 'p'); await pg.click('#lgBtn'); await pg.wait_for_timeout(900)
        tests = await pg.evaluate("KiemTra.TESTS.map(t => ({g:t.grade, id:t.id, codes:t.codes, pages:t.pages || 2}))")
        ok(f'có đề kiểm tra ({len(tests)})', tests)
        for t in tests:
            if only and t['g'] != only: continue
            for c in t['codes'] + ['da']:
                w = f"{t['g']}/{t['id']} {'đáp án' if c == 'da' else 'mã ' + c}"
                await pg.goto(f"http://127.0.0.1:{PORT}/giao-vien/index.html#/{t['g']}/kiem-tra/{t['id']}/{'da' if c == 'da' else 'de-' + c}"); await pg.reload(); await pg.wait_for_timeout(2500)
                bad = await pg.evaluate("document.querySelectorAll('mjx-merror').length + (document.querySelector('.kt-doc')?.innerText.match(/\\$/g) || []).length")
                ok(f'{w}: công thức hiển thị, không merror, không $ trần', bad == 0)
                await pg.emulate_media(media='print'); f = tempfile.mktemp(suffix='.pdf'); await pg.pdf(path=f, prefer_css_page_size=True, print_background=True); await pg.emulate_media(media='screen')
                n = pdf_pages(f)
                if c != 'da': ok(f'{w}: in ĐÚNG {t["pages"]} trang A4 (đo thật = {n})', n == t['pages'])
                if shot:
                    os.makedirs(shot, exist_ok=True); subprocess.run(['pdftoppm', '-r', '70', '-png', f, f"{shot}/{t['g']}-{t['id']}-{c}"])
        ok('không lỗi JS', not errs); await br.close()
    n = sum(res); print(f'\nKẾT QUẢ: {"ĐẠT ✓" if n == len(res) else "CHƯA ĐẠT ✗"} ({n}/{len(res)})'); raise SystemExit(0 if n == len(res) else 1)
asyncio.run(main())
