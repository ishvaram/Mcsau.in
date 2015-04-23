var $ = jQuery.noConflict();

function image_preload(selector, parameters) {
	var params = {
		delay: 200,
		transition: 400,
		easing: 'linear'
	};
	jQuery.extend(params, parameters);
		
	jQuery(selector).each(function() {
		var image = $(this);
		image.css({visibility:'hidden', opacity: 0, display:'block'});
		image.wrap('<span class="preloader" />');
		image.one("load", function(evt) {
			$(this).delay(params.delay).css({visibility:'visible'}).animate({opacity: 1}, params.transition, params.easing, function() {
				$(this).unwrap('<span class="preloader" />');
			});
		}).each(function() {
			if(this.complete) $(this).trigger("load");
		});
	});
}


function tab_widget(tabid) {
    
    var $sidebarWidgets = $('.sidebar-widgets-wrap');
    var $footerWidgets = $('.footer-widgets-wrap');
    
    $( tabid + " .tab_content").hide();
    $( tabid + " ul.tabs li:first").addClass("active").show();
    $( tabid + " .tab_content:first").show();
    $( tabid + " ul.tabs li").click(function() {    
		
        $( tabid + " ul.tabs li").removeClass("active");
        $(this).addClass("active");		
        $( tabid + " .tab_content").hide();
        var activeTab = $(this).find("a").attr("data-href");
        var $selectTab = $(this);
        $(activeTab).fadeIn(600,function(){
            if( $selectTab.parent().parent().hasClass("side-tabs") ) {
                if( $(window).width() < 768 ) { if( $().scrollTo ) { jQuery.scrollTo( activeTab , 400, {offset:-20} ); } }
            }            
        });
        return false;
        
	});
    
}

// php strstr alternative for jquery
function strstr(haystack, needle, bool) {
  //  discuss at: http://phpjs.org/functions/strstr/
  // original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // bugfixed by: Onno Marsman
  // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  //   example 1: strstr('Kevin van Zonneveld', 'van');
  //   returns 1: 'van Zonneveld'
  //   example 2: strstr('Kevin van Zonneveld', 'van', true);
  //   returns 2: 'Kevin '
  //   example 3: strstr('name@example.com', '@');
  //   returns 3: '@example.com'
  //   example 4: strstr('name@example.com', '@', true);
  //   returns 4: 'name'

  var pos = 0;
  haystack += '';
  pos = haystack.indexOf(needle);
  if (pos == -1) {
    return false;
  } else {
    if (bool) {
      return haystack.substr(0, pos);
    } else {
      return haystack.slice(pos);
    }
  }
}



