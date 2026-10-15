#!/usr/bin/env python3
"""Nhập câu hỏi NGOÀI (JSON như tiện ích Gemini JSON hàng loạt) vào Ngân hàng Thử thách của web "Học mà chơi".

Dùng:   python3 tools/nhap-cau-hoi.py file.json [file2.json ...] [--lop lop10|lop11] [--kiem] [--vi-du]
  --lop   lớp mặc định cho câu không ghi trường lớp (10 / 11 / lop10 / lop11)
  --kiem  chỉ kiểm tra và báo kết quả, KHÔNG ghi tệp
  --vi-du in một tệp JSON mẫu rồi thoát

Kết quả: ghi/cộng dồn vào data/thu-thach-ngoai-lop10.js và data/thu-thach-ngoai-lop11.js (bỏ câu trùng đề), tự thêm thẻ <script>
vào index.html và giao-vien/index.html. Các câu này tham gia "Bốc bộ hôm nay", "Bốc câu" và đề "Thử thách hôm nay".
Sau khi chạy xong: node tools/kiem-tra.js, python3 tools/test_thu_thach.py, python3 tools/build.py rồi đăng lên web.

Định dạng nhận vào (chấp nhận nhiều tên trường, tiếng Việt hoặc tiếng Anh; gốc có thể là mảng hoặc {"cau_hoi":[…]}):
  Trắc nghiệm : {"loai":"TN","lop":10,"muc_do":"Thông hiểu","cau_hoi":"…$x^2$…","phuong_an":{"A":"…","B":"…","C":"…","D":"…"},"dap_an":"B","loi_giai":"…"}
  Đúng – sai  : {"loai":"DS","cau_hoi":"…","cac_y":[{"noi_dung":"…","dung":true,"loi_giai":"…"}, … đủ 4 ý, có cả đúng lẫn sai],"loi_giai":"…"}
  Trả lời ngắn: {"loai":"TLN","cau_hoi":"…","dap_an":"-3","loi_giai":"…"}     (đáp số tối đa 4 ký tự)
Công thức viết trong $…$ (hoặc \\(…\\)). Không gõ loại thì tự đoán: có phương án → TN; có các ý → DS; còn lại → TLN."""
import json, os, re, sys, html

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
VI_DU = [
    {"loai": "TN", "lop": 10, "muc_do": "Vận dụng", "cau_hoi": "Phủ định của mệnh đề \"$\\forall x \\in \\mathbb{R},\\ x^2 \\ge 0$\" là", "phuong_an": {"A": "$\\exists x \\in \\mathbb{R},\\ x^2 \\lt 0$", "B": "$\\forall x \\in \\mathbb{R},\\ x^2 \\lt 0$", "C": "$\\exists x \\in \\mathbb{R},\\ x^2 \\le 0$", "D": "$\\forall x \\in \\mathbb{R},\\ x^2 \\le 0$"}, "dap_an": "A", "loi_giai": "Đổi $\\forall$ thành $\\exists$ và $\\ge$ thành $\\lt$."},
    {"loai": "DS", "lop": 11, "cau_hoi": "Cho cấp số cộng $(u_n)$ có $u_1 = 3$, $d = 2$.", "cac_y": [{"noi_dung": "$u_5 = 11$", "dung": True, "loi_giai": "$u_5 = 3 + 4\\cdot 2 = 11$."}, {"noi_dung": "$S_4 = 24$", "dung": True, "loi_giai": "$S_4 = 4(3+9)/2 = 24$."}, {"noi_dung": "Dãy giảm", "dung": False, "loi_giai": "$d \\gt 0$ nên dãy tăng."}, {"noi_dung": "$u_{10} = 20$", "dung": False, "loi_giai": "$u_{10} = 3 + 18 = 21$."}], "loi_giai": ""},
    {"loai": "TLN", "lop": 11, "cau_hoi": "Cấp số nhân có $u_1 = 2$, $q = 3$. Tính $u_4$.", "dap_an": "54", "loi_giai": "$u_4 = 2\\cdot 3^3 = 54$."},
]
KIND = {'tn': 'mc', 'mc': 'mc', 'mcq': 'mc', 'trac nghiem': 'mc', 'tracnghiem': 'mc', 'multiple choice': 'mc', 'multiple_choice': 'mc', 'nhieu lua chon': 'mc', 'single_choice': 'mc',
        'ds': 'tf', 'dung sai': 'tf', 'dung-sai': 'tf', 'true false': 'tf', 'true_false': 'tf', 'tf': 'tf', 'dung/sai': 'tf',
        'tln': 'sh', 'tra loi ngan': 'sh', 'short': 'sh', 'short_answer': 'sh', 'sa': 'sh', 'dien so': 'sh'}
