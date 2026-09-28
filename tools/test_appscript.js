// Kiểm thử Code.gs với Google Sheet GIẢ LẬP. Chạy: node tools/test_appscript.js
const fs=require('fs');
function Sheet(name){this.name=name;this.rows=[];this.bg={};}
Sheet.prototype={appendRow(r){this.rows.push(r.slice())},setFrozenRows(){},clear(){this.rows=[];this.bg={}},autoResizeColumns(){},getLastRow(){return this.rows.length},
 getRange(r,c,nr,nc){const s=this;nr=nr||1;nc=nc||1;const R={
  setFontWeight(){return R},setFontSize(){return R},setBackground(col){s.bg[r]=col;return R},getValue(){return (s.rows[r-1]||[])[c-1]??''},setValue(v){(s.rows[r-1]=s.rows[r-1]||[])[c-1]=v;return R},
  setValues(vs){vs.forEach((row,i)=>row.forEach((v,j)=>{(s.rows[r-1+i]=s.rows[r-1+i]||[])[c-1+j]=v}));return R}};return R},
 getDataRange(){const s=this;return{getValues:()=>s.rows.map(r=>r.slice()),getDisplayValues:()=>s.rows.map(r=>r.map(v=>String(v??'')))}}};
const sheets={};const ss={getSheetByName:n=>sheets[n],insertSheet:n=>(sheets[n]=new Sheet(n))};
const triggers=[];
global.SpreadsheetApp={getActiveSpreadsheet:()=>ss,getUi:()=>({createMenu:()=>({addItem(){return this},addToUi(){}})})};
global.ScriptApp={getProjectTriggers:()=>triggers,deleteTrigger(t){triggers.splice(triggers.indexOf(t),1)},newTrigger:f=>({timeBased:()=>({everyMinutes:()=>({create(){triggers.push({getHandlerFunction:()=>f})}})})})};
global.ContentService={createTextOutput:t=>({t,setMimeType(){return this}}),MimeType:{JSON:1}};
global.LockService={getScriptLock:()=>({waitLock(){},releaseLock(){}})};
let n=0;global.Utilities={getUuid:()=>'tok'+(++n),formatDate:(d,tz,f)=>f==='yyyy-MM-dd'?d.toISOString().slice(0,10):d.toISOString().slice(0,16).replace('T',' ')};
eval(fs.readFileSync(require('path').join(__dirname,'apps-script','Code.gs'),'utf8'));
setup(); setup();
console.log('Số trigger sau 2 lần setup:', triggers.length, '| Trang:', Object.keys(sheets).join(', '));
sheets.HocSinh.rows.push(['10A1','10a1_01','Nguyễn Văn An','0246'],['10A1','10a1_02','Trần Bình','1357'],['10A1','10a1_03','Lê Châu','1111'],['9A','9a_01','Võ Khánh','1111'],['10A1','10a1_04','Đỗ Dũng','2222'],['10A2','10a2_01','Phan Giang','3333'],['GV','gv','Thầy Lực','9999']);
const call=b=>JSON.parse(doPost({postData:{contents:JSON.stringify(b)}}).t);
const L=call({action:'login',lop:'10A1',user:'10a1_01',pass:'0246',device:'iPad'});
call({action:'save',token:L.token,key:'lop10:menh-de:1',stars:3,setStars:3,score:6,total:6,grade:'Lớp 10',lesson:'Bài 1',level:1,summary:'x'});
call({action:'save',token:L.token,key:'lop10:tap-hop:1',stars:1,setStars:1,score:3,total:6,grade:'Lớp 10',lesson:'Bài 2',level:1,summary:'x'});
call({action:'login',lop:'10A1',user:'10a1_02',pass:'1357',device:'iPhone'});             // đăng nhập, không làm
const K=call({action:'login',lop:'9A',user:'9a_01',pass:'1111'});
call({action:'save',token:K.token,key:'lop9:giai-he:2',stars:2,score:5,total:6});
sheets.KetQua.rows[sheets.KetQua.rows.length-1][0]=new Date(Date.now()-10*864e5);                // lần làm cách đây 10 ngày
sheets.DangNhap.rows[sheets.DangNhap.rows.length-1][0]=new Date(Date.now()-10*864e5);
const d0=new Date().toISOString().slice(0,10);
call({action:'play',token:L.token,play:JSON.stringify({streak:4,best:6,last:d0,badges:{a:1,b:1},xuTotal:120,wear:{hat:'mu-tiec'},pets:{lop10:2}})});
const L3=call({action:'login',lop:'10A1',user:'10a1_03',pass:'1111'});
call({action:'save',token:L3.token,key:'lop10:menh-de:2',stars:2,score:5,total:6,play:JSON.stringify({streak:9,last:'2020-01-01',badges:{},xuTotal:30})});
const RK=call({action:'rank',token:L.token});
console.log('Xếp hạng lớp', RK.lop, RK.rows.map(r=>`${r.name}${r.me?'(em)':''}: ${r.stars}⭐ 🔥${r.streak} 🏅${r.badges} 🪙${r.xu}`).join(' ; '));
const relog=call({action:'login',lop:'10A1',user:'10a1_01',pass:'0246'});
const okPlay = RK.ok && RK.rows.length===3 && RK.rows.find(r=>r.me).streak===4 && RK.rows.find(r=>r.name==='Lê Châu').streak===0 && JSON.parse(relog.play).xuTotal===120
  && call({action:'rank',token:'xx'}).code==='auth' && sheets.TienDo.rows[0][8]==='Góc thú cưng (máy dùng)';
