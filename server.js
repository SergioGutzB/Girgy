var express = require('express');
var nodemailer = require("nodemailer");
var smtpTransport = require("nodemailer-smtp-transport");
var bodyParser = require('body-parser');
var Moment = require('moment-timezone');
var multipart = require('connect-multiparty');
var xoauth2 = require('xoauth2');
var app = express();

var allowCrossDomain = function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
}

var email_send = "servicios@girgysolar.com";

process.env.TZ = 'America/Bogota';

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(multipart()) //Express 4
app.use(allowCrossDomain);
app.use(express.static(__dirname + "/"));
app.use('/img', express.static(__dirname + '/img'));

/*  Here we are configuring our SMTP Server details.
STMP is mail server which is responsible for sending and recieving email.*/

var generator = require('xoauth2').createXOAuth2Generator({
  user: 'servicios@girgysolar.com',
  clientId: '750395441404-cqr3mtlabjfv694vt6292fi99tp880gv.apps.googleusercontent.com',
  clientSecret: '9oo50ZrcGFNnkIo1NFw1SX-Z',
  refreshToken: '1/qgg2bNiDKk5lTgx1MmDNODwszwjMyAnX2Yho0ym3ZLk'
});

// listen for token updates
// you probably want to store these to a db
generator.on('token', function(token) {
  console.log('New token for %s: %s', token.user, token.accessToken);
});

// login
var smtpTransport = nodemailer.createTransport(smtpTransport({
  service: 'gmail',
  auth: {
    xoauth2: generator
  }
}));


/*------------------SMTP Over-----------------------------*/

/*------------------Routing Started ------------------------*/
app.get('/', function(req, res) {
  res.sendfile('index.html');
});

app.post('/upload', function(req, res) {
  var fs = require('fs')
  console.log("uploading...");
  console.log(req.files);
  var path = req.files.file.path;
  console.log(req.files.file.name);
  console.log(typeof(req.files.file.name))
  var type = req.files.file.name.split(".");
  var newPath = './img/' + req.files.file.name;
  var is = fs.createReadStream(path)
  var os = fs.createWriteStream(newPath)


  is.pipe(os)
  is.on('end', function() {
    fs.unlinkSync(path)
  })
});

app.post('/send', function(req, res) {
  console.log("FUncion send");
  console.log(req.body)
  var path = require('path');
  console.log(path.join(__dirname, "/img/" + req.body.file));
  if (req.body.file) {
    var mailOptions = {
      to: email_send,
      subject: "Cotización con factura",
      text: req.body.text,
      from: req.body.from,
      priority: 'high',
      attachments: [{
        filename: req.body.file,
        path: "./img/" + req.body.file
      }]
    }
  } else {
    var mailOptions = {
      to: email_send,
      subject: "Cotización con factura",
      text: req.body.text,
      from: req.body.from,
      priority: 'high'
    }
  }
  console.log(mailOptions);
  smtpTransport.sendMail(mailOptions, function(error, response) {
    if (error) {
      console.log(error);
      res.send({ success: false, msg: 'No se pudo enviar' + error });
    } else {
      console.log("Message sent: " + response);
      console.log("success: true")
      res.json({ success: true });
      if (req.body.file) {
        var fs = require('fs')

        fs.exists("./img/" + req.body.file, function(exists) {
          if (exists) {
            console.log('File exists. Deleting now ...');
            fs.unlink("./img/" + req.body.file);
          } else {
            console.log('File not found, so not deleting.');
          }
        });
      }
    }
  });

});

app.post('/contacto', function(req, res) {
  var mailOptions = {
    to: email_send,
    subject: req.body.subject,
    text: req.body.text,
    from: req.body.from,
    priority: 'high'
  }
  smtpTransport.sendMail(mailOptions, function(error, response) {
    if (error) {
      console.log(error);
      res.send({ success: false, msg: 'No se pudo enviar' + error });
    } else {
      console.log("success: true")
      res.json({ success: true });
    }
  });
});

app.post('/test', function(req, res) {
  console.log("test");
  res.json({ success: true });
});


/*--------------------Routing Over----------------------------*/
app.listen(3000, function() {
  console.log("Express Started on Port 3000");
});