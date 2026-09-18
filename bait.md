<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>The Muse | Đăng ký tài khoản</title>
    <style>
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
            font-family: Arial, Helvetica, sans-serif;
        }

        body {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(135deg, #fff5f3 0%, #ffe9e2 35%, #fff9f4 100%);
            padding: 20px;
        }

        .signup-wrapper {
            width: 100%;
            max-width: 980px;
            background: rgba(255, 255, 255, 0.96);
            border-radius: 24px;
            box-shadow: 0 20px 50px rgba(116, 71, 58, 0.12);
            display: grid;
            grid-template-columns: 1fr 1.1fr;
            overflow: hidden;
        }

        .promo-panel {
            background: linear-gradient(160deg, #7a3f38 0%, #b8664d 38%, #e7a184 100%);
            color: white;
            padding: 50px 40px;
            display: flex;
            flex-direction: column;
            justify-content: center;
        }

        .promo-panel .brand {
            font-size: 2rem;
            font-weight: 700;
            letter-spacing: 1px;
            margin-bottom: 20px;
            font-family: Georgia, serif;
        }

        .promo-panel h1 {
            font-size: clamp(2rem, 3vw, 3rem);
            line-height: 1.2;
            margin-bottom: 18px;
            font-family: Georgia, serif;
        }

        .promo-panel p {
            line-height: 1.7;
            opacity: 0.95;
            margin-bottom: 26px;
            max-width: 420px;
        }

        .promo-features {
            list-style: none;
            display: grid;
            gap: 12px;
        }

        .promo-features li {
            display: flex;
            align-items: center;
            gap: 10px;
            font-size: 1rem;
        }

        .promo-features li::before {
            content: "✓";
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 22px;
            height: 22px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.2);
            font-weight: 700;
        }

        .form-panel {
            padding: 50px 40px;
        }

        .form-header {
            margin-bottom: 28px;
        }

        .tag {
            display: inline-block;
            background: #fbe8df;
            color: #8a4d42;
            font-size: 0.8rem;
            font-weight: 700;
            padding: 8px 14px;
            border-radius: 999px;
            margin-bottom: 16px;
        }

        .form-header h2 {
            font-size: 2rem;
            color: #2d1a18;
            margin-bottom: 8px;
            font-family: Georgia, serif;
        }

        .form-header p {
            color: #6b4a45;
            font-size: 0.98rem;
        }

        form {
            display: grid;
            gap: 18px;
        }

        .row {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 16px;
        }

        .field {
            display: flex;
            flex-direction: column;
            gap: 8px;
        }

        label {
            color: #4a2b28;
            font-size: 0.95rem;
            font-weight: 600;
        }

        input {
            height: 52px;
            border: 1px solid #efd9d2;
            border-radius: 12px;
            padding: 0 16px;
            font-size: 1rem;
            outline: none;
            transition: border-color 0.2s, box-shadow 0.2s;
            background: #fff;
        }

        input:focus {
            border-color: #c66d52;
            box-shadow: 0 0 0 4px rgba(198, 109, 82, 0.12);
        }

        .password-box {
            position: relative;
        }

        .password-box input {
            width: 100%;
            padding-right: 44px;
        }

        .toggle-password {
            position: absolute;
            right: 12px;
            top: 50%;
            transform: translateY(-50%);
            background: transparent;
            border: none;
            color: #7a4e46;
            cursor: pointer;
            font-size: 1rem;
        }

        .checkbox-row {
            display: flex;
            align-items: center;
            gap: 10px;
            color: #5a3d39;
            font-size: 0.95rem;
        }

        .checkbox-row input {
            width: 18px;
            height: 18px;
            accent-color: #b8664d;
        }

        .checkbox-row a {
            color: #a45442;
            text-decoration: none;
            font-weight: 600;
        }

        .submit-btn {
            border: none;
            border-radius: 12px;
            background: linear-gradient(135deg, #a95d47, #d27a5d);
            color: white;
            font-weight: 700;
            font-size: 1rem;
            height: 54px;
            cursor: pointer;
            transition: transform 0.2s ease, box-shadow 0.2s ease;
            box-shadow: 0 10px 24px rgba(169, 93, 71, 0.25);
        }

        .submit-btn:hover {
            transform: translateY(-1px);
        }

        .login-link {
            text-align: center;
            color: #5a3d39;
            font-size: 0.97rem;
        }

        .login-link a {
            color: #9c5646;
            text-decoration: none;
            font-weight: 700;
        }

        @media (max-width: 760px) {
            .signup-wrapper {
                grid-template-columns: 1fr;
            }

            .promo-panel,
            .form-panel {
                padding: 30px 24px;
            }

            .row {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>
<body>
    
    <div class="signup-wrapper">
        
        <div class="promo-panel">
             <img src="https://cdn.phototourl.com/free/2026-09-18-fe60a549-445a-4684-895f-cc6acdfe393a.png"
    alt="ảnh" width="300" height="200" title="ảnh">
           
            <h1>Tạo tài khoản và khám phá hành trình vị giác</h1>
            <p>
                Khám phá những chiếc bánh ngọt handmade thơm ngon, được làm từ nguyên liệu tự nhiên và tinh tế như một món quà cho mọi khoảnh khắc đặc biệt.
            </p>
           
            <ul class="promo-features">
                <li>Bánh ngọt handmade mỗi ngày</li>
                <li>Giao hàng nhanh và tiện lợi</li>
                <li>Ưu đãi thành viên hấp dẫn</li>
            </ul>
        </div>

        <div class="form-panel">
            <div class="form-header">
                <span class="tag">Đăng ký</span>
                <h2>Chào mừng bạn</h2>
                <p>Vui lòng điền thông tin để tạo tài khoản The Muse</p>
            </div>

            <form id="signupForm">
                <div class="row">
                    <div class="field">
                        <label for="firstName">Họ</label>
                        <input id="firstName" type="text" placeholder="Nhập họ" required>
                    </div>
                    <div class="field">
                        <label for="lastName">Tên</label>
                        <input id="lastName" type="text" placeholder="Nhập tên" required>
                    </div>
                </div>

                <div class="field">
                    <label for="email">Email</label>
                    <input id="email" type="email" placeholder="example@gmail.com" required>
                </div>

                <div class="field">
                    <label for="phone">Số điện thoại</label>
                    <input id="phone" type="tel" placeholder="0987654321" required>
                </div>

                <div class="field">
                    <label for="password">Mật khẩu</label>
                    <div class="password-box">
                        <input id="password" type="password" placeholder="Nhập mật khẩu" required>
                        <button type="button" class="toggle-password" aria-label="Hiện mật khẩu">Hiện</button>
                    </div>
                </div>

                <div class="field">
                    <label for="confirmPassword">Xác nhận mật khẩu</label>
                    <div class="password-box">
                        <input id="confirmPassword" type="password" placeholder="Nhập lại mật khẩu" required>
                        <button type="button" class="toggle-password" aria-label="Hiện mật khẩu">Hiện</button>
                    </div>
                </div>

                <label class="checkbox-row">
                    <input type="checkbox" required>
                    <span>Tôi đồng ý với <a href="#">Điều khoản</a> và <a href="#">Chính sách bảo mật</a></span>
                </label>

                <button class="submit-btn" type="submit">Đăng ký</button>

                <div class="login-link">
                    Đã có tài khoản? <a href="dangnhap.html">Đăng nhập</a>
                </div>
            </form>
        </div>
    </div>

    <script>
        const form = document.getElementById('signupForm');
        const toggleButtons = document.querySelectorAll('.toggle-password');

        toggleButtons.forEach((button) => {
            button.addEventListener('click', () => {
                const passwordInput = button.parentElement.querySelector('input');
                const isPassword = passwordInput.type === 'password';
                passwordInput.type = isPassword ? 'text' : 'password';
                button.textContent = isPassword ? 'Ẩn' : 'Hiện';
            });
        });

        form.addEventListener('submit', function (event) {
            event.preventDefault();

            const firstName = document.getElementById('firstName').value.trim();
            const lastName = document.getElementById('lastName').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;

            if (!firstName || !lastName || !email || !phone || !password || !confirmPassword) {
                alert('Vui lòng điền đầy đủ thông tin.');
                return;
            }

            if (password.length < 6) {
                alert('Mật khẩu phải có ít nhất 6 ký tự.');
                return;
            }

            if (password !== confirmPassword) {
                alert('Mật khẩu xác nhận không khớp.');
                return;
            }

            alert('Đăng ký tài khoản thành công!');
            form.reset();
        });
    </script>
</body>
</html>
