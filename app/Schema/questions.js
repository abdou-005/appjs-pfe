/**
 * Created by abdo on 2016-03-25.
 */



exports.schema = new mongoose.Schema({
		contents : String,
		dateAdded : {type: Date, default: Date.now}
	}
)

