var express=require('express');
var nodemailer = require("nodemailer");
var smtpTransport = require("nodemailer-smtp-transport");
var bodyParser  = require('body-parser');
var app=express();

var allowCrossDomain = function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(allowCrossDomain);
app.use(express.static(__dirname+ "/"));

/*  Here we are configuring our SMTP Server details.
STMP is mail server which is responsible for sending and recieving email.*/
var smtpTransport = nodemailer.createTransport(smtpTransport({
  host : "smtp.gmail.com",
  secureConnection : false,
  port: 25,
  auth: {
    user: "sergut18@gmail.com",
    pass: "#anonymous88#6847gpSM"
  }
}));
/*------------------SMTP Over-----------------------------*/

/*------------------Routing Started ------------------------*/
app.get('/',function(req,res){
  res.sendfile('index.html');
});
app.post('/send',function(req,res){
  console.log("FUncion send");
  console.log(req.body)
  var mailOptions={
    to : "sergut18@gmail.com",
    subject : "Cotización con factura",
    text : req.body.text,
    from : req.body.email,
    priority: 'high'
  }
  console.log(mailOptions);
  smtpTransport.sendMail(mailOptions, function(error, response){
    if(error){
      console.log(error);
      res.end("error");
    }else{
      console.log("Message sent: " + response.message);
      res.end("sent");
    }
  });
});

/*--------------------Routing Over----------------------------*/
app.listen(3000,function(){
  console.log("Express Started on Port 3000");
});