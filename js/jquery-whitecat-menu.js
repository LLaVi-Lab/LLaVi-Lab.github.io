/* Modernizr 2.6.2 (Custom Build) | MIT & BSD
 * Build: http://modernizr.com/download/#-touch-mq-teststyles-prefixes
 */
;window.Modernizr=function(a,b,c){function w(a){i.cssText=a}function x(a,b){return w(l.join(a+";")+(b||""))}function y(a,b){return typeof a===b}function z(a,b){return!!~(""+a).indexOf(b)}function A(a,b,d){for(var e in a){var f=b[a[e]];if(f!==c)return d===!1?a[e]:y(f,"function")?f.bind(d||b):f}return!1}var d="2.6.2",e={},f=b.documentElement,g="modernizr",h=b.createElement(g),i=h.style,j,k={}.toString,l=" -webkit- -moz- -o- -ms- ".split(" "),m={},n={},o={},p=[],q=p.slice,r,s=function(a,c,d,e){var h,i,j,k,l=b.createElement("div"),m=b.body,n=m||b.createElement("body");if(parseInt(d,10))while(d--)j=b.createElement("div"),j.id=e?e[d]:g+(d+1),l.appendChild(j);return h=["&#173;",'<style id="s',g,'">',a,"</style>"].join(""),l.id=g,(m?l:n).innerHTML+=h,n.appendChild(l),m||(n.style.background="",n.style.overflow="hidden",k=f.style.overflow,f.style.overflow="hidden",f.appendChild(n)),i=c(l,a),m?l.parentNode.removeChild(l):(n.parentNode.removeChild(n),f.style.overflow=k),!!i},t=function(b){var c=a.matchMedia||a.msMatchMedia;if(c)return c(b).matches;var d;return s("@media "+b+" { #"+g+" { position: absolute; } }",function(b){d=(a.getComputedStyle?getComputedStyle(b,null):b.currentStyle)["position"]=="absolute"}),d},u={}.hasOwnProperty,v;!y(u,"undefined")&&!y(u.call,"undefined")?v=function(a,b){return u.call(a,b)}:v=function(a,b){return b in a&&y(a.constructor.prototype[b],"undefined")},Function.prototype.bind||(Function.prototype.bind=function(b){var c=this;if(typeof c!="function")throw new TypeError;var d=q.call(arguments,1),e=function(){if(this instanceof e){var a=function(){};a.prototype=c.prototype;var f=new a,g=c.apply(f,d.concat(q.call(arguments)));return Object(g)===g?g:f}return c.apply(b,d.concat(q.call(arguments)))};return e}),m.touch=function(){var c;return"ontouchstart"in a||a.DocumentTouch&&b instanceof DocumentTouch?c=!0:s(["@media (",l.join("touch-enabled),("),g,")","{#modernizr{top:9px;position:absolute}}"].join(""),function(a){c=a.offsetTop===9}),c};for(var B in m)v(m,B)&&(r=B.toLowerCase(),e[r]=m[B](),p.push((e[r]?"":"no-")+r));return e.addTest=function(a,b){if(typeof a=="object")for(var d in a)v(a,d)&&e.addTest(d,a[d]);else{a=a.toLowerCase();if(e[a]!==c)return e;b=typeof b=="function"?b():b,typeof enableClasses!="undefined"&&enableClasses&&(f.className+=" "+(b?"":"no-")+a),e[a]=b}return e},w(""),h=j=null,e._version=d,e._prefixes=l,e.mq=t,e.testStyles=s,e}(this,this.document);

/* jQuery WhiteCat Menu 1.0.0
 */
if( typeof Object.create !== 'function' ) {
	Object.create = function( obj ) {
		function F() {};
		F.prototype = obj;
		return new F();
	}
}

