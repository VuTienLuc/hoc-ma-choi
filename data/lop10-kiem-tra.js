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
