const express = require('express')
const path = require('path')
const favicon = require('serve-favicon')
const morganLogger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const db = require('./logic/controllers/db.controller')
const cfg = require('./config/mavodConfig.json')

const routes = require('./routes/index')
const users = require('./routes/users')

const app = express()

//Connect to the database specified in config
db.connectPromise(cfg.mongoose.dbURL)
.then(()=>{
  console.log(`Connected to DB: ${cfg.mongoose.dbURL}`)
})
.catch ((err)=>{
  console.log(err)
})

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(morganLogger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', routes)
app.use('/users', users)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500)
    res.render('error', {
      message: err.message,
      error: err
    })
  })
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500)
  res.render('error', {
    message: err.message,
    error: {}
  })
})

//Directories
app.locals.bootstrapCSS = cfg.directories.bootstrap.css
app.locals.bootstrapJS = cfg.directories.bootstrap.js
app.locals.componentsJS = cfg.directories.bootstrap.components

module.exports = app
