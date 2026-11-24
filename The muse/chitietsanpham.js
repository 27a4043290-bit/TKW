
/* =========================================
   CHI TIẾT SẢN PHẨM - GIỎ HÀNG
   Lưu dữ liệu bằng localStorage
   Key sử dụng chung: "cart"
========================================= */

const KEY_CART = "cart";

let soLuong = 1;

const $ = id => document.getElementById(id);


/* =========================================
   1. HÀM TIỆN ÍCH
========================================= */

// Định dạng tiền
function dinhDang(n) {
    return Number(n).toLocaleString("en-US") + "VND";
}

// Chống lỗi khi đưa dữ liệu vào HTML
function esc(value) {
    return String(value == null ? "" : value).replace(
        /[&<>"']/g,
        char => ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        })[char]
    );
}


/* =========================================
   2. THAY ĐỔI SỐ LƯỢNG
========================================= */

function doiSL(n) {
    soLuong = Math.max(1, soLuong + n);

    if ($("sl")) {
        $("sl").textContent = soLuong;
    }
}


/* =========================================
   3. CẬP NHẬT GIÁ THEO SIZE
========================================= */

function doiGia() {
    const size = $("size");

    if (!size || size.selectedIndex < 0) return;

    const option = size.options[size.selectedIndex];

    const giaMoi = Number(option.value);
    const giaCu = Number(option.dataset.old || 0);

    // Giá hiện tại
    if ($("price")) {
        $("price").textContent = dinhDang(giaMoi);
    }

    // Giá cũ
    if ($("priceOld")) {
        $("priceOld").classList.toggle(
            "an",
            giaCu <= giaMoi
        );

        if (giaCu > giaMoi) {
            $("priceOld").textContent = dinhDang(giaCu);
        }
    }

    // Phần trăm giảm giá
    if ($("badgeSale")) {
        $("badgeSale").classList.toggle(
            "an",
            giaCu <= giaMoi
        );

        if (giaCu > giaMoi) {
            const phanTram = Math.round(
                (giaCu - giaMoi) / giaCu * 100
            );

            $("badgeSale").textContent = "-" + phanTram + "%";
        }
    }
}


/* =========================================
   4. ĐỌC GIỎ HÀNG
========================================= */

function layGio() {
    try {
        const data = JSON.parse(
            localStorage.getItem(KEY_CART) || "[]"
        );

        if (!Array.isArray(data)) return [];

        return data.map(sp => ({
            ...sp,
            key: sp.key || sp.id,
            qty: Math.max(1, Number(sp.qty) || 1),
            price: Number(sp.price) || 0
        }));

    } catch (e) {
        return [];
    }
}


/* =========================================
   5. LƯU GIỎ HÀNG
========================================= */

function luuGio(gio) {
    try {
        localStorage.setItem(
            KEY_CART,
            JSON.stringify(gio)
        );

        window.dispatchEvent(
            new Event("cart-updated")
        );

        return true;

    } catch (e) {
        alert("Không thể lưu giỏ hàng!");
        return false;
    }
}


/* =========================================
   6. THÊM SẢN PHẨM VÀO GIỎ
========================================= */

function themVaoGio() {

    const size = $("size");
    const ten = document.querySelector(".info h1");
    const anh = document.querySelector(".main-img");
    const product = document.querySelector(".product");

    if (!size || !ten || !anh || !anh.src) {
        alert("Không tìm thấy thông tin sản phẩm!");
        return false;
    }

    const option = size.options[size.selectedIndex];

    const id = (product && product.dataset.id) ||
        location.pathname.split("/").pop().replace(".html", "");

    const tenBanh = ten.textContent.trim();
    const kichThuoc = option.text.trim();
    const gia = Number(option.value);

    // Mỗi bánh và size có một mã riêng
    const key = id + "|" + kichThuoc;

    const gio = layGio();

    // Kiểm tra sản phẩm đã có trong giỏ chưa
    const sanPham = gio.find(sp => sp.key === key);

    if (sanPham) {

        // Nếu đã có thì cộng số lượng
        sanPham.qty += soLuong;

        // Cập nhật giá và ảnh theo thông tin mới
        sanPham.price = gia;
        sanPham.img = anh.src;

    } else {

        // Nếu chưa có thì thêm sản phẩm mới
        gio.push({
            key: key,
            id: id,
            name: tenBanh,
            size: kichThuoc,
            price: gia,
            img: anh.src,
            qty: soLuong
        });

    }

    return luuGio(gio);
}


/* =========================================
   7. CẬP NHẬT SỐ LƯỢNG TRÊN HEADER
========================================= */

function capNhatBadge() {

    const gio = layGio();

    const tongSL = gio.reduce(
        (tong, sp) => tong + sp.qty,
        0
    );

    const badge = $("cartCount");

    if (badge && badge.textContent !== String(tongSL)) {
        badge.textContent = tongSL;
    }
}


