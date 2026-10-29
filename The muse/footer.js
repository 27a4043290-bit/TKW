
document.addEventListener("DOMContentLoaded", function () {
    // Tránh tạo footer nhiều lần
    if (document.querySelector(".chantrang")) return;

    const footerContainer = document.createElement("div");
    footerContainer.id = "footer-container";

    footerContainer.innerHTML = `
        <footer class="chantrang">

            <!-- THANH DANH MỤC BÁNH -->
            <nav class="danh-muc-banh" aria-label="Danh mục bánh">
                <a href="file:///d%3A/TKW-The%20Muse/The%20muse/sanppham.html#mousse">
                    <span class="dm-icon">♕</span>
                    <span>BÁNH MOUSSE</span>
                </a>

                <a href="file:///d%3A/TKW-The%20Muse/The%20muse/sanppham.html#croissant">
                    <span class="dm-icon">♧</span>
                    <span>BÁNH CROISSANT</span>
                </a>

                <a href="file:///d%3A/TKW-The%20Muse/The%20muse/sanppham.html#trungthu">
                    <span class="dm-icon">♨</span>
                    <span>BÁNH TRUNG THU</span>
                </a>

                <a href="file:///d%3A/TKW-The%20Muse/The%20muse/sanppham.html#donut">
                    <span class="dm-icon">♙</span>
                    <span>BÁNH DONUT</span>
                </a>
            </nav>

            <!-- NỘI DUNG FOOTER -->
            <div class="chantrang-noidung">

                <!-- CỘT 1: GIỚI THIỆU -->
                <div class="thuong-hieu cot-footer">
                    <h2>GIỚI THIỆU</h2>
                    <div class="footer-duong-ke"></div>

                    <p class="gioithieu">
                        The Muse mang đến những chiếc bánh ngọt tinh tế,
                        được làm thủ công với tất cả tình yêu và sự trân trọng
                        dành cho những khoảnh khắc ngọt ngào của bạn.
                    </p>

                    <a href="gioithieu.html" class="footer-xem-them">
                        Khám phá câu chuyện The Muse →
                    </a>
                </div>

                <!-- CỘT 2: LIÊN KẾT -->
                <div class="lien-ket-nhanh cot-footer">
                    <h2>LIÊN KẾT</h2>
                    <div class="footer-duong-ke"></div>

                    <ul class="danhsach">
                        <li>
                            <a href="gioithieu.html">Giới thiệu</a>
                        </li>
                        <li>
                            <a href="sanpham.html">Sản phẩm</a>
                        </li>
                        <li>
                            <a href="chinhsach.html">
                                Chính sách bảo mật & Điều khoản sử dụng
                            </a>
                        </li>
                        <li>
                            <a href="chinhsach.html">Chính sách mua hàng</a>
                        </li>
                        <li>
                            <a href="chinhsach.html">
                                Chính sách vận chuyển và giao nhận
                            </a>
                        </li>
                        <li>
                            <a href="chinhsach.html">
                                Chính sách đổi trả và khiếu nại
                            </a>
                        </li>
                        <li>
                            <a href="tk-theo-yc.html">
                                Thiết kế bánh theo yêu cầu
                            </a>
                        </li>
                    </ul>
                </div>

                <!-- CỘT 3: THÔNG TIN CÔNG TY -->
                <div class="lienhe cot-footer" id="lienhe">
                    <h2>THE MUSE</h2>
                    <div class="footer-duong-ke full"></div>
                    <div class="thong-tin-lienhe">
                        <p>
                            <span class="icon-lienhe">●</span>
                                <a href="lienhe.html">12 Chùa Bộc, P. Kim Liên,
                                Đống Đa, Hà Nội</a>
                            </span>
                        </p>

                        <p>
                            <span class="icon-lienhe">☎</span>
                            <a href="tel:0826590133">0826590133</a>
                        </p>

                        <p>
                            <span class="icon-lienhe">✉</span>
                            <a href="mailto:themusetkw@gmail.com">
                                themusetkw@gmail.com
                            </a>
                        </p>
                    </div>

                    <h3 class="tieu-de-mang-xa-hoi">MẠNG XÃ HỘI</h3>
                    <div class="footer-duong-ke social-line"></div>

                    <div class="mang-xa-hoi">
                        <a href="#" aria-label="Facebook" title="Facebook">f</a>
                        <a href="#" aria-label="Instagram" title="Instagram">◎</a>
                        <a href="#" aria-label="TikTok" title="TikTok">♪</a>
                        <a href="#" aria-label="Zalo" title="Zalo">Z</a>
                    </div>
                </div>

            </div>

            <!-- THANH BẢN QUYỀN -->
            <div class="ban-quyen">
                <p>
                    Copyright © 2026
                    <strong>The Muse.</strong>
                </p>
            </div>

        </footer>
    `;

    document.body.appendChild(footerContainer);
});
