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



		$('.scrollme').attr('data-when','enter').attr('data-from','1').attr('data-to','0').attr('data-opacity','0.5').attr('data-translatey','100');
		$('.navbar-toggler').on('click', function(){
			$('.navicon').attr('src', function(index, attr){
				return attr == "../images/ic_close.png" ? "../images/ic_menu.png" : "../images/ic_close.png";
			});
		});
		$('#navbarNav li').on('click', function(){
			$(this).addClass('active').siblings().removeClass('active');
		});

		//qrcode
		if($('#qrcode').length>0){
			var qrcode = new QRCode(document.getElementById("qrcode"), {
				text: "https://mobii.ai/AppDownload",
				width: 100,
				height: 100,
				colorDark : "#000000",
				colorLight : "#ffffff",
				correctLevel : QRCode.CorrectLevel.H
			});
		};
		if($('#qrcode1').length>0){
			var qrcode = new QRCode(document.getElementById("qrcode1"), {
				text: "https://mobii.ai/AppDownload",
				width: 100,
				height: 100,
				colorDark : "#000000",
				colorLight : "#ffffff",
				correctLevel : QRCode.CorrectLevel.H
			});
		};

		//app notify
		if($('section.appNotifyBox').hasClass("d-none"))
			$('.jastka').addClass("mb-2");
		$('.appclose').on('click',function(){
			$('section.appNotifyBox').addClass("d-none");
			$('.jastka').addClass("mb-2");
		});		
		
		// 	scroll button
		$(document).on( 'scroll', function(){        
			($(window).scrollTop() > 400) ?
			$('.jastka').show() :
			$('.jastka').hide() ;
		});

		$('.linkHash').on('click', function(){
			var thisHash =$(this).attr('href');
			console.log(thisHash);
			$("html, body").animate({scrollTop: $(thisHash).offset().top},1500);
		});

		//Gift exchange
		var date1=['9/7-9/20','9/14-10/27','9/21-10/4​','9/28-10/11​'];
		var exHtml="";
		var i, k;
		$.getJSON( "../assets/js/json2020Aug.json", function( dataJson ) {
			for (k=0;k<=3;k++) {
				exHtml+='<p class="py-4">贈品兌換時間：'+date1[k]+'</p><div class="row">';			
				$.each( dataJson, function( key, value ) {
					console.log(value.item);
					if(value.item==k){
						for (i=1;i<=6;i++) {
							if(value.sub==i){
								exHtml+='<div class="col-6 col-md-4 col-xl-4" class="scrollme animateme"><img src="img0818/store'+k+i+'.png">';
								exHtml+='<p>'+ value.tit +'</p>';
								exHtml+='<p>'+ value.des +'</p>';
								exHtml+='</div>';
							};
						};
					};
				});
				exHtml+='</div><p>&emsp;</p>';
			};
			$('#gift').html(exHtml);
		});

		// logos loop
		var fs="";
		for (let i =1; i <= 23; i++){
			(i<10) ? (fs='0'+i) : (fs=i);
			$('#logos').append("<div class='item'><img src='img0818/MaskGroup"+fs+".png' class='img-fluid scrollme animateme'></div>");            
		}
})(jQuery);