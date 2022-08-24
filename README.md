# ApiSherlock

This is a fullstack Typescript MERN (MongoDB, Express, React, Node) app that lets users manage their APIs links. Users can organize API links by cloud platforms (eg. Heroku, AWS, GCP), and they can ping APIs and check whether the API is healthy. 

ApiSherlock is the new version of a past project, [IssueSherlock](https://github.com/jonathanleejono/IssueSherlock) (which is the first fullstack app I worked on!). IssueSherlock is an issue/bug tracker written in Javascript front and back, but the project's functionality is limited. As well as, IssueSherlock used static frontend build files along with the backend, but ApiSherlock separates the backend (Heroku) from the frontend (Vercel). I wanted to create a new project that I could use in real life, and ApiSherlock can be used to help keep project API links organized (I actually caught an error with one of my project's API with ApiSherlock!). It's possible to simply use Postman to manage APIs, however there is a downside of a lack of mobile responsive design with the Postman web app, but Postman overall can be used too as it has some other great features. ApiSherlock was also made to expand my knowledge of Typescript and testing with Javascript/Typescript libraries. 

Shoutouts to [John Smilga/Coding Addict](https://www.youtube.com/c/CodingAddict/videos) and [Kent C. Dodds](https://github.com/kentcdodds) for the tutorials and informational content, including MERN, Redux, and Javascript/Typescript testing.

See the live app here: https://apisherlock.vercel.app/landing

## Backend:
- Node
- Express
- MongoDB + Mongoose
- Jest + Supertest (Unit/Integration testing)

## Frontend:
- React (Typescript)
- Redux (Toolkit)
- React Testing Library
- MSW (Mock Service Worker)

&nbsp;

![ApiSherlock landing page](https://github.com/jonathanleejono/ApiSherlock/blob/main/assets/landing.png)
![all api stats page](https://github.com/jonathanleejono/ApiSherlock/blob/main/assets/stats.png)
![all apis page](https://github.com/jonathanleejono/ApiSherlock/blob/main/assets/all_apis.png)
![add api page](https://github.com/jonathanleejono/ApiSherlock/blob/main/assets/add_api.png)
