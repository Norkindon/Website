


const swiper = new Swiper(".swiper", {
    direction: "horizontal",
    loop: true,
    speed: 1500,
    slidesPerView: 1,
    spaceBetween: 60,
    mousewheel: false,
    parallax: true,
    centeredSlides: true,
    effect: "coverflow",
    coverflowEffect: {
        rotate: 40,
        slideShadows: true
    },
    // autoplay: {
    //   delay: 5000,
    //   pauseOnMouseEnter: true
    // },
    autoplay: false, // Disable autoplay
   
    breakpoints: {
        0: {
            slidesPerView: 1,
            spaceBetween: 60
        },
        600: {
            slidesPerView: 2,
            spaceBetween: 60
        },
        1000: {
            slidesPerView: 3,
            spaceBetween: 60
        },
        1400: {
            slidesPerView: 4,
            spaceBetween: 60
        },
        2300: {
            slidesPerView: 5,
            spaceBetween: 60
        },
        2900: {
            slidesPerView: 6,
            spaceBetween: 60
        }
    }
});
// Define initSwiper function
function initSwiper() {
    // Your initialization code here
}




