/* =====================================================================
   ÔN TẬP GIỮA HỌC KÌ I – TOÁN 10 (Kết nối tri thức): Chương I + II + III.
   5 đề, mỗi đề 12 trắc nghiệm + 4 đúng/sai + 6 trả lời ngắn (có hình vẽ), 4 mã đề.
   NGÂN HÀNG CÂU HỎI dùng chung (xuất ra globalThis.GK1), được dùng bởi:
     – data/lop10.js: bài luyện tập 'Ôn tập giữa học kì I' của học sinh (chủ đề 4);
     – data/lop10-giua-ki-kiem-tra.js: StudentTest 'giua-ki-1…5' (học sinh làm có đồng hồ, lấy sao);
     – giao-vien/bai-giang/lop10-giua-ki.js: đề in A4 'gk1…gk5' của giáo viên.
   Mọi câu sinh bằng hạt giống cố định (cùng đề + mã đề + vị trí câu → cùng số liệu); đáp án suy ra bằng phép tính.
   Dạng câu theo cấu trúc đề ôn tập giữa kì (liệt kê tập hợp, mệnh đề phủ định, phép toán tập hợp, miền nghiệm,
   hệ bất phương trình, đọc hình, định lí côsin – sin, diện tích, bài toán đo đạc, tối ưu...); số liệu và tình huống do thầy soạn lại.
   ===================================================================== */
