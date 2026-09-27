/* =====================================================================
   DỮ LIỆU LỚP 10 – Toán, Kết nối tri thức
   Chương I. Mệnh đề và tập hợp (Bài 1 Mệnh đề · Bài 2 Tập hợp và các phép toán trên tập hợp)
   Mỗi dạng bài: lv => câu hỏi. Chọn đáp án trước rồi mới dựng đề.
   ===================================================================== */
(() => {
const G = App.addGrade({
  id: 'lop10', name: 'Lớp 10', subject: 'Toán', book: 'Kết nối tri thức',
  topics: [ {id:1, hk:1, name:'Mệnh đề và tập hợp'} ],
});
const lesson = G.lesson;

/* ---------- Tiện ích ---------- */
const M = '−';
const neg = n => n < 0 ? M + (-n) : String(n);
const V = s => `<i>${s}</i>`, X = V('x'), N_ = V('n');
const RR='ℝ', NN='ℕ', ZZ='ℤ', QQ='ℚ';
const sR = (a,b) => pick([-1,1])*R(a,b);
const isPrime = n => { if(n<2) return false; for(let i=2;i*i<=n;i++) if(n%i===0) return false; return true; };
const isSq = n => n>=0 && Number.isInteger(Math.sqrt(n));
const TF = ['Đúng','Sai'];
const tfQ = (text, truth, hint, why) => QC({text, opts:TF, ans:truth?'Đúng':'Sai', keepOrder:true, hint,
  sol:`${why} Vậy mệnh đề <b>${truth?'đúng':'sai'}</b>.`});
const setStr = a => a.length ? `{${a.join('; ')}}` : '∅';
const range = (a,b) => { const r=[]; for(let i=a;i<=b;i++) r.push(i); return r; };
const divisors = n => range(1,n).filter(d=>n%d===0);
const NOT = {'>':'≤','<':'≥','≥':'<','≤':'>','=':'≠','≠':'='};

/* =====================================================================
   BÀI 1. MỆNH ĐỀ
   ===================================================================== */
// Mệnh đề (câu khẳng định có tính đúng sai xác định)
const propPool = () => { const n=R(2,60), a=R(2,30), b=R(2,9), c=R(2,40);
  return shuffle([`${n} là số nguyên tố`, `${a} + ${b} = ${a+b+pick([0,0,1])}`, `${a*b+pick([0,1])} chia hết cho ${b}`,
    'Hình vuông có bốn cạnh bằng nhau', 'Hà Nội là thủ đô của Việt Nam', `√${c} là số vô tỉ`, `${a} là số chẵn`,
    'Tổng ba góc của một tam giác bằng 180°', `π < 3,14`]); };
const nonPool = (withVar) => { const a=R(1,9), b=R(2,15);
  const base=['Hôm nay trời đẹp quá!','Bạn học lớp mấy?','Hãy làm bài tập này đi!','Bộ phim này hay quá!','Mấy giờ rồi?','Toán học thật thú vị làm sao!'];
  const vars=[`${X} + ${a} = ${b}`, `${X}² > ${b}`, `${N_} là số nguyên tố`, `2${X} − ${a} ≤ 0`];
  return shuffle(withVar?[...base.slice(0,3),...vars]:base); };
const g1a = lv => {
  if(lv<3){ const p=propPool()[0], W=nonPool(lv===2).slice(0,3);
    return QC({text:'Câu nào sau đây là <b>mệnh đề</b>?', opts:[p,...W], ans:p,
      hint:'Mệnh đề là một câu khẳng định có tính đúng hoặc sai xác định. Câu hỏi, câu cảm thán, câu mệnh lệnh không phải mệnh đề; câu chứa biến chưa xác định đúng sai.',
      sol:`“${p}” là câu khẳng định và ta xác định được nó đúng hay sai, nên đó là <b>mệnh đề</b>. Các câu còn lại là câu hỏi, câu cảm thán, câu mệnh lệnh hoặc câu chứa biến.`}); }
  const k=R(1,4), P=propPool().slice(0,k), Nn=nonPool(true).slice(0,5-k), all=shuffle([...P,...Nn]);
  return QB({text:`Trong các câu sau, có bao nhiêu câu là mệnh đề?<br>${all.map((s,i)=>`(${i+1}) ${s}${/[!?]$/.test(s)?'':'.'}`).join('<br>')}`,
    tpl:'[_] mệnh đề', ans:[k],
    hint:'Câu chứa biến (như x + 1 = 3 hay “n là số nguyên tố”) là mệnh đề chứa biến, chưa phải mệnh đề. Câu hỏi, cảm thán, mệnh lệnh cũng không phải mệnh đề.',
    sol:`Các mệnh đề: ${P.map(s=>'“'+s+'”').join('; ')}. Có <b>${k}</b> mệnh đề.`});
};
// Đúng/sai của một mệnh đề
const basicProp = () => pick([
  ()=>{const n=R(2,99),p=isPrime(n),d=divisors(n).find(x=>x>1&&x<n);return [`${n} là số nguyên tố`,p,p?`${n} chỉ có hai ước là 1 và ${n}.`:`${n} = ${d} · ${n/d}.`]},
  ()=>{const b=R(3,12),a=R(20,150),t=a%b===0;return [`${a} chia hết cho ${b}`,t,t?`${a} = ${b} · ${a/b}.`:`${a} = ${b} · ${Math.floor(a/b)} + ${a%b}.`]},
  ()=>{const k=R(2,50),t=isSq(k);return [`√${k} là số hữu tỉ`,t,t?`√${k} = ${Math.sqrt(k)}.`:`${k} không phải số chính phương nên √${k} là số vô tỉ.`]},
  ()=>{const a=R(-9,9),b=R(0,80),op=pick(['>','<','≥']),v=a*a,t=op==='>'?v>b:op==='<'?v<b:v>=b;return [`(${neg(a)})² ${op} ${b}`,t,`(${neg(a)})² = ${v}.`]},
  ()=>pick([['π > 3,14',true,'π ≈ 3,1416.'],['√2 < 1,41',false,'√2 ≈ 1,414 > 1,41.'],['√3 > 1,7',true,'√3 ≈ 1,732.'],['1/3 = 0,33',false,'1/3 = 0,333… ≠ 0,33.']]),
])();
const g1b = lv => {
  if(lv<3){ const [s,t,why]=basicProp();
    return tfQ(`Mệnh đề sau đúng hay sai? <span class="mx">“${s}”</span>`, t, 'Kiểm tra trực tiếp bằng tính toán hoặc định nghĩa.', why); }
  const [p,tp,wp]=basicProp(), [q,tq,wq]=basicProp(), kind=pick(['và','hoặc','kéo theo']);
  const t=kind==='và'?tp&&tq:kind==='hoặc'?tp||tq:(!tp||tq);
  const s=kind==='kéo theo'?`Nếu ${p} thì ${q}`:`${p} ${kind} ${q}`;
  return tfQ(`Mệnh đề sau đúng hay sai? <span class="mx" style="white-space:normal">“${s}”</span>`, t,
    kind==='và'?'“P và Q” chỉ đúng khi cả P và Q cùng đúng.':kind==='hoặc'?'“P hoặc Q” chỉ sai khi cả P và Q cùng sai.':'“P ⇒ Q” chỉ sai khi P đúng và Q sai.',
    `P: “${p}” ${tp?'đúng':'sai'} (${wp}) Q: “${q}” ${tq?'đúng':'sai'} (${wq})`);
};
// Mệnh đề phủ định
const exprPool = () => { const a=R(1,9), b=R(1,9); return pick([`${X}² + ${a}`, `${X}² − ${a}${X} + ${b}`, `2${X} − ${a}`, `${X}² − ${b}`, `${X}³ + ${a}${X}`]); };
const g1c = lv => {
  if(lv===1){ const a=R(2,40), b=R(2,40), op=pick(['>','<','=']), P=`${a} ${op} ${b}`, good=`${a} ${NOT[op]} ${b}`;
    const ops=['>','<','≥','≤','=','≠'].filter(o=>o!==op&&o!==NOT[op]);
    return QC({text:`Mệnh đề phủ định của mệnh đề <span class="mx">P: “${P}”</span> là`, opts:[good,...shuffle(ops).slice(0,3).map(o=>`${a} ${o} ${b}`)], ans:good,
      hint:'Phủ định của “>” là “≤”, của “<” là “≥”, của “=” là “≠”.', sol:`P̅: “<b>${good}</b>”.`}); }
  if(lv===2||Math.random()<.5){ const e=exprPool(), op=pick(['>','<','≥','≤','=','≠']), all=Math.random()<.5, set=pick([RR,ZZ,QQ]);
    const Q1=all?'∀':'∃', Q2=all?'∃':'∀', mk=(q,o)=>`${q}${X} ∈ ${set}, ${e} ${o} 0`;
    const good=mk(Q2,NOT[op]); const cand=[mk(Q2,op),mk(Q1,NOT[op]),mk(Q1,op)];
    const alt=['>','<','≥','≤'].filter(o=>o!==op&&o!==NOT[op]); if(alt.length) cand.push(mk(Q2,alt[0]));
    return QC({text:`Mệnh đề phủ định của mệnh đề <span class="mx">P: “${mk(Q1,op)}”</span> là`, opts:[good,...shuffle(cand).slice(0,3)], ans:good,
      hint:'Phủ định của “∀x, P(x)” là “∃x, P̅(x)”; phủ định của “∃x, P(x)” là “∀x, P̅(x)”. Đổi lượng từ <b>và</b> phủ định luôn phần sau.',
      sol:`Đổi ${Q1} thành ${Q2} và “${op}” thành “${NOT[op]}”: P̅: “<b>${good}</b>”.`}); }
  const w=pick([
    ['Mọi học sinh lớp 10A đều thích môn Toán','Có ít nhất một học sinh lớp 10A không thích môn Toán',['Mọi học sinh lớp 10A đều không thích môn Toán','Có một học sinh lớp 10A thích môn Toán','Không có học sinh lớp 10A nào thích môn Toán']],
    ['Có một số tự nhiên chia hết cho mọi số tự nhiên','Mọi số tự nhiên đều không chia hết cho mọi số tự nhiên',null],
    ['Tất cả các bạn trong nhóm đều biết bơi','Có ít nhất một bạn trong nhóm không biết bơi',['Tất cả các bạn trong nhóm đều không biết bơi','Có một bạn trong nhóm biết bơi','Không bạn nào trong nhóm biết bơi']],
    ['Có ít nhất một bạn trong lớp đạt điểm 10','Mọi bạn trong lớp đều không đạt điểm 10',['Có ít nhất một bạn trong lớp không đạt điểm 10','Mọi bạn trong lớp đều đạt điểm 10','Có một bạn trong lớp đạt điểm 9']],
  ].filter(x=>x[2]));
  const a=R(1,9), b=R(2,7);
  const num=[`∃${N_} ∈ ${NN}, ${N_}² + ${a} chia hết cho ${b}`,`∀${N_} ∈ ${NN}, ${N_}² + ${a} không chia hết cho ${b}`,[`∃${N_} ∈ ${NN}, ${N_}² + ${a} không chia hết cho ${b}`,`∀${N_} ∈ ${NN}, ${N_}² + ${a} chia hết cho ${b}`,`∃${N_} ∉ ${NN}, ${N_}² + ${a} chia hết cho ${b}`]];
  const [P,good,W]=Math.random()<.5?w:num;
  return QC({text:`Mệnh đề phủ định của mệnh đề <span class="mx" style="white-space:normal">“${P}”</span> là`, opts:[good,...W], ans:good,
    hint:'“Mọi… đều…” phủ định thành “Có ít nhất một… không…”; “Có…” phủ định thành “Mọi… đều không…”.', sol:`Phủ định: “<b>${good}</b>”.`});
};
// Mệnh đề đảo, kéo theo, điều kiện cần/đủ
const PAIRS = [
  ['tam giác ABC đều','tam giác ABC cân',true,false],
  ['tứ giác ABCD là hình vuông','tứ giác ABCD là hình chữ nhật',true,false],
  ['số tự nhiên n chia hết cho 6','n chia hết cho 3',true,false],
  ['a và b đều chia hết cho 3','a + b chia hết cho 3',true,false],
  ['x = 2','x² = 4',true,false],
  ['tứ giác ABCD là hình thoi','tứ giác ABCD có hai đường chéo vuông góc',true,false],
  ['tam giác ABC vuông tại A','AB² + AC² = BC²',true,true],
  ['số tự nhiên n chia hết cho cả 2 và 3','n chia hết cho 6',true,true],
  ['tứ giác ABCD là hình bình hành','hai đường chéo của ABCD cắt nhau tại trung điểm mỗi đường',true,true],
  ['tam giác ABC có hai góc bằng 60°','tam giác ABC đều',true,true],
];
const g1d = lv => {
  if(lv===1){ const [p,q]=pick(PAIRS), S=(a,b)=>`Nếu ${a} thì ${b}`, good=S(q,p);
    return QC({text:`Mệnh đề đảo của mệnh đề <span class="mx" style="white-space:normal">“Nếu ${p} thì ${q}”</span> là`,
      opts:[good,S(p,q),`Nếu “${p}” sai thì “${q}” sai`,`Nếu “${q}” sai thì “${p}” sai`], ans:good,
      hint:'Mệnh đề đảo của P ⇒ Q là Q ⇒ P (đổi chỗ giả thiết và kết luận).', sol:`Đổi chỗ P và Q: “<b>${good}</b>”.`}); }
  const asym=PAIRS.filter(x=>!x[3]);
  if(lv===2){ const ps=shuffle(asym).slice(0,4), good=`Nếu ${ps[0][0]} thì ${ps[0][1]}`;
    return QC({text:'Mệnh đề nào sau đây <b>đúng</b>?', opts:[good,...ps.slice(1).map(x=>`Nếu ${x[1]} thì ${x[0]}`)], ans:good,
      hint:'Mệnh đề “Nếu P thì Q” chỉ sai khi có trường hợp P đúng mà Q sai. Hãy thử tìm phản ví dụ.',
      sol:`“<b>${good}</b>” đúng. Ba mệnh đề còn lại sai vì có phản ví dụ (chẳng hạn tam giác cân chưa chắc đều, hình chữ nhật chưa chắc là hình vuông…).`}); }
  const pr=pick(PAIRS), rev=!pr[3]&&Math.random()<.5;
  const [A,B]=rev?[pr[1],pr[0]]:[pr[0],pr[1]];
  const ans=pr[3]?'cần và đủ':rev?'cần':'đủ';
  return QC({text:`Điền vào chỗ trống: “${A}” là điều kiện <b>…</b> để “${B}”.`, opts:['đủ','cần','cần và đủ'], ans, keepOrder:true,
    hint:'Nếu P ⇒ Q đúng thì P là điều kiện đủ để có Q, Q là điều kiện cần để có P. Nếu cả P ⇒ Q và Q ⇒ P đều đúng thì P là điều kiện cần và đủ để có Q.',
    sol:pr[3]?`Hai mệnh đề tương đương (P ⇔ Q) nên là điều kiện <b>cần và đủ</b>.`:rev?`Ta có “${B}” ⇒ “${A}” đúng, còn chiều ngược lại sai. Vậy “${A}” là điều kiện <b>cần</b>.`:`Ta có “${A}” ⇒ “${B}” đúng, còn chiều ngược lại sai. Vậy “${A}” là điều kiện <b>đủ</b>.`});
};
// Mệnh đề chứa ∀, ∃
const quantProp = lv => { const a=R(1,9), k=R(2,30), b=R(2,6), c=R(1,20);
  const easy=[
    [`∀${X} ∈ ${RR}, ${X}² ≥ 0`,true,'Bình phương mọi số thực đều không âm.'],
    [`∀${X} ∈ ${RR}, ${X}² > 0`,false,'Với x = 0 thì x² = 0, không lớn hơn 0.'],
    [`∃${X} ∈ ${RR}, ${X}² + ${a} = 0`,false,`x² + ${a} ≥ ${a} > 0 với mọi x.`],
    [`∃${X} ∈ ${RR}, ${X}² − ${a*a} = 0`,true,`x = ${a} thoả mãn.`],
    [`∃${N_} ∈ ${ZZ}, ${b}${N_} = ${c}`,c%b===0,c%b===0?`n = ${c/b} thoả mãn.`:`${c} không chia hết cho ${b}.`],
  ];
  const hard=[
    [`∃${X} ∈ ${QQ}, ${X}² = ${k}`,isSq(k),isSq(k)?`x = ${Math.sqrt(k)} thoả mãn.`:`${k} không phải số chính phương nên √${k} là số vô tỉ.`],
    [`∀${N_} ∈ ${NN}, ${N_}² + ${N_} chia hết cho 2`,true,'n² + n = n(n + 1) là tích hai số tự nhiên liên tiếp nên chia hết cho 2.'],
    [`∀${X} ∈ ${RR}, ${X}² − ${2*a}${X} + ${a*a} > 0`,false,`x² − ${2*a}x + ${a*a} = (x − ${a})², bằng 0 khi x = ${a}.`],
    [`∀${X} ∈ ${RR}, ${X}² − ${2*a}${X} + ${a*a} ≥ 0`,true,`x² − ${2*a}x + ${a*a} = (x − ${a})² ≥ 0.`],
    [`∃${X} ∈ ${RR}, ${X} > ${X}²`,true,'x = 1/2 thoả mãn vì 1/2 > 1/4.'],
    [`∀${X} ∈ ${RR}, ${X}² ≥ ${X}`,false,'x = 1/2 thì x² = 1/4 < 1/2.'],
    [`∃${N_} ∈ ${NN}, ${N_}² + ${N_} + 1 chia hết cho 2`,false,'n² + n luôn chẵn nên n² + n + 1 luôn lẻ.'],
    [`∀${N_} ∈ ${NN}, ${N_}² ≥ ${N_}`,true,'Với n = 0 hoặc n = 1 dấu bằng xảy ra; n ≥ 2 thì n² > n.'],
  ];
  return pick(lv===1?easy:lv===2?[...easy,...hard.slice(0,3)]:hard); };
const g1e = lv => { const [s,t,why]=quantProp(lv);
  return tfQ(`Mệnh đề sau đúng hay sai? <span class="mx">${s}</span>`, t,
    '“∀x, P(x)” đúng khi P(x) đúng với <b>mọi</b> x (chỉ cần một phản ví dụ là sai). “∃x, P(x)” đúng khi tìm được <b>ít nhất một</b> x thoả mãn.', why); };

/* =====================================================================
   BÀI 2. TẬP HỢP VÀ CÁC PHÉP TOÁN TRÊN TẬP HỢP
   ===================================================================== */
const g2a = lv => {   // phần tử, số phần tử
  if(lv===1){ if(Math.random()<.5){ const n=R(3,6), incl0=Math.random()<.5, strict=Math.random()<.5;
      const el=range(incl0?0:1, strict?n-1:n), set=incl0?NN:NN+'*';
      const W=[range(incl0?1:0,strict?n-1:n),range(incl0?0:1,strict?n:n+1),range(incl0?1:0,strict?n:n+1)].map(setStr);
      return QC({text:`Liệt kê các phần tử của tập hợp <span class="mx">A = {${X} ∈ ${set} | ${X} ${strict?'<':'≤'} ${n}}</span>`, opts:[setStr(el),...W], ans:setStr(el),
        hint:`${NN} = {0; 1; 2; …}, còn ${NN}* không có số 0. Chú ý dấu “${strict?'<':'≤'}”.`, sol:`A = <b>${setStr(el)}</b>.`}); }
    const a=R(-5,3), b=a+R(3,7), lc=pick(['<','≤']), rc=pick(['<','≤']);
    const el=range(a,b).filter(x=>(lc==='<'?x>a:x>=a)&&(rc==='<'?x<b:x<=b));
    return QB({text:`Tập hợp <span class="mx">A = {${X} ∈ ${ZZ} | ${neg(a)} ${lc} ${X} ${rc} ${neg(b)}}</span> có bao nhiêu phần tử?`, tpl:'[_] phần tử', ans:[el.length],
      hint:'Liệt kê các số nguyên nằm giữa hai số đã cho, chú ý dấu < (không lấy đầu mút) và ≤ (lấy đầu mút).', sol:`A = ${setStr(el)}, có <b>${el.length}</b> phần tử.`}); }
  if(lv===2){ if(Math.random()<.5){ const n=pick([12,18,20,24,28,30,36,40,45,48]), d=divisors(n);
      return QB({text:`Tập hợp A các ước tự nhiên của ${n} có bao nhiêu phần tử?`, tpl:'[_] phần tử', ans:[d.length],
        hint:'Liệt kê các ước theo cặp: nếu d là ước thì n : d cũng là ước.', sol:`A = ${setStr(d)}, có <b>${d.length}</b> phần tử.`}); }
    const d=R(3,9), Nn=R(25,70), el=range(0,Nn-1).filter(x=>x%d===0);
    return QB({text:`Tập hợp <span class="mx">A = {${X} ∈ ${NN} | ${X} chia hết cho ${d} và ${X} < ${Nn}}</span> có bao nhiêu phần tử?`, tpl:'[_] phần tử', ans:[el.length],
      hint:`Các phần tử là 0, ${d}, ${2*d}, … (nhớ 0 chia hết cho mọi số khác 0).`, sol:`A = {0; ${d}; …; ${el[el.length-1]}}, có <b>${el.length}</b> phần tử.`}); }
  const t=pick(['sq','root']);
  if(t==='sq'){ const m=R(3,30), el=range(-6,6).filter(x=>x*x<=m);
    return QB({text:`Tập hợp <span class="mx">A = {${X} ∈ ${ZZ} | ${X}² ≤ ${m}}</span> có bao nhiêu phần tử?`, tpl:'[_] phần tử', ans:[el.length],
      hint:'x² ≤ m khi −√m ≤ x ≤ √m. Đừng quên các số nguyên âm và số 0.', sol:`A = ${setStr(el.map(neg))}, có <b>${el.length}</b> phần tử.`}); }
  const a=R(-4,4), c=pick([1,4,9,16,2,3,5,a*a||1]), set=pick([RR,QQ,ZZ]);
  const roots=new Set([a]); const r=Math.sqrt(c); if(set===RR||Number.isInteger(r)){roots.add(r);roots.add(-r)}
  const cnt=roots.size, rl=[...roots].sort((u,v)=>u-v).map(v=>Number.isInteger(v)?neg(v):(v<0?M:'')+'√'+c);
  return QB({text:`Tập hợp <span class="mx">A = {${X} ∈ ${set} | (${X} ${a<0?'+':M} ${Math.abs(a)})(${X}² − ${c}) = 0}</span> có bao nhiêu phần tử?`, tpl:'[_] phần tử', ans:[cnt],
    hint:`Giải phương trình tích rồi chỉ giữ các nghiệm thuộc ${set}. Các nghiệm trùng nhau chỉ tính một lần.`,
    sol:`Nghiệm: x = ${neg(a)}, x = ±√${c}. Các phần tử thuộc ${set}: ${setStr(rl)}. A có <b>${cnt}</b> phần tử.`});
};
const g2b = lv => {   // tập con
  const L=['a','b','c','d','e','f'];
  if(lv===1){ if(Math.random()<.5){ const n=R(2,5), A=L.slice(0,n);
      return QB({text:`Tập hợp <span class="mx">A = ${setStr(A)}</span> có bao nhiêu tập hợp con?`, tpl:'[_] tập con', ans:[2**n],
        hint:'Tập có n phần tử thì có 2ⁿ tập con (kể cả ∅ và chính nó).', sol:`A có ${n} phần tử nên có 2<sup>${n}</sup> = <b>${2**n}</b> tập con.`}); }
    const A=shuffle(range(1,9)).slice(0,4).sort((u,v)=>u-v), z=range(1,9).find(x=>!A.includes(x)), a=pick(A);
    const good=pick([`${a} ∈ A`,`{${a}} ⊂ A`,'∅ ⊂ A']);
    return QC({text:`Cho tập hợp <span class="mx">A = ${setStr(A)}</span>. Khẳng định nào sau đây <b>đúng</b>?`, opts:[good,`{${a}} ∈ A`,`${a} ⊂ A`,`{${a}; ${z}} ⊂ A`], ans:good,
      hint:'Dùng “∈” giữa một phần tử và một tập hợp; dùng “⊂” giữa hai tập hợp. Tập rỗng là tập con của mọi tập hợp.',
      sol:`<b>${good}</b> đúng. Chú ý: {${a}} là tập hợp nên không viết {${a}} ∈ A; ${z} ∉ A nên {${a}; ${z}} ⊄ A.`}); }
  if(lv===2){ const nB=R(4,6), B=range(1,nB), m=R(1,nB-2), A=B.slice(0,m);
    return QB({text:`Cho <span class="mx">A = ${setStr(A)}, B = ${setStr(B)}</span>. Có bao nhiêu tập hợp X thoả mãn A ⊂ X ⊂ B?`, tpl:'[_] tập', ans:[2**(nB-m)],
      hint:'X phải chứa mọi phần tử của A; với mỗi phần tử còn lại của B, X có thể lấy hoặc không lấy.',
      sol:`X = A ∪ Y với Y là tập con của ${setStr(B.slice(m))} (${nB-m} phần tử). Số tập X là 2<sup>${nB-m}</sup> = <b>${2**(nB-m)}</b>.`}); }
  const a=R(-3,1), b=a+R(2,4), el=range(a+1,b), ne=Math.random()<.5, v=2**el.length-(ne?1:0);
  return QB({text:`Tập hợp <span class="mx">A = {${X} ∈ ${ZZ} | ${neg(a)} < ${X} ≤ ${neg(b)}}</span> có bao nhiêu tập con${ne?' <b>khác rỗng</b>':''}?`, tpl:'[_] tập con', ans:[v],
    hint:`Liệt kê A trước để biết số phần tử n, rồi dùng 2ⁿ${ne?' (bỏ tập rỗng)':''}.`,
    sol:`A = ${setStr(el.map(neg))} có ${el.length} phần tử. Số tập con${ne?' khác rỗng':''}: 2<sup>${el.length}</sup>${ne?' − 1':''} = <b>${v}</b>.`});
};
const inter=(A,B)=>A.filter(x=>B.includes(x)), uni=(A,B)=>[...new Set([...A,...B])].sort((u,v)=>u-v), diff=(A,B)=>A.filter(x=>!B.includes(x));
const g2c = lv => {   // phép toán trên tập hữu hạn
  let A,B,E=range(1,10);
  do{ A=shuffle(E).slice(0,R(4,5)).sort((u,v)=>u-v); B=shuffle(E).slice(0,R(4,5)).sort((u,v)=>u-v) }
  while(inter(A,B).length<1||inter(A,B).length>3);
  const ops=[['A ∩ B',inter(A,B)],['A ∪ B',uni(A,B)],['A \\ B',diff(A,B)],['B \\ A',diff(B,A)]];
  let name,val,pool=ops.map(o=>o[1]);
  if(lv===1){ [name,val]=pick(ops.slice(0,2)); }
  else if(lv===2){ [name,val]=pick(ops.slice(2)); }
  else { const c=pick([['C<sub>E</sub>A',diff(E,A)],['C<sub>E</sub>(A ∪ B)',diff(E,uni(A,B))],['(A \\ B) ∪ (B \\ A)',uni(diff(A,B),diff(B,A))],['C<sub>E</sub>A ∩ B',inter(diff(E,A),B)]]);
    [name,val]=c; pool=[...pool,diff(E,A),diff(E,B),diff(E,inter(A,B))]; }
  const good=setStr(val), W=[...new Set(pool.map(setStr))].filter(s=>s!==good);
  return QC({text:`Cho ${lv===3?`E = ${setStr(E)}, `:''}<span class="mx">A = ${setStr(A)}, B = ${setStr(B)}</span>Tìm tập hợp <b>${name}</b>.`, opts:[good,...shuffle(W).slice(0,3)], ans:good,
    hint:'A ∩ B: phần tử thuộc cả A và B. A ∪ B: thuộc A hoặc B. A \\ B: thuộc A nhưng không thuộc B. C<sub>E</sub>A = E \\ A.',
    sol:`${name} = <b>${good}</b>.`});
};
// Khoảng, đoạn, nửa khoảng
const ivs = (l,lc,r,rc) => `${lc&&l!==-Infinity?'[':'('}${l===-Infinity?'−∞':neg(l)}; ${r===Infinity?'+∞':neg(r)}${rc&&r!==Infinity?']':')'}`;
const g2d = lv => {
  if(lv<3){ let a,b,c,d; do{a=R(-8,2);c=a+R(1,5);b=c+R(1,5);d=b+R(1,5)}while(false);
    const alc=Math.random()<.5, arc=Math.random()<.5, blc=Math.random()<.5, brc=Math.random()<.5;
    const A=ivs(a,alc,b,arc), B=ivs(c,blc,d,brc);
    const ops={ 'A ∩ B':[c,blc,b,arc], 'A ∪ B':[a,alc,d,brc], 'A \\ B':[a,alc,c,!blc], 'B \\ A':[b,!arc,d,brc] };
    const name=lv===1?pick(['A ∩ B','A ∪ B']):pick(['A \\ B','B \\ A']), [l,lc,r,rc]=ops[name], good=ivs(l,lc,r,rc);
    const W=[...new Set([ivs(l,!lc,r,rc),ivs(l,lc,r,!rc),ivs(l,!lc,r,!rc),...Object.values(ops).map(v=>ivs(...v))])].filter(s=>s!==good);
    return QC({text:`Cho <span class="mx">A = ${A}, B = ${B}</span>Tìm <b>${name}</b>.`, opts:[good,...shuffle(W).slice(0,3)], ans:good,
      hint:'Vẽ hai tập trên cùng một trục số. Dấu [ ] là lấy đầu mút, dấu ( ) là không lấy. Với A \\ B: điểm đầu mút nào thuộc B thì phải bỏ đi.',
      sol:`Biểu diễn trên trục số ta được ${name} = <b>${good}</b>.`}); }
  const t=pick(['bounded','half']);
  if(t==='bounded'){ const a=R(-6,2), b=a+R(2,7), lc=Math.random()<.5, rc=Math.random()<.5;
    const S=(p,q)=>`${ivs(-Infinity,false,a,p)} ∪ ${ivs(b,q,Infinity,false)}`, good=S(!lc,!rc);
    return QC({text:`Cho <span class="mx">A = ${ivs(a,lc,b,rc)}</span>Tìm <b>C<sub>ℝ</sub>A</b>.`, opts:[good,S(lc,rc),S(!lc,rc),S(lc,!rc)], ans:good,
      hint:'C<sub>ℝ</sub>A = ℝ \\ A gồm hai nửa khoảng hai bên. Đầu mút nào thuộc A thì không thuộc phần bù (và ngược lại).', sol:`C<sub>ℝ</sub>A = <b>${good}</b>.`}); }
  const a=R(-6,6), c=Math.random()<.5, left=Math.random()<.5;
  const A=left?ivs(-Infinity,false,a,c):ivs(a,c,Infinity,false), good=left?ivs(a,!c,Infinity,false):ivs(-Infinity,false,a,!c);
  const W=left?[ivs(a,c,Infinity,false),ivs(-Infinity,false,a,!c),ivs(-Infinity,false,a,c)]:[ivs(-Infinity,false,a,c),ivs(a,!c,Infinity,false),ivs(a,c,Infinity,false)];
  return QC({text:`Cho <span class="mx">A = ${A}</span>Tìm <b>C<sub>ℝ</sub>A</b>.`, opts:[good,...W], ans:good,
    hint:'Phần bù của một nửa khoảng là nửa khoảng “phía bên kia”; đầu mút đổi từ lấy thành không lấy và ngược lại.', sol:`C<sub>ℝ</sub>A = <b>${good}</b>.`});
};
const g2e = lv => {   // bài toán thực tế (biểu đồ Ven)
  const nm=pick([['bóng đá','cầu lông'],['Toán','Văn'],['câu lạc bộ Tiếng Anh','câu lạc bộ Tin học'],['bơi','cờ vua']]);
  if(lv<3){ const both=R(3,10), a=both+R(4,15), b=both+R(4,15), none=R(0,8), N=a+b-both+none;
    if(lv===1) return QB({text:`Lớp 10A có ${a} bạn thích ${nm[0]}, ${b} bạn thích ${nm[1]}, trong đó ${both} bạn thích cả hai. Hỏi có bao nhiêu bạn thích ít nhất một trong hai môn đó?`,
      tpl:'[_] bạn', ans:[a+b-both], hint:'Dùng |A ∪ B| = |A| + |B| − |A ∩ B| (các bạn thích cả hai bị đếm hai lần).', sol:`${a} + ${b} − ${both} = <b>${a+b-both}</b> bạn.`});
    const ask=pick(['none','only']);
    return ask==='none'
      ? QB({text:`Lớp 10A có ${N} học sinh, trong đó ${a} bạn thích ${nm[0]}, ${b} bạn thích ${nm[1]}, ${both} bạn thích cả hai. Hỏi có bao nhiêu bạn không thích cả hai?`,
          tpl:'[_] bạn', ans:[none], hint:'Tính số bạn thích ít nhất một môn trước, rồi lấy sĩ số trừ đi.', sol:`Thích ít nhất một môn: ${a} + ${b} − ${both} = ${a+b-both}. Không thích cả hai: ${N} − ${a+b-both} = <b>${none}</b> bạn.`})
      : QB({text:`Lớp 10A có ${a} bạn thích ${nm[0]}, ${b} bạn thích ${nm[1]}, trong đó ${both} bạn thích cả hai. Hỏi có bao nhiêu bạn chỉ thích ${nm[0]}?`,
          tpl:'[_] bạn', ans:[a-both], hint:`“Chỉ thích ${nm[0]}” là thuộc A nhưng không thuộc B: |A \\ B| = |A| − |A ∩ B|.`, sol:`${a} − ${both} = <b>${a-both}</b> bạn.`}); }
  const r=[R(2,8),R(2,8),R(2,8),R(1,5),R(1,5),R(1,5),R(1,4)]; // chỉ A, chỉ B, chỉ C, AB, BC, CA, ABC
  const A=r[0]+r[3]+r[5]+r[6], B=r[1]+r[3]+r[4]+r[6], C=r[2]+r[4]+r[5]+r[6], AB=r[3]+r[6], BC=r[4]+r[6], CA=r[5]+r[6], ABC=r[6], U=r.reduce((s,x)=>s+x,0);
  const ask=pick(['union','one']), v=ask==='union'?U:r[0]+r[1]+r[2];
  return QB({text:`Trong một nhóm học sinh: ${A} bạn giỏi Toán, ${B} bạn giỏi Lí, ${C} bạn giỏi Hoá; ${AB} bạn giỏi Toán và Lí, ${BC} bạn giỏi Lí và Hoá, ${CA} bạn giỏi Hoá và Toán; ${ABC} bạn giỏi cả ba môn. Hỏi có bao nhiêu bạn ${ask==='union'?'giỏi ít nhất một môn':'giỏi <b>đúng một</b> môn'}?`,
    tpl:'[_] bạn', ans:[v],
    hint:ask==='union'?'|A ∪ B ∪ C| = |A| + |B| + |C| − |A ∩ B| − |B ∩ C| − |C ∩ A| + |A ∩ B ∩ C|.':'Vẽ biểu đồ Ven, điền số từ trong ra ngoài: phần giữa (cả ba) → phần chỉ hai môn → phần chỉ một môn.',
    sol:ask==='union'?`${A} + ${B} + ${C} − ${AB} − ${BC} − ${CA} + ${ABC} = <b>${U}</b> bạn.`:`Chỉ giỏi Toán: ${A} − ${AB} − ${CA} + ${ABC} = ${r[0]}; chỉ Lí: ${r[1]}; chỉ Hoá: ${r[2]}. Tổng: <b>${v}</b> bạn.`});
};

lesson(1,'menh-de','Bài 1. Mệnh đề','Nhận biết mệnh đề; đúng sai; phủ định; mệnh đề đảo, điều kiện cần và đủ; mệnh đề chứa ∀, ∃.',[g1a,g1b,g1c,g1d,g1e]);
lesson(1,'tap-hop','Bài 2. Tập hợp và các phép toán trên tập hợp','Phần tử, tập con; giao, hợp, hiệu, phần bù; khoảng, đoạn, nửa khoảng; biểu đồ Ven.',[g2a,g2b,g2c,g2d,g2e]);
lesson(1,'on-tap-c1','Ôn tập chương I','Tổng hợp mệnh đề và tập hợp.',[g1b,g1c,g1d,g2c,g2d,g2e]);
})();
