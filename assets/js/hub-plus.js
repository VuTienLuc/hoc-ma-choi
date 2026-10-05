/* =====================================================================
   Hub-plus – các tab “thi đua” và “gắn với bài học” của 🌟 Góc chung (đăng ký bằng Hub.register, xem hub.js).
   Nạp SAU hub.js (cả trang học sinh lẫn trang giáo viên).
   Tab: 🎯 Hôm nay & Thử thách (nhiệm vụ ngày, thử thách tuần của lớp, Vua tiến bộ)
        ❓ Câu hỏi của thầy (giáo viên đăng, học sinh trả lời trong hạn → ⭐ thưởng)
        🔥 Bài hot tuần (bài lớp làm nhiều nhất / cần ôn nhất 7 ngày qua)
        🗺️ Lộ trình (các bài của khối, sao của em, bao nhiêu bạn đã làm)
        🔁 Ôn bài cũ (bộ chưa trọn điểm hẹn ôn lại sau 1 → 3 → 7 ngày; dữ liệu nằm ở Play.state.rev)
        🏁 Đua lớp (các lớp cùng khối: sao mới trung bình mỗi bạn trong tuần)
   Máy chủ: action hot, race, qList, qAnswer, qPost, qClose, bonus (tools/apps-script/Code.gs). Dữ liệu mỗi em: pub_ có thêm wk (sao tăng tuần này) và qd (nhiệm vụ đã xong hôm nay).
   ===================================================================== */
