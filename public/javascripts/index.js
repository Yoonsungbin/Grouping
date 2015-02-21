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


	// 이메일 중복 확인
	$(document).on("blur", "#inputUserEmail", function(){
	
		$.ajax({
                 url : '/Email_Confirm',
                 dataType : 'json',
                 type : 'POST',
                 data : {                          
                    'User_Email' : this.value          
           },
           success : function(result) {
            if(result.suc == true){
      
            } else  {
                 $('#email_msg').css('display', 'block');
            }          
           }
       });
	});
	$(document).on("focus", "#inputUserEmail", function(){
		$('#email_msg').css('display', 'none');
	});
	
	// 비밀번호 일치 확인
	$(document).on("blur", "#rePassword", function(){
		if($('#inputPassword').val() != $('#rePassword').val()){
			$('#pw_msg').css('display', 'block');
		}
	});
	$(document).on("focus", "#inputPassword", function(){
		$('#pw_msg').css('display', 'none');
	});
	$(document).on("focus", "#rePassword", function(){
		$('#pw_msg').css('display', 'none');
	});


});

