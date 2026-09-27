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
function rectSVG(){return `<svg viewBox="0 0 320 200" role="img" aria-label="Hình chữ nhật ABCD"><rect class="sv-ink" stroke-width="3" x="50" y="40" width="220" height="120"/>
 <path class="sv-ink" stroke-width="2" d="M50 56 h16 v-16 M254 40 v16 h16 M270 144 h-16 v16 M66 160 v-16 h-16"/>
 <text class="sv-txt" x="30" y="36" font-size="19">A</text><text class="sv-txt" x="276" y="36" font-size="19">B</text><text class="sv-txt" x="276" y="182" font-size="19">C</text><text class="sv-txt" x="28" y="182" font-size="19">D</text></svg>`}
function shapeSVG(kind){const pts={'Hình bình hành':'60,160 110,50 290,50 240,160','Hình thoi':'160,20 250,100 160,180 70,100','Hình chữ nhật':'50,50 270,50 270,150 50,150','Hình vuông':'95,35 225,35 225,165 95,165'}[kind];
 return `<svg viewBox="0 0 320 200" role="img" aria-label="Một hình tứ giác"><polygon class="sv-ink" stroke-width="3.5" points="${pts}" style="fill:var(--primary-soft)"/></svg>`}
