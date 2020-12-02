export default function SwiperModule() {
	/** SWIPER */
	// RUN SLIDER IN MOBILE
	let sliderMobileList = [];
	function sliderMobile() {
		var screenWidth = $(window).width();
		if (screenWidth > 768 && sliderMobileList.length !== 0) {
			sliderMobileList.map((s) => s.destroy());
			sliderMobileList = [];
			$('.swiper-wrapper').removeAttr('style');
			$('.swiper-slide').removeAttr('style');
		} else if (screenWidth <= 768 && sliderMobileList.length === 0) {
			$('.is-slider-mobile').each(function () {
				const $this = $(this);
				const $swiper = $this.find('.swiper-container');
				const nextBtn = $this.find('.swiper-button-next');
				const prevBtn = $this.find('.swiper-button-prev');
				const pagination = $this.find('.swiper-pagination');
				const isLoop = $this.hasClass('--loop') || false;
				const isParallax = $this.hasClass('--parallax') || false;
				const isCenter = $this.hasClass('--center') || false;
				const isAuto =
					($this.hasClass('--auto') && {
						speed: 6000,
						delay: 5000,
						disableOnInteraction: false,
					}) ||
					false;
				const tempSwiper = new Swiper($swiper, {
					speed: 1200,
					// autoHeight: false,
					autoplay: isAuto,
					slidesPerView: 'auto',
					watchSlidesProgress: true,
					// TRIGGER SWIPER RUN ASYNCHRONOUS
					observer: true,
					observeParents: true,
					observeSlideChildren: true,
					pagination: {
						el: pagination,
						clickable: true,
					},
					navigation: {
						nextEl: nextBtn,
						prevEl: prevBtn,
					},
					centeredSlides: isCenter,
					parallax: isParallax,
					loop: isLoop,
				});
				sliderMobileList.push(tempSwiper);
			});
		}
	}
	$('.is-slider-mobile').length && sliderMobile();
	$(window).on('resize', function () {
		$('.is-slider-mobile').length && sliderMobile();
	});
	// RUN SLIDER IN MOBILE - END

	// FUNCTION SLIDER COMMON
	function swiper(el, callback = null) {
		const $this = $(el);
		const $swiper = $this.find('.swiper-container');
		const nextBtn = $this.find('.swiper-button-next');
		const prevBtn = $this.find('.swiper-button-prev');
		const pagination = $this.find('.swiper-pagination');
		const isLoop = $this.hasClass('--loop') || false;
		const isParallax = $this.hasClass('--parallax') || false;
		const isAuto =
			($this.hasClass('--auto') && {
				speed: 6000,
				delay: 5000,
				disableOnInteraction: false,
			}) ||
			false;
		const isCenter = $this.hasClass('--center') || false;
		const swiper_common = new Swiper($swiper, {
			speed: 1200,
			// autoHeight: false,
			autoplay: isAuto,
			slidesPerView: 'auto',
			watchSlidesProgress: true,
			observer: true,
			observeParents: true,
			observeSlideChildren: true,
			pagination: {
				el: pagination,
				clickable: true,
			},
			navigation: {
				nextEl: nextBtn,
				prevEl: prevBtn,
			},
			centeredSlides: isCenter,
			parallax: isParallax,
			loop: isLoop,
			on: {
				slideChange: function () {
					callback && callback.call(this);
				},
				// slideChangeTransitionStart: function () {},
			},
		});
	}

	// BANNER HOME
	function homeBannerSlider() {
		const swiperThumbs = new Swiper('.banner__slider .swiper-container', {
			speed: 1200,
			autoplay: {
				speed: 6000,
				delay: 5000,
			},
			simulateTouch: false,
			slidesPerView: 'auto',
			loop: true,
			on: {
				slideChange: function () {
					const i = this.activeIndex;
					Array.from(this.slides).forEach(
						(s) => (s.children[0].children[0].style.filter = 'blur(5px)')
					);
					setTimeout(() => {
						this.slides[i].children[0].children[0].style.filter = 'blur(0)';
					}, 700);
				},
			},
		});
		const swiper = new Swiper('.banner__slider-content .swiper-container', {
			speed: 1200,
			autoplay: {
				speed: 6000,
				delay: 5000,
				disableOnInteraction: false,
			},
			slidesPerView: 'auto',
			loop: true,
			thumbs: {
				swiper: swiperThumbs,
			},
			navigation: {
				nextEl: $('.banner__slider-content .swiper-button-next'),
				prevEl: $('.banner__slider-content .swiper-button-prev'),
			},
			pagination: {
				el: $('.banner__slider-content .swiper-pagination'),
				clickable: true,
			},
			// on: {
			// 	slideChangeTransitionStart: function () {
			// 		const $content = $('.banner__slider-content .swiper-wrapper');
			// 		$content.find('.banner__slider-content-item').removeClass('--active');
			// 	},
			// 	slideChangeTransitionEnd: function () {
			// 		const i = this.activeIndex;
			// 		const $content = $('.banner__slider-content .swiper-wrapper');
			// 		$content
			// 			.find(`.banner__slider-content-item`)
			// 			.eq(i)
			// 			.addClass('--active');
			// 	},
			// },
		});
	}
	$('.main-home .banner__slider').length &&
		$('.main-home .banner__slider-content').length &&
		homeBannerSlider();
	// TEACHER HOME
	function homeTeacherSlider(el) {
		const $this = $(el);
		const $swiper = $this.find('.swiper-container');
		const nextBtn = $this.find('.swiper-button-next');
		const prevBtn = $this.find('.swiper-button-prev');
		const pagination = $this.find('.swiper-pagination');
		const swiper_common = new Swiper($swiper, {
			speed: 1200,
			// autoHeight: false,
			autoplay: {
				speed: 6000,
				delay: 5000,
				disableOnInteraction: false,
			},
			slidesPerView: 1,
			spaceBetween: 15,
			watchSlidesProgress: true,
			observer: true,
			observeParents: true,
			observeSlideChildren: true,
			pagination: {
				el: pagination,
				clickable: true,
			},
			navigation: {
				nextEl: nextBtn,
				prevEl: prevBtn,
			},
			centeredSlides: true,
			loop: true,
			breakpoints: {
				501: {
					slidesPerView: 2,
					spaceBetween: 15,
				},
				769: {
					slidesPerView: 3,
					spaceBetween: 30,
				},
			},
			on: {
				slideChange: function () {
					const i = this.activeIndex;
					const $content = $(`.main-home .swiper-wrapper`);
					$content.find(`.banner__slider-content-item`).removeClass('--active');

					setTimeout(function () {
						$content
							.find(`.banner__slider-content-item`)
							.eq(i)
							.addClass('--active');
					}, 1000);
				},
			},
		});
	}
	$('.home-teacher .is-slider').length &&
		homeTeacherSlider('.home-teacher .is-slider');
	// HOME PARTNERS
	function homePnSlider(el) {
		const $this = $(el);
		const $swiper = $this.find('.swiper-container');
		const nextBtn = $this.find('.swiper-button-next');
		const prevBtn = $this.find('.swiper-button-prev');
		const pagination = $this.find('.swiper-pagination');
		const swiper_common = new Swiper($swiper, {
			speed: 1200,
			autoHeight: false,
			slidesPerView: 2,
			slidesPerColumn: 1,
			spaceBetween: 0,
			slidesPerGroup: 1,
			slidesPerColumnFill: 'column',
			pagination: {
				el: pagination,
				clickable: true,
			},
			navigation: {
				nextEl: nextBtn,
				prevEl: prevBtn,
			},
			autoplay: {
				speed: 6000,
				disableOnInteraction: false,
			},
			loop: false,
			breakpoints: {
				501: {
					slidesPerView: 3,
					slidesPerColumn: 2,
					slidesPerGroup: 1,
					slidesPerColumnFill: 'row',
				},
				769: {
					slidesPerView: 4,
					slidesPerColumn: 2,
					slidesPerGroup: 2,
					loopAdditionalSlides: 2,
					slidesPerColumnFill: 'row',
				},
				992: {
					slidesPerView: 5,
					slidesPerColumn: 2,
					slidesPerGroup: 2,
					loopAdditionalSlides: 2,
					slidesPerColumnFill: 'row',
				},
			},
		});
	}
	$('.home-pn .is-slider').length && homePnSlider('.home-pn .is-slider');

	/** SWIPER - END*/
}
