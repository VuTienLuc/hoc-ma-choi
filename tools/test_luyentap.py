"""Kiểm thử PHIẾU LUYỆN TẬP của bài giảng giáo viên (Lecture.addPractice):
mỗi phiếu có tỉ lệ cơ bản 65–75%, không lỗi công thức, bản lời giải đủ lời giải, bài vẽ hình có hệ trục trống,
chiếu từng bài ở 1280×720 và 1024×768 (hiện hết lời giải) không tràn.  Ảnh mẫu: /tmp/luyentap-*.png
Chạy: python3 tools/test_luyentap.py"""
import threading, http.server, functools, socketserver, asyncio, pathlib, json, re, sys
from playwright.async_api import async_playwright
ROOT = pathlib.Path(__file__).resolve().parent.parent
http.server.SimpleHTTPRequestHandler.log_message = lambda *a: None
H = functools.partial(http.server.SimpleHTTPRequestHandler, directory=str(ROOT))
srv = socketserver.TCPServer(('127.0.0.1', 0), H); PORT = srv.server_address[1]; threading.Thread(target=srv.serve_forever, daemon=True).start()
API = 'https://mock.example/exec'; BASE = f'http://127.0.0.1:{PORT}/giao-vien/index.html'
async def handle(route):
    b = json.loads(route.request.post_data or '{}'); a = b.get('action')
    body = {'ok': True, 'classes': ['GV']} if a == 'classes' else {'ok': True, 'token': 'T', 'name': 'Thầy Lực', 'lop': 'GV', 'user': 'u', 'progress': {}} if a == 'login' else {'ok': True}
    await route.fulfill(status=200, content_type='application/json', body=json.dumps(body))
OVER = """(()=>{const s=document.getElementById('lkSlide');const over=s.scrollHeight>s.clientHeight+1||[s,...s.querySelectorAll('.lk-de,.lk-body,.lk-h,.lk-title')].some(x=>x.scrollWidth>x.clientWidth+1);
  return {fs:parseFloat(getComputedStyle(s).fontSize),over,err:document.querySelectorAll('#lecture mjx-merror').length,pos:document.getElementById('lkPos').textContent}})()"""
