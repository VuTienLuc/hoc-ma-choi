/* Câu hỏi NGOÀI do thầy nhập (JSON) cho Ngân hàng Thử thách – Toán 10. TỆP SINH TỰ ĐỘNG bởi tools/nhap-cau-hoi.py: đừng sửa tay, chạy lại lệnh để thêm câu.
   Mỗi câu là một mẫu cố định; cùng với các mẫu sinh số ngẫu nhiên trong data/thu-thach-bank-*.js, chúng tham gia đề “Thử thách hôm nay”, “Bốc bộ hôm nay” và “Bốc câu”. */
(() => {
  const D = [
   {
    "kind": "mc",
    "level": "Nhận biết",
    "q": "Khẳng định nào sau đây KHÔNG đúng đối với hai góc bù nhau \\(\\alpha\\) và \\(\\beta\\) (tức là \\(\\alpha + \\beta = 180^{\\circ}\\))?",
    "opts": [
     "\\(\\tan \\alpha = \\tan \\beta\\)",
     "\\(\\sin \\alpha = \\sin \\beta\\)",
     "\\(\\cos \\alpha = -\\cos \\beta\\)",
     "\\(\\cot \\alpha = -\\cot \\beta\\)"
    ],
    "sol": "<p>Hai góc bù nhau có sin bằng nhau, các giá trị lượng giác còn lại đối nhau</p><p>Do đó \\(\\tan \\alpha = -\\tan \\beta\\)</p><p>Chọn C.</p>",
    "chuong": "III"
   },
   {
    "kind": "mc",
    "level": "Nhận biết",
    "q": "Giá trị của biểu thức \\(P = \\sin 30^{\\circ} + \\cos 60^{\\circ}\\) bằng:",
    "opts": [
     "\\(1\\)",
     "\\(\\sqrt{3}\\)",
     "\\(\\dfrac{\\sqrt{3}}{2}\\)",
     "\\(0\\)"
    ],
    "sol": "<p>Ta có \\(\\sin 30^{\\circ} = \\dfrac{1}{2}\\) và \\(\\cos 60^{\\circ} = \\dfrac{1}{2}\\)</p><p>Suy ra \\(P = \\dfrac{1}{2} + \\dfrac{1}{2} = 1\\)</p><p>Chọn A.</p>",
    "chuong": "III"
   },
   {
    "kind": "mc",
    "level": "Thông hiểu",
    "q": "Tính giá trị của biểu thức \\(A = \\sin^2 45^{\\circ} + \\cos^2 135^{\\circ}\\).",
    "opts": [
     "\\(1\\)",
     "\\(\\dfrac{1}{2}\\)",
     "\\(\\sqrt{2}\\)",
     "\\(0\\)"
    ],
    "sol": "<p>Ta có \\(\\sin 45^{\\circ} = \\dfrac{\\sqrt{2}}{2}\\) và \\(\\cos 135^{\\circ} = -\\dfrac{\\sqrt{2}}{2}\\)</p><p>Suy ra \\(A = \\left(\\dfrac{\\sqrt{2}}{2}\\right)^2 + \\left(-\\dfrac{\\sqrt{2}}{2}\\right)^2 = \\dfrac{1}{2} + \\dfrac{1}{2} = 1\\)</p><p>Chọn B.</p>",
    "chuong": "III"
   },
   {
    "kind": "mc",
    "level": "Thông hiểu",
    "q": "Một tấm mái che được thiết kế nghiêng góc \\(\\alpha\\) so với mặt phẳng ngang. Biết \\(\\cos \\alpha = \\dfrac{1}{2}\\) và \\(0^{\\circ} \\lt  \\alpha \\lt  90^{\\circ}\\). Góc nghiêng \\(\\alpha\\) của mái che là:",
    "opts": [
     "\\(60^{\\circ}\\)",
     "\\(30^{\\circ}\\)",
     "\\(45^{\\circ}\\)",
     "\\(90^{\\circ}\\)"
    ],
    "sol": "<p>Sử dụng bảng giá trị lượng giác của các góc đặc biệt</p><p>Do \\(\\cos 60^{\\circ} = \\dfrac{1}{2}\\) và \\(0^{\\circ} \\lt  60^{\\circ} \\lt  90^{\\circ}\\)</p><p>Suy ra \\(\\alpha = 60^{\\circ}\\)</p><p>Chọn C.</p>",
    "chuong": "III"
   },
   {
    "kind": "mc",
    "level": "Thông hiểu",
    "q": "Cho góc \\(\\alpha\\) tù thỏa mãn \\(\\sin \\alpha = \\dfrac{3}{5}\\). Giá trị của \\(\\cos \\alpha\\) là:",
    "opts": [
     "\\(-\\dfrac{4}{5}\\)",
     "\\(\\dfrac{4}{5}\\)",
     "\\(\\dfrac{16}{25}\\)",
     "\\(-\\dfrac{16}{25}\\)"
    ],
    "sol": "<p>Áp dụng công thức \\(\\sin^2 \\alpha + \\cos^2 \\alpha = 1\\) ta có \\(\\cos^2 \\alpha = 1 - \\left(\\dfrac{3}{5}\\right)^2 = \\dfrac{16}{25}\\)</p><p>Vì \\(\\alpha\\) là góc tù nên \\(\\cos \\alpha \\lt  0\\)</p><p>Vậy \\(\\cos \\alpha = -\\dfrac{4}{5}\\)</p><p>Chọn B.</p>",
    "chuong": "III"
   },
   {
    "kind": "mc",
    "level": "Vận dụng",
    "q": "Sự phụ thuộc của cường độ sáng và góc tới của mặt trời được mô hình hóa qua góc \\(\\alpha\\). Biết \\(\\tan \\alpha = 2\\), tính giá trị của biểu thức \\(M = \\dfrac{2\\sin \\alpha + \\cos \\alpha}{\\sin \\alpha - \\cos \\alpha}\\).",
    "opts": [
     "\\(5\\)",
     "\\(-5\\)",
     "\\(3\\)",
     "\\(4\\)"
    ],
    "sol": "<p>Do \\(\\tan \\alpha = 2\\) nên \\(\\cos \\alpha \\neq 0\\). Chia cả tử và mẫu của \\(M\\) cho \\(\\cos \\alpha\\)</p><p>\\(M = \\dfrac{2\\tan \\alpha + 1}{\\tan \\alpha - 1}\\)</p><p>Thay \\(\\tan \\alpha = 2\\) vào ta được \\(M = \\dfrac{2(2) + 1}{2 - 1} = 5\\)</p><p>Chọn D.</p>",
    "chuong": "III"
   },
   {
    "kind": "mc",
    "level": "Vận dụng",
    "q": "Cho tam giác vuông cân \\(ABC\\) vuông tại \\(A\\). Gọi \\(M\\) là trung điểm của cạnh \\(AC\\). Giá trị của \\(\\cos \\widehat{BMC}\\) bằng:",
    "opts": [
     "\\(-\\dfrac{1}{\\sqrt{5}}\\)",
     "\\(-\\dfrac{2}{\\sqrt{5}}\\)",
     "\\(\\dfrac{1}{\\sqrt{5}}\\)",
     "\\(\\dfrac{2}{\\sqrt{5}}\\)"
    ],
    "sol": "<p>Giả sử \\(AB = AC = 2a\\), suy ra \\(AM = a\\). Xét tam giác \\(ABM\\) vuông tại \\(A\\), có \\(BM = \\sqrt{AB^2 + AM^2} = a\\sqrt{5}\\)</p><p>Ta có \\(\\cos \\widehat{AMB} = \\dfrac{AM}{BM} = \\dfrac{a}{a\\sqrt{5}} = \\dfrac{1}{\\sqrt{5}}\\)</p><p>Vì \\(\\widehat{BMC}\\) và \\(\\widehat{AMB}\\) là hai góc kề bù nên \\(\\cos \\widehat{BMC} = -\\cos \\widehat{AMB} = -\\dfrac{1}{\\sqrt{5}}\\)</p><p>Chọn A.</p>",
    "chuong": "III"
   },
   {
    "kind": "mc",
    "level": "Vận dụng",
    "q": "Lực kéo \\(\\overrightarrow{F}\\) tác dụng lên một vật làm vật di chuyển theo phương ngang. Công của lực kéo được tính bằng công thức \\(A = F \\cdot s \\cdot \\cos \\alpha\\), trong đó \\(\\alpha\\) là góc tạo bởi lực kéo và phương ngang. Nếu tăng góc \\(\\alpha\\) từ \\(30^{\\circ}\\) lên \\(60^{\\circ}\\) thì lượng công sinh ra sẽ thay đổi như thế nào (giả sử độ lớn lực \\(F\\) và quãng đường \\(s\\) không đổi)?",
    "opts": [
     "Giảm đi \\(\\sqrt{3}\\) lần",
     "Tăng lên \\(\\sqrt{3}\\) lần",
     "Giảm đi \\(2\\) lần",
     "Tăng lên \\(2\\) lần"
    ],
    "sol": "<p>Công ban đầu: \\(A_1 = F \\cdot s \\cdot \\cos 30^{\\circ} = F \\cdot s \\cdot \\dfrac{\\sqrt{3}}{2}\\)</p><p>Công lúc sau: \\(A_2 = F \\cdot s \\cdot \\cos 60^{\\circ} = F \\cdot s \\cdot \\dfrac{1}{2}\\)</p><p>Lập tỉ số: \\(\\dfrac{A_2}{A_1} = \\dfrac{1}{\\sqrt{3}}\\), tức là công giảm đi \\(\\sqrt{3}\\) lần</p><p>Chọn B.</p>",
    "chuong": "III"
   },
   {
    "kind": "mc",
    "level": "Nhận biết",
    "q": "Cho tam giác \\(ABC\\) có các cạnh lần lượt là \\(a, b, c\\) và bán kính đường tròn ngoại tiếp \\(R\\). Mệnh đề nào sau đây ĐÚNG?",
    "opts": [
     "\\(\\dfrac{a}{\\sin A} = 2R\\)",
     "\\(\\dfrac{a}{\\sin A} = R\\)",
     "\\(\\dfrac{a}{\\sin A} = \\dfrac{R}{2}\\)",
     "\\(\\dfrac{a}{\\sin A} = 4R\\)"
    ],
    "sol": "<p>Theo định lí sin trong tam giác, ta có \\(\\dfrac{a}{\\sin A} = \\dfrac{b}{\\sin B} = \\dfrac{c}{\\sin C} = 2R\\)</p><p>Do đó \\(\\dfrac{a}{\\sin A} = 2R\\) là mệnh đề đúng</p><p>Chọn A.</p>",
    "chuong": "III"
   },
   {
    "kind": "mc",
    "level": "Thông hiểu",
    "q": "Cho tam giác \\(ABC\\) có \\(AB = 5\\), \\(AC = 8\\) và \\(\\widehat{A} = 60^{\\circ}\\). Độ dài cạnh \\(BC\\) là:",
    "opts": [
     "\\(7\\)",
     "\\(\\sqrt{39}\\)",
     "\\(\\sqrt{89}\\)",
     "\\(49\\)"
    ],
    "sol": "<p>Áp dụng định lí côsin: \\(BC^2 = AB^2 + AC^2 - 2AB \\cdot AC \\cdot \\cos A\\)</p><p>\\(BC^2 = 5^2 + 8^2 - 2 \\cdot 5 \\cdot 8 \\cdot \\cos 60^{\\circ} = 25 + 64 - 80 \\cdot \\dfrac{1}{2} = 49\\)</p><p>Suy ra \\(BC = 7\\)</p><p>Chọn B.</p>",
    "chuong": "III"
   },
   {
    "kind": "mc",
    "level": "Thông hiểu",
    "q": "Một khu vườn hình tam giác có độ dài hai cạnh là \\(10\\text{ m}\\) và \\(12\\text{ m}\\), góc xen giữa hai cạnh đó là \\(150^{\\circ}\\). Diện tích của khu vườn là:",
    "opts": [
     "\\(30\\text{ m}^2\\)",
     "\\(30\\sqrt{3}\\text{ m}^2\\)",
     "\\(60\\text{ m}^2\\)",
     "\\(60\\sqrt{3}\\text{ m}^2\\)"
    ],
    "sol": "<p>Áp dụng công thức tính diện tích tam giác: \\(S = \\dfrac{1}{2}ab \\sin C\\)</p><p>Thay số: \\(S = \\dfrac{1}{2} \\cdot 10 \\cdot 12 \\cdot \\sin 150^{\\circ}\\)</p><p>\\(S = 60 \\cdot \\dfrac{1}{2} = 30\\text{ m}^2\\)</p><p>Chọn A.</p>",
    "chuong": "III"
   },
   {
    "kind": "mc",
    "level": "Thông hiểu",
    "q": "Một mảnh đất hình tam giác có độ dài ba cạnh là \\(6\\text{ m}\\), \\(8\\text{ m}\\) và \\(10\\text{ m}\\). Người ta muốn làm một bồn hoa hình tròn nội tiếp mảnh đất đó. Bán kính của bồn hoa là:",
    "opts": [
     "\\(2\\text{ m}\\)",
     "\\(1\\text{ m}\\)",
     "\\(1{,}5\\text{ m}\\)",
     "\\(2{,}4\\text{ m}\\)"
    ],
    "sol": "<p>Nửa chu vi tam giác: \\(p = \\dfrac{6+8+10}{2} = 12\\text{ m}\\)</p><p>Diện tích tam giác tính theo công thức Heron: \\(S = \\sqrt{12(12-6)(12-8)(12-10)} = \\sqrt{576} = 24\\text{ m}^2\\)</p><p>Bán kính đường tròn nội tiếp: \\(r = \\dfrac{S}{p} = \\dfrac{24}{12} = 2\\text{ m}\\)</p><p>Chọn C.</p>",
    "chuong": "III"
   },
   {
    "kind": "mc",
    "level": "Thông hiểu",
    "q": "Cho tam giác \\(ABC\\) có \\(a = 7\\), \\(b = 8\\), \\(c = 5\\). Số đo của góc \\(\\widehat{A}\\) là:",
    "opts": [
     "\\(60^{\\circ}\\)",
     "\\(30^{\\circ}\\)",
     "\\(45^{\\circ}\\)",
     "\\(120^{\\circ}\\)"
    ],
    "sol": "<p>Áp dụng hệ quả của định lí côsin: \\(\\cos A = \\dfrac{b^2 + c^2 - a^2}{2bc}\\)</p><p>\\(\\cos A = \\dfrac{8^2 + 5^2 - 7^2}{2 \\cdot 8 \\cdot 5} = \\dfrac{64 + 25 - 49}{80} = \\dfrac{40}{80} = \\dfrac{1}{2}\\)</p><p>Suy ra \\(\\widehat{A} = 60^{\\circ}\\)</p><p>Chọn C.</p>",
    "chuong": "III"
   },
   {
    "kind": "mc",
    "level": "Vận dụng",
    "q": "Hai chiếc tàu thủy cùng xuất phát từ một vị trí \\(O\\), đi thẳng theo hai hướng tạo với nhau góc \\(120^{\\circ}\\). Tàu \\(A\\) chạy với tốc độ \\(20\\text{ hải lý/giờ}\\), tàu \\(B\\) chạy với tốc độ \\(15\\text{ hải lý/giờ}\\). Sau \\(2\\text{ giờ}\\), khoảng cách giữa hai tàu là bao nhiêu (làm tròn đến hàng phần mười)?",
    "opts": [
     "\\(60{,}8\\text{ hải lý}\\)",
     "\\(62\\text{ hải lý}\\)",
     "\\(30{,}4\\text{ hải lý}\\)",
     "\\(45\\text{ hải lý}\\)"
    ],
    "sol": "<p>Sau \\(2\\text{ giờ}\\), quãng đường các tàu đi được là: \\(OA = 20 \\cdot 2 = 40\\text{ hải lý}\\), \\(OB = 15 \\cdot 2 = 30\\text{ hải lý}\\)</p><p>Khoảng cách hai tàu là độ dài đoạn \\(AB\\). Theo định lí côsin: \\(AB^2 = OA^2 + OB^2 - 2OA \\cdot OB \\cdot \\cos 120^{\\circ}\\)</p><p>\\(AB^2 = 40^2 + 30^2 - 2 \\cdot 40 \\cdot 30 \\cdot \\left(-\\dfrac{1}{2}\\right) = 1600 + 900 + 1200 = 3700\\)</p><p>\\(AB = \\sqrt{3700} \\approx 60{,}8\\text{ hải lý}\\)</p><p>Chọn D.</p>",
    "chuong": "III"
   },
   {
    "kind": "mc",
    "level": "Vận dụng",
    "q": "Để đo chiều cao của một ngọn tháp, người ta chọn hai điểm \\(A\\) và \\(B\\) trên mặt đất sao cho \\(A, B\\) và chân tháp thẳng hàng, khoảng cách \\(AB = 20\\text{ m}\\). Góc nhìn từ \\(A\\) và \\(B\\) lên đỉnh tháp lần lượt là \\(45^{\\circ}\\) và \\(60^{\\circ}\\) (hai điểm \\(A, B\\) nằm cùng một phía so với chân tháp). Chiều cao của tháp (làm tròn đến hàng phần mười) là:",
    "opts": [
     "\\(47{,}3\\text{ m}\\)",
     "\\(27{,}3\\text{ m}\\)",
     "\\(34{,}6\\text{ m}\\)",
     "\\(54{,}6\\text{ m}\\)"
    ],
    "sol": "<p>Gọi \\(C\\) là đỉnh tháp, \\(H\\) là chân tháp, đặt \\(CH = h\\). Trong các tam giác vuông \\(CAH\\) và \\(CBH\\), ta có: \\(AH = \\dfrac{h}{\\tan 45^{\\circ}} = h\\); \\(BH = \\dfrac{h}{\\tan 60^{\\circ}} = \\dfrac{h}{\\sqrt{3}}\\)</p><p>Ta có \\(AB = AH - BH \\Rightarrow h - \\dfrac{h}{\\sqrt{3}} = 20\\)</p><p>Suy ra \\(h = \\dfrac{20\\sqrt{3}}{\\sqrt{3}-1} \\approx 47{,}3\\text{ m}\\)</p><p>Chọn D.</p>",
    "chuong": "III"
   },
   {
    "kind": "mc",
    "level": "Nhận biết",
    "q": "Trong các bất phương trình sau, bất phương trình nào KHÔNG PHẢI là bất phương trình bậc nhất hai ẩn?",
    "opts": [
     "\\(x^2+y\\gt 0\\)",
     "\\(x-y\\lt 0\\)",
     "\\(x+3y-5 \\ge 0\\)",
     "\\(2x-5y+1 \\le 0\\)"
    ],
    "sol": "<p>Bất phương trình bậc nhất hai ẩn có dạng \\(ax+by+c\\lt 0\\) (hoặc \\(\\le, \\gt , \\ge\\)) với \\(a, b\\) không đồng thời bằng 0</p><p>\\(x^2+y\\gt 0\\) chứa \\(x^2\\) nên không phải bậc nhất hai ẩn</p><p>Chọn A.</p>",
    "chuong": "II"
   },
   {
    "kind": "mc",
    "level": "Nhận biết",
    "q": "Hệ bất phương trình nào sau đây là hệ bất phương trình bậc nhất hai ẩn?",
    "opts": [
     "\\(\\begin{cases} x\\gt 0 \\\\ x+y\\lt 1 \\end{cases}\\)",
     "\\(\\begin{cases} x^2+y\\gt 0 \\\\ x+y\\lt 1 \\end{cases}\\)",
     "\\(\\begin{cases} xy+x\\lt 0 \\\\ y\\gt 0 \\end{cases}\\)",
     "\\(\\begin{cases} x\\gt 0 \\\\ y^2\\lt 1 \\end{cases}\\)"
    ],
    "sol": "<p>Hệ bậc nhất hai ẩn gồm các bất phương trình bậc nhất hai ẩn</p><p>Bất phương trình \\(x^2+y\\gt 0\\) và \\(xy+x\\lt 0\\) không phải bậc nhất</p><p>Hệ C gồm \\(x\\gt 0\\) và \\(x+y\\lt 1\\) đều là bậc nhất hai ẩn</p><p>Chọn C.</p>",
    "chuong": "II"
   },
   {
    "kind": "mc",
    "level": "Thông hiểu",
    "q": "Điểm \\(M(0;1)\\) thuộc miền nghiệm của bất phương trình nào sau đây?",
    "opts": [
     "\\(x+3y-2\\gt 0\\)",
     "\\(2x+y-3\\gt 0\\)",
     "\\(x-y+1\\lt 0\\)",
     "\\(-x+2y-5\\gt 0\\)"
    ],
    "sol": "<p>Thay \\((0;1)\\) vào \\(x+3y-2\\gt 0\\) được \\(0+3(1)-2=1\\gt 0\\) (đúng)</p><p>Thay vào \\(2x+y-3\\gt 0\\) được \\(0+1-3=-2\\gt 0\\) (sai)</p><p>Thay vào \\(x-y+1\\lt 0\\) được \\(0-1+1=0\\lt 0\\) (sai)</p><p>Thay vào \\(-x+2y-5\\gt 0\\) được \\(-0+2(1)-5=-3\\gt 0\\) (sai)</p><p>Chọn A.</p>",
    "chuong": "II"
   },
   {
    "kind": "mc",
    "level": "Thông hiểu",
    "q": "Cặp số nào sau đây KHÔNG PHẢI là nghiệm của bất phương trình \\(2x-y+1 \\ge 0\\)?",
    "opts": [
     "\\((-1;1)\\)",
     "\\((-1;-1)\\)",
     "\\((0;0)\\)",
     "\\((1;2)\\)"
    ],
    "sol": "<p>Thay \\((-1;-1)\\) vào \\(2x-y+1\\) được \\(2(-1)-(-1)+1=0 \\ge 0\\) (đúng)</p><p>Thay \\((-1;1)\\) vào được \\(2(-1)-1+1=-2 \\ge 0\\) (sai)</p><p>Thay \\((0;0)\\) vào được \\(1 \\ge 0\\) (đúng)</p><p>Thay \\((1;2)\\) vào được \\(2(1)-2+1=1 \\ge 0\\) (đúng)</p><p>Chọn B.</p>",
    "chuong": "II"
   },
   {
    "kind": "mc",
    "level": "Thông hiểu",
    "q": "Điểm nào sau đây thuộc miền nghiệm của hệ bất phương trình \\(\\begin{cases} 2x-y+1\\gt 0 \\\\ x+y-2\\lt 0 \\end{cases}\\)?",
    "opts": [
     "\\((0;0)\\)",
     "\\((-1;1)\\)",
     "\\((1;2)\\)",
     "\\((2;1)\\)"
    ],
    "sol": "<p>Thay \\((1;2)\\) vào hệ: \\(2(1)-2+1=1\\gt 0\\) và \\(1+2-2=1\\lt 0\\) (sai)</p><p>Thay \\((2;1)\\) vào hệ: \\(2(2)-1+1=4\\gt 0\\) và \\(2+1-2=1\\lt 0\\) (sai)</p><p>Thay \\((0;0)\\) vào hệ: \\(2(0)-0+1=1\\gt 0\\) và \\(0+0-2=-2\\lt 0\\) (đúng)</p><p>Thay \\((-1;1)\\) vào hệ: \\(2(-1)-1+1=-2\\gt 0\\) (sai)</p><p>Chọn C.</p>",
    "chuong": "II"
   },
   {
    "kind": "mc",
    "level": "Thông hiểu",
    "q": "Miền nghiệm của hệ bất phương trình \\(\\begin{cases} x-y\\gt 0 \\\\ x+2y\\lt 3 \\end{cases}\\) chứa điểm nào sau đây?",
    "opts": [
     "\\((2;0)\\)",
     "\\((-2;2)\\)",
     "\\((-1;-1)\\)",
     "\\((1;1)\\)"
    ],
    "sol": "<p>Thay \\((-1;-1)\\) vào hệ: \\(-1-(-1)=0\\gt 0\\) (sai)</p><p>Thay \\((1;1)\\) vào hệ: \\(1-1=0\\gt 0\\) (sai)</p><p>Thay \\((-2;2)\\) vào hệ: \\(-2-2=-4\\gt 0\\) (sai)</p><p>Thay \\((2;0)\\) vào hệ: \\(2-0=2\\gt 0\\) và \\(2+2(0)=2\\lt 3\\) (đúng)</p><p>Chọn D.</p>",
    "chuong": "II"
   },
   {
    "kind": "mc",
    "level": "Vận dụng",
    "q": "Một xưởng mộc có \\(100\\text{ kg}\\) gỗ và \\(40\\text{ giờ}\\) công lao động để sản xuất hai loại bàn. Một bàn loại 1 cần \\(10\\text{ kg}\\) gỗ và \\(5\\text{ giờ}\\) công, cho lãi \\(300\\,000\\) đồng. Một bàn loại 2 cần \\(20\\text{ kg}\\) gỗ và \\(4\\text{ giờ}\\) công, cho lãi \\(400\\,000\\) đồng. Gọi \\(x\\) và \\(y\\) lần lượt là số bàn loại 1 và loại 2 xưởng sản xuất \\((x, y \\ge 0)\\). Hệ bất phương trình mô tả các điều kiện bài toán là:",
    "opts": [
     "\\(\\begin{cases} x \\ge 0; y \\ge 0 \\\\ x+2y \\le 10 \\\\ 5x+4y \\le 40 \\end{cases}\\)",
     "\\(\\begin{cases} x \\ge 0; y \\ge 0 \\\\ 10x+5y \\le 100 \\\\ 20x+4y \\le 40 \\end{cases}\\)",
     "\\(\\begin{cases} x \\ge 0; y \\ge 0 \\\\ 10x+20y \\le 40 \\\\ 5x+4y \\le 100 \\end{cases}\\)",
     "\\(\\begin{cases} x \\ge 0; y \\ge 0 \\\\ x+2y \\ge 10 \\\\ 5x+4y \\ge 40 \\end{cases}\\)"
    ],
    "sol": "<p>Lượng gỗ cần dùng là \\(10x + 20y\\text{ kg}\\). Vì xưởng có \\(100\\text{ kg}\\) gỗ nên \\(10x+20y \\le 100 \\Leftrightarrow x+2y \\le 10\\)</p><p>Số giờ công cần dùng là \\(5x+4y\\). Vì xưởng có \\(40\\text{ giờ}\\) công nên \\(5x+4y \\le 40\\)</p><p>Điều kiện \\(x \\ge 0, y \\ge 0\\)</p><p>Chọn D.</p>",
    "chuong": "II"
   },
   {
    "kind": "mc",
    "level": "Vận dụng",
    "q": "Một cửa hàng bán hai loại bánh A và B. Biết để làm một cái bánh loại A cần \\(0{,}2\\text{ kg}\\) bột và \\(0{,}1\\text{ kg}\\) đường; bánh loại B cần \\(0{,}1\\text{ kg}\\) bột và \\(0{,}2\\text{ kg}\\) đường. Cửa hàng hiện có sẵn \\(20\\text{ kg}\\) bột và \\(10\\text{ kg}\\) đường. Gọi \\(x, y\\) lần lượt là số lượng bánh loại A và B cần làm. Bất phương trình nào sau đây là MỘT TRONG CÁC điều kiện ràng buộc của \\(x, y\\)?",
    "opts": [
     "\\(x+2y \\le 100\\)",
     "\\(x+2y \\ge 100\\)",
     "\\(2x+y \\le 100\\)",
     "\\(2x+y \\ge 200\\)"
    ],
    "sol": "<p>Tổng lượng bột cần dùng là \\(0{,}2x + 0{,}1y\\). Do cửa hàng có \\(20\\text{ kg}\\) bột nên \\(0{,}2x + 0{,}1y \\le 20 \\Leftrightarrow 2x+y \\le 200\\)</p><p>Tổng lượng đường cần dùng là \\(0{,}1x + 0{,}2y\\). Do cửa hàng có \\(10\\text{ kg}\\) đường nên \\(0{,}1x + 0{,}2y \\le 10 \\Leftrightarrow x+2y \\le 100\\)</p><p>Xét các phương án, chỉ có \\(x+2y \\le 100\\) đúng</p><p>Chọn B.</p>",
    "chuong": "II"
   },
   {
    "kind": "mc",
    "level": "Nhận biết",
    "q": "Trong các câu dưới đây, câu nào là mệnh đề toán học?",
    "opts": [
     "\\(17\\) là một số nguyên tố.",
     "Bạn có chăm học không?",
     "\\(\\text{Ở đây đẹp quá!}\\)",
     "\\(\\text{Đi ngủ đi!}\\)"
    ],
    "sol": "<p>Mệnh đề toán học là một khẳng định về sự kiện trong toán học có tính đúng hoặc sai</p><p>Các câu cảm thán, câu hỏi không phải mệnh đề</p><p>Khẳng định \"17 là một số nguyên tố\" là một mệnh đề toán học đúng</p><p>Chọn A.</p>",
    "chuong": "I"
   },
   {
    "kind": "mc",
    "level": "Nhận biết",
    "q": "Mệnh đề phủ định của mệnh đề \\(P: \\forall x \\in \\mathbb{R}, x^2+1\\gt 0\\) là mệnh đề nào sau đây?",
    "opts": [
     "\\(\\exists x \\in \\mathbb{R}, x^2+1 \\le 0\\)",
     "\\(\\forall x \\in \\mathbb{R}, x^2+1 \\le 0\\)",
     "\\(\\exists x \\in \\mathbb{R}, x^2+1 \\lt  0\\)",
     "\\(\\exists x \\in \\mathbb{R}, x^2+1 \\ge 0\\)"
    ],
    "sol": "<p>Phủ định của lượng từ \"\\(\\forall\\)\" là lượng từ \"\\(\\exists\\)\"</p><p>Phủ định của \"\\(\\gt \\)\" là \"\\(\\le\\)\"</p><p>Do đó, \\(\\overline{P}: \\exists x \\in \\mathbb{R}, x^2+1 \\le 0\\)</p><p>Chọn B.</p>",
    "chuong": "I"
   },
   {
    "kind": "mc",
    "level": "Thông hiểu",
    "q": "Mệnh đề đảo của mệnh đề \\(P \\Rightarrow Q\\) là mệnh đề nào sau đây?",
    "opts": [
     "\\(Q \\Rightarrow P\\)",
     "\\(\\overline{P} \\Rightarrow Q\\)",
     "\\(\\overline{Q} \\Rightarrow \\overline{P}\\)",
     "\\(P \\Leftrightarrow Q\\)"
    ],
    "sol": "<p>Mệnh đề đảo của mệnh đề \\(P \\Rightarrow Q\\) là mệnh đề \\(Q \\Rightarrow P\\)</p><p>Chọn C.</p>",
    "chuong": "I"
   },
   {
    "kind": "mc",
    "level": "Thông hiểu",
    "q": "Cho mệnh đề chứa biến \\(P(x): 2x+10 \\le x^2\\). Khẳng định nào sau đây là ĐÚNG?",
    "opts": [
     "Mệnh đề \\(P(7)\\) đúng.",
     "Mệnh đề \\(P(4)\\) đúng.",
     "Mệnh đề \\(P(0)\\) đúng.",
     "Mệnh đề \\(P(3)\\) đúng."
    ],
    "sol": "<p>Thay \\(x=4\\) vào \\(P(x)\\) ta được \\(2(4)+10 \\le 4^2 \\Leftrightarrow 18 \\le 16\\) (sai)</p><p>Thay \\(x=7\\) vào \\(P(x)\\) ta được \\(2(7)+10 \\le 7^2 \\Leftrightarrow 24 \\le 49\\) (đúng)</p><p>Thay \\(x=0\\) vào \\(P(x)\\) ta được \\(10 \\le 0\\) (sai)</p><p>Thay \\(x=3\\) vào \\(P(x)\\) ta được \\(16 \\le 9\\) (sai)</p><p>Chọn D.</p>",
    "chuong": "I"
   },
   {
    "kind": "mc",
    "level": "Thông hiểu",
    "q": "Cho hai mệnh đề: \\(P\\): \"Hai tam giác bằng nhau\"; \\(Q\\): \"Hai tam giác có diện tích bằng nhau\". Phát biểu mệnh đề \\(P \\Rightarrow Q\\) dưới dạng điều kiện đủ là:",
    "opts": [
     "Hai tam giác bằng nhau là điều kiện đủ để diện tích của chúng bằng nhau.",
     "Hai tam giác bằng nhau là điều kiện cần để diện tích của chúng bằng nhau.",
     "Hai tam giác có diện tích bằng nhau là điều kiện đủ để hai tam giác đó bằng nhau.",
     "Hai tam giác có diện tích bằng nhau là điều kiện cần và đủ để hai tam giác đó bằng nhau."
    ],
    "sol": "<p>Mệnh đề \\(P \\Rightarrow Q\\) được phát biểu là: \"\\(P\\) là điều kiện đủ để có \\(Q\\)\"</p><p>Áp dụng vào bài: \"Hai tam giác bằng nhau là điều kiện đủ để diện tích của chúng bằng nhau\"</p><p>Chọn A.</p>",
    "chuong": "I"
   },
   {
    "kind": "mc",
    "level": "Vận dụng",
    "q": "Có bao nhiêu giá trị nguyên của \\(x\\) để mệnh đề \\(Q(x): x^2-4x+3 \\lt  0\\) là mệnh đề đúng?",
    "opts": [
     "\\(1\\)",
     "\\(0\\)",
     "\\(2\\)",
     "\\(3\\)"
    ],
    "sol": "<p>Ta có \\(x^2-4x+3 \\lt  0 \\Leftrightarrow (x-1)(x-3) \\lt  0\\)</p><p>Giải bất phương trình ta được \\(1 \\lt  x \\lt  3\\)</p><p>Vì \\(x \\in \\mathbb{Z}\\) nên \\(x = 2\\)</p><p>Vậy có duy nhất \\(1\\) giá trị nguyên thỏa mãn</p><p>Chọn B.</p>",
    "chuong": "I"
   },
   {
    "kind": "mc",
    "level": "Nhận biết",
    "q": "Kí hiệu nào sau đây thể hiện \"\\(\\text{3 là một số tự nhiên}\\) \"?",
    "opts": [
     "\\(3 \\in \\mathbb{N}\\)",
     "\\(3 \\subset \\mathbb{N}\\)",
     "\\(3 \\notin \\mathbb{N}\\)",
     "\\(\\{3\\} \\in \\mathbb{N}\\)"
    ],
    "sol": "<p>Để chỉ một phần tử thuộc một tập hợp, ta dùng kí hiệu \"\\(\\in\\)\"</p><p>Vậy \"\\(3\\) là một số tự nhiên\" được viết là \\(3 \\in \\mathbb{N}\\)</p><p>Chọn C.</p>",
    "chuong": "I"
   },
   {
    "kind": "mc",
    "level": "Thông hiểu",
    "q": "Cho tập hợp \\(A=\\{1; 2; 3; 4; 5\\}\\) và \\(B=\\{1; 3; 5; 7; 9\\}\\). Tập hợp \\(A \\cap B\\) bằng:",
    "opts": [
     "\\(\\{1; 3; 5\\}\\)",
     "\\(\\{1; 2; 3; 4; 5; 7; 9\\}\\)",
     "\\(\\{2; 4\\}\\)",
     "\\(\\{7; 9\\}\\)"
    ],
    "sol": "<p>Tập hợp \\(A \\cap B\\) gồm các phần tử vừa thuộc \\(A\\) vừa thuộc \\(B\\)</p><p>Các phần tử chung là \\(1, 3, 5\\)</p><p>Do đó \\(A \\cap B = \\{1; 3; 5\\}\\)</p><p>Chọn D.</p>",
    "chuong": "I"
   },
   {
    "kind": "mc",
    "level": "Thông hiểu",
    "q": "Cho hai tập hợp \\(A=[-3; 5)\\) và \\(B=(-1; 7]\\). Xác định tập hợp \\(A \\cup B\\).",
    "opts": [
     "\\([-3; 7]\\)",
     "\\((-1; 5)\\)",
     "\\([-3; 7)\\)",
     "\\((-3; 7]\\)"
    ],
    "sol": "<p>Biểu diễn hai tập hợp trên trục số</p><p>Tập hợp \\(A \\cup B\\) gồm các phần tử thuộc \\(A\\) hoặc thuộc \\(B\\)</p><p>Lấy hợp của \\([-3; 5)\\) và \\((-1; 7]\\) ta được \\([-3; 7]\\)</p><p>Chọn A.</p>",
    "chuong": "I"
   },
   {
    "kind": "mc",
    "level": "Thông hiểu",
    "q": "Cho tập hợp \\(A=\\{x \\in \\mathbb{R} \\mid -2 \\lt  x \\le 5\\}\\). Hãy viết lại tập hợp \\(A\\) dưới dạng kí hiệu khoảng, đoạn, nửa khoảng.",
    "opts": [
     "\\((-2; 5]\\)",
     "\\([-2; 5]\\)",
     "\\((-2; 5)\\)",
     "\\([-2; 5)\\)"
    ],
    "sol": "<p>Tập hợp các số thực lớn hơn \\(-2\\) và nhỏ hơn hoặc bằng \\(5\\) được kí hiệu là nửa khoảng \\((-2; 5]\\)</p><p>Kí hiệu ngoặc tròn tại \\(-2\\) (không lấy dấu bằng) và ngoặc vuông tại \\(5\\) (có lấy dấu bằng)</p><p>Chọn B.</p>",
    "chuong": "I"
   },
   {
    "kind": "mc",
    "level": "Thông hiểu",
    "q": "Cho tập hợp \\(X=\\{x \\in \\mathbb{Z} \\mid x^2-x-6=0\\}\\). Hãy liệt kê các phần tử của tập hợp \\(X\\).",
    "opts": [
     "\\(\\{-2; 3\\}\\)",
     "\\(\\{2; -3\\}\\)",
     "\\(\\{3\\}\\)",
     "\\(\\{-2\\}\\)"
    ],
    "sol": "<p>Giải phương trình \\(x^2-x-6=0 \\Leftrightarrow (x-3)(x+2)=0\\)</p><p>Ta được các nghiệm \\(x=3\\) và \\(x=-2\\)</p><p>Cả hai nghiệm đều là số nguyên (thuộc \\(\\mathbb{Z}\\))</p><p>Vậy \\(X=\\{-2; 3\\}\\)</p><p>Chọn C.</p>",
    "chuong": "I"
   },
   {
    "kind": "mc",
    "level": "Vận dụng",
    "q": "Để phục vụ cho một hội nghị quốc tế, ban tổ chức huy động \\(38\\) người phiên dịch tiếng Anh, \\(30\\) người phiên dịch tiếng Pháp, trong đó có \\(16\\) người phiên dịch được cả hai thứ tiếng Anh và Pháp. Hỏi ban tổ chức đã huy động tổng cộng bao nhiêu người phiên dịch cho hội nghị đó?",
    "opts": [
     "\\(52\\)",
     "\\(68\\)",
     "\\(46\\)",
     "\\(54\\)"
    ],
    "sol": "<p>Gọi \\(A\\) là tập hợp người phiên dịch tiếng Anh, \\(B\\) là tập hợp người phiên dịch tiếng Pháp</p><p>Ta có \\(n(A) = 38\\), \\(n(B) = 30\\), số người phiên dịch được cả hai thứ tiếng là \\(n(A \\cap B) = 16\\)</p><p>Tổng số người phiên dịch là \\(n(A \\cup B) = n(A) + n(B) - n(A \\cap B)\\)</p><p>\\(n(A \\cup B) = 38 + 30 - 16 = 52\\)</p><p>Chọn D.</p>",
    "chuong": "I"
   },
   {
    "kind": "mc",
    "level": "Nhận biết",
    "q": "Cặp số \\((x;y)=(1;-1)\\) là nghiệm của bất phương trình nào sau đây?",
    "opts": [
     "\\(x-y\\gt 0\\)",
     "\\(-x-y\\gt 0\\)",
     "\\(x+y\\gt 0\\)",
     "\\(x+2y\\gt 0\\)"
    ],
    "sol": "<p>Thay \\((1;-1)\\) vào từng bất phương trình</p><p>\\(-x-y\\gt 0\\) cho \\(0\\gt 0\\) (sai); \\(x+y\\gt 0\\) cho \\(0\\gt 0\\) (sai); \\(x+2y\\gt 0\\) cho \\(-1\\gt 0\\) (sai)</p><p>\\(x-y\\gt 0\\) cho \\(1-(-1)=2\\gt 0\\) (đúng)</p><p>Chọn B.</p>",
    "chuong": "II"
   }
  ];
  D.forEach(x => { const {kind, ...it} = x; TTB.add('lop10', kind, () => JSON.parse(JSON.stringify(it))); });
})();
