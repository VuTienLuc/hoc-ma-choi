/* ---------- Bộ sinh câu hỏi dùng chung ---------- */
function gPlace(len,withLop){return()=>{let n,pos;do{n=randDigits(len);pos=uniqPos(n)}while(!pos.length);const p=pick(pos),d=digitsOf(n)[p];
  const lab=i=>'Hàng '+HANG[i]+(withLop?', lớp '+LOP(i):'');const others=shuffle([...Array(len).keys()].filter(i=>i!==p)).slice(0,3);
  return QC({text:`Trong số <b>${fmt(n)}</b>, chữ số <b>${d}</b> thuộc hàng nào${withLop?', lớp nào':''}?`,opts:[lab(p),...others.map(lab)],ans:lab(p),
   hint:`Đếm từ phải sang trái: đơn vị, chục, trăm, nghìn, chục nghìn, trăm nghìn, triệu…${withLop?' Cứ 3 hàng tạo thành một lớp.':''}`,
   sol:`Chữ số ${d} đứng ở vị trí thứ ${p+1} tính từ phải sang, nên thuộc <b>${lab(p).toLowerCase()}</b>.`})}}
function gValue(len){return()=>{let n,pos;do{n=randDigits(len);pos=uniqPos(n).filter(i=>i>0)}while(!pos.length);const p=pick(pos),d=digitsOf(n)[p],v=d*10**p;
  return QB({text:`Giá trị của chữ số <b>${d}</b> trong số <b>${fmt(n)}</b> là:`,tpl:'[_]',ans:[v],wide:true,hint:`Chữ số ${d} ở hàng ${HANG[p]}, nên giá trị là ${d} × ${fmt(10**p)}.`,sol:`Chữ số ${d} ở hàng ${HANG[p]} → giá trị là <b>${fmt(v)}</b>.`})}}
function gCompose(len){return lv=>{const d=[];for(let i=0;i<len;i++)d.push(i===len-1?R(1,9):(lv>=2&&Math.random()<.35?0:R(1,9)));const n=d.reduce((s,x,i)=>s+x*10**i,0);
  const parts=[];for(let i=len-1;i>=0;i--)if(d[i])parts.push(`${d[i]} ${HANG[i]}`);
  return QB({text:`Số gồm ${joinVa(parts)} viết là:`,tpl:'[_]',ans:[n],wide:true,hint:`Viết lần lượt từng chữ số từ hàng cao nhất (${HANG[len-1]}) xuống hàng đơn vị. Hàng nào không có thì viết chữ số 0.`,sol:`Số cần viết là <b>${fmt(n)}</b>.`})}}
function gCmp(len){return lv=>{const a=randDigits(len);let b;
  if(Math.random()<.12)b=a;else{do{const p=lv===1?len-1-R(0,1):R(0,Math.max(1,len-3));b=a+(Math.random()<.5?1:-1)*R(1,9)*10**p}while(String(b).length!==len||b===a)}
  return QCmp('Chọn dấu thích hợp:',fmt(a),fmt(b),a,b,{hint:len===String(b).length?'Hai số có cùng số chữ số: so sánh từng cặp chữ số từ trái sang phải.':'Số nào có nhiều chữ số hơn thì lớn hơn.',sol:`${fmt(a)} <b>${cmp(a,b)}</b> ${fmt(b)}.`})}}
function gRound(len,pChoices){return()=>{const p=pick(pChoices),n=randDigits(len),r=Math.round(n/10**p)*10**p,dd=digitsOf(n)[p-1];
  return QB({text:`Làm tròn số <b>${fmt(n)}</b> đến hàng <b>${HANG[p]}</b> ta được:`,tpl:'[_]',ans:[r],wide:true,hint:`Nhìn chữ số hàng ${HANG[p-1]} (là ${dd}): bé hơn 5 thì làm tròn xuống, từ 5 trở lên thì làm tròn lên.`,sol:`Chữ số hàng ${HANG[p-1]} là ${dd} ${dd<5?'< 5 → làm tròn xuống':'≥ 5 → làm tròn lên'}: <b>${fmt(r)}</b>.`})}}
