(function($) {

	var	$window = $(window),
		$body = $('body'),
		$header = $('header'),
		$all = $body.add($header);

	// Breakpoints.
		breakpoints({
			xxlarge: [ '1681px',  '1920px' ],
			xlarge:  [ '1281px',  '1680px' ],
			large:   [ '1001px',  '1280px' ],
			medium:  [ '737px',   '1000px' ],
			small:   [ '481px',   '736px'  ],
			xsmall:  [ '321px',   '480px'  ],
			xxsmall:  [ null,     '320px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Touch mode.
		if (browser.mobile)
			$body.addClass('is-touch');
		else {

			breakpoints.on('<=small', function() {
				$body.addClass('is-touch');
			});

			breakpoints.on('>small', function() {
				$body.removeClass('is-touch');
			});

		}

	// Fix: IE flexbox fix.
		if (browser.name == 'ie') {

			var $main = $('.main.fullscreen'),
				IEResizeTimeout;

			$window
				.on('resize.ie-flexbox-fix', function() {

					clearTimeout(IEResizeTimeout);

					IEResizeTimeout = setTimeout(function() {

						var wh = $window.height();

						$main.each(function() {

							var $this = $(this);

							$this.css('height', '');

							if ($this.height() <= wh)
								$this.css('height', (wh - 50) + 'px');

						});

					});

				})
				.triggerHandler('resize.ie-flexbox-fix');

		}

	// close model
		$('.btn-close').on('click', function() {
			$('#myModal').hide();
			$('div.modal-backdrop').remove();
			$('.modal-open').removeAttr('style');
			$('body').removeClass('modal-open');
		});
		
	// login open url
		$('#login').on('click', function() {
			if (location.hostname.indexOf('localhost') > -1) {
				location.href = 'https://sit.mobii.ai';
			} else {
				location.href = 'https://'+location.hostname;
			}
		});

	// 	scroll button
	//	$('.scrollme').attr('data-when','enter').attr('data-from','0.75').attr('data-to','0').attr('data-opacity','0').attr('data-translatey','100');
		
})(jQuery);

// open url
var openUrl = function(url) {
	location.href = url;
}
// get cookie
var checkCookie = function() {
	let userCode = getCookie("userCode");
	const userData = {
		"UserInfo_Code": userCode
	}
	console.log(userCode);
	if (userCode != "" && userCode != null) {
		let env = ""
		switch (location.hostname) {
			case "sit.mobii.ai":
				env = "https://sit-afpapi.mobii.ai/api/Event/EventUserLog"
				break;
			case "www-uat.mobii.ai":
				env = "https://afpapi-uat.mobii.ai/api/Event/EventUserLog"
				break;
			case "www.mobii.ai":
				env = " https://eventsapi.mobii.ai/Event/EventUserLog"
				break;
			default:
				env = "https://sit-afpapi.mobii.ai/api/Event/EventUserLog"
				break;
		}
		// console.log(env);
		fetch(env, {
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(userData),
			method: 'POST'
		}).then(response => response.json())
			.then(data => {
				// console.log(data);
				location.href = 'https://www.sinotrade.com.tw/openact?strProd=0113&strWeb=0214&utm_campaign=OP_TSP_01&utm_source=Mobii&utm_medium=button_0816';
			})
	} else {
		var myModal = new bootstrap.Modal(document.getElementById('myModal'));
		myModal.show();
	}
}

var getCookie = function(userCode) {
	let name = userCode + "=";
	let decodedCookie = decodeURIComponent(document.cookie);
	let ca = decodedCookie.split(';');
	for(let i = 0; i <ca.length; i++) {
		let c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return "";
}