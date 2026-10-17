/* =====================================================================
   PHIẾU HỌC TẬP TRÊN LỚP (khởi động – củng cố) – Toán 11 · Bài 5. Dãy số
   Lecture.addSheet(lớp, mã bài, markdown): Phần A (phiếu học sinh) + Phần B (gợi ý giáo viên) ngăn bằng thẻ page-break.
   Bấm 📋 Phiếu trên lớp để xem/in PDF; ⬇️ Tải Markdown cho đúng nội dung dưới đây. Bám Ví dụ 1–6 của bài giảng lop11.js.
   Công thức viết trong $…$ (hàm xem chuyển sang MathJax). Ví dụ tự soạn ghi **[Minh họa]**.
   ===================================================================== */
Lecture.addSheet('lop11', 'bai-5', String.raw`# PHIẾU HỌC TẬP – Toán 11 · Bài 5. Dãy số

**Họ tên:** ……………………………………… **Lớp:** …………… **Ngày:** ……………………

## 1. Vào lớp làm ngay

**Câu 1.** Giải phương trình $\sin x=\dfrac12$. Đáp án: ………………………………………………

**Câu 2.** Tập giá trị của hàm số $y=\sin x$ là: ……………………

**Câu 3.** Hàm số $y=3x-2$ đồng biến hay nghịch biến trên $\mathbb{R}$? Vì sao? ………………………………

……………………………………………………………………………………………………………………………………

**Câu 4.** Cho $f(x)=\dfrac{2x-1}{x+1}$. Tính $f(1),\ f(2),\ f(3)$: ……………………………

## 2. Tình huống mở đầu

| Hàng | Các số (viết tiếp theo quy luật) |
|---|---|
| (a) | $1,\ 4,\ 9,\ 16,\ 25,\ \ldots$ |
| (b) | $2,\ 3,\ 5,\ 9,\ 17,\ \ldots$ |
| (c) | $2,\ 3,\ 5,\ 7,\ 11,\ \ldots$ |

**Em nhận thấy:** ………………………………………………………… **Em thắc mắc:** ………………………………………………

> **Câu hỏi của bài học:** Hàng nào đoán được ngay số thứ $100$? Làm thế nào *mô tả* mỗi hàng bằng ngôn ngữ toán học để tính được số thứ $n$ bất kì?

## 3. Câu hỏi bản lề

**Câu A.** Cho dãy số $u_n=\dfrac{2n-1}{n+1}$. Số hạng $u_3$ bằng

A. $\dfrac83$

B. $1$

C. $\dfrac54$

D. $\dfrac74$

**Câu B.** Cho dãy số $u_1=2,\ u_{n+1}=2u_n-1$. Số hạng $u_4$ bằng

A. $5$

B. $9$

C. $7$

D. $17$

## 4. Luyện tập xen kẽ

**Câu 1 ★.** Cho $u_n=n^2-3n$. Tính $u_1,\ u_2,\ u_3,\ u_4,\ u_5$. Đáp số: ………………………………………

**Câu 2 ★.** Giải phương trình $\cos x=-\dfrac{\sqrt3}{2}$. Đáp số: ………………………………………

**Câu 3 ★.** Cho $u_1=3,\ u_{n+1}=u_n+2n$. Tính $u_2,\ u_3,\ u_4$. Đáp số: ………………………………………

**Câu 4 ★★.** Dự đoán $u_n$: a) $2,\ 5,\ 10,\ 17,\ \ldots$ ………………… b) $-1,\ 1,\ -1,\ 1,\ \ldots$ …………………

**Câu 5 ★★.** Xét tính tăng, giảm của dãy $u_n=\dfrac{3n-1}{n+1}$. Đáp số: ………………………………………

……………………………………………………………………………………………………………………………………

**Câu 6 ★★.** Với $u_n=3n-2$, từ số hạng thứ mấy trở đi thì $u_n>100$? Đáp số: ………………………

**Câu 7 ★★★.** Chứng minh dãy $u_n=\dfrac{2n-1}{n+1}$ bị chặn. *Gợi ý: viết $u_n=2-\dfrac{\ ?\ }{n+1}$ rồi tìm $m,\ M$ để $m\le u_n\le M$.* ……………………………………………………………………………………………………………………………………

……………………………………………………………………………………………………………………………………

## 5. Tìm lỗi sai

Bạn An xét tính tăng, giảm của $u_n=3n-2$: *"$u_{n+1}-u_n=3(n+1)-2-3n-2=-1<0$. Vậy dãy số giảm."*

**Lỗi ở:** ……………………………………………………………………………

**Lời giải đúng:** …………………………………………………………………………………

……………………………………………………………………………………………………………………………………

## 6. Phiếu ra khỏi lớp

**Câu 1 (trắc nghiệm).** Cho $u_1=1,\ u_{n+1}=u_n+n$. Số hạng $u_4$ bằng

A. $4$

B. $6$

C. $7$

D. $11$

**Câu 2 (đúng – sai).** Cho dãy số $u_n=\dfrac{n+2}{n+1}$. Xét tính đúng – sai của các mệnh đề:

a) $u_3=\dfrac54$.  ☐ Đ ☐ S

b) Dãy số đã cho là dãy số tăng.  ☐ Đ ☐ S

c) $u_n>1$ với mọi $n\in\mathbb{N}^*$.  ☐ Đ ☐ S

d) Dãy số đã cho bị chặn trên bởi $1$.  ☐ Đ ☐ S

**Câu 3 (trả lời ngắn – ôn chủ đề cũ).** Phương trình $2\sin x=1$ có bao nhiêu nghiệm trong đoạn $[0;2\pi]$? Đáp số: …………

## 7. Một phút suy ngẫm

Bước nào trong bài hôm nay em sẽ **kiểm tra lại** nếu gặp trong đề thi? ……………………………………………………………………

## 8. Vận dụng về nhà

Xếp các tam giác đều liên tiếp bằng que diêm: $1$ tam giác cần $3$ que, $2$ tam giác cần $5$ que, $3$ tam giác cần $7$ que, … Gọi $u_n$ là số que cần để xếp $n$ tam giác.

a) Viết $u_n$ bằng **công thức** theo $n$ và bằng **hệ thức truy hồi**. b) Cần bao nhiêu que để xếp $50$ tam giác? c) Có $100$ que, xếp được nhiều nhất bao nhiêu tam giác?

**Sản phẩm:** bảng tính (Google Sheets/Excel) tính $u_1,\dots,u_{20}$ theo **cả hai cách**, chụp ảnh hai cột kết quả khớp nhau, kèm lời giải câu b, c. **Hạn nộp:** tiết học sau.

<div style="page-break-after: always;"></div>

# PHẦN B. GỢI Ý SƯ PHẠM CHO GIÁO VIÊN – Toán 11 · Bài 5. Dãy số

## 1. Thông tin bài

- **Lớp 11 · Chương II. Dãy số. Cấp số cộng và cấp số nhân · Bài 5. Dãy số** (sách Kết nối tri thức với cuộc sống).
- **Giả định:** 1 tiết 45 phút; lớp đại trà 40–45 học sinh; chỉ có máy chiếu và giấy/bảng con, học sinh không dùng điện thoại trên lớp; tiết học bài mới.
- Phiếu bám đúng thứ tự và số liệu của bài giảng: **Ví dụ 1** ($u_n=\dfrac{2n-1}{n+1}$) → câu A, Do Now 4, Câu 7; **Ví dụ 2** (truy hồi $u_{n+1}=2u_n-1$) → câu B, tình huống (b); **Ví dụ 3** (đoán số hạng tổng quát) → tình huống (a), Câu 4; **Ví dụ 4–5** (tăng, giảm) → Câu 5, Tìm lỗi sai, Exit ticket; **Ví dụ 6** (bị chặn) → Câu 7, Exit ticket.
- Hai tình huống **[Minh họa]** (hàng số mở đầu, bài toán que diêm) do người soạn tự đặt, không trích từ SGK. Hãy đối chiếu với phần Mở đầu của Bài 5 trong SGK nếu thầy muốn dùng tình huống sách.

## 2. Mục tiêu (theo Công văn 5512)

**Hoạt động Mở đầu (7 phút)**
- *Mục tiêu:* huy động kiến thức cũ cần cho bài (giải phương trình lượng giác cơ bản, tập giá trị $\sin x$, tính đơn điệu của hàm số bậc nhất, tính giá trị hàm số); gợi nhu cầu *mô tả một dãy các số*.
- *Nội dung:* Do Now 4 câu; Notice & Wonder với ba hàng số.
- *Sản phẩm:* bài Do Now tự chấm; danh sách "nhận thấy – thắc mắc" của học sinh; câu hỏi của bài học.
- *Tổ chức:* xem Mục 4.

**Hoạt động Luyện tập – Vận dụng (21 phút + về nhà)**
- *Mục tiêu:* tính số hạng của dãy cho bằng công thức hoặc truy hồi; dự đoán số hạng tổng quát; xét tăng, giảm, bị chặn; nhận ra lỗi điển hình khi biến đổi hiệu $u_{n+1}-u_n$.
- *Nội dung:* câu hỏi bản lề, 7 câu xen kẽ, tìm lỗi sai, phiếu ra khỏi lớp, bài về nhà dùng bảng tính.
- *Sản phẩm:* phiếu đã làm; Exit ticket; ảnh bảng tính.

## 3. Tiến trình 45 phút

| Phút | Hoạt động | Ghi chú |
|---|---|---|
| 0–4 | Do Now (Mục 1 phiếu) | Học sinh làm một mình, giáo viên đi quanh |
| 4–7 | Notice & Wonder (Mục 2) | Đưa ra câu hỏi của bài học |
| 7–25 | **Hình thành kiến thức** | *Giáo viên tự dạy theo bài giảng: Kiến thức trọng tâm 1–3, Dạng 1–4, Ví dụ 1–6* |
| ~16 | Câu hỏi bản lề A (Mục 3), nằm trong phần trên | Dừng sau Ví dụ 2; giơ thẻ A/B/C/D (2 phút) |
| 25–35 | Luyện tập xen kẽ (Mục 4) | Câu 1–7, làm cá nhân rồi đối chiếu cặp đôi |
| 35–38 | Tìm lỗi sai (Mục 5) | Chiếu không ghi tên |
| 38–42 | Phiếu ra khỏi lớp (Mục 6) | Thu phiếu |
| 42–43 | Một phút suy ngẫm (Mục 7) | Viết cá nhân |
| 43–45 | Dặn dò bài về nhà (Mục 8) | |

*Câu hỏi bản lề B dùng thêm khi học sinh còn lúng túng về truy hồi, hoặc thay câu A khi lớp đã vững. Hai phút bản lề nằm trong 18 phút hình thành kiến thức, nên tổng thời gian vẫn là 45 phút.*

## 4. Hướng dẫn từng hoạt động

### 4.1. Do Now – ôn truy xuất giãn cách (*Retrieval practice with spacing*)
- **Bằng chứng: Mạnh** (Rosenshine; Craig Barton). Truy xuất kiến thức cũ trước khi học mới giúp nhớ lâu, tự chấm không lấy điểm nên giảm áp lực.
- **Tổ chức theo 5512:** (1) chiếu 4 câu, nói rõ "không lấy điểm"; (2) học sinh làm một mình 3 phút; (3) giáo viên chiếu đáp án, học sinh tự chấm bằng bút khác màu, giơ tay nếu sai từ 2 câu trở lên; (4) giáo viên nhận xét: câu 4 chính là cánh cửa vào bài hôm nay.
- **Đáp án:**
  1. $x=\dfrac{\pi}{6}+k2\pi$ hoặc $x=\dfrac{5\pi}{6}+k2\pi\ (k\in\mathbb{Z})$.
  2. $[-1;1]$.
  3. Đồng biến, vì hệ số $a=3>0$.
  4. $f(1)=\dfrac12$, $f(2)=1$, $f(3)=\dfrac54$.
- **Lỗi dự kiến:** câu 1 chỉ ghi một họ nghiệm → nhắc có hai họ do $\sin(\pi-x)=\sin x$; câu 2 ghi $(-1;1)$ → nhắc dấu ngoặc vuông; câu 4 viết sai thứ tự phép tính $\dfrac{2\cdot 3-1}{3}+1$ (xem phương án nhiễu câu A).
- **Ít công nghệ:** viết trên giấy nháp, chiếu đáp án. **Công cụ số:** Plickers hoặc Azota chấm phiếu giấy nếu muốn tổng hợp nhanh.

### 4.2. Tình huống mở đầu – Nhận ra và thắc mắc (*Notice & Wonder*, Annie Fetter – NCTM)
- **Bằng chứng: Kinh nghiệm thực tiễn.** Không có câu trả lời "đúng" nên học sinh yếu cũng tham gia được.
- **Tổ chức theo 5512:** (1) chiếu ba hàng, hỏi "em nhận thấy gì, em thắc mắc gì"; (2) học sinh ghi ý kiến cá nhân 1 phút, chia sẻ với bạn cùng bàn; (3) gọi 3–4 em (lớp đông: gọi một dãy bàn), ghi lên bảng hai cột; (4) giáo viên chốt: để nói về "số thứ $n$" cần một cách mô tả tổng quát → vào bài.
- **Đáp án gợi ý:** (a) $u_n=n^2$ – đoán được số thứ $100$ là $10\,000$; (b) $u_{n+1}=2u_n-1$, mỗi số tính từ số trước (số tiếp theo là $33$); (c) dãy số nguyên tố, **không** có công thức đơn giản. Ba hàng ứng với ba cách cho dãy số: công thức, truy hồi, mô tả bằng lời.
- **Lỗi dự kiến:** học sinh đoán (b) là cộng thêm $1, 2, 4, 8$ (đúng về giá trị nhưng khó viết tổng quát) → ghi nhận, sẽ quay lại ở Ví dụ 2; đoán (c) là "cộng thêm $1, 2, 2, 4$" → hỏi "số tiếp theo là gì?" ($13$) để thấy quy luật không rõ ràng.
- **Ít công nghệ:** viết trên bảng. **Công cụ số:** Padlet/Jamboard cho học sinh dán thắc mắc (không bắt buộc).

### 4.3. Câu hỏi bản lề (*Hinge question*, Dylan Wiliam)
- **Bằng chứng: Vừa.** Mỗi phương án nhiễu tương ứng một lỗi thật; giáo viên quyết định dạy tiếp hay dạy lại ngay trong tiết.
- **Tổ chức theo 5512:** (1) chiếu câu hỏi, cho 1 phút nghĩ; (2) học sinh khoanh vào phiếu và giơ thẻ A/B/C/D cùng lúc khi giáo viên đếm 3; (3) giáo viên đếm nhanh các lựa chọn; (4) gọi một em chọn đáp án sai giải thích suy nghĩ, rồi kết luận.
- **Câu A – đáp án C:** $u_3=\dfrac{2\cdot3-1}{3+1}=\dfrac54$.

| Phương án | Ứng với lỗi |
|---|---|
| A. $\dfrac83$ | Viết nhầm thứ tự phép tính $\dfrac{2n-1}{n}+1=\dfrac53+1$ |
| B. $1$ | Lệch chỉ số: tính $u_2$ thay vì $u_3$ |
| D. $\dfrac74$ | Đổi dấu ở tử: dùng $2n+1$ thay vì $2n-1$ |

- **Câu B – đáp án B:** $u_2=3$, $u_3=5$, $u_4=9$.

| Phương án | Ứng với lỗi |
|---|---|
| A. $5$ | Lệch chỉ số: đó là $u_3$ |
| C. $7$ | Thay $n=4$ vào $2n-1$, bỏ qua $u_n$ |
| D. $17$ | Đi quá một bước: đó là $u_5$ |

- **Nếu hơn khoảng 20% chọn sai:** dừng lại, làm lại Ví dụ 1 hoặc 2 với số khác, cho học sinh thảo luận cặp 1 phút rồi giơ thẻ lại. Nếu hơn 80% đúng: đi tiếp.
- **Ít công nghệ:** thẻ ABCD tự làm. **Công cụ số:** Plickers.

### 4.4. Luyện tập xen kẽ (*Interleaved practice*, Rohrer)
- **Bằng chứng: Mạnh** (Rohrer 2020: 60,7% so với 37,6%, $d=0{,}83$). Trộn dạng bài buộc học sinh tự chọn cách giải. Báo trước với lớp là sẽ thấy khó hơn so với làm từng dạng.
- **Tổ chức theo 5512:** (1) phát phiếu, nêu quy tắc "không xếp theo dạng"; (2) làm cá nhân 6 phút; (3) 2 phút đối chiếu cặp đôi, gọi 2–3 em báo cáo câu ★★ và ★★★; (4) chiếu lời giải, nhấn các bước dễ sai.
- **Đáp án và lời giải ngắn:**
  1. $u_1=-2$; $u_2=-2$; $u_3=0$; $u_4=4$; $u_5=10$.
  2. $x=\pm\dfrac{5\pi}{6}+k2\pi\ (k\in\mathbb{Z})$. *(dạng cũ – Bài 4)*
  3. $u_2=3+2\cdot1=5$; $u_3=5+2\cdot2=9$; $u_4=9+2\cdot3=15$.
  4. a) $u_n=n^2+1$; b) $u_n=(-1)^n$.
  5. $u_{n+1}-u_n=\dfrac{3n+2}{n+2}-\dfrac{3n-1}{n+1}=\dfrac{(3n+2)(n+1)-(3n-1)(n+2)}{(n+1)(n+2)}=\dfrac{4}{(n+1)(n+2)}>0$. Vậy dãy số **tăng**.
  6. $3n-2>100\Leftrightarrow n>34$ nên $n\ge35$ (số hạng thứ $35$ là $u_{35}=103$). *(ôn Toán 10: bất phương trình bậc nhất; dãy này là Ví dụ 4 của bài giảng)*
  7. $u_n=\dfrac{2(n+1)-3}{n+1}=2-\dfrac{3}{n+1}$. Vì $\dfrac{3}{n+1}>0$ nên $u_n<2$. Dãy tăng (hiệu $=\dfrac{3}{(n+1)(n+2)}>0$) nên $u_n\ge u_1=\dfrac12$. Vậy $\dfrac12\le u_n<2$: dãy **bị chặn**.
- **Lỗi dự kiến:** câu 1 tính $u_2=-2$ rồi nghi ngờ "sai" (đáp số lặp lại là hợp lệ); câu 3 quên rằng $n$ trong $2n$ là chỉ số hiện tại ($n=1$ để tính $u_2$); câu 4b ghi $u_n=-1^n$ (sai, phải là $(-1)^n$); câu 5 quy đồng sai dấu của hiệu hai tích; câu 6 trả lời $n=35$ thay vì "từ số hạng thứ $35$"; câu 7 chỉ chặn một phía.
- **Ít công nghệ:** giấy, bảng con. **Công cụ số:** Desmos hoặc GeoGebra vẽ điểm $(n;u_n)$ của câu 5 và 7 để học sinh *thấy* dãy tăng và tiến về $2$.

### 4.5. Tìm lỗi sai – ví dụ giải sai có chủ ý (*My Favorite No*, Leah Alcala; EEF 2022)
- **Bằng chứng: Vừa – Mạnh.**
- **Tổ chức theo 5512:** (1) chiếu lời giải của "bạn An", không ghi tên người thật; (2) học sinh tự tìm lỗi 1 phút, trao đổi cặp đôi; (3) gọi một em chỉ lỗi, **khen phần đúng trước** (đã lập đúng hiệu $u_{n+1}-u_n$ và biết xét dấu); (4) kết luận.
- **Đáp án:** lỗi ở dấu trừ chưa phân phối: $-(3n-2)$ phải đổi dấu cả hai hạng tử. Đúng là $u_{n+1}-u_n=3(n+1)-2-(3n-2)=3>0$, nên dãy **tăng**.
- **Lỗi liên quan cần theo dõi:** bỏ ngoặc trước dấu trừ ở các hiệu có phân thức (câu 5).

### 4.6. Phiếu ra khỏi lớp (*Exit ticket*, Agarwal; Fletcher-Wood)
- **Bằng chứng: Mạnh** khi có phản hồi và có chữa bài.
- **Tổ chức theo 5512:** (1) phát phiếu cắt đôi hoặc dùng cuối phiếu; (2) làm cá nhân 4 phút, không trao đổi; (3) thu phiếu; (4) chia chồng (Mục 6) rồi chữa ở đầu tiết sau.
- **Đáp án:**
  - Câu 1: **C.** $u_2=2$, $u_3=4$, $u_4=7$. (Nhiễu: A là $u_3$; B ứng với lệch chỉ số khi cộng (dùng $n=2$ thay vì $n=3$); D là $u_5$.)
  - Câu 2: a) **Đúng** ($u_3=\dfrac54$). b) **Sai** (dãy giảm, Ví dụ 5). c) **Đúng** ($u_n=1+\dfrac1{n+1}>1$). d) **Sai** (bị chặn trên bởi $\dfrac32$, nhưng $u_1=\dfrac32>1$ nên không bị chặn trên bởi $1$).
  - Câu 3 (ôn chủ đề cũ): **2** ($x=\dfrac{\pi}{6}$ và $x=\dfrac{5\pi}{6}$).
- **Lỗi dự kiến:** câu 2b chọn "tăng" vì thấy tử tăng; câu 2d ghép "bị chặn" với "tiến về $1$".

### 4.7. Một phút suy ngẫm (*Metacognitive reflection*)
- **Bằng chứng: Mạnh** (EEF: +8 tháng). Học sinh tự nêu bước hay sai, ví dụ "xét dấu hiệu $u_{n+1}-u_n$ sau khi bỏ ngoặc" hay "kiểm tra cả chặn trên lẫn chặn dưới". Giáo viên không chấm; có thể đọc lướt vài phiếu để chọn Do Now tiết sau.

### 4.8. Vận dụng về nhà
- **Đáp án:** a) $u_n=2n+1$; $u_1=3$, $u_{n+1}=u_n+2$. b) $u_{50}=101$ que. c) $2n+1\le100\Rightarrow n\le49{,}5$, nên tối đa $49$ tam giác (dùng $99$ que).
- **Lỗi dự kiến:** viết $u_n=2n$ (quên que đầu tiên); trả lời câu c là $50$ vì làm tròn lên.
- **Tích hợp năng lực số (gợi ý của người soạn, mức Nâng cao 1 – Thông tư 02/2025, Công văn 3456):** học sinh **tạo sản phẩm số** là bảng tính hai cột (công thức và truy hồi); dùng hàm điền xuống để thấy truy hồi, tự kiểm tra hai cột khớp nhau và chụp màn hình nộp lớp. Địa chỉ năng lực: sử dụng công cụ số để giải quyết vấn đề toán học và kiểm chứng kết quả.

## 5. Xử lý phiếu ra khỏi lớp

| Chồng | Dấu hiệu | Việc làm |
|---|---|---|
| 1. Đúng hết | 3/3 câu đúng | Dạy tiếp Bài 6; giao thêm Câu 7 dạng mở rộng |
| 2. Sai hết | 0–1 câu đúng | Dạy lại: chia nhóm nhỏ, làm lại Ví dụ 1, 2, 4 với số khác |
| 3. Nửa đúng nửa sai | 2 câu đúng | Ôn nhanh 5 phút đầu tiết sau bằng đúng câu bị sai nhiều |

**Gợi ý Do Now cho tiết sau (Bài 6. Cấp số cộng):** (1) bài vừa học: tính $u_4$ của dãy $u_1=5,\ u_{n+1}=u_n+3$ (đúng hình thức cấp số cộng, làm cầu nối); (2) câu học sinh sai nhiều nhất trong Exit ticket; (3) xét tính tăng, giảm của $u_n=2n+1$; (4) một câu lượng giác Bài 4 để giữ giãn cách.

## 6. Phân hóa

- **Học sinh yếu:** phát kèm mẫu chưa hoàn chỉnh cho Câu 5: "$u_{n+1}-u_n=\dfrac{3n+2}{n+2}-\dfrac{3n-1}{n+1}=\dfrac{(3n+2)(n+1)-\ \ldots}{(n+1)(n+2)}$"; cho phép dùng Câu 4 làm ví dụ mẫu; chỉ yêu cầu Câu 1–5.
- **Học sinh khá giỏi:** làm Câu 7, rồi câu hỏi mở: *với $u_n=\dfrac{an+c}{n+b}\ (b>0)$, điều kiện nào của $a,b,c$ để dãy số tăng?* (Gợi ý: $u_{n+1}-u_n=\dfrac{ab-c}{(n+b)(n+b+1)}$, nên dãy tăng khi $ab-c>0$; kiểm tra lại với Câu 5: $a=3,\ b=1,\ c=-1$ cho $ab-c=4$.)

## 7. Đáp án toàn bộ Phần A (chấm nhanh)

| Mục | Đáp án |
|---|---|
| Do Now 1 | $x=\dfrac{\pi}{6}+k2\pi$ hoặc $x=\dfrac{5\pi}{6}+k2\pi$ |
| Do Now 2 | $[-1;1]$ |
| Do Now 3 | Đồng biến ($a=3>0$) |
| Do Now 4 | $\dfrac12;\ 1;\ \dfrac54$ |
| Bản lề A | C |
| Bản lề B | B |
| Luyện tập 1 | $-2;\ -2;\ 0;\ 4;\ 10$ |
| Luyện tập 2 | $x=\pm\dfrac{5\pi}{6}+k2\pi$ |
| Luyện tập 3 | $5;\ 9;\ 15$ |
| Luyện tập 4 | a) $n^2+1$; b) $(-1)^n$ |
| Luyện tập 5 | Tăng ($u_{n+1}-u_n=\dfrac{4}{(n+1)(n+2)}$) |
| Luyện tập 6 | Từ số hạng thứ $35$ ($n\ge35$) |
| Luyện tập 7 | $\dfrac12\le u_n<2$, bị chặn |
| Tìm lỗi sai | Bỏ ngoặc sai dấu; $u_{n+1}-u_n=3>0$, dãy tăng |
| Exit 1 | C |
| Exit 2 | a) Đ · b) S · c) Đ · d) S |
| Exit 3 | 2 |
| Về nhà | a) $u_n=2n+1$; $u_{n+1}=u_n+2$ · b) $101$ · c) $49$ |
`);

