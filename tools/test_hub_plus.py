"""Kiểm thử các tab THI ĐUA + GẮN BÀI HỌC của Góc chung (assets/js/hub-plus.js) với máy chủ giả lập có trạng thái:
🎯 Hôm nay & Thử thách · ❓ Câu hỏi của thầy (học sinh trả lời, giáo viên đăng/đóng) · 🔥 Bài hot tuần · 🗺️ Lộ trình · 🔁 Ôn bài cũ
(lên lịch 1→3→7 ngày, +15 xu) · 🏁 Đua lớp · thưởng 1⭐ khi xong 3 nhiệm vụ · Sắp xếp “Tuần này” · máy chủ cũ → hướng dẫn Code.gs.
Chạy: python3 tools/test_hub_plus.py   (ảnh: /tmp/hubplus-*.png)"""
import threading, http.server, functools, socketserver, asyncio, pathlib, json, re, datetime
from playwright.async_api import async_playwright
ROOT = pathlib.Path(__file__).resolve().parent.parent
http.server.SimpleHTTPRequestHandler.log_message = lambda *a: None
srv = socketserver.TCPServer(('127.0.0.1', 0), functools.partial(http.server.SimpleHTTPRequestHandler, directory=str(ROOT))); PORT = srv.server_address[1]
threading.Thread(target=srv.serve_forever, daemon=True).start()
API = 'https://mock.example/exec'; SITE = f'http://127.0.0.1:{PORT}/index.html'; GV = f'http://127.0.0.1:{PORT}/giao-vien/index.html'
def row(name, stars, wk, qd=0, me=False, joined=True):
    r = {'name': name, 'user': name.lower().replace(' ', ''), 'stars': stars, 'joined': joined, 'streak': 1, 'best': 1, 'badges': 1, 'xu': 5, 'wear': {}, 'pets': {}, 'stickers': {}, 'wk': wk, 'qd': qd}
    if me: r['me'] = True
    return r
C10 = [row('Nguyễn An', 40, 5, 3), row('Trần Bình', 170, 8, 1, me=True), row('Lê Châu', 2, 0), row('Phạm Dung', 9, 3, 3), row('Võ Em', 0, 0, joined=False)]
M = {'who': 'student', 'old': False, 'names': ('Lớp 10', 'Bài 1', 'Bài 2'), 'bonus': 0, 'posted': []}
Q = [{'id': 'q1', 'target': '10', 'q': 'Giá trị của $\\sin 30^\\circ$ bằng?', 'opts': ['1', '1/2', '0', '2'], 'stars': 2, 'due': '2099-01-01', 'posted': '01/10', 'ans': 'B', 'exp': 'Vì sin 30° = 1/2.', 'open': True}]
ANS = {}
def pubq(q, mine=None):
    o = {k: q[k] for k in ('id', 'target', 'q', 'opts', 'stars', 'due', 'posted')}
    if mine: o.update({'mine': mine, 'ans': q['ans'], 'exp': q['exp']})
    return o
