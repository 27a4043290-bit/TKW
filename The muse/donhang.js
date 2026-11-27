/* =====================================================
   THE MUSE - THEO DÕI ĐƠN HÀNG
   Đọc đơn từ MuseOrders (file donhangchung.js, phải nạp TRƯỚC file này).
   Một đơn = một mã. Đơn có thể gồm:
     - items:   các món thường từ giỏ hàng     -> hiện LỜI CHÚC + HÌNH ẢNH BÁNH
     - customs: bánh thiết kế theo yêu cầu      -> hiện 7 MỤC thiết kế + lời chúc + hình bánh
   ===================================================== */

/* Tên file các trang liên quan: sửa cho đúng tên file thật của bạn */
const PAGES = { shop: "sanppham.html", custom: "tk-theo-yc.html" };

/* Thông tin thợ bánh (đổi tại đây) */
const BAKER = { name: "Nguyễn Minh Anh", role: "Thợ bánh chính", phone: "0826 590 133" };

const $ = id => document.getElementById(id);

const esc = value => String(value ?? "").replace(/[&<>"']/g, char => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
}[char]));

const pad = n => String(n).padStart(2, "0");
const money = n => Number(n || 0).toLocaleString("vi-VN") + "đ";
const dmy = iso => { const d = new Date(iso); return pad(d.getDate()) + "/" + pad(d.getMonth() + 1) + "/" + d.getFullYear(); };

const ICONS = {
  check: '<path d="M5 12l4 4 10-10"/>',
  cake: '<path d="M4 20h16M6 20v-7h12v7M8 13V9M12 13V7M16 13V9"/>',
  box: '<path d="M4 8l8-4 8 4v9l-8 4-8-4zM4 8l8 4 8-4M12 12v9"/>',
  truck: '<path d="M3 6h11v10H3zM14 10h4l3 3v3h-7"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/>'
};

const STAGES = [
  { icon: "check", label: "Bước 01 · Tiếp nhận", title: "Đã tiếp nhận đơn hàng", desc: "The Muse đã tiếp nhận thông tin đặt bánh.", foot: "Đã tiếp nhận" },
  { icon: "cake",  label: "Bước 02 · Chế tác",   title: "Đang chế tác bánh",     desc: "Thợ bánh đang chuẩn bị và hoàn thiện chiếc bánh của bạn.", foot: "Đang thực hiện" },
  { icon: "box",   label: "Bước 03 · Đóng hộp",  title: "Kiểm tra và đóng hộp",  desc: "Bánh sẽ được kiểm tra trước khi đóng gói.", foot: "Chuẩn bị giao hàng" },
  { icon: "truck", label: "Bước 04 · Giao hàng", title: "Đơn hàng đã được giao", desc: "Cảm ơn bạn đã lựa chọn The Muse.", foot: "Hoàn tất" }
];

