/* ===== 7. DỮ LIỆU SẢN PHẨM =====
   "id" sẽ được truyền sang trang chi tiết: chitietsanpham.html?id=tiramisu
   "sizes" (không bắt buộc): bánh nào có sizes thì khi bấm "Thêm vào giỏ hàng" sẽ hiện các size để chọn.
   Mỗi size có giá riêng; giá size 20 cm bên dưới là SỐ MẪU, bạn sửa lại giá thật. */
const categories = [
  { key:"mousse",   name:"Bánh Mousse",    items:[
    {id:"chocoflan",  name:"ChocoFlan",         price:55000, sizes:[{label:"20 cm",price:75000},{label:"16 cm",price:55000}], img:"https://the350f.com/wp-content/uploads/2026/04/ChocoFlan-CT-2.jpg",  hot:true, isNew:true},
    {id:"tiramisu",   name:"Tiramisu",          price:60000, sizes:[{label:"20 cm",price:80000},{label:"16 cm",price:60000}], img:"https://the350f.com/wp-content/uploads/2025/05/ChiTietTiramisu-1.jpg" },
    {id:"mousse-dua-luoi", name:"Mousse Dưa lưới", price:65000, sizes:[{label:"20 cm",price:85000},{label:"16 cm",price:65000}], img:"https://the350f.com/wp-content/uploads/2025/05/CT-Dua-1.jpg", hot:true, isNew:true},
    {id:"mousse-dau", name:"Mousse Dâu", price:65000, sizes:[{label:"20 cm",price:85000},{label:"16 cm",price:65000}], img:"https://the350f.com/wp-content/uploads/2025/05/CT-Dau-4.jpg" },
    {id:"mousse-tra-nhan", name:"Mousse Trà Nhãn", price:65000, sizes:[{label:"20 cm",price:85000},{label:"16 cm",price:65000}], img:"https://the350f.com/wp-content/uploads/2026/07/Tra-nhan-2026-2.jpg", hot:true, isNew:true},
    {id:"mousse-xoai", name:"Mousse Xoài", price:60000, sizes:[{label:"20 cm",price:80000},{label:"16 cm",price:60000}], img:"https://the350f.com/wp-content/uploads/2025/05/Ban-sao-cua-_IMG2338-copy.jpg", hot:true }
  ]},
  { key:"croissant", name:"Bánh Croissant", items:[
    {id:"croissant-xoan-oc",     name:"Croissant xoắn ốc nhân hạt dẻ cười",       price:35000, img:"https://cdn.prod.website-files.com/649249d29a20bd6bc3deac48/6a46975f52af1711c7dc1600_3700000836_Pistachio%20Spiral%20Croissant-p-1080.png", hot:true, isNew:true},
    {id:"croissant-det", name:"Croissant dẹt nhân hồ đào", price:38000, img:"https://cdn.prod.website-files.com/649249d29a20bd6bc3deac48/6a45b8828cc62e907ddd502d_3700000241_Pecan%20Croissant%20Flattie-p-1080.png", hot:true, isNew:true},
    {id:"croissant-dau-tay", name:"Croissant dâu tây",   price:40000, img:"https://cdn.prod.website-files.com/649249d29a20bd6bc3deac48/6a45b8236752bb28f2776279_3700000259_Strawberry%20Croissant-p-1080.png", hot:true},
    {id:"croissant", name:"Croissant", price:25000, img:"https://cdn.prod.website-files.com/649249d29a20bd6bc3deac48/6a548dd6e92c95e5de77d0d0_6a45c2408e13312e04f1ef90_3700000162_Croissant.png" },
    {id:"croissant-socola", name:"Croissant Socola", price:32000, img:"https://cdn.prod.website-files.com/649249d29a20bd6bc3deac48/6a45c2bcb85541162d5929f9_3700000140_Chocolate%20Croissant-p-1080.png", hot:true },
    {id:"croissant-mix", name:"Croissant tỏi và phô mai", price:35000, img:"https://cdn.prod.website-files.com/649249d29a20bd6bc3deac48/6a45c180284a7ed709e0194b_3700000173_Garlic%20%26%20Cheese%20Croissant-p-1080.png", hot:true, isNew:true}
  ]},
  { key:"trungthu", name:"Bánh Trung thu", items:[
    {id:"banh-thap-cam-xa-xiu", name:"Thập cẩm xá xíu", price:95000, img:"https://www.the350f.com/wp-content/uploads/2025/07/TT26-BN-Xa-Xiu-1-scaled.jpg", hot:true, isNew:true},
    {id:"banh-thap-cam-ngu-hat", name:"Thập cẩm ngũ hạt", price:100000, img:"https://www.the350f.com/wp-content/uploads/2025/07/TT26-BN-Ngu-Vi-1-scaled.jpg", hot:true},
    {id:"banh-buoi-hong", name:"Bưởi hồng", price:95000, img:"https://www.the350f.com/wp-content/uploads/2026/08/TT26-BN-Buoi-hong-2-scaled.jpg", hot:true, isNew:true},
    {id:"banh-oi-hong-dau-tam", name:"Ổi hồng dâu tằm", price:100000, img:"https://www.the350f.com/wp-content/uploads/2025/07/TT26-Oi-Hong-scaled.jpg", hot:true, isNew:true},
    {id:"banh-tao-do", name:"Táo đỏ", price:105000, img:"https://www.the350f.com/wp-content/uploads/2025/07/TT26-BN-Tao-do-1-scaled.jpg", hot:true, isNew:true},
    {id:"banh-vai-thieu-thanh-long-do", name:"Vải thiều thanh long đỏ", price:105000, img:"https://www.the350f.com/wp-content/uploads/2026/08/TT26-Vai-Thieu-Thanh-Long-2-1-scaled.jpg", hot:true, isNew:true}
  ]},
  { key:"donut",    name:"Bánh Donut",     items:[
    {id:"donut-kem-dau",   name:"Donut kem dâu",   price:22000, img:"https://donutelier.co.uk/wp-content/uploads/2023/06/Fraiser_Donut.png", hot:true},
    {id:"donut-kem-banh-quy-vani",  name:"Donut kem bánh quy vani",  price:24000, img:"https://donutelier.co.uk/wp-content/uploads/2022/11/Vanilla_Cookie_Cream_Donut.png", hot:true},
    {id:"donut-matcha-dau-tay",  name:"Donut matcha dâu tây",  price:25000, img:"https://donutelier.co.uk/wp-content/uploads/2026/07/Strawberry-matcha-for-web-1.jpg", isNew:true},
    {id:"banh-quy", name:"Bánh quy kem vani socola", price:24000, img:"https://donutelier.co.uk/wp-content/uploads/2026/07/Vanilla-Choc-Ice-Cream-Cookie-for-Web.jpg", hot:true, isNew:true},
    {id:"donut-kem-vani-dau", name:"Donut kem vani dâu", price:25000, img:"https://donutelier.co.uk/wp-content/uploads/2026/07/Vanilla-Berry-Ice-Cream-Donut-for-Web.jpg", hot:true, isNew:true},
    {id:"donut-kem-dulcey", name:"Donut kem Dulcey", price:28000, img:"https://donutelier.co.uk/wp-content/uploads/2026/07/Dulcey-Ice-Cream-Donut-for-Web.jpg", hot:true, isNew:true}
  ]}
];

