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

// app.use(session({ cookie: { maxAge: 60000 }, 
//                   secret: 'woot',
//                   resave: false, 
//                   saveUninitialized: false}));

               
        
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
