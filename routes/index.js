var express = require('express');
var router = express.Router();
var fs = require('fs');
var Time = require('date-utils');
var ObjectID = require('mongodb').ObjectID;
var multer  = require('multer');
var gcm = require('node-gcm');
var path = require('path');
/* GET home page. */
router.post('/InitTaskData',function(req,res){
	var db = req.db;
	var Work_Id = req.body.Work_Id;
	var Project_Work = db.get('Project_Work');

	Project_Work.findOne({"_id":ObjectID(Work_Id)}, function(err, data) {
		if(data == null ) {

		} else {
			console.log(data);
			res.send(data);
		}
	});
});

router.get('/GetMemberList',function(req,res){
	var db = req.db;
	var Project_Member = db.get('Project_Member');
Project_Member.col.aggregate({$match:{"Project_Id":ObjectID(req.session.Project_Id)}},{$unwind:'$Member'},{$group:{"_id":'$_id',"Member_Name":{$push:'$Member.Member_Name'},"Member_Id":{$push:'$Member.Member_Id'}}}, function (err, member) {
     console.log('찾음');
     console.log(member);
	res.send(member);
   });
});         



/* First Page */
router.get('/', function (req, res) {
  fs.readFile('index.html', function (error, data){
    res.writeHead(200, { 'Content-Type':'text/html' });
    res.end(data,'utf8');
  });
});

/* Sign In */
router.post('/SignIn',function(req, res) {

  var db = req.db;
  var userName = req.body.loginname;
  var userpassword = req.body.loginpassword;
  var collection = db.get('User');
  collection.findOne({ "User_Email" : userName,
    "User_Pass" : userpassword
  }, function (err,member) {
   if(member == null) {
    console.log('a');
  } else {
   var collection2 = db.get('Project_Member');
   collection2.find({ "Member.Member_Id" : member._id}, function (err,memo) {
    if(memo == null) {  
     console.log('nothing');
   } else{
   }
 });
           //res.set({'Content-Type' : 'text/plain ,charset=utf-8'});
           req.session.User_Email = member.User_Email;
           req.session.User_Name = member.User_Name;
           req.session.User_Pass = userpassword;
           res.redirect("project");
         }
       });
});


/* Sign Up */
router.post('/SignUp', function(req, res) {
    // Set our internal DB variable
    var db = req.db;
    // Get our form values. These rely on the "name" attributes
    var userName = req.body.username;
    var userEmail = req.body.useremail;
    var userpassword = req.body.userpassword;
    // Set our collection
    var collection = db.get('User');
    // Submit to the DB
    collection.insert({
      "User_Email" : userEmail,
      "User_Name" : userName,
      "User_Pass" : userpassword,
      "Access":'false'
    }, function (err, doc) {
      if (err) {
      }
      else {
//            res.location("/");
res.redirect("/");
}
});
  });

/* Layout */
router.get('/Frame', function (req, res) {
  fs.readFile('Frame.html','utf-8', function (error, data){
    res.writeHead(200, { 'Content-Type':'text/html' });
    res.end(data,'utf8');
  });
});

/* Task */
router.get('/Task', function (req, res) {
  fs.readFile('Task.html', function (error, data){
    res.writeHead(200, { 'Content-Type':'text/html' });
    res.end(data,'utf8');
  });
});

/* Task Add*/
router.post('/TaskNewAdd',function (req,res) {
  console.log('업무추가버튼클릭하고 들어옴');
  var db = req.db;
  var Task_Name = req.body.Name;
  var Task_Sday = req.body.Sday;
  var Task_Dday = req.body.Dday;
  var Task_Person = req.body.Work_Person;
  var Person =JSON.parse(Task_Person);
  var Task_Memo = req.body.Memo;
  var Project_Work = db.get('Project_Work');

  Project_Work.insert({"Project_Id":ObjectID(req.session.Project_Id),"Work_Name":Task_Name,"Work_Sday":Task_Sday,"Work_Dday":Task_Dday,"Work_Memo":Task_Memo,"Work_Finish":'on',"Work_Top":'480px',"Work_Left":'30px',"Work_Person" :Person} ,function(err,data){
    if(data  == null){
      console.log('업무삽입실패')
    } else {
     console.log('업무삽입되었음');
	res.send({suc:"suc"});
 //    res.redirect("Task");
   }
 });
});

/*Task Init*/
router.get('/TaskAppend', function(req, res) {
	console.log('업무 초기화 리로드');
  var db = req.db;
  var Project_Work = db.get('Project_Work');

  Project_Work.find({"Project_Id":ObjectID(req.session.Project_Id)} ,function(err,data){
    if(data  == null){
     console.log('데이터없음');
   }  else {
     console.log(data);
     res.send(data);
   }
 });
});

/*Task move save */
router.post('/Get_TaskData',function(req,res){
	console.log('업무 데이터저장 ');
  var Work_Id = req.body.Work_Id;
  var x = req.body.x;
  var y = req.body.y;
  var db = req.db;
  var Project_Work = db.get('Project_Work');
  Project_Work.update({"_id":ObjectID(Work_Id)},{$set:{"Work_Top":y+'px',"Work_Left":x+'px'}});
});

