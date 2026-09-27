"""Kiểm thử đăng nhập + thú cưng với máy chủ Google Sheets GIẢ LẬP (không cần mạng).
Chạy:  python3 tools/test_dangnhap.py
"""
import threading, http.server, functools, socketserver
import asyncio, pathlib, json, sys
from playwright.async_api import async_playwright
ROOT=pathlib.Path(__file__).resolve().parent.parent
H=functools.partial(http.server.SimpleHTTPRequestHandler, directory=str(ROOT))
H.log_message=lambda *a:None
srv=socketserver.TCPServer(('127.0.0.1',0),H); PORT=srv.server_address[1]
threading.Thread(target=srv.serve_forever,daemon=True).start()

BASE=f'http://127.0.0.1:{PORT}/index.html'
API='https://mock.example/exec'
saves=[]; fail_next={'n':0}
async def handle(route):
    req=route.request; b=json.loads(req.post_data or '{}')
    if b.get('action')=='classes': body={'ok':True,'classes':['10A1','11A2','9A']}
    elif b.get('action')=='login':
        if b['lop']=='9A' and b['user']=='9a_01' and b['pass']=='1111':
            body={'ok':True,'token':'T1','name':'Võ Ngọc Khánh','lop':'9A','user':'9a_01','progress':{'lop9:khai-niem-he:1':2}}
        else: body={'ok':False,'msg':'Sai tài khoản hoặc mật khẩu.'}
    elif b.get('action')=='save':
        if fail_next['n']>0: fail_next['n']-=1; await route.abort(); return
        saves.append(b); body={'ok':True}
    await route.fulfill(status=200, content_type='application/json', body=json.dumps(body))
async def main():
  async with async_playwright() as p:
    br=await p.chromium.launch(); pg=await br.new_page(viewport={'width':820,'height':1180})
    errs=[]; pg.on('pageerror',lambda e: errs.append(str(e)))
    await pg.route(API, handle)
    async def cfg(route):
        import re as _re; t=_re.sub(r"sheetAPI:\s*'[^']*'", f"sheetAPI: '{API}'", (ROOT/'config.js').read_text()); await route.fulfill(body=t, content_type='application/javascript')
    await pg.route('**/config.js', cfg)
    await pg.goto(BASE); await pg.wait_for_timeout(800)
    await pg.screenshot(path='/tmp/hoctap-e1-login.png')
    await pg.select_option('#lgLop','9A'); await pg.fill('#lgUser','9a_01'); await pg.fill('#lgPass','sai'); await pg.click('#lgBtn'); await pg.wait_for_timeout(300)
    print('Sai MK →', await pg.inner_text('#lgMsg'))
    await pg.fill('#lgPass','1111'); await pg.click('#lgBtn'); await pg.wait_for_timeout(500)
    print('Sau đăng nhập, userbar:', await pg.inner_text('.userbar'))
    await pg.goto(BASE+'#/lop9'); await pg.wait_for_timeout(400)
    print('Thẻ thú cưng:', (await pg.inner_text('.pet-card')).replace('\n',' | '))
    await pg.screenshot(path='/tmp/hoctap-e2-home.png', full_page=False)
    # làm đúng hết 1 bộ ở bài giai-he mức 1 → +3 sao → tổng 5 ≥ 3 → tiến hoá lên cấp 2
    fail_next['n']=1  # lần gửi đầu mất mạng → vào hàng đợi
    await pg.goto(BASE+'#/lop9/bai/giai-he/1'); await pg.wait_for_timeout(400)
    await pg.evaluate("""()=>{const cards=[...document.querySelectorAll('#qs .card')];S.qs.forEach((q,i)=>{const el=cards[i];
      if(q.kind==='blanks'){const ins=[...el.querySelectorAll('.blank')];let j=0;q.ans.forEach(sp=>{if(sp&&sp.frac){ins[j++].value=sp.frac[0];ins[j++].value=sp.frac[1]}else ins[j++].value=String(Array.isArray(sp)?sp[0]:sp)})}
      else el.querySelector(`[data-c="${q.correct}"]`).click(); el.querySelector('[data-check]').click();})}""")
    await pg.wait_for_timeout(2200)
    ev=await pg.query_selector('#evolve'); print('Màn tiến hoá hiện:', bool(ev), '|', (await ev.inner_text()).replace('\n',' | ') if ev else '')
    await pg.screenshot(path='/tmp/hoctap-e3-evolve.png')
    print('Lần gửi 1 (mất mạng) → hàng đợi:', await pg.evaluate("JSON.parse(localStorage.getItem('hoctap:queue')||'[]').length"))
    await pg.click('[data-close]'); 
    await pg.evaluate("Account.flush()"); await pg.wait_for_timeout(500)
    print('Sau khi có mạng: hàng đợi =', await pg.evaluate("JSON.parse(localStorage.getItem('hoctap:queue')||'[]').length"), '| số lần máy chủ nhận =', len(saves))
    if saves: s=saves[-1]; print('Dữ liệu gửi:', {k:s[k] for k in ['key','stars','setStars','score','total','grade','lesson','gradeStars','pet']})
    # sao lưu theo từng học sinh
    print('Khoá lưu sao:', await pg.evaluate("Object.keys(localStorage).filter(k=>k.includes('giai-he'))"))
    await pg.goto(BASE+'#/lop9'); await pg.wait_for_timeout(400)
    await pg.screenshot(path='/tmp/hoctap-e4-home2.png')
    await pg.goto(BASE+'#/'); await pg.wait_for_timeout(400)
    await pg.screenshot(path='/tmp/hoctap-e5-picker.png')
    print('Lỗi trang:', errs)
    ok = bool(ev) and len(saves)==1 and not errs
    print('KẾT QUẢ:', 'ĐẠT ✓' if ok else 'CHƯA ĐẠT ✗')
    await br.close()
asyncio.run(main())
srv.shutdown()
