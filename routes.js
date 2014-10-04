var path = require('path');

exports.index = function(req, res, next){
  return res.sendFile(path.join(__dirname, './www/prod/index.html'));
};

exports.frontEnd = function(req, res, next){
  if(/\.min\.(css|js)/.test(req.params[0]) || /fonts/.test(req.params[0])){
    return res.sendFile(path.join(__dirname, './www/prod/' + req.params[0]))
  }else{
    return res.sendFile(path.join(__dirname, './www/dist/' + req.params[0]))
  }
};