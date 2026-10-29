/* =====================================================
   THE MUSE - THEO DÕI ĐƠN HÀNG
   Dữ liệu lấy từ MuseOrders trong donhangchung.js
   ===================================================== */

const $ = id => document.getElementById(id);

const esc = value => String(value ?? "").replace(/[&<>"']/g, char => ({
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;"
}[char]));

const ICONS = {
  check: '<path d="M5 12l4 4 10-10"/>',
  cake: '<path d="M4 20h16M6 20v-7h12v7M8 13V9M12 13V7M16 13V9"/>',
  box: '<path d="M4 8l8-4 8 4v9l-8 4-8-4zM4 8l8 4 8-4M12 12v9"/>',
  truck: '<path d="M3 6h11v10H3zM14 10h4l3 3v3h-7"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/>'
};

const STAGES = [
  {
    icon: "check",
    label: "Bước 01 · Tiếp nhận",
    title: "Đã tiếp nhận đơn hàng",
    desc: "The Muse đã tiếp nhận thông tin đặt bánh.",
    foot: "Đã tiếp nhận"
  },
  {
    icon: "cake",
    label: "Bước 02 · Chế tác",
    title: "Đang chế tác bánh",
    desc: "Thợ bánh đang chuẩn bị và hoàn thiện chiếc bánh của bạn.",
    foot: "Đang thực hiện"
  },
  {
    icon: "box",
    label: "Bước 03 · Đóng hộp",
    title: "Kiểm tra và đóng hộp",
    desc: "Bánh sẽ được kiểm tra trước khi đóng gói.",
    foot: "Chuẩn bị giao hàng"
  },
  {
    icon: "truck",
    label: "Bước 04 · Giao hàng",
    title: "Đơn hàng đã được giao",
    desc: "Cảm ơn bạn đã lựa chọn The Muse.",
    foot: "Hoàn tất"
  }
];

/* Lấy tên sản phẩm từ dữ liệu đặt hàng */
function getProductName(order) {
  if (order.type === "custom") {
    const design = order.design || {};
    return design.name || "Bánh thiết kế riêng";
  }

  if (Array.isArray(order.items) && order.items.length) {
    return order.items.map(item => {
      const size = item.size ? ` – ${item.size}` : "";
      const qty = Number(item.qty || 1);

      return `${item.name || "Bánh"}${size}${qty > 1 ? ` × ${qty}` : ""}`;
    }).join(", ");
  }

  return order.product?.name || order.name || "Đơn hàng The Muse";
}

/* Lấy số lượng sản phẩm */
function getProductQty(order) {
  if (order.type === "custom") {
    const design = order.design || {};
    return design.size
      ? `1 chiếc · ${design.size}`
      : "1 chiếc · Bánh thiết kế riêng";
  }

  if (Array.isArray(order.items) && order.items.length) {
    return order.items.map(item => {
      const qty = Number(item.qty || 1);
      const size = item.size ? ` · ${item.size}` : "";
      return `${qty} sản phẩm${size}`;
    }).join(", ");
  }

  return order.product?.qty || "1 sản phẩm";
}

/* Chuẩn hóa trạng thái đơn hàng */
function getStage(order) {
  const stage = Number(order.stage ?? 0);
  return Math.max(0, Math.min(3, stage));
}

function getStatus(order) {
  if (
    order.status === "canceled" ||
    order.status === "cancelled" ||
    order.status === "Đã hủy"
  ) {
    return "Đã hủy";
  }

  return getStage(order) === 3 ? "Đã giao" : "Đang xử lý";
}

/* Chuẩn hóa ngày đặt hàng */
function formatDate(value) {
  if (!value) return "Chưa có thông tin ngày đặt";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return String(value);
  }

  return date.toLocaleString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}

/* Chuyển một đơn hàng thành dữ liệu để hiển thị */
function normalizeOrder(order) {
  const id = String(order.id || order.code || "");
  const code = order.code || `#${id.replace(/^#/, "")}`;
  const stage = getStage(order);

  return {
    ...order,
    id,
    code,
    stage,
    status: getStatus(order),
    productName: getProductName(order),
    productQty: getProductQty(order),
    message:
      order.message ||
      order.product?.message ||
      order.card ||
      "Chưa có lời nhắn",
    photo:
      order.photo ||
      order.product?.photo ||
      order.chefPhoto ||
      "",
    caption:
      order.photoCaption ||
      order.caption ||
      "Ảnh cập nhật từ bếp bánh",
    total: Number(order.total || 0)
  };
}