Lecture.addSheet('lop11', 'bai-6', String.raw`# PHIẾU HỌC TẬP – Toán 11 · Bài 6. Cấp số cộng

**Họ tên:** ……………………………………… **Lớp:** …………… **Ngày:** ……………………

## 1. Vào lớp làm ngay

**Câu 1.** Cho $u_n=3n-2$. Tính $u_1,\ u_2,\ u_3$. Đáp án: ………………………………………

**Câu 2.** Dãy số $u_n=5-3n$ tăng hay giảm? Vì sao? ………………………………………………

**Câu 3.** Giải phương trình $\tan x=1$. Đáp án: ………………………………………

**Câu 4.** Giải hệ $\begin{cases}a+2d=7\\a+7d=22\end{cases}$. Đáp án: ………………………

## 2. Tình huống mở đầu

| Hàng | Các số (viết tiếp theo quy luật) |
|---|---|
| (a) | $3,\ 7,\ 11,\ 15,\ \ldots$ |
| (b) | $20,\ 17,\ 14,\ 11,\ \ldots$ |
| (c) | $2,\ 4,\ 8,\ 16,\ \ldots$ |

**Em nhận thấy:** ………………………………………………………… **Em thắc mắc:** ………………………………………………

> **Câu hỏi của bài học:** Hai trong ba hàng có chung một kiểu quy luật. Đó là kiểu nào, và làm thế nào tính nhanh số thứ $100$ của hàng (a) mà không viết ra từng số?

## 3. Câu hỏi bản lề

**Câu A.** Cấp số cộng $(u_n)$ có $u_1=3,\ d=4$. Số hạng $u_{20}$ bằng

A. $80$

B. $83$

C. $79$

D. $76$

**Câu B.** Ba số $x,\ 5,\ 11$ theo thứ tự lập thành cấp số cộng. Giá trị của $x$ bằng

A. $8$

B. $-1$

C. $-6$

D. $11$

## 4. Luyện tập xen kẽ

**Câu 1 ★.** Dãy $u_n=7-2n$ có là cấp số cộng không? Tìm $u_1$ và $d$. Đáp số: ………………………………………

**Câu 2 ★.** Cho $u_1=2,\ u_{n+1}=3u_n-1$. Tính $u_2,\ u_3,\ u_4$. Đáp số: ………………………………………

**Câu 3 ★.** Cấp số cộng có $u_1=-5,\ d=2$. Tính $u_{10}$ và $S_{10}$. Đáp số: ………………………………………

**Câu 4 ★★.** Cấp số cộng có $u_4=11,\ u_9=31$. Tìm $u_1,\ d$ và $u_n$. Đáp số: ………………………………………

**Câu 5 ★★.** Tính tổng $2+5+8+\cdots+101$. Đáp số: ………………………………………

**Câu 6 ★★.** Giải phương trình $2\cos x=\sqrt2$. Đáp số: ………………………………………

**Câu 7 ★★★.** Ba góc của một tam giác vuông lập thành cấp số cộng. Tìm số đo ba góc. *Gợi ý: gọi ba góc là $a-d,\ a,\ a+d$.* …………………………………………………………………………………………………………

……………………………………………………………………………………………………………………………………

## 5. Tìm lỗi sai

Bạn Bình tính $T=1+3+5+\cdots+99$: *"Có $99$ số hạng nên $T=\dfrac{99\,(1+99)}{2}=4\,950$."*

**Lỗi ở:** ……………………………………………………………………………

**Lời giải đúng:** …………………………………………………………………………………

## 6. Phiếu ra khỏi lớp

**Câu 1 (trắc nghiệm).** Cấp số cộng có $u_1=-2,\ d=3$. Tổng $S_5$ bằng

A. $10$

B. $20$

C. $25$

D. $40$

**Câu 2 (đúng – sai).** Cho cấp số cộng $(u_n)$ có $u_1=3,\ d=-2$. Xét tính đúng – sai của các mệnh đề:

a) $u_5=-5$.  ☐ Đ ☐ S

b) Dãy số $(u_n)$ là dãy số tăng.  ☐ Đ ☐ S

c) $u_n=5-2n$.  ☐ Đ ☐ S

d) $S_{10}=60$.  ☐ Đ ☐ S

**Câu 3 (trả lời ngắn – ôn chủ đề cũ).** Phương trình $2\cos x=1$ có bao nhiêu nghiệm trong đoạn $[0;2\pi]$? Đáp số: …………

## 7. Một phút suy ngẫm

Bước nào trong bài hôm nay em sẽ **kiểm tra lại** nếu gặp trong đề thi? ……………………………………………………………………

## 8. Vận dụng về nhà

Bạn An để dành tiền: tuần $1$ để dành $50$ nghìn đồng, mỗi tuần sau để dành nhiều hơn tuần trước $20$ nghìn đồng. Gọi $u_n$ là số tiền để dành ở tuần thứ $n$.

a) Viết $u_n$ theo $n$. b) Tuần thứ $30$ để dành bao nhiêu nghìn đồng? c) Sau $52$ tuần An để dành được tổng cộng bao nhiêu tiền?

**Sản phẩm:** bảng tính (Google Sheets/Excel) gồm cột tuần, cột $u_n$ (kéo công thức) và cột tổng cộng dồn; đối chiếu ô cuối với công thức $S_{52}$, chụp ảnh màn hình kèm lời giải. **Hạn nộp:** tiết học sau.

<div style="page-break-after: always;"></div>

# PHẦN B. GỢI Ý SƯ PHẠM CHO GIÁO VIÊN – Toán 11 · Bài 6. Cấp số cộng

## 1. Thông tin bài

- **Lớp 11 · Chương II. Dãy số. Cấp số cộng và cấp số nhân · Bài 6. Cấp số cộng** (sách Kết nối tri thức với cuộc sống).
- **Giả định:** 1 tiết 45 phút; lớp đại trà 40–45 học sinh; chỉ có máy chiếu và giấy/bảng con, học sinh không dùng điện thoại trên lớp; tiết học bài mới.
- Phiếu bám đúng số liệu của bài giảng: **Ví dụ 1** ($u_n=5-3n$) → Do Now 2; **Ví dụ 2** ($u_1=3,\ d=4$) → câu bản lề A, tình huống (a); **Ví dụ 3** ($u_3=7,\ u_8=22$, giải hệ) → Do Now 4; **Ví dụ 4–5** (tổng) → Câu 5, Tìm lỗi sai, Exit ticket; **Ví dụ 6** (bài toán thực tế) → Câu 7, Về nhà; **Luyện tập Bài 1** ($x,\ 5,\ 11$) → câu bản lề B.
- Hai tình huống **[Minh họa]** (ba hàng số mở đầu, bài toán để dành tiền) do người soạn tự đặt, không trích từ SGK. Hãy đối chiếu với phần Mở đầu của Bài 6 trong SGK nếu thầy muốn dùng tình huống sách.

## 2. Mục tiêu (theo Công văn 5512)

**Hoạt động Mở đầu (7 phút)**
- *Mục tiêu:* huy động kiến thức cũ cần cho bài (tính số hạng của dãy, xét tăng giảm, giải phương trình $\tan x=1$, giải hệ hai phương trình bậc nhất); gợi nhu cầu nhận ra dãy "cộng thêm một số không đổi".
- *Nội dung:* Do Now 4 câu; Notice & Wonder với ba hàng số.
- *Sản phẩm:* bài Do Now tự chấm; danh sách "nhận thấy – thắc mắc"; câu hỏi của bài học.
- *Tổ chức:* xem Mục 4.

**Hoạt động Luyện tập – Vận dụng (21 phút + về nhà)**
- *Mục tiêu:* nhận biết cấp số cộng; tìm $u_n$ từ hai dữ kiện; tính tổng $S_n$ (đếm đúng số số hạng); giải bài toán thực tế; nhận ra lỗi điển hình khi đếm số hạng.
- *Nội dung:* câu hỏi bản lề, 7 câu xen kẽ, tìm lỗi sai, phiếu ra khỏi lớp, bài về nhà dùng bảng tính.
- *Sản phẩm:* phiếu đã làm; Exit ticket; ảnh bảng tính.

## 3. Tiến trình 45 phút

| Phút | Hoạt động | Ghi chú |
|---|---|---|
| 0–4 | Do Now (Mục 1 phiếu) | Học sinh làm một mình, giáo viên đi quanh |
| 4–7 | Notice & Wonder (Mục 2) | Đưa ra câu hỏi của bài học |
| 7–25 | **Hình thành kiến thức** | *Giáo viên tự dạy theo bài giảng: Kiến thức trọng tâm 1–3, Dạng 1–4, Ví dụ 1–6* |
| ~16 | Câu hỏi bản lề A (Mục 3), nằm trong phần trên | Dừng sau Ví dụ 2; giơ thẻ A/B/C/D (2 phút) |
| 25–35 | Luyện tập xen kẽ (Mục 4) | Câu 1–7, làm cá nhân rồi đối chiếu cặp đôi |
| 35–38 | Tìm lỗi sai (Mục 5) | Chiếu không ghi tên |
| 38–42 | Phiếu ra khỏi lớp (Mục 6) | Thu phiếu |
| 42–43 | Một phút suy ngẫm (Mục 7) | Viết cá nhân |
| 43–45 | Dặn dò bài về nhà (Mục 8) | |

*Câu hỏi bản lề B dùng thêm khi học sinh còn lúng túng về tính chất "số giữa là trung bình cộng", hoặc thay câu A khi lớp đã vững. Hai phút bản lề nằm trong 18 phút hình thành kiến thức, nên tổng thời gian vẫn là 45 phút.*

## 4. Hướng dẫn từng hoạt động

### 4.1. Do Now – ôn truy xuất giãn cách (*Retrieval practice with spacing*)
- **Bằng chứng: Mạnh** (Rosenshine; Craig Barton). Truy xuất kiến thức cũ trước khi học mới giúp nhớ lâu; tự chấm không lấy điểm nên giảm áp lực.
- **Tổ chức theo 5512:** (1) chiếu 4 câu, nói rõ "không lấy điểm"; (2) học sinh làm một mình 3 phút; (3) giáo viên chiếu đáp án, học sinh tự chấm bằng bút khác màu, giơ tay nếu sai từ 2 câu trở lên; (4) giáo viên nhận xét: câu 4 chính là bước giải của Ví dụ 3 hôm nay.
- **Đáp án:**
  1. $u_1=1,\ u_2=4,\ u_3=7$.
  2. Giảm, vì $u_{n+1}-u_n=-3<0$.
  3. $x=\dfrac{\pi}{4}+k\pi\ (k\in\mathbb{Z})$.
  4. $d=3,\ a=1$ (trừ vế theo vế: $5d=15$).
- **Lỗi dự kiến:** câu 1 tính nhầm $u_2$ khi thay $n=2$; câu 2 chỉ nói "giảm" không giải thích; câu 3 viết chu kì $2\pi$ thay vì $\pi$; câu 4 sai dấu khi trừ hai phương trình.
- **Ít công nghệ:** viết trên giấy nháp, chiếu đáp án. **Công cụ số:** Plickers hoặc Azota chấm phiếu giấy nếu muốn tổng hợp nhanh.

### 4.2. Tình huống mở đầu – Nhận ra và thắc mắc (*Notice & Wonder*, Annie Fetter – NCTM)
- **Bằng chứng: Kinh nghiệm thực tiễn.** Không có câu trả lời "đúng" nên học sinh yếu cũng tham gia được.
- **Tổ chức theo 5512:** (1) chiếu ba hàng, hỏi "em nhận thấy gì, em thắc mắc gì"; (2) học sinh ghi ý kiến cá nhân 1 phút, chia sẻ với bạn cùng bàn; (3) gọi 3–4 em (lớp đông: gọi một dãy bàn), ghi lên bảng hai cột; (4) giáo viên chốt: (a) và (b) cùng kiểu "cộng thêm một số không đổi", còn (c) "nhân với một số không đổi" (để dành cho Bài 7).
- **Đáp án gợi ý:** (a) mỗi số hơn số trước $4$, số thứ $100$ là $3+99\cdot 4=399$; (b) mỗi số kém số trước $3$ (công sai âm), số tiếp theo là $8$; (c) mỗi số gấp đôi số trước, số tiếp theo là $32$.
- **Lỗi dự kiến:** học sinh tính số thứ $100$ của (a) là $3+100\cdot 4=403$ → ghi nhận, hỏi "từ số thứ nhất đến số thứ $100$ có bao nhiêu bước?", sẽ quay lại ở công thức $u_n$; học sinh coi (b) và (a) là hai kiểu khác nhau → nhấn mạnh cùng kiểu, chỉ khác dấu của công sai.
- **Ít công nghệ:** viết trên bảng. **Công cụ số:** Padlet/Jamboard cho học sinh dán thắc mắc (không bắt buộc).

### 4.3. Câu hỏi bản lề (*Hinge question*, Dylan Wiliam)
- **Bằng chứng: Vừa.** Mỗi phương án nhiễu tương ứng một lỗi thật; giáo viên quyết định dạy tiếp hay dạy lại ngay trong tiết.
- **Tổ chức theo 5512:** (1) chiếu câu hỏi, cho 1 phút nghĩ; (2) học sinh khoanh vào phiếu và giơ thẻ A/B/C/D cùng lúc khi giáo viên đếm 3; (3) giáo viên đếm nhanh các lựa chọn; (4) gọi một em chọn đáp án sai giải thích suy nghĩ, rồi kết luận.
- **Câu A – đáp án C:** $u_{20}=3+19\cdot 4=79$.

| Phương án | Ứng với lỗi |
|---|---|
| A. $80$ | Quên $u_1$: tính $20\cdot 4$ |
| B. $83$ | Dùng $u_1+nd$ thay vì $u_1+(n-1)d$ |
| D. $76$ | Quên $u_1$: tính $19\cdot 4$ |

- **Câu B – đáp án B:** số giữa là trung bình cộng hai số kề nó: $5=\dfrac{x+11}{2}\Rightarrow x=-1$.

| Phương án | Ứng với lỗi |
|---|---|
| A. $8$ | Lấy $x$ là trung bình cộng của $5$ và $11$ (nhầm vai trò số giữa) |
| C. $-6$ | Lấy hiệu $5-11$ thay vì giữ cùng công sai |
| D. $11$ | Cộng $6$ thay vì lùi một công sai: $5+6$ |

- **Nếu hơn khoảng 20% chọn sai:** dừng lại, làm lại Ví dụ 2 hoặc 3 với số khác, cho học sinh thảo luận cặp 1 phút rồi giơ thẻ lại. Nếu hơn 80% đúng: đi tiếp.
- **Ít công nghệ:** thẻ ABCD tự làm. **Công cụ số:** Plickers.

### 4.4. Luyện tập xen kẽ (*Interleaved practice*, Rohrer)
- **Bằng chứng: Mạnh** (Rohrer 2020: 60,7% so với 37,6%, $d=0{,}83$). Trộn dạng bài buộc học sinh tự chọn cách giải. Báo trước với lớp là sẽ thấy khó hơn so với làm từng dạng.
- **Tổ chức theo 5512:** (1) phát phiếu, nêu quy tắc "không xếp theo dạng"; (2) làm cá nhân 6 phút; (3) 2 phút đối chiếu cặp đôi, gọi 2–3 em báo cáo câu ★★ và ★★★; (4) chiếu lời giải, nhấn các bước dễ sai.
- **Đáp án và lời giải ngắn:**
  1. $u_{n+1}-u_n=-2$ (hằng số) nên là cấp số cộng, $u_1=5,\ d=-2$.
  2. $u_2=3\cdot 2-1=5$; $u_3=3\cdot 5-1=14$; $u_4=3\cdot 14-1=41$. *(dạng cũ – Bài 5, hệ thức truy hồi)*
  3. $u_{10}=-5+9\cdot 2=13$; $S_{10}=\dfrac{10(-5+13)}{2}=40$. *(Luyện tập Bài 2 của bài giảng)*
  4. $\begin{cases}u_1+3d=11\\u_1+8d=31\end{cases}\Rightarrow d=4,\ u_1=-1,\ u_n=4n-5$.
  5. $u_1=2,\ d=3,\ u_n=101$ nên $n=\dfrac{101-2}{3}+1=34$; $S=\dfrac{34(2+101)}{2}=1\,751$.
  6. $\cos x=\dfrac{\sqrt2}{2}\Rightarrow x=\pm\dfrac{\pi}{4}+k2\pi\ (k\in\mathbb{Z})$. *(dạng cũ – Bài 4)*
  7. Ba góc $a-d,\ a,\ a+d$ có tổng $3a=180^\circ$ nên $a=60^\circ$; góc lớn nhất $90^\circ$ nên $d=30^\circ$. Ba góc là $30^\circ,\ 60^\circ,\ 90^\circ$.
- **Lỗi dự kiến:** câu 1 kết luận "không phải" vì $d<0$; câu 2 dùng nhầm công thức cấp số cộng cho hệ thức truy hồi nhân; câu 4 quên đổi $u_9=u_1+8d$ (viết $9d$); câu 5 quên cộng $1$ khi đếm số hạng (cho $33$); câu 6 chỉ ghi một họ nghiệm; câu 7 không dùng điều kiện "tam giác vuông".
- **Ít công nghệ:** giấy, bảng con. **Công cụ số:** Desmos hoặc GeoGebra vẽ các điểm $(n;u_n)$ để học sinh thấy các điểm thẳng hàng với cấp số cộng.

### 4.5. Tìm lỗi sai – ví dụ giải sai có chủ ý (*My Favorite No*, Leah Alcala; EEF 2022)
- **Bằng chứng: Vừa – Mạnh.**
- **Tổ chức theo 5512:** (1) chiếu lời giải của "bạn Bình", không ghi tên người thật; (2) học sinh tự tìm lỗi 1 phút, trao đổi cặp đôi; (3) gọi một em chỉ lỗi, **khen phần đúng trước** (đã chọn đúng công thức $S_n=\dfrac{n(u_1+u_n)}{2}$); (4) kết luận.
- **Đáp án:** lỗi ở số số hạng. Phải là $n=\dfrac{99-1}{2}+1=50$ (chứ không phải $99$). Đúng là $T=\dfrac{50(1+99)}{2}=2\,500$ (Ví dụ 5 của bài giảng).
- **Lỗi liên quan cần theo dõi:** đồng nhất "giá trị số hạng cuối" với "số số hạng".

### 4.6. Phiếu ra khỏi lớp (*Exit ticket*, Agarwal; Fletcher-Wood)
- **Bằng chứng: Mạnh** khi có phản hồi và có chữa bài.
- **Tổ chức theo 5512:** (1) phát phiếu cắt đôi hoặc dùng cuối phiếu; (2) làm cá nhân 4 phút, không trao đổi; (3) thu phiếu; (4) chia chồng (Mục 5) rồi chữa ở đầu tiết sau.
- **Đáp án:**
  - Câu 1: **B.** $u_5=-2+4\cdot 3=10$, $S_5=\dfrac{5(-2+10)}{2}=20$. (Nhiễu: A là $u_5$; C là $\dfrac{5\cdot 10}{2}=25$, dùng $u_5$ thay cho $u_1+u_5$; D là $5\cdot 8=40$, quên chia $2$.)
  - Câu 2: a) **Đúng** ($u_5=3+4\cdot(-2)=-5$). b) **Sai** (công sai âm nên dãy giảm). c) **Đúng** ($u_n=3+(n-1)(-2)=5-2n$). d) **Sai** ($u_{10}=-15$, $S_{10}=\dfrac{10(3-15)}{2}=-60$).
  - Câu 3 (ôn chủ đề cũ): **2** ($x=\pm\dfrac{\pi}{3}+k2\pi$; trong $[0;2\pi]$ có $x=\dfrac{\pi}{3}$ và $x=\dfrac{5\pi}{3}$).
- **Lỗi dự kiến:** câu 1 chọn D vì quên chia cho $2$; câu 2b chọn "tăng" vì không để ý công sai âm; câu 2d tính đúng giá trị tuyệt đối nhưng quên dấu âm.

### 4.7. Một phút suy ngẫm (*Metacognitive reflection*)
- **Bằng chứng: Mạnh** (EEF: +8 tháng). Học sinh tự nêu bước hay sai, ví dụ "đếm số số hạng $n=\dfrac{u_n-u_1}{d}+1$" hay "viết $u_9=u_1+8d$". Giáo viên không chấm; có thể đọc lướt vài phiếu để chọn Do Now tiết sau.

### 4.8. Vận dụng về nhà
- **Đáp án:** a) $u_n=50+20(n-1)=20n+30$. b) $u_{30}=630$ nghìn đồng. c) $u_{52}=1\,070$, $S_{52}=\dfrac{52(50+1\,070)}{2}=29\,120$ nghìn đồng, tức $29{,}12$ triệu đồng.
- **Lỗi dự kiến:** viết $u_n=20n+50$ (quên $-20$); dùng $u_{52}=50+20\cdot 52$.
- **Tích hợp năng lực số (gợi ý của người soạn, mức Nâng cao 1 – Thông tư 02/2025, Công văn 3456):** học sinh **tạo sản phẩm số** là bảng tính ba cột (tuần, $u_n$, tổng cộng dồn); dùng hàm điền xuống và hàm tổng, so sánh ô cuối với công thức $S_{52}$ để tự kiểm tra kết quả; chụp màn hình nộp lớp. Địa chỉ năng lực: sử dụng công cụ số để giải quyết vấn đề toán học và kiểm chứng kết quả.

## 5. Xử lý phiếu ra khỏi lớp

| Chồng | Dấu hiệu | Việc làm |
|---|---|---|
| 1. Đúng hết | 3/3 câu đúng | Dạy tiếp Bài 7; giao thêm Câu 7 dạng mở rộng |
| 2. Sai hết | 0–1 câu đúng | Dạy lại: chia nhóm nhỏ, làm lại Ví dụ 2, 4, 5 với số khác |
| 3. Nửa đúng nửa sai | 2 câu đúng | Ôn nhanh 5 phút đầu tiết sau bằng đúng câu bị sai nhiều |

**Gợi ý Do Now cho tiết sau (Bài 7. Cấp số nhân):** (1) bài vừa học: tính $S_{10}$ của cấp số cộng $u_1=1,\ d=2$ (đáp án $100$); (2) câu học sinh sai nhiều nhất trong Exit ticket; (3) tính $u_4$ của dãy $u_1=2,\ u_{n+1}=3u_n$ (cầu nối sang cấp số nhân, đáp án $54$); (4) một câu lượng giác Bài 4 để giữ giãn cách.

## 6. Phân hóa

- **Học sinh yếu:** phát kèm mẫu chưa hoàn chỉnh cho Câu 4: "$u_4=u_1+3d=11,\ u_9=u_1+\ \ldots\ d=31$"; cho phép dùng Ví dụ 3 làm ví dụ mẫu; chỉ yêu cầu Câu 1–5.
- **Học sinh khá giỏi:** làm Câu 7, rồi câu hỏi mở: *cho cấp số cộng $(u_n)$ công sai $d$, đặt $v_n=2u_n+1$. Chứng minh $(v_n)$ cũng là cấp số cộng và tìm công sai theo $d$.* (Gợi ý: $v_{n+1}-v_n=2(u_{n+1}-u_n)=2d$.)

## 7. Đáp án toàn bộ Phần A (chấm nhanh)

| Mục | Đáp án |
|---|---|
| Do Now 1 | $1;\ 4;\ 7$ |
| Do Now 2 | Giảm ($u_{n+1}-u_n=-3<0$) |
| Do Now 3 | $x=\dfrac{\pi}{4}+k\pi$ |
| Do Now 4 | $d=3,\ a=1$ |
| Bản lề A | C |
| Bản lề B | B |
| Luyện tập 1 | Là cấp số cộng, $u_1=5,\ d=-2$ |
| Luyện tập 2 | $5;\ 14;\ 41$ |
| Luyện tập 3 | $u_{10}=13,\ S_{10}=40$ |
| Luyện tập 4 | $u_1=-1,\ d=4,\ u_n=4n-5$ |
| Luyện tập 5 | $1\,751$ |
| Luyện tập 6 | $x=\pm\dfrac{\pi}{4}+k2\pi$ |
| Luyện tập 7 | $30^\circ,\ 60^\circ,\ 90^\circ$ |
| Tìm lỗi sai | Số số hạng là $50$; $T=2\,500$ |
| Exit 1 | B |
| Exit 2 | a) Đ · b) S · c) Đ · d) S |
| Exit 3 | 2 |
| Về nhà | a) $u_n=20n+30$ · b) $630$ nghìn đồng · c) $29\,120$ nghìn đồng |
`);

