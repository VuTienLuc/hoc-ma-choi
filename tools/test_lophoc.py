"""Kiểm thử khung “🧑‍🏫 Lớp học” (assets/js/classpanel.js) khi trình chiếu – bài giảng giáo viên và trình chiếu câu hỏi.
Ứng dụng thật (CONFIG.classApp) được thay bằng trang giả có ô nhập để kiểm tra “ẩn rồi mở lại vẫn còn nội dung”.
Kiểm tra: mở → khung phải rộng ~1/3, bản chiếu co về bên trái và không tràn; kéo thanh dọc → đổi độ rộng, chữ co giãn lại;
Ẩn → bản chiếu rộng lại; Mở lại / đóng rồi mở lại bài chiếu → còn nguyên nội dung; nhớ độ rộng.
Chạy: python3 tools/test_lophoc.py   (ảnh: /tmp/lophoc-*.png)"""
import threading, http.server, functools, socketserver, asyncio, pathlib, json, re, sys
from playwright.async_api import async_playwright
ROOT = pathlib.Path(__file__).resolve().parent.parent
http.server.SimpleHTTPRequestHandler.log_message = lambda *a: None
srv = socketserver.TCPServer(('127.0.0.1', 0), functools.partial(http.server.SimpleHTTPRequestHandler, directory=str(ROOT))); PORT = srv.server_address[1]
threading.Thread(target=srv.serve_forever, daemon=True).start()
APP = re.search(r"classApp:\s*'([^']+)'", (ROOT/'config.js').read_text()).group(1)
API = 'https://mock.example/lophoc'
FAKE = '<!doctype html><meta charset=utf-8><title>Lớp học giả</title><body style="font:20px sans-serif"><h1>Lớp học (giả lập)</h1><input id=x placeholder="ghi chú"></body>'
OVER = """(sel=>{const s=document.querySelector(sel);const over=s.scrollHeight>s.clientHeight+1||[s,...s.querySelectorAll('.lk-de,.lk-body,.lk-h,.lk-title,.pv-q,.pv-side,.pv-ans')].some(x=>x.scrollWidth>x.clientWidth+1);
  const pv=s.closest('.pv').getBoundingClientRect(),cp=document.querySelector('.cp');const c=cp&&!cp.hidden?cp.getBoundingClientRect():null;
  return {over,fs:parseFloat(getComputedStyle(s).fontSize),pvW:Math.round(pv.width),cpW:c?Math.round(c.width):0,cpL:c?Math.round(c.left):null}})"""