async def handle(route):
    b = json.loads(route.request.post_data or '{}'); a = b.get('action'); gv = M['who'] == 'teacher'
    G, L1, L2 = M['names']
    if a == 'classes': body = {'ok': True, 'classes': ['10A1', 'GV']}
    elif a == 'login': body = {'ok': True, 'token': 'T', 'name': 'Thầy Lực' if gv else 'Trần Bình', 'lop': 'GV' if gv else '10A1', 'user': 'gv' if gv else 'tb', 'progress': {}}
    elif a == 'rank': body = {'ok': True, 'lop': '10A1', 'rows': C10}
    elif a == 'rankAll': body = {'ok': True, 'grade': 'lop10', 'classes': [{'lop': '10A1', 'rows': [{k: v for k, v in r.items() if k != 'me'} for r in C10]}, {'lop': '10A2', 'rows': [row('Hồ Hà', 12, 1)]}]}
    elif M['old'] and a in ('hot', 'race', 'qList'): body = {'ok': False, 'msg': 'Yêu cầu không hợp lệ'}
    elif a == 'hot': body = {'ok': True, 'lop': b.get('lop') or '10A1', 'size': 5, 'week': [{'grade': G, 'lesson': L1, 'sets': 6, 'students': 4, 'pct': 52}, {'grade': G, 'lesson': L2, 'sets': 3, 'students': 2, 'pct': 90}, {'grade': G, 'lesson': 'Bài lạ', 'sets': 1, 'students': 1, 'pct': 10}],
                                           'all': [{'grade': G, 'lesson': L1, 'students': 4}, {'grade': G, 'lesson': L2, 'students': 2}]}
    elif a == 'race': body = {'ok': True, 'grade': 'lop10', 'mine': '' if gv else '10A1', 'classes': [{'lop': '10A1', 'size': 5, 'joined': 4, 'active': 3, 'wk': 16}, {'lop': '10A2', 'size': 2, 'joined': 1, 'active': 1, 'wk': 10}, {'lop': '10A3', 'size': 40, 'joined': 0, 'active': 0, 'wk': 0}]}
    elif a == 'qList':
        if gv: body = {'ok': True, 'teacher': True, 'items': [dict(pubq(q), ans=q['ans'], exp=q['exp'], open=q['open'], answered=len(ANS), correct=sum(1 for v in ANS.values() if v == q['ans'])) for q in Q]}
        else: body = {'ok': True, 'items': [pubq(q, {'pick': ANS[q['id']], 'ok': ANS[q['id']] == q['ans']} if q['id'] in ANS else None) for q in Q if q['open']]}
    elif a == 'qAnswer':
        q = next(x for x in Q if x['id'] == b['id']); ANS[q['id']] = b['pick']; ok = b['pick'] == q['ans']
        if ok: C10[1]['stars'] += q['stars']; C10[1]['wk'] += q['stars']
        body = {'ok': True, 'correct': ok, 'pick': b['pick'], 'ans': q['ans'], 'exp': q['exp'], 'stars': q['stars'] if ok else 0}
    elif a == 'qPost': M['posted'].append(b); Q.insert(0, {'id': 'q' + str(len(Q) + 1), 'target': b['target'], 'q': b['q'], 'opts': b['opts'] + [''] * (4 - len(b['opts'])), 'stars': b['stars'], 'due': '2099-01-02', 'posted': '02/10', 'ans': b['ans'], 'exp': b['exp'], 'open': True}); body = {'ok': True, 'id': 'q9'}
    elif a == 'qClose': [q.update(open=False) for q in Q if q['id'] == b['id']]; body = {'ok': True}
    elif a == 'bonus': M['bonus'] += 1; body = {'ok': True, 'stars': 1}
    else: body = {'ok': True}
    await route.fulfill(status=200, content_type='application/json', body=json.dumps(body))
