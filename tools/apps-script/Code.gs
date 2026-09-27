/**
 * HỌC MÀ CHƠI – Máy chủ nhỏ trên Google Sheets (Google Apps Script)
 * ---------------------------------------------------------------
 * Trang tính (tự tạo khi chạy setup):
 *   HocSinh  : Lớp | Tài khoản | Họ tên | Mật khẩu      ← thầy/cô dán danh sách từ Excel vào đây
 *   TongHop  : bảng theo dõi từng lớp – ai chưa đăng nhập (đỏ), ai lâu không học (vàng)
 *   KetQua   : nhật kí mỗi lần một em làm XONG một bộ câu hỏi
 *   DangNhap : nhật kí mỗi lần một em đăng nhập
 *   TienDo   : tiến độ + thú cưng mới nhất của từng em (máy dùng để đồng bộ)
 * Menu “🐣 Học mà chơi” trên thanh công cụ: Cập nhật bảng Tổng hợp.
 * Cách triển khai: xem HUONG-DAN.md.
 */
const SHEET_HS = 'HocSinh', SHEET_TD = 'TienDo', SHEET_KQ = 'KetQua', SHEET_DN = 'DangNhap', SHEET_TH = 'TongHop';
const H_HS = ['Lớp', 'Tài khoản', 'Họ tên', 'Mật khẩu'];
const H_TD = ['Lớp', 'Tài khoản', 'Họ tên', 'Tổng sao', 'Thú cưng / sao từng khối', 'Lần cuối', 'Tiến độ (máy dùng)', 'Phiên (máy dùng)'];
const H_KQ = ['Thời gian', 'Lớp', 'Tài khoản', 'Họ tên', 'Khối', 'Bài', 'Mức', 'Điểm', 'Số câu', 'Sao bộ này', 'Sao cao nhất bài', 'Tổng sao khối', 'Thú cưng'];
const H_DN = ['Thời gian', 'Lớp', 'Tài khoản', 'Họ tên', 'Thiết bị'];
const MAX_SESSIONS = 5;       // số thiết bị được đăng nhập cùng lúc cho một em
const DAYS_WARN = 7;          // quá số ngày này không học → tô vàng trong TongHop
const TZ = 'Asia/Ho_Chi_Minh';

function sheet_(name, headers) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(name);
  if (!sh) {
    sh = ss.insertSheet(name);
    if (headers) { sh.appendRow(headers); sh.setFrozenRows(1); sh.getRange(1, 1, 1, headers.length).setFontWeight('bold').setBackground('#dbe6fb'); }
  }
  return sh;
}
const norm_ = s => String(s == null ? '' : s).trim();
const out_ = o => ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
const key_ = (lop, user) => norm_(lop) + '|' + norm_(user).toLowerCase();

/** Chạy hàm này MỘT LẦN (nút ▶ Chạy): tạo các trang tính và hẹn giờ tự cập nhật TongHop mỗi 30 phút. */
function setup() {
  sheet_(SHEET_HS, H_HS); sheet_(SHEET_TH); sheet_(SHEET_KQ, H_KQ); sheet_(SHEET_DN, H_DN); sheet_(SHEET_TD, H_TD);
  ScriptApp.getProjectTriggers().filter(t => t.getHandlerFunction() === 'capNhatTongHop').forEach(t => ScriptApp.deleteTrigger(t));
  ScriptApp.newTrigger('capNhatTongHop').timeBased().everyMinutes(30).create();
  capNhatTongHop();
}

/** Menu trên Google Sheet. */
function onOpen() {
  SpreadsheetApp.getUi().createMenu('🐣 Học mà chơi')
    .addItem('Cập nhật bảng Tổng hợp', 'capNhatTongHop')
    .addToUi();
}

function students_() {
  const v = sheet_(SHEET_HS, H_HS).getDataRange().getDisplayValues();
  return v.slice(1).filter(r => norm_(r[0]) && norm_(r[1]))
          .map(r => ({ lop: norm_(r[0]), user: norm_(r[1]), name: norm_(r[2]) || norm_(r[1]), pass: norm_(r[3]) }));
}
const sortVi_ = (a, b) => a.localeCompare(b, 'vi', { numeric: true });
function classes_() { return [...new Set(students_().map(s => s.lop))].sort(sortVi_); }

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
  for (let i = 1; i < v.length; i++) if (key_(v[i][0], v[i][1]) === key_(lop, user)) return i + 1;
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
  sheet_(SHEET_DN, H_DN).appendRow([new Date(), st.lop, st.user, st.name, norm_(b.device).slice(0, 60)]);
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

/* =====================================================================
   BẢNG TỔNG HỢP
   Phần 1: mỗi lớp một dòng (sĩ số, đã đăng nhập, đã làm bài, …)
   Phần 2: mỗi học sinh một dòng, xếp theo lớp → tô đỏ/vàng theo tình trạng
   ===================================================================== */
