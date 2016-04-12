/**
 * Created by abdo on 2016-03-26.
 */

exports.schema = new mongoose.Schema({
		message : String,
		dateAdded : {type:Date, default: Date.now},
		seen : Boolean
	}
)
