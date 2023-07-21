//import $ from "jquery"; // если имортировать с node modules(нужно установить jquery 'npm i jquery')
// (function ($) {/*весь код jquery сюда*/})(jQuery) // если подтягиваются с libs

//
// console.log("done")
// var $window = $(window);
// var $document = $(document);
// var $body = $('body');
//
// $document.ready(function () {
//     var wrapper = $('#wrapper');
//     var header = $('#header');
//     var main = $('#main');
//     var footer = $('#footer');
//
//     function sticky_top_section(requaired_section) {
//         $window.on('scroll', function () {
//             // sticky
//             if ($window.scrollTop()) {
//                 requaired_section.addClass('sticky');
//             } else {
//                 requaired_section.removeClass('sticky');
//             }
//         })
//     }
//
//     sticky_top_section(header);
//
//
//     // //main menu
//     var header_navigation = $('.header-navigation');
//     var navigation_item = $('li.menu-item-has-children');
//     var header_sub_menu = $('.header-sub-menu');
//
//     //main menu mobile
//     function openSubmenu() {
//         // e.preventDefault();
//         // e.stopPropagation();
//         $(this).children('.header-sub-menu').slideToggle(400);
//         $(this).siblings().find(header_sub_menu).slideUp(400);
//         $(this).toggleClass('open').siblings().removeClass('open');
//     }
//
//     function runSubmenu() {
//         navigation_item.off('click', openSubmenu);
//         navigation_item.on('click', openSubmenu);
//     }
//
//
//     var main_navigation_trigger = $('.mobile-menu-trigger');
//     main_navigation_trigger.click(function (e) {
//         e.preventDefault();
//         e.stopPropagation();
//         $(this).toggleClass('active');
//         header_navigation.toggleClass('active');
//     });
//
//
//
//
//
//
//
//
//
//
//
//
//
//     //permutation of blocks
//     function prepend_block(relative_block, prepend_block) {
//         if (relative_block.length) {
//             relative_block.prepend(prepend_block);
//         }
//     }
//
//     function append_block(relative_block, appended_block) {
//         if (relative_block.length) {
//             relative_block.append(appended_block);
//         }
//     }
//
//     function before_block(relative_block, before_block) {
//         if (relative_block.length) {
//             relative_block.before(before_block);
//         }
//     }
//
//     function after_block(relative_block, after_block) {
//         if (relative_block.length) {
//             relative_block.after(after_block);
//         }
//     }
//
//
//     // 580
//
//
//     // 767
//
//     // 991
//
//
//     // 580
//     function permutation_of_blocks_580() {
//
//     }
//
//     function permutation_of_blocks_back_580() {
//
//     }
//
//     // 767
//     function permutation_of_blocks_767() {
//
//     }
//
//     function permutation_of_blocks_back_767() {
//
//     }
//
//     // 991
//     function permutation_of_blocks_991() {
//
//     }
//
//     function permutation_of_blocks_back_991() {
//
//     }
//
//
//     //equalizeHeight
//     $.fn.equalizeHeight = function (options) {
//         var settings = $.extend({
//             'maxWindowWidth': false,
//             'equaltop': false
//         }, options);
//         this.css({'height': 'inherit'});
//         if (!settings.maxWindowWidth || settings.maxWindowWidth < $(window).width()) {
//             var maxHeight = 0;
//             var curentTop = false;
//             var tempArray = new Array();
//             if (!settings.equaltop) {
//                 this.each(function (index, el) {
//                     maxHeight = Math.max(maxHeight, $(el).css('box-sizing') == 'border-box' ? $(el).innerHeight() : $(el).height());
//                 });
//                 this.css({'height': maxHeight + 'px'});
//             } else {
//                 this.each(function (index, el) {
//                     if (curentTop === false || Math.abs(curentTop - $(el).offset().top) > 1) {
//                         $(tempArray).css({'height': maxHeight + 'px'});
//                         maxHeight = 0;
//                         curentTop = Math.floor($(el).offset().top);
//                         tempArray = new Array();
//                     }
//                     maxHeight = Math.max(maxHeight, $(el).css('box-sizing') == 'border-box' ? $(el).innerHeight() : $(el).height());
//                     tempArray.push(el);
//                 })
//                 $(tempArray).css({'height': maxHeight + 'px'});
//             }
//         }
//
//     }
//
//     function fixSizes() {
//
//         $('.products-item-name-and-price').equalizeHeight({
//             equaltop: true
//         });
//
//
//     }
//
//     fixSizes();
//
//
//     // adaptive
//     function adaptive() {
//
//         if ($window.width() <= 991) {
//             permutation_of_blocks_991()
//         }
//
//         if ($window.width() > 991) {
//             permutation_of_blocks_back_991()
//         }
//
//         if ($window.width() <= 767) {
//             permutation_of_blocks_767();
//             runSubmenu();
//
//         }
//
//         if ($window.width() > 767) {
//             permutation_of_blocks_back_767()
//         }
//
//
//         if ($window.width() <= 580) {
//             permutation_of_blocks_580();
//         }
//
//         if ($window.width() > 580) {
//             permutation_of_blocks_back_580();
//         }
//
//
//     }
//
//     adaptive();
//
//
//     // resize
//     $window.resize(function () {
//         adaptive();
//         fixSizes();
//     });
//
// });