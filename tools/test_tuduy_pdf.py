"""Kiểm thử PHIẾU PDF ô li của các bài Toán tư duy (assets/js/tuduy-pdf.js):
 mỗi bài có l.intro → nút hiện ra, phiếu dựng được, in PDF thật (Chromium) 3–7 trang A4, không lỗi JS, có khung ô li + kiến thức trọng tâm.
Chạy: python3 tools/test_tuduy_pdf.py [--save thư-mục]"""
import threading, http.server, functools, socketserver, json, re, sys, pathlib, subprocess
from playwright.sync_api import sync_playwright
ROOT = pathlib.Path(__file__).resolve().parent.parent
http.server.SimpleHTTPRequestHandler.log_message = lambda *a: None
srv = socketserver.TCPServer(('127.0.0.1', 0), functools.partial(http.server.SimpleHTTPRequestHandler, directory=str(ROOT)))
PORT = srv.server_address[1]; threading.Thread(target=srv.serve_forever, daemon=True).start()
API = 'https://mock.example/exec'
def h(route):
    a = json.loads(route.request.post_data or '{}').get('action')
    body = {'ok': True, 'classes': ['L4', 'L9']} if a == 'classes' else {'ok': True, 'token': 'T', 'name': 'HS', 'lop': json.loads(route.request.post_data or '{}').get('lop') or 'L4', 'user': 'u', 'progress': {}} if a == 'login' else {'ok': True}
    route.fulfill(status=200, content_type='application/json', body=json.dumps(body))
