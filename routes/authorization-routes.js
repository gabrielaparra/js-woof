const express = require('express');
const bcrypt = require('bcrypt');
const UserModel = require('../models/user-model.js');
const passport = require('passport');
const router = express.Router();

//--------------------REGISTRATION--------------------------
router.post('/signup', (req, res, next) => {
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


//-------------------LOG IN------------------------
router.post('/login', passport.authenticate(
  'local',
  //1st arg -> name of the strategy used to log in
  {
    successRedirect: '/',
    failureRedirect: '/'
    //Redirect accordingly (if login is successful or fails)
  }
  //2nd arg -> settings object
));
// //------------------END LOG IN----------------------


module.exports = router;
