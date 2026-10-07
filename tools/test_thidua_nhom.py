"""Kiểm thử Thi đua theo nhóm: chia theo số thứ tự hoặc danh sách lớp, Ngôi sao hy vọng, chấm điểm và kéo ngăn trình chiếu."""
import threading, http.server, functools, socketserver, asyncio, pathlib, json, re, sys
from playwright.async_api import async_playwright
ROOT=pathlib.Path(__file__).resolve().parent.parent
http.server.SimpleHTTPRequestHandler.log_message=lambda *a:None
srv=socketserver.TCPServer(('127.0.0.1',0),functools.partial(http.server.SimpleHTTPRequestHandler,directory=str(ROOT)));PORT=srv.server_address[1]
threading.Thread(target=srv.serve_forever,daemon=True).start();API='https://mock.example/exec';BASE=f'http://127.0.0.1:{PORT}/giao-vien/index.html'
NAMES=['An','Bình','Chi','Dũng','Giang','Hà','Khôi','Lan','Minh']
async def api(route):
 b=json.loads(route.request.post_data or '{}');a=b.get('action')
 if a=='classes':body={'ok':True,'classes':['GV']}
 elif a=='login':body={'ok':True,'token':'T','name':'Thầy kiểm thử','lop':'GV','user':'gv','progress':{}}
 elif a=='rankAll':body={'ok':True,'grade':'lop10','classes':[{'lop':'10A1','rows':[{'name':n,'user':f'hs{i+1}','joined':True} for i,n in enumerate(NAMES)]},{'lop':'10A2','rows':[{'name':f'Bạn {i+1}','user':f'b{i+1}','joined':False} for i in range(6)]}]}
 else:body={'ok':True}
 await route.fulfill(status=200,content_type='application/json',body=json.dumps(body))
