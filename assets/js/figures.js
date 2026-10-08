/* ---------- Hình SVG ---------- */
const P=(cx,cy,r,deg)=>[cx+r*Math.cos(deg*Math.PI/180),cy-r*Math.sin(deg*Math.PI/180)];
function protractorSVG(theta,{interactive=false}={}){
  const cx=170,cy=178,r=140;let s=`<svg viewBox="-12 0 364 205" role="img" aria-label="Thước đo góc và góc AOB" class="${interactive?'rot':''}">`;
  s+=`<path class="sv-prot" d="M${cx-r} ${cy} A${r} ${r} 0 0 1 ${cx+r} ${cy} Z"/>`;
  for(let d=0;d<=180;d+=5){const L=d%10?7:13;const[a,b]=P(cx,cy,r,d),[c,e]=P(cx,cy,r-L,d);s+=`<line class="sv-tick" x1="${a}" y1="${b}" x2="${c}" y2="${e}" stroke-width="${d%10?1.2:2}"/>`;
    if(d%10===0){const[x,y]=P(cx,cy,r-25,d);s+=`<text class="sv-muted" x="${x}" y="${y+4-(d===0||d===180?12:0)}" font-size="10.5" text-anchor="middle">${d}</text>`}}
  const[ax,ay]=P(cx,cy,158,0),[bx,by]=P(cx,cy,158,theta);
  s+=`<line class="sv-ray" x1="${cx}" y1="${cy}" x2="${ax}" y2="${ay}"/>`;
  s+=`<line class="sv-ray ${interactive?'mov':''}" data-ray x1="${cx}" y1="${cy}" x2="${bx}" y2="${by}"/>`;
  if(interactive)s+=`<circle class="sv-handle" data-handle cx="${bx}" cy="${by}" r="16"/>`;
  s+=`<circle cx="${cx}" cy="${cy}" r="5" class="sv-dot"/><text class="sv-txt" x="${cx-6}" y="${cy+22}" font-size="17">O</text><text class="sv-txt" x="${ax-4}" y="${ay+22}" font-size="17">A</text>`;
  const[lx,ly]=P(cx,cy,176,theta);s+=`<text class="sv-txt" data-lb x="${lx-6}" y="${ly+6}" font-size="17">B</text></svg>`;return s;
}
function angleSVG(theta){
  const rot=theta>=170?0:R(-12,12),cx=theta>100?150:90,cy=theta>150?120:165,L=120;
  const[ax,ay]=P(cx,cy,L,rot),[bx,by]=P(cx,cy,L,rot+theta);
  let mark;if(theta===90){const[p1x,p1y]=P(cx,cy,20,rot),[p3x,p3y]=P(cx,cy,20,rot+90),[p2x,p2y]=P(cx,cy,20*Math.SQRT2,rot+45);mark=`<path class="sv-ink" stroke-width="2.5" d="M${p1x} ${p1y} L${p2x} ${p2y} L${p3x} ${p3y}"/>`}
  else{const[s1,s2]=P(cx,cy,28,rot),[e1,e2]=P(cx,cy,28,rot+theta);mark=`<path class="sv-ink" stroke-width="2.5" d="M${s1} ${s2} A28 28 0 0 0 ${e1} ${e2}"/>`}
  return `<svg viewBox="0 0 300 200" role="img" aria-label="Hình một góc"><line class="sv-ray" x1="${cx}" y1="${cy}" x2="${ax}" y2="${ay}"/><line class="sv-ray" x1="${cx}" y1="${cy}" x2="${bx}" y2="${by}"/>${mark}<circle cx="${cx}" cy="${cy}" r="5" class="sv-dot"/></svg>`;
}
function fracSVG(n,k,shape,interactive){
  let s=`<svg viewBox="0 0 320 ${shape==='circle'?240:(n>6&&n%2===0?200:130)}" role="img" aria-label="Hình chia thành ${n} phần bằng nhau" class="${interactive?'interactive':''}">`;
  if(shape==='circle'){const cx=160,cy=120,r=100;for(let i=0;i<n;i++){const a1=-90+360*i/n,a2=-90+360*(i+1)/n;const x1=cx+r*Math.cos(a1*Math.PI/180),y1=cy+r*Math.sin(a1*Math.PI/180),x2=cx+r*Math.cos(a2*Math.PI/180),y2=cy+r*Math.sin(a2*Math.PI/180);
    s+=`<path class="sv-part ${i<k?'on':''}" data-i="${i}" d="M${cx} ${cy} L${x1} ${y1} A${r} ${r} 0 0 1 ${x2} ${y2} Z"/>`}}
  else{const rows=n>6&&n%2===0?2:1,cols=n/rows,w=Math.min(60,300/cols),h=rows===2?85:100,x0=(320-w*cols)/2;let i=0;
    for(let rr=0;rr<rows;rr++)for(let c=0;c<cols;c++,i++)s+=`<rect class="sv-part ${i<k?'on':''}" data-i="${i}" x="${x0+c*w}" y="${14+rr*h}" width="${w}" height="${h}"/>`}
  return s+'</svg>';
}
function barSVG(labels,vals,step,unit){
  const W=440,H=260,x0=52,y0=215,top=20,max=Math.ceil(Math.max(...vals)/step)*step+step,sc=(y0-top)/max,bw=46,gap=(W-x0-20)/labels.length;
  let s=`<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Biểu đồ cột">`;
  for(let v=0;v<=max;v+=step){const y=y0-v*sc;s+=`<line class="sv-grid" x1="${x0}" y1="${y}" x2="${W-10}" y2="${y}"/><text class="sv-muted" x="${x0-8}" y="${y+5}" font-size="13" text-anchor="end">${v}</text>`}
  labels.forEach((l,i)=>{const x=x0+gap*i+(gap-bw)/2,h=vals[i]*sc;s+=`<rect class="sv-bar" x="${x}" y="${y0-h}" width="${bw}" height="${h}" rx="3"/><text class="sv-txt" x="${x+bw/2}" y="${y0+24}" font-size="15" text-anchor="middle">${l}</text>`});
  s+=`<line class="sv-ink" stroke-width="2.5" x1="${x0}" y1="${y0}" x2="${W-10}" y2="${y0}"/><line class="sv-ink" stroke-width="2.5" x1="${x0}" y1="${top-6}" x2="${x0}" y2="${y0}"/><text class="sv-muted" x="${x0-44}" y="${top-8}" font-size="12">(${unit})</text></svg>`;return s;
}
/* Tam giác vuông tại n[0]: n[0] góc dưới trái, n[1] ở trên, n[2] bên phải.
   w = độ dài cạnh n[0]n[2] (nằm ngang), h = độ dài cạnh n[0]n[1] (thẳng đứng) – chỉ dùng để vẽ đúng tỉ lệ.
   ab, ac, bc: nhãn cạnh; aB, aC: nhãn góc tại n[1], n[2] (true = chỉ vẽ cung, không ghi chữ). */
function rtTriSVG(o={}){
  const n=o.n||['A','B','C'], ratio=Math.max(.4,Math.min(2.6,(o.w||4)/(o.h||3)));
  let w,h; if(ratio>230/150){w=230;h=230/ratio}else{h=150;w=150*ratio}
  const Ax=Math.max(78,(340-w)/2), Ay=182, By=Ay-h, Cx=Ax+w, t=Math.atan2(h,w)*180/Math.PI;
  const T=(x,y,s,a='middle',fs=16)=>`<text class="sv-txt" x="${x}" y="${y}" font-size="${fs}" text-anchor="${a}">${s}</text>`;
  const arc=(cx,cy,a1,a2,lab,anc)=>{const r=26,[x1,y1]=P(cx,cy,r,a1),[x2,y2]=P(cx,cy,r,a2),[lx,ly]=P(cx,cy,r+14,(a1+a2)/2);
    return `<path class="sv-tick" stroke-width="2.5" fill="none" d="M${x1} ${y1} A${r} ${r} 0 0 0 ${x2} ${y2}"/>`+(lab&&lab!==true?T(lx+(anc==='start'?2:-2),ly+(anc==='start'?10:0),lab,anc,14):'')};
  let s=`<svg viewBox="0 0 340 226" role="img" aria-label="Tam giác ${n.join('')} vuông tại ${n[0]}">`;
  s+=`<path class="sv-ink" stroke-width="3" stroke-linejoin="round" d="M${Ax} ${Ay} L${Ax} ${By} L${Cx} ${Ay} Z"/><path class="sv-ink" stroke-width="2" d="M${Ax} ${Ay-14} h14 v14"/>`;
  if(o.aC!=null)s+=arc(Cx,Ay,180-t,180,o.aC,'end');
  if(o.aB!=null)s+=arc(Ax,By,270,360-t,o.aB,'start');
  if(o.ab)s+=T(Ax-10,(Ay+By)/2+5,o.ab,'end');
  if(o.ac)s+=T((Ax+Cx)/2,Ay+26,o.ac);
  if(o.bc){const L=Math.hypot(w,h);s+=T((Ax+Cx)/2+h/L*14,(Ay+By)/2-w/L*14,o.bc,'start')}
  return s+T(Ax-16,Ay+20,n[0],'middle',19)+T(Ax,By-10,n[1],'middle',19)+T(Cx+16,Ay+6,n[2],'middle',19)+'</svg>';
}
/* Mặt phẳng toạ độ Oxy có đường thẳng và phần bị gạch (KNTT: miền nghiệm là phần KHÔNG bị gạch).
   o.x=[xmin,xmax], o.y=[ymin,ymax] (số nguyên, chứa 0)
   o.lines=[[a,b,c,dashed,label]]  vẽ đường ax+by=c (dashed: bờ không thuộc miền nghiệm)
   o.hatch=[[a,b,c]]               gạch phần ax+by > c
   o.pts=[[x,y,label]]             chấm điểm có tên · o.unit: 1 ô = unit đơn vị (nhãn trục nhân unit; toạ độ vẽ theo ô)                                              */
