export default function QuantityPickerModule() {
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
}