/* =========================================
   8. HIỂN THỊ SẢN PHẨM TRONG GIỎ
========================================= */

function veGio() {

    const gio = layGio();

    // Tổng số lượng bánh
    const tongSL = gio.reduce(
        (tong, sp) => tong + sp.qty,
        0
    );

    // Tổng tiền
    const tongTien = gio.reduce(
        (tong, sp) => tong + sp.price * sp.qty,
        0
    );

    const danhSach = $("cartItems");

    if (danhSach) {

        if (gio.length === 0) {

            danhSach.innerHTML =
                '<p class="cd-empty">Giỏ hàng đang trống.</p>';

        } else {

            danhSach.innerHTML = gio.map(sp => `

                <div class="cd-item">

                    <img
                        src="${esc(sp.img)}"
                        alt="${esc(sp.name)}"
                    >

                    <div>
                        <h3>
                            ${esc(sp.name)} - ${esc(sp.size)}
                        </h3>

                        <div class="cd-q">
                            ${sp.qty}x
                            <em>${dinhDang(sp.price)}</em>
                        </div>
                    </div>

                    <button
                        class="cd-del"
                        type="button"
                        data-key="${esc(sp.key)}"
                        aria-label="Xóa sản phẩm">

                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round">

                            <path d="M3 6h18"/>
                            <path d="M8 6V4h8v2"/>
                            <path d="M6 6l1 14h10l1-14"/>

                        </svg>

                    </button>

                </div>

            `).join("");

        }
    }

    // Cập nhật tổng số lượng
    if ($("cartCountText")) {
        $("cartCountText").textContent =
            tongSL + " sản phẩm";
    }

    // Cập nhật tổng tiền
    if ($("cartTotal")) {
        $("cartTotal").textContent =
            dinhDang(tongTien);
    }

    // Cập nhật icon giỏ hàng trên header
    capNhatBadge();
}


/* =========================================
   9. MỞ KHUNG GIỎ HÀNG
========================================= */

function moGio() {

    const drawer = $("cartDrawer");
    const overlay = $("cartOverlay");

    if (!drawer || !overlay) {
        console.error("Chưa có HTML khung giỏ hàng!");
        return;
    }

    // Cập nhật sản phẩm trước khi mở
    veGio();

    // Hiện khung giỏ hàng
    drawer.classList.add("open");
    overlay.classList.add("open");

    drawer.setAttribute("aria-hidden", "false");

    // Khóa cuộn trang phía sau
    document.body.classList.add("cd-lock");
}


/* =========================================
   10. ĐÓNG KHUNG GIỎ HÀNG
========================================= */

function dongGio() {

    const drawer = $("cartDrawer");
    const overlay = $("cartOverlay");

    if (!drawer || !overlay) return;

    drawer.classList.remove("open");
    overlay.classList.remove("open");

    drawer.setAttribute("aria-hidden", "true");

    document.body.classList.remove("cd-lock");
}


/* =========================================
   11. XÓA SẢN PHẨM KHỎI GIỎ
========================================= */

function xoaSanPham(key) {

    const gio = layGio().filter(
        sp => sp.key !== key
    );

    if (luuGio(gio)) {
        veGio();
    }
}


/* =========================================
   12. NÚT THÊM VÀO GIỎ HÀNG
========================================= */

function mua() {

    // Lưu sản phẩm
    const thanhCong = themVaoGio();

    if (!thanhCong) return;

    // Mở giỏ hàng ngay lập tức
    moGio();

    // Đưa số lượng về 1
    soLuong = 1;

    if ($("sl")) {
        $("sl").textContent = 1;
    }
}


/* =========================================
   13. NÚT MUA NGAY
========================================= */

function muaNgay() {

    // Lưu sản phẩm trước khi chuyển trang
    if (themVaoGio()) {

        window.location.href = "../thanhtoan.html";

    }
}


/* =========================================
   14. SỰ KIỆN CLICK
========================================= */

document.addEventListener("click", function(e) {

    // Nút xóa sản phẩm
    const nutXoa = e.target.closest(".cd-del");

    if (nutXoa) {
        xoaSanPham(nutXoa.dataset.key);
        return;
    }

    // Icon giỏ hàng trên header
    if (e.target.closest("#openCart")) {
        e.preventDefault();
        moGio();
        return;
    }

    // Nút đóng giỏ hàng
    if (e.target.closest("#cartClose")) {
        dongGio();
        return;
    }

    // Bấm vùng nền tối
    if (e.target.id === "cartOverlay") {
        dongGio();
    }

});


/* =========================================
   15. ĐÓNG GIỎ BẰNG PHÍM ESC
========================================= */

document.addEventListener("keydown", function(e) {

    if (e.key === "Escape") {
        dongGio();
    }

});


