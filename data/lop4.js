/* =====================================================================
   DỮ LIỆU LỚP 4 – Toán, Kết nối tri thức
   Mỗi bài: G.lesson(mãChủĐề, 'ma-bai', 'Tên bài', 'Mô tả ngắn', [các dạng bài])
   Mỗi dạng bài là một hàm lv => câu hỏi (lv = 1, 2, 3). Xem README.md.
   ===================================================================== */
(() => {
const G = App.addGrade({
  id: 'lop4', name: 'Lớp 4', subject: 'Toán', book: 'Kết nối tri thức',
  topics: [
    {id:1,hk:1,name:'Ôn tập và bổ sung'},{id:2,hk:1,name:'Góc và đơn vị đo góc'},{id:3,hk:1,name:'Số có nhiều chữ số'},
    {id:4,hk:1,name:'Một số đơn vị đo đại lượng'},{id:5,hk:1,name:'Phép cộng và phép trừ'},{id:6,hk:1,name:'Đường thẳng vuông góc. Đường thẳng song song'},
    {id:8,hk:2,name:'Phép nhân và phép chia'},{id:9,hk:2,name:'Làm quen với yếu tố thống kê, xác suất'},{id:10,hk:2,name:'Phân số'},
    {id:11,hk:2,name:'Phép cộng, phép trừ phân số'},{id:12,hk:2,name:'Phép nhân, phép chia phân số'}]
});
const lesson = G.lesson;

/* Bài toán lời văn riêng của lớp 4 */
const massWord=()=>{const T=R(3,9),d=R(11,T*10-5);return QB({text:`Một xe tải chở <b>${T} tấn</b> gạo. Người ta đã dỡ xuống <b>${d} tạ</b>. Hỏi trên xe còn lại bao nhiêu tạ gạo?`,tpl:'[_] tạ',ans:[T*10-d],hint:`Đổi ${T} tấn ra tạ (1 tấn = 10 tạ) rồi trừ.`,sol:`${T} tấn = ${T*10} tạ. Còn lại: ${T*10} − ${d} = <b>${T*10-d} tạ</b>.`})};
const areaWord=()=>{const a=R(3,9),b=R(2,a-1);return QB({text:`Một tấm kính hình chữ nhật có chiều dài <b>${a} dm</b>, chiều rộng <b>${b} dm</b>. Diện tích tấm kính là bao nhiêu xăng-ti-mét vuông?`,tpl:'[_] cm²',ans:[a*b*100],wide:true,hint:'Tính diện tích theo dm² (dài × rộng), rồi đổi: 1 dm² = 100 cm².',sol:`${a} × ${b} = ${a*b} dm² = <b>${fmt(a*b*100)} cm²</b>.`})};

/* CĐ1 */
lesson(1,'on-so','Ôn tập các số đến 100 000','Hàng, giá trị chữ số, viết số, so sánh và làm tròn số có năm chữ số.',[gPlace(5,false),gCompose(5),gCmp(5),gRound(5,[3,4]),gValue(5)]);
lesson(1,'on-phep-tinh','Ôn tập các phép tính trong phạm vi 100 000','Cộng, trừ, nhân, chia và tìm thành phần chưa biết.',[gAddSub(5),lv=>{const b=R(2,9),q=lv===1?R(100,999):R(1000,9999);const mul=Math.random()<.5;
  return mul?QB({text:'Tính:',tpl:`<span class="eq">${fmt(q)} × ${b} = [_]</span>`,ans:[q*b],wide:true,hint:'Nhân lần lượt từ phải sang trái, nhớ sang hàng bên trái.',sol:`${fmt(q)} × ${b} = <b>${fmt(q*b)}</b>.`}):
  QB({text:'Tính:',tpl:`<span class="eq">${fmt(q*b)} : ${b} = [_]</span>`,ans:[q],wide:true,hint:'Chia lần lượt từ trái sang phải.',sol:`${fmt(q*b)} : ${b} = <b>${fmt(q)}</b>.`})},gFindX(5)]);
lesson(1,'chan-le','Số chẵn, số lẻ','Nhận biết số chẵn, số lẻ; đếm và lập số chẵn, lẻ.',[lv=>{const even=Math.random()<.5,len=lv+1;const mk=e=>{let n;do{n=randDigits(len)}while((n%2===0)!==e);return n};const good=mk(even);const opts=[good,mk(!even),mk(!even),mk(!even)].map(fmt);
  return QC({text:`Số nào dưới đây là <b>số ${even?'chẵn':'lẻ'}</b>?`,opts,ans:fmt(good),hint:'Số chẵn có chữ số hàng đơn vị là 0, 2, 4, 6, 8. Số lẻ có chữ số hàng đơn vị là 1, 3, 5, 7, 9.',sol:`${fmt(good)} có chữ số tận cùng là ${good%10} nên là số <b>${even?'chẵn':'lẻ'}</b>.`})},
 lv=>{const even=Math.random()<.5,a=R(10,60),b=a+R(8,lv*15+10);const f=[...Array(b-a+1)].map((_,i)=>a+i).filter(x=>(x%2===0)===even);
  return QB({text:`Có bao nhiêu <b>số ${even?'chẵn':'lẻ'}</b> từ ${a} đến ${b}?`,tpl:'[_] số',ans:[f.length],hint:`Số ${even?'chẵn':'lẻ'} đầu tiên là ${f[0]}, cuối cùng là ${f[f.length-1]}. Hai số ${even?'chẵn':'lẻ'} liên tiếp hơn kém nhau 2 đơn vị.`,sol:`(${f[f.length-1]} − ${f[0]}) : 2 + 1 = <b>${f.length}</b> số.`})},
 lv=>{let ds;do{ds=shuffle([0,1,2,3,4,5,6,7,8,9]).slice(0,4)}while(!ds.some(d=>d%2===0)||!ds.some(d=>d%2));const want=pick(['lớn nhất','bé nhất']),even=lv<3||Math.random()<.5;
  const perms=[];const go=(p,r)=>{if(!r.length){if(p[0]!==0)perms.push(+p.join(''));return}r.forEach((x,i)=>go([...p,x],r.filter((_,j)=>j!==i)))};go([],ds);
  const ok=perms.filter(n=>(n%2===0)===even).sort((a,b)=>a-b);const ans=want==='lớn nhất'?ok[ok.length-1]:ok[0];
  return QB({text:`Từ bốn chữ số <b>${ds.join(', ')}</b>, viết số ${even?'chẵn':'lẻ'} <b>${want}</b> có bốn chữ số khác nhau.`,tpl:'[_]',ans:[ans],wide:true,hint:`Chữ số hàng đơn vị phải là chữ số ${even?'chẵn':'lẻ'}. Các hàng cao được xếp chữ số ${want==='lớn nhất'?'lớn':'bé'} trước (chữ số 0 không đứng đầu).`,sol:`Số cần tìm là <b>${fmt(ans)}</b>.`})}]);
lesson(1,'bieu-thuc-chu','Biểu thức chứa chữ','Tính giá trị biểu thức chứa một, hai, ba chữ.',[
 lv=>{const a=R(100,900),k=R(100,900),op=pick(['+','−','×']);let v,e;if(op==='+'){v=a+k;e=`a + ${k}`}else if(op==='−'){const A=a+k;return QB({text:`Tính giá trị của biểu thức <b>a − ${k}</b> với a = ${A}.`,tpl:'[_]',ans:[A-k],wide:true,hint:'Thay chữ a bằng số rồi tính.',sol:`${A} − ${k} = <b>${A-k}</b>.`})}else{const b=R(2,9);v=a*b;e=`a × ${b}`;return QB({text:`Tính giá trị của biểu thức <b>${e}</b> với a = ${a}.`,tpl:'[_]',ans:[v],wide:true,hint:'Thay chữ a bằng số rồi tính.',sol:`${a} × ${b} = <b>${fmt(v)}</b>.`})}
  return QB({text:`Tính giá trị của biểu thức <b>${e}</b> với a = ${a}.`,tpl:'[_]',ans:[v],wide:true,hint:'Thay chữ a bằng số rồi tính.',sol:`${a} + ${k} = <b>${fmt(v)}</b>.`})},
 lv=>{const a=R(10,60),b=R(2,9),c=R(5,a);const f=pick([0,1]);if(f===0){const v=a*b-c;return QB({text:`Tính giá trị của biểu thức <b>a × b − c</b> với a = ${a}, b = ${b}, c = ${c}.`,tpl:'[_]',ans:[v],hint:'Thay số rồi thực hiện phép nhân trước, phép trừ sau.',sol:`${a} × ${b} − ${c} = ${a*b} − ${c} = <b>${v}</b>.`})}
  const v=(a+c)*b;return QB({text:`Tính giá trị của biểu thức <b>(a + b) × c</b> với a = ${a}, b = ${c}, c = ${b}.`,tpl:'[_]',ans:[v],hint:'Tính trong ngoặc trước.',sol:`(${a} + ${c}) × ${b} = ${a+c} × ${b} = <b>${v}</b>.`})},
 lv=>{if(lv<3||Math.random()<.4){const a=R(12,95);return QB({text:`Chu vi hình vuông cạnh a được tính theo công thức <b>P = a × 4</b>. Tính chu vi hình vuông có cạnh a = ${a} cm.`,tpl:'P = [_] cm',ans:[a*4],hint:'Thay a bằng số đo cạnh.',sol:`P = ${a} × 4 = <b>${a*4} cm</b>.`})}
  const a=R(20,90),b=R(10,a-1);return QB({text:`Chu vi hình chữ nhật: <b>P = (a + b) × 2</b>. Tính P với a = ${a} m, b = ${b} m.`,tpl:'P = [_] m',ans:[(a+b)*2],hint:'Tính tổng chiều dài và chiều rộng trước, rồi nhân 2.',sol:`P = (${a} + ${b}) × 2 = ${a+b} × 2 = <b>${(a+b)*2} m</b>.`})}]);
lesson(1,'ba-buoc','Giải bài toán có ba bước tính','Bài toán lời văn cần hai đến ba bước tính.',[
 ()=>{const k=R(3,6),per=R(12,36),sold=R(10,k*per-10);return QB({text:`Một cửa hàng có <b>${k} thùng</b> nước, mỗi thùng <b>${per} chai</b>. Cửa hàng đã bán <b>${sold} chai</b>. Hỏi cửa hàng còn lại bao nhiêu chai nước?`,tpl:'[_] chai',ans:[k*per-sold],hint:'Bước 1: tìm số chai lúc đầu (nhân). Bước 2: trừ số chai đã bán.',sol:`Lúc đầu: ${k} × ${per} = ${k*per} chai. Còn lại: ${k*per} − ${sold} = <b>${k*per-sold} chai</b>.`})},
 ()=>{const a=R(28,36),m=R(2,5),l=R(1,4),b=a+m,c=b-l;return QB({text:`Lớp 4A có <b>${a}</b> học sinh. Lớp 4B nhiều hơn lớp 4A <b>${m}</b> học sinh. Lớp 4C ít hơn lớp 4B <b>${l}</b> học sinh. Hỏi cả ba lớp có bao nhiêu học sinh?`,tpl:'[_] học sinh',ans:[a+b+c],hint:'Tìm số học sinh lớp 4B, rồi lớp 4C, sau đó cộng cả ba lớp.',sol:`4B: ${a} + ${m} = ${b}. 4C: ${b} − ${l} = ${c}. Cả ba lớp: ${a} + ${b} + ${c} = <b>${a+b+c} học sinh</b>.`})},
 ()=>{const ka=R(2,4),pa=R(3,6)*5000,kb=R(1,3),pb=R(4,8)*5000,tot=ka*pa+kb*pb,pay=Math.ceil((tot+1)/50000)*50000;return QB({text:`Mẹ mua <b>${ka} kg</b> táo, giá ${fmt(pa)} đồng/kg và <b>${kb} kg</b> cam, giá ${fmt(pb)} đồng/kg. Mẹ đưa cô bán hàng <b>${fmt(pay)} đồng</b>. Cô bán hàng trả lại mẹ bao nhiêu tiền?`,tpl:'[_] đồng',ans:[pay-tot],wide:true,hint:'Tính tiền táo, tiền cam, cộng lại, rồi lấy số tiền mẹ đưa trừ đi.',sol:`Táo: ${fmt(ka*pa)} đ; cam: ${fmt(kb*pb)} đ; tổng ${fmt(tot)} đ. Trả lại: ${fmt(pay)} − ${fmt(tot)} = <b>${fmt(pay-tot)} đồng</b>.`})}]);

/* CĐ2 */
lesson(2,'do-goc','Đo góc, đơn vị đo góc','Đọc số đo góc trên thước đo góc; xoay cạnh để tạo góc cho trước.',[gReadProt,gRotate,gReadProt,gRotate]);
lesson(2,'loai-goc','Góc nhọn, góc tù, góc bẹt','Nhận biết góc nhọn, góc vuông, góc tù, góc bẹt.',[gAngType,gAngDeg,gAngWhich]);

/* CĐ3 */
lesson(3,'hang-lop','Hàng và lớp','Hàng, lớp và giá trị của chữ số trong số có nhiều chữ số.',[gPlace(7,true),gValue(8),lv=>{const n=randDigits(8);const cls=pick([['triệu',6],['nghìn',3],['đơn vị',0]]);const v=Math.floor(n/10**cls[1])%1000;const s=cls[0]==='triệu'?String(v):String(v).padStart(3,'0');
  return QB({text:`Lớp <b>${cls[0]}</b> của số <b>${fmt(n)}</b> gồm các chữ số nào? (viết liền nhau)`,tpl:'[_]',ans:[s],hint:'Tách số thành từng nhóm 3 chữ số từ phải sang trái: lớp đơn vị, lớp nghìn, lớp triệu.',sol:`Lớp ${cls[0]} gồm các chữ số <b>${s}</b>.`})},gCompose(8)]);
lesson(3,'lam-tron','Làm tròn số đến hàng trăm nghìn','Làm tròn số đến hàng chục nghìn, trăm nghìn.',[gRound(6,[5]),gRound(7,[4,5]),gRound(8,[5])]);
lesson(3,'so-sanh','So sánh các số có nhiều chữ số','So sánh, tìm số lớn nhất – bé nhất, sắp xếp thứ tự.',[gCmp(6),gCmp(8),lv=>{const want=pick(['lớn nhất','bé nhất']),base=randDigits(7);const ns=[...new Set([base,base+R(1,9)*1000,base-R(1,9)*10000,base+R(1,9)*100000*(Math.random()<.5?1:-1)].filter(x=>String(x).length===7))];while(ns.length<4)ns.push(base+R(1,999));
  const u=[...new Set(ns)].slice(0,4);const ans=want==='lớn nhất'?Math.max(...u):Math.min(...u);return QC({text:`Số nào <b>${want}</b>?`,opts:u.map(fmt),ans:fmt(ans),hint:'Các số đều có bảy chữ số: so sánh từng cặp chữ số từ trái sang phải.',sol:`Số ${want} là <b>${fmt(ans)}</b>.`})},
 ()=>{const b=randDigits(6);const u=[...new Set([b,b+R(1,9)*10,b-R(1,9)*1000,b+R(1,9)*1000])].slice(0,4);while(u.length<4)u.push(b+R(1,99));const asc=u.slice().sort((x,y)=>x-y);const right=asc.map(fmt).join(' ; ');const wrongs=[shuffle(asc),shuffle(asc),asc.slice().reverse()].map(a=>a.map(fmt).join(' ; ')).filter(s=>s!==right);
  return QC({text:'Dãy nào được sắp xếp theo thứ tự <b>từ bé đến lớn</b>?',opts:[right,...wrongs].slice(0,4),ans:right,hint:'Tìm số bé nhất trước, rồi lần lượt các số lớn hơn.',sol:`Thứ tự từ bé đến lớn: <b>${right}</b>.`})}]);
lesson(3,'day-so','Làm quen với dãy số tự nhiên','Số liền trước, liền sau; quy luật dãy số; đếm số tự nhiên.',[()=>{const n=randDigits(R(5,7));const after=Math.random()<.5;return QB({text:`Số liền ${after?'sau':'trước'} của <b>${fmt(n)}</b> là:`,tpl:'[_]',ans:[after?n+1:n-1],wide:true,hint:`Số liền ${after?'sau hơn':'trước kém'} số đã cho 1 đơn vị.`,sol:`${fmt(n)} ${after?'+':'−'} 1 = <b>${fmt(after?n+1:n-1)}</b>.`})},
 lv=>{const d=pick(lv===1?[2,5,10]:[3,4,25,50,100]),a=R(1,40)*(lv===1?d:1),s=[0,1,2,3].map(i=>a+i*d);return QB({text:'Viết số tiếp theo của dãy số:',tpl:`${s.map(fmt).join(';  ')};  [_]`,ans:[a+4*d],hint:'Tìm xem hai số liên tiếp hơn kém nhau bao nhiêu.',sol:`Mỗi số hơn số liền trước ${d} đơn vị: ${fmt(s[3])} + ${d} = <b>${fmt(a+4*d)}</b>.`})},
 lv=>{const a=R(10,200),b=a+R(20,lv*200);return QB({text:`Có bao nhiêu số tự nhiên từ ${a} đến ${b}?`,tpl:'[_] số',ans:[b-a+1],hint:'Số các số tự nhiên liên tiếp = số cuối − số đầu + 1.',sol:`${b} − ${a} + 1 = <b>${b-a+1}</b> số.`})}]);

/* CĐ4 */
lesson(4,'yen-ta-tan','Yến, tạ, tấn','Đổi đơn vị đo khối lượng; so sánh; bài toán thực tế.',[gConv(MASS,massWord)]);
lesson(4,'dien-tich','Đề-xi-mét vuông, mét vuông, mi-li-mét vuông','Đổi đơn vị đo diện tích; tính diện tích hình chữ nhật.',[gConv(AREA,areaWord)]);
lesson(4,'giay-the-ki','Giây, thế kỉ','Đổi phút – giây, năm – thế kỉ; xác định thế kỉ.',[lv=>{if(lv===1){const k=R(2,9);return QB({text:'Điền số thích hợp:',tpl:`${k} phút = [_] giây`,ans:[k*60],hint:'1 phút = 60 giây.',sol:`${k} × 60 = <b>${k*60}</b> giây.`})}
  if(lv===2){const k=R(1,5),s=R(5,55);return QB({text:'Điền số thích hợp:',tpl:`${k} phút ${s} giây = [_] giây`,ans:[k*60+s],hint:'Đổi số phút ra giây rồi cộng thêm số giây.',sol:`${k*60} + ${s} = <b>${k*60+s}</b> giây.`})}
  const d=pick([2,3,4,5,6]);return QB({text:'Điền số thích hợp:',tpl:`${F(1,d)} phút = [_] giây`,ans:[60/d],hint:`Lấy 60 giây chia cho ${d}.`,sol:`60 : ${d} = <b>${60/d}</b> giây.`})},
 ()=>{const y=R(1000,2099);const c=Math.floor((y-1)/100)+1;return QB({text:`Năm <b>${y}</b> thuộc thế kỉ nào? (viết bằng chữ số La Mã)`,tpl:'Thế kỉ [_]',ans:[[roman(c),c]],hint:`Thế kỉ ${roman(c)} bắt đầu từ năm ${(c-1)*100+1} đến năm ${c*100}.`,sol:`Năm ${y} thuộc thế kỉ <b>${roman(c)}</b> (thế kỉ ${c}).`})},
 ()=>{const c=R(10,21),st=Math.random()<.5;return QB({text:`Thế kỉ <b>${roman(c)}</b> ${st?'bắt đầu':'kết thúc'} vào năm nào?`,tpl:'Năm [_]',ans:[st?(c-1)*100+1:c*100],hint:'Mỗi thế kỉ có 100 năm. Thế kỉ I từ năm 1 đến năm 100.',sol:`Thế kỉ ${roman(c)}: từ năm ${(c-1)*100+1} đến năm ${c*100}. Đáp án: <b>${st?(c-1)*100+1:c*100}</b>.`})}]);

/* CĐ5 */
lesson(5,'cong-tru','Phép cộng, phép trừ các số có nhiều chữ số','Cộng, trừ số có nhiều chữ số; tìm thành phần chưa biết.',[gAddSub(6),gAddSub(7),gFindX(6)]);
lesson(5,'tinh-chat-cong','Tính chất giao hoán và kết hợp của phép cộng','Vận dụng tính chất để tính thuận tiện.',[()=>{const a=R(100,999),b=R(100,999);return QB({text:'Điền số thích hợp:',tpl:`<span class="eq">${a} + ${b} = ${b} + [_]</span>`,ans:[a],hint:'Khi đổi chỗ các số hạng trong một tổng thì tổng không thay đổi.',sol:`${a} + ${b} = ${b} + <b>${a}</b>.`})},
 ()=>{const a=R(1,9)*100+R(1,99),c=Math.ceil(a/100)*100+R(1,5)*100-a,b=R(100,899);return QB({text:'Tính bằng cách thuận tiện:',tpl:`<span class="eq">${a} + ${b} + ${c} = [_]</span>`,ans:[a+b+c],wide:true,hint:`Nhóm ${a} với ${c} được số tròn trăm.`,sol:`(${a} + ${c}) + ${b} = ${a+c} + ${b} = <b>${fmt(a+b+c)}</b>.`})},
 ()=>{const a=R(1000,9000),b=R(100,900),c=R(100,900);return QB({text:'Điền số thích hợp:',tpl:`<span class="eq">(${a} + ${b}) + ${c} = ${a} + ([_] + ${c})</span>`,ans:[b],hint:'Tính chất kết hợp: (a + b) + c = a + (b + c).',sol:`Số cần điền là <b>${b}</b>.`})}]);
lesson(5,'tong-hieu','Tìm hai số biết tổng và hiệu','Tìm số lớn, số bé khi biết tổng và hiệu.',[lv=>{const s=R(10,lv*200),h=R(2,Math.max(4,s))*2;const big=s+h,S=big+s;return QB({text:`Tổng hai số là <b>${S}</b>, hiệu hai số là <b>${h}</b>. Tìm hai số đó.`,tpl:'Số lớn: [_] &nbsp; Số bé: [_]',ans:[big,s],hint:'Số lớn = (Tổng + Hiệu) : 2; Số bé = (Tổng − Hiệu) : 2.',sol:`Số lớn = (${S} + ${h}) : 2 = <b>${big}</b>; số bé = ${S} − ${big} = <b>${s}</b>.`})},
 ()=>{const c=R(6,12),h=R(24,32),d=c+h;return QB({text:`Tổng số tuổi của bố và con là <b>${c+d}</b> tuổi. Bố hơn con <b>${h}</b> tuổi. Hỏi con bao nhiêu tuổi?`,tpl:'[_] tuổi',ans:[c],hint:'Tuổi con là số bé: (Tổng − Hiệu) : 2.',sol:`Tuổi con: (${c+d} − ${h}) : 2 = <b>${c} tuổi</b>.`})},
 ()=>{const b=R(80,200),h=R(10,60),a=b+h;return QB({text:`Hai lớp 4A và 4B trồng được <b>${a+b}</b> cây. Lớp 4A trồng nhiều hơn lớp 4B <b>${h}</b> cây. Mỗi lớp trồng được bao nhiêu cây?`,tpl:'4A: [_] cây &nbsp; 4B: [_] cây',ans:[a,b],hint:'Lớp 4A là số lớn, lớp 4B là số bé.',sol:`4A: (${a+b} + ${h}) : 2 = <b>${a}</b> cây; 4B: ${a+b} − ${a} = <b>${b}</b> cây.`})}]);

/* CĐ6 */
lesson(6,'vuong-song-song','Hai đường thẳng vuông góc, song song. Hình bình hành, hình thoi','Nhận biết cặp cạnh vuông góc, song song; nhận dạng hình.',[()=>{const q=pick([['AB','DC'],['AD','BC'],['BC','AD'],['DC','AB']]);return QC({text:`Trong hình chữ nhật ABCD, cạnh nào <b>song song</b> với cạnh ${q[0]}?`,fig:rectSVG(),opts:[q[1],...['AB','BC','DC','AD'].filter(x=>x!==q[0]&&x!==q[1])],ans:q[1],hint:'Hai cạnh đối diện của hình chữ nhật song song với nhau.',sol:`Cạnh <b>${q[1]}</b> song song với cạnh ${q[0]}.`})},
 ()=>{const q=pick([['AB','AD và BC'],['DC','AD và BC'],['AD','AB và DC'],['BC','AB và DC']]);return QC({text:`Trong hình chữ nhật ABCD, cạnh ${q[0]} <b>vuông góc</b> với những cạnh nào?`,fig:rectSVG(),opts:['AD và BC','AB và DC',q[0]==='AB'||q[0]==='DC'?'AD và DC':'AB và BC'],ans:q[1],hint:'Hai cạnh chung một đỉnh của hình chữ nhật thì vuông góc với nhau.',sol:`Cạnh ${q[0]} vuông góc với <b>${q[1]}</b>.`})},
 ()=>{const k=pick(['Hình bình hành','Hình thoi','Hình chữ nhật','Hình vuông']);return QC({text:'Hình bên là hình gì?',fig:shapeSVG(k),opts:['Hình bình hành','Hình thoi','Hình chữ nhật','Hình vuông'],ans:k,keepOrder:true,hint:'Hình bình hành: hai cặp cạnh đối song song và bằng nhau. Hình thoi: thêm bốn cạnh bằng nhau. Hình chữ nhật có 4 góc vuông.',sol:`Đó là <b>${k.toLowerCase()}</b>.`})}]);

/* CĐ8 */
lesson(8,'nhan-chia-1','Nhân, chia với số có một chữ số','Nhân, chia số có nhiều chữ số với số có một chữ số.',[lv=>{const a=randDigits(lv+3),b=R(2,9);return QB({text:'Tính:',tpl:`<span class="eq">${fmt(a)} × ${b} = [_]</span>`,ans:[a*b],wide:true,hint:'Nhân từ phải sang trái, nhớ sang hàng bên trái.',sol:`${fmt(a)} × ${b} = <b>${fmt(a*b)}</b>.`})},
 lv=>{const b=R(2,9),q=randDigits(lv+2);return QB({text:'Tính:',tpl:`<span class="eq">${fmt(q*b)} : ${b} = [_]</span>`,ans:[q],wide:true,hint:'Chia từ trái sang phải; mỗi lần chia: chia – nhân – trừ – hạ.',sol:`${fmt(q*b)} : ${b} = <b>${fmt(q)}</b>.`})},
 lv=>{const b=R(3,9),q=randDigits(lv+1),r=R(1,b-1),a=q*b+r;return QB({text:'Thực hiện phép chia có dư:',tpl:`<span class="eq">${fmt(a)} : ${b} = [_] (dư [_])</span>`,ans:[q,r],hint:'Số dư luôn bé hơn số chia.',sol:`${fmt(a)} = ${fmt(q)} × ${b} + ${r} → thương <b>${fmt(q)}</b>, dư <b>${r}</b>.`})}]);
lesson(8,'nhan-10','Nhân, chia với 10, 100, 1 000, …','Nhân, chia nhẩm với 10, 100, 1 000.',[()=>{const k=pick([10,100,1000]),n=R(12,999);return QB({text:'Tính nhẩm:',tpl:`<span class="eq">${n} × ${fmt(k)} = [_]</span>`,ans:[n*k],wide:true,hint:`Nhân với ${fmt(k)}: viết thêm ${String(k).length-1} chữ số 0 vào bên phải.`,sol:`${n} × ${fmt(k)} = <b>${fmt(n*k)}</b>.`})},
 ()=>{const k=pick([10,100,1000]),n=R(12,999);return QB({text:'Tính nhẩm:',tpl:`<span class="eq">${fmt(n*k)} : ${fmt(k)} = [_]</span>`,ans:[n],hint:`Chia cho ${fmt(k)}: bỏ bớt ${String(k).length-1} chữ số 0 ở bên phải.`,sol:`${fmt(n*k)} : ${fmt(k)} = <b>${n}</b>.`})},
 ()=>{const k=pick([10,100,1000]),n=R(12,99);return QB({text:'Điền số thích hợp:',tpl:`<span class="eq">[_] × ${fmt(k)} = ${fmt(n*k)}</span>`,ans:[n],hint:`Lấy ${fmt(n*k)} chia cho ${fmt(k)}.`,sol:`Số cần điền là <b>${n}</b>.`})}]);
lesson(8,'tinh-chat-nhan','Tính chất của phép nhân','Giao hoán, kết hợp, nhân một số với một tổng – tính thuận tiện.',[()=>{const p=pick([[25,4],[5,2],[50,2],[125,8],[20,5]]),m=R(3,19);return QB({text:'Tính bằng cách thuận tiện:',tpl:`<span class="eq">${p[0]} × ${m} × ${p[1]} = [_]</span>`,ans:[p[0]*p[1]*m],wide:true,hint:`Nhóm ${p[0]} × ${p[1]} = ${p[0]*p[1]} trước.`,sol:`${p[0]} × ${p[1]} × ${m} = ${p[0]*p[1]} × ${m} = <b>${fmt(p[0]*p[1]*m)}</b>.`})},
 ()=>{const a=R(12,99),b=R(11,89),c=100-b;return QB({text:'Tính bằng cách thuận tiện:',tpl:`<span class="eq">${a} × ${b} + ${a} × ${c} = [_]</span>`,ans:[a*100],wide:true,hint:'Một số nhân với một tổng: a × b + a × c = a × (b + c).',sol:`${a} × (${b} + ${c}) = ${a} × 100 = <b>${fmt(a*100)}</b>.`})},
 ()=>{const a=R(12,99),k=pick([9,99,11,101]);const v=a*k;const s=k===9?`${a} × 10 − ${a}`:k===99?`${a} × 100 − ${a}`:k===11?`${a} × 10 + ${a}`:`${a} × 100 + ${a}`;return QB({text:'Tính bằng cách thuận tiện:',tpl:`<span class="eq">${a} × ${k} = [_]</span>`,ans:[v],wide:true,hint:`Viết ${k} thành ${k===9?'10 − 1':k===99?'100 − 1':k===11?'10 + 1':'100 + 1'}.`,sol:`${s} = <b>${fmt(v)}</b>.`})}]);
lesson(8,'nhan-chia-2','Nhân, chia với số có hai chữ số','Nhân, chia với số có hai chữ số; bài toán thực tế.',[lv=>{const a=randDigits(lv+1),b=R(11,99);return QB({text:'Tính:',tpl:`<span class="eq">${fmt(a)} × ${b} = [_]</span>`,ans:[a*b],wide:true,hint:`Nhân ${fmt(a)} với ${b%10} và với ${Math.floor(b/10)} chục, rồi cộng hai tích riêng (tích riêng thứ hai lùi sang trái một cột).`,sol:`${fmt(a)} × ${b} = <b>${fmt(a*b)}</b>.`})},
 lv=>{const b=R(12,68),q=lv===1?R(2,9):R(11,lv===2?99:300);return QB({text:'Tính:',tpl:`<span class="eq">${fmt(q*b)} : ${b} = [_]</span>`,ans:[q],hint:`Ước lượng thương: làm tròn ${b} thành ${Math.round(b/10)*10} để nhẩm.`,sol:`${fmt(q*b)} : ${b} = <b>${q}</b> (thử lại: ${q} × ${b} = ${fmt(q*b)}).`})},
 ()=>{const per=R(24,48),k=R(12,35);return QB({text:`Mỗi hộp có <b>${per}</b> cái bút. Hỏi <b>${k}</b> hộp như thế có bao nhiêu cái bút?`,tpl:'[_] cái bút',ans:[per*k],hint:'Lấy số bút mỗi hộp nhân với số hộp.',sol:`${per} × ${k} = <b>${per*k}</b> cái bút.`})}]);
lesson(8,'tbc','Tìm số trung bình cộng','Tính trung bình cộng; bài toán thực tế.',[lv=>{const n=lv===1?2:pick([3,4]),avg=R(20,lv*60+20);let v;do{v=[...Array(n-1)].map(()=>avg+R(-15,15));v.push(avg*n-v.reduce((a,b)=>a+b,0))}while(v[n-1]<=0);
  return QB({text:`Tìm số trung bình cộng của các số: <b>${v.join('; ')}</b>.`,tpl:'[_]',ans:[avg],hint:`Tính tổng các số rồi chia cho ${n} (số các số hạng).`,sol:`(${v.join(' + ')}) : ${n} = ${avg*n} : ${n} = <b>${avg}</b>.`})},
 ()=>{const avg=R(30,60),n=pick([3,4]);let v;do{v=[...Array(n-1)].map(()=>avg+R(-12,12));v.push(avg*n-v.reduce((a,b)=>a+b,0))}while(v[n-1]<=0);const names=shuffle(NAMES).slice(0,n);
  return QB({text:`${joinVa(names)} lần lượt gấp được ${v.join(', ')} ngôi sao. Hỏi trung bình mỗi bạn gấp được bao nhiêu ngôi sao?`,tpl:'[_] ngôi sao',ans:[avg],hint:`Tổng số ngôi sao chia cho ${n} bạn.`,sol:`(${v.join(' + ')}) : ${n} = <b>${avg}</b> ngôi sao.`})},
 ()=>{const avg=R(20,80),y=R(10,2*avg-5);return QB({text:`Trung bình cộng của hai số là <b>${avg}</b>. Một số là <b>${y}</b>. Tìm số kia.`,tpl:'[_]',ans:[2*avg-y],hint:'Tổng hai số = trung bình cộng × 2.',sol:`Tổng: ${avg} × 2 = ${2*avg}. Số kia: ${2*avg} − ${y} = <b>${2*avg-y}</b>.`})}]);

/* CĐ9 */
function chartData(){const labels=['4A','4B','4C','4D'],step=pick([5,10]);let v;do{v=labels.map(()=>R(2,11)*step)}while(new Set(v).size<4);return{labels,v,step}}
lesson(9,'bieu-do','Biểu đồ cột','Đọc và nhận xét số liệu trên biểu đồ cột.',[()=>{const{labels,v,step}=chartData(),i=R(0,3);return QB({text:`Biểu đồ cho biết số cây mỗi lớp đã trồng. Lớp <b>${labels[i]}</b> trồng được bao nhiêu cây?`,fig:barSVG(labels,v,step,'cây'),tpl:'[_] cây',ans:[v[i]],hint:'Dóng từ đỉnh cột sang trục số bên trái.',sol:`Cột ${labels[i]} cao tới vạch <b>${v[i]}</b>.`})},
 ()=>{const{labels,v,step}=chartData(),most=Math.random()<.5,idx=v.indexOf(most?Math.max(...v):Math.min(...v));return QC({text:`Lớp nào trồng được <b>${most?'nhiều':'ít'} cây nhất</b>?`,fig:barSVG(labels,v,step,'cây'),opts:labels,ans:labels[idx],keepOrder:true,hint:`Tìm cột ${most?'cao':'thấp'} nhất.`,sol:`Cột ${labels[idx]} ${most?'cao':'thấp'} nhất (${v[idx]} cây).`})},
 lv=>{const{labels,v,step}=chartData();if(lv<3||Math.random()<.5){const[i,j]=shuffle([0,1,2,3]);const[a,b]=v[i]>v[j]?[i,j]:[j,i];return QB({text:`Lớp ${labels[a]} trồng nhiều hơn lớp ${labels[b]} bao nhiêu cây?`,fig:barSVG(labels,v,step,'cây'),tpl:'[_] cây',ans:[v[a]-v[b]],hint:'Đọc số cây của hai lớp rồi lấy số lớn trừ số bé.',sol:`${v[a]} − ${v[b]} = <b>${v[a]-v[b]} cây</b>.`})}
  const t=v.reduce((a,b)=>a+b,0);return QB({text:'Cả bốn lớp trồng được tất cả bao nhiêu cây?',fig:barSVG(labels,v,step,'cây'),tpl:'[_] cây',ans:[t],hint:'Đọc số cây của từng lớp rồi cộng lại.',sol:`${v.join(' + ')} = <b>${t} cây</b>.`})}]);

/* CĐ10 */
lesson(10,'khai-niem-ps','Khái niệm phân số','Đọc, viết phân số; phân số chỉ phần tô màu; phân số và phép chia.',[lv=>{const n=R(3,lv===1?6:lv===2?8:10),k=R(1,n-1),sh=n<=8&&Math.random()<.5?'circle':'rect';return QB({text:'Viết phân số chỉ phần đã tô màu của hình:',fig:fracSVG(n,k,sh),tpl:'[F]',ans:[{frac:[k,n],mode:'exact'}],hint:'Mẫu số là số phần bằng nhau của hình; tử số là số phần được tô màu.',sol:`Hình chia thành ${n} phần bằng nhau, tô ${k} phần: ${F(k,n)}.`})},
 lv=>{const n=pick(lv===1?[4,5,6]:[6,8,10]);let k=R(1,n-1),dn=n,dk=k;if(lv===3){const g=pick([2,n/2].filter(x=>n%x===0&&x>1)),m=n/g;k=R(1,g-1)*m;dn=g;dk=k/m}
  return {kind:'shade',text:`Chạm vào các phần để tô màu ${F(dk,dn)} hình.`,n,shape:n<=8&&Math.random()<.5?'circle':'rect',num:dk,den:dn,on:[],hint:lv===3?`Hình có ${n} phần. ${F(dk,dn)} = ${F(k,n)}.`:`Hình có ${n} phần bằng nhau, con cần tô ${k} phần.`,sol:`Tô <b>${k}</b> trong ${n} phần.`}},
 ()=>{const d=R(2,10),n=R(1,10);return QB({text:`Viết phân số: <b>${WORD[n]} phần ${WORD[d]}</b>`,tpl:'[F]',ans:[{frac:[n,d],mode:'exact'}],hint:'Đọc tử số trước, rồi đọc "phần", rồi đọc mẫu số.',sol:`${F(n,d)}`})},
 ()=>{const a=R(1,15),b=R(2,12);return QB({text:'Viết thương của phép chia dưới dạng phân số:',tpl:`<span class="eq">${a} : ${b} = [F]</span>`,ans:[{frac:[a,b],mode:'exact'}],hint:'Số bị chia là tử số, số chia là mẫu số.',sol:`${a} : ${b} = ${F(a,b)}.`})}]);
lesson(10,'rut-gon','Tính chất cơ bản, rút gọn, quy đồng phân số','Phân số bằng nhau; rút gọn; quy đồng mẫu số.',[()=>{let a,b;do{b=R(2,9);a=R(1,b-1)}while(gcd(a,b)>1);const m=R(2,6);return QB({text:'Điền số thích hợp:',tpl:`<span class="eq">${F(a,b)} = <span class="fr"><span>[_]</span><span>${b*m}</span></span></span>`,ans:[a*m],hint:`${b} × ${m} = ${b*m}. Nhân cả tử và mẫu với cùng một số.`,sol:`${F(a,b)} = ${F(a+' × '+m,b+' × '+m)} = ${F(a*m,b*m)}.`})},
 lv=>{let a,b;do{b=R(2,lv===1?6:10);a=R(1,b-1)}while(gcd(a,b)>1);const m=R(2,lv===1?5:9);return QB({text:`Rút gọn phân số ${F(a*m,b*m)} thành phân số tối giản:`,tpl:'[F]',ans:[{frac:[a,b],mode:'simplest'}],hint:`Chia cả tử và mẫu cho ${m} (hoặc chia nhiều lần cho 2, 3, 5…).`,sol:`${F(a*m,b*m)} = ${F(a,b)} (chia cả tử và mẫu cho ${m}).`})},
 lv=>{let a,b,c,d;if(lv<3){b=R(2,5);d=b*R(2,4);}else{do{b=R(2,6);d=R(2,7)}while(gcd(b,d)>1||b===d)}do{a=R(1,b-1)}while(gcd(a,b)>1);do{c=R(1,d-1)}while(gcd(c,d)>1);const M=lcm(b,d);
  return QB({text:`Quy đồng mẫu số hai phân số ${F(a,b)} và ${F(c,d)}:`,tpl:'[F] &nbsp;và&nbsp; [F]',ans:[{frac:[a,b],mode:'eq'},{frac:[c,d],mode:'eq'}],sameDen:true,hint:d%b===0?`${d} chia hết cho ${b}: giữ nguyên ${F(c,d)}, nhân cả tử và mẫu của ${F(a,b)} với ${d/b}.`:`Chọn mẫu số chung là ${b} × ${d} = ${b*d}.`,sol:`${F(a,b)} = ${F(a*M/b,M)}; ${F(c,d)} = ${F(c*M/d,M)}.`})}]);
lesson(10,'so-sanh-ps','So sánh phân số','So sánh hai phân số; so sánh phân số với 1.',[()=>{const d=R(3,12);let a,b;do{a=R(1,d+3);b=R(1,d+3)}while(a===b);return QCmp('Chọn dấu thích hợp:',F(a,d),F(b,d),a,b,{hint:'Hai phân số cùng mẫu số: phân số nào có tử số lớn hơn thì lớn hơn.',sol:`${F(a,d)} <b>${cmp(a,b)}</b> ${F(b,d)}.`})},
 ()=>{const n=R(1,8);let a,b;do{a=R(2,12);b=R(2,12)}while(a===b);return QCmp('Chọn dấu thích hợp:',F(n,a),F(n,b),n/a,n/b,{hint:'Hai phân số cùng tử số: phân số nào có mẫu số bé hơn thì lớn hơn.',sol:`${F(n,a)} <b>${cmp(n/a,n/b)}</b> ${F(n,b)}.`})},
 lv=>{if(lv<3&&Math.random()<.5){const d=R(3,9),a=R(1,2*d);return QCmp('So sánh với 1:',F(a,d),'1',a/d,1,{hint:'Tử số bé hơn mẫu số thì phân số bé hơn 1; bằng thì bằng 1; lớn hơn thì lớn hơn 1.',sol:`${F(a,d)} <b>${cmp(a/d,1)}</b> 1.`})}
  const b=R(2,5),m=R(2,4),d=b*m;let a=R(1,b-1),c;do{c=R(1,d-1)}while(false);return QCmp('Chọn dấu thích hợp:',F(a,b),F(c,d),a*m,c,{hint:`Quy đồng: ${F(a,b)} = ${F(a*m,d)} rồi so sánh.`,sol:`${F(a,b)} = ${F(a*m,d)} → ${F(a,b)} <b>${cmp(a*m,c)}</b> ${F(c,d)}.`})}]);

/* CĐ11 */
lesson(11,'cong-tru-ps','Phép cộng, phép trừ phân số','Cộng, trừ phân số cùng mẫu và khác mẫu (một mẫu chia hết cho mẫu kia).',[lv=>{const d=R(3,12),add=Math.random()<.5;let a=R(1,d),b=R(1,d);if(!add&&a<b)[a,b]=[b,a];if(!add&&a===b)a++;const r=add?a+b:a-b;
  return QB({text:'Tính:',tpl:`<span class="eq">${F(a,d)} ${add?'+':'−'} ${F(b,d)} = [F]</span>`,ans:[{frac:[r,d],mode:'eq'}],hint:`Cùng mẫu số: ${add?'cộng':'trừ'} hai tử số và giữ nguyên mẫu số.`,sol:`${F(a,d)} ${add?'+':'−'} ${F(b,d)} = ${F(r,d)}${gcd(r,d)>1?' = '+Fs(r,d):''}.`})},
 lv=>{const b=R(2,5),m=R(2,3),d=b*m,add=Math.random()<.5,a=R(1,b-1);const c=add?R(1,d-1):R(1,a*m-1),num=add?a*m+c:a*m-c,op=add?'+':'−';
  return QB({text:'Tính:',tpl:`<span class="eq">${F(a,b)} ${op} ${F(c,d)} = [F]</span>`,ans:[{frac:[num,d],mode:'eq'}],hint:`Quy đồng: ${F(a,b)} = ${F(a*m,d)}, rồi ${op==='+'?'cộng':'trừ'} hai phân số cùng mẫu.`,sol:`${F(a*m,d)} ${op} ${F(c,d)} = ${F(num,d)}${gcd(num,d)>1?' = '+Fs(num,d):''}.`})},
 ()=>{const w=R(1,3),d=R(2,9),a=R(1,d-1),add=Math.random()<.5;const num=add?w*d+a:w*d-a;return QB({text:'Tính:',tpl:`<span class="eq">${w} ${add?'+':'−'} ${F(a,d)} = [F]</span>`,ans:[{frac:[num,d],mode:'eq'}],hint:`Viết ${w} thành phân số có mẫu số ${d}: ${w} = ${F(w*d,d)}.`,sol:`${F(w*d,d)} ${add?'+':'−'} ${F(a,d)} = ${F(num,d)}.`})},
 ()=>{const d=R(5,12),a=R(1,d-2),b=R(1,d-a-1);return QB({text:`Một bể nước, ngày thứ nhất dùng hết ${F(a,d)} bể, ngày thứ hai dùng hết ${F(b,d)} bể. Hỏi cả hai ngày dùng hết bao nhiêu phần bể nước?`,tpl:'[F] bể',ans:[{frac:[a+b,d],mode:'eq'}],hint:'Cộng hai phân số cùng mẫu số.',sol:`${F(a,d)} + ${F(b,d)} = ${F(a+b,d)} bể.`})}]);

/* CĐ12 */
lesson(12,'nhan-chia-ps','Phép nhân, phép chia phân số. Tìm phân số của một số','Nhân, chia phân số; tìm phân số của một số.',[()=>{const a=R(1,7),b=R(2,9),c=R(1,7),d=R(2,9);return QB({text:'Tính:',tpl:`<span class="eq">${F(a,b)} × ${F(c,d)} = [F]</span>`,ans:[{frac:[a*c,b*d],mode:'eq'}],hint:'Lấy tử số nhân tử số, mẫu số nhân mẫu số.',sol:`${F(a+' × '+c,b+' × '+d)} = ${F(a*c,b*d)}${gcd(a*c,b*d)>1?' = '+Fs(a*c,b*d):''}.`})},
 ()=>{const a=R(1,7),b=R(2,9),c=R(1,7),d=R(2,9);return QB({text:'Tính:',tpl:`<span class="eq">${F(a,b)} : ${F(c,d)} = [F]</span>`,ans:[{frac:[a*d,b*c],mode:'eq'}],hint:`Chia cho một phân số = nhân với phân số đảo ngược: ${F(a,b)} × ${F(d,c)}.`,sol:`${F(a,b)} × ${F(d,c)} = ${F(a*d,b*c)}${gcd(a*d,b*c)>1?' = '+Fs(a*d,b*c):''}.`})},
 ()=>{const d=R(2,9),a=R(1,d-1),n=d*R(2,12);return QB({text:`Tìm ${F(a,d)} của <b>${n}</b>.`,tpl:'[_]',ans:[n/d*a],hint:`Lấy ${n} nhân với ${F(a,d)} (hoặc chia ${n} cho ${d} rồi nhân ${a}).`,sol:`${n} × ${F(a,d)} = ${n} : ${d} × ${a} = <b>${n/d*a}</b>.`})},
 ()=>{const d=pick([3,4,5,6]),a=R(1,d-1),n=d*R(5,9);return QB({text:`Lớp 4A có <b>${n}</b> học sinh, trong đó ${F(a,d)} số học sinh thích môn Toán. Hỏi lớp 4A có bao nhiêu học sinh thích môn Toán?`,tpl:'[_] học sinh',ans:[n/d*a],hint:`Tìm ${F(a,d)} của ${n}.`,sol:`${n} × ${F(a,d)} = <b>${n/d*a} học sinh</b>.`})}]);

/* =====================================================================
   🧠 GIẢI TOÁN TỪNG BƯỚC – bài toán có lời văn nhiều bước (QS, xem CLAUDE.md)
   Mức 1: đủ 4 khâu Hiểu đề → Tóm tắt → Kế hoạch → Giải (+ Thử lại).
   Mức 2: bớt khung, có bẫy câu chữ (“ít hơn”), tự sắp thứ tự các bước.
   Mức 3: chỉ có đề và ô đáp số; bấm “Làm theo từng bước” nếu cần (tối đa ½ điểm).
   ===================================================================== */
const BG=(...l)=>`<div>${l.join('<br>')}</div>`;           // trình bày bài giải kiểu tiểu học
const U_CTX=[{o:'thùng',n:'quyển vở',u:'quyển',sell:true},{o:'hộp',n:'cái bút chì',u:'cái',sell:true},{o:'bao',n:'ki-lô-gam gạo',u:'kg',sell:true},{o:'can',n:'lít nước mắm',u:'l',sell:true},{o:'xe',n:'học sinh',u:'học sinh',verb:'chở'}];
const vb=c=>c.verb||'chứa';
const unitRow=(k,lab,right)=>({label:lab,parts:[...Array(k)].map(()=>({v:1})),right});

/* Rút về đơn vị (2–3 bước) */
const gUnit=lv=>{const c=lv===3?pick(U_CTX.filter(x=>x.sell)):pick(U_CTX),n=R(3,lv===1?6:8),u=lv===1?R(4,12):R(12,48);let m;do{m=R(2,9)}while(m===n);const a=u*n;
  const fig=segSVG([unitRow(n,`${n} ${c.o}`,`${a} ${c.u}`),unitRow(m,`${m} ${c.o}`,`? ${c.u}`)],{labelW:88});
  if(lv===1)return QS({text:`Có <b>${n} ${c.o}</b> như nhau ${vb(c)} tất cả <b>${a} ${c.n}</b>. Hỏi <b>${m} ${c.o}</b> như thế ${vb(c)} bao nhiêu ${c.n}?`,fig,
    hint:'Tìm số của 1 phần trước (phép chia), rồi tìm số của nhiều phần (phép nhân).',
    sol:BG(`Số ${c.n} trong 1 ${c.o} là:`,`${a} : ${n} = ${u} (${c.u})`,`Số ${c.n} trong ${m} ${c.o} là:`,`${u} × ${m} = ${u*m} (${c.u})`,`Đáp số: <b>${u*m} ${c.n}</b>.`),
    steps:[{tag:'Hiểu đề',ask:'Bài toán hỏi gì?',opts:[`Số ${c.n} trong ${m} ${c.o}`,`Số ${c.n} trong 1 ${c.o}`,`Số ${c.n} trong ${n} ${c.o}`,`Có tất cả bao nhiêu ${c.o}`],ans:`Số ${c.n} trong ${m} ${c.o}`,hint:'Đọc câu cuối của đề, câu bắt đầu bằng chữ “Hỏi”.'},
      {tag:'Tóm tắt',ask:'Nhìn sơ đồ, điền số vào tóm tắt:',tpl:`[_] ${c.o}: [_] ${c.u}<br>[_] ${c.o}: ? ${c.u}`,ans:[n,a,m],hint:'Tìm trong đề: số ' + c.o + ' lúc đầu, số ' + c.u + ' của chúng và số ' + c.o + ' cần hỏi.'},
      {tag:'Kế hoạch',ask:`Muốn biết ${m} ${c.o} ${vb(c)} bao nhiêu, trước hết con cần tìm gì?`,opts:[`Số ${c.n} trong 1 ${c.o}`,`Tổng số ${c.o}: ${n} + ${m}`,`Hiệu số ${c.o}: ${Math.max(n,m)} − ${Math.min(n,m)}`,`Số ${c.n} trong ${n+m} ${c.o}`],ans:`Số ${c.n} trong 1 ${c.o}`,hint:'Các '+c.o+' như nhau: biết 1 '+c.o+' thì tính được bao nhiêu '+c.o+' cũng được.'},
      {tag:'Giải',ask:`Số ${c.n} trong 1 ${c.o} là:`,tpl:`${a} : ${n} = [_] (${c.u})`,ans:[u],hint:`Chia đều ${a} ${c.u} cho ${n} ${c.o}.`},
      {tag:'Giải',ask:`Số ${c.n} trong ${m} ${c.o} là:`,tpl:`[_] × ${m} = [_] (${c.u})`,ans:[u,u*m],hint:`Lấy số ${c.u} trong 1 ${c.o} nhân với ${m}.`}]});
  if(lv===2){const b=u*m;return QS({text:`Có <b>${a} ${c.n}</b> được xếp đều vào <b>${n} ${c.o}</b>. Hỏi có <b>${b} ${c.n}</b> thì xếp được bao nhiêu ${c.o} như thế?`,
    fig:segSVG([unitRow(n,`${n} ${c.o}`,`${a} ${c.u}`),{label:`? ${c.o}`,parts:[{v:m,t:''}],right:`${b} ${c.u}`}],{labelW:88}),
    hint:'Tìm số trong 1 '+c.o+' trước, rồi xem '+b+' '+c.u+' chia được thành mấy phần như thế.',
    sol:BG(`Số ${c.n} trong 1 ${c.o} là:`,`${a} : ${n} = ${u} (${c.u})`,`Số ${c.o} xếp được là:`,`${b} : ${u} = ${m} (${c.o})`,`Đáp số: <b>${m} ${c.o}</b>.`),
    steps:[{tag:'Kế hoạch',ask:'Chọn cách giải đúng:',opts:[`① ${a} : ${n} (số ${c.u} trong 1 ${c.o}) → ② ${b} : kết quả ①`,`① ${a} : ${n} → ② kết quả ① × ${b}`,`① ${b} : ${n} → ② kết quả ① × ${a}`,`① ${a} + ${b} → ② kết quả ① : ${n}`],ans:`① ${a} : ${n} (số ${c.u} trong 1 ${c.o}) → ② ${b} : kết quả ①`,hint:'Đây là bài toán rút về đơn vị, nhưng câu hỏi là “bao nhiêu '+c.o+'” nên bước 2 là phép chia.'},
      {tag:'Giải',ask:`Số ${c.n} trong 1 ${c.o} là:`,tpl:`${a} : ${n} = [_] (${c.u})`,ans:[u],hint:`Chia ${a} cho ${n}.`},
      {tag:'Giải',ask:`Số ${c.o} xếp được là:`,tpl:`${b} : [_] = [_] (${c.o})`,ans:[u,m],hint:`Chia ${b} cho số ${c.u} trong 1 ${c.o}.`},
      {tag:'Thử lại',ask:'Thử lại bằng phép nhân:',tpl:`[_] × ${u} = [_]`,ans:[m,b],hint:`Lấy số ${c.o} vừa tìm nhân với ${u}; kết quả phải bằng ${b}.`}]})}
  const p=pick([2000,3000,5000,6000,8000,10000,12000,15000]),tot=u*m*p;
  return QS({direct:true,text:`Có <b>${n} ${c.o}</b> như nhau ${vb(c)} tất cả <b>${a} ${c.n}</b>. Mỗi ${c.u} giá <b>${fmt(p)} đồng</b>. Hỏi mua <b>${m} ${c.o}</b> như thế thì phải trả bao nhiêu tiền?`,fig,
    hint:'Tìm số '+c.u+' trong 1 '+c.o+', rồi trong '+m+' '+c.o+', sau cùng nhân với giá tiền.',
    sol:BG(`Số ${c.n} trong 1 ${c.o} là: ${a} : ${n} = ${u} (${c.u})`,`Số ${c.n} trong ${m} ${c.o} là: ${u} × ${m} = ${u*m} (${c.u})`,`Số tiền phải trả là: ${fmt(p)} × ${u*m} = ${fmt(tot)} (đồng)`,`Đáp số: <b>${fmt(tot)} đồng</b>.`),
    steps:[{tag:'Kế hoạch',ask:'Bài này cần ba bước. Chọn thứ tự đúng:',opts:[`① Tìm số ${c.u} trong 1 ${c.o} → ② Tìm số ${c.u} trong ${m} ${c.o} → ③ Tính số tiền`,`① Tìm số ${c.u} trong ${m} ${c.o} → ② Tìm số ${c.u} trong 1 ${c.o} → ③ Tính số tiền`,`① Tính ${n} + ${m} → ② Nhân với giá tiền`,`① Tìm số ${c.u} trong 1 ${c.o} → ② Nhân với giá tiền → ③ Chia cho ${m}`],ans:`① Tìm số ${c.u} trong 1 ${c.o} → ② Tìm số ${c.u} trong ${m} ${c.o} → ③ Tính số tiền`,hint:'Muốn tính tiền phải biết mua bao nhiêu '+c.u+'; muốn biết điều đó phải biết 1 '+c.o+' có bao nhiêu '+c.u+'.'},
      {tag:'Giải',ask:`Số ${c.n} trong 1 ${c.o} là:`,tpl:`${a} : ${n} = [_] (${c.u})`,ans:[u],hint:`Chia ${a} cho ${n}.`},
      {tag:'Giải',ask:`Số ${c.n} trong ${m} ${c.o} là:`,tpl:`[_] × ${m} = [_] (${c.u})`,ans:[u,u*m],hint:`Nhân số ${c.u} trong 1 ${c.o} với ${m}.`},
      {tag:'Đáp số',ask:'Số tiền phải trả là:',tpl:'[_] đồng',ans:[tot],wide:true,hint:`Lấy giá 1 ${c.u} (${fmt(p)} đồng) nhân với số ${c.u} cần mua.`}]});
};

/* Ba bước tính: so sánh hơn – kém rồi tính tổng */
const B_CTX=[{who:['Lớp 4A','Lớp 4B','Lớp 4C'],u:'học sinh',has:'có',q:'cả ba lớp có bao nhiêu học sinh'},{who:['Thứ Hai','Thứ Ba','Thứ Tư'],u:'quyển sách',has:'thư viện cho mượn',q:'cả ba ngày thư viện cho mượn bao nhiêu quyển sách'},{who:['Tổ Một','Tổ Hai','Tổ Ba'],u:'cây',has:'trồng được',q:'cả ba tổ trồng được bao nhiêu cây'}];
const gThree=lv=>{const c=pick(B_CTX),[X,Y,Z]=c.who,a=lv===1?R(25,40):R(120,480),mm=lv===1?R(2,8):R(12,60),l=lv===1?R(1,mm+3):R(5,mm+30),b=a+mm,cc=b-l,T=a+b+cc;
  const lc=w=>w[0].toLowerCase()+w.slice(1),vr=w=>w.length<5?w:w.replace(/^(Lớp|Tổ|Thứ) /,'');
  const text=`${X} ${c.has} <b>${a} ${c.u}</b>. ${Y} nhiều hơn ${lc(X)} <b>${mm} ${c.u}</b>. ${Z} ít hơn ${lc(Y)} <b>${l} ${c.u}</b>. Hỏi ${c.q}?`;
  const sh=v=>Math.max(v,a*.18),fig=segSVG([{label:vr(X),parts:[{v:a}]},{label:vr(Y),parts:[{v:a},{v:sh(mm),on:true,t:`+${mm}`}]},{label:vr(Z),parts:[{v:b-sh(l)},{v:sh(l),cut:true,t:`−${l}`}]}],{labelW:70,brace:{from:0,to:2,t:'?'}});
  const sol=BG(`${Y} ${c.has}: ${a} + ${mm} = ${b} (${c.u})`,`${Z} ${c.has}: ${b} − ${l} = ${cc} (${c.u})`,`Cả ba: ${a} + ${b} + ${cc} = ${T} (${c.u})`,`Đáp số: <b>${T} ${c.u}</b>.`);
  const plan={tag:'Kế hoạch',ask:'Chọn thứ tự các bước giải:',opts:[`① Tìm ${lc(Y)} → ② Tìm ${lc(Z)} → ③ Cộng cả ba`,`① Tìm ${lc(Z)} → ② Tìm ${lc(Y)} → ③ Cộng cả ba`,`① Tính ${a} + ${mm} + ${l} → ② Nhân với 3`,`① Tìm ${lc(Y)} → ② Cộng cả ba → ③ Tìm ${lc(Z)}`],ans:`① Tìm ${lc(Y)} → ② Tìm ${lc(Z)} → ③ Cộng cả ba`,hint:`${Z} được so sánh với ${lc(Y)}, nên phải biết ${lc(Y)} trước.`};
  const sY={tag:'Giải',ask:`${Y} ${c.has}:`,tpl:lv===1?`${a} + ${mm} = [_] (${c.u})`:`[_] ${c.u}`,ans:[b],wide:b>9999,hint:`“Nhiều hơn” thì làm phép cộng: ${a} + ${mm}.`},
    sZ={tag:'Giải',ask:`${Z} ${c.has}:`,tpl:lv===1?`[_] − ${l} = [_] (${c.u})`:`[_] ${c.u}`,ans:lv===1?[b,cc]:[cc],hint:`“Ít hơn ${lc(Y)}” thì lấy số của ${lc(Y)} trừ đi ${l}.`},
    sT={tag:lv===3?'Đáp số':'Giải',ask:`Cả ba ${c.u==='học sinh'?'lớp':c.u==='cây'?'tổ':'ngày'}:`,tpl:`[_] ${c.u}`,ans:[T],wide:T>9999,hint:'Cộng ba số vừa có.'};
  if(lv===1)return QS({text,fig,hint:plan.hint,sol,steps:[{tag:'Hiểu đề',ask:'Đề bài đã cho biết số của ai?',opts:[X,Y,Z,'Cả ba'],ans:X,keepOrder:true,hint:`Tìm trong đề câu có số ${c.u} cụ thể, không có chữ “hơn”.`},plan,sY,sZ,sT]});
  return QS({direct:lv===3,text,fig,hint:plan.hint,sol,steps:lv===2?[plan,sY,sZ,sT]:[sY,sZ,sT]});
};

/* Tìm hai số khi biết tổng và hiệu */
const T_CTX=[{X:'Thùng thứ nhất',Y:'thùng thứ hai',all:'Hai thùng dầu có tất cả',u:'l',ask:'Hỏi mỗi thùng có bao nhiêu lít dầu?'},{X:'Lớp 4A',Y:'lớp 4B',all:'Hai lớp 4A và 4B trồng được tất cả',u:'cây',ask:'Hỏi mỗi lớp trồng được bao nhiêu cây?'},{X:'Đội Xanh',Y:'đội Đỏ',all:'Hai đội thu gom được tất cả',u:'kg',ask:'Hỏi mỗi đội thu gom được bao nhiêu ki-lô-gam giấy vụn?'}];
const gSumDiff=lv=>{const c=pick(T_CTX),s=lv===1?R(20,80):R(60,400),h=lv===1?R(4,30):lv===2?R(10,90):2*R(5,40),B=s+h,S=B+s,k=h/2,Yc=c.Y[0].toUpperCase()+c.Y.slice(1);
  const more=lv===1?`${c.X} nhiều hơn ${c.Y} <b>${h} ${c.u}</b>.`:lv===2?`${Yc} ít hơn ${c.X[0].toLowerCase()+c.X.slice(1)} <b>${h} ${c.u}</b>.`:`Nếu ${c.X[0].toLowerCase()+c.X.slice(1)} chuyển sang ${c.Y} <b>${k} ${c.u}</b> thì số ${c.u} của hai bên bằng nhau.`;
  const text=`${c.all} <b>${S} ${c.u}</b>${c.u==='kg'?' giấy vụn':''}. ${more} ${c.ask}`;
  const rt=Math.min(.8,Math.max(.25,h/s)),fig=segSVG([{label:c.X.replace(/^Thùng thứ /,'Thùng '),parts:[{v:1},{v:rt,on:true,t:lv===3?'Hiệu ?':'Hiệu'}],right:'?'},{label:Yc.replace(/^Thùng thứ /,'Thùng '),parts:[{v:1}],right:'?'}],{brace:{from:0,to:1,t:'Tổng'}});
  const sol=BG(`${c.X} có: (${S} + ${h}) : 2 = ${B} (${c.u})`,`${Yc} có: ${S} − ${B} = ${s} (${c.u})`,`Đáp số: ${c.X}: <b>${B} ${c.u}</b>; ${c.Y}: <b>${s} ${c.u}</b>.`);
  const hint='Số lớn = (Tổng + Hiệu) : 2; số bé = Tổng − số lớn.';
  if(lv===1)return QS({text,fig,hint,sol,steps:[
    {tag:'Hiểu đề',ask:'Bài toán hỏi gì?',opts:[`Số ${c.u} của mỗi bên`,`Tổng số ${c.u} của cả hai`,`${c.X} nhiều hơn bao nhiêu`,`Chỉ số ${c.u} của ${c.Y}`],ans:`Số ${c.u} của mỗi bên`,hint:'Đọc câu hỏi: “Hỏi mỗi … ”.'},
    {tag:'Tóm tắt',ask:'Điền vào tóm tắt theo sơ đồ:',tpl:`Tổng: [_] ${c.u} &nbsp; Hiệu: [_] ${c.u}`,ans:[S,h],hint:'Cụm “có tất cả” cho biết tổng; cụm “nhiều hơn” cho biết hiệu.'},
    {tag:'Kế hoạch',ask:`${c.X} là số lớn. Muốn tìm số lớn, con làm thế nào?`,opts:['(Tổng + Hiệu) : 2','(Tổng − Hiệu) : 2','Tổng − Hiệu','Tổng : 2'],ans:'(Tổng + Hiệu) : 2',hint:'Nhìn sơ đồ: thêm phần hiệu vào số bé thì được hai lần số lớn.'},
    {tag:'Giải',ask:`${c.X} có:`,tpl:`(${S} + ${h}) : 2 = [_] (${c.u})`,ans:[B],hint:`Tính ${S} + ${h} trước rồi chia 2.`},
    {tag:'Giải',ask:`${Yc} có:`,tpl:`${S} − ${B} = [_] (${c.u})`,ans:[s],hint:'Lấy tổng trừ số lớn vừa tìm.'},
    {tag:'Thử lại',ask:'Kiểm tra hiệu:',tpl:`${B} − ${s} = [_]`,ans:[h],hint:`Kết quả phải bằng hiệu ${h}.`}]});
  if(lv===2)return QS({text,fig,hint,sol:BG(`${Yc} có: (${S} − ${h}) : 2 = ${s} (${c.u})`,`${c.X} có: ${s} + ${h} = ${B} (${c.u})`,`Đáp số: ${c.X}: <b>${B} ${c.u}</b>; ${c.Y}: <b>${s} ${c.u}</b>.`),steps:[
    {tag:'Hiểu đề',ask:`Câu “${Yc} ít hơn … ${h} ${c.u}” cho biết:`,opts:[`${c.X} là số lớn, hiệu là ${h}`,`${Yc} là số lớn, hiệu là ${h}`,`Tổng là ${h}`,`${Yc} có ${h} ${c.u}`],ans:`${c.X} là số lớn, hiệu là ${h}`,hint:`${Yc} ít hơn thì ${c.X[0].toLowerCase()+c.X.slice(1)} nhiều hơn.`},
    {tag:'Kế hoạch',ask:`Tìm ${c.Y} (số bé) trước. Con tính:`,opts:['(Tổng − Hiệu) : 2','(Tổng + Hiệu) : 2','Tổng − Hiệu','(Tổng − Hiệu) × 2'],ans:'(Tổng − Hiệu) : 2',hint:'Bớt phần hiệu ở số lớn thì còn hai lần số bé.'},
    {tag:'Giải',ask:`${Yc} có:`,tpl:`([_] − [_]) : 2 = [_] (${c.u})`,ans:[S,h,s],hint:`Điền tổng ${S}, hiệu ${h} rồi tính.`},
    {tag:'Giải',ask:`${c.X} có:`,tpl:`[_] ${c.u}`,ans:[B],hint:'Lấy số bé cộng hiệu.'},
    {tag:'Thử lại',ask:'Kiểm tra tổng:',tpl:`${B} + ${s} = [_]`,ans:[S],hint:`Kết quả phải bằng tổng ${S}.`}]});
  return QS({direct:true,text,fig,hint:`Chuyển ${k} ${c.u} thì bằng nhau, nghĩa là hiệu bằng ${k} × 2.`,sol:BG(`Hiệu: ${k} × 2 = ${h} (${c.u})`,`${c.X} có: (${S} + ${h}) : 2 = ${B} (${c.u})`,`${Yc} có: ${S} − ${B} = ${s} (${c.u})`,`Đáp số: ${c.X}: <b>${B} ${c.u}</b>; ${c.Y}: <b>${s} ${c.u}</b>.`),steps:[
    {tag:'Hiểu đề',ask:`Chuyển ${k} ${c.u} thì hai bên bằng nhau. Vậy lúc đầu ${c.X[0].toLowerCase()+c.X.slice(1)} nhiều hơn ${c.Y}:`,tpl:`[_] ${c.u}`,ans:[h],hint:`Bên này bớt ${k}, bên kia thêm ${k} mới bằng nhau, nên hai bên chênh nhau ${k} + ${k}.`},
    {tag:'Kế hoạch',ask:'Bây giờ bài toán thuộc dạng nào?',opts:['Tìm hai số khi biết tổng và hiệu','Tìm số trung bình cộng','Rút về đơn vị','Tìm phân số của một số'],ans:'Tìm hai số khi biết tổng và hiệu',hint:'Đã biết tổng và vừa tìm được hiệu.'},
    {tag:'Giải',ask:`${c.X} có:`,tpl:`[_] ${c.u}`,ans:[B],hint:'(Tổng + Hiệu) : 2.'},
    {tag:'Đáp số',ask:'Mỗi bên có:',tpl:`${c.X}: [_] ${c.u} &nbsp; ${Yc}: [_] ${c.u}`,ans:[B,s],hint:'Số bé = Tổng − số lớn.'}]});
};

/* Hình chữ nhật: nửa chu vi (tổng) và hiệu → diện tích */
const gRectSD=lv=>{const w=lv===1?R(6,20):R(12,40),h=lv===1?R(2,12):R(4,30),L=w+h,S=L+w,P=S*2,A=L*w;
  const text=lv===1?`Một mảnh vườn hình chữ nhật có <b>nửa chu vi là ${S} m</b>, chiều dài hơn chiều rộng <b>${h} m</b>. Tính diện tích mảnh vườn.`:`Một mảnh vườn hình chữ nhật có <b>chu vi ${P} m</b>, chiều dài hơn chiều rộng <b>${h} m</b>. Tính diện tích mảnh vườn.`;
  const fig=segSVG([{label:'Dài',parts:[{v:1},{v:Math.min(.8,Math.max(.25,h/w)),on:true,t:`${h} m`}],right:'?'},{label:'Rộng',parts:[{v:1}],right:'?'}],{labelW:66,brace:{from:0,to:1,t:lv===1?`${S} m`:'Nửa chu vi'}});
  const sol=BG(...(lv===1?[]:[`Nửa chu vi: ${P} : 2 = ${S} (m)`]),`Chiều dài: (${S} + ${h}) : 2 = ${L} (m)`,`Chiều rộng: ${L} − ${h} = ${w} (m)`,`Diện tích: ${L} × ${w} = ${fmt(A)} (m²)`,`Đáp số: <b>${fmt(A)} m²</b>.`);
  const hint='Nửa chu vi = chiều dài + chiều rộng (tổng); chiều dài hơn chiều rộng (hiệu).';
  const sHalf={tag:'Giải',ask:'Nửa chu vi mảnh vườn là:',tpl:`${P} : 2 = [_] (m)`,ans:[S],hint:'Chia chu vi cho 2.'},
    sL={tag:'Giải',ask:'Chiều dài là:',tpl:lv===1?`(${S} + ${h}) : 2 = [_] (m)`:'[_] m',ans:[L],hint:'Chiều dài là số lớn: (Tổng + Hiệu) : 2.'},
    sW={tag:'Giải',ask:'Chiều rộng là:',tpl:lv===1?`${L} − ${h} = [_] (m)`:'[_] m',ans:[w],hint:'Lấy chiều dài trừ đi hiệu.'},
    sA={tag:lv===3?'Đáp số':'Giải',ask:'Diện tích mảnh vườn là:',tpl:lv===1?`${L} × ${w} = [_] (m²)`:'[_] m²',ans:[A],wide:true,hint:'Diện tích hình chữ nhật = chiều dài × chiều rộng.'};
  const plan={tag:'Kế hoạch',ask:'Chọn thứ tự giải:',opts:['① Tìm chiều dài, chiều rộng (tổng – hiệu) → ② Tính diện tích','① Tính diện tích → ② Tìm chiều dài, chiều rộng',`① Lấy nửa chu vi nhân ${h} → ② Chia 2`,`① Chiều dài = nửa chu vi − ${h} → ② Tính diện tích`],ans:'① Tìm chiều dài, chiều rộng (tổng – hiệu) → ② Tính diện tích',hint:'Muốn tính diện tích phải biết chiều dài và chiều rộng.'};
  if(lv===1)return QS({text,fig,hint,sol,steps:[{tag:'Hiểu đề',ask:'Nửa chu vi hình chữ nhật chính là:',opts:['Chiều dài + chiều rộng','Chiều dài − chiều rộng','Chiều dài × chiều rộng','Chiều dài × 2'],ans:'Chiều dài + chiều rộng',hint:'Chu vi = (dài + rộng) × 2.'},plan,sL,sW,sA]});
  return QS({direct:lv===3,text,fig,hint,sol,steps:lv===2?[sHalf,plan,sL,sW,sA]:[sHalf,sL,sW,sA]});
};

lesson(1,'giai-toan-tung-buoc','🧠 Giải toán từng bước: rút về đơn vị, ba bước tính','Rèn cách giải: hiểu đề, tóm tắt bằng sơ đồ, lập kế hoạch, giải và thử lại.',[gUnit,gThree,gUnit]);
lesson(5,'tong-hieu-tung-buoc','🧠 Giải toán từng bước: tổng và hiệu','Bài toán tổng – hiệu nhiều bước: sơ đồ đoạn thẳng, “ít hơn”, chuyển bớt, hình chữ nhật.',[gSumDiff,gRectSD,gSumDiff]);

/* =====================================================================
   ✍️ GIẢI TOÁN QUA 3 BƯỚC – luyện thêm cho từng chủ đề học kì 1
   Bước 1 Hiểu đề (bài toán hỏi gì?) → Bước 2 Lập kế hoạch (chọn cách giải) → Bước 3 Giải và trình bày (phép tính, đáp số).
   Mức 1: bước 3 có sẵn phép tính, chỉ điền kết quả. Mức 2: bước 3 chỉ cho tên từng kết quả, con tự nghĩ phép tính.
   Mức 3: chỉ có đề và ô đáp số; bấm “Làm theo từng bước” nếu cần (tối đa ½ điểm).
   ===================================================================== */
const h3 = (lv, o) => {
  const s1 = {tag:'Hiểu đề', ask:'Bài toán hỏi gì?', opts:[o.what, ...o.whatWrong], ans:o.what, hint:'Đọc câu cuối của đề – câu bắt đầu bằng chữ “Hỏi”.'};
  const s2 = {tag:'Kế hoạch', ask:o.planAsk || 'Chọn cách giải đúng:', opts:[o.plan, ...o.planWrong], ans:o.plan, hint:o.planHint};
  const fin = {tag:'Đáp số', ask:'Đáp số của bài toán là:', tpl:o.finTpl, ans:[o.fin], wide:o.fin > 9999, hint:o.finHint || 'Làm lần lượt từng phép tính ở kế hoạch, kết quả cuối cùng là đáp số.'};
  const s3 = {tag:'Giải', ask:'Trình bày bài giải:', tpl:lv === 1 ? o.chain1 : o.chain2, ans:o.chainAns, wide:true, hint:o.chainHint || 'Làm đúng theo kế hoạch đã chọn, từng phép tính một.'};
  return QS({direct:lv === 3, text:o.text, hint:o.planHint, sol:o.sol, steps:[s1, s2, lv === 3 ? fin : s3]});
};
const cap = s => s[0].toUpperCase() + s.slice(1);

/* ---- Chủ đề 1: Ôn tập và bổ sung ---- */
const gOnMua = lv => {   // mua hai loại hàng, tính tiền trả lại
  const it = pick([['quyển vở','cái bút'],['hộp bút màu','quyển truyện'],['cái thước','cục tẩy']]), a = R(3, lv === 1 ? 6 : 7), b = R(2, lv === 1 ? 5 : 6),
    p1 = pick(lv === 1 ? [2500, 3000, 4000, 5000] : [4500, 6500, 7500, 9500]), p2 = pick(lv === 1 ? [1500, 2000, 3000] : [2500, 3500, 4500]), v1 = a * p1, v2 = b * p2, tot = v1 + v2,
    pay = pick([50000, 100000].filter(x => x > tot)) || 100000, ch = pay - tot;
  return h3(lv, {text:`Mẹ mua <b>${a} ${it[0]}</b>, mỗi ${it[0]} giá <b>${fmt(p1)} đồng</b>, và <b>${b} ${it[1]}</b>, mỗi ${it[1]} giá <b>${fmt(p2)} đồng</b>. Mẹ đưa cho cô bán hàng <b>${fmt(pay)} đồng</b>. Hỏi cô bán hàng trả lại mẹ bao nhiêu tiền?`,
    what:'Số tiền cô bán hàng trả lại mẹ', whatWrong:[`Số tiền mẹ mua ${it[0]}`, 'Tổng số tiền mẹ phải trả', `Tổng số ${it[0]} và ${it[1]} mẹ mua`],
    plan:`Tính tiền ${it[0]}, tiền ${it[1]}, cộng lại được tổng tiền, rồi lấy ${fmt(pay)} trừ đi tổng tiền`,
    planWrong:[`Cộng ${a} + ${b} rồi nhân với ${fmt(p1)}`, `Lấy ${fmt(pay)} trừ ${fmt(p1)}, rồi trừ ${fmt(p2)}`, `Tính tiền ${it[0]} và tiền ${it[1]}, rồi lấy tổng cộng với ${fmt(pay)}`],
    planHint:'Muốn biết tiền trả lại phải biết mẹ đã tiêu bao nhiêu: mỗi loại hàng = số lượng × giá.',
    chain1:`Tiền ${it[0]}: ${a} × ${fmt(p1)} = [_] (đồng)<br>Tiền ${it[1]}: ${b} × ${fmt(p2)} = [_] (đồng)<br>Tổng tiền: ${fmt(v1)} + ${fmt(v2)} = [_] (đồng)<br>Tiền trả lại: ${fmt(pay)} − ${fmt(tot)} = [_] (đồng)`, chain2:`Tiền ${it[0]}: [_] đồng<br>Tiền ${it[1]}: [_] đồng<br>Tổng tiền: [_] đồng<br>Tiền trả lại: [_] đồng`, chainAns:[v1, v2, tot, ch],
    finTpl:'[_] đồng', fin:ch, sol:BG(`Tiền mua ${it[0]}: ${a} × ${fmt(p1)} = ${fmt(v1)} (đồng)`, `Tiền mua ${it[1]}: ${b} × ${fmt(p2)} = ${fmt(v2)} (đồng)`, `Tổng số tiền mẹ phải trả: ${fmt(v1)} + ${fmt(v2)} = ${fmt(tot)} (đồng)`, `Cô bán hàng trả lại: ${fmt(pay)} − ${fmt(tot)} = ${fmt(ch)} (đồng)`, `Đáp số: <b>${fmt(ch)} đồng</b>.`)});
};
const gOnKho = lv => {   // kho gạo: xuất nhiều hơn
  const x = pick([['gạo','kg'],['xi măng','kg'],['than','kg']]), a = R(lv === 1 ? 800 : 1500, lv === 1 ? 2500 : 9000), d = R(lv === 1 ? 100 : 300, lv === 1 ? 900 : 2500), b = a + d, tot = a + b, N = tot + R(lv === 1 ? 500 : 2000, lv === 1 ? 4000 : 20000), left = N - tot;
  return h3(lv, {text:`Kho có <b>${fmt(N)} ${x[1]} ${x[0]}</b>. Ngày đầu kho xuất <b>${fmt(a)} ${x[1]}</b>. Ngày thứ hai xuất nhiều hơn ngày đầu <b>${fmt(d)} ${x[1]}</b>. Hỏi trong kho còn lại bao nhiêu ${x[1]} ${x[0]}?`,
    what:`Số ${x[1]} ${x[0]} còn lại trong kho`, whatWrong:['Số ngày kho xuất hàng', `Số ${x[1]} ${x[0]} xuất ngày thứ hai`, `Số ${x[1]} ${x[0]} xuất trong cả hai ngày`],
    plan:`Tìm số xuất ngày thứ hai, cộng số xuất hai ngày, rồi lấy ${fmt(N)} trừ đi`, planWrong:[`Lấy ${fmt(N)} trừ ${fmt(a)} rồi trừ ${fmt(d)}`, `Lấy ${fmt(a)} cộng ${fmt(d)} rồi cộng ${fmt(N)}`, `Lấy ${fmt(N)} trừ số xuất ngày thứ hai`],
    planHint:'“Nhiều hơn” thì cộng: ngày thứ hai xuất bao nhiêu? Muốn biết còn lại phải biết đã xuất cả hai ngày.',
    chain1:`Ngày thứ hai xuất: ${fmt(a)} + ${fmt(d)} = [_] (${x[1]})<br>Cả hai ngày xuất: ${fmt(a)} + ${fmt(b)} = [_] (${x[1]})<br>Còn lại: ${fmt(N)} − ${fmt(tot)} = [_] (${x[1]})`, chain2:`Ngày thứ hai xuất: [_] ${x[1]}<br>Cả hai ngày xuất: [_] ${x[1]}<br>Còn lại: [_] ${x[1]}`, chainAns:[b, tot, left],
    finTpl:`[_] ${x[1]}`, fin:left, sol:BG(`Ngày thứ hai xuất: ${fmt(a)} + ${fmt(d)} = ${fmt(b)} (${x[1]})`, `Cả hai ngày xuất: ${fmt(a)} + ${fmt(b)} = ${fmt(tot)} (${x[1]})`, `Trong kho còn lại: ${fmt(N)} − ${fmt(tot)} = ${fmt(left)} (${x[1]})`, `Đáp số: <b>${fmt(left)} ${x[1]}</b>.`)});
};
const gOnChuVi = lv => {   // chu vi hình chữ nhật, chiều dài hơn chiều rộng
  const w = R(lv === 1 ? 8 : 20, lv === 1 ? 30 : 90), d = R(lv === 1 ? 3 : 8, lv === 1 ? 15 : 40), L = w + d, hn = L + w, P = hn * 2;
  return h3(lv, {text:`Một mảnh vườn hình chữ nhật có chiều rộng <b>${w} m</b>, chiều dài hơn chiều rộng <b>${d} m</b>. Hỏi chu vi mảnh vườn là bao nhiêu mét?`,
    what:'Chu vi mảnh vườn hình chữ nhật', whatWrong:['Chiều dài mảnh vườn', 'Diện tích mảnh vườn', 'Nửa chu vi mảnh vườn'],
    plan:'Tìm chiều dài, tìm nửa chu vi (dài + rộng), rồi nhân với 2', planWrong:[`Lấy ${w} nhân ${d} rồi nhân 2`, `Lấy chiều dài nhân chiều rộng`, `Lấy ${w} cộng ${d} rồi nhân 2`],
    planHint:'Chu vi hình chữ nhật = (chiều dài + chiều rộng) × 2, nên phải biết chiều dài trước.',
    chain1:`Chiều dài: ${w} + ${d} = [_] (m)<br>Nửa chu vi: ${L} + ${w} = [_] (m)<br>Chu vi: ${hn} × 2 = [_] (m)`, chain2:`Chiều dài: [_] m<br>Nửa chu vi: [_] m<br>Chu vi: [_] m`, chainAns:[L, hn, P],
    finTpl:'[_] m', fin:P, sol:BG(`Chiều dài mảnh vườn: ${w} + ${d} = ${L} (m)`, `Nửa chu vi: ${L} + ${w} = ${hn} (m)`, `Chu vi mảnh vườn: ${hn} × 2 = ${P} (m)`, `Đáp số: <b>${P} m</b>.`)});
};
/* ---- Chủ đề 2: Góc và đơn vị đo góc ---- */
const gGocKe = lv => {   // hai góc kề nhau
  const x = R(2, lv === 1 ? 8 : 12) * 5, y = R(2, lv === 1 ? 8 : 12) * 5, z = x + y;
  return h3(lv, {text:`Cho góc đỉnh <b>O</b>; tia <b>OB</b> nằm giữa hai tia <b>OA</b> và <b>OC</b>. Biết góc <b>AOB</b> có số đo <b>${x}°</b> và góc <b>BOC</b> có số đo <b>${y}°</b>. Hỏi góc <b>AOC</b> có số đo bao nhiêu độ?`,
    what:'Số đo của góc AOC', whatWrong:['Số đo của góc AOB', 'Số đo của góc BOC', 'Hiệu số đo của góc AOB và góc BOC'],
    plan:'Góc AOC gồm góc AOB và góc BOC ghép lại nên lấy số đo hai góc cộng với nhau', planWrong:[`Lấy ${Math.max(x, y)}° trừ ${Math.min(x, y)}°`, `Lấy ${x}° nhân ${y}°`, `Lấy 180° trừ ${x}°`],
    planHint:'Tia OB nằm giữa OA và OC: góc lớn bằng hai góc nhỏ ghép lại.',
    chain1:`Số đo góc AOC: ${x}° + ${y}° = [_]°`, chain2:`Số đo góc AOC: [_]°`, chainAns:[z], finTpl:'[_]°', fin:z,
    sol:BG(`Tia OB nằm giữa hai tia OA, OC nên:`, `Góc AOC = góc AOB + góc BOC`, `${x}° + ${y}° = ${z}°`, `Đáp số: <b>${z}°</b>.`)});
};
const gGocBet = lv => {   // góc bẹt và hai góc kề bù
  const x = R(3, lv === 1 ? 12 : 16) * 5, y = R(2, 4) * 5, z = 180 - x - y;
  return h3(lv, {text:`Góc bẹt <b>AOD</b> được chia bởi hai tia <b>OB</b>, <b>OC</b> thành ba góc: <b>AOB</b>, <b>BOC</b>, <b>COD</b>. Biết góc <b>AOB</b> là <b>${x}°</b>, góc <b>BOC</b> là <b>${y}°</b>. Hỏi góc <b>COD</b> có số đo bao nhiêu độ?`,
    what:'Số đo của góc COD', whatWrong:['Số đo của góc AOD', 'Tổng số đo của góc AOB và góc BOC', 'Số đo của góc AOC'],
    plan:'Góc bẹt là 180°, nên lấy 180° trừ đi số đo góc AOB, rồi trừ tiếp số đo góc BOC', planWrong:[`Lấy ${x}° cộng ${y}° rồi cộng 180°`, `Lấy ${x}° cộng ${y}°`, `Lấy ${x}° trừ ${y}° rồi trừ 180°`],
    planHint:'Góc bẹt có số đo bằng bao nhiêu độ? Ba góc ghép lại thành góc bẹt.',
    chain1:`Số đo góc AOC: ${x}° + ${y}° = [_]°<br>Số đo góc COD: 180° − ${x + y}° = [_]°`, chain2:`Số đo góc AOC: [_]°<br>Số đo góc COD: [_]°`, chainAns:[x + y, z], finTpl:'[_]°', fin:z,
    sol:BG(`Góc AOC = góc AOB + góc BOC = ${x}° + ${y}° = ${x + y}°`, `Góc AOD là góc bẹt = 180° nên góc COD = 180° − ${x + y}° = ${z}°`, `Đáp số: <b>${z}°</b>.`)});
};
const gGocKim = lv => {   // kim giờ quay
  const h1 = R(1, lv === 1 ? 4 : 5), h2 = h1 + R(2, lv === 1 ? 4 : 6), n = h2 - h1, deg = n * 30, loai = deg < 90 ? 'góc nhọn' : deg === 90 ? 'góc vuông' : deg < 180 ? 'góc tù' : 'góc bẹt';
  return h3(lv, {text:`Trên mặt đồng hồ, cứ sau <b>1 giờ</b> thì kim giờ quay được một góc <b>30°</b>. Hỏi từ <b>${h1} giờ</b> đến <b>${h2} giờ</b>, kim giờ quay được một góc bao nhiêu độ?`,
    what:'Số đo góc mà kim giờ quay được', whatWrong:['Số giờ kim giờ đi được', 'Số đo góc mà kim phút quay được', `Số đo góc lúc ${h2} giờ`],
    plan:`Tìm số giờ đã trôi qua (${h2} − ${h1}), rồi nhân với 30°`, planWrong:[`Lấy ${h2} cộng ${h1}, rồi nhân 30°`, `Lấy ${h2} nhân ${h1}`, `Lấy 30° chia cho ${n}`],
    planHint:'Mỗi giờ kim giờ quay 30°. Từ lúc đầu đến lúc sau đã trôi qua mấy giờ?',
    chain1:`Số giờ đã trôi qua: ${h2} − ${h1} = [_] (giờ)<br>Số đo góc kim giờ quay: ${n} × 30° = [_]°`, chain2:`Số giờ đã trôi qua: [_] giờ<br>Số đo góc kim giờ quay: [_]°`, chainAns:[n, deg], finTpl:'[_]°', fin:deg,
    sol:BG(`Từ ${h1} giờ đến ${h2} giờ có: ${h2} − ${h1} = ${n} (giờ)`, `Kim giờ quay được: ${n} × 30° = ${deg}° (${loai})`, `Đáp số: <b>${deg}°</b>.`)});
};
/* ---- Chủ đề 3: Số có nhiều chữ số ---- */
const gSoDan = lv => {   // hai huyện, tổng dân số
  const A = R(lv === 1 ? 120 : 250, lv === 1 ? 300 : 650) * 1000 + R(0, 999), d = R(lv === 1 ? 12 : 25, lv === 1 ? 60 : 99) * 100 + R(0, 99), B = A - d, S = A + B;
  return h3(lv, {text:`Huyện An có <b>${fmt(A)}</b> người. Huyện Bình có ít hơn huyện An <b>${fmt(d)}</b> người. Hỏi cả hai huyện có bao nhiêu người?`,
    what:'Tổng số người của hai huyện', whatWrong:['Số người của huyện Bình', 'Số người huyện An nhiều hơn huyện Bình', 'Số người của huyện An'],
    plan:'Tìm số người huyện Bình (số người huyện An trừ đi phần ít hơn), rồi cộng với số người huyện An', planWrong:[`Lấy ${fmt(A)} cộng ${fmt(d)}`, `Lấy ${fmt(A)} trừ ${fmt(d)}`, 'Tìm số người huyện Bình (cộng thêm phần ít hơn), rồi cộng hai huyện'],
    planHint:'“Ít hơn” thì làm phép trừ. Muốn biết cả hai huyện phải biết huyện Bình có bao nhiêu người.',
    chain1:`Huyện Bình có: ${fmt(A)} − ${fmt(d)} = [_] (người)<br>Cả hai huyện: ${fmt(A)} + ${fmt(B)} = [_] (người)`, chain2:`Huyện Bình có: [_] người<br>Cả hai huyện: [_] người`, chainAns:[B, S], finTpl:'[_] người', fin:S,
    sol:BG(`Huyện Bình có: ${fmt(A)} − ${fmt(d)} = ${fmt(B)} (người)`, `Cả hai huyện có: ${fmt(A)} + ${fmt(B)} = ${fmt(S)} (người)`, `Đáp số: <b>${fmt(S)} người</b>.`)});
};
const gSoTron = lv => {   // làm tròn, chênh lệch
  const unit = lv === 1 ? 1000 : pick([1000, 10000]), N = R(12, 98) * 1000 + R(1, 9) * (unit === 1000 ? 100 : 1000) + R(0, 5) * 10 + R(1, 9), r = Math.round(N / unit) * unit, d = Math.abs(r - N), un = unit === 1000 ? 'nghìn' : 'chục nghìn', more = r > N;
  return h3(lv, {text:`Sân vận động có <b>${fmt(N)}</b> chỗ ngồi. Người ta làm tròn số chỗ ngồi đến hàng <b>${un}</b> để ghi lên bảng thông báo. Hỏi số ghi trên bảng ${more ? 'nhiều' : 'ít'} hơn số chỗ ngồi thật bao nhiêu chỗ?`,
    what:`Số chỗ ngồi ghi trên bảng ${more ? 'nhiều' : 'ít'} hơn số chỗ thật là bao nhiêu`, whatWrong:['Số chỗ ngồi của sân vận động', 'Số chỗ ngồi sau khi làm tròn', `Số chỗ ngồi làm tròn đến hàng ${unit === 1000 ? 'chục nghìn' : 'nghìn'}`],
    plan:`Làm tròn ${fmt(N)} đến hàng ${un}, rồi lấy số ${more ? 'đã làm tròn trừ số thật' : 'thật trừ số đã làm tròn'}`, planWrong:[`Làm tròn rồi lấy số ${more ? 'thật trừ số làm tròn' : 'làm tròn trừ số thật'}`, 'Làm tròn rồi cộng số đã làm tròn với số thật', `Lấy ${fmt(N)} trừ đi ${fmt(unit)}`],
    planHint:'Hàng liền sau hàng làm tròn là 5, 6, 7, 8, 9 thì làm tròn lên; là 0, 1, 2, 3, 4 thì làm tròn xuống. Chênh lệch = số lớn trừ số bé.',
    chain1:`Số làm tròn đến hàng ${un}: [_]<br>Chênh lệch: ${more ? `${fmt(r)} − ${fmt(N)}` : `${fmt(N)} − ${fmt(r)}`} = [_] (chỗ)`, chain2:`Số làm tròn đến hàng ${un}: [_]<br>Chênh lệch: [_] chỗ`, chainAns:[r, d], finTpl:'[_] chỗ', fin:d,
    sol:BG(`Làm tròn ${fmt(N)} đến hàng ${un} được ${fmt(r)}`, `${more ? `${fmt(r)} − ${fmt(N)}` : `${fmt(N)} − ${fmt(r)}`} = ${fmt(d)} (chỗ)`, `Đáp số: <b>${fmt(d)} chỗ</b>.`)});
};
const gSoLonBe = lv => {   // số lớn nhất, bé nhất có k chữ số
  const k = lv === 1 ? 4 : lv === 2 ? 5 : 6, mx = 10 ** k - 1, mn = 10 ** (k - 1), d = mx - mn;
  return h3(lv, {text:`Số lớn nhất có <b>${k} chữ số</b> hơn số bé nhất có <b>${k} chữ số</b> bao nhiêu đơn vị?`,
    what:`Hiệu của số lớn nhất và số bé nhất có ${k} chữ số`, whatWrong:[`Số lớn nhất có ${k} chữ số`, `Số bé nhất có ${k} chữ số`, `Tổng của số lớn nhất và số bé nhất có ${k} chữ số`],
    plan:`Viết số lớn nhất (${k} chữ số 9), số bé nhất (chữ số 1 và ${k - 1} chữ số 0), rồi lấy số lớn trừ số bé`, planWrong:[`Viết số lớn nhất và số bé nhất (${k} chữ số 0), rồi lấy số lớn trừ số bé`, 'Viết hai số rồi cộng lại', `Lấy ${k} trừ 1`],
    planHint:'Số bé nhất có nhiều chữ số bắt đầu bằng chữ số 1, các chữ số sau đều là 0 (chữ số hàng cao nhất không thể là 0).',
    chain1:`Số lớn nhất có ${k} chữ số: [_]<br>Số bé nhất có ${k} chữ số: [_]<br>Hiệu: ${fmt(mx)} − ${fmt(mn)} = [_]`, chain2:`Số lớn nhất có ${k} chữ số: [_]<br>Số bé nhất có ${k} chữ số: [_]<br>Hiệu hai số: [_]`, chainAns:[mx, mn, d], finTpl:'[_]', fin:d,
    sol:BG(`Số lớn nhất có ${k} chữ số: ${fmt(mx)}`, `Số bé nhất có ${k} chữ số: ${fmt(mn)}`, `${fmt(mx)} − ${fmt(mn)} = ${fmt(d)}`, `Đáp số: <b>${fmt(d)}</b>.`)});
};
/* ---- Chủ đề 4: Một số đơn vị đo đại lượng ---- */
const gDvKl = lv => {   // tấn, tạ, kg
  const a = R(1, lv === 1 ? 4 : 8), b = R(2, 9), c = R(lv === 1 ? 2 : 3, 9) * 10, tot = a * 1000 + b * 100 + c;
  return h3(lv, {text:`Một xe tải chở <b>${a} tấn</b> gạo và <b>${b} tạ</b> ngô, ngoài ra còn chở thêm <b>${c} kg</b> muối. Hỏi xe tải chở tất cả bao nhiêu ki-lô-gam hàng?`,
    what:'Tổng số ki-lô-gam hàng xe chở', whatWrong:['Số tấn gạo xe chở', 'Số tạ ngô xe chở', 'Số ki-lô-gam muối xe chở'],
    plan:'Đổi tấn, tạ ra ki-lô-gam (1 tấn = 1 000 kg, 1 tạ = 100 kg) rồi cộng các số ki-lô-gam lại', planWrong:[`Cộng ${a} + ${b} + ${c} luôn`, `Đổi 1 tấn = 100 kg, 1 tạ = 10 kg rồi cộng`, `Đổi ra kg rồi nhân các số với nhau`],
    planHint:'Các số đo phải cùng đơn vị mới cộng được. 1 tấn = 10 tạ = 1 000 kg; 1 tạ = 100 kg.',
    chain1:`${a} tấn = [_] kg<br>${b} tạ = [_] kg<br>Tất cả: ${fmt(a * 1000)} + ${fmt(b * 100)} + ${c} = [_] (kg)`, chain2:`${a} tấn = [_] kg<br>${b} tạ = [_] kg<br>Tất cả: [_] kg`, chainAns:[a * 1000, b * 100, tot], finTpl:'[_] kg', fin:tot,
    sol:BG(`${a} tấn = ${fmt(a * 1000)} kg; ${b} tạ = ${fmt(b * 100)} kg`, `Xe chở tất cả: ${fmt(a * 1000)} + ${fmt(b * 100)} + ${c} = ${fmt(tot)} (kg)`, `Đáp số: <b>${fmt(tot)} kg</b>.`)});
};
const gDvDt = lv => {   // dm², cắt hình vuông
  const z = R(2, lv === 1 ? 5 : 8), x = R(z + 3, z + (lv === 1 ? 8 : 14)), y = R(z + 2, z + (lv === 1 ? 6 : 10)), S = x * y, s = z * z, r = S - s;
  return h3(lv, {text:`Một tấm bìa hình chữ nhật dài <b>${x} dm</b>, rộng <b>${y} dm</b>. Bạn An cắt đi một miếng hình vuông có cạnh <b>${z} dm</b>. Hỏi phần bìa còn lại có diện tích bao nhiêu đề-xi-mét vuông?`,
    what:'Diện tích phần bìa còn lại', whatWrong:['Diện tích miếng bìa hình vuông bị cắt', 'Diện tích cả tấm bìa lúc đầu', 'Chu vi phần bìa còn lại'],
    plan:'Tính diện tích tấm bìa, tính diện tích hình vuông bị cắt, rồi lấy diện tích tấm bìa trừ diện tích hình vuông', planWrong:['Tính diện tích tấm bìa rồi cộng với diện tích hình vuông', `Lấy ${x} cộng ${y}, rồi trừ ${z}`, `Tính chu vi tấm bìa rồi trừ chu vi hình vuông`],
    planHint:'Diện tích hình chữ nhật = dài × rộng; hình vuông = cạnh × cạnh. Phần còn lại = phần đầu trừ phần bị cắt.',
    chain1:`Diện tích tấm bìa: ${x} × ${y} = [_] (dm²)<br>Diện tích hình vuông: ${z} × ${z} = [_] (dm²)<br>Phần còn lại: ${S} − ${s} = [_] (dm²)`, chain2:`Diện tích tấm bìa: [_] dm²<br>Diện tích hình vuông: [_] dm²<br>Phần còn lại: [_] dm²`, chainAns:[S, s, r], finTpl:'[_] dm²', fin:r,
    sol:BG(`Diện tích tấm bìa: ${x} × ${y} = ${S} (dm²)`, `Diện tích hình vuông bị cắt: ${z} × ${z} = ${s} (dm²)`, `Diện tích phần còn lại: ${S} − ${s} = ${r} (dm²)`, `Đáp số: <b>${r} dm²</b>.`)});
};
const gDvTg = lv => {   // phút, giây
  const m = R(2, lv === 1 ? 4 : 6), p = R(1, lv === 1 ? 2 : 3), q = R(5, 55), per = p * 60 + q, tot = m * per;
  return h3(lv, {text:`Bạn Nam chạy <b>${m} vòng</b> sân trường, mỗi vòng chạy hết <b>${p} phút ${q} giây</b>. Hỏi bạn Nam chạy hết bao nhiêu giây?`,
    what:'Tổng số giây bạn Nam chạy', whatWrong:['Số giây của một vòng chạy', 'Số phút bạn Nam chạy', 'Số vòng bạn Nam chạy'],
    plan:'Đổi thời gian một vòng ra giây (1 phút = 60 giây), rồi nhân với số vòng', planWrong:[`Cộng ${p} + ${q}, rồi nhân với ${m}`, `Đổi 1 phút = 100 giây, rồi nhân với ${m}`, `Lấy ${m} cộng với số giây của một vòng`],
    planHint:'1 phút = 60 giây. Trước hết đổi thời gian một vòng chạy ra cùng một đơn vị (giây).',
    chain1:`Một vòng: ${p} × 60 + ${q} = [_] (giây)<br>${m} vòng: ${per} × ${m} = [_] (giây)`, chain2:`Một vòng chạy hết: [_] giây<br>${m} vòng chạy hết: [_] giây`, chainAns:[per, tot], finTpl:'[_] giây', fin:tot,
    sol:BG(`Một vòng chạy hết: ${p} × 60 + ${q} = ${per} (giây)`, `${m} vòng chạy hết: ${per} × ${m} = ${tot} (giây)`, `Đáp số: <b>${tot} giây</b>.`)});
};
/* ---- Chủ đề 5: Phép cộng và phép trừ ---- */
const gCtNhapXuat = lv => {   // nhập – bán
  const x = pick([['xe đạp','chiếc'],['sách','quyển'],['sữa','thùng']]), N = R(lv === 1 ? 1200 : 4000, lv === 1 ? 4000 : 30000), a = R(lv === 1 ? 300 : 900, lv === 1 ? 1500 : 9000), b = R(lv === 1 ? 200 : 700, lv === 1 ? 1800 : 8000), tot = N + a, left = tot - b;
  return h3(lv, {text:`Cửa hàng có <b>${fmt(N)} ${x[1]} ${x[0]}</b>. Tuần đầu cửa hàng nhập thêm <b>${fmt(a)} ${x[1]}</b>, tuần sau bán đi <b>${fmt(b)} ${x[1]}</b>. Hỏi sau hai tuần cửa hàng còn lại bao nhiêu ${x[1]} ${x[0]}?`,
    what:`Số ${x[1]} ${x[0]} còn lại sau hai tuần`, whatWrong:[`Số ${x[1]} ${x[0]} nhập thêm`, `Số ${x[1]} ${x[0]} bán đi`, `Số ${x[1]} ${x[0]} có sau khi nhập thêm`],
    plan:`Tìm số ${x[1]} có sau khi nhập thêm (cộng), rồi trừ đi số đã bán`, planWrong:[`Lấy ${fmt(N)} cộng ${fmt(a)} rồi cộng ${fmt(b)}`, `Lấy ${fmt(N)} trừ ${fmt(a)} rồi trừ ${fmt(b)}`, `Lấy ${fmt(a)} trừ ${fmt(b)}`],
    planHint:'“Nhập thêm” thì có nhiều lên (cộng), “bán đi” thì ít đi (trừ). Làm theo thứ tự xảy ra.',
    chain1:`Sau khi nhập thêm: ${fmt(N)} + ${fmt(a)} = [_] (${x[1]})<br>Sau khi bán: ${fmt(tot)} − ${fmt(b)} = [_] (${x[1]})`, chain2:`Sau khi nhập thêm có: [_] ${x[1]}<br>Sau khi bán còn: [_] ${x[1]}`, chainAns:[tot, left], finTpl:`[_] ${x[1]}`, fin:left,
    sol:BG(`Sau khi nhập thêm có: ${fmt(N)} + ${fmt(a)} = ${fmt(tot)} (${x[1]})`, `Sau khi bán còn lại: ${fmt(tot)} − ${fmt(b)} = ${fmt(left)} (${x[1]})`, `Đáp số: <b>${fmt(left)} ${x[1]}</b>.`)});
};
const gCtTongHieu = lv => {   // tổng – hiệu, tìm số bé
  const kho = pick([['kho A','kho B','thóc','kg'],['xã Hòa','xã Bình','dân','người']]), s = R(lv === 1 ? 20 : 60, lv === 1 ? 90 : 400), h = 2 * R(lv === 1 ? 3 : 8, lv === 1 ? 20 : 60), B = (s * 2 + h) / 2 + 0, big = s + h / 2 + 0;
  const S = 2 * s + h, bg = s + h, sm = s;   // S tổng, lớn = s + h, bé = s
  return h3(lv, {text:`Hai ${kho[0].startsWith('kho') ? 'kho' : 'xã'} ${kho[0].startsWith('kho') ? `A và B chứa tất cả` : 'Hòa và Bình có tất cả'} <b>${fmt(S * 10)} ${kho[3]}</b> ${kho[2]}. ${cap(kho[0])} có nhiều hơn ${kho[1]} <b>${fmt(h * 10)} ${kho[3]}</b>. Hỏi ${kho[1]} có bao nhiêu ${kho[3]} ${kho[2]}?`,
    what:`Số ${kho[3]} ${kho[2]} của ${kho[1]}`, whatWrong:[`Số ${kho[3]} ${kho[2]} của ${kho[0]}`, `Tổng số ${kho[3]} ${kho[2]} của hai nơi`, `Số ${kho[3]} ${kho[2]} hai nơi hơn kém nhau`],
    plan:`Lấy tổng trừ hiệu rồi chia 2 (số bé = (tổng − hiệu) : 2)`, planWrong:['Lấy tổng cộng hiệu rồi chia 2', 'Lấy tổng trừ hiệu rồi nhân 2', 'Lấy tổng chia 2'],
    planHint:'Biết tổng và hiệu: Số bé = (tổng − hiệu) : 2; số lớn = (tổng + hiệu) : 2. Hỏi số bé hay số lớn?',
    chain1:`Hai lần số bé: ${fmt(S * 10)} − ${fmt(h * 10)} = [_] (${kho[3]})<br>Số bé: ${fmt(2 * s * 10)} : 2 = [_] (${kho[3]})`, chain2:`Hai lần số bé: [_] ${kho[3]}<br>Số bé (${kho[1]}): [_] ${kho[3]}`, chainAns:[2 * s * 10, s * 10], finTpl:`[_] ${kho[3]}`, fin:s * 10,
    sol:BG(`Hai lần số của ${kho[1]}: ${fmt(S * 10)} − ${fmt(h * 10)} = ${fmt(2 * s * 10)} (${kho[3]})`, `${cap(kho[1])} có: ${fmt(2 * s * 10)} : 2 = ${fmt(s * 10)} (${kho[3]})`, `Đáp số: <b>${fmt(s * 10)} ${kho[3]}</b>.`)});
};
const gCtTangGiam = lv => {   // dân số tăng rồi giảm
  const A = R(lv === 1 ? 12 : 30, lv === 1 ? 40 : 90) * 1000 + R(0, 9) * 100, a = R(lv === 1 ? 8 : 15, lv === 1 ? 40 : 90) * 100, b = R(lv === 1 ? 3 : 5, lv === 1 ? 7 : 12) * 100, t1 = A + a, t2 = t1 - b;
  return h3(lv, {text:`Năm ngoái xã Hòa Phú có <b>${fmt(A)}</b> người. Năm nay số dân tăng thêm <b>${fmt(a)}</b> người. Sang năm sau, vì một số gia đình chuyển đi nơi khác nên số dân giảm <b>${fmt(b)}</b> người so với năm nay. Hỏi năm sau xã Hòa Phú có bao nhiêu người?`,
    what:'Số dân của xã Hòa Phú năm sau', whatWrong:['Số dân của xã năm ngoái', 'Số dân của xã năm nay', 'Số người chuyển đi nơi khác'],
    plan:'Tìm số dân năm nay (cộng phần tăng), rồi trừ đi phần giảm để có số dân năm sau', planWrong:[`Lấy ${fmt(A)} trừ ${fmt(a)} rồi cộng ${fmt(b)}`, `Lấy ${fmt(A)} cộng ${fmt(a)} rồi cộng ${fmt(b)}`, `Lấy ${fmt(A)} trừ ${fmt(b)}`],
    planHint:'Làm theo thứ tự năm: năm ngoái → năm nay (tăng: cộng) → năm sau (giảm: trừ).',
    chain1:`Năm nay: ${fmt(A)} + ${fmt(a)} = [_] (người)<br>Năm sau: ${fmt(t1)} − ${fmt(b)} = [_] (người)`, chain2:`Năm nay có: [_] người<br>Năm sau có: [_] người`, chainAns:[t1, t2], finTpl:'[_] người', fin:t2,
    sol:BG(`Năm nay xã có: ${fmt(A)} + ${fmt(a)} = ${fmt(t1)} (người)`, `Năm sau xã có: ${fmt(t1)} − ${fmt(b)} = ${fmt(t2)} (người)`, `Đáp số: <b>${fmt(t2)} người</b>.`)});
};
/* ---- Chủ đề 6: Đường thẳng vuông góc, song song ---- */
const gVgThoi = lv => {   // dây uốn hình thoi
  const c = R(lv === 1 ? 4 : 8, lv === 1 ? 15 : 40), L = 4 * c;
  return h3(lv, {text:`Bác Hai dùng một sợi dây thép dài <b>${L} cm</b> uốn thành một khung hình thoi (vừa hết sợi dây). Hỏi mỗi cạnh của khung hình thoi dài bao nhiêu xăng-ti-mét?`,
    what:'Độ dài mỗi cạnh của khung hình thoi', whatWrong:['Chu vi của khung hình thoi', 'Số cạnh của hình thoi', 'Độ dài sợi dây thép'],
    plan:'Hình thoi có 4 cạnh bằng nhau, nên lấy độ dài sợi dây chia cho 4', planWrong:[`Lấy ${L} chia cho 2`, `Lấy ${L} nhân với 4`, `Lấy ${L} trừ 4`],
    planHint:'Sợi dây vừa hết là chu vi hình thoi. Hình thoi có bao nhiêu cạnh, các cạnh thế nào với nhau?',
    chain1:`Độ dài mỗi cạnh: ${L} : 4 = [_] (cm)`, chain2:`Độ dài mỗi cạnh: [_] cm`, chainAns:[c], finTpl:'[_] cm', fin:c,
    sol:BG(`Hình thoi có 4 cạnh bằng nhau, nên mỗi cạnh dài:`, `${L} : 4 = ${c} (cm)`, `Đáp số: <b>${c} cm</b>.`)});
};
const gVgBinhHanh = lv => {   // chu vi hình bình hành
  const a = R(lv === 1 ? 8 : 15, lv === 1 ? 25 : 60), d = R(2, lv === 1 ? 10 : 25), b = a + d, h = a + b, P = 2 * h;
  return h3(lv, {text:`Một mảnh đất hình bình hành có hai cạnh liên tiếp dài <b>${a} m</b> và hơn nhau <b>${d} m</b> (cạnh còn lại dài hơn). Hỏi chu vi mảnh đất là bao nhiêu mét?`,
    what:'Chu vi mảnh đất hình bình hành', whatWrong:['Độ dài cạnh dài của mảnh đất', 'Diện tích mảnh đất', 'Tổng độ dài hai cạnh liên tiếp (nửa chu vi)'],
    plan:'Tìm độ dài cạnh còn lại, cộng hai cạnh liên tiếp, rồi nhân với 2 (các cạnh đối bằng nhau)', planWrong:[`Lấy ${a} cộng ${d} rồi nhân 2`, `Lấy ${a} nhân ${d}`, `Tìm cạnh còn lại rồi nhân với 4`],
    planHint:'Hình bình hành có các cạnh đối bằng nhau. Chu vi = (hai cạnh liên tiếp cộng lại) × 2, nên phải biết độ dài cạnh còn lại.',
    chain1:`Cạnh còn lại: ${a} + ${d} = [_] (m)<br>Tổng hai cạnh liên tiếp: ${a} + ${b} = [_] (m)<br>Chu vi: ${h} × 2 = [_] (m)`, chain2:`Cạnh còn lại: [_] m<br>Tổng hai cạnh liên tiếp: [_] m<br>Chu vi: [_] m`, chainAns:[b, h, P], finTpl:'[_] m', fin:P,
    sol:BG(`Cạnh còn lại dài: ${a} + ${d} = ${b} (m)`, `Nửa chu vi: ${a} + ${b} = ${h} (m)`, `Chu vi mảnh đất: ${h} × 2 = ${P} (m)`, `Đáp số: <b>${P} m</b>.`)});
};
const gVgHangRao = lv => {   // hàng rào trừ cổng
  const w = R(lv === 1 ? 10 : 20, lv === 1 ? 30 : 80), L = w + R(3, lv === 1 ? 15 : 40), g = R(2, lv === 1 ? 4 : 8), h = L + w, P = 2 * h, r = P - g;
  return h3(lv, {text:`Một mảnh vườn hình chữ nhật có chiều dài <b>${L} m</b>, chiều rộng <b>${w} m</b>. Người ta rào xung quanh vườn, chừa một cái cổng rộng <b>${g} m</b> (không rào chỗ cổng). Hỏi hàng rào dài bao nhiêu mét?`,
    what:'Độ dài hàng rào', whatWrong:['Chu vi mảnh vườn', 'Chiều rộng cái cổng', 'Diện tích mảnh vườn'],
    plan:'Tính chu vi mảnh vườn, rồi trừ đi chiều rộng cái cổng', planWrong:[`Tính chu vi mảnh vườn rồi cộng với ${g}`, `Lấy ${L} cộng ${w} rồi trừ ${g}`, `Lấy ${L} nhân ${w}, rồi trừ ${g}`],
    planHint:'Rào xung quanh vườn là đi hết chu vi, nhưng chỗ cổng thì không rào.',
    chain1:`Nửa chu vi: ${L} + ${w} = [_] (m)<br>Chu vi: ${h} × 2 = [_] (m)<br>Hàng rào: ${P} − ${g} = [_] (m)`, chain2:`Nửa chu vi: [_] m<br>Chu vi mảnh vườn: [_] m<br>Hàng rào dài: [_] m`, chainAns:[h, P, r], finTpl:'[_] m', fin:r,
    sol:BG(`Nửa chu vi mảnh vườn: ${L} + ${w} = ${h} (m)`, `Chu vi mảnh vườn: ${h} × 2 = ${P} (m)`, `Hàng rào dài: ${P} − ${g} = ${r} (m)`, `Đáp số: <b>${r} m</b>.`)});
};

lesson(1,'gt3-on-tap','✍️ Giải toán 3 bước: ôn tập và bổ sung','Hiểu đề – Lập kế hoạch – Giải: mua hàng và tìm tiền trả lại, xuất kho, chu vi hình chữ nhật.',[gOnMua,gOnKho,gOnChuVi]);
lesson(2,'gt3-goc','✍️ Giải toán 3 bước: góc và đơn vị đo góc','Hiểu đề – Lập kế hoạch – Giải: hai góc kề nhau, góc bẹt, kim giờ đồng hồ quay.',[gGocKe,gGocBet,gGocKim]);
lesson(3,'gt3-so-nhieu-chu-so','✍️ Giải toán 3 bước: số có nhiều chữ số','Hiểu đề – Lập kế hoạch – Giải: dân số “ít hơn”, làm tròn số, số lớn nhất – bé nhất.',[gSoDan,gSoTron,gSoLonBe]);
lesson(4,'gt3-don-vi-do','✍️ Giải toán 3 bước: đơn vị đo đại lượng','Hiểu đề – Lập kế hoạch – Giải: tấn – tạ – kg, diện tích dm², phút – giây.',[gDvKl,gDvDt,gDvTg]);
lesson(5,'gt3-cong-tru','✍️ Giải toán 3 bước: phép cộng, phép trừ','Hiểu đề – Lập kế hoạch – Giải: nhập – bán hàng, tổng và hiệu, dân số tăng – giảm.',[gCtNhapXuat,gCtTongHieu,gCtTangGiam]);
lesson(6,'gt3-vuong-song-song','✍️ Giải toán 3 bước: hình thoi, hình bình hành','Hiểu đề – Lập kế hoạch – Giải: cạnh hình thoi, chu vi hình bình hành, hàng rào.',[gVgThoi,gVgBinhHanh,gVgHangRao]);

/* ---- ✍️ Giải toán 3 bước – bài 2 (luyện thêm, đề khác) cho các chủ đề 1–6 ---- */
const POS4 = ['đơn vị','chục','trăm','nghìn','chục nghìn','trăm nghìn'];
const gOn2Xe = lv => {   // chia có dư, làm tròn lên
  const k = pick(lv === 1 ? [30, 40, 45] : [35, 45, 48, 52]), q = R(lv === 1 ? 4 : 9, lv === 1 ? 12 : 30), r = R(1, k - 1), N = k * q + r, x = q + 1;
  return h3(lv, {text:`Trường tổ chức cho <b>${fmt(N)} học sinh</b> đi tham quan. Mỗi xe chở nhiều nhất <b>${k} học sinh</b>. Hỏi cần dùng ít nhất bao nhiêu xe để chở hết số học sinh?`,
    what:'Số xe ít nhất cần dùng', whatWrong:['Số học sinh mỗi xe chở', 'Số học sinh còn thừa', 'Tổng số học sinh đi tham quan'],
    plan:`Chia ${fmt(N)} cho ${k} được thương và số dư; vì còn học sinh dư nên phải thêm 1 xe nữa`, planWrong:['Chia rồi lấy thương, bỏ phần dư', 'Chia rồi lấy số dư làm số xe', `Nhân ${fmt(N)} với ${k}`],
    planHint:'Số học sinh còn dư vẫn phải có xe chở, nên số xe là thương cộng thêm 1 (khi phép chia có dư).',
    chain1:`${fmt(N)} : ${k} = [_] (dư [_])<br>Số xe ít nhất: [_] (xe)`, chain2:`Thương của phép chia: [_]; số dư: [_]<br>Số xe ít nhất: [_] xe`, chainAns:[q, r, x], finTpl:'[_] xe', fin:x,
    sol:BG(`${fmt(N)} : ${k} = ${q} (dư ${r})`, `${q} xe chở đủ ${fmt(q * k)} học sinh, còn ${r} học sinh nữa nên cần thêm 1 xe.`, `Số xe ít nhất: ${q} + 1 = ${x} (xe)`, `Đáp số: <b>${x} xe</b>.`)});
};
const gOn2Cay = lv => {   // nhân rồi trừ
  const a = R(lv === 1 ? 8 : 15, lv === 1 ? 20 : 45), b = R(lv === 1 ? 4 : 6, lv === 1 ? 9 : 18), tot = a * b, c = R(Math.floor(tot / 4), Math.floor(tot * 3 / 4)), left = tot - c;
  return h3(lv, {text:`Nhà trường định trồng cây thành <b>${b} hàng</b>, mỗi hàng <b>${a} cây</b>. Đến nay các bạn đã trồng được <b>${c} cây</b>. Hỏi còn phải trồng bao nhiêu cây nữa?`,
    what:'Số cây còn phải trồng', whatWrong:['Số cây đã trồng', 'Số cây dự định trồng ở mỗi hàng', 'Tổng số cây dự định trồng'],
    plan:`Tìm tổng số cây dự định trồng (${b} × ${a}), rồi lấy trừ đi số cây đã trồng`, planWrong:[`Lấy ${a} cộng ${b}, rồi trừ ${c}`, `Lấy ${c} chia cho ${b}`, `Lấy ${a} nhân ${b}, rồi cộng ${c}`],
    planHint:'Muốn biết còn thiếu bao nhiêu phải biết dự định tất cả là bao nhiêu cây (số hàng × số cây mỗi hàng).',
    chain1:`Tổng số cây dự định: ${b} × ${a} = [_] (cây)<br>Còn phải trồng: ${tot} − ${c} = [_] (cây)`, chain2:`Tổng số cây dự định: [_] cây<br>Còn phải trồng: [_] cây`, chainAns:[tot, left], finTpl:'[_] cây', fin:left,
    sol:BG(`Tổng số cây dự định trồng: ${b} × ${a} = ${tot} (cây)`, `Số cây còn phải trồng: ${tot} − ${c} = ${left} (cây)`, `Đáp số: <b>${left} cây</b>.`)});
};
const gOn2Tuoi = lv => {   // tuổi mẹ, con sau n năm
  const a = R(lv === 1 ? 6 : 7, lv === 1 ? 10 : 12), d = R(lv === 1 ? 24 : 22, lv === 1 ? 30 : 34), n = R(2, lv === 1 ? 5 : 9), m = a + d, now = a + m, after = now + 2 * n;
  return h3(lv, {text:`Hiện nay con <b>${a} tuổi</b>, mẹ hơn con <b>${d} tuổi</b>. Hỏi sau <b>${n} năm</b> nữa, tổng số tuổi của hai mẹ con là bao nhiêu?`,
    what:`Tổng số tuổi của hai mẹ con sau ${n} năm nữa`, whatWrong:['Tuổi của mẹ hiện nay', `Tổng số tuổi của hai mẹ con hiện nay`, `Tuổi của con sau ${n} năm nữa`],
    plan:`Tìm tuổi mẹ hiện nay, tìm tổng số tuổi hiện nay, rồi cộng thêm ${n} × 2 (mỗi người thêm ${n} tuổi)`, planWrong:[`Lấy ${a} cộng ${d}, rồi cộng ${n}`, `Tìm tổng số tuổi hiện nay rồi chỉ cộng thêm ${n}`, `Lấy ${a} nhân ${n}, rồi cộng ${d}`],
    planHint:'Sau mỗi năm, cả mẹ và con đều thêm 1 tuổi nên tổng số tuổi tăng thêm 2 mỗi năm.',
    chain1:`Tuổi mẹ hiện nay: ${a} + ${d} = [_] (tuổi)<br>Tổng số tuổi hiện nay: ${a} + ${m} = [_] (tuổi)<br>Sau ${n} năm: ${now} + ${n} × 2 = [_] (tuổi)`, chain2:`Tuổi mẹ hiện nay: [_] tuổi<br>Tổng số tuổi hiện nay: [_] tuổi<br>Tổng số tuổi sau ${n} năm: [_] tuổi`, chainAns:[m, now, after], finTpl:'[_] tuổi', fin:after,
    sol:BG(`Tuổi mẹ hiện nay: ${a} + ${d} = ${m} (tuổi)`, `Tổng số tuổi hiện nay: ${a} + ${m} = ${now} (tuổi)`, `Sau ${n} năm, mỗi người thêm ${n} tuổi: ${now} + ${n} × 2 = ${after} (tuổi)`, `Đáp số: <b>${after} tuổi</b>.`)});
};
const gGocBu = lv => {   // hai góc kề bù
  const x = R(lv === 1 ? 4 : 5, lv === 1 ? 14 : 30) * 5, y = 180 - x, loai = y < 90 ? 'góc nhọn' : y === 90 ? 'góc vuông' : 'góc tù';
  return h3(lv, {text:`Cho góc bẹt <b>xOz</b>. Vẽ tia <b>Oy</b> nằm giữa hai tia <b>Ox</b> và <b>Oz</b> sao cho góc <b>xOy</b> bằng <b>${x}°</b>. Hỏi góc <b>yOz</b> bằng bao nhiêu độ?`,
    what:'Số đo của góc yOz', whatWrong:['Số đo của góc xOy', 'Số đo của góc xOz', 'Tổng số đo của góc xOy và góc yOz'],
    plan:'Hai góc xOy và yOz ghép lại thành góc bẹt 180°, nên lấy 180° trừ đi số đo góc xOy', planWrong:[`Lấy 180° cộng ${x}°`, `Lấy ${x}° trừ 90°`, `Lấy 90° trừ ${x}°`],
    planHint:'Góc bẹt bằng 180°. Tia Oy nằm giữa nên góc xOy + góc yOz = góc bẹt.',
    chain1:`Số đo góc yOz: 180° − ${x}° = [_]°`, chain2:`Số đo góc yOz: [_]°`, chainAns:[y], finTpl:'[_]°', fin:y,
    sol:BG(`Góc xOy + góc yOz = góc xOz = 180°`, `Góc yOz = 180° − ${x}° = ${y}° (${loai})`, `Đáp số: <b>${y}°</b>.`)});
};
const gGocPhut = lv => {   // kim phút
  const p1 = R(0, lv === 1 ? 10 : 20), p2 = p1 + R(lv === 1 ? 5 : 8, lv === 1 ? 20 : 35), n = p2 - p1, deg = n * 6;
  return h3(lv, {text:`Trên mặt đồng hồ, cứ sau <b>1 phút</b> thì kim phút quay được một góc <b>6°</b>. Hỏi từ lúc <b>${p1} phút</b> đến lúc <b>${p2} phút</b> (cùng một giờ), kim phút quay được một góc bao nhiêu độ?`,
    what:'Số đo góc mà kim phút quay được', whatWrong:['Số phút đã trôi qua', 'Số đo góc mà kim giờ quay được', `Số đo góc lúc ${p2} phút`],
    plan:`Tìm số phút đã trôi qua (${p2} − ${p1}), rồi nhân với 6°`, planWrong:[`Lấy ${p2} cộng ${p1}, rồi nhân 6°`, `Lấy ${p2} nhân ${p1}`, `Lấy 6° chia cho ${n}`],
    planHint:'Mỗi phút kim phút quay 6°. Từ lúc đầu đến lúc sau đã trôi qua bao nhiêu phút?',
    chain1:`Số phút đã trôi qua: ${p2} − ${p1} = [_] (phút)<br>Số đo góc kim phút quay: ${n} × 6° = [_]°`, chain2:`Số phút đã trôi qua: [_] phút<br>Số đo góc kim phút quay: [_]°`, chainAns:[n, deg], finTpl:'[_]°', fin:deg,
    sol:BG(`Số phút đã trôi qua: ${p2} − ${p1} = ${n} (phút)`, `Kim phút quay được: ${n} × 6° = ${deg}°`, `Đáp số: <b>${deg}°</b>.`)});
};
const gGocVuong = lv => {   // góc vuông chia ba góc
  const x = R(2, lv === 1 ? 4 : 6) * 5, y = R(2, lv === 1 ? 4 : 6) * 5, z = 90 - x - y;
  return h3(lv, {text:`Góc vuông <b>AOB</b> được chia bởi hai tia <b>OC</b>, <b>OD</b> thành ba góc: <b>AOC</b>, <b>COD</b>, <b>DOB</b>. Biết góc <b>AOC</b> bằng <b>${x}°</b> và góc <b>COD</b> bằng <b>${y}°</b>. Hỏi góc <b>DOB</b> bằng bao nhiêu độ?`,
    what:'Số đo của góc DOB', whatWrong:['Số đo của góc AOB', 'Số đo của góc AOD', 'Tổng số đo của góc AOC và góc COD'],
    plan:'Góc vuông là 90°, nên lấy 90° trừ đi số đo góc AOC, rồi trừ tiếp số đo góc COD', planWrong:[`Lấy 180° trừ ${x}° rồi trừ ${y}°`, `Lấy ${x}° cộng ${y}°`, `Lấy ${x}° trừ ${y}° rồi trừ 90°`],
    planHint:'Góc vuông có số đo bằng bao nhiêu độ (khác góc bẹt)? Ba góc nhỏ ghép lại thành góc vuông.',
    chain1:`Số đo góc AOD: ${x}° + ${y}° = [_]°<br>Số đo góc DOB: 90° − ${x + y}° = [_]°`, chain2:`Số đo góc AOD: [_]°<br>Số đo góc DOB: [_]°`, chainAns:[x + y, z], finTpl:'[_]°', fin:z,
    sol:BG(`Góc AOD = góc AOC + góc COD = ${x}° + ${y}° = ${x + y}°`, `Góc AOB là góc vuông = 90° nên góc DOB = 90° − ${x + y}° = ${z}°`, `Đáp số: <b>${z}°</b>.`)});
};
const gSo2Ba = lv => {   // ba nơi: hơn, kém, tổng
  const A = R(lv === 1 ? 12 : 30, lv === 1 ? 40 : 90) * 1000 + R(0, 9) * 100, d1 = R(lv === 1 ? 3 : 8, lv === 1 ? 9 : 25) * 100 + R(0, 9) * 10, d2 = R(lv === 1 ? 2 : 4, lv === 1 ? 8 : 15) * 100, B = A + d1, C = B - d2, T = A + B + C;
  return h3(lv, {text:`Thư viện xã có <b>${fmt(A)}</b> quyển sách. Thư viện huyện có nhiều hơn thư viện xã <b>${fmt(d1)}</b> quyển. Thư viện tỉnh có ít hơn thư viện huyện <b>${fmt(d2)}</b> quyển. Hỏi cả ba thư viện có bao nhiêu quyển sách?`,
    what:'Tổng số quyển sách của cả ba thư viện', whatWrong:['Số quyển sách của thư viện huyện', 'Số quyển sách của thư viện tỉnh', 'Số quyển sách thư viện huyện hơn thư viện xã'],
    plan:'Tìm số sách thư viện huyện (cộng), tìm số sách thư viện tỉnh (trừ), rồi cộng cả ba số', planWrong:[`Lấy ${fmt(A)} cộng ${fmt(d1)} cộng ${fmt(d2)}`, 'Tìm số sách thư viện tỉnh trước, rồi tìm thư viện huyện', `Lấy ${fmt(A)} nhân 3`],
    planHint:'Thư viện tỉnh được so sánh với thư viện huyện, nên phải biết thư viện huyện trước.',
    chain1:`Thư viện huyện: ${fmt(A)} + ${fmt(d1)} = [_] (quyển)<br>Thư viện tỉnh: ${fmt(B)} − ${fmt(d2)} = [_] (quyển)<br>Cả ba: ${fmt(A)} + ${fmt(B)} + ${fmt(C)} = [_] (quyển)`, chain2:`Thư viện huyện: [_] quyển<br>Thư viện tỉnh: [_] quyển<br>Cả ba thư viện: [_] quyển`, chainAns:[B, C, T], finTpl:'[_] quyển', fin:T,
    sol:BG(`Thư viện huyện có: ${fmt(A)} + ${fmt(d1)} = ${fmt(B)} (quyển)`, `Thư viện tỉnh có: ${fmt(B)} − ${fmt(d2)} = ${fmt(C)} (quyển)`, `Cả ba thư viện có: ${fmt(A)} + ${fmt(B)} + ${fmt(C)} = ${fmt(T)} (quyển)`, `Đáp số: <b>${fmt(T)} quyển</b>.`)});
};
const gSo2Hang = lv => {   // giá trị chữ số
  const ds = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9, 0].slice()).filter(x => true); let digs = ds.slice(0, 6); if (digs[0] === 0) digs = [digs[1], digs[0], ...digs.slice(2)];
  const N = +digs.join(''), i = R(0, 5), j = (i + R(1, 5)) % 6, pi = 5 - i, pj = 5 - j;
  const di = digs[i], dj = digs[j], vi = di * 10 ** pi, vj = dj * 10 ** pj, S = vi + vj;
  if (di === 0 || dj === 0) return gSo2Hang(lv);
  return h3(lv, {text:`Cho số <b>${fmt(N)}</b>. Hỏi tổng giá trị của chữ số <b>${di}</b> và giá trị của chữ số <b>${dj}</b> trong số đó là bao nhiêu?`,
    what:`Tổng giá trị của chữ số ${di} và chữ số ${dj} trong số ${fmt(N)}`, whatWrong:[`Tổng của hai chữ số ${di} và ${dj}`, `Giá trị của chữ số ${di}`, `Giá trị của chữ số ${dj}`],
    plan:`Xác định hàng của mỗi chữ số, tìm giá trị của từng chữ số (chữ số × giá trị của hàng), rồi cộng lại`, planWrong:[`Lấy ${di} cộng ${dj}`, `Lấy ${di} nhân ${dj}`, `Chỉ viết hai chữ số ${di} và ${dj} cạnh nhau thành một số`],
    planHint:'Giá trị của một chữ số phụ thuộc vào hàng nó đứng: chữ số ở hàng trăm thì có giá trị gấp 100 lần chữ số đó.',
    chain1:`Chữ số ${di} ở hàng ${POS4[pi]}: giá trị [_]<br>Chữ số ${dj} ở hàng ${POS4[pj]}: giá trị [_]<br>Tổng: ${fmt(vi)} + ${fmt(vj)} = [_]`, chain2:`Giá trị của chữ số ${di}: [_]<br>Giá trị của chữ số ${dj}: [_]<br>Tổng hai giá trị: [_]`, chainAns:[vi, vj, S], finTpl:'[_]', fin:S,
    sol:BG(`Chữ số ${di} ở hàng ${POS4[pi]} nên có giá trị ${fmt(vi)}`, `Chữ số ${dj} ở hàng ${POS4[pj]} nên có giá trị ${fmt(vj)}`, `Tổng: ${fmt(vi)} + ${fmt(vj)} = ${fmt(S)}`, `Đáp số: <b>${fmt(S)}</b>.`)});
};
const gSo2Lt = lv => {   // ba số tự nhiên liên tiếp
  const N = R(lv === 1 ? 20 : 1000, lv === 1 ? 900 : 99000) + (lv === 3 ? 100000 : 0), M2 = N - 1, Sm = N - 2, T = N + M2 + Sm;
  return h3(lv, {text:`Ba số tự nhiên liên tiếp có số lớn nhất là <b>${fmt(N)}</b>. Hỏi tổng của ba số đó là bao nhiêu?`,
    what:'Tổng của ba số tự nhiên liên tiếp', whatWrong:['Số lớn nhất trong ba số', 'Số bé nhất trong ba số', 'Hiệu của số lớn nhất và số bé nhất'],
    plan:'Hai số liên tiếp hơn kém nhau 1 đơn vị: tìm số ở giữa, số bé nhất, rồi cộng ba số', planWrong:[`Lấy ${fmt(N)} nhân với 3`, `Lấy ${fmt(N)} cộng 1, cộng 2 rồi cộng ba số`, `Lấy ${fmt(N)} cộng ${fmt(N)} cộng ${fmt(N)}, rồi trừ 3`],
    planHint:'Số liền trước kém số liền sau 1 đơn vị. Số lớn nhất là N thì hai số còn lại là N − 1 và N − 2.',
    chain1:`Số ở giữa: ${fmt(N)} − 1 = [_]<br>Số bé nhất: ${fmt(M2)} − 1 = [_]<br>Tổng: ${fmt(N)} + ${fmt(M2)} + ${fmt(Sm)} = [_]`, chain2:`Số ở giữa: [_]<br>Số bé nhất: [_]<br>Tổng ba số: [_]`, chainAns:[M2, Sm, T], finTpl:'[_]', fin:T,
    sol:BG(`Số ở giữa: ${fmt(N)} − 1 = ${fmt(M2)}`, `Số bé nhất: ${fmt(M2)} − 1 = ${fmt(Sm)}`, `Tổng ba số: ${fmt(N)} + ${fmt(M2)} + ${fmt(Sm)} = ${fmt(T)}`, `Đáp số: <b>${fmt(T)}</b>.`)});
};
const gDv2Bao = lv => {   // tạ → yến, chia bao
  const b = pick([5, 10, 2]), N = R(lv === 1 ? 2 : 4, lv === 1 ? 12 : 40) * (b === 10 ? 1 : 1), yen = N * 10, q = yen / b;
  return h3(lv, {text:`Cửa hàng có <b>${N} tạ</b> gạo, đóng đều vào các bao, mỗi bao <b>${b} yến</b>. Hỏi đóng được bao nhiêu bao gạo?`,
    what:'Số bao gạo đóng được', whatWrong:[`Số yến gạo trong mỗi bao`, `Số tạ gạo của cửa hàng`, `Số ki-lô-gam gạo trong mỗi bao`],
    plan:`Đổi ${N} tạ ra yến (1 tạ = 10 yến), rồi chia cho số yến trong mỗi bao`, planWrong:[`Lấy ${N} chia cho ${b} luôn`, `Đổi 1 tạ = 100 yến, rồi chia cho ${b}`, `Đổi ra yến rồi nhân với ${b}`],
    planHint:'Hai số đo phải cùng đơn vị mới chia được. 1 tạ = 10 yến = 100 kg.',
    chain1:`${N} tạ = [_] yến<br>Số bao gạo: ${yen} : ${b} = [_] (bao)`, chain2:`${N} tạ = [_] yến<br>Số bao gạo: [_] bao`, chainAns:[yen, q], finTpl:'[_] bao', fin:q,
    sol:BG(`${N} tạ = ${yen} yến`, `Số bao gạo đóng được: ${yen} : ${b} = ${q} (bao)`, `Đáp số: <b>${q} bao</b>.`)});
};
const gDv2Gach = lv => {   // diện tích nền × giá
  const a = R(lv === 1 ? 4 : 8, lv === 1 ? 9 : 15), b = R(3, lv === 1 ? 7 : 10), S = a * b, c = pick(lv === 1 ? [20000, 30000, 50000] : [45000, 65000, 85000, 120000]), tot = S * c;
  return h3(lv, {text:`Nền một căn phòng hình chữ nhật dài <b>${a} m</b>, rộng <b>${b} m</b>. Người ta lát gạch, tiền công và gạch mỗi mét vuông là <b>${fmt(c)} đồng</b>. Hỏi lát cả nền phòng phải trả bao nhiêu tiền?`,
    what:'Số tiền phải trả để lát cả nền phòng', whatWrong:['Diện tích nền phòng', 'Chu vi nền phòng', 'Số tiền lát mỗi mét vuông'],
    plan:`Tính diện tích nền phòng (m²), rồi nhân với số tiền của mỗi mét vuông`, planWrong:[`Tính chu vi nền phòng rồi nhân với ${fmt(c)}`, `Lấy ${a} cộng ${b}, rồi nhân ${fmt(c)}`, `Tính diện tích nền phòng rồi chia cho ${fmt(c)}`],
    planHint:'Tiền tính theo mét vuông (diện tích), không tính theo chiều dài các cạnh. Diện tích = dài × rộng.',
    chain1:`Diện tích nền phòng: ${a} × ${b} = [_] (m²)<br>Số tiền: ${S} × ${fmt(c)} = [_] (đồng)`, chain2:`Diện tích nền phòng: [_] m²<br>Số tiền phải trả: [_] đồng`, chainAns:[S, tot], finTpl:'[_] đồng', fin:tot,
    sol:BG(`Diện tích nền phòng: ${a} × ${b} = ${S} (m²)`, `Số tiền phải trả: ${S} × ${fmt(c)} = ${fmt(tot)} (đồng)`, `Đáp số: <b>${fmt(tot)} đồng</b>.`)});
};
const gDv2Hoc = lv => {   // giờ phút
  const m = R(2, lv === 1 ? 4 : 6), h = R(1, 2), p = R(10, 50), per = h * 60 + p, tot = m * per;
  return h3(lv, {text:`Bạn Mai ôn bài <b>${m} buổi</b>, mỗi buổi ôn <b>${h} giờ ${p} phút</b>. Hỏi bạn Mai ôn bài tất cả bao nhiêu phút?`,
    what:'Tổng số phút bạn Mai ôn bài', whatWrong:['Số phút của một buổi ôn bài', 'Số giờ bạn Mai ôn bài', 'Số buổi bạn Mai ôn bài'],
    plan:'Đổi thời gian một buổi ra phút (1 giờ = 60 phút), rồi nhân với số buổi', planWrong:[`Cộng ${h} + ${p}, rồi nhân với ${m}`, `Đổi 1 giờ = 100 phút, rồi nhân với ${m}`, `Lấy ${m} cộng với số phút của một buổi`],
    planHint:'1 giờ = 60 phút. Trước hết đổi thời gian một buổi ra cùng một đơn vị (phút).',
    chain1:`Một buổi: ${h} × 60 + ${p} = [_] (phút)<br>${m} buổi: ${per} × ${m} = [_] (phút)`, chain2:`Một buổi ôn: [_] phút<br>${m} buổi ôn: [_] phút`, chainAns:[per, tot], finTpl:'[_] phút', fin:tot,
    sol:BG(`Một buổi ôn: ${h} × 60 + ${p} = ${per} (phút)`, `${m} buổi ôn: ${per} × ${m} = ${tot} (phút)`, `Đáp số: <b>${tot} phút</b>.`)});
};
const gCt2Lon = lv => {   // tổng hiệu → số lớn
  const s = R(lv === 1 ? 20 : 60, lv === 1 ? 90 : 400), h = 2 * R(lv === 1 ? 3 : 8, lv === 1 ? 20 : 60), S = (2 * s + h) * 100, hh = h * 100, big = (s + h) * 100, w = Math.round(S + hh);
  return h3(lv, {text:`An và Bình góp tiền mua sách được tất cả <b>${fmt(S)} đồng</b>. An góp nhiều hơn Bình <b>${fmt(hh)} đồng</b>. Hỏi An góp bao nhiêu tiền?`,
    what:'Số tiền An góp', whatWrong:['Số tiền Bình góp', 'Tổng số tiền hai bạn góp', 'Số tiền An góp nhiều hơn Bình'],
    plan:'Lấy tổng cộng hiệu rồi chia 2 (số lớn = (tổng + hiệu) : 2)', planWrong:['Lấy tổng trừ hiệu rồi chia 2', 'Lấy tổng cộng hiệu rồi nhân 2', 'Lấy tổng chia 2'],
    planHint:'Biết tổng và hiệu: Số lớn = (tổng + hiệu) : 2; số bé = (tổng − hiệu) : 2. Hỏi số lớn hay số bé?',
    chain1:`Hai lần số của An: ${fmt(S)} + ${fmt(hh)} = [_] (đồng)<br>Số tiền An góp: ${fmt(w)} : 2 = [_] (đồng)`, chain2:`Hai lần số tiền của An: [_] đồng<br>Số tiền An góp: [_] đồng`, chainAns:[w, big], finTpl:'[_] đồng', fin:big,
    sol:BG(`Hai lần số tiền của An: ${fmt(S)} + ${fmt(hh)} = ${fmt(w)} (đồng)`, `An góp: ${fmt(w)} : 2 = ${fmt(big)} (đồng)`, `Đáp số: <b>${fmt(big)} đồng</b>.`)});
};
const gCt2Nhom = lv => {   // tính thuận tiện
  const k = R(1, lv === 1 ? 4 : 8) * 1000, a = R(1, 9) * 100 + R(0, 4) * 10 + 50 + (lv > 1 ? 1000 * R(1, 6) : 0), c = k - (a % 1000), b = R(1, 9) * 100 + 50 + (lv > 1 ? 1000 * R(1, 6) : 0), d = 1000 * Math.ceil(b / 1000) - b + (lv > 1 ? 1000 * R(1, 3) : 0), s1 = a + c, s2 = b + d, T = s1 + s2;
  if (c <= 0 || d <= 0) return gCt2Nhom(lv);
  return h3(lv, {text:`Bốn tổ công nhân làm được lần lượt <b>${fmt(a)}</b>, <b>${fmt(b)}</b>, <b>${fmt(c)}</b> và <b>${fmt(d)}</b> sản phẩm. Hỏi cả bốn tổ làm được tất cả bao nhiêu sản phẩm? (Hãy ghép cặp để tính thuận tiện.)`,
    what:'Tổng số sản phẩm của cả bốn tổ', whatWrong:['Số sản phẩm của tổ làm nhiều nhất', 'Số sản phẩm của hai tổ đầu', 'Số sản phẩm tổ làm nhiều hơn tổ làm ít'],
    plan:`Ghép ${fmt(a)} với ${fmt(c)} và ${fmt(b)} với ${fmt(d)} vì mỗi cặp cho tổng tròn nghìn, rồi cộng hai kết quả`, planWrong:[`Ghép ${fmt(a)} với ${fmt(b)} rồi trừ cho ${fmt(c)}`, `Lấy ${fmt(a)} trừ ${fmt(c)}, ${fmt(b)} trừ ${fmt(d)} rồi cộng`, `Lấy ${fmt(a)} nhân ${fmt(b)}`],
    planHint:'Tính chất kết hợp: ghép các số có tổng tròn chục, tròn trăm, tròn nghìn để tính nhẩm cho nhanh.',
    chain1:`${fmt(a)} + ${fmt(c)} = [_]<br>${fmt(b)} + ${fmt(d)} = [_]<br>Tổng: ${fmt(s1)} + ${fmt(s2)} = [_]`, chain2:`Tổng của cặp thứ nhất: [_]<br>Tổng của cặp thứ hai: [_]<br>Tổng cả bốn tổ: [_]`, chainAns:[s1, s2, T], finTpl:'[_] sản phẩm', fin:T,
    sol:BG(`(${fmt(a)} + ${fmt(c)}) + (${fmt(b)} + ${fmt(d)})`, `= ${fmt(s1)} + ${fmt(s2)} = ${fmt(T)} (sản phẩm)`, `Đáp số: <b>${fmt(T)} sản phẩm</b>.`)});
};
const gCt2Nguoc = lv => {   // tính ngược
  const x = R(lv === 1 ? 500 : 2000, lv === 1 ? 5000 : 40000), p = R(lv === 1 ? 100 : 500, lv === 1 ? 900 : 9000), q = R(lv === 1 ? 100 : 500, lv === 1 ? 900 : 9000), r = x + p - q;
  if (r <= 0) return gCt2Nguoc(lv);
  return h3(lv, {text:`An nghĩ ra một số. Nếu cộng số đó với <b>${fmt(p)}</b> rồi trừ đi <b>${fmt(q)}</b> thì được kết quả là <b>${fmt(r)}</b>. Hỏi An đã nghĩ ra số nào?`,
    what:'Số mà An đã nghĩ ra', whatWrong:['Kết quả sau khi tính', `Số được cộng thêm (${fmt(p)})`, `Số bị trừ đi (${fmt(q)})`],
    plan:`Làm ngược lại: lấy kết quả cộng ${fmt(q)} (ngược với trừ), rồi trừ đi ${fmt(p)} (ngược với cộng)`, planWrong:[`Lấy kết quả trừ ${fmt(q)}, rồi trừ ${fmt(p)}`, `Lấy kết quả cộng ${fmt(q)}, rồi cộng ${fmt(p)}`, `Lấy kết quả cộng ${fmt(p)}, rồi trừ ${fmt(q)}`],
    planHint:'Tính ngược từ cuối về đầu, mỗi phép tính đổi thành phép tính ngược lại (cộng ↔ trừ).',
    chain1:`Trước khi trừ ${fmt(q)}: ${fmt(r)} + ${fmt(q)} = [_]<br>Số An nghĩ: ${fmt(r + q)} − ${fmt(p)} = [_]`, chain2:`Số trước khi trừ ${fmt(q)}: [_]<br>Số An đã nghĩ: [_]`, chainAns:[r + q, x], finTpl:'[_]', fin:x,
    sol:BG(`Số trước khi trừ ${fmt(q)}: ${fmt(r)} + ${fmt(q)} = ${fmt(r + q)}`, `Số An nghĩ: ${fmt(r + q)} − ${fmt(p)} = ${fmt(x)}`, `Thử lại: ${fmt(x)} + ${fmt(p)} − ${fmt(q)} = ${fmt(r)} ✓`, `Đáp số: <b>${fmt(x)}</b>.`)});
};
const gVg2Cn = lv => {   // chu vi → chiều dài
  const w = R(lv === 1 ? 6 : 15, lv === 1 ? 20 : 60), L = w + R(3, lv === 1 ? 15 : 40), P = 2 * (L + w), hf = L + w;
  return h3(lv, {text:`Một mảnh đất hình chữ nhật có chu vi <b>${P} m</b>, chiều rộng <b>${w} m</b>. Hỏi chiều dài mảnh đất là bao nhiêu mét?`,
    what:'Chiều dài của mảnh đất', whatWrong:['Chiều rộng của mảnh đất', 'Chu vi của mảnh đất', 'Diện tích của mảnh đất'],
    plan:'Tìm nửa chu vi (chu vi chia 2), rồi lấy nửa chu vi trừ đi chiều rộng', planWrong:[`Lấy ${P} trừ ${w}`, `Lấy ${P} chia ${w}`, `Lấy chu vi chia 2, rồi cộng với chiều rộng`],
    planHint:'Chu vi = (dài + rộng) × 2, nên nửa chu vi = dài + rộng. Biết rộng thì tìm được dài.',
    chain1:`Nửa chu vi: ${P} : 2 = [_] (m)<br>Chiều dài: ${hf} − ${w} = [_] (m)`, chain2:`Nửa chu vi: [_] m<br>Chiều dài: [_] m`, chainAns:[hf, L], finTpl:'[_] m', fin:L,
    sol:BG(`Nửa chu vi: ${P} : 2 = ${hf} (m)`, `Chiều dài: ${hf} − ${w} = ${L} (m)`, `Đáp số: <b>${L} m</b>.`)});
};
const gVg2Thoi = lv => {   // hình thoi → hình chữ nhật
  const c = R(lv === 1 ? 6 : 12, lv === 1 ? 20 : 40), w = R(Math.ceil(c / 2), c + Math.floor(c / 2) - 1), L = 2 * c - w, pp = 4 * c;
  return h3(lv, {text:`Một khung dây thép hình thoi có cạnh <b>${c} cm</b>. Người ta uốn lại sợi dây đó (vừa hết) thành khung hình chữ nhật có chiều rộng <b>${w} cm</b>. Hỏi chiều dài khung hình chữ nhật là bao nhiêu xăng-ti-mét?`,
    what:'Chiều dài của khung hình chữ nhật', whatWrong:['Chu vi của khung hình thoi', 'Chiều rộng của khung hình chữ nhật', 'Độ dài mỗi cạnh của khung hình thoi'],
    plan:'Tìm chu vi hình thoi (cạnh × 4) cũng là chu vi hình chữ nhật, tìm nửa chu vi, rồi trừ chiều rộng', planWrong:[`Lấy ${c} trừ ${w}`, `Lấy ${c} nhân 2, rồi cộng ${w}`, `Lấy chu vi hình thoi trừ chiều rộng ${w}`],
    planHint:'Uốn lại vừa hết sợi dây nên chu vi hai hình bằng nhau. Hình thoi có 4 cạnh bằng nhau.',
    chain1:`Chu vi hình thoi: ${c} × 4 = [_] (cm)<br>Nửa chu vi: ${pp} : 2 = [_] (cm)<br>Chiều dài: ${2 * c} − ${w} = [_] (cm)`, chain2:`Chu vi (hình thoi và hình chữ nhật): [_] cm<br>Nửa chu vi: [_] cm<br>Chiều dài: [_] cm`, chainAns:[pp, 2 * c, L], finTpl:'[_] cm', fin:L,
    sol:BG(`Chu vi khung hình thoi: ${c} × 4 = ${pp} (cm)`, `Nửa chu vi hình chữ nhật: ${pp} : 2 = ${2 * c} (cm)`, `Chiều dài: ${2 * c} − ${w} = ${L} (cm)`, `Đáp số: <b>${L} cm</b>.`)});
};
const gVg2Bh = lv => {   // chu vi hình bình hành → cạnh kề
  const a = R(lv === 1 ? 6 : 15, lv === 1 ? 20 : 55), b = a + R(2, lv === 1 ? 12 : 30), P = 2 * (a + b), hf = a + b;
  return h3(lv, {text:`Một hình bình hành có chu vi <b>${P} cm</b>, một cạnh dài <b>${a} cm</b>. Hỏi cạnh liên tiếp với cạnh đó dài bao nhiêu xăng-ti-mét?`,
    what:'Độ dài cạnh liên tiếp với cạnh đã cho', whatWrong:['Chu vi của hình bình hành', 'Độ dài cạnh đã cho', 'Tổng độ dài hai cạnh liên tiếp (nửa chu vi)'],
    plan:'Tìm nửa chu vi (tổng hai cạnh liên tiếp), rồi lấy nửa chu vi trừ đi cạnh đã biết', planWrong:[`Lấy ${P} trừ ${a}`, `Lấy ${P} chia 4`, `Lấy chu vi chia 2, rồi cộng với ${a}`],
    planHint:'Hình bình hành có các cạnh đối bằng nhau: chu vi = (hai cạnh liên tiếp cộng lại) × 2.',
    chain1:`Nửa chu vi: ${P} : 2 = [_] (cm)<br>Cạnh còn lại: ${hf} − ${a} = [_] (cm)`, chain2:`Nửa chu vi: [_] cm<br>Cạnh liên tiếp: [_] cm`, chainAns:[hf, b], finTpl:'[_] cm', fin:b,
    sol:BG(`Nửa chu vi: ${P} : 2 = ${hf} (cm)`, `Cạnh liên tiếp dài: ${hf} − ${a} = ${b} (cm)`, `Đáp số: <b>${b} cm</b>.`)});
};

lesson(1,'gt3b-on-tap','✍️ Giải toán 3 bước (bài 2): ôn tập và bổ sung','Hiểu đề – Lập kế hoạch – Giải: chia có dư (số xe), nhân rồi trừ (trồng cây), tuổi mẹ và con.',[gOn2Xe,gOn2Cay,gOn2Tuoi]);
lesson(2,'gt3b-goc','✍️ Giải toán 3 bước (bài 2): góc và đơn vị đo góc','Hiểu đề – Lập kế hoạch – Giải: hai góc kề bù, kim phút đồng hồ quay, góc vuông chia thành ba góc.',[gGocBu,gGocPhut,gGocVuong]);
lesson(3,'gt3b-so-nhieu-chu-so','✍️ Giải toán 3 bước (bài 2): số có nhiều chữ số','Hiểu đề – Lập kế hoạch – Giải: hơn – kém rồi tổng, giá trị của chữ số, ba số tự nhiên liên tiếp.',[gSo2Ba,gSo2Hang,gSo2Lt]);
lesson(4,'gt3b-don-vi-do','✍️ Giải toán 3 bước (bài 2): đơn vị đo đại lượng','Hiểu đề – Lập kế hoạch – Giải: tạ – yến, diện tích m² và tiền lát nền, giờ – phút.',[gDv2Bao,gDv2Gach,gDv2Hoc]);
lesson(5,'gt3b-cong-tru','✍️ Giải toán 3 bước (bài 2): phép cộng, phép trừ','Hiểu đề – Lập kế hoạch – Giải: tìm số lớn khi biết tổng và hiệu, tính thuận tiện, tính ngược.',[gCt2Lon,gCt2Nhom,gCt2Nguoc]);
lesson(6,'gt3b-vuong-song-song','✍️ Giải toán 3 bước (bài 2): hình thoi, hình bình hành','Hiểu đề – Lập kế hoạch – Giải: tìm cạnh khi biết chu vi, hình thoi uốn thành hình chữ nhật.',[gVg2Cn,gVg2Thoi,gVg2Bh]);

/* ---- ✍️ Giải toán 3 bước cho học kì 2 (chủ đề 8–12) ---- */
const gH8Gao = lv => {
  const t = pick([5, 10, 20]), m = R(2, lv === 1 ? 5 : 9), x = R(lv === 1 ? 20 : 40, lv === 1 ? 80 : 150), bán = m * x, c = R(lv === 1 ? 4 : 8, lv === 1 ? 12 : 30), còn = c * t, n = bán + còn;
  return h3(lv, {text:`Cửa hàng nhập <b>${fmt(n)} kg</b> gạo. Trong <b>${m} ngày</b>, mỗi ngày bán <b>${x} kg</b>. Số gạo còn lại được đóng đều vào các túi, mỗi túi <b>${t} kg</b>. Hỏi đóng được bao nhiêu túi?`,
    what:'Số túi gạo đóng được', whatWrong:['Số ki-lô-gam gạo đã bán', 'Số ki-lô-gam gạo còn lại', 'Số ki-lô-gam gạo trong mỗi túi'],
    plan:`Tìm số gạo đã bán (${m} × ${x}), tìm số gạo còn lại (trừ), rồi chia cho ${t} kg mỗi túi`, planWrong:[`Lấy ${fmt(n)} chia ${t}`, `Lấy ${fmt(n)} trừ ${x}, rồi chia ${t}`, `Lấy số gạo đã bán chia ${t}`],
    planHint:'Chỉ số gạo còn lại (sau khi bán) mới được đóng túi. Cần biết đã bán bao nhiêu trước.',
    chain1:`Gạo đã bán: ${m} × ${x} = [_] (kg)<br>Gạo còn lại: ${fmt(n)} − ${fmt(bán)} = [_] (kg)<br>Số túi: ${fmt(còn)} : ${t} = [_] (túi)`, chain2:`Gạo đã bán: [_] kg<br>Gạo còn lại: [_] kg<br>Số túi gạo: [_] túi`, chainAns:[bán, còn, c], finTpl:'[_] túi', fin:c,
    sol:BG(`Gạo đã bán: ${m} × ${x} = ${fmt(bán)} (kg)`, `Gạo còn lại: ${fmt(n)} − ${fmt(bán)} = ${fmt(còn)} (kg)`, `Số túi gạo: ${fmt(còn)} : ${t} = ${c} (túi)`, `Đáp số: <b>${c} túi</b>.`)});
};
const gH8Tbc = lv => {
  const a = R(lv === 1 ? 20 : 40, lv === 1 ? 60 : 90), b = R(lv === 1 ? 20 : 40, lv === 1 ? 60 : 90), avg = R(Math.max(a, b) - 5 > 10 ? 25 : 30, lv === 1 ? 70 : 100), tot = 3 * avg, c = tot - a - b;
  if (c <= 0) return gH8Tbc(lv);
  return h3(lv, {text:`Ba tháng đầu năm, một cửa hàng bán trung bình mỗi tháng <b>${avg} chiếc</b> quạt. Tháng 1 bán <b>${a} chiếc</b>, tháng 2 bán <b>${b} chiếc</b>. Hỏi tháng 3 cửa hàng bán được bao nhiêu chiếc quạt?`,
    what:'Số quạt bán được trong tháng 3', whatWrong:['Số quạt bán trung bình mỗi tháng', 'Tổng số quạt bán trong ba tháng', 'Tổng số quạt bán trong tháng 1 và tháng 2'],
    plan:`Tìm tổng số quạt ba tháng (${avg} × 3), rồi trừ đi số quạt tháng 1 và tháng 2`, planWrong:[`Lấy ${avg} trừ ${a} và ${b}`, `Lấy ${a} cộng ${b}, rồi chia 3`, `Lấy ${a} cộng ${b} cộng ${avg}`],
    planHint:'Trung bình cộng = tổng : số số hạng, nên tổng = trung bình cộng × số số hạng.',
    chain1:`Tổng số quạt ba tháng: ${avg} × 3 = [_] (chiếc)<br>Tháng 1 và tháng 2: ${a} + ${b} = [_] (chiếc)<br>Tháng 3: ${tot} − ${a + b} = [_] (chiếc)`, chain2:`Tổng số quạt ba tháng: [_] chiếc<br>Hai tháng đầu: [_] chiếc<br>Tháng 3: [_] chiếc`, chainAns:[tot, a + b, c], finTpl:'[_] chiếc', fin:c,
    sol:BG(`Tổng số quạt ba tháng: ${avg} × 3 = ${tot} (chiếc)`, `Tháng 1 và tháng 2 bán: ${a} + ${b} = ${a + b} (chiếc)`, `Tháng 3 bán: ${tot} − ${a + b} = ${c} (chiếc)`, `Đáp số: <b>${c} chiếc</b>.`)});
};
const gH8Hang = lv => {
  const a = R(lv === 1 ? 2 : 3, lv === 1 ? 6 : 12) * 10, n = R(lv === 1 ? 3 : 5, lv === 1 ? 6 : 12);
  const k2 = pick([2, 5]);
  return h3(lv, {text:`Một đội công nhân làm đường, mỗi ngày làm được <b>${a} m</b>. Trong <b>${n} ngày</b> đội làm được một đoạn đường rồi chia đều đoạn đường đó cho <b>${k2} tổ</b>. Hỏi mỗi tổ được giao làm bao nhiêu mét đường?`,
    what:'Số mét đường mỗi tổ được giao', whatWrong:[`Số mét đường đội làm trong ${n} ngày`, 'Số mét đường đội làm trong một ngày', 'Số tổ của đội'],
    plan:`Tìm số mét đường làm trong ${n} ngày (${a} × ${n}), rồi chia đều cho ${k2} tổ`, planWrong:[`Lấy ${a} chia ${k2}`, `Lấy ${a} cộng ${n}, rồi chia ${k2}`, `Lấy ${a} nhân ${k2}`],
    planHint:'Muốn chia cho các tổ phải biết cả đoạn đường dài bao nhiêu.',
    chain1:`Đoạn đường làm trong ${n} ngày: ${a} × ${n} = [_] (m)<br>Mỗi tổ: ${a * n} : ${k2} = [_] (m)`, chain2:`Đoạn đường làm trong ${n} ngày: [_] m<br>Mỗi tổ được giao: [_] m`, chainAns:[a * n, a * n / k2], finTpl:'[_] m', fin:a * n / k2,
    sol:BG(`Đoạn đường làm trong ${n} ngày: ${a} × ${n} = ${a * n} (m)`, `Mỗi tổ được giao: ${a * n} : ${k2} = ${a * n / k2} (m)`, `Đáp số: <b>${a * n / k2} m</b>.`)});
};
const gH9Tb = lv => {
  const avg = R(lv === 1 ? 20 : 30, lv === 1 ? 50 : 80), d = [R(1, 9), R(1, 9), R(1, 9)], v = [avg - d[0], avg + d[0] - d[1], avg + d[1] - d[2], avg + d[2]];
  const T = v[0] + v[1] + v[2] + v[3];
  return h3(lv, {text:`Biểu đồ cột cho biết số quyển sách bốn tổ lớp 4A quyên góp: Tổ 1 được <b>${v[0]}</b> quyển, tổ 2 được <b>${v[1]}</b> quyển, tổ 3 được <b>${v[2]}</b> quyển, tổ 4 được <b>${v[3]}</b> quyển. Hỏi trung bình mỗi tổ quyên góp được bao nhiêu quyển sách?`,
    what:'Số quyển sách trung bình mỗi tổ quyên góp', whatWrong:['Tổng số quyển sách của cả bốn tổ', 'Số quyển sách của tổ nhiều nhất', 'Số quyển sách của tổ ít nhất'],
    plan:'Tìm tổng số quyển sách của cả bốn tổ, rồi chia cho 4', planWrong:['Lấy số sách của tổ nhiều nhất chia 4', 'Lấy tổng số sách chia 3', 'Lấy số sách của tổ nhiều nhất cộng tổ ít nhất'],
    planHint:'Trung bình cộng của 4 số bằng tổng của 4 số chia cho 4.',
    chain1:`Tổng số sách: ${v[0]} + ${v[1]} + ${v[2]} + ${v[3]} = [_] (quyển)<br>Trung bình mỗi tổ: ${T} : 4 = [_] (quyển)`, chain2:`Tổng số sách: [_] quyển<br>Trung bình mỗi tổ: [_] quyển`, chainAns:[T, avg * 1 + 0 === T / 4 ? avg : T / 4], finTpl:'[_] quyển', fin:T / 4,
    sol:BG(`Tổng số sách: ${v[0]} + ${v[1]} + ${v[2]} + ${v[3]} = ${T} (quyển)`, `Trung bình mỗi tổ: ${T} : 4 = ${T / 4} (quyển)`, `Đáp số: <b>${T / 4} quyển</b>.`)});
};
const gH9Hon = lv => {
  const v = shuffle([R(20, 40), R(41, 60), R(61, 90)].slice()), lo = Math.min(...v), hi = Math.max(...v), mi = v.reduce((a, b) => a + b) - lo - hi, dif = hi - lo;
  return h3(lv, {text:`Biểu đồ cột cho biết số xe đạp cửa hàng bán trong ba tháng: tháng 1 bán <b>${v[0]}</b> chiếc, tháng 2 bán <b>${v[1]}</b> chiếc, tháng 3 bán <b>${v[2]}</b> chiếc. Hỏi tháng bán nhiều nhất bán hơn tháng bán ít nhất bao nhiêu chiếc xe đạp?`,
    what:'Số xe tháng nhiều nhất bán hơn tháng ít nhất', whatWrong:['Tổng số xe bán trong ba tháng', 'Số xe bán được trong tháng nhiều nhất', 'Số xe trung bình mỗi tháng'],
    plan:'Đọc biểu đồ để tìm số xe nhiều nhất và ít nhất, rồi lấy số lớn trừ số bé', planWrong:['Cộng số xe nhiều nhất với số xe ít nhất', 'Lấy số xe tháng 3 trừ số xe tháng 1', 'Cộng cả ba số rồi chia 3'],
    planHint:'"Hơn bao nhiêu" nghĩa là tìm hiệu của hai số: số lớn − số bé.',
    chain1:`Số xe nhiều nhất: [_] (chiếc)<br>Số xe ít nhất: [_] (chiếc)<br>Hơn nhau: ${hi} − ${lo} = [_] (chiếc)`, chain2:`Số xe nhiều nhất: [_] chiếc<br>Số xe ít nhất: [_] chiếc<br>Hơn nhau: [_] chiếc`, chainAns:[hi, lo, dif], finTpl:'[_] chiếc', fin:dif,
    sol:BG(`Số xe nhiều nhất: ${hi} chiếc; số xe ít nhất: ${lo} chiếc`, `Hơn nhau: ${hi} − ${lo} = ${dif} (chiếc)`, `Đáp số: <b>${dif} chiếc</b>.`)});
};
const gH9Xu = lv => {
  const n = R(lv === 1 ? 20 : 30, lv === 1 ? 40 : 80), a = R(Math.floor(n * 0.2), Math.floor(n * 0.45)), b = n - a, dif = b - a;
  return h3(lv, {text:`Bình tung một đồng xu <b>${n} lần</b> và kiểm đếm kết quả. Mặt sấp xuất hiện <b>${a} lần</b>, các lần còn lại là mặt ngửa. Hỏi mặt ngửa xuất hiện nhiều hơn mặt sấp bao nhiêu lần?`,
    what:'Số lần mặt ngửa xuất hiện nhiều hơn mặt sấp', whatWrong:['Số lần mặt ngửa xuất hiện', 'Số lần mặt sấp xuất hiện', 'Tổng số lần tung đồng xu'],
    plan:`Tìm số lần mặt ngửa (${n} − ${a}), rồi lấy số lần mặt ngửa trừ số lần mặt sấp`, planWrong:[`Lấy ${n} trừ ${a}`, `Lấy ${n} cộng ${a}`, `Lấy ${a} chia ${n}`],
    planHint:'Mỗi lần tung chỉ có một trong hai kết quả: sấp hoặc ngửa. Số lần ngửa = tổng số lần − số lần sấp.',
    chain1:`Số lần mặt ngửa: ${n} − ${a} = [_] (lần)<br>Ngửa nhiều hơn sấp: ${b} − ${a} = [_] (lần)`, chain2:`Số lần mặt ngửa: [_] lần<br>Ngửa nhiều hơn sấp: [_] lần`, chainAns:[b, dif], finTpl:'[_] lần', fin:dif,
    sol:BG(`Số lần mặt ngửa: ${n} − ${a} = ${b} (lần)`, `Mặt ngửa nhiều hơn mặt sấp: ${b} − ${a} = ${dif} (lần)`, `Đáp số: <b>${dif} lần</b>.`)});
};
const gH10Banh = lv => {
  const d = R(lv === 1 ? 6 : 8, lv === 1 ? 10 : 16), a = R(1, Math.floor(d / 3)), b = R(1, Math.floor(d / 3)), left = d - a - b;
  return h3(lv, {text:`Cô giáo chia một chiếc bánh thành <b>${d} phần bằng nhau</b>. An ăn <b>${a} phần</b>, Bình ăn <b>${b} phần</b>. Hỏi còn lại bao nhiêu phần bánh? Còn lại bằng phân số nào của chiếc bánh?`,
    what:`Số phần bánh còn lại (trong ${d} phần)`, whatWrong:['Số phần bánh An ăn', 'Số phần bánh hai bạn đã ăn', `Số phần bánh cô chia (${d} phần)`],
    plan:`Tìm số phần hai bạn đã ăn (${a} + ${b}), rồi lấy ${d} trừ đi số đó`, planWrong:[`Lấy ${d} cộng ${a} cộng ${b}`, `Lấy ${d} trừ ${a}`, `Lấy ${a} nhân ${b}`],
    planHint:`Cả chiếc bánh là ${d} phần bằng nhau (tức ${F(d, d)}). Phần còn lại = tổng số phần − số phần đã ăn.`,
    chain1:`Số phần đã ăn: ${a} + ${b} = [_] (phần)<br>Số phần còn lại: ${d} − ${a + b} = [_] (phần)`, chain2:`Số phần hai bạn đã ăn: [_] phần<br>Số phần còn lại: [_] phần`, chainAns:[a + b, left], finTpl:'[_] phần', fin:left,
    sol:BG(`Số phần bánh đã ăn: ${a} + ${b} = ${a + b} (phần)`, `Số phần bánh còn lại: ${d} − ${a + b} = ${left} (phần)`, `Còn lại ${F(left, d)} chiếc bánh.`, `Đáp số: <b>${left} phần</b>.`)});
};
const gH10Rg = lv => {
  const g = pick(lv === 1 ? [2, 3, 5] : [4, 6, 7, 9]), p0 = pick([1, 2, 3, 4, 5, 7]), q0 = pick([2, 3, 5, 7, 8, 9, 10, 11]).valueOf();
  const gcd2 = (a, b) => b ? gcd2(b, a % b) : a; if (p0 >= q0 || gcd2(p0, q0) !== 1) return gH10Rg(lv);
  const p = p0 * g, q = q0 * g, S = p0 + q0;
  return h3(lv, {text:`Rút gọn phân số ${F(p, q)} thành phân số tối giản. Hỏi tổng của tử số và mẫu số của phân số tối giản đó là bao nhiêu?`,
    what:`Tổng tử số và mẫu số của phân số tối giản của ${F(p, q)}`, whatWrong:[`Tổng của ${p} và ${q}`, 'Tử số của phân số tối giản', 'Mẫu số của phân số tối giản'],
    plan:'Tìm một số tự nhiên lớn nhất mà cả tử số và mẫu số cùng chia hết, chia cả hai cho số đó, rồi cộng tử số mới với mẫu số mới', planWrong:['Chia tử số cho mẫu số rồi cộng', 'Chia chỉ tử số cho số chung, giữ nguyên mẫu số', 'Cộng cả tử số và mẫu số với cùng một số'],
    planHint:'Rút gọn là chia cả tử số và mẫu số cho cùng một số tự nhiên lớn hơn 1 để được phân số bằng nó.',
    chain1:`Chia cả tử số và mẫu số cho ${g}<br>Tử số mới: ${p} : ${g} = [_]<br>Mẫu số mới: ${q} : ${g} = [_]<br>Tổng: ${p0} + ${q0} = [_]`, chain2:`Tử số mới: [_]<br>Mẫu số mới: [_]<br>Tổng của tử số và mẫu số mới: [_]`, chainAns:[p0, q0, S], finTpl:'[_]', fin:S,
    sol:BG(`${F(p, q)} = ${F(p + ' : ' + g, q + ' : ' + g)} = ${F(p0, q0)} (đã tối giản vì ${p0} và ${q0} không cùng chia hết cho số nào lớn hơn 1)`, `Tổng tử số và mẫu số: ${p0} + ${q0} = ${S}`, `Đáp số: <b>${S}</b>.`)});
};
const gH10Ss = lv => {
  const m = R(2, lv === 1 ? 4 : 7), d = 2 * m, b = pick([...Array(d - 1).keys()].map(x => x + 1).filter(x => x !== m)), dif = Math.abs(m - b), more = m > b ? 'An' : 'Bình';
  return h3(lv, {text:`Một chiếc bánh được cắt thành <b>${d} phần bằng nhau</b>. An ăn <b>${F(1, 2)}</b> chiếc bánh, Bình ăn <b>${b} phần</b>. Hỏi ${more} ăn nhiều hơn bạn kia bao nhiêu phần bánh (tính theo phần của chiếc bánh đã cắt)?`,
    what:`Số phần bánh mà ${more} ăn nhiều hơn bạn kia`, whatWrong:['Số phần bánh An ăn', 'Số phần bánh Bình ăn', 'Tổng số phần bánh hai bạn ăn'],
    plan:`Đổi ${F(1, 2)} chiếc bánh ra số phần (${d} : 2), rồi so sánh với ${b} phần và tìm hiệu`, planWrong:[`Lấy ${d} cộng ${b}`, `Coi An ăn 1 phần, rồi so sánh với ${b}`, `Lấy ${d} nhân ${b}`],
    planHint:`${F(1, 2)} chiếc bánh là một nửa, tức bằng một nửa của ${d} phần.`,
    chain1:`An ăn: ${d} : 2 = [_] (phần)<br>Bình ăn: ${b} phần<br>Hơn nhau: [_] (phần)`, chain2:`Số phần An ăn: [_] phần<br>Số phần Bình ăn: ${b} phần<br>Hơn nhau: [_] phần`, chainAns:[m, dif], finTpl:'[_] phần', fin:dif,
    sol:BG(`An ăn ${F(1, 2)} chiếc bánh = ${d} : 2 = ${m} (phần)`, `Bình ăn ${b} phần.`, `${m > b ? 'An' : 'Bình'} ăn nhiều hơn: ${Math.max(m, b)} − ${Math.min(m, b)} = ${dif} (phần)`, `Đáp số: <b>${dif} phần</b>.`)});
};
const gH11Son = lv => {
  const d = R(lv === 1 ? 8 : 10, lv === 1 ? 12 : 20), a = R(2, Math.floor(d / 3)), b = R(2, Math.floor(d / 3)), left = d - a - b;
  return h3(lv, {text:`Một thùng sơn được chia thành <b>${d} phần bằng nhau</b>. Buổi sáng người thợ dùng <b>${F(a, d)}</b> thùng, buổi chiều dùng <b>${F(b, d)}</b> thùng. Hỏi còn lại bao nhiêu phần trong ${d} phần của thùng sơn?`,
    what:'Số phần sơn còn lại (tính theo phần bằng nhau của thùng)', whatWrong:['Số phần sơn dùng buổi sáng', 'Số phần sơn dùng cả hai buổi', `Tổng số phần của thùng sơn (${d} phần)`],
    plan:`Cộng hai phân số cùng mẫu số (cộng các tử số) được phần sơn đã dùng, rồi lấy ${F(d, d)} trừ đi`, planWrong:[`Cộng cả tử số và mẫu số của hai phân số`, `Lấy ${F(a, d)} trừ ${F(b, d)}`, `Lấy ${F(d, d)} cộng ${F(a, d)} và ${F(b, d)}`],
    planHint:`Cùng mẫu số thì cộng, trừ các tử số và giữ nguyên mẫu số. Cả thùng sơn là ${F(d, d)}.`,
    chain1:`Đã dùng: ${F(a, d)} + ${F(b, d)} = ${F(a + b, d)}, tức là [_] (phần)<br>Còn lại: ${d} − ${a + b} = [_] (phần)`, chain2:`Số phần sơn đã dùng: [_] phần<br>Số phần sơn còn lại: [_] phần`, chainAns:[a + b, left], finTpl:'[_] phần', fin:left,
    sol:BG(`Đã dùng: ${F(a, d)} + ${F(b, d)} = ${F(a + b, d)}`, `Còn lại: ${F(d, d)} − ${F(a + b, d)} = ${F(left, d)} (thùng sơn)`, `Đáp số: <b>${left} phần</b> (tức ${F(left, d)} thùng).`)});
};
const gH11Voi = lv => {
  const k = R(2, lv === 1 ? 4 : 6), d = 2 * k, b = R(1, d - k - 1 || 1), tot = k + b;
  if (tot >= d) return gH11Voi(lv);
  return h3(lv, {text:`Một bể nước chia thành <b>${d} phần bằng nhau</b>. Sau 1 giờ, vòi thứ nhất chảy được <b>${F(1, 2)}</b> bể, vòi thứ hai chảy được <b>${F(b, d)}</b> bể. Hỏi sau 1 giờ cả hai vòi chảy được bao nhiêu phần trong ${d} phần của bể?`,
    what:'Số phần của bể mà cả hai vòi chảy được sau 1 giờ', whatWrong:['Số phần vòi thứ nhất chảy được', 'Số phần vòi thứ hai chảy được', `Số phần của cả bể (${d} phần)`],
    plan:`Quy đồng: đổi ${F(1, 2)} bể thành số phần của ${d} phần, rồi cộng với phần của vòi thứ hai`, planWrong:[`Cộng ${F(1, 2)} với ${F(b, d)} bằng cách cộng tử số và cộng mẫu số`, `Lấy ${F(b, d)} trừ ${F(1, 2)}`, `Coi ${F(1, 2)} là 1 phần rồi cộng ${b}`],
    planHint:`Hai phân số khác mẫu số phải quy đồng trước khi cộng. ${F(1, 2)} = ${F('…', d)}.`,
    chain1:`Vòi thứ nhất: ${d} : 2 = [_] (phần)<br>Vòi thứ hai: ${b} phần<br>Cả hai vòi: ${k} + ${b} = [_] (phần)`, chain2:`Số phần vòi thứ nhất chảy: [_] phần<br>Số phần vòi thứ hai chảy: ${b} phần<br>Cả hai vòi: [_] phần`, chainAns:[k, tot], finTpl:'[_] phần', fin:tot,
    sol:BG(`${F(1, 2)} = ${F(k, d)} (chia cả bể thành ${d} phần, vòi thứ nhất chảy ${k} phần)`, `Cả hai vòi: ${F(k, d)} + ${F(b, d)} = ${F(tot, d)} (bể)`, `Đáp số: <b>${tot} phần</b>.`)});
};
const gH11Vuon = lv => {
  const d = pick([5, 6, 8, 10]), a = R(1, 3), b = R(1, d - a - 1), per = R(lv === 1 ? 20 : 40, lv === 1 ? 60 : 120), A = d * per, ao = d - a - b, S = ao * per;
  if (ao <= 0) return gH11Vuon(lv);
  return h3(lv, {text:`Một mảnh vườn rộng <b>${fmt(A)} m²</b>. Người ta trồng hoa trên <b>${F(a, d)}</b> diện tích, trồng rau trên <b>${F(b, d)}</b> diện tích, phần còn lại đào ao. Hỏi diện tích phần đào ao là bao nhiêu mét vuông?`,
    what:'Diện tích phần đào ao', whatWrong:['Diện tích phần trồng hoa', 'Diện tích phần trồng rau', 'Diện tích cả mảnh vườn'],
    plan:`Tìm số phần (trong ${d} phần) dành cho ao, tìm diện tích của mỗi phần, rồi nhân lên`, planWrong:[`Lấy ${fmt(A)} nhân ${F(a, d)} nhân ${F(b, d)}`, `Lấy ${F(a, d)} cộng ${F(b, d)} rồi nhân ${fmt(A)}`, `Lấy ${fmt(A)} trừ ${a} trừ ${b}`],
    planHint:`Cả mảnh vườn là ${d} phần bằng nhau. Số phần của ao = ${d} − (số phần hoa + số phần rau).`,
    chain1:`Số phần dành cho ao: ${d} − ${a} − ${b} = [_] (phần)<br>Diện tích mỗi phần: ${fmt(A)} : ${d} = [_] (m²)<br>Diện tích ao: ${per} × ${ao} = [_] (m²)`, chain2:`Số phần dành cho ao: [_] phần<br>Diện tích mỗi phần: [_] m²<br>Diện tích ao: [_] m²`, chainAns:[ao, per, S], finTpl:'[_] m²', fin:S,
    sol:BG(`Số phần dành cho ao: ${d} − ${a} − ${b} = ${ao} (phần), tức ${F(ao, d)} diện tích`, `Diện tích mỗi phần: ${fmt(A)} : ${d} = ${fmt(per)} (m²)`, `Diện tích ao: ${fmt(per)} × ${ao} = ${fmt(S)} (m²)`, `Đáp số: <b>${fmt(S)} m²</b>.`)});
};
const gH12Sach = lv => {
  const d = pick([3, 4, 5, 6, 8]), a = R(1, d - 1), q = R(lv === 1 ? 6 : 12, lv === 1 ? 14 : 30), n = d * q, toan = a * q, khac = n - toan;
  return h3(lv, {text:`Tủ sách của lớp có <b>${n} quyển</b>, trong đó <b>${F(a, d)}</b> số sách là sách Toán. Hỏi tủ sách có bao nhiêu quyển sách không phải sách Toán?`,
    what:'Số quyển sách không phải sách Toán', whatWrong:['Số quyển sách Toán', 'Tổng số sách của tủ sách', 'Số quyển sách trong mỗi phần'],
    plan:`Tìm ${F(a, d)} của ${n} quyển để biết số sách Toán, rồi lấy tổng số sách trừ đi`, planWrong:[`Lấy ${n} chia ${a}, rồi nhân ${d}`, `Tìm ${F(a, d)} của ${n} rồi cộng với ${n}`, `Lấy ${n} trừ ${a} trừ ${d}`],
    planHint:`Tìm ${F(a, d)} của một số: chia số đó cho ${d} rồi nhân với ${a}.`,
    chain1:`Mỗi phần: ${n} : ${d} = [_] (quyển)<br>Sách Toán: ${q} × ${a} = [_] (quyển)<br>Sách khác: ${n} − ${toan} = [_] (quyển)`, chain2:`Số quyển trong mỗi phần: [_] quyển<br>Số quyển sách Toán: [_] quyển<br>Số quyển sách khác: [_] quyển`, chainAns:[q, toan, khac], finTpl:'[_] quyển', fin:khac,
    sol:BG(`Mỗi phần có: ${n} : ${d} = ${q} (quyển)`, `Sách Toán: ${q} × ${a} = ${toan} (quyển)`, `Sách không phải sách Toán: ${n} − ${toan} = ${khac} (quyển)`, `Đáp số: <b>${khac} quyển</b>.`)});
};
const gH12Km = lv => {
  const d = pick([3, 4, 5]), e = pick([2, 3, 4]), a = R(1, d - 1), L0 = d * e * R(lv === 1 ? 3 : 5, lv === 1 ? 6 : 12), x = L0 / d * a, rest = L0 - x, c = R(1, e - 1), y = rest / e * c;
  return h3(lv, {text:`Một người đi xe đạp quãng đường dài <b>${L0} km</b>. Ngày thứ nhất đi được <b>${F(a, d)}</b> quãng đường. Ngày thứ hai đi được <b>${F(c, e)}</b> quãng đường còn lại. Hỏi ngày thứ hai người đó đi được bao nhiêu ki-lô-mét?`,
    what:'Số ki-lô-mét đi được trong ngày thứ hai', whatWrong:['Số ki-lô-mét đi được trong ngày thứ nhất', 'Số ki-lô-mét còn lại sau ngày thứ nhất', 'Cả quãng đường'],
    plan:`Tìm ${F(a, d)} của ${L0} km (ngày thứ nhất), tìm quãng đường còn lại, rồi tìm ${F(c, e)} của quãng đường còn lại`, planWrong:[`Tìm ${F(c, e)} của ${L0} km`, `Lấy ${F(a, d)} cộng ${F(c, e)}, rồi nhân ${L0}`, `Tìm ${F(c, e)} của quãng đường đã đi ngày thứ nhất`],
    planHint:`"${F(c, e)} quãng đường còn lại" là phân số của quãng đường còn lại, không phải của cả quãng đường.`,
    chain1:`Ngày thứ nhất: ${L0} : ${d} × ${a} = [_] (km)<br>Còn lại: ${L0} − ${x} = [_] (km)<br>Ngày thứ hai: ${rest} : ${e} × ${c} = [_] (km)`, chain2:`Ngày thứ nhất đi: [_] km<br>Quãng đường còn lại: [_] km<br>Ngày thứ hai đi: [_] km`, chainAns:[x, rest, y], finTpl:'[_] km', fin:y,
    sol:BG(`Ngày thứ nhất đi: ${L0} : ${d} × ${a} = ${x} (km)`, `Quãng đường còn lại: ${L0} − ${x} = ${rest} (km)`, `Ngày thứ hai đi: ${rest} : ${e} × ${c} = ${y} (km)`, `Đáp số: <b>${y} km</b>.`)});
};
const gH12Chai = lv => {
  const d = pick([2, 4, 5]), n = R(3, lv === 1 ? 10 : 24), chai = n * d, gia = R(lv === 1 ? 2 : 3, lv === 1 ? 5 : 9) * 1000, tien = chai * gia;
  return h3(lv, {text:`Một thùng chứa <b>${n} lít</b> nước mắm, được rót đầy vào các chai, mỗi chai chứa <b>${F(1, d)} lít</b>. Mỗi chai bán được <b>${fmt(gia)} đồng</b>. Hỏi bán hết số chai đó thì được bao nhiêu tiền?`,
    what:'Số tiền bán hết số chai nước mắm', whatWrong:['Số chai nước mắm rót được', 'Số lít nước mắm trong thùng', 'Số tiền bán một lít nước mắm'],
    plan:`Chia ${n} lít cho ${F(1, d)} lít (nhân ${n} với ${d}) để biết số chai, rồi nhân với giá mỗi chai`, planWrong:[`Lấy ${n} chia ${d}, rồi nhân giá mỗi chai`, `Lấy ${n} nhân ${F(1, d)}, rồi nhân giá mỗi chai`, `Lấy ${n} cộng ${d}, rồi nhân giá mỗi chai`],
    planHint:`Chia cho một phân số = nhân với phân số đảo ngược: ${n} : ${F(1, d)} = ${n} × ${d}.`,
    chain1:`Số chai: ${n} : ${F(1, d)} = ${n} × ${d} = [_] (chai)<br>Số tiền: ${chai} × ${fmt(gia)} = [_] (đồng)`, chain2:`Số chai rót được: [_] chai<br>Số tiền bán được: [_] đồng`, chainAns:[chai, tien], finTpl:'[_] đồng', fin:tien,
    sol:BG(`Số chai: ${n} : ${F(1, d)} = ${n} × ${d} = ${chai} (chai)`, `Số tiền: ${chai} × ${fmt(gia)} = ${fmt(tien)} (đồng)`, `Đáp số: <b>${fmt(tien)} đồng</b>.`)});
};

lesson(8,'gt3-nhan-chia','✍️ Giải toán 3 bước: nhân, chia, trung bình cộng','Hiểu đề – Lập kế hoạch – Giải: bán gạo rồi đóng túi, tìm số hạng khi biết trung bình cộng, chia đều đoạn đường.',[gH8Gao,gH8Tbc,gH8Hang]);
lesson(9,'gt3-thong-ke','✍️ Giải toán 3 bước: biểu đồ cột và kiểm đếm','Hiểu đề – Lập kế hoạch – Giải: trung bình cộng từ biểu đồ, hơn – kém giữa các cột, kiểm đếm tung đồng xu.',[gH9Tb,gH9Hon,gH9Xu]);
lesson(10,'gt3-phan-so','✍️ Giải toán 3 bước: phân số','Hiểu đề – Lập kế hoạch – Giải: phần còn lại của chiếc bánh, rút gọn phân số, so sánh số phần.',[gH10Banh,gH10Rg,gH10Ss]);
lesson(11,'gt3-cong-tru-ps','✍️ Giải toán 3 bước: cộng, trừ phân số','Hiểu đề – Lập kế hoạch – Giải: thùng sơn, hai vòi nước, chia mảnh vườn.',[gH11Son,gH11Voi,gH11Vuon]);
lesson(12,'gt3-nhan-chia-ps','✍️ Giải toán 3 bước: phân số của một số, nhân chia phân số','Hiểu đề – Lập kế hoạch – Giải: tủ sách, quãng đường hai ngày, rót nước mắm vào chai.',[gH12Sach,gH12Km,gH12Chai]);
/* =====================================================================
   🧠 TOÁN TƯ DUY – PHÉP CỘNG VÀ PHÉP TRỪ (song ngữ Việt – Anh, có kiến thức trọng tâm)
   6 bài theo danh mục thầy tổng hợp từ NotebookLM (Singapore Math Grade 2+/4+, Collins Cambridge…):
   dãy cách đều · tổng – hiệu nâng cao · tính tuổi · tính ngược/điền chữ số · trồng cây · thừa – thiếu.
   Mọi câu sinh số ngẫu nhiên, CHỌN ĐÁP ÁN TRƯỚC rồi dựng đề. bi()/bin() trong core.js.
   ===================================================================== */
{
const V = bi, v = bin, Bb = x => `<b>${fmt(x)}</b>`;
const L2 = (vi, en) => V(BG(...vi), BG(...en));                     // lời giải nhiều dòng, hai thứ tiếng
const KIDS = ['An', 'Bình', 'Chi', 'Dũng', 'Hà', 'Minh', 'Lan', 'Nam', 'Mai', 'Tú'];
const two = () => { const a = pick(KIDS); let b; do b = pick(KIDS); while(b === a); return [a, b]; };
const ITEMS = [['viên bi', 'marbles'], ['quyển vở', 'notebooks'], ['cái kẹo', 'candies'], ['con tem', 'stamps'], ['quả táo', 'apples']];
const seq = (a, d, n) => `${a}, ${a + d}, ${a + 2 * d}, ${a + 3 * d}, …, ${fmt(a + (n - 1) * d)}`;
const qc = (o, good, wrong) => { const opts = [...new Set([good, ...wrong])].slice(0, 4); return QC({...o, opts, ans:good}); };

/* Hình: cây trồng thành hàng (kiến thức trọng tâm bài trồng cây) */
const treesSVG = (n, closed) => { const W = 320, H = closed ? 170 : 110;
  let s = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${n} cây, ${closed ? n : n - 1} khoảng cách">`;
  if(!closed){ const x = i => 30 + i * (W - 60) / (n - 1);
    s += `<line class="sv-ink" stroke-width="2.5" x1="20" y1="80" x2="${W - 20}" y2="80"/>`;
    for(let i = 0; i < n; i++){ s += `<circle class="sv-part on" cx="${x(i)}" cy="56" r="13"/><line class="sv-ink" stroke-width="3" x1="${x(i)}" y1="69" x2="${x(i)}" y2="80"/>`;
      if(i < n - 1) s += `<text class="sv-muted" x="${(x(i) + x(i + 1)) / 2}" y="102" font-size="14" text-anchor="middle">${i + 1}</text>`; }
    s += `<text class="sv-txt" x="${W / 2}" y="22" font-size="15" text-anchor="middle">${n} cây · ${n - 1} khoảng</text>`;
  } else { const cx = 160, cy = 92, r = 58;
    s += `<circle class="sv-ink" stroke-width="2.5" cx="${cx}" cy="${cy}" r="${r}"/>`;
    for(let i = 0; i < n; i++){ const a = i * 2 * Math.PI / n - Math.PI / 2; s += `<circle class="sv-part on" cx="${(cx + r * Math.cos(a)).toFixed(1)}" cy="${(cy + r * Math.sin(a)).toFixed(1)}" r="11"/>`; }
    s += `<text class="sv-txt" x="${cx}" y="${cy + 6}" font-size="15" text-anchor="middle">${n} cây · ${n} khoảng</text>`; }
  return s + '</svg>'; };

G.topics.splice(G.topics.findIndex(t => t.id === 5) + 1, 0, {id:51, hk:1, name:'Phép cộng và phép trừ', label:'🧠 Toán tư duy', grp:'🧠 Toán tư duy · Singapore Math'});

/* ---------------------------------------------------------------- BÀI 1. DÃY SỐ CÁCH ĐỀU */
const tdCount = lv => {
  if(lv === 1){ const a = R(1, 60), n = R(15, 70), b = a + n - 1;
    return QB({text:V(`Có bao nhiêu số tự nhiên liên tiếp từ ${a} đến ${b}?`, `How many consecutive whole numbers are there from ${a} to ${b}?`), tpl:`[_] ${v('số', 'numbers')}`, ans:[n],
      hint:V('Số các số = Số cuối − Số đầu + 1.', 'Count = Last − First + 1.'), sol:L2([`${b} − ${a} + 1 = ${Bb(n)} (số)`], [`${b} − ${a} + 1 = ${Bb(n)} (numbers)`])}); }
  const d = R(2, lv === 2 ? 5 : 9), a = R(1, 20), n = R(12, lv === 2 ? 40 : 60), last = a + (n - 1) * d;
  if(lv === 2) return QB({text:V(`Dãy số ${seq(a, d, n)} có bao nhiêu số hạng?`, `How many terms are there in the sequence ${seq(a, d, n)}?`), tpl:`[_] ${v('số hạng', 'terms')}`, ans:[n],
    hint:V('Số số hạng = (Số cuối − Số đầu) : Khoảng cách + 1.', 'Number of terms = (Last − First) : Step + 1.'),
    sol:L2([`Khoảng cách: ${d}`, `(${fmt(last)} − ${a}) : ${d} + 1 = ${Bb(n)} (số hạng)`], [`Step: ${d}`, `(${fmt(last)} − ${a}) : ${d} + 1 = ${Bb(n)} (terms)`])});
  return QB({text:V(`Cho dãy số ${a}, ${a + d}, ${a + 2 * d}, ${a + 3 * d}, … Số hạng thứ ${n} của dãy là số nào?`, `Look at the sequence ${a}, ${a + d}, ${a + 2 * d}, ${a + 3 * d}, … What is term number ${n}?`), tpl:'[_]', ans:[last], wide:true,
    hint:V('Số hạng thứ n = Số đầu + (n − 1) × Khoảng cách.', 'The nth term = First + (n − 1) × Step.'),
    sol:L2([`${a} + (${n} − 1) × ${d} = ${Bb(last)}`], [`${a} + (${n} − 1) × ${d} = ${Bb(last)}`])});
};
const tdSum = lv => {
  const d = lv === 3 ? R(2, 5) : 1, a = lv === 1 ? 1 : R(lv === 2 ? 10 : 1, lv === 2 ? 80 : 15), n = R(lv === 1 ? 10 : 10, lv === 1 ? 40 : 30), last = a + (n - 1) * d, S = (a + last) * n / 2;
  const show = lv === 3 ? seq(a, d, n) : `${a} + ${a + 1} + ${a + 2} + … + ${last}`;
  const txt = lv === 3 ? V(`Tính tổng các số của dãy ${show}.`, `Find the sum of the sequence ${show}.`) : V(`Tính nhanh: ${show}`, `Calculate quickly: ${show}`);
  return QB({text:txt, tpl:`${v('Tổng', 'Sum')} = [_]`, ans:[S], wide:true,
    hint:V('Tổng = (Số đầu + Số cuối) × Số số hạng : 2.', 'Sum = (First + Last) × Number of terms : 2.'),
    sol:L2([`Số số hạng: ${d === 1 ? `${last} − ${a} + 1` : `(${last} − ${a}) : ${d} + 1`} = ${n}`, `Tổng: (${a} + ${last}) × ${n} : 2 = ${Bb(S)}`],
           [`Number of terms: ${d === 1 ? `${last} − ${a} + 1` : `(${last} − ${a}) : ${d} + 1`} = ${n}`, `Sum: (${a} + ${last}) × ${n} : 2 = ${Bb(S)}`])});
};
const tdPair = lv => {
  const n = R(5, 20) * 2, a = lv === 1 ? 1 : R(5, 50), b = a + n - 1, S = (a + b) * n / 2, show = `${a} + ${a + 1} + ${a + 2} + … + ${b - 1} + ${b}`;
  const pairTxt = V(`Trong tổng ${show}, em ghép số đầu với số cuối, số thứ hai với số kế cuối, …`, `In the sum ${show}, pair the first number with the last, the second with the second-to-last, …`);
  if(lv === 1) return qc({text:pairTxt + V(' Mỗi cặp có tổng bằng bao nhiêu?', ' What is the sum of each pair?'), compact:true,
    hint:V('Cặp đầu tiên là số đầu và số cuối.', 'The first pair is the first and the last number.'), sol:L2([`${a} + ${b} = ${Bb(a + b)}`], [`${a} + ${b} = ${Bb(a + b)}`])}, fmt(a + b), [fmt(b), fmt(a + b + 1), fmt(2 * b)]);
  if(lv === 2) return qc({text:pairTxt + V(' Có bao nhiêu cặp như vậy?', ' How many pairs are there?'), compact:true,
    hint:V('Đếm số số hạng rồi chia cho 2.', 'Count the terms, then divide by 2.'), sol:L2([`Số số hạng: ${b} − ${a} + 1 = ${n}`, `Số cặp: ${n} : 2 = ${Bb(n / 2)}`], [`Terms: ${b} − ${a} + 1 = ${n}`, `Pairs: ${n} : 2 = ${Bb(n / 2)}`])},
    fmt(n / 2), [fmt(n), fmt(n / 2 + 1), fmt((b - a) / 2 | 0 || n / 2 - 1)]);
  return qc({text:V(`Tổng ${show} bằng:`, `The sum ${show} equals:`), compact:true,
    hint:V('Có bao nhiêu cặp? Mỗi cặp có tổng bằng bao nhiêu?', 'How many pairs? What is each pair worth?'),
    sol:L2([`Có ${n / 2} cặp, mỗi cặp bằng ${a + b}.`, `Tổng: ${a + b} × ${n / 2} = ${Bb(S)}`], [`${n / 2} pairs, each worth ${a + b}.`, `Sum: ${a + b} × ${n / 2} = ${Bb(S)}`])},
    fmt(S), [fmt(S * 2), fmt(S - b), fmt((a + b) * (n / 2 - 1))]);
};
lesson(51, 'td-tong-day-cach-deu', 'Tổng dãy số cách đều', 'Đếm số hạng, tìm số hạng thứ n và tính nhanh tổng của dãy số cách đều.', [tdCount, tdPair, tdSum], {
  bi:true, en:'Sums of evenly spaced sequences', descEn:'Count terms, find the nth term and add up an evenly spaced sequence quickly.',
  intro:[
    {t:['Dãy số cách đều', 'Evenly spaced sequences'], b:['Hai số liền nhau hơn kém nhau cùng một số gọi là <b>khoảng cách</b>.', 'Neighbouring numbers always differ by the same amount, called the <b>step</b>.'], ex:['2, 5, 8, 11, … có khoảng cách 3.', '2, 5, 8, 11, … has a step of 3.']},
    {t:['Số số hạng và số hạng thứ n', 'Number of terms and the nth term'], b:['Số số hạng = (Số cuối − Số đầu) : Khoảng cách + 1<br>Số hạng thứ n = Số đầu + (n − 1) × Khoảng cách', 'Number of terms = (Last − First) : Step + 1<br>The nth term = First + (n − 1) × Step'], ex:['Dãy 2, 5, 8, …, 29 có (29 − 2) : 3 + 1 = 10 số hạng.', '2, 5, 8, …, 29 has (29 − 2) : 3 + 1 = 10 terms.']},
    {t:['Tính tổng bằng cách ghép cặp', 'Adding by pairing'], b:['Ghép số đầu với số cuối, số thứ hai với số kế cuối… Mọi cặp đều có tổng bằng nhau.<br><b>Tổng = (Số đầu + Số cuối) × Số số hạng : 2</b>', 'Pair the first with the last, the second with the second-to-last… Every pair has the same sum.<br><b>Sum = (First + Last) × Number of terms : 2</b>'], ex:['1 + 2 + … + 50 = (1 + 50) × 50 : 2 = 1 275', '1 + 2 + … + 50 = (1 + 50) × 50 : 2 = 1 275']}]});

/* ---------------------------------------------------------------- BÀI 2. TỔNG – HIỆU NÂNG CAO */
const tdGive = lv => { const [X, Y] = two(), [u, ue] = pick(ITEMS);
  if(lv < 3){ const e = R(15, 70), k = R(2, 12), A = e + k, B = e - k, S = 2 * e;
    const fig = segSVG([{label:X, parts:[{v:1}, {v:Math.min(.7, Math.max(.25, 2 * k / B)), on:true, t:`${k}+${k}`}]}, {label:Y, parts:[{v:1}]}], {labelW:70, brace:{from:0, to:1, t:String(S)}});
    return QB({text:V(`${X} và ${Y} có tất cả ${Bb(S)} ${u}. Nếu ${X} cho ${Y} ${Bb(k)} ${u} thì số ${u} của hai bạn bằng nhau. Hỏi lúc đầu ${lv === 1 ? `${X} có bao nhiêu ${u}` : 'mỗi bạn có bao nhiêu ' + u}?`,
        `${X} and ${Y} have ${Bb(S)} ${ue} in total. If ${X} gives ${Y} ${Bb(k)} ${ue}, they will have the same number. How many ${ue} did ${lv === 1 ? X : 'each of them'} have at first?`),
      fig, tpl:lv === 1 ? `${X}: [_]` : `${X}: [_] &nbsp; ${Y}: [_]`, ans:lv === 1 ? [A] : [A, B],
      hint:V(`${X} bớt ${k}, ${Y} thêm ${k} mới bằng nhau, nên lúc đầu hai bạn chênh nhau ${k} + ${k}.`, `${X} loses ${k} and ${Y} gains ${k} to be equal, so at first they differ by ${k} + ${k}.`),
      sol:L2([`Hiệu: ${k} × 2 = ${2 * k}`, `${X}: (${S} + ${2 * k}) : 2 = ${Bb(A)}`, `${Y}: ${S} − ${A} = ${Bb(B)}`], [`Difference: ${k} × 2 = ${2 * k}`, `${X}: (${S} + ${2 * k}) : 2 = ${Bb(A)}`, `${Y}: ${S} − ${A} = ${Bb(B)}`])}); }
  const k = R(4, 12), m = R(1, 2 * k - 2), x = R(20, 60), A = x + k, B = x + m - k, S = A + B, h = 2 * k - m;
  return QB({text:V(`${X} và ${Y} có tất cả ${Bb(S)} ${u}. Nếu ${X} cho ${Y} ${Bb(k)} ${u} thì ${Y} có nhiều hơn ${X} ${Bb(m)} ${u}. Hỏi lúc đầu mỗi bạn có bao nhiêu ${u}?`,
      `${X} and ${Y} have ${Bb(S)} ${ue} in total. If ${X} gives ${Y} ${Bb(k)} ${ue}, ${Y} will have ${Bb(m)} more than ${X}. How many ${ue} did each have at first?`),
    tpl:`${X}: [_] &nbsp; ${Y}: [_]`, ans:[A, B],
    hint:V(`Sau khi cho, ${Y} hơn ${X} ${m}. Vậy lúc đầu ${X} hơn ${Y}: ${k} + ${k} − ${m}.`, `After giving, ${Y} has ${m} more. So at first ${X} had ${k} + ${k} − ${m} more than ${Y}.`),
    sol:L2([`Lúc đầu ${X} hơn ${Y}: ${k} × 2 − ${m} = ${h}`, `${X}: (${S} + ${h}) : 2 = ${Bb(A)}`, `${Y}: ${S} − ${A} = ${Bb(B)}`], [`At first ${X} had ${k} × 2 − ${m} = ${h} more`, `${X}: (${S} + ${h}) : 2 = ${Bb(A)}`, `${Y}: ${S} − ${A} = ${Bb(B)}`])});
};
const HIDE_S = [[99, 'số lớn nhất có hai chữ số', 'the greatest 2-digit number'], [100, 'số bé nhất có ba chữ số', 'the smallest 3-digit number'], [999, 'số lớn nhất có ba chữ số', 'the greatest 3-digit number'], [998, 'số chẵn lớn nhất có ba chữ số', 'the greatest even 3-digit number'], [997, 'số lẻ lớn nhất có ba chữ số nhưng bé hơn 999', 'the greatest odd 3-digit number less than 999'], [1000, 'số bé nhất có bốn chữ số', 'the smallest 4-digit number'], [9900, 'số tròn trăm lớn nhất có bốn chữ số', 'the greatest 4-digit multiple of 100']];
const HIDE_H = [[9, 'số lớn nhất có một chữ số', 'the greatest 1-digit number'], [10, 'số chẵn bé nhất có hai chữ số', 'the smallest even 2-digit number'], [11, 'số lẻ bé nhất có hai chữ số', 'the smallest odd 2-digit number'], [90, 'số tròn chục lớn nhất có hai chữ số', 'the greatest 2-digit multiple of 10'], [99, 'số lớn nhất có hai chữ số', 'the greatest 2-digit number'], [100, 'số bé nhất có ba chữ số', 'the smallest 3-digit number']];
const tdHidden = lv => {
  if(lv === 1){ const s = R(10, 90), h = 2 * R(2, 25), b = s + h, T = (b + s) / 2;
    return QB({text:V(`Trung bình cộng của hai số là ${Bb(T)}. Số lớn hơn số bé ${Bb(h)} đơn vị. Tìm hai số đó.`, `The average of two numbers is ${Bb(T)}. The larger one is ${Bb(h)} more than the smaller one. Find the two numbers.`),
      tpl:`${v('Số lớn', 'Larger')}: [_] &nbsp; ${v('Số bé', 'Smaller')}: [_]`, ans:[b, s],
      hint:V('Tổng hai số = Trung bình cộng × 2.', 'Sum of the two numbers = Average × 2.'),
      sol:L2([`Tổng: ${T} × 2 = ${2 * T}`, `Số lớn: (${2 * T} + ${h}) : 2 = ${Bb(b)}`, `Số bé: ${2 * T} − ${b} = ${Bb(s)}`], [`Sum: ${T} × 2 = ${2 * T}`, `Larger: (${2 * T} + ${h}) : 2 = ${Bb(b)}`, `Smaller: ${2 * T} − ${b} = ${Bb(s)}`])}); }
  if(lv === 2){ const ok = []; HIDE_S.forEach(S => HIDE_H.forEach(H => { if(S[0] > H[0] && (S[0] + H[0]) % 2 === 0 && S[0] !== H[0]) ok.push([S, H]); }));
    const [[S, sv, se], [h, hv, he]] = pick(ok), b = (S + h) / 2, s = S - b;
    return QB({text:V(`Tổng hai số là <b>${sv}</b>, hiệu hai số là <b>${hv}</b>. Tìm hai số đó.`, `The sum of two numbers is <b>${se}</b> and their difference is <b>${he}</b>. Find the two numbers.`),
      tpl:`${v('Số lớn', 'Larger')}: [_] &nbsp; ${v('Số bé', 'Smaller')}: [_]`, ans:[b, s], wide:true,
      hint:V('Viết tổng và hiệu thành số trước, rồi dùng cách tìm hai số biết tổng và hiệu.', 'First write the sum and the difference as numbers, then use the sum-and-difference method.'),
      sol:L2([`Tổng là ${fmt(S)}, hiệu là ${h}.`, `Số lớn: (${fmt(S)} + ${h}) : 2 = ${Bb(b)}`, `Số bé: ${fmt(S)} − ${fmt(b)} = ${Bb(s)}`], [`Sum ${fmt(S)}, difference ${h}.`, `Larger: (${fmt(S)} + ${h}) : 2 = ${Bb(b)}`, `Smaller: ${fmt(S)} − ${fmt(b)} = ${Bb(s)}`])}); }
  const f = R(20, 300), a = R(3, 25), c = R(3, 25), g = f + a + c, S = f + g;
  return QB({text:V(`Hai số có tổng là ${Bb(S)}. Nếu thêm vào số thứ nhất ${Bb(a)} đơn vị và bớt ở số thứ hai ${Bb(c)} đơn vị thì hai số bằng nhau. Tìm hai số đó.`, `Two numbers add up to ${Bb(S)}. If you add ${Bb(a)} to the first number and take ${Bb(c)} away from the second, the two numbers become equal. Find them.`),
    tpl:`${v('Số thứ nhất', 'First')}: [_] &nbsp; ${v('Số thứ hai', 'Second')}: [_]`, ans:[f, g],
    hint:V(`Số thứ hai hơn số thứ nhất: ${a} + ${c}.`, `The second number is ${a} + ${c} more than the first.`),
    sol:L2([`Hiệu: ${a} + ${c} = ${a + c}`, `Số thứ nhất (số bé): (${S} − ${a + c}) : 2 = ${Bb(f)}`, `Số thứ hai: ${S} − ${f} = ${Bb(g)}`], [`Difference: ${a} + ${c} = ${a + c}`, `First (smaller): (${S} − ${a + c}) : 2 = ${Bb(f)}`, `Second: ${S} − ${f} = ${Bb(g)}`])});
};
const tdAway = lv => { const [X, Y] = two(), [u, ue] = pick(ITEMS), B = R(12, 60);
  if(lv < 3){ const k = R(3, 15), A = B + k, S = A + B;
    return QB({text:V(`${X} và ${Y} có tất cả ${Bb(S)} ${u}. Sau khi ${X} cho em ${Bb(k)} ${u} thì số ${u} của ${X} bằng số ${u} của ${Y}. Hỏi ${lv === 1 ? `${Y} có bao nhiêu ${u}` : 'lúc đầu mỗi bạn có bao nhiêu ' + u}?`,
        `${X} and ${Y} had ${Bb(S)} ${ue} in total. After ${X} gave ${Bb(k)} ${ue} to a little sister, ${X} had the same number as ${Y}. How many ${ue} did ${lv === 1 ? Y : 'each of them'} have${lv === 1 ? '' : ' at first'}?`),
      tpl:lv === 1 ? `${Y}: [_]` : `${X}: [_] &nbsp; ${Y}: [_]`, ans:lv === 1 ? [B] : [A, B],
      hint:V(`${X} cho em (người khác), không cho ${Y}. Vậy lúc đầu ${X} hơn ${Y} đúng ${k}.`, `${X} gave them to someone else, not to ${Y}. So at first ${X} had exactly ${k} more than ${Y}.`),
      sol:L2([`Hiệu: ${k}`, `${Y} (số bé): (${S} − ${k}) : 2 = ${Bb(B)}`, ...(lv === 1 ? [] : [`${X}: ${B} + ${k} = ${Bb(A)}`])], [`Difference: ${k}`, `${Y} (smaller): (${S} − ${k}) : 2 = ${Bb(B)}`, ...(lv === 1 ? [] : [`${X}: ${B} + ${k} = ${Bb(A)}`])])}); }
  const k = R(3, 12), j = R(3, 12), A = B + k + j, S = A + B;
  return QB({text:V(`${X} và ${Y} có tất cả ${Bb(S)} ${u}. Nếu ${X} làm mất ${Bb(k)} ${u} và ${Y} được mẹ cho thêm ${Bb(j)} ${u} thì số ${u} của hai bạn bằng nhau. Hỏi lúc đầu mỗi bạn có bao nhiêu ${u}?`,
      `${X} and ${Y} have ${Bb(S)} ${ue} in total. If ${X} loses ${Bb(k)} ${ue} and ${Y} gets ${Bb(j)} more from Mum, they will have the same number. How many ${ue} does each have now?`),
    tpl:`${X}: [_] &nbsp; ${Y}: [_]`, ans:[A, B],
    hint:V(`${X} phải bớt ${k}, ${Y} phải thêm ${j} mới bằng nhau: hiệu là ${k} + ${j}.`, `${X} must lose ${k} and ${Y} must gain ${j} to be equal: the difference is ${k} + ${j}.`),
    sol:L2([`Hiệu: ${k} + ${j} = ${k + j}`, `${X}: (${S} + ${k + j}) : 2 = ${Bb(A)}`, `${Y}: ${S} − ${A} = ${Bb(B)}`], [`Difference: ${k} + ${j} = ${k + j}`, `${X}: (${S} + ${k + j}) : 2 = ${Bb(A)}`, `${Y}: ${S} − ${A} = ${Bb(B)}`])});
};
lesson(51, 'td-tong-hieu-nang-cao', 'Tìm hai số biết tổng và hiệu – nâng cao', 'Tìm tổng, hiệu bị “ẩn”: chuyển bớt cho nhau, cho người khác, trung bình cộng, số đặc biệt.', [tdAway, tdGive, tdHidden], {
  bi:true, en:'Sum and difference – advanced', descEn:'Find hidden sums and differences: giving away, sharing, averages and special numbers.',
  intro:[
    {t:['Công thức', 'The rule'], b:['Số lớn = (Tổng + Hiệu) : 2<br>Số bé = (Tổng − Hiệu) : 2', 'Larger = (Sum + Difference) : 2<br>Smaller = (Sum − Difference) : 2'],
     fig:segSVG([{label:'Số lớn', parts:[{v:1}, {v:.4, on:true, t:'Hiệu'}]}, {label:'Số bé', parts:[{v:1}]}], {labelW:74, brace:{from:0, to:1, t:'Tổng'}})},
    {t:['Chuyển cho nhau thì hiệu gấp đôi', 'Giving to each other doubles the gap'], b:['A cho B một số k thì bằng nhau ⇒ lúc đầu A hơn B đúng <b>k + k</b> (A bớt k, B thêm k).', 'If A gives k to B and they become equal, A had <b>k + k</b> more than B at first (A loses k, B gains k).'], ex:['Cho nhau 5 viên thì bằng nhau ⇒ hiệu là 10.', 'Giving 5 makes them equal ⇒ the difference is 10.']},
    {t:['Cho người khác thì hiệu chỉ bằng k', 'Giving to someone else: the gap is just k'], b:['A cho người khác k thì A bằng B ⇒ lúc đầu A hơn B đúng <b>k</b>.<br>Nhớ: đổi tổng, hiệu “ẩn” ra số trước khi tính (trung bình cộng × 2 = tổng).', 'If A gives k to someone else and then equals B, A had exactly <b>k</b> more.<br>Remember: turn hidden sums and differences into numbers first (average × 2 = sum).']}]});

/* ---------------------------------------------------------------- BÀI 3. TÍNH TUỔI */
const PAIRS = [['mẹ', 'Mum', 'con', 'the child', 22, 32], ['bố', 'Dad', 'con', 'the child', 25, 35], ['ông', 'Grandpa', 'cháu', 'the grandchild', 50, 62], ['anh', 'the older brother', 'em', 'the younger brother', 2, 9], ['chị', 'the older sister', 'em', 'the younger sister', 2, 8]];
const cap = s => s[0].toUpperCase() + s.slice(1);
const tdAge1 = lv => { const [a, ae, b, be, h1, h2] = pick(PAIRS), h = R(h1, h2), c = R(4, 14), P = c + h;
  if(lv === 1){ const c2 = c + R(3, 15);
    return QB({text:V(`Năm nay ${a} ${P} tuổi, ${b} ${c} tuổi. Hỏi khi ${b} ${c2} tuổi thì ${a} bao nhiêu tuổi?`, `This year ${ae} is ${P} and ${be} is ${c}. How old will ${ae} be when ${be} is ${c2}?`), tpl:`[_] ${v('tuổi', 'years old')}`, ans:[c2 + h],
      hint:V('Hiệu số tuổi của hai người không thay đổi theo thời gian.', 'The age difference between two people never changes.'),
      sol:L2([`${cap(a)} hơn ${b}: ${P} − ${c} = ${h} (tuổi)`, `Khi đó ${a}: ${c2} + ${h} = ${Bb(c2 + h)} (tuổi)`], [`Difference: ${P} − ${c} = ${h} (years)`, `Then ${ae}: ${c2} + ${h} = ${Bb(c2 + h)} (years old)`])}); }
  if(lv === 2){ const n = R(3, 15), T = P + c + 2 * n;
    return QB({text:V(`Năm nay ${a} ${P} tuổi, ${b} ${c} tuổi. Hỏi sau bao nhiêu năm nữa thì tổng số tuổi của hai người là ${T} tuổi?`, `This year ${ae} is ${P} and ${be} is ${c}. In how many years will their ages add up to ${T}?`), tpl:`[_] ${v('năm', 'years')}`, ans:[n],
      hint:V('Mỗi năm trôi qua, mỗi người thêm 1 tuổi, nên tổng số tuổi tăng thêm 2.', 'Each year both get 1 year older, so the total grows by 2.'),
      sol:L2([`Tổng số tuổi hiện nay: ${P} + ${c} = ${P + c}`, `Tổng tăng thêm: ${T} − ${P + c} = ${2 * n}`, `Số năm: ${2 * n} : 2 = ${Bb(n)} (năm)`], [`Total now: ${P} + ${c} = ${P + c}`, `Increase: ${T} − ${P + c} = ${2 * n}`, `Years: ${2 * n} : 2 = ${Bb(n)}`])}); }
  const n = R(2, 10), S = P + c;
  return QB({text:V(`Hiện nay tổng số tuổi của ${a} và ${b} là ${S} tuổi, ${a} hơn ${b} ${h} tuổi. Hỏi ${n} năm nữa ${b} bao nhiêu tuổi?`, `Now ${ae} and ${be} are ${S} years old in total, and ${ae} is ${h} years older. How old will ${be} be in ${n} years?`), tpl:`[_] ${v('tuổi', 'years old')}`, ans:[c + n],
    hint:V(`Tìm tuổi ${b} hiện nay trước (tổng – hiệu), rồi cộng thêm ${n}.`, `First find ${be}'s age now (sum and difference), then add ${n}.`),
    sol:L2([`${cap(b)} hiện nay: (${S} − ${h}) : 2 = ${c} (tuổi)`, `${n} năm nữa: ${c} + ${n} = ${Bb(c + n)} (tuổi)`], [`${cap(be)} now: (${S} − ${h}) : 2 = ${c}`, `In ${n} years: ${c} + ${n} = ${Bb(c + n)}`])});
};
const tdAge2 = lv => { const [a, ae, b, be, h1, h2] = pick(PAIRS), h = R(h1, h2), c = R(6, 15), P = c + h, n = R(2, Math.min(5, c - 1));
  const S = lv === 1 ? P + c : lv === 2 ? P + c + 2 * n : P + c - 2 * n;
  const when = lv === 1 ? ['Hiện nay tổng', 'Now the sum'] : lv === 2 ? [`${n} năm nữa tổng`, `In ${n} years the sum`] : [`Cách đây ${n} năm tổng`, `${n} years ago the sum`];
  return QB({text:V(`${when[0]} số tuổi của ${a} và ${b} là ${S} tuổi. Biết ${a} hơn ${b} ${h} tuổi. Tính tuổi của mỗi người hiện nay.`, `${when[1]} of the ages of ${ae} and ${be} is ${S}. ${cap(ae)} is ${h} years older. How old is each of them now?`),
    tpl:`${cap(a)}: [_] &nbsp; ${cap(b)}: [_]`, ans:[P, c],
    hint:lv === 1 ? V('Dùng cách tìm hai số biết tổng và hiệu.', 'Use the sum-and-difference method.') : V(`Đổi về tổng số tuổi HIỆN NAY trước: mỗi năm tổng thay đổi 2 tuổi.`, `First find the total age NOW: the total changes by 2 every year.`),
    sol:L2([...(lv === 1 ? [] : [`Tổng hiện nay: ${S} ${lv === 2 ? '−' : '+'} ${n} × 2 = ${P + c}`]), `${cap(b)}: (${P + c} − ${h}) : 2 = ${Bb(c)} (tuổi)`, `${cap(a)}: ${c} + ${h} = ${Bb(P)} (tuổi)`],
           [...(lv === 1 ? [] : [`Total now: ${S} ${lv === 2 ? '−' : '+'} ${n} × 2 = ${P + c}`]), `${cap(be)}: (${P + c} − ${h}) : 2 = ${Bb(c)}`, `${cap(ae)}: ${c} + ${h} = ${Bb(P)}`])});
};
const tdAge3 = lv => { const [a, ae, b, be, h1, h2] = pick(PAIRS), h = R(h1, h2), c = R(4, 14), P = c + h, n = R(3, 12);
  if(lv === 1) return qc({text:V(`Năm nay ${a} hơn ${b} ${h} tuổi. Sau ${n} năm nữa, ${a} hơn ${b} bao nhiêu tuổi?`, `This year ${ae} is ${h} years older than ${be}. In ${n} years, how much older will ${ae} be?`), compact:true,
    hint:V('Cả hai người cùng thêm tuổi như nhau.', 'Both people get older by the same amount.'),
    sol:L2([`Hiệu số tuổi không đổi: vẫn hơn ${Bb(h)} tuổi.`], [`The difference never changes: still ${Bb(h)} years.`])}, bin(`${h} tuổi`, `${h} years`), [bin(`${h + n} tuổi`, `${h + n} years`), bin(`${h + 2 * n} tuổi`, `${h + 2 * n} years`), bin(`${Math.max(1, h - n) === h ? h + 1 : Math.max(1, h - n)} tuổi`, `${Math.max(1, h - n) === h ? h + 1 : Math.max(1, h - n)} years`)]);
  if(lv === 2) return QB({text:V(`Sau ${n} năm nữa, tổng số tuổi của ${a} và ${b} tăng thêm bao nhiêu tuổi?`, `In ${n} years, by how much will the total age of ${ae} and ${be} increase?`), tpl:`[_] ${v('tuổi', 'years')}`, ans:[2 * n],
    hint:V('Mỗi năm, mỗi người thêm 1 tuổi.', 'Each year, each person gets 1 year older.'), sol:L2([`${n} × 2 = ${Bb(2 * n)} (tuổi)`], [`${n} × 2 = ${Bb(2 * n)} (years)`])});
  return QB({text:V(`Năm nay ${a} ${P} tuổi, ${b} ${c} tuổi. Hỏi khi ${b} bằng tuổi ${a} hiện nay thì ${a} bao nhiêu tuổi?`, `This year ${ae} is ${P} and ${be} is ${c}. When ${be} is as old as ${ae} is now, how old will ${ae} be?`), tpl:`[_] ${v('tuổi', 'years old')}`, ans:[P + h],
    hint:V(`${cap(b)} cần thêm bao nhiêu năm để được ${P} tuổi? ${cap(a)} cũng thêm chừng ấy năm.`, `How many years until ${be} is ${P}? ${cap(ae)} gets that many years older too.`),
    sol:L2([`Số năm: ${P} − ${c} = ${h} (năm)`, `${cap(a)} khi đó: ${P} + ${h} = ${Bb(P + h)} (tuổi)`], [`Years needed: ${P} − ${c} = ${h}`, `${cap(ae)} then: ${P} + ${h} = ${Bb(P + h)}`])});
};
lesson(51, 'td-bai-toan-tinh-tuoi', 'Bài toán tính tuổi', 'Hiệu số tuổi không đổi; mỗi năm tổng số tuổi hai người tăng 2; tổng – hiệu về tuổi.', [tdAge3, tdAge1, tdAge2], {
  bi:true, en:'Age problems', descEn:'The age difference never changes; the total grows by 2 each year; sum and difference of ages.',
  intro:[
    {t:['Hiệu số tuổi không đổi', 'The age gap never changes'], b:['Mỗi năm ai cũng thêm 1 tuổi, nên hai người luôn hơn kém nhau đúng một số tuổi.', 'Everyone gets 1 year older each year, so the gap between two people stays the same forever.'], ex:['Mẹ hơn con 25 tuổi thì 10 năm nữa mẹ vẫn hơn con 25 tuổi.', 'If Mum is 25 years older now, she is still 25 years older in 10 years.']},
    {t:['Tổng số tuổi thay đổi 2 mỗi năm', 'The total changes by 2 each year'], b:['Hai người: sau n năm tổng tuổi <b>tăng n × 2</b>; cách đây n năm tổng tuổi <b>ít hơn n × 2</b>.', 'For two people: in n years the total <b>grows by n × 2</b>; n years ago it was <b>n × 2 smaller</b>.']},
    {t:['Cách làm', 'How to solve'], b:['① Đưa về tổng và hiệu số tuổi ở <b>cùng một thời điểm</b>. ② Dùng Số lớn = (Tổng + Hiệu) : 2.', '① Find the total and the gap at the <b>same moment</b>. ② Use Larger = (Sum + Difference) : 2.']}]});

/* ---------------------------------------------------------------- BÀI 4. TÍNH NGƯỢC, ĐIỀN CHỮ SỐ, CÂU ĐỐ SỐ */
const tdBack = lv => { const [X] = two();
  if(lv === 1){ const x = R(10, 99), a = R(10, 90), b = R(5, x + a - 5), r = x + a - b;
    return QB({text:V(`${X} nghĩ một số. Lấy số đó cộng ${a} rồi trừ đi ${b} thì được ${r}. Số ${X} nghĩ là số nào?`, `${X} thinks of a number, adds ${a}, then subtracts ${b} and gets ${r}. What was the number?`), tpl:'[_]', ans:[x],
      hint:V('Tính ngược từ cuối lên đầu: trừ thì đổi thành cộng, cộng thì đổi thành trừ.', 'Work backwards from the end: undo subtraction by adding, undo addition by subtracting.'),
      sol:L2([`Trước khi trừ ${b}: ${r} + ${b} = ${r + b}`, `Trước khi cộng ${a}: ${r + b} − ${a} = ${Bb(x)}`], [`Before −${b}: ${r} + ${b} = ${r + b}`, `Before +${a}: ${r + b} − ${a} = ${Bb(x)}`])}); }
  if(lv === 2){ const x = R(12, 45), k = R(3, 9), b = R(5, Math.min(40, x * k - 5)), r = x * k - b;
    return QB({text:V(`${X} lấy một số nhân với ${k}, rồi trừ tích đó đi ${b} thì được ${r}. Số đó là bao nhiêu?`, `${X} multiplied a number by ${k}, then subtracted ${b} from the product and got ${r}. What was the number?`), tpl:'[_]', ans:[x],
      hint:V('Tính ngược: trừ ↔ cộng, nhân ↔ chia.', 'Work backwards: − becomes +, × becomes :.'),
      sol:L2([`Tích là: ${r} + ${b} = ${r + b}`, `Số đó: ${r + b} : ${k} = ${Bb(x)}`], [`Product: ${r} + ${b} = ${r + b}`, `Number: ${r + b} : ${k} = ${Bb(x)}`])}); }
  const x = R(5, 30), a = R(2, 20), k = R(2, 6), b = R(3, Math.min(40, (x + a) * k - 5)), r = (x + a) * k - b;
  return QB({text:V(`Một số cộng với ${a}, được bao nhiêu nhân với ${k}, rồi trừ đi ${b} thì được ${r}. Tìm số đó.`, `A number is increased by ${a}, the result is multiplied by ${k}, then ${b} is subtracted, giving ${r}. Find the number.`), tpl:'[_]', ans:[x],
    hint:V('Làm ngược ba bước, bắt đầu từ bước cuối cùng.', 'Undo the three steps, starting with the last one.'),
    sol:L2([`${r} + ${b} = ${r + b}`, `${r + b} : ${k} = ${x + a}`, `${x + a} − ${a} = ${Bb(x)}`], [`${r} + ${b} = ${r + b}`, `${r + b} : ${k} = ${x + a}`, `${x + a} − ${a} = ${Bb(x)}`])});
};
const hideDig = (n, i) => { const s = String(n); return s.slice(0, i) + '[_]' + s.slice(i + 1); };
const boldDig = (n, i) => { const s = String(n); return s.slice(0, i) + `<b>${s[i]}</b>` + s.slice(i + 1); };
const tdDigit = lv => {
  const hint = V('Tính từ hàng đơn vị sang trái, nhớ số nhớ ở mỗi hàng.', 'Work from the ones column to the left, remembering any carry.');
  if(lv < 3){ let a, b, i, j; do { a = R(100, 899); b = R(100, 999 - a > 99 ? 999 : 899); i = R(0, 2); j = lv === 1 ? -1 : R(0, 2); } while(a + b > 1999 || (lv === 2 && i === j));
    const c = a + b, dA = +String(a)[i], dB = j >= 0 ? +String(b)[j] : null;
    return QB({text:V('Điền chữ số thích hợp vào ô trống:', 'Fill in the missing digit' + (lv === 2 ? 's:' : ':')), tpl:`<span class="eq">${hideDig(a, i)} + ${j >= 0 ? hideDig(b, j) : b} = ${c}</span>`, ans:j >= 0 ? [dA, dB] : [dA],
      hint, sol:L2([`${boldDig(a, i)} + ${j >= 0 ? boldDig(b, j) : b} = ${c}`], [`${boldDig(a, i)} + ${j >= 0 ? boldDig(b, j) : b} = ${c}`])}); }
  let b, c, i, j; do { b = R(100, 999); c = R(1000, 8999); i = R(0, 3); j = R(0, 3); } while(b + c > 9999 || i === j);
  const a = b + c;
  return QB({text:V('Điền chữ số thích hợp vào ô trống:', 'Fill in the missing digits:'), tpl:`<span class="eq">${hideDig(a, i)} − ${b} = ${hideDig(c, j)}</span>`, ans:[+String(a)[i], +String(c)[j]],
    hint:V('Phép trừ: Số bị trừ = Hiệu + Số trừ. Thử lại bằng phép cộng từ hàng đơn vị.', 'Subtraction: check with addition (difference + subtrahend = minuend), from the ones column.'),
    sol:L2([`${boldDig(a, i)} − ${b} = ${boldDig(c, j)}`, `Thử lại: ${c} + ${b} = ${a}`], [`${boldDig(a, i)} − ${b} = ${boldDig(c, j)}`, `Check: ${c} + ${b} = ${a}`])});
};
const tdConsec = lv => {
  if(lv === 1){ const n = R(20, 500), S = 2 * n + 1;
    return QB({text:V(`Tổng của hai số tự nhiên liên tiếp là ${S}. Tìm số lớn hơn.`, `Two consecutive whole numbers add up to ${S}. Find the larger one.`), tpl:'[_]', ans:[n + 1],
      hint:V('Hai số liên tiếp hơn kém nhau 1: tổng – hiệu với hiệu bằng 1.', 'Consecutive numbers differ by 1: use sum and difference with difference 1.'),
      sol:L2([`(${S} + 1) : 2 = ${Bb(n + 1)}`], [`(${S} + 1) : 2 = ${Bb(n + 1)}`])}); }
  if(lv === 2){ const n = R(20, 300), S = 3 * n + 3;
    return QB({text:V(`Tổng của ba số tự nhiên liên tiếp là ${S}. Tìm số bé nhất.`, `Three consecutive whole numbers add up to ${S}. Find the smallest one.`), tpl:'[_]', ans:[n],
      hint:V('Số ở giữa bằng tổng chia 3.', 'The middle number is the sum divided by 3.'),
      sol:L2([`Số ở giữa: ${S} : 3 = ${n + 1}`, `Số bé nhất: ${n + 1} − 1 = ${Bb(n)}`], [`Middle: ${S} : 3 = ${n + 1}`, `Smallest: ${n + 1} − 1 = ${Bb(n)}`])}); }
  const e = 2 * R(10, 150), S = 3 * e + 6;
  return QB({text:V(`Tổng của ba số chẵn liên tiếp là ${S}. Tìm số lớn nhất.`, `Three consecutive even numbers add up to ${S}. Find the largest one.`), tpl:'[_]', ans:[e + 4],
    hint:V('Ba số chẵn liên tiếp hơn kém nhau 2; số ở giữa bằng tổng chia 3.', 'Consecutive even numbers differ by 2; the middle one is the sum divided by 3.'),
    sol:L2([`Số ở giữa: ${S} : 3 = ${e + 2}`, `Số lớn nhất: ${e + 2} + 2 = ${Bb(e + 4)}`], [`Middle: ${S} : 3 = ${e + 2}`, `Largest: ${e + 2} + 2 = ${Bb(e + 4)}`])});
};
lesson(51, 'td-dien-chu-so-cau-do-so', 'Tính ngược, điền chữ số, câu đố số', 'Tính ngược từ kết quả; điền chữ số còn thiếu trong phép cộng, trừ; số liên tiếp.', [tdBack, tdConsec, tdDigit], {
  bi:true, en:'Working backwards, missing digits and number riddles', descEn:'Work backwards from a result; fill in missing digits; consecutive numbers.',
  intro:[
    {t:['Tính ngược từ cuối lên đầu', 'Work backwards'], b:['Đi ngược các bước và dùng phép tính ngược: cộng ↔ trừ, nhân ↔ chia.', 'Go through the steps in reverse and undo each one: + ↔ −, × ↔ :.'], ex:['Nhân 7 rồi trừ 13 được 141 ⇒ (141 + 13) : 7 = 22.', '×7 then −13 gives 141 ⇒ (141 + 13) : 7 = 22.']},
    {t:['Điền chữ số còn thiếu', 'Missing digits'], b:['Làm từ hàng đơn vị sang trái, chú ý số nhớ. Phép trừ thì thử lại bằng phép cộng.', 'Work from the ones column leftwards and watch the carries. Check subtractions with addition.']},
    {t:['Số liên tiếp', 'Consecutive numbers'], b:['Hai số liên tiếp hơn kém 1. Ba số liên tiếp: <b>số giữa = tổng : 3</b>. Số chẵn (lẻ) liên tiếp hơn kém 2.', 'Consecutive numbers differ by 1. For three of them, <b>middle = sum : 3</b>. Consecutive even (odd) numbers differ by 2.']}]});

/* ---------------------------------------------------------------- BÀI 5. TRỒNG CÂY – KHOẢNG CÁCH */
const tdLine = lv => { const d = R(2, 10);
  if(lv === 1){ const n = R(5, 20), dd = R(3, 20);
    return QB({text:V(`Dọc một con đường có ${n} cột điện, hai cột liền nhau cách nhau ${dd} m. Hỏi từ cột đầu tiên đến cột cuối cùng dài bao nhiêu mét?`, `There are ${n} poles along a road, ${dd} m apart. What is the distance from the first pole to the last one?`), tpl:'[_] m', ans:[(n - 1) * dd],
      hint:V('Số khoảng cách = Số cột − 1.', 'Number of gaps = Number of poles − 1.'),
      sol:L2([`Số khoảng cách: ${n} − 1 = ${n - 1}`, `Độ dài: ${n - 1} × ${dd} = ${Bb((n - 1) * dd)} (m)`], [`Gaps: ${n} − 1 = ${n - 1}`, `Distance: ${n - 1} × ${dd} = ${Bb((n - 1) * dd)} (m)`])}); }
  const k = R(8, 45), L = k * d, ends = lv === 2;
  return QB({text:V(`Người ta trồng cây dọc một đoạn đường dài ${L} m, cây nọ cách cây kia ${d} m${ends ? ', có trồng ở cả hai đầu đường' : ', <b>không</b> trồng ở hai đầu đường'}. Hỏi cần bao nhiêu cây?`,
      `Trees are planted along a ${L} m path, ${d} m apart${ends ? ', with a tree at both ends' : ', with <b>no</b> tree at either end'}. How many trees are needed?`), tpl:`[_] ${v('cây', 'trees')}`, ans:[ends ? k + 1 : k - 1],
    hint:ends ? V('Có cây ở hai đầu: Số cây = Số khoảng + 1.', 'Trees at both ends: Trees = Gaps + 1.') : V('Không trồng ở hai đầu: Số cây = Số khoảng − 1.', 'No trees at the ends: Trees = Gaps − 1.'),
    sol:L2([`Số khoảng: ${L} : ${d} = ${k}`, `Số cây: ${k} ${ends ? '+' : '−'} 1 = ${Bb(ends ? k + 1 : k - 1)} (cây)`], [`Gaps: ${L} : ${d} = ${k}`, `Trees: ${k} ${ends ? '+' : '−'} 1 = ${Bb(ends ? k + 1 : k - 1)}`])});
};
const tdClosed = lv => { const d = R(2, 8);
  if(lv === 1){ const k = R(10, 60), P = k * d;
    return QB({text:V(`Quanh một hồ nước có chu vi ${P} m, người ta trồng cây cách nhau ${d} m. Hỏi trồng được bao nhiêu cây?`, `Trees are planted ${d} m apart all around a lake with a perimeter of ${P} m. How many trees are there?`), tpl:`[_] ${v('cây', 'trees')}`, ans:[k],
      hint:V('Trồng khép kín (vòng quanh): Số cây = Số khoảng.', 'Around a closed shape: Trees = Gaps.'), sol:L2([`${P} : ${d} = ${Bb(k)} (cây)`], [`${P} : ${d} = ${Bb(k)} (trees)`])}); }
  if(lv === 2){ const m = R(3, 15), a = m * d;
    return QB({text:V(`Một mảnh vườn hình vuông cạnh ${a} m. Người ta trồng cây quanh vườn, ở 4 góc đều có cây, cây nọ cách cây kia ${d} m. Hỏi trồng bao nhiêu cây?`, `A square garden has sides of ${a} m. Trees are planted around it ${d} m apart, with a tree at each corner. How many trees are planted?`), tpl:`[_] ${v('cây', 'trees')}`, ans:[4 * m],
      hint:V('Tính chu vi rồi áp dụng: trồng khép kín thì số cây = số khoảng.', 'Find the perimeter; around a closed shape, trees = gaps.'),
      sol:L2([`Chu vi: ${a} × 4 = ${4 * a} (m)`, `Số cây: ${4 * a} : ${d} = ${Bb(4 * m)} (cây)`], [`Perimeter: ${a} × 4 = ${4 * a} (m)`, `Trees: ${4 * a} : ${d} = ${Bb(4 * m)}`])}); }
  const k = R(8, 40), L = k * d;
  return QB({text:V(`Hai bên một con đường dài ${L} m, mỗi bên trồng một hàng cây, cây nọ cách cây kia ${d} m, cả hai đầu đường đều có cây. Hỏi trồng tất cả bao nhiêu cây?`, `A ${L} m road has a row of trees on each side, ${d} m apart, with trees at both ends. How many trees are there altogether?`), tpl:`[_] ${v('cây', 'trees')}`, ans:[2 * (k + 1)],
    hint:V('Tính số cây của một bên trước rồi nhân 2.', 'Find the trees on one side first, then multiply by 2.'),
    sol:L2([`Một bên: ${L} : ${d} + 1 = ${k + 1} (cây)`, `Hai bên: ${k + 1} × 2 = ${Bb(2 * (k + 1))} (cây)`], [`One side: ${L} : ${d} + 1 = ${k + 1}`, `Both sides: ${k + 1} × 2 = ${Bb(2 * (k + 1))}`])});
};
const tdCut = lv => {
  if(lv < 3){ const n = R(4, 15), t = R(2, 9);
    return QB({text:lv === 1 ? V(`Cưa một khúc gỗ thành ${n} đoạn thì phải cưa bao nhiêu lần?`, `How many cuts are needed to saw a log into ${n} pieces?`) : V(`Cưa một khúc gỗ thành ${n} đoạn, mỗi lần cưa mất ${t} phút. Hỏi cưa xong hết bao nhiêu phút?`, `A log is sawn into ${n} pieces. Each cut takes ${t} minutes. How long does it take altogether?`),
      tpl:lv === 1 ? `[_] ${v('lần', 'cuts')}` : `[_] ${v('phút', 'minutes')}`, ans:[lv === 1 ? n - 1 : (n - 1) * t],
      hint:V('Các đoạn gỗ giống các “cây”, vết cưa giống “khoảng cách” ở giữa: số lần cưa = số đoạn − 1.', 'Pieces are like “trees” and cuts are the gaps between them: cuts = pieces − 1.'),
      sol:L2([`Số lần cưa: ${n} − 1 = ${lv === 1 ? Bb(n - 1) : n - 1}`, ...(lv === 1 ? [] : [`Thời gian: ${n - 1} × ${t} = ${Bb((n - 1) * t)} (phút)`])], [`Cuts: ${n} − 1 = ${lv === 1 ? Bb(n - 1) : n - 1}`, ...(lv === 1 ? [] : [`Time: ${n - 1} × ${t} = ${Bb((n - 1) * t)} (minutes)`])])}); }
  const k = R(3, 12), s = R(12, 24);
  return QB({text:V(`Mỗi tầng cầu thang của một tòa nhà có ${s} bậc. Đi từ tầng 1 (mặt đất) lên tầng ${k} phải bước qua bao nhiêu bậc?`, `Each flight of stairs in a building has ${s} steps. How many steps do you climb from floor 1 (ground) to floor ${k}?`), tpl:`[_] ${v('bậc', 'steps')}`, ans:[(k - 1) * s],
    hint:V(`Từ tầng 1 lên tầng ${k} chỉ đi qua ${k} − 1 đợt cầu thang.`, `From floor 1 to floor ${k} you only climb ${k} − 1 flights.`),
    sol:L2([`Số đợt cầu thang: ${k} − 1 = ${k - 1}`, `Số bậc: ${k - 1} × ${s} = ${Bb((k - 1) * s)}`], [`Flights: ${k} − 1 = ${k - 1}`, `Steps: ${k - 1} × ${s} = ${Bb((k - 1) * s)}`])});
};
lesson(51, 'td-trong-cay-khoang-cach', 'Bài toán trồng cây và khoảng cách', 'Quan hệ giữa số cây (cột, đoạn) và số khoảng cách: hai đầu, không có đầu, khép kín.', [tdLine, tdClosed, tdCut], {
  bi:true, en:'Trees and gaps', descEn:'How the number of trees (poles, pieces) relates to the number of gaps: open rows and closed loops.',
  intro:[
    {t:['Hàng cây có cây ở hai đầu', 'A row with trees at both ends'], b:['<b>Số cây = Số khoảng + 1</b>; Số khoảng = Độ dài : Khoảng cách.', '<b>Trees = Gaps + 1</b>; Gaps = Length : Distance apart.'], ex:['Đường 20 m, cách 5 m ⇒ 4 khoảng ⇒ 5 cây.', 'A 20 m path, 5 m apart ⇒ 4 gaps ⇒ 5 trees.'], fig:treesSVG(5, false)},
    {t:['Không trồng ở hai đầu', 'No trees at the ends'], b:['<b>Số cây = Số khoảng − 1</b>. Trồng ở một đầu: Số cây = Số khoảng.', '<b>Trees = Gaps − 1</b>. A tree at only one end: Trees = Gaps.']},
    {t:['Trồng khép kín (quanh hồ, quanh vườn)', 'Closed loops (around a lake or a garden)'], b:['<b>Số cây = Số khoảng = Chu vi : Khoảng cách</b>. Cưa gỗ: số lần cưa = số đoạn − 1.', '<b>Trees = Gaps = Perimeter : Distance apart</b>. Sawing: cuts = pieces − 1.'], fig:treesSVG(6, true)}]});

/* ---------------------------------------------------------------- BÀI 6. THỪA – THIẾU, CHÊNH LỆCH */
const tdMoney = lv => { const [X] = two(), p = R(3, 12), a = R(2, 6), b = a + R(2, 5);
  if(lv < 3){ const r2 = R(1, (b - a) * p - 1), M = b * p - r2, r1 = M - a * p;
    return QB({text:V(`${X} mang một số tiền đi mua vở. Nếu mua ${a} quyển thì còn thừa ${r1} nghìn đồng; nếu mua ${b} quyển thì thiếu ${r2} nghìn đồng. ${lv === 1 ? 'Hỏi giá một quyển vở là bao nhiêu?' : `Hỏi ${X} mang theo bao nhiêu tiền?`}`,
        `${X} goes to buy notebooks. Buying ${a} leaves ${r1} thousand dong; buying ${b} would need ${r2} thousand dong more. ${lv === 1 ? 'How much does one notebook cost?' : `How much money does ${X} have?`}`),
      tpl:`[_] ${v('nghìn đồng', 'thousand dong')}`, ans:[lv === 1 ? p : M],
      hint:V(`Mua thêm ${b} − ${a} quyển thì số tiền chênh lệch là thừa + thiếu.`, `Buying ${b} − ${a} more notebooks costs the leftover plus the shortage.`),
      sol:L2([`Số vở chênh: ${b} − ${a} = ${b - a} (quyển)`, `Tiền chênh: ${r1} + ${r2} = ${r1 + r2} (nghìn đồng)`, `Giá một quyển: ${r1 + r2} : ${b - a} = ${lv === 1 ? Bb(p) : p} (nghìn đồng)`, ...(lv === 1 ? [] : [`Số tiền: ${a} × ${p} + ${r1} = ${Bb(M)} (nghìn đồng)`])],
             [`Extra notebooks: ${b} − ${a} = ${b - a}`, `Money gap: ${r1} + ${r2} = ${r1 + r2}`, `One notebook: ${r1 + r2} : ${b - a} = ${lv === 1 ? Bb(p) : p}`, ...(lv === 1 ? [] : [`Money: ${a} × ${p} + ${r1} = ${Bb(M)}`])])}); }
  const r2 = R(1, 10), r1 = r2 + (b - a) * p, M = a * p + r1;
  return QB({text:V(`${X} có một số tiền. Nếu mua ${a} quyển vở thì còn thừa ${r1} nghìn đồng; nếu mua ${b} quyển vở thì vẫn còn thừa ${r2} nghìn đồng. Hỏi ${X} có bao nhiêu tiền?`, `${X} has some money. Buying ${a} notebooks leaves ${r1} thousand dong; buying ${b} notebooks still leaves ${r2} thousand dong. How much money does ${X} have?`),
    tpl:`[_] ${v('nghìn đồng', 'thousand dong')}`, ans:[M],
    hint:V('Cả hai lần đều thừa: tiền chênh = thừa nhiều − thừa ít.', 'Money left both times: the gap = bigger leftover − smaller leftover.'),
    sol:L2([`Tiền chênh: ${r1} − ${r2} = ${r1 - r2} ứng với ${b - a} quyển`, `Giá một quyển: ${r1 - r2} : ${b - a} = ${p}`, `Số tiền: ${a} × ${p} + ${r1} = ${Bb(M)} (nghìn đồng)`], [`Gap: ${r1} − ${r2} = ${r1 - r2} for ${b - a} notebooks`, `One notebook: ${r1 - r2} : ${b - a} = ${p}`, `Money: ${a} × ${p} + ${r1} = ${Bb(M)}`])});
};
const tdShare = lv => { const n = R(5, 15), a = R(2, 5), b = a + R(1, 3);
  if(lv < 3){ const r1 = R(1, (b - a) * n - 1), K = a * n + r1, r2 = b * n - K;
    return QB({text:V(`Cô giáo chia kẹo cho các bạn. Nếu mỗi bạn ${a} cái thì thừa ${r1} cái; nếu mỗi bạn ${b} cái thì thiếu ${r2} cái. Hỏi ${lv === 1 ? 'có bao nhiêu bạn' : 'có bao nhiêu bạn và bao nhiêu cái kẹo'}?`,
        `The teacher shares candies. If each pupil gets ${a}, ${r1} are left over; if each gets ${b}, ${r2} are missing. How many ${lv === 1 ? 'pupils are there' : 'pupils and candies are there'}?`),
      tpl:lv === 1 ? `[_] ${v('bạn', 'pupils')}` : `[_] ${v('bạn', 'pupils')} &nbsp; [_] ${v('cái kẹo', 'candies')}`, ans:lv === 1 ? [n] : [n, K],
      hint:V(`Mỗi bạn nhận thêm ${b} − ${a} cái thì cần thêm: số thừa + số thiếu.`, `Giving each pupil ${b} − ${a} more needs the leftover plus the shortage.`),
      sol:L2([`Mỗi bạn thêm: ${b} − ${a} = ${b - a} (cái)`, `Cần thêm: ${r1} + ${r2} = ${r1 + r2} (cái)`, `Số bạn: ${r1 + r2} : ${b - a} = ${Bb(n)}`, ...(lv === 1 ? [] : [`Số kẹo: ${a} × ${n} + ${r1} = ${Bb(K)}`])],
             [`Extra per pupil: ${b} − ${a} = ${b - a}`, `Extra needed: ${r1} + ${r2} = ${r1 + r2}`, `Pupils: ${r1 + r2} : ${b - a} = ${Bb(n)}`, ...(lv === 1 ? [] : [`Candies: ${a} × ${n} + ${r1} = ${Bb(K)}`])])}); }
  const r3 = R(1, a * n - 1), K = a * n - r3, r2 = b * n - K;
  return QB({text:V(`Chia kẹo cho các bạn: nếu mỗi bạn ${b} cái thì thiếu ${r2} cái; nếu mỗi bạn ${a} cái thì vẫn thiếu ${r3} cái. Hỏi có bao nhiêu bạn và bao nhiêu cái kẹo?`, `Sharing candies: if each pupil gets ${b}, ${r2} are missing; if each gets ${a}, ${r3} are still missing. How many pupils and candies are there?`),
    tpl:`[_] ${v('bạn', 'pupils')} &nbsp; [_] ${v('cái kẹo', 'candies')}`, ans:[n, K],
    hint:V('Cả hai lần đều thiếu: chênh lệch = thiếu nhiều − thiếu ít.', 'Short both times: the gap = bigger shortage − smaller shortage.'),
    sol:L2([`Chênh: ${r2} − ${r3} = ${r2 - r3} (cái), mỗi bạn chênh ${b - a} cái`, `Số bạn: ${r2 - r3} : ${b - a} = ${Bb(n)}`, `Số kẹo: ${a} × ${n} − ${r3} = ${Bb(K)}`], [`Gap: ${r2} − ${r3} = ${r2 - r3}, ${b - a} per pupil`, `Pupils: ${r2 - r3} : ${b - a} = ${Bb(n)}`, `Candies: ${a} × ${n} − ${r3} = ${Bb(K)}`])});
};
const tdDiff = lv => {
  if(lv < 3){ const p = R(2, 9), q = R(4, 15), a = R(2, 6), b1 = R(1, 4), b2 = b1 + R(1, 4), X = a * q + b1 * p, Y = a * q + b2 * p;
    return QB({text:V(`Mua ${a} quyển vở và ${b1} cái bút hết ${X} nghìn đồng. Mua ${a} quyển vở và ${b2} cái bút hết ${Y} nghìn đồng. ${lv === 1 ? 'Giá một cái bút là bao nhiêu?' : 'Giá một cái bút và một quyển vở là bao nhiêu?'}`,
        `${a} notebooks and ${b1} pens cost ${X} thousand dong. ${a} notebooks and ${b2} pens cost ${Y} thousand dong. ${lv === 1 ? 'How much is one pen?' : 'How much is one pen and one notebook?'}`),
      tpl:lv === 1 ? `[_] ${v('nghìn đồng', 'thousand dong')}` : `${v('Bút', 'Pen')}: [_] &nbsp; ${v('Vở', 'Notebook')}: [_]`, ans:lv === 1 ? [p] : [p, q],
      hint:V('Hai lần mua có cùng số vở: tiền chênh chính là tiền của số bút mua thêm.', 'Both times the notebooks are the same: the price gap is the cost of the extra pens.'),
      sol:L2([`Bút thêm: ${b2} − ${b1} = ${b2 - b1}; tiền thêm: ${Y} − ${X} = ${Y - X}`, `Một cái bút: ${Y - X} : ${b2 - b1} = ${Bb(p)}`, ...(lv === 1 ? [] : [`Một quyển vở: (${X} − ${b1} × ${p}) : ${a} = ${Bb(q)}`])],
             [`Extra pens: ${b2 - b1}; extra cost: ${Y} − ${X} = ${Y - X}`, `One pen: ${Y - X} : ${b2 - b1} = ${Bb(p)}`, ...(lv === 1 ? [] : [`One notebook: (${X} − ${b1} × ${p}) : ${a} = ${Bb(q)}`])])}); }
  const [X, Y] = two(); let h, k; do { h = R(4, 30); k = R(2, 15); } while(2 * k === h);
  const good = 2 * k < h ? bin(`${X} hơn ${Y} ${h - 2 * k} viên`, `${X} has ${h - 2 * k} more`) : bin(`${Y} hơn ${X} ${2 * k - h} viên`, `${Y} has ${2 * k - h} more`);
  const w = [bin(`${X} hơn ${Y} ${h - k > 0 ? h - k : h + k} viên`, `${X} has ${h - k > 0 ? h - k : h + k} more`), bin(`${Y} hơn ${X} ${2 * k + h} viên`, `${Y} has ${2 * k + h} more`), bin('Hai bạn bằng nhau', 'They have the same number'), bin(`${X} hơn ${Y} ${h + 2 * k} viên`, `${X} has ${h + 2 * k} more`)].filter(x => x !== good);
  return qc({text:V(`${X} có nhiều hơn ${Y} ${h} viên bi. Nếu ${X} cho ${Y} ${k} viên bi thì khi đó:`, `${X} has ${h} more marbles than ${Y}. If ${X} gives ${Y} ${k} marbles, then:`),
    hint:V(`Cho ${k} viên thì ${X} bớt ${k}, ${Y} thêm ${k}: khoảng chênh thay đổi ${k} + ${k}.`, `Giving ${k}: ${X} loses ${k} and ${Y} gains ${k}, so the gap changes by ${k} + ${k}.`),
    sol:L2([`Khoảng chênh thay đổi: ${k} × 2 = ${2 * k}`, 2 * k < h ? `${X} còn hơn: ${h} − ${2 * k} = <b>${h - 2 * k}</b> viên` : `${Y} lại hơn: ${2 * k} − ${h} = <b>${2 * k - h}</b> viên`],
           [`The gap changes by ${k} × 2 = ${2 * k}`, 2 * k < h ? `${X} still has ${h} − ${2 * k} = <b>${h - 2 * k}</b> more` : `Now ${Y} has ${2 * k} − ${h} = <b>${2 * k - h}</b> more`])}, good, w.slice(0, 3));
};
lesson(51, 'td-thua-thieu-chenh-lech', 'Bài toán thừa – thiếu và lượng chênh lệch', 'Chia đồ vật khi thừa hoặc thiếu; so sánh hai lần mua để tìm giá; cho nhau thì chênh lệch thay đổi thế nào.', [tdDiff, tdShare, tdMoney], {
  bi:true, en:'Leftover and shortage problems', descEn:'Sharing with items left over or missing; comparing two purchases to find prices; how giving changes the gap.',
  intro:[
    {t:['So sánh hai cách chia (thừa – thiếu)', 'Compare the two ways of sharing'], b:['Một lần thừa, một lần thiếu: <b>tổng chênh = thừa + thiếu</b>.<br>Hai lần cùng thừa (hoặc cùng thiếu): <b>chênh = số lớn − số bé</b>.<br><b>Số người = Tổng chênh : chênh mỗi người</b>.', 'Once left over, once short: <b>total gap = leftover + shortage</b>.<br>Left over both times (or short both times): <b>gap = bigger − smaller</b>.<br><b>People = total gap : gap per person</b>.'],
     ex:['Mỗi bạn 3 cái thừa 5, mỗi bạn 5 cái thiếu 7 ⇒ (5 + 7) : (5 − 3) = 6 bạn.', '3 each leaves 5, 5 each is 7 short ⇒ (5 + 7) : (5 − 3) = 6 pupils.']},
    {t:['Lượng chênh lệch khi mua hàng', 'Using the difference between two purchases'], b:['Hai lần mua giống nhau ở một loại hàng ⇒ phần tiền chênh là tiền của phần hàng mua thêm.', 'If two purchases share the same items, the extra money pays for the extra items only.']}]});
}

/* =====================================================================
   🧠 TOÁN TƯ DUY – PHÉP NHÂN VÀ PHÉP CHIA (song ngữ, có kiến thức trọng tâm)
   Nguồn đề: Singapore Math Challenge Word Problems, Grades 4–6 (thầy trích qua NotebookLM).
   Bài 1: Chapter 3 – Making a Supposition (Giả thiết tạm). 10 bài của sách làm khuôn, số liệu đổi mỗi lần.
   ===================================================================== */
{
const V = bi, v = bin, Bb = x => `<b>${fmt(x)}</b>`, L2 = (vi, en) => V(BG(...vi), BG(...en));
G.topics.splice(G.topics.findIndex(t => t.id === 8) + 1, 0, {id:81, hk:1, name:'Phép nhân và phép chia', label:'🧠 Toán tư duy', grp:'🧠 Toán tư duy · Singapore Math'});

/* Bối cảnh giả thiết tạm – theo 10 bài của Chapter 3. A = loại có giá trị nhỏ (a), B = loại có giá trị lớn (b).
   txt(N, T, a, b) → [vi, en]; ask = tên loại khi hỏi; q = đại lượng được cộng lại; per = đơn vị đếm */
const SUP = [
  {A:['xe đạp', 'bicycles'], B:['xe ba bánh', 'tricycles'], ab:() => [2, 3], q:['bánh xe', 'wheels'], per:['chiếc', 'vehicles'],
   txt:(N, T) => [`Cửa hàng có ${N} chiếc xe gồm xe đạp (2 bánh) và xe ba bánh (3 bánh). Tất cả có ${T} bánh xe.`, `A shop has ${N} bicycles and tricycles. Each bicycle has 2 wheels and each tricycle has 3 wheels. There are ${T} wheels in all.`]},
  {A:['con công', 'peacocks'], B:['con mèo', 'cats'], ab:() => [2, 4], q:['chân', 'legs'], per:['con', 'animals'],
   txt:(N, T) => [`Trong công viên có ${N} con gồm công và mèo. Mỗi con công có 2 chân, mỗi con mèo có 4 chân. Bạn Tom đếm được tất cả ${T} chân.`, `There are ${N} peacocks and cats in a park. Each peacock has 2 legs and each cat has 4 legs. Tom counts ${T} legs altogether.`]},
  {A:['con vịt', 'ducks'], B:['con cừu', 'sheep'], ab:() => [2, 4], q:['chân', 'legs'], per:['con', 'animals'],
   txt:(N, T) => [`Có tất cả ${N} con cừu và vịt. Chúng có tất cả ${T} chân.`, `There is a total of ${N} sheep and ducks. They have ${T} legs altogether.`]},
  {A:['hình vuông', 'squares'], B:['hình lục giác', 'hexagons'], ab:() => [4, 6], q:['que diêm', 'matchsticks'], per:['hình', 'shapes'],
   txt:(N, T) => [`Bạn Ron dùng ${T} que diêm xếp được ${N} hình gồm hình vuông (4 que) và hình lục giác (6 que).`, `Ron used ${T} matchsticks to form ${N} squares (4 sticks each) and hexagons (6 sticks each).`]},
  {A:['tờ 20 nghìn đồng', '20-thousand-dong notes'], B:['tờ 50 nghìn đồng', '50-thousand-dong notes'], ab:() => [20, 50], q:['nghìn đồng', 'thousand dong'], per:['tờ', 'notes'],
   txt:(N, T) => [`Có ${N} tờ tiền gồm loại 20 nghìn đồng và loại 50 nghìn đồng, tổng giá trị là ${fmt(T)} nghìn đồng.`, `There are ${N} notes, some worth 20 thousand dong and the rest worth 50 thousand dong. Their total value is ${fmt(T)} thousand dong.`]},
  {A:['câu 2 điểm', '2-point questions'], B:['câu 5 điểm', '5-point questions'], ab:() => [2, 5], q:['điểm', 'points'], per:['câu', 'questions'],
   txt:(N, T) => [`Bài kiểm tra có ${N} câu, gồm câu 2 điểm và câu 5 điểm. Tổng điểm của bài là ${T} điểm.`, `A test has ${N} questions, some worth 2 points and the rest worth 5 points. The test is worth ${T} points in total.`]},
  {A:['quyển sổ tay', 'notebooks'], B:['quyển vở bài tập', 'exercise books'], ab:() => { const a = R(3, 6); return [a, a + R(3, 6)]; }, q:['nghìn đồng', 'thousand dong'], per:['quyển', 'books'], price:true,
   txt:(N, T, a, b) => [`Mai mua ${N} quyển gồm sổ tay (${a} nghìn đồng một quyển) và vở bài tập (${b} nghìn đồng một quyển), trả vừa hết ${T} nghìn đồng.`, `Mai spent exactly ${T} thousand dong on ${N} notebooks (${a} thousand each) and exercise books (${b} thousand each).`]},
  {A:['sợi dây ngắn', 'short ropes'], B:['sợi dây dài', 'long ropes'], ab:() => { const a = R(6, 15); return [a, a + R(8, 25)]; }, q:['cm', 'cm'], per:['sợi', 'ropes'],
   txt:(N, T, a, b) => [`${N} sợi dây gồm dây dài và dây ngắn có tổng chiều dài ${T} cm. Mỗi sợi dây dài dài ${b} cm, mỗi sợi dây ngắn dài ${a} cm.`, `The total length of ${N} long and short ropes is ${T} cm. Each long rope is ${b} cm and each short rope is ${a} cm long.`]}];

const supMake = (big) => { const c = pick(SUP), [a, b] = c.ab(), N = big ? R(15, 40) : R(8, 18); const y = R(1, N - 1), x = N - y, T = x * a + y * b; return {c, a, b, N, x, y, T}; };
const supSol = ({c, a, b, N, x, y, T}, askA) => {
  const [qv, qe] = c.q, [Av, Ae] = c.A, [Bv, Be] = c.B;
  return L2([`Giả sử cả ${N} ${c.per[0]} đều là ${Av}.`, `Khi đó có: ${N} × ${a} = ${fmt(N * a)} (${qv})`, `Còn thiếu: ${fmt(T)} − ${fmt(N * a)} = ${T - N * a} (${qv})`, `Mỗi ${Bv} hơn mỗi ${Av}: ${b} − ${a} = ${b - a} (${qv})`,
      `Số ${Bv}: ${T - N * a} : ${b - a} = ${askA ? y : Bb(y)}`, ...(askA ? [`Số ${Av}: ${N} − ${y} = ${Bb(x)}`] : [])],
    [`Suppose all ${N} ${c.per[1]} were ${Ae}.`, `Then there would be ${N} × ${a} = ${fmt(N * a)} ${qe}`, `Missing: ${fmt(T)} − ${fmt(N * a)} = ${T - N * a} ${qe}`, `Each of the ${Be} has ${b} − ${a} = ${b - a} more`,
      `${Be}: ${T - N * a} : ${b - a} = ${askA ? y : Bb(y)}`, ...(askA ? [`${Ae}: ${N} − ${y} = ${Bb(x)}`] : [])]);
};
const SUP_HINT = V('Giả sử tất cả đều là một loại, tính tổng khi đó, so với thực tế xem chênh bao nhiêu, rồi chia cho chênh lệch của mỗi cái.', 'Suppose they are all the same kind, work out the total, compare with the real total, then divide by the difference per item.');

/* Dạng 1: giả thiết tạm cơ bản (mức 1 hỏi loại tìm ra trước; mức 2 hỏi loại còn lại; mức 3 số lớn, hỏi cả hai) */
const gSup1 = lv => { const d = supMake(lv === 3), {c, x, y} = d, [tv, te] = c.txt(d.N, d.T, d.a, d.b);
  const askA = lv === 2 ? true : lv === 1 ? false : null;
  const qv = lv === 3 ? ` Hỏi có bao nhiêu ${c.A[0]}, bao nhiêu ${c.B[0]}?` : ` Hỏi có bao nhiêu ${askA ? c.A[0] : c.B[0]}?`;
  const qe = lv === 3 ? ` How many ${c.A[1]} and how many ${c.B[1]} are there?` : ` How many ${askA ? c.A[1] : c.B[1]} are there?`;
  return QB({text:V(tv + qv, te + qe), tpl:lv === 3 ? `${v(c.A[0], c.A[1])}: [_] &nbsp; ${v(c.B[0], c.B[1])}: [_]` : `[_] ${v(askA ? c.A[0] : c.B[0], askA ? c.A[1] : c.B[1])}`,
    ans:lv === 3 ? [x, y] : [askA ? x : y], hint:SUP_HINT, sol:supSol(d, lv !== 1)}); };

/* Dạng 2: giải từng bước (Hiểu đề → Giả sử → Tính → Chênh lệch → Đáp số) */
const gSup2 = lv => { const d = supMake(lv === 3), {c, a, b, N, x, y, T} = d, [tv, te] = c.txt(N, T, a, b), [qv, qe] = c.q;
  const lessV = 'Ít hơn thực tế', moreV = 'Nhiều hơn thực tế', eqV = 'Bằng thực tế';
  return QS({direct:lv === 3, text:V(tv + ` Hỏi có bao nhiêu ${c.A[0]}?`, te + ` How many ${c.A[1]} are there?`), hint:SUP_HINT, sol:supSol(d, true), steps:[
    {tag:'Hiểu đề', ask:V(`Nếu giả sử cả ${N} ${c.per[0]} đều là ${c.A[0]} thì tổng số ${qv} sẽ:`, `If all ${N} ${c.per[1]} were ${c.A[1]}, the total number of ${qe} would be:`),
     opts:[v(lessV, 'Less than the real total'), v(moreV, 'More than the real total'), v(eqV, 'Equal to the real total')], ans:v(lessV, 'Less than the real total'),
     hint:V(`Mỗi ${c.A[0]} chỉ có ${a}, ít hơn ${c.B[0]} (${b}).`, `Each of the ${c.A[1]} counts only ${a}, less than ${b}.`)},
    {tag:'Giải', ask:V('Tổng khi giả sử là:', 'The supposed total is:'), tpl:`${N} × ${a} = [_]`, ans:[N * a], hint:V(`Nhân số ${c.per[0]} với ${a}.`, `Multiply the number of ${c.per[1]} by ${a}.`)},
    {tag:'Giải', ask:V('So với thực tế còn thiếu:', 'Compared with the real total, it is short by:'), tpl:`${fmt(T)} − ${fmt(N * a)} = [_]`, ans:[T - N * a], hint:V('Lấy tổng thật trừ tổng giả sử.', 'Real total minus supposed total.')},
    {tag:'Giải', ask:V(`Mỗi ${c.B[0]} hơn mỗi ${c.A[0]}:`, `Each of the ${c.B[1]} has this much more:`), tpl:`${b} − ${a} = [_]`, ans:[b - a], hint:V('Lấy giá trị lớn trừ giá trị nhỏ.', 'Bigger value minus smaller value.')},
    {tag:'Giải', ask:V(`Số ${c.B[0]} là:`, `Number of ${c.B[1]}:`), tpl:`${T - N * a} : ${b - a} = [_]`, ans:[y], hint:V('Mỗi lần thay một cái bằng loại lớn thì tổng tăng thêm phần chênh lệch.', 'Swapping one item for the bigger kind adds the difference once.')},
    {tag:'Đáp số', ask:V(`Số ${c.A[0]} là:`, `Number of ${c.A[1]}:`), tpl:`${N} − ${y} = [_]`, ans:[x], hint:V('Lấy tổng số trừ số vừa tìm.', 'Total count minus the number you just found.')}]}); };

/* Dạng 3: biến thể nâng cao – ba loại (gộp nhóm), “ngắn hơn …”, được – trừ điểm */
const gSup3 = lv => {
  if(lv === 1){ const N = R(12, 30), y = R(2, N - 3), x = N - y, T = 2 * x + 4 * y;
    return QB({text:V(`Có tổng cộng ${N} con gồm gà, mèo và ngựa. Biết tổng số chân là ${T} chân. Hỏi có bao nhiêu con gà?`, `There were ${N} chickens, cats and horses. The total number of legs was ${T}. How many chickens were there?`), tpl:`[_] ${v('con gà', 'chickens')}`, ans:[x],
      hint:V('Mèo và ngựa đều có 4 chân: gộp lại thành một nhóm “con 4 chân”.', 'Cats and horses both have 4 legs: put them together as “4-legged animals”.'),
      sol:L2([`Giả sử cả ${N} con đều là gà: ${N} × 2 = ${2 * N} (chân)`, `Còn thiếu: ${T} − ${2 * N} = ${T - 2 * N} (chân)`, `Số con 4 chân: ${T - 2 * N} : 2 = ${y} (con)`, `Số gà: ${N} − ${y} = ${Bb(x)} (con)`],
             [`Suppose all ${N} were chickens: ${N} × 2 = ${2 * N} legs`, `Missing: ${T} − ${2 * N} = ${T - 2 * N} legs`, `4-legged animals: ${T - 2 * N} : 2 = ${y}`, `Chickens: ${N} − ${y} = ${Bb(x)}`])}); }
  if(lv === 2){ const L = R(30, 60), k = R(4, 12), s = L - k, N = R(10, 20), y = R(2, N - 2), x = N - y, T = y * L + x * s;
    return QB({text:V(`Tổng chiều dài của ${N} sợi dây gồm dây dài và dây ngắn là ${T} cm. Mỗi sợi dây dài dài ${L} cm, mỗi sợi dây ngắn ngắn hơn sợi dây dài ${k} cm. Hỏi có bao nhiêu sợi dây dài?`, `The total length of ${N} long and short ropes is ${T} cm. Each long rope is ${L} cm, and each short rope is ${k} cm shorter than a long rope. How many long ropes are there?`),
      tpl:`[_] ${v('sợi dây dài', 'long ropes')}`, ans:[y], hint:V('Tính chiều dài một sợi dây ngắn trước, rồi giả sử tất cả đều là dây ngắn.', 'First find the length of a short rope, then suppose they are all short.'),
      sol:L2([`Dây ngắn dài: ${L} − ${k} = ${s} (cm)`, `Giả sử cả ${N} sợi đều ngắn: ${N} × ${s} = ${N * s} (cm)`, `Còn thiếu: ${T} − ${N * s} = ${T - N * s} (cm)`, `Số dây dài: ${T - N * s} : ${k} = ${Bb(y)} (sợi)`],
             [`Short rope: ${L} − ${k} = ${s} cm`, `Suppose all ${N} were short: ${N} × ${s} = ${N * s} cm`, `Missing: ${T} − ${N * s} = ${T - N * s} cm`, `Long ropes: ${T - N * s} : ${k} = ${Bb(y)}`])}); }
  const N = R(10, 25), p = R(3, 6), m = R(1, 3); let w, T; do { w = R(1, N - 2); T = (N - w) * p - w * m; } while(T <= 0);
  return QB({text:V(`Trong một trò chơi có ${N} câu hỏi. Mỗi câu trả lời đúng được ${p} điểm, mỗi câu trả lời sai bị trừ ${m} điểm. Bạn Nam trả lời hết ${N} câu và được ${T} điểm. Hỏi Nam trả lời đúng bao nhiêu câu?`, `A quiz has ${N} questions. Each correct answer earns ${p} points and each wrong answer loses ${m} points. Nam answered all ${N} questions and scored ${T} points. How many did he get right?`),
    tpl:`[_] ${v('câu đúng', 'correct')}`, ans:[N - w], hint:V(`Giả sử Nam đúng hết. Mỗi câu sai làm mất ${p} điểm lẽ ra được và còn bị trừ thêm ${m} điểm.`, `Suppose Nam got everything right. Each wrong answer loses the ${p} points he would have earned plus ${m} more.`),
    sol:L2([`Giả sử đúng cả ${N} câu: ${N} × ${p} = ${N * p} (điểm)`, `Bị hụt: ${N * p} − ${T} = ${N * p - T} (điểm)`, `Mỗi câu sai làm hụt: ${p} + ${m} = ${p + m} (điểm)`, `Số câu sai: ${N * p - T} : ${p + m} = ${w}`, `Số câu đúng: ${N} − ${w} = ${Bb(N - w)}`],
           [`Suppose all ${N} were right: ${N} × ${p} = ${N * p}`, `Short by: ${N * p} − ${T} = ${N * p - T}`, `Each wrong answer costs ${p} + ${m} = ${p + m}`, `Wrong: ${N * p - T} : ${p + m} = ${w}`, `Right: ${N} − ${w} = ${Bb(N - w)}`])});
};
lesson(81, 'td-gia-thiet-tam', 'Phương pháp giả thiết tạm', 'Giả sử tất cả cùng một loại, so sánh với thực tế để tìm số lượng mỗi loại (gà – chó, xe đạp – xe ba bánh…).', [gSup1, gSup2, gSup3], {
  bi:true, en:'Making a supposition', descEn:'Suppose everything is the same kind, compare with the real total and find how many of each kind.',
  intro:[
    {t:['Các bước giải', 'The steps'], b:['① <b>Giả sử</b> tất cả đều là loại có giá trị nhỏ.<br>② Tính <b>tổng khi giả sử</b>.<br>③ Tìm <b>phần còn thiếu</b> = tổng thật − tổng giả sử.<br>④ Tìm <b>chênh lệch mỗi cái</b> = giá trị lớn − giá trị nhỏ.<br>⑤ Số cái loại lớn = phần thiếu : chênh lệch mỗi cái.',
      '① <b>Suppose</b> everything is the kind with the smaller value.<br>② Work out the <b>supposed total</b>.<br>③ <b>Missing amount</b> = real total − supposed total.<br>④ <b>Difference per item</b> = bigger value − smaller value.<br>⑤ Number of the bigger kind = missing amount : difference per item.']},
    {t:['Ví dụ (sách Singapore Math, Chapter 3)', 'Worked example (Singapore Math, Chapter 3)'],
     b:['14 chiếc xe đạp (2 bánh) và xe ba bánh (3 bánh) có 37 bánh.<br>Giả sử cả 14 xe là xe đạp: 14 × 2 = 28 bánh; thiếu 37 − 28 = 9 bánh; mỗi xe ba bánh hơn 1 bánh ⇒ 9 xe ba bánh, 14 − 9 = <b>5 xe đạp</b>.',
        '14 bicycles (2 wheels) and tricycles (3 wheels) have 37 wheels.<br>Suppose all 14 are bicycles: 14 × 2 = 28 wheels; 37 − 28 = 9 missing; each tricycle has 1 more ⇒ 9 tricycles and 14 − 9 = <b>5 bicycles</b>.']},
    {t:['Mẹo', 'Tips'], b:['Ba loại mà hai loại có cùng giá trị (mèo, ngựa đều 4 chân) thì <b>gộp thành một nhóm</b>. Được – trừ điểm: mỗi câu sai làm hụt <b>điểm được + điểm bị trừ</b>.', 'If two kinds have the same value (cats and horses both have 4 legs), <b>group them together</b>. Plus/minus scoring: each wrong answer costs <b>points earned + points lost</b>.']}]});
}

/* =====================================================================
   🧠 TOÁN TƯ DUY – LÝ THUYẾT SỐ NÂNG CAO VÀ BÀI TOÁN ĐỒNG DƯ
   Dấu hiệu chia hết · tính chẵn lẻ · số dư · chu kì chữ số tận cùng · chữ số ẩn.
   Câu hỏi sinh ngẫu nhiên, ba mức tăng dần, lời giải song ngữ Việt – Anh.
   ===================================================================== */
{
const V = bi, v = bin, Bb = x => `<b>${fmt(x)}</b>`, L2 = (vi, en) => V(BG(...vi), BG(...en));
const digits = [0,1,2,3,4,5,6,7,8,9];
const modPow = (a, n, mod = 10) => { let r = 1; a %= mod; while(n){ if(n % 2) r = r * a % mod; a = a * a % mod; n = Math.floor(n / 2); } return r; };
const DAYS_VI = ['Chủ nhật','Thứ Hai','Thứ Ba','Thứ Tư','Thứ Năm','Thứ Sáu','Thứ Bảy'];
const DAYS_EN = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
G.topics.splice(G.topics.findIndex(t => t.id === 81) + 1, 0, {id:82, hk:1, name:'Lý thuyết số và bài toán đồng dư', label:'🧠 Toán tư duy', grp:'🧠 Toán tư duy · Singapore Math'});

/* Dạng 1: dấu hiệu chia hết và điền chữ số */
const ntDiv = lv => {
  if(lv === 1){ const a = R(1,9), b = R(0,9), ok = digits.filter(x => (100*a + 10*b + x) % 3 === 0), good = pick(ok), bad = shuffle(digits.filter(x => !ok.includes(x))).slice(0,3);
    return QC({text:V(`Chữ số nào dưới đây có thể thay vào ${Bb('x')} để số ${Bb(`${a}${b}x`)} chia hết cho 3?`, `Which digit can replace ${Bb('x')} so that ${Bb(`${a}${b}x`)} is divisible by 3?`), opts:[good,...bad].map(String), ans:String(good),
      hint:V('Một số chia hết cho 3 khi tổng các chữ số chia hết cho 3.', 'A number is divisible by 3 when its digit sum is divisible by 3.'),
      sol:L2([`Tổng chữ số là ${a} + ${b} + x = ${a+b} + x.`, `Với x = ${good}: ${a+b} + ${good} = ${a+b+good}, chia hết cho 3.`, `Vậy một chữ số phù hợp là ${Bb(good)}.`], [`The digit sum is ${a} + ${b} + x = ${a+b} + x.`, `For x = ${good}: ${a+b} + ${good} = ${a+b+good}, which is divisible by 3.`, `So a suitable digit is ${Bb(good)}.`])}); }
  if(lv === 2){ const good = v('x = 1 hoặc x = 7', 'x = 1 or x = 7');
    return QC({text:V(`Tìm tất cả chữ số ${Bb('x')} để số ${Bb('54x2')} đồng thời chia hết cho 3 và 4.`, `Find all digits ${Bb('x')} so that ${Bb('54x2')} is divisible by both 3 and 4.`),
      opts:[good,v('x = 1 hoặc x = 4','x = 1 or x = 4'),v('x = 3 hoặc x = 9','x = 3 or x = 9'),v('chỉ x = 7','x = 7 only')],ans:good,
      hint:V('Xét hai chữ số tận cùng để chia hết cho 4; xét tổng chữ số để chia hết cho 3.', 'Use the last two digits for divisibility by 4 and the digit sum for divisibility by 3.'),
      sol:L2([`Chia hết cho 4: số x2 phải chia hết cho 4, nên x có thể là 1, 3, 5, 7, 9.`, `Chia hết cho 3: 5 + 4 + x + 2 = 11 + x phải chia hết cho 3.`, `Thử các chữ số trên: 11 + 1 = 12 và 11 + 7 = 18 chia hết cho 3; các trường hợp khác không thỏa.`, `Kết luận: ${Bb('x = 1 hoặc x = 7')}.`], [`Divisible by 4: x2 must be divisible by 4, so x may be 1, 3, 5, 7 or 9.`, `Divisible by 3: 5 + 4 + x + 2 = 11 + x must be divisible by 3.`, `Testing these digits, 11 + 1 = 12 and 11 + 7 = 18 are divisible by 3.`, `Therefore ${Bb('x = 1 or x = 7')}.`])}); }
  let a,b,c,ok; do{ a=R(1,9); b=R(0,9); c=pick([0,2,4,6,8]); ok=digits.filter(x => (1000*a+100*b+10*x+c)%9===0 && (10*x+c)%4===0); }while(ok.length!==1);
  const x=ok[0],N=1000*a+100*b+10*x+c;
  return QB({text:V(`Tìm chữ số ${Bb('x')} để số ${Bb(`${a}${b}x${c}`)} đồng thời chia hết cho 9 và 4.`, `Find the digit ${Bb('x')} so that ${Bb(`${a}${b}x${c}`)} is divisible by both 9 and 4.`), tpl:'x = [_]', ans:[x],
    hint:V('Lập danh sách chữ số làm hai chữ số cuối chia hết cho 4, rồi dùng tổng chữ số để kiểm tra chia hết cho 9.', 'List digits that make the last two digits divisible by 4, then use the digit sum to test divisibility by 9.'),
    sol:L2([`Hai chữ số cuối là x${c}; trước hết chọn x để x${c} chia hết cho 4.`, `Tổng chữ số phải chia hết cho 9: ${a} + ${b} + x + ${c} = ${a+b+c} + x.`, `Chỉ x = ${x} thỏa cả hai điều kiện: ${a+b+c} + ${x} = ${a+b+c+x} chia hết cho 9 và ${10*x+c} chia hết cho 4.`, `Số nhận được là ${N}. Đáp số: ${Bb(x)}.`], [`The last two digits are x${c}; first make x${c} divisible by 4.`, `The digit sum must be divisible by 9: ${a} + ${b} + x + ${c} = ${a+b+c} + x.`, `Only x = ${x} meets both conditions: ${a+b+c} + ${x} = ${a+b+c+x} is divisible by 9 and ${10*x+c} is divisible by 4.`, `The number is ${N}. Answer: ${Bb(x)}.`])});
};

/* Dạng 2: tính chẵn lẻ */
const ntParity = lv => {
  if(lv === 1){ const n=R(20,120)*2+(Math.random()<.5?0:1),odd=n%2===1,good=v(odd?'Số lẻ':'Số chẵn',odd?'Odd':'Even');
    return QC({text:V(`Tổng của ${n} số tự nhiên lẻ là số chẵn hay số lẻ?`, `Is the sum of ${n} odd whole numbers even or odd?`),opts:[good,v(odd?'Số chẵn':'Số lẻ',odd?'Even':'Odd'),v('Luôn bằng 0','Always 0'),v('Không xác định được','Cannot be determined')],ans:good,
      hint:V('Ghép từng cặp số lẻ: lẻ + lẻ = chẵn. Nếu số lượng số lẻ là lẻ thì còn dư một số lẻ.', 'Pair the odd numbers: odd + odd = even. An odd number of odd terms leaves one odd term unpaired.'),
      sol:L2([`${n} là số ${odd?'lẻ':'chẵn'}.`, odd?`Ghép được ${(n-1)/2} cặp có tổng chẵn và còn một số lẻ.`:`Ghép được ${n/2} cặp, mỗi cặp có tổng chẵn.`, `Vì vậy tổng là ${Bb(odd?'số lẻ':'số chẵn')}.`], [`${n} is ${odd?'odd':'even'}.`, odd?`There are ${(n-1)/2} even-sum pairs and one odd number left.`:`There are ${n/2} pairs, each with an even sum.`, `Therefore the total is ${Bb(odd?'odd':'even')}.`])}); }
  if(lv === 2){ const a=R(20,80),count=R(3,8),odd=2*R(10,50)+1,good=v('Số lẻ','Odd');
    return QC({text:V(`Xét biểu thức ${a} × ${a+1} × ${a+2} × … × ${a+count-1} + ${odd}. Kết quả là số chẵn hay số lẻ?`, `Consider ${a} × ${a+1} × ${a+2} × … × ${a+count-1} + ${odd}. Is the result even or odd?`),opts:[good,v('Số chẵn','Even'),v('Luôn tận cùng bằng 0','Always ends in 0'),v('Không xác định được','Cannot be determined')],ans:good,
      hint:V('Trong các số tự nhiên liên tiếp luôn có số chẵn; tích có một thừa số chẵn là số chẵn.', 'Consecutive whole numbers include an even number; a product with an even factor is even.'),
      sol:L2([`Dãy ${a}, ${a+1}, …, ${a+count-1} có ít nhất một số chẵn.`, `Tích đã cho là số chẵn vì chứa thừa số chẵn.`, `${odd} là số lẻ. Chẵn + lẻ = ${Bb('lẻ')}.`], [`The list ${a}, ${a+1}, …, ${a+count-1} contains an even number.`, `The product is even because it has an even factor.`, `${odd} is odd. Even + odd = ${Bb('odd')}.`])}); }
  const good=v('a + c là số chẵn','a + c is even');
  return QC({text:V(`Biết a + b là số lẻ và b + c là số lẻ. Khẳng định nào chắc chắn đúng?`, `Suppose a + b is odd and b + c is odd. Which statement must be true?`),opts:[good,v('a + c là số lẻ','a + c is odd'),v('a, b, c đều lẻ','a, b and c are all odd'),v('a, b, c đều chẵn','a, b and c are all even')],ans:good,
    hint:V('Tổng là số lẻ khi hai số hạng khác tính chẵn lẻ.', 'A sum is odd when its two terms have different parity.'),
    sol:L2([`a + b lẻ nên a và b khác tính chẵn lẻ.`, `b + c lẻ nên b và c khác tính chẵn lẻ.`, `Vì a và c đều có tính chẵn lẻ ngược với b nên a và c cùng tính chẵn lẻ.`, `Hai số cùng tính chẵn lẻ có tổng chẵn. Vậy ${Bb('a + c là số chẵn')}.`], [`a + b is odd, so a and b have different parity.`, `b + c is odd, so b and c have different parity.`, `Both a and c have the opposite parity to b, so a and c have the same parity.`, `Two numbers with the same parity have an even sum. Thus ${Bb('a + c is even')}.`])});
};

/* Dạng 3: số dư và lịch */
const ntModulo = lv => {
  if(lv === 1){ const start=R(0,6),days=R(20,180),idx=(start+days%7)%7,good=v(DAYS_VI[idx],DAYS_EN[idx]);
    return QC({text:V(`Hôm nay là ${DAYS_VI[start]}. Sau ${days} ngày nữa là thứ mấy?`, `Today is ${DAYS_EN[start]}. What day will it be ${days} days later?`),opts:[good,...[1,2,3].map(k=>v(DAYS_VI[(idx+k)%7],DAYS_EN[(idx+k)%7]))],ans:good,
      hint:V('Một tuần lặp lại sau 7 ngày. Chỉ cần tìm số dư khi chia số ngày cho 7.', 'The weekdays repeat every 7 days. Only the remainder after division by 7 matters.'),
      sol:L2([`${days} : 7 = ${Math.floor(days/7)} dư ${days%7}.`, `Bỏ qua ${Math.floor(days/7)} tuần trọn vẹn, đếm tiếp ${days%7} ngày từ ${DAYS_VI[start]}.`, `Kết quả là ${Bb(DAYS_VI[idx])}.`], [`${days} ÷ 7 = ${Math.floor(days/7)} remainder ${days%7}.`, `Ignore the ${Math.floor(days/7)} complete weeks and count ${days%7} more days from ${DAYS_EN[start]}.`, `The answer is ${Bb(DAYS_EN[idx])}.`])}); }
  if(lv === 2){ const n=pick([5,7,8,9]),r1=R(0,n-1),r2=R(0,n-1),ans=(r1+r2)%n;
    return QB({text:V(`Số A chia cho ${n} dư ${r1}; số B chia cho ${n} dư ${r2}. Tổng A + B chia cho ${n} dư bao nhiêu?`, `A leaves remainder ${r1} when divided by ${n}; B leaves remainder ${r2}. What remainder does A + B leave when divided by ${n}?`),tpl:'[_]',ans:[ans],
      hint:V('Cộng hai số dư rồi tiếp tục chia cho số chia.', 'Add the two remainders, then reduce again by the divisor.'),
      sol:L2([`Tổng hai số dư: ${r1} + ${r2} = ${r1+r2}.`, `${r1+r2} : ${n} dư ${ans}.`, `Vậy A + B chia cho ${n} dư ${Bb(ans)}.`], [`Add the remainders: ${r1} + ${r2} = ${r1+r2}.`, `${r1+r2} ÷ ${n} leaves remainder ${ans}.`, `So A + B leaves remainder ${Bb(ans)}.`])}); }
  let target,r3,r5; do{target=R(1,14);r3=target%3;r5=target%5}while(r3===0&&r5===0);const wrong=shuffle([...new Set([target+1,target+2,target+3,target+5,15-target].filter(x=>x>0&&x!==target))]).slice(0,3);
  return QC({text:V(`Tìm số tự nhiên dương nhỏ nhất chia cho 3 dư ${r3} và chia cho 5 dư ${r5}.`, `Find the smallest positive whole number that leaves remainder ${r3} when divided by 3 and remainder ${r5} when divided by 5.`),opts:[target,...wrong].map(String),ans:String(target),
    hint:V(`Liệt kê các số chia cho 5 dư ${r5}, rồi thử số dư khi chia cho 3.`, `List numbers that leave remainder ${r5} when divided by 5, then test their remainders modulo 3.`),
    sol:L2([`Các số dương chia cho 5 dư ${r5}: ${[...Array(4)].map((_,i)=>r5+5*i).filter(x=>x>0).join(', ')}, …`, `Số đầu tiên trong danh sách đồng thời chia cho 3 dư ${r3} là ${target}.`, `Đáp số: ${Bb(target)}.`], [`Positive numbers leaving remainder ${r5} modulo 5: ${[...Array(4)].map((_,i)=>r5+5*i).filter(x=>x>0).join(', ')}, …`, `The first one that also leaves remainder ${r3} modulo 3 is ${target}.`, `Answer: ${Bb(target)}.`])});
};

/* Dạng 4: chu kì chữ số tận cùng */
const ntLastDigit = lv => {
  if(lv === 1){ const base=pick([1,5,6]),exp=R(15,80),ans=base;return QB({text:V(`Tìm chữ số tận cùng của tích gồm ${exp} thừa số ${base}: ${base} × ${base} × … × ${base}.`, `Find the last digit of the product of ${exp} factors ${base}: ${base} × ${base} × … × ${base}.`),tpl:'[_]',ans:[ans],
    hint:V(`Các lũy thừa dương của số tận cùng bằng ${base} luôn giữ chữ số tận cùng ${base}.`, `Positive powers of a number ending in ${base} always end in ${base}.`),
    sol:L2([`${base} × ${base} vẫn có chữ số tận cùng là ${base}; nhân tiếp với ${base} vẫn không đổi.`, `Vậy tích có chữ số tận cùng là ${Bb(ans)}.`], [`${base} × ${base} still ends in ${base}; multiplying by ${base} keeps the same last digit.`, `So the last digit is ${Bb(ans)}.`])}); }
  if(lv === 2){ const base=pick([4,9]),exp=R(20,100),cycle=base===4?[4,6]:[9,1],pos=(exp-1)%2,ans=cycle[pos];return QB({text:V(`Tìm chữ số tận cùng của ${base}<sup>${exp}</sup>.`, `Find the last digit of ${base}<sup>${exp}</sup>.`),tpl:'[_]',ans:[ans],
    hint:V(`Chữ số tận cùng của lũy thừa cơ số ${base} lặp theo chu kì 2.`, `The last digits of powers of ${base} repeat in a cycle of 2.`),
    sol:L2([`Chu kì chữ số tận cùng: ${cycle[0]}, ${cycle[1]}.`, `${exp} : 2 = ${Math.floor(exp/2)} dư ${exp%2}.`, `Số mũ ${exp%2===0?'chia hết cho 2 nên ở vị trí thứ 2':'lẻ nên ở vị trí thứ 1'} của chu kì. Chữ số tận cùng là ${Bb(ans)}.`], [`Last-digit cycle: ${cycle[0]}, ${cycle[1]}.`, `${exp} ÷ 2 = ${Math.floor(exp/2)} remainder ${exp%2}.`, `The exponent lands in position ${pos+1} of the cycle. The last digit is ${Bb(ans)}.`])}); }
  const a=pick([2,3,7,8]),b=pick([2,3,7,8]),p=R(25,90),qv=R(25,90),la=modPow(a,p),lb=modPow(b,qv),ans=la*lb%10;
  return QB({text:V(`Tìm chữ số tận cùng của ${a}<sup>${p}</sup> × ${b}<sup>${qv}</sup>.`, `Find the last digit of ${a}<sup>${p}</sup> × ${b}<sup>${qv}</sup>.`),tpl:'[_]',ans:[ans],
    hint:V('Tìm riêng chữ số tận cùng của từng lũy thừa bằng chu kì 4, rồi nhân hai chữ số tận cùng.', 'Use the 4-step cycle to find each last digit, then multiply those last digits.'),
    sol:L2([`Chu kì của ${a} có độ dài 4; ${p} chia cho 4 dư ${p%4}, nên ${a}<sup>${p}</sup> tận cùng là ${la}.`, `Chu kì của ${b} có độ dài 4; ${qv} chia cho 4 dư ${qv%4}, nên ${b}<sup>${qv}</sup> tận cùng là ${lb}.`, `${la} × ${lb} = ${la*lb}, nên tích tận cùng là ${Bb(ans)}.`], [`The cycle for ${a} has length 4; ${p} modulo 4 is ${p%4}, so ${a}<sup>${p}</sup> ends in ${la}.`, `The cycle for ${b} has length 4; ${qv} modulo 4 is ${qv%4}, so ${b}<sup>${qv}</sup> ends in ${lb}.`, `${la} × ${lb} = ${la*lb}, so the product ends in ${Bb(ans)}.`])});
};

/* Dạng 5: chữ số ẩn và phép tính theo cột */
const ntCrypto = lv => {
  if(lv === 1) return QB({text:V(`Trong phép tính ${Bb('AB + AB = BCC')}, các chữ cái khác nhau là các chữ số khác nhau. Tìm A, B, C.`, `In ${Bb('AB + AB = BCC')}, different letters stand for different digits. Find A, B and C.`),tpl:'A = [_] &nbsp; B = [_] &nbsp; C = [_]',ans:[6,1,2],wide:true,
    hint:V('Tổng hai số có hai chữ số không vượt quá 198. Bắt đầu từ hàng trăm, rồi xét hàng đơn vị và số nhớ.', 'The sum of two 2-digit numbers is at most 198. Start with the hundreds column, then use the ones column and the carry.'),
    sol:L2([`Hàng trăm của tổng phải là 1, nên B = 1.`, `Hàng đơn vị: B + B = 1 + 1 = 2, nên C = 2 và không nhớ.`, `Hàng chục phải tạo ra 12: A + A = 12, nên A = 6.`, `Thử lại: 61 + 61 = 122. Vậy ${Bb('A = 6, B = 1, C = 2')}.`], [`The hundreds digit must be 1, so B = 1.`, `Ones: B + B = 1 + 1 = 2, so C = 2 with no carry.`, `The tens column must make 12: A + A = 12, so A = 6.`, `Check: 61 + 61 = 122. Thus ${Bb('A = 6, B = 1, C = 2')}.`])});
  if(lv === 2){ const row=pick([[7,1,3,4],[8,1,5,6],[9,1,7,8]]),[A,B,C,D]=row;
    return QB({text:V(`Cho ${Bb(`A = ${A}`)} và phép tính ${Bb('AB + AC = BDD')}. Các chữ cái khác nhau là các chữ số khác nhau. Tìm B, C, D.`, `Given ${Bb(`A = ${A}`)} and ${Bb('AB + AC = BDD')}, different letters are different digits. Find B, C and D.`),tpl:'B = [_] &nbsp; C = [_] &nbsp; D = [_]',ans:[B,C,D],wide:true,
      hint:V('Tổng là số có ba chữ số nên B = 1. Làm từ hàng đơn vị để tìm D và số nhớ.', 'The sum has three digits, so B = 1. Work from the ones column to find D and the carry.'),
      sol:L2([`Vì tổng của hai số có hai chữ số nhỏ hơn 200, chữ số hàng trăm B = 1.`, `Hàng chục: ${A} + ${A} = ${A+A} = 10 + ${D}, nên viết D = ${D} và nhớ 1 sang hàng trăm.`, `Hàng đơn vị không có số nhớ: B + C = D. Vì B = ${B}, D = ${D} nên C = ${D} − ${B} = ${C}.`, `Kiểm tra: ${10*A+B} + ${10*A+C} = ${100*B+11*D}. Vậy ${Bb(`B = ${B}, C = ${C}, D = ${D}`)}.`], [`The sum is below 200, so the hundreds digit B = 1.`, `Tens: ${A} + ${A} = ${A+A} = 10 + ${D}, so write D = ${D} and carry 1 to the hundreds.`, `There is no carry from the ones column: B + C = D. Since B = ${B} and D = ${D}, C = ${D} − ${B} = ${C}.`, `Check: ${10*A+B} + ${10*A+C} = ${100*B+11*D}. Thus ${Bb(`B = ${B}, C = ${C}, D = ${D}`)}.`])}); }
  const row=pick([[2,6,9,1],[4,7,9,1],[6,8,9,1]]),[A,B,C,D]=row;
  return QB({text:V(`Cho ${Bb(`A = ${A}`)} và phép tính ${Bb('AB + CB = DAA')}. Các chữ cái khác nhau là các chữ số khác nhau. Tìm B, C, D.`, `Given ${Bb(`A = ${A}`)} and ${Bb('AB + CB = DAA')}, different letters are different digits. Find B, C and D.`),tpl:'B = [_] &nbsp; C = [_] &nbsp; D = [_]',ans:[B,C,D],wide:true,
    hint:V('Bắt đầu ở hàng đơn vị: B + B phải có chữ số tận cùng A. Ghi lại số nhớ rồi chuyển sang hàng chục.', 'Start in the ones column: B + B must end in A. Record the carry, then move to the tens column.'),
    sol:L2([`Hàng đơn vị: B + B có chữ số tận cùng A = ${A}. Trong các chữ số, B = ${B} vì ${B} + ${B} = ${2*B}, viết ${A} nhớ 1.`, `Hàng chục: A + C + 1 phải có chữ số tận cùng A. Vì vậy C + 1 = 10, nên C = ${C}, nhớ 1.`, `Hàng trăm chính là số nhớ, nên D = ${D}.`, `Kiểm tra: ${10*A+B} + ${10*C+B} = ${100*D+11*A}. Vậy ${Bb(`B = ${B}, C = ${C}, D = ${D}`)}.`], [`Ones: B + B must end in A = ${A}. B = ${B} because ${B} + ${B} = ${2*B}; write ${A}, carry 1.`, `Tens: A + C + 1 must end in A. Therefore C + 1 = 10, so C = ${C}, carry 1.`, `The hundreds digit is the carry, so D = ${D}.`, `Check: ${10*A+B} + ${10*C+B} = ${100*D+11*A}. Thus ${Bb(`B = ${B}, C = ${C}, D = ${D}`)}.`])});
};

lesson(82, 'td-ly-thuyet-so-dong-du', 'Lý thuyết số nâng cao và bài toán đồng dư', 'Dấu hiệu chia hết, tính chẵn lẻ, số dư, chu kì chữ số tận cùng và bài toán điền chữ số ẩn.', [ntDiv, ntParity, ntModulo, ntLastDigit, ntCrypto], {
  bi:true, en:'Advanced number theory and modular arithmetic', descEn:'Divisibility, parity, remainders, last-digit cycles and cryptarithms.',
  intro:[
    {t:['A. Dấu hiệu chia hết', 'A. Divisibility rules'], b:['Chia hết cho 2 hoặc 5: xét chữ số tận cùng.<br>Chia hết cho 3 hoặc 9: xét tổng các chữ số.<br>Chia hết cho 4: xét số tạo bởi hai chữ số tận cùng.', 'For 2 or 5: check the last digit.<br>For 3 or 9: check the digit sum.<br>For 4: check the number made by the last two digits.'], ex:['54x2 chia hết cho 4 ⇒ x2 chia hết cho 4.', '54x2 is divisible by 4 ⇒ x2 is divisible by 4.']},
    {t:['B. Tính chẵn lẻ', 'B. Parity'], b:['Cùng tính chẵn lẻ cộng hoặc trừ nhau ⇒ chẵn.<br>Khác tính chẵn lẻ cộng hoặc trừ nhau ⇒ lẻ.<br>Một tích có ít nhất một thừa số chẵn ⇒ tích chẵn.', 'Same parity added or subtracted ⇒ even.<br>Different parity added or subtracted ⇒ odd.<br>A product with at least one even factor ⇒ even.']},
    {t:['C. Số dư và đồng dư', 'C. Remainders and congruence'], b:['Khi chia một tổng hoặc tích cho N, có thể thay từng số bằng số dư của nó rồi tính tiếp. Bài toán thứ trong tuần có chu kì 7.', 'For a sum or product modulo N, replace each number by its remainder first. Weekdays repeat in a cycle of 7.'], ex:['100 chia 7 dư 2 ⇒ sau 100 ngày tiến thêm 2 thứ.', '100 leaves remainder 2 modulo 7 ⇒ move forward 2 weekdays.']},
    {t:['D. Chu kì chữ số tận cùng', 'D. Last-digit cycles'], b:['Tận cùng 0, 1, 5, 6: chu kì 1.<br>Tận cùng 4, 9: chu kì 2.<br>Tận cùng 2, 3, 7, 8: chu kì 4.', 'Last digit 0, 1, 5 or 6: cycle 1.<br>Last digit 4 or 9: cycle 2.<br>Last digit 2, 3, 7 or 8: cycle 4.'], ex:['Lũy thừa của 2 có chu kì 2, 4, 8, 6.', 'Powers of 2 end in the cycle 2, 4, 8, 6.']},
    {t:['E. Điền chữ số ẩn', 'E. Cryptarithms'], b:['Các chữ cái giống nhau là cùng một chữ số; các chữ cái khác nhau là các chữ số khác nhau. Bắt đầu từ hàng đơn vị để tìm số nhớ, hoặc từ hàng lớn nhất để đánh giá số chữ số.', 'Equal letters mean equal digits; different letters mean different digits. Start from the ones column to track carries, or from the largest place to estimate the number of digits.']}
  ]});
}

/* =====================================================================
   🧠 TOÁN TƯ DUY – BÀI 2.1: TƯ DUY BA TẦNG TRONG TOÁN TRUNG BÌNH CỘNG
   Thuật toán cơ bản · dãy cách đều · sơ đồ đoạn thẳng và nguyên lí bù trừ.
   Câu hỏi sinh theo ba mức, lời giải song ngữ Việt – Anh.
   ===================================================================== */
{
const V = bi, v = bin, Bb = x => `<b>${fmt(x)}</b>`, L2 = (vi, en) => V(BG(...vi), BG(...en));
const descendingTriples = total => { const a=[]; for(let x=1;x<total;x++) for(let y=1;y<x;y++) for(let z=1;z<y;z++) if(x+y+z===total) a.push([x,y,z]); return a; };
const knownList = a => a.join(', ');
G.topics.splice(G.topics.findIndex(t => t.id === 82) + 1, 0, {id:83, hk:1, name:'Tư duy ba tầng trong toán trung bình cộng', label:'🧠 Toán tư duy', grp:'🧠 Toán tư duy · Singapore Math'});

/* Dạng 1: biết trung bình cộng và các số hạng đã biết, tìm số còn thiếu */
const avMissing = lv => {
  if(lv === 1) return QB({text:V('Đội tuyển toán có 4 bạn. Điểm của 3 bạn đầu là 85, 90 và 95. Trung bình cộng điểm của cả 4 bạn là 92. Bạn thứ tư đạt bao nhiêu điểm?', 'A maths team has 4 students. The first three scores are 85, 90 and 95. The average score is 92. What is the fourth score?'),tpl:`[_] ${v('điểm','points')}`,ans:[98],
    hint:V('Thấy trung bình cộng, trước hết tìm tổng điểm của cả 4 bạn.', 'When the average is known, first find the total score of all 4 students.'),
    sol:L2(['Tổng điểm của 4 bạn: 92 × 4 = 368 (điểm).','Tổng điểm của 3 bạn đầu: 85 + 90 + 95 = 270 (điểm).',`Điểm bạn thứ tư: 368 − 270 = ${Bb(98)} (điểm).`],['Total for 4 students: 92 × 4 = 368 points.','Total of the first 3 scores: 85 + 90 + 95 = 270 points.',`Fourth score: 368 − 270 = ${Bb(98)} points.`])});
  const n=lv===2?5:6, avg=lv===2?R(55,95):R(90,150); let known,missing;
  do{ known=Array.from({length:n-1},()=>R(Math.max(20,avg-30),avg+25)); missing=n*avg-known.reduce((s,x)=>s+x,0); }while(missing<20||missing>avg+45);
  return QB({text:V(`Trung bình cộng của ${n} số là ${avg}. Biết ${n-1} số đầu là ${knownList(known)}. Tìm số còn lại.`, `The average of ${n} numbers is ${avg}. The first ${n-1} numbers are ${knownList(known)}. Find the remaining number.`),tpl:'[_]',ans:[missing],
    hint:V(`Tổng của ${n} số bằng trung bình cộng nhân với ${n}.`, `The total of ${n} numbers equals the average multiplied by ${n}.`),
    sol:L2([`Tổng của ${n} số: ${avg} × ${n} = ${avg*n}.`,`Tổng ${n-1} số đã biết: ${known.join(' + ')} = ${known.reduce((s,x)=>s+x,0)}.`,`Số còn lại: ${avg*n} − ${known.reduce((s,x)=>s+x,0)} = ${Bb(missing)}.`],[`Total of ${n} numbers: ${avg} × ${n} = ${avg*n}.`,`Sum of the ${n-1} known numbers: ${known.join(' + ')} = ${known.reduce((s,x)=>s+x,0)}.`,`Remaining number: ${avg*n} − ${known.reduce((s,x)=>s+x,0)} = ${Bb(missing)}.`])});
};

/* Dạng 2: công thức ngược với hai hoặc ba số */
const avReverse = lv => {
  if(lv === 1) return QB({text:V('Trung bình cộng của hai số tự nhiên là 145. Số thứ nhất là số chẵn lớn nhất có hai chữ số. Tìm số thứ hai.', 'The average of two whole numbers is 145. The first is the greatest two-digit even number. Find the second number.'),tpl:'[_]',ans:[192],
    hint:V('Số chẵn lớn nhất có hai chữ số là 98. Tìm tổng của hai số trước.', 'The greatest two-digit even number is 98. Find the total of the two numbers first.'),
    sol:L2(['Số chẵn lớn nhất có hai chữ số là 98.','Tổng của hai số: 145 × 2 = 290.','Số thứ hai: 290 − 98 = '+Bb(192)+'.'],['The greatest two-digit even number is 98.','Total of the two numbers: 145 × 2 = 290.','Second number: 290 − 98 = '+Bb(192)+'.'])});
  if(lv === 2){ const avg=R(80,220),first=R(40,avg+30),second=2*avg-first; return QB({text:V(`Trung bình cộng của hai số là ${avg}. Số thứ nhất là ${first}. Tìm số thứ hai.`, `The average of two numbers is ${avg}. The first number is ${first}. Find the second number.`),tpl:'[_]',ans:[second],hint:V('Tổng của hai số bằng trung bình cộng nhân 2.', 'The total of two numbers is the average multiplied by 2.'),sol:L2([`Tổng hai số: ${avg} × 2 = ${2*avg}.`,`Số thứ hai: ${2*avg} − ${first} = ${Bb(second)}.`],[`Total: ${avg} × 2 = ${2*avg}.`,`Second number: ${2*avg} − ${first} = ${Bb(second)}.`])}); }
  const avg=R(100,300),sum2=R(avg,2*avg),third=3*avg-sum2;
  return QB({text:V(`Trung bình cộng của ba số là ${avg}. Tổng của số thứ nhất và số thứ hai là ${sum2}. Tìm số thứ ba.`, `The average of three numbers is ${avg}. The first two numbers have a total of ${sum2}. Find the third number.`),tpl:'[_]',ans:[third],hint:V('Từ trung bình cộng tìm tổng của cả ba số, rồi trừ tổng hai số đã biết.', 'Use the average to find the total of all three, then subtract the known sum.'),sol:L2([`Tổng ba số: ${avg} × 3 = ${3*avg}.`,`Số thứ ba: ${3*avg} − ${sum2} = ${Bb(third)}.`],[`Total of three numbers: ${avg} × 3 = ${3*avg}.`,`Third number: ${3*avg} − ${sum2} = ${Bb(third)}.`])});
};

/* Dạng 3: trung bình cộng của dãy số cách đều */
const avSequence = lv => {
  if(lv === 1){ const mid=2*R(30,300)+1; return QB({text:V(`Ba số lẻ liên tiếp có trung bình cộng là ${mid}. Tìm số bé nhất và số lớn nhất.`, `Three consecutive odd numbers have an average of ${mid}. Find the smallest and greatest numbers.`),tpl:`${v('Số bé nhất','Smallest')} = [_] &nbsp; ${v('Số lớn nhất','Greatest')} = [_]`,ans:[mid-2,mid+2],wide:true,hint:V('Ba số cách đều có số giữa bằng trung bình cộng.', 'For three equally spaced numbers, the middle number equals the average.'),sol:L2([`Số giữa là ${mid}.`,`Hai số lẻ liên tiếp cách nhau 2.`,`Số bé nhất: ${mid} − 2 = ${mid-2}. Số lớn nhất: ${mid} + 2 = ${Bb(mid+2)}.`],[`The middle number is ${mid}.`,`Consecutive odd numbers differ by 2.`,`Smallest: ${mid} − 2 = ${mid-2}. Greatest: ${mid} + 2 = ${Bb(mid+2)}.`])}); }
  if(lv === 2) return QB({text:V('Trung bình cộng của 5 số lẻ liên tiếp là 2023. Tìm số bé nhất và số lớn nhất.', 'The average of 5 consecutive odd numbers is 2023. Find the smallest and greatest numbers.'),tpl:`${v('Số bé nhất','Smallest')} = [_] &nbsp; ${v('Số lớn nhất','Greatest')} = [_]`,ans:[2019,2027],wide:true,hint:V('Dãy có 5 số nên trung bình cộng là số thứ ba.', 'There are 5 numbers, so the average is the third number.'),sol:L2(['Năm số lẻ liên tiếp là dãy cách đều và có số lượng số hạng lẻ, nên số chính giữa bằng trung bình cộng.','Số thứ ba là 2023; mỗi bước cách 2.','Số bé nhất: 2023 − 2 − 2 = 2019.','Số lớn nhất: 2023 + 2 + 2 = '+Bb(2027)+'.'],['Five consecutive odd numbers are equally spaced and there is an odd number of terms, so the middle term equals the average.','The third number is 2023 and each step is 2.','Smallest: 2023 − 2 − 2 = 2019.','Greatest: 2023 + 2 + 2 = '+Bb(2027)+'.'])});
  const count=pick([7,9]),half=(count-1)/2,d=pick([3,4,5,6]),mid=R(100,500),first=mid-half*d,last=mid+half*d;
  return QB({text:V(`Một dãy gồm ${count} số cách đều, khoảng cách giữa hai số liên tiếp là ${d}, trung bình cộng là ${mid}. Tìm số đầu và số cuối.`, `A sequence has ${count} equally spaced terms, with a difference of ${d}, and an average of ${mid}. Find the first and last terms.`),tpl:`${v('Số đầu','First')} = [_] &nbsp; ${v('Số cuối','Last')} = [_]`,ans:[first,last],wide:true,hint:V('Dãy có số lượng số hạng lẻ nên trung bình cộng là số chính giữa.', 'The sequence has an odd number of terms, so its average is the middle term.'),sol:L2([`Có ${half} bước từ số giữa đến mỗi đầu dãy.`,`Khoảng cách từ số giữa đến mỗi đầu: ${half} × ${d} = ${half*d}.`,`Số đầu: ${mid} − ${half*d} = ${first}. Số cuối: ${mid} + ${half*d} = ${Bb(last)}.`],[`There are ${half} steps from the middle term to either end.`,`Distance from the middle to either end: ${half} × ${d} = ${half*d}.`,`First: ${mid} − ${half*d} = ${first}. Last: ${mid} + ${half*d} = ${Bb(last)}.`])});
};

/* Dạng 4: suy luận từ trung bình và điều kiện lớn hơn – nhỏ hơn */
const avLogic = lv => {
  if(lv === 1){ const avg=R(3,8); return QB({text:V(`Ba con gà đẻ trung bình ${avg} quả trứng mỗi ngày. Cả ba con đẻ được bao nhiêu quả mỗi ngày?`, `Three hens lay an average of ${avg} eggs per day. How many eggs do they lay altogether each day?`),tpl:`[_] ${v('quả trứng','eggs')}`,ans:[3*avg],hint:V('Tổng bằng trung bình cộng nhân số lượng.', 'Total equals average multiplied by the number of items.'),sol:L2([`Có 3 con gà.`,`Tổng số trứng: ${avg} × 3 = ${Bb(3*avg)} (quả).`],[`There are 3 hens.`,`Total eggs: ${avg} × 3 = ${Bb(3*avg)}.`])}); }
  if(lv === 2){ const good=v('5 quả, 4 quả, 3 quả','5 eggs, 4 eggs, 3 eggs'); return QC({text:V('Ba con gà đẻ trung bình 4 quả trứng mỗi ngày. Con thứ nhất đẻ nhiều hơn con thứ hai, con thứ hai đẻ nhiều hơn con thứ ba. Phương án nào có thể xảy ra?', 'Three hens lay an average of 4 eggs per day. The first lays more than the second, and the second lays more than the third. Which result is possible?'),opts:[good,v('4 quả, 4 quả, 4 quả','4 eggs, 4 eggs, 4 eggs'),v('6 quả, 4 quả, 3 quả','6 eggs, 4 eggs, 3 eggs'),v('3 quả, 4 quả, 5 quả','3 eggs, 4 eggs, 5 eggs')],ans:good,hint:V('Tổng phải bằng 4 × 3 = 12 và ba số phải giảm dần.', 'The total must be 4 × 3 = 12 and the three numbers must be strictly decreasing.'),sol:L2(['Tổng số trứng phải là: 4 × 3 = 12.','Bộ 5, 4, 3 có tổng 12 và thỏa 5 > 4 > 3.','Các phương án khác hoặc sai tổng, hoặc không thỏa thứ tự. Vậy chọn '+Bb('5 quả, 4 quả, 3 quả')+'.'],['The total must be 4 × 3 = 12.','The triple 5, 4, 3 totals 12 and satisfies 5 > 4 > 3.','The other choices have the wrong total or order. Choose '+Bb('5, 4, 3')+'.'])}); }
  const total=pick([9,12,15,18]),sets=descendingTriples(total),avg=total/3;
  return QB({text:V(`Ba con gà đẻ tổng cộng ${total} quả mỗi ngày. Mỗi con đẻ một số nguyên dương và con thứ nhất đẻ nhiều hơn con thứ hai, con thứ hai đẻ nhiều hơn con thứ ba. Có bao nhiêu bộ số trứng có thể xảy ra?`, `Three hens lay ${total} eggs altogether each day. Each lays a positive whole number, with the first laying more than the second and the second more than the third. How many triples are possible?`),tpl:`[_] ${v('bộ','triples')}`,ans:[sets.length],hint:V(`Trung bình là ${avg}. Liệt kê có thứ tự các bộ a > b > c > 0 và a + b + c = ${total}.`, `The average is ${avg}. List ordered triples a > b > c > 0 with a + b + c = ${total}.`),sol:L2([`Ta cần a > b > c > 0 và a + b + c = ${total}.`,`Liệt kê không lặp: ${sets.map(s=>s.join('–')).join('; ')}.`,`Có tất cả ${Bb(sets.length)} bộ.`],[`We need a > b > c > 0 and a + b + c = ${total}.`,`The non-repeating list is: ${sets.map(s=>s.join('–')).join('; ')}.`,`There are ${Bb(sets.length)} triples.`])});
};

/* Dạng 5: một đại lượng nhiều hơn trung bình cộng – bar model bù đi */
const avAbove = lv => {
  let others,d,avg,x;
  if(lv === 1){ others=[45,55];d=10;avg=55;x=65; }
  else { const n=lv===2?3:4; avg=R(35,90);d=R(4,16); const need=(n-1)*avg-d; do{ others=Array.from({length:n-2},()=>R(Math.max(10,avg-20),avg+10)); others.push(need-others.reduce((s,z)=>s+z,0)); }while(others[others.length-1]<=5); x=avg+d; }
  const n=others.length+1,S=others.reduce((s,z)=>s+z,0);
  const textVi=lv===1?'Thùng thứ nhất có 45 lít dầu, thùng thứ hai có 55 lít dầu. Thùng thứ ba nhiều hơn trung bình cộng của cả 3 thùng 10 lít. Hỏi thùng thứ ba có bao nhiêu lít dầu?':`Có ${n} thùng dầu. ${n-1} thùng đầu lần lượt có ${knownList(others)} lít. Thùng cuối nhiều hơn trung bình cộng của cả nhóm ${d} lít. Hỏi thùng cuối có bao nhiêu lít dầu?`;
  const textEn=lv===1?'The first oil tank has 45 litres and the second has 55 litres. The third has 10 litres more than the average of all 3 tanks. How many litres are in the third tank?':`There are ${n} oil tanks. The first ${n-1} contain ${knownList(others)} litres. The last has ${d} litres more than the average. How many litres are in the last tank?`;
  return QB({text:V(textVi,textEn),tpl:`[_] ${v('lít','litres')}`,ans:[x],hint:V(`Cắt phần hơn ${d} ở đại lượng cuối để bù cho ${n-1} đại lượng đầu. Khi đó tổng ${n-1} đại lượng đầu sau khi nhận bù bằng ${n-1} lần trung bình cộng.`, `Move the excess ${d} from the last quantity to the first ${n-1}. Their adjusted total then equals ${n-1} times the average.`),sol:L2([`Tổng ${n-1} đại lượng đầu: ${others.join(' + ')} = ${S}.`,`Phần hơn ${d} được chuyển sang bù, nên ${n-1} lần trung bình cộng là: ${S} + ${d} = ${S+d}.`,`Trung bình cộng: ${S+d} : ${n-1} = ${avg}.`,`Đại lượng cuối: ${avg} + ${d} = ${Bb(x)}.`],[`Total of the first ${n-1}: ${others.join(' + ')} = ${S}.`,`Move the excess ${d} to them, so ${n-1} times the average is ${S} + ${d} = ${S+d}.`,`Average: ${S+d} ÷ ${n-1} = ${avg}.`,`Last quantity: ${avg} + ${d} = ${Bb(x)}.`])});
};

/* Dạng 6: một đại lượng ít hơn trung bình cộng – bar model nhận bù */
const avBelow = lv => {
  let others,d,avg,x;
  if(lv === 1){ others=[38,42];d=6;avg=37;x=31; }
  else { const n=lv===2?3:4; avg=R(30,85);d=R(3,14); const need=(n-1)*avg+d; do{ others=Array.from({length:n-2},()=>R(Math.max(10,avg-10),avg+25)); others.push(need-others.reduce((s,z)=>s+z,0)); }while(others[others.length-1]<=5); x=avg-d; }
  const n=others.length+1,S=others.reduce((s,z)=>s+z,0);
  const textVi=lv===1?'Lan có 38 nhãn vở, Hồng có 42 nhãn vở. Huệ có ít hơn trung bình cộng của cả 3 bạn 6 nhãn vở. Hỏi Huệ có bao nhiêu nhãn vở?':`Có ${n} bạn. ${n-1} bạn đầu lần lượt có ${knownList(others)} nhãn vở. Bạn cuối có ít hơn trung bình cộng của cả nhóm ${d} nhãn vở. Hỏi bạn cuối có bao nhiêu nhãn vở?`;
  const textEn=lv===1?'Lan has 38 notebook labels and Hong has 42. Hue has 6 fewer labels than the average of all 3 children. How many labels does Hue have?':`There are ${n} children. The first ${n-1} have ${knownList(others)} notebook labels. The last child has ${d} fewer than the group average. How many labels does the last child have?`;
  return QB({text:V(textVi,textEn),tpl:`[_] ${v('nhãn vở','labels')}`,ans:[x],hint:V(`${n-1} đại lượng đầu phải cho đại lượng cuối ${d} để nó đạt mức trung bình. Phần còn lại bằng ${n-1} lần trung bình cộng.`, `The first ${n-1} quantities give ${d} to the last one so it reaches the average. Their remaining total equals ${n-1} times the average.`),sol:L2([`Tổng ${n-1} đại lượng đầu: ${others.join(' + ')} = ${S}.`,`Sau khi trích ${d} để bù cho đại lượng cuối, ${n-1} lần trung bình cộng là: ${S} − ${d} = ${S-d}.`,`Trung bình cộng: ${S-d} : ${n-1} = ${avg}.`,`Đại lượng cuối: ${avg} − ${d} = ${Bb(x)}.`],[`Total of the first ${n-1}: ${others.join(' + ')} = ${S}.`,`After giving ${d} to the last quantity, ${n-1} times the average is ${S} − ${d} = ${S-d}.`,`Average: ${S-d} ÷ ${n-1} = ${avg}.`,`Last quantity: ${avg} − ${d} = ${Bb(x)}.`])});
};

lesson(83, 'td-trung-binh-cong-ba-tang', 'Bài 2.1: Tư duy ba tầng trong toán trung bình cộng', 'Hiểu trung bình cộng là sự san đều; vận dụng công thức ngược, dãy số cách đều và sơ đồ đoạn thẳng bù trừ.', [avMissing, avReverse, avSequence, avLogic, avAbove, avBelow], {
  bi:true, en:'Lesson 2.1: Three-level thinking with averages', descEn:'Understand an average as equal sharing; use reverse formulas, equally spaced sequences and bar-model compensation.',
  intro:[
    {t:['Bản chất: san đều', 'The meaning: equal sharing'],b:['Trung bình cộng là mức nhận được khi lấy bớt ở nơi nhiều và bù sang nơi ít cho đến khi mọi phần bằng nhau. Đây là bước <b>Cụ thể → Trực quan → Trừu tượng</b> trong phương pháp CPA.', 'An average is the level reached by moving excess from larger amounts to smaller amounts until all are equal. This follows the CPA path: <b>Concrete → Pictorial → Abstract</b>.']},
    {t:['Tầng 1: Thuật toán cơ bản', 'Level 1: Basic algorithm'],b:['Trung bình cộng = Tổng : Số lượng.<br><b>Công thức ngược:</b> Tổng = Trung bình cộng × Số lượng.<br>Phản xạ đầu tiên khi thấy trung bình cộng: tìm tổng.', 'Average = Total ÷ Number of items.<br><b>Reverse formula:</b> Total = Average × Number of items.<br>First response when an average is given: find the total.'],ex:['TBC của 4 bạn là 92 ⇒ tổng điểm là 92 × 4 = 368.', 'Average of 4 students is 92 ⇒ total is 92 × 4 = 368.']},
    {t:['Tầng 2: Số ẩn và dãy cách đều', 'Level 2: Hidden numbers and sequences'],b:['Dãy cách đều có số lượng số hạng lẻ: trung bình cộng là số chính giữa.<br>Mọi dãy cách đều: trung bình cộng = (số đầu + số cuối) : 2.', 'For an equally spaced sequence with an odd number of terms, the average is the middle term.<br>For every equally spaced sequence: average = (first + last) ÷ 2.'],ex:['TBC của 2, 4, 6 là 4.', 'The average of 2, 4 and 6 is 4.']},
    {t:['Tầng 3: Bar Model – nhiều hơn TBC', 'Level 3: Bar model – above average'],b:['Phần nhiều hơn là phần phải <b>mang đi bù</b> cho các phần còn lại. Sau khi chuyển phần thừa, các đoạn đều bằng mức trung bình cộng.', 'The excess is the part moved to <b>compensate</b> the other quantities. After moving it, all bars reach the average level.']},
    {t:['Tầng 3: Bar Model – ít hơn TBC', 'Level 3: Bar model – below average'],b:['Phần ít hơn là phần cần <b>nhận bù</b>. Các phần còn lại phải trích đúng phần thiếu đó để đưa đại lượng cuối lên mức trung bình cộng.', 'The shortage is the part that must be <b>received</b>. The other quantities give exactly that shortage to bring the last one up to the average.']}
  ]});
}

/* =====================================================================
   🧠 TOÁN TƯ DUY – BÀI 2.2: BÀI TOÁN TUỔI VÀ NĂNG SUẤT CÔNG VIỆC
   Hiệu tuổi bất biến · Bar Model theo tỉ số · năng suất trong một đơn vị thời gian.
   Câu hỏi sinh theo ba mức, lời giải song ngữ Việt – Anh.
   ===================================================================== */
{
const V = bi, v = bin, Bb = x => `<b>${fmt(x)}</b>`, L2 = (vi, en) => V(BG(...vi), BG(...en));
G.topics.splice(G.topics.findIndex(t => t.id === 83) + 1, 0, {id:84, hk:1, name:'Bài toán tuổi và năng suất công việc', label:'🧠 Toán tư duy', grp:'🧠 Toán tư duy · Singapore Math'});

/* Dạng 1: hiệu số tuổi không đổi */
const awAgeDifference = lv => {
  if(lv === 1) return QB({text:V('Hiện nay anh 15 tuổi, em 8 tuổi. Hỏi 5 năm trước, anh hơn em bao nhiêu tuổi?', 'An older brother is 15 and his younger sibling is 8. How many years older was he 5 years ago?'),tpl:`[_] ${v('tuổi','years')}`,ans:[7],hint:V('Sau mỗi năm, tuổi của cả hai cùng tăng 1 nên hiệu số tuổi không đổi.', 'Each year both ages increase by 1, so their age difference stays unchanged.'),sol:L2(['Hiệu số tuổi hiện nay: 15 − 8 = 7 (tuổi).','Năm năm trước, tuổi của mỗi người cùng giảm 5 nên hiệu vẫn là 7.','Kết luận: anh hơn em '+Bb(7)+' tuổi.'],['Current age difference: 15 − 8 = 7 years.','Five years ago, both ages were 5 less, so the difference was still 7.','The older brother was '+Bb(7)+' years older.'])});
  const younger=R(lv===2?7:10,25),gap=R(4,18),older=younger+gap,years=lv===2?R(2,younger-1):R(5,20),future=lv===3;
  return QB({text:V(`Hiện nay người anh ${older} tuổi, người em ${younger} tuổi. ${future?`Sau ${years} năm`:`${years} năm trước`}, anh hơn em bao nhiêu tuổi?`, `The older sibling is ${older} and the younger is ${younger}. ${future?`In ${years} years`:`${years} years ago`}, how many years older is the older sibling?`),tpl:`[_] ${v('tuổi','years')}`,ans:[gap],hint:V('Không cần tính từng tuổi nếu chỉ hỏi hiệu số tuổi.', 'There is no need to calculate both ages when only their difference is asked.'),sol:L2([`Hiệu số tuổi hiện nay: ${older} − ${younger} = ${gap}.`,`Cả hai cùng tăng hoặc cùng giảm một số năm như nhau nên hiệu không đổi.`,`Đáp số: ${Bb(gap)} tuổi.`],[`Current difference: ${older} − ${younger} = ${gap}.`,`Both ages increase or decrease by the same amount, so the difference stays unchanged.`,`Answer: ${Bb(gap)} years.`])});
};

/* Dạng 2: biết hiệu tuổi, tìm mốc có tỉ số cho trước */
const awAgeRatio = lv => {
  if(lv === 1) return QB({text:V('Hiện nay bố 36 tuổi, con 8 tuổi. Hỏi sau bao nhiêu năm nữa tuổi bố gấp 3 lần tuổi con?', 'A father is 36 and his child is 8. In how many years will the father be 3 times as old as the child?'),tpl:`[_] ${v('năm','years')}`,ans:[6],hint:V('Hiệu tuổi là 28. Khi bố gấp 3 lần tuổi con, hiệu 28 ứng với 2 phần.', 'The age difference is 28. When the father is 3 times as old, the difference of 28 represents 2 parts.'),sol:L2(['Hiệu số tuổi: 36 − 8 = 28 (tuổi).','Khi bố gấp 3 lần tuổi con: bố 3 phần, con 1 phần; hiệu là 3 − 1 = 2 phần.','Tuổi con lúc đó: 28 : 2 = 14 (tuổi).','Số năm cần chờ: 14 − 8 = '+Bb(6)+' (năm).'],['Age difference: 36 − 8 = 28 years.','At the target time: father is 3 parts, child is 1 part; the difference is 2 parts.','Child’s age then: 28 ÷ 2 = 14.','Years to wait: 14 − 8 = '+Bb(6)+'.'])});
  const k=pick(lv===2?[2,3,4]:[3,4,5]),targetChild=R(10,22),years=R(3,8),future=lv===2,currentChild=future?targetChild-years:targetChild+years,diff=(k-1)*targetChild,currentOlder=currentChild+diff;
  return QB({text:V(`Hiện nay người lớn ${currentOlder} tuổi, người nhỏ ${currentChild} tuổi. Hỏi ${future?'sau':'cách đây'} bao nhiêu năm tuổi người lớn gấp ${k} lần tuổi người nhỏ?`, `The older person is ${currentOlder} and the younger is ${currentChild}. How many years ${future?'from now':'ago'} was the older person ${k} times as old as the younger?`),tpl:`[_] ${v('năm','years')}`,ans:[years],hint:V(`Hiệu tuổi ${diff} không đổi. Ở mốc cần tìm, hiệu ứng với ${k-1} phần.`, `The age difference ${diff} is constant. At the target time, it represents ${k-1} parts.`),sol:L2([`Hiệu số tuổi: ${currentOlder} − ${currentChild} = ${diff}.`,`Khi tuổi người lớn gấp ${k} lần, hiệu ứng với ${k} − 1 = ${k-1} phần.`,`Tuổi người nhỏ ở mốc đó: ${diff} : ${k-1} = ${targetChild}.`,`${future?'Số năm cần chờ':'Số năm đã qua'}: ${Math.abs(targetChild-currentChild)} = ${Bb(years)} (năm).`],[`Age difference: ${currentOlder} − ${currentChild} = ${diff}.`,`When the older age is ${k} times the younger, the difference represents ${k} − 1 = ${k-1} parts.`,`Younger age then: ${diff} ÷ ${k-1} = ${targetChild}.`,`${future?'Years to wait':'Years ago'}: ${Math.abs(targetChild-currentChild)} = ${Bb(years)}.`])});
};

/* Dạng 3: hai tỉ số tuổi ở hai mốc thời gian */
const awAgeTwoTimes = lv => {
  const row=lv===1?[4,3,5,10]:pick(lv===2?[[5,3,4,4],[3,2,8,8],[5,4,3,9]]:[[6,4,6,9],[4,2,10,5],[7,5,4,8]]),[nowRatio,laterRatio,years,child]=row,mother=nowRatio*child,laterChild=child+years,laterMother=mother+years;
  return QB({text:V(`Hiện nay tuổi mẹ gấp ${nowRatio} lần tuổi con. Sau ${years} năm, tuổi mẹ gấp ${laterRatio} lần tuổi con. Hỏi hiện nay con bao nhiêu tuổi?`, `A mother is now ${nowRatio} times as old as her child. In ${years} years, she will be ${laterRatio} times as old. How old is the child now?`),tpl:`[_] ${v('tuổi','years old')}`,ans:[child],hint:V('Lấy hiệu tuổi làm một đại lượng cố định, rồi biểu diễn tuổi con ở mỗi mốc theo phần của hiệu.', 'Use the fixed age difference and express the child’s age at each time as a fraction of that difference.'),sol:L2([`Hiện nay: mẹ ${nowRatio} phần, con 1 phần, nên hiệu là ${nowRatio-1} phần; tuổi con bằng ${F(1,nowRatio-1)} hiệu tuổi.`,`Sau ${years} năm: mẹ ${laterRatio} phần, con 1 phần, nên hiệu là ${laterRatio-1} phần; tuổi con bằng ${F(1,laterRatio-1)} hiệu tuổi.`,`Phần tăng thêm trong ${years} năm: ${F(1,laterRatio-1)} − ${F(1,nowRatio-1)} = ${Fs(nowRatio-laterRatio,(laterRatio-1)*(nowRatio-1))} hiệu tuổi.`,`Từ đó hiệu tuổi là ${mother-child}; tuổi con hiện nay bằng ${mother-child} : ${nowRatio-1} = ${Bb(child)} (tuổi).`,`Kiểm tra: sau ${years} năm, mẹ ${laterMother} tuổi và con ${laterChild} tuổi; ${laterMother} : ${laterChild} = ${laterRatio}.`],[`Now: mother is ${nowRatio} parts and child is 1 part, so the difference is ${nowRatio-1} parts; the child is ${F(1,nowRatio-1)} of the age difference.`,`In ${years} years: the difference is ${laterRatio-1} parts, so the child is ${F(1,laterRatio-1)} of the age difference.`,`The increase over ${years} years is ${F(1,laterRatio-1)} − ${F(1,nowRatio-1)} = ${Fs(nowRatio-laterRatio,(laterRatio-1)*(nowRatio-1))} of the difference.`,`Thus the age difference is ${mother-child}; the child’s current age is ${mother-child} ÷ ${nowRatio-1} = ${Bb(child)}.`,`Check: in ${years} years, the ages are ${laterMother} and ${laterChild}; ${laterMother} ÷ ${laterChild} = ${laterRatio}.`])});
};

/* Dạng 4: năng suất trong một đơn vị thời gian */
const awUnitRate = lv => {
  const time=lv===1?6:lv===2?pick([8,10,12,15]):pick([12,16,18,20]),hours=lv===1?1:R(2,Math.min(6,time-2)),remaining=lv===3;
  if(!remaining) return QB({text:V(`Một người làm một mình hoàn thành công việc trong ${time} giờ. Trong ${hours} giờ, người đó làm được bao nhiêu phần công việc?`, `One worker completes a job alone in ${time} hours. What fraction of the job is completed in ${hours} hour${hours>1?'s':''}?`),tpl:'[F] '+v('công việc','of the job'),ans:[{frac:[hours,time],mode:'eq'}],hint:V(`Trong 1 giờ làm được ${F(1,time)} công việc.`, `In 1 hour, the worker completes ${F(1,time)} of the job.`),sol:L2([`Năng suất trong 1 giờ: ${F(1,time)} công việc.`,`Trong ${hours} giờ làm được: ${hours} × ${F(1,time)} = ${Fs(hours,time)} công việc.`],[`Hourly rate: ${F(1,time)} of the job.`,`In ${hours} hours: ${hours} × ${F(1,time)} = ${Fs(hours,time)} of the job.`])});
  return QB({text:V(`Một người hoàn thành công việc trong ${time} giờ. Sau khi làm ${hours} giờ, còn lại bao nhiêu phần công việc?`, `A worker completes a job in ${time} hours. What fraction remains after working for ${hours} hours?`),tpl:'[F] '+v('công việc','of the job'),ans:[{frac:[time-hours,time],mode:'eq'}],hint:V('Lấy toàn bộ công việc trừ phần đã làm.', 'Subtract the completed fraction from the whole job.'),sol:L2([`Trong ${hours} giờ đã làm: ${hours} × ${F(1,time)} = ${Fs(hours,time)} công việc.`,`Phần còn lại: 1 − ${Fs(hours,time)} = ${Fs(time-hours,time)} công việc.`],[`Completed in ${hours} hours: ${hours} × ${F(1,time)} = ${Fs(hours,time)} of the job.`,`Remaining: 1 − ${Fs(hours,time)} = ${Fs(time-hours,time)} of the job.`])});
};

/* Dạng 5: cộng năng suất khi cùng làm */
const awTogether = lv => {
  const pair=lv===1?[6,3,2]:lv===2?pick([[4,4,2],[8,8,4],[12,6,4],[15,10,6],[20,5,4]]):pick([[12,6,4,2],[8,8,4,2],[12,12,6,3],[18,9,6,3]]),times=pair.slice(0,-1),ans=pair[pair.length-1],rateNum=times.reduce((s,t)=>s+times.reduce((p,u)=>p*u,1)/t,0),common=times.reduce((p,t)=>p*t,1);
  return QB({text:V(`${times.length===2?'Hai':'Ba'} người nếu làm riêng sẽ hoàn thành cùng một công việc lần lượt trong ${times.join(', ')} giờ. Nếu cùng làm ngay từ đầu, họ hoàn thành công việc trong bao lâu?`, `${times.length===2?'Two':'Three'} workers can complete the same job alone in ${times.join(', ')} hours respectively. How long will they take if they work together from the start?`),tpl:`[_] ${v('giờ','hours')}`,ans:[ans],hint:V('Không cộng thời gian. Hãy cộng phần công việc mỗi người làm được trong 1 giờ.', 'Do not add their times. Add the fractions of the job they complete in 1 hour.'),sol:L2([`Năng suất từng người trong 1 giờ: ${times.map(t=>F(1,t)).join(' và ')} công việc.`,`Năng suất chung: ${times.map(t=>F(1,t)).join(' + ')} = ${Fs(rateNum,common)} công việc mỗi giờ.`,`Thời gian hoàn thành: 1 : ${Fs(rateNum,common)} = ${Bb(ans)} (giờ).`],[`Individual hourly rates: ${times.map(t=>F(1,t)).join(' and ')} of the job.`,`Combined rate: ${times.map(t=>F(1,t)).join(' + ')} = ${Fs(rateNum,common)} of the job per hour.`,`Completion time: 1 ÷ ${Fs(rateNum,common)} = ${Bb(ans)} hours.`])});
};

/* Dạng 6: làm riêng một thời gian rồi mới làm chung */
const awTwoStages = lv => {
  const row=lv===1?[8,8,2,3]:lv===2?pick([[12,6,3,3],[10,10,2,4],[16,16,4,6]]):pick([[18,9,6,4],[20,10,5,5],[24,12,6,6]]),[a,b,solo,together]=row;
  return QB({text:V(`Người thứ nhất làm một mình thì xong việc trong ${a} giờ, người thứ hai làm một mình thì xong trong ${b} giờ. Người thứ nhất làm trước ${solo} giờ, sau đó người thứ hai đến cùng làm. Từ lúc người thứ hai đến, cần thêm bao nhiêu giờ để xong việc?`, `The first worker can finish a job alone in ${a} hours and the second in ${b} hours. The first works alone for ${solo} hours, then the second joins. How many more hours are needed after the second worker joins?`),tpl:`[_] ${v('giờ','hours')}`,ans:[together],hint:V('Tính phần đã làm, phần còn lại và năng suất chung theo đúng thứ tự.', 'Find the completed part, the remaining part and then the combined rate, in that order.'),sol:L2([`Người thứ nhất làm trong 1 giờ được ${F(1,a)} công việc.`,`Sau ${solo} giờ đã làm: ${solo} × ${F(1,a)} = ${Fs(solo,a)} công việc.`,`Phần còn lại: 1 − ${Fs(solo,a)} = ${Fs(a-solo,a)} công việc.`,`Năng suất chung: ${F(1,a)} + ${F(1,b)} = ${Fs(a+b,a*b)} công việc mỗi giờ.`,`Thời gian làm phần còn lại: ${Fs(a-solo,a)} : ${Fs(a+b,a*b)} = ${Bb(together)} (giờ).`],[`The first worker’s hourly rate is ${F(1,a)} of the job.`,`After ${solo} hours, the completed part is ${solo} × ${F(1,a)} = ${Fs(solo,a)}.`,`Remaining part: 1 − ${Fs(solo,a)} = ${Fs(a-solo,a)}.`,`Combined rate: ${F(1,a)} + ${F(1,b)} = ${Fs(a+b,a*b)} of the job per hour.`,`Time for the remainder: ${Fs(a-solo,a)} ÷ ${Fs(a+b,a*b)} = ${Bb(together)} hours.`])});
};

lesson(84, 'td-tuoi-va-nang-suat', 'Bài 2.2: Phân tích bài toán tuổi và năng suất công việc', 'Dùng hiệu tuổi bất biến, Bar Model theo tỉ số và tư duy nghịch đảo về năng suất để tìm đại lượng ẩn.', [awAgeDifference, awAgeRatio, awAgeTwoTimes, awUnitRate, awTogether, awTwoStages], {
  bi:true, en:'Lesson 2.2: Age and work-rate problems', descEn:'Use invariant age differences, ratio bar models and inverse thinking about work rates to find unknown quantities.',
  intro:[
    {t:['Tuổi: đại lượng bất biến', 'Age: the invariant'],b:['Mỗi năm, tuổi của mọi người cùng tăng 1 nên <b>hiệu số tuổi không đổi</b>. Chỉ xét những mốc thời gian mà các nhân vật đều đã sinh ra.', 'Each year, everyone’s age increases by 1, so the <b>age difference stays constant</b>. Use only times when all people have already been born.']},
    {t:['Bar Model cho bài toán tuổi', 'Bar model for age problems'],b:['Quy bài toán về “biết hiệu và tỉ số”. Vẽ tuổi lớn thành nhiều phần bằng nhau, tuổi nhỏ thành ít phần hơn. Hiệu số phần ứng với hiệu số tuổi.', 'Reduce the problem to a known difference and ratio. Draw equal parts for the two ages; the difference in parts represents the age difference.'],ex:['Bố gấp 3 lần tuổi con ⇒ bố 3 phần, con 1 phần, hiệu 2 phần.', 'Father is 3 times the child’s age ⇒ 3 parts and 1 part, a difference of 2 parts.']},
    {t:['Hai mốc thời gian', 'Two points in time'],b:['Vẽ hai sơ đồ nhưng giữ nguyên hiệu số tuổi. Biểu diễn tuổi nhỏ ở mỗi mốc theo một phần của hiệu, rồi dùng số năm tăng thêm để nối hai sơ đồ.', 'Draw two bar models while keeping the age difference fixed. Express the younger age as a fraction of the difference at each time, then connect the models using the elapsed years.']},
    {t:['Năng suất và thời gian', 'Rate and time'],b:['Khối lượng công việc = Năng suất × Thời gian.<br>Năng suất = Khối lượng công việc : Thời gian.<br>Nếu hoàn thành trong n giờ thì mỗi giờ làm được '+F(1,'n')+' công việc.', 'Work = Rate × Time.<br>Rate = Work ÷ Time.<br>If a job takes n hours, the hourly rate is '+F(1,'n')+' of the job.']},
    {t:['Cùng làm: cộng năng suất', 'Working together: add rates'],b:['Không cộng thời gian hoàn thành. Quy từng người về phần công việc làm trong 1 giờ, sau đó mới cộng các năng suất.', 'Do not add completion times. Convert each worker’s time into a one-hour work rate, then add the rates.'],ex:[F(1,6)+' + '+F(1,3)+' = '+F(1,2)+' công việc mỗi giờ ⇒ cùng làm hết 2 giờ.',F(1,6)+' + '+F(1,3)+' = '+F(1,2)+' of the job per hour ⇒ together they take 2 hours.']}
  ]});
}

/* =====================================================================
   🧠 TOÁN TƯ DUY – BÀI 2.3: LOGIC HỆ THẬP PHÂN QUA ĐÁNH SỐ TRANG
   Chia khối dữ liệu · tư duy thuận – nghịch · đếm chữ số theo hàng.
   Câu hỏi sinh theo ba mức, lời giải song ngữ Việt – Anh.
   ===================================================================== */
{
const V = bi, v = bin, Bb = x => `<b>${fmt(x)}</b>`, L2 = (vi, en) => V(BG(...vi), BG(...en));
const pageDigits = n => n<=0?0:n<=9?n:n<=99?9+(n-9)*2:189+(n-99)*3;
const pageRangeDigits = (a,b) => pageDigits(b)-pageDigits(a-1);
const digitPlaceCounts = (n,d) => { const c=[0,0,0]; for(let x=1;x<=n;x++){ const s=String(x); for(let i=0;i<s.length;i++) if(+s[i]===d) c[s.length-1-i]++; } return c; };
G.topics.splice(G.topics.findIndex(t => t.id === 84) + 1, 0, {id:85, hk:1, name:'Logic hệ thập phân qua bài toán đánh số trang', label:'🧠 Toán tư duy', grp:'🧠 Toán tư duy · Singapore Math'});

/* Dạng 1: chiều xuôi – biết số trang, tìm số chữ số */
const pnForward = lv => {
  if(lv===1) return QB({text:V('Một cuốn truyện có 120 trang. Người ta cần dùng bao nhiêu chữ số để đánh số các trang từ 1 đến 120?', 'A comic book has 120 pages. How many digits are needed to number the pages from 1 to 120?'),tpl:`[_] ${v('chữ số','digits')}`,ans:[252],hint:V('Chia thành ba khối: 1–9, 10–99 và 100–120.', 'Split into three blocks: 1–9, 10–99 and 100–120.'),sol:L2(['Trang 1–9: 9 trang, dùng 9 × 1 = 9 chữ số.','Trang 10–99: 99 − 10 + 1 = 90 trang, dùng 90 × 2 = 180 chữ số.','Trang 100–120: 120 − 100 + 1 = 21 trang, dùng 21 × 3 = 63 chữ số.','Tổng: 9 + 180 + 63 = '+Bb(252)+' chữ số.'],['Pages 1–9: 9 pages use 9 × 1 = 9 digits.','Pages 10–99: 99 − 10 + 1 = 90 pages use 90 × 2 = 180 digits.','Pages 100–120: 120 − 100 + 1 = 21 pages use 21 × 3 = 63 digits.','Total: 9 + 180 + 63 = '+Bb(252)+' digits.'])});
  const n=lv===2?R(35,98):R(105,650),ans=pageDigits(n);
  if(n<=99) return QB({text:V(`Một cuốn sách có ${n} trang. Cần bao nhiêu chữ số để đánh số từ trang 1?`, `A book has ${n} pages. How many digits are needed to number all pages from 1?`),tpl:`[_] ${v('chữ số','digits')}`,ans:[ans],hint:V('Tách khối trang 1 chữ số và trang 2 chữ số.', 'Separate one-digit and two-digit page numbers.'),sol:L2(['Trang 1–9 dùng 9 chữ số.',`Từ trang 10 đến trang ${n} có: ${n} − 10 + 1 = ${n-9} trang.`,`Khối này dùng: ${n-9} × 2 = ${(n-9)*2} chữ số.`,`Tổng: 9 + ${(n-9)*2} = ${Bb(ans)} chữ số.`],['Pages 1–9 use 9 digits.',`From page 10 to ${n}: ${n} − 10 + 1 = ${n-9} pages.`,`This block uses ${n-9} × 2 = ${(n-9)*2} digits.`,`Total: 9 + ${(n-9)*2} = ${Bb(ans)} digits.`])});
  return QB({text:V(`Một cuốn sách có ${n} trang. Cần bao nhiêu chữ số để đánh số từ trang 1?`, `A book has ${n} pages. How many digits are needed to number all pages from 1?`),tpl:`[_] ${v('chữ số','digits')}`,ans:[ans],hint:V('Tính trọn khối 1–99 trước, rồi tính phần từ 100 đến trang cuối.', 'Count the complete 1–99 block first, then the pages from 100 to the last page.'),sol:L2(['Trang 1–9 dùng 9 chữ số; trang 10–99 dùng 90 × 2 = 180 chữ số.',`Từ trang 100 đến ${n} có: ${n} − 100 + 1 = ${n-99} trang.`,`Khối 3 chữ số dùng: ${n-99} × 3 = ${(n-99)*3} chữ số.`,`Tổng: 9 + 180 + ${(n-99)*3} = ${Bb(ans)} chữ số.`],['Pages 1–9 use 9 digits; pages 10–99 use 90 × 2 = 180 digits.',`From page 100 to ${n}: ${n} − 100 + 1 = ${n-99} pages.`,`The 3-digit block uses ${n-99} × 3 = ${(n-99)*3} digits.`,`Total: 9 + 180 + ${(n-99)*3} = ${Bb(ans)} digits.`])});
};

/* Dạng 2: chiều ngược – biết số chữ số, tìm trang cuối */
const pnBackward = lv => {
  if(lv===1) return QB({text:V('Để đánh số trang một cuốn sách từ trang 1, người ta dùng đúng 342 chữ số. Cuốn sách có bao nhiêu trang?', 'Exactly 342 digits are used to number a book starting from page 1. How many pages does the book have?'),tpl:`[_] ${v('trang','pages')}`,ans:[150],hint:V('Bóc khối 1–99 gồm 189 chữ số, rồi chia phần còn lại cho 3.', 'Remove the 189 digits used by pages 1–99, then divide the remainder by 3.'),sol:L2(['Trang 1–9 và 10–99 dùng: 9 + 180 = 189 chữ số.','Còn lại cho các trang 3 chữ số: 342 − 189 = 153 chữ số.','Số trang có 3 chữ số: 153 : 3 = 51 trang.','Trang cuối: 99 + 51 = '+Bb(150)+'.'],['Pages 1–99 use 9 + 180 = 189 digits.','Digits left for 3-digit pages: 342 − 189 = 153.','Number of 3-digit pages: 153 ÷ 3 = 51.','Last page: 99 + 51 = '+Bb(150)+'.'])});
  const last=lv===2?R(25,99):R(110,700),total=pageDigits(last);
  if(last<=99) return QB({text:V(`Đánh số từ trang 1 đến trang cuối cần đúng ${total} chữ số. Trang cuối là trang bao nhiêu?`, `Numbering from page 1 to the last page uses exactly ${total} digits. What is the last page?`),tpl:`[_] ${v('trang','pages')}`,ans:[last],hint:V('Bóc 9 chữ số của trang 1–9; mỗi trang còn lại dùng 2 chữ số.', 'Remove the 9 digits for pages 1–9; each remaining page uses 2 digits.'),sol:L2([`Sau trang 1–9 còn: ${total} − 9 = ${total-9} chữ số.`,`Số trang 2 chữ số: ${total-9} : 2 = ${last-9}.`,`Trang cuối: 9 + ${last-9} = ${Bb(last)}.`],[`After pages 1–9: ${total} − 9 = ${total-9} digits remain.`,`Number of 2-digit pages: ${total-9} ÷ 2 = ${last-9}.`,`Last page: 9 + ${last-9} = ${Bb(last)}.`])});
  return QB({text:V(`Đánh số từ trang 1 đến trang cuối cần đúng ${total} chữ số. Trang cuối là trang bao nhiêu?`, `Numbering from page 1 to the last page uses exactly ${total} digits. What is the last page?`),tpl:`[_] ${v('trang','pages')}`,ans:[last],hint:V('Bóc lần lượt 9 chữ số và 180 chữ số của hai khối đầu.', 'Remove the 9 digits and then the 180 digits used by the first two blocks.'),sol:L2([`Khối trang 1–99 dùng: 9 + 180 = 189 chữ số.`,`Còn lại: ${total} − 189 = ${total-189} chữ số.`,`Số trang 3 chữ số: ${total-189} : 3 = ${last-99}.`,`Trang cuối: 99 + ${last-99} = ${Bb(last)}.`],[`Pages 1–99 use 9 + 180 = 189 digits.`,`Remaining: ${total} − 189 = ${total-189} digits.`,`Number of 3-digit pages: ${total-189} ÷ 3 = ${last-99}.`,`Last page: 99 + ${last-99} = ${Bb(last)}.`])});
};

/* Dạng 3: đếm số lần xuất hiện của một chữ số */
const pnCountDigit = lv => {
  const n=lv===1?100:lv===2?R(60,99):R(120,280),d=lv===1?5:R(1,9),counts=digitPlaceCounts(n,d),ans=counts.reduce((s,x)=>s+x,0);
  return QB({text:V(`Khi đánh số trang từ 1 đến ${n}, chữ số ${d} được viết tất cả bao nhiêu lần?`, `When numbering pages from 1 to ${n}, how many times is the digit ${d} written?`),tpl:`[_] ${v('lần','times')}`,ans:[ans],hint:V('Đếm riêng chữ số đó ở hàng đơn vị, hàng chục và hàng trăm; một số có thể được tính ở nhiều hàng.', 'Count the digit separately in the ones, tens and hundreds places; one page number may contribute in more than one place.'),sol:L2([`Ở hàng đơn vị, chữ số ${d} xuất hiện ${counts[0]} lần.`,`Ở hàng chục, chữ số ${d} xuất hiện ${counts[1]} lần.`,n>=100?`Ở hàng trăm, chữ số ${d} xuất hiện ${counts[2]} lần.`:'Không có trang 3 chữ số nên chưa cần xét hàng trăm.',`Tổng số lần: ${counts.filter((_,i)=>i<=(n>=100?2:1)).join(' + ')} = ${Bb(ans)} lần.`,`Nếu một trang như ${d}${d} chứa hai chữ số ${d}, nó được đếm một lần ở mỗi hàng nên không bị bỏ sót.`],[`The digit ${d} appears ${counts[0]} times in the ones place.`,`It appears ${counts[1]} times in the tens place.`,n>=100?`It appears ${counts[2]} times in the hundreds place.`:'There are no 3-digit pages, so no hundreds place is needed.',`Total: ${counts.filter((_,i)=>i<=(n>=100?2:1)).join(' + ')} = ${Bb(ans)} times.`,`A page such as ${d}${d} contains two copies of ${d}; one is counted in each place.`])});
};

/* Dạng 4: hai mặt của cùng một tờ sách */
const pnLeaf = lv => {
  if(lv===1) return QB({text:V('Một tờ sách có hai mặt mang số trang liên tiếp. Mặt trước là trang lẻ, mặt sau là trang chẵn. Tổng hai số trang là 163. Tờ bị rơi mang số trang nào?', 'A book leaf has two consecutive page numbers. The front is odd and the back is even. Their sum is 163. Which pages are on the missing leaf?'),tpl:`[_] ${v('và','and')} [_]`,ans:[81,82],wide:true,hint:V('Hai số liên tiếp có hiệu bằng 1. Dùng bài toán tìm hai số khi biết tổng và hiệu.', 'The two consecutive numbers differ by 1. Use the sum-and-difference method.'),sol:L2(['Hai số trang liên tiếp có hiệu bằng 1.','Trang nhỏ: (163 − 1) : 2 = 81.','Trang lớn: (163 + 1) : 2 = 82.','Kiểm tra: 81 là số lẻ, 82 là số chẵn và 81 + 82 = 163. Vậy hai trang là '+Bb('81 và 82')+'.'],['The consecutive page numbers differ by 1.','Smaller page: (163 − 1) ÷ 2 = 81.','Larger page: (163 + 1) ÷ 2 = 82.','Check: 81 is odd, 82 is even and their sum is 163. The pages are '+Bb('81 and 82')+'.'])});
  if(lv===2){ const odd=2*R(15,160)+1,even=odd+1,sum=odd+even; return QB({text:V(`Hai mặt của cùng một tờ sách là hai trang liên tiếp, mặt trước mang số lẻ. Tổng hai số trang là ${sum}. Tìm hai trang.`, `The two sides of a leaf are consecutive pages, with an odd number on the front. Their sum is ${sum}. Find the pages.`),tpl:`[_] ${v('và','and')} [_]`,ans:[odd,even],wide:true,hint:V('Hai trang hơn kém nhau 1.', 'The page numbers differ by 1.'),sol:L2([`Trang nhỏ: (${sum} − 1) : 2 = ${odd}.`,`Trang lớn: ${odd} + 1 = ${even}.`,`Vì ${odd} lẻ và ${even} chẵn nên đây đúng là hai mặt của một tờ. Đáp số: ${Bb(`${odd} và ${even}`)}.`],[`Smaller page: (${sum} − 1) ÷ 2 = ${odd}.`,`Larger page: ${odd} + 1 = ${even}.`,`Since ${odd} is odd and ${even} is even, they can be the two sides of one leaf. Answer: ${Bb(`${odd} and ${even}`)}.`])}); }
  const valid=4*R(10,100)+3,good=v(`Tổng ${valid}`,`Sum ${valid}`),bad=[valid-2,valid+2,valid+6].map(x=>v(`Tổng ${x}`,`Sum ${x}`));
  return QC({text:V('Tổng nào dưới đây có thể là tổng hai số trang trên hai mặt của cùng một tờ sách, biết mặt trước là trang lẻ và mặt sau là trang chẵn kế tiếp?', 'Which sum can be the total of the two page numbers on one leaf, where the front is odd and the back is the next even number?'),opts:[good,...bad],ans:good,hint:V('Gọi trang lẻ là 2k + 1 thì trang sau là 2k + 2; tổng bằng 4k + 3.', 'If the odd page is 2k + 1, the next even page is 2k + 2; their sum is 4k + 3.'),sol:L2([`Hai trang của một tờ có dạng 2k + 1 và 2k + 2.`,`Tổng là 4k + 3, tức chia cho 4 dư 3.`,`${valid} chia cho 4 dư 3 nên ${Bb(`tổng ${valid}`)} có thể xảy ra.`],[`The pages have the form 2k + 1 and 2k + 2.`,`Their sum is 4k + 3, which leaves remainder 3 when divided by 4.`,`${valid} leaves remainder 3 modulo 4, so ${Bb(`sum ${valid}`)} is possible.`])});
};

/* Dạng 5: đánh số một đoạn trang, không bắt đầu từ 1 */
const pnRange = lv => {
  let a,b;if(lv===1){a=12;b=35}else if(lv===2){a=R(20,70);b=R(a+10,99)}else{a=R(70,98);b=R(120,260)}const ans=pageRangeDigits(a,b);
  if(b<100) return QB({text:V(`Người ta viết liên tiếp các số trang từ ${a} đến ${b}. Cần bao nhiêu chữ số?`, `Page numbers from ${a} to ${b} are written consecutively. How many digits are needed?`),tpl:`[_] ${v('chữ số','digits')}`,ans:[ans],hint:V('Đếm số trang bằng số cuối trừ số đầu rồi cộng 1.', 'Number of pages equals last minus first plus 1.'),sol:L2([`Số trang: ${b} − ${a} + 1 = ${b-a+1}.`,`Mỗi số trang có 2 chữ số.`,`Số chữ số: ${b-a+1} × 2 = ${Bb(ans)}.`],[`Number of pages: ${b} − ${a} + 1 = ${b-a+1}.`,`Each page number has 2 digits.`,`Digits needed: ${b-a+1} × 2 = ${Bb(ans)}.`])});
  return QB({text:V(`Người ta viết liên tiếp các số trang từ ${a} đến ${b}. Cần bao nhiêu chữ số?`, `Page numbers from ${a} to ${b} are written consecutively. How many digits are needed?`),tpl:`[_] ${v('chữ số','digits')}`,ans:[ans],hint:V('Tách tại ranh giới 99–100.', 'Split the range at the 99–100 boundary.'),sol:L2([`Từ ${a} đến 99 có: 99 − ${a} + 1 = ${100-a} trang, dùng ${100-a} × 2 = ${(100-a)*2} chữ số.`,`Từ 100 đến ${b} có: ${b} − 100 + 1 = ${b-99} trang, dùng ${b-99} × 3 = ${(b-99)*3} chữ số.`,`Tổng: ${(100-a)*2} + ${(b-99)*3} = ${Bb(ans)} chữ số.`],[`From ${a} to 99: 99 − ${a} + 1 = ${100-a} pages, using ${100-a} × 2 = ${(100-a)*2} digits.`,`From 100 to ${b}: ${b} − 100 + 1 = ${b-99} pages, using ${b-99} × 3 = ${(b-99)*3} digits.`,`Total: ${(100-a)*2} + ${(b-99)*3} = ${Bb(ans)} digits.`])});
};

lesson(85, 'td-danh-so-trang', 'Bài 2.3: Logic hệ thập phân qua bài toán đánh số trang sách', 'Chia dữ liệu thành các khối theo số chữ số; giải bài toán thuận, bài toán ngược và các bài đếm chữ số đặc thù.', [pnForward, pnBackward, pnCountDigit, pnLeaf, pnRange], {
  bi:true, en:'Lesson 2.3: Decimal logic through page numbering', descEn:'Split page numbers into digit-length blocks; solve forward, backward and special digit-counting problems.',
  intro:[
    {t:['Khối 1: trang có 1 chữ số', 'Block 1: one-digit pages'],b:['Từ trang 1 đến trang 9 có 9 trang.<br>Số chữ số: 9 × 1 = <b>9</b>.', 'Pages 1 to 9 contain 9 pages.<br>Digits used: 9 × 1 = <b>9</b>.']},
    {t:['Khối 2: trang có 2 chữ số', 'Block 2: two-digit pages'],b:['Từ trang 10 đến trang 99 có 99 − 10 + 1 = 90 trang.<br>Số chữ số: 90 × 2 = <b>180</b>.', 'Pages 10 to 99 contain 99 − 10 + 1 = 90 pages.<br>Digits used: 90 × 2 = <b>180</b>.']},
    {t:['Khối 3: trang có 3 chữ số', 'Block 3: three-digit pages'],b:['Từ trang 100 đến trang 999 có 999 − 100 + 1 = 900 trang.<br>Số chữ số: 900 × 3 = <b>2700</b>.', 'Pages 100 to 999 contain 999 − 100 + 1 = 900 pages.<br>Digits used: 900 × 3 = <b>2700</b>.']},
    {t:['Chiều xuôi', 'Forward thinking'],b:['Biết trang cuối: tính từng khối trọn vẹn, tính phần còn lại của khối cuối rồi cộng các kết quả. Không gộp các trang có độ dài khác nhau.', 'Given the last page: count complete blocks, then the remaining part of the last block, and add. Never mix page numbers with different lengths.']},
    {t:['Chiều ngược', 'Backward thinking'],b:['Biết tổng chữ số: “bóc” lần lượt 9 chữ số của khối 1 và 180 chữ số của khối 2. Phần còn lại chia cho 3 để tìm số trang 3 chữ số.', 'Given the total digits: remove 9 digits for block 1 and 180 for block 2. Divide the remainder by 3 to find the number of 3-digit pages.']},
    {t:['Hai mặt của một tờ sách', 'Two sides of one leaf'],b:['Cùng một tờ có trang lẻ ở mặt trước và trang chẵn kế tiếp ở mặt sau: 1–2, 3–4, 5–6, … Tổng của cặp này luôn chia cho 4 dư 3.', 'One leaf has an odd front page and the next even back page: 1–2, 3–4, 5–6, … Their sum always leaves remainder 3 when divided by 4.']}
  ]});
}

/* =====================================================================
   🧠 HÌNH HỌC TƯ DUY – BÀI 3.1: CHU VI VÀ DIỆN TÍCH HÌNH PHỨC HỢP
   Dời đoạn thẳng · phân mảnh · bù khuyết · khung rỗng.
   Mọi câu hỏi đều có hình SVG đúng tỉ lệ và nhãn kích thước đồng bộ với đề.
   ===================================================================== */
{
const V = bi, v = bin, Bb = x => `<b>${fmt(x)}</b>`, L2 = (vi, en) => V(BG(...vi), BG(...en));
G.topics.splice(G.topics.findIndex(t => t.id === 85) + 1, 0, {id:86, hk:1, name:'Chu vi và diện tích các hình phức hợp', label:'🧠 Hình học tư duy', grp:'🧠 Toán tư duy · Singapore Math'});

/* Dạng 1: hình chữ L – phân mảnh hoặc bù khuyết */
const cgLShape = lv => {
  if(lv===1){const W=10,H=8,cw=4,ch=3,area=W*H-cw*ch;return QB({text:V('Mảnh vườn hình chữ L có kích thước như hình. Tính diện tích mảnh vườn.', 'The L-shaped garden has the dimensions shown. Find its area.'),fig:complexRectSVG('L',{W,H,cw,ch,unit:'m'}),tpl:`[_] ${v('m²','m²')}`,ans:[area],hint:V('Kẻ theo đường nét đứt để chia hình thành hai hình chữ nhật, hoặc lấy hình chữ nhật lớn trừ phần khuyết.', 'Use the dashed line to split the shape into two rectangles, or subtract the missing rectangle from the large rectangle.'),sol:L2(['Căn cứ: diện tích hình chữ L bằng diện tích hình chữ nhật lớn trừ diện tích phần khuyết.','Diện tích hình chữ nhật lớn: 10 × 8 = 80 (m²).','Diện tích phần khuyết: 4 × 3 = 12 (m²).','Diện tích mảnh vườn: 80 − 12 = '+Bb(area)+' (m²).'],['Rule: area of the L-shape equals the large rectangle minus the missing rectangle.','Large rectangle: 10 × 8 = 80 m².','Missing rectangle: 4 × 3 = 12 m².','Garden area: 80 − 12 = '+Bb(area)+' m².'])});}
  const W=R(11,20),H=R(8,15),cw=R(3,W-4),ch=R(2,H-3),area=W*H-cw*ch;
  if(lv===2) return QB({text:V('Hình chữ L có các kích thước ghi trên hình. Tính diện tích hình đó.', 'The L-shape has the dimensions shown. Find its area.'),fig:complexRectSVG('L',{W,H,cw,ch,unit:'cm'}),tpl:`[_] ${v('cm²','cm²')}`,ans:[area],hint:V('Tính phần hình chữ nhật bao ngoài rồi trừ phần chữ nhật bị khuyết.', 'Find the outer rectangle area and subtract the missing rectangle.'),sol:L2([`Diện tích hình bao ngoài: ${W} × ${H} = ${W*H} (cm²).`,`Diện tích phần khuyết: ${cw} × ${ch} = ${cw*ch} (cm²).`,`Diện tích hình chữ L: ${W*H} − ${cw*ch} = ${Bb(area)} (cm²).`],[`Outer rectangle: ${W} × ${H} = ${W*H} cm².`,`Missing rectangle: ${cw} × ${ch} = ${cw*ch} cm².`,`L-shape area: ${W*H} − ${cw*ch} = ${Bb(area)} cm².`])});
  return QB({text:V(`Hình chữ L có diện tích ${area} cm². Chiều rộng và chiều cao bao ngoài là ${W} cm và ${H} cm; cạnh ngang phần khuyết dài ${cw} cm. Tìm chiều cao phần khuyết.`, `An L-shape has area ${area} cm². Its outer width and height are ${W} cm and ${H} cm; the missing part is ${cw} cm wide. Find the height of the missing part.`),fig:complexRectSVG('L',{W,H,cw,ch,unit:'cm',q:'ch'}),tpl:`[_] ${v('cm','cm')}`,ans:[ch],hint:V('Lấy diện tích hình bao ngoài trừ diện tích hình chữ L để tìm diện tích phần khuyết.', 'Subtract the L-shape area from the outer rectangle to find the missing area.'),sol:L2([`Diện tích hình bao ngoài: ${W} × ${H} = ${W*H} (cm²).`,`Diện tích phần khuyết: ${W*H} − ${area} = ${cw*ch} (cm²).`,`Chiều cao phần khuyết: ${cw*ch} : ${cw} = ${Bb(ch)} (cm).`],[`Outer rectangle: ${W} × ${H} = ${W*H} cm².`,`Missing area: ${W*H} − ${area} = ${cw*ch} cm².`,`Missing height: ${cw*ch} ÷ ${cw} = ${Bb(ch)} cm.`])});
};

/* Dạng 2: hình bậc thang – dời đoạn thẳng để tính chu vi */
const cgStairs = lv => {
  if(lv===1){const W=15,H=10,P=2*(W+H);return QB({text:V('Hình bậc thang có chiều ngang bao ngoài 15 cm và chiều cao bao ngoài 10 cm. Một con kiến bò đúng một vòng theo đường biên. Quãng đường dài bao nhiêu?', 'A stair-shaped figure has an overall width of 15 cm and height of 10 cm. An ant walks once around its boundary. How far does it travel?'),fig:complexRectSVG('stairs',{W,H,steps:4,unit:'cm'}),tpl:`[_] ${v('cm','cm')}`,ans:[P],hint:V('Dời và ghép các đoạn ngang, dọc của bậc thang. Chu vi bằng chu vi hình chữ nhật bao quanh.', 'Translate and join the horizontal and vertical stair edges. The perimeter equals that of the bounding rectangle.'),sol:L2(['Tổng các đoạn ngang của phần bậc thang bằng 15 cm; cộng cạnh đáy, tổng độ dài theo phương ngang là 15 × 2.','Tổng các đoạn dọc của phần bậc thang bằng 10 cm; cộng cạnh trái, tổng độ dài theo phương dọc là 10 × 2.','Chu vi: (15 + 10) × 2 = '+Bb(P)+' (cm).'],['The horizontal stair segments total 15 cm; together with the base, the horizontal contribution is 15 × 2.','The vertical stair segments total 10 cm; together with the left side, the vertical contribution is 10 × 2.','Perimeter: (15 + 10) × 2 = '+Bb(P)+' cm.'])});}
  const W=R(12,28),H=R(7,18),steps=R(3,5),P=2*(W+H);
  if(lv===2) return QB({text:V('Không cần biết từng bậc nhỏ. Dựa vào kích thước bao ngoài trên hình, hãy tính chu vi hình bậc thang.', 'The individual steps are not needed. Use the overall dimensions shown to find the perimeter.'),fig:complexRectSVG('stairs',{W,H,steps,unit:'cm'}),tpl:`[_] ${v('cm','cm')}`,ans:[P],hint:V('Các đoạn ngang ghép thành hai lần chiều ngang; các đoạn dọc ghép thành hai lần chiều cao.', 'The horizontal edges combine to twice the width; the vertical edges combine to twice the height.'),sol:L2([`Tổng độ dài theo phương ngang: ${W} × 2 = ${2*W} (cm).`,`Tổng độ dài theo phương dọc: ${H} × 2 = ${2*H} (cm).`,`Chu vi: ${2*W} + ${2*H} = ${Bb(P)} (cm).`],[`Horizontal contribution: ${W} × 2 = ${2*W} cm.`,`Vertical contribution: ${H} × 2 = ${2*H} cm.`,`Perimeter: ${2*W} + ${2*H} = ${Bb(P)} cm.`])});
  return QB({text:V(`Hình bậc thang có chu vi ${P} cm và chiều ngang bao ngoài ${W} cm. Tìm chiều cao bao ngoài.`, `A stair-shaped figure has perimeter ${P} cm and overall width ${W} cm. Find its overall height.`),fig:complexRectSVG('stairs',{W,H,steps,unit:'cm',q:'H'}),tpl:`[_] ${v('cm','cm')}`,ans:[H],hint:V('Chu vi hình bậc thang bằng 2 lần tổng chiều ngang và chiều cao bao ngoài.', 'The stair perimeter equals twice the sum of its overall width and height.'),sol:L2([`Nửa chu vi: ${P} : 2 = ${W+H} (cm).`,`Chiều cao: ${W+H} − ${W} = ${Bb(H)} (cm).`],[`Half-perimeter: ${P} ÷ 2 = ${W+H} cm.`,`Height: ${W+H} − ${W} = ${Bb(H)} cm.`])});
};

/* Dạng 3: cắt bốn hình vuông ở bốn góc */
const cgCutCorners = lv => {
  const W=lv<3?20:R(18,30),H=lv<3?12:R(12,18),c=lv<3?3:R(2,Math.floor(Math.min(W,H)/3)),P=2*(W+H),area=W*H-4*c*c,fig=complexRectSVG('cutCorners',{W,H,c,unit:'cm'});
  if(lv===1) return QB({text:V('Từ hình chữ nhật 20 cm × 12 cm, người ta cắt bỏ bốn hình vuông cạnh 3 cm ở bốn góc như hình. Tính chu vi phần còn lại.', 'Four 3 cm squares are cut from the corners of a 20 cm by 12 cm rectangle as shown. Find the perimeter of the remaining shape.'),fig,tpl:`[_] ${v('cm','cm')}`,ans:[P],hint:V('Mỗi góc mất hai đoạn cạnh dài 3 cm nhưng đồng thời xuất hiện hai đoạn lõm mới cũng dài 3 cm.', 'At each corner, two 3 cm outer pieces disappear and two new 3 cm inner edges appear.'),sol:L2(['Ở mỗi góc, tổng độ dài hai cạnh bị mất bằng tổng độ dài hai cạnh lõm mới. Vì vậy chu vi không đổi.','Chu vi hình chữ nhật ban đầu: (20 + 12) × 2 = '+Bb(P)+' (cm).'],['At each corner, the two lost edge pieces have the same total length as the two new inner edges. The perimeter is unchanged.','Original rectangle perimeter: (20 + 12) × 2 = '+Bb(P)+' cm.'])});
  if(lv===2) return QB({text:V('Từ hình chữ nhật 20 cm × 12 cm, người ta cắt bỏ bốn hình vuông cạnh 3 cm ở bốn góc. Tính diện tích phần còn lại.', 'Four 3 cm squares are cut from the corners of a 20 cm by 12 cm rectangle. Find the remaining area.'),fig,tpl:`[_] ${v('cm²','cm²')}`,ans:[area],hint:V('Diện tích bị giảm thật sự: lấy diện tích hình chữ nhật trừ diện tích bốn hình vuông.', 'Area is truly removed: subtract the four square areas from the rectangle.'),sol:L2(['Diện tích hình chữ nhật ban đầu: 20 × 12 = 240 (cm²).','Diện tích bốn hình vuông bị cắt: 4 × (3 × 3) = 36 (cm²).','Diện tích còn lại: 240 − 36 = '+Bb(area)+' (cm²).'],['Original rectangle area: 20 × 12 = 240 cm².','Area of four removed squares: 4 × (3 × 3) = 36 cm².','Remaining area: 240 − 36 = '+Bb(area)+' cm².'])});
  return QB({text:V(`Hình chữ nhật ${W} cm × ${H} cm bị cắt bốn hình vuông cạnh ${c} cm ở bốn góc. Tìm chu vi và diện tích phần còn lại.`, `A ${W} cm by ${H} cm rectangle has four corner squares of side ${c} cm removed. Find the perimeter and remaining area.`),fig,tpl:`${v('Chu vi','Perimeter')} = [_] ${v('cm','cm')} &nbsp; ${v('Diện tích','Area')} = [_] ${v('cm²','cm²')}`,ans:[P,area],wide:true,hint:V('Chu vi không đổi do cạnh mất được thay bằng cạnh lõm bằng nhau; diện tích phải trừ bốn hình vuông.', 'The perimeter is unchanged because equal inner edges replace the lost edges; subtract four squares for the area.'),sol:L2([`Chu vi không đổi: (${W} + ${H}) × 2 = ${P} (cm).`,`Diện tích ban đầu: ${W} × ${H} = ${W*H} (cm²).`,`Diện tích bị cắt: 4 × (${c} × ${c}) = ${4*c*c} (cm²).`,`Diện tích còn lại: ${W*H} − ${4*c*c} = ${Bb(area)} (cm²).`],[`Perimeter is unchanged: (${W} + ${H}) × 2 = ${P} cm.`,`Original area: ${W} × ${H} = ${W*H} cm².`,`Removed area: 4 × (${c} × ${c}) = ${4*c*c} cm².`,`Remaining area: ${W*H} − ${4*c*c} = ${Bb(area)} cm².`])});
};

/* Dạng 4: khung hình chữ nhật – diện tích bao ngoài trừ phần rỗng */
const cgFrame = lv => {
  if(lv===1){const W=40,H=30,w=32,h=22,area=W*H-w*h;return QB({text:V('Khung tranh có kích thước ngoài 40 cm × 30 cm và phần rỗng bên trong 32 cm × 22 cm. Tính diện tích phần nẹp gỗ.', 'A picture frame measures 40 cm by 30 cm outside and has a 32 cm by 22 cm opening. Find the wooden frame area.'),fig:complexRectSVG('frame',{W,H,w,h,unit:'cm'}),tpl:`[_] ${v('cm²','cm²')}`,ans:[area],hint:V('Phần nẹp bằng diện tích hình chữ nhật ngoài trừ diện tích phần rỗng.', 'The frame area equals the outer rectangle area minus the opening area.'),sol:L2(['Diện tích hình chữ nhật ngoài: 40 × 30 = 1 200 (cm²).','Diện tích phần rỗng: 32 × 22 = 704 (cm²).','Diện tích nẹp gỗ: 1 200 − 704 = '+Bb(area)+' (cm²).'],['Outer rectangle area: 40 × 30 = 1,200 cm².','Opening area: 32 × 22 = 704 cm².','Wooden frame area: 1,200 − 704 = '+Bb(area)+' cm².'])});}
  const W=R(24,45),H=R(18,32);
  if(lv===2){const w=R(Math.floor(W/2),W-5),h=R(Math.floor(H/2),H-5),area=W*H-w*h;return QB({text:V('Tính diện tích phần được tô của khung chữ nhật trong hình.', 'Find the shaded area of the rectangular frame.'),fig:complexRectSVG('frame',{W,H,w,h,unit:'cm'}),tpl:`[_] ${v('cm²','cm²')}`,ans:[area],hint:V('Lấy diện tích hình bao ngoài trừ diện tích hình rỗng bên trong.', 'Subtract the inner opening area from the outer rectangle area.'),sol:L2([`Diện tích bao ngoài: ${W} × ${H} = ${W*H} (cm²).`,`Diện tích phần rỗng: ${w} × ${h} = ${w*h} (cm²).`,`Diện tích khung: ${W*H} − ${w*h} = ${Bb(area)} (cm²).`],[`Outer area: ${W} × ${H} = ${W*H} cm².`,`Opening area: ${w} × ${h} = ${w*h} cm².`,`Frame area: ${W*H} − ${w*h} = ${Bb(area)} cm².`])});}
  const t=R(2,Math.min(6,Math.floor((H-6)/2))),w=W-2*t,h=H-2*t,area=W*H-w*h;
  return QB({text:V(`Một khung chữ nhật có kích thước ngoài ${W} cm × ${H} cm. Nẹp gỗ rộng đều ${t} cm. Tính diện tích phần nẹp.`, `A rectangular frame measures ${W} cm by ${H} cm outside. The border has uniform width ${t} cm. Find the border area.`),fig:complexRectSVG('frame',{W,H,w,h,t,showInner:false,unit:'cm'}),tpl:`[_] ${v('cm²','cm²')}`,ans:[area],hint:V('Mỗi kích thước của phần rỗng giảm hai lần bề rộng nẹp.', 'Each opening dimension is reduced by twice the border width.'),sol:L2([`Chiều dài phần rỗng: ${W} − ${t} × 2 = ${w} (cm).`,`Chiều rộng phần rỗng: ${H} − ${t} × 2 = ${h} (cm).`,`Diện tích bao ngoài: ${W} × ${H} = ${W*H} (cm²).`,`Diện tích phần rỗng: ${w} × ${h} = ${w*h} (cm²).`,`Diện tích nẹp: ${W*H} − ${w*h} = ${Bb(area)} (cm²).`],[`Opening length: ${W} − ${t} × 2 = ${w} cm.`,`Opening width: ${H} − ${t} × 2 = ${h} cm.`,`Outer area: ${W} × ${H} = ${W*H} cm².`,`Opening area: ${w} × ${h} = ${w*h} cm².`,`Border area: ${W*H} − ${w*h} = ${Bb(area)} cm².`])});
};

lesson(86, 'td-chu-vi-dien-tich-hinh-phuc-hop', 'Bài 3.1: Chu vi và diện tích các hình phức hợp', 'Dùng dời đoạn thẳng để tính chu vi; dùng phân mảnh và bù khuyết để tính diện tích hình chữ L, hình bậc thang, hình cắt góc và khung rỗng.', [cgLShape, cgStairs, cgCutCorners, cgFrame], {
  bi:true, en:'Lesson 3.1: Perimeter and area of composite shapes', descEn:'Use edge translation for perimeter and decomposition or subtraction for the area of L-shapes, stair shapes, cut corners and frames.',
  intro:[
    {t:['Chu vi và diện tích', 'Perimeter and area'],b:['<b>Chu vi</b> là độ dài toàn bộ đường biên. <b>Diện tích</b> là phần mặt phẳng hình chiếm chỗ. Hai đại lượng cần hai cách suy nghĩ khác nhau.', '<b>Perimeter</b> is the total boundary length. <b>Area</b> is the region covered by the shape. They require different reasoning.']},
    {t:['Dời đoạn thẳng – chỉ dùng cho chu vi', 'Translate edges – perimeter only'],b:['Với hình bậc thang vuông góc, ghép các đoạn ngang sẽ được chiều ngang bao ngoài; ghép các đoạn dọc sẽ được chiều cao bao ngoài. Chu vi bằng chu vi hình chữ nhật bao quanh.', 'For a right-angled stair shape, the horizontal pieces combine to the overall width and the vertical pieces combine to the overall height. Its perimeter equals the bounding rectangle perimeter.'],fig:complexRectSVG('stairs',{W:15,H:10,steps:4,unit:'cm'})},
    {t:['Phân mảnh và bù khuyết', 'Decompose and subtract'],b:['Tính diện tích bằng một trong hai cách: chia hình thành các hình chữ nhật nhỏ rồi cộng; hoặc lấy hình chữ nhật bao ngoài trừ phần bị khuyết.', 'For area, either split the shape into smaller rectangles and add, or subtract the missing part from the outer rectangle.'],fig:complexRectSVG('L',{W:10,H:8,cw:4,ch:3,unit:'m'})},
    {t:['Bẫy cắt góc', 'Corner-cut trap'],b:['Cắt một hình vuông ở góc làm mất hai đoạn biên nhưng tạo hai đoạn lõm có tổng độ dài bằng nhau, nên chu vi không đổi. Diện tích vẫn giảm đúng bằng phần bị cắt.', 'Cutting a square from a corner removes two edge pieces but creates two equal inner pieces, so the perimeter stays unchanged. The area decreases by the removed square.'],fig:complexRectSVG('cutCorners',{W:20,H:12,c:3,unit:'cm'})},
    {t:['Khung rỗng', 'Hollow frame'],b:['Diện tích khung = diện tích hình chữ nhật ngoài − diện tích phần rỗng bên trong.', 'Frame area = outer rectangle area − inner opening area.'],fig:complexRectSVG('frame',{W:40,H:30,w:32,h:22,unit:'cm'})}
  ]});
}

/* =====================================================================
   🧠 HÌNH HỌC TƯ DUY – BÀI 3.2: KHỐI KHÔNG GIAN VÀ ĐẾM HÌNH
   Chụp X-quang theo tầng · hình khai triển · đếm tam giác · khối sơn màu · lưới chữ nhật.
   Mọi câu đều có hình SVG trực quan đồng bộ với dữ kiện.
   ===================================================================== */
{
const V = bi, v = bin, Bb = x => `<b>${fmt(x)}</b>`, L2 = (vi, en) => V(BG(...vi), BG(...en));
const sumHeights = a => a.flat().reduce((s,x)=>s+x,0);
const layerCount = (a,k) => a.flat().filter(x=>x>=k).length;
const gridRects = (r,c) => r*(r+1)*c*(c+1)/4;
const gridSquares = (r,c) => {let s=0;for(let k=1;k<=Math.min(r,c);k++)s+=(r-k+1)*(c-k+1);return s;};
G.topics.splice(G.topics.findIndex(t => t.id === 86) + 1, 0, {id:87, hk:1, name:'Phân tích khối không gian ba chiều và đếm hình', label:'🧠 Hình học tư duy', grp:'🧠 Toán tư duy · Singapore Math'});

/* Dạng 1: chụp X-quang và đếm khối theo tầng */
const scTower = lv => {
  if(lv===1){const h=[[1,2,1],[2,3,2]];return QB({text:V('Một mô hình có 1 khối ở tầng trên cùng. Tầng thứ hai có 3 khối nhìn thấy và 1 khối bị che làm bệ đỡ. Tầng đáy có 6 khối. Mô hình gồm tất cả bao nhiêu khối lập phương nhỏ?', 'A model has 1 cube on the top layer. The second layer has 3 visible cubes and 1 hidden supporting cube. The bottom layer has 6 cubes. How many small cubes are there altogether?'),fig:cubeTowerSVG(h,{caption:'Đếm theo từng tầng / Count layer by layer'}),tpl:`[_] ${v('khối','cubes')}`,ans:[11],hint:V('Lập bảng theo ba tầng; nhớ cộng khối bệ đỡ bị che ở tầng thứ hai.', 'Make a three-layer table and include the hidden supporting cube on the second layer.'),sol:L2(['Tầng trên cùng: 1 khối.','Tầng thứ hai: 3 khối nhìn thấy + 1 khối bệ đỡ = 4 khối.','Tầng đáy: 6 khối.','Tổng số khối: 1 + 4 + 6 = '+Bb(11)+' khối.'],['Top layer: 1 cube.','Second layer: 3 visible cubes + 1 supporting cube = 4 cubes.','Bottom layer: 6 cubes.','Total: 1 + 4 + 6 = '+Bb(11)+' cubes.'])});}
  const h=pick([[[1,2],[2,3]],[[2,2,1],[3,2,1]],[[1,2,2],[2,3,1]],[[2,1,2],[3,2,2]]]),mx=Math.max(...h.flat()),layers=Array.from({length:mx},(_,i)=>layerCount(h,i+1)),total=sumHeights(h),base=layers[0];
  if(lv===2) return QB({text:V(`Quan sát mô hình và đếm theo tầng. Tầng đáy có ${layers[0]} khối, tầng thứ hai có ${layers[1]} khối${mx>2?`, tầng thứ ba có ${layers[2]} khối`:''}. Hỏi mô hình có tất cả bao nhiêu khối?`, `Count the model by layers. The bottom has ${layers[0]} cubes, the second has ${layers[1]}${mx>2?`, and the third has ${layers[2]}`:''}. How many cubes are there altogether?`),fig:cubeTowerSVG(h),tpl:`[_] ${v('khối','cubes')}`,ans:[total],hint:V('Cộng số khối của từng tầng, không chỉ đếm các mặt trên nhìn thấy.', 'Add the cubes on every layer; do not count only the visible top faces.'),sol:L2([`Số khối theo các tầng từ dưới lên: ${layers.join(', ')}.`,`Tổng: ${layers.join(' + ')} = ${Bb(total)} khối.`],[`Cubes by layer from bottom to top: ${layers.join(', ')}.`,`Total: ${layers.join(' + ')} = ${Bb(total)} cubes.`])});
  const hidden=total-base;
  return QB({text:V('Nhìn mô hình từ trên xuống, mỗi cột chỉ thấy khối trên cùng. Có bao nhiêu khối nằm bên dưới khối khác và bị che khỏi tầm nhìn từ trên?', 'Viewed from above, only the top cube of each column is visible. How many cubes lie below another cube and are hidden from the top view?'),fig:cubeTowerSVG(h,{caption:'Hãy tưởng tượng chụp X-quang từng cột / X-ray each column'}),tpl:`[_] ${v('khối','cubes')}`,ans:[hidden],hint:V('Mỗi vị trí ở đáy tạo thành một cột và chỉ có một khối trên cùng được nhìn thấy.', 'Each bottom position forms one column, and only one top cube in each column is visible.'),sol:L2([`Tổng số khối của mô hình: ${layers.join(' + ')} = ${total}.`,`Có ${base} cột nên nhìn từ trên thấy ${base} khối trên cùng.`,`Số khối nằm phía dưới và bị che: ${total} − ${base} = ${Bb(hidden)} khối.`],[`Total cubes: ${layers.join(' + ')} = ${total}.`,`There are ${base} columns, so ${base} top cubes are visible from above.`,`Hidden cubes below them: ${total} − ${base} = ${Bb(hidden)}.`])});
};

/* Dạng 2: hình khai triển và các cặp mặt đối diện */
const scNet = lv => {
  if(lv===1){const good='6';return QC({text:V('Gấp hình khai triển thành khối lập phương. Mặt nào đối diện với mặt số 1?', 'Fold the net into a cube. Which face is opposite face 1?'),fig:cubeNetSVG(),opts:['2','3','5',good],ans:good,keepOrder:true,hint:V('Lấy mặt 1 làm đáy; bốn mặt chung cạnh dựng lên, mặt nối đuôi xa nhất trở thành nắp.', 'Use face 1 as the base; its four neighbours fold up, and the far tail face becomes the lid.'),sol:L2(['Mặt 1 ở giữa làm đáy.','Các mặt 2, 3, 4, 5 chung cạnh với mặt 1 nên gấp lên thành bốn mặt bên.','Mặt 6 nối ngoài mặt 5 sẽ gập lại làm nắp. Vì vậy mặt đối diện mặt 1 là '+Bb(6)+'.'],['Face 1 is the base.','Faces 2, 3, 4 and 5 share an edge with face 1, so they become side faces.','Face 6 folds over as the lid. Therefore it is opposite face '+Bb(6)+'.'])});}
  const nums=shuffle(['1','2','3','4','5','6']),keys=['center','top','left','right','bottom','tail'],labels=Object.fromEntries(keys.map((k,i)=>[k,nums[i]])),opp=[5,4,3,2,1,0];
  if(lv===2){const p=R(0,5),good=nums[opp[p]],wrong=shuffle(nums.filter(x=>x!==good&&x!==nums[p])).slice(0,3);return QC({text:V(`Gấp hình khai triển thành khối lập phương. Mặt nào đối diện với mặt ${nums[p]}?`, `Fold the net into a cube. Which face is opposite face ${nums[p]}?`),fig:cubeNetSVG(labels),opts:[good,...wrong],ans:good,hint:V('Xác định ba cặp vị trí đối diện: mặt giữa–mặt đuôi, mặt trên–mặt dưới, mặt trái–mặt phải.', 'Use the three opposite position pairs: centre–tail, top–bottom and left–right.'),sol:L2([`Ba cặp mặt đối diện theo vị trí là: ${nums[0]}–${nums[5]}, ${nums[1]}–${nums[4]}, ${nums[2]}–${nums[3]}.`,`Vậy mặt đối diện với ${nums[p]} là ${Bb(good)}.`],[`The opposite pairs are ${nums[0]}–${nums[5]}, ${nums[1]}–${nums[4]} and ${nums[2]}–${nums[3]}.`,`Thus the face opposite ${nums[p]} is ${Bb(good)}.`])});}
  const pair=pick([[0,5],[1,4],[2,3]]),good=v(`${nums[pair[0]]} và ${nums[pair[1]]}`,`${nums[pair[0]]} and ${nums[pair[1]]}`),bad=[[0,1],[0,2],[1,2]].map(([a,b])=>v(`${nums[a]} và ${nums[b]}`,`${nums[a]} and ${nums[b]}`));
  return QC({text:V('Cặp mặt nào sẽ đối diện nhau sau khi gấp hình?', 'Which pair of faces will be opposite after folding?'),fig:cubeNetSVG(labels),opts:[good,...bad],ans:good,hint:V('Hai mặt chung một cạnh trên hình phẳng không thể đối diện nhau.', 'Two faces sharing an edge in the net cannot be opposite.'),sol:L2([`Các cặp vị trí đối diện là giữa–đuôi, trên–dưới và trái–phải.`,`Theo hình, cặp cần chọn là ${Bb(good)}.`],[`The opposite position pairs are centre–tail, top–bottom and left–right.`,`From the net, choose ${Bb(good)}.`])});
};

/* Dạng 3: đếm tam giác chung một đỉnh */
const scTriangles = lv => {
  const n=lv===1?R(3,4):lv===2?5:R(6,8),total=n*(n+1)/2;
  if(lv<3) return QB({text:V(`Tam giác lớn được chia thành ${n} tam giác nhỏ cùng chung đỉnh như hình. Có tất cả bao nhiêu tam giác với mọi kích thước?`, `The large triangle is split into ${n} small triangles sharing one vertex. How many triangles of all sizes are there?`),fig:triangleFanSVG(n,{number:true}),tpl:`[_] ${v('tam giác','triangles')}`,ans:[total],hint:V(`Đếm lần lượt tam giác gồm 1 phần, 2 phần, cho đến ${n} phần liền nhau.`, `Count triangles made of 1 part, 2 adjacent parts, up to all ${n} parts.`),sol:L2([`Tam giác gồm 1 phần: ${n} hình.`,`Gồm 2 phần liền nhau: ${n-1} hình; tiếp tục giảm dần đến 1 hình lớn nhất.`,`Tổng: ${Array.from({length:n},(_,i)=>n-i).join(' + ')} = ${Bb(total)} tam giác.`],[`One-part triangles: ${n}.`,`Two-part triangles: ${n-1}; continue down to the single largest triangle.`,`Total: ${Array.from({length:n},(_,i)=>n-i).join(' + ')} = ${Bb(total)} triangles.`])});
  const composite=total-n;
  return QB({text:V(`Hình có ${n} tam giác nhỏ cùng chung đỉnh. Có bao nhiêu tam giác được ghép từ ít nhất 2 tam giác nhỏ?`, `The figure has ${n} small triangles sharing one vertex. How many triangles are made from at least 2 small triangles?`),fig:triangleFanSVG(n,{number:true}),tpl:`[_] ${v('tam giác','triangles')}`,ans:[composite],hint:V('Tính tổng số tam giác mọi kích thước rồi bỏ các tam giác chỉ gồm một phần.', 'Find all triangles, then remove the one-part triangles.'),sol:L2([`Tổng mọi tam giác: ${Array.from({length:n},(_,i)=>n-i).join(' + ')} = ${total}.`,`Có ${n} tam giác chỉ gồm 1 phần.`,`Số tam giác ghép từ ít nhất 2 phần: ${total} − ${n} = ${Bb(composite)}.`],[`All triangles: ${Array.from({length:n},(_,i)=>n-i).join(' + ')} = ${total}.`,`There are ${n} one-part triangles.`,`Triangles made from at least 2 parts: ${total} − ${n} = ${Bb(composite)}.`])});
};

/* Dạng 4: khối lập phương được sơn toàn bộ mặt ngoài */
const scPaintedCube = lv => {
  if(lv===1){const n=3;return QB({text:V('Ghép 27 khối nhỏ thành khối lập phương 3 × 3 × 3 rồi sơn toàn bộ mặt ngoài. Có bao nhiêu khối nhỏ được sơn đúng 3 mặt?', 'Twenty-seven small cubes form a 3 × 3 × 3 cube whose outside is painted. How many small cubes have exactly 3 painted faces?'),fig:paintedCubeSVG(n),tpl:`[_] ${v('khối','cubes')}`,ans:[8],hint:V('Khối sơn đúng 3 mặt chỉ nằm ở các đỉnh của khối lớn.', 'Cubes with exactly 3 painted faces are at the vertices of the large cube.'),sol:L2(['Một khối lập phương có 8 đỉnh.','Tại mỗi đỉnh có đúng 1 khối nhỏ tiếp xúc với 3 mặt ngoài.','Vậy có '+Bb(8)+' khối được sơn đúng 3 mặt.'],['A cube has 8 vertices.','At each vertex, exactly one small cube touches 3 outer faces.','Therefore '+Bb(8)+' cubes have exactly 3 painted faces.'])});}
  if(lv===2){const n=3;return QB({text:V('Khối lập phương 3 × 3 × 3 được sơn toàn bộ mặt ngoài rồi tháo rời. Tìm số khối nhỏ được sơn đúng 3 mặt và số khối không được sơn mặt nào.', 'A 3 × 3 × 3 cube is painted outside and separated. Find the numbers of small cubes with exactly 3 painted faces and with no painted face.'),fig:paintedCubeSVG(n),tpl:`${v('Sơn 3 mặt','3 faces')} = [_] &nbsp; ${v('Không sơn','Unpainted')} = [_]`,ans:[8,1],wide:true,hint:V('Ba mặt: đếm các đỉnh. Không mặt: lột một lớp vỏ ở cả sáu phía.', 'Three faces: count vertices. No face: remove one outer layer from all six sides.'),sol:L2(['Khối sơn 3 mặt nằm ở 8 đỉnh nên có 8 khối.','Lõi không sơn có kích thước: (3 − 2) × (3 − 2) × (3 − 2).','Số khối không sơn: 1 × 1 × 1 = 1.','Đáp số: '+Bb('8 khối; 1 khối')+'.'],['Three-face cubes lie at the 8 vertices.','The unpainted core measures (3 − 2) × (3 − 2) × (3 − 2).','Unpainted cubes: 1 × 1 × 1 = 1.','Answer: '+Bb('8 cubes; 1 cube')+'.'])});}
  const n=R(4,7),two=12*(n-2),one=6*(n-2)*(n-2),none=(n-2)**3;
  return QB({text:V(`Khối lập phương ${n} × ${n} × ${n} được sơn toàn bộ mặt ngoài. Tìm số khối nhỏ được sơn đúng 2 mặt, đúng 1 mặt và không mặt nào.`, `A ${n} × ${n} × ${n} cube is painted outside. Find the numbers of small cubes with exactly 2 painted faces, exactly 1 painted face and no painted face.`),fig:paintedCubeSVG(n),tpl:`${v('Sơn 2 mặt','2 faces')} = [_] &nbsp; ${v('Sơn 1 mặt','1 face')} = [_] &nbsp; ${v('Không sơn','Unpainted')} = [_]`,ans:[two,one,none],wide:true,hint:V('Hai mặt: nằm trên 12 cạnh nhưng bỏ hai đầu. Một mặt: nằm trong phần giữa của 6 mặt. Không mặt: lõi bên trong.', 'Two faces: along 12 edges excluding endpoints. One face: inside each of 6 faces. No face: the inner core.'),sol:L2([`Mỗi cạnh có ${n} − 2 = ${n-2} khối không ở đỉnh. Sơn đúng 2 mặt: 12 × ${n-2} = ${two}.`,`Trên mỗi mặt, phần không chạm cạnh có (${n} − 2) × (${n} − 2) khối. Sơn đúng 1 mặt: 6 × ${n-2} × ${n-2} = ${one}.`,`Lõi không sơn: (${n} − 2)³ = ${n-2}³ = ${Bb(none)}.`],[`Each edge has ${n} − 2 = ${n-2} non-vertex cubes. Exactly 2 faces: 12 × ${n-2} = ${two}.`,`Inside each face are (${n} − 2) × (${n} − 2) cubes. Exactly 1 face: 6 × ${n-2} × ${n-2} = ${one}.`,`Unpainted core: (${n} − 2)³ = ${n-2}³ = ${Bb(none)}.`])});
};

/* Dạng 5: đếm hình chữ nhật và hình vuông trên lưới */
const scGrid = lv => {
  if(lv===1){const r=1,c=R(4,7),ans=gridRects(r,c);return QB({text:V(`Một dải gồm ${c} ô vuông như hình. Có bao nhiêu hình chữ nhật, kể cả hình vuông?`, `A strip contains ${c} squares as shown. How many rectangles, including squares, are there?`),fig:rectGridSVG(r,c),tpl:`[_] ${v('hình','shapes')}`,ans:[ans],hint:V('Đếm hình dài 1 ô, 2 ô, rồi tăng dần đến cả dải.', 'Count rectangles of length 1, 2 and so on up to the whole strip.'),sol:L2([`Dài 1 ô có ${c} hình; dài 2 ô có ${c-1} hình; tiếp tục đến 1 hình dài cả dải.`,`Tổng: ${Array.from({length:c},(_,i)=>c-i).join(' + ')} = ${Bb(ans)} hình.`],[`There are ${c} one-cell rectangles, ${c-1} two-cell rectangles, down to 1 whole-strip rectangle.`,`Total: ${Array.from({length:c},(_,i)=>c-i).join(' + ')} = ${Bb(ans)}.`])});}
  const r=lv===2?R(2,4):R(3,5),c=lv===2?R(3,6):R(4,7),all=gridRects(r,c),sq=gridSquares(r,c);
  if(lv===2) return QB({text:V(`Lưới có ${r} hàng và ${c} cột. Có tất cả bao nhiêu hình chữ nhật, kể cả hình vuông?`, `The grid has ${r} rows and ${c} columns. How many rectangles are there, including squares?`),fig:rectGridSVG(r,c),tpl:`[_] ${v('hình chữ nhật','rectangles')}`,ans:[all],hint:V('Mỗi hình chữ nhật được xác định bởi một đoạn ngang gồm các cột liên tiếp và một đoạn dọc gồm các hàng liên tiếp.', 'Each rectangle is determined by a consecutive horizontal span and a consecutive vertical span.'),sol:L2([`Số cách chọn một dải cột liên tiếp: ${Array.from({length:c},(_,i)=>c-i).join(' + ')} = ${c*(c+1)/2}.`,`Số cách chọn một dải hàng liên tiếp: ${Array.from({length:r},(_,i)=>r-i).join(' + ')} = ${r*(r+1)/2}.`,`Số hình chữ nhật: ${c*(c+1)/2} × ${r*(r+1)/2} = ${Bb(all)}.`],[`Consecutive column spans: ${Array.from({length:c},(_,i)=>c-i).join(' + ')} = ${c*(c+1)/2}.`,`Consecutive row spans: ${Array.from({length:r},(_,i)=>r-i).join(' + ')} = ${r*(r+1)/2}.`,`Rectangles: ${c*(c+1)/2} × ${r*(r+1)/2} = ${Bb(all)}.`])});
  const nonSquare=all-sq;
  return QB({text:V(`Lưới ${r} hàng, ${c} cột có bao nhiêu hình chữ nhật không phải hình vuông?`, `How many rectangles in the ${r}-by-${c} grid are not squares?`),fig:rectGridSVG(r,c),tpl:`[_] ${v('hình','rectangles')}`,ans:[nonSquare],hint:V('Tính tất cả hình chữ nhật kể cả hình vuông, rồi trừ số hình vuông theo từng kích thước.', 'Count all rectangles including squares, then subtract squares of every size.'),sol:L2([`Tổng số hình chữ nhật kể cả hình vuông: ${all}.`,`Số hình vuông theo từng cỡ: ${Array.from({length:Math.min(r,c)},(_,i)=>(r-i)*(c-i)).join(' + ')} = ${sq}.`,`Hình chữ nhật không phải hình vuông: ${all} − ${sq} = ${Bb(nonSquare)}.`],[`All rectangles including squares: ${all}.`,`Squares by size: ${Array.from({length:Math.min(r,c)},(_,i)=>(r-i)*(c-i)).join(' + ')} = ${sq}.`,`Non-square rectangles: ${all} − ${sq} = ${Bb(nonSquare)}.`])});
};

lesson(87, 'td-khoi-khong-gian-va-dem-hinh', 'Bài 3.2: Phân tích khối không gian ba chiều và đếm hình', 'Đếm khối theo tầng, nhận biết mặt đối diện trên hình khai triển, đếm tam giác có hệ thống, phân loại khối sơn màu và đếm hình trên lưới.', [scTower, scNet, scTriangles, scPaintedCube, scGrid], {
  bi:true, en:'Lesson 3.2: Three-dimensional solids and shape counting', descEn:'Count cubes by layers, reason with cube nets, count triangles systematically, classify painted cubes and count grid rectangles.',
  intro:[
    {t:['Chụp X-quang theo tầng', 'X-ray thinking by layers'],b:['Khối ở tầng trên phải có khối phía dưới làm bệ đỡ. Hãy đếm từng tầng từ dưới lên, hoặc đếm từng cột từ trên xuống, rồi cộng lại.', 'Every upper cube needs support below. Count layer by layer from the bottom, or column by column from the top, then add.'],fig:cubeTowerSVG([[1,2,1],[2,3,2]])},
    {t:['Khối lập phương và hình khai triển', 'Cube structure and nets'],b:['Khối lập phương có 6 mặt, 8 đỉnh và 12 cạnh. Trên hình khai triển, hai mặt chung cạnh sẽ không thể là hai mặt đối diện.', 'A cube has 6 faces, 8 vertices and 12 edges. Two faces sharing an edge in the net cannot become opposite faces.'],fig:cubeNetSVG()},
    {t:['Đếm tam giác có hệ thống', 'Systematic triangle counting'],b:['Với các tam giác cùng một đỉnh, đếm theo số mảnh đáy liên tiếp: 1 mảnh, 2 mảnh, 3 mảnh, cho đến toàn bộ hình.', 'For triangles sharing one vertex, count consecutive base sections: 1 section, 2 sections, 3 sections and so on up to the whole figure.'],fig:triangleFanSVG(5,{number:true})},
    {t:['Khối lập phương sơn màu', 'The painted cube'],b:['Sơn 3 mặt: ở 8 đỉnh.<br>Sơn 2 mặt: ở giữa 12 cạnh.<br>Sơn 1 mặt: ở giữa 6 mặt.<br>Không sơn: nằm trong lõi kích thước (n − 2) × (n − 2) × (n − 2).', '3 painted faces: 8 vertices.<br>2 painted faces: inside 12 edges.<br>1 painted face: inside 6 faces.<br>Unpainted: the inner (n − 2) × (n − 2) × (n − 2) core.'],fig:paintedCubeSVG(3)},
    {t:['Đếm hình trên lưới', 'Counting on a grid'],b:['Không đếm bằng mắt. Chọn một dải cột liên tiếp và một dải hàng liên tiếp; mỗi cặp lựa chọn tạo đúng một hình chữ nhật.', 'Do not count randomly. Choose a consecutive column span and a consecutive row span; each pair creates exactly one rectangle.'],fig:rectGridSVG(3,4)}
  ]});
}

/* =====================================================================
   🧠 TOÁN TƯ DUY – BÀI 5.1: TỔ HỢP, XÁC SUẤT VÀ BAO HÀM – LOẠI TRỪ
   Quy tắc nhân · bẫy chữ số 0 · biểu đồ Venn · lưới Pascal · xác suất.
   Các mô hình trừu tượng đều có sơ đồ SVG trực quan.
   ===================================================================== */
{
const V = bi, v = bin, Bb = x => `<b>${fmt(x)}</b>`, L2 = (vi, en) => V(BG(...vi), BG(...en));
const fact = n => {let p=1;for(let i=2;i<=n;i++)p*=i;return p;};
const routeWays = (rows,cols,blocked) => {const a=Array.from({length:rows+1},()=>Array(cols+1).fill(0));a[0][0]=1;for(let r=0;r<=rows;r++)for(let c=0;c<=cols;c++){if(!r&&!c)continue;if(blocked&&blocked[0]===c&&blocked[1]===r){a[r][c]=0;continue}a[r][c]=(c?a[r][c-1]:0)+(r?a[r-1][c]:0)}return a;};
G.topics.splice(G.topics.findIndex(t => t.id === 87) + 1, 0, {id:88, hk:1, name:'Tổ hợp, xác suất và nguyên lý bao hàm – loại trừ', label:'🧠 Toán tư duy', grp:'🧠 Toán tư duy · Singapore Math'});

/* Dạng 1: xếp hàng bằng mô hình ghế trống */
const cpArrange = lv => {
  if(lv===1){const n=3,ans=fact(n);return QB({text:V('Có 3 bạn An, Bình, Cường xếp thành một hàng. Có bao nhiêu cách xếp?', 'An, Binh and Cuong line up. How many different orders are possible?'),fig:choiceSlotsSVG(['Vị trí 1','Vị trí 2','Vị trí 3'],['3 cách','2 cách','1 cách'],{pool:'An · Bình · Cường'}),tpl:`[_] ${v('cách','ways')}`,ans:[ans],hint:V('Lấp từng vị trí từ trái sang phải và nhân số lựa chọn của các bước.', 'Fill the positions from left to right and multiply the numbers of choices.'),sol:L2(['Vị trí đầu có 3 cách chọn.','Sau khi chọn một bạn, vị trí thứ hai còn 2 cách.','Vị trí cuối còn 1 cách.','Số cách xếp: 3 × 2 × 1 = '+Bb(ans)+' cách.'],['The first position has 3 choices.','After one student is chosen, the second has 2 choices.','The last position has 1 choice.','Orders: 3 × 2 × 1 = '+Bb(ans)+'.'])});}
  if(lv===2){const n=4,ans=fact(n);return QB({text:V('Bốn bạn An, Bình, Cường, Dũng xếp thành một hàng dọc. Có tất cả bao nhiêu cách sắp xếp?', 'Four students, An, Binh, Cuong and Dung, line up. How many different orders are possible?'),fig:choiceSlotsSVG(['Vị trí 1','Vị trí 2','Vị trí 3','Vị trí 4'],['4 cách','3 cách','2 cách','1 cách'],{pool:'An · Bình · Cường · Dũng'}),tpl:`[_] ${v('cách','ways')}`,ans:[ans],hint:V('Số lựa chọn giảm đi một sau mỗi vị trí đã được lấp.', 'The number of choices decreases by one after each position is filled.'),sol:L2(['Vị trí thứ nhất có 4 cách chọn.','Ba vị trí tiếp theo lần lượt có 3, 2 và 1 cách.','Theo quy tắc nhân: 4 × 3 × 2 × 1 = '+Bb(ans)+' cách.'],['The first position has 4 choices.','The next positions have 3, 2 and 1 choices.','By the multiplication rule: 4 × 3 × 2 × 1 = '+Bb(ans)+'.'])});}
  const ans=2*fact(4);
  return QB({text:V('Năm bạn An, Bình, Cường, Dũng, Hà xếp thành một hàng. An và Bình phải đứng cạnh nhau. Có bao nhiêu cách xếp?', 'Five students line up. An and Binh must stand next to each other. How many orders are possible?'),fig:choiceSlotsSVG(['Khối 1','Khối 2','Khối 3','Khối 4','Trong cặp'],['4','3','2','1','2'],{pool:'Xem An–Bình là một khối · Treat An–Binh as one block'}),tpl:`[_] ${v('cách','ways')}`,ans:[ans],hint:V('Gộp An và Bình thành một khối, xếp bốn khối rồi đổi chỗ hai bạn trong khối.', 'Treat An and Binh as one block, arrange four blocks, then swap the two students inside their block.'),sol:L2(['Gộp An và Bình thành 1 khối. Cùng với Cường, Dũng, Hà ta có 4 khối.','Số cách xếp 4 khối: 4 × 3 × 2 × 1 = 24.','Trong khối, An–Bình hoặc Bình–An: 2 cách.','Tổng số cách: 24 × 2 = '+Bb(ans)+' cách.'],['Treat An and Binh as one block. Together with the other three students, there are 4 blocks.','Arrange the blocks: 4 × 3 × 2 × 1 = 24.','Inside the block: An–Binh or Binh–An, giving 2 choices.','Total: 24 × 2 = '+Bb(ans)+'.'])});
};

/* Dạng 2: lập số và bẫy chữ số 0 */
const cpNumbers = lv => {
  if(lv===1){const ans=9;return QB({text:V('Dùng các chữ số 0, 1, 2, 3 để lập số có 2 chữ số khác nhau. Lập được bao nhiêu số?', 'Using digits 0, 1, 2 and 3, how many 2-digit numbers with distinct digits can be formed?'),fig:choiceSlotsSVG(['Hàng chục','Hàng đơn vị'],['3 cách','3 cách'],{pool:'0 · 1 · 2 · 3'}),tpl:`[_] ${v('số','numbers')}`,ans:[ans],hint:V('Hàng chục không thể là 0; sau đó hàng đơn vị được chọn trong ba chữ số còn lại.', 'The tens digit cannot be 0; then choose the units digit from the three remaining digits.'),sol:L2(['Hàng chục chọn 1, 2 hoặc 3: có 3 cách.','Hàng đơn vị chọn một trong 3 chữ số chưa dùng, kể cả 0: có 3 cách.','Số cần lập: 3 × 3 = '+Bb(ans)+' số.'],['Tens digit: choose 1, 2 or 3, giving 3 choices.','Units digit: choose one of the 3 unused digits, including 0.','Numbers formed: 3 × 3 = '+Bb(ans)+'.'])});}
  if(lv===2){const ans=18;return QB({text:V('Dùng các chữ số 0, 1, 2, 3 để lập số có 3 chữ số khác nhau. Lập được bao nhiêu số?', 'Using digits 0, 1, 2 and 3, how many 3-digit numbers with distinct digits can be formed?'),fig:choiceSlotsSVG(['Hàng trăm','Hàng chục','Hàng đơn vị'],['3 cách','3 cách','2 cách'],{pool:'0 · 1 · 2 · 3'}),tpl:`[_] ${v('số','numbers')}`,ans:[ans],hint:V('Chữ số hàng trăm không thể là 0.', 'The hundreds digit cannot be 0.'),sol:L2(['Hàng trăm chọn 1, 2 hoặc 3: có 3 cách.','Hàng chục chọn trong 3 chữ số còn lại: có 3 cách.','Hàng đơn vị còn 2 cách.','Số cần lập: 3 × 3 × 2 = '+Bb(ans)+' số.'],['Hundreds digit: 1, 2 or 3, so 3 choices.','Tens digit: 3 remaining choices.','Units digit: 2 remaining choices.','Numbers formed: 3 × 3 × 2 = '+Bb(ans)+'.'])});}
  const ans=30;
  return QB({text:V('Dùng các chữ số 0, 1, 2, 3, 4 để lập số chẵn có 3 chữ số khác nhau. Có bao nhiêu số?', 'Using digits 0, 1, 2, 3 and 4, how many even 3-digit numbers with distinct digits can be formed?'),fig:choiceSlotsSVG(['Hàng trăm','Hàng chục','Hàng đơn vị'],['≠ 0','còn lại','0, 2, 4'],{pool:'Số chẵn: chữ số cuối là 0, 2 hoặc 4'}),tpl:`[_] ${v('số','numbers')}`,ans:[ans],hint:V('Chia hai trường hợp: hàng đơn vị bằng 0 và hàng đơn vị bằng 2 hoặc 4.', 'Split into two cases: the units digit is 0, or it is 2 or 4.'),sol:L2(['Trường hợp tận cùng là 0: hàng trăm có 4 cách, hàng chục có 3 cách; được 4 × 3 = 12 số.','Trường hợp tận cùng là 2 hoặc 4: có 2 cách chọn chữ số cuối; hàng trăm có 3 cách khác 0 và khác chữ số cuối; hàng chục có 3 cách.','Số của trường hợp hai: 2 × 3 × 3 = 18.','Tổng: 12 + 18 = '+Bb(ans)+' số.'],['Ending in 0: the hundreds digit has 4 choices and the tens digit has 3, giving 4 × 3 = 12.','Ending in 2 or 4: 2 choices for the last digit, 3 non-zero choices for the first digit and 3 remaining choices for the middle digit.','Second case: 2 × 3 × 3 = 18.','Total: 12 + 18 = '+Bb(ans)+'.'])});
};

/* Dạng 3: bao hàm – loại trừ bằng biểu đồ Venn */
const cpVenn = lv => {
  if(lv===1){const total=40,A=25,B=20,none=5,both=10;return QB({text:V('Lớp 4A có 40 bạn. Có 25 bạn đăng ký bóng đá, 20 bạn đăng ký cầu lông và 5 bạn không đăng ký môn nào. Có bao nhiêu bạn đăng ký cả hai môn?', 'Class 4A has 40 students. There are 25 football registrations, 20 badminton registrations and 5 students in neither club. How many joined both clubs?'),fig:venn2SVG({aOnly:'',both:null,bOnly:'',none,labelA:'Bóng đá: 25',labelB:'Cầu lông: 20'}),tpl:`[_] ${v('bạn','students')}`,ans:[both],hint:V('Tìm số bạn tham gia ít nhất một môn, rồi so với tổng lượt đăng ký.', 'Find the number in at least one club, then compare it with the total registrations.'),sol:L2(['Số bạn tham gia ít nhất một môn: 40 − 5 = 35.','Tổng lượt đăng ký: 25 + 20 = 45.','Các bạn ở phần giao bị đếm hai lần, nên số bị đếm thừa là: 45 − 35 = '+Bb(both)+' bạn.'],['Students in at least one club: 40 − 5 = 35.','Total registrations: 25 + 20 = 45.','Students in the overlap were counted twice, so the overcount is 45 − 35 = '+Bb(both)+'.'])});}
  const onlyA=R(8,20),onlyB=R(7,18),both=R(3,10),none=R(2,8),A=onlyA+both,B=onlyB+both,total=onlyA+onlyB+both+none;
  if(lv===2) return QB({text:V(`Một lớp có ${total} bạn. Nhóm A có ${A} bạn, nhóm B có ${B} bạn và ${none} bạn không thuộc nhóm nào. Có bao nhiêu bạn thuộc cả hai nhóm?`, `A class has ${total} students. Group A has ${A}, group B has ${B}, and ${none} students are in neither group. How many are in both groups?`),fig:venn2SVG({aOnly:'',both:null,bOnly:'',none,labelA:`Nhóm A: ${A}`,labelB:`Nhóm B: ${B}`}),tpl:`[_] ${v('bạn','students')}`,ans:[both],hint:V('Số thuộc ít nhất một nhóm bằng tổng lớp trừ số không thuộc nhóm nào.', 'The number in at least one group equals the class total minus those in neither group.'),sol:L2([`Thuộc ít nhất một nhóm: ${total} − ${none} = ${total-none}.`,`Tổng lượt của hai nhóm: ${A} + ${B} = ${A+B}.`,`Phần giao: ${A+B} − ${total-none} = ${Bb(both)} bạn.`],[`In at least one group: ${total} − ${none} = ${total-none}.`,`Total group memberships: ${A} + ${B} = ${A+B}.`,`Intersection: ${A+B} − ${total-none} = ${Bb(both)}.`])});
  return QB({text:V(`Có ${total} bạn. Nhóm A có ${A} bạn, nhóm B có ${B} bạn và ${both} bạn thuộc cả hai nhóm. Có bao nhiêu bạn không thuộc nhóm nào?`, `There are ${total} students. Group A has ${A}, group B has ${B}, and ${both} are in both. How many are in neither group?`),fig:venn2SVG({aOnly:'',both,bOnly:'',none:null,labelA:`Nhóm A: ${A}`,labelB:`Nhóm B: ${B}`}),tpl:`[_] ${v('bạn','students')}`,ans:[none],hint:V('Dùng A + B − phần giao để tìm số thuộc ít nhất một nhóm.', 'Use A + B − intersection to find the number in at least one group.'),sol:L2([`Thuộc ít nhất một nhóm: ${A} + ${B} − ${both} = ${total-none}.`,`Không thuộc nhóm nào: ${total} − ${total-none} = ${Bb(none)} bạn.`],[`In at least one group: ${A} + ${B} − ${both} = ${total-none}.`,`In neither group: ${total} − ${total-none} = ${Bb(none)}.`])});
};

/* Dạng 4: đếm đường đi ngắn nhất bằng cộng dồn điểm nút */
const cpRoutes = lv => {
  if(lv===1){const rows=2,cols=2,a=routeWays(rows,cols),ans=a[rows][cols];return QB({text:V('Trên lưới 2 × 2, đi từ A đến B và chỉ được đi lên hoặc sang phải. Có bao nhiêu đường đi ngắn nhất?', 'On the 2 × 2 grid, travel from A to B using only up or right moves. How many shortest paths are there?'),fig:routeGridSVG(rows,cols),tpl:`[_] ${v('đường','paths')}`,ans:[ans],hint:V('Ghi 1 trên hai mép xuất phát; mỗi nút khác bằng nút bên trái cộng nút bên dưới.', 'Write 1 along the two starting edges; every other node equals left plus below.'),sol:L2(['Các nút trên mép dưới và mép trái đều có 1 cách đến.','Hàng nút tiếp theo nhận các số 2 rồi 3 bằng cách cộng trái và dưới.','Tại B: 3 + 3 = '+Bb(ans)+' đường.'],['Nodes along the bottom and left edges each have 1 way.','The next nodes receive 2 and then 3 by adding left and below.','At B: 3 + 3 = '+Bb(ans)+' paths.'])});}
  if(lv===2){const rows=2,cols=3,a=routeWays(rows,cols),ans=a[rows][cols];return QB({text:V('Một khu phố là lưới 2 hàng, 3 cột. Đi từ A đến B, chỉ được đi lên hoặc sang phải. Có bao nhiêu tuyến đường ngắn nhất?', 'A street map is a 2-row, 3-column grid. From A to B, only up and right moves are allowed. How many shortest routes are there?'),fig:routeGridSVG(rows,cols),tpl:`[_] ${v('đường','paths')}`,ans:[ans],hint:V('Cộng dồn số cách tại từng nút: số ở nút mới bằng số bên trái cộng số bên dưới.', 'Accumulate at each node: new value equals left plus below.'),sol:L2(['Mép dưới và mép trái đều ghi 1.','Hàng giữa lần lượt: 2, 3, 4.','Hàng trên lần lượt: 3, 6, 10.','Tại B có '+Bb(ans)+' đường đi ngắn nhất.'],['Write 1 along the bottom and left edges.','Middle row: 2, 3, 4.','Top row: 3, 6, 10.','At B there are '+Bb(ans)+' shortest paths.'])});}
  const rows=3,cols=4,blocked=pick([[1,1],[2,1],[2,2],[3,1],[3,2]]),a=routeWays(rows,cols,blocked),ans=a[rows][cols];
  return QB({text:V(`Trên lưới ${rows} × ${cols}, nút có dấu × đang bị chặn. Đi từ A đến B, chỉ đi lên hoặc sang phải và không được qua nút bị chặn. Có bao nhiêu đường ngắn nhất hợp lệ?`, `On the ${rows} × ${cols} grid, the node marked × is blocked. Travel from A to B using only up or right moves without passing through it. How many valid shortest paths are there?`),fig:routeGridSVG(rows,cols,{blocked}),tpl:`[_] ${v('đường','paths')}`,ans:[ans],hint:V('Ghi 0 tại nút bị chặn; các nút còn lại vẫn bằng trái cộng dưới.', 'Write 0 at the blocked node; all other nodes still equal left plus below.'),sol:L2([`Nút bị chặn ở cột ${blocked[0]}, hàng ${blocked[1]} được ghi 0.`,`Cộng dồn từng hàng từ A; các hàng số cách lần lượt là: ${a.map(row=>row.join(', ')).join(' / ')}.`,`Giá trị tại B là ${Bb(ans)} đường.`],[`The blocked node at column ${blocked[0]}, row ${blocked[1]} receives 0.`,`Accumulate row by row from A: ${a.map(row=>row.join(', ')).join(' / ')}.`,`The value at B is ${Bb(ans)} paths.`])});
};

/* Dạng 5: xác suất bằng số trường hợp thuận lợi trên tổng số trường hợp */
const cpProbability = lv => {
  if(lv===1){const r=3,b=2;return QB({text:V('Trong túi có 3 bóng đỏ và 2 bóng xanh giống nhau về kích thước. Lấy ngẫu nhiên 1 bóng. Xác suất lấy được bóng đỏ là bao nhiêu?', 'A bag contains 3 red and 2 blue balls of equal size. One ball is drawn at random. What is the probability of drawing red?'),fig:probabilityBagSVG([{mark:'Đ',count:r,on:true},{mark:'X',count:b,on:false}],{caption:'Đ: đỏ · X: xanh'}),tpl:'[F]',ans:[{frac:[r,r+b],mode:'eq'}],hint:V('Xác suất bằng số bóng đỏ chia cho tổng số bóng.', 'Probability equals the number of red balls divided by the total number of balls.'),sol:L2(['Tổng số bóng: 3 + 2 = 5.','Có 3 kết quả thuận lợi là 3 bóng đỏ.','Xác suất lấy bóng đỏ: '+Bb(F(3,5))+'.'],['Total balls: 3 + 2 = 5.','There are 3 favourable red balls.','Probability of red: '+Bb(F(3,5))+'.'])});}
  const r=R(2,6),b=R(2,6),t=r+b;
  if(lv===2) return QB({text:V(`Túi có ${r} bóng đỏ và ${b} bóng xanh. Lấy ngẫu nhiên 1 bóng. Xác suất lấy được bóng xanh là bao nhiêu?`, `A bag contains ${r} red and ${b} blue balls. One ball is drawn. What is the probability of drawing blue?`),fig:probabilityBagSVG([{mark:'Đ',count:r,on:true},{mark:'X',count:b,on:false}],{caption:'Đ: đỏ · X: xanh'}),tpl:'[F]',ans:[{frac:[b,t],mode:'eq'}],hint:V('Lấy số bóng xanh chia tổng số bóng.', 'Divide the number of blue balls by the total number of balls.'),sol:L2([`Tổng số bóng: ${r} + ${b} = ${t}.`,`Có ${b} bóng xanh thuận lợi.`,`Xác suất: ${b} : ${t} = ${Bb(Fs(b,t))}.`],[`Total balls: ${r} + ${b} = ${t}.`,`There are ${b} favourable blue balls.`,`Probability: ${b} ÷ ${t} = ${Bb(Fs(b,t))}.`])});
  const num=r*(r-1),den=t*(t-1);
  return QB({text:V(`Túi có ${r} bóng đỏ và ${b} bóng xanh. Lấy liên tiếp 2 bóng, không bỏ lại bóng thứ nhất. Xác suất để cả hai bóng đều đỏ là bao nhiêu?`, `A bag contains ${r} red and ${b} blue balls. Two balls are drawn without replacement. What is the probability that both are red?`),fig:probabilityBagSVG([{mark:'Đ',count:r,on:true},{mark:'X',count:b,on:false}],{caption:'Rút 2 bóng, không hoàn lại'}),tpl:'[F]',ans:[{frac:[num,den],mode:'eq'}],hint:V('Lần đầu có r trên tổng số bóng; lần hai còn r − 1 bóng đỏ trên tổng giảm 1.', 'For the first draw use r over the total; for the second, use r − 1 over a total reduced by 1.'),sol:L2([`Xác suất lần đầu lấy đỏ: ${F(r,t)}.`,`Sau khi đã lấy 1 bóng đỏ, còn ${r-1} bóng đỏ trong ${t-1} bóng: xác suất lần hai là ${F(r-1,t-1)}.`,`Xác suất cả hai lần đều đỏ: ${F(r,t)} × ${F(r-1,t-1)} = ${Bb(Fs(num,den))}.`],[`Probability of red first: ${F(r,t)}.`,`After one red is removed, ${r-1} red balls remain among ${t-1}: second probability ${F(r-1,t-1)}.`,`Probability of two reds: ${F(r,t)} × ${F(r-1,t-1)} = ${Bb(Fs(num,den))}.`])});
};

lesson(88, 'td-to-hop-xac-suat-bao-ham', 'Bài 5.1: Tổ hợp, xác suất và nguyên lý bao hàm – loại trừ', 'Mã hóa các khả năng bằng vị trí, sơ đồ Venn, điểm nút trên lưới và tỉ số giữa trường hợp thuận lợi với toàn bộ trường hợp.', [cpArrange, cpNumbers, cpVenn, cpRoutes, cpProbability], {
  bi:true, en:'Lesson 5.1: Combinatorics, probability and inclusion–exclusion', descEn:'Encode possibilities using slots, Venn diagrams, grid nodes and favourable outcomes over all outcomes.',
  intro:[
    {t:['Quy tắc nhân – lấp đầy vị trí', 'Multiplication rule – fill the slots'],b:['Nếu một việc gồm nhiều bước liên tiếp, số cách thực hiện bằng tích số lựa chọn của từng bước. Sau khi dùng một đối tượng, số lựa chọn ở bước sau có thể giảm đi.', 'If a task has consecutive steps, multiply the number of choices at each step. Once an object is used, later choices may decrease.'],fig:choiceSlotsSVG(['Ghế 1','Ghế 2','Ghế 3','Ghế 4'],['4','3','2','1'])},
    {t:['Bẫy chữ số 0', 'The zero trap'],b:['Khi lập số có nhiều chữ số, chữ số đầu tiên không được bằng 0. Ở các vị trí sau, số 0 được sử dụng bình thường nếu chưa dùng.', 'When forming a multi-digit number, the first digit cannot be 0. Zero may be used normally in later positions if it is still available.'],fig:choiceSlotsSVG(['Trăm','Chục','Đơn vị'],['≠ 0','còn lại','còn lại'],{pool:'0 · 1 · 2 · 3'})},
    {t:['Bao hàm – loại trừ', 'Inclusion–exclusion'],b:['Số thuộc ít nhất một nhóm = Nhóm A + Nhóm B − Phần giao.<br>Tổng thực tế = Thuộc ít nhất một nhóm + Không thuộc nhóm nào.', 'In at least one group = Group A + Group B − Intersection.<br>Total population = In at least one group + In neither group.'],fig:venn2SVG({aOnly:'A',both:'A∩B',bOnly:'B',none:'Ngoài'})},
    {t:['Cộng dồn điểm nút', 'Accumulate at grid nodes'],b:['Trên lưới chỉ đi lên và sang phải: số cách đến một nút bằng số cách tại nút bên trái cộng số cách tại nút bên dưới.', 'When only up and right moves are allowed, ways to a node equal ways from the left plus ways from below.'],fig:routeGridSVG(2,3,{showCounts:true})},
    {t:['Xác suất đơn giản', 'Simple probability'],b:['Xác suất = Số trường hợp thuận lợi : Tổng số trường hợp có khả năng như nhau. Kết quả được viết dưới dạng phân số và rút gọn.', 'Probability = Favourable outcomes ÷ Total equally likely outcomes. Write and simplify the result as a fraction.'],fig:probabilityBagSVG([{mark:'Đ',count:3,on:true},{mark:'X',count:2,on:false}],{caption:'3 đỏ · 2 xanh'})}
  ]});
}

/* =====================================================================
   🧠 TOÁN TƯ DUY – BÀI 5.2: LOGIC SUY LUẬN VÀ NGUYÊN LÝ DIRICHLET
   Giả thiết tạm · bài toán điểm số · mệnh đề thật/giả · kịch bản xấu nhất.
   ===================================================================== */
{
const V = bi, v = bin, Bb = x => `<b>${fmt(x)}</b>`, L2 = (vi, en) => V(BG(...vi), BG(...en));
G.topics.splice(G.topics.findIndex(t => t.id === 88) + 1, 0, {id:89, hk:1, name:'Logic suy luận và nguyên lý Dirichlet', label:'🧠 Toán tư duy', grp:'🧠 Toán tư duy · Singapore Math'});

/* Dạng 1: ép tất cả đối tượng về một loại rồi dùng phần chênh lệch. */
const lgAssumption = lv => {
  if(lv===1){const total=36,feet=100,dogs=14,chickens=22,assumed=total*2;return QB({text:V('Vừa gà vừa chó có 36 con và 100 chân. Hỏi có bao nhiêu con gà và bao nhiêu con chó?', 'There are 36 chickens and dogs with 100 legs altogether. How many chickens and dogs are there?'),fig:assumptionGapSVG({assumed,actual:feet,labelA:'Tất cả là gà',labelB:'Thực tế',unit:'chân',gapLabel:'Chênh lệch 28 chân'}),tpl:`${v('Gà','Chickens')} = [_] &nbsp; ${v('Chó','Dogs')} = [_]`,ans:[chickens,dogs],wide:true,hint:V('Giả sử cả 36 con đều là gà. So sánh số chân giả sử với 100 chân thực tế.', 'Pretend all 36 animals are chickens. Compare the assumed number of legs with the actual 100.'),sol:L2(['Giả sử cả 36 con đều là gà, tổng số chân là: 36 × 2 = 72 (chân).','So với thực tế, số chân bị hụt là: 100 − 72 = 28 (chân).','Mỗi con chó bị ép thành gà làm hụt: 4 − 2 = 2 (chân).','Số chó là: 28 : 2 = 14 (con).','Số gà là: 36 − 14 = 22 (con).','Đáp số: '+Bb('22 con gà; 14 con chó')+'.'],['Assuming all 36 are chickens gives 36 × 2 = 72 legs.','The shortage is 100 − 72 = 28 legs.','Each dog disguised as a chicken causes a shortage of 4 − 2 = 2 legs.','Dogs: 28 ÷ 2 = 14.','Chickens: 36 − 14 = 22.','Answer: '+Bb('22 chickens; 14 dogs')+'.'])});}
  if(lv===2){const total=R(20,45),dogs=R(5,total-5),chickens=total-dogs,feet=2*chickens+4*dogs,assumed=2*total,gap=feet-assumed;return QB({text:V(`Một trang trại có ${total} con gà và chó, đếm được ${feet} chân. Tìm số con mỗi loại.`, `A farm has ${total} chickens and dogs with ${feet} legs altogether. Find the number of each animal.`),fig:assumptionGapSVG({assumed,actual:feet,labelA:'Nếu đều là gà',labelB:'Thực tế',unit:'chân',gapLabel:`Hơn ${gap} chân`}),tpl:`${v('Gà','Chickens')} = [_] &nbsp; ${v('Chó','Dogs')} = [_]`,ans:[chickens,dogs],wide:true,hint:V('Ép tất cả thành gà 2 chân; mỗi con chó thật làm tổng tăng thêm 2 chân.', 'Treat every animal as a 2-legged chicken; each actual dog adds 2 extra legs.'),sol:L2([`Nếu cả ${total} con đều là gà thì có: ${total} × 2 = ${assumed} (chân).`,`Số chân thực tế nhiều hơn giả sử: ${feet} − ${assumed} = ${gap} (chân).`,`Mỗi con chó làm tăng: 4 − 2 = 2 (chân).`,`Số chó: ${gap} : 2 = ${dogs} (con).`,`Số gà: ${total} − ${dogs} = ${Bb(chickens)} (con).`],[`If all ${total} animals were chickens, there would be ${total} × 2 = ${assumed} legs.`,`The actual total exceeds this by ${feet} − ${assumed} = ${gap}.`,`Each dog adds 4 − 2 = 2 legs.`,`Dogs: ${gap} ÷ 2 = ${dogs}.`,`Chickens: ${total} − ${dogs} = ${Bb(chickens)}.`])});}
  const total=R(18,36),tricycles=R(5,total-5),bicycles=total-tricycles,wheels=2*bicycles+3*tricycles,assumed=2*total,gap=wheels-assumed;
  return QB({text:V(`Một cửa hàng có ${total} xe gồm xe đạp hai bánh và xe ba bánh. Tổng cộng có ${wheels} bánh xe. Hỏi có bao nhiêu xe mỗi loại?`, `A shop has ${total} bicycles and tricycles with ${wheels} wheels altogether. How many of each type are there?`),fig:assumptionGapSVG({assumed,actual:wheels,labelA:'Nếu đều 2 bánh',labelB:'Thực tế',unit:'bánh',gapLabel:`Hơn ${gap} bánh`}),tpl:`${v('Xe đạp','Bicycles')} = [_] &nbsp; ${v('Xe ba bánh','Tricycles')} = [_]`,ans:[bicycles,tricycles],wide:true,hint:V('Giả sử mọi xe đều có 2 bánh. Mỗi xe ba bánh tạo thêm đúng 1 bánh.', 'Pretend every vehicle has 2 wheels. Each tricycle contributes exactly 1 extra wheel.'),sol:L2([`Nếu tất cả là xe đạp hai bánh thì có: ${total} × 2 = ${assumed} (bánh).`,`Số bánh nhiều hơn giả sử: ${wheels} − ${assumed} = ${gap} (bánh).`,`Mỗi xe ba bánh tạo thêm: 3 − 2 = 1 (bánh).`,`Số xe ba bánh: ${gap} : 1 = ${tricycles} (xe).`,`Số xe đạp: ${total} − ${tricycles} = ${Bb(bicycles)} (xe).`],[`If every vehicle were a bicycle, there would be ${total} × 2 = ${assumed} wheels.`,`Extra wheels: ${wheels} − ${assumed} = ${gap}.`,`Each tricycle adds 3 − 2 = 1 wheel.`,`Tricycles: ${gap} ÷ 1 = ${tricycles}.`,`Bicycles: ${total} − ${tricycles} = ${Bb(bicycles)}.`])});
};

/* Dạng 2: giả sử tất cả câu đều đúng, rồi đổi phần điểm hụt thành số câu sai. */
const lgScores = lv => {
  if(lv===1){const n=20,correct=16,wrong=4,score=72,perfect=100;return QB({text:V('Một bài thi có 20 câu. Mỗi câu đúng được 5 điểm, mỗi câu sai hoặc bỏ trống bị trừ 2 điểm. An đạt 72 điểm. Hỏi An trả lời đúng bao nhiêu câu?', 'A test has 20 questions. A correct answer earns 5 points; a wrong or blank answer loses 2 points. An scores 72. How many answers are correct?'),fig:assumptionGapSVG({assumed:perfect,actual:score,labelA:'Đúng cả 20 câu',labelB:'Điểm thực tế',unit:'điểm',gapLabel:'Hụt 28 điểm'}),tpl:`[_] ${v('câu đúng','correct answers')}`,ans:[correct],hint:V('Giả sử An đúng cả 20 câu. Một câu chuyển từ đúng sang sai làm giảm 5 + 2 điểm.', 'Assume all 20 answers are correct. Changing one answer from correct to wrong loses 5 + 2 points.'),sol:L2(['Nếu đúng cả 20 câu, An được: 20 × 5 = 100 (điểm).','Số điểm bị hụt: 100 − 72 = 28 (điểm).','Một câu sai thay cho một câu đúng làm hụt: 5 + 2 = 7 (điểm).','Số câu sai: 28 : 7 = 4 (câu).','Số câu đúng: 20 − 4 = '+Bb(correct)+' (câu).'],['If all 20 were correct, the score would be 20 × 5 = 100.','The shortage is 100 − 72 = 28 points.','One wrong answer replacing a correct one loses 5 + 2 = 7 points.','Wrong answers: 28 ÷ 7 = 4.','Correct answers: 20 − 4 = '+Bb(correct)+'.'])});}
  if(lv===2){const n=R(15,25),wrong=R(2,Math.min(7,n-5)),correct=n-wrong,p=5,m=2,perfect=n*p,score=correct*p-wrong*m,gap=perfect-score;return QB({text:V(`Bài thi có ${n} câu. Mỗi câu đúng được ${p} điểm, mỗi câu sai bị trừ ${m} điểm. Một bạn làm đủ và đạt ${score} điểm. Hỏi bạn đó đúng bao nhiêu câu?`, `A test has ${n} questions. Each correct answer earns ${p} points and each wrong answer loses ${m} points. A student answers all questions and scores ${score}. How many are correct?`),fig:assumptionGapSVG({assumed:perfect,actual:score,labelA:'Nếu đúng hết',labelB:'Điểm thực tế',unit:'điểm',gapLabel:`Hụt ${gap} điểm`}),tpl:`[_] ${v('câu đúng','correct answers')}`,ans:[correct],hint:V(`Mỗi câu sai làm giảm ${p} điểm đáng lẽ được nhận và bị trừ thêm ${m} điểm.`, `Each wrong answer loses the ${p} points that could have been earned and incurs another ${m}-point penalty.`),sol:L2([`Nếu đúng hết, số điểm là: ${n} × ${p} = ${perfect}.`,`Điểm bị hụt: ${perfect} − ${score} = ${gap}.`,`Mỗi câu sai làm hụt: ${p} + ${m} = ${p+m} (điểm).`,`Số câu sai: ${gap} : ${p+m} = ${wrong}.`,`Số câu đúng: ${n} − ${wrong} = ${Bb(correct)}.`],[`A perfect paper scores ${n} × ${p} = ${perfect}.`,`The shortage is ${perfect} − ${score} = ${gap}.`,`Each wrong answer costs ${p} + ${m} = ${p+m} points.`,`Wrong answers: ${gap} ÷ ${p+m} = ${wrong}.`,`Correct answers: ${n} − ${wrong} = ${Bb(correct)}.`])});}
  const n=25,blank=R(2,5),answered=n-blank,wrong=R(3,7),correct=answered-wrong,p=4,m=1,score=correct*p-wrong*m,perfect=answered*p,gap=perfect-score;
  return QB({text:V(`Bài thi có ${n} câu. Một bạn bỏ trống ${blank} câu; mỗi câu đúng được ${p} điểm, mỗi câu sai bị trừ ${m} điểm, câu bỏ trống được 0 điểm. Bạn đạt ${score} điểm. Tìm số câu đúng và số câu sai.`, `A test has ${n} questions. A student leaves ${blank} blank; each correct answer earns ${p} points, each wrong answer loses ${m} point, and a blank earns 0. The score is ${score}. Find the numbers correct and wrong.`),tpl:`${v('Đúng','Correct')} = [_] &nbsp; ${v('Sai','Wrong')} = [_]`,ans:[correct,wrong],wide:true,hint:V('Trước hết bỏ các câu trống ra khỏi số câu được chấm đúng hoặc sai, rồi giả sử tất cả câu đã làm đều đúng.', 'First remove the blank questions, then assume every attempted question is correct.'),sol:L2([`Số câu đã làm: ${n} − ${blank} = ${answered} (câu).`,`Nếu ${answered} câu đều đúng thì được: ${answered} × ${p} = ${perfect} (điểm).`,`Điểm bị hụt: ${perfect} − ${score} = ${gap} (điểm).`,`Mỗi câu sai làm hụt: ${p} + ${m} = ${p+m} (điểm).`,`Số câu sai: ${gap} : ${p+m} = ${wrong}; số câu đúng: ${answered} − ${wrong} = ${Bb(correct)}.`],[`Attempted questions: ${n} − ${blank} = ${answered}.`,`If all attempted answers were correct: ${answered} × ${p} = ${perfect}.`,`The shortage is ${perfect} − ${score} = ${gap}.`,`Each wrong answer costs ${p} + ${m} = ${p+m} points.`,`Wrong: ${gap} ÷ ${p+m} = ${wrong}; correct: ${answered} − ${wrong} = ${Bb(correct)}.`])});
};

/* Dạng 3: kiểm tra số mệnh đề đúng trong từng kịch bản. */
const lgTruth = lv => {
  if(lv===1){const good='A';return QC({text:V('Ba bạn A, B, C được hỏi ai đã lấy nhầm quyển sách.<br>A nói: “B lấy.”<br>B nói: “B lấy.”<br>C nói: “C không lấy.”<br>Biết chỉ có đúng một lời nói thật. Ai đã lấy nhầm sách?', 'A, B and C are asked who took a book by mistake.<br>A says, “B took it.”<br>B says, “B took it.”<br>C says, “C did not take it.”<br>Exactly one statement is true. Who took the book?'),opts:['A','B','C'],ans:good,keepOrder:true,hint:V('Thử từng người làm người lấy sách và đếm số lời đúng; chỉ giữ kịch bản có đúng một lời thật.', 'Test each possible culprit and count true statements; keep only the case with exactly one truth.'),sol:L2(['Nếu A lấy: hai câu “B lấy” đều sai; câu “C không lấy” đúng. Có đúng 1 lời thật.','Nếu B lấy: cả ba lời đều đúng. Loại.','Nếu C lấy: cả ba lời đều sai. Loại.','Vậy người lấy nhầm sách là '+Bb(good)+'.'],['If A took it, both “B took it” statements are false and “C did not” is true: exactly one truth.','If B took it, all three are true. Reject.','If C took it, all three are false. Reject.','Therefore '+Bb(good)+' took the book.'])});}
  if(lv===2){const good='C';return QC({text:V('Cửa sổ bị đá bóng làm vỡ.<br>A nói: “B làm.”<br>B nói: “D làm.”<br>C nói: “C không làm.”<br>D nói: “B nói dối.”<br>Chỉ có duy nhất một bạn nói thật. Ai làm vỡ kính?', 'A ball breaks a window.<br>A says, “B did it.”<br>B says, “D did it.”<br>C says, “C did not do it.”<br>D says, “B is lying.”<br>Exactly one student tells the truth. Who broke the window?'),opts:['A','B','C','D'],ans:good,keepOrder:true,hint:V('B và D mâu thuẫn trực tiếp, nên một trong hai người nói thật. Suất nói thật duy nhất đã nằm trong cặp này.', 'B and D directly contradict each other, so exactly one of them is truthful. The single truth is already inside this pair.'),sol:L2(['B nói “D làm”, còn D nói “B nói dối”. Hai lời này đối nghịch nên có đúng một lời thật.','Vì cả bài chỉ có một lời thật, A và C đều phải nói dối.','C nói “C không làm” là dối, nên sự thật là C đã làm vỡ kính.','Kiểm tra: A sai, B sai, C sai, D đúng. Kết luận: '+Bb(good)+'.'],['B says D did it, while D says B is lying. Exactly one of these is true.','Since the whole puzzle has only one truth, A and C must both be lying.','C falsely says “C did not do it”, so C did it.','Check: A false, B false, C false, D true. Answer: '+Bb(good)+'.'])});}
  const good='D';
  return QC({text:V('Một trong bốn bạn A, B, C, D làm đổ hộp bút.<br>A nói: “A làm.”<br>B nói: “B không làm.”<br>C nói: “D làm.”<br>D nói: “A không làm.”<br>Biết có đúng ba lời nói thật. Ai làm đổ hộp bút?', 'One of A, B, C and D knocked over a pencil box.<br>A says, “A did it.”<br>B says, “B did not do it.”<br>C says, “D did it.”<br>D says, “A did not do it.”<br>Exactly three statements are true. Who did it?'),opts:['A','B','C','D'],ans:good,keepOrder:true,hint:V('Lập bốn kịch bản A, B, C, D rồi đếm số lời thật trong từng kịch bản.', 'Test A, B, C and D as the culprit and count the true statements in each case.'),sol:L2(['Nếu A làm: A và B đúng, C và D sai — có 2 lời thật.','Nếu B làm: chỉ D đúng — có 1 lời thật.','Nếu C làm: B và D đúng — có 2 lời thật.','Nếu D làm: B, C, D đúng; A sai — có đúng 3 lời thật.','Vậy người làm đổ hộp bút là '+Bb(good)+'.'],['If A did it: A and B are true; C and D are false — 2 truths.','If B did it: only D is true — 1 truth.','If C did it: B and D are true — 2 truths.','If D did it: B, C and D are true; A is false — exactly 3 truths.','Therefore '+Bb(good)+' did it.'])});
};

/* Dạng 4: nguyên lý Dirichlet và kịch bản xấu nhất. */
const lgDirichlet = lv => {
  if(lv===1){const ans=4;return QB({text:V('Trong hộp có nhiều viên bi thuộc ba màu đỏ, xanh và vàng. Lấy bi mà không nhìn. Cần lấy ít nhất bao nhiêu viên để chắc chắn có 2 viên cùng màu?', 'A box contains many red, blue and yellow balls. Without looking, what is the minimum number to draw to guarantee 2 of the same colour?'),fig:pigeonholeSVG(['Đỏ','Xanh','Vàng'],1,{nextLabel:'viên thứ 4'}),tpl:`[_] ${v('viên','balls')}`,ans:[ans],hint:V('Xét kịch bản xấu nhất: ba viên đầu có thể mang ba màu khác nhau.', 'Use the worst case: the first three balls may all have different colours.'),sol:L2(['Xấu nhất, ta lấy 1 viên đỏ, 1 viên xanh và 1 viên vàng mà vẫn chưa có hai viên cùng màu.','Viên thứ 4 dù có màu nào cũng trùng với một trong ba màu đã có.','Cần lấy ít nhất: 3 + 1 = '+Bb(ans)+' (viên).'],['In the worst case, the first three are one red, one blue and one yellow, with no matching pair.','The fourth ball must match one of those colours.','Minimum: 3 + 1 = '+Bb(ans)+'.'])});}
  if(lv===2){const colors=R(3,4),need=R(2,3),ans=colors*(need-1)+1,labels=['Màu 1','Màu 2','Màu 3','Màu 4'].slice(0,colors);return QB({text:V(`Một hộp có bi thuộc ${colors} màu, mỗi màu có đủ nhiều viên. Cần lấy ít nhất bao nhiêu viên, không nhìn, để chắc chắn có ${need} viên cùng màu?`, `A box contains balls of ${colors} colours, with sufficiently many of each colour. What is the minimum number to draw blindly to guarantee ${need} balls of one colour?`),fig:pigeonholeSVG(labels,need-1,{nextLabel:`viên thứ ${ans}`}),tpl:`[_] ${v('viên','balls')}`,ans:[ans],hint:V(`Xấu nhất, mỗi màu có thể xuất hiện ${need-1} lần mà chưa màu nào đủ ${need} viên.`, `In the worst case, each colour may appear ${need-1} times without any colour reaching ${need}.`),sol:L2([`Để chưa có ${need} viên cùng màu, mỗi màu nhiều nhất có ${need-1} viên.`,`Với ${colors} màu, có thể lấy: ${colors} × ${need-1} = ${colors*(need-1)} viên mà vẫn chưa đạt yêu cầu.`,`Viên tiếp theo buộc một màu đạt ${need} viên. Ít nhất cần: ${colors*(need-1)} + 1 = ${Bb(ans)} viên.`],[`To avoid ${need} of one colour, each colour may appear at most ${need-1} times.`,`Across ${colors} colours, ${colors} × ${need-1} = ${colors*(need-1)} balls may still fail.`,`The next ball forces one colour to reach ${need}. Minimum: ${colors*(need-1)} + 1 = ${Bb(ans)}.`])});}
  const red=10,blue=8,yellow=5,need=3,ans=blue+yellow+need;
  return QB({text:V(`Trong hộp có ${red} bi đỏ, ${blue} bi xanh và ${yellow} bi vàng. Lấy bi không nhìn. Cần lấy ít nhất bao nhiêu viên để chắc chắn có ${need} viên bi đỏ?`, `A box contains ${red} red, ${blue} blue and ${yellow} yellow balls. What is the minimum number to draw blindly to guarantee ${need} red balls?`),tpl:`[_] ${v('viên','balls')}`,ans:[ans],hint:V('Vì đề chỉ định màu đỏ, hãy giả sử toàn bộ bi không đỏ bị lấy ra trước.', 'Because red is specified, assume every non-red ball is drawn first.'),sol:L2([`Số bi không đỏ là: ${blue} + ${yellow} = ${blue+yellow} (viên).`,`Kịch bản xấu nhất: lấy hết ${blue+yellow} viên không đỏ trước mà chưa có viên đỏ nào.`,`Sau đó cần lấy thêm ${need} viên đỏ.`,`Ít nhất phải lấy: ${blue+yellow} + ${need} = ${Bb(ans)} (viên).`],[`Non-red balls: ${blue} + ${yellow} = ${blue+yellow}.`,`Worst case: all ${blue+yellow} non-red balls are drawn before any red ball.`,`Then draw ${need} more red balls.`,`Minimum: ${blue+yellow} + ${need} = ${Bb(ans)}.`])});
};

lesson(89, 'td-logic-suy-luan-dirichlet', 'Bài 5.2: Các bài toán logic suy luận và nguyên lý Dirichlet', 'Dùng giả thiết tạm, kiểm tra mệnh đề thật–giả và dựng kịch bản xấu nhất để giải các bài toán suy luận khó.', [lgAssumption, lgScores, lgTruth, lgDirichlet], {
  bi:true, en:'Lesson 5.2: Logic puzzles and the pigeonhole principle', descEn:'Use temporary assumptions, truth-value testing and worst-case scenarios to solve challenging reasoning problems.',
  intro:[
    {t:['Giả thiết tạm – ép về một trạng thái', 'Temporary assumption – force one state'],b:['Giả sử tất cả đối tượng đều thuộc loại đơn giản hơn. Phần chênh lệch giữa tổng giả sử và tổng thực tế cho biết có bao nhiêu đối tượng phải đổi sang loại còn lại.', 'Pretend every object is of the simpler type. The gap between the assumed and actual totals reveals how many objects must change to the other type.'],fig:assumptionGapSVG({assumed:72,actual:100,labelA:'36 con × 2',labelB:'Thực tế',unit:'chân',gapLabel:'Chênh lệch 28 chân'})},
    {t:['Bẫy cộng điểm và trừ điểm', 'The scoring trap'],b:['Một câu từ đúng chuyển thành sai làm mất phần điểm đáng lẽ được cộng và còn chịu phần điểm bị trừ. Vì vậy độ chênh là điểm cộng + điểm phạt, không phải hiệu của chúng.', 'Changing an answer from correct to wrong loses the reward and also incurs the penalty. The gap is reward plus penalty, not their difference.']},
    {t:['Mệnh đề thật và giả', 'Truth and lie statements'],b:['Tìm các lời mâu thuẫn trực tiếp hoặc lập từng kịch bản. Với mỗi kịch bản, đánh dấu từng lời là đúng hay sai rồi đối chiếu đúng số lời thật mà đề cho.', 'Find direct contradictions or test each scenario. Mark every statement true or false, then keep the scenario with the required number of truths.']},
    {t:['Nguyên lý Dirichlet', 'The pigeonhole principle'],b:['Nếu nhiều vật hơn số chỗ chứa thì ít nhất một chỗ phải nhận nhiều hơn một vật. Với bài lấy ngẫu nhiên, hãy dựng kịch bản xấu nhất vẫn chưa đạt yêu cầu, rồi lấy thêm 1.', 'If there are more objects than containers, at least one container receives more than one object. For blind draws, build the worst case that still fails, then add 1.'],fig:pigeonholeSVG(['Đỏ','Xanh','Vàng'],1,{nextLabel:'thêm 1 viên'})},
    {t:['Phân biệt “cùng màu” và “màu chỉ định”', 'Same colour versus a specified colour'],b:['Muốn có nhiều viên cùng màu: chia đều tối đa cho mọi màu. Muốn có một màu cụ thể: lấy hết các màu không mong muốn trước, rồi mới cộng số viên của màu cần tìm.', 'To guarantee a matching colour, spread draws as evenly as possible. For a specified colour, draw all unwanted colours first, then add the required target balls.']}
  ]});
}

/* =====================================================================
   📝 LUYỆN TẬP GIỮA HỌC KÌ I – 9 dạng toán (theo đề ôn tập tuần 5)
   I. Số tự nhiên: viết số, hàng – lớp, giá trị chữ số · II. Góc · III. Đặt tính, biểu thức có chữ
   IV. Chu vi – diện tích hình chữ nhật · V. Toán lời văn: đủ hay thiếu, nhiều bước.
   Mỗi dạng 5–6 kiểu bài, mỗi kiểu có 3 mức (nhận biết – thông hiểu – vận dụng); số liệu sinh ngẫu nhiên.
   ===================================================================== */
G.topics.splice(G.topics.findIndex(t => t.id === 6) + 1, 0, {id:7, hk:1, name:'Luyện tập giữa học kì I', label:'📝 Giữa kì I'});

/* ---------- Dạng 1: viết số theo các hàng ---------- */
const gkNum = (len, zeros) => {   // chữ số d[0..len-1] tính từ hàng đơn vị; có ít nhất `zeros` chữ số 0 và 3 chữ số khác 0
  let d;
  do { d = [...Array(len)].map((_, i) => i === len - 1 ? R(1, 9) : (Math.random() < .35 ? 0 : R(1, 9))); }
  while (d.filter(x => x === 0).length < zeros || d.filter(x => x).length < 3);
  return d;
};
const gkVal = d => d.reduce((s, x, i) => s + x * 10 ** i, 0);
const gkWords = d => { const p = []; for (let i = d.length - 1; i >= 0; i--) if (d[i]) p.push(`${d[i]} ${HANG[i]}`); return p; };
const gkTerms = d => { const p = []; for (let i = d.length - 1; i >= 0; i--) if (d[i]) p.push(d[i] * 10 ** i); return p; };
const gkZeroHang = d => joinVa(d.map((x, i) => x ? null : HANG[i]).filter(Boolean).reverse());
const gkLen = lv => lv === 1 ? 5 : 6;

const gkViet = lv => {
  const d = gkNum(gkLen(lv), lv === 3 ? 2 : 1), n = gkVal(d);
  return QB({text:`Viết số gồm ${joinVa(gkWords(d))}.`, tpl:'[_]', ans:[n], wide:true,
    hint:'Viết từng chữ số từ hàng cao nhất xuống hàng đơn vị. Hàng nào đề bài không nhắc tới thì viết chữ số 0 vào hàng đó.',
    sol:`${gkTerms(d).map(fmt).join(' + ')} = <b>${fmt(n)}</b> (hàng ${gkZeroHang(d)} không có nên viết chữ số 0).`});
};
const gkTong = lv => {
  const d = gkNum(gkLen(lv), lv === 3 ? 2 : 1), n = gkVal(d);
  return QB({text:'Viết số thích hợp vào ô trống:', tpl:`<span class="eq">${gkTerms(d).map(fmt).join(' + ')} = [_]</span>`, ans:[n], wide:true,
    hint:'Mỗi số hạng cho biết chữ số ở một hàng. Hàng nào không có số hạng thì chữ số ở hàng đó là 0.',
    sol:`${gkTerms(d).map(fmt).join(' + ')} = <b>${fmt(n)}</b>.`});
};
const gkTach = lv => {
  const d = gkNum(gkLen(lv), lv === 3 ? 2 : 1), n = gkVal(d), t = gkTerms(d);
  const hide = shuffle(t.map((_, i) => i)).slice(0, 2).sort((a, b) => a - b);
  const tpl = t.map((v, i) => hide.includes(i) ? '[_]' : fmt(v)).join(' + ');
  return QB({text:`Viết số <b>${fmt(n)}</b> thành tổng. Điền số thích hợp vào ô trống:`, tpl:`<span class="eq">${fmt(n)} = ${tpl}</span>`, ans:hide.map(i => t[i]), wide:true,
    hint:'Mỗi chữ số khác 0 cho một số hạng: chữ số đó nhân với giá trị của hàng nó đứng.',
    sol:`${fmt(n)} = ${t.map(fmt).join(' + ')}. Hai ô cần điền là <b>${hide.map(i => fmt(t[i])).join('</b> và <b>')}</b>.`});
};
const gkChon = lv => {
  const d = gkNum(gkLen(lv), 1), n = gkVal(d), rd = [...d].reverse();
  const cand = [+rd.filter(x => x).join('')];
  for (let i = 0; i < d.length - 1; i++) if (d[i] !== d[i + 1] && !(i + 1 === d.length - 1 && d[i] === 0)) {
    const e = [...d]; [e[i], e[i + 1]] = [e[i + 1], e[i]]; cand.push(gkVal(e));
  }
  cand.push(n * 10, Math.floor(n / 10));
  const wrong = [...new Set(cand.filter(x => x !== n))].slice(0, 3);
  return QC({text:`Số gồm ${joinVa(gkWords(d))} là:`, opts:[n, ...wrong].map(fmt), ans:fmt(n),
    hint:'Viết lần lượt các chữ số từ hàng cao nhất; hàng không được nhắc tới là chữ số 0. Đếm lại số chữ số của số em chọn.',
    sol:`${gkTerms(d).map(fmt).join(' + ')} = <b>${fmt(n)}</b>.`});
};
const gkLienSau = lv => {
  const d = gkNum(gkLen(lv), 1), n = gkVal(d), nx = Math.random() < .5;
  return QB({text:`Viết số gồm ${joinVa(gkWords(d))}. Số <b>liền ${nx ? 'sau' : 'trước'}</b> của số đó là:`, tpl:'[_]', ans:[nx ? n + 1 : n - 1], wide:true,
    hint:'Viết số trước, rồi mới tìm số liền sau (liền trước): hơn (kém) số đó 1 đơn vị.',
    sol:`Số cần viết: ${fmt(n)}. Số liền ${nx ? 'sau' : 'trước'}: ${fmt(n)} ${nx ? '+' : '−'} 1 = <b>${fmt(nx ? n + 1 : n - 1)}</b>.`});
};
lesson(7, 'gk-viet-so', 'Dạng 1 · Viết số theo các hàng', 'Nhóm I – Số tự nhiên: viết số khi biết các chữ số ở từng hàng, điền chữ số 0 vào hàng còn trống.', [gkViet, gkTong, gkTach, gkChon, gkLienSau], {
  intro:[
    {t:'Viết số theo các hàng', b:'Viết lần lượt các chữ số từ hàng <b>cao nhất</b> xuống hàng <b>đơn vị</b>.<br>Thứ tự các hàng: đơn vị – chục – trăm – nghìn – chục nghìn – trăm nghìn.', warn:'Hàng nào không được nhắc tới thì viết chữ số <b>0</b> vào vị trí đó. Quên chữ số 0 là lỗi hay gặp nhất.', ex:'5 trăm nghìn, 8 nghìn, 3 chục và 6 đơn vị: 500 000 + 8 000 + 30 + 6 = <b>508 036</b> (hàng chục nghìn và hàng trăm không có nên viết 0).'},
    {t:'Mẹo kiểm tra', b:'Đếm số chữ số: hàng cao nhất là hàng nào thì số có bấy nhiêu chữ số (hàng trăm nghìn → 6 chữ số). Đọc lại số vừa viết xem có khớp đề không.'}
  ]});

/* ---------- Dạng 2: hàng và lớp của chữ số ---------- */
const gkDigitNum = len => {   // số len chữ số có các chữ số khác nhau
  let a; do { a = shuffle([0,1,2,3,4,5,6,7,8,9]).slice(0, len); } while (a[0] === 0); return a.reduce((s, x) => s * 10 + x, 0);
};
const gkHangLen = lv => lv === 1 ? 5 : lv === 2 ? 6 : 7;
const gkHang = lv => {
  const len = gkHangLen(lv); let n, pos;
  do { n = gkDigitNum(len); pos = uniqPos(n); } while (!pos.length);
  const p = pick(pos), d = digitsOf(n)[p];
  const others = shuffle([...Array(len).keys()].filter(i => i !== p)).slice(0, 3);
  return QC({text:`Trong số <b>${fmt(n)}</b>, chữ số <b>${d}</b> thuộc hàng nào?`, opts:[p, ...others].map(i => 'Hàng ' + HANG[i]), ans:'Hàng ' + HANG[p],
    hint:'Đếm từ phải sang trái: đơn vị, chục, trăm, nghìn, chục nghìn, trăm nghìn, triệu…',
    sol:`Chữ số ${d} đứng thứ ${p + 1} tính từ phải sang trái nên thuộc <b>hàng ${HANG[p]}</b>.`});
};
const gkLop = lv => {
  const len = gkHangLen(lv); let n, pos;
  do { n = gkDigitNum(len); pos = uniqPos(n); } while (!pos.length);
  const p = pick(pos), d = digitsOf(n)[p];
  return QC({text:`Trong số <b>${fmt(n)}</b>, chữ số <b>${d}</b> thuộc lớp nào?`, opts:['Lớp đơn vị', 'Lớp nghìn', 'Lớp triệu'], ans:'Lớp ' + LOP(p), keepOrder:true,
    hint:'Mỗi lớp có ba hàng: lớp đơn vị (đơn vị, chục, trăm), lớp nghìn (nghìn, chục nghìn, trăm nghìn), lớp triệu (triệu, chục triệu, trăm triệu).',
    sol:`Chữ số ${d} ở hàng ${HANG[p]}, thuộc <b>lớp ${LOP(p)}</b>.`});
};
const gkHangLop = lv => gPlace(gkHangLen(lv), true)();
const gkLopGom = lv => {
  const len = lv === 3 ? 9 : 6, n = gkDigitNum(len), ds = String(n).split(''), up = lv === 3 && Math.random() < .5 ? 'triệu' : 'nghìn';
  const grp = s => s.join(', ');
  const rev = ds.slice().reverse();   // rev[0] = hàng đơn vị
  const lopDigits = k => rev.slice(3 * k, 3 * k + 3).reverse();   // k: 0 đơn vị, 1 nghìn, 2 triệu
  const k = up === 'triệu' ? 2 : 1, ask = lv === 1 || Math.random() < .5 ? k : 0, name = ['đơn vị', 'nghìn', 'triệu'][ask];
  const good = grp(lopDigits(ask));
  const cand = [grp(lopDigits(ask === 0 ? 1 : 0)), grp(rev.slice(1, 4).reverse()), grp(rev.slice(2, 5).reverse()), grp(ds.slice(0, 3))].filter(x => x !== good);
  return QC({text:`Lớp <b>${name}</b> của số <b>${fmt(n)}</b> gồm các chữ số nào?`, opts:[good, ...[...new Set(cand)].slice(0, 3)], ans:good,
    hint:'Chia số thành từng nhóm ba chữ số từ phải sang trái: nhóm đầu là lớp đơn vị, nhóm kế tiếp là lớp nghìn, rồi lớp triệu.',
    sol:`Chia thành các lớp: ${fmt(n)}. Lớp ${name} gồm các chữ số <b>${good}</b>.`});
};
const gkTimChuSo = lv => {
  const len = gkHangLen(lv), n = gkDigitNum(len), [p, q] = shuffle([...Array(len).keys()]).slice(0, 2), dg = digitsOf(n);
  return QB({text:`Cho số <b>${fmt(n)}</b>. Tìm chữ số ở hàng ${HANG[p]} và chữ số ở hàng ${HANG[q]}.`,
    tpl:`Hàng ${HANG[p]}: [_] &nbsp; Hàng ${HANG[q]}: [_]`, ans:[dg[p], dg[q]],
    hint:'Đánh số các hàng từ phải sang trái: hàng đơn vị là hàng thứ nhất, hàng chục là hàng thứ hai, …',
    sol:`Hàng ${HANG[p]} là hàng thứ ${p + 1} tính từ phải: chữ số <b>${dg[p]}</b>. Hàng ${HANG[q]} là hàng thứ ${q + 1}: chữ số <b>${dg[q]}</b>.`});
};
lesson(7, 'gk-hang-lop', 'Dạng 2 · Xác định hàng và lớp của chữ số', 'Nhóm I – Số tự nhiên: chữ số đứng ở hàng nào, thuộc lớp nào; mỗi lớp có ba hàng.', [gkHang, gkLop, gkHangLop, gkLopGom, gkTimChuSo], {
  intro:[
    {t:'Hàng và lớp', b:'Mỗi lớp có <b>ba hàng</b>:<br>• Lớp đơn vị: đơn vị, chục, trăm.<br>• Lớp nghìn: nghìn, chục nghìn, trăm nghìn.<br>• Lớp triệu: triệu, chục triệu, trăm triệu.', ex:'Trong số 809 145: chữ số 8 ở <b>hàng trăm nghìn</b>, thuộc <b>lớp nghìn</b>.'},
    {t:'Cách xác định', b:'Đếm các hàng từ <b>phải sang trái</b>. Ba hàng đầu là lớp đơn vị, ba hàng tiếp theo là lớp nghìn.', warn:'Đừng nhầm hàng nghìn (một hàng) với lớp nghìn (ba hàng). Chữ số ở hàng chục nghìn thuộc lớp nghìn.'}
  ]});

/* ---------- Dạng 3: giá trị của chữ số ---------- */
const gkSoCoChuSo = (len, d, p) => {   // số len chữ số, chữ số d xuất hiện đúng một lần, ở hàng p
  let a;
  do {
    a = [...Array(len)].map(() => R(0, 9)).map(x => x === d ? (d + R(1, 9)) % 10 : x);
    a[p] = d;
  } while (a[len - 1] === 0);
  return a.reduce((s, x, i) => s + x * 10 ** i, 0);
};
const gkGiaTri = lv => gValue(lv === 1 ? 5 : 6)();
const gkBaSo = lv => {
  const len = lv === 1 ? 5 : 6, d = R(1, 9), ps = shuffle([...Array(len).keys()]).slice(0, 3);
  const ns = ps.map(p => gkSoCoChuSo(len, d, p));
  return QB({text:`Tìm giá trị của chữ số <b>${d}</b> trong mỗi số sau:`, tpl:ns.map(n => `<span class="eq">${fmt(n)}: [_]</span>`).join(' &nbsp; '), ans:ps.map(p => d * 10 ** p), wide:true,
    hint:'Chữ số đứng ở hàng nào thì có giá trị bằng chữ số đó nhân với giá trị của hàng (chục: 10, trăm: 100, nghìn: 1 000, …).',
    sol:ns.map((n, i) => `Trong ${fmt(n)}, chữ số ${d} ở hàng ${HANG[ps[i]]}: <b>${fmt(d * 10 ** ps[i])}</b>`).join('; ') + '.'});
};
const gkSoNao = lv => {
  const len = lv === 1 ? 5 : 6, d = R(1, 9), ps = shuffle([...Array(len).keys()]).slice(0, 4), p = ps[0];
  const ns = ps.map(q => gkSoCoChuSo(len, d, q)), v = d * 10 ** p;
  return QC({text:`Trong các số dưới đây, số nào có chữ số <b>${d}</b> với giá trị là <b>${fmt(v)}</b>?`, opts:ns.map(fmt), ans:fmt(ns[0]),
    hint:`Giá trị ${fmt(v)} cho biết chữ số ${d} phải đứng ở hàng nào. Tìm số có chữ số ${d} ở đúng hàng đó.`,
    sol:`${fmt(v)} = ${d} × ${fmt(10 ** p)}, chữ số ${d} ở hàng ${HANG[p]}. Đó là số <b>${fmt(ns[0])}</b>.`});
};
const gkTongGt = lv => {
  const len = lv === 1 ? 5 : 6; let n, pos;
  do { n = randDigits(len); pos = uniqPos(n); } while (pos.length < 2);
  const [i, j] = shuffle(pos).slice(0, 2), dg = digitsOf(n), a = dg[i] * 10 ** i, b = dg[j] * 10 ** j;
  return QB({text:`Tìm tổng giá trị của chữ số <b>${dg[i]}</b> và chữ số <b>${dg[j]}</b> trong số <b>${fmt(n)}</b>.`, tpl:'[_]', ans:[a + b], wide:true,
    hint:'Tìm giá trị của từng chữ số theo hàng của nó, rồi cộng hai giá trị lại.',
    sol:`Chữ số ${dg[i]} ở hàng ${HANG[i]}: ${fmt(a)}. Chữ số ${dg[j]} ở hàng ${HANG[j]}: ${fmt(b)}. Tổng: ${fmt(a)} + ${fmt(b)} = <b>${fmt(a + b)}</b>.`});
};
const gkGapLan = lv => {
  const len = lv === 3 ? 6 : 5, d = R(1, 9), q = R(0, 2), k = R(1, 3), p = q + k;
  const n1 = gkSoCoChuSo(len, d, p), n2 = gkSoCoChuSo(len, d, q);
  return QB({text:`Giá trị của chữ số <b>${d}</b> trong số <b>${fmt(n1)}</b> gấp bao nhiêu lần giá trị của chữ số <b>${d}</b> trong số <b>${fmt(n2)}</b>?`, tpl:'Gấp [_] lần', ans:[10 ** k], wide:true,
    hint:'Tìm giá trị của chữ số ở mỗi số trước, rồi lấy giá trị lớn chia cho giá trị bé.',
    sol:`Trong ${fmt(n1)}: ${fmt(d * 10 ** p)}. Trong ${fmt(n2)}: ${fmt(d * 10 ** q)}. ${fmt(d * 10 ** p)} : ${fmt(d * 10 ** q)} = <b>${fmt(10 ** k)}</b> (lần).`});
};
lesson(7, 'gk-gia-tri', 'Dạng 3 · Giá trị của chữ số', 'Nhóm I – Số tự nhiên: giá trị của một chữ số phụ thuộc vào hàng mà nó đứng.', [gkGiaTri, gkBaSo, gkSoNao, gkTongGt, gkGapLan], {
  intro:[
    {t:'Giá trị của chữ số', b:'Giá trị của một chữ số = <b>chữ số</b> × <b>giá trị của hàng</b> mà nó đứng.<br>Hàng chục: 10 · hàng trăm: 100 · hàng nghìn: 1 000 · hàng chục nghìn: 10 000 · hàng trăm nghìn: 100 000.', ex:'Chữ số 3 trong 22 356 có giá trị 300; trong 301 887 có giá trị 300 000; trong 163 569 có giá trị 3 000.'},
    {t:'Phân biệt', b:'Chữ số 3 luôn là chữ số 3, nhưng <b>giá trị</b> của nó thay đổi theo hàng. Muốn tìm giá trị, trước hết xác định chữ số đứng ở hàng nào.', warn:'Không ghi “giá trị là 3” khi chữ số 3 đứng ở hàng trăm. Hãy ghi 300.'}
  ]});

/* ---------- Dạng 4: nhận biết, đếm và đo góc ---------- */
const gkGocSVG = degs => {   // tia OB ở 0°, tia OA ở 180°, các tia khác ở degs (độ, tính từ OB)
  const cx = 160, cy = 168, L = 128, names = ['C', 'D', 'E', 'F'];
  const T = (x, y, s) => `<text class="sv-txt" x="${x.toFixed(1)}" y="${y.toFixed(1)}" font-size="18" text-anchor="middle">${s}</text>`;
  let s = `<svg viewBox="0 0 320 200" role="img" aria-label="Các tia chung gốc O">`;
  s += `<line class="sv-ray" x1="${cx - L}" y1="${cy}" x2="${cx + L}" y2="${cy}"/>`;
  degs.forEach((d, i) => {
    const [x, y] = P(cx, cy, L, d), [tx, ty] = P(cx, cy, L + 14, d);
    s += `<line class="sv-ray" x1="${cx}" y1="${cy}" x2="${x.toFixed(1)}" y2="${y.toFixed(1)}"/>` + T(tx, ty + 6, names[i]);
  });
  if (degs.includes(90)) s += `<path class="sv-ink" stroke-width="2" d="M${cx + 16} ${cy} v-16 h-16"/>`;
  s += `<circle cx="${cx}" cy="${cy}" r="5" class="sv-dot"/>` + T(cx - L - 12, cy + 6, 'A') + T(cx + L + 12, cy + 6, 'B') + T(cx, cy + 24, 'O');
  return s + '</svg>';
};
const gkDegs = (k, want90) => {
  let a;
  do { a = shuffle([...Array(15)].map((_, i) => 20 + i * 10)).slice(0, k).sort((x, y) => x - y); }
  while (a[0] < 30 || 180 - a[k - 1] < 30 || a.some((v, i) => i && v - a[i - 1] < 30) || (want90 && !a.includes(90)));
  return a;
};
const gkAngName = t => t < 90 ? 'nhọn' : t === 90 ? 'vuông' : t < 180 ? 'tù' : 'bẹt';
const gkDemGoc = lv => {
  const k = lv === 1 ? 2 : 3, degs = gkDegs(k, lv > 1 && Math.random() < .7), rays = ['B', ...['C', 'D', 'E'].slice(0, k), 'A'], ang = [0, ...degs, 180];
  const all = []; for (let i = 0; i < rays.length; i++) for (let j = i + 1; j < rays.length; j++) all.push({n: `${rays[i]}O${rays[j]}`, t: ang[j] - ang[i]});
  let type, cnt;
  for (let tries = 0; tries < 40; tries++) { type = pick(lv === 1 ? ['nhọn', 'tù'] : ['nhọn', 'vuông', 'tù', 'bẹt']); cnt = all.filter(a => gkAngName(a.t) === type).length; if (cnt > 0) break; }
  const given = degs.map((d, i) => `góc BO${rays[i + 1]} = ${d}°`).join(', ');
  return QB({text:`Cho tia OA và tia OB đối nhau (A, O, B thẳng hàng). Biết ${given}. Hình bên có tất cả bao nhiêu góc <b>${type}</b> đỉnh O?`, fig:gkGocSVG(degs), tpl:`[_] góc ${type}`, ans:[cnt],
    hint:'Xét từng cặp tia chung gốc O. Số đo góc tạo bởi hai tia là hiệu hai số đo (tính từ tia OB). Đừng bỏ sót góc tạo bởi hai tia nằm trên cùng một đường thẳng.',
    sol:BG(`Các góc đỉnh O: ${all.map(a => `${a.n} = ${a.t}° (${gkAngName(a.t)})`).join('; ')}.`, `Có <b>${cnt}</b> góc ${type}.`)});
};
const gkDoGoc = lv => {
  if (lv === 1) {
    const y = R(3, 15) * 10, d = y === 90 ? 80 : y;
    return QB({text:`Trên thước đo góc, tia OB ở vạch 0° và tia OA ở vạch 180°. Tia OD đi qua vạch <b>${d}°</b>. Số đo góc DOA là:`, fig:gkGocSVG([d]).replace(/>C</, '>D<'), tpl:'Góc DOA = [_]°', ans:[180 - d],
      hint:'Góc BOA là góc bẹt (180°) gồm hai góc BOD và DOA ghép lại.', sol:`Góc DOA = 180° − ${d}° = <b>${180 - d}°</b>.`});
  }
  const [x, y] = gkDegs(2, lv === 3 && Math.random() < .5), fig = gkGocSVG([x, y]);
  if (lv === 2) return QB({text:`Trên thước đo góc, tia OB ở vạch 0°, tia OC đi qua vạch <b>${x}°</b>, tia OD đi qua vạch <b>${y}°</b>. Số đo góc COD là:`, fig, tpl:'Góc COD = [_]°', ans:[y - x],
    hint:'Số đo góc COD bằng hiệu hai số đo đọc trên thước: lấy số lớn trừ số bé.', sol:`Góc COD = ${y}° − ${x}° = <b>${y - x}°</b>.`});
  return QB({text:`Cho tia OA và tia OB đối nhau. Biết góc BOC = <b>${x}°</b>, góc BOD = <b>${y}°</b> (như hình). Tính số đo góc COD và góc DOA.`, fig, tpl:'Góc COD = [_]° &nbsp; Góc DOA = [_]°', ans:[y - x, 180 - y],
    hint:'Góc COD là hiệu của góc BOD và góc BOC. Góc BOA là góc bẹt (180°) nên góc DOA = góc bẹt trừ góc BOD.',
    sol:BG(`Góc COD = ${y}° − ${x}° = <b>${y - x}°</b>.`, `Góc DOA = 180° − ${y}° = <b>${180 - y}°</b>.`)});
};
const gkTongGoc = lv => {
  const k = lv === 1 ? 1 : lv === 2 ? 2 : R(3, 4), n = k + 2, total = n * (n - 1) / 2, nm = ['C', 'D', 'E', 'F'].slice(0, k), degs = k <= 3 ? gkDegs(k, false) : [30, 60, 100, 140];
  const lines = []; let sum = 0;
  ['B', ...nm].forEach((r, i) => { lines.push(`Tia O${r} tạo với ${n - 1 - i} tia còn lại ở phía sau nó ${n - 1 - i} góc`); sum += n - 1 - i; });
  return QB({text:`Cho đường thẳng AB và điểm O thuộc AB. Từ O kẻ thêm ${k} tia ${joinVa(nm.map(x => 'O' + x))} về cùng một phía của đường thẳng AB (như hình). Hỏi hình có tất cả bao nhiêu góc đỉnh O, kể cả góc bẹt?`, fig:gkGocSVG(degs), tpl:'[_] góc', ans:[total],
    hint:'Mỗi góc được tạo bởi hai tia chung gốc O. Liệt kê có hệ thống: lần lượt lấy từng tia làm cạnh đầu, ghép với các tia đứng sau nó.',
    sol:BG(`Hình có ${n} tia chung gốc O: OB, ${nm.map(x => 'O' + x).join(', ')}, OA.`, `${[...Array(n - 1)].map((_, i) => n - 1 - i).join(' + ')} = <b>${total}</b> góc (có cả góc bẹt AOB).`)});
};
lesson(7, 'gk-goc', 'Dạng 4 · Nhận biết, đếm và đo góc', 'Nhóm II – Hình học: góc nhọn, vuông, tù, bẹt; đếm các góc trong hình; đo góc bằng thước đo góc.', [gAngType, gAngDeg, gkDemGoc, gkDoGoc, gkTongGoc], {
  intro:[
    {t:'Các loại góc', b:'• <b>Góc nhọn</b>: nhỏ hơn 90°.<br>• <b>Góc vuông</b>: bằng 90°.<br>• <b>Góc tù</b>: lớn hơn 90° và nhỏ hơn 180°.<br>• <b>Góc bẹt</b>: bằng 180° (hai cạnh là hai tia đối nhau).'},
    {t:'Cách đếm góc trong hình', b:'Xét từng đỉnh. Với mỗi đỉnh, ghép <b>từng cặp tia</b> chung gốc thành một góc rồi phân loại. Số đo góc ghép từ hai góc nhỏ bằng tổng hai góc đó.', warn:'Đừng bỏ sót <b>góc bẹt</b>, tức góc tạo bởi hai tia nằm trên cùng một đường thẳng.', ex:'Có 4 tia chung gốc O thì có 3 + 2 + 1 = 6 góc.'},
    {t:'Đo góc bằng thước đo góc', b:'Đặt tâm thước trùng đỉnh góc, một cạnh đi qua vạch 0. Đọc số ở vạch mà cạnh còn lại đi qua.'}
  ]});

/* ---------- Dạng 5: đặt tính rồi tính ---------- */
const gkColAdd = (a, b) => {
  const x = digitsOf(a), y = digitsOf(b), L = Math.max(x.length, y.length), out = []; let c = 0;
  for (let i = 0; i < L; i++) {
    const terms = [x[i], y[i]].filter(v => v !== undefined), s = terms.reduce((p, q) => p + q, 0) + c;
    out.push(`Hàng ${HANG[i]}: ${terms.join(' + ')}${c ? ' + 1' : ''} = ${s}, viết ${s % 10}${s >= 10 ? ', nhớ 1' : ''}`); c = s >= 10 ? 1 : 0;
  }
  if (c) out.push(`Hàng ${HANG[L]}: viết 1`);
  return out;
};
const gkColSub = (a, b) => {
  const x = digitsOf(a), y = digitsOf(b), out = []; let br = 0;
  for (let i = 0; i < x.length; i++) {
    const da = x[i], db = y[i], cur = da - br;
    if (db === undefined) {
      if (cur < 0) { out.push(`Hàng ${HANG[i]}: ${da} − 1 không trừ được, mượn 1: ${da + 10} − 1 = 9`); br = 1; }
      else { out.push(br ? `Hàng ${HANG[i]}: ${da} − 1 = ${cur}` : `Hàng ${HANG[i]}: hạ ${da}`); br = 0; }
    } else if (cur < db) { out.push(`Hàng ${HANG[i]}: ${da}${br ? ' − 1' : ''} không trừ được ${db}, mượn 1: ${da + 10 - br} − ${db} = ${da + 10 - br - db}`); br = 1; }
    else { out.push(`Hàng ${HANG[i]}: ${da}${br ? ' − 1' : ''} − ${db} = ${cur - db}`); br = 0; }
  }
  return out;
};
const gkColMul = (a, b) => {
  const x = digitsOf(a), out = []; let c = 0;
  x.forEach((d, i) => {
    const p = d * b + c;
    out.push(`Hàng ${HANG[i]}: ${d} × ${b}${c ? ' + ' + c : ''} = ${p}, ${i === x.length - 1 ? 'viết ' + p : 'viết ' + (p % 10) + (p >= 10 ? ', nhớ ' + Math.floor(p / 10) : '')}`); c = Math.floor(p / 10);
  });
  return out;
};
const gkCong = lv => {
  const L = lv === 1 ? 4 : 5, a = randDigits(L), b = randDigits(L), r = a + b;
  return QB({text:'Đặt tính rồi tính:', tpl:`<span class="eq">${fmt(a)} + ${fmt(b)} = [_]</span>`, ans:[r], wide:true,
    hint:'Đặt các chữ số cùng hàng thẳng cột. Cộng từ phải sang trái, nhớ 1 sang hàng bên trái khi tổng từ 10 trở lên.',
    sol:BG(...gkColAdd(a, b), `${fmt(a)} + ${fmt(b)} = <b>${fmt(r)}</b>`)});
};
const gkTru = lv => {
  const L = lv === 1 ? 4 : 5; let a = randDigits(L), b = randDigits(lv === 3 ? L - 1 : L);
  if (b > a) [a, b] = [b, a]; if (a === b) a += 1;
  const r = a - b;
  return QB({text:'Đặt tính rồi tính:', tpl:`<span class="eq">${fmt(a)} − ${fmt(b)} = [_]</span>`, ans:[r], wide:true,
    hint:'Đặt tính thẳng cột, trừ từ phải sang trái. Hàng nào số bị trừ bé hơn số trừ thì mượn 1 ở hàng liền trước.',
    sol:BG(...gkColSub(a, b), `${fmt(a)} − ${fmt(b)} = <b>${fmt(r)}</b>`)});
};
const gkNhan = lv => {
  const a = randDigits(lv === 1 ? 3 : lv === 2 ? 4 : 5), b = R(2, 9), r = a * b;
  return QB({text:'Đặt tính rồi tính:', tpl:`<span class="eq">${fmt(a)} × ${b} = [_]</span>`, ans:[r], wide:true,
    hint:'Nhân lần lượt từng chữ số của thừa số thứ nhất với thừa số thứ hai, từ phải sang trái; nhớ số nhớ sang hàng bên trái.',
    sol:BG(...gkColMul(a, b), `${fmt(a)} × ${b} = <b>${fmt(r)}</b>`)});
};
const gkThuLai = lv => {
  const L = lv === 1 ? 4 : 5, add = Math.random() < .5; let a = randDigits(L), b = randDigits(L);
  if (!add && b > a) [a, b] = [b, a]; if (!add && a === b) a += 1;
  const r = add ? a + b : a - b;
  return QB({text:'Tính rồi thử lại bằng phép tính ngược:', tpl:add ? `<span class="eq">${fmt(a)} + ${fmt(b)} = [_]</span><br><span class="eq">Thử lại: [_] − ${fmt(b)} = ${fmt(a)}</span>` : `<span class="eq">${fmt(a)} − ${fmt(b)} = [_]</span><br><span class="eq">Thử lại: [_] + ${fmt(b)} = ${fmt(a)}</span>`, ans:[r, r], wide:true,
    hint:add ? 'Thử lại phép cộng: lấy tổng trừ đi một số hạng, kết quả phải bằng số hạng còn lại.' : 'Thử lại phép trừ: lấy hiệu cộng với số trừ, kết quả phải bằng số bị trừ.',
    sol:`${fmt(a)} ${add ? '+' : '−'} ${fmt(b)} = <b>${fmt(r)}</b>. Thử lại: ${fmt(r)} ${add ? '−' : '+'} ${fmt(b)} = ${fmt(a)} (đúng).`});
};
const gkBaSo2 = lv => {
  const pat = Math.random() < .5;
  if (pat) { const a = randDigits(5), b = randDigits(5), c = R(1000, a + b - 1000), r = a + b - c;
    return QB({text:'Tính:', tpl:`<span class="eq">${fmt(a)} + ${fmt(b)} − ${fmt(c)} = [_]</span>`, ans:[r], wide:true,
      hint:'Biểu thức chỉ có cộng và trừ: tính lần lượt từ trái sang phải.', sol:BG(`${fmt(a)} + ${fmt(b)} = ${fmt(a + b)}`, `${fmt(a + b)} − ${fmt(c)} = <b>${fmt(r)}</b>`)}); }
  const a = randDigits(4), m = R(2, 9), b = randDigits(4), r = a * m + b;
  return QB({text:'Tính:', tpl:`<span class="eq">${fmt(a)} × ${m} + ${fmt(b)} = [_]</span>`, ans:[r], wide:true,
    hint:'Biểu thức có nhân và cộng: thực hiện phép nhân trước, phép cộng sau.', sol:BG(`${fmt(a)} × ${m} = ${fmt(a * m)}`, `${fmt(a * m)} + ${fmt(b)} = <b>${fmt(r)}</b>`)});
};
lesson(7, 'gk-dat-tinh', 'Dạng 5 · Đặt tính rồi tính', 'Nhóm III – Phép tính: cộng, trừ, nhân số có nhiều chữ số với số có một chữ số; thử lại kết quả.', [gkCong, gkTru, gkNhan, gkThuLai, gkBaSo2], {
  intro:[
    {t:'Cách đặt tính', b:'Viết các chữ số <b>cùng hàng thẳng cột</b>: đơn vị dưới đơn vị, chục dưới chục, … Tính từ <b>phải sang trái</b>.'},
    {t:'Cộng – trừ – nhân', b:'• Cộng: tổng hàng từ 10 trở lên thì viết hàng đơn vị, <b>nhớ 1</b> sang hàng bên trái.<br>• Trừ: hàng nào số bị trừ bé hơn số trừ thì <b>mượn 1</b> ở hàng bên trái (hàng bên trái bớt 1).<br>• Nhân: nhân từng chữ số với thừa số thứ hai, cộng thêm số nhớ.', warn:'Quên cộng số nhớ khi nhân, hoặc quên “bớt 1” sau khi mượn khi trừ.', ex:'34 895 + 98 473 = 133 368 · 17 512 − 9 587 = 7 925 · 4 674 × 8 = 37 392.'},
    {t:'Thử lại', b:'Phép cộng: lấy tổng trừ một số hạng. Phép trừ: lấy hiệu cộng số trừ. Kết quả phải khớp với số đã cho.'}
  ]});

/* ---------- Dạng 6: giá trị biểu thức có chữ ---------- */
const gkBt1 = lv => {
  const c = randDigits(4), m = lv === 1 ? R(11, 99) : R(101, 999), n = R(2, 9), r = c + m * n;
  return QB({text:`Tính giá trị của biểu thức <b>${fmt(c)} + m × n</b> với <b>m = ${m}</b>, <b>n = ${n}</b>.`, tpl:'[_]', ans:[r], wide:true,
    hint:'Thay chữ bằng số, rồi thực hiện phép nhân trước, phép cộng sau.',
    sol:BG(`${fmt(c)} + ${m} × ${n}`, `= ${fmt(c)} + ${fmt(m * n)}`, `= <b>${fmt(r)}</b>`)});
};
const gkBt2 = lv => {
  const a = R(2, 9), q = lv === 1 ? R(11, 99) : R(101, 999), b = randDigits(lv === 1 ? 3 : 4), x = a * q, r = q + b;
  return QB({text:`Tính giá trị của biểu thức <b>${fmt(x)} : a + b</b> với <b>a = ${a}</b>, <b>b = ${fmt(b)}</b>.`, tpl:'[_]', ans:[r], wide:true,
    hint:'Thay chữ bằng số, rồi thực hiện phép chia trước, phép cộng sau.',
    sol:BG(`${fmt(x)} : ${a} + ${fmt(b)}`, `= ${fmt(q)} + ${fmt(b)}`, `= <b>${fmt(r)}</b>`)});
};
const gkBt3 = lv => {
  if (Math.random() < .5) {
    const m = R(100, 900), n = R(2, 9), c = m * n + R(100, 3000), r = c - m * n;
    return QB({text:`Tính giá trị của biểu thức <b>${fmt(c)} − m × n</b> với <b>m = ${m}</b>, <b>n = ${n}</b>.`, tpl:'[_]', ans:[r], wide:true,
      hint:'Thay chữ bằng số. Nhân trước rồi mới trừ.', sol:BG(`${fmt(c)} − ${m} × ${n}`, `= ${fmt(c)} − ${fmt(m * n)}`, `= <b>${fmt(r)}</b>`)});
  }
  const a = R(2, 9), q = R(101, 999), x = a * q, c = R(1000, 9999), r = c + q;
  return QB({text:`Tính giá trị của biểu thức <b>${fmt(c)} + ${fmt(x)} : a</b> với <b>a = ${a}</b>.`, tpl:'[_]', ans:[r], wide:true,
    hint:'Thay chữ bằng số. Chia trước rồi mới cộng.', sol:BG(`${fmt(c)} + ${fmt(x)} : ${a}`, `= ${fmt(c)} + ${fmt(q)}`, `= <b>${fmt(r)}</b>`)});
};
const gkBt4 = lv => {
  if (Math.random() < .5) {
    const m = R(100, 900), n = R(100, 900), k = R(2, 9), r = (m + n) * k;
    return QB({text:`Tính giá trị của biểu thức <b>(m + n) × k</b> với <b>m = ${m}</b>, <b>n = ${n}</b>, <b>k = ${k}</b>.`, tpl:'[_]', ans:[r], wide:true,
      hint:'Biểu thức có dấu ngoặc: tính trong ngoặc trước.', sol:BG(`(${m} + ${n}) × ${k}`, `= ${fmt(m + n)} × ${k}`, `= <b>${fmt(r)}</b>`)});
  }
  const a = R(11, 99), b = R(2, 9), c = R(2, 9), q = R(11, 99), d = c * q, r = a * b + q;
  return QB({text:`Tính giá trị của biểu thức <b>a × b + ${d} : c</b> với <b>a = ${a}</b>, <b>b = ${b}</b>, <b>c = ${c}</b>.`, tpl:'[_]', ans:[r], wide:true,
    hint:'Có cả nhân, chia và cộng: nhân, chia làm trước (từ trái sang phải), cộng làm sau.', sol:BG(`${a} × ${b} + ${d} : ${c}`, `= ${a * b} + ${q}`, `= <b>${r}</b>`)});
};
const gkBt5 = lv => {
  if (Math.random() < .5) {
    const c = R(8, 30) * 100, m = R(2, 9), n = R(5, 40) * 10, r = c - m * n;
    if (r <= 0) return gkBt5(lv);
    return QB({text:`Một cửa hàng có <b>c</b> kg gạo. Mỗi ngày bán <b>m</b> kg, bán trong <b>n</b> ngày thì số gạo còn lại là <b>c − m × n</b> (kg). Tính số gạo còn lại khi <b>c = ${fmt(c)}</b>, <b>m = ${n}</b>, <b>n = ${m}</b>.`, tpl:'[_] kg', ans:[r], wide:true,
      hint:'Thay đúng chữ bằng đúng số (chú ý m và n đã cho ở đề), nhân trước rồi trừ sau.', sol:BG(`c − m × n = ${fmt(c)} − ${n} × ${m}`, `= ${fmt(c)} − ${fmt(n * m)}`, `= <b>${fmt(r)} kg</b>`)});
  }
  const c = R(2, 9) * 1000, m = R(2, 9), n = R(2, 9) * 1000, r = c + m * n;
  return QB({text:`Mua <b>m</b> quyển vở, mỗi quyển giá <b>n</b> đồng và một chiếc cặp giá <b>c</b> đồng thì số tiền phải trả là <b>c + m × n</b> (đồng). Tính số tiền phải trả khi <b>m = ${m}</b>, <b>n = ${fmt(n)}</b>, <b>c = ${fmt(c * 10)}</b>.`, tpl:'[_] đồng', ans:[c * 10 + m * n], wide:true,
    hint:'Thay chữ bằng số: nhân m với n trước, rồi cộng với giá chiếc cặp.', sol:BG(`c + m × n = ${fmt(c * 10)} + ${m} × ${fmt(n)}`, `= ${fmt(c * 10)} + ${fmt(m * n)}`, `= <b>${fmt(c * 10 + m * n)} đồng</b>`)});
};
lesson(7, 'gk-bt-chu', 'Dạng 6 · Giá trị của biểu thức có chữ', 'Nhóm III – Phép tính: thay chữ bằng số rồi tính đúng thứ tự phép tính.', [gkBt1, gkBt2, gkBt3, gkBt4, gkBt5], {
  intro:[
    {t:'Quy trình', b:'<b>Bước 1</b>: thay chữ bằng số.<br><b>Bước 2</b>: tính trong ngoặc (nếu có).<br><b>Bước 3</b>: nhân, chia trước.<br><b>Bước 4</b>: cộng, trừ sau.', ex:'3467 + m × n với m = 456, n = 7: 3467 + 456 × 7 = 3467 + 3192 = <b>6659</b>.'},
    {t:'Lưu ý', b:'Viết lại biểu thức sau mỗi bước, mỗi dòng bắt đầu bằng dấu “=”.', warn:'Không cộng trước khi nhân: 3467 + 456 × 7 không bằng 3923 × 7.'}
  ]});

/* ---------- Dạng 7: chu vi, diện tích hình chữ nhật ---------- */
const gkRectSVG = (a, b, unit, la, lb) => {
  const w = 220, h = Math.max(56, Math.min(130, Math.round(220 * b / a))), x0 = 50, y0 = Math.round((200 - h) / 2) + 4;
  return `<svg viewBox="0 0 320 200" role="img" aria-label="Hình chữ nhật"><rect class="sv-ink" stroke-width="3" x="${x0}" y="${y0}" width="${w}" height="${h}"/>`
    + `<text class="sv-txt" x="${x0 + w / 2}" y="${y0 - 10}" font-size="18" text-anchor="middle">${la ?? `${a} ${unit}`}</text>`
    + `<text class="sv-txt" x="${x0 + w + 10}" y="${y0 + h / 2 + 6}" font-size="18">${lb ?? `${b} ${unit}`}</text></svg>`;
};
const gkDims = lv => { const a = lv === 1 ? R(6, 20) : lv === 2 ? R(20, 95) : R(60, 400), b = R(3, Math.min(a - 1, lv === 1 ? 12 : lv === 2 ? 19 : 59)); return [a, b]; };
const gkPS = lv => {
  const [a, b] = gkDims(lv), u = lv === 3 ? 'm' : 'cm';
  return QB({text:`Một hình chữ nhật có chiều dài <b>${a} ${u}</b>, chiều rộng <b>${b} ${u}</b>. Tính chu vi và diện tích hình chữ nhật đó.`, fig:gkRectSVG(a, b, u), tpl:`Chu vi: [_] ${u} &nbsp; Diện tích: [_] ${u}²`, ans:[(a + b) * 2, a * b], wide:true,
    hint:'Chu vi P = (dài + rộng) × 2. Diện tích S = dài × rộng. Chu vi tính bằng đơn vị độ dài, diện tích tính bằng đơn vị diện tích.',
    sol:BG(`Chu vi: (${a} + ${b}) × 2 = <b>${(a + b) * 2} ${u}</b>`, `Diện tích: ${a} × ${b} = <b>${fmt(a * b)} ${u}²</b>`)});
};
const gkDonVi = lv => {
  const [a, b] = gkDims(lv), P2 = (a + b) * 2, S2 = a * b, wantS = Math.random() < .5, u = 'cm';
  const ok = wantS ? `${fmt(S2)} cm²` : `${P2} cm`;
  const opts = wantS ? [`${fmt(S2)} cm²`, `${fmt(S2)} cm`, `${P2} cm²`, `${P2} cm`] : [`${P2} cm`, `${P2} cm²`, `${fmt(S2)} cm`, `${fmt(S2)} cm²`];
  return QC({text:`Hình chữ nhật có chiều dài <b>${a} ${u}</b>, chiều rộng <b>${b} ${u}</b>. Kết quả nào sau đây là ${wantS ? '<b>diện tích</b>' : '<b>chu vi</b>'} của hình đó, ghi đúng đơn vị?`, fig:gkRectSVG(a, b, u), opts, ans:ok, keepOrder:false,
    hint:`${wantS ? 'Diện tích = dài × rộng, đo bằng cm² (xăng-ti-mét vuông)' : 'Chu vi = (dài + rộng) × 2, đo bằng cm (xăng-ti-mét)'}. Hãy xem cả số và đơn vị.`,
    sol:wantS ? `S = ${a} × ${b} = <b>${fmt(S2)} cm²</b>.` : `P = (${a} + ${b}) × 2 = <b>${P2} cm</b>.`});
};
const gkTimRong = lv => {
  const [a, b] = gkDims(lv), u = lv === 3 ? 'm' : 'cm', P2 = (a + b) * 2;
  return QB({text:`Một hình chữ nhật có chu vi <b>${P2} ${u}</b>, chiều dài <b>${a} ${u}</b>. Tính chiều rộng của hình chữ nhật.`, fig:gkRectSVG(a, b, u, `${a} ${u}`, '?'), tpl:`[_] ${u}`, ans:[b],
    hint:'Nửa chu vi bằng chiều dài cộng chiều rộng. Tính nửa chu vi trước.',
    sol:BG(`Nửa chu vi: ${P2} : 2 = ${a + b} (${u})`, `Chiều rộng: ${a + b} − ${a} = <b>${b} ${u}</b>`)});
};
const gkTimDai = lv => {
  const b = lv === 1 ? R(3, 9) : R(6, 40), a = b * R(2, lv === 1 ? 6 : 9) + R(0, 3), S2 = a * b, u = lv === 3 ? 'm' : 'cm';
  return QB({text:`Một hình chữ nhật có diện tích <b>${fmt(S2)} ${u}²</b>, chiều rộng <b>${b} ${u}</b>. Tính chiều dài và chu vi của hình chữ nhật.`, fig:gkRectSVG(a, b, u, '?', `${b} ${u}`), tpl:`Chiều dài: [_] ${u} &nbsp; Chu vi: [_] ${u}`, ans:[a, (a + b) * 2], wide:true,
    hint:'Diện tích = dài × rộng, nên chiều dài = diện tích : chiều rộng. Có chiều dài rồi mới tính chu vi.',
    sol:BG(`Chiều dài: ${fmt(S2)} : ${b} = <b>${a} ${u}</b>`, `Chu vi: (${a} + ${b}) × 2 = <b>${(a + b) * 2} ${u}</b>`)});
};
const gkRectVd = lv => {
  const t = Math.random() < .5 ? 0 : 1;
  if (t === 0) {
    const w = lv === 3 ? R(15, 60) : R(5, 30), k = pick([2, 3, 4]), a = w * k;
    return QB({text:`Một mảnh vườn hình chữ nhật có chiều rộng <b>${w} m</b>, chiều dài gấp <b>${k}</b> lần chiều rộng. Tính chu vi và diện tích mảnh vườn.`, tpl:'Chu vi: [_] m &nbsp; Diện tích: [_] m²', ans:[(a + w) * 2, a * w], wide:true,
      hint:'Tìm chiều dài trước: lấy chiều rộng nhân với số lần. Sau đó áp dụng công thức chu vi và diện tích.',
      sol:BG(`Chiều dài: ${w} × ${k} = ${a} (m)`, `Chu vi: (${a} + ${w}) × 2 = <b>${(a + w) * 2} m</b>`, `Diện tích: ${a} × ${w} = <b>${fmt(a * w)} m²</b>`)});
  }
  const [a, b] = gkDims(3), g = R(2, 5), len = (a + b) * 2 - g;
  return QB({text:`Một mảnh vườn hình chữ nhật có chiều dài <b>${a} m</b>, chiều rộng <b>${b} m</b>. Người ta rào xung quanh mảnh vườn, chừa một cổng rộng <b>${g} m</b>. Hỏi hàng rào dài bao nhiêu mét?`, fig:gkRectSVG(a, b, 'm'), tpl:'[_] m', ans:[len], wide:true,
    hint:'Chiều dài hàng rào chỉ tính chu vi, rồi bỏ đi phần cổng không rào.',
    sol:BG(`Chu vi mảnh vườn: (${a} + ${b}) × 2 = ${(a + b) * 2} (m)`, `Hàng rào dài: ${(a + b) * 2} − ${g} = <b>${len} m</b>`)});
};
lesson(7, 'gk-chu-vi-dt', 'Dạng 7 · Chu vi, diện tích hình chữ nhật', 'Nhóm IV – Đại lượng: tính chu vi, diện tích, tìm cạnh còn thiếu và ghi đúng đơn vị.', [gkPS, gkDonVi, gkTimRong, gkTimDai, gkRectVd], {
  intro:[
    {t:'Công thức', b:'Gọi chiều dài là <b>a</b>, chiều rộng là <b>b</b> (cùng đơn vị đo):<br>• Chu vi: <b>P = (a + b) × 2</b><br>• Diện tích: <b>S = a × b</b>', ex:'a = 80 cm, b = 7 cm: P = (80 + 7) × 2 = 174 cm; S = 80 × 7 = 560 cm².'},
    {t:'Đơn vị', b:'Chu vi là độ dài nên ghi <b>cm, m</b>… Diện tích ghi <b>cm², m²</b>…', warn:'Hai lỗi hay gặp: nhầm công thức chu vi với diện tích; ghi cm thay cho cm² (hoặc ngược lại). Đổi các số đo về cùng một đơn vị trước khi tính.'}
  ]});

/* ---------- Dạng 8: tổng hợp số liệu, đủ hay thiếu ---------- */
const GKSUP = [
  {o:'lốc sữa', c:'lốc', i:'hộp sữa', per:[4, 5, 6]}, {o:'thùng vở', c:'thùng', i:'quyển vở', per:[20, 24, 25, 30, 40]},
  {o:'hộp bút', c:'hộp', i:'chiếc bút', per:[10, 12, 20]}, {o:'hộp bánh', c:'hộp', i:'chiếc bánh', per:[6, 8, 12]},
  {o:'bó sách', c:'bó', i:'quyển sách', per:[10, 12, 15, 20]}, {o:'túi kẹo', c:'túi', i:'viên kẹo', per:[15, 20, 25]}];
const gkTable = (names, vals) => `<table style="border-collapse:collapse;margin:6px 0"><tr><th style="border:1px solid currentColor;padding:2px 10px">Lớp</th>${names.map(n => `<td style="border:1px solid currentColor;padding:2px 10px;text-align:center">${n}</td>`).join('')}</tr><tr><th style="border:1px solid currentColor;padding:2px 10px">Số học sinh</th>${vals.map(v => `<td style="border:1px solid currentColor;padding:2px 10px;text-align:center">${v}</td>`).join('')}</tr></table>`;
const gkDuThieu = (kind, withTable) => lv => {
  const c = pick(GKSUP), per = pick(c.per), table = !!withTable;
  const g = table ? [...Array(5)].map(() => R(24, 40)) : [...Array(5)].map(() => R(8, 30) * 10), T = g.reduce((s, x) => s + x, 0);
  const wantEnough = kind === 'thua' ? true : kind === 'thieu' || kind === 'them' ? false : Math.random() < .5;
  let k;
  if (wantEnough) { k = Math.ceil(T / per) + R(0, 3); if (k * per <= T) k++; }
  else { k = Math.floor(T / per) - R(kind === 'them' ? 2 : 0, kind === 'them' ? 5 : 3); if (k * per >= T) k--; }
  const S2 = k * per, diff = Math.abs(S2 - T), more = Math.ceil(diff / per);
  const names = ['4A', '4B', '4C', '4D', '4E'];
  const data = table ? `Số học sinh của năm lớp khối 4 được cho trong bảng:${gkTable(names, g)}` : `Trường có số học sinh các khối 1, 2, 3, 4, 5 lần lượt là <b>${g.join(', ')}</b>.`;
  const who = table ? 'khối 4' : 'trường';
  const buy = table ? `Nhà trường có <b>${k}</b> ${c.o}` : `Trường nhập về <b>${k}</b> ${c.o}`;
  const ask = kind === 'thua' ? `Hỏi sau khi phát cho mỗi học sinh một ${c.i}, còn thừa bao nhiêu ${c.i}?`
    : kind === 'thieu' ? `Hỏi còn thiếu bao nhiêu ${c.i} để phát cho mỗi học sinh một ${c.i}?`
    : kind === 'them' ? `Hỏi cần nhập thêm ít nhất bao nhiêu ${c.c} nữa để phát cho mỗi học sinh một ${c.i}?`
    : `Hỏi có đủ phát cho mỗi học sinh một ${c.i} không?`;
  const text = `${data} ${buy}, mỗi ${c.c} có <b>${per}</b> ${c.i}. ${ask}`;
  const verdict = wantEnough ? `Đủ, còn thừa ${diff} ${c.i}` : `Không đủ, còn thiếu ${diff} ${c.i}`;
  const wrongT = T - g[0], dw = Math.abs(S2 - wrongT);
  const opts = [...new Set([verdict, wantEnough ? `Không đủ, còn thiếu ${diff} ${c.i}` : `Đủ, còn thừa ${diff} ${c.i}`, S2 >= wrongT ? `Đủ, còn thừa ${dw} ${c.i}` : `Không đủ, còn thiếu ${dw} ${c.i}`, `Đủ, vừa vặn`])];
  const sTot = {tag:'Giải', ask:`Tổng số học sinh ${who} là:`, tpl:lv === 1 ? `${g.join(' + ')} = [_] (học sinh)` : '[_] học sinh', ans:[T], wide:true, hint:'Cộng số học sinh của tất cả các ' + (table ? 'lớp.' : 'khối.')};
  const sSup = {tag:'Giải', ask:`Tổng số ${c.i} là:`, tpl:lv === 1 ? `${k} × ${per} = [_] (${c.i})` : `[_] ${c.i}`, ans:[S2], wide:true, hint:`Mỗi ${c.c} có ${per} ${c.i}, có ${k} ${c.c}: phép nhân.`};
  const sFin = kind === 'thua' || kind === 'thieu' ? {tag:'Đáp số', ask:kind === 'thua' ? `Số ${c.i} còn thừa là:` : `Số ${c.i} còn thiếu là:`, tpl:`[_] ${c.i}`, ans:[diff], wide:true, hint:'Lấy số lớn trừ số bé trong hai tổng vừa tìm được.'}
    : kind === 'them' ? {tag:'Đáp số', ask:`Cần nhập thêm ít nhất số ${c.c} là:`, tpl:`[_] ${c.c}`, ans:[more], wide:true, hint:`Tìm số ${c.i} còn thiếu, rồi chia cho số ${c.i} trong mỗi ${c.c}. Số dư vẫn phải thêm một ${c.c} nữa.`}
    : {tag:'Đáp số', ask:'Kết luận nào đúng?', opts, ans:verdict, hint:'So sánh hai tổng: số ' + c.i + ' phải lớn hơn hoặc bằng số học sinh thì mới đủ.'};
  const understand = {tag:'Hiểu đề', ask:`Để biết có đủ ${c.i} hay không, ta cần so sánh hai số nào?`, opts:[`Tổng số học sinh và tổng số ${c.i}`, `Số học sinh của một khối và số ${c.c}`, `Số ${c.c} và số ${c.i} mỗi ${c.c}`, `Số học sinh khối 1 và khối 5`], ans:`Tổng số học sinh và tổng số ${c.i}`, hint:'Mỗi học sinh nhận một ' + c.i + ': số ' + c.i + ' phải so với số học sinh của cả ' + who + '.'};
  const cmpLine = `${fmt(S2)} ${S2 > T ? '&gt;' : '&lt;'} ${fmt(T)}`;
  const fin = kind === 'them' ? `Còn thiếu ${fmt(T)} − ${fmt(S2)} = ${diff} (${c.i}). ${diff} : ${per} = ${Math.floor(diff / per)} (dư ${diff % per}) nên cần thêm <b>${more} ${c.c}</b>.`
    : `${cmpLine} nên ${wantEnough ? 'đủ' : 'không đủ'}; ${wantEnough ? 'còn thừa' : 'còn thiếu'} ${fmt(Math.max(S2, T))} − ${fmt(Math.min(S2, T))} = <b>${diff} ${c.i}</b>.`;
  return QS({direct:lv === 3, text, hint:'Tính tổng số học sinh, tính tổng số ' + c.i + ', rồi so sánh hai tổng.',
    sol:BG(`Tổng số học sinh: ${g.join(' + ')} = ${fmt(T)} (học sinh)`, `Tổng số ${c.i}: ${k} × ${per} = ${fmt(S2)} (${c.i})`, fin),
    steps:lv === 1 ? [understand, sTot, sSup, sFin] : [sTot, sSup, sFin]});
};
lesson(7, 'gk-du-thieu', 'Dạng 8 · Tổng hợp số liệu: đủ hay thiếu', 'Nhóm V – Toán lời văn: đọc số liệu, tính tổng, nhân theo nhóm rồi so sánh để kết luận đủ hay thiếu.', [gkDuThieu('du'), gkDuThieu('thua'), gkDuThieu('thieu'), gkDuThieu('du', true), gkDuThieu('them')], {
  intro:[
    {t:'Ba bước giải', b:'<b>Bước 1</b>: tính tổng số người (cộng các số liệu).<br><b>Bước 2</b>: tính tổng số vật (nhân số nhóm với số vật mỗi nhóm).<br><b>Bước 3</b>: so sánh hai tổng và kết luận.', ex:'Khối: 200, 250, 100, 150, 80 → 780 học sinh. 140 lốc × 6 = 840 hộp. 840 > 780 nên đủ, còn thừa 840 − 780 = 60 hộp.'},
    {t:'Lưu ý', b:'Số vật lớn hơn hoặc bằng số người thì đủ; bé hơn thì thiếu. Phần chênh lệch là số thừa (thiếu).', warn:'Đừng so sánh số lốc với số học sinh: một lốc có nhiều hộp. Phải đổi ra cùng loại (số hộp) rồi mới so sánh.'}
  ]});

/* ---------- Dạng 9: toán nhiều bước – nhiều hơn, ít hơn, bằng tổng ---------- */
const GKITEM = [['bông hoa', 'gấp'], ['ngôi sao', 'gấp'], ['con hạc giấy', 'gấp'], ['chiếc thuyền giấy', 'gấp'], ['chiếc đèn lồng', 'làm']];
const gkMulti = kind => lv => {
  const [item, verb] = pick(GKITEM), [X, Y, Z, W] = shuffle(NAMES).slice(0, 4);
  const big = lv > 1, a = big ? R(10, 40) : R(5, 9);
  let b = big ? R(5, 20) : R(3, 9);
  if (kind === 'it') b = R(2, Math.min(b, a - 2));   // ít hơn: số bé vẫn dương
  const sy = (nm, label, v, e) => ({tag:'Giải', ask:`${nm} ${verb} được số ${item} là:`, tpl:`${lv === 1 ? e + ' = ' : ''}[_] (${item})`, ans:[v], hint:label});
  const mkSteps = (list, fin, und) => lv === 1 ? [und, ...list, fin] : [...list, fin];
  const finOf = (ask, v, e) => ({tag:'Đáp số', ask, tpl:`${lv === 1 ? e + ' = ' : ''}[_] (${item})`, ans:[v], wide:true, hint:'Cộng số ' + item + ' của các bạn lại.'});
  const verb2 = verb;
  if (kind === 'nhieu' || kind === 'it') {
    const less = kind === 'it', y = less ? a - b : a + b, z = a + y, tot = a + y + z;
    const yBase = `${Y} ${verb2} được ${less ? 'ít' : 'nhiều'} hơn ${X}`;
    const und = {tag:'Hiểu đề', ask:`“${yBase} ${b} ${item}” nghĩa là:`, opts:less ? [`${Y} = ${X} − ${b}`, `${Y} = ${X} + ${b}`, `${Y} = ${b} − ${X}`, `${Y} = ${X} × ${b}`] : [`${Y} = ${X} + ${b}`, `${Y} = ${X} − ${b}`, `${Y} = ${b} − ${X}`, `${Y} = ${X} × ${b}`], ans:less ? `${Y} = ${X} − ${b}` : `${Y} = ${X} + ${b}`, hint:'“Nhiều hơn” là cộng thêm, “ít hơn” là bớt đi.'};
    const fig = lv < 3 ? segSVG([{label:X, parts:[{v:1}], right:String(a)}, {label:Y, parts:less ? [{v:.7}, {v:.3, cut:true, t:`− ${b}`}] : [{v:1}, {v:.4, on:true, t:`+ ${b}`}], right:'?'}, {label:Z, parts:[{v:1, t:X}, {v:less ? .7 : 1.4, t:Y}], right:'?'}], {labelW:66}) : undefined;
    return QS({direct:lv === 3, text:`${X} ${verb} được <b>${a}</b> ${item}. ${yBase} <b>${b}</b> ${item}. ${Z} ${verb} được số ${item} bằng <b>tổng</b> của ${X} và ${Y}. Hỏi cả ba bạn ${verb} được bao nhiêu ${item}?`, fig,
      hint:`Tìm số ${item} của ${Y}, rồi của ${Z}, cuối cùng cộng số của cả ba bạn.`,
      sol:BG(`${Y} ${verb2} được: ${a} ${less ? '−' : '+'} ${b} = ${y} (${item})`, `${Z} ${verb2} được: ${a} + ${y} = ${z} (${item})`, `Cả ba bạn: ${a} + ${y} + ${z} = ${tot} (${item})`, `Đáp số: <b>${tot} ${item}</b>.`),
      steps:mkSteps([sy(Y, `${less ? 'Ít hơn' : 'Nhiều hơn'}: lấy số của ${X} ${less ? 'trừ' : 'cộng'} ${b}.`, y, `${a} ${less ? '−' : '+'} ${b}`), sy(Z, `${Z} bằng tổng của ${X} và ${Y}.`, z, `${a} + ${y}`)], finOf(`Cả ba bạn ${verb} được số ${item} là:`, tot, `${a} + ${y} + ${z}`), und)});
  }
  if (kind === 'hon') {   // Z hơn tổng c
    const c = R(2, 9), y = a + b, z = a + y + c, tot = a + y + z;
    const und = {tag:'Hiểu đề', ask:`“${Z} ${verb2} được nhiều hơn tổng của ${X} và ${Y} ${c} ${item}” nghĩa là:`, opts:[`${Z} = ${X} + ${Y} + ${c}`, `${Z} = ${X} + ${Y}`, `${Z} = ${X} + ${Y} − ${c}`, `${Z} = ${X} + ${c}`], ans:`${Z} = ${X} + ${Y} + ${c}`, hint:'Tìm tổng của hai bạn trước rồi cộng thêm phần nhiều hơn.'};
    return QS({direct:lv === 3, text:`${X} ${verb} được <b>${a}</b> ${item}. ${Y} ${verb} được nhiều hơn ${X} <b>${b}</b> ${item}. ${Z} ${verb} được nhiều hơn tổng số ${item} của ${X} và ${Y} <b>${c}</b> ${item}. Hỏi cả ba bạn ${verb} được bao nhiêu ${item}?`,
      hint:`Tìm số ${item} của ${Y}; tìm tổng của ${X} và ${Y}; cộng thêm ${c} để được số của ${Z}.`,
      sol:BG(`${Y} ${verb2} được: ${a} + ${b} = ${y} (${item})`, `${Z} ${verb2} được: ${a} + ${y} + ${c} = ${z} (${item})`, `Cả ba bạn: ${a} + ${y} + ${z} = ${tot} (${item})`, `Đáp số: <b>${tot} ${item}</b>.`),
      steps:mkSteps([sy(Y, `Nhiều hơn: lấy số của ${X} cộng ${b}.`, y, `${a} + ${b}`), sy(Z, `Lấy tổng của ${X} và ${Y} rồi cộng thêm ${c}.`, z, `${a} + ${y} + ${c}`)], finOf(`Cả ba bạn ${verb} được số ${item} là:`, tot, `${a} + ${y} + ${z}`), und)});
  }
  if (kind === 'chenh') {   // hỏi Z hơn Y/X
    const y = a + b, z = a + y, askY = Math.random() < .5, ans = askY ? a : y;
    const und = {tag:'Hiểu đề', ask:`Bài toán hỏi gì?`, opts:[`${Z} ${verb2} được nhiều hơn ${askY ? Y : X} bao nhiêu ${item}`, `Cả ba bạn ${verb2} được bao nhiêu ${item}`, `${Y} ${verb2} được bao nhiêu ${item}`, `${X} ${verb2} được bao nhiêu ${item}`], ans:`${Z} ${verb2} được nhiều hơn ${askY ? Y : X} bao nhiêu ${item}`, hint:'Đọc câu hỏi ở cuối đề.'};
    return QS({direct:lv === 3, text:`${X} ${verb} được <b>${a}</b> ${item}. ${Y} ${verb} được nhiều hơn ${X} <b>${b}</b> ${item}. ${Z} ${verb} được số ${item} bằng tổng của ${X} và ${Y}. Hỏi ${Z} ${verb} được nhiều hơn ${askY ? Y : X} bao nhiêu ${item}?`,
      hint:`Tìm số ${item} của ${Y} và của ${Z}, rồi lấy số lớn trừ số bé. Có thể nhận ra cách nhanh hơn không?`,
      sol:BG(`${Y} ${verb2} được: ${a} + ${b} = ${y} (${item})`, `${Z} ${verb2} được: ${a} + ${y} = ${z} (${item})`, `${Z} nhiều hơn ${askY ? Y : X}: ${z} − ${askY ? y : a} = ${ans} (${item})`, `Đáp số: <b>${ans} ${item}</b>.`),
      steps:mkSteps([sy(Y, `Nhiều hơn: lấy số của ${X} cộng ${b}.`, y, `${a} + ${b}`), sy(Z, `${Z} bằng tổng của ${X} và ${Y}.`, z, `${a} + ${y}`)], {tag:'Đáp số', ask:`${Z} ${verb2} được nhiều hơn ${askY ? Y : X} số ${item} là:`, tpl:`${lv === 1 ? `${z} − ${askY ? y : a} = ` : ''}[_] (${item})`, ans:[ans], hint:'Lấy số của bạn nhiều hơn trừ số của bạn kia.'}, und)});
  }
  // 'van-dung': bốn bạn, hoặc tìm ngược số ban đầu
  if (lv < 3 || Math.random() < .5) {
    const c = R(2, Math.min(a + b - 1, 9)), y = a + b, z = y - c, w = a + z, tot = a + y + z + w;
    return QS({direct:lv === 3, text:`${X} ${verb} được <b>${a}</b> ${item}. ${Y} ${verb} được nhiều hơn ${X} <b>${b}</b> ${item}. ${Z} ${verb} được ít hơn ${Y} <b>${c}</b> ${item}. ${W} ${verb} được số ${item} bằng tổng của ${X} và ${Z}. Hỏi cả bốn bạn ${verb} được bao nhiêu ${item}?`,
      hint:`Lần lượt tìm số ${item} của ${Y}, ${Z}, ${W} theo thứ tự đề bài cho, rồi cộng số của cả bốn bạn.`,
      sol:BG(`${Y}: ${a} + ${b} = ${y} (${item})`, `${Z}: ${y} − ${c} = ${z} (${item})`, `${W}: ${a} + ${z} = ${w} (${item})`, `Cả bốn bạn: ${a} + ${y} + ${z} + ${w} = ${tot} (${item})`, `Đáp số: <b>${tot} ${item}</b>.`),
      steps:[sy(Y, `Nhiều hơn: cộng.`, y, `${a} + ${b}`), sy(Z, `Ít hơn: trừ.`, z, `${y} − ${c}`), sy(W, `${W} bằng tổng của ${X} và ${Z}.`, w, `${a} + ${z}`), finOf(`Cả bốn bạn ${verb} được số ${item} là:`, tot, `${a} + ${y} + ${z} + ${w}`)]});
  }
  const a2 = R(8, 30), b2 = 2 * R(2, 8), y = a2 + b2, z = a2 + y, tot = a2 + y + z;
  return QS({direct:true, text:`Cả ba bạn ${X}, ${Y}, ${Z} ${verb} được tất cả <b>${tot}</b> ${item}. ${Y} ${verb} được nhiều hơn ${X} <b>${b2}</b> ${item}. ${Z} ${verb} được số ${item} bằng tổng của ${X} và ${Y}. Hỏi ${X} ${verb} được bao nhiêu ${item}?`,
    hint:`${Z} bằng ${X} cộng ${Y}, nên ${Z} bằng cả hai bạn ${X} và ${Y} cộng lại. Hãy so sánh số của ${Z} với số của cả ba bạn.`,
    sol:BG(`${Z} bằng tổng của ${X} và ${Y} nên cả ba bạn gấp đôi ${Z}: ${Z} có ${tot} : 2 = ${tot / 2} (${item})`, `${X} cộng ${Y} là ${tot / 2}; ${Y} hơn ${X} ${b2}: ${X} có (${tot / 2} − ${b2}) : 2 = ${a2} (${item})`, `Đáp số: <b>${a2} ${item}</b>.`),
    steps:[sy(Z, `Cả ba bạn = ${X} + ${Y} + ${Z}, mà ${Z} = ${X} + ${Y}, nên cả ba bạn gấp đôi ${Z}.`, tot / 2, `${tot} : 2`), {tag:'Đáp số', ask:`${X} ${verb} được số ${item} là:`, tpl:`[_] (${item})`, ans:[a2], hint:`${X} + ${Y} = ${tot / 2} và ${Y} hơn ${X} ${b2}: dùng cách tìm hai số khi biết tổng và hiệu.`}]});
};
lesson(7, 'gk-nhieu-buoc', 'Dạng 9 · Toán nhiều bước: nhiều hơn, ít hơn, bằng tổng', 'Nhóm V – Toán lời văn: bài toán ba, bốn bước với “nhiều hơn”, “ít hơn”, “bằng tổng”.', [gkMulti('nhieu'), gkMulti('it'), gkMulti('hon'), gkMulti('chenh'), gkMulti('vd')], {
  intro:[
    {t:'Đọc đề và vẽ sơ đồ', b:'Gạch dưới số liệu và những từ khóa: <b>nhiều hơn</b> (cộng), <b>ít hơn</b> (trừ), <b>bằng tổng</b> (cộng các số đã biết). Vẽ sơ đồ đoạn thẳng cho từng bạn.', ex:'Mai gấp 8 bông; Lan nhiều hơn Mai 5 bông: 8 + 5 = 13; Thảo bằng tổng Mai và Lan: 8 + 13 = 21; cả ba: 8 + 13 + 21 = <b>42</b> bông.'},
    {t:'Giải từng bước', b:'Tìm lần lượt từng số theo thứ tự đề bài cho, viết phép tính và <b>đơn vị</b> cho mỗi bước, cuối cùng viết đáp số.', warn:'Đọc kỹ câu hỏi: hỏi “cả ba bạn” thì phải cộng cả số của bạn đầu tiên, không chỉ cộng hai bạn sau.'}
  ]});

})();
