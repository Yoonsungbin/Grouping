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
var scr = document.getElementById('messages');
  scr.scrollTop = scr.scrollHeight;
   });
      //접속한 사람을 알기위한 함수 
      socket.on('Connect_Member', function(data){                
	if( data == null ) {

	} else {
        var Connect_List = [];
        var Connect_Dataform = JSON.stringify(data);
        var Connect_User = '';               
        var Connect = JSON.parse(Connect_Dataform);
        var count = Connect[0].Access_Member.length;
        for( var i =0;i<count;i++){
         Connect_List.push({'user' : Connect[0].Access_Member[i]});
        }                     
        $.each(Connect_List, function(index, item){
          Connect_User += "<li><span>●</span>"  +item.user + "</li>"; 
        });
        $('#online_mem').empty();
        $('#online_mem').append(Connect_User);
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

}
    $('#offline_mem').empty();
    $('#offline_mem').append(DisConnect_User);
    DisConnect_User = '';
    DisConnect_List = '';
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
var scr = document.getElementById('messages');
  scr.scrollTop = scr.scrollHeight;
});

  socket.on('putmessage',function(data) {
   if (data.User_Name == User_Name) {
    var text = '';
  text += "<div class = 'my'>";
  text += "<div class = 'msg'>"+ data.message+ "</div>";
  text += "<div class ='time'>" + data.Time+ "</div>";
  text += "</div><p>&nbsp;</p>";
    $('#messages').append(text);

  } else {
    var text = '';
  text += "<div class='your'>";
  text += "<div class = 'member'>"+ data.User_Name + "</div>";
  text += "<div class = 'msg'>" + data.message + "</div>";
  text += "<div class = 'time'>"+ data.Time + "</div>";
  text += "</div><p>&nbsp;</p>";
    $('#messages').append(text);
  }
  
  var scr = document.getElementById('messages');
  scr.scrollTop = scr.scrollHeight;

});
//메세지 보내기 버튼
$('form').submit(function(){
 var message =$('#m').val();
var time = new Date();
 var current_time = time.getHours() + ":" + time.getMinutes();
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
