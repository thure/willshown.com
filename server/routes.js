var path = require('path');

exports.index = function(req, res, next){
  return res.sendFile(path.join(__dirname, '../dist/index.html'));
};

exports.frontEnd = function(req, res, next){
  return res.sendFile(path.join(__dirname, '../dist/' + req.params[0]))
};