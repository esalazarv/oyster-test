# Oyster Full Stack 

A Stack with node js using Nest Js Framework for the backend and React Js for the Frontend.

## Live Demo
###### Public WEB routes
- [GET] http://165.22.42.227/login
    - username: **admin@oyster.com**
    - password: **secret**
###### Protected WEB routes:
- [GET] http://165.22.42.227
- [GET] http://165.22.42.227/users
- [GET] http://165.22.42.227/logs

###### Public API routes:
- [POST]  http://165.22.42.227/api/auth/login (The same web credentials)
###### Protected API routes (JWT):
- [GET]  http://165.22.42.227/api/users
- [POST]  http://165.22.42.227/api/users
- [GET]  http://165.22.42.227/api/users/1
- [PUT]  http://165.22.42.227/api/users/1
- [DELETE]  http://165.22.42.227/api/users/1


This project keeps the frontend and backend in different directories:

- `api` directory for a Nest Js project
- `web` directory for a React Js project  
- `nginx` directory for reverse proxy config templates **(Production only)**

#####¿Why reverse proxy?
The main reason is for put all services together listen for the same IP or domain in a server.

### Requirements

- Docker >= **19.03.13**
- Docker Compose >= **1.27.4**


### Installation
Clone this repo
````bash
git clone https://github.com/esalazarv/oyster-test.git
````

### Configuration
Before up all containers you must set some environment variables:

_Note: For the proof purposes this project uses SQLite as database, if you want use another database you must do some changes in configuration module
and update your credentials in the .env file._

#### Configuring nest js api
In the api directory copy the `.env.example` in to a `.env` file:

````bash
cd api
cp .env.example .env
````

You can change this values as you need but for development environment this env values are ok
````dotenv
# Application name
APP_NAME=Oyster

# Application version
APP_VERSION="1.0.0"

# Application port
APP_PORT=80

# Database coonfigurations
DB_CONNECTION=sqlite
DB_DATABASE=oyster

# JWT secret
JWT_SECRET=b4c5bc677e7c
````

#### Configuring react web app
In the web directory copy the `.env.example` in to a `.env` file:
````bash
cd api
cp .env.example .env
````

For development environment this value else this value is ok
````dotenv
REACT_APP_API_HOST=http://localhost:3000
````
_Note: Change this value if you had configured another port for the API in you docker-compose.yml. 
If you are in production the api host must ends with the path `/api` 
because the reverse proxy handles those requests with this rule. Example: `http://my-domain.com/api`_ 

#### Up all services
For development

````bash
docker-compose build
docker-compose up -d
````
Run database migrations:
````bash
docker-compose exec api npm run migration:run
````
This will seed a user for test authentication:

username: **admin@oyster.com**

password: **secret**

- The API will listen in http://localhost:3000
- The React web will listen in http://localhost:5000

#### Tests
````bash
# Unit tests
docker-compose exec api npm run test

# e2e tests
docker-compose exec api npm run e2e
````

#### Production deploy
````bash
docker-compose -f docker-compose.prod.yml up --build -d
````
