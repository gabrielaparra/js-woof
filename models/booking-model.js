const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchema = new Schema(
  {
    petID: { type: Schema.Types.ObjectId },
    appointmentDate: { type: Date },
    chosenPackage: { type: String },
    specialRequests: { type: String },
    //the ID of the user who owns the room
    petOwner: { type: Schema.Types.ObjectId }
  },
  {
    timestamps: true
  }
);

const BookingModel = mongoose.model('Booking', bookingSchema);
module.exports = BookingModel;
