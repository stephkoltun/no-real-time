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


module.exports = timeObject
