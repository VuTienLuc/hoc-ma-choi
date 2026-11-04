"""Kiểm thử menu Markdown ⇄ Word (assets/js/md-word.js + word-equation.js):
 • trang #/md-word: nhập file .md, xem trước có công thức, tải lại .md đúng nội dung;
 • xuất .docx từ bộ thử 17 kiểu hệ phương trình của /word-equation: 0 công thức lỗi, đủ 18 hệ, ngoặc co giãn (m:d), không còn ký tự ¿ hay mã LaTeX thô;
 • phiếu trên lớp: nút “Xuất Word” cho ra .docx mở được bằng python-docx;
 • mẫu thử (bảng, trích dẫn, A–D, ngắt trang) xuất không lỗi.
Chạy: python3 tools/test_md_word.py"""
import threading, http.server, functools, socketserver, asyncio, pathlib, json, re, tempfile, zipfile
from playwright.async_api import async_playwright
ROOT = pathlib.Path(__file__).resolve().parent.parent
http.server.SimpleHTTPRequestHandler.log_message = lambda *a: None
H = functools.partial(http.server.SimpleHTTPRequestHandler, directory=str(ROOT))
srv = socketserver.TCPServer(('127.0.0.1', 0), H); PORT = srv.server_address[1]; threading.Thread(target=srv.serve_forever, daemon=True).start()
API = 'https://mock.example/exec'
BO_THU = r'''1. $\begin{cases}x+y=3\\2x-y=0\end{cases}$
2. $\left\{ \begin{array}{l} x + 2y = 5 \\ 3x - y = 1 \end{array} \right.$
3. $\left\{\begin{cases} x^2+y^2=5 \\ xy=2 \end{cases}\right.$
4. $\\begin{cases} x-y=1 \\\\ x+y=5 \\\\ \\end{cases}$
5. $\begin{cases} 2x+y=4
x-y=-1 \end{cases}$
6. $\begin{cases} x=1 \ y=2 \end{cases}$
7. $\left\{\begin{matrix} \dfrac{1}{x}+\dfrac{1}{y}=2 \\ x+y=4 \end{matrix}\right.$
8. $\left\{\begin{aligned} x&=2t+1\\ y&=-t \end{aligned}\right.$
9. $\{\begin{array}{l} x>0 \\ x<3 \end{array}$
10. $\systeme{x+y=7, x-y=1}$
11. $\left\{ x+y=1 \\ x-y=3 \right.$
12. $\left[\begin{array}{l} x=1 \\ x=-2 \end{array}\right.$
13. $\left\{\begin{array}{l} x\ge 0 \\ \left[\begin{array}{l} y=1\\ y=2\end{array}\right. \end{array}\right.$
14. $f(x)=\begin{cases} x^2 & \text{nếu } x\ge 0\\ -x & \text{nếu } x<0\end{cases}$
15. Giải hệ \begin{cases} x+y=10\\ x-y=2 \end{cases} ta được nghiệm.
16. $\begin{cases} x+y=1 \\[2mm] \dfrac{x}{2}=y \end{cases}$
17. $\left(\dfrac{a+b}{2}\right)^2 \ge ab$
⎧ x + y = 3
⎨
⎩ x − y = 1
'''
async def handle(route):
    b = json.loads(route.request.post_data or '{}'); a = b.get('action')
    body = {'ok': True, 'classes': ['GV']} if a == 'classes' else {'ok': True, 'token': 'T', 'name': 'Thầy', 'lop': 'GV', 'user': 'u', 'progress': {}} if a == 'login' else {'ok': True}
    await route.fulfill(status=200, content_type='application/json', body=json.dumps(body))
def docx_xml(path):
    return zipfile.ZipFile(path).read('word/document.xml').decode('utf-8')
