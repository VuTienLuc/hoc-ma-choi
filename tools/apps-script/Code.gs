/**
 * HỌC MÀ CHƠI – Máy chủ nhỏ trên Google Sheets (Google Apps Script)
 * ---------------------------------------------------------------
 * Trang tính cần có (tự tạo nếu chưa có):
 *   HocSinh : Lớp | Tài khoản | Họ tên | Mật khẩu      ← thầy/cô dán danh sách từ Excel vào đây
 *   TienDo  : tiến độ + thú cưng mới nhất của từng em (máy tự ghi)
 *   KetQua  : nhật kí mỗi lần em làm xong một bộ câu hỏi (máy tự ghi)
 * Cách triển khai: xem HUONG-DAN.md (Triển khai → Ứng dụng web → Bất kỳ ai).
 */
const SHEET_HS = 'HocSinh', SHEET_TD = 'TienDo', SHEET_KQ = 'KetQua';
const H_HS = ['Lớp', 'Tài khoản', 'Họ tên', 'Mật khẩu'];
const H_TD = ['Lớp', 'Tài khoản', 'Họ tên', 'Tổng sao', 'Thú cưng / sao từng khối', 'Lần cuối', 'Tiến độ (máy dùng)', 'Phiên (máy dùng)'];
const H_KQ = ['Thời gian', 'Lớp', 'Tài khoản', 'Họ tên', 'Khối', 'Bài', 'Mức', 'Điểm', 'Số câu', 'Sao bộ này', 'Sao cao nhất bài', 'Tổng sao khối', 'Thú cưng'];
const MAX_SESSIONS = 5;              // số thiết bị được đăng nhập cùng lúc cho một em

function sheet_(name, headers) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(name);
  if (!sh) { sh = ss.insertSheet(name); sh.appendRow(headers); sh.setFrozenRows(1); sh.getRange(1, 1, 1, headers.length).setFontWeight('bold'); }
  return sh;
}
const norm_ = s => String(s == null ? '' : s).trim();
const out_ = o => ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);

/** Chạy hàm này một lần (nút ▶ Chạy) để tạo sẵn các trang tính. */
function setup() { sheet_(SHEET_HS, H_HS); sheet_(SHEET_TD, H_TD); sheet_(SHEET_KQ, H_KQ); }

function students_() {
  const v = sheet_(SHEET_HS, H_HS).getDataRange().getDisplayValues();
  return v.slice(1).filter(r => norm_(r[0]) && norm_(r[1]))
          .map(r => ({ lop: norm_(r[0]), user: norm_(r[1]), name: norm_(r[2]) || norm_(r[1]), pass: norm_(r[3]) }));
}
function classes_() { return [...new Set(students_().map(s => s.lop))].sort((a, b) => a.localeCompare(b, 'vi', { numeric: true })); }

function doGet() { return out_({ ok: true, classes: classes_() }); }

function doPost(e) {
  let b = {};
  try { b = JSON.parse(e.postData.contents); } catch (err) { return out_({ ok: false, msg: 'Dữ liệu không hợp lệ' }); }
  if (b.action === 'classes') return out_({ ok: true, classes: classes_() });
  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    if (b.action === 'login') return out_(login_(b));
    if (b.action === 'save') return out_(save_(b));
    return out_({ ok: false, msg: 'Yêu cầu không hợp lệ' });
  } finally { lock.releaseLock(); }
}

/** Tìm (hoặc tạo) dòng tiến độ của một em. Trả về số dòng (bắt đầu từ 1). */
function rowOf_(td, lop, user, name) {
  const v = td.getDataRange().getValues();
  for (let i = 1; i < v.length; i++) if (norm_(v[i][0]) === lop && norm_(v[i][1]).toLowerCase() === user.toLowerCase()) return i + 1;
  td.appendRow([lop, user, name, 0, '', '', '{}', '']);
  return td.getLastRow();
}

function login_(b) {
  const lop = norm_(b.lop), u = norm_(b.user).toLowerCase(), p = norm_(b.pass);
  const st = students_().find(s => s.lop === lop && s.user.toLowerCase() === u);
  if (!st || st.pass !== p) return { ok: false, msg: 'Sai tài khoản hoặc mật khẩu. Em kiểm tra lại (chú ý chọn đúng lớp) nhé.' };
  const td = sheet_(SHEET_TD, H_TD), r = rowOf_(td, st.lop, st.user, st.name);
  const token = Utilities.getUuid();
  const sessions = norm_(td.getRange(r, 8).getValue()).split(',').filter(Boolean);
  sessions.unshift(token);
  td.getRange(r, 3).setValue(st.name);
  td.getRange(r, 8).setValue(sessions.slice(0, MAX_SESSIONS).join(','));
  let progress = {};
  try { progress = JSON.parse(td.getRange(r, 7).getValue() || '{}'); } catch (err) {}
  return { ok: true, token, name: st.name, lop: st.lop, user: st.user, progress };
}

function save_(b) {
  const td = sheet_(SHEET_TD, H_TD), v = td.getDataRange().getValues(), token = norm_(b.token);
  let r = -1;
  for (let i = 1; i < v.length; i++) if (token && norm_(v[i][7]).split(',').indexOf(token) >= 0) { r = i + 1; break; }
  if (r < 0) return { ok: false, code: 'auth', msg: 'Phiên đăng nhập đã hết hạn' };
  const row = v[r - 1];
  let progress = {};
  try { progress = JSON.parse(row[6] || '{}'); } catch (err) {}
  const key = norm_(b.key);
  if (key) progress[key] = Math.max(Number(progress[key]) || 0, Number(b.stars) || 0);
  const total = Object.keys(progress).reduce((s, k) => s + (Number(progress[k]) || 0), 0);
  td.getRange(r, 4, 1, 4).setValues([[total, norm_(b.summary), new Date(), JSON.stringify(progress)]]);
  sheet_(SHEET_KQ, H_KQ).appendRow([new Date(), row[0], row[1], row[2], norm_(b.grade), norm_(b.lesson), Number(b.level) || '',
    Number(b.score) || 0, Number(b.total) || '', Number(b.setStars) || 0, Number(b.stars) || 0, Number(b.gradeStars) || 0, norm_(b.pet)]);
  return { ok: true };
}
