require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const fileupload = require('express-fileupload');
const cors = require('cors');
const fs = require('fs');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

const bodyParser = require('body-parser');
// const indexRouter = require('./routes/index');
const usersRouter = require('./routes/userRoutes');
const wardRouter = require('./routes/wardRoutes');
const ideasRouter = require('./routes/ideasRoutes');
const volunteerRouter = require('./routes/volunteerRoutes');
const pollRouter = require('./routes/pollRoutes');
const complaintRouter = require('./routes/complaintRoutes');
const incidentRouter = require('./routes/incidentRoutes');
const chatbotRouter = require('./routes/chatbotRoutes');
const citizenRouter = require('./routes/citizenRoutes');
const citizenReportRouter = require('./routes/citizenReportRoutes');
const donutRouter = require('./routes/donutRoutes');
const dashboardRouter = require('./routes/dashboardRoutes');
const facilityRouter = require('./routes/facilityRoutes');
const facilityTypeRouter = require('./routes/facilityTypeRoutes');
const feedbackRouter = require('./routes/feedbackRoutes');
const socialRouter = require('./routes/socialRoutes');
const helpRouter = require('./routes/helpRoutes');
const SOSRouter = require('./routes/SOSRoutes');
const notificationRouter = require('./routes/notificationRoutes');
const whatsTrendingRouter = require('./routes/whatsTrendingRoutes');
const newsRouter = require('./routes/newsRoutes');
const adminRouter = require('./routes/adminRoutes');
// const discussionRouter = require('./routes/discussionRoutes');
var app = express();


//Swagger Configuration  
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Smart City API',
      version: '1.0.0'
    }
  },
  apis: ['docs/*.js'],
}
const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});
app.use(fileupload());
app.options('*', cors());
app.use(cors());
// const ideasRouter =require('./routes/ideasRoutes');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: true
}))

// parse application/json
app.use(bodyParser.json())

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

app.use('/public', express.static('public'))
// app.use('/', indexRouter);
app.use('/Smartcity', usersRouter);
app.use('/Admin',adminRouter);
app.use('/Smartcity', wardRouter);
app.use('/Ideas', ideasRouter);
app.use('/Volunteer', volunteerRouter);
app.use('/Poll', pollRouter);
app.use('/Complaint', complaintRouter);
app.use('/Incident', incidentRouter);
app.use('/Chatbot', chatbotRouter);
app.use('/Citizen', citizenRouter);
app.use('/CitizenReport', citizenReportRouter);
app.use('/Dashboard', dashboardRouter);
app.use('/Donut', donutRouter);
app.use('/Facility', facilityRouter);
app.use('/FacilityType', facilityTypeRouter);
app.use('/Feedback', feedbackRouter);
app.use('/Social', socialRouter);
app.use('/Help', helpRouter);
app.use('/SOS', SOSRouter);
app.use('/Notification', notificationRouter);
app.use('/WhatsTrending', whatsTrendingRouter);
app.use('/News', newsRouter);

// app.use('/dicussion', discussionRouter);
// app.use('/ideas',ideasRouter);

// //Routes
// /**
//  * @swagger
//  * /customers:
//  * get:
//  *      description: Get all ideas.
//  *      responses:
//  *      '200':
//  *          description:A Data Found Successful response
//  */
// app.get("/customers",(req,res)=>{
//   res.send("customer result");
// })

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;