jQuery(document).ready(function($) {	

			//smooth scrolling for One Page template
			
			$(function() {			  	
			  jQuery('#nav.one-page-template a').click(function() {
				if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
				  var target = $(this.hash);
				  var id = $(this).attr('href');
				  var header = $('header').attr('header-version');
				  var header_height = 90;
				  
				  if (header == 'v2' || header == 'v3') header_height = 142;				  
				  
				  //alert(header_height);
				  target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
				  if (target.length && (id != '#home')) {
					$('html,body').animate({ scrollTop: target.offset().top - header_height }, 1000);
					return false;
				  }
				  else if(target.length && (id == '#home')) {
				  	$('html,body').animate({ scrollTop: 0}, 1000);
					return false;
				  }
				}
			  });
			  jQuery('#mobile-menu.one-page-template a').click(function() {
				if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
				  var target = $(this.hash);
				  var id = $(this).attr('href');
				  
				  target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
				  if (target.length && (id != '#home')) {
					$('html,body').animate({ scrollTop: target.offset().top}, 1000);
					return false;
				  }
				  else if(target.length && (id == '#home')) {
				  	$('html,body').animate({ scrollTop: 0}, 1000);
					return false;
				  }
				}
			  });
			});		
			
			// Scroll to Top
			//if($(window).width() > 979) {        
				$(window).scroll(function() {
					if($(this).scrollTop() > 450) {
						$('#gotoTop').fadeIn();
					} else {
						$('#gotoTop').fadeOut();
					}
				});				
				
				$('#gotoTop').click(function() {
					$('body,html').animate({scrollTop:0},400);
					return false;
				});
			//}
			
			//test if vc-editor is enabled or not
			if(!strstr(window.location.href, 'vceditor=true')) {
				jQuery(".player").mb_YTPlayer();
			}

			if(jQuery('.sticky-header').length >= 1 && $(window).width() > 979) {
				jQuery(window).scroll(function() {
					 var header = jQuery(document).scrollTop();
					 var logo = jQuery('#logo img').height();
					 var menuitem = jQuery('html:not(.js) #header nav > ul > li > a').height();
					 var headerHeight = jQuery('#top-bar').height();
					 var marginWrapper = parseInt(jQuery("#wrapper").css("margin-top"));
					 
					 if(marginWrapper > 0 && headerHeight > 0) {
						 headerHeight = headerHeight + marginWrapper;
					 }
					 
					 if(marginWrapper > 0 && !headerHeight) {
						 headerHeight = marginWrapper;
					 }
		
					 if(!headerHeight) {
						headerHeight = 1;
					 }
		
					 if(header > headerHeight) {
						//jQuery('.header-v1,.header-v2,.header-v3,.header-v4,.header-v5').hide();
						jQuery('.sticky-header').addClass('sticky');
						jQuery('.sticky').fadeIn();
						if ($(this).scrollTop()>140 ){
							/*
							$('.sticky #logo img').stop().animate({ height: 70 },80);
							$('html:not(.js) #header.sticky nav > ul > li > a').stop().animate({ 'line-height': 70 },50);
							*/
							$('#header.sticky-header').addClass("reduced");
						}
						else{							
							$('#header.sticky-header.reduced').removeClass("reduced");
						}
						
					 } else {
						//jQuery('.header-v1,.header-v2,.header-v3,.header-v4,.header-v5').show();
						jQuery('.sticky-header').removeClass('sticky');
						jQuery('.sticky-header').hide();
					 }
				});
			}	
		/*	
		$('.expand').each(function() {	
			$('.expand').height(function(index, height) {
				return window.innerHeight - $(this).offset().top;
			});
			$(window).resize(function() {
				$('.expand').height(function(index, height) {
					return window.innerHeight - $(this).offset().top;
				});
			});
		});
		*/
		// Tabs
		//When page loads...
		$('.tab_widget').each(function() {
			$(this).find(".tab_content").hide(); //Hide all content
			$(this).find("ul.tabs li:first").addClass("active").show(); //Activate first tab
			$(this).find(".tab_content:first").show(); //Show first tab content
		});
		
		//On Click Event
		$("ul.tabs li").click(function(e) {
			$(this).parents('.tab_widget').find("ul.tabs li").removeClass("active"); //Remove any "active" class
			$(this).addClass("active"); //Add "active" class to selected tab
			$(this).parents('.tab_widget').find(".tab_content").hide(); //Hide all tab content
	
			var activeTab = $(this).find("a").attr("href"); //Find the href attribute value to identify the active tab + content
			$(this).parents('.tab_widget').find(activeTab).fadeIn(); //Fade in the active ID content
			
			e.preventDefault();
		});
		
		$("ul.tabs li a").click(function(e) {
			e.preventDefault();
		})
		
		//Call to action auto padding
		
			$('.promo').each(function() {				
				var align = $(this).attr('data-style');			
				if(align != 'center') {
					var button_width = $(this).find('.promo-action').width();

					if($(window).width() > 767) {
						$(this).find('.promo-desc').css('padding-right', button_width);				
					}
				}
				
			});
				
			if($(window).width() > 767) {	
				var button_cta = $('#call_action .promo-action').width()+35;		
				$('#call_action .promo-text').css('padding-right', button_cta);				
			}
			
			$('.woocommerce_message').each(function() {
				$(this).find('.button.wc-forward').addClass('simple-button default_color small inverse').removeClass('button wc-forward');
			});
			
			$('.checkout_log').each(function() {
				$(this).find('.button').addClass('simple-button default_color small inverse').removeClass('button');
			});
			
				
       /***************** PARALLAX SECTIONS ******************/


		var $window = $(window);
		var windowHeight = $window.height();
		
		$window.resize(function () {
			windowHeight = $window.height();
		});
		
		$.fn.parallax = function(xpos, speedFactor, outerHeight) {
			var $this = $(this);
			var getHeight;
			var firstTop;
			var paddingTop = 0;
			
			//get the starting position of each element to have parallax applied to it		
			$this.each(function(){
				firstTop = $this.offset().top;
			});
			
			$window.resize(function () {
				$this.each(function(){
					firstTop = $this.offset().top;
				});
			});
			
			$window.load(function(){
				$this.each(function(){
					firstTop = $this.offset().top;
				}); 
			});
		 
		
			getHeight = function(jqo) {
				return jqo.outerHeight(true);
			};
			 
				
			// setup defaults if arguments aren't specified
			if (arguments.length < 1 || xpos === null) xpos = "50%";
			if (arguments.length < 2 || speedFactor === null) speedFactor = 0.1;
			if (arguments.length < 3 || outerHeight === null) outerHeight = true;
			
			// function to be called whenever the window is scrolled or resized
			function update(){
				var pos = $window.scrollTop();				
		
				$this.each(function(){
					var $element = $(this);
					var top = $element.offset().top;
					var height = getHeight($element);
					// Check if totally above or totally below viewport
					if (top + height < pos || top > pos + windowHeight) {
						return;
					}
		
					$this.css('backgroundPosition', xpos + " " + Math.round((firstTop - pos) * speedFactor) + "px");
				});
			}		
		
			$window.bind('scroll', update).resize(update);
			update();
		};
		
		$('.parallax_section').each(function(){

		   $(".parallax_section").parallax("50%", 0.2);
		});
	   
	   
		function initSF(){

			$(".sf-menu").superfish({
				 delay: 900,
				 speed: 'fast',
				 speedOut:      'fast',             
				 animation:   {opacity:'show'}
			}); 
	
		}
		
		$('#header nav > ul > li').mouseleave(function(){
			if(!$(this).hasClass('megamenu')){
				$(this).find('> ul').stop(true,true).fadeOut();
			}
		});
		
		function addOrRemoveSF(){
			var $smoothActive = $('body').attr('data-responsive');
			if( window.innerWidth < 980 && $smoothActive == "true" ){
				$('body').addClass('mobile');
				$('#header nav').hide();
			}
			
			else {
				$('body').removeClass('mobile');
				$('#header nav').show();
				$('#mobile-menu').hide();
				
				//recalc height of dropdown arrow
				//$('.sf-sub-indicator').css('height',$('a.sf-with-ul').height());
			}
		}
		
		addOrRemoveSF();
		initSF();
		
		$(window).resize(addOrRemoveSF);
	
		function SFArrows(){
	
			//set height of dropdown arrow
			$('.sf-sub-indicator').css('height',$('a.sf-with-ul').height());
		}
		
		//SFArrows();
		
		//responsive nav
		$('#toggle-nav').click(function(){
			
			$('#mobile-menu').stop(true,true).slideToggle(500);
			return false;
		});
		
		////append dropdown indicators / give classes
		$('#mobile-menu .container ul li').each(function(){
			if($(this).find('> ul').length > 0) {
				 $(this).addClass('has-ul');
				 $(this).find('> a').append('<span class="sf-sub-indicator"><i class="fa-plus-square"></i></span>');
			}
		});
		
		////events
		$('#mobile-menu .container ul li:has(">ul") > a .sf-sub-indicator').click(function(){
			$(this).parent().parent().toggleClass('open');
			$(this).parent().parent().find('> ul').stop(true,true).slideToggle();
			return false;
		});
		
		jQuery('a.add_to_cart_button').click(function(e) {
			var link = this;
			jQuery(link).parents('.product').find('.cart-loading').find('i').removeClass('fa-check').addClass('fa-refresh');
			jQuery(this).parents('.product').find('.cart-loading').fadeIn();
			setTimeout(function(){
				jQuery(link).parents('.product').find('.cart-loading').find('i').hide().removeClass('fa-refresh').addClass('fa-check').fadeIn();
	
				setTimeout(function(){
					jQuery(link).parents('.product').find('.cart-loading').fadeOut().parents('.product').find('.product-images img').animate({opacity: 1});;
				}, 2000);
			}, 2000);
		});
	
		jQuery('li.product').mouseenter(function() {
			if(jQuery(this).find('.cart-loading').find('i').hasClass('fa-check')) {
				jQuery(this).find('.cart-loading').fadeIn();
			}
		}).mouseleave(function() {
			if(jQuery(this).find('.cart-loading').find('i').hasClass('fa-check')) {
				jQuery(this).find('.cart-loading').fadeOut();
			}		
		});
		
		jQuery('li.cart').mouseenter(function() {
			
				jQuery(this).find('.cart-contents').fadeIn();
			
		}).mouseleave(function() {
			
				jQuery(this).find('.cart-contents').fadeOut();
			/*
			if(jQuery(this).find('.cart-loading').find('i').hasClass('fa-check')) {
				jQuery(this).find('.cart-loading').fadeOut();
			}*/		
		});
        
        // ToolTips
        
        if ( $().tipsy ) { nTip=function(){ $('.ntip').tipsy({gravity: 's', fade:true}); }; nTip(); }
		if ( $().tipsy ) { sTip=function(){ $('.stip').tipsy({gravity: 'n', fade:true}); }; sTip(); }
		if ( $().tipsy ) { eTip=function(){ $('.etip').tipsy({gravity: 'w', fade:true}); }; eTip(); }
		if ( $().tipsy ) { wTip=function(){ $('.wtip').tipsy({gravity: 'e', fade:true}); }; wTip(); }
        
        
        $("#primary-menu ul li:has(ul)").addClass('sub-menu');

		// Portfolio Items Filter 
		
			portfolioItemsFilter=function(){
                        
            	var $container = $('#portfolio');
                            
				$container.isotope();
                            
                $('#portfolio-filter a').click(function(){
                                
                	$('#portfolio-filter li').removeClass('activeFilter');
                    $(this).parent('li').addClass('activeFilter');
                    var selector = $(this).attr('data-filter');
                    $container.isotope({ filter: selector });
                    return false;
                                
                });
                            
                $(window).resize(function() {
                	$container.isotope('reLayout');
				});
        
			};
			
			portfolioItemsFilter();
			
			 // Accordions
    		$('.accordion').each(function() {
				var id = $(this).attr('data-unique-id');
				$('.accordion-wrap-'+id+' .acc_content').hide(); //Hide/close all containers
				$('.accordion-wrap-'+id+' .acctitle:first').addClass('acctitlec').next().show(); //Add "active" class to first trigger, then show/open the immediate next container
		
				//On Click
				$('.accordion-wrap-'+id+' .acctitle').click(function(){
					if( $(this).next().is(':hidden') ) { //If immediate next container is closed...
						$('.accordion-wrap-'+id+' .acctitle').removeClass('acctitlec').next().slideUp("normal"); //Remove all "active" state and slide up the immediate next container
						$(this).toggleClass('acctitlec').next().slideDown("normal"); //Add "active" state to clicked trigger and slide down the immediate next container
					}
					return false; //Prevent the browser jump to the link anchor
				});
			});
			
			// FAQs filtering

			faqItemsFilter=function(){
				
				$('.faqs_wrap').each(function() {
				
					var faqName = $(this).attr('data-name');				
					
					var $faqItems = $('#faqs' +faqName+ ' .toggle');                            
				
					$('#faq-filter'+faqName+' a').click(function(){
						
						$('#faq-filter'+faqName+' li').removeClass('activeFilter');
						
						$(this).parent('li').addClass('activeFilter');
						
						var faqSelector = $(this).attr('data-filter');					
						
						$faqItems.css('display', 'none');
						
						if( faqSelector != ('all'+faqName) ) {
							
							$( faqSelector ).fadeIn(500);
							
						} else {
							
							$faqItems.fadeIn(500);
						}
						
						return false;
						
					}); 
				
				});
                        

			};
			
			faqItemsFilter();

        // Top Socials
        
        topSocialExpander=function(){
            
            var windowWidth = $(window).width();
        
                
                $("#top-social li").show();
                
                $("#top-social li a").css({width: 40});
                
                $("#top-social li a").each(function() {
                    $(this).addClass('stip');
                    var topIconTitle = $(this).children('.ts-text').text();
                    $(this).attr('title', topIconTitle);
                });
                
                sTip();
                
                $("#top-social li a").hover(function() {
                    $(this).stop().animate({width: 40}, 1, 'jswing');
        		}, function() {
        			$(this).stop().animate({width: 40}, 1, 'jswing');
        		});
                /*
                if( windowWidth < 479 ) {
                    
                    $("#top-social li").hide();
                    $("#top-social li").slice(0, 8).show();
                    
                }*/
                
            
        
        };
		topSocialExpander();
        
        $(window).resize(function() {
            topSocialExpander();
        });
        
        
        // Siblings Fader
        
        siblingsFader=function(){
		$(".siblings_fade,.flickr_badge_image").hover(function() {
			$(this).siblings().stop().fadeTo(400,0.5);
		}, function() {
			$(this).siblings().stop().fadeTo(400,1);
		});
		};
		siblingsFader();
        
        
        // Images Preload
        
        image_preload('.portfolio-image img, .portfolio-image-round img, .product-loop-thumb  img.product-loop-image, #kwicks-slider img,.rs-slider img, .ipost-image img');
        
        $('.port-gallery').each(function(){ $(this).addClass('preloader'); });
		//$('.portfolio-image').each(function(){ $(this).addClass('preloader'); });
        
        $('.fslider').each(function(){ $(this).addClass('preloader2'); });
		
        
        
        // Image Fade
        
		imgFade=function(){
		$('.image_fade,#top-menu li.top-menu-em a').hover(function(){
			$(this).filter(':not(:animated)').animate({opacity: 0.6}, 400);
		}, function () {
			$(this).animate({opacity: 1}, 400);
		});
		};
		imgFade();
        
        
        // Toggles
        
        $(".togglec").hide();
		
		$(".togglec.open").show();
    	
    	$(".togglet").click(function(){
    	
    	   $(this).toggleClass("toggleta").next(".togglec, .togglec.open").slideToggle("normal");
    	   return true;
        
    	});
        
        
        // Pricing Tables
        
        $('.pricing-defines').each( function(){
            
            var pricingDefinesTop = $(this).next().find('.pricing-features').position();
            
            var pricingDefinesParentHeight = $(this).next().outerHeight();
            
            $(this).find('.pricing-features').css( 'margin-top', (pricingDefinesTop.top - 1) + 'px' );
            
            $(this).find('.pricing-inner').css( 'height', (pricingDefinesParentHeight - 1) + 'px' );
            
        });

        // Portfolio Hoverlay
        
		
        imgHoverlay=function(){
			$('.portfolio-overlay').each( function() { $(this).hoverdir({
				hoverDelay : 0
			}); } );
			$('.portfolio-image, .portfolio-image-round, .ipost-image, .entry_image_sh, .rpost-image, #portfolio-related-items li, .slide').hover(function(){
				$(this).find('.portfolio-overlay,.portfolio-overlay-round').filter(':not(:animated)').animate({opacity: 'show'}, 400);
			}, function () {
				$(this).find('.portfolio-overlay,.portfolio-overlay-round').animate({opacity: 'hide'}, 200);
			});
			
		};
		imgHoverlay();
   
        
        // FitVids
        
        if ( $().fitVids ) { $("#content,#footer,#slider:not(.layerslider-wrap),.landing-offer-media").fitVids( { customSelector: "iframe[src^='http://www.dailymotion.com/embed']"} ); }
        
        
        // prettyPhoto
        
        if ( $().prettyPhoto ) {
            
            initprettyPhoto=function(){
                
                $("a[rel^='prettyPhoto']").prettyPhoto({ theme: 'light_square' });
            
            };
            initprettyPhoto();
        
        }
        
        
        // Mobile Menu
        
        if( $().mobileMenu ) { $('#primary-menu > ul').mobileMenu(); }
              
        
        // Anchor Link Scroll
        
        $("a[data-scrollto]").click(function(){
    	
            var divScrollToAnchor = $(this).attr('data-scrollto');
            
            if( $().scrollTo ) { jQuery.scrollTo( $( divScrollToAnchor ) , 400, {offset:-20} ); }
            
            return false;
        
    	});

		if(!strstr(window.location.href, 'vceditor=true')) {
			
			$('.googlemaps').each(function() {
				
				var geocoder;
				var map;
				var id = $(this).attr('data-id');
				var address = $(this).attr('address');	
				
				var address = $(this).attr('address');
				
				var map_design = $(this).attr('data-map');
				var zoomEl = $(this).attr('data-zoom');
				var titleEl = $(this).attr('data-title'); 
				var popupEl = ( $(this).attr('data-popup') === "true" );
				var scrollwheelEl = ( $(this).attr('data-scrollwheel') === "true" );
				var panEl = ( $(this).attr('data-pan') === "true" );
				var zoom_controlEl = ( $(this).attr('data-zoom_control') === "true" );
				var type_controlEl = ( $(this).attr('data-type_control') === "true" );
				var streetviewEl = ( $(this).attr('data-streetview') === "true" );	
				
				mapEl = 'terrain';

				if(titleEl) { 
					titleEl = '<h3>'+titleEl+'</h3>';
				}
				var messageEl = $(this).attr('data-message');
				if( messageEl ) {
					messageEl = '<p>'+messageEl+'</p>';
				}
				var phoneEl = $(this).attr('data-phone');
				if( phoneEl ) {
					phoneEl = '<p class="nobottommargin"><icon class="fa-phone"></icon>&nbsp;&nbsp;'+phoneEl+'</p>';
				}
				var emailEl = $(this).attr('data-email');
				if( emailEl ) {
					emailEl = '<p><icon class="fa-envelope"></icon>&nbsp;&nbsp;'+emailEl+'</p>';
				}

				function initialize() {
				  	//var myLatlng = new google.maps.LatLng(lat,lng);
				  
				  	var mapOptions = {
						zoom: parseInt(zoomEl),							
						mapTypeId: google.maps.MapTypeId[map_design],				
						scrollwheel: scrollwheelEl,				
						panControl: panEl, //da
						zoomControl: zoom_controlEl, //da
						mapTypeControl: type_controlEl, //da
						overviewMapControl: false, //da
						streetViewControl: streetviewEl, //da
				  	}
				  	//var map = new google.maps.Map(document.getElementById(id), mapOptions);				
				
				  	//map.setMapTypeId(google.maps.MapTypeId[map_design]);	
				  
				  				
				
				  geocoder = new google.maps.Geocoder();
				  // var latlng = new google.maps.LatLng(-34.397, 150.644);
				  
					var contentString = '<div>'+titleEl+messageEl+'<p class="nobottommargin"><icon class="fa-home"></icon>&nbsp;&nbsp;'+address+'</p>'+phoneEl+emailEl+'</div>';
				
					var infowindow = new google.maps.InfoWindow({
				  		content: contentString,
						maxWidth: 300,					  
				    });

				  geocoder.geocode( { 'address': address}, function(results, status) {
					if (status == google.maps.GeocoderStatus.OK) {
					  map.setCenter(results[0].geometry.location);
					  
					  var marker = new google.maps.Marker({
						  map: map,
						  title: 'New York',
						  position: results[0].geometry.location
					  });
					  
					  google.maps.event.addListener(marker, 'click', function() {
						infowindow.open(map,marker);
					  });
					  if( popupEl ) {
					  	google.maps.event.addListenerOnce(map, 'idle', function() {
						  setTimeout(function() {
							// wait some more (...)
							google.maps.event.trigger(marker, 'click'); //still doesn't work?
						  },400);
						});	
					  }
					  
					} else {
					  alert('Geocode was not successful for the following reason: ' + status);
					}
				  });
				 
				  map = new google.maps.Map(document.getElementById(id), mapOptions);

				}
				
				google.maps.event.addDomListener(window, 'load', initialize);
				
			});
		}

        // Testimonials
        
        if( $().carouFredSel ) {
            
            $('.testimonial-scroller').each(function() {
                var testimonialSpeed = $(this).attr('data-speed');
                var testimonialPause = $(this).attr('data-pause');
                var testimonialAuto = $(this).attr('data-auto');
				var testimonialFX = $(this).attr('data-effect');
                
                if( !testimonialSpeed ) { testimonialSpeed = 300; }
                if( !testimonialPause ) { testimonialPause = 8000; }
                if( testimonialAuto == 'true' ) { testimonialAuto = Number(testimonialPause); } else { testimonialAuto = false; }
                
                $(this).find('.testimonials').carouFredSel({
                    responsive : true,
                    auto : testimonialAuto,
                    items : 1,
					width: "100%",
                	scroll : {
                		items : "page",
                        fx : testimonialFX,
                        duration : Number(testimonialSpeed),
						pauseOnHover: testimonialPause,
                        wipe : true
                	},					

                	prev: jQuery(this).find('.widget-scroll-prev'),
					next: jQuery(this).find('.widget-scroll-next'),
					
					onCreate : function () {
						$(window).on('resize', function(){
							$(this).parent().add($(this)).css('height', $(this).children().first().outerHeight() + 'px');
						}).trigger('resize');
					}
                });
            
            });
			
			$('.portfolio-wrapper').each(function() {
				
				var portSpeed = $(this).attr('data-speed');
                var portPause = $(this).attr('data-pause');
                var portAuto = $(this).attr('data-auto');
				var portFX = $(this).attr('data-effect');
                
                if( !portSpeed ) { portSpeed = 300; }
                if( !portPause ) { portPause = 8000; }
                if( portAuto == 'true' ) { portAuto = Number(portPause); } else { portAuto = false; }
                
                $(this).find('#portfolio-shortcode').carouFredSel({
                	width : "100%",
					height : "auto",
					circular : false,
					responsive : true,
					infinite : false,
					auto : portAuto,
					items : {
						width : 280,
						visible: {
							min: 1,
							max: 4
						}
					},
					scroll : {						
                        fx : portFX,
                        duration : Number(portSpeed),
						pauseOnHover: portPause,
                        wipe : true
					},
					
					prev: jQuery(this).find('.widget-scroll-prev'),
					next: jQuery(this).find('.widget-scroll-next'),
					
					onCreate : function () {
						$(window).on('resize', function(){
							$(this).parent().add($(this)).css('height', $(this).children().first().outerHeight() + 'px');
						}).trigger('resize');
					}
                });
            
            });
			
			$('.clients_wrapper').each(function() {
				
				var clientsSpeed = $(this).attr('data-speed');
                var clientsPause = $(this).attr('data-pause');
                var clientsAuto = $(this).attr('data-auto');
				var clientsFX = $(this).attr('data-effect');				
                
                if( !clientsSpeed ) { clientSpeed = 300; }
                if( !clientsPause ) { clientPause = 8000; }
                if( clientsAuto == 'true' ) { clientsAuto = Number(clientsPause); } else { clientsAuto = false; }
                
                $(this).find('#clients-scroller').carouFredSel({
                	width : "100%",
					height : "auto",
					circular : false,
					responsive : true,
					infinite : false,
					auto : clientsAuto,
					items : {
						width : 110,
						visible: {
							min: 1,
							max: 6
						}
					},
					scroll : {
                		items : "page",
                        fx : clientsFX,
                        duration : Number(clientsSpeed),
						pauseOnHover: clientsPause,
                        wipe : true
                	},
					
					prev: jQuery(this).find('.widget-scroll-prev'),
					next: jQuery(this).find('.widget-scroll-next'),
					
					onCreate : function () {
						$(window).on('resize', function(){
							$(this).parent().add($(this)).css('height', $(this).children().first().outerHeight() + 'px');
						}).trigger('resize');
					}
                });
            
            });
			
			$('.portfolio-widget').each(function() {
                
                $(this).find('.portfolio-widget-scroll').carouFredSel({
                	width : "100%",
					height : "auto",
					circular : false,
					responsive : true,
					infinite : false,
					auto : false,
					items : {
						width : 280,
						visible: {
							max: 1
						}
					},
					scroll : {						
						wipe : true,
						fx: "fade"
					},
					
					prev: jQuery(this).find('.widget-scroll-prev'),
					next: jQuery(this).find('.widget-scroll-next'),
					
					onCreate : function () {
						$(window).on('resize', function(){
							$(this).parent().add($(this)).css('height', $(this).children().first().outerHeight() + 'px');
						}).trigger('resize');
					}
                });
            
            });
			
			
			$('#related-posts-scroller').each(function() {
                
                $(this).carouFredSel({
                	width : "100%",
					height : "auto",
					circular : false,
					responsive : true,
					infinite : false,
					auto : false,
					items : {
						width : 160,
						visible: {
							min: 2,
							max: 4
						}
					},
					scroll : {
						wipe : true
					},
					prev : {	
						button : "#relatedposts_prev",
						key : "left"
					},
					next : { 
						button : "#relatedposts_next",
						key : "right"
					},
					onCreate : function () {
						$(window).on('resize', function(){
							$(this).parent().add($(this)).css('height', $(this).children().first().outerHeight() + 'px');
						}).trigger('resize');
					}
                });
				
			});	
			
			$('#related-posts-scroller-wide').each(function() {
                
                $(this).carouFredSel({
                	width : "100%",
					height : "auto",
					circular : false,
					responsive : true,
					infinite : false,
					auto : false,
					items : {
						width : 160,
						visible: {
							min: 2,
							max: 5
						}
					},
					scroll : {
						wipe : true
					},
					prev : {	
						button : "#relatedposts_prev",
						key : "left"
					},
					next : { 
						button : "#relatedposts_next",
						key : "right"
					},
					onCreate : function () {
						$(window).on('resize', function(){
							$(this).parent().add($(this)).css('height', $(this).children().first().outerHeight() + 'px');
						}).trigger('resize');
					}
                });
				
			});	
			
			$('#portfolio-related-items').each(function() {
                
                $(this).carouFredSel({
                	width : "100%",
					height : "auto",
					circular : false,
					responsive : true,
					infinite : false,
					auto : false,
					items : {
						width : 200,
						visible: {
							min: 2,
							max: 5
						}
					},
					scroll : {
						wipe : true
					},
					prev : {	
						button : "#related-portfolio-prev",
						key : "left"
					},
					next : { 
						button : "#related-portfolio-next",
						key : "right"
					},
					onCreate : function () {
						$(window).on('resize', function(){
							$(this).parent().add($(this)).css('height', $(this).children().first().outerHeight() + 'px');
						}).trigger('resize');
					}
                });
				
			});	
			
        
        }
        
        // Flickr Feed
        
        if( $().jflickrfeed ) {
            
            $('.flickrfeed').each(function() {
                
                var flickrFeedID = $(this).attr('data-id');
                var flickrFeedCount = $(this).attr('data-count');
                var flickrFeedType = $(this).attr('data-type');
                var flickrFeedTypeGet = 'photos_public.gne';
                
                if( flickrFeedType == 'group' ) { flickrFeedTypeGet = 'groups_pool.gne'; }
                
                if( !flickrFeedCount ) { flickrFeedCount = 9; }
            
                $(this).jflickrfeed({
                    feedapi: flickrFeedTypeGet,
            		limit: Number(flickrFeedCount),
            		qstrings: {
            			id: flickrFeedID
            		},
            		itemTemplate: '<div class="flickr_badge_image">'+
            						'<a rel="prettyPhoto[galflickr]" href="{{image}}" title="{{title}}">' +
            							'<img src="{{image_s}}" alt="{{title}}" />' +
            						'</a>' +
            					  '</div>'
            	}, function(data) {
            		if ( $().prettyPhoto ) { initprettyPhoto(); }
            	});
            
            });
            
        }
        
        
        

});


