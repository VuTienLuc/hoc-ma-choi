/* =====================================================================
   ĐỀ KIỂM TRA CHƯƠNG I – TOÁN 11 (Kết nối tri thức) · 45 phút · 4 mã đề
   KiemTra.add({...}) – xem assets/js/kiemtra.js.
   Cấu trúc 10 điểm:
     Phần I   – 16 câu trắc nghiệm 1 đáp án × 0,25 = 4 điểm   (nhận biết)
     Phần II  – 4 câu đúng/sai (mỗi câu 4 ý) × 1 = 4 điểm    (nhận biết)
     Phần III – 2 bài tự luận vận dụng thực tế × 1 = 2 điểm
   Quy ước soạn:
     mc:  {bai, q, opts:[ĐÚNG, sai, sai, sai]}  hoặc hàm (ci) => {...} để mỗi mã đề một bộ số (ci = 0..3).
          Phương án ĐÚNG luôn viết đầu tiên; khi trộn, đáp án được rải đều A/B/C/D.
     tf:  {bai, stem, items:[[câu ĐÚNG, câu SAI], …]} – mỗi mã đề chọn ngẫu nhiên (có hạt giống) bản đúng hoặc sai của từng ý.
     essay: {bai, pts, make: ci => ({de, rows:[[nội dung chấm, điểm], …]})}
   ===================================================================== */