/*dbclick Task Update */
router.post('/Update_TaskData',function(req,res){
	console.log(' 메모 업데이트 입니다 ');

  var Work_Id = req.body.Work_Id;
  var Name = req.body.Name;
  var Sday = req.body.Sday;
  var Dday = req.body.Dday;
  var Memo = req.body.Memo;
//  var Finish = req.body.Finish;
  var Task_Person = req.body.Work_Person;
  var Person =JSON.parse(Task_Person);
  var db = req.db;
console.log(Work_Id);
console.log(Name);
console.log(Sday);
console.log(Dday);
console.log(Memo);
console.log(Person);
  var Project_Work = db.get('Project_Work');
  var Work_Comment = db.get('Work_Comment');
Project_Work.update({"_id":ObjectID(Work_Id)},{$set:{"Work_Name":Name,"Work_Sday":Sday,"Work_Dday":Dday,"Work_Person":Person,"Work_Memo":Memo}});
  Project_Work.findOne({"_id":ObjectID(Work_Id)},function(err,data){
    if(data == null){
      console.log('no id');
    } else {
     console.log(data);
     Work_Comment.find({"Project_Work_Id":ObjectID(Work_Id)},function(err,com){
       if(com == null){

       } else {
        console.log(com);
        res.send(data);
      }
    });
   }
 });
});

/* Label */
router.get('/LabelAppend',function(req,res){
 console.log('라벨초기화');

 var db = req.db;
 var Label_DB = db.get('Project_Work_Label');

 Label_DB.find({"Project_Id":ObjectID(req.session.Project_Id)},function(err,data){
   if(data == null){
     console.log('no data');
   } else {
    console.log(data);
    res.send(data);
  }
});
});
/* Lavel add */
router.post('/LabelNewAdd',function(req,res){
	console.log('라벨을 추가합시다');
 var db = req.db;
 var Label_Name = req.body.Label_Name;
 console.log(Label_Name);
 var Label = db.get('Project_Work_Label');

 Label.insert({"Project_Id":ObjectID(req.session.Project_Id),"Label_Name":Label_Name,"Label_Top":'440px',"Label_Left":'30px'},function(err,data){
   if(data == null){

   }  else {
    console.log(data);
	res.send({suc:'suc'});
  }
});
});
/* lavel move save */
router.post('/Get_LabelData',function(req,res){
  console.log('라벨 위치저장 ');
  var Work_Id = req.body.Work_Id;
  var x = req.body.x;
  var y = req.body.y;
  var db = req.db;
  var Label = db.get('Project_Work_Label');
  Label.update({"_id":ObjectID(Work_Id)},{$set:{"Label_Top":y+'px',"Label_Left":x+'px'}});
});

/*dbclick Label Update */
router.post('/Update_LabelData',function(req,res){
  console.log('더블클릭햇을때라벨 업로드');
  var Label_Id = req.body.Work_Id;
  var Label_Name =req.body.Label_Name;
  var db = req.db;
  var Label = db.get('Project_Work_Label');
  Label.update({"_id":ObjectID(Label_Id)},{$set : {"Label_Name":Label_Name}});
	res.send({suc:"suc"});
});


router.get('/form_memo', function (req, res) {
  fs.readFile('form_memo.html','utf-8', function (error, data){
    res.writeHead(200, { 'Content-Type':'text/html' });
    res.end(data,'utf8');
  });
});

router.get('/form_temp', function (req, res) {
  fs.readFile('form_temp.html','utf-8', function (error, data){
    res.writeHead(200, { 'Content-Type':'text/html' });
    res.end(data,'utf8');
  });
});

router.get('/File_Share',function (req, res) {
  fs.readFile('File_Share.html','utf-8', function (error ,data) {
    res.writeHead(200, { 'Content-Type':'text/html'});
    res.end(data);
  });
});

router.get('/form_fileshare', function (req, res) {
  fs.readFile('form_fileshare.html', function (error, data){
    res.writeHead(200, { 'Content-Type':'text/html' });
    res.end(data,'utf8');
  });
});

router.get('/form_mindmap', function (req, res) {
  fs.readFile('form_mindmap.html', function (error, data){
    res.writeHead(200, { 'Content-Type':'text/html' });
    res.end(data,'utf8');
  });
});

router.get('/up', function (req, res) {
  fs.readFile('up.html', function (error, data){
    res.writeHead(200, { 'Content-Type':'text/html' });
    res.end(data,'utf8');
  });
});

router.get('/Calendar', function (req, res) {
  fs.readFile('Calendar.html', function (error, data){
    res.writeHead(200, { 'Content-Type':'text/html' });
    res.end(data,'utf8');
  });
});


router.post('/Calendar_Getdata', function(req, res){
  var Project_Id = req.body.Project_Id;
  var db = req.db;
  var Project_Work = db.get('Project_Work');
  console.log('Project_Work_Db 접근');
  console.log(Project_Id);

  Project_Work.find({"Project_Id":ObjectID(Project_Id)}, function(err, data){
    if(!err){
      console.log(data);
      //console.log({"data":data.Work_Name, "Work_Finish":data.Work_Finish});
      res.send(data);
    }
  })
});
router.post('/Calendar_Modify', function(req, res){
  var Work_Id = req.body.Work_Id;
  var Work_Sday = req.body.Work_Sday;
  var Work_Dday = req.body.Work_Dday;
  var db = req.db;
  var Project_Work = db.get('Project_Work');
  Project_Work.update({"_id":ObjectID(Work_Id)},{$set:{"Work_Sday":Work_Sday,"Work_Dday":Work_Dday}});
  res.send({suc:'next'});
});