console.log('Góc thú cưng + xếp hạng:', okPlay?'ĐẠT':'LỖI');
const G=call({action:'login',lop:'GV',user:'gv',pass:'9999'});
const RA=call({action:'rankAll',token:G.token,grade:10}), c1=RA.classes&&RA.classes.find(c=>c.lop==='10A1'), an=c1&&c1.rows.find(r=>r.name==='Nguyễn Văn An');
console.log('Giáo viên xem khối 10:', (RA.classes||[]).map(c=>c.lop+': '+c.rows.map(r=>`${r.name} ${r.stars}⭐ ${r.lessons} bài${r.joined?'':' (chưa đăng nhập)'}`).join(', ')).join(' | '));
const okAll = RA.ok && RA.classes.length===2 && c1.rows.length===4 && an.stars===4 && an.lessons===2 && an.streak===4 && an.pets.lop10===2
  && c1.rows.find(r=>r.name==='Đỗ Dũng').joined===false && c1.rows.find(r=>r.name==='Lê Châu').stars===2 && !RA.classes.some(c=>c.lop==='9A')
  && call({action:'rankAll',token:L.token,grade:10}).code==='teacher' && call({action:'rankAll',token:'xx',grade:10}).code==='auth';
console.log('Bảng xếp hạng cho giáo viên:', okAll?'ĐẠT':'LỖI');
capNhatTongHop();
const t=sheets.TongHop;
t.rows.forEach((r,i)=>console.log(String(i+1).padStart(2), (t.bg[i+1]||'').padEnd(8), r.filter(x=>x!=='').join(' | ')));
console.log('DangNhap:', sheets.DangNhap.rows.slice(1).map(r=>r.slice(1).join('/')).join(' ; '));
const ok = okPlay && okAll && triggers.length===1 && sheets.DangNhap.rows.length===7 && ['#e2f4e8','#f8d7da','#fff3cd'].every(c=>Object.values(t.bg).includes(c))
  && !call({action:'login',lop:'10A1',user:'10a1_01',pass:'sai'}).ok && call({action:'save',token:'xx',key:'a',stars:1}).code==='auth';
console.log('KẾT QUẢ:', ok ? 'ĐẠT ✓' : 'CHƯA ĐẠT ✗'); process.exit(ok?0:1);
