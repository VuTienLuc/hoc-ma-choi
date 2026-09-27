"""Kiểm thử "Nhà thú cưng" (play.js): xu, hạt, cho ăn, chơi, cửa hàng, nhiệm vụ, huy hiệu, xếp hạng
với máy chủ Google Sheets GIẢ LẬP. Chạy:  python3 tools/test_thucung.py   (ảnh chụp lưu ở /tmp/thucung-*.png)
"""
import threading, http.server, functools, socketserver, asyncio, pathlib, json, re, sys
from playwright.async_api import async_playwright
ROOT=pathlib.Path(__file__).resolve().parent.parent
H=functools.partial(http.server.SimpleHTTPRequestHandler, directory=str(ROOT)); H.log_message=lambda *a:None
srv=socketserver.TCPServer(('127.0.0.1',0),H); PORT=srv.server_address[1]; threading.Thread(target=srv.serve_forever,daemon=True).start()
BASE=f'http://127.0.0.1:{PORT}/index.html'; API='https://mock.example/exec'
calls=[]
PROG={f'lop9:{l}:{v}':3 for l in ['khai-niem-he','giai-he','lap-he'] for v in [1,2,3]}   # 27 sao → thú đã nở
async def handle(route):
    b=json.loads(route.request.post_data or '{}'); calls.append(b); a=b.get('action')
    if a=='classes': body={'ok':True,'classes':['9A']}
    elif a=='login': body={'ok':True,'token':'T1','name':'Võ Ngọc Khánh','lop':'9A','user':'9a_01','progress':PROG,'play':''}
    elif a=='rank': body={'ok':True,'lop':'9A','rows':[
        {'name':'Võ Ngọc Khánh','stars':30,'me':True,'streak':1,'badges':3,'xu':60,'wear':{'hat':'mu-tiec'},'pets':{'lop9':2}},
        {'name':'Trần Minh Anh','stars':52,'me':False,'streak':5,'badges':6,'xu':210,'wear':{'eye':'kinh-ram','bg':'nen-bien'},'pets':{'lop9':3}},
        {'name':'Lê Gia Bảo','stars':12,'me':False,'streak':0,'badges':1,'xu':40,'wear':{},'pets':{'lop9':0}}]}
    else: body={'ok':True}
    await route.fulfill(status=200, content_type='application/json', body=json.dumps(body))
SOLVE="""()=>{const cards=[...document.querySelectorAll('#qs .card')];S.qs.forEach((q,i)=>{const el=cards[i];
  if(q.kind==='blanks'){const ins=[...el.querySelectorAll('.blank')];let j=0;q.ans.forEach(sp=>{if(sp&&sp.frac){ins[j++].value=sp.frac[0];ins[j++].value=sp.frac[1]}else ins[j++].value=String(Array.isArray(sp)?sp[0]:sp)})}
  else el.querySelector(`[data-c="${q.correct}"]`).click(); el.querySelector('[data-check]').click();})}"""
