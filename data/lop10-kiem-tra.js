/* Bài kiểm tra học sinh – Toán 10 Kết nối tri thức. */
(() => {
  const M = x => `\\(${x}\\)`;
  const F = (a,b) => `\\dfrac{${a}}{${b}}`;
  const P = (x,y) => `(${x};\\,${y})`;
  const SYS = rows => `\\begin{cases}${rows.join('\\\\')}\\end{cases}`;
  const mc = (level, q, correct, wrong, sol) => ({level, q, opts:[correct, ...wrong], sol});
  const C = [
    {a:2,b:1,c:6,op:'\\le',good:[1,2],bad:[[3,2],[4,0],[2,3]],budget:[20,15,180],K:5,A:3,B:2,u:4,v:3,profit:[30,40,200],fix:[2,1,6,2]},
    {a:1,b:2,c:6,op:'\\ge',good:[2,2],bad:[[1,1],[0,2],[3,1]],budget:[25,10,200],K:6,A:2,B:4,u:5,v:2,profit:[40,30,220],fix:[1,2,7,3]},
    {a:-1,b:2,c:3,op:'\\gt',good:[1,3],bad:[[1,2],[3,2],[0,1]],budget:[30,20,240],K:7,A:4,B:1,u:3,v:5,profit:[20,50,200],fix:[3,1,11,2]},
    {a:3,b:-1,c:4,op:'\\lt',good:[1,0],bad:[[2,1],[1,-1],[3,4]],budget:[15,25,210],K:8,A:2,B:5,u:4,v:4,profit:[50,20,250],fix:[2,3,13,1]}
  ];
  const lin = x => `${x.a===1?'':x.a===-1?'-':x.a}x${x.b<0?'-':'+'}${Math.abs(x.b)===1?'':Math.abs(x.b)}y`;
  const ineq = x => `${lin(x)}${x.op}${x.c}`;
  const val = (x,p) => x.a*p[0]+x.b*p[1];
  const sat = (x,p) => x.op==='\\le'?val(x,p)<=x.c:x.op==='\\ge'?val(x,p)>=x.c:x.op==='\\lt'?val(x,p)<x.c:val(x,p)>x.c;
  const inclusive = x => x.op==='\\le'||x.op==='\\ge';
  const opWord = x => inclusive(x)?'có thuộc':'không thuộc';
  const triVerts = k => `${P(0,0)},${P(k,0)},${P(0,k)}`;
  const sysTri = k => SYS(['x\\ge0','y\\ge0',`x+y\\le${k}`]);
  const optSys = SYS(['x\\ge0','y\\ge0','x+2y\\le8','2x+y\\le10']);
  const optVerts = [[0,0],[5,0],[4,2],[0,4]];

  StudentTest.add({
    grade:'lop10', id:'c2', topic:2,
    title:'Kiểm tra cuối Chương II – Bất phương trình và hệ bất phương trình bậc nhất hai ẩn',
    time:60, codes:['201','202','203','204'],
    mc:[
      ci => { const x=C[ci], good=ineq(x); return mc('Nhận biết', 'Bất phương trình nào sau đây là bất phương trình bậc nhất hai ẩn?', M(good), [M(`${Math.abs(x.a)||2}x^2+y\\le${x.c}`),M(`xy+${Math.abs(x.b)||1}x\\gt${x.c}`),M(`${F(1,'x')}+y\\le${x.c}`)], `<p>Bất phương trình bậc nhất hai ẩn có dạng ${M('ax+by\\lt c')} hoặc dùng các dấu ${M('\\gt,\\le,\\ge')}, trong đó ${M('a,b')} không đồng thời bằng 0.</p><p>${M(good)} đúng dạng trên. Các phương án còn lại có ${M('x^2')}, tích ${M('xy')} hoặc ẩn ở mẫu.</p>`); },
      ci => { const x=C[ci], g=x.good; return mc('Nhận biết', `Cặp số nào là nghiệm của bất phương trình ${M(ineq(x))}?`, M(P(...g)), x.bad.map(p=>M(P(...p))), `<p>Thay ${M(`x=${g[0]},\\ y=${g[1]}`)} vào vế trái:</p><p>${M(`${x.a}\\cdot${g[0]}${x.b<0?'-':'+'}${Math.abs(x.b)}\\cdot${g[1]}=${val(x,g)}${x.op}${x.c}`)} là khẳng định đúng.</p><p>Vì vậy ${M(P(...g))} là một nghiệm.</p>`); },
      ci => { const x=C[ci]; return mc('Nhận biết', `Đường thẳng biên của miền nghiệm bất phương trình ${M(ineq(x))} là`, M(`${lin(x)}=${x.c}`), [M(`${lin(x)}=0`),M(`${x.a}x=${x.c}`),M(`${x.b}y=${x.c}`)], `<p>Thay dấu bất phương trình bằng dấu bằng và giữ nguyên hai vế.</p><p>Đường thẳng biên là ${M(`${lin(x)}=${x.c}`)}.</p>`); },
      ci => { const x=C[ci], yes=sat(x,[0,0]), correct=yes?'Có':'Không'; return mc('Thông hiểu', `Gốc tọa độ ${M('O(0;\\,0)')} có thuộc miền nghiệm của ${M(ineq(x))} không?`, correct, [correct==='Có'?'Không':'Có','Chỉ thuộc đường biên','Không xác định được'], `<p>Thay ${M('x=0,y=0')} vào bất phương trình, vế trái bằng ${M('0')}.</p><p>${M(`0${x.op}${x.c}`)} là khẳng định ${yes?'đúng':'sai'}, nên gốc ${M('O')} ${yes?'thuộc':'không thuộc'} miền nghiệm.</p>`); },
      ci => { const x=C[ci], correct=inclusive(x)?'Đường biên thuộc miền nghiệm':'Đường biên không thuộc miền nghiệm'; return mc('Thông hiểu', `Đối với bất phương trình ${M(ineq(x))}, khẳng định nào đúng?`, correct, [inclusive(x)?'Đường biên không thuộc miền nghiệm':'Đường biên thuộc miền nghiệm','Miền nghiệm chỉ gồm đường biên','Miền nghiệm là toàn bộ mặt phẳng'], `<p>Dấu ${M(x.op)} ${inclusive(x)?'có':'không có'} dấu bằng.</p><p>Vì vậy đường biên ${M(`${lin(x)}=${x.c}`)} ${opWord(x)} miền nghiệm và khi vẽ phải dùng nét ${inclusive(x)?'liền':'đứt'}.</p>`); },
      ci => { const x=C[ci], [p,q,T]=x.budget, good=`${p}x+${q}y\\le${T}`; return mc('Thông hiểu', `Một học sinh mua ${M('x')} quyển vở giá ${p} nghìn đồng/quyển và ${M('y')} chiếc bút giá ${q} nghìn đồng/chiếc. Tổng số tiền không vượt quá ${T} nghìn đồng. Bất phương trình mô tả điều kiện tiền là`, M(good), [M(`${p}x+${q}y\\ge${T}`),M(`${q}x+${p}y\\le${T}`),M(`${p}x+${q}y\\lt${T}`)], `<p>Tiền mua vở là ${M(`${p}x`)}, tiền mua bút là ${M(`${q}y`)} nên tổng là ${M(`${p}x+${q}y`)}.</p><p>“Không vượt quá” tương ứng với dấu ${M('\\le')}. Do đó điều kiện là ${M(good)}.</p>`); },
      ci => { const systems=[
        {s:SYS(['x\\ge0','y\\ge0','x+y\\le5']),g:[2,2],w:[[3,3],[-1,2],[2,-1]]},
        {s:SYS(['x\\ge0','y\\ge0','2x+y\\le6','x+2y\\le6']),g:[2,1],w:[[3,1],[1,3],[-1,2]]},
        {s:SYS(['x\\ge1','y\\ge0','x+y\\le6']),g:[3,2],w:[[0,2],[4,3],[2,-1]]},
        {s:SYS(['x\\ge0','y\\ge1','2x+y\\le8']),g:[2,3],w:[[4,1],[1,0],[3,3]]}
      ], z=systems[ci]; return mc('Thông hiểu', `Cặp số nào là nghiệm của hệ ${M(z.s)}?`, M(P(...z.g)), z.w.map(p=>M(P(...p))), `<p>Nghiệm của hệ phải thỏa mãn đồng thời tất cả các bất phương trình.</p><p>Thay ${M(`x=${z.g[0]},y=${z.g[1]}`)} vào từng dòng của hệ đều nhận được bất đẳng thức đúng. Ba cặp còn lại mỗi cặp vi phạm ít nhất một điều kiện.</p>`); },
      ci => { const x=C[ci]; return mc('Thông hiểu', `Miền nghiệm của hệ ${M(sysTri(x.K))} là một tam giác. Ba đỉnh của tam giác đó là`, M(triVerts(x.K)), [M(`${P(0,0)},${P(x.K,x.K)},${P(0,x.K)}`),M(`${P(0,0)},${P(x.K,0)},${P(x.K,x.K)}`),M(`${P(x.K,0)},${P(0,x.K)},${P(x.K,x.K)}`)], `<p>Hai điều kiện ${M('x\\ge0,y\\ge0')} giới hạn miền trong góc phần tư thứ nhất.</p><p>Đường thẳng ${M(`x+y=${x.K}`)} cắt hai trục tại ${M(P(x.K,0))} và ${M(P(0,x.K))}. Vì thế các đỉnh là ${M(triVerts(x.K))}.</p>`); },
      ci => { const x=C[ci], pt=[2,1], ans=x.A*2+x.B; return mc('Thông hiểu', `Cho ${M(`F=${x.A}x+${x.B}y`)}. Giá trị của ${M('F')} tại ${M(P(...pt))} bằng`, M(ans), [M(x.A+x.B*2),M(x.A*2-x.B),M(x.A+x.B)], `<p>Thay ${M('x=2,y=1')} vào biểu thức:</p><p>${M(`F=${x.A}\\cdot2+${x.B}\\cdot1=${ans}`)}.</p>`); },
      ci => { const x=C[ci], ans=Math.max(x.A,x.B)*x.K, where=x.A>x.B?P(x.K,0):P(0,x.K); return mc('Vận dụng', `Tìm giá trị lớn nhất của ${M(`F=${x.A}x+${x.B}y`)} trên miền nghiệm ${M(sysTri(x.K))}.`, M(ans), [M(Math.min(x.A,x.B)*x.K),M((x.A+x.B)*x.K),M(0)], `<p>Miền nghiệm là tam giác có các đỉnh ${M(triVerts(x.K))}. Giá trị lớn nhất của hàm tuyến tính đạt tại một đỉnh.</p><p>Tính ${M('F')} tại ba đỉnh rồi so sánh; giá trị lớn nhất là ${M(ans)}, đạt tại ${M(where)}.</p>`); },
      ci => { const x=C[ci], ans=x.A*x.u+x.B*x.v; return mc('Vận dụng', `Trên miền hình chữ nhật ${M(SYS(['0\\le x\\le'+x.u,'0\\le y\\le'+x.v]))}, giá trị lớn nhất của ${M(`F=${x.A}x+${x.B}y`)} là`, M(ans), [M(x.A*x.u),M(x.B*x.v),M(ans-x.A)], `<p>Vì các hệ số ${M(`${x.A},${x.B}`)} đều dương, ${M('F')} tăng khi ${M('x,y')} tăng.</p><p>Giá trị lớn nhất đạt tại đỉnh ${M(P(x.u,x.v))}: ${M(`F_{max}=${x.A}\\cdot${x.u}+${x.B}\\cdot${x.v}=${ans}`)}.</p>`); },
      ci => { const x=C[ci], [p,q,ans]=x.profit, vals=optVerts.map(([a,b])=>p*a+q*b); return mc('Vận dụng cao', `Một xưởng có miền phương án ${M(optSys)}. Lợi nhuận là ${M(`F=${p}x+${q}y`)} nghìn đồng. Lợi nhuận lớn nhất bằng`, M(`${ans}\\text{ nghìn đồng}`), [M(`${vals[0]}\\text{ nghìn đồng}`),M(`${vals[1]}\\text{ nghìn đồng}`),M(`${vals[2]}\\text{ nghìn đồng}`)].filter((v,i,a)=>v!==M(`${ans}\\text{ nghìn đồng}`)&&a.indexOf(v)===i).concat([M(`${ans+20}\\text{ nghìn đồng}`)]).slice(0,3), `<p>Miền nghiệm có các đỉnh ${M(`${P(0,0)},${P(5,0)},${P(4,2)},${P(0,4)}`)}.</p><p>Thay từng đỉnh vào ${M(`F=${p}x+${q}y`)} được các giá trị ${M(vals.join(';\\ '))}.</p><p>Giá trị lớn nhất là ${M(`${ans}\\text{ nghìn đồng}`)}.</p>`); }
    ],
    tf:[
      ci => { const x=C[ci], g=x.good, b=x.bad[0]; return {stem:`Cho bất phương trình ${M(ineq(x))}. Xét tính đúng sai của các khẳng định sau:`,items:[
        {text:'Đây là bất phương trình bậc nhất hai ẩn.',ok:true,sol:`<p>Hai hệ số của ${M('x,y')} là ${M(`${x.a},${x.b}`)} và không đồng thời bằng 0; các ẩn đều có bậc nhất.</p>`},
        {text:`Cặp số ${M(P(...g))} là một nghiệm.`,ok:true,sol:`<p>Thay vào vế trái được ${M(`${val(x,g)}${x.op}${x.c}`)}, là bất đẳng thức đúng.</p>`},
        {text:`Đường thẳng biên là ${M(`${lin(x)}=${x.c}`)}.`,ok:true,sol:'<p>Thay dấu bất phương trình bằng dấu bằng ta được phương trình đường thẳng biên.</p>'},
        {text:`Cặp số ${M(P(...b))} là một nghiệm.`,ok:false,sol:`<p>Thay vào vế trái được ${M(val(x,b))}; bất đẳng thức ${M(`${val(x,b)}${x.op}${x.c}`)} sai, nên cặp số đã cho không phải nghiệm.</p>`}
      ]}; },
      ci => { const x=C[ci], max=Math.max(x.A,x.B)*x.K; return {stem:`Cho miền nghiệm ${M(sysTri(x.K))} và biểu thức ${M(`F=${x.A}x+${x.B}y`)}. Xét tính đúng sai của các khẳng định sau:`,items:[
        {text:`Điểm ${M(P(0,0))} thuộc miền nghiệm.`,ok:true,sol:`<p>${M('0\\ge0,0\\ge0')} và ${M(`0+0\\le${x.K}`)}, nên điểm này thỏa cả ba bất phương trình.</p>`},
        {text:`Miền nghiệm có các đỉnh ${M(triVerts(x.K))}.`,ok:true,sol:`<p>Đường ${M(`x+y=${x.K}`)} cắt các trục tại ${M(P(x.K,0))}, ${M(P(0,x.K))}; cùng gốc tọa độ tạo thành tam giác.</p>`},
        {text:`Giá trị lớn nhất của ${M('F')} là ${M(max)}.`,ok:true,sol:`<p>Tính ${M('F')} tại ba đỉnh. Giá trị lớn nhất bằng hệ số lớn hơn nhân với ${M(x.K)}, tức ${M(max)}.</p>`},
        {text:`Giá trị nhỏ nhất của ${M('F')} là ${M(x.K)}.`,ok:false,sol:`<p>Tại ${M(P(0,0))}, ta có ${M('F=0')}. Vì ${M('x,y\\ge0')} và hai hệ số dương nên ${M('F_{min}=0')}, không phải ${M(x.K)}.</p>`}
      ]}; },
      ci => { const x=C[ci], [p,q,ans]=x.profit; return {stem:`Một cơ sở sản xuất có hệ điều kiện ${M(optSys)} và lợi nhuận ${M(`F=${p}x+${q}y`)} nghìn đồng. Xét tính đúng sai của các khẳng định sau:`,items:[
        {text:'Miền nghiệm nằm trong góc phần tư thứ nhất.',ok:true,sol:`<p>Hai điều kiện ${M('x\\ge0,y\\ge0')} buộc mọi điểm của miền nghiệm nằm trong góc phần tư thứ nhất, kể cả hai trục.</p>`},
        {text:`Điểm ${M(P(4,2))} thuộc miền nghiệm.`,ok:true,sol:`<p>${M(`4+2\\cdot2=8\\le8`)} và ${M(`2\\cdot4+2=10\\le10`)}, đồng thời hai tọa độ không âm.</p>`},
        {text:`Các đỉnh của miền nghiệm là ${M(`${P(0,0)},${P(5,0)},${P(4,2)},${P(0,4)}`)}.`,ok:true,sol:'<p>Đây là các giao điểm thỏa mãn đồng thời các đường biên và các điều kiện không âm.</p>'},
        {text:`Lợi nhuận lớn nhất là ${M(`${ans+10}\\text{ nghìn đồng}`)}.`,ok:false,sol:`<p>Tính ${M('F')} tại bốn đỉnh rồi so sánh. Giá trị lớn nhất đúng là ${M(`${ans}\\text{ nghìn đồng}`)}, không phải giá trị đã nêu.</p>`}
      ]}; }
    ],
    short:[
      ci => { const rows=[
        {q:'2x+y\\le8',y:2,ans:3,sol:'2x+2\\le8\\Leftrightarrow x\\le3'},
        {q:'x+2y\\lt9',y:2,ans:4,sol:'x+4\\lt9\\Leftrightarrow x\\lt5'},
        {q:'-x+3y\\ge4',y:3,ans:5,sol:'-x+9\\ge4\\Leftrightarrow x\\le5'},
        {q:'3x-y\\le11',y:1,ans:4,sol:'3x-1\\le11\\Leftrightarrow x\\le4'}
      ], z=rows[ci]; return {q:`Tìm số nguyên ${M('x')} lớn nhất để ${M(P('x',z.y))} là nghiệm của ${M(z.q)}.`,ans:String(z.ans),sol:`<p>Thay ${M(`y=${z.y}`)} vào bất phương trình:</p><p>${M(z.sol)}.</p><p>Vì ${M('x')} nguyên nên giá trị lớn nhất là ${M(z.ans)}.</p>`}; },
      ci => { const k=[4,5,6,7][ci], ans=(k+1)*(k+2)/2; return {q:`Có bao nhiêu cặp số nguyên không âm ${M(P('x','y'))} thỏa mãn ${M(`x+y\\le${k}`)}?`,ans:String(ans),sol:`<p>Với ${M(`x=0,1,\\ldots,${k}`)}, số giá trị tương ứng của ${M('y')} lần lượt là ${M(`${k+1},${k},\\ldots,1`)}.</p><p>Tổng số cặp là ${M(`1+2+\\cdots+${k+1}=${F(`(${k+1})(${k+2})`,2)}=${ans}`)}.</p>`}; },
      ci => { const x=C[ci], ans=Math.max(x.A,x.B)*x.K; return {q:`Tìm giá trị lớn nhất của ${M(`F=${x.A}x+${x.B}y`)} trên miền nghiệm ${M(sysTri(x.K))}.`,ans:String(ans),sol:`<p>Ba đỉnh của miền nghiệm là ${M(triVerts(x.K))}.</p><p>Tính ${M('F')} tại ba đỉnh và so sánh. Giá trị lớn nhất bằng ${M(ans)}.</p>`}; },
      ci => { const x=C[ci], ans=x.A*x.u+x.B*x.v; return {q:`Tìm giá trị lớn nhất của ${M(`F=${x.A}x+${x.B}y`)} trên miền ${M(SYS(['0\\le x\\le'+x.u,'0\\le y\\le'+x.v]))}.`,ans:String(ans),sol:`<p>Vì hai hệ số đều dương, ${M('F')} lớn nhất khi cả ${M('x,y')} lớn nhất, tức tại ${M(P(x.u,x.v))}.</p><p>${M(`F_{max}=${x.A}\\cdot${x.u}+${x.B}\\cdot${x.v}=${ans}`)}.</p>`}; },
      ci => { const x=C[ci], [p,q,T]=x.budget, fixed=ci+2, ans=Math.floor((T-p*fixed)/q); return {q:`Có ${T} nghìn đồng để mua vở giá ${p} nghìn đồng/quyển và bút giá ${q} nghìn đồng/chiếc. Nếu mua ${fixed} quyển vở thì mua được nhiều nhất bao nhiêu chiếc bút?`,ans:String(ans),sol:`<p>Gọi ${M('y')} là số bút. Điều kiện tiền:</p><p>${M(`${p}\\cdot${fixed}+${q}y\\le${T}\\Leftrightarrow y\\le${F(T-p*fixed,q)}`)}.</p><p>Vì ${M('y')} là số nguyên không âm nên số lớn nhất là ${M(ans)}.</p>`}; },
      ci => { const x=C[ci], [p,q,ans]=x.profit, values=optVerts.map(([a,b])=>p*a+q*b); return {q:`Một xưởng có miền phương án ${M(optSys)}. Lợi nhuận ${M(`F=${p}x+${q}y`)} nghìn đồng. Tìm lợi nhuận lớn nhất (đơn vị nghìn đồng).`,ans:String(ans),sol:`<p>Miền nghiệm có bốn đỉnh ${M(`${P(0,0)},${P(5,0)},${P(4,2)},${P(0,4)}`)}.</p><p>Giá trị ${M('F')} tại các đỉnh lần lượt là ${M(values.join(';\\ '))}.</p><p>So sánh các giá trị, ta được ${M(`F_{max}=${ans}`)} nghìn đồng.</p>`}; }
    ]
  });
})();