router.get('/project', function (req, res) {
  fs.readFile('project.html', function (error, data){
    res.writeHead(200, { 'Content-Type':'text/html' });
    res.end(data,'utf8');
  });
});

/* Member Add PopUp */
router.get('/MemberPopUp', function (req, res) {
  fs.readFile('MemberPopUp.html','utf-8', function (error, data){
    res.writeHead(200, { 'Content-Type':'text/html' });
    res.end(data,'utf8');
  });
});
/* Meber PopUp & Find */
router.post('/MemberFind', function (req,res) {
  console.log(req.session);
  console.log(req.body.Member_Email);
  var db = req.db;
  var User = db.get('User')
  var name;
  User.findOne({"User_Email":req.body.Member_Email} , function (err, data) {
    if( data == null ) {
     name = "";		
   } else {	
     name = data.User_Name;
   }
   console.log(name);
   res.send({Member_Name:name});
 });
});

/* Member Add */
router.post('/MemberAdd', function (req,res) {
	console.log('멤버 추가');
	console.log(req.session);
	console.log(req.body.Member_Email);
	var db = req.db;
	var User = db.get('User')
	User.findOne({"User_Email":req.body.Member_Email} , function (err, data) {
		if( data == null ) {
      console.log('실패');
    } else {
      var Project = db.get('Project');
      Project.findOne({"Project_Name":req.session.Project_Name,"Project_Dday":req.session.Project_Dday}, function (err, pro) {
       if( pro == null ) {
         console.log('프로젝트찾기실패');
       } else {
         console.log('프로젝트찾음');
         console.log(pro);
         var Project_Member = db.get('Project_Member');
         Project_Member.update({"Project_Id":pro._id},{$push:{"Member":{"Member_Id":data._id,"Member_Name":data.User_Name,"Member_Position":"crew","Member_Access":'false'}}} , function (err,member) {
           if(member == null ) {
             console.log('멤버 저장 실패');
           } else {
            console.log('멤버 저장되었습니다');
            res.send({suc:"true"});
          }
        });
       }
     });
    }
  });
});

/* Project Page to Init Data*/
router.get('/Get_ProjectData',function (req,res) {
  console.log('get data project');
  console.log(req.session);
  res.send({
    User_Name:req.session.User_Name,
    User_Email:req.session.User_Email,
    Project_Id:req.session.Project_Id
  });
});

/* Project Out */
router.post('/ProjectDelete',function (req,res) {
  console.log('Project Delete');
  var db = req.db;
  var User_Name = req.session.User_Name;
  var User_Email = req.session.User_Email;
  var Project_Id = ObjectID(req.body.Project_Id);
  var User = db.get('User');
  var Project_Work = db.get('Project_Work');
  var Project = db.get('Project');
  var Project_Member = db.get('Project_Member');
  var Work_Comment = db.get('Work_Comment');
  User.findOne({"User_Email":User_Email},function(err,user){
   if(user == null ){

   } else {
     console.log(user);
     Project_Member.col.aggregate({$match:{"Project_Id":Project_Id}},{$unwind:'$Member'},{$match:{"Member.Member_Id":user._id}},{$group:{"_id":'$_id',"User_Position":{$push:'$Member.Member_Position'}}}, function (err, position) {
       console.log(position);
       if(position == null ){

       } else {
        if(position[0].User_Position[0] == 'captin'){

          Work_Comment.remove({"Project_Id":Project_Id},function (err, data){

            if(data == null ){
             console.log('no data');
           } else {
             Project_Work.remove({"Project_Id":Project_Id},function(err,pro){
               if(pro == null) {

               } else {
                Project_Member.remove({"Project_Id":Project_Id},function(err,form){
                 if(form == null ) {

                 } else {
                  Project.remove({"_id":Project_Id},function(err,suc){
                   if(suc == null ){

                   } else {
                    res.send({Next:'project'});
                  }
                });
                }
              });
              }
            });
           }
         });
        }	else {
		 //캡틴이 아닐떄 지우는 부분
		}
	}
});	
}
});
});








/* Select Project */
router.post('/Select_Project',function (req,res) {
  console.log('선택한프로젝트입니다');
  var User_Email = req.session.User_Email;
  var User_Name = req.session.User_Name;
  var Project_Id = req.body.Project_Id;
  var db =req.db;
  var User = db.get('User');

  User.findOne({"User_Name":User_Name,"User_Email":User_Email}, function (err,data) {
    if( data == null ) {
      console.log('find error');
    } else {
      var Project_Member = db.get('Project_Member');
      Project_Member.findOne({"Project_Id":ObjectID(Project_Id)} ,function (err,member) {
        if(member == null){
          console.log('no member');
        } else {
         req.session.Project_Id = member.Project_Id;
         req.session.Project_Name = member.Project_Name;
         req.session.Project_Dday = member.Project_Dday;
         req.session.User_Name = User_Name;
         req.session.User_Email = User_Email;
         res.send({Next:'Frame'});
       }
     });
    }
  });
});

