var path = require('path');

exports.index = function(req, res, next){
  return res.sendFile(path.join(__dirname, './www/prod/index.html'));
};

exports.frontEnd = function(req, res, next){
  return res.sendFile(path.join(__dirname, './www/prod/' + req.params[0]))
};