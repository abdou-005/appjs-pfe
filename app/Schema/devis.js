/**
 * Created by abdo on 2016-03-25.
 */

var offres = require('./offres');
var medias = require('./medias');
exports.schema = new mongoose.Schema({
		title : String,
		contents : String,
		dateAdded : {type: Date, default: Date.now},
		dateWork : {type: Date},
		durationWork : String,
		state : ['waiting', 'confirm'],
		type : ['emergency','normal'],

		medias : [medias.schema],
		offres : [offres.schema]

	}
)