/* ---------- Chuẩn hóa một đơn (đọc được cả đơn kiểu cũ) ---------- */
function normalizeOrder(o) {
  const id = String(o.id || o.code || "").replace(/^#/, "");
  const items = o.items || [];
  let customs = o.customs;
  if (!customs) {   // đơn cũ: type "custom" lưu design ở ngoài cùng
    customs = (o.type === "custom" && o.design)
      ? [{ design: o.design, message: o.message, card: o.card, preview: o.preview }] : [];
  }
  const canceled = ["canceled", "cancelled", "Đã hủy"].includes(o.status);
  const stage = Math.max(0, Math.min(3, Number(o.stage ?? 1)));
  const status = canceled ? "Đã hủy" : stage === 3 ? "Đã giao" : "Đang xử lý";

  // Giờ nhận: ưu tiên ngày giờ khách chọn ở trang thanh toán, rồi tới ngày giờ ở trang thiết kế
  const placed = new Date(o.placedAt);
  let etaLabel = "Dự kiến phục vụ", eta;
  if (o.delivery && o.delivery.date) {
    etaLabel = "Ngày hẹn nhận bánh";
    eta = o.delivery.date.split("-").reverse().join("/") + (o.delivery.slot ? " · " + o.delivery.slot : "");
  } else if (customs[0] && customs[0].design && customs[0].design.date) {
    etaLabel = "Ngày hẹn nhận bánh";
    eta = customs[0].design.date.split("-").reverse().join("/") + " · " + (customs[0].design.time || "");
  } else if (o.eta) {
    eta = o.eta;
  } else {
    eta = "Đang cập nhật";
  }

  const parts = [
    ...customs.map(c => "Bánh thiết kế riêng" + (c.design ? ` · ${c.design.shape}, ${c.design.tier} tầng` : "")),
    ...items.map(i => i.name + (i.size ? " – " + i.size : "") + (i.qty > 1 ? " × " + i.qty : ""))
  ];

  return { ...o, id, code: "#" + id, items, customs, stage, status, placed, etaLabel, eta,
           productName: parts.join(", ") || "Đơn hàng The Muse" };
}

/* ---------- Lấy đơn cần hiển thị: ?id=... hoặc đơn mới nhất ---------- */
function getCurrentOrder() {
  const requestedId = (new URLSearchParams(location.search).get("id") || "").replace(/^#/, "");
  const all = MuseOrders.all().map(normalizeOrder);
  if (requestedId) return { order: all.find(o => o.id === requestedId), requestedId, total: all.length };
  return { order: all[0], requestedId: "", total: all.length };
}

/* ---------- Các thẻ "Tác phẩm đang thực hiện" ---------- */
const msgRow = (label, text) =>
  `<div><p class="eye">${esc(label)}</p>${text ? `<q>${esc(text)}</q>` : '<q class="none">Chưa có lời chúc</q>'}</div>`;

function buildPieces(order) {
  const builders = [];

  // Bánh THIẾT KẾ THEO YÊU CẦU: 7 mục đã chọn + lời chúc + ảnh bánh
  order.customs.forEach(c => builders.push(label => {
    const d = c.design || {};
    const rows = [
      ["Hình dáng", d.shape], ["Số tầng", (d.tier || "") + " tầng"], ["Cốt bánh", d.cot], ["Lớp nhân", d.nhan],
      ["Kem phủ", d.kem], ["Màu sắc", d.mau, d.mauHex],
      ["Trang trí", (d.deco && d.deco.length) ? d.deco.join(", ") : "Không"]
    ];
    return `<div class="card piece">
      <div class="piece-head"><div><p class="eye">${esc(label)}</p><h2 class="sf">Bánh thiết kế riêng</h2></div><span class="tag">${esc(d.tier || 1)} tầng</span></div>
      <div class="msg">${msgRow("Chữ viết trên bánh", c.message)}${c.card ? msgRow("Lời chúc trên thiệp", c.card) : ""}</div>
      <div class="photo cake">${c.preview || '<div class="ph" style="height:240px;width:100%;border-radius:14px;background:linear-gradient(160deg,#e8d9c4,#b9926a)">Ảnh bánh thiết kế sẽ hiện ở đây</div>'}</div>
      <dl class="specs">${rows.map(([k, v, col]) =>
        `<div><dt class="eye">${esc(k)}</dt><dd>${col ? `<i style="background:${esc(col)}"></i>` : ""}${esc(v)}</dd></div>`).join("")}</dl>
    </div>`;
  }));

  // Món từ GIỎ HÀNG: chỉ hiện lời chúc + hình ảnh bánh
  if (order.items.length) builders.push(label => {
    const names = order.items.map(i => i.name + (i.size ? " – " + i.size : ""));
    const title = names.length > 2 ? names.slice(0, 2).join(", ") + " và " + (names.length - 2) + " món khác" : names.join(", ");
    const imgs = order.items.filter(i => i.img).slice(0, 3);
    return `<div class="card piece">
      <div class="piece-head"><div><p class="eye">${esc(label)}</p><h2 class="sf">${esc(title)}</h2></div><span class="tag">${order.items.reduce((s, i) => s + (i.qty || 1), 0)} sản phẩm</span></div>
      <div class="msg">${msgRow("Lời chúc", order.message)}</div>
      <div class="photo gal" style="--n:${Math.max(1, imgs.length)}">${imgs.length
        ? imgs.map(i => `<img src="${esc(i.img)}" alt="${esc(i.name)}" onerror="this.outerHTML='<div class=&quot;ph&quot;>${esc(i.name)}</div>'">`).join("")
        : '<div class="ph">Ảnh bánh</div>'}</div>
    </div>`;
  });

  return builders.map((build, i) => build(builders.length > 1 ? `Tác phẩm ${i + 1}/${builders.length}` : "Tác phẩm đang thực hiện")).join("");
}

/* ---------- Hiển thị đơn ---------- */
function renderOrder(found) {
  const order = found.order;

  if (!order) {
    $("orderTag").textContent = "Chưa có đơn hàng";
    $("orderCode").textContent = found.requestedId ? "Không tìm thấy đơn #" + found.requestedId : "Chưa có đơn hàng";
    $("placed").textContent = "";
    $("eta").textContent = "—";
    $("bakerName").textContent = BAKER.name;
    $("bakerMeta").textContent = BAKER.role + " · " + BAKER.phone;
    $("chefAv").textContent = BAKER.name.split(" ").pop()[0];
    $("chefName").textContent = "Chef " + BAKER.name.split(" ").slice(-2).join(" ");
    $("steps").innerHTML = '<li class="step active"><h3>Chưa có đơn hàng</h3><p>Đơn hàng sẽ xuất hiện tại đây sau khi bạn bấm "Đặt hàng" ở trang thanh toán.</p></li>';
    $("pieces").innerHTML = '<div class="card piece"><p class="eye">Tác phẩm đang thực hiện</p><p style="margin-top:12px;color:var(--muted)">' +
      (found.requestedId
        ? 'Không tìm thấy đơn này trong trình duyệt. Hãy kiểm tra: (1) trang thanh toán đã nạp <b>donhangchung.js</b> trước thanhtoan.js; (2) các trang mở cùng một địa chỉ (cùng Live Server hoặc cùng tên miền).'
        : 'Hãy đặt bánh để xem thông tin theo dõi.') + '</p></div>';
    return;
  }

  const hasCustom = order.customs.length > 0, hasItems = order.items.length > 0;
  $("orderTag").textContent = order.status;
  $("orderKind").textContent = hasCustom && hasItems ? "Bánh thiết kế & sản phẩm từ giỏ hàng"
    : hasCustom ? "Bánh thiết kế theo yêu cầu" : "Đơn hàng từ giỏ hàng";
  $("orderCode").textContent = "Đơn hàng " + order.code;
  $("placed").textContent = "Ngày đặt: " + (Number.isNaN(order.placed.getTime()) ? "—"
    : `${pad(order.placed.getDate())}/${pad(order.placed.getMonth() + 1)}/${order.placed.getFullYear()} · ${pad(order.placed.getHours())}:${pad(order.placed.getMinutes())}`);

  const baker = order.baker || BAKER;
  $("bakerName").textContent = baker.name;
  $("bakerMeta").textContent = [baker.role, baker.phone].filter(Boolean).join(" · ");
  $("etaLabel").textContent = order.etaLabel;
  $("eta").textContent = order.eta;
  $("coldRoom").textContent = order.coldRoom || "Phòng lạnh 4°C";
  $("chefAv").textContent = baker.name.trim().split(/\s+/).pop()[0];
  $("chefName").textContent = "Chef " + baker.name.trim().split(/\s+/).slice(-2).join(" ");

  $("pieces").innerHTML = buildPieces(order);

  // Tiến trình
  $("steps").innerHTML = STAGES.map((step, index) => {
    let state = index < order.stage ? "done" : index === order.stage ? "active" : "todo";
    if (order.status === "Đã hủy") state = "todo";
    return `
      <li class="step ${state}">
        <div class="ico">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[step.icon]}</svg>
          ${state === "active" ? '<span class="dot"></span>' : ""}
        </div>
        <p class="eye">${esc(step.label)}</p>
        <h3>${esc(step.title)}</h3>
        <p>${esc(step.desc)}</p>
        <p class="eye foot ${state === "done" ? "ok" : ""}">${esc(state === "done" ? "Đã hoàn tất" : step.foot)}</p>
      </li>`;
  }).join("");
  $("progress").style.setProperty("--i", order.stage);
}

/* ---------- Lịch sử đơn hàng ---------- */
const TABS = [["all", "Tất cả"], ["processing", "Đang xử lý"], ["done", "Đã giao"], ["canceled", "Đã hủy"]];
let filter = "all";

const historyStatus = o => o.status === "Đã hủy" ? "canceled" : o.status === "Đã giao" ? "done" : "processing";

function renderHistory() {
  const history = MuseOrders.all().map(normalizeOrder).map(o => ({
    ...o, hs: historyStatus(o),
    meta: "Đặt ngày " + (Number.isNaN(o.placed.getTime()) ? "—" : dmy(o.placedAt)) + (o.total ? " · " + money(o.total) : ""),
    thumb: o.items[0] ? o.items[0].img || "" : ""
  }));

  const count = k => k === "all" ? history.length : history.filter(o => o.hs === k).length;
  $("tabs").innerHTML = TABS.map(([k, label]) =>
    `<button class="btn" type="button" data-k="${k}" aria-pressed="${k === filter}">${label} (${count(k)})</button>`).join("");

  const rows = history.filter(o => filter === "all" || o.hs === filter);
  $("list").innerHTML = rows.length ? rows.map(o => `
    <div class="row ${o.hs}">
      ${o.thumb ? `<img class="th" src="${esc(o.thumb)}" alt="" onerror="this.removeAttribute('src')">` : '<div class="th" aria-hidden="true"></div>'}
      <div class="main">
        <p class="code"><b>${esc(o.code)}</b><span class="tag ${o.hs === "processing" ? "" : o.hs}">${esc(o.status)}</span></p>
        <p>${esc(o.productName)}</p>
        <p class="meta">${esc(o.meta)}</p>
      </div>
      <a class="btn" href="donhang.html?id=${encodeURIComponent(o.id)}#tien-trinh">Xem đơn hàng</a>
    </div>`).join("") : '<p class="empty">Chưa có đơn hàng nào trong mục này.</p>';
}

$("tabs").addEventListener("click", event => {
  const button = event.target.closest("button[data-k]");
  if (!button) return;
  filter = button.dataset.k;
  renderHistory();
});

/* ---------- Nút chat Messenger ---------- */
const chatButton = $("chatBaker");
if (chatButton) {
  chatButton.addEventListener("click", async function () {
    const code = ($("orderCode").textContent || "").replace("Đơn hàng ", "").trim() || "chưa xác định";
    const message = `Xin chào The Muse! Tôi muốn hỏi về đơn hàng ${code}.`;
    try {
      await navigator.clipboard.writeText(message);
      alert("Đã sao chép tin nhắn. Hãy dán vào Messenger để gửi.");
    } catch (error) {
      prompt("Sao chép nội dung tin nhắn:", message);
    }
    window.open("https://www.facebook.com/messages/t/1522786784248859", "_blank", "noopener");
  });
}

/* ---------- Khởi chạy ---------- */
if (typeof MuseOrders !== "undefined") {
  renderOrder(getCurrentOrder());
  renderHistory();
} else {
  document.querySelector("main").insertAdjacentHTML("afterbegin",
    '<p style="margin:20px 0;padding:12px 16px;border:1px dashed var(--err);border-radius:12px;color:var(--err)"><b>Không tải được donhangchung.js.</b> Hãy đặt file này cùng thư mục với donhang.html và nạp nó trước donhang.js.</p>');
  console.error("Không tìm thấy MuseOrders. Hãy tải donhangchung.js trước donhang.js.");
}