let _hatchN=0;
function planeSVG(o={}){
  const [x0,x1]=o.x||[-1,6],[y0,y1]=o.y||[-1,6],u=Math.min(320/(x1-x0),320/(y1-y0)),W=(x1-x0)*u+40,H=(y1-y0)*u+40;
  const un=o.unit||1, X=x=>20+(x-x0)*u, Y=y=>20+(y1-y)*u, id='hx'+(++_hatchN), st=(x1-x0)>14||(y1-y0)>14?2:1;
  const rect=[[x0,y0],[x1,y0],[x1,y1],[x0,y1]];
  const clip=(poly,a,b,c)=>{const out=[],f=p=>a*p[0]+b*p[1]-c;for(let i=0;i<poly.length;i++){const P=poly[i],Q=poly[(i+1)%poly.length],fp=f(P),fq=f(Q);
    if(fp>=0)out.push(P);if((fp>=0)!==(fq>=0)){const t=fp/(fp-fq);out.push([P[0]+t*(Q[0]-P[0]),P[1]+t*(Q[1]-P[1])])}}return out};
  const seg=(a,b,c)=>{const pts=[];const add=(x,y)=>{if(x>=x0-1e-9&&x<=x1+1e-9&&y>=y0-1e-9&&y<=y1+1e-9&&!pts.some(p=>Math.hypot(p[0]-x,p[1]-y)<1e-6))pts.push([x,y])};
    if(b){add(x0,(c-a*x0)/b);add(x1,(c-a*x1)/b)} if(a){add((c-b*y0)/a,y0);add((c-b*y1)/a,y1)} return pts.slice(0,2)};
  let s=`<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Mặt phẳng toạ độ Oxy" style="max-height:380px"><defs><pattern id="${id}" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="7" class="sv-hatch"/></pattern></defs>`;
  for(let x=x0;x<=x1;x++)s+=`<line class="sv-grid" x1="${X(x)}" y1="${Y(y0)}" x2="${X(x)}" y2="${Y(y1)}"/>`;
  for(let y=y0;y<=y1;y++)s+=`<line class="sv-grid" x1="${X(x0)}" y1="${Y(y)}" x2="${X(x1)}" y2="${Y(y)}"/>`;
  (o.hatch||[]).forEach(([a,b,c])=>{const P=clip(rect,a,b,c);if(P.length>2){const d=P.map(p=>`${X(p[0])},${Y(p[1])}`).join(' ');s+=`<polygon class="sv-excl" points="${d}"/><polygon points="${d}" fill="url(#${id})" stroke="none"/>`}});
  s+=`<line class="sv-axis" x1="${X(x0)}" y1="${Y(0)}" x2="${X(x1)+12}" y2="${Y(0)}"/><line class="sv-axis" x1="${X(0)}" y1="${Y(y0)}" x2="${X(0)}" y2="${Y(y1)-12}"/>`;
  s+=`<path class="sv-axis" fill="none" d="M${X(x1)+5} ${Y(0)-5} L${X(x1)+12} ${Y(0)} L${X(x1)+5} ${Y(0)+5} M${X(0)-5} ${Y(y1)-5} L${X(0)} ${Y(y1)-12} L${X(0)+5} ${Y(y1)-5}"/>`;
  s+=`<text class="sv-txt" x="${X(x1)+6}" y="${Y(0)+20}" font-size="15">x</text><text class="sv-txt" x="${X(0)+8}" y="${Y(y1)-6}" font-size="15">y</text><text class="sv-muted" x="${X(0)-5}" y="${Y(0)+15}" font-size="12" text-anchor="end">O</text>`;
  for(let x=x0;x<=x1;x++)if(x&&x%st===0)s+=`<text class="sv-muted" x="${X(x)}" y="${Y(0)+15}" font-size="11" text-anchor="middle">${x*un}</text>`;
  for(let y=y0;y<=y1;y++)if(y&&y%st===0)s+=`<text class="sv-muted" x="${X(0)-5}" y="${Y(y)+4}" font-size="11" text-anchor="end">${y*un}</text>`;
  (o.lines||[]).forEach(([a,b,c,dash,lab])=>{const P=seg(a,b,c);if(P.length<2)return;
    s+=`<line class="sv-ink" stroke-width="2.6" ${dash?'stroke-dasharray="8 6"':''} x1="${X(P[0][0])}" y1="${Y(P[0][1])}" x2="${X(P[1][0])}" y2="${Y(P[1][1])}"/>`;
    if(lab){const q=P[0][1]>P[1][1]?P[0]:P[1];s+=`<text class="sv-txt" x="${Math.min(X(q[0])+6,W-18)}" y="${Math.max(Y(q[1])+14,14)}" font-size="14">${lab}</text>`}});
  (o.pts||[]).forEach(([x,y,l])=>{s+=`<circle class="sv-dot" cx="${X(x)}" cy="${Y(y)}" r="4.5"/>`+(l?`<text class="sv-txt" x="${X(x)+7}" y="${Y(y)-7}" font-size="14">${l}</text>`:'')});
  return s+'</svg>';
}
/* Tam giác ABC bất kì vẽ theo độ dài ba cạnh a = BC, b = CA, c = AB (chỉ để lấy hình dạng).
   o.n=['A','B','C'] tên đỉnh · o.la, o.lb, o.lc nhãn cạnh BC, CA, AB · o.gA, o.gB, o.gC nhãn góc (true = chỉ vẽ cung). */
