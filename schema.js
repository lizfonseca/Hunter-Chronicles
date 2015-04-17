var sqlite3 = require("sqlite3");
var db = new sqlite3.Database("./forum.db");
// Table structure for Topics
db.run("CREATE TABLE topics (ID INTEGER PRIMARY KEY AUTOINCREMENT, Title text, Author varchar(255), Description text, Votes integer);");
// Table structure for Comments
db.run("CREATE TABLE comments (ID INTEGER PRIMARY KEY AUTOINCREMENT, Title text, Author varchar(255), Content text, City varchar(255), Topics_ID integer, FOREIGN KEY(Topics_ID) REFERENCES topics(ID));");
