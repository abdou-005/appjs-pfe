/**
 * Created by abdo on 2016-03-26.
 */


exports.schema = new mongoose.Schema({
		object : String,
		contents : String,
		dateAdded : {type:Date, default: Date.now},
		from : String,
		to :String,
		read : Boolean
	}
)