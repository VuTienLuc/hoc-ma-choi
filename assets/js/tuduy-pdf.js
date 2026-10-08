/* PHIẾU PDF OFFLINE cho các bài 🧠 Toán tư duy (bài có l.intro):
   kiến thức trọng tâm + 9 câu (3 mức × 3 câu, sinh ngẫu nhiên mỗi lần) + khung ô li 5 mm để học sinh làm trên giấy.
   Bấm "Phiếu PDF" → hộp thoại in của trình duyệt/iPad → chọn "Lưu thành PDF". Có bản kèm đáp án (cho thầy cô). */
const TdSheet = (() => {
  const $ = (s, r = document) => r.querySelector(s);
  const LV = ['Mức 1 · Khởi động', 'Mức 2 · Luyện tập', 'Mức 3 · Thử thách'], H = [15, 25, 35]; // chiều cao khung ô li (mm), bội của 5
  const pair = a => Array.isArray(a) ? (typeof bi === 'function' ? bi(a[0], a[1]) : a[0]) : (a || '');
  const nm = n => (n || '').replace(/<[^>]+>/g, '');

  function makeQs(l) {
    const out = [], seen = new Set();
    for (let lv = 1; lv <= 3; lv++) {
      for (let i = 0; i < 3; i++) {
        let q, tries = 0, gi = (i + (lv - 1)) % l.gens.length;
        do { q = l.gens[gi](lv); q.sig = (q.text || '') + (q.tpl || '') + (q.expr || ''); tries++; } while (seen.has(q.sig) && tries < 25);
        seen.add(q.sig); q.lv = lv; out.push(q);
      }
    }
    return out;
  }
  function ansPart(q) {
    if (q.kind === 'choice') return (q.expr ? `<div class="tds-expr">${q.expr}</div>` : '') + `<div class="tds-opts">${q.opts.map((o, k) => `<span><b>${'ABCD'[k]}.</b> ${o}</span>`).join('')}</div>`;
    if (q.kind === 'blanks' && q.tpl) return `<div class="tds-tpl">${q.tpl.replace(/\[_\]/g, '<i class="tds-bl"></i>').replace(/\[F\]/g, '<i class="tds-bl s"></i> / <i class="tds-bl s"></i>')}</div>`;
    return '';
  }
  function sheetHTML(g, l, t, withKey) {
    const qs = makeQs(l);
    const kt = (l.intro || []).map((k, i) => `<div class="tds-kt"><div><h3>${i + 1}. ${pair(k.t)}</h3><div>${pair(k.b)}</div>${k.ex ? `<div class="tds-ex">💡 ${pair(k.ex)}</div>` : ''}</div>${k.fig ? `<div class="tds-fig">${k.fig}</div>` : ''}</div>`).join('');
    const body = qs.map((q, i) => `${i % 3 === 0 ? `<h2 class="tds-lv">${LV[q.lv - 1]}</h2>` : ''}
      <section class="tds-q"><p><b class="tds-n">Câu ${i + 1}.</b> ${q.text}</p>${q.fig ? `<div class="tds-fig q">${q.fig}</div>` : ''}${ansPart(q)}
      <div class="tds-grid" style="height:${H[q.lv - 1]}mm"></div><div class="tds-ds">Đáp số: ………………………………</div></section>`).join('');
    const key = withKey ? `<div class="tds-break"></div><h2 class="tds-lv key">🔑 Đáp án và lời giải (dành cho thầy cô)</h2>${qs.map((q, i) => `<div class="tds-sol"><b>Câu ${i + 1}.</b> ${q.sol || ''}</div>`).join('')}` : '';
    return `<header class="tds-head"><div><small>${[g.name, nm(t.label || ''), nm(t.name)].filter(Boolean).join(' · ')}</small><h1>${l.name}</h1></div>
      <div class="tds-who">Họ và tên: …………………………………… Lớp: ……… Ngày: ……/……</div></header>
      <h2 class="tds-lv kt">📘 Kiến thức trọng tâm</h2>${kt}${body}${key}<footer class="tds-foot">Học mà chơi · Toán tư duy · Phiếu làm bài ô li</footer>`;
  }
  const bil = () => { try { return localStorage.getItem('hoctap:tds:bil') === '1'; } catch (e) { return false; } };
  const CSS = `@page{size:A4;margin:10mm 11mm}
body{margin:0;color:#000;background:#fff;font:12.5pt/1.45 "Be Vietnam Pro","Segoe UI",Roboto,Arial,sans-serif;-webkit-print-color-adjust:exact;print-color-adjust:exact}
h1,h2,h3,p{margin:0}
svg{display:block;max-width:100%}
.sv-ink{stroke:#111;fill:none}.sv-txt{fill:#222}
.L-en{display:none!important}
.L-vi{display:inline!important}
.bil .L-en{display:block!important;font-size:.88em;color:#555;margin:1px 0 0}
.bil .L-en.L-in{display:inline!important}
.tds-head{display:flex;justify-content:space-between;gap:12px;align-items:flex-end;border-bottom:2px solid #000;padding-bottom:4px;margin-bottom:6px}
.tds-head h1{font-size:17pt;margin:0}.tds-head small{color:#444}.tds-who{font-size:10.5pt;text-align:right}
.tds-lv{font-size:12.5pt;margin:10px 0 4px;padding:2px 8px;background:#e8e4ff;border-left:4px solid #7c5cff;break-after:avoid}
.tds-lv.key{background:#e6f6ea;border-color:#2e9d57}
.tds-kt{display:flex;gap:10px;align-items:center;margin:5px 0;break-inside:avoid}.tds-kt h3{margin:0 0 2px;font-size:12pt}
.tds-ex{margin-top:3px;padding:3px 7px;background:#fff7d6;border-radius:5px;font-size:11.5pt}
.tds-fig svg{max-width:62mm;height:auto}.tds-fig.q svg{max-width:80mm;max-height:42mm}
.tds-q{break-inside:avoid;margin:4px 0 8px}.tds-q p{margin:0 0 3px}.tds-n{color:#5b3fd0}
.tds-opts{display:flex;flex-wrap:wrap;gap:2px 22px;margin:2px 0 3px}.tds-expr{margin:2px 0}
.tds-bl{display:inline-block;width:26mm;border-bottom:1.2px dotted #000;height:1.1em;vertical-align:baseline}.tds-bl.s{width:12mm}
.tds-grid{box-sizing:border-box;width:100%;border:1.2px solid #6a8fb8;background-color:#fff;
  background-image:linear-gradient(#7fa3cf .7px,transparent .7px),linear-gradient(90deg,#7fa3cf .7px,transparent .7px);background-size:5mm 5mm}
.tds-ds{text-align:right;margin-top:2px;font-size:11pt}
.tds-break{break-after:page;height:0}
.tds-sol{break-inside:avoid;margin:3px 0;font-size:11pt;border-bottom:1px dashed #bbb;padding-bottom:3px}
.tds-foot{margin-top:8px;text-align:center;font-size:9pt;color:#777}
.tds-kt .tds-fig{flex:0 0 56mm}.tds-kt .tds-fig svg{width:100%;height:auto;max-width:none}
.tds-kt>div:first-child{flex:1 1 auto;min-width:0}
`;
  /* CSS của hình vẽ (.sv-*) và biến màu lấy từ trang chính, ép theme sáng, để hình trong phiếu giống hình trên web */
  function figCss() {
    let out = '';
    for (const sh of document.styleSheets) { let rules; try { rules = sh.cssRules; } catch (e) { continue; }
      for (const r of rules) { if (r.type !== 1) continue; const t = r.selectorText || '';
        if (t === ':root' || (/\.sv-/.test(t) && !/\.ws|\.interactive/.test(t))) out += r.cssText + '\n'; } }
    return out;
  }
  /* Phiếu có công thức (\\( … \\), \\[ … \\]) thì nạp MathJax RIÊNG trong khung in (khung này không dùng chung MathJax với trang chính);
     cờ window.__mjDone bật lên khi công thức đã vẽ xong và phông đã tải – print() và bài kiểm thử đều chờ cờ này. */
  const MJ_CFG = `window.MathJax={tex:{inlineMath:[['\\\\(','\\\\)']],displayMath:[['\\\\[','\\\\]']],processEscapes:false},chtml:{scale:1.05,matchFontHeight:false,displayAlign:'left',displayIndent:'0'},options:{enableMenu:false},
    startup:{pageReady(){return MathJax.startup.defaultPageReady().then(()=>document.fonts?document.fonts.ready:0).then(()=>{window.__mjDone=true;});}}};`;
  function docHTML(g, l, withKey) {
    const t = g.topics.find(x => x.id === l.t) || { name: '' }, body = sheetHTML(g, l, t, withKey), hasMath = /\\\(|\\\[/.test(body);
    const mj = hasMath ? '<script>' + MJ_CFG + '<\/script><script src="' + new URL('assets/vendor/mathjax/tex-chtml.js', document.baseURI).href + '" async><\/script>' : '<script>window.__mjDone=true<\/script>';
    return '<!doctype html><html data-theme="light" lang="vi"><head><meta charset="utf-8"><title>' + nm(l.name) + ' – phiếu ô li</title><style>' + figCss() + CSS + '</style>' + mj + '</head><body class="tds ' + (bil() ? 'bil' : 'vi') + '">' + body + '</body></html>';
  }
  function print(g, l, withKey) {
    document.getElementById('tdsFrame')?.remove();
    const fr = document.createElement('iframe'); fr.id = 'tdsFrame'; fr.setAttribute('aria-hidden', 'true');
    fr.style.cssText = 'position:fixed;left:-10000px;top:0;width:210mm;height:297mm;border:0;visibility:hidden';
    document.body.appendChild(fr);
    const w = fr.contentWindow, d = w.document; d.open(); d.write(docHTML(g, l, withKey)); d.close();
    const go = () => { try { w.focus(); w.print(); } catch (e) { alert('Trình duyệt chưa mở được hộp thoại in.'); } };
    let waited = 0; const ready = () => { if (w.__mjDone || (waited += 150) > 12000) setTimeout(go, 250); else setTimeout(ready, 150); };   // chờ công thức vẽ xong (tối đa 12 giây)
    setTimeout(ready, 300);
    w.addEventListener('afterprint', () => setTimeout(() => fr.remove(), 500));
    setTimeout(() => fr.remove(), 10 * 60 * 1000);
  }
  function on(name, g, l) {
    if (name !== 'lesson' || !l || !l.intro) return;
    const row = document.querySelector('#app .row'); if (!row || document.getElementById('tdsBtn')) return;
    row.insertAdjacentHTML('beforeend', `<button class="btn" id="tdsBtn" title="Mở hộp thoại in, chọn Lưu thành PDF">📄 Phiếu PDF (ô li)</button><button class="btn" id="tdsBtnKey" title="Bản có đáp án cho thầy cô">📄 Kèm đáp án</button><button class="btn small" id="tdsBil" aria-pressed="${bil()}" title="In cả tiếng Anh">🌐 Song ngữ: ${bil() ? 'bật' : 'tắt'}</button>`);
    $('#tdsBil').onclick = e => { const nv = bil() ? '0' : '1'; try { localStorage.setItem('hoctap:tds:bil', nv); } catch (x) {} e.target.setAttribute('aria-pressed', nv === '1'); e.target.textContent = '🌐 Song ngữ: ' + (nv === '1' ? 'bật' : 'tắt'); };
    $('#tdsBtn').onclick = () => print(g, l, false); $('#tdsBtnKey').onclick = () => print(g, l, true);
  }
  return { on, makeQs, sheetHTML, docHTML };
})();