async def main():
  res = []; ok = lambda n, c: res.append(bool(c)) or print(('✓ ' if c else '✗ ') + n)
  async with async_playwright() as p:
    br = await p.chromium.launch()
    for W, Hh in [(1280, 720), (1024, 768)]:
      pg = await br.new_page(viewport={'width': W, 'height': Hh}); errs = []; pg.on('pageerror', lambda e: errs.append(str(e)))
      await pg.route(API, handle)
      async def cfg(route):
          t = re.sub(r"sheetAPI:\s*'[^']*'", f"sheetAPI: '{API}'", (ROOT/'config.js').read_text()); await route.fulfill(body=t, content_type='application/javascript')
      await pg.route('**/config.js', cfg)
      await pg.goto(BASE); await pg.wait_for_timeout(700)
      await pg.select_option('#lgLop', 'GV'); await pg.fill('#lgUser', 'u'); await pg.fill('#lgPass', 'p'); await pg.click('#lgBtn'); await pg.wait_for_timeout(700)
      grades = await pg.evaluate("[...new Set(Lecture.BOOKS.filter(b=>b.lessons.some(l=>l.practice)).map(b=>b.grade))]")
      bad = []; tot = 0
      for g in grades:
        await pg.goto(BASE + '#/' + g); await pg.wait_for_timeout(500)
        keys = await pg.eval_on_selector_all('[data-pr]', 'els=>els.map(e=>e.dataset.pr)')
        if W == 1280: ok(f'{g}: {len(keys)} bài giảng có nút “🏋️ Luyện tập”', len(keys) >= 1)
        for key in keys:
          await pg.evaluate("Lecture.home()"); await pg.wait_for_timeout(300)
          await pg.click(f'[data-pr="{key}"]'); await pg.wait_for_timeout(1500)
          name = await pg.evaluate("document.querySelector('.ws h2').textContent")
          if W == 1280:
            r = await pg.evaluate("""(()=>{const t=[...document.querySelectorAll('.ws-q>p>b:first-child')].map(b=>b.textContent);const hard=t.filter(x=>x.includes('★')).length;
              const nums=t.map(x=>parseInt(x.replace('Bài ','')));
              return {n:t.length,hard,seq:nums.every((v,i)=>v===i+1),err:document.querySelectorAll('.ws mjx-merror').length,raw:/\\\\\\(|\\\\\\[/.test(document.querySelector('.ws').innerText),
                blank:document.querySelectorAll('.ws-fig.ws-blank svg').length,draw:(()=>{const [b,l]=%s;return Lecture.BOOKS[b].lessons[l].practice.flatMap(g=>g.items).filter(s=>s.draw).length})(),
                dang:document.querySelectorAll('.pr-dang').length,theory:document.querySelectorAll('.ws-kt').length}})()""" % json.dumps([int(x) for x in key.split(':')]))
            cb = (r['n'] - r['hard']) / r['n']
            ok(f'{name}: {r["n"]} bài, cơ bản {r["n"]-r["hard"]} ({cb:.0%}) – vận dụng {r["hard"]}; đánh số liền mạch; {r["dang"]} mục dạng; không lý thuyết', .65 <= cb <= .75 and r['seq'] and r['dang'] >= 2 and not r['theory'])
            ok(f'{name}: không lỗi công thức; {r["blank"]}/{r["draw"]} bài vẽ hình có hệ trục trống', not r['err'] and not r['raw'] and r['blank'] == r['draw'])
            await pg.screenshot(path=f'/tmp/luyentap-{g}-{key.replace(":","-")}.png', full_page=True)
            await pg.click('#wsKey'); await pg.wait_for_timeout(1500)
            k = await pg.evaluate("[document.querySelectorAll('.ws-q').length, [...document.querySelectorAll('.ws-q')].filter(q=>q.querySelector('.ws-sol li')).length, document.querySelectorAll('.ws mjx-merror').length, document.querySelectorAll('.ws-fig.ws-blank').length]")
            ok(f'{name}: bản lời giải – {k[1]}/{k[0]} bài có lời giải, hình đáp án đã hiện', k[0] == k[1] and not k[2] and k[3] == 0)
          # chiếu
          await pg.click('#prPlay'); await pg.wait_for_timeout(700)
          cnt = await pg.evaluate("Lecture.practiceDeck(...(([b,l])=>[Lecture.BOOKS[b],Lecture.BOOKS[b].lessons[l]])(%s)).slides.length" % json.dumps([int(x) for x in key.split(':')]))
          for i in range(cnt):
            await pg.keyboard.press('Enter'); await pg.wait_for_timeout(650)
            s = await pg.evaluate(OVER); tot += 1
            if s['over'] or s['err'] or s['fs'] < 18: bad.append((W, name, s))
            if W == 1280 and i in (1, cnt - 1) and key.endswith(':0'): await pg.screenshot(path=f'/tmp/luyentap-chieu-{g}-{i}.png')
            await pg.keyboard.press('PageDown'); await pg.wait_for_timeout(120)
            if i < cnt - 1:
              pos = await pg.inner_text('#lkPos')
              if not pos.startswith(f'{i+2}/'): await pg.keyboard.press('PageDown'); await pg.wait_for_timeout(120)
          await pg.keyboard.press('Escape'); await pg.wait_for_timeout(200)
      ok(f'{W}×{Hh}: chiếu {tot} trang luyện tập – không tràn, không lỗi, chữ ≥ 18px', not bad)
      for x in bad[:6]: print('   ', x)
      ok(f'{W}×{Hh}: không có lỗi JS', not errs)
      for e in errs[:3]: print('   ', e)
      await pg.close()
    await br.close()
  print('KẾT QUẢ:', 'ĐẠT ✓' if all(res) else 'CHƯA ĐẠT ✗'); sys.exit(0 if all(res) else 1)
asyncio.run(main())
