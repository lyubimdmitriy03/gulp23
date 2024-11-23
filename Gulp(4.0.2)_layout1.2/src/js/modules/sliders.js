document.addEventListener('DOMContentLoaded', function(){
    const resizableSwiper =  (swiperClass, swiperSettings, breakpoint, callback) => {
        let swiper

        breakpoint = window.matchMedia(breakpoint);

        const enableSwiper = function (className, settings){
            swiper = new Swiper(className, settings)

            if(callback){
                callback(swiper);
            }
        }

        const checker = function (){
            if(breakpoint.matches){
                return enableSwiper(swiperClass, swiperSettings);
            }else{
                if(swiper !== undefined){
                    swiper.destroy(true, true);
                }
                return;
            }
        }

        breakpoint.addEventListener('change', checker)
        checker();
    }

    const callbackFunc = (instance) => {
        if(instance){
            console.log(instance)
            instance.on('slideChange', function (e){
                console.log('*** services_slider.activeIndex', instance.activeIndex);
            });
        }
    };

    resizableSwiper(
        '.new-swiper',
        {
            // Optional parameters
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },
            slidesPerView: 3,
            watchOverflow: true,
            // centeredSlides: true,
            // freeMode:true,
            // loopedSlides: 3,
            slideToClickedSlide: true,
            // grabCursor: true,
            speed: 800,
            spaceBetween: 20,
            breakpoints: {
                320: {
                    slidesPerView: 1,
                },
                767: {
                    slidesPerView: 1.4,
                },
                850: {
                    slidesPerView: 1.8,
                },
                1199: {
                    slidesPerView: 2.5,
                },
                1550: {
                    slidesPerView: 3,
                },
            },

            // If we need pagination
            // pagination: {
            //     el: '.services-slider-progressbar',
            //     type: 'progressbar'
            // },

            // Navigation arrows
            // navigation: {
            //     nextEl: '.slider-button.slider-button-next.services-slider-next',
            //     prevEl: '.slider-button.slider-button-prev.services-slider-prev',
            // },

            // And if we need scrollbar
            // scrollbar: {
            //     el: '.services-slider-scrollbar',
            //     draggable: true
            // }
        },
        '(min-width: 768px)',
        // callbackFunc
    )

});


