var express = require('express');
/********************************************/
var LocalStrategy   = require('passport-local').Strategy;

// load up the user model
var mysql = require('mysql');
var bcrypt = require('bcrypt-nodejs');
var dbconfig = require('../config/database');
var connection = mysql.createConnection(dbconfig.connection);

connection.query('USE ' + dbconfig.database);
/******************************************/
module.exports = function(app, passport) {

  /* GET home page. */
  app.get('/',function(req,res){
         if(req.user ==undefined) {
           res.redirect('/login');
         }
          res.render('index', {
          });
      });
  app.get('/about', function(req, res) {
    res.render('about', { title: 'Express' });
  });

  app.get('/write', function(req, res) {
    res.render('write', { title: 'Express' });
  });

  var contents_test = 'hellowonki';
  app.get('/submit', function(req, res){
  var sqlQuery = "INSERT INTO posts SET ?";
        var post = {UserID : req.user.username, Contents : contents_test, Date :  20170523};
        var query = connection.query(sqlQuery, post, function (err, result) {
          if (err) throw err;
          console.log("1 record inserted");
        });
     });

   app.get('/test', function(req, res){
         connection.query('SELECT * from posts', function(err, rows) {
           if(err) throw err;

           console.log('The solution is: ', rows);
           res.send(rows);//실질적으로 웹페이지에 보내는 줄
         });
      });




  // =====================================
  // LOGIN ===============================
  // =====================================
  // show the login form
  app.get('/login', function(req, res) {

    // render the page and pass in any flash data if it exists
    res.render('login.ejs', { message: req.flash('loginMessage') });
  });

  // process the login form
  app.post('/login', passport.authenticate('local-login', {
            successRedirect : '/profile', // redirect to the secure profile section
            failureRedirect : '/login', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
    }),
        function(req, res) {
            console.log("hello");

            if (req.body.remember) {
              req.session.cookie.maxAge = 1000 * 60 * 3;
            } else {
              req.session.cookie.expires = false;
            }
        res.redirect('/');
    });

  // =====================================
  // SIGNUP ==============================
  // =====================================
  // show the signup form
  app.get('/signup', function(req, res) {
    // render the page and pass in any flash data if it exists
    res.render('signup.ejs', { message: req.flash('signupMessage') });
  });

  // process the signup form
  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect : '/profile', // redirect to the secure profile section
    failureRedirect : '/signup', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
  }));

  // =====================================
  // PROFILE SECTION =========================
  // =====================================
  // we will want this protected so you have to be logged in to visit
  // we will use route middleware to verify this (the isLoggedIn function)
  app.get('/profile', isLoggedIn, function(req, res) {
    res.render('profile.ejs', {
      user : req.user // get the user out of session and pass to template
    });
  });

  // =====================================
  // LOGOUT ==============================
  // =====================================
  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });
};

// route middleware to make sure
function isLoggedIn(req, res, next) {

// if user is authenticated in the session, carry on
if (req.isAuthenticated())
  return next();

// if they aren't redirect them to the home page
  res.redirect('/login');
}


// module.exports = router;
