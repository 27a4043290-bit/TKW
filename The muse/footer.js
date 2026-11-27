document.addEventListener("DOMContentLoaded", function () {
    // Tránh tạo footer nhiều lần
    if (document.getElementById("footer-container") || document.querySelector(".chantrang")) return;

    const footerContainer = document.createElement("div");
    footerContainer.id = "footer-container";

    footerContainer.innerHTML = `
        <footer class="chantrang">

            <!-- THANH DANH MỤC BÁNH -->
            <nav class="danh-muc-banh" aria-label="Danh mục bánh">
                <div class="danh-muc-inner">
                    <a href="sanppham.html#mousse">
                        <span class="dm-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M4 13h16v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-6z"/>
                                <path d="M4 13c0-3 3.5-5 8-5s8 2 8 5"/>
                                <path d="M12 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/>
                            </svg>
                        </span>
                        <span>BÁNH MOUSSE</span>
                    </a>

                    <a href="sanppham.html#croissant">
                        <span class="dm-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M4.6 13.11C5.79 9.21 9.21 5.79 13.11 4.6c1.73-.53 3.58.31 4.24 1.99l1.06 2.66c.42 1.05.13 2.25-.72 2.99l-5.45 4.74c-.74.64-1.82.75-2.67.26l-2.97-1.71c-1.48-.85-2.32-2.55-2-4.42z"/>
                                <path d="M10.5 6.5 14 14"/>
                                <path d="M7.5 10.5 12 16"/>
                            </svg>
                        </span>
                        <span>BÁNH CROISSANT</span>
                    </a>

                    <a href="sanppham.html#trungthu">
                        <span class="dm-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                                <circle cx="12" cy="12" r="8"/>
                                <circle cx="12" cy="12" r="4"/>
                                <path d="M12 2v2M12 20v2M2 12h2M20 12h2"/>
                            </svg>
                        </span>
                        <span>BÁNH TRUNG THU</span>
                    </a>

                    <a href="sanppham.html#donut">
                        <span class="dm-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                                <circle cx="12" cy="12" r="9"/>
                                <circle cx="12" cy="12" r="3"/>
                                <path d="M4 11c2 1 3-1 5 0s3-1 5 0 3-1 6 0"/>
                            </svg>
                        </span>
                        <span>BÁNH DONUT</span>
                    </a>
                </div>
            </nav>

            <!-- NỘI DUNG FOOTER -->
            <div class="chantrang-noidung">

                <!-- CỘT 1: GIỚI THIỆU -->
                <div class="thuong-hieu cot-footer">
                    <h2>GIỚI THIỆU</h2>
                    <div class="footer-duong-ke"></div>

                    <span class="footer-brand-tag">The Muse Patisserie</span>
                    <p class="gioithieu">
                        The Muse mang đến những chiếc bánh ngọt tinh tế,
                        được làm thủ công với tất cả tình yêu và sự trân trọng
                        dành cho những khoảnh khắc ngọt ngào của bạn.
                    </p>

                    <a href="gioithieu.html" class="footer-xem-them">
                        Khám phá câu chuyện The Muse <span>→</span>
                    </a>
                </div>

                <!-- CỘT 2: LIÊN KẾT -->
                <div class="lien-ket-nhanh cot-footer">
                    <h2>LIÊN KẾT</h2>
                    <div class="footer-duong-ke"></div>

                    <ul class="danhsach">
                        <li><a href="gioithieu.html">Giới thiệu</a></li>
                        <li><a href="sanppham.html">Sản phẩm</a></li>
                        <li><a href="chinhsach.html">Chính sách bảo mật &amp; Điều khoản</a></li>
                        <li><a href="chinhsach.html">Chính sách mua hàng</a></li>
                        <li><a href="chinhsach.html">Chính sách vận chuyển &amp; giao nhận</a></li>
                        <li><a href="chinhsach.html">Chính sách đổi trả &amp; khiếu nại</a></li>
                        <li><a href="tk-theo-yc.html">Thiết kế bánh theo yêu cầu</a></li>
                    </ul>
                </div>

                <!-- CỘT 3: THÔNG TIN LIÊN HỆ -->
                <div class="lienhe cot-footer" id="lienhe">
                    <h2>LIÊN HỆ VỚI CHÚNG TÔI</h2>
                    <div class="footer-duong-ke"></div>

                    <div class="thong-tin-lienhe">
                        <p>
                            <span class="icon-lienhe">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M12 21s-6-5.33-6-10a6 6 0 1 1 12 0c0 4.67-6 10-6 10z"/>
                                    <circle cx="12" cy="11" r="2.2"/>
                                </svg>
                            </span>
                            <a href="lienhe.html">12 Chùa Bộc, P. Kim Liên, Đống Đa, Hà Nội</a>
                        </p>

                        <p>
                            <span class="icon-lienhe">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.58 2.81.7A2 2 0 0 1 22 16.92z"/>
                                </svg>
                            </span>
                            <a href="tel:0826590133">0826590133</a>
                        </p>

                        <p>
                            <span class="icon-lienhe">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <rect x="3" y="5" width="18" height="14" rx="2"/>
                                    <path d="m3 7 9 6 9-6"/>
                                </svg>
                            </span>
                            <a href="mailto:themusetkw@gmail.com">themusetkw@gmail.com</a>
                        </p>

                        <p>
                            <span class="icon-lienhe">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <circle cx="12" cy="12" r="9"/>
                                    <path d="M12 7v5l3 2"/>
                                </svg>
                            </span>
                            <span>Giờ mở cửa: 08:00 – 21:00 (Hằng ngày)</span>
                        </p>
                    </div>
                </div>

            </div>

            <!-- THANH BẢN QUYỀN -->
            <div class="ban-quyen">
                <p>Copyright © 2026 <strong>The Muse Patisserie</strong>. Ngọt ngào hơn mỗi ngày ♡</p>
            </div>

        </footer>
    `;

    document.body.appendChild(footerContainer);
});document.addEventListener("DOMContentLoaded", function () {
    if (document.getElementById("footer-container") || document.querySelector(".chantrang")) return;

    const footerContainer = document.createElement("div");
    footerContainer.id = "footer-container";

    footerContainer.innerHTML = `
        <footer class="chantrang">
            <nav class="danh-muc-banh" aria-label="Danh mục bánh">
                <div class="danh-muc-inner">
                    <a href="sanppham.html#mousse">
                        <span class="dm-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M4 13h16v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-6z"/>
                                <path d="M4 13c0-3 3.5-5 8-5s8 2 8 5"/>
                                <path d="M12 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/>
                            </svg>
                        </span>
                        <span>BÁNH MOUSSE</span>
                    </a>

                    <a href="sanppham.html#croissant">
                        <span class="dm-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M4.6 13.11C5.79 9.21 9.21 5.79 13.11 4.6c1.73-.53 3.58.31 4.24 1.99l1.06 2.66c.42 1.05.13 2.25-.72 2.99l-5.45 4.74c-.74.64-1.82.75-2.67.26l-2.97-1.71c-1.48-.85-2.32-2.55-2-4.42z"/>
                                <path d="M10.5 6.5 14 14"/>
                                <path d="M7.5 10.5 12 16"/>
                            </svg>
                        </span>
                        <span>BÁNH CROISSANT</span>
                    </a>

                    <a href="sanppham.html#trungthu">
                        <span class="dm-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                                <circle cx="12" cy="12" r="8"/>
                                <circle cx="12" cy="12" r="4"/>
                                <path d="M12 2v2M12 20v2M2 12h2M20 12h2"/>
                            </svg>
                        </span>
                        <span>BÁNH TRUNG THU</span>
                    </a>

                    <a href="sanppham.html#donut">
                        <span class="dm-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                                <circle cx="12" cy="12" r="9"/>
                                <circle cx="12" cy="12" r="3"/>
                                <path d="M4 11c2 1 3-1 5 0s3-1 5 0 3-1 6 0"/>
                            </svg>
                        </span>
                        <span>BÁNH DONUT</span>
                    </a>
                </div>
            </nav>

            <div class="chantrang-noidung">
                <div class="thuong-hieu cot-footer">
                    <h2>GIỚI THIỆU</h2>
                    <div class="footer-duong-ke"></div>

                    <span class="footer-brand-tag">The Muse Patisserie</span>
                    <p class="gioithieu">
                        The Muse mang đến những chiếc bánh ngọt tinh tế,
                        được làm thủ công với tất cả tình yêu và sự trân trọng
                        dành cho những khoảnh khắc ngọt ngào của bạn.
                    </p>

                    <a href="gioithieu.html" class="footer-xem-them">
                        Khám phá câu chuyện The Muse <span>→</span>
                    </a>
                </div>

                <div class="lien-ket-nhanh cot-footer">
                    <h2>LIÊN KẾT</h2>
                    <div class="footer-duong-ke"></div>

                    <ul class="danhsach">
                        <li><a href="gioithieu.html">Giới thiệu</a></li>
                        <li><a href="sanppham.html">Sản phẩm</a></li>
                        <li><a href="chinhsach.html">Chính sách bảo mật &amp; Điều khoản</a></li>
                        <li><a href="chinhsach.html">Chính sách mua hàng</a></li>
                        <li><a href="chinhsach.html">Chính sách vận chuyển &amp; giao nhận</a></li>
                        <li><a href="chinhsach.html">Chính sách đổi trả &amp; khiếu nại</a></li>
                        <li><a href="tk-theo-yc.html">Thiết kế bánh theo yêu cầu</a></li>
                    </ul>
                </div>

                <div class="lienhe cot-footer" id="lienhe">
                    <h2>LIÊN HỆ VỚI CHÚNG TÔI</h2>
                    <div class="footer-duong-ke"></div>

                    <div class="thong-tin-lienhe">
                        <p>
                            <span class="icon-lienhe">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M12 21s-6-5.33-6-10a6 6 0 1 1 12 0c0 4.67-6 10-6 10z"/>
                                    <circle cx="12" cy="11" r="2.2"/>
                                </svg>
                            </span>
                            <a href="lienhe.html">12 Chùa Bộc, P. Kim Liên, Đống Đa, Hà Nội</a>
                        </p>

                        <p>
                            <span class="icon-lienhe">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.58 2.81.7A2 2 0 0 1 22 16.92z"/>
                                </svg>
                            </span>
                            <a href="tel:0826590133">0826590133</a>
                        </p>

                        <p>
                            <span class="icon-lienhe">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <rect x="3" y="5" width="18" height="14" rx="2"/>
                                    <path d="m3 7 9 6 9-6"/>
                                </svg>
                            </span>
                            <a href="mailto:themusetkw@gmail.com">themusetkw@gmail.com</a>
                        </p>

                        <p>
                            <span class="icon-lienhe">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <circle cx="12" cy="12" r="9"/>
                                    <path d="M12 7v5l3 2"/>
                                </svg>
                            </span>
                            <span>Giờ mở cửa: 08:00 – 21:00 (Hằng ngày)</span>
                        </p>
                    </div>
                </div>
            </div>

            <div class="ban-quyen">
                <p>Copyright © 2026 <strong>The Muse Patisserie</strong>. Ngọt ngào hơn mỗi ngày ♡</p>
            </div>
        </footer>
    `;

    document.body.appendChild(footerContainer);
});