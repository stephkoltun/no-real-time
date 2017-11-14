var timeObject = require('./timeObject.js');
var presetValues = require('./presetValues.js');
var resetTime = require('./resetTime.js');


module.exports = {
    setTime: function(request, response) {
      console.log("change current time");
      console.log(request.body);

      timeObject.currentTime.hour = request.body.hour;
      timeObject.currentTime.minute = request.body.minute;
      timeObject.currentTime.hour = request.body.second;

      response.send(timeObject.currentTime);
    },

    setValuesPost: function(request, response) {
      console.log("change time passage values");
    	console.log(request.body);
    	// need to update object
    	timeObject.timeDivision.hrInDay = parseInt(request.body.hours);
    	timeObject.timeDivision.minInHr = parseInt(request.body.minutes);
    	timeObject.timeDivision.secInMin = parseInt(request.body.seconds);
    	// make the day start at 0:0:0
    	resetTime.resetTime();
    	response.send(timeObject.timeDivision);
    },

    setValuesPreset: function(request, response) {
      var preset = request.body;
      console.log(preset);
      timeObject.timeDivision.hrInDay = presetValues.tidal.hrInDay;
      timeObject.timeDivision.minInHr = presetValues.tidal.minInHr;
      timeObject.timeDivision.secInMin = presetValues.tidal.secInMin;
      resetTime.resetTime();
      response.send(timeObject.timeDivision);
    },

    setHour: function(request, response) {
      console.log("change current hour value to " + parseInt(request.params.hour));

      if (request.body > timeObject.timeDivision.hrInDay) {
        console.log("value is greater than allowed")
        timeObject.currentTime.hour = 0;
      } else {
        timeObject.currentTime.hour = parseInt(request.params.hour);
      }
      response.send(timeObject.currentTime);
    },

    setMinute: function(request, response) {
      console.log("change current minute value to " + parseInt(request.params.minute));

    	if (request.body > timeObject.timeDivision.minInHr) {
    		console.log("value is greater than allowed")
    		timeObject.currentTime.minute = 0;
    	} else {
    		timeObject.currentTime.minute = parseInt(request.params.minute);
    	}

    	response.send(timeObject.currentTime);
    },

    setSecond: function(request, response){
      console.log("change current second value to " + parseInt(request.params.seconds));
      if (request.body > timeObject.timeDivision.minInHr) {
        console.log("value is greater than allowed")
        timeObject.currentTime.second = 0;
      } else {
        timeObject.currentTime.second = parseInt(request.params.second);
      }
      response.send(timeObject.currentTime);
    },

    setDayLength: function(request, response){
      console.log("change day length to " + parseInt(request.params.hour)+ " hours");

    	timeObject.timeDivision.hrInDay = parseInt(request.params.hour);
    	resetTime.resetTime();
    	response.send(timeObject.timeDivision);
    },

    setHourLength: function(request, response){
      console.log("change hour length to " + parseInt(request.params.minute) + " minutes");

    	timeObject.timeDivision.minInHr = parseInt(request.params.minute);
    	resetTime.resetTime();

    	response.send(timeObject.timeDivision);
    },

    setMinuteLength: function(request, response){
      console.log("change minute length to " + parseInt(request.params.second) + " seconds");

      timeObject.timeDivision.secInMin = parseInt(request.params.second);
      resetTime.resetTime();

      response.send(timeObject.timeDivision);
    }

}
