const express = require('express');
const BookingModel = require('../models/booking-model.js');
const router  = express.Router();

//Displaying User's Dashboard
router.get('/dashboard', (req, res, next) => {
  res.render('booking-views/dashboard-view.ejs');
});

//Saving booking appointment
router.post('/booking', (req, res, next) => {
  console.log("====================>" + req.user._id);
  console.log(typeof req.user._id);
  const theBooking = new BookingModel ({
    petsName: req.body.petsName,
    petsBreed: req.body.petsBreed,
    appointmentDate: req.body.appointmentDate,
    chosenPackage: req.body.chosenPackage,
    specialRequests: req.body.specialRequests,
    //Set the owner as the logged in user's database id
    petOwner: req.user._id
  });

  theBooking.save((err) => {
    if (err) {
      next(err);
      return;
    }

    res.redirect('dashboard');
  });
});


module.exports = router;
