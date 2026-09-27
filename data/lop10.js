/* =====================================================================
   DỮ LIỆU LỚP 10 – Toán, Kết nối tri thức
   Chương I. Mệnh đề và tập hợp (Bài 1 Mệnh đề · Bài 2 Tập hợp và các phép toán trên tập hợp)
   Chương II. Bất phương trình và hệ bất phương trình bậc nhất hai ẩn (Bài 3 · Bài 4)
   Mỗi dạng bài: lv => câu hỏi. Chọn đáp án trước rồi mới dựng đề.
   Công thức viết LaTeX: tm() trong dòng, td() riêng dòng, tb() đáp án đậm (xem core.js).
   ===================================================================== */
(() => {
const G = App.addGrade({
  id: 'lop10', name: 'Lớp 10', subject: 'Toán', book: 'Kết nối tri thức',
  topics: [ {id:1, hk:1, name:'Mệnh đề và tập hợp'}, {id:2, hk:1, name:'Bất phương trình và hệ bất phương trình bậc nhất hai ẩn'} ],
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
})();
