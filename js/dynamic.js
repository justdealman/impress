function intro() {
	var s = $('.section').outerHeight()-$('header').outerHeight();
	var h = s-$('.introduction > h4').outerHeight()-$('.introduction .benefits').outerHeight();
	if ( h < 300 ) {
		h = 300;
	}
	$('.slider .temp > div').each(function() {
		var path = $(this).children('img').attr('src');
		$(this).css({
			'background': 'url("'+path+'") no-repeat center center',
			'-webkit-background-size': 'cover',
			'-moz-background-size': 'cover',
			'-o-background-size': 'cover',
			'background-size': 'cover'
		});
	});
	$('.slider .container').empty();
	$('.slider .prev, .slider .next, .slider .pagination').remove();
	$('.slider .container').html($('.slider .temp').html());
	if ( $('.enabled').length > 0 ) {
		$('.slider, .slider .container, .slider .container > div').height(h);
	}
	$('.slider, .slider .container, .slider .container > div').width($('.wrapper').width());
	$('.slider').slides({
		generatePagination: true,
		generateNextPrev: true,
		container: 'container',
		effect: 'slide',
		slideSpeed: 500,
		slideEasing: 'easeInOutQuad',
		play: 10000,
		pause: -1
	});
	$('.slider').bind('swipeleft', function() {
		$('.slider .next').trigger('click');
	});
	$('.slider').bind('swiperight', function() {
		$('.slider .prev').trigger('click');
	});
	if ( $('.enabled').length > 0 ) {
		if ( $('.introduction').outerHeight() > s ) {
			$('.introduction').css({
				'-webkit-transform': 'scale('+s/$('.introduction').outerHeight()+')',
				'-webkit-transform-origin': 'center top',
				'-moz-transform': 'scale('+s/$('.introduction').outerHeight()+')',
				'-moz-transform-origin': 'center top',
				'transform': 'scale('+s/$('.introduction').outerHeight()+')',
				'transform-origin': 'center top',
			});
		}
	}
}
function core() {
	$('.video .inner, .core').each(function() {
		var t = $(this).outerHeight();
		var p = $(this).parents('.section').outerHeight()-$('header').outerHeight();
		if ( t > p ) {
			$(this).css({
				'-webkit-transform': 'scale('+p/t+')',
				'-webkit-transform-origin': 'center top',
				'-moz-transform': 'scale('+p/t+')',
				'-moz-transform-origin': 'center top',
				'transform': 'scale('+p/t+')',
				'transform-origin': 'center top',
			});
		}
		else {
			$(this).css({
				'margin-top': (p-t)/2+'px'
			});
		}
	});
}
function gallery() {
	$('.section.providers .gallery .container').empty();
	$('.section.providers .gallery .prev, .section.providers .gallery .next, .section.providers .gallery .pagination').remove();
	$('.section.providers .gallery .container').html($('.section.providers .gallery .temp').html());
	$('.section.providers .gallery, .slider .container, .section.providers .gallery .container > div').width($('.wrapper').width());
	$('.section.providers .gallery').slides({
		generatePagination: false,
		generateNextPrev: true,
		container: 'container',
		effect: 'slide',
		slideSpeed: 500,
		slideEasing: 'easeInOutQuad',
		play: 10000,
		pause: 0
	});
	$('.section.providers .gallery').bind('swipeleft', function() {
		$('.section.providers .gallery .next').trigger('click');
	});
	$('.section.providers .gallery').bind('swiperight', function() {
		$('.section.providers .gallery .prev').trigger('click');
	});
}
function map() {
	$('.section.contacts #map').height($('.section.contacts').outerHeight());
}
$(document).ready(function() {
	if ( $(window).height() >= 600 && !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
		$('.wrapper').fullpage({
			css3: true,
			scrollingSpeed: 1000,
			anchors: ['welcome', 'package', 'technology', 'extra', 'services', 'news', 'providers', 'contacts'],
			menu: '.menu'
		});
		$.fn.fullpage.reBuild();
		$('body').addClass('enabled');
		$('header img').bind('click', function() {
			$.fn.fullpage.moveTo(1);
			$('header .menu li').removeClass('active');
		});
		core();
		$('.section .next-b').bind('click', function() {
			$.fn.fullpage.moveSectionDown();
		})
	}
	else {
		$('body').addClass('disabled');
	}
	if ( $('.introduction').length > 0 ) {
		intro();
	}
	$('.section.video').bind('click', function() {
		console.log('Video click trigger');
	});
	$('.section.package .core ul li').hover(
		function() {
			var t = $(this).find('.more');
			if ( $(this).index() < 4 ) {
				t.css({
					'top': '-15px',
					'padding-top': '215px',
					'padding-bottom': '24px'
				});
			}
			else {
				t.css({
					'bottom': '0',
					'padding-top': '24px',
					'padding-bottom': $(this).outerHeight()+6+'px'
				});
			}
			t.stop().fadeIn(100);
		},
		function() {
			$(this).find('.more').stop().fadeOut(100);
		}
	);
	if ( $('.enabled .section.package .popup').length > 0 ) {
		$('.section.package .popup').append('<span class="close"></span>');
		$('.section.package .core ul li[data-more]').bind('click', function(event) {
			event.preventDefault();
			var t = $(this).parents('.section').find('.popup[data-more="'+$(this).attr('data-more')+'"]');
			var h = $(this).parents('.section').outerHeight()-$('header').outerHeight()-100;
			if ( t.outerHeight() < h ) {
				t.css({
					'top': (h-t.outerHeight())/2+50+$('header').outerHeight()-15+'px'
				});
			}
			else {
				t.css({
					'top': $('header').outerHeight()+50+'px',
					'-webkit-transform': 'scale('+h/t.outerHeight()+')',
					'-webkit-transform-origin': 'center top',
					'-moz-transform': 'scale('+h/t.outerHeight()+')',
					'-moz-transform-origin': 'center top',
					'transform': 'scale('+h/t.outerHeight()+')',
					'transform-origin': 'center top',
				});
			}
			t.stop().fadeIn(200);
			$(this).parents('.section').addClass('locked');
		});
		$('.section.package .popup .close').bind('click', function(event) {
			event.preventDefault();
			$(this).parent().stop().fadeOut(200);
			$(this).parents('.section').removeClass('locked');
		});
	}
	if ( $('.section.providers .gallery').length > 0 ) {
		gallery();
	}
	if ( $('.contacts #map').length > 0 ) {
		map();
	}
	$('input, textarea').each(function() {
		$(this).data('holder', $(this).attr('placeholder'));
		$(this).focusin(function() {
			$(this).attr('placeholder', '');
		});
		$(this).focusout(function() {
			$(this).attr('placeholder', $(this).data('holder'));
		});
	});
});
$(window).resize(function() {
	if ( $('.introduction').length > 0 ) {
		intro();
	}
	if ( $('.enabled').length > 0 ) {
		core();
	}
	if ( $('.contacts #map').length > 0 ) {
		map();
	}
});
$(window).load(function() {
	if ( $('.section.extra').length > 0 ) {
		$('.section.extra').each(function() {
			var max = 0;
			$('.section.extra ul li').each(function() {
				var h = $(this).height(); 
				max = h > max ? h : max;
			});
			$('.section.extra ul li').height(max);
		});
		$('.section.extra ul').css({
			'opacity': '1'
		});
	}
});