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
			if (e.keyCode == 33 || e.keyCode == 37 || e.keyCode == 38) {
				//alert("up");
				if (curr_page == 1)
					return false;
				next_page = curr_page - 1;
				nextPage('up');
			} else if (e.keyCode == 34 || e.keyCode == 39 || e.keyCode == 40) {
				//alert("down");
				if (curr_page == 6)
					return false;
				next_page = curr_page + 1;
				nextPage('down');
			}
		});
		
		// scroll로 nextPage() 호출
		$(document).on("mousewheel", function(e) {
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
		});// click pagination function
	}// init()

	function nextPage(direction) {
		// 페이지 전환 애니메이션이 실행중이면 false를 반환함
		if (isAnimating){
			return false;
		}
		isAnimating = true;
 
		var $currPage = $('#page-' + curr_page),
		    $nextPage = $('#page-' + next_page);
		$nextPage.addClass('visible');		
		$('#' + curr_page).attr('class', 'shortcut');
		$('#' + next_page).attr('class', 'shortcut selected');
		
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
			if (endNextPage) {
			 onEndAnimation($currPage, $nextPage);
			 }
		});

		$nextPage.addClass(inClass).on(animEndEventName, function() {
			$nextPage.off(animEndEventName);
			endNextPage = true;
			if (endCurrPage) {
			 onEndAnimation($currPage, $nextPage);
			 }
		});

		if (!support) {
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
		$outpage.attr('class', 'page');
		$inpage.attr('class', 'page visible');
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
	$('.toggle').click(function(){
		var input = this.id;
		if(input == "toggle_login"){
			$('#formLogin').css('transform', 'rotateY(0deg)');
			$('#formAddUser').css('transform', 'rotateY(180deg)');
			$("#toggle_signup").attr('class', 'toggle');
			$("#toggle_login").addClass('active');
		}else{	// input == "toggle_signup"
			$('#formLogin').css('transform', 'rotateY(180deg)');
			$('#formAddUser').css('transform', 'rotateY(0deg)');
			$("#toggle_login").attr('class', 'toggle');
			$("#toggle_signup").addClass('active');			
		}
	});

	$('#btnSubmit').click(function() {
		var email = document.getElementById("inputUserEmail").value;
		var name = document.getElementById("inputUserName").value;
		var password = document.getElementById("inputPassword").value;
		var repassword = document.getElementById("rePassword").value;
		alert(password + repassword);

		if (email == "") {
			alert("이메일을 입력해주세요!");
			return false;
		} else if (name == "") {
			alert("이름을 입력해주세요!");
			return false;
		} else if (password == "") {
			alert("비밀번호를 입력해주세요!");
			return false;
		} else if (repassword == "") {
			alert("비밀번호 확인을 입력해주세요!");
			return false;
		} else if (password == repassword) {// 구현되지 않음 수정필요
			alert("가입되었습니다!");
			$('#formLogin').css('transform', 'rotateY(0deg)');
			$('#formAddUser').css('transform', 'rotateY(180deg)');
		} else {
			alrert("비밀번호가 일치하지 않습니다!");
			return false;
		}
	});
});

