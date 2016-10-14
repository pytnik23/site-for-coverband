$(function() {
	
	// menu
	var menu = $('.menu'),
		menuButton = $('.menu-button');

	menuButton.click(function() {
		menu.toggleClass("menu-hidden");
	});
	menuButton.on('blur', function() {
		setTimeout(function() {
			menu.addClass("menu-hidden");
		}, 0);
	});

	// parallax
	var documentEl = $(document),
		heroUnitBg = $(".hero-unit"),
		speed = -0.5;

	// scroll magic
	var slideUpBlock 			= document.querySelectorAll('.slide-up'),
		slideRightBlock 		= document.querySelectorAll('.punkt');
	var slideUpBlockCoords 		= slideUpBlock[0].getBoundingClientRect(),
		slideRightBlockCoords 	= slideRightBlock[0].getBoundingClientRect();

    documentEl.on('scroll', function() {
    	// parallax
    	var currScrollPos = documentEl.scrollTop();
    	heroUnitBg.css('background-position', 'center ' + currScrollPos*speed + 'px');

    	// scrollToTop
    	var scrollToTopButton = $('.scrollToTop');
		if ($(this).scrollTop() > window.innerHeight) {
			scrollToTopButton.fadeIn();
			scrollToTopButton.css('display', 'block');
		} else {
			scrollToTopButton.fadeOut();
		}

		//slider height
		slider.slideHeight();

		// scroll magic
		var lowerEdge = window.pageYOffset + window.innerHeight;

		if ( slideUpBlockCoords.top < lowerEdge ) {
			for (var i = 0; i < slideUpBlock.length; i++) {
				slideUpBlock[i].querySelector('h3').classList.remove('redyToSlide');
				slideUpBlock[i].querySelector('p').classList.remove('redyToSlide');
			}
		}
		if ( slideRightBlockCoords.top < lowerEdge ) {
			for (var i = 0; i < slideRightBlock.length; i++) {
				slideRightBlock[i].classList.remove('redyToSlide');
			}
		}
    });

    // hide mobile menu
    $('body').on('tap', function() {
    	if ( menu.css('display') === 'block') {
    		menu.addClass('menu-hidden');
    	}
    });


    $('a[href*="#"]:not([href="#"])').click(function() {
    	if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
    		var target = $(this.hash);
    		target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
    		if (target.length) {
    			$('html, body').animate({
    				scrollTop: target.offset().top
    			}, 800);
    			return false;
    		}
    	}
    });


    // FORM
    $("#form input").keydown(function (e) {
        // Allow: backspace, delete, tab, escape, enter and .
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
             // Allow: Ctrl+A
            (e.keyCode == 65 && e.ctrlKey === true) ||
             // Allow: Ctrl+C
            (e.keyCode == 67 && e.ctrlKey === true) ||
             // Allow: Ctrl+X
            (e.keyCode == 88 && e.ctrlKey === true) ||
             // Allow: home, end, left, right
            (e.keyCode >= 35 && e.keyCode <= 39)) {
                 // let it happen, don't do anything
                 return;
        }
        // Ensure that it is a number and stop the keypress
        if ( (e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105) ) {
            e.preventDefault();
        }
    });
	
	// submit form
	$("#form").submit(function() {
		var date = $("#date");
		var tel = $("#tel");
		if ( !date.val() ) {
			date.focus();
			date.closest('.label').css('border-bottom-color', 'red');
		} else if ( !tel.val() || tel.val().length !== 9 ) {
			date.closest('.label').css('border-bottom-color', '');
			tel.focus();
			tel.closest('.label').css('border-bottom-color', 'red');
		} else {
			tel.closest('.label').css('border-bottom-color', '');
			$.ajax({
				type: "POST",
				url: "mail.php",
				data: $(this).serialize()
			}).done(function() {
				$(this).find("input").val("");
				alert("Спасибо за заявку! Скоро мы с вами свяжемся.");
				$("#form").trigger("reset");
			});
		}
		return false;
	});


	// date input
	$('#date').focus(function() {
		this.type = 'date';
	});

});