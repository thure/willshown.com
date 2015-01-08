var serverName = 'willshown.com'
  , express = require('express')
  , vids = require('vid-streamer')
  , http = require('http')
  , path = require('path')
  , routes = require('./routes')
  , app = express();

vids.settings({
  "rootFolder": "./www/dist/",
  "rootPath": ""
});

app.set('port', process.env.PORT || 3001);

app.get(/^\/?$/, routes.index);
app.get(/\/images\/(.+)/, vids);
app.get(/\/(.+)/, routes.frontEnd);

http.createServer(app).listen(app.get('port'), function(){
  console.log(serverName + ' listening on port ' + app.get('port'));
});