$.getJSON('/TaskAppend', function(data) {
       var dataform = JSON.stringify(data);
	var temp = JSON.parse(dataform);
	var count = data.length;
	       var Work_Name = new Array();
               var Work_Dday = new Array();
               var Work_Memo = new Array();
               var Work_Person = new Array();
               var Work_Top = new Array();
               var Work_Left = new Array();
               var Work_Finish = new Array();
               var Work_List = new Array();
	       var Work_Id = new Array();
	for(var i =0;i<count;i++){
		var User_Info = new Array();
		for(var j = 0; j< temp[i].Work_Person.length ; j++){
			User_Info.push(temp[i].Work_Person[j].User_Name);
		}	
                     Work_List.push({
                        'Id' : temp[i]._id,
                        'Name' : temp[i].Work_Name,
                        'Memo' : temp[i].Work_Memo,
                        'Person' : User_Info,
                        'Top' : temp[i].Work_Top,
                        'Left' : temp[i].Work_Left,
                        'Finish' : temp[i].Work_Finish
                     });
                  }
	var text = "";
	var pp = 0;
            $.each(Work_List, function(index, item) {
	       text += "<div class ='card' id='" + item.Id + "'  style='top:"+item.Top+"; left:"+item.Left+";'>";
               text += "<div class='card-content'>";
               text += "할 일 이름 : " + item.Name;
             //  text += "<br>마감일 : " + item.Dday;
               text += "<br>담당자 : " + item.Person;
               text += "<br>내용 : " + item.Memo;
	       text += "<input class='tgl tgl-flip' id='"+pp+"' type='checkbox'>";
               text += "<label class='tgl-btn' data-tg-off='완료' data-tg-on='진행중!'for='"+pp+"'></label>";
               text += "</div>";
               text += "</div><p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p>";
		$('#pp').val(item.Finish);
		pp++;
            });

            $('body').append(text);
            $('.card').draggable({
             //  grid : [205, 140]
            });
	});
///////////////////////////////////////////
/////////////////////////라벨

$.getJSON('/LabelAppend',function(data){
   var dataform = JSON.stringify(data);
   var temp = JSON.parse(dataform);
   var Label_List = new Array();
   var count = data.length;
      for(var i =0; i < count; i++){
         Label_List.push({
            'Id' : temp[i]._id,
            'Name' : temp[i].Label_Name,
            'Top' : temp[i].Label_Top,
            'Left' : temp[i].Label_Left
         });
      }
      var ltext = "";
               $.each(Label_List, function(index, item) {
                  ltext += "<div class ='label' id ='" +item.Id +"' style ='top :"+item.Top+"; left:"+item.Left+";'>";
                  ltext += item.Name;
                  ltext += "</div></div><p>&nbsp;</p>";
               });

                  $('body').append(ltext);

               $('.label').draggable({
//                  grid : [205, 140]
               });
   });


            var MemberList = new Array();
      	$.getJSON('/GetMemberList',function(data){
            var dataform = JSON.stringify(data);
            var info = JSON.parse(dataform);
            var Member_Name = new Array();
            var Member_Id = new Array();
	    var length = info[0].Member_Name.length;
            for(var i = 0; i < length ; i++){
                  MemberList.push({
                     'Id' : info[0].Member_Id[i],
                     'Name' : info[0].Member_Name[i]
                  });
            }
         });
$(document).on('click', '.new', function() {
var mem ="";
//alert(MemberList[0].Name);
      		 $.each(MemberList, function(index, item) {
      		 	mem += "<input class='chk' type='checkbox' name='"+item.Name+"' value='" + item.Name + "' id='" +item.Id+ "'>" + item.Name+  "<p>&nbsp;</p>";
            	  });
      		var box = document.getElementById('plz');
      		box.innerHTML = mem;
 	var dd = new Date();
	var d = new Date(dd.getFullYear(),dd.getMonth()+1,dd.getDate());
	var month = parseInt(dd.getMonth()) + 1;
	if( month < 10 ) {
		var mm = 0 + String(month);
	}
	var aa =d.getFullYear()+'-'+mm+'-'+d.getDate();
      		$('#myModal').modal('show');
	$('#Task_Sday').val(aa);
    	});




