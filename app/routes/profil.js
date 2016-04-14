var express = require('express');
var profil = require('../controllers/profil');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();


var route = express.Router();
route.use(multipartMiddleware);

route.route('/upload')
	.post(multipartMiddleware, profil.uploadAvatar);
module.exports = route;