function gAddSub(len){return lv=>{const L=lv===1?len-1:len;const add=Math.random()<.5;let a=randDigits(L),b=randDigits(L-(lv===3?0:1));if(!add&&b>a)[a,b]=[b,a];const r=add?a+b:a-b;
  return QB({text:'Tính:',tpl:`<span class="eq">${fmt(a)} ${add?'+':'−'} ${fmt(b)} = [_]</span>`,ans:[r],wide:true,hint:`Đặt tính thẳng cột, ${add?'cộng':'trừ'} từ phải sang trái, nhớ ${add?'1 sang hàng bên trái':'1 vào hàng bên trái khi mượn'}.`,sol:`${fmt(a)} ${add?'+':'−'} ${fmt(b)} = <b>${fmt(r)}</b>.`})}}
function gFindX(len){return lv=>{const t=pick(lv===1?[0,1]:[0,1,2]);const x=randDigits(len-1),a=randDigits(len-1);let tpl,b,sol;
  if(t===0){b=x+a;tpl=`[_] + ${fmt(a)} = ${fmt(b)}`;sol=`Số hạng chưa biết = tổng − số hạng đã biết = ${fmt(b)} − ${fmt(a)} = <b>${fmt(x)}</b>.`}
  else if(t===1){b=x;const y=x+a;tpl=`[_] − ${fmt(a)} = ${fmt(b)}`;sol=`Số bị trừ = hiệu + số trừ = ${fmt(b)} + ${fmt(a)} = <b>${fmt(y)}</b>.`;return QB({text:'Tìm số thích hợp điền vào ô trống:',tpl:`<span class="eq">${tpl}</span>`,ans:[y],wide:true,hint:'Muốn tìm số bị trừ, lấy hiệu cộng với số trừ.',sol})}
  else{const big=x+a;tpl=`${fmt(big)} − [_] = ${fmt(a)}`;sol=`Số trừ = số bị trừ − hiệu = ${fmt(big)} − ${fmt(a)} = <b>${fmt(x)}</b>.`}
  return QB({text:'Tìm số thích hợp điền vào ô trống:',tpl:`<span class="eq">${tpl}</span>`,ans:[x],wide:true,hint:t===0?'Muốn tìm số hạng chưa biết, lấy tổng trừ đi số hạng đã biết.':'Muốn tìm số trừ, lấy số bị trừ trừ đi hiệu.',sol})}}

/* Góc */
const angCat=t=>t<90?'Góc nhọn':t===90?'Góc vuông':t<180?'Góc tù':'Góc bẹt';
const ANG_OPTS=['Góc nhọn','Góc vuông','Góc tù','Góc bẹt'];
const angHint='Góc nhọn bé hơn góc vuông (dưới 90°); góc tù lớn hơn góc vuông (từ 90° đến 180°); góc bẹt bằng 180° (hai cạnh thẳng hàng).';
function randAngle(step){let t;do{t=R(1,Math.floor(180/step)-1)*step}while(t===90&&Math.random()<.5);return t}
const gReadProt=lv=>{const t=randAngle(lv===1?10:5);return QB({text:'Dùng thước đo góc: góc đỉnh O, cạnh OA, OB có số đo là bao nhiêu?',fig:protractorSVG(t),tpl:'Góc AOB = [_]°',ans:[t],hint:'Tâm thước trùng đỉnh O, cạnh OA đi qua vạch 0. Đọc số ở vạch mà cạnh OB đi qua.',sol:`Cạnh OB đi qua vạch <b>${t}</b>, nên góc AOB = <b>${t}°</b>.`})};
const gRotate=lv=>{const t=randAngle(lv===1?10:5);return {kind:'rotate',text:`Kéo (hoặc bấm nút) xoay cạnh OB để góc AOB bằng <b>${t}°</b>.`,target:t,val:90===t?40:90,step:5,hint:'Cạnh OA nằm ở vạch 0. Hãy đưa cạnh OB tới đúng vạch ghi số đo cần tìm.',sol:`Cạnh OB phải đi qua vạch <b>${t}</b> của thước.`}};
const gAngType=()=>{const t=pick([R(3,8)*10,90,R(10,17)*10,180,R(2,17)*5]);return QC({text:'Góc trong hình là góc gì?',fig:angleSVG(t),opts:ANG_OPTS,ans:angCat(t),keepOrder:true,hint:angHint+' Dùng ê-ke để kiểm tra.',sol:`Đó là <b>${angCat(t).toLowerCase()}</b>.`})};
const gAngDeg=()=>{const t=pick([R(2,17)*5,R(19,35)*5,90,180]);return QC({text:`Góc có số đo <b>${t}°</b> là:`,opts:ANG_OPTS,ans:angCat(t),keepOrder:true,hint:angHint,sol:`${t}° ${t<90?'< 90°':t===90?'= 90°':t<180?'lớn hơn 90° và bé hơn 180°':'= 180°'} → <b>${angCat(t).toLowerCase()}</b>.`})};
const gAngWhich=()=>{const cat=pick(['Góc nhọn','Góc tù']);const good=cat==='Góc nhọn'?R(2,17)*5:R(19,35)*5;const bad=shuffle(cat==='Góc nhọn'?[90,180,R(19,35)*5,R(19,35)*5]:[90,180,R(2,17)*5,R(2,17)*5]).slice(0,3);
  return QC({text:`Trong các góc có số đo dưới đây, góc nào là <b>${cat.toLowerCase()}</b>?`,opts:[good,...bad].map(x=>x+'°'),ans:good+'°',hint:angHint,sol:`Góc <b>${good}°</b> là ${cat.toLowerCase()}.`})};

