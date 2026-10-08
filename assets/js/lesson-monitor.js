/* Theo dõi tiến độ từng bài – chỉ dành cho tài khoản giáo viên. */
const LessonMonitor = (() => {
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const $ = (q, root=document) => root.querySelector(q);
  const all = (q, root=document) => [...root.querySelectorAll(q)];
  let current = null;

  function close(){ const old=$('.lesson-monitor-overlay'); if(old) old.remove(); }
  const stateName = s => s === 'done' ? 'Đã làm đủ 3 mức' : s === 'doing' ? 'Đã làm 1–2 mức' : 'Chưa làm';
  const levelHTML = levels => levels.map((v,i) => `<span class="lm-level ${v === null ? 'empty' : 'has'}">M${i+1} ${v === null ? '—' : v+'⭐'}</span>`).join('');
  function groupHTML(state, rows){
    const icon=state==='done'?'✅':state==='doing'?'🟡':'🔴';
    return `<section class="lm-group lm-${state}"><h3>${icon} ${stateName(state)} <b>${rows.length}</b></h3>${rows.length ? `<div class="lm-students">${rows.map(r => `<article><div><strong>${esc(r.name)}</strong><small>${esc(r.user)}${r.last?' · làm gần nhất '+esc(r.last):r.joined?' · chưa làm bài':' · chưa đăng nhập'}</small></div><div class="lm-levels">${levelHTML(r.levels)}</div><em>${r.stars}/9 ⭐</em></article>`).join('')}</div>` : '<p>Không có học sinh.</p>'}</section>`;
  }
  function drawClass(box, data, lop){
    const cls=data.classes.find(c=>c.lop===lop)||data.classes[0]||{lop:'',rows:[]}, rows=cls.rows||[], count=s=>rows.filter(r=>r.state===s).length;
    box.innerHTML=`<div class="lm-summary"><span><b>${rows.length}</b><small>Sĩ số</small></span><span class="todo"><b>${count('todo')}</b><small>Chưa làm</small></span><span class="doing"><b>${count('doing')}</b><small>Đang làm</small></span><span class="done"><b>${count('done')}</b><small>Đủ 3 mức</small></span></div>${groupHTML('todo',rows.filter(r=>r.state==='todo'))}${groupHTML('doing',rows.filter(r=>r.state==='doing'))}${groupHTML('done',rows.filter(r=>r.state==='done'))}`;
  }
  async function open(g,l){
    close(); current={g,l};
    document.body.insertAdjacentHTML('beforeend',`<div class="lesson-monitor-overlay" role="dialog" aria-modal="true" aria-labelledby="lmTitle"><section class="lesson-monitor-card"><header><div><small>THEO DÕI TỪNG BÀI</small><h2 id="lmTitle">📋 ${esc(l.name)}</h2></div><button data-lm-close aria-label="Đóng">✕</button></header><div class="lm-controls"><label>Chọn lớp <select id="lmClass" disabled><option>Đang tải danh sách</option></select></label><button class="btn" id="lmReload">↻ Tải lại</button></div><p class="lm-note">Một mức được ghi nhận sau khi học sinh làm xong cả bộ câu hỏi, kể cả khi chưa được sao.</p><main id="lmBody"><p class="note-line">Đang tải tiến độ học sinh…</p></main></section></div>`);
    const overlay=$('.lesson-monitor-overlay'), body=$('#lmBody',overlay), select=$('#lmClass',overlay);
    $('[data-lm-close]',overlay).onclick=close; overlay.onclick=e=>{if(e.target===overlay)close()};
    async function load(){
      body.innerHTML='<p class="note-line">Đang tải tiến độ học sinh…</p>'; select.disabled=true;
      try{
        const r=await Account.call('lessonStatus',{grade:+g.id.replace(/\D/g,''),lesson:l.id});
        if(!r||!r.ok)throw new Error((r&&r.msg)||'Không tải được dữ liệu.');
        if(!r.classes.length){body.innerHTML='<p class="note-line">Khối này chưa có lớp trong trang HocSinh.</p>';select.innerHTML='<option>Chưa có lớp</option>';return}
        const saved=localStorage.getItem('hoctap:lesson-monitor-class'), chosen=r.classes.some(c=>c.lop===saved)?saved:r.classes[0].lop;
        select.innerHTML=r.classes.map(c=>`<option value="${esc(c.lop)}" ${c.lop===chosen?'selected':''}>${esc(c.lop)} · ${c.rows.length} học sinh</option>`).join(''); select.disabled=false;
        select.onchange=()=>{localStorage.setItem('hoctap:lesson-monitor-class',select.value);drawClass(body,r,select.value)}; drawClass(body,r,chosen);
      }catch(err){body.innerHTML=`<p class="note-line error">${esc(err.message||err)}<br><small>Nếu máy chủ chưa có chức năng này, thầy cập nhật và triển khai lại tệp Code.gs.</small></p>`}
    }
    $('#lmReload',overlay).onclick=load; load();
  }
  function on(ev,g,l){
    if(typeof ClassMatrix!=='undefined')ClassMatrix.on(ev,g);   // nút 📊 Thống kê lớp ở trang chủ khối
    if(ev!=='lesson')close();
    if(ev!=='lesson'||typeof Account==='undefined'||!Account.isTeacher||!Account.isTeacher())return;
    const tools=$('.toolbar .tbtns'); if(!tools||$('[data-lesson-monitor]'))return;
    tools.insertAdjacentHTML('afterbegin','<button class="lesson-monitor-btn" data-lesson-monitor>📋 <span>Theo dõi lớp</span></button>');
    $('[data-lesson-monitor]').onclick=()=>open(g,l);
  }
  addEventListener('keydown',e=>{if(e.key==='Escape')close()});
  return {on,open,close};
})();
