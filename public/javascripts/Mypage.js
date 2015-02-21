$.getJSON('/GetUser',function(data){
	var dataform = JSON.stringify(data);
	var temp = JSON.parse(dataform);

	var name = temp.User_Name;
	var email = temp.User_Email;
	var contribution = '기여도 ★★★★☆';
	// 데이터를 알맞은 곳에 표시합니다.
	$('#user_name').text(name);
	$('#user_email').text(email);
	$('#user_contribution').text(contribution);
	
});


$.getJSON('/GetMyList',function(data){
	var dataform = JSON.stringify(data);
	var temp = JSON.parse(dataform);
	var Work_Name = new Array();
	var Project_Name = [];
	var Task_Count = new Array();
	for(var i = 0; i < temp.length; i++) {
	 Project_Name[i] = temp[i]._id;
		var form = JSON.stringify(temp[i].Work_Name);
	        var kk = JSON.parse(form);
		Task_Count[i] = kk.length;
		 Work_Name[i] = new Array();
		for(var j=0 ; j <kk.length ;j++){
			Work_Name[i][j] = kk[j];
		}
	}
var List = new Array();
	for (var i = 0; i < temp.length; i++) {
		List.push({
			'Project_Name': Project_Name[i]
		});
	}
	var text = "";
	var addId = 0;
	$.each(List, function(index, item){
		text += "<li id = '"+addId+"'><a>"+item.Project_Name+"</a></li>";
	addId++;
	});	
var dropdown = document.getElementById('prj_select_list');
	dropdown.innerHTML = text;
	var selected = "선택되지 않았습니다";
	
	// 드롭다운 클릭
	$(document).on("click", "#prj_select_list>li", function(){
		selected = this.id;
		var btn_view = document.getElementById('prj_select_btn');
		var task_view  = document.getElementById('task_list');
		//alert(List[selected].Project_Name);
		btn_view.innerHTML = List[selected].Project_Name + "   <span class='caret'></span>";
		var WList = new Array();
		   for(var j =0 ; j < Task_Count[selected] ; j++) {
                        WList.push({
                                'Work_Name' : Work_Name[selected][j]
                        });
                }
		// 리스트에 선택된 프로젝트의 업무를 보여줍니다
		text = "";
		$.each(WList, function(index, item){
				text += "<li class='list-group-item'>" + item.Work_Name + "</li>";
		});
		task_view.innerHTML = text;
		
	});
	
	// 나가기 클릭
	$(document).on("click", "#prj_out_btn", function(){
		alert(selected);
	});
});



