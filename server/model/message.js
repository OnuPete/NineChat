const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.connect('mongodb://sidehustle:codesmith15@ds151752.mlab.com:51752/sidehustle');
mongoose.connection.once('open', () => {
  console.log('Connected with MongoDB ORM - mongodb-orm');
});

let messagesSchema = mongoose.Schema({
    src: String,
    dst: String,
    message: String,
    timestamp: { type: Date, default: Date.now }
});

messages = mongoose.model('Messages', messagesSchema)
module.exports = messages
