var timeObject = {
	changedAt: 0,
	timeRequestedAt: 0,
	timeDivision: {
		hrInDay: 24,
		minInHr: 60,
		secInMin: 60,
	},
	currentTime: {
		daysPassed: 0,
		curHour: 0,
		curMin: 0,
		curSec: 0
	},
	universalSeconds: {
		secondsInAMinute: 60,
		secondsInAHour: 3600,
		secondsInADay: 86400
	}
}


module.exports = timeObject
