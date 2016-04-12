/**
 * Created by abdo on 2016-03-26.
 */

exports.schema = new mongoose.Schema({
		desc : String,
		dateAdded : {type: Date, default: Date.now},
		state : ['Waiting', 'Confirm'],
		noteQualityServ : Number,
		notePriceServ : Number,
		noteRespectPeriod : Number,
		noteContact : Number,
		noteGlobal : Number
	}
)