async def main():
  res = []; ok = lambda n, c: res.append(bool(c)) or print(('✓ ' if c else '✗ ') + n)
  async with async_playwright() as p:
    br = await p.chromium.launch()
    async def page(who, W=1100, H=1000):
        M['who'] = who; pg = await br.new_page(viewport={'width': W, 'height': H}); errs = []; pg.on('pageerror', lambda e: errs.append(str(e)))
        await pg.route(re.compile(r'^https?://(?!127\.0\.0\.1)'), lambda r: r.abort()); await pg.route(API, handle)
        async def cfg(route):
            t = re.sub(r"sheetAPI:\s*'[^']*'", f"sheetAPI: '{API}'", (ROOT/'config.js').read_text()); await route.fulfill(body=t, content_type='application/javascript')
        await pg.route('**/config.js', cfg)
        url = GV if who == 'teacher' else SITE
        await pg.goto(url); await pg.wait_for_timeout(900)
        await pg.select_option('#lgLop', 'GV' if who == 'teacher' else '10A1'); await pg.fill('#lgUser', 'u'); await pg.fill('#lgPass', 'p'); await pg.click('#lgBtn'); await pg.wait_for_timeout(1200)
        return pg, errs, url
    txt = lambda pg, sel: pg.evaluate(f"[...document.querySelectorAll('{sel}')].map(e=>e.textContent.trim().replace(/\\s+/g,' '))")
    async def go(pg, url, tab, wait=1300): await pg.goto(url + '#/goc-chung/' + tab); await pg.reload(); await pg.wait_for_timeout(wait)

    # ---------- HỌC SINH ----------
    pg, errs, url = await page('student')
    nm = await pg.evaluate("(()=>{const g=App.grades.find(x=>x.id==='lop10');return [g.name,g.lessons[0].name,g.lessons[1].name]})()"); M['names'] = tuple(nm)
    await go(pg, url, 'rank')
    tabs = await txt(pg, '.hub-tabs button'); ok(f'8 tab, Xếp hạng đầu, Sticker cuối: {tabs}', len(tabs) == 8 and 'Xếp hạng' in tabs[0] and 'Sticker' in tabs[-1] and 'Hôm nay' in tabs[1])
    ok('Có nút sắp xếp 📈 Tuần này', 'Tuần này' in ' '.join(await txt(pg, '[data-hub-sort]')))
    await pg.click('[data-hub-sort="wk"]'); await pg.wait_for_timeout(300); names = await txt(pg, '.hub-rank li b'); ok(f'Xếp theo tuần này {names}', names[:3] == ['Trần Bình (em)', 'Nguyễn An', 'Phạm Dung'])
    # 🎯 Hôm nay & Thử thách
    await go(pg, url, 'quest')
    ok('Hiện 3 nhiệm vụ của em', len(await txt(pg, '.hub-q li')) == 3)
    body = (await pg.inner_text('#hubTab')).replace('\n', ' ')
    ok('Thử thách tuần: 16/24 ⭐ (mục tiêu 6 ⭐ × 4 bạn)', '16' in body and '24' in body and 'mỗi bạn 6' in body)
    ok('Thử thách tuần: mốc 25% và 50% sáng, 100% chưa', await pg.evaluate("[...document.querySelectorAll('.hub-stops span.on')].length===2"))
    ok('Thử thách: 3/4 bạn đã góp', '3/4 bạn đã góp' in body.replace('\xa0', ' '))
    top = await txt(pg, '.hub-card:last-of-type .hub-rank li b'); ok(f'Vua tiến bộ {top}', top == ['Trần Bình (em)', 'Nguyễn An', 'Phạm Dung'])
    ok('Lớp hôm nay: 2/4 bạn xong nhiệm vụ', '2/4 bạn đã xong' in body.replace('\xa0', ' ') or '2/4' in body)
    await pg.screenshot(path='/tmp/hubplus-quest.png', full_page=True)
    # ❓ Câu hỏi của thầy
    await go(pg, url, 'ask')
    ok('Hiện câu hỏi của thầy, nút gửi tắt khi chưa chọn', len(await pg.query_selector_all('.hub-qa')) == 1 and await pg.evaluate("document.querySelector('[data-send]').disabled"))
    await pg.click('[data-pick="B"]'); ok('Chọn đáp án → bật nút gửi', not await pg.evaluate("document.querySelector('[data-send]').disabled"))
    await pg.screenshot(path='/tmp/hubplus-ask.png', full_page=True)
    await pg.click('[data-send]'); await pg.wait_for_timeout(1500)
    res_t = (await pg.inner_text('.hub-res')).replace('\n', ' '); ok(f'Đúng → thông báo +2 ⭐: {res_t}', 'Chính xác' in res_t and '+2' in res_t and 'sin 30' in res_t)
    ok('Sau khi trả lời: phương án khóa, đáp án B tô đúng', await pg.evaluate("document.querySelector('.hub-opt.ok')&&document.querySelector('.hub-opt.ok').dataset.pick==='B'&&[...document.querySelectorAll('.hub-opt')].every(b=>b.disabled)"))
    ok('Công thức MathJax trong câu hỏi được vẽ', await pg.evaluate("document.querySelectorAll('.hub-qt mjx-container').length>=1"))
    # 🔥 Bài hot
    await go(pg, url, 'hot'); items = await txt(pg, '.hub-hot li')
    ok(f'Bài hot: “Cần ôn” xếp điểm thấp trước ({items[0][:40]}…), bài chỉ 1 bộ không vào mục cần ôn', len(items) >= 2 and nm[1] in items[0] and '52%' in items[0] and not any('Bài lạ' in t for t in items[:2]))
    ok('Bài hot: có liên kết vào bài học', await pg.evaluate("[...document.querySelectorAll('.hub-hot a')].some(a=>/#\\/lop10\\/bai\\//.test(a.getAttribute('href')))"))
    # 🗺️ Lộ trình
    await go(pg, url, 'path')
    ok('Lộ trình: có chủ đề, hàng bài và “x/5 bạn”', await pg.evaluate("document.querySelectorAll('.hub-path li').length>=5") and '4/5 bạn' in (await pg.inner_text('#hubTab')).replace('\xa0', ' '))
    ok('Lộ trình: gợi ý bài nên làm tiếp', 'nên làm tiếp' in await pg.inner_text('#hubTab'))
    await pg.screenshot(path='/tmp/hubplus-path.png', full_page=True)
    # 🔁 Ôn bài cũ + thưởng 3 nhiệm vụ
    k = await pg.evaluate("""(()=>{const g=App.grades.find(x=>x.id==='lop10'),l=g.lessons[0];Play.on('done',{g,l,lv:1,st:1,pts:4,n:6});return `${g.id}:${l.id}:1`})()""")
    rev = await pg.evaluate(f"JSON.stringify(Play.state.rev['{k}'])"); r = json.loads(rev)
    tomorrow = (datetime.date.today() + datetime.timedelta(days=1)).isoformat()
    ok(f'Bộ chưa trọn điểm → hẹn ôn lại ngày mai {rev}', r['due'] == tomorrow and r['box'] == 0)
    await go(pg, url, 'review'); ok('Ôn bài cũ: chưa đến hạn → mục “Sắp tới”', 'Sắp tới' in await pg.inner_text('#hubTab') and not await pg.query_selector('.hub-rev li.due'))
    yest = (datetime.date.today() - datetime.timedelta(days=1)).isoformat()
    await pg.evaluate(f"(()=>{{Play.state.rev['{k}'].due='{yest}'; Play.state.xu=0}})()"); await pg.evaluate("window.__x=Play.state.xu")
    await pg.evaluate("Hub.route()"); await pg.wait_for_timeout(800)
    ok('Ôn bài cũ: đến hạn → nút “Ôn ngay” trỏ đúng bộ', await pg.evaluate(f"document.querySelector('.hub-rev li.due a')&&document.querySelector('.hub-rev li.due a').getAttribute('href').endsWith('#/{k.split(':')[0]}/bai/{k.split(':')[1]}/1')"))
    await pg.screenshot(path='/tmp/hubplus-review.png', full_page=True)
    xu0 = await pg.evaluate("Play.state.xu")
    await pg.evaluate(f"(()=>{{const g=App.grades.find(x=>x.id==='lop10'),l=g.lessons[0];Play.on('done',{{g,l,lv:1,st:2,pts:6,n:6}})}})()"); await pg.evaluate("document.querySelectorAll('#stickerReward').forEach(e=>e.remove());document.body.classList.remove('noscroll')")
    r2 = json.loads(await pg.evaluate(f"JSON.stringify(Play.state.rev['{k}'])")); xu1 = await pg.evaluate("Play.state.xu")
    ok(f'Ôn đúng hạn + trọn điểm → mốc 3 ngày, +15 🪙 ({xu1 - xu0} xu thêm)', r2['box'] == 1 and r2['due'] == (datetime.date.today() + datetime.timedelta(days=3)).isoformat() and xu1 - xu0 >= 15)
    await pg.evaluate(f"(()=>{{Play.state.rev['{k}'].due='{yest}'}})()")
    for _ in range(2): await pg.evaluate(f"(()=>{{const g=App.grades.find(x=>x.id==='lop10'),l=g.lessons[0];Play.state.rev['{k}']&&(Play.state.rev['{k}'].due='{yest}');Play.on('done',{{g,l,lv:1,st:2,pts:6,n:6}})}})()")
    await pg.evaluate("document.querySelectorAll('#stickerReward').forEach(e=>e.remove())")
    ok('Xong mốc 7 ngày → bài được coi là nhớ chắc (xóa khỏi lịch ôn)', await pg.evaluate(f"Play.state.rev['{k}']===undefined"))
    M['bonus'] = 0
    await pg.evaluate("(()=>{const s=Play.state; s.q.list.forEach(i=>{i.done=true}); s.bonusDay=''; Play.on('home',{id:'lop10'})})()"); await pg.wait_for_timeout(1500)
    ok(f'Xong cả 3 nhiệm vụ → gọi máy chủ thưởng ⭐ đúng 1 lần (đã gọi {M["bonus"]})', M['bonus'] == 1 and await pg.evaluate("Play.state.bonusDay===Play.today()"))
    await pg.evaluate("Play.on('home',{id:'lop10'})"); await pg.wait_for_timeout(800); ok('Đã nhận hôm nay thì không gọi lại', M['bonus'] == 1)
    # 🏁 Đua lớp
    await go(pg, url, 'race'); lines = await txt(pg, '.hub-race li')
    ok(f'Đua lớp: xếp theo ⭐/bạn → 10A2 (5) trước 10A1 (3,2), lớp 0 sao cuối: {[l[:22] for l in lines]}', len(lines) == 3 and '10A2' in lines[0] and '10A1' in lines[1] and '10A3' in lines[2])
    ok('Đua lớp: lớp mình được đánh dấu', await pg.evaluate("document.querySelector('.hub-race li.me b').textContent.includes('lớp em')") and '10A1' in (await pg.inner_text('.hub-race li.me')))
    await pg.screenshot(path='/tmp/hubplus-race.png', full_page=True)
    ok('Học sinh: không tràn ngang', await pg.evaluate("document.documentElement.scrollWidth<=innerWidth+1"))
    # máy chủ cũ
    M['old'] = True
    for t in ('hot', 'race', 'ask'):
        await go(pg, url, t, 1100); ok(f'Máy chủ cũ: tab {t} → hướng dẫn dán Code.gs', 'Code.gs' in await pg.inner_text('#hubTab'))
    M['old'] = False
    ok('Học sinh: không lỗi JS', not errs); await pg.close()

    # ---------- GIÁO VIÊN (trang giáo viên) ----------
    pg, errs, url = await page('teacher')
    await go(pg, url, 'ask', 1800)
    ok('Giáo viên: có biểu mẫu đăng câu hỏi + danh sách câu đã đăng', await pg.query_selector('#qaPost') and len(await pg.query_selector_all('.hub-q-t')) == 1)
    st = (await pg.inner_text('.hub-q-t')).replace('\n', ' '); ok(f'Giáo viên: thống kê trả lời {st[-60:]}', '1</b>' in await pg.inner_html('.hub-q-t') and 'bạn trả lời' in st)
    await pg.click('#qaPost'); await pg.wait_for_timeout(300); ok('Thiếu nội dung → nhắc, không gửi', 'Cần câu hỏi' in await pg.inner_text('#qaMsg') and not M['posted'])
    await pg.fill('#qaQ', 'Câu mới $x^2$?'); await pg.fill('#qaO0', 'Đáp 1'); await pg.fill('#qaO1', 'Đáp 2'); await pg.check('input[name=qaAns][value="B"]'); await pg.select_option('#qaS', '3'); await pg.select_option('#qaT', '')
    await pg.click('#qaPost'); await pg.wait_for_timeout(1500)
    pst = M['posted'][-1] if M['posted'] else {}
    ok(f'Đăng câu hỏi: gửi đúng nội dung {pst.get("ans")},{pst.get("stars")},{pst.get("target")!r}', pst.get('ans') == 'B' and pst.get('stars') == 3 and pst.get('target') == '' and pst.get('opts', [''])[:2] == ['Đáp 1', 'Đáp 2'])
    ok('Danh sách hiện thêm câu mới (2 câu)', len(await pg.query_selector_all('.hub-q-t')) == 2)
    await pg.click('[data-qclose]'); await pg.wait_for_timeout(1800); t_ = await pg.inner_text('#hubTab'); ok('Đóng câu hỏi → hiện “Đã đóng” và không còn nút đóng cho câu đó', 'đã đóng' in t_.lower() and t_.count('Đóng câu hỏi') == 1)
    await pg.screenshot(path='/tmp/hubplus-gv-ask.png', full_page=True)
    await go(pg, url, 'race', 1600); ok('Giáo viên: Đua lớp, không có lớp nào “lớp em”', len(await txt(pg, '.hub-race li')) == 3 and not await pg.query_selector('.hub-race li.me'))
    await go(pg, url, 'quest', 1600); ok('Giáo viên: tab Hôm nay không có nhiệm vụ cá nhân nhưng có Thử thách', not await pg.query_selector('.hub-q') and 'Thử thách tuần' in await pg.inner_text('#hubTab'))
    await go(pg, url, 'hot', 1600); ok('Giáo viên: Bài hot (trang giáo viên không có liên kết bài)', len(await txt(pg, '.hub-hot li')) >= 2 and not await pg.query_selector('.hub-hot a'))
    await go(pg, url, 'path', 1000); ok('Giáo viên (trang giáo viên): Lộ trình trỏ sang trang học sinh', 'trang học sinh' in await pg.inner_text('#hubTab'))
    await go(pg, url, 'review', 1000); ok('Giáo viên: Ôn bài cũ báo dành cho học sinh', 'học sinh' in await pg.inner_text('#hubTab'))
    ok('Giáo viên: không lỗi JS', not errs); await pg.close()
    # iPad dọc
    pg, errs, url = await page('student', 820, 1180)
    for t in ('quest', 'ask', 'path', 'race'):
        await go(pg, url, t, 1200); ok(f'iPad dọc: tab {t} không tràn ngang', await pg.evaluate("document.documentElement.scrollWidth<=innerWidth+1"))
    await pg.screenshot(path='/tmp/hubplus-ipad.png'); await pg.close()
    await br.close()
  n = sum(res); print(f'\nKẾT QUẢ: {"ĐẠT ✓" if n == len(res) else "CHƯA ĐẠT ✗"} ({n}/{len(res)})'); raise SystemExit(0 if n == len(res) else 1)
asyncio.run(main())
