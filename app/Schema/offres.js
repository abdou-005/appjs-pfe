/**
 * Created by abdo on 2016-03-25.
 */

var questions = require('./questions');

exports.schema = new mongoose.Schema({
		title : String,
		desc : String,
		dateAdded : {type: Date, default: Date.now},

		questions : [questions.schema]
	}
)