/* Project Init */
router.get('/ProjectAppend', function(req, res) {
  console.log('어펜드입니다');
  var db = req.db;
  var User_Email = req.session.User_Email;
  var User_Pass = req.session.User_Pass;
  var Project_Name = new Array();
  var Project_Id = new Array();
  var Project_DueDate = new Array();
  var Project_Memo = new Array();
  var Project_Progress = new Array();
  var Project_Work_Total_Count = new Array();
  var Work_Finish = new Array();  
  var Project=db.get('Project');
  var collection = db.get('User');
  var collection2 = db.get('Project_Member');
  collection.findOne({ "User_Email" : User_Email,
   "User_Pass" : User_Pass
 }, function (err,member) {
   if(member == null) {
    console.log('false');
  }  else {
    collection2.find({ "Member.Member_Id" : member._id}, function (err,memo) {
      if(memo == null) {
        console.log('없음');
      }
      else{	
       console.log(memo);
       for(var i=0;i<memo.length;i++){
        var temp = (memo[i].Project_Dday).split('-');
        var a = new Date(temp[0],Number(temp[1])-1,temp[2]);
        var b = new Date(Date.today().getFullYear(),Date.today().getMonth(),Date.today().getDay()+1);
        Project_Name[i] = memo[i].Project_Name;
        Project_Id[i] = memo[i].Project_Id;
        Project_DueDate[i] =(a.getTime() - Date.today().getTime())/1000/60/60/24;
        Project_Memo[i] = memo[i].Project_Memo;
      }

      res.send({
        User_Email:req.session.User_Email,
        User_Name:req.session.User_Name,
        length:memo.length,
        Project_Name:Project_Name,
        Project_Id:Project_Id,
        Project_DueDate:Project_DueDate,
        Project_Memo:Project_Memo
      });
    }
  });
           }  //else 끝남
         });
});

/* Project Add */
router.post('/ProjectAdd', function (req,res) {
	var Project_Name = req.body.Project_Name;
	var Project_Dday = req.body.Project_Dday;
	var Project_Memo = req.body.Project_Memo;
	var User_Name =req.session.User_Name;
	var User_Email = req.session.User_Email;
	var db =req.db;
	var User = db.get('User');
	var Point_Item_Table = db.get('Point_Item_Table');
	console.log(User_Name);
	console.log(User_Email);
	User.findOne({"User_Name":User_Name,"User_Email":User_Email} , function (err,member){
    if(member == null ){
     console.log('member error');
   } else {
     var Project = db.get('Project');
     Project.insert({"Project_Name": Project_Name , "Project_Dday":Project_Dday}, function (err,data) {
      if(data == null ) {
       console.log(' project add error');
     } else {
       var Project_Member = db.get('Project_Member');
       Project_Member.insert({"Project_Id":data._id,"Project_Name":Project_Name,"Project_Dday":Project_Dday,"Project_Memo":Project_Memo,"Member":[{"Member_Id":member._id,"Member_Name":User_Name,"Member_Position":"captin","Member_Access":'false'}]} , function (err, doc){
         if(doc == null ) {
          console.log('member add error'); 
        } else {
          console.log('멤버에 본인 추가');
          Point_Item_Table.insert({"Project_Id":data._id,"User_Id":member._id,"Project_Work_Total_Count":'0',
            "Person_Work_Total_Count":'0',"Finish_Work_Count":'0',"Dday_Work_Count":'0',"Comment_Count":'0',
            "UpDown_Total_Count":'0',"UpDown_Person_Count":'0',"Person_Login_Count":'0',"Team_Login_Count":'0'}, function(err,suc){
             if(suc == null){

             } else {
              res.redirect("project");
            }
          });
        }
      });
     }
   });
}
});
});

/* Image upload */
router.post('/up123',function (req, res)  {
  console.log(req.files);
  console.log(req.files.path);
  res.send( 'Success upload files' );
});




/* upload */
router.post('/upload', function(req,res){
  router.use(multer({ dest:'./public/files/'+req.session.Project_Id+'/'}));
  var path=require('path');
  console.log(path);
  console.log(req.files.drive);
  fs.readFile(req.files.drive.path, function(err, data){
   var dirname = path.resolve(".")+'/public/files/'+req.session.Project_Id+'/';
 //  var dirname = __dirname +'/images/';
 var newPath = dirname + req.files.drive.originalname;
 console.log(newPath);
 var db =req.db;
 var File = db.get('File');
 var today = Date.today().getFullYear()+'-'+Date.today().getMonth()+'-'+Date.today().getDay()+1;
 File.insert({"Project_Id":ObjectID(req.session.Project_Id),"File_Path":newPath,"File_Name":req.files.drive.originalname,"File_Size":req.files.drive.size,"File_Format":req.files.drive.extension,"File_Uploader":req.session.User_Name,"File_Date":today});
 fs.writeFile(newPath, data, function(err){
  if(err){
    res.json("Failed to upload your file");
  }else
  {
   res.redirect("File_Share");
       // res.json("Successfully uploaded your file");
     }
   });
});
});

router.get('/upload/:file', function(req,res){
  console.log('여긴언제들어오지');
  var path=require('path');
  file = req.params.file;
  console.log(file);
  var dirname = path.resolve(".")+'/public/files/'+req.session.Project_Id+'/';
  //  var dirname = __dirname +'/files/abc/';
  var img = fs.readFileSync(dirname + file);
  res.writeHead(200,{'Content-Type':'image/jpg'});
  res.end(img,'binary');
});

