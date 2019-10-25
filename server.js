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

var users = [
	{'username': 'admin1', 'email': 'admin1@gmail.com', 'name': 'Admin1', 'phno': '00001', 'age': '25', 'id': 111},
	{'username': 'admin2', 'email': 'admin2@gmail.com', 'name': 'Admin2', 'phno': '00002', 'age': '25', 'id': 222},
	{'username': 'admin3', 'email': 'admin3@gmail.com', 'name': 'Admin3', 'phno': '00003', 'age': '25', 'id': 333},
	{'username': 'admin4', 'email': 'admin4@gmail.com', 'name': 'Admin4', 'phno': '00004', 'age': '25', 'id': 444},
	{'username': 'admin5', 'email': 'admin5@gmail.com', 'name': 'Admin5', 'phno': '00005', 'age': '25', 'id': 555}
];

app.post("/login", function(req, res) {
	const payload = req.body;
	const username = payload.user;
	const email = payload.email;
	const result = users.find(function(data) {
	  return (data.username == username && data.email == email);
	});
	if (result) {
		data = {'error': null}
	} else {
		data = {'error': 'User not found!!!'}
	}
	res.send(data);
});

app.post("/register", function(req, res) {
	const payload = req.body;
	data = {'error': null}
	res.send(data);
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

  	socket.on('update-user', (user) => {
  		users.forEach(function(data) {
  			if (data.id == user.id) {
  				data.name = user.name;
  				data.phno = user.phno;
  				data.age = user.age;
  			}
  		})
    	io.emit('users', users);
  	});

	socket.emit('message', messages);
	socket.emit('users', users);
});

//Listen to port 1409
server.listen(port, () => {
	console.log(`Starting the server at port ${port}`);
});
