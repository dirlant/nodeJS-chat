var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

app.use(express.static('client'));

app.get('/hola-mundo', function (req, res) {

    res.status(200).send('Hola mundo desde ruta');
})

var messages = [{
    id: 1,
    text: 'Bienvenido al chat de Diego Carciente',
    nickname: 'Bot - Diego Carciente',
}];




io.on('connection', function(socket){
    console.log('El cliente con IP: '+ socket.handshake.address +' se ha conectado...');

    socket.emit('message', messages);

    socket.on('socketAddMensaje', function(data){
        messages.push(data);

        io.sockets.emit('message', messages);
    })
})

server.listen(6677, function(){
    console.log('Servidor utilizando puerto 6677')
})