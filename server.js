var express=require('express');
var nodemailer = require("nodemailer");
var smtpTransport = require("nodemailer-smtp-transport");
var bodyParser  = require('body-parser');
var Moment      = require('moment-timezone');
var multipart = require('connect-multiparty');
var app=express();

var allowCrossDomain = function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
}

process.env.TZ = 'America/Bogota';

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(multipart()) //Express 4
app.use(allowCrossDomain);
app.use(express.static(__dirname+ "/"));
app.use('/img', express.static(__dirname + '/img'));

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

app.post('/upload',function(req,res){
  var fs = require('fs')
  console.log("uploading...");
  console.log(req.files);
  var path = req.files.file.path;
  console.log(req.files.file.name);
  console.log(typeof(req.files.file.name))
  var type = req.files.file.name.split(".");  
  var newPath = './img/'+ req.files.file.name;
  var is = fs.createReadStream(path)
  var os = fs.createWriteStream(newPath)

  is.pipe(os)
  is.on('end', function() {
    fs.unlinkSync(path)
  })
});

app.post('/send',function(req,res){
  console.log("FUncion send");
  console.log(req.body)
  

  var mailOptions={
    to : "sergut18@gmail.com",
    subject : "Cotización con factura",
    text : req.body.text,
    from : req.body.from,
    priority: 'high',
    attachments: [{filename: "http://127.0.0.1:3000/img/"+req.body.file}]

  }
  console.log(mailOptions);
  smtpTransport.sendMail(mailOptions, function(error, response){
    if(error){
      console.log(error);
      res.send({success: false, msg: 'No se pudo enviar'+error});
    }else{
      console.log("Message sent: " + response);
      console.log("success: true")
      res.json({success: true});
    }
  });
});

app.post('/contacto',function(req,res){
  var mailOptions={
    to : "sergut18@gmail.com",
    subject : req.body.subject,
    text : req.body.text,
    from : req.body.from,
    priority: 'high'
  }
  smtpTransport.sendMail(mailOptions, function(error, response){
    if(error){
      console.log(error);
      res.send({success: false, msg: 'No se pudo enviar'+error});
    }else{
      console.log("success: true")
      res.json({success: true});
    }
  });
});


/*--------------------Routing Over----------------------------*/
app.listen(3000,function(){
  console.log("Express Started on Port 3000");
});