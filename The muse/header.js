/* ===== HEADER DÙNG CHUNG — mỗi trang chỉ cần:
   <div id="site-header"></div>
   <script src="header.js"></script>
   Muốn thêm/sửa/xóa mục menu thì sửa 2 mảng MENU_LEFT và MENU_RIGHT bên dưới. ===== */

const MENU_LEFT = [
  { label: "Giới thiệu", href: "gioithieu.html", sub: [
      { label: "Câu chuyện của Muse",                  href: "gioithieu.html#cau-chuyen-thuong-hieu" },
      { label: "Sứ mệnh - Tầm nhìn - Giá trị cốt lõi", href: "gioithieu.html#su-menh-tam-nhin-gia-tri" },
      { label: "Nguyên liệu & Chất lượng",             href: "gioithieu.html#nguyen-lieu-chat-luong" },
      { label: "Quy trình làm bánh",                   href: "gioithieu.html#quy-trinh-lam-banh" },
      { label: "Không gian cửa hàng",                  href: "gioithieu.html#khong-gian-cua-hang" }
  ]},
  { label: "Sản phẩm", href: "sanpham.html", sub: [
      { label: "Bánh Mousse",            href: "sanpham.html#mousse" },
      { label: "Bánh Croissant",         href: "sanpham.html#croissant" },
      { label: "Bánh Trung thu",         href: "sanpham.html#trungthu" },
      { label: "Bánh Donut",             href: "sanpham.html#donut" },
  ]},
  { label: "Chính sách", href: "chinhsach.html" },
  { label: "Thiết kế",   href: "tk-theo-yc.html" }
];

const MENU_RIGHT = [
  { label: "Tin tức", href: "tintuc.html" },
  { label: "Liên hệ", href: "lienhe.html" }
];

/* ---------- Biểu tượng ---------- */
const ICON = {
  chev:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>',
  bag:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8h12l-1 12H7L6 8z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg>',
  search:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="11" cy="11" r="6"/><path d="M16 16l4 4"/></svg>',
  user:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/></svg>',
  menu:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>'
};

const file = p => (p || "").split("#")[0].split("?")[0];
const here = file(location.pathname.split("/").pop()) || "index.html";

function itemHTML(m){
  const active = file(m.href) === here || (m.sub || []).some(s => file(s.href) === here);
  if (!m.sub) return `<div class="h-item${active ? " active" : ""}"><a class="h-link" href="${m.href}">${m.label}</a></div>`;
  return `<div class="h-item${active ? " active" : ""}">
    <a class="h-link" href="${m.href}">${m.label}${ICON.chev}</a>
    <div class="sub">${m.sub.map(s => `<a href="${s.href}"${file(s.href) === here && !s.href.includes("#") ? ' class="cur"' : ""}>${s.label}</a>`).join("")}</div>
  </div>`;
}

const host = document.getElementById("site-header") || document.body.insertAdjacentElement("afterbegin", document.createElement("div"));
host.innerHTML = `
<header class="site-header" id="siteHeader">
  <button class="icon-btn burger" id="burger" type="button" aria-label="Mở menu" aria-expanded="false">${ICON.menu}</button>

  <nav class="left" aria-label="Menu chính">${MENU_LEFT.map(itemHTML).join("")}</nav>

  <a class="logo" href="index.html" aria-label="The Muse - Trang chủ"><img src="image/logo.png" alt="The Muse"></a>

  <div class="right">
    <nav class="links" aria-label="Menu phụ">${MENU_RIGHT.map(itemHTML).join("")}</nav>
    <div class="tools">
      <a class="icon-btn" id="openCart" href="giohang.html" aria-label="Giỏ hàng">${ICON.bag}<span id="cartCount" data-zero="1">0</span></a>
      <button class="icon-btn ring search-btn" id="searchBtn" type="button" aria-label="Tìm kiếm">${ICON.search}</button>
      <div class="h-item lang">
        <button class="h-link" type="button">VN${ICON.chev}</button>
        <div class="sub"><a href="#">VN</a><a href="#">EN</a></div>
      </div>
      <div class="account">${ICON.user}<span><a href="dangnhap.html">Đăng nhập</a> <i>/</i> <a href="dangky.html">Đăng ký</a></span></div>
    </div>
  </div>

  <div class="search-bar" id="searchBar">
    <input id="searchInput" type="search" placeholder="Tìm bánh... (nhấn Enter)" aria-label="Tìm kiếm sản phẩm">
  </div>
</header>`;

/* ---------- Số lượng giỏ hàng ---------- */
function updateCartCount(){
  let n = 0;
  try { n = JSON.parse(localStorage.getItem("cart") || "[]").reduce((s, x) => s + (x.qty || 0), 0); } catch {}
  const b = document.getElementById("cartCount");
  if (!b) return;
  b.textContent = n;
  b.dataset.zero = n ? "0" : "1";   // ẩn chấm số khi giỏ trống
}
updateCartCount();
addEventListener("cart-updated", updateCartCount);   // thêm/xóa ngay trên trang này
addEventListener("storage", updateCartCount);        // giỏ đổi ở tab khác

/* ---------- Mở/đóng menu, tìm kiếm ---------- */
const header = document.getElementById("siteHeader");
const bar = document.getElementById("searchBar");
const mobile = () => matchMedia("(max-width:1240px), (hover:none)").matches;

document.getElementById("burger").onclick = e => {
  const open = header.classList.toggle("open");
  e.currentTarget.setAttribute("aria-expanded", open);
};
// Trên điện thoại: bấm mục có menu con thì mở menu con (thay vì chuyển trang)
header.querySelectorAll(".h-item").forEach(it => {
  const link = it.querySelector(".h-link"), sub = it.querySelector(".sub");
  if (!sub) return;
  link.addEventListener("click", e => {
    if (!mobile()) return;
    if (!it.classList.contains("open")) { e.preventDefault(); header.querySelectorAll(".h-item.open").forEach(x => x.classList.remove("open")); it.classList.add("open"); }
  });
});
document.getElementById("searchBtn").onclick = () => {
  bar.classList.toggle("open");
  if (bar.classList.contains("open")) document.getElementById("searchInput").focus();
};
document.getElementById("searchInput").addEventListener("keydown", e => {
  if (e.key === "Enter" && e.target.value.trim()) location.href = "sanpham.html?q=" + encodeURIComponent(e.target.value.trim());
  if (e.key === "Escape") bar.classList.remove("open");
});
document.addEventListener("click", e => {
  if (!header.contains(e.target)) { bar.classList.remove("open"); header.querySelectorAll(".h-item.open").forEach(x => x.classList.remove("open")); }
});