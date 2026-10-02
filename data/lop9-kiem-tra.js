/* Bài kiểm tra học sinh – Toán 9 Kết nối tri thức. */
(() => {
  const M = x => `\\(${x}\\)`;
  const mc = (level, q, correct, wrong, sol) => ({level, q, opts:[correct, ...wrong], sol});
  const codes = [
    {n:7,A:12,B:3,k:2,a:5,b:19,pa:18,pb:8,pv:12,qa:288,qb:2,qv:12,e:3,d:2,u:7,v:3,r:3,s:2,c:2,m:3},
    {n:8,A:20,B:4,k:3,a:2,b:17,pa:12,pb:27,pv:18,qa:432,qb:3,qv:12,e:4,d:3,u:9,v:4,r:6,s:5,c:3,m:4},
    {n:9,A:30,B:5,k:2,a:7,b:29,pa:20,pb:45,pv:30,qa:500,qb:5,qv:10,e:5,d:2,u:8,v:3,r:8,s:7,c:4,m:2},
    {n:11,A:42,B:6,k:3,a:3,b:26,pa:28,pb:63,pv:42,qa:588,qb:3,qv:14,e:3,d:5,u:11,v:5,r:11,s:10,c:5,m:3}
  ];

  StudentTest.add({
    grade:'lop9', id:'c3', topic:3,
    title:'Kiểm tra Chủ đề 3 – Căn bậc hai và căn bậc ba',
    time:60, codes:['301','302','303','304'],
    mc:[
      ci => { const x=codes[ci]; return mc('Nhận biết', `Giá trị của ${M(`\\sqrt{${x.n*x.n}}`)} bằng`, M(x.n), [M(-x.n),M(x.n*x.n),M(`\\sqrt{${x.n}}`)], `<p>Căn bậc hai số học luôn không âm. Vì ${M(`${x.n}\\ge0`)} nên</p><p>${M(`\\sqrt{${x.n*x.n}}=\\sqrt{${x.n}^2}=|${x.n}|=${x.n}`)}.</p>`); },
      ci => { const x=codes[ci]; return mc('Nhận biết', `Cho ${M('x\\lt0')}. Rút gọn ${M('\\sqrt{x^2}')}.`, M('-x'), [M('x'),M('x^2'),M('-x^2')], `<p>Với mọi số thực ${M('x')}, ta có ${M('\\sqrt{x^2}=|x|')}.</p><p>Do giả thiết ${M('x\\lt0')} nên ${M('|x|=-x')}. Vậy ${M('\\sqrt{x^2}=-x')}.</p>`); },
      ci => { const x=codes[ci], r=x.A/x.B; return mc('Nhận biết', `Điều kiện xác định của ${M(`\\sqrt{${x.A}-${x.B}x}`)} là`, M(`x\\le ${r}`), [M(`x\\ge ${r}`),M(`x\\lt${r}`),M(`x\\ne ${r}`)], `<p>Căn thức xác định khi biểu thức dưới dấu căn không âm:</p><p>${M(`${x.A}-${x.B}x\\ge0\\Leftrightarrow ${x.B}x\\le${x.A}\\Leftrightarrow x\\le${r}`)}.</p>`); },
      ci => { const x=codes[ci], left=x.k*x.k*x.a, greater=left>x.b, sign=greater?'\\gt':'\\lt'; return mc('Thông hiểu', `Điền dấu thích hợp vào chỗ trống: ${M(`${x.k}\\sqrt{${x.a}}\\;\\ldots\\;\\sqrt{${x.b}}`)}.`, M(sign), [M(greater?'\\lt':'\\gt'),M('='),'Không so sánh được'], `<p>Hai vế đều dương nên có thể so sánh bình phương của chúng.</p><p>${M(`(${x.k}\\sqrt{${x.a}})^2=${left}`)} và ${M(`(\\sqrt{${x.b}})^2=${x.b}`)}.</p><p>Vì ${M(`${left}${sign}${x.b}`)} nên ${M(`${x.k}\\sqrt{${x.a}}${sign}\\sqrt{${x.b}}`)}.</p>`); },
      ci => { const x=codes[ci]; return mc('Thông hiểu', `Rút gọn ${M(`\\sqrt{${x.pa}}\\cdot\\sqrt{${x.pb}}`)}.`, M(x.pv), [M(x.pv/2),M(x.pv*2),M(x.pa+x.pb)], `<p>Hai số dưới dấu căn đều không âm, do đó</p><p>${M(`\\sqrt{${x.pa}}\\cdot\\sqrt{${x.pb}}=\\sqrt{${x.pa*x.pb}}=\\sqrt{${x.pv}^2}=${x.pv}`)}.</p>`); },
      ci => { const x=codes[ci]; return mc('Thông hiểu', `Tính ${M(`\\dfrac{\\sqrt{${x.qa}}}{\\sqrt{${x.qb}}}`)}.`, M(x.qv), [M(x.qv*x.qv),M(x.qv/2),M(x.qv+x.qb)], `<p>Vì ${M(`${x.qb}\\gt0`)} nên áp dụng quy tắc chia hai căn thức:</p><p>${M(`\\dfrac{\\sqrt{${x.qa}}}{\\sqrt{${x.qb}}}=\\sqrt{\\dfrac{${x.qa}}{${x.qb}}}=\\sqrt{${x.qv*x.qv}}=${x.qv}`)}.</p>`); },
      ci => { const x=codes[ci], rad=x.e*x.e*x.d; return mc('Thông hiểu', `Đưa thừa số ra ngoài dấu căn: ${M(`\\sqrt{${rad}}`)}.`, M(`${x.e}\\sqrt{${x.d}}`), [M(`${x.e*x.d}\\sqrt{${x.d}}`),M(`${x.e*x.e}\\sqrt{${x.d}}`),M(`\\sqrt{${x.e*x.d}}`)], `<p>Phân tích ${M(`${rad}=${x.e*x.e}\\cdot${x.d}=${x.e}^2\\cdot${x.d}`)}.</p><p>Vì ${M(`${x.e}\\gt0`)} nên ${M(`\\sqrt{${rad}}=\\sqrt{${x.e}^2\\cdot${x.d}}=${x.e}\\sqrt{${x.d}}`)}.</p>`); },
      ci => { const x=codes[ci], z=x.u-x.v; return mc('Thông hiểu', `Thu gọn ${M(`${x.u}\\sqrt{${x.d}}-${x.v}\\sqrt{${x.d}}`)}.`, M(`${z}\\sqrt{${x.d}}`), [M(`${x.u+x.v}\\sqrt{${x.d}}`),M(`${z*x.d}`),M(`${z}\\sqrt{${x.d*x.d}}`)], `<p>Hai căn thức đồng dạng nên giữ nguyên ${M(`\\sqrt{${x.d}}`)} và trừ các hệ số:</p><p>${M(`${x.u}\\sqrt{${x.d}}-${x.v}\\sqrt{${x.d}}=(${x.u}-${x.v})\\sqrt{${x.d}}=${z}\\sqrt{${x.d}}`)}.</p>`); },
      ci => { const x=codes[ci]; return mc('Vận dụng', `Khử mẫu của biểu thức ${M(`\\dfrac{${x.c}}{\\sqrt{${x.c}}}`)}.`, M(`\\sqrt{${x.c}}`), [M(`${x.c}\\sqrt{${x.c}}`),M(`\\dfrac1{\\sqrt{${x.c}}}`),M('1')], `<p>Nhân cả tử và mẫu với ${M(`\\sqrt{${x.c}}`)}:</p><p>${M(`\\dfrac{${x.c}}{\\sqrt{${x.c}}}=\\dfrac{${x.c}\\sqrt{${x.c}}}{${x.c}}=\\sqrt{${x.c}}`)}.</p>`); },
      ci => { const x=codes[ci]; return mc('Vận dụng', `Rút gọn ${M(`\\dfrac1{\\sqrt{${x.r}}-\\sqrt{${x.s}}}`)}.`, M(`\\sqrt{${x.r}}+\\sqrt{${x.s}}`), [M(`\\sqrt{${x.r}}-\\sqrt{${x.s}}`),M(`\\dfrac1{\\sqrt{${x.r}}+\\sqrt{${x.s}}}`),M(`\\sqrt{${x.r+x.s}}`)], `<p>Nhân tử và mẫu với biểu thức liên hợp ${M(`\\sqrt{${x.r}}+\\sqrt{${x.s}}`)}:</p><p>${M(`\\dfrac1{\\sqrt{${x.r}}-\\sqrt{${x.s}}}=\\dfrac{\\sqrt{${x.r}}+\\sqrt{${x.s}}}{${x.r}-${x.s}}`)}.</p><p>Do ${M(`${x.r}-${x.s}=1`)} nên kết quả là ${M(`\\sqrt{${x.r}}+\\sqrt{${x.s}}`)}.</p>`); },
      ci => { const x=codes[ci]; return mc('Vận dụng', `Giá trị của ${M(`\\sqrt[3]{-${x.n**3}}`)} bằng`, M(-x.n), [M(x.n),M(x.n*x.n),M(-x.n*x.n)], `<p>Phép khai căn bậc ba giữ nguyên dấu của số dưới dấu căn:</p><p>${M(`\\sqrt[3]{-${x.n**3}}=\\sqrt[3]{(-${x.n})^3}=-${x.n}`)}.</p>`); },
      ci => { const x=codes[ci], sum=x.k+x.m; return mc('Vận dụng cao', `Cho ${M('x\\lt0')}. Rút gọn ${M(`\\sqrt{${x.k*x.k}x^2}-\\sqrt[3]{${x.m**3}x^3}`)}.`, M(`-${sum}x`), [M(`${sum}x`),M(`-${sum+1}x`),M(`-${sum-1}x`)], `<p>Vì ${M('x\\lt0')} nên ${M(`\\sqrt{${x.k*x.k}x^2}=${x.k}|x|=-${x.k}x`)}.</p><p>Mặt khác, ${M(`\\sqrt[3]{${x.m**3}x^3}=${x.m}x`)} vì căn bậc ba xác định với mọi số thực.</p><p>Do đó ${M(`-${x.k}x-${x.m}x=-${sum}x`)}.</p>`); }
    ],
    tf:[
      ci => { const x=codes[ci], p=x.u, q=x.v, d=x.d, z=p-q; return {stem:`Cho ${M(`A=\\sqrt{${p*p*d}}-\\sqrt{${q*q*d}}`)}. Xét tính đúng sai của các khẳng định sau:`,items:[
        {text:M(`\\sqrt{${p*p*d}}=${p}\\sqrt{${d}}`),ok:true,sol:`<p>Ta có ${M(`${p*p*d}=${p}^2\\cdot${d}`)} và ${M(`${p}\\gt0`)} nên khẳng định đúng.</p>`},
        {text:M(`A=${p+q}\\sqrt{${d}}`),ok:false,sol:`<p>${M(`A=${p}\\sqrt{${d}}-${q}\\sqrt{${d}}=(${p}-${q})\\sqrt{${d}}=${z}\\sqrt{${d}}`)}. Khẳng định đã cộng hai hệ số nên sai.</p>`},
        {text:M(`A^2=${z*z*d}`),ok:true,sol:`<p>Từ ${M(`A=${z}\\sqrt{${d}}`)} suy ra ${M(`A^2=${z*z}\\cdot${d}=${z*z*d}`)}. Khẳng định đúng.</p>`},
        {text:M(`\\dfrac1A=\\dfrac{\\sqrt{${d}}}{${z}}`),ok:false,sol:`<p>${M(`\\dfrac1A=\\dfrac1{${z}\\sqrt{${d}}}=\\dfrac{\\sqrt{${d}}}{${z*d}}`)}. Mẫu đúng phải là ${M(z*d)}, vì vậy khẳng định sai.</p>`}
      ]}; },
      ci => { const a=ci+1; return {stem:`Cho ${M(`P=\\dfrac{\\sqrt{x}+${a}}{\\sqrt{x}-${a}}-\\dfrac{${4*a}\\sqrt{x}}{x-${a*a}}`)}. Xét tính đúng sai của các khẳng định sau:`,items:[
        {text:M(`x\\ge0,\\ x\\ne${a*a}`),ok:true,sol:`<p>Cần ${M('x\\ge0')} để ${M('\\sqrt{x}')} có nghĩa và ${M(`\\sqrt{x}-${a}\\ne0`)}. Điều kiện thứ hai tương đương ${M(`x\\ne${a*a}`)}. Khẳng định đúng.</p>`},
        {text:M(`P=\\dfrac{\\sqrt{x}-${a}}{\\sqrt{x}+${a}}`),ok:true,sol:`<p>Vì ${M(`x-${a*a}=(\\sqrt{x}-${a})(\\sqrt{x}+${a})`)} nên quy đồng được</p><p>${M(`P=\\dfrac{(\\sqrt{x}+${a})^2-${4*a}\\sqrt{x}}{x-${a*a}}=\\dfrac{(\\sqrt{x}-${a})^2}{(\\sqrt{x}-${a})(\\sqrt{x}+${a})}=\\dfrac{\\sqrt{x}-${a}}{\\sqrt{x}+${a}}`)}.</p>`},
        {text:M(`P=3`) + ` khi ${M(`x=${4*a*a}`)}`,ok:false,sol:`<p>Với ${M(`x=${4*a*a}`)} thì ${M(`\\sqrt{x}=${2*a}`)}. Do đó ${M(`P=\\dfrac{${2*a}-${a}}{${2*a}+${a}}=\\dfrac13`)}, không phải ${M('3')}.</p>`},
        {text:`Phương trình ${M(`P=\\dfrac12`)} có nghiệm ${M(`x=${9*a*a}`)}.`,ok:true,sol:`<p>Đặt ${M('t=\\sqrt{x}')} với ${M('t\\ge0')}. Ta có ${M(`\\dfrac{t-${a}}{t+${a}}=\\dfrac12\\Leftrightarrow2t-${2*a}=t+${a}\\Leftrightarrow t=${3*a}`)}.</p><p>Suy ra ${M(`x=t^2=${9*a*a}`)}; giá trị này thỏa điều kiện. Khẳng định đúng.</p>`}
      ]}; },
      ci => { const n=ci+2; return {stem:`Cho ${M(`B=\\sqrt[3]{-${n**3}}+\\sqrt[3]{${8*n**3}}`)}. Xét tính đúng sai của các khẳng định sau:`,items:[
        {text:M(`\\sqrt[3]{-${n**3}}=-${n}`),ok:true,sol:`<p>Vì ${M(`(-${n})^3=-${n**3}`)} nên ${M(`\\sqrt[3]{-${n**3}}=-${n}`)}. Khẳng định đúng.</p>`},
        {text:M(`\\sqrt[3]{${8*n**3}}=${8*n}`),ok:false,sol:`<p>${M(`${8*n**3}=(2${n})^3`)} nên ${M(`\\sqrt[3]{${8*n**3}}=${2*n}`)}, không phải ${M(8*n)}.</p>`},
        {text:M(`B=${n}`),ok:true,sol:`<p>${M(`B=-${n}+${2*n}=${n}`)}. Khẳng định đúng.</p>`},
        {text:`Phương trình ${M(`\\sqrt[3]{x}=-${n}`)} có nghiệm ${M(`x=-${n**3}`)}.`,ok:true,sol:`<p>Lập phương hai vế được ${M(`x=(-${n})^3=-${n**3}`)}. Phép lập phương là tương đương trên tập số thực nên khẳng định đúng.</p>`}
      ]}; }
    ],
    short:[
      ci => { const x=codes[ci], m=ci+3, ans=x.n-m; return {q:`Tính ${M(`\\sqrt{${x.n*x.n}}+\\sqrt[3]{-${m**3}}`)}.`,ans:String(ans),sol:`<p>${M(`\\sqrt{${x.n*x.n}}=${x.n}`)} vì ${M(`${x.n}\\gt0`)}; đồng thời ${M(`\\sqrt[3]{-${m**3}}=-${m}`)}.</p><p>Vậy giá trị cần tìm là ${M(`${x.n}-${m}=${ans}`)}.</p>`}; },
      ci => { const upper=[6,7,8,9][ci], lower=[1,3,2,5][ci], B=ci+3, A=upper*B, ans=upper-lower+1; return {q:`Có bao nhiêu giá trị nguyên của ${M('x')} để ${M(`\\sqrt{${A}-${B}x}+\\sqrt{x-${lower}}`)} xác định?`,ans:String(ans),sol:`<p>Hai căn thức đồng thời xác định khi</p><p>${M(`\\begin{cases}${A}-${B}x\\ge0\\\\x-${lower}\\ge0\\end{cases}\\Leftrightarrow ${lower}\\le x\\le${upper}`)}.</p><p>Các số nguyên trong đoạn này có số lượng ${M(`${upper}-${lower}+1=${ans}`)}.</p>`}; },
      ci => { const x=codes[ci], ans=x.u-x.v; return {q:`Tính giá trị ${M(`T=\\dfrac{\\sqrt{${x.u*x.u*x.d}}-\\sqrt{${x.v*x.v*x.d}}}{\\sqrt{${x.d}}}`)}.`,ans:String(ans),sol:`<p>Đưa thừa số ra ngoài dấu căn:</p><p>${M(`\\sqrt{${x.u*x.u*x.d}}=${x.u}\\sqrt{${x.d}},\\quad\\sqrt{${x.v*x.v*x.d}}=${x.v}\\sqrt{${x.d}}`)}.</p><p>Do đó ${M(`T=\\dfrac{(${x.u}-${x.v})\\sqrt{${x.d}}}{\\sqrt{${x.d}}}=${ans}`)}.</p>`}; },
      ci => { const x=codes[ci], ans=4*x.s; return {q:`Cho ${M(`Q=\\dfrac1{\\sqrt{${x.r}}-\\sqrt{${x.s}}}-\\dfrac1{\\sqrt{${x.r}}+\\sqrt{${x.s}}}`)}. Tính ${M('Q^2')}.`,ans:String(ans),sol:`<p>Quy đồng hai phân thức:</p><p>${M(`Q=\\dfrac{(\\sqrt{${x.r}}+\\sqrt{${x.s}})-(\\sqrt{${x.r}}-\\sqrt{${x.s}})}{${x.r}-${x.s}}`)}.</p><p>Vì ${M(`${x.r}-${x.s}=1`)} nên ${M(`Q=2\\sqrt{${x.s}}`)}. Suy ra ${M(`Q^2=4\\cdot${x.s}=${ans}`)}.</p>`}; },
      ci => { const sets=[[2,1,3,4],[3,1,4,5],[4,9,5,4],[5,11,6,5]], [a,b,n,ans]=sets[ci]; return {q:`Giải phương trình ${M(`\\sqrt{${a}x+${b}}=${n}`)}.`,ans:String(ans),sol:`<p>Điều kiện: ${M(`${a}x+${b}\\ge0`)}. Vì hai vế không âm, bình phương hai vế là phép biến đổi tương đương:</p><p>${M(`${a}x+${b}=${n*n}\\Leftrightarrow ${a}x=${n*n-b}\\Leftrightarrow x=${ans}`)}.</p><p>Thay lại: ${M(`\\sqrt{${a*ans+b}}=${n}`)}, nên ${M(`x=${ans}`)} là nghiệm.</p>`}; },
      ci => { const a=ci+1, ans=4*a*a; return {q:`Với ${M(`x\\ge0,\\ x\\ne${a*a}`)}, cho ${M(`P=\\dfrac{\\sqrt{x}+${a}}{\\sqrt{x}-${a}}-\\dfrac{${4*a}\\sqrt{x}}{x-${a*a}}`)}. Tìm ${M('x')} khi ${M(`P=\\dfrac13`)}.`,ans:String(ans),sol:`<p>Do ${M(`x-${a*a}=(\\sqrt{x}-${a})(\\sqrt{x}+${a})`)}, quy đồng và rút gọn được</p><p>${M(`P=\\dfrac{(\\sqrt{x}+${a})^2-${4*a}\\sqrt{x}}{x-${a*a}}=\\dfrac{\\sqrt{x}-${a}}{\\sqrt{x}+${a}}`)}.</p><p>Đặt ${M('t=\\sqrt{x}')} với ${M(`t\\ge0,\\ t\\ne${a}`)}. Khi đó</p><p>${M(`\\dfrac{t-${a}}{t+${a}}=\\dfrac13\\Leftrightarrow3t-${3*a}=t+${a}\\Leftrightarrow t=${2*a}`)}.</p><p>Suy ra ${M(`x=t^2=${ans}`)}; giá trị này thỏa điều kiện.</p>`}; }
    ]
  });
})();

