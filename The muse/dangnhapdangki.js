function hienDangNhap() {
    document.getElementById("register").classList.add("hidden");
    document.getElementById("login").classList.remove("hidden");
}

function hienDangKy() {
    document.getElementById("login").classList.add("hidden");
    document.getElementById("register").classList.remove("hidden");
}

function dangKy() {
    var ten = document.getElementById("ten").value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("phone").value;
    var pass = document.getElementById("pass").value;
    var repass = document.getElementById("repass").value;

    if (!ten || !email || !phone || !pass || !repass) {
        alert("Vui lòng nhập đầy đủ thông tin!");
        return;
    }

    if (pass != repass) {
        alert("Mật khẩu không giống nhau!");
        return;
    }

    localStorage.setItem("ten", ten);
    localStorage.setItem("email", email);
    localStorage.setItem("phone", phone);
    localStorage.setItem("pass", pass);

    alert("Đăng ký thành công!");

    hienDangNhap();
    document.getElementById("loginEmail").value = email;
}

function dangNhap() {
    var email = document.getElementById("loginEmail").value;
    var pass = document.getElementById("loginPass").value;

    if (
        email == localStorage.getItem("email") &&
        pass == localStorage.getItem("pass")
    ) {
        alert("Đăng nhập thành công! Xin chào " + localStorage.getItem("ten"));
    } else {
        alert("Email hoặc mật khẩu không đúng!");
    }
}

function theoLienKet() {
    if (location.hash === "#dang-nhap") hienDangNhap();
    else hienDangKy();
}

// Khởi chạy khi trang đã nạp xong DOM
document.addEventListener("DOMContentLoaded", function() {
    theoLienKet();
});
window.addEventListener("hashchange", theoLienKet);