function triSVG(o={}){
  const n=o.n||['A','B','C'], a=o.a||7, b=o.b||5, c=o.c||8;
  let Ax=(c*c+a*a-b*b)/(2*a), Ay=Math.sqrt(Math.max(0,c*c-Ax*Ax));
  const xs=[0,a,Ax], minX=Math.min(...xs), spanX=Math.max(...xs)-minX, sc=Math.min(250/spanX,150/Math.max(Ay,1e-6));
  const W=320,H=220, ox=(W-spanX*sc)/2-minX*sc, oy=(H+Ay*sc)/2+4;
  const P={A:[ox+Ax*sc,oy-Ay*sc],B:[ox,oy],C:[ox+a*sc,oy]}, G=[(P.A[0]+P.B[0]+P.C[0])/3,(P.A[1]+P.B[1]+P.C[1])/3];
  const T=(x,y,s,fs=16,anc='middle')=>`<text class="sv-txt" x="${x.toFixed(1)}" y="${y.toFixed(1)}" font-size="${fs}" text-anchor="${anc}" dominant-baseline="middle">${s}</text>`;
  const out=(p,d)=>{const vx=p[0]-G[0],vy=p[1]-G[1],L=Math.hypot(vx,vy)||1;return [p[0]+vx/L*d,p[1]+vy/L*d]};
  let s=`<svg viewBox="0 0 ${W} ${H+18}" role="img" aria-label="Tam giác ${n.join('')}"><path class="sv-ink" stroke-width="3" stroke-linejoin="round" d="M${P.A} L${P.B} L${P.C} Z"/>`;
  const arc=(V,U1,U2,lab)=>{const r=24,a1=Math.atan2(-(U1[1]-V[1]),U1[0]-V[0]),a2=Math.atan2(-(U2[1]-V[1]),U2[0]-V[0]);let d=a2-a1;while(d<=-Math.PI)d+=2*Math.PI;while(d>Math.PI)d-=2*Math.PI;
    const p1=[V[0]+r*Math.cos(a1),V[1]-r*Math.sin(a1)],p2=[V[0]+r*Math.cos(a1+d),V[1]-r*Math.sin(a1+d)],m=a1+d/2;
    return `<path class="sv-tick" stroke-width="2.5" fill="none" d="M${p1} A${r} ${r} 0 0 ${d>0?0:1} ${p2}"/>`+(lab&&lab!==true?T(V[0]+(r+18)*Math.cos(m),V[1]-(r+18)*Math.sin(m),lab,14):'')};
  if(o.gA!=null)s+=arc(P.A,P.B,P.C,o.gA); if(o.gB!=null)s+=arc(P.B,P.C,P.A,o.gB); if(o.gC!=null)s+=arc(P.C,P.A,P.B,o.gC);
  const side=(U,V,lab)=>{if(!lab)return'';const m=[(U[0]+V[0])/2,(U[1]+V[1])/2],q=out(m,16);return T(q[0],q[1],lab,15)};
  s+=side(P.B,P.C,o.la)+side(P.C,P.A,o.lb)+side(P.A,P.B,o.lc);
  ['A','B','C'].forEach((k,i)=>{const q=out(P[k],16);s+=T(q[0],q[1],n[i],19)});
  return s+'</svg>';
}
/* Nửa đường tròn đơn vị với điểm M ứng với góc xOM = deg (0..180). */
function halfCircleSVG(deg,o={}){
  const cx=160,cy=160,R=120,t=deg*Math.PI/180,Mx=cx+R*Math.cos(t),My=cy-R*Math.sin(t);
  const T=(x,y,s,fs=15,anc='middle',cls='sv-txt')=>`<text class="${cls}" x="${x.toFixed(1)}" y="${y.toFixed(1)}" font-size="${fs}" text-anchor="${anc}">${s}</text>`;
  let s=`<svg viewBox="0 0 320 200" role="img" aria-label="Nửa đường tròn đơn vị">`;
  s+=`<line class="sv-axis" x1="20" y1="${cy}" x2="306" y2="${cy}"/><line class="sv-axis" x1="${cx}" y1="${cy+14}" x2="${cx}" y2="16"/>`;
  s+=`<path class="sv-axis" fill="none" d="M300 ${cy-5} L307 ${cy} L300 ${cy+5} M${cx-5} 22 L${cx} 15 L${cx+5} 22"/>`;
  s+=`<path class="sv-ink" stroke-width="2.5" fill="none" d="M${cx-R} ${cy} A${R} ${R} 0 0 1 ${cx+R} ${cy}"/>`;
  s+=`<line class="sv-ink" stroke-width="1.6" stroke-dasharray="5 4" x1="${Mx}" y1="${My}" x2="${Mx}" y2="${cy}"/><line class="sv-ink" stroke-width="1.6" stroke-dasharray="5 4" x1="${Mx}" y1="${My}" x2="${cx}" y2="${My}"/>`;
  s+=`<line class="sv-ray" style="stroke-width:3" x1="${cx}" y1="${cy}" x2="${Mx}" y2="${My}"/>`;
  const r=30,a2=t;s+=`<path class="sv-tick" stroke-width="2.5" fill="none" d="M${cx+r} ${cy} A${r} ${r} 0 0 0 ${cx+r*Math.cos(a2)} ${cy-r*Math.sin(a2)}"/>`;
  s+=T(cx+(r+14)*Math.cos(t/2),cy-(r+14)*Math.sin(t/2)+5,o.alpha||'α',16);
  s+=`<circle class="sv-dot" cx="${Mx}" cy="${My}" r="5"/>`+T(Mx+(deg>90?-10:10),My-10,'M',17,deg>90?'end':'start');
  s+=T(Mx,cy+20,o.x0||'x₀',14)+T(cx+(deg>90?8:-8),My+5,o.y0||'y₀',14,deg>90?'start':'end');
  s+=T(cx-R,cy+20,'−1',13,'middle','sv-muted')+T(cx+R,cy+20,'1',13,'middle','sv-muted')+T(cx-10,cy+18,'O',14,'middle','sv-muted')+T(cx+8,cy-R-4,'1',13,'start','sv-muted')+T(308,cy+20,'x',15)+T(cx+10,20,'y',15,'start');
  return s+'</svg>';
}
function rectSVG(){return `<svg viewBox="0 0 320 200" role="img" aria-label="Hình chữ nhật ABCD"><rect class="sv-ink" stroke-width="3" x="50" y="40" width="220" height="120"/>
 <path class="sv-ink" stroke-width="2" d="M50 56 h16 v-16 M254 40 v16 h16 M270 144 h-16 v16 M66 160 v-16 h-16"/>
 <text class="sv-txt" x="30" y="36" font-size="19">A</text><text class="sv-txt" x="276" y="36" font-size="19">B</text><text class="sv-txt" x="276" y="182" font-size="19">C</text><text class="sv-txt" x="28" y="182" font-size="19">D</text></svg>`}
function shapeSVG(kind){const pts={'Hình bình hành':'60,160 110,50 290,50 240,160','Hình thoi':'160,20 250,100 160,180 70,100','Hình chữ nhật':'50,50 270,50 270,150 50,150','Hình vuông':'95,35 225,35 225,165 95,165'}[kind];
 return `<svg viewBox="0 0 320 200" role="img" aria-label="Một hình tứ giác"><polygon class="sv-ink" stroke-width="3.5" points="${pts}" style="fill:var(--primary-soft)"/></svg>`}

/* Sơ đồ đoạn thẳng cho bài toán có lời văn (tiểu học).
   rows: [{label:'Thùng 1', parts:[{v:3},{v:1,on:true,t:'Hiệu'}], right:'?'}]
     v: độ dài (cùng đơn vị giữa các hàng); on: tô đậm; cut: nét đứt (phần bớt đi); t: chữ phía trên phần đó.
   o.brace = {from:0, to:1, t:'Tổng'} – ngoặc bên phải gộp các hàng from..to. */
function segSVG(rows,o={}){
  const L=o.labelW||96,W=o.w||240,max=Math.max(...rows.map(r=>r.parts.reduce((a,p)=>a+p.v,0))),sc=W/max,rh=62,top=30,bh=22;
  const rw=Math.max(0,...rows.map(r=>(r.right||'').length))*10+16,bx=L+W+rw+14,VW=o.brace?bx+22+(o.brace.t.length*10):L+W+rw+6,VH=top+rows.length*rh-14;
  let s=`<svg viewBox="0 0 ${VW} ${VH}" role="img" aria-label="Sơ đồ đoạn thẳng">`;
  rows.forEach((r,i)=>{const y=top+i*rh;let x=L;
    s+=`<text class="sv-txt" x="${L-10}" y="${y+17}" font-size="17" text-anchor="end">${r.label}</text>`;
    r.parts.forEach(p=>{const w=p.v*sc;s+=`<rect class="${p.cut?'sv-cut':'sv-part'+(p.on?' on':'')}" x="${x}" y="${y}" width="${w}" height="${bh}"/>`;
      if(p.t)s+=`<text class="sv-muted" x="${x+w/2}" y="${y-7}" font-size="15" text-anchor="middle">${p.t}</text>`;x+=w});
    if(r.right)s+=`<text class="sv-txt" x="${x+8}" y="${y+17}" font-size="17">${r.right}</text>`});
  if(o.brace){const{from,to,t}=o.brace,y1=top+from*rh,y2=top+to*rh+bh,m=(y1+y2)/2;
    s+=`<path class="sv-ink" stroke-width="2.5" d="M${bx-8} ${y1} Q${bx} ${y1} ${bx} ${y1+8} L${bx} ${m-6} L${bx+8} ${m} L${bx} ${m+6} L${bx} ${y2-8} Q${bx} ${y2} ${bx-8} ${y2}"/><text class="sv-txt" x="${bx+14}" y="${m+6}" font-size="17">${t}</text>`}
  return s+'</svg>';
}

/* Hình đường tròn (Toán 9 chương V). Toạ độ thực, trục y hướng lên; hình tự co vừa khung.
   o.C: [{x,y,r,lab}]            đường tròn (lab: tên tâm → vẽ chấm tâm và nhãn)
   o.P: [[x,y,'A',hướngĐộ?]]     điểm; nhãn đặt theo hướng (độ) hoặc tự đẩy ra xa tâm đường tròn đầu tiên
   o.S: [[x1,y1,x2,y2,nétĐứt?,nhãn?,bên?]]  đoạn thẳng (nhãn ở giữa, bên = 1 | -1)
   o.L: [[x1,y1,x2,y2,nhãn?]]    đường thẳng qua 2 điểm, kéo dài hết khung
   o.sector {x,y,r,a1,a2} tô hình quạt (ngược chiều kim đồng hồ từ a1 đến a2) · o.ring {x,y,r1,r2} tô vành khuyên
   o.arc {x,y,r,a1,a2} tô đậm cung · o.ang [[x,y,a1,a2,nhãn]] cung đánh dấu góc · o.right [[x,y,hướngĐộ]] kí hiệu góc vuông */
