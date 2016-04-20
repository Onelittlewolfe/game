var express = require('express');
var app = express();
var http = require('http').Server(app);


app.get('/', function( reg, res ) {
	
	res.sendFile(__dirname + '/index.html');
	
});




app.use("/assets", express.static(__dirname + '/assets'));
app.use("/js", express.static(__dirname + '/js'));



http.listen( 3000, function(){
	console.log('listening on *:3000');
	
});

