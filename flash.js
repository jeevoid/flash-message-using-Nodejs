var express=require('express');
var router=express.Router();

var bodyParser=require('body-parser');
var dbconnect=require('../dbconnection/dbconnect');

router.post('/fla',function(req,res){
  console.log("Heyy");

var id=req.body.empid;
var nam=req.body.name;
var ag=req.body.age;
var cit=req.body.city;
console.log("results",id,nam,ag,cit);
dbconnect.query("select * from nurt where empid=$1 ",[id],function(err,loginres){
    console.log("results",loginres)


if (loginres.rowCount==1 ){
console.log("user already exists")
req.flash('error_msg',"user already exists");
    res.locals.message=req.flash();
    res.render('flash/errormsg');
}
else{
    dbconnect.query("insert into nurt values($1,$2,$3,$4)",[id,nam,ag,cit],function(err,resul){
 console.log("Result",resul);
     
console.log("welcome, New user created")
req.flash('success_msg', 'welcome, New user created');
    //res.send(req.flash());
    res.locals.message=req.flash();
    res.render('flash/successmsg');
});
}


     });
    });

  module.exports = router;