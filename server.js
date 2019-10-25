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
	{'username': 'satvik', 'email': 'satvik@gmail.com', 'name': 'Satvik', 'phno': '9676727189', 'age': '25', 'id': 111},
	{'username': 'santosh', 'email': 'santosh@gmail.com', 'name': 'Santosh', 'phno': '9491979418', 'age': '25', 'id': 222},
	{'username': 'sainath', 'email': 'sainath@gmail.com', 'name': 'Sainath', 'phno': '9032590869', 'age': '25', 'id': 333},
	{'username': 'rakesh', 'email': 'rakesh@gmail.com', 'name': 'Rakesh', 'phno': '8969978020', 'age': '25', 'id': 444},
	{'username': 'venkatesh', 'email': 'venkatesh@gmail.com', 'name': 'Venkatesh', 'phno': '7842803071', 'age': '25', 'id': 555},
	{'username': 'ratnaker', 'email': 'ratnaker@gmail.com', 'name': 'Ratnaker', 'phno': '8099905149', 'age': '25', 'id': 666},
	{'username': 'sergey', 'email': 'sergey@gmail.com', 'name': 'Sergey', 'phno': '', 'age': '25', 'id': 777}
];

app.post("/login", function(req, res) {
	const payload = req.body;
	const username = payload.user;
	const email = payload.email;
	const result = users.find(function(data) {
	  return (data.username == username && data.email == email);
	});
	if (result) {
		data = {'error': null, 'data': result}
	} else {
		data = {'error': 'User not found!!!', 'data': null}
	}
	res.send(data);
});

app.post("/register", function(req, res) {
	const payload = req.body;
	data = {'error': null}
	res.send(data);
});

var messages = [
	{"name": "Venkatesh", "message": "Hello Everyone"},
	{"name": "Rakesh", "message": "Hii Venky, Hi All"},
	{"name": "Ratnaker", "message": "Hi All, Welcome to Chat Session"},
	{"name": "Satvik", "message": "Awesome!!! Lets Chat"}
];

var server = require('http').Server(app);
var io = require('socket.io')(server);

app.get('*', (req,res) => {
	res.sendFile(path.join(__dirname, 'dist/index.html'));
});

io.on('connection', (socket) => {
	socket.on('add-message', (data) => {
		messages.push({"message": data.message, "name": data.name});
    	io.emit('message', messages);
  	});

  	socket.on('update-user', (user) => {
  		users.forEach(function(data) {
  			if (data.id == user.id) {
  				data.name = user.name;
  				data.phno = user.phno;
  				data.age = user.age;
  				io.emit('profile', data);
  			}
  		})
    	io.emit('users', users);
  	});

	socket.emit('message', messages);
	socket.emit('profile', {});
	socket.emit('users', users);

	socket.on('get-profile', (id) => {
  		const result = users.find(function(data) {
		  return (data.id == id);
		});
    	io.emit('profile', result);
  	});
});

//Listen to port 1409
server.listen(port, () => {
	console.log(`Starting the server at port ${port}`);
});
