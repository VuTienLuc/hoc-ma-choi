"""Gộp cả thư mục thành MỘT file HTML (dist/hoc-tap.html) để gửi qua Zalo/Drive hoặc mở offline.
Chạy:  python3 tools/build.py
"""
import re, pathlib, base64, mimetypes
ROOT = pathlib.Path(__file__).resolve().parent.parent
html = (ROOT / 'index.html').read_text(encoding='utf-8')
cfg = (ROOT / 'config.js').read_text(encoding='utf-8')
grades = re.search(r"grades:\s*\[([^\]]*)\]", cfg).group(1)
grades = re.findall(r"'([\w-]+)'|\"([\w-]+)\"", grades)
grades = [a or b for a, b in grades]

MATHJAX_CDN = 'https://cdn.jsdelivr.net/npm/mathjax@3.2.2/es5/tex-chtml.js'
def inline_js(m):
    src = m.group(1)
    if 'vendor/mathjax' in src:   # bản một file: MathJax lấy từ CDN (cần mạng để hiện công thức đẹp)
        return f'<script src="{MATHJAX_CDN}" async id="MathJax-script"></script>'
    code = (ROOT / src).read_text(encoding='utf-8')
    if src == 'assets/js/game.js':
        for rel in ['assets/images/game/Epic Mathematics Arena Poster-optimized.webp',
                    'assets/sounds/game/tieng_chuong_chuong_trinh_rung_chuong_vang-www_tiengdong_com.mp3']:
            asset = ROOT / rel
            if asset.is_file():
                code = code.replace("'" + rel + "'", repr(data_uri(asset)))
    out = f'<script>/* {src} */\n{code}\n</script>'
    if src.endswith('engine.js'):  # dữ liệu các lớp phải nạp trước engine
        data = ''.join(f'<script>/* data/{g}.js */\n{(ROOT/"data"/(g+".js")).read_text(encoding="utf-8")}\n</script>\n' for g in grades)
        out = data + out
    return out

def data_uri(path):
    mime = mimetypes.guess_type(path.name)[0] or 'application/octet-stream'
    return f'data:{mime};base64,' + base64.b64encode(path.read_bytes()).decode('ascii')

def inline_css(m):
    css_path = ROOT / m.group(1)
    css = css_path.read_text(encoding='utf-8')
    def asset_url(u):
        raw = u.group(2)
        if raw.startswith(('data:', 'http:', 'https:', '#')):
            return u.group(0)
        asset = (css_path.parent / raw.replace('%20', ' ')).resolve()
        return f'url("{data_uri(asset)}")' if asset.is_file() else u.group(0)
    css = re.sub(r'url\((["\']?)([^"\')]+)\1\)', asset_url, css)
    return '<style>\n' + css + '\n</style>'

html = re.sub(r'<link rel="stylesheet" href="(assets/[^"]+)">', inline_css, html)
html = re.sub(r'<script src="([^"]+)"(?: async id="MathJax-script")?></script>', inline_js, html)
(ROOT / 'dist').mkdir(exist_ok=True)
out = ROOT / 'dist' / 'hoc-tap.html'
out.write_text(html, encoding='utf-8')
print(f'Đã tạo {out.relative_to(ROOT)} ({out.stat().st_size//1024} KB) với các lớp: {", ".join(grades)}')
