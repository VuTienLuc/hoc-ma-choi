#!/bin/bash
# =====================================================================
#  GÓI TÀI LIỆU "HỌC MÀ CHƠI" CHO CHATGPT – bấm đúp là chạy (macOS)
#  Lấy bản mới nhất từ GitHub → tạo MỘT tệp HOC-MA-CHOI-THAM-KHAO.md
#  (quy tắc + bản đồ nội dung + mã lõi + mẫu) → mở Finder và ChatGPT.
#  Thầy chỉ cần: xoá tệp cũ trong Project, kéo tệp mới vào.
# =====================================================================
THU_MUC_MAC_DINH="$HOME/Documents/Dự án web/hoc-tap"
RA="$HOME/Desktop/Học mà chơi – cho ChatGPT"
export PATH="/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:$PATH"
xanh() { printf '\033[1;32m%s\033[0m\n' "$*"; }
vang() { printf '\033[1;33m%s\033[0m\n' "$*"; }
dong() { echo; read -r -p "Nhấn Enter để đóng cửa sổ… " _; exit "${1:-0}"; }

TU="$(cd "$(dirname "$0")" && pwd)"
if   [ -f "$TU/../tools/goi-chatgpt.js" ]; then DIR="$(cd "$TU/.." && pwd)"
elif [ -f "$TU/tools/goi-chatgpt.js" ];    then DIR="$TU"
else DIR="$THU_MUC_MAC_DINH"; fi
cd "$DIR" 2>/dev/null && [ -f tools/goi-chatgpt.js ] || { vang "Không thấy thư mục dự án: $DIR"; dong 1; }
clear; echo "══════════════════════════════════════════════"; echo "   GÓI TÀI LIỆU HỌC MÀ CHƠI CHO CHATGPT"; echo "══════════════════════════════════════════════"
command -v node >/dev/null 2>&1 || { vang "Máy chưa có Node.js – cài bản LTS ở nodejs.org rồi bấm lại."; open "https://nodejs.org/" 2>/dev/null; dong 1; }

# 1. Lấy bản mới nhất (chỉ khi trên máy không có thay đổi chưa đăng)
if [ -d .git ] && git --version >/dev/null 2>&1; then
  if [ -z "$(git status --porcelain)" ]; then
    echo "→ Lấy bản mới nhất từ GitHub…"; git pull -q --ff-only origin main && xanh "✓ Đã có bản mới nhất" || vang "Không lấy được (mạng?) – gói theo bản đang có trên máy."
  else
    vang "Trên máy có thay đổi CHƯA đăng lên web – gói theo bản trên máy (nên bấm “Đăng Học mà chơi lên web” trước)."
  fi
else
  vang "Thư mục chưa nối GitHub – gói theo bản trên máy (bấm “Đăng Học mà chơi lên web” một lần để nối)."
fi

# 2. Tạo gói
mkdir -p "$RA"
node tools/goi-chatgpt.js "$RA" || { vang "Không tạo được gói."; dong 1; }
F="$RA/HOC-MA-CHOI-THAM-KHAO.md"

# 3. Mở sẵn Finder (chọn tệp) và ChatGPT
open -R "$F" 2>/dev/null; open "https://chatgpt.com/" 2>/dev/null
echo
xanh "✓ Xong. Làm tiếp 3 bước trong ChatGPT:"
echo "  1. Mở Project “Học mà chơi” → phần Tệp (Files) → XOÁ tệp HOC-MA-CHOI-THAM-KHAO.md cũ."
echo "  2. Kéo tệp mới (Finder đang chọn sẵn) vào phần Tệp của Project."
echo "  3. Khi giao việc: ĐÍNH KÈM thêm tệp cần sửa (vd data/lop10.js) ngay trong tin nhắn."
dong 0
