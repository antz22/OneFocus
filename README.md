# OneFocus

OneFocus is an application that allows students to work and study in a motivated, efficient and flexible manner.

## Front end: [vue-onefocus](https://github.com/antz22/vue-onefocus)
## Back end: [django-onefocus](https://github.com/antz22/django-onefocus)
## Mobile App: [onefocus-ns](https://github.com/antz22/OneFocus-ns)

(separate repos for deployment purposes)

## Features

### Home

The home page gives users an overview of their progress on tasks and goals, displaying information like how many tasks are left, how many have been completed, and the progress on goals.

### Tasks

OneFocus provides a minimalistic task list that lets students organize their lives in a neat and aesthetic way. 

Tasks can be added with an estimated time-to-complete, attached with a particular goal or motivation that puts the task into perspective.

These Tasks can be created with a category and a priority. Tasks can then be sorted based on date, category and priority. High priority tasks are outlined in red, medium in yellow, and low in green.

Users can check off tasks when they are done and archive them to remove them from the list of tasks.


### Goals

With added support for keeping track of goals, students can keep their motivation in the long term while they create short term tasks. 

Keeping track of long term goals while using this app can help prevent students from losing focus on what they want to achieve.

Progress of goals can be tracked through custom set 'units' of progress, and progress is displayed through a progress bar on each goal. These units of progress can correspond to days in a challenge (30 day diet challenge), number of assessments (get 5 A+'s), or anything else the student finds useful for their productivity.

Once a goal is set, users can update their goals at any time, and archive them once they are completed.


### Pomodoro

A pomodoro timer can be accessed as well, which allows users to set intervals for focus, and for breaks. 

This gives users a more full-fledged and distraction less experience for their studies.


## Tools

OneFocus consists of a front end built with vue.js and tailwindcss, and a back end built with Django (API, database) and Django Rest Framework (API, serializers). 

The front end was depoyed with netlify, and the backend was deployed with heroku. 

## Screenshots

(Design V1)

![Tasks](https://github.com/antz22/OneFocus/blob/master/images/tasks.png)

![Goals](https://github.com/antz22/OneFocus/blob/master/images/goals.png)

![Pomodoro](https://github.com/antz22/OneFocus/blob/master/images/pomodoro.png)

(Design V2) 

![Landing](https://github.com/antz22/OneFocus/blob/master/images/landing.png)

![Home](https://github.com/antz22/OneFocus/blob/master/images/home.png)

![New Task](https://github.com/antz22/OneFocus/blob/master/images/taskv2.png)



## TODO

- Burger bar 2 size