async def main():
  res = []; ok = lambda n, c: res.append(bool(c)) or print(('✓ ' if c else '✗ ') + n)
  async with async_playwright() as p:
    br = await p.chromium.launch()
    pg = await br.new_page(viewport={'width': 1280, 'height': 720}); errs = []; pg.on('pageerror', lambda e: errs.append(str(e)))
    async def fake(route): await route.fulfill(status=200, content_type='text/html', body=FAKE)
    await pg.route(APP.rstrip('/') + '/**', fake); await pg.route(APP, fake)
    async def api(route):
        body=json.loads(route.request.post_data or '{}'); action=body.get('action'); data={'ok':True,'classes':['GV']} if action=='classes' else {'ok':True,'token':'T','name':'Thầy kiểm thử','lop':'GV','user':'gv','progress':{}} if action=='login' else {'ok':True}
        await route.fulfill(status=200,content_type='application/json',body=json.dumps(data))
    await pg.route(API, api)
    async def cfg(route):
        t = re.sub(r"sheetAPI:\s*'[^']*'", f"sheetAPI: '{API}'", (ROOT/'config.js').read_text()); await route.fulfill(body=t, content_type='application/javascript')
    await pg.route('**/config.js', cfg)
    # ---------- Bài giảng giáo viên ----------
    await pg.goto(f'http://127.0.0.1:{PORT}/giao-vien/index.html#/lop9'); await pg.wait_for_timeout(700)
    await pg.select_option('#lgLop','GV'); await pg.fill('#lgUser','gv'); await pg.fill('#lgPass','p'); await pg.click('#lgBtn'); await pg.wait_for_timeout(700)
    await pg.evaluate("Lecture.open(Lecture.BOOKS.find(b=>b.grade==='lop9').lessons[1], 4)"); await pg.wait_for_timeout(700)
    await pg.keyboard.press('Enter'); await pg.wait_for_timeout(900)
    a = await pg.evaluate(OVER, '#lkSlide')
    ok(f'Có nút “🧑‍🏫 Lớp học” trên thanh trình chiếu', await pg.locator('#lecture [data-k="cls"]').count() == 1)
    await pg.click('#lecture [data-k="cls"]'); await pg.wait_for_timeout(1200)
    b = await pg.evaluate(OVER, '#lkSlide')
    ok(f'Mở: khung phải rộng {b["cpW"]}px (~1/3 của 1280), bản chiếu co còn {b["pvW"]}px, không tràn (chữ {a["fs"]:.0f} → {b["fs"]:.0f}px)',
       400 <= b['cpW'] <= 440 and abs(b['pvW'] + b['cpW'] - 1280) <= 2 and not b['over'] and b['fs'] <= a['fs'])
    fr = pg.frame_locator('.cp iframe'); await fr.locator('#x').fill('Tổ 2 +5 điểm')
    await pg.screenshot(path='/tmp/lophoc-mo.png')
    g = await pg.locator('.cp-grip').bounding_box()
    await pg.mouse.move(g['x'] + 8, g['y'] + g['height'] / 2); await pg.mouse.down(); await pg.mouse.move(g['x'] - 200, g['y'] + g['height'] / 2, steps=8); await pg.mouse.up(); await pg.wait_for_timeout(900)
    c = await pg.evaluate(OVER, '#lkSlide')
    ok(f'Kéo sang trái 200px: khung {b["cpW"]} → {c["cpW"]}px, bản chiếu {c["pvW"]}px, chữ co lại {c["fs"]:.0f}px, không tràn', c['cpW'] > b['cpW'] + 150 and abs(c['pvW'] + c['cpW'] - 1280) <= 2 and not c['over'])
    await pg.screenshot(path='/tmp/lophoc-keo.png')
    await pg.mouse.move(g['x'] - 190, g['y'] + g['height'] / 2); await pg.mouse.down(); await pg.mouse.move(g['x'] + 700, g['y'] + g['height'] / 2, steps=8); await pg.mouse.up(); await pg.wait_for_timeout(500)
    m = await pg.evaluate(OVER, '#lkSlide'); ok(f'Kéo quá mép phải: khung không hẹp dưới 280px ({m["cpW"]}px)', m['cpW'] >= 280)
    await pg.mouse.move(m['cpL'] + 8, g['y'] + g['height'] / 2); await pg.mouse.down(); await pg.mouse.move(1280 - 520, g['y'] + g['height'] / 2, steps=6); await pg.mouse.up(); await pg.wait_for_timeout(500)
    await pg.click('.cp [data-cp="hide"]'); await pg.wait_for_timeout(700)
    d = await pg.evaluate(OVER, '#lkSlide')
    ok(f'Ẩn: bản chiếu rộng lại {d["pvW"]}px, chữ {d["fs"]:.0f}px', d['cpW'] == 0 and d['pvW'] == 1280 and not d['over'])
    await pg.keyboard.press('l'); await pg.wait_for_timeout(700)
    v = await fr.locator('#x').input_value(); e = await pg.evaluate(OVER, '#lkSlide')
    ok(f'Phím L mở lại: vẫn còn nội dung “{v}”, độ rộng giữ {e["cpW"]}px', v == 'Tổ 2 +5 điểm' and 500 <= e['cpW'] <= 540)
    await pg.keyboard.press('Escape'); await pg.wait_for_timeout(400)
    ok('Đóng bài chiếu → khung ẩn theo', await pg.evaluate("!document.querySelector('.cp') || document.querySelector('.cp').hidden"))
    await pg.evaluate("Lecture.open(Lecture.BOOKS.find(b=>b.grade==='lop9').lessons[0], 0)"); await pg.wait_for_timeout(900)
    v = await fr.locator('#x').input_value()
    ok(f'Mở bài chiếu khác → khung tự hiện lại, còn nội dung “{v}”', v == 'Tổ 2 +5 điểm' and await pg.evaluate("!document.querySelector('.cp').hidden"))
    await pg.keyboard.press('Escape'); await pg.wait_for_timeout(300)
    # ---------- Trình chiếu câu hỏi (trang học sinh) ----------
    await pg.goto(f'http://127.0.0.1:{PORT}/index.html'); await pg.wait_for_timeout(700)
    await pg.evaluate("(()=>{const g=App.grades.find(x=>x.id==='lop9');S.grade=g;S.lesson=g.lessons.find(l=>l.id==='cung-va-day');S.lv=1;renderLesson();genSet();renderQs()})()"); await pg.wait_for_timeout(500)
    await pg.click('#presentBtn'); await pg.wait_for_timeout(900)
    await pg.keyboard.press('l'); await pg.wait_for_timeout(1300)
    f = await pg.evaluate(OVER, '#pvSlide')
    ok(f'Trình chiếu câu hỏi: khung Lớp học {f["cpW"]}px (nhớ độ rộng đã kéo), câu hỏi co vừa {f["pvW"]}px, không tràn', 500 <= f['cpW'] <= 540 and not f['over'])
    for i in range(5):
      await pg.keyboard.press('ArrowRight'); await pg.wait_for_timeout(700)
      f = await pg.evaluate(OVER, '#pvSlide')
      if f['over']: ok(f'Câu {i+2} tràn khi mở khung', False)
    await pg.screenshot(path='/tmp/lophoc-cauhoi.png')
    ok('Không có lỗi JS', not errs)
    for x in errs[:3]: print('   ', x)
    await br.close()
  print('KẾT QUẢ:', 'ĐẠT ✓' if all(res) else 'CHƯA ĐẠT ✗'); sys.exit(0 if all(res) else 1)
asyncio.run(main())
