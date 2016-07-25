$(function() {
	// menu
	var menu = $('.menu'),
		menuButton = $('.menu-button');

	menuButton.click(function() {
		menu.toggleClass("menu-hidden");
	});
	menuButton.blur(function() {
		setTimeout(function() {
			menu.addClass("menu-hidden");
		}, 0);
	});

	// parallax
	var documentEl = $(document),
		heroUnitBg = $(".hero-unit"),
		speed = -0.5;

    documentEl.on('scroll', function() {
    	// parallax
    	var currScrollPos = documentEl.scrollTop();
    	heroUnitBg.css('background-position', '0 ' + currScrollPos*speed + 'px');

    	// scrollToTop
		if ($(this).scrollTop() > window.innerHeight) {
			$('.scrollToTop').fadeIn();
		} else {
			$('.scrollToTop').fadeOut();
		}

    });

    $('a[href*="#"]:not([href="#"])').click(function() {
    	if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
    		var target = $(this.hash);
    		target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
    		if (target.length) {
    			$('html, body').animate({
    				scrollTop: target.offset().top
    			}, 1000);
    			return false;
    		}
    	}
    });

});