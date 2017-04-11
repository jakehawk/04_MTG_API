var express 		= require('express'),
		app 				= express(),
		path				= require('path'),
		// cors 				= require('cors'),
		logger 			= require('morgan'),
		mongoose 		= require('mongoose'),
		bodyParser 	= require('body-parser');

var db = process.env.MONGODB_URI || 'mongodb://localhost/mtg-stuff-1';
mongoose.connect(db);

var routes = require('./config/routes');

// app.use(cors());

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(routes);

app.use(addFailedAuthHeader);

var port = process.env.PORT || 3000;

app.listen(port, 
	()=> console.log(`Live on port ${port}`)
);

function validateContentType (req, res, next) {
	var methods = ['PUT', 'PATCH', 'POST'];
	if (
		methods.indexOf(req.method) !== -1 &&
		Object.keys(req.body).length !== 0 &&
		!req.is('json')
	) {
		var message = 'Content-Type header must be application/json.';
		res.status(400).json(message);
	} else {
		next();
	}
}

// When there is a 401 Unauthorized, the response shall include a header
// WWW-Authenticate that tells the client how they must 
// authenticate their requests
function addFailedAuthHeader (err, req, res, next) {
	var header = {'WWW-Authenticate': 'Bearer'};
	if (err.status === 401) {
		if (err.realm) header['WWW-Authenticate'] += ` realm="${err.realm}"`;
		res.set(header);
	}
	next(err);
}