function Slider() {
	var __self = this;

	var items 					= $('.carousel .item'),
		itemsWrap				= $('.item-wrap'),
		carouselIndicators 		= $('.carousel-indicators');

	var currentSlideIndex 		= 0;

	// Slider Init
	function sliderInit() {
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
	sliderInit();


	var carouselIndicatorItems = carouselIndicators.find('li');

	carouselIndicators.on('click', function() {
		// TODO
	});

	// change slider
	this.nextSlide = function() {
		if (currentSlideIndex === items.length - 1) {
			currentSlideIndex = 0;
			__self.__render();
			return;
		}
		currentSlideIndex++;
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

		carouselIndicatorItems.each(function(i, item) {
			if ( $(item).hasClass('active') ) {
				previousIndicator = $(item);
				return;
			}
			
		});

		previousItem.fadeOut(1000, function() {
			previousItem.removeClass('active');
			previousIndicator.removeClass('active');
			currentItem = $(items[currentSlideIndex]);
			currentIndicator = $(carouselIndicatorItems[currentSlideIndex]);

			currentItem.addClass('active');
			currentIndicator.addClass('active');
			
			currentItem.fadeIn(1000);
		});
		
	};
	this.__render();

	
	setInterval(this.nextSlide, 10000);
}
var slider = new Slider();