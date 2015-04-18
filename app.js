// tools used
var express = require("express"); 
var bodyParser = require("body-parser");
var fs = require("fs");
var marked = require('marked');
var methodOverride = require("method-override");
var morgan = require("morgan");
var Mustache = require("mustache");
var sqlite3 = require("sqlite3");
var util = require('util');
// also needed
var db = new sqlite3.Database("./forum.db");
var app= express();
  var topicsTemplate = fs.readFileSync('./views/topics.html', 'utf8');
  var commentsTemplate = fs.readFileSync('./views/comments.html', 'utf8');
  var topicForm = fs.readFileSync('./views/create_t.html', 'utf8');
  var commentForm = fs.readFileSync('./views/create_c.html', 'utf8');

app.use(bodyParser.urlencoded({extended: false}));
// app.use(express.static('views'));
app.use(methodOverride("_method"));
app.use(morgan("dev"));
// access index page
app.get('/', function(req, res){
  res.send(fs.readFileSync('./views/index.html', 'utf8'));
});
// access main forum page
app.get('/topics', function(req, res){
  db.all("SELECT * FROM topics;", function(err, topics){
    var html = Mustache.render(topicsTemplate, {topicsList: topics});
    res.send(html);
  });
});
// directs to the new topic form
app.get('/topics/create', function(req, res){
   console.log(req.body);
  res.send(topicForm);
});
  // NEED TO FIX ISSUE WHERE ENPTY FORM FIELDS GET ADDED

// redirects user to main forum page
app.post('/topics', function(req, res){
  console.log(req.body);
  db.run("INSERT INTO topics (title, description, author, votes) VALUES ('" + req.body.title + "', '" + req.body.description + "', '" + req.body.author + "', 0);");
  // res.send('/topics');
});
// directs user to comments of a topic
app.get('/topics/:id/comments', function(req, res){
  var id = req.params.id;
  db.all("SELECT FROM comments WHERE topics_id=" + id, function(err, topics){
    var html = Mustache.render(commentsTemplate, {commentDetails: comments});
    res.send(html);
    });
});
// runs server
app.listen(2000, function(){
  console.log("The server listens...");
});