/* =====================================================================
   CORE – hàm tiện ích, bộ dựng câu hỏi (QB, QC, QCmp) và sổ đăng ký lớp.
   ===================================================================== */
const App={grades:[],
  // Mỗi file data/<lớp>.js gọi App.addGrade({...}) một lần rồi dùng G.lesson(...) để thêm bài.
  addGrade(cfg){const g={subject:'Toán',book:'',topics:[],...cfg,lessons:[]};
    g.lesson=(t,id,name,desc,gens)=>{if(g.lessons.some(l=>l.id===id))console.warn('Trùng mã bài',g.id,id);g.lessons.push({t,id,name,desc,gens})};
    App.grades=App.grades.filter(x=>x.id!==g.id);App.grades.push(g);return g}};
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const R=(a,b)=>a+Math.floor(Math.random()*(b-a+1));
const pick=a=>a[Math.floor(Math.random()*a.length)];
const shuffle=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
const gcd=(a,b)=>b?gcd(b,a%b):Math.abs(a);
const lcm=(a,b)=>a/gcd(a,b)*b;
const fmt=n=>String(n).replace(/\B(?=(\d{3})+(?!\d))/g,' ');
const F=(n,d)=>`<span class="fr"><span>${n}</span><span>${d}</span></span>`;
const Fs=(n,d)=>{const g=gcd(n,d);return F(n/g,d/g)};
const NAMES=['An','Bình','Mai','Nam','Lan','Minh','Hoa','Khôi','Ngọc','Phúc','Hà','Tùng'];
const WORD=['không','một','hai','ba','bốn','năm','sáu','bảy','tám','chín','mười'];
const HANG=['đơn vị','chục','trăm','nghìn','chục nghìn','trăm nghìn','triệu','chục triệu','trăm triệu'];
const LOP=i=>i<3?'đơn vị':i<6?'nghìn':'triệu';
const digitsOf=n=>String(n).split('').reverse().map(Number);
const randDigits=len=>{let s=String(R(1,9));for(let i=1;i<len;i++)s+=R(0,9);return +s};
const uniqPos=n=>{const d=digitsOf(n),c={};d.forEach(x=>c[x]=(c[x]||0)+1);return d.map((_,i)=>i).filter(i=>c[d[i]]===1&&d[i]!==0)};
const cmp=(a,b)=>a<b?'<':a>b?'>':'=';
const joinVa=a=>a.length>1?a.slice(0,-1).join(', ')+' và '+a[a.length-1]:a[0];
const roman=n=>{const m=[[1000,'M'],[900,'CM'],[500,'D'],[400,'CD'],[100,'C'],[90,'XC'],[50,'L'],[40,'XL'],[10,'X'],[9,'IX'],[5,'V'],[4,'IV'],[1,'I']];let s='';for(const[v,r]of m)while(n>=v){s+=r;n-=v}return s};
const store={get(k){try{return JSON.parse(localStorage.getItem(k))}catch(e){return null}},set(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}};

/* ---------- Bộ dựng câu hỏi ---------- */
// Điền ô trống: tpl dùng [_] (ô số/chữ) và [F] (ô phân số). ans khớp theo thứ tự.
const QB=o=>({kind:'blanks',...o});
// Chọn đáp án: opts chứa ans; mặc định trộn thứ tự.
const QC=o=>{const opts=[...new Set(o.opts)];const arr=o.keepOrder?opts:shuffle(opts);return {kind:'choice',...o,opts:arr,correct:arr.indexOf(o.ans)}};
const QCmp=(text,left,right,a,b,extra={})=>QC({text,expr:`<span class="big">${left} <span style="color:var(--primary)">?</span> ${right}</span>`,opts:['<','>','='],ans:cmp(a,b),keepOrder:true,compact:true,...extra});

/* ---------- Công thức toán bằng LaTeX (MathJax vẽ) – dùng cho lớp 6 trở lên ----------
   tm('x^2+1')  → công thức trong dòng  \( … \)
   td('…')      → công thức đứng riêng một dòng \[ … \]
   tb('5')      → đáp án in đậm trong lời giải
   tpoly([2,'x'],[-3,'y'],[5,''])  → "2x-3y+5" (bỏ hệ số 1, bỏ hạng tử 0)
   tfrac(-6,4) → "-\dfrac{3}{2}" (tự rút gọn)   tf(a,b) → \dfrac{a}{b}
   tsys(['x+y=3','x-y=1'], true) → hệ có nhãn (1), (2)
   Ô trống [_] phải nằm NGOÀI công thức: `${tm('x=')}[_]`                                     */
const tm = s => `\\(${s}\\)`;
const td = s => `<span class="mxd">\\[${s}\\]</span>`;
const tb = s => `<b class="ans">\\(\\mathbf{${s}}\\)</b>`;
const tp = n => n < 0 ? `(${n})` : String(n);
function tpoly(...ts){ let s=''; for(const [c,v] of ts){ if(!c) continue; const a=Math.abs(c), body=v?(a===1?'':a)+v:String(a);
  s += s ? (c<0?' - ':' + ')+body : (c<0?'-':'')+body; } return s || '0'; }
const tf = (a,b) => `\\dfrac{${a}}{${b}}`;
const tfrac = (p,q) => { if(q<0){p=-p;q=-q} const g=gcd(p,q)||1; p/=g; q/=g; return q===1 ? String(p) : (p<0?'-':'')+tf(Math.abs(p),q); };
const tsys = (rows, lab) => `\\begin{cases}${rows.map((r,i)=>lab?`${r} & (${i+1})`:r).join(' \\\\ ')}\\end{cases}`;
const tdec = n => String(+n.toFixed(4)).replace('.', '{,}');
