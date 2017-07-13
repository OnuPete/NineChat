const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const router = express.Router();

const chatCtrl = require('./controller/chatCtrl');

// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use(express.static(path.join(__dirname, '../build')));
app.use(express.static(path.join(__dirname, '../client')));

app.use('/', router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../index.html'));
}));
app.get('/', (req, res, next)=>{
  console.log('cookies from GET req', req.cookies);
  res.redirect('/messages');
  next();
});
app.get('/users', chatCtrl.getUser);
app.get('/messages', chatCtrl.get);

app.post('/createUser', chatCtrl.createNewUser);
app.post('/confirmUser', chatCtrl.authenticate);

app.post('/users', chatCtrl.addUser);

module.exports = app;