F = {'q': ['cau_hoi', 'cauhoi', 'question', 'q', 'de_bai', 'debai', 'noi_dung', 'stem', 'de', 'text'],
     'type': ['loai', 'loai_cau', 'dang', 'type', 'kind', 'dang_cau'],
     'opts': ['phuong_an', 'phuongan', 'options', 'choices', 'opts', 'lua_chon', 'dap_an_lua_chon'],
     'ans': ['dap_an', 'dapan', 'answer', 'correct', 'ans', 'dap_an_dung', 'correct_answer', 'key'],
     'sol': ['loi_giai', 'loigiai', 'giai_thich', 'giaithich', 'explanation', 'solution', 'sol', 'huong_dan', 'giai'],
     'level': ['cap_do', 'capdo', 'muc_do', 'mucdo', 'level', 'do_kho', 'dokho', 'difficulty'],
     'lop': ['lop', 'khoi', 'grade', 'class'],
     'items': ['cac_y', 'cacy', 'y', 'statements', 'items', 'menh_de', 'noi_dung_y', 'phan_tu'],
     'ok': ['dung', 'dap_an', 'ok', 'answer', 'is_true', 'correct', 'dung_sai', 'truth']}

def fold(s):
    import unicodedata
    s = unicodedata.normalize('NFD', str(s)); s = ''.join(c for c in s if unicodedata.category(c) != 'Mn').replace('đ', 'd').replace('Đ', 'D')
    return re.sub(r'\s+', ' ', s.strip().lower())

def nk(k):
    r = re.sub(r'[^a-z0-9]+', '_', fold(k)).strip('_')
    return 'dap_an' if r.startswith('dap_an_cau_hoi') else r            # "Đáp án (Câu hỏi nhiều đáp án: …)" của bộ xuất Gemini/Azota

def get(d, key, default=None):
    low = {nk(k): v for k, v in d.items()}
    for a in F[key]:
        if a in low and low[a] not in (None, ''): return low[a]
    return default

def find_list(o):
    if isinstance(o, list):
        if o and all(isinstance(x, dict) for x in o): return o
        for x in o:
            r = find_list(x)
            if r: return r
        return []
    if isinstance(o, dict):
        best = []
        for k, v in o.items():
            if isinstance(v, (list, dict)):
                r = find_list(v)
                if len(r) > len(best): best = r
        return best
    return []

def tex(s):
    """$…$ / $$…$$ / \\(…\\) → \\(…\\); văn bản ngoài công thức được thoát HTML; xuống dòng → <br>."""
    s = str(s).replace('\r', '').strip()
    out, pos = [], 0
    for m in re.finditer(r'\$\$(.+?)\$\$|\$([^$\n]+?)\$|\\\((.+?)\\\)|\\\[(.+?)\\\]', s, re.S):
        out.append(html.escape(s[pos:m.start()], quote=False))
        inner = next(g for g in m.groups() if g is not None).strip()
        inner = inner.replace('<=', '\\le ').replace('>=', '\\ge ').replace('<', '\\lt ').replace('>', '\\gt ')
        out.append('\\(' + inner + '\\)'); pos = m.end()
    out.append(html.escape(s[pos:], quote=False))
    r = ''.join(out)
    if '$' in re.sub(r'\\\(.*?\\\)', '', r, flags=re.S): raise ValueError('dấu $ lẻ (công thức chưa đóng)')
    return r.replace('\n', '<br>')

