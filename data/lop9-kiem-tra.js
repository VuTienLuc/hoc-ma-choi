/* Bài kiểm tra học sinh – Chương III: Căn bậc hai và căn bậc ba, Toán 9 KNTT. */
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
