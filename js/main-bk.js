jQuery(document).ready(function ($) {
	if ($('.header').length) {
		/** MENU FIXED WHEN SCROLL */
		const header = $('.header');
		const headerHeight = header.height();
		const headerOffsetTop = header.offset().top;
		if (scrollY >= headerOffsetTop + headerHeight) {
			header.addClass('--fixed');
			header.next().css('margin-top', headerHeight);
		} else {
			header.removeClass('--fixed');
			header.next().css('margin-top', 0);
		}
		$(window).on('scroll', function () {
			if (scrollY >= headerOffsetTop + headerHeight) {
				header.addClass('--fixed');
				header.next().css('margin-top', headerHeight);
			} else {
				header.removeClass('--fixed');
				header.next().css('margin-top', 0);
			}
		});
		/** MENU FIXED WHEN SCROLL - END */
		/** MENU IN MOBILE */
		$('.header__list  .dropdown').each(function () {
			const dropdown = $(this);
			const arrows = $('<i></i>');
			arrows.addClass('fa fa-angle-down');

			dropdown.find('a').eq(0).append(arrows);
			const subMenu = dropdown.children('.sub-menu');

			arrows.on('click', function (e) {
				e.preventDefault();
				dropdown.toggleClass('--show');
				$(this).parent().next('ul').stop().slideToggle();
				$(this).toggleClass('--active');
			});
		});
		/** MENU IN MOBILE - END */
	}

	/** MENU BUTTON */
	if (
		$('.header .hamburger-btn').length &&
		$('.header__list-wrap').length &&
		$('.overlay').length
	) {
		$('.header .hamburger-btn').on('click', function () {
			$(this).toggleClass('--active');
			$('.header__list-wrap').toggleClass('--active');
			// $('body').css('overflow', 'hidden');
		});

		$('.overlay').on('click', function () {
			$('.hamburger-btn').removeClass('--active');
			$('.header__list-wrap').removeClass('--active');
			// $('body').css('overflow', '');
		});
	}
	/** MENU BUTTON - END*/

	/** SCROLL TO TOP */
	if ($('.scroll-top').length) {
		$('.scroll-top').on('click', function (e) {
			e.preventDefault();
			$('html, body').animate(
				{
					// scrollTop: $("#to").offset().top //scroll đến vị trí #to
					scrollTop: 0,
				},
				500
			);
			return false;
		});

		$(window).on('scroll', function () {
			if ($(this).scrollTop() >= 10) {
				$('.scroll-top').addClass('--show');
			} else {
				$('.scroll-top').removeClass('--show');
			}
		});
	}
	/** SCROLL TO TOP - END*/

	/** TAB */
	$(window).on('click', (e) => {
		if (e.target.closest('.tab-link')) {
			const tabLink = e.target.closest('.tab-link');
			$(tabLink).addClass('--active').siblings().removeClass('--active');
			const tabContent = $(tabLink.getAttribute('data-tabs'));
			$(tabContent).addClass('--active').siblings().removeClass('--active');
		}
	});
	/** TAB - END */

	/** LIGHTGALLERY */
	if ($('.is-lightgallery').length) {
		$('.is-lightgallery').lightGallery({
			thumbnail: true,
		});
	}
	/** LIGHTGALLERY - END*/
	/** MAGNIFICPOPUP */
	if ($('.open-popup-btn').length) {
		$('.open-popup-btn').magnificPopup({
			type: 'inline',
			preloader: false,
			modal: true,
			midClick: true,
			removalDelay: 500,
			callbacks: {
				beforeOpen: function () {
					this.st.mainClass = 'mfp-zoom-in';
				},
			},
		});
	}
	if ($('.video-btn').length) {
		$('.video-btn').parent().magnificPopup({
			disableOn: 700,
			type: 'iframe',
			mainClass: 'mfp-zoom-in',
			removalDelay: 160,
			preloader: false,
			fixedContentPos: false,
		});
	}
	/** MAGNIFICPOPUP - END*/
	/** SWIPER */
	$('.is-slider').each(function () {
		const $swiper = $(this).find('.swiper-container');
		const nextBtn = $(this).find('.swiper-button-next');
		const prevBtn = $(this).find('.swiper-button-prev');
		const pagination = $(this).find('.swiper-pagination');
		const isLoop = $(this).hasClass('--loop') || false;
		const isParallax = $(this).hasClass('--parallax') || false;
		const swiper_common = new Swiper($swiper, {
			speed: 600,
			// autoHeight: false,
			slidesPerView: 'auto',
			watchSlidesProgress: true,
			pagination: {
				el: pagination,
				clickable: true,
			},
			navigation: {
				nextEl: nextBtn,
				prevEl: prevBtn,
			},
			parallax: isParallax,
			loop: isLoop,
		});
	});
	/** SWIPER - END*/

	/** QTT PICKER */
	const priceElement = $('.qtt-picker');
	if (priceElement) {
		//lấy dữ liệu từ ô input - min max step
		function qttPicker(btn) {
			const input = $(btn).closest('.qtt-picker').find('.qtt-input');
			const inputMax = $(input).attr('max');
			const inputMin = $(input).attr('min');
			const inputStep = $(input).attr('step')
				? parseFloat($(input).attr('step'))
				: 1;

			if ($(btn).hasClass('plus')) {
				const value = inputMax
					? Math.min(parseFloat(input.val()) + inputStep, parseFloat(inputMax))
					: parseFloat(input.val()) + inputStep;
				input.val(
					Number.isInteger(value)
						? parseInt(value)
						: parseFloat(value).toFixed(1)
				);
				return input.val();
			}

			if ($(btn).hasClass('minus')) {
				const value = Math.max(
					parseFloat(input.val()) - inputStep,
					inputMin ? parseFloat(inputMin) : inputStep
				);
				input.val(
					Number.isInteger(value)
						? parseInt(value)
						: parseFloat(value).toFixed(1)
				);
				return input.val();
			}

			// return input.val();
		}
		//event cho 2 nút tăng giảm
		$(window).on('click', (e) => {
			if ($(e.target).hasClass('plus') || $(e.target).hasClass('minus')) {
				const valueItem = qttPicker(e.target);
				calP(valueItem);
			}
		});
		//event cho input khi thay đổi
		$(window).on('change', (e) => {
			if ($(e.target).hasClass('qtt-input')) {
				const valueItem = qttPicker(e.target);
				calP(valueItem);
			}
		});

		function calP(vl) {
			// tách chuỗi và lấy giá tiền trong chuỗi
			const itemSize = $('input[name="pd-size"]:checked');
			const totalPrice = new Intl.NumberFormat('vi-VN', {
				style: 'currency',
				currency: 'VND',
			}).format(vl * itemSize.val());

			$('.price').html(totalPrice);
		}
	}
	/** QTT PICKER - END*/

	/* DATE PICKER */
	$('#delivery_date').on('change', datePicker);
	function datePicker() {
		//TOTAL TIME
		const NOW = new Date();
		//GET DATE
		let date = NOW.getDate();
		let hours = NOW.getHours();
		let isFresh = false;
		//IF HAS CLASS '.sp__tuoisong' DATE + 1
		if ($('.sp_tuoisong').length) {
			NOW.setDate(date + 1);
			date = NOW.getDate();
			isFresh = true;
		}
		//GET YEAR AND MONTH HERE BECAUSE IF THE DATE SET NEW DATE THE MONTH AND YEAR WILL BE REFRESH
		const YEAR = NOW.getFullYear();
		const MONTH = NOW.getMonth() + 1;
		var maxDate =
			YEAR + '-' + `0${MONTH}`.slice(-2) + '-' + `0${date}`.slice(-2);
		$('#delivery_date').attr('min', maxDate);
		checkDeliveryTime(hours, isFresh);
	}

	function checkDeliveryTime(hours = 7, isFresh = false) {
		let timeString =
			'<option value="" selected="selected">Chọn Thời gian giao hàng</option>';
		if (hours >= 20) {
			timeString =
				'<option>Đã hết thời gian giao hàng. Xin quý khách vui lòng chọn ngày tiếp theo</option>';
			console.log(timeString);
			return;
		}

		let timeMin;
		if (hours < 7) {
			timeMin = 7;
		} else {
			timeMin = isFresh ? 7 : hours + 2;
		}
		for (let i = timeMin; i < 21; i++) {
			timeString += `<option value="${i} -> ${i + 1}">${i}h -> ${
				i + 1
			}h</option>`;
		}

		$('#delivery_time').html(timeString);
	}
	// checkDeliveryTime()
	/* DATE PICKER - END */
});
