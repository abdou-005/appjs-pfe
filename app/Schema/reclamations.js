/**
 * Created by abdo on 2016-03-26.
 */
var medias = require('./medias');

exports.schema = new mongoose.Schema({
		title : String,
		desc : String,
		created_at: {type: Date, default: Date.now},
		updated_at: {type: Date, default: Date.now},

		photo : medias.schema
	}
)