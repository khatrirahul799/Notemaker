const express = require('express');
const path = require('path');
var mongoose = require("mongoose");
const fs = require('fs');
const bodyparser = require('body-parser');
const session = require('express-session');
const mongoDbStore = require('connect-mongodb-session')(session);
const csrf = require('csurf');






// routes path
const notebook = require('./routes/notebook');
const notes = require('./routes/notes');
const home = require('./routes/home');
const login = require('./routes/login');
const signup = require('./routes/signup');
const homepage = require('./routes/homepage');
const reset = require('./routes/reset');

const url = "mongodb+srv://Charles:ygelnee5E1quPkJx@cluster0-zpmhg.mongodb.net/noteproj?retryWrites=true&w=majority";
const csrfProtection = csrf();



const rootDir = require('./path/path');
const app = express();
const store = new mongoDbStore({
  uri: url,
  collection: 'sessions'
})
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyparser.urlencoded({
  extended: false
}));
app.use(bodyparser.json());
app.use(session({
  secret: 'this is a secret',
  resave: false,
  saveUninitialized: false,
  store: store,
  cookie: {
    maxAge: 30 * 60 * 10000
  }
}));
app.use(csrfProtection);


mongoose.connect(url, {
  useUnifiedTopology: true
});
const db = mongoose.connection;
const collection = db.collection('notes');
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('connection established..!!');
});

// routes
app.use(login);
app.use(signup);
app.use(home);
app.use(notebook);
app.use(notes);
app.use(homepage);
app.use(reset);

app.listen(3000, 'localhost', () => {
  console.log('server connected');
});