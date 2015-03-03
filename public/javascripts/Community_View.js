$.getJSON('/CommunityView',function(data){
	var dataform = JSON.stringify(data.suc);
	var temp = JSON.parse(dataform);
	$('#writer').text(temp.User_Name);
	$('#title').text(temp.Title);
	$('#date').text(temp.Day);
	$('#content').text(temp.Text);


});

$(document).on('click','#backtolist_btn',function(){
	console.log('success');
	window.location ="Community";
});
$(document).on('click','#write_btn',function(){
	console.log('success');
	window.location ="Community_Write";
});                   