Lecture.addSheet('lop11', 'bai-7', String.raw`# PHIẾU HỌC TẬP – Toán 11 · Bài 7. Cấp số nhân

**Họ tên:** ……………………………………… **Lớp:** …………… **Ngày:** ……………………

## 1. Vào lớp làm ngay

**Câu 1.** Cấp số cộng có $u_1=4,\ d=3$. Tính $u_5$. Đáp án: ………………………………………

**Câu 2.** Cấp số cộng có $u_1=1,\ d=2$. Tính $S_{10}$. Đáp án: ………………………………………

**Câu 3.** Cho $u_1=2,\ u_{n+1}=3u_n$. Tính $u_2,\ u_3,\ u_4$. Đáp án: ………………………………………

**Câu 4.** Giải phương trình $q^3=27$. Đáp án: ………………………

## 2. Tình huống mở đầu

| Hàng | Các số (viết tiếp theo quy luật) |
|---|---|
| (a) | $2,\ 6,\ 18,\ 54,\ \ldots$ |
| (b) | $80,\ 40,\ 20,\ 10,\ \ldots$ |
| (c) | $2,\ 5,\ 8,\ 11,\ \ldots$ |

**Em nhận thấy:** ………………………………………………………… **Em thắc mắc:** ………………………………………………

> **Câu hỏi của bài học:** Hàng (a) và (b) có chung một kiểu quy luật, khác hàng (c). Đó là kiểu nào, và làm thế nào tính nhanh số thứ $10$ của hàng (a) mà không viết ra từng số?

## 3. Câu hỏi bản lề

**Câu A.** Cấp số nhân $(u_n)$ có $u_1=2,\ q=3$. Số hạng $u_6$ bằng

A. $17$

B. $1\,458$

C. $486$

D. $36$

**Câu B.** Ba số $x,\ 6,\ 18$ theo thứ tự lập thành cấp số nhân. Giá trị của $x$ bằng

A. $2$

B. $12$

C. $-6$

D. $3$

## 4. Luyện tập xen kẽ

**Câu 1 ★.** Dãy $u_n=3^{n+1}$ có là cấp số nhân không? Tìm $u_1$ và $q$. Đáp số: ………………………………………

**Câu 2 ★.** Cấp số cộng có $u_1=7,\ d=-3$. Tính $u_8$. Đáp số: ………………………………………

**Câu 3 ★.** Cấp số nhân có $u_1=-2,\ q=-3$. Tính $u_4$. Đáp số: ………………………………………

**Câu 4 ★★.** Cấp số nhân có $u_3=12,\ u_6=-96$. Tìm $u_1,\ q$ và $u_n$. Đáp số: ………………………………………

**Câu 5 ★★.** Tính tổng $1+2+4+\cdots+512$. Đáp số: ………………………………………

**Câu 6 ★★.** Giải phương trình $\sin x=\dfrac12$. Đáp số: ………………………………………

**Câu 7 ★★★.** Ba số dương lập thành cấp số nhân có tổng $14$ và tích $64$. Tìm ba số đó. *Gợi ý: gọi ba số là $\dfrac{a}{q},\ a,\ aq$.* …………………………………………………………………………………………………………

……………………………………………………………………………………………………………………………………

## 5. Tìm lỗi sai

Bạn Bình tính $T=1+2+4+\cdots+2^6$: *"Có $6$ số hạng nên $T=\dfrac{1-2^6}{1-2}=63$."*

**Lỗi ở:** ……………………………………………………………………………

**Lời giải đúng:** …………………………………………………………………………………

## 6. Phiếu ra khỏi lớp

**Câu 1 (trắc nghiệm).** Cấp số nhân có $u_1=1,\ q=-2$. Tổng $S_5$ bằng

A. $31$

B. $33$

C. $11$

D. $-11$

**Câu 2 (đúng – sai).** Cho cấp số nhân $(u_n)$ có $u_1=3,\ q=-2$. Xét tính đúng – sai của các mệnh đề:

a) $u_4=-24$.  ☐ Đ ☐ S

b) Dãy số $(u_n)$ là dãy số tăng.  ☐ Đ ☐ S

c) $u_n=3\cdot(-2)^n$.  ☐ Đ ☐ S

d) $S_3=9$.  ☐ Đ ☐ S

**Câu 3 (trả lời ngắn – ôn chủ đề cũ).** Phương trình $\sin 2x=0$ có bao nhiêu nghiệm trong đoạn $[0;\pi]$? Đáp số: …………

## 7. Một phút suy ngẫm

Bước nào trong bài hôm nay em sẽ **kiểm tra lại** nếu gặp trong đề thi? ……………………………………………………………………

## 8. Vận dụng về nhà

Gia đình bạn Hà gửi $80$ triệu đồng, kì hạn $1$ năm, lãi suất $7\%$/năm, lãi nhập gốc mỗi năm. Gọi $A_n$ là số tiền (triệu đồng) sau $n$ năm.

a) Viết $A_n$ theo $n$. b) Sau $5$ năm có bao nhiêu tiền (làm tròn đến hàng phần trăm triệu)? c) Sau ít nhất mấy năm thì số tiền gấp đôi số vốn ban đầu?

**Sản phẩm:** bảng tính (Google Sheets/Excel) gồm cột năm và cột $A_n$ (kéo công thức); dùng bảng để tìm năm đầu tiên $A_n\ge160$, đối chiếu câu b với công thức, chụp ảnh màn hình kèm lời giải. **Hạn nộp:** tiết học sau.

<div style="page-break-after: always;"></div>

# PHẦN B. GỢI Ý SƯ PHẠM CHO GIÁO VIÊN – Toán 11 · Bài 7. Cấp số nhân

## 1. Thông tin bài

- **Lớp 11 · Chương II. Dãy số. Cấp số cộng và cấp số nhân · Bài 7. Cấp số nhân** (sách Kết nối tri thức với cuộc sống).
- **Giả định:** 1 tiết 45 phút; lớp đại trà 40–45 học sinh; chỉ có máy chiếu và giấy/bảng con, học sinh không dùng điện thoại trên lớp; tiết học bài mới.
- Phiếu bám số liệu của bài giảng: **Ví dụ 1** ($u_n=3\cdot 2^n$) → Câu 1 luyện tập; **Ví dụ 2** ($u_1=2,\ q=3$) → câu bản lề A, tình huống (a); **Ví dụ 3** ($u_2=6,\ u_5=48$, chia vế theo vế) → Do Now 4, Câu 4; **Ví dụ 4–5** (tổng, đếm số hạng) → Câu 5, Tìm lỗi sai, Exit ticket; **Ví dụ 6** (bài toán thực tế) → Về nhà; **Luyện tập Bài 1** ($2,\ x,\ 18$) → câu bản lề B.
- Hai tình huống **[Minh họa]** (ba hàng số mở đầu, bài toán gửi tiết kiệm) do người soạn tự đặt, không trích từ SGK. Hãy đối chiếu với phần Mở đầu của Bài 7 trong SGK nếu thầy muốn dùng tình huống sách.

## 2. Mục tiêu (theo Công văn 5512)

**Hoạt động Mở đầu (7 phút)**
- *Mục tiêu:* huy động kiến thức cũ cần cho bài (số hạng và tổng của cấp số cộng, dãy cho bằng hệ thức truy hồi, giải phương trình bậc ba đơn giản); gợi nhu cầu nhận ra dãy "nhân với một số không đổi".
- *Nội dung:* Do Now 4 câu; Notice & Wonder với ba hàng số.
- *Sản phẩm:* bài Do Now tự chấm; danh sách "nhận thấy – thắc mắc"; câu hỏi của bài học.
- *Tổ chức:* xem Mục 4.

**Hoạt động Luyện tập – Vận dụng (21 phút + về nhà)**
- *Mục tiêu:* nhận biết cấp số nhân; tìm $u_1,\ q$ từ hai dữ kiện; tính tổng $S_n$ (đếm đúng số số hạng); phân biệt cấp số cộng và cấp số nhân; giải bài toán thực tế.
- *Nội dung:* câu hỏi bản lề, 7 câu xen kẽ, tìm lỗi sai, phiếu ra khỏi lớp, bài về nhà dùng bảng tính.
- *Sản phẩm:* phiếu đã làm; Exit ticket; ảnh bảng tính.

## 3. Tiến trình 45 phút

| Phút | Hoạt động | Ghi chú |
|---|---|---|
| 0–4 | Do Now (Mục 1 phiếu) | Học sinh làm một mình, giáo viên đi quanh |
| 4–7 | Notice & Wonder (Mục 2) | Đưa ra câu hỏi của bài học |
| 7–25 | **Hình thành kiến thức** | *Giáo viên tự dạy theo bài giảng: Kiến thức trọng tâm 1–3, Dạng 1–4, Ví dụ 1–6* |
| ~16 | Câu hỏi bản lề A (Mục 3), nằm trong phần trên | Dừng sau Ví dụ 2; giơ thẻ A/B/C/D (2 phút) |
| 25–35 | Luyện tập xen kẽ (Mục 4) | Câu 1–7, làm cá nhân rồi đối chiếu cặp đôi |
| 35–38 | Tìm lỗi sai (Mục 5) | Chiếu không ghi tên |
| 38–42 | Phiếu ra khỏi lớp (Mục 6) | Thu phiếu |
| 42–43 | Một phút suy ngẫm (Mục 7) | Viết cá nhân |
| 43–45 | Dặn dò bài về nhà (Mục 8) | |

*Câu hỏi bản lề B dùng thêm khi học sinh còn lúng túng về tính chất "số giữa có bình phương bằng tích hai số kề", hoặc thay câu A khi lớp đã vững. Hai phút bản lề nằm trong 18 phút hình thành kiến thức, nên tổng thời gian vẫn là 45 phút.*

## 4. Hướng dẫn từng hoạt động

### 4.1. Do Now – ôn truy xuất giãn cách (*Retrieval practice with spacing*)
- **Bằng chứng: Mạnh** (Rosenshine; Craig Barton). Truy xuất kiến thức cũ trước khi học mới giúp nhớ lâu; tự chấm không lấy điểm nên giảm áp lực.
- **Tổ chức theo 5512:** (1) chiếu 4 câu, nói rõ "không điểm"; (2) học sinh làm một mình 3 phút; (3) giáo viên chiếu đáp án, học sinh tự chấm bằng bút khác màu, giơ tay nếu sai từ 2 câu trở lên; (4) giáo viên nhận xét: câu 3 chính là dãy "nhân với số không đổi" của hôm nay, câu 4 là bước giải của Ví dụ 3.
- **Đáp án:**
  1. $u_5=4+4\cdot 3=16$.
  2. $u_{10}=19$, $S_{10}=\dfrac{10(1+19)}{2}=100$.
  3. $u_2=6,\ u_3=18,\ u_4=54$.
  4. $q=3$ (vì $3^3=27$).
- **Lỗi dự kiến:** câu 1 dùng $u_1+5d$ (cho $19$); câu 2 quên chia $2$ (cho $200$); câu 3 cộng $3$ thay vì nhân $3$; câu 4 trả lời $q=9$ (lấy $27:3$).
- **Ít công nghệ:** viết trên giấy nháp, chiếu đáp án. **Công cụ số:** Plickers hoặc Azota chấm phiếu giấy nếu muốn tổng hợp nhanh.

### 4.2. Tình huống mở đầu – Nhận ra và thắc mắc (*Notice & Wonder*, Annie Fetter – NCTM)
- **Bằng chứng: Kinh nghiệm thực tiễn.** Không có câu trả lời "đúng" nên học sinh yếu cũng tham gia được.
- **Tổ chức theo 5512:** (1) chiếu ba hàng, hỏi "em nhận thấy gì, em thắc mắc gì"; (2) học sinh ghi ý kiến cá nhân 1 phút, chia sẻ với bạn cùng bàn; (3) gọi 3–4 em (lớp đông: gọi một dãy bàn), ghi lên bảng hai cột; (4) giáo viên chốt: (a) và (b) cùng kiểu "nhân với một số không đổi", còn (c) là "cộng thêm một số không đổi" (đã học ở Bài 6).
- **Đáp án gợi ý:** (a) mỗi số gấp $3$ lần số trước, số tiếp theo là $162$, số thứ $10$ là $2\cdot 3^9=39\,366$; (b) mỗi số bằng một nửa số trước (nhân với $\dfrac12$), số tiếp theo là $5$; (c) mỗi số hơn số trước $3$, số tiếp theo là $14$.
- **Lỗi dự kiến:** học sinh tính số thứ $10$ của (a) là $2\cdot 3^{10}$ → hỏi "từ số thứ nhất đến số thứ $10$ có bao nhiêu lần nhân?", sẽ quay lại ở công thức $u_n=u_1q^{n-1}$; học sinh coi (b) là "giảm" nên khác (a) → nhấn mạnh cùng kiểu, chỉ khác công bội ($q<1$).
- **Ít công nghệ:** viết trên bảng. **Công cụ số:** Padlet/Jamboard cho học sinh dán thắc mắc (không bắt buộc).

### 4.3. Câu hỏi bản lề (*Hinge question*, Dylan Wiliam)
- **Bằng chứng: Vừa.** Mỗi phương án nhiễu tương ứng một lỗi thật; giáo viên quyết định dạy tiếp hay dạy lại ngay trong tiết.
- **Tổ chức theo 5512:** (1) chiếu câu hỏi, cho 1 phút nghĩ; (2) học sinh khoanh vào phiếu và giơ thẻ A/B/C/D cùng lúc khi giáo viên đếm 3; (3) giáo viên đếm nhanh các lựa chọn; (4) gọi một em chọn đáp án sai giải thích suy nghĩ, rồi kết luận.
- **Câu A – đáp án C:** $u_6=2\cdot 3^5=486$.

| Phương án | Ứng với lỗi |
|---|---|
| A. $17$ | Dùng công thức cấp số cộng: $u_1+5q=2+15$ |
| B. $1\,458$ | Viết $u_1q^n$ thay vì $u_1q^{n-1}$: $2\cdot 3^6$ |
| D. $36$ | Nhân thay vì lũy thừa: $2\cdot 3\cdot 6$ |

- **Câu B – đáp án A:** số giữa có bình phương bằng tích hai số kề: $6^2=18x\Rightarrow x=2$.

| Phương án | Ứng với lỗi |
|---|---|
| B. $12$ | Lấy $x$ là trung bình cộng của $6$ và $18$ (nhầm với cấp số cộng) |
| C. $-6$ | Dùng công sai: $x=2\cdot 6-18$ |
| D. $3$ | Lấy $q=18:6$ làm đáp án thay vì tìm $x=6:q$ |

- **Nếu hơn khoảng 20% chọn sai:** dừng lại, làm lại Ví dụ 2 hoặc 3 với số khác, cho học sinh thảo luận cặp 1 phút rồi giơ thẻ lại. Nếu hơn 80% đúng: đi tiếp.
- **Ít công nghệ:** thẻ ABCD tự làm. **Công cụ số:** Plickers.

### 4.4. Luyện tập xen kẽ (*Interleaved practice*, Rohrer)
- **Bằng chứng: Mạnh** (Rohrer 2020: 60,7% so với 37,6%, $d=0{,}83$). Trộn dạng bài buộc học sinh tự chọn cách giải. Báo trước với lớp là sẽ thấy khó hơn so với làm từng dạng.
- **Tổ chức theo 5512:** (1) phát phiếu, nêu quy tắc "không xếp theo dạng"; (2) làm cá nhân 6 phút; (3) 2 phút đối chiếu cặp đôi, gọi 2–3 em báo cáo câu ★★ và ★★★; (4) chiếu lời giải, nhấn các bước dễ sai.
- **Đáp án và lời giải ngắn:**
  1. $\dfrac{u_{n+1}}{u_n}=\dfrac{3^{n+2}}{3^{n+1}}=3$ (hằng số) nên là cấp số nhân, $u_1=9,\ q=3$.
  2. $u_8=7+7\cdot(-3)=-14$. *(dạng cũ – Bài 6, cấp số cộng)*
  3. $u_4=-2\cdot(-3)^3=54$.
  4. $\begin{cases}u_1q^2=12\\u_1q^5=-96\end{cases}\Rightarrow q^3=-8,\ q=-2,\ u_1=3,\ u_n=3\cdot(-2)^{n-1}$.
  5. $u_1=1,\ q=2,\ 512=2^9$ nên $n=10$; $S=\dfrac{1-2^{10}}{1-2}=1\,023$.
  6. $x=\dfrac{\pi}{6}+k2\pi$ hoặc $x=\dfrac{5\pi}{6}+k2\pi\ (k\in\mathbb{Z})$. *(dạng cũ – Bài 4)*
  7. Gọi $\dfrac{a}{q},\ a,\ aq$: tích $a^3=64\Rightarrow a=4$; tổng $\dfrac4q+4+4q=14\Rightarrow 2q^2-5q+2=0\Rightarrow q=2$ hoặc $q=\dfrac12$. Ba số là $2,\ 4,\ 8$ (hoặc $8,\ 4,\ 2$).
- **Lỗi dự kiến:** câu 1 chỉ xét hiệu $u_{n+1}-u_n$ (dùng nhầm cách của cấp số cộng); câu 2 dùng nhầm công thức nhân; câu 3 làm mất dấu khi lũy thừa số âm; câu 4 quên chia vế theo vế, hoặc viết $u_6=u_1q^6$; câu 5 đếm sai số hạng ($512=2^9$ nhưng có $10$ số hạng); câu 6 chỉ ghi một họ nghiệm; câu 7 chỉ lấy một giá trị $q$.
- **Ít công nghệ:** giấy, bảng con. **Công cụ số:** Desmos hoặc GeoGebra vẽ các điểm $(n;u_n)$ để học sinh thấy các điểm của cấp số nhân nằm trên đường cong, không thẳng hàng như cấp số cộng.

### 4.5. Tìm lỗi sai – ví dụ giải sai có chủ ý (*My Favorite No*, Leah Alcala; EEF 2022)
- **Bằng chứng: Vừa – Mạnh.**
- **Tổ chức theo 5512:** (1) chiếu lời giải của "bạn Bình", không ghi tên người thật; (2) học sinh tự tìm lỗi 1 phút, trao đổi cặp đôi; (3) gọi một em chỉ lỗi, **khen phần đúng trước** (đã chọn đúng công thức $S_n=\dfrac{u_1(1-q^n)}{1-q}$); (4) kết luận.
- **Đáp án:** lỗi ở số số hạng. Các số mũ từ $0$ đến $6$ nên có $n=7$ số hạng (chứ không phải $6$). Đúng là $T=\dfrac{1-2^7}{1-2}=127$ (cùng kiểu Ví dụ 5 của bài giảng).
- **Lỗi liên quan cần theo dõi:** đồng nhất "số mũ lớn nhất" với "số số hạng".

### 4.6. Phiếu ra khỏi lớp (*Exit ticket*, Agarwal; Fletcher-Wood)
- **Bằng chứng: Mạnh** khi có phản hồi và có chữa bài.
- **Tổ chức theo 5512:** (1) phát phiếu cắt đôi hoặc dùng cuối phiếu; (2) làm cá nhân 4 phút, không trao đổi; (3) thu phiếu; (4) chia chồng (Mục 5) rồi chữa ở đầu tiết sau.
- **Đáp án:**
  - Câu 1: **C.** $S_5=\dfrac{1-(-2)^5}{1-(-2)}=\dfrac{33}{3}=11$. (Nhiễu: A là $S_5$ với $q=2$ ($31$), bỏ dấu của $q$; B là tử số $1-q^5=33$, quên chia cho $1-q$; D là sai dấu kết quả.)
  - Câu 2: a) **Đúng** ($u_4=3\cdot(-2)^3=-24$). b) **Sai** (công bội âm nên các số hạng đổi dấu xen kẽ, không tăng). c) **Sai** (đúng là $u_n=3\cdot(-2)^{n-1}$; với công thức $3\cdot(-2)^n$ thì $u_1=-6$). d) **Đúng** ($S_3=3-6+12=9$).
  - Câu 3 (ôn chủ đề cũ): **3** ($\sin 2x=0\Rightarrow x=\dfrac{k\pi}{2}$; trong $[0;\pi]$ có $x=0,\ \dfrac{\pi}{2},\ \pi$).
- **Lỗi dự kiến:** câu 1 chọn B vì quên chia cho $1-q$; câu 2b chọn "tăng" vì chỉ nhìn $|q|>1$; câu 2c không kiểm tra $u_1$; câu 3 ghi $2$ vì bỏ sót nghiệm biên.

### 4.7. Một phút suy ngẫm (*Metacognitive reflection*)
- **Bằng chứng: Mạnh** (EEF: +8 tháng). Học sinh tự nêu bước hay sai, ví dụ "số mũ là $n-1$" hay "đếm số số hạng khi tính tổng". Giáo viên không chấm; có thể đọc lướt vài phiếu để chọn Do Now tiết sau.

### 4.8. Vận dụng về nhà
- **Đáp án:** a) $A_n=80\cdot 1{,}07^n$. b) $A_5=80\cdot 1{,}07^5\approx 112{,}20$ triệu đồng. c) $A_{10}\approx 157{,}37<160$, $A_{11}\approx 168{,}39\ge 160$ nên sau ít nhất $11$ năm.
- **Lỗi dự kiến:** lấy công bội $q=0{,}07$ hoặc $q=7$; viết $A_n=80\cdot 1{,}07\cdot n$ (nhầm với cộng đều); dùng $1{,}07^{n-1}$ khi tính $A_5$.
- **Tích hợp năng lực số (gợi ý của người soạn, mức Nâng cao 1 – Thông tư 02/2025, Công văn 3456):** học sinh **tạo sản phẩm số** là bảng tính hai cột (năm, $A_n$); dùng công thức điền xuống để tìm năm đầu tiên $A_n\ge160$, đối chiếu ô năm thứ $5$ với công thức $80\cdot 1{,}07^5$; chụp màn hình nộp lớp. Địa chỉ năng lực: sử dụng công cụ số để giải quyết vấn đề toán học và kiểm chứng kết quả.

## 5. Xử lý phiếu ra khỏi lớp

| Chồng | Dấu hiệu | Việc làm |
|---|---|---|
| 1. Đúng hết | 3/3 câu đúng | Dạy tiếp Ôn tập chương II; giao thêm Câu 7 dạng mở rộng |
| 2. Sai hết | 0–1 câu đúng | Dạy lại: chia nhóm nhỏ, làm lại Ví dụ 2, 4, 5 với số khác |
| 3. Nửa đúng nửa sai | 2 câu đúng | Ôn nhanh 5 phút đầu tiết sau bằng đúng câu bị sai nhiều |

**Gợi ý Do Now cho tiết sau (Ôn tập chương II):** (1) bài vừa học: tính $S_6$ của cấp số nhân $u_1=3,\ q=2$ (đáp án $189$); (2) câu học sinh sai nhiều nhất trong Exit ticket; (3) phân biệt: dãy $u_n=2n+1$ và $u_n=2^n$, dãy nào là cấp số cộng, dãy nào là cấp số nhân; (4) một câu lượng giác Bài 4 để giữ giãn cách.

## 6. Phân hóa

- **Học sinh yếu:** phát kèm mẫu chưa hoàn chỉnh cho Câu 4: "$u_1q^2=12,\ u_1q^{\ldots}=-96$, chia vế theo vế được $q^3=\ldots$"; cho phép dùng Ví dụ 3 làm ví dụ mẫu; chỉ yêu cầu Câu 1–5.
- **Học sinh khá giỏi:** làm Câu 7, rồi câu hỏi mở: *cho cấp số nhân $(u_n)$ công bội $q$ và $u_n>0$. Đặt $v_n=\ln u_n$ hoặc $w_n=u_n^2$. Chứng minh $(w_n)$ cũng là cấp số nhân và tìm công bội theo $q$.* (Gợi ý: $\dfrac{w_{n+1}}{w_n}=\left(\dfrac{u_{n+1}}{u_n}\right)^2=q^2$; ý $v_n=\ln u_n$ là cấp số cộng dành cho em đã biết logarit.)

## 7. Đáp án toàn bộ Phần A (chấm nhanh)

| Mục | Đáp án |
|---|---|
| Do Now 1 | $16$ |
| Do Now 2 | $100$ |
| Do Now 3 | $6;\ 18;\ 54$ |
| Do Now 4 | $q=3$ |
| Bản lề A | C |
| Bản lề B | A |
| Luyện tập 1 | Là cấp số nhân, $u_1=9,\ q=3$ |
| Luyện tập 2 | $-14$ |
| Luyện tập 3 | $54$ |
| Luyện tập 4 | $u_1=3,\ q=-2,\ u_n=3\cdot(-2)^{n-1}$ |
| Luyện tập 5 | $1\,023$ |
| Luyện tập 6 | $x=\dfrac{\pi}{6}+k2\pi$ hoặc $x=\dfrac{5\pi}{6}+k2\pi$ |
| Luyện tập 7 | $2;\ 4;\ 8$ |
| Tìm lỗi sai | Số số hạng là $7$; $T=127$ |
| Exit 1 | C |
| Exit 2 | a) Đ · b) S · c) S · d) Đ |
| Exit 3 | 3 |
| Về nhà | a) $A_n=80\cdot 1{,}07^n$ · b) $112{,}20$ triệu đồng · c) $11$ năm |
`);

