const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const petSchema = new Schema(
  {
    petsName: { type: String, required: true },
    petsBreed: { type: String, required: true },
    petsAge: { type: Number, required: true },
    imagerUrl: { type: String, default: '/images/dog-icon.png' },
    //the ID of the user who owns the pet
    petOwner: { type: Schema.Types.ObjectId }
  },
  {
    timestamps: true
  }
);

const PetModel = mongoose.model('Pet', petSchema);
module.exports = PetModel;
