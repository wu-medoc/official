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

    // logos loop
        var fs="";
        for (let i =1; i <= 23; i++){
            (i<10) ? (fs='00'+i) : (fs='0'+i);
            $('#logos').append("<div class='logoBox scrollme animateme'><img src='logos/store"+fs+".png' alt='logo-store"+fs+"' class='slogoImg'></img></div>");            
		}
		
	// 	scroll button
		$(document).on( 'scroll', function(){        
			if($(window).scrollTop() > 400){
				$('.headerbtn-top').addClass('d-block');
				$('.zeroRed').addClass('d-block');
			}else{
				$('.headerbtn-top').removeClass('d-block');				
				$('.zeroRed').removeClass('d-block');
			}				
		});

		$('.headerbtn').scrolly();

		$('.scrollme').attr('data-when','enter').attr('data-from','0.75').attr('data-to','0').attr('data-opacity','0').attr('data-translatey','100');
		
})(jQuery);