var curr_page = 1;
var next_page = null;
var Modernizr = window.Modernizr;

$(document).ready(function() {
	var isAnimating = false,
	    endCurrPage = false,
	    endNextPage = false,
	    animEndEventNames = {
		'WebkitAnimation' : 'webkitAnimationEnd',
		'OAnimation' : 'oAnimationEnd',
		'msAnimation' : 'MSAnimationEnd',
		'animation' : 'animationend'
	},
	    animEndEventName = animEndEventNames[ Modernizr.prefixed('animation')],
	    support = Modernizr.cssanimations;

	function init() {
		$('#' + curr_page).addClass('selected');
		$('#page-' + curr_page).addClass('visible');

		// keyup으로 nextPage() 호출
		$(document).on("keyup", function(e) {
			if (e.keyCode == 37 || e.keyCode == 38) {
				//alert("up");
				if (curr_page == 1)
					return false;
				next_page = curr_page - 1;
				nextPage('up');
			} else if (e.keyCode == 39 || e.keycode == 80) {
				//alert("down");
				if (curr_page == 6)
					return false;
				next_page = curr_page + 1;
				nextPage('down');
			}
		});

		// scroll로 nextPage() 호출
		$(document).on("mousewheel DOMMouseScroll", function(e) {
			if (e.originalEvent.wheelDelta > 0) {
				//alert("up");
				if (curr_page == 1)
					return false;
				next_page = curr_page - 1;
				nextPage('up');
			} else {
				//alert("down");
				if (curr_page == 6)
					return false;
				next_page = curr_page + 1;
				nextPage('down');
			}
		});

		// shortcut 클릭 시 nextPage() 호출
		$(document).on('click', '.shortcut', function() {
			next_page = this.id;

			if (curr_page < next_page) {
				nextPage('down');
			} else if (curr_page > next_page) {
				nextPage('up');
			} else
				return false;
			// 같은 페이지를 누를 경우 무시함

		});
		// click pagination function
	}// init()

	function nextPage(direction) {
		// 페이지 전환 애니메이션이 실행중이면 false를 반환함
		if (isAnimating)
			return false;
		isAnimating = true;

		var $currPage = $('#page-' + curr_page),
		    $nextPage = $('#page-' + next_page);
		$nextPage.addClass('visible');
		var outClass = 'fade',
		    inClass = '';

		if (direction == 'down')
			inClass = 'moveFromBottom ontop';
		else if (direction == 'up')
			inClass = 'moveFromTop ontop';

		//$currPage.attr('class', 'page visible');
		//$nextPage.addClass('visible ontop');

		$currPage.addClass(outClass).on(animEndEventName, function() {
			$currPage.off(animEndEventName);
			endCurrPage = true;
			/*if (endNextPage) {
			 onEndAnimation($currPage, $nextPage);
			 }*/
		});

		$nextPage.addClass(inClass).on(animEndEventName, function() {
			$nextPage.off(animEndEventName);
			endNextPage = true;
			/*if (endCurrPage) {
			 onEndAnimation($currPage, $nextPage);
			 }*/
		});

		if ((endCurrPage && endNextPage) || !support) {
			onEndAnimation($currPage, $nextPage);
		}
	}

	function onEndAnimation($outpage, $inpage) {
		endCurrPage = false;
		endNextPage = false;
		resetPage($outpage, $inpage);
		isAnimating = false;
	}

	function resetPage($outpage, $inpage) {
		alert("stop");
		$outpage.attr('class', 'page');
		$inpage.attr('class', 'page visible');
		$('#' + curr_page).attr('class', 'shortcut');
		$('#' + next_page).attr('class', 'shortcut selected');
		curr_page = next_page;

		$('#head-bar').css('visibility', 'visible');
		$('#head-bar').css('z-index', '500');
		if (curr_page == 1) {
			$('#head-bar').css('visibility', 'hidden');
		}
	}

	init();

	return {
		init : init
	};
});

$(document).ready(function() {
	$('#signup_img').click(function() {
		$('#formLogin').css('transform', 'rotateY(180deg)');
		$('#formAddUser').css('transform', 'rotateY(0deg)');
	});
	$('#login_img').click(function() {
		$('#formLogin').css('transform', 'rotateY(0deg)');
		$('#formAddUser').css('transform', 'rotateY(180deg)');
	});

});
/* Modernizr 2.8.3 (Custom Build) | MIT & BSD
 * Build: http://modernizr.com/download/#-prefixed-testprop-testallprops-domprefixes
 */
;window.Modernizr=function(a,b,c){function w(a){i.cssText=a}function x(a,b){return w(prefixes.join(a+";")+(b||""))}function y(a,b){return typeof a===b}function z(a,b){return!!~(""+a).indexOf(b)}function A(a,b){for(var d in a){var e=a[d];if(!z(e,"-")&&i[e]!==c)return b=="pfx"?e:!0}return!1}function B(a,b,d){for(var e in a){var f=b[a[e]];if(f!==c)return d===!1?a[e]:y(f,"function")?f.bind(d||b):f}return!1}function C(a,b,c){var d=a.charAt(0).toUpperCase()+a.slice(1),e=(a+" "+m.join(d+" ")+d).split(" ");return y(b,"string")||y(b,"undefined")?A(e,b):(e=(a+" "+n.join(d+" ")+d).split(" "),B(e,b,c))}var d="2.8.3",e={},f=b.documentElement,g="modernizr",h=b.createElement(g),i=h.style,j,k={}.toString,l="Webkit Moz O ms",m=l.split(" "),n=l.toLowerCase().split(" "),o={},p={},q={},r=[],s=r.slice,t,u={}.hasOwnProperty,v;!y(u,"undefined")&&!y(u.call,"undefined")?v=function(a,b){return u.call(a,b)}:v=function(a,b){return b in a&&y(a.constructor.prototype[b],"undefined")},Function.prototype.bind||(Function.prototype.bind=function(b){var c=this;if(typeof c!="function")throw new TypeError;var d=s.call(arguments,1),e=function(){if(this instanceof e){var a=function(){};a.prototype=c.prototype;var f=new a,g=c.apply(f,d.concat(s.call(arguments)));return Object(g)===g?g:f}return c.apply(b,d.concat(s.call(arguments)))};return e});for(var D in o)v(o,D)&&(t=D.toLowerCase(),e[t]=o[D](),r.push((e[t]?"":"no-")+t));return e.addTest=function(a,b){if(typeof a=="object")for(var d in a)v(a,d)&&e.addTest(d,a[d]);else{a=a.toLowerCase();if(e[a]!==c)return e;b=typeof b=="function"?b():b,typeof enableClasses!="undefined"&&enableClasses&&(f.className+=" "+(b?"":"no-")+a),e[a]=b}return e},w(""),h=j=null,e._version=d,e._domPrefixes=n,e._cssomPrefixes=m,e.testProp=function(a){return A([a])},e.testAllProps=C,e.prefixed=function(a,b,c){return b?C(a,b,c):C(a,"pfx")},e}(this,this.document);
