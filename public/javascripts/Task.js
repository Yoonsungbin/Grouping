$.getJSON('/TaskAppend', function(data) {
       var dataform = JSON.stringify(data);
	var temp = JSON.parse(dataform);
//	alert(temp);
	var count = data.length;
	       var Work_Name = new Array();
               var Work_Dday = new Array();
               var Work_Memo = new Array();
              // var Work_Person = new Array();
               var Work_Top = new Array();
               var Work_Left = new Array();
               var Work_Finish = new Array();
               var Work_List = new Array();
	       var Work_Id = new Array();
	for(var i =0;i<count;i++){
                     Work_List.push({
                        'Id' : temp[i]._id,
                        'Name' : temp[i].Work_Name,
                        'Dday' : temp[i].Work_Dday,
                        'Memo' : temp[i].Work_Memo,
                        'Person' : temp[i].Work_Person.User_Name,
                        'Top' : temp[i].Work_Top,
                        'Left' : temp[i].Work_Left,
                        'Finish' : temp[i].Work_Finish
                     });
                  }
	var text = "";

            $.each(Work_List, function(index, item) {
	       text += "<div class ='card' id='" + item.Id + "'  style='top:"+item.Top+"; left:"+item.Left+";'>";
               text += "<div class='card-content'>";
               text += "할 일 이름 : " + item.Name;
               text += "<br>마감일 : " + item.Dday;
               text += "<br>담당자 : " + item.Person;
               text += "<br>내용 : " + item.Memo;
               text += "</div>";
               text += "</div><p>&nbsp;</p></div><p>&nbsp;</p></div><p>&nbsp;</p>";
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
//   alert(temp);
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
            clearTimeout(timer);  //prevent single-click action
	Id=this.id;
$.ajax({
        url: '/Update_TaskData',
        dataType : 'json',
        type :'POST',
        data :  {
     'Work_Id' : Id
   },
   success : function (result){
      var Work_List1 = [];
      var dataform1 = JSON.stringify(result);
      var temp1 = JSON.parse(dataform1);
      Work_List1.push({
        'Id' : temp1._id,
        'Name' : temp1.Work_Name,
        'Dday' : temp1.Work_Dday,
        'Memo' : temp1.Work_Memo,
        'Person' : temp1.Work_Person.User_Name,
        'Top' : temp1.Work_Top,
        'Left' : temp1.Work_Left,
        'Finish' : temp1.Work_Finish
      });
      var text1 = "";
      $.each(Work_List1, function(index, item) {
       text1 += "할 일 이름 : " + item.Name;
       text1 += "<br>마감일 : " + item.Dday;
       text1 += "<br>담당자 : " + item.Person;
       text1 += "<br>내용 : " + item.Memo;
     });
      $('#taskModal').modal('show');
      var box = document.getElementById('bb');
      box.innerHTML = text1;
    }
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
$.ajax({
        url: '/Update_LabelData',
        dataType : 'json',
        type :'POST',
        data :  {
     'Work_Id' : lId
   },
   success : function (result){
    var Label_List = [];
      var dataform = JSON.stringify(result);
      var temp = JSON.parse(dataform);
      Label_List.push({
        'Id' : temp._id,
        'Name' : temp.Label_Name,
      });
      var ltext = "";

      $.each(Label_List, function(index, item) {
 //     ltext += "<div class ='label' id ='" +item.Id +"' style ='top :"+item.Top+"; left:"+item.Left+";'>";
                  ltext += item.Name;
   //               ltext += "</div>";
     });
$('#labelModal').modal('show');
      var lbox = document.getElementById('textarea');
      lbox.innerHTML = ltext;
    }
  });
            lclicks = 0;  //after action performed, reset counter
        }

    })
    .on("dblclick",".label", function(ea){
        ea.preventDefault();  //cancel system double-lclick event
    });
