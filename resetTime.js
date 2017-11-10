var timeObject = require('./timeObject.js');

exports.resetTime = function resetTime() {
	timeObject.changedAt = Math.round(Date.now()/1000);
	timeObject.currentTime.curHour = 0;
	timeObject.currentTime.curMin = 0;
	timeObject.currentTime.curSec = 0;
}
