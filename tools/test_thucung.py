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
    if await pg.locator('#gameAvatarPick [data-avatar]').count(): await pg.locator('#gameAvatarPick [data-avatar]').first.click()
    st=lambda: pg.evaluate("JSON.parse(JSON.stringify(Play.state))")
    item_info=await pg.evaluate("Play.ITEMS.filter(x=>x.slot==='hand').map(({id,grade,stars,price})=>({id,grade,stars,price}))")
    by_grade={g:sum(1 for x in item_info if x['grade']==g) for g in ['lop4','lop8','lop9','lop10','lop11']}
    ok('Có 10 vật phẩm cầm tay, mỗi lớp đúng 2 món', len(item_info)==10 and len({x['id'] for x in item_info})==10 and all(n==2 for n in by_grade.values()))
    ok('Vật phẩm cầm tay có đủ mốc sao và giá đổi', all(x['stars'] in [18,36] and x['price'] in [120,200] for x in item_info))
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
    # Phần thưởng sticker xuất hiện trễ để nối tiếp thông báo; chờ rồi đóng trước khi mở Nhà thú cưng.
    await pg.wait_for_timeout(2100)
    for sel in ['#stickerReward [data-close]','#evolve [data-close]']:
      if await pg.locator(sel).count(): await pg.click(sel)
    await pg.click('[data-ph="care"]'); await pg.wait_for_timeout(300)
    await pg.evaluate("Play.state.no=40; Play.state.vui=30"); await pg.click('[data-tab="care"]')
    await pg.click('[data-act="feed"]'); s2=await st(); ok('Cho ăn: -1 hạt, no +25', s2['food']==s1['food']-1 and s2['no']==65)
    await pg.click('[data-act="play"]'); s3=await st(); ok('Chơi: vui +25', s3['vui']>=s2['vui']+20)
    await pg.click('[data-act="play"]'); ok('Chơi lại ngay: bé phải nghỉ', 'nghỉ' in await pg.inner_text('#phMsg'))
    await pg.screenshot(path='/tmp/thucung-2-care.png')
    await pg.evaluate("""()=>{const g=App.grades.find(x=>x.id==='lop9');g.lessons.forEach(l=>[1,2,3].forEach(lv=>store.set(bestKey(l.id,lv,g),0)));Play.state.xu=300}"""); await pg.click('[data-tab="shop"]')
    ok('Cửa hàng lớp 9 chỉ hiện 2 vật phẩm cầm tay đúng lớp', await pg.locator('[data-item="truong-can-thuc"], [data-item="khien-duong-tron"]').count()==2 and await pg.locator('[data-item="gay-sao-so-hoc"], [data-item="kiem-vecto"]').count()==0)
    ok('Hai vật phẩm lớp 9 được vẽ SVG riêng', await pg.locator('[data-item="truong-can-thuc"] .acc-hand, [data-item="khien-duong-tron"] .acc-hand').count()==2)
    await pg.click('[data-item="truong-can-thuc"]'); ok('Chưa đủ 18 sao thì vật phẩm vẫn khóa và báo số sao còn thiếu', 'cần thêm' in (await pg.inner_text('#phMsg')).lower() and '⭐' in await pg.inner_text('#phMsg'))
    for it in ['mu-tiec','kinh-tron','no-co','nen-vuon']: await pg.click(f'[data-item="{it}"]')
    s4=await st(); ok(f"Mua 4 món, +10 xu huy hiệu (còn {s4['xu']} xu), đeo đủ 4 vị trí", len(s4['owned'])==4 and s4['xu']==300-30-35-20-50+10 and s4['wear']=={'hat':'mu-tiec','eye':'kinh-tron','neck':'no-co','bg':'nen-vuon'})
    ok('Huy hiệu “Nhà tạo mẫu” sau 3 món', 'thoi-trang' in s4['badges'])
    await pg.click('[data-item="kinh-tron"]'); s5=await st(); ok('Chạm món đang đeo để tháo', 'eye' not in s5['wear'])
    await pg.evaluate("""()=>{const g=App.grades.find(x=>x.id==='lop9');let total=gradeStars(g);outer:for(const l of g.lessons)for(const lv of [1,2,3]){if(total>=18)break outer;const k=bestKey(l.id,lv,g),old=Number(store.get(k))||0;if(old<3){store.set(k,3);total+=3-old}}Play.state.xu=500}""")
    await pg.click('[data-tab="shop"]'); ok('Đủ 18 sao thì Trượng Căn Thức được mở khóa', await pg.locator('[data-item="truong-can-thuc"].locked').count()==0 and '120' in await pg.inner_text('[data-item="truong-can-thuc"]'))
    await pg.click('[data-item="truong-can-thuc"]'); s_hand=await st(); ok('Đổi vật phẩm trừ đúng xu và tự cầm trên tay', s_hand['xu']==380 and s_hand['wear'].get('hand')=='truong-can-thuc' and 'truong-can-thuc' in s_hand['owned'])
    ok('Thẻ vật phẩm hiển thị đúng hình SVG và trạng thái đang dùng', await pg.locator('[data-item="truong-can-thuc"].on .acc-hand').count()==1 and 'Đang dùng' in await pg.inner_text('[data-item="truong-can-thuc"]'))
    await pg.set_viewport_size({'width':390,'height':844}); await pg.wait_for_timeout(150)
    hand_box=await pg.locator('[data-item="truong-can-thuc"]').bounding_box(); ok('Thẻ vật phẩm cầm tay nằm gọn trên điện thoại', hand_box and hand_box['x']>=0 and hand_box['x']+hand_box['width']<=390)
    await pg.set_viewport_size({'width':820,'height':1180})
    await pg.evaluate("Play.state.xu=5"); await pg.click('[data-item="mu-tn"]'); ok('Không đủ xu thì báo', 'cần thêm' in await pg.inner_text('#phMsg'))
    await pg.screenshot(path='/tmp/thucung-3-shop.png', full_page=True)
    await pg.click('[data-tab="quest"]'); await pg.screenshot(path='/tmp/thucung-4-quest.png')
    await pg.click('[data-tab="badge"]'); await pg.screenshot(path='/tmp/thucung-5-badge.png')
    await pg.click('[data-tab="rank"]'); await pg.wait_for_timeout(500)
    ok('Xếp hạng: 3 bạn, bạn nhiều sao nhất đứng đầu', (await pg.locator('.rank li').count())==3 and 'Trần Minh Anh' in await pg.inner_text('.rank li:first-child'))
    await pg.click('[data-rs="streak"]'); ok('Đổi cách xếp theo chuỗi ngày', 'Trần Minh Anh' in await pg.inner_text('.rank li:first-child'))
    await pg.screenshot(path='/tmp/thucung-6-rank.png')
    await pg.wait_for_timeout(3300); ok('Đồng bộ lên máy chủ (action play)', any(c.get('action')=='play' for c in calls))
    # Nghỉ 15 ngày: ngày 8 trừ 1 sao, ngày 15 trừ thêm 1 sao; tải lại không được trừ lặp
    stars0=await pg.evaluate("gradeStars(App.grades[0])")
    await pg.evaluate("""()=>{const k=Object.keys(localStorage).find(k=>k.endsWith(':play'));const d=JSON.parse(localStorage.getItem(k));const x=new Date(Date.now()-15*864e5);d.last=`${x.getFullYear()}-${String(x.getMonth()+1).padStart(2,'0')}-${String(x.getDate()).padStart(2,'0')}`;d.absence={base:'',applied:0,lost:0,caps:{},lastLoss:null};d.ts=Date.now();localStorage.setItem(k,JSON.stringify(d));Play.reset()}""")
    await pg.reload(); await pg.wait_for_timeout(700)
    stars1=await pg.evaluate("gradeStars(App.grades[0])"); s_idle=await st()
    ok(f'Nghỉ 15 ngày: trừ đúng 2 sao ({stars0} → {stars1})', stars1==stars0-2 and s_idle['absence']['lost']==2 and s_idle['absence']['applied']==2)
    ok('Hiện cảnh báo số ngày nghỉ, cách dừng trừ và lấy lại sao', await pg.locator('.study-warning.loss').count()==1 and 'lấy lại' in (await pg.inner_text('.study-warning.loss')).lower())
    await pg.screenshot(path='/tmp/thucung-8-nghi-lau.png', full_page=True)
    caps=s_idle['absence']['caps']; ck=next(iter(caps)); ok('Giữ mức sao đã trừ khi nhận lại tiến độ máy chủ', await pg.evaluate("([k,v])=>Play.progressValue(k,3)===v", [ck,caps[ck]]))
    await pg.evaluate("Play.checkInactivity()"); ok('Cùng một mốc nghỉ không bị trừ lặp khi tải lại', await pg.evaluate("gradeStars(App.grades[0])")==stars1)
    # Bỏ học 3 ngày: đói, buồn, mất chuỗi
    await pg.evaluate("(()=>{const k=Object.keys(localStorage).find(k=>k.endsWith(':play'));const d=JSON.parse(localStorage.getItem(k));d.t=Date.now()-3*864e5;d.last='2020-01-01';d.no=80;d.vui=80;localStorage.setItem(k,JSON.stringify(d));Play.reset()})()")
    await pg.goto(BASE+'#/lop4'); await pg.goto(BASE+'#/lop9'); await pg.wait_for_timeout(400)
    s6=await st(); ok(f"Sau 3 ngày không học: no={s6['no']}, vui={s6['vui']}, chuỗi=0, mặt buồn", s6['no']<25 and s6['vui']<25 and s6['streak']==0 and await pg.evaluate("Play.look().mood==='buon'"))
    await pg.screenshot(path='/tmp/thucung-7-sad.png')
    ok('Không có lỗi trang', not errs); print(errs[:3])
    await br.close()
  allok=all(c for _,c in res); print('KẾT QUẢ:', 'ĐẠT ✓' if allok else 'CHƯA ĐẠT ✗'); sys.exit(0 if allok else 1)
asyncio.run(main())