function circleSVG(o={}){
  const C=o.C||[],PT=o.P||[],SG=o.S||[],xs=[],ys=[];
  C.forEach(c=>{xs.push(c.x-c.r,c.x+c.r);ys.push(c.y-c.r,c.y+c.r)});PT.forEach(p=>{xs.push(p[0]);ys.push(p[1])});SG.forEach(s=>{xs.push(s[0],s[2]);ys.push(s[1],s[3])});
  let [x0,y0,x1,y1]=o.box||[Math.min(...xs),Math.min(...ys),Math.max(...xs),Math.max(...ys)];const pad=Math.max(x1-x0,y1-y0)*.13||1;x0-=pad;x1+=pad;y0-=pad;y1+=pad;
  const u=Math.min(330/(x1-x0),290/(y1-y0)),W=(x1-x0)*u,H=(y1-y0)*u,X=x=>((x-x0)*u).toFixed(1),Y=y=>((y1-y)*u).toFixed(1),rad=a=>a*Math.PI/180;
  const pol=(x,y,r,a)=>[x+r*Math.cos(rad(a)),y+r*Math.sin(rad(a))],cx=C.length?C[0].x:(x0+x1)/2,cy=C.length?C[0].y:(y0+y1)/2;
  const circ=(x,y,r)=>`M${X(x-r)} ${Y(y)} a${r*u} ${r*u} 0 1 0 ${2*r*u} 0 a${r*u} ${r*u} 0 1 0 ${-2*r*u} 0`;
  const arcD=(x,y,r,a1,a2)=>{const d=((a2-a1)%360+360)%360,[p,q]=pol(x,y,r,a1),[s,t]=pol(x,y,r,a2);return `M${X(p)} ${Y(q)} A${r*u} ${r*u} 0 ${d>180?1:0} 0 ${X(s)} ${Y(t)}`};
  const T=(x,y,s,fs=17,cls='sv-txt')=>`<text class="${cls}" x="${x}" y="${y}" font-size="${fs}" text-anchor="middle" dominant-baseline="middle">${s}</text>`;
  let s=`<svg viewBox="0 0 ${W.toFixed(1)} ${H.toFixed(1)}" role="img" aria-label="Hình vẽ đường tròn">`;
  if(o.ring){const g=o.ring;s+=`<path class="sv-fill" fill-rule="evenodd" d="${circ(g.x,g.y,g.r1)} ${circ(g.x,g.y,g.r2)}"/>`}
  if(o.sector){const g=o.sector;s+=`<path class="sv-fill" d="M${X(g.x)} ${Y(g.y)} L${arcD(g.x,g.y,g.r,g.a1,g.a2).slice(1)} Z"/>`}
  C.forEach(c=>{s+=`<circle class="sv-ink" stroke-width="2.5" cx="${X(c.x)}" cy="${Y(c.y)}" r="${(c.r*u).toFixed(1)}"/>`});
  if(o.arc){const g=o.arc;s+=`<path class="sv-arc" d="${arcD(g.x,g.y,g.r,g.a1,g.a2)}"/>`}
  (o.L||[]).forEach(l=>{const dx=l[2]-l[0],dy=l[3]-l[1],k=(x1-x0+y1-y0)*3/Math.hypot(dx,dy);s+=`<line class="sv-ink" stroke-width="2.2" x1="${X(l[0]-dx*k)}" y1="${Y(l[1]-dy*k)}" x2="${X(l[0]+dx*k)}" y2="${Y(l[1]+dy*k)}"/>`;
    if(l[4]){const L=Math.hypot(dx,dy),e=[l[2]+dx/L*(x1-x0)*.12,l[3]+dy/L*(y1-y0)*.12];s+=T(+X(e[0])+12,+Y(e[1])-12,l[4],17,'sv-txt')}});
  SG.forEach(g=>{s+=`<line class="sv-ink" stroke-width="2.2" ${g[4]?'stroke-dasharray="7 5" ':''}x1="${X(g[0])}" y1="${Y(g[1])}" x2="${X(g[2])}" y2="${Y(g[3])}"/>`;
    if(g[5]){const mx=(+X(g[0])+ +X(g[2]))/2,my=(+Y(g[1])+ +Y(g[3]))/2,dx=+X(g[2])-X(g[0]),dy=+Y(g[3])-Y(g[1]),L=Math.hypot(dx,dy)||1,sd=g[6]||1;s+=T(mx-dy/L*15*sd,my+dx/L*15*sd,g[5],16,'sv-muted')}});
  (o.ang||[]).forEach(a=>{const r=20/u;s+=`<path class="sv-ink" stroke-width="1.8" d="${arcD(a[0],a[1],r,a[2],a[3])}"/>`;if(a[4]){const[p,q]=pol(a[0],a[1],r*2,(a[2]+a[3])/2);s+=T(X(p),Y(q),a[4],15,'sv-muted')}});
  (o.right||[]).forEach(a=>{const k=11/u,[p,q]=pol(a[0],a[1],k,a[2]),[p2,q2]=pol(a[0],a[1],k,a[2]+90),[m,n]=[p+p2-a[0],q+q2-a[1]];s+=`<path class="sv-ink" stroke-width="1.6" d="M${X(p)} ${Y(q)} L${X(m)} ${Y(n)} L${X(p2)} ${Y(q2)}"/>`});
  C.forEach(c=>{if(c.lab){s+=`<circle class="sv-pt" cx="${X(c.x)}" cy="${Y(c.y)}" r="3.6"/>`+T(+X(c.x)+(c.lp||0),+Y(c.y)+14,c.lab)}});
  PT.forEach(p=>{let a=p[3];if(a==null){a=Math.hypot(p[0]-cx,p[1]-cy)<1e-9?-60:Math.atan2(p[1]-cy,p[0]-cx)*180/Math.PI}const[lx,ly]=[+X(p[0])+15*Math.cos(rad(a)),+Y(p[1])-15*Math.sin(rad(a))];
    s+=`<circle class="sv-pt" cx="${X(p[0])}" cy="${Y(p[1])}" r="3.6"/>`+(p[2]?T(lx.toFixed(1),ly.toFixed(1),p[2]):'')});
  return s+'</svg>';
}

/* Hình phẳng có kí hiệu (Toán 8 chương III – tứ giác). Toạ độ thực, y hướng lên; tự co vừa khung.
   o.P  {A:[x,y], …}                        các điểm (nhãn tự đặt ra phía ngoài hình)
   o.S  ['AB','BC',['AC','dash'], …]         đoạn thẳng (mảng [tên,'dash'] = nét đứt)
   o.L  {AB:'5 cm'}                          nhãn trên cạnh (phía ngoài)
   o.T  {AB:1, CD:1, AD:2}                   số vạch đánh dấu các cạnh bằng nhau
   o.Pa {AB:1, CD:1}                         số mũi tên chỉ các cạnh song song
   o.A  [['DAB','70°',1]]                    cung góc tại đỉnh giữa (nhãn, số cung)
   o.R  ['DAB']                              kí hiệu góc vuông tại đỉnh giữa
   o.dot ['O']                               chỉ chấm điểm, không cần cạnh */
