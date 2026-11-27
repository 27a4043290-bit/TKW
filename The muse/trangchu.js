// ===== Hiệu ứng hiện mềm mại khi cuộn trang =====
document.addEventListener("DOMContentLoaded", function () {
  // Nhóm các phần tử: [selector, kiểu hiện, có hiện lần lượt không]
  const targets = [
    [".featured-section h2", "", false],
    [".featured-section .card", "", true],
    [".featured-section .btn-more-container", "", false],
    [".product-grid-home .product-card-home", "", true],


    [".intro-text", "rv-left", false],
    [".intro-image", "rv-right", false],


    [".features-banner .section-eyebrow", "", false],
    [".features-banner h2", "", false],
    [".feature-item", "", true],


    [".news-section h2", "", false],
    [".news-card", "", true],


    // Giữ tương thích với class cũ nếu bạn đã gắn trong HTML
    [".reveal-on-scroll", "", false]
  ];


  const elements = [];


  targets.forEach(([selector, extraClass, stagger]) => {
    document.querySelectorAll(selector).forEach((el, i) => {
      if (el.classList.contains("rv")) return;
      el.classList.add("rv");
      if (extraClass) el.classList.add(extraClass);


      // Hiện lần lượt: mỗi thẻ trễ hơn thẻ trước 0.12s (tối đa 5 thẻ)
      if (stagger) el.style.setProperty("--d", (i % 5) * 0.12 + "s");


      elements.push(el);
    });
  });


  // Trình duyệt cũ không hỗ trợ: hiện luôn
  if (!("IntersectionObserver" in window)) {
    elements.forEach(el => el.classList.add("in"));
    return;
  }


  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in");
        observer.unobserve(entry.target);   // chỉ hiện 1 lần
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: "0px 0px -60px 0px"         // đợi phần tử lên cao hơn mép dưới một chút
  });


  elements.forEach(el => observer.observe(el));
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




   

