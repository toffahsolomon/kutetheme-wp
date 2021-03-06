(function($){
    "use strict"; // Start of use strict
    
    /**==============================
    ***  Change Color tab Category
    ===============================**/
    var $style = jQuery('head style').first();
    
    jQuery('.container[data-target="change-color"]').each(function(){
       var $this  = jQuery(this);
       var $color = $this.data("color");
       var $rgb   = $this.data('rgb');
       var $id = $this.attr("id");
       if( $this.hasClass('option1') ){
            $style.append('#'+$id+'.option1 .nav-menu-red li a:hover,#'+$id+' .nav-menu-red li.active a,#'+$id+' .nav-menu-red li.selected a,#'+$id+' .nav-menu-red,#'+$id+'.option2 .product-list li .add-to-cart:hover,#'+$id+'.option1 .product-list li .add-to-cart:hover, #'+$id+'.option1 .product-list li .quick-view a:hover,#'+$id+'.option1 .owl-controls .owl-prev:hover,#'+$id+'.option1 .owl-controls .owl-next:hover {background: '+$color+';}');
            $style.append( '#'+$id+'.option1 .product-list li .add-to-cart{background-color:rgba( '+$rgb+', 0.5 )}' );
            $style.append( '#'+$id+'{color: '+$color+'}')
       }else if( $this.hasClass('option2') ){
            if( $this.hasClass( 'tab-2' ) ){
                $style.append( '#'+$id+'.option2 .show-brand .navbar-brand,#'+$id+'.option2 .category-featured .nav-menu .nav>li>a:before,#'+$id+'.option2 .product-list li .add-to-cart:hover, #'+$id+'.option2 .product-list li .quick-view a:hover, #'+$id+'.option2 .product-list li .quick-view a:hover {background-color: '+$color+';}' );
                $style.append( '#'+$id+'.option2 .category-featured .nav-menu .nav>li.active a,#'+$id+'.option2 .category-featured .nav-menu .nav>li:hover a,#'+$id+'.option2 .category-featured .sub-category-list a:hover, #'+$id+'.option2 .nav-menu .nav>li:hover a:after, #'+$id+'.option2 .nav-menu .nav>li.active a:after {color: '+$color+';}' );
                $style.append( '#'+$id+'.option2 .category-featured .nav-menu .navbar-collapse{border-bottom-color:'+$color+'}' );
                $style.append( '#'+$id+'.option2 .product-list li .add-to-cart{background-color:rgba( '+$rgb+', 0.7 )}' );
            }else if( $this.hasClass( 'tab-3' ) ){
                $style.append( '#'+$id+'.option2 .category-featured .navbar-brand, #'+$id+'.option2 .category-featured .nav-menu .nav>li>a:before, #'+$id+'.option2 .category-featured .product-list li .add-to-cart:hover, #'+$id+'.option2 .category-featured .product-list li .quick-view a.search:hover, #'+$id+'.option2 .category-featured .product-list li .quick-view a.compare:hover, #'+$id+'.option2 .category-featured .product-list li .quick-view a.heart:hover, #'+$id+'.option2 .product-list li .quick-view a:hover{background-color: '+$color+';}' );
                $style.append( '#'+$id+'.option2 .category-featured .nav-menu .nav>li:hover a, #'+$id+'.option2 .category-featured .nav-menu .nav>li.active a, #'+$id+'.option2 .category-featured .nav-menu .nav>li:hover a:after, #'+$id+'.option2 .category-featured .nav-menu .nav>li.active a:after, #'+$id+'.option2 .category-featured .sub-category-list a:hover {color: '+$color+';}' );
                $style.append( '#'+$id+'.option2 .category-featured .nav-menu .navbar-collapse{border-bottom-color:'+$color+'}' );
                $style.append( '#'+$id+'.option2 .category-featured .product-list li .add-to-cart{background-color:rgba( '+$rgb+', 0.7 )}' );
            }else if( $this.hasClass( 'tab-4' ) ){
                $style.append( '#'+$id+'.option2 .category-featured .navbar-brand, #'+$id+'.option2 .category-featured .nav-menu .nav>li>a:before,#'+$id+'.option2 .category-featured .product-list li .add-to-cart:hover, #'+$id+'.option2 .category-featured .product-list li .quick-view a.search:hover, #'+$id+'.option2 .category-featured .product-list li .quick-view a.compare:hover, #'+$id+'.option2 .category-featured .product-list li .quick-view a.heart:hover, #'+$id+'.option2 .product-list li .quick-view a:hover{background-color: '+$color+';}' );
                $style.append( '#'+$id+'.option2 .category-featured .nav-menu .nav>li:hover a, #'+$id+'.option2 .category-featured .nav-menu .nav>li.active a, #'+$id+'.option2 .category-featured .nav-menu .nav>li:hover a:after, #'+$id+'.option2 .category-featured .nav-menu .nav>li.active a:after, #'+$id+'.option2 .category-featured .sub-category-list a:hover{color: '+$color+';}' );
                $style.append( '#'+$id+'.option2 .category-featured .nav-menu .navbar-collapse{border-bottom-color:'+$color+'}' );
                $style.append( '#'+$id+'.option2 .category-featured .add-to-cart{background-color:rgba( '+$rgb+', 0.7 )}' );
            }
       }else if( $this.hasClass('option3') ){
            
       }
    });
    
    /**==============================
    ***  Effect tab category
    ===============================**/
    $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
      var $this = jQuery(this);
      var $container = $this.closest('.container-tab');
      var $href = $this.attr('href');
      var $tab_active = $container.find($href);
      $tab_active.find('.owl-item.active').each(function($i){
            var $item = jQuery(this);
            var $style = $item.attr("style");
            var delay = $i * 300;
            $item.attr("style",$style +
                      "-webkit-animation-delay:" + delay + "ms;"
                    + "-moz-animation-delay:" + delay + "ms;"
                    + "-o-animation-delay:" + delay + "ms;"
                    + "animation-delay:" + delay + "ms;"
            ).addClass('slideInTop animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                $item.removeClass('slideInTop animated');
                $item.attr("style", $style);
            }); 
        });
    });
    
    /* ---------------------------------------------
     Quick view
     ---------------------------------------------*/
     $(document).on('click','.btn-quick-view',function(){
        var product_id = $(this).data('id');
        var data = {
            action: 'frontend_product_quick_view',
            security : screenReaderText.security,
            product_id: product_id
        };
        $(this).append('<i class="fa fa-spinner fa-spin"></i>');
        
        var t = $(this);
        $.post(screenReaderText.ajaxurl, data, function(response){
            t.find('.fa').remove();
            $.fancybox(response, {
              // fancybox API options
              fitToView: false,
              autoSize: false,
              closeClick: false,
              openEffect: 'none',
              closeEffect: 'none'
            }); // fancybox
        })
        return false;
     });
    
    /* ---------------------------------------------
     Scripts initialization
     --------------------------------------------- */
    $(window).load(function() {
        // auto width megamenu
        auto_width_megamenu();
        resizeTopmenu();
    });
    /* ---------------------------------------------
     Scripts ready
     --------------------------------------------- */
    $(document).ready(function() {
        show_other_item_vertical_menu();
        /* Resize top menu*/
        resizeTopmenu();
        /* Zoom image */
        if($('#product-zoom').length >0){
            $('#product-zoom').elevateZoom({
                zoomType: "inner",
                cursor: "crosshair",
                zoomWindowFadeIn: 500,
                zoomWindowFadeOut: 750,
                gallery:'gallery_01'
            }); 
        }
        /* Popup sizechart */
        if($('#size_chart').length >0){
            $('#size_chart').fancybox();
        }
        /** OWL CAROUSEL**/
        $(".owl-carousel").each(function(index, el) {
          var config = $(this).data();
          config.navText = ['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>'];
          config.smartSpeed="300";
          if($(this).hasClass('owl-style2')){
            config.animateOut="fadeOut";
            config.animateIn="fadeIn";    
          }
          $(this).owlCarousel(config);
        });
        $(".owl-carousel-vertical").each(function(index, el) {
          var config = $(this).data();
          config.navText = ['<span class="icon-up"></spam>','<span class="icon-down"></span>'];
          config.smartSpeed="900";
          config.animateOut="";
            config.animateIn="fadeInUp";
          $(this).owlCarousel(config);
        });
        /** COUNT DOWN **/
        $('.count-down-time[data-countdown]').each(function() { 
           var $this = $(this), finalDate = $(this).data('countdown');
           if( ! $this.hasClass( 'countdown-lastest' ) ){
               $this.countdown(finalDate, function(event) {
                 var fomat ='<span>%H</span><b></b><span>%M</span><b></b><span>%S</span>';
                 $this.html(event.strftime(fomat));
               });
            }else{
                $this.countdown(finalDate, function(event) {
                 var fomat = '<span class="box-count"><span class="number">%D</span> <span class="text">Days</span></span><span class="dot">:</span><span class="box-count"><span class="number">%H</span> <span class="text">Hrs</span></span><span class="dot">:</span><span class="box-count"><span class="number">%M</span> <span class="text">Mins</span></span><span class="dot">:</span><span class="box-count"><span class="number">%S</span> <span class="text">Secs</span></span>';
                 $this.html(event.strftime(fomat));
               });
                            
            }
        });
        
        $('.stick-countdown').each(function() {
           var $this = $(this),
           $parent = $this.closest('.container-data-time');
           var $time = 0;
           var $date_time = 0;
           var $data = $parent.find('.data-time[data-countdown]').each(function(){
                var $e = jQuery(this);
                var $data_time = $e.data('strtotime');
                var $data_datetime = $e.data('time');
                if($data_time > $time){
                    $time = $data_time;
                    $date_time = $data_datetime;
                }
           });
           $this.countdown($date_time, function(event) {
             var fomat = '<span class="box-count"><span class="number">%D</span> <span class="text">Days</span></span><span class="dot">:</span><span class="box-count"><span class="number">%H</span> <span class="text">Hrs</span></span><span class="dot">:</span><span class="box-count"><span class="number">%M</span> <span class="text">Mins</span></span><span class="dot">:</span><span class="box-count"><span class="number">%S</span> <span class="text">Secs</span></span>';
             $this.html(event.strftime(fomat));
           });
        });
        
        /* Close top banner*/
        $(document).on('click','.btn-close',function(){
            $(this).closest('.top-banner').animate({ height: 0, opacity: 0 },1000);
            return false;
        })
        /** SELECT CATEGORY **/
        $('.select-category').select2();
        /* Toggle nav menu*/
        $(document).on('click','.toggle-menu',function(){
            $(this).closest('.nav-menu').find('.navbar-collapse').toggle();
            return false;
        })
        /** HOME SLIDE**/
        if($('#home-slider').length >0 && $('#contenhomeslider').length >0){
            var slider = $('#contenhomeslider').bxSlider(
                {
                    nextText:'<i class="fa fa-angle-right"></i>',
                    prevText:'<i class="fa fa-angle-left"></i>',
                    auto: true,
                }

            );
        }
        /** Custom page sider**/
        if($('#home-slider').length >0 && $('#contenhomeslider-customPage').length >0){
            var slider = $('#contenhomeslider-customPage').bxSlider(
                {
                    nextText:'<i class="fa fa-angle-right"></i>',
                    prevText:'<i class="fa fa-angle-left"></i>',
                    auto: true,
                    pagerCustom: '#bx-pager',
                    nextSelector: '#bx-next',
                    prevSelector: '#bx-prev',
                }

            );
        }

        if($('#home-slider').length >0 && $('#slide-background').length >0){
            var slider = $('#slide-background').bxSlider(
                {
                    nextText:'<i class="fa fa-angle-right"></i>',
                    prevText:'<i class="fa fa-angle-left"></i>',
                    auto: true,
                    onSlideNext: function ($slideElement, oldIndex, newIndex) {
                       var corlor = $($slideElement).data('background');   
                       $('#home-slider').css('background',corlor);     
                    },
                    onSlidePrev: function ($slideElement, oldIndex, newIndex) {
                       var corlor = $($slideElement).data('background');   
                       $('#home-slider').css('background',corlor);     
                    }
                }

            );
            //slider.goToNextSlide();
        }
        
        /* elevator click*/ 
        $(document).on('click','a.btn-elevator',function(e){
            e.preventDefault();
            var target = this.hash;
            if($(document).find(target).length <=0){
                return false;
            }
            var $target = $(target);
            $('html, body').stop().animate({
                'scrollTop': $target.offset().top-50
            }, 500);
            return false;
        })
        /* scroll top */ 
        $(document).on('click','.scroll_top',function(){
            $('body,html').animate({scrollTop:0},400);
            return false;
        })
        /** #brand-showcase */
        $(document).on('click','.brand-showcase-logo li',function(){
            var id = $(this).data('tab');
            $(this).closest('.brand-showcase-logo').find('li').each(function(){
                $(this).removeClass('active');
            });
            $(this).closest('li').addClass('active');
            $('.brand-showcase-content').find('.brand-showcase-content-tab').each(function(){
                $(this).removeClass('active');
            })
            $('#'+id).addClass('active');
            return false;
        })
        // CATEGORY FILTER 
        $('.slider-range-price').each(function(){
            var min             = $(this).data('min');
            var max             = $(this).data('max');
            var unit            = $(this).data('unit');
            var value_min       = $(this).data('value-min');
            var value_max       = $(this).data('value-max');
            var label_reasult   = $(this).data('label-reasult');
            var t               = $(this);
            $( this ).slider({
              range: true,
              min: min,
              max: max,
              values: [ value_min, value_max ],
              slide: function( event, ui ) {
                var result = label_reasult +" "+ unit + ui.values[ 0 ] +' - '+ unit +ui.values[ 1 ];
                console.log(t);
                t.closest('.slider-range').find('.amount-range-price').html(result);
              }
            });
        })
        /** ALL CAT **/
        $(document).on('click','.open-cate',function(){
            $(this).closest('.vertical-menu-content').find('li.cat-link-orther').each(function(){
                $(this).slideDown();
            });
            $(this).addClass('colse-cate').removeClass('open-cate').html('Close');
        })
        /* Close category */
        $(document).on('click','.colse-cate',function(){
            $(this).closest('.vertical-menu-content').find('li.cat-link-orther').each(function(){
                $(this).slideUp();
            });
            $(this).addClass('open-cate').removeClass('colse-cate').html('All Categories');
            return false;
        })
        // bar ontop click
        $(document).on('click','.vertical-megamenus-ontop-bar',function(){
            $('#vertical-megamenus-ontop').find('.box-vertical-megamenus').slideToggle();
            $('#vertical-megamenus-ontop').toggleClass('active');
            return false;
        })
        // View grid list product 
        $(document).on('click','.display-product-option .view-as-grid',function(){
            $(this).closest('.display-product-option').find('li').removeClass('selected');
            $(this).addClass('selected');
            $(this).closest('.view-product-list').find('.product-list').removeClass('list').addClass('grid');
            var data = {
                action: 'fronted_set_products_view_style',
                security : screenReaderText.security,
                style: 'grid'
            };
            $.post(screenReaderText.ajaxurl, data, function(response){
               // console.log(response);
            })
            return false;
        })
        // View list list product 
        $(document).on('click','.display-product-option .view-as-list',function(){
            $(this).closest('.display-product-option').find('li').removeClass('selected');
            $(this).addClass('selected');
            $(this).closest('.view-product-list').find('.product-list').removeClass('grid').addClass('list');
            var data = {
                action: 'fronted_set_products_view_style',
                security : screenReaderText.security,
                style: 'list'
            };
            $.post(screenReaderText.ajaxurl, data, function(response){
                //console.log(response);
            })
            return false;
        })

        /// tre menu category
        $(document).on('click','.tree-menu li span',function(){
            $(this).closest('li').children('ul').slideToggle();
            if($(this).closest('li').haschildren('ul')){
                $(this).toggleClass('open');
            }
            return false;
        })
        /* Open menu on mobile */
        $(document).on('click','.btn-open-mobile',function(){
            var width = $(window).width();
            if(width >1024){
                if($('body').hasClass('home')){
                    if($('#nav-top-menu').hasClass('nav-ontop')){
                    }else{
                        return false;
                    }
                }
            }
            $(this).closest('.box-vertical-megamenus').find('.vertical-menu-content').slideToggle();
            $(this).closest('.title').toggleClass('active');
            return false;
        })
        /* Product qty */
        $(document).on('click','.btn-plus-down',function(){
            var value = parseInt($('#option-product-qty').val());
            value = value -1;
            if(value <=0) return false;
            $('#option-product-qty').val(value);
            return false;
        })
        $(document).on('click','.btn-plus-up',function(){
            var value = parseInt($('#option-product-qty').val());
            value = value +1;
            if(value <=0) return false;
            $('#option-product-qty').val(value);
            return false;
        })
        /* Close vertical */
        $(document).on('click','*',function(e){
            var container = $("#box-vertical-megamenus");
            if (!container.is(e.target) && container.has(e.target).length === 0){
                if($('body').hasClass('home')){
                    if($('#nav-top-menu').hasClass('nav-ontop')){
                    }else{
                        return;
                    }
                }
                container.find('.vertical-menu-content').hide();
                container.find('.title').removeClass('active');
            }
        })
        /* Send conttact*/
        $(document).on('click','#btn-send-contact',function(){
            var subject = $('#subject').val(),
                email   = $('#email').val(),
                order_reference = $('#order_reference').val(),
                message = $('#message').val();
            var data = {
                subject:subject,
                email:email,
                order_reference:order_reference,
                message:message
            }
            $.post('ajax_contact.php',data,function(result){
                if(result.trim()=="done"){
                    $('#email').val('');
                    $('#order_reference').val('');
                    $('#message').val('');
                    $('#message-box-conact').html('<div class="alert alert-info">Your message was sent successfully. Thanks</div>');
                }else{
                    $('#message-box-conact').html(result);
                }
            })
        })

        // OWL Product thumb
        $('.product .thumbnails').owlCarousel(
            {
                dots:false,
                nav:true,
                items:3,
                navText:['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>'],
                margin:19

            }
        );

        // OWl related product
        $('.related.products .product-list,.upsells.products .product-list').owlCarousel(
            {
                dots:false,
                nav:true,
                items:3,
                navText:['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>']

            }
        );
    });
    /* ---------------------------------------------
     Scripts resize
     --------------------------------------------- */
    $(window).resize(function(){
        // auto width megamenu
        auto_width_megamenu();
        // Remove menu ontop
        remove_menu_ontop();
        // resize top menu
        resizeTopmenu();
    });
    /* ---------------------------------------------
     Scripts scroll
     --------------------------------------------- */
    $(window).scroll(function(){
        /* Show hide scrolltop button */
        if( $(window).scrollTop() == 0 ) {
            $('.scroll_top').stop(false,true).fadeOut(600);
        }else{
            $('.scroll_top').stop(false,true).fadeIn(600);
        }
        /* Main menu on top */
        var h = $(window).scrollTop();
        var max_h = $('#header').height() + $('#top-banner').height();
        var width = $(window).width();
        if(width > 767){
            if( h > (max_h + vertical_menu_height)-50){
                // fix top menu
                $('#nav-top-menu').addClass('nav-ontop');
                //$('#nav-top-menu').find('.vertical-menu-content').hide();
                //$('#nav-top-menu').find('.title').removeClass('active');
                // add cart box on top menu
                $('#cart-block .cart-block').appendTo('#shopping-cart-box-ontop .shopping-cart-box-ontop-content');
                $('#shopping-cart-box-ontop').fadeIn();
                $('#user-info-top').appendTo('#user-info-opntop');
                $('#header .header-search-box form').appendTo('#form-search-opntop');
            }else{
                $('#nav-top-menu').removeClass('nav-ontop');
                if($('body').hasClass('home')){
                    $('#nav-top-menu').find('.vertical-menu-content').removeAttr('style');
                    if(width > 1024)
                        $('#nav-top-menu').find('.vertical-menu-content').show();
                    else{
                        $('#nav-top-menu').find('.vertical-menu-content').hide();
                    }
                     $('#nav-top-menu').find('.vertical-menu-content').removeAttr('style');
                }
                ///
                $('#shopping-cart-box-ontop .cart-block').appendTo('#cart-block');
                $('#shopping-cart-box-ontop').fadeOut();
                $('#user-info-opntop #user-info-top').appendTo('.top-header .container');
                $('#form-search-opntop form').appendTo('#header .header-search-box');
            }
        }
    });
    var vertical_menu_height = $('#box-vertical-megamenus .box-vertical-megamenus').innerHeight();
    /**==============================
    ***  Auto width megamenu
    ===============================**/
    function auto_width_megamenu(){
        var full_width = parseInt($('.container').innerWidth());
        //full_width = $( document ).width();
        var menu_width = parseInt($('.vertical-menu-content').actual('width'));
        $('.vertical-menu-content').find('.megamenu').each(function(){
            $(this).width((full_width - menu_width)-32);
        });
        
        if($(window).width()+scrollCompensate() < 1025){
            $("#box-vertical-megamenus li.dropdown:not(.active) >a").attr('data-toggle','dropdown');
        }else{
            $("#box-vertical-megamenus li.dropdown >a").removeAttr('data-toggle');
        }
    }
    /**==============================
    ***  Remove menu on top
    ===============================**/
    function remove_menu_ontop(){
        var width = parseInt($(window).width());
        if(width < 768){
            $('#nav-top-menu').removeClass('nav-ontop');
            if($('body').hasClass('home')){
                if(width > 1024)
                    $('#nav-top-menu').find('.vertical-menu-content').show();
                else{
                    $('#nav-top-menu').find('.vertical-menu-content').hide();
                }
            }
            ///
            $('#shopping-cart-box-ontop .cart-block').appendTo('#cart-block');
            $('#shopping-cart-box-ontop').fadeOut();
            $('#user-info-opntop #user-info-top').appendTo('.top-header .container');
            $('#form-search-opntop form').appendTo('#header .header-search-box');
        }
    }
    /* Top menu*/
    function scrollCompensate(){
        var inner = document.createElement('p');
        inner.style.width = "100%";
        inner.style.height = "200px";
        var outer = document.createElement('div');
        outer.style.position = "absolute";
        outer.style.top = "0px";
        outer.style.left = "0px";
        outer.style.visibility = "hidden";
        outer.style.width = "200px";
        outer.style.height = "150px";
        outer.style.overflow = "hidden";
        outer.appendChild(inner);
        document.body.appendChild(outer);
        var w1 = parseInt(inner.offsetWidth);
        outer.style.overflow = 'scroll';
        var w2 = parseInt(inner.offsetWidth);
        if (w1 == w2) w2 = outer.clientWidth;
        document.body.removeChild(outer);
        return (w1 - w2);
    }

    function resizeTopmenu(){
        if($(window).width() + scrollCompensate() >= 768){
            var main_menu_w = $('#main-menu .navbar').innerWidth();
            $("#main-menu ul.mega_dropdown").each(function(){
                var menu_width = $(this).innerWidth();
                var offset_left = $(this).position().left;

                if(menu_width > main_menu_w){
                    $(this).css('width',main_menu_w+'px');
                    $(this).css('left','0');
                }else{
                    if((menu_width + offset_left) > main_menu_w){
                        var t = main_menu_w-menu_width;
                        var left = parseInt((t/2));
                        $(this).css('left',left);
                    }
                }
            });
        }

        if($(window).width()+scrollCompensate() < 1025){
            $("#main-menu li.dropdown:not(.active) >a").attr('data-toggle','dropdown');
        }else{
            $("#main-menu li.dropdown >a").removeAttr('data-toggle');
        }
    }


    function show_other_item_vertical_menu(){
      if($('.box-vertical-megamenus').length >0){
          var all_item = 0;
          $('.box-vertical-megamenus').find('.vertical-menu-list>li').each(function(i){
              all_item = all_item +1;
              if(i>10){
                $(this).addClass('cat-link-orther');
              }
          })
      }
    }
})(jQuery); // End of use strict