/* =====================================================================
   PHIẾU HỌC TẬP TRÊN LỚP – Toán 11 · Bài 8. Mẫu số liệu ghép nhóm (thầy yêu cầu 14/10/2026)
   Bám Ví dụ 1–6 của bài giảng bai-8 (lop11.js). Tình huống tự soạn ghi **[Minh họa]**.
   ===================================================================== */
Lecture.addSheet('lop11', 'bai-8', String.raw`# PHIẾU HỌC TẬP – Toán 11 · Bài 8. Mẫu số liệu ghép nhóm

**Họ tên:** ……………………………………… **Lớp:** …………… **Ngày:** ……………………

## 1. Vào lớp làm ngay

**Câu 1.** Lớp có $40$ học sinh, $14$ em đạt loại giỏi. Tỉ lệ phần trăm học sinh giỏi là: ………………………

**Câu 2.** Tính số trung bình của mẫu số liệu $3,\ 5,\ 5,\ 8,\ 9$. Đáp án: ………………………

**Câu 3.** Số $20$ có thoả mãn $10\le x<20$ không? Đáp án: ………………………

**Câu 4.** Cho cấp số nhân có $u_1=3,\ q=2$. Tính $u_4$. Đáp án: ………………………

## 2. Tình huống mở đầu **[Minh họa]**

Chiều cao (cm) của $12$ học sinh trong một tổ: $151,\ 153,\ 155,\ 156,\ 158,\ 160,\ 160,\ 162,\ 164,\ 165,\ 168,\ 171$.

**Em nhận thấy:** ………………………………………………………… **Em thắc mắc:** ………………………………………………

> **Câu hỏi của bài học:** Nếu khảo sát cả trường với hàng trăm số liệu như thế, làm cách nào gom chúng vào vài nhóm để dễ nhìn, và một số nằm đúng ở mốc giữa hai nhóm thì xếp vào nhóm nào?

## 3. Câu hỏi bản lề

**Câu A.** Trong các nhóm sau, số liệu $25$ thuộc nhóm nào?

A. $[20;25)$

B. $[25;30)$

C. $[30;35)$

D. Không thuộc nhóm nào

**Câu B.** Mẫu số liệu có giá trị nhỏ nhất $4$, lớn nhất $24$. Chia thành các nhóm độ dài $5$, nhóm đầu bắt đầu từ $4$, mỗi nhóm dạng $[a;b)$. Cần ít nhất bao nhiêu nhóm?

A. $3$

B. $4$

C. $5$

D. $6$

## 4. Luyện tập xen kẽ

**Câu 1 ★.** Nhóm $[35;50)$ có độ dài bao nhiêu? Đáp số: ………………………

**Câu 2 ★.** Trong các số $19;\ 20;\ 25;\ 30$, những số nào thuộc nhóm $[20;30)$? Đáp số: ………………………

**Câu 3 ★.** Cấp số nhân có $u_1=3,\ q=2$. Tính $S_5$. Đáp số: ………………………

**Câu 4 ★★.** Cân nặng (kg) của $10$ học sinh: $41;\ 44;\ 45;\ 47;\ 49;\ 50;\ 52;\ 54;\ 55;\ 58$. Lập tần số của các nhóm $[40;45),\ [45;50),\ [50;55),\ [55;60)$. Đáp số: ………………………

**Câu 5 ★★.** Bảng tần số của $5$ nhóm liên tiếp là $4,\ 10,\ 12,\ 8,\ 6$. Tính tần số tương đối và tần số tích luỹ của nhóm thứ ba. Đáp số: ………………………

**Câu 6 ★★.** Giá trị nhỏ nhất là $12$, lớn nhất là $47$. Muốn chia thành đúng $4$ nhóm cùng độ dài (nhóm đầu bắt đầu từ $12$), độ dài nguyên nhỏ nhất là bao nhiêu? Đáp số: ………………………

**Câu 7 ★★★.** Bảng tần số các nhóm $[0;10),\ [10;20),\ [20;30),\ [30;40)$ là $x,\ 9,\ 6,\ 3$. Biết nhóm $[10;20)$ có tần số tương đối $36\%$. Tìm $x$. …………………………………………………………………………………

……………………………………………………………………………………………………………………………………

## 5. Tìm lỗi sai

Bạn Bình ghép nhóm $10,\ 12,\ 15,\ 17,\ 20,\ 24$ vào $[10;15),\ [15;20),\ [20;25)$: *"$[10;15)$: $10,12,15$ nên $3$; $[15;20)$: $17,20$ nên $2$; $[20;25)$: $24$ nên $1$."*

**Lỗi ở:** ……………………………………………………………………………

**Lời giải đúng:** …………………………………………………………………………………

## 6. Phiếu ra khỏi lớp

**Câu 1 (trắc nghiệm).** Bảng tần số của $20$ học sinh: $[0;5)$: $3$; $[5;10)$: $7$; $[10;15)$: $6$; $[15;20)$: $4$. Tần số tương đối của nhóm $[5;10)$ là

A. $7\%$

B. $35\%$

C. $30\%$

D. $17{,}5\%$

**Câu 2 (đúng – sai).** Dùng bảng tần số ở Câu 1. Xét tính đúng – sai của các mệnh đề:

a) Cỡ mẫu bằng $20$.  ☐ Đ ☐ S

b) Có $10$ học sinh có giá trị nhỏ hơn $10$.  ☐ Đ ☐ S

c) Tần số tích luỹ của nhóm $[10;15)$ bằng $6$.  ☐ Đ ☐ S

d) Số liệu $15$ thuộc nhóm $[10;15)$.  ☐ Đ ☐ S

**Câu 3 (trả lời ngắn – ôn chủ đề cũ).** Cấp số cộng có $u_1=5,\ d=3$. Tính $u_{10}$. Đáp số: …………

## 7. Một phút suy ngẫm

Bước nào trong bài hôm nay em sẽ **kiểm tra lại** nếu gặp trong đề thi? ……………………………………………………………………

## 8. Vận dụng về nhà **[Minh họa]**

Khảo sát thời gian ngủ mỗi đêm (giờ) của ít nhất $20$ bạn hoặc người thân (không ghi tên). Chọn các nhóm độ dài $1$ giờ, ví dụ $[5;6),\ [6;7),\ \ldots$.

a) Lập bảng tần số ghép nhóm. b) Tính tần số tương đối của từng nhóm. c) Nhóm nào có nhiều người nhất? Bao nhiêu phần trăm ngủ từ $8$ giờ trở lên?

**Sản phẩm:** bảng tính (Google Sheets/Excel) có cột nhóm, tần số, tần số tương đối (công thức chia cho tổng) và biểu đồ cột (đặt khoảng cách giữa các cột bằng $0$), chụp ảnh màn hình kèm nhận xét hai câu. **Hạn nộp:** tiết học sau.

<div style="page-break-after: always;"></div>

# PHẦN B. GỢI Ý SƯ PHẠM CHO GIÁO VIÊN – Toán 11 · Bài 8. Mẫu số liệu ghép nhóm

## 1. Thông tin bài

- **Lớp 11 · Chương III · Bài 8. Mẫu số liệu ghép nhóm** (sách Kết nối tri thức với cuộc sống). Thầy đối chiếu tên chương và các mục của bài với sách in.
- **Giả định:** 1 tiết 45 phút; lớp đại trà 40–45 học sinh; chỉ có máy chiếu và giấy/bảng con, học sinh không dùng điện thoại trên lớp; tiết học bài mới.
- Phiếu bám số liệu của bài giảng: **Ví dụ 1** (nhóm $[10;20),\ [20;30)$, số $20$) → Do Now 3, câu bản lề A; **Ví dụ 2** (chia nhóm, $47-12$) → câu bản lề B, Câu 6; **Ví dụ 3** (lập bảng tần số 15 cân nặng) → Câu 4, Tìm lỗi sai; **Ví dụ 4–5** (biểu đồ chiều cao 40 em) → Câu 5; **Ví dụ 6** (tần số khuyết) → Câu 7.
- Hai tình huống **[Minh họa]** (chiều cao 12 học sinh, khảo sát giờ ngủ) do người soạn tự đặt, không trích từ SGK. Hãy đối chiếu với phần Mở đầu của Bài 8 trong SGK nếu thầy muốn dùng tình huống sách.
- Biểu đồ cột (histogram) không in trong phiếu; chiếu từ bài giảng (Ví dụ 4) hoặc vẽ lên bảng.

## 2. Mục tiêu (theo Công văn 5512)

**Hoạt động Mở đầu (7 phút)**
- *Mục tiêu:* huy động kiến thức cũ (tỉ lệ phần trăm, số trung bình, bất đẳng thức kép, cấp số nhân); gợi nhu cầu gom số liệu thành nhóm.
- *Nội dung:* Do Now 4 câu; Notice & Wonder với 12 số đo chiều cao.
- *Sản phẩm:* bài Do Now tự chấm; danh sách "nhận thấy – thắc mắc"; câu hỏi của bài học.
- *Tổ chức:* xem Mục 4.

**Hoạt động Luyện tập – Vận dụng (21 phút + về nhà)**
- *Mục tiêu:* xác định số liệu thuộc nhóm nào (đầu mút trái lấy, đầu mút phải không lấy); chia nhóm; lập bảng tần số; tính tần số tương đối và tần số tích luỹ; tìm tần số khuyết.
- *Nội dung:* câu hỏi bản lề, 7 câu xen kẽ, tìm lỗi sai, phiếu ra khỏi lớp, bài về nhà dùng bảng tính.
- *Sản phẩm:* phiếu đã làm; Exit ticket; ảnh bảng tính và biểu đồ cột.

## 3. Tiến trình 45 phút

| Phút | Hoạt động | Ghi chú |
|---|---|---|
| 0–4 | Do Now (Mục 1 phiếu) | Học sinh làm một mình, giáo viên đi quanh |
| 4–7 | Notice & Wonder (Mục 2) | Đưa ra câu hỏi của bài học |
| 7–25 | **Hình thành kiến thức** | *Giáo viên tự dạy theo bài giảng: Kiến thức trọng tâm 1–4, Dạng 1–5, Ví dụ 1–6* |
| ~14 | Câu hỏi bản lề A (Mục 3), nằm trong phần trên | Dừng sau Ví dụ 1; giơ thẻ A/B/C/D (2 phút) |
| 25–35 | Luyện tập xen kẽ (Mục 4) | Câu 1–7, làm cá nhân rồi đối chiếu cặp đôi |
| 35–38 | Tìm lỗi sai (Mục 5) | Chiếu không ghi tên |
| 38–42 | Phiếu ra khỏi lớp (Mục 6) | Thu phiếu |
| 42–43 | Một phút suy ngẫm (Mục 7) | Viết cá nhân |
| 43–45 | Dặn dò bài về nhà (Mục 8) | |

*Câu hỏi bản lề B dùng sau Ví dụ 2 (chia nhóm), hoặc thay câu A khi lớp đã vững. Hai phút bản lề nằm trong 18 phút hình thành kiến thức.*

## 4. Hướng dẫn từng hoạt động

### 4.1. Do Now – ôn truy xuất giãn cách (*Retrieval practice with spacing*)
- **Bằng chứng: Mạnh** (Rosenshine; Craig Barton). Truy xuất kiến thức cũ trước khi học mới giúp nhớ lâu; tự chấm không lấy điểm nên giảm áp lực.
- **Tổ chức theo 5512:** (1) chiếu 4 câu, nói rõ "không điểm"; (2) học sinh làm một mình 3 phút; (3) giáo viên chiếu đáp án, học sinh tự chấm bằng bút khác màu; (4) giáo viên nhấn Câu 3 vì đây là kiến thức nền của nhóm $[a;b)$.
- **Đáp án:**
  1. $\dfrac{14}{40}\cdot 100\%=35\%$.
  2. $\dfrac{3+5+5+8+9}{5}=6$.
  3. **Không**, vì $20<20$ sai.
  4. $u_4=3\cdot 2^3=24$.
- **Lỗi dự kiến:** câu 1 ghi $0{,}35$ hoặc $2{,}8$; câu 3 trả lời "có" vì thấy dấu bằng ở $x=10$; câu 4 viết $3\cdot 2^4=48$.
- **Ít công nghệ:** viết trên giấy nháp, chiếu đáp án. **Công cụ số:** Plickers hoặc Azota chấm phiếu giấy.

### 4.2. Tình huống mở đầu – Nhận ra và thắc mắc (*Notice & Wonder*, Annie Fetter – NCTM)
- **Bằng chứng: Kinh nghiệm thực tiễn.** Không có câu trả lời "đúng" nên học sinh yếu cũng tham gia được.
- **Tổ chức theo 5512:** (1) chiếu 12 số, hỏi "em nhận thấy gì, em thắc mắc gì"; (2) học sinh ghi ý kiến cá nhân 1 phút, chia sẻ với bạn cùng bàn; (3) gọi 3–4 em, ghi lên bảng hai cột; (4) giáo viên chốt: số liệu nhiều thì khó nhìn, cần gom vào các khoảng; nảy sinh câu hỏi số đúng mốc.
- **Đáp án gợi ý:** các số nằm trong khoảng $151$–$171$; có thể gom thành các khoảng $[150;155),\ [155;160),\ [160;165),\ [165;170),\ [170;175)$ với tần số $2,\ 3,\ 4,\ 2,\ 1$ (số $160$ và $165$ nằm đúng mốc, thuộc nhóm bên phải).
- **Lỗi dự kiến:** học sinh xếp $160$ vào nhóm bên trái → hỏi "nhóm $[a;b)$ lấy hay không lấy $b$?", quay lại ở Ví dụ 1.
- **Ít công nghệ:** viết trên bảng. **Công cụ số:** Padlet/Jamboard (không bắt buộc).

### 4.3. Câu hỏi bản lề (*Hinge question*, Dylan Wiliam)
- **Bằng chứng: Vừa.** Mỗi phương án nhiễu tương ứng một lỗi thật; giáo viên quyết định dạy tiếp hay dạy lại ngay trong tiết.
- **Tổ chức theo 5512:** (1) chiếu câu hỏi, cho 1 phút nghĩ; (2) học sinh khoanh vào phiếu và giơ thẻ A/B/C/D cùng lúc khi giáo viên đếm 3; (3) giáo viên đếm nhanh các lựa chọn; (4) gọi một em chọn đáp án sai giải thích vì sao em chọn.
- **Câu A – đáp án B:** $25\in[25;30)$ vì $25\le 25<30$.

| Phương án | Ứng với lỗi |
|---|---|
| A. $[20;25)$ | Lấy đầu mút phải vào nhóm |
| C. $[30;35)$ | Nhìn nhóm "kế tiếp" mà không kiểm tra bất đẳng thức |
| D. Không thuộc nhóm nào | Cho rằng đầu mút chung không thuộc nhóm nào |

- **Câu B – đáp án C:** $24-4=20$ chia hết cho $5$ nhưng $24$ nằm đúng đầu mút phải của nhóm thứ $4$ là $[19;24)$ (không chứa $24$), nên cần nhóm thứ $5$ là $[24;29)$.

| Phương án | Ứng với lỗi |
|---|---|
| A. $3$ | Lấy $20:5-1$ |
| B. $4$ | Chia $20:5=4$ mà quên đầu mút phải không thuộc nhóm |
| D. $6$ | Làm tròn lên rồi cộng thêm $1$ |

- **Nếu hơn khoảng 20% chọn sai:** dừng lại, làm lại Ví dụ 1 hoặc 2 với số khác, cho học sinh thảo luận cặp 1 phút rồi giơ thẻ lại. Nếu hơn 80% đúng: đi tiếp.
- **Ít công nghệ:** thẻ ABCD tự làm. **Công cụ số:** Plickers.

### 4.4. Luyện tập xen kẽ (*Interleaved practice*, Rohrer)
- **Bằng chứng: Mạnh** (Rohrer 2020: 60,7% so với 37,6%, $d=0{,}83$). Trộn dạng bài buộc học sinh tự chọn cách giải. Báo trước với lớp là sẽ thấy khó hơn so với làm từng dạng.
- **Tổ chức theo 5512:** (1) phát phiếu, nêu quy tắc "không xếp theo dạng"; (2) làm cá nhân 6 phút; (3) 2 phút đối chiếu cặp đôi, gọi 2–3 em báo cáo câu ★★ và ★★★; (4) chiếu lời giải, nhấn các bước dễ sai.
- **Đáp án và lời giải ngắn:**
  1. $50-35=15$.
  2. $20;\ 25$ (vì $20\le x<30$; $19$ nhỏ hơn, $30$ không thuộc).
  3. $S_5=\dfrac{3(1-2^5)}{1-2}=93$. *(dạng cũ – Bài 7)*
  4. $[40;45)$: $41,44$ → $2$; $[45;50)$: $45,47,49$ → $3$; $[50;55)$: $50,52,54$ → $3$; $[55;60)$: $55,58$ → $2$ (tổng $10$).
  5. $n=40$; tần số tương đối $\dfrac{12}{40}=30\%$; tần số tích luỹ $4+10+12=26$.
  6. $47-12=35$; cần $4L>35$; $L=8$ cho $32$ (thiếu), $L=9$ cho $36$ (đủ). Đáp số $9$.
  7. $\dfrac{9}{n}=36\%\Rightarrow n=25$; $x=25-9-6-3=7$.
- **Lỗi dự kiến:** câu 2 chọn cả $30$; câu 4 xếp $45$ vào nhóm $[40;45)$ (kết quả $3,2,3,2$); câu 5 nhầm tần số tích luỹ với tần số nhóm; câu 6 trả lời $8$ vì chia $35:4=8{,}75$ rồi làm tròn xuống; câu 7 quên tìm $n$ trước.
- **Ít công nghệ:** giấy, bảng con. **Công cụ số:** bảng tính (hàm COUNTIFS) để kiểm tra tần số các nhóm.

### 4.5. Tìm lỗi sai – ví dụ giải sai có chủ ý (*My Favorite No*, Leah Alcala; EEF 2022)
- **Bằng chứng: Vừa – Mạnh.**
- **Tổ chức theo 5512:** (1) chiếu lời giải của "bạn Bình", không ghi tên người thật; (2) học sinh tự tìm lỗi 1 phút, trao đổi cặp đôi; (3) gọi một em chỉ lỗi, **khen phần đúng trước** (tổng $3+2+1=6$ đúng với số số liệu); (4) chốt quy tắc.
- **Đáp án:** lỗi ở việc xếp $15$ và $20$ (đầu mút phải) vào nhóm bên trái. Đúng là $[10;15)$: $10,12$ → $2$; $[15;20)$: $15,17$ → $2$; $[20;25)$: $20,24$ → $2$.
- **Lỗi liên quan cần theo dõi:** chỉ kiểm tra tổng tần số mà không kiểm tra từng số.

### 4.6. Phiếu ra khỏi lớp (*Exit ticket*, Agarwal; Fletcher-Wood)
- **Bằng chứng: Mạnh** khi có phản hồi và có chữa bài.
- **Tổ chức theo 5512:** (1) phát phiếu cắt đôi hoặc dùng cuối phiếu; (2) làm cá nhân 4 phút, không trao đổi; (3) thu phiếu; (4) chia chồng (Mục 5) rồi chữa ở đầu tiết sau.
- **Đáp án:**
  - Câu 1: **B.** $\dfrac{7}{20}\cdot 100\%=35\%$. (Nhiễu: A là tần số $7$ quên chia cho $n$; C là $\dfrac{6}{20}$, lấy nhầm nhóm bên cạnh; D là $\dfrac{7}{40}$, chia nhầm cho $40$.)
  - Câu 2: a) **Đúng** ($3+7+6+4=20$). b) **Đúng** ($3+7=10$ em, các nhóm $[0;5)$ và $[5;10)$). c) **Sai** (tần số tích luỹ là $3+7+6=16$, còn $6$ là tần số của riêng nhóm). d) **Sai** ($15\in[15;20)$ vì nhóm $[10;15)$ không chứa $15$).
  - Câu 3 (ôn chủ đề cũ): **32** ($u_{10}=5+9\cdot 3=32$).
- **Lỗi dự kiến:** câu 1 chọn A; câu 2c chọn "đúng" vì nhầm tần số với tần số tích luỹ; câu 2d chọn "đúng"; câu 3 ghi $35$ (dùng $u_1+10d$).

### 4.7. Một phút suy ngẫm (*Metacognitive reflection*)
- **Bằng chứng: Mạnh** (EEF: +8 tháng). Học sinh tự nêu bước hay sai, ví dụ "đầu mút phải không thuộc nhóm" hay "kiểm tra tổng tần số bằng cỡ mẫu". Giáo viên không chấm; có thể đọc lướt vài phiếu để chọn Do Now tiết sau.

### 4.8. Vận dụng về nhà
- **Đáp án mẫu:** bài làm mở, kết quả phụ thuộc số liệu thu thập. Kiểm tra: tổng các tần số bằng số người khảo sát; tổng các tần số tương đối bằng $100\%$; biểu đồ có các cột liền nhau; số người ngủ từ $8$ giờ trở lên bằng tổng tần số các nhóm từ $[8;9)$ trở đi.
- **Lỗi dự kiến:** xếp giá trị đúng $7$ giờ vào nhóm $[6;7)$; tính tần số tương đối bằng cách chia cho số nhóm; để khoảng cách giữa các cột khác $0$.
- **Tích hợp năng lực số (gợi ý của người soạn, mức Nâng cao 1 – Thông tư 02/2025, Công văn 3456):** học sinh **tạo sản phẩm số** là bảng tính và biểu đồ cột; dùng hàm COUNTIFS để đếm tần số và công thức chia để ra tần số tương đối; không ghi tên người được khảo sát để bảo vệ dữ liệu cá nhân.

## 5. Xử lý phiếu ra khỏi lớp

| Chồng | Dấu hiệu | Việc làm |
|---|---|---|
| 1. Đúng hết | 3/3 câu đúng | Dạy tiếp Bài 9; giao thêm Câu 7 dạng mở rộng |
| 2. Sai hết | 0–1 câu đúng | Dạy lại: chia nhóm nhỏ, làm lại Ví dụ 1, 3, 5 với số khác |
| 3. Nửa đúng nửa sai | 2 câu đúng | Ôn nhanh 5 phút đầu tiết sau bằng đúng câu bị sai nhiều |

**Gợi ý Do Now cho tiết sau:** (1) bài vừa học: nhóm $[20;30)$ có chứa $30$ không ($\text{không}$); (2) câu học sinh sai nhiều nhất trong Exit ticket; (3) tính tần số tương đối của nhóm có tần số $9$ trong mẫu cỡ $30$ (đáp án $30\%$); (4) một câu cấp số nhân để giữ giãn cách.

## 6. Phân hóa

- **Học sinh yếu:** phát kèm mẫu chưa hoàn chỉnh cho Câu 4: "$[40;45)$: số nào thoả $40\le x<45$? ……"; cho phép dùng Ví dụ 3 làm ví dụ mẫu; chỉ yêu cầu Câu 1–5.
- **Học sinh khá giỏi:** làm Câu 7, rồi câu hỏi mở: *với cùng một mẫu số liệu, nếu đổi độ dài nhóm từ $5$ sang $10$, tần số tương đối của một nhóm thay đổi thế nào? Cho ví dụ cho thấy hình dạng biểu đồ cột có thể thay đổi.*

## 7. Đáp án toàn bộ Phần A (chấm nhanh)

| Mục | Đáp án |
|---|---|
| Do Now 1 | $35\%$ |
| Do Now 2 | $6$ |
| Do Now 3 | Không |
| Do Now 4 | $24$ |
| Bản lề A | B |
| Bản lề B | C |
| Luyện tập 1 | $15$ |
| Luyện tập 2 | $20;\ 25$ |
| Luyện tập 3 | $93$ |
| Luyện tập 4 | $2;\ 3;\ 3;\ 2$ |
| Luyện tập 5 | $30\%$ và $26$ |
| Luyện tập 6 | $9$ |
| Luyện tập 7 | $x=7$ |
| Tìm lỗi sai | Xếp đầu mút phải vào nhóm bên trái; đúng là $2,\ 2,\ 2$ |
| Exit 1 | B |
| Exit 2 | a) Đ · b) Đ · c) S · d) S |
| Exit 3 | $32$ |
| Về nhà | Bài mở: tổng tần số bằng số người khảo sát; tổng tần số tương đối $100\%$ |
`);

