/* Kho câu hỏi Game củng cố – Lớp 8. Câu hỏi mức thông hiểu, bốn phương án. */
(() => {
const m=tm, ri=(r,a,b)=>a+Math.floor(r()*(b-a+1)), pick=(r,a)=>a[Math.floor(r()*a.length)];
const q=(text,answer,wrong,explain)=>({text,answer,wrong,explain});
const unique3=(good,items)=>[...new Set(items.filter(x=>x!==good))].slice(0,3);
Game.addTopic({
  id:'game-lop8-cung-co',grade:'lop8',icon:'🧩',group:'Toán 8 · Kết nối tri thức',
  name:'Củng cố Toán 8 – Hiểu bản chất',
  desc:'Đơn thức, đa thức, hằng đẳng thức, phân tích nhân tử và hình học cơ bản.',
  generate(r,i){const k=i%10;
    if(k===0){const a=ri(r,2,8),p=ri(r,1,5),qv=ri(r,1,5),degree=p+qv;return q(`Bậc của đơn thức ${m(`${a}x^{${p}}y^{${qv}}`)} là`,String(degree),unique3(String(degree),[String(p),String(qv),String(a),String(degree+1),String(degree-1)]),`Bậc của đơn thức bằng tổng số mũ của các biến: ${m(`${p}+${qv}=${degree}`)}.`)}
    if(k===1){const a=ri(r,2,6),b=ri(r,-5,5),x=ri(r,-3,4),good=a*x+b;return q(`Giá trị của ${m(`${a}x${b<0?b:'+'+b}`)} tại ${m(`x=${x}`)} là`,String(good),unique3(String(good),[String(a+b+x),String(a*x-b),String(good+a),String(good-1)]),`Thay ${m(`x=${x}`)}: ${m(`${a}\\cdot(${x})${b<0?b:'+'+b}=${good}`)}.`)}
    if(k===2){const a=ri(r,2,8),b=ri(r,2,8),c=ri(r,1,6),coef=a+b-c,good=m(`${coef}x`);return q(`Thu gọn ${m(`${a}x+${b}x-${c}x`)} được`,good,unique3(good,[m(`${a+b+c}x`),m(`${a-b-c}x`),m(`${coef}x^2`),m(`${coef+1}x`)]),`Các hạng tử đồng dạng nên cộng, trừ hệ số: ${m(`(${a}+${b}-${c})x=${coef}x`)}.`)}
    if(k===3){const a=ri(r,3,12),b=ri(r,2,9),good=a*a+2*a*b+b*b;return q(`Không khai triển dài, giá trị của ${m(`${a}^2+2\\cdot${a}\\cdot${b}+${b}^2`)} là`,String(good),unique3(String(good),[String(a*a+b*b),String((a-b)**2),String(good-2*a*b),String((a+b)*2)]),`Nhận ra hằng đẳng thức ${m('a^2+2ab+b^2=(a+b)^2')}. Do đó kết quả là ${m(`(${a}+${b})^2=${good}`)}.`)}
    if(k===4){const a=ri(r,2,7),b=ri(r,2,9),good=m(`(${a}x-${b})(${a}x+${b})`);return q(`Phân tích ${m(`${a*a}x^2-${b*b}`)} thành nhân tử được`,good,[m(`(${a}x-${b})^2`),m(`(${a}x+${b})^2`),m(`(${a*a}x-${b})(${a*a}x+${b})`)],`Dùng hiệu hai bình phương ${m('A^2-B^2=(A-B)(A+B)')} với ${m(`A=${a}x, B=${b}`)}.`)}
    if(k===5){const x=ri(r,-6,9),a=ri(r,2,7),b=ri(r,-8,8),c=a*x+b;return q(`Nghiệm của phương trình ${m(`${a}x${b<0?b:'+'+b}=${c}`)} là`,m(`x=${x}`),unique3(m(`x=${x}`),[m(`x=${x+1}`),m(`x=${x-1}`),m(`x=${c-b}`),m(`x=${-x}`)]),`Chuyển hạng tử tự do rồi chia hai vế cho ${a}: ${m(`${a}x=${c-b}`)}, nên ${m(`x=${x}`)}.`)}
    if(k===6){const triple=pick(r,[[3,4,5],[5,12,13],[6,8,10],[8,15,17]]),a=triple[0],b=triple[1],c=triple[2];return q(`Tam giác vuông có hai cạnh góc vuông dài ${a} cm và ${b} cm. Cạnh huyền dài`,m(`${c}\\text{ cm}`),[m(`${a+b}\\text{ cm}`),m(`${c-1}\\text{ cm}`),m(`${a*b}\\text{ cm}`)],`Theo định lí Pythagore: ${m(`c=\\sqrt{${a}^2+${b}^2}=${c}`)} cm.`)}
    if(k===7){const good='Hình chữ nhật';return q('Tứ giác có bốn góc vuông chắc chắn là',good,['Hình thoi','Hình bình hành nhưng không phải hình chữ nhật','Hình thang cân nhưng không phải hình chữ nhật'],'Tứ giác có bốn góc vuông là hình chữ nhật; hình chữ nhật cũng là một hình bình hành đặc biệt.')}
    if(k===8){const A=ri(r,4,12)*10,B=180-A;return q(`Hình bình hành ${m('ABCD')} có ${m(`\\widehat A=${A}^\\circ`)}. Số đo ${m('\\widehat B')} là`,m(`${B}^\\circ`),[m(`${A}^\\circ`),m(`${90-A/2}^\\circ`),m(`${360-A}^\\circ`)],`Hai góc kề của hình bình hành bù nhau: ${m(`\\widehat B=180^\\circ-${A}^\\circ=${B}^\\circ`)}.`)}
    const a=ri(r,-5,7),den=a<0?`x+${-a}`:`x-${a}`,good=m(`x\\ne${a}`);return q(`Điều kiện xác định của phân thức ${m(`\\dfrac{3}{${den}}`)} là`,good,[m(`x=${a}`),m(`x\\gt${a}`),m(`x\\lt${a}`)],`Mẫu thức phải khác 0: ${m(`${den}\\ne0`)}, do đó ${m(`x\\ne${a}`)}.`)
  }
});
})();
