"""Xuất PDF 'Phiếu ôn tập cả chương' cho HỌC SINH (lecture.js › chapterSheet) bằng Chromium.
Dùng: python3 tools/phieu_chuong_pdf.py lop11 "Chương II" [thư-mục-ra=/tmp] [--key] [--ex=sol|ans|hide] [--cols=2] [--fs=9.5] [--no-pr] [--no-kt]
In ra đường dẫn PDF và số trang. (Trang giáo viên không cần đăng nhập vì tạm bỏ CONFIG.sheetAPI.)"""
import sys, re, json, asyncio, pathlib, threading, http.server, functools, socketserver, subprocess
from playwright.async_api import async_playwright
ROOT = pathlib.Path(__file__).resolve().parent.parent
http.server.SimpleHTTPRequestHandler.log_message = lambda *a: None
def serve():
    srv = socketserver.TCPServer(('127.0.0.1', 0), functools.partial(http.server.SimpleHTTPRequestHandler, directory=str(ROOT)))
    threading.Thread(target=srv.serve_forever, daemon=True).start(); return srv, srv.server_address[1]
def slug(s): return re.sub(r'[^A-Za-z0-9]+', '-', __import__('unicodedata').normalize('NFD', s).encode('ascii', 'ignore').decode()).strip('-')
async def render(grade, chapter, outdir='/tmp', opt=None, name=None):
    srv, port = serve(); opt = opt or {}
    async with async_playwright() as p:
        br = await p.chromium.launch(); pg = await br.new_page(viewport={'width': 1100, 'height': 900})
        await pg.route(re.compile(r'^https?://(?!127\.0\.0\.1)'), lambda r: r.abort()); await pg.route('**/config.js', lambda r: r.fulfill(body=re.sub(r"sheetAPI:\s*'[^']*'", "sheetAPI: ''", (ROOT / 'config.js').read_text()), content_type='application/javascript'))
        await pg.goto(f'http://127.0.0.1:{port}/giao-vien/index.html#/{grade}'); await pg.wait_for_function("typeof Lecture!=='undefined' && Lecture.BOOKS.length", timeout=15000)
        idx = await pg.evaluate("([g,c])=>Lecture.BOOKS.findIndex(b=>b.grade===g&&b.chapter.startsWith(c))", [grade, chapter])
        if idx < 0: raise SystemExit(f'Không thấy {grade} / {chapter}')
        await pg.evaluate("([i,o])=>Lecture.chapterSheet(Lecture.BOOKS[i],o)", [idx, opt])
        await pg.wait_for_function("window.MathJax&&MathJax.startup&&MathJax.startup.promise", timeout=15000)
        await pg.evaluate("MathJax.startup.promise.then(()=>MathJax.typesetPromise([document.querySelector('article.cs')]))"); await pg.evaluate('Lecture.chapterSheet.fit()'); await pg.wait_for_timeout(500); await pg.evaluate('Lecture.chapterSheet.fit()')
        bad = await pg.evaluate("document.querySelectorAll('article.cs mjx-merror').length")
        title = await pg.evaluate("document.querySelector('article.cs h1').textContent.trim()")
        out = str(pathlib.Path(outdir) / (name or f"Phieu-on-tap-{slug(chapter)}-{grade}.pdf"))
        await pg.pdf(path=out, prefer_css_page_size=True, print_background=True)
        over = await pg.evaluate("[...document.querySelectorAll('article.cs .cs-cols *')].filter(e=>e.scrollWidth>e.clientWidth+2&&getComputedStyle(e).display!=='inline'&&!e.closest('mjx-container')).map(e=>e.tagName+'.'+e.className+':'+e.scrollWidth+'>'+e.clientWidth+' '+e.textContent.slice(0,30))")
        await br.close()
    info = subprocess.run(['pdfinfo', out], capture_output=True, text=True).stdout
    pages = int(re.search(r'Pages:\s+(\d+)', info).group(1))
    return {'pdf': out, 'pages': pages, 'merror': bad, 'overflow': len(over), 'overflow_list': over[:6], 'title': title}
if __name__ == '__main__':
    a = [x for x in sys.argv[1:] if not x.startswith('--')]; fl = [x for x in sys.argv[1:] if x.startswith('--')]
    opt = {}
    for f in fl:
        if f == '--key': opt['key'] = True
        elif f == '--no-pr': opt['pr'] = False
        elif f == '--no-kt': opt['kt'] = False
        elif f.startswith('--ex='): opt['ex'] = f[5:]
        elif f.startswith('--cols='): opt['cols'] = int(f[7:])
        elif f.startswith('--fs='): opt['fs'] = float(f[5:])
    print(json.dumps(asyncio.run(render(a[0], a[1], a[2] if len(a) > 2 else '/tmp', opt)), ensure_ascii=False))
