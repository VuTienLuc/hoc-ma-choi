"""Kiểm tra trò chơi ở điện thoại dọc và ngang.

Chạy: python3 tools/test_game_dienthoai.py
"""
import asyncio
import pathlib
import sys

from playwright.async_api import async_playwright


ROOT = pathlib.Path(__file__).resolve().parent.parent
TOPIC = "game-lop10-on-tap-c3"
STYLES = ("fishing", "fruit", "balloon")
VIEWPORTS = ((390, 844), (844, 390))


async def snapshot(page):
    return await page.evaluate(
        """() => {
          const rect = el => {
            const r = el.getBoundingClientRect();
            return {left:r.left, top:r.top, right:r.right, bottom:r.bottom,
                    width:r.width, height:r.height};
          };
          return {
            width: innerWidth,
            height: innerHeight,
            documentWidth: document.documentElement.scrollWidth,
            arena: rect(document.querySelector('#gameArena')),
            question: rect(document.querySelector('.mini-question')),
            answers: [...document.querySelectorAll('[data-mini-o]')].map(rect),
            sound: rect(document.querySelector('[data-game-sound]')),
            footer: rect(document.querySelector('.mini-foot')),
            next: document.querySelector('#miniNext') ? rect(document.querySelector('#miniNext')) : null
          };
        }"""
    )


def intersects(a, b):
    return not (a["right"] <= b["left"] or b["right"] <= a["left"]
                or a["bottom"] <= b["top"] or b["bottom"] <= a["top"])


def check_layout(data, label, errors):
    width, height = data["width"], data["height"]
    if data["documentWidth"] > width + 1:
        errors.append(f"{label}: trang bị cuộn ngang")
    if len(data["answers"]) != 4:
        errors.append(f"{label}: không có đủ bốn đáp án")
        return
    for index, answer in enumerate(data["answers"], 1):
        if answer["left"] < -1 or answer["right"] > width + 1:
            errors.append(f"{label}: đáp án {index} tràn khỏi chiều ngang")
        if answer["top"] < -1 or answer["bottom"] > height + 1:
            errors.append(f"{label}: đáp án {index} tràn khỏi chiều dọc")
        if answer["width"] < 44 or answer["height"] < 44:
            errors.append(f"{label}: vùng chạm đáp án {index} nhỏ hơn 44 pixel")
        if intersects(answer, data["sound"]):
            errors.append(f"{label}: nút âm thanh che đáp án {index}")
    for index, first in enumerate(data["answers"]):
        for second in data["answers"][index + 1:]:
            if intersects(first, second):
                errors.append(f"{label}: các đáp án chồng lên nhau")
                return


async def test_viewport(browser, width, height, errors):
    page = await browser.new_page(viewport={"width": width, "height": height}, has_touch=True)
    page_errors = []
    page.on("pageerror", lambda error: page_errors.append(str(error)))
    await page.goto((ROOT / "index.html").as_uri())
    await page.wait_for_timeout(500)
    await page.evaluate("S.grade=App.grades.find(g=>g.id==='lop10');renderHome()")

    for style in STYLES:
        await page.evaluate(
            f"location.hash='#/game-mini/{style}/{TOPIC}';"
            "Game.route();document.querySelector('#miniStart').click()"
        )
        await page.wait_for_timeout(500)
        label = f"{width}x{height} {style}"
        check_layout(await snapshot(page), label, errors)
        await page.evaluate("document.querySelector('[data-mini-o]').click()")
        await page.wait_for_timeout(80)
        revealed = await snapshot(page)
        check_layout(revealed, label + " sau khi trả lời", errors)
        if not revealed["next"]:
            errors.append(f"{label}: thiếu nút Câu tiếp theo")
        elif (revealed["next"]["right"] > width + 1
              or revealed["next"]["bottom"] > height + 1):
            errors.append(f"{label}: nút Câu tiếp theo nằm ngoài màn hình")
        elif intersects(revealed["next"], revealed["sound"]):
            errors.append(f"{label}: nút âm thanh che nút Câu tiếp theo")
        await page.evaluate("document.querySelector('#gameArena [data-exit]').click()")

    await page.evaluate(
        f"location.hash='#/game/{TOPIC}';Game.route();"
        "document.querySelector('[data-mode=\"bot\"]').click()"
    )
    await page.wait_for_timeout(500)
    bot = await page.evaluate(
        """() => ({
          width: innerWidth,
          documentWidth: document.documentElement.scrollWidth,
          arenaHeight: document.querySelector('#gameArena').scrollHeight,
          answers: [...document.querySelectorAll('[data-o]')].map(el => {
            const r=el.getBoundingClientRect();
            return {left:r.left,right:r.right,top:r.top,bottom:r.bottom,width:r.width,height:r.height};
          }),
          sound: (() => {const r=document.querySelector('[data-game-sound]').getBoundingClientRect();
            return {left:r.left,right:r.right,top:r.top,bottom:r.bottom};})()
        })"""
    )
    label = f"{width}x{height} đấu với máy"
    if bot["documentWidth"] > width + 1 or len(bot["answers"]) != 4:
        errors.append(f"{label}: bố cục không hợp lệ")
    for index, answer in enumerate(bot["answers"], 1):
        if answer["left"] < -1 or answer["right"] > width + 1 or answer["height"] < 44:
            errors.append(f"{label}: đáp án {index} không vừa vùng chạm")
        if intersects(answer, bot["sound"]):
            errors.append(f"{label}: nút âm thanh che đáp án {index}")
    errors.extend(f"{width}x{height}: lỗi trang {error}" for error in page_errors)
    await page.close()


async def main():
    errors = []
    async with async_playwright() as playwright:
        browser = await playwright.chromium.launch()
        for width, height in VIEWPORTS:
            await test_viewport(browser, width, height, errors)
        await browser.close()
    for error in errors:
        print("  ✗", error)
    print("KIỂM TRA GAME ĐIỆN THOẠI:", "ĐẠT ✓" if not errors else f"CHƯA ĐẠT ✗ ({len(errors)} lỗi)")
    sys.exit(1 if errors else 0)


asyncio.run(main())
