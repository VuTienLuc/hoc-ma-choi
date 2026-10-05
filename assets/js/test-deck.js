/* =====================================================================
   TEST DECK – chiếu bài kiểm tra của HỌC SINH (StudentTest) trên lớp, cho GIÁO VIÊN (trang giao-vien/).
   Mỗi (bài kiểm tra, mã đề) là một bộ trang chiếu dùng chung bộ máy trình chiếu của Lecture:
   trang tiêu đề → từng câu (đề + phương án) → bấm tiếp để hiện lời giải từng bước, rồi đáp án.
   Không có nội dung riêng: đề lấy từ StudentTest.build(t, ci) nên khớp 100% bài học sinh làm.
   ===================================================================== */
const TestDeck = (() => {
  const ABCD = 'ABCD', vn = x => String(x).replace('.', ',');
  const steps = html => { const m = String(html || '').match(/<p>[\s\S]*?<\/p>/g); return (m || [String(html || '')]).map(x => x.replace(/^<p>|<\/p>$/g, '')); };
  const optsHtml = o => `<div class="td-opts${o.some(x => x.replace(/<[^>]+>/g, '').length > 42) ? ' one' : ''}">${o.map((x, i) => `<div><b>${ABCD[i]}.</b> ${x}</div>`).join('')}</div>`;
  function deck(t, ci){
    const q = StudentTest.build(t, ci), mcPt = t.mcPt ?? .25, tfPt = t.tfPt ?? 1, shPt = t.shortPt ?? .5, tag = (p, i, x) => `Phần ${p} · Câu ${i + 1}${x ? ' · ' + x : ''}`;
    const slides = [{kind:'title', tag:`Toán ${String(t.grade).replace(/\D/g, "")} · Mã đề ${q.code}`, title:t.title, sub:`Thời gian ${t.time} phút`,
      points:[`Phần I: ${q.mc.length} câu trắc nghiệm (${vn(mcPt)} đ/câu)`, `Phần II: ${q.tf.length} câu đúng–sai (${vn(tfPt)} đ/câu, mỗi câu 4 ý)`, `Phần III: ${q.short.length} câu trả lời ngắn (${vn(shPt)} đ/câu)`]}];
    q.mc.forEach((x, i) => slides.push({kind:'lt', plainSol:true, tag:tag('I', i, x.level), label:`Câu ${i + 1}`, de:x.q + optsHtml(x.opts), sol:steps(x.sol), ans:`Đáp án: <b>${ABCD[x.a]}</b>`}));
    q.tf.forEach((x, i) => slides.push({kind:'lt', plainSol:true, tag:tag('II', i), label:`Câu ${i + 1}`,
      de:`${x.stem}<div class="td-tf">${x.items.map((it, k) => `<div><b>${'abcd'[k]})</b> ${it.text}</div>`).join('')}</div>`,
      sol:x.items.map((it, k) => `<b>${'abcd'[k]}) ${it.ok ? 'Đúng' : 'Sai'}.</b> ${steps(it.sol).join(' ')}`), ans:`Đáp án: ${x.items.map((it, k) => `<b>${'abcd'[k]})</b> ${it.ok ? 'Đ' : 'S'}`).join(' · ')}`}));
    q.short.forEach((x, i) => slides.push({kind:'lt', plainSol:true, tag:tag('III', i), label:`Câu ${i + 1}`, de:x.q, sol:steps(x.sol), ans:`Đáp số: <b>${vn(Array.isArray(x.ans) ? x.ans[0] : x.ans)}</b>`}));
    return {name:`${t.title} – Mã ${q.code}`, slides};
  }
  const section = gid => { const ts = StudentTest.TESTS.filter(t => t.grade === gid); if(!ts.length) return '';
    return `<section class="topic kt-sec"><h2><small>Kiểm tra</small>Bài kiểm tra của học sinh – chiếu trên lớp</h2><ol class="lk-list">${ts.map(t => `<li><div class="lk-li"><b>${t.title}</b>
      <small>${t.time} phút · ${t.mc.length} trắc nghiệm + ${t.tf.length} đúng–sai + ${t.short.length} trả lời ngắn · ${t.codes.length} mã đề · chiếu từng câu, hiện lời giải từng bước</small></div>
      <div class="lk-acts">${t.codes.map((c, ci) => `<button class="btn ${ci ? '' : 'primary '}small" data-tdeck="${t.id}:${ci}">▶ Mã ${c}</button>`).join('')}</div></li>`).join('')}</ol></section>`; };
  const bind = (root, gid) => root.querySelectorAll('[data-tdeck]').forEach(b => b.onclick = () => { const [id, ci] = b.dataset.tdeck.split(':'), t = StudentTest.find(gid, id); if(t) Lecture.open(deck(t, +ci), 0); });
  return {deck, section, bind};
})();
