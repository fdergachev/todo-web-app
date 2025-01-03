![image](https://github.com/user-attachments/assets/6c5226bd-1d29-4ace-a79b-856779b8b47a)

# To-do Web Application
### Introduction
This is an open source to-do applicaiton that enable users to create and manage their to-do's.
### To-do Web Application Features
* Users can signup and login to their accounts
* Authenticated users can create, update, delete and get all their to-do's.
### Set up (locally)
* Clone this repository [here](https://github.com/fdergachev/todo-web-app.git).
* The main branch is the most stable branch at any given time, ensure you're working from it.
* Run ```php composer update && php composer install``` in the backend folder to install dependencies.
* Provide database connection creds in backend .env file.
### Usage (locally)
* Run ```php artisan server``` in backend folder to start the API.
* TODO: finish README.md
### Usage (docker)
* Run ```docker-compose up --build -d; docker-compose logs -f``` to start the application.
### API Endpoints
| HTTP Verbs | Endpoints | Action |
| --- | --- | --- |
| POST | /api/auth/register | To sign up a new user account |
| POST | /api/auth/login | To login an existing user account |
| GET | /api/auth/logout | To logout from the application |
| POST | /api/todos | To create a new to-do |
| GET | /api/todos | To retrieve all your to-do's |
| GET | /api/todos/:todoId | To retrieve certain to-do |
| PATCH | /api/todos/:todoId | To edit the to-do |
| DELETE | /api/todos/:todoId | To delete a single to-do |
### Technologies Used
* [PHP](https://www.php.net/) A popular general-purpose scripting language that is especially suited to web development. 
* [Laravel](https://laravel.com/) Laravel is a free and open-source PHP-based web framework for building web applications.
* [PostgreSQL](https://www.postgresql.org/) A free and open-source relational database management system (RDBMS) emphasizing extensibility and SQL compliance.
* [Docker](https://www.docker.com/) Docker is an open platform for developing, shipping, and running applications. Docker provides the ability to package and run an application in a loosely isolated environment called a container.
TODO: Add FE later
### License
This project is available for use under the MIT License.

### Media
![Снимок экрана 2025-01-03 200858](https://github.com/user-attachments/assets/32cefdd2-d6e9-4808-9320-936975fd42db)

![image](https://github.com/user-attachments/assets/9e11db38-b395-4b45-abc6-aef5d349d744)

