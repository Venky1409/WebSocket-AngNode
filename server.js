// We will declare all our dependencies here
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

//Initialize our app variable
const app = express();

//Declaring Port
const port = process.env.PORT || 1409;

//Middleware for CORS
app.use(cors());

//Middlewares for bodyparsing using both json and urlencoding
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

/*express.static is a built in middleware function to serve static files.
 We are telling express server public folder is the place to look for the static files

*/
app.use(express.static(path.join(__dirname, 'dist')));

app.get('/api', (req, res) => {
	res.send('HELLOOOO APIIII');
});

var messages = [
	{"message": "Hii Pinku"},
	{"message": "How are You"},
	{"message": "Are you doing well?"},
	{"message": "End of message"}
];

var server = require('http').Server(app);
var io = require('socket.io')(server);

app.get('*', (req,res) => {
	res.sendFile(path.join(__dirname, 'dist/index.html'));
});

io.on('connection', (socket) => {
	socket.on('add-message', (message) => {
		messages.push({"message": message});
    io.emit('message', messages);
  });

	socket.emit('message', messages);
	socket.emit('api', "Success Request");
});

//Listen to port 1409
server.listen(port, () => {
	console.log(`Starting the server at port ${port}`);
});
