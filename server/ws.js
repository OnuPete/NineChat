const app = require('./app');
const http = require('http');
const WebSocket = require('ws');
const Message = require('./model/message.js')

const chatCtrl = require('./controller/chatCtrl');

const server = http.createServer(app);
const wss = new WebSocket.Server({ server: server, clientTracking: true });
let connectList = {};

wss.on('connection', function(ws, req) {
  console.log('websocket connected');
  ws.on('message', function(message) {
    const data = JSON.parse(message);
    console.log('in message', data);
  })
})

// const sendToAll = data => {
//   Object.keys(connectList).forEach(id =>{
//     connectList[id].ws.send(data)
//   })
// }
//
// const findConnections = username =>{
//   for (key in connectList) {
//     if (connectList.key.username === username){
//       return connectList.key.ws
//     }
//   }
//   return undefined
// }
//
// wss.on('connection', function connection(ws, req) {
//   console.log('websocket connected')
//   let id = Object.keys(connectList).length
//   let username = req.headers.username ? req.headers.username : "Garret"
//   connectList[id] = {id: id, ws: ws, username: username}
//
//   chatCtrl.getLastTen(username, (err, messages)=>{
//     ws.send(JSON.stringify(messages))
//   })
//   ws.on('message', function incoming(data) {
//     console.log('received: %s', data);
//     chatCtrl.addMsg(data, (err, savedMsg)=>{
//       sendToAll(JSON.stringify(savedMsg))
//     })
//   });
//   ws.on('close', ()=>{
//     delete connectList[id]
//     console.log('closed %s', id)
//   })
// });
//
//

module.exports = server;