const fmt = n => n.toLocaleString("en-US") + "VND";

/* Tìm kiếm từ header: sanpham.html?q=tiramisu (không phân biệt hoa thường và dấu) */
const norm = t => t.normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/đ/g,"d").toLowerCase();
const q = norm(new URLSearchParams(location.search).get("q") || "");
const shown = categories
  .map(c => ({...c, items: c.items.filter(p => !q || norm(p.name).includes(q))}))
  .filter(c => c.items.length);

/* ===== 8. Tự sinh HTML từ dữ liệu (dùng `shown` để tìm kiếm có tác dụng) ===== */
document.getElementById("sidebar").innerHTML = shown
  .map((c,i)=>`<a class="cat-btn${i?'':' active'}" href="#${c.key}" data-key="${c.key}">${c.name.replace("Bánh ","")}</a>`).join("");

document.getElementById("products").innerHTML = (shown.length ? shown : [null]).map(c => !c
  ? `<p style="padding:40px 0;color:var(--muted)">Không tìm thấy bánh phù hợp.</p>`
  : `
  <section class="group" id="${c.key}">
    <h2>${c.name}</h2>
    <div class="grid">
      ${c.items.map(p => `
        <article class="card">
          <a class="thumb-link" href="chitietsanpham.html?id=${p.id}" aria-label="Xem chi tiết ${p.name}">
            <div class="thumb">
              <img src="${p.img}" alt="${p.name}" loading="lazy" onerror="this.remove()">
              <div class="badges">
                ${p.hot ? '<span class="badge hot">Hot</span>' : ''}
                ${p.isNew ? '<span class="badge new">Mới</span>' : ''}
              </div>
            </div>
          </a>
          <div class="bottom">
            <a class="info" href="chitietsanpham.html?id=${p.id}">
              <h3>${p.name}</h3>
              <p class="price">Giá từ: <b>${fmt(p.price)}</b></p>
            </a>
            <div class="sizes">
              ${(p.sizes || []).map(z => `<button type="button" class="size" data-id="${p.id}" data-size="${z.label}">${z.label}</button>`).join("")}
            </div>
          </div>
         <button class="add" type="button" data-id="${p.id}">Thêm vào giỏ hàng</button>
        </article>`).join("")}
    </div>
  </section>`).join("");

