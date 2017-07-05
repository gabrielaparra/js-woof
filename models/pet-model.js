const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const petSchema = new Schema(
  {
    petsName: { type: String },
    petsBreed: { type: String },
    petsAge: { type: String },
    petsPicture: { type: String },
    //the ID of the user who owns the pet
    petOwner: { type: Schema.Types.ObjectId }
  },
  {
    timestamps: true
  }
);

const PetModel = mongoose.model('Pet', petSchema);
module.exports = PetModel;
