var express = require('express');
var emails = require('./routes/emails');
var path  = require('path');

var app = express();

app.get('/emails', emails.fetchAll);


app.use(express.static('frontend'));


app.listen(3000);
console.log('Listening on port 3000...');
