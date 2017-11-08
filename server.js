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


function handleGet (request, response) {
	console.log('got a GET request');
	// the parameters of a GET request are passed in
	// request.query. Pass that to formatResponse()
	// for formatting:
	var content = formatResponse(request.query);
	console.log(content);

	// send the response:
	response.send(content);
	response.end();
}

function handlePost(request, response) {
	console.log('Got a POST request');
	// the parameters of a GET request are passed in
	// request.body. Pass that to formatResponse()
	// for formatting:
	var content = formatResponse(request.body);
	console.log(content);

	// send the response:
	response.send(content);
	response.end();
}




/* ----- TOM ABOVE --- */


// start the server:
var server = app.listen(8080, serverStart);

// gives you information
app.get('/getTimeDivision', returnTimeDivs);
app.get('/currentTime', returnCurrentTime);
app.get('/preset/:preset', getPresetValues);

// change the time increment values
app.post('/setValues', setValuesPost); 		// basic form
app.post('/setPresetFromForm', setValuesPreset); // form

app.post('/setValuesAsPreset', setValuesPreset);

app.post('/whatever', function() {console.log("hi")});

/*app.post('/setDayLength/:hour', setDayLength);
app.post('/setHourLength/:minute', setHourLength);
app.post('/setMinuteLength/:second', setMinuteLength);

// change the current time
app.post('/setHour/:hour', setHour);
app.post('/setMinute/:minute', setMinute);
app.post('/setSecond/:second', setSecond);
*/

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



function getPresetValues(request, response) {
	var preset = request.params.preset;
	if (preset == "tidal") {
		// send client back the revised time divison
		response.send(presetValues.tidal);
	}
	// do rest of presets
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


function returnTimeDivs (request, response) {
	response.send(timeObject.timeDivision);
}

function returnCurrentTime (request, response) {
	response.send(timeObject.currentTime);
}

function setDay(request, reponse) {
	console.log(request.body);

	// change
	//timeObject.timeDivision.hrInDay = hour;
	//response.send(timeObject.timeDivision); 
}

function setHour(request, reponse) {
	console.log(request.body);

	// change
	//timeObject.timeDivision.hrInDay = hour;
	//response.send(timeObject.timeDivision); 
}



function resetTime() {

	timeObject.changedAt = Date.now();

	timeObject.currentTime.curHour = 0;
	timeObject.currentTime.curMin = 0;
	timeObject.currentTime.curSec = 0;
}


