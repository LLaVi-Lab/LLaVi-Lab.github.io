/* ---------------------------------------------------------------------- */
/*	JavaScript works
/* ---------------------------------------------------------------------- */
(function(){
	$( 'body' ).removeClass( 'no-js' ).addClass('js');
})(jQuery);

/* ---------------------------------------------------------------------- */
/*	Nivo slider
/* ---------------------------------------------------------------------- */
(function(){
	if( jQuery( '#slider' ).length ) {
		jQuery( window ).load( function() {
		  jQuery( '#slider' ).nivoSlider({
		  	effect: 'slideInLeft',
		  });
		});
	}
})(jQuery);


/* ---------------------------------------------------------------------- */
/*	Menu
/* ---------------------------------------------------------------------- */
(function(){
	if( jQuery( '#menu' ).length ) {
		jQuery( '#menu' ).menu();
	}
})(jQuery);


/* ---------------------------------------------------------------------- */
/*	Tabs horizontal
/* ---------------------------------------------------------------------- */
(function(){
	var tabH = jQuery( '#tabs-horizontal' ),
			doitTabHor;

	if( tabH.length ) {
		tabH.tabs();

		jQuery( window ).on( 'resize', function(){
	    clearTimeout( doitTabHor );
			doitTabHor = setTimeout(function(){ tabH.tabs(); }, 300 );
		});
	}
})(jQuery);


/* ---------------------------------------------------------------------- */
/*	Tabs vertical
/* ---------------------------------------------------------------------- */
(function(){
	var tabVer = jQuery( '#tabs-vertical' ),
			doitTabVer;

	if( tabVer.length ) {
	tabVer.tabs({
		direction: 'vertical'
	});

	jQuery( window ).on( 'resize', function(){
	  clearTimeout( doitTabVer );
		doitTabVer = setTimeout(function(){ tabVer.tabs({
			direction: 'vertical'
		}); }, 300 );
	});
	}
})(jQuery);


/* ---------------------------------------------------------------------- */
/*	Dropcaps slider in Home page
/* ---------------------------------------------------------------------- */
(function(){
	var dropcapsHeight = jQuery( '#carousel-vertical' );

	if( dropcapsHeight.length ) {

		var itemHorizontal,
				$doitBlockquote;

		function ShowItem() {
			itemHorizontal = Modernizr.mq('only screen and (max-width: 480px)') ? 1 : 2;
		}

		ShowItem();
		dropcapsHeight.whiteCatSlider({ 'item': itemHorizontal });

		jQuery( window ).on( 'resize', function(){
	    clearTimeout( $doitBlockquote );
			$doitBlockquote = setTimeout(function(){
				ShowItem();
				dropcapsHeight.whiteCatSlider({ 'item': itemHorizontal });
			}, 300 );
		});
	}
})(jQuery);


/* ---------------------------------------------------------------------- */
/*	Portfolio items slider in Home page,
/*  Out team in About US page
/* ---------------------------------------------------------------------- */
(function(){
	var $test = jQuery( '#carousel-horizontal' );

	if( $test.length ) {

		var scrollCount;

		function getWindowWidth() {

			if( Modernizr.mq('only screen and (max-width: 480px)') ) {
				return 1;
			}
			else if( Modernizr.mq('only screen and (max-width: 768px)') ) {
				return 2;
			}
			else if( Modernizr.mq('only screen and (max-width: 960px)') ) {
				return 3;
			}
			else {
				return 4;
			}
		}

		function CssClass( drop, item ) {

			drop.removeClass( 'items-2 items-3 items-4' )

			if( item === 2 ) {
				drop.addClass( 'items-2' );
			}
			else if ( item === 3 ) {
				drop.addClass( 'items-3' );
			}
			else {
				drop.addClass( 'items-4' );
			}
		}

		function initCarousel( drop, item ) {

			drop.whiteCatSlider({
				'position': 'horizontal',
				'item': item,
				'prev': '<i class="icomoon-arrow-left"></i>',
				'next': '<i class="icomoon-arrow"></i>',
				'prevClass': 'prev navPhotoCenter',
				'nextClass': 'next navPhotoCenter'
			});
		}

		scrollCount = getWindowWidth();
		initCarousel( $test, scrollCount );

		var $doitImage;

		jQuery( window ).on( 'resize', function(){

	    clearTimeout( $doitImage );

			$doitImage = setTimeout(function(){
				scrollCount = getWindowWidth();
				CssClass( $test, scrollCount );
				initCarousel( $test, scrollCount );
			}, 300 );
		});
	}
})(jQuery);


/* ---------------------------------------------------------------------- */
/*	Blockquote slider
/* ---------------------------------------------------------------------- */
(function(){
	var $blockquote = jQuery( '#blockquote' );

	if( $blockquote.length ) {

		function initBlockquote( drop ) {
			drop.whiteCatSlider({
				'position': 'horizontal',
				'item': 1,
				'prev': '<i class="icomoon-arrow-left"></i>',
				'next': '<i class="icomoon-arrow"></i>',
				'prevClass': 'prev noBG',
				'nextClass': 'next noBG'
			});
		}

		initBlockquote( $blockquote );

		var $doitBlockquote;

		jQuery( window ).on( 'resize', function(){
	    clearTimeout( $doitBlockquote );
			$doitBlockquote = setTimeout(function(){ initBlockquote( $blockquote ); }, 300 );
		});
	}
})(jQuery);


