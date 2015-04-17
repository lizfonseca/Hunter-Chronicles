// tools used
var express = require("express"); 
var bodyParser = require("body-parser");
var fs = require("fs");
var methodOverride = require("method-override");
var morgan = require("morgan");
var Mustache = require("mustache");
var sqlite3 = require("sqlite3");
// also needed
var db = new sqlite3.Database("./forum.db");
var app= express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride("_method"));
app.use(morgan("dev"));
// access index page
app.get('/', function(req, res){
  res.send(fs.readFileSync('./views/index.html', 'utf8'));
});
// access main forum page
app.get('/topics', function(req, res){
  var template = fs.readFileSync('./views/topics.html', 'utf8');
  db.all("SELECT * FROM topics;", function(err, topics){
    var html = Mustache.render(template, {topicsList: topics});
    res.send(html);
  });
});
app.get('/topics/create', function(req, res){

});

app.listen(2000, function(){
  console.log("The server listens...");
});