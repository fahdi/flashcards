// doing all the imports
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const router = require('./routes');
const pug = require('pug');


// configurations to support parsing data, parsing cookies and serving static files
var app = express();
app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static('./static'));

// including routes from the route folder
app.use(router);
// making express listen!
app.listen(3000, () => {
    console.log("Running app on localhost:3000!");
});