router.get('/showlist',function(req,res){
	console.log(' list show ------------------------');
  var path=require('path');
  var dir=path.resolve(".")+'/public/files/'+req.session.Project_Id+'/';
 // var dir=__dirname+'/public/files/'+req.session.Project_Id;
  //fs.readdir(dir, function(err, list){
  //  if (err){ 
  //	console.log(err);
  //  }else{
  //      res.json(list);
   // }
//	//res.send(list);
var db = req.db;
var File = db.get('File');
File.find({"Project_Id":ObjectID(req.session.Project_Id)}, function(err, data){
  if( data == null ) {
   console.log(' no data ' );
 } else {
   console.log('파일 리스트 보여주기 ');
	//		console.log(data);
 res.send(data);
}
});
});

//router.get('/download:file(*)', function(req,res,next){
  router.get('/download/:id', function(req,res,next){
   console.log('여기들어오니?');
   var path=require('path');
   var file=req.params.id;
  //var path=path.resolve(".")+'/public/files/'+file;
  var path=path.resolve(".")+'/public/files/'+req.session.Project_Id+'/'+file;
  res.download(path);
});

  /* User List */
  router.get('/userlist', function(req, res) {
   var db = req.db;
   var collection = db.get('User');
   collection.find({},{},function(e,docs){
     res.render('userlist',{"userlist":docs});
   });
 });
////////////////////////////////////////////////////////
///////////////////mobile download//////////////////////


//////////////////////////////////////////////////////////////////////////////
////////////////////////////////M  O B I L E//////////////////////////////////
//////////////////////////////////////////////////////////////////////////////


router.post('/add', function ( req, res) {

  var User_Email = req.body.User_Email;
  var User_Pass = req.body.User_Pass;
  var AppId = req.body.AppId;

 // res.session.AppId = AppId;
 console.log(User_Email);
 console.log(User_Pass); 
 console.log(AppId);
 var db=req.db;
 var User = db.get('User');
 User.findOne({ "User_Email" : User_Email,
  "User_Pass" : User_Pass
}, function (err,member) {
  if(member == null) {
    console.log('log in fail');
  }
  else {
    req.session.App_User_Name = member.User_Name;
    console.log("log in");
    User.update({"User_Email":User_Email},{$set:{"User_AppId":AppId}});
    console.log(member);
    res.send(member);
  }
});
});
//mobile project create
router.post('/appprojectinit', function(req, res) {
  console.log('app Project init');
  // Get our form values. These rely on the "name" attributes
  var db = req.db;
  var User_Email = req.body.User_Email;
  var User_Pass = req.body.User_Pass;
  var AppId = req.body.AppId;

    req.session.App_UserId = req.body.User_Id;
console.log('app user id :' + req.session.App_UserId);
  console.log('app project add');
  console.log(req.body.User_Id);
  var Project_Member = db.get('Project_Member');
  Project_Member.find({ "Member.Member_Id" : ObjectID(req.body.User_Id)}, function (err,memo) {
    if(memo == null) {
    }
    else{
      console.log('app memo :');
      Project_Member.update({"Member":{$elemMatch:{"Member_Id":ObjectID(req.body.User_Id)}}},{$set:{"Member.$.Member_AppId":AppId}},{multi:true});	
    }
    res.send(memo);
  });
});

router.post('/appprojectcreate', function(req ,res) {
  var db = req.db;
  var Project_Db = db.get("Project");
  var User_Id = ObjectID(req.body.User_Id);
  var Project_Name = req.body.Project_Name;
  var Project_Dday = req.body.Project_Dday;
  var User_Email = req.body.User_Email;
  var User_Name = req.body.User_Name;
  var AppId = req.body.AppId;
  Project_Db.insert({"Project_Name" : Project_Name, "Project_Dday":Project_Dday}, function (err,data){
    if(data == null){
      console.log('project insert error');
    }
    else {
      console.log('Project insert success');
      console.log(data._id);
      var Project_Member = db.get("Project_Member");
      Project_Member.insert({"Project_Id":data._id,"Project_Name":data.Project_Name,"Project_Dday":data.Project_Dday,"Member":[{"Member_Id":User_Id,"Member_Name":User_Name,"Member_Position":'captin',"Member_Access":'false',"Member_AppId":AppId}]}, function (err, member) {
        if(err){
          console.log('Project_Member error');
        } else {
          Project_Member.col.aggregate({$match : {"Project_Id" : data._id}} , {$unwind: '$Member'} , {$match : {"Member.Member_AppId": {"$not" : /null/ } } } ,{$group: {"_id" : '$_id'  , "AppId" : {$push: '$Member.Member_AppId'}}},function(err,app){
           console.log('member appid 가져오기 ');
           console.log(app);
	  res.send(member);
         });
        }
      });
    }
  });
});


/* APP Project Out */
router.post('/appprojectdelete',function (req,res) {
  console.log('Project Delete');
  var db = req.db;
  var User_Id = ObjectID(req.body.User_Id);
  var User_Name = req.body.User_Name;
  var User_Email = req.body.User_Email;
  var Project_Id = ObjectID(req.body.Project_Id);

  var Project_Work = db.get('Project_Work');
  var Project = db.get('Project');
  var Project_Member = db.get('Project_Member');
  var Work_Comment = db.get('Work_Comment');

  Project_Member.col.aggregate({$match:{"Project_Id":Project_Id}},{$unwind:'$Member'},{$match:{"Member.Member_Id":User_Id}},{$group:{"_id":'$_id',"User_Position":{$push:'$Member.Member_Position'}}}, function (err, position) {
    console.log(position);
    if(position == null ){

    } else {
      if(position[0].User_Position[0] == 'captin'){

        Work_Comment.remove({"Project_Id":Project_Id},function (err, data){

          if(data == null ){
            console.log('no data');
          } else {
            Project_Work.remove({"Project_Id":Project_Id},function(err,pro){
              if(pro == null) {

              } else {
                Project_Member.remove({"Project_Id":Project_Id},function(err,form){
                  if(form == null ) {

                  } else {
                    Project.remove({"_id":Project_Id},function(err,suc){
                      if(suc == null ){

                      } else {
                        res.send({Next:'project'});
                      }
                    });
                  }
                });
              }
            });
          }
        });
      }   else {
                 //캡틴이 아닐떄 지우는 부분
               }
             }


           });
});


