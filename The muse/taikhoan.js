/*
- THE MUSE - TRANG CÁ NHÂN
- Đọc thông tin từ localStorage của trang đăng ký hiện tại.
- Đọc lịch sử đơn hàng trong key muse_orders và cộng điểm khi đơn Hoàn thành.
*/

(() => {
  'use strict';

  const $ = (selector, root = document) =>
    root.querySelector(selector);

  const $$ = (selector, root = document) =>
    [...root.querySelectorAll(selector)];

  const STORAGE = {
    name: 'ten',
    email: 'email',
    phone: 'phone',
    password: 'pass',
    orders: 'muse_orders',
    avatar: 'muse_avatar',
    promo: 'muse_email_promo'
  };

  const DEFAULT_EMAIL_TEXT = 'Chưa cập nhật email';

  // Đọc dữ liệu an toàn
  const safeGet = key => {
    try {
      return localStorage.getItem(key);
    } catch (error) {
      return null;
    }
  };

  // Lưu dữ liệu
  const safeSet = (key, value) => {
    try {
      localStorage.setItem(key, value);
      return true;
    } catch (error) {
      toast('Không thể lưu dữ liệu trên trình duyệt này.');
      return false;
    }
  };

  // Đọc danh sách JSON
  const parseArray = value => {
    try {
      const parsed = JSON.parse(value || '[]');
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      return [];
    }
  };

  // Chuyển dữ liệu tiền về dạng số
  const toNumber = value => {
    if (typeof value === 'number') {
      return Number.isFinite(value) ? value : 0;
    }

    return Number(
      String(value ?? '').replace(/[^\d-]/g, '')
    ) || 0;
  };

  // Chuẩn hóa email hiện tại (trả về '' nếu chưa cập nhật)
  const normalizeEmail = email => {
    const clean = String(email || '').trim().toLowerCase();
    return clean === DEFAULT_EMAIL_TEXT.toLowerCase() ? '' : clean;
  };

  // ===== TÍNH ĐIỂM TỪ ĐƠN HÀNG ĐÃ HOÀN THÀNH =====
  function calculateCompletedPoints(accountEmail) {
    const orders = parseArray(safeGet(STORAGE.orders));
    const currentEmail = normalizeEmail(accountEmail);

    // Các trạng thái được xem là đã hoàn thành
    const completedStatuses = [
      'hoàn thành',
      'completed',
      'done'
    ];

    const totalCompleted = orders.reduce((sum, order) => {
      // Lọc đúng đơn hàng thuộc tài khoản hiện tại (nếu tài khoản có email)
      if (currentEmail) {
        const orderEmail = String(order.email || '').trim().toLowerCase();
        if (orderEmail !== currentEmail) return sum;
      }

      const status = String(order.status || '').trim().toLowerCase();
      const isCompleted = completedStatuses.includes(status);

      // Chỉ cộng điểm khi đơn hàng có trạng thái Hoàn thành
      if (!isCompleted) return sum;

      let amount = 0;

      if (order.subtotal != null) {
        // Tiền bánh sau giảm giá, không tính phí ship
        amount = toNumber(order.subtotal) - toNumber(order.discount);
      } else if (order.total != null) {
        // Trường hợp dữ liệu không có subtotal
        amount = toNumber(order.total) - toNumber(order.shippingFee);
      } else {
        const items = Array.isArray(order.items) ? order.items : [];
        amount = items.reduce(
          (total, item) =>
            total +
            toNumber(item.price) *
            toNumber(item.qty || item.quantity),
          0
        );
      }

      return sum + Math.max(amount, 0);
    }, 0);

    // Cứ 10.000đ được 1 điểm
    return Math.floor(totalCompleted / 10000);
  }

  const fmt = number =>
    Number(number || 0).toLocaleString('vi-VN');

  // Thông báo
  function toast(message) {
    const element = $('#toast');
    if (!element) return;

    element.textContent = message;
    element.classList.add('show');

    clearTimeout(toast.timer);

    toast.timer = setTimeout(() => {
      element.classList.remove('show');
    }, 2400);
  }

  // Lấy thông tin tài khoản từ trang đăng ký
  const initialEmail = safeGet(STORAGE.email) || DEFAULT_EMAIL_TEXT;

  const user = {
    name: safeGet(STORAGE.name) || 'Khách hàng',
    email: initialEmail,
    phone: safeGet(STORAGE.phone) || '',
    points: calculateCompletedPoints(initialEmail)
  };

  // HẠNG THÀNH VIÊN
  const TIERS = [
    {
      name: 'Thành viên',
      min: 0,
      perks: [
        'Tích 1 điểm cho mỗi 10.000₫',
        'Nhận tin ưu đãi qua email',
        'Giảm 50k cho đơn từ 300k'
      ]
    },
    {
      name: 'Bạc',
      min: 500,
      perks: [
        'Tích 1,2 điểm cho mỗi 10.000₫',
        'Giảm 3% mọi đơn hàng',
        'Quà tặng sinh nhật nhỏ',
        'Ưu tiên nhận sản phẩm mới'
      ]
    },
    {
      name: 'Vàng',
      min: 1500,
      perks: [
        'Tích 1,5 điểm cho mỗi 10.000₫',
        'Giảm 5% mọi đơn hàng',
        'Miễn phí giao hàng nội thành',
        'Bánh sinh nhật tặng kèm'
      ]
    },
    {
      name: 'Kim cương',
      min: 3000,
      perks: [
        'Tích 2 điểm cho mỗi 10.000₫',
        'Giảm 8% mọi đơn hàng',
        'Miễn phí giao hàng toàn bộ',
        'Đặt bánh theo yêu cầu ưu tiên',
        'Quà tặng theo mùa'
      ]
    }
  ];

  function renderTier() {
    const tierSection = $('#tier');
    if (!tierSection) return;

    // Luôn đồng bộ điểm mới nhất từ các đơn Hoàn thành
    user.points = calculateCompletedPoints(user.email);

    let level = 0;

    TIERS.forEach((tier, index) => {
      if (user.points >= tier.min) {
        level = index;
      }
    });

    const current = TIERS[level];
    const next = TIERS[level + 1];

    const fraction = next
      ? (user.points - current.min) / (next.min - current.min)
      : 1;

    const percent = Math.min(
      100,
      ((level + (next ? fraction : 0)) / (TIERS.length - 1)) * 100
    );

    tierSection.dataset.level = String(level);

    if ($('#tierPoints')) {
      $('#tierPoints').textContent = fmt(user.points);
    }

    if ($('#tierName')) {
      $('#tierName').textContent = current.name;
    }

    if ($('#tierHint')) {
      $('#tierHint').textContent = next
        ? `Còn ${fmt(next.min - user.points)} điểm để lên hạng ${next.name}`
        : 'Bạn đang ở hạng cao nhất';
    }

    if ($('#tierFill')) {
      $('#tierFill').style.width = `${percent}%`;
    }

    if ($('#tierBar')) {
      $('#tierBar').setAttribute('aria-valuenow', String(Math.round(percent)));
      $('#tierBar').setAttribute(
        'aria-label',
        `Tiến trình hạng thành viên: ${Math.round(percent)}%`
      );
    }

    if ($('#perkTier')) {
      $('#perkTier').textContent = current.name;
    }

    if ($('#perkList')) {
      $('#perkList').innerHTML = current.perks
        .map(perk => `
          <li>
            <svg class="ic">
              <use href="#i-check"></use>
            </svg>
            ${perk}
          </li>
        `).join('');
    }

    if ($('#tierSteps')) {
      $('#tierSteps').innerHTML = TIERS
        .map((tier, index) => `
          <li class="${index <= level ? 'reached' : ''}">
            <b>${tier.name}</b>
            ${fmt(tier.min)} điểm
          </li>
        `).join('');
    }

    const tag = $('.tag');
    if (tag) {
      tag.textContent = current.name;
    }
  }

  // ===== HIỂN THỊ ĐƠN HÀNG CỦA NGƯỜI DÙNG =====
  let showAllOrders = false;

  const renderOrders = () => {
    const section = $('#orders');
    if (!section) return;

    const currentEmail = normalizeEmail(user.email);
    let orders = parseArray(safeGet(STORAGE.orders));

    // Lọc đơn hàng thuộc tài khoản hiện tại (nếu đã có email)
    if (currentEmail) {
      orders = orders.filter(order =>
        String(order.email || '').trim().toLowerCase() === currentEmail
      );
    }

    // Chỉ hiện nút Xem tất cả khi có hơn 5 đơn
    const viewAllLink = $('#viewAllOrders');
    if (viewAllLink) {
      viewAllLink.hidden = orders.length <= 5;
    }

    // Sắp xếp đơn mới nhất lên đầu
    orders.sort((a, b) =>
      new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
    );

    // Cập nhật thống kê
    const stats = $$('.stats .stat');

    const totalProducts = orders.reduce((sum, order) => {
      const items = Array.isArray(order.items) ? order.items : [];
      return sum + items.reduce(
        (total, item) => total + Number(item.qty || 0),
        0
      );
    }, 0);

    if (stats[0]) {
      $('b', stats[0]).textContent = orders.length;
    }

    if (stats[1]) {
      $('b', stats[1]).textContent = totalProducts;
    }

    // Xóa đơn hàng mẫu trong HTML
    $$('.order', section).forEach(item => item.remove());

    // Xóa thông báo trống cũ
    const oldEmpty = $('.orders-empty', section);
    if (oldEmpty) oldEmpty.remove();

    if (orders.length === 0) {
      const empty = document.createElement('p');
      empty.className = 'muted orders-empty';
      empty.textContent = 'Bạn chưa có đơn hàng nào.';
      section.appendChild(empty);
      return;
    }

    // Hiển thị 5 đơn gần nhất hoặc toàn bộ đơn hàng
    const visibleOrders = showAllOrders ? orders : orders.slice(0, 5);

    visibleOrders.forEach(order => {
      const row = document.createElement('div');
      row.className = 'order';

      const firstItem = order.items?.[0] || {};

      if (firstItem.img) {
        const img = document.createElement('img');
        img.src = firstItem.img;
        img.alt = firstItem.name || 'Sản phẩm';
        row.appendChild(img);
      }

      const info = document.createElement('div');
      info.className = 'order-info';

      const title = document.createElement('strong');
      title.textContent = firstItem.name
        ? firstItem.name +
          (order.items.length > 1
            ? ` và ${order.items.length - 1} sản phẩm khác`
            : '')
        : `Đơn hàng ${order.code}`;

      const detail = document.createElement('p');
      detail.className = 'muted';

      const date = order.createdAt
        ? new Date(order.createdAt).toLocaleDateString('vi-VN')
        : '';

      detail.textContent =
        `Mã đơn: ${order.code} · ` +
        `Đặt ngày ${date} · ` +
        `Tổng tiền: ${fmt(Number(order.total) || 0)}₫`;

      info.appendChild(title);
      info.appendChild(detail);
      row.appendChild(info);

      // Trạng thái đơn hàng
      const status = document.createElement('span');
      status.className = 'status';
      status.textContent = order.status || 'Hoàn thành';

      row.appendChild(status);
      section.appendChild(row);
    });
  };

  // ===== NÚT XEM TẤT CẢ ĐƠN HÀNG =====
  const viewAllOrdersLink = $('#viewAllOrders');

  if (viewAllOrdersLink) {
    viewAllOrdersLink.addEventListener('click', function (e) {
      e.preventDefault();

      showAllOrders = !showAllOrders;

      viewAllOrdersLink.innerHTML = `
        ${showAllOrders ? 'Thu gọn' : 'Xem tất cả'}
        <svg class="ic sm">
          <use href="#i-arrow"></use>
        </svg>
      `;

      viewAllOrdersLink.setAttribute('aria-expanded', String(showAllOrders));
      renderOrders();
    });
  }

  // HIỂN THỊ THÔNG TIN TÀI KHOẢN
  function renderProfile() {
    $$('.js-name').forEach(element => {
      element.textContent = user.name;
    });

    $$('.js-email').forEach(element => {
      element.textContent = user.email;
    });

    const cartCount = $('#cartCount');
    if (cartCount) {
      const cart = parseArray(safeGet('cart'));
      cartCount.textContent = String(
        cart.reduce((sum, item) => sum + Number(item.qty || 0), 0)
      );
    }

    renderTier();
  }

  // KHỞI TẠO
  renderProfile();
  renderOrders();

  // MENU BÊN TRÁI
  const menuItems = $$('.menu-item[data-target]');

  menuItems.forEach(button => {
    button.addEventListener('click', () => {
      menuItems.forEach(item => {
        item.classList.toggle('active', item === button);
      });

      const targetId = button.dataset.target;
      const target = targetId === 'profile'
        ? null
        : document.getElementById(targetId);

      if (targetId === 'profile') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        target.classList.remove('flash');
        void target.offsetWidth;
        target.classList.add('flash');
      }
    });
  });

  // ĐĂNG XUẤT
  const logoutButton = $('#logoutBtn');

  if (logoutButton) {
    logoutButton.addEventListener('click', () => {
      if (confirm('Bạn có chắc muốn đăng xuất?')) {
        toast('Bạn đã chọn đăng xuất.');
      }
    });
  }

  // MODAL
  let lastFocus = null;

  const openModal = id => {
    const modal = document.getElementById(id);
    if (!modal) return;

    lastFocus = document.activeElement;
    modal.hidden = false;

    const firstInput = $('input', modal);
    if (firstInput) firstInput.focus();
  };

  const closeModal = modal => {
    if (!modal) return;

    modal.hidden = true;
    if (lastFocus && typeof lastFocus.focus === 'function') {
      lastFocus.focus();
    }
  };

  // CHỈNH SỬA HỒ SƠ
  const editProfileButton = $('#editProfile');

  if (editProfileButton) {
    editProfileButton.addEventListener('click', () => {
      const form = $('[data-form="profile"]');
      if (!form) return;

      form.elements.namedItem('name').value =
        user.name === 'Khách hàng' ? '' : user.name;

      form.elements.namedItem('email').value =
        user.email === DEFAULT_EMAIL_TEXT ? '' : user.email;

      openModal('profileModal');
    });
  }

  // MỞ CÁC MODAL CÀI ĐẶT
  $$('[data-modal]').forEach(button => {
    button.addEventListener('click', () => {
      if (button.dataset.modal === 'emailModal') {
        const form = $('[data-form="email"]');
        if (form) {
          form.elements.namedItem('email').value =
            user.email === DEFAULT_EMAIL_TEXT ? '' : user.email;
        }
      }

      openModal(button.dataset.modal);
    });
  });

  // ĐÓNG MODAL
  $$('.modal').forEach(modal => {
    modal.addEventListener('click', event => {
      if (event.target === modal) {
        closeModal(modal);
      }
    });

    $$('[data-close]', modal).forEach(button => {
      button.addEventListener('click', () => {
        closeModal(modal);
      });
    });
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      $$('.modal:not([hidden])').forEach(closeModal);
    }
  });

  // LƯU THÔNG TIN HỒ SƠ
  const profileForm = $('[data-form="profile"]');

  if (profileForm) {
    profileForm.addEventListener('submit', event => {
      event.preventDefault();

      const name = profileForm.elements.namedItem('name').value.trim();
      const email = profileForm.elements.namedItem('email').value.trim();

      if (!name || !email) return;

      user.name = name;
      user.email = email;

      safeSet(STORAGE.name, name);
      safeSet(STORAGE.email, email);

      renderProfile();
      renderOrders();
      closeModal($('#profileModal'));
      toast('Đã lưu thay đổi hồ sơ.');
    });
  }

  // ĐỔI MẬT KHẨU
  const passwordForm = $('[data-form="password"]');

  if (passwordForm) {
    passwordForm.addEventListener('submit', event => {
      event.preventDefault();

      const oldPassword = passwordForm.elements.namedItem('old').value;
      const newPassword = passwordForm.elements.namedItem('new').value;
      const confirmPassword = passwordForm.elements.namedItem('confirm').value;

      const error = $('#pwError');
      const savedPassword = safeGet(STORAGE.password);

      if (error) error.textContent = '';

      if (!savedPassword) {
        if (error) error.textContent = 'Không tìm thấy thông tin mật khẩu đã đăng ký.';
        return;
      }

      if (oldPassword !== savedPassword) {
        if (error) error.textContent = 'Mật khẩu hiện tại không chính xác.';
        return;
      }

      if (newPassword.length < 6) {
        if (error) error.textContent = 'Mật khẩu mới cần ít nhất 6 ký tự.';
        return;
      }

      if (newPassword !== confirmPassword) {
        if (error) error.textContent = 'Mật khẩu nhập lại chưa khớp.';
        return;
      }

      if (newPassword === oldPassword) {
        if (error) error.textContent = 'Mật khẩu mới phải khác mật khẩu hiện tại.';
        return;
      }

      safeSet(STORAGE.password, newPassword);
      passwordForm.reset();
      closeModal($('#pwModal'));
      toast('Đã cập nhật mật khẩu.');
    });
  }

  // QUẢN LÝ EMAIL
  const emailForm = $('[data-form="email"]');

  if (emailForm) {
    emailForm.addEventListener('submit', event => {
      event.preventDefault();

      const email = emailForm.elements.namedItem('email').value.trim();
      if (!email) return;

      user.email = email;

      safeSet(STORAGE.email, email);
      safeSet(
        STORAGE.promo,
        emailForm.elements.namedItem('promo').checked ? '1' : '0'
      );

      renderProfile();
      renderOrders();
      closeModal($('#emailModal'));
      toast('Đã lưu email nhận thông báo.');
    });
  }

  // ĐỔI ẢNH ĐẠI DIỆN
  const avatarInput = $('#avatarInput');
  const avatarEdit = $('#avatarEdit');

  function applyAvatar(source) {
    $$('.avatar').forEach(avatar => {
      let image = $('img.photo', avatar);

      if (!image) {
        image = document.createElement('img');
        image.className = 'photo';
        image.alt = 'Ảnh đại diện';
        avatar.prepend(image);
      }

      image.src = source;
    });
  }

  const savedAvatar = safeGet(STORAGE.avatar);
  if (savedAvatar) {
    applyAvatar(savedAvatar);
  }

  if (avatarEdit && avatarInput) {
    avatarEdit.addEventListener('click', () => {
      avatarInput.click();
    });

    avatarInput.addEventListener('change', () => {
      const file = avatarInput.files && avatarInput.files[0];
      if (!file) return;

      if (!file.type.startsWith('image/')) {
        toast('Vui lòng chọn tệp hình ảnh.');
        avatarInput.value = '';
        return;
      }

      if (file.size > 2 * 1024 * 1024) {
        toast('Ảnh tối đa 2MB.');
        avatarInput.value = '';
        return;
      }

      const reader = new FileReader();

      reader.onload = () => {
        const imageData = String(reader.result || '');
        if (safeSet(STORAGE.avatar, imageData)) {
          applyAvatar(imageData);
          toast('Đã đổi ảnh đại diện.');
        }
      };

      reader.onerror = () => {
        toast('Không thể đọc tệp ảnh.');
      };

      reader.readAsDataURL(file);
    });
  }

  // ĐỒNG BỘ DỮ LIỆU KHI QUAY LẠI TRANG HOẶC TAB KHÁC THAY ĐỔI
  const syncAll = () => {
    user.name = safeGet(STORAGE.name) || 'Khách hàng';
    user.email = safeGet(STORAGE.email) || DEFAULT_EMAIL_TEXT;
    user.phone = safeGet(STORAGE.phone) || '';
    renderProfile();
    renderOrders();
  };

  window.addEventListener('storage', event => {
    if (
      [STORAGE.name, STORAGE.email, STORAGE.phone, STORAGE.orders].includes(event.key)
    ) {
      syncAll();
    }
  });

  window.addEventListener('pageshow', syncAll);
})();