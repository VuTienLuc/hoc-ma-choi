"""Kiểm tra Pikachu Toán học: lưới, đường nối, trợ giúp và hoàn thành ván."""
import asyncio
import pathlib
import sys

from playwright.async_api import async_playwright


ROOT = pathlib.Path(__file__).resolve().parent.parent
TOPIC = "game-lop10-on-tap-c3"

FIND_MOVE = """() => {
  const tiles=[...document.querySelectorAll('.match-tile')], board=document.querySelector('.match-board');
  const cols=getComputedStyle(board).gridTemplateColumns.split(' ').length, rows=tiles.length/cols;
  const grid=Array.from({length:rows+2},()=>Array(cols+2).fill(-1));
  tiles.forEach((tile,index)=>{if(!tile.classList.contains('removed'))grid[Math.floor(index/cols)+1][index%cols+1]=index});
  const path=(a,b)=>{const A=tiles[a],B=tiles[b];
    if(A.classList.contains('removed')||B.classList.contains('removed')||A.dataset.matchPair!==B.dataset.matchPair||A.classList.contains('question')===B.classList.contains('question'))return false;
    const ar=Math.floor(a/cols)+1,ac=a%cols+1,br=Math.floor(b/cols)+1,bc=b%cols+1,D=[[-1,0],[0,1],[1,0],[0,-1]],q=[{r:ar,c:ac,d:-1,t:0}],seen=new Map();
    for(let h=0;h<q.length;h++){const s=q[h];for(let d=0;d<4;d++){const turns=s.d<0||s.d===d?s.t:s.t+1;if(turns>2)continue;const nr=s.r+D[d][0],nc=s.c+D[d][1];if(nr<0||nr>rows+1||nc<0||nc>cols+1)continue;const target=nr===br&&nc===bc;if(!target&&grid[nr][nc]>=0)continue;const key=nr+','+nc+','+d;if((seen.get(key)??9)<=turns)continue;seen.set(key,turns);if(target)return true;q.push({r:nr,c:nc,d,t:turns})}}return false};
  for(let i=0;i<tiles.length;i++)for(let j=i+1;j<tiles.length;j++)if(path(i,j))return [i,j];return null;
}"""


async def launch(page):
    await page.goto((ROOT / "index.html").as_uri())
    await page.wait_for_timeout(600)
    await page.evaluate(
        f"S.grade=App.grades.find(g=>g.id==='lop10');renderHome();"
        f"location.hash='#/game-mini/match/{TOPIC}';Game.route();document.querySelector('#miniStart').click()"
    )
    await page.wait_for_selector(".match-board")
    await page.wait_for_timeout(800)