/* Đơn vị đo */
function gConv(U,wordCtx){ // U: [{n,f}] từ bé đến lớn
  const pair=maxR=>{let i,j;do{i=R(0,U.length-2);j=R(i+1,U.length-1)}while(U[j].f/U[i].f>maxR);return[U[i],U[j]]};
  return lv=>{const t=lv===1?0:lv===2?pick([1,2]):pick([2,3,4]);
    if(t===0){const[s,b]=pair(1000),k=R(2,9);return QB({text:'Điền số thích hợp:',tpl:`${k} ${b.n} = [_] ${s.n}`,ans:[k*b.f/s.f],hint:`1 ${b.n} = ${fmt(b.f/s.f)} ${s.n}.`,sol:`${k} ${b.n} = ${k} × ${fmt(b.f/s.f)} = <b>${fmt(k*b.f/s.f)}</b> ${s.n}.`})}
    if(t===1){const[s,b]=pair(1000),q=b.f/s.f,k=R(2,9),m=R(1,q-1),v=k*q+m;return QB({text:'Điền số thích hợp:',tpl:`${k} ${b.n} ${m} ${s.n} = [_] ${s.n}`,ans:[v],wide:true,hint:`Đổi ${k} ${b.n} ra ${s.n} trước (1 ${b.n} = ${fmt(q)} ${s.n}), rồi cộng thêm ${m} ${s.n}.`,sol:`${k} ${b.n} = ${fmt(k*q)} ${s.n}; ${fmt(k*q)} + ${m} = <b>${fmt(v)}</b> ${s.n}.`})}
    if(t===2){const[s,b]=pair(1000),q=b.f/s.f,k=R(2,40);return QB({text:'Điền số thích hợp:',tpl:`${fmt(k*q)} ${s.n} = [_] ${b.n}`,ans:[k],hint:`${fmt(q)} ${s.n} = 1 ${b.n}. Lấy ${fmt(k*q)} chia cho ${fmt(q)}.`,sol:`${fmt(k*q)} : ${fmt(q)} = <b>${k}</b> → ${fmt(k*q)} ${s.n} = ${k} ${b.n}.`})}
    if(t===3){const[s,b]=pair(1000),q=b.f/s.f,k=R(2,9),m=R(1,q-1),v=k*q+m;const other=v+pick([-1,1])*R(1,3)*(q>=100?q/10:1)*(Math.random()<.3?0:1);
      return QCmp('Chọn dấu thích hợp:',`${k} ${b.n} ${m} ${s.n}`,`${fmt(other)} ${s.n}`,v,other,{hint:`Đổi về cùng đơn vị ${s.n} rồi so sánh.`,sol:`${k} ${b.n} ${m} ${s.n} = ${fmt(v)} ${s.n}, nên chọn dấu <b>${cmp(v,other)}</b>.`})}
    return wordCtx(lv);}}
const MASS=[{n:'kg',f:1},{n:'yến',f:10},{n:'tạ',f:100},{n:'tấn',f:1000}];
const AREA=[{n:'mm²',f:1},{n:'cm²',f:100},{n:'dm²',f:1e4},{n:'m²',f:1e6}];
