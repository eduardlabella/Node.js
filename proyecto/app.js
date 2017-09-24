var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

mongoose.connect("mongodb://localhost/fotos",{
  useMongoClient: true,

});


var useSchemaJSON = {
  email:String,
  password:String
};


var user_schema = new Schema(useSchemaJSON);

var User = mongoose.model("User",user_schema);

app.use("/public",express.static('public'));
app.use(bodyParser.json()); //peticiones application/json
app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "jade");

app.get("/",function(req,res){
  res.render("index");
});

app.get("/login",function(req,res){
  res.render("login");
});

app.post("/users",function(req,res){
  var user = new User({email: req.body.email, password: req.body.password});
  user.save(function(){
      res.send("Guardamos tus datos");
  });
});
app.listen(8080);
