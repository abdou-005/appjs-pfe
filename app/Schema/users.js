
var prestations = require('./prestations');
var adresses = require('./adresses');
var specialites = require('./specialites');
var documents = require('./documents');
var medias = require('./medias');
var devis = require('./devis');
var missions = require('./missions');
var avis = require('./avis');
var notifications = require('./notifications');


exports.schema= new mongoose.Schema({
			firstname:{type : String, maxlength:50},
			lastname:{type : String, maxlength:50},
			etat: {type : Boolean, default:true},
			code :{type:String},
			email :{type:String, unique:true, required:true, lowercase: true},
			password :{type:String, required:true},
			telMobil : {type:String, maxlength:10},
			telDomi : {type:String, maxlength:10},
			created_at: {type: Date, default: Date.now},
			updated_at: {type: Date, default: Date.now},
			dateDebut : {type: Date},
			typeUser : ['client','artisan','admin'],
			type:['auto entrepreneur','societe'],
			statut : ['actif', 'nonActif','banner'],
			effectif :Number,
			globalMark : Number,
			confirmer : Boolean,
			dispo : {type : Boolean, default:true},

			notifications : [notifications.schema],
			prestations : [prestations.schema],
			adresses : [adresses.schema],
			specialites : [specialites.schema],
			documents : [documents.schema],
			medias : [medias.schema],
			mediaProfil : medias.schema,
			devis : [devis.schema],
			avis : [avis.schema],
			missions : [missions.schema]
	}
)

