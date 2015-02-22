
 var list = new Array();
	$.getJSON('/CommunityList',function(data){
		var dataform = JSON.stringify(data.suc);
		var temp = JSON.parse(dataform);
		
		var Title = new Array();
		var Name = new Array();
		var Dday = new Array();
		var Point = new Array();
		var Text = new Array();
		for(var i =0; i<temp.length;i++){
			list.push({
				id : temp[i]._id,
				Name : temp[i].User_Name,
				Title :temp[i].Title,
				Dday :temp[i].Day,
				Point:temp[i].User_Point,
				Text : temp[i].Text
			});
		}
	prepare();
	});
	
	function prepare(){
		var num = 1;
		var text = "<tr><td>번호</td><td>제목</td><td>글쓴이</td><td>작성일</td></tr>";
		$.each(list, function(index, item){
			text += "<td class='no'>" + num + "</td>";
			text += "<td class='title' id='"+item.id+"'>" + item.Title + "</td>";
			text += "<td class='writer'><span class='ctb'>" + item.Point + "</span>" + item.Name + "</td>";
			text += "<td class='date'>"+item.Dday+"</td>";
			text += "</tr>";
			num++;
		});
		var view = document.getElementById('board');
		view.innerHTML = text;
	}
	$(document).on("click", ".title", function(){
  $.ajax({
      url : '/ClickList',
      dataType : 'json',
      type : 'POST',
      data : {
	 'id' : this.id
      },
      success : function(result) {
	if(result.suc == 'suc'){
         window.location = "Community_View";
	}
      }
   });
	});

	$(document).on('click','#write_btn',function(){
		console.log('success');
		window.location ="Community_Write";
	});

