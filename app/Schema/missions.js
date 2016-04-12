/**
 * Created by abdo on 2016-03-26.
 */

var adresses = require('./adresses');
var avis = require('./avis');
var devis = require('./devis');
exports.schema = new mongoose.Schema({
		name : String,
		desc : String,
		dateAdded : {type:Date, default: Date.now},
		startDate : {type: Date},
		endDate : {type:Date},
		state : ['waiting','inruns','finish'],

		adresse : adresses.schema,
		devis : devis.schema,
		avi : avis.schema
	}
)