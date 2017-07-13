const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.connect('mongodb://rzrclient:codesmith15@ds027749.mlab.com:27749/rzrclient');
mongoose.connection.once('open', () => {
  console.log('Connected with MongoDB ORM - mongodb-orm');
});

let messagesSchema = mongoose.Schema({
    src: String,
    message: String,
    timestamp: { type: Date, default: Date.now },
});

messages = mongoose.model('Messages', messagesSchema)
module.exports = messages
