#!/bin/bash
# =====================================================================
#  ĐĂNG "HỌC MÀ CHƠI" LÊN WEB – bấm đúp là chạy (macOS)
#  Kiểm tra lỗi → đóng gói → gửi lên GitHub → Vercel tự cập nhật web (~1 phút).
#  Có lỗi thì DỪNG, không đăng, và chỉ ra lỗi để dán cho ChatGPT sửa.
# =====================================================================
THU_MUC_MAC_DINH="$HOME/Documents/Dự án web/hoc-tap"
KHO="https://github.com/VuTienLuc/hoc-ma-choi.git"
export PATH="/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:$PATH"

xanh() { printf '\033[1;32m%s\033[0m\n' "$*"; }
vang() { printf '\033[1;33m%s\033[0m\n' "$*"; }
do_()  { printf '\033[1;31m%s\033[0m\n' "$*"; }
bao()  { command -v osascript >/dev/null && osascript -e "display notification \"$2\" with title \"Học mà chơi\" subtitle \"$1\"" >/dev/null 2>&1; }
dong() { echo; read -r -p "Nhấn Enter để đóng cửa sổ… " _; exit "${1:-0}"; }
dung() { echo; do_ "✗ $*"; bao "CHƯA đăng lên web" "$*"; dong 1; }

# ---- 1. Tìm thư mục dự án (tệp nằm trong tools/ hoặc ở Desktop) ----
TU="$(cd "$(dirname "$0")" && pwd)"
if   [ -f "$TU/../tools/kiem-tra.js" ]; then DIR="$(cd "$TU/.." && pwd)"
elif [ -f "$TU/tools/kiem-tra.js" ];    then DIR="$TU"
else DIR="$THU_MUC_MAC_DINH"; fi
cd "$DIR" 2>/dev/null && [ -f tools/kiem-tra.js ] || dung "Không thấy thư mục dự án: $DIR"
clear
echo "══════════════════════════════════════════════"
echo "   ĐĂNG HỌC MÀ CHƠI LÊN WEB"
echo "   Thư mục: $DIR"
echo "══════════════════════════════════════════════"

# ---- 2. Công cụ cần có ----
if ! git --version >/dev/null 2>&1; then
  vang "Máy chưa có git. Cửa sổ cài “Command Line Tools” sẽ hiện ra – bấm Cài đặt, chờ xong rồi bấm lại tệp này."
  xcode-select --install >/dev/null 2>&1; dong 1
fi
if ! command -v node >/dev/null 2>&1; then
  vang "Máy chưa có Node.js (cần để kiểm tra lỗi). Trang tải sẽ mở ra – cài bản LTS rồi bấm lại tệp này."
  open "https://nodejs.org/" 2>/dev/null; dong 1
fi

# ---- 3. Lần đầu: nối thư mục với kho GitHub (giữ nguyên tệp trên máy) ----
if [ ! -d .git ]; then
  echo "→ Lần đầu: nối thư mục với GitHub…"
  git init -q && git remote add origin "$KHO" || dung "Không tạo được kho git."
  git fetch -q origin main || dung "Không tải được từ GitHub – kiểm tra mạng Internet."
  git symbolic-ref HEAD refs/heads/main
  git update-ref refs/heads/main origin/main
  git reset -q
  git branch -q --set-upstream-to=origin/main main
fi
git config user.name  >/dev/null || git config user.name  "Vu Tien Luc"
git config user.email >/dev/null || git config user.email "vutluc@gmail.com"
git config pull.rebase true

# ---- 4. Có gì mới? ----
git add -A
if git diff --cached --quiet; then
  echo "→ Trên máy không có gì mới. Lấy bản mới nhất từ GitHub về…"
  git pull -q --ff-only origin main && xanh "✓ Thư mục trên máy đã giống bản trên web." || vang "Không lấy được bản mới (mạng?)."
  dong 0
