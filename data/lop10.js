/* =====================================================================
   DỮ LIỆU LỚP 10 – Toán, Kết nối tri thức
   Chương I. Mệnh đề và tập hợp (Bài 1 Mệnh đề · Bài 2 Tập hợp và các phép toán trên tập hợp)
   Mỗi dạng bài: lv => câu hỏi. Chọn đáp án trước rồi mới dựng đề.
   Công thức viết LaTeX: tm() trong dòng, td() riêng dòng, tb() đáp án đậm (xem core.js).
   ===================================================================== */
(() => {
const G = App.addGrade({
  id: 'lop10', name: 'Lớp 10', subject: 'Toán', book: 'Kết nối tri thức',
  topics: [ {id:1, hk:1, name:'Mệnh đề và tập hợp'} ],
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
})();