/* =====================================================================
   PHIẾU HỌC TẬP TRÊN LỚP – Toán 11 · Bài 9. Các số đặc trưng đo xu thế trung tâm (thầy yêu cầu 16/10/2026)
   Bám Ví dụ 1–6 của bài giảng bai-9 (lop11.js). Tình huống tự soạn ghi **[Minh họa]**.
   ===================================================================== */
Lecture.addSheet('lop11', 'bai-9', String.raw`# PHIẾU HỌC TẬP – Toán 11 · Bài 9. Các số đặc trưng đo xu thế trung tâm

**Họ tên:** ……………………………………… **Lớp:** …………… **Ngày:** ……………………

## 1. Vào lớp làm ngay

**Câu 1.** Tìm trung điểm của nhóm $[20;30)$. Đáp số: ………………………

**Câu 2.** Số $20$ có thuộc nhóm $[10;20)$ không? Đáp số: ………………………

**Câu 3.** Bảng tần số có các tần số $4,\ 7,\ 5,\ 4$. Tính cỡ mẫu $n$ và $\dfrac{n}{2}$. Đáp số: ………………………

**Câu 4.** Tính $2 + \dfrac{10 - 4}{8}\cdot 10$. Đáp số: ………………………

## 2. Tình huống mở đầu **[Minh họa]**

Thời gian tự học mỗi tối (phút) của $40$ học sinh lớp 11A:

| Nhóm | $[20;40)$ | $[40;60)$ | $[60;80)$ | $[80;100)$ | $[100;120)$ |
|---|---|---|---|---|---|
| Tần số | $6$ | $8$ | $10$ | $10$ | $6$ |

**Em nhận thấy:** ………………………………………………………… **Em thắc mắc:** ………………………………………………

> **Câu hỏi của bài học:** Làm sao dùng **một con số** để nói "lớp này thường tự học bao lâu" khi ta chỉ có bảng ghép nhóm, không còn số liệu gốc? Có thể có những con số nào, và mỗi con số trả lời câu hỏi gì?

## 3. Câu hỏi bản lề

**Câu A.** Bảng tần số: $[0;4)$: $2$; $[4;8)$: $5$; $[8;12)$: $3$. Số trung bình cộng là

A. $6$

B. $6{,}4$

C. $64$

D. $4$

**Câu B.** Bảng tần số: $[0;10)$: $4$; $[10;20)$: $8$; $[20;30)$: $6$; $[30;40)$: $2$. Nhóm chứa trung vị là

A. $[0;10)$

B. $[10;20)$

C. $[20;30)$

D. $[30;40)$

## 4. Luyện tập xen kẽ

**Câu 1 ★.** Bảng: $[10;20)$: $3$; $[20;30)$: $4$; $[30;40)$: $3$. Tính số trung bình cộng. Đáp số: ………………………

**Câu 2 ★.** Bảng: $[40;50)$: $2$; $[50;60)$: $8$; $[60;70)$: $6$; $[70;80)$: $4$. Tính trung vị. Đáp số: ………………………

**Câu 3 ★★.** Bảng: $[10;20)$: $4$; $[20;30)$: $10$; $[30;40)$: $6$; $[40;50)$: $2$. Tính mốt. Đáp số: ………………………

**Câu 4 ★★.** Bảng: $[0;10)$: $4$; $[10;20)$: $10$; $[20;30)$: $16$; $[30;40)$: $10$. Tính $Q_1$ và $Q_3$. Đáp số: ………………………

**Câu 5 ★★.** Cửa hàng quần áo muốn biết cỡ áo bán được nhiều nhất để nhập hàng. Nên dùng số trung bình, trung vị hay mốt? Đáp số: ………………………

**Câu 6 ★★★.** Bảng: $[0;5)$: $2$; $[5;10)$: $8$; $[10;15)$: $4$; $[15;20)$: $x$. Biết trung vị bằng $8{,}75$. Tìm $x$. Đáp số: ………………………

**Câu 7 ★★★.** Doanh thu mỗi ngày (triệu đồng) trong $20$ ngày: $[5;10)$: $2$; $[10;15)$: $6$; $[15;20)$: $8$; $[20;25)$: $4$. Tính số trung bình cộng và trung vị. Đáp số: ………………………

## 5. Tìm lỗi sai

> **Bài toán.** Bảng tần số: $[0;10)$: $4$; $[10;20)$: $8$; $[20;30)$: $6$; $[30;40)$: $2$. Tính trung vị.
>
> **Lời giải của bạn X:** $n = 4 + 8 + 6 + 2 = 18$ nên $\dfrac{n}{2} = 9$. Nhóm chứa trung vị là $[10;20)$ với $C = 12$ (tần số tích luỹ). $M_e = 10 + \dfrac{9 - 12}{8}\cdot 10 = 6{,}25$.

Lời giải có **hai** chỗ sai. Em chỉ ra và sửa: ………………………………………………………………………………

## 6. Phiếu ra khỏi lớp

**Câu 1.** Bảng tần số: $[10;20)$: $6$; $[20;30)$: $12$; $[30;40)$: $10$. Mốt bằng

A. $25$

B. $27{,}5$

C. $22{,}5$

D. $30$

**Câu 2.** Bảng: $[0;10)$: $4$; $[10;20)$: $6$; $[20;30)$: $8$; $[30;40)$: $2$. Mỗi ý em ghi Đ hoặc S:

a) Số trung bình cộng là $19$. ……

b) Trung vị bằng $20$. ……

c) Nhóm chứa $Q_3$ là $[30;40)$. ……

d) Mốt bằng $25$. ……

**Câu 3.** Bảng: $[0;5)$: $2$; $[5;10)$: $4$; $[10;15)$: $8$; $[15;20)$: $6$. Trung vị bằng: …………

## 7. Một phút suy ngẫm

*Với cùng một bảng ghép nhóm, em chọn số trung bình, trung vị hay mốt khi nào? Vì sao các giá trị đó chỉ là gần đúng?* ……………………………………………………………………

## 8. Vận dụng về nhà

Em khảo sát thời gian tự học mỗi tối của **ít nhất 20 bạn** (hoặc tiền tiêu vặt mỗi tuần), ghép thành $4$–$5$ nhóm cùng độ dài. Lập bảng tính (Excel hoặc Google Sheets) tính số trung bình cộng, trung vị, $Q_1$, $Q_3$ và mốt theo công thức trong bài; nhận xét số nào mô tả tốt nhất nhóm bạn đã khảo sát. **Sản phẩm:** bảng số liệu, file bảng tính và $3$ dòng nhận xét, nộp ở tiết học sau.

<div style="page-break-after: always;"></div>

# PHẦN B. GỢI Ý SƯ PHẠM CHO GIÁO VIÊN – Toán 11 · Bài 9. Các số đặc trưng đo xu thế trung tâm

## 1. Thông tin bài

- **Lớp 11 · Chương III. Mẫu số liệu ghép nhóm · Bài 9. Các số đặc trưng đo xu thế trung tâm** (sách Kết nối tri thức với cuộc sống).
- **Giả định:** 1 tiết 45 phút; lớp đại trà 40–45 học sinh; chỉ có máy chiếu, giấy/bảng con và máy tính cầm tay; tiết học bài mới.
- Bảng tự học ở mục mở đầu và bài khảo sát về nhà là **[Minh họa]** do người soạn tự đặt, không trích từ SGK. Thầy đối chiếu với phần Mở đầu của Bài 9 trong SGK nếu muốn dùng tình huống sách.
- Phiếu bám các ví dụ của bài giảng: **Ví dụ 1** (số trung bình) → Do Now 1, câu bản lề A, Luyện tập 1, 7; **Ví dụ 2** (trung vị) → Do Now 2–4, câu bản lề B, Luyện tập 2, Tìm lỗi sai, Exit ticket 3; **Ví dụ 3** (tứ phân vị) → Luyện tập 4, Exit ticket 2c; **Ví dụ 4** (mốt) → Luyện tập 3, Exit ticket 1, 2d; **Ví dụ 5–6** (tần số khuyết, chọn số đặc trưng) → Luyện tập 5–6, bài về nhà.
- Phiếu chỉ dành cho khởi động và củng cố; phần **Hình thành kiến thức** (bốn công thức) thầy tự dạy theo bài giảng.

## 2. Mục tiêu (theo Công văn 5512)

**Hoạt động Mở đầu (7 phút)**
- *Mục tiêu:* huy động trung điểm, quy ước nhóm $[a;b)$, cỡ mẫu và tần số tích luỹ từ Bài 8; tạo nhu cầu có số đặc trưng thay cho cả bảng.
- *Nội dung:* Do Now 4 câu; Notice & Wonder với bảng thời gian tự học.
- *Sản phẩm:* Do Now tự chấm; danh sách "nhận thấy – thắc mắc"; câu hỏi của bài học.

**Hoạt động Luyện tập – Vận dụng (21 phút + về nhà)**
- *Mục tiêu:* tính số trung bình, trung vị, tứ phân vị, mốt từ bảng ghép nhóm; chọn số đặc trưng theo tình huống; nhận ra lỗi điển hình (nhầm $C$, sai cỡ mẫu, dùng đầu mút thay trung điểm).
- *Nội dung:* câu hỏi bản lề, 7 câu xen kẽ, tìm lỗi sai, phiếu ra khỏi lớp, bài khảo sát về nhà.
- *Sản phẩm:* phiếu đã làm; Exit ticket; bảng tính và nhận xét.

## 3. Tiến trình 45 phút

| Phút | Hoạt động | Ghi chú |
|---|---|---|
| 0–4 | Do Now (Mục 1 phiếu) | Học sinh làm một mình |
| 4–7 | Notice & Wonder (Mục 2) | Đưa ra câu hỏi của bài học |
| 7–25 | **Hình thành kiến thức** | *Giáo viên tự dạy theo bài giảng: Kiến thức trọng tâm 1–5, Dạng 1–5, Ví dụ 1–6* |
| ~14 | Câu hỏi bản lề A (Mục 3), nằm trong phần trên | Dừng sau số trung bình (Ví dụ 1); giơ thẻ A/B/C/D (2 phút) |
| 25–35 | Luyện tập xen kẽ (Mục 4) | Câu 1–7, cá nhân rồi đối chiếu cặp đôi |
| 35–38 | Tìm lỗi sai (Mục 5) | Chiếu không ghi tên |
| 38–42 | Phiếu ra khỏi lớp (Mục 6) | Thu phiếu |
| 42–43 | Một phút suy ngẫm (Mục 7) | Viết cá nhân |
| 43–45 | Dặn dò bài về nhà (Mục 8) | |

*Câu hỏi bản lề B dùng sau khi dạy trung vị (Ví dụ 2), hoặc thay câu A khi lớp đã vững.*

## 4. Hướng dẫn từng hoạt động

### 4.1. Do Now – ôn truy xuất giãn cách (*Retrieval practice with spacing*)
- **Bằng chứng: Mạnh** (Rosenshine; Craig Barton). Truy xuất kiến thức Bài 8 trước khi học mới; tự chấm không lấy điểm.
- **Tổ chức theo 5512:** chiếu 4 câu, học sinh làm một mình 3 phút, chiếu đáp án, tự chấm bằng bút khác màu; nhận xét: hôm nay ta biến cả bảng thành các con số đại diện.
- **Đáp án:**
  1. $25$.
  2. Không (nhóm không chứa đầu mút phải).
  3. $n = 20$, $\dfrac{n}{2} = 10$.
  4. $2 + 0{,}75\cdot 10 = 9{,}5$.
- **Lỗi dự kiến:** câu 1 ghi $20$ hoặc $30$ (đầu mút); câu 2 ghi "có"; câu 4 tính $\dfrac{10 - 4}{8}$ rồi quên nhân với $10$.

### 4.2. Tình huống mở đầu – Nhận ra và thắc mắc (*Notice & Wonder*, Annie Fetter – NCTM)
- **Bằng chứng: Kinh nghiệm thực tiễn.** Không có câu trả lời "đúng" nên học sinh yếu cũng tham gia được.
- **Gợi ý nhận thấy:** tần số tăng rồi giảm; nhóm $[60;80)$ và $[80;100)$ cùng nhiều nhất; tổng $40$ em. **Gợi ý thắc mắc:** "trung bình" có phải tính từ giữa nhóm không? Một nửa lớp học bao lâu?
- Chốt: cần các con số đại diện — trung bình, trung vị, tứ phân vị, mốt.

### 4.3. Câu hỏi bản lề (*Hinge question*, Dylan Wiliam)
- **Bằng chứng: Mạnh.** Mỗi đáp án sai ứng một ngộ nhận.
- **Câu A:** đáp án **B** ($\dfrac{2\cdot 2 + 5\cdot 6 + 3\cdot 10}{10} = 6{,}4$). A là trung bình cộng của ba giá trị đại diện (quên tần số); C là tổng chưa chia $n$; D là đầu mút.
- **Câu B:** đáp án **B** ($n = 20$, $\dfrac{n}{2} = 10$, tần số tích luỹ $4;\ 12$). A là nhóm đầu; C là nhóm có tần số lớn nhất sau B; D là nhóm cuối.
- Nếu quá nửa lớp sai: dừng 2 phút, viết lại bảng kèm cột tần số tích luỹ.

### 4.4. Luyện tập xen kẽ (*Interleaved practice*, Rohrer 2020)
- **Bằng chứng: Trung bình–Mạnh.** Xen trung bình, trung vị, mốt, tứ phân vị trong cùng lượt.
- **Đáp án:** 1) $25$. 2) $60$ ($\dfrac{n}{2} = 10$ đạt ngay ở nhóm $[50;60)$ với $C = 2$: $50 + \dfrac{10 - 2}{8}\cdot 10$). 3) $26$ ($20 + \dfrac{10 - 4}{10 - 4 + 10 - 6}\cdot 10$). 4) $Q_1 = 16$, $Q_3 = 30$. 5) Mốt. 6) $x = 2$ ($n = 16$). 7) $\bar{x} = 16$, $M_e = 16{,}25$.
- **Lỗi dự kiến:** câu 3 hoán đổi nhóm trước – nhóm sau; câu 4 dùng cùng một nhóm cho cả $Q_1$ và $Q_3$; câu 6 quên giải ngược để tìm $n$.

### 4.5. Tìm lỗi sai – ví dụ giải sai có chủ ý (*My Favorite No*, Leah Alcala; EEF 2022)
- **Bằng chứng: Trung bình.**
- **Hai lỗi:** (1) cỡ mẫu $n = 4 + 8 + 6 + 2 = 20$, không phải $18$, nên $\dfrac{n}{2} = 10$; (2) $C$ là tần số tích luỹ của nhóm **đứng trước** nhóm chứa trung vị, tức $C = 4$, không phải $12$. Đúng: $M_e = 10 + \dfrac{10 - 4}{8}\cdot 10 = 17{,}5$. Gợi ý nhận ra lỗi: $6{,}25$ không nằm trong nhóm $[10;20)$.

### 4.6. Phiếu ra khỏi lớp (*Exit ticket*, Agarwal; Fletcher-Wood)
- **Bằng chứng: Mạnh.** Ba câu cho ba chồng phản hồi.
- **Đáp án:** Câu 1: **B** ($20 + \dfrac{12 - 6}{12 - 6 + 12 - 10}\cdot 10 = 27{,}5$; đáp án C là hoán đổi trước–sau). Câu 2: a) Đ ($\bar{x} = 19$) · b) Đ ($M_e = 10 + \dfrac{10 - 4}{6}\cdot 10 = 20$) · c) S (nhóm chứa $Q_3$ là $[20;30)$ vì $\dfrac{3n}{4} = 15$ và tần số tích luỹ $4;\ 10;\ 18$) · d) S ($M_o = 22{,}5$). Câu 3: $12{,}5$.

### 4.7. Một phút suy ngẫm (*Metacognitive reflection*, EEF)
- Mong đợi: trung bình dễ bị kéo bởi số liệu bất thường, trung vị chia đôi, mốt cho biết cái phổ biến; chỉ gần đúng vì dùng giá trị đại diện thay cho số liệu thật.

### 4.8. Vận dụng về nhà
- **Mục tiêu:** tự khảo sát, dùng bảng tính để tính các số đặc trưng và nhận xét.
- **Tiêu chí nộp:** bảng có ít nhất $20$ số liệu và $4$–$5$ nhóm; đủ $5$ số đặc trưng; nhận xét nêu số nào phù hợp và vì sao.

## 5. Xử lý phiếu ra khỏi lớp

| Chồng | Dấu hiệu | Việc làm |
|---|---|---|
| 1. Đúng hết | 3/3 câu đúng | Giao thêm bài tìm tần số khuyết khi biết trung vị hoặc mốt |
| 2. Sai hết | 0–1 câu đúng | Ôn nhóm nhỏ: làm lại Ví dụ 2–3 theo thứ tự "tần số tích luỹ – nhóm – công thức" |
| 3. Nửa đúng nửa sai | 2 câu đúng | Ôn nhanh 5 phút đầu tiết sau bằng câu bị sai nhiều |

**Gợi ý Do Now cho tiết sau (Bài 10):** (1) một câu về $C$ hoặc nhóm chứa trung vị bị sai nhiều; (2) tính $Q_3 - Q_1$ từ hai số cho sẵn; (3) tìm giá trị lớn nhất và nhỏ nhất của mẫu số liệu.

## 6. Phân hóa

- **Học sinh yếu:** phát sẵn bảng có cột "giá trị đại diện" và "tần số tích luỹ" để điền; chỉ yêu cầu Câu 1–5.
- **Học sinh khá giỏi:** làm Câu 6–7, rồi câu mở: *đổi một số liệu ở nhóm cuối thành nhóm cao hơn nhiều; số trung bình, trung vị thay đổi thế nào? Số nào ít thay đổi?*

## 7. Tích hợp năng lực số (gợi ý của người soạn; Thông tư 02/2025, Công văn 3456; lớp 11 ở mức Nâng cao 1)

- **Địa chỉ 1:** học sinh dùng Excel/Google Sheets với công thức $=\mathrm{SUMPRODUCT}$ tính $\bar{x}$ và các ô công thức tính $M_e$, $Q_1$, $Q_3$ (sản phẩm: file bảng tính).
- **Địa chỉ 2:** bài về nhà thu thập số liệu bằng biểu mẫu trực tuyến, xuất bảng số liệu.

## 8. Đáp án toàn bộ Phần A (chấm nhanh)

| Mục | Đáp án |
|---|---|
| Do Now 1 | $25$ |
| Do Now 2 | Không |
| Do Now 3 | $n = 20$, $\dfrac{n}{2} = 10$ |
| Do Now 4 | $9{,}5$ |
| Mở đầu | Cần số đại diện: trung bình, trung vị, tứ phân vị, mốt |
| Bản lề A | B |
| Bản lề B | B |
| Luyện tập 1 | $25$ |
| Luyện tập 2 | $60$ |
| Luyện tập 3 | $26$ |
| Luyện tập 4 | $Q_1 = 16$; $Q_3 = 30$ |
| Luyện tập 5 | Mốt |
| Luyện tập 6 | $x = 2$ |
| Luyện tập 7 | $\bar{x} = 16$; $M_e = 16{,}25$ |
| Tìm lỗi sai | $n = 20$; $C = 4$; $M_e = 17{,}5$ |
| Exit 1 | B |
| Exit 2 | a) Đ · b) Đ · c) S · d) S |
| Exit 3 | $12{,}5$ |
| Về nhà | Bảng tính đủ 5 số đặc trưng và nhận xét |
`);

