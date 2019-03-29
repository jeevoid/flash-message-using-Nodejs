# flash-message-using-Nodejs

///main app///

var express = require("express");
var app=express();
var path=require("path");
var flash = require('express-flash-messages')
var cookieParser = require('cookie-parser');
var flash = require('connect-flash');
//var session = require('express-session');
var session = require('express-session')({  
    secret: 'ssshhhhh',
    resave: true,
    saveUninitialized: true
 });

var bodyParser=require('body-parser');
app.set('view engine','ejs');
app.use(express.static(path.join(__dirname,'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({limit: '10mb',extended: false}));


app.use(cookieParser('secretString'));
app.use(session);
app.use(flash());

app.use(function(req, res, next){
    res.locals.error_msg = req.flash('error_msg');
    res.locals.success_msg=req.flash('success_msg')
    next();
});  

var lgn=require("./routes/jsfiles/flash");
app.use("/jsfiles/flash",lgn);

app.listen(9000,function(){
    console.log("SERVER STARTED");
  
app.get('/',function(req,res){
    console.log("hi hi hi")
    res.render('flash/flash1');
 
});

});



//routes/js files

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
  
  
  
  
  
  
//////html code//////
<!DOCTYPE html>
<html>

<body>
    <div>
               
    </div>     
        <form method = "post" action="/jsfiles/flash/fla">
           
empid<input type="text" name="empid" id="empid">
name<input type="text" name="name" id="name">
age<input type="number" name="age" id="age">
city<input type="city" name="city" id="city">
<button type="submit" name="submit" id="submit" onclick="">submit</button>

</form>                      
</body>
</html>



////error flash code///////

<html>
    <body>
            <form method = "post" action="/jsfiles/flash/fla">
            <% if(locals.message){ %>
                            
                <div class="text text-center" role="alert">
                <strong style="color:brown"><%= message.error_msg %></strong> 
                </div>
            <% } %>
        </form>
    </body>
</html>




//////success flash code////////


<html>
    <body>
            <form method = "post" action="/jsfiles/flash/fla">
                <% if(locals.message){ %>
            
                    <div class="text text-center" role="alert">
                    <strong style="color:rgb(13, 226, 24)"><%= message.success_msg %></strong>    
                    </div>
                <% } %>


        </form>
    </body>
</html>