async def main():
 out=[];ok=lambda name,c:out.append(bool(c)) or print(('✓ ' if c else '✗ ')+name)
 async with async_playwright() as p:
  br=await p.chromium.launch();pg=await br.new_page(viewport={'width':1440,'height':900});errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
  await pg.route(API,api)
  async def cfg(route):
   text=re.sub(r"sheetAPI:\s*'[^']*'",f"sheetAPI: '{API}'",(ROOT/'config.js').read_text());await route.fulfill(body=text,content_type='application/javascript')
  await pg.route('**/config.js',cfg);await pg.goto(BASE);await pg.wait_for_timeout(700);await pg.select_option('#lgLop','GV');await pg.fill('#lgUser','gv');await pg.fill('#lgPass','p');await pg.click('#lgBtn');await pg.wait_for_timeout(700)
  for kind,js in [('phiếu luyện tập','(()=>{const b=Lecture.BOOKS.find(b=>b.grade==="lop10"&&b.lessons.some(l=>l.practice));return Lecture.practiceDeck(b,b.lessons.find(l=>l.practice))})()'),('giải SGK','(()=>{const l=Lecture.BOOKS.filter(b=>b.grade==="lop10").flatMap(b=>b.lessons).find(l=>l.sgk);return Lecture.sgkDeck(l)})()')]:
   await pg.evaluate("Lecture.open("+js+",0)");await pg.wait_for_timeout(300);await pg.evaluate('(()=>{try{localStorage.clear()}catch(e){}})()');await pg.click('[data-k="team"]',timeout=4000);await pg.wait_for_timeout(1200)
   ok('Thi nhóm tải được danh sách lớp khi trình chiếu '+kind,await pg.locator('#lkTeamClass').count()==1)
   await pg.keyboard.press('Escape');await pg.evaluate('(()=>{const e=document.querySelector("#lecture");if(e)e.remove()})()');await pg.wait_for_timeout(200)
  await pg.evaluate("Lecture.open(Lecture.BOOKS.find(b=>b.grade==='lop10').lessons[0],0)");await pg.wait_for_timeout(500)
  ok('Có nút Thi nhóm trong trình chiếu',await pg.locator('[data-k="team"]').count()==1)
  await pg.click('[data-k="team"]');await pg.wait_for_selector('#lkTeamClass')
  await pg.select_option('#lkTeamMethod','numbers');await pg.wait_for_selector('#lkTeamNumberTotal');await pg.locator('#lkTeamNumberTotal').evaluate("e=>e.value='10'");await pg.select_option('#lkTeamCount','3');await pg.fill('#lkTeamRounds','2')
  await pg.click('#lkTeamCreate');number_groups=await pg.locator('.lk-team-members').all_inner_texts();number_ready=await pg.inner_text('.lk-team-ready')
  ok('Chia 10 số thứ tự vào 3 đội cân bằng, không dùng tên học sinh',number_groups==['STT: 1, 4, 7, 10','STT: 2, 5, 8','STT: 3, 6, 9'] and '10 số thứ tự' in number_ready)
  number_font=await pg.locator('.number-ready .lk-team-members').first.evaluate("e=>parseFloat(getComputedStyle(e).fontSize)");ok(f'Số thứ tự là nội dung lớn nhất, nhìn rõ từ xa ({number_font:.0f}px)',number_font>=24)
  await pg.screenshot(path='/tmp/chia-nhom-theo-so.png')
  await pg.click('#lkTeamReset');await pg.select_option('#lkTeamMethod','roster');await pg.wait_for_selector('#lkTeamClass')
  opts=await pg.locator('#lkTeamClass option').all_inner_texts();ok('Lớp được lấy từ danh sách có sẵn của khối 10',opts==['10A1 · 9 học sinh','10A2 · 6 học sinh'])
  await pg.select_option('#lkTeamClass','10A1');await pg.select_option('#lkTeamCount','3');await pg.fill('#lkTeamRounds','2');await pg.check('#lkTeamHope')
  for i,name in enumerate(['Đội Sao','Đội Lửa','Đội Cầu Vồng']):await pg.locator('[data-team-name]').nth(i).fill(name)
  await pg.click('#lkTeamCreate')
  ready=await pg.inner_text('.lk-team-ready');members=' '.join(await pg.locator('.lk-team-members').all_inner_texts())
  ok('Chia đủ 9 học sinh có sẵn vào 3 đội cân bằng',await pg.locator('.lk-team-card').count()==3 and ready.count('3 HS')==3 and all(members.count(n)==1 for n in NAMES))
  ok('Hiện rõ chế độ mỗi đội có một Ngôi sao hy vọng','Mỗi đội có một Ngôi sao hy vọng' in ready)
  await pg.click('#lkTeamStart')
  star_box=await pg.locator('[data-team-hope="0"]').bounding_box();mark_box=await pg.locator('[data-team-mark="0:right"]').bounding_box();await pg.click('[data-team-hope="0"]')
  confirm_text=await pg.inner_text('.lk-team-hope-confirm');ok('Ngôi sao nằm bên dưới và hỏi xác nhận rõ tên đội, số vòng',star_box['y']>mark_box['y'] and 'Xác nhận Đội Sao dùng 🌟 ở vòng 1?' in confirm_text)
  await pg.click('[data-team-hope-confirm="0"]');ok('Xác nhận xong mới đặt Ngôi sao hy vọng',await pg.locator('[data-team-hope="0"].on').count()==1)
  await pg.click('[data-team-mark="0:right"]');await pg.click('[data-team-mark="1:wrong"]');await pg.click('[data-team-mark="2:right"]')
  cards=await pg.locator('.lk-team-card').all_inner_texts();ok('Ngôi sao hy vọng đúng được +30 điểm',cards[0].startswith('Đội Sao\n30đ'))
  ok('Chấm đủ Đúng/Sai thì mở được xếp hạng vòng 1',await pg.locator('#lkTeamEnd:not([disabled])').count()==1)
  await pg.click('#lkTeamEnd');ok('Kết thúc vòng hiện bảng xếp hạng đội',await pg.locator('.lk-team-rank li').count()==3 and 'Xếp hạng vòng 1' in await pg.inner_text('.lk-team-main>header'))
  await pg.click('#lkTeamNext')
  ok('Đội đã dùng không thể đặt Ngôi sao hy vọng lần thứ hai',await pg.locator('[data-team-hope="0"]:disabled').count()==1)
  await pg.click('[data-team-mark="0:wrong"]');await pg.click('[data-team-hope="1"]');await pg.click('[data-team-hope-confirm="1"]');await pg.click('[data-team-mark="1:wrong"]');await pg.click('[data-team-mark="2:right"]')
  cards=await pg.locator('.lk-team-card').all_inner_texts();ok('Ngôi sao hy vọng sai bị trừ 30 điểm',cards[1].startswith('Đội Lửa\n-30đ'))
  await pg.click('#lkTeamEnd');await pg.click('#lkTeamNext')
  text=await pg.inner_text('.lk-team-rank');rows=await pg.locator('.lk-team-rank li').all_inner_texts()
  ok('Chung cuộc đúng: Đội Sao 30 điểm đứng đầu, lịch sử ghi 🌟 vòng 1',rows and 'Đội Sao' in rows[0] and '30' in rows[0] and '🌟 vòng 1' in rows[0] and 'Chúc mừng Đội Sao' in text)
  dots=await pg.locator('.lk-team-rank .lk-team-rounds i').count();hope=await pg.locator('.lk-team-rank .lk-team-rounds i.hope').count()
  ok('Mỗi đội hiện đủ kết quả vòng và đánh dấu các vòng dùng Ngôi sao hy vọng',dots==6 and hope==2)
  slide=await pg.evaluate("(()=>{const s=document.querySelector('#lkSlide'),p=document.querySelector('.lk-team-panel');return {panel:Math.round(p.getBoundingClientRect().width),slide:Math.round(s.getBoundingClientRect().width),over:s.scrollHeight>s.clientHeight+1}})()")
  grip=await pg.locator('.lk-team-grip').bounding_box();await pg.mouse.move(grip['x']+7,grip['y']+grip['height']/2);await pg.mouse.down();await pg.mouse.move(grip['x']-130,grip['y']+grip['height']/2,steps=8);await pg.mouse.up();await pg.wait_for_timeout(500)
  wide=await pg.evaluate("(()=>{const s=document.querySelector('#lkSlide'),p=document.querySelector('.lk-team-panel');return {panel:Math.round(p.getBoundingClientRect().width),slide:Math.round(s.getBoundingClientRect().width),over:s.scrollHeight>s.clientHeight+1}})()")
  ok(f'Kéo bảng trái/phải: {slide["panel"]} → {wide["panel"]}px, bài chiếu tự co và không tràn',wide['panel']>slide['panel']+100 and wide['slide']<slide['slide']-100 and not wide['over'])
  await pg.screenshot(path='/tmp/thi-dua-nhom.png')
  await pg.keyboard.press('n');ok('Phím N ẩn bảng nhưng giữ kết quả',await pg.locator('.lk-team-panel[hidden]').count()==1)
  await pg.keyboard.press('n');ok('Phím N mở lại đúng bảng chung cuộc','Chúc mừng Đội Sao' in await pg.inner_text('.lk-team-panel'))
  ok('Không có lỗi JavaScript',not errs)
  for e in errs[:3]:print('  ',e)
  await br.close()
 print('KẾT QUẢ:','ĐẠT ✓' if all(out) else 'CHƯA ĐẠT ✗');sys.exit(0 if all(out) else 1)
asyncio.run(main())