$(document).on('click', '#my_save_btn', function() {
      		var Name = document.getElementById("Task_Name").value;
      		var Sday = document.getElementById("Task_Sday").value;
      		var Memo = document.getElementById("Task_Memo").value;
      		if (!Sday) {
      			var d = new Date();
      			var yyyy = d.getFullYear();
      			var mm = (d.getMonth() + 1);
      			var dd = d.getDate();
      			Sday = yyyy + "-" + mm + "-" + dd;
      		}
      		var Dday = document.getElementById("Task_Dday").value;
   			var Work_Person  = new Array();
      		$(".chk:checked").each(function(){
   			var User_Info = new Object();
      			User_Info.User_Id = this.id;
      			User_Info.User_Name = $(this).val();
      			Work_Person.push(User_Info);
      		});
	var dataform = JSON.stringify(Work_Person);
         $.ajax({
            url : '/TaskNewAdd',
            dataType : 'json',
            type : 'POST',
            data : {
               'Name' : Name,
               'Sday' : Sday,
               'Dday' : Dday,
               'Work_Person' : dataform,
               'Memo' : Memo,
            },
            success : function(data) { 
		$('#myModal').modal('hide');
               location.replace('Task');                                
            }
         });   

      	});



 $(document).on('click', '#label_save_btn', function() {
            var Label_Name = document.getElementById("Label_Name").value;
    $.ajax({
            url : '/LabelNewAdd',
            dataType : 'json',
            type : 'POST',
            data : {
		'Label_Name' : Label_Name,
            },
            success : function(data) {
            $('#labelModal').modal('hide');
               location.replace('Task');
            }
         });

           });










