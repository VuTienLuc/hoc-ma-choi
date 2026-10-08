/* =====================================================================
   CLASSMATRIX – Bảng tổng hợp tiến độ cả lớp theo từng bài + xuất Excel (.xlsx). Chỉ dành cho tài khoản giáo viên.
   - Nút “📊 Thống kê lớp” ở trang chủ của một khối (khi đăng nhập tài khoản giáo viên) → hộp thoại: chọn lớp, bảng
     hàng = học sinh, cột = bài (xếp theo chủ đề), ô tô màu: xanh = đủ 3 mức · vàng = 1–2 mức · đỏ = chưa làm.
   - Bấm tên một bài (đầu cột) → danh sách học sinh đã làm đủ / đang làm / CHƯA làm bài đó.
   - ⬇ Xuất Excel: sheet “Tổng hợp” (đúng như bảng) và sheet “Theo bài” (mỗi bài: số em và tên các em chưa làm, đang làm).
   - Dữ liệu: action gradeProgress của Code.gs (1 lần gọi). Nếu máy chủ chưa cập nhật thì tự gọi lessonStatus từng bài (chậm hơn).
   - Tệp .xlsx tự dựng trong trình duyệt (zip không nén, không cần thư viện ngoài).
   ===================================================================== */
const ClassMatrix = (() => {
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const $ = (q, r = document) => r.querySelector(q);
  const close = () => { const o = $('.cm-overlay'); if(o) o.remove(); };
  const gnum = g => +String(g.id).replace(/\D/g, '');
  const short = n => { const m = String(n).match(/^(Bài\s*\d+|Ôn tập[^.]*|Đại số\s*\d+|Hình học\s*\d+)/i); return (m ? m[1] : String(n)).slice(0, 26); };

  /* ---- Tính trạng thái ---- */
  const lessonList = g => {
    const order = new Map(g.topics.map((t, i) => [t.id, i]));
    return g.lessons.map(l => { const t = g.topics.find(x => x.id === l.t) || {}; return {id:l.id, name:l.name.replace(/<[^>]+>/g, ''), topic:String(t.name || '').replace(/<[^>]+>/g, ''), label:String(t.label || '').replace(/<[^>]+>/g, ''), o:order.get(l.t) ?? 99}; })
      .sort((a, b) => a.o - b.o);
  };
  const lv = (row, id) => { const a = (row.p && row.p[id]) || [null, null, null]; const done = a.filter(v => v !== null && v !== undefined).length; return {done, stars:a.reduce((s, v) => s + (+v || 0), 0), st:done === 0 ? 'todo' : done === 3 ? 'done' : 'doing'}; };
  const summarize = (rows, ls) => rows.map(r => { const c = {done:0, doing:0, todo:0}; let stars = 0; const cells = ls.map(l => { const x = lv(r, l.id); c[x.st]++; stars += x.stars; return x; }); return {r, cells, c, stars}; });
  const byLesson = (sum, ls) => ls.map((l, i) => { const o = {done:[], doing:[], todo:[]}; sum.forEach(s => o[s.cells[i].st].push(s.r.name)); return o; });

  /* ---- Lấy dữ liệu ---- */
  async function fetchData(g, ls, note){
    const grade = gnum(g);
    try{
      const r = await Account.call('gradeProgress', {grade});
      if(r && r.ok) return r;
      if(r && r.code === 'teacher') throw new Error(r.msg || 'Chỉ tài khoản giáo viên mới xem được.');
    }catch(e){ if(/giáo viên/.test(String(e.message))) throw e; }
    // máy chủ cũ: gọi từng bài (4 bài một lượt)
    const out = new Map(); let done = 0;
    for(let i = 0; i < ls.length; i += 4){
      const part = await Promise.all(ls.slice(i, i + 4).map(l => Account.call('lessonStatus', {grade, lesson:l.id})));
      part.forEach((r, k) => {
        if(!r || !r.ok) throw new Error((r && r.msg) || 'Không tải được dữ liệu.');
        r.classes.forEach(c => c.rows.forEach(x => {
          const key = c.lop + '|' + x.user; if(!out.has(key)) out.set(key, {lop:c.lop, name:x.name, user:x.user, joined:x.joined, last:x.last, p:{}});
          if(x.completed) out.get(key).p[ls[i + k].id] = x.levels;
        }));
      });
      done += part.length; note(`Đang tải… ${done}/${ls.length} bài`);
    }
    const classes = {}; out.forEach(v => (classes[v.lop] = classes[v.lop] || []).push(v));
    return {ok:true, grade:g.id, classes:Object.keys(classes).sort((a, b) => a.localeCompare(b, 'vi', {numeric:true})).map(lop => ({lop, rows:classes[lop]}))};
  }

  /* ---- Xuất .xlsx (zip không nén) ---- */
  const CRC = (() => { const t = new Uint32Array(256); for(let n = 0; n < 256; n++){ let c = n; for(let k = 0; k < 8; k++) c = c & 1 ? 0xEDB88320 ^ (c >>> 1) : c >>> 1; t[n] = c >>> 0; } return b => { let c = 0xFFFFFFFF; for(let i = 0; i < b.length; i++) c = t[(c ^ b[i]) & 255] ^ (c >>> 8); return (c ^ 0xFFFFFFFF) >>> 0; }; })();
  function zip(files){
    const enc = new TextEncoder(), parts = [], cen = []; let off = 0;
    files.forEach(f => {
      const name = enc.encode(f.name), data = enc.encode(f.data), crc = CRC(data);
      const lh = new DataView(new ArrayBuffer(30)); lh.setUint32(0, 0x04034b50, true); lh.setUint16(4, 20, true); lh.setUint16(6, 0x0800, true); lh.setUint16(8, 0, true); lh.setUint16(10, 0, true); lh.setUint16(12, 0x21, true);
      lh.setUint32(14, crc, true); lh.setUint32(18, data.length, true); lh.setUint32(22, data.length, true); lh.setUint16(26, name.length, true); lh.setUint16(28, 0, true);
      parts.push(new Uint8Array(lh.buffer), name, data);
      const ch = new DataView(new ArrayBuffer(46)); ch.setUint32(0, 0x02014b50, true); ch.setUint16(4, 20, true); ch.setUint16(6, 20, true); ch.setUint16(8, 0x0800, true); ch.setUint16(10, 0, true); ch.setUint16(12, 0, true); ch.setUint16(14, 0x21, true);
      ch.setUint32(16, crc, true); ch.setUint32(20, data.length, true); ch.setUint32(24, data.length, true); ch.setUint16(28, name.length, true); ch.setUint32(42, off, true);
      cen.push(new Uint8Array(ch.buffer), name); off += 30 + name.length + data.length;
    });
    const cl = cen.reduce((s, x) => s + x.length, 0), end = new DataView(new ArrayBuffer(22)); end.setUint32(0, 0x06054b50, true); end.setUint16(8, files.length, true); end.setUint16(10, files.length, true); end.setUint32(12, cl, true); end.setUint32(16, off, true);
    return new Blob([...parts, ...cen, new Uint8Array(end.buffer)], {type:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
  }
  const X = s => String(s == null ? '' : s).replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/g, '').replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
  const col = i => { let s = ''; for(i++; i > 0; i = Math.floor((i - 1) / 26)) s = String.fromCharCode(65 + (i - 1) % 26) + s; return s; };
  // kiểu ô: 0 mặc định · 1 tiêu đề · 2 xanh · 3 vàng · 4 đỏ · 5 chữ có viền · 6 số có viền · 7 chữ xuống dòng · 8 tiêu đề xoay dọc · 9 tên tệp/ghi chú in nghiêng
  const STYLES = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><fonts count="3"><font><sz val="11"/><name val="Calibri"/></font><font><b/><sz val="11"/><name val="Calibri"/></font><font><i/><sz val="10"/><color rgb="FF555555"/><name val="Calibri"/></font></fonts>
<fills count="6"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill><fill><patternFill patternType="solid"><fgColor rgb="FFDBE6FB"/></patternFill></fill><fill><patternFill patternType="solid"><fgColor rgb="FFC8EFD5"/></patternFill></fill><fill><patternFill patternType="solid"><fgColor rgb="FFFFF0B3"/></patternFill></fill><fill><patternFill patternType="solid"><fgColor rgb="FFF8D0D0"/></patternFill></fill></fills>
<borders count="2"><border><left/><right/><top/><bottom/><diagonal/></border><border><left style="thin"><color rgb="FF9AA0AA"/></left><right style="thin"><color rgb="FF9AA0AA"/></right><top style="thin"><color rgb="FF9AA0AA"/></top><bottom style="thin"><color rgb="FF9AA0AA"/></bottom><diagonal/></border></borders>
<cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs>
<cellXfs count="10"><xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/>
<xf numFmtId="0" fontId="1" fillId="2" borderId="1" xfId="0" applyFont="1" applyFill="1" applyBorder="1" applyAlignment="1"><alignment horizontal="center" vertical="center" wrapText="1"/></xf>
<xf numFmtId="0" fontId="0" fillId="3" borderId="1" xfId="0" applyFill="1" applyBorder="1" applyAlignment="1"><alignment horizontal="center" vertical="center"/></xf>
<xf numFmtId="0" fontId="0" fillId="4" borderId="1" xfId="0" applyFill="1" applyBorder="1" applyAlignment="1"><alignment horizontal="center" vertical="center"/></xf>
<xf numFmtId="0" fontId="0" fillId="5" borderId="1" xfId="0" applyFill="1" applyBorder="1" applyAlignment="1"><alignment horizontal="center" vertical="center"/></xf>
<xf numFmtId="0" fontId="0" fillId="0" borderId="1" xfId="0" applyBorder="1" applyAlignment="1"><alignment vertical="center"/></xf>
<xf numFmtId="0" fontId="0" fillId="0" borderId="1" xfId="0" applyBorder="1" applyAlignment="1"><alignment horizontal="center" vertical="center"/></xf>
<xf numFmtId="0" fontId="0" fillId="0" borderId="1" xfId="0" applyBorder="1" applyAlignment="1"><alignment vertical="top" wrapText="1"/></xf>
<xf numFmtId="0" fontId="1" fillId="2" borderId="1" xfId="0" applyFont="1" applyFill="1" applyBorder="1" applyAlignment="1"><alignment horizontal="center" vertical="bottom" textRotation="90" wrapText="1"/></xf>
<xf numFmtId="0" fontId="2" fillId="0" borderId="0" xfId="0" applyFont="1"/></cellXfs></styleSheet>`;
  // ô: [giá trị, kiểu]; chuỗi → inlineStr, số → số
  const cell = (r, c, v, s) => v === '' || v == null ? `<c r="${col(c)}${r}" s="${s || 0}"/>` : typeof v === 'number' ? `<c r="${col(c)}${r}" s="${s || 0}"><v>${v}</v></c>` : `<c r="${col(c)}${r}" s="${s || 0}" t="inlineStr"><is><t xml:space="preserve">${X(v)}</t></is></c>`;
  const sheetXml = ({rows, widths, freeze, merges, heights}) => `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><sheetViews><sheetView workbookViewId="0">${freeze ? `<pane xSplit="${freeze[0]}" ySplit="${freeze[1]}" topLeftCell="${col(freeze[0])}${freeze[1] + 1}" activePane="bottomRight" state="frozen"/>` : ''}</sheetView></sheetViews><sheetFormatPr defaultRowHeight="18"/><cols>${widths.map((w, i) => `<col min="${i + 1}" max="${i + 1}" width="${w}" customWidth="1"/>`).join('')}</cols><sheetData>${rows.map((row, i) => `<row r="${i + 1}"${heights && heights[i] ? ` ht="${heights[i]}" customHeight="1"` : ''}>${row.map((c, j) => cell(i + 1, j, c && c.length ? c[0] : c, c && c.length ? c[1] : 0)).join('')}</row>`).join('')}</sheetData>${merges && merges.length ? `<mergeCells count="${merges.length}">${merges.map(m => `<mergeCell ref="${m}"/>`).join('')}</mergeCells>` : ''}</worksheet>`;
  function buildXlsx(g, ls, lop, sum){
    const FIX = ['STT', 'Họ và tên', 'Tài khoản', 'Đủ 3 mức', 'Đang làm', 'Chưa làm', 'Tổng ⭐', 'Làm gần nhất'], nf = FIX.length;
    const r1 = Array(nf).fill(''), r2 = FIX.map(h => [h, 1]), merges = [], groups = [];
    ls.forEach((l, i) => { const k = l.label + '|' + l.topic; if(groups.length && groups[groups.length - 1].k === k) groups[groups.length - 1].n++; else groups.push({k, name:(l.label ? l.label + '. ' : '') + l.topic, from:i, n:1}); });
    groups.forEach(gr => { for(let j = 0; j < gr.n; j++) r1.push(j ? '' : [gr.name, 1]); if(gr.n > 1) merges.push(`${col(nf + gr.from)}1:${col(nf + gr.from + gr.n - 1)}1`); });
    for(let j = 0; j < nf; j++){ r1[j] = ['', 1]; merges.push(`${col(j)}1:${col(j)}2`); r2[j] = [FIX[j], 1]; }
    ls.forEach(l => r2.push([l.name, 8]));
    const rows = [r1, r2];
    sum.forEach((s, i) => rows.push([[i + 1, 6], [s.r.name, 5], [s.r.user, 5], [s.c.done, 6], [s.c.doing, 6], [s.c.todo, 6], [s.stars, 6], [s.r.last || '', 6]].concat(s.cells.map(x => [x.done, x.st === 'done' ? 2 : x.st === 'doing' ? 3 : 4]))));
    const tot = ['', ['Số em đã làm đủ 3 mức', 1], '', '', '', '', '', ''].map(v => v), by = byLesson(sum, ls);
    rows.push([['', 5], ['Số em đủ 3 mức', 1], ['', 5], ['', 5], ['', 5], ['', 5], ['', 5], ['', 5]].concat(by.map(b => [b.done.length, 6])));
    rows.push([['', 5], ['Số em chưa làm', 1], ['', 5], ['', 5], ['', 5], ['', 5], ['', 5], ['', 5]].concat(by.map(b => [b.todo.length, 6])));
    rows.push([]); rows.push([[`Ghi chú: số trong ô = số mức (1–3) mà học sinh đã làm xong bộ câu hỏi của bài đó. Xanh = đủ 3 mức · Vàng = 1–2 mức · Đỏ = chưa làm. Sao trò chơi không tính.`, 9]]);
    const s1 = sheetXml({rows, widths:[5, 24, 16, 9, 9, 9, 8, 13].concat(ls.map(() => 6.5)), freeze:[3, 2], merges, heights:{1:150}});
    const r3 = [['Chủ đề', 1], ['Bài', 1], ['Đủ 3 mức', 1], ['Đang làm', 1], ['Chưa làm', 1], ['Học sinh CHƯA làm', 1], ['Học sinh đang làm (1–2 mức)', 1]], rows2 = [r3];
    ls.forEach((l, i) => { const b = by[i]; rows2.push([[(l.label ? l.label + '. ' : '') + l.topic, 7], [l.name, 7], [b.done.length, 6], [b.doing.length, 6], [b.todo.length, 6], [b.todo.join(', '), 7], [b.doing.join(', '), 7]]); });
    const s2 = sheetXml({rows:rows2, widths:[34, 42, 10, 10, 10, 60, 40], freeze:[2, 1]});
    const files = [
      {name:'[Content_Types].xml', data:'<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/><Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/><Override PartName="/xl/worksheets/sheet2.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/><Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/></Types>'},
      {name:'_rels/.rels', data:'<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>'},
      {name:'xl/workbook.xml', data:'<?xml version="1.0" encoding="UTF-8" standalone="yes"?><workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><sheets><sheet name="Tổng hợp" sheetId="1" r:id="rId1"/><sheet name="Theo bài" sheetId="2" r:id="rId2"/></sheets></workbook>'},
      {name:'xl/_rels/workbook.xml.rels', data:'<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet2.xml"/><Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/></Relationships>'},
      {name:'xl/styles.xml', data:STYLES}, {name:'xl/worksheets/sheet1.xml', data:s1}, {name:'xl/worksheets/sheet2.xml', data:s2}];
    return zip(files);
  }
  const stamp = () => { const d = new Date(), p = n => String(n).padStart(2, '0'); return `${d.getFullYear()}${p(d.getMonth() + 1)}${p(d.getDate())}`; };
  const fname = (g, lop) => `Thong-ke-${String(g.name).replace(/\s+/g, '')}-${String(lop).replace(/[^A-Za-z0-9]+/g, '') || 'lop'}-${stamp()}.xlsx`.normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D');
  function download(blob, name){ const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = name; document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 1500); }

  /* ---- Giao diện ---- */
  function draw(box, g, ls, data, lop){
    const cls = data.classes.find(c => c.lop === lop) || data.classes[0] || {lop:'', rows:[]}, sum = summarize(cls.rows || [], ls), by = byLesson(sum, ls);
    const groups = []; ls.forEach((l, i) => { const k = l.label + '|' + l.topic; if(groups.length && groups[groups.length - 1].k === k) groups[groups.length - 1].n++; else groups.push({k, name:(l.label ? l.label + ' · ' : '') + l.topic, n:1}); });
    const tot = {done:0, doing:0, todo:0}; sum.forEach(s => s.cells.forEach(c => tot[c.st]++));
    box.innerHTML = `<div class="cm-sum"><span><b>${sum.length}</b><small>Sĩ số</small></span><span><b>${ls.length}</b><small>Bài</small></span><span class="d"><b>${tot.done}</b><small>lượt đủ 3 mức</small></span><span class="o"><b>${tot.doing}</b><small>lượt đang làm</small></span><span class="t"><b>${tot.todo}</b><small>lượt chưa làm</small></span></div>
      <p class="cm-leg"><i class="done">3</i> đủ 3 mức <i class="doing">1–2</i> đang làm <i class="todo">—</i> chưa làm · Bấm vào <b>tên bài</b> (đầu cột) để xem em nào chưa làm.</p>
      <div class="cm-scroll"><table class="cm-tb"><thead><tr><th rowspan="2" class="cm-n">STT</th><th rowspan="2" class="cm-name">Học sinh</th><th rowspan="2" title="Số bài đã làm đủ 3 mức">✅</th><th rowspan="2" title="Số bài đang làm">🟡</th><th rowspan="2" title="Số bài chưa làm">🔴</th><th rowspan="2" title="Tổng sao">⭐</th>${groups.map(x => `<th colspan="${x.n}" class="cm-topic">${esc(x.name)}</th>`).join('')}</tr>
        <tr>${ls.map((l, i) => `<th class="cm-les" data-li="${i}" tabindex="0" title="${esc(l.name)}"><span>${esc(short(l.name))}</span></th>`).join('')}</tr></thead>
        <tbody>${sum.map((s, i) => `<tr><td class="cm-n">${i + 1}</td><td class="cm-name">${esc(s.r.name)}<small>${esc(s.r.user)}</small></td><td>${s.c.done}</td><td>${s.c.doing}</td><td>${s.c.todo}</td><td>${s.stars}</td>${s.cells.map((c, k) => `<td class="cm-c ${c.st}" title="${esc(s.r.name)} – ${esc(ls[k].name)}: ${c.done}/3 mức, ${c.stars}⭐">${c.st === 'todo' ? '—' : c.done}</td>`).join('')}</tr>`).join('') || `<tr><td colspan="${6 + ls.length}">Lớp này chưa có học sinh trong trang HocSinh.</td></tr>`}</tbody>
        <tfoot><tr><td colspan="6">Số em <b>chưa làm</b></td>${by.map(b => `<td class="cm-f">${b.todo.length}</td>`).join('')}</tr></tfoot></table></div><div class="cm-detail" id="cmDetail" aria-live="polite"></div>`;
    const detail = li => { const l = ls[li], b = by[li], grp = (t, a, c) => `<div class="cm-g ${c}"><b>${t} (${a.length})</b>${a.length ? a.map(esc).join(', ') : '—'}</div>`;
      $('#cmDetail', box).innerHTML = `<h4>${esc(l.name)}</h4>${grp('🔴 Chưa làm', b.todo, 'todo')}${grp('🟡 Đang làm (1–2 mức)', b.doing, 'doing')}${grp('✅ Đã làm đủ 3 mức', b.done, 'done')}`; $('#cmDetail', box).scrollIntoView({block:'nearest'}); };
    box.querySelectorAll('.cm-les').forEach(th => { th.onclick = () => detail(+th.dataset.li); th.onkeydown = e => { if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); detail(+th.dataset.li); } }; });
    return {sum, lop:cls.lop};
  }
  async function open(g){
    close(); const ls = lessonList(g);
    document.body.insertAdjacentHTML('beforeend', `<div class="cm-overlay" role="dialog" aria-modal="true" aria-labelledby="cmTitle"><section class="cm-card"><header><div><small>THỐNG KÊ TIẾN ĐỘ</small><h2 id="cmTitle">📊 ${esc(g.name)} · từng bài, từng học sinh</h2></div><button data-cm-close aria-label="Đóng">✕</button></header>
      <div class="cm-ctl"><label>Lớp <select id="cmClass" disabled><option>Đang tải…</option></select></label><button class="btn small" id="cmReload">↻ Tải lại</button><button class="btn small primary" id="cmXlsx" disabled>⬇ Xuất Excel</button></div><main id="cmBody"><p class="note-line">Đang tải tiến độ học sinh…</p></main></section></div>`);
    const ov = $('.cm-overlay'), body = $('#cmBody', ov), sel = $('#cmClass', ov), xl = $('#cmXlsx', ov); let cur = null, data = null;
    $('[data-cm-close]', ov).onclick = close; ov.onclick = e => { if(e.target === ov) close(); };
    const show = lop => { cur = draw(body, g, ls, data, lop); try{ localStorage.setItem('hoctap:lesson-monitor-class', cur.lop); }catch(e){} xl.disabled = !cur.sum.length; };
    async function load(){
      body.innerHTML = '<p class="note-line" id="cmNote">Đang tải tiến độ học sinh…</p>'; sel.disabled = true; xl.disabled = true;
      try{
        data = await fetchData(g, ls, t => { const n = $('#cmNote', ov); if(n) n.textContent = t; });
        if(!data.classes.length){ body.innerHTML = '<p class="note-line">Khối này chưa có lớp trong trang HocSinh.</p>'; sel.innerHTML = '<option>Chưa có lớp</option>'; return; }
        let saved = ''; try{ saved = localStorage.getItem('hoctap:lesson-monitor-class') || ''; }catch(e){}
        const chosen = data.classes.some(c => c.lop === saved) ? saved : data.classes[0].lop;
        sel.innerHTML = data.classes.map(c => `<option value="${esc(c.lop)}" ${c.lop === chosen ? 'selected' : ''}>${esc(c.lop)} · ${c.rows.length} học sinh</option>`).join(''); sel.disabled = false;
        sel.onchange = () => show(sel.value); show(chosen);
      }catch(err){ body.innerHTML = `<p class="note-line error">${esc(err.message || err)}<br><small>Nếu máy chủ chưa có chức năng này, thầy cập nhật và triển khai lại tệp Code.gs.</small></p>`; }
    }
    xl.onclick = () => { if(!cur) return; download(buildXlsx(g, ls, cur.lop, cur.sum), fname(g, cur.lop)); };
    $('#cmReload', ov).onclick = load; load();
  }
  function on(ev, g){
    if(ev !== 'home'){ if(ev !== 'lesson') return; close(); return; }
    if(typeof Account === 'undefined' || !Account.isTeacher || !Account.isTeacher() || !g || !g.lessons) return;
    const row = $('#app .toolbar .row'); if(!row || $('[data-class-matrix]')) return;
    row.insertAdjacentHTML('afterbegin', '<button class="lesson-monitor-btn" data-class-matrix>📊 <span>Thống kê lớp</span></button>');
    $('[data-class-matrix]').onclick = () => open(g);
  }
  addEventListener('keydown', e => { if(e.key === 'Escape') close(); });
  return {on, open, close, buildXlsx, summarize, lessonList};
})();
