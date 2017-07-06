const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchema = new Schema(
  {
    petsName: { type: String },
    appointmentDate: { type: Date, required: true },
    chosenPackage: { type: String, required: true },
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
