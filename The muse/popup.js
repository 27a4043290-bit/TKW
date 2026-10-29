/* =====================================================================
   popup-chao.js — popup tự hiện ngay khi khách vào trang
   Cách dùng: thêm 2 dòng vào trang (xem HUONG-DAN.txt). Chỉnh cách hoạt động ở bảng CẤU HÌNH bên dưới.
   ===================================================================== */
(function () {
  /* ======================= CẤU HÌNH — sửa ở đây ======================= */
  const C = Object.assign({
    mode:   'image',                // 'image' = popup chính là ảnh thiết kế của bạn | 'card' = ảnh + chữ + nút do code dựng
    image:  'image/popup.png',     // ĐƯỜNG DẪN ẢNH thiết kế popup 
    alt:    'Ưu đãi từ The Muse',   // mô tả ảnh
    closeArea: {x:83.8, y:15.5, size:8},  // vị trí nút × trong ảnh Sale 30% (đổi/ xóa thành null nếu ảnh khác) — nếu ẢNH CỦA BẠN ĐÃ CÓ SẴN NÚT ×: đặt vị trí nút đó (tính bằng %) để bấm vào nút trong ảnh là đóng. VD: {x:83.8, y:15.5, size:8}
    href:   '',                     // link khi bấm vào ảnh/nút (để trống = không bấm được). VD: 'thiet-ke-theo-yeu-cau.html'
    newTab: false,                  // true = mở link ở tab mới
    title:  'Ưu đãi chào bạn mới',  // (chỉ kiểu 'card')
    text:   'Giảm 10% cho đơn bánh thiết kế riêng đầu tiên.',   // (chỉ kiểu 'card')
    button: 'Xem ngay',             // (chỉ kiểu 'card')
    autoClose: 10000,               // TỰ ĐÓNG sau bao nhiêu mili-giây kể từ lúc popup hiện (10000 = 10 giây, 5000 = 5 giây). Đặt 0 nếu không muốn tự đóng
    delay:  800,                    // hiện sau bao nhiêu mili-giây kể từ lúc vào trang (1000 = 1 giây)
    once:   'day'                   // 'always' = vào là hiện (dùng khi đang làm thử) | 'session' = 1 lần mỗi lần mở trình duyệt | 'day' = 1 lần mỗi 24 giờ | 'forever' = chỉ 1 lần duy nhất
  }, window.POPUP_CHAO || {});
  /* ==================================================================== */

  const KEY = 'popup-chao-seen';
  let overlay, box, lastFocus, timer;
  const store = () => (C.once === 'session' ? sessionStorage : localStorage);

  function seenAlready() {
    if (C.once === 'always') return false;
    try {
      const t = store().getItem(KEY);
      if (!t) return false;
      return C.once === 'day' ? Date.now() - Number(t) < 864e5 : true;
    } catch (e) { return false; }
  }
  const mark = () => { try { store().setItem(KEY, String(Date.now())); } catch (e) {} };

  function link(child) {                                     // bọc phần tử vào thẻ <a> nếu có link
    if (!C.href) return child;
    const a = document.createElement('a');
    a.href = C.href;
    if (C.newTab) { a.target = '_blank'; a.rel = 'noopener'; }
    a.appendChild(child);
    return a;
  }

  function build(img) {
    overlay = document.createElement('div');
    overlay.className = 'pc-overlay';
    box = document.createElement('div');
    box.className = 'pc-box ' + (C.mode === 'card' ? 'is-card' : 'is-image');
    box.setAttribute('role', 'dialog'); box.setAttribute('aria-modal', 'true');
    box.setAttribute('aria-label', C.alt); box.tabIndex = -1;

    const x = document.createElement('button');
    x.type = 'button'; x.className = 'pc-x'; x.setAttribute('aria-label', 'Đóng'); x.textContent = '×';
    x.onclick = close;
    if (C.mode !== 'card' && C.closeArea) {                    // dùng luôn nút × có sẵn trong ảnh: phủ 1 vùng bấm trong suốt lên đúng chỗ đó
      x.classList.add('pc-x-area'); x.textContent = '';
      x.style.cssText = 'left:' + C.closeArea.x + '%;top:' + C.closeArea.y + '%;right:auto;width:max(' + (C.closeArea.size || 8) + '%,44px)';
    }
    box.appendChild(x);

    if (C.mode === 'card') {
      const media = document.createElement('div'); media.className = 'pc-media'; if (img) media.appendChild(img);
      const content = document.createElement('div'); content.className = 'pc-content';
      const h = document.createElement('h3'); h.textContent = C.title;
      const p = document.createElement('p'); p.textContent = C.text;
      content.append(h, p);
      if (C.href) {
        const b = document.createElement('a'); b.className = 'pc-btn'; b.href = C.href; b.textContent = C.button;
        if (C.newTab) { b.target = '_blank'; b.rel = 'noopener'; }
        content.appendChild(b);
      }
      box.append(media, content);
    } else {
      box.appendChild(link(img));
    }
    overlay.appendChild(box);
    document.body.appendChild(overlay);
    overlay.addEventListener('mousedown', e => { if (e.target === overlay) close(); });   // bấm ra ngoài thì đóng
    document.addEventListener('keydown', onKey);
  }

  function onKey(e) {
    if (!overlay || !overlay.classList.contains('show')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'Tab') {                                    // giữ phím Tab chạy trong popup
      const f = [...box.querySelectorAll('a[href],button')];
      if (!f.length) return;
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  }

  function open() {
    if (overlay && overlay.classList.contains('show')) return;
    const img = new Image();
    img.alt = C.alt; img.decoding = 'async';
    img.onload = () => show(img);                             // chỉ hiện khi ảnh đã tải xong, tránh popup trống
    img.onerror = () => { if (C.mode === 'card') show(null); else console.warn('[popup-chao] Không tìm thấy ảnh:', C.image); };
    img.src = C.image;
  }
  function show(img) {
    if (!overlay) build(img);
    lastFocus = document.activeElement;
    document.body.style.overflow = 'hidden';                  // khóa cuộn trang phía sau
    overlay.classList.add('show');
    mark();
    clearTimeout(timer);
    if (C.autoClose > 0) timer = setTimeout(close, C.autoClose);      // hẹn giờ tự đóng
    setTimeout(() => (C.closeArea && C.mode !== 'card' ? box : box.querySelector('.pc-x')).focus(), 50);   // nút × trong suốt thì không tự chọn (tránh hiện viền), bấm Tab sẽ thấy viền
  }
  function close() {
    if (!overlay) return;
    clearTimeout(timer);
    overlay.classList.remove('show');
    document.body.style.overflow = '';
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }
  function reset() { try { localStorage.removeItem(KEY); sessionStorage.removeItem(KEY); } catch (e) {} }

  window.PopupChao = { open, close, reset };                  // gọi PopupChao.open() nếu muốn mở bằng nút bấm

  function start() { if (!seenAlready()) setTimeout(open, C.delay); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();