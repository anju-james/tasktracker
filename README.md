## Design Choices for Task Tracker 
Task Tracker is a web application which makes use of an owner based access control authorization in the working of the application. The functionalities of the application can be accessed and modified upon registering and then logging into the application. The following are the design choices that were applied for the development of the application. 

### Application Design: 
*	Anyone can register for an account in Task Tracker using Name and Email. There are three types of roles in Task Tracker.         They are "user", "manager", "admin". The default role of a person registering into the application is "user".
*	Once registered, the user can login to his account using the email address. Passwords are not required for logging in. 


##### What a User sees on his Page.
Example user: 
```sh
eng1@mail.com
```
*	Upon logging in, the user can start creating tasks by clicking on the 'Create Task' button.  
*	There are two categories of tasks that the user gets to explore in Task Tracker. They are: My Tasks and Unassigned Tasks.  
*	My Tasks displays the tasks that the user has been assigned to and is currently working on /or completed. A user can view the task details by clicking on 'Show' button. On clicking the 'Show' button user is directed to a page with the details of the task. There are two options for each user on the Task Details page. He can either go back by clicking the "Back" button. Or edit the task and mark it as complete by clicking on the "Edit" button which will take the user to "Edit Issue" Page. A user can mark a task as complete on the Edit Issue page only if the task belongs to "My Tasks" category. If it is an "Unassigned Task", a user can only edit the title and Description.
*	User can log in the time he has spent on each task by clicking on the timer button "Start timer". Once timer begins recoding the time, a user can finish recording by clicking the "Stop Timer" button. A user can also manually edit the time stamps by clicking on "Update" button, and also delete the timestamp by clicking on the "Delete" button. There can be multiple time stamps for recording a user's work on each tasks.
*	Unassigned Tasks are the tasks that are open for working, they are created by the users of the application. These open tasks are not marked complete by any user (hence stays in the open tasks category). These Tasks can be assigned to other users by the users with 'manager' role alone. 
*	There is "My Team" button visible for the users on the index page. On clicking it, the users can see the details of the team he is working with. The manager and other teammates details appear on the screen.

##### What manager sees on screen.
Example manager: 
```sh
manager1@mail.com
```
*	A manager is also user who can create tasks. He is registered as a user and is promoted to manager position by the admin. He can assign the tasks to users who will work under him. However, the users that work under him are assigned by the admin.
*	The admin can see the task report by clicking on the "Team Tasks". It will give the details of each tasks and each user that are assigned those tasks. There is a "Show" button for each of the tasks, which will show the individual task details and the time each person has been working on the tasks.
*	If a manager wishes to assign another user to a task he can click on "Edit" button and assign it to another user. 

##### What Admin sees on screen
Example admin:
```sh
admin@curiousmind.tech
```
*	On logging in as admin, there is a button called "Admin" on the top of the page, which lists all the registered users using the application. Admin has the privilege to assign roles to the users. He can make any user a manager and can decide which user should work under the manage. He can click on edit option to carry out these tasks.
	

Now you can visit [TaskTracker](http://tasks2.curiousmind.tech/) from your browser.

To start your Phoenix server:

* Install dependencies with mix deps.get
* Create and migrate your database with mix ecto.create && mix ecto.migrate
* Install Node.js dependencies with cd assets && npm install
* Start Phoenix endpoint with mix phx.server












