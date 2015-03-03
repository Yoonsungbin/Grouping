
 	var events_array = new Array();
$.getJSON('/GetCalendarList', function(data){
 	var dataform = JSON.stringify(data);
 	var list = JSON.parse(dataform);

 	for(var i = 0; i < list.length;i++){
		var Dday = (list[i].Work_Dday).split('-');
                var Sday = (list[i].Work_Sday).split('-');
 		events_array.push({
			'id' : list[i]._id,
 			'title' : list[i].Work_Name,
			'start' : new Date(Sday[0], Sday[1]-1, Sday[2]),
                        'end' : new Date(Dday[0], Dday[1]-1, String(parseInt(Dday[2])+1)),   
 			'tip' : list[i].Work_Memo,
 		});	
 	}
qwe();
});



function qwe() {
    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();
   

 $('#calendar').fullCalendar({
        header: {
            left: 'today',
            center: 'today',
            right: 'today'
        },
        selectable: true,
        editable:true,
        startEditable:true,
        durationEditable:true,
        resizable:true,
        events: events_array,
	eventDrop : function(event){
	   var start = event.start;
	   var end = event.end|| start;
	   var sy = start.year();
	   var sm = start.month()+1;
	if(sm <10 ) {
	sm = 0 +String(sm);
	}	
	   var sd = start.date();
 	if(sd <10 ) {
        	sd =0+  String(sd);

        }
	   var dy = end.year();
	   var dm = end.month() + 1;
	if(dm < 10 ){
		dm = 0 + String(dm);
	}
	   var dd = end.date()-1;               
	 if(dd <10 ) {
        dd =0+  String(dd);

        }
	   var Sday = sy+'-'+sm+'-'+sd;
	   var Dday = dy+'-'+dm+'-'+dd;
   $.ajax({
      url: '/Cal_Modify',
      dataType: 'json',
      type : 'POST',
      data: {          
         'Work_Id' : event.id,
         'Work_Sday':Sday,
         'Work_Dday':Dday, 
      },
      success: function(result) {
         console.log('업데이트 완료')
      }
   });
	},
        eventRender: function(event, element) {
            element.attr('title', event.tip);
        }
    });
}
