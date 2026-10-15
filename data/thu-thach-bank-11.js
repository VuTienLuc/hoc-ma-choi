/* Ngân hàng Thử thách – TOÁN 11 (Chương I lượng giác, Chương II dãy số – cấp số cộng – cấp số nhân, Bài 8 mẫu số liệu ghép nhóm).
   12 mẫu trắc nghiệm · 3 mẫu đúng–sai · 5 mẫu trả lời ngắn. Xem data/thu-thach-core.js. Mỗi mẫu tự kiểm đáp án bằng vét cạn / số (H.chk). */
(() => {
  const A = (k, f) => TTB.add('lop11', k, f), M = x => `\\(${x}\\)`, PI = Math.PI, near = (a, b) => Math.abs(a - b) < 1e-9;
  const FN = {sin: Math.sin, cos: Math.cos, tan: Math.tan, cot: x => 1 / Math.tan(x)};

  /* nghiệm của f(kx)=c trong [lo, hi] (đơn vị π). inc: lấy cả hai đầu mút */
  const SPECIAL = {sin: [[0, '0'], [.5, '\\dfrac{1}{2}'], [-.5, '-\\dfrac{1}{2}'], [Math.SQRT2 / 2, '\\dfrac{\\sqrt{2}}{2}'], [Math.sqrt(3) / 2, '\\dfrac{\\sqrt{3}}{2}'], [-Math.sqrt(3) / 2, '-\\dfrac{\\sqrt{3}}{2}']],
    cos: [[0, '0'], [.5, '\\dfrac{1}{2}'], [-.5, '-\\dfrac{1}{2}'], [Math.SQRT2 / 2, '\\dfrac{\\sqrt{2}}{2}'], [Math.sqrt(3) / 2, '\\dfrac{\\sqrt{3}}{2}'], [-Math.sqrt(3) / 2, '-\\dfrac{\\sqrt{3}}{2}']]};
  const rootsOf = (fn, k, c, lo, hi) => {          // x ∈ [lo·π, hi·π], f(kx)=c  → danh sách x/π
    const al = (fn === 'sin' ? Math.asin(c) : Math.acos(c)) / PI, fam = fn === 'sin' ? [[al, 2], [1 - al, 2]] : [[al, 2], [-al, 2]], out = [];
    for (let n = -60; n <= 60; n++) fam.forEach(([o, per]) => { const x = (o + per * n) / k; if (x >= lo - 1e-9 && x <= hi + 1e-9) out.push(x); });
    const u = []; out.sort((p, q) => p - q).forEach(x => { if (!u.length || x - u[u.length - 1] > 1e-9) u.push(x); }); return u;
  };
  const eqTex = (fn, k, c) => `\\${fn}${k === 1 ? '' : k}x=${c}`.replace(/\\(sin|cos)(\d)x/, '\\$1\\ $2x');

  /* ===================== TRẮC NGHIỆM ===================== */
  // 1. Chu kì của hàm số lượng giác (tan, cot: π/|a|; sin, cos: 2π/|a|)
  A('mc', (r, H) => { const fn = H.pick(r, ['sin', 'cos', 'tan', 'cot']), a = H.pick(r, [-3, -2, 2, 3, 4, 5]), b = H.pick(r, [[1, 3], [1, 4], [1, 6], [-1, 4], [-1, 3]]), c = H.pick(r, [0, 1, -2]), A_ = Math.abs(a);
    const per = fn === 'tan' || fn === 'cot' ? 1 : 2, T = per * PI / A_, f = x => FN[fn](a * x + b[0] * PI / b[1]) + c;
    for (const x of [.13, .7, 1.9, 2.6]) H.chk(near(f(x + T), f(x)) && !near(f(x + T / 2), f(x)), 'chu kì');
    const ok = H.piT(per, A_), wr = [H.piT(per === 1 ? 2 : 1, A_), H.piT(per, 1), H.piT(per * A_, 1), H.piT(per, A_ * 2)].filter(x => x !== ok);
    return H.mc('Thông hiểu', `Chu kì tuần hoàn nhỏ nhất của hàm số ${M(`y=\\${fn}\\left(${a}x${b[0] < 0 ? '-' : '+'}${H.piT(1, b[1])}\\right)${c === 0 ? '' : c > 0 ? '+' + c : c}`)} là`, M(ok), wr.map(M),
      H.p(`Hàm ${M(`y=\\${fn}(ax+b)`)} tuần hoàn với chu kì ${M(fn === 'tan' || fn === 'cot' ? '\\dfrac{\\pi}{|a|}' : '\\dfrac{2\\pi}{|a|}')}. Chú ý: ${fn === 'tan' || fn === 'cot' ? 'tan và cot có chu kì ' + M('\\pi') + ' (không phải ' + M('2\\pi') + ')' : 'sin và cos có chu kì ' + M('2\\pi')}; số hạng tự do ${M('c')} và góc lệch ${M('b')} không đổi chu kì; ${M('|a|')} lấy giá trị tuyệt đối.`) + H.p(`Ở đây ${M(`|a|=${A_}`)} nên chu kì là ${M(ok)}.`));
  });

  // 2. Tập xác định của y = tan(ax + b)
  A('mc', (r, H) => { const a = H.pick(r, [2, 3, 4]), [bn, bd] = H.pick(r, [[1, 3], [1, 4], [1, 6], [-1, 6], [-1, 4], [1, 12], [-1, 3]]), beta = bn / bd, x0 = (0.5 - beta) / a, [xn, xd] = H.frac(Math.round((0.5 - beta) * 1000 * 12), a * 1000 * 12);
    for (let k = -3; k <= 3; k++) H.chk(Math.abs(Math.cos(a * (x0 + k / a) * PI + beta * PI)) < 1e-9, 'tan xác định');
    const set = (n, d, den) => `\\mathbb{R}\\setminus\\left\\{${H.piT(n, d)}+${den === 1 ? 'k\\pi' : `\\dfrac{k\\pi}{${den}}`}\\ \\middle|\\ k\\in\\mathbb{Z}\\right\\}`;
    const ok = set(xn, xd, a), w1 = set(xn, xd, 1), [sn, sd] = H.frac(Math.round((0.5 + beta) * 1000 * 12), a * 1000 * 12), w2 = set(sn, sd, a), [tn, td] = H.frac(Math.round((0.5 - beta) * 12), 12), w3 = set(tn, td, a), w4 = set(xn, xd, a * 2);
    return H.mc('Vận dụng', `Tập xác định của hàm số ${M(`y=\\tan\\left(${a}x${bn < 0 ? '-' : '+'}${H.piT(Math.abs(bn), bd)}\\right)`)} là`, M(ok), [w1, w2, w3, w4].filter(x => x !== ok).map(M),
      H.p(`Hàm số xác định khi ${M(`\\cos\\left(${a}x${bn < 0 ? '-' : '+'}${H.piT(Math.abs(bn), bd)}\\right)\\ne0`)}, tức ${M(`${a}x${bn < 0 ? '-' : '+'}${H.piT(Math.abs(bn), bd)}\\ne\\dfrac{\\pi}{2}+k\\pi`)}.`) + H.p(`Chuyển vế rồi <b>chia cả hai vế cho ${a}</b> (kể cả phần ${M('k\\pi')}): ${M(`x\\ne${H.piT(xn, xd)}+\\dfrac{k\\pi}{${a}}`)}.`));
  });

  // 3. Giá trị lớn nhất, nhỏ nhất của y = m + n·sin(kx)
  A('mc', (r, H) => { const m = H.pick(r, [-3, -2, -1, 1, 2, 3]), n = H.pick(r, [-4, -3, -2, 2, 3, 4]), k = H.pick(r, [1, 2, 3]), isMax = H.ri(r, 0, 1) === 1, fn = H.pick(r, ['sin', 'cos']);
    let mx = -1e9, mn = 1e9; for (let i = 0; i <= 20000; i++) { const y = m + n * FN[fn](i * 2 * PI / 20000 * 3); mx = Math.max(mx, y); mn = Math.min(mn, y); }
    const best = isMax ? Math.round(mx) : Math.round(mn); H.chk(near(mx, Math.abs(n) + m) || Math.abs(mx - (Math.abs(n) + m)) < 1e-6, 'max'); H.chk(Math.abs(mn - (m - Math.abs(n))) < 1e-6, 'min');
    const wr = [m + n, m - n, m + (isMax ? -Math.abs(n) : Math.abs(n)), Math.abs(n), Math.abs(m) + Math.abs(n)].filter(x => x !== best);
    const wrOpt = isMax ? [m + n, m - n, Math.abs(n)] : [m + n, m - n, Math.abs(n)];
    return H.mc('Vận dụng', `Giá trị ${isMax ? 'lớn' : 'nhỏ'} nhất của hàm số ${M(`y=${m}${n < 0 ? '-' : '+'}${Math.abs(n)}\\${fn}${k === 1 ? '' : '\\ ' + k}x`)} là`, String(best), [...new Set([m + n, m - n, Math.abs(n), m + (isMax ? -Math.abs(n) : Math.abs(n)), m * n])].filter(x => x !== best).map(String),
      H.p(`${M('-1\\le\\' + fn + '\\ ' + (k === 1 ? '' : k) + 'x\\le1')} nên ${M(`${m}-${Math.abs(n)}\\le y\\le ${m}+${Math.abs(n)}`)}, tức ${M(`${m - Math.abs(n)}\\le y\\le ${m + Math.abs(n)}`)}.`) + H.p(`Dấu của ${M(n < 0 ? 'n=' + n : 'n')} chỉ làm đổi vị trí đạt max/min, không đổi khoảng giá trị. ${isMax ? 'Giá trị lớn nhất' : 'Giá trị nhỏ nhất'} là <b>${best}</b>.`));
  });

  // 4. Số nghiệm của f(kx)=c trong một đoạn
  A('mc', (r, H) => { for (let t = 0; t < 200; t++) {
    const fn = H.pick(r, ['sin', 'cos']), k = H.pick(r, [2, 3]), [c, ct] = H.pick(r, SPECIAL[fn].filter(x => x[0] !== 0)), rng = H.pick(r, [[0, 2, '[0;\\,2\\pi]'], [-1, 1, '[-\\pi;\\,\\pi]'], [0, 1, '[0;\\,\\pi]']]), xs = rootsOf(fn, k, c, rng[0], rng[1]);
    xs.forEach(x => H.chk(near(FN[fn](k * x * PI), c), 'nghiệm')); const n = xs.length; if (n < 3) continue;
    const ok = String(n), wr = [n + 1, n - 1, Math.ceil(n / 2), 2 * n, n + 2].map(String).filter(x => x !== ok);
    return H.mc('Vận dụng', `Số nghiệm của phương trình ${M(`\\${fn}\\ ${k}x=${ct}`)} trong đoạn ${M(rng[2])} là`, ok, wr,
      H.p(`Giải ${M(`\\${fn}\\ u=${ct}`)} với ${M(`u=${k}x`)}, rồi chia hai vế cho ${k}. Vì ${M(`x\\in${rng[2]}`)} nên ${M(`u=${k}x`)} chạy trên đoạn dài gấp ${k} lần: có nhiều vòng hơn.`) + H.p(`Lấy hai họ nghiệm và cho ${M('k')} nguyên thích hợp, được các nghiệm ${xs.map(x => M(H.piT(Math.round(x * 1200), 1200))).join('; ')}. Có <b>${n}</b> nghiệm.`));
  } throw new Error('mc4'); });

  // 5. cos(mx) = cos(x + b): hai họ nghiệm
  A('mc', (r, H) => { const m = H.pick(r, [2, 3]), [bn, bd] = H.pick(r, [[1, 3], [1, 4], [1, 6], [1, 2], [2, 3]]), b = bn / bd;
    // (m−1)x = b + 2πk ;  (m+1)x = −b + 2πk
    const f1 = H.piT(bn, bd * (m - 1)), s1 = H.piT(2, m - 1), f2 = H.piT(-bn, bd * (m + 1)), s2 = H.piT(2, m + 1), fam = (a, s) => `x=${a}+k${s}`;
    const good = [[bn / bd / (m - 1), 2 / (m - 1)], [-bn / bd / (m + 1), 2 / (m + 1)]];
    for (let k = -3; k <= 3; k++) good.forEach(([o, p]) => { const x = (o + p * k) * PI; H.chk(near(Math.cos(m * x), Math.cos(x + b * PI)), 'cos=cos'); });
    const ok = `${M(`x=${f1}+k${s1}`)} hoặc ${M(`x=${f2}+k${s2}`)}`;
    const mk = (a1, p1, a2, p2) => `${M(`x=${a1}+k${p1}`)} hoặc ${M(`x=${a2}+k${p2}`)}`;
    const w = [mk(f1, s1, H.piT(bn, bd * (m + 1)), s2), mk(f1, H.piT(2, 1), f2, s2), mk(H.piT(bn, bd), H.piT(2, 1), f2, s2), mk(f1, s1, f2, H.piT(2, 1))];
    const okFam = [good[0], good[1]];
    // mọi phương án sai phải sai thật (có k làm phương trình không thoả)
    const parse = (a1, p1, a2, p2) => [[a1, p1], [a2, p2]];
    return H.mc('Vận dụng', `Nghiệm của phương trình ${M(`\\cos ${m}x=\\cos\\left(x+${H.piT(bn, bd)}\\right)`)} là`, ok, w.filter(x => x !== ok),
      H.p(`${M('\\cos u=\\cos v')} khi ${M('u=v+k2\\pi')} hoặc ${M('u=-v+k2\\pi')}.`) + H.p(`${M(`${m}x=x+${H.piT(bn, bd)}+k2\\pi`)} cho ${M(`x=${f1}+k${s1}`)}; ${M(`${m}x=-x-${H.piT(bn, bd)}+k2\\pi`)} cho ${M(`${m + 1}x=-${H.piT(bn, bd)}+k2\\pi`)}, tức ${M(`x=${f2}+k${s2}`)}.`) + H.p(`Chú ý: phải <b>chia cả ${M('k2\\pi')}</b> cho hệ số của ${M('x')}.`));
  });

  // 6. Đếm số hạng âm của dãy u_n = (n − r1)(n − r2)
  A('mc', (r, H) => { const r1 = H.ri(r, 1, 5), r2 = r1 + H.ri(r, 3, 8), p = r1 + r2, q = r1 * r2; let c = 0; for (let n = 1; n <= 200; n++) if (n * n - p * n + q < 0) c++; H.chk(c === r2 - r1 - 1, 'số hạng âm');
    const ok = String(c), wr = [r2 - r1, r2 - r1 + 1, r2 - 1, r2 - r1 - 2, r2].map(String).filter(x => x !== ok);
    return H.mc('Vận dụng', `Cho dãy số ${M(`(u_n)`)} với ${M(`u_n=n^2-${p}n+${q}`)}. Dãy có bao nhiêu số hạng âm?`, ok, wr,
      H.p(`${M(`u_n=(n-${r1})(n-${r2})`)}. Dãy âm khi ${M(`${r1}\\lt n\\lt ${r2}`)} (hai nghiệm ${M(`n=${r1}`)}, ${M(`n=${r2}`)} cho số hạng bằng ${M('0')}, <b>không</b> âm).`) + H.p(`Các số tự nhiên ${M('n')}: ${[...Array(r2 - r1 - 1)].map((_, i) => r1 + 1 + i).join('; ')}. Có <b>${c}</b> số hạng âm.`));
  });

  // 7. Tính đơn điệu và bị chặn của u_n = (an+b)/(cn+d)
  A('mc', (r, H) => { for (let t = 0; t < 100; t++) {
    const a = H.ri(r, 1, 6), b = H.ri(r, 1, 9), c = H.ri(r, 1, 4), d = H.ri(r, 1, 9), det = a * d - b * c; if (det === 0) continue;
    const u = n => (a * n + b) / (c * n + d); let inc = true, dec = true; for (let n = 1; n < 300; n++) { if (!(u(n + 1) > u(n))) inc = false; if (!(u(n + 1) < u(n))) dec = false; }
    H.chk(inc === (det > 0) && dec === (det < 0), 'đơn điệu');
    const O = ['Dãy số tăng và bị chặn', 'Dãy số giảm và bị chặn', 'Dãy số tăng và không bị chặn trên', 'Dãy số giảm và không bị chặn dưới'], ans = inc ? O[0] : O[1];
    return H.mc('Vận dụng', `Cho dãy số ${M('(u_n)')} với ${M(`u_n=\\dfrac{${a}n+${b}}{${c === 1 ? '' : c}n+${d}}`)}. Khẳng định nào sau đây đúng?`, ans, O.filter(x => x !== ans),
      H.p(`${M(`u_{n+1}-u_n=\\dfrac{(${a}d-${b}c)}{(c(n+1)+d)(cn+d)}`.replace('(' + a + 'd-' + b + 'c)', `${a}\\cdot ${d}-${b}\\cdot ${c}`).replace(/c\(n\+1\)\+d\)\(cn\+d\)/, `${c}(n+1)+${d})(${c}n+${d})`))}: tử số ${M(`=${det}`)} ${det > 0 ? 'dương' : 'âm'}, mẫu số dương, nên dãy ${inc ? 'tăng' : 'giảm'}.`) + H.p(`Dãy bị chặn: mọi số hạng nằm giữa ${M(`u_1=${H.fr(a + b, c + d)}`)} và ${M(`\\dfrac{${a}}{${c}}`)} (giá trị mà dãy tiến tới). Vậy <b>${ans}</b>.`));
  } throw new Error('mc7'); });

  // 8. Cấp số cộng: biết hai số hạng, tìm số hạng khác
  A('mc', (r, H) => { for (let t = 0; t < 100; t++) {
    const d = H.pick(r, [-4, -3, -2, 2, 3, 4, 5]), u1 = H.ri(r, -8, 12), p = H.ri(r, 2, 5), q = p + H.ri(r, 3, 6), n = q + H.ri(r, 5, 12), up = u1 + (p - 1) * d, uq = u1 + (q - 1) * d, ans = u1 + (n - 1) * d;
    const wr = [up + (n - p + 1) * d, up + (n - p - 1) * d, uq + (n - p) * d, u1 + n * d].filter(x => x !== ans); if (new Set(wr).size < 3) continue;
    return H.mc('Thông hiểu', `Cấp số cộng ${M('(u_n)')} có ${M(`u_{${p}}=${up}`)} và ${M(`u_{${q}}=${uq}`)}. Số hạng ${M(`u_{${n}}`)} bằng`, String(ans), wr.map(String),
      H.p(`${M(`u_{${q}}-u_{${p}}=${q - p}d`)} nên ${M(`d=\\dfrac{${uq}-(${up})}{${q - p}}=${d}`)} (chia cho hiệu hai <b>chỉ số</b> ${M(`${q}-${p}`)}).`) + H.p(`${M(`u_{${n}}=u_{${p}}+(${n}-${p})d=${up}+${n - p}\\cdot(${d})=${ans}`)}.`));
  } throw new Error('mc8'); });

  // 9. Cấp số cộng: tổng các số hạng từ u_p đến u_q
  A('mc', (r, H) => { for (let t = 0; t < 100; t++) {
    const d = H.pick(r, [2, 3, 4, 5, -2, -3]), u1 = H.ri(r, 1, 20), p = H.ri(r, 3, 8), q = p + H.ri(r, 5, 12); let S = 0; for (let i = p; i <= q; i++) S += u1 + (i - 1) * d;
    const up = u1 + (p - 1) * d, uq = u1 + (q - 1) * d, Sq = q * (2 * u1 + (q - 1) * d) / 2, Sp = p * (2 * u1 + (p - 1) * d) / 2, ok = String(S); H.chk(S === (q - p + 1) * (up + uq) / 2 && S === Sq - (p - 1) * (2 * u1 + (p - 2) * d) / 2, 'tổng đoạn');
    const wr = [(q - p) * (up + uq) / 2, Sq - Sp, (q - p + 1) * (u1 + uq) / 2, (q - p + 1) * (up + uq)].map(String).filter(x => x !== ok); if (new Set(wr).size < 3) continue;
    return H.mc('Vận dụng', `Cấp số cộng ${M('(u_n)')} có ${M(`u_1=${u1}`)} và công sai ${M(`d=${d}`)}. Tổng ${M(`u_{${p}}+u_{${p + 1}}+\\cdots+u_{${q}}`)} bằng`, ok, wr,
      H.p(`Từ ${M(`u_{${p}}`)} đến ${M(`u_{${q}}`)} có ${M(`${q}-${p}+1=${q - p + 1}`)} số hạng (cộng thêm 1).`) + H.p(`${M(`u_{${p}}=${up}`)}, ${M(`u_{${q}}=${uq}`)}; tổng ${M(`=\\dfrac{${q - p + 1}(${up}+${uq})}{2}=${S}`)}.`));
  } throw new Error('mc9'); });

  // 10. Cấp số nhân: hai giá trị của công bội
  A('mc', (r, H) => { const k = H.ri(r, 2, 5), a = H.pick(r, [1, 2, 3, -1, -2, -3]), b = a * k * k;
    // u_2 = a, u_4 = b → q^2 = k^2, q = ±k ; mỗi trường hợp đều thoả
    [k, -k].forEach(q => { const u1 = a / q, u4 = u1 * q ** 3; H.chk(near(u4, b) && near(u1 * q, a), 'CSN q'); });
    const ok = `${M(`q=${k}`)} hoặc ${M(`q=-${k}`)}`, wr = [`${M(`q=${k}`)}`, `${M(`q=-${k}`)}`, `${M(`q=${k * k}`)} hoặc ${M(`q=-${k * k}`)}`];
    return H.mc('Vận dụng', `Cấp số nhân ${M('(u_n)')} có ${M(`u_2=${a}`)} và ${M(`u_4=${b}`)}. Công bội ${M('q')} của cấp số nhân đó là`, ok, wr,
      H.p(`${M(`\\dfrac{u_4}{u_2}=q^2`)} nên ${M(`q^2=\\dfrac{${b}}{${a}}=${k * k}`)}, suy ra ${M(`q=\\pm${k}`)}.`) + H.p(`Cả hai giá trị đều thoả (với ${M(`q=${k}`)}: ${M(`u_1=${H.fr(a, k)}`)}; với ${M(`q=-${k}`)}: ${M(`u_1=${H.fr(a, -k)}`)}). Không được bỏ nghiệm âm.`));
  });

  // 11. Cấp số nhân: tổng n số hạng đầu khi q âm
  A('mc', (r, H) => { const u1 = H.pick(r, [1, 2, 3, -1, -2]), q = H.pick(r, [-2, -3]), n = H.ri(r, 4, 7); let S = 0; for (let i = 0; i < n; i++) S += u1 * q ** i; const f = u1 * (1 - q ** n) / (1 - q); H.chk(near(S, f), 'S_n');
    const un = u1 * q ** (n - 1), wr = [u1 * (1 - Math.abs(q) ** n) / (1 - Math.abs(q)), -S, u1 * (1 - q ** n) / (1 + q), S - un * 2, un].filter(x => Number.isInteger(x) && x !== S);
    if (new Set(wr).size < 3) throw new Error('nhiễu');
    return H.mc('Vận dụng', `Cấp số nhân ${M('(u_n)')} có ${M(`u_1=${u1}`)} và công bội ${M(`q=${q}`)}. Tổng ${n} số hạng đầu bằng`, String(S), [...new Set(wr)].map(String),
      H.p(`${M(`S_n=u_1\\cdot\\dfrac{1-q^n}{1-q}`)} với ${M(`q=${q}`)}: ${M(`q^{${n}}=(${q})^{${n}}=${q ** n}`)} (đặt ${M(q)} trong ngoặc; số mũ ${n} ${n % 2 ? 'lẻ nên giữ dấu âm' : 'chẵn nên dương'}).`) + H.p(`${M(`S_{${n}}=${u1}\\cdot\\dfrac{1-(${q ** n})}{1-(${q})}=${S}`)}.`));
  });

  // 12. Lãi kép: số năm tối thiểu
  A('mc', (r, H) => { for (let t = 0; t < 100; t++) {
    const P = H.pick(r, [50, 80, 100, 120, 200]), rate = H.pick(r, [6, 7, 8, 10, 12]), mult = H.pick(r, [1.5, 2, 2.5]), B = P * mult; let n = 0, v = P; while (v < B) { v *= 1 + rate / 100; n++; if (n > 60) break; }
    if (n < 4 || n > 16) continue; H.chk(P * (1 + rate / 100) ** n >= B && P * (1 + rate / 100) ** (n - 1) < B, 'lãi kép');
    const simple = Math.ceil((B - P) / (P * rate / 100)), wr = [n - 1, n + 1, simple, n + 2].filter(x => x !== n); if (new Set(wr).size < 3) continue;
    return H.mc('Vận dụng', `Gửi ${P} triệu đồng vào ngân hàng với lãi suất ${rate}%/năm, lãi nhập gốc sau mỗi năm. Sau ít nhất bao nhiêu năm thì số tiền cả gốc lẫn lãi đạt từ ${B} triệu đồng trở lên?`, `${n} năm`, wr.map(x => `${x} năm`),
      H.p(`Số tiền sau ${M('n')} năm lập cấp số nhân: ${M(`A_n=${P}\\cdot(1+${rate / 100})^n=${P}\\cdot${(1 + rate / 100).toFixed(2).replace(/0$/, '')}^n`)} (lãi <b>nhập gốc</b>: nhân, không cộng thêm lãi đơn).`) + H.p(`${M(`A_{${n - 1}}\\approx${(P * (1 + rate / 100) ** (n - 1)).toFixed(2)}\\lt ${B}`)} còn ${M(`A_{${n}}\\approx${(P * (1 + rate / 100) ** n).toFixed(2)}\\ge ${B}`)}. Vậy cần ít nhất <b>${n} năm</b>.`));
  } throw new Error('mc12'); });

  /* ===================== ĐÚNG – SAI ===================== */
  // 1. y = m + n sin(kx)
  A('tf', (r, H) => { const m = H.pick(r, [-2, -1, 1, 2, 3]), n = H.pick(r, [-3, -2, 2, 3, 4]), k = H.pick(r, [2, 3]), w = H.pat(r), M_ = Math.abs(n) + m, mn = m - Math.abs(n), f = x => m + n * Math.sin(k * x);
    H.chk(near(f(PI / (2 * k)), m + n) && near(f(PI / k), m), 'giá trị');
    return H.tf(`Cho hàm số ${M(`y=${m}${n < 0 ? '-' : '+'}${Math.abs(n)}\\sin ${k}x`)}. Xét tính đúng – sai của các khẳng định sau:`, [
      H.claim(w[0], `Hàm số tuần hoàn với chu kì ${M(H.piT(2, k))}.`, `Hàm số tuần hoàn với chu kì ${M(H.piT(1, k))}.`, H.p(`Chu kì của ${M(`\\sin kx`)} là ${M('\\dfrac{2\\pi}{|k|}')} = ${M(H.piT(2, k))}.`)),
      H.claim(w[1], `Giá trị lớn nhất của hàm số là ${M(M_)}.`, `Giá trị lớn nhất của hàm số là ${M(m + n)}.`.replace(`${m + n}`, `${m + Math.abs(n) === m + n ? M_ + 1 : m + n}`), H.p(`${M(`-${Math.abs(n)}\\le ${n}\\sin ${k}x\\le ${Math.abs(n)}`)}; giá trị lớn nhất là ${M(`${m}+${Math.abs(n)}=${M_}`)}.`)),
      H.claim(w[2], `Giá trị nhỏ nhất của hàm số là ${M(mn)}.`, `Giá trị nhỏ nhất của hàm số là ${M(mn + 1)}.`, H.p(`Giá trị nhỏ nhất là ${M(`${m}-${Math.abs(n)}=${mn}`)}.`)),
      H.claim(w[3], `Đồ thị hàm số đi qua điểm ${M(`\\left(${H.piT(1, 2 * k)};\\,${m + n}\\right)`)}.`, `Đồ thị hàm số đi qua điểm ${M(`\\left(${H.piT(1, 2 * k)};\\,${m - n}\\right)`)}.`, H.p(`Với ${M(`x=${H.piT(1, 2 * k)}`)}: ${M(`\\sin ${k}x=\\sin\\dfrac{\\pi}{2}=1`)} nên ${M(`y=${m}+${n}\\cdot1=${m + n}`)}.`))]);
  });
  // 2. Cấp số cộng
  A('tf', (r, H) => { for (let t = 0; t < 100; t++) {
    const u1 = H.ri(r, -9, 15), d = H.pick(r, [-4, -3, -2, 2, 3, 4, 5]), w = H.pat(r), k = H.ri(r, 8, 15), uk = u1 + (k - 1) * d, Sk = k * (2 * u1 + (k - 1) * d) / 2, tgt = u1 + H.ri(r, 12, 30) * d, inSeq = true, notIn = tgt + (Math.abs(d) > 1 ? 1 : 0), isIn = x => (x - u1) % d === 0 && (x - u1) / d + 1 >= 1;
    if (isIn(notIn) || !isIn(tgt)) continue;
    return H.tf(`Cho cấp số cộng ${M('(u_n)')} có ${M(`u_1=${u1}`)} và công sai ${M(`d=${d}`)}. Xét tính đúng – sai của các khẳng định sau:`, [
      H.claim(w[0], `${M(`u_{${k}}=${uk}`)}.`, `${M(`u_{${k}}=${uk + d}`)}.`, H.p(`${M(`u_{${k}}=u_1+(${k}-1)d=${u1}+${k - 1}\\cdot(${d})=${uk}`)}.`)),
      H.claim(w[1], `Tổng ${k} số hạng đầu bằng ${M(Sk)}.`, `Tổng ${k} số hạng đầu bằng ${M(Sk + d)}.`, H.p(`${M(`S_{${k}}=\\dfrac{${k}(${u1}+${uk})}{2}=${Sk}`)}.`)),
      H.claim(w[2], `Dãy số ${M('(u_n)')} là dãy số ${d > 0 ? 'tăng' : 'giảm'}.`, `Dãy số ${M('(u_n)')} là dãy số ${d > 0 ? 'giảm' : 'tăng'}.`, H.p(`Công sai ${M(`d=${d}`)} ${d > 0 ? 'dương' : 'âm'} nên dãy ${d > 0 ? 'tăng' : 'giảm'}.`)),
      H.claim(w[3], `Số ${M(tgt)} là một số hạng của dãy.`, `Số ${M(notIn)} là một số hạng của dãy.`, H.p(w[3] ? `${M(`${tgt}=${u1}+(n-1)(${d})`)} cho ${M(`n=${(tgt - u1) / d + 1}`)} là số nguyên dương.` : `${M(`${notIn}=${u1}+(n-1)(${d})`)} cho ${M(`n-1=\\dfrac{${notIn - u1}}{${d}}`)} không phải số nguyên.`))]);
  } throw new Error('tf2'); });
  // 3. Cấp số nhân với công bội âm
  A('tf', (r, H) => { const u1 = H.pick(r, [1, 2, 3, -1, -2]), q = H.pick(r, [-3, -2, 2, 3]), w = H.pat(r), n = H.ri(r, 4, 6), un = u1 * q ** (n - 1); let S = 0; for (let i = 0; i < n; i++) S += u1 * q ** i;
    let mono = true, mono2 = true; for (let i = 1; i < 10; i++) { if (!(u1 * q ** i > u1 * q ** (i - 1))) mono = false; if (!(u1 * q ** i < u1 * q ** (i - 1))) mono2 = false; } const monotone = mono || mono2;
    return H.tf(`Cho cấp số nhân ${M('(u_n)')} có ${M(`u_1=${u1}`)} và công bội ${M(`q=${q}`)}. Xét tính đúng – sai của các khẳng định sau:`, [
      H.claim(w[0], `${M(`u_{${n}}=${un}`)}.`, `${M(`u_{${n}}=${u1 * q ** n}`)}.`, H.p(`${M(`u_{${n}}=u_1q^{${n}-1}=${u1}\\cdot(${q})^{${n - 1}}=${un}`)} (số mũ là ${M(`n-1`)}).`)),
      H.claim(w[1], `Tổng ${n} số hạng đầu bằng ${M(S)}.`, `Tổng ${n} số hạng đầu bằng ${M(-S)}.`.replace(String(-S), String(S === 0 ? 1 : -S)), H.p(`${M(`S_{${n}}=${u1}\\cdot\\dfrac{1-(${q})^{${n}}}{1-(${q})}=${S}`)}.`)),
      H.claim(!monotone, `Dãy số ${M('(u_n)')} không phải là dãy số tăng, cũng không phải dãy số giảm.`, `Dãy số ${M('(u_n)')} không phải là dãy số tăng, cũng không phải dãy số giảm.`, H.p(q < 0 ? `Công bội âm nên các số hạng đổi dấu xen kẽ: dãy không đơn điệu.` : `${M(`q=${q}\\gt1`)} và ${M(`u_1${u1 > 0 ? '\\gt' : '\\lt'}0`)}: dãy ${u1 > 0 ? 'tăng' : 'giảm'} (đơn điệu).`)),
      H.claim(w[3], `Số hạng tổng quát là ${M(`u_n=${u1}\\cdot(${q})^{n-1}`)}.`, `Số hạng tổng quát là ${M(`u_n=${u1}\\cdot(${q})^{n}`)}.`, H.p(`Số mũ của ${M('q')} là ${M('n-1')}.`))]);
  });

  /* ===================== TRẢ LỜI NGẮN ===================== */
  // 1. Số nghiệm của phương trình trong nửa khoảng (có tan)
  A('sh', (r, H) => { for (let t = 0; t < 200; t++) {
    const fn = H.pick(r, ['sin', 'cos']), k = H.pick(r, [2, 3, 4]), [c, ct] = H.pick(r, SPECIAL[fn].filter(x => Math.abs(x[0]) < 1)), lo = H.pick(r, [0, -1]), hi = lo + 2, xs = rootsOf(fn, k, c, lo, hi).filter(x => Math.abs(x - hi) > 1e-9); const n = xs.length; if (n < 4 || n > 16) continue;
    xs.forEach(x => H.chk(near(FN[fn](k * x * PI), c), 'nghiệm'));
    return H.sh(`Phương trình ${M(`\\${fn}\\ ${k}x=${ct}`)} có bao nhiêu nghiệm thuộc nửa khoảng ${M(`[${lo === 0 ? '0' : '-2\\pi'};\\,${lo === 0 ? '2\\pi' : '0'})`.replace('-2\\pi', '-\\pi').replace(/2\\pi\)/, '2\\pi)'))}?`.replace('[-\\pi;\\,0)', '[-2\\pi;\\,0)'), n,
      H.p(`${M(`\\${fn}\\ u=${ct}`)} có hai họ nghiệm; với ${M(`u=${k}x`)} và ${M('x')} chạy trên một đoạn dài ${M('2\\pi')}, ${M('u')} chạy trên đoạn dài ${M(`${k}\\cdot 2\\pi`)}: mỗi họ cho ${k} nghiệm.`) + H.p(`Tổng cộng ${M(`2\\cdot ${k}=${n}`)} nghiệm (đầu mút phải bị loại không là nghiệm). Đáp số: <b>${n}</b>.`));
  } throw new Error('sh1'); });
  // 2. Tìm n để S_n = S (cấp số cộng)
  A('sh', (r, H) => { const u1 = H.pick(r, [2, 3, 5, 7, 4]), d = H.pick(r, [2, 3, 4, 6]), n = H.ri(r, 8, 20), S = n * (2 * u1 + (n - 1) * d) / 2; let found = []; for (let m = 1; m <= 200; m++) if (m * (2 * u1 + (m - 1) * d) / 2 === S) found.push(m); H.chk(found.length === 1 && found[0] === n, 'n duy nhất');
    const D = (2 * u1 - d) ** 2 + 8 * d * S;
    return H.sh(`Cấp số cộng ${M('(u_n)')} có ${M(`u_1=${u1}`)}, công sai ${M(`d=${d}`)}. Tổng ${M('n')} số hạng đầu bằng ${M(S)}. Tìm ${M('n')}.`, n,
      H.p(`${M(`S_n=\\dfrac{n[2\\cdot ${u1}+(n-1)${d}]}{2}=${S}`)} cho ${M(`${d}n^2+${2 * u1 - d}n-${2 * S}=0`)}.`) + H.p(`Phương trình có hai nghiệm, một nghiệm âm (loại vì ${M('n')} nguyên dương); nghiệm dương là ${M(`n=${n}`)}. Đáp số: <b>${n}</b>.`));
  });
  // 3. Cấp số nhân: tìm vị trí của một số hạng
  A('sh', (r, H) => { const u1 = H.pick(r, [1, 2, 3, 5, -2]), q = H.pick(r, [2, 3, -2, -3]), n = H.ri(r, 5, 10), v = u1 * q ** (n - 1); let f = null; for (let m = 1; m <= 40; m++) if (u1 * q ** (m - 1) === v) f = m; H.chk(f === n && Math.abs(v) < 1e7, 'vị trí');
    return H.sh(`Cho cấp số nhân ${M('(u_n)')} có ${M(`u_1=${u1}`)} và công bội ${M(`q=${q}`)}. Số ${M(fmtN(v))} là số hạng thứ mấy của cấp số nhân đó?`, n,
      H.p(`${M(`u_n=${u1}\\cdot(${q})^{n-1}=${v}`)} cho ${M(`(${q})^{n-1}=${v / u1}`)}.`) + H.p(`${M(`${v / u1}=(${q})^{${n - 1}}`)} nên ${M(`n-1=${n - 1}`)}, tức ${M(`n=${n}`)}. Đáp số: <b>${n}</b>.`));
  });
  const fmtN = v => String(v).replace(/\B(?=(\d{3})+(?!\d))/g, '\\,');
  // 4. Mẫu số liệu ghép nhóm: tỉ lệ phần trăm nhỏ hơn một mốc
  A('sh', (r, H) => { for (let t = 0; t < 200; t++) {
    const n = H.pick(r, [20, 25, 40, 50]), f = (() => { for (let i = 0; i < 400; i++) { const x = [0, 1, 2, 3, 4].map(() => H.ri(r, 2, Math.floor(n / 3))); if (x.reduce((a, b) => a + b, 0) === n) return x; } return null; })(); if (!f) continue;
    const s = H.pick(r, [10, 20, 30, 40]), len = H.pick(r, [5, 10]), e = [0, 1, 2, 3, 4, 5].map(i => s + i * len), kk = H.ri(r, 2, 4), below = f.slice(0, kk).reduce((a, b) => a + b, 0), pct = below * 100 / n; if (!Number.isInteger(pct)) continue;
    const tab = `<table class="lk-table"><tr><th>Nhóm</th>${f.map((_, i) => `<th>${M(`[${e[i]};\\,${e[i + 1]})`)}</th>`).join('')}</tr><tr><td>Tần số</td>${f.map(x => `<td>${x}</td>`).join('')}</tr></table>`;
    return H.sh(`Bảng tần số ghép nhóm về thời gian tự học (phút) của ${n} học sinh:<br>${tab}Bao nhiêu phần trăm số học sinh có thời gian tự học <b>dưới ${e[kk]} phút</b>? (chỉ ghi số, không ghi dấu %)`, pct,
      H.p(`Dưới ${e[kk]} phút gồm các nhóm từ ${M(`[${e[0]};\\,${e[1]})`)} đến ${M(`[${e[kk - 1]};\\,${e[kk]})`)} (nhóm ${M(`[${e[kk]};\\,${e[kk + 1]})`)} bắt đầu đúng tại ${e[kk]} nên không tính).`) + H.p(`${M(f.slice(0, kk).join(' + ') + '=' + below)} học sinh; ${M(`\\dfrac{${below}}{${n}}\\cdot100\\%=${pct}\\%`)}. Đáp số: <b>${pct}</b>.`));
  } throw new Error('sh4'); });
  // 5. Toán thực tế: xếp ghế theo hàng (cấp số cộng)
  A('sh', (r, H) => { const a = H.ri(r, 8, 20), d = H.pick(r, [2, 3, 4]), n = H.ri(r, 10, 18), S = (() => { let s = 0; for (let i = 0; i < n; i++) s += a + i * d; return s; })(); H.chk(S === n * (2 * a + (n - 1) * d) / 2 && S < 10000, 'ghế');
    return H.sh(`Một hội trường có ${n} hàng ghế. Hàng thứ nhất có ${a} ghế, mỗi hàng sau nhiều hơn hàng liền trước ${d} ghế. Hội trường có tất cả bao nhiêu ghế?`, S,
      H.p(`Số ghế các hàng lập cấp số cộng ${M(`u_1=${a},\\ d=${d}`)}; hàng cuối ${M(`u_{${n}}=${a}+${n - 1}\\cdot ${d}=${a + (n - 1) * d}`)}.`) + H.p(`${M(`S_{${n}}=\\dfrac{${n}(${a}+${a + (n - 1) * d})}{2}=${S}`)}. Đáp số: <b>${S}</b>.`));
  });
})();
