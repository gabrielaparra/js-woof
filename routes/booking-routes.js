const express = require('express');
const BookingModel = require('../models/booking-model.js');
const PetModel = require('../models/pet-model.js');
const router  = express.Router();
const multer = require('multer');
const myUploader = multer({
    // "dest" (destination) is a multer setting
    // that specifies WHERE to put uploaded files
  dest: __dirname + '/../public/uploads/'
    // save uploaded files inside public/uploads/
});

//---------------DISPLAY DASHBOARD------------------
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

//----------------CREATE APPOINTMENT-------------------
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
//----------END OF CREATING AN APPOINTMENT-----------


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

//Step 2
router.post('/dashboard/bookings/:myId/update', (req, res, next) => {
  BookingModel.findByIdAndUpdate(
    req.params.myId,              //1st arg -> id of document to update
    {                            //2nd arg -> object fields to update
      appointmentDate: req.body.appointmentDate,
      chosenPackage: req.body.chosenPackage,
      specialRequests: req.body.specialRequests,
    },
    (err, bookingFromDb) => {    //3rd arg -> callback
      if (err) {
        //use next() to skup to the ERROR page
        next(err);
        return;
      }
      res.redirect('/dashboard');
      //every time there's a successful post we must redirect
    }
  );
});

//---------END OF EDITING AN APPOINTMENT------------


//-------------DELETE AN APPOINTMENT----------------
// Delete from a LINK (GET)
router.get('/dashboard/bookings/:myId/delete', (req, res, next) => {
  BookingModel.findByIdAndRemove(
    req.params.myId,
    (err, bookingFromDb) => {
      if (err) {
        next(err);
        return;
      }
      res.redirect('/dashboard');
    }
  );
});

//----------END OF DELETING AN APPOINTMENT-----------


//---------------SAVING A NEW PET-------------------
//Step 1
router.get('/new-pet', (req, res, next) => {
  res.render('booking-views/new-pet-view.ejs');
});

//Step 2
router.post('/new-pet',
  // Use multer to process a SINGLE file upload from the input
  myUploader.single('petsPicture'),
        // <input name="petsPicture">
  (req, res, next) => {
  // multer will create "req.file" that contains information
  // about the upload
  const thePet = new PetModel ({
    petsName: req.body.petsName,
    petsBreed: req.body.petsBreed,
    petsAge: req.body.petsAge,
    imagerUrl: '/uploads/' + req.file.filename,
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
//----------END OF SAVING A NEW PET-----------------

//----------------DELETE A PET----------------------
// Delete from a LINK (GET)
router.get('/dashboard/pets/:myId/delete', (req, res, next) => {
  PetModel.findByIdAndRemove(
    req.params.myId,
    (err, petFromDb) => {
      if (err) {
        next(err);
        return;
      }
      res.redirect('/dashboard');
    }
  );
});

//--------------END OF DELETING A PET--------------

module.exports = router;