/* =====================================================================
   PHIẾU HỌC TẬP TRÊN LỚP – Toán 11 · Ôn tập chương II (thầy yêu cầu 17/10/2026)
   Bám Ví dụ 1–2 và Luyện tập 1–2 của bài giảng on-tap-c2 (lop11.js). Tình huống tự soạn ghi **[Minh họa]**.
   ===================================================================== */
Lecture.addSheet('lop11', 'on-tap-c2', String.raw`# PHIẾU HỌC TẬP – Toán 11 · Ôn tập chương II

**Họ tên:** ……………………………………… **Lớp:** …………… **Ngày:** ……………………

## 1. Vào lớp làm ngay

**Câu 1.** Cấp số cộng $u_1=1,\ d=2$. Tính $S_{10}$. Đáp án: ………………………

**Câu 2.** Cấp số nhân $u_1=2,\ q=3$. Tính $u_4$. Đáp án: ………………………

**Câu 3.** Giải phương trình $q^3=-8$. Đáp án: ………………………

**Câu 4.** Tính $1{,}1^2$. Đáp án: ………………………

## 2. Tình huống mở đầu

| Hàng | Các số (viết tiếp theo quy luật) |
|---|---|
| (a) | $3,\ 7,\ 11,\ 15,\ \ldots$ |
| (b) | $3,\ 6,\ 12,\ 24,\ \ldots$ |
| (c) | $1,\ 4,\ 9,\ 16,\ \ldots$ |

**Em nhận thấy:** ………………………………………………… **Em thắc mắc:** ………………………………………………

> **Câu hỏi của bài học:** Hàng nào là cấp số cộng, hàng nào là cấp số nhân, hàng nào không phải? Dựa vào đâu để kết luận nhanh?

## 3. Câu hỏi bản lề

**Câu A.** Cấp số cộng có $u_1=2,\ u_4=11$. Công sai $d$ bằng

A. $\dfrac94$

B. $3$

C. $9$

D. $13$

**Câu B.** Cấp số nhân có $u_1=3,\ q=2$. Tổng $S_4$ bằng

A. $48$

B. $45$

C. $24$

D. $93$

## 4. Luyện tập xen kẽ

**Câu 1 ★.** Dãy $u_n=2n+1$ có là cấp số cộng không? Tính $S_{10}$. Đáp số: ………………………

**Câu 2 ★.** Cấp số nhân có $u_1=3,\ u_4=24$. Tìm $q$. Đáp số: ………………………

**Câu 3 ★.** Cấp số cộng có $u_5=9,\ S_5=25$. Tìm $u_1,\ d$. Đáp số: ………………………

**Câu 4 ★★.** Cấp số nhân $u_1=3,\ q=2$. Tính $S_6$. Đáp số: ………………………

**Câu 5 ★★.** Tìm $x$ để $2,\ x,\ 18$ lập thành cấp số nhân. Đáp số: ………………………

**Câu 6 ★★.** Cây giống cao $20$ cm, mỗi tuần cao thêm $10\%$ so với tuần trước. Sau $5$ tuần cao khoảng bao nhiêu cm (làm tròn phần mười)? Đáp số: ………………………

**Câu 7 ★★★.** Cấp số cộng $u_1=2,\ d=4$ có $S_n=200$. Tìm $n$. *Gợi ý: rút gọn $S_n$ theo $n$.* ………………………

## 5. Tìm lỗi sai

Bạn Lan tính: *"Cấp số cộng $u_1=3,\ d=2$ nên $u_{10}=3+10\cdot 2=23$."*

**Lỗi ở:** ………………………………………… **Lời giải đúng:** ……………………………………………………

## 6. Phiếu ra khỏi lớp

**Câu 1 (trắc nghiệm).** Cấp số cộng $u_1=7,\ d=-2$. Tổng $S_6$ bằng

A. $12$

B. $24$

C. $-3$

D. $4$

**Câu 2 (đúng – sai).** Cấp số cộng $(u_n)$ có $u_1=-1,\ d=4$:

a) $u_5=15$.  ☐ Đ ☐ S

b) $u_n=4n-1$.  ☐ Đ ☐ S

c) Số $99$ là một số hạng của dãy.  ☐ Đ ☐ S

d) $S_4=24$.  ☐ Đ ☐ S

**Câu 3 (trả lời ngắn).** Tính $1+3+5+\cdots+19$. Đáp số: …………

## 7. Một phút suy ngẫm

Dữ kiện nào cho biết dùng cấp số cộng, dữ kiện nào cho biết dùng cấp số nhân? ……………………………………………………

## 8. Vận dụng về nhà

**[Minh họa]** Công ty A trả lương năm đầu $120$ triệu đồng, mỗi năm tăng thêm $6$ triệu. Công ty B trả $120$ triệu năm đầu, mỗi năm tăng $5\%$ so với năm trước. Tính tổng lương $10$ năm đầu ở mỗi công ty và cho biết nơi nào nhiều hơn (làm tròn đến hàng phần trăm triệu).

<div style="page-break-after: always;"></div>

# PHẦN B. GỢI Ý SƯ PHẠM CHO GIÁO VIÊN – Toán 11 · Ôn tập chương II

## 1. Thông tin bài

- **Lớp 11 · Chương II. Dãy số. Cấp số cộng và cấp số nhân · Ôn tập chương II** (sách Kết nối tri thức với cuộc sống).
- **Giả định:** 1 tiết 45 phút; lớp đại trà; chỉ có máy chiếu và giấy/bảng con.
- Phiếu bám bài giảng: **Ví dụ 1** ($u_5=9,\ S_5=25$) → Luyện tập 3; **Ví dụ 2** ($u_1=3,\ u_4=24$, $S_6$) → Luyện tập 2, 4; **Luyện tập 1** ($u_n=2n+1$) → Luyện tập 1; **Luyện tập 2** (cây giống) → Luyện tập 6.
- Các tình huống **[Minh họa]** (ba hàng số, bài toán lương) do người soạn tự đặt, không trích từ SGK.

## 2. Mục tiêu

- Hệ thống công thức cấp số cộng – cấp số nhân; phân biệt hai loại dãy; tìm $u_1,\ d,\ q$ từ hai dữ kiện; tính $S_n$ (đếm đúng số số hạng); giải bài toán thực tế.

## 3. Tiến trình 45 phút

| Phút | Hoạt động | Ghi chú |
|---|---|---|
| 0–4 | Do Now (Mục 1) | Tự làm, tự chấm |
| 4–7 | Notice & Wonder (Mục 2) | Ghi câu hỏi của bài học |
| 7–22 | Hệ thống kiến thức | Giáo viên dạy theo bảng so sánh và Ví dụ 1–2 của bài giảng; dừng làm Câu hỏi bản lề A, B |
| 22–34 | Luyện tập xen kẽ (Mục 4) | Cá nhân rồi cặp đôi |
| 34–37 | Tìm lỗi sai (Mục 5) | |
| 37–42 | Phiếu ra khỏi lớp (Mục 6) | Thu phiếu |
| 42–45 | Suy ngẫm, dặn dò (Mục 7–8) | |

## 4. Đáp án và lỗi dự kiến

- **Do Now:** 1) $S_{10}=100$. 2) $u_4=2\cdot 27=54$. 3) $q=-2$. 4) $1{,}21$.
- **Notice & Wonder:** (a) cộng $4$ — cấp số cộng, số tiếp theo $19$; (b) nhân $2$ — cấp số nhân, số tiếp theo $48$; (c) các số chính phương, hiệu $3,5,7$ không đều, tỉ số không đều — không phải cả hai.
- **Bản lề A – đáp án B:** $d=\dfrac{11-2}{3}=3$. Nhiễu: A chia $4$ (đếm nhầm số khoảng cách), C quên chia, D là $u_4+u_1$. **Bản lề B – đáp án B:** $S_4=\dfrac{3(1-2^4)}{1-2}=45$. Nhiễu: A là $u_5$, C là $u_4$, D là $S_5$.
- **Luyện tập:**
  1. $u_{n+1}-u_n=2$ nên là cấp số cộng, $u_1=3$, $u_{10}=21$, $S_{10}=\dfrac{10(3+21)}{2}=120$.
  2. $q^3=\dfrac{24}{3}=8\Rightarrow q=2$.
  3. $S_5=\dfrac{5(u_1+9)}{2}=25\Rightarrow u_1=1$; $4d=8\Rightarrow d=2$.
  4. $S_6=\dfrac{3(1-2^6)}{1-2}=189$.
  5. $x^2=36\Rightarrow x=6$ hoặc $x=-6$.
  6. $20\cdot 1{,}1^5\approx 32{,}2$ (cm).
  7. $S_n=\dfrac{n[2\cdot 2+(n-1)\cdot 4]}{2}=2n^2=200\Rightarrow n=10$.
- **Tìm lỗi sai:** $u_{10}=u_1+9d$ (cách $u_1$ chín khoảng), đúng là $3+18=21$. Lỗi liên quan: dùng $n$ thay $n-1$; cũng gặp ở $u_1q^{n-1}$.
- **Exit:** Câu 1: **A**, $S_6=\dfrac{6(2\cdot 7+5\cdot(-2))}{2}=12$ (B quên chia $2$, C là $u_6=-3$, D là $u_1+u_6$). Câu 2: a) Đ ($-1+16=15$); b) S (đúng là $u_n=4n-5$); c) Đ ($4n-5=99\Rightarrow n=26$); d) S ($S_4=\dfrac{4(-2+12)}{2}=20$). Câu 3: $100$ (cấp số cộng $u_1=1,\ d=2,\ n=10$).
- **Về nhà:** A: $u_{10}=120+9\cdot 6=174$, $S_{10}=\dfrac{10(120+174)}{2}=1\,470$ triệu. B: $S_{10}=\dfrac{120(1{,}05^{10}-1)}{0{,}05}\approx 1\,509{,}35$ triệu. B nhiều hơn khoảng $39{,}35$ triệu. Lỗi dự kiến: dùng $q=0{,}05$ hoặc $q=5$; tính $1{,}05^{10}$ thành $1{,}5$.

## 5. Xử lý phiếu ra khỏi lớp và phân hóa

| Chồng | Dấu hiệu | Việc làm |
|---|---|---|
| 1. Đúng hết | 3/3 câu đúng | Giao Câu 7 và bài về nhà mở rộng |
| 2. Sai hết | 0–1 câu đúng | Làm lại Ví dụ 1–2 với số khác |
| 3. Nửa đúng nửa sai | 2 câu đúng | Ôn nhanh câu sai nhiều ở đầu tiết sau |

- **Học sinh yếu:** chỉ làm Câu 1–5, được dùng bảng công thức. **Học sinh khá giỏi:** làm Câu 7 và bài về nhà.

## 6. Đáp án toàn bộ Phần A (chấm nhanh)

| Mục | Đáp án |
|---|---|
| Do Now | $100;\ 54;\ -2;\ 1{,}21$ |
| Bản lề A, B | B, B |
| Luyện tập 1–7 | $120$ · $q=2$ · $u_1=1,\ d=2$ · $189$ · $x=\pm 6$ · $32{,}2$ cm · $n=10$ |
| Tìm lỗi sai | $u_{10}=21$ |
| Exit | A · Đ S Đ S · $100$ |
| Về nhà | $1\,470$ triệu; $\approx 1\,509{,}35$ triệu; B nhiều hơn |
`);
