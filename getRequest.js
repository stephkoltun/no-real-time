var timeObject = require('./timeObject.js');
var presetValues = require('./presetValues.js');

module.exports = {
    returnTimeDivs: function(request, response) {response.send(timeObject.timeDivision)},

    returnCurrentTime: function(request, response) {response.send(timeObject.currentTime)},

    getAllPresets: function(request, response) {response.send(presetValues)},

    getPresetValues: function(request, response) {
      var preset = request.params.preset;
    	if (preset == "tidal") {
    		// send client back the revised time divison
    		response.send(presetValues.tidal)}
    }
}
