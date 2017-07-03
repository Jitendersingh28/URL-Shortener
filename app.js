
var express = require('express');
var app = express();
var path = require('path');

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var urlSchema = new Schema({
  _id: {type: Number, index: true},
  long_url: String,
  short_url: String
});

var Url = mongoose.model('Url', urlSchema);

module.exports = Url;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
  
  res.send(views/index.html);
});

app.post('/api/shorten', function(req, res){
  var longUrl = req.body.url;
  var shortUrl = '';

  Url.findOne({long_url: longUrl}, function (err, doc){
    if (doc){
    	tempfunctions();
      shortUrl = config.webhost + id;

      res.send({'shortUrl': shortUrl});
    } else {
      var newUrl = Url({
        long_url: longUrl
      });
      newUrl.save(function(err) {
        if (err){
          console.log(err);
        }
         tempfunctions();
        shortUrl = config.webhost + id;

        res.send({'shortUrl': shortUrl});
      });
    }

  });

});

var server = app.listen(3000, function(){
  console.log('Server listening on port 3000');
});