def letter_of(v, opts):
    v = str(v).strip()
    if re.fullmatch(r'[A-Da-d]', v): return 'ABCD'.index(v.upper())
    m = re.match(r'^\s*([A-Da-d])\s*[.):\-]', v)
    if m: return 'ABCD'.index(m.group(1).upper())
    if re.fullmatch(r'[1-4]', v) and len(opts) == 4: return int(v) - 1
    for i, o in enumerate(opts):
        if fold(o) == fold(v): return i
    return None

def parse_opts(o, d):
    if isinstance(o, dict): o = [o[k] for k in sorted(o, key=lambda k: str(k).upper())]
    if not o:
        low = {nk(k): v for k, v in d.items()}
        o = [next((low[n] for n in (k.lower(), 'dap_an_' + k.lower(), 'phuong_an_' + k.lower(), 'option_' + k.lower()) if low.get(n) not in (None, '')), None) for k in 'ABCD']
        if any(x is None for x in o): return None
    return [re.sub(r'^\s*[A-Da-d]\s*[.):]\s+', '', str(x)) for x in o]

def truthy(v):
    if isinstance(v, bool): return v
    f = fold(v)
    if f in ('dung', 'd', 'true', 't', '1', 'yes', 'dung.'): return True
    if f in ('sai', 's', 'false', 'f', '0', 'no', 'sai.'): return False
    return None

LV = {'1': 'Nhận biết', '2': 'Thông hiểu', '3': 'Vận dụng', '4': 'Vận dụng cao'}
NEEDS_FIG = re.compile(r'gạch chéo|hình vẽ|hình bên|hình dưới|như hình|trong hình|ở hình|hình sau|biểu đồ|bảng sau|bảng bên', re.I)
BAD_SOL = re.compile(r'Lỗi do|đổi lại thành|sửa lại|Sắp xếp đáp án|xin lỗi|nhầm lẫn', re.I)

def steps(sol):
    """Lời giải kiểu "bước 1 // bước 2 // Chọn B." → các đoạn <p>."""
    parts = [x.strip() for x in re.split(r'\s*//\s*', str(sol)) if x.strip()]
    return ''.join('<p>' + tex(x) + '</p>' for x in parts)

