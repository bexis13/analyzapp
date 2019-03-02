var express 			 	 = require('express')
    , router 			 	 = express.Router()
    , mongoose 			 	 = require("mongoose")
	, User                    = require('../models/user')
	, LocalStrategy           = require("passport-local")
	, passport                = require('passport')       
    , passportLocalMongoose   = require('passport-local-mongoose');


const url = process.env.MONGOLAB_URI || "mongodb://localhost/analyzapp";
mongoose.Promise = global.Promise;
mongoose.connect(url);
const db = mongoose.connection;



//index route
router.get("/", (req, res)=> {
	const _         = require("underscore");

	const collection = db.collection('categories');
	const userLoggedIn = req.user;
	collection.find().toArray((err, items)=> {
		res.render("index", { 
			// Underscore.js lib
			_     : _, 
			
			// Template data
			title : "Online shop",
			items : items,
			userLoggedIn : userLoggedIn
		});
	})
});



//routes for registration/login======================



//user registration/logout routes with passport
router.get('/register', (req, res)=>{
   res.render('register'); 
});

//handling user signup
router.post('/register', (req, res)=>{

    User.register(new User({username : req.body.username}), req.body.password, (err, user)=>{
        if(err){
            console.log(err);
            res.render('register');
        }
        else if(user){
            console.log(user);
            passport.authenticate("local")(req, res, ()=>{
                res.redirect('/');
            })
        }
    })
})
//login routes
//render login form
router.get('/login', (req, res)=>{
    res.render('login');
})
//login logic
//middleware
router.post('/login', passport.authenticate("local", {
    successRedirect : '/',
    failureRedirect : '/login'
}), (req, res)=>{
    
})

//logout route
router.get('/logout', (req, res)=>{
    req.logout();
    res.redirect('/');
})
//middleware to check if user is logged in
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }else{
        res.redirect('/login');
    }
}


module.exports = router;