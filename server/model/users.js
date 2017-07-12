const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.connect('mongodb://sidehustle:codesmith15@ds151752.mlab.com:51752/sidehustle');
mongoose.connection.once('open', () => {
  console.log('Connected with MongoDB ORM - mongodb-orm');
});

let usersSchema = mongoose.Schema({
  name: String,
  password : String,
  email : String,
  age: Number,
  gender: String,
  location: String,
  profileImgLink: String
});

users = mongoose.model('Users', usersSchema)
module.exports = users