router.post('/addprojectmember',function(req ,res) {
  var db = req.db;
  var Project_Id = req.body.Project_Id;
  var Member_Email = req.body.Member_Email;
  var Project_Member = db.get("Project_Member");
  var User = db.get("User");
      User.findOne({"User_Email":Member_Email},{"_id":1,"User_Name":1}, function(err, user){
            if(user == null){
              console.log('can not find user');
              res.send({suc:1}); //아이디가 없을떄
            }
            else{ //유저는 찾았다. 
                Project_Member.findOne({"Project_Id":ObjectID(Project_Id),"Member.Member_Id":user._id}, function(err, duplication_User){
		console.log(duplication_User);
		console.log('111111111111111111111111111');
              if(duplication_User == null)// 프로젝트에 유저가없음
              {
                Project_Member.update({"Project_Id":ObjectID(Project_Id)},{$push:{"Member":{"Member_Id":user._id,"Member_Name":user.User_Name,"Member_Position":"crew","Member_Access":'false',"Member_AppId":user.User_AppId}}}, function(err, addmember){

                  if(addmember == null){
                    console.log('push membererror');
                  }
                  else{
                    console.log('멤버푸쉬합니다.');

                    res.send({suc:2});  //추가할때
                  }
                });
              } else
              {
                console.log('이미 해당 프로젝트에 해당유저가 있습니다.');
                res.send({suc:3});//멤버가 이미있을때
              }          
            });     
            }       
      });
});

router.post('/appregister', function(req, res) {
  // Set our internal DB variable
  var db = req.db;
  // Get our form values. These rely on the "name" attributes
  var User_Name = req.body.User_Name;
  var User_Email = req.body.User_Email;
  var User_Pass = req.body.User_Pass;
  // Set our collection
  var collection = db.get('User');
  // Submit to the DB
  collection.insert({
    "User_Email" : User_Email,
    "User_Name" : User_Name,
    "User_Pass" : User_Pass
  }, function (err, doc) {
    if (err) {
      res.send("There was a problem adding the information to the database.");
    }
    else {
      console.log("success add");
      res.send(doc);
    }
  });
});

router.post('/appviewmemo', function(req, res){
  console.log('appviewmemo');
  var Id = req.body.Project_Id;
  var User_Name = req.body.User_Name;
  var db = req.db;
  var Project_Work = db.get('Project_Work');
  var Work_Name = new Array();
  var Work_Id = new Array();
  var Work_DueDate = new Array();
  var Project_Work_Total_Count = new Array();
  var Work_Finish = new Array();

  Project_Work.find({"Project_Id":ObjectID(Id)}, function(err, memo){
   if(memo == null ) {

   } else  {
     //console.log(memo);
     for(var i=0;i<memo.length;i++){
      var temp = (memo[i].Work_Dday).split('-');
      var a = new Date(temp[0],Number(temp[1])-1,temp[2]);
      var b = new Date(Date.today().getFullYear(),Date.today().getMonth(),Date.today().getDay()+1);
      Work_Name[i] = memo[i].Work_Name;
      Work_Id[i] = memo[i]._id;
      Work_DueDate[i] =(a.getTime() - Date.today().getTime())/1000/60/60/24;
      //console.log(Work_Name[i]);
    }
    res.send({
      Work_Name : Work_Name,
      Work_DueDate : Work_DueDate,
      Work_Id : Work_Id,
      Work_Length : memo.length
    });
  }

});
});