(() => {
const m = tm, f = (a, b) => `\\dfrac{${a}}{${b}}`, Z = '(k \\in \\mathbb{Z})';
const pi = (p, q) => q === 1 ? `${p === 1 ? '' : p}\\pi` : `\\dfrac{${p === 1 ? '' : p}\\pi}{${q}}`;
const dec = x => String(x).replace('.', '{,}');

KiemTra.add({
  grade:'lop11', id:'c1', title:'Kiểm tra chương I', chapter:'Chương I. Hàm số lượng giác và phương trình lượng giác',
  subject:'TOÁN 11', book:'Kết nối tri thức với cuộc sống', time:45, codes:['111', '112', '113', '114'],
  school:'TRƯỜNG THPT NGUYỄN HỮU CẢNH', group:'TỔ TOÁN', year:'2026 – 2027',
  bai:['Bài 1. Giá trị lượng giác của góc lượng giác', 'Bài 2. Công thức lượng giác', 'Bài 3. Hàm số lượng giác', 'Bài 4. Phương trình lượng giác cơ bản'],

  /* ---------------- PHẦN I: 16 câu nhận biết ---------------- */
  mc:[
    ci => { const [d, p, q, w] = [[150, 5, 6, ['5\\pi/3', '3\\pi/4', '2\\pi/3']], [120, 2, 3, ['3\\pi/2', '5\\pi/6', '3\\pi/4']], [135, 3, 4, ['4\\pi/3', '2\\pi/3', '5\\pi/6']], [210, 7, 6, ['7\\pi/3', '5\\pi/4', '4\\pi/3']]][ci];
      const tex = s => { const [a, b] = s.split('/'); return `\\dfrac{${a}}{${b}}`; };
      return {bai:1, q:`Góc có số đo ${m(`${d}^\\circ`)} đổi sang radian là`, opts:[pi(p, q), ...w.map(tex)].map(x => m(x))}; },
    ci => { const [p, q, d, w] = [[3, 4, 135, [120, 150, 270]], [5, 6, 150, [120, 135, 300]], [2, 3, 120, [60, 135, 240]], [7, 4, 315, [225, 300, 630]]][ci];
      return {bai:1, q:`Góc có số đo ${m(pi(p, q))} rad đổi sang độ là`, opts:[d, ...w].map(x => m(`${x}^\\circ`))}; },
    ci => { const [R, a, l] = [[10, pi(1, 5), [2, 1, 4, 10]], [6, pi(1, 3), [2, 1, 4, 6]], [8, pi(3, 4), [6, 3, 12, 24]], [12, pi(1, 4), [3, '3/2', 6, 18]]][ci];
      const L = x => typeof x === 'string' ? m(`\\dfrac{3\\pi}{2}`) + ' cm' : m(`${x === 1 ? '' : x}\\pi`) + ' cm';
      return {bai:1, q:`Trên đường tròn bán kính ${m(`R = ${R}`)} cm, cung có số đo ${m(a)} rad có độ dài bằng`, opts:l.map(L)}; },
    {bai:1, q:`Nếu góc lượng giác ${m('(Ou, Ov)')} có số đo ${m(pi(1, 3))} thì mọi góc lượng giác có cùng tia đầu ${m('Ou')}, tia cuối ${m('Ov')} có số đo là`,
     opts:[`${m(`${pi(1, 3)} + k2\\pi`)} ${m(Z)}`, `${m(`${pi(1, 3)} + k\\pi`)} ${m(Z)}`, `${m(`-${pi(1, 3)} + k2\\pi`)} ${m(Z)}`, `${m(`${pi(1, 3)} + k${pi(1, 2)}`)} ${m(Z)}`]},
    {bai:1, q:`Cho ${m('\\dfrac{\\pi}{2} \\lt \\alpha \\lt \\pi')}. Khẳng định nào sau đây đúng?`,
     opts:[m('\\sin\\alpha \\gt 0'), m('\\cos\\alpha \\gt 0'), m('\\tan\\alpha \\gt 0'), m('\\cot\\alpha \\gt 0')]},
    ci => { const [e, g, w] = [[`\\cos ${pi(2, 3)}`, `-${f(1, 2)}`, [f(1, 2), `-${f('\\sqrt{3}', 2)}`, f('\\sqrt{3}', 2)]], [`\\sin ${pi(5, 6)}`, f(1, 2), [`-${f(1, 2)}`, f('\\sqrt{3}', 2), `-${f('\\sqrt{3}', 2)}`]],
        [`\\cos ${pi(3, 4)}`, `-${f('\\sqrt{2}', 2)}`, [f('\\sqrt{2}', 2), `-${f(1, 2)}`, `-${f('\\sqrt{3}', 2)}`]], [`\\sin ${pi(4, 3)}`, `-${f('\\sqrt{3}', 2)}`, [f('\\sqrt{3}', 2), `-${f(1, 2)}`, f(1, 2)]]][ci];
      return {bai:1, q:`Giá trị của ${m(e)} bằng`, opts:[g, ...w].map(x => m(x))}; },
    {bai:1, q:`Với mọi góc ${m('\\alpha')}, đẳng thức nào sau đây đúng?`,
     opts:[m('\\sin^2\\alpha + \\cos^2\\alpha = 1'), m('\\sin\\alpha + \\cos\\alpha = 1'), m('\\sin^2\\alpha - \\cos^2\\alpha = 1'), m('\\sin 2\\alpha + \\cos 2\\alpha = 1')]},
    {bai:1, q:`Với ${m('\\cos\\alpha \\ne 0')}, đẳng thức nào sau đây đúng?`,
     opts:[m('1 + \\tan^2\\alpha = \\dfrac{1}{\\cos^2\\alpha}'), m('1 + \\tan^2\\alpha = \\dfrac{1}{\\sin^2\\alpha}'), m('1 - \\tan^2\\alpha = \\dfrac{1}{\\cos^2\\alpha}'), m('1 + \\tan^2\\alpha = \\cos^2\\alpha')]},
    {bai:2, q:`Với mọi số thực ${m('a, b')}, công thức nào sau đây đúng?`,
     opts:[m('\\cos(a - b) = \\cos a\\cos b + \\sin a\\sin b'), m('\\cos(a - b) = \\cos a\\cos b - \\sin a\\sin b'), m('\\sin(a + b) = \\sin a\\cos b - \\cos a\\sin b'), m('\\sin(a - b) = \\sin a\\sin b - \\cos a\\cos b')]},
    {bai:2, q:`Với mọi số thực ${m('a')}, công thức nào sau đây đúng?`,
     opts:[m('\\cos 2a = 1 - 2\\sin^2 a'), m('\\cos 2a = 2\\sin^2 a - 1'), m('\\sin 2a = 2\\sin a'), m('\\cos 2a = \\sin^2 a - \\cos^2 a')]},
    {bai:2, q:`Với mọi số thực ${m('a, b')}, ${m('\\cos a\\cos b')} bằng`,
     opts:[m('\\tfrac{1}{2}\\left[\\cos(a - b) + \\cos(a + b)\\right]'), m('\\tfrac{1}{2}\\left[\\cos(a - b) - \\cos(a + b)\\right]'), m('\\tfrac{1}{2}\\left[\\sin(a - b) + \\sin(a + b)\\right]'), m('\\cos(a + b) + \\cos(a - b)')]},
    {bai:3, q:`Tập xác định của hàm số ${m('y = \\tan x')} là`,
     opts:[m(`\\mathbb{R}\\setminus\\left\\{${pi(1, 2)} + k\\pi \\mid k \\in \\mathbb{Z}\\right\\}`), m('\\mathbb{R}\\setminus\\left\\{k\\pi \\mid k \\in \\mathbb{Z}\\right\\}'), m('\\mathbb{R}\\setminus\\left\\{k2\\pi \\mid k \\in \\mathbb{Z}\\right\\}'), m('\\mathbb{R}')]},
    {bai:3, q:'Hàm số nào sau đây là hàm số chẵn?', opts:[m('y = \\cos x'), m('y = \\sin x'), m('y = \\tan x'), m('y = \\cot x')]},
    {bai:3, q:`Hàm số ${m('y = \\tan x')} tuần hoàn với chu kì`, opts:[m('\\pi'), m('2\\pi'), m(pi(1, 2)), m('4\\pi')]},
    {bai:3, q:`Tập giá trị của hàm số ${m('y = \\cos x')} là`, opts:[m('[-1;\\ 1]'), m('\\mathbb{R}'), m('[0;\\ 1]'), m('(-1;\\ 1)')]},
    ci => { const [v, p, q, w] = [[f(1, 2), 1, 3, [1, 6]], [f('\\sqrt{2}', 2), 1, 4, [3, 4]], [f('\\sqrt{3}', 2), 1, 6, [1, 3]], [`-${f(1, 2)}`, 2, 3, [1, 3]]][ci];
      const a = pi(p, q), b = pi(w[0], w[1]);
      return {bai:4, q:`Nghiệm của phương trình ${m(`\\cos x = ${v}`)} là`,
        opts:[`${m(`x = \\pm ${a} + k2\\pi`)} ${m(Z)}`, `${m(`x = ${a} + k\\pi`)} ${m(Z)}`, `${m(`x = \\pm ${b} + k2\\pi`)} ${m(Z)}`, `${m(`x = ${a} + k2\\pi`)} ${m(Z)}`]}; },
  ],

  /* ---------------- PHẦN II: 4 câu đúng – sai ---------------- */
  tf:[
    {bai:1, stem:`Cho góc ${m('\\alpha')} thoả mãn ${m(`\\sin\\alpha = ${f(3, 5)}`)} và ${m('\\dfrac{\\pi}{2} \\lt \\alpha \\lt \\pi')}.`, items:[
      [m('\\cos\\alpha \\lt 0'), m('\\cos\\alpha \\gt 0')],
      [m(`\\cos\\alpha = -${f(4, 5)}`), m(`\\cos\\alpha = ${f(4, 5)}`)],
      [m(`\\tan\\alpha = -${f(3, 4)}`), m(`\\tan\\alpha = -${f(4, 3)}`)],
      [m(`\\sin 2\\alpha = -${f(24, 25)}`), m(`\\sin 2\\alpha = ${f(24, 25)}`)] ]},
    {bai:3, stem:`Cho hàm số ${m('f(x) = \\sin x')}.`, items:[
      [`Tập xác định của hàm số là ${m('\\mathbb{R}')}.`, `Tập xác định của hàm số là ${m('\\mathbb{R}\\setminus\\{k\\pi \\mid k \\in \\mathbb{Z}\\}')}.`],
      ['Hàm số là hàm số lẻ.', 'Hàm số là hàm số chẵn.'],
      [`Hàm số tuần hoàn với chu kì ${m('2\\pi')}.`, `Hàm số tuần hoàn với chu kì ${m('\\pi')}.`],
      [`Giá trị lớn nhất của hàm số ${m('y = 2f(x) + 1')} bằng ${m('3')}.`, `Giá trị lớn nhất của hàm số ${m('y = 2f(x) + 1')} bằng ${m('2')}.`] ]},
    {bai:4, stem:`Cho phương trình ${m('2\\cos x - 1 = 0')} ${m('(1)')}.`, items:[
      [`Phương trình ${m('(1)')} tương đương với ${m(`\\cos x = ${f(1, 2)}`)}.`, `Phương trình ${m('(1)')} tương đương với ${m('\\cos x = 2')}.`],
      [`${m(`x = ${pi(1, 3)}`)} là một nghiệm của ${m('(1)')}.`, `${m(`x = ${pi(1, 6)}`)} là một nghiệm của ${m('(1)')}.`],
      [`Các nghiệm của ${m('(1)')} là ${m(`x = \\pm ${pi(1, 3)} + k2\\pi`)} ${m(Z)}.`, `Các nghiệm của ${m('(1)')} là ${m(`x = ${pi(1, 3)} + k\\pi`)} ${m(Z)}.`],
      [`Phương trình ${m('(1)')} có đúng ${m('2')} nghiệm thuộc đoạn ${m('[0;\\ 2\\pi]')}.`, `Phương trình ${m('(1)')} có đúng ${m('3')} nghiệm thuộc đoạn ${m('[0;\\ 2\\pi]')}.`] ]},
    {bai:2, stem:`Xét các công thức lượng giác (giả thiết các biểu thức đều có nghĩa).`, items:[
      [m('\\sin(a + b) = \\sin a\\cos b + \\cos a\\sin b'), m('\\sin(a + b) = \\sin a\\cos b - \\cos a\\sin b')],
      [m('\\cos 2a = \\cos^2 a - \\sin^2 a'), m('\\cos 2a = 2\\sin a\\cos a')],
      [m('\\tan(a + b) = \\dfrac{\\tan a + \\tan b}{1 - \\tan a\\tan b}'), m('\\tan(a + b) = \\dfrac{\\tan a + \\tan b}{1 + \\tan a\\tan b}')],
      [m(`\\sin 75^\\circ = ${f('\\sqrt{6} + \\sqrt{2}', 4)}`), m(`\\sin 75^\\circ = ${f('\\sqrt{6} - \\sqrt{2}', 4)}`)] ]},
  ],

  /* ---------------- PHẦN III: 2 bài tự luận vận dụng thực tế ---------------- */
  essay:[
    {bai:4, pts:1, make: ci => { const [A, B, P] = [[30, 25, 15], [28, 24, 12], [26, 22, 9], [32, 26, 18]][ci], H = A + B / 2, t = 2 * P / 3;
      return { de:`Khi một vòng đu quay hoạt động, độ cao ${m('h')} (mét) so với mặt đất của một cabin sau ${m('t')} phút (${m('t \\ge 0')}) được cho bởi ${m(`h(t) = ${A} - ${B}\\cos\\dfrac{\\pi t}{${P}}`)}.<br>a) Tìm độ cao lớn nhất và độ cao nhỏ nhất của cabin.<br>b) Sau bao nhiêu phút kể từ lúc bắt đầu thì cabin lên tới độ cao ${m(dec(H))} m lần đầu tiên?`,
        rows:[[`a) Vì ${m(`-1 \\le \\cos\\dfrac{\\pi t}{${P}} \\le 1`)} nên ${m(`${A - B} \\le h(t) \\le ${A + B}`)}.`, 0.25],
          [`Độ cao lớn nhất là ${m(A + B)} m (khi ${m(`\\cos\\dfrac{\\pi t}{${P}} = -1`)}), độ cao nhỏ nhất là ${m(A - B)} m (khi ${m(`\\cos\\dfrac{\\pi t}{${P}} = 1`)}).`, 0.25],
          [`b) ${m(`${A} - ${B}\\cos\\dfrac{\\pi t}{${P}} = ${dec(H)} \\Leftrightarrow \\cos\\dfrac{\\pi t}{${P}} = -\\dfrac{1}{2} = \\cos\\dfrac{2\\pi}{3}`)}.`, 0.25],
          [`${m(`\\dfrac{\\pi t}{${P}} = \\pm\\dfrac{2\\pi}{3} + k2\\pi \\Leftrightarrow t = \\pm ${t} + ${2 * P}k`)} ${m(Z)}. Giá trị dương nhỏ nhất là ${m(`t = ${t}`)}. Vậy sau <b>${t} phút</b> cabin lên tới độ cao ${m(dec(H))} m lần đầu tiên.`, 0.25]] }; }},
    {bai:4, pts:1, make: ci => { const [A, B, P] = [[12, 2.5, 6], [10, 3, 12], [11, 2, 6], [9, 3.5, 12]][ci], H = A + B / 2;
      const t1 = P / 6, t2 = 5 * P / 6, ts = []; for(let k = 0; k < 5; k++) [t1 + 2 * P * k, t2 + 2 * P * k].forEach(x => { if(x <= 24) ts.push(x); }); ts.sort((a, b) => a - b);
      return { de:`Độ sâu ${m('h')} (mét) của mực nước ở một cảng biển vào thời điểm ${m('t')} giờ trong ngày (${m('0 \\le t \\le 24')}) được tính bởi ${m(`h(t) = ${dec(A)} + ${dec(B)}\\sin\\dfrac{\\pi t}{${P}}`)}. Trong ngày, mực nước sâu đúng ${m(dec(H))} m vào những thời điểm nào?`,
        rows:[[`${m(`${dec(A)} + ${dec(B)}\\sin\\dfrac{\\pi t}{${P}} = ${dec(H)} \\Leftrightarrow \\sin\\dfrac{\\pi t}{${P}} = \\dfrac{1}{2} = \\sin\\dfrac{\\pi}{6}`)}.`, 0.25],
          [`${m(`\\dfrac{\\pi t}{${P}} = \\dfrac{\\pi}{6} + k2\\pi`)} hoặc ${m(`\\dfrac{\\pi t}{${P}} = \\dfrac{5\\pi}{6} + k2\\pi`)} ${m(Z)}, tức là ${m(`t = ${t1} + ${2 * P}k`)} hoặc ${m(`t = ${t2} + ${2 * P}k`)}.`, 0.25],
          [`Vì ${m('0 \\le t \\le 24')} và ${m('k \\in \\mathbb{Z}')} nên ${m(`t \\in \\{${ts.join(';\\ ')}\\}`)}.`, 0.25],
          [`Vậy có ${ts.length} thời điểm: <b>${ts.map(x => x + ' giờ').join(', ')}</b>.`, 0.25]] }; }},
  ],
});
})();
