var sqlite3 = require("sqlite3");
var db = new sqlite3.Database("./forum.db");
// Table structure for Topics
db.run("CREATE TABLE topics (id INTEGER PRIMARY KEY AUTOINCREMENT, title text, author varchar(255), description text, votes integer);");
// Table structure for Comments
db.run("CREATE TABLE comments (id INTEGER PRIMARY KEY AUTOINCREMENT, title text, author varchar(255), content text, city varchar(255), topics_id integer, FOREIGN KEY(topics_id) REFERENCES topics(ID));");
