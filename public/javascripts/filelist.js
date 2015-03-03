var tableContent='';
var count = 0;

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
});

$.getJSON('/show', function(data){
        for(var item in data){
            tableContent += '<tr>';
            count+= 1;
            tableContent += '<td>'+count+'  :  '+'</td>';
            tableContent += '<td><a href='+'/'+data[item]+'>'+data[item]+'</a></td>';
        }

        $('#adownload').html(tableContent);
    });