/* Lấy đúng đơn hàng theo mã trên URL */
function getCurrentOrder() {
  const params = new URLSearchParams(window.location.search);
  const requestedId = params.get("id") || params.get("code");

  const allOrders = MuseOrders.all().map(normalizeOrder);

  if (requestedId) {
    const target = requestedId.replace(/^#/, "");

    return allOrders.find(order =>
      order.id.replace(/^#/, "") === target ||
      order.code.replace(/^#/, "") === target
    );
  }

  // Không có mã trên URL thì lấy đơn mới nhất
  return allOrders[0];
}

/* Hiển thị thông tin chính của đơn hàng */
function renderOrder(order) {
  if (!order) {
    if ($("orderTag")) $("orderTag").textContent = "Chưa có đơn hàng";
    if ($("orderCode")) $("orderCode").textContent = "Không tìm thấy đơn hàng";

    if ($("pName")) $("pName").textContent = "Chưa có dữ liệu đơn hàng";
    if ($("pQty")) $("pQty").textContent =
      "Hãy đặt bánh để xem thông tin theo dõi.";

    if ($("steps")) {
      $("steps").innerHTML =
        '<li class="step active"><h3>Chưa có đơn hàng</h3>' +
        '<p>Đơn hàng sẽ xuất hiện tại đây sau khi được lưu thành công.</p></li>';
    }

    if ($("list")) {
      $("list").innerHTML =
        '<p class="empty">Bạn chưa có đơn hàng nào được lưu trên trình duyệt này.</p>';
    }

    return;
  }

  $("orderTag").textContent = order.status;
  $("orderCode").textContent = "Đơn hàng " + order.code;
  $("placed").textContent = "Ngày đặt: " + formatDate(order.placedAt);

  const baker = order.baker || {};

  $("bakerName").textContent = baker.name || "Đội ngũ The Muse";
  $("bakerMeta").textContent = [
    baker.role || "Thợ bánh",
    baker.phone || ""
  ].filter(Boolean).join(" · ");

  $("eta").textContent = order.eta || "Đang cập nhật";
  $("coldRoom").textContent = order.coldRoom || "Theo yêu cầu bảo quản";

  $("chefAv").textContent = (baker.name || "M").trim().split(/\s+/).pop()[0];
  $("chefName").textContent = baker.name
    ? "Chef " + baker.name.trim().split(/\s+/).slice(-2).join(" ")
    : "Chef The Muse";

  $("pName").textContent = order.productName;
  $("pQty").textContent = order.productQty;
  $("msgLabel").textContent = "Lời nhắn trên bánh";
  $("msgText").textContent = order.message;

  // Ảnh do thợ bánh cập nhật
  const photoBox = $("photo");

  if (photoBox) {
    photoBox.innerHTML = "";

    if (order.photo) {
      const img = document.createElement("img");
      img.src = order.photo;
      img.alt = order.productName;
      img.loading = "lazy";
      photoBox.appendChild(img);
    }
  }

  if ($("photoCap")) {
    $("photoCap").textContent = order.photo
      ? order.caption
      : "Thợ bánh chưa cập nhật ảnh cho đơn hàng này.";
  }

  // Thông tin chi tiết sản phẩm
  const specs = [];

  if (order.type === "custom" && order.design) {
    const design = order.design;

    if (design.shape) specs.push(["Hình dáng", design.shape]);
    if (design.tier) specs.push(["Số tầng", design.tier]);
    if (design.kem) specs.push(["Loại kem", design.kem]);
    if (design.mau) specs.push(["Màu sắc", design.mau]);
    if (design.date) specs.push(["Ngày nhận", design.date]);
    if (design.time) specs.push(["Giờ nhận", design.time]);
  } else if (Array.isArray(order.items) && order.items.length) {
    specs.push(["Số loại bánh", order.items.length]);
    specs.push(["Tổng thanh toán", order.total.toLocaleString("vi-VN") + "đ"]);
  }

  if (!specs.length) {
    specs.push(["Trạng thái", order.status]);
  }

  $("specs").innerHTML = specs.map(([key, value]) =>
    `<div><p class="eye">${esc(key)}</p><b>${esc(value)}</b></div>`
  ).join("");

  // Tiến trình đơn hàng
  const currentStage = order.stage;

  $("steps").innerHTML = STAGES.map((step, index) => {
    let state = "todo";

    if (index < currentStage) state = "done";
    if (index === currentStage) state = "active";

    if (order.status === "Đã hủy") state = "todo";

    return `
      <li class="step ${state}">
        <div class="ico">
          <svg viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="1.9"
            stroke-linecap="round" stroke-linejoin="round"
            aria-hidden="true">${ICONS[step.icon]}</svg>
          ${state === "active" ? '<span class="dot"></span>' : ""}
        </div>
        <p class="eye">${esc(step.label)}</p>
        <h3>${esc(step.title)}</h3>
        <p>${esc(step.desc)}</p>
        <p class="eye foot ${state === "done" ? "ok" : ""}">
          ${esc(state === "done" ? "Đã hoàn tất" : step.foot)}
        </p>
      </li>`;
  }).join("");

  const progressIndex = order.status === "Đã giao" ? 3 : currentStage;

  if ($("progress")) {
    $("progress").style.setProperty("--i", progressIndex);
  }

  if ($("progress")?.parentElement) {
    $("progress").parentElement.style.setProperty("--i", progressIndex);
  }
}

/* Lịch sử đơn hàng */
const TABS = [
  ["all", "Tất cả"],
  ["processing", "Đang xử lý"],
  ["done", "Đã giao"],
  ["canceled", "Đã hủy"]
];

let filter = "all";

function historyStatus(order) {
  if (order.status === "Đã hủy") return "canceled";
  if (order.status === "Đã giao") return "done";
  return "processing";
}

function renderHistory() {
  const orders = MuseOrders.all().map(normalizeOrder);

  const history = orders.map(order => ({
    ...order,
    historyStatus: historyStatus(order),
    tag: order.status,
    meta: `Đặt ngày ${formatDate(order.placedAt)}` +
      (order.total ? ` · ${order.total.toLocaleString("vi-VN")}đ` : ""),
    side: order.eta || "",
    thumb: order.photo || (
      Array.isArray(order.items) && order.items.length
        ? order.items[0].img || ""
        : ""
    )
  }));

  const count = key => key === "all"
    ? history.length
    : history.filter(order => order.historyStatus === key).length;

  if ($("tabs")) {
    $("tabs").innerHTML = TABS.map(([key, label]) =>
      `<button class="btn" type="button" data-k="${key}"
        aria-pressed="${key === filter}">
        ${label} (${count(key)})
      </button>`
    ).join("");
  }

  const rows = history.filter(order =>
    filter === "all" || order.historyStatus === filter
  );

  if (!$("list")) return;

  $("list").innerHTML = rows.length ? rows.map(order => `
    <div class="row ${order.historyStatus}">
      ${
        order.thumb
          ? `<img class="th" src="${esc(order.thumb)}" alt="">`
          : '<div class="th" aria-hidden="true"></div>'
      }
      <div class="main">
        <p class="code">
          <b>${esc(order.code)}</b>
          <span class="tag ${order.historyStatus === "processing" ? "" : order.historyStatus}">
            ${esc(order.tag)}
          </span>
        </p>
        <p>${esc(order.productName)}</p>
        <p class="meta">${esc(order.meta)}</p>
      </div>
      ${order.side ? `<p class="side">${esc(order.side)}</p>` : ""}
      <a class="btn" href="donhang.html?id=${encodeURIComponent(order.id)}#tien-trinh">
        Xem đơn hàng
      </a>
    </div>
  `).join("") : '<p class="empty">Chưa có đơn hàng nào trong mục này.</p>';
}

if ($("tabs")) {
  $("tabs").addEventListener("click", event => {
    const button = event.target.closest("button[data-k]");
    if (!button) return;

    filter = button.dataset.k;
    renderHistory();
  });
}

/* Nút Messenger */
const chatButton = $("chatBaker");

if (chatButton) {
  chatButton.addEventListener("click", async function () {
    const code = $("orderCode")?.textContent
      .replace("Đơn hàng ", "")
      .trim() || "chưa xác định";

    const message =
      `Xin chào The Muse! Tôi muốn hỏi về đơn hàng ${code}.`;

    try {
      await navigator.clipboard.writeText(message);
      alert("Đã sao chép tin nhắn. Hãy dán vào Messenger để gửi.");
    } catch (error) {
      prompt("Sao chép nội dung tin nhắn:", message);
    }

    window.open(
      "https://www.facebook.com/messages/t/61594695580721",
      "_blank",
      "noopener"
    );
  });
}

/* Khởi chạy */
if (typeof MuseOrders !== "undefined") {
  const currentOrder = getCurrentOrder();
  renderOrder(currentOrder);
  renderHistory();
} else {
  console.error(
    "Không tìm thấy MuseOrders. Hãy tải donhangchung.js trước donhang.js."
  );
}