router.post('/appaddmemo', function(req, res){
  console.log('appaddmemo 시작');
  var Project_Id = req.body.Project_Id;
  var Project_Name =req.body.Project_Name;
  var Work_Name = req.body.Work_Name;
  var Work_Memo = req.body.Work_Memo;
  var Work_Sday = req.body.Work_Sday;
  var Work_Dday = req.body.Work_Dday;
  var Work_Finish = req.body.Work_Finish;
  var Work_Person = JSON.parse(req.body.Work_Person);
  var AppId = req.body.AppId;
  var db = req.db;
  var Project_Work = db.get('Project_Work');
  Project_Work.insert({
    "Project_Id": ObjectID(Project_Id),
    "Project_Name" :Project_Name,
    "Work_Name": Work_Name,
    "Work_Memo": Work_Memo,
    "Work_Sday" : Work_Sday,
    "Work_Dday": Work_Dday,
    "Work_Finish": Work_Finish,
    "Work_Person": Work_Person
  }, function (err, data) {
    if (!err) {
      var Project_Member = db.get('Project_Member');
      Project_Member.col.aggregate({$match : {"Project_Id" :ObjectID(Project_Id)}} , {$unwind: '$Member'} , {$match : {"Member.Member_AppId": {"$not" : /null/ } } } ,{$group: {"_id" : '$_id'  , "AppId" : {$push: '$Member.Member_AppId'}}},function(err,app){
	console.log('App length : ' + app.length);
	for(var i = 0; i <= app.length; i++){
	console.log('ssssssssssssssssssssssssssssssssssssssssssssss몇번출력되니---------------------------------------');
	var message = new gcm.Message({
	  collapseKey: 'PhoneGapDemo',
	  delayWhileIdle: true,
	  timeToLive: 3,
	  data: {
	    title:'업무가 생성되었습니다',
	    message: Work_Name,
	    msgcnt: 3
	  }
	});
	console.log('성공?');
	var sender = new gcm.Sender('AIzaSyAfFtt6_xASKM6nJMWO70Uh984TTSJ_BOI'); // 구글 프로젝트에 등록한 GCM 서비스에서 만든 server API key를 입력한다.
	var registrationIds = [];
	registrationIds.push(app[0].AppId[i]); // PhoneGap 프로젝트의 안드로이드 프로젝트에서 획득한 registerID를 입력한다. 이 registerID를 이용하여 안드로이드 디바이스에 푸시를 전송한다.
	sender.send(message, registrationIds, 4, function (err, result) {
	  console.log(result);
	 console.log(AppId);
	});
}



     	 });
	res.send(data);
	}
	});
});

router.post('/appmodifymemo', function(req, res){
  console.log('appinsertmemo 시작');
  console.log(req.body);
  var Project_Work_Id = req.body.Project_Work_Id;
  var Project_Id = req.body.Project_Id;
  var Work_Name = req.body.Work_Name;
  var Work_Memo = req.body.Work_Memo;
  var Work_Sday = req.body.Work_Sday;
  var Work_Dday = req.body.Work_Dday;
  var Work_Finish = req.body.Work_Finish;
  var Work_Person = JSON.parse(req.body.Work_Person);

  var db = req.db;
  var Project_Work = db.get('Project_Work');

  Project_Work.update({"_id":ObjectID(Project_Work_Id)},{$set:{
    "Work_Name": Work_Name,
    "Work_Memo": Work_Memo,
    "Work_Sday" : Work_Sday,
    "Work_Dday": Work_Dday,
    "Work_Finish": Work_Finish,
    "Work_Person": Work_Person
  }});

  console.log('수정 성공!!');
  res.send({suc:'next'});
});

router.post('/appdeletememo', function(req, res){

  console.log('appdeletememo 시작');
  console.log(req.body);

  var Delete_MemoId = req.body.Delete_MemoId;
  var db = req.db;
  var Project_Work_Db = db.get('Project_Work');

  Project_Work_Db.remove({"_id":ObjectID(Delete_MemoId)}, function(err,doc){
    if(err){
    }
    else{
      console.log();

      res.send({suc:'next'});
    }
  });
});

router.post('/appshowmemo', function(req,res){
  var Project_Work_Id = req.body.Project_Work_Id;
  var db = req.db;

  var Project_Work_db = db.get('Project_Work');

  console.log('appshowmemo시작');

  console.log(Project_Work_Id);
  Project_Work_db.findOne({
    "_id":ObjectID(Project_Work_Id)}, function(err, data){
      if(err){

      }
      else
      {
        console.log(data);
        console.log('memo data뿌립니다.');
        res.send(data);
      }
    });
});

router.post('/appgetprojectmember', function(req, res){

  var Project_Id = req.body.Project_Id;
  console.log(Project_Id);
 // console.log(objectId);
 var db = req.db;
//  console.log(req);

var Project_Member = db.get('Project_Member');
console.log('appgetprojectmember 진입');
console.log(ObjectID(Project_Id));
Project_Member.find({"Project_Id":ObjectID(Project_Id)}, function(err, data){
  if(err){
    console.log('data가없음');
  }
  else{
    Project_Member.col.aggregate({$match:{"Project_Id":ObjectID(Project_Id)}},{$unwind:'$Member'},{$group:{"_id":'$_id',"In_Member":{$push:'$Member.Member_Name'},"Member_Id":{$push:'$Member.Member_Id'}}}, function (err, member) {
     console.log('찾음');
     console.log(member);
     res.send(member);
   });
  }
}
);
});

router.post('/appaddcomment', function(req, res){

 // console.log(req.body);
 console.log('memoadd 접근!!!!!!!!!!!!!!!!!!!!!!!!');
 var Work_Comment = JSON.parse(req.body.Comment);
 var Project_Work_Id = req.body.Project_Work_Id;

 var db = req.db;
 var Work_Comment_Db = db.get('Work_Comment');
 Work_Comment_Db.insert({"Project_Work_Id":Project_Work_Id, "Work_Comment":Work_Comment}, function(err, data){
  if(!err){
    console.log('add성공!!!!!');
    res.send(data);
  }
});
});



router.post('/appmodifycomment', function(req, res){
  console.log(req.body);
  var Insert_CommentId = req.body.Insert_CommentId;
  var New_Comment = req.body.Comment;
  console.log('수정할 코멘트 아이디');
  console.log(Insert_CommentId);
  console.log('수정할 코멘트');
  console.log(New_Comment);

  var db = req.db;
  var Work_Comment = db.get('Work_Comment');

  Work_Comment.update({"_id":ObjectID(Insert_CommentId)},{$set:{
   "Work_Comment.Comment": New_Comment
 }});
  console.log('업데이트되었어요 코멘트');
  res.send({suc:'next'});
});

