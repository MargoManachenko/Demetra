const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const config = require('./config');

require("babel-core").transform("code", {
    plugins: ["transform-class-properties"]
});

// connect to the database and load models
require('./server/models').connect(config.dbUri);

const app = express();
// tell the app to look for static files in these directories
app.use(express.static('./server/static/'));
app.use(express.static('./client/dist/'));
app.use('/static', express.static(__dirname + '/client/dist'));

// tell the app to parse HTTP body messages
app.use(bodyParser.urlencoded({ extended: false }));
// pass the passport middleware
app.use(passport.initialize());

// load passport strategies
const localSignupStrategy = require('./server/passport/local-signup');
const localLoginStrategy = require('./server/passport/local-login');
const localLoginEmployeeStrategy = require('./server/passport/local-loginEmployee');
passport.use('local-signup', localSignupStrategy);
passport.use('local-login', localLoginStrategy);
passport.use('local-loginEmployee', localLoginEmployeeStrategy);

// pass the authorization checker middleware
const authCheckMiddleware = require('./server/middleware/auth-check');
app.use('/api', authCheckMiddleware);

// routes
const authRoutes = require('./server/routes/auth');
const apiRoutes = require('./server/routes/api');
const cropRoutes = require('./server/routes/crop');

app.use('/auth', authRoutes);
app.use('/api', apiRoutes);
app.use('/crop', cropRoutes);


// app.set('port', process.env.PORT || 3000);

// start the server
app.listen( process.env.PORT || 3001, () => {
  console.log('Server is running on http://localhost:3001 or http://127.0.0.1:3001');
});