async def main():
    bad = []
    async with async_playwright() as playwright:
        browser = await playwright.chromium.launch()
        phone = await browser.new_page(viewport={"width": 390, "height": 844}, has_touch=True)
        phone_errors = []
        phone.on("pageerror", lambda error: phone_errors.append(str(error)))
        await launch(phone)
        layout = await phone.evaluate("""() => {const b=document.querySelector('.match-board').getBoundingClientRect(),tiles=[...document.querySelectorAll('.match-tile')];return {doc:document.documentElement.scrollWidth,width:innerWidth,cols:getComputedStyle(document.querySelector('.match-board')).gridTemplateColumns.split(' ').length,b:b.toJSON(),tiles:tiles.length,q:tiles.filter(x=>x.classList.contains('question')).length,a:tiles.filter(x=>x.classList.contains('answer')).length,overflow:tiles.filter(x=>x.querySelector('span').scrollHeight>x.querySelector('span').clientHeight+3||x.querySelector('span').scrollWidth>x.querySelector('span').clientWidth+3).length}}""")
        if layout["tiles"] != 24 or layout["q"] != 12 or layout["a"] != 12:
            bad.append("Điện thoại dọc không dựng đủ 12 cặp")
        if layout["cols"] != 4 or layout["doc"] > layout["width"] + 1 or layout["b"]["right"] > layout["width"] + 1:
            bad.append("Lưới điện thoại dọc không vừa bốn cột")
        if layout["overflow"]:
            bad.append(f"Có {layout['overflow']} ô còn tràn nội dung")

        await phone.locator("#matchHint").click()
        hint_count = await phone.locator(".match-tile.hint").count()
        hint_left = await phone.locator("#matchHint b").inner_text()
        if hint_count != 2 or hint_left != "2":
            bad.append("Gợi ý không đánh dấu đúng hai ô hoặc không trừ lượt")
        hinted = await phone.eval_on_selector_all(".match-tile.hint", "els => els.map(x => +x.dataset.matchPos)")
        await phone.evaluate("p => document.querySelector(`[data-match-pos=\"${p[0]}\"]`).click()", hinted)
        preview = await phone.locator("#matchStatus").inner_text()
        if "Đã chọn" not in preview:
            bad.append("Không phóng lớn nội dung ô đã chọn")
        await phone.evaluate("p => document.querySelector(`[data-match-pos=\"${p[1]}\"]`).click()", hinted)
        await phone.wait_for_timeout(80)
        line = await phone.locator("#matchLine").get_attribute("points")
        if not line or not await phone.locator("#matchLine").evaluate("el => el.classList.contains('show')"):
            bad.append("Không vẽ đường nối khi ghép đúng")
        await phone.wait_for_timeout(450)
        if await phone.locator(".match-tile.removed").count() != 2:
            bad.append("Ghép đúng nhưng hai ô chưa biến mất")

        before = int(await phone.locator("#matchShuffle b").inner_text())
        await phone.locator("#matchShuffle").click()
        await phone.wait_for_timeout(300)
        after = int(await phone.locator("#matchShuffle b").inner_text())
        if after != before - 1:
            bad.append("Nút Xáo không trừ lượt")

        while await phone.locator(".match-tile:not(.removed)").count():
            move = await phone.evaluate(FIND_MOVE)
            if not move:
                await phone.evaluate("document.querySelector('#matchShuffle').click()")
                await phone.wait_for_timeout(250)
                move = await phone.evaluate(FIND_MOVE)
            if not move:
                bad.append("Bảng không còn cặp nối được sau khi xáo")
                break
            await phone.evaluate("p => {document.querySelector(`[data-match-pos=\"${p[0]}\"]`).click();document.querySelector(`[data-match-pos=\"${p[1]}\"]`).click()}", move)
            await phone.wait_for_timeout(430)
            if await phone.locator(".match-result").count():
                break
        if not await phone.locator(".match-result").count():
            bad.append("Nối hết cặp nhưng chưa mở trang tổng kết")
        else:
            result = await phone.locator(".match-result").inner_text()
            if "12/12" not in result or "Chơi lại" not in result or "3" not in result:
                bad.append("Trang tổng kết thiếu 12/12, sao hoặc nút chơi lại")
        bad.extend("Lỗi trang điện thoại: " + error for error in phone_errors)
        await phone.close()

        landscape = await browser.new_page(viewport={"width": 844, "height": 390}, has_touch=True)
        await launch(landscape)
        land = await landscape.evaluate("""() => {const b=document.querySelector('.match-board').getBoundingClientRect(),s=document.querySelector('[data-game-sound]').getBoundingClientRect(),p=document.querySelector('#matchStatus').getBoundingClientRect();return {cols:getComputedStyle(document.querySelector('.match-board')).gridTemplateColumns.split(' ').length,b:b.toJSON(),s:s.toJSON(),p:p.toJSON(),height:innerHeight,width:innerWidth,doc:document.documentElement.scrollWidth}}""")
        overlap = not (land["s"]["right"] <= land["p"]["left"] or land["p"]["right"] <= land["s"]["left"] or land["s"]["bottom"] <= land["p"]["top"] or land["p"]["bottom"] <= land["s"]["top"])
        if land["cols"] != 6 or land["b"]["bottom"] > land["height"] + 1 or land["doc"] > land["width"] + 1:
            bad.append("Lưới điện thoại ngang không vừa sáu cột")
        if overlap:
            bad.append("Nút âm thanh che dòng hướng dẫn trên điện thoại ngang")
        await landscape.close()
        await browser.close()

    for error in bad:
        print("  ✗", error)
    print("KIỂM TRA PIKACHU TOÁN HỌC:", "ĐẠT ✓" if not bad else f"CHƯA ĐẠT ✗ ({len(bad)} lỗi)")
    sys.exit(1 if bad else 0)


asyncio.run(main())