router.post('/appdeletecomment', function(req, res){
  var Delete_CommentId = req.body.Delete_CommentId;
  console.log(Delete_CommentId);
  var db = req.db;
  var Work_Comment_Db = db.get('Work_Comment');

  Work_Comment_Db.remove({"_id":ObjectID(Delete_CommentId)}, function(err,doc){
    if(!err){
      console.log(doc);
      res.send({suc:'next'});
    }

  });


});
router.post('/appgetcomment', function(req, res){
 var Project_Work_Id = req.body.Project_Work_Id;
 var db = req.db;
 var Work_Comment_Db = db.get('Work_Comment');
 console.log('memoget 접근');
 console.log(Project_Work_Id);
 Work_Comment_Db.find({"Project_Work_Id":Project_Work_Id}, function(err, data){
  if(!err){
    console.log(data);
    res.send(data);
  }
})
});

router.post('/Calendar_Getdata', function(req, res){
  console.log*('달력에 일정 추가하는 부분');
  var Project_Id = req.body.Project_Id;
  var db = req.db;
  var Project_Work = db.get('Project_Work');

  Project_Work.find({"Project_Id":ObjectID(Project_Id)}, function(err, data){
    if(!err){
      console.log('달력데이터');
      console.log(data);
      //console.log({"data":data.Work_Name, "Work_Finish":data.Work_Finish});
      res.send(data);
    }
  })
});
router.post('/Calendar_Modify', function(req, res){
  console.log('달력에서 일정 수정하는 부분');
  var Work_Id = req.body.Work_Id;
  var Work_Sday = req.body.Work_Sday;
  var Work_Dday = req.body.Work_Dday;
  var db = req.db;
  var Project_Work = db.get('Project_Work');
  Project_Work.update({"_id":ObjectID(Work_Id)},{$set:{"Work_Sday":Work_Sday,"Work_Dday":Work_Dday}});
  console.log('일정 업데이트 완료');
  res.send({suc:'next'});
});


router.post('/GetMyWork', function(req, res){
//var Project_Id = req.body.Project_Id;
var User_Id = req.body.User_Id;
var db = req.db;
var Project_Work = db.get('Project_Work');
var Project = db.get('Project');
console.log('Mypage에서 보낸 User_Id : '+User_Id);
Project_Work.find({"Work_Person.User_Id" :User_Id}, function(err, data){
  if(!err){
    console.log('유저 정보 데이터 보냅니다');
    res.send(data);;
  }
});
});



router.post('/App_Upload_Capture',function (req, res)  {
  console.log('사진 업로드 요청');
  console.log(req.files.file);
  console.log('프로젝트/파일이름 : '+req.files.file.name);
  var splitpath = req.files.file.name.split("-");
  console.log('프로젝트id:'+splitpath[0]);
  console.log('파일이름:'+splitpath[1]);
  router.use(multer({ dest:'./public/files/'+splitpath[0]+'/'}));
  fs.readFile(req.files.file.path, function(err, data){
   var dirname = path.resolve(".")+'/public/files/';
   var newPath =dirname+splitpath[0]+'/'+splitpath[1];
   console.log('저장될 경로: '+newPath);
var db = req.db;
var File = db.get('File');
 var today = Date.today().getFullYear()+'-'+Date.today().getMonth()+'-'+Date.today().getDay()+1;
 File.insert({"Project_Id":ObjectID(splitpath[0]),"File_Path":newPath,"File_Name":splitpath[1],"File_Size":req.files.file.size,"File_Format":req.files.file.extension,"File_Uploader":req.session.App_User_Name,"File_Date":today});
 


   fs.writeFile(newPath, data, function(err){
    if(err) {
      res.json("사진업로드 실패!");
    } else {
      res.json("성공적으로 사진이 업로드 되었습니다.");
    }
  });
 });
});
router.post('/upphoto',function (req, res)  {
 router.use(multer({ dest:'./public/profilephoto/'}));
 console.log(req.files.file);
 console.log(req.files);

 console.log(' 그래도 왔음 ');
 fs.readFile(req.files.file.path, function(err, data){
   var dirname = path.resolve(".")+'/public/profilephoto/';
    //var newPath = dirname + req.files.file.name+'.jpg';
    var newPath = dirname + req.session.App_UserId +'.jpg';
    console.log('저장될 경로: '+ newPath);
    fs.writeFile(newPath, data, function(err){
      if(err) {
        res.json("사진업로드 실패!");
      } else {
        res.json("성공적으로 사진이 업로드 되었습니다.");
      }
    });
  });
});

/*
router.post('/GetProfilePhoto',function (req, res)  {
  var User_Id = req.session.App_UserId;
  console.log('User_Id:'+User_Id);
  console.log('일단 뭐라도 보내볼꼐여');
  console.log(path.resolve("."));
  res.sendFile(path.resolve(".")+'/public/files/'+'User_Id'+'.jpg');
	

});
*/
router.get('/MyImage', function (req, res) {
   var User_Id = req.session.App_UserId;
  console.log(path.resolve("."));
  
 res.sendFile(path.resolve(".")+'/public/profilephoto/'+User_Id+'.jpg');

}); 
module.exports = router;
