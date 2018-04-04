const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const routes = require("./routes");
const passport = require('./passport');
const session = require('express-session');
const router = require('./auth');
const MongoStore = require('connect-mongo')(session);
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3001;

// if (process.env.NODE_ENV === "production") { // this line identifies if we're in the production version of the app
app.use(express.static("client/build"));
// } else {
// app.use(express.static("public"));
// }
// app.use(express.static("client/build"));

// mongoose.connect("mongodb://heroku_1zh96hjn:8ein2g5l10u4ctrrhlj7euo0kh@ds127129.mlab.com:27129/heroku_1zh96hjn")
// Configure body parser for AJAX requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
	console.log(req.path);
	next();
})

// Add routes, both API and view
app.use(routes);

// Set up promises with mongoose
// mongoose.Promise = global.Promise;
// // Connect to the Mongo DB
// mongoose.connect(
//   process.env.MONGODB_URI || "mongodb://localhost/ColoradoPours",
//   {
//     useMongoClient: true
//   }
// );

// added this from my file. (MAX) ===============
mongoose.Promise = global.Promise
let MONGO_URL
// const MONGO_LOCAL_URL = 'mongodb://localhost/ColoradoPours'

// if (process.env.MONGODB_URI) {
// 	mongoose.connect(process.env.MONGODB_URI)
// 	MONGO_URL = process.env.MONGODB_URI
// } else {
	// heroku_1zh96hjn - username
	// 8ein2g5l10u4ctrrhlj7euo0kh - password
	// ds127129.mlab.com - host
	// 27129 - port
	// heroku_1zh96hjn - database
	mongoose.connect("mongodb://heroku_1zh96hjn:8ein2g5l10u4ctrrhlj7euo0kh@ds127129.mlab.com:27129/heroku_1zh96hjn"); // local mongo url
	var dbConnection = mongoose.connection
	// MONGO_URL = MONGO_LOCAL_URL
// }
// (MAX) ========================================
app.use(
	session({
		secret: process.env.APP_SECRET || 'this is the default passphrase',
		store: new MongoStore({ mongooseConnection: dbConnection }),
		resave: false,
		saveUninitialized: false
	})
)

// ===== Passport ====


app.use(passport.initialize())
app.use(passport.session()) // will call the deserializeUser
app.use('/auth', require('./auth'))


// ========= HEROKU BUILD =========

// If no API routes are hit, send the React app
app.use(function(req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"))
});


// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