///////////////////////////////////////////////////////////////////////////////////
////////////////////카드
var DELAY = 500,
    clicks = 0,
    timer = null;
    $(document).on("mouseup",".card",
    function(e){
        clicks++;  //count clicks
        if(clicks == 1) {
     var  x = event.pageX - event.offsetX;
     var  y = event.pageY - event.offsetY; 
     var Id = this.id;	
            timer = setTimeout(function() {
	$.ajax({
	        url: '/Get_TaskData',
	        dataType : 'json',
	        type :'POST',
	        data :  {
	        'Work_Id' : Id,
	        'x' : x,
	        'y' : y
	        },
	        success : function (result){
        	}
	});
                clicks = 0;  //after action performed, reset counter
            }, DELAY);
        } else {
////////////////////////////////////////////////////////////////////////////////더블클릭
            clearTimeout(timer);  //prevent single-click action
	Id=this.id;

    var mem ="";
    $.each(MemberList, function(index, item) {
      mem += "<input class='chk' type='checkbox' name='chec' value='" + item.Name + "' id='" +item.Id+ "'>" + item.Name+  "<p>&nbsp;</p>";
    });
    var bo = document.getElementById('meml');
    bo.innerHTML = mem;

 $.ajax({
        url : '/InitTaskData',
        dataType : 'json',
        type : 'POST',
        data : {
         'Work_Id' : Id,
     },
     success : function(data) {
//	$('#Modify_Name').val($('#Task_Name').value);
   var dataform = JSON.stringify(data);
   var temp = JSON.parse(dataform);
	$('#Modify_Name').val(temp.Work_Name);
	$('#Modify_Sday').val(temp.Work_Sday);
	$('#Modify_Dday').val(temp.Work_Dday);
	//$('#Modify_Person').val(temp.Work_Name);
	$('#Modify_Memo').val(temp.Work_Memo);
	$('#Modify_Finish').val(temp.Work_Finish);
	var person = JSON.stringify(temp.Work_Person);
	var num = JSON.parse(person);
	var TextName = "";
	//alert(num.length);
	//alert(num[0].User_Name);

	var chec = document.getElementsByName("chec");
	for(var i =0; i < num.length;i++){
		for(var j = 0; j < chec.length; j++) {
			if(chec[j].value == num[i].User_Name){
				chec[j].checked =true;
			}
		}
		TextName += num[i].User_Name +","	
	}
var M_List = new Array();
	M_List.push({
                        'Name' : temp.Work_Name,
                        'Memo' : temp.Work_Memo,
			'Sday' : temp.Work_Sday,
			'Dday' : temp.Work_Dday,
			'Person' : TextName,
                        'Finish' : temp.Work_Finish
                     });

	 var yes = "";

            $.each(M_List, function(index, item) {
               yes += "할 일 이름 : " + item.Name;
               yes += "<br>시작일 : " + item.Sday;
               yes += "<br>마감일 : " + item.Dday;
               yes += "<br>참여자 : " + item.Person;
               yes += "<br>내용 : " + item.Memo;
            });
            var box = document.getElementById('bb');
            box.innerHTML = yes;


	}
  });

    $('#editModal').modal('show');

 $(document).on('click', '#TaskModifyBtn', function() {
     var Name = document.getElementById("Modify_Name").value;
     var Sday = document.getElementById("Modify_Sday").value;
     var Memo = document.getElementById("Modify_Memo").value;
    var Dday = document.getElementById("Modify_Dday").value;

    var Work_Person  = new Array();
    $(".chk:checked").each(function(){
        var User_Info = new Object();
        User_Info.User_Id = this.id;
        User_Info.User_Name = $(this).val();
        Work_Person.push(User_Info);
    });
    var dataform = JSON.stringify(Work_Person);
    $.ajax({
        url : '/Update_TaskData',
        dataType : 'json',
        type : 'POST',
        data : {
         'Work_Id' : Id,
         'Name' : Name,
         'Sday' : Sday,
         'Dday' : Dday,
         'Work_Person' : dataform,
         'Memo' : Memo,
     },
     success : function(data) {
        $('#editModal').modal('hide');
     //   $('#TaskModal').modal('hide');
        location.replace('Task');
    }
  });
});
            clicks = 0;  //after action performed, reset counter
        }

    })
    .on("dblclick",".card", function(e){
        e.preventDefault();  //cancel system double-click event
    });





////////////////////////////label event //////////////////////////

var lDELAY = 500,
    lclicks = 0,
    ltimer = null;
var lId;
$(document).on("mousedown",".label",function(){
      lId = this.id;
});
    $(document).on("mouseup",".label",
    function(ea){
        lclicks++;  //count lclicks
        if(lclicks == 1) {
     var  lx = event.pageX - event.offsetX;
     var  ly = event.pageY - event.offsetY;
            ltimer = setTimeout(function() {
$.ajax({
        url: '/Get_LabelData',
        dataType : 'json',
        type :'POST',
        data :  {
        'Work_Id' : lId,
        'x' : lx,
        'y' : ly
        },
        success : function (result){
        }
});
                lclicks = 0;  //after action performed, reset counter
            }, lDELAY);
        } else {
            clearTimeout(ltimer);  //prevent single-lclick action
            $('#editlabelModal').modal('show');

$(document).on('click', '#LabelModifyBtn', function() {
            var Label_Name = document.getElementById("Label_Name1").value;

$.ajax({
        url: '/Update_LabelData',
        dataType : 'json',
        type :'POST',
        data :  {
     'Work_Id' : lId,
     "Label_Name" : Label_Name,
   },
   success : function (result){
            $('#editlabelModal').modal('hide');
    }
  });
           });
            lclicks = 0;  //after action performed, reset counter
        }

    })
    .on("dblclick",".label", function(ea){
        ea.preventDefault();  //cancel system double-lclick event
    });
