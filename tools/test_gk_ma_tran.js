// Kiểm tra ĐỘC LẬP đề giữa kì theo ma trận (lớp 10 và 11): sinh mọi mã đề, kiểm lại đáp án bằng phép tính riêng.
// Chạy: node tools/test_gk_ma_tran.js
const fs = require('fs'), vm = require('vm'), path = require('path'), R = p => fs.readFileSync(path.join(__dirname, '..', p), 'utf8');
const ctx = {console, Math, tm: x => `\\(${x}\\)`, globalThis: null}; ctx.globalThis = ctx; vm.createContext(ctx);
vm.runInContext(R('assets/js/kiemtra.js') + ';this.KiemTra = KiemTra;', ctx);
['assets/js/figures.js', 'data/lop10-giua-ki-bank.js', 'data/lop11-giua-ki-bank.js', 'giao-vien/bai-giang/lop10-giua-ki-ma-tran.js', 'giao-vien/bai-giang/lop10-giua-ki-ma-tran-2.js', 'giao-vien/bai-giang/lop11-giua-ki-ma-tran.js', 'giao-vien/bai-giang/lop11-giua-ki-ma-tran-2.js'].forEach(f => vm.runInContext(R(f), ctx, {filename:f}));
const KT = ctx.KiemTra, bad = [], ok = (c, m) => { if(!c) bad.push(m); };
const T2 = KT.TESTS.find(t => t.grade === 'lop10' && t.id === 'gk-ma-tran-2');
const T = {10:KT.TESTS.find(t => t.grade === 'lop10' && t.id === 'gk-ma-tran'), 11:KT.TESTS.find(t => t.grade === 'lop11' && t.id === 'gk-ma-tran')};
const num = s => { const m = String(s).replace(/\\\(|\\\)|\\dfrac|[{}]/g, m => m === '\\dfrac' ? '' : '').match(/-?\d+[,.]?\d*/); return m ? parseFloat(m[0].replace(',', '.')) : NaN; };
const plain = s => String(s).replace(/\\\(|\\\)/g, '').replace(/\{,\}/g, '.').trim();
const dsAns = h => +/Đáp số: <b>([^<]*)<\/b>/.exec(h)[1].replace(',', '.');
let n = 0;
for(const g of [10, 11, 12]){
  const t = g === 12 ? T2 : T[g]; ok(!!t, `lớp ${g}: thiếu đề`); if(!t) continue;
  ok(t.mc.length === 10 && t.tf.length === 3 && t.essay.length === 4, `lớp ${g}: cấu trúc 10 TN + 3 ĐS + 4 TLN`);
  ok(Math.abs(t.mc.length * t.mcPt + t.tf.length + t.essay.reduce((s, e) => s + e.pts, 0) - 10) < 1e-9, `lớp ${g}: tổng điểm ≠ 10`);
  for(let ci = 0; ci < 4; ci++){
    const v = KT.build(t, ci); n++;
    ok(v.mc.every(x => new Set(x.opts).size === 4), `lớp ${g} mã ${ci}: phương án trùng`);
    ok(v.tf.every(x => x.items.length === 4 && x.items.some(i => i.ok) && x.items.some(i => !i.ok)), `lớp ${g} mã ${ci}: Đ/S thiếu cả hai loại`);
    ok(v.essay.every(e => /Đáp số: <b>[^<]{1,4}<\/b>/.test(e.rows[0][0])), `lớp ${g} mã ${ci}: đáp số trả lời ngắn quá 4 kí tự`);
    ok(v.mc.every(x => !/undefined|NaN|\$/.test(JSON.stringify(x))) && v.tf.every(x => !/undefined|NaN|\$/.test(JSON.stringify(x))), `lớp ${g} mã ${ci}: chuỗi lỗi (undefined/NaN/$)`);
  }
  // phân bố đáp án A–D (mỗi mã: không chữ nào quá 4 lần, không 3 câu liền trùng)
  for(let ci = 0; ci < 4; ci++){ const a = KT.build(t, ci).mc.map(x => x.a), c = [0, 0, 0, 0]; a.forEach(x => c[x]++); ok(Math.max(...c) <= 4, `lớp ${g} mã ${ci}: đáp án dồn ${c}`); for(let i = 2; i < a.length; i++) ok(!(a[i] === a[i - 1] && a[i] === a[i - 2]), `lớp ${g} mã ${ci}: 3 câu liền cùng đáp án`); }
}
// ---- Lớp 11: tính lại độc lập ----
const t11 = T[11], raw = (arr, ci) => arr.map(f => typeof f === 'function' ? f(ci) : f);
for(let ci = 0; ci < 4; ci++){
  const mc = raw(t11.mc, ci), cor = i => plain(mc[i].opts[0]);
  const [a, b, c, nn] = [[2, -3, 1, 4], [3, -2, 5, 3], [1, 4, -3, 5], [2, 1, -4, 6]][ci]; ok(+cor(5) === a * nn * nn + b * nn + c, `TN6 mã ${ci}`);
  const [u1, d, k] = [[3, 4, 10], [-5, 3, 8], [7, -2, 12], [2, 5, 15]][ci]; ok(+cor(6) === u1 + (k - 1) * d, `TN7 mã ${ci}`);
  const [w1, q, k2] = [[2, 3, 5], [3, 2, 6], [5, -2, 4], [1, 4, 4]][ci]; ok(+cor(7) === w1 * Math.pow(q, k2 - 1), `TN8 mã ${ci}`);
  const [x0, h] = [[10, 5], [20, 10], [140, 10], [4, 2]][ci]; ok(+cor(8) === 5 * h, `TN9 mã ${ci}`);
  const f = [[5, 6, 15, 4, 10], [7, 14, 5, 15, 9], [8, 15, 4, 10, 13], [7, 3, 10, 11, 9]][ci], N = f.reduce((s, v) => s + v, 0), mean = f.reduce((s, v, i) => s + v * (x0 + h * (i + .5)), 0) / N;
  ok(Math.abs(+cor(9) - mean) < 1e-9, `TN10 mã ${ci}: ${cor(9)} ≠ ${mean}`);
  // TN1–TN5: so với giá trị số
  const tn1 = [Math.sin(5 * Math.PI / 6), Math.cos(2 * Math.PI / 3), Math.tan(3 * Math.PI / 4), Math.sin(-Math.PI / 3)][ci];
  const ev = s => { s = s.replace(/\\\(|\\\)/g, '').replace(/\\sqrt\{(\d)\}/g, 'Math.sqrt($1)').replace(/\\dfrac\{([^{}]*)\}\{([^{}]*)\}/g, '(($1)/($2))'); return Function(`return ${s}`)(); };
  ok(Math.abs(ev(mc[0].opts[0]) - tn1) < 1e-9, `TN1 mã ${ci}`);
  const sn = [3 / 5, 1 / 3, 2 / 3, 4 / 5][ci]; ok(Math.abs(ev(mc[1].opts[0]) - Math.cos(2 * Math.asin(sn))) < 1e-9, `TN2 mã ${ci}`);
  const [ta, tb] = [[3, -1], [2, 5], [4, -3], [5, 2]][ci], iv = /\[(-?\d+);\\ (-?\d+)\]/.exec(mc[3].opts[0]); ok(+iv[1] === tb - ta && +iv[2] === tb + ta, `TN4 mã ${ci}`);
  // ĐS-2, ĐS-3: bản ĐÚNG là câu đầu của mỗi cặp
  const tf = raw(t11.tf, ci), [s1, dd] = [[5, 3], [2, 4], [-3, 5], [9, -2]][ci];
  const it2 = tf[1].items.map(p => plain(p[0])); ok(num(it2[0].split('d =')[1]) === dd && num(it2[1].split('u_1 =')[1]) === s1 && num(it2[2].split('bằng')[1]) === s1 + 9 * dd && num(it2[3].split('bằng')[1]) === 6 * (2 * s1 + 11 * dd), `ĐS-2 mã ${ci}: ${it2}`);
  const [y0, hh, ff] = [[20, 10, [14, 9, 8, 4, 15]], [140, 10, [11, 10, 8, 7, 14]], [4, 2, [2, 11, 8, 6, 3]], [15, 5, [10, 15, 3, 9, 13]]][ci], NN = ff.reduce((s, v) => s + v, 0);
  const mean3 = ff.reduce((s, v, i) => s + v * (y0 + hh * (i + .5)), 0) / NN; let cum = 0, mi = 0; for(; mi < 5; mi++){ if(cum + ff[mi] >= NN / 2) break; cum += ff[mi]; }
  const me = y0 + hh * mi + (NN / 2 - cum) / ff[mi] * hh, it3 = tf[2].items.map(p => plain(p[0]));
  ok(num(it3[0].split('=')[1]) === NN, `ĐS-3a mã ${ci}`); ok(it3[1].includes(`[${y0 + hh * mi};\\ ${y0 + hh * (mi + 1)})`), `ĐS-3b mã ${ci}: ${it3[1]}`);
  ok(Math.abs(num(it3[2].split('xấp xỉ')[1]) - mean3) < .051 && Math.abs(num(it3[3].split('xấp xỉ')[1]) - me) < .051, `ĐS-3c/d mã ${ci}: ${it3[2]} / ${it3[3]}`);
  ok(Math.abs(mean3 * 10 - Math.round(mean3 * 10)) < 1e-9 && Math.abs(me * 10 - Math.round(me * 10)) < 1e-9, `ĐS-3 làm tròn không gọn mã ${ci}`);
  // TLN
  const es = raw(t11.essay.map(e => e.make), ci), ans = es.map(e => dsAns(e.rows[0][0]));
  const [, , cc] = [[10, 4, 6], [12, 3, 3], [8, 2, 4], [9, 5, 12]][ci]; let cnt1 = 0; for(let t = 0; t <= 24 + 1e-9; t += .5) if(Math.abs(Math.sin(Math.PI * t / cc) - 1) < 1e-9) cnt1++; ok(ans[0] === cnt1, `TLN-1 mã ${ci}: ${ans[0]} ≠ ${cnt1}`);
  const P = Math.PI, fns = [x => 2 * Math.sin(2 * x - P / 3) - 1, x => Math.sqrt(2) * Math.cos(x + P / 4) + 1, x => 2 * Math.sin(3 * x) - 1, x => 2 * Math.cos(2 * x) + 1], ivs = [[0, 2 * P, false], [0, 3 * P, false], [0, 2 * P, true], [0, 2 * P, true]];
  const [lo, hi, cl] = ivs[ci], F = fns[ci], steps = 2000000; let cnt2 = 0, prev = F(lo), pz = 0;
  for(let i = 1; i < steps; i++){ const x = lo + (hi - lo) * i / steps, y = F(x); if(Math.abs(y) < 1e-12 && x > lo + 1e-9 && x < hi - 1e-9){ cnt2++; prev = y; continue; } if(prev * y < 0) cnt2++; prev = y; }
  if(cl){ if(Math.abs(F(lo)) < 1e-9) cnt2++; if(Math.abs(F(hi)) < 1e-9) cnt2++; }
  ok(ans[1] === cnt2, `TLN-2 mã ${ci}: ${ans[1]} ≠ ${cnt2} (đếm đổi dấu)`);
  const S3 = [[20, 3, 15], [30, -2, 12], [50, 10, 20], [16, 2, 18]][ci]; let s3 = 0; for(let i = 0; i < S3[2]; i++) s3 += S3[0] + i * S3[1]; ok(ans[2] === s3, `TLN-3 mã ${ci}`);
  const S4 = [[4, 3, 5], [3, 2, 10], [5, 2, 8], [2, 3, 6]][ci]; let s4 = 0, u = S4[0]; for(let i = 0; i < S4[2]; i++){ s4 += u; u *= S4[1]; } ok(ans[3] === s4, `TLN-4 mã ${ci}`);
}
// ---- Lớp 10: bản đúng của Đ/S đều khớp lời giải (bank đã kiểm) – ở đây kiểm đáp số trả lời ngắn có mặt và khác nhau giữa các mã ----
{ const t10 = T[10]; const a = [0, 1, 2, 3].map(ci => t10.essay.map(e => dsAns(e.make(ci).rows[0][0])).join(',')); ok(new Set(a).size === 4, 'Lớp 10: các mã có cùng đáp số trả lời ngắn: ' + a.join(' | ')); }
// ---- Lớp 10, bộ đề thứ hai (721–724): TLN-2 tứ giác nội tiếp, kiểm bằng công thức Brahmagupta + tọa độ (độc lập với lời giải) ----
{ const E = T2.essay; const seen = [];
  for(let ci = 0; ci < 4; ci++){
    const e = E[1].make(ci), sd = [...e.de.matchAll(/\\\((AB|BC|CD|DA) = (\d+)\\\)/g)].map(m => +m[2]); ok(sd.length === 4, `gk2 mã ${ci}: không đọc được 4 cạnh`);
    const [a, b, c, d] = sd, p = (a + b + c + d) / 2, br = Math.sqrt((p - a) * (p - b) * (p - c) * (p - d));
    // tọa độ: B=(0,0), A=(a,0), C=b(cosB,sinB); D thuộc đường tròn ABC với CD=c, DA=d
    const cosB = (a * a + b * b - c * c - d * d) / (2 * (a * b + c * d)), sinB = Math.sqrt(1 - cosB * cosB);
    const A = [a, 0], B = [0, 0], C = [b * cosB, b * sinB];
    const ux = (A[0] * A[0] * (C[1] - 0) + C[0] * C[0] * (0 - 0) + 0) , den = 2 * (A[0] * (C[1] - B[1]) + B[0] * (B[1] - A[1]) + C[0] * (A[1] - B[1])) ;
    const O = [(C[1] * A[0] * A[0] - 0 + C[1] * 0 ) / den, ((A[0] * (C[0] * C[0] + C[1] * C[1]) - C[0] * A[0] * A[0])) / den];
    const R2 = (A[0] - O[0]) ** 2 + (A[1] - O[1]) ** 2; ok(Math.abs(O[0] ** 2 + O[1] ** 2 - R2) < 1e-9 && Math.abs((C[0] - O[0]) ** 2 + (C[1] - O[1]) ** 2 - R2) < 1e-9, `gk2 mã ${ci}: tâm O sai`);
    // D = giao đường tròn với |DA| = d, |DC| = c, D khác phía B so với AC
    let best = null; for(let k = 0; k < 720000; k++){ const th = 2 * Math.PI * k / 720000, D = [O[0] + Math.sqrt(R2) * Math.cos(th), O[1] + Math.sqrt(R2) * Math.sin(th)];
      const err = Math.abs(Math.hypot(D[0] - A[0], D[1] - A[1]) - d) + Math.abs(Math.hypot(D[0] - C[0], D[1] - C[1]) - c); if(!best || err < best.err) best = {err, D}; if(err < 1e-4 && D[1] * 0 + ((C[0] - A[0]) * (D[1] - A[1]) - (C[1] - A[1]) * (D[0] - A[0])) * ((C[0] - A[0]) * (B[1] - A[1]) - (C[1] - A[1]) * (B[0] - A[0])) < 0){ best = {err, D}; break; } }
    ok(best.err < 1e-3, `gk2 mã ${ci}: không dựng được D (sai số ${best.err})`);
    const P = [A, B, C, best.D]; let sh = 0; for(let i = 0; i < 4; i++){ const u = P[i], v = P[(i + 1) % 4]; sh += u[0] * v[1] - v[0] * u[1]; } const area = Math.abs(sh) / 2;
    ok(Math.abs(area - br) < 1e-3, `gk2 mã ${ci}: shoelace ${area} ≠ Brahmagupta ${br}`);
    const want = Math.round(br * 10) / 10, got = dsAns(e.rows[0][0]); ok(got === want, `gk2 TLN-2 mã ${ci}: đáp số ${got} ≠ ${want}`);
    ok(Math.abs(br * 10 - Math.round(br * 10) + 0) < .45 && Math.abs(((br * 10) % 1) - .5) > .02, `gk2 mã ${ci}: sát biên làm tròn (${br})`);
    ok(Math.abs(Math.abs(cosB) - .5) < 1e-9, `gk2 mã ${ci}: cos B = ${cosB}`);
    seen.push(got);
  }
  ok(new Set(seen).size === 4, 'gk2: TLN-2 trùng đáp số giữa các mã: ' + seen);
  // TLN-1,3,4 (mã đề 8): khác 4 mã
  const a = [0, 1, 2, 3].map(ci => E.map(e => dsAns(e.make(ci).rows[0][0])).join(',')); ok(new Set(a).size === 4, 'gk2: các mã trùng đáp số: ' + a.join(' | '));
}
// ---- Lớp 11, bộ đề thứ hai (721–724): 5 điểm TN + 3 điểm Đ/S + 2 điểm TLN, ĐS-2 mô hình hoá CSC/CSN, không bảng trả lời ----
{ const U = KT.TESTS.find(t => t.grade === 'lop11' && t.id === 'gk-ma-tran-2'); ok(!!U, 'lớp 11 bộ 2: thiếu đề');
  if(U){
    ok(U.mc.length === 10 && U.tf.length === 3 && U.essay.length === 2, 'lớp 11 bộ 2: cấu trúc 10 TN + 3 ĐS + 2 TLN');
    ok(U.mcPt * 10 === 5 && U.tf.length === 3 && U.essay.reduce((s, e) => s + e.pts, 0) === 2, 'lớp 11 bộ 2: điểm 5/3/2');
    ok(U.noGrid === true && U.codes.join() === '721,722,723,724', 'lớp 11 bộ 2: noGrid / mã đề');
    const ev = s => { s = s.replace(/\\\(|\\\)/g, '').replace(/\{,\}/g, '.').replace(/\\sqrt\{(\d)\}/g, 'Math.sqrt($1)').replace(/\\dfrac\{([^{}]*)\}\{([^{}]*)\}/g, '(($1)/($2))'); return Function(`return ${s}`)(); };
    const tbl = h => { const r = [...h.matchAll(/<tr>(.*?)<\/tr>/g)].map(m => m[1]), g = [...r[0].matchAll(/\[(-?\d+);\\ (-?\d+)\)/g)].map(m => [+m[1], +m[2]]), f = [...r[1].matchAll(/<td>(\d+)<\/td>/g)].map(m => +m[1]);
      const N = f.reduce((s, v) => s + v, 0), mean = g.reduce((s, x, i) => s + f[i] * (x[0] + x[1]) / 2, 0) / N; let cum = 0, i = 0; for(; i < g.length; i++){ if(cum + f[i] >= N / 2) break; cum += f[i]; }
      return {g, f, N, mean, med: g[i][0] + (N / 2 - cum) / f[i] * (g[i][1] - g[i][0]), mi: i, range: g[g.length - 1][1] - g[0][0]}; };
    const bare = z => z.replace(/\\\(|\\\)/g, ''), PI = Math.PI, seen = [], pi = z => z.replace(/(\d)\\pi/g, '$1*Math.PI').replace(/\\pi/g, 'Math.PI');
    for(let ci = 0; ci < 4; ci++){
      const v = KT.build(U, ci), L = `bộ 2 mã ${ci}`; n++;
      ok(v.mc.every(x => new Set(x.opts).size === 4) && v.mc.every(x => !/undefined|NaN|\$/.test(JSON.stringify(x))) && v.tf.every(x => !/undefined|NaN|\$/.test(JSON.stringify(x))), `${L}: phương án trùng / chuỗi lỗi`);
      ok(v.tf.every(x => x.items.length === 4 && x.items.some(i => i.ok) && x.items.some(i => !i.ok)), `${L}: Đ/S thiếu Đ hoặc S`);
      ok(v.essay.every(e => /Đáp số: <b>[^<]{1,4}<\/b>/.test(e.rows[0][0])), `${L}: đáp số TLN quá 4 kí tự`);
      const a = v.mc.map(x => x.a), c4 = [0, 0, 0, 0]; a.forEach(x => c4[x]++); ok(Math.max(...c4) <= 4, `${L}: đáp án dồn ${c4}`); for(let i = 2; i < 10; i++) ok(!(a[i] === a[i - 1] && a[i] === a[i - 2]), `${L}: 3 câu liền cùng đáp án`);
      const q = i => v.mc[i].q, good = i => v.mc[i].opts[v.mc[i].a], gv = i => ev(good(i));
      // TN1: giá trị lượng giác
      { const m = /\\\((sin|cos|tan|cot)\s*(.*?)\\\) bằng/.exec(q(0).replace(/Giá trị của \\\(/, '\\(')) || /(sin|cos|tan|cot)(.*?)\\\) bằng/.exec(q(0)); const arg = m[2].replace(/^\\left\(|\\right\)$/g, ''); const x = ev(pi(arg)); const f = {sin: Math.sin, cos: Math.cos, tan: Math.tan, cot: z => 1 / Math.tan(z)}[m[1]]; ok(Math.abs(gv(0) - f(x)) < 1e-9, `${L} TN1: ${good(0)} ≠ ${f(x)}`); }
      // TN2: cos2α = 1 − 2sin²α
      { const m = /\\dfrac\{(\d+)\}\{(\d+)\}/.exec(q(1)), sn = m[1] / m[2]; ok(Math.abs(gv(1) - (1 - 2 * sn * sn)) < 1e-9, `${L} TN2`); }
      // TN3: tập xác định – kiểm bằng số: điểm loại bỏ phải là điểm hàm không xác định
      { const m = /y = \\(tan|cot)(.*?)\\\)? là/.exec(q(2)) || /y = \\(tan|cot)(.*?) là/.exec(q(2)); const kind = m[1], body = m[2].replace(/^\\left\(|\\right\)$/g, ''); const lin = /^(\d*)x(?: \+ (.*))?$/.exec(body.trim()); const k = lin[1] === '' ? 1 : +lin[1], sh = lin[2] ? ev(pi(lin[2])) : 0;
        // x bị loại: k·x + sh = (π/2 | 0) + mπ
        const base = kind === 'tan' ? PI / 2 : 0, ex = [-2, -1, 0, 1, 2].map(mm => (base + mm * PI - sh) / k), s = good(2), t0 = [...s.matchAll(/(-?)\\dfrac\{(\d*)\\pi\}\{(\d+)\}|(-?)\\dfrac\{k\\pi\}\{(\d+)\}|(?:^|[{ ])(k\\pi)/g)];
        const w = /\\left\\\{(.*?) \\mid k/.exec(s)[1]; let first, step; const pm = /^(-?)\\dfrac\{(\d*)\\pi\}\{(\d+)\}(?: \+ (?:\\dfrac\{k\\pi\}\{(\d+)\}|k\\pi))?$/.exec(w), pk = /^\\dfrac\{k\\pi\}\{(\d+)\}$/.exec(w);
        if(pm){ first = (pm[1] ? -1 : 1) * (pm[2] === '' ? 1 : +pm[2]) * PI / +pm[3]; step = /\\dfrac\{k\\pi\}\{(\d+)\}/.test(w) ? PI / +/\\dfrac\{k\\pi\}\{(\d+)\}/.exec(w)[1] : PI; } else if(pk){ first = 0; step = PI / +pk[1]; } else if(w === 'k\\pi'){ first = 0; step = PI; } else { first = NaN; step = NaN; }
        ok(Math.abs(step - PI / k) < 1e-9 && ex.some(e => Math.abs(((e - first) / step) - Math.round((e - first) / step)) < 1e-9 && Math.abs(e - first) < 1e-9 + 5 * step), `${L} TN3: ${good(2)} (k=${k}, shift=${sh}, ${kind})`); }
      // TN4: tập giá trị a sin x + b
      { const m = /y = (\d+)\\sin x ([+-]) (\d+)/.exec(q(3)), A = +m[1], B = (m[2] === '-' ? -1 : 1) * m[3], iv = /\[(-?\d+);\\ (-?\d+)\]/.exec(good(3)); ok(+iv[1] === B - A && +iv[2] === B + A, `${L} TN4`); }
      // TN5: nghiệm sin(kx)=sin(π/m) hoặc cos(kx)=cos(π/m): thử các nghiệm trong đáp án đúng, đếm hết nghiệm trong [0, 2π/k)
      { const m = /\\(sin|cos) (\d)x = \\(?:sin|cos)\\dfrac\{\\pi\}\{(\d+)\}/.exec(q(4)), f = m[1] === 'sin' ? Math.sin : Math.cos, k = +m[2], al = PI / +m[3], g = good(4);
        const per = /k\\dfrac\{2\\pi\}\{3\}/.test(g) ? 2 * PI / 3 : (/k2\\pi/.test(g) ? 2 * PI : PI);
        const terms = [...g.matchAll(/(\\pm )?\\dfrac\{(\d*)\\pi\}\{(\d+)\}/g)].map(t => (t[2] === '' ? 1 : +t[2]) * PI / +t[3]).filter((_, i) => true);
        const firsts = []; for(const t of [...g.matchAll(/(\\pm )?\\dfrac\{(\d*)\\pi\}\{(\d+)\} \+ k/g)]) { const val = (t[2] === '' ? 1 : +t[2]) * PI / +t[3]; firsts.push(val); if(t[1]) firsts.push(-val); }
        ok(firsts.length >= 2 && firsts.every(x => Math.abs(f(k * x) - f(al)) < 1e-9 && Math.abs(f(k * (x + per)) - f(al)) < 1e-9), `${L} TN5: ${g}`);
        // đủ nghiệm: mọi x trong [0, 2π) với f(kx)=f(α) phải thuộc họ
        let miss = 0; for(let i = 0; i < 360000; i++){ const x = 2 * PI * i / 360000; if(Math.abs(f(k * x) - f(al)) < 2e-6 && Math.abs(Math.abs(f(k * x) - f(al))) < 2e-6){ const ok1 = firsts.some(b => { const r = (x - b) / per; return Math.abs(r - Math.round(r)) < 3e-5; }); if(!ok1){ miss++; } } }
        ok(miss === 0, `${L} TN5: thiếu nghiệm trong họ (${miss})`); }
      // TN6–TN8
      { const m = /u_n = (\d*)n\^2 ([+-]) (\d*)n ([+-]) (\d+)\). Số hạng u_\{(\d+)\}|u_n = (\d*)n\^2 ([+-]) (\d*)n ([+-]) (\d+)\)/.exec(q(5)) || /u_n = (\d*)n\^2 ([+-]) (\d*)n ([+-]) (\d+)/.exec(q(5)); const A = m[1] === '' ? 1 : +m[1], B = (m[2] === '-' ? -1 : 1) * (m[3] === '' ? 1 : +m[3]), C = (m[4] === '-' ? -1 : 1) * +m[5], k = +/u_\{(\d+)\}/.exec(q(5))[1]; ok(gv(5) === A * k * k + B * k + C, `${L} TN6: ${good(5)} ≠ ${A * k * k + B * k + C}`); }
      { const m = /u_1 = (-?\d+) và công sai d = (-?\d+)\. Số hạng u_\{(\d+)\}/.exec(bare(q(6))); ok(gv(6) === +m[1] + (m[3] - 1) * m[2], `${L} TN7`); }
      { const m = /u_1 = (-?\d+) và công bội q = (-?\d+)\. Số hạng u_\{(\d+)\}/.exec(bare(q(7))); ok(gv(7) === m[1] * Math.pow(+m[2], m[3] - 1), `${L} TN8`); }
      // TN9, TN10: khoảng biến thiên, trung bình cộng
      { const g = [...q(8).matchAll(/\[(-?\d+);\\ (-?\d+)\)/g)].map(m => [+m[1], +m[2]]); ok(g.length === 5 && gv(8) === g[4][1] - g[0][0], `${L} TN9`); }
      { const T9 = tbl(q(9)); ok(Math.abs(gv(9) - T9.mean) < 1e-9, `${L} TN10: ${good(9)} ≠ ${T9.mean}`); ok(Math.abs(T9.mean * 10 - Math.round(T9.mean * 10)) < 1e-9, `${L} TN10: không tròn 1 chữ số`); }
      // ĐS-1 (bank, kiểm lại ý chu kì/tập giá trị bằng số) – chỉ kiểm cấu trúc ở trên; ĐS-3: bảng
      { const T3 = tbl(v.tf[2].stem), it = v.tf[2].items; ok(it[0].ok === (+/n = (\d+)/.exec(it[0].text)[1] === T3.N), `${L} ĐS3a`);
        const bm = /\[(-?\d+);\\ (-?\d+)\)/.exec(it[1].text); ok(it[1].ok === (+bm[1] === T3.g[T3.mi][0]), `${L} ĐS3b`);
        const val = i => +/(?:xấp xỉ|bằng)\s*\\\((-?[\d{},.]+)\\\)/.exec(it[i].text)[1].replace('{,}', '.'); ok(it[2].ok === (Math.abs(val(2) - T3.mean) < .051), `${L} ĐS3c: ${it[2].text} (TB=${T3.mean})`); ok(it[3].ok === (Math.abs(val(3) - T3.med) < .051), `${L} ĐS3d: ${it[3].text} (TV=${T3.med})`); }
      // ĐS-2: mô hình CSC/CSN — đọc số liệu từ đề, tính lại bằng vòng lặp (không dùng công thức)
      { const st = v.tf[2 - 1].stem, nums = s => [...s.matchAll(/\d+/g)].map(m => +m[0]);
        const N = +/trong (\d+) (?:tuần|ngày|tháng)/.exec(st)[1];
        const part = st.split(/Cách 2: |Phương án B: |Kênh B: /); ok(part.length === 2, `${L} ĐS2: không tách được hai cách`);
        const p1 = part[0], p2 = part[1]; const a1 = +/đầu\s+(?:gửi |bán |nhận |có )?(\d+)/.exec(p1)[1], dd = +/(?:nhiều hơn[^.]*?)(\d+)/.exec(p1)[1], b1 = +/đầu\s+(?:gửi |bán |nhận |có )?(\d+)/.exec(p2)[1], qq = /gấp đôi/.test(p2) ? 2 : +/gấp (\d+) lần/.exec(p2)[1];
        let u = a1, w = b1, S1 = 0, S2 = 0, uk = 0, vk = 0; const k = +/thứ (\d+)/.exec(v.tf[1].items[0].text)[1];
        for(let i = 1; i <= N; i++){ S1 += u; S2 += w; if(i === k){ uk = u; vk = w; } u += dd; w *= qq; }
        const it = v.tf[1].items, val = (t, re) => +re.exec(t.replace(/\\\(|\\\)/g, ''))[1];
        ok(it[0].ok === (val(it[0].text, /là (\d+) /) === uk), `${L} ĐS2a: u_k=${uk}, đề ghi ${it[0].text}`);
        ok(it[1].ok === (val(it[1].text, /là (\d+) /) === S1), `${L} ĐS2b: S1=${S1}, đề ghi ${it[1].text}`);
        ok(it[2].ok === (val(it[2].text, /là (\d+) /) === vk), `${L} ĐS2c: v_k=${vk}, đề ghi ${it[2].text}`);
        const D = Math.abs(S2 - S1), more = S2 > S1, said = /nhiều hơn theo/.test(it[3].text); ok(val(it[3].text, /là (\d+) /) === D && it[3].ok === (said === more), `${L} ĐS2d: S1=${S1}, S2=${S2}, đề ghi ${it[3].text}`);
        ok(it.filter(x => x.ok).length >= 1 && it.filter(x => !x.ok).length >= 1, `${L} ĐS2: cần có cả Đ và S`); seen.push([uk, S1, vk, S2, more].join('/')); }
      // TLN-1: mực nước cực đại; TLN-2: đếm nghiệm bằng đổi dấu
      { const es = v.essay.map(e => ({de: e.de, ans: dsAns(e.rows[0][0])}));
        const m1 = /h\(t\) = (\d+) \+ (\d+)\\sin\\dfrac\{\\pi t\}\{(\d+)\}/.exec(es[0].de), P = +m1[3]; let c = 0; for(let t2 = 0; t2 <= 48 * 24; t2++){ const t = t2 / 48; if(Math.abs(Math.sin(PI * t / P) - 1) < 1e-9) c++; } ok(es[0].ans === c, `${L} TLN1: ${es[0].ans} ≠ ${c}`);
        const d2 = es[1].de.replace(/\\\(|\\\)/g, ''), iv = /(\[|\()(-?\\?\w*)(?:;\\ )(-?\\?\w*)(\]|\))\./.exec(d2.slice(d2.lastIndexOf('trên')));
        const lo = /(\(|\[)(-?)(\d*)\\pi|(\(|\[)0/.exec(d2.slice(d2.lastIndexOf('trên'))); const ivs = /(\(|\[)(-\\pi|0);\\ (\d*)\\pi(\)|\])/.exec(d2.slice(d2.lastIndexOf('trên')));
        const lo2 = ivs[2] === '0' ? 0 : -PI, hi2 = (ivs[3] === '' ? 1 : +ivs[3]) * PI, cl = [ivs[1] === '[', ivs[4] === ']'];
        const m2 = /^(?:\\sqrt\{2\}|2)\\(sin|cos)(?:\\left\()?([^=]*?)(?:\\right\))? ?(?:([+-]) 1 )?= ?(.*?) (?:trên|$)/.exec(d2);
        // dựng F(x) từ đề: dạng  A f(arg) [+ 1 = 0 | = rhs]
        const A = /^\\sqrt\{2\}/.test(d2.replace('Tìm số nghiệm của phương trình ', '')) ? Math.SQRT2 : 2, fn = /\\(sin|cos)/.exec(d2)[1] === 'sin' ? Math.sin : Math.cos, argS = /\\(?:sin|cos)(?:\\left\()?(.*?)(?:\\right\))?(?: \+ 1 = 0| = )/.exec(d2)[1];
        const lin = /^(\d*)x(?: ([+-]) \\dfrac\{\\pi\}\{(\d+)\})?$/.exec(argS.trim()); const kk = lin[1] === '' ? 1 : +lin[1], sh = lin[2] ? (lin[2] === '-' ? -1 : 1) * PI / +lin[3] : 0;
        const rhs = / \+ 1 = 0/.test(d2) ? -1 : ev(pi(/= (.*?) trên/.exec(d2)[1]));
        const F = x => A * fn(kk * x + sh) - rhs; const steps = 3000000; let tot = 0, last = -1e9;
        for(let i = 0; i <= steps; i++){ const x = lo2 + (hi2 - lo2) * i / steps; if(Math.abs(F(x)) < 1e-4 && x - last > 1e-2){ tot++; } if(Math.abs(F(x)) < 1e-4) last = x; }
        if(!cl[0] && Math.abs(F(lo2)) < 1e-9) tot--; if(!cl[1] && Math.abs(F(hi2)) < 1e-9) tot--;
        ok(es[1].ans === tot, `${L} TLN2: đề ${es[1].ans} ≠ đếm ${tot}; ${d2}`); }
    }
    ok(new Set(seen).size === 4, 'bộ 2 lớp 11: ĐS-2 trùng số liệu giữa các mã: ' + seen);
    const mix = new Set(seen.map(x => x.split('/')[4])); ok(mix.size === 2, 'bộ 2 lớp 11: ĐS-2 nên có cả "nhiều hơn" và "ít hơn" giữa các mã');
    const a = [0, 1, 2, 3].map(ci => U.essay.map(e => dsAns(e.make(ci).rows[0][0])).join(',')); ok(new Set(a).size === 4, 'bộ 2 lớp 11: các mã trùng đáp số TLN: ' + a.join(' | '));
  } }
console.log(bad.length ? 'KHÔNG ĐẠT ✗\n' + bad.map(x => ' ✗ ' + x).join('\n') : `Đề giữa kì theo ma trận (lớp 10 + 11, ${n} mã đề): ĐẠT ✓`);
process.exit(bad.length ? 1 : 0);
