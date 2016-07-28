function Slider() {
	var __self = this;

	var items 					= $('.carousel .item'),
		itemsWrap				= $('.item-wrap'),
		carouselIndicators 		= $('.carousel-indicators');

	var currentSlideIndex 		= 0;

	// Slider Init
	this.__sliderInit = function() {
		// calc height
		var height = 0;
		items.each(function(i, item) {
			if ($(item).height() > height) {
				height = $(item).height();
			}
		});
		itemsWrap.height(height);

		// create indicators
		for (var i = 0; i < items.length; i++) {
			var li = document.createElement('li');
			$(li).attr('data-item-index', i);
			carouselIndicators.append(li);
		}
		carouselIndicators.find('li:first-child').addClass('active');
		$(items[0]).addClass('active');
	}
	this.__sliderInit();


	var carouselIndicatorItems = carouselIndicators.find('li');

	carouselIndicators.on('click', function(e) {
		e.preventDefault();
		var target = e.target;
		if (target.tagName !== 'LI' || $(target).hasClass('active')) return;
		currentSlideIndex = +target.dataset.itemIndex;
		__self.__render();
	});

	// change slider
	this.nextSlide = function() {
		currentSlideIndex++;
		if (currentSlideIndex === items.length) {
			currentSlideIndex = 0;
			__self.__render();
			return;
		}
		__self.__render();
	};

	this.__render = function() {
		var previousItem,
			currentItem,
			previousIndicator,
			cerrentIndicator;

		items.each(function(i, item) {
			if ($(item).hasClass('active')) {
				previousItem = $(item);
				return;
			}
		});

		previousIndicator = carouselIndicators.find('.active');		
		previousIndicator.removeClass('active');

		currentIndicator = $(carouselIndicatorItems[currentSlideIndex]);
		currentIndicator.addClass('active');

		previousItem.fadeOut(300, function() {
			previousItem.removeClass('active');
			currentItem = $(items[currentSlideIndex]);
			currentItem.addClass('active');
			
			currentItem.fadeIn(1000);
		});
		
	};
	this.__render();
	
	var timer = setInterval(this.nextSlide, 9000);
	$('.carousel').hover(function() {
		clearInterval(timer);
	}, function() {
		timer = setInterval(__self.nextSlide, 9000);
	});
}
var slider = new Slider();