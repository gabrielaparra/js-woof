const express = require('express');
const bcrypt = require('bcrypt');
const UserModel = require('../models/user-model.js');
const passport = require('passport');
const router = express.Router();

//--------------------REGISTRATION--------------------------
// //STEP 1 of signup: displaying the signup form
// router.get('/signup', (req, res, next) => {
//   res.render('authorization-views/signup-view.ejs');
// });

//STEP 2 of signup: processing the information submitted in the signup form
router.post('/', (req, res, next) => {
  if (req.body.signupEmail === '' || req.body.signupPassword === '' || req.body.signupFullName === '') {
    res.locals.messageForDumbUsers = 'Please provide your name, email, and password.';
    res.render('index.ejs');
    return;
  }

  //Checking if the email already exists in the database
  UserModel.findOne(
    { email: req.body.signupEmail },
    (err, userFromDb) => {
      //if there's an error retrieving the information from the DB
      if (err){
        next(err);
        return;
      }

      //if a match was found (the email is taken)
      if (userFromDb) {
        res.locals.messageForDumbUsers = 'Sorry, that email account is already registered.';
        //display the form again with the feedback message
        res.render('index.ejs');
        return;
      }

      //if the email is available run these lines of code:
      const salt = bcrypt.genSaltSync(10);
      const scrambledPassword = bcrypt.hashSync(req.body.signupPassword, salt);
      //encrypting the user's input PW before saving it

      const theUser = new UserModel({
        fullName: req.body.signupFullName,
        email: req.body.signupEmail,
        phoneNumber: req.body.signupPhoneNumber,
        encryptedPassword: scrambledPassword
      });

      theUser.save((err) => {
        if (err) {
          next(err);
          return;
        }
        res.redirect('/');
        //redirect to homepage
      });
    }
  );
});
//-----------------END OF REGISTRATION------------------
//
//
// //-------------------LOG IN------------------------
// //1st step: displaying login form
// router.get('/login', (req, res, next) => {
//   if (req.user) {
//     res.redirect('/');
//   } else {
//     res.render('authorization-views/login-view.ejs');
//   }
// });
//
// //2nd step: authentication
// router.post('/login', passport.authenticate(
//   'local',
//   //1st arg -> name of the strategy used to log in
//   {
//     successRedirect: '/',
//     failureRedirect: '/login'
//     //Redirect accordingly (if login is successful or fails)
//   }
//   //2nd arg -> settings object
// ));
// //------------------END LOG IN----------------------
//
// //----------------SOCIAL LOG INS--------------------
//
// //FACEBOOK
//             //determined by the strategy's npm package
// router.get('/auth/facebook', passport.authenticate('facebook'));
// router.get('/auth/facebook/callback',
//   passport.authenticate(
//     'facebook',
//     {
//       successRedirect: '/special',
//       failureRedirect: '/login'
//     }
//   )
// );
//
// //GOOGLE
//             //determined by the strategy's npm package
// router.get('/auth/google',
//   passport.authenticate(
//     'google',
//      {
//        scope: [
//          'https://www.googleapis.com/auth/plus.login',
//          'https://www.googleapis.com/auth/plus.profile.emails.read'
//        ]
//      }
//    )
//  );
//
//   router.get('/auth/google/callback',
//     passport.authenticate(
//       'google',
//       {
//         successRedirect: '/special',
//         failureRedirect: '/login'
//       }
//     ));
//
// //--------------------------------------------------
//
// //-------------------LOG OUT-------------------------
// router.get('/logout', (req, res, next) => {
//   req.logout();
//   //the req.logout() function is defined by the passport middleware in app.js
//   res.redirect('/');
// });
// //---------------------------------------------------

module.exports = router;