function capNhatTongHop() {
  const now = new Date(), DAY = 864e5;
  const hs = students_();
  const dn = sheet_(SHEET_DN, H_DN).getDataRange().getValues().slice(1);
  const kq = sheet_(SHEET_KQ, H_KQ).getDataRange().getValues().slice(1);
  const td = sheet_(SHEET_TD, H_TD).getDataRange().getValues().slice(1);
  const A = {};
  hs.forEach(s => A[key_(s.lop, s.user)] = { s, logins: 0, lastLogin: null, sets: 0, sumPct: 0, lastWork: null, stars: 0, pet: '' });
  const later = (a, b) => (!a || (b && b > a)) ? b : a;
  dn.forEach(r => { const a = A[key_(r[1], r[2])]; if (a) { a.logins++; a.lastLogin = later(a.lastLogin, r[0] instanceof Date ? r[0] : new Date(r[0])); } });
  kq.forEach(r => { const a = A[key_(r[1], r[2])]; if (!a) return; a.sets++; const n = Number(r[8]) || 6; a.sumPct += (Number(r[7]) || 0) / n; a.lastWork = later(a.lastWork, r[0] instanceof Date ? r[0] : new Date(r[0])); });
  td.forEach(r => { const a = A[key_(r[0], r[1])]; if (a) { a.stars = Number(r[3]) || 0; a.pet = norm_(r[4]); } });

  const fmt = d => d ? Utilities.formatDate(d, TZ, 'dd/MM/yyyy HH:mm') : '';
  const status = a => {
    if (!a.logins && !a.lastWork) return ['Chưa đăng nhập lần nào', 'red', 'never'];
    const last = later(a.lastLogin, a.lastWork), days = Math.floor((now - last) / DAY);
    if (!a.sets) return [`Đã đăng nhập nhưng chưa làm bộ nào`, 'yellow', 'nowork'];
    if (days > DAYS_WARN) return [`${days} ngày chưa học`, 'yellow', 'idle'];
    return ['Đang học đều', 'green', 'ok'];
  };

  const lops = [...new Set(hs.map(s => s.lop))].sort(sortVi_);
  const rows = [], colors = [];
  // --- Phần 1: theo lớp
  rows.push([`BẢNG TỔNG HỢP – cập nhật lúc ${fmt(now)}`, '', '', '', '', '', '', '', '', '', '']); colors.push('title');
  rows.push(['Lớp', 'Sĩ số', 'Đã đăng nhập', 'Chưa đăng nhập', 'Đăng nhập nhưng chưa làm bài', 'Đã làm ≥ 1 bộ', `Quá ${DAYS_WARN} ngày chưa học`, 'Tổng số bộ đã làm', 'Điểm TB (%)', '', '']); colors.push('head');
  lops.forEach(lop => {
    const L = hs.filter(s => s.lop === lop).map(s => A[key_(s.lop, s.user)]);
    const logged = L.filter(a => a.logins || a.lastWork).length, worked = L.filter(a => a.sets).length;
    const sets = L.reduce((t, a) => t + a.sets, 0), pct = L.reduce((t, a) => t + a.sumPct, 0);
    const idle = L.filter(a => status(a)[2] === 'idle').length, nowork = L.filter(a => status(a)[2] === 'nowork').length;
    rows.push([lop, L.length, logged, L.length - logged, nowork, worked, idle, sets, sets ? Math.round(pct / sets * 100) : '', '', '']); colors.push('');
  });
  rows.push(['', '', '', '', '', '', '', '', '', '', '']); colors.push('');
  // --- Phần 2: từng học sinh
  rows.push(['Lớp', 'Tài khoản', 'Họ tên', 'Tình trạng', 'Số lần đăng nhập', 'Đăng nhập gần nhất', 'Số bộ đã làm', 'Điểm TB (%)', 'Tổng sao', 'Làm bài gần nhất', 'Thú cưng / sao từng khối']); colors.push('head');
  lops.forEach(lop => hs.filter(s => s.lop === lop).sort((x, y) => sortVi_(x.user, y.user)).forEach(s => {
    const a = A[key_(s.lop, s.user)], [st, c] = status(a);
    rows.push([s.lop, s.user, s.name, st, a.logins, fmt(a.lastLogin), a.sets, a.sets ? Math.round(a.sumPct / a.sets * 100) : '', a.stars, fmt(a.lastWork), a.pet]);
    colors.push(c);
  }));

  const sh = sheet_(SHEET_TH);
  sh.clear();
  sh.getRange(1, 1, rows.length, rows[0].length).setValues(rows);
  const BG = { title: '#ffffff', head: '#dbe6fb', red: '#f8d7da', yellow: '#fff3cd', green: '#e2f4e8', '': '#ffffff' };
  colors.forEach((c, i) => { const rg = sh.getRange(i + 1, 1, 1, rows[0].length); rg.setBackground(BG[c]); if (c === 'head' || c === 'title') rg.setFontWeight('bold'); });
  sh.getRange(1, 1).setFontSize(13);
  sh.setFrozenRows(0);
  sh.autoResizeColumns(1, rows[0].length);
  return rows.length;
}