/* 5 bài test tổng hợp Chương I + II (20 phút): 8 trắc nghiệm × 0,5 + 2 Đ/S × 1 + 4 trả lời ngắn × 1 = 10 điểm.
   Câu sinh bằng máy theo hạt giống cố định (đáp án tính bằng vét cạn, nhiễu là lỗi sai điển hình). */
(() => {
  const M = x => `\\(${x}\\)`;
  const mc = (level, q, correct, wrong, sol) => ({level, q, opts: [correct, ...wrong], sol});
  const R = s => { let a = s >>> 0; return () => { a = (a + 0x6D2B79F5) >>> 0; let t = a; t = Math.imul(t ^ t >>> 15, t | 1); t ^= t + Math.imul(t ^ t >>> 7, t | 61); return ((t ^ t >>> 14) >>> 0) / 4294967296; }; };
  const ri = (r, a, b) => a + Math.floor(r() * (b - a + 1));
  const pickR = (r, arr) => arr[Math.floor(r() * arr.length)];
  const shuf = (r, arr) => { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const wrong3 = (c, list) => { const o = []; for (const w of list) if (w !== c && !o.includes(w)) o.push(w); if (o.length < 3) throw new Error('thiếu phương án nhiễu'); return o.slice(0, 3); };
  const p = s => `<p>${s}</p>`;
  const INF = Infinity;
  const nm = n => n === INF ? '+\\infty' : n === -INF ? '-\\infty' : n < 0 ? `{${n}}` : `${n}`;
  const P2 = (x, y) => `(${nm(x)};\\,${nm(y)})`;
  const RT = {gt: '\\gt ', ge: '\\ge ', lt: '\\lt ', le: '\\le '};
  const FLIP = {gt: 'le', ge: 'lt', lt: 'ge', le: 'gt'}, SWAP = {gt: 'lt', ge: 'le', lt: 'gt', le: 'ge'};
  const RF = {gt: (a, b) => a > b, ge: (a, b) => a >= b, lt: (a, b) => a < b, le: (a, b) => a <= b};
  const lin = (a, b) => { let s = ''; if (a) s += a === 1 ? 'x' : a === -1 ? '-x' : `${a}x`; if (b) { const t = Math.abs(b) === 1 ? 'y' : `${Math.abs(b)}y`; s += s ? (b > 0 ? '+' : '-') + t : (b < 0 ? '-' : '') + t; } return s; };
  const conTex = ([a, b, c]) => (a <= 0 && b <= 0 && (a || b)) ? `${lin(-a, -b)}\\ge${-c}` : `${lin(a, b)}\\le${c}`;
  const SYS = cons => `\\begin{cases}${cons.map(conTex).join('\\\\')}\\end{cases}`;
  const inclusive = op => op === 'le' || op === 'ge';
  const q2 = (x, op) => `${x.lhs}${RT[op]}${x.c}`;

  /* ---- tập hợp số thực ---- */
  const iv = (lo, hi, lc, hc) => ({lo, hi, lc, hc});
  const inI = (I, x) => (x > I.lo || (I.lc && x === I.lo)) && (x < I.hi || (I.hc && x === I.hi));
  const ivTex = I => `${I.lc && I.lo !== -INF ? '[' : '('}${nm(I.lo)};\\,${nm(I.hi)}${I.hc && I.hi !== INF ? ']' : ')'}`;
  const GRID = []; for (let k = -48; k <= 48; k++) GRID.push(k / 2);
  const setTex = pred => {
    const runs = []; let s = null;
    GRID.forEach((x, i) => { const v = pred(x); if (v && s === null) s = i; if ((!v || i === GRID.length - 1) && s !== null) { runs.push([s, v ? i : i - 1]); s = null; } });
    if (!runs.length) return '\\varnothing';
    return runs.map(([a, b]) => { const L = GRID.length - 1, g = GRID[a], h = GRID[b];
      return ivTex(iv(a === 0 ? -INF : Number.isInteger(g) ? g : g - .5, b === L ? INF : Number.isInteger(h) ? h : h + .5, a !== 0 && Number.isInteger(g), b !== L && Number.isInteger(h))); }).join('\\cup ');
  };
  const cntInt = pred => { let c = 0; for (let x = -25; x <= 25; x++) if (pred(x)) c++; return c; };
  const toggled = I => iv(I.lo, I.hi, !I.lc, !I.hc);
  const OPS = {
    cap: [(A, B) => x => inI(A, x) && inI(B, x), 'A\\cap B'], cup: [(A, B) => x => inI(A, x) || inI(B, x), 'A\\cup B'],
    diff: [(A, B) => x => inI(A, x) && !inI(B, x), 'A\\setminus B'], diffBA: [(A, B) => x => inI(B, x) && !inI(A, x), 'B\\setminus A'],
    comp: [(A) => x => !inI(A, x), 'C_{\\mathbb{R}}A']
  };
  const opTex = (op, A, B) => setTex(OPS[op][0](A, B));
  const genAB = (r, {ray = false, finite = false} = {}) => {
    const a1 = ri(r, -6, 0), a2 = a1 + ri(r, 4, 8), b1 = ri(r, a1 + 1, a2 - 2), b2 = a2 + ri(r, 1, 4);
    const A = iv(a1, a2, r() < .5, r() < .5), useRay = ray && r() < .6;
    const B = useRay ? iv(b1, INF, r() < .5, false) : iv(b1, b2, r() < .5, r() < .5);
    if (finite && useRay) throw new Error('finite');
    return {A, B};
  };
  const ivDesc = (name, I) => `${M(`${name}=${ivTex(I)}`)}`;

  /* ---- tập hợp hữu hạn ---- */
  const fs = a => a.length ? `\\{${a.map(nm).join(';\\,')}\\}` : '\\varnothing';
  const genSets = r => { const pool = shuf(r, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]), nA = ri(r, 4, 6), nB = ri(r, 4, 6), com = ri(r, 2, Math.min(nA, nB) - 1);
    const A = pool.slice(0, nA), B = pool.slice(0, com).concat(pool.slice(nA, nA + nB - com)); return {A: A.sort((x, y) => x - y), B: B.sort((x, y) => x - y)}; };
  const SOP = {cap: [(A, B) => A.filter(x => B.includes(x)), 'A\\cap B'], cup: [(A, B) => [...new Set([...A, ...B])].sort((x, y) => x - y), 'A\\cup B'],
    diff: [(A, B) => A.filter(x => !B.includes(x)), 'A\\setminus B'], diffBA: [(A, B) => B.filter(x => !A.includes(x)), 'B\\setminus A']};
  const tweak = (r, set, A, B) => { const u = SOP.cup[0](A, B), x = pickR(r, u); return (set.includes(x) ? set.filter(y => y !== x) : set.concat([x])).sort((a, b) => a - b); };

  /* ---- mệnh đề có lượng từ ---- */
  const DOM = {R: ['\\mathbb{R}', Array.from({length: 65}, (_, i) => -8 + i / 4)], N: ['\\mathbb{N}', Array.from({length: 15}, (_, i) => i)], Z: ['\\mathbb{Z}', Array.from({length: 29}, (_, i) => i - 14)]};
  const genStm = (r, doms = ['R', 'N', 'Z']) => {
    const dom = pickR(r, doms), q = r() < .5 ? 'A' : 'E', rel = pickR(r, ['gt', 'ge', 'lt', 'le']); let f, lhs;
    if (dom === 'R' || r() < .5) { const s = ri(r, -3, 3); f = x => x * x + s; lhs = s === 0 ? 'x^2' : `x^2${s > 0 ? '+' : '-'}${Math.abs(s)}`; }
    else { const a = ri(r, 2, 4) * (r() < .3 ? -1 : 1), b = ri(r, -3, 5); f = x => a * x + b; lhs = `${a}x${b === 0 ? '' : (b > 0 ? '+' : '-') + Math.abs(b)}`; }
    return {q, dom, rel, lhs, f, rhs: ri(r, -2, 6)};
  };
  const truthS = s => { const pts = DOM[s.dom][1], t = x => RF[s.rel](s.f(x), s.rhs); return s.q === 'A' ? pts.every(t) : pts.some(t); };
  const texS = s => `${s.q === 'A' ? '\\forall' : '\\exists'}\\ x\\in${DOM[s.dom][0]},\\ ${s.lhs}${RT[s.rel]}${s.rhs}`;
  const negS = s => ({...s, q: s.q === 'A' ? 'E' : 'A', rel: FLIP[s.rel]});
  const tv = b => b ? 'đúng' : 'sai';

  /* ---- chia hết ---- */
  const dv = (a, b) => { for (let n = 1; n <= 720; n++) if (n % a === 0 && n % b !== 0) return false; return true; };
  const YES = [[6, 3], [12, 4], [10, 5], [12, 6], [15, 5], [18, 9], [20, 4], [24, 8], [30, 6], [14, 7], [16, 8], [18, 6], [21, 7], [28, 4]];
  const NEI = [[4, 6], [6, 10], [9, 15], [8, 12], [10, 15], [14, 21]];
  const nDiv = (a, neg) => `${M('n')} ${neg ? 'không ' : ''}chia hết cho ${a}`;
  const ifThen = (a, b) => `Nếu ${nDiv(a)} thì ${nDiv(b)}.`;

  /* ---- quy hoạch tuyến tính ---- */
  const lpVerts = cons => { const V = []; for (let i = 0; i < cons.length; i++) for (let j = i + 1; j < cons.length; j++) { const [a1, b1, c1] = cons[i], [a2, b2, c2] = cons[j], d = a1 * b2 - a2 * b1; if (!d) continue;
    const x = (c1 * b2 - c2 * b1) / d, y = (a1 * c2 - a2 * c1) / d; if (cons.every(([a, b, c]) => a * x + b * y <= c + 1e-9) && !V.some(v => Math.abs(v[0] - x) < 1e-9 && Math.abs(v[1] - y) < 1e-9)) V.push([x, y]); } return V; };
  const sortV = V => { const cx = V.reduce((s, v) => s + v[0], 0) / V.length, cy = V.reduce((s, v) => s + v[1], 0) / V.length; return V.slice().sort((a, b) => Math.atan2(a[1] - cy, a[0] - cx) - Math.atan2(b[1] - cy, b[0] - cx)); };
  const genLP = (r, lines, ge) => { for (let it = 0; it < 6000; it++) { const L = []; for (let k = 0; k < lines; k++) L.push([ri(r, 1, 5), ri(r, 1, 5), ri(r, 6, 30)]); if (ge) L.push([-1, -1, -ri(r, 2, 5)]);
    const cons = [[-1, 0, 0], [0, -1, 0], ...L], V = lpVerts(cons);
    if (V.length < 4 || !V.every(v => Number.isInteger(v[0]) && Number.isInteger(v[1]))) continue;
    if (!L.every(l => V.filter(v => l[0] * v[0] + l[1] * v[1] === l[2]).length >= 2)) continue;
    return {cons, L, V: sortV(V)}; } throw new Error('genLP'); };
  const vTex = V => V.map(v => P2(...v)).join(',\\ ');
  const Fv = (u, v, pt) => u * pt[0] + v * pt[1];
  const vals = (u, v, V) => V.map(pt => Fv(u, v, pt));
  const valSol = (u, v, V) => `${M(V.map((pt, i) => `F${P2(...pt)}=${vals(u, v, V)[i]}`).join(';\\ '))}`;

  /* ---- bất phương trình một cặp ---- */
  const genIneq = (r, {zeroC = false} = {}) => { for (let it = 0; it < 500; it++) { const a = pickR(r, [1, 2, 3, -1, -2]), b = pickR(r, [1, 2, -1, -3]), c = zeroC ? 0 : ri(r, 3, 12) * (r() < .25 ? -1 : 1), op = pickR(r, ['gt', 'ge', 'lt', 'le']);
    const x = {a, b, c, op, lhs: lin(a, b)}; if (a * c !== 0 || zeroC) return x; } };
  const vl = (x, pt) => x.a * pt[0] + x.b * pt[1];
  const satI = (x, pt) => RF[x.op](vl(x, pt), x.c);
  const ptsGrid = () => { const o = []; for (let i = -4; i <= 9; i++) for (let j = -4; j <= 9; j++) o.push([i, j]); return o; };
  const lineName = x => `${x.lhs}=${x.c}`;

  const B = {};
  /* ================= TRẮC NGHIỆM ================= */
  const PROP = [
    ['Số $15$ là số nguyên tố.', ['$x+3\\gt5$.', 'Hôm nay trời đẹp quá!', 'Bạn đã làm bài tập chưa?']],
    ['$\\sqrt{2}$ là số hữu tỉ.', ['$n$ là số chẵn.', 'Hãy giải phương trình $x^2-4=0$.', 'Các em học bài chăm chỉ thật!']],
    ['$2^{10}\\gt1000$.', ['$3x-1=8$.', 'Mấy giờ rồi?', 'Em hãy đọc kĩ đề bài.']],
    ['Mọi số thực đều có bình phương không âm.', ['$y\\ge2x+1$.', 'Trời hôm nay có mưa không?', 'Cố gắng lên nào!']],
    ['Tổng ba góc của một tam giác bằng $180^\\circ$.', ['$a+b\\gt5$.', 'Hà Nội có phải thủ đô của Việt Nam không?', 'Hãy vẽ đường tròn tâm $O$.']],
    ['$7$ là số chẵn.', ['$x^2-5x+6=0$.', 'Chúc các em làm bài tốt!', 'Bao giờ lớp ta đi dã ngoại?']],
    ['Phương trình $x^2+1=0$ vô nghiệm trên $\\mathbb{R}$.', ['$x\\lt2$.', 'Đường thẳng $y=x$ có đi qua gốc tọa độ không?', 'Lớp mình đoàn kết quá!']],
    ['$\\pi\\gt4$.', ['$2x\\gt3$.', 'Em có hiểu bài không?', 'Hãy tính $2+3$.']]
  ];
  const fixM = s => s.replace(/\$([^$]+)\$/g, (_, t) => M(t));
  B.isProp = (r, ci, o) => { const [c, w] = PROP[o * 4 + ci]; return mc('Nhận biết', 'Câu nào sau đây là một mệnh đề?', fixM(c), w.map(fixM),
    p('Mệnh đề là câu khẳng định có tính đúng hoặc sai (không thể vừa đúng vừa sai).') + p('Câu hỏi, câu cảm thán, câu mệnh lệnh và câu có biến chưa gán giá trị (như “' + fixM(w[0]) + '”) không xác định được đúng hay sai nên không phải mệnh đề.') + p(`Câu “${fixM(c)}” là một khẳng định, có thể kiểm tra đúng hay sai (kể cả khi nó là khẳng định sai), nên là mệnh đề.`)); };
  B.negQ = (r, ci, o) => { const s = genStm(r, o.doms), n = negS(s), T = texS(s), c = texS(n);
    const wr = [texS({...s, q: n.q}), texS({...s, rel: n.rel}), texS({...n, rel: SWAP[s.rel]})];
    return mc('Thông hiểu', `Phủ định của mệnh đề ${M(T)} là mệnh đề`, M(c), wrong3(M(c), wr.map(M)),
      p(`Khi phủ định, đổi ${M('\\forall')} thành ${M('\\exists')} (và ngược lại) <b>đồng thời</b> đổi dấu ${M(RT[s.rel])} thành dấu ngược ${M(RT[n.rel])} (không phải dấu “đối xứng” ${M(RT[SWAP[s.rel]])}).`) + p(`Vậy phủ định là ${M(c)}.`)); };
  B.intNote = (r, ci, o) => { const lc = r() < .5, hc = r() < .5;
    if (o.ray) { const a = ri(r, -5, 6), dirR = r() < .5, cl = r() < .5, rel = dirR ? (cl ? 'ge' : 'gt') : (cl ? 'le' : 'lt');
      const mk = (d, c) => d ? iv(a, INF, c, false) : iv(-INF, a, false, c), cr = ivTex(mk(dirR, cl));
      return mc('Nhận biết', `Tập hợp ${M(`\\{x\\in\\mathbb{R}\\mid x${RT[rel]}${a}\\}`)} viết dưới dạng khoảng, nửa khoảng là`, M(cr), [M(ivTex(mk(dirR, !cl))), M(ivTex(mk(!dirR, cl))), M(ivTex(mk(!dirR, !cl)))],
        p(`Dấu ${M(RT[rel])} ${cl ? 'có' : 'không có'} dấu bằng nên đầu mút ${M(a)} ${cl ? 'thuộc' : 'không thuộc'} tập hợp: dùng dấu ${cl ? 'ngoặc vuông' : 'ngoặc tròn'}. Các giá trị ${dirR ? 'lớn' : 'nhỏ'} hơn ${M(a)} nên tập kéo dài về phía ${M(dirR ? '+\\infty' : '-\\infty')}.`) + p(`Kết quả: ${M(cr)}.`)); }
    const a = ri(r, -6, 1), b = a + ri(r, 3, 8), cond = `${a}${lc ? '\\le ' : '\\lt '}x${hc ? '\\le ' : '\\lt '}${b}`, all = [[lc, hc], [!lc, hc], [lc, !hc], [!lc, !hc]].map(([x, y]) => M(ivTex(iv(a, b, x, y))));
    return mc('Nhận biết', `Tập hợp ${M(`\\{x\\in\\mathbb{R}\\mid ${cond}\\}`)} viết dưới dạng đoạn, khoảng, nửa khoảng là`, all[0], all.slice(1),
      p(`Dấu ${M(lc ? '\\le' : '\\lt')} bên trái cho đầu mút ${M(a)} ${lc ? 'thuộc' : 'không thuộc'} tập; dấu ${M(hc ? '\\le' : '\\lt')} bên phải cho đầu mút ${M(b)} ${hc ? 'thuộc' : 'không thuộc'} tập.`) + p(`Vậy tập hợp là ${all[0]}.`)); };
  B.subsets = (r, ci, o) => { const n = ri(r, 3, 6), el = shuf(r, ['a', 'b', 'c', 'd', 'e', 'f', 'g']).slice(0, n).sort(), set = `A=\\{${el.join(';\\,')}\\}`, f2 = n * (n - 1) / 2, pw = 2 ** n;
    const K = {all: [`Số tập con của ${M('A')} là`, pw, [2 * n, n * n, pw - 1, pw / 2, f2], `Tập có ${M(n)} phần tử có ${M(`2^{${n}}=${pw}`)} tập con (kể cả ${M('\\varnothing')} và chính ${M('A')}).`],
      proper: [`Số tập con <b>thật sự</b> của ${M('A')} (khác ${M('A')}) là`, pw - 1, [pw, pw - 2, pw / 2, 2 * n], `Tổng số tập con là ${M(`2^{${n}}=${pw}`)}; bỏ đi chính ${M('A')} còn ${M(pw - 1)} tập con thật sự.`],
      nonempty: [`Số tập con <b>khác rỗng</b> của ${M('A')} là`, pw - 1, [pw, pw - 2, pw / 2, n * n], `Tổng số tập con là ${M(`2^{${n}}=${pw}`)}; bỏ đi tập ${M('\\varnothing')} còn ${M(pw - 1)} tập.`],
      two: [`Số tập con của ${M('A')} có đúng 2 phần tử là`, f2, [pw / 2, 2 * n, n * n, pw - 1, n], `Chọn 2 trong ${M(n)} phần tử: ${M(`\\dfrac{${n}\\cdot${n - 1}}{2}=${f2}`)}.`]}[o.kind];
    return mc('Thông hiểu', `Cho tập hợp ${M(set)}. ${K[0]}`, M(K[1]), wrong3(M(K[1]), K[2].map(M)), p(K[3])); };
  B.isLin = (r, ci) => { const x = genIneq(r), c = Math.abs(x.c) || 5, good = M(`${lin(pickR(r, [2, 3, 4, -2]), pickR(r, [1, -3, 5, 2]))}${RT[x.op]}${c}`);
    return mc('Nhận biết', 'Bất phương trình nào sau đây là bất phương trình bậc nhất hai ẩn?', good, shuf(r, [`x^2+y${RT[x.op]}${c}`, `0x+0y${RT.gt}${c}`, `\\dfrac{1}{x}+y${RT[x.op]}${c}`, `xy${RT[x.op]}${c}`]).slice(0, 3).map(M),
      p(`Dạng tổng quát: ${M('ax+by\\lt c')} (hoặc ${M('\\gt,\\le,\\ge')}) với ${M('a,b')} <b>không đồng thời bằng 0</b>, các ẩn ở bậc nhất, không có tích ${M('xy')}, không ở mẫu.`) + p(`Chỉ ${good} đúng dạng này; ${M(`0x+0y${RT.gt}${c}`)} có ${M('a=b=0')}, các câu còn lại có ${M('x^2')}, ${M('xy')} hoặc ẩn ở mẫu.`)); };
  B.solPair = (r, ci, o) => { const x = genIneq(r), G = ptsGrid().filter(([i, j]) => Math.abs(i) <= 6 && Math.abs(j) <= 8), bd = G.filter(pt => vl(x, pt) === x.c), sat = G.filter(pt => satI(x, pt) && vl(x, pt) !== x.c), un = G.filter(pt => !satI(x, pt));
    const near = un.filter(pt => Math.abs(vl(x, pt) - x.c) <= 3), pr = Math.min(...[x.c]) ; let good, bad;
    const wantBd = inclusive(x.op) ? r() < .5 : false, nearSat = sat.filter(pt => Math.abs(vl(x, pt) - x.c) <= 2);
    if (inclusive(x.op) && wantBd) { good = pickR(r, bd); bad = shuf(r, near).slice(0, 3); }
    else if (inclusive(x.op)) { good = pickR(r, nearSat); bad = shuf(r, near).slice(0, 3); }
    else { good = pickR(r, nearSat); bad = [pickR(r, bd)].concat(shuf(r, near).slice(0, 2)); }
    const op = x.op; if (!good || bad.length < 3) return B.solPair(r, ci, o);
    const t = pt => `${x.a}\\cdot${nm(pt[0])}${x.b < 0 ? '-' : '+'}${Math.abs(x.b)}\\cdot${nm(pt[1])}=${vl(x, pt)}`;
    return mc('Thông hiểu', `Cặp số nào sau đây là nghiệm của bất phương trình ${M(q2(x, op))}?`, M(P2(...good)), bad.map(pt => M(P2(...pt))),
      p(`Thay từng cặp vào vế trái rồi so với ${M(x.c)}.`) + p(`Với ${M(P2(...good))}: ${M(t(good))}, ${M(`${vl(x, good)}${RT[op]}${x.c}`)} là khẳng định đúng.`) + p(inclusive(op) ? 'Dấu có “=” nên cặp số nằm trên đường biên vẫn là nghiệm; các cặp còn lại làm bất đẳng thức sai.' : 'Dấu bất đẳng thức chặt nên cặp số nằm trên đường biên <b>không</b> là nghiệm; chỉ cặp số nằm hẳn về một phía mới thỏa mãn.')); };
  B.origin = (r, ci) => { const x = genIneq(r), O = satI(x, [0, 0]), solid = inclusive(x.op), d = lineName(x);
    const txt = (a, b) => `Nửa mặt phẳng bờ ${M('d')} ${a ? 'chứa' : 'không chứa'} gốc ${M('O')}; đường thẳng ${M('d')} vẽ nét ${b ? 'liền' : 'đứt'}.`;
    return mc('Thông hiểu', `Gọi ${M(`d:\\ ${d}`)}. Biểu diễn miền nghiệm của bất phương trình ${M(q2(x, x.op))}, khẳng định nào đúng?`, txt(O, solid), [txt(!O, solid), txt(O, !solid), txt(!O, !solid)],
      p(`Thay ${M('O(0;\\,0)')}: ${M(`0${RT[x.op]}${x.c}`)} là khẳng định ${tv(O)}, nên miền nghiệm ${O ? 'chứa' : 'không chứa'} gốc ${M('O')}.`) + p(`Dấu ${M(RT[x.op])} ${solid ? 'có' : 'không có'} dấu “=”, nên ${M('d')} ${solid ? 'thuộc' : 'không thuộc'} miền nghiệm: vẽ nét ${solid ? 'liền' : 'đứt'}.`)); };
  B.testPt = (r, ci) => { const a = pickR(r, [1, 2, 3, -1, -2]), b = pickR(r, [-1, -2, 1, 2, 3, -3]), x = {a, b, c: 0, op: pickR(r, ['gt', 'ge', 'lt', 'le']), lhs: lin(a, b)}, off = [[1, 0], [0, 1], [1, 1], [-1, 0], [0, -1], [2, 0], [0, 2], [1, -1], [-1, 1]].filter(pt => vl(x, pt) !== 0);
    return mc('Vận dụng', `Để xác định miền nghiệm của ${M(q2(x, x.op))}, ta cần lấy một điểm thử không nằm trên đường thẳng ${M(`${x.lhs}=0`)}. Điểm nào sau đây <b>không</b> dùng được?`, M('O(0;\\,0)'), shuf(r, off).slice(0, 3).map(pt => M(P2(...pt))),
      p(`Đường thẳng ${M(`${x.lhs}=0`)} đi qua gốc tọa độ vì ${M('0=0')}. Vậy ${M('O')} nằm <b>trên</b> đường biên, thay vào chỉ được ${M(`0${RT[x.op]}0`)} và không cho biết nửa mặt phẳng nào thỏa mãn.`) + p('Ba điểm còn lại đều có vế trái khác 0, nên thử được.')); };
  B.sysPair = (r, ci, o) => { for (let it = 0; it < 300; it++) { const L = []; for (let k = 0; k < o.lines; k++) L.push([ri(r, 1, 4), ri(r, 1, 4), ri(r, 6, 16)]); const cons = [[-1, 0, 0], [0, -1, 0], ...L];
    const G = ptsGrid(), viol = pt => cons.map((c, i) => c[0] * pt[0] + c[1] * pt[1] > c[2] ? i : -1).filter(i => i >= 0), ok = G.filter(pt => !viol(pt).length && pt[0] + pt[1] > 1), one = G.filter(pt => viol(pt).length === 1);
    const pick = []; const seen = new Set(); shuf(r, one).forEach(pt => { const v = viol(pt)[0]; if (!seen.has(v) && pick.length < 3) { seen.add(v); pick.push(pt); } }); shuf(r, one).forEach(pt => { if (pick.length < 3 && !pick.includes(pt)) pick.push(pt); });
    if (!ok.length || pick.length < 3) continue; const good = pickR(r, ok), why = pt => conTex(cons[viol(pt)[0]]);
    return mc('Vận dụng', `Cặp số nào sau đây là nghiệm của hệ bất phương trình ${M(SYS(cons))}?`, M(P2(...good)), pick.map(pt => M(P2(...pt))),
      p('Một cặp là nghiệm của hệ khi thỏa mãn <b>tất cả</b> các bất phương trình của hệ cùng lúc.') + p(`Cặp ${M(P2(...good))} thỏa mãn mọi dòng của hệ.`) + p(`Mỗi cặp còn lại chỉ vi phạm đúng một điều kiện, chẳng hạn ${M(P2(...pick[0]))} vi phạm ${M(why(pick[0]))}.`)); } throw new Error('sysPair'); };
  B.lineInt = (r, ci) => { for (let it = 0; it < 200; it++) { const x0 = ri(r, 1, 6), y0 = ri(r, 1, 6), a1 = ri(r, 1, 4), b1 = ri(r, 1, 4), a2 = ri(r, 1, 4), b2 = ri(r, -3, 3);
    if (x0 === y0 || !b2 || a1 * b2 - a2 * b1 === 0) continue; const c1 = a1 * x0 + b1 * y0, c2 = a2 * x0 + b2 * y0, g = M(P2(x0, y0));
    return mc('Thông hiểu', `Tọa độ giao điểm của hai đường thẳng ${M(`d_1:\\ ${lin(a1, b1)}=${c1}`)} và ${M(`d_2:\\ ${lin(a2, b2)}=${c2}`)} là`, g, wrong3(g, [P2(y0, x0), P2(x0 + 1, y0), P2(x0, y0 + 1), P2(x0 - 1, y0 + 1)].map(M)),
      p(`Giao điểm là nghiệm của hệ ${M(SYS2([[a1, b1, c1], [a2, b2, c2]]))}.`) + p(`Thay ${M(`x=${x0},\\ y=${y0}`)}: ${M(`${a1}\\cdot${x0}+${b1}\\cdot${y0}=${c1}`)} và ${M(`${a2}\\cdot${x0}${b2 < 0 ? '-' : '+'}${Math.abs(b2)}\\cdot${y0}=${c2}`)} đều đúng. Giao điểm là ${g}.`)); } throw new Error('lineInt'); };
  const SYS2 = rows => `\\begin{cases}${rows.map(([a, b, c]) => `${lin(a, b)}=${c}`).join('\\\\')}\\end{cases}`;
  B.optMc = (r, ci, o) => { const lp = genLP(r, 2, o.min), u = ri(r, 1, 6), v = ri(r, 1, 6), F = vals(u, v, lp.V), ans = o.min ? Math.min(...F) : Math.max(...F);
    return mc('Vận dụng', `Cho hệ ${M(SYS(lp.cons))}. Giá trị ${o.min ? 'nhỏ' : 'lớn'} nhất của ${M(`F=${lin(u, v).replace(/x/g, 'x')}`)} trên miền nghiệm là`, M(ans), wrong3(M(ans), [...F.filter(f => f !== ans), ans + u, ans + v].map(M)),
      p(`Miền nghiệm là đa giác lồi có các đỉnh ${M(vTex(lp.V))}.`) + p(`Giá trị ${o.min ? 'nhỏ' : 'lớn'} nhất của ${M('F')} đạt tại một đỉnh. Tính: ${valSol(u, v, lp.V)}.`) + p(`Chọn giá trị ${o.min ? 'nhỏ' : 'lớn'} nhất: ${M(ans)}.`)); };
  B.vCount = (r, ci) => { const lp = genLP(r, ci % 2 ? 3 : 2, false), n = lp.V.length;
    return mc('Thông hiểu', `Miền nghiệm của hệ ${M(SYS(lp.cons))} là một đa giác lồi. Đa giác đó có bao nhiêu đỉnh?`, M(n), wrong3(M(n), [3, 4, 5, 6, 7].map(M)),
      p(`Các đỉnh là giao điểm của các đường biên nằm trong miền nghiệm: ${M(vTex(lp.V))}.`) + p(`Vậy đa giác có ${M(n)} đỉnh. Không phải giao điểm nào của hai đường biên cũng là đỉnh, vì có giao điểm nằm ngoài miền nghiệm.`)); };
  const CTX = [
    (a, b, most, T) => `Một học sinh làm ${M('x')} bài Toán (mỗi bài mất ${a} phút) và ${M('y')} bài Văn (mỗi bài mất ${b} phút). Tổng thời gian làm bài ${most ? 'không vượt quá' : 'ít nhất là'} ${T} phút.`,
    (a, b, most, T) => `Một nông dân trồng ${M('x')} sào rau (mỗi sào cần ${a} giờ công) và ${M('y')} sào hoa (mỗi sào cần ${b} giờ công). Tổng số giờ công ${most ? 'không vượt quá' : 'ít nhất là'} ${T} giờ.`,
    (a, b, most, T) => `Một tiệm làm ${M('x')} chiếc bánh loại I (mỗi chiếc dùng ${a} gam bột) và ${M('y')} chiếc bánh loại II (mỗi chiếc dùng ${b} gam bột). Lượng bột dùng ${most ? 'không vượt quá' : 'ít nhất là'} ${T} gam.`,
    (a, b, most, T) => `Một xưởng in ${M('x')} tờ rơi (mỗi tờ máy chạy ${a} phút) và ${M('y')} áp phích (mỗi tờ máy chạy ${b} phút). Tổng thời gian chạy máy ${most ? 'không vượt quá' : 'ít nhất là'} ${T} phút.`];
  B.formu = (r, ci, o) => { const a = ri(r, 2, 6); let b = ri(r, 2, 7); if (b === a) b++; const T = ri(r, 20, 60), most = !o.atLeast, e = most ? 'le' : 'ge', good = `${a}x+${b}y${RT[e]}${T}`;
    return mc('Thông hiểu', `${CTX[(ci + (o.shift || 0)) % 4](a, b, most, T)} Bất phương trình mô tả điều kiện đó là`, M(good),
      [M(`${a}x+${b}y${RT[most ? 'ge' : 'le']}${T}`), M(`${b}x+${a}y${RT[e]}${T}`), M(`${a}x+${b}y${RT[most ? 'lt' : 'gt']}${T}`)],
      p(`Lượng dùng cho ${M('x')} đơn vị loại thứ nhất là ${M(`${a}x`)}, cho ${M('y')} đơn vị loại thứ hai là ${M(`${b}y`)}; tổng là ${M(`${a}x+${b}y`)}.`) + p(`“${most ? 'Không vượt quá' : 'Ít nhất là'}” tương ứng dấu ${M(RT[e])} (có dấu bằng). Vậy ${M(good)}.`)); };
  B.conv = (r, ci) => { const [a, b] = pickR(r, YES), good = `Nếu ${nDiv(b)} thì ${nDiv(a)}.`;
    return mc('Thông hiểu', `Cho mệnh đề ${M('P\\Rightarrow Q')}: “${ifThen(a, b).replace(/\.$/, '')}”. Mệnh đề đảo của nó là`, good, [`Nếu ${nDiv(b, 1)} thì ${nDiv(a, 1)}.`, `Nếu ${nDiv(a, 1)} thì ${nDiv(b, 1)}.`, `${nDiv(a)} khi và chỉ khi ${nDiv(b)}.`],
      p(`Mệnh đề ${M('P\\Rightarrow Q')} có đảo là ${M('Q\\Rightarrow P')}: hoán đổi giả thiết và kết luận, <b>không</b> phủ định.`) + p(`Vậy mệnh đề đảo là: “${good.replace(/\.$/, '')}” (mệnh đề này sai vì ví dụ ${M(b)} chia hết cho ${b} nhưng không chia hết cho ${a}).`)); };
  B.necsuf = (r, ci, o) => { const pr = o.neither ? pickR(r, NEI) : pickR(r, YES), sw = r() < .5, a = sw ? pr[1] : pr[0], b = sw ? pr[0] : pr[1], PQ = dv(a, b), QP = dv(b, a);
    const txt = ['P là điều kiện đủ để có Q', 'P là điều kiện cần để có Q', 'P là điều kiện cần và đủ để có Q', 'P không là điều kiện cần cũng không là điều kiện đủ để có Q'], tr = [PQ && !QP, QP && !PQ, PQ && QP, !PQ && !QP], k = tr.indexOf(true);
    return mc('Thông hiểu', `Cho ${M('P')}: “${nDiv(a)}” và ${M('Q')}: “${nDiv(b)}”. Khẳng định nào đúng?`, txt[k] + '.', txt.filter((_, i) => i !== k).map(t => t + '.'),
      p(`${M('P\\Rightarrow Q')} ${PQ ? 'đúng' : 'sai'} (${PQ ? `mọi số chia hết cho ${a} đều chia hết cho ${b}` : `chẳng hạn ${M(a)} chia hết cho ${a} nhưng không chia hết cho ${b}`}); ${M('Q\\Rightarrow P')} ${QP ? 'đúng' : 'sai'}.`) + p(`${PQ ? `${M('P\\Rightarrow Q')} đúng nên P là điều kiện đủ để có Q.` : ''} ${QP ? `${M('Q\\Rightarrow P')} đúng nên P là điều kiện cần để có Q.` : ''} Vậy: ${txt[k]}.`)); };
  B.implMc = (r, ci, o) => { const t = shuf(r, YES), f = shuf(r, YES.concat(NEI)).filter(([a, b]) => !dv(a, b)).concat(YES.map(([a, b]) => [b, a])), pair = (ok) => ok ? t.pop() : f.pop();
    const items = o.askFalse ? [pair(false), pair(true), pair(true), pair(true)] : [pair(true), pair(false), pair(false), pair(false)], txts = items.map(([a, b]) => ifThen(a, b));
    return mc('Thông hiểu', `Mệnh đề nào sau đây ${o.askFalse ? '<b>sai</b>' : '<b>đúng</b>'}?`, txts[0], txts.slice(1),
      p(`Mệnh đề “nếu ${M('n')} chia hết cho ${M('a')} thì ${M('n')} chia hết cho ${M('b')}” đúng khi và chỉ khi ${M('a')} chia hết cho ${M('b')}.`) + p(`Ở đây ${o.askFalse ? `${M(items[0][0])} không chia hết cho ${M(items[0][1])}, chẳng hạn ${M(items[0][0])} chia hết cho ${items[0][0]} nhưng không chia hết cho ${items[0][1]}` : `${M(items[0][0])} chia hết cho ${M(items[0][1])}`}, nên mệnh đề đã chọn ${o.askFalse ? 'sai' : 'đúng'}. Ba mệnh đề còn lại ${o.askFalse ? 'đúng' : 'sai (đảo ngược chiều)'}.`)); };
  B.listSet = (r, ci) => { const k = r() < .5;
    if (k) { const a = ri(r, 1, 4), b = ri(r, 2, 5), L = (lo, hi) => { const o = []; for (let i = lo; i <= hi; i++) o.push(i); return o; }, f = x => fs(x);
      return mc('Thông hiểu', `Liệt kê các phần tử của tập hợp ${M(`A=\\{x\\in\\mathbb{Z}\\mid ${-a}\\lt x\\le ${b}\\}`)}.`, M(f(L(-a + 1, b))), [M(f(L(-a, b))), M(f(L(-a + 1, b - 1))), M(f(L(-a, b - 1)))],
        p(`${M('x')} nguyên, ${M(`x\\gt ${-a}`)} nên ${M('x')} bắt đầu từ ${M(-a + 1)} (không lấy ${M(-a)}); ${M(`x\\le ${b}`)} nên lấy cả ${M(b)}.`) + p(`Vậy ${M(f(L(-a + 1, b)))}.`)); }
    const m = ri(r, 2, 4), kk = m * m + ri(r, 1, 2 * m), L = []; for (let i = -m; i <= m; i++) L.push(i); const f = x => fs(x);
    const rt = Math.floor(Math.sqrt(kk - 1e-9)), ok = []; for (let i = -rt; i <= rt; i++) if (i * i < kk) ok.push(i);
    const pos = ok.filter(x => x >= 0), wr = [f(pos), f(ok.filter(x => x !== -rt)), f(ok.concat([rt + 1])), f(ok.concat([-(rt + 1), rt + 1]))];
    return mc('Thông hiểu', `Liệt kê các phần tử của tập hợp ${M(`A=\\{x\\in\\mathbb{Z}\\mid x^2\\lt ${kk}\\}`)}.`, M(f(ok)), wrong3(M(f(ok)), wr.map(M)),
      p(`${M(`x^2\\lt ${kk}`)} nên ${M(`|x|\\le ${rt}`)} khi ${M(`${rt}^2=${rt * rt}\\lt ${kk}`)}, còn ${M(`${rt + 1}^2=${(rt + 1) ** 2}\\ge ${kk}`)}.`) + p(`Vì ${M('x')} nguyên (có cả số âm) nên ${M(f(ok))}.`)); };
  B.setMc = (r, ci, o) => { const {A, B: B2} = genSets(r), opn = o.op, res = SOP[opn][0](A, B2), names = {cap: 'giao', cup: 'hợp', diff: 'hiệu', diffBA: 'hiệu'};
    const key = o.count ? res.length : null, show = o.count ? M(res.length) : M(fs(res)), others = Object.keys(SOP).filter(k => k !== opn).map(k => o.count ? M(SOP[k][0](A, B2).length) : M(fs(SOP[k][0](A, B2))));
    const extra = o.count ? [M(res.length + 1), M(Math.max(0, res.length - 1)), M(A.length)] : [M(fs(tweak(r, res, A, B2)))];
    return mc('Thông hiểu', `Cho ${M(`A=${fs(A)}`)} và ${M(`B=${fs(B2)}`)}. ${o.count ? `Số phần tử của tập hợp ${M(SOP[opn][1])} là` : `Tập hợp ${M(SOP[opn][1])} là`}`, show, wrong3(show, [...extra, ...others]),
      p(`${opn === 'cap' ? 'Giao gồm các phần tử thuộc <b>cả hai</b> tập' : opn === 'cup' ? 'Hợp gồm các phần tử thuộc <b>ít nhất một</b> trong hai tập (mỗi phần tử chỉ kể một lần)' : opn === 'diff' ? `${M('A\\setminus B')} gồm các phần tử thuộc ${M('A')} mà <b>không</b> thuộc ${M('B')}` : `${M('B\\setminus A')} gồm các phần tử thuộc ${M('B')} mà <b>không</b> thuộc ${M('A')}`}.`) + p(`Ta có ${M(`${SOP[opn][1]}=${fs(res)}`)}${o.count ? `, gồm ${M(res.length)} phần tử` : ''}.`)); };
  B.ivMc = (r, ci, o) => { const {A, B: B2} = genAB(r, {ray: o.ray}), op = o.op, c = M(opTex(op, A, B2)), tg = OPS[op][0](toggled(A), toggled(B2)), pool = [M(setTex(tg)), ...['cap', 'cup', 'diff', 'diffBA', 'comp'].filter(k => k !== op).map(k => M(opTex(k, A, B2)))];
    const dsc = {cap: 'Giao: phần chung của hai tập trên trục số', cup: 'Hợp: gộp phần của hai tập trên trục số', diff: `Hiệu ${M('A\\setminus B')}: phần của ${M('A')} nằm ngoài ${M('B')}`, comp: `Phần bù: tất cả số thực không thuộc ${M('A')}`};
    return mc(op === 'cap' ? 'Vận dụng' : 'Thông hiểu', `Cho ${ivDesc('A', A)}${op === 'comp' ? '' : ` và ${ivDesc('B', B2)}`}. Tập hợp ${M(OPS[op][1])} là`, c, wrong3(c, pool),
      p(`${dsc[op]}. Biểu diễn ${op === 'comp' ? M('A') : `${M('A')} và ${M('B')}`} trên cùng một trục số, chú ý đầu mút nào lấy (ngoặc vuông) hay không lấy (ngoặc tròn).`) + p(`Kết quả: ${c}.`)); };
  B.subRel = (r, ci, o) => { const S = [[iv(1, 3, false, false), iv(1, 3, true, true)], [iv(-2, 2, true, true), iv(-2, 2, false, false)], [iv(0, 4, true, true), iv(1, 3, false, false)], [iv(0, 2, false, false), iv(2, 5, true, true)],
    [iv(1, 5, false, false), iv(1, 5, true, false)], [iv(-3, -1, true, true), iv(-3, -1, false, true)], [iv(-1, 2, false, true), iv(2, 6, false, false)], [iv(1, 4, true, false), iv(4, 7, true, true)]], [A, B2] = S[o * 4 + ci];
    const sub = (X, Y) => GRID.every(x => !inI(X, x) || inI(Y, x)), sts = [['A\\subset B', sub(A, B2)], ['B\\subset A', sub(B2, A)], ['A=B', sub(A, B2) && sub(B2, A)], ['A\\cap B=\\varnothing', GRID.every(x => !(inI(A, x) && inI(B2, x)))]], k = sts.findIndex(s => s[1]);
    if (sts.filter(s => s[1]).length !== 1) throw new Error('subRel');
    return mc('Vận dụng', `Cho ${ivDesc('A', A)} và ${ivDesc('B', B2)}. Khẳng định nào sau đây đúng?`, M(sts[k][0]), sts.filter((_, i) => i !== k).map(s => M(s[0])),
      p(`So sánh hai tập trên trục số, đặc biệt tại các đầu mút (ngoặc vuông ≠ ngoặc tròn).`) + p(`Khẳng định đúng là ${M(sts[k][0])}; ba khẳng định còn lại sai vì có phần tử của tập này không thuộc tập kia (hoặc hai tập có phần chung).`)); };

  /* ================= ĐÚNG / SAI ================= */
  const claim = (want, t, f, sol) => want ? {text: t, ok: true, sol: sol + ' Vậy khẳng định này <b>đúng</b>.'} : {text: f, ok: false, sol: sol + ' Vậy khẳng định này <b>sai</b>.'};
  const pat = r => { const k = ri(r, 1, 3); return shuf(r, [0, 1, 2, 3].map(i => i < k)); };
  B.tfQuant = (r, ci, o) => { const s = genStm(r, o.doms), n = negS(s), t = truthS(s), wrongNeg = texS({...s, q: n.q});
    return {stem: `Cho mệnh đề ${M(`P:\\ ${texS(s)}`)}. Xét tính đúng sai của các khẳng định sau:`, items: shuf(r, [
      {text: `${M('P')} là mệnh đề ${tv(true)}.`, ok: t, sol: `<p>Kiểm tra ${M('P')} trên miền ${M(DOM[s.dom][0])}: ${s.q === 'A' ? 'phải đúng với <b>mọi</b> giá trị' : 'chỉ cần có <b>ít nhất một</b> giá trị thỏa mãn'}; kết quả ${M('P')} ${tv(t)}.</p>`},
      {text: `Phủ định của ${M('P')} là ${M(texS(n))}.`, ok: true, sol: `<p>Đổi lượng từ và đổi dấu ngược: ${M(texS(n))}.</p>`},
      {text: `Phủ định của ${M('P')} là ${M(wrongNeg)}.`, ok: false, sol: `<p>Chỉ đổi lượng từ mà giữ nguyên dấu ${M(RT[s.rel])} là sai; phải đổi cả dấu thành ${M(RT[n.rel])}.</p>`},
      {text: `Mệnh đề phủ định của ${M('P')} là mệnh đề ${tv(!t)}.`, ok: !t, sol: `<p>${M('P')} ${tv(t)} thì phủ định của nó ${tv(!t)}.</p>`}])}; };
  B.tfImpl = (r, ci) => { const [x, y] = pickR(r, YES), sw = r() < .5, a = sw ? y : x, b = sw ? x : y, PQ = dv(a, b), QP = dv(b, a);
    const ex = PQ ? `${M('P\\Rightarrow Q')} đúng, ${M('Q\\Rightarrow P')} sai (chẳng hạn ${M(b)} chia hết cho ${b} nhưng không chia hết cho ${a})` : `${M('Q\\Rightarrow P')} đúng, ${M('P\\Rightarrow Q')} sai (chẳng hạn ${M(a)} chia hết cho ${a} nhưng không chia hết cho ${b})`;
    return {stem: `Cho ${M('P')}: “${nDiv(a)}” và ${M('Q')}: “${nDiv(b)}”. Xét tính đúng sai của các khẳng định sau:`, items: [
      {text: `Mệnh đề ${M('P\\Rightarrow Q')} là mệnh đề đúng.`, ok: PQ, sol: `<p>${ex}.</p>`},
      {text: `Mệnh đề ${M('Q\\Rightarrow P')} là mệnh đề đúng.`, ok: QP, sol: `<p>${ex}.</p>`},
      {text: `${M('P')} là điều kiện đủ để có ${M('Q')}.`, ok: PQ, sol: `<p>${M('P')} là điều kiện đủ để có ${M('Q')} khi ${M('P\\Rightarrow Q')} đúng; ở đây ${PQ ? 'đúng' : 'sai'}.</p>`},
      {text: `${M('P')} là điều kiện cần và đủ để có ${M('Q')}.`, ok: false, sol: `<p>Điều kiện cần và đủ đòi hỏi cả hai chiều ${M('P\\Rightarrow Q')} và ${M('Q\\Rightarrow P')} cùng đúng, mà ${ex}.</p>`}]}; };
  B.tfSets = (r, ci) => { const {A, B: B2} = genSets(r), keys = ['cap', 'cup', 'diff', 'diffBA'], w = pat(r);
    return {stem: `Cho ${M(`A=${fs(A)}`)} và ${M(`B=${fs(B2)}`)}. Xét tính đúng sai của các khẳng định sau:`, items: keys.map((k, i) => { const res = SOP[k][0](A, B2), bad = tweak(r, res, A, B2);
      return claim(w[i], `${M(`${SOP[k][1]}=${fs(res)}`)}.`, `${M(`${SOP[k][1]}=${fs(bad)}`)}.`, `<p>${k === 'cap' ? 'Phần tử thuộc cả hai tập' : k === 'cup' ? 'Phần tử thuộc ít nhất một tập' : k === 'diff' ? `Phần tử thuộc ${M('A')} nhưng không thuộc ${M('B')}` : `Phần tử thuộc ${M('B')} nhưng không thuộc ${M('A')}`}: ${M(`${SOP[k][1]}=${fs(res)}`)}.</p>`); })}; };
  B.tfIv = (r, ci) => { const {A, B: B2} = genAB(r), keys = ['cap', 'cup', 'diff', 'comp'], w = pat(r);
    return {stem: `Cho ${ivDesc('A', A)} và ${ivDesc('B', B2)}. Xét tính đúng sai của các khẳng định sau:`, items: keys.map((k, i) => { const good = opTex(k, A, B2), cand = [setTex(OPS[k][0](toggled(A), toggled(B2))), ...keys.concat(['diffBA']).filter(z => z !== k).map(z => opTex(z, A, B2))].find(z => z !== good);
      return claim(w[i], `${M(`${OPS[k][1]}=${good}`)}.`, `${M(`${OPS[k][1]}=${cand}`)}.`, `<p>Biểu diễn trên trục số, chú ý đầu mút: ${M(`${OPS[k][1]}=${good}`)}.</p>`); })}; };
  B.tfIneq = (r, ci) => { const x = genIneq(r), G = ptsGrid().filter(([i, j]) => Math.abs(i) <= 5 && Math.abs(j) <= 7), sat = shuf(r, G.filter(pt => satI(x, pt))), un = shuf(r, G.filter(pt => !satI(x, pt))), bd = shuf(r, G.filter(pt => vl(x, pt) === x.c)), w = pat(r), O = satI(x, [0, 0]), inc = inclusive(x.op), d = lineName(x);
    const pt = w[0] ? sat[0] : un[0];
    return {stem: `Cho bất phương trình ${M(q2(x, x.op))}, gọi ${M(`d:\\ ${d}`)}. Xét tính đúng sai của các khẳng định sau:`, items: [
      {text: `Cặp số ${M(P2(...pt))} là một nghiệm của bất phương trình.`, ok: w[0], sol: `<p>Thay vào vế trái được ${M(vl(x, pt))}; ${M(`${vl(x, pt)}${RT[x.op]}${x.c}`)} là khẳng định ${tv(w[0])}.</p>`},
      {text: `Gốc tọa độ ${M('O')} ${(w[1] ? O : !O) ? 'thuộc' : 'không thuộc'} miền nghiệm.`, ok: w[1], sol: `<p>Thay ${M('x=0,y=0')}: ${M(`0${RT[x.op]}${x.c}`)} là khẳng định ${tv(O)}, nên ${M('O')} ${O ? 'thuộc' : 'không thuộc'} miền nghiệm.</p>`},
      {text: `Khi biểu diễn miền nghiệm, đường thẳng ${M('d')} phải vẽ bằng nét ${w[2] ? (inc ? 'liền' : 'đứt') : (inc ? 'đứt' : 'liền')}.`, ok: w[2], sol: `<p>Dấu ${M(RT[x.op])} ${inc ? 'có' : 'không có'} dấu “=” nên ${M('d')} ${inc ? 'thuộc' : 'không thuộc'} miền nghiệm: nét ${inc ? 'liền' : 'đứt'}.</p>`},
      {text: `Cặp số ${M(P2(...bd[0]))} nằm trên ${M('d')} ${w[3] ? (inc ? 'là' : 'không là') : (inc ? 'không là' : 'là')} nghiệm của bất phương trình.`, ok: w[3], sol: `<p>Điểm trên ${M('d')} cho vế trái bằng ${M(x.c)}; ${M(`${x.c}${RT[x.op]}${x.c}`)} ${inc ? 'đúng' : 'sai'}, nên ${inc ? 'là' : 'không là'} nghiệm.</p>`}]}; };
  B.tfLp = (r, ci) => { const lp = genLP(r, 2, false), u = ri(r, 1, 6), v = ri(r, 1, 6), F = vals(u, v, lp.V), mx = Math.max(...F), mn = Math.min(...F), w = pat(r), G = ptsGrid().filter(([i, j]) => i >= 0 && j >= 0 && i <= 10 && j <= 12);
    const inR = shuf(r, G.filter(pt => lp.cons.every(c => c[0] * pt[0] + c[1] * pt[1] <= c[2]))), outR = shuf(r, G.filter(pt => !lp.cons.every(c => c[0] * pt[0] + c[1] * pt[1] <= c[2]))), n = lp.V.length, pt = w[1] ? inR[0] : outR[0];
    const alt = [3, 4, 5, 6].find(k => k !== n);
    return {stem: `Cho hệ ${M(SYS(lp.cons))} và ${M(`F=${lin(u, v)}`)}. Xét tính đúng sai của các khẳng định sau:`, items: [
      claim(w[0], `Miền nghiệm của hệ là đa giác có ${M(n)} đỉnh.`, `Miền nghiệm của hệ là đa giác có ${M(alt)} đỉnh.`, `<p>Các đỉnh là ${M(vTex(lp.V))}, tức ${M(n)} đỉnh.</p>`),
      {text: `Cặp số ${M(P2(...pt))} thuộc miền nghiệm của hệ.`, ok: w[1], sol: `<p>Thay vào từng bất phương trình của hệ: ${w[1] ? 'tất cả đều đúng' : 'có ít nhất một bất phương trình sai'}.</p>`},
      claim(w[2], `Giá trị lớn nhất của ${M('F')} bằng ${M(mx)}.`, `Giá trị lớn nhất của ${M('F')} bằng ${M(mx + u)}.`, `<p>Tính ${M('F')} tại các đỉnh: ${valSol(u, v, lp.V)}. Giá trị lớn nhất là ${M(mx)}.</p>`),
      claim(w[3], `Giá trị nhỏ nhất của ${M('F')} bằng ${M(mn)}.`, `Giá trị nhỏ nhất của ${M('F')} bằng ${M(mn + 1)}.`, `<p>Tại các đỉnh ${M('F')} nhận các giá trị ${M(vals(u, v, lp.V).join(';\\ '))}; nhỏ nhất là ${M(mn)}.</p>`)]}; };

  /* ================= TRẢ LỜI NGẮN ================= */
  B.shSub = (r, ci, o) => { const k = ri(r, 5, 8), K = {two: [`Có bao nhiêu tập con có đúng 2 phần tử của một tập hợp có ${k} phần tử?`, k * (k - 1) / 2, `Chọn 2 phần tử trong ${k}: ${M(`\\dfrac{${k}\\cdot${k - 1}}{2}`)}.`],
      has: [`Tập ${M('A')} có ${k} phần tử, trong đó có phần tử ${M('a')}. Có bao nhiêu tập con của ${M('A')} chứa phần tử ${M('a')}?`, 2 ** (k - 1), `Giữ cố định ${M('a')}, mỗi phần tử trong ${M(k - 1)} phần tử còn lại hoặc có hoặc không: ${M(`2^{${k - 1}}`)}.`],
      not: [`Tập ${M('A')} có ${k} phần tử, trong đó có phần tử ${M('a')}. Có bao nhiêu tập con của ${M('A')} <b>không</b> chứa ${M('a')}?`, 2 ** (k - 1), `Bỏ ${M('a')}, còn ${M(k - 1)} phần tử, mỗi phần tử có hoặc không: ${M(`2^{${k - 1}}`)}.`]}[o], ans = K[1];
    return {q: K[0], ans: String(ans), sol: p(K[2]) + p(`Đáp số: ${M(ans)}.`)}; };
  B.shIe = (r, ci, o) => { const N = ri(r, 36, 48), c = ri(r, 4, 9), a = c + ri(r, 8, 14), b = c + ri(r, 6, 12), uni = a + b - c, K = {none: [`Số học sinh không giỏi môn nào trong hai môn`, N - uni, `${M(`${N}-(${a}+${b}-${c})=${N - uni}`)}`], one: [`Số học sinh giỏi <b>đúng một</b> môn`, a + b - 2 * c, `${M(`(${a}-${c})+(${b}-${c})=${a + b - 2 * c}`)}`], any: [`Số học sinh giỏi ít nhất một trong hai môn`, uni, `${M(`${a}+${b}-${c}=${uni}`)}`], only: [`Số học sinh giỏi Toán nhưng không giỏi Văn`, a - c, `${M(`${a}-${c}=${a - c}`)}`]}[o];
    if (N - uni <= 0) return B.shIe(r, ci, o);
    return {q: `Lớp 10A có ${N} học sinh, trong đó ${a} em giỏi Toán, ${b} em giỏi Văn và ${c} em giỏi cả hai môn. ${K[0]} là bao nhiêu?`, ans: String(K[1]), sol: p(`Theo công thức ${M('|A\\cup B|=|A|+|B|-|A\\cap B|')}, số em giỏi ít nhất một môn là ${M(`${a}+${b}-${c}=${uni}`)}.`) + p(`${K[0]}: ${K[2]}.`) + p(`Đáp số: ${M(K[1])}.`)}; };
  B.shCnt = (r, ci, o) => { const {A, B: B2} = genAB(r, {}), res = OPS[o][0](A, B2), n = cntInt(res), dd = {cap: 'giao', diff: 'hiệu', cup: 'hợp'}[o];
    if (n < 2 || n > 20) return B.shCnt(r, ci, o);
    const ints = []; for (let x = -25; x <= 25; x++) if (res(x)) ints.push(x);
    return {q: `Cho ${ivDesc('A', A)} và ${ivDesc('B', B2)}. Có bao nhiêu số nguyên thuộc tập hợp ${M(OPS[o][1])}?`, ans: String(n), sol: p(`${M(OPS[o][1])}=${M(opTex(o, A, B2))}.`) + p(`Các số nguyên thuộc tập này: ${M(ints.map(nm).join(';\\,'))}.`) + p(`Đáp số: ${M(n)} (chú ý đầu mút nào thuộc, đầu mút nào không).`)}; };
  B.shSys = (r, ci) => { for (let it = 0; it < 200; it++) { const a = ri(r, 1, 4), b = ri(r, 1, 4), c = ri(r, 8, 16), k = pickR(r, [[-1, 0, -1], [0, -1, -1], [-1, 0, -2]]), cons = [[-1, 0, 0], [0, -1, 0], [a, b, c], k]; let n = 0; const L = [];
    for (let x = 0; x <= 30; x++) { let m = 0; for (let y = 0; y <= 30; y++) if (cons.every(([p1, q1, c1]) => p1 * x + q1 * y <= c1)) m++; if (m) L.push([x, m]); n += m; }
    if (n < 8 || n > 40) continue; return {q: `Có bao nhiêu cặp số nguyên ${M('(x;\\,y)')} thỏa mãn hệ ${M(SYS(cons))}?`, ans: String(n), sol: p(`Liệt kê theo từng giá trị nguyên của ${M('x')} rồi đếm ${M('y')}: ${M(L.map(([x, m]) => `x=${x}:\\ ${m}`).join(';\\ '))}.`) + p(`Tổng: ${M(n)} cặp.`)}; } throw new Error('shSys'); };
  B.shOpt = (r, ci, o) => { const lp = genLP(r, 2, o.min), u = ri(r, 1, 7), v = ri(r, 1, 7), F = vals(u, v, lp.V), ans = o.min ? Math.min(...F) : Math.max(...F);
    return {q: `Tìm giá trị ${o.min ? 'nhỏ' : 'lớn'} nhất của ${M(`F=${lin(u, v)}`)} trên miền nghiệm của hệ ${M(SYS(lp.cons))}.`, ans: String(ans), sol: p(`Miền nghiệm là đa giác có các đỉnh ${M(vTex(lp.V))}.`) + p(`Tính ${M('F')} tại các đỉnh: ${valSol(u, v, lp.V)}.`) + p(`Giá trị ${o.min ? 'nhỏ' : 'lớn'} nhất là ${M(ans)}.`)}; };
  B.shTrue = (r, ci) => { const S = [0, 1, 2, 3].map(() => genStm(r)), n = S.filter(truthS).length;
    return {q: `Cho các mệnh đề: ${S.map((s, i) => `(${i + 1}) ${M(texS(s))}`).join('; ')}. Có bao nhiêu mệnh đề đúng trong các mệnh đề trên?`, ans: String(n), sol: p(S.map((s, i) => `(${i + 1}) ${tv(truthS(s))}`).join('; ') + '.') + p(`Số mệnh đề đúng: ${M(n)}.`)}; };
  B.shLine = (r, ci) => { for (let it = 0; it < 200; it++) { const x0 = ri(r, 1, 7), y0 = ri(r, 1, 7), a1 = ri(r, 1, 4), b1 = ri(r, 1, 4), a2 = ri(r, 1, 4), b2 = ri(r, -3, 3), pp = ri(r, 1, 3), qq = ri(r, 1, 3);
    if (!b2 || x0 === y0 || a1 * b2 - a2 * b1 === 0) continue; const c1 = a1 * x0 + b1 * y0, c2 = a2 * x0 + b2 * y0, ans = pp * x0 + qq * y0;
    return {q: `Gọi ${M('(x_0;\\,y_0)')} là giao điểm của ${M(`d_1:\\ ${lin(a1, b1)}=${c1}`)} và ${M(`d_2:\\ ${lin(a2, b2)}=${c2}`)}. Tính ${M(`${pp === 1 ? '' : pp}x_0+${qq === 1 ? '' : qq}y_0`)}.`, ans: String(ans), sol: p(`Giải hệ ${M(SYS2([[a1, b1, c1], [a2, b2, c2]]))} được ${M(`x_0=${x0},\\ y_0=${y0}`)}.`) + p(`${M(`${pp}\\cdot${x0}+${qq}\\cdot${y0}=${ans}`)}.`)}; } throw new Error('shLine'); };
  const PR = [['xưởng', 'sản phẩm loại I', 'sản phẩm loại II', 'máy A', 'máy B'], ['nhà máy', 'chiếc ghế', 'chiếc bàn', 'công đoạn cắt', 'công đoạn lắp'], ['trang trại', 'sào lúa', 'sào ngô', 'giờ máy cày', 'giờ tưới nước'], ['cửa hàng bánh', 'bánh loại I', 'bánh loại II', 'lò nướng', 'máy trộn']];
  B.shPrac = (r, ci, o) => { const lp = genLP(r, 2, false), c = PR[(ci + (o || 0)) % 4], u = ri(r, 2, 8), v = ri(r, 2, 8), [l1, l2] = lp.L, ans = Math.max(...vals(u, v, lp.V)), ci2 = ci;
    return {q: `Một ${c[0]} làm hai loại: ${c[1]} và ${c[2]}. Mỗi ${c[1]} cần ${l1[0]} giờ ${c[3]} và ${l2[0]} giờ ${c[4]}; mỗi ${c[2]} cần ${l1[1]} giờ ${c[3]} và ${l2[1]} giờ ${c[4]}. Mỗi ngày ${c[3]} làm tối đa ${l1[2]} giờ, ${c[4]} tối đa ${l2[2]} giờ. Lãi mỗi ${c[1]} là ${u} triệu đồng, mỗi ${c[2]} là ${v} triệu đồng. Lãi lớn nhất mỗi ngày là bao nhiêu triệu đồng?`, ans: String(ans),
      sol: p(`Gọi ${M('x,y')} là số ${c[1]} và ${c[2]} làm trong một ngày. Điều kiện: ${M(lp.cons.map(conTex).join(',\\ '))}.`) + p(`Lãi: ${M(`F=${lin(u, v)}`)} (triệu đồng). Đỉnh của miền nghiệm: ${M(vTex(lp.V))}.`) + p(`${valSol(u, v, lp.V)}. Lãi lớn nhất là ${M(ans)} triệu đồng.`)}; };

  /* ================= GHÉP 5 BÀI ================= */
  const L = (n, i, f, ...a) => ci => f(R(n * 1009 + i * 37 + ci * 7 + 11), ci, ...a);
  const T = (n, title, mcs, tfs, shs) => StudentTest.add({grade: 'lop10', id: `tong-hop-${n}`, topic: 2, title, time: 20, counts: {mc: 8, tf: 2, short: 4}, mcPt: .5, tfPt: 1, shortPt: 1, codes: [`TH${n}A`, `TH${n}B`, `TH${n}C`, `TH${n}D`],
    mc: mcs.map((x, i) => L(n, i, x[0], x[1])), tf: tfs.map((x, i) => L(n, 20 + i, x[0], x[1])), short: shs.map((x, i) => L(n, 30 + i, x[0], x[1]))});
  T(1, 'Test tổng hợp 1 – Mệnh đề, tập hợp và bất phương trình bậc nhất hai ẩn',
    [[B.isProp, 0], [B.negQ, {}], [B.intNote, {}], [B.subsets, {kind: 'all'}], [B.isLin], [B.solPair, {}], [B.origin], [B.sysPair, {lines: 1}]],
    [[B.tfQuant, {}], [B.tfIneq]], [[B.shSub, 'two'], [B.shIe, 'none'], [B.shSys], [B.shOpt, {min: false}]]);
  T(2, 'Test tổng hợp 2 – Điều kiện cần, đủ; giao hợp; giao điểm và tối ưu',
    [[B.conv], [B.necsuf, {}], [B.listSet], [B.setMc, {op: 'diff'}], [B.ivMc, {op: 'cap', ray: false}], [B.lineInt], [B.optMc, {min: false}], [B.formu, {}]],
    [[B.tfImpl], [B.tfSets]], [[B.shCnt, 'cap'], [B.shTrue], [B.shLine], [B.shPrac, 0]]);
  T(3, 'Test tổng hợp 3 – Phủ định, khoảng – đoạn và miền nghiệm của hệ',
    [[B.implMc, {askFalse: true}], [B.negQ, {doms: ['N', 'Z']}], [B.subRel, 0], [B.ivMc, {op: 'cup', ray: true}], [B.intNote, {ray: true}], [B.solPair, {}], [B.sysPair, {lines: 2}], [B.optMc, {min: true}]],
    [[B.tfIv], [B.tfLp]], [[B.shSub, 'has'], [B.shIe, 'one'], [B.shCnt, 'diff'], [B.shOpt, {min: true}]]);
  T(4, 'Test tổng hợp 4 – Tập hợp, điểm thử và bài toán tối ưu',
    [[B.implMc, {askFalse: false}], [B.negQ, {doms: ['R']}], [B.setMc, {op: 'cap', count: true}], [B.ivMc, {op: 'diff', ray: false}], [B.ivMc, {op: 'comp', ray: false}], [B.vCount], [B.testPt], [B.sysPair, {lines: 2}]],
    [[B.tfQuant, {doms: ['N', 'Z']}], [B.tfSets]], [[B.shCnt, 'cap'], [B.shSub, 'not'], [B.shTrue], [B.shPrac, 1]]);
  T(5, 'Test tổng hợp 5 – Luyện chốt: dễ nhầm Chương I và Chương II',
    [[B.isProp, 1], [B.necsuf, {neither: true}], [B.intNote, {}], [B.subRel, 1], [B.ivMc, {op: 'cap', ray: true}], [B.solPair, {}], [B.optMc, {min: false}], [B.formu, {atLeast: true, shift: 2}]],
    [[B.tfImpl], [B.tfLp]], [[B.shIe, 'any'], [B.shSys], [B.shLine], [B.shPrac, 2]]);
})();
