var express = require('express');			// include express.js
var app = express();						// a local instance of it
var bodyParser = require('body-parser');	// include body-parser

// you need a couple of parsers for the body of a POST request:
app.use(bodyParser.json()); 						  // for  application/json
app.use(bodyParser.urlencoded({extended: false})); // for application/x-www-form-urlencoded
app.use(express.static('public'));


var timeObject = {
	changedAt: 0,
	timeRequestedAt: 0,
	timeDivision: {
		hrInDay: 24,
		minInHr: 60,
		secInMin: 60,
	},
	currentTime: {
		date: new Date(),
/*		curHour: this.date.getHours(),
		curMin: this.date.getMinutes(),
		curSec: this.date.getSeconds()*/
	},
	universalSeconds: {
		secondsInAMinute: 60,
		secondsInAHour: 3600,
		secondsInADay: 86400
	}
}

var presetValues = {
	tidal: {
		hrInDay: 4,
		minInHr: 100,
		secInMin: 60,

	},
	sun: {},
	freeze: {}
}

// this runs after the server successfully starts:
function serverStart() {
  var port = server.address().port;
  console.log('Server listening on port '+ port);
}

// start the server:
var server = app.listen(8080, serverStart);

// gives you information
app.get('/getTimeDivision', returnTimeDivs);
app.get('/currentTime', returnCurrentTime);
app.get('/preset', getAllPresets);
app.get('/preset/:preset', getPresetValues);

// use forms to post
app.post('/setValues', setValuesPost); 		// basic form
app.post('/setPresetFromForm', setValuesPreset); // form

// these use CURL
// change time iincrements
app.post('/setValuesAsPreset', setValuesPreset);
// TO DO route which allows users to set all time lengths at once
app.post('/setDayLength/:hour', setDayLength);
app.post('/setHourLength/:minute', setHourLength);
app.post('/setMinuteLength/:second', setMinuteLength);

// these use CURL
// change the current time
app.post('/setHour/:hour', setHour);
app.post('/setMinute/:minute', setMinute);
app.post('/setSecond/:second', setSecond);
// TO DO route which allows users to set all time values at once
// do we deal with typing in colons and all H-M-S


/* GET ROUTES */
function returnTimeDivs (request, response) {
	response.send(timeObject.timeDivision);
}
function returnCurrentTime (request, response) {
	// do some math here
	response.send(timeObject.currentTime);
}
function getAllPresets(request, response) {
	response.sent(presetValues);
}
function getPresetValues(request, response) {
	var preset = request.params.preset;
	if (preset == "tidal") {
		// send client back the revised time divison
		response.send(presetValues.tidal);
	}
	// do rest of presets

}


/* POST ROUTES */
function setValuesPost (request, response) {
	console.log("change time passage values");
	console.log(request.body);
	
	// need to update object
	timeObject.timeDivision.hrInDay = parseInt(request.body.hours);
	timeObject.timeDivision.minInHr = parseInt(request.body.minutes);
	timeObject.timeDivision.secInMin = parseInt(request.body.seconds);

	// make the day start at 0:0:0
	resetTime();

	response.send(timeObject.timeDivision);
}

function setValuesPreset(request, response) {
	var preset = request.body;
	console.log(preset);

	timeObject.timeDivision.hrInDay = presetValues.tidal.hrInDay;
	timeObject.timeDivision.minInHr = presetValues.tidal.minInHr;
	timeObject.timeDivision.secInMin = presetValues.tidal.secInMin;

	resetTime();

	response.send(timeObject.timeDivision);
}


function setHour(request, reponse) {
	console.log("change current hour value to " + request.body);
	
	if (request.body > timeObject.timeDivision.hrInDay) {
		console.log("value is greater than allowed")
		timeObject.currentTime.hour = 0;
	} else {
		timeObject.currentTime.hour = request.body;
	}

	response.send(timeObject.currentTime);
}

function setMinute(request, reponse) {
	console.log("change current minute value to " + request.body);
	
	if (request.body > timeObject.timeDivision.minInHr) {
		console.log("value is greater than allowed")
		timeObject.currentTime.minute = 0;
	} else {
		timeObject.currentTime.minute = request.body;
	}
	
	response.send(timeObject.currentTime);
}

function setSecond(request, reponse) {
	console.log("change current second value to " + request.body);
	
	if (request.body > timeObject.timeDivision.minInHr) {
		console.log("value is greater than allowed")
		timeObject.currentTime.second = 0;
	} else {
		timeObject.currentTime.second = request.body;
	}
	
	response.send(timeObject.currentTime);
}


function setDayLength(request, response) {
	console.log("change day length to " + request.body + " hours");
	
	timeObject.timeDivision.hrInDay = request.body;
	resetTime();

	response.send(timeObject.timeDivision);
}

function setHourLength(request, response) {
	console.log("change hour length to " + request.body + " minutes");
	
	timeObject.timeDivision.minInHr = request.body;
	resetTime();

	response.send(timeObject.timeDivision);
}

function setMinuteLength(request, response) {
	console.log("change minute length to " + request.body + " seconds");
	
	timeObject.timeDivision.secInMin = request.body;
	resetTime();

	response.send(timeObject.timeDivision);
}

function resetTime() {
	timeObject.changedAt = Date.now();
	timeObject.currentTime.curHour = 0;
	timeObject.currentTime.curMin = 0;
	timeObject.currentTime.curSec = 0;
}


