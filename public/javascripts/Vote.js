// 임시 유저 네임, 유저id로 변경해도 무방합니다.
var user;
var list = new Array();
            $.getJSON('/getUserName',function(data){
		user = data.name;
$.getJSON('/GetVote',function(data){

	for (var i = 0; i < data.length; i++) {	
			var id = data[i]._id;
			var name = data[i].Vote_Name;
			var dday = data[i].Vote_Dday;	
			var opt = new Array();
			var num = new Array();
			var mem = new Array();
		for(var j = 0; j < data[i].Vote_Opt.length;j++){
			opt[j] = data[i].Vote_Opt[j];
			num[j] = data[i].Vote_Num[j];
		}

	for(var k = 0; k < data[i].Vote_Member.length;k++){
			mem[k] = data[i].Vote_Member[k];
	}

			list.push({
			            Title : name,
			            Dday : dday,
			            Opt : opt,
			   	    Num : num,
	      			    Member:mem
				});
		

	}
prepare();
});
});
function prepare(){
	$(document).ready(function(){
		var text = "";
		voteId = 0;
		$.each(list, function(index, item){
			var valid =false;
			// 기투표자인지 확인하여 valid 수정
			for(var i = 0; i<item.Member.length; i++){
			if(user == item.Member[i]){
					valid = true;
				}
			}
			// 투표 마감일이 지난 투표는 valid변수를 flase로 수정합니다. ※미구현
			if(valid){	// valid가 true일 경우, 클릭시 Vote_Do_Modal이 나오도록 합니다.
				text += "<div class='vote'>";
				text += "<div class='title notyet'><a id='" + item.id + "' name='"+voteId+"' class='vote_do' data-toggle='modal' href='#Vote_Do_Modal' data-role='add'>" + item.Title + "</a></div>";
				text += "<div class='detail notyet'><span>투표에 참여하지 않았습니다</span></div>";
			} else{		// valid가 false일 경우, 클릭시 Vote_Done_Modal이 나오도록 합니다.
				// 최다 득표와 그에 해당하는 cnt값을 보여주기 위한 코드입니다.
				var max = [0];
				var temp = 0;
				// cnt중 가장 큰 수를 찾아 그 인덱스를 max에 입력하는 for문, 
				for(i = 0; i<item.Num.length; i++){
					if(temp < item.Num[i]){	// 최고값이 나올 경우
						temp = item.Num[i];
						max = [i];					// max배열을 현재 인덱스 하나로 이루어진 배열로 초기화합니다.
					} else if(temp == item.Num[i]){	// 최다 득표가 다수일 경우
						max.push(i);		// max배열에 인덱스를 push합니다.
					}
				}
				text += "<div class='vote'>";
				text += "<div class='title already'><a id='" + item.id + "' name='"+voteId+"' class='vote_done' data-toggle='modal' href='#Vote_Done_Modal' data-role='add'>" + item.Title + "</a></div>";
				text += "<div class='detail already'><span>최다득표 [" + item.Num[max[0]] + "표] ";
				// 최다득표 선택지가 여러개일수 있기 때문에 반복문으로 선택지를 보여줍니다.
				for(i = 0; i<max.length; i++){
					text += item.Opt[max[i]];
					if(i < max.length - 1) text += ", ";
				}
				text += "</span></div>";
			}
			text += "</div>";
			voteId++;
		});	// each문

var content = document.getElementById('vote_list');
content.innerHTML = text;		
});
}

// Vote_Add_Modal에서 선택지를 추가합니다
$(document).on('click', '#option_add', function(){
	var optxt = "";
	optxt += "<input type='text' name='option' placeholder='선택지'><br>";
	$('#vote_add_form').append(optxt);
});

// 투표를 추가합니다
$(document).on('click', '#vote_add_btn', function(){
	var name = document.getElementById('vote_name').value;
	var due = document.getElementById('vote_due').value;
	var temp = document.getElementsByName('option');
	var opt = new Array();
	var num = new Array();
	for(var i = 0; i < temp.length; i++){
		opt.push(temp[i].value);
		num.push(0);
	}
	var oo = JSON.stringify(opt);
	var nn = JSON.stringify(num);
	$.ajax({
		url : '/VoteAdd',
		dataType : 'json',
		type : 'POST',
		data : {                          
			'Vote_Name' : name,
			'Vote_Opt' :  oo,
			'Vote_Num' : nn,
			'Vote_Dday' : due,
              //프로젝트 내용
          },
          success : function(result) {
	$('#Vote_Add_Modal').modal('hide');		// 모달창을 닫습니다. 사실 닫는게 아니라 가리는것.
		window.location = "Vote";
          }
      });
	
	//prepare();		// prepare()를 호출해 추가된 투표를 투표리스트에 보이도록 합니다.
});	// 투표를 추가하는 함수

// #Vote_Do_Modal   Show!
$(document).on('click', '.vote_do', function(){
	alert('a')
alert(this.name);
	index = this.name;
	var mtitle = $('#Vote_Do_Modal .modal-title');
	var mbody = $('#Vote_Do_Modal .modal-body');
	mtitle.text(list[index].Title);
	mtitle.append("[마감일 : " + list[index].Dday + "]");
	var text = "";
	for(var i = 0; i<list[index].Opt.length; i++){
		text += "<input type='radio' name='voted' value='" + i + "'> ";
		text += list[index].Opt[i] + "<br>";
	}
	mbody.text("");
	mbody.append(text);
});

// 투표하기 완료 버튼 클릭 시
$(document).on('click', '#vote_do_btn', function(){
	var radio = document.getElementsByName('voted');
	var number;
	// index번째 list의 옵션중 라디오버튼으로 선택된 옵션의 cnt를 1 증가시키는 for문입니다
	for(var i = 0; i<radio.length; i++){
		if(radio[i].checked) number =i;
//list[index].Num[radio[i].value]++;
	}
/*
	$.ajax({
	url: '/VoteDone',
	dataType: 'json',
	type : 'POST',
	data: {
		 'id' :index,
		 'index' : number
	},
	success: function(result) {

	$('#Vote_Do_Modal').modal('hide');		// 모달창을 닫습니다. 사실 닫는게 아니라 가리는것.
	}
});
*/


//	list[index].Member.push(user);		// voter(기투표자)에 현재 유저를 추가합니다.
//	prepare();		// prepare()를 호출해 추가된 투표를 투표리스트에 보이도록 합니다.
});

// Vote_Done_Modal   Show!
$(document).on('click', '.vote_done', function(){
	index = this.name;
	var mtitle = $('#Vote_Done_Modal .modal-title');
	var mbody = $('#Vote_Done_Modal .modal-body');
	mtitle.text(list[index].Title);
	mtitle.append("[마감일 : " + list[index].Dday + "]");
	var text = "<ol>";
	for(var i = 0; i<list[index].Opt.length; i++){
		text += "<li>" + list[index].Opt[i] + " [" + list[index].Num[i] + "표]</li>";
	}
	text += "</ol>";
	mbody.text("");
	mbody.append(text);
});
