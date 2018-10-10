var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
let settingRouter=require('./routes/setting')
let reportRouter=require('./routes/report')
let apiRouter=require('./routes/api')
var ver=require('./package.json').version
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req,res,next)=>{
	//console.log(req.url.indexOf('union_valid'))
	res.locals._v=ver
	next()
})

app.use((req,res,next)=>{
  let url=req.url.toLowerCase();
  if(url.indexOf('/setting')==0 || url.indexOf('/report')==0 || url.indexOf('/users')==0){
    let tel=req.cookies['t']
    //let password=req.cookies['p']
    let apitime=req.cookies['a']
    if(!tel){
      res.redirect(302,'/register?url='+url)
      return;
    }else if(!apitime){
      let east_api=require('./server/east_api')
      east_api.login(tel,'ECKoWMEJqqjCUoqh9VVTowMWNlyyywLBR7HM',res,(success)=>{ 
          if(success)
            next()
      })
      return
    }
  }
  next()
})



app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/setting',settingRouter)
app.use('/report',reportRouter)
app.use('/api',apiRouter)



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
