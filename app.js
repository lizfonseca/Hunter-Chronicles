// tools used
var express = require("express"); 
var bodyParser = require("body-parser");
var fs = require("fs");
var marked = require('marked');
var methodOverride = require("method-override");
var morgan = require("morgan");
var Mustache = require("mustache");
var sqlite3 = require("sqlite3");
// also needed
var db = new sqlite3.Database("./forum.db");
var app= express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('Hunter_Chronicles'));
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
// directs to the new topic form
app.get('/topics/create', function(req, res){
  console.log(req.body);
  var markedTitle = marked("'" + req.body.title + "'");
  var markedDescr = marked("'" + req.body.description + "'");
  var markedAuthor = marked("'" + req.body.author + "'");
  res.send(fs.readFileSync('./views/create_t.html', 'utf8'));
    db.run("INSERT INTO topics (Title, Description, Author, Votes) VALUES ('" + markedTitle + "', '" + markedDescr + "', '" + markedAuthor + "', 0);");
// NEED TO FIX ISSUE WHERE ENPTY FORM FIELDS GET ADDED
    db.run("DELETE FROM topics WHERE Author='undefined';");
});
// redirects user to main forum page
app.post('/topics', function(req, res){
  var template = fs.readFileSync('./views/topics.html', 'utf8');
  db.all("SELECT * FROM topics;", function(err, topics){
    var html = Mustache.render(template, {topicsList: topics});
    res.send(html);
  });
});

// runs server
app.listen(2000, function(){
  console.log("The server listens...");
});