$(window).load(function() {
    
    jQuery('#pageLoader').fadeOut(800, function(){
        $(this).remove();
    });
    
    
    //siblingsFader();
    
    
    // Flex Slider
    
    if ( jQuery().flexslider ) {
        
        jQuery('.fslider .flexslider').each(function() {
            
            var flexsAnimation = $(this).parent('.fslider').attr('data-animate');
            var flexsEasing = $(this).parent('.fslider').attr('data-easing');
            var flexsDirection = $(this).parent('.fslider').attr('data-direction');
			var flexsDirectionNav = $(this).parent('.fslider').attr('data-direction-nav');
            var flexsSlideshow = $(this).parent('.fslider').attr('data-slideshow');
            var flexsPause = $(this).parent('.fslider').attr('data-pause');
			var flexsPauseHover = $(this).parent('.fslider').attr('data-pause-hover');
            var flexsSpeed = $(this).parent('.fslider').attr('data-speed');
            var flexsVideo = $(this).parent('.fslider').attr('data-video');
            var flexsSheight = true;
            var flexsUseCSS = false;
            
            if( !flexsAnimation ) { flexsAnimation = 'slide'; }
            if( !flexsEasing || flexsEasing == 'swing' ) {
                flexsEasing = 'swing';
                flexsUseCSS = true;
            }
            if( !flexsDirection ) { flexsDirection = 'horizontal'; }
            if( !flexsSlideshow ) { flexsSlideshow = false; }
			if( !flexsDirectionNav ) { flexsDirectionNav = false; }
            if( !flexsPause ) { flexsPause = 5000; }
			if( !flexsPauseHover ) { flexsPauseHover = false; }
            if( !flexsSpeed ) { flexsSpeed = 600; }
            if( !flexsVideo ) { flexsVideo = false; }
            if( flexsDirection == 'vertical' ) { flexsSheight = false; }
            
            $(this).flexslider({
                
                selector: ".slider-wrap > .slide",
                animation: flexsAnimation,
                easing: flexsEasing,
                direction: flexsDirection,
                slideshow: flexsSlideshow,
                slideshowSpeed: Number(flexsPause),
                animationSpeed: Number(flexsSpeed),
                pauseOnHover: flexsPauseHover,
				prevText: "<i class=\"fa-angle-left\"></i>",
				nextText: "<i class=\"fa-angle-right\"></i>",
                video: flexsVideo,
                controlNav: false,
                directionNav: flexsDirectionNav,
                smoothHeight: flexsSheight,
                useCSS: flexsUseCSS,
                start: function(slider){
                    slider.parent('.fslider').removeClass('preloader2');
                    slider.parent('.fslider').parent('.port-gallery').removeClass('preloader');
                }
                
            });
        
        });
    
    }

});