def convert(d, dflt_lop):
    """→ (lop, kind, item) hoặc ném ValueError với lý do."""
    q = get(d, 'q')
    if not q: raise ValueError('thiếu nội dung câu hỏi')
    tp = get(d, 'type'); kind = KIND.get(fold(tp)) if tp else None
    opts_raw, items_raw = get(d, 'opts'), get(d, 'items')
    if not kind: kind = 'mc' if (opts_raw or parse_opts(None, d)) else 'tf' if items_raw else 'sh'
    lop = get(d, 'lop'); lop = ('lop' + re.search(r'\d+', str(lop)).group()) if lop and re.search(r'\d+', str(lop)) else dflt_lop
    if lop not in ('lop10', 'lop11'): raise ValueError('chưa rõ lớp (thêm trường "lop": 10/11 hoặc dùng --lop)')
    sol = get(d, 'sol') or ''
    if NEEDS_FIG.search(str(q)): raise ValueError('câu cần hình/bảng minh hoạ (web chưa nhập được hình) – thêm tay hoặc bỏ')
    if BAD_SOL.search(str(sol)): raise ValueError('lời giải có dấu hiệu lỗi/chưa chỉnh (có chữ "Lỗi do…/đổi lại…") – nhờ Gemini viết lại lời giải')
    sol_h = steps(sol) if sol else ''
    if kind == 'mc':
        opts = parse_opts(opts_raw, d)
        if not opts or len(opts) != 4: raise ValueError('cần đúng 4 phương án A–D')
        if len({fold(o) for o in opts}) != 4: raise ValueError('có phương án trùng nhau')
        k = letter_of(get(d, 'ans'), opts)
        if k is None: raise ValueError('đáp án không khớp phương án nào (ghi A/B/C/D)')
        if not sol: raise ValueError('thiếu lời giải')
        m = re.search(r'Chọn\s+([A-D])\b[^A-D]*$', str(sol))
        if m and 'ABCD'.index(m.group(1)) != k: raise ValueError(f'đáp án ghi {"ABCD"[k]} nhưng lời giải kết luận "Chọn {m.group(1)}" – mâu thuẫn')
        h = [tex(o) for o in opts]; lv = str(get(d, 'level') or 'Vận dụng'); lv = LV.get(lv.strip(), lv)
        return lop, kind, {'level': lv, 'q': tex(q), 'opts': [h[k]] + [x for i, x in enumerate(h) if i != k], 'sol': sol_h}
    if kind == 'tf':
        if not isinstance(items_raw, list) or len(items_raw) != 4: raise ValueError('đúng–sai cần đúng 4 ý')
        its = []
        for j, it in enumerate(items_raw):
            if isinstance(it, str): raise ValueError(f'ý {j+1}: cần dạng {{"noi_dung":…,"dung":true/false}}')
            t = get(it, 'q') or it.get('text') or it.get('noi_dung'); ok = None
            for a in F['ok']:
                if a in {nk(k) for k in it}: ok = truthy({nk(k): v for k, v in it.items()}[a]); 
                if ok is not None: break
            s = get(it, 'sol') or sol
            if not t or ok is None: raise ValueError(f'ý {j+1}: thiếu nội dung hoặc đúng/sai')
            if not s: raise ValueError(f'ý {j+1}: thiếu lời giải')
            its.append({'text': tex(t), 'ok': ok, 'sol': '<p>' + tex(s) + '</p>'})
        if all(x['ok'] for x in its) or not any(x['ok'] for x in its): raise ValueError('4 ý phải có cả đúng lẫn sai')
        return lop, kind, {'stem': tex(q), 'items': its}
    a = get(d, 'ans')
    if isinstance(a, list): a = a[0] if a else None
    if a is None: raise ValueError('thiếu đáp số')
    a = str(a).strip().replace('.', ',') if re.fullmatch(r'-?\d+\.\d+', str(a).strip()) else str(a).strip()
    if len(a) > 4: raise ValueError(f'đáp số "{a}" dài hơn 4 ký tự (chuẩn THPT 2025)')
    if not sol: raise ValueError('thiếu lời giải')
    return lop, kind, {'q': tex(q), 'ans': a, 'sol': sol_h}

def meta_from_name(f):
    """Tên tệp kiểu "Lớp 10 - Chương I. Mệnh đề và tập hợp - Trắc nghiệm - 12 câu.json" (kể cả khi tên bị đổi dấu thành L_p_10_-_Ch__ng_I...)."""
    n = os.path.basename(f); lop = re.search(r'L\S{0,3}p[ _]+(\d{1,2})', n); ch = re.search(r'Ch\S{0,4}ng[ _]+([IVXivx]+|\d+)', n)
    return (f'lop{lop.group(1)}' if lop else None), (ch.group(1).upper() if ch else None)

HEAD = """/* Câu hỏi NGOÀI do thầy nhập (JSON) cho Ngân hàng Thử thách – %s. TỆP SINH TỰ ĐỘNG bởi tools/nhap-cau-hoi.py: đừng sửa tay, chạy lại lệnh để thêm câu.
   Mỗi câu là một mẫu cố định; cùng với các mẫu sinh số ngẫu nhiên trong data/thu-thach-bank-*.js, chúng tham gia đề “Thử thách hôm nay”, “Bốc bộ hôm nay” và “Bốc câu”. */
(() => {
  const D = %s;
  D.forEach(x => { const {kind, ...it} = x; TTB.add('%s', kind, () => JSON.parse(JSON.stringify(it))); });
})();
"""

def load(lop):
    p = os.path.join(ROOT, 'data', f'thu-thach-ngoai-{lop}.js')
    if not os.path.exists(p): return p, []
    m = re.search(r'const D = (\[.*?\]);\n  D\.forEach', open(p, encoding='utf-8').read(), re.S)
    return p, (json.loads(m.group(1)) if m else [])

