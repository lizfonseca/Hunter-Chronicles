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
// all HTML files 
var homepage = fs.readFileSync('./views/index.html', 'utf8');
var topicsTemplate = fs.readFileSync('./views/topics/index.html', 'utf8');
var commentsTemplate = fs.readFileSync('./views/comments/index.html', 'utf8');
var topicForm = fs.readFileSync('./views/topics/new.html', 'utf8');
  // var commentForm = fs.readFileSync('./views/create_c.html', 'utf8');

app.use(bodyParser.urlencoded({extended: false}));
// app.use(express.static('views'));
app.use(methodOverride("_method"));
app.use(morgan("dev"));
// user reaches the forum homepage
app.get('/', function(req, res){
  res.send(homepage);
});
// user can see the list of topics
app.get('/topics', function(req, res){
  db.all("SELECT * FROM topics;", function(err, topics){
    var html = Mustache.render(topicsTemplate, {topicsList: topics});
    res.send(html);
  });
});
// to create a new topic, the user is directed to a form  
app.get('/topics/new', function(req, res){
   console.log(req.body);
  res.send(topicForm);
});
// saves info into db & redirects user to topics page
app.post('/topics/create', function(req, res){
  console.log(req.body);
  db.run("INSERT INTO topics (title, description, author, votes) VALUES ('" + req.body.title + "', '" + req.body.description + "', '" + req.body.author + "', 0);");
  res.redirect('/topics');
});
// the user can also read comments and topic information
app.get('/topics/:id', function(req, res){
  var id = req.params.id;
  db.all("SELECT * FROM topics where id=" + id + ";", {}, function(err, topic){
    db.all("SELECT * FROM comments WHERE topics_id=" + id + ";", {}, function(err, comments){
        var html = Mustache.render(commentsTemplate, {
          title: topic[0].title,
          votes: topic[0].votes,
          description: topic[0].description,
          commentDetails: comments
        });
        res.send(html);
      });
    });
  });
// using the form below, the user can create a new comment on the current topic

// title , author , content , city , topics_id 

app.post('topics/:id/comments/new', function(req, res){
  var id = req.params.id;
  // need to implement IP locator API here!!!!!
  var city;
  db.run("INSERT INTO comments (title, author, content, city, topics_id) VALUES ('" + req.body.title + "', '" + req.body.author + "', '" + city + id + ");");
  res.redirect('/topics/:id');
});

// app.post('topics/:id', function(req, res){
//   var id = req.params.id;
//   db.all("SELECT FROM topics WHERE id = " + id +";", {}, function(err, topic){
//     db.all("INSERT INTO comments (title, author, content) VALUES ")
//   }){

//   };
// };
// runs server
app.listen(2000, function(){
  console.log("The server listens...");
});