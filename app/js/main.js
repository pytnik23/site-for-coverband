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
		var date = $("#date").val();
		var tel = $("#tel").val();
		if ( !(date && tel) ) {
			alert("Введите дату и номер телефона!");
		} else if (tel.length !== 9) {
			alert("Введите номер полностью!");
		} else {
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

});