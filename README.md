# Express.js REST skeleton

## Technology stack
* MongoDB
* Node.js + Express.js
* Mocha + chai for tests
* Nodemon for developement purposes
* Forever for production purposes

## Features
* Model - View - Controller - Service architecture
* Middleware support
* Loaders layer
* JWT authorization with HttpOnly cookie support
* NYC logs saved into file
* Scheduled jobs with agenda.js
* Mailer with nodemailer
* Security middleware
* CORS support
* Recaptcha 2 and 3 support
* Configuration via config.env file
* HttpContext support with express-http-context
* Support https based on config.env. Certs can be placed in config directory
* Mocha tests depends on config.env
* Base controller for basic CRUD operations on Mongoose models

## How to run API
1. Configure file ```config.env```, set username:password@host:port/collection in DATABASE variable.
2. Install dependencies ```npm install```
3. Run project ```npm run dev``` or ```npm run prod```

## Project structure (/src)
* server.js - Responsible for run the application.
* config.env - environment variables
* api
    * middleware - API middleware (auth, error handling)
    * routes  - Routes with defined controllers to handle requests.
    * index.js  - Script where all routes from routes catalog are signed to application
* config
    * certs - Certificates for HTTPS connection
    * constants - Constant values used in source code
    * index.js - Script where placed are all variables from config.env  
* controllers - Controllers to handle application logic. Those modules are used in router.
* jobs - Scheduled jobs (like cleaning database, etc.)
* loaders - Additional application modules that requires configuration are handled in loaders (like mongoose etc.). Index.js aggregate all of these and run.
* models - Data models handled with Mongoose
    * validation - Additional validation functions for handling models
* services - Business logic. Each service can be created separately in each directory and aggregate in serviceFile
* subscribers - Global events (creating logs etc.). New event must be added in loaders if want to be global.
* utils - Additional application tools and methods
