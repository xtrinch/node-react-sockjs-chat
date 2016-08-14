var http = require('http');
var sockjs = require('sockjs');
var express = require('express');
var path = require('path');

var app = express();
var server = http.createServer(app);
var port = process.env.PORT || 8080;

buffer = [],
clients = [];

function whisper (id, message) {
if ( !clients[id] ) return;

clients[id].write( JSON.stringify(message) );
}

function broadcast (message, exclude) {
    for ( var i in clients ) {
        if ( i != exclude ) clients[i].write( JSON.stringify(message) );
    }
}

// Sockjs server
var sockjs_opts = {sockjs_url: "http://cdn.jsdelivr.net/sockjs/1.0.1/sockjs.min.js"};
var sockjs_chat = sockjs.createServer(sockjs_opts);
sockjs_chat.on('connection', function(conn) {
    clients[conn.id] = conn;

	broadcast({ type: 'newUser' }, conn.id);
	whisper(conn.id, { type: 'history', message: buffer, id: conn.id });

	conn.on('data', function onDataCB (data) {
		data = JSON.parse(data);

		if ( data.type == 'text' ) {
			if ( !data.message ) return;

			data.message = data.message.substr(0, 128);

			if ( buffer.length > 15 ) buffer.shift();
			buffer.push(data.message);

			broadcast({ type: 'message', message: data.message, id: conn.id });
		}

		// TODO: add user name
	});

	conn.on('close', function onCloseCB () {
		delete clients[conn.id];

		broadcast({ type: 'userLeft' });
	});
});

/*app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/../index.html'))
})*/
//app.use(express.static(path.resolve(__dirname, '../build')));

sockjs_chat.installHandlers(server, {prefix:'/chat'});
server.listen(port, function() {
    console.log("Listening on " + port);
})
