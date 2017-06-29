# ToDo-application
ToDo app is a web application developed using Loopback framework of Nodejs, MySQL database and Anagularjs framework.

In it user can add  new tasks on a daily basis and for a future date also.User can delete certain tasks and can update anyone of them also. 


This application has 4 blocks (Pending Tasks, Ongoing Tasks, Completed Tasks and Future Tasks).Tasks from one block can go to any other block i.e., tasks from Pending Tasks block can go to any of the remaining three blocks and so on for all other blocks.

User can add tasks for a future date also which will go to Future Tasks block for that particular date.And on that date, the added tasks will itself go to the Pending Tasks block.

Tasks added for different future dates will be shown in the Future Tasks block.All the tasks added next to today's date will be shown in Future Tasks block.

If a user add task in the Future Tasks block for today's date, it will itself go to the Pending Tasks block for today. 

Date Picker is given so as a user can see all the tasks for any Past date, and for Future Date also.

User can add Tasks to the Future Tasks block by selecting a future date using Date Picker. 

However, user cannot add or delete past date tasks.
