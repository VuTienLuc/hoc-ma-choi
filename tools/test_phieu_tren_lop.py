"""Kiểm thử PHIẾU HỌC TẬP TRÊN LỚP (Lecture.addSheet): với mọi bài có phiếu —
 • Phần A (phiếu học sinh) in ra ĐÚNG 2 trang A4 (PDF thật, Chromium) và cỡ chữ tự co ≥ 8,5pt;
 • mỗi phương án trắc nghiệm A–D xếp 1 hoặc 2 dòng (không để mỗi phương án một dòng riêng);
 • không còn lỗi công thức (mjx-merror), không còn dấu $ trần; tải Markdown đúng nội dung.
Chạy: python3 tools/test_phieu_tren_lop.py"""
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
    res = []; ok = lambda n, c: res.append(bool(c)) or print(('✓ ' if c else '✗ ') + n)
    async with async_playwright() as p:
        br = await p.chromium.launch(); pg = await br.new_page(viewport={'width': 1100, 'height': 900}, accept_downloads=True); errs = []
        pg.on('pageerror', lambda e: errs.append(str(e)))
        await pg.route(re.compile(r'^https?://(?!127\.0\.0\.1)'), lambda r: r.abort()); await pg.route(API, handle)
        async def cfg(route):
            t = re.sub(r"sheetAPI:\s*'[^']*'", f"sheetAPI: '{API}'", (ROOT/'config.js').read_text()); await route.fulfill(body=t, content_type='application/javascript')
        await pg.route('**/config.js', cfg)
        await pg.goto(f'http://127.0.0.1:{PORT}/giao-vien/index.html'); await pg.wait_for_timeout(800)
        await pg.select_option('#lgLop', 'GV'); await pg.fill('#lgUser', 'u'); await pg.fill('#lgPass', 'p'); await pg.click('#lgBtn'); await pg.wait_for_timeout(900)
        sheets = await pg.evaluate("Lecture.BOOKS.flatMap((b,bi)=>b.lessons.map((l,li)=>l.sheet?{g:b.grade,id:l.id,bi,li,name:l.name}:null)).filter(Boolean)")
        ok(f'có phiếu trên lớp ({len(sheets)})', sheets)
        for s in sheets:
            w = f"{s['g']}/{s['id']}"
            await pg.evaluate(f"location.hash='#/{s['g']}'"); await pg.wait_for_timeout(500)
            await pg.evaluate(f"Lecture.classSheet(Lecture.BOOKS[{s['bi']}], Lecture.BOOKS[{s['bi']}].lessons[{s['li']}], 'A')"); await pg.wait_for_timeout(4500)
            info = await pg.evaluate("""()=>{const a=document.querySelector('.kd-a'),t=a.innerText.replace(/\\\\[\\(\\[][\\s\\S]*?\\\\[\\)\\]]/g,'');
              return {fs:+a.dataset.fs,pages:+a.dataset.pages,merr:document.querySelectorAll('.kd mjx-merror').length,mj:document.querySelectorAll('.kd mjx-container').length,dollar:(a.innerText.match(/\\$/g)||[]).length,
                opts:[...document.querySelectorAll('.kd-a .kd-opts')].map(e=>({cols:e.className.match(/o(\\d)/)[1],n:e.children.length})),
                loose:[...document.querySelectorAll('.kd-a p')].filter(p=>/^[A-D]\\.\\s/.test(p.innerText)).length}}""")
            ok(f'{w}: Phần A tự co về {info["fs"]}pt, {info["pages"]} trang (mô phỏng)', info['pages'] == 2 and info['fs'] >= 8.5)
            ok(f'{w}: công thức hiển thị ({info["mj"]}), không merror, không $ trần', info['mj'] > 0 and info['merr'] == 0 and info['dollar'] == 0)
            ok(f'{w}: phương án A–D gộp thành khối 1–2 dòng ({len(info["opts"])} khối)', info['loose'] == 0 and all(o['n'] <= 4 for o in info['opts']) and any(o['n'] == 4 and o['cols'] in '24' for o in info['opts']))
            await pg.emulate_media(media='print'); f = tempfile.mktemp(suffix='.pdf'); await pg.pdf(path=f, prefer_css_page_size=True, print_background=True); await pg.emulate_media(media='screen')
            ok(f'{w}: PDF Phần A đúng 2 trang A4 (đo thật = {pdf_pages(f)})', pdf_pages(f) == 2)
            async with pg.expect_download() as d: await pg.click('#kdDl')
            dl = await d.value; got = open(await dl.path(), encoding='utf-8-sig').read()
            src = await pg.evaluate(f"Lecture.BOOKS[{s['bi']}].lessons[{s['li']}].sheet")
            ok(f'{w}: tải Markdown "{dl.suggested_filename}" đúng nội dung', got.rstrip() == src.rstrip() and dl.suggested_filename.startswith('KD-CC - Lớp '))
        ok('không lỗi JS', not errs); await br.close()
    n = sum(res); print(f'\nKẾT QUẢ: {"ĐẠT ✓" if n == len(res) else "CHƯA ĐẠT ✗"} ({n}/{len(res)})'); raise SystemExit(0 if n == len(res) else 1)
asyncio.run(main())
