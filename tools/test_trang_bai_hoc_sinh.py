"""Kiểm tra trang tổng quan bài học sinh trên máy tính và điện thoại."""
import asyncio
import pathlib
import sys

from playwright.async_api import async_playwright

ROOT = pathlib.Path(__file__).resolve().parent.parent


async def check_page(browser, width, height, errors):
    page = await browser.new_page(viewport={"width": width, "height": height}, has_touch=width < 700)
    page_errors = []
    page.on("pageerror", lambda error: page_errors.append(str(error)))
    await page.goto((ROOT / "index.html").as_uri())
    await page.wait_for_timeout(500)
    data = await page.evaluate("""() => {
      const g=App.grades.find(x=>x.id==='lop10');
      S.grade=g; HF={q:'',st:'all'};
      g.lessons.forEach(l=>[1,2,3].forEach(lv=>localStorage.removeItem(bestKey(l.id,lv,g))));
      const visible=g.lessons.filter(l=>g.topics.some(t=>t.id===l.t&&t.hk===1));
      [1,2,3].forEach(lv=>store.set(bestKey(visible[0].id,lv,g),3));
      store.set(bestKey(visible[1].id,1,g),3); store.set(bestKey(visible[1].id,2,g),1);
      renderHome();
      const count=k=>visible.filter(l=>{const s=lessonStars(l.id,g);return stOf(Math.round(s/9*100),s>0)===k}).length;
      return {done:count('done'),doing:count('doing'),todo:count('todo'),lessons:visible.length};
    }""")
    await page.wait_for_timeout(200)
    cards = page.locator('.home-stats button')
    if await cards.count() != 3:
        errors.append(f"{width}x{height}: tổng quan không đủ ba trạng thái")
    shown = await cards.locator('b').all_text_contents()
    if shown != [str(data['done']), str(data['doing']), str(data['todo'])]:
        errors.append(f"{width}x{height}: số tổng quan sai {shown} != {data}")
    if await page.locator('.tile.les .les-levels').count() < data['lessons']:
        errors.append(f"{width}x{height}: có bài thiếu tiến độ M1–M3")
    if await page.locator('.tile.les .les-lv').count() < data['lessons'] * 3:
        errors.append(f"{width}x{height}: số nhãn mức học chưa đủ")
    if await page.locator('.tile.les.st-done .les-lv.st-done').first.count() == 0:
        errors.append(f"{width}x{height}: bài hoàn thành chưa hiện đủ dấu mức")
    if await page.locator('.home-topic[open]').count() != 1:
        errors.append(f"{width}x{height}: trang đầu chưa thu gọn còn đúng một chương ưu tiên")
    await page.locator('.home-stats button[data-f="todo"]').click()
    visible_states = await page.locator('.tile.les:visible').evaluate_all("els=>els.map(x=>x.dataset.st)")
    if not visible_states or any(x != 'todo' for x in visible_states):
        errors.append(f"{width}x{height}: lọc Chưa làm còn lẫn trạng thái {visible_states}")
    await page.locator('.fchip[data-f="all"]').click()
    first_name = await page.locator('.tile.les').first.get_attribute('data-n')
    await page.locator('#fq').fill(first_name[:8])
    if await page.locator('.tile.les:visible').count() == 0:
        errors.append(f"{width}x{height}: tìm kiếm không hiện bài phù hợp")
    doc_width = await page.evaluate('document.documentElement.scrollWidth')
    if doc_width > width + 1:
        errors.append(f"{width}x{height}: trang bị cuộn ngang ({doc_width}px)")
    if width < 700:
        sizes = await cards.evaluate_all("els=>els.map(x=>{const r=x.getBoundingClientRect();return [r.width,r.height]})")
        if any(w < 44 or h < 44 for w, h in sizes):
            errors.append(f"{width}x{height}: nút trạng thái nhỏ hơn vùng chạm 44px")
        filters = await page.locator('.fchip').evaluate_all("els=>els.map(x=>{const r=x.getBoundingClientRect();return [r.left,r.right,r.height]})")
        if any(left < -1 or right > width + 1 or h < 40 for left, right, h in filters):
            errors.append(f"{width}x{height}: bộ lọc không hiện trọn hàng hoặc vùng chạm quá nhỏ")
    if page_errors:
        errors.extend(f"{width}x{height}: lỗi trang {e}" for e in page_errors)
    await page.close()


async def main():
    errors = []
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        for size in ((1280, 900), (390, 844)):
            await check_page(browser, *size, errors)
        await browser.close()
    for error in errors:
        print('  ✗', error)
    print('KIỂM TRA TRANG BÀI HỌC SINH:', 'ĐẠT ✓' if not errors else f'CHƯA ĐẠT ✗ ({len(errors)} lỗi)')
    sys.exit(1 if errors else 0)


asyncio.run(main())