/* Chương IV: Hệ thức lượng trong tam giác vuông. */
(() => {
  const M = x => `\\(${x}\\)`;
  const F = (a,b) => `\\dfrac{${a}}{${b}}`;
  const S = x => `\\sqrt{${x}}`;
  const D = x => `${x}^\\circ`;
  const mc = (level, q, correct, wrong, sol) => ({level, q, opts:[correct, ...wrong], sol});
  const C = [
    {p:3,q:4,h:5,f:'sin',a:32,sp:['sin',30,F(1,2)],side:['BC',12,30,'AC','6'],B:36,L:10,ang:35,tan:.70,dist:18,eye:1.5},
    {p:5,q:12,h:13,f:'cos',a:37,sp:['cos',60,F(1,2)],side:['BC',14,60,'AB','7'],B:41,L:12,ang:38,tan:.78,dist:20,eye:1.6},
    {p:8,q:15,h:17,f:'tan',a:41,sp:['tan',45,'1'],side:['AB',6,60,'AC',`6${S(3)}`],B:53,L:14,ang:42,tan:.90,dist:16,eye:1.5},
    {p:7,q:24,h:25,f:'cot',a:53,sp:['cot',30,S(3)],side:['AC',5,45,'BC',`5${S(2)}`],B:28,L:16,ang:40,tan:.84,dist:15,eye:1.7}
  ];
  const ratios = x => ({sin:F(x.q,x.h),cos:F(x.p,x.h),tan:F(x.q,x.p),cot:F(x.p,x.q)});
  const ratioName = {sin:'sin',cos:'cos',tan:'tan',cot:'cot'};
  const sideSolution = (x) => {
    const [known,n,b,target,ans]=x.side;
    if(known==='BC'&&target==='AC') return `<p>Trong tam giác vuông, cạnh ${M('AC')} đối diện góc ${M('B')}, do đó</p><p>${M(`AC=BC\\cdot\\sin B=${n}\\cdot\\sin ${D(b)}=${n}\\cdot${F(1,2)}=${ans}`)}.</p>`;
    if(known==='BC'&&target==='AB') return `<p>Cạnh ${M('AB')} kề góc ${M('B')}, do đó</p><p>${M(`AB=BC\\cdot\\cos B=${n}\\cdot\\cos ${D(b)}=${n}\\cdot${F(1,2)}=${ans}`)}.</p>`;
    if(known==='AB') return `<p>Cạnh ${M('AC')} đối diện và cạnh ${M('AB')} kề góc ${M('B')}, nên</p><p>${M(`AC=AB\\cdot\\tan B=${n}\\cdot\\tan ${D(b)}=${n}\\sqrt3=${ans}`)}.</p>`;
    return `<p>Ta có ${M(`\\sin B=${F('AC','BC')}`)}, suy ra</p><p>${M(`BC=${F('AC','\\sin B')}=${F(n,F(S(2),2))}=${ans}`)}.</p>`;
  };

  StudentTest.add({
    grade:'lop9', id:'c4', topic:4,
    title:'Kiểm tra Chủ đề 4 – Hệ thức lượng trong tam giác vuông',
    time:60, codes:['401','402','403','404'],
    mc:[
      ci => { const x=C[ci], defs={sin:F('AC','BC'),cos:F('AB','BC'),tan:F('AC','AB'),cot:F('AB','AC')}, good=defs[x.f]; return mc('Nhận biết', `Cho tam giác ${M('ABC')} vuông tại ${M('A')}. Tỉ số ${M(`\\${x.f}B`)} bằng`, M(good), Object.entries(defs).filter(([k])=>k!==x.f).map(([,v])=>M(v)), `<p>Đối với góc ${M('B')}: cạnh đối là ${M('AC')}, cạnh kề là ${M('AB')}, cạnh huyền là ${M('BC')}.</p><p>Theo định nghĩa, ${M(`\\${x.f}B=${good}`)}.</p>`); },
      ci => { const x=C[ci], R=ratios(x), good=R[x.f]; return mc('Nhận biết', `Tam giác ${M('ABC')} vuông tại ${M('A')} có ${M(`AB=${x.p},\\ AC=${x.q},\\ BC=${x.h}`)}. Tính ${M(`\\${x.f}B`)}.`, M(good), Object.entries(R).filter(([k])=>k!==x.f).map(([,v])=>M(v)), `<p>Với góc ${M('B')}, ta xác định cạnh đối ${M(`AC=${x.q}`)}, cạnh kề ${M(`AB=${x.p}`)} và cạnh huyền ${M(`BC=${x.h}`)}.</p><p>Vì vậy ${M(`\\${x.f}B=${good}`)}.</p>`); },
      ci => { const x=C[ci], b=90-x.a; return mc('Nhận biết', `Biết hai góc nhọn ${M('\\alpha')} và ${M('\\beta')} phụ nhau, ${M(`\\alpha=${D(x.a)}`)}. Khi đó ${M(`\\sin ${D(x.a)}`)} bằng`, M(`\\cos ${D(b)}`), [M(`\\cos ${D(x.a)}`),M(`\\sin ${D(b)}`),M(`\\tan ${D(b)}`)], `<p>Hai góc phụ nhau có tổng bằng ${M(D(90))}. Do đó ${M(`\\beta=${D(90)}-${D(x.a)}=${D(b)}`)}.</p><p>Dùng hệ thức ${M('\\sin\\alpha=\\cos\\beta')}, ta được ${M(`\\sin ${D(x.a)}=\\cos ${D(b)}`)}.</p>`); },
      ci => { const x=C[ci], [f,a,val]=x.sp, pool=[F(1,2),F(S(2),2),F(S(3),2),'1',S(3),F(S(3),3)].filter(v=>v!==val).slice(0,3); return mc('Nhận biết', `Giá trị của ${M(`\\${f}${D(a)}`)} là`, M(val), pool.map(M), `<p>Theo bảng giá trị lượng giác của các góc đặc biệt, ${M(`\\${f}${D(a)}=${val}`)}.</p>`); },
      ci => { const vals=[[`\\sin\\alpha=${F(S(2),2)}`,45],[`\\cos\\alpha=${F(1,2)}`,60],[`\\tan\\alpha=${F(S(3),3)}`,30],['\\cot\\alpha=1',45]], [eq,ans]=vals[ci]; return mc('Thông hiểu', `Cho ${M('\\alpha')} là góc nhọn và ${M(eq)}. Số đo ${M('\\alpha')} là`, M(D(ans)), [30,45,60,90].filter(v=>v!==ans).map(v=>M(D(v))), `<p>Đối chiếu bảng giá trị lượng giác của các góc ${M(`${D(30)},${D(45)},${D(60)}`)}.</p><p>Ta có ${M(eq.replace('\\alpha',D(ans)))}, vì vậy ${M(`\\alpha=${D(ans)}`)}.</p>`); },
      ci => { const x=C[ci]; return mc('Thông hiểu', `Cho tam giác ${M('ABC')} vuông tại ${M('A')}. Hệ thức nào sau đây đúng?`, M('AC=BC\\cdot\\sin B'), [M('AC=BC\\cdot\\cos B'),M('AC=AB\\cdot\\cos B'),M('AB=BC\\cdot\\sin B')], `<p>Đối với góc ${M('B')}, cạnh ${M('AC')} là cạnh đối và ${M('BC')} là cạnh huyền.</p><p>Từ ${M(`\\sin B=${F('AC','BC')}`)} suy ra ${M('AC=BC\\cdot\\sin B')}.</p>`); },
      ci => { const x=C[ci], [known,n,b,target,ans]=x.side, unit='cm'; return mc('Thông hiểu', `Tam giác ${M('ABC')} vuông tại ${M('A')}, có ${M(`${known}=${n}\\text{ ${unit}},\\ \\widehat B=${D(b)}`)}. Độ dài ${M(target)} bằng`, M(`${ans}\\text{ ${unit}}`), [M(`${n}\\text{ ${unit}}`),M(`${2*n}\\text{ ${unit}}`),M(`${n+1}\\text{ ${unit}}`)], sideSolution(x)); },
      ci => { const x=C[ci], ans=90-x.B; return mc('Thông hiểu', `Tam giác ${M('ABC')} vuông tại ${M('A')} có ${M(`\\widehat B=${D(x.B)}`)}. Số đo ${M('\\widehat C')} bằng`, M(D(ans)), [M(D(x.B)),M(D(180-x.B)),M(D(90+x.B))], `<p>Tổng hai góc nhọn trong tam giác vuông bằng ${M(D(90))}.</p><p>${M(`\\widehat C=${D(90)}-\\widehat B=${D(90)}-${D(x.B)}=${D(ans)}`)}.</p>`); },
      ci => { const x=C[ci], R=ratios(x), good=R.cos; return mc('Vận dụng', `Cho ${M('\\alpha')} là góc nhọn, ${M(`\\sin\\alpha=${R.sin}`)}. Tính ${M('\\cos\\alpha')}.`, M(good), [M(R.tan),M(R.cot),M(F(x.q,x.h))], `<p>Dựng tam giác vuông có cạnh đối, cạnh huyền đối với góc ${M('\\alpha')} lần lượt là ${M(`${x.q}k`)} và ${M(`${x.h}k`)}.</p><p>Theo định lí Pythagore, cạnh kề là ${M(`\\sqrt{${x.h}^2-${x.q}^2}k=${x.p}k`)}.</p><p>Vậy ${M(`\\cos\\alpha=${F(`${x.p}k`,`${x.h}k`)}=${good}`)}.</p>`); },
      ci => { const s=[8,9,6,7][ci], a=[45,30,60,45][ci], ans=[String(s),`3${S(3)}`,`${s}${S(3)}`,String(s)][ci]; return mc('Vận dụng', `Bóng của một cột cờ dài ${M(`${s}\\text{ m}`)}. Tia nắng tạo với mặt đất góc ${M(D(a))}. Bỏ qua chiều cao điểm quan sát, chiều cao cột cờ là`, M(`${ans}\\text{ m}`), [M(`${2*s}\\text{ m}`),M(`${s}${S(2)}\\text{ m}`),M(`${s}/2\\text{ m}`)], `<p>Chiều cao ${M('h')}, bóng và tia nắng tạo thành tam giác vuông. Ta có</p><p>${M(`h=${s}\\tan${D(a)}`)}.</p><p>Thay ${M(`\\tan${D(a)}=${a===45?'1':a===30?F(S(3),3):S(3)}`)} được ${M(`h=${ans}\\text{ m}`)}.</p>`); },
      ci => { const x=C[ci], ans=x.L/2; return mc('Vận dụng', `Một chiếc thang dài ${M(`${x.L}\\text{ m}`)} tạo với mặt đất góc ${M(D(60))}. Khoảng cách từ chân thang đến chân tường bằng`, M(`${ans}\\text{ m}`), [M(`${x.L}${S(3)}/2\\text{ m}`),M(`${x.L}\\text{ m}`),M(`${2*x.L}\\text{ m}`)], `<p>Thang là cạnh huyền; khoảng cách cần tìm là cạnh kề góc ${M(D(60))}.</p><p>${M(`d=${x.L}\\cos${D(60)}=${x.L}\\cdot${F(1,2)}=${ans}\\text{ m}`)}.</p>`); },
      ci => { const x=C[ci], d=[12,15,9,14][ci], eye=[1,1.5,1.2,1.6][ci], ans=d+eye; return mc('Vận dụng cao', `Từ điểm quan sát cao ${M(`${String(eye).replace('.',',')}\\text{ m}`)} so với mặt đất, nhìn đỉnh một tòa nhà dưới góc nâng ${M(D(45))}. Khoảng cách ngang đến tòa nhà là ${M(`${d}\\text{ m}`)}. Chiều cao tòa nhà bằng`, M(`${String(ans).replace('.',',')}\\text{ m}`), [M(`${d}\\text{ m}`),M(`${d-eye}\\text{ m}`),M(`${2*d}\\text{ m}`)], `<p>Gọi ${M('h')} là phần chiều cao từ đường ngang qua mắt đến đỉnh tòa nhà.</p><p>${M(`h=${d}\\tan${D(45)}=${d}\\text{ m}`)}.</p><p>Chiều cao tòa nhà phải cộng thêm độ cao điểm quan sát: ${M(`H=${d}+${eye}=${ans}\\text{ m}`)}.</p>`); }
    ],
    tf:[
      ci => { const x=C[ci], R=ratios(x); return {stem:`Cho tam giác ${M('ABC')} vuông tại ${M('A')}, có ${M(`AB=${x.p},\\ AC=${x.q},\\ BC=${x.h}`)}. Xét tính đúng sai của các khẳng định sau:`,items:[
        {text:M(`\\sin B=${R.sin}`),ok:true,sol:`<p>Với góc ${M('B')}, cạnh đối là ${M('AC')} và cạnh huyền là ${M('BC')}; vì vậy ${M(`\\sin B=${F('AC','BC')}=${R.sin}`)}.</p>`},
        {text:M(`\\cos C=${R.sin}`),ok:true,sol:`<p>Với góc ${M('C')}, cạnh kề là ${M('AC')} và cạnh huyền là ${M('BC')}; do đó ${M(`\\cos C=${F('AC','BC')}=${R.sin}`)}.</p>`},
        {text:M(`\\tan B=${F(x.p,x.q)}`),ok:false,sol:`<p>${M(`\\tan B=${F('AC','AB')}=${R.tan}`)}. Khẳng định đã đảo tử và mẫu nên sai.</p>`},
        {text:M('\\tan B\\cdot\\cot B=1'),ok:true,sol:`<p>${M(`\\tan B\\cdot\\cot B=${F(x.q,x.p)}\\cdot${F(x.p,x.q)}=1`)}. Khẳng định đúng.</p>`}
      ]}; },
      ci => { const x=C[ci], b=90-x.a; return {stem:`Cho hai góc nhọn ${M('\\alpha')} và ${M('\\beta')} có ${M(`\\alpha=${D(x.a)},\\ \\beta=${D(b)}`)}. Xét tính đúng sai của các khẳng định sau:`,items:[
        {text:M('\\alpha+\\beta=90^\\circ'),ok:true,sol:`<p>${M(`${D(x.a)}+${D(b)}=${D(90)}`)}, nên hai góc phụ nhau.</p>`},
        {text:M('\\sin\\alpha=\\cos\\beta'),ok:true,sol:`<p>Sin của một góc bằng cosin của góc phụ với nó. Vì ${M('\\alpha,\\beta')} phụ nhau nên khẳng định đúng.</p>`},
        {text:M('\\tan\\alpha=\\cot\\beta'),ok:true,sol:`<p>Tang của một góc bằng cotang của góc phụ với nó, nên khẳng định đúng.</p>`},
        {text:M('\\tan\\alpha=\\tan\\beta'),ok:false,sol:`<p>Hai góc đều nhọn và khác nhau vì ${M(`${x.a}\\ne${b}`)}. Hàm tang tăng trên khoảng góc nhọn, do đó hai giá trị tang không bằng nhau.</p>`}
      ]}; },
      ci => { const x=C[ci], rise=`${x.L}${S(3)}/2`, run=x.L/2; return {stem:`Một chiếc thang dài ${M(`${x.L}\\text{ m}`)} tựa vào tường thẳng đứng và tạo với mặt đất góc ${M(D(60))}. Xét tính đúng sai của các khẳng định sau:`,items:[
        {text:'Thang, tường và mặt đất tạo thành một tam giác vuông.',ok:true,sol:'<p>Tường vuông góc với mặt đất nên ba đoạn thẳng tạo thành tam giác vuông tại chân tường.</p>'},
        {text:`Khoảng cách từ chân thang đến tường là ${M(`${run}\\text{ m}`)}.`,ok:true,sol:`<p>Khoảng cách là cạnh kề góc ${M(D(60))}: ${M(`${x.L}\\cos${D(60)}=${x.L}\\cdot${F(1,2)}=${run}\\text{ m}`)}.</p>`},
        {text:`Độ cao đầu thang chạm tường là ${M(`${rise}\\text{ m}`)}.`,ok:true,sol:`<p>Độ cao là cạnh đối góc ${M(D(60))}: ${M(`${x.L}\\sin${D(60)}=${x.L}\\cdot${F(S(3),2)}=${rise}\\text{ m}`)}.</p>`},
        {text:`Khoảng cách từ chân thang đến tường bằng ${M(`${rise}\\text{ m}`)}.`,ok:false,sol:`<p>${M(rise)} là độ cao đầu thang, còn khoảng cách theo mặt đất là ${M(`${run}\\text{ m}`)}. Khẳng định sai.</p>`}
      ]}; }
    ],
    short:[
      ci => { const x=C[ci], ans=90-x.B; return {q:`Tam giác ${M('ABC')} vuông tại ${M('A')} có ${M(`\\widehat B=${D(x.B)}`)}. Tính số đo góc ${M('C')} (đơn vị độ).`,ans:String(ans),sol:`<p>Hai góc nhọn của tam giác vuông phụ nhau:</p><p>${M(`\\widehat C=${D(90)}-\\widehat B=${D(90)}-${D(x.B)}=${D(ans)}`)}.</p>`}; },
      ci => { const x=C[ci], R=ratios(x); return {q:`Tam giác ${M('ABC')} vuông tại ${M('A')} có ${M(`AB=${x.p},\\ AC=${x.q},\\ BC=${x.h}`)}. Tính ${M(`\\${x.f}B`)}; nhập kết quả dưới dạng phân số tối giản.`,ans:R[x.f].replace('\\dfrac{','').replace('}{','/').replace('}',''),sol:`<p>Đối với góc ${M('B')}: cạnh đối là ${M(`AC=${x.q}`)}, cạnh kề là ${M(`AB=${x.p}`)}, cạnh huyền là ${M(`BC=${x.h}`)}.</p><p>Do đó ${M(`\\${x.f}B=${R[x.f]}`)}; phân số đã tối giản.</p>`}; },
      ci => { const expr=[['2\\sin30^\\circ+\\tan45^\\circ',2],['2\\cos60^\\circ+\\cot45^\\circ',2],['4\\sin^2 45^\\circ+\\tan45^\\circ',3],['4\\cos^2 60^\\circ+\\cot45^\\circ',2]], [e,ans]=expr[ci]; return {q:`Không dùng máy tính, tính ${M(`E=${e}`)}.`,ans:String(ans),sol:`<p>Dùng ${M(`\\sin30^\\circ=\\cos60^\\circ=${F(1,2)}`)}, ${M(`\\sin45^\\circ=${F(S(2),2)}`)} và ${M('\\tan45^\\circ=\\cot45^\\circ=1')}.</p><p>${M(`E=${e}=${ans}`)}.</p>`}; },
      ci => { const x=C[ci], [known,n,b,target,ans]=x.side, numeric=String(ans).match(/^\d+$/)?ans:[6,7,10,10][ci]; if(String(ans).match(/^\d+$/)) return {q:`Tam giác ${M('ABC')} vuông tại ${M('A')} có ${M(`${known}=${n}\\text{ cm},\\ \\widehat B=${D(b)}`)}. Tính ${M(target)} (đơn vị cm).`,ans:String(ans),sol:sideSolution(x)};
        const q=ci===2?`Tam giác ${M('ABC')} vuông tại ${M('A')} có ${M(`AB=10\\text{ cm},\\ \\widehat B=${D(45)}`)}. Tính ${M('AC')} (đơn vị cm).`:`Tam giác ${M('ABC')} vuông tại ${M('A')} có ${M(`AC=10\\text{ cm},\\ \\widehat B=${D(45)}`)}. Tính ${M('AB')} (đơn vị cm).`;
        return {q,ans:String(numeric),sol:`<p>Vì ${M('\\tan45^\\circ=1')} nên hai cạnh góc vuông đối và kề góc ${M(D(45))} bằng nhau.</p><p>Do đó độ dài cạnh cần tìm bằng ${M(`${numeric}\\text{ cm}`)}.</p>`}; },
      ci => { const x=C[ci], raw=x.dist*x.tan, ans=Math.round(raw*10)/10; return {q:`Một cột cờ có bóng dài ${M(`${x.dist}\\text{ m}`)}. Tia nắng tạo với mặt đất góc ${M(D(x.ang))}; biết ${M(`\\tan${D(x.ang)}\\approx${String(x.tan).replace('.',',')}`)}. Tính chiều cao cột cờ, làm tròn đến hàng phần mười (đơn vị m).`,ans,sol:`<p>Gọi ${M('h')} là chiều cao cột cờ. Trong tam giác vuông,</p><p>${M(`\\tan${D(x.ang)}=${F('h',x.dist)}\\Rightarrow h=${x.dist}\\tan${D(x.ang)}\\approx${x.dist}\\cdot${x.tan}=${raw}`)}.</p><p>Làm tròn đến hàng phần mười được ${M(`h\\approx${ans}\\text{ m}`)}.</p>`}; },
      ci => { const x=C[ci], raw=x.dist*x.tan+x.eye, ans=Math.round(raw*10)/10; return {q:`Mắt người quan sát cao ${M(`${String(x.eye).replace('.',',')}\\text{ m}`)} so với mặt đất. Người đó đứng cách một tòa nhà ${M(`${x.dist}\\text{ m}`)} và nhìn đỉnh nhà dưới góc nâng ${M(D(x.ang))}. Biết ${M(`\\tan${D(x.ang)}\\approx${String(x.tan).replace('.',',')}`)}. Tính chiều cao tòa nhà, làm tròn đến hàng phần mười (đơn vị m).`,ans,sol:`<p>Phần chiều cao từ đường ngang qua mắt đến đỉnh nhà là</p><p>${M(`h_1=${x.dist}\\tan${D(x.ang)}\\approx${x.dist}\\cdot${x.tan}=${x.dist*x.tan}\\text{ m}`)}.</p><p>Cộng độ cao của mắt: ${M(`H=h_1+${x.eye}=${raw}\\text{ m}`)}. Làm tròn đến hàng phần mười: ${M(`H\\approx${ans}\\text{ m}`)}.</p>`}; }
    ]
  });
})();
