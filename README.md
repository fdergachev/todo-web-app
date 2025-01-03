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
* Run ```npm install``` in the frontend folder to install dependencies.
* Provide api address in frontend .env under ```VITE_API_URL```
### Usage (locally)
* Run ```php artisan server``` in backend folder to start the API.
* Run ```npm run dev``` in frontend folder
* TODO: finish README.md
### Usage (docker)
* Run ```docker-compose up --build -d; docker-compose logs -f``` to start the application.
### API Endpoints
| HTTP Verbs | Endpoints | Action | Body |
| --- | --- | --- | --- |
| POST | /api/auth/register | To sign up a new user account | name:string, email:string, password:string, c_password:string |
| POST | /api/auth/login | To login an existing user account | email:string, password:string, remember_me:boolean |
| GET | /api/auth/logout | To logout from the application | - |
| GET | /api/auth/user | To logout from the application | - |
| POST | /api/todos | To create a new to-do | title:string, content:string, page_id:number |
| GET | /api/todos | To retrieve all your to-do's | - |
| GET | /api/todos/:todoId | To retrieve certain to-do |  - |
| GET | /api/todos/page/:pageId | To retrieve to-do's by page | - |
| PUT | /api/todos/:todoId | To edit the to-do | title:string, content:string, is_done:boolean |
| DELETE | /api/todos/:todoId | To delete a single to-do | - |
| POST | /api/pages | To create a new page | title:string, description:string |
| GET | /api/pages | To retrieve all your pages | - |
| GET | /api/pages/:pageId | To retrieve certain page | - |
| PUT | /api/pages/:pageId | To edit the page | title:string, description:string |
| DELETE | /api/pages/:pageId | To delete a single page | - |
### Technologies Used
* [PHP](https://www.php.net/) A popular general-purpose scripting language that is especially suited to web development. 
* [Laravel](https://laravel.com/) Laravel is a free and open-source PHP-based web framework for building web applications.
* [PostgreSQL](https://www.postgresql.org/) A free and open-source relational database management system (RDBMS) emphasizing extensibility and SQL compliance.
* [Docker](https://www.docker.com/) Docker is an open platform for developing, shipping, and running applications. Docker provides the ability to package and run an application in a loosely isolated environment called a container.
* [React](https://react.dev/) React is the library for web and native user interfaces. Build user interfaces out of individual pieces called components written in JavaScript.
* [Vite](https://vite.dev/) Vite is a blazing fast frontend build tool powering the next generation of web applications.
* [Tailwind](https://tailwindcss.com/) Tailwind CSS is a utility-first CSS framework for rapidly building modern websites without ever leaving your HTML.
* [GSAP](https://gsap.com/) GSAP is an industry standard JavaScript animation library from GreenSock that lets you craft high-performance animations that work in every major browser.
### License
This project is available for use under the MIT License.

### Media
![Снимок экрана 2025-01-03 200858](https://github.com/user-attachments/assets/32cefdd2-d6e9-4808-9320-936975fd42db)

![image](https://github.com/user-attachments/assets/9e11db38-b395-4b45-abc6-aef5d349d744)

