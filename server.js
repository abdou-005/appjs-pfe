//== modules =================================================
var express = require('express');
var methodOverride = require('method-override');
var favicon = require('serve-favicon');
var logger = require('morgan');
jwt =  require('jsonwebtoken');
passport = require('passport');
//var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
Promise = require('bluebird'); // lib for callback
mongoose = Promise.promisifyAll(require('mongoose')); //add bluebird to  Mongo support
logLib = require('./lib/log');
app = express();


var server = require('http').Server(app);
var io = require('socket.io')(server);


//== configuration ===========================================
var port = process.env.PORT || 3000; // set our port
config = require('./config/main');// config files
mongoose.connect(config.url);// connect to our mongoDB database

// Initialize Passport
require('./config/passport')(passport);

app.set('superSecret', config.secret); // secret variable

//== Initialize models =======================================
models = require('./app/Models');
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

// get all data/stuff of the body (POST) parameters
app.use(logger('dev'));
/*app.use(session({
 secret: 'PFE secret'
 //cookie: { expires : new Date(Date.now() + 60000) }

 }));*/
app.use(express.static(__dirname + '/public'));                 // sets the static files location to public
//app.use('/bower_components',  express.static(__dirname + '/bower_components'));
app.use(cookieParser());
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride('X-HTTP-Method-Override'));

// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
// set the static files location /public/img will be /img for users
//app.use(passport.initialize());
//app.use(passport.session());

// =======================
// routes ================
// =======================
// basic route------------------------
//require('./app/routes/autentificationspassport')(passport);
require('./app/routes/avis');
require('./app/routes/demanderDevis');
require('./app/routes/offres');
// require var ROUTES -------------------
var authenticatejwt = require('./app/routes/authenticationjwt');
var usersRoute = require('./app/routes/users');
var domainesRoute = require('./app/routes/domaines');
var demandeDevis = require('./app/routes/demanderDevis');

// apply the routes to our application with the prefix
app.use('/auth', authenticatejwt);
app.use('/users', usersRoute);
app.use('/domaines', domainesRoute);
app.use('/devis',demandeDevis);
/// test Schema
/*
var devi = new models.Devi({
	title : 'title1',
	state : 'waiting'
});
console.log(devi);
*/

// =======================
// socket ======
// =======================

io.on('connection', function (socket) {
	console.log('user has connected');
	var i=0;
	setInterval(function(){
		socket.emit('message',{
			message : i
		});
		i++;
	},1000);
	socket.on('new-client',function(userClient){
		console.log(userClient,'entre dans le devis express');
		socket.userClient = userClient;
		socket.broadcast.emit('new-client',userClient);
	});

	socket.on('new-devis',function(newDevis){
		console.log(newDevis.service.name);
		socket.broadcast.emit('new-devis',newDevis);
	});

	socket.on('disconnect',function(){
		console.log('user has disconnected');
		socket.broadcast.emit('client-deco',socket.userClient);
	});
});
// =======================
// start the server ======
// =======================
server.listen(port,function(){
	console.log('server listen on PORT = ',port);
});


