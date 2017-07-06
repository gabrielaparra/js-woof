const express = require('express');
const BookingModel = require('../models/booking-model.js');
const PetModel = require('../models/pet-model.js');
const router  = express.Router();

//Displaying the User's Dashboard
router.get('/dashboard', (req, res, next) => {
  BookingModel.find(
    { petOwner: req.user._id },
    (err, bookingsFromDb) => {
      if (err) {
        next (err);
        return;
      }

      PetModel.find(
        { petOwner: req.user._id },
        (err, petsFromDb) => {
          if (err) {
            next(err);
            return;
          }

          res.locals.myPets = petsFromDb;
          res.locals.myBookings = bookingsFromDb;
          res.render('booking-views/dashboard-view.ejs');
        });
    }
  );
});

//----------------BOOK APPOINTMENT-------------------
//1st step to book an appointment
router.get('/booking', (req, res, next) => {
  PetModel.find(
    { petOwner :req.user._id },
    (err, petsFromDb) => {
      if (err) {
        next(err);
        return;
      }
      res.locals.myPets = petsFromDb;
      res.render('booking-views/book-appointment-view.ejs');
    }
  );
});

//2nd step to book an appointment
router.post('/booking', (req, res, next) => {
  const theBooking = new BookingModel ({
    petsName: req.body.bookingPet,
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
//----------END OF BOOKING AN APPOINTMENT-----------

//--------------EDIT AN APPOINTMENT-----------------
//Step 1
router.get('/dashboard/bookings/:myId/edit', (req, res, next) => {
  BookingModel.findById(
    req.params.myId,             //1st arg -> the ID to find in the DB
    (err, bookingFromDb) => {   //2nd arg -> callback
      if (err) {
        //use next() to skup to the ERROR page
        next(err);
        return;
      }
      res.locals.bookingDetails = bookingFromDb;
      res.render('booking-views/edit-booking-view.ejs');
    }
  );
});

//---------END OF EDITING AN APPOINTMENT------------

//Saving a New Pet
router.post('/new-pet', (req, res, next) => {
  const thePet = new PetModel ({
    petsName: req.body.petsName,
    petsBreed: req.body.petsBreed,
    petsAge: req.body.petsAge,
    petsPicture: req.body.petsPicture,
    petOwner: req.user._id
  });

  thePet.save((err) => {
    if (err) {
      next(err);
      return;
    }

    res.redirect('/dashboard');
  });
});


module.exports = router;
