
let soLuong = 1;
let gioHang = JSON.parse(localStorage.getItem("gioHang")) || [];

// LẤY THÔNG TIN SẢN PHẨM
function laySanPham() {
    const product = document.querySelector(".product");
    const size = document.getElementById("size");

    return {
        id: product.dataset.id,
        ten: product.querySelector("h1").innerText,
        anh: product.querySelector(".main-img").src,
        size: size.options[size.selectedIndex].text,
        gia: Number(size.value),
        soLuong: soLuong
    };
}

// TĂNG GIẢM SỐ LƯỢNG
function doiSL(n) {
    soLuong += n;

    if (soLuong < 1) soLuong = 1;

    document.getElementById("sl").innerText = soLuong;
    doiGia();
}


// CẬP NHẬT GIÁ VÀ PHẦN TRĂM GIẢM GIÁ
function doiGia() {
    const size = document.getElementById("size");
    const gia = Number(size.value);
    const giaCu = Number(
        size.options[size.selectedIndex].dataset.old
    );

    const price = document.getElementById("price");
    const priceOld = document.getElementById("priceOld");
    const badgeSale = document.getElementById("badgeSale");

    price.innerText =
        (gia * soLuong).toLocaleString("vi-VN") + "VND";

    if (giaCu > gia) {
        const phanTram = Math.round(
            (giaCu - gia) / giaCu * 100
        );

        priceOld.innerText =
            giaCu.toLocaleString("vi-VN") + "VND";

        badgeSale.innerText = "-" + phanTram + "%";

        priceOld.classList.remove("an");
        badgeSale.classList.remove("an");
    } else {
        priceOld.classList.add("an");
        badgeSale.classList.add("an");
    }
}


// LƯU GIỎ HÀNG
function luuGioHang() {
    localStorage.setItem("gioHang", JSON.stringify(gioHang));
}

// THÊM VÀO GIỎ HÀNG
function mua() {
    const sp = laySanPham();

    const sanPhamCu = gioHang.find(item =>
        item.id === sp.id && item.size === sp.size
    );

    if (sanPhamCu) {
        sanPhamCu.soLuong += soLuong;
    } else {
        gioHang.push(sp);
    }

    luuGioHang();
    hienThiGioHang();
    moGioHang();

    soLuong = 1;
    document.getElementById("sl").innerText = 1;
    doiGia();
}

// HIỂN THỊ GIỎ HÀNG
function hienThiGioHang() {
    const cartItems = document.getElementById("cartItems");

    let tongSL = 0;
    let tongTien = 0;

    cartItems.innerHTML = "";

    gioHang.forEach((item, index) => {
        tongSL += item.soLuong;
        tongTien += item.gia * item.soLuong;

        cartItems.innerHTML += `
            <div class="cart-item">
                <img src="${item.anh}" width="70">
                <div>
                    <h3>${item.ten}</h3>
                    <p>Size: ${item.size}</p>
                    <p>${item.gia.toLocaleString("vi-VN")} VND</p>
                    <button onclick="xoaSanPham(${index})">
                        Xóa
                    </button>
                </div>
            </div>
        `;
    });

    document.getElementById("cartCountText").innerText =
        tongSL + " sản phẩm";

    document.getElementById("cartTotal").innerText =
        tongTien.toLocaleString("vi-VN") + " VND";
}

// XÓA SẢN PHẨM
function xoaSanPham(index) {
    gioHang.splice(index, 1);

    luuGioHang();
    hienThiGioHang();
}

// MỞ GIỎ HÀNG
function moGioHang() {
    document.getElementById("cartDrawer").classList.add("open");
    document.getElementById("cartOverlay").classList.add("open");

    document.getElementById("cartDrawer")
        .setAttribute("aria-hidden", "false");
}

// ĐÓNG GIỎ HÀNG
function dongGioHang() {
    document.getElementById("cartDrawer").classList.remove("open");
    document.getElementById("cartOverlay").classList.remove("open");

    document.getElementById("cartDrawer")
        .setAttribute("aria-hidden", "true");
}

// MUA NGAY
function muaNgay() {
    mua();
    window.location.href = "../thanhtoan.html";
}

