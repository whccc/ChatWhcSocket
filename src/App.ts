const server = require('http').createServer();

const io = require('socket.io')(server, {
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
server.listen(3001);
