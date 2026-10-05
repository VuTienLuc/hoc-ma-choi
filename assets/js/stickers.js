/* =====================================================================
   StickerDB – DANH MỤC STICKER dùng chung (trang học sinh: play.js · Góc chung: hub.js · trang giáo viên).
   Thêm sticker mới chỉ cần thêm một dòng vào STICKERS; id không đổi để giữ dữ liệu đã lưu của học sinh.
   ===================================================================== */
const StickerDB = (() => {
  const STICKERS = [
    {id:'meo-kem',       icon:'🐱', name:'Mèo Kem Mơ Mộng',       group:'Bạn thú đáng yêu', r:'common'},
    {id:'cun-bong',       icon:'🐶', name:'Cún Bông Vẫy Đuôi',     group:'Bạn thú đáng yêu', r:'common'},
    {id:'tho-dau',        icon:'🐰', name:'Thỏ Dâu Má Hồng',       group:'Bạn thú đáng yêu', r:'common'},
    {id:'gau-mat',        icon:'🐼', name:'Gấu Trúc Ôm Tim',       group:'Bạn thú đáng yêu', r:'rare'},
    {id:'rai-ca',         icon:'🦦', name:'Rái Cá Tinh Nghịch',    group:'Bạn thú đáng yêu', r:'epic'},
    {id:'dau-tay',        icon:'🍓', name:'Dâu Tây Ngọt Ngào',     group:'Tiệc ngọt', r:'common'},
    {id:'banh-kem',       icon:'🧁', name:'Bánh Kem Cầu Vồng',     group:'Tiệc ngọt', r:'common'},
    {id:'kem-que',        icon:'🍦', name:'Kem Mây Mát Lạnh',      group:'Tiệc ngọt', r:'common'},
    {id:'donut-sao',      icon:'🍩', name:'Donut Sao Lấp Lánh',   group:'Tiệc ngọt', r:'rare'},
    {id:'tra-sua',        icon:'🧋', name:'Trà Sữa Vui Vẻ',        group:'Tiệc ngọt', r:'rare'},
    {id:'but-than',       icon:'✏️', name:'Bút Thần Chăm Chỉ',    group:'Góc học tập', r:'common'},
    {id:'sach-bay',       icon:'📚', name:'Sách Bay Tri Thức',     group:'Góc học tập', r:'rare'},
    {id:'nao-vang',       icon:'🧠', name:'Bộ Não Tỏa Sáng',       group:'Góc học tập', r:'rare'},
    {id:'cup-sieu-sao',   icon:'🏆', name:'Cúp Siêu Sao',          group:'Góc học tập', r:'epic'},
    {id:'ten-lua',        icon:'🚀', name:'Tên Lửa Vươn Cao',      group:'Góc học tập', r:'epic'},
    {id:'may-cuoi',       icon:'☁️', name:'Mây Cười Bồng Bềnh',    group:'Xứ sở diệu kỳ', r:'common'},
    {id:'cau-vong',       icon:'🌈', name:'Cầu Vồng May Mắn',      group:'Xứ sở diệu kỳ', r:'rare'},
    {id:'trang-sao',      icon:'🌙', name:'Trăng Sao Ngủ Ngoan',   group:'Xứ sở diệu kỳ', r:'rare'},
    {id:'sao-uoc',        icon:'🌟', name:'Ngôi Sao Điều Ước',     group:'Xứ sở diệu kỳ', r:'epic'},
    {id:'pha-le',         icon:'💎', name:'Pha Lê Ngân Hà',        group:'Xứ sở diệu kỳ', r:'legend'},
    {id:'cu-thong-thai',  icon:'🦉', name:'Cú Thông Thái',         group:'Linh vật huyền thoại', r:'rare'},
    {id:'phuong-lua',     icon:'🐦‍🔥', name:'Phượng Lửa Rực Rỡ', group:'Linh vật huyền thoại', r:'epic'},
    {id:'ky-lan',         icon:'🦄', name:'Kỳ Lân Ánh Sáng',       group:'Linh vật huyền thoại', r:'legend'},
    {id:'rong-sao',       icon:'🐲', name:'Rồng Sao Dũng Cảm',     group:'Linh vật huyền thoại', r:'legend'},
    {id:'vuong-mien',     icon:'👑', name:'Vương Miện Tri Thức',   group:'Linh vật huyền thoại', r:'legend'},
    {id:'tim-lap-lanh',   icon:'💖', name:'Trái Tim Lấp Lánh',    group:'Cảm xúc vui', r:'common'},
    {id:'mat-cuoi',       icon:'🥳', name:'Khuôn Mặt Mở Hội',      group:'Cảm xúc vui', r:'common'},
    {id:'nam-tay',        icon:'🙌', name:'Cùng Nhau Cố Gắng',     group:'Cảm xúc vui', r:'rare'},
    {id:'phao-hoa',       icon:'🎆', name:'Pháo Hoa Chiến Thắng',  group:'Cảm xúc vui', r:'epic'},
    {id:'ngan-ha',        icon:'🌌', name:'Ngân Hà Tuyệt Đối',     group:'Cảm xúc vui', r:'legend'},
  ];
  const RARITY = {
    common:{name:'Dễ thương', icon:'💚', weight:8}, rare:{name:'Hiếm', icon:'💙', weight:4},
    epic:{name:'Sử thi', icon:'💜', weight:2}, legend:{name:'Huyền thoại', icon:'💛', weight:1},
  };
  /* HẠNG KIM LOẠI – cùng một sticker mở lại nhiều lần thì BIẾN ĐỔI: ×2 Bạc · ×3 Vàng · ×5 Bạch kim · ×8 Kim cương (suy ra từ số lần, không lưu thêm dữ liệu). */
  const TIERS = [
    {k:'silver',  min:2, name:'Bạc',       icon:'🥈'},
    {k:'gold',    min:3, name:'Vàng',      icon:'🥇'},
    {k:'plat',    min:5, name:'Bạch kim',  icon:'💠'},
    {k:'diamond', min:8, name:'Kim cương', icon:'💎'},
  ];
  const tierOf = n => { n = Number(n) || 0; let t = null; TIERS.forEach(x => { if(n >= x.min) t = x; }); return t; };   // null = bản thường
  const nextTier = n => { n = Number(n) || 0; return TIERS.find(x => x.min > n) || null; };
  return {STICKERS, RARITY, TIERS, tierOf, nextTier};
})();
