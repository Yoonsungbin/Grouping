var express = require('express');
var router = express.Router();
//var io = require('socket.io');
var fs = require('fs');
var Time = require('date-utils');
var ObjectID = require('mongodb').ObjectID;
/* GET home page. */
router.get('/', function (req, res) {
  fs.readFile('index.html', function (error, data){
    res.writeHead(200, { 'Content-Type':'text/html' });
    res.end(data,'utf8');
  });
});
router.get('/Frame', function (req, res) {
  fs.readFile('Frame.html','utf-8', function (error, data){
    res.writeHead(200, { 'Content-Type':'text/html' });
    res.end(data,'utf8');
  });
});
router.get('/Task', function (req, res) {
  fs.readFile('Task.html', function (error, data){
    res.writeHead(200, { 'Content-Type':'text/html' });
    res.end(data,'utf8');
  });
});
router.post('/TaskAdd',function (req,res) {
   var db = req.db;
   var Task_Name = req.body.Task_Name;
   var Task_Dday = req.body.Task_Dday;
   var Task_Memo = req.body.Task_Memo;
   var Project_Work = db.get('Project_Work');
console.log('22222');
	console.log(Task_Dday);
Project_Work.insert({"Project_Id":ObjectID(req.session.Project_Id),"Work_Name":Task_Name,"Work_Dday":Task_Dday,"Work_Memo":Task_Memo,
   "Work_Finish":'false',"Work_Top":'195px',"Work_Left":'440px',"Work_Person" :{"User_Name":req.session.User_Name,"User_Email":req.session.User_Email}} ,function(err,data){
      if(data  == null){
        console.log('업무삽입실패')
      } else {
         console.log('업무삽입되었음');
	res.redirect("Task");
         }
      });
});
router.get('/TaskAppend',function(req,res){
   var db = req.db;
   var Project_Work = db.get('Project_Work');
console.log('TaskInit 입니다');
  // Project_Work.find({"Project_Id":ObjectID(req.session.Project_Id)} ,function(err,data){
   Project_Work.find({"Work_Person.User_Name":"성빈"} ,function(err,data){
      if(data  == null){
         console.log('데이터없음');
      }
      else {
//	console.log(data);
var Work_Name = new Array();
   var Work_Dday = new Array();
   var Work_Memo = new Array();
   var Work_Finish = new Array();
   var Work_Person = new Array();
   var Work_Top = new Array();
   var Work_Left = new Array(); 

	});
for(var i =0 ; i < data.length ; i ++){
    Work_Name[i] = data[i].Work_Name;	
    Work_Dday[i] = data[i].Work_Dday;
    Work_Memo[i] = data[i].Work_Memo;
    Work_Finish[i] = data[i].Work_Finish;
    Work_Person[i] = data[i].Work_Person;
    Work_Top[i] = data[i].Work_Top;
    Work_Left[i] = data[i].Work_Left;

}
//         console.log('데이터있음');
//	console.log(data);
         res.send({
	    length: data.length,
            Work_Name:Work_Name,
            Work_Dday:Work_Dday,
            Work_Memo:Work_Memo,
            Work_Finish:Work_Finish,
            Work_Person:Work_Person,
	    Work_Top:Work_Top,
	    Work_Left:Work_Left
         });
      }

   });
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
router.get('/upload',function (req, res) {
  fs.readFile('upload.html','utf-8', function (error ,data) {
    res.writeHead(200, { 'Content-Type':'text/html'});
    res.end(data);
  });
});
router.get('/form_fileshare', function (req, res) {
  fs.readFile('form_fileshare.html', function (error, data){
    res.writeHead(200, { 'Content-Type':'text/html' });
    res.end(data,'utf8');
  });
});router.get('/form_mindmap', function (req, res) {
  fs.readFile('form_mindmap.html', function (error, data){
    res.writeHead(200, { 'Content-Type':'text/html' });
    res.end(data,'utf8');
  });
});
router.get('/form_ladder', function (req, res) {
  fs.readFile('form_ladder.html', function (error, data){
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
router.get('/project', function (req, res) {
  fs.readFile('project.html', function (error, data){
    res.writeHead(200, { 'Content-Type':'text/html' });
    res.end(data,'utf8');
  });
});




//멤버 추가
router.get('/MemberPopUp', function (req, res) {
  fs.readFile('MemberPopUp.html','utf-8', function (error, data){
    res.writeHead(200, { 'Content-Type':'text/html' });
    res.end(data,'utf8');
  });
});
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

router.post('/MemberAdd', function (req,res) {
	console.log('멤버 추가');
	console.log(req.session);
	console.log(req.body.Member_Email);
	var db = req.db;
	var User = db.get('User')
	User.findOne({"User_Email":req.body.Member_Email} , function (err, data) {
		if( data == null ) {
		
		} else {
		  var Project = db.get('Project');
		 Project.findOne({"Project_Name":req.session.Project_Name,"Project_Dday":req.session.Project_Dday}, function (err, pro) {
			if( pro == null ) {

			} else {
				var Project_Member = db.get('Project_Member');
				Project_Member.insert({"User_Id":data._id,"Project_Id":pro._id,"Project_Name":pro.Project_Name,"Project_Dday":pro.Project_Dday,"Member":data.User_Name,"Member_Position":"bronze"} , function (err,member) {
			if(member == null ) {
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
router.get('/getProjectId',function (req,res) {
		console.log('get get get get');
		console.log(req.session);
	res.send({
		User_Name:req.session.User_Name,
		User_Email:req.session.User_Email,
		Project_Id:req.session.Project_Id
		});
});
router.post('/projectout',function (req,res) {
	var db = req.db;
	var User_Name = req.session.User_Name;
	var User_Email = req.session.User_Email;
	var User = db.get('User');
console.log('자유시간');
console.log(req.body.Project_Id);
	User.findOne({"User_Name":User_Name,"User_Email":User_Email} , function (err,data) {
	if( data == null ) {
		console.log('일치하는 이름이 없습니다 ' );
	} else {
		console.log(data);
		var Project_Member = db.get('Project_Member');
		Project_Member.findOne({"Project_Id":ObjectID(req.body.Project_Id),"User_Id":data._id} ,function (err , member) {
		if( member == null ) {
			console.log('일치하는 회원의 프로젝트가 없습니다' );
		} else {
			console.log(member);
			if( member.Member_Position == 'captin') {
				console.log('지울데이터');
			var Project = db.get('Project');
			Project.remove({"Project_Name":member.Project_Name,"Project_Dday":member.Project_Dday}, function(err,note){
				if( note == null ) {
					console.log('no');
				} else {
					console.log('프로젝트 삭제 성공');
					Project_Member.remove({"Project_Id":member.Project_Id}, function (err, pro) {
						if( pro == null ) {
							console.log('no');
						} else {
							console.log('삭제성공');
							//res.redirect("project");
								res.send({Next:'delete'});
						}
					});

				}

			});
			} else {
				res.send('nocap');
			}
		}
		});
	}
	});
});
router.post('/findProjectId',function (req,res) {
	console.log('아이디 주기');
	var User_Email = req.session.User_Email;
        var User_Name = req.session.User_Name;
	var Project_Id = req.body.Project_Id;
	console.log(Project_Id);
        var db =req.db;
        var User = db.get('User');
        User.findOne({"User_Name":User_Name,"User_Email":User_Email}, function (err,data) {
        if( data == null ) {
                console.log('find error');
        } else {
        var Project_Member = db.get('Project_Member');
        Project_Member.findOne({"Project_Id":ObjectID(Project_Id),"User_Id":data._id} ,function (err,member) {
                if(member == null){
                        console.log('no member');
                } else {
			console.log(member);
			console.log(' 프로젝트 아이디 선택');
                        req.session.Project_Id = member.Project_Id;
			req.session.Project_Name = member.Project_Name;
			req.session.Project_Dday = member.Project_Dday;
			req.session.User_Name = User_Name;
			req.session.User_Email = User_Email;
			console.log(req.session);
			res.send({Next:'Frame'});
	//		res.redirect("index");
                }

        });
         }
        });
});
router.get('/Project_Create', function(req, res) {

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
    var key;
    //var time = new Date();
    // Set our collection
    var collection = db.get('User');
    var collection2 = db.get('Project_Member');
    collection.findOne({ "User_Email" : User_Email,
     "User_Pass" : User_Pass
 }, function (err,member) {
     if(member == null) {
      console.log('false');
  }
  else {

    collection2.find({ "User_Id" : member._id}, function (err,memo) {
        if(memo == null) {
            console.log('없음');
        }
        else{	
		console.log('-------------');
		console.log(memo.length);
            for(var i=0;i<memo.length;i++){
		console.log(memo[i]);
                var temp = (memo[i].Project_Dday).split('-');
                var a = new Date(temp[0],Number(temp[1])-1,temp[2]);
                var b = new Date(Date.today().getFullYear(),Date.today().getMonth(),Date.today().getDay()+1);
                Project_Name[i] = memo[i].Project_Name;
		console.log(memo[i].Project_Id);
                Project_Id[i] = memo[i].Project_Id;
                Project_DueDate[i] =(a.getTime() - Date.today().getTime())/1000/60/60/24;
                Project_Memo[i] = memo[i].Project_Memo;
		key = memo[i].Project_Id;
      	 	}
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

	});
            }  //else 끝남

        });
});



router.post('/projectadd', function (req,res) {
	var Project_Name = req.body.Project_Name;
	var Project_Dday = req.body.Project_Dday;
	var Project_Memo = req.body.Project_Memo;
	console.log('memo???????????');
	console.log(Project_Memo);
	var User_Name =req.session.User_Name;
	var User_Email = req.session.User_Email;
	var db =req.db;
	var User = db.get('User');
	var Point_Item_Table = db.get('Point_Item_Table');
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
			Project_Member.insert({"User_Id":member._id,"Project_Id":data._id,"Project_Name":Project_Name,"Project_Dday":Project_Dday,"Project_Memo":Project_Memo,"Member":User_Name,"Member_Position":"captin"} , function (err, doc){
	if(doc == null ) {
		console.log('member add error'); 
	} else {


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
//image upload
router.post('/upload',function (req, res)  {
console.log(req.files);
console.log(req.files.path);
  res.send( 'Success upload files' );
});

router.get('/userlist', function(req, res) {
	var db = req.db;
	var collection = db.get('User');
	collection.find({},{},function(e,docs){
	res.render('userlist',{"userlist":docs
	});
});
});

router.post('/login', function(req, res) {
    // Get our form values. These rely on the "name" attributes
    var db = req.db;
    var userName = req.body.loginname;
    var userpassword = req.body.loginpassword;
console.log('user name start !!!');
    // Set our collection
    var collection = db.get('User');
    collection.findOne({ "User_Email" : userName,
			 "User_Pass" : userpassword
}, function (err,member) {
	if(member == null) {
		console.log('a');
	}	
	else {
	var collection2 = db.get('Project_Member');
	collection2.find({ "User_Id" : member._id}, function (err,memo) {
		if(memo == null) {	
			console.log('nothing');
		}
		else{
		}
	});
	res.set({'Content-Type' : 'text/plain ,charset=utf-8'});
	        req.session.User_Email = member.User_Email;
		req.session.User_Name = member.User_Name;
		req.session.User_Pass = userpassword;
            res.redirect("project");
		
	}
    });
});
//chat client 에 대한 응답mobile
router.post('/register', function(req, res) {
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
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // If it worked, set the header so the address bar doesn't still say /adduser
            res.location("/");
            // And forward to success page
            res.redirect("/");
        }
    });
});
// mobile client에 대한 서버응답
router.post('/add', function ( req, res) {

  var User_Email = req.body.User_Email;
  var User_Pass = req.body.User_Pass;
  console.log(User_Email);
  console.log(User_Pass);
    var db=req.db;
    var collection = db.get('User');
       collection.findOne({ "User_Email" : User_Email,
                         "User_Pass" : User_Pass
}, function (err,member) {
        if(member == null) {
        console.log('log in fail');
        }
        else {
        console.log("aaa");
        res.send(member);
        }
    });
});
//mobile project create
router.post('/appprojectadd', function(req, res) {
    // Get our form values. These rely on the "name" attributes
    var db = req.db;
    var User_Email = req.body.User_Email;
    var User_Pass = req.body.User_Pass;
	console.log('app project add');
	console.log(User_Email);
	console.log(User_Pass);
    // Set our collection
    var collection = db.get('User');
    collection.findOne({ "User_Email" : User_Email,
       "User_Pass" : User_Pass
   }, function (err,member) {
       if(member == null) {
          console.log('false');
      }
      else {
        var collection2 = db.get('Project_Member');
        collection2.find({ "User_Id" : member._id}, function (err,memo) {
            if(memo == null) {
            }
            else{
               console.log('app memo :');
               console.log(memo);
               console.log(memo.length);
         //      console.log(memo[0].Project_Name);
         //      console.log(memo[1].Project_Name);
           }
           res.send(memo);
       });
    }
});
});

router.post('/appprojectcreate', function(req ,res) {

	 var db = req.db;
	var Project_Db = db.get("Project");
	var User_Id = req.body.User_Id;
	var Project_Name = req.body.Project_Name;
	var Project_Dday = req.body.Project_Dday;
	var User_Email = req.body.User_Email;
	var User_Name = req.body.User_Name;
	var Project_Id;
	Project_Db.insert({"Project_Name" : Project_Name, "Project_Dday":Project_Dday}, function (err,data){
	if(data == null){
	console.log('project insert error');
	}
	else {
	console.log('Project insert success');
	console.log(data._id);
	var User = db.get("User");
	User.findOne({"User_Email":User_Email,"User_Name":User_Name} , function (err,doc) {
	console.log('User FindOne:');
	console.log(User_Email);
	console.log(User_Name);
	if( doc == null ) {
	console.log('user find error');
	} else{
		console.log('user find');
		console.log(doc);
		console.log(doc._id);
var Project_Member_Db = db.get("Project_Member");
		Project_Member_Db.insert({"User_Id":doc._id,"Project_Id":data._id,"Project_Name":data.Project_Name,"Project_Dday":data.Project_Dday,"Member":User_Name }, function (err, member) {
		if(err){
			console.log('Project_Member error');
		} else {
			console.log('Project_Member insert success');
			res.send(member);
			}
		});
	}
		});
	}
  });
});


router.post('/appprojectdelete', function(req ,res) {
	var db =req.db;
        var Project_Name;
        var Project_Dday;
        var User_Email = req.body.User_Email;
        var User_Name = req.body.User_Name;
        var Project_Index = req.body.Project_Index;

console.log('-------------------------------------');
console.log(Project_Index);
console.log(User_Email);
console.log(User_Name);
console.log('-------------------------------------');
 var collection = db.get('User');
 collection.findOne({"User_Email":User_Email}, function(err,data){
    if(data == null) {
            console.log('no user data');
    } else {
	console.log(data);
        var Project_Member_Db = db.get('Project_Member');
        Project_Member_Db.find({"User_Id":data._id} , function(err,member){
            if (member == null){
                console.log('no member data');
            } else {
		console.log('111');
		console.log(member);
		console.log(member[0]);

                Project_Name = member[Project_Index].Project_Name;
                Project_Dday = member[Project_Index].Project_Dday;
                console.log(Project_Name);
                console.log(Project_Dday);
                if(member[Project_Index].Member_Position == "captin"){
                    Project_Member_Db.remove({"Project_Id":member[Project_Index].Project_Id},function(err,note){
                        if(note == null){
                            console.log("no delete project member all");
                        } else {
                            console.log("delete project member all");
			   var Project = db.get('Project');
                            Project.remove({"Project_Name":Project_Name,"Project_Dday":Project_Dday}, function(err,pro){
                                if(pro == null){
                                    console.log('no delete project');
                                } else {
					console.log(pro);
                                    console.log('success delete project');
				var people = db.get('Project_Member');
					console.log(data._id);
                                   people.find({"User_Id":data._id},function(err,finddata){
                                        if(finddata == null){
                                            console.log('no find data');
                                        } else {
					console.log(finddata);
                                            res.send(finddata);
                                        }
                                    });
                                }
                            });
                        }
                    });
                } else {
			console.log(member[Project_Index].Project_Id);
			console.log(member[Project_Index].Project_Name);
                    Project_Member_Db.remove({"Project_Id":member[Project_Index].Project_Id},function(err,doc){
                        if(doc == null){
                            console.log('no delete user');
                        } else {
                            console.log('success delete user');
			console.log(data._id);
			var second = db.get('Project_Member');
                            second.find({"User_Id":data._id},function(err,finddata2){
                                        if(finddata2 == null){
                                            console.log('no find data');
                                        } else {
					console.log(finddata2);
                                            res.send(finddata2);
                                        }
                                    });
                        }
                    });
                }
            }
        });
    }
 });
});


router.post('/addprojectmember',function(req ,res) {
  var db = req.db;
  var Project_Index = req.body.Project_Index;
  var Member_Email = req.body.Member_Email;
  var User_Pass = req.body.User_Pass;
  var User_Email = req.body.User_Email;
  var Project_Db = db.get("Project");
  var Project_Member_Db = db.get("Project_Member");
  var User_Db = db.get("User");
  console.log('-------------------------------------');
  console.log(Project_Index);
  console.log(Member_Email);
  console.log(User_Email);
  console.log('-------------------------------------');


  console.log(User_Email);
  console.log('a');

  User_Db.findOne({ "User_Email" : User_Email,
    "User_Pass" : User_Pass
  }, function (err,member) {
    if(member == null) {
      console.log('false');
    }
    else {

      Project_Member_Db.find({ "User_Id" : member._id}, function (err,projectmemberinfo) {
        if(projectmemberinfo == null) {
        }
        else{
          User_Db.findOne({"User_Email":Member_Email}, function(err, userinfo){
            // user id, name 찾기 완료
            if(userinfo == null){
              console.log('can not find user');
            }
            else {
              console.log('c');
              //User._id, project._id User_Name있으니까 추가하는곳
              console.log(projectmemberinfo[Project_Index]);
		console.log(Project_Index);
              Project_Member_Db.insert({
                    "User_Id": userinfo._id,
                    "Project_Id": projectmemberinfo[Project_Index].Project_Id,
                    "Project_Name": projectmemberinfo[Project_Index].Project_Name,
                    "Project_Dday": projectmemberinfo[Project_Index].Project_Dday,
                    "Member": userinfo.User_Name
                  }
                  , function (err, data) {
                    if (err) {
                      console.log('fail');
                    }
                    else {
                      console.log(projectmemberinfo[Project_Index].Project_Id);
                      res.send(projectmemberinfo[Project_Index].Project_Id);
                    }
                  }
              );
            }
          });
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
  console.log('app register');
  console.log(User_Name);
  console.log(User_Email);
  console.log(User_Pass);
  console.log();
  // Set our collection
  var collection = db.get('User');
  // Submit to the DB
  collection.insert({
    "User_Email" : User_Email,
    "User_Name" : User_Name,
    "User_Pass" : User_Pass,
    "Access":'false'
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

router.post('/projectmemberlist', function(req, res) {
  var db = req.db;
  var User_Email = req.body.User_Email;
  var User_Pass = req.body.User_Pass;
  var Project_Index = req.body.Project_Index;
  var Project_Member_Db = db.get('Project_Member');
  var User_Db = db.get('User');


  User_Db.findOne({
    "User_Email": User_Email, "User_Pass": User_Pass
  }, function (err, member) {
    if (member == null) {
      console.log('false');
    }
    else {

      Project_Member_Db.find({"User_Id": member._id}, function (err, projectmemberinfo) {
        if (projectmemberinfo == null) {
        }
        else {
          var Project_Id = projectmemberinfo[Project_Index].Project_Id;
          console.log(Project_Id);
          Project_Member_Db.find({"Project_Id": Project_Id}, function (err, data) {
            console.log('success view');
            console.log(data.length);
            res.send(data);
          });
        }
      });
    }
  });
});

module.exports = router;
