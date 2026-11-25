
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

    hienDangNhap();

    document.getElementById("loginEmail").value = email;
    document.getElementById("loginPass").value = "";

    document.getElementById("login-error").style.display = "none";

    var success = document.getElementById("login-success");
    success.textContent = "Đăng ký thành công!";
    success.style.display = "block";
}

function dangNhap() {
    var email = document.getElementById("loginEmail").value;
    var pass = document.getElementById("loginPass").value;

    var error = document.getElementById("login-error");
    var success = document.getElementById("login-success");

    if (
        email == localStorage.getItem("email") &&
        pass == localStorage.getItem("pass")
    ) {
        error.style.display = "none";

        success.textContent = "Đăng nhập thành công!";
        success.style.display = "block";

    } else {
        success.style.display = "none";

        error.textContent = "Tên đăng nhập hoặc mật khẩu không đúng.";
        error.style.display = "block";
    }
}

function theoLienKet() {
    if (location.hash === "#dang-nhap") {
        hienDangNhap();
    } else {
        hienDangKy();
    }
}

// Khởi chạy khi trang đã nạp xong DOM
document.addEventListener("DOMContentLoaded", function() {
    theoLienKet();
});

window.addEventListener("hashchange", theoLienKet);


function hienDangNhap() {
    document.getElementById("register").classList.add("hidden");
    document.getElementById("login").classList.remove("hidden");

    document.getElementById("breadcrumb-current").textContent = "Đăng nhập";
}

function hienDangKy() {
    document.getElementById("login").classList.add("hidden");
    document.getElementById("register").classList.remove("hidden");

    document.getElementById("breadcrumb-current").textContent = "Đăng ký";
}