/* ---------------------------------------------------------------------- */
/*	Toggle
/* ---------------------------------------------------------------------- */
(function() {
	var tog = jQuery( '#toggle' );

	if( tog.length ) {
		
		tog.accordion();

		var $doitAccordion;

		jQuery( window ).on( 'resize', function(){
	    clearTimeout( $doitAccordion );
			$doitAccordion = setTimeout(function(){ tog.accordion(); }, 300 );
		});
	}

})(jQuery);

/* ---------------------------------------------------------------------- */
/*	Accordion
/* ---------------------------------------------------------------------- */
(function() {
	var acc = jQuery( '#accordion' );

	if( acc.length ) {
		
		acc.accordion({
			'hideRest': true,
			'start': 1
		});

		var $doitAccordion;

		jQuery( window ).on( 'resize', function(){
	    clearTimeout( $doitAccordion );
			$doitAccordion = setTimeout(function(){ acc.accordion({ 'hideRest': true, 'start': 1 }); }, 300 );
		});
	}
})(jQuery);

/* ---------------------------------------------------------------------- */
/*	Share Button on Touch device
/* ---------------------------------------------------------------------- */
(function() {
	var $share_button = jQuery( '.share' );

	if( $share_button.length ){

		var Share = function(){

			if( Modernizr.touch ){

				$share_button
					.on( 'click', function(){

						var $this = jQuery( this );

						$this.toggleClass( 'show' );

						return false;
					});
			}

			jQuery( window ).on( 'resize', function(){
				$share_button
					.removeClass( 'show' )
					.off( 'click' );
			});
		}

		Share();
	}
})(jQuery);


/* ---------------------------------------------------------------------- */
/*	Portfolio Filter
/* ---------------------------------------------------------------------- */
(function() {

	var $container = $('#portfolio-items');

	if( $container.length ) {

		var $itemsFilter = $('#portfolio-items-filter'),
				mouseOver,
				menuCategorii = '#menu-portfolio-items-filter';

		// Mobile device
		var MobilePortfolioFilter = function() {

			if( Modernizr.mq('only screen and (max-width: 480px)') ){

				$itemsFilter.parent().css( 'position', 'relative' );

				if( $itemsFilter.prev( menuCategorii ).length === 0 ){
					$itemsFilter.before( '<i class="categories-menu icomoon-menu" id="menu-portfolio-items-filter"></i>' );
				}

				$( menuCategorii )
					.on( 'click', function(){

						var $posLeft = parseInt( $itemsFilter.css( 'left' ) ),
								$l = $posLeft === 0 ? '-200%' : 0;

						$itemsFilter
							.addClass( 'animate-left' )
							.css( 'left', $l );
					});
			}
		}

		MobilePortfolioFilter();

		var $doitMobilePortfolioFilter;

		jQuery( window ).on( 'resize', function(){
	    clearTimeout( $doitMobilePortfolioFilter );
			$doitMobilePortfolioFilter = setTimeout(function(){ $( menuCategorii ).off( 'click' ); MobilePortfolioFilter(); }, 300 );
		});

		// Copy categories to item classes
		$( '.item', $container ).each(function(i) {
			var $this = $(this);
			$this.addClass( $this.attr( 'data-categories' ) );
		});

		// Run Isotope when all images are fully loaded
		$(window).on('load', function() {
			$container.isotope({
				itemSelector : '.item',
				layoutMode   : 'fitRows',
			});
		});
                
		// Filter projects
		$itemsFilter
			.on('click', 'a', function( event ) {

				var $this = $(this),
						currentOption = $this.attr('data-categories');

				$itemsFilter.find('li').removeClass('active');
				$this.parent().addClass('active');

				if( currentOption ) {
					if( currentOption !== '*' ) currentOption = currentOption.replace(currentOption, '.' + currentOption);
					$container.isotope({ filter : currentOption });
				}

				event.preventDefault();
			});
    }
})(jQuery);


/* ---------------------------------------------------------------------- */
/*	Gmap3 - Google Maps
/* ---------------------------------------------------------------------- */
(function(){

	var map = jQuery( '#map' );

	if( map.length ) {

		function initMap() {

			if( Modernizr.mq('only screen and (min-width: 481px)') ) {
				map
					.css({
						'margin-top': '-20px',
						'display': 'block',
						'height': '489px',
						'width': '100%'
					})
					.gmap3({
						map:{
				      options:{
				        scrollwheel: false
				      }
				    }
					});
			}
			else {
				map.hide();
			}
		}

		initMap();

		var $doitMap;

		jQuery( window ).on( 'resize', function(){
	    clearTimeout( $doitMap );
			$doitMap = setTimeout(function(){ initMap(); }, 300 );
		});
	}
})(jQuery)
