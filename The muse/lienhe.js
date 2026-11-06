// lienhe.js — xử lý form liên hệ (không phụ thuộc file JS khác)
(function () {
  const LOGIN_KEY = 'museUser';                // key trang đăng nhập lưu vào localStorage
  const LOGIN_URL = 'dangnhap%26dangky.html';  // trang đăng nhập

  const form = document.getElementById('contactForm');
  const msg  = document.getElementById('formMsg');

  // Nếu HTML thiếu id thì báo rõ trong Console thay vì im lặng
  if (!form || !msg) {
    console.error('lienhe.js: không tìm thấy #contactForm hoặc #formMsg trong lienhe.html');
    return;
  }

  function isLoggedIn() {
    try {
      return !!localStorage.getItem(LOGIN_KEY);
    } catch (e) {
      return false;
    }
  }

  function showMsg(html, type) {
    msg.innerHTML = html;
    msg.className = 'form-msg ' + type;   // 'ok' = xanh, 'bad' = đỏ
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();   // chặn trang tải lại

    // Chưa đăng nhập: báo cần đăng nhập, không gửi
    if (!isLoggedIn()) {
      showMsg(
        'Bạn cần <a href="' + LOGIN_URL + '?next=lienhe.html#dang-nhap">đăng nhập tài khoản</a> để gửi liên hệ.',
        'bad'
      );
      return;
    }

    // Đã đăng nhập: báo gửi thành công (chưa có server nên chỉ mô phỏng) rồi xóa trắng form
    showMsg('Gửi tin nhắn thành công! Chúng mình sẽ phản hồi sớm nhất.', 'ok');
    form.reset();
  });
})();