(() => {
  if(typeof Hub === 'undefined') return;
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const note = h => `<p class="note-line">${h}</p>`;
  const OLD = 'Máy chủ chưa có chức năng này: thầy cô dán <b>Code.gs</b> mới vào Apps Script rồi triển khai lại.';
  const isT = () => typeof Account !== 'undefined' && Account.isTeacher && Account.isTeacher();
  const SITE = /giao-vien/.test(location.pathname) ? '../index.html' : '';           // trang giáo viên không có engine bài học → liên kết sang trang học sinh
  const hasApp = () => typeof App !== 'undefined' && App.grades && App.grades.length;
  const play = () => (typeof Play !== 'undefined' && Play.state) ? Play.state : null;
  const num = (r, k) => Number(r && r[k]) || 0;
  const initial = n => esc((String(n).trim().split(/\s+/).pop() || '?').charAt(0).toUpperCase());
  const bar = (pct, cls = '') => `<div class="hub-bar ${cls}"><i style="width:${Math.max(0, Math.min(100, Math.round(pct)))}%"></i></div>`;
  const typeset = el => { try{ if(window.MathJax && MathJax.typesetPromise) MathJax.typesetPromise([el]).catch(() => {}); }catch(e){} };
  const weekLabel = () => { const d = new Date(), dow = (d.getDay() + 6) % 7, a = new Date(d.getFullYear(), d.getMonth(), d.getDate() - dow), b = new Date(a.getFullYear(), a.getMonth(), a.getDate() + 6);
    const f = x => `${x.getDate()}/${x.getMonth() + 1}`; return `${f(a)} – ${f(b)}`; };
  const mtx = s => esc(s).replace(/\$([^$]+)\$/g, '\\($1\\)');                    // văn bản giáo viên gõ: $…$ → công thức MathJax \( … \)
  const gradeNum = s => (String(s || '').match(/\d{1,2}/) || [''])[0];

  /* ---------- Gọi máy chủ (nhớ 45 giây; lỗi → thông báo thân thiện) ---------- */
  const cache = {};
  const bust = () => Object.keys(cache).forEach(k => delete cache[k]);
  async function get(action, body){
    const k = action + JSON.stringify(body || {}), c = cache[k];
    if(c && Date.now() - c.t < 45000) return c.r;
    let r; try{ r = await Account.call(action, body); }catch(e){ r = {ok:false, msg:'Chưa tải được dữ liệu. Kiểm tra mạng rồi bấm ↻ Tải lại.'}; }
    if(r && r.ok) cache[k] = {t:Date.now(), r};
    return r;
  }
  const fail = (box, r) => { box.innerHTML = note(r && /không hợp lệ/.test(r.msg || '') ? OLD : esc((r && r.msg) || 'Chưa tải được dữ liệu.')); };
  const live = box => box.isConnected;                                  // tab đã bị đổi sang tab khác chưa?
  const lessonLink = (gradeName, lessonName) => {
    if(!hasApp()) return '';
    const g = App.grades.find(x => x.name === gradeName), l = g && g.lessons.find(x => x.name === lessonName);
    return l ? `${SITE}#/${g.id}/bai/${l.id}` : '';
  };

  /* ================= 🎯 Hôm nay & Thử thách ================= */
  Hub.register({id:'quest', order:20, icon:'🎯', label:'Hôm nay & Thử thách', render(box, c){
    const S = play(), rows = c.rows, hasWk = c.all.some(r => r.wk !== undefined), per = Number(CONFIG.weeklyPerStudent) || 6;
    const doneNow = r => (r.me && S && S.q && typeof Play !== 'undefined' && S.q.day === Play.today()) ? S.q.list.filter(i => i.done).length : num(r, 'qd');
    let h = '';
    if(c.role === 'student' && S && S.q && S.q.list.length){
      const got = typeof Play !== 'undefined' && S.bonusDay === Play.today();
      h += `<section class="hub-card"><h3>🎯 Nhiệm vụ của em hôm nay</h3><ul class="qlist hub-q">${S.q.list.map(it => { const Q = Play.QUESTS[it.id];
        return `<li class="${it.done ? 'done' : ''}"><span class="qi">${it.done ? '✅' : '🎯'}</span><div><b>${esc(Q.text)}</b>${bar(it.p / Q.n * 100)}</div><small>${it.p}/${Q.n}</small></li>`; }).join('')}</ul>
        <p class="hub-reward ${got ? 'got' : ''}">${got ? '🎉 Em đã nhận thưởng hôm nay: <b>+1 ⭐ và +20 🪙</b>' : 'Xong <b>cả 3 nhiệm vụ</b> hôm nay: thưởng <b>+1 ⭐</b> và <b>+20 🪙</b>!'}</p></section>`;
    }
    if(!hasWk){ box.innerHTML = h + note(OLD); return; }
    const any = rows.filter(r => doneNow(r) > 0).length, all3 = rows.filter(r => doneNow(r) >= 3).length;
    h += `<section class="hub-card"><h3>📅 Lớp ${esc(c.lop)} hôm nay</h3><div class="gr-stats"><span><b>${any}</b>/${rows.length} bạn đã xong ≥ 1 nhiệm vụ</span><span><b>${all3}</b> bạn xong cả 3 🎉</span></div>${bar(rows.length ? any / rows.length * 100 : 0)}</section>`;
    const total = rows.reduce((t, r) => t + num(r, 'wk'), 0), goal = Math.max(1, per * rows.length), pct = Math.min(100, Math.round(total / goal * 100));
    const stops = [[25, '🌱'], [50, '🌿'], [75, '🌳'], [100, '🏆']];
    const help = rows.filter(r => num(r, 'wk') > 0).sort((a, b) => num(b, 'wk') - num(a, 'wk') || String(a.name).localeCompare(String(b.name), 'vi'));
    h += `<section class="hub-card"><h3>🚩 Thử thách tuần của lớp <small>(${weekLabel()})</small></h3>
      <p>Cả lớp cùng góp <b>⭐ mới</b> trong tuần. Mục tiêu: <b>${goal} ⭐</b> (mỗi bạn ${per} ⭐). Mỗi bạn góp được bao nhiêu cũng quý!</p>
      <div class="hub-goal">${bar(pct, pct >= 100 ? 'ok' : '')}<div class="hub-stops">${stops.map(([p, e]) => `<span class="${pct >= p ? 'on' : ''}">${e}<small>${p}%</small></span>`).join('')}</div></div>
      <div class="gr-stats"><span><b>${total}</b>/${goal} ⭐</span><span><b>${help.length}</b>/${rows.length} bạn đã góp</span></div>
      ${pct >= 100 ? `<p class="hub-reward got">🎊 Cả lớp đã chinh phục thử thách tuần!${CONFIG.weeklyReward ? ' Phần thưởng: <b>' + esc(CONFIG.weeklyReward) + '</b>' : ''}</p>` : (CONFIG.weeklyReward ? `<p class="hub-reward">Phần thưởng khi đạt: <b>${esc(CONFIG.weeklyReward)}</b></p>` : '')}
      ${help.length ? `<div class="hub-chips">${help.map(r => `<span class="hub-chip ${r.me ? 'me' : ''}"><i class="hub-av s">${initial(r.name)}</i>${esc(r.name)}${r.me ? ' (em)' : ''} <b>+${num(r, 'wk')}⭐</b></span>`).join('')}</div>` : note('Tuần này chưa có sao mới. Bạn đầu tiên làm một bộ sẽ mở màn nhé! 🚀')}</section>`;
    const top = help.slice(0, 3), me = rows.find(r => r.me);
    h += `<section class="hub-card"><h3>👑 Vua tiến bộ tuần này</h3><p>Xếp theo <b>số ⭐ tăng thêm trong tuần</b>, nên bạn mới học vẫn có cơ hội đứng đầu.</p>
      ${top.length ? `<ol class="rank hub-rank">${top.map((r, i) => `<li class="${r.me ? 'me' : ''}"><span class="rk">${['🥇', '🥈', '🥉'][i]}</span><span class="rp hub-av">${initial(r.name)}</span><b>${esc(r.name)}${r.me ? ' (em)' : ''}</b><span class="rv">📈 +${num(r, 'wk')}⭐</span></li>`).join('')}</ol>` : note('Chưa có ai lên bảng tuần này.')}
      ${me ? `<p class="note-line">Tuần này em đã tăng <b>+${num(me, 'wk')} ⭐</b>.</p>` : ''}</section>`;
    box.innerHTML = h;
  }});

  /* ================= ❓ Câu hỏi của thầy ================= */
  const LET = ['A', 'B', 'C', 'D'];
  Hub.register({id:'ask', order:30, icon:'❓', label:'Câu hỏi của thầy', async render(box, c){
    box.innerHTML = note('Đang tải…');
    const r = await get('qList'); if(!live(box)) return; if(!r || !r.ok){ fail(box, r); return; }
    const refresh = async () => { bust(); await Hub.load(true).catch(() => {}); c.redraw(); };
    if(r.teacher){
      const g = gradeNum(c.lop), tgt = q => !q.target ? 'mọi lớp' : /^\d+$/.test(q.target) ? 'khối ' + q.target : 'lớp ' + q.target;
      box.innerHTML = `<section class="hub-card"><h3>✍️ Đăng câu hỏi mới</h3>
        <label class="hub-f">Câu hỏi (công thức viết trong $…$)<textarea id="qaQ" rows="3" maxlength="800" placeholder="Ví dụ: Giá trị của $\\sin 150^\\circ$ bằng?"></textarea></label>
        <div class="hub-opts-in">${LET.map((l, i) => `<label class="hub-f"><span><input type="radio" name="qaAns" value="${l}" ${i === 0 ? 'checked' : ''}> ${l} (đáp án đúng)</span><input id="qaO${i}" maxlength="300" placeholder="Phương án ${l}"></label>`).join('')}</div>
        <label class="hub-f">Giải thích (hiện sau khi em trả lời)<textarea id="qaE" rows="2" maxlength="600"></textarea></label>
        <div class="hub-row"><label class="hub-f">Dành cho<select id="qaT">${g ? `<option value="${g}">Cả khối ${g}</option>` : ''}<option value="${esc(c.lop)}">Chỉ lớp ${esc(c.lop)}</option><option value="">Mọi lớp</option></select></label>
          <label class="hub-f">Thưởng<select id="qaS"><option value="1">1 ⭐</option><option value="2">2 ⭐</option><option value="3">3 ⭐</option></select></label>
          <label class="hub-f">Hạn<select id="qaD"><option value="1">Hết hôm nay</option><option value="2" selected>2 ngày</option><option value="3">3 ngày</option><option value="7">1 tuần</option></select></label></div>
        <div class="fb" id="qaMsg"></div><button class="btn primary" id="qaPost">📣 Đăng câu hỏi</button></section>
        <h3>Các câu đã đăng</h3>${r.items.length ? r.items.map(q => `<article class="hub-card hub-q-t ${q.open ? '' : 'closed'}"><div class="hub-qh"><span class="pill">${q.open ? '🟢 Đang mở' : '⚪ Đã đóng'}</span><small>${esc(tgt(q))} · hạn ${esc(q.due || '—')} · ${q.stars}⭐</small></div>
          <p class="hub-qt">${mtx(q.q)}</p><ol class="hub-ol">${q.opts.map((o, i) => o ? `<li class="${LET[i] === q.ans ? 'ok' : ''}">${LET[i]}. ${mtx(o)}</li>` : '').join('')}</ol>
          <p class="note-line">📊 <b>${q.answered}</b> bạn trả lời · <b>${q.correct}</b> đúng${q.answered ? ` (${Math.round(q.correct / q.answered * 100)}%)` : ''}</p>${q.open ? `<button class="linkbtn" data-qclose="${esc(q.id)}">Đóng câu hỏi</button>` : ''}</article>`).join('') : note('Chưa có câu hỏi nào.')}`;
      typeset(box);
      const msg = (t, ok) => { const m = box.querySelector('#qaMsg'); m.className = 'fb show ' + (ok ? 'sol' : 'note'); m.innerHTML = t; };
      box.querySelector('#qaPost').onclick = async ev => {
        const b = ev.currentTarget, opts = LET.map((_, i) => box.querySelector('#qaO' + i).value.trim()), ans = box.querySelector('input[name=qaAns]:checked').value;
        const q = box.querySelector('#qaQ').value.trim();
        if(!q || opts.filter(Boolean).length < 2 || !opts[LET.indexOf(ans)]){ msg('Cần câu hỏi, ít nhất 2 phương án và ô đáp án đúng không để trống.'); return; }
        b.disabled = true;
        try{ const res = await Account.call('qPost', {q, opts, ans, exp:box.querySelector('#qaE').value.trim(), stars:+box.querySelector('#qaS').value, days:+box.querySelector('#qaD').value, target:box.querySelector('#qaT').value});
          if(!res.ok) throw new Error(res.msg); await refresh(); }
        catch(e){ msg(esc(e.message || 'Chưa đăng được, thử lại nhé.')); b.disabled = false; }
      };
      box.querySelectorAll('[data-qclose]').forEach(b => b.onclick = async () => { b.disabled = true; try{ await Account.call('qClose', {id:b.dataset.qclose}); }catch(e){} refresh(); });
      return;
    }
    const mark = q => `<div class="hub-res ${q.mine.ok ? 'ok' : 'no'}"><b>${q.mine.ok ? `✅ Chính xác!${q.stars ? ` Em được +${q.stars} ⭐` : ''}` : `❌ Chưa đúng. Đáp án là ${esc(q.ans)}.`}</b>${q.exp ? `<p>${mtx(q.exp)}</p>` : ''}</div>`;
    box.innerHTML = r.items.length ? r.items.map(q => `<article class="hub-card hub-qa" data-q="${esc(q.id)}"><div class="hub-qh"><span class="pill">❓ Thầy hỏi</span><small>${q.stars ? `Đúng được +${q.stars} ⭐ · ` : ''}hạn ${esc(q.due || '—')}</small></div>
        <p class="hub-qt">${mtx(q.q)}</p><div class="hub-opts">${q.opts.map((o, i) => o ? `<button type="button" class="hub-opt ${q.mine ? (LET[i] === q.ans ? 'ok' : LET[i] === q.mine.pick ? 'no' : '') : ''}" data-pick="${LET[i]}" ${q.mine ? 'disabled' : ''}><b>${LET[i]}</b> ${mtx(o)}</button>` : '').join('')}</div>
        ${q.mine ? mark(q) : `<div class="fb" data-msg></div><button class="btn primary" data-send disabled>Gửi đáp án</button>`}</article>`).join('')
      : note('Hôm nay thầy chưa có câu hỏi mới. Em ghé lại sau nhé! 🌤️') + note('Khi thầy đăng câu hỏi, em chọn đáp án đúng trong hạn là được <b>⭐ thưởng</b>. Mỗi câu chỉ trả lời một lần.');
    typeset(box);
    box.querySelectorAll('.hub-qa').forEach(card => {
      let pick = '', send = card.querySelector('[data-send]'); if(!send) return;
      card.querySelectorAll('[data-pick]').forEach(b => b.onclick = () => { pick = b.dataset.pick; card.querySelectorAll('[data-pick]').forEach(x => x.classList.toggle('sel', x === b)); send.disabled = false; });
      send.onclick = async () => {
        send.disabled = true; const m = card.querySelector('[data-msg]');
        try{ const res = await Account.call('qAnswer', {id:card.dataset.q, pick}); if(!res.ok) throw new Error(res.msg);
          if(res.stars && typeof Play !== 'undefined' && Play.state){ try{ toast(`🎉 Chính xác! +${res.stars} ⭐ thưởng`); }catch(e){} }
          await refresh(); }
        catch(e){ m.className = 'fb show note'; m.textContent = e.message || 'Chưa gửi được, thử lại nhé.'; send.disabled = false; }
      };
    });
  }});

  /* ================= 🔥 Bài hot tuần ================= */
  Hub.register({id:'hot', order:40, icon:'🔥', label:'Bài hot tuần', async render(box, c){
    box.innerHTML = note('Đang tải…');
    const r = await get('hot', c.role === 'teacher' ? {lop:c.lop} : {}); if(!live(box)) return; if(!r || !r.ok){ fail(box, r); return; }
    const item = (x, right) => { const href = lessonLink(x.grade, x.lesson);
      return `<li>${href ? `<a href="${esc(href)}">` : '<span>'}<b>${esc(x.lesson)}</b><small>${esc(x.grade)}</small>${href ? '</a>' : '</span>'}${right}</li>`; };
    const weak = r.week.filter(x => x.sets >= 2).sort((a, b) => a.pct - b.pct || b.sets - a.sets).slice(0, 5), most = r.week.slice().sort((a, b) => b.sets - a.sets || b.students - a.students).slice(0, 5);
    box.innerHTML = `<p class="note-line">Số liệu 7 ngày qua của lớp <b>${esc(r.lop)}</b>${c.role === 'student' ? '. Bấm vào bài để ôn ngay.' : '. Gợi ý cho thầy cô: bài nào điểm thấp thì nên chữa lại trên lớp.'}</p>
      <section class="hub-card"><h3>📉 Cần ôn lại <small>(điểm trung bình thấp nhất)</small></h3>${weak.length ? `<ul class="hub-hot">${weak.map(x => item(x, `<span class="hub-pct ${x.pct >= 80 ? 'g' : x.pct >= 60 ? 'y' : 'r'}">${x.pct}%<small>${x.sets} bộ · ${x.students} bạn</small></span>`)).join('')}</ul>` : note('Chưa đủ dữ liệu (cần bài có từ 2 bộ làm trở lên).')}</section>
      <section class="hub-card"><h3>🔥 Được làm nhiều nhất</h3>${most.length ? `<ul class="hub-hot">${most.map(x => item(x, `<span class="hub-pct n">${x.sets}<small>bộ · ${x.students} bạn</small></span>`)).join('')}</ul>` : note('Tuần này lớp chưa làm bộ nào. Em mở đầu nhé! 🚀')}</section>`;
  }});

  /* ================= 🗺️ Lộ trình ================= */
  Hub.register({id:'path', order:50, icon:'🗺️', label:'Lộ trình', async render(box, c){
    if(!hasApp()){ box.innerHTML = note(`Lộ trình hiển thị trên trang học sinh: <a href="../index.html#/goc-chung/path">mở Góc chung bên trang học sinh</a>.`); return; }
    const teacher = c.role === 'teacher', gid = teacher ? c.state.gid : Account.gradeOfClass(Account.user.lop), g = App.grades.find(x => x.id === gid);
    if(!g){ box.innerHTML = note('Chưa có nội dung cho khối này.'); return; }
    box.innerHTML = note('Đang tải…');
    const r = await get('hot', teacher ? {lop:c.lop} : {}); if(!live(box)) return;
    const cnt = {}, size = r && r.ok ? r.size : 0; if(r && r.ok) r.all.forEach(x => { cnt[x.grade + '|' + x.lesson] = x.students; });
    const stars = l => [1, 2, 3].map(lv => Math.max(0, Math.min(3, Number(store.get(`hoctap:${g.id}:${l.id}:${lv}`)) || 0)));
    let total = 0, next = null; const lessons = g.lessons.map(l => { const s = stars(l), sum = s[0] + s[1] + s[2]; total += sum; if(!next && s.some(x => x < 3) && !teacher) next = l; return {l, s, sum}; });
    const topics = g.topics.map(t => ({t, items:lessons.filter(x => x.l.t === t.id)})).filter(x => x.items.length);
    box.innerHTML = `${teacher ? '' : `<section class="hub-card"><h3>🗺️ Hành trình ${esc(g.name)} của em</h3><div class="gr-stats"><span><b>${total}</b>/${g.lessons.length * 9} ⭐</span><span><b>${lessons.filter(x => x.sum >= 9).length}</b>/${g.lessons.length} bài đủ 9⭐</span></div>${bar(total / (g.lessons.length * 9) * 100)}${next ? `<p class="note-line">👉 Bài em nên làm tiếp: <a href="${esc(SITE + '#/' + g.id + '/bai/' + next.id)}"><b>${esc(next.name)}</b></a></p>` : ''}</section>`}
      ${r && r.ok ? '' : note(r && /không hợp lệ/.test(r.msg || '') ? OLD : 'Chưa tải được số bạn đã làm của lớp.')}
      ${topics.map(({t, items}) => `<section class="hub-card"><h3>${esc(t.name)} <small>HK${t.hk || ''}</small></h3><ul class="hub-path">${items.map(({l, s, sum}) => { const n = cnt[g.name + '|' + l.name];
        return `<li class="${sum >= 9 ? 'full' : sum > 0 ? 'part' : ''} ${next === l.id || next === l ? 'next' : ''}"><a href="${esc(SITE + '#/' + g.id + '/bai/' + l.id)}"><span class="hub-dot">${sum >= 9 ? '🏆' : sum > 0 ? '⭐' : '○'}</span><b>${esc(l.name)}</b></a>
          ${teacher ? '' : `<span class="hub-lv">${s.map((x, i) => `<i class="${x ? 'on' : ''}" title="Mức ${i + 1}">${'★'.repeat(x) || '–'}</i>`).join('')}</span>`}
          ${r && r.ok ? `<small class="hub-cls">${n || 0}/${size} bạn</small>` : ''}</li>`; }).join('')}</ul></section>`).join('')}`;
  }});

  /* ================= 🔁 Ôn bài cũ ================= */
  Hub.register({id:'review', order:60, icon:'🔁', label:'Ôn bài cũ', render(box, c){
    const S = play();
    if(c.role === 'teacher' || !S){ box.innerHTML = note('Mục này dành cho học sinh: bộ nào chưa trọn điểm sẽ được hẹn ôn lại sau 1 → 3 → 7 ngày.'); return; }
    const d = Play.today(), list = Object.entries(S.rev || {}).map(([k, v]) => ({k, ...v})).sort((a, b) => String(a.due).localeCompare(String(b.due)) || String(a.nm).localeCompare(String(b.nm), 'vi'));
    const due = list.filter(x => x.due <= d), later = list.filter(x => x.due > d);
    const dm = s => String(s).split('-').reverse().slice(0, 2).join('/');
    const row = (x, isDue) => { const g = hasApp() && App.grades.find(y => y.id === x.g);
      return `<li class="${isDue ? 'due' : ''}"><span class="hub-dot">${isDue ? '🔔' : '⏳'}</span><div><b>${esc(x.nm || x.l)}</b><small>${g ? esc(g.name) + ' · ' : ''}Mức ${x.lv} · lần ôn thứ ${(Number(x.box) || 0) + 1}/3</small></div>
        ${isDue ? `<a class="btn small primary" href="${esc(SITE + '#/' + x.g + '/bai/' + x.l + '/' + x.lv)}">Ôn ngay →</a>` : `<span class="hub-pct n">${dm(x.due)}</span>`}</li>`; };
    box.innerHTML = `<section class="hub-card"><h3>🔁 Ôn bài cũ</h3><p>Bộ nào em chưa làm trọn điểm sẽ được hẹn ôn lại <b>sau 1 → 3 → 7 ngày</b> để nhớ lâu. Ôn đúng hạn mà trọn điểm: <b>+15 🪙</b> mỗi lần. Xong mốc 7 ngày là em đã <b>nhớ chắc</b>! 🎓</p></section>
      <section class="hub-card"><h3>🔔 Đến hạn ôn <small>(${due.length})</small></h3>${due.length ? `<ul class="hub-rev">${due.map(x => row(x, true)).join('')}</ul>` : note('Hôm nay em không có bài nào cần ôn. Giỏi lắm! 🌟')}</section>
      ${later.length ? `<section class="hub-card"><h3>⏳ Sắp tới <small>(${later.length})</small></h3><ul class="hub-rev">${later.map(x => row(x, false)).join('')}</ul></section>` : ''}`;
  }});

  /* ================= 🏁 Đua lớp ================= */
  Hub.register({id:'race', order:70, icon:'🏁', label:'Đua lớp', async render(box, c){
    box.innerHTML = note('Đang tải…');
    const r = await get('race', c.role === 'teacher' ? {grade:gradeNum(c.state.gid)} : {}); if(!live(box)) return; if(!r || !r.ok){ fail(box, r); return; }
    const list = r.classes.map(x => ({...x, avg:x.size ? x.wk / x.size : 0, part:x.size ? x.active / x.size * 100 : 0})).sort((a, b) => b.avg - a.avg || b.part - a.part || String(a.lop).localeCompare(String(b.lop), 'vi', {numeric:true}));
    const best = Math.max(0.01, ...list.map(x => x.avg));
    box.innerHTML = `<section class="hub-card"><h3>🏁 Đua lớp tuần này <small>(${weekLabel()})</small></h3><p>Xếp theo <b>⭐ mới trung bình mỗi bạn</b> (tính theo sĩ số), nên lớp đông hay ít người đều công bằng. Cả lớp cùng góp sao nhé!</p></section>
      ${list.length ? `<ol class="rank hub-rank hub-race">${list.map((x, i) => `<li class="${x.lop === r.mine ? 'me' : ''}"><span class="rk">${i < 3 && x.wk > 0 ? ['🥇', '🥈', '🥉'][i] : i + 1}</span><span class="hub-who"><b>Lớp ${esc(x.lop)}${x.lop === r.mine ? ' (lớp em)' : ''}</b>${bar(x.avg / best * 100)}<small>${x.active}/${x.size} bạn có sao mới · ${x.wk} ⭐ cả lớp</small></span><span class="rv">${(Math.round(x.avg * 10) / 10).toString().replace('.', ',')} ⭐/bạn</span></li>`).join('')}</ol>` : note('Chưa có lớp nào của khối này.')}`;
  }});
})();
