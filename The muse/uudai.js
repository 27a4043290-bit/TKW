
(() => {
  'use strict';

  const toast = document.getElementById('promoToast');
  let toastTimer;

  // Hiển thị thông báo
  function showToast(message) {
    if (!toast) return;

    toast.textContent = message;
    toast.classList.add('show');

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 2200);
  }

  // Sao chép mã voucher
  async function copyText(value) {

    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(value);
      return;
    }

    const textarea = document.createElement('textarea');

    textarea.value = value;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';

    document.body.appendChild(textarea);

    textarea.select();

    const copied = document.execCommand('copy');

    textarea.remove();

    if (!copied) {
      throw new Error('Không thể sao chép mã.');
    }
  }

  // Bắt sự kiện nút sao chép
  document.querySelectorAll('.copy-code[data-code]')
    .forEach(button => {

      button.addEventListener('click', async () => {

        const code = button.dataset.code;

        if (!code) return;

        try {

          await copyText(code);

          const originalText = button.textContent;

          button.textContent = 'Đã sao chép';

          showToast(`Đã sao chép mã ${code}`);

          setTimeout(() => {
            button.textContent = originalText;
          }, 1600);

        } catch (error) {

          showToast(
            'Không sao chép được mã. Vui lòng chọn và sao chép thủ công.'
          );

        }

      });

    });

})();

