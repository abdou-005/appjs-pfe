/**
 * Created by abdo on 2016-03-25.
 */

var offres = require('./offres');
var medias = require('./medias');
var adresses = require('./adresses');
exports.schema = new mongoose.Schema({
		title : String,
		contents : String,
		created_at: {type: Date, default: Date.now},
		updated_at: {type: Date, default: Date.now},
		dateWork : {type: Date},
		durationWork : String,
		state : ['waiting', 'confirm'],
		type : ['emergency','normal'],

		clientId : {type: mongoose.Schema.Types.ObjectId},
		adresseDevis : adresses.schema,
		medias : [medias.schema],
		offres : [offres.schema]

	}
)
