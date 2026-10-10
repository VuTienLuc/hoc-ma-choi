"""Kiểm tra Ôn tập Chương III Toán 10 luôn tạo đủ 20 câu theo ba tầng."""
import asyncio
import pathlib
import sys

from playwright.async_api import async_playwright

ROOT = pathlib.Path(__file__).resolve().parent.parent


async def main():
    errors = []
    page_errors = []
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page(viewport={"width": 1280, "height": 900})
        page.on("pageerror", lambda error: page_errors.append(str(error)))
        await page.goto((ROOT / "index.html").as_uri())
        await page.wait_for_timeout(600)
        results = await page.evaluate("""() => {
          const g=App.grades.find(x=>x.id==='lop10'),l=g.lessons.find(x=>x.id==='on-tap-c3'),out=[];
          S.grade=g;S.lesson=l;
          for(const lv of [1,2,3]){
            S.lv=lv;genSet();renderLesson();
            out.push({lv,count:S.qs.length,cards:document.querySelectorAll('#qs>.card').length,
              bands:S.qs.map(q=>q.reviewBand),types:[...new Set(S.qs.map(q=>q.reviewType))],
              bad:S.qs.filter(q=>/NaN|undefined|Infinity|null/.test((q.text||'')+(q.tpl||'')+(q.hint||'')+(q.sol||''))).length,
              progress:document.querySelector('#ptxt').textContent});
          }
          return {count:l.count,gens:l.gens.length,title:l.name,results:out};
        }""")
        if results['count'] != 20 or results['gens'] != 20:
            errors.append(f"Cấu hình phải có count=20 và 20 vị trí câu hỏi: {results}")
        required = {'luong-giac', 'cong-thuc', 'cosin', 'sin', 'dien-tich', 'ban-kinh', 'thuc-te'}
        expected_bands = [1] * 7 + [2] * 7 + [3] * 6
        for result in results['results']:
            if result['count'] != 20 or result['cards'] != 20:
                errors.append(f"Mức {result['lv']}: không dựng đủ 20 câu/thẻ")
            if result['bands'] != expected_bands:
                errors.append(f"Mức {result['lv']}: sai thứ tự 7 cơ bản, 7 vận dụng, 6 nâng cao")
            missing = required - set(result['types'])
            if missing:
                errors.append(f"Mức {result['lv']}: thiếu mảng kiến thức {sorted(missing)}")
            if result['bad']:
                errors.append(f"Mức {result['lv']}: có {result['bad']} câu chứa dữ liệu lỗi")
            if result['progress'] != 'Đã làm 0/20 câu':
                errors.append(f"Mức {result['lv']}: thanh tiến độ chưa dùng mẫu số 20")
        if '20 câu' not in results['title']:
            errors.append('Tên bài chưa cho học sinh biết đây là bộ 20 câu')
        if page_errors:
            errors.extend(f"Lỗi trang: {error}" for error in page_errors)
        await browser.close()
    for error in errors:
        print('  ✗', error)
    print('KIỂM TRA ÔN TẬP CHƯƠNG III – 20 CÂU:', 'ĐẠT ✓' if not errors else f'CHƯA ĐẠT ✗ ({len(errors)} lỗi)')
    sys.exit(1 if errors else 0)


asyncio.run(main())
