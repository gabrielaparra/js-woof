const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  fullName: {
    type: String,
    required: true,
    minlength: [ 3, 'Name must be at least 3 characters long' ],
    //Customizing the validation error message  ^^^^^
    //minlength & maxlength for strings ONLY
    maxlength: 25
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: { type: String },
  encryptedPassword: {
    type: String,
    required: true,
    minlength: [ 8, 'Password must be at least 8 characters long' ]
  },
  imageUrl: { type: String, default: '/images/user-icon.png' }
});

const UserModel = mongoose.model('User', userSchema);

//Woof is the database,
//User is the model
//users is the collection
//collection name is automatically determined by mongoose
//by turning the model name into plural

module.exports = UserModel;
