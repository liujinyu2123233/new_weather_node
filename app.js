var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

app.get('/fo15d',function(req,res){
  req.setEncoding('utf8');
  res.setHeader("Access-Control-Allow-Origin","*");
  var temp15daydatas = [];
  var date = new Date();
  var week = ['周一','周二','周三','周四','周五','周六','周日']
  var now = 1;
  for(var i = 0;i<15;i++){
    var temp = parseInt(Math.random()*40);
    var newDate = new Date();
    newDate.setDate(date.getDate()+i)
    temp15daydatas.push({
      t:newDate.getDate()<10?"0"+newDate.getDate():newDate.getDate(),
      d:week[newDate.getDay()],
      weaD:"d0"+newDate.getDay(),
      weaN:'n0'+newDate.getDate(),
      temD:temp,
      temN:temp-parseInt(Math.random()*15),
      wx:"南风",
      wl:"4级别",
      blueLv:"lv"+(parseInt(Math.random()*3)+1)
    })
  }
  res.end(JSON.stringify({d:temp15daydatas,time:new Date()}))
})

app.get("/fo24h", function (req,res) {
  req.setEncoding('utf8');
  res.setHeader("Access-Control-Allow-Origin","*");

  var data24 = [];
  var arrwea = ['晴', '阴', '雨', '大雨', '小雨']
  for (var i = 0; i <= 23; i++) {
    var obj = {
      time: i,
      wea: parseInt(Math.random() * 4),
      tem: parseInt(Math.random() * 60)
    }
    data24.push(obj)
  }
  res.end(JSON.stringify({d:data24,time:new Date()}))
})
app.get('/index', function (req,res) {
  req.setEncoding('utf8');
  var obj = {zwx:[{t:"今天",lv:1,txt:'中等',des:'属中等强度紫外线辐射天气，外出时建议涂擦SPF高于15、PA+的防晒护肤品，戴帽子、太阳镜。'}]}
  for(var i = 0;i<6;i++){
    obj.zwx.push({t:"今天",lv:1,txt:'中等',des:'属中等强度紫外线辐射天气，外出时建议涂擦SPF高于15、PA+的防晒护肤品，戴帽子、太阳镜。'})
  }
  res.end(JSON.stringify(obj))
})
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
