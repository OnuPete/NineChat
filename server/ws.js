const app = require('./app');
const http = require('http');
const WebSocket = require('ws');
const Message = require('./model/message.js')

const chatCtrl = require('./controller/chatCtrl');

const server = http.createServer(app);
const wss = new WebSocket.Server({ server: server, clientTracking: true });
let connectList = {};
let curid = 0;

wss.on('connection', function(ws, req) {
  console.log('websocket connected');
  let id;
  let name;
  let age;
  let gender;
  let location;
  let photo;

  ws.on('close', () => {
    console.log('Client disconnected');
    delete connectList[id];

    wss.clients.forEach((client) => {
      client.send(JSON.stringify({
        event: 'userDiconnected',
        connectList,
        id
      }));
    });
  });

  ws.on('message', function(message) {
    const data = JSON.parse(message);

    // When we start connection, add user to connected list and
    // display messages
    if (data.event === 'start') {
      id = curid++;
      name = data.body.name;
      age = data.body.age;
      gender = data.body.gender;
      location = data.body.location;
      photo = data.body.photo;
      connectList[id] = {id, name, age, gender, location, photo};
      chatCtrl.getLastTen(name, (err, messages)=>{
        const wsdata = JSON.stringify({
          event: 'successfullyConnected',
          connectList,
          messages
        });
        ws.send(wsdata);
      });

      wss.clients.forEach((client) => {
        client.send(JSON.stringify({
          event: 'newUserConnected',
          connectList,
        }));
      });
    }

    if (data.event === 'sendMessage') {
      console.log('received: %s', data);
      chatCtrl.addMsg(JSON.stringify(data.message), (err, savedMsg)=>{
        Object.keys(connectList).forEach(id => {
          ws.send(JSON.stringify({
            event: 'sentNewMessage',
            messages: savedMsg
          }));
        });
      });
    }
  });
})

module.exports = server;
