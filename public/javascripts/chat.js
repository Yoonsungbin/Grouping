  $.getJSON('/Get_ProjectData', function (data) {
    var User_Name = data.User_Name;
    var Project_Id = data.Project_Id;
    var socket = io();
    var Time = new Date();
    socket.on('connect',function(){  
    socket.emit('join', {
       User_Name : User_Name,
       Project_Id : Project_Id
     });
   //접속한지 알려주기 위한 메세지
   socket.emit('getgreet', User_Name +'님이 접속하셨습니다.');
	
   socket.on('putgreet', function(msg){
     $('#messages').append($('<h4 align="center">').text(msg));
   });
      //접속한 사람을 알기위한 함수 
      socket.on('Connect_Member', function(data){                
	if( data == null ) {

	} else {
        var Connect_List = [];
        var Connect_Dataform = JSON.stringify(data);
//	alert(Connect_Dataform);
        var Connect_User = '';               
        var Connect = JSON.parse(Connect_Dataform);
        var count = Connect[0].Access_Member.length;
//	alert(count);
//	alert(Connect);
//	alert(Connect[0].Access_Member[0]);
        for( var i =0;i<count;i++){
         Connect_List.push({'user' : Connect[0].Access_Member[i]});
        }                     
        $.each(Connect_List, function(index, item){
          Connect_User += "<li><span>●</span>"  +item.user + "</li>"; 
        });
        $('#access_user').empty();
        $('#access_user').append(Connect_User);
        Connect_User = '';
        Connect_List = '';
	}
      });

  //접속안한 사람을 알기위한 함수
  socket.on('Disconnect_Member', function(data) {
	if(data == null ) {
		//alert('aaa');
	}else {
    var DisConnect_Dataform = JSON.stringify(data);
    var DisConnect_User = '';
    var DisConnect = JSON.parse(DisConnect_Dataform);
    var DisConnect_Count = DisConnect[0].Access_Member.length;
    var DisConnect_List = [];
    for( var i =0;i<DisConnect_Count;i++){           
	      DisConnect_List.push({'user' : DisConnect[0].Access_Member[i]});
	}
    

    $.each(DisConnect_List, function(index, item){
      DisConnect_User += "<li><span>●</span>"  +item.user + "</li>"; 
    });

    $('#nonaccess_user').empty();
    $('#nonaccess_user').append(DisConnect_User);
    DisConnect_User = '';
    DisConnect_List = '';
}
  });
//DB에서 채팅가져오기
socket.on('premessage',function(data) {
 var text = '';
if(data.NewJoin == User_Name){
 if (data.Member == User_Name) {
  text += "<div class = 'my'>";
  text += "<div class = 'msg'>"+ data.message+ "</div>";
  text += "<div class ='time'>" + data.Time+ "</div>";
  text += "</div><p>&nbsp;</p>";
  $('#messages').append(text);
} else {
  var text = '';
  text += "<div class='your'>";
  text += "<div class = 'member'>"+ data.Member + "</div>";
  text += "<div class = 'msg'>" + data.message + "</div>";
  text += "<div class = 'time'>"+ data.Time + "</div>";
  text += "</div><p>&nbsp;</p>";
  $('#messages').append(text);
}
}
var el = document.getElementById('messages');
el.scrollIntoView(false);
});

  socket.on('putmessage',function(data) {
   if (data.User_Name == User_Name) {
    var text = '';
    text += "<div style ='width:70%'>";
    text += "<span style='display:inline-block; .display:inline; float: right; border: 1px solid blue; margin:auto width:auto'>" + data.message + "</span>";
    text += "<span style='display:inline-block; .display:inline; float: right; margin:auto width:auto'><sub>" + data.Time + "</sub></span>";
    text += "</div><p>&nbsp;</p>";
    $('#messages').append(text);

  } else {
    var text = '';
    text += "<div style ='width:70%'>";
    text += "<span style='display:inline-block; .display:inline; float: left; border: 1px solid red; margin:auto width:auto;'>"   + data.User_Name+ ':' + "</span>";
    text += "<span style='display:inline-block; .display:inline; float: left; border: 1px solid red; margin:auto width:auto;'>"+ data.message+ "  </span>";
    text += "<span style='display:inline-block; .display:inline; float: left; margin:auto width:auto;'><sub>"+ data.Time + "</sub></span>";
    text += "</div><p>&nbsp;</p>";
    $('#messages').append(text);
  }
  var el = document.getElementById('messages');
  el.scrollIntoView(false);
});
//메세지 보내기 버튼
$('form').submit(function(){
 var message =$('#m').val();
 var current_time = Time.getHours() + ":" + Time.getMinutes();
 socket.emit('getmessage', {
   message: message,
   User_Name:User_Name,
   Time : current_time
 });
 $('#m').val('');
 return false;
});

});
});
