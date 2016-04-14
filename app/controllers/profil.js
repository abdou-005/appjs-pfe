//var multer = require('multer');

var fs = require('fs-extra');
var path = require('path');

exports.uploadAvatar = function (req, res){
    var file = req.files.file;
    var userEmail = req.body.userEmail;
    var userId = req.body.userId;
    console.log(userId);
    console.log("User " + userEmail + " is submitting " , file.name);
    var uploadDate = new Date();
    var tempPath = file.path;
    //var targetPath = path.join(__dirname, "../../uploads/users/imgProfil/" + userEmail+ "/"+file.name);
    var targetPath = path.join(__dirname, "../../public/ressources/images/users/imgProfil/" + userEmail+ "/"+file.name);
    
    var savePath = "/ressources/images/users/imgProfil/" + userEmail+ "/"+file.name;
    fs.rename(tempPath, targetPath, function (err){
        if (err){
            console.log(err)
        } else {
            
            models.User.findById(userId, function(err, userData){
                var user = userData;
                var medias = new models.Media();;
                medias.urlMedia = savePath;
                medias.name = file.name;
                user.medias.push(medias);
                user.save(function(err, doc){
                    if (err){
                        console.log("failed save")
                        res.json({status: 500})
                    } else {
                        console.log("save successful");
                        
                        res.json(doc)
                    }
                })
            })
        }
    });
};


