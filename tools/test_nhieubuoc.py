"""Kiểm thử loại câu NHIỀU BƯỚC (QS – giải toán có lời văn):
sai 1 lần → gợi ý của bước; sai 2 lần → hiện đáp án bước rồi làm tiếp (0 điểm); sai rồi sửa → ½ điểm;
mức 3: trả lời thẳng đúng → 1 điểm, bấm "Làm theo từng bước" → ½ điểm, trả lời thẳng sai → chuyển sang từng bước.
Chụp màn hình iPad dọc/ngang: /tmp/nhieubuoc-*.png.   Chạy: python3 tools/test_nhieubuoc.py"""
import asyncio, pathlib, sys
from playwright.async_api import async_playwright
ROOT = pathlib.Path(__file__).resolve().parent.parent
LESSONS = ['giai-toan-tung-buoc', 'tong-hieu-tung-buoc']
OPEN = """([id,lv])=>{const g=App.grades.find(x=>x.id==='lop4');S.grade=g;S.lesson=g.lessons.find(l=>l.id===id);S.lv=lv;renderLesson();genSet();renderQs();
  document.querySelectorAll('#qs .card').forEach((c,i)=>c.dataset.i=i);return S.qs.length}"""
# điền đúng (good=true) hoặc sai bước hiện tại của câu i rồi bấm Kiểm tra
STEP = """([i,good])=>{const q=S.qs[i],el=document.querySelectorAll('#qs .card')[i],k=q.guided?q.cur:q.steps.length-1,s=q.steps[k],li=el.querySelector(`[data-s="${k}"]`);
  if(s.kind==='choice'){const c=good?s.correct:(s.correct+1)%s.opts.length;li.querySelector(`[data-sc="${c}"]`).click()}
  else s.ans.forEach((a,j)=>{const v=Array.isArray(a)?a[0]:a;li.querySelectorAll('.blank')[j].value=good?String(v):String(typeof v==='number'?v+1:'x')});
  el.querySelector('[data-check]').click();const fb=el.querySelector('[data-fb]');
  return {k,cur:q.cur,guided:q.guided,status:q.status,pts:q.pts,done:q.done.slice(),fb:fb.className+'|'+fb.innerText.slice(0,80),n:q.steps.length,
          vis:el.querySelectorAll('.stp-i').length}}"""
FINISH = """(i)=>{const q=S.qs[i];return q.guided?q.steps.length-q.cur:1}"""
async def main():
  res = []; ok = lambda n, c: res.append(bool(c)) or print(('✓ ' if c else '✗ ') + n)
  async with async_playwright() as p:
    b = await p.chromium.launch()
    for W, H in [(820, 1180), (1180, 820)]:
      pg = await b.new_page(viewport={'width': W, 'height': H}, has_touch=True); errs = []; pg.on('pageerror', lambda e: errs.append(str(e)))
      await pg.goto((ROOT/'index.html').as_uri()); await pg.wait_for_timeout(500)
      for les in LESSONS:
        await pg.evaluate(OPEN, [les, 1])
        # Câu 0: bước 1 sai 2 lần → hiện đáp án, sang bước 2; làm đúng hết → 0 điểm
        r1 = await pg.evaluate(STEP, [0, False]); r2 = await pg.evaluate(STEP, [0, False])
        if W == 820: ok(f'{les} · mức 1: sai lần 1 → gợi ý, vẫn ở bước 1', 'hint' in r1['fb'] and r1['cur'] == 0 and r1['vis'] == 1)
        if W == 820: ok(f'{les} · mức 1: sai lần 2 → xem đáp án bước 1, mở bước 2', r2['done'][0] == 'shown' and r2['cur'] == 1 and r2['vis'] == 2)
        for _ in range(await pg.evaluate(FINISH, 0)): r = await pg.evaluate(STEP, [0, True])
        if W == 820: ok(f'{les} · mức 1: xong các bước sau khi đã xem đáp án → {r["pts"]} điểm, hiện bài giải', r['status'] == 'fail' and r['pts'] == 0 and 'sol' in r['fb'])
        # Câu 1: sai 1 lần ở bước 2 rồi sửa → ½ điểm
        await pg.evaluate(STEP, [1, True]); await pg.evaluate(STEP, [1, False])
        for _ in range(await pg.evaluate(FINISH, 1)): r = await pg.evaluate(STEP, [1, True])
        if W == 820: ok(f'{les} · mức 1: sai 1 lần rồi tự sửa → {r["pts"]} điểm', r['status'] == 'ok' and r['pts'] == .5)
        if les == LESSONS[0]:
          await pg.evaluate("""()=>{const el=document.querySelectorAll('#qs .card')[2];el.scrollIntoView();const q=S.qs[2];}""")
          for _ in range(2): await pg.evaluate(STEP, [2, True])
          await pg.wait_for_timeout(200); await pg.locator('#qs .card').nth(2).screenshot(path=f'/tmp/nhieubuoc-muc1-{W}.png')
          await pg.locator('#qs .card').nth(1).screenshot(path=f'/tmp/nhieubuoc-xong-{W}.png')
        # Mức 3
        await pg.evaluate(OPEN, [les, 3])
        v = await pg.evaluate("()=>{const el=document.querySelectorAll('#qs .card')[0];return [el.querySelectorAll('.stp-i').length, !!el.querySelector('[data-guide]')]}")
        if W == 820: ok(f'{les} · mức 3: ban đầu chỉ có ô đáp số và nút “Làm theo từng bước”', v == [1, True])
        r = await pg.evaluate(STEP, [0, True])
        if W == 820: ok(f'{les} · mức 3: trả lời thẳng đúng → {r["pts"]} điểm', r['pts'] == 1)
        await pg.locator('#qs .card').nth(1).locator('[data-guide]').click()
        for _ in range(await pg.evaluate(FINISH, 1)): r = await pg.evaluate(STEP, [1, True])
        if W == 820: ok(f'{les} · mức 3: nhờ “làm theo từng bước” rồi làm đúng → {r["pts"]} điểm', r['status'] == 'ok' and r['pts'] == .5)
        r = await pg.evaluate(STEP, [2, False])
        if W == 820: ok(f'{les} · mức 3: trả lời thẳng sai → chuyển sang làm từng bước', r['guided'] and r['cur'] == 0 and r['status'] == 'open')
        if les == LESSONS[1]: await pg.locator('#qs .card').nth(3).screenshot(path=f'/tmp/nhieubuoc-muc3-{W}.png')
        sw = await pg.evaluate("document.documentElement.scrollWidth - innerWidth")
        ok(f'{les} · {W}×{H}: không cuộn ngang', sw <= 0)
      # Trình chiếu một câu nhiều bước
      await pg.evaluate(OPEN, [LESSONS[1], 1])
      if W == 1180:
        await pg.evaluate("Present.open && Present.open()"); await pg.wait_for_timeout(700)
        n = await pg.locator('.pv-steps li').count(); ok(f'Trình chiếu: hiện {n} bước của câu', n >= 4)
        await pg.screenshot(path='/tmp/nhieubuoc-chieu.png')
      ok(f'{W}×{H}: không có lỗi JS', not errs)
      for e in errs[:3]: print('   ', e)
      await pg.close()
    await b.close()
  print('KẾT QUẢ:', 'ĐẠT ✓' if all(res) else 'CHƯA ĐẠT ✗'); sys.exit(0 if all(res) else 1)
asyncio.run(main())