function geoSVG(o={}){
  const P=o.P||{},names=Object.keys(P),xs=names.map(n=>P[n][0]),ys=names.map(n=>P[n][1]);
  let x0=Math.min(...xs),x1=Math.max(...xs),y0=Math.min(...ys),y1=Math.max(...ys);const pad=Math.max(x1-x0,y1-y0)*.16||1;x0-=pad;x1+=pad;y0-=pad;y1+=pad;
  const u=Math.min(340/(x1-x0),250/(y1-y0)),W=(x1-x0)*u,H=(y1-y0)*u,X=p=>(p[0]-x0)*u,Y=p=>(y1-p[1])*u,S=n=>[X(P[n]),Y(P[n])];
  const cx=xs.reduce((a,b)=>a+b,0)/xs.length,cy=ys.reduce((a,b)=>a+b,0)/ys.length,C=[X([cx,cy]),Y([cx,cy])];
  const f=v=>v.toFixed(1),T=(x,y,s,fs=17,cls='sv-txt')=>`<text class="${cls}" x="${f(x)}" y="${f(y)}" font-size="${fs}" text-anchor="middle" dominant-baseline="middle">${s}</text>`;
  const seg=nm=>{const a=S(nm[0]),b=S(nm[1]),dx=b[0]-a[0],dy=b[1]-a[1],L=Math.hypot(dx,dy)||1,m=[(a[0]+b[0])/2,(a[1]+b[1])/2];let nx=-dy/L,ny=dx/L;
    if((m[0]-C[0])*nx+(m[1]-C[1])*ny<0){nx=-nx;ny=-ny}return{a,b,m,ux:dx/L,uy:dy/L,nx,ny,L}};
  let s=`<svg viewBox="0 0 ${f(W)} ${f(H)}" role="img" aria-label="Hình vẽ">`;
  (o.S||[]).forEach(x=>{const nm=Array.isArray(x)?x[0]:x,d=Array.isArray(x)&&x[1]==='dash',g=seg(nm);s+=`<line class="sv-ink" stroke-width="2.4" ${d?'stroke-dasharray="7 5" ':''}x1="${f(g.a[0])}" y1="${f(g.a[1])}" x2="${f(g.b[0])}" y2="${f(g.b[1])}"/>`});
  Object.entries(o.T||{}).forEach(([nm,k])=>{const g=seg(nm);for(let i=0;i<k;i++){const t=(i-(k-1)/2)*6,p=[g.m[0]+g.ux*t,g.m[1]+g.uy*t];s+=`<line class="sv-ink" stroke-width="2.2" x1="${f(p[0]-g.nx*7)}" y1="${f(p[1]-g.ny*7)}" x2="${f(p[0]+g.nx*7)}" y2="${f(p[1]+g.ny*7)}"/>`}});
  Object.entries(o.Pa||{}).forEach(([nm,k])=>{const g=seg(nm);if(g.ux<-1e-6||(Math.abs(g.ux)<1e-6&&g.uy>0)){g.ux=-g.ux;g.uy=-g.uy}for(let i=0;i<k;i++){const t=(i-(k-1)/2)*8+((o.T||{})[nm]?16:0),p=[g.m[0]+g.ux*t,g.m[1]+g.uy*t];
    s+=`<path class="sv-ink" stroke-width="2.2" d="M${f(p[0]-g.ux*7+g.nx*6)} ${f(p[1]-g.uy*7+g.ny*6)} L${f(p[0])} ${f(p[1])} L${f(p[0]-g.ux*7-g.nx*6)} ${f(p[1]-g.uy*7-g.ny*6)}"/>`}});
  (o.A||[]).forEach(([t,lab,k=1])=>{const B=S(t[1]),a=S(t[0]),c=S(t[2]),a1=Math.atan2(a[1]-B[1],a[0]-B[0]),a2=Math.atan2(c[1]-B[1],c[0]-B[0]);let d=a2-a1;while(d<=-Math.PI)d+=2*Math.PI;while(d>Math.PI)d-=2*Math.PI;
    for(let i=0;i<k;i++){const r=20+i*5,p=[B[0]+r*Math.cos(a1),B[1]+r*Math.sin(a1)],q=[B[0]+r*Math.cos(a1+d),B[1]+r*Math.sin(a1+d)];s+=`<path class="sv-ink" stroke-width="1.8" d="M${f(p[0])} ${f(p[1])} A${r} ${r} 0 0 ${d>0?1:0} ${f(q[0])} ${f(q[1])}"/>`}
    if(lab){const m=a1+d/2,r=Math.abs(d)<.7?52:40;s+=T(B[0]+r*Math.cos(m),B[1]+r*Math.sin(m),lab,14,'sv-muted')}});
  (o.R||[]).forEach(t=>{const B=S(t[1]),a=S(t[0]),c=S(t[2]),n=v=>{const L=Math.hypot(v[0],v[1])||1;return[v[0]/L*12,v[1]/L*12]},p=n([a[0]-B[0],a[1]-B[1]]),q=n([c[0]-B[0],c[1]-B[1]]);
    s+=`<path class="sv-ink" stroke-width="1.6" d="M${f(B[0]+p[0])} ${f(B[1]+p[1])} L${f(B[0]+p[0]+q[0])} ${f(B[1]+p[1]+q[1])} L${f(B[0]+q[0])} ${f(B[1]+q[1])}"/>`});
  Object.entries(o.L||{}).forEach(([nm,lab])=>{const g=seg(nm);s+=T(g.m[0]+g.nx*15,g.m[1]+g.ny*15,lab,15,'sv-muted')});
  names.forEach(n=>{const p=S(n);let dx=p[0]-C[0],dy=p[1]-C[1];const L=Math.hypot(dx,dy);if(L<1){dx=.6;dy=.8}else{dx/=L;dy/=L}
    s+=`<circle class="sv-pt" cx="${f(p[0])}" cy="${f(p[1])}" r="3.2"/>`+T(p[0]+dx*16,p[1]+dy*16,n.replace(/\d$/,'')+(/\d$/.test(n)?`<tspan font-size="11" dy="4">${n.slice(-1)}</tspan>`:''),17)});
  return s+'</svg>';
}
/* Hình chữ nhật phức hợp cho Toán tư duy tiểu học.
   kind: 'L' | 'stairs' | 'cutCorners' | 'frame'.
   Kích thước dùng để vẽ đúng tỉ lệ; q là tên kích thước cần ẩn bằng dấu ?. */
function complexRectSVG(kind,o={}){
  const W=o.W||10,H=o.H||8,unit=o.unit||'cm',x0=72,y0=28,sc=Math.min(250/W,185/H),X=x=>x0+x*sc,Y=y=>y0+(H-y)*sc;
  const T=(x,y,s,a='middle',fs=16,cls='sv-muted')=>`<text class="${cls}" x="${x.toFixed(1)}" y="${y.toFixed(1)}" font-size="${fs}" text-anchor="${a}" dominant-baseline="middle">${s}</text>`;
  const lab=(n,key)=>`${o.q===key?'?':n} ${unit}`;
  const poly=pts=>pts.map(p=>`${X(p[0]).toFixed(1)},${Y(p[1]).toFixed(1)}`).join(' ');
  let s=`<svg viewBox="0 0 390 260" role="img" aria-label="Hình phức hợp gồm các hình chữ nhật">`;
  if(kind==='L'){
    const cw=o.cw||4,ch=o.ch||3,pts=[[0,0],[W,0],[W,H-ch],[W-cw,H-ch],[W-cw,H],[0,H]];
    s+=`<polygon class="sv-fill" points="${poly(pts)}"/><polygon class="sv-ink" stroke-width="3" stroke-linejoin="round" points="${poly(pts)}"/>`;
    s+=`<line class="sv-cut" x1="${X(W-cw)}" y1="${Y(0)}" x2="${X(W-cw)}" y2="${Y(H-ch)}"/>`;
    s+=T((X(0)+X(W))/2,Y(0)+24,lab(W,'W'))+T(X(0)-26,(Y(0)+Y(H))/2,lab(H,'H'));
    s+=T((X(W-cw)+X(W))/2,Y(H-ch)-14,lab(cw,'cw'))+T(X(W-cw)+29,(Y(H-ch)+Y(H))/2,lab(ch,'ch'));
  }else if(kind==='stairs'){
    const n=o.steps||3,pts=[[0,0],[W,0]];for(let i=1;i<=n;i++){pts.push([W-(i-1)*W/n,i*H/n]);pts.push([W-i*W/n,i*H/n])}pts.push([0,H],[0,0]);
    s+=`<polygon class="sv-fill" points="${poly(pts)}"/><polygon class="sv-ink" stroke-width="3" stroke-linejoin="round" points="${poly(pts)}"/>`;
    s+=`<line class="sv-cut" x1="${X(0)}" y1="${Y(H)}" x2="${X(W)}" y2="${Y(H)}"/><line class="sv-cut" x1="${X(W)}" y1="${Y(0)}" x2="${X(W)}" y2="${Y(H)}"/>`;
    s+=T((X(0)+X(W))/2,Y(0)+24,lab(W,'W'))+T(X(0)-28,(Y(0)+Y(H))/2,lab(H,'H'));
  }else if(kind==='cutCorners'){
    const c=o.c||3,pts=[[c,0],[W-c,0],[W-c,c],[W,c],[W,H-c],[W-c,H-c],[W-c,H],[c,H],[c,H-c],[0,H-c],[0,c],[c,c]];
    s+=`<polygon class="sv-fill" points="${poly(pts)}"/><polygon class="sv-ink" stroke-width="3" stroke-linejoin="round" points="${poly(pts)}"/>`;
    s+=`<line class="sv-cut" x1="${X(0)}" y1="${Y(0)}" x2="${X(W)}" y2="${Y(0)}"/><line class="sv-cut" x1="${X(0)}" y1="${Y(0)}" x2="${X(0)}" y2="${Y(H)}"/>`;
    s+=T((X(0)+X(W))/2,Y(0)+25,lab(W,'W'))+T(X(0)-28,(Y(0)+Y(H))/2,lab(H,'H'));
    s+=T((X(0)+X(c))/2,Y(H-c)-14,lab(c,'c'), 'middle',14)+T(X(c)+26,(Y(H-c)+Y(H))/2,lab(c,'c'),'middle',14);
  }else if(kind==='frame'){
    const w=o.w||W-4,h=o.h||H-4,ix=(W-w)/2,iy=(H-h)/2;
    const outer=`M${X(0)} ${Y(0)} L${X(W)} ${Y(0)} L${X(W)} ${Y(H)} L${X(0)} ${Y(H)} Z`,inner=`M${X(ix)} ${Y(iy)} L${X(ix)} ${Y(iy+h)} L${X(ix+w)} ${Y(iy+h)} L${X(ix+w)} ${Y(iy)} Z`;
    s+=`<path class="sv-fill" fill-rule="evenodd" d="${outer} ${inner}"/><path class="sv-ink" stroke-width="3" d="${outer} ${inner}"/>`;
    s+=T((X(0)+X(W))/2,Y(0)+25,lab(W,'W'))+T(X(0)-29,(Y(0)+Y(H))/2,lab(H,'H'));
    if(o.showInner!==false)s+=T((X(ix)+X(ix+w))/2,Y(iy+h)+18,lab(w,'w'))+T(X(ix+w)-34,(Y(iy)+Y(iy+h))/2,lab(h,'h'));
    if(o.t!=null){const mx=(X(0)+X(ix))/2;s+=`<line class="sv-ink" stroke-width="1.8" x1="${X(0)}" y1="${Y(H/2)}" x2="${X(ix)}" y2="${Y(H/2)}"/>`;s+=T(mx,Y(H/2)-13,lab(o.t,'t'),'middle',14)}
  }
  return s+'</svg>';
}
/* Tháp khối lập phương: heights là ma trận chiều cao từng cột; các khối được vẽ đẳng phối để nhìn theo tầng. */
function cubeTowerSVG(heights,o={}){
  const rows=heights.length,cols=heights[0].length,mx=Math.max(...heights.flat()),s=Math.min(34,132/Math.max(rows,cols)),ox=190,top=28;
  const P=(x,y,z)=>[ox+(x-y)*s,top+(x+y)*s*.5+(mx-z)*s],pts=a=>a.map(p=>p.map(v=>v.toFixed(1)).join(',')).join(' ');
  const cubes=[];for(let y=0;y<rows;y++)for(let x=0;x<cols;x++)for(let z=0;z<heights[y][x];z++)cubes.push({x,y,z});cubes.sort((a,b)=>(a.x+a.y)-(b.x+b.y)||a.z-b.z||a.x-b.x);
  let out=`<svg viewBox="0 0 380 280" role="img" aria-label="Mô hình xếp bằng các khối lập phương nhỏ">`;
  cubes.forEach(({x,y,z})=>{const t=[P(x,y,z+1),P(x+1,y,z+1),P(x+1,y+1,z+1),P(x,y+1,z+1)],r=[P(x+1,y,z),P(x+1,y+1,z),P(x+1,y+1,z+1),P(x+1,y,z+1)],l=[P(x,y+1,z),P(x+1,y+1,z),P(x+1,y+1,z+1),P(x,y+1,z+1)];
    out+=`<polygon class="sv-fill" points="${pts(l)}"/><polygon class="sv-fill" style="fill-opacity:.22" points="${pts(r)}"/><polygon class="sv-fill" style="fill-opacity:.5" points="${pts(t)}"/><polygon class="sv-ink" stroke-width="1.8" points="${pts(l)}"/><polygon class="sv-ink" stroke-width="1.8" points="${pts(r)}"/><polygon class="sv-ink" stroke-width="1.8" points="${pts(t)}"/>`});
  if(o.caption)out+=`<text class="sv-muted" x="190" y="268" font-size="15" text-anchor="middle">${o.caption}</text>`;
  return out+'</svg>';
}

