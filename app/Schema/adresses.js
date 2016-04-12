/**
 * Created by abdo on 2016-03-09.
 */
exports.schema = new mongoose.Schema({
		lieu : String,
		dep : String,
		region : String,
		pos : {lat:String, lng:String},
		codePostal : String,
		InterventionArea : Number
	}
)