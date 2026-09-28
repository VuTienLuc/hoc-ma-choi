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
   o.pts=[[x,y,label]]             chấm điểm có tên                                               */
let _hatchN=0;
function planeSVG(o={}){
  const [x0,x1]=o.x||[-1,6],[y0,y1]=o.y||[-1,6],u=Math.min(320/(x1-x0),320/(y1-y0)),W=(x1-x0)*u+40,H=(y1-y0)*u+40;
  const X=x=>20+(x-x0)*u, Y=y=>20+(y1-y)*u, id='hx'+(++_hatchN), st=(x1-x0)>14||(y1-y0)>14?2:1;
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
  for(let x=x0;x<=x1;x++)if(x&&x%st===0)s+=`<text class="sv-muted" x="${X(x)}" y="${Y(0)+15}" font-size="11" text-anchor="middle">${x}</text>`;
  for(let y=y0;y<=y1;y++)if(y&&y%st===0)s+=`<text class="sv-muted" x="${X(0)-5}" y="${Y(y)+4}" font-size="11" text-anchor="end">${y}</text>`;
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
