"""Kiểm thử 'Phiếu ôn tập cả chương' (lecture.js › chapterSheet): mọi chương có bài giảng đều xuất được PDF
không lỗi công thức, không tràn cột, số trang hợp lý; thử các tuỳ chọn (ẩn ví dụ, kèm lời giải mẫu, 1 cột)."""
import sys, asyncio, pathlib, tempfile
sys.path.insert(0, str(pathlib.Path(__file__).resolve().parent))
from phieu_chuong_pdf import render, ROOT
import re, json
from playwright.async_api import async_playwright
import phieu_chuong_pdf as P
ok = True
def chk(c, m):
    global ok
    print(('✓ ' if c else '✗ ') + m)
    ok = ok and c
async def chapters():
    srv, port = P.serve()
    async with async_playwright() as p:
        br = await p.chromium.launch(); pg = await br.new_page()
        await pg.route(re.compile(r'^https?://(?!127\.0\.0\.1)'), lambda r: r.abort())
        await pg.route('**/config.js', lambda r: r.fulfill(body=re.sub(r"sheetAPI:\s*'[^']*'", "sheetAPI: ''", (ROOT / 'config.js').read_text()), content_type='application/javascript'))
        await pg.goto(f'http://127.0.0.1:{port}/giao-vien/index.html'); await pg.wait_for_function("typeof Lecture!=='undefined' && Lecture.BOOKS.length", timeout=15000)
        r = await pg.evaluate("Lecture.BOOKS.map(b=>({g:b.grade,c:b.chapter.split('.')[0],n:b.lessons.length,btn:true}))")
        btn = await pg.evaluate("typeof Lecture.chapterSheet==='function'")
        await br.close()
    return r, btn
async def main():
    bs, fn = await chapters()
    chk(fn, 'Lecture.chapterSheet có sẵn')
    out = tempfile.mkdtemp()
    for b in bs:
        r = await render(b['g'], b['c'], out, {}, f"t-{b['g']}-{P.slug(b['c'])}.pdf")
        chk(r['merror'] == 0 and r['overflow'] == 0 and 1 <= r["pages"] <= 16, f"{b['g']} {b['c']} ({b['n']} bài): {r['pages']} trang, merror {r['merror']}, tràn {r['overflow']}")
    a = await render('lop11', 'Chương II', out, {}, 'a.pdf')
    h = await render('lop11', 'Chương II', out, {'ex': 'hide'}, 'h.pdf')
    c1 = await render('lop11', 'Chương II', out, {'cols': 1}, 'c1.pdf')
    nl = await render('lop11', 'Chương II', out, {'ln': False}, 'nl.pdf')
    chk(4 <= nl['pages'] < a['pages'] <= 7, f"Chương II: có dòng kẻ {a["pages"]} trang, không dòng kẻ {nl["pages"]} trang")
    import subprocess
    txt = subprocess.run(['pdftotext', a['pdf'], '-'], capture_output=True, text=True).stdout
    chk('dòng kẻ' in txt, 'tiêu đề phiếu nhắc dòng kẻ làm bài')
    chk(h['pages'] <= a['pages'] and h['merror'] == 0, f"ẩn ví dụ: {h['pages']} trang")
    chk(c1['pages'] >= a['pages'] and c1['merror'] == 0, f"1 cột: {c1['pages']} trang")
    print('KẾT QUẢ:', 'ĐẠT ✓' if ok else 'CHƯA ĐẠT ✗'); sys.exit(0 if ok else 1)
asyncio.run(main())
