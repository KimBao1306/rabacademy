export default function FlatPickrModule() {
	/** FLATPICKER */
	if ($('.flatpickr-input').length) {
		const toDate = flatpickr('#to-date', {
			disableMobile: 'true',
			dateFormat: 'd/m/Y ',
			// enableTime: true,
			time_24hr: true,
			locale: 'vn',
		});
		const fromDate = flatpickr('#from-date', {
			disableMobile: 'true',
			dateFormat: 'd/m/Y ',
			// enableTime: true,
			time_24hr: true,
			locale: 'vn',
			onReady: function () {
				this.set('minDate', new Date());
			},
			onChange: function (selectedDates, dateStr, instance) {
				toDate.set('minDate', dateStr);
			},
		});
	}
	/** FLATPICKER - END */
}
