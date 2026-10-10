"""Kiểm thử bài luyện tập TRỰC TUYẾN giữa học kì I theo ma trận (Toán 10: gk-mt-1/2, Toán 11: gk-mt-1/2).
Mỗi mã đề: mở → làm đúng 100% (đáp án lấy từ chính đề) → điểm 10; làm sai hoàn toàn → điểm thấp; có lời giải; không merror/$ trần/tràn ngang."""
import asyncio, json, pathlib, sys
from playwright.async_api import async_playwright
ROOT = pathlib.Path(__file__).resolve().parent.parent

async def main():
    bad = []; n = 0
    async with async_playwright() as p:
        br = await p.chromium.launch(); pg = await br.new_page(viewport={'width': 820, 'height': 1180}, has_touch=True); errs = []
        pg.on('pageerror', lambda e: errs.append(str(e)))
        for g, L in (('lop10', '10A1'), ('lop11', '11A1')):
            acc = {'token': 't', 'name': 'An', 'lop': L, 'user': 'an'}
            await pg.add_init_script(f"localStorage.setItem('hoctap:session', JSON.stringify({json.dumps(acc)}))")
            await pg.goto((ROOT / 'index.html').as_uri()); await pg.wait_for_timeout(700)
            info = await pg.evaluate("g => StudentTest.TESTS.filter(t => t.grade === g && t.id.startsWith('gk-mt-')).map(t => ({id:t.id, codes:t.codes.length, topic:t.topic}))", g)
            if len(info) != 2: bad.append(f'{g}: cần 2 bài gk-mt, thấy {len(info)}')
            # ô bài kiểm tra có hiện trên trang lớp
            await pg.evaluate("g => { location.hash = '#/' + g; }", g); await pg.wait_for_timeout(500)
            tiles = await pg.locator('a.test-tile[href*="gk-mt-"]').count()
            if tiles != 2: bad.append(f'{g}: trang lớp hiện {tiles}/2 ô luyện tập giữa kì')
            for t in info:
                await pg.evaluate("([g, id]) => { ['state', 'meta'].forEach(k => store.set(`hoctap:test:${g}:${id}:${k}`, null)); }", [g, t['id']])
                for ci in range(t['codes']):
                    for wrong in (False, True):
                        n += 1; w = f"{g}/{t['id']} mã {ci} ({'làm sai hết' if wrong else 'làm đúng hết'})"
                        await pg.evaluate("([g, id]) => { store.set(`hoctap:test:${g}:${id}:state`, null); location.hash = '#/' + g + '/kiem-tra/' + id; location.reload(); }", [g, t['id']])
                        await pg.wait_for_timeout(1800)
                        if wrong and await pg.locator('#testStart').count():                  # lần làm sai dùng lại đúng mã vừa làm: lùi bộ đếm
                            await pg.evaluate("([g, id]) => { const k = `hoctap:test:${g}:${id}:meta`, m = store.get(k); m.attempts--; store.set(k, m); }", [g, t['id']]); await pg.reload(); await pg.wait_for_timeout(800)
                        await pg.wait_for_selector('#testStart', timeout=8000); await pg.click('#testStart'); await pg.wait_for_selector('#testSubmit', timeout=8000); await pg.wait_for_timeout(800)
                        q = await pg.evaluate("([g, id]) => { const t = StudentTest.find(g, id), s = store.get(`hoctap:test:${g}:${id}:state`), q = StudentTest.build(t, s.ci); return {ci:s.ci, mc:q.mc.map(x => x.a), tf:q.tf.map(x => x.items.map(i => i.ok)), sh:q.short.map(x => String(x.ans).replace('.', ','))}; }", [g, t['id']])
                        if q['ci'] != ci: bad.append(w + f": mở nhầm mã {q['ci']}"); 
                        nm = await pg.evaluate("[document.querySelectorAll('mjx-merror').length, (document.body.innerText.match(/\\$|\\\\\\(|undefined|NaN|\\\\[a-zA-Z{]/g) || [])]")
                        if nm[0] or nm[1]: bad.append(w + f': lỗi hiển thị trên đề {nm}')
                        ov = await pg.evaluate("document.documentElement.scrollWidth - innerWidth")
                        if ov > 2: bad.append(w + f': tràn ngang {ov}px')
                        for i, a in enumerate(q['mc']): await pg.click(f'[data-mc="{i}"][data-v="{(a + 1) % 4 if wrong else a}"]')
                        for i, row in enumerate(q['tf']):
                            for k, ok in enumerate(row): await pg.click(f'[data-tf="{i}"][data-it="{k}"][data-v="{0 if (ok if not wrong else not ok) else 1}"]' if False else f'[data-tf="{i}"][data-it="{k}"][data-v="{1 if (ok != wrong) else 0}"]')
                        for i, a in enumerate(q['sh']): await pg.fill(f'[data-short="{i}"]', '-999' if wrong else a)
                        await pg.click('#testSubmit'); await pg.wait_for_timeout(2500)
                        txt = await pg.evaluate("document.querySelector('.result-score')?.innerText || ''")
                        sc = float(txt.replace('/10', '').replace(',', '.').strip() or -1)
                        if (not wrong and sc != 10) or (wrong and sc >= 1): bad.append(w + f': điểm = {sc}')
                        sol = await pg.evaluate("document.querySelectorAll('.test-review-part [class*=sol]').length")
                        if sol < 10: bad.append(w + f': thiếu lời giải ({sol})')
                        nm = await pg.evaluate("[document.querySelectorAll('mjx-merror').length, (document.querySelector('#app').innerText.match(/\\$|\\\\\\(|undefined|NaN|\\\\[a-zA-Z{]/g) || [])]")
                        if nm[0] or nm[1]: bad.append(w + f': lỗi hiển thị trên kết quả {nm}')
                        # chuẩn bị mã kế tiếp: chỉ làm tiếp khi vừa xong lượt "sai"
                        if not wrong:
                            m = await pg.evaluate("([g, id]) => { const k = `hoctap:test:${g}:${id}:meta`, m = store.get(k); return m.attempts; }", [g, t['id']])
        bad += ['Lỗi JS: ' + e for e in errs]; await br.close()
    print(f'Luyện tập giữa kì trực tuyến ({n} mã đề): ' + ('ĐẠT ✓' if not bad else 'CHƯA ĐẠT ✗'))
    for b in bad: print(' ✗', b)
    sys.exit(1 if bad else 0)
asyncio.run(main())