/* ===== 9. Menu trái sáng theo mục đang cuộn tới ===== */
const btns = document.querySelectorAll(".cat-btn");
const spy = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) btns.forEach(b => b.classList.toggle("active", b.dataset.key === e.target.id));
  });
}, {rootMargin:"-30% 0px -60% 0px"});
document.querySelectorAll(".group").forEach(g => spy.observe(g));

/* ===== 10. GIỎ HÀNG ===== */
const getCart = () => { try { return JSON.parse(localStorage.getItem("cart") || "[]").map(x => ({...x, key: x.key || x.id})); } catch { return []; } };
const setCart = c => localStorage.setItem("cart", JSON.stringify(c));

function findProduct(id){
  for (const c of categories){ const p = c.items.find(x => x.id === id); if (p) return {p, c}; }
}

// Thêm 1 sản phẩm với đúng giá của size đã chọn. Cùng sản phẩm + cùng size thì tăng số lượng.
function addToCart(p, size, price){
  const key = p.id + (size ? "|" + size : "");
  const cart = getCart();
  const line = cart.find(x => x.key === key);
  if (line) line.qty++;
  else cart.push({key, id:p.id, name:p.name, size:size || "", price:price, img:p.img, qty:1});
  setCart(cart);
}

const TRASH = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14"/></svg>';
const drawer = document.getElementById("drawer"), overlay = document.getElementById("overlay");

function renderDrawer(){
  const cart = getCart();
  const count = cart.reduce((s,x) => s + x.qty, 0);
  const total = cart.reduce((s,x) => s + x.price * x.qty, 0);
  document.getElementById("dItems").innerHTML = cart.length
    ? cart.map(x => `
        <div class="d-item">
          <img src="${x.img}" alt="${x.name}">
          <div>
            <h3>${x.name}${x.size ? " - " + x.size : ""}</h3>
            <div class="q">${x.qty}x <em>${fmt(x.price)}</em></div>
          </div>
          <button class="d-del" type="button" data-key="${x.key}" aria-label="Xóa">${TRASH}</button>
        </div>`).join("")
    : '<p class="d-empty">Giỏ hàng đang trống.</p>';
  document.getElementById("dCount").textContent = count + " sản phẩm";
  document.getElementById("dTotal").textContent = fmt(total);
  const badge = document.getElementById("cartCount");      // chỉ có khi trang có header chứa icon giỏ hàng
  if (badge) badge.textContent = count;
  window.dispatchEvent(new Event("cart-updated"));          // báo cho header (nếu có) cập nhật số lượng
}
function openDrawer(){ renderDrawer(); drawer.classList.add("open"); overlay.classList.add("open"); document.body.classList.add("lock"); }
function closeDrawer(){ drawer.classList.remove("open"); overlay.classList.remove("open"); document.body.classList.remove("lock"); }

document.addEventListener("click", e => {
  // bấm ra ngoài thẻ thì đóng khung chọn size
  document.querySelectorAll(".card.choosing").forEach(c => { if (!c.contains(e.target)) c.classList.remove("choosing"); });

  const add = e.target.closest(".add");
  if (add){
    const card = add.closest(".card");
    if (card.querySelector(".size")) card.classList.add("choosing");   // có size → hiện các size để chọn
    else { const p = findProduct(add.dataset.id).p; addToCart(p, "", p.price); openDrawer(); }  // không có size → thêm luôn
    return;
  }
  const size = e.target.closest(".size");
  if (size){
    const p = findProduct(size.dataset.id).p;
    const z = p.sizes.find(z => z.label === size.dataset.size);
    addToCart(p, z.label, z.price);
    size.closest(".card").classList.remove("choosing");
    openDrawer();
    return;
  }
  const del = e.target.closest(".d-del");
  if (del){ setCart(getCart().filter(x => x.key !== del.dataset.key)); renderDrawer(); return; }
  if (e.target.closest("#openCart")){ e.preventDefault(); openDrawer(); }
  if (e.target.closest("#closeCart") || e.target === overlay) closeDrawer();
});
document.addEventListener("keydown", e => { if (e.key === "Escape"){ closeDrawer(); document.querySelectorAll(".card.choosing").forEach(c => c.classList.remove("choosing")); } });
document.querySelectorAll(".card").forEach(c => c.addEventListener("mouseleave", () => c.classList.remove("choosing")));
renderDrawer();