(() => {
const M = x => `\\(${x}\\)`;
const rng = s => { let a = s >>> 0; return () => { a = (a + 0x6D2B79F5) >>> 0; let t = a; t = Math.imul(t ^ t >>> 15, t | 1); t ^= t + Math.imul(t ^ t >>> 7, t | 61); return ((t ^ t >>> 14) >>> 0) / 4294967296; }; };
const ri = (r, a, b) => a + Math.floor(r() * (b - a + 1));
const pk = (r, a) => a[Math.floor(r() * a.length)];
const shuf = (r, arr) => { const a = arr.slice(); for(let i = a.length - 1; i > 0; i--){ const j = Math.floor(r() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const p = s => `<p>${s}</p>`;
const gcd = (a, b) => b ? gcd(b, a % b) : Math.abs(a);
const FIG = (svg, w = 230) => `<div style="text-align:center;margin:.35em 0">${svg.replace('<svg ', `<svg width="${w}" `)}</div>`;
const num = (n, d = 1, rt = 1) => { const g = gcd(n, d) || 1; n /= g; d /= g; if(d < 0){ n = -n; d = -d; } if(n === 0) return '0';
  const sg = n < 0 ? '-' : '', an = Math.abs(n), top = rt === 1 ? `${an}` : an === 1 ? `\\sqrt{${rt}}` : `${an}\\sqrt{${rt}}`; return d === 1 ? `${sg}${top}` : `${sg}\\dfrac{${top}}{${d}}`; };
const mcq = (level, q, correct, wrongs, sol) => { const w = []; for(const x of wrongs) if(x !== correct && !w.includes(x)) w.push(x);
  if(w.length < 3) throw new Error('Thiếu phương án nhiễu: ' + q); return {level, q, opts:[correct, ...w.slice(0, 3)], sol}; };
const R1 = x => Math.round(x * 10) / 10;
const safeRound = (x, step) => { const y = x / step; return Math.abs(y - Math.floor(y) - .5) > .06; };     // tránh kết quả sát biên làm tròn
const OPT = {gt:'\\gt ', ge:'\\ge ', lt:'\\lt ', le:'\\le '}, NEG = {gt:'le', ge:'lt', lt:'ge', le:'gt'}, SWP = {gt:'lt', ge:'le', lt:'gt', le:'ge'};
const hold = (v, op, c) => op === 'gt' ? v > c : op === 'ge' ? v >= c : op === 'lt' ? v < c : v <= c;
const term = (c, v, first) => { const a = Math.abs(c), s = c < 0 ? '-' : first ? '' : '+'; return `${s}${a === 1 ? '' : a}${v}`; };
const lin = (a, b) => `${a ? term(a, 'x', true) : ''}${b ? term(b, 'y', !a) : ''}`;
const ineq = ([a, b, op, c]) => `${lin(a, b)} ${OPT[op]} ${c}`;
const sat = ([a, b, op, c], [x, y]) => hold(a * x + b * y, op, c);
const SYS = rows => `\\begin{cases}${rows.join('\\\\')}\\end{cases}`;
const Pt = ([x, y]) => `(${x};\\ ${y})`;
const setTex = a => a.length ? `\\{${a.join(';\\ ')}\\}` : '\\varnothing';
const ivTex = (lo, flo, hi, fhi) => `${flo ? '[' : '('}${lo};\\ ${hi}${fhi ? ']' : ')'}`;
const MS = {sin:{0:[0,1,1], 30:[1,2,1], 45:[1,2,2], 60:[1,2,3], 90:[1,1,1], 120:[1,2,3], 135:[1,2,2], 150:[1,2,1], 180:[0,1,1]},
  cos:{0:[1,1,1], 30:[1,2,3], 45:[1,2,2], 60:[1,2,1], 90:[0,1,1], 120:[-1,2,1], 135:[-1,2,2], 150:[-1,2,3], 180:[-1,1,1]}};
// Tam giác có độ dài nguyên: A = 60° hoặc 120° (BC nguyên) – dùng cho định lí côsin
const PAIRS = A => { const o = []; for(let b = 2; b <= 16; b++) for(let c = 2; c <= 16; c++){ if(b === c) continue; const a2 = A === 60 ? b*b + c*c - b*c : A === 120 ? b*b + c*c + b*c : b*b + c*c, a = Math.round(Math.sqrt(a2)); if(a*a === a2) o.push([b, c, a]); } return o; };
const P60 = PAIRS(60), P120 = PAIRS(120), P90 = PAIRS(90);
// Tam giác có diện tích nguyên (Heron)
const HERON = [[13,14,15,84], [9,10,17,36], [7,15,20,42], [10,13,13,60], [5,5,6,12], [17,25,26,204], [6,25,29,60], [9,10,17,36]];

/* ---------- LP: đỉnh của miền nghiệm, giá trị tối ưu ---------- */
const vertices = cons => {            // cons: [[a,b,c,'le'|'ge']…] cộng x ≥ 0, y ≥ 0
  const L = [...cons, [1, 0, 0, 'ge'], [0, 1, 0, 'ge']], pts = [];
  for(let i = 0; i < L.length; i++) for(let j = i + 1; j < L.length; j++){ const [A, B, C] = L[i], [D, E, F] = L[j], det = A * E - B * D; if(!det) continue;
    const x = (C * E - B * F) / det, y = (A * F - C * D) / det;
    if(L.every(([a, b, c, o]) => o === 'le' ? a * x + b * y <= c + 1e-9 : a * x + b * y >= c - 1e-9) && !pts.some(t => Math.abs(t[0] - x) + Math.abs(t[1] - y) < 1e-9)) pts.push([Math.round(x * 1e6) / 1e6, Math.round(y * 1e6) / 1e6]); }
  return pts;
};
const fmt = v => String(Math.round(v * 100) / 100).replace('.', ',');

/* =====================================================================
   PHẦN I – TRẮC NGHIỆM (mỗi hàm: (r, ci) → {level, q, opts:[ĐÚNG, sai, sai, sai], sol}); thuộc tính bai = 1 | 2 | 3
   ===================================================================== */
const MC = {};
const setBai = (obj, k, n) => Object.keys(obj).forEach(key => { if(k.includes(key)) obj[key].bai = n; });

MC.listSet = r => {
  const a = ri(r, 1, 4), b = ri(r, 4, 9), lo = -a, hi = b, f = (cl, cu) => { const o = []; for(let x = -20; x <= 20; x++){ const v = 2*x + 1; if((cl ? v >= lo : v > lo) && (cu ? v <= hi : v < hi)) o.push(x); } return o; };
  const ok = f(true, false), cand = [f(true, true), f(false, false), f(false, true), ok.slice(1), ok.slice(0, -1), [...ok, ok[ok.length - 1] + 1]].map(setTex), c = setTex(ok);
  return mcq('Nhận biết', `Liệt kê các phần tử của tập hợp ${M(`A = \\{x \\in \\mathbb{Z} \\mid ${lo} \\le 2x + 1 \\lt ${hi}\\}`)}.`, c, cand,
    p(`${M(`${lo} \\le 2x + 1 \\lt ${hi} \\Leftrightarrow ${num(lo - 1, 2)} \\le x \\lt ${num(hi - 1, 2)}`)}.`) + p(`Các số nguyên ${M('x')} thoả mãn là: ${M(c)}.`));
};
MC.triArea = r => {
  const a = pk(r, [4, 6, 8, 10, 12]), b = pk(r, [4, 5, 6, 8, 9, 10]), C = pk(r, [30, 45, 60, 120, 135, 150]), [sn, sd, rt] = MS.sin[C], [cn, cd, crt] = MS.cos[C], k = a * b;
  const c = num(k * sn, 2 * sd, rt), cands = [num(k * sn, sd, rt), num(k * Math.abs(cn), 2 * cd, crt), num(k * sn, 4 * sd, rt), num(k, 2), num(k, 4), num(k * sn, 2 * sd, rt === 1 ? 3 : 1)];
  return mcq('Nhận biết', `Tam giác ${M('ABC')} có ${M(`AB = ${a},\\ AC = ${b}`)} và ${M(`\\widehat{A} = ${C}^\\circ`)}. Diện tích của tam giác ${M('ABC')} bằng`, M(c), cands.map(M),
    p(`${M(`S = \\dfrac{1}{2}\\cdot AB\\cdot AC\\cdot\\sin A = \\dfrac{1}{2}\\cdot ${a}\\cdot ${b}\\cdot\\sin ${C}^\\circ = ${c}`)}.`));
};
MC.isProp = r => {
  const a = ri(r, 3, 9), b = ri(r, 3, 9), pr = pk(r, [7, 11, 13, 17, 19]);
  const non = pk(r, [[`${M(`x + ${a} = ${a + b}`)}.`, 'Câu chứa biến chưa có giá trị cụ thể nên chưa xác định đúng hay sai.'], [`${M('\\sqrt{3}')} có phải là số hữu tỉ không?`, 'Đây là câu hỏi, không khẳng định điều gì.'], ['Hãy làm bài tập về nhà đi!', 'Đây là câu mệnh lệnh, không có tính đúng sai.'], [`${M(`${a}n + 1`)} là số nguyên tố.`, 'Câu chứa biến ' + M('n') + ' nên chưa xác định được đúng hay sai.']]);
  const props = [`${M(`${a} + ${b} = ${a + b + 1}`)}.`, `${M(pr)} là số nguyên tố.`, `${M('\\sqrt{2}')} là số vô tỉ.`, `Hà Nội là thủ đô của Việt Nam.`, `${M(`${a}^2 \\gt ${a}`)}.`];
  return mcq('Nhận biết', 'Câu nào sau đây <b>không</b> phải là mệnh đề?', non[0], shuf(r, props).slice(0, 3), p(non[1]) + p('Ba câu còn lại đều là khẳng định có tính đúng hoặc sai (là mệnh đề).'));
};
MC.negQuant = r => {
  const Q = pk(r, ['\\forall', '\\exists']), op = pk(r, ['gt', 'ge', 'lt', 'le']), a = ri(r, 1, 4), b = ri(r, 1, 6), E = `x^2 + ${a}x + ${b}`, Q2 = Q === '\\forall' ? '\\exists' : '\\forall';
  const st = (q, o) => M(`${q}\\ x \\in \\mathbb{R},\\ ${E} ${OPT[o]} 0`);
  return mcq('Nhận biết', `Cho mệnh đề ${st(Q, op)}. Mệnh đề phủ định của mệnh đề trên là`, st(Q2, NEG[op]), [st(Q, NEG[op]), st(Q2, op), st(Q2, SWP[op])],
    p(`Phủ định của ${M(Q)} là ${M(Q2)}, đồng thời phủ định của ${M(OPT[op])} là ${M(OPT[NEG[op]])}.`));
};
MC.negSimple = r => {
  const v = ri(r, 0, 2);
  if(v === 0){ const k = pk(r, [3, 5, 7]); return mcq('Nhận biết', `Mệnh đề phủ định của mệnh đề “Số tự nhiên ${M('n')} chia hết cho ${k}” là`, `Số tự nhiên ${M('n')} không chia hết cho ${k}.`,
      [`Số tự nhiên ${M('n')} chia hết cho ${k + 1}.`, `Số tự nhiên ${M('n')} chia cho ${k} dư ${k - 1}.`, `Số tự nhiên ${M('n')} là bội của ${k * 2}.`], p('Phủ định của “chia hết” là “không chia hết”.')); }
  if(v === 1) return mcq('Nhận biết', `Mệnh đề phủ định của mệnh đề “${M('n')} là số tự nhiên chẵn” là`, `${M('n')} không là số tự nhiên chẵn.`, [`${M('n')} là số nguyên tố.`, `${M('n')} là số chính phương.`, `${M('n')} là số tự nhiên lớn hơn 2.`], p('Phủ định ta thêm từ “không” vào trước vị ngữ.'));
  const o = pk(r, ['ge', 'gt', 'le', 'lt']), c = ri(r, 2, 9);
  return mcq('Nhận biết', `Mệnh đề phủ định của mệnh đề “${M(`x ${OPT[o]} ${c}`)}” là`, M(`x ${OPT[NEG[o]]} ${c}`), [M(`x ${OPT[o]} ${-c}`), M(`x ${OPT[SWP[o]]} ${c}`), M(`x ${OPT[o]} ${c + 1}`)].map(x => x),
    p(`Phủ định của ${M(OPT[o])} là ${M(OPT[NEG[o]])}.`));
};
MC.setOp = r => {
  const a1 = ri(r, -6, -2), b1 = ri(r, -1, 1), a2 = b1 + ri(r, 2, 4), b2 = a2 + ri(r, 2, 4), [fa1, fa2, fb1, fb2] = [0, 1, 2, 3].map(() => r() < .5), op = pk(r, ['cap', 'cup', 'diff']);
  const A = ivTex(a1, fa1, a2, fa2), B = ivTex(b1, fb1, b2, fb2);
  const res = {cap:ivTex(b1, fb1, a2, fa2), cup:ivTex(a1, fa1, b2, fb2), diff:ivTex(a1, fa1, b1, !fb1)}, sym = {cap:'\\cap', cup:'\\cup', diff:'\\setminus'}, c = res[op];
  const cands = [ivTex(...({cap:[b1, !fb1, a2, fa2], cup:[a1, !fa1, b2, fb2], diff:[a1, fa1, b1, fb1]}[op])), ivTex(...({cap:[b1, fb1, a2, !fa2], cup:[a1, fa1, b2, !fb2], diff:[a1, !fa1, b1, !fb1]}[op])), ...['cap', 'cup', 'diff'].filter(x => x !== op).map(x => res[x])];
  return mcq('Thông hiểu', `Cho hai tập hợp ${M(`A = ${A}`)}, ${M(`B = ${B}`)}. Tập hợp ${M(`A ${sym[op]} B`)} là`, M(c), cands.map(M),
    p(`Biểu diễn ${M('A')}, ${M('B')} trên trục số rồi xét phần ${op === 'cap' ? 'chung' : op === 'cup' ? 'gộp lại' : 'thuộc A nhưng không thuộc B'}.`) + p(`Kết quả: ${M(c)}.`));
};
MC.setFinite = r => {
  const pool = shuf(r, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]), both = pool.slice(0, ri(r, 2, 3)).sort((x, y) => x - y), ao = pool.slice(3, 6).sort((x, y) => x - y), bo = pool.slice(6, 9).sort((x, y) => x - y);
  const A = [...both, ...ao].sort((x, y) => x - y), B = [...both, ...bo].sort((x, y) => x - y), op = pk(r, ['cap', 'cup', 'diff']);
  const res = {cap:both, cup:[...new Set([...A, ...B])].sort((x, y) => x - y), diff:ao}, sym = {cap:'\\cap', cup:'\\cup', diff:'\\setminus'}, c = setTex(res[op]);
  return mcq('Nhận biết', `Cho hai tập hợp ${M(`A = ${setTex(A)}`)}, ${M(`B = ${setTex(B)}`)}. Tập hợp ${M(`A ${sym[op]} B`)} bằng`, M(c), ['cap', 'cup', 'diff'].filter(x => x !== op).map(x => M(setTex(res[x]))).concat([M(setTex(bo))]),
    p(`${op === 'cap' ? 'Các phần tử chung của hai tập' : op === 'cup' ? 'Gộp mọi phần tử của hai tập (mỗi phần tử ghi một lần)' : 'Các phần tử của A mà không thuộc B'}: ${M(c)}.`));
};
MC.halfPlane = r => {
  for(;;){ const a = pk(r, [1, 2, 3, -1, -2]), b = pk(r, [1, 2, -1, -3]), c = ri(r, -3, 6), op = pk(r, ['gt', 'ge', 'lt', 'le']), q = [a, b, op, c];
    const pts = []; while(pts.length < 4){ const t = [ri(r, -3, 4), ri(r, -3, 4)]; if(!pts.some(u => u[0] === t[0] && u[1] === t[1])) pts.push(t); }
    const ok = pts.filter(t => sat(q, t)); if(ok.length !== 1) continue;
    return mcq('Nhận biết', `Miền nghiệm của bất phương trình ${M(ineq(q))} là nửa mặt phẳng chứa điểm`, M(Pt(ok[0])), pts.filter(t => t !== ok[0]).map(t => M(Pt(t))),
      p(`Thay toạ độ vào vế trái: ${M(`${a}\\cdot ${ok[0][0] < 0 ? `(${ok[0][0]})` : ok[0][0]} + ${b < 0 ? `(${b})` : b}\\cdot ${ok[0][1] < 0 ? `(${ok[0][1]})` : ok[0][1]} = ${a * ok[0][0] + b * ok[0][1]}`)} thoả ${M(`${OPT[op]} ${c}`)}; ba điểm còn lại không thoả.`)); }
};
MC.sysPoint = r => {
  for(;;){ const rows = [[1, 0, 'ge', ri(r, -1, 1)], [0, 1, 'ge', ri(r, -1, 1)], [pk(r, [1, 2, 3]), pk(r, [1, 2]), 'le', ri(r, 5, 9)]], extra = r() < .6 ? [[pk(r, [1, -1]), pk(r, [2, 1, -1]), pk(r, ['le', 'ge']), ri(r, -2, 3)]] : [];
    const S = [...rows, ...extra], pts = []; while(pts.length < 4){ const t = [ri(r, -2, 5), ri(r, -2, 5)]; if(!pts.some(u => u[0] === t[0] && u[1] === t[1])) pts.push(t); }
    const ok = pts.filter(t => S.every(q => sat(q, t))); if(ok.length !== 1) continue;
    return mcq('Thông hiểu', `Cho hệ bất phương trình ${M(SYS(S.map(ineq)))}. Điểm nào sau đây thuộc miền nghiệm của hệ?`, M(Pt(ok[0])), pts.filter(t => t !== ok[0]).map(t => M(Pt(t))),
      p('Điểm thuộc miền nghiệm khi thoả mãn <b>đồng thời</b> mọi bất phương trình của hệ. Thử lần lượt từng điểm.') + p(`Chỉ ${M(Pt(ok[0]))} thoả mãn cả ${S.length} bất phương trình.`)); }
};
MC.isLin = r => {
  const a = pk(r, [2, 3, 5]), b = pk(r, [1, 2, 4]), c = ri(r, 2, 9), o = pk(r, ['gt', 'ge', 'lt', 'le']), good = `${a}x ${r() < .5 ? '+' : '-'} ${b}y ${OPT[o]} ${c}`;
  const bad = shuf(r, [`x^2 + ${b}y ${OPT[o]} ${c}`, `${a}xy - y ${OPT[o]} ${c}`, `\\dfrac{${a}}{x} + y ${OPT[o]} ${c}`, `\\sqrt{x} - ${b}y ${OPT[o]} ${c}`, `x + y^2 ${OPT[o]} ${c}`]);
  return mcq('Nhận biết', 'Bất phương trình nào sau đây là bất phương trình bậc nhất hai ẩn?', M(good), bad.map(M), p(`Dạng ${M('ax + by \\lt c')} (hoặc ${M('\\gt, \\le, \\ge')}) với ${M('a, b')} không đồng thời bằng 0: ${M(good)}. Các biểu thức còn lại chứa ẩn ở dạng bình phương, tích hai ẩn, phân thức hoặc căn thức.`));
};
MC.figSys = r => {
  const pool = [[1, 1, 3], [1, -1, 1], [2, 1, 4], [1, 2, 4], [1, -2, -2], [3, 1, 6], [1, 0, 2], [0, 1, 2], [1, -1, -1]], strict = r() < .6;
  for(;;){ const L = shuf(r, pool).slice(0, 2), s = L.map(() => pk(r, ['gt', 'lt']));
    const ok = L[0][0] * L[1][1] - L[0][1] * L[1][0]; if(!ok) continue;
    const row = (l, o) => [l[0], l[1], strict ? o : (o === 'gt' ? 'ge' : 'le'), l[2]], good = [row(L[0], s[0]), row(L[1], s[1])];
    const flip = (rows, i) => rows.map((q, j) => j === i ? [q[0], q[1], NEG[q[2]], q[3]] : q);
    const opts = [good, flip(good, 0), flip(good, 1), flip(flip(good, 0), 1)].map(S => M(SYS(S.map(ineq))));
    const fig = planeSVG({x:[-3, 6], y:[-3, 6], lines:L.map((l, i) => [l[0], l[1], l[2], strict, `d${i + 1}`]), hatch:L.map((l, i) => s[i] === 'lt' ? [l[0], l[1], l[2]] : [-l[0], -l[1], -l[2]])});
    return mcq('Thông hiểu', `Phần <b>không bị gạch</b> trong hình dưới đây (${strict ? 'không kể biên' : 'kể cả biên'}) là miền nghiệm của hệ bất phương trình nào?` + FIG(fig, 250), opts[0], opts.slice(1),
      p(`Mỗi đường thẳng biên vẽ ${strict ? 'nét đứt (bất phương trình ngặt)' : 'nét liền (có dấu bằng)'}. Lấy một điểm thử (ví dụ gốc toạ độ nếu không nằm trên đường) để xác định phía được giữ lại của mỗi đường.`) + p(`Hệ đúng: ${M(SYS(good.map(ineq)))}.`)); }
};
MC.trig = r => {
  for(;;){ const a = ri(r, 1, 4), b = ri(r, 1, 4), c = ri(r, 1, 3), sa = pk(r, [30, 150, 90, 0]), cb = pk(r, [60, 120, 180, 90, 0]), tc = pk(r, [45, 135]), s1 = pk(r, [1, -1]), s2 = pk(r, [1, -1]);
    const v = (A, B, C) => s1 * a * MS.sin[sa][0] / MS.sin[sa][1] * A + s2 * b * MS.cos[cb][0] / MS.cos[cb][1] * B + c * (tc === 45 ? 1 : -1) * C;      // sin·A + cos·B + tan·C (A,B,C ∈ {±1} để tạo nhiễu)
    const val = v(1, 1, 1), tex = x => { const n = Math.round(x * 2); return num(n, 2); };
    const cands = [v(1, -1, 1), v(1, 1, -1), v(-1, 1, 1), v(1, -1, -1)].map(tex), c0 = tex(val);
    if(new Set([c0, ...cands]).size < 4) continue;
    const E = `${s1 < 0 ? '-' : ''}${a === 1 ? '' : a}\\sin ${sa}^\\circ ${s2 < 0 ? '-' : '+'} ${b === 1 ? '' : b}\\cos ${cb}^\\circ + ${c === 1 ? '' : c}\\tan ${tc}^\\circ`;
    return mcq('Thông hiểu', `Giá trị của biểu thức ${M(`P = ${E}`)} bằng`, M(c0), cands.map(M),
      p(`${M(`\\sin ${sa}^\\circ = ${num(...MS.sin[sa].slice(0, 2))}`)}; ${M(`\\cos ${cb}^\\circ = ${num(...MS.cos[cb].slice(0, 2))}`)}; ${M(`\\tan ${tc}^\\circ = ${tc === 45 ? 1 : -1}`)} (hai góc bù nhau có sin bằng nhau, côsin và tang đối nhau).`) + p(`Suy ra ${M(`P = ${c0}`)}.`)); }
};
MC.cosLaw = r => {
  const A = pk(r, [60, 120, 90]), [b, c, a] = pk(r, A === 60 ? P60 : A === 120 ? P120 : P90), sign = A === 60 ? -1 : 1, mid = A === 90 ? 0 : sign * b * c;
  const cands = [A === 90 ? `\\sqrt{${b*b + c*c + b*c}}` : `\\sqrt{${b*b + c*c - mid}}`, `\\sqrt{${b*b + c*c}}`, `${b + c}`, `\\sqrt{${(b + c) * (b + c) - b * c}}`, `${a + 1}`, `${Math.abs(b - c)}`].map(M);
  return mcq('Thông hiểu', `Tam giác ${M('ABC')} có ${M(`AB = ${c},\\ AC = ${b}`)} và ${M(`\\widehat{A} = ${A}^\\circ`)}. Độ dài cạnh ${M('BC')} bằng` + FIG(triSVG({a, b, c, la:'?', lb:String(b), lc:String(c), gA:`${A}°`}), 200), M(a), cands,
    p(`${M(`BC^2 = AB^2 + AC^2 - 2\\cdot AB\\cdot AC\\cdot\\cos A = ${c*c} + ${b*b} ${A === 90 ? '' : `${A === 60 ? '-' : '+'} ${b*c}`} = ${a*a}`)}.`) + p(`Vậy ${M(`BC = ${a}`)}.`));
};
MC.sinLaw = r => {
  const A = pk(r, [30, 45, 60, 90, 150]), k = ri(r, 3, 9), a = A === 30 || A === 150 ? `${k}` : A === 90 ? `${2 * k}` : A === 45 ? `${k}\\sqrt{2}` : `${k}\\sqrt{3}`;
  return mcq('Thông hiểu', `Tam giác ${M('ABC')} có ${M(`BC = ${a}`)} và ${M(`\\widehat{A} = ${A}^\\circ`)}. Bán kính ${M('R')} của đường tròn ngoại tiếp tam giác bằng`, M(k), [M(2 * k), M(k + 2), M(`${k}\\sqrt{2}`), M(`${k}\\sqrt{3}`), M(`\\dfrac{${k}}{2}`)].filter(x => x !== M(k)),
    p(`${M(`R = \\dfrac{BC}{2\\sin A} = \\dfrac{${a}}{2\\cdot ${num(...MS.sin[A])}} = ${k}`)}.`));
};
MC.angleType = r => {
  const t = pk(r, [0, 1, 2]);
  for(;;){ let s; if(t === 1){ const k = ri(r, 1, 3), T = pk(r, [[3, 4, 5], [5, 12, 13], [6, 8, 10]]); s = T.map(x => x * (T[0] === 6 ? 1 : k)); } else s = [ri(r, 4, 14), ri(r, 4, 14), ri(r, 4, 14)].sort((x, y) => x - y);
    const [c, b, a] = s, d = b*b + c*c - a*a; if(a >= b + c || (t !== 1 && Math.sign(d) !== (t === 0 ? 1 : -1))) continue;
    const K = ['Tam giác nhọn', 'Tam giác vuông', 'Tam giác tù'], ans = d > 0 ? 0 : d === 0 ? 1 : 2;
    return mcq('Thông hiểu', `Tam giác có độ dài ba cạnh là ${M(`${c},\\ ${b},\\ ${a}`)} là`, K[ans], K.filter((_, i) => i !== ans).concat(['Tam giác cân']),
      p(`Cạnh lớn nhất là ${M(a)}: ${M(`${b}^2 + ${c}^2 - ${a}^2 = ${d}`)} ${d > 0 ? '> 0' : d === 0 ? '= 0' : '< 0'}, nên góc lớn nhất ${d > 0 ? 'nhọn' : d === 0 ? 'vuông' : 'tù'}.`)); }
};
setBai(MC, ['listSet', 'isProp', 'negQuant', 'negSimple', 'setOp', 'setFinite'], 1);
setBai(MC, ['halfPlane', 'sysPoint', 'isLin', 'figSys'], 2);
setBai(MC, ['triArea', 'trig', 'cosLaw', 'sinLaw', 'angleType'], 3);

/* =====================================================================
   PHẦN II – ĐÚNG/SAI (mỗi hàm: (r, ci) → {stem, items:[{t:[câu ĐÚNG, câu SAI], s:[lời giải ứng với câu đúng, câu sai]}×4]})
   ===================================================================== */
const TF = {};
TF.venn = r => {
  const N = pk(r, [40, 45, 48, 50]), a = ri(r, 16, 24), b = ri(r, 12, 20), c = ri(r, 6, 10), u = a + b - c, cls = pk(r, ['10A', '10B', '10C']);
  const [n1, n2] = pk(r, [['bóng đá', 'bóng rổ'], ['cờ vua', 'bóng bàn'], ['cầu lông', 'bóng chuyền']]);
  const fig = FIG(venn2SVG({labelA:'CLB ' + n1, labelB:'CLB ' + n2, aOnly:null, both:c, bOnly:null, none:null}), 240);
  return {stem:`Lớp ${cls} có ${N} học sinh, trong đó ${a} học sinh tham gia câu lạc bộ ${n1}, ${b} học sinh tham gia câu lạc bộ ${n2} và ${c} học sinh tham gia cả hai câu lạc bộ. Xét tính đúng sai của các mệnh đề sau:` + fig, items:[
    {t:[`Có ${a - c} học sinh chỉ tham gia câu lạc bộ ${n1}.`, `Có ${a - c + 2} học sinh chỉ tham gia câu lạc bộ ${n1}.`], s:[p(`${M(`${a} - ${c} = ${a - c}`)}.`), p(`Số học sinh chỉ tham gia CLB ${n1} là ${M(`${a} - ${c} = ${a - c}`)}, không phải ${a - c + 2}.`)]},
    {t:[`Có ${u} học sinh tham gia ít nhất một trong hai câu lạc bộ.`, `Có ${a + b} học sinh tham gia ít nhất một trong hai câu lạc bộ.`], s:[p(`${M(`n(A \\cup B) = ${a} + ${b} - ${c} = ${u}`)}.`), p(`Phải trừ phần giao đã đếm hai lần: ${M(`${a} + ${b} - ${c} = ${u}`)}, không phải ${a + b}.`)]},
    {t:[`Có ${N - a} học sinh không tham gia câu lạc bộ ${n1}.`, `Có ${N - a - c} học sinh không tham gia câu lạc bộ ${n1}.`], s:[p(`${M(`${N} - ${a} = ${N - a}`)}.`), p(`Số học sinh không tham gia CLB ${n1} là ${M(`${N} - ${a} = ${N - a}`)}; trừ thêm ${c} là sai.`)]},
    {t:[`Có ${N - u} học sinh không tham gia câu lạc bộ nào.`, `Có ${N - u + c} học sinh không tham gia câu lạc bộ nào.`], s:[p(`${M(`${N} - ${u} = ${N - u}`)}.`), p(`Số học sinh không tham gia CLB nào là ${M(`${N} - ${u} = ${N - u}`)}.`)]}]};
};
TF.height = r => {
  const k = pk(r, [10, 12, 15, 20, 25]), h = pk(r, [8, 10, 12, 15]), d = `${k}\\sqrt{3}`, lowH = h + k, flag = 2 * k;
  const fig = FIG(obsSVG({h:`${h} m`, d:`${k}√3 m`, a:'30°', b:'60°', hb:'?', hf:'?'}), 250);
  return {stem:`Để đo chiều cao toà nhà và cột cờ đặt trên nóc toà nhà, anh Bắc đứng tại điểm ${M('P')} trên đài quan sát cao ${h} m so với mặt đất, cách toà nhà (theo phương ngang) ${M(`${d}`)} m. Từ ${M('P')} anh nhìn thấy chân cột cờ (điểm ${M('C')}) dưới góc ${M('30^\\circ')} và đỉnh cột cờ (điểm ${M('D')}) dưới góc ${M('60^\\circ')} so với phương nằm ngang. Xét tính đúng sai của các mệnh đề sau:` + fig, items:[
    {t:[`Góc ${M('\\widehat{CPD}')} bằng ${M('30^\\circ')}.`, `Góc ${M('\\widehat{CPD}')} bằng ${M('60^\\circ')}.`], s:[p(`${M('\\widehat{CPD} = 60^\\circ - 30^\\circ = 30^\\circ')}.`), p(`${M('\\widehat{CPD} = 60^\\circ - 30^\\circ = 30^\\circ')}, không phải ${M('60^\\circ')}.`)]},
    {t:[`Phần toà nhà cao hơn tầm mắt anh Bắc (từ ngang tầm mắt đến chân cột cờ) cao ${k} m.`, `Phần toà nhà cao hơn tầm mắt anh Bắc (từ ngang tầm mắt đến chân cột cờ) cao ${3 * k} m.`], s:[p(`${M(`${d}\\cdot\\tan 30^\\circ = ${k}\\sqrt{3}\\cdot\\dfrac{1}{\\sqrt{3}} = ${k}`)}.`), p(`${M(`${d}\\cdot\\tan 30^\\circ = ${k}`)}; ${3 * k} m là độ cao tới đỉnh cột cờ so với tầm mắt.`)]},
    {t:[`Toà nhà cao ${lowH} m.`, `Toà nhà cao ${h + 3 * k} m.`], s:[p(`Chiều cao toà nhà = chiều cao đài quan sát + phần cao hơn tầm mắt = ${M(`${h} + ${k} = ${lowH}`)} (m).`), p(`Toà nhà cao ${M(`${h} + ${k} = ${lowH}`)} m; ${h + 3 * k} m là độ cao đỉnh cột cờ.`)]},
    {t:[`Cột cờ cao ${flag} m.`, `Cột cờ cao ${3 * k} m.`], s:[p(`Cột cờ = ${M(`${d}(\\tan 60^\\circ - \\tan 30^\\circ) = ${3 * k} - ${k} = ${flag}`)} (m).`), p(`${3 * k} m là độ cao của đỉnh cột cờ so với tầm mắt; cột cờ cao ${3 * k} - ${k} = ${flag} m.`)]}]};
};
TF.trig = r => {
  const [p0, q0, h0] = pk(r, [[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25]]), obt = r() < .6, giveSin = r() < .5;
  const sn = giveSin ? p0 : q0, cs = giveSin ? q0 : p0, sgn = obt ? -1 : 1, name = giveSin ? '\\sin' : '\\cos';
  const stem = giveSin ? `Cho góc ${M('\\alpha')} thoả mãn ${M(`\\sin\\alpha = ${num(sn, h0)}`)} và ${obt ? M('90^\\circ \\lt \\alpha \\lt 180^\\circ') : M('0^\\circ \\lt \\alpha \\lt 90^\\circ')}. Xét tính đúng sai của các mệnh đề sau:`
    : `Cho góc ${M('\\alpha')} thoả mãn ${M(`\\cos\\alpha = ${num(sgn * cs, h0)}`)} và ${M('0^\\circ \\lt \\alpha \\lt 180^\\circ')}. Xét tính đúng sai của các mệnh đề sau:`;
  const cosV = giveSin ? sgn * cs : sgn * cs, sinV = giveSin ? sn : sn;   // cosα = sgn·cs ; sinα = sn (dương vì 0°<α<180°)
  const ccos = num(cosV, h0), cwrong = num(-cosV, h0), t = num(sinV, cosV), tw = num(sinV, -cosV), ct = num(cosV, sinV), ctw = num(-cosV, sinV), sc = num(sinV + cosV, h0), scw = num(sinV - cosV, h0);
  return {stem, items:[
    {t:[`${M(`\\cos\\alpha = ${ccos}`)}.`, `${M(`\\cos\\alpha = ${cwrong}`)}.`], s:[p(`${M(`\\cos^2\\alpha = 1 - \\sin^2\\alpha`)} nên ${M(`|\\cos\\alpha| = ${num(cs, h0)}`)}; ${cosV < 0 ? 'góc tù nên côsin âm' : 'góc nhọn nên côsin dương'}: ${M(`\\cos\\alpha = ${ccos}`)}.`), p(`Dấu của côsin: ${cosV < 0 ? 'góc tù → âm' : 'góc nhọn → dương'}. Giá trị đúng là ${M(ccos)}, không phải ${M(cwrong)}.`)]},
    {t:[`${M(`\\tan\\alpha = ${t}`)}.`, `${M(`\\tan\\alpha = ${tw}`)}.`], s:[p(`${M(`\\tan\\alpha = \\dfrac{\\sin\\alpha}{\\cos\\alpha} = ${t}`)}.`), p(`${M(`\\tan\\alpha = \\dfrac{\\sin\\alpha}{\\cos\\alpha} = ${t}`)}, không phải ${M(tw)}.`)]},
    {t:[`${M(`\\cot\\alpha = ${ct}`)}.`, `${M(`\\cot\\alpha = ${ctw}`)}.`], s:[p(`${M(`\\cot\\alpha = \\dfrac{\\cos\\alpha}{\\sin\\alpha} = ${ct}`)}.`), p(`${M(`\\cot\\alpha = ${ct}`)}, không phải ${M(ctw)}.`)]},
    {t:[`${M(`\\sin\\alpha + \\cos\\alpha = ${sc}`)}.`, `${M(`\\sin\\alpha + \\cos\\alpha = ${scw}`)}.`], s:[p(`${M(`\\sin\\alpha + \\cos\\alpha = ${num(sinV, h0)} + (${num(cosV, h0)}) = ${sc}`)}.`), p(`Tổng đúng là ${M(sc)}, không phải ${M(scw)}.`)]}]};
};
TF.lp = r => {
  const [u, v] = pk(r, [['A', 'B'], ['I', 'II']]); let m1, m2, T, N, p1, q1, cons, V, vals, best, bi;
  for(let t = 0; t < 5000; t++){ m1 = pk(r, [2, 3, 4]); m2 = pk(r, [1, 2]); T = ri(r, 8, 24); N = ri(r, 6, 10); p1 = pk(r, [3, 4, 5]); q1 = pk(r, [2, 3]);
    cons = [[m1, m2, T, 'le'], [1, 1, N, 'le']]; V = vertices(cons); vals = V.map(([x, y]) => p1 * x + q1 * y); best = Math.max(...vals); bi = vals.indexOf(best);
    if(V.length === 4 && V.every(q => Number.isInteger(q[0]) && Number.isInteger(q[1])) && vals.filter(x => x === best).length === 1) break; if(t === 4999) throw new Error('TF.lp: không tìm được tham số'); }
  const goodPt = pk(r, [[1, 2], [2, 2], [2, 3], [1, 3]]), badPt = [Math.floor(T / m1) + 1, 0], F = (x, y) => p1 * x + q1 * y;
  const wrongMax = best + pk(r, [2, 3, 4]), second = Math.max(...vals.filter(x => x !== best), best - 3);
  return {stem:`Một xưởng sản xuất hai loại sản phẩm ${u} và ${v}. Mỗi ngày xưởng làm ${M('x')} sản phẩm ${u} và ${M('y')} sản phẩm ${v} (${M('x, y \\ge 0')}). Mỗi sản phẩm ${u} cần ${m1} giờ máy, mỗi sản phẩm ${v} cần ${m2} giờ máy; máy chạy tối đa ${T} giờ/ngày. Tổng số sản phẩm mỗi ngày không vượt quá ${N}. Lãi mỗi sản phẩm ${u} là ${p1} triệu đồng, mỗi sản phẩm ${v} là ${q1} triệu đồng. Xét tính đúng sai của các mệnh đề sau:`, items:[
    {t:[`Các ràng buộc là ${M(`x \\ge 0,\\ y \\ge 0,\\ ${lin(m1, m2)} \\le ${T},\\ x + y \\le ${N}`)}.`, `Các ràng buộc là ${M(`x \\ge 0,\\ y \\ge 0,\\ ${lin(m1, m2)} \\ge ${T},\\ x + y \\le ${N}`)}.`], s:[p('Máy chạy <b>tối đa</b> nên dùng dấu ' + M('\\le') + '; tổng sản phẩm không vượt quá nên ' + M(`x + y \\le ${N}`) + '.'), p('“Tối đa” tương ứng với dấu ' + M('\\le') + ', không phải ' + M('\\ge') + '.')]},
    {t:[`Phương án làm ${goodPt[0]} sản phẩm ${u} và ${goodPt[1]} sản phẩm ${v} thoả mãn mọi ràng buộc.`, `Phương án làm ${badPt[0]} sản phẩm ${u} và ${badPt[1]} sản phẩm ${v} thoả mãn mọi ràng buộc.`], s:[p(`${M(`${m1}\\cdot ${goodPt[0]} + ${m2}\\cdot ${goodPt[1]} = ${m1 * goodPt[0] + m2 * goodPt[1]} \\le ${T}`)} và ${M(`${goodPt[0]} + ${goodPt[1]} \\le ${N}`)}.`), p(`${M(`${m1}\\cdot ${badPt[0]} = ${m1 * badPt[0]} \\gt ${T}`)}: vượt quá giờ máy cho phép.`)]},
    {t:[`Làm ${goodPt[0]} sản phẩm ${u} và ${goodPt[1]} sản phẩm ${v} mỗi ngày thì lãi ${F(...goodPt)} triệu đồng.`, `Làm ${goodPt[0]} sản phẩm ${u} và ${goodPt[1]} sản phẩm ${v} mỗi ngày thì lãi ${F(...goodPt) + p1} triệu đồng.`], s:[p(`${M(`F = ${p1}\\cdot ${goodPt[0]} + ${q1}\\cdot ${goodPt[1]} = ${F(...goodPt)}`)}.`), p(`${M(`F = ${p1}\\cdot ${goodPt[0]} + ${q1}\\cdot ${goodPt[1]} = ${F(...goodPt)}`)}, không phải ${F(...goodPt) + p1}.`)]},
    {t:[`Lãi lớn nhất mỗi ngày là ${best} triệu đồng.`, `Lãi lớn nhất mỗi ngày là ${wrongMax} triệu đồng.`], s:[p(`Các đỉnh của miền nghiệm: ${M(V.map(Pt).join(',\\ '))}; giá trị ${M(`F = ${p1}x + ${q1}y`)} tại các đỉnh: ${vals.join('; ')}. Lớn nhất là ${best} tại ${M(Pt(V[bi]))}.`), p(`Lãi lớn nhất là ${best} (tại đỉnh ${M(Pt(V[bi]))}), không phải ${wrongMax}.`)]}]};
};
TF.sets = r => {
  const pool = shuf(r, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]), both = pool.slice(0, 2).sort((x, y) => x - y), ao = pool.slice(2, 5).sort((x, y) => x - y), bo = pool.slice(5, 7).sort((x, y) => x - y);
  const A = [...both, ...ao].sort((x, y) => x - y), B = [...both, ...bo].sort((x, y) => x - y), U = [...A, ...bo].sort((x, y) => x - y), n = A.length;
  return {stem:`Cho hai tập hợp ${M(`A = ${setTex(A)}`)} và ${M(`B = ${setTex(B)}`)}. Xét tính đúng sai của các mệnh đề sau:`, items:[
    {t:[`${M(`A \\cap B = ${setTex(both)}`)}.`, `${M(`A \\cap B = ${setTex(ao)}`)}.`], s:[p('Phần tử chung của hai tập hợp.'), p(`Các phần tử chung là ${M(setTex(both))}.`)]},
    {t:[`Tập hợp ${M('A \\cup B')} có ${U.length} phần tử.`, `Tập hợp ${M('A \\cup B')} có ${A.length + B.length} phần tử.`], s:[p(`${M(`n(A \\cup B) = ${A.length} + ${B.length} - ${both.length} = ${U.length}`)}.`), p(`Các phần tử chung chỉ ghi một lần: ${M(`${A.length} + ${B.length} - ${both.length} = ${U.length}`)}.`)]},
    {t:[`${M(`A \\setminus B = ${setTex(ao)}`)}.`, `${M(`A \\setminus B = ${setTex(bo)}`)}.`], s:[p('Phần tử của ' + M('A') + ' mà không thuộc ' + M('B') + '.'), p(`${M(setTex(bo))} là ${M('B \\setminus A')}, không phải ${M('A \\setminus B')}.`)]},
    {t:[`Tập hợp ${M('A')} có ${2 ** n} tập con.`, `Tập hợp ${M('A')} có ${2 * n} tập con.`], s:[p(`Tập hợp có ${n} phần tử có ${M(`2^{${n}} = ${2 ** n}`)} tập con.`), p(`Số tập con là ${M(`2^{${n}} = ${2 ** n}`)}, không phải ${M(`2\\cdot ${n}`)}.`)]}]};
};
TF.tri = r => {
  const [a0, b0, c0, S0] = pk(r, HERON), k = pk(r, [1, 1, 2]), a = a0 * k, b = b0 * k, c = c0 * k, S = S0 * k * k, pp = (a + b + c) / 2, d = b * b + c * c - a * a, kind = d > 0 ? 'nhọn' : d === 0 ? 'vuông' : 'tù';
  const other = d > 0 ? 'tù' : 'nhọn';
  const Rn = a * b * c, Rd = 4 * S, rr = S / pp;
  return {stem:`Cho tam giác ${M('ABC')} có ${M(`BC = ${a},\\ CA = ${b},\\ AB = ${c}`)}. Xét tính đúng sai của các mệnh đề sau:` + FIG(triSVG({a, b, c, la:String(a), lb:String(b), lc:String(c)}), 200), items:[
    {t:[`${M(`\\cos A = ${num(d, 2 * b * c)}`)}.`, `${M(`\\cos A = ${num(-d, 2 * b * c)}`)}.`], s:[p(`${M(`\\cos A = \\dfrac{b^2 + c^2 - a^2}{2bc} = \\dfrac{${b*b} + ${c*c} - ${a*a}}{${2*b*c}} = ${num(d, 2*b*c)}`)}.`), p(`Dùng đúng dấu: ${M(`\\cos A = \\dfrac{b^2 + c^2 - a^2}{2bc} = ${num(d, 2*b*c)}`)}.`)]},
    {t:[`Góc ${M('A')} là góc ${kind === 'vuông' ? 'vuông' : kind}.`, `Góc ${M('A')} là góc ${kind === 'vuông' ? 'tù' : other}.`], s:[p(`${M(`\\cos A = ${num(d, 2*b*c)}`)} ${d > 0 ? '> 0' : d === 0 ? '= 0' : '< 0'} nên góc ${M('A')} ${kind}.`), p(`Dấu của ${M('\\cos A')} cho biết góc ${M('A')} là góc ${kind}.`)]},
    {t:[`Diện tích tam giác ${M('ABC')} bằng ${S}.`, `Diện tích tam giác ${M('ABC')} bằng ${S + k * k * 2}.`], s:[p(`${M(`p = ${pp}`)}; Heron: ${M(`S = \\sqrt{p(p-a)(p-b)(p-c)} = ${S}`)}.`), p(`Theo công thức Heron ${M(`S = ${S}`)}.`)]},
    {t:[`Bán kính đường tròn nội tiếp tam giác bằng ${M(num(S, pp))}.`, `Bán kính đường tròn nội tiếp tam giác bằng ${M(num(S, 2 * pp))}.`], s:[p(`${M(`r = \\dfrac{S}{p} = \\dfrac{${S}}{${pp}} = ${num(S, pp)}`)}.`), p(`Phải chia cho nửa chu vi ${M(`p = ${pp}`)}: ${M(`r = ${num(S, pp)}`)}.`)]}]};
};
TF.venn.bai = 1; TF.sets.bai = 1; TF.height.bai = 3; TF.trig.bai = 3; TF.tri.bai = 3; TF.lp.bai = 2;

/* =====================================================================
   PHẦN III – TRẢ LỜI NGẮN (mỗi hàm: (r, ci) → {q, ans (số), sol})
   ===================================================================== */
const SH = {};
SH.tree = r => {
  for(;;){ const al = pk(r, [25, 30, 35]), be = pk(r, [45, 50, 55, 60]), d = ri(r, 12, 30), rad = x => x * Math.PI / 180;
    const h = d * Math.sin(rad(al)) * Math.sin(rad(be)) / Math.sin(rad(be - al)); if(!safeRound(h, 1)) continue; const ans = Math.round(h);
    return {q:`Từ vị trí ${M('A')} người ta quan sát ngọn cây ${M('T')} dưới góc ${M(`${al}^\\circ`)} so với mặt đất; tiến thẳng về phía gốc cây ${d} m đến vị trí ${M('B')} thì nhìn ngọn cây dưới góc ${M(`${be}^\\circ`)} (hình vẽ). Tính chiều cao của cây (đơn vị: mét, làm tròn đến hàng đơn vị).` + FIG(treeSVG({d:`${d} m`, a:`${al}°`, b:`${be}°`, h:'?'}), 250), ans,
      sol:p(`${M(`\\widehat{ATB} = ${be}^\\circ - ${al}^\\circ = ${be - al}^\\circ`)} (góc ngoài của tam giác ${M('ATB')}).`) + p(`Định lí sin trong tam giác ${M('ATB')}: ${M(`\\dfrac{BT}{\\sin ${al}^\\circ} = \\dfrac{AB}{\\sin ${be - al}^\\circ}`)} ⇒ ${M(`BT = \\dfrac{${d}\\sin ${al}^\\circ}{\\sin ${be - al}^\\circ} \\approx ${fmt(d * Math.sin(rad(al)) / Math.sin(rad(be - al)))}`)}.`) + p(`Chiều cao ${M(`TH = BT\\sin ${be}^\\circ \\approx ${fmt(h)}`)}. Làm tròn: <b>${ans}</b> m.`)}; }
};
SH.eqTri = r => {
  for(;;){ const Rr = ri(r, 3, 12), S = 3 * Math.sqrt(3) * Rr * Rr / 4; if(!safeRound(S, .1)) continue; const ans = R1(S);
    return {q:`Tam giác đều ${M('ABC')} nội tiếp đường tròn bán kính ${M(`R = ${Rr}`)} cm. Tính diện tích của tam giác đó (đơn vị: ${M('cm^2')}, làm tròn đến hàng phần mười).` + FIG(circTriSVG({R:`R = ${Rr}`}), 200), ans,
      sol:p(`Tam giác đều cạnh ${M('a')}: ${M('R = \\dfrac{a}{2\\sin 60^\\circ} = \\dfrac{a}{\\sqrt{3}}')} ⇒ ${M(`a = ${Rr}\\sqrt{3}`)}.`) + p(`${M(`S = \\dfrac{1}{2}a^2\\sin 60^\\circ = \\dfrac{1}{2}\\cdot ${3 * Rr * Rr}\\cdot\\dfrac{\\sqrt{3}}{2} = ${num(3 * Rr * Rr, 4, 3)} \\approx ${fmt(S)}`)}. Đáp số: <b>${fmt(ans)}</b>.`)}; }
};
SH.lpMin = r => {
  for(;;){ const [a1, b1, c1, a2, b2, c2] = [ri(r, 1, 4), ri(r, 1, 3), ri(r, 6, 14), ri(r, 1, 3), ri(r, 1, 4), ri(r, 6, 14)], pX = ri(r, 3, 9), pY = ri(r, 3, 9);
    const V = vertices([[a1, b1, c1, 'ge'], [a2, b2, c2, 'ge']]); if(V.length < 3 || !V.every(q => Number.isInteger(q[0]) && Number.isInteger(q[1]))) continue; const vals = V.map(([x, y]) => pX * x + pY * y), mn = Math.min(...vals), bi = vals.indexOf(mn);
    if(vals.filter(v => Math.abs(v - mn) < 1e-9).length > 1 || !safeRound(mn, .1)) continue; const ans = Math.round(mn * 10) / 10;
    return {q:`Một hợp tác xã trộn hai loại thức ăn ${M('X')} và ${M('Y')}. Mỗi bao loại ${M('X')} chứa ${a1} đơn vị chất ${M('A')} và ${a2} đơn vị chất ${M('B')}; mỗi bao loại ${M('Y')} chứa ${b1} đơn vị chất ${M('A')} và ${b2} đơn vị chất ${M('B')}. Hỗn hợp cần ít nhất ${c1} đơn vị chất ${M('A')} và ${c2} đơn vị chất ${M('B')}. Giá mỗi bao loại ${M('X')} là ${pX} nghìn đồng, loại ${M('Y')} là ${pY} nghìn đồng. Tìm chi phí nhỏ nhất (đơn vị: nghìn đồng).`, ans,
      sol:p(`Gọi ${M('x, y')} là số bao loại ${M('X, Y')}: ${M(SYS([`x \\ge 0`, `y \\ge 0`, `${lin(a1, b1)} \\ge ${c1}`, `${lin(a2, b2)} \\ge ${c2}`]))}; chi phí ${M(`F = ${lin(pX, pY)}`)}.`) + p(`Các đỉnh của miền nghiệm: ${M(V.map(([x, y]) => `(${fmt(x)};\\ ${fmt(y)})`).join(',\\ '))}; giá trị ${M('F')}: ${vals.map(fmt).join('; ')}.`) + p(`Giá trị nhỏ nhất: <b>${fmt(ans)}</b> nghìn đồng.`)}; }
};
SH.vennShort = r => {
  const N = pk(r, [40, 45, 50]), a = ri(r, 18, 26), b = ri(r, 14, 22), c = ri(r, 6, 11), u = a + b - c, ask = pk(r, ['none', 'only', 'atleast']);
  const Q = {none:[N - u, 'không tham gia câu lạc bộ nào', `${M(`${N} - (${a} + ${b} - ${c}) = ${N - u}`)}`], only:[a + b - 2 * c, 'chỉ tham gia đúng một trong hai câu lạc bộ', `${M(`(${a} - ${c}) + (${b} - ${c}) = ${a + b - 2 * c}`)}`], atleast:[u, 'tham gia ít nhất một trong hai câu lạc bộ', `${M(`${a} + ${b} - ${c} = ${u}`)}`]}[ask];
  return {q:`Lớp có ${N} học sinh; ${a} em tham gia câu lạc bộ cờ vua, ${b} em tham gia câu lạc bộ bóng bàn, ${c} em tham gia cả hai. Có bao nhiêu em ${Q[1]}?` + FIG(venn2SVG({labelA:'Cờ vua', labelB:'Bóng bàn', aOnly:ask === 'only' ? '?' : null, both:c, bOnly:ask === 'only' ? '?' : null, none:ask === 'none' ? '?' : null}), 230), ans:Q[0], sol:p(`Số em tham gia ít nhất một CLB: ${M(`n(A \\cup B) = ${a} + ${b} - ${c} = ${u}`)}.`) + p(`Kết quả: ${Q[2]}. Đáp số: <b>${Q[0]}</b>.`)};
};
SH.cosRoad = r => {
  for(;;){ const A = pk(r, [50, 55, 65, 70, 100, 110, 115]), b = ri(r, 30, 80), c = ri(r, 30, 80), a = Math.sqrt(b * b + c * c - 2 * b * c * Math.cos(A * Math.PI / 180)); if(!safeRound(a, .1)) continue; const ans = R1(a);
    return {q:`Để đo khoảng cách giữa hai điểm ${M('B')} và ${M('C')} ở hai bên một hồ nước, người ta chọn điểm ${M('A')} sao cho ${M(`AB = ${c}`)} m, ${M(`AC = ${b}`)} m và ${M(`\\widehat{BAC} = ${A}^\\circ`)}. Tính khoảng cách ${M('BC')} (đơn vị: mét, làm tròn đến hàng phần mười).` + FIG(triSVG({a, b, c, la:'?', lb:`${b}`, lc:`${c}`, gA:`${A}°`}), 200), ans,
      sol:p(`${M(`BC^2 = AB^2 + AC^2 - 2\\cdot AB\\cdot AC\\cos A = ${c*c} + ${b*b} - 2\\cdot ${c}\\cdot ${b}\\cos ${A}^\\circ \\approx ${fmt(a * a)}`)}.`) + p(`${M(`BC \\approx ${fmt(a)}`)}. Làm tròn: <b>${fmt(ans)}</b> m.`)}; }
};
SH.heronR = r => {
  const [a0, b0, c0, S0] = pk(r, HERON), k = pk(r, [1, 2]), a = a0 * k, b = b0 * k, c = c0 * k, S = S0 * k * k, R = a * b * c / (4 * S), ask = pk(r, ['S', 'R']);
  if(ask === 'R' && !safeRound(R, .1)) return SH.heronR(r);
  const ans = ask === 'S' ? S : R1(R);
  return {q:`Tam giác ${M('ABC')} có ${M(`BC = ${a},\\ CA = ${b},\\ AB = ${c}`)}. Tính ${ask === 'S' ? 'diện tích của tam giác' : 'bán kính đường tròn ngoại tiếp tam giác (làm tròn đến hàng phần mười)'}.` + FIG(triSVG({a, b, c, la:String(a), lb:String(b), lc:String(c)}), 200), ans,
    sol:p(`${M(`p = \\dfrac{${a} + ${b} + ${c}}{2} = ${(a + b + c) / 2}`)}; ${M(`S = \\sqrt{p(p-a)(p-b)(p-c)} = ${S}`)}.`) + (ask === 'S' ? p(`Đáp số: <b>${S}</b>.`) : p(`${M(`R = \\dfrac{abc}{4S} = \\dfrac{${a * b * c}}{${4 * S}} \\approx ${fmt(R)}`)}. Đáp số: <b>${fmt(ans)}</b>.`))};
};
SH.subsets = r => {
  const n = ri(r, 3, 6), k = ri(r, 2, 4), m = ri(r, 12, 30), ask = pk(r, ['sub', 'proper', 'nonempty']), cnt = Math.floor((m - 1) / k) + 1 - 0;
  const elems = []; for(let x = 1; x <= m; x++) if(x % k === 0) elems.push(x); const nn = elems.length, tot = 2 ** nn;
  const Q = {sub:[tot, 'tập con', `${M(`2^{${nn}} = ${tot}`)}`], proper:[tot - 1, 'tập con thật sự', `${M(`2^{${nn}} - 1 = ${tot - 1}`)}`], nonempty:[tot - 1, 'tập con khác rỗng', `${M(`2^{${nn}} - 1 = ${tot - 1}`)}`]}[ask];
  return {q:`Cho tập hợp ${M(`A = \\{x \\in \\mathbb{N}^* \\mid x \\le ${m},\\ x \\text{ chia hết cho } ${k}\\}`)}. Tập hợp ${M('A')} có bao nhiêu ${Q[1]}?`, ans:Q[0],
    sol:p(`${M(`A = ${setTex(elems)}`)} có ${nn} phần tử.`) + p(`Số ${Q[1]}: ${Q[2]}. Đáp số: <b>${Q[0]}</b>.`)};
};
SH.angle = r => {
  const A = pk(r, [30, 45, 60, 120, 135, 150]), [b, c, a] = pk(r, P60.slice(0, 5)), bs = ri(r, 3, 12), cs = ri(r, 3, 12), area = bs * cs * MS.sin[A][0] / (2 * MS.sin[A][1]) * Math.sqrt(MS.sin[A][2]);
  if(!safeRound(area, .1)) return SH.angle(r);
  return {q:`Tam giác ${M('ABC')} có ${M(`AB = ${cs},\\ AC = ${bs}`)} và ${M(`\\widehat{A} = ${A}^\\circ`)}. Tính diện tích tam giác ${M('ABC')} (làm tròn đến hàng phần mười).` + FIG(triSVG({a:Math.sqrt(bs*bs + cs*cs - 2*bs*cs*Math.cos(A*Math.PI/180)), b:bs, c:cs, la:'', lb:String(bs), lc:String(cs), gA:`${A}°`}), 190), ans:R1(area),
    sol:p(`${M(`S = \\dfrac{1}{2}\\cdot ${cs}\\cdot ${bs}\\cdot\\sin ${A}^\\circ \\approx ${fmt(area)}`)}. Đáp số: <b>${fmt(R1(area))}</b>.`)};
};
SH.mixed = r => {      // số nghiệm nguyên / điểm nguyên của bất phương trình bậc nhất hai ẩn
  const k = ri(r, 4, 8), kind = pk(r, [0, 1]);
  if(kind === 0){ const ans = (k + 1) * (k + 2) / 2; return {q:`Có bao nhiêu cặp số nguyên không âm ${M('(x;\\ y)')} thoả mãn ${M(`x + y \\le ${k}`)}?`, ans, sol:p(`Với ${M(`x = 0, 1, \\ldots, ${k}`)} có ${M(`${k} - x + 1`)} giá trị của ${M('y')}.`) + p(`Tổng: ${M(`(${k}+1)+${k}+\\ldots+1 = ${ans}`)}. Đáp số: <b>${ans}</b>.`)}; }
  const a = ri(r, 2, 3), b = ri(r, 1, 2), c = ri(r, 8, 14); let cnt = 0; for(let x = 0; x <= c; x++) for(let y = 0; y <= c; y++) if(a * x + b * y <= c) cnt++;
  return {q:`Có bao nhiêu cặp số nguyên không âm ${M('(x;\\ y)')} thoả mãn ${M(`${lin(a, b)} \\le ${c}`)}?`, ans:cnt, sol:p(`Duyệt ${M('x')} từ ${M('0')} đến ${M(Math.floor(c / a))}; với mỗi ${M('x')} có ${M(`\\lfloor (${c} - ${a}x)/${b} \\rfloor + 1`)} giá trị của ${M('y')}.`) + p(`Tổng: <b>${cnt}</b>.`)};
};

/* =====================================================================
   5 ĐỀ: phân bổ dạng câu cho từng đề (tên hàm trong MC / TF / SH)
   ===================================================================== */
const PLAN = [
  {mc:['listSet', 'triArea', 'isProp', 'negQuant', 'setOp', 'negSimple', 'halfPlane', 'sysPoint', 'isLin', 'cosLaw', 'figSys', 'trig'], tf:['venn', 'height', 'trig', 'lp'], sh:['tree', 'eqTri', 'lpMin', 'cosRoad', 'subsets', 'mixed']},
  {mc:['setFinite', 'sinLaw', 'isProp', 'negSimple', 'setOp', 'negQuant', 'halfPlane', 'sysPoint', 'isLin', 'angleType', 'figSys', 'trig'], tf:['sets', 'lp', 'tri', 'height'], sh:['vennShort', 'heronR', 'lpMin', 'tree', 'mixed', 'angle']},
  {mc:['listSet', 'triArea', 'negQuant', 'isProp', 'setFinite', 'negSimple', 'isLin', 'figSys', 'halfPlane', 'cosLaw', 'sysPoint', 'trig'], tf:['trig', 'venn', 'lp', 'tri'], sh:['eqTri', 'subsets', 'cosRoad', 'lpMin', 'heronR', 'vennShort']},
  {mc:['setFinite', 'sinLaw', 'negSimple', 'negQuant', 'listSet', 'isProp', 'sysPoint', 'halfPlane', 'figSys', 'cosLaw', 'isLin', 'trig'], tf:['height', 'sets', 'trig', 'lp'], sh:['tree', 'vennShort', 'angle', 'mixed', 'lpMin', 'cosRoad']},
  {mc:['listSet', 'angleType', 'isProp', 'negQuant', 'setOp', 'negSimple', 'halfPlane', 'isLin', 'sysPoint', 'triArea', 'figSys', 'trig'], tf:['venn', 'tri', 'height', 'trig'], sh:['eqTri', 'heronR', 'subsets', 'lpMin', 'tree', 'cosRoad']},
];
// Câu trả lời ngắn: đáp số tối đa 4 kí tự (chuẩn đề THPT) – thử các hạt giống kế tiếp cho tới khi đạt
const shRun = (k, s0) => { for(let t = 0; t < 80; t++){ const q = SH[k](rng((s0 + t * 7919) >>> 0), 0); if(fmt(q.ans).length <= 4) return q; } throw new Error('SH.' + k + ': không sinh được đáp số ≤ 4 kí tự'); };
const seed = (n, slot, ci) => (n * 100003 + slot * 1009 + ci * 31 + 17) >>> 0;
const mcOf = (n, i, ci) => { const k = PLAN[n - 1].mc[i], x = MC[k](rng(seed(n, i, ci)), ci); return {...x, bai:MC[k].bai}; };
const tfOf = (n, i, ci) => { const k = PLAN[n - 1].tf[i], x = TF[k](rng(seed(n, 20 + i, ci)), ci); return {...x, bai:TF[k].bai}; };
const shOf = (n, i, ci) => shRun(PLAN[n - 1].sh[i], seed(n, 40 + i, ci));
globalThis.GK1 = {PLAN, MC, TF, SH, mcOf, tfOf, shOf, shRun, M, FIG, rng, seed, num, setTex, ivTex, ineq, lin, SYS, Pt, MS, vertices, fmt, p, P60, P120, P90, HERON};
})();
