var express = require("express");
var app     = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var config = require("./config");
var shortalgo = require("./shortalgo");
var url = mongoose.connect('mongodb://localhost/urls', {
  useMongoClient: true,
});
mongoose.Promise = global.Promise;


app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");

var urlSchema = new mongoose.Schema({
  id:Number,
  longurl: String,
  shorturl:String
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
console.log(longurl)
var shorturl="";
url.findOne({longurl:longurl},function(err,doc){
if(!err){	
	if(doc){
		shorturl=config.webhost+(doc.id);
		res.send({'shorturl':shorturl});
	}
	else{
		 var ranID = shortalgo.getRandomCode()  
		var newUrl=url({
			longurl:longurl,
            id : ranID,
            shorturl:shortalgo.encode(ranID)
		});
		newUrl.save(function(err){
			if(err){
				console.log(err);
			}
			shorturl=config.webhost+(newUrl.shorturl);
			res.render({'shorturl':shorturl});
		});
	}
}
else{
	console.log(err);
}
});
});

app.get("/shorturl", function(req, res){
	url.findOne({longurl:longurl},function(err,doc){
		if(err){
			res.redirect("/");
		}
		else{
			res.render("result.ejs", { shorturl : JSON.stringify(shorturl) });
		}
	})

});

app.listen(3000, function(){
  console.log('Server listening on port 3000');
});
