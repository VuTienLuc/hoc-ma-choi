/* =====================================================================
   SOUND – âm thanh khi chấm: đúng → CONFIG.sounds.ok, sai → CONFIG.sounds.bad.
   Mỗi loại là danh sách nguồn, thử lần lượt (file trong dự án trước, link ngoài sau).
   Học sinh bật/tắt bằng nút 🔊 cạnh nút đổi giao diện; lựa chọn lưu trên máy.
   ===================================================================== */
const Sound = (() => {
  const SRC = (typeof CONFIG !== 'undefined' && CONFIG.sounds) || {};
  let on = store.get('hoctap:sound'); if (on === null) on = true;
  const cache = {};
  function get(k) {
    if (cache[k]) return cache[k];
    const list = [].concat(SRC[k] || []); if (!list.length) return null;
    let i = 0; const a = new Audio(); a.preload = 'auto';
    a.addEventListener('error', () => { if (++i < list.length) { a.src = list[i]; a.load(); } });
    a.src = list[0]; return (cache[k] = a);
  }
  function play(k) {
    if (!on) return;
    try { const a = get(k); if (!a) return; a.currentTime = 0; const p = a.play(); if (p && p.catch) p.catch(() => {}); } catch (e) {}
  }
  function toggle() { on = !on; store.set('hoctap:sound', on); if (on) play('ok'); return on; }
  try { get('ok'); get('bad'); } catch (e) {}
  return { play, toggle, get on() { return on; } };
})();
