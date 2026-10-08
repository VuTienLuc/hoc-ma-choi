"""Kiểm tra bảng giáo viên theo dõi học sinh trong từng bài."""
import asyncio
import json
import pathlib
import sys

from playwright.async_api import async_playwright


ROOT = pathlib.Path(__file__).resolve().parent.parent


async def prepare(page, teacher):
    account = {"token": "teacher-token" if teacher else "student-token",
               "name": "Thầy Lực" if teacher else "Nguyễn An",
               "lop": "GV" if teacher else "10A1",
               "user": "gv" if teacher else "an"}
    await page.add_init_script(f"localStorage.setItem('hoctap:session', JSON.stringify({json.dumps(account)}))")
    await page.goto((ROOT / "index.html").as_uri())
    await page.wait_for_timeout(600)
    await page.evaluate("""() => {
      S.grade=App.grades.find(g=>g.id==='lop10');
      S.lesson=S.grade.lessons[0]; S.lv=1; genSet(); renderLesson();
    }""")


async def main():
    bad = []
    async with async_playwright() as playwright:
        browser = await playwright.chromium.launch()
        teacher = await browser.new_page(viewport={"width": 390, "height": 844}, has_touch=True)
        errors = []
        teacher.on("pageerror", lambda error: errors.append(str(error)))
        await prepare(teacher, True)
        if await teacher.locator("[data-lesson-monitor]").count() != 1:
            bad.append("Tài khoản giáo viên không thấy nút Theo dõi lớp")
        await teacher.evaluate("""() => { Account.call = async () => ({ok:true,classes:[
          {lop:'10A1',rows:[
            {name:'An',user:'an',joined:true,levels:[null,null,null],completed:0,stars:0,state:'todo',last:''},
            {name:'Bình',user:'binh',joined:true,levels:[3,2,null],completed:2,stars:5,state:'doing',last:'08/10/2026'},
            {name:'Chi',user:'chi',joined:true,levels:[3,3,2],completed:3,stars:8,state:'done',last:'08/10/2026'}]},
          {lop:'10A2',rows:[{name:'Dung',user:'dung',joined:false,levels:[null,null,null],completed:0,stars:0,state:'todo',last:''}]}
        ]}) }""")
        await teacher.locator("[data-lesson-monitor]").click()
        await teacher.wait_for_selector(".lm-summary")
        summary = await teacher.locator(".lm-summary").inner_text()
        if not all(text in summary for text in ("3", "Chưa làm", "Đang làm", "Đủ 3 mức")):
            bad.append("Bảng tổng hợp thiếu sĩ số hoặc ba trạng thái")
        names = await teacher.locator(".lm-students strong").all_inner_texts()
        if names != ["An", "Bình", "Chi"]:
            bad.append("Danh sách học sinh không được chia đúng ba trạng thái")
        levels = await teacher.locator(".lm-students article").nth(1).locator(".lm-level").all_inner_texts()
        if levels != ["M1 3⭐", "M2 2⭐", "M3 —"]:
            bad.append("Bảng không hiện đúng sao của từng mức")
        layout = await teacher.evaluate("""() => {const c=document.querySelector('.lesson-monitor-card').getBoundingClientRect();return {doc:document.documentElement.scrollWidth,w:innerWidth,left:c.left,right:c.right}}""")
        if layout["doc"] > layout["w"] + 1 or layout["left"] < -1 or layout["right"] > layout["w"] + 1:
            bad.append("Bảng theo dõi bị tràn ngang trên điện thoại")
        await teacher.select_option("#lmClass", "10A2")
        if await teacher.locator(".lm-students strong").all_inner_texts() != ["Dung"]:
            bad.append("Không chuyển được sang lớp khác")
        await teacher.locator("[data-lm-close]").click()
        if await teacher.locator(".lesson-monitor-overlay").count():
            bad.append("Không đóng được bảng theo dõi")
        bad.extend("Lỗi trang giáo viên: " + error for error in errors)
        await teacher.close()

        student = await browser.new_page(viewport={"width": 390, "height": 844}, has_touch=True)
        await prepare(student, False)
        if await student.locator("[data-lesson-monitor]").count():
            bad.append("Tài khoản học sinh vẫn thấy nút Theo dõi lớp")
        await student.close()
        await browser.close()

    for error in bad:
        print("  ✗", error)
    print("KIỂM TRA THEO DÕI TỪNG BÀI:", "ĐẠT ✓" if not bad else f"CHƯA ĐẠT ✗ ({len(bad)} lỗi)")
    sys.exit(1 if bad else 0)


asyncio.run(main())
