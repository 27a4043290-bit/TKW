// chinhsach.js — điều khiển các mục thu gọn/mở rộng của trang Chính sách
(function () {
  // true  = mở mục nào thì tự đóng các mục còn lại
  // false = mở được nhiều mục cùng lúc (giống bản cũ)
  const ONLY_ONE_OPEN = false;

  const items = document.querySelectorAll('.policy-container details');
  if (!items.length) return;

  // 1. Chế độ chỉ mở một mục
  if (ONLY_ONE_OPEN) {
    items.forEach(function (item) {
      item.addEventListener('toggle', function () {
        if (!item.open) return;
        items.forEach(function (other) {
          if (other !== item) other.open = false;
        });
      });
    });
  }

  // 2. Mở sẵn mục theo địa chỉ, ví dụ: chinhsach.html#muc-08
  function openFromHash() {
    const id = location.hash.slice(1);
    if (!id) return;
    const target = document.getElementById(id);
    if (target && target.tagName === 'DETAILS') {
      target.open = true;
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  openFromHash();
  window.addEventListener('hashchange', openFromHash);
})();