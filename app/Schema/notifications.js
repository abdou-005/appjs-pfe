/**
 * Created by abdo on 2016-03-26.
 */

exports.schema = new mongoose.Schema({
		message : String,
		created_at: {type: Date, default: Date.now},
		updated_at: {type: Date, default: Date.now},
		seen : {type:Boolean, default :false}
	}
)
