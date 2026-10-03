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

G.topics.splice(G.topics.findIndex(t => t.id === 5) + 1, 0, {id:51, hk:1, name:'Phép cộng và phép trừ', label:'🧠 Toán tư duy'});

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
G.topics.splice(G.topics.findIndex(t => t.id === 8) + 1, 0, {id:81, hk:2, name:'Phép nhân và phép chia', label:'🧠 Toán tư duy'});

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
G.topics.splice(G.topics.findIndex(t => t.id === 81) + 1, 0, {id:82, hk:2, name:'Lý thuyết số và bài toán đồng dư', label:'🧠 Toán tư duy'});

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
G.topics.splice(G.topics.findIndex(t => t.id === 82) + 1, 0, {id:83, hk:2, name:'Tư duy ba tầng trong toán trung bình cộng', label:'🧠 Toán tư duy'});

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

})();