/* Hình khai triển chuẩn: một mặt giữa, bốn mặt kề và một mặt nối đuôi. */
function cubeNetSVG(labels={}){
  const L={center:'1',top:'2',left:'3',right:'4',bottom:'5',tail:'6',...labels},cells=[[1,1,L.center],[1,0,L.top],[0,1,L.left],[2,1,L.right],[1,2,L.bottom],[1,3,L.tail]],a=56,x0=92,y0=20;
  let s=`<svg viewBox="0 0 360 260" role="img" aria-label="Hình khai triển của khối lập phương">`;
  cells.forEach(([x,y,t],i)=>{s+=`<rect class="sv-part${i===0?' on':''}" x="${x0+x*a}" y="${y0+y*a}" width="${a}" height="${a}"/><text class="sv-txt" x="${x0+x*a+a/2}" y="${y0+y*a+a/2+6}" font-size="20" text-anchor="middle">${t}</text>`});
  return s+'</svg>';
}

/* Tam giác quạt: n khoảng nhỏ trên đáy, mọi đường đều nối về một đỉnh chung. */
function triangleFanSVG(n,o={}){
  const x0=38,x1=342,y=226,ax=190,ay=24;
  let s=`<svg viewBox="0 0 380 260" role="img" aria-label="Tam giác được chia thành ${n} tam giác nhỏ chung đỉnh">`;
  s+=`<polygon class="sv-fill" points="${ax},${ay} ${x1},${y} ${x0},${y}"/>`;
  for(let i=0;i<=n;i++){const x=x0+(x1-x0)*i/n;s+=`<line class="sv-ink" stroke-width="${i===0||i===n?3:2}" x1="${ax}" y1="${ay}" x2="${x.toFixed(1)}" y2="${y}"/>`;if(o.number&&i<n)s+=`<text class="sv-muted" x="${(x+(x0+(x1-x0)*(i+1)/n))/2}" y="248" font-size="14" text-anchor="middle">${i+1}</text>`}
  s+=`<line class="sv-ink" stroke-width="3" x1="${x0}" y1="${y}" x2="${x1}" y2="${y}"/>`;
  return s+'</svg>';
}

/* Khối lập phương n×n×n nhìn thấy ba mặt, có lưới chia các khối nhỏ. */
function paintedCubeSVG(n,o={}){
  const s=Math.min(31,132/n),ox=190,top=28,P=(x,y,z)=>[ox+(x-y)*s,top+(x+y)*s*.5+(n-z)*s],line=(a,b,w=1.4)=>`<line class="sv-ink" stroke-width="${w}" x1="${a[0].toFixed(1)}" y1="${a[1].toFixed(1)}" x2="${b[0].toFixed(1)}" y2="${b[1].toFixed(1)}"/>`,poly=a=>a.map(p=>p.map(v=>v.toFixed(1)).join(',')).join(' ');
  const topF=[P(0,0,n),P(n,0,n),P(n,n,n),P(0,n,n)],right=[P(n,0,0),P(n,n,0),P(n,n,n),P(n,0,n)],left=[P(0,n,0),P(n,n,0),P(n,n,n),P(0,n,n)];
  let out=`<svg viewBox="0 0 380 280" role="img" aria-label="Khối lập phương ${n} nhân ${n} nhân ${n} được chia thành các khối nhỏ">`;
  out+=`<polygon class="sv-fill" points="${poly(left)}"/><polygon class="sv-fill" style="fill-opacity:.22" points="${poly(right)}"/><polygon class="sv-fill" style="fill-opacity:.5" points="${poly(topF)}"/>`;
  for(let i=0;i<=n;i++){out+=line(P(i,0,n),P(i,n,n),i===0||i===n?2.5:1.2)+line(P(0,i,n),P(n,i,n),i===0||i===n?2.5:1.2);out+=line(P(n,i,0),P(n,i,n),i===0||i===n?2.5:1.2)+line(P(n,0,i),P(n,n,i),i===0||i===n?2.5:1.2);out+=line(P(i,n,0),P(i,n,n),i===0||i===n?2.5:1.2)+line(P(0,n,i),P(n,n,i),i===0||i===n?2.5:1.2)}
  out+=`<text class="sv-muted" x="190" y="268" font-size="16" text-anchor="middle">${n} × ${n} × ${n}</text>`;
  return out+'</svg>';
}

/* Lưới hình chữ nhật rows hàng, cols cột để đếm hình có hệ thống. */
function rectGridSVG(rows,cols,o={}){
  const cell=Math.min(54,270/cols,190/rows),w=cols*cell,h=rows*cell,x=(360-w)/2,y=(240-h)/2;
  let s=`<svg viewBox="0 0 360 240" role="img" aria-label="Lưới ${rows} hàng ${cols} cột">`;
  s+=`<rect class="sv-fill" x="${x}" y="${y}" width="${w}" height="${h}"/>`;
  for(let i=0;i<=cols;i++)s+=`<line class="sv-ink" stroke-width="${i===0||i===cols?3:1.8}" x1="${x+i*cell}" y1="${y}" x2="${x+i*cell}" y2="${y+h}"/>`;
  for(let i=0;i<=rows;i++)s+=`<line class="sv-ink" stroke-width="${i===0||i===rows?3:1.8}" x1="${x}" y1="${y+i*cell}" x2="${x+w}" y2="${y+i*cell}"/>`;
  return s+'</svg>';
}
/* Mô hình các vị trí cần lấp đầy cho quy tắc nhân. */
function choiceSlotsSVG(labels,choices,o={}){
  const n=labels.length,gap=12,w=Math.min(68,(330-gap*(n-1))/n),total=n*w+(n-1)*gap,x0=(380-total)/2,y=82;
  let s=`<svg viewBox="0 0 380 210" role="img" aria-label="Mô hình các vị trí lựa chọn">`;
  if(o.pool)s+=`<text class="sv-muted" x="190" y="34" font-size="16" text-anchor="middle">${o.pool}</text>`;
  labels.forEach((lab,i)=>{const x=x0+i*(w+gap);s+=`<rect class="sv-part${i===0?' on':''}" x="${x}" y="${y}" width="${w}" height="58" rx="7"/><text class="sv-txt" x="${x+w/2}" y="${y+35}" font-size="20" text-anchor="middle">${choices[i]}</text><text class="sv-muted" x="${x+w/2}" y="${y+83}" font-size="14" text-anchor="middle">${lab}</text>`});
  s+=`<text class="sv-muted" x="190" y="194" font-size="15" text-anchor="middle">${choices.join(' × ')}</text>`;
  return s+'</svg>';
}

