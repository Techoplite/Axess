# Axess
Create and carry out assessments


# Description
This website project aims to create a one page online application that allows users to register as a "Teacher" or a "Student". 

As a "Teacher", a person shoul be able to create assessments and review all the previously created ones, as well as delete any of them. 
<br/>As a "Student", a user should be allowed to find a given assessment, carry it out, and once submitted, be presented with the final score.

The project is subdivided in two main directories: frontend (written in React), and backend (written in Django).


# Teacher Side Use Cases

## Create Assessment
An assessment is a collection of questions (at least one), the relative available answers (at least two), and only one correct answer to a given question.

1. In order to create an assessment a techer has to click on the `create assessment` link inside the navbar at the top of the page.

![](create-assessment-link-clicked.gif)

2. Give the assessment a title and click the `submit` button.

![](assessment-title.gif)

3. Now add a question and, if needed, a short description.

![](question.gif)

4. Add at least two answers, one of wich must be the correct one. The correct answer can be easily selected by ticking the `is correct answer` checkbox underneath the answer input field. Once all the answers have been created, click on the `create new question` button.

![](answer.gif)

5. You can add other questions and answers. Once you are done, click on the `finish assessment button` and the assessment will be added to the database. Also, the user will be displayed an assessment summary and a greee `create new assessment` button wich redirect the user to the assessment title form.

![](finish-assessment.gif)



# Project State
At the moment, the Teacher side of the project has been implemented through a first iteration, giving a first prototype of the final result. The next step will be to implement the Student side, and finally an authentication system.


# Installation
In order to test the current product, the steps to follow are hereafter:

1. Click on the "Clone or download" button.
2. From the popup, click on "Download ZIP".
3. As soon as the zip file has been downloaded, right-click on it and select "Extract to Axess-master\".
4. Now open the folder in a Code Editor.
5. Open a terminal and navigate to the "api" directory (e.g. `cd Axess-master/backend/api`).
6. Run the database migrations by typing `python manage.py migrate`.
7. Run the Django development server by typing `python manage.py runserver`.
8. With this terminal open, open a new terminal and navigate to the "gui" directory (e.g. `cd Axess-master/frontend/gui`).
9. Install npm by typing `npm install`.
10. Run the React development server by typing `yarn start`.

A webpage should automatically open in your browser. You are now free to navigate the current functionalities.
