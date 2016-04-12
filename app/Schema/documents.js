/**
 * Created by abdo on 2016-03-10.
 */
exports.schema = new mongoose.Schema({
		name : String,
		desc : String,
		type:String,
		urlDoc : String,
		format : String,
		etat : ['inRuns','confirm']
	}
)