/* Biểu đồ Venn hai nhóm; giá trị null được thay bằng dấu ?. */
function venn2SVG(o={}){
  const val=x=>x==null?'?':x,A=o.labelA||'Nhóm A',B=o.labelB||'Nhóm B';
  return `<svg viewBox="0 0 400 250" role="img" aria-label="Biểu đồ Venn hai nhóm"><rect class="sv-ink" stroke-width="2.5" x="20" y="20" width="360" height="210" rx="10"/><circle class="sv-fill" cx="155" cy="135" r="70"/><circle class="sv-fill" cx="245" cy="135" r="70"/><circle class="sv-ink" stroke-width="2.5" cx="155" cy="135" r="70"/><circle class="sv-ink" stroke-width="2.5" cx="245" cy="135" r="70"/><text class="sv-txt" x="112" y="48" font-size="16" text-anchor="middle">${A}</text><text class="sv-txt" x="288" y="48" font-size="16" text-anchor="middle">${B}</text><text class="sv-txt" x="118" y="143" font-size="22" text-anchor="middle">${val(o.aOnly)}</text><text class="sv-txt" x="200" y="143" font-size="22" text-anchor="middle">${val(o.both)}</text><text class="sv-txt" x="282" y="143" font-size="22" text-anchor="middle">${val(o.bOnly)}</text><text class="sv-muted" x="42" y="220" font-size="14">Không nhóm nào: ${val(o.none)}</text></svg>`;
}

/* Lưới đường đi: rows hàng, cols cột; chỉ đi lên và sang phải. blocked=[cột,hàng] nếu có nút bị chặn. */
function routeGridSVG(rows,cols,o={}){
  const x0=48,y0=218,w=282,h=164,dx=w/cols,dy=h/rows,X=c=>x0+c*dx,Y=r=>y0-r*dy,b=o.blocked;
  const ways=Array.from({length:rows+1},()=>Array(cols+1).fill(0));ways[0][0]=1;for(let r=0;r<=rows;r++)for(let c=0;c<=cols;c++){if(!r&&!c)continue;if(b&&b[0]===c&&b[1]===r){ways[r][c]=0;continue}ways[r][c]=(c?ways[r][c-1]:0)+(r?ways[r-1][c]:0)}
  let s=`<svg viewBox="0 0 380 270" role="img" aria-label="Lưới đường đi ${rows} hàng ${cols} cột">`;
  for(let c=0;c<=cols;c++)s+=`<line class="sv-ink" stroke-width="1.8" x1="${X(c)}" y1="${Y(0)}" x2="${X(c)}" y2="${Y(rows)}"/>`;
  for(let r=0;r<=rows;r++)s+=`<line class="sv-ink" stroke-width="1.8" x1="${X(0)}" y1="${Y(r)}" x2="${X(cols)}" y2="${Y(r)}"/>`;
  for(let r=0;r<=rows;r++)for(let c=0;c<=cols;c++){const blocked=b&&b[0]===c&&b[1]===r;s+=`<circle class="${blocked?'sv-pt':'sv-dot'}" cx="${X(c)}" cy="${Y(r)}" r="${blocked?8:4}"/>`;if(o.showCounts&&!blocked)s+=`<text class="sv-muted" x="${X(c)+9}" y="${Y(r)-9}" font-size="13">${ways[r][c]}</text>`;if(blocked)s+=`<path class="sv-ink" stroke-width="2.5" d="M${X(c)-9} ${Y(r)-9} L${X(c)+9} ${Y(r)+9} M${X(c)+9} ${Y(r)-9} L${X(c)-9} ${Y(r)+9}"/>`}
  s+=`<text class="sv-txt" x="${X(0)-20}" y="${Y(0)+20}" font-size="18">A</text><text class="sv-txt" x="${X(cols)+9}" y="${Y(rows)-10}" font-size="18">B</text><text class="sv-muted" x="190" y="258" font-size="15" text-anchor="middle">Chỉ đi → hoặc ↑</text>`;
  return s+'</svg>';
}

/* Túi bóng minh họa xác suất; groups là danh sách nhóm, mỗi nhóm có kí hiệu, số lượng và trạng thái tô. */
function probabilityBagSVG(groups,o={}){
  const balls=[];groups.forEach((g,gi)=>{for(let i=0;i<g.count;i++)balls.push({mark:g.mark,on:g.on??gi===0})});
  let s=`<svg viewBox="0 0 380 250" role="img" aria-label="Túi có ${balls.length} quả bóng">`;
  s+=`<path class="sv-ink" stroke-width="3" d="M105 48 Q190 24 275 48 L302 218 Q190 244 78 218 Z"/>`;
  balls.forEach((b,i)=>{const cols=5,row=Math.floor(i/cols),col=i%cols,x=118+col*36+(row%2)*10,y=92+row*42;s+=`<circle class="sv-part${b.on?' on':''}" cx="${x}" cy="${y}" r="15"/><text class="sv-txt" x="${x}" y="${y+5}" font-size="14" text-anchor="middle">${b.mark}</text>`});
  if(o.caption)s+=`<text class="sv-muted" x="190" y="242" font-size="14" text-anchor="middle">${o.caption}</text>`;
  return s+'</svg>';
}
/* Hai thanh so sánh tổng giả sử và tổng thực tế; phần chênh lệch là chìa khóa của giả thiết tạm. */
function assumptionGapSVG(o={}){
  const assumed=o.assumed||0,actual=o.actual||0,max=Math.max(assumed,actual,1),x=118,w=220,scale=w/max,
    labelA=o.labelA||'Giả sử',labelB=o.labelB||'Thực tế',unit=o.unit||'';
  const bar=(y,value,on)=>`<rect class="sv-part${on?' on':''}" x="${x}" y="${y}" width="${Math.max(4,value*scale)}" height="38" rx="8"/><text class="sv-txt" x="${x+10}" y="${y+26}" font-size="17">${value} ${unit}</text>`;
  return `<svg viewBox="0 0 380 210" role="img" aria-label="So sánh tổng theo giả thiết và tổng thực tế"><text class="sv-muted" x="105" y="67" font-size="15" text-anchor="end">${labelA}</text>${bar(42,assumed,false)}<text class="sv-muted" x="105" y="127" font-size="15" text-anchor="end">${labelB}</text>${bar(102,actual,true)}<path class="sv-ink" stroke-width="2" d="M${x+assumed*scale} 156 L${x+actual*scale} 156 M${x+assumed*scale} 148 L${x+assumed*scale} 164 M${x+actual*scale} 148 L${x+actual*scale} 164"/><text class="sv-txt" x="${x+(assumed+actual)*scale/2}" y="190" font-size="16" text-anchor="middle">${o.gapLabel||'Phần chênh lệch'}</text></svg>`;
}

/* Sơ đồ chuồng thỏ: mỗi ô đang chứa tối đa limit vật; vật tiếp theo buộc tạo một nhóm mới. */
function pigeonholeSVG(labels,limit=1,o={}){
  const n=labels.length,gap=12,w=Math.min(92,(340-gap*(n-1))/n),total=n*w+(n-1)*gap,x0=(380-total)/2,y=52;
  let s=`<svg viewBox="0 0 380 245" role="img" aria-label="Sơ đồ nguyên lý chuồng thỏ">`;
  labels.forEach((lab,i)=>{const x=x0+i*(w+gap);s+=`<rect class="sv-part" x="${x}" y="${y}" width="${w}" height="112" rx="10"/><text class="sv-txt" x="${x+w/2}" y="${y+25}" font-size="15" text-anchor="middle">${lab}</text>`;for(let j=0;j<limit;j++){const cols=Math.min(3,limit),row=Math.floor(j/cols),col=j%cols,cx=x+w/2+(col-(cols-1)/2)*22,cy=y+55+row*25;s+=`<circle class="sv-dot" cx="${cx}" cy="${cy}" r="7"/>`}
  });
  s+=`<path class="sv-ink" stroke-width="2.5" d="M190 210 L190 178 M182 187 L190 178 L198 187"/><circle class="sv-pt" cx="190" cy="220" r="9"/><text class="sv-muted" x="208" y="225" font-size="14" text-anchor="start">${o.nextLabel||'vật tiếp theo'}</text></svg>`;
  return s;
}

