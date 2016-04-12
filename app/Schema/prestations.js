/**
 * Created by abdo on 2016-03-09.
 */
exports.schema = new mongoose.Schema({
		serviceName:{type : String, maxlength:50},
		desc:String,
		remise:String,
		prix:{type : String, maxlength:50}
	}
)
