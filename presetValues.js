var presetValues = {
	tidal: {
		hrInDay: 4,
		minInHr: 60,
		secInMin: 60,
	},
	sun: {
    hrInDay: 7,
    minInHr: 60,
    secInMin: 60,
  },
	freeze: {
    hrInDay: 0,
    minInHr: 0,
    secInMin: 0,
  },
  random: {
    hrInDay: parseInt(Math.random(1,100)),
    minInHr: parseInt(Math.random(1,100)),
    secInMin: parseInt(Math.random(1,100)),
  },
  boring: {
    hrInDay: 24,
    minInHr: 60,
    secInMin: 60,
  },
  over: {
    hrInDay: 1,
    minInHr: 1,
    secInMin: 1,
  },
  mars: {
    hrInDay: 24,
    minInHr: 37,
    secInMin: 23,
  },
  forever: {
    hrInDay: 100,
    minInHr: 1000,
    secInMin: 1000,
  },
  institution: {
    hrInDay: 24,
    minInHr: 60,
    secInMin: 60,
  }
}

module.exports = presetValues
