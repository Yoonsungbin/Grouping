var prj_name = "망고망고";
$(document).ready(function(){
	$('#prj').text(prj_name);
});
// 보기 형식 default를 리스트로 출력합니다
prepare("list");
function prepare(view){
	$(document).ready(function(){
		$.getJSON('/showlist' ,function(data){
			var files = [];
			var file_dataform = JSON.stringify(data);
			var file = JSON.parse(file_dataform);
			var count = file.length;
	//		alert(count);
			for (var i = 0; i < count ; i ++ ){
				files.push({
					'File_Name' : file[i].File_Name,
					'File_Size' : file[i].File_Size,
					'File_Uploader' : file[i].File_Uploader,
					'File_Date' :file[i].File_Date
				});
			}
		// 문자열 설정
		var td = "</td><td>";
		var list = "<table><tr><td></td><td>이름</td><td>크기</td><td>올린 사람</td><td>올린 날짜</td><td></td></tr>";
		var thumbnail = "";
		//var buttonH = "<button id='";
		//var buttonT = "' a href ='"+"'/'"+>내려받기</button>";
		
		var fileId = 0;	// 내려받기에 사용되는 id
		$.each(file, function(index, item){
			list += "<tr><td class='icon_width'><img class='small " + item.icon + "'>" + td+ item.File_Name + td + item.File_Size + td + item.File_Uploader + td + item.File_Date + td + "<a href='"+"/download/"+item.File_Name+"'>"+"다운로드"+"</a></td></tr>";
			thumbnail += "<span><img class='big " + item.icon + "'><br>" + item.name + "</span>";
			fileId++;
		});
		list += "</table>";
		
		// 보기 형식에 따라 내용을 출력합니다
		var content = document.getElementById('content');
		if(view == "list"){
			content.innerHTML = list;			
		} else if(view == "thumb"){
			content.innerHTML = thumbnail;			
		}
		
		// 내려받기 버튼을 누르면 파일이 다운로드됩니다
		$('.download').click(function(){
			alert(this.id +  "번째 파일을 다운로드합니다");
		});
	});
});
}

// 보기 형식을 리스트로 전환합니다
$(document).on("click", '#list', function(){
	prepare("list");		
});
// 보기 형식을 섬네일로 전환합니다
$(document).on("click", '#thumbnail', function(){
	prepare("thumb");		
});

