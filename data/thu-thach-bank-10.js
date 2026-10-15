/* Ngân hàng Thử thách – TOÁN 10 (Chương I, II, III và Bài 12). Xem data/thu-thach-core.js.
   12 mẫu trắc nghiệm · 3 mẫu đúng–sai · 5 mẫu trả lời ngắn. Mỗi mẫu tự kiểm đáp án bằng vét cạn (H.chk). */
(() => {
  const A = (k, f) => TTB.add('lop10', k, f), M = x => `\\(${x}\\)`;
  const cnt = (n, f) => { let c = 0; for (let i = 0; i < n; i++) if (f(i)) c++; return c; };

  /* ---------- Khoảng: {l, r, lc, rc} ---------- */
  const inI = (x, I) => (x > I.l || (x === I.l && I.lc)) && (x < I.r || (x === I.r && I.rc));
  const iTex = I => `${I.lc ? '[' : '('}${I.l};\\,${I.r}${I.rc ? ']' : ')'}`;
  const ints = I => { const o = []; for (let x = -60; x <= 60; x++) if (inI(x, I)) o.push(x); return o; };
  const flip = (I, side) => side === 'l' ? {...I, lc: !I.lc} : {...I, rc: !I.rc};

  /* ===================== TRẮC NGHIỆM ===================== */
  // 1. Phủ định mệnh đề chứa kí hiệu ∀, ∃
  A('mc', (r, H) => {
    const ex = H.ri(r, 0, 1) === 1, op = H.pick(r, ['<', '>', '\\le', '\\ge']), neg = {'<': '\\ge', '>': '\\le', '\\le': '\\gt', '\\ge': '\\lt'}[op], a = H.ri(r, 2, 9);
    const pred = H.pick(r, [`x^2`, `2x+1`, `x^2+x`]), Q = e => e ? '\\exists' : '\\forall', fmt = (e, o) => M(`${Q(e)} x\\in\\mathbb{R},\\ ${pred}\\ ${o === '<' ? '\\lt' : o === '>' ? '\\gt' : o}\\ ${a}`);
    const opN = neg;
    return H.mc('Thông hiểu', `Cho mệnh đề ${M('P')}: «${fmt(ex, op)}». Mệnh đề phủ định của ${M('P')} là`, fmt(!ex, opN),
      [fmt(ex, opN), fmt(!ex, op), fmt(ex, op === '<' ? '\\gt' : op === '>' ? '\\lt' : op === '\\le' ? '\\ge' : '\\le')],
      H.p(`Phủ định đổi kí hiệu ${M(ex ? '\\exists' : '\\forall')} thành ${M(ex ? '\\forall' : '\\exists')} <b>và</b> phủ định phần điều kiện: ${M(op)} thành ${M(opN)}.`) + H.p(`Mệnh đề phủ định: ${fmt(!ex, opN)}.`));
  });

  // 2. Điều kiện cần, điều kiện đủ (chia hết)
  A('mc', (r, H) => {
    const L = [2, 3, 4, 6, 8, 9, 12]; let a, b; do { a = H.pick(r, L); b = H.pick(r, L); } while (a === b);
    const imp = (x, y) => { for (let n = 1; n <= 600; n++) if (n % x === 0 && n % y !== 0) return false; return true; };   // x ⇒ y
    const suf = imp(a, b), nec = imp(b, a), T = ['Điều kiện đủ nhưng không cần', 'Điều kiện cần nhưng không đủ', 'Điều kiện cần và đủ', 'Không là điều kiện cần, cũng không là điều kiện đủ'];
    const ans = suf && nec ? T[2] : suf ? T[0] : nec ? T[1] : T[3]; H.chk(!(suf && nec), 'a≠b');
    const why = suf ? `${M(`n \\vdots ${a}`)} thì ${M(`n \\vdots ${b}`)} (vì ${b} là ước của ${a}) nên ${M(`P\\Rightarrow Q`)} đúng` : `chọn ${M(`n=${(() => { for (let n = 1; n <= 600; n++) if (n % a === 0 && n % b !== 0) return n; })()}`)}: chia hết cho ${a} nhưng không chia hết cho ${b}, nên ${M(`P\\Rightarrow Q`)} sai`;
    const why2 = nec ? `ngược lại, ${M(`Q\\Rightarrow P`)} đúng` : `ngược lại, ${M(`Q\\Rightarrow P`)} sai (phản ví dụ ${M(`n=${(() => { for (let n = 1; n <= 600; n++) if (n % b === 0 && n % a !== 0) return n; })()}`)})`;
    return H.mc('Vận dụng', `Với ${M('n')} là số tự nhiên, xét ${M('P')}: «${M('n')} chia hết cho ${a}», ${M('Q')}: «${M('n')} chia hết cho ${b}». Phát biểu nào sau đây đúng?<br>«${M('P')} là ... để có ${M('Q')}»`, ans, T.filter(x => x !== ans),
      H.p(`${M('P')} là điều kiện <b>đủ</b> của ${M('Q')} khi ${M(`P\\Rightarrow Q`)} đúng; là điều kiện <b>cần</b> khi ${M(`Q\\Rightarrow P`)} đúng.`) + H.p(`Ở đây ${why}; ${why2}.`) + H.p(`Kết luận: <b>${ans}</b>.`));
  });

  // 3. Số số nguyên thuộc A ∩ B (đầu mút mở/đóng)
  A('mc', (r, H) => { for (let t = 0; t < 200; t++) {
    const a1 = H.ri(r, -6, 2), a2 = a1 + H.ri(r, 4, 9), b1 = H.ri(r, a1 - 1, a2 - 2), b2 = b1 + H.ri(r, 3, 9), I = {l: a1, r: a2, lc: !!H.ri(r, 0, 1), rc: !!H.ri(r, 0, 1)}, J = {l: b1, r: b2, lc: !!H.ri(r, 0, 1), rc: !!H.ri(r, 0, 1)};
    const both = x => inI(x, I) && inI(x, J), n = cnt(121, i => both(i - 60)); if (n < 2 || n > 9) continue;
    const alt = (x, y) => cnt(121, i => inI(i - 60, {...I, lc: x, rc: x}) && inI(i - 60, {...J, lc: y, rc: y}));    // lỗi: coi mọi đầu mút đều đóng / đều mở
    const wr = [n + 1, n - 1, alt(true, true), alt(false, false), ints(I).length].map(String); const ans = String(n);
    if (new Set([ans, ...wr.filter(w => w !== ans)]).size < 4) continue;
    return H.mc('Vận dụng', `Cho ${M(`A=${iTex(I)}`)} và ${M(`B=${iTex(J)}`)}. Số số nguyên thuộc ${M('A\\cap B')} là`, ans, wr,
      H.p(`${M('A\\cap B')} gồm các số thuộc cả hai khoảng: lấy phần chung ${M(`${Math.max(I.l, J.l)} \\le x \\le ${Math.min(I.r, J.r)}`)}, rồi kiểm tra từng đầu mút (đóng thì lấy, mở thì bỏ).`) + H.p(`Các số nguyên: ${ints(I).filter(x => inI(x, J)).join('; ')}. Có <b>${n}</b> số.`));
  } throw new Error('mc3'); });

  // 4. Hiệu hai khoảng A \ B
  A('mc', (r, H) => {
    const right = H.ri(r, 0, 1) === 1, a = H.ri(r, -5, 1), c = a + H.ri(r, 2, 4), b = c + H.ri(r, 1, 4), d = b + H.ri(r, 2, 5);
    // right: A=(a;b], B=[c;d) → A\B=(a;c)      left: A=[c;d), B=(a;b] → A\B=(b;d)
    const A1 = right ? {l: a, r: b, lc: false, rc: true} : {l: c, r: d, lc: true, rc: false}, B1 = right ? {l: c, r: d, lc: true, rc: false} : {l: a, r: b, lc: false, rc: true};
    const D = right ? {l: a, r: c, lc: false, rc: false} : {l: b, r: d, lc: false, rc: false};
    for (let k = -2 * 20; k <= 2 * 30; k++) { const x = k / 2; H.chk((inI(x, A1) && !inI(x, B1)) === inI(x, D), 'A\\B'); }
    const wr = [flip(D, 'r'), flip(D, 'l'), {...D, lc: true, rc: true}, right ? {l: c, r: b, lc: true, rc: true} : {l: c, r: b, lc: true, rc: true}].map(iTex);
    return H.mc('Thông hiểu', `Cho ${M(`A=${iTex(A1)}`)} và ${M(`B=${iTex(B1)}`)}. Tập ${M('A\\setminus B')} là`, M(iTex(D)), wr.map(M),
      H.p(`${M('A\\setminus B')} gồm các phần tử thuộc ${M('A')} mà <b>không</b> thuộc ${M('B')}.`) + H.p(right
        ? `${M('B')} bắt đầu từ ${M(c)} và lấy cả ${M(c)}; ${M('A')} không lấy ${M(a)}. Phần của ${M('A')} nằm bên trái ${M(c)} là ${M(iTex(D))} (không lấy ${M(c)} vì ${M(c)} thuộc ${M('B')}).`
        : `${M('B')} kết thúc ở ${M(b)} và lấy cả ${M(b)}; ${M('A')} không lấy ${M(d)}. Phần của ${M('A')} nằm bên phải ${M(b)} là ${M(iTex(D))} (không lấy ${M(b)} vì ${M(b)} thuộc ${M('B')}).`));
  });

  // 5. Số tập con chứa / không chứa phần tử cho trước
  A('mc', (r, H) => {
    const n = H.ri(r, 5, 9), kind = H.ri(r, 0, 2), el = [1, 2], N = (1 << n) - 1; let c = 0;
    for (let m = 0; m <= N; m++) { const has1 = m & 1, has2 = m & 2; if (kind === 0 ? (has1 && !has2) : kind === 1 ? (has1 && has2) : (!has1 && m !== 0)) c++; }
    const txt = ['chứa phần tử 1 nhưng không chứa phần tử 2', 'chứa cả hai phần tử 1 và 2', 'không chứa phần tử 1 và khác rỗng'][kind];
    const ans = String(c), wr = [2 ** n, 2 ** (n - 1), 2 ** (n - 2) - 1, 2 ** (n - 1) + 1, 2 ** (n - 2) + 1, 2 ** n - 1].map(String);
    H.chk(c === (kind === 2 ? 2 ** (n - 1) - 1 : 2 ** (n - 2)), 'subset');
    return H.mc('Vận dụng', `Cho tập hợp ${M(`A=\\{1;\\,2;\\,\\ldots;\\,${n}\\}`)}. Số tập con của ${M('A')} ${txt} là`, ans, wr,
      H.p(kind === 2 ? `Bỏ phần tử 1, mỗi phần tử còn lại (${n - 1} phần tử) chọn hoặc không: ${M(`2^{${n - 1}}`)} tập con (kể cả tập rỗng). Loại tập rỗng: ${M(`2^{${n - 1}}-1`)}.` : `Hai phần tử 1 và 2 đã cố định (chọn/không chọn xác định), mỗi phần tử trong ${n - 2} phần tử còn lại chọn hoặc không: ${M(`2^{${n - 2}}`)} tập con.`) + H.p(`Đáp số: <b>${c}</b>.`));
  });

  // 6. Cặp số nào là nghiệm của hệ bất phương trình (đầu mút nghiêm ngặt)
  const sysItems = (r, H) => { for (let t = 0; t < 400; t++) {
    const cf = () => { let a = H.ri(r, -3, 3), b = H.ri(r, -3, 3); if (!a && !b) a = 1; return [a, b]; }, rows = [0, 1, 2].map(() => { const [a, b] = cf(); return {a, b, c: H.ri(r, -5, 6), s: H.ri(r, 0, 1) === 1}; });   // s: true = bất đẳng thức chặt (<)
    const ok = (x, y, strictAsNon) => rows.every(w => { const v = w.a * x + w.b * y; return w.s && !strictAsNon ? v < w.c : v <= w.c; });
    const pts = []; for (let x = -6; x <= 6; x++) for (let y = -6; y <= 6; y++) pts.push([x, y]);
    const good = pts.filter(([x, y]) => ok(x, y, false)), trap = pts.filter(([x, y]) => !ok(x, y, false) && ok(x, y, true)), bad = pts.filter(([x, y]) => !ok(x, y, true));
    if (good.length < 3 || trap.length < 1 || bad.length < 6) continue;
    const g = H.pick(r, good), tp = H.pick(r, trap), bs = H.shuf(r, bad).slice(0, 2); return {rows, ok, g, tp, bs}; } throw new Error('sys'); };
  const sysTex = rows => `\\begin{cases}${rows.map(w => `${H0.lin2(w.a, w.b)}\\ ${w.s ? '\\lt' : '\\le'}\\ ${w.c}`).join(' \\\\ ')}\\end{cases}`;
  const H0 = {lin2: (a, b) => { const t = (c, v) => c === 0 ? '' : `${c === 1 ? '' : c === -1 ? '-' : c}${v}`, x = t(a, 'x'), y = t(b, 'y'); return x && y ? `${x}${b > 0 ? '+' : ''}${y}` : x || y; }};
  A('mc', (r, H) => { const S = sysItems(r, H), pt = p => M(`(${p[0]};\\,${p[1]})`), all = H.shuf(r, [S.g, S.tp, ...S.bs]);
    return H.mc('Vận dụng', `Cặp số ${M('(x;\\,y)')} nào sau đây là nghiệm của hệ bất phương trình ${M(sysTex(S.rows))}?`, pt(S.g), [S.tp, ...S.bs].map(pt),
      H.p(`Thay từng cặp vào <b>cả ba</b> bất phương trình; chú ý bất phương trình có dấu ${M('\\lt')} không nhận dấu bằng.`) + H.p(`${pt(S.g)} thoả cả ba. ${pt(S.tp)} làm một bất phương trình chặt xảy ra dấu bằng nên <b>không</b> là nghiệm.`));
  });

  // 7. GTLN, GTNN của F = ax + by trên miền đa giác
  const poly = (r, H) => { for (let t = 0; t < 300; t++) {
    const P = [[0, 0], [0, H.ri(r, 3, 6)], [H.ri(r, 2, 6), H.ri(r, 3, 7)], [H.ri(r, 4, 8), 0]], cr = (o, p, q) => (p[0] - o[0]) * (q[1] - o[1]) - (p[1] - o[1]) * (q[0] - o[0]);
    const s = [cr(P[0], P[1], P[2]), cr(P[1], P[2], P[3]), cr(P[2], P[3], P[0]), cr(P[3], P[0], P[1])]; if (s.every(x => x < 0) || s.every(x => x > 0)) return P; } throw new Error('poly'); };
  A('mc', (r, H) => { const P = poly(r, H), a = H.ri(r, -4, 4) || 2, b = H.ri(r, -4, 4) || 3, vals = P.map(([x, y]) => a * x + b * y), isMax = H.ri(r, 0, 1) === 1;
    const best = isMax ? Math.max(...vals) : Math.min(...vals), other = isMax ? Math.min(...vals) : Math.max(...vals); H.chk(new Set(vals).size >= 3, 'vals');
    const wr = [other, ...vals.filter(v => v !== best && v !== other), a * P[2][0] + b * P[2][1] + 1, vals.reduce((p, q) => p + q, 0)].map(String);
    const f = `F=${a === 1 ? '' : a === -1 ? '-' : a}x${b > 0 ? '+' : '-'}${Math.abs(b) === 1 ? '' : Math.abs(b)}y`;
    return H.mc('Vận dụng', `Miền nghiệm của một hệ bất phương trình là tứ giác ${M('ABCD')} với ${M(`A(${P[0]}),\\ B(${P[1]}),\\ C(${P[2]}),\\ D(${P[3]})`)}. Giá trị ${isMax ? 'lớn' : 'nhỏ'} nhất của ${M(f)} trên miền này là`, String(best), wr,
      H.p(`Giá trị lớn nhất, nhỏ nhất của ${M('F')} trên miền đa giác đạt tại một <b>đỉnh</b>. Tính ${M('F')} tại bốn đỉnh:`) + H.p(P.map((p, i) => `${M('ABCD'[i])}: ${M(String(vals[i]))}`).join('; ') + '.') + H.p(`Giá trị ${isMax ? 'lớn' : 'nhỏ'} nhất là <b>${best}</b>.`));
  });

  // 8. Dấu của giá trị lượng giác của góc tù
  const TRI = [[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25], [20, 21, 29], [9, 12, 15]];
  A('mc', (r, H) => { const [p, q0, h0] = H.pick(r, TRI), g = H.gcd(p, h0), [pp, hh] = [p / g, h0 / g], mode = H.ri(r, 0, 2), qq = q0 / H.gcd(q0, h0), cc = q0 / g;
    // sinα = p/h, α tù: cosα = −q/h, tanα = −p/q
    const fr = (n, d) => H.fr(n, d), tex = (n, d) => fr(n, d);
    { const sn = p / h0, cs = -Math.sqrt(1 - sn * sn), tn = sn / cs; H.chk(Math.abs(cs + q0 / h0) < 1e-9 && Math.abs(tn + p / q0) < 1e-9 && Math.abs(sn + tn - (p * q0 - p * h0) / (q0 * h0)) < 1e-9, 'sin-cos-tan'); }
    if (mode === 0) return H.mc('Thông hiểu', `Cho ${M(`\\sin\\alpha=${fr(p, h0)}`)} với ${M('90^\\circ\\lt\\alpha\\lt180^\\circ')}. Giá trị ${M('\\cos\\alpha')} bằng`, M(fr(-q0, h0)), [fr(q0, h0), fr(-p, q0), fr(q0, p)].map(M),
      H.p(`${M('\\cos^2\\alpha=1-\\sin^2\\alpha')} = ${M(fr(q0 * q0, h0 * h0))}, nên ${M(`\\cos\\alpha=\\pm${fr(q0, h0)}`)}.`) + H.p(`Góc tù có côsin <b>âm</b>: ${M(`\\cos\\alpha=${fr(-q0, h0)}`)}.`));
    if (mode === 1) return H.mc('Thông hiểu', `Cho ${M(`\\sin\\alpha=${fr(p, h0)}`)} với ${M('90^\\circ\\lt\\alpha\\lt180^\\circ')}. Giá trị ${M('\\tan\\alpha')} bằng`, M(fr(-p, q0)), [fr(p, q0), fr(-q0, p), fr(q0, p), fr(-p, h0)].map(M),
      H.p(`${M(`\\cos\\alpha=${fr(-q0, h0)}`)} (góc tù, côsin âm).`) + H.p(`${M(`\\tan\\alpha=\\dfrac{\\sin\\alpha}{\\cos\\alpha}=${fr(-p, q0)}`)}.`));
    return H.mc('Vận dụng', `Cho ${M(`\\cos\\alpha=${fr(-q0, h0)}`)} với ${M('0^\\circ\\lt\\alpha\\lt180^\\circ')}. Giá trị ${M('\\sin\\alpha+\\tan\\alpha')} bằng`, M(fr(p * q0 - p * h0, q0 * h0)),
      [fr(p * q0 + p * h0, q0 * h0), fr(-p * q0 - p * h0, q0 * h0), fr(p * h0 - p * q0, q0 * h0), fr(p, h0)].map(M),
      H.p(`${M('0^\\circ\\lt\\alpha\\lt180^\\circ')} nên ${M('\\sin\\alpha\\gt0')}: ${M(`\\sin\\alpha=${fr(p, h0)}`)}. Côsin âm nên ${M(`\\tan\\alpha=${fr(-p, q0)}`)}.`) + H.p(`${M(`${fr(p, h0)}+\\left(${fr(-p, q0)}\\right)=${fr(p * q0 - p * h0, q0 * h0)}`)}.`));
  });

  // 9. Rút gọn biểu thức với góc bù
  A('mc', (r, H) => { for (let t = 0; t < 200; t++) {
    const a = H.pick(r, [20, 25, 35, 40, 50, 65, 70]), terms = H.shuf(r, [['s', a], ['s', 180 - a], ['c', a], ['c', 180 - a]]).slice(0, 3), sg = terms.map(() => H.pick(r, [1, -1]));
    const val = (rs, rc) => { let S = 0, C = 0; terms.forEach(([k, d], i) => { const sup = d === a ? 1 : -1; if (k === 's') S += sg[i] * (d === a ? 1 : rs); else C += sg[i] * (d === a ? 1 : rc); }); return [S, C]; };
    const [S, C] = val(1, -1), D2R = Math.PI / 180, num = terms.reduce((acc, [k, d], i) => acc + sg[i] * (k === 's' ? Math.sin(d * D2R) : Math.cos(d * D2R)), 0);
    H.chk(Math.abs(num - (S * Math.sin(a * D2R) + C * Math.cos(a * D2R))) < 1e-9, 'rút gọn góc bù');
    const W1 = val(1, 1), W2 = val(-1, -1), W3 = val(-1, 1), ex = ([s, c]) => { if (!s && !c) return '0'; const t = (k, f) => k === 0 ? '' : `${k > 0 ? '+' : '-'}${Math.abs(k) === 1 ? '' : Math.abs(k)}${f}`, out = (t(s, `\\sin ${a}^\\circ`) + t(c, `\\cos ${a}^\\circ`)); return out.replace(/^\+/, ''); };
    const key = v => ex(v), opts = [S, C]; const set = new Set([key([S, C])]); const wr = [W1, W2, W3].map(key).filter(x => !set.has(x)); if (new Set(wr).size < 3) continue;
    const tx = (k, d, s) => `${s > 0 ? '+' : '-'}${k === 's' ? '\\sin' : '\\cos'} ${d}^\\circ`, expr = terms.map(([k, d], i) => tx(k, d, sg[i])).join(' ').replace(/^\+/, '');
    return H.mc('Vận dụng', `Rút gọn ${M(`P=${expr}`)} (không dùng máy tính), ta được`, M(key([S, C])), wr.map(M),
      H.p(`Hai góc bù nhau ${M(`${a}^\\circ+${180 - a}^\\circ=180^\\circ`)}: ${M(`\\sin(180^\\circ-\\alpha)=\\sin\\alpha`)} và ${M(`\\cos(180^\\circ-\\alpha)=-\\cos\\alpha`)}.`) + H.p(`Thay ${M(`\\sin ${180 - a}^\\circ=\\sin ${a}^\\circ`)}, ${M(`\\cos ${180 - a}^\\circ=-\\cos ${a}^\\circ`)} rồi thu gọn: ${M(`P=${key([S, C])}`)}.`));
  } throw new Error('mc9'); });

  // 10. Định lí côsin: tìm góc
  const T60 = [[5, 8, 7], [3, 8, 7], [7, 15, 13], [8, 15, 13]], T120 = [[3, 5, 7], [7, 8, 13], [5, 16, 19]];
  A('mc', (r, H) => { const A0 = H.pick(r, [60, 120]), [b, c, a] = H.pick(r, A0 === 60 ? T60 : T120), k = H.pick(r, [1, 2]);
    const cs = (b * k) ** 2 + (c * k) ** 2 - (a * k) ** 2, cosA = cs / (2 * b * c * k * k); H.chk(Math.abs(cosA - (A0 === 60 ? .5 : -.5)) < 1e-9, 'cos');
    return H.mc('Thông hiểu', `Tam giác ${M('ABC')} có ${M(`BC=${a * k},\\ CA=${b * k},\\ AB=${c * k}`)}. Số đo góc ${M('A')} bằng`, M(`${A0}^\\circ`), [A0 === 60 ? 120 : 60, 30, 150].map(x => M(`${x}^\\circ`)),
      H.p(`${M(`\\cos A=\\dfrac{CA^2+AB^2-BC^2}{2\\cdot CA\\cdot AB}`)} = ${M(`\\dfrac{${(b * k) ** 2}+${(c * k) ** 2}-${(a * k) ** 2}}{2\\cdot ${b * k}\\cdot ${c * k}}=${H.fr(cs, 2 * b * c * k * k)}`)}.`) + H.p(`Suy ra ${M(`A=${A0}^\\circ`)} (cạnh đối diện góc ${M('A')} là ${M('BC')}).`));
  });

  // 11. Bán kính đường tròn ngoại tiếp
  A('mc', (r, H) => { const kind = H.pick(r, ['h', 'r2', 'r3']), a0 = kind === 'r3' ? H.pick(r, [6, 9, 12]) : H.pick(r, [6, 8, 10, 12]);
    const ang = kind === 'h' ? H.pick(r, [30, 150]) : kind === 'r2' ? H.pick(r, [45, 135]) : H.pick(r, [60, 120]);
    const [R, w] = kind === 'h' ? [`${a0}`, [`${2 * a0}`, `${a0 / 2}`, `${a0}\\sqrt{3}`]] : kind === 'r2' ? [`${a0 / 2}\\sqrt{2}`, [`${a0}\\sqrt{2}`, `${a0}`, `${a0 / 2}`]] : [`${a0 / 3}\\sqrt{3}`, [`${2 * a0 / 3}\\sqrt{3}`, `${a0}\\sqrt{3}`, `${a0 / 3}`]];
    const num = {h: a0, r2: a0 / Math.SQRT2, r3: a0 / Math.sqrt(3)}[kind]; H.chk(Math.abs(num - a0 / (2 * Math.sin(ang * Math.PI / 180))) < 1e-9, 'R');
    return H.mc('Thông hiểu', `Tam giác ${M('ABC')} có ${M(`BC=${a0}`)} và ${M(`\\widehat{A}=${ang}^\\circ`)}. Bán kính đường tròn ngoại tiếp tam giác ${M('ABC')} bằng`, M(R), w.map(M),
      H.p(`Định lí sin: ${M('\\dfrac{BC}{\\sin A}=2R')}, nên ${M('R=\\dfrac{BC}{2\\sin A}')}. Chú ý <b>có hệ số 2</b>.`) + H.p(`${M(`\\sin ${ang}^\\circ=${kind === 'h' ? '\\dfrac12' : kind === 'r2' ? '\\dfrac{\\sqrt2}{2}' : '\\dfrac{\\sqrt3}{2}'}`)} (góc ${ang}° và ${180 - ang}° có cùng sin), suy ra ${M(`R=${R}`)}.`));
  });

  // 12. Hai tàu rời bến (định lí côsin)
  A('mc', (r, H) => { const pick = H.pick(r, [[60, [5, 8, 7]], [60, [3, 8, 7]], [60, [7, 15, 13]], [120, [3, 5, 7]], [120, [7, 8, 13]], [90, [3, 4, 5]], [90, [5, 12, 13]]]), [ang, [u, v, d]] = pick, t = H.ri(r, 2, 4);
    const cosv = {60: .5, 90: 0, 120: -.5}[ang], dd = Math.sqrt((u * t) ** 2 + (v * t) ** 2 - 2 * u * t * v * t * cosv); H.chk(Math.abs(dd - d * t) < 1e-9, 'tàu');
    const wrongN = (u * t) ** 2 + (v * t) ** 2 + 2 * u * t * v * t * cosv, wrongS = ang === 90 ? (u + v) * t : Math.round(wrongN);
    const wr = [`\\sqrt{${wrongN}}`, `${(u + v) * t}`, `${Math.abs(u - v) * t}`, `${d * t + t}`].filter((x, i) => i !== 0 || Math.sqrt(wrongN) % 1 !== 0 || Math.sqrt(wrongN) !== d * t);
    const tail = Math.sqrt(wrongN) % 1 === 0 ? `${Math.sqrt(wrongN)}` : `\\sqrt{${wrongN}}`;
    return H.mc('Vận dụng', `Hai tàu thuỷ cùng xuất phát từ cảng ${M('O')} theo hai hướng tạo với nhau góc ${M(`${ang}^\\circ`)}. Tàu thứ nhất chạy ${u} km/h, tàu thứ hai chạy ${v} km/h. Sau ${t} giờ, hai tàu cách nhau bao nhiêu kilômét?`, M(`${d * t}`), [tail, `${(u + v) * t}`, `${Math.abs(u - v) * t}`, `${d * t + t}`].map(M),
      H.p(`Sau ${t} giờ: ${M(`OA=${u * t}`)} km, ${M(`OB=${v * t}`)} km, ${M(`\\widehat{AOB}=${ang}^\\circ`)}.`) + H.p(`Định lí côsin: ${M(`AB^2=${(u * t) ** 2}+${(v * t) ** 2}-2\\cdot ${u * t}\\cdot ${v * t}\\cdot\\cos ${ang}^\\circ=${(d * t) ** 2}`)}. Vậy ${M(`AB=${d * t}`)} km.`) + H.p(`Lỗi hay gặp: dùng dấu ${M('+')} thay vì ${M('-')} trước ${M('2ab\\cos')}, hoặc lấy tổng quãng đường.`));
  });

  /* ===================== ĐÚNG – SAI ===================== */
  // 1. Mệnh đề chia hết: kéo theo, đảo, phủ định
  A('tf', (r, H) => { let a, b; for (let t = 0; t < 100; t++) { a = H.pick(r, [4, 6, 8, 9, 12, 15, 18]); b = H.pick(r, [2, 3, 4, 6, 9]); if (a !== b && (a % b === 0 || b % a === 0 || (a % b && b % a && H.gcd(a, b) > 1))) break; }
    const imp = (x, y) => { for (let n = 1; n <= 720; n++) if (n % x === 0 && n % y !== 0) return false; return true; }, cex = (x, y) => { for (let n = 1; n <= 720; n++) if (n % x === 0 && n % y !== 0) return n; return null; };
    const w = H.pat(r), P = `«${M('n')} chia hết cho ${a}»`, Q = `«${M('n')} chia hết cho ${b}»`, pq = imp(a, b), qp = imp(b, a), k = cex(b, a), k2 = cex(a, b);
    const kk = (w[3] && !pq) ? k2 : a * b, kkOk = kk % a === 0 && kk % b !== 0;                      // ý 4: số kk có phải phản ví dụ của P ⇒ Q không
    return H.tf(`Với ${M('n')} là số tự nhiên, xét ${M('P')}: ${P} và ${M('Q')}: ${Q}. Xét tính đúng – sai của các khẳng định sau:`, [
      H.claim(pq, `Mệnh đề ${M('P\\Rightarrow Q')} là mệnh đề đúng.`, `Mệnh đề ${M('P\\Rightarrow Q')} là mệnh đề đúng.`, H.p(pq ? `Mọi số chia hết cho ${a} đều chia hết cho ${b}.` : `Phản ví dụ: ${M(`n=${k2}`)} chia hết cho ${a} nhưng không chia hết cho ${b}.`)),
      H.claim(qp, `Mệnh đề đảo ${M('Q\\Rightarrow P')} là mệnh đề đúng.`, `Mệnh đề đảo ${M('Q\\Rightarrow P')} là mệnh đề đúng.`, H.p(qp ? `Mọi số chia hết cho ${b} đều chia hết cho ${a}.` : `Phản ví dụ: ${M(`n=${k}`)} chia hết cho ${b} nhưng không chia hết cho ${a}.`)),
      w[0] ? {text: `Phủ định của ${M('P\\Rightarrow Q')} là: «tồn tại ${M('n')} chia hết cho ${a} mà không chia hết cho ${b}».`, ok: true, sol: H.p(`Phủ định của «${M('P\\Rightarrow Q')}» là «${M('P')} đúng và ${M('Q')} sai» với một ${M('n')} nào đó. Vậy khẳng định này <b>đúng</b>.`)}
           : {text: `Phủ định của ${M('P\\Rightarrow Q')} là: «mọi ${M('n')} chia hết cho ${a} đều không chia hết cho ${b}».`, ok: false, sol: H.p(`Phủ định cần <b>một</b> ${M('n')} thoả ${M('P')} mà không thoả ${M('Q')}, không phải «mọi». Vậy khẳng định này <b>sai</b>.`)},
      H.claim(kkOk, `Số ${M(`n=${kk}`)} là một phản ví dụ chứng tỏ ${M('P\\Rightarrow Q')} là mệnh đề sai.`, `Số ${M(`n=${kk}`)} là một phản ví dụ chứng tỏ ${M('P\\Rightarrow Q')} là mệnh đề sai.`, H.p(`Phản ví dụ phải thoả ${M('P')} nhưng không thoả ${M('Q')}: ${M(`${kk}`)} ${kk % a === 0 ? 'chia hết' : 'không chia hết'} cho ${a} và ${kk % b === 0 ? 'chia hết' : 'không chia hết'} cho ${b}.`))]);
  });

  // 2. Các phép toán trên khoảng
  A('tf', (r, H) => { for (let t = 0; t < 200; t++) {
    const a = H.ri(r, -6, 0), b = a + H.ri(r, 4, 8), c = H.ri(r, a + 1, b - 1), d = b + H.ri(r, 1, 5), I = {l: a, r: b, lc: !!H.ri(r, 0, 1), rc: !!H.ri(r, 0, 1)}, J = {l: c, r: d, lc: !!H.ri(r, 0, 1), rc: !!H.ri(r, 0, 1)};
    const inter = {l: c, r: b, lc: J.lc, rc: I.rc}, uni = {l: a, r: d, lc: I.lc, rc: J.rc}, diff = {l: a, r: c, lc: I.lc, rc: !J.lc};
    for (let k = -2 * 12; k <= 2 * 16; k++) { const x = k / 2; H.chk((inI(x, I) && inI(x, J)) === inI(x, inter) && (inI(x, I) || inI(x, J)) === inI(x, uni) && (inI(x, I) && !inI(x, J)) === inI(x, diff), 'phép toán'); }
    const w = H.pat(r), wrongI = flip(inter, 'l'), wrongU = flip(uni, 'r'), wrongD = flip(diff, 'r'), nI = ints(I).filter(x => inI(x, J)).length;
    return H.tf(`Cho ${M(`A=${iTex(I)}`)} và ${M(`B=${iTex(J)}`)}. Xét tính đúng – sai của các khẳng định sau:`, [
      H.claim(w[0], `${M(`A\\cap B=${iTex(inter)}`)}.`, `${M(`A\\cap B=${iTex(wrongI)}`)}.`, H.p(`Phần chung bắt đầu từ ${M(c)} (đầu mút trái của ${M('B')}, ${J.lc ? 'đóng' : 'mở'}) và kết thúc ở ${M(b)} (đầu mút phải của ${M('A')}, ${I.rc ? 'đóng' : 'mở'}), nên ${M(`A\\cap B=${iTex(inter)}`)}.`)),
      H.claim(w[1], `${M(`A\\cup B=${iTex(uni)}`)}.`, `${M(`A\\cup B=${iTex(wrongU)}`)}.`, H.p(`Hai khoảng giao nhau nên hợp là một khoảng từ ${M(a)} (theo ${M('A')}) đến ${M(d)} (theo ${M('B')}): ${M(iTex(uni))}.`)),
      H.claim(w[2], `${M(`A\\setminus B=${iTex(diff)}`)}.`, `${M(`A\\setminus B=${iTex(wrongD)}`)}.`, H.p(`Phần của ${M('A')} nằm bên trái ${M(c)}; đầu mút ${M(c)} ${J.lc ? 'thuộc' : 'không thuộc'} ${M('B')} nên ${J.lc ? 'bị loại khỏi' : 'vẫn thuộc'} hiệu: ${M(`A\\setminus B=${iTex(diff)}`)}.`)),
      H.claim(w[3], `Có đúng ${nI} số nguyên thuộc ${M('A\\cap B')}.`, `Có đúng ${nI + 1} số nguyên thuộc ${M('A\\cap B')}.`, H.p(`Các số nguyên thuộc ${M('A\\cap B')}: ${ints(I).filter(x => inI(x, J)).join('; ') || 'không có'}. Có ${nI} số.`))]);
  } throw new Error('tf2'); });

  // 3. Tam giác biết ba cạnh
  const HER = [[13, 14, 15], [5, 5, 6], [10, 10, 12], [13, 13, 10], [9, 10, 17], [13, 20, 21], [17, 25, 26], [6, 25, 29], [8, 15, 17], [4, 13, 15]];
  const heron = (a, b, c) => { const p = (a + b + c) / 2, s2 = p * (p - a) * (p - b) * (p - c); return Math.sqrt(s2); };
  A('tf', (r, H) => { const [a, b, c] = H.shuf(r, H.pick(r, HER)), S = heron(a, b, c); H.chk(Number.isInteger(S), 'S nguyên');
    const mx = Math.max(a, b, c), o = [a, b, c].filter((x, i, arr) => i !== arr.indexOf(mx)), obtuse = mx * mx > o[0] * o[0] + o[1] * o[1], p = (a + b + c) / 2, w = H.pat(r);
    const rTex = H.fr(2 * S, a + b + c), rWrong = H.fr(S, a + b + c), num = o[0] * o[0] + o[1] * o[1] - mx * mx, cosT = H.fr(num, 2 * o[0] * o[1]), cosW = H.fr(-num, 2 * o[0] * o[1]);
    H.chk(o.length === 2, 'hai cạnh còn lại');
    return H.tf(`Tam giác ${M('ABC')} có ${M(`BC=${a},\\ CA=${b},\\ AB=${c}`)}. Xét tính đúng – sai của các khẳng định sau:`, [
      H.claim(w[0], `Diện tích tam giác ${M('ABC')} bằng ${M(S)}.`, `Diện tích tam giác ${M('ABC')} bằng ${M(S + (S % 2 ? 1 : 2))}.`, H.p(`Nửa chu vi ${M(`p=${p}`)}; Hê-rông: ${M(`S=\\sqrt{${p}(${p - a})(${p - b})(${p - c})}=${S}`)}.`)),
      H.claim(obtuse, `Tam giác ${M('ABC')} có một góc tù.`, `Tam giác ${M('ABC')} có một góc tù.`, H.p(`Cạnh lớn nhất là ${mx}; so ${M(`${mx}^2=${mx * mx}`)} với tổng bình phương hai cạnh còn lại ${M(`${o[0] ** 2 + o[1] ** 2}`)}: ${obtuse ? 'lớn hơn' : 'không lớn hơn'}, nên ${obtuse ? 'có' : 'không có'} góc tù.`)),
      H.claim(w[2], `Bán kính đường tròn nội tiếp tam giác ${M('ABC')} bằng ${M(rTex)}.`, `Bán kính đường tròn nội tiếp tam giác ${M('ABC')} bằng ${M(rWrong)}.`, H.p(`${M('r=\\dfrac{S}{p}')} (${M('p')} là nửa chu vi) ${M(`=\\dfrac{${S}}{${p}}=${rTex}`)}.`)),
      H.claim(w[3], `Côsin của góc lớn nhất bằng ${M(cosT)}.`, `Côsin của góc lớn nhất bằng ${M(cosW)}.`, H.p(`Góc lớn nhất đối diện cạnh ${mx}: ${M(`\\cos=\\dfrac{${o[0] ** 2}+${o[1] ** 2}-${mx * mx}}{2\\cdot ${o[0]}\\cdot ${o[1]}}=${cosT}`)}.`))]);
  });

  /* ===================== TRẢ LỜI NGẮN ===================== */
  // 1. Số tập X thoả B ⊂ X ⊂ A
  A('sh', (r, H) => { const n = H.ri(r, 7, 11), k = H.ri(r, 2, 4); let c = 0; const N = 1 << n, base = (1 << k) - 1; for (let m = 0; m < N; m++) if ((m & base) === base) c++; H.chk(c === 2 ** (n - k), 'X');
    return H.sh(`Cho ${M(`A=\\{1;\\,2;\\,\\ldots;\\,${n}\\}`)} và ${M(`B=\\{${[...Array(k)].map((_, i) => i + 1).join(';\\,')}\\}`)}. Có bao nhiêu tập hợp ${M('X')} thoả mãn ${M('B\\subset X\\subset A')} (kể cả ${M('X=B')} và ${M('X=A')})?`, c,
      H.p(`${M('X')} phải chứa cả ${k} phần tử của ${M('B')}. Mỗi trong ${n - k} phần tử còn lại của ${M('A')} được chọn hoặc không: ${M(`2^{${n - k}}=${c}`)}.`) + H.p(`Đáp số: <b>${c}</b>.`));
  });
  // 2. Diện tích bằng công thức Hê-rông
  A('sh', (r, H) => { const [a, b, c] = H.pick(r, HER), k = H.pick(r, [1, 1, 2]), S = heron(a * k, b * k, c * k); H.chk(Number.isInteger(S) && S < 10000, 'Heron');
    return H.sh(`Tam giác ${M('ABC')} có ba cạnh dài ${a * k}, ${b * k}, ${c * k} (đơn vị: cm). Tính diện tích tam giác (đơn vị: ${M('\\text{cm}^2')}).`, S,
      H.p(`Nửa chu vi ${M(`p=\\dfrac{${a * k}+${b * k}+${c * k}}{2}=${(a + b + c) * k / 2}`)}.`) + H.p(`${M(`S=\\sqrt{p(p-a)(p-b)(p-c)}=\\sqrt{${(a + b + c) * k / 2}\\cdot ${(a + b + c) * k / 2 - a * k}\\cdot ${(a + b + c) * k / 2 - b * k}\\cdot ${(a + b + c) * k / 2 - c * k}}=${S}`)}. Đáp số: <b>${S}</b>.`));
  });
  // 3. Số cặp số nguyên (x; y) thoả hệ bất phương trình (có biên chặt)
  A('sh', (r, H) => { for (let t = 0; t < 300; t++) {
    const s = H.ri(r, 6, 10), u = H.ri(r, 1, 3), v = H.ri(r, 1, 3), w = H.ri(r, 4, 12), strict = H.ri(r, 0, 1) === 1; let n = 0; const sols = [];
    for (let x = 1; x <= 30; x++) for (let y = 1; y <= 30; y++) if (strict ? x + y < s : x + y <= s) if (u * x + v * y >= w) { n++; sols.push([x, y]); }
    if (n < 5 || n > 40) continue;
    return H.sh(`Có bao nhiêu cặp số nguyên dương ${M('(x;\\,y)')} thoả mãn hệ bất phương trình ${M(`\\begin{cases}x+y${strict ? '\\lt' : '\\le'}${s}\\\\ ${u === 1 ? '' : u}x+${v === 1 ? '' : v}y\\ge ${w}\\end{cases}`)}?`, n,
      H.p(`Liệt kê theo ${M('x')}: với mỗi ${M('x')} đếm các ${M('y')} nguyên dương thoả cả hai bất phương trình. (Chú ý bất phương trình thứ nhất ${strict ? 'có dấu chặt nên ' + M(`x+y=${s}`) + ' không được tính' : 'cho phép ' + M(`x+y=${s}`)}.)`) + H.p(`Tổng cộng có <b>${n}</b> cặp.`));
  } throw new Error('sh3'); });
  // 4. Giá trị lớn nhất / nhỏ nhất của F trên đa giác
  A('sh', (r, H) => { const P = poly(r, H), a = H.ri(r, -4, 5) || 3, b = H.ri(r, -4, 5) || 2, vals = P.map(([x, y]) => a * x + b * y), isMax = H.ri(r, 0, 1) === 1, best = isMax ? Math.max(...vals) : Math.min(...vals);
    return H.sh(`Miền nghiệm của hệ bất phương trình là tứ giác ${M('ABCD')} với ${M(`A(${P[0]}),\\ B(${P[1]}),\\ C(${P[2]}),\\ D(${P[3]})`)}. Tìm giá trị ${isMax ? 'lớn' : 'nhỏ'} nhất của ${M(`F=${a}x${b >= 0 ? '+' : '-'}${Math.abs(b)}y`)} trên miền đó.`, best,
      H.p(`${M('F')} đạt ${isMax ? 'lớn' : 'nhỏ'} nhất tại một đỉnh. ${P.map((p, i) => `${M(`F(${'ABCD'[i]})=${vals[i]}`)}`).join('; ')}.`) + H.p(`Đáp số: <b>${best}</b>.`));
  });
  // 5. Cạnh thứ ba bằng định lí côsin
  A('sh', (r, H) => { const [ang, [u, v, d]] = H.pick(r, [[60, [5, 8, 7]], [60, [7, 15, 13]], [120, [3, 5, 7]], [120, [7, 8, 13]], [120, [5, 16, 19]]]), k = H.pick(r, [1, 2, 3]);
    const cosv = ang === 60 ? .5 : -.5, dd = Math.sqrt((u * k) ** 2 + (v * k) ** 2 - 2 * u * k * v * k * cosv); H.chk(Math.abs(dd - d * k) < 1e-9, 'cạnh 3');
    return H.sh(`Để đo khoảng cách giữa hai điểm ${M('A')}, ${M('B')} ở hai bên một hồ nước, người ta chọn điểm ${M('C')} sao cho ${M(`CA=${u * k}`)} m, ${M(`CB=${v * k}`)} m và ${M(`\\widehat{ACB}=${ang}^\\circ`)}. Tính ${M('AB')} (đơn vị: mét).`, d * k,
      H.p(`${M(`AB^2=CA^2+CB^2-2\\cdot CA\\cdot CB\\cdot\\cos C=${(u * k) ** 2}+${(v * k) ** 2}-2\\cdot ${u * k}\\cdot ${v * k}\\cdot\\cos ${ang}^\\circ=${(d * k) ** 2}`)}.`) + H.p(`Đáp số: ${M(`AB=${d * k}`)} m.`));
  });
})();