/* ===== Hình cho Ôn tập giữa học kì I – Toán 10 ===== */
/* Đài quan sát: người đứng tại P (độ cao h so với mặt đất) nhìn chân cột cờ (góc a) và đỉnh cột cờ (góc b) trên nóc toà nhà.
   o.h, o.d, o.a, o.b, o.hb, o.hf là nhãn (chuỗi, '?' nếu chưa biết). Hình minh hoạ, không đúng tỉ lệ. */
function obsSVG(o={}){
  const T=(x,y,s,fs=16,anc='middle',cls='sv-txt')=>`<text class="${cls}" x="${x}" y="${y}" font-size="${fs}" text-anchor="${anc}" dominant-baseline="middle">${s}</text>`;
  const Px=52,Py=120,Bx=250,Ry=64,Ty=22,G=196, ang=(x,y)=>Math.atan2(Py-y,x-Px);
  const aR=ang(Bx,Ry), aT=ang(Bx,Ty);
  const arc=(r,a1,a2)=>`<path class="sv-tick" stroke-width="2.5" fill="none" d="M${Px+r*Math.cos(a1)} ${Py-r*Math.sin(a1)} A${r} ${r} 0 0 0 ${Px+r*Math.cos(a2)} ${Py-r*Math.sin(a2)}"/>`;
  let s=`<svg viewBox="0 0 320 214" role="img" aria-label="Quan sát cột cờ trên toà nhà">`;
  s+=`<line class="sv-axis" x1="8" y1="${G}" x2="312" y2="${G}"/>`;
  s+=`<rect class="sv-ink" stroke-width="2.5" x="${Bx-34}" y="${Ry}" width="68" height="${G-Ry}"/>`;
  s+=`<line class="sv-ink" stroke-width="3" x1="${Bx}" y1="${Ry}" x2="${Bx}" y2="${Ty}"/><path class="sv-ink" stroke-width="2" d="M${Bx} ${Ty} L${Bx+22} ${Ty+7} L${Bx} ${Ty+14}"/>`;
  s+=`<line class="sv-ink" stroke-width="3" x1="${Px}" y1="${Py}" x2="${Px}" y2="${G}"/><rect class="sv-ink" stroke-width="2.5" x="${Px-22}" y="${Py}" width="44" height="6"/>`;
  s+=`<line class="sv-ink" stroke-width="1.6" stroke-dasharray="5 4" x1="${Px}" y1="${Py}" x2="${Bx}" y2="${Py}"/>`;
  s+=`<line class="sv-ink" stroke-width="2" x1="${Px}" y1="${Py}" x2="${Bx}" y2="${Ry}"/><line class="sv-ink" stroke-width="2" x1="${Px}" y1="${Py}" x2="${Bx}" y2="${Ty}"/>`;
  s+=arc(52,0,aR)+arc(74,aR,aT);
  s+=`<circle class="sv-dot" cx="${Px}" cy="${Py}" r="4.5"/>`+T(Px-14,Py-12,'P',17)+T(Bx+8,Ry+14,'C',16,'start')+T(Bx+22,Ty+30,'D',16,'start');
  s+=T(Px-14,(Py+G)/2+10,o.h||'h',16,'end')+T((Px+Bx)/2,Py+14,o.d||'d',16);
  if(o.a)s+=T(Px+68,Py-12,o.a,15);
  if(o.b)s+=T(Px+84,Py-52,o.b,15);
  if(o.hb)s+=T(Bx+40,(Ry+G)/2,o.hb,16,'start');
  if(o.hf)s+=T(Bx-10,(Ry+Ty)/2,o.hf,16,'end');
  s+=T(160,G+12,'Hình minh hoạ (không đúng tỉ lệ)',12,'middle','sv-muted');
  return s+'</svg>';
}
/* Cây (cột) HT cao ?: quan sát từ hai điểm A, B thẳng hàng với chân cây H; AB = d, góc nhìn ngọn cây T là a (tại A) và b (tại B). */
function treeSVG(o={}){
  const T=(x,y,s,fs=16,anc='middle',cls='sv-txt')=>`<text class="${cls}" x="${x}" y="${y}" font-size="${fs}" text-anchor="${anc}" dominant-baseline="middle">${s}</text>`;
  const G=178,Ax=28,Bx=128,Hx=262,Ty=34, ang=(x)=>Math.atan2(G-Ty,Hx-x);
  const arc=(x,r,a2)=>`<path class="sv-tick" stroke-width="2.5" fill="none" d="M${x+r} ${G} A${r} ${r} 0 0 0 ${x+r*Math.cos(a2)} ${G-r*Math.sin(a2)}"/>`;
  let s=`<svg viewBox="0 0 320 224" role="img" aria-label="Quan sát ngọn cây từ hai vị trí">`;
  s+=`<line class="sv-axis" x1="8" y1="${G}" x2="312" y2="${G}"/><line class="sv-ink" stroke-width="3.5" x1="${Hx}" y1="${G}" x2="${Hx}" y2="${Ty+22}"/>`;
  s+=`<ellipse class="sv-part on" cx="${Hx}" cy="${Ty+22}" rx="26" ry="24"/>`;
  s+=`<line class="sv-ink" stroke-width="2" x1="${Ax}" y1="${G}" x2="${Hx}" y2="${Ty+22}"/><line class="sv-ink" stroke-width="2" x1="${Bx}" y1="${G}" x2="${Hx}" y2="${Ty+22}"/>`;
  const a1=Math.atan2(G-Ty-22,Hx-Ax), a2=Math.atan2(G-Ty-22,Hx-Bx);
  s+=arc(Ax,36,a1)+arc(Bx,30,a2);
  s+=`<circle class="sv-dot" cx="${Ax}" cy="${G}" r="4"/><circle class="sv-dot" cx="${Bx}" cy="${G}" r="4"/>`;
  s+=T(Ax,G+17,'A',16)+T(Bx,G+17,'B',16)+T(Hx,G+17,'H',16)+T(Hx+32,Ty+14,'T',16,'start');
  s+=`<path class="sv-ink" stroke-width="1.6" d="M${Ax} ${G+30} H${Bx} M${Ax} ${G+25} v10 M${Bx} ${G+25} v10"/>`+T((Ax+Bx)/2,G+46,o.d||'d',15);
  s+=(o.a?T(Ax+58,G-9,o.a,14):'')+(o.b?T(Bx+50,G-9,o.b,14):'')+T(Hx+12,(G+Ty+22)/2,o.h||'?',17,'start');
  return s+'</svg>';
}
/* Đường tròn ngoại tiếp tam giác ABC (đều nếu không cho o.pts=[góc A, góc B, góc C] theo độ, tâm O). o.R: nhãn bán kính. */
function circTriSVG(o={}){
  const T=(x,y,s,fs=17,anc='middle',cls='sv-txt')=>`<text class="${cls}" x="${x.toFixed(1)}" y="${y.toFixed(1)}" font-size="${fs}" text-anchor="${anc}" dominant-baseline="middle">${s}</text>`;
  const cx=160,cy=104,r=82, deg=o.pts||[90,210,330], n=o.n||['A','B','C'], P=deg.map(d=>[cx+r*Math.cos(d*Math.PI/180),cy-r*Math.sin(d*Math.PI/180)]);
  let s=`<svg viewBox="0 0 320 210" role="img" aria-label="Tam giác nội tiếp đường tròn"><circle class="sv-ink" stroke-width="2.5" cx="${cx}" cy="${cy}" r="${r}"/>`;
  s+=`<path class="sv-ink" stroke-width="3" stroke-linejoin="round" d="M${P[0]} L${P[1]} L${P[2]} Z"/>`;
  if(o.R){s+=`<line class="sv-ink" stroke-width="1.8" stroke-dasharray="5 4" x1="${cx}" y1="${cy}" x2="${P[1][0]}" y2="${P[1][1]}"/>`+T((cx+P[1][0])/2-6,(cy+P[1][1])/2+16,o.R,15,'end')}
  s+=`<circle class="sv-dot" cx="${cx}" cy="${cy}" r="4"/>`+T(cx+10,cy-10,'O',16);
  [[0,0,-14],[1,-14,12],[2,14,12]].forEach(([i,dx,dy])=>{s+=T(P[i][0]+dx,P[i][1]+dy,n[i],18)});
  if(o.side)s+=T((P[1][0]+P[2][0])/2,(P[1][1]+P[2][1])/2+16,o.side,15);
  return s+'</svg>';
}
