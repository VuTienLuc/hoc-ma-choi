// Kiểm tra ĐỘC LẬP đề giữa kì theo ma trận (lớp 10 và 11): sinh mọi mã đề, kiểm lại đáp án bằng phép tính riêng.
// Chạy: node tools/test_gk_ma_tran.js
const fs = require('fs'), vm = require('vm'), path = require('path'), R = p => fs.readFileSync(path.join(__dirname, '..', p), 'utf8');
const ctx = {console, Math, tm: x => `\\(${x}\\)`, globalThis: null}; ctx.globalThis = ctx; vm.createContext(ctx);
vm.runInContext(R('assets/js/kiemtra.js') + ';this.KiemTra = KiemTra;', ctx);
['assets/js/figures.js', 'data/lop10-giua-ki-bank.js', 'data/lop11-giua-ki-bank.js', 'giao-vien/bai-giang/lop10-giua-ki-ma-tran.js', 'giao-vien/bai-giang/lop11-giua-ki-ma-tran.js'].forEach(f => vm.runInContext(R(f), ctx, {filename:f}));
const KT = ctx.KiemTra, bad = [], ok = (c, m) => { if(!c) bad.push(m); };
const T = {10:KT.TESTS.find(t => t.grade === 'lop10' && t.id === 'gk-ma-tran'), 11:KT.TESTS.find(t => t.grade === 'lop11' && t.id === 'gk-ma-tran')};
const num = s => { const m = String(s).replace(/\\\(|\\\)|\\dfrac|[{}]/g, m => m === '\\dfrac' ? '' : '').match(/-?\d+[,.]?\d*/); return m ? parseFloat(m[0].replace(',', '.')) : NaN; };
const plain = s => String(s).replace(/\\\(|\\\)/g, '').replace(/\{,\}/g, '.').trim();
const dsAns = h => +/Đáp số: <b>([^<]*)<\/b>/.exec(h)[1].replace(',', '.');
let n = 0;
for(const g of [10, 11]){
  const t = T[g]; ok(!!t, `lớp ${g}: thiếu đề`); if(!t) continue;
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
console.log(bad.length ? 'KHÔNG ĐẠT ✗\n' + bad.map(x => ' ✗ ' + x).join('\n') : `Đề giữa kì theo ma trận (lớp 10 + 11, ${n} mã đề): ĐẠT ✓`);
process.exit(bad.length ? 1 : 0);
