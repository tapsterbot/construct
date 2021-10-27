var createError = require('http-errors')
var express = require('express')
var path = require('path')
var helmet = require('helmet')
var cookieParser = require('cookie-parser')
var logger = require('morgan')

// Get routes
var indexRouter = require('./routes/index')
var constructRouter = require('./routes/construct')
var customRouter = require('./routes/custom')
var t3PlusRouter = require('./routes/t3PlusRouter')

// Server set-up
var app = express()
// app.use(helmet())
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
)

// View engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', constructRouter)
app.use('/yo', indexRouter)
app.use('/concept-1', customRouter)
app.use('/tapster-3-plus/', t3PlusRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404))
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
});

module.exports = app