/**
 * @author PC-164
 */

$(document).ready(function() {
	//가상의 데이터
	var task_list = [{
		'name' : '귤 따기',
		'duedate' : '2015.01.28',
		'handler' : '윤성빈',
		'content' : '제주도에 가서 귤을따야합니다'
	}];
	
	var text = "";
	$.each(task_list, function(index, item) {
		text += "<div class='task'>";
		text += "할 일 이름 : " + item.name;
		text += "<br>마감일 : " + item.duedate;
		text += "<br>담당자 : " + item.handler;
		text += "<br>내용 : " + item.content;
		text += "</div>";
	});
	
	//task의 위치를 받아서 거기에 text를 출력
	var box = document.getElementById('task');
	box.innerHTML = text;
	
	//-------------------------------------------------------------	
	task_list = new Array();
	$('#save_btn').click(function() {
		var name = document.getElementById("task_name").value;
		var duedate = document.getElementById("task_duedate").value;
		var handler = document.getElementById("task_handler").value;
		var content = document.getElementById("task_content").value;
		alert(name + "\n" + duedate + "\n" + handler + "\n" + content);

		//데이터 베이스에 입력된 자료를 저장합니다. 지금은 디비 대신 걍 보여주기로 보여줌
		task_list.push({
			'name' : name,
			'duedate' : duedate,
			'handler' : handler,
			'content' : content
		});

		// 배열에 요소 추가
		var text = "";
		$.each(task_list, function(index, item) {
			text += "<div class='task'>";
			text += "할 일 이름 : " + item.name;
			text += "<br>마감일 : " + item.duedate;
			text += "<br>담당자 : " + item.handler;
			text += "<br>내용 : " + item.content;
			text += "</div>";
		});
		var box = document.getElementById('new_task');
		
		
		box.innerHTML = text;
	});
});

