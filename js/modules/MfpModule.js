export default function MfpModule() {
	/** MAGNIFICPOPUP */
	if ($('.open-popup-btn').length) {
		$('.close-popup-btn').on('click', function () {
			$.magnificPopup.close();
		});
		$('.open-popup-btn').magnificPopup({
			type: 'inline',
			preloader: false,
			modal: false,
			midClick: true,
			removalDelay: 500,
			fixedContentPos: false,
			callbacks: {
				beforeOpen: function () {
					this.st.mainClass = 'mfp-zoom-in';
				},
				// open: function () {
				// 	$('body').css({overflow: 'hidden'});
				// },
				// close: function () {
				// 	$('body').css({overflow: ''});
				// },
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
}
