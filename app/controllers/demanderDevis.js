var fs = require('fs-extra');
var path = require('path');

exports.index = function (req, res) {
	var returnResponse = function(devis){
		res.json(devis);
	};
	models.Devis.find({}).execAsync()
		.then(logLib.logContent)
		.then(returnResponse)
	;
};
exports.one = function(req,res){
	var options = {_id:req.params.id};
	var returnResponse = function(obj){
		res.json(obj);
	};
	models.Devis.findOneAsync(options)
		.then(logLib.logContent)
		.then(returnResponse)
	;

};
exports.create = function(req,res){
	var file = req.files.file;
	var returnResponse = function(obj){
		res.json(obj);
	};

	var returnError = function(){
		res.status(500).json({message : 'Problem'});
	};
	
	var devis = new models.Devis(req.body);
	models.Devis(devis).saveAsync()
		.catch(logLib.throwError)
		.then(logLib.logContent)
		.done(returnResponse,returnError);

	var uploadDate = new Date();
    var tempPath = file.path;
    var targetPath = path.join(__dirname, "../../public/ressources/images/users/imgDevis/devis" + uploadDate+ "/"+file.name);
    
    var savePath = "ressources/images/users/imgDevis/devis" + uploadDate+ "/"+file.name;
    fs.rename(tempPath, targetPath, function (err){
        if (err){
            console.log(err)
        } else {
            
           console.log('img saved')
        }
    });

};


exports.update = function(req,res){
	var returnResponse = function(obj){
		res.json(obj);
	};
	var options = {_id: req.body._id};
	//var offre = new models.Offre(req.body);
	var returnUpdateObject = function(){
		models.Devis.findOneAsync(options)
			.then(logLib.logContent)
			.then(returnResponse)
		;
	};
	delete req.body._id;
	models.Devis.findOneAndUpdateAsync(options, req.body)
		.then(returnUpdateObject)
	;
};
exports.delete = function(req,res){
	var returnResponse = function(){
		res.json({message : 'All is fine'});
	};
	var returnError = function(){
		res.status(500).json({message : 'Problem'});
	};
	var options = {_id:req.params.id};
	models.Devis.findOneAndRemoveAsync(options)
		.catch(logLib.throwError)
		.done(returnResponse,returnError)
	;

};


