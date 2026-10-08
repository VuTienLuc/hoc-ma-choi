"""Kiểm tra nhạc mở đầu game: tệp cục bộ, chọn ngẫu nhiên và không lặp liên tiếp."""
import asyncio
import pathlib
import sys

from playwright.async_api import async_playwright


ROOT = pathlib.Path(__file__).resolve().parent.parent
TRACKS = [
    "assets/sounds/game/tieng_chuong_chuong_trinh_rung_chuong_vang-www_tiengdong_com.mp3",
    "assets/sounds/game/nhac-vao-game-ppg35c.mp3",
    "assets/sounds/game/nhac-vao-game-kte08w.mp3",
]


async def main():
    bad = []
    for relative in TRACKS:
        path = ROOT / relative
        if not path.exists() or path.stat().st_size < 100_000:
            bad.append(f"Tệp âm thanh thiếu hoặc quá nhỏ: {relative}")

    source = (ROOT / "assets/js/game.js").read_text()
    for relative in TRACKS:
        if relative not in source:
            bad.append(f"GAME_INTROS chưa khai báo: {relative}")
    if "files.catbox.moe" in source:
        bad.append("Game còn tải âm thanh trực tiếp từ Catbox")

    async with async_playwright() as playwright:
        browser = await playwright.chromium.launch()
        page = await browser.new_page()
        await page.add_init_script(
            """window.__played=[];
            window.Audio=class {constructor(src=''){this.src=src;this.currentTime=0;this.volume=1;this.preload='';}
              play(){window.__played.push(this.src);return Promise.resolve();} pause(){} };"""
        )
        await page.goto((ROOT / "index.html").as_uri())
        await page.wait_for_timeout(500)
        await page.evaluate(
            """Math.random=()=>0;
            S.grade=App.grades.find(g=>g.id==='lop10');renderHome();
            location.hash='#/game-mini/match/game-lop10-bai-6-pikachu';Game.route();
            document.querySelector('#miniStart').click();"""
        )
        await page.wait_for_selector("#gameArena")
        await page.locator("#gameArena [data-exit]").click()
        await page.evaluate(
            """location.hash='#/game-mini/match/game-lop10-bai-6-pikachu';Game.route();
            document.querySelector('#miniStart').click();"""
        )
        await page.wait_for_selector("#gameArena")
        played = await page.evaluate("window.__played")
        if len(played) < 2:
            bad.append("Bắt đầu game hai lần nhưng chưa phát đủ hai bản nhạc")
        elif played[-1] == played[-2]:
            bad.append("Nhạc mở đầu bị lặp lại ở hai lượt liên tiếp")
        if any(not any(src.endswith(track) for track in TRACKS) for src in played):
            bad.append("Game phát nguồn âm thanh ngoài danh sách cục bộ")
        await browser.close()

    for error in bad:
        print("  ✗", error)
    print("KIỂM TRA NHẠC MỞ ĐẦU GAME:", "ĐẠT ✓" if not bad else f"CHƯA ĐẠT ✗ ({len(bad)} lỗi)")
    sys.exit(1 if bad else 0)


asyncio.run(main())
