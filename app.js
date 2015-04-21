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
// all HTML files 
var homepage = fs.readFileSync('./views/index.html', 'utf8');
var topicsTemplate = fs.readFileSync('./views/topics/index.html', 'utf8');
var commentsTemplate = fs.readFileSync('./views/comments/index.html', 'utf8');
var topicForm = fs.readFileSync('./views/topics/new.html', 'utf8');
var editCommentForm = fs.readFileSync('./views/comments/edit.html', 'utf8');
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
    db.all("SELECT * FROM comments ")
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
  var topic = req.body;
  db.run("INSERT INTO topics (title, description, author, votes) VALUES ('" + topic.title + "', '" + topic.description + "', '" + topic.author + "', 0);");
  res.redirect('/topics');
});

// user can upvote on a particular topic
// app.put('/topics/:topic_id/upvote?_method=PUT', function(req, res){
//   var topic_id = req.params.topic_id;

//   db.run("UPDATE topics SET vote = vote + 1 WHERE id = " + topic_id + ";");
//   res.redirect('/topics/' + topic_id);
// });
// // user can downvote on a particular topic
// app.put('/topics/:topic_id/downvote?_method=PUT', function(req, res){
//   var topic_id =req.params.topic_id;

//   db.run("UPDATE topics SET vote = vote - 1 WHERE id = " + topic_id + ";");
//   res.redirect('/topics/' + topic_id);
// });

// // user can upvote or downvote on a topic
// app.put('/topics/:topic_id?_method=PUT', function(req, res){
//   var topic_id = req.params.topic_id;
//   var id = req.params.id;
//   db.all("SELECT * FROM topics WHERE id=" + topic_id + ";", {}, function(err, topic){
//     console.log(topic);
//     var upvote = topic[0].votes + 1;
//     // var downvote = topic[0].votes - 1;
//     db.run("UPDATE topics SET votes=" + upvote + " WHERE id=" + topic_id + ";");
//       res.send('topics/:topic_id');
//   });
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
        // console.log(topic);
        // console.log(comments);
        // console.log(comments.length);
      res.send(html);
    });
  });
});
// using the form below, the user can create a new comment on the current topic
app.post('/topics/:topic_id/', function(req, res){
var topic_id = req.params.topic_id;
var comment = req.body;
  request.get('http://ipinfo.io/geo', function(error, response, body){
    var info = JSON.parse(body);
    var clientCity = info.city + ", " + info.country;
      db.run("INSERT INTO comments (title, author, content, city, topics_id) VALUES ('" + comment.title + "', '" + comment.author + "', '" + comment.content + "', '" + clientCity + "', " + topic_id + ");");
  res.redirect('/topics/' + topic_id);
  });
});
// the user can edit a specific comment from the current topic
app.get('/topics/:topic_id/comments/:id', function(req, res){
  var topic_id = req.params.topic_id;
  var id = req.params.id;
  db.all("SELECT * FROM topics WHERE id=" + topic_id + ";", {}, function(err, topic){
    db.all("SELECT * FROM comments WHERE id=" + id + ";", {}, function(err, comment){
       var html = Mustache.render(editCommentForm,{
        topics_id: comment[0].topics_id,
        id: comment[0].id,
        title: comment[0].title,
        content: comment[0].content
       });
       res.send(html);
    });
  });
});

app.put('/topics/:topic_id/comments/:id', function(req, res){
  var topic_id = req.params.topic_id;
  var id = req.params.id;
  var comment = req.body;
  console.log(req);

  db.run("UPDATE comments SET title= '" + comment.title + "', content= '" + comment.content + "' WHERE id=" + id + ";");
  res.redirect('/topics/' + topic_id);
});
// the user can also delete a specific comment from a topic


// SELECT (SELECT COUNT(topics_id) from comments) AS COUNT, * 
// from topics;

// runs server
app.listen(2000, function(){
  console.log("The server listens...");
});