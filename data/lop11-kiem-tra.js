/* Bài kiểm tra học sinh – Toán 11 Kết nối tri thức.
   5 bài test tổng hợp Chương I "Hàm số lượng giác và phương trình lượng giác" (20 phút):
   8 trắc nghiệm × 0,5 + 2 Đ/S × 1 + 4 trả lời ngắn × 1 = 10 điểm. Câu sinh bằng hạt giống cố định; đáp án tính và kiểm lại bằng số. */
(() => {
  const M = x => `\\(${x}\\)`;
  const mc = (level, q, correct, wrong, sol) => ({level, q, opts: [correct, ...wrong], sol});
  const R = s => { let a = s >>> 0; return () => { a = (a + 0x6D2B79F5) >>> 0; let t = a; t = Math.imul(t ^ t >>> 15, t | 1); t ^= t + Math.imul(t ^ t >>> 7, t | 61); return ((t ^ t >>> 14) >>> 0) / 4294967296; }; };
  const ri = (r, a, b) => a + Math.floor(r() * (b - a + 1));
  const pickR = (r, arr) => arr[Math.floor(r() * arr.length)];
  const shuf = (r, arr) => { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const wrong3 = (c, list) => { const o = []; for (const w of list) if (w !== c && !o.includes(w)) o.push(w); if (o.length < 3) throw new Error('thiếu phương án nhiễu'); return o.slice(0, 3); };
  const p = s => `<p>${s}</p>`;
  const tv = b => b ? 'đúng' : 'sai';
  const claim = (want, t, f, sol) => want ? {text: t, ok: true, sol: sol + ' Vậy khẳng định này <b>đúng</b>.'} : {text: f, ok: false, sol: sol + ' Vậy khẳng định này <b>sai</b>.'};
  const pat = r => { const k = ri(r, 1, 3); return shuf(r, [0, 1, 2, 3].map(i => i < k)); };
  const CHK = globalThis.__CHK_LOP11 || null;      // chỉ dùng khi kiểm thử độc lập (tools)
  const D2R = d => d * Math.PI / 180, near = (a, b) => Math.abs(a - b) < 1e-7;

  /* ---- phân số, số π, góc ---- */
  const gcd = (a, b) => b ? gcd(b, a % b) : Math.abs(a);
  const frac = (n, d) => { if (d < 0) { n = -n; d = -d; } const g = gcd(n, d) || 1; return [n / g, d / g]; };
  const fr = (n, d) => { [n, d] = frac(n, d); const s = n < 0 ? '-' : ''; n = Math.abs(n); return d === 1 ? `${s}${n}` : `${s}\\dfrac{${n}}{${d}}`; };
  const piT = (n, d) => { [n, d] = frac(n, d); if (n === 0) return '0'; const s = n < 0 ? '-' : '', a = Math.abs(n), top = a === 1 ? '\\pi' : `${a}\\pi`; return d === 1 ? `${s}${top}` : `${s}\\dfrac{${top}}{${d}}`; };
  const degPi = d => piT(d, 180);
  const rat = x => { for (let d = 1; d <= 720; d++) { const n = Math.round(x * d); if (Math.abs(n / d - x) < 1e-9) return [n, d]; } throw new Error('rat'); };
  const offTex = off => { const [n, d] = rat(off); return piT(n, d * 180); };
  const kTex = per => { const [n, d] = rat(per), [a, b] = frac(n, d * 180), k = a === 1 ? 'k\\pi' : `k${a}\\pi`; return b === 1 ? k : `\\dfrac{${k}}{${b}}`; };
  const norm = (x, per) => { let y = x % per; if (y < 0) y += per; return y; };

  /* ---- giá trị đặc biệt ---- */
  const S3 = Math.sqrt(3), S2 = Math.SQRT2;
  const EX = [[0, '0'], [.5, '\\dfrac{1}{2}'], [-.5, '-\\dfrac{1}{2}'], [S2 / 2, '\\dfrac{\\sqrt{2}}{2}'], [-S2 / 2, '-\\dfrac{\\sqrt{2}}{2}'], [S3 / 2, '\\dfrac{\\sqrt{3}}{2}'], [-S3 / 2, '-\\dfrac{\\sqrt{3}}{2}'], [1, '1'], [-1, '-1'], [S3 / 3, '\\dfrac{\\sqrt{3}}{3}'], [-S3 / 3, '-\\dfrac{\\sqrt{3}}{3}'], [S3, '\\sqrt{3}'], [-S3, '-\\sqrt{3}']];
  const exTex = v => { const e = EX.find(x => near(x[0], v)); if (!e) throw new Error('exTex ' + v); return e[1]; };
  const CS = EX.slice(0, 9), CT = [EX[0], EX[9], EX[10], EX[7], EX[8], EX[11], EX[12]];       // giá trị c cho sin/cos và cho tan/cot
  const FN = {sin: Math.sin, cos: Math.cos, tan: Math.tan, cot: x => 1 / Math.tan(x)}, FT = {sin: '\\sin', cos: '\\cos', tan: '\\tan', cot: '\\cot'};
  const argTex = (a, b) => `${a === 1 ? '' : a}x${b === 0 ? '' : (b > 0 ? '+' : '-') + degPi(Math.abs(b))}`;
  const argDeg = (a, b) => `${a === 1 ? '' : a}x${b === 0 ? '' : (b > 0 ? '+' : '-') + Math.abs(b) + '^\\circ'}`;

  /* ---- phương trình lượng giác cơ bản: f(ax+b)=c, đơn vị độ ---- */
  const alphaOf = (fn, v) => fn === 'sin' ? Math.round(Math.asin(v) * 180 / Math.PI) : fn === 'cos' ? Math.round(Math.acos(v) * 180 / Math.PI) : fn === 'tan' ? Math.round(Math.atan(v) * 180 / Math.PI) : Math.round(Math.atan2(1, v) * 180 / Math.PI);
  const baseFam = (fn, al) => fn === 'sin' ? [[al, 360], [180 - al, 360]] : fn === 'cos' ? [[al, 360], [-al, 360]] : [[al, 180]];
  const dedupe = f => { const o = []; f.forEach(x => { if (!o.some(y => near(norm(y[0] - x[0], x[1]), 0) || near(norm(y[0] - x[0], x[1]), x[1]))) o.push(x); }); return o; };
  const solFam = (fn, al, a, b) => dedupe(baseFam(fn, al).map(([o, pr]) => [(o - b) / a, pr / a]));
  const famsTex = f => (f.length === 2 && near(f[0][1], f[1][1]) && f[0][0] > 0 && near(f[0][0] + f[1][0], 0)) ? `x=\\pm${offTex(f[0][0])}+${kTex(f[0][1])}`
    : f.map(([o, pr]) => `x=${near(o, 0) ? '' : offTex(o) + '+'}${kTex(pr)}`).join(';\\ ');
  const famOK = (fn, a, b, c, f) => f.every(([o, pr]) => { for (let k = -3; k <= 3; k++) { const v = FN[fn](D2R(a * (o + k * pr) + b)); if (!near(v, c)) return false; } return true; });
  const roots = (f, lo, hi, halfOpen) => { const s = []; f.forEach(([o, pr]) => { for (let k = -400; k <= 400; k++) { const x = o + k * pr; if (x >= lo - 1e-9 && (halfOpen ? x < hi - 1e-9 : x <= hi + 1e-9) && !s.some(y => near(y, x))) s.push(x); } }); return s.sort((u, v) => u - v); };
  const genEq = (r, o = {}) => { const fn = pickR(r, o.fns || ['sin', 'cos', 'tan', 'cot']), tbl = (fn === 'sin' || fn === 'cos') ? CS : CT, [c, ct] = pickR(r, tbl), al = alphaOf(fn, c);
    const a = o.a || (o.simple ? 1 : pickR(r, [1, 2, 3])), b = o.simple ? 0 : (a > 1 || o.compound ? pickR(r, [-60, -45, -30, 30, 45, 60, 90]) : 0), fam = solFam(fn, al, a, b);
    if (!famOK(fn, a, b, c, fam)) throw new Error('famOK'); return {fn, c, ct, al, a, b, fam}; };
  const eqTex = e => `${FT[e.fn]}(${argTex(e.a, e.b)})=${e.ct}`, eqDeg = e => `${FT[e.fn]}(${argDeg(e.a, e.b)})=${e.ct}`;
  const wrongFams = (e) => { const {fn, al, a, b, c} = e, out = [];
    const mk = (fa) => fa.length ? fa : null;
    out.push(dedupe(baseFam(fn, al).map(([o, pr]) => [(o - b) / a, pr])));               // quên chia chu kì cho a
    if (b) { out.push(dedupe(baseFam(fn, al).map(([o, pr]) => [o / a, pr / a])));        // bỏ qua b
             out.push(dedupe(baseFam(fn, al).map(([o, pr]) => [(o + b) / a, pr / a]))); }  // đổi dấu b
    if (fn === 'sin') out.push(solFam('cos', al, a, b)); else if (fn === 'cos') out.push(solFam('sin', al, a, b)); else out.push(solFam(fn, 90 - al, a, b));
    out.push(dedupe(baseFam(fn, al).map(([o, pr]) => [(o - b) / a, pr / a * 2])));        // chu kì gấp đôi
    [90 - al, 180 - al, -al, 90 + al, al + 90, 180 + al].forEach(z => { out.push(solFam(fn, z, a, b)); out.push(dedupe(baseFam(fn, z).map(([o, pr]) => [(o - b) / a, pr / a / 2]))); });
    if (fn === 'sin' || fn === 'cos') out.push(dedupe([[(al - b) / a, 180 / a]])); else out.push(dedupe([[(al - b) / a, 360 / a]]));
    if (fn === 'sin') out.push(dedupe([[(al - b) / a, 360 / a]])); if (fn === 'cos') out.push(dedupe([[(al - b) / a, 360 / a]]));
    return out.filter(f => f.length && !famOK(fn, a, b, c, f)); };

  /* ---- bội số: MC giải phương trình, vô nghiệm ---- */
  const B = {};
  B.conv = (r, ci, o) => { const d = pickR(r, [15, 30, 36, 45, 72, 75, 108, 120, 135, 144, 150, 210, 225, 240, 300, 315]);
    if (o.toRad) { const c = degPi(d); return mc('Nhận biết', `Đổi ${M(`${d}^\\circ`)} sang radian ta được`, M(c), wrong3(M(c), [piT(d, 360), piT(2 * d, 180), piT(180, d), piT(360 - d, 180), piT(d + 180, 180)].map(M)),
      p(`Dùng ${M('1^\\circ=\\dfrac{\\pi}{180}')} rad, nên ${M(`${d}^\\circ=${d}\\cdot\\dfrac{\\pi}{180}=${c}`)}.`) + p('Nhầm thường gặp: dùng nhầm hệ số (nhân với 180/π) hoặc quên rút gọn.')); }
    const c = `${d}^\\circ`; return mc('Nhận biết', `Đổi ${M(degPi(d))} rad sang độ ta được`, M(c), wrong3(M(c), [d / 2, d * 2, 180 - d, 360 - d, d + 90].filter(Number.isInteger).map(x => M(`${x}^\\circ`))),
      p(`Dùng ${M('\\pi\\ \\text{rad}=180^\\circ')}: ${M(`${degPi(d)}=${d}^\\circ`)}.`)); };
  B.arc = (r, ci) => { const R0 = ri(r, 3, 9), d = pickR(r, [30, 45, 60, 90, 120, 135, 150]), c = `${piT(R0 * d, 180)}\\text{ cm}`;
    return mc('Thông hiểu', `Cung tròn có số đo ${M(`${d}^\\circ`)} trên đường tròn bán kính ${M(`R=${R0}`)} cm có độ dài là`, M(c), wrong3(M(c), [`${piT(R0 * d, 360)}\\text{ cm}`, `${piT(2 * R0 * d, 180)}\\text{ cm}`, `${R0 * d}\\text{ cm}`, `${piT(d, 180 * R0)}\\text{ cm}`].map(M)),
      p(`Đổi sang radian: ${M(`\\alpha=${degPi(d)}`)}.`) + p(`Độ dài cung ${M('l=R\\alpha')} ${M(`=${R0}\\cdot${degPi(d)}=${piT(R0 * d, 180)}`)} (cm). Không dùng số đo độ trực tiếp trong công thức ${M('l=R\\alpha')}.`)); };
  const QU = [['I', ['(0;\\,\\dfrac{\\pi}{2})', '(2\\pi;\\,\\dfrac{5\\pi}{2})', '(-2\\pi;\\,-\\dfrac{3\\pi}{2})'], [1, 1, 1]], ['II', ['(\\dfrac{\\pi}{2};\\,\\pi)', '(-\\dfrac{3\\pi}{2};\\,-\\pi)', '(\\dfrac{5\\pi}{2};\\,3\\pi)'], [1, -1, -1]],
    ['III', ['(\\pi;\\,\\dfrac{3\\pi}{2})', '(-\\pi;\\,-\\dfrac{\\pi}{2})', '(3\\pi;\\,\\dfrac{7\\pi}{2})'], [-1, -1, 1]], ['IV', ['(\\dfrac{3\\pi}{2};\\,2\\pi)', '(-\\dfrac{\\pi}{2};\\,0)', '(\\dfrac{7\\pi}{2};\\,4\\pi)'], [-1, 1, -1]]];
  const sgn = (s, c, t) => `\\sin\\alpha${s > 0 ? '\\gt' : '\\lt'}0,\\ \\cos\\alpha${c > 0 ? '\\gt' : '\\lt'}0,\\ \\tan\\alpha${t > 0 ? '\\gt' : '\\lt'}0`;
  B.sign = (r, ci) => { const q = ri(r, 0, 3), [nm0, ivs, sg] = QU[q], iv = pickR(r, ivs); const all = QU.map(([n, , s]) => s), c = all[q];
    const cor = [c[0], c[1], c[2]]; const S = [[1, 1, 1], [1, -1, -1], [-1, -1, 1], [-1, 1, -1]];
    const tex = s => sgn(s[0] === 1 ? 1 : -1, s[1], s[2]); const sc = [[1, 1, 1], [1, -1, -1], [-1, -1, 1], [-1, 1, -1]][q];
    return mc('Thông hiểu', `Với ${M(`\\alpha\\in${iv}`)}, khẳng định nào sau đây đúng?`, M(sgn(sc[0], sc[1], sc[2])), [0, 1, 2, 3].filter(i => i !== q).map(i => { const z = S[i]; return M(sgn(z[0], z[1], z[2])); }),
      p(`Khoảng ${M(iv)} nằm trong góc phần tư thứ ${nm0} (cộng thêm bội của ${M('2\\pi')} không đổi dấu).`) + p(`Ở góc phần tư thứ ${nm0}: ${M(sgn(sc[0], sc[1], sc[2]))}. Ghi nhớ: I: tất cả dương; II: chỉ sin dương; III: chỉ tan, cot dương; IV: chỉ cos dương.`)); };
  B.exact = (r, ci) => { for (let it = 0; it < 100; it++) { const fn = pickR(r, ['sin', 'cos', 'tan']), d = pickR(r, [120, 135, 150, 210, 225, 240, 300, 315, 330, -30, -45, -60, -120, -135, -150, 390, 405, -210]), v = FN[fn](D2R(d));
    if (Math.abs(v) > 1e6) continue; const ot = fn === 'sin' ? 'cos' : fn === 'cos' ? 'sin' : 'tan', cof = FN[ot](D2R(d)); const pool = [-v, cof, FN[fn](D2R(Math.abs(d % 180 === 0 ? 30 : ((Math.abs(d) % 180) > 90 ? 180 - (Math.abs(d) % 180) : (Math.abs(d) % 180))))), fn === 'tan' ? 1 / v : v * S3].filter(x => isFinite(x) && !near(x, v));
    const cand = [...new Set(pool.map(x => { try { return exTex(x); } catch (e) { return null; } }).filter(Boolean))], good = exTex(v); const wr = cand.filter(x => x !== good);
    for (const [x, t] of shuf(r, EX)) if (wr.length < 3 && t !== good && !wr.includes(t) && (fn === 'tan' || Math.abs(x) <= 1)) wr.push(t);
    return mc('Nhận biết', `Giá trị của ${M(`${FT[fn]}\\left(${degPi(d)}\\right)`)} bằng`, M(good), wr.slice(0, 3).map(M),
      p(`Đưa về góc nhọn tương ứng và xét dấu theo góc phần tư. ${M(`${FT[fn]}\\left(${degPi(d)}\\right)=${good}`)}.`) + p('Sai lầm hay gặp: nhầm dấu theo góc phần tư hoặc nhầm giá trị sin với cos của góc đặc biệt.')); } throw new Error('exact'); };
  const LK = [['\\sin(\\pi-\\alpha)', a => Math.sin(Math.PI - a), 'sin'], ['\\sin(\\pi+\\alpha)', a => Math.sin(Math.PI + a), 'sin'], ['\\sin(-\\alpha)', a => Math.sin(-a), 'sin'], ['\\sin\\left(\\dfrac{\\pi}{2}-\\alpha\\right)', a => Math.sin(Math.PI / 2 - a), 'sin'], ['\\sin\\left(\\dfrac{\\pi}{2}+\\alpha\\right)', a => Math.sin(Math.PI / 2 + a), 'sin'],
    ['\\cos(\\pi-\\alpha)', a => Math.cos(Math.PI - a), 'cos'], ['\\cos(\\pi+\\alpha)', a => Math.cos(Math.PI + a), 'cos'], ['\\cos(-\\alpha)', a => Math.cos(-a), 'cos'], ['\\cos\\left(\\dfrac{\\pi}{2}-\\alpha\\right)', a => Math.cos(Math.PI / 2 - a), 'cos'], ['\\cos\\left(\\dfrac{\\pi}{2}+\\alpha\\right)', a => Math.cos(Math.PI / 2 + a), 'cos'],
    ['\\tan(\\pi-\\alpha)', a => Math.tan(Math.PI - a), 'tan'], ['\\tan(\\pi+\\alpha)', a => Math.tan(Math.PI + a), 'tan'], ['\\tan(-\\alpha)', a => Math.tan(-a), 'tan'], ['\\tan\\left(\\dfrac{\\pi}{2}-\\alpha\\right)', a => 1 / Math.tan(a), 'tan']];
  B.link = (r, ci, o) => { const [t, f, k] = pickR(r, LK.filter(x => !o.k || x[2] === o.k)), a0 = .7, v = f(a0), O = k === 'tan' ? [['\\tan\\alpha', Math.tan(a0)], ['-\\tan\\alpha', -Math.tan(a0)], ['\\cot\\alpha', 1 / Math.tan(a0)], ['-\\cot\\alpha', -1 / Math.tan(a0)]] : [['\\sin\\alpha', Math.sin(a0)], ['-\\sin\\alpha', -Math.sin(a0)], ['\\cos\\alpha', Math.cos(a0)], ['-\\cos\\alpha', -Math.cos(a0)]];
    const good = O.filter(x => near(x[1], v)); if (good.length !== 1) throw new Error('link'); return mc('Thông hiểu', `Với mọi ${M('\\alpha')} để biểu thức có nghĩa, ${M(t)} bằng`, M(good[0][0]), O.filter(x => x !== good[0]).map(x => M(x[0])),
      p(`Dùng công thức giá trị lượng giác của các góc liên quan đặc biệt (đối, bù, phụ, hơn kém ${M('\\pi')}).`) + p(`${M(t)} ${M(`=${good[0][0]}`)}. Kiểm tra nhanh: lấy ${M('\\alpha')} nhỏ trong góc phần tư thứ nhất rồi xét dấu.`)); };
  B.same = (r, ci) => { const al = pickR(r, [30, 45, 60, 120, 135, 150]), m = pickR(r, [-2, -1, 1, 2]), good = al + 360 * m; const wr = [al + 180, -al, 180 - al, al + 90, al - 180, al + 540].filter(x => norm(x - al, 360) > 1e-9 && norm(x - al, 360) < 360 - 1e-9);
    return mc('Thông hiểu', `Góc lượng giác nào sau đây có cùng điểm biểu diễn trên đường tròn lượng giác với góc ${M(degPi(al))}?`, M(degPi(good)), shuf(r, [...new Set(wr)]).slice(0, 3).map(x => M(degPi(x))),
      p(`Hai góc có cùng điểm biểu diễn khi hiệu của chúng bằng ${M('k2\\pi')} (số nguyên lần chu kì ${M('2\\pi')}).`) + p(`${M(`${degPi(good)}-${degPi(al)}=${degPi(good - al)}`)} là bội của ${M('2\\pi')}. Các góc còn lại sai khác ${M('\\pi')}, ${M('\\dfrac{\\pi}{2}')} hoặc là góc đối.`)); };
  B.add = (r, ci) => { const T = [['\\cos(a+b)', [['\\cos a\\cos b-\\sin a\\sin b', (a, b) => Math.cos(a) * Math.cos(b) - Math.sin(a) * Math.sin(b)], ['\\cos a\\cos b+\\sin a\\sin b', (a, b) => Math.cos(a) * Math.cos(b) + Math.sin(a) * Math.sin(b)], ['\\sin a\\cos b+\\cos a\\sin b', (a, b) => Math.sin(a) * Math.cos(b) + Math.cos(a) * Math.sin(b)], ['\\sin a\\sin b-\\cos a\\cos b', (a, b) => Math.sin(a) * Math.sin(b) - Math.cos(a) * Math.cos(b)]], (a, b) => Math.cos(a + b)],
      ['\\cos(a-b)', [['\\cos a\\cos b+\\sin a\\sin b', (a, b) => Math.cos(a) * Math.cos(b) + Math.sin(a) * Math.sin(b)], ['\\cos a\\cos b-\\sin a\\sin b', (a, b) => Math.cos(a) * Math.cos(b) - Math.sin(a) * Math.sin(b)], ['\\sin a\\cos b-\\cos a\\sin b', (a, b) => Math.sin(a) * Math.cos(b) - Math.cos(a) * Math.sin(b)], ['\\sin a\\sin b+\\cos a\\cos b\\cdot 2', (a, b) => Math.sin(a) * Math.sin(b) + 2 * Math.cos(a) * Math.cos(b)]], (a, b) => Math.cos(a - b)],
      ['\\sin(a+b)', [['\\sin a\\cos b+\\cos a\\sin b', (a, b) => Math.sin(a) * Math.cos(b) + Math.cos(a) * Math.sin(b)], ['\\sin a\\cos b-\\cos a\\sin b', (a, b) => Math.sin(a) * Math.cos(b) - Math.cos(a) * Math.sin(b)], ['\\cos a\\cos b-\\sin a\\sin b', (a, b) => Math.cos(a) * Math.cos(b) - Math.sin(a) * Math.sin(b)], ['\\sin a\\sin b+\\cos a\\cos b', (a, b) => Math.sin(a) * Math.sin(b) + Math.cos(a) * Math.cos(b)]], (a, b) => Math.sin(a + b)],
      ['\\sin(a-b)', [['\\sin a\\cos b-\\cos a\\sin b', (a, b) => Math.sin(a) * Math.cos(b) - Math.cos(a) * Math.sin(b)], ['\\sin a\\cos b+\\cos a\\sin b', (a, b) => Math.sin(a) * Math.cos(b) + Math.cos(a) * Math.sin(b)], ['\\cos a\\cos b+\\sin a\\sin b', (a, b) => Math.cos(a) * Math.cos(b) + Math.sin(a) * Math.sin(b)], ['\\cos a\\sin b-\\sin a\\cos b', (a, b) => Math.cos(a) * Math.sin(b) - Math.sin(a) * Math.cos(b)]], (a, b) => Math.sin(a - b)],
      ['\\tan(a+b)', [['\\dfrac{\\tan a+\\tan b}{1-\\tan a\\tan b}', (a, b) => (Math.tan(a) + Math.tan(b)) / (1 - Math.tan(a) * Math.tan(b))], ['\\dfrac{\\tan a+\\tan b}{1+\\tan a\\tan b}', (a, b) => (Math.tan(a) + Math.tan(b)) / (1 + Math.tan(a) * Math.tan(b))], ['\\dfrac{\\tan a-\\tan b}{1+\\tan a\\tan b}', (a, b) => (Math.tan(a) - Math.tan(b)) / (1 + Math.tan(a) * Math.tan(b))], ['\\tan a+\\tan b', (a, b) => Math.tan(a) + Math.tan(b)]], (a, b) => Math.tan(a + b)]];
    const [name, opts, ref] = pickR(r, T), a0 = .6, b0 = .35, good = opts.filter(x => near(x[1](a0, b0), ref(a0, b0)));
    if (good.length !== 1 || !good[0] === opts[0]) throw new Error('add ' + name); return mc('Nhận biết', `Công thức nào sau đây đúng?`, M(`${name}=${good[0][0]}`), opts.filter(x => x !== good[0]).map(x => M(`${name}=${x[0]}`)),
      p(`Công thức cộng: ${M(`${name}=${good[0][0]}`)}.`) + p('Mẹo nhớ: cos “khác dấu” (cos+ → trừ, cos− → cộng), sin “cùng dấu”; tan có mẫu “đối dấu” với tử.')); };
  const TRI = [[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25], [20, 21, 29]];
  B.dbl = (r, ci, o) => { const [pp, qq, h] = pickR(r, TRI), q2 = ri(r, 0, 1), cs = q2 ? -qq : qq, s2 = 2 * pp * cs, c2 = h * h - 2 * pp * pp, h2 = h * h, kind = o.kind || pickR(r, ['sin', 'cos']);
    const good = kind === 'sin' ? fr(s2, h2) : fr(c2, h2), alt = kind === 'sin' ? fr(c2, h2) : fr(s2, h2), v = kind === 'sin' ? s2 : c2, ov = kind === 'sin' ? c2 : s2;
    return mc('Thông hiểu', `Cho ${M(`\\sin a=${fr(pp, h)}`)} và ${M(q2 ? '\\dfrac{\\pi}{2}\\lt a\\lt\\pi' : '0\\lt a\\lt\\dfrac{\\pi}{2}')}. Giá trị của ${M(`${kind === 'sin' ? '\\sin' : '\\cos'}2a`)} bằng`, M(good), wrong3(M(good), [fr(-v, h2), alt, fr(-ov, h2), fr(2 * pp, h)].map(M)),
      p(`Vì ${M(q2 ? 'a' : 'a')} ở góc phần tư thứ ${q2 ? 'II' : 'I'} nên ${M(`\\cos a=${q2 ? '-' : ''}\\sqrt{1-\\sin^2a}=${fr(cs, h)}`)}.`) + p(`${M(`\\sin2a=2\\sin a\\cos a=${fr(s2, h2)}`)}; ${M(`\\cos2a=1-2\\sin^2a=${fr(c2, h2)}`)}.`)); };
  B.prod = (r, ci) => { const t = pickR(r, ['cc', 'ss', 'sc']), n = ri(r, 1, 3), m = n + 2 * ri(r, 1, 2), S_ = (m + n) / 2, D_ = (m - n) / 2, x0 = [.31, .77, 1.23], co = k => k === 1 ? '' : k;
    const cases = { cc: [`\\cos ${co(m)}x+\\cos ${co(n)}x`, `2\\cos ${co(S_)}x\\cos ${co(D_)}x`, [`2\\sin ${co(S_)}x\\sin ${co(D_)}x`, `-2\\sin ${co(S_)}x\\sin ${co(D_)}x`, `2\\cos ${co(m + n)}x\\cos ${co(m - n)}x`, `2\\cos ${co(D_)}x\\sin ${co(S_)}x`], x => Math.cos(m * x) + Math.cos(n * x), [x => 2 * Math.sin(S_ * x) * Math.sin(D_ * x), x => -2 * Math.sin(S_ * x) * Math.sin(D_ * x), x => 2 * Math.cos((m + n) * x) * Math.cos((m - n) * x), x => 2 * Math.cos(D_ * x) * Math.sin(S_ * x)], x => 2 * Math.cos(S_ * x) * Math.cos(D_ * x)],
      ss: [`\\sin ${co(m)}x+\\sin ${co(n)}x`, `2\\sin ${co(S_)}x\\cos ${co(D_)}x`, [`2\\cos ${co(S_)}x\\sin ${co(D_)}x`, `2\\sin ${co(S_)}x\\sin ${co(D_)}x`, `2\\sin ${co(m + n)}x\\cos ${co(m - n)}x`, `\\sin ${co(S_)}x\\cos ${co(D_)}x`], x => Math.sin(m * x) + Math.sin(n * x), [x => 2 * Math.cos(S_ * x) * Math.sin(D_ * x), x => 2 * Math.sin(S_ * x) * Math.sin(D_ * x), x => 2 * Math.sin((m + n) * x) * Math.cos((m - n) * x), x => Math.sin(S_ * x) * Math.cos(D_ * x)], x => 2 * Math.sin(S_ * x) * Math.cos(D_ * x)],
      sc: [`\\sin ${co(m)}x\\cos ${co(n)}x`, `\\dfrac{1}{2}\\left[\\sin ${co(m + n)}x+\\sin ${co(m - n)}x\\right]`, [`\\dfrac{1}{2}\\left[\\sin ${co(m + n)}x-\\sin ${co(m - n)}x\\right]`, `\\sin ${co(m + n)}x+\\sin ${co(m - n)}x`, `\\dfrac{1}{2}\\left[\\cos ${co(m + n)}x+\\cos ${co(m - n)}x\\right]`, `2\\sin ${co(m + n)}x\\sin ${co(m - n)}x`], x => Math.sin(m * x) * Math.cos(n * x), [x => .5 * (Math.sin((m + n) * x) - Math.sin((m - n) * x)), x => Math.sin((m + n) * x) + Math.sin((m - n) * x), x => .5 * (Math.cos((m + n) * x) + Math.cos((m - n) * x)), x => 2 * Math.sin((m + n) * x) * Math.sin((m - n) * x)], x => .5 * (Math.sin((m + n) * x) + Math.sin((m - n) * x))] }[t];
    const [lhs, rhs, wr, f0, wf, gf] = cases; x0.forEach(x => { if (!near(f0(x), gf(x))) throw new Error('prod đúng'); }); const keep = wr.filter((_, i) => x0.some(x => !near(wf[i](x), f0(x))));
    return mc('Thông hiểu', `Biến đổi ${M(lhs)} thành ${t === 'sc' ? 'tổng' : 'tích'} ta được`, M(rhs), keep.slice(0, 3).map(M),
      p(t === 'sc' ? `Công thức tích thành tổng: ${M('\\sin a\\cos b=\\dfrac{1}{2}[\\sin(a+b)+\\sin(a-b)]')}.` : `Công thức tổng thành tích: ${t === 'cc' ? M('\\cos a+\\cos b=2\\cos\\dfrac{a+b}{2}\\cos\\dfrac{a-b}{2}') : M('\\sin a+\\sin b=2\\sin\\dfrac{a+b}{2}\\cos\\dfrac{a-b}{2}')}.`) + p(`Áp dụng với ${M(`a=${m}x,\\ b=${n}x`)}: ${M(`${lhs}=${rhs}`)}.`)); };

  /* ---- hàm số lượng giác ---- */
  const exFam = (fn, a, b) => fn === 'tan' ? [(90 - b) / a, 180 / a] : [(0 - b) / a, 180 / a];
  const exTexF = ([o, pr]) => `D=\\mathbb{R}\\setminus\\left\\{${near(o, 0) ? '' : offTex(o) + '+'}${kTex(pr)},\\ k\\in\\mathbb{Z}\\right\\}`;
  B.domain = (r, ci, o) => { for (let it = 0; it < 100; it++) { const fn = pickR(r, o.fns || ['tan', 'cot']), a = o.simple ? 1 : pickR(r, [1, 2, 3]), b = o.simple || a === 1 ? (o.simple ? 0 : pickR(r, [-60, -30, 30, 45, 60])) : pickR(r, [-60, -45, -30, 30, 45, 60, 90]), good = exFam(fn, a, b);
    const den = x => fn === 'tan' ? Math.cos(D2R(a * x + b)) : Math.sin(D2R(a * x + b)); if (![-3, -2, -1, 0, 1, 2, 3].every(k => near(den(good[0] + k * good[1]), 0))) throw new Error('domain');
    if (CHK) CHK.push({type: 'zeros', fn: fn === 'tan' ? 'cos' : 'sin', a, b, fam: good});
    const alt = [[good[0], 180], [fn === 'tan' ? (0 - b) / a : (90 - b) / a, 180 / a], [fn === 'tan' ? (90 + b) / a : (0 + b) / a, 180 / a], [good[0], 360 / a], [(fn === 'tan' ? 90 : 0) / a, 180 / a], [good[0], 90 / a], [good[0] + 90 / a, 180 / a], [0, 90 / a], [good[0], 180 / a / 2]].filter(f => ![-3, -2, -1, 0, 1, 2, 3].every(k => near(den(f[0] + k * f[1]), 0)));
    const seen = new Set(), wr = alt.filter(f => { const t = exTexF(f); if (seen.has(t) || t === exTexF(good)) return false; seen.add(t); return true; }); if (wr.length < 3) continue;
    return mc('Thông hiểu', `Tập xác định của hàm số ${M(`y=${FT[fn]}(${argTex(a, b)})`)} là`, M(exTexF(good)), wr.slice(0, 3).map(f => M(exTexF(f))),
      p(`Hàm số xác định khi ${M(`${fn === 'tan' ? '\\cos' : '\\sin'}(${argTex(a, b)})\\ne0`)}, tức ${M(`${argTex(a, b)}\\ne${fn === 'tan' ? '\\dfrac{\\pi}{2}+k\\pi' : 'k\\pi'}`)}.`) + p(`Giải ra ${M(`x\\ne${near(good[0], 0) ? '' : offTex(good[0]) + '+'}${kTex(good[1])}`)}. Lưu ý chia cả ${M('k\\pi')} cho hệ số của ${M('x')}.`)); } throw new Error('domain loop'); };
  const PAR = [['\\sin x', x => Math.sin(x)], ['\\cos x', x => Math.cos(x)], ['\\tan x', x => Math.tan(x)], ['\\cot x', x => 1 / Math.tan(x)], ['x\\sin x', x => x * Math.sin(x)], ['x\\cos x', x => x * Math.cos(x)], ['x^2+\\cos x', x => x * x + Math.cos(x)], ['\\sin x+\\cos x', x => Math.sin(x) + Math.cos(x)],
    ['x+\\sin x', x => x + Math.sin(x)], ['|\\sin x|', x => Math.abs(Math.sin(x))], ['\\sin^2x', x => Math.sin(x) ** 2], ['\\sin x\\cos x', x => Math.sin(x) * Math.cos(x)], ['1+\\sin x', x => 1 + Math.sin(x)], ['x+\\cos x', x => x + Math.cos(x)], ['x^3+\\tan x', x => x ** 3 + Math.tan(x)], ['\\cos 2x', x => Math.cos(2 * x)], ['\\sin 3x', x => Math.sin(3 * x)], ['x^2\\sin x', x => x * x * Math.sin(x)]];
  const parityOf = f => { const T = [.3, .7, 1.1]; if (T.every(x => near(f(-x), f(x)))) return 'even'; if (T.every(x => near(f(-x), -f(x)))) return 'odd'; return 'none'; };
  B.parity = (r, ci, o) => { const want = o.even ? 'even' : 'odd', G = PAR.filter(x => parityOf(x[1]) === want), N = PAR.filter(x => parityOf(x[1]) !== want), good = pickR(r, G), wr = shuf(r, N).slice(0, 3);
    return mc('Thông hiểu', `Hàm số nào sau đây là hàm số ${o.even ? 'chẵn' : 'lẻ'}?`, M(`y=${good[0]}`), wr.map(x => M(`y=${x[0]}`)),
      p(`Hàm số ${o.even ? 'chẵn: ' + M('f(-x)=f(x)') : 'lẻ: ' + M('f(-x)=-f(x)')} với mọi ${M('x')} thuộc tập xác định đối xứng.`) + p(`Với ${M(`f(x)=${good[0]}`)} ta có ${M(`f(-x)=${o.even ? '' : '-'}f(x)`)}. Ghi nhớ: sin, tan, cot lẻ; cos chẵn; tích hai hàm cùng tính chẵn lẻ là hàm chẵn, khác tính chất là hàm lẻ; tổng “khác loại” không chẵn không lẻ.`)); };
  const PER = [['\\sin', 'sin', 360], ['\\cos', 'cos', 360], ['\\tan', 'tan', 180], ['\\cot', 'cot', 180]];
  B.period = (r, ci) => { const [t, fn, base] = pickR(r, PER), a = pickR(r, [2, 3, 4, 1]), T = base / a, good = piT(T, 180);
    const isPer = P => [.2, .9, 1.7].every(x => near(FN[fn](D2R(a * (x + P))), FN[fn](D2R(a * x)))); if (!isPer(T) || isPer(T / 2)) throw new Error('period');
    const wr = [piT(2 * T, 180), piT(T / 2 === Math.round(T / 2) ? T / 2 : T / 2 * 1, 180), piT(base, 180), piT(360, 180)].filter(x => x !== good);
    return mc('Thông hiểu', `Chu kì tuần hoàn của hàm số ${M(`y=${t}${a === 1 ? '\\,x' : ` ${a}x`}`)} là`, M(good), wrong3(M(good), [...wr, piT(T * 3, 180)].map(M)),
      p(`Hàm ${M(`y=${t}(ax)`)} có chu kì ${M(`\\dfrac{${base === 360 ? '2\\pi' : '\\pi'}}{|a|}`)}.`) + p(`Với ${M(`a=${a}`)}: ${M(`T=${good}`)}. Không nhầm với chu kì của hàm gốc.`)); };
  const RNG = [
    r => { const a = pickR(r, [2, 3, 4, -2, -3]), c = pickR(r, [-2, -1, 1, 2, 3]); return {tex: `${a === -1 ? '-' : a}\\sin x${c > 0 ? '+' : '-'}${Math.abs(c)}`, f: x => a * Math.sin(x) + c, mx: Math.abs(a) + c, mn: -Math.abs(a) + c, w: [a + c, -a + c, Math.abs(a), c]}; },
    r => { const a = pickR(r, [2, 3, 4]), c = pickR(r, [-3, -1, 1, 2]); return {tex: `${a}\\cos^2x${c > 0 ? '+' : '-'}${Math.abs(c)}`, f: x => a * Math.cos(x) ** 2 + c, mx: a + c, mn: c, w: [a * 2 + c, c - a, -a + c, 2 * a]}; },
    r => { const a = pickR(r, [3, 4, 5]), b = pickR(r, [1, 2, 3]); return {tex: `${a}-${b}|\\sin x|`, f: x => a - b * Math.abs(Math.sin(x)), mx: a, mn: a - b, w: [a + b, a - 2 * b, b, a - b - 1]}; },
    r => { const [pp, qq, h] = pickR(r, TRI.slice(0, 3)); return {tex: `${pp}\\sin x+${qq}\\cos x`, f: x => pp * Math.sin(x) + qq * Math.cos(x), mx: h, mn: -h, w: [pp + qq, pp * qq, h * h, -(pp + qq)]}; }];
  B.range = (r, ci, o) => { const g = pickR(r, RNG)(r), mx = o.min ? g.mn : g.mx, scan = (cmp) => { let v = g.f(0); for (let x = 0; x <= 2 * Math.PI; x += .0005) v = cmp(v, g.f(x)); return v; }, real = o.min ? scan(Math.min) : scan(Math.max);
    if (Math.abs(real - mx) > 1e-3) throw new Error('range ' + g.tex); if (CHK) CHK.push({type: 'range', f: g.f, min: o.min, ans: mx});
    return mc('Vận dụng', `Giá trị ${o.min ? 'nhỏ' : 'lớn'} nhất của hàm số ${M(`y=${g.tex}`)} bằng`, M(mx), wrong3(M(mx), [(o.min ? g.mx : g.mn), ...g.w].map(M)),
      p(`Dùng ${M('-1\\le\\sin x\\le1')}, ${M('0\\le\\cos^2x\\le1')}, ${M('0\\le|\\sin x|\\le1')} (hoặc ${M('|a\\sin x+b\\cos x|\\le\\sqrt{a^2+b^2}')}) để chặn biểu thức.`) + p(`Giá trị ${o.min ? 'nhỏ' : 'lớn'} nhất là ${M(mx)}. Chú ý hệ số ${M('a')} âm đổi vai trò của sin lớn nhất – nhỏ nhất.`)); };
  const IV = [[-90, 90], [0, 180], [90, 270], [180, 360], [-180, 0], [90, 180], [0, 90], [270, 360], [-90, 0], [180, 270]];
  const monoOK = (f, lo, hi, inc) => { let prev = f(D2R(lo + .01)); for (let x = lo + .5; x < hi - .01; x += .5) { const v = f(D2R(x)); if (inc ? v < prev - 1e-12 : v > prev + 1e-12) return false; prev = v; } return true; };
  const ivT = ([lo, hi]) => `(${degPi(lo)};\\,${degPi(hi)})`;
  B.mono = (r, ci, o) => { const fn = o.fn || pickR(r, ['sin', 'cos']), inc = o.inc != null ? o.inc : r() < .5, f = FN[fn], good = IV.filter(v => monoOK(f, v[0], v[1], inc)), bad = IV.filter(v => !monoOK(f, v[0], v[1], inc)), pick = pickR(r, good.filter(v => v[1] - v[0] >= 180 || r() < .3));
    return mc('Thông hiểu', `Hàm số ${M(`y=${FT[fn]}x`)} ${inc ? 'đồng biến' : 'nghịch biến'} trên khoảng nào sau đây?`, M(ivT(pick)), shuf(r, bad).slice(0, 3).map(v => M(ivT(v))),
      p(`${fn === 'sin' ? 'Hàm sin đồng biến trên ' + M('(-\\dfrac{\\pi}{2};\\,\\dfrac{\\pi}{2})') + ' và nghịch biến trên ' + M('(\\dfrac{\\pi}{2};\\,\\dfrac{3\\pi}{2})') : 'Hàm cos nghịch biến trên ' + M('(0;\\,\\pi)') + ' và đồng biến trên ' + M('(\\pi;\\,2\\pi)')} (và các khoảng tịnh tiến ${M('k2\\pi')}).`) + p(`Vì vậy ${M(ivT(pick))} thỏa mãn; ba khoảng còn lại chứa cả đoạn tăng lẫn đoạn giảm của hàm số.`)); };

  /* ---- phương trình lượng giác ---- */
  B.solve = (r, ci, o) => { for (let it = 0; it < 200; it++) { const e = genEq(r, o), ws = wrongFams(e).map(famsTex), good = famsTex(e.fam); const wr = [...new Set(ws)].filter(x => x !== good); if (wr.length < 3) continue;
    return mc(o.compound ? 'Vận dụng' : 'Thông hiểu', `Nghiệm của phương trình ${M(eqTex(e))} là (với ${M('k\\in\\mathbb{Z}')})`, M(good), shuf(r, wr).slice(0, 3).map(M),
      p(`Đặt ${M(`u=${argTex(e.a, e.b)}`)}. ${M(`${FT[e.fn]}u=${e.ct}=${FT[e.fn]}${degPi(e.al)}`)} nên ${e.fn === 'sin' ? M(`u=${degPi(e.al)}+k2\\pi`) + ' hoặc ' + M(`u=\\pi-${degPi(e.al)}+k2\\pi`) : e.fn === 'cos' ? M(`u=\\pm${degPi(e.al)}+k2\\pi`) : M(`u=${degPi(e.al)}+k\\pi`)}.`) + p(`Giải tìm ${M('x')}: chia cả hai vế (kể cả ${M('k2\\pi')} hoặc ${M('k\\pi')}) cho ${M(e.a)} ${e.b ? 'sau khi chuyển vế phần ' + M(degPi(Math.abs(e.b))) : ''}: ${M(good)}.`)); } throw new Error('solve'); };
  B.noSol = (r, ci) => { const bad = pickR(r, [['\\sin x=\\sqrt{3}', 0], ['\\cos x=-\\dfrac{3}{2}', 0], ['\\sin x=\\dfrac{5}{4}', 0], ['\\cos x=\\sqrt{2}', 0], ['\\sin x=-\\dfrac{7}{5}', 0], ['\\cos x=\\dfrac{4}{3}', 0]]);
    const ok = shuf(r, [['\\sin x=1'], ['\\cos x=-1'], ['\\tan x=5'], ['\\cot x=-\\sqrt{3}'], ['\\sin x=-\\dfrac{\\sqrt{3}}{2}'], ['\\cos x=\\dfrac{\\sqrt{2}}{2}'], ['\\tan x=-100']]).slice(0, 3);
    return mc('Thông hiểu', 'Phương trình nào sau đây vô nghiệm?', M(bad[0]), ok.map(x => M(x[0])), p(`Phương trình ${M('\\sin x=m')} hoặc ${M('\\cos x=m')} có nghiệm khi và chỉ khi ${M('|m|\\le1')}.`) + p(`${M(bad[0])} có vế phải có giá trị tuyệt đối lớn hơn 1 nên vô nghiệm. Các phương trình còn lại có nghiệm (kể cả ${M('\\sin x=1')}, ${M('\\cos x=-1')} và mọi phương trình ${M('\\tan x=m')}, ${M('\\cot x=m')}).`)); };

  /* ================= ĐÚNG / SAI ================= */
  const FACT = {
    sin: {D: '\\mathbb{R}', Dw: '\\mathbb{R}\\setminus\\{k\\pi\\}', par: 'lẻ', parw: 'chẵn', T: '2\\pi', Tw: '\\pi', mono: ['đồng biến trên khoảng', '(-\\dfrac{\\pi}{2};\\,\\dfrac{\\pi}{2})', '(0;\\,\\pi)'], rng: '[-1;\\,1]', rngw: '\\mathbb{R}'},
    cos: {D: '\\mathbb{R}', Dw: '\\mathbb{R}\\setminus\\{\\dfrac{\\pi}{2}+k\\pi\\}', par: 'chẵn', parw: 'lẻ', T: '2\\pi', Tw: '\\pi', mono: ['nghịch biến trên khoảng', '(0;\\,\\pi)', '(-\\dfrac{\\pi}{2};\\,\\dfrac{\\pi}{2})'], rng: '[-1;\\,1]', rngw: '(-1;\\,1)'},
    tan: {D: '\\mathbb{R}\\setminus\\{\\dfrac{\\pi}{2}+k\\pi,\\ k\\in\\mathbb{Z}\\}', Dw: '\\mathbb{R}\\setminus\\{k\\pi,\\ k\\in\\mathbb{Z}\\}', par: 'lẻ', parw: 'chẵn', T: '\\pi', Tw: '2\\pi', mono: ['đồng biến trên khoảng', '(-\\dfrac{\\pi}{2};\\,\\dfrac{\\pi}{2})', '(0;\\,\\pi)'], rng: '\\mathbb{R}', rngw: '[-1;\\,1]'},
    cot: {D: '\\mathbb{R}\\setminus\\{k\\pi,\\ k\\in\\mathbb{Z}\\}', Dw: '\\mathbb{R}\\setminus\\{\\dfrac{\\pi}{2}+k\\pi,\\ k\\in\\mathbb{Z}\\}', par: 'lẻ', parw: 'chẵn', T: '\\pi', Tw: '2\\pi', mono: ['nghịch biến trên khoảng', '(0;\\,\\pi)', '(-\\dfrac{\\pi}{2};\\,\\dfrac{\\pi}{2})'], rng: '\\mathbb{R}', rngw: '[0;\\,+\\infty)'}};
  B.tfFacts = (r, ci, o) => { const fn = o.fn || pickR(r, ['sin', 'cos', 'tan', 'cot']), F = FACT[fn], w = pat(r), n = `y=${FT[fn]}\\,x`;
    return {stem: `Cho hàm số ${M(n)}. Xét tính đúng sai của các khẳng định sau:`, items: [
      claim(w[0], `Tập xác định là ${M(`D=${F.D}`)}.`, `Tập xác định là ${M(`D=${F.Dw}`)}.`, `<p>${fn === 'tan' ? 'Cần ' + M('\\cos x\\ne0') : fn === 'cot' ? 'Cần ' + M('\\sin x\\ne0') : 'Hàm sin, cos xác định với mọi ' + M('x')}.</p>`),
      claim(w[1], `Hàm số đã cho là hàm số ${F.par}.`, `Hàm số đã cho là hàm số ${F.parw}.`, `<p>${M(`${FT[fn]}(-x)=${fn === 'cos' ? '' : '-'}${FT[fn]}x`)}, nên hàm số là hàm ${F.par}.</p>`),
      claim(w[2], `Hàm số tuần hoàn với chu kì ${M(F.T)}.`, `Hàm số tuần hoàn với chu kì ${M(F.Tw)}.`, `<p>Chu kì của ${M(FT[fn])} là ${M(F.T)}.</p>`),
      claim(w[3], `Hàm số ${F.mono[0]} ${M(F.mono[1])}.`, `Hàm số ${F.mono[0]} ${M(F.mono[2])}.`, `<p>${F.mono[0][0].toUpperCase() + F.mono[0].slice(1)} ${M(F.mono[1])}; khoảng ${M(F.mono[2])} chứa cả đoạn tăng lẫn đoạn giảm hoặc chứa điểm không xác định của hàm số.</p>`)]}; };
  B.tfFun = (r, ci, o) => { const fn = o.fn || pickR(r, ['sin', 'cos']), A = pickR(r, [2, 3, 4]), b = pickR(r, [2, 3]), C = fn === 'sin' && r() < .5 ? 0 : pickR(r, [-2, -1, 1, 2]), w = pat(r), lo = C - A, hi = C + A;
    const f = x => A * FN[fn](b * x) + C; let mx = -9, mn = 9; for (let x = 0; x < 7; x += .001) { mx = Math.max(mx, f(x)); mn = Math.min(mn, f(x)); } if (Math.abs(mx - hi) > 1e-3 || Math.abs(mn - lo) > 1e-3) throw new Error('tfFun');
    const odd = fn === 'sin' && C === 0, parTrue = fn === 'sin' ? (odd ? 'là hàm số lẻ' : 'không là hàm số chẵn cũng không là hàm số lẻ') : 'là hàm số chẵn', parFalse = fn === 'sin' ? 'là hàm số chẵn' : 'là hàm số lẻ';
    return {stem: `Cho hàm số ${M(`y=${A}\\${fn}\\ ${b}x${C > 0 ? '+' : C < 0 ? '-' : ''}${C ? Math.abs(C) : ''}`)}. Xét tính đúng sai của các khẳng định sau:`, items: [
      claim(w[0], `Tập xác định của hàm số là ${M('\\mathbb{R}')}.`, `Tập xác định của hàm số là ${M('\\mathbb{R}\\setminus\\{k\\pi\\}')}.`, `<p>${M(fn === 'sin' ? '\\sin(bx)' : '\\cos(bx)')} xác định với mọi ${M('x')}.</p>`),
      claim(w[1], `Tập giá trị của hàm số là ${M(`[${lo};\\,${hi}]`)}.`, `Tập giá trị của hàm số là ${M(`[${-A};\\,${A}]`)}${C === 0 ? '' : ''}.`.replace(`[${-A};\\,${A}]`, C === 0 ? `[${-A - 1};\\,${A + 1}]` : `[${-A};\\,${A}]`), `<p>${M(`-1\\le\\${fn}(${b}x)\\le1`)} nên ${M(`${C - A}\\le y\\le${C + A}`)}.</p>`),
      claim(w[2], `Hàm số có chu kì ${M(`T=${piT(2, b)}`)}.`, `Hàm số có chu kì ${M('T=2\\pi')}.`, `<p>Chu kì của ${M(`\\${fn}(${b}x)`)} là ${M(`\\dfrac{2\\pi}{${b}}`)}; hệ số ${M(A)} và hằng số ${M(C)} không đổi chu kì.</p>`),
      claim(w[3], `Hàm số ${parTrue}.`, `Hàm số ${parFalse}.`, `<p>${fn === 'sin' ? `${M(`f(-x)=${-A}\\sin ${b}x${C > 0 ? '+' : C < 0 ? '-' : ''}${C ? Math.abs(C) : ''}`)}: ${odd ? 'bằng ' + M('-f(x)') : 'không bằng ' + M('f(x)') + ' cũng không bằng ' + M('-f(x)') + ' vì có hằng số ' + M(C)}` : `${M(`\\cos(-bx)=\\cos bx`)} nên ${M('f(-x)=f(x)')}`}.</p>`)]}; };
  const QV = [[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25]];
  B.tfVal = (r, ci) => { const [pp, qq, h] = pickR(r, QV), q2 = ri(r, 0, 1), cs = q2 ? -qq : qq, w = pat(r), tn = fr(pp, cs), s2 = fr(2 * pp * cs, h * h), c2 = fr(h * h - 2 * pp * pp, h * h);
    return {stem: `Cho ${M(`\\sin a=${fr(pp, h)}`)} với ${M(q2 ? '\\dfrac{\\pi}{2}\\lt a\\lt\\pi' : '0\\lt a\\lt\\dfrac{\\pi}{2}')}. Xét tính đúng sai của các khẳng định sau:`, items: [
      claim(w[0], `${M(`\\cos a=${fr(cs, h)}`)}.`, `${M(`\\cos a=${fr(-cs, h)}`)}.`, `<p>${M(`\\cos^2a=1-\\sin^2a=${fr(qq * qq, h * h)}`)}; góc phần tư thứ ${q2 ? 'II nên cos âm' : 'I nên cos dương'}: ${M(`\\cos a=${fr(cs, h)}`)}.</p>`),
      claim(w[1], `${M(`\\tan a=${tn}`)}.`, `${M(`\\tan a=${fr(-pp, cs)}`)}.`, `<p>${M(`\\tan a=\\dfrac{\\sin a}{\\cos a}=${tn}`)}.</p>`),
      claim(w[2], `${M(`\\sin2a=${s2}`)}.`, `${M(`\\sin2a=${fr(-2 * pp * cs, h * h)}`)}.`, `<p>${M(`\\sin2a=2\\sin a\\cos a=2\\cdot${fr(pp, h)}\\cdot${fr(cs, h)}=${s2}`)}.</p>`),
      claim(w[3], `${M(`\\cos2a=${c2}`)}.`, `${M(`\\cos2a=${fr(2 * pp * pp - h * h + 0, h * h) === c2 ? fr(2 * qq * qq - h * h + 2 * pp * pp, h * h) : fr(2 * pp * pp - h * h, h * h)}`)}.`, `<p>${M(`\\cos2a=1-2\\sin^2a=1-2\\cdot${fr(pp * pp, h * h)}=${c2}`)}.</p>`)]}; };
  B.tfEq = (r, ci, o) => { const fn = o.fn || pickR(r, ['sin', 'cos']), [c, ct] = pickR(r, CS.filter(x => Math.abs(x[0]) < 1 && x[0] !== 0)), al = alphaOf(fn, c), fam = solFam(fn, al, 1, 0), w = pat(r), good = famsTex(fam);
    const wrongF = wrongFams({fn, al, a: 1, b: 0, c}).map(famsTex).filter(x => x !== good)[0] || famsTex(solFam(fn, 90 - al, 1, 0)), cnt = roots(fam, 0, 360, true).length, pts = roots(fam, 0, 360, true);
    const ok0 = pts[0], bad0 = (ok0 + 30) % 360; if (famOK(fn, 1, 0, c, [[bad0, 360]])) throw new Error('tfEq');
    const inHalf = roots(fam, 0, 180, false).length; if (CHK) CHK.push({type: 'count', fn, a: 1, b: 0, c, lo: 0, hi: 360, half: true, ans: cnt});
    return {stem: `Cho phương trình ${M(`${FT[fn]}x=${ct}`)}. Xét tính đúng sai của các khẳng định sau:`, items: [
      claim(w[0], `Nghiệm của phương trình là ${M(good)}, ${M('k\\in\\mathbb{Z}')}.`, `Nghiệm của phương trình là ${M(wrongF)}, ${M('k\\in\\mathbb{Z}')}.`, `<p>${M(`${FT[fn]}x=${ct}=${FT[fn]}${degPi(al)}`)} nên ${M(good)}.</p>`),
      claim(w[1], `Phương trình có đúng ${M(cnt)} nghiệm trong nửa khoảng ${M('[0;\\,2\\pi)')}.`, `Phương trình có đúng ${M(cnt + 1)} nghiệm trong nửa khoảng ${M('[0;\\,2\\pi)')}.`, `<p>Lấy các giá trị ${M('k')} sao cho nghiệm thuộc ${M('[0;\\,2\\pi)')}: các nghiệm là ${M(pts.map(x => degPi(x)).join(';\\ '))}, tức ${M(cnt)} nghiệm.</p>`),
      claim(w[2], `${M(`x=${degPi(ok0)}`)} là một nghiệm của phương trình.`, `${M(`x=${degPi(bad0)}`)} là một nghiệm của phương trình.`, `<p>${M(`${FT[fn]}${degPi(w[2] ? ok0 : bad0)}=${exTexSafe(FN[fn](D2R(w[2] ? ok0 : bad0)))}`)}, ${w[2] ? 'bằng' : 'khác'} ${M(ct)}.</p>`),
      claim(w[3], `Phương trình có đúng ${M(inHalf)} nghiệm trong đoạn ${M('[0;\\,\\pi]')}.`, `Phương trình có đúng ${M(inHalf + 1)} nghiệm trong đoạn ${M('[0;\\,\\pi]')}.`, `<p>Trong ${M('[0;\\,\\pi]')} các nghiệm là ${M(roots(fam, 0, 180, false).map(x => degPi(x)).join(';\\ ') || '\\text{không có}')}: ${M(inHalf)} nghiệm.</p>`)]}; };
  const exTexSafe = v => { try { return exTex(v); } catch (e) { return v.toFixed(3); } };

  /* ================= TRẢ LỜI NGẮN ================= */
  const lim = (lo, hi) => `[${degPi(lo)};\\,${degPi(hi)}]`;
  B.shCount = (r, ci) => { for (let it = 0; it < 200; it++) { const e = genEq(r, {}), lo = pickR(r, [0, -180, -360, 90]), len = pickR(r, [360, 540, 720]), hi = lo + len, n = roots(e.fam, lo, hi, false).length; if (n < 2 || n > 10) continue;
    if (CHK) CHK.push({type: 'count', fn: e.fn, a: e.a, b: e.b, c: e.c, lo, hi, ans: n});
    return {q: `Số nghiệm của phương trình ${M(eqTex(e))} trên đoạn ${M(lim(lo, hi))} là bao nhiêu?`, ans: String(n), sol: p(`Nghiệm tổng quát: ${M(famsTex(e.fam))}, ${M('k\\in\\mathbb{Z}')}.`) + p(`Cho nghiệm thuộc ${M(lim(lo, hi))} rồi lấy các giá trị nguyên của ${M('k')}: các nghiệm là ${M(roots(e.fam, lo, hi, false).map(x => degPi(x)).join(';\\ '))}.`) + p(`Đáp số: ${M(n)} nghiệm.`)}; } throw new Error('shCount'); };
  B.shMinPos = (r, ci) => { for (let it = 0; it < 400; it++) { const e = genEq(r, {fns: ['sin', 'cos', 'tan']}), ps = roots(e.fam, 0, 3600, false).filter(x => x > 1e-9), m = ps[0]; if (!Number.isInteger(m) || m > 300) continue;
    if (CHK) CHK.push({type: 'minpos', fn: e.fn, a: e.a, b: e.b, c: e.c, ans: m});
    return {q: `Tìm nghiệm dương nhỏ nhất (tính theo đơn vị độ) của phương trình ${M(eqDeg(e).replace(/x\+/g, 'x+').replace(/\\pi/g, '\\pi'))}.`, ans: String(m), sol: p(`Nghiệm tổng quát (độ): ${M(e.fam.map(([o, pr]) => `x=${rat(o)[1] === 1 ? o : fr(rat(o)[0], rat(o)[1])}^\\circ+k\\cdot${rat(pr)[1] === 1 ? pr : fr(rat(pr)[0], rat(pr)[1])}^\\circ`).join(';\\ '))}.`) + p(`Cho ${M('k')} nguyên tăng dần, lấy giá trị dương nhỏ nhất của từng họ rồi so sánh: nhỏ nhất là ${M(m + '^\\circ')}.`) + p(`Đáp số: ${M(m)}.`)}; } throw new Error('shMinPos'); };
  B.shSum = (r, ci) => { for (let it = 0; it < 400; it++) { const fn = pickR(r, ['sin', 'cos', 'tan']), [c, ct] = pickR(r, (fn === 'tan' ? CT : CS).filter(x => x[0] !== 0 && (fn === 'tan' || Math.abs(x[0]) < 1))), al = alphaOf(fn, c), fam = solFam(fn, al, 1, 0), lo = pickR(r, [0, 0, -180]), hi = lo + 360, sol = roots(fam, lo, hi, true), sum = sol.reduce((s, x) => s + x, 0);
    if (!sol.length || !Number.isInteger(sum) || Math.abs(sum) > 9999) continue; if (CHK) CHK.push({type: 'sum', fn, a: 1, b: 0, c, lo, hi, ans: sum});
    return {q: `Tính tổng các nghiệm (tính theo đơn vị độ) của phương trình ${M(`${FT[fn]}x=${ct}`)} trong nửa khoảng ${M(`[${lo}^\\circ;\\,${hi}^\\circ)`)}.`, ans: String(sum), sol: p(`Các nghiệm trong ${M(`[${lo}^\\circ;\\,${hi}^\\circ)`)}: ${M(sol.map(x => x + '^\\circ').join(';\\ '))}.`) + p(`Tổng: ${M(sol.map(x => nm(x)).join('+') + '=' + sum)}.`) + p(`Đáp số: ${M(sum)}.`)}; } throw new Error('shSum'); };
  const nm = n => n < 0 ? `(${n})` : `${n}`;
  B.shDbl = (r, ci, o) => { const [pp, qq, h] = pickR(r, QV), q2 = ri(r, 0, 1), cs = q2 ? -qq : qq, kind = o.kind || pickR(r, ['sin', 'cos']), val = kind === 'sin' ? 2 * pp * cs : h * h - 2 * pp * pp, h2 = h * h;
    return {q: `Cho ${M(`\\sin a=${fr(pp, h)}`)} với ${M(q2 ? '\\dfrac{\\pi}{2}\\lt a\\lt\\pi' : '0\\lt a\\lt\\dfrac{\\pi}{2}')}. Tính giá trị của ${M(`${h2}\\${kind}2a`)}.`, ans: String(val), sol: p(`${M(`\\cos a=${fr(cs, h)}`)} (góc phần tư thứ ${q2 ? 'II' : 'I'}).`) + p(kind === 'sin' ? `${M(`\\sin2a=2\\sin a\\cos a=${fr(val, h2)}`)}, nên ${M(`${h2}\\sin2a=${val}`)}.` : `${M(`\\cos2a=1-2\\sin^2a=${fr(val, h2)}`)}, nên ${M(`${h2}\\cos2a=${val}`)}.`) + p(`Đáp số: ${M(val)}.`)}; };
  B.shRange = (r, ci, o) => { const [pp, qq, h] = pickR(r, [[3, 4, 5], [6, 8, 10], [5, 12, 13], [8, 6, 10]]), c = pickR(r, [1, 2, 3, -1, -2]);
    if (o.diff) { const ans = 2 * h; if (CHK) CHK.push({type: 'range2', f: x => pp * Math.sin(x) + qq * Math.cos(x) + c, ans}); return {q: `Gọi ${M('M,\\ m')} lần lượt là giá trị lớn nhất, nhỏ nhất của hàm số ${M(`y=${pp}\\sin x+${qq}\\cos x${c > 0 ? '+' : '-'}${Math.abs(c)}`)}. Tính ${M('M-m')}.`, ans: String(ans), sol: p(`${M(`|${pp}\\sin x+${qq}\\cos x|\\le\\sqrt{${pp}^2+${qq}^2}=${h}`)}, nên ${M(`${c - h}\\le y\\le${c + h}`)}.`) + p(`${M(`M=${c + h},\\ m=${c - h}`)}, ${M(`M-m=${ans}`)}. Đáp số: ${M(ans)}.`)}; }
    const ans = h + c; if (CHK) CHK.push({type: 'range', f: x => pp * Math.sin(x) + qq * Math.cos(x) + c, min: false, ans}); return {q: `Tìm giá trị lớn nhất của hàm số ${M(`y=${pp}\\sin x+${qq}\\cos x${c > 0 ? '+' : '-'}${Math.abs(c)}`)}.`, ans: String(ans), sol: p(`${M(`|${pp}\\sin x+${qq}\\cos x|\\le\\sqrt{${pp}^2+${qq}^2}=${h}`)}.`) + p(`Giá trị lớn nhất bằng ${M(`${h}${c > 0 ? '+' : '-'}${Math.abs(c)}=${ans}`)}. Đáp số: ${M(ans)}.`)}; };
  B.shParam = (r, ci, o) => { if (o.range) { const a = pickR(r, [2, 3, 4, 5]), c = pickR(r, [-3, -2, -1, 1, 2, 3]); let n = 0; for (let y = -50; y <= 50; y++) if (y >= c - a && y <= c + a) n++;
      return {q: `Hàm số ${M(`y=${a}\\sin x${c > 0 ? '+' : '-'}${Math.abs(c)}`)} nhận bao nhiêu giá trị nguyên?`, ans: String(n), sol: p(`${M(`-1\\le\\sin x\\le1`)} nên ${M(`${c - a}\\le y\\le${c + a}`)}.`) + p(`Các số nguyên từ ${M(c - a)} đến ${M(c + a)}: ${M(`${c + a}-(${c - a})+1=${n}`)}. Đáp số: ${M(n)}.`)}; }
    const fn = pickR(r, ['sin', 'cos']), pc = pickR(r, [1, 2]), v = pickR(r, [2, 3, 4, 5]), u = pickR(r, [-3, -2, -1, 1, 2, 3]); let n = 0; for (let m = -100; m <= 100; m++) { const val = (pc * m + u) / v; if (val >= -1 - 1e-12 && val <= 1 + 1e-12) n++; }
    const num = `${pc === 1 ? '' : pc}m${u > 0 ? '+' : '-'}${Math.abs(u)}`; if (CHK) CHK.push({type: 'param', pc, u, v, ans: n});
    return {q: `Có bao nhiêu giá trị nguyên của tham số ${M('m')} để phương trình ${M(`\\${fn}x=\\dfrac{${num}}{${v}}`)} có nghiệm?`, ans: String(n), sol: p(`Phương trình ${M(`\\${fn}x=t`)} có nghiệm khi ${M('-1\\le t\\le1')}.`) + p(`${M(`-${v}\\le${num}\\le${v}`)} cho các số nguyên ${M('m')} thỏa mãn; đếm được ${M(n)} giá trị. Đáp số: ${M(n)}.`)}; };
  B.shTide = (r, ci, o) => { for (let it = 0; it < 200; it++) { const A = pickR(r, [2, 3, 4]), H = pickR(r, [8, 10, 12]), [c, ct] = pickR(r, [[0, '0'], [.5, '\\dfrac{1}{2}'], [1, '1'], [-.5, '-\\dfrac{1}{2}'], [-1, '-1']]), level = H + A * c, al = alphaOf('sin', c), fam = solFam('sin', al, 1, 0);
    if (Number.isInteger(level) === false) continue; if (o.first) { const ts = roots(fam, 0, 720, false).filter(x => x > 1e-9).map(x => x / 30), t0 = ts[0]; if (!Number.isInteger(t0)) continue; if (CHK) CHK.push({type: 'tideFirst', A, H, level, ans: t0});
      return {q: `Mực nước (mét) ở một cảng tại thời điểm ${M('t')} giờ (${M('t\\ge0')}) là ${M(`h(t)=${A}\\sin\\dfrac{\\pi t}{6}+${H}`)}. Kể từ ${M('t=0')}, sau ít nhất bao nhiêu giờ thì mực nước đạt ${level} m?`, ans: String(t0), sol: p(`${M(`${A}\\sin\\dfrac{\\pi t}{6}+${H}=${level}`)} nên ${M(`\\sin\\dfrac{\\pi t}{6}=${ct}`)}.`) + p(`Đặt ${M('x=\\dfrac{\\pi t}{6}')} (tương ứng ${M('x=30^\\circ t')}): nghiệm ${M(famsTex(fam))}. Nghiệm dương nhỏ nhất ứng với ${M(`t=${t0}`)}.`) + p(`Đáp số: ${M(t0)} giờ.`)}; }
    const n = roots(fam, 0, 720, true).length; if (CHK) CHK.push({type: 'tide', A, H, level, ans: n});
    return {q: `Mực nước (mét) ở một cảng tại thời điểm ${M('t')} giờ là ${M(`h(t)=${A}\\sin\\dfrac{\\pi t}{6}+${H}`)}. Trong khoảng ${M('0\\le t\\lt24')}, có bao nhiêu thời điểm mực nước đạt ${level} m?`, ans: String(n), sol: p(`${M(`h(t)=${level}`)} ⇔ ${M(`\\sin\\dfrac{\\pi t}{6}=${ct}`)}.`) + p(`Với ${M('0\\le t\\lt24')} thì ${M('x=\\dfrac{\\pi t}{6}')} chạy trên ${M('[0;\\,4\\pi)')} (hai chu kì). Đếm nghiệm của ${M(`\\sin x=${ct}`)}: ${M(n)} nghiệm.`) + p(`Đáp số: ${M(n)}.`)}; } throw new Error('shTide'); };

  /* ================= GHÉP 5 BÀI ================= */
  const L = (n, i, f, ...a) => ci => f(R(n * 1013 + i * 41 + ci * 7 + 5), ci, ...a);
  const T = (n, title, mcs, tfs, shs) => StudentTest.add({grade: 'lop11', id: `tong-hop-${n}`, topic: 1, title, time: 20, counts: {mc: 8, tf: 2, short: 4}, mcPt: .5, tfPt: 1, shortPt: 1, codes: [`TH${n}A`, `TH${n}B`, `TH${n}C`, `TH${n}D`],
    mc: mcs.map((x, i) => L(n, i, x[0], x[1] || {})), tf: tfs.map((x, i) => L(n, 20 + i, x[0], x[1] || {})), short: shs.map((x, i) => L(n, 30 + i, x[0], x[1] || {}))});
  T(1, 'Test tổng hợp 1 – Hàm số lượng giác và phương trình lượng giác',
    [[B.conv, {toRad: true}], [B.sign], [B.exact], [B.domain, {simple: true}], [B.parity, {even: false}], [B.range, {min: false}], [B.solve, {simple: true, fns: ['sin']}], [B.noSol]],
    [[B.tfFacts], [B.tfEq, {fn: 'sin'}]], [[B.shCount], [B.shMinPos], [B.shRange, {diff: true}], [B.shParam, {}]]);
  T(2, 'Test tổng hợp 2 – Công thức lượng giác, hàm số và phương trình lượng giác',
    [[B.link, {k: 'sin'}], [B.same], [B.add], [B.dbl, {kind: 'sin'}], [B.period], [B.mono, {fn: 'sin', inc: true}], [B.solve, {simple: true, fns: ['cos']}], [B.solve, {compound: true, fns: ['sin', 'cos']}]],
    [[B.tfVal], [B.tfFun, {fn: 'sin'}]], [[B.shDbl, {kind: 'sin'}], [B.shSum], [B.shMinPos], [B.shTide, {}]]);
  T(3, 'Test tổng hợp 3 – Giá trị lượng giác, hàm số và phương trình lượng giác',
    [[B.arc], [B.sign], [B.prod], [B.domain, {fns: ['tan', 'cot']}], [B.parity, {even: true}], [B.range, {min: true}], [B.solve, {simple: true, fns: ['tan', 'cot']}], [B.noSol]],
    [[B.tfFacts], [B.tfEq, {fn: 'cos'}]], [[B.shCount], [B.shMinPos], [B.shParam, {range: true}], [B.shRange, {}]]);
  T(4, 'Test tổng hợp 4 – Biến đổi lượng giác và nghiệm của phương trình',
    [[B.conv, {toRad: false}], [B.exact], [B.link, {k: 'cos'}], [B.add], [B.dbl, {kind: 'cos'}], [B.mono, {fn: 'cos', inc: false}], [B.solve, {compound: true, fns: ['tan', 'cot']}], [B.domain, {fns: ['tan', 'cot']}]],
    [[B.tfVal], [B.tfFun, {fn: 'cos'}]], [[B.shDbl, {kind: 'cos'}], [B.shSum], [B.shCount], [B.shTide, {first: true}]]);
  T(5, 'Test tổng hợp 5 – Luyện chốt: dễ nhầm trong Chương I',
    [[B.same], [B.sign], [B.prod], [B.period], [B.range, {min: false}], [B.solve, {simple: true}], [B.solve, {compound: true}], [B.noSol]],
    [[B.tfFacts], [B.tfEq, {fn: 'sin'}]], [[B.shMinPos], [B.shParam, {}], [B.shSum], [B.shTide, {}]]);
})();