async def main():
  res=[]; ok=lambda name,c: res.append((name,bool(c))) or print(('✓ ' if c else '✗ ')+name)
  async with async_playwright() as p:
    br=await p.chromium.launch(); pg=await br.new_page(viewport={'width':820,'height':1180})
    errs=[]; pg.on('pageerror',lambda e: errs.append(str(e)))
    await pg.route(API, handle)
    async def cfg(route):
        t=re.sub(r"sheetAPI:\s*'[^']*'", f"sheetAPI: '{API}'", (ROOT/'config.js').read_text()); await route.fulfill(body=t, content_type='application/javascript')
    await pg.route('**/config.js', cfg)
    await pg.goto(BASE); await pg.wait_for_timeout(700)
    await pg.select_option('#lgLop','9A'); await pg.fill('#lgUser','9a_01'); await pg.fill('#lgPass','1111'); await pg.click('#lgBtn'); await pg.wait_for_timeout(500)
    st=lambda: pg.evaluate("JSON.parse(JSON.stringify(Play.state))")
    s0=await st(); ok('Bắt đầu: 0 xu, 3 hạt, 3 nhiệm vụ', s0['xu']==0 and s0['food']==3 and len(s0['q']['list'])==3)
    await pg.goto(BASE+'#/lop9/bai/bat-dang-thuc/1'); await pg.wait_for_timeout(500)
    await pg.evaluate(SOLVE); await pg.wait_for_timeout(600)
    s1=await st(); ok(f"Làm đúng 6 câu lần đầu: +12 xu, +5 thưởng 3 sao (xu={s1['xu']}), +3 hạt (hạt={s1['food']}), chuỗi 1 ngày", s1['xu']>=17 and s1['food']>=6 and s1['streak']==1 and s1['st']['correct']==6)
    ok('Huy hiệu “Bước đầu tiên” và “Ba sao đầu tiên”', 'buoc-dau' in s1['badges'] and 'ba-sao' in s1['badges'])
    ok('Có ô xu trên thanh công cụ bài học', 'mini-xu' in await pg.inner_html('.toolbar'))
    sv=[c for c in calls if c.get('action')=='save']; ok('Lưu bài có kèm dữ liệu thú cưng', sv and json.loads(sv[-1]['play'])['xu']==s1['xu'])
    await pg.goto(BASE+'#/lop9'); await pg.wait_for_timeout(500)
    ok('Trang khối có nhiệm vụ hôm nay', await pg.locator('.quests li').count()==3)
    await pg.screenshot(path='/tmp/thucung-1-home.png')
    await pg.click('[data-ph="care"]'); await pg.wait_for_timeout(300)
    await pg.evaluate("Play.state.no=40; Play.state.vui=30"); await pg.click('[data-tab="care"]')
    await pg.click('[data-act="feed"]'); s2=await st(); ok('Cho ăn: -1 hạt, no +25', s2['food']==s1['food']-1 and s2['no']==65)
    await pg.click('[data-act="play"]'); s3=await st(); ok('Chơi: vui +25', s3['vui']>=s2['vui']+20)
    await pg.click('[data-act="play"]'); ok('Chơi lại ngay: bé phải nghỉ', 'nghỉ' in await pg.inner_text('#phMsg'))
    await pg.screenshot(path='/tmp/thucung-2-care.png')
    await pg.evaluate("Play.state.xu=300"); await pg.click('[data-tab="shop"]')
    for it in ['mu-tiec','kinh-tron','no-co','nen-vuon']: await pg.click(f'[data-item="{it}"]')
    s4=await st(); ok(f"Mua 4 món, +10 xu huy hiệu (còn {s4['xu']} xu), đeo đủ 4 vị trí", len(s4['owned'])==4 and s4['xu']==300-30-35-20-50+10 and s4['wear']=={'hat':'mu-tiec','eye':'kinh-tron','neck':'no-co','bg':'nen-vuon'})
    ok('Huy hiệu “Nhà tạo mẫu” sau 3 món', 'thoi-trang' in s4['badges'])
    await pg.click('[data-item="kinh-tron"]'); s5=await st(); ok('Chạm món đang đeo để tháo', 'eye' not in s5['wear'])
    await pg.evaluate("Play.state.xu=5"); await pg.click('[data-item="mu-tn"]'); ok('Không đủ xu thì báo', 'cần thêm' in await pg.inner_text('#phMsg'))
    await pg.screenshot(path='/tmp/thucung-3-shop.png', full_page=True)
    await pg.click('[data-tab="quest"]'); await pg.screenshot(path='/tmp/thucung-4-quest.png')
    await pg.click('[data-tab="badge"]'); await pg.screenshot(path='/tmp/thucung-5-badge.png')
    await pg.click('[data-tab="rank"]'); await pg.wait_for_timeout(500)
    ok('Xếp hạng: 3 bạn, bạn nhiều sao nhất đứng đầu', (await pg.locator('.rank li').count())==3 and 'Trần Minh Anh' in await pg.inner_text('.rank li:first-child'))
    await pg.click('[data-rs="streak"]'); ok('Đổi cách xếp theo chuỗi ngày', 'Trần Minh Anh' in await pg.inner_text('.rank li:first-child'))
    await pg.screenshot(path='/tmp/thucung-6-rank.png')
    await pg.wait_for_timeout(3300); ok('Đồng bộ lên máy chủ (action play)', any(c.get('action')=='play' for c in calls))
    # Bỏ học 3 ngày: đói, buồn, mất chuỗi
    await pg.evaluate("(()=>{const k=Object.keys(localStorage).find(k=>k.endsWith(':play'));const d=JSON.parse(localStorage.getItem(k));d.t=Date.now()-3*864e5;d.last='2020-01-01';d.no=80;d.vui=80;localStorage.setItem(k,JSON.stringify(d));Play.reset()})()")
    await pg.goto(BASE+'#/lop4'); await pg.goto(BASE+'#/lop9'); await pg.wait_for_timeout(400)
    s6=await st(); ok(f"Sau 3 ngày không học: no={s6['no']}, vui={s6['vui']}, chuỗi=0, mặt buồn", s6['no']<25 and s6['vui']<25 and s6['streak']==0 and await pg.locator('.pet-card .pet-tear').count()>0)
    await pg.screenshot(path='/tmp/thucung-7-sad.png')
    ok('Không có lỗi trang', not errs); print(errs[:3])
    await br.close()
  allok=all(c for _,c in res); print('KẾT QUẢ:', 'ĐẠT ✓' if allok else 'CHƯA ĐẠT ✗'); sys.exit(0 if allok else 1)
asyncio.run(main())
