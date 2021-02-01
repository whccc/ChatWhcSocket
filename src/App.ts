const express = require('express');
const app = express();

const SocketIO = require('socket.io');

//setting
app.set('port', process.env.PORT || 3001);

//Middlewares
//app.disable('x-powered-by');

//Server
const server = app.listen(app.get('port'), () => {
  console.log('server en el puierto 4001', app.get('port'));
});
//Socket
const io = SocketIO(server, {
  cors: {
    origin: 'http://192.168.1.56:19006',
    methods: ['GET', 'POST']
  }
});

io.on('connection', (client) => {
  console.log(client.id);
  console.log(io.engine.clientsCount);
  //=====================================
  //ESCUCHANDO NUEVO MIEMBRO Y EMITIENDO
  //=====================================
  client.on('NewMember', (DataNewMember) => {
    client.broadcast.emit('NewMember', DataNewMember);
  });

  //=====================================
  //ESCUCHANDO NUEVO MENSAJE Y EMITIENDO
  //=====================================
  client.on('NewMessage', (DataNewMessage) => {
    console.log(DataNewMessage.strUserName);
    client.broadcast.emit('NewMessage', DataNewMessage);
  });
  //=====================================
  //ESCUCHANDO DESCONEXIÓN
  //=====================================
  client.on('disconnect', (id) => {
    console.log(client.id, id, 'me fui');
    /* … */
  });
});
console.log('Listening for the port 3000');
