/* 
  Cách nhúng footer vào các trang HTML:
  
  <div id="site-footer"></div>
  <script src="footer.js"></script>
*/
document.getElementById("site-footer").innerHTML = `
<style>
/* ===== FOOTER THE MUSE - CÓ HIỆU ỨNG CHUYỂN ĐỘNG KHI CUỘN ===== */
.site-footer {
    background: var(--bg, #fdfbf7);
    color: var(--ink, #1a1a1a);
    padding: 60px 0 25px;
    font-family: var(--font, 'Roboto', sans-serif);
    margin-top: 60px;
    border-top: 1px solid var(--line, #e2dacd);
    
    /* Trạng thái ban đầu trước khi cuộn tới: Ẩn & đẩy xuống 40px */
    opacity: 0;
    transform: translateY(40px);
    transition: opacity 0.8s cubic-bezier(0.165, 0.84, 0.44, 1), 
                transform 0.8s cubic-bezier(0.165, 0.84, 0.44, 1);
}

/* Class active được thêm vào bằng JS khi cuộn tới footer */
.site-footer.reveal-active {
    opacity: 1;
    transform: translateY(0);
}

.footer-container {
    max-width: 1400px;
    margin: 0 auto;
    display: grid;
    /* Chia 4 cột cân đối: Ảnh/Thương hiệu | Bộ sưu tập (Giữa) | Liên hệ (Giữa) | Bản tin */
    grid-template-columns: 320px 200px 1fr 300px;
    gap: 40px;
    padding: 0 40px 40px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.08);
    align-items: start;
}

/* Cột 1: Khung ảnh to nổi bật + Giới thiệu */
.footer-col-brand {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.footer-brand-img-large {
    width: 100%;
    height: 200px;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 8px 25px rgba(0,0,0,0.08);
    border: 1px solid var(--line, #e2dacd);
}

.footer-brand-img-large img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.6s ease;
}

.footer-brand-img-large:hover img {
    transform: scale(1.05); /* Phóng to nhẹ ảnh khi rê chuột */
}

.footer-brand-info h3 {
    font-size: 22px;
    font-weight: 700;
    letter-spacing: 0.05em;
    margin-bottom: 6px;
}

.footer-brand-info p {
    font-size: 13px;
    line-height: 1.6;
    color: #555;
}

/* Tiêu đề cột chung */
.footer-col h4 {
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    margin-bottom: 20px;
    color: var(--ink);
}

/* Cột 2 (Ở GIỮA): Danh mục Bộ sưu tập / Sản phẩm */
.footer-col-products ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.footer-col-products li a {
    font-size: 14px;
    color: #555;
    text-decoration: none;
    transition: color 0.2s, padding-left 0.2s;
    display: inline-block;
}

.footer-col-products li a:hover {
    color: var(--accent, #b9926a);
    text-decoration: underline;
    padding-left: 5px;
}

/* Cột 3: Thông tin cửa hàng & Liên hệ */
.footer-col-contact ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.footer-col-contact li {
    font-size: 14px;
    color: #555;
    line-height: 1.5;
    display: flex;
    align-items: flex-start;
    gap: 10px;
    transition: transform 0.2s;
}

.footer-col-contact li:hover {
    transform: translateX(3px); /* Nhúc nhích nhẹ sang phải khi hover */
}

.footer-col-contact a {
    color: #555;
    text-decoration: none;
    transition: color 0.2s;
}

.footer-col-contact a:hover {
    color: var(--accent, #b9926a);
    text-decoration: underline;
}

/* Cột 4: Bản tin đăng ký */
.newsletter-desc {
    font-size: 13px;
    color: #666;
    line-height: 1.5;
    margin-bottom: 14px;
}

.newsletter-form {
    display: flex;
    gap: 8px;
}

.newsletter-input {
    flex: 1;
    padding: 11px 14px;
    border: 1px solid var(--line, #ccc);
    background: transparent;
    font-family: inherit;
    font-size: 13px;
    outline: none;
    color: var(--ink);
    transition: border-color 0.2s;
}

.newsletter-input:focus {
    border-color: var(--accent, #b9926a);
}

.newsletter-btn {
    padding: 11px 18px;
    background: var(--ink, #1a1a1a);
    color: #fff;
    border: none;
    font-weight: 600;
    font-size: 12px;
    letter-spacing: 0.05em;
    cursor: pointer;
    text-transform: uppercase;
    white-space: nowrap;
    transition: all 0.2s;
}

.newsletter-btn:hover {
    background: var(--accent, #b9926a);
}

.privacy-note {
    font-size: 11px;
    color: #888;
    margin-top: 8px;
    text-transform: uppercase;
    letter-spacing: 0.03em;
}

/* Thanh bản quyền dưới cùng */
.footer-bottom {
    max-width: 1400px;
    margin: 25px auto 0;
    padding: 0 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 13px;
    color: #777;
}

.footer-bottom-links {
    display: flex;
    gap: 20px;
}

.footer-bottom-links a {
    color: #777;
    text-decoration: none;
    transition: color 0.2s;
}

.footer-bottom-links a:hover {
    color: var(--ink);
}

/* Responsive cho điện thoại / máy tính bảng */
@media(max-width: 1050px) {
    .footer-container {
        grid-template-columns: repeat(2, 1fr);
        gap: 35px;
        padding: 0 20px 30px;
    }
}

@media(max-width: 600px) {
    .footer-container {
        grid-template-columns: 1fr;
    }
    .footer-bottom {
        flex-direction: column;
        gap: 15px;
        text-align: center;
    }
    .footer-bottom-links {
        justify-content: center;
        flex-wrap: wrap;
        gap: 15px;
    }
}
</style>

<footer class="site-footer" id="main-footer">
    <div class="footer-container">
        <!-- Cột 1: Ảnh thương hiệu + Giới thiệu -->
        <div class="footer-col-brand">
            <div class="footer-brand-img-large">
                <img src="https://the350f.com/wp-content/uploads/2025/05/ChiTietTiramisu-1.jpg" alt="The Muse Patisserie">
            </div>
            <div class="footer-brand-info">
                <h3>THE MUSE</h3>
                <p>Tiệm bánh ngọt thủ công mang hương vị tinh tế, kết hợp nghệ thuật hiện đại cho mọi khoảnh khắc của bạn.</p>
            </div>
        </div>

        <!-- Cột 2 (Ở GIỮA TRANG): Bộ sưu tập / Sản phẩm -->
        <div class="footer-col footer-col-products">
            <h4>Bộ sưu tập</h4>
            <ul>
                <li><a href="sanpham.html#mousse">Bánh Mousse</a></li>
                <li><a href="sanpham.html#croissant">Bánh Croissant</a></li>
                <li><a href="sanpham.html#trungthu">Bánh Trung thu</a></li>
                <li><a href="sanpham.html#donut">Bánh Donut</a></li>
                <li><a href="sanpham.html">Tất cả sản phẩm</a></li>
            </ul>
        </div>

        <!-- Cột 3 (Ở GIỮA TRANG): Cửa hàng & Liên hệ -->
        <div class="footer-col footer-col-contact">
            <h4>Cửa hàng & Liên hệ</h4>
            <ul>
                <li><span>📍</span> 12 Chùa Bộc, P. Kim Liên, Đống Đa, Hà Nội</li>
                <li><span>📞</span> <a href="tel:0826590133">0826590133</a></li>
                <li><span>✉️</span> <a href="mailto:contact@themuse.com">contact@themuse.com</a></li>
                <li><span>🕒</span> Mở cửa: 8:00 - 22:00 (T2 - CN)</li>
            </ul>
        </div>

        <!-- Cột 4: Bản tin nhận ưu đãi (Chuyển sang trang dangnhap&dangki.html khi ấn Đăng ký) -->
        <div class="footer-col">
            <h4>Bản tin The Muse</h4>
            <p class="newsletter-desc">Nhận thông tin về các hương vị bánh mới ra mắt và ưu đãi đặc quyền riêng cho thành viên.</p>
            <form class="newsletter-form" onsubmit="event.preventDefault(); window.location.href='dangnhap&dangki.html';">
                <input type="email" class="newsletter-input" placeholder="Email của bạn..." required>
                <button type="submit" class="newsletter-btn">Đăng ký</button>
            </form>
            <p class="privacy-note">Bảo mật thông tin tuyệt đối.</p>
        </div>
    </div>

    <!-- Thanh bản quyền dưới cùng -->
    <div class="footer-bottom">
        <p>&copy; 2026 The Muse. All rights reserved.</p>
        <div class="footer-bottom-links">
            <a href="#">Chính sách bảo mật</a>
            <a href="#">Điều khoản dịch vụ</a>
        </div>
    </div>
</footer>
`;

/* ===== SỰ KIỆN LẮP LẮP IntersectionObserver ĐỂ TẠO HIỆU ỨNG CUỘN ===== */
(function() {
    const footerElem = document.getElementById("main-footer");
    if (footerElem) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    footerElem.classList.add("reveal-active");
                }
            });
        }, {
            threshold: 0.15 // Khi cuộn thấy khoảng 15% footer thì kích hoạt hiệu ứng hiện ra
        });
        
        observer.observe(footerElem);
    }
})();