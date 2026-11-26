/* =====================================
   QUẢN TRỊ NGƯỜI BÁN - THE MUSE
   Lưu trữ bằng localStorage
===================================== */

const ORDER_KEY = "danhSachDonHang";

const $ = id => document.getElementById(id);

const money = value =>
    Number(value || 0).toLocaleString("vi-VN") + " VND";

function escapeHTML(value) {
    return String(value ?? "").replace(/[&<>"']/g, char => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[char]);
}

// Đọc dữ liệu đơn hàng
function layDonHang() {
    try {
        const data = JSON.parse(localStorage.getItem(ORDER_KEY) || "[]");
        return Array.isArray(data) ? data : [];
    } catch {
        return [];
    }
}

// Lưu dữ liệu đơn hàng
function luuDonHang(data) {
    localStorage.setItem(ORDER_KEY, JSON.stringify(data));
}

// Chuyển chuỗi tiền thành số
function tienThanhSo(value) {
    if (typeof value === "number") return value;

    return Number(
        String(value ?? "").replace(/[^\d]/g, "")
    ) || 0;
}

// Lấy tổng tiền đơn hàng
function tongTienDon(don) {
    return tienThanhSo(don.tongTien ?? don.tong ?? 0);
}

// Lấy tên khách hàng
function tenKhach(don) {
    return don.khachHang?.ten || don.tenKhach || "Chưa có tên";
}

// Lấy số điện thoại
function sdtKhach(don) {
    return don.khachHang?.sdt || don.sdt || "";
}

// Ngày đặt đơn
function ngayDat(don) {
    return don.ngayDat || "";
}

// Chuẩn hóa ngày thành Date
function parseDate(value) {
    if (!value) return null;

    const date = new Date(value);

    if (!Number.isNaN(date.getTime())) return date;

    return null;
}

// Hiển thị ngày
function hienNgay(value) {
    const date = parseDate(value);

    if (!date) return value || "—";

    return date.toLocaleDateString("vi-VN");
}

// Hiển thị trạng thái
function statusClass(status) {
    const classes = {
        "Chờ xác nhận": "status-pending",
        "Đã xác nhận": "status-confirmed",
        "Đang giao": "status-shipping",
        "Đã hoàn thành": "status-completed",
        "Đã hủy": "status-cancelled"
    };

    return classes[status] || "status-pending";
}

// Lấy danh sách đơn mới nhất lên đầu
function donMoiNhat() {
    return layDonHang().slice().reverse();
}

// =====================================
// CHUYỂN TRANG QUẢN TRỊ
// =====================================

function chuyenTrang(page) {
    document.querySelectorAll(".admin-panel").forEach(panel => {
        panel.classList.remove("active");
    });

    document.querySelectorAll(".side-link").forEach(button => {
        button.classList.remove("active");
    });

    const panel = $(page);

    if (panel) panel.classList.add("active");

    const button = document.querySelector(
        `.side-link[data-page="${page}"]`
    );

    if (button) button.classList.add("active");

    if (page === "overview") capNhatDuLieu();
    if (page === "orders") hienThiDonHang();
    if (page === "revenue") hienThiDoanhThu();
    if (page === "products") hienThiSanPham();
}

// =====================================
// THỐNG KÊ TỔNG QUAN
// =====================================

function capNhatDuLieu() {
    const orders = layDonHang();

    const completed = orders.filter(
        don => don.trangThai === "Đã hoàn thành"
    );

    const pending = orders.filter(
        don => don.trangThai === "Chờ xác nhận"
    );

    const revenue = completed.reduce(
        (sum, don) => sum + tongTienDon(don), 0
    );

    $("totalRevenue").textContent = money(revenue);
    $("totalOrders").textContent = orders.length;
    $("pendingOrders").textContent = pending.length;
    $("completedOrders").textContent = completed.length;

    $("pendingBadge").textContent = pending.length;

    hienDonGanDay();
    veBieuDo();
}

// =====================================
// ĐƠN HÀNG GẦN ĐÂY
// =====================================

function hienDonGanDay() {
    const orders = donMoiNhat().slice(0, 5);
    const tbody = $("recentOrders");

    if (!orders.length) {
        tbody.innerHTML = `
            <tr>
                <td colspan="6" class="empty-row">
                    Chưa có đơn hàng nào.
                </td>
            </tr>
        `;
        return;
    }

    tbody.innerHTML = orders.map(don => `
        <tr>
            <td><b>${escapeHTML(don.maDon)}</b></td>
            <td>${escapeHTML(tenKhach(don))}</td>
            <td>${escapeHTML(hienNgay(ngayDat(don)))}</td>
            <td>${money(tongTienDon(don))}</td>
            <td>
                <span class="status ${statusClass(don.trangThai)}">
                    ${escapeHTML(don.trangThai || "Chờ xác nhận")}
                </span>
            </td>
            <td>
                <button class="action-btn"
                    onclick="xemChiTiet('${escapeHTML(don.maDon)}')">
                    Xem
                </button>
            </td>
        </tr>
    `).join("");
}

// =====================================
// QUẢN LÝ ĐƠN HÀNG
// =====================================

function hienThiDonHang() {
    const keyword = $("searchOrder").value
        .trim().toLowerCase();

    const status = $("filterStatus").value;

    const orders = donMoiNhat().filter(don => {
        const text = [
            don.maDon,
            tenKhach(don),
            sdtKhach(don)
        ].join(" ").toLowerCase();

        const matchKeyword = text.includes(keyword);

        const matchStatus =
            !status || don.trangThai === status;

        return matchKeyword && matchStatus;
    });

    const tbody = $("orderList");

    if (!orders.length) {
        tbody.innerHTML = `
            <tr>
                <td colspan="7" class="empty-row">
                    Không tìm thấy đơn hàng.
                </td>
            </tr>
        `;
        return;
    }

    tbody.innerHTML = orders.map(don => `
        <tr>
            <td><b>${escapeHTML(don.maDon)}</b></td>
            <td>${escapeHTML(tenKhach(don))}</td>
            <td>${escapeHTML(sdtKhach(don))}</td>
            <td>${escapeHTML(hienNgay(ngayDat(don)))}</td>
            <td>${money(tongTienDon(don))}</td>
            <td>
                <span class="status ${statusClass(don.trangThai)}">
                    ${escapeHTML(don.trangThai || "Chờ xác nhận")}
                </span>
            </td>
            <td>
                <button class="action-btn"
                    onclick="xemChiTiet('${escapeHTML(don.maDon)}')">
                    Chi tiết
                </button>
            </td>
        </tr>
    `).join("");
}

// =====================================
// XEM CHI TIẾT ĐƠN HÀNG
// =====================================

function xemChiTiet(maDon) {
    const don = layDonHang().find(
        item => item.maDon === maDon
    );

    if (!don) {
        alert("Không tìm thấy đơn hàng.");
        return;
    }

    const kh = don.khachHang || {};

    const sanPham = don.sanPham || [];

    const productHTML = sanPham.map(sp => `
        <div class="detail-product">
            ${sp.anh || sp.img ? `
                <img src="${escapeHTML(sp.anh || sp.img)}" alt="">
            ` : `<img src="" alt="Bánh">`}

            <div class="detail-product-info">
                <b>${escapeHTML(sp.ten || sp.name)}</b>
                <p>Size: ${escapeHTML(sp.size || "—")}</p>
                <p>Số lượng: ${Number(sp.soLuong ?? sp.qty ?? 0)}</p>
                <p>Đơn giá: ${money(sp.gia ?? sp.price)}</p>
            </div>
        </div>
    `).join("");

    $("orderDetail").innerHTML = `
        <div class="detail-group">
            <h3>Thông tin đơn hàng</h3>
            <p>Mã đơn: <b>${escapeHTML(don.maDon)}</b></p>
            <p>Ngày đặt: ${escapeHTML(ngayDat(don))}</p>
            <p>Ngày giao: ${escapeHTML(don.ngayGiao)}</p>
            <p>Khung giờ: ${escapeHTML(don.khungGio)}</p>
            <p>Trạng thái:
                <span class="status ${statusClass(don.trangThai)}">
                    ${escapeHTML(don.trangThai)}
                </span>
            </p>
        </div>

        <div class="detail-group">
            <h3>Thông tin khách hàng</h3>
            <p>Họ tên: ${escapeHTML(kh.ten || don.tenKhach)}</p>
            <p>Số điện thoại: ${escapeHTML(kh.sdt || don.sdt)}</p>
            <p>Email: ${escapeHTML(kh.email || "")}</p>
            <p>Địa chỉ:
                ${escapeHTML(kh.diaChi || don.diaChi)}
                ${escapeHTML(kh.quanHuyen || don.quanHuyen)}
            </p>
            <p>Yêu cầu khác: ${escapeHTML(don.yeuCau)}</p>
            <p>Lời chúc: ${escapeHTML(don.loiChuc || "")}</p>
        </div>

        <div class="detail-group">
            <h3>Sản phẩm đã đặt</h3>
            ${productHTML || "<p>Không có thông tin sản phẩm.</p>"}
        </div>

        <div class="detail-group">
            <h3>Thanh toán</h3>
            <p>Phương thức: ${escapeHTML(don.phuongThuc)}</p>
            <p>Tạm tính: ${money(don.tamTinh)}</p>
            <p>Phí giao hàng: ${money(don.phiShip)}</p>
            <p class="detail-total">
                Tổng thanh toán: ${money(tongTienDon(don))}
            </p>
        </div>

        <div class="detail-actions">
            <select id="newStatus">
                ${[
                    "Chờ xác nhận",
                    "Đã xác nhận",
                    "Đang giao",
                    "Đã hoàn thành",
                    "Đã hủy"
                ].map(status => `
                    <option value="${status}"
                        ${don.trangThai === status ? "selected" : ""}>
                        ${status}
                    </option>
                `).join("")}
            </select>

            <button onclick="capNhatTrangThai('${escapeHTML(don.maDon)}')">
                Lưu trạng thái
            </button>
        </div>
    `;

    $("orderModal").classList.add("show");
}

function dongChiTiet() {
    $("orderModal").classList.remove("show");
}

// =====================================
// CẬP NHẬT TRẠNG THÁI ĐƠN
// =====================================

function capNhatTrangThai(maDon) {
    const newStatus = $("newStatus").value;

    const orders = layDonHang();

    const index = orders.findIndex(
        don => don.maDon === maDon
    );

    if (index === -1) {
        alert("Không tìm thấy đơn hàng.");
        return;
    }

    const oldStatus = orders[index].trangThai;

    if (oldStatus === "Đã hủy" || oldStatus === "Đã hoàn thành") {
        if (oldStatus !== newStatus) {
            const confirmChange = confirm(
                "Đơn hàng đã kết thúc. Bạn có chắc muốn thay đổi trạng thái?"
            );

            if (!confirmChange) return;
        }
    }

    orders[index].trangThai = newStatus;

    luuDonHang(orders);

    alert("Đã cập nhật trạng thái đơn hàng.");

    dongChiTiet();
    capNhatDuLieu();
    hienThiDonHang();
    hienThiDoanhThu();
    hienThiSanPham();
}

// =====================================
// THỐNG KÊ DOANH THU
// =====================================

function hienThiDoanhThu() {
    const orders = layDonHang();

    const completed = orders.filter(
        don => don.trangThai === "Đã hoàn thành"
    );

    const now = new Date();

    const todayRevenue = completed.reduce((sum, don) => {
        const date = parseDate(ngayDat(don));

        if (
            date &&
            date.getDate() === now.getDate() &&
            date.getMonth() === now.getMonth() &&
            date.getFullYear() === now.getFullYear()
        ) {
            return sum + tongTienDon(don);
        }

        return sum;
    }, 0);

    const monthRevenue = completed.reduce((sum, don) => {
        const date = parseDate(ngayDat(don));

        if (
            date &&
            date.getMonth() === now.getMonth() &&
            date.getFullYear() === now.getFullYear()
        ) {
            return sum + tongTienDon(don);
        }

        return sum;
    }, 0);

    const total = completed.reduce(
        (sum, don) => sum + tongTienDon(don), 0
    );

    $("revenueAll").textContent = money(total);
    $("revenueToday").textContent = money(todayRevenue);
    $("revenueMonth").textContent = money(monthRevenue);

    const tbody = $("revenueList");

    if (!completed.length) {
        tbody.innerHTML = `
            <tr>
                <td colspan="4" class="empty-row">
                    Chưa có đơn hàng hoàn thành.
                </td>
            </tr>
        `;
        return;
    }

    tbody.innerHTML = completed.slice().reverse().map(don => `
        <tr>
            <td><b>${escapeHTML(don.maDon)}</b></td>
            <td>${escapeHTML(tenKhach(don))}</td>
            <td>${escapeHTML(hienNgay(ngayDat(don)))}</td>
            <td><b>${money(tongTienDon(don))}</b></td>
        </tr>
    `).join("");
}

// =====================================
// SẢN PHẨM BÁN CHẠY
// =====================================

function hienThiSanPham() {
    const orders = layDonHang().filter(
        don => don.trangThai === "Đã hoàn thành"
    );

    const products = {};

    orders.forEach(don => {
        (don.sanPham || []).forEach(sp => {
            const name = sp.ten || sp.name || "Sản phẩm";

            const quantity = Number(sp.soLuong ?? sp.qty ?? 0);
            const price = tienThanhSo(sp.gia ?? sp.price);

            if (!products[name]) {
                products[name] = {
                    ten: name,
                    soLuong: 0,
                    doanhThu: 0
                };
            }

            products[name].soLuong += quantity;
            products[name].doanhThu += price * quantity;
        });
    });

    const list = Object.values(products).sort(
        (a, b) => b.soLuong - a.soLuong
    );

    $("bestProducts").innerHTML = list.length
        ? list.map((sp, index) => `
            <tr>
                <td>${index + 1}</td>
                <td><b>${escapeHTML(sp.ten)}</b></td>
                <td>${sp.soLuong}</td>
                <td>${money(sp.doanhThu)}</td>
            </tr>
        `).join("")
        : `
            <tr>
                <td colspan="4" class="empty-row">
                    Chưa có dữ liệu bán hàng.
                </td>
            </tr>
        `;
}

// =====================================
// BIỂU ĐỒ DOANH THU 7 NGÀY
// =====================================

function veBieuDo() {
    const canvas = $("revenueChart");
    const ctx = canvas.getContext("2d");

    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    if (!width || !height) return;

    const ratio = window.devicePixelRatio || 1;

    canvas.width = width * ratio;
    canvas.height = height * ratio;

    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

    ctx.clearRect(0, 0, width, height);

    const orders = layDonHang().filter(
        don => don.trangThai === "Đã hoàn thành"
    );

    const days = [];

    for (let i = 6; i >= 0; i--) {
        const date = new Date();

        date.setDate(date.getDate() - i);

        const key =
            date.getFullYear() + "-" +
            date.getMonth() + "-" +
            date.getDate();

        days.push({
            key,
            label: date.getDate() + "/" + (date.getMonth() + 1),
            value: 0
        });
    }

    orders.forEach(don => {
        const date = parseDate(ngayDat(don));

        if (!date) return;

        const key =
            date.getFullYear() + "-" +
            date.getMonth() + "-" +
            date.getDate();

        const day = days.find(item => item.key === key);

        if (day) day.value += tongTienDon(don);
    });

    const max = Math.max(...days.map(day => day.value), 1);

    const left = 65;
    const right = 20;
    const top = 25;
    const bottom = 40;

    const chartWidth = width - left - right;
    const chartHeight = height - top - bottom;

    ctx.font = "11px Roboto, Arial";
    ctx.textAlign = "right";

    // Đường lưới
    for (let i = 0; i <= 4; i++) {
        const y = top + chartHeight * i / 4;

        ctx.strokeStyle = "#e8e1d8";
        ctx.lineWidth = 1;

        ctx.beginPath();
        ctx.moveTo(left, y);
        ctx.lineTo(width - right, y);
        ctx.stroke();

        const value = max * (4 - i) / 4;

        ctx.fillStyle = "#7a7f8a";

        ctx.fillText(
            value >= 1000000
                ? (value / 1000000).toFixed(1) + "tr"
                : Math.round(value / 1000) + "k",
            left - 10,
            y + 4
        );
    }

    const step = chartWidth / days.length;
    const barWidth = Math.min(35, step * 0.5);

    days.forEach((day, index) => {
        const x = left + step * index + step / 2;
        const barHeight = day.value / max * chartHeight;
        const y = top + chartHeight - barHeight;

        ctx.fillStyle = "#fdc86e";

        ctx.fillRect(
            x - barWidth / 2,
            y,
            barWidth,
            Math.max(barHeight, 2)
        );

        ctx.fillStyle = "#0b1a33";
        ctx.textAlign = "center";
        ctx.font = "11px Roboto, Arial";

        ctx.fillText(
            day.label,
            x,
            height - 12
        );
    });
}

// =====================================
// KHỞI TẠO
// =====================================

document.addEventListener("DOMContentLoaded", function () {

    $("currentDate").textContent =
        new Date().toLocaleDateString("vi-VN");

    document.querySelectorAll(".side-link").forEach(button => {
        button.addEventListener("click", () => {
            chuyenTrang(button.dataset.page);
        });
    });

    $("searchOrder").addEventListener("input", hienThiDonHang);

    $("filterStatus").addEventListener("change", hienThiDonHang);

    $("orderModal").addEventListener("click", function (event) {
        if (event.target === this) dongChiTiet();
    });

    window.addEventListener("storage", function (event) {
        if (event.key === ORDER_KEY) {
            capNhatDuLieu();
            hienThiDonHang();
            hienThiDoanhThu();
            hienThiSanPham();
        }
    });

    window.addEventListener("resize", veBieuDo);

    capNhatDuLieu();
    hienThiDonHang();
    hienThiDoanhThu();
    hienThiSanPham();
});