save = pathlib.Path(sys.argv[sys.argv.index('--save') + 1]) if '--save' in sys.argv else None
if save: save.mkdir(parents=True, exist_ok=True)
res = []
def ok(n, c): res.append(bool(c)); print(('✓ ' if c else '✗ ') + n)
with sync_playwright() as p:
    b = p.chromium.launch(); pg = b.new_page(viewport={'width': 1000, 'height': 900}); errs = []
    pg.on('pageerror', lambda e: errs.append(str(e)))
    pg.route(re.compile(r'^https?://(?!127\.0\.0\.1)'), lambda r: r.abort()); pg.route(API, h)
    pg.route('**/config.js', lambda r: r.fulfill(body=re.sub(r"sheetAPI:\s*'[^']*'", f"sheetAPI: '{API}'", (ROOT / 'config.js').read_text()), content_type='application/javascript'))
    pg.goto(f'http://127.0.0.1:{PORT}/index.html'); pg.wait_for_timeout(800)
    pg.select_option('#lgLop', 'L4'); pg.fill('#lgUser', 'u'); pg.fill('#lgPass', 'p'); pg.click('#lgBtn'); pg.wait_for_timeout(900)
    pg.evaluate("window.print=()=>{}"); pg.on('console', lambda m: print('CONSOLE', m.text[:200]) if m.type=='error' else None)
    ids = pg.evaluate("App.grades.find(g=>g.id==='lop4').lessons.filter(l=>l.intro).map(l=>l.id)")
    ok(f'có bài Toán tư duy kèm kiến thức trọng tâm ({len(ids)})', len(ids) >= 10)
    for lid in ids:
        pg.evaluate(f"location.hash='#/lop4/bai/{lid}'"); pg.wait_for_timeout(500)
        btn = pg.evaluate("!!document.getElementById('tdsBtn')&&!!document.getElementById('tdsBtnKey')")
        def pdf_of(key, name):
            html = pg.evaluate(f"TdSheet.docHTML(App.grades.find(g=>g.id==='lop4'), App.grades.find(g=>g.id==='lop4').lessons.find(l=>l.id==='{lid}'), {str(key).lower()})")
            p2 = b.new_page(); p2.set_content(html); p2.wait_for_timeout(200)
            info = p2.evaluate("({q:document.querySelectorAll('.tds-q').length,grid:document.querySelectorAll('.tds-grid').length,kt:document.querySelectorAll('.tds-kt').length,sol:document.querySelectorAll('.tds-sol').length,figs:[...document.querySelectorAll('svg')].filter(s=>s.getBoundingClientRect().width<5).length})")
            out = (save / name) if save else pathlib.Path('/tmp/_td.pdf')
            p2.pdf(path=str(out), prefer_css_page_size=True, print_background=True); p2.close()
            pages = int(re.search(r'Pages:\s+(\d+)', subprocess.run(['pdfinfo', str(out)], capture_output=True, text=True).stdout).group(1))
            return info, pages
        info0, pages0 = pdf_of(False, f'{lid}.pdf'); info, pages = pdf_of(True, f'{lid}-key.pdf')
        pg.evaluate("document.getElementById('tdsBtn').click()"); pg.wait_for_timeout(600)
        frame_ok = pg.evaluate("(()=>{const f=document.getElementById('tdsFrame');return !!f&&f.contentDocument.querySelectorAll('.tds-q').length===9})()")
        pg.evaluate("document.getElementById('tdsFrame')?.remove()")
        good = btn and frame_ok and info['q'] == 9 and info['grid'] == 9 and info['kt'] >= 2 and info['sol'] == 9 and info['figs'] == 0 and info0['sol'] == 0
        ok(f'{lid}: nút ✓, 9 câu + 9 khung ô li + {info["kt"]} mục kiến thức, PDF học sinh {pages0} trang, kèm đáp án {pages} trang', good and 3 <= pages0 <= 5 and pages <= 8)
    # ---- Lớp 9 (có công thức): phiếu in phải VẼ công thức (khung in tự nạp MathJax), không để mã LaTeX thô \( … \) ----
    pg9 = b.new_page(viewport={'width': 1000, 'height': 900}); pg9.on('pageerror', lambda e: errs.append(str(e)))
    pg9.route(re.compile(r'^https?://(?!127\.0\.0\.1)'), lambda r: r.abort()); pg9.route(API, h)
    pg9.route('**/config.js', lambda r: r.fulfill(body=re.sub(r"sheetAPI:\s*'[^']*'", f"sheetAPI: '{API}'", (ROOT / 'config.js').read_text()), content_type='application/javascript'))
    pg9.goto(f'http://127.0.0.1:{PORT}/index.html'); pg9.wait_for_timeout(800)
    pg9.select_option('#lgLop', 'L9'); pg9.fill('#lgUser', 'u'); pg9.fill('#lgPass', 'p'); pg9.click('#lgBtn'); pg9.wait_for_timeout(900)
    ids9 = pg9.evaluate("App.grades.find(g=>g.id==='lop9').lessons.filter(l=>l.intro).map(l=>l.id)")
    ok(f'lớp 9: có bài kèm kiến thức trọng tâm ({len(ids9)})', len(ids9) >= 5)
    for lid in ids9:
        pg9.evaluate(f"location.hash='#/lop9/bai/{lid}'"); pg9.wait_for_timeout(400)
        for key in (False, True):
            html = pg9.evaluate(f"TdSheet.docHTML(App.grades.find(g=>g.id==='lop9'), App.grades.find(g=>g.id==='lop9').lessons.find(l=>l.id==='{lid}'), {str(key).lower()})")
            p2 = b.new_page(viewport={'width': 794, 'height': 1123})
            p2.route(re.compile(r'^https?://(?!127\.0\.0\.1)'), lambda r: r.abort())
            p2.route(f'http://127.0.0.1:{PORT}/_tds.html', (lambda doc: lambda r: r.fulfill(body=doc, content_type='text/html; charset=utf-8'))(html))
            p2.goto(f'http://127.0.0.1:{PORT}/_tds.html'); p2.wait_for_function('window.__mjDone===true', timeout=20000); p2.wait_for_timeout(200)
            info = p2.evaluate("""({mj:document.querySelectorAll('mjx-container').length, merr:document.querySelectorAll('mjx-merror').length,
              raw:/\\\\\\(|\\\\\\[/.test(document.body.innerText), dollar:(document.body.innerText.match(/\\$/g)||[]).length,
              wide:[...document.querySelectorAll('.tds-q *,.tds-kt *,.tds-sol *')].filter(e=>e.getBoundingClientRect().right>document.documentElement.clientWidth+1&&!e.closest('mjx-container')).length})""")
            out = (save / f'{lid}{"-key" if key else ""}.pdf') if save else pathlib.Path('/tmp/_td9.pdf')
            p2.pdf(path=str(out), prefer_css_page_size=True, print_background=True); p2.close()
            pages = int(re.search(r'Pages:\s+(\d+)', subprocess.run(['pdfinfo', str(out)], capture_output=True, text=True).stdout).group(1))
            ok(f'lớp 9 · {lid}{" (kèm đáp án)" if key else ""}: {info["mj"]} công thức đã vẽ, không merror, không mã LaTeX/$ thô, không tràn lề, {pages} trang', info['mj'] > 0 and not info['merr'] and not info['raw'] and not info['dollar'] and not info['wide'] and pages <= 12)
    # đường in thật của nút bấm: khung tdsFrame phải có công thức đã vẽ khi gọi print
    if ids9:
        pg9.evaluate(f"location.hash='#/lop9/bai/{ids9[0]}'"); pg9.wait_for_timeout(500)
        pg9.evaluate("window.__printed=0; window.print=()=>{}"); pg9.evaluate("document.getElementById('tdsBtn').click()")
        pg9.wait_for_function("(()=>{const f=document.getElementById('tdsFrame');return !!f&&f.contentWindow.__mjDone===true&&f.contentDocument.querySelectorAll('mjx-container').length>0})()", timeout=20000)
        ok('lớp 9: bấm 📄 Phiếu PDF → khung in đã vẽ công thức trước khi mở hộp thoại in', True)
        pg9.evaluate("document.getElementById('tdsFrame')?.remove()")
    ok('không lỗi JS', not errs)
    if errs: print(errs[:3])
    b.close()
print(f'\nKẾT QUẢ: {"ĐẠT ✓" if all(res) else "CHƯA ĐẠT ✗"} ({sum(res)}/{len(res)})'); sys.exit(0 if all(res) else 1)