fi
echo; echo "Các tệp đã thay đổi:"
git diff --cached --name-status | sed 's/^M/  sửa  /; s/^A/  thêm /; s/^D/  XOÁ  /; s/^R[0-9]*/  đổi tên/'

# ---- 5. Kiểm tra lỗi ----
echo; echo "→ Kiểm tra lỗi (khoảng 5 giây)…"
KQ="$(node tools/kiem-tra.js 30 2>&1)"
if ! echo "$KQ" | grep -q "ĐẠT ✓"; then
  echo "$KQ" | grep -v "^✓" | tail -40
  echo "$KQ" | grep -v "^✓" | tail -40 | pbcopy 2>/dev/null
  echo; do_ "CÓ LỖI – chưa đăng lên web."
  vang "Các dòng lỗi đã được CHÉP sẵn: mở ChatGPT, dán (⌘V) và gõ: “Sửa các lỗi này rồi đưa lại toàn bộ tệp”."
  bao "Có lỗi – chưa đăng" "Lỗi đã chép sẵn, dán cho ChatGPT sửa"; dong 1
fi
xanh "✓ Kiểm tra: ĐẠT"

# ---- 6. Đóng gói bản ngoại tuyến (dist) ----
if python3 -c 1 >/dev/null 2>&1; then python3 tools/build.py >/dev/null 2>&1 && xanh "✓ Đã đóng gói dist/hoc-tap.html"; fi
git add -A

# ---- 7. Xác nhận ----
echo; read -r -p "Đăng các thay đổi trên lên web? (Enter = ĐỒNG Ý, gõ n rồi Enter = huỷ): " TL
case "$TL" in n|N|khong|không) git reset -q; vang "Đã huỷ, chưa đăng gì."; dong 0;; esac

# ---- 8. Lưu, hợp với bản trên GitHub, kiểm tra lại, đăng ----
DS="$(git diff --cached --name-only | grep -v '^dist/' | sed 's#.*/##' | head -5 | paste -sd ',' - | sed 's/,/, /g')"
git commit -q -m "Cập nhật từ máy thầy $(date '+%d/%m/%Y %H:%M'): ${DS:-nội dung}" || dung "Không lưu được (commit)."
echo "→ Hợp với bản mới nhất trên GitHub…"
if ! git pull -q --rebase origin main; then
  git rebase --abort >/dev/null 2>&1
  git reset -q --soft HEAD~1
  dung "Bản trên GitHub vừa có người (Claude/ChatGPT) sửa CÙNG chỗ. Chưa đăng. Nhờ Claude: “Hợp bản trên máy với GitHub”."
fi
if ! node tools/kiem-tra.js 10 2>&1 | grep -q "ĐẠT ✓"; then
  dung "Sau khi hợp với bản trên GitHub thì kiểm tra không đạt. Chưa đăng – nhờ Claude xem giúp."
fi
python3 -c 1 >/dev/null 2>&1 && python3 tools/build.py >/dev/null 2>&1 && git add -A && ! git diff --cached --quiet && git commit -q -m "Đóng gói lại dist"
echo "→ Gửi lên GitHub…"
if ! git push -q origin main; then
  echo
  vang "Chưa gửi được. Nếu là LẦN ĐẦU: GitHub cần thầy đăng nhập một lần (xem mục 4 trong HUONG-DAN-CHATGPT.md)."
  vang "Nội dung đã lưu trên máy – đăng nhập xong bấm lại tệp này là được."
  bao "Chưa gửi được lên GitHub" "Xem mục 4 HUONG-DAN-CHATGPT.md"; dong 1
fi
echo; xanh "══════════════════════════════════════════════"
xanh "  ✓ ĐÃ ĐĂNG. Web tự cập nhật sau khoảng 1 phút."
xanh "══════════════════════════════════════════════"
bao "Đã đăng lên web" "Web tự cập nhật sau khoảng 1 phút"
dong 0
