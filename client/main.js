var socket = io.connect('http://192.168.0.112:6677', {'forceNew': true});

socket.on('message', function(data){
    console.log(data);
    render(data);

});

function render(data){
    var html = data.map(function(message, index){
        return (`
            <div class="message">
                <strong>${message.nickname}</strong> dice: 
                <p>${message.text}</p>
            </div>
        `);
    }).join(' ');

    var varDocument = document.getElementById('message')
    varDocument.innerHTML = html;
    varDocument.scrollTop = varDocument.scrollHeight;
}

function addMessage(e){
    var data = {
        nickname: document.getElementById('nickname').value,
        text: document.getElementById('textoMensaje').value
    }

    document.getElementById('nickname').style.display = 'none';    
    socket.emit('socketAddMensaje', data);
    return false;    
}