async def main():
    res = []; ok = lambda n, c: res.append(bool(c)) or print(('✓ ' if c else '✗ ') + n)
    async with async_playwright() as p:
        br = await p.chromium.launch(); pg = await br.new_page(viewport={'width': 1200, 'height': 900}, accept_downloads=True); errs = []
        pg.on('pageerror', lambda e: errs.append(str(e)))
        await pg.route(re.compile(r'^https?://(?!127\.0\.0\.1)'), lambda r: r.abort()); await pg.route(API, handle)
        async def cfg(route):
            t = re.sub(r"sheetAPI:\s*'[^']*'", f"sheetAPI: '{API}'", (ROOT/'config.js').read_text()); await route.fulfill(body=t, content_type='application/javascript')
        await pg.route('**/config.js', cfg)
        await pg.goto(f'http://127.0.0.1:{PORT}/giao-vien/index.html'); await pg.wait_for_timeout(800)
        await pg.select_option('#lgLop', 'GV'); await pg.fill('#lgUser', 'u'); await pg.fill('#lgPass', 'p'); await pg.click('#lgBtn'); await pg.wait_for_timeout(900)
        ok('trang chủ có nút menu “Markdown ⇄ Word”', await pg.locator('a[href="#/md-word"]').count() >= 1)
        await pg.click('a[href="#/md-word"]'); await pg.wait_for_timeout(600)
        ok('mở được trang #/md-word', await pg.locator('#mwText').count() == 1)
        # 1) nhập file .md
        src = ROOT / 'tools' / '_mw_thu.md'; src.write_text('﻿' + BO_THU, encoding='utf-8')
        try:
            await pg.set_input_files('#mwFile', str(src)); await pg.wait_for_timeout(1500)
            ok('nhập file .md vào ô soạn', (await pg.input_value('#mwText')).startswith('1. $'))
            ok('xem trước có công thức MathJax, không merror', await pg.locator('#mwPrev mjx-container').count() > 10 and await pg.locator('#mwPrev mjx-merror').count() == 0)
            async with pg.expect_download() as d: await pg.click('#mwMd')
            dl = await d.value; got = open(await dl.path(), encoding='utf-8-sig').read()
            ok(f'tải .md "{dl.suggested_filename}" đúng nội dung', got == BO_THU and dl.suggested_filename == '_mw_thu.md')
            # 2) xuất Word từ bộ thử
            async with pg.expect_download() as d: await pg.click('#mwDocx')
            dl = await d.value; f = await dl.path(); x = docx_xml(f); st = await pg.inner_text('#mwStatus')
            ok(f'xuất Word: {st}', dl.suggested_filename == '_mw_thu.docx' and 'Đã tạo' in st)
            nd = len(re.findall(r'<m:d>', x)); nsys = len(re.findall(r'<m:begChr m:val="[{\[]"', x))
            ok(f'18 hệ phương trình/hoặc → ngoặc co giãn m:d ({nsys} ngoặc nhọn/vuông, {nd} m:d)', nsys == 18)
            ok('0 công thức lỗi (không có chữ đỏ C00000)', 'C00000' not in x and 'lỗi' not in st)
            ok('không còn ký tự ¿ hay \\begin lộ ra', '¿' not in x and '\\begin' not in x and 'WEQFENCE' not in x)
            import docx; d0 = docx.Document(f); ok(f'python-docx mở được ({len(d0.paragraphs)} đoạn)', len(d0.paragraphs) >= 17)
            pg.context.pages[0]
            import shutil; shutil.copy(f, '/tmp/mw_bo_thu.docx')
        finally:
            src.unlink(missing_ok=True)
        # 3) mẫu thử có bảng, trích dẫn, A–D
        await pg.click('#mwSample'); await pg.wait_for_timeout(1200)
        ok('xem trước mẫu có bảng và khối A–D', await pg.locator('#mwPrev table').count() == 1 and await pg.locator('#mwPrev .kd-opts').count() == 1)
        async with pg.expect_download() as d: await pg.click('#mwDocx')
        dl = await d.value; f = await dl.path(); x = docx_xml(f)
        ok('mẫu thử: có bảng w:tbl, đủ Equation, không lỗi', '<w:tbl>' in x and x.count('<m:oMath') >= 8 and 'C00000' not in x)
        import docx; docx.Document(f)
        # 4) phiếu trên lớp
        await pg.evaluate("location.hash='#/lop11'"); await pg.wait_for_timeout(600)
        idx = await pg.evaluate("(()=>{for(const [bi,b] of Lecture.BOOKS.entries())for(const [li,l] of b.lessons.entries())if(l.sheet&&b.grade==='lop11')return [bi,li]})()")
        await pg.evaluate(f"Lecture.classSheet(Lecture.BOOKS[{idx[0]}], Lecture.BOOKS[{idx[1] if False else idx[0]}].lessons[{idx[1]}], 'all')"); await pg.wait_for_timeout(2500)
        async with pg.expect_download() as d: await pg.click('#kdWord')
        dl = await d.value; f = await dl.path(); x = docx_xml(f)
        ok(f'phiếu trên lớp → "{dl.suggested_filename}": mở được, có Equation, có ngắt trang, không lỗi', dl.suggested_filename.endswith('.docx') and x.count('<m:oMath') > 10 and 'w:type="page"' in x and 'C00000' not in x)
        docx.Document(f)
        ok('không lỗi JS', not errs); print(errs[:3]); await br.close()
    n = sum(res); print(f'\nKẾT QUẢ: {"ĐẠT ✓" if n == len(res) else "CHƯA ĐẠT ✗"} ({n}/{len(res)})'); raise SystemExit(0 if n == len(res) else 1)
asyncio.run(main())
