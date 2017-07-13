var express = require("express");
var app     = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var config = require("./config");
var shortalgo = require("./shortalgo");
var url = mongoose.connect('mongodb://localhost/urls', {
  useMongoClient: true,
});



app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");

var urlSchema = new mongoose.Schema({
  id:Number,
  longurl: String
});

var url =mongoose.model("url",urlSchema);
mongoose.connect('mongodb://' + config.db.host + '/' + config.db.name,{
  useMongoClient: true,
  /* other options */
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//routes
app.get("/",function(req,res){
	res.render("home");
});

app.post("/shorturl",function(req,res){
var longurl=req.body.longurl;
var shorturl="";
url.findOne({longurl:longurl},function(err,doc){
	if(doc){
		shorturl=config.webhost+(doc.id);
		res.send({'shorturl':shorturl});
	}
	else{
		var newUrl=url({
			longurl:longurl
		});
		newUrl.save(function(err){
			if(err){
				console.log(err);
			}
			shorturl=config.webhost+(shortalgo.getRandomcode());
			res.send({'shorturl':shorturl});
		});
	}
});
});

app.get('/:encoded_id', function(req, res){

  var id = shortalgo.getRandomcode(id);

  // check if url already exists in database
  Url.findOne({_id: id}, function (err, doc){
    if (doc) {
      res.redirect(doc.long_url);
    } else {
      res.redirect(config.webhost);
    }
  });

});




app.listen(3000, function(){
  console.log('Server listening on port 3000');
});