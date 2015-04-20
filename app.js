// tools used
var express = require("express"); 
var bodyParser = require("body-parser");
var fs = require("fs");
var marked = require('marked');
var methodOverride = require("method-override");
var morgan = require("morgan");
var Mustache = require("mustache");
var request = require('request');
var sqlite3 = require("sqlite3");
var util = require('util');
// also needed
var db = new sqlite3.Database("./forum.db");
var app= express();
// var clientCity = app.get('http://ipinfo.io/city', function(req, res){
//   db.run("INSERT INTO comments (city) VALUES '" + res.body + "';");
// });
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
  db.all("SELECT * FROM topics ORDER BY votes;", function(err, topics){
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
app.post('/topics/new', function(req, res){
  db.run("INSERT INTO topics (title, description, author, votes) VALUES ('" + req.body.title + "', '" + req.body.description + "', '" + req.body.author + "', 0);");
  res.redirect('/topics');
});

// user can upvote or downvote on a topic
// app.put('/topics/:topic_id', function(req, res){
//   var topic_id = req.params.topic_id;
//   db.run("UPDATE topics SET vote=" + )
// });

// the user can also read comments and topic information
app.get('/topics/:topic_id', function(req, res){
  var topic_id = req.params.topic_id;
  db.all("SELECT * FROM topics WHERE id=" + topic_id + ";", {}, function(err, topic){
    db.all("SELECT * FROM comments WHERE topics_id=" + topic_id + ";", {}, function(err, comments){
      var html = Mustache.render(commentsTemplate, {
        id: topic[0].id,
        title: topic[0].title,
        votes: topic[0].votes,
        description: topic[0].description,
        commentDetails: comments,
      });
        console.log(topic);
        console.log(comments);
      res.send(html);
    });
  });
});
// using the form below, the user can create a new comment on the current topic
app.post('/topics/:topic_id/', function(req, res){
var topic_id = req.params.topic_id;
var comments = req.body;
// var clientCity = 'locate me';  
  request.get('http://ipinfo.io/geo', function(error, response, body){
    var info = JSON.parse(body);
    var clientCity = info.city + ", " + info.country;
      db.run("INSERT INTO comments (title, author, content, city, topics_id) VALUES ('" + comments.title + "', '" + comments.author + "', '" + comments.content + "', '" + clientCity + "', " + topic_id + ");");
  res.redirect('/topics/:topic_id');
  });
});




// // the user can edit a specific comment from a topic
// app.get('/topics/:topic_id/comments/:id', function (req, res){

// });
// // the user can also delete a specific comment from a topic




// runs server
app.listen(2000, function(){
  console.log("The server listens...");
});