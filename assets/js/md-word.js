/* Menu “Markdown ⇄ Word” (trang giáo viên, đường link #/md-word).
 * Nhập file .md (hoặc dán), xem trước, tải .md, xuất Word (.docx) có Equation chỉnh sửa được theo chuẩn /word-equation.
 * Cần: assets/vendor/word-equation/word-equation.js (WordEquation), assets/vendor/mathml2omml/mathml2omml.js (Mml2Omml), MathJax.
 * Dùng thêm ở trang “Phiếu trên lớp”: MdWord.exportDocx(md, tênTệp). */
const MdWord = (() => {
  const $ = (s, r = document) => r.querySelector(s);
  const BREAK_RE = /^<div[^>]*page-break[^>]*>\s*<\/div>\s*$/i;
  const PAGE_BREAK = '<w:p><w:r><w:br w:type="page"/></w:r></w:p>';
  const SAMPLE = String.raw`# PHIẾU THỬ – Hệ phương trình
## 1. Giải hệ phương trình
Giải hệ $\begin{cases} x+y=10 \\ x-y=2 \end{cases}$ rồi tính $x^2+y^2$.

$$\left\{\begin{array}{l} 2x+y=7 \\ x-y=-1 \end{array}\right.$$

1. Hệ có nghiệm duy nhất $(x;y)=(2;3)$.
- Ngoặc co giãn: $\left(\dfrac{a+b}{2}\right)^2 \ge ab$.

A. $x=1$
B. $x=2$
C. $x=3$
D. $x=4$

| Dạng | Cách làm |
|---|---|
| Thế | Rút $x$ theo $y$ |
| Cộng đại số | Cộng hai vế |

> Ghi nhớ: hệ $\left[\begin{array}{l} x=1 \\ x=-2 \end{array}\right.$ nghĩa là “hoặc”.
`;

  const download = (bytes, name, type) => {
    const url = URL.createObjectURL(new Blob([bytes], {type})), a = document.createElement('a');
    a.href = url; a.download = name; document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(url), 1500);
  };
  const baseName = n => (n || 'tai-lieu').replace(/\.(md|markdown|txt|docx)$/i, '').replace(/[\\/:*?"<>|]+/g, '-').trim() || 'tai-lieu';

  /* tex → MathML: MathJax đặt sẵn (tex2mmlPromise) hoặc đi đường vòng qua startup.document */
  async function tex2mml(tex, display){
    const MJ = window.MathJax;
    if(!MJ) throw Error('MathJax chưa nạp xong, thầy thử lại sau vài giây.');
    if(MJ.startup && MJ.startup.promise) await MJ.startup.promise;
    if(MJ.tex2mmlPromise) return MJ.tex2mmlPromise(tex, {display});
    if(MJ.tex2mml) return MJ.tex2mml(tex, {display});
    const doc = MJ.startup.document;
    return MJ.startup.toMML(doc.convert(tex, {display, end: MJ.STATE.CONVERT}));
  }
  const exporter = () => {
    if(typeof WordEquation === 'undefined' || typeof Mml2Omml === 'undefined') throw Error('Thiếu bộ xuất Word (word-equation.js / mathml2omml.js).');
    return WordEquation.createExporter({font: 'Times New Roman', size: 13, tex2mml, mml2omml: Mml2Omml});
  };

  /* Markdown (của phiếu trên lớp: tiêu đề, danh sách lồng, bảng, trích dẫn, A–D, $…$, $$…$$, ngắt trang) → thân tài liệu Word */
  async function body(ex, md){
    const L = WordEquation.normalizeText(md).split('\n'), out = [];
    const ind = (xml, left, hang) => xml.replace(/w:lineRule="auto"\/>/, m => m + `<w:ind w:left="${left}"${hang ? ` w:hanging="${hang}"` : ''}/>`);
    const isLi = x => /^\s*(\d+[.)]|[-*+])\s+/.test(x), indent = x => x.match(/^\s*/)[0].replace(/\t/g, '    ').length;
    let buf = [];
    const flush = async () => { if(buf.length){ out.push(ex.paragraph(await ex.inline(buf.join(' ')))); buf = []; } };
    for(let i = 0; i < L.length; i++){
      const t = L[i].trim();
      if(!t){ await flush(); continue; }
      if(BREAK_RE.test(t)){ await flush(); out.push(PAGE_BREAK); continue; }
      if(/^\$\$/.test(t)){ await flush(); let blk = t;
        while(!(blk.length >= 4 && /\$\$\s*$/.test(blk))){ if(++i >= L.length) break; blk += '\n' + L[i]; }
        out.push(await ex.displayMath(blk.trim().replace(/^\$\$|\$\$$/g, ''))); continue; }
      let m = t.match(/^(#{1,3})\s+(.*)$/);
      if(m){ await flush(); out.push(ex.paragraph(await ex.inline(m[2], {bold: true}), {style: 'Heading' + m[1].length, keepNext: true})); continue; }
      if(/^>/.test(t)){ await flush(); const q = []; while(i < L.length && /^\s*>/.test(L[i])) q.push(L[i++].trim().replace(/^>\s?/, '')); i--;
        out.push(ind(ex.paragraph(await ex.inline(q.join('\n'), {italic: true})), 567)); continue; }
      if(/^\|/.test(t)){ await flush(); const rows = []; while(i < L.length && /^\s*\|/.test(L[i])) rows.push(L[i++].trim().replace(/^\||\|$/g, '').split('|').map(c => c.trim())); i--;
        const data = rows.filter((r, k) => !(k === 1 && r.every(c => /^:?-{2,}:?$/.test(c))));
        const bd = ['top', 'left', 'bottom', 'right', 'insideH', 'insideV'].map(s => `<w:${s} w:val="single" w:sz="4" w:space="0" w:color="808080"/>`).join('');
        let tb = `<w:tbl><w:tblPr><w:tblW w:w="5000" w:type="pct"/><w:tblBorders>${bd}</w:tblBorders><w:tblCellMar><w:left w:w="80" w:type="dxa"/><w:right w:w="80" w:type="dxa"/></w:tblCellMar></w:tblPr>`;
        for(let r = 0; r < data.length; r++){ tb += '<w:tr>'; for(const c of data[r]) tb += `<w:tc><w:tcPr><w:tcW w:w="0" w:type="auto"/></w:tcPr>${ex.paragraph(await ex.inline(c, {bold: r === 0}))}</w:tc>`; tb += '</w:tr>'; }
        out.push(tb + '</w:tbl>' + ex.paragraph('')); continue; }
      const mo = t.match(/^([A-D]\.|[a-d]\))\s+/);   // phương án A–D, ý a)–d): gộp một đoạn (tab giữa các phương án)
      if(mo){ const paren = mo[1].endsWith(')'), re = paren ? /^([a-d])\)\s+(.*)/ : /^([A-D])\.\s+(.*)/, items = []; let j = i, want = mo[1].charCodeAt(0);
        while(j < L.length){ let k = j; while(k < L.length && !L[k].trim()) k++;
          const mm = k < L.length && L[k].trim().match(re); if(!mm || mm[1].charCodeAt(0) !== want) break; items.push(mm[2]); want++; j = k + 1; }
        if(items.length >= 2){ await flush(); i = j - 1; let runs = '';
          for(let k = 0; k < items.length; k++) runs += (k ? ex.run('      ') : '') + ex.run((paren ? String.fromCharCode(97 + k) + ') ' : String.fromCharCode(65 + k) + '. '), {bold: true}) + await ex.inline(items[k]);
          out.push(ex.paragraph(runs)); continue; } }
      m = L[i].match(/^(\s*)(\d+[.)]|[-*+])\s+(.*)$/);
      if(m){ await flush(); const lvl = Math.floor(indent(L[i]) / 2), numbered = /\d/.test(m[2]);
        out.push(ind(ex.paragraph(ex.run(numbered ? m[2] + ' ' : '• ') + await ex.inline(m[3])), 360 + 360 * lvl, 360)); continue; }
      buf.push(t);
    }
    await flush(); return out.join('');
  }

  /* Xuất .docx; trả về {name, stats} và tải về máy */
  async function exportDocx(md, name){
    const ex = exporter(), bytes = ex.build(await body(ex, md)), file = baseName(name) + '.docx';
    download(bytes, file, 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
    return {name: file, stats: ex.stats, bytes};
  }
  const statMsg = (r) => `Đã tạo ${r.name}: ${r.stats.equations} Equation, chuẩn hóa ${r.stats.systems} hệ` + (r.stats.errors.length ? ` · ${r.stats.errors.length} công thức lỗi (tô đỏ trong Word)` : '');

  /* ---------- Trang #/md-word ---------- */
  function route(){
    if(!/^#\/md-word/.test(location.hash)) return false;
    document.body.classList.remove('gv-wide');
    const app = $('#app'), bar = (typeof Account !== 'undefined' ? Account.userBar() : '');
    app.innerHTML = bar + `<div class="toolbar"><a class="back" href="#/">← Chọn lớp</a><span class="pill">Markdown ⇄ Word</span></div>
      <h1>Markdown ⇄ Word</h1>
      <p class="lead">Nhập hoặc dán nội dung Markdown (công thức trong <code>$…$</code>, <code>$$…$$</code>), xem trước, tải lại thành .md, hoặc xuất Word có Equation chỉnh sửa được (hệ phương trình tự chuẩn hóa).</p>
      <div class="mw-bar">
        <label class="btn small mw-file">📂 Nhập file .md<input type="file" id="mwFile" accept=".md,.markdown,.txt,text/markdown,text/plain" hidden></label>
        <button class="btn small" id="mwSample">🧪 Nạp mẫu thử</button>
        <label class="mw-name">Tên tệp <input id="mwName" value="tai-lieu" size="22" aria-label="Tên tệp"></label>
        <button class="btn small" id="mwMd">⬇️ Tải .md</button>
        <button class="btn primary small" id="mwDocx">📄 Xuất Word (.docx)</button>
        <button class="btn small" id="mwClear">🧹 Xoá</button>
      </div>
      <p class="mw-status" id="mwStatus" role="status"></p>
      <div class="mw-grid"><textarea id="mwText" class="mw-text" spellcheck="false" placeholder="Dán hoặc gõ Markdown ở đây…" aria-label="Nội dung Markdown"></textarea>
        <article class="card mw-prev" id="mwPrev" aria-label="Xem trước"></article></div>
      <p class="foot">${CONFIG.author}</p>`;
    const ta = $('#mwText'), prev = $('#mwPrev'), st = $('#mwStatus'), say = (t, bad) => { st.textContent = t; st.classList.toggle('bad', !!bad); };
    let timer = 0;
    const draw = () => {
      const md = ta.value.replace(/^﻿/, ''), clean = WordEquation.normalizeText(md).split('\n').filter(l => !BREAK_RE.test(l.trim())).join('\n');
      prev.innerHTML = md.trim() ? Lecture.mdToHtml(clean) : '<p class="mw-empty">Xem trước sẽ hiện ở đây.</p>';
      if(window.MathJax && MathJax.typesetPromise) MathJax.typesetPromise([prev]).catch(() => {});
    };
    ta.oninput = () => { clearTimeout(timer); timer = setTimeout(draw, 250); };
    $('#mwFile').onchange = async e => { const f = e.target.files[0]; if(!f) return;
      ta.value = (await f.text()).replace(/^﻿/, ''); $('#mwName').value = baseName(f.name); draw(); say(`Đã nhập ${f.name} (${ta.value.length.toLocaleString('vi-VN')} ký tự).`); e.target.value = ''; };
    $('#mwSample').onclick = () => { ta.value = SAMPLE; $('#mwName').value = 'mau-thu-he-phuong-trinh'; draw(); say('Đã nạp mẫu thử.'); };
    $('#mwClear').onclick = () => { ta.value = ''; draw(); say(''); };
    $('#mwMd').onclick = () => { if(!ta.value.trim()) return say('Chưa có nội dung để tải.', true);
      download('﻿' + ta.value, baseName($('#mwName').value) + '.md', 'text/markdown;charset=utf-8'); say('Đã tải ' + baseName($('#mwName').value) + '.md'); };
    $('#mwDocx').onclick = async e => { if(!ta.value.trim()) return say('Chưa có nội dung để xuất.', true);
      const b = e.currentTarget, old = b.textContent; b.disabled = true; b.textContent = 'Đang tạo Word…';
      try{ say(statMsg(await exportDocx(ta.value, $('#mwName').value))); }catch(err){ say('Chưa xuất được Word: ' + err.message, true); }
      finally{ b.disabled = false; b.textContent = old; } };
    draw(); document.title = 'Markdown ⇄ Word – ' + (CONFIG.brand || CONFIG.siteName);
    if(typeof Account !== 'undefined') Account.bindLogout();
    scrollTo(0, 0); return true;
  }
  return {route, exportDocx, statMsg, body, exporter, SAMPLE};
})();
