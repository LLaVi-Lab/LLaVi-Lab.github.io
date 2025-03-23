if( typeof Object.create !== 'function' ) {
	Object.create = function( obj ) {
		function F() {};
		F.prototype = obj;
		return new F();
	}
}

( function( $, window, document, undefined ) {

	var accordion = {

		init: function( options, elem ){

			var $obj = this;
			$obj.father = $( elem );
			$obj.options = options && typeof( options ) == 'object' ? $.extend( {}, $.fn.defaults, options ) : $.fn.defaults;

			console.log( 'WhiteCat Accordion v1.0.0\nHide other items: '+ $obj.options.hideRest );
			
			$obj.Build();
			$obj.Clic();
		},

		Build: function(){
			var $obj = this,
					$opt = $obj.options,
					$father = $obj.father, 
					$find = $father.find( $opt.text ),
					i = 1;

			$father.addClass( 'active' );

			$find
				.each( function(){

					var $this = $( this ),
							$height = $this.innerHeight(),
							$parent = $this.parent();

					if( !$this.attr( 'data-height' ) ){

						var addIcon = jQuery( $obj.options.iconHtml ).addClass( $opt.icon.substring( 1 ) );

						$this
							.attr( 'data-height', $height +'px' )
							.prev( $opt.title )
								.prepend( addIcon );
					}

					if( i !== $opt.start ){
						$obj.HideElemnts( $parent );
						$obj.IconShow( $parent );
					}
					else{
						$obj.IconHide( $parent );
						$parent.find('.accordion-title').css({'font-weight':'bolder'});
						$this
							.addClass( 'animate-height' )
							.css( { 'height': $this.attr( 'data-height' ) });
					}

					++i;
				});
		},

		Clic: function(){
			var $obj = this,
					$options = this.options,
					$find = $obj.father.find( $obj.options.title );
			
			// $find
			$obj.father
				.on( 'click', $obj.options.title, function(){

					var $this = $( this ),
							$content = $this.next( $options.text );
					
					if( $content.length ){
						var $height_max = $content.attr( 'data-height' ),
								$height = $content.height() === 0 ? $height_max : 0,
								$weight = $content.height() === 0 ? 'bolder':'normal';

						if( $options.hideRest ){
							var $rest = $this.parent().siblings();
							$obj.HideElemnts( $rest );
							$obj.IconShow( $rest );
						}
						$this.css({'font-weight': $weight });
						$content
							.addClass( 'animate-height' )
							.css({ 'height': $height });
							
						$obj.ToggleIcon( $this );
					}
				});
		},

		ToggleIcon: function( el ){

			var $obj = this,
					$opt = $obj.options,
					$icon = el.children( $opt.icon ),
					$parent = el.parent();

			$icon
				.addClass( 'animate-opacity' )
				.css( 'opacity', 0 );

			window.setTimeout(function(){
				$icon.hasClass( $opt.show ) ? $obj.IconHide( $parent ) : $obj.IconShow( $parent );
				$icon.css( 'opacity', 1 );
			}, 200);
		},

		HideElemnts: function( el ){

			var $opt = this.options;

			el
				.find( $opt.text )
					.css({ 'height': 0 });
		},

		IconShow: function( el ){

			var $opt = this.options;

			el
				.find( $opt.icon )
					.removeClass( $opt.hide )
					.addClass( $opt.show );
		},

		IconHide: function( el ){

			var $opt = this.options;

			el
				.find( $opt.icon )
					.removeClass( $opt.show )
					.addClass( $opt.hide );
		}
	};

	$.fn.accordion = function( options ){

		return this.each( function(){
			var a = Object.create( accordion );
			a.init( options, this );
		});
	};

	$.fn.defaults = {
		'title': '.accordion-title',
		'text': '.accordion-toggle',
		'icon': '.accordion-icon', // icon in HTML code
		'show': 'icomoon-plus', // CSS class name - show icon
		'hide': 'icomoon-minus',  // CSS class name - hide icon
		'iconHtml': '<i></i>', // HTML code for icon. Do not add CSS class!!!
		'speed': 300, // Animation speed
		'hideRest': false, // True or False. Hiding other elements.
		'start': 1 // 0 - everything is hidden, 1 -show first element from accordion
	};

})( jQuery, window, document );
