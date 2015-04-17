#Hunter Chronicles

>Hunter Chronicles is an online forum designed for hunters

##Structure
####General
The forum is populated by **topics**, and topics are  populated by **comments**. Topics are organized by _**popularity**_ in ascending order. Popularity is defined by the amount of 'upvotes' given to a particular topic.

_image here_


Each topic contains the following information:

_image here_

Meanwhile, comments hold the following information:

_image here_

####Technical
This illustration shows how the database holds the forum's information:

_ERD here_

+ The topics table holds an ID number, title, author (name or username), short description, and votes (value).

+ The comments table holds an ID number, tite, author, content, city tag, and topicsID number.

The topicsID number serves as a _foreign key_ in order to reference the topics with the comments table.

##User Stories
The forum can be accessed via IP address and port:

 _ip & port here_

#####Main page
+ Once connected, the user will find a welcome page with an 'Enter' button.The button directs the user to the forum's main page.

 _image here_

+ The main page contains the list of topics. Each topic has a popularity value, and the topics are ordered from most to least popular.

 _image here_

+ If the user is interested in creating a new topic, s/he can do so via the 'Add' button. It will take the user to a form.

 _image here_

+ Once the new topic is created, the user will be directed back to the topics list.

 >_All new topics start with a value of 0 upvotes._

+ A specific topic can be accessed by clicking on its title.

#####Topic page
+ The topic page contains the topic's information (title, description, author, votes) and its corresponding comments.

 _image here_

+ On this page, the user is able to either delete the topic or add a new comment.

 _image here_

 If the user deletes the page, they will be redirected automatically to the main page.

 >_The user will not be prompted on the topic deletion, therefore it is advised to first consider before proceeding._

 A new comment can be created via the 'Add' button. It will take the user to a form.

+ The user must fill the new information in the form fields and click the 'Save' button.

 _image here_

+ Once the comment is created, the user will be directed back to the comments list.

+ A specific comment can be accessed by clicking on its title.

#####Comment page

+ The comment page contains the comment's information (topic title, comment title, author, content, and tag).

 _image here_

+ On this page, the user is able to either edit or delete the comment.

 _image here_

 A comment can be edited via the 'Edit' button. It will take the user to a form.

+ The user must fill the new information in the form fields and click the 'Save' button.

 _image here_

+ Once the comment is edited, the user will be directed back to the comments list.

 If the user deletes the comment, they will be redirected automatically to the topic page.

>_The user will not be prompted on the comment deletion, therefore it is advised to first consider before proceeding._

##Tools & Resources

**1. Sqlite3**

**2. Mustache**

**3. Node (fs)**

**4. Express**

**5. Morgan**

**6. Body Parser**

**7. Method Override**

**8. Digital Ocean**

**9. Marked**

**10. IPInfo (API)**

######Hunter Chronicles: The online Gathering Hall for hunters. Hunters Unite!
