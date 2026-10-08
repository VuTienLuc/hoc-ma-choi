/* =====================================================================
   DỮ LIỆU LỚP 10 – Toán, Kết nối tri thức
   Chương I. Mệnh đề và tập hợp (Bài 1 Mệnh đề · Bài 2 Tập hợp và các phép toán trên tập hợp)
   Chương II. Bất phương trình và hệ bất phương trình bậc nhất hai ẩn (Bài 3 · Bài 4)
   Chương III. Hệ thức lượng trong tam giác (Bài 5 · Bài 6)
   Mỗi dạng bài: lv => câu hỏi. Chọn đáp án trước rồi mới dựng đề.
   Công thức viết LaTeX: tm() trong dòng, td() riêng dòng, tb() đáp án đậm (xem core.js).
   ===================================================================== */
(() => {
const G = App.addGrade({
  id: 'lop10', name: 'Lớp 10', subject: 'Toán', book: 'Kết nối tri thức',
  topics: [ {id:1, hk:1, name:'Mệnh đề và tập hợp'}, {id:2, hk:1, name:'Bất phương trình và hệ bất phương trình bậc nhất hai ẩn'}, {id:3, hk:1, name:'Hệ thức lượng trong tam giác'} ],
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
  return QC({text:`Tam giác có độ dài ba cạnh ${tm(`${c},\\ ${b},\\ ${a}`)} là`, opts:K, ans:K[ans], keepOrder:true,
    hint:`Góc lớn nhất đối diện cạnh lớn nhất ${tm('a')}. Xét dấu ${tm('b^2 + c^2 - a^2')} (dấu của ${tm('\\cos A')}): dương → nhọn, bằng 0 → vuông, âm → tù.`,
    sol:`Cạnh lớn nhất là ${tm(a)}: ${tm(`${b}^2 + ${c}^2 - ${a}^2 = ${d}`)} ${d>0?'> 0':d===0?'= 0':'< 0'} nên góc lớn nhất ${d>0?'nhọn':d===0?'vuông':'tù'}. Đó là <b>${K[ans].toLowerCase()}</b>.`});
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
lesson(3,'he-thuc-luong-tam-giac','Bài 6. Hệ thức lượng trong tam giác','Định lí côsin, định lí sin; tính góc, nhận dạng tam giác; diện tích, bán kính R, r; bài toán thực tế.',[g6a,g6b,g6c,g6d,g6e]);
lesson(3,'on-tap-c3','Ôn tập chương III','Tổng hợp: giá trị lượng giác, định lí côsin, định lí sin, diện tích, bài toán thực tế.',[g5b,g5c,g6a,g6c,g6d,g6e]);
}

/* =====================================================================
   CHỦ ĐỀ 4. ÔN TẬP GIỮA HỌC KÌ I (Chương I + II + III) – có hình vẽ
   Câu hỏi lấy từ ngân hàng data/lop10-giua-ki-bank.js (GK1): cùng ngân hàng với 5 đề ôn tập giữa kì và đề in của giáo viên.
   Mỗi dạng = lv => câu hỏi; mức 1 → 3 chuyển sang loại câu khó hơn. Đáp án luôn tính trước khi dựng đề (trong GK1).
   ===================================================================== */
{
G.topics.push({id:4, hk:1, name:'Ôn tập giữa học kì I'});
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
lesson(4, 'gk-menh-de-tap-hop', 'Ôn giữa kì · Chương I. Mệnh đề và tập hợp', 'Mệnh đề, phủ định, phép toán tập hợp, liệt kê tập hợp, đếm bằng sơ đồ Venn.', [gkA, gkB, gkC, gkD], {introTitle:INTRO_T, intro:[
  K('Mệnh đề và phủ định', `Mệnh đề là câu khẳng định xác định được <b>đúng</b> hoặc <b>sai</b>. Phủ định của ${tm('\\forall')} là ${tm('\\exists')} và ngược lại, đồng thời phủ định phần sau (${tm('\\gt \\to \\le')}, ${tm('\\lt \\to \\ge')}).`, 'Câu hỏi, câu cảm thán, câu mệnh lệnh, câu còn biến chưa gán giá trị thì <b>không</b> phải mệnh đề.', `Phủ định của ${tm('\\gt')} là ${tm('\\le')} (không phải ${tm('\\lt')}).`),
  K('Tập hợp và phép toán', `${tm('A \\cap B')}: phần chung; ${tm('A \\cup B')}: gộp lại; ${tm('A \\setminus B')}: thuộc ${tm('A')} nhưng không thuộc ${tm('B')}. Tập hợp có ${tm('n')} phần tử có ${tm('2^n')} tập con.`, 'Khoảng/đoạn: ngoặc <b>tròn</b> không lấy đầu mút, ngoặc <b>vuông</b> lấy đầu mút.', 'Vẽ hai tập hợp lên trục số trước khi tìm giao, hợp, hiệu.'),
  K('Đếm bằng sơ đồ Venn', `${tm('n(A \\cup B) = n(A) + n(B) - n(A \\cap B)')}. Số phần tử chỉ thuộc ${tm('A')} là ${tm('n(A) - n(A \\cap B)')}.`, 'Đừng cộng hai nhóm mà quên trừ phần giao (đếm hai lần).', 'Điền số vào từng miền của sơ đồ Venn rồi kiểm tra tổng bằng sĩ số lớp.')]});
lesson(4, 'gk-bpt-he-bpt', 'Ôn giữa kì · Chương II. Bất phương trình và hệ bất phương trình bậc nhất hai ẩn', 'Nghiệm, miền nghiệm, đọc hình miền nghiệm của hệ, bài toán tối ưu (chi phí, lợi nhuận).', [gkE, gkF, gkG, gkH], {introTitle:INTRO_T, intro:[
  K('Nghiệm và miền nghiệm', `Cặp số ${tm('(x_0;\\ y_0)')} là nghiệm khi thay vào cho bất đẳng thức đúng. Miền nghiệm là nửa mặt phẳng bờ ${tm('d: ax + by = c')}; lấy điểm thử (thường là gốc ${tm('O')}) để biết phía nào.`, `Dấu ngặt (${tm('\\lt')} hoặc ${tm('\\gt')}): bờ vẽ nét <b>đứt</b>, không thuộc miền nghiệm. Có dấu bằng: nét <b>liền</b>.`, 'Điểm thử không nằm trên đường thẳng thì tính rất nhanh; gốc toạ độ là lựa chọn đầu tiên.'),
  K('Hệ bất phương trình và hình vẽ', 'Miền nghiệm của hệ là phần chung của các miền nghiệm. Theo quy ước sách giáo khoa, phần <b>không bị gạch</b> là miền nghiệm.', 'Đổi dấu một bất phương trình là chuyển sang phía còn lại của đường thẳng.', 'Với mỗi đường thẳng trong hình, thử một điểm rồi loại dần các phương án.'),
  K('Bài toán tối ưu', `Lập ràng buộc, vẽ miền nghiệm, tìm <b>các đỉnh</b>, thay vào ${tm('F = ax + by')}: giá trị lớn nhất/nhỏ nhất đạt tại một đỉnh.`, `Đọc kỹ “tối đa” (${tm('\\le')}) và “ít nhất” (${tm('\\ge')}).`, `Lập bảng giá trị ${tm('F')} tại từng đỉnh rồi chọn lớn nhất/nhỏ nhất.`)]});
lesson(4, 'gk-he-thuc-luong', 'Ôn giữa kì · Chương III. Hệ thức lượng trong tam giác', 'Giá trị lượng giác, định lí côsin – sin, nhận dạng tam giác, diện tích, bài toán đo đạc (có hình).', [gkI, gkJ, gkK, gkL], {introTitle:INTRO_T, intro:[
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
lesson(4, 'on-tap-giua-ki-1', 'Ôn tập giữa học kì I', 'Tổng hợp Chương I – II – III: mệnh đề và tập hợp, miền nghiệm và hệ bất phương trình, hệ thức lượng; có hình vẽ.', [gkT1, gkT2, gkT3, gkT4, gkT5, gkT6], {introTitle:INTRO_T, intro:[
  K('Chương I', `Phủ định ${tm('\\forall \\leftrightarrow \\exists')} và đổi dấu so sánh; ${tm('\\cap, \\cup, \\setminus')} trên trục số; ${tm('n(A \\cup B) = n(A) + n(B) - n(A \\cap B)')}.`, 'Xét kĩ đầu mút (ngoặc tròn/vuông).', 'Vẽ trục số hoặc sơ đồ Venn trước khi tính.'),
  K('Chương II', 'Điểm thử xác định phía miền nghiệm; nét đứt ứng với dấu ngặt; tối ưu: tính giá trị tại các đỉnh miền nghiệm.', `Đọc kĩ “tối đa/ít nhất” để chọn ${tm('\\le')} hay ${tm('\\ge')}.`, 'Gạch bỏ phần không thoả mãn để thấy miền nghiệm.'),
  K('Chương III', `${tm('a^2 = b^2 + c^2 - 2bc\\cos A')}, ${tm('\\dfrac{a}{\\sin A} = 2R')}, ${tm('S = \\dfrac{1}{2}bc\\sin A')}, công thức Heron.`, 'Góc tù: côsin, tang âm.', 'Bài đo đạc: vẽ tam giác, dùng góc ngoài để tìm góc ở ngọn.')]});
}
})();
