/* =====================================================================
   DỮ LIỆU LỚP 10 – Toán, Kết nối tri thức
   Chương I. Mệnh đề và tập hợp (Bài 1 Mệnh đề · Bài 2 Tập hợp và các phép toán trên tập hợp)
   Chương II. Bất phương trình và hệ bất phương trình bậc nhất hai ẩn (Bài 3 · Bài 4)
   Chương III. Hệ thức lượng trong tam giác (Bài 5 · Bài 6)
   Chủ đề 4. Các số liệu đặc trưng của mẫu số liệu không ghép nhóm (Bài 12)
   Mỗi dạng bài: lv => câu hỏi. Chọn đáp án trước rồi mới dựng đề.
   Công thức viết LaTeX: tm() trong dòng, td() riêng dòng, tb() đáp án đậm (xem core.js).
   ===================================================================== */
(() => {
const G = App.addGrade({
  id: 'lop10', name: 'Lớp 10', subject: 'Toán', book: 'Kết nối tri thức',
  topics: [ {id:1, hk:1, name:'Mệnh đề và tập hợp', label:'Chương I'}, {id:2, hk:1, name:'Bất phương trình và hệ bất phương trình bậc nhất hai ẩn', label:'Chương II'}, {id:3, hk:1, name:'Hệ thức lượng trong tam giác', label:'Chương III'}, {id:4, hk:1, name:'Các số đặc trưng của mẫu số liệu không ghép nhóm', label:'Chương V'} ],
});
const lesson = G.lesson;

/* ---------- Tiện ích ---------- */
const RR='\\mathbb{R}', NN='\\mathbb{N}', NS='\\mathbb{N}^*', ZZ='\\mathbb{Z}', QQ='\\mathbb{Q}';
const sR = (a,b) => pick([-1,1])*R(a,b);
const isPrime = n => { if(n<2) return false; for(let i=2;i*i<=n;i++) if(n%i===0) return false; return true; };
const isSq = n => n>=0 && Number.isInteger(Math.sqrt(n));
const TF = ['Đúng','Sai'];
const tfQ = (text, truth, hint, why) => QC({text, opts:TF, ans:truth?'Đúng':'Sai', keepOrder:true, hint,
  sol:`${why} Vậy mệnh đề <b>${truth?'đúng':'sai'}</b>.`});
const setT = a => a.length ? `\\{${a.map(x=>`{${x}}`).join(';\\ ')}\\}` : '\\varnothing';        // tập hợp LaTeX
const range = (a,b) => { const r=[]; for(let i=a;i<=b;i++) r.push(i); return r; };
const divisors = n => range(1,n).filter(d=>n%d===0);
const OPS = {'>':'\\gt','<':'\\lt','≥':'\\ge','≤':'\\le','=':'=','≠':'\\ne'};
const op_ = o => OPS[o];
const NOT = {'>':'≤','<':'≥','≥':'<','≤':'>','=':'≠','≠':'='};
const RA = '\\;\\Rightarrow\\;';

/* =====================================================================
   BÀI 1. MỆNH ĐỀ
   ===================================================================== */
// Mệnh đề (câu khẳng định có tính đúng sai xác định). Viết bằng HTML + tm().
const propPool = () => { const n=R(2,60), a=R(2,30), b=R(2,9), c=R(2,40);
  return shuffle([`${n} là số nguyên tố`, tm(`${a} + ${b} = ${a+b+pick([0,0,1])}`), `${a*b+pick([0,1])} chia hết cho ${b}`,
    'Hình vuông có bốn cạnh bằng nhau', 'Hà Nội là thủ đô của Việt Nam', `${tm(`\\sqrt{${c}}`)} là số vô tỉ`, `${a} là số chẵn`,
    `Tổng ba góc của một tam giác bằng ${tm('180^\\circ')}`, tm('\\pi \\lt 3{,}14')]); };
const nonPool = (withVar) => { const a=R(1,9), b=R(2,15);
  const base=['Hôm nay trời đẹp quá!','Bạn học lớp mấy?','Hãy làm bài tập này đi!','Bộ phim này hay quá!','Mấy giờ rồi?','Toán học thật thú vị làm sao!'];
  const vars=[tm(`x + ${a} = ${b}`), tm(`x^2 \\gt ${b}`), `${tm('n')} là số nguyên tố`, tm(`2x - ${a} \\le 0`)];
  return shuffle(withVar?[...base.slice(0,3),...vars]:base); };
const g1a = lv => {
  if(lv<3){ const p=propPool()[0], W=nonPool(lv===2).slice(0,3);
    return QC({text:'Câu nào sau đây là <b>mệnh đề</b>?', opts:[p,...W], ans:p,
      hint:'Mệnh đề là một câu khẳng định có tính đúng hoặc sai xác định. Câu hỏi, câu cảm thán, câu mệnh lệnh không phải mệnh đề; câu chứa biến chưa xác định đúng sai.',
      sol:`“${p}” là câu khẳng định và ta xác định được nó đúng hay sai, nên đó là <b>mệnh đề</b>. Các câu còn lại là câu hỏi, câu cảm thán, câu mệnh lệnh hoặc câu chứa biến.`}); }
  const k=R(1,4), P=propPool().slice(0,k), Nn=nonPool(true).slice(0,5-k), all=shuffle([...P,...Nn]);
  return QB({text:`Trong các câu sau, có bao nhiêu câu là mệnh đề?<br>${all.map((s,i)=>`(${i+1}) ${s}${/[!?]$/.test(s)?'':'.'}`).join('<br>')}`,
    tpl:'[_] mệnh đề', ans:[k],
    hint:`Câu chứa biến (như ${tm('x + 1 = 3')} hay “${tm('n')} là số nguyên tố”) là mệnh đề chứa biến, chưa phải mệnh đề. Câu hỏi, cảm thán, mệnh lệnh cũng không phải mệnh đề.`,
    sol:`Các mệnh đề: ${P.map(s=>'“'+s+'”').join('; ')}. Có <b>${k}</b> mệnh đề.`});
};
// Đúng/sai của một mệnh đề: [câu (HTML), đúng?, lí do (HTML)]
const basicProp = () => pick([
  ()=>{const n=R(2,99),p=isPrime(n),d=divisors(n).find(x=>x>1&&x<n);return [`${n} là số nguyên tố`,p,p?`${n} chỉ có hai ước là 1 và ${n}.`:`${tm(`${n} = ${d}\\cdot ${n/d}`)}.`]},
  ()=>{const b=R(3,12),a=R(20,150),t=a%b===0;return [`${a} chia hết cho ${b}`,t,t?`${tm(`${a} = ${b}\\cdot ${a/b}`)}.`:`${tm(`${a} = ${b}\\cdot ${Math.floor(a/b)} + ${a%b}`)}.`]},
  ()=>{const k=R(2,50),t=isSq(k);return [`${tm(`\\sqrt{${k}}`)} là số hữu tỉ`,t,t?`${tm(`\\sqrt{${k}} = ${Math.sqrt(k)}`)}.`:`${k} không phải số chính phương nên ${tm(`\\sqrt{${k}}`)} là số vô tỉ.`]},
  ()=>{const a=R(-9,9),b=R(0,80),op=pick(['>','<','≥']),v=a*a,t=op==='>'?v>b:op==='<'?v<b:v>=b;return [tm(`(${a})^2 ${op_(op)} ${b}`),t,`${tm(`(${a})^2 = ${v}`)}.`]},
  ()=>pick([[tm('\\pi \\gt 3{,}14'),true,`${tm('\\pi \\approx 3{,}1416')}.`],[tm('\\sqrt{2} \\lt 1{,}41'),false,`${tm('\\sqrt{2} \\approx 1{,}414 \\gt 1{,}41')}.`],[tm('\\sqrt{3} \\gt 1{,}7'),true,`${tm('\\sqrt{3} \\approx 1{,}732')}.`],[tm('\\tfrac{1}{3} = 0{,}33'),false,`${tm('\\tfrac{1}{3} = 0{,}333\\ldots \\ne 0{,}33')}.`]]),
])();
const g1b = lv => {
  if(lv<3){ const [s,t,why]=basicProp();
    return tfQ(`Mệnh đề sau đúng hay sai? <span class="mxd">“${s}”</span>`, t, 'Kiểm tra trực tiếp bằng tính toán hoặc định nghĩa.', why); }
  const [p,tp_,wp]=basicProp(), [q,tq,wq]=basicProp(), kind=pick(['và','hoặc','kéo theo']);
  const t=kind==='và'?tp_&&tq:kind==='hoặc'?tp_||tq:(!tp_||tq);
  const s=kind==='kéo theo'?`Nếu ${p} thì ${q}`:`${p} ${kind} ${q}`;
  return tfQ(`Mệnh đề sau đúng hay sai? <span class="mxd" style="white-space:normal">“${s}”</span>`, t,
    kind==='và'?'“P và Q” chỉ đúng khi cả P và Q cùng đúng.':kind==='hoặc'?'“P hoặc Q” chỉ sai khi cả P và Q cùng sai.':`“${tm('P \\Rightarrow Q')}” chỉ sai khi P đúng và Q sai.`,
    `P: “${p}” ${tp_?'đúng':'sai'} (${wp}) Q: “${q}” ${tq?'đúng':'sai'} (${wq})`);
};
// Mệnh đề phủ định
const exprPool = () => { const a=R(1,9), b=R(1,9); return pick([`x^2 + ${a}`, `x^2 - ${a}x + ${b}`, `2x - ${a}`, `x^2 - ${b}`, `x^3 + ${a}x`]); };
const g1c = lv => {
  if(lv===1){ const a=R(2,40), b=R(2,40), op=pick(['>','<','=']), P=`${a} ${op_(op)} ${b}`, good=`${a} ${op_(NOT[op])} ${b}`;
    const ops=['>','<','≥','≤','=','≠'].filter(o=>o!==op&&o!==NOT[op]);
    return QC({text:`Mệnh đề phủ định của mệnh đề ${td(`P:\\ ${P}`)} là`, opts:[good,...shuffle(ops).slice(0,3).map(o=>`${a} ${op_(o)} ${b}`)].map(tm), ans:tm(good),
      hint:`Phủ định của ${tm('\\gt')} là ${tm('\\le')}, của ${tm('\\lt')} là ${tm('\\ge')}, của ${tm('=')} là ${tm('\\ne')}.`, sol:`${tm('\\overline{P}')}: ${tb(good)}.`}); }
  if(lv===2||Math.random()<.5){ const e=exprPool(), op=pick(['>','<','≥','≤','=','≠']), all=Math.random()<.5, set=pick([RR,ZZ,QQ]);
    const Q1=all?'\\forall':'\\exists', Q2=all?'\\exists':'\\forall', mk=(q,o)=>`${q} x \\in ${set},\\ ${e} ${op_(o)} 0`;
    const good=mk(Q2,NOT[op]); const cand=[mk(Q2,op),mk(Q1,NOT[op]),mk(Q1,op)];
    const alt=['>','<','≥','≤'].filter(o=>o!==op&&o!==NOT[op]); if(alt.length) cand.push(mk(Q2,alt[0]));
    return QC({text:`Mệnh đề phủ định của mệnh đề ${td(`P:\\ ${mk(Q1,op)}`)} là`, opts:[good,...shuffle(cand).slice(0,3)].map(tm), ans:tm(good),
      hint:`Phủ định của “${tm('\\forall x,\\ P(x)')}” là “${tm('\\exists x,\\ \\overline{P(x)}')}”; phủ định của “${tm('\\exists x,\\ P(x)')}” là “${tm('\\forall x,\\ \\overline{P(x)}')}”. Đổi lượng từ <b>và</b> phủ định luôn phần sau.`,
      sol:`Đổi ${tm(Q1)} thành ${tm(Q2)} và ${tm(op_(op))} thành ${tm(op_(NOT[op]))}: ${tm('\\overline{P}')}: ${tb(good)}.`}); }
  const w=pick([
    ['Mọi học sinh lớp 10A đều thích môn Toán','Có ít nhất một học sinh lớp 10A không thích môn Toán',['Mọi học sinh lớp 10A đều không thích môn Toán','Có một học sinh lớp 10A thích môn Toán','Không có học sinh lớp 10A nào thích môn Toán']],
    ['Tất cả các bạn trong nhóm đều biết bơi','Có ít nhất một bạn trong nhóm không biết bơi',['Tất cả các bạn trong nhóm đều không biết bơi','Có một bạn trong nhóm biết bơi','Không bạn nào trong nhóm biết bơi']],
    ['Có ít nhất một bạn trong lớp đạt điểm 10','Mọi bạn trong lớp đều không đạt điểm 10',['Có ít nhất một bạn trong lớp không đạt điểm 10','Mọi bạn trong lớp đều đạt điểm 10','Có một bạn trong lớp đạt điểm 9']],
  ]);
  const a=R(1,9), b=R(2,7);
  const num=[tm(`\\exists n \\in ${NN},\\ n^2 + ${a} \\text{ chia hết cho } ${b}`),tm(`\\forall n \\in ${NN},\\ n^2 + ${a} \\text{ không chia hết cho } ${b}`),[tm(`\\exists n \\in ${NN},\\ n^2 + ${a} \\text{ không chia hết cho } ${b}`),tm(`\\forall n \\in ${NN},\\ n^2 + ${a} \\text{ chia hết cho } ${b}`),tm(`\\exists n \\notin ${NN},\\ n^2 + ${a} \\text{ chia hết cho } ${b}`)]];
  const [P,good,W]=Math.random()<.5?w:num;
  return QC({text:`Mệnh đề phủ định của mệnh đề <span class="mxd" style="white-space:normal">“${P}”</span> là`, opts:[good,...W], ans:good,
    hint:'“Mọi… đều…” phủ định thành “Có ít nhất một… không…”; “Có…” phủ định thành “Mọi… đều không…”.', sol:`Phủ định: “<b>${good}</b>”.`});
};
// Mệnh đề đảo, kéo theo, điều kiện cần/đủ
const PAIRS = [
  ['tam giác ABC đều','tam giác ABC cân',true,false],
  ['tứ giác ABCD là hình vuông','tứ giác ABCD là hình chữ nhật',true,false],
  [`số tự nhiên ${tm('n')} chia hết cho 6`,`${tm('n')} chia hết cho 3`,true,false],
  [`${tm('a')} và ${tm('b')} đều chia hết cho 3`,`${tm('a + b')} chia hết cho 3`,true,false],
  [tm('x = 2'),tm('x^2 = 4'),true,false],
  ['tứ giác ABCD là hình thoi','tứ giác ABCD có hai đường chéo vuông góc',true,false],
  ['tam giác ABC vuông tại A',tm('AB^2 + AC^2 = BC^2'),true,true],
  [`số tự nhiên ${tm('n')} chia hết cho cả 2 và 3`,`${tm('n')} chia hết cho 6`,true,true],
  ['tứ giác ABCD là hình bình hành','hai đường chéo của ABCD cắt nhau tại trung điểm mỗi đường',true,true],
  [`tam giác ABC có hai góc bằng ${tm('60^\\circ')}`,'tam giác ABC đều',true,true],
];
const g1d = lv => {
  if(lv===1){ const [p,q]=pick(PAIRS), S=(a,b)=>`Nếu ${a} thì ${b}`, good=S(q,p);
    return QC({text:`Mệnh đề đảo của mệnh đề <span class="mxd" style="white-space:normal">“Nếu ${p} thì ${q}”</span> là`,
      opts:[good,S(p,q),`Nếu “${p}” sai thì “${q}” sai`,`Nếu “${q}” sai thì “${p}” sai`], ans:good,
      hint:`Mệnh đề đảo của ${tm('P \\Rightarrow Q')} là ${tm('Q \\Rightarrow P')} (đổi chỗ giả thiết và kết luận).`, sol:`Đổi chỗ P và Q: “<b>${good}</b>”.`}); }
  const asym=PAIRS.filter(x=>!x[3]);
  if(lv===2){ const ps=shuffle(asym).slice(0,4), good=`Nếu ${ps[0][0]} thì ${ps[0][1]}`;
    return QC({text:'Mệnh đề nào sau đây <b>đúng</b>?', opts:[good,...ps.slice(1).map(x=>`Nếu ${x[1]} thì ${x[0]}`)], ans:good,
      hint:'Mệnh đề “Nếu P thì Q” chỉ sai khi có trường hợp P đúng mà Q sai. Hãy thử tìm phản ví dụ.',
      sol:`“<b>${good}</b>” đúng. Ba mệnh đề còn lại sai vì có phản ví dụ (chẳng hạn tam giác cân chưa chắc đều, hình chữ nhật chưa chắc là hình vuông…).`}); }
  const pr=pick(PAIRS), rev=!pr[3]&&Math.random()<.5;
  const [A,B]=rev?[pr[1],pr[0]]:[pr[0],pr[1]];
  const ans=pr[3]?'cần và đủ':rev?'cần':'đủ';
  return QC({text:`Điền vào chỗ trống: “${A}” là điều kiện <b>…</b> để “${B}”.`, opts:['đủ','cần','cần và đủ'], ans, keepOrder:true,
    hint:`Nếu ${tm('P \\Rightarrow Q')} đúng thì P là điều kiện đủ để có Q, Q là điều kiện cần để có P. Nếu cả ${tm('P \\Rightarrow Q')} và ${tm('Q \\Rightarrow P')} đều đúng thì P là điều kiện cần và đủ để có Q.`,
    sol:pr[3]?`Hai mệnh đề tương đương (${tm('P \\Leftrightarrow Q')}) nên là điều kiện <b>cần và đủ</b>.`:rev?`Ta có “${B}” ${tm('\\Rightarrow')} “${A}” đúng, còn chiều ngược lại sai. Vậy “${A}” là điều kiện <b>cần</b>.`:`Ta có “${A}” ${tm('\\Rightarrow')} “${B}” đúng, còn chiều ngược lại sai. Vậy “${A}” là điều kiện <b>đủ</b>.`});
};
// Mệnh đề chứa ∀, ∃: [LaTeX, đúng?, lí do (HTML)]
const quantProp = lv => { const a=R(1,9), k=R(2,30), b=R(2,6), c=R(1,20);
  const easy=[
    [`\\forall x \\in ${RR},\\ x^2 \\ge 0`,true,'Bình phương mọi số thực đều không âm.'],
    [`\\forall x \\in ${RR},\\ x^2 \\gt 0`,false,`Với ${tm('x = 0')} thì ${tm('x^2 = 0')}, không lớn hơn 0.`],
    [`\\exists x \\in ${RR},\\ x^2 + ${a} = 0`,false,`${tm(`x^2 + ${a} \\ge ${a} \\gt 0`)} với mọi ${tm('x')}.`],
    [`\\exists x \\in ${RR},\\ x^2 - ${a*a} = 0`,true,`${tm(`x = ${a}`)} thoả mãn.`],
    [`\\exists n \\in ${ZZ},\\ ${b}n = ${c}`,c%b===0,c%b===0?`${tm(`n = ${c/b}`)} thoả mãn.`:`${c} không chia hết cho ${b}.`],
  ];
  const hard=[
    [`\\exists x \\in ${QQ},\\ x^2 = ${k}`,isSq(k),isSq(k)?`${tm(`x = ${Math.sqrt(k)}`)} thoả mãn.`:`${k} không phải số chính phương nên ${tm(`\\sqrt{${k}}`)} là số vô tỉ.`],
    [`\\forall n \\in ${NN},\\ n^2 + n \\text{ chia hết cho } 2`,true,`${tm('n^2 + n = n(n + 1)')} là tích hai số tự nhiên liên tiếp nên chia hết cho 2.`],
    [`\\forall x \\in ${RR},\\ x^2 - ${2*a}x + ${a*a} \\gt 0`,false,`${tm(`x^2 - ${2*a}x + ${a*a} = (x - ${a})^2`)}, bằng 0 khi ${tm(`x = ${a}`)}.`],
    [`\\forall x \\in ${RR},\\ x^2 - ${2*a}x + ${a*a} \\ge 0`,true,`${tm(`x^2 - ${2*a}x + ${a*a} = (x - ${a})^2 \\ge 0`)}.`],
    [`\\exists x \\in ${RR},\\ x \\gt x^2`,true,`${tm('x = \\tfrac{1}{2}')} thoả mãn vì ${tm('\\tfrac{1}{2} \\gt \\tfrac{1}{4}')}.`],
    [`\\forall x \\in ${RR},\\ x^2 \\ge x`,false,`${tm('x = \\tfrac{1}{2}')} thì ${tm('x^2 = \\tfrac{1}{4} \\lt \\tfrac{1}{2}')}.`],
    [`\\exists n \\in ${NN},\\ n^2 + n + 1 \\text{ chia hết cho } 2`,false,`${tm('n^2 + n')} luôn chẵn nên ${tm('n^2 + n + 1')} luôn lẻ.`],
    [`\\forall n \\in ${NN},\\ n^2 \\ge n`,true,`Với ${tm('n = 0')} hoặc ${tm('n = 1')} dấu bằng xảy ra; ${tm('n \\ge 2')} thì ${tm('n^2 \\gt n')}.`],
  ];
  return pick(lv===1?easy:lv===2?[...easy,...hard.slice(0,3)]:hard); };
const g1e = lv => { const [s,t,why]=quantProp(lv);
  return tfQ(`Mệnh đề sau đúng hay sai? ${td(s)}`, t,
    `“${tm('\\forall x,\\ P(x)')}” đúng khi ${tm('P(x)')} đúng với <b>mọi</b> ${tm('x')} (chỉ cần một phản ví dụ là sai). “${tm('\\exists x,\\ P(x)')}” đúng khi tìm được <b>ít nhất một</b> ${tm('x')} thoả mãn.`, why); };

/* =====================================================================
   BÀI 2. TẬP HỢP VÀ CÁC PHÉP TOÁN TRÊN TẬP HỢP
   ===================================================================== */
const g2a = lv => {   // phần tử, số phần tử
  if(lv===1){ if(Math.random()<.5){ const n=R(3,6), incl0=Math.random()<.5, strict=Math.random()<.5;
      const el=range(incl0?0:1, strict?n-1:n), set=incl0?NN:NS;
      const W=[range(incl0?1:0,strict?n-1:n),range(incl0?0:1,strict?n:n+1),range(incl0?1:0,strict?n:n+1)].map(setT);
      return QC({text:`Liệt kê các phần tử của tập hợp ${td(`A = \\{x \\in ${set} \\mid x ${strict?'\\lt':'\\le'} ${n}\\}`)}`, opts:[setT(el),...W].map(tm), ans:tm(setT(el)),
        hint:`${tm(`${NN} = \\{0;\\ 1;\\ 2;\\ \\ldots\\}`)}, còn ${tm(NS)} không có số 0. Chú ý dấu ${tm(strict?'\\lt':'\\le')}.`, sol:`${tb(`A = ${setT(el)}`)}.`}); }
    const a=R(-5,3), b=a+R(3,7), lc=pick(['<','≤']), rc=pick(['<','≤']);
    const el=range(a,b).filter(x=>(lc==='<'?x>a:x>=a)&&(rc==='<'?x<b:x<=b));
    return QB({text:`Tập hợp ${td(`A = \\{x \\in ${ZZ} \\mid ${a} ${op_(lc)} x ${op_(rc)} ${b}\\}`)} có bao nhiêu phần tử?`, tpl:'[_] phần tử', ans:[el.length],
      hint:`Liệt kê các số nguyên nằm giữa hai số đã cho, chú ý dấu ${tm('\\lt')} (không lấy đầu mút) và ${tm('\\le')} (lấy đầu mút).`, sol:`${tm(`A = ${setT(el)}`)}, có <b>${el.length}</b> phần tử.`}); }
  if(lv===2){ if(Math.random()<.5){ const n=pick([12,18,20,24,28,30,36,40,45,48]), d=divisors(n);
      return QB({text:`Tập hợp ${tm('A')} các ước tự nhiên của ${n} có bao nhiêu phần tử?`, tpl:'[_] phần tử', ans:[d.length],
        hint:`Liệt kê các ước theo cặp: nếu ${tm('d')} là ước thì ${tm('n : d')} cũng là ước.`, sol:`${tm(`A = ${setT(d)}`)}, có <b>${d.length}</b> phần tử.`}); }
    const d=R(3,9), Nn=R(25,70), el=range(0,Nn-1).filter(x=>x%d===0);
    return QB({text:`Tập hợp ${td(`A = \\{x \\in ${NN} \\mid x \\text{ chia hết cho } ${d} \\text{ và } x \\lt ${Nn}\\}`)} có bao nhiêu phần tử?`, tpl:'[_] phần tử', ans:[el.length],
      hint:`Các phần tử là ${tm(`0;\\ ${d};\\ ${2*d};\\ \\ldots`)} (nhớ 0 chia hết cho mọi số khác 0).`, sol:`${tm(`A = \\{0;\\ ${d};\\ \\ldots;\\ ${el[el.length-1]}\\}`)}, có <b>${el.length}</b> phần tử.`}); }
  const t=pick(['sq','root']);
  if(t==='sq'){ const m=R(3,30), el=range(-6,6).filter(x=>x*x<=m);
    return QB({text:`Tập hợp ${td(`A = \\{x \\in ${ZZ} \\mid x^2 \\le ${m}\\}`)} có bao nhiêu phần tử?`, tpl:'[_] phần tử', ans:[el.length],
      hint:`${tm('x^2 \\le m')} khi ${tm('-\\sqrt{m} \\le x \\le \\sqrt{m}')}. Đừng quên các số nguyên âm và số 0.`, sol:`${tm(`A = ${setT(el)}`)}, có <b>${el.length}</b> phần tử.`}); }
  const a=R(-4,4), c=pick([1,4,9,16,2,3,5,a*a||1]), set=pick([RR,QQ,ZZ]);
  const roots=new Set([a]); const r=Math.sqrt(c); if(set===RR||Number.isInteger(r)){roots.add(r);roots.add(-r)}
  const cnt=roots.size, rl=[...roots].sort((u,v)=>u-v).map(v=>Number.isInteger(v)?String(v):(v<0?'-':'')+`\\sqrt{${c}}`);
  return QB({text:`Tập hợp ${td(`A = \\{x \\in ${set} \\mid (x ${a<0?'+':'-'} ${Math.abs(a)})(x^2 - ${c}) = 0\\}`)} có bao nhiêu phần tử?`, tpl:'[_] phần tử', ans:[cnt],
    hint:`Giải phương trình tích rồi chỉ giữ các nghiệm thuộc ${tm(set)}. Các nghiệm trùng nhau chỉ tính một lần.`,
    sol:`Nghiệm: ${tm(`x = ${a},\\ x = \\pm\\sqrt{${c}}`)}. Các phần tử thuộc ${tm(set)}: ${tm(setT(rl))}. ${tm('A')} có <b>${cnt}</b> phần tử.`});
};
const g2b = lv => {   // tập con
  const L=['a','b','c','d','e','f'];
  if(lv===1){ if(Math.random()<.5){ const n=R(2,5), A=L.slice(0,n);
      return QB({text:`Tập hợp ${td(`A = ${setT(A)}`)} có bao nhiêu tập hợp con?`, tpl:'[_] tập con', ans:[2**n],
        hint:`Tập có ${tm('n')} phần tử thì có ${tm('2^n')} tập con (kể cả ${tm('\\varnothing')} và chính nó).`, sol:`${tm('A')} có ${n} phần tử nên có ${tm(`2^{${n}} = ${2**n}`)} tập con. Đáp số: ${tb(2**n)}.`}); }
    const A=shuffle(range(1,9)).slice(0,4).sort((u,v)=>u-v), z=range(1,9).find(x=>!A.includes(x)), a=pick(A);
    const good=pick([`${a} \\in A`,`\\{${a}\\} \\subset A`,'\\varnothing \\subset A']);
    return QC({text:`Cho tập hợp ${td(`A = ${setT(A)}`)} Khẳng định nào sau đây <b>đúng</b>?`, opts:[good,`\\{${a}\\} \\in A`,`${a} \\subset A`,`\\{${a};\\ ${z}\\} \\subset A`].map(tm), ans:tm(good),
      hint:`Dùng ${tm('\\in')} giữa một phần tử và một tập hợp; dùng ${tm('\\subset')} giữa hai tập hợp. Tập rỗng là tập con của mọi tập hợp.`,
      sol:`${tb(good)} đúng. Chú ý: ${tm(`\\{${a}\\}`)} là tập hợp nên không viết ${tm(`\\{${a}\\} \\in A`)}; ${tm(`${z} \\notin A`)} nên ${tm(`\\{${a};\\ ${z}\\} \\not\\subset A`)}.`}); }
  if(lv===2){ const nB=R(4,6), B=range(1,nB), m=R(1,nB-2), A=B.slice(0,m);
    return QB({text:`Cho ${td(`A = ${setT(A)},\\quad B = ${setT(B)}`)} Có bao nhiêu tập hợp ${tm('X')} thoả mãn ${tm('A \\subset X \\subset B')}?`, tpl:'[_] tập', ans:[2**(nB-m)],
      hint:`${tm('X')} phải chứa mọi phần tử của ${tm('A')}; với mỗi phần tử còn lại của ${tm('B')}, ${tm('X')} có thể lấy hoặc không lấy.`,
      sol:`${tm('X = A \\cup Y')} với ${tm('Y')} là tập con của ${tm(setT(B.slice(m)))} (${nB-m} phần tử). Số tập ${tm('X')} là ${tm(`2^{${nB-m}} = ${2**(nB-m)}`)}. Đáp số: ${tb(2**(nB-m))}.`}); }
  const a=R(-3,1), b=a+R(2,4), el=range(a+1,b), ne=Math.random()<.5, v=2**el.length-(ne?1:0);
  return QB({text:`Tập hợp ${td(`A = \\{x \\in ${ZZ} \\mid ${a} \\lt x \\le ${b}\\}`)} có bao nhiêu tập con${ne?' <b>khác rỗng</b>':''}?`, tpl:'[_] tập con', ans:[v],
    hint:`Liệt kê ${tm('A')} trước để biết số phần tử ${tm('n')}, rồi dùng ${tm('2^n')}${ne?' (bỏ tập rỗng)':''}.`,
    sol:`${tm(`A = ${setT(el)}`)} có ${el.length} phần tử. Số tập con${ne?' khác rỗng':''}: ${tm(`2^{${el.length}}${ne?' - 1':''} = ${v}`)}. Đáp số: ${tb(v)}.`});
};
const inter=(A,B)=>A.filter(x=>B.includes(x)), uni=(A,B)=>[...new Set([...A,...B])].sort((u,v)=>u-v), diff=(A,B)=>A.filter(x=>!B.includes(x));
const g2c = lv => {   // phép toán trên tập hữu hạn
  let A,B,E=range(1,10);
  do{ A=shuffle(E).slice(0,R(4,5)).sort((u,v)=>u-v); B=shuffle(E).slice(0,R(4,5)).sort((u,v)=>u-v) }
  while(inter(A,B).length<1||inter(A,B).length>3);
  const ops=[['A \\cap B',inter(A,B)],['A \\cup B',uni(A,B)],['A \\setminus B',diff(A,B)],['B \\setminus A',diff(B,A)]];
  let name,val,pool=ops.map(o=>o[1]);
  if(lv===1){ [name,val]=pick(ops.slice(0,2)); }
  else if(lv===2){ [name,val]=pick(ops.slice(2)); }
  else { const c=pick([['C_E A',diff(E,A)],['C_E (A \\cup B)',diff(E,uni(A,B))],['(A \\setminus B) \\cup (B \\setminus A)',uni(diff(A,B),diff(B,A))],['C_E A \\cap B',inter(diff(E,A),B)]]);
    [name,val]=c; pool=[...pool,diff(E,A),diff(E,B),diff(E,inter(A,B))]; }
  const good=setT(val), W=[...new Set(pool.map(setT))].filter(s=>s!==good);
  return QC({text:`Cho ${lv===3?td(`E = ${setT(E)}`):''}${td(`A = ${setT(A)},\\quad B = ${setT(B)}`)} Tìm tập hợp ${tm(name)}.`, opts:[good,...shuffle(W).slice(0,3)].map(tm), ans:tm(good),
    hint:`${tm('A \\cap B')}: phần tử thuộc cả ${tm('A')} và ${tm('B')}. ${tm('A \\cup B')}: thuộc ${tm('A')} hoặc ${tm('B')}. ${tm('A \\setminus B')}: thuộc ${tm('A')} nhưng không thuộc ${tm('B')}. ${tm('C_E A = E \\setminus A')}.`,
    sol:`${tb(`${name} = ${good}`)}.`});
};
// Khoảng, đoạn, nửa khoảng
const ivs = (l,lc,r,rc) => `${lc&&l!==-Infinity?'[':'('}{${l===-Infinity?'-\\infty':l}};\\ {${r===Infinity?'+\\infty':r}}${rc&&r!==Infinity?']':')'}`;
const g2d = lv => {
  if(lv<3){ const a=R(-8,2), c=a+R(1,5), b=c+R(1,5), d=b+R(1,5);
    const alc=Math.random()<.5, arc=Math.random()<.5, blc=Math.random()<.5, brc=Math.random()<.5;
    const A=ivs(a,alc,b,arc), B=ivs(c,blc,d,brc);
    const ops={ 'A \\cap B':[c,blc,b,arc], 'A \\cup B':[a,alc,d,brc], 'A \\setminus B':[a,alc,c,!blc], 'B \\setminus A':[b,!arc,d,brc] };
    const name=lv===1?pick(['A \\cap B','A \\cup B']):pick(['A \\setminus B','B \\setminus A']), [l,lc,r,rc]=ops[name], good=ivs(l,lc,r,rc);
    const W=[...new Set([ivs(l,!lc,r,rc),ivs(l,lc,r,!rc),ivs(l,!lc,r,!rc),...Object.values(ops).map(v=>ivs(...v))])].filter(s=>s!==good);
    return QC({text:`Cho ${td(`A = ${A},\\quad B = ${B}`)} Tìm ${tm(name)}.`, opts:[good,...shuffle(W).slice(0,3)].map(tm), ans:tm(good),
      hint:`Vẽ hai tập trên cùng một trục số. Dấu ${tm('[\\ ]')} là lấy đầu mút, dấu ${tm('(\\ )')} là không lấy. Với ${tm('A \\setminus B')}: điểm đầu mút nào thuộc ${tm('B')} thì phải bỏ đi.`,
      sol:`Biểu diễn trên trục số ta được ${tb(`${name} = ${good}`)}.`}); }
  const t=pick(['bounded','half']);
  if(t==='bounded'){ const a=R(-6,2), b=a+R(2,7), lc=Math.random()<.5, rc=Math.random()<.5;
    const S=(p,q)=>`${ivs(-Infinity,false,a,p)} \\cup ${ivs(b,q,Infinity,false)}`, good=S(!lc,!rc);
    return QC({text:`Cho ${td(`A = ${ivs(a,lc,b,rc)}`)} Tìm ${tm(`C_${RR} A`)}.`, opts:[good,S(lc,rc),S(!lc,rc),S(lc,!rc)].map(tm), ans:tm(good),
      hint:`${tm(`C_${RR} A = ${RR} \\setminus A`)} gồm hai nửa khoảng hai bên. Đầu mút nào thuộc ${tm('A')} thì không thuộc phần bù (và ngược lại).`, sol:`${tb(`C_${RR} A = ${good}`)}.`}); }
  const a=R(-6,6), c=Math.random()<.5, left=Math.random()<.5;
  const A=left?ivs(-Infinity,false,a,c):ivs(a,c,Infinity,false), good=left?ivs(a,!c,Infinity,false):ivs(-Infinity,false,a,!c);
  const W=left?[ivs(a,c,Infinity,false),ivs(-Infinity,false,a,!c),ivs(-Infinity,false,a,c)]:[ivs(-Infinity,false,a,c),ivs(a,!c,Infinity,false),ivs(a,c,Infinity,false)];
  return QC({text:`Cho ${td(`A = ${A}`)} Tìm ${tm(`C_${RR} A`)}.`, opts:[good,...W].map(tm), ans:tm(good),
    hint:'Phần bù của một nửa khoảng là nửa khoảng “phía bên kia”; đầu mút đổi từ lấy thành không lấy và ngược lại.', sol:`${tb(`C_${RR} A = ${good}`)}.`});
};
const g2e = lv => {   // bài toán thực tế (biểu đồ Ven)
  const nm=pick([['bóng đá','cầu lông'],['Toán','Văn'],['câu lạc bộ Tiếng Anh','câu lạc bộ Tin học'],['bơi','cờ vua']]);
  if(lv<3){ const both=R(3,10), a=both+R(4,15), b=both+R(4,15), none=R(0,8), N=a+b-both+none;
    if(lv===1) return QB({text:`Lớp 10A có ${a} bạn thích ${nm[0]}, ${b} bạn thích ${nm[1]}, trong đó ${both} bạn thích cả hai. Hỏi có bao nhiêu bạn thích ít nhất một trong hai môn đó?`,
      tpl:'[_] bạn', ans:[a+b-both], hint:`Dùng ${tm('|A \\cup B| = |A| + |B| - |A \\cap B|')} (các bạn thích cả hai bị đếm hai lần).`, sol:`${tm(`${a} + ${b} - ${both} = ${a+b-both}`)}. Đáp số: ${tb(a+b-both)} bạn.`});
    const ask=pick(['none','only']);
    return ask==='none'
      ? QB({text:`Lớp 10A có ${N} học sinh, trong đó ${a} bạn thích ${nm[0]}, ${b} bạn thích ${nm[1]}, ${both} bạn thích cả hai. Hỏi có bao nhiêu bạn không thích cả hai?`,
          tpl:'[_] bạn', ans:[none], hint:'Tính số bạn thích ít nhất một môn trước, rồi lấy sĩ số trừ đi.', sol:`Thích ít nhất một môn: ${tm(`${a} + ${b} - ${both} = ${a+b-both}`)}. Không thích cả hai: ${tm(`${N} - ${a+b-both} = ${none}`)}. Đáp số: ${tb(none)} bạn.`})
      : QB({text:`Lớp 10A có ${a} bạn thích ${nm[0]}, ${b} bạn thích ${nm[1]}, trong đó ${both} bạn thích cả hai. Hỏi có bao nhiêu bạn chỉ thích ${nm[0]}?`,
          tpl:'[_] bạn', ans:[a-both], hint:`“Chỉ thích ${nm[0]}” là thuộc ${tm('A')} nhưng không thuộc ${tm('B')}: ${tm('|A \\setminus B| = |A| - |A \\cap B|')}.`, sol:`${tm(`${a} - ${both} = ${a-both}`)}. Đáp số: ${tb(a-both)} bạn.`}); }
  const r=[R(2,8),R(2,8),R(2,8),R(1,5),R(1,5),R(1,5),R(1,4)]; // chỉ A, chỉ B, chỉ C, AB, BC, CA, ABC
  const A=r[0]+r[3]+r[5]+r[6], B=r[1]+r[3]+r[4]+r[6], C=r[2]+r[4]+r[5]+r[6], AB=r[3]+r[6], BC=r[4]+r[6], CA=r[5]+r[6], ABC=r[6], U=r.reduce((s,x)=>s+x,0);
  const ask=pick(['union','one']), v=ask==='union'?U:r[0]+r[1]+r[2];
  return QB({text:`Trong một nhóm học sinh: ${A} bạn giỏi Toán, ${B} bạn giỏi Lí, ${C} bạn giỏi Hoá; ${AB} bạn giỏi Toán và Lí, ${BC} bạn giỏi Lí và Hoá, ${CA} bạn giỏi Hoá và Toán; ${ABC} bạn giỏi cả ba môn. Hỏi có bao nhiêu bạn ${ask==='union'?'giỏi ít nhất một môn':'giỏi <b>đúng một</b> môn'}?`,
    tpl:'[_] bạn', ans:[v],
    hint:ask==='union'?tm('|A \\cup B \\cup C| = |A| + |B| + |C| - |A \\cap B| - |B \\cap C| - |C \\cap A| + |A \\cap B \\cap C|'):'Vẽ biểu đồ Ven, điền số từ trong ra ngoài: phần giữa (cả ba) → phần chỉ hai môn → phần chỉ một môn.',
    sol:ask==='union'?`${tm(`${A} + ${B} + ${C} - ${AB} - ${BC} - ${CA} + ${ABC} = ${U}`)}. Đáp số: ${tb(U)} bạn.`:`Chỉ giỏi Toán: ${tm(`${A} - ${AB} - ${CA} + ${ABC} = ${r[0]}`)}; chỉ Lí: ${r[1]}; chỉ Hoá: ${r[2]}. Tổng: ${tb(v)} bạn.`});
};

lesson(1,'menh-de','Bài 1. Mệnh đề','Nhận biết mệnh đề; đúng sai; phủ định; mệnh đề đảo, điều kiện cần và đủ; mệnh đề chứa ∀, ∃.',[g1a,g1b,g1c,g1d,g1e]);
lesson(1,'tap-hop','Bài 2. Tập hợp và các phép toán trên tập hợp','Phần tử, tập con; giao, hợp, hiệu, phần bù; khoảng, đoạn, nửa khoảng; biểu đồ Ven.',[g2a,g2b,g2c,g2d,g2e]);
lesson(1,'on-tap-c1','Ôn tập chương I','Tổng hợp mệnh đề và tập hợp.',[g1b,g1c,g1d,g2c,g2d,g2e]);

/* =====================================================================
   CHƯƠNG II – BÀI 3. Bất phương trình bậc nhất hai ẩn
   Quy ước KNTT: miền nghiệm là phần KHÔNG bị gạch; bờ nét đứt = không thuộc miền nghiệm.
   Một bất phương trình được lưu dạng [a, b, c, op] nghĩa là ax + by op c.
   ===================================================================== */
const OP4 = ['<','>','≤','≥'];
const FLIP = {'<':'>','>':'<','≤':'≥','≥':'≤'};
const STRICT = {'<':'≤','≤':'<','>':'≥','≥':'>'};
const L2 = (a,b) => tpoly([a,'x'],[b,'y']);
const bpt = (a,b,c,op) => `${L2(a,b)} ${op_(op)} ${c}`;
const bptR = r => bpt(...r);
const test = (v,op,c) => op==='<'?v<c-1e-9:op==='>'?v>c+1e-9:op==='≤'?v<=c+1e-9:v>=c-1e-9;
const sat = ([a,b,c,op],x,y) => test(a*x+b*y,op,c);
const P2 = (x,y) => `({${x}};\\,{${y}})`;
const hatchOf = ([a,b,c,op]) => (op==='<'||op==='≤') ? [a,b,c] : [-a,-b,-c];      // gạch phần KHÔNG thoả
const lineOf = ([a,b,c,op],lab) => [a,b,c,op==='<'||op==='>',lab];
const sub2 = (a,b,x,y) => `${a}\\cdot${tp(x)} ${b<0?'-':'+'} ${Math.abs(b)}\\cdot${tp(y)}`;
const cf = c => Math.abs(c)===1 ? '' : Math.abs(c);
// đường thẳng qua (p;0) và (0;q): qx + py = pq, rút gọn
const byIntercepts = (p,q) => { let a=q, b=p, c=p*q; const g=gcd(gcd(Math.abs(a),Math.abs(b)),Math.abs(c)); a/=g; b/=g; c/=g; if(a<0){a=-a;b=-b;c=-c;} return [a,b,c]; };
const rowC = (a,b,x,y,op,lo,hi) => { const v=a*x+b*y; const m=R(lo,hi); return op==='<'?v+Math.max(1,m):op==='≤'?v+m:op==='>'?v-Math.max(1,m):v-m; }; // hằng số c để (x;y) thoả
const view = (xs,ys) => [[Math.min(-1,...xs)-(Math.min(...xs)<0?1:0), Math.max(5,...xs)+1],[Math.min(-1,...ys)-(Math.min(...ys)<0?1:0), Math.max(5,...ys)+1]];
const gridPts = (lo,hi) => { const out=[]; for(let x=lo;x<=hi;x++) for(let y=lo;y<=hi;y++) out.push([x,y]); return shuffle(out); };
const DEF_BPT = `Bất phương trình bậc nhất hai ẩn có dạng ${tm('ax + by \\lt c')} (hoặc ${tm('\\gt,\\ \\le,\\ \\ge')}), trong đó ${tm('a, b')} không đồng thời bằng 0.`;
const MN = `Vẽ đường thẳng ${tm('d: ax + by = c')}, lấy một điểm không nằm trên ${tm('d')} (thường là gốc ${tm('O')}) thay vào: nếu thoả mãn thì nửa mặt phẳng chứa điểm đó là miền nghiệm. Bờ ${tm('d')} thuộc miền nghiệm khi có dấu “=” (${tm('\\le, \\ge')}) và được vẽ nét liền.`;

const nonLin = (op) => { const a=R(1,5), b=R(1,5), c=R(1,9), o=op_(op); return shuffle([
  {s:`${tpoly([a,'x^2'],[b,'y'])} ${o} ${c}`, why:`có ${tm('x^2')}`},
  {s:`${tpoly([a,'xy'],[b,'x'])} ${o} ${c}`, why:`có tích ${tm('xy')}`},
  {s:`${tf(a,'x')} + ${b===1?'':b}y ${o} ${c}`, why:'có ẩn ở mẫu'},
  {s:`${tpoly([a,'x'],[b,'y^2'])} ${o} ${c}`, why:`có ${tm('y^2')}`},
  {s:`0x + 0y ${o} ${c}`, why:`${tm('a = b = 0')}`, zero:true},
]); };
const g3a = lv => {   // nhận biết
  const op=pick(OP4), a=sR(1,6), b=sR(1,6), c=R(-9,9);
  const goods=[bpt(a,b,c,op), `${tpoly([a,'x'],[b,'y'],[sR(1,9),''])} ${op_(op)} 0`, `${R(2,5)}(x - ${R(1,5)}) ${op_(op)} ${poly2(b)}`, `${tpoly([R(2,5),'x'])} ${op_(op)} ${tpoly([sR(1,5),'y'],[R(1,9),''])}`];
  const W=nonLin(op);
  if(lv<3){ const good=lv===1?goods[0]:pick(goods), bad=(lv===1?W.filter(w=>!w.zero):W).slice(0,3).map(w=>w.s);
    return QC({text:'Bất phương trình nào sau đây là <b>bất phương trình bậc nhất hai ẩn</b>?', opts:[good,...bad].map(tm), ans:tm(good), hint:DEF_BPT,
      sol:`${tb(good)} đưa được về dạng ${tm('ax + by \\lt c')} (hoặc ${tm('\\gt,\\ \\le,\\ \\ge')}) với ${tm('a, b')} không đồng thời bằng 0. Các bất phương trình còn lại có ${tm('x^2')}, ${tm('y^2')}, tích ${tm('xy')}, ẩn ở mẫu hoặc ${tm('a = b = 0')}.`}); }
  const w=W[0];
  return QC({text:'Bất phương trình nào sau đây <b>không phải</b> là bất phương trình bậc nhất hai ẩn?', opts:[w.s,...shuffle(goods).slice(0,3)].map(tm), ans:tm(w.s), hint:DEF_BPT,
    sol:`${tb(w.s)} không phải bất phương trình bậc nhất hai ẩn vì ${w.why}.`});
};
const poly2 = b => tpoly([b,'y']);
const g3b = lv => {   // nghiệm của bất phương trình
  if(lv<3){ const op=pick(OP4), a=lv===1?R(1,5):sR(1,5), b=lv===1?R(1,5):sR(1,5), lo=lv===1?0:-4, hi=lv===1?5:4, x=R(lo,hi), y=R(lo,hi), c=rowC(a,b,x,y,op,0,3), r=[a,b,c,op];
    const bad=gridPts(lo,hi).filter(([p,q])=>!sat(r,p,q)).slice(0,3);
    if(bad.length<3) return g3b(lv);
    return QC({text:`Cặp số nào sau đây là nghiệm của bất phương trình ${td(bptR(r))}`, opts:[P2(x,y),...bad.map(([p,q])=>P2(p,q))].map(tm), ans:tm(P2(x,y)),
      hint:`Thay ${tm('x, y')} của từng cặp số vào vế trái rồi so sánh với vế phải. Cặp số làm bất đẳng thức đúng là nghiệm.`,
      sol:`Thay ${tm(`x = ${x},\\ y = ${y}`)}: ${tm(`${sub2(a,b,x,y)} = ${a*x+b*y} ${op_(op)} ${c}`)} (đúng). Vậy ${tb(P2(x,y))} là nghiệm.`}); }
  let a,b,y0,op,c,op2,big,ans; do{ a=sR(1,5); b=sR(1,5); y0=sR(1,4); op=pick(OP4); c=R(-10,10); op2=a>0?op:FLIP[op]; big=op2==='<'||op2==='≤';
    ans=null; for(let x=-80;x<=80;x++) if(sat([a,b,c,op],x,y0)){ if(big) ans=x; else if(ans===null) ans=x; }
  }while(ans===null||Math.abs(ans)>40);
  const rhs=c-b*y0;
  return QB({text:`Tìm số nguyên ${tm('x')} <b>${big?'lớn nhất':'nhỏ nhất'}</b> sao cho cặp số ${tm(P2('x',y0))} là nghiệm của bất phương trình ${td(bpt(a,b,c,op))}`,
    tpl:`<span class="eq">${tm('x =')} [_]</span>`, ans:[ans],
    hint:`Thay ${tm(`y = ${y0}`)} vào, được bất phương trình bậc nhất một ẩn ${tm('x')}. Giải rồi chọn số nguyên thích hợp (chia cho số âm thì đổi chiều).`,
    sol:`Thay ${tm(`y = ${y0}`)}: ${tm(`${tpoly([a,'x'])} ${b*y0<0?'-':'+'} ${Math.abs(b*y0)} ${op_(op)} ${c}\\;\\Leftrightarrow\\;${tpoly([a,'x'])} ${op_(op)} ${rhs}\\;\\Leftrightarrow\\;x ${op_(op2)} ${tfrac(rhs,a)}`)}${a<0?' (chia cho số âm, đổi chiều)':''}. Số nguyên ${big?'lớn nhất':'nhỏ nhất'} là ${tb(ans)}.`});
};
const g3c = lv => {   // miền nghiệm
  if(lv<3){ let p,q; do{ p=lv===1?R(1,5):sR(1,5); q=lv===1?R(1,5):sR(1,5); }while(lv===2&&p>0&&q>0);
    const [a,b,c]=byIntercepts(p,q), op=pick(OP4), r=[a,b,c,op], [vx,vy]=view([p],[q]);
    const fig=planeSVG({x:vx,y:vy,lines:[lineOf(r,'d')],hatch:[hatchOf(r)]});
    const good=bptR(r), alt=p!==q?byIntercepts(q,p):[a,-b,c];
    const opts=[good,bpt(a,b,c,FLIP[op]),bpt(a,b,c,STRICT[op]),bpt(alt[0],alt[1],alt[2],op)];
    const inO=sat(r,0,0), strict=op==='<'||op==='>';
    return QC({text:'Phần <b>không bị gạch</b> trong hình là miền nghiệm của bất phương trình nào? (Bờ nét liền: thuộc miền nghiệm; nét đứt: không thuộc.)', fig, opts:opts.map(tm), ans:tm(good), hint:MN,
      sol:`Đường thẳng ${tm('d')} đi qua ${tm(`(${p};\\,0)`)} và ${tm(`(0;\\,${q})`)} nên có phương trình ${tm(`${L2(a,b)} = ${c}`)}. Gốc ${tm('O')} ${inO?'thuộc':'không thuộc'} phần không bị gạch, nên thay ${tm('O')} vào bất phương trình phải được khẳng định ${inO?'đúng':'sai'}: ${tm(`0 ${op_(op)} ${c}`)}. Bờ vẽ nét ${strict?'đứt nên không có':'liền nên có'} dấu “=”. Đáp án: ${tb(good)}.`}); }
  let a,b,c,op; do{ a=sR(1,5); b=sR(1,5); c=sR(1,9); op=pick(OP4); }while(gcd(gcd(Math.abs(a),Math.abs(b)),Math.abs(c))!==1);
  const m=R(2,4), k=sR(1,5);
  const lhs=`${m}(${tpoly([1,'x'],[k,''])}) ${b<0?'-':'+'} ${cf(b)}y`, rhs=tpoly([m-a,'x'],[c+m*k,'']);
  const inO=test(0,op,c), strict=op==='<'||op==='>';
  const O4=['chứa gốc O, kể cả bờ d','chứa gốc O, không kể bờ d','không chứa gốc O, kể cả bờ d','không chứa gốc O, không kể bờ d'];
  const good=O4[(inO?0:2)+(strict?1:0)];
  return QC({text:`Miền nghiệm của bất phương trình ${td(`${lhs} ${op_(op)} ${rhs}`)}là nửa mặt phẳng bờ ${tm(`d: ${L2(a,b)} = ${c}`)}`, opts:O4.map(s=>'Nửa mặt phẳng '+s), ans:'Nửa mặt phẳng '+good, keepOrder:true,
    hint:`Biến đổi bất phương trình về dạng ${tm('ax + by \\lt c')} (hoặc ${tm('\\gt, \\le, \\ge')}), rồi thay toạ độ gốc ${tm('O(0;\\,0)')} để kiểm tra. Dấu “=” cho biết bờ có thuộc miền nghiệm không.`,
    sol:`Khai triển và chuyển vế: ${tm(bpt(a,b,c,op))}. Thay ${tm('O(0;\\,0)')}: ${tm(`0 ${op_(op)} ${c}`)} ${inO?'đúng':'sai'}, nên miền nghiệm ${inO?'':'không '}chứa ${tm('O')}; dấu ${tm(op_(op))} ${strict?'không có':'có'} “=” nên ${strict?'không kể':'kể cả'} bờ. Đáp án: <b>nửa mặt phẳng ${good}</b>.`});
};
const g3d = lv => {   // bài toán thực tế
  const nm=pick(NAMES), ctx=pick([
    ()=>{const p=pick([20,25,30,40]),q=pick([35,45,50,60]),T=pick([200,250,300,400]);return {p,q,T,op:'≤',story:`${nm} có <b>${T} nghìn đồng</b> để mua ${tm('x')} kg cam (giá ${p} nghìn đồng/kg) và ${tm('y')} kg táo (giá ${q} nghìn đồng/kg). Số tiền mua <b>không vượt quá</b> số tiền ${nm} có.`,unit:'kg táo',ux:'kg cam'}},
    ()=>{const p=pick([40,50,60]),q=pick([25,30,35]),T=pick([600,800,1000]);return {p,q,T,op:'≤',story:`Một xe tải chở ${tm('x')} thùng hàng loại A (mỗi thùng ${p} kg) và ${tm('y')} thùng hàng loại B (mỗi thùng ${q} kg). Tải trọng của xe <b>không quá</b> ${T} kg.`,unit:'thùng loại B',ux:'thùng loại A'}},
    ()=>{const p=pick([120,150]),q=pick([70,80,90]),T=pick([900,1000,1200]);return {p,q,T,op:'≥',story:`Mỗi cốc sữa cung cấp ${p} calo, mỗi quả trứng cung cấp ${q} calo. Bữa sáng của ${nm} gồm ${tm('x')} cốc sữa và ${tm('y')} quả trứng, cần cung cấp <b>ít nhất</b> ${T} calo.`,unit:'quả trứng',ux:'cốc sữa'}},
  ])(); const {p,q,T,op}=ctx, r=[p,q,T,op];
  if(lv===1){ const good=bptR(r), opts=[good,bpt(p,q,T,FLIP[op]),bpt(q,p,T,op),bpt(p,q,T,STRICT[op])];
    return QC({text:`${ctx.story} Bất phương trình nào mô tả điều kiện của bài toán?`, opts:opts.map(tm), ans:tm(good),
      hint:'Tính tổng (số lượng × giá trị mỗi loại) rồi so sánh với giới hạn: “không quá, tối đa” → ≤; “ít nhất, không dưới” → ≥.',
      sol:`Tổng là ${tm(L2(p,q))}; điều kiện “${op==='≤'?'không quá':'ít nhất'}” cho ta ${tb(good)}.`}); }
  if(lv===2){ let x,y,k=0; do{x=R(1,12);y=R(1,12);k++}while((!sat(r,x,y)||Math.abs(p*x+q*y-T)>T*.4)&&k<500); if(k>=500) return g3d(lv);
    const bad=[]; for(const [dx,dy] of shuffle([[1,1],[2,0],[0,2],[3,1],[1,3],[2,2],[4,0],[0,4],[-1,-1],[-2,0],[0,-2],[-3,-1]])){const P=[x+dx,y+dy]; if(P[0]>=0&&P[1]>=0&&!sat(r,...P)&&bad.length<3) bad.push(P);}
    if(bad.length<3) return g3d(lv);
    return QC({text:`${ctx.story} Phương án ${tm('(x;\\,y)')} nào sau đây thoả mãn điều kiện?`, opts:[P2(x,y),...bad.map(b=>P2(...b))].map(tm), ans:tm(P2(x,y)),
      hint:`Lập bất phương trình ${tm(`${L2(p,q)} ${op_(op)} ${T}`)} rồi thay từng phương án vào kiểm tra.`,
      sol:`Điều kiện: ${tm(bptR(r))}. Với ${tm(P2(x,y))}: ${tm(`${sub2(p,q,x,y)} = ${p*x+q*y} ${op_(op)} ${T}`)} ✓. Đáp án: ${tb(P2(x,y))}.`}); }
  let x0,ans; do{ x0=R(1,6); ans=op==='≤'?Math.floor((T-p*x0)/q):Math.ceil((T-p*x0)/q); }while(ans<1);
  return QB({text:`${ctx.story} Nếu ${tm(`x = ${x0}`)} thì ${tm('y')} ${op==='≤'?'lớn nhất':'nhỏ nhất'} bằng bao nhiêu (${tm('y')} là số tự nhiên)?`, tpl:`[_] ${ctx.unit}`, ans:[ans],
    hint:`Lập bất phương trình ${tm(`${L2(p,q)} ${op_(op)} ${T}`)}, thay ${tm(`x = ${x0}`)} rồi giải tìm ${tm('y')}.`,
    sol:`${tm(`${p}\\cdot ${x0} + ${q}y ${op_(op)} ${T}\\;\\Leftrightarrow\\;${q}y ${op_(op)} ${T-p*x0}\\;\\Leftrightarrow\\;y ${op_(op)} ${tfrac(T-p*x0,q)}`)}. Số tự nhiên ${op==='≤'?'lớn nhất':'nhỏ nhất'} là ${tb(ans)}.`});
};

/* =====================================================================
   BÀI 4. Hệ bất phương trình bậc nhất hai ẩn
   ===================================================================== */
const sysT = rows => tsys(rows.map(r=>typeof r==='string'?r:bptR(r)));
const X0=[1,0,0,'≥'], Y0=[0,1,0,'≥'];
const rowTxt = r => r[0]===1&&r[1]===0&&r[2]===0 ? `x ${op_(r[3])} 0` : r[0]===0&&r[1]===1&&r[2]===0 ? `y ${op_(r[3])} 0` : bptR(r);
const sysR = rows => tsys(rows.map(rowTxt));
const g4a = lv => {   // nhận biết hệ
  const op=pick(OP4), mk=()=>{const a=sR(1,5),b=sR(1,5);return bpt(a,b,R(-9,9),pick(OP4))};
  const goodS=()=>lv===3&&Math.random()<.5?[mk(),mk(),pick(['x \\ge 0','y \\ge 0'])]:[mk(),mk()];
  const bad=()=>{const g=goodS(), i=R(0,g.length-1); g[i]=nonLin(pick(OP4)).find(w=>!w.zero).s; return g;};
  const hint=`Hệ bất phương trình bậc nhất hai ẩn gồm các bất phương trình bậc nhất hai ẩn. Chỉ cần một bất phương trình có ${tm('x^2')}, ${tm('y^2')}, ${tm('xy')} hoặc ẩn ở mẫu là không được.`;
  if(lv<3){ const good=tsys(goodS());
    return QC({text:'Hệ nào sau đây là <b>hệ bất phương trình bậc nhất hai ẩn</b>?', opts:[good,tsys(bad()),tsys(bad()),tsys(bad())].map(tm), ans:tm(good), hint,
      sol:`Trong ${tb(good)} mọi bất phương trình đều bậc nhất hai ẩn. Mỗi hệ còn lại có một bất phương trình không bậc nhất.`}); }
  const b=tsys(bad());
  return QC({text:'Hệ nào sau đây <b>không phải</b> là hệ bất phương trình bậc nhất hai ẩn?', opts:[b,tsys(goodS()),tsys(goodS()),tsys(goodS())].map(tm), ans:tm(b), hint,
    sol:`${tb(b)} có một bất phương trình không phải bậc nhất hai ẩn.`});
};
const g4b = lv => {   // nghiệm của hệ
  const lo=lv===1?0:-4, hi=lv===1?5:4, x=R(lv===3?0:lo,hi), y=R(lv===3?0:lo,hi);
  let rows=[]; const n=lv===3?2:2;
  for(let i=0;i<n;i++){ const a=sR(1,4), b=sR(1,4), op=pick(OP4); rows.push([a,b,rowC(a,b,x,y,op,0,2),op]); }
  if(lv===3) rows=[X0,Y0,...rows];
  const all=(p,q)=>rows.every(r=>sat(r,p,q));
  const cand=gridPts(lv===3?-2:lo,hi).filter(([p,q])=>!all(p,q)), part=cand.filter(([p,q])=>rows.some(r=>sat(r,p,q))&&(lv<3||p>=0&&q>=0));
  const bad=[...part,...cand].filter((v,i,A)=>A.findIndex(w=>w[0]===v[0]&&w[1]===v[1])===i).slice(0,3);
  if(bad.length<3) return g4b(lv);
  const chk=rows.filter(r=>r[2]!==0||r[0]*r[1]!==0).map(r=>tm(`${sub2(r[0],r[1],x,y)} = ${r[0]*x+r[1]*y} ${op_(r[3])} ${r[2]}`)+' ✓').join('; ');
  return QC({text:`Cặp số nào sau đây là nghiệm của hệ bất phương trình ${td(sysR(rows))}`, opts:[P2(x,y),...bad.map(v=>P2(...v))].map(tm), ans:tm(P2(x,y)),
    hint:'Nghiệm của hệ phải thoả mãn <b>tất cả</b> các bất phương trình. Có cặp số chỉ thoả mãn một bất phương trình – hãy kiểm tra hết.',
    sol:`Với ${tm(P2(x,y))}${lv===3?` (${tm('x, y \\ge 0')})`:''}: ${chk}. Vậy ${tb(P2(x,y))} là nghiệm của hệ.`});
};
const verts = rows => { const V=[];
  for(let i=0;i<rows.length;i++) for(let j=i+1;j<rows.length;j++){ const [a1,b1,c1]=rows[i],[a2,b2,c2]=rows[j], D=a1*b2-a2*b1; if(!D) continue;
    const x=(c1*b2-c2*b1)/D, y=(a1*c2-a2*c1)/D;
    if(rows.every(r=>sat(r,x,y)) && !V.some(v=>Math.abs(v[0]-x)<1e-9&&Math.abs(v[1]-y)<1e-9)) V.push([x,y]); }
  const cx=V.reduce((s,v)=>s+v[0],0)/V.length, cy=V.reduce((s,v)=>s+v[1],0)/V.length;
  return V.sort((p,q)=>Math.atan2(p[1]-cy,p[0]-cx)-Math.atan2(q[1]-cy,q[0]-cx)); };
const g4c = lv => {   // miền nghiệm của hệ (hình)
  let rows, ok;
  do{ if(lv===1){ const p=R(2,6), q=R(2,6), [a,b,c]=byIntercepts(p,q); rows=[X0,Y0,[a,b,c,'≤']]; }
    else if(lv===2){ let p1,q1,p2,q2; do{p1=R(3,7);q1=R(3,7);p2=R(1,p1-1);q2=R(1,q1-1)}while(p1*q2===p2*q1);
      rows=[X0,Y0,[...byIntercepts(p1,q1),'≤'],[...byIntercepts(p2,q2),'≥']]; }
    else { const p1=R(3,6), q1=R(3,6), p2=sR(1,4), q2=sR(1,4);
      rows=[Y0,[...byIntercepts(p1,q1),pick(['≤','<'])],[...byIntercepts(p2,q2),pick(OP4)]]; }
    const V=verts(rows.map(r=>r)); ok=V.length>=3 && gridPts(-6,8).filter(([x,y])=>rows.every(r=>sat(r,x,y))).length>=2;
  }while(!ok);
  const xs=[], ys=[]; rows.forEach(([a,b,c])=>{ if(a) xs.push(c/a); if(b) ys.push(c/b); });
  const [vx,vy]=view(xs.map(Math.round),ys.map(Math.round));
  const fig=planeSVG({x:vx,y:vy,lines:rows.filter(r=>r[2]!==0||r[0]*r[1]!==0).map(r=>lineOf(r)),hatch:rows.map(hatchOf)});
  const good=sysR(rows), idx=shuffle(rows.map((_,i)=>i)).slice(0,3);
  const opts=[good,...idx.map(i=>sysR(rows.map((r,j)=>j===i?[r[0],r[1],r[2],FLIP[r[3]]]:r)))];
  return QC({text:'Phần <b>không bị gạch</b> trong hình (kể cả bờ nét liền, không kể bờ nét đứt) là miền nghiệm của hệ bất phương trình nào?', fig, opts:opts.map(tm), ans:tm(good),
    hint:`Miền nghiệm của hệ là phần chung của miền nghiệm các bất phương trình. Với từng đường thẳng, lấy một điểm trong phần không bị gạch (ví dụ một điểm có toạ độ nguyên) thay vào để chọn đúng chiều của dấu.`,
    sol:`Lấy một điểm trong phần không bị gạch và kiểm tra từng bất phương trình; mỗi hệ sai có đúng một bất phương trình bị đổi chiều. Đáp án: ${tb(good)}.`});
};
// Sinh miền tứ giác OABC: x ≥ 0, y ≥ 0, r1, r2 (dấu ≤) với các đỉnh toạ độ nguyên
const genPoly = () => { for(;;){ const u=R(1,5), v=R(1,5), a1=R(1,4), b1=R(1,4), a2=R(1,4), b2=R(1,4);
  if(a1*b2===a2*b1) continue; const c1=a1*u+b1*v, c2=a2*u+b2*v;
  if(gcd(gcd(a1,b1),c1)!==1||gcd(gcd(a2,b2),c2)!==1||c1>24||c2>24) continue;
  const rows=[X0,Y0,[a1,b1,c1,'≤'],[a2,b2,c2,'≤']], V=verts(rows);
  if(V.length!==4||!V.every(p=>Number.isInteger(p[0])&&Number.isInteger(p[1]))) continue;
  const O=V.find(p=>!p[0]&&!p[1]), A=V.find(p=>p[1]===0&&p[0]>0), C=V.find(p=>p[0]===0&&p[1]>0), B=V.find(p=>p[0]>0&&p[1]>0);
  if(!O||!A||!B||!C) continue;
  return {rows, V:[['O',...O],['A',...A],['B',...B],['C',...C]]}; } };
const fStr = (al,be) => `F = ${tpoly([al,'x'],[be,'y'])}`;
const optSol = (V,al,be,max) => { const vals=V.map(([n,x,y])=>[n,x,y,al*x+be*y]), best=(max?Math.max:Math.min)(...vals.map(v=>v[3]));
  return {best, table:vals.map(([n,x,y,f])=>tm(`F(${n}) = ${sub2(al,be,x,y)} = ${f}`)).join('; ')}; };
const OPT_HINT = `Giá trị lớn nhất, nhỏ nhất của ${tm('F = ax + by')} trên miền đa giác đạt tại <b>một đỉnh</b> của đa giác. Tính ${tm('F')} tại mọi đỉnh rồi so sánh.`;
const g4d = lv => {   // GTLN, GTNN của F = ax + by
  const {rows,V}=genPoly(), max=lv===2?Math.random()<.5:true;
  const al=R(1,5), be=lv===2?-R(1,5):R(1,5), {best,table}=optSol(V,al,be,max);
  const vt=V.map(([n,x,y])=>tm(`${n}${P2(x,y)}`)).join(', ');
  const [vx,vy]=view(V.map(v=>v[1]),V.map(v=>v[2]));
  const txt = lv===1 ? `Miền nghiệm của một hệ bất phương trình là tứ giác ${tm('OABC')} với ${vt}.`
    : lv===2 ? 'Miền nghiệm của một hệ bất phương trình là tứ giác <b>không bị gạch</b> trong hình.'
    : `Cho hệ bất phương trình ${td(sysR(rows))}`;
  const fig = lv===2 ? planeSVG({x:vx,y:vy,lines:rows.slice(2).map(r=>lineOf(r)),hatch:rows.map(hatchOf),pts:V.map(([n,x,y])=>[x,y,n==='O'?'':n])}) : undefined;
  return QB({text:`${txt} Tìm giá trị <b>${max?'lớn nhất':'nhỏ nhất'}</b> của biểu thức ${tm(fStr(al,be))} trên miền nghiệm${lv===3?' của hệ':''}.`, fig,
    tpl:`<span class="eq">${tm(`F_{${max?'max':'min'}} =`)} [_]</span>`, ans:[best],
    hint:OPT_HINT+(lv===3?' Trước hết vẽ các đường thẳng, xác định miền nghiệm và tìm toạ độ các đỉnh (giao điểm của các đường thẳng).':''),
    sol:`${lv===3?`Miền nghiệm là tứ giác ${tm('OABC')} với ${vt}. `:''}Ta có ${table}. Vậy ${tb(`F_{${max?'max':'min'}} = ${best}`)}.`});
};
const g4e = lv => {   // bài toán tối ưu thực tế
  const {rows,V}=genPoly(), [,, [a1,b1,c1], [a2,b2,c2]]=rows;
  const al=pick([20,30,40,50]), be=pick([30,40,50,60].filter(v=>v!==al));
  const story=`Một xưởng làm hai loại sản phẩm I và II. Mỗi sản phẩm I cần ${a1} giờ trên máy A và ${a2} giờ trên máy B; mỗi sản phẩm II cần ${b1} giờ trên máy A và ${b2} giờ trên máy B. Mỗi ngày máy A làm được <b>tối đa ${c1} giờ</b>, máy B <b>tối đa ${c2} giờ</b>. Gọi ${tm('x, y')} là số sản phẩm I, II làm trong một ngày.`;
  const good=sysR(rows);
  if(lv===1){ const opts=[...new Set([good, sysR([X0,Y0,[a1,b1,c1,'≥'],[a2,b2,c2,'≥']]), sysR([X0,Y0,[a1,a2,c1,'≤'],[b1,b2,c2,'≤']]), sysR([X0,Y0,[b1,a1,c1,'≤'],[b2,a2,c2,'≤']]), sysR([X0,Y0,[a1,b1,c2,'≤'],[a2,b2,c1,'≤']]), sysR([X0,Y0,[a1,b1,c1,'≤'],[a2,b2,c2,'≥']])])].slice(0,4);
    return QC({text:`${story} Hệ bất phương trình nào mô tả điều kiện của bài toán?`, opts:opts.map(tm), ans:tm(good),
      hint:`Mỗi máy cho một bất phương trình: (giờ cho sản phẩm I)·${tm('x')} + (giờ cho sản phẩm II)·${tm('y')} ${tm('\\le')} số giờ tối đa. Nhớ thêm ${tm('x \\ge 0,\\ y \\ge 0')}.`,
      sol:`Máy A: ${tm(`${L2(a1,b1)} \\le ${c1}`)}; máy B: ${tm(`${L2(a2,b2)} \\le ${c2}`)}; cùng với ${tm('x \\ge 0,\\ y \\ge 0')}. Đáp án: ${tb(good)}.`}); }
  const {best,table}=optSol(V,al,be,true), vt=V.map(([n,x,y])=>tm(`${n}${P2(x,y)}`)).join(', ');
  return QB({text:`${story} Tiền lãi mỗi sản phẩm I là ${al} nghìn đồng, mỗi sản phẩm II là ${be} nghìn đồng.`+(lv===2?` Biết miền nghiệm của hệ điều kiện là tứ giác ${tm('OABC')} với ${vt}.`:'')+' Hỏi mỗi ngày xưởng lãi <b>nhiều nhất</b> bao nhiêu?',
    tpl:'[_] nghìn đồng', ans:[best], wide:true,
    hint:`Tiền lãi ${tm(`F = ${al}x + ${be}y`)} (nghìn đồng). `+OPT_HINT+(lv===3?` Trước hết lập hệ bất phương trình và tìm các đỉnh của miền nghiệm.`:''),
    sol:`${lv===3?`Hệ điều kiện ${tm(good)}; miền nghiệm là tứ giác ${tm('OABC')} với ${vt}. `:''}Tiền lãi ${tm(`F = ${al}x + ${be}y`)}: ${table}. Lãi nhiều nhất <b>${fmt(best)} nghìn đồng</b>.`});
};

lesson(2,'bat-phuong-trinh-hai-an','Bài 3. Bất phương trình bậc nhất hai ẩn','Nhận biết; nghiệm của bất phương trình; miền nghiệm trên mặt phẳng toạ độ; bài toán thực tế.',[g3a,g3b,g3c,g3d]);
lesson(2,'he-bat-phuong-trinh-hai-an','Bài 4. Hệ bất phương trình bậc nhất hai ẩn','Nhận biết hệ; nghiệm của hệ; miền nghiệm (hình); giá trị lớn nhất, nhỏ nhất của F = ax + by; bài toán tối ưu.',[g4a,g4b,g4c,g4d,g4e]);
lesson(2,'on-tap-c2','Ôn tập chương II','Tổng hợp: nghiệm và miền nghiệm của bất phương trình, hệ bất phương trình; bài toán tối ưu.',[g3b,g3c,g4b,g4c,g4d,g4e]);

/* =====================================================================
   CHƯƠNG III – HỆ THỨC LƯỢNG TRONG TAM GIÁC (Bài 5 · Bài 6)
   Viết trong khối { } để tên hằng không trùng với các chương trước.
   ===================================================================== */
{
const DG = d => `${d}^\\circ`;
const H = tf(1,2), R2 = tf('\\sqrt{2}',2), R3 = tf('\\sqrt{3}',2), T3 = tf('\\sqrt{3}',3), S3 = '\\sqrt{3}';
const neg = v => v === '0' ? '0' : '-' + v;
const VAL = {                                   // giá trị lượng giác (LaTeX); null = không xác định
  sin:{0:'0',30:H,45:R2,60:R3,90:'1',120:R3,135:R2,150:H,180:'0'},
  cos:{0:'1',30:R3,45:R2,60:H,90:'0',120:neg(H),135:neg(R2),150:neg(R3),180:'-1'},
  tan:{0:'0',30:T3,45:'1',60:S3,90:null,120:neg(S3),135:'-1',150:neg(T3),180:'0'},
  cot:{0:null,30:S3,45:'1',60:T3,90:'0',120:neg(T3),135:'-1',150:neg(S3),180:null},
};
const NUM = {sin:d=>Math.sin(d*Math.PI/180), cos:d=>Math.cos(d*Math.PI/180)};
const POOLV = ['0','1','-1',H,neg(H),R2,neg(R2),R3,neg(R3),S3,neg(S3),T3,neg(T3)];
const blank = v => `<span class="eq">${tm(`${v} =`)} [_]</span>`;
const fblank = v => `<span class="eq">${tm(`${v} =`)} [F]</span>`;
const TABLE = `${tm(`\\sin(180^\\circ - \\alpha) = \\sin\\alpha`)}, ${tm(`\\cos(180^\\circ - \\alpha) = -\\cos\\alpha`)}, ${tm(`\\tan(180^\\circ - \\alpha) = -\\tan\\alpha`)}, ${tm(`\\cot(180^\\circ - \\alpha) = -\\cot\\alpha`)}`;
const TRIP = [[3,4,5],[5,12,13],[8,15,17],[7,24,25],[20,21,29]];

/* ---------------- BÀI 5. Giá trị lượng giác của một góc từ 0° đến 180° ---------------- */
const g5a = lv => {   // giá trị lượng giác của góc đặc biệt
  const hint = `Dùng bảng giá trị của ${tm('0^\\circ, 30^\\circ, 45^\\circ, 60^\\circ, 90^\\circ')} và công thức góc bù: ${TABLE}.`;
  if(lv < 3){ let f, d; do{ f = pick(['sin','cos','tan','cot']); d = pick(lv===1 ? [0,30,45,60,90] : [120,135,150,180]); }while(VAL[f][d] == null);
    const good = VAL[f][d], opp = good.startsWith('-') ? good.slice(1) : neg(good);
    const others = [...new Set([opp, ...shuffle(POOLV)])].filter(v => v !== good).slice(0,3);
    return QC({text:`${tm(`\\${f} ${DG(d)}`)} bằng`, opts:[good,...others].map(tm), ans:tm(good), hint,
      sol:(d > 90 ? `${tm(`\\${f} ${DG(d)} = ${f==='sin'?'':'-'}\\${f} ${DG(180-d)}`)} ${tm('=')} ` : `Theo bảng giá trị: ${tm(`\\${f} ${DG(d)} =`)} `) + `${tb(good)}.`}); }
  const bad = pick([['tan',90],['cot',0],['cot',180]]), goods = shuffle([['sin',90],['cos',90],['tan',0],['cot',90],['tan',180],['sin',180],['cos',0]]).slice(0,3);
  const S = ([f,d]) => `\\${f} ${DG(d)}`;
  return QC({text:'Giá trị lượng giác nào sau đây <b>không xác định</b>?', opts:[bad,...goods].map(x => tm(S(x))), ans:tm(S(bad)),
    hint:`${tm('\\tan\\alpha = \\dfrac{\\sin\\alpha}{\\cos\\alpha}')} chỉ xác định khi ${tm('\\cos\\alpha \\ne 0')}; ${tm('\\cot\\alpha = \\dfrac{\\cos\\alpha}{\\sin\\alpha}')} chỉ xác định khi ${tm('\\sin\\alpha \\ne 0')}.`,
    sol:`${tm(S(bad))}: ${bad[0]==='tan' ? tm('\\cos 90^\\circ = 0') : tm(`\\sin ${DG(bad[1])} = 0`)} nên ${tb(S(bad))} không xác định.`});
};
const g5b = lv => {   // hai góc bù nhau
  let a; do{ a = R(10,80) }while(a === 45);
  if(lv === 1){ const f = pick(['sin','cos','tan','cot']), sgn = f === 'sin' ? '' : '-';
    return QB({text:'Điền số thích hợp vào ô trống:', tpl:`<span class="eq">${tm(`\\${f} ${DG(180-a)} = ${sgn}\\${f}`)} [_]°</span>`, ans:[a],
      hint:`Hai góc bù nhau có tổng ${tm('180^\\circ')}. ${TABLE}.`, sol:`${tm(`\\${f} ${DG(180-a)} = \\${f}(180^\\circ - ${DG(a)}) = ${sgn}\\${f} ${DG(a)}`)}. Số cần điền: ${tb(a)}.`}); }
  if(lv === 2){ const b = 180 - a;
    const T = [`\\sin ${DG(b)} = \\sin ${DG(a)}`, `\\cos ${DG(b)} = -\\cos ${DG(a)}`, `\\tan ${DG(b)} = -\\tan ${DG(a)}`, `\\cot ${DG(b)} = -\\cot ${DG(a)}`];
    const F = [`\\sin ${DG(b)} = -\\sin ${DG(a)}`, `\\cos ${DG(b)} = \\cos ${DG(a)}`, `\\tan ${DG(b)} = \\tan ${DG(a)}`, `\\cot ${DG(b)} = \\cot ${DG(a)}`, `\\sin ${DG(b)} = \\cos ${DG(a)}`];
    const good = pick(T);
    return QC({text:'Khẳng định nào sau đây <b>đúng</b>?', opts:[good,...shuffle(F).slice(0,3)].map(tm), ans:tm(good), hint:TABLE + '.',
      sol:`${tm(`${DG(a)} + ${DG(b)} = 180^\\circ`)} (hai góc bù nhau) nên ${tb(good)}.`}); }
  let b, c; do{ b = R(10,80); c = R(10,80) }while(new Set([a,b,c]).size < 3 || b === 45 || c === 45);
  const k = [R(1,3),R(1,3),R(1,3)], s = [1,pick([1,-1]),pick([1,-1])];
  const T = [[tf(`\\sin ${DG(180-a)}`,`\\sin ${DG(a)}`), 1], [tf(`\\cos ${DG(180-b)}`,`\\cos ${DG(b)}`), -1], [tf(`\\tan ${DG(c)}`,`\\tan ${DG(180-c)}`), -1]];
  const v = T.reduce((t,[,x],i) => t + s[i]*k[i]*x, 0);
  const E = T.map(([e],i) => (i ? (s[i]<0?' - ':' + ') : '') + (k[i]>1 ? `${k[i]}\\cdot` : '') + e).join('');
  const E2 = T.map(([,x],i) => (i ? (s[i]<0?' - ':' + ') : '') + (k[i]>1 ? `${k[i]}\\cdot` : '') + tp(x)).join('');
  return QB({text:`Tính giá trị biểu thức (không dùng máy tính): ${td(`E = ${E}`)}`, tpl:blank('E'), ans:[v], hint:TABLE + '.',
    sol:`${tm(`\\sin ${DG(180-a)} = \\sin ${DG(a)}`)}; ${tm(`\\cos ${DG(180-b)} = -\\cos ${DG(b)}`)}; ${tm(`\\tan ${DG(180-c)} = -\\tan ${DG(c)}`)}. Các phân số lần lượt bằng ${tm('1,\\ -1,\\ -1')}. ${tm(`E = ${E2} =`)} ${tb(v)}.`});
};
const g5c = lv => {   // dấu và tính giá trị khi biết một giá trị
  if(lv === 1){ const T = ['\\sin\\alpha \\gt 0','\\cos\\alpha \\lt 0','\\tan\\alpha \\lt 0','\\cot\\alpha \\lt 0'], F = ['\\sin\\alpha \\lt 0','\\cos\\alpha \\gt 0','\\tan\\alpha \\gt 0','\\cot\\alpha \\gt 0'];
    const good = pick(T);
    return QC({text:`Cho ${tm('\\alpha')} là góc tù (${tm('90^\\circ \\lt \\alpha \\lt 180^\\circ')}). Khẳng định nào sau đây đúng?`, opts:[good,...shuffle(F).slice(0,3)].map(tm), ans:tm(good),
      hint:`Điểm ${tm('M(x_0;\\,y_0)')} trên nửa đường tròn đơn vị với góc tù có hoành độ âm, tung độ dương: ${tm('\\sin\\alpha = y_0,\\ \\cos\\alpha = x_0')}.`,
      sol:`Với góc tù: ${tm('\\sin\\alpha \\gt 0')}, ${tm('\\cos\\alpha \\lt 0')} nên ${tm('\\tan\\alpha \\lt 0')}, ${tm('\\cot\\alpha \\lt 0')}. Đáp án: ${tb(good)}.`}); }
  const [p,q,h] = pick(TRIP), sw = Math.random() < .5, o = sw ? p : q, a = sw ? q : p;   // sin = o/h, |cos| = a/h
  if(lv === 2){ const givenSin = Math.random() < .5;
    return givenSin
      ? QB({text:`Cho ${tm(`\\sin\\alpha = ${tf(o,h)}`)} với ${tm('90^\\circ \\lt \\alpha \\lt 180^\\circ')}. Tính ${tm('\\cos\\alpha')}.`, tpl:fblank('\\cos\\alpha'), ans:[{frac:[-a,h],mode:'eq'}],
          hint:`Dùng ${tm('\\sin^2\\alpha + \\cos^2\\alpha = 1')}; góc tù nên ${tm('\\cos\\alpha \\lt 0')}.`,
          sol:`${tm(`\\cos^2\\alpha = 1 - ${tf(o*o,h*h)} = ${tf(a*a,h*h)}`)}; vì ${tm('\\alpha')} tù nên ${tm(`\\cos\\alpha = `)}${tb(`-${tf(a,h)}`)}.`})
      : QB({text:`Cho ${tm(`\\cos\\alpha = -${tf(a,h)}`)} với ${tm('0^\\circ \\le \\alpha \\le 180^\\circ')}. Tính ${tm('\\sin\\alpha')}.`, tpl:fblank('\\sin\\alpha'), ans:[{frac:[o,h],mode:'eq'}],
          hint:`Dùng ${tm('\\sin^2\\alpha + \\cos^2\\alpha = 1')}; với ${tm('0^\\circ \\le \\alpha \\le 180^\\circ')} thì ${tm('\\sin\\alpha \\ge 0')}.`,
          sol:`${tm(`\\sin^2\\alpha = 1 - ${tf(a*a,h*h)} = ${tf(o*o,h*h)}`)}; vì ${tm('\\sin\\alpha \\ge 0')} nên ${tm('\\sin\\alpha = ')}${tb(tf(o,h))}.`}); }
  const askTan = Math.random() < .5;
  return askTan
    ? QB({text:`Cho ${tm(`\\cos\\alpha = -${tf(a,h)}`)} với ${tm('0^\\circ \\le \\alpha \\le 180^\\circ')}. Tính ${tm('\\tan\\alpha')}.`, tpl:fblank('\\tan\\alpha'), ans:[{frac:[-o,a],mode:'eq'}],
        hint:`Tính ${tm('\\sin\\alpha')} từ ${tm('\\sin^2\\alpha + \\cos^2\\alpha = 1')} (chú ý ${tm('\\sin\\alpha \\ge 0')}), rồi ${tm('\\tan\\alpha = \\dfrac{\\sin\\alpha}{\\cos\\alpha}')}.`,
        sol:`${tm(`\\sin\\alpha = \\sqrt{1 - ${tf(a*a,h*h)}} = ${tf(o,h)}`)}; ${tm(`\\tan\\alpha = ${tf(o,h)} : \\left(-${tf(a,h)}\\right) = `)}${tb(`-${tf(o,a)}`)}.`})
    : QB({text:`Cho ${tm(`\\tan\\alpha = -${tf(o,a)}`)} với ${tm('0^\\circ \\le \\alpha \\le 180^\\circ')}. Tính ${tm('\\cos\\alpha')}.`, tpl:fblank('\\cos\\alpha'), ans:[{frac:[-a,h],mode:'eq'}],
        hint:`${tm('\\tan\\alpha \\lt 0')} nên ${tm('\\alpha')} tù, ${tm('\\cos\\alpha \\lt 0')}. Dùng ${tm('1 + \\tan^2\\alpha = \\dfrac{1}{\\cos^2\\alpha}')}.`,
        sol:`${tm(`\\dfrac{1}{\\cos^2\\alpha} = 1 + ${tf(o*o,a*a)} = ${tf(h*h,a*a)}${'\\;\\Rightarrow\\;'}\\cos^2\\alpha = ${tf(a*a,h*h)}`)}; ${tm('\\alpha')} tù nên ${tm('\\cos\\alpha = ')}${tb(`-${tf(a,h)}`)}.`});
};
const TERMS5 = [['2\\sin 150^\\circ',`2\\cdot${H}`,1],['2\\cos 120^\\circ',`2\\cdot\\left(${neg(H)}\\right)`,-1],['\\tan 135^\\circ','-1',-1],['\\cot 135^\\circ','-1',-1],
  ['4\\sin^2 120^\\circ',`4\\cdot\\left(${R3}\\right)^2`,3],['2\\cos^2 135^\\circ',`2\\cdot\\left(${neg(R2)}\\right)^2`,1],[`${S3}\\tan 150^\\circ`,`${S3}\\cdot\\left(${neg(T3)}\\right)`,-1],
  [`${S3}\\cot 150^\\circ`,`${S3}\\cdot(${neg(S3)})`,-3],['\\cos 180^\\circ','-1',-1],['\\sin 90^\\circ','1',1],['\\cos 0^\\circ','1',1],['2\\sin 30^\\circ',`2\\cdot${H}`,1],['\\tan 45^\\circ','1',1],['4\\cos^2 150^\\circ',`4\\cdot\\left(${neg(R3)}\\right)^2`,3]];
const g5d = lv => {   // tính giá trị biểu thức
  const n = lv === 1 ? 2 : 3, pool = lv === 1 ? TERMS5.filter(t => !/\^2|\\sqrt/.test(t[0])) : TERMS5;
  const T = shuffle(pool).slice(0,n), s = [1, pick([1,-1]), pick([1,-1])], v = T.reduce((t,x,i) => t + s[i]*x[2], 0);
  const J = f => T.map((x,i) => (i ? (s[i]<0?' - ':' + ') : '') + f(x)).join('');
  return QB({text:`Tính giá trị biểu thức (không dùng máy tính): ${td(`E = ${J(x => x[0])}`)}`, tpl:blank('E'), ans:[v],
    hint:`Thay giá trị lượng giác của từng góc (dùng bảng giá trị đặc biệt và góc bù). Chú ý ${tm('\\sin^2\\alpha = (\\sin\\alpha)^2')}.`,
    sol:`${tm(`E = ${J(x => x[1].startsWith('-') ? `(${x[1]})` : x[1])} = ${J(x => tp(x[2]))} =`)} ${tb(v)}.`});
};

/* ---------------- BÀI 6. Hệ thức lượng trong tam giác ---------------- */
const isSqN = n => n > 0 && Number.isInteger(Math.sqrt(n));
const pairs = (A, lo=2, hi=16) => { const out = []; for(let b = lo; b <= hi; b++) for(let c = lo; c <= hi; c++){ if(b === c) continue;
  const a2 = A === 60 ? b*b + c*c - b*c : A === 120 ? b*b + c*c + b*c : b*b + c*c; if(isSqN(a2) && (A !== 90 || true)) out.push([b,c,Math.sqrt(a2)]); } return out; };
const P60 = pairs(60), P120 = pairs(120), P90 = pairs(90);
const COS = {60:'\\dfrac{1}{2}', 120:'-\\dfrac{1}{2}', 90:'0'};
const lawA = (b,c,A) => A === 60 ? `${b}^2 + ${c}^2 - 2\\cdot ${b}\\cdot ${c}\\cdot ${COS[60]}` : A === 120 ? `${b}^2 + ${c}^2 - 2\\cdot ${b}\\cdot ${c}\\cdot\\left(${COS[120]}\\right)` : `${b}^2 + ${c}^2`;
const COSLAW = `${tm('a^2 = b^2 + c^2 - 2bc\\cos A')}`;
const g6a = lv => {   // định lí côsin: tính cạnh
  if(lv < 3){ const A = lv === 1 ? pick([60,90]) : 120, [b,c,a] = pick(A===60?P60:A===120?P120:P90);
    return QB({text:`Cho tam giác ${tm('ABC')} có ${tm(`AB = ${c}`)}, ${tm(`AC = ${b}`)} và ${tm(`\\widehat{A} = ${DG(A)}`)}. Tính độ dài cạnh ${tm('BC')}.`,
      fig:triSVG({a,b,c,la:'?',lb:String(b),lc:String(c),gA:`${A}°`}), tpl:blank('BC'), ans:[a], hint:`Dùng định lí côsin: ${COSLAW}.`,
      sol:`${tm(`BC^2 = ${lawA(b,c,A)} = ${a*a}`)}, nên ${tm('BC = ')}${tb(a)}.`}); }
  // cos A cho dạng phân số
  let b,c,p,q,a2; const CS = [[1,3],[1,4],[-1,4],[2,3],[-1,3],[1,5],[-1,5],[3,4]];
  do{ b = R(2,15); c = R(2,15); [p,q] = pick(CS); a2 = b*b + c*c - 2*b*c*p/q; }while(!Number.isInteger(a2) || !isSqN(a2) || b === c);
  const a = Math.sqrt(a2), cA = p < 0 ? `-${tf(-p,q)}` : tf(p,q);
  return QB({text:`Cho tam giác ${tm('ABC')} có ${tm(`AB = ${c}`)}, ${tm(`AC = ${b}`)} và ${tm(`\\cos A = ${cA}`)}. Tính ${tm('BC')}.`, fig:triSVG({a,b,c,la:'?',lb:String(b),lc:String(c),gA:true}),
    tpl:blank('BC'), ans:[a], hint:`Dùng định lí côsin ${COSLAW} với giá trị ${tm('\\cos A')} đã cho.`,
    sol:`${tm(`BC^2 = ${b}^2 + ${c}^2 - 2\\cdot ${b}\\cdot ${c}\\cdot\\left(${cA}\\right) = ${b*b+c*c} ${p<0?'+':'-'} ${Math.abs(2*b*c*p/q)} = ${a2}`)}, nên ${tm('BC = ')}${tb(a)}.`});
};
const g6b = lv => {   // tính góc, nhận dạng tam giác
  const CF = tm('\\cos A = \\dfrac{b^2 + c^2 - a^2}{2bc}');
  if(lv === 1){ let a,b,c; do{ a = R(3,12); b = R(3,12); c = R(3,12); }while(a >= b+c || b >= a+c || c >= a+b || (b*b+c*c-a*a) === 0);
    const num = b*b + c*c - a*a, den = 2*b*c;
    return QB({text:`Cho tam giác ${tm('ABC')} có ${tm(`BC = ${a},\\ CA = ${b},\\ AB = ${c}`)}. Tính ${tm('\\cos A')}.`, fig:triSVG({a,b,c,la:String(a),lb:String(b),lc:String(c),gA:'?'}),
      tpl:fblank('\\cos A'), ans:[{frac:[num,den],mode:'eq'}], hint:`Hệ quả của định lí côsin: ${CF}.`,
      sol:`${tm(`\\cos A = \\dfrac{${b}^2 + ${c}^2 - ${a}^2}{2\\cdot ${b}\\cdot ${c}} = ${tf(num,den)} = `)}${tb(tfrac(num,den))}.`}); }
  if(lv === 2){ const A = pick([60,120,90]), [b,c,a] = pick(A===60?P60:A===120?P120:P90);
    return QB({text:`Cho tam giác ${tm('ABC')} có ${tm(`BC = ${a},\\ CA = ${b},\\ AB = ${c}`)}. Tính số đo góc ${tm('A')}.`, fig:triSVG({a,b,c,la:String(a),lb:String(b),lc:String(c),gA:'?'}),
      tpl:`<span class="eq">${tm('\\widehat{A} =')} [_]°</span>`, ans:[A], hint:`Tính ${CF} rồi suy ra góc.`,
      sol:`${tm(`\\cos A = \\dfrac{${b*b} + ${c*c} - ${a*a}}{2\\cdot ${b}\\cdot ${c}} = ${tfrac(b*b+c*c-a*a,2*b*c)}`)}, nên ${tb(`\\widehat{A} = ${DG(A)}`)}.`}); }
  const K = ['Tam giác nhọn','Tam giác vuông','Tam giác tù'];
  let a,b,c,t; do{ const s = [R(3,15),R(3,15),R(3,15)].sort((x,y) => x-y); [c,b,a] = s; t = pick([0,1,2]); if(t===1){ const [p,q,h] = pick(TRIP); const k = R(1,2); [c,b,a] = [p*k,q*k,h*k]; } }
  while(a >= b+c || (t!==1 && Math.sign(b*b+c*c-a*a) !== (t===0?1:-1)));
  const d = b*b + c*c - a*a, ans = d > 0 ? 0 : d === 0 ? 1 : 2;
  const cmp = d > 0 ? '\\gt 0' : d === 0 ? '=0' : '\\lt 0';
  return QC({text:`Tam giác có độ dài ba cạnh ${tm(`${c},\\ ${b},\\ ${a}`)} là`, opts:K, ans:K[ans], keepOrder:true,
    hint:`Góc lớn nhất đối diện cạnh lớn nhất ${tm('a')}. Xét dấu ${tm('b^2 + c^2 - a^2')} (dấu của ${tm('\\cos A')}): dương → nhọn, bằng 0 → vuông, âm → tù.`,
    sol:`Cạnh lớn nhất là ${tm(a)}. Ta có ${tm(`${b}^2+${c}^2-${a}^2=${d}\\ ${cmp}`)}, nên góc lớn nhất ${d>0?'nhọn':d===0?'vuông':'tù'}. Đó là <b>${K[ans].toLowerCase()}</b>.`});
};
// Định lí sin: các cặp góc cho kết quả đẹp. k: hệ số, r: căn (1 = số nguyên), d: mẫu cần chia hết
const SINE = [ {A:30,B:45, f:a=>[a,2], s:'a\\sqrt{2}'}, {A:30,B:60, f:a=>[a,3]}, {A:45,B:30, f:a=>[a/2,2], even:true}, {A:60,B:30, f:a=>[a/3,3], m3:true},
  {A:30,B:90, f:a=>[2*a,1]}, {A:45,B:60, f:a=>[a/2,6], even:true}, {A:60,B:45, f:a=>[a/3,6], m3:true}, {A:120,B:30, f:a=>[a/3,3], m3:true}, {A:30,B:120, f:a=>[a,3]} ];
const SINV = {30:H,45:R2,60:R3,90:'1',120:R3};
const surd = (k,r) => r === 1 ? String(k) : `${k===1?'':k}\\sqrt{${r}}`;
const g6c = lv => {   // định lí sin
  const SL = `${tm('\\dfrac{a}{\\sin A} = \\dfrac{b}{\\sin B} = \\dfrac{c}{\\sin C} = 2R')}`;
  if(lv === 1){ const A = pick([30,150,90,45,60]); let a = R(2,12); if(A===90||A===45) a = 2*R(1,8); if(A===60) a = 3*R(1,5);
    const [k,r] = A===30||A===150 ? [a,1] : A===90 ? [a/2,1] : A===45 ? [a/2,2] : [a/3,3];
    const tpl = r === 1 ? blank('R') : `<span class="eq">${tm('R =')} [_] ${tm(`\\sqrt{${r}}`)}</span>`;
    return QB({text:`Cho tam giác ${tm('ABC')} có ${tm(`BC = ${a}`)} và ${tm(`\\widehat{A} = ${DG(A)}`)}. Tính bán kính ${tm('R')} của đường tròn ngoại tiếp tam giác.`, tpl, ans:[k],
      hint:`Định lí sin: ${SL}, suy ra ${tm('R = \\dfrac{a}{2\\sin A}')}.`,
      sol:`${tm(`R = \\dfrac{${a}}{2\\sin ${DG(A)}} = \\dfrac{${a}}{2\\cdot ${A===150?H:SINV[A]}} = ${surd(k,r)}`)}. Vậy ${tb(`R = ${surd(k,r)}`)}.`}); }
  let o, a; do{ o = pick(SINE); a = R(2,12); }while((o.even && a%2) || (o.m3 && a%3) || o.A + o.B >= 180);
  const [k,r] = o.f(a), C = 180 - o.A - o.B;
  const tpl = r === 1 ? blank('AC') : `<span class="eq">${tm('AC =')} [_] ${tm(`\\sqrt{${r}}`)}</span>`;
  const given = lv === 2 ? `${tm(`\\widehat{A} = ${DG(o.A)}`)}, ${tm(`\\widehat{B} = ${DG(o.B)}`)}` : `${tm(`\\widehat{B} = ${DG(o.B)}`)}, ${tm(`\\widehat{C} = ${DG(C)}`)}`;
  return QB({text:`Cho tam giác ${tm('ABC')} có ${tm(`BC = ${a}`)}, ${given}. Tính độ dài cạnh ${tm('AC')}.`, tpl, ans:[k],
    hint:(lv===3 ? `Tính ${tm('\\widehat{A} = 180^\\circ - \\widehat{B} - \\widehat{C}')} trước. ` : '') + `Định lí sin: ${tm('\\dfrac{BC}{\\sin A} = \\dfrac{AC}{\\sin B}')}.`,
    sol:(lv===3 ? `${tm(`\\widehat{A} = 180^\\circ - ${DG(o.B)} - ${DG(C)} = ${DG(o.A)}`)}. ` : '') + `${tm(`AC = \\dfrac{BC\\cdot\\sin B}{\\sin A} = \\dfrac{${a}\\cdot ${SINV[o.B]}}{${SINV[o.A]}} = ${surd(k,r)}`)}. Vậy ${tb(`AC = ${surd(k,r)}`)}.`});
};
const HERON = [[13,14,15],[5,5,6],[6,8,10],[9,10,17],[7,15,20],[10,13,13],[5,5,8],[13,13,24],[4,13,15],[11,13,20]];
const heronS = ([a,b,c]) => { const p = (a+b+c)/2; return Math.sqrt(p*(p-a)*(p-b)*(p-c)); };
const g6d = lv => {   // diện tích tam giác
  if(lv === 1){ const A = pick([30,150,90,30]); let b, c; do{ b = R(2,14); c = R(2,14); }while((b*c) % (A===90?2:4));
    const S = A === 90 ? b*c/2 : b*c/4;
    return QB({text:`Cho tam giác ${tm('ABC')} có ${tm(`AB = ${c}`)}, ${tm(`AC = ${b}`)} và ${tm(`\\widehat{A} = ${DG(A)}`)}. Tính diện tích ${tm('S')} của tam giác.`, tpl:blank('S'), ans:[S],
      hint:`Dùng ${tm('S = \\dfrac{1}{2}\\,bc\\sin A')}.`, sol:`${tm(`S = \\dfrac{1}{2}\\cdot ${b}\\cdot ${c}\\cdot\\sin ${DG(A)} = \\dfrac{1}{2}\\cdot ${b*c}\\cdot ${A===90?'1':H} = ${S}`)}. Vậy ${tb(`S = ${S}`)}.`}); }
  const k = R(1,2), [a,b,c] = pick(HERON).map(x => x*k), p = (a+b+c)/2, S = heronS([a,b,c]);
  const her = `S = \\sqrt{p(p - a)(p - b)(p - c)}`, calc = `p = \\dfrac{${a} + ${b} + ${c}}{2} = ${p}`, sS = `S = \\sqrt{${p}\\cdot ${p-a}\\cdot ${p-b}\\cdot ${p-c}} = ${S}`;
  if(lv === 2) return QB({text:`Tính diện tích tam giác có độ dài ba cạnh là ${tm(`${a},\\ ${b},\\ ${c}`)}.`, tpl:blank('S'), ans:[S],
    hint:`Công thức Heron ${tm(her)} với ${tm('p')} là nửa chu vi.`, sol:`${tm(calc)}; ${tm(sS)}. Vậy ${tb(`S = ${S}`)}.`});
  const askR = Math.random() < .5, [n,d] = askR ? [a*b*c, 4*S] : [S, p];
  return QB({text:`Cho tam giác có độ dài ba cạnh là ${tm(`${a},\\ ${b},\\ ${c}`)}. Tính bán kính ${askR ? `${tm('R')} của đường tròn <b>ngoại tiếp</b>` : `${tm('r')} của đường tròn <b>nội tiếp</b>`} tam giác.`,
    tpl:fblank(askR ? 'R' : 'r'), ans:[{frac:[n,d],mode:'eq'}],
    hint:`Tính diện tích bằng công thức Heron trước, rồi dùng ${askR ? tm('S = \\dfrac{abc}{4R}') : tm('S = pr')}.`,
    sol:`${tm(calc)}; ${tm(sS)}. ${askR ? tm(`R = \\dfrac{abc}{4S} = \\dfrac{${a}\\cdot ${b}\\cdot ${c}}{4\\cdot ${S}} = `) : tm(`r = \\dfrac{S}{p} = \\dfrac{${S}}{${p}} = `)}${tb(tfrac(n,d))}.`});
};
const R1 = x => Math.round((x + 1e-9)*10)/10;
const g6e = lv => {   // bài toán thực tế
  if(lv < 3){ const A = lv === 1 ? 60 : 120, k = pick([1,2,3]), [b0,c0,a0] = pick(A===60?P60:P120), [b,c,a] = [b0*k,c0*k,a0*k];
    const txt = lv === 1
      ? `Hai tàu cùng xuất phát từ cảng ${tm('A')}, đi theo hai hướng tạo với nhau góc ${tm(DG(60))}. Tàu thứ nhất đi được <b>${b} km</b>, tàu thứ hai đi được <b>${c} km</b>. Hỏi lúc đó hai tàu cách nhau bao nhiêu kilômét?`
      : `Để đo khoảng cách giữa hai điểm ${tm('B, C')} ở hai bên bờ hồ, người ta chọn điểm ${tm('A')} sao cho ${tm(`AC = ${b}`)} m, ${tm(`AB = ${c}`)} m và ${tm(`\\widehat{BAC} = ${DG(120)}`)}. Tính khoảng cách ${tm('BC')}.`;
    return QB({text:txt, fig:triSVG({a,b,c,la:'?',lb:`${b}`,lc:`${c}`,gA:`${A}°`}), tpl:lv===1?'[_] km':'[_] m', ans:[a],
      hint:`Ba điểm tạo thành tam giác biết hai cạnh và góc xen giữa: dùng định lí côsin ${COSLAW}.`,
      sol:`${tm(`BC^2 = ${lawA(b,c,A)} = ${a*a}`)}, nên ${tm('BC = ')}${tb(a)} ${lv===1?'km':'m'}.`}); }
  const A = pick([40,50,70,75,80,100,110]), b = R(20,60), c = R(20,60), cv = Math.round(Math.cos(A*Math.PI/180)*100)/100;
  const a1 = Math.sqrt(b*b + c*c - 2*b*c*cv), a2 = Math.sqrt(b*b + c*c - 2*b*c*Math.cos(A*Math.PI/180));
  return QB({text:`Từ vị trí ${tm('A')}, bạn Minh nhìn hai cột mốc ${tm('B')} và ${tm('C')} dưới góc ${tm(`\\widehat{BAC} = ${DG(A)}`)}. Biết ${tm(`AB = ${c}`)} m, ${tm(`AC = ${b}`)} m và ${tm(`\\cos ${DG(A)} \\approx ${tdec(cv)}`)}. Tính khoảng cách ${tm('BC')} (làm tròn đến hàng phần mười).`,
    fig:triSVG({a:a2,b,c,la:'?',lb:`${b} m`,lc:`${c} m`,gA:`${A}°`}), tpl:'[_] m', ans:[R1(a1)===R1(a2) ? R1(a1) : [R1(a1),R1(a2)]],
    hint:`Dùng định lí côsin ${COSLAW} với ${tm(`\\cos ${DG(A)} \\approx ${tdec(cv)}`)}, rồi khai căn và làm tròn.`,
    sol:`${tm(`BC^2 \\approx ${b}^2 + ${c}^2 - 2\\cdot ${b}\\cdot ${c}\\cdot ${cv<0?`(${tdec(cv)})`:tdec(cv)} = ${tdec(Math.round(a1*a1*100)/100)}`)}, nên ${tm('BC \\approx')} ${tb(`${tdec(R1(a1))}\\text{ m}`)}.`});
};

lesson(3,'gia-tri-luong-giac-0-180','Bài 5. Giá trị lượng giác của một góc từ 0° đến 180°','Giá trị lượng giác của góc đặc biệt; hai góc bù nhau; dấu; tính khi biết một giá trị; tính biểu thức.',[g5a,g5b,g5c,g5d]);

/* ---------------- BÀI 6. LUYỆN TẬP THÊM – CỦNG CỐ CÔNG THỨC ---------------- */
const g6f = lv => {   // chọn đúng công thức
  if(lv === 1){
    const cases = [
      {q:`Biết hai cạnh ${tm('b, c')} và góc xen giữa ${tm('A')}. Công thức nào dùng để tính cạnh ${tm('a')}?`, good:'a^2 = b^2 + c^2 - 2bc\\cos A'},
      {q:`Biết cạnh ${tm('a')} và góc đối diện ${tm('A')}. Công thức nào dùng để tính bán kính ngoại tiếp ${tm('R')}?`, good:'R = \\dfrac{a}{2\\sin A}'},
      {q:`Biết hai cạnh ${tm('b, c')} và góc xen giữa ${tm('A')}. Công thức nào dùng để tính diện tích ${tm('S')}?`, good:'S = \\dfrac{1}{2}bc\\sin A'}
    ];
    const x = pick(cases), wrong = ['S = pr','S = \\sqrt{p(p-a)(p-b)(p-c)}','\\dfrac{a}{\\sin A} = \\dfrac{b}{\\cos B}'];
    return QC({text:x.q, opts:[x.good,...wrong].map(tm), ans:tm(x.good),
      hint:'Đối chiếu dữ kiện đã biết với đại lượng cần tìm; khi dùng định lí côsin hoặc công thức diện tích, góc phải xen giữa hai cạnh đã cho.',
      sol:`Dữ kiện khớp trực tiếp với công thức ${tb(x.good)}.`});
  }
  if(lv === 2){
    const cases = [
      {q:`Từ định lí côsin, biểu thức đúng của ${tm('\\cos A')} là`, good:'\\cos A = \\dfrac{b^2+c^2-a^2}{2bc}', bad:['\\cos A = \\dfrac{a^2+b^2-c^2}{2bc}','\\cos A = \\dfrac{b^2+c^2-a^2}{bc}','\\cos A = \\dfrac{a^2-b^2-c^2}{2bc}']},
      {q:`Từ công thức ${tm('S = pr')}, biểu thức đúng của bán kính nội tiếp là`, good:'r = \\dfrac{S}{p}', bad:['r = \\dfrac{p}{S}','r = Sp','r = \\dfrac{2S}{p}']},
      {q:`Từ công thức ${tm('S = \\dfrac{abc}{4R}')}, biểu thức đúng của ${tm('R')} là`, good:'R = \\dfrac{abc}{4S}', bad:['R = \\dfrac{4S}{abc}','R = \\dfrac{abc}{2S}','R = \\dfrac{ab}{4S}']}
    ];
    const x = pick(cases);
    return QC({text:x.q, opts:[x.good,...x.bad].map(tm), ans:tm(x.good), hint:'Chuyển vế bằng cách nhân hoặc chia cả hai vế cho cùng một đại lượng khác 0.',
      sol:`Biến đổi công thức đã cho, ta được ${tb(x.good)}.`});
  }
  const cases = [
    {q:`Tam giác đã biết độ dài cả ba cạnh ${tm('a, b, c')}. Muốn tính diện tích, nên dùng công thức nào trực tiếp nhất?`, good:'S = \\sqrt{p(p-a)(p-b)(p-c)}'},
    {q:`Tam giác đã biết ${tm('a, A, B')}. Muốn tính cạnh ${tm('b')}, nên dùng công thức nào trực tiếp nhất?`, good:'\\dfrac{a}{\\sin A} = \\dfrac{b}{\\sin B}'},
    {q:`Tam giác đã biết ${tm('b, c, A')}. Muốn tính cạnh ${tm('a')}, nên dùng công thức nào trực tiếp nhất?`, good:'a^2 = b^2+c^2-2bc\\cos A'},
    {q:`Tam giác đã biết diện tích ${tm('S')} và nửa chu vi ${tm('p')}. Muốn tính bán kính nội tiếp, nên dùng công thức nào trực tiếp nhất?`, good:'S = pr'}
  ];
  const x = pick(cases), pool = ['S = \\sqrt{p(p-a)(p-b)(p-c)}','\\dfrac{a}{\\sin A} = \\dfrac{b}{\\sin B}','a^2 = b^2+c^2-2bc\\cos A','S = pr'];
  return QC({text:x.q, opts:pool.map(tm), ans:tm(x.good), hint:'Chọn công thức chứa đại lượng cần tìm và các đại lượng đề bài đã cho, sao cho số bước trung gian ít nhất.',
    sol:`Công thức dùng trực tiếp nhất là ${tb(x.good)}.`});
};

const g6g = lv => {   // định lí côsin
  if(lv === 1){ const A = pick([60,90]), [b,c,a] = pick(A===60?P60:P90);
    return QB({text:`Cho tam giác ${tm('ABC')} có ${tm(`AB=${c},\\ AC=${b},\\ A=${DG(A)}`)}. Tính ${tm('BC')}.`,
      fig:triSVG({a,b,c,la:'?',lb:String(b),lc:String(c),gA:`${A}°`}), tpl:blank('BC'), ans:[a],
      hint:`Áp dụng định lí côsin ${tm('BC^2=AB^2+AC^2-2\\cdot AB\\cdot AC\\cos A')}.`,
      sol:`Theo định lí côsin, ${tm(`BC^2=${lawA(b,c,A)}=${a*a}`)}. Vì độ dài dương nên ${tm('BC=')} ${tb(a)}.`});
  }
  if(lv === 2){ const A = pick([60,90,120]), [b,c,a] = pick(A===60?P60:A===90?P90:P120), num=b*b+c*c-a*a, den=2*b*c;
    return QB({text:`Cho tam giác ${tm('ABC')} có ${tm(`BC=${a},\\ CA=${b},\\ AB=${c}`)}. Tính ${tm('\\cos A')}.`,
      fig:triSVG({a,b,c,la:String(a),lb:String(b),lc:String(c),gA:'?'}), tpl:fblank('\\cos A'), ans:[{frac:[num,den],mode:'eq'}],
      hint:`Dùng hệ quả định lí côsin ${tm('\\cos A=\\dfrac{b^2+c^2-a^2}{2bc}')}.`,
      sol:`Theo hệ quả định lí côsin, ${tm(`\\cos A=\\dfrac{${b}^2+${c}^2-${a}^2}{2\\cdot${b}\\cdot${c}}=${tf(num,den)}=`)} ${tb(tfrac(num,den))}.`});
  }
  const kind = pick(['nhọn','vuông','tù']); let a,b,c,d;
  do{
    if(kind==='vuông'){ const [x,y,z]=pick(TRIP), k=R(1,2); [c,b,a]=[x*k,y*k,z*k]; }
    else [c,b,a]=[R(3,14),R(3,14),R(3,14)].sort((x,y)=>x-y);
    d=b*b+c*c-a*a;
  }while(a>=b+c || (kind==='nhọn'&&d<=0) || (kind==='tù'&&d>=0));
  const ans = d>0?'Tam giác nhọn':d===0?'Tam giác vuông':'Tam giác tù';
  return QC({text:`Tam giác có ba cạnh ${tm(`${c},\\ ${b},\\ ${a}`)} thuộc loại nào?`, opts:['Tam giác nhọn','Tam giác vuông','Tam giác tù','Không tồn tại tam giác'], ans, keepOrder:true,
    hint:`Cạnh ${tm(a)} lớn nhất. So sánh ${tm('a^2')} với ${tm('b^2+c^2')} để xét dấu côsin của góc lớn nhất.`,
    sol:`Ta có ${tm(`b^2+c^2-a^2=${b*b}+${c*c}-${a*a}=${d}`)}. Đại lượng này ${d>0?'dương':d===0?'bằng 0':'âm'}, nên góc lớn nhất ${d>0?'nhọn':d===0?'vuông':'tù'}. Vậy ${tb(`\\text{${ans}}`)}.`});
};

const g6h = lv => {   // định lí sin
  if(lv === 1){ const a=R(2,15);
    return QB({text:`Cho tam giác ${tm('ABC')} có ${tm(`BC=${a}`)} và ${tm('A=30^\\circ')}. Tính bán kính đường tròn ngoại tiếp ${tm('R')}.`, tpl:blank('R'), ans:[a],
      hint:`Định lí sin cho ${tm('\\dfrac{a}{\\sin A}=2R')}.`,
      sol:`Theo định lí sin, ${tm(`R=\\dfrac{a}{2\\sin A}=\\dfrac{${a}}{2\\sin30^\\circ}=\\dfrac{${a}}{2\\cdot\\dfrac{1}{2}}=${a}`)}. Vậy ${tb(`R=${a}`)}.`});
  }
  if(lv === 2){ const a=R(2,10), b=2*a;
    return QB({text:`Cho tam giác ${tm('ABC')} có ${tm(`BC=${a},\\ A=30^\\circ,\\ B=90^\\circ`)}. Tính ${tm('AC')}.`, tpl:blank('AC'), ans:[b],
      hint:`Dùng định lí sin ${tm('\\dfrac{BC}{\\sin A}=\\dfrac{AC}{\\sin B}')}.`,
      sol:`Theo định lí sin, ${tm(`AC=\\dfrac{BC\\sin B}{\\sin A}=\\dfrac{${a}\\cdot\\sin90^\\circ}{\\sin30^\\circ}=\\dfrac{${a}\\cdot1}{\\dfrac{1}{2}}=${b}`)}. Vậy ${tb(`AC=${b}`)}.`});
  }
  const k=R(1,8), a=3*k;
  return QB({text:`Cho tam giác ${tm('ABC')} có ${tm(`BC=${a},\\ B=30^\\circ,\\ C=90^\\circ`)}. Tính ${tm('AC')}.`,
    tpl:`${tm('AC=')} [_] ${tm('\\sqrt{3}')}`, ans:[k], hint:`Trước hết tính ${tm('A=180^\\circ-B-C')}, sau đó dùng định lí sin.`,
    sol:`Tổng ba góc của tam giác bằng ${tm('180^\\circ')}, nên ${tm('A=180^\\circ-30^\\circ-90^\\circ=60^\\circ')}. Theo định lí sin, ${tm(`AC=\\dfrac{BC\\sin B}{\\sin A}=\\dfrac{${a}\\cdot\\dfrac{1}{2}}{\\dfrac{\\sqrt{3}}{2}}=${k}\\sqrt{3}`)}. Vậy ${tb(`AC=${k}\\sqrt{3}`)}.`});
};

const g6i = lv => {   // diện tích, bán kính và đường cao
  if(lv === 1){ const A=pick([30,90]); let b,c; do{b=R(2,14);c=R(2,14)}while((b*c)%(A===30?4:2)); const S=A===30?b*c/4:b*c/2;
    return QB({text:`Cho tam giác ${tm('ABC')} có ${tm(`AB=${c},\\ AC=${b},\\ A=${DG(A)}`)}. Tính diện tích ${tm('S')}.`, tpl:blank('S'), ans:[S],
      hint:`Dùng công thức diện tích theo hai cạnh và góc xen giữa: ${tm('S=\\dfrac{1}{2}bc\\sin A')}.`,
      sol:`Theo công thức diện tích, ${tm(`S=\\dfrac{1}{2}\\cdot${b}\\cdot${c}\\cdot\\sin${DG(A)}=${S}`)}. Vậy ${tb(`S=${S}`)}.`});
  }
  const k=R(1,2), sides=pick(HERON).map(x=>x*k), [a,b,c]=sides, p=(a+b+c)/2, S=heronS(sides);
  if(lv === 2) return QB({text:`Tính diện tích tam giác có ba cạnh ${tm(`${a},\\ ${b},\\ ${c}`)}.`, tpl:blank('S'), ans:[S],
    hint:`Tính nửa chu vi ${tm('p')}, rồi dùng công thức Heron ${tm('S=\\sqrt{p(p-a)(p-b)(p-c)}')}.`,
    sol:`Nửa chu vi: ${tm(`p=\\dfrac{${a}+${b}+${c}}2=${p}`)}. Theo công thức Heron, ${tm(`S=\\sqrt{${p}\\cdot${p-a}\\cdot${p-b}\\cdot${p-c}}=${S}`)}. Vậy ${tb(`S=${S}`)}.`});
  const askR=Math.random()<.5, n=askR?a*b*c:S, d=askR?4*S:p;
  return QB({text:`Tam giác có ba cạnh ${tm(`${a},\\ ${b},\\ ${c}`)}. Tính bán kính ${askR?'ngoại tiếp '+tm('R'):'nội tiếp '+tm('r')}.`, tpl:fblank(askR?'R':'r'), ans:[{frac:[n,d],mode:'eq'}],
    hint:`Tính diện tích bằng công thức Heron, rồi dùng ${askR?tm('S=\\dfrac{abc}{4R}'):tm('S=pr')}.`,
    sol:`Ta có ${tm(`p=${p}`)} và theo Heron, ${tm(`S=${S}`)}. ${askR?`Từ ${tm('S=\\dfrac{abc}{4R}')}, suy ra ${tm(`R=\\dfrac{${a}\\cdot${b}\\cdot${c}}{4\\cdot${S}}=`)}`:`Từ ${tm('S=pr')}, suy ra ${tm(`r=\\dfrac{${S}}{${p}}=`)}`} ${tb(tfrac(n,d))}.`});
};

const g6j = lv => {   // bài toán thực tế tổng hợp
  if(lv < 3){ const A=lv===1?90:120, k=R(1,3), [b0,c0,a0]=pick(A===90?P90:P120), [b,c,a]=[b0*k,c0*k,a0*k];
    const text=lv===1
      ? `Hai con đường thẳng xuất phát từ ${tm('A')} vuông góc với nhau. Một bạn đi từ ${tm('A')} đến ${tm('B')} được <b>${c} m</b>, bạn khác đi từ ${tm('A')} đến ${tm('C')} được <b>${b} m</b>. Tính khoảng cách ${tm('BC')}.`
      : `Từ điểm quan sát ${tm('A')}, hai cột mốc ${tm('B,C')} tạo góc ${tm('120^\\circ')}. Biết ${tm(`AB=${c}`)} m và ${tm(`AC=${b}`)} m. Tính ${tm('BC')}.`;
    return QB({text, fig:triSVG({a,b,c,la:'?',lb:`${b} m`,lc:`${c} m`,gA:`${A}°`}), tpl:'[_] m', ans:[a],
      hint:'Mô hình là tam giác biết hai cạnh và góc xen giữa; dùng định lí côsin.',
      sol:`Theo định lí côsin, ${tm(`BC^2=${lawA(b,c,A)}=${a*a}`)}. Vì ${tm('BC')} là độ dài nên ${tm('BC=')} ${tb(`${a}\\text{ m}`)}.`});
  }
  const k=R(1,2), sides=pick(HERON).map(x=>x*k), [a,b,c]=sides, p=(a+b+c)/2, S=heronS(sides), price=pick([20,25,30,40]), cost=S*price;
  return QB({text:`Một khu đất hình tam giác có ba cạnh ${tm(`${a}\\text{ m},\\ ${b}\\text{ m},\\ ${c}\\text{ m}`)}. Chi phí trồng cỏ là <b>${price} nghìn đồng/m²</b>. Tính tổng chi phí trồng cỏ.`, tpl:'[_] nghìn đồng', ans:[cost], wide:true,
    hint:'Tính diện tích khu đất bằng công thức Heron, rồi nhân diện tích với chi phí cho mỗi mét vuông.',
    sol:`Nửa chu vi: ${tm(`p=\\dfrac{${a}+${b}+${c}}2=${p}`)}. Theo công thức Heron, ${tm(`S=\\sqrt{${p}\\cdot${p-a}\\cdot${p-b}\\cdot${p-c}}=${S}\\text{ m}^2`)}. Chi phí là ${tm(`${S}\\cdot${price}=${cost}`)} nghìn đồng. Đáp số: ${tb(`${fmt(cost)}\\text{ nghìn đồng}`)}.`});
};

/* ---------------- BÀI 6. LUYỆN TẬP THÊM 2 – TOÁN THỰC TẾ ---------------- */
const g6k = lv => {   // khoảng cách trong hành trình và khảo sát
  if(lv < 3){
    const A=lv===1?90:pick([60,120]), k=R(1,4), src=A===90?P90:A===60?P60:P120;
    const [b0,c0,a0]=pick(src), [b,c,a]=[b0*k,c0*k,a0*k];
    const text=lv===1
      ? `Từ một ngã ba ${tm('A')}, hai xe đi theo hai con đường vuông góc. Xe thứ nhất đến ${tm('B')} sau khi đi <b>${c} km</b>, xe thứ hai đến ${tm('C')} sau khi đi <b>${b} km</b>. Tính khoảng cách thẳng giữa hai xe.`
      : `Một ca nô xuất phát từ ${tm('A')} đi đến ${tm('B')} được <b>${c} km</b>; ca nô khác đi từ ${tm('A')} đến ${tm('C')} được <b>${b} km</b>. Hai hướng đi tạo góc ${tm(DG(A))}. Tính khoảng cách ${tm('BC')}.`;
    return QB({text,fig:triSVG({a,b,c,la:'?',lb:`${b} km`,lc:`${c} km`,gA:`${A}°`}),tpl:'[_] km',ans:[a],
      hint:`Mô hình hóa ba vị trí thành tam giác rồi dùng định lí côsin ${COSLAW}.`,
      sol:`Ba vị trí tạo thành tam giác ${tm('ABC')}. Theo định lí côsin, ${tm(`BC^2=AB^2+AC^2-2\\,AB\\cdot AC\\cos A=${lawA(b,c,A)}=${a*a}`)}. Vì khoảng cách là số dương nên ${tm(`BC=\\sqrt{${a*a}}=${a}`)} km. Vậy hai xe cách nhau ${tb(`${a}\\text{ km}`)}.`});
  }
  const A=pick([35,40,50,70,75,100,110]), b=R(25,75), c=R(25,75), cv=Math.round(Math.cos(A*Math.PI/180)*100)/100;
  const near=Math.sqrt(b*b+c*c-2*b*c*cv), exact=Math.sqrt(b*b+c*c-2*b*c*Math.cos(A*Math.PI/180));
  const x=R1(near), y=R1(exact);
  return QB({text:`Để đo khoảng cách qua một hồ, người khảo sát chọn điểm ${tm('A')} và đo được ${tm(`AB=${c}`)} m, ${tm(`AC=${b}`)} m, ${tm(`\\widehat{BAC}=${DG(A)}`)}. Cho ${tm(`\\cos ${DG(A)}\\approx ${tdec(cv)}`)}. Tính ${tm('BC')} (làm tròn đến hàng phần mười của mét).`,
    fig:triSVG({a:exact,b,c,la:'?',lb:`${b} m`,lc:`${c} m`,gA:`${A}°`}),tpl:'[_] m',ans:[x===y?x:[x,y]],
    hint:'Ba số đo đã biết gồm hai cạnh và góc xen giữa, vì vậy dùng định lí côsin rồi khai căn.',
    sol:`Theo định lí côsin, ${tm(`BC^2=AB^2+AC^2-2\\,AB\\cdot AC\\cos A\\approx ${c}^2+${b}^2-2\\cdot${c}\\cdot${b}\\cdot${cv<0?`(${tdec(cv)})`:tdec(cv)}=${tdec(Math.round(near*near*100)/100)}`)}. Suy ra ${tm(`BC\\approx\\sqrt{${tdec(Math.round(near*near*100)/100)}}\\approx ${tdec(x)}`)} m. Vậy khoảng cách cần tìm xấp xỉ ${tb(`${tdec(x)}\\text{ m}`)}.`});
};

const g6l = lv => {   // đo chiều rộng sông bằng định lí sin
  if(lv===1){ const c=2*R(6,20), a=c/2;
    return QB({text:`Để đo chiều rộng ${tm('BC')} của một con sông, người ta chọn ${tm('A,C')} trên cùng một bờ sao cho ${tm('AC\\perp BC')}. Biết ${tm(`AB=${c}`)} m và ${tm(`\\widehat{BAC}=30^\\circ`)}. Tính chiều rộng con sông.`,
      fig:rtTriSVG({n:['C','A','B'],w:a,h:Math.sqrt(c*c-a*a),ac:'?',bc:`${c} m`,aB:'30°'}),tpl:'[_] m',ans:[a],
      hint:`Trong tam giác vuông, ${tm('\\sin A=\\dfrac{BC}{AB}')}.`,
      sol:`Tam giác ${tm('ABC')} vuông tại ${tm('C')}. Theo định nghĩa tỉ số lượng giác, ${tm(`\\sin A=\\dfrac{BC}{AB}`)}. Do đó ${tm(`BC=AB\\sin A=${c}\\sin30^\\circ=${c}\\cdot\\dfrac{1}{2}=${a}`)} m. Vậy chiều rộng con sông là ${tb(`${a}\\text{ m}`)}.`}); }
  if(lv===2){ const k=R(6,18), c=2*k;
    return QB({text:`Hai điểm ${tm('A,C')} nằm trên một bờ sông và ${tm('AC\\perp BC')}. Từ ${tm('A')} nhìn đến cột mốc ${tm('B')} ở bờ bên kia dưới góc ${tm('45^\\circ')}; đo được ${tm(`AB=${c}`)} m. Tính ${tm('BC')}.`,
      fig:rtTriSVG({n:['C','A','B'],w:k*Math.SQRT2,h:k*Math.SQRT2,ac:'?',bc:`${c} m`,aB:'45°'}),tpl:`${tm('BC=')} [_] ${tm('\\sqrt{2}')} m`,ans:[k],
      hint:'Dùng định lí sin hoặc tỉ số sin trong tam giác vuông.',
      sol:`Tam giác ${tm('ABC')} vuông tại ${tm('C')}, nên ${tm('B=45^\\circ')}. Theo định lí sin, ${tm(`\\dfrac{BC}{\\sin45^\\circ}=\\dfrac{AB}{\\sin90^\\circ}`)}. Suy ra ${tm(`BC=${c}\\cdot\\dfrac{\\sqrt{2}}{2}=${k}\\sqrt{2}`)} m. Vậy ${tb(`BC=${k}\\sqrt{2}\\text{ m}`)}.`}); }
  const k=R(5,16), c=2*k;
  return QB({text:`Để đo khoảng cách ${tm('BC')} qua một vùng lầy, người ta dựng tam giác vuông ${tm('ABC')} tại ${tm('C')}, đo được ${tm(`AB=${c}`)} m và ${tm(`\\widehat{ABC}=30^\\circ`)}. Tính ${tm('BC')}.`,
    fig:rtTriSVG({n:['C','A','B'],w:k*Math.sqrt(3),h:k,ac:'?',bc:`${c} m`,aC:'30°'}),tpl:`${tm('BC=')} [_] ${tm('\\sqrt{3}')} m`,ans:[k],
    hint:`Tính góc ${tm('A')} trước, rồi ghép đúng cạnh với góc đối diện trong định lí sin.`,
    sol:`Tổng ba góc của tam giác bằng ${tm('180^\\circ')}, nên ${tm('A=180^\\circ-90^\\circ-30^\\circ=60^\\circ')}. Theo định lí sin, ${tm(`\\dfrac{BC}{\\sin60^\\circ}=\\dfrac{AB}{\\sin90^\\circ}`)}. Do đó ${tm(`BC=${c}\\cdot\\dfrac{\\sqrt{3}}{2}=${k}\\sqrt{3}`)} m. Vậy ${tb(`BC=${k}\\sqrt{3}\\text{ m}`)}.`});
};

const g6m = lv => {   // đo chiều cao vật thể
  if(lv===1){ const d=R(8,35);
    return QB({text:`Một bạn đứng tại ${tm('A')}, cách chân cột cờ ${tm('H')} một đoạn ${tm(`AH=${d}`)} m. Góc nâng từ mặt đất đến đỉnh cột ${tm('T')} bằng ${tm('45^\\circ')}. Tính chiều cao ${tm('HT')}.`,
      fig:rtTriSVG({n:['H','T','A'],w:d,h:d,ab:'?',ac:`${d} m`,aC:'45°'}),tpl:'[_] m',ans:[d],
      hint:`Trong tam giác vuông, ${tm('\\tan A=\\dfrac{HT}{AH}')}.`,
      sol:`Tam giác ${tm('AHT')} vuông tại ${tm('H')}. Theo định nghĩa tỉ số tang, ${tm(`\\tan A=\\dfrac{HT}{AH}`)}. Suy ra ${tm(`HT=AH\\tan45^\\circ=${d}\\cdot1=${d}`)} m. Vậy cột cờ cao ${tb(`${d}\\text{ m}`)}.`}); }
  if(lv===2){ const A=pick([30,35,40,50,55,60]), tv={30:.58,35:.70,40:.84,50:1.19,55:1.43,60:1.73}[A], d=R(12,40), eye=pick([1.5,1.6,1.7]);
    const h1=R1(d*tv+eye), h2=R1(d*Math.tan(A*Math.PI/180)+eye);
    return QB({text:`Một người đứng cách chân tháp <b>${d} m</b>, mắt cao <b>${tdec(eye)} m</b> so với mặt đất. Góc nâng từ mắt đến đỉnh tháp là ${tm(DG(A))}. Cho ${tm(`\\tan${DG(A)}\\approx${tdec(tv)}`)}. Tính chiều cao tháp (làm tròn đến hàng phần mười của mét).`,
      fig:rtTriSVG({n:['H','T','M'],w:d,h:d*tv,ab:'?',ac:`${d} m`,aC:`${A}°`}),tpl:'[_] m',ans:[h1===h2?h1:[h1,h2]],
      hint:'Tính phần chiều cao từ tầm mắt đến đỉnh bằng khoảng cách ngang nhân tang của góc nâng, sau đó cộng chiều cao tầm mắt.',
      sol:`Gọi ${tm('K')} là điểm trên tháp ngang tầm mắt. Tam giác quan sát vuông tại ${tm('K')}, nên ${tm(`KT=${d}\\tan${DG(A)}\\approx${d}\\cdot${tdec(tv)}=${tdec(Math.round(d*tv*100)/100)}`)} m. Chiều cao tháp là ${tm(`HT=HK+KT\\approx${tdec(eye)}+${tdec(Math.round(d*tv*100)/100)}=${tdec(h1)}`)} m. Vậy tháp cao xấp xỉ ${tb(`${tdec(h1)}\\text{ m}`)}.`}); }
  const pair=pick([[30,45],[30,60],[45,60]]), [A,B]=pair, d=R(8,25), ta=Math.round(Math.tan(A*Math.PI/180)*100)/100, tbv=Math.round(Math.tan(B*Math.PI/180)*100)/100;
  const h=d*ta*tbv/(tbv-ta), he=d*Math.tan(A*Math.PI/180)*Math.tan(B*Math.PI/180)/(Math.tan(B*Math.PI/180)-Math.tan(A*Math.PI/180)), h1=R1(h), h2=R1(he);
  return QB({text:`Hai điểm quan sát ${tm('A,B')} cùng nằm về một phía của cây, ${tm('B')} gần cây hơn và ${tm(`AB=${d}`)} m. Góc nâng đến ngọn cây lần lượt là ${tm(DG(A))} tại ${tm('A')} và ${tm(DG(B))} tại ${tm('B')}. Cho ${tm(`\\tan${DG(A)}\\approx${tdec(ta)}`)}, ${tm(`\\tan${DG(B)}\\approx${tdec(tbv)}`)}. Tính chiều cao cây (làm tròn đến hàng phần mười của mét).`,
    fig:treeSVG({d:`${d} m`,a:`${A}°`,b:`${B}°`,h:'?'}),tpl:'[_] m',ans:[h1===h2?h1:[h1,h2]],wide:true,
    hint:'Gọi khoảng cách từ điểm gần cây đến chân cây là x. Biểu diễn chiều cao theo x tại hai điểm quan sát rồi lập phương trình.',
    sol:`Gọi ${tm('BH=x')} m và chiều cao cây là ${tm('HT=h')} m. Vì ${tm('AH=x+d')}, từ hai tam giác vuông ta có ${tm(`h=x\\tan${DG(B)}`)} và ${tm(`h=(x+${d})\\tan${DG(A)}`)}. Khử ${tm('x')}, suy ra ${tm(`h=\\dfrac{${d}\\tan${DG(A)}\\tan${DG(B)}}{\\tan${DG(B)}-\\tan${DG(A)}}`)}. Thay các giá trị gần đúng: ${tm(`h\\approx\\dfrac{${d}\\cdot${tdec(ta)}\\cdot${tdec(tbv)}}{${tdec(tbv)}-${tdec(ta)}}\\approx${tdec(h1)}`)} m. Vậy cây cao xấp xỉ ${tb(`${tdec(h1)}\\text{ m}`)}.`});
};

const g6n = lv => {   // diện tích và chi phí thực tế
  if(lv===1){ const b=R(6,25), h=R(4,20), S=b*h/2;
    return QB({text:`Một tấm kính hình tam giác có đáy dài <b>${b} dm</b> và chiều cao tương ứng <b>${h} dm</b>. Tính diện tích tấm kính.`,
      fig:rtTriSVG({n:['H','T','B'],w:b,h,ab:`${h} dm`,ac:`${b} dm`}),tpl:'[_] dm²',ans:[S],
      hint:'Diện tích tam giác bằng một nửa tích của đáy và chiều cao tương ứng.',
      sol:`Theo công thức diện tích tam giác, ${tm(`S=\\dfrac{1}{2}\\cdot${b}\\cdot${h}=${S}`)} dm². Vậy diện tích tấm kính là ${tb(`${fmt(S)}\\text{ dm}^2`)}.`}); }
  if(lv===2){ const A=pick([30,150]), b=2*R(4,12), c=2*R(4,12), S=b*c/4;
    return QB({text:`Một mảnh bạt hình tam giác có hai cạnh dài <b>${b} m</b> và <b>${c} m</b>, góc xen giữa bằng ${tm(DG(A))}. Tính diện tích mảnh bạt.`,
      fig:triSVG({a:Math.sqrt(b*b+c*c-2*b*c*Math.cos(A*Math.PI/180)),b,c,lb:`${b} m`,lc:`${c} m`,gA:`${A}°`}),tpl:'[_] m²',ans:[S],
      hint:`Dùng công thức ${tm('S=\\dfrac{1}{2}bc\\sin A')}; chú ý ${tm('\\sin150^\\circ=\\sin30^\\circ')}.`,
      sol:`Theo công thức diện tích khi biết hai cạnh và góc xen giữa, ${tm(`S=\\dfrac{1}{2}\\cdot${b}\\cdot${c}\\cdot\\sin${DG(A)}=\\dfrac{1}{2}\\cdot${b}\\cdot${c}\\cdot\\dfrac{1}{2}=${S}`)} m². Vậy diện tích mảnh bạt là ${tb(`${S}\\text{ m}^2`)}.`}); }
  const sides=pick(HERON), [a,b,c]=sides, p=(a+b+c)/2, S=heronS(sides), price=pick([35,40,45,50]), cost=S*price;
  return QB({text:`Một khu vườn hình tam giác có ba cạnh dài ${tm(`${a}\\text{ m},\\ ${b}\\text{ m},\\ ${c}\\text{ m}`)}. Chi phí phủ cỏ là <b>${price} nghìn đồng/m²</b>. Tính tổng chi phí phủ cỏ.`,
    fig:triSVG({a,b,c,la:`${a} m`,lb:`${b} m`,lc:`${c} m`}),tpl:'[_] nghìn đồng',ans:[cost],wide:true,
    hint:'Tính nửa chu vi, dùng công thức Heron để tìm diện tích rồi nhân với đơn giá.',
    sol:`Nửa chu vi khu vườn là ${tm(`p=\\dfrac{${a}+${b}+${c}}2=${p}`)} m. Theo công thức Heron, ${tm(`S=\\sqrt{p(p-a)(p-b)(p-c)}=\\sqrt{${p}\\cdot${p-a}\\cdot${p-b}\\cdot${p-c}}=${S}`)} m². Tổng chi phí là ${tm(`${S}\\cdot${price}=${cost}`)} nghìn đồng. Vậy cần ${tb(`${fmt(cost)}\\text{ nghìn đồng}`)}.`});
};

const g6o = lv => {   // đường tròn trong các công trình tam giác
  if(lv===1){ const [u,v,w]=pick(TRIP), k=2*R(1,4), a=u*k, b=v*k, c=w*k, rad=c/2;
    return QB({text:`Một khung cửa hình tam giác vuông có hai cạnh góc vuông dài <b>${a} cm</b> và <b>${b} cm</b>. Người ta vẽ đường tròn đi qua ba đỉnh của khung cửa. Tính bán kính đường tròn đó.`,
      fig:rtTriSVG({w:a,h:b,ab:`${b} cm`,ac:`${a} cm`,bc:'?'}),tpl:'[_] cm',ans:[rad],
      hint:'Tính cạnh huyền; trong tam giác vuông, tâm đường tròn ngoại tiếp là trung điểm cạnh huyền.',
      sol:`Theo định lí Pythagore, cạnh huyền dài ${tm(`\\sqrt{${a}^2+${b}^2}=\\sqrt{${c*c}}=${c}`)} cm. Trong tam giác vuông, bán kính đường tròn ngoại tiếp bằng nửa cạnh huyền, nên ${tm(`R=\\dfrac{${c}}2=${rad}`)} cm. Vậy bán kính cần tìm là ${tb(`${rad}\\text{ cm}`)}.`}); }
  const sides=pick(HERON), [a,b,c]=sides, p=(a+b+c)/2, S=heronS(sides);
  if(lv===2) return QB({text:`Một bồn hoa hình tam giác có ba cạnh dài ${tm(`${a}\\text{ m},\\ ${b}\\text{ m},\\ ${c}\\text{ m}`)}. Vòi tưới đặt tại tâm đường tròn nội tiếp. Tính khoảng cách ${tm('r')} từ vòi tưới đến mỗi cạnh bồn hoa.`,
    fig:triSVG({a,b,c,la:`${a} m`,lb:`${b} m`,lc:`${c} m`}),tpl:fblank('r'),ans:[{frac:[S,p],mode:'eq'}],
    hint:`Dùng công thức Heron để tìm diện tích, sau đó áp dụng hệ thức ${tm('S=pr')}.`,
    sol:`Nửa chu vi là ${tm(`p=\\dfrac{${a}+${b}+${c}}2=${p}`)} m. Theo công thức Heron, ${tm(`S=\\sqrt{${p}\\cdot${p-a}\\cdot${p-b}\\cdot${p-c}}=${S}`)} m². Từ ${tm('S=pr')}, suy ra ${tm(`r=\\dfrac{S}{p}=\\dfrac{${S}}{${p}}=`)} ${tb(tfrac(S,p))} m.`});
  const Dnum=a*b*c, Dden=2*S;
  return QB({text:`Một biển trang trí hình tam giác có ba cạnh dài ${tm(`${a}\\text{ dm},\\ ${b}\\text{ dm},\\ ${c}\\text{ dm}`)} và được đặt vừa trong một khung tròn đi qua ba đỉnh. Tính đường kính ${tm('D')} của khung tròn.`,
    fig:circTriSVG({side:`${a}, ${b}, ${c} dm`,R:'R'}),tpl:fblank('D'),ans:[{frac:[Dnum,Dden],mode:'eq'}],
    hint:`Tính diện tích bằng công thức Heron, dùng ${tm('S=\\dfrac{abc}{4R}')}, rồi suy ra ${tm('D=2R')}.`,
    sol:`Nửa chu vi là ${tm(`p=${p}`)} dm. Theo công thức Heron, ${tm(`S=\\sqrt{${p}\\cdot${p-a}\\cdot${p-b}\\cdot${p-c}}=${S}`)} dm². Vì ${tm('S=\\dfrac{abc}{4R}')}, ta có ${tm(`D=2R=\\dfrac{abc}{2S}=\\dfrac{${a}\\cdot${b}\\cdot${c}}{2\\cdot${S}}=`)} ${tb(tfrac(Dnum,Dden))} dm.`});
};


lesson(3,'he-thuc-luong-tam-giac','Bài 6. Hệ thức lượng trong tam giác','Định lí côsin, định lí sin; tính góc, nhận dạng tam giác; diện tích, bán kính R, r; bài toán thực tế.',[g6a,g6b,g6c,g6d,g6e]);
lesson(3,'he-thuc-luong-tam-giac-luyen-tap','Bài 6. Hệ thức lượng trong tam giác – Luyện tập thêm','Chọn đúng công thức; định lí côsin, định lí sin; diện tích; bán kính, đường cao; bài toán thực tế.',[g6f,g6g,g6h,g6i,g6j], {introTitle:'Bảng công thức cần nhớ', intro:[
  {t:'Định lí côsin', b:`${tm('a^2=b^2+c^2-2bc\\cos A')}; hệ quả ${tm('\\cos A=\\dfrac{b^2+c^2-a^2}{2bc}')}.`, warn:'Cạnh a phải đối diện góc A; góc A phải xen giữa hai cạnh b và c.', ex:'Biết hai cạnh và góc xen giữa: nghĩ đến định lí côsin trước.'},
  {t:'Định lí sin', b:`${tm('\\dfrac{a}{\\sin A}=\\dfrac{b}{\\sin B}=\\dfrac{c}{\\sin C}=2R')}.`, warn:'Luôn ghép đúng cạnh với góc đối diện.', ex:'Biết một cặp cạnh – góc đối diện và thêm một cạnh hoặc góc: dùng định lí sin.'},
  {t:'Diện tích tam giác', b:`${tm('S=\\dfrac{1}{2}bc\\sin A=\\sqrt{p(p-a)(p-b)(p-c)}=pr=\\dfrac{abc}{4R}')}.`, warn:`Trong công thức Heron, ${tm('p')} là nửa chu vi.`, ex:'Chọn công thức có nhiều dữ kiện đề bài đã cho nhất để giảm số bước.'},
  {t:'Đường cao và bán kính', b:`${tm('h_a=\\dfrac{2S}{a}')}, ${tm('r=\\dfrac{S}{p}')}, ${tm('R=\\dfrac{abc}{4S}')}.`, warn:'Độ dài, diện tích và bán kính luôn dương.', ex:'Nếu chưa thấy công thức dùng ngay, hãy tính diện tích làm đại lượng trung gian.'}
]});
lesson(3,'he-thuc-luong-tam-giac-luyen-tap-2','Bài 6. Hệ thức lượng trong tam giác – Luyện tập thêm 2','Toán thực tế: hành trình; đo sông; đo chiều cao; diện tích và chi phí; đường tròn trong công trình tam giác.',[g6k,g6l,g6m,g6n,g6o], {introTitle:'Quy trình giải toán thực tế', intro:[
  {t:'Mô hình hóa', b:'Đọc kĩ tình huống, vẽ tam giác, ghi độ dài và góc vào đúng vị trí.', warn:'Phải xác định cạnh nào đối diện góc nào và góc nào xen giữa hai cạnh.', ex:'Hai hướng xuất phát từ cùng một điểm tạo thành hai cạnh và góc xen giữa.'},
  {t:'Chọn hệ thức', b:`Hai cạnh và góc xen giữa: định lí côsin. Một cặp cạnh–góc đối diện: định lí sin. Chiều cao: tỉ số lượng giác. Diện tích: ${tm('S=\\dfrac{1}{2}bc\\sin A')} hoặc Heron.`, warn:'Không thay số trước khi viết đúng công thức tổng quát.', ex:'Đo chiều cao từ khoảng cách ngang và góc nâng: dùng tang.'},
  {t:'Đơn vị và làm tròn', b:'Đổi các đại lượng về cùng đơn vị trước khi tính; chỉ làm tròn ở kết quả cuối theo yêu cầu.', warn:'Diện tích dùng đơn vị vuông; chi phí bằng diện tích nhân đơn giá.', ex:'Kết quả yêu cầu đến hàng phần mười thì giữ thêm chữ số trong các bước trung gian.'},
  {t:'Kiểm tra kết quả', b:'Độ dài và diện tích phải dương; cạnh tam giác phải thỏa mãn bất đẳng thức tam giác; kết quả phải phù hợp tình huống.', warn:'Nếu cạnh đối diện góc lớn hơn lại ngắn hơn cạnh đối diện góc nhỏ hơn, cần kiểm tra lại phép tính.', ex:'Ước lượng trước giúp phát hiện lỗi bấm máy và lỗi nhập đơn vị.'}
]});
const reviewC3 = (make,band,type) => () => Object.assign(make(),{reviewBand:band,reviewType:type});
const REVIEW_C3 = [
  reviewC3(()=>g5a(1),1,'luong-giac'),       // 1. giá trị lượng giác góc đặc biệt
  reviewC3(()=>g5a(2),1,'luong-giac'),       // 2. giá trị lượng giác góc tù
  reviewC3(()=>g5b(1),1,'luong-giac'),       // 3. hai góc bù nhau
  reviewC3(()=>g5c(1),1,'luong-giac'),       // 4. dấu của giá trị lượng giác
  reviewC3(()=>g5d(1),1,'luong-giac'),       // 5. biểu thức lượng giác cơ bản
  reviewC3(()=>g6f(1),1,'cong-thuc'),        // 6. chọn đúng công thức
  reviewC3(()=>g6a(1),1,'cosin'),            // 7. định lí côsin tính cạnh
  reviewC3(()=>g5c(2),2,'luong-giac'),       // 8. tính giá trị còn lại
  reviewC3(()=>g5d(2),2,'luong-giac'),       // 9. biểu thức lượng giác tổng hợp
  reviewC3(()=>g6b(2),2,'cosin'),            // 10. định lí côsin tính góc
  reviewC3(()=>g6b(3),2,'cosin'),            // 11. nhận dạng tam giác
  reviewC3(()=>g6c(2),2,'sin'),              // 12. định lí sin tính cạnh
  reviewC3(()=>g6c(1),2,'sin'),              // 13. bán kính ngoại tiếp từ định lí sin
  reviewC3(()=>g6d(1),2,'dien-tich'),        // 14. diện tích theo hai cạnh và góc xen giữa
  reviewC3(()=>g6d(2),3,'dien-tich'),        // 15. diện tích theo công thức Heron
  reviewC3(()=>g6o(2),3,'ban-kinh'),         // 16. bán kính đường tròn nội tiếp
  reviewC3(()=>g6o(3),3,'ban-kinh'),         // 17. đường tròn ngoại tiếp công trình tam giác
  reviewC3(()=>g6k(2),3,'thuc-te'),          // 18. khoảng cách trong hành trình
  reviewC3(()=>g6m(3),3,'thuc-te'),          // 19. đo chiều cao từ hai điểm
  reviewC3(()=>g6n(3),3,'thuc-te'),          // 20. diện tích và chi phí thực tế
];
lesson(3,'on-tap-c3','Ôn tập chương III – Bộ 20 câu','Mỗi đề 20 câu từ cơ bản đến nâng cao: lượng giác; định lí côsin, sin; diện tích; bán kính; bài toán thực tế.',REVIEW_C3,{count:20,introTitle:'Sơ đồ kiến thức Chương III',intro:[
  {t:'Giá trị lượng giác', b:`Ghi nhớ bảng góc đặc biệt và các hệ thức góc bù: ${tm('\\sin(180^\\circ-\\alpha)=\\sin\\alpha')}, ${tm('\\cos(180^\\circ-\\alpha)=-\\cos\\alpha')}.`, warn:`Với góc tù: ${tm('\\sin\\alpha\\gt 0')}, ${tm('\\cos\\alpha\\lt 0')}, ${tm('\\tan\\alpha\\lt 0')}.`, ex:'Dùng hệ thức cơ bản để tính giá trị lượng giác còn lại khi biết một giá trị.'},
  {t:'Định lí côsin và định lí sin', b:`${tm('a^2=b^2+c^2-2bc\\cos A')}; ${tm('\\dfrac{a}{\\sin A}=\\dfrac{b}{\\sin B}=\\dfrac{c}{\\sin C}=2R')}.`, warn:'Luôn ghép cạnh với góc đối diện; trong định lí côsin, góc phải xen giữa hai cạnh đã biết.', ex:'Hai cạnh và góc xen giữa: dùng côsin. Một cặp cạnh–góc đối diện: dùng sin.'},
  {t:'Diện tích và bán kính', b:`${tm('S=\\dfrac{1}{2}bc\\sin A=\\sqrt{p(p-a)(p-b)(p-c)}=pr=\\dfrac{abc}{4R}')}.`, warn:`Trong công thức Heron, ${tm('p')} là nửa chu vi.`, ex:'Biết ba cạnh thì tính nửa chu vi và diện tích trước, sau đó tìm bán kính.'},
  {t:'Cấu trúc mỗi đề', b:'Câu 1–7 cơ bản; câu 8–14 thông hiểu và vận dụng; câu 15–20 nâng cao, gắn với đo đạc và chi phí thực tế.', warn:'Chỉ làm tròn ở kết quả cuối và luôn ghi đúng đơn vị.', ex:'Nếu chưa chọn được công thức, hãy vẽ tam giác và đánh dấu toàn bộ dữ kiện.'}
]});

/* =====================================================================
   CỦNG CỐ KIỂM TRA CHƯƠNG III – chủ đề 91 (thầy yêu cầu 14/10/2026)
   Bộ ôn tập cho bài kiểm tra: câu dễ sai – dễ nhầm, toán thực tế có hình vẽ.
   6 bài: 1 Giá trị lượng giác · 2 Côsin – sin · 3 Diện tích – bán kính · 4–5 Thực tế có hình · Đề tổng hợp 15 câu.
   Mỗi dạng 3 mức; đáp án chọn trước khi dựng đề; hint không lộ đáp án; mọi đáp số tính lại bằng phép tính độc lập (c3chk).
   ===================================================================== */
G.topics.push({id:94, hk:1, name:'Thử thách hôm nay', label:'📝 Thử thách hôm nay', grp:'📝 Ôn tập · Củng cố · Kiểm tra'});
G.topics.push({id:93, hk:1, name:'Kiểm tra và ôn tập Chương I – II', label:'📝 Kiểm tra Chương I – II', grp:'📝 Ôn tập · Củng cố · Kiểm tra'});
G.topics.push({id:91, hk:1, name:'Củng cố kiểm tra Chương III', label:'📝 Củng cố Chương III', grp:'📝 Ôn tập · Củng cố · Kiểm tra'});
const c3chk = (ok, msg) => { if(!ok) throw new Error('c3k: ' + msg); };
const c3rad = d => d * Math.PI / 180;
const c3KT = (t, b, warn, ex) => ({t, b, warn, ex});
const C3T = 'Kiến thức cần nhớ · Chỗ dễ sai · Mẹo';
const FN = {sin:'\\sin', cos:'\\cos', tan:'\\tan', cot:'\\cot'};
const SGN = {sin:'', cos:'-', tan:'-', cot:'-'};          // dấu khi đổi sang góc bù
const NUMF = {sin:x => Math.sin(c3rad(x)), cos:x => Math.cos(c3rad(x)), tan:x => Math.tan(c3rad(x)), cot:x => 1 / Math.tan(c3rad(x))};
const SQ2 = '\\sqrt{2}', SQ3 = '\\sqrt{3}';
// đáp số: nguyên → ô số; phân số → ô phân số
const fracAns = (name, n, d) => { const g = gcd(n, d) || 1; n /= g; d /= g; if(d < 0){ n = -n; d = -d; }
  return d === 1 ? {tpl:blank(name), ans:[n], v:String(n)} : {tpl:fblank(name), ans:[{frac:[n, d], mode:'eq'}], v:tfrac(n, d)}; };
const poly = terms => { let out = ''; terms.filter(t => t[0]).forEach(([c, s], i) => { const ab = Math.abs(c), co = (ab === 1 && s) ? '' : ab;
  out += (i ? (c < 0 ? ' - ' : ' + ') : (c < 0 ? '-' : '')) + co + s; }); return out || '0'; };
const trip3 = () => { const [p, q, h] = pick(TRIP), sw = Math.random() < .5; return sw ? {o:p, a:q, h} : {o:q, a:p, h}; };   // sin = o/h, |cos| = a/h
const nr9 = (x, y) => Math.abs(x - y) < 1e-9;
const pm = n => n < 0 ? `(${n})` : String(n);

/* ---------- BÀI 1. GIÁ TRỊ LƯỢNG GIÁC – CHỖ DỄ SAI ---------- */
const SGN_NEG = [['\\sin\\alpha\\cdot\\cos\\alpha', '(+)\\cdot(-) = -'], ['\\sin\\alpha\\cdot\\tan\\alpha', '(+)\\cdot(-) = -'], ['\\tan\\alpha + \\cot\\alpha', '(-) + (-) = -'],
  ['\\cos\\alpha - \\sin\\alpha', '(-) - (+) = -'], ['\\sin\\alpha\\cdot\\cot\\alpha', '(+)\\cdot(-) = -'], ['\\cos\\alpha + \\tan\\alpha', '(-) + (-) = -']];
const SGN_POS = [['\\cos\\alpha\\cdot\\tan\\alpha', '(-)\\cdot(-) = +'], ['\\sin\\alpha - \\cos\\alpha', '(+) - (-) = +'], ['\\cos\\alpha\\cdot\\cot\\alpha', '(-)\\cdot(-) = +'],
  ['\\tan\\alpha\\cdot\\cot\\alpha', '(-)\\cdot(-) = +'], ['\\sin\\alpha - \\tan\\alpha', '(+) - (-) = +']];
const cA1 = lv => {   // góc bù và dấu
  if(lv === 1){
    const a = pick([20,30,40,50,60,70]), b = 180 - a, bad = pick(['sin','cos','tan','cot']);
    const eq = f => `${FN[f]} ${DG(b)} = ${f === bad ? (SGN[f] ? '' : '-') : SGN[f]}${FN[f]} ${DG(a)}`;
    return QC({text:`Hai góc ${tm(DG(a))} và ${tm(DG(b))} bù nhau. Đẳng thức nào sau đây <b>sai</b>?`, opts:['sin','cos','tan','cot'].map(f => tm(eq(f))), ans:tm(eq(bad)),
      hint:'Hai góc bù nhau thì sin bằng nhau, còn côsin, tang, côtang đối nhau.',
      sol:`Vì ${tm(`${DG(a)} + ${DG(b)} = 180^\\circ`)} nên ${TABLE}. Đẳng thức sai là ${tb(eq(bad))}.`});
  }
  if(lv === 2){
    const wantNeg = Math.random() < .5, good = pick(wantNeg ? SGN_NEG : SGN_POS), bads = shuffle(wantNeg ? SGN_POS : SGN_NEG).slice(0, 3);
    return QC({text:`Cho ${tm('90^\\circ \\lt \\alpha \\lt 180^\\circ')}. Biểu thức nào sau đây mang dấu <b>${wantNeg ? 'âm' : 'dương'}</b>?`, opts:[good, ...bads].map(x => tm(x[0])), ans:tm(good[0]),
      hint:`Với góc tù: ${tm('\\sin\\alpha \\gt 0')}; còn ${tm('\\cos\\alpha')}, ${tm('\\tan\\alpha')}, ${tm('\\cot\\alpha')} đều âm. Xét dấu từng biểu thức.`,
      sol:`Góc tù: ${tm('\\sin\\alpha \\gt 0')}, ${tm('\\cos\\alpha \\lt 0')}, ${tm('\\tan\\alpha \\lt 0')}, ${tm('\\cot\\alpha \\lt 0')}. ` + [good, ...bads].map(x => `${tm(x[0])}: ${tm(x[1])}`).join('; ') + `. Đáp án: ${tb(good[0])}.`});
  }
  const x = R(15, 80), v = R(0, 3);
  const C = [{c:`\\sin\\alpha = \\sin ${DG(x)}`, ex:`${tm('\\alpha')} là góc tù`, why:`${tm('\\sin\\alpha = \\sin\\beta')} khi hai góc bằng nhau hoặc bù nhau, nên ${tm(`\\alpha = ${DG(x)}`)} hoặc ${tm(`\\alpha = ${DG(180 - x)}`)}; góc tù là ${tm(`\\alpha = ${DG(180 - x)}`)}`},
    {c:`\\cos\\alpha = -\\cos ${DG(x)}`, ex:tm('0^\\circ \\le \\alpha \\le 180^\\circ'), why:`${tm(`-\\cos ${DG(x)} = \\cos(180^\\circ - ${DG(x)})`)}, mà côsin là hàm đơn điệu trên ${tm('[0^\\circ;\\ 180^\\circ]')}, nên ${tm(`\\alpha = ${DG(180 - x)}`)}`},
    {c:`\\tan\\alpha = -\\tan ${DG(x)}`, ex:tm('0^\\circ \\lt \\alpha \\lt 180^\\circ'), why:`${tm(`-\\tan ${DG(x)} = \\tan(180^\\circ - ${DG(x)})`)} và ${tm('\\tan\\alpha')} âm chỉ khi ${tm('\\alpha')} tù, nên ${tm(`\\alpha = ${DG(180 - x)}`)}`},
    {c:`\\cot\\alpha = -\\cot ${DG(x)}`, ex:tm('0^\\circ \\lt \\alpha \\lt 180^\\circ'), why:`${tm(`-\\cot ${DG(x)} = \\cot(180^\\circ - ${DG(x)})`)} và ${tm('\\cot\\alpha')} âm chỉ khi ${tm('\\alpha')} tù, nên ${tm(`\\alpha = ${DG(180 - x)}`)}`}][v];
  return QB({text:`Cho ${tm(C.c)}, trong đó ${C.ex}. Tính số đo ${tm('\\alpha')}.`, tpl:`<span class="eq">${tm('\\alpha =')} [_]°</span>`, ans:[180 - x],
    hint:`Đưa vế phải về cùng một hàm lượng giác của góc bù ${tm(DG(180))} trừ ${tm(DG(x))}: ${TABLE}.`,
    sol:`${C.why}. Vậy ${tb(`\\alpha = ${DG(180 - x)}`)}.`});
};

const cA2 = lv => {   // tam giác ABC: A + B + C = 180°
  if(lv === 1){
    const [X, Y, Z] = shuffle(['A','B','C']), f = pick(['sin','cos','tan','cot']);
    const rel = (g, flip) => `${FN[g]}(${X} + ${Y}) = ${flip ? (SGN[g] ? '' : '-') : SGN[g]}${FN[g]} ${Z}`;
    return QC({text:`Trong tam giác ${tm('ABC')}, đẳng thức nào sau đây <b>đúng</b>?`, opts:['sin','cos','tan','cot'].map(g => tm(rel(g, g !== f))), ans:tm(rel(f, false)),
      hint:`Tổng ba góc của tam giác bằng ${tm('180^\\circ')}, nên ${tm(`${X} + ${Y}`)} và ${tm(Z)} là hai góc bù nhau.`,
      sol:`${tm(`${X} + ${Y} = 180^\\circ - ${Z}`)}, nên ${tm(`${FN[f]}(${X} + ${Y}) = ${FN[f]}(180^\\circ - ${Z}) = ${SGN[f]}${FN[f]} ${Z}`)}. Đáp án: ${tb(rel(f, false))}.`});
  }
  const t = trip3();
  if(lv === 2){
    const askSin = Math.random() < .5, r = askSin ? fracAns('\\sin(B + C)', t.o, t.h) : fracAns('\\cos(B + C)', t.a, t.h);
    return QB({text:`Cho tam giác ${tm('ABC')} có ${tm(`\\cos A = -${tf(t.a, t.h)}`)}. Tính ${tm(askSin ? '\\sin(B + C)' : '\\cos(B + C)')}.`, tpl:r.tpl, ans:r.ans,
      hint:`${tm('B + C = 180^\\circ - A')}. Dùng công thức góc bù${askSin ? `, rồi ${tm('\\sin^2 A + \\cos^2 A = 1')}` : ''}.`,
      sol: askSin
        ? `${tm('\\sin(B + C) = \\sin(180^\\circ - A) = \\sin A')}. Vì ${tm('\\sin A \\gt 0')} nên ${tm(`\\sin A = \\sqrt{1 - ${tf(t.a * t.a, t.h * t.h)}} = `)} ${tb(r.v)}.`
        : `${tm('\\cos(B + C) = \\cos(180^\\circ - A) = -\\cos A')} ${tm(`= ${tf(t.a, t.h)}`)}. Vậy ${tb(r.v)}.`});
  }
  const m = R(1, 3), n = R(1, 3), r = fracAns('E', m * t.o - n * t.a, t.h);
  return QB({text:`Cho tam giác ${tm('ABC')} có ${tm(`\\cos A = -${tf(t.a, t.h)}`)}. Tính ${tm(`E = ${poly([[m, '\\sin(B + C)'], [n, '\\cos A']])}`)}.`, tpl:r.tpl, ans:r.ans, wide:true,
    hint:`Đổi ${tm('\\sin(B + C)')} về ${tm('\\sin A')}; góc ${tm('A')} tù (côsin âm) nên ${tm('\\sin A \\gt 0')}.`,
    sol:`${tm('\\sin(B + C) = \\sin A')} và ${tm(`\\sin A = \\sqrt{1 - ${tf(t.a * t.a, t.h * t.h)}} = ${tf(t.o, t.h)}`)}. ${tm(`E = ${m}\\cdot ${tf(t.o, t.h)} + ${n}\\cdot\\left(-${tf(t.a, t.h)}\\right) = ${tf(m * t.o - n * t.a, t.h)} =`)} ${tb(r.v)}.`});
};

const cA3 = lv => {   // so sánh – tìm góc từ đẳng thức lượng giác
  if(lv === 1){
    const f = pick(['sin','cos','tan','cot']), a = pick([20,30,40,50,60,70,80]), b = 180 - a, v = x => Math.round(NUMF[f](x) * 1e9) / 1e9;
    return QCmp('Điền dấu thích hợp:', tm(`${FN[f]} ${DG(b)}`), tm(`${FN[f]} ${DG(a)}`), v(b), v(a),
      {hint:`${tm(DG(b))} và ${tm(DG(a))} là hai góc bù nhau. Nhớ lại bảng: ${TABLE}.`,
       sol: f === 'sin' ? `${tm(`\\sin ${DG(b)} = \\sin ${DG(a)}`)} (hai góc bù nhau có sin bằng nhau). Vậy ${tb('=')}.`
         : `${tm(`${FN[f]} ${DG(b)} = -${FN[f]} ${DG(a)}`)} và ${tm(`${FN[f]} ${DG(a)} \\gt 0`)} (góc nhọn), nên vế trái âm, nhỏ hơn vế phải. Vậy ${tb('\\lt')}.`});
  }
  if(lv === 2){
    const f = pick(['sin','cos','tan','cot']), x = pick([20,25,30,35,40,50,55,60,65,70]), both = f === 'sin';
    const good = both ? `${x}° hoặc ${180 - x}°` : `${x}°`;
    return QC({text:`Cho ${tm('0^\\circ \\lt \\alpha \\lt 180^\\circ')} thoả mãn ${tm(`${FN[f]}\\alpha = ${FN[f]} ${DG(x)}`)}. Khi đó ${tm('\\alpha')} bằng`,
      opts:both ? [good, `${x}°`, `${180 - x}°`, `${90 - x}° hoặc ${90 + x}°`] : [good, `${180 - x}°`, `${x}° hoặc ${180 - x}°`, `${90 - x}°`], ans:good,
      hint: both ? 'Hai góc khác nhau trong khoảng đang xét có thể có cùng sin; hãy nhớ góc bù.' : 'Xét xem hai góc bù nhau có cho cùng giá trị hay giá trị đối nhau.',
      sol: both ? `${tm('\\sin\\alpha = \\sin\\beta')} xảy ra khi ${tm('\\alpha = \\beta')} hoặc ${tm('\\alpha = 180^\\circ - \\beta')}. Cả hai đều thuộc khoảng đã cho, nên ${tb(`\\alpha = ${DG(x)}\\text{ hoặc }${DG(180 - x)}`)}.`
        : `Hai góc bù nhau có ${FN[f] === '\\cos' ? 'côsin' : FN[f] === '\\tan' ? 'tang' : 'côtang'} đối nhau (khác nhau, trừ khi bằng 0), nên đẳng thức chỉ xảy ra khi hai góc bằng nhau: ${tb(`\\alpha = ${DG(x)}`)}.`});
  }
  const al = pick([100,110,120,130,140,150,160]), big = Math.random() < .5, fs = ['sin','cos','tan','cot'];
  const vals = fs.map(f => NUMF[f](al)), sorted = vals.map((v, i) => [v, i]).sort((p, q) => p[0] - q[0]);
  c3chk(sorted[1][0] - sorted[0][0] > 1e-6 && sorted[3][0] - sorted[2][0] > 1e-6, 'trùng giá trị cực trị');
  const pickI = big ? sorted[3][1] : sorted[0][1], r2 = x => tdec(Math.round(x * 100) / 100);
  return QC({text:`Trong bốn số ${fs.map(f => tm(`${FN[f]} ${DG(al)}`)).join(', ')}, số nào <b>${big ? 'lớn nhất' : 'nhỏ nhất'}</b>?`, opts:fs.map(f => tm(`${FN[f]} ${DG(al)}`)), ans:tm(`${FN[fs[pickI]]} ${DG(al)}`),
    hint:`Góc tù: chỉ ${tm('\\sin')} dương. Với ba số âm, so sánh độ lớn (giá trị tuyệt đối) của chúng.`,
    sol:`Tính gần đúng: ${fs.map((f, i) => tm(`${FN[f]} ${DG(al)} \\approx ${r2(vals[i])}`)).join('; ')}. Số ${big ? 'lớn nhất' : 'nhỏ nhất'} là ${tb(`${FN[fs[pickI]]} ${DG(al)}`)}.`});
};

const cA4 = lv => {   // biểu thức đẳng cấp: chia cho cos α
  if(lv === 1){
    const t = R(2, 5), u = R(1, 3), v = pick([-3,-2,-1,1,2,3]), val = u * t + v, uc = u === 1 ? '' : `${u}\\cdot `;
    return QB({text:`Cho ${tm(`\\tan\\alpha = ${t}`)}. Tính ${tm(`P = \\dfrac{${poly([[u, '\\sin\\alpha'], [v, '\\cos\\alpha']])}}{\\cos\\alpha}`)}.`, tpl:blank('P'), ans:[val],
      hint:`Tách tử thành hai hạng tử, mỗi hạng tử chia cho ${tm('\\cos\\alpha')}; dùng ${tm('\\dfrac{\\sin\\alpha}{\\cos\\alpha} = \\tan\\alpha')}.`,
      sol:`${tm(`P = ${uc}\\dfrac{\\sin\\alpha}{\\cos\\alpha} ${v < 0 ? '-' : '+'} ${Math.abs(v)} = ${uc}\\tan\\alpha ${v < 0 ? '-' : '+'} ${Math.abs(v)} = ${u}\\cdot ${t} ${v < 0 ? '-' : '+'} ${Math.abs(v)} =`)} ${tb(val)}.`});
  }
  if(lv === 2){
    let t, u, v, w, z, den;
    do{ t = pick([2,3,4,-2,-3,-4]); u = R(1, 4); v = pick([-3,-2,-1,1,2,3]); w = R(1, 3); z = pick([-3,-2,-1,1,2,3]); den = w * t + z; }while(den === 0 || u * t + v === 0);
    const r = fracAns('P', u * t + v, den);
    return QB({text:`Cho ${tm(`\\tan\\alpha = ${t}`)}. Tính ${tm(`P = \\dfrac{${poly([[u, '\\sin\\alpha'], [v, '\\cos\\alpha']])}}{${poly([[w, '\\sin\\alpha'], [z, '\\cos\\alpha']])}}`)}.`, tpl:r.tpl, ans:r.ans,
      hint:`Chia cả tử và mẫu cho ${tm('\\cos\\alpha')} (khác 0 vì ${tm('\\tan\\alpha')} xác định) để đưa về ${tm('\\tan\\alpha')}.`,
      sol:`Chia tử và mẫu cho ${tm('\\cos\\alpha')}: ${tm(`P = \\dfrac{${poly([[u, '\\tan\\alpha'], [v, '']])}}{${poly([[w, '\\tan\\alpha'], [z, '']])}} = \\dfrac{${u}\\cdot ${pm(t)} ${v < 0 ? '-' : '+'} ${Math.abs(v)}}{${w}\\cdot ${pm(t)} ${z < 0 ? '-' : '+'} ${Math.abs(z)}} = \\dfrac{${u * t + v}}{${den}}`)}. Vậy ${tb(r.v)}.`});
  }
  let t, a, b, c, d, e, num, den;
  do{ t = pick([2,3,4,-2,-3]); a = R(1, 3); b = pick([-3,-2,-1,1,2,3]); c = pick([-2,-1,1,2,3]); d = R(1, 3); e = R(1, 3); num = a * t * t + b * t + c; den = d * t * t + e; }while(num === 0);
  const r = fracAns('Q', num, den);
  return QB({text:`Cho ${tm(`\\tan\\alpha = ${t}`)}. Tính ${tm(`Q = \\dfrac{${poly([[a, '\\sin^2\\alpha'], [b, '\\sin\\alpha\\cos\\alpha'], [c, '\\cos^2\\alpha']])}}{${poly([[d, '\\sin^2\\alpha'], [e, '\\cos^2\\alpha']])}}`)}.`, tpl:r.tpl, ans:r.ans, wide:true,
    hint:`Chia cả tử và mẫu cho ${tm('\\cos^2\\alpha')} để mọi hạng tử đều đưa về ${tm('\\tan\\alpha')}.`,
    sol:`Chia tử và mẫu cho ${tm('\\cos^2\\alpha')}: ${tm(`Q = \\dfrac{${poly([[a, '\\tan^2\\alpha'], [b, '\\tan\\alpha'], [c, '']])}}{${poly([[d, '\\tan^2\\alpha'], [e, '']])}} = \\dfrac{${a}\\cdot ${t * t} ${b < 0 ? '-' : '+'} ${Math.abs(b)}\\cdot ${pm(t)} ${c < 0 ? '-' : '+'} ${Math.abs(c)}}{${d}\\cdot ${t * t} + ${e}} = \\dfrac{${num}}{${den}}`)}. Vậy ${tb(r.v)}.`});
};

lesson(91, 'c3k-luong-giac', 'Củng cố Chương III · 1. Giá trị lượng giác – chỗ dễ sai', 'Góc bù và dấu; tam giác có A + B + C = 180°; so sánh và tìm góc; biểu thức chia cho cos α.', [cA1, cA2, cA3, cA4], {introTitle:C3T, intro:[
  c3KT('Góc bù nhau', `${tm('\\sin(180^\\circ - \\alpha) = \\sin\\alpha')}; ${tm('\\cos(180^\\circ - \\alpha) = -\\cos\\alpha')}; ${tm('\\tan(180^\\circ - \\alpha) = -\\tan\\alpha')}; ${tm('\\cot(180^\\circ - \\alpha) = -\\cot\\alpha')}.`, 'Chỉ <b>sin</b> giữ nguyên dấu; côsin, tang, côtang đều đổi dấu.', `Góc tù: chỉ ${tm('\\sin')} dương. Nhớ “sin giữ – còn lại đổi”.`),
  c3KT('Tam giác ABC', `${tm('A + B + C = 180^\\circ')} nên ${tm('\\sin(A + B) = \\sin C')}, ${tm('\\cos(A + B) = -\\cos C')}, ${tm('\\tan(A + B) = -\\tan C')}.`, `Rất hay quên dấu trừ ở ${tm('\\cos')} và ${tm('\\tan')}.`, `Thấy ${tm('B + C')}, hãy đổi ngay thành ${tm('180^\\circ - A')}.`),
  c3KT('Biết một giá trị, tìm giá trị khác', `${tm('\\sin^2\\alpha + \\cos^2\\alpha = 1')}; ${tm('\\tan\\alpha = \\dfrac{\\sin\\alpha}{\\cos\\alpha}')}.`, `${tm('\\sin\\alpha \\ge 0')} với mọi ${tm('\\alpha')} trong ${tm('[0^\\circ;\\ 180^\\circ]')}; dấu của ${tm('\\cos\\alpha')} phụ thuộc góc nhọn hay tù.`, `Biểu thức thuần nhất theo ${tm('\\sin, \\cos')}: chia cả tử và mẫu cho ${tm('\\cos\\alpha')} (hoặc ${tm('\\cos^2\\alpha')}) để đưa về ${tm('\\tan\\alpha')}.`)
]});

/* ---------- BÀI 2. ĐỊNH LÍ CÔSIN, ĐỊNH LÍ SIN – CHỖ HAY NHẦM ---------- */
const C3N = [['M','N','P'], ['D','E','F'], ['X','Y','Z'], ['K','L','H']];
const cB1 = lv => {   // viết đúng công thức với tên đỉnh bất kì
  const vs = pick(C3N), i = R(0, 2), V = vs[i], U1 = vs[(i + 1) % 3], U2 = vs[(i + 2) % 3], opp = U1 + U2, s1 = V + U1, s2 = V + U2, tri = vs.join('');
  if(lv === 1){
    const good = `${opp}^2 = ${s1}^2 + ${s2}^2 - 2\\cdot ${s1}\\cdot ${s2}\\cos ${V}`;
    const bads = shuffle([`${opp}^2 = ${s1}^2 + ${s2}^2 + 2\\cdot ${s1}\\cdot ${s2}\\cos ${V}`, `${opp}^2 = ${s1}^2 + ${s2}^2 - 2\\cdot ${s1}\\cdot ${s2}\\cos ${U1}`,
      `${opp}^2 = ${s1}^2 + ${s2}^2 - ${s1}\\cdot ${s2}\\cos ${V}`, `${opp}^2 = ${s1}^2 + ${s2}^2 - 2\\cdot ${s1}\\cdot ${s2}\\sin ${V}`]).slice(0, 3);
    return QC({text:`Cho tam giác ${tm(tri)}. Công thức nào sau đây là định lí côsin <b>đúng</b> cho cạnh ${tm(opp)}?`, opts:[good, ...bads].map(tm), ans:tm(good),
      hint:`Cạnh cần tính là ${tm(opp)}, đối diện đỉnh ${tm(V)}. Góc trong công thức phải là góc xen giữa hai cạnh còn lại.`,
      sol:`Cạnh ${tm(opp)} đối diện góc ${tm(V)}; hai cạnh kề ${tm(V)} là ${tm(s1)} và ${tm(s2)}. Vậy ${tb(good)}.`});
  }
  if(lv === 2){
    const good = `\\cos ${V} = \\dfrac{${s1}^2 + ${s2}^2 - ${opp}^2}{2\\cdot ${s1}\\cdot ${s2}}`;
    const bads = shuffle([`\\cos ${V} = \\dfrac{${opp}^2 - ${s1}^2 - ${s2}^2}{2\\cdot ${s1}\\cdot ${s2}}`, `\\cos ${V} = \\dfrac{${s1}^2 + ${s2}^2 - ${opp}^2}{${s1}\\cdot ${s2}}`,
      `\\cos ${V} = \\dfrac{${s1}^2 + ${s2}^2 + ${opp}^2}{2\\cdot ${s1}\\cdot ${s2}}`, `\\cos ${V} = \\dfrac{${opp}^2 + ${s1}^2 - ${s2}^2}{2\\cdot ${opp}\\cdot ${s1}}`]).slice(0, 3);
    return QC({text:`Cho tam giác ${tm(tri)}. Hệ quả của định lí côsin cho góc ${tm(V)} là`, opts:[good, ...bads].map(tm), ans:tm(good),
      hint:`Bình phương cạnh đối diện ${tm(V)} luôn bị trừ; mẫu số có hệ số 2 và là tích hai cạnh kề ${tm(V)}.`,
      sol:`Từ ${tm(`${opp}^2 = ${s1}^2 + ${s2}^2 - 2\\cdot ${s1}\\cdot ${s2}\\cos ${V}`)}, chuyển vế và chia cho ${tm(`2\\cdot ${s1}\\cdot ${s2}`)}: ${tb(good)}.`});
  }
  const good = `\\dfrac{${opp}}{\\sin ${V}} = 2R`;
  const bads = shuffle([`\\dfrac{${s1}}{\\sin ${V}} = 2R`, `\\dfrac{${opp}}{\\cos ${V}} = 2R`, `${opp}\\cdot\\sin ${V} = 2R`, `\\dfrac{\\sin ${V}}{${opp}} = 2R`]).slice(0, 3);
  return QC({text:`Cho tam giác ${tm(tri)} nội tiếp đường tròn bán kính ${tm('R')}. Đẳng thức nào sau đây <b>đúng</b>?`, opts:[good, ...bads].map(tm), ans:tm(good),
    hint:`Trong định lí sin, mỗi cạnh được chia cho sin của góc <b>đối diện</b> với nó.`,
    sol:`Cạnh ${tm(opp)} đối diện góc ${tm(V)}, nên theo định lí sin ${tb(good)}.`});
};

const cB2 = lv => {   // tính góc từ ba cạnh (hệ quả định lí côsin)
  const A = [90, 60, 120][lv - 1], k = lv === 1 ? R(1, 2) : 1, [b0, c0, a0] = pick(A === 90 ? P90 : A === 60 ? P60 : P120), [b, c, a] = [b0 * k, c0 * k, a0 * k];
  const N = b * b + c * c - a * a, cosT = A === 90 ? '0' : A === 60 ? tf(1, 2) : '-' + tf(1, 2);
  c3chk(nr9(N / (2 * b * c), Math.cos(c3rad(A))), 'cos A');
  return QB({text:`Tam giác ${tm('ABC')} có ${tm(`BC = ${a}`)}, ${tm(`CA = ${b}`)}, ${tm(`AB = ${c}`)}. Tính số đo góc ${tm('A')}.`, fig:triSVG({a, b, c, la:`${a}`, lb:`${b}`, lc:`${c}`, gA:'?'}),
    tpl:`<span class="eq">${tm('\\widehat{A} =')} [_]°</span>`, ans:[A],
    hint:`Dùng hệ quả ${tm('\\cos A = \\dfrac{b^2 + c^2 - a^2}{2bc}')} với ${tm('a')} là cạnh đối diện góc ${tm('A')}. Côsin âm thì góc tù.`,
    sol:`${tm(`\\cos A = \\dfrac{${b}^2 + ${c}^2 - ${a}^2}{2\\cdot ${b}\\cdot ${c}} = \\dfrac{${N}}{${2 * b * c}} = ${cosT}`)}. ${A === 120 ? 'Côsin âm nên góc tù. ' : ''}Vậy ${tb(`\\widehat{A} = ${DG(A)}`)}.`});
};

const cB3 = lv => {   // nhận dạng tam giác
  if(lv === 1){
    const S = pick([[3,4,6],[2,3,4],[4,5,8],[6,8,10],[5,12,13],[8,15,17],[4,5,6],[5,7,8],[7,8,10],[6,7,9]]), k = R(1, 2), sd = S.map(x => x * k), [x, y, z] = sd;
    const d = x * x + y * y - z * z, ans = d === 0 ? 'Tam giác vuông' : d > 0 ? 'Tam giác nhọn' : 'Tam giác tù';
    c3chk(x + y > z, 'bất đẳng thức tam giác');
    return QC({text:`Tam giác có ba cạnh ${tm(shuffle(sd).join(',\\ '))}. Đó là tam giác`, opts:['Tam giác nhọn', 'Tam giác vuông', 'Tam giác tù', 'Không tồn tại tam giác như vậy'], ans, keepOrder:true,
      hint:`So sánh bình phương cạnh lớn nhất với tổng bình phương hai cạnh còn lại.`,
      sol:`Cạnh lớn nhất ${tm(String(z))}: ${tm(`${x}^2 + ${y}^2 = ${x * x + y * y}`)} và ${tm(`${z}^2 = ${z * z}`)}. ${tm(`${x * x + y * y} ${d === 0 ? '=' : d > 0 ? '\\gt' : '\\lt'} ${z * z}`)} nên đây là ${tb(`\\text{${ans.toLowerCase()}}`)}.`});
  }
  if(lv === 2){
    const F = [{rel:'a^2 = b^2 + c^2 + bc', A:120, c:'-\\dfrac{1}{2}'}, {rel:'a^2 = b^2 + c^2 - bc', A:60, c:'\\dfrac{1}{2}'}, {rel:`a^2 = b^2 + c^2 + ${SQ2}\\,bc`, A:135, c:`-\\dfrac{${SQ2}}{2}`},
      {rel:`a^2 = b^2 + c^2 - ${SQ2}\\,bc`, A:45, c:`\\dfrac{${SQ2}}{2}`}, {rel:`a^2 = b^2 + c^2 + ${SQ3}\\,bc`, A:150, c:`-\\dfrac{${SQ3}}{2}`}, {rel:`a^2 = b^2 + c^2 - ${SQ3}\\,bc`, A:30, c:`\\dfrac{${SQ3}}{2}`}];
    const f = pick(F), others = shuffle([30,45,60,90,120,135,150].filter(x => x !== f.A && x !== 180 - f.A)).slice(0, 2), opts = [`${f.A}°`, `${180 - f.A}°`, ...others.map(x => `${x}°`)];
    return QC({text:`Tam giác ${tm('ABC')} có ${tm(f.rel)} (với ${tm('a = BC,\\ b = CA,\\ c = AB')}). Số đo góc ${tm('A')} bằng`, opts, ans:`${f.A}°`,
      hint:`So sánh với định lí côsin ${tm('a^2 = b^2 + c^2 - 2bc\\cos A')} để tìm ${tm('\\cos A')}, chú ý dấu.`,
      sol:`Đồng nhất với ${tm('a^2 = b^2 + c^2 - 2bc\\cos A')} ta được ${tm(`\\cos A = ${f.c}`)}. Vậy ${tb(`\\widehat{A} = ${DG(f.A)}`)}.`});
  }
  const right = Math.random() < .5, X = pick(['A','B','C']), [Y, Z] = ['A','B','C'].filter(w => w !== X);
  if(right) return QC({text:`Tam giác ${tm('ABC')} có ${tm(`\\sin^2 ${X} = \\sin^2 ${Y} + \\sin^2 ${Z}`)}. Khẳng định nào sau đây đúng?`,
    opts:[`Tam giác vuông tại ${X}`, `Tam giác vuông tại ${Y}`, `Tam giác vuông tại ${Z}`, 'Tam giác đều'], ans:`Tam giác vuông tại ${X}`,
    hint:`Theo định lí sin, ${tm('\\sin A = \\dfrac{a}{2R}')}. Thay vào đẳng thức để được quan hệ giữa các cạnh.`,
    sol:`Vì ${tm('\\sin A = \\dfrac{a}{2R}')} (tương tự với ${tm('B, C')}), đẳng thức tương đương ${tm(`${X.toLowerCase()}^2 = ${Y.toLowerCase()}^2 + ${Z.toLowerCase()}^2`)}. Theo định lí Pythagore đảo, ${tb(`\\text{tam giác vuông tại } ${X}`)}.`});
  return QC({text:`Tam giác ${tm('ABC')} có ${tm(`\\sin^2 ${X} \\gt \\sin^2 ${Y} + \\sin^2 ${Z}`)}. Khẳng định nào sau đây đúng?`,
    opts:[`Góc ${X} tù`, `Góc ${X} nhọn`, `Tam giác vuông tại ${X}`, 'Tam giác đều'], ans:`Góc ${X} tù`,
    hint:`Chuyển đẳng thức sang các cạnh bằng ${tm('\\sin A = \\dfrac{a}{2R}')}, rồi xét dấu của ${tm('\\cos')} nhờ định lí côsin.`,
    sol:`Đẳng thức tương đương ${tm(`${X.toLowerCase()}^2 \\gt ${Y.toLowerCase()}^2 + ${Z.toLowerCase()}^2`)}, nên ${tm(`\\cos ${X} = \\dfrac{${Y.toLowerCase()}^2 + ${Z.toLowerCase()}^2 - ${X.toLowerCase()}^2}{2${Y.toLowerCase()}${Z.toLowerCase()}} \\lt 0`)}. Vậy ${tb(`\\text{góc } ${X} \\text{ tù}`)}.`});
};

const SINT = {30:tf(1, 2), 45:tf(SQ2, 2), 60:tf(SQ3, 2), 90:'1', 120:tf(SQ3, 2)};
const cB4 = lv => {   // định lí sin: ghép cạnh với góc đối diện
  const [A, B] = [[30, 90], [45, 90], [30, 120]][lv - 1], a = R(3, 12), C = 180 - A - B, sA = NUMF.sin(A), sB = NUMF.sin(B), sC = NUMF.sin(C);
  const bv = a * sB / sA, cv = a * sC / sA, coef = lv === 1 ? 2 : 1;
  c3chk(nr9(bv, lv === 1 ? 2 * a : lv === 2 ? a * Math.SQRT2 : a * Math.sqrt(3)), 'cạnh b');
  const tpl = lv === 1 ? `<span class="eq">${tm('CA =')} [_] m</span>` : `<span class="eq">${tm('CA =')} [_] ${tm(lv === 2 ? SQ2 : SQ3)} m</span>`;
  return QB({text:`Tam giác ${tm('ABC')} có ${tm(`\\widehat{A} = ${DG(A)}`)}, ${tm(`\\widehat{B} = ${DG(B)}`)} và ${tm(`BC = ${a}`)} m. Tính độ dài ${tm('CA')}.`,
    fig:triSVG({a, b:bv, c:cv, la:`${a} m`, lb:'?', gA:`${A}°`, gB:`${B}°`}), tpl, ans:[lv === 1 ? 2 * a : a], wide:true,
    hint:`${tm('BC')} đối diện góc ${tm('A')}, còn ${tm('CA')} đối diện góc ${tm('B')}. Viết ${tm('\\dfrac{BC}{\\sin A} = \\dfrac{CA}{\\sin B}')}.`,
    sol:`Theo định lí sin, ${tm(`CA = \\dfrac{BC\\cdot\\sin B}{\\sin A} = \\dfrac{${a}\\cdot ${SINT[B]}}{${SINT[A]}} = ${lv === 1 ? 2 * a : a + (lv === 2 ? SQ2 : SQ3)}`)}. Vậy ${tb(lv === 1 ? `CA = ${2 * a}\\text{ m}` : `CA = ${a}${lv === 2 ? SQ2 : SQ3}\\text{ m}`)}.`});
};

lesson(91, 'c3k-cong-thuc', 'Củng cố Chương III · 2. Định lí côsin, định lí sin – chỗ hay nhầm', 'Viết đúng công thức theo tên đỉnh; tính góc từ ba cạnh (góc tù!); nhận dạng tam giác; định lí sin ghép cạnh với góc đối.', [cB1, cB2, cB3, cB4], {introTitle:C3T, intro:[
  c3KT('Định lí côsin', `${tm('a^2 = b^2 + c^2 - 2bc\\cos A')}; hệ quả ${tm('\\cos A = \\dfrac{b^2 + c^2 - a^2}{2bc}')}.`, 'Cạnh bên trái là cạnh <b>đối diện</b> góc; góc trong công thức phải <b>xen giữa</b> hai cạnh còn lại. Đổi tên đỉnh thì đổi theo đúng quy tắc, không chép máy móc.', `Côsin <b>âm</b> thì góc <b>tù</b>: ${tm('\\cos A = -\\dfrac{1}{2}')} cho ${tm('A = 120^\\circ')}, không phải ${tm('60^\\circ')}.`),
  c3KT('Định lí sin', `${tm('\\dfrac{a}{\\sin A} = \\dfrac{b}{\\sin B} = \\dfrac{c}{\\sin C} = 2R')}.`, `Ghép cạnh với góc <b>đối diện</b>. Biết ${tm('\\sin')} thì góc có thể nhọn hoặc tù (hai bù nhau); biết ${tm('\\cos')} thì góc xác định duy nhất.`, `Cần góc thứ ba? ${tm('C = 180^\\circ - A - B')} trước rồi mới dùng định lí sin.`),
  c3KT('Nhận dạng tam giác', `Cạnh lớn nhất ${tm('a')}: ${tm('a^2 \\lt b^2 + c^2')} nhọn; ${tm('a^2 = b^2 + c^2')} vuông; ${tm('a^2 \\gt b^2 + c^2')} tù.`, `Phải so sánh với cạnh <b>lớn nhất</b>. Đẳng thức theo ${tm('\\sin')} đổi được sang cạnh nhờ ${tm('\\sin A = \\dfrac{a}{2R}')}.`, 'Gặp đẳng thức lượng giác của ba góc: đổi sin thành cạnh, côsin thành cạnh bằng định lí côsin rồi nhận xét.')
]});

/* ---------- BÀI 3. DIỆN TÍCH, BÁN KÍNH, ĐƯỜNG CAO – CHỖ HAY NHẦM ---------- */
const cC1 = lv => {   // S = ½ bc sin A, kể cả góc tù
  const A = [30, 150, 120][lv - 1], u = R(1, 6), v = R(1, 6), b = 2 * u, c = 2 * v, S = u * v, a = Math.sqrt(b * b + c * c - 2 * b * c * Math.cos(c3rad(A)));
  c3chk(nr9(.5 * b * c * Math.sin(c3rad(A)), A === 120 ? S * Math.sqrt(3) : S), 'diện tích');
  const sinT = A === 120 ? tf(SQ3, 2) : tf(1, 2), res = A === 120 ? `${S}${SQ3}` : String(S);
  return QB({text:`Tam giác ${tm('ABC')} có ${tm(`AB = ${c}`)} cm, ${tm(`AC = ${b}`)} cm và ${tm(`\\widehat{A} = ${DG(A)}`)}. Tính diện tích tam giác.`, fig:triSVG({a, b, c, lb:`${b} cm`, lc:`${c} cm`, gA:`${A}°`}),
    tpl:A === 120 ? `<span class="eq">${tm('S =')} [_] ${tm(SQ3)} cm²</span>` : '[_] cm²', ans:[S],
    hint:`Dùng ${tm('S = \\dfrac{1}{2}bc\\sin A')}.${A === 150 ? ` Góc tù: nhớ ${tm('\\sin 150^\\circ')} bằng sin của góc bù.` : ''}`,
    sol:`${tm(`S = \\dfrac{1}{2}\\cdot ${b}\\cdot ${c}\\cdot\\sin ${DG(A)} = \\dfrac{1}{2}\\cdot ${b * c}\\cdot ${sinT} = ${res}`)}${A === 150 ? ` (vì ${tm('\\sin 150^\\circ = \\sin 30^\\circ')})` : ''}. Vậy ${tb(`S = ${res}\\text{ cm}^2`)}.`});
};

const cC2 = lv => {   // công thức Heron: nửa chu vi, diện tích, đường cao
  const k = R(1, 2), sd = pick(HERON).map(x => x * k), [a, b, c] = sd, p = (a + b + c) / 2, S = Math.round(heronS(sd));
  c3chk(nr9(S, heronS(sd)) || Math.abs(S - heronS(sd)) < 1e-6, 'Heron nguyên');
  const fig = triSVG({a, b, c, la:`${a}`, lb:`${b}`, lc:`${c}`}), srt = [...sd].sort((x, y) => x - y);
  if(lv === 1){
    const opts = [`p = ${tdec(p)}`, `p = ${tdec(2 * p)}`, `p = ${tdec(Math.round(2 * p / 3 * 100) / 100)}`, `p = ${tdec((srt[0] + srt[1]) / 2)}`];
    return QC({text:`Tam giác có ba cạnh ${tm(`${a},\\ ${b},\\ ${c}`)}. Trong công thức Heron, ${tm('p')} bằng`, fig, opts:opts.map(tm), ans:tm(opts[0]),
      hint:`${tm('p')} là <b>nửa</b> chu vi, không phải chu vi.`,
      sol:`${tm(`p = \\dfrac{${a} + ${b} + ${c}}{2} = ${p}`)}. Đáp án: ${tb(opts[0])}.`});
  }
  if(lv === 2) return QB({text:`Tính diện tích tam giác có ba cạnh ${tm(`${a},\\ ${b},\\ ${c}`)}.`, fig, tpl:blank('S'), ans:[S],
    hint:`Tính nửa chu vi ${tm('p')} trước, rồi dùng ${tm('S = \\sqrt{p(p - a)(p - b)(p - c)}')}.`,
    sol:`${tm(`p = ${p}`)}; ${tm(`S = \\sqrt{${p}\\cdot ${p - a}\\cdot ${p - b}\\cdot ${p - c}} = ${S}`)}. Vậy ${tb(`S = ${S}`)}.`});
  const s = pick(sd), r = fracAns('h', 2 * S, s);
  return QB({text:`Tam giác có ba cạnh ${tm(`${a},\\ ${b},\\ ${c}`)}. Tính độ dài đường cao hạ từ đỉnh xuống cạnh có độ dài ${tm(String(s))}.`, fig, tpl:r.tpl, ans:r.ans,
    hint:`Tính diện tích bằng công thức Heron, rồi dùng ${tm('S = \\dfrac{1}{2}\\cdot\\text{cạnh}\\cdot\\text{đường cao}')}.`,
    sol:`${tm(`p = ${p}`)}; ${tm(`S = \\sqrt{${p}\\cdot ${p - a}\\cdot ${p - b}\\cdot ${p - c}} = ${S}`)}. Từ ${tm(`S = \\dfrac{1}{2}\\cdot ${s}\\cdot h`)} suy ra ${tm(`h = \\dfrac{2S}{${s}} = \\dfrac{${2 * S}}{${s}} =`)} ${tb(r.v)}.`});
};

const cC3 = lv => {   // bán kính nội tiếp r, ngoại tiếp R (dễ nhầm hai bán kính)
  if(lv < 3){
    const [u, v, w] = pick(TRIP), kk = R(1, 2), [x, y, z] = [u * kk, v * kk, w * kk], fig = rtTriSVG({w:x, h:y, ab:`${y} cm`, ac:`${x} cm`});
    if(lv === 1){ const r = (x + y - z) / 2, S = x * y / 2, p = (x + y + z) / 2; c3chk(nr9(S / p, r), 'r');
      return QB({text:`Tam giác vuông có hai cạnh góc vuông dài ${tm(`${x}`)} cm và ${tm(`${y}`)} cm. Tính bán kính ${tm('r')} của đường tròn <b>nội tiếp</b>.`, fig, tpl:'[_] cm', ans:[r],
        hint:`Tính cạnh huyền, nửa chu vi ${tm('p')} và diện tích ${tm('S')}; dùng ${tm('S = pr')}.`,
        sol:`Cạnh huyền ${tm(`\\sqrt{${x}^2 + ${y}^2} = ${z}`)}; ${tm(`p = ${p}`)}, ${tm(`S = \\dfrac{1}{2}\\cdot ${x}\\cdot ${y} = ${S}`)}. ${tm(`r = \\dfrac{S}{p} = \\dfrac{${S}}{${p}} = ${r}`)}. Vậy ${tb(`r = ${r}\\text{ cm}`)}.`}); }
    const r = fracAns('R', z, 2);
    return QB({text:`Tam giác vuông có hai cạnh góc vuông dài ${tm(`${x}`)} cm và ${tm(`${y}`)} cm. Tính bán kính ${tm('R')} của đường tròn <b>ngoại tiếp</b>.`, fig, tpl:r.tpl + ' cm', ans:r.ans,
      hint:'Trong tam giác vuông, tâm đường tròn ngoại tiếp ở vị trí đặc biệt trên cạnh huyền.',
      sol:`Cạnh huyền ${tm(`\\sqrt{${x}^2 + ${y}^2} = ${z}`)}. Tâm đường tròn ngoại tiếp là trung điểm cạnh huyền nên ${tm(`R = \\dfrac{${z}}{2} =`)} ${tb(r.v)} cm.`});
  }
  const k = R(2, 9), a = `${k}\\sqrt{3}`, askR = Math.random() < .5, r = askR ? fracAns('R', k, 1) : fracAns('r', k, 2);
  c3chk(nr9(k * Math.sqrt(3) / Math.sqrt(3), k), 'R đều');
  return QB({text:`Tam giác đều có cạnh ${tm(`${a}`)} cm. Tính bán kính đường tròn ${askR ? '<b>ngoại tiếp</b> ' + tm('R') : '<b>nội tiếp</b> ' + tm('r')}.`,
    fig:askR ? circTriSVG({side:`${k}√3 cm`, R:'R'}) : triSVG({a:3, b:3, c:3, la:`${k}√3`, lb:`${k}√3`, lc:`${k}√3`}), tpl:r.tpl + ' cm', ans:r.ans, wide:true,
    hint:`Tính diện tích ${tm('S = \\dfrac{a^2\\sqrt{3}}{4}')}, rồi dùng ${askR ? tm('S = \\dfrac{abc}{4R}') : tm('S = pr')}.`,
    sol:`${tm(`S = \\dfrac{a^2\\sqrt{3}}{4} = \\dfrac{3\\cdot ${k * k}\\sqrt{3}}{4}`)}. ${askR ? tm(`R = \\dfrac{abc}{4S} = \\dfrac{3\\sqrt{3}\\cdot ${k * k * k}}{3\\sqrt{3}\\cdot ${k * k}} =`) : tm(`p = \\dfrac{3${a}}{2},\\ r = \\dfrac{S}{p} =`)} ${tb(r.v)} cm.`});
};

const cC4 = lv => {   // từ diện tích suy ra sin A và góc A (nhọn hay tù)
  if(lv === 1){
    const t = trip3(), m1 = R(1, 2), m2 = R(2, 6), b = t.h * m1, c = 2 * m2, S = m1 * m2 * t.o, r = fracAns('\\sin A', 2 * S, b * c);
    c3chk(nr9(2 * S / (b * c), t.o / t.h), 'sin A');
    return QB({text:`Tam giác ${tm('ABC')} có ${tm(`AB = ${c}`)}, ${tm(`AC = ${b}`)} và diện tích ${tm(`S = ${S}`)}. Tính ${tm('\\sin A')}.`, tpl:r.tpl, ans:r.ans,
      hint:`Từ ${tm('S = \\dfrac{1}{2}bc\\sin A')} suy ra ${tm('\\sin A')} theo ${tm('S, b, c')}.`,
      sol:`${tm(`\\sin A = \\dfrac{2S}{bc} = \\dfrac{2\\cdot ${S}}{${b}\\cdot ${c}} = \\dfrac{${2 * S}}{${b * c}} =`)} ${tb(r.v)}.`});
  }
  const A0 = pick([30, 45, 60]), obt = lv === 3, A = obt ? 180 - A0 : A0, u = R(1, 6), v = R(1, 6), b = 2 * u, c = 2 * v, w = A0 === 30 ? '' : A0 === 45 ? SQ2 : SQ3;
  const Sx = `${u * v}${w}`, sinv = A0 === 30 ? tf(1, 2) : A0 === 45 ? tf(SQ2, 2) : tf(SQ3, 2);
  c3chk(nr9(.5 * b * c * Math.sin(c3rad(A)), u * v * (A0 === 30 ? 1 : A0 === 45 ? Math.SQRT2 : Math.sqrt(3))), 'S');
  return QB({text:`Tam giác ${tm('ABC')} có ${tm(`AB = ${c}`)}, ${tm(`AC = ${b}`)}, diện tích ${tm(`S = ${Sx}`)} và góc ${tm('A')} là góc <b>${obt ? 'tù' : 'nhọn'}</b>. Tính số đo góc ${tm('A')}.`,
    tpl:`<span class="eq">${tm('\\widehat{A} =')} [_]°</span>`, ans:[A],
    hint:`Tính ${tm('\\sin A = \\dfrac{2S}{bc}')}. Mỗi giá trị của sin ứng với hai góc bù nhau; đề cho góc ${obt ? 'tù' : 'nhọn'} để chọn.`,
    sol:`${tm(`\\sin A = \\dfrac{2S}{bc} = \\dfrac{${2 * u * v}${w}}{${b * c}} = ${sinv}`)}. Suy ra ${tm(`A = ${DG(A0)}`)} hoặc ${tm(`A = ${DG(180 - A0)}`)}; góc ${obt ? 'tù' : 'nhọn'} nên ${tb(`\\widehat{A} = ${DG(A)}`)}.`});
};

lesson(91, 'c3k-dien-tich', 'Củng cố Chương III · 3. Diện tích, bán kính, đường cao – chỗ hay nhầm', 'Diện tích với góc tù; công thức Heron và nửa chu vi; đường cao; bán kính nội tiếp r và ngoại tiếp R; từ diện tích tìm góc.', [cC1, cC2, cC3, cC4], {introTitle:C3T, intro:[
  c3KT('Các công thức diện tích', `${tm('S = \\dfrac{1}{2}bc\\sin A = \\sqrt{p(p - a)(p - b)(p - c)} = pr = \\dfrac{abc}{4R} = \\dfrac{1}{2}a h_a')}.`, `${tm('p')} là <b>nửa</b> chu vi. Góc tù vẫn có ${tm('\\sin \\gt 0')}: ${tm('\\sin 150^\\circ = \\sin 30^\\circ')}, ${tm('\\sin 120^\\circ = \\sin 60^\\circ')}.`, 'Chọn công thức có nhiều dữ kiện đề đã cho nhất. Có ba cạnh: Heron; có hai cạnh và góc xen giữa: ½·b·c·sin A.'),
  c3KT('Hai bán kính', `${tm('r = \\dfrac{S}{p}')} (nội tiếp), ${tm('R = \\dfrac{abc}{4S}')} (ngoại tiếp). Tam giác vuông: ${tm('R = \\dfrac{\\text{cạnh huyền}}{2}')}.`, `Rất hay lẫn ${tm('r')} với ${tm('R')} và quên chia cho ${tm('4')} hoặc cho ${tm('p')}.`, `Tam giác đều cạnh ${tm('a')}: ${tm('R = \\dfrac{a\\sqrt{3}}{3}')}, ${tm('r = \\dfrac{a\\sqrt{3}}{6}')} (${tm('R = 2r')}).`),
  c3KT('Từ diện tích tìm góc', `${tm('\\sin A = \\dfrac{2S}{bc}')}.`, `Một giá trị sin ứng với <b>hai</b> góc bù nhau (nhọn và tù). Phải dựa vào đề (nhọn/tù) để chọn.`, 'Tính ngay sin A rồi đối chiếu bảng giá trị đặc biệt.')
]});

/* ---------- BÀI 4. TOÁN THỰC TẾ CÓ HÌNH (1): HÀNH TRÌNH, KHOẢNG CÁCH, MÁI NHÀ ---------- */
const cD1 = lv => {   // hai tàu rời cảng theo hai hướng (góc phương vị)
  const A = [90, 60, 120][lv - 1], k = lv === 3 ? 2 : R(1, 2), [b0, c0, a0] = pick(A === 90 ? P90 : A === 60 ? P60 : P120), [b, c, a] = [b0 * k, c0 * k, a0 * k];
  const t1 = pick([0, 10, 20, 30, 40, 45, 60]), t2 = t1 + A, Bp = [c * Math.sin(c3rad(t1)), c * Math.cos(c3rad(t1))], Cp = [b * Math.sin(c3rad(t2)), b * Math.cos(c3rad(t2))];
  c3chk(nr9(Math.hypot(Bp[0] - Cp[0], Bp[1] - Cp[1]), a), 'khoảng cách hai tàu');
  const dir = t => t === 0 ? '0° (hướng Bắc)' : t === 180 ? '180° (hướng Nam)' : t === 90 ? '90° (hướng Đông)' : `${t}°`;
  const body = lv === 3
    ? `tàu thứ nhất chạy theo hướng ${dir(t1)} với vận tốc <b>${c0} km/h</b>, tàu thứ hai chạy theo hướng ${dir(t2)} với vận tốc <b>${b0} km/h</b>. Hỏi sau <b>2 giờ</b>, hai tàu cách nhau bao nhiêu ki-lô-mét?`
    : `tàu thứ nhất chạy theo hướng ${dir(t1)} được <b>${c} km</b>, tàu thứ hai chạy theo hướng ${dir(t2)} được <b>${b} km</b>. Hỏi lúc đó hai tàu cách nhau bao nhiêu ki-lô-mét?`;
  return QB({text:`Từ cảng ${tm('A')}, hai tàu cùng khởi hành: ${body} (Hướng được đo từ hướng Bắc theo chiều kim đồng hồ.)`,
    fig:bearingSVG({t1, t2, l1:`${c} km`, l2:`${b} km`, bc:'?'}), tpl:'[_] km', ans:[a], wide:true,
    hint:`Góc ${tm('\\widehat{BAC}')} bằng hiệu hai góc phương vị. Biết hai cạnh và góc xen giữa thì dùng định lí côsin.`,
    sol:`${tm(`\\widehat{BAC} = ${t2}^\\circ - ${t1}^\\circ = ${DG(A)}`)}. ${lv === 3 ? `Sau 2 giờ: ${tm(`AB = ${c}`)} km, ${tm(`AC = ${b}`)} km. ` : ''}${tm(`BC^2 = ${lawA(b, c, A)} = ${a * a}`)}, nên ${tm('BC =')} ${tb(`${a}\\text{ km}`)}.`});
};

const cD2 = lv => {   // đo khoảng cách qua hồ bằng hai góc và định lí sin
  const [A, B] = [[45, 45], [30, 30], [30, 120]][lv - 1], k = R(5, 40), C = 180 - A - B;
  const ab = lv === 1 ? `${k}\\sqrt{2}` : lv === 2 ? `${k}\\sqrt{3}` : `${k}`, abv = lv === 1 ? k * Math.SQRT2 : lv === 2 ? k * Math.sqrt(3) : k;
  const bcv = abv * NUMF.sin(A) / NUMF.sin(C), acv = abv * NUMF.sin(B) / NUMF.sin(C);
  c3chk(nr9(acv, lv === 3 ? k * Math.sqrt(3) : k), 'AC qua hồ');
  return QB({text:`Hai điểm ${tm('A, B')} nằm trên một bờ hồ, ${tm('C')} là gốc cây ở bờ đối diện. Đo được ${tm(`AB = ${ab}`)} m, ${tm(`\\widehat{CAB} = ${DG(A)}`)} và ${tm(`\\widehat{CBA} = ${DG(B)}`)}. Tính khoảng cách ${tm('AC')} từ ${tm('A')} đến gốc cây.`,
    fig:triSVG({a:bcv, b:acv, c:abv, lc:`${lv === 3 ? k : ab.replace('\\sqrt{2}', '√2').replace('\\sqrt{3}', '√3')} m`, lb:'?', gA:`${A}°`, gB:`${B}°`}),
    tpl:lv === 3 ? `<span class="eq">${tm('AC =')} [_] ${tm(SQ3)} m</span>` : '[_] m', ans:[k], wide:true,
    hint:`Tính góc ${tm('C')} bằng ${tm('180^\\circ - A - B')} trước. ${tm('AC')} đối diện góc nào? ${tm('AB')} đối diện góc nào?`,
    sol:`${tm(`\\widehat{C} = 180^\\circ - ${DG(A)} - ${DG(B)} = ${DG(C)}`)}. Theo định lí sin, ${tm(`\\dfrac{AC}{\\sin B} = \\dfrac{AB}{\\sin C}`)}, nên ${tm(`AC = \\dfrac{${ab}\\cdot\\sin ${DG(B)}}{\\sin ${DG(C)}} = ${lv === 3 ? k + SQ3 : k}`)}. Vậy ${tb(lv === 3 ? `AC = ${k}${SQ3}\\text{ m}` : `AC = ${k}\\text{ m}`)}.`});
};

const cD3 = lv => {   // khu đất tam giác: hàng rào, chi phí
  const price = pick([30, 40, 50, 80, 100, 120]);
  if(lv === 1){ const [b0, c0, a0] = pick(P120), k = R(1, 2), [b, c, a] = [b0 * k, c0 * k, a0 * k], cost = a * price;
    return QB({text:`Khu đất hình tam giác ${tm('ABC')} có ${tm(`AB = ${c}`)} m, ${tm(`AC = ${b}`)} m và ${tm(`\\widehat{A} = 120^\\circ`)}. Người ta làm hàng rào dọc cạnh ${tm('BC')}, chi phí <b>${price} nghìn đồng/m</b>. Tính tổng chi phí làm hàng rào.`,
      fig:triSVG({a, b, c, la:'?', lb:`${b} m`, lc:`${c} m`, gA:'120°'}), tpl:'[_] nghìn đồng', ans:[cost], wide:true,
      hint:'Cần độ dài hàng rào trước: biết hai cạnh và góc xen giữa thì dùng định lí côsin.',
      sol:`${tm(`BC^2 = ${lawA(b, c, 120)} = ${a * a}`)}, nên ${tm(`BC = ${a}`)} m. Chi phí: ${tm(`${a}\\cdot ${price} = ${cost}`)} nghìn đồng. Đáp số: ${tb(`${fmt(cost)}\\text{ nghìn đồng}`)}.`}); }
  if(lv === 2){ const [b0, c0, a0] = pick(P60), k = R(1, 2), [b, c, a] = [b0 * k, c0 * k, a0 * k], cost = (a + b + c) * price;
    return QB({text:`Khu đất hình tam giác ${tm('ABC')} có ${tm(`AB = ${c}`)} m, ${tm(`AC = ${b}`)} m và ${tm(`\\widehat{A} = 60^\\circ`)}. Người ta rào <b>cả ba cạnh</b>, chi phí <b>${price} nghìn đồng/m</b>. Tính tổng chi phí làm hàng rào.`,
      fig:triSVG({a, b, c, la:'?', lb:`${b} m`, lc:`${c} m`, gA:'60°'}), tpl:'[_] nghìn đồng', ans:[cost], wide:true,
      hint:'Phải tìm cạnh còn lại bằng định lí côsin, rồi tính chu vi (đừng quên cả ba cạnh).',
      sol:`${tm(`BC^2 = ${lawA(b, c, 60)} = ${a * a}`)}, nên ${tm(`BC = ${a}`)} m. Chu vi ${tm(`${a} + ${b} + ${c} = ${a + b + c}`)} m. Chi phí: ${tm(`${a + b + c}\\cdot ${price} = ${cost}`)} nghìn đồng. Đáp số: ${tb(`${fmt(cost)}\\text{ nghìn đồng}`)}.`}); }
  const u = R(2, 8), v = R(2, 8), b = 2 * u, c = 2 * v, S = u * v, cost = S * price, a = Math.sqrt(b * b + c * c - 2 * b * c * Math.cos(c3rad(150)));
  return QB({text:`Khu đất hình tam giác ${tm('ABC')} có ${tm(`AB = ${c}`)} m, ${tm(`AC = ${b}`)} m và ${tm(`\\widehat{A} = 150^\\circ`)}. Chủ đất lát cỏ toàn bộ khu đất, chi phí <b>${price} nghìn đồng/m²</b>. Tính tổng chi phí lát cỏ.`,
    fig:triSVG({a, b, c, la:'?', lb:`${b} m`, lc:`${c} m`, gA:'150°'}), tpl:'[_] nghìn đồng', ans:[cost], wide:true,
    hint:`Tính diện tích bằng ${tm('S = \\dfrac{1}{2}bc\\sin A')}, chú ý ${tm('\\sin 150^\\circ')}; rồi nhân với đơn giá trên mỗi mét vuông.`,
    sol:`${tm(`S = \\dfrac{1}{2}\\cdot ${b}\\cdot ${c}\\cdot\\sin 150^\\circ = \\dfrac{1}{2}\\cdot ${b * c}\\cdot\\dfrac{1}{2} = ${S}`)} m². Chi phí: ${tm(`${S}\\cdot ${price} = ${cost}`)} nghìn đồng. Đáp số: ${tb(`${fmt(cost)}\\text{ nghìn đồng}`)}.`});
};

const cD4 = lv => {   // mặt cắt mái nhà tam giác cân, góc ở đỉnh 120°
  const k = R(2, 8), b = 2 * k, a = b * Math.sqrt(3), fig = triSVG({a, b, c:b, la:'?', lb:`${b} m`, lc:`${b} m`, gA:'120°'});
  const stem = `Mặt cắt ngang của một mái nhà là tam giác cân ${tm('ABC')} (cân tại ${tm('A')}) có ${tm(`AB = AC = ${b}`)} m và góc ở đỉnh ${tm(`\\widehat{BAC} = 120^\\circ`)}.`;
  c3chk(nr9(b * Math.cos(c3rad(60)), k) && nr9(.5 * b * b * Math.sin(c3rad(120)), k * k * Math.sqrt(3) ), 'mái nhà');
  if(lv === 1) return QB({text:`${stem} Tính chiều cao ${tm('AH')} từ đỉnh ${tm('A')} xuống cạnh ${tm('BC')}.`, fig, tpl:'[_] m', ans:[k],
    hint:'Tam giác cân: đường cao từ đỉnh cũng là phân giác và trung tuyến. Xét tam giác vuông ' + tm('AHB') + '.',
    sol:`${tm('AH')} cũng là phân giác nên ${tm('\\widehat{BAH} = 60^\\circ')}. Trong tam giác vuông ${tm('AHB')}: ${tm(`AH = AB\\cos 60^\\circ = ${b}\\cdot\\dfrac{1}{2} = ${k}`)}. Vậy ${tb(`AH = ${k}\\text{ m}`)}.`});
  if(lv === 2) return QB({text:`${stem} Tính độ rộng ${tm('BC')} của nền nhà.`, fig, tpl:`<span class="eq">${tm('BC =')} [_] ${tm(SQ3)} m</span>`, ans:[b],
    hint:'Biết hai cạnh và góc xen giữa: dùng định lí côsin; chú ý côsin của góc tù là số âm.',
    sol:`${tm(`BC^2 = ${b}^2 + ${b}^2 - 2\\cdot ${b}\\cdot ${b}\\cos 120^\\circ = ${2 * b * b} + ${b * b} = ${3 * b * b}`)}. Suy ra ${tb(`BC = ${b}${SQ3}\\text{ m}`)}.`});
  return QB({text:`${stem} Tính diện tích mặt cắt ngang của mái nhà.`, fig, tpl:`<span class="eq">${tm('S =')} [_] ${tm(SQ3)} m²</span>`, ans:[k * k],
    hint:`Dùng ${tm('S = \\dfrac{1}{2}bc\\sin A')} với góc xen giữa là góc ở đỉnh; ${tm('\\sin 120^\\circ = \\sin 60^\\circ')}.`,
    sol:`${tm(`S = \\dfrac{1}{2}\\cdot ${b}\\cdot ${b}\\cdot\\sin 120^\\circ = \\dfrac{1}{2}\\cdot ${b * b}\\cdot\\dfrac{${SQ3}}{2} = ${k * k}${SQ3}`)}. Vậy ${tb(`S = ${k * k}${SQ3}\\text{ m}^2`)}.`});
};

lesson(91, 'c3k-thuc-te-1', 'Củng cố Chương III · 4. Toán thực tế có hình: hành trình, khoảng cách, mái nhà', 'Hai tàu theo hai hướng (góc phương vị); đo khoảng cách qua hồ; hàng rào và chi phí; mái nhà tam giác cân.', [cD1, cD2, cD3, cD4], {introTitle:'Quy trình giải toán thực tế · Chỗ dễ sai · Mẹo', intro:[
  c3KT('Vẽ hình, chọn công thức', `Đọc đề, vẽ tam giác, ghi độ dài và góc vào đúng chỗ. Hai cạnh + góc xen giữa: định lí côsin. Một cạnh + hai góc: định lí sin. Diện tích: ${tm('\\dfrac{1}{2}bc\\sin A')} hoặc Heron.`, 'Xác định đúng cạnh nào <b>đối diện</b> góc nào và góc nào <b>xen giữa</b> hai cạnh đã biết.', 'Ghi dữ kiện lên hình trước khi tính; kiểm tra tổng ba góc bằng ' + tm('180^\\circ') + '.'),
  c3KT('Hướng đi (góc phương vị)', 'Góc phương vị đo từ hướng <b>Bắc</b> theo chiều kim đồng hồ. Góc giữa hai hướng đi bằng <b>hiệu</b> hai góc phương vị.', `Hướng ${tm('150^\\circ')} so với hướng ${tm('30^\\circ')} lệch ${tm('120^\\circ')} (tù), không phải ${tm('60^\\circ')}.`, 'Vẽ mũi tên Bắc và hai tia đi từ cảng rồi mới đọc góc.'),
  c3KT('Góc tù và đơn vị', `${tm('\\cos 120^\\circ = -\\dfrac{1}{2}')}: trừ đi một số âm là <b>cộng</b>. Cuối bài ghi đúng đơn vị (m, km, m², nghìn đồng).`, 'Chi phí = đơn giá × <b>độ dài</b> (hàng rào) hoặc × <b>diện tích</b> (lát cỏ); đừng nhầm.', 'Khi kết quả là số vô tỉ như ' + tm('b\\sqrt{3}') + ', đề thường cho ô trống ghi sẵn ' + tm(SQ3) + '.')
]});

/* ---------- BÀI 5. TOÁN THỰC TẾ CÓ HÌNH (2): ĐO CHIỀU CAO, THANG DỰA TƯỜNG, ĐƯỜNG TRÒN ---------- */
const cE1 = lv => {   // thang dựa tường (sin hay cos?)
  const k = R(2, 7), L = 2 * k, d = R(3, 12);
  if(lv === 1) return QB({text:`Một chiếc thang dài <b>${L} m</b> dựa vào bức tường thẳng đứng, tạo với mặt đất góc ${tm('30^\\circ')}. Tính độ cao của đầu thang so với mặt đất.`,
    fig:rtTriSVG({n:['H','T','A'], w:k * Math.sqrt(3), h:k, ab:'?', bc:`${L} m`, aC:'30°'}), tpl:'[_] m', ans:[k],
    hint:`Độ cao ${tm('HT')} là cạnh <b>đối</b> diện với góc ${tm('30^\\circ')} ở chân thang: dùng ${tm('\\sin')} hay ${tm('\\cos')}?`,
    sol:`Trong tam giác vuông ${tm('HTA')}: ${tm(`HT = TA\\sin 30^\\circ = ${L}\\cdot\\dfrac{1}{2} = ${k}`)}. Vậy ${tb(`HT = ${k}\\text{ m}`)}.`});
  if(lv === 2) return QB({text:`Một chiếc thang dài <b>${L} m</b> dựa vào bức tường thẳng đứng, tạo với mặt đất góc ${tm('60^\\circ')}. Tính độ cao của đầu thang so với mặt đất.`,
    fig:rtTriSVG({n:['H','T','A'], w:k, h:k * Math.sqrt(3), ab:'?', bc:`${L} m`, aC:'60°'}), tpl:`<span class="eq">${tm('HT =')} [_] ${tm(SQ3)} m</span>`, ans:[k],
    hint:`${tm('HT')} là cạnh đối diện với góc ${tm('60^\\circ')} ở chân thang; thang là cạnh huyền.`,
    sol:`${tm(`HT = TA\\sin 60^\\circ = ${L}\\cdot\\dfrac{${SQ3}}{2} = ${k}${SQ3}`)}. Vậy ${tb(`HT = ${k}${SQ3}\\text{ m}`)}.`});
  return QB({text:`Chân một chiếc thang cách chân tường <b>${d} m</b> và thang tạo với mặt đất góc ${tm('60^\\circ')}. Tính chiều dài chiếc thang.`,
    fig:rtTriSVG({n:['H','T','A'], w:d, h:d * Math.sqrt(3), ac:`${d} m`, bc:'?', aC:'60°'}), tpl:'[_] m', ans:[2 * d],
    hint:`${tm('HA')} là cạnh <b>kề</b> với góc ${tm('60^\\circ')}, còn chiều dài thang là cạnh huyền: dùng ${tm('\\cos')}.`,
    sol:`${tm(`\\cos 60^\\circ = \\dfrac{HA}{TA}`)} nên ${tm(`TA = \\dfrac{HA}{\\cos 60^\\circ} = \\dfrac{${d}}{\\frac{1}{2}} = ${2 * d}`)}. Vậy ${tb(`${2 * d}\\text{ m}`)}.`});
};

const cE2 = lv => {   // đo chiều cao bằng một hay hai điểm quan sát
  if(lv === 1){ const d = R(5, 25);
    return QB({text:`Một người đứng tại ${tm('A')}, cách chân cột cờ ${tm('H')} một đoạn ${tm(`AH = ${d}`)} m, nhìn đỉnh cột cờ ${tm('T')} với góc nâng ${tm('60^\\circ')}. Tính chiều cao ${tm('HT')} của cột cờ.`,
      fig:rtTriSVG({n:['H','T','A'], w:d, h:d * Math.sqrt(3), ab:'?', ac:`${d} m`, aC:'60°'}), tpl:`<span class="eq">${tm('HT =')} [_] ${tm(SQ3)} m</span>`, ans:[d],
      hint:`Biết cạnh kề ${tm('AH')} và cần cạnh đối ${tm('HT')}: dùng ${tm('\\tan')}.`,
      sol:`${tm(`HT = AH\\tan 60^\\circ = ${d}${SQ3}`)}. Vậy ${tb(`HT = ${d}${SQ3}\\text{ m}`)}.`}); }
  const k = R(3, 12), d = 2 * k, A = 30, B = lv === 2 ? 60 : 60, a0 = lv === 2 ? 30 : 45;
  if(lv === 2){
    c3chk(nr9(d * NUMF.sin(60), k * Math.sqrt(3)), 'cây 30-60');
    return QB({text:`Hai điểm quan sát ${tm('A, B')} cùng nằm về một phía của một cây, thẳng hàng với chân cây ${tm('H')}, ${tm(`AB = ${d}`)} m. Từ ${tm('A')} nhìn ngọn cây ${tm('T')} với góc nâng ${tm('30^\\circ')}, từ ${tm('B')} (gần cây hơn) với góc nâng ${tm('60^\\circ')}. Tính chiều cao cây.`,
      fig:treeSVG({d:`${d} m`, a:'30°', b:'60°', h:'?'}), tpl:`<span class="eq">${tm('HT =')} [_] ${tm(SQ3)} m</span>`, ans:[k], wide:true,
      hint:`Góc ${tm('\\widehat{ABT}')} là góc bù với ${tm('60^\\circ')}. Tính góc ${tm('\\widehat{ATB}')} rồi xem tam giác ${tm('ATB')} có đặc điểm gì.`,
      sol:`${tm('\\widehat{ABT} = 180^\\circ - 60^\\circ = 120^\\circ')}, nên ${tm('\\widehat{ATB} = 180^\\circ - 30^\\circ - 120^\\circ = 30^\\circ')}. Tam giác ${tm('ATB')} cân tại ${tm('B')}: ${tm(`BT = AB = ${d}`)}. Trong tam giác vuông ${tm('BHT')}: ${tm(`HT = BT\\sin 60^\\circ = ${d}\\cdot\\dfrac{${SQ3}}{2} = ${k}${SQ3}`)}. Vậy ${tb(`HT = ${k}${SQ3}\\text{ m}`)}.`}); }
  // lv 3: 45° và 60° – kết quả dạng m + n√3
  const x = d / (Math.sqrt(3) - 1), h = x * Math.sqrt(3);
  c3chk(nr9(h, 3 * k + k * Math.sqrt(3)), 'cây 45-60');
  return QB({text:`Hai điểm quan sát ${tm('A, B')} cùng nằm về một phía của một cây, thẳng hàng với chân cây ${tm('H')}, ${tm(`AB = ${d}`)} m. Từ ${tm('A')} nhìn ngọn cây ${tm('T')} với góc nâng ${tm('45^\\circ')}, từ ${tm('B')} (gần cây hơn) với góc nâng ${tm('60^\\circ')}. Tính chiều cao cây.`,
    fig:treeSVG({d:`${d} m`, a:'45°', b:'60°', h:'?'}), tpl:`<span class="eq">${tm('HT =')} [_] ${tm('+')} [_] ${tm(SQ3)} m</span>`, ans:[3 * k, k], wide:true,
    hint:`Đặt ${tm('BH = x')}. Từ hai tam giác vuông viết ${tm('HT')} theo ${tm('x')} bằng ${tm('\\tan 60^\\circ')} và bằng ${tm('(x + AB)\\tan 45^\\circ')}, rồi giải phương trình.`,
    sol:`Đặt ${tm('BH = x')}: ${tm(`HT = x\\tan 60^\\circ = x${SQ3}`)} và ${tm(`HT = (x + ${d})\\tan 45^\\circ = x + ${d}`)}. Suy ra ${tm(`x${SQ3} = x + ${d}`)}, ${tm(`x = \\dfrac{${d}}{${SQ3} - 1} = ${k}(${SQ3} + 1)`)}. Vậy ${tm(`HT = x${SQ3} = ${k}(3 + ${SQ3}) =`)} ${tb(`${3 * k} + ${k}${SQ3}\\text{ m}`)}.`});
};

const cE3 = lv => {   // đài quan sát, toà nhà và cột cờ
  const h = pick([6, 8, 10, 12, 15]), d = R(8, 30);
  const stem = a => `Anh Nam đứng tại điểm ${tm('P')} trên đài quan sát cao <b>${h} m</b> so với mặt đất, cách chân toà nhà (theo phương ngang) <b>${d} m</b>. Từ ${tm('P')} anh nhìn thấy nóc toà nhà (điểm ${tm('C')}) với góc nâng ${tm(`${a}^\\circ`)}`;
  if(lv === 1) return QB({text:`${stem(45)}. Tính chiều cao toà nhà.`, fig:obsSVG({h:`${h} m`, d:`${d} m`, a:'45°', hb:'?'}), tpl:'[_] m', ans:[h + d],
    hint:`Phần toà nhà cao hơn tầm mắt tính từ ${tm('P')}; nhớ cộng thêm độ cao của đài quan sát.`,
    sol:`Phần cao hơn ${tm('P')}: ${tm(`d\\tan 45^\\circ = ${d}`)} m. Chiều cao toà nhà ${tm(`${h} + ${d} =`)} ${tb(`${h + d}\\text{ m}`)}.`});
  if(lv === 2) return QB({text:`${stem(60)}. Tính chiều cao toà nhà.`, fig:obsSVG({h:`${h} m`, d:`${d} m`, a:'60°', hb:'?'}), tpl:`<span class="eq">[_] ${tm('+')} [_] ${tm(SQ3)} m</span>`, ans:[h, d],
    hint:`Phần toà nhà cao hơn ${tm('P')} bằng ${tm('d\\tan 60^\\circ')}; cộng thêm độ cao của đài quan sát.`,
    sol:`Phần cao hơn ${tm('P')}: ${tm(`${d}\\tan 60^\\circ = ${d}${SQ3}`)} m. Chiều cao toà nhà ${tm(`${h} + ${d}${SQ3}`)}. Vậy ${tb(`${h} + ${d}${SQ3}\\text{ m}`)}.`});
  return QB({text:`${stem(45)} và đỉnh cột cờ đặt trên nóc toà nhà (điểm ${tm('D')}) với góc nâng ${tm('60^\\circ')}. Tính chiều cao cột cờ ${tm('CD')}.`, fig:obsSVG({h:`${h} m`, d:`${d} m`, a:'45°', hf:'?'}),
    tpl:`<span class="eq">${tm('CD =')} [_] ${tm(SQ3)} ${tm('-')} [_] m</span>`, ans:[d, d], wide:true,
    hint:`Tính độ cao của ${tm('C')} và của ${tm('D')} so với ${tm('P')} bằng tang của hai góc nâng, rồi lấy hiệu.`,
    sol:`So với ${tm('P')}: ${tm(`C`)} cao ${tm(`d\\tan 45^\\circ = ${d}`)} m; ${tm('D')} cao ${tm(`d\\tan 60^\\circ = ${d}${SQ3}`)} m. ${tm(`CD = ${d}${SQ3} - ${d}`)}. Vậy ${tb(`CD = ${d}${SQ3} - ${d}\\text{ m}`)}.`});
};

const cE4 = lv => {   // tấm kính tròn bị vỡ: bán kính ngoại tiếp
  const A = [30, 150, 120][lv - 1], k = R(3, 20), a = lv === 3 ? `${k}\\sqrt{3}` : `${k}`;
  c3chk(nr9((lv === 3 ? k * Math.sqrt(3) : k) / (2 * NUMF.sin(A)), k), 'R');
  return QB({text:`Một tấm kính hình tròn bị vỡ, chỉ còn mảnh hình tam giác ${tm('ABC')} có ba đỉnh nằm trên mép tấm kính. Đo được ${tm(`BC = ${a}`)} dm và ${tm(`\\widehat{A} = ${DG(A)}`)}. Tính bán kính ${tm('R')} của tấm kính ban đầu.`,
    fig:circTriSVG({pts:[90, 270 - A, 270 + A], side:`${k}${lv === 3 ? '√3' : ''} dm`, R:'R'}), tpl:'[_] dm', ans:[k], wide:true,
    hint:`Tấm kính tròn đi qua ba đỉnh nên ${tm('R')} là bán kính đường tròn ngoại tiếp: dùng định lí sin, ${tm('BC')} đối diện góc ${tm('A')}.`,
    sol:`${tm(`R = \\dfrac{BC}{2\\sin A} = \\dfrac{${a}}{2\\sin ${DG(A)}} = \\dfrac{${a}}{2\\cdot ${A === 120 ? tf(SQ3, 2) : tf(1, 2)}} = ${k}`)}${A === 150 ? ` (vì ${tm('\\sin 150^\\circ = \\sin 30^\\circ')})` : ''}. Vậy ${tb(`R = ${k}\\text{ dm}`)}.`});
};

lesson(91, 'c3k-thuc-te-2', 'Củng cố Chương III · 5. Toán thực tế có hình: thang, đo chiều cao, tấm kính tròn', 'Thang dựa tường (sin hay cos); đo cây từ hai điểm (góc ngoài); toà nhà và cột cờ; bán kính tấm kính tròn.', [cE1, cE2, cE3, cE4], {introTitle:'Quy trình giải toán thực tế · Chỗ dễ sai · Mẹo', intro:[
  c3KT('Tam giác vuông', `${tm('\\sin = \\dfrac{\\text{đối}}{\\text{huyền}}')}, ${tm('\\cos = \\dfrac{\\text{kề}}{\\text{huyền}}')}, ${tm('\\tan = \\dfrac{\\text{đối}}{\\text{kề}}')}. Xác định cạnh đối, cạnh kề <b>so với góc đang xét</b>.`, `Nhầm ${tm('\\sin')} với ${tm('\\cos')} khi đổi góc ${tm('30^\\circ')} thành ${tm('60^\\circ')}; nhầm cạnh đối với cạnh kề.`, 'Ghi “đối – kề – huyền” lên hình trước khi chọn tỉ số.'),
  c3KT('Đo chiều cao từ hai điểm', `Hai điểm ${tm('A, B')} thẳng hàng với chân vật: góc ở ${tm('B')} trong tam giác ${tm('ABT')} là góc <b>bù</b> với góc nâng tại ${tm('B')}. Tính góc ở ngọn rồi dùng định lí sin, hoặc đặt ${tm('BH = x')} và lập phương trình.`, 'Quên đổi góc bù, hoặc dùng nhầm góc nâng làm góc của tam giác ' + tm('ABT') + '.', `Góc nâng ${tm('30^\\circ')} và ${tm('60^\\circ')}: tam giác ${tm('ATB')} cân, ${tm('BT = AB')}.`),
  c3KT('Độ cao của người quan sát', `Chiều cao vật = độ cao của mắt (hoặc đài quan sát) + phần nhìn lên: ${tm('d\\tan\\alpha')}.`, 'Rất hay quên cộng độ cao của chỗ đứng.', `Vẽ đường ngang qua ${tm('P')} để tách phần “cao hơn tầm mắt”.`),
  c3KT('Tấm kính tròn – đường tròn ngoại tiếp', `${tm('R = \\dfrac{a}{2\\sin A}')}.`, `Góc ${tm('A')} tù vẫn có ${tm('\\sin A \\gt 0')}: ${tm('\\sin 150^\\circ = \\dfrac{1}{2}')}, không thể bỏ qua.`, 'Cạnh ' + tm('BC') + ' phải ghép với góc đối ' + tm('A') + ', không dùng góc khác.')
]});

/* ---------- ĐỀ TỔNG HỢP 15 CÂU ---------- */
const c3R = (make, band, type) => () => Object.assign(make(), {reviewBand:band, reviewType:type});
const REVIEW_C3K = [
  c3R(() => cA1(1), 1, 'luong-giac'),   // 1. góc bù – đẳng thức sai
  c3R(() => cA2(1), 1, 'luong-giac'),   // 2. tam giác ABC: A + B + C = 180°
  c3R(() => cB1(1), 1, 'cong-thuc'),    // 3. viết đúng định lí côsin
  c3R(() => cB2(1), 1, 'cosin'),        // 4. ba cạnh → góc vuông
  c3R(() => cB3(1), 1, 'nhan-dang'),    // 5. nhận dạng bằng ba cạnh
  c3R(() => cC2(1), 1, 'dien-tich'),    // 6. nửa chu vi
  c3R(() => cA2(2), 2, 'luong-giac'),   // 7. sin(B + C), cos(B + C)
  c3R(() => cB4(2), 2, 'sin'),          // 8. định lí sin tính cạnh
  c3R(() => cC1(2), 2, 'dien-tich'),    // 9. diện tích với góc 150°
  c3R(() => cC3(2), 2, 'ban-kinh'),     // 10. R của tam giác vuông
  c3R(() => cD1(2), 2, 'thuc-te'),      // 11. hai tàu, góc 60°
  c3R(() => cB3(3), 3, 'nhan-dang'),    // 12. nhận dạng bằng sin²
  c3R(() => cC4(3), 3, 'dien-tich'),    // 13. từ diện tích tìm góc tù
  c3R(() => cD2(3), 3, 'thuc-te'),      // 14. khoảng cách qua hồ
  c3R(() => cE2(3), 3, 'thuc-te')       // 15. đo cây từ hai điểm
];
lesson(91, 'c3k-de-tong-hop', 'Củng cố Chương III · Đề tổng hợp 15 câu', 'Mỗi đề 15 câu: 6 câu cơ bản, 5 câu thông hiểu – vận dụng, 4 câu nâng cao có hình thực tế. Dễ sai: góc bù, góc tù, cạnh đối – cạnh kề.', REVIEW_C3K, {count:15, introTitle:C3T, intro:[
  c3KT('Dễ sai về lượng giác', `Góc bù: chỉ ${tm('\\sin')} giữ nguyên dấu. Tam giác ${tm('ABC')}: ${tm('\\cos(B + C) = -\\cos A')}.`, `Góc tù: ${tm('\\cos, \\tan, \\cot')} âm, ${tm('\\sin')} dương.`, 'Thấy ' + tm('B + C') + ' hãy đổi ngay ra ' + tm('180^\\circ - A') + '.'),
  c3KT('Dễ nhầm về công thức', `Côsin: góc <b>xen giữa</b>. Sin: cạnh với góc <b>đối diện</b>. Heron: ${tm('p')} là nửa chu vi. ${tm('r = \\dfrac{S}{p}')}, ${tm('R = \\dfrac{abc}{4S}')}.`, `Côsin âm thì góc tù (${tm('120^\\circ')}, không phải ${tm('60^\\circ')}).`, 'Vẽ tam giác, ghi dữ kiện, rồi mới chọn công thức.'),
  c3KT('Dễ sai về thực tế', 'Đổi hướng đi thành góc bằng hiệu hai góc phương vị; thêm độ cao người quan sát; góc nâng ở điểm thứ hai là góc bù trong tam giác.', 'Đơn vị cuối bài và việc làm tròn.', 'Ước lượng trước giúp phát hiện kết quả vô lý.')
]});
}

/* =====================================================================
   CHỦ ĐỀ 4. CÁC SỐ LIỆU ĐẶC TRƯNG CỦA MẪU SỐ LIỆU KHÔNG GHÉP NHÓM
   BÀI 12. SỐ GẦN ĐÚNG VÀ SAI SỐ
   ===================================================================== */
{
const D = (n, k=0) => (n / 10**k).toFixed(k).replace('.', '{,}');
const V = (n, k=0) => n / 10**k;
const roundUnit = (n, u) => Math.round(n / u) * u;
const placeName = u => u===1000?'hàng nghìn':u===100?'hàng trăm':u===10?'hàng chục':u===1?'hàng đơn vị':u===.1?'hàng phần mười':u===.01?'hàng phần trăm':'hàng phần nghìn';

const g12a = lv => { // sai số tuyệt đối
  if(lv===1){ const exact=R(120,980)/10, step=pick([1,2,3,4,5]), near=exact+pick([-1,1])*step/10, err=step/10;
    return QB({text:`Giá trị đúng của một đại lượng là ${tm(`a=${D(Math.round(exact*10),1)}`)}, còn số gần đúng là ${tm(`\\bar a=${D(Math.round(near*10),1)}`)}. Tính sai số tuyệt đối của số gần đúng.`,
      tpl:`${tm('\\Delta_a=')} [_]`,ans:[err],hint:`Dùng định nghĩa ${tm('\\Delta_a=|a-\\bar a|')}.`,
      sol:`Theo định nghĩa sai số tuyệt đối, ${tm(`\\Delta_a=|a-\\bar a|=|${D(Math.round(exact*10),1)}-${D(Math.round(near*10),1)}|=${D(step,1)}`)}. Vậy sai số tuyệt đối là ${tb(D(step,1))}.`}); }
  if(lv===2){ const k=2, exact=R(1200,9800), step=pick([1,2,3,4,5,6,7,8,9]), near=exact+pick([-1,1])*step;
    return QB({text:`Một phép đo có giá trị đúng ${tm(`a=${D(exact,k)}\\text{ m}`)} và cho kết quả gần đúng ${tm(`\\bar a=${D(near,k)}\\text{ m}`)}. Tính sai số tuyệt đối theo đơn vị xentimét.`,
      tpl:'[_] cm',ans:[step],hint:`Tính ${tm('|a-\\bar a|')} theo mét, sau đó đổi sang xentimét.`,
      sol:`Theo định nghĩa, ${tm(`\\Delta_a=|${D(exact,k)}-${D(near,k)}|=${D(step,k)}\\text{ m}`)}. Vì ${tm(`1\\text{ m}=100\\text{ cm}`)}, ta có ${tm(`${D(step,k)}\\text{ m}=${step}\\text{ cm}`)}. Vậy sai số tuyệt đối là ${tb(`${step}\\text{ cm}`)}.`}); }
  const exact=R(1500,9500)/100, e1=pick([.02,.03,.04]), e2=e1+pick([.01,.02,.03]), n1=exact+pick([-1,1])*e1, n2=exact+pick([-1,1])*e2;
  const A=D(Math.round(n1*100),2), B=D(Math.round(n2*100),2), good=`${A} chính xác hơn ${B}`;
  return QC({text:`Biết giá trị đúng là ${tm(`a=${D(Math.round(exact*100),2)}`)}. Hai số gần đúng là ${tm(`\\bar a_1=${A}`)} và ${tm(`\\bar a_2=${B}`)}. Khẳng định nào đúng?`,
    opts:[good,`${B} chính xác hơn ${A}`,'Hai số gần đúng chính xác như nhau','Không thể so sánh'],ans:good,
    hint:'Số gần đúng có sai số tuyệt đối nhỏ hơn thì chính xác hơn.',
    sol:`Ta có ${tm(`\\Delta_1=|a-\\bar a_1|=${D(Math.round(e1*100),2)}`)} và ${tm(`\\Delta_2=|a-\\bar a_2|=${D(Math.round(e2*100),2)}`)}. Vì ${tm('\\Delta_1\\lt\\Delta_2')}, số ${tb(A)} chính xác hơn số ${tb(B)}.`});
};

const g12b = lv => { // khoảng chứa giá trị đúng
  if(lv===1){ const near=R(20,200), d=R(1,9), lo=near-d, hi=near+d;
    return QB({text:`Cho số gần đúng ${tm(`\\bar a=${near}`)} với độ chính xác ${tm(`d=${d}`)}. Giá trị đúng ${tm('a')} nằm trong đoạn nào?`,
      tpl:'Cận dưới: [_] ; cận trên: [_]',ans:[lo,hi],hint:`Từ ${tm('\\Delta_a=|a-\\bar a|\\le d')} suy ra ${tm('\\bar a-d\\le a\\le\\bar a+d')}.`,
      sol:`Ta có ${tm(`${near}-${d}\\le a\\le${near}+${d}`)}, hay ${tm(`${lo}\\le a\\le${hi}`)}. Vậy ${tb(`a\\in[${lo};\\ ${hi}]`)}.`}); }
  if(lv===2){ const near=R(100,900), d=pick([1,2,5]), lo=near-d, hi=near+d;
    return QB({text:`Khối lượng một vật được ghi là ${tm(`\\bar m=${D(near,1)}\\text{ kg}`)} với độ chính xác ${tm(`d=${D(d,1)}\\text{ kg}`)}. Tìm cận dưới và cận trên của khối lượng đúng ${tm('m')}.`,
      tpl:'Cận dưới: [_] kg ; cận trên: [_] kg',ans:[V(lo,1),V(hi,1)],hint:`Lấy số gần đúng trừ và cộng độ chính xác: ${tm('\\bar m-d\\le m\\le\\bar m+d')}.`,
      sol:`Cận dưới là ${tm(`${D(near,1)}-${D(d,1)}=${D(lo,1)}`)} kg. Cận trên là ${tm(`${D(near,1)}+${D(d,1)}=${D(hi,1)}`)} kg. Vậy ${tb(`m\\in[${D(lo,1)};\\ ${D(hi,1)}]\\text{ kg}`)}.`}); }
  const near=R(200,800), d=pick([2,3,4,5]), lo=near-d, hi=near+d, inside=R(lo,hi), outside=pick([lo-R(1,4),hi+R(1,4)]);
  const good=`${D(inside,1)} m có thể là giá trị đúng`;
  return QC({text:`Một chiều dài được cho bởi ${tm(`\\bar a=${D(near,1)}\\text{ m}`)} với độ chính xác ${tm(`d=${D(d,1)}\\text{ m}`)}. Khẳng định nào đúng?`,
    opts:[good,`${D(outside,1)} m có thể là giá trị đúng`,`${D(lo-1,1)} m chắc chắn là giá trị đúng`,`${D(hi+1,1)} m chắc chắn là giá trị đúng`],ans:good,
    hint:`Trước hết lập đoạn ${tm('[\\bar a-d;\\ \\bar a+d]')}, rồi kiểm tra từng giá trị.`,
    sol:`Giá trị đúng thuộc ${tm(`[${D(lo,1)};\\ ${D(hi,1)}]`)} m. Số ${tm(D(inside,1))} nằm trong đoạn này, nên ${tb(good)}.`});
};

const g12c = lv => { // làm tròn đến hàng cho trước
  if(lv===1){ const u=pick([10,100,1000]), n=R(1200,98000), ans=roundUnit(n,u);
    return QB({text:`Làm tròn số ${fmt(n)} đến ${placeName(u)}.`,tpl:'[_]',ans:[ans],
      hint:`Xét chữ số ngay bên phải ${placeName(u)}: nhỏ hơn 5 thì giữ nguyên, từ 5 trở lên thì tăng chữ số làm tròn thêm 1.`,
      sol:`Chữ số ngay bên phải ${placeName(u)} là ${Math.floor(n/(u/10))%10}. Theo quy tắc làm tròn, ta được ${tm(`${fmt(n)}\\approx${fmt(ans)}`)}. Kết quả là ${tb(fmt(ans))}.`}); }
  if(lv===2){ const k=3, target=pick([1,2]), unit=10**(k-target), n=R(1001,9998), ans=roundUnit(n,unit), label=target===1?'hàng phần mười':'hàng phần trăm';
    return QB({text:`Làm tròn số ${tm(D(n,k))} đến ${label}.`,tpl:'[_]',ans:[V(ans,k)],
      hint:`Giữ ${target} chữ số sau dấu phẩy rồi xét chữ số kế tiếp để làm tròn.`,
      sol:`Chữ số ngay bên phải ${label} là ${Math.floor(n/(unit/10))%10}. Theo quy tắc làm tròn, ${tm(`${D(n,k)}\\approx${D(ans,k)}`)}. Kết quả là ${tb(D(ans,k))}.`}); }
  const u=pick([10,100]), n=R(1500,95000), ans=roundUnit(n,u), max=u/2;
  return QB({text:`Số ${fmt(n)} được làm tròn đến ${placeName(u)}. Hãy điền số quy tròn và sai số tuyệt đối lớn nhất có thể do phép làm tròn.`,
    tpl:`Số quy tròn: [_] ${tm(';\\quad')} sai số lớn nhất: [_]`,ans:[ans,max],
    hint:`Làm tròn theo quy tắc thông thường. Sai số do làm tròn không vượt quá một nửa đơn vị của hàng làm tròn.`,
    sol:`Làm tròn đến ${placeName(u)} cho ${tm(`${fmt(n)}\\approx${fmt(ans)}`)}. Một đơn vị của hàng làm tròn là ${u}, nên sai số tuyệt đối không vượt quá ${tm(`\\dfrac{${u}}2=${max}`)}. Đáp án: ${tb(`${fmt(ans)};\\ ${max}`)}.`});
};

const g12d = lv => { // quy tròn theo độ chính xác
  const u=lv===1?pick([10,100,1000]):lv===2?pick([.1,.01]):pick([1,.1,.01]);
  const d=pick([1,2,3,4,5,6,7,8,9])*u/10, dp=u>=1?0:u===.1?1:2, scale=10**(dp+1), raw=u>=10?R(1200,98000):R(1001,9998)/scale;
  const ans=roundUnit(raw,u), rawText=u>=10?fmt(raw):raw.toFixed(dp+1).replace('.', '{,}'), ansText=u>=1?fmt(ans):ans.toFixed(dp).replace('.', '{,}');
  const accuracy=u>=10?String(d):d.toFixed(dp+1).replace('.', '{,}');
  return QB({text:`Cho số gần đúng ${tm(`\\bar a=${rawText}`)} với độ chính xác ${tm(`d=${accuracy}`)}. Quy tròn ${tm('\\bar a')} theo độ chính xác đã cho.`,
    tpl:'[_]',ans:[Number(ans.toFixed(dp))],hint:`Độ chính xác ${tm(`d=${accuracy}`)} có chữ số khác 0 đầu tiên ở ${placeName(u/10)}; vì vậy quy tròn đến hàng lớn hơn liền trước là ${placeName(u)}.`,
    sol:`Độ chính xác ${tm(`d=${accuracy}`)} có chữ số khác 0 đầu tiên ở ${placeName(u/10)}, nên ta quy tròn số gần đúng đến ${placeName(u)}. Theo quy tắc làm tròn, ${tm(`${rawText}\\approx${ansText}`)}. Kết quả là ${tb(ansText)}.`});
};

const g12e = lv => { // sai số tương đối và đo đạc thực tế
  if(lv===1){ const near=pick([100,200,250,400,500]), pct=pick([1,2,4]), d=near*pct/100;
    return QB({text:`Một đại lượng có số gần đúng ${tm(`\\bar a=${near}`)} và sai số tuyệt đối không vượt quá ${tm(`d=${d}`)}. Tính sai số tương đối lớn nhất theo phần trăm.`,
      tpl:'[_] %',ans:[pct],hint:`Sai số tương đối không vượt quá ${tm('\\dfrac{d}{|\\bar a|}')}; muốn viết dưới dạng phần trăm thì nhân với ${tm('100\\%')}.`,
      sol:`Ta có ${tm(`\\delta_a\\le\\dfrac{d}{|\\bar a|}=\\dfrac{${d}}{${near}}=${pct/100}`)}. Đổi sang phần trăm: ${tm(`${pct/100}\\cdot100\\%=${pct}\\%`)}. Vậy sai số tương đối lớn nhất là ${tb(`${pct}\\%`)}.`}); }
  if(lv===2){ const a1=pick([100,200,400]), p1=pick([1,2]), d1=a1*p1/100, p2=p1+pick([1,2]), a2=pick([100,250,500]), d2=a2*p2/100;
    const good=`Phép đo thứ nhất chính xác hơn`;
    return QC({text:`Phép đo thứ nhất cho ${tm(`\\bar a_1=${a1}`)}, ${tm(`d_1=${d1}`)}; phép đo thứ hai cho ${tm(`\\bar a_2=${a2}`)}, ${tm(`d_2=${d2}`)}. So sánh độ chính xác bằng sai số tương đối.`,
      opts:[good,'Phép đo thứ hai chính xác hơn','Hai phép đo chính xác như nhau','Không thể so sánh'],ans:good,
      hint:'Tính lần lượt các tỉ số phần trăm ' + tm('\\dfrac{d_1}{|\\bar a_1|}\\cdot100\\%') + ' và ' + tm('\\dfrac{d_2}{|\\bar a_2|}\\cdot100\\%') + '. Tỉ số nhỏ hơn chính xác hơn.',
      sol:`Phép đo thứ nhất có sai số tương đối không vượt quá ${tm(`\\dfrac{${d1}}{${a1}}\\cdot100\\%=${p1}\\%`)}. Phép đo thứ hai có sai số tương đối không vượt quá ${tm(`\\dfrac{${d2}}{${a2}}\\cdot100\\%=${p2}\\%`)}. Vì ${tm(`${p1}\\%\\lt${p2}\\%`)}, ${tb('phép đo thứ nhất chính xác hơn')}.`}); }
  const near=pick([200,400,500,800,1000]), pct=pick([.5,1,2]), d=near*pct/100;
  return QB({text:`Một thiết bị đo chiều dài khoảng ${tm(`\\bar a=${near}\\text{ m}`)}. Muốn sai số tương đối không vượt quá ${tm(`${String(pct).replace('.', '{,}')}\\%`)}, sai số tuyệt đối cho phép lớn nhất là bao nhiêu mét?`,
    tpl:'[_] m',ans:[d],hint:`Từ ${tm('\\dfrac{d}{|\\bar a|}\\cdot100\\%\\le p\\%')} suy ra ${tm('d\\le\\dfrac{p}{100}|\\bar a|')}.`,
    sol:`Điều kiện sai số tương đối là ${tm(`\\dfrac{d}{${near}}\\cdot100\\%\\le${String(pct).replace('.', '{,}')}\\%`)}. Suy ra ${tm(`d\\le\\dfrac{${String(pct).replace('.', '{,}')}}{100}\\cdot${near}=${String(d).replace('.', '{,}')}`)} m. Vậy sai số tuyệt đối cho phép lớn nhất là ${tb(`${String(d).replace('.', '{,}')}\\text{ m}`)}.`});
};

lesson(4,'so-gan-dung-sai-so','Bài 12. Số gần đúng và sai số','Sai số tuyệt đối; độ chính xác; khoảng chứa giá trị đúng; làm tròn, quy tròn; sai số tương đối trong đo đạc.',[g12a,g12b,g12c,g12d,g12e],{introTitle:'Kiến thức trọng tâm',intro:[
  {t:'Số gần đúng và sai số tuyệt đối',b:`Nếu ${tm('a')} là số đúng và ${tm('\\bar a')} là số gần đúng thì sai số tuyệt đối là ${tm('\\Delta_a=|a-\\bar a|')}.`,warn:'Sai số tuyệt đối luôn không âm và có cùng đơn vị với đại lượng được đo.',ex:'Muốn so sánh hai số gần đúng của cùng một đại lượng, số có sai số tuyệt đối nhỏ hơn chính xác hơn.'},
  {t:'Độ chính xác và khoảng chứa số đúng',b:`Nếu ${tm('\\Delta_a\\le d')} thì viết ${tm('a=\\bar a\\pm d')}; khi đó ${tm('\\bar a-d\\le a\\le\\bar a+d')}.`,warn:`Hai đầu mút đều được lấy vì dấu là ${tm('\\le')}.`,ex:'Lấy số gần đúng trừ và cộng độ chính xác để tìm cận dưới, cận trên.'},
  {t:'Làm tròn và quy tròn',b:'Làm tròn đến một hàng: xét chữ số ngay bên phải hàng đó. Với độ chính xác cho trước, xác định hàng của chữ số khác 0 đầu tiên rồi quy tròn đến hàng lớn hơn liền trước.',warn:'Chỉ làm tròn ở bước cuối nếu đề không yêu cầu làm tròn trung gian.',ex:'Độ chính xác 0,005 có chữ số khác 0 đầu tiên ở hàng phần nghìn, nên quy tròn đến hàng phần trăm.'},
  {t:'Sai số tương đối',b:`Sai số tương đối được đánh giá bởi ${tm('\\delta_a\\le\\dfrac{d}{|\\bar a|}')}; dạng phần trăm là ${tm('\\dfrac{d}{|\\bar a|}\\cdot100\\%')}.`,warn:'Khi so sánh phép đo các đại lượng có độ lớn khác nhau, phải dùng sai số tương đối.',ex:'Sai số tương đối càng nhỏ thì phép đo càng chính xác.'}
]});
}

/* =====================================================================
   ÔN TẬP GIỮA HỌC KÌ I (Chương I + II + III) – có hình vẽ
   Câu hỏi lấy từ ngân hàng data/lop10-giua-ki-bank.js (GK1): cùng ngân hàng với 5 đề ôn tập giữa kì và đề in của giáo viên.
   Mỗi dạng = lv => câu hỏi; mức 1 → 3 chuyển sang loại câu khó hơn. Đáp án luôn tính trước khi dựng đề (trong GK1).
   ===================================================================== */
{
{ G.topics.push({id:90, hk:1, name:'Ôn tập giữa học kì I', label:'📝 Giữa kì I', grp:'📝 Ôn tập · Củng cố · Kiểm tra'}); }
const rg = () => GK1.rng((Math.random() * 4294967296) >>> 0);
const HINT = {
  isProp:'Mệnh đề là câu khẳng định, xác định được là đúng hoặc sai. Câu hỏi, câu cảm thán, câu mệnh lệnh hay câu còn biến thì không phải.',
  negQuant:'Phủ định của “với mọi” là “tồn tại”, phủ định của “tồn tại” là “với mọi”, đồng thời phủ định luôn phần mệnh đề phía sau.',
  negSimple:'Phủ định một khẳng định: thêm “không” vào vị ngữ, hoặc đổi chiều dấu so sánh (> thành ≤, < thành ≥).',
  setOp:'Vẽ hai tập hợp lên trục số, chú ý đầu mút nào lấy (ngoặc vuông) hay không lấy (ngoặc tròn).',
  setFinite:'Giao: phần tử chung. Hợp: gộp hết (mỗi phần tử ghi một lần). Hiệu A \\ B: phần tử của A mà không thuộc B.',
  listSet:'Biến đổi bất đẳng thức về dạng cận dưới ≤ x < cận trên rồi lấy các số nguyên nằm trong khoảng đó, nhớ xét đầu mút.',
  halfPlane:'Thay toạ độ từng điểm vào vế trái của bất phương trình; điểm nào cho bất đẳng thức đúng thì thuộc miền nghiệm.',
  sysPoint:'Điểm thuộc miền nghiệm của hệ khi thoả mãn đồng thời tất cả các bất phương trình.',
  isLin:'Bất phương trình bậc nhất hai ẩn có dạng ax + by < c (hoặc >, ≤, ≥), ẩn chỉ ở bậc nhất, không có tích hai ẩn.',
  figSys:'Nét đứt ứng với dấu ngặt (< hoặc >), nét liền ứng với có dấu bằng. Lấy một điểm thử để biết phía nào của mỗi đường thẳng được giữ lại.',
  trig:'Dùng bảng giá trị đặc biệt; hai góc bù nhau có sin bằng nhau, côsin và tang đối nhau.',
  triArea:'Diện tích tam giác biết hai cạnh và góc xen giữa: S = ½·b·c·sin A.',
  cosLaw:'Biết hai cạnh và góc xen giữa thì dùng định lí côsin: a² = b² + c² − 2bc·cos A.',
  sinLaw:'Định lí sin: a / sin A = 2R.',
  angleType:'Xét dấu của b² + c² − a² với a là cạnh lớn nhất: dương → nhọn, bằng 0 → vuông, âm → tù.',
  venn:'Vẽ sơ đồ Venn: số phần tử của hợp = |A| + |B| − |A ∩ B|.',
  height:'Chiều cao ở độ cao quan sát cộng thêm phần d·tan(góc nhìn).',
  trigTF:'Dùng sin² α + cos² α = 1, rồi xét dấu côsin theo góc nhọn hay góc tù.',
  lp:'Lập các ràng buộc, tìm các đỉnh của miền nghiệm rồi tính giá trị biểu thức tại từng đỉnh.',
  sets:'Giao, hợp, hiệu của hai tập hợp; tập hợp có n phần tử thì có 2ⁿ tập con.',
  tri:'Dùng hệ quả của định lí côsin, công thức Heron và r = S / p.',
  tree:'Gọi H là chân cây. Dùng góc ngoài để tìm góc ở ngọn cây, định lí sin tìm BT, rồi TH = BT·sin(góc tại B).',
  eqTri:'Tam giác đều cạnh a nội tiếp đường tròn bán kính R thì a = R√3; diện tích S = ½·a²·sin 60°.',
  lpMin:'Lập hệ ràng buộc (dấu ≥), tìm các đỉnh của miền nghiệm rồi so sánh chi phí tại các đỉnh.',
  vennShort:'Dùng |A ∪ B| = |A| + |B| − |A ∩ B|, rồi lấy tổng số trừ đi.',
  cosRoad:'Biết hai cạnh và góc xen giữa: dùng định lí côsin để tìm cạnh còn lại.',
  heronR:'Tính nửa chu vi p, dùng công thức Heron để tìm S; bán kính ngoại tiếp R = abc / (4S).',
  subsets:'Liệt kê các phần tử của tập hợp rồi dùng 2ⁿ (n là số phần tử).',
  mixed:'Với mỗi giá trị nguyên của x, đếm số giá trị nguyên của y thoả mãn rồi cộng lại.',
  angle:'Diện tích tam giác biết hai cạnh và góc xen giữa: S = ½·b·c·sin A.'
};
const mcG = k => { const q = GK1.MC[k](rg(), 0); return QC({text:q.q, opts:q.opts, ans:q.opts[0], hint:HINT[k], sol:q.sol}); };
const tfG = k => { const q = GK1.TF[k](rg(), 0), j = R(0, 3), ok = Math.random() < .5, it = q.items[j];
  return QC({text:q.stem.replace(/Xét tính đúng sai[^]*?(?=<div|$)/, '') + `<p>Mệnh đề sau đúng hay sai?</p><p><b>${it.t[ok ? 0 : 1]}</b></p>`, opts:['Đúng', 'Sai'], ans:ok ? 'Đúng' : 'Sai', keepOrder:true, hint:HINT[k === 'trig' ? 'trigTF' : k], sol:`${it.s[ok ? 0 : 1]}<p>Vậy mệnh đề <b>${ok ? 'đúng' : 'sai'}</b>.</p>`}); };
const shG = k => { const q = GK1.shRun(k, (Math.random() * 4294967296) >>> 0); return QB({text:q.q, tpl:'[_]', ans:[q.ans], hint:HINT[k], sol:q.sol}); };
const pickBy = (lv, a, b, c) => lv === 1 ? a() : lv === 2 ? b() : c();

/* Chương I */
const gkA = lv => pickBy(lv, () => mcG('isProp'), () => mcG('negSimple'), () => mcG('negQuant'));
const gkB = lv => pickBy(lv, () => mcG('setFinite'), () => mcG('setOp'), () => tfG('sets'));
const gkC = lv => pickBy(lv, () => mcG('listSet'), () => shG('subsets'), () => shG('subsets'));
const gkD = lv => pickBy(lv, () => shG('vennShort'), () => tfG('venn'), () => shG('vennShort'));
/* Chương II */
const gkE = lv => pickBy(lv, () => mcG('isLin'), () => mcG('halfPlane'), () => mcG('sysPoint'));
const gkF = lv => mcG('figSys');
const gkG = lv => pickBy(lv, () => tfG('lp'), () => shG('mixed'), () => shG('lpMin'));
const gkH = lv => pickBy(lv, () => mcG('sysPoint'), () => shG('mixed'), () => shG('lpMin'));
/* Chương III */
const gkI = lv => pickBy(lv, () => mcG('trig'), () => tfG('trig'), () => tfG('tri'));
const gkJ = lv => pickBy(lv, () => mcG('cosLaw'), () => mcG('sinLaw'), () => mcG('angleType'));
const gkK = lv => pickBy(lv, () => mcG('triArea'), () => shG('heronR'), () => shG('eqTri'));
const gkL = lv => pickBy(lv, () => tfG('height'), () => shG('cosRoad'), () => shG('tree'));

const K = (t, b, warn, ex) => ({t, b, warn, ex});
const INTRO_T = 'Kiến thức cần nhớ · Lưu ý · Mẹo';
lesson(90, 'gk-menh-de-tap-hop', 'Ôn giữa kì · Chương I. Mệnh đề và tập hợp', 'Mệnh đề, phủ định, phép toán tập hợp, liệt kê tập hợp, đếm bằng sơ đồ Venn.', [gkA, gkB, gkC, gkD], {introTitle:INTRO_T, intro:[
  K('Mệnh đề và phủ định', `Mệnh đề là câu khẳng định xác định được <b>đúng</b> hoặc <b>sai</b>. Phủ định của ${tm('\\forall')} là ${tm('\\exists')} và ngược lại, đồng thời phủ định phần sau (${tm('\\gt \\to \\le')}, ${tm('\\lt \\to \\ge')}).`, 'Câu hỏi, câu cảm thán, câu mệnh lệnh, câu còn biến chưa gán giá trị thì <b>không</b> phải mệnh đề.', `Phủ định của ${tm('\\gt')} là ${tm('\\le')} (không phải ${tm('\\lt')}).`),
  K('Tập hợp và phép toán', `${tm('A \\cap B')}: phần chung; ${tm('A \\cup B')}: gộp lại; ${tm('A \\setminus B')}: thuộc ${tm('A')} nhưng không thuộc ${tm('B')}. Tập hợp có ${tm('n')} phần tử có ${tm('2^n')} tập con.`, 'Khoảng/đoạn: ngoặc <b>tròn</b> không lấy đầu mút, ngoặc <b>vuông</b> lấy đầu mút.', 'Vẽ hai tập hợp lên trục số trước khi tìm giao, hợp, hiệu.'),
  K('Đếm bằng sơ đồ Venn', `${tm('n(A \\cup B) = n(A) + n(B) - n(A \\cap B)')}. Số phần tử chỉ thuộc ${tm('A')} là ${tm('n(A) - n(A \\cap B)')}.`, 'Đừng cộng hai nhóm mà quên trừ phần giao (đếm hai lần).', 'Điền số vào từng miền của sơ đồ Venn rồi kiểm tra tổng bằng sĩ số lớp.')]});
lesson(90, 'gk-bpt-he-bpt', 'Ôn giữa kì · Chương II. Bất phương trình và hệ bất phương trình bậc nhất hai ẩn', 'Nghiệm, miền nghiệm, đọc hình miền nghiệm của hệ, bài toán tối ưu (chi phí, lợi nhuận).', [gkE, gkF, gkG, gkH], {introTitle:INTRO_T, intro:[
  K('Nghiệm và miền nghiệm', `Cặp số ${tm('(x_0;\\ y_0)')} là nghiệm khi thay vào cho bất đẳng thức đúng. Miền nghiệm là nửa mặt phẳng bờ ${tm('d: ax + by = c')}; lấy điểm thử (thường là gốc ${tm('O')}) để biết phía nào.`, `Dấu ngặt (${tm('\\lt')} hoặc ${tm('\\gt')}): bờ vẽ nét <b>đứt</b>, không thuộc miền nghiệm. Có dấu bằng: nét <b>liền</b>.`, 'Điểm thử không nằm trên đường thẳng thì tính rất nhanh; gốc toạ độ là lựa chọn đầu tiên.'),
  K('Hệ bất phương trình và hình vẽ', 'Miền nghiệm của hệ là phần chung của các miền nghiệm. Theo quy ước sách giáo khoa, phần <b>không bị gạch</b> là miền nghiệm.', 'Đổi dấu một bất phương trình là chuyển sang phía còn lại của đường thẳng.', 'Với mỗi đường thẳng trong hình, thử một điểm rồi loại dần các phương án.'),
  K('Bài toán tối ưu', `Lập ràng buộc, vẽ miền nghiệm, tìm <b>các đỉnh</b>, thay vào ${tm('F = ax + by')}: giá trị lớn nhất/nhỏ nhất đạt tại một đỉnh.`, `Đọc kỹ “tối đa” (${tm('\\le')}) và “ít nhất” (${tm('\\ge')}).`, `Lập bảng giá trị ${tm('F')} tại từng đỉnh rồi chọn lớn nhất/nhỏ nhất.`)]});
lesson(90, 'gk-he-thuc-luong', 'Ôn giữa kì · Chương III. Hệ thức lượng trong tam giác', 'Giá trị lượng giác, định lí côsin – sin, nhận dạng tam giác, diện tích, bài toán đo đạc (có hình).', [gkI, gkJ, gkK, gkL], {introTitle:INTRO_T, intro:[
  K('Giá trị lượng giác', `${tm('\\sin(180^\\circ - \\alpha) = \\sin\\alpha')}; ${tm('\\cos(180^\\circ - \\alpha) = -\\cos\\alpha')}; ${tm('\\tan(180^\\circ - \\alpha) = -\\tan\\alpha')}; ${tm('\\sin^2\\alpha + \\cos^2\\alpha = 1')}.`, `Góc tù thì côsin, tang, côtang đều <b>âm</b>; sin luôn dương với ${tm('0^\\circ \\lt \\alpha \\lt 180^\\circ')}.`, 'Thuộc bảng giá trị đặc biệt của 30°, 45°, 60°, 90°, rồi suy ra góc bù.'),
  K('Định lí côsin – sin – diện tích', `${tm('a^2 = b^2 + c^2 - 2bc\\cos A')}; ${tm('\\dfrac{a}{\\sin A} = 2R')}; ${tm('S = \\dfrac{1}{2}bc\\sin A = \\sqrt{p(p-a)(p-b)(p-c)} = pr = \\dfrac{abc}{4R}')}.`, 'Biết hai cạnh và góc <b>xen giữa</b> thì dùng ngay định lí côsin để tìm cạnh thứ ba.', `Biết một cạnh và góc đối diện thì nghĩ tới định lí sin để tìm ${tm('R')}.`),
  K('Bài toán đo đạc', 'Vẽ hình, ghi rõ góc và độ dài đã biết. Dùng góc ngoài của tam giác để tìm góc còn thiếu, rồi định lí sin/côsin.', 'Kiểm tra đơn vị và yêu cầu làm tròn trước khi viết đáp số.', 'Khi có hai góc quan sát từ hai điểm thẳng hàng với chân vật, góc ở ngọn bằng hiệu hai góc.')]});

/* Ôn tập tổng hợp: trộn cả ba chương, mức 1 → 3 */
const gkT1 = lv => pickBy(lv, () => pick([mcG('isProp'), mcG('setFinite')]), () => pick([mcG('negQuant'), mcG('setOp')]), () => pick([tfG('sets'), shG('subsets')]));
const gkT2 = lv => pickBy(lv, () => pick([mcG('isLin'), mcG('halfPlane')]), () => mcG('figSys'), () => pick([shG('lpMin'), tfG('lp')]));
const gkT3 = lv => pickBy(lv, () => pick([mcG('trig'), mcG('triArea')]), () => pick([mcG('cosLaw'), mcG('sinLaw')]), () => pick([tfG('tri'), shG('heronR')]));
const gkT4 = lv => pickBy(lv, () => shG('vennShort'), () => tfG('venn'), () => tfG('height'));
const gkT5 = lv => pickBy(lv, () => mcG('sysPoint'), () => shG('mixed'), () => shG('tree'));
const gkT6 = lv => pickBy(lv, () => shG('eqTri'), () => shG('cosRoad'), () => shG('tree'));
lesson(90, 'on-tap-giua-ki-1', 'Ôn tập giữa học kì I', 'Tổng hợp Chương I – II – III: mệnh đề và tập hợp, miền nghiệm và hệ bất phương trình, hệ thức lượng; có hình vẽ.', [gkT1, gkT2, gkT3, gkT4, gkT5, gkT6], {introTitle:INTRO_T, intro:[
  K('Chương I', `Phủ định ${tm('\\forall \\leftrightarrow \\exists')} và đổi dấu so sánh; ${tm('\\cap, \\cup, \\setminus')} trên trục số; ${tm('n(A \\cup B) = n(A) + n(B) - n(A \\cap B)')}.`, 'Xét kĩ đầu mút (ngoặc tròn/vuông).', 'Vẽ trục số hoặc sơ đồ Venn trước khi tính.'),
  K('Chương II', 'Điểm thử xác định phía miền nghiệm; nét đứt ứng với dấu ngặt; tối ưu: tính giá trị tại các đỉnh miền nghiệm.', `Đọc kĩ “tối đa/ít nhất” để chọn ${tm('\\le')} hay ${tm('\\ge')}.`, 'Gạch bỏ phần không thoả mãn để thấy miền nghiệm.'),
  K('Chương III', `${tm('a^2 = b^2 + c^2 - 2bc\\cos A')}, ${tm('\\dfrac{a}{\\sin A} = 2R')}, ${tm('S = \\dfrac{1}{2}bc\\sin A')}, công thức Heron.`, 'Góc tù: côsin, tang âm.', 'Bài đo đạc: vẽ tam giác, dùng góc ngoài để tìm góc ở ngọn.')]});
}
/* ======================= CHƯƠNG IV. VECTƠ – Bài 7 và Bài 8 (Toán 10, Kết nối tri thức) ======================= */
{
const m = tm;
const s3 = Math.sqrt(3);
const V = (a, b) => `\\overrightarrow{${a}${b}}`;
const VL = (a, b) => `\\left|${V(a, b)}\\right|`;
const ZERO = '\\vec{0}';
// ---------- hình mẫu: toạ độ toán học, mọi quan hệ vectơ được tính trực tiếp từ toạ độ ----------
const SH = {
  par:{n:`hình bình hành ${m('ABCD')} có tâm ${m('O')}`, P:{A:[0,0], B:[4,0], C:[5,3], D:[1,3], O:[2.5,1.5]}, poly:['A','B','C','D'], diag:[['A','C'], ['B','D']]},
  hex:{n:`lục giác đều ${m('ABCDEF')} có tâm ${m('O')}`, P:{A:[2,0], B:[1,s3], C:[-1,s3], D:[-2,0], E:[-1,-s3], F:[1,-s3], O:[0,0]}, poly:['A','B','C','D','E','F'], diag:[['A','D'], ['B','E'], ['C','F']]},
};
const names = sh => { const k = Object.keys(sh.P), r = []; k.forEach(a => k.forEach(b => { if(a !== b) r.push(a + b); })); return r; };
const vv = (sh, n) => [sh.P[n[1]][0] - sh.P[n[0]][0], sh.P[n[1]][1] - sh.P[n[0]][1]];
const eqv = (u, w) => Math.hypot(u[0] - w[0], u[1] - w[1]) < 1e-6;
const parv = (u, w) => Math.abs(u[0] * w[1] - u[1] * w[0]) < 1e-6;
const dotv = (u, w) => u[0] * w[0] + u[1] * w[1];
const lenv = u => Math.hypot(u[0], u[1]);
const neg = u => [-u[0], -u[1]];
const rev = n => n[1] + n[0];
const figSh = (sh, vecs = [], cap) => vecSVG({pts:Object.entries(sh.P).map(([k, [x, y]]) => [x, y, k]), poly:sh.poly, dash:sh.diag, vecs, h:220, cap});
const vtxt = n => m(V(n[0], n[1]));
const uniqS = (arr, what) => { if(new Set(arr).size !== arr.length) throw new Error('Phương án trùng nhau: ' + what + ' ' + arr.join('|')); return arr; };

/* ---------------- BÀI 7. Các khái niệm mở đầu ---------------- */
const g7a = lv => {   // đếm vectơ
  if(lv < 3){ const n = lv === 1 ? pick([3, 4, 5]) : pick([6, 7, 8]), L = 'ABCDEFGH'.slice(0, n).split('').join(', '), kq = n * (n - 1);
    return QB({text:`Cho ${n} điểm phân biệt ${m(L)}. Có bao nhiêu vectơ khác ${m(ZERO)} có điểm đầu và điểm cuối thuộc các điểm đã cho?`, tpl:'[_] vectơ', ans:[kq],
      hint:'Chọn điểm đầu trước, rồi chọn điểm cuối khác điểm đầu. Hai vectơ AB và BA là hai vectơ khác nhau.',
      sol:`Có ${n} cách chọn điểm đầu; với mỗi cách có ${n - 1} cách chọn điểm cuối (khác điểm đầu). Số vectơ: ${tb(`${n} × ${n - 1} = ${kq}`)}.`}); }
  const a = pick([3, 4, 5]), b = pick([4, 5, 6].filter(x => x !== a)), kq = a * (a - 1) + b * (b - 1);
  return QB({text:`Trên đường thẳng ${m('d')} lấy ${a} điểm phân biệt, trên đường thẳng ${m('d\'')} lấy ${b} điểm phân biệt khác (tất cả ${a + b} điểm đều khác nhau). Có bao nhiêu vectơ khác ${m(ZERO)} có điểm đầu và điểm cuối <b>cùng nằm trên ${m('d')} hoặc cùng nằm trên ${m('d\'')}</b>?`,
    tpl:'[_] vectơ', ans:[kq], hint:'Đếm riêng cho từng đường thẳng (điểm đầu rồi điểm cuối khác điểm đầu), rồi cộng lại.',
    sol:`Trên ${m('d')}: ${m(`${a}(${a} - 1) = ${a * (a - 1)}`)} vectơ. Trên ${m('d\'')}: ${m(`${b}(${b} - 1) = ${b * (b - 1)}`)} vectơ. Tổng: ${tb(kq)} vectơ.`});
};
const g7b = lv => {   // bằng nhau, ngược hướng, khẳng định sai
  if(lv === 1){ const sh = SH.par, N = names(sh); let t, eqs;
    do{ t = pick(['AB', 'AD', 'BC', 'DC', 'AO', 'OC', 'BO', 'OD']); eqs = N.filter(x => x !== t && eqv(vv(sh, x), vv(sh, t))); }while(!eqs.length);
    const good = pick(eqs), bad = shuffle(N.filter(x => !eqv(vv(sh, x), vv(sh, t)) && x !== rev(t))).slice(0, 2), opts = uniqS([good, rev(t), ...bad], 'g7b1');
    return QC({text:`Cho ${SH.par.n}. Vectơ nào sau đây <b>bằng</b> vectơ ${vtxt(t)}?`, fig:figSh(sh, [[t[0], t[1], '', 'alt']]), opts:opts.map(vtxt), ans:vtxt(good),
      hint:'Hai vectơ bằng nhau khi cùng hướng và cùng độ dài. Trong hình bình hành, các cạnh đối song song và bằng nhau.',
      sol:`${m(`${V(good[0], good[1])} = ${V(t[0], t[1])}`)} vì hai vectơ cùng hướng và cùng độ dài. Vectơ ${vtxt(rev(t))} có cùng độ dài nhưng ngược hướng nên là vectơ đối. Đáp án: ${tb(V(good[0], good[1]))}.`}); }
  if(lv === 2){ const sh = SH.par, N = names(sh); let t, op;
    do{ t = pick(['AB', 'AD', 'BC', 'CD', 'AO', 'OC', 'BO', 'OD', 'AC', 'BD']); op = N.filter(x => parv(vv(sh, x), vv(sh, t)) && dotv(vv(sh, x), vv(sh, t)) < 0); }while(!op.length);
    const good = pick(op), same = N.filter(x => x !== t && parv(vv(sh, x), vv(sh, t)) && dotv(vv(sh, x), vv(sh, t)) > 0), nonp = N.filter(x => !parv(vv(sh, x), vv(sh, t)));
    const opts = uniqS([good, ...shuffle(same).slice(0, 1), ...shuffle(nonp).slice(0, 4 - 1 - Math.min(1, same.length))], 'g7b2');
    return QC({text:`Cho ${SH.par.n}. Vectơ nào sau đây <b>cùng phương nhưng ngược hướng</b> với vectơ ${vtxt(t)}?`, fig:figSh(sh, [[t[0], t[1], '', 'alt']]), opts:opts.map(vtxt), ans:vtxt(good),
      hint:'Cùng phương: giá song song hoặc trùng nhau. Ngược hướng: mũi tên chỉ về hai phía trái ngược.',
      sol:`Giá của ${vtxt(good)} song song (hoặc trùng) với giá của ${vtxt(t)}, và hai vectơ chỉ về hai phía ngược nhau. Đáp án: ${tb(V(good[0], good[1]))}.`}); }
  const sh = SH.hex, N = names(sh), f = n => m(V(n[0], n[1])), lenS = n => m(VL(n[0], n[1]));
  const mk = () => { const a = pick(N); let b; do{ b = pick(N); }while(b === a); const u = vv(sh, a), w = vv(sh, b);
    const T = [
      [`${f(a)} = ${f(b)}`.replace(/^/, ''), eqv(u, w), m(`${V(a[0], a[1])} = ${V(b[0], b[1])}`)],
      [`${f(a)} và ${f(b)} là hai vectơ đối nhau`, eqv(u, neg(w)), `Hai vectơ ${f(a)} và ${f(b)} là hai vectơ đối nhau`],
      [`${f(a)} và ${f(b)} cùng hướng`, parv(u, w) && dotv(u, w) > 0, `Hai vectơ ${f(a)} và ${f(b)} cùng hướng`],
      [`${f(a)} và ${f(b)} ngược hướng`, parv(u, w) && dotv(u, w) < 0, `Hai vectơ ${f(a)} và ${f(b)} ngược hướng`],
      [`len`, Math.abs(lenv(u) - lenv(w)) < 1e-6, `${lenS(a)} = ${lenS(b)}`],
      [`${f(a)} và ${f(b)} cùng phương`, parv(u, w), `Hai vectơ ${f(a)} và ${f(b)} cùng phương`]];
    const x = pick(T); return {t:x[2], ok:x[1]}; };
  const tr = [], fl = []; let g = 0;
  while((tr.length < 3 || fl.length < 1) && g++ < 2000){ const s = mk(); if(s.ok && tr.length < 3 && !tr.some(y => y.t === s.t)) tr.push(s); else if(!s.ok && fl.length < 1) fl.push(s); }
  if(tr.length < 3 || !fl.length) throw new Error('g7b3 không đủ khẳng định');
  return QC({text:`Cho ${SH.hex.n}. Khẳng định nào sau đây <b>sai</b>?`, fig:figSh(sh), opts:[fl[0].t, ...tr.map(x => x.t)], ans:fl[0].t,
    hint:'Kiểm tra từng khẳng định trên hình: lục giác đều có các cạnh đối song song, đường chéo qua tâm O.',
    sol:`Ba khẳng định còn lại đều đúng (kiểm tra bằng hình: cùng hướng/ngược hướng, độ dài bằng nhau). Khẳng định ${tb('sai')} là: ${fl[0].t}.`});
};
const g7c = lv => {   // độ dài vectơ
  if(lv === 1){ const [p, q, r] = pick([[3, 4, 5], [5, 12, 13], [8, 15, 17], [6, 8, 10]]), k = pick([1, 2, 3]), sh = {P:{A:[0, 0], B:[p, 0], C:[p, q], D:[0, q]}, poly:['A', 'B', 'C', 'D'], diag:[['A', 'C']]};
    return QB({text:`Cho hình chữ nhật ${m('ABCD')} có ${m(`AB = ${p * k}`)} và ${m(`AD = ${q * k}`)}. Tính độ dài vectơ ${m(V('A', 'C'))}.`, fig:figSh(sh, [['A', 'C', '', 'alt']]), tpl:`${m(`${VL('A', 'C')} =`)} [_]`, ans:[r * k],
      hint:`Độ dài ${m(V('A', 'C'))} chính là độ dài đoạn thẳng ${m('AC')}. Dùng định lí Pythagore trong tam giác vuông.`,
      sol:`${m(`${VL('A', 'C')} = AC = \\sqrt{AB^2 + AD^2} = \\sqrt{${(p * k) ** 2} + ${(q * k) ** 2}} =`)} ${tb(r * k)}.`}); }
  if(lv === 2){ const [p, q, r] = pick([[3, 4, 5], [5, 12, 13], [6, 8, 10]]), k = pick([2, 4]), ac = 2 * p * k, bd = 2 * q * k, side = r * k;
    const sh = {P:{A:[-p, 0], B:[0, -q], C:[p, 0], D:[0, q], O:[0, 0]}, poly:['A', 'B', 'C', 'D'], diag:[['A', 'C'], ['B', 'D']]}, askB = pick([true, false]);
    return QB({text:`Cho hình thoi ${m('ABCD')} có tâm ${m('O')}, ${m(`AC = ${ac}`)} và ${m(`BD = ${bd}`)}. Tính ${m(askB ? VL('A', 'B') : VL('O', 'A'))}.`, fig:figSh(sh, [askB ? ['A', 'B', '', 'alt'] : ['O', 'A', '', 'alt']]),
      tpl:`${m(`${askB ? VL('A', 'B') : VL('O', 'A')} =`)} [_]`, ans:[askB ? side : p * k],
      hint:askB ? `${m(VL('A', 'B'))} là độ dài cạnh ${m('AB')}. Hai đường chéo hình thoi vuông góc tại trung điểm mỗi đường.` : `${m(VL('O', 'A'))} là độ dài đoạn ${m('OA')}, mà ${m('O')} là trung điểm của ${m('AC')}.`,
      sol:askB ? `${m(`OA = ${p * k},\\ OB = ${q * k}`)}, tam giác ${m('OAB')} vuông tại ${m('O')}: ${m(`AB = \\sqrt{${(p * k) ** 2} + ${(q * k) ** 2}} =`)} ${tb(side)}, nên ${m(`${VL('A', 'B')} = AB`)}.` : `${m('O')} là trung điểm ${m('AC')} nên ${m(`${VL('O', 'A')} = OA = \\dfrac{AC}{2} = \\dfrac{${ac}}{2} =`)} ${tb(p * k)}.`}); }
  const [p, q, r] = pick([[3, 4, 5], [5, 12, 13], [6, 8, 10]]), k = pick([2, 4]), kk = [p * k, q * k, r * k];
  const sh = {P:{A:[0, 0], B:[kk[0], 0], C:[0, kk[1]], M:[kk[0] / 2, kk[1] / 2]}, poly:['A', 'B', 'C'], diag:[['A', 'M']]};
  return QB({text:`Cho tam giác ${m('ABC')} vuông tại ${m('A')} có ${m(`AB = ${kk[0]}`)}, ${m(`AC = ${kk[1]}`)}; ${m('M')} là trung điểm của ${m('BC')}. Tính ${m(VL('M', 'A'))}.`, fig:figSh(sh, [['M', 'A', '', 'alt']]), tpl:`${m(`${VL('M', 'A')} =`)} [_]`, ans:[kk[2] / 2],
    hint:`${m(VL('M', 'A'))} = ${m('MA')}. Trong tam giác vuông, trung tuyến ứng với cạnh huyền bằng nửa cạnh huyền.`,
    sol:`${m(`BC = \\sqrt{${kk[0] ** 2} + ${kk[1] ** 2}} = ${kk[2]}`)}. Trung tuyến ${m('AM')} ứng với cạnh huyền nên ${m(`${VL('M', 'A')} = MA = \\dfrac{BC}{2} =`)} ${tb(kk[2] / 2)}.`});
};
const DIRS = {B:'Bắc', N:'Nam', D:'Đông', T:'Tây'}, OPP = {B:'N', N:'B', D:'T', T:'D'};
const g7d = lv => {   // thực tế: biểu diễn lực, vận tốc bằng vectơ
  if(lv === 1){ const [what, unit, s] = pick([['vận tốc của ô tô', 'km/h', 20], ['lực kéo', 'N', 10], ['vận tốc của gió', 'km/h', 5], ['trọng lực tác dụng lên vật', 'N', 20]]), k = R(3, 9);
    return QB({text:`Biểu diễn ${what} <b>${k * s} ${unit}</b> bằng một vectơ, chọn tỉ lệ xích: 1 cm ứng với ${s} ${unit}. Vectơ đó có độ dài bao nhiêu xentimét?`, tpl:'[_] cm', ans:[k],
      hint:'Độ dài vectơ (cm) = giá trị đại lượng chia cho số đơn vị ứng với 1 cm.', sol:`${m(`${k * s} : ${s} =`)} ${tb(k)} cm.`}); }
  const keys = Object.keys(DIRS);
  let d1, d2, v1, v2, kind;
  d1 = pick(keys); v1 = pick([30, 40, 50, 60]); d2 = lv === 2 ? d1 : pick([d1, OPP[d1], OPP[d1]]); v2 = pick([30, 40, 50, 60]); kind = (d1 === d2 ? 'same' : 'opp') + (v1 === v2 ? '=' : '≠');
  const MAP = {'same=':'Hai vectơ vận tốc bằng nhau.', 'opp=':'Hai vectơ vận tốc là hai vectơ đối nhau.', 'same≠':'Hai vectơ vận tốc cùng hướng nhưng có độ dài khác nhau.', 'opp≠':'Hai vectơ vận tốc ngược hướng nhưng có độ dài khác nhau.'};
  const nm = lv === 2 ? ['Ô tô', 'xe máy'] : ['Tàu thứ nhất', 'tàu thứ hai'];
  return QC({text:`${nm[0]} chạy theo hướng <b>${DIRS[d1]}</b> với vận tốc ${v1} km/h, ${nm[1]} chạy theo hướng <b>${DIRS[d2]}</b> với vận tốc ${v2} km/h. Khẳng định nào sau đây đúng?`,
    opts:Object.values(MAP), ans:MAP[kind], keepOrder:true,
    hint:'Hai vectơ bằng nhau: cùng hướng và cùng độ dài. Hai vectơ đối nhau: ngược hướng và cùng độ dài.',
    sol:`Hướng: ${DIRS[d1]} và ${DIRS[d2]} là ${d1 === d2 ? 'cùng hướng' : 'ngược hướng'}. Độ lớn vận tốc: ${v1} và ${v2} km/h ${v1 === v2 ? 'bằng nhau' : 'khác nhau'}. Vậy ${tb(MAP[kind])}`});
};
lesson(5, 'vecto-khai-niem', 'Bài 7. Các khái niệm mở đầu', 'Vectơ, điểm đầu – điểm cuối, độ dài; cùng phương, cùng hướng; hai vectơ bằng nhau, đối nhau; vectơ-không; biểu diễn lực và vận tốc.', [g7a, g7b, g7c, g7d]);

/* ---------------- BÀI 8. Tổng và hiệu của hai vectơ ---------------- */
const LET = 'ABCDEFGHKMNPQ'.split('');
const g8a = lv => {   // quy tắc ba điểm, quy tắc hiệu, rút gọn tổng nhiều vectơ
  const pts = shuffle(LET);
  if(lv === 1){ const [x, y, z] = pts, good = x + z, opts = uniqS([good, rev(good), x + y, y + z], 'g8a1');
    return QC({text:`Với ba điểm bất kì ${m(`${x}, ${y}, ${z}`)}, ${m(`${V(x, y)} + ${V(y, z)}`)} bằng vectơ nào sau đây?`, opts:opts.map(vtxt), ans:vtxt(good),
      hint:'Quy tắc ba điểm: điểm cuối của vectơ thứ nhất trùng điểm đầu của vectơ thứ hai.', sol:`Theo quy tắc ba điểm: ${m(`${V(x, y)} + ${V(y, z)} = ${V(x, z)}`)}. Đáp án: ${tb(V(good[0], good[1]))}.`}); }
  if(lv === 2){ const [x, y, z] = pts, sameStart = pick([true, false]);
    if(sameStart){ const good = z + y, opts = uniqS([good, rev(good), x + y, x + z], 'g8a2a');
      return QC({text:`Với ba điểm bất kì ${m(`${x}, ${y}, ${z}`)}, ${m(`${V(x, y)} - ${V(x, z)}`)} bằng vectơ nào sau đây?`, opts:opts.map(vtxt), ans:vtxt(good),
        hint:'Hai vectơ có chung điểm đầu: dùng quy tắc hiệu, hiệu bằng vectơ nối hai điểm cuối (theo thứ tự trừ).', sol:`${m(`${V(x, y)} - ${V(x, z)} = ${V(z, y)}`)} (quy tắc hiệu: ${m(`\\overrightarrow{OB} - \\overrightarrow{OA} = \\overrightarrow{AB}`)}). Đáp án: ${tb(V(good[0], good[1]))}.`}); }
    const good = y + z, opts = uniqS([good, rev(good), x + y, x + z], 'g8a2b');
    return QC({text:`Với ba điểm bất kì ${m(`${x}, ${y}, ${z}`)}, ${m(`${V(y, x)} - ${V(z, x)}`)} bằng vectơ nào sau đây?`, opts:opts.map(vtxt), ans:vtxt(good),
      hint:`Viết ${m(V(z, x))} = ${m(`-${V(x, z)}`)} rồi dùng quy tắc ba điểm, hoặc dùng quy tắc hiệu.`, sol:`${m(`${V(y, x)} - ${V(z, x)} = ${V(y, x)} + ${V(x, z)} = ${V(y, z)}`)} (cộng với vectơ đối rồi dùng quy tắc ba điểm). Đáp án: ${tb(V(good[0], good[1]))}.`}); }
  const closed = pick([true, false]), p = pts.slice(0, closed ? 4 : 5), n = closed ? 4 : 4, vecs = [];
  for(let i = 0; i < n; i++) vecs.push(p[i] + (closed && i === n - 1 ? p[0] : p[i + 1]));
  const order = shuffle(vecs), expr = order.map((s, i) => (i ? ' + ' : '') + V(s[0], s[1])).join('');
  const good = closed ? ZERO : p[0] + p[4], opts = closed ? uniqS([ZERO, p[0] + p[1], p[0] + p[2], p[1] + p[3]].map(x => x === ZERO ? x : V(x[0], x[1])), 'g8a3c') : uniqS([good, rev(good), p[0] + p[3], p[1] + p[4]].map(x => V(x[0], x[1])), 'g8a3o');
  return QC({text:`Rút gọn: ${td(expr)}`, opts:opts.map(m), ans:m(closed ? ZERO : V(good[0], good[1])),
    hint:'Sắp xếp lại các vectơ (tính chất giao hoán) sao cho điểm cuối của vectơ này là điểm đầu của vectơ kế tiếp, rồi dùng quy tắc ba điểm liên tiếp.',
    sol:`Sắp xếp: ${m(vecs.map((s, i) => (i ? ' + ' : '') + V(s[0], s[1])).join(''))}. Dùng quy tắc ba điểm liên tiếp: ${closed ? `điểm đầu và điểm cuối trùng nhau nên tổng bằng ${tb(ZERO)}` : `tổng bằng ${tb(V(good[0], good[1]))}`}.`});
};
const g8b = lv => {   // độ dài của tổng, hiệu
  if(lv === 1){ const [p, q, r] = pick([[3, 4, 5], [5, 12, 13], [8, 15, 17], [6, 8, 10]]), k = pick([1, 2, 3]), isSum = pick([true, false]);
    const sh = {P:{A:[0, 0], B:[p, 0], C:[p, q], D:[0, q]}, poly:['A', 'B', 'C', 'D'], diag:[]};
    return QB({text:`Cho hình chữ nhật ${m('ABCD')} có ${m(`AB = ${p * k}`)} và ${m(`AD = ${q * k}`)}. Tính ${m(`\\left|${V('A', 'B')} ${isSum ? '+' : '-'} ${V('A', 'D')}\\right|`)}.`,
      fig:figSh(sh, [['A', 'B', '', ''], ['A', 'D', '', ''], isSum ? ['A', 'C', '', 'alt'] : ['D', 'B', '', 'alt']]), tpl:`${m(`\\left|${V('A', 'B')} ${isSum ? '+' : '-'} ${V('A', 'D')}\\right| =`)} [_]`, ans:[r * k],
      hint:isSum ? 'Quy tắc hình bình hành: tổng hai vectơ chung điểm đầu là vectơ đường chéo.' : 'Quy tắc hiệu: hiệu hai vectơ chung điểm đầu là vectơ nối hai điểm cuối.',
      sol:isSum ? `${m(`${V('A', 'B')} + ${V('A', 'D')} = ${V('A', 'C')}`)} (quy tắc hình bình hành), nên ${m(`\\left|${V('A', 'B')} + ${V('A', 'D')}\\right| = AC = \\sqrt{${(p * k) ** 2} + ${(q * k) ** 2}} =`)} ${tb(r * k)}.`
        : `${m(`${V('A', 'B')} - ${V('A', 'D')} = ${V('D', 'B')}`)} (quy tắc hiệu), nên ${m(`\\left|${V('A', 'B')} - ${V('A', 'D')}\\right| = DB = \\sqrt{${(p * k) ** 2} + ${(q * k) ** 2}} =`)} ${tb(r * k)}.`}); }
  if(lv === 2){ const [p, q] = pick([[3, 4], [5, 12], [6, 8]]), k = pick([2, 4]), ac = 2 * p * k, bd = 2 * q * k, isSum = pick([true, false]);
    const sh = {P:{A:[-p, 0], B:[0, -q], C:[p, 0], D:[0, q], O:[0, 0]}, poly:['A', 'B', 'C', 'D'], diag:[['A', 'C'], ['B', 'D']]};
    return QB({text:`Cho hình thoi ${m('ABCD')} có hai đường chéo ${m(`AC = ${ac}`)} và ${m(`BD = ${bd}`)}. Tính ${m(`\\left|${V('A', 'B')} ${isSum ? '+' : '-'} ${V('A', 'D')}\\right|`)}.`,
      fig:figSh(sh, [['A', 'B', '', ''], ['A', 'D', '', ''], isSum ? ['A', 'C', '', 'alt'] : ['D', 'B', '', 'alt']]), tpl:`${m(`\\left|${V('A', 'B')} ${isSum ? '+' : '-'} ${V('A', 'D')}\\right| =`)} [_]`, ans:[isSum ? ac : bd],
      hint:isSum ? `${m('ABCD')} là hình bình hành nên ${m(`${V('A', 'B')} + ${V('A', 'D')}`)} bằng một vectơ đường chéo.` : 'Hiệu hai vectơ chung điểm đầu là vectơ nối hai điểm cuối.',
      sol:isSum ? `${m(`${V('A', 'B')} + ${V('A', 'D')} = ${V('A', 'C')}`)} nên độ dài bằng ${m('AC =')} ${tb(ac)}.` : `${m(`${V('A', 'B')} - ${V('A', 'D')} = ${V('D', 'B')}`)} nên độ dài bằng ${m('DB =')} ${tb(bd)}.`}); }
  const [p, q, r] = pick([[3, 4, 5], [5, 12, 13], [6, 8, 10]]), k = pick([2, 4]), kk = [p * k, q * k, r * k], isSum = pick([true, false]);
  const sh = {P:{A:[0, 0], B:[kk[0], 0], C:[0, kk[1]], M:[kk[0] / 2, kk[1] / 2]}, poly:['A', 'B', 'C'], diag:[['A', 'M']]};
  return QB({text:`Cho tam giác ${m('ABC')} vuông tại ${m('A')} có ${m(`AB = ${kk[0]}`)} và ${m(`AC = ${kk[1]}`)}. Tính ${m(`\\left|${V('A', 'B')} ${isSum ? '+' : '-'} ${V('A', 'C')}\\right|`)}.`,
    fig:figSh(sh, [isSum ? ['A', 'M', '', 'alt'] : ['C', 'B', '', 'alt']]), tpl:`${m(`\\left|${V('A', 'B')} ${isSum ? '+' : '-'} ${V('A', 'C')}\\right| =`)} [_]`, ans:[kk[2]],
    hint:isSum ? `Gọi ${m('M')} là trung điểm ${m('BC')}: ${m(`${V('A', 'B')} + ${V('A', 'C')} = 2${V('A', 'M')}`)}. Trung tuyến ứng với cạnh huyền bằng nửa cạnh huyền.` : 'Quy tắc hiệu cho vectơ nối hai điểm cuối.',
    sol:isSum ? `${m(`BC = ${kk[2]}`)}, ${m(`AM = \\dfrac{BC}{2} = ${kk[2] / 2}`)}. ${m(`\\left|${V('A', 'B')} + ${V('A', 'C')}\\right| = 2AM =`)} ${tb(kk[2])}.` : `${m(`${V('A', 'B')} - ${V('A', 'C')} = ${V('C', 'B')}`)} nên độ dài bằng ${m('CB =')} ${tb(kk[2])}.`});
};
// vế trái và vế phải của đẳng thức vectơ, tính trên toạ độ
const evalT = (sh, terms) => terms.reduce((s, [sg, n]) => { const u = vv(sh, n); return [s[0] + sg * u[0], s[1] + sg * u[1]]; }, [0, 0]);
const termTxt = terms => terms.map(([sg, n], i) => (i ? (sg > 0 ? ' + ' : ' - ') : (sg < 0 ? '-' : '')) + V(n[0], n[1])).join('');
const parseT = str => [...str.matchAll(/([+-])([A-Z]{2})/g)].map(x => [x[1] === '+' ? 1 : -1, x[2]]);
const RULE = {
  hbh:'Quy tắc hình bình hành: tổng hai vectơ chung điểm đầu là vectơ đường chéo xuất phát từ điểm đầu đó.',
  ba:'Quy tắc ba điểm: điểm cuối của vectơ trước là điểm đầu của vectơ sau.',
  hieu:'Quy tắc hiệu: hai vectơ chung điểm đầu, hiệu là vectơ nối hai điểm cuối (theo thứ tự trừ); hoặc đổi dấu rồi dùng quy tắc ba điểm.',
  o:'O là trung điểm của đường chéo nên hai vectơ có điểm đầu O và điểm cuối là hai đầu đường chéo là hai vectơ đối nhau, tổng bằng vectơ-không.',
  dd:'Hai cạnh đối của hình bình hành (hoặc lục giác đều) là hai vectơ đối nhau, nên tổng bằng vectơ-không.',
  rh:'Tứ giác tạo bởi O và ba đỉnh liên tiếp là hình thoi: dùng quy tắc hình bình hành.',
  z3:'Ba vectơ OA, OC, OE có cùng độ dài, đôi một tạo góc 120° nên tổng bằng vectơ-không (tam giác ACE đều có tâm O).',
  z6:'Ghép từng cặp vectơ đối nhau (OA và OD, OB và OE, OC và OF): mỗi cặp có tổng bằng vectơ-không.'};
const PAT = {
  1:[['+AB+AD','hbh'], ['+BA+BC','hbh'], ['+DA+DC','hbh'], ['+CB+CD','hbh'], ['+AB+BC','ba'], ['+AD+DC','ba'], ['+AB-AD','hieu'], ['+AC-AB','hieu'], ['+AC-AD','hieu'], ['+CB-CD','hieu'], ['+BC-BA','hieu']],
  2:[['+OA+OC','o'], ['+OB+OD','o'], ['+AB+CD','dd'], ['+AD+CB','dd'], ['+OA-OB','hieu'], ['+OB-OC','hieu'], ['+AO+OB','ba'], ['+BO+OC','ba'], ['+OA+OB+OC+OD','o']],
  3:[['+OA+OC','rh'], ['+OB+OD','rh'], ['+OC+OE','rh'], ['+AB+AF','hbh'], ['+BA+BC','hbh'], ['+AB+BC+CD','ba'], ['+AB-AF','hieu'], ['+OB-OA','hieu'], ['+AB+DE','dd'], ['+OA+OC+OE','z3'], ['+OB+OD+OF','z3'], ['+OA+OB+OC+OD+OE+OF','z6']]};
const shiftHex = (str, k) => str.replace(/[A-F]/g, c => 'ABCDEF'[('ABCDEF'.indexOf(c) + k) % 6]);
const swapPar = str => str.replace(/[ABCD]/g, c => ({A:'C', B:'D', C:'A', D:'B'})[c]);
const g8c = lv => {   // đẳng thức vectơ trong hình bình hành, lục giác đều
  const sh = lv === 3 ? SH.hex : SH.par, rhsNames = names(sh).sort((a, b) => a.includes('O') - b.includes('O'));
  const mkItem = ([str, tag]) => { const st = lv === 3 ? shiftHex(str, R(0, 5)) : (Math.random() < .5 ? swapPar(str) : str), terms = parseT(st), u = evalT(sh, terms);
    const zero = Math.hypot(u[0], u[1]) < 1e-6, hasO = terms.some(t => t[1].includes('O')), hit = zero ? null : rhsNames.slice().sort((p, q) => (p.includes('O') - q.includes('O')) * (hasO ? -1 : 1)).find(n => eqv(vv(sh, n), u));
    if(!zero && !hit) throw new Error('g8c: biểu thức không có vectơ bằng nó: ' + st);
    return {terms, tag, zero, good:zero ? ZERO : V(hit[0], hit[1]), u}; };
  const wrongR = x => { const c = rhsNames.filter(n => x.zero || !eqv(vv(sh, n), x.u)).map(n => V(n[0], n[1])).concat(x.zero ? [] : [ZERO]); return pick(c.filter(r => r !== x.good)); };
  const pool = shuffle(PAT[lv]), items = []; 
  for(const p of pool){ const it = mkItem(p), k = termTxt(it.terms); if(!items.some(y => termTxt(y.terms) === k) && (items.length === 0 || items.length < 4)) items.push(it); if(items.length === 4) break; }
  const line = (x, r) => m(`${termTxt(x.terms)} = ${r}`), g0 = items[0];
  const opts = uniqS([line(g0, g0.good), ...items.slice(1).map(x => line(x, wrongR(x)))], 'g8c');
  return QC({text:`Cho ${sh.n}. Đẳng thức nào sau đây <b>đúng</b>?`, fig:figSh(sh), opts, ans:line(g0, g0.good),
    hint:'Với mỗi đẳng thức, thử rút gọn vế trái bằng quy tắc ba điểm, quy tắc hình bình hành hoặc quy tắc hiệu rồi so với vế phải.',
    sol:`${RULE[g0.tag]} Vì vậy ${m(`${termTxt(g0.terms)} = ${g0.good}`)}; ba đẳng thức còn lại có vế phải sai. Đáp án: ${tb(`${termTxt(g0.terms)} = ${g0.good}`)}.`});
};
const g8d = lv => {   // thực tế: hợp lực, vận tốc
  if(lv === 1){ const [p, q, r] = pick([[3, 4, 5], [5, 12, 13], [8, 15, 17], [6, 8, 10]]);
    const f1 = p * 10, f2 = q * 10, f = r * 10;
    return QB({text:`Hai lực ${m('\\vec{F_1}')} và ${m('\\vec{F_2}')} có độ lớn lần lượt ${f1} N và ${f2} N, cùng tác dụng vào một vật tại điểm ${m('O')} và có phương vuông góc với nhau. Tính độ lớn của hợp lực ${m('\\vec{F_1} + \\vec{F_2}')}.`,
      fig:vecSVG({pts:[[0, 0, 'O'], [p, 0, 'A'], [0, q, 'B'], [p, q, 'C']], poly:[], dash:[['A', 'C'], ['B', 'C']], vecs:[['O', 'A', 'F₁'], ['O', 'B', 'F₂'], ['O', 'C', 'F', 'alt']], h:200}), tpl:'[_] N', ans:[f],
      hint:'Vẽ hình chữ nhật có hai cạnh là hai lực; hợp lực là vectơ đường chéo xuất phát từ O.',
      sol:`Hợp lực là vectơ đường chéo của hình chữ nhật (quy tắc hình bình hành): ${m(`F = \\sqrt{${f1}^2 + ${f2}^2} =`)} ${tb(f)} N.`}); }
  if(lv === 2){ const [p, q, r] = pick([[5, 12, 13], [3, 4, 5], [8, 15, 17]]), k = pick([1, 2]), a = p * k, b = q * k, c = r * k;
    return QB({text:`Một chiếc thuyền chạy ngang một khúc sông với vận tốc ${b} km/h so với dòng nước, hướng chạy vuông góc với dòng chảy. Nước chảy với vận tốc ${a} km/h. Tính độ lớn vận tốc thực của thuyền so với bờ.`,
      fig:vecSVG({pts:[[0, 0, 'O'], [a, 0, 'A'], [0, b, 'B'], [a, b, 'C']], poly:[], dash:[['A', 'C'], ['B', 'C']], vecs:[['O', 'A', 'nước'], ['O', 'B', 'thuyền'], ['O', 'C', 'thực', 'alt']], h:200}), tpl:'[_] km/h', ans:[c],
      hint:'Vận tốc thực là tổng của vận tốc thuyền (so với nước) và vận tốc dòng nước; hai vận tốc vuông góc.',
      sol:`Vận tốc thực là vectơ tổng, bằng đường chéo hình chữ nhật hai cạnh ${a} và ${b}: ${m(`v = \\sqrt{${a}^2 + ${b}^2} =`)} ${tb(c)} km/h.`}); }
  const kind = pick(['f120', 'wind']);
  if(kind === 'f120'){ const F = pick([40, 50, 60, 80, 100]);
    return QB({text:`Hai người cùng kéo một chiếc xe bằng hai sợi dây; hai lực kéo có cùng độ lớn <b>${F} N</b> và hai sợi dây tạo với nhau góc ${m('120^\\circ')}. Tính độ lớn của hợp lực tác dụng lên xe.`,
      fig:vecSVG({pts:[[0, 0, 'O'], [1, 0, 'A'], [-0.5, s3 / 2, 'B'], [0.5, s3 / 2, 'C']], poly:[], dash:[['A', 'C'], ['B', 'C']], vecs:[['O', 'A', 'F₁'], ['O', 'B', 'F₂'], ['O', 'C', 'F', 'alt']], h:190}), tpl:'[_] N', ans:[F],
      hint:'Hợp lực là đường chéo của hình thoi. Với góc 120° giữa hai lực, đường chéo kẻ từ O chia hình thoi thành hai tam giác đều.',
      sol:`Hình thoi ${m('OACB')} có ${m('\\widehat{AOB} = 120^\\circ')} nên ${m('\\widehat{OAC} = 60^\\circ')}; tam giác ${m('OAC')} là tam giác đều (${m('OA = AC')}), do đó ${m(`OC = OA =`)} ${tb(F)} N.`}); }
  const [p, q, r] = pick([[3, 4, 5], [6, 8, 10], [5, 12, 13]]), k = pick([100, 50]), a = p * k, b = q * k, c = r * k;
  return QB({text:`Máy bay bay theo hướng Đông với vận tốc ${a} km/h so với không khí, trong khi gió thổi theo hướng Bắc với vận tốc ${b} km/h. Tính độ lớn vận tốc của máy bay so với mặt đất.`,
    fig:vecSVG({pts:[[0, 0, 'O'], [a / k, 0, 'A'], [0, b / k, 'B'], [a / k, b / k, 'C']], poly:[], dash:[['A', 'C'], ['B', 'C']], vecs:[['O', 'A', 'máy bay'], ['O', 'B', 'gió'], ['O', 'C', 'thực', 'alt']], h:200}), tpl:'[_] km/h', ans:[c],
    hint:'Hai vận tốc có phương vuông góc (Đông và Bắc); vận tốc so với mặt đất là vectơ tổng.', sol:`${m(`v = \\sqrt{${a}^2 + ${b}^2} =`)} ${tb(c)} km/h.`});
};
lesson(5, 'vecto-tong-hieu', 'Bài 8. Tổng và hiệu của hai vectơ', 'Quy tắc ba điểm, quy tắc hình bình hành; vectơ đối, hiệu hai vectơ; độ dài của tổng, hiệu; hợp lực và vận tốc.', [g8a, g8b, g8c, g8d]);
G.topics.splice(G.topics.findIndex(t => t.id === 3) + 1, 0, {id:5, hk:1, name:'Vectơ', label:'Chương IV'});
}

/* =====================================================================
   CHƯƠNG IV. VECTƠ – Bài 9. Tích của một số với một vectơ (thầy yêu cầu 17/10/2026, /tron-bo)
   4 dạng × 3 mức: A độ dài và hướng của k·a · B hệ thức trung điểm, trọng tâm · C hai vectơ cùng phương, tìm hệ số · D phân tích vectơ (chọn đẳng thức đúng).
   Đáp án chọn trước; các đẳng thức phân tích vectơ được kiểm lại bằng toạ độ tam giác (v9chk).
   ===================================================================== */
{
const m = tm;
const V = (a, b) => `\\overrightarrow{${a}${b}}`;
const VL = (a, b) => `\\left|${V(a, b)}\\right|`;
const v9chk = (ok, msg) => { if(!ok) throw new Error('v9: ' + msg); };
const fr9 = (n, d = 1) => { const g = gcd(Math.abs(n), Math.abs(d)) || 1; if(d < 0){ n = -n; d = -d; } return [n / g, d / g]; };
const fadd9 = (a, b) => fr9(a[0] * b[1] + b[0] * a[1], a[1] * b[1]);
const fneg9 = a => [-a[0], a[1]];
const fnum9 = a => a[0] / a[1];
const fstr9 = a => a[1] === 1 ? `${a[0]}` : `${a[0] < 0 ? '-' : ''}\\dfrac{${Math.abs(a[0])}}{${a[1]}}`;
const comb9 = (cs, vs) => { let s = ''; cs.forEach((c, i) => { if(!c[0]) return; const mag = Math.abs(c[0]) === c[1] ? '' : fstr9([Math.abs(c[0]), c[1]]), sg = c[0] < 0 ? '-' : '+'; s += (s ? ` ${sg} ` : (sg === '-' ? '-' : '')) + mag + vs[i]; }); return s || '0'; };
const TRI9 = {A:[0, 0], B:[4, 1], C:[1, 3]};
const figTri9 = (vecs = [], extra = []) => vecSVG({pts:[[0, 0, 'A'], [4, 1, 'B'], [1, 3, 'C'], ...extra], poly:['A', 'B', 'C'], vecs, h:200});
const uniq9 = (arr, what) => { if(new Set(arr).size !== arr.length) throw new Error('v9: phương án trùng ' + what + ' ' + arr.join('|')); return arr; };

/* Dạng A. Độ dài và hướng của k·a */
const g9a = lv => {
  if(lv === 1){
    const L = R(2, 9), k = pick([2, 3, 4, -2, -3, -5]), kq = Math.abs(k) * L;
    return QB({text:`Cho vectơ ${m('\\vec{a}')} có độ dài ${m(`\\left|\\vec{a}\\right| = ${L}`)}. Tính ${m(`\\left|${k < 0 ? '(' + k + ')' : k}\\vec{a}\\right|`)}.`, tpl:`[_]`, ans:[kq],
      hint:'Độ dài của vectơ k·a bằng |k| nhân với độ dài của a (không phụ thuộc k dương hay âm).',
      sol:`${m(`\\left|${k < 0 ? '(' + k + ')' : k}\\vec{a}\\right| = |${k}|\\cdot ${L} = ${Math.abs(k)}\\cdot ${L}`)} = ${tb(kq)}.`});
  }
  if(lv === 2){
    const k = pick([2, 3, 4, -2, -3, -4]), M = Math.abs(k), W = M + 1, same = k > 0;
    const good = `${M} lần độ dài ${m('\\vec{a}')}, ${same ? 'cùng' : 'ngược'} hướng`, opts = uniq9([good, `${M} lần độ dài ${m('\\vec{a}')}, ${same ? 'ngược' : 'cùng'} hướng`, `${W} lần độ dài ${m('\\vec{a}')}, cùng hướng`, `${W} lần độ dài ${m('\\vec{a}')}, ngược hướng`], 'g9a2');
    return QC({text:`Cho ${m('\\vec{a} \\ne \\vec{0}')} và ${m(`\\vec{b} = ${k < 0 ? '(' + k + ')' : k}\\vec{a}`)}. Khẳng định nào đúng?`, opts, ans:good, keepOrder:true,
      hint:'Xét dấu của k để biết hướng (k dương: cùng hướng; k âm: ngược hướng) và lấy |k| để biết độ dài.',
      sol:`${m(`k = ${k}`)} nên ${k > 0 ? '<b>cùng</b>' : '<b>ngược</b>'} hướng với ${m('\\vec{a}')}; ${m(`|k| = ${M}`)} nên độ dài gấp ${M} lần. Đáp án: <b>${good}</b>.`});
  }
  const p = pick([6, 8, 10, 12]), k = pick([-3, -2, 2, 3, -0.5, 0.5]), q = Math.abs(k) * p, rev = k < 0;
  v9chk(Number.isInteger(q), 'g9a3');
  return QB({text:`Hai vectơ ${m('\\vec{a}, \\vec{b}')} cùng phương, ${m(`\\left|\\vec{a}\\right| = ${p}`)}, ${m(`\\left|\\vec{b}\\right| = ${q}`)} và ${rev ? '<b>ngược hướng</b>' : '<b>cùng hướng</b>'}. Biết ${m('\\vec{b} = k\\vec{a}')}, tìm ${m('k')}.`, tpl:`${m('k =')} [_]`, ans:[k],
    hint:'Tính |k| = |b| : |a|, rồi xét dấu của k theo hướng của hai vectơ.',
    sol:`${m(`|k| = \\dfrac{${q}}{${p}} = ${Math.abs(k)}`)}. Hai vectơ ${rev ? 'ngược' : 'cùng'} hướng nên ${m('k')} ${rev ? 'âm' : 'dương'}. Vậy ${tb(`k = ${String(k).replace('.', '{,}')}`)}.`});
};

/* Dạng B. Hệ thức trung điểm, trọng tâm */
const g9b = lv => {
  if(lv === 1){
    const kind = pick(['mid', 'midO']);
    if(kind === 'mid') return QB({text:`Cho đoạn thẳng ${m('AB')} có trung điểm ${m('I')}. Với điểm ${m('M')} bất kì, ${m(`${V('M', 'A')} + ${V('M', 'B')} = k\\,${V('M', 'I')}`)}. Tìm ${m('k')}.`, tpl:`${m('k =')} [_]`, ans:[2],
      hint:'Chèn điểm I: MA = MI + IA, MB = MI + IB, rồi dùng IA + IB = 0 vì I là trung điểm.',
      sol:`${m(`${V('M', 'A')} + ${V('M', 'B')} = (${V('M', 'I')} + ${V('I', 'A')}) + (${V('M', 'I')} + ${V('I', 'B')}) = 2${V('M', 'I')} + (${V('I', 'A')} + ${V('I', 'B')})`)} và ${m(`${V('I', 'A')} + ${V('I', 'B')} = \\vec{0}`)}. Vậy ${tb('k = 2')}.`});
    const O = pick(['O', 'P']);
    return QB({text:`Tam giác ${m('ABC')} có ${m('M')} là trung điểm của ${m('BC')}. Biết ${m(`${V('A', 'B')} + ${V('A', 'C')} = k\\,${V('A', 'M')}`)}. Tìm ${m('k')}.`, tpl:`${m('k =')} [_]`, ans:[2],
      hint:'Đây là hệ thức trung điểm với điểm A đóng vai trò điểm bất kì.',
      sol:`${m('M')} là trung điểm ${m('BC')} nên với mọi điểm ${m('A')}: ${m(`${V('A', 'B')} + ${V('A', 'C')} = 2${V('A', 'M')}`)}. Vậy ${tb('k = 2')}.`});
  }
  if(lv === 2){
    if(pick([0, 1]) === 0) return QB({text:`Tam giác ${m('ABC')} có trọng tâm ${m('G')}. Với điểm ${m('M')} bất kì, ${m(`${V('M', 'A')} + ${V('M', 'B')} + ${V('M', 'C')} = k\\,${V('M', 'G')}`)}. Tìm ${m('k')}.`, tpl:`${m('k =')} [_]`, ans:[3],
      hint:'Chèn điểm G vào từng vectơ, rồi dùng GA + GB + GC = 0 (G là trọng tâm).',
      sol:`${m(`${V('M', 'A')} + ${V('M', 'B')} + ${V('M', 'C')} = 3${V('M', 'G')} + (${V('G', 'A')} + ${V('G', 'B')} + ${V('G', 'C')}) = 3${V('M', 'G')}`)}. Vậy ${tb('k = 3')}.`});
    return QB({text:`Cho đoạn thẳng ${m('AB')}, ${m('I')} là trung điểm. Với điểm ${m('M')} bất kì, ${m(`${V('M', 'A')} + ${V('M', 'B')} + ${V('M', 'I')}`)} bằng ${m('k')} lần ${m(V('M', 'I'))}. Tìm ${m('k')}.`, tpl:`${m('k =')} [_]`, ans:[3],
      hint:'Dùng hệ thức trung điểm cho hai vectơ đầu, rồi cộng thêm vectơ thứ ba.',
      sol:`${m(`${V('M', 'A')} + ${V('M', 'B')} = 2${V('M', 'I')}`)}, cộng thêm ${m(V('M', 'I'))} được ${m(`3${V('M', 'I')}`)}. Vậy ${tb('k = 3')}.`});
  }
  const t = pick([0, 1]);
  if(t === 0) return QB({text:`Tam giác ${m('ABC')} có trọng tâm ${m('G')}. Biết ${m(`${V('A', 'B')} + ${V('A', 'C')} = k\\,${V('A', 'G')}`)}. Tìm ${m('k')}.`, tpl:`${m('k =')} [_]`, ans:[3],
    hint:'Gọi M là trung điểm BC: tổng hai vectơ bằng 2AM; sau đó dùng AG = (2/3)·AM.',
    sol:`${m(`${V('A', 'B')} + ${V('A', 'C')} = 2${V('A', 'M')}`)} và ${m(`${V('A', 'G')} = \\dfrac{2}{3}${V('A', 'M')}`)} nên ${m(`${V('A', 'M')} = \\dfrac{3}{2}${V('A', 'G')}`)}. Suy ra ${m(`${V('A', 'B')} + ${V('A', 'C')} = 3${V('A', 'G')}`)}. Vậy ${tb('k = 3')}.`});
  return QB({text:`Tam giác ${m('ABC')} có trọng tâm ${m('G')} và ${m('M')} là trung điểm của ${m('BC')}. Biết ${m(`${V('A', 'G')} = k\\,${V('A', 'M')}`)}. Tìm ${m('k')}.`, tpl:`${m('k =')} [F]`, ans:[{frac:[2, 3], mode:'simplest'}],
    hint:'Trọng tâm nằm trên trung tuyến AM và chia trung tuyến theo tỉ lệ 2 : 1 tính từ đỉnh A.',
    sol:`${m('AG = \\dfrac{2}{3}AM')} và hai vectơ cùng hướng nên ${m(`${V('A', 'G')} = \\dfrac{2}{3}${V('A', 'M')}`)}. Vậy ${tb('k = \\dfrac{2}{3}')}.`});
};

/* Dạng C. Hai vectơ cùng phương, tìm hệ số */
const g9c = lv => {
  const a = '\\vec{a}', b = '\\vec{b}';
  if(lv === 1){
    const mm = pick([2, 3, 4]), k = pick([2, 3, -2, -3]), n = mm * k;
    return QB({text:`Cho ${m(`\\vec{u} = ${mm}${a}`)} và ${m(`\\vec{v} = ${n < 0 ? '-' + (-n) : n}${a}`)}. Biết ${m('\\vec{v} = k\\vec{u}')}, tìm ${m('k')}.`, tpl:`${m('k =')} [_]`, ans:[k],
      hint:'Viết v = k·u rồi so sánh hệ số của vectơ a ở hai vế.',
      sol:`${m(`${n}${a} = k\\cdot ${mm}${a}`)} nên ${m(`${mm}k = ${n}`)}, suy ra ${tb(`k = ${k}`)}.`});
  }
  if(lv === 2){
    const x = pick([1, 2, 3]), y = pick([-1, -2, -3, 2]), k = pick([2, 3, -2, -3]);
    const u = comb9([fr9(x), fr9(y)], [a, b]), w = comb9([fr9(k * x), fr9(k * y)], [a, b]);
    return QB({text:`Cho ${m(`\\vec{u} = ${u}`)} và ${m(`\\vec{v} = ${w}`)} (${m('\\vec{a}, \\vec{b}')} không cùng phương). Biết ${m('\\vec{v} = k\\vec{u}')}, tìm ${m('k')}.`, tpl:`${m('k =')} [_]`, ans:[k],
      hint:'So sánh hệ số của a và hệ số của b ở hai vế; hai tỉ số phải bằng nhau.',
      sol:`${m(`${k * x} = k\\cdot ${x}`)} suy ra ${m(`k = ${k}`)}; kiểm tra hệ số của ${m(b)}: ${m(`${k} \\cdot (${y}) = ${k * y}`)} đúng. Vậy ${tb(`k = ${k}`)}.`});
  }
  const p = pick([2, 3, 4]), mm = pick([-3, -2, -1, 2, 3]), q = mm * p;
  const w = comb9([fr9(p), fr9(q)], [a, b]);
  return QB({text:`Cho hai vectơ ${m('\\vec{a}, \\vec{b}')} không cùng phương. Tìm ${m('m')} để ${m(`\\vec{u} = ${a} + m${b}`)} cùng phương với ${m(`\\vec{v} = ${w}`)}.`, tpl:`${m('m =')} [_]`, ans:[mm],
    hint:'Hai vectơ cùng phương khi v = k·u. So sánh hệ số của a trước để tìm k, rồi suy ra m từ hệ số của b.',
    sol:`${m(`\\vec{v} = k\\vec{u}`)} nên ${m(`${p}${a} ${q < 0 ? '-' : '+'} ${Math.abs(q)}${b} = k${a} + km${b}`)}. Suy ra ${m(`k = ${p}`)} và ${m(`km = ${q}`)}, tức ${m(`m = \\dfrac{${q}}{${p}}`)} = ${tb(mm)}.`});
};

/* Dạng D. Phân tích vectơ theo hai vectơ không cùng phương */
const g9d = lv => {
  const AB = V('A', 'B'), AC = V('A', 'C');
  const ask = (text, good, wrong, solText, hint) => {
    const opts = uniq9([good, ...wrong].map(c => m(comb9(c, [AB, AC]))), 'g9d');
    return QC({text, fig:figTri9(), opts, ans:m(comb9(good, [AB, AC])), keepOrder:false, hint, sol:solText + ` Đáp án: ${tb(comb9(good, [AB, AC]))}.`});
  };
  if(lv === 1){
    return ask(`Tam giác ${m('ABC')} có ${m('M')} là trung điểm của ${m('BC')}. Phân tích ${m(V('A', 'M'))} theo ${m(AB)} và ${m(AC)}.`, [fr9(1, 2), fr9(1, 2)], [[fr9(1), fr9(1)], [fr9(1, 2), fr9(-1, 2)], [fr9(2), fr9(2)]],
      `${m('M')} là trung điểm ${m('BC')} nên ${m(`${V('A', 'B')} + ${V('A', 'C')} = 2${V('A', 'M')}`)}, suy ra ${m(`${V('A', 'M')} = \\dfrac{1}{2}(${V('A', 'B')} + ${V('A', 'C')})`)}.`,
      'Dùng hệ thức trung điểm: AB + AC = 2·AM.');
  }
  if(lv === 2){
    const base = pick(['A', 'B', 'C']), o = ['A', 'B', 'C'].filter(x => x !== base), P = V(base, o[0]), Q = V(base, o[1]);
    const opts = uniq9([[fr9(1, 3), fr9(1, 3)], [fr9(2, 3), fr9(2, 3)], [fr9(1, 2), fr9(1, 2)], [fr9(1, 3), fr9(-1, 3)]].map(c => m(comb9(c, [P, Q]))), 'g9d2');
    const G = [(TRI9.A[0] + TRI9.B[0] + TRI9.C[0]) / 3, (TRI9.A[1] + TRI9.B[1] + TRI9.C[1]) / 3], bp = TRI9[base], p1 = TRI9[o[0]], p2 = TRI9[o[1]];
    v9chk(Math.abs(G[0] - bp[0] - (p1[0] - bp[0]) / 3 - (p2[0] - bp[0]) / 3) < 1e-9 && Math.abs(G[1] - bp[1] - (p1[1] - bp[1]) / 3 - (p2[1] - bp[1]) / 3) < 1e-9, 'g9d2');
    return QC({text:`Tam giác ${m('ABC')} có trọng tâm ${m('G')}. Phân tích ${m(V(base, 'G'))} theo ${m(P)} và ${m(Q)}.`, fig:figTri9(), opts, ans:m(comb9([fr9(1, 3), fr9(1, 3)], [P, Q])),
      hint:'Gọi M là trung điểm của cạnh đối diện; AG = (2/3)·AM và AM là trung điểm nên bằng nửa tổng hai vectơ.',
      sol:`Gọi ${m('M')} là trung điểm của cạnh đối diện với ${m(base)}. Khi đó ${m(`${V(base, 'G')} = \\dfrac{2}{3}${V(base, 'M')}`)} và ${m(`${V(base, 'M')} = \\dfrac{1}{2}(${P} + ${Q})`)}. Vậy ${tb(`${V(base, 'G')} = \\dfrac{1}{3}${P} + \\dfrac{1}{3}${Q}`)}.`});
  }
  const t = pick([[1, 3], [2, 3], [1, 4], [3, 4]]), tt = fr9(t[0], t[1]);
  const good = [fr9(-1, 2), fadd9(tt, fr9(-1, 2))];
  const wrongs = [[good[1], good[0]], [fr9(1, 2), fadd9(tt, fr9(-1, 2))], [fr9(-1, 2), fadd9(tt, fr9(1, 2))], [fr9(-1, 2), tt]];
  const M = [(TRI9.B[0] + TRI9.C[0]) / 2, (TRI9.B[1] + TRI9.C[1]) / 2], N = [t[0] / t[1] * TRI9.C[0], t[0] / t[1] * TRI9.C[1]];
  v9chk(Math.abs(N[0] - M[0] - (good[0][0] / good[0][1] * TRI9.B[0] + good[1][0] / good[1][1] * TRI9.C[0])) < 1e-9 && Math.abs(N[1] - M[1] - (good[0][0] / good[0][1] * TRI9.B[1] + good[1][0] / good[1][1] * TRI9.C[1])) < 1e-9, 'g9d3');
  const opts = uniq9([good, ...wrongs].map(c => m(comb9(c, [AB, AC]))), 'g9d3');
  return QC({text:`Tam giác ${m('ABC')}; ${m('M')} là trung điểm của ${m('BC')}; điểm ${m('N')} thuộc cạnh ${m('AC')} sao cho ${m(`${V('A', 'N')} = ${fstr9(tt)}${AC}`)}. Phân tích ${m(V('M', 'N'))} theo ${m(AB)} và ${m(AC)}.`, fig:figTri9([], [[(TRI9.B[0] + TRI9.C[0]) / 2, (TRI9.B[1] + TRI9.C[1]) / 2, 'M'], [N[0], N[1], 'N']]), opts, ans:m(comb9(good, [AB, AC])),
    hint:'Xuất phát từ A: MN = AN − AM. Viết AM theo AB, AC (trung điểm) và AN theo AC.',
    sol:`${m(`${V('M', 'N')} = ${V('A', 'N')} - ${V('A', 'M')} = ${fstr9(tt)}${AC} - \\dfrac{1}{2}(${AB} + ${AC})`)}. Gộp hệ số: ${tb(`${V('M', 'N')} = ${comb9(good, [AB, AC])}`)}.`});
};

lesson(5, 'vecto-tich-so', 'Bài 9. Tích của một số với một vectơ', 'Độ dài và hướng của k·a; hệ thức trung điểm, trọng tâm; hai vectơ cùng phương; phân tích vectơ theo hai vectơ không cùng phương.', [g9a, g9b, g9c, g9d]);
}

/* =====================================================================
   CHƯƠNG IV. VECTƠ – Bài 10. Vectơ trong mặt phẳng toạ độ (thầy yêu cầu 21/10/2026, /tron-bo)
   4 dạng × 3 mức: A toạ độ vectơ và phép toán · B trung điểm, trọng tâm, hình bình hành · C độ dài, cùng phương, thẳng hàng · D phân tích vectơ, điểm thoả hệ thức.
   Đáp án chọn trước (toạ độ nguyên); mỗi đề được kiểm lại bằng phép tính độc lập (t10chk).
   ===================================================================== */
{
const m = tm;
const t10chk = (ok, msg) => { if(!ok) throw new Error('t10: ' + msg); };
const nb = x => x < 0 ? `{${x}}` : `${x}`;          // số âm trong cặp số
const pn = x => x < 0 ? `(${x})` : `${x}`;          // số âm trong phép tính
const pt = (x, y) => `(${nb(x)};${nb(y)})`;
const nz = (lo, hi) => { let x = 0; while(x === 0) x = R(lo, hi); return x; };
const OV = (a, b) => `\\overrightarrow{${a}${b}}`;
const coef = (c, s) => c === 1 ? s : c === -1 ? '-' + s : `${c}${s}`;
const addTerm = (c, s) => (c < 0 ? ' - ' : ' + ') + (Math.abs(c) === 1 ? '' : Math.abs(c)) + s;
const pair = (x, y) => `${m(pt(x, y))}`;
const TRI10 = [[3, 4], [6, 8], [5, 12], [8, 15], [9, 12], [12, 16]];

/* Dạng A. Toạ độ vectơ và phép toán */
const g10a = lv => {
  if(lv === 1){
    const A = [R(-6, 6), R(-6, 6)], d = [nz(-7, 7), nz(-7, 7)], B = [A[0] + d[0], A[1] + d[1]];
    return QB({text:`Cho ${m(`A${pt(...A)}`)} và ${m(`B${pt(...B)}`)}. Tìm toạ độ của vectơ ${m(OV('A', 'B'))}.`, tpl:`${m(OV('A', 'B') + ' =')} ( [_] ; [_] )`, ans:[d[0], d[1]],
      hint:'Toạ độ vectơ AB bằng toạ độ điểm cuối B trừ toạ độ điểm đầu A: hoành độ trừ hoành độ, tung độ trừ tung độ.',
      sol:`${m(`${OV('A', 'B')} = (${B[0]} - ${pn(A[0])};\\ ${B[1]} - ${pn(A[1])})`)}. Vậy ${tb(`${OV('A', 'B')} = ${pt(d[0], d[1])}`)}.`});
  }
  if(lv === 2){
    const a = [nz(-5, 5), nz(-5, 5)], b = [nz(-5, 5), nz(-5, 5)], p = pick([2, 3, -2, -3]), q = pick([1, 2, -1, -2, 3]);
    const r = [p * a[0] + q * b[0], p * a[1] + q * b[1]];
    const ex = `${coef(p, '\\vec{a}')}${addTerm(q, '\\vec{b}')}`;
    return QB({text:`Cho ${m(`\\vec{a} = ${pt(...a)}`)} và ${m(`\\vec{b} = ${pt(...b)}`)}. Tìm toạ độ của ${m(`\\vec{u} = ${ex}`)}.`, tpl:`${m('\\vec{u} =')} ( [_] ; [_] )`, ans:r,
      hint:'Nhân số với từng toạ độ của vectơ, rồi cộng (hoặc trừ) các toạ độ cùng vị trí: hoành độ với hoành độ, tung độ với tung độ.',
      sol:`Hoành độ: ${m(`${p}\\cdot ${pn(a[0])} ${q < 0 ? '-' : '+'} ${Math.abs(q)}\\cdot ${pn(b[0])} = ${r[0]}`)}. Tung độ: ${m(`${p}\\cdot ${pn(a[1])} ${q < 0 ? '-' : '+'} ${Math.abs(q)}\\cdot ${pn(b[1])} = ${r[1]}`)}. Vậy ${tb(`\\vec{u} = ${pt(r[0], r[1])}`)}.`});
  }
  const a = [nz(-4, 4), nz(-4, 4)], b = [nz(-4, 4), nz(-4, 4)], c = [nz(-4, 4), nz(-4, 4)], p = pick([2, 3, -2]), q = pick([1, 2, -1]), s = pick([1, 2, 3]);
  const r = [p * a[0] - q * b[0] + s * c[0], p * a[1] - q * b[1] + s * c[1]];
  const ex = `${coef(p, '\\vec{a}')}${addTerm(-q, '\\vec{b}')}${addTerm(s, '\\vec{c}')}`;
  return QB({text:`Cho ${m(`\\vec{a} = ${pt(...a)},\\ \\vec{b} = ${pt(...b)},\\ \\vec{c} = ${pt(...c)}`)}. Tìm toạ độ của ${m(`\\vec{u} = ${ex}`)}.`, tpl:`${m('\\vec{u} =')} ( [_] ; [_] )`, ans:r,
    hint:'Tính từng tích số·vectơ trước, rồi cộng trừ các toạ độ cùng vị trí. Chú ý dấu khi có dấu trừ trước một vectơ.',
    sol:`Hoành độ: ${m(`${p}\\cdot ${pn(a[0])} ${q < 0 ? '+' : '-'} ${Math.abs(q)}\\cdot ${pn(b[0])} + ${s}\\cdot ${pn(c[0])} = ${r[0]}`)}. Tung độ: ${m(`${p}\\cdot ${pn(a[1])} ${q < 0 ? '+' : '-'} ${Math.abs(q)}\\cdot ${pn(b[1])} + ${s}\\cdot ${pn(c[1])} = ${r[1]}`)}. Vậy ${tb(`\\vec{u} = ${pt(r[0], r[1])}`)}.`});
};

/* Dạng B. Trung điểm, trọng tâm, hình bình hành */
const g10b = lv => {
  const P = () => [R(-7, 7), R(-7, 7)];
  if(lv === 1){
    if(pick([0, 1]) === 0){
      const I = P(), A = P(), B = [2 * I[0] - A[0], 2 * I[1] - A[1]];
      t10chk((A[0] + B[0]) / 2 === I[0] && (A[1] + B[1]) / 2 === I[1], 'b1a');
      return QB({text:`Cho ${m(`A${pt(...A)}`)} và ${m(`B${pt(...B)}`)}. Tìm toạ độ trung điểm ${m('I')} của đoạn ${m('AB')}.`, tpl:`${m('I')} ( [_] ; [_] )`, ans:I,
        hint:'Toạ độ trung điểm là trung bình cộng các toạ độ tương ứng của hai đầu mút.',
        sol:`${m(`x_I = \\dfrac{${A[0]} + ${pn(B[0])}}{2} = ${I[0]}`)}, ${m(`y_I = \\dfrac{${A[1]} + ${pn(B[1])}}{2} = ${I[1]}`)}. Vậy ${tb(`I${pt(...I)}`)}.`});
    }
    const I = P(), A = P(), B = [2 * I[0] - A[0], 2 * I[1] - A[1]];
    return QB({text:`Cho ${m(`A${pt(...A)}`)}, điểm ${m('I')}${m(pt(...I))} là trung điểm của ${m('AB')}. Tìm toạ độ điểm ${m('B')}.`, tpl:`${m('B')} ( [_] ; [_] )`, ans:B,
      hint:'I là trung điểm AB nên x_I = (x_A + x_B)/2; từ đó rút x_B = 2x_I − x_A, tương tự cho tung độ.',
      sol:`${m(`x_B = 2x_I - x_A = 2\\cdot ${pn(I[0])} - ${pn(A[0])} = ${B[0]}`)}, ${m(`y_B = 2y_I - y_A = 2\\cdot ${pn(I[1])} - ${pn(A[1])} = ${B[1]}`)}. Vậy ${tb(`B${pt(...B)}`)}.`});
  }
  if(lv === 2){
    const G = P(), A = P(), B = P(), C = [3 * G[0] - A[0] - B[0], 3 * G[1] - A[1] - B[1]];
    t10chk((A[0] + B[0] + C[0]) / 3 === G[0] && (A[1] + B[1] + C[1]) / 3 === G[1], 'b2');
    if(pick([0, 1]) === 0) return QB({text:`Cho tam giác ${m('ABC')} với ${m(`A${pt(...A)}`)}, ${m(`B${pt(...B)}`)}, ${m(`C${pt(...C)}`)}. Tìm toạ độ trọng tâm ${m('G')}.`, tpl:`${m('G')} ( [_] ; [_] )`, ans:G,
      hint:'Toạ độ trọng tâm là trung bình cộng toạ độ của ba đỉnh.',
      sol:`${m(`x_G = \\dfrac{${A[0]} + ${pn(B[0])} + ${pn(C[0])}}{3} = ${G[0]}`)}, ${m(`y_G = \\dfrac{${A[1]} + ${pn(B[1])} + ${pn(C[1])}}{3} = ${G[1]}`)}. Vậy ${tb(`G${pt(...G)}`)}.`});
    return QB({text:`Tam giác ${m('ABC')} có ${m(`A${pt(...A)}`)}, ${m(`B${pt(...B)}`)} và trọng tâm ${m(`G${pt(...G)}`)}. Tìm toạ độ đỉnh ${m('C')}.`, tpl:`${m('C')} ( [_] ; [_] )`, ans:C,
      hint:'Từ x_G = (x_A + x_B + x_C)/3 suy ra x_C = 3x_G − x_A − x_B; làm tương tự với tung độ.',
      sol:`${m(`x_C = 3\\cdot ${pn(G[0])} - ${pn(A[0])} - ${pn(B[0])} = ${C[0]}`)}, ${m(`y_C = 3\\cdot ${pn(G[1])} - ${pn(A[1])} - ${pn(B[1])} = ${C[1]}`)}. Vậy ${tb(`C${pt(...C)}`)}.`});
  }
  if(pick([0, 1]) === 0){
    let A, B, C;
    do { A = P(); B = P(); C = P(); } while((B[0] - A[0]) * (C[1] - A[1]) - (B[1] - A[1]) * (C[0] - A[0]) === 0);
    const D = [A[0] + C[0] - B[0], A[1] + C[1] - B[1]];
    t10chk(D[0] - A[0] === C[0] - B[0] && D[1] - A[1] === C[1] - B[1], 'b3a');
    return QB({text:`Cho ba điểm ${m(`A${pt(...A)}`)}, ${m(`B${pt(...B)}`)}, ${m(`C${pt(...C)}`)}. Tìm toạ độ điểm ${m('D')} để ${m('ABCD')} là hình bình hành.`, tpl:`${m('D')} ( [_] ; [_] )`, ans:D,
      hint:'ABCD là hình bình hành khi vectơ AD bằng vectơ BC (hai cạnh đối song song và bằng nhau, cùng hướng).',
      sol:`${m(`${OV('A', 'D')} = ${OV('B', 'C')}`)} nên ${m(`x_D - ${pn(A[0])} = ${pn(C[0])} - ${pn(B[0])}`)} và ${m(`y_D - ${pn(A[1])} = ${pn(C[1])} - ${pn(B[1])}`)}. Vậy ${tb(`D${pt(...D)}`)}.`});
  }
  const G = P(), M = P(), A = [3 * G[0] - 2 * M[0], 3 * G[1] - 2 * M[1]];
  t10chk((A[0] + 2 * M[0]) / 3 === G[0] && (A[1] + 2 * M[1]) / 3 === G[1], 'b3b');
  return QB({text:`Tam giác ${m('ABC')} có ${m(`A${pt(...A)}`)}, trọng tâm ${m(`G${pt(...G)}`)}. Gọi ${m('M')} là trung điểm của ${m('BC')}. Tìm toạ độ điểm ${m('M')}.`, tpl:`${m('M')} ( [_] ; [_] )`, ans:M,
    hint:'G nằm trên trung tuyến AM và AG = (2/3)AM, tức là vectơ AM = (3/2)·vectơ AG. Có thể dùng x_G = (x_A + 2x_M)/3.',
    sol:`${m(`G`)} chia trung tuyến theo tỉ lệ 2 : 1 nên ${m(`${OV('A', 'M')} = \\dfrac{3}{2}${OV('A', 'G')}`)}. ${m(`x_M = ${pn(A[0])} + \\dfrac{3}{2}(${pn(G[0])} - ${pn(A[0])}) = ${M[0]}`)}, ${m(`y_M = ${pn(A[1])} + \\dfrac{3}{2}(${pn(G[1])} - ${pn(A[1])}) = ${M[1]}`)}. Vậy ${tb(`M${pt(...M)}`)}.`});
};

/* Dạng C. Độ dài, cùng phương, thẳng hàng */
const g10c = lv => {
  if(lv === 1){
    const [p, q] = pick(TRI10), sw = pick([0, 1]), sx = pick([-1, 1]), sy = pick([-1, 1]);
    const d = sw ? [sx * q, sy * p] : [sx * p, sy * q], len = Math.hypot(d[0], d[1]);
    t10chk(Number.isInteger(len), 'c1');
    const A = [R(-6, 6), R(-6, 6)], B = [A[0] + d[0], A[1] + d[1]];
    return QB({text:`Cho ${m(`A${pt(...A)}`)} và ${m(`B${pt(...B)}`)}. Tính độ dài đoạn thẳng ${m('AB')}.`, tpl:`${m('AB =')} [_]`, ans:[len],
      hint:'Tính toạ độ vectơ AB = (x_B − x_A; y_B − y_A), rồi độ dài bằng căn của tổng hai bình phương.',
      sol:`${m(`${OV('A', 'B')} = ${pt(d[0], d[1])}`)}, nên ${m(`AB = \\sqrt{${pn(d[0])}^2 + ${pn(d[1])}^2} = \\sqrt{${d[0] * d[0] + d[1] * d[1]}}`)} = ${tb(len)}.`});
  }
  if(lv === 2){
    const p = nz(-4, 4), q = nz(-4, 4), t = pick([2, 3, -1, -2, -3]);
    const mm = t * p, s = t * q;
    return QB({text:`Cho ${m(`\\vec{a} = ${pt(p, q)}`)} và ${m(`\\vec{b} = (m;\\ ${s})`)}. Tìm ${m('m')} để hai vectơ ${m('\\vec{a}, \\vec{b}')} cùng phương.`, tpl:`${m('m =')} [_]`, ans:[mm],
      hint:'Hai vectơ cùng phương khi tồn tại số k để b = k·a; tìm k từ tung độ rồi suy ra m (hoặc dùng a₁b₂ − a₂b₁ = 0).',
      sol:`${m(`\\vec{b} = k\\vec{a}`)} nên ${m(`${s} = k\\cdot ${pn(q)}`)}, suy ra ${m(`k = ${t}`)}. Khi đó ${m(`m = ${t}\\cdot ${pn(p)}`)} = ${tb(mm)}.`});
  }
  if(pick([0, 1]) === 0){
    const A = [R(-5, 5), R(-5, 5)], d = [nz(-3, 3), nz(-3, 3)], t = pick([2, 3, -1, -2]);
    const B = [A[0] + d[0], A[1] + d[1]], C = [A[0] + t * d[0], A[1] + t * d[1]];
    t10chk((C[0] - A[0]) * d[1] - (C[1] - A[1]) * d[0] === 0, 'c3a');
    return QB({text:`Cho ${m(`A${pt(...A)}`)}, ${m(`B${pt(...B)}`)} và ${m(`C(m;\\ ${C[1]})`)}. Tìm ${m('m')} để ba điểm ${m('A, B, C')} thẳng hàng.`, tpl:`${m('m =')} [_]`, ans:[C[0]],
      hint:'Ba điểm thẳng hàng khi hai vectơ AB và AC cùng phương: AC = k·AB.',
      sol:`${m(`${OV('A', 'B')} = ${pt(d[0], d[1])}`)}, ${m(`${OV('A', 'C')} = (m - ${pn(A[0])};\\ ${C[1] - A[1]})`)}. ${m(`${OV('A', 'C')} = k${OV('A', 'B')}`)} cho ${m(`${C[1] - A[1]} = k\\cdot ${pn(d[1])}`)} nên ${m(`k = ${t}`)}. Suy ra ${m(`m - ${pn(A[0])} = ${t}\\cdot ${pn(d[0])}`)}, vậy ${tb(`m = ${C[0]}`)}.`});
  }
  const t = pick([2, 3, -1, -2]), d = [nz(-4, 4), nz(-3, 3)], xA = R(-5, 5);
  const A = [xA, -t * d[1]], B = [A[0] + d[0], A[1] + d[1]], M = A[0] + t * d[0];
  t10chk(A[1] + t * d[1] === 0, 'c3b');
  return QB({text:`Cho ${m(`A${pt(...A)}`)} và ${m(`B${pt(...B)}`)}. Điểm ${m('M(m;\\ 0)')} nằm trên trục hoành và thẳng hàng với ${m('A, B')}. Tìm ${m('m')}.`, tpl:`${m('m =')} [_]`, ans:[M],
    hint:'Viết AM = k·AB, dùng tung độ (M có tung độ 0) để tìm k, rồi suy ra hoành độ m.',
    sol:`${m(`${OV('A', 'B')} = ${pt(d[0], d[1])}`)}, ${m(`${OV('A', 'M')} = (m - ${pn(A[0])};\\ ${-A[1]})`)}. Từ ${m(`${-A[1]} = k\\cdot ${pn(d[1])}`)} được ${m(`k = ${t}`)}. Khi đó ${m(`m - ${pn(A[0])} = ${t}\\cdot ${pn(d[0])}`)}, vậy ${tb(`m = ${M}`)}.`});
};

/* Dạng D. Phân tích vectơ, điểm thoả hệ thức */
const g10d = lv => {
  if(lv === 1){
    const x = nz(-6, 6), y = nz(-6, 6);
    const ex = `${coef(x, '\\vec{i}')}${addTerm(y, '\\vec{j}')}`;
    return QB({text:`Trong mặt phẳng ${m('Oxy')} cho ${m('\\vec{i}, \\vec{j}')} là hai vectơ đơn vị trên hai trục. Biết ${m(`\\vec{u} = ${ex}`)}. Tìm toạ độ của ${m('\\vec{u}')}.`, tpl:`${m('\\vec{u} =')} ( [_] ; [_] )`, ans:[x, y],
      hint:'Nếu u = x·i + y·j thì u có toạ độ (x; y): hệ số của i là hoành độ, hệ số của j là tung độ.',
      sol:`Hệ số của ${m('\\vec{i}')} là ${x}, hệ số của ${m('\\vec{j}')} là ${y}. Vậy ${tb(`\\vec{u} = ${pt(x, y)}`)}.`});
  }
  if(lv === 2){
    let a, b;
    do { a = [nz(-3, 3), nz(-3, 3)]; b = [nz(-3, 3), nz(-3, 3)]; } while(a[0] * b[1] - a[1] * b[0] === 0);
    const x = nz(-3, 3), y = nz(-3, 3), c = [x * a[0] + y * b[0], x * a[1] + y * b[1]];
    const det = a[0] * b[1] - a[1] * b[0], X = (c[0] * b[1] - c[1] * b[0]) / det, Y = (a[0] * c[1] - a[1] * c[0]) / det;
    t10chk(X === x && Y === y, 'd2');
    return QB({text:`Cho ${m(`\\vec{a} = ${pt(...a)},\\ \\vec{b} = ${pt(...b)},\\ \\vec{c} = ${pt(...c)}`)}. Biết ${m('\\vec{c} = x\\vec{a} + y\\vec{b}')}. Tìm ${m('x, y')}.`, tpl:`${m('x =')} [_] ${m(';\\ y =')} [_]`, ans:[x, y],
      hint:'Viết c = x·a + y·b theo từng toạ độ để được hệ hai phương trình hai ẩn x, y, rồi giải hệ.',
      sol:`Hệ: ${m(`${a[0]}x ${b[0] < 0 ? '-' : '+'} ${Math.abs(b[0])}y = ${c[0]}`)} và ${m(`${a[1]}x ${b[1] < 0 ? '-' : '+'} ${Math.abs(b[1])}y = ${c[1]}`)}. Giải hệ được ${tb(`x = ${x}`)}, ${tb(`y = ${y}`)}. Thử lại: ${m(`${x}\\cdot ${pn(a[0])} + ${pn(y)}\\cdot ${pn(b[0])} = ${c[0]}`)}.`});
  }
  if(pick([0, 1]) === 0){
    const kk = pick([[1, 2], [2, 1], [1, 3], [2, 3], [3, 2]]), s = kk[0] + kk[1], A = [R(-6, 6), R(-6, 6)], e = [nz(-3, 3), nz(-3, 3)];
    const B = [A[0] + s * e[0], A[1] + s * e[1]], M = [A[0] + kk[1] * e[0], A[1] + kk[1] * e[1]];
    t10chk(kk[0] * (A[0] - M[0]) + kk[1] * (B[0] - M[0]) === 0 && kk[0] * (A[1] - M[1]) + kk[1] * (B[1] - M[1]) === 0, 'd3a');
    const lhs = `${kk[0] === 1 ? '' : kk[0]}${OV('M', 'A')} + ${kk[1] === 1 ? '' : kk[1]}${OV('M', 'B')} = \\vec{0}`;
    return QB({text:`Cho ${m(`A${pt(...A)}`)} và ${m(`B${pt(...B)}`)}. Tìm toạ độ điểm ${m('M')} thoả ${m(lhs)}.`, tpl:`${m('M')} ( [_] ; [_] )`, ans:M,
      hint:'Gọi M(x; y), viết toạ độ MA và MB rồi đặt từng toạ độ của vế trái bằng 0 để được hai phương trình.',
      sol:`Với ${m('M(x;\\ y)')}: hoành độ ${m(`${kk[0]}(${A[0]} - x) + ${kk[1]}(${pn(B[0])} - x) = 0`)} nên ${m(`x = \\dfrac{${kk[0]}\\cdot ${pn(A[0])} + ${kk[1]}\\cdot ${pn(B[0])}}{${s}} = ${M[0]}`)}; tung độ ${m(`y = \\dfrac{${kk[0]}\\cdot ${pn(A[1])} + ${kk[1]}\\cdot ${pn(B[1])}}{${s}} = ${M[1]}`)}. Vậy ${tb(`M${pt(...M)}`)}.`});
  }
  let A, B, C;
  do { A = [R(-5, 5), R(-5, 5)]; B = [R(-5, 5), R(-5, 5)]; C = [R(-5, 5), R(-5, 5)]; } while((B[0] - A[0]) * (C[1] - A[1]) - (B[1] - A[1]) * (C[0] - A[0]) === 0);
  const p = pick([2, 3, -1]), q = pick([2, -1, -2]), D = [A[0] + p * (B[0] - A[0]) + q * (C[0] - A[0]), A[1] + p * (B[1] - A[1]) + q * (C[1] - A[1])];
  const ex = `${coef(p, OV('A', 'B'))}${addTerm(q, OV('A', 'C'))}`;
  return QB({text:`Cho ${m(`A${pt(...A)}`)}, ${m(`B${pt(...B)}`)}, ${m(`C${pt(...C)}`)}. Tìm toạ độ điểm ${m('D')} thoả ${m(`${OV('A', 'D')} = ${ex}`)}.`, tpl:`${m('D')} ( [_] ; [_] )`, ans:D,
    hint:'Tính toạ độ AB và AC, tính vectơ vế phải, rồi dùng toạ độ AD = (x_D − x_A; y_D − y_A).',
    sol:`${m(`${OV('A', 'B')} = ${pt(B[0] - A[0], B[1] - A[1])}`)}, ${m(`${OV('A', 'C')} = ${pt(C[0] - A[0], C[1] - A[1])}`)} nên ${m(`${OV('A', 'D')} = ${pt(D[0] - A[0], D[1] - A[1])}`)}. Do đó ${m(`x_D = ${A[0]} + ${pn(D[0] - A[0])}`)} và ${m(`y_D = ${A[1]} + ${pn(D[1] - A[1])}`)}. Vậy ${tb(`D${pt(...D)}`)}.`});
};

lesson(5, 'vecto-toa-do', 'Bài 10. Vectơ trong mặt phẳng toạ độ', 'Toạ độ của vectơ và các phép toán; toạ độ trung điểm, trọng tâm, đỉnh hình bình hành; độ dài, hai vectơ cùng phương, ba điểm thẳng hàng; phân tích vectơ.', [g10a, g10b, g10c, g10d]);
}

})();
