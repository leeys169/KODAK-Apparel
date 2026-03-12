document.addEventListener("DOMContentLoaded", function () {

    // ====================탑버튼=======================
    const topBtn = document.querySelector(".top-btn");

    // 스크롤 시 버튼 나타나기
    window.addEventListener("scroll", function () {

        if (window.scrollY > 800) {
        topBtn.classList.add("show");
        } else {
        topBtn.classList.remove("show");
        }
    });

    // 클릭 시 맨 위로 이동
    topBtn.addEventListener("click", function () {

        window.scrollTo({
        top: 0,
        behavior: "smooth"
        });
    });

    // ====================HEADER=======================

    const header = document.querySelector(".header");
    let lastScroll = 0;

    window.addEventListener("scroll", function () {

        const currentScroll = window.scrollY;

        /* =========================
            1. 스크롤 시 배경 추가
        ========================= */
        if (currentScroll > 10) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

        /* =========================
            2. 스크롤 방향에 따라 헤더 숨김 / 나타남
        ========================= */
        if (currentScroll > lastScroll && currentScroll > 100) {
            // 아래로 스크롤
            header.classList.add("hide");
        } else {
            // 위로 스크롤
            header.classList.remove("hide");
        }

        lastScroll = currentScroll;

    });

    // ====================Weekly Best 탭=======================
    // 탭메뉴
    const weeklyTabs = document.querySelectorAll(".weekly-best .tab-btn");
    const weeklyContents = document.querySelectorAll(".weekly-best .tab-content");

    weeklyTabs.forEach((tab) => {
        tab.addEventListener("click", () => {

            const target = tab.dataset.tab;

            // 버튼 active 제거
            weeklyTabs.forEach(btn => btn.classList.remove("active"));
            tab.classList.add("active");

            // 콘텐츠 active 제거
            weeklyContents.forEach(content => content.classList.remove("active"));

            // 선택된 콘텐츠 표시
            document.getElementById(target).classList.add("active");
        });
    });

        // 스와이퍼
        const weeklySwipers = [];

        document.querySelectorAll(".weekly-swiper").forEach((swiperEl) => {

        const swiper = new Swiper(swiperEl, {
            slidesPerView: 4.5,
            spaceBetween: 24,
            speed: 600,
            // observer: true,
            // observeParents: true, 
        });
            weeklySwipers.push(swiper);
    });

    // ====================이달의 코닥 탭=======================

    const monthTabs = document.querySelectorAll(".month-tab-menu .tab-btn");
    const monthLists = document.querySelectorAll(".month-product-list");
    const monthMains = document.querySelectorAll(".month-main-content");

    monthTabs.forEach((tab) => {
        tab.addEventListener("click", () => {

            const listTarget = tab.dataset.month;
            const mainTarget = tab.dataset.main;

            // 버튼 active
            monthTabs.forEach(btn => btn.classList.remove("active"));
            tab.classList.add("active");

            // 상품 리스트 변경
            monthLists.forEach(list => list.classList.remove("active"));
            document.getElementById(listTarget).classList.add("active");

            // 메인 이미지 변경
            monthMains.forEach(main => main.classList.remove("active"));
            document.getElementById(mainTarget).classList.add("active");
        });
    });

    // ====================메인비주얼(메인배너)=======================
    const mainSwiper = new Swiper(".main-visual-swiper", {
        loop: true,
        speed: 900,

        effect: "fade",
        fadeEffect: {
            crossFade: true
        },

        autoplay:{
            delay: 3000,
            disableOnInteraction: false,
        },

        navigation:{
            nextEl: ".main-next",
            prevEl: ".main-prev",
        },

        pagination:{
            el: ".main-pagination",
            clickable: true,
        },

        on:{
            init: function(){
                animateText(this);
            },

            slideChangeTransitionStart: function(){
                resetText();
            },

            slideChangeTransitionEnd: function(){
                animateText(this);
            }
        }
    });

    const texts = document.querySelectorAll(".main-visual-text");

    function resetText(){
        texts.forEach(text=>{
            text.classList.remove("active");
        });
    }

    function animateText(swiper){
        const current = swiper.slides[swiper.activeIndex].querySelector(".main-visual-text");

        if(current){
            current.classList.add("active");
        }
    }

    // ====================컬러스와이퍼=======================
    const inner = document.querySelector(".inner");

    const colorSwiper = new Swiper(".kodak-color-swiper", {

        slidesPerView: "auto",
        spaceBetween: 20,
        speed: 800,
        grabCursor: true,

        slidesOffsetBefore:
            inner.offsetLeft + parseInt(getComputedStyle(inner).paddingLeft)

    });


    // ====================이벤트배너2=======================
    const subVisualSwiper = new Swiper(".sub-visual-swiper", {

    effect: "fade",
        fadeEffect: {
            crossFade: true
        },

        speed: 700,

        autoplay: {
            delay: 3000,
            disableOnInteraction: false
        },

        loop: true,

        navigation: {
            nextEl: ".sub-next",
            prevEl: ".sub-prev"
        },

        pagination: {
            el: ".sub-pagination",
            clickable: true
        },

        on: {
            init: function () {
            document
                .querySelector(".sub-visual-swiper .swiper-slide-active .sub-visual-text")
                ?.classList.add("active");
            },

            slideChangeTransitionStart: function () {
            document
                .querySelectorAll(".sub-visual-text")
                .forEach((el) => el.classList.remove("active"));
            },

            slideChangeTransitionEnd: function () {
                document
                    .querySelector(".sub-visual-swiper .swiper-slide-active .sub-visual-text")
                    ?.classList.add("active");
                }
            }
        });


// --------------------------------------------
});