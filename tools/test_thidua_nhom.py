"""Kiểm thử Thi đua theo nhóm trong trình chiếu bài giảng: chia đội, đặt vòng, chấm đúng/sai, cộng điểm/sao, xếp hạng từng vòng và chung cuộc."""
import threading, http.server, functools, socketserver, asyncio, pathlib, json, re, sys
from playwright.async_api import async_playwright
ROOT=pathlib.Path(__file__).resolve().parent.parent
http.server.SimpleHTTPRequestHandler.log_message=lambda *a:None
srv=socketserver.TCPServer(('127.0.0.1',0),functools.partial(http.server.SimpleHTTPRequestHandler,directory=str(ROOT)));PORT=srv.server_address[1]
threading.Thread(target=srv.serve_forever,daemon=True).start();API='https://mock.example/exec';BASE=f'http://127.0.0.1:{PORT}/giao-vien/index.html'
async def api(route):
 b=json.loads(route.request.post_data or '{}');a=b.get('action');body={'ok':True,'classes':['GV']} if a=='classes' else {'ok':True,'token':'T','name':'Thầy kiểm thử','lop':'GV','user':'gv','progress':{}} if a=='login' else {'ok':True}
 await route.fulfill(status=200,content_type='application/json',body=json.dumps(body))
async def main():
 out=[];ok=lambda name,c:out.append(bool(c)) or print(('✓ ' if c else '✗ ')+name)
 async with async_playwright() as p:
  br=await p.chromium.launch();pg=await br.new_page(viewport={'width':1440,'height':900});errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
  await pg.route(API,api)
  async def cfg(route):
   text=re.sub(r"sheetAPI:\s*'[^']*'",f"sheetAPI: '{API}'",(ROOT/'config.js').read_text());await route.fulfill(body=text,content_type='application/javascript')
  await pg.route('**/config.js',cfg);await pg.goto(BASE);await pg.wait_for_timeout(700);await pg.select_option('#lgLop','GV');await pg.fill('#lgUser','gv');await pg.fill('#lgPass','p');await pg.click('#lgBtn');await pg.wait_for_timeout(700)
  await pg.evaluate("Lecture.open(Lecture.BOOKS.find(b=>b.grade==='lop10').lessons[0],0)");await pg.wait_for_timeout(500)
  ok('Có nút Thi nhóm trong trình chiếu',await pg.locator('[data-k="team"]').count()==1)
  await pg.click('[data-k="team"]');await pg.select_option('#lkTeamCount','3');await pg.fill('#lkTeamClass','10A1');await pg.fill('#lkTeamRounds','2')
  for i,name in enumerate(['Đội Sao','Đội Lửa','Đội Cầu Vồng']):await pg.locator('[data-team-name]').nth(i).fill(name)
  await pg.click('#lkTeamCreate');ok('Hiện danh sách đúng 3 đội trước cuộc thi',await pg.locator('.lk-team-card').count()==3 and '3 đội · 2 vòng' in await pg.inner_text('.lk-team-ready'))
  await pg.click('#lkTeamStart')
  await pg.click('[data-team-mark="0:right"]');await pg.click('[data-team-mark="1:wrong"]');await pg.click('[data-team-mark="2:right"]')
  ok('Chấm đủ Đúng/Sai thì mở được xếp hạng vòng 1',await pg.locator('#lkTeamEnd:not([disabled])').count()==1)
  await pg.click('#lkTeamEnd');ok('Kết thúc vòng hiện bảng xếp hạng đội',await pg.locator('.lk-team-rank li').count()==3 and 'Xếp hạng vòng 1' in await pg.inner_text('.lk-team-main>header'))
  await pg.click('#lkTeamNext');await pg.click('[data-team-mark="0:wrong"]');await pg.click('[data-team-mark="1:right"]');await pg.click('[data-team-mark="2:right"]');await pg.click('#lkTeamEnd');await pg.click('#lkTeamNext')
  text=await pg.inner_text('.lk-team-rank');rows=await pg.locator('.lk-team-rank li').all_inner_texts()
  ok('Chung cuộc đúng điểm và sao: Đội Cầu Vồng dẫn đầu 20 điểm, 2 sao',rows and 'Đội Cầu Vồng' in rows[0] and '20' in rows[0] and '2 câu đúng' in rows[0] and 'Chúc mừng Đội Cầu Vồng' in text)
  dots=await pg.locator('.lk-team-rank .lk-team-rounds i').count();right=await pg.locator('.lk-team-rank .lk-team-rounds i.right').count();wrong=await pg.locator('.lk-team-rank .lk-team-rounds i.wrong').count()
  ok('Mỗi đội hiện đủ vòng tròn nhỏ có dấu đúng/sai',dots==6 and right==4 and wrong==2)
  slide=await pg.evaluate("(()=>{const s=document.querySelector('#lkSlide'),p=document.querySelector('.lk-team-panel');return {panel:Math.round(p.getBoundingClientRect().width),slide:Math.round(s.getBoundingClientRect().width),over:s.scrollHeight>s.clientHeight+1}})()")
  grip=await pg.locator('.lk-team-grip').bounding_box();await pg.mouse.move(grip['x']+7,grip['y']+grip['height']/2);await pg.mouse.down();await pg.mouse.move(grip['x']-130,grip['y']+grip['height']/2,steps=8);await pg.mouse.up();await pg.wait_for_timeout(500)
  wide=await pg.evaluate("(()=>{const s=document.querySelector('#lkSlide'),p=document.querySelector('.lk-team-panel');return {panel:Math.round(p.getBoundingClientRect().width),slide:Math.round(s.getBoundingClientRect().width),over:s.scrollHeight>s.clientHeight+1}})()")
  ok(f'Kéo bảng trái/phải: {slide["panel"]} → {wide["panel"]}px, bài chiếu tự co và không tràn',wide['panel']>slide['panel']+100 and wide['slide']<slide['slide']-100 and not wide['over'])
  await pg.screenshot(path='/tmp/thi-dua-nhom.png')
  await pg.keyboard.press('n');ok('Phím N ẩn bảng nhưng giữ kết quả',await pg.locator('.lk-team-panel[hidden]').count()==1)
  await pg.keyboard.press('n');ok('Phím N mở lại đúng bảng chung cuộc','Chúc mừng Đội Cầu Vồng' in await pg.inner_text('.lk-team-panel'))
  ok('Không có lỗi JavaScript',not errs)
  for e in errs[:3]:print('  ',e)
  await br.close()
 print('KẾT QUẢ:','ĐẠT ✓' if all(out) else 'CHƯA ĐẠT ✗');sys.exit(0 if all(out) else 1)
asyncio.run(main())
