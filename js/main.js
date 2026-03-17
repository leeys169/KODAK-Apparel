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

    // 햄버거 메뉴 추가
    const hamburgerBtn = document.querySelector(".hamburger-btn");
    const mobileMenu = document.querySelector(".mobile-menu");
    const closeBtn = document.querySelector(".menu-close-btn");

    hamburgerBtn.addEventListener("click", function(){
        mobileMenu.classList.add("active");
    });


    closeBtn.addEventListener("click", function(){
        mobileMenu.classList.remove("active");
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

            slidesPerView:1.5,
            spaceBetween:5,
            speed:600,

            observer:true,
            observeParents:true,

            breakpoints:{
                1131:{
                    slidesPerView:4.5,
                    spaceBetween:20
                }
            }

        });

        weeklySwipers.push(swiper);

        });

        window.addEventListener("resize", () => {
            weeklySwipers.forEach(swiper => swiper.update());
        });

        /* =========================
        이달의 코닥 탭
        ========================= */

        const monthTabs = document.querySelectorAll(".month-tab-menu .tab-btn");
        const monthLists = document.querySelectorAll(".month-product-list");
        const monthMains = document.querySelectorAll(".month-main-content");

        monthTabs.forEach((tab) => {

            tab.addEventListener("click", () => {

                const listTarget = tab.dataset.month;
                const mainTarget = tab.dataset.main;

                /* 버튼 active */
                monthTabs.forEach(btn => btn.classList.remove("active"));
                    tab.classList.add("active");

                /* 상품 리스트 변경 */
                monthLists.forEach(list => list.classList.remove("active"));
                    document.getElementById(listTarget).classList.add("active");

                /* 메인 이미지 변경 */
                monthMains.forEach(main => main.classList.remove("active"));
                    document.getElementById(mainTarget).classList.add("active");

                    initMonthSwiper();
            });
        });


        /* =========================
        메인이미지 반응형 교체
        ========================= */

        function changeMonthMainImage(){

            const isMobile = window.innerWidth <= 1130;

            const images = document.querySelectorAll(".month-main-content img");

            images.forEach((img)=>{

                let src = img.getAttribute("src");

                if(isMobile){
                    img.src = src.replace("_main.jpg","_main_m.jpg");
                }else{
                    img.src = src.replace("_main_m.jpg","_main.jpg");
                }
            });
        }

        changeMonthMainImage();
        window.addEventListener("resize", changeMonthMainImage);

        /* =========================
        Swiper (1130 이하)
        ========================= */

        let monthSwipers = [];

        function destroyMonthSwipers(){
            monthSwipers.forEach((swiper) => {
                if(swiper){
                    swiper.destroy(true, true);
                }
            });
            monthSwipers = [];
        }

        function initMonthSwiper(){

            destroyMonthSwipers();

            if(window.innerWidth <= 1130){

                document.querySelectorAll(".month-product-list.active .month-swiper").forEach((swiperEl) => {

                    const progressEl = swiperEl.closest(".month-product-list").querySelector(".month-progress");

                    const swiper = new Swiper(swiperEl, {
                        slidesPerView: 3,
                        spaceBetween: 20,
                        speed: 500,
                        observer: true,
                        observeParents: true,
                        scrollbar: {
                            el: progressEl,
                            draggable: true
                        },

                        breakpoints: {
                            0: {
                                slidesPerView: 2
                            },
                            768: {
                                slidesPerView: 3
                            }
                        }
                    });

                    monthSwipers.push(swiper);
                });

            }
        }

        initMonthSwiper();
        window.addEventListener("resize", initMonthSwiper);        
        /* =========================
        탭 위치 이동 (1130)
        ========================= */

        const monthTabMenu = document.querySelector(".month-tab-menu");
        const monthWrap = document.querySelector(".month-kodak-wrap");
        const monthSide = document.querySelector(".month-kodak-side");
        const monthHead = document.querySelector(".month-kodak-head");

        function moveMonthTab(){

            if(window.innerWidth <= 1130){
                monthHead.after(monthTabMenu);   // 제목 아래
            }else{
                monthSide.prepend(monthTabMenu); // 상품 위
            }

        }

        moveMonthTab();
        window.addEventListener("resize", moveMonthTab);

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

    // offset 계산 함수
    const getOffset = () => {
        if (window.innerWidth <= 500) {
            return 20; 
        } else if (window.innerWidth <= 1130) {
            return 40;
        } else if (window.innerWidth <= 1400) {
            return 60;
        } else {
            return inner.offsetLeft + parseInt(getComputedStyle(inner).paddingLeft);
        }
    };

    const colorSwiper = new Swiper(".kodak-color-swiper", {

        slidesPerView: "auto",
        spaceBetween: 20,
        speed: 800,
        grabCursor: true,

        slidesOffsetBefore: getOffset(),

        breakpoints: {
            0: {
                slidesPerView: 1.2
            },
            768: {
                slidesPerView: 1.8
            },
            1130: {
                slidesPerView: "auto"
            }
        }
    });

    // ====================이벤트배너2=======================
        let subVisualSwiper;

        const initSubSwiper = () => {
            if (window.innerWidth > 1130) {
                if (!subVisualSwiper) {
                    subVisualSwiper = new Swiper(".sub-visual-swiper", {

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
                }
            } else {
                // 1130 이하 → swiper 제거
                if (subVisualSwiper) {
                    subVisualSwiper.destroy(true, true);
                    subVisualSwiper = null;
                }
            }
        };
        // 최초 실행
        initSubSwiper();

        // 리사이즈 대응
        window.addEventListener("resize", initSubSwiper);
    // ====================메인비주얼 카드 드래그 모바일=======================

        const cardWrap = document.querySelector(".main-visual-card-wrap");
            if (cardWrap) {

            let startX = 0;
            let isDown = false;

            cardWrap.addEventListener("pointerdown",(e)=>{
                isDown = true;
                startX = e.clientX;
            });

            cardWrap.addEventListener("pointermove",(e)=>{

            if(!isDown) return;

            const diff = e.clientX - startX;

            if(diff < -80){
                moveNext();
                isDown = false;
            }

            if(diff > 80){
                movePrev();
                isDown = false;
            }

        });

            cardWrap.addEventListener("pointerup",()=>{
                isDown = false;
            });

            cardWrap.addEventListener("pointerleave", () => {
                isDown = false;
            });

            function moveNext(){

                const cards = Array.from(document.querySelectorAll(".visual-card"));

                cards.forEach(card=>{
                    card.classList.remove("card1","card2","card3","card4");
                });

                const first = cards.shift();
                cards.push(first);

                // ⭐ DOM 순서도 실제로 바꿈
                cardWrap.appendChild(first);

                cards.forEach((card,index)=>{
                    card.classList.add(`card${index+1}`);
                });
            }

            function movePrev(){

                const cards = Array.from(document.querySelectorAll(".visual-card"));

                    cards.forEach(card=>{
                        card.classList.remove("card1","card2","card3","card4");
                    });

                    const last = cards.pop();
                        cards.unshift(last);

                    // ⭐ DOM 순서 변경
                    cardWrap.prepend(last);

                    cards.forEach((card,index)=>{
                        card.classList.add(`card${index+1}`);
                    });
                }
            }

            let autoSlide = setInterval(() => {
                moveNext();
            }, 4000);

            cardWrap.addEventListener("pointerdown", () => {
                clearInterval(autoSlide);
            });

            cardWrap.addEventListener("pointerup", () => {

            autoSlide = setInterval(() => {
                moveNext();
            }, 4000);
        });

    // ====================해시태그 스와이퍼 모바일=======================
    let hashtagSwiper;

    function initHashtagSwiper(){

        if(window.innerWidth <= 1130){

            if(!hashtagSwiper){
                hashtagSwiper = new Swiper(".hashtag-swiper",{
                    slidesPerView:"auto",
                    spaceBetween:20,
                    freeMode:true
                });
            }
        } else {

            if(hashtagSwiper){
                hashtagSwiper.destroy(true,true);
                hashtagSwiper = undefined;
            }
        }
    }
    initHashtagSwiper();
    window.addEventListener("resize", initHashtagSwiper);


// --------------------------------------------
});