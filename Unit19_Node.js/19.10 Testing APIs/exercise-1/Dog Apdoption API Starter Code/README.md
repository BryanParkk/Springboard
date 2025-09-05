The folder structure designed by our software architects ensures adherence to best practices:

- `controllers`: Contains the logic for handling incoming requests and returning responses to the client.
- `models`: Defines the data models and interacts directly with the database.
- `routes`: Manages the routes of your API, directing requests to the appropriate controller.
- `middlewares`: Houses custom middleware functions, including authentication and rate limiting.
- `.env`: Stores environment variables, such as database connection strings and the JWT secret.
- `app.js`: The main entry point of your application, where you configure the Express app and connect all the pieces.
- `db.js`: Manages the database connection.
- `package.json`: Keeps track of npm packages and scripts necessary for your project.

This structure provides a solid foundation for building a well-organized, scalable backend service. By separating concerns into dedicated directories and files, your project remains clean, navigable, and easier to debug and extend.

View the rubric for this assessment [here](https://storage.googleapis.com/hatchways.appspot.com/employers/springboard/student_rubrics/Dog%20Adoption%20Platform%20Rubric.pdf)

##### RUN

- npm run dev
- localhost:3000

##### TEST

- npm test

##### API Health check

- GET
- http://localhost:3000/api/health

##### Register

- POST
- http://localhost:3000/api/auth/register
  {
  "username": "bryan park",
  "password": "pass123"
  }

##### Login

- POST
- http://localhost:3000/api/auth/login
  {
  "username": "bryan park",
  "password": "pass123"
  }

##### Register Dog

- POST
- Auth Type : Bearer Token
- http://localhost:3000/api/dogs
  {
  "name": "Buddy",
  "description": "Friendly golden retriever"
  }

##### Adopt Dog

- POST
- Auth Type : Bearer Token
- http://localhost:3000/api/dogs/68b9e296fd55726906e54605/adopt

##### My Registered Dogs

- GET
- Auth Type : Bearer Token
- http://localhost:3000/api/dogs/mine?status=available&page=1&limit=5

##### My Adopted Dogs

- GET
- Auth Type : Bearer Token
- http://localhost:3000/api/dogs/adopted?page=1&limit=5
