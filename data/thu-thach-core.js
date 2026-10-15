/* =====================================================================
   NGÂN HÀNG THỬ THÁCH – Toán 10 và Toán 11 (thầy yêu cầu 15/10/2026)
   Câu MỚI viết riêng (không lấy từ các bộ cũ), chọn chỗ HAY SAI: phủ định lượng từ, điều kiện cần – đủ, đầu mút khoảng,
   dấu của giá trị lượng giác, đếm số hạng, nghiệm âm của công bội…
   Mỗi MẪU câu là một hàm (r, H) => câu hỏi: r là bộ sinh số ngẫu nhiên theo hạt giống (cùng hạt giống → cùng câu), H là bộ tiện ích.
   Đáp án luôn được tính LẠI bằng vét cạn hoặc công thức thứ hai ngay trong mẫu; sai là ném lỗi, bộ dựng sẽ thử hạt giống khác.
   Dùng: TTB.get(lớp, 'mc'|'tf'|'sh', vị trí, hạt giống) → câu hỏi theo khuôn StudentTest (xem data/thu-thach-kiem-tra.js);
         TTB.fromBank(lớp, hạt giống) → một câu trắc nghiệm dạng văn bản thường cho “Câu hỏi của thầy”.
   Thêm mẫu mới: TTB.add('lop10', 'mc', (r, H) => H.mc(level, q, đúng, [sai, sai, sai], lời giải)).
   ===================================================================== */
(() => {
  const POOL = {lop10: {mc: [], tf: [], sh: []}, lop11: {mc: [], tf: [], sh: []}};
  const rng = s => { let a = s >>> 0; return () => { a = (a + 0x6D2B79F5) >>> 0; let t = a; t = Math.imul(t ^ t >>> 15, t | 1); t ^= t + Math.imul(t ^ t >>> 7, t | 61); return ((t ^ t >>> 14) >>> 0) / 4294967296; }; };
  const gcd = (a, b) => b ? gcd(b, a % b) : Math.abs(a);
  const H = {
    M: x => `\\(${x}\\)`,
    ri: (r, a, b) => a + Math.floor(r() * (b - a + 1)),
    pick: (r, a) => a[Math.floor(r() * a.length)],
    shuf: (r, arr) => { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; },
    gcd,
    frac: (n, d) => { if (d < 0) { n = -n; d = -d; } const g = gcd(n, d) || 1; return [n / g, d / g]; },
    fr: (n, d) => { if (d < 0) { n = -n; d = -d; } const g = gcd(n, d) || 1; n /= g; d /= g; const s = n < 0 ? '-' : ''; n = Math.abs(n); return d === 1 ? `${s}${n}` : `${s}\\dfrac{${n}}{${d}}`; },
    /* π nhân phân số: piT(n, d) = (n/d)π */
    piT: (n, d) => { if (d < 0) { n = -n; d = -d; } const g = gcd(n, d) || 1; n /= g; d /= g; if (n === 0) return '0'; const s = n < 0 ? '-' : '', a = Math.abs(n), top = a === 1 ? '\\pi' : `${a}\\pi`; return d === 1 ? `${s}${top}` : `${s}\\dfrac{${top}}{${d}}`; },
    sgn: n => n < 0 ? '-' : '+',
    lin: (a, b, v = 'x') => `${a === 1 ? '' : a === -1 ? '-' : a}${v}${b === 0 ? '' : (b > 0 ? '+' : '-') + Math.abs(b)}`,
    mc: (level, q, correct, wrongs, sol) => { const w = [...new Set(wrongs)].filter(x => x !== correct); if (w.length < 3) throw new Error('thiếu phương án nhiễu'); return {level, q, opts: [correct, ...w.slice(0, 3)], sol}; },
    claim: (ok, t, f, sol) => ok ? {text: t, ok: true, sol: sol + ' Vậy khẳng định này <b>đúng</b>.'} : {text: f, ok: false, sol: sol + ' Vậy khẳng định này <b>sai</b>.'},
    tf: (stem, items) => ({stem, items}),
    sh: (q, ans, sol) => ({q, ans: String(ans), sol}),
    p: s => `<p>${s}</p>`,
    pat: r => { const k = 1 + Math.floor(r() * 3); return H.shuf(r, [0, 1, 2, 3].map(i => i < k)); },   // mẫu đúng–sai: 1 đến 3 ý đúng
    chk: (ok, msg) => { if (!ok) throw new Error('TTB: ' + msg); }
  };
  const check = (kind, it) => {
    const bad = m => { throw new Error('TTB: ' + m); };
    if (kind === 'mc') { if (!it.q || !it.sol || !Array.isArray(it.opts) || it.opts.length !== 4 || new Set(it.opts).size !== 4) bad('câu trắc nghiệm không hợp lệ'); }
    else if (kind === 'tf') { if (!it.stem || !Array.isArray(it.items) || it.items.length !== 4 || it.items.every(x => x.ok) || it.items.every(x => !x.ok) || it.items.some(x => !x.sol)) bad('câu đúng–sai không hợp lệ'); }
    else if (!it.q || it.ans == null || !it.sol || String(Array.isArray(it.ans) ? it.ans[0] : it.ans).length > 4) bad('câu trả lời ngắn không hợp lệ (đáp số tối đa 4 ký tự)');
  };
  const TTB = {
    POOL, H, rng,
    add: (grade, kind, f) => POOL[grade][kind].push(f),
    /* Câu thứ `slot` của loại `kind`: mẫu được chọn theo hạt giống ngày (mỗi vị trí một mẫu khác nhau), số liệu theo (hạt giống, vị trí). */
    get: (grade, kind, slot, seed) => {
      const pool = POOL[grade][kind]; if (!pool.length) throw new Error('TTB: ngân hàng rỗng ' + grade + '/' + kind);
      const order = H.shuf(rng(seed * 7919 + kind.length * 31 + 17), pool.map((_, i) => i)), f = pool[order[slot % pool.length]]; let last;
      for (let t = 0; t < 120; t++) { try { const it = f(rng(seed * 104729 + slot * 977 + t * 13 + 1), H); check(kind, it); return it; } catch (e) { last = e; } }
      throw last;
    },
    /* Một câu trắc nghiệm ngẫu nhiên (cho nút “Bốc câu” của thầy): trả về {q, opts[4], ans:'A'..'D', exp} ở dạng HTML có \( … \) */
    fromBank: (grade, seed) => { const n = POOL[grade].mc.length, slot = Math.abs(seed) % n, it = TTB.get(grade, 'mc', slot, Math.floor(Math.abs(seed) / n) + 1), order = H.shuf(rng(seed + 5), [0, 1, 2, 3]);
      return {q: it.q, opts: order.map(i => it.opts[i]), ans: 'ABCD'[order.indexOf(0)], exp: it.sol, level: it.level}; },
    size: grade => ({mc: POOL[grade].mc.length, tf: POOL[grade].tf.length, sh: POOL[grade].sh.length})
  };
  globalThis.TTB = TTB;
})();
