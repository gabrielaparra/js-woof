const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchema = new Schema(
  {
    petsName: { type: String },
    petsBreed: { type: String },
    appointmentDate: { type: Date },
    chosenPackage: { type: String },
    specialRequests: { type: String },
    //the ID of the user who owns the room
    petOwner: [ Schema.Types.ObjectId ]
  },
  {
    timestamps: true
  }
);

const BookingModel = mongoose.model('Booking', bookingSchema);
module.exports = BookingModel;