def add_script(path, prefix, lop):
    s = open(path, encoding='utf-8').read(); tag = f'<script src="{prefix}data/thu-thach-ngoai-{lop}.js"></script>'
    if tag in s: return
    anchor = f'<script src="{prefix}data/thu-thach-kiem-tra.js"></script>'
    if anchor not in s: print(f'  ! không thấy chỗ chèn trong {path}; thầy thêm tay dòng {tag} trước thu-thach-kiem-tra.js'); return
    open(path, 'w', encoding='utf-8').write(s.replace(anchor, tag + '\n' + anchor, 1))

def main(argv):
    if '--vi-du' in argv:
        print(json.dumps({'cau_hoi': VI_DU}, ensure_ascii=False, indent=2)); return 0
    kiem = '--kiem' in argv; dflt = None; files = []
    i = 0
    while i < len(argv):
        a = argv[i]
        if a == '--lop': m = re.search(r'\d+', argv[i + 1] if i + 1 < len(argv) else ''); dflt = f'lop{m.group()}' if m else None; i += 1
        elif not a.startswith('--'): files.append(a)
        i += 1
    if not files: print(__doc__); return 2
    new = {'lop10': [], 'lop11': []}; bad = 0; total = 0
    for f in files:
        try: data = json.load(open(f, encoding='utf-8'))
        except Exception as e:
            txt = open(f, encoding='utf-8').read(); m = re.search(r'```(?:json)?\s*(.*?)```', txt, re.S)      # Gemini hay bọc trong ```json … ```
            try: data = json.loads(m.group(1)) if m else (_ for _ in ()).throw(e)
            except Exception as e2: print(f'✗ {f}: không đọc được JSON ({e2})'); bad += 1; continue
        lst = find_list(data)
        if not lst: print(f'✗ {f}: không thấy danh sách câu hỏi'); bad += 1; continue
        flop, fch = meta_from_name(f)
        for n, d in enumerate(lst, 1):
            if str(d.get('STT', '')).strip().lower() == 'idx' or str(d.get('Câu hỏi', '')).strip() == 'title': continue      # hàng tiêu đề của bộ xuất Gemini/Azota
            total += 1
            try:
                lop, kind, it = convert(d, flop or dflt)
                if fch: it['chuong'] = fch
                new[lop].append({'kind': kind, **it})
            except Exception as e: bad += 1; print(f'✗ {os.path.basename(f)[:48]}… câu {d.get("STT") or n}: {e}')
    added = 0
    for lop, items in new.items():
        if not items: continue
        p, old = load(lop); seen = {x.get('q') or x.get('stem') for x in old}; fresh = []
        for it in items:
            key = it.get('q') or it.get('stem')
            if key in seen: print(f'  – bỏ câu trùng đề ({lop}): {re.sub(chr(92) + "(.*?" + chr(92) + ")", "…", key)[:50]}'); continue
            seen.add(key); fresh.append(it)
        added += len(fresh)
        if fresh and not kiem:
            body = json.dumps(old + fresh, ensure_ascii=False, indent=1).replace('\n', '\n  ')
            open(p, 'w', encoding='utf-8').write(HEAD % (('Toán 10' if lop == 'lop10' else 'Toán 11'), body, lop))
            add_script(os.path.join(ROOT, 'index.html'), '', lop); add_script(os.path.join(ROOT, 'giao-vien', 'index.html'), '../', lop)
        print(f'{lop}: +{len(fresh)} câu mới (tổng {len(old) + len(fresh)}: ' + ', '.join(f'{k}={sum(1 for x in old + fresh if x["kind"] == k)}' for k in ('mc', 'tf', 'sh')) + ')')
    print(f'Tổng {total} câu đọc được · {added} câu hợp lệ{" (chế độ --kiem: chưa ghi tệp)" if kiem else " đã ghi"} · {bad} câu/tệp lỗi')
    if added and not kiem: print('Tiếp theo: node tools/kiem-tra.js && python3 tools/test_thu_thach.py && python3 tools/build.py')
    return 1 if bad and not added else 0

if __name__ == '__main__': sys.exit(main(sys.argv[1:]))
