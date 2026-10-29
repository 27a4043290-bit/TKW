//Hiệu ứng khi cuộn trang
  
        document.addEventListener("DOMContentLoaded", function () {
            const revealElements = document.querySelectorAll(".reveal-on-scroll");

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                    }
                });
            }, {
                threshold: 0.12
            });

            revealElements.forEach(el => observer.observe(el));
        });
        
// ===== HIỆU ỨNG TRƯỢT BANNER THE MUSE =====

document.addEventListener("DOMContentLoaded", function () {
    const slider = document.querySelector(".banner-slider");

    // Nếu trang không có banner thì dừng
    if (!slider) return;

    const track = slider.querySelector(".banner-track");
    const slides = slider.querySelectorAll(".banner-slide");
    const dots = slider.querySelectorAll(".banner-dot");
    const prevBtn = slider.querySelector(".banner-arrow.prev");
    const nextBtn = slider.querySelector(".banner-arrow.next");

    let currentIndex = 0;

    // Cập nhật vị trí banner
    function showSlide(index) {
        // Cho phép quay vòng ở đầu và cuối
        if (index < 0) {
            index = slides.length - 1;
        }

        if (index >= slides.length) {
            index = 0;
        }

        currentIndex = index;

        // Trượt cả dải banner sang trái
        track.style.transform =
            `translateX(-${currentIndex * 100}%)`;

        // Cập nhật trạng thái banner và chấm tròn
        slides.forEach((slide, i) => {
            slide.classList.toggle("active", i === currentIndex);
        });

        dots.forEach((dot, i) => {
            dot.classList.toggle("active", i === currentIndex);
        });
    }

    // Nhấn mũi tên phải: sang banner tiếp theo
    nextBtn.addEventListener("click", function () {
        showSlide(currentIndex + 1);
    });

    // Nhấn mũi tên trái: quay lại banner trước
    prevBtn.addEventListener("click", function () {
        showSlide(currentIndex - 1);
    });

    // Nhấn chấm tròn để chuyển trực tiếp banner
    dots.forEach((dot, index) => {
        dot.addEventListener("click", function () {
            showSlide(index);
        });
    });

    // Đặt banner đầu tiên làm trạng thái ban đầu
    showSlide(0);
});

   