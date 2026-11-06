let soLuong = 1;

function doiSL(n) {
    soLuong += n;
    if (soLuong < 1) soLuong = 1;
    document.getElementById("sl").innerText = soLuong;
    doiGia();
}

function doiGia() {
    let gia = Number(document.getElementById("size").value);
    document.getElementById("price").innerText =
        (gia * soLuong).toLocaleString("vi-VN") + " VND";
}

function mua() {
    alert("Bạn đã chọn mua " + soLuong + " bánh Kem dâu!");
}

function muaNgay() {
    window.location.href = "../thanhtoan.html";
}