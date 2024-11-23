(function ($) {
    console.log("done")
    var $window = $(window);
    var $document = $(document);

    $document.ready(function () {
        var $body = $('body');
        var wrapper = $('#wrapper');
        var header = $('#header');
        var main = $('#main');
        var footer = $('#footer');

        function sticky_top_section(requaired_section) {
            $window.on('scroll', function () {
                // sticky
                if ($window.scrollTop()) {
                    requaired_section.addClass('sticky');
                } else {
                    requaired_section.removeClass('sticky');
                }
            })
        }

// header & main-menu scroll fixed(хедер видимый при скроле вниз при скролле вверх пропадает)
// function scroolHeader() {
//
//     var header = $('.header');
//     var main_navigation = $('.main-navigation');
//     scrollPrev = 0;
//
//     $(window).scroll(function () {
//         if ($(window).width() > 768) {
//             return;
//         }
//         var scrolled = $(window).scrollTop();
//
//         if (scrolled > 72 && scrolled > scrollPrev) {
//             header.addClass('out');
//             main_navigation.addClass('out');
//         } else {
//             header.removeClass('out');
//             main_navigation.removeClass('out');
//         }
//
//         scrollPrev = scrolled;
//     });
// }

        sticky_top_section(header);


        //main menu
        var header_navigation = $('.header-navigation');
        var navigation_item = $('li.menu-item-has-children');
        var header_sub_menu = $('.header-sub-menu');


        // navigation markerLeft > 767
        function hover_marker() {
            var header_navigation_list = document.querySelector('.header-navigation-list');
            var marker = document.createElement('li');
            var hoverLink = document.querySelectorAll('.header-navigation-list > li > a');

            marker.setAttribute('id', 'marker')
            header_navigation_list.insertBefore(marker, header_navigation_list.firstElementChild)


            function indicator(e) {
                marker.style.left = e.offsetLeft + "px";
                marker.style.width = e.offsetWidth + "px";
                marker.style.height = '1px';
                marker.style.transition = '0.55s';
                marker.style.opacity = '1';
                marker.style.visibility = 'visible';
            }

            hoverLink.forEach(link => {
                link.addEventListener('mousemove', (e) => {
                    indicator(e.target);
                });
                link.addEventListener('mouseout', function () {
                    marker.style.opacity = '0';
                    marker.style.visibility = 'hidden';
                    // marker.style.width = '0'
                });

            });

        }



























        //main menu mobile
        var main_navigation_trigger = $('.header-navigation-trigger');
        main_navigation_trigger.click(function (e) {
            e.preventDefault();
            e.stopPropagation();
            $(this).toggleClass('active');
            header_navigation.toggleClass('active');
            $body.toggleClass('lock');
        });

        //main menu mobile submenu
        // function openSubmenu() {
        //     // e.preventDefault();
        //     // e.stopPropagation();
        //     $(this).children('.header-sub-menu').slideToggle(400);
        //     $(this).siblings().find(header_sub_menu).slideUp(400);
        //     $(this).toggleClass('open').siblings().removeClass('open');
        // }
        //
        // function runSubmenu() {
        //     navigation_item.off('click', openSubmenu);
        //     navigation_item.on('click', openSubmenu);
        // }


        //slider
        $('.new-slider').slick({
            arrows: true,
            dots: true,
            infinite: true,
            adaptiveHeight: false,
            speed: 1000,//скорость пролистывания
            easing: 'ease',
            slidesToShow: 3,
            slidesToScroll: 1,
            // autoplay:true,
            autoplaySpeed: 3000,
            pauseOnFocus: true,
            pauseOnHover: true,
            pauseOnDotsHover: true,
            draggable: true,
            swipe: true,
            touchThreshold: 5,
            touchMove: true,
            waitForAnimate: true,//разрешить пролистывать слайды по клику "false"
            centerMode: false,
            variableWidth: false, //разрешение ширины контента
            // rtl: $('body').css('direction') == 'rtl' ? true : false,
            // centerPadding: '15%', //если надо полный + не полный слайды + centerMode
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3,
                        infinite: true,
                        dots: true
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        });







        //popups
        function open_popup(popup) {
            popup.addClass('open');
            header.addClass('hide');
        }

        function remove_popup(popup) {
            popup.removeClass('open');
            header.removeClass('hide');
        }

        function close_popup_init(popup, popup_button) {
            var popup_close = popup.find('.popup_close');

            function close_popup(e) {
                var popup_children = popup.find('.container').children(':not(.popup_close)');
                if (popup.hasClass('open')) {
                    if (!popup_children.is(e.target) && popup_children.has(e.target).length === 0 && !popup_button.is(e.target) && popup_button.has(e.target).length === 0) {
                        e.preventDefault()
                        remove_popup(popup)
                    }
                }
            }

            //клик по всей плоскости
            $document.click(close_popup);
            //клик по кнопке
            popup_close.click(close_popup);
        }

        function run_popup(popup, popup_button) {
            popup_button.click(function (e) {
                e.preventDefault()
                open_popup(popup);
            });
            close_popup_init(popup, popup_button);
        }

        function pupup_init(popup, popup_button) {
            if (popup_button.length) {
                run_popup(popup, popup_button);
            }
        }

        function popups(popup_button) {
            var popups = $('.popup');
            if (popups.length) {
                popups.each(function () {
                    var popup = $(this);
                    pupup_init(popup, popup_button);

                });
            }
        }

        popups($('.header-logo a[href^="#"]'));

        $document.on('click', '.popup_close, .popup-overlay', function (e){
            e.preventDefault();
            $('.popup').removeClass('open');
            header.removeClass('hide');
        });








        //permutation of blocks
        function prepend_block(relative_block, prepend_block) {
            if (relative_block.length) {
                relative_block.prepend(prepend_block);
            }
        }

        function append_block(relative_block, appended_block) {
            if (relative_block.length) {
                relative_block.append(appended_block);
            }
        }

        function before_block(relative_block, before_block) {
            if (relative_block.length) {
                relative_block.before(before_block);
            }
        }

        function after_block(relative_block, after_block) {
            if (relative_block.length) {
                relative_block.after(after_block);
            }
        }


        // 580


        // 767

        // 991


        // 580
        function permutation_of_blocks_580() {

        }

        function permutation_of_blocks_back_580() {

        }

        // 767
        function permutation_of_blocks_767() {

        }

        function permutation_of_blocks_back_767() {

        }

        // 991
        function permutation_of_blocks_991() {

        }

        function permutation_of_blocks_back_991() {

        }


        //equalizeHeight
        $.fn.equalizeHeight = function (options) {
            var settings = $.extend({
                'maxWindowWidth': false,
                'equaltop': false
            }, options);
            this.css({'height': 'inherit'});
            if (!settings.maxWindowWidth || settings.maxWindowWidth < $(window).width()) {
                var maxHeight = 0;
                var curentTop = false;
                var tempArray = new Array();
                if (!settings.equaltop) {
                    this.each(function (index, el) {
                        maxHeight = Math.max(maxHeight, $(el).css('box-sizing') == 'border-box' ? $(el).innerHeight() : $(el).height());
                    });
                    this.css({'height': maxHeight + 'px'});
                } else {
                    this.each(function (index, el) {
                        if (curentTop === false || Math.abs(curentTop - $(el).offset().top) > 1) {
                            $(tempArray).css({'height': maxHeight + 'px'});
                            maxHeight = 0;
                            curentTop = Math.floor($(el).offset().top);
                            tempArray = new Array();
                        }
                        maxHeight = Math.max(maxHeight, $(el).css('box-sizing') == 'border-box' ? $(el).innerHeight() : $(el).height());
                        tempArray.push(el);
                    })
                    $(tempArray).css({'height': maxHeight + 'px'});
                }
            }

        }

        function fixSizes() {

            $('.products-item-name-and-price').equalizeHeight({
                equaltop: true
            });


        }

        fixSizes();


        // adaptive
        function adaptive() {

            if ($window.width() <= 991) {
                permutation_of_blocks_991()
            }

            if ($window.width() > 991) {
                permutation_of_blocks_back_991()
            }

            if ($window.width() <= 767) {
                permutation_of_blocks_767();
                // runSubmenu();

            }

            if ($window.width() > 767) {
                permutation_of_blocks_back_767();
                hover_marker();
            }


            if ($window.width() <= 580) {
                permutation_of_blocks_580();
            }

            if ($window.width() > 580) {
                permutation_of_blocks_back_580();
            }


        }

        adaptive();


        // resize
        $window.resize(function () {
            adaptive();
            fixSizes();
        });

    });
})(jQuery)


