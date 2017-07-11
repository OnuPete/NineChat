const app = require('./app');
const server = require('./ws');


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


port = process.env.PORT || 3000;

app.set('port', port);

// app.listen(port)
server.listen(port, () =>{
  console.log('server port: ', port)
})
