$(document).ready(function() {
   /*
    $(document).on("click", ".Task", function() {
    alert('Task');
    $(".Task").attr("src", "Task.html");
    });
    */

   function test() {
      alert('제발되자');
      document.getElementById('dd').src = Task;
      document.getElementById('dd').src = Calendar;
      document.getElementById('dd').src = Mindmap;
      document.getElementById('dd').src = File_Share;
      document.getElementById('dd').src = Ladder;
   }

   function MemberPopUp() {
      var popUrl = "/MemberPopUp";
      //팝업창에 출력될 페이지 URL
      var popOption = "width=350, height=150, resizable=no, left=middle, top=middle";
      //팝업창 옵션(optoin)
      window.open(popUrl, "", popOption);
   }

   function ShowMember() {
      $.ajax({
         url : '/ShowMember',
         dataType : 'json',
         type : 'POST',
         data : {
         },
         success : function(result) {
            for (var i = 0; i < result.Member_Length; i++) {
               alert(result.Member_Name[i]);
            }
         }
      });
   }

});
