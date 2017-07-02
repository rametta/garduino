# Home Garduino

## Start
To start the server, make sure there is a client side build in `/client/dist` if there isn't, run `ng build --prod` inside of `/client` with the angular CLI. Once that is built, go into `/` and run npm start to start the server. The server holds the API, serves the static files for the client and connects/queries the mongo database for data.

## Client

Client built on Angular 4.

## Server

API server built with Node, ExpressJS.

## Data

Data stored in MongoDB and Mongoose.