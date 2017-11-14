THERE IS NOT REAL TIME

![](./assets/clock.gif)

# Documentation

## GET Requests

**/getTimeDivision**
returns the current hours in a day, minutes in an hour and seconds in a minute 
{
	hrInDay: 24,
	minInHr: 60,
	secInMin: 60,
}

**/currentTime**
returns the current time based on the time division settings. The current time calculated from when the settings were set
{
	daysPassed: 4,
	curHour: 8,
	curMin: 32,
	curSec: 10
}

**/preset**
returns the values of all possible presets which can be used as a time divison
/preset/:preset
returns the values of the specified preset. Possible values are tidal, sun, freeze, random, boring, over, mars, forever, institution

## POST Requests

**/setValuesAsPreset**
Provide a string with the name of the preset to use. Possible values are tidal, sun, freeze, random, boring, over, mars, forever, institution. The time at which the settings are applied is recorded as the timeObject.changedAt value.
This route returns the new time division as confirmation.
{
	hrInDay: 24,
	minInHr: 60,
	secInMin: 60,
}

**/setLengths**
Provide ints for each time division (hour, minute, second) to set the length of each division (hours in a day, minutes in an hour, seconds in a minute).
This can also be done for each parameter individually using the following requests:
/setDayLength/:hour
/setHourLength/:minute
/setMinuteLength/:second
The time at which the settings are applied is recorded as the timeObject.changedAt value.
This route returns the new time division as confirmation.

**/setTime**
Provide ints for each value (hour, minute, second) to change the current time. This can also be done for each parameter individually using the following requests:
/setHour/:hour
/setMinute/:minute
/setSecond/:second
The time at which the settings are applied is recorded as the timeObject.changedAt value.
