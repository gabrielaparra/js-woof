const express = require('express');
const BookingModel = require('../models/booking-model.js');
const PetModel = require('../models/pet-model.js');
const router  = express.Router();

//Displaying User's Dashboard
router.get('/dashboard', (req, res, next) => {
  PetModel.find(
    { petOwner :req.user._id },
    (err, petsFromDb) => {
      if (err) {
        next(err);
        return;
      }
      res.locals.myPets = petsFromDb;
      res.render('booking-views/dashboard-view.ejs');
    }
  );

});

// router.get('/dashboard', (req, res, next) => {
//   BookingModel.find(
//     { petOwner: req.user._id },
//     (err, bookingsFromDb) => {
//       if (err) {
//         next (err);
//         return;
//       }
//       res.locals.myBookings = bookingsFromDb;
//       res.render('booking-views/dashboard-view.ejs');
//     }
//   );
// });

//Saving booking appointment
router.post('/booking', (req, res, next) => {
  console.log(req.body.specialRequests);
  const theBooking = new BookingModel ({
    petID: req.body.bookingPet,
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

//Saving a New Pet
router.post('/new-pet', (req, res, next) => {
  console.log("AHHHHHHHHHHHHH");
  const thePet = new PetModel ({
    petsName: req.body.petsName,
    petsBreed: req.body.petsBreed,
    petsAge: req.body.petsAge,
    petsPicture: req.body.petsPicture,
    petOwner: req.user._id
  });

console.log(thePet);

  thePet.save((err) => {
    if (err) {
      console.log("THAT DIDN'T WORK");
      next(err);
      return;
    }

    res.redirect('/dashboard');
  });
});


module.exports = router;