/* =========================================
   16. CẬP NHẬT KHI MỞ NHIỀU TAB
========================================= */

window.addEventListener("storage", function(e) {

    if (e.key === KEY_CART) {
        veGio();
    }

});


/* =========================================
   17. KHỞI TẠO TRANG
========================================= */

// Hiện giá ban đầu
doiGia();

// Hiện số lượng và tổng tiền giỏ hàng
veGio();

// Header được nạp bằng JavaScript
const header = $("site-header");

if (header) {

    new MutationObserver(function() {
        capNhatBadge();
    }).observe(header, {
        childList: true,
        subtree: true
    });

}
/* =========================================
   18. SẢN PHẨM LIÊN QUAN
   (giá "Từ", tag Hot/Mới, nút + chọn size)
========================================= */

// Đọc data-sizes="12 cm=120000; 16 cm=150000" -> [{ten, gia}, ...]
function docSize(card) {
    return (card.dataset.sizes || "")
        .split(";")
        .map(s => s.split("="))
        .filter(p => p.length === 2)
        .map(p => ({ ten: p[0].trim(), gia: Number(p[1]) || 0 }))
        .filter(s => s.ten && s.gia > 0);
}

function veSanPhamLienQuan() {
    document.querySelectorAll(".related .card").forEach(card => {
        const sizes = docSize(card);
        if (!sizes.length) return;

        const giaThapNhat = Math.min(...sizes.map(s => s.gia));
        const giaCu = Number(card.dataset.old) || 0;
        const tags = (card.dataset.tags || "").split(",").map(t => t.trim());

        // Tag Hot / Mới
        let html = "";
        if (tags.includes("hot")) html += '<span class="tag-hot">Hot</span>';
        if (tags.includes("new")) html += '<span class="tag-new">Mới</span>';
        if (html) {
            card.insertAdjacentHTML("afterbegin",
                '<div class="card-tags">' + html + "</div>");
        }

        // Giá "Từ ..."
        const gia = card.querySelector(".gia");
        if (gia) {
            gia.innerHTML = 'Từ <span class="price-new">' + dinhDang(giaThapNhat) + "</span>" +
                (giaCu > giaThapNhat
                    ? ' <span class="price-old">' + dinhDang(giaCu) + "</span>"
                    : "");
        }

        // Nút "Thêm vào giỏ hàng" + 2 nút chọn size
        const pick = card.querySelector(".card-pick");
        if (pick) {
            pick.insertAdjacentHTML("beforeend",
                '<button type="button" class="card-add">Thêm vào giỏ hàng</button>' +
                '<div class="card-sizes">' +
                sizes.map(s =>
                    '<button type="button" class="card-size" data-size="' + esc(s.ten) +
                    '" data-gia="' + s.gia + '">' + esc(s.ten) +
                    "<small>" + dinhDang(s.gia) + "</small></button>"
                ).join("") +
                "</div>");
        }

        // Rê chuột ra khỏi thẻ thì quay lại hiện tên bánh
        card.addEventListener("mouseleave", () => card.classList.remove("chon-size"));
    });
}

// Thêm đúng size đã chọn vào giỏ rồi mở khung giỏ hàng bên phải
function themLienQuanVaoGio(card, size, gia) {
    const link = card.querySelector("a");
    const anh  = card.querySelector("img");
    const ten  = card.querySelector("h3");
    if (!link || !anh || !ten) return;

    const id  = link.getAttribute("href").split("/").pop().replace(".html", "");
    const key = id + "|" + size;                 // cùng dạng key với trang chi tiết

    const gio = layGio();
    const sp  = gio.find(x => x.key === key);

    if (sp) {
        sp.qty += 1;
        sp.price = gia;
    } else {
        gio.push({
            key: key,
            id: id,
            name: ten.textContent.trim(),
            size: size,
            price: gia,
            img: anh.src,
            qty: 1
        });
    }

    if (luuGio(gio)) moGio();
}

function dongChonSize() {
    document.querySelectorAll(".card.chon-size")
        .forEach(c => c.classList.remove("chon-size"));
}

document.addEventListener("click", function (e) {
    const nutThem = e.target.closest(".card-add");
    const nutSize = e.target.closest(".card-size");

    // Bấm "Thêm vào giỏ hàng" -> hiện 2 size
    if (nutThem) {
        dongChonSize();
        nutThem.closest(".card").classList.add("chon-size");
        return;
    }

    // Bấm 1 size -> thêm vào giỏ + mở giỏ hàng
    if (nutSize) {
        const card = nutSize.closest(".card");
        themLienQuanVaoGio(card, nutSize.dataset.size, Number(nutSize.dataset.gia));
        card.classList.remove("chon-size");
        return;
    }

    // Bấm ra ngoài -> đóng phần chọn size
    dongChonSize();
});