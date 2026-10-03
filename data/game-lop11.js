/* Kho câu hỏi Học mà chơi – Lớp 11 Kết nối tri thức. Mỗi trận sinh 20 câu thông hiểu, 4 phương án. */
(() => {
const m=tm, ri=(r,a,b)=>a+Math.floor(r()*(b-a+1)), pick=(r,a)=>a[Math.floor(r()*a.length)];
const q=(text,answer,wrong,explain)=>({text,answer,wrong,explain});
const f=(a,b)=>`\\dfrac{${a}}{${b}}`;
const unique3=(good,items)=>[...new Set(items.filter(x=>x!==good))].slice(0,3);
const rad=[
  [30,f('\\pi',6)],[45,f('\\pi',4)],[60,f('\\pi',3)],[90,f('\\pi',2)],
  [120,f('2\\pi',3)],[135,f('3\\pi',4)],[150,f('5\\pi',6)],[180,'\\pi'],
  [270,f('3\\pi',2)],[360,'2\\pi']
];
const special=[
  ['\\sin 30^\\circ',f(1,2)],['\\cos 60^\\circ',f(1,2)],
  ['\\sin 45^\\circ',f('\\sqrt2',2)],['\\cos 45^\\circ',f('\\sqrt2',2)],
  ['\\sin 60^\\circ',f('\\sqrt3',2)],['\\cos 30^\\circ',f('\\sqrt3',2)],
  ['\\tan 30^\\circ',f('\\sqrt3',3)],['\\tan 45^\\circ','1'],['\\tan 60^\\circ','\\sqrt3']
];
const piPeriod=a=>a===1?'2\\pi':a===2?'\\pi':a%2===0?f('\\pi',a/2):f('2\\pi',a);

Game.addTopic({
  id:'game-lop11-on-tap-c1', grade:'lop11', icon:'🌊', group:'Toán 11 · Kết nối tri thức',
  name:'Ôn tập Chương I. Hàm số lượng giác và phương trình lượng giác',
  desc:'Góc lượng giác, công thức, hàm số và phương trình lượng giác.',
  generate(r,i){const k=i%12;
    if(k===0){const item=pick(r,rad),good=m(item[1]),others=rad.filter(x=>x!==item).map(x=>m(x[1]));return q(`Đổi ${m(`${item[0]}^\\circ`)} sang radian.`,good,unique3(good,others),`Dùng ${m(`\\alpha_{rad}=\\alpha_{deg}\\cdot${f('\\pi',180)}`)}. Suy ra ${m(`${item[0]}^\\circ=${item[1]}`)}.`)}
    if(k===1){const n=pick(r,[2,3,4,6]),coef=ri(r,2,7),R=n*coef,good=m(`${coef}\\pi\\text{ cm}`);return q(`Một cung tròn bán kính ${m(`${R}\\text{ cm}`)} có số đo ${m(f('\\pi',n))} rad. Độ dài cung là`,good,[m(`${2*coef}\\pi\\text{ cm}`),m(`${R}\\pi\\text{ cm}`),m(`${coef}\\pi\\text{ cm}^2`)],`Độ dài cung ${m(`l=R\\alpha=${R}\\cdot${f('\\pi',n)}=${coef}\\pi`)} cm.`)}
    if(k===2){const quad=ri(r,1,4),fn=pick(r,['\\sin','\\cos','\\tan']),sign=(fn==='\\sin'?(quad<=2):(fn==='\\cos'?(quad===1||quad===4):(quad===1||quad===3)))?'Dương':'Âm';return q(`Góc ${m('\\alpha')} có điểm biểu diễn nằm trong góc phần tư ${['','I','II','III','IV'][quad]}. Khi đó ${m(`${fn}\\alpha`)} mang dấu gì?`,sign,[sign==='Dương'?'Âm':'Dương','Bằng 0','Không xác định'],`Dựa vào bảng dấu giá trị lượng giác ở góc phần tư ${['','I','II','III','IV'][quad]}, ${m(`${fn}\\alpha`)} mang dấu ${sign.toLowerCase()}.`)}
    if(k===3){const item=pick(r,special),good=m(item[1]),pool=['0','1','-1',f(1,2),'-'+f(1,2),f('\\sqrt2',2),f('\\sqrt3',2),f('\\sqrt3',3),'\\sqrt3'].map(m);return q(`Giá trị của ${m(item[0])} bằng`,good,unique3(good,pool),`Theo bảng giá trị lượng giác của các góc đặc biệt, ${m(`${item[0]}=${item[1]}`)}.`)}
    if(k===4){const [a,b,c]=pick(r,[[3,4,5],[5,12,13],[8,15,17],[7,24,25]]),good=m(`-${f(b,c)}`);return q(`Cho ${m(`${f('\\pi',2)}\\lt\\alpha\\lt\\pi`)} và ${m(`\\sin\\alpha=${f(a,c)}`)}. Giá trị ${m('\\cos\\alpha')} bằng`,good,[m(f(b,c)),m(f(a,c)),m(`-${f(a,c)}`)],`Từ ${m('\\sin^2\\alpha+\\cos^2\\alpha=1')} suy ra ${m(`|\\cos\\alpha|=${f(b,c)}`)}. Góc ${m('\\alpha')} thuộc góc phần tư II nên ${m('\\cos\\alpha\\lt0')}; do đó ${m(`\\cos\\alpha=-${f(b,c)}`)}.`)}
    if(k===5){const item=pick(r,[['\\cos75^\\circ',f('\\sqrt6-\\sqrt2',4)],['\\sin75^\\circ',f('\\sqrt6+\\sqrt2',4)],['\\sin15^\\circ',f('\\sqrt6-\\sqrt2',4)],['\\cos15^\\circ',f('\\sqrt6+\\sqrt2',4)]]),good=m(item[1]);return q(`Dùng công thức cộng, giá trị ${m(item[0])} bằng`,good,unique3(good,[m(f('\\sqrt6+\\sqrt2',4)),m(f('\\sqrt6-\\sqrt2',4)),m(f('\\sqrt6-\\sqrt2',2)),m(f('\\sqrt6+\\sqrt2',2)),m(f('\\sqrt3+1',2))]),`Tách góc thành ${m('45^\\circ\\pm30^\\circ')} rồi áp dụng công thức cộng. Kết quả là ${m(`${item[0]}=${item[1]}`)}.`)}
    if(k===6){const [a,b,c]=pick(r,[[3,4,5],[5,12,13],[8,15,17]]),num=2*a*b,den=c*c,good=m(f(num,den));return q(`Biết ${m(`\\sin\\alpha=${f(a,c)}`)}, ${m(`\\cos\\alpha=${f(b,c)}`)}. Giá trị ${m('\\sin2\\alpha')} bằng`,good,[m(`-${f(num,den)}`),m(f(a*b,den)),m(f(Math.abs(b*b-a*a),den))],`Công thức nhân đôi: ${m(`\\sin2\\alpha=2\\sin\\alpha\\cos\\alpha=2\\cdot${f(a,c)}\\cdot${f(b,c)}=${f(num,den)}`)}.`)}
    if(k===7){const a=ri(r,2,7),good=m(piPeriod(a));return q(`Chu kì nhỏ nhất của hàm số ${m(`y=\\sin(${a}x)`)} là`,good,unique3(good,[m(f('\\pi',a)),m('2\\pi'),m(`${a}\\pi`),m('\\pi')]),`Với ${m(`y=\\sin(ax)`)}, chu kì là ${m(`T=${f('2\\pi','|a|')}=${piPeriod(a)}`)}.`)}
    if(k===8){const a=ri(r,2,6),good=m(`x\\ne${f('\\pi',2*a)}+k${f('\\pi',a)},\\ k\\in\\mathbb Z`);return q(`Tập xác định của ${m(`y=\\tan(${a}x)`)} loại các giá trị`,good,unique3(good,[m(`x\\ne k${f('\\pi',a)},\\ k\\in\\mathbb Z`),m(`x\\ne${f('\\pi',a)}+k2\\pi,\\ k\\in\\mathbb Z`),m(`x\\ne${f('\\pi',2)}+k2\\pi,\\ k\\in\\mathbb Z`),m(`x\\ne${f('\\pi',2*a)}+k2\\pi,\\ k\\in\\mathbb Z`)]),`${m('\\tan u')} không xác định khi ${m(`u=${f('\\pi',2)}+k\\pi`)}. Đặt ${m(`u=${a}x`)} rồi chia hai vế cho ${a}.`)}
    if(k===9){const A=ri(r,2,7),c=ri(r,1,5),good=String(A+c),min=c-A;return q(`Giá trị lớn nhất của hàm số ${m(`y=${A}\\sin x+${c}`)} là`,good,unique3(good,[String(min),String(A),String(c),String(A+c+1),String(A+c-1)]),`Vì ${m('-1\\le\\sin x\\le1')}, nên ${m(`${c-A}\\le y\\le${c+A}`)}. Giá trị lớn nhất là ${A+c}.`)}
    if(k===10){const alpha=pick(r,[f('\\pi',6),f('\\pi',4),f('\\pi',3)]),good=m(`x=\\pm${alpha}+k2\\pi,\\ k\\in\\mathbb Z`);return q(`Nghiệm của phương trình ${m(`\\cos x=\\cos${alpha}`)} là`,good,[m(`x=${alpha}+k\\pi,\\ k\\in\\mathbb Z`),m(`x=${alpha}+k2\\pi,\\ k\\in\\mathbb Z`),m(`x=\\pi-${alpha}+k2\\pi,\\ k\\in\\mathbb Z`)],`Công thức nghiệm cơ bản: ${m('\\cos x=\\cos\\alpha\\Leftrightarrow x=\\pm\\alpha+k2\\pi')}, ${m('k\\in\\mathbb Z')}.`)}
    const alpha=pick(r,[30,45,60,120,135,150]);return q(`Phương trình ${m(`\\sin x=\\sin${alpha}^\\circ`)} có bao nhiêu nghiệm thuộc đoạn ${m('[0;\\ 2\\pi]')}?`,'2 nghiệm',['1 nghiệm','3 nghiệm','4 nghiệm'],`Với ${m(`0^\\circ\\lt${alpha}^\\circ\\lt180^\\circ`)}, đường thẳng ngang tương ứng cắt đường tròn lượng giác tại hai điểm. Hai nghiệm là ${m(`x=${alpha}^\\circ`)} và ${m(`x=${180-alpha}^\\circ`)}.`)
  }
});

Game.addTopic({
  id:'game-lop11-on-tap-c2', grade:'lop11', icon:'🔢', group:'Toán 11 · Kết nối tri thức',
  name:'Ôn tập Chương II. Dãy số, cấp số cộng và cấp số nhân',
  desc:'Dãy số, tính đơn điệu, cấp số cộng, cấp số nhân và bài toán thực tế.',
  generate(r,i){const k=i%12;
    if(k===0){const a=ri(r,2,8),b=ri(r,-5,8),n=ri(r,4,12),ans=a*n+b;return q(`Cho dãy số ${m(`u_n=${a}n${b<0?b:'+'+b}`)}. Số hạng ${m(`u_{${n}}`)} bằng`,String(ans),unique3(String(ans),[String(ans-a),String(ans+a),String(ans-1),String(ans+1)]),`Thay ${m(`n=${n}`)} vào công thức: ${m(`u_{${n}}=${a}\\cdot${n}${b<0?b:'+'+b}=${ans}`)}.`)}
    if(k===1){const u1=ri(r,-5,10),d=pick(r,[-4,-3,-2,2,3,4,5]),n=ri(r,4,9),ans=u1+(n-1)*d;return q(`Dãy số cho bởi ${m(`u_1=${u1},\\ u_{n+1}=u_n${d<0?d:'+'+d}`)}. Giá trị ${m(`u_{${n}}`)} là`,String(ans),unique3(String(ans),[String(ans-d),String(ans+d),String(ans-1),String(ans+1)]),`Mỗi bước tăng thêm ${d}. Vì vậy ${m(`u_{${n}}=u_1+${n-1}\\cdot${d}=${ans}`)}.`)}
    if(k===2){const a=pick(r,[-6,-5,-4,-3,2,3,4,5]),b=ri(r,-7,7),kind=a>0?'tăng':'giảm';return q(`Dãy ${m(`u_n=${a}n${b<0?b:'+'+b}`)} là dãy`,'Dãy '+kind,['Dãy '+(kind==='tăng'?'giảm':'tăng'),'Dãy không đổi','Dãy không đơn điệu'],`${m(`u_{n+1}-u_n=${a}`)} ${a>0?'dương':'âm'} với mọi ${m('n')}, nên dãy ${kind}.`)}
    if(k===3){const a=ri(r,1,6),top=m(f(1,a+1));return q(`Với ${m(`u_n=${f(1,`n+${a}`)}`)}, ${m('n\\ge1')}, khẳng định đúng là`,`${m('0\\lt u_n\\le')}${top}`,[`${top}${m('\\le u_n\\lt1')}`,m('u_n\\ge1'),m('u_n\\lt0')],`Vì ${m(`n+${a}\\ge${a+1}`)}, nên ${m(`0\\lt${f(1,`n+${a}`)}\\le${f(1,a+1)}`)}. Dãy bị chặn dưới bởi 0 và chặn trên bởi ${top}.`)}
    if(k===4){const u=ri(r,-8,8),d=pick(r,[-5,-4,-3,2,3,4,5]),terms=[u,u+d,u+2*d,u+3*d],good=`Cấp số cộng, công sai ${d}`;return q(`Dãy ${m(`${terms.join(';\\ ')}`)} là`,good,[`Cấp số cộng, công sai ${-d}`,`Cấp số nhân, công bội ${d}`,'Không phải cấp số cộng'],`Hiệu hai số hạng liên tiếp luôn bằng ${m(String(d))}, nên đây là cấp số cộng có công sai ${m(`d=${d}`)}.`)}
    if(k===5){const u1=ri(r,-6,12),d=pick(r,[-4,-3,-2,2,3,4,5]),n=ri(r,5,12),ans=u1+(n-1)*d;return q(`Cấp số cộng có ${m(`u_1=${u1}`)}, ${m(`d=${d}`)}. Số hạng ${m(`u_{${n}}`)} bằng`,String(ans),unique3(String(ans),[String(ans-d),String(ans+d),String(ans-1),String(ans+1)]),`Dùng ${m('u_n=u_1+(n-1)d')}: ${m(`u_{${n}}=${u1}+${n-1}\\cdot${d}=${ans}`)}.`)}
    if(k===6){const u1=ri(r,-5,10),d=pick(r,[-4,-3,-2,2,3,4]),n=ri(r,4,9),un=u1+(n-1)*d;return q(`Cấp số cộng có ${m(`u_1=${u1}`)}, ${m(`u_{${n}}=${un}`)}. Công sai bằng`,String(d),[String(-d),String(d+1),String(un-u1)],`Từ ${m(`u_{${n}}=u_1+${n-1}d`)}, suy ra ${m(`d=${f(`${un}-${u1}`,n-1)}=${d}`)}.`)}
    if(k===7){const u1=ri(r,1,10),d=ri(r,1,6),n=ri(r,5,12),un=u1+(n-1)*d,S=n*(u1+un)/2;return q(`Cấp số cộng có ${m(`u_1=${u1}`)}, ${m(`d=${d}`)}. Tổng ${n} số hạng đầu bằng`,String(S),[String(n*(u1+un)),String(S-d),String(S+d)],`Có ${m(`u_{${n}}=${u1}+${n-1}\\cdot${d}=${un}`)}. Do đó ${m(`S_{${n}}=${f(`${n}(${u1}+${un})`,2)}=${S}`)}.`)}
    if(k===8){const a=ri(r,-8,5),d=pick(r,[2,3,4,5,6]),mid=a+d,last=a+2*d;return q(`Ba số ${m(`${a};\\ x;\\ ${last}`)} theo thứ tự lập thành một cấp số cộng. Giá trị ${m('x')} là`,String(mid),unique3(String(mid),[String(a),String(last),String(last-a),String(mid-1),String(mid+1)]),`Số giữa bằng trung bình cộng của hai số ngoài: ${m(`x=${f(`${a}+${last}`,2)}=${mid}`)}.`)}
    if(k===9){const u1=pick(r,[1,2,3,4]),ratio=pick(r,[2,3,-2]),n=ri(r,4,7),ans=u1*ratio**(n-1),good=String(ans);return q(`Cấp số nhân có ${m(`u_1=${u1}`)}, ${m(`q=${ratio}`)}. Số hạng ${m(`u_{${n}}`)} bằng`,good,unique3(good,[String(u1*ratio**(n-2)),String(u1*ratio**n),String(-ans),String(ans+ratio)]),`Dùng ${m('u_n=u_1q^{n-1}')}: ${m(`u_{${n}}=${u1}\\cdot(${ratio})^{${n-1}}=${ans}`)}.`)}
    if(k===10){const u1=ri(r,1,5),ratio=pick(r,[2,3]),n=ri(r,4,7),S=u1*(ratio**n-1)/(ratio-1);return q(`Cấp số nhân có ${m(`u_1=${u1}`)}, ${m(`q=${ratio}`)}. Tổng ${n} số hạng đầu bằng`,String(S),unique3(String(S),[String(S-u1),String(S+u1),String(u1*ratio**n),String(S-ratio),String(S+ratio)]),`Vì ${m('q\\ne1')}, ${m(`S_n=u_1${f('q^n-1','q-1')}`)}. Thay số: ${m(`S_{${n}}=${u1}${f(`${ratio}^{${n}}-1`,`${ratio}-1`)}=${S}`)}.`)}
    const start=ri(r,2,8)*100,ratio=2,n=ri(r,4,8),ans=start*ratio**(n-1);return q(`Một quần thể ban đầu có ${start} cá thể và sau mỗi giờ tăng gấp đôi. Sau ${n-1} giờ, số cá thể là`,String(ans),unique3(String(ans),[String(start*ratio**(n-2)),String(start*n),String(start*ratio**n),String(ans-start),String(ans+start)]),`Số cá thể tạo thành cấp số nhân với ${m(`u_1=${start}, q=2`)}. Sau ${n-1} giờ ứng với ${m(`u_{${n}}=${start}\\cdot2^{${n-1}}=${ans}`)}.`)
  }
});
})();
