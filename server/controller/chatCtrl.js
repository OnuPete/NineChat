const Message = require('../model/message');
// const messageSchema = require('../model/message');
const User = require('../model/users');
const bodyParser = require('body-parser');

const chatCtrl = {

  authenticate(req, res) {
    Message.findOne({name: req.params.name}, function(err, doc) {
      if (err) {
        res.json(err);
      } else {
        res.send(doc);
      }
    })
  },

  createNewUser(req, res) {
    console.log("im a new user");
    const user = req.body;
    let newUser = new User({
      name: user.name,
      password: user.password,
      email: user.email,
      age: user.age,
      gender: user.gender,
      location: user.location,
      profileImgLink: user.photo
    });

    newUser.save(function(err, doc) {
      if (err) {
        res.json(err)
      } else {
        res.json(doc);
      }
    })
  },



  addUser(req, res, next){
    let username = req.body.username ? req.body.username : "Chris"
    let user = new User({
      username: username,
      // convs: [{conv_id: Number}],
      // fList: [{username: String}]
    })
    user.save((err, savedUser)=>{
      if(err){
        console.error(err)
        res.json(err)
      } else {
        res.json(savedUser)
      }
      next()
    })
  },

  addMsg(data, callback) {
    try {
      msg = JSON.parse(data)
      msgDoc = new Message({
        src: msg.src,
        message: msg.content
      })
    } catch (err) {
      msgDoc = new Message({
        src: "Garret",
        dst: "message_not_json",
        message: data
      })
      console.log(err)
    }
    msgDoc.save((err, savedMsg)=>{
      if (err) return console.error(err)
      callback(err, savedMsg)
    })
  },

  getUser(req, res, next){
    User.find({}, (err, result)=>{
      if (err){
        res.json(err)
        console.log(err)
        next()
      } else {
        res.json(result)
        next()
      }
    })
  },

  getMsg(query, callback) {
    Message.find({}, (err, result)=>{
      return callback(err, result)
    })
  },

  getLastTen(userid, callback) {
    Message.
      find({}).
      sort({timestamp: -1}).
      limit(10).
      exec((err, result)=>{
        console.log('err', err)
        return callback(err, result)
    })
  },

  get(req, res, next){
    let query = {}
    chatCtrl.getMsg(query, (err, messages)=>{
      if (err) {
        console.error(err)
        res.status(418).send(err)
        next()
      } else{
        console.log('found:', messages)
        res.json(messages)
        next()
      }
    })
  }

};

module.exports = chatCtrl
