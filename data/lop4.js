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
})();
