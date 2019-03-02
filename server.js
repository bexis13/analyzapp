var http                  = require('http')
, express                 = require('express')
, app                     = express()
, router                  = require('./routes/routes')
, path                    = require('path')
, favicon                 = require('serve-favicon')
, logger                  = require('morgan')
, mongoose                = require("mongoose")
, methodOverride          = require('method-override')
, bodyParser              = require('body-parser')
, passport                = require('passport')
, LocalStrategy           = require("passport-local")          
, passportLocalMongoose   = require('passport-local-mongoose')
, User                    = require('./models/user')
, errorHandler            = require('errorhandler');



// All environments
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended : true}));
app.use(require("express-session")({
    secret : "secret session info",
    resave : true,
    saveUninitialized : true
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, "public")));
app.use(errorHandler());
app.use(router);
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride());


//passport config
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//redirect for all unmatched urls
app.use(redirectUnmatched);
function redirectUnmatched(req, res) {
  res.send('we have no such urls.')
}



// Run server
app.listen(process.env.PORT || 8080 || 80 || 3000, ()=>{
  console.log("app is running on port");
})