// KHỞI TẠO
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("cartClose")
        .addEventListener("click", dongGioHang);

    document.getElementById("cartOverlay")
        .addEventListener("click", dongGioHang);

    document.getElementById("size")
        .addEventListener("change", doiGia);

    doiGia();
    hienThiGioHang();
});

/* =================================
   CHỨC NĂNG BÌNH LUẬN VÀ ĐÁNH GIÁ
================================= */

// CHUYỂN TAB
function chuyenTab(tab, button) {
    document.querySelectorAll(".review-tab").forEach(item => {
        item.classList.remove("active");
    });

    document.querySelectorAll(".review-panel").forEach(item => {
        item.classList.remove("active");
    });

    button.classList.add("active");
    document.getElementById(tab).classList.add("active");

    if (tab === "comments") {
        hienThiBinhLuan();
    }
}

// LẤY KEY RIÊNG CHO TỪNG SẢN PHẨM
function layKeyDanhGia() {
    const product = document.querySelector(".product");
    return "danhGia_" + product.dataset.id;
}

// LẤY DANH SÁCH ĐÁNH GIÁ
function layDanhSachDanhGia() {
    return JSON.parse(localStorage.getItem(layKeyDanhGia())) || [];
}

// ĐĂNG BÌNH LUẬN
function dangBinhLuan() {
    const ten = document.getElementById("reviewName").value.trim();
    const noiDung = document.getElementById("reviewContent").value.trim();
    const sao = document.querySelector('input[name="rating"]:checked');
    const thongBao = document.getElementById("reviewMessage");

    if (!ten || !noiDung || !sao) {
        thongBao.innerText = "Vui lòng nhập tên, nội dung và chọn số sao!";
        return;
    }

    const danhSach = layDanhSachDanhGia();

    danhSach.unshift({
        ten: ten,
        noiDung: noiDung,
        sao: Number(sao.value),
        ngay: new Date().toLocaleDateString("vi-VN")
    });

    localStorage.setItem(layKeyDanhGia(), JSON.stringify(danhSach));

    // XÓA NỘI DUNG FORM
    document.getElementById("reviewName").value = "";
    document.getElementById("reviewContent").value = "";
    document.querySelectorAll('input[name="rating"]').forEach(item => {
        item.checked = false;
    });

    thongBao.innerText = "Đăng bình luận thành công!";

    hienThiBinhLuan();
}

// HIỂN THỊ BÌNH LUẬN
function hienThiBinhLuan() {
    const danhSach = layDanhSachDanhGia();
    const reviewList = document.getElementById("reviewList");

    if (!reviewList) return;

    reviewList.innerHTML = "";

    let tongSao = 0;

    danhSach.forEach(item => {
        tongSao += item.sao;

        const review = document.createElement("div");
        review.className = "review-item";

        const user = document.createElement("div");
        user.className = "review-user";

        const name = document.createElement("strong");
        name.textContent = item.ten;

        const stars = document.createElement("span");
        stars.className = "review-stars";
        stars.textContent = "★".repeat(item.sao) + "☆".repeat(5 - item.sao);

        user.append(name, stars);

        const content = document.createElement("p");
        content.textContent = item.noiDung;

        const date = document.createElement("span");
        date.className = "review-date";
        date.textContent = item.ngay;

        review.append(user, content, date);
        reviewList.appendChild(review);
    });

    // TÍNH ĐIỂM TRUNG BÌNH
    const trungBinh = danhSach.length
        ? tongSao / danhSach.length
        : 0;

    document.getElementById("averageRating").innerText =
        trungBinh.toFixed(1);

    const soSao = Math.round(trungBinh);

    document.getElementById("averageStars").innerText =
        "★".repeat(soSao) + "☆".repeat(5 - soSao);

    document.getElementById("ratingCount").innerText =
        danhSach.length + " đánh giá";

    if (danhSach.length === 0) {
        reviewList.innerText = "Chưa có đánh giá nào. Hãy là người đầu tiên đánh giá sản phẩm!";
    }
}

// KHỞI TẠO
document.addEventListener("DOMContentLoaded", function () {
    hienThiBinhLuan();
});
