# Home Garduino

## Start
To start the server, make sure there is a client side build in `/client/dist` if there isn't, run `ng build --prod` inside of `/client` with the angular CLI. Once that is built, go into `/` and run npm start to start the server. The server holds the API, serves the static files for the client and connects/queries the mongo database for data.

## Materials

* Raspberry Pi 3
* Arduino Uno
* Temperature & Humidity Sensor
* Photoresistor
* Many resisitors/capacitors

## Client

Client built on Angular 4 / RxJs

![screenshot](/assets/screenshot.png "Client screenshot")

## Server

API server built with Node, ExpressJS.

Routes:
* ANY `/api` - Welcome route, with info.
* GET, POST, DELETE `/api/gardens`

## Data

Data stored in MongoDB and Mongoose.