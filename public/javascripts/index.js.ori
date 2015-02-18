$(document).ready(function() {            



            $('#toggle').click(function(){
               var state = $('#toggle').attr('name');
               //alert(state == "login" );
               if( state == "login" ){
               // 현재 보여지는 창이 로그인일 경우
                  $('#toggle').attr('name', 'register');   // 토글 버튼의 이름을 변경하고
                  $('#toggle').text("로그인");            // 버튼 내용도 로그인으로 변경
                  // 로그인과 사인업을 회전시킴
                  $('#formLogin').css('transform', 'rotateY(180deg)');
                  $('#formLogin').css('transition-duration', '2s');
                  $('#formAddUser').css('transform', 'rotateY(0deg)');
                  $('#formAddUser').css('transition-duration', '2s');
               } else{
               // 현재 보여지는 창이 회원가입일 경우
                  $('#toggle').attr('name', 'login');      // 토글 버튼의 이름을 변경하고
                  $('#toggle').text("회원가입");         // 버튼 내용도 회원가입으로 변경
                  // 로그인과 사인업을 회전시킴
                  $('#formLogin').css('transform', 'rotateY(0deg)');
                  $('#formLogin').css('transition', 'all 1.5s ease-out');
                  $('#formAddUser').css('transform', 'rotateY(180deg)');
                  $('#formAddUser').css('transition', 'all 1.5s ease-out');
               }
            });
         });

