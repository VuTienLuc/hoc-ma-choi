"""Gộp cả thư mục thành MỘT file HTML (dist/hoc-tap.html) để gửi qua Zalo/Drive hoặc mở offline.
Chạy:  python3 tools/build.py
"""
import re, pathlib
ROOT = pathlib.Path(__file__).resolve().parent.parent
html = (ROOT / 'index.html').read_text(encoding='utf-8')
cfg = (ROOT / 'config.js').read_text(encoding='utf-8')
grades = re.search(r"grades:\s*\[([^\]]*)\]", cfg).group(1)
grades = re.findall(r"'([\w-]+)'|\"([\w-]+)\"", grades)
grades = [a or b for a, b in grades]

def inline_js(m):
    src = m.group(1)
    code = (ROOT / src).read_text(encoding='utf-8')
    out = f'<script>/* {src} */\n{code}\n</script>'
    if src.endswith('engine.js'):  # dữ liệu các lớp phải nạp trước engine
        data = ''.join(f'<script>/* data/{g}.js */\n{(ROOT/"data"/(g+".js")).read_text(encoding="utf-8")}\n</script>\n' for g in grades)
        out = data + out
    return out

html = re.sub(r'<link rel="stylesheet" href="(assets/[^"]+)">',
              lambda m: '<style>\n' + (ROOT / m.group(1)).read_text(encoding='utf-8') + '\n</style>', html)
html = re.sub(r'<script src="([^"]+)"></script>', inline_js, html)
(ROOT / 'dist').mkdir(exist_ok=True)
out = ROOT / 'dist' / 'hoc-tap.html'
out.write_text(html, encoding='utf-8')
print(f'Đã tạo {out.relative_to(ROOT)} ({out.stat().st_size//1024} KB) với các lớp: {", ".join(grades)}')
