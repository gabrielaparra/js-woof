const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PetModel = require('./pet-model.js');

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: [ 3, 'Name must be at least 3 characters long' ],
    //Customizing the validation error message  ^^^^^
    //minlength & maxlength for strings ONLY
    maxlength: 25
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  encryptedPassword: {
    type: String,
    required: true,
    minlength: [ 8, 'Password must be at least 8 characters long' ]
  },
  pets: [ PetModel.schema ]
  //schema of the PetModel, different from the Schema const
  //to import the user's pets
});

const UserModel = mongoose.model('User', userSchema);

//Woof is the database,
//User is the model
//users is the collection
//collection name is automatically determined by mongoose
//by turning the model name into plural

module.exports = UserModel;
