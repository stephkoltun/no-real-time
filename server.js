var express = require('express');			// include express.js
var app = express();						// a local instance of it
var bodyParser = require('body-parser');	// include body-parser
var getRequest = require('./getRequest.js');
var postRequest = require('./postRequest.js');

// you need a couple of parsers for the body of a POST request:
app.use(bodyParser.json()); 						  // for  application/json
app.use(bodyParser.urlencoded({extended: false})); // for application/x-www-form-urlencoded
app.use(express.static('public'));


// gives you information
app.get('/getTimeDivision', getRequest.returnTimeDivs);
app.get('/currentTime', getRequest.returnCurrentTime);
app.get('/preset', getRequest.getAllPresets);
app.get('/preset/:preset', getRequest.getPresetValues);

// these use CURL
// change time iincrements
app.post('/setValuesAsPreset', postRequest.setValuesPreset);
// TO DO route which allows users to set all time lengths at once
app.post('/setLengths', postRequest.setValuesPost); 		// set all time lengths at once
app.post('/setDayLength/:hour', postRequest.setDayLength);
app.post('/setHourLength/:minute', postRequest.setHourLength);
app.post('/setMinuteLength/:second', postRequest.setMinuteLength);

// these use CURL
// change the current time
app.post('/setTime', postRequest.setTime);
app.post('/setHour/:hour', postRequest.setHour);
app.post('/setMinute/:minute', postRequest.setMinute);
app.post('/setSecond/:second', postRequest.setSecond);
// TO DO route which allows users to set all time values at once
// do we deal with typing in colons and all H-M-S

// this runs after the server successfully starts:
function serverStart() {
  var port = server.address().port;
  console.log('Server listening on port '+ port);
}

// start the server:
var server = app.listen(8080, serverStart);
