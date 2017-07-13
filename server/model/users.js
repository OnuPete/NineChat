const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.connect('mongodb://rzrclient:codesmith15@ds027749.mlab.com:27749/rzrclient');
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
