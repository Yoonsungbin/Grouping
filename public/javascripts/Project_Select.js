 var Project_Name = new Array();
 var Project_Id = new Array();
 var Project_DueDate = new Array();
 var Project_Progress = new Array();
 var Project_Memo = new Array();
 var count;
 var User_Name;
 var User_Email;


$.getJSON('/ProjectAppend', function(data) {
   count = data.length;
   User_Name = data.User_Name;
   User_Email = data.User_Email;
   for (var j = 0; j < count; j++) {
      Project_Name[j] = data.Project_Name[j];
      Project_Id[j] = data.Project_Id[j];
      Project_DueDate[j] = data.Project_DueDate[j];
  //    Project_Progress[j] = data.Project_Progress[j];
      Project_Memo[j] = data.Project_Memo[j];
   }
   prepare();
});

function prepare() {
   $(document).ready(function() {
      //var name = '박망고';
      var name = User_Name;
      $('#user').text(name);
      // 데이터베이스에서 참여하고있는 프로젝트 목록을 읽어옵니다.
      var list = [];
    for (var i = 0; i < count; i++) {
         list.push({
            title : Project_Name[i],
            duedate : Project_DueDate[i],
	    Project_Id : Project_Id[i],
   //         progress : Project_Progress[i],
            memo : Project_Memo[i]
         });
      }
      var text = "";
      $.each(list, function(index, item) {
         // text += "<br><a class='prj' id='" + prjId + "'><br>" + item.title + "<br></a><div class='tt' id='" +btnId+"'><input type ='button' value='나가기'></div>";
         text += "<div class='prj' id ='"+item.Project_Id+"'>";
         text += "<img class='del' src='../images/delete.png'>";
         text += "<span class ='due'>" +"D - "+ item.duedate + "</span>";
 	 text += "<span class='title'>" + item.title + "</span>";
         text += "<div class ='detail'> " + item.memo + "</div>";
         text += "</div>";
      });
      // 프로젝트 추가 이미지

		text += "<div class='prj add'>";
		text += "<form id='formProjectAdd' name='Project_Add' method='POST' action='/ProjectAdd'>";
		text += "프로젝트 이름 <input type='text' name='Project_Name' placeholder='띄어쓰기 포함 15자 이내' maxlength='15'>";
		text += "프로젝트 마감일 <input type='date' name='Project_Dday'>";
		text += "프로젝트 설명 <input type='text' name='Project_Memo' placeholder='띄어쓰기 포함 40자 이내' maxlength='40'>";
		text += "<input type='submit' value='프로젝트 시작하기'>";
		text += "</form>";
		text += "</div>";

      var box = document.getElementById('content');
      box.innerHTML = text;


      // prj_list에 text를 덧붙입니다.
   });


}
// 프로젝트 선택 시
$(document).on("click", ".title", function() {
   $.ajax({
      url : '/Select_Project',
      dataType : 'json',
      type : 'POST',
      data : {
         'Project_Id' : $(this).parents('.prj').attr('id'),
         //프로젝트 내용
      },
      success : function(result) {
         window.location = result.Next;
      }
   });
});
$(document).on("click", ".del", function() {
   $.ajax({
      url : '/ProjectDelete',
      dataType : 'json',
      type : 'POST',
      data : {
         'Project_Id' : $(this).parents('.prj').attr('id'),
         //프로젝트 내용
      },
      success : function(result) {
         window.location = result.Next;
      }
   });
});