( function( $, window, document, undefined ) {

	var menu = {

		init: function( options, elem ){

			var self = this;

			self.parent = jQuery( elem );
			self.options = options && typeof( options ) == 'object' ? $.extend( {}, $.fn.menu.defaults, options ) : $.fn.menu.defaults;
			
			console.log( 'WhiteCat Menu v1.0.0' );

			self.buttonMenu = $( self.options.button );
			self.Resize();
			self.Responsive();

			var touch = Modernizr.touch ? 'touch' : 'no-touch';

			jQuery( 'body' ).addClass( touch );
		},

		Reset: function(){

			var $obj = this,
					$parent = $obj.parent,
					$clone = $obj.clone,
					$buttonViewDropdown = $obj.buttonViewDropdown,
					$buttonMenu = $obj.buttonMenu;

			if( typeof $clone !== 'undefined' && $clone !== false ){

				$clone
					.removeClass( 'show' )
					.children( 'li' )
						.children( 'ul' )
							.height( 0 );

				$buttonMenu
					.removeClass( 'show' )
					.off( 'click touchstart' );

				$buttonViewDropdown
					.removeClass( 'show' )
					.off( 'click touchstart' );
			}

			if( Modernizr.touch ){
				$parent
					.children( 'li' )
						.has( 'ul' )
							.removeClass( 'show' )
							.off( 'touchstart' );
			}
		},

		Resize: function(){
			var $obj = this,
					$doit;

			jQuery( window ).on( 'resize', function(){

		    clearTimeout( $doit );

				$doit = setTimeout(function(){

					$obj.parent.hide();
					if( typeof $obj.clone !== 'undefined' && $obj.clone != false ){ $obj.clone.hide(); }
					// var deviceWidthResize = ( window.innerWidth > 0 ) ? window.innerWidth : screen.width;

					$obj.Reset();
					$obj.Responsive();

				}, 200);
			});
		},

		Responsive: function(){
			var $obj = this,
					$parent = $obj.parent;
					$clone = $obj.clone;


		    if( typeof $clone === 'undefined' ){
			    $obj.Copy();
		    }

			if( Modernizr.mq('only screen and (max-width: 960px)') ){
				$obj.parent.hide();
				$obj.clone.show();
			}
			else{
				$obj.parent.show();
				$obj.clone.hide();
			}

			$obj.ClickToggleCloneMenu();
			$obj.ClickToggleCloneDropdown();
		},

		Copy: function() {

			var $obj = this,
					$parent = $obj.parent;

			$parent.after( $parent.clone().attr( 'id', 'menu-clone' ) );

			$obj.clone = $parent.next();
			
			$obj.BuildCloneMenu();
			$obj.BuildCloneDropdown();
		},

		BuildCloneMenu: function(){

			var $obj = this,
					$clone = $obj.clone;

			$clone
				.find( '.link-to-button' )
					.removeClass( 'link-to-button' )
					.addClass( 'dropdown-item' );
		},

		BuildCloneDropdown: function(){

			var $obj = this,
					$clone = $obj.clone;

			$clone
				.children( 'li' )
					.children( 'ul' )
						.before( '<i class="view-dropdown icomoon-arrow-down"></i>' )
						.each(function(){

							var $this = jQuery( this ),
									$height = 0,
									$li = $this.children( 'li' );

							for( var i = 0; i < $this.children( 'li' ).length; ++i ){
								$height += $li.eq( i ).innerHeight();
							}

							$this
								.attr( 'data-height', $height +'px' )
								.height( 0 );

							$li
								.children( 'a' )
									.prepend( '<i class="list-icon icomoon-arrow"></i>' );
						});

			$obj.buttonViewDropdown = jQuery( '.view-dropdown' );
		},

		TouchToggleCloneMenu: function(){

			var $obj = this,
					$buttonMenu = $obj.buttonMenu;

			$buttonMenu.on( 'touchstart', $obj.ActionCloneMenu );
		},

		TouchToggleCloneDropdown: function() {

			var $obj = this,
					$buttonViewDropdown = $obj.buttonViewDropdown;

			$buttonViewDropdown.on( 'touchstart', $obj.ActionCloneDropdown );
		},

		ClickToggleCloneMenu: function(){

			var $obj = this,
					$buttonMenu = $obj.buttonMenu;

			$buttonMenu.on( 'click', $obj.ActionCloneMenu );
		},

		ClickToggleCloneDropdown: function() {

			var $obj = this,
					$buttonViewDropdown = $obj.buttonViewDropdown;

			$buttonViewDropdown.on( 'click', $obj.ActionCloneDropdown );
		},

		ActionCloneMenu: function( event ){

      event.stopPropagation();
      event.preventDefault();


			var $this = jQuery( this ),
					$clone = $this.prev( '#menu-clone' );

			$this.toggleClass( 'show' );
			$this.hasClass( 'show' ) ? $clone.show().addClass( 'show animate-left' ) : $clone.removeClass( 'show' );
		},

		ActionCloneDropdown: function( event ) {

      event.stopPropagation();
      event.preventDefault();

			var $this = jQuery( this ),
					$dropdown = $this.next( 'ul' ),
					$height;

			$this.toggleClass( 'show' );

			$height = $this.hasClass( 'show' ) ? $dropdown.attr( 'data-height' ) : 0;
			$dropdown.height( $height );
		}
	};

	$.fn.menu = function( options ){

		return this.each( function(){
			var m = Object.create( menu );
			m.init( options, this );
		});
	};

	$.fn.menu.defaults = {
		'maxWidth': 768,
		'button': '.menu-small'
	};

})( jQuery, window, document );
