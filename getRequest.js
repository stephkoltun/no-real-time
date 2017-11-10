var timeObject = require('./timeObject.js');
var presetValues = require('./presetValues.js');

module.exports = {
    returnTimeDivs: function(request, response) {response.send(timeObject.timeDivision)},

    returnCurrentTime: function(request, response) {
    	// compare timeChagedAt to Date.now() at request
    	// that gives the duration since the time has been changed
    	var now = Math.round(Date.now()/1000)
    	var duration = (now - timeObject.changedAt);	//seconds that the crazy time has been running
    	
    	// in our crazy time, how many real life seconds are in each part
    	var secondsInMin = timeObject.timeDivision.secInMin;
    	var secondsInHour = timeObject.timeDivision.secInMin * timeObject.timeDivision.minInHr;
    	var secondsInDay = secondsInHour * timeObject.timeDivision.hrInDay;

    	// divide duration in hours, mins, seconds
    	var hoursPassed = Math.floor(duration/secondsInHour);
    	var remainMins = Math.floor((duration-hoursPassed*secondsInHour)/secondsInMin);
    	var remainSeconds = duration - hoursPassed*secondsInHour - remainMins*secondsInMin;

    	var daysPassed = hoursPassed/timeObject.timeDivision.hrInDay;
    	var hrvalue;

    	if (hoursPassed >= timeObject.timeDivision.hrInDay) {
    		hrvalue = hoursPassed - (daysPassed*timeObject.timeDivision.hrInDay);
    	} else {
    		hrvalue = hoursPassed;
    	}
    	

    	timeObject.currentTime.daysPassed = daysPassed;
    	timeObject.currentTime.curHour = hrvalue;
    	timeObject.currentTime.curMin = remainMins;
    	timeObject.currentTime.curSec = remainSeconds;

    	response.send(timeObject.currentTime)
    },

    getAllPresets: function(request, response) {response.send(presetValues)},

    getPresetValues: function(request, response) {
      var preset = request.params.preset;
    	if (preset == "tidal") {
    		// send client back the revised time divison
    		response.send(presetValues.tidal)}
    }
}
