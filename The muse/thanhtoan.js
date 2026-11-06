// thanhtoan.js - Xử lý trang thanh toán

(function () {

    // 1. CẤU HÌNH
    const KEY = 'cart';
    const FEE_IN = 25000;
    const FEE_OUT = 35000;
    const QR_IMAGE = 'image/qr.png';

    const HOME_URL = 'trangchu.html';
    const PROFILE_URL = 'canhan.html';

    const INNER = [
        'Ba Đình', 'Hoàn Kiếm', 'Hai Bà Trưng', 'Đống Đa',
        'Tây Hồ', 'Cầu Giấy', 'Thanh Xuân', 'Hoàng Mai',
        'Long Biên', 'Nam Từ Liêm', 'Bắc Từ Liêm', 'Hà Đông'
    ];

    const OUTER = [
        'Sơn Tây', 'Ba Vì', 'Phúc Thọ', 'Đan Phượng',
        'Hoài Đức', 'Quốc Oai', 'Thạch Thất', 'Chương Mỹ',
        'Thanh Oai', 'Thường Tín', 'Phú Xuyên', 'Ứng Hòa',
        'Mỹ Đức', 'Mê Linh', 'Sóc Sơn', 'Đông Anh',
        'Gia Lâm', 'Thanh Trì'
    ];

    const $ = id => document.getElementById(id);

    const fmt = n => Number(n).toLocaleString('en-US') + 'VND';

    const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
    }[c]));

    const pad = n => String(n).padStart(2, '0');

    let orderCode = 'MUSE' + String(Date.now()).slice(-6);
    let rate = 0;

    // 2. HIỂN THỊ NGÀY
    const now = new Date();

    $('today').textContent =
        pad(now.getDate()) + '/' +
        pad(now.getMonth() + 1) + '/' +
        now.getFullYear();

    const todayISO =
        now.getFullYear() + '-' +
        pad(now.getMonth() + 1) + '-' +
        pad(now.getDate());

    $('date').min = todayISO;

    // 3. THÊM DANH SÁCH QUẬN / HUYỆN
    const district = $('district');

    function themNhom(tenNhom, danhSach) {
        const nhom = document.createElement('optgroup');
        nhom.label = tenNhom;

        danhSach.forEach(ten => {
            const option = document.createElement('option');
            option.value = ten;
            option.textContent = ten;
            nhom.appendChild(option);
        });

        district.appendChild(nhom);
    }

    themNhom('Nội thành (phí ship 25,000VND)', INNER);
    themNhom('Ngoại thành (phí ship 35,000VND)', OUTER);

    // 4. ĐỌC VÀ LƯU GIỎ HÀNG
    function loadCart() {
        try {
            const data = JSON.parse(localStorage.getItem(KEY) || '[]');
            return Array.isArray(data) ? data : [];
        } catch (e) {
            return [];
        }
    }

    function saveCart() {
        localStorage.setItem(KEY, JSON.stringify(cart));
        window.dispatchEvent(new Event('cart-updated'));
    }

    let cart = loadCart();

    // 5. TÍNH PHÍ GIAO HÀNG
    function shipFee() {
        if (!district.value) return null;

        return INNER.includes(district.value)
            ? FEE_IN
            : FEE_OUT;
    }

    // 6. LẤY PHƯƠNG THỨC THANH TOÁN
    function payMethod() {
        const selected = document.querySelector(
            'input[name="pay"]:checked'
        );

        return selected ? selected.value : 'cod';
    }

    // 7. HIỂN THỊ MÃ QR CÓ SẴN
    function renderQR() {
        const qrBox = $('qrBox');
        const qrImg = $('qrImg');
        const qrWait = $('qrWait');

        const hienQR =
            payMethod() === 'online' && cart.length > 0;

        qrBox.hidden = !hienQR;

        if (!hienQR) return;

        qrImg.src = QR_IMAGE;
        qrImg.hidden = false;
        qrWait.hidden = true;
    }

    $('qrImg').addEventListener('error', function () {
        this.hidden = true;

        $('qrWait').textContent =
            'Không tải được mã QR. Vui lòng kiểm tra đường dẫn ảnh.';

        $('qrWait').hidden = false;
    });

    // 8. HIỂN THỊ SẢN PHẨM VÀ TÍNH TIỀN
    function render() {
        const items = $('items');

        if (cart.length === 0) {
            items.innerHTML =
                '<div class="empty">Giỏ hàng của bạn đang trống.</div>';
        } else {
            items.innerHTML = cart.map((it, i) => `
                <div class="item">
                    <div class="thumb">
                        ${it.img
                            ? `<img src="${esc(it.img)}" alt="">`
                            : '🍰'}
                    </div>

                    <div class="info">
                        ${esc(it.name)}

                        ${it.size
                            ? `<small>Size: <b>${esc(it.size)}</b></small>`
                            : ''}

                        <div class="qty">
                            <button type="button" data-a="-" data-i="${i}">−</button>
                            <span>${it.qty}</span>
                            <button type="button" data-a="+" data-i="${i}">+</button>
                            <button class="rm" type="button" data-a="x" data-i="${i}">
                                Xóa
                            </button>
                        </div>
                    </div>

                    <div class="pr">
                        ${it.qty}x <b>${fmt(it.price)}</b>
                    </div>
                </div>
            `).join('');
        }

        $('wishBox').hidden = cart.length === 0;

        // Tính tiền hàng
        const goc = cart.reduce(
            (sum, it) => sum + it.price * it.qty, 0
        );

        // Tiền sau giảm giá
        const giam = Math.round(goc * rate);
        const tamTinh = Math.max(goc - giam, 0);

        // Phí giao hàng
        const phiShip = cart.length ? shipFee() : 0;

        // Tổng tiền
        const tong = tamTinh + (phiShip || 0);

        $('sub').textContent = fmt(tamTinh);

        $('ship').textContent = phiShip === null
            ? 'Chọn quận / huyện'
            : fmt(phiShip);

        $('tot').textContent = fmt(tong);

        $('feeHint').textContent =
            phiShip === FEE_IN
                ? 'Giao nội thành: phí ship 25,000VND'
                : phiShip === FEE_OUT
                    ? 'Giao ngoại thành: phí ship 35,000VND'
                    : '';

        renderQR();
    }

    // 9. TĂNG, GIẢM HOẶC XÓA SẢN PHẨM
    $('items').addEventListener('click', function (e) {
        const button = e.target.closest('button');

        if (!button) return;

        const i = Number(button.dataset.i);
        const action = button.dataset.a;

        if (!cart[i]) return;

        if (action === '+') {
            cart[i].qty++;
        } else if (action === '-') {
            cart[i].qty = Math.max(1, cart[i].qty - 1);
        } else if (action === 'x') {
            cart.splice(i, 1);
        }

        saveCart();
        render();
    });

    // 10. CẬP NHẬT KHI CHỌN QUẬN / PHƯƠNG THỨC THANH TOÁN
    district.addEventListener('change', render);

    document.querySelectorAll('input[name="pay"]').forEach(radio => {
        radio.addEventListener('change', render);
    });

    // 11. ÁP DỤNG MÃ GIẢM GIÁ
    $('apply').addEventListener('click', function () {
        const code = $('code').value.trim().toUpperCase();

        rate = 0;

        if (code === 'GIAM10') {
            rate = 0.1;
            alert('Đã áp dụng mã giảm giá 10%.');
        } else if (code !== '') {
            alert('Mã giảm giá không hợp lệ.');
        } else {
            alert('Vui lòng nhập mã giảm giá.');
        }

        render();
    });

    // 12. BỎ VIỀN ĐỎ KHI NHẬP LẠI
    ['name', 'phone', 'district', 'addr', 'date', 'slot'].forEach(id => {
        [ 'input', 'change' ].forEach(eventName => {
            $(id).addEventListener(eventName, function () {
                this.classList.remove('bad');
            });
        });
    });

    // 13. TẠO HỘP THÔNG BÁO THÀNH CÔNG
    const style = document.createElement('style');

    style.textContent = `
        .checkout-page .success-overlay {
            position: fixed;
            inset: 0;
            z-index: 99999;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
            background: rgba(11, 26, 51, 0.5);
        }

        .checkout-page .success-overlay[hidden] {
            display: none !important;
        }

        .checkout-page .success-dialog {
            width: 100%;
            max-width: 460px;
            padding: 30px 24px;
            border-radius: 16px;
            background: white;
            box-shadow: 0 10px 35px rgba(0, 0, 0, 0.2);
            text-align: center;
        }

        .checkout-page .success-icon {
            font-size: 42px;
            color: #2e7d32;
            margin-bottom: 10px;
        }

        .checkout-page .success-dialog h2 {
            color: #2e7d32;
            font-size: 24px;
            margin-bottom: 14px;
        }

        .checkout-page .success-dialog p {
            line-height: 1.7;
            overflow-wrap: anywhere;
        }

        .checkout-page .success-actions {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 12px;
            margin-top: 24px;
        }

        .checkout-page .success-link {
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 46px;
            padding: 10px;
            border-radius: 8px;
            background: #fdc86e;
            color: #1a1205;
            font-weight: 700;
            font-size: 14px;
            text-decoration: none;
        }

        .checkout-page .success-link.secondary {
            background: white;
            border: 1px solid #0b1a33;
        }

        @media (max-width: 480px) {
            .checkout-page .success-actions {
                grid-template-columns: 1fr;
            }
        }
    `;

    document.head.appendChild(style);

    // Tạo hộp thông báo nếu HTML chưa có
    let modal = $('successModal');

    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'successModal';
        modal.className = 'success-overlay';
        modal.hidden = true;

        modal.innerHTML = `
            <div class="success-dialog"
                 role="dialog"
                 aria-modal="true">

                <div class="success-icon">✓</div>

                <h2>Đặt hàng thành công!</h2>

                <p id="successText">
                    Đơn hàng của bạn đã được ghi nhận.
                </p>

                <div class="success-actions">
                    <a href="${HOME_URL}" class="success-link">
                        Tiếp tục mua sắm
                    </a>

                    <a href="${PROFILE_URL}" class="success-link secondary">
                        Theo dõi đơn hàng
                    </a>
                </div>
            </div>
        `;

        document.querySelector('.checkout-page').appendChild(modal);
    }

    // 14. XỬ LÝ NÚT ĐẶT HÀNG
    $('place').addEventListener('click', function () {
        let hopLe = true;

        const checks = [
            ['name', value => value.trim() !== ''],
            ['phone', value =>
                /^(0\d{9}|\+84\d{9})$/.test(value.replace(/\s/g, ''))],
            ['district', value => value !== ''],
            ['addr', value => value.trim() !== ''],
            ['date', value => value !== '' && value >= todayISO],
            ['slot', value => value !== '']
        ];

        // Kiểm tra thông tin bắt buộc
        checks.forEach(([id, check]) => {
            const input = $(id);
            const dung = check(input.value);

            input.classList.toggle('bad', !dung);

            if (!dung) hopLe = false;
        });

        const msg = $('msg');

        msg.className = 'msg';
        msg.textContent = '';

        if (cart.length === 0) {
            msg.textContent = 'Giỏ hàng đang trống.';
            msg.classList.add('bad');
            return;
        }

        if (!hopLe) {
            msg.textContent =
                'Vui lòng điền đầy đủ và chính xác các thông tin bắt buộc (*).';
            msg.classList.add('bad');
            return;
        }

        // Lấy tổng tiền và mã đơn trước khi xóa giỏ
        const tongText = $('tot').textContent;
        const maDon = orderCode;
        const online = payMethod() === 'online';

        // Hiển thị thông báo thành công
        $('successText').innerHTML =
            'Mã đơn hàng: <b>' + esc(maDon) + '</b><br>' +
            'Tổng thanh toán: <b>' + esc(tongText) + '</b><br>' +
            (online
                ? 'Vui lòng quét mã QR và kiểm tra số tiền trước khi chuyển khoản.'
                : 'Bạn thanh toán khi nhận hàng (COD).');

        modal.hidden = false;
        document.body.style.overflow = 'hidden';

        // Xóa giỏ hàng sau khi đặt
        cart = [];
        rate = 0;
        orderCode = 'MUSE' + String(Date.now()).slice(-6);

        saveCart();

        // Không gọi render() tại đây để đơn hàng không biến mất
    });

    // 15. HIỂN THỊ GIỎ HÀNG BAN ĐẦU
    render();

})();