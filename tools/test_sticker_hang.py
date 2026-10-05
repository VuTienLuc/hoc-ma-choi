"""Kiểm thử hạng kim loại của sticker: StickerDB.tierOf/nextTier (×2 Bạc, ×3 Vàng, ×5 Bạch kim, ×8 Kim cương),
Phòng Sticker hiện đúng hạng + chú giải, không lỗi JS, vệt sáng/viền kim loại có trong CSS."""
import asyncio, pathlib, threading, http.server, functools, socketserver, re, sys
from playwright.async_api import async_playwright
ROOT = pathlib.Path(__file__).resolve().parent.parent
http.server.SimpleHTTPRequestHandler.log_message = lambda *a: None
srv = socketserver.TCPServer(('127.0.0.1', 0), functools.partial(http.server.SimpleHTTPRequestHandler, directory=str(ROOT))); P = srv.server_address[1]; threading.Thread(target=srv.serve_forever, daemon=True).start()
ok_all = True
def ok(m, c):
    global ok_all; print(('✓ ' if c else '✗ ') + m); ok_all = ok_all and c
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(); pg = await b.new_page(viewport={'width': 900, 'height': 1000})
        await pg.route(re.compile(r'^https?://(?!127\.0\.0\.1)'), lambda r: r.abort())
        errs = []; pg.on('pageerror', lambda e: errs.append(str(e)))
        await pg.goto(f'http://127.0.0.1:{P}/index.html'); await pg.wait_for_timeout(1200)
        r = await pg.evaluate("[0,1,2,3,4,5,7,8,20].map(n=>{const t=StickerDB.tierOf(n);return t?t.k:null})")
        ok(f'tierOf: {r}', r == [None, None, 'silver', 'gold', 'gold', 'plat', 'plat', 'diamond', 'diamond'])
        nx = await pg.evaluate("[1,2,3,5,8].map(n=>{const t=StickerDB.nextTier(n);return t?t.k:null})")
        ok(f'nextTier: {nx}', nx == ['silver', 'gold', 'plat', 'diamond', None])
        await pg.evaluate("""()=>localStorage.setItem('hoctap:play',JSON.stringify({stickers:{'meo-kem':1,'cun-bong':2,'tho-dau':3,'gau-mat':5,'rai-ca':8},xu:0,hat:0,owned:[],wear:{},streak:1,best:1,last:'',q:{day:'',list:[]},badges:{},st:{},seen:{},mastery:{},stickerTotal:19,stickerLast:'rai-ca',rev:{},bonusDay:''}))""")
        await pg.reload(); await pg.wait_for_timeout(1200)
        await pg.evaluate("Play.open(App.grades.find(g=>g.id==='lop4')||App.grades[0],'sticker')"); await pg.wait_for_timeout(1200)
        cls = await pg.evaluate("[...document.querySelectorAll('.sticker.got')].map(e=>(e.className.match(/t-(\\w+)/)||[])[1]||'base')")
        ok(f'Phòng Sticker: hạng từng thẻ {cls}', cls == ['base', 'silver', 'gold', 'plat', 'diamond'])
        chips = await pg.evaluate("[...document.querySelectorAll('.sticker .tchip')].map(e=>e.textContent.trim())")
        ok(f'Nhãn hạng góc thẻ {chips}', len(chips) == 4)
        leg = await pg.evaluate("document.querySelector('.tier-legend')?.textContent||''")
        ok('Chú giải hạng có đủ 4 hạng', all(k in leg for k in ['Bạc', 'Vàng', 'Bạch kim', 'Kim cương']))
        bg = await pg.evaluate("getComputedStyle(document.querySelector('.sticker.t-gold')).backgroundImage")
        ok('Viền vàng là dải màu kim loại', 'linear-gradient' in bg)
        an = await pg.evaluate("getComputedStyle(document.querySelector('.sticker.t-diamond'),'::before').animationName")
        ok(f'Vệt sáng quét trên thẻ ({an})', 'stkglint' in an)
        ok('Không lỗi JS', not errs)
        await b.close()
    print('KẾT QUẢ:', 'ĐẠT ✓' if ok_all else 'CHƯA ĐẠT ✗'); sys.exit(0 if ok_all else 1)
asyncio.run(main())
