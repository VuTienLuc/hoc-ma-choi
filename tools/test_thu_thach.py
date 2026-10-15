"""Kiểm thử "Thử thách hôm nay" (Toán 10, Toán 11): đề 14 câu sinh theo ngày, làm đúng hết → 10 điểm + 3 sao (khoá có hậu tố ngày),
làm sai hết → điểm thấp; 60 ngày liên tiếp đều dựng được đề hợp lệ; có ô trên trang lớp; không merror/$ trần/tràn ngang; không đụng maxStars."""
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
            r = await pg.evaluate("""g => { const t = StudentTest.find(g, 'thu-thach-ngay'); if(!t) return {err:'không có bài'}; const out = {mx:StudentTest.maxStars(g), diff:0, bad:[]}; let prev = '';
              for(let ci = 20000; ci < 20060; ci++){ try{ const q = StudentTest.build(t, ci), sig = JSON.stringify(q.mc.map(x => x.q)); if(sig !== prev) out.diff++; prev = sig;
                if(q.mc.length !== 8 || q.tf.length !== 2 || q.short.length !== 4) out.bad.push('số câu ' + ci);
                if(new Set(q.mc.map(x => x.q)).size !== 8) out.bad.push('trùng câu TN ngày ' + ci);
                const strs = []; (function w(o){ if(typeof o === 'string') strs.push(o); else if(o && typeof o === 'object') Object.values(o).forEach(w); })(q);
                const txt = strs.join(' '), outside = txt.split('\\\\(').map((p_, j) => j ? p_.slice(p_.indexOf('\\\\)') + 2) : p_).join('');
                if(outside.includes('$') || /\\\\[a-zA-Z{]/.test(outside.replace(/<[^>]*>/g, ''))) out.bad.push('công thức ngoài ngoặc hoặc $ lẻ ngày ' + ci);
                if(/\\\\(sin|cos|tan|cot|ln|log)[a-z0-9]/.test(txt)) out.bad.push('hàm dính chữ (vd cosx) ngày ' + ci);
                q.mc.forEach(x => { if(new Set(x.opts).size !== 4) out.bad.push('phương án trùng ' + ci); }); }catch(e){ out.bad.push('ngày ' + ci + ': ' + e.message); } }
              return out; }""", g)
            if 'err' in r: bad.append(f'{g}: {r["err"]}'); continue
            if r['diff'] < 55: bad.append(f'{g}: đề các ngày quá giống nhau ({r["diff"]}/60)')
            bad += [f'{g}: {x}' for x in r['bad'][:5]]
            await pg.evaluate("g => { location.hash = '#/' + g; }", g); await pg.wait_for_timeout(600)
            if await pg.locator('a.test-tile[href*="thu-thach-ngay"]').count() != 1: bad.append(f'{g}: trang lớp thiếu ô Thử thách hôm nay')
            for wrong in (False, True):
                n += 1; w = f"{g} ({'sai hết' if wrong else 'đúng hết'})"
                await pg.evaluate("() => { Object.keys(localStorage).filter(k => k.includes('thu-thach')).forEach(k => localStorage.removeItem(k)); location.hash = '#/' + 'GRADE' + '/kiem-tra/thu-thach-ngay'.replace('GRADE', ''); }")
                await pg.evaluate("g => { location.hash = '#/' + g + '/kiem-tra/thu-thach-ngay'; location.reload(); }", g); await pg.wait_for_timeout(1800)
                await pg.wait_for_selector('#testStart', timeout=8000); await pg.click('#testStart'); await pg.wait_for_selector('#testSubmit', timeout=8000); await pg.wait_for_timeout(800)
                q = await pg.evaluate("g => { const t = StudentTest.find(g, 'thu-thach-ngay'), k = Object.keys(localStorage).find(x => x.includes('thu-thach-ngay') && x.endsWith(':state')), s = JSON.parse(localStorage.getItem(k)), q = StudentTest.build(t, s.ci); return {key:k, mc:q.mc.map(x => x.a), tf:q.tf.map(x => x.items.map(i => i.ok)), sh:q.short.map(x => String(x.ans).replace('.', ','))}; }", g)
                if not __import__('re').search(r'\d{4}-\d{2}-\d{2}:state$', q['key']): bad.append(w + f": khoá chưa có hậu tố ngày {q['key']}")
                nm = await pg.evaluate("[document.querySelectorAll('mjx-merror').length, (document.body.innerText.match(/\\$|\\\\\\(|undefined|NaN|\\\\[a-zA-Z{]/g) || [])]")
                if nm[0] or nm[1]: bad.append(w + f': lỗi hiển thị trên đề {nm}')
                if await pg.evaluate("document.documentElement.scrollWidth - innerWidth") > 2: bad.append(w + ': tràn ngang')
                for i, a in enumerate(q['mc']): await pg.click(f'[data-mc="{i}"][data-v="{(a + 1) % 4 if wrong else a}"]')
                for i, row in enumerate(q['tf']):
                    for k, ok in enumerate(row): await pg.click(f'[data-tf="{i}"][data-it="{k}"][data-v="{1 if (ok != wrong) else 0}"]')
                for i, a in enumerate(q['sh']): await pg.fill(f'[data-short="{i}"]', '-999' if wrong else a)
                await pg.once('dialog', lambda d: None) if False else None
                await pg.click('#testSubmit'); await pg.wait_for_timeout(2500)
                sc = float((await pg.evaluate("document.querySelector('.result-score')?.innerText || ''")).replace('/10', '').replace(',', '.').strip() or -1)
                if (not wrong and sc != 10) or (wrong and sc >= 1.5): bad.append(w + f': điểm = {sc}')
                sk = await pg.evaluate("g => Object.keys(localStorage).filter(k => /kiem-tra-thu-thach-ngay-\\d{4}-\\d{2}-\\d{2}:1$/.test(k)).map(k => localStorage.getItem(k))", g)
                if not wrong and not any('3' in x for x in sk): bad.append(w + f': chưa lưu 3 sao theo ngày {sk}')
                st = await pg.evaluate("g => [StudentTest.stars(g), StudentTest.maxStars(g), Object.keys(localStorage).filter(k => k.includes('thu-thach'))]", g)
                if not wrong and st[0] < 3: bad.append(w + f': stars() = {st}')
                sol = await pg.evaluate("document.querySelectorAll('.test-review-part [class*=sol]').length")
                if sol < 10: bad.append(w + f': thiếu lời giải ({sol})')
                nm = await pg.evaluate("[document.querySelectorAll('mjx-merror').length, (document.querySelector('#app').innerText.match(/\\$|\\\\\\(|undefined|NaN|\\\\[a-zA-Z{]/g) || [])]")
                if nm[0] or nm[1]: bad.append(w + f': lỗi hiển thị trên kết quả {nm}')
        bad += ['Lỗi JS: ' + e for e in errs]; await br.close()
    print(f'Thử thách hôm nay ({n} lượt làm): ' + ('ĐẠT ✓' if not bad else 'CHƯA ĐẠT ✗'))
    for b in bad: print(' ✗', b)
    sys.exit(1 if bad else 0)
asyncio.run(main())
