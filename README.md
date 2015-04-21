#Hunter Chronicles

>Hunter Chronicles is an online forum designed for hunters

##Structure
####General
The forum is populated by **topics**, and topics are  populated by **comments**. Topics are organized by _**popularity**_ in ascending order. Popularity is defined by the amount of 'upvotes' given to a particular topic.

####Technical
This illustration below shows how the database holds the forum's information:

<img src="http://i.imgur.com/pBmWGYl.jpg"/>

+ The topics table holds an ID number, title, author (name or username), short description, and votes (value).

+ The comments table holds an ID number, tite, author, content, city tag, and topicsID number.

The topicsID number serves as a _foreign key_ in order to reference the topics with the comments table.

The following illustration shows the flow of the forum via routes and their corresponding HTML pages (wireframes):

<img src="http://i.imgur.com/JhUHLpC.jpg"/>

##User Stories
The forum can be accessed via IP address and port:

 _IP: 104.131.56.178_

 _Port: 2000_

#####Main page
+ Once connected, the user will find a welcome page.

+ The user will be directed to the main forum page that contains the list of topics.

+ The user can create a new topic.

+ The user will be directed back to the topics list once creating a new comment.

 >_All new topics start with a value of 0 upvotes._

+ A specific topic can be accessed by clicking on its title.

#####Topic page
+ The topic page contains the topic's information (title, description, author, votes) and its corresponding comments.

+ The user can add a new comment for the current topic.

+ The user must fill the new information in the form fields and click the 'Save' button.

+ Once the comment is created, the user will be directed back to the comments list.

+ A specific comment can be accessed by clicking on its title.

#####Comment page

+ The user can edit the comment through the edit comment form.

+ The user must fill the new information in the form fields and click the 'Save' button.

+ Once the comment is edited, the user will be directed back to the comments list.

##Tools & Resources
**1. Node** library used for the following modules.

**2. Sqlite3** is the node module used to create a database and adding/retrieving information.

**3. Mustache** used to render information from the database into the html files.

**4. Node (fs)** used to open and read the needed files.

**5. Express** used for HTTP requests.

**6. Morgan** used for displaying HTTP requests made while accessing the forum.

**7. Body Parser** used for parsing the body of the HTTP response.

**8. Method Override** used for PUT and DELETE methods in html files

**9. Digital Ocean** used to deploy the local server as a remote server.

**10. Marked** module used to parse markdown syntax and render it as HTML syntax

**11. IPInfo (API)** used for retrieving the client's current city location via IP address.

##Download

  If you would like a copy of these files, go to:

  https://github.com/lizfonseca/Hunter-Chronicles

+ Click on the 'Download as zip' button located on the right margin.

+ Unzip files

+ Open the Terminal and access the files:
```bash
$ cd [path to your zip folder here]
```

+ Install node:

https://nodejs.org/download/

+ Install node modules:

```bash
$ npm install .
```

+ Install Nodemon:

```bash
$ npm install -g nodemon
```

+ Open browser window and type the following:

``` localhost:2000 ```

+ Still inside the folder path (on Terminal window), type the following:

```bash
$ nodemon app.js
```

+ Go back into the browser window and refresh the page. The server would run.

######Hunter Chronicles: The online Gathering Hall for hunters. Hunters Unite!
