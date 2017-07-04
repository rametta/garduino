# Home Garduino

## Before starting
* Make sure you have Node > 7 and NPM > 4 installed globally.
* Make sure you have the AngularCLI > 1 installed globally.
* Make sure you have a MongoDB installed and an instance running with a directory in `/data/db`.
* Make sure you run `npm install` in both `~/` for the server and `~/client` for the client.

## Start in development
1. Start the server by running `npm start` while in `~/`.
2. Start the client by running `npm start` while in `~/client`. This start command will also append some params for proxying the server, so do not run `ng serve` because it will not proxy.
3. Go to [http://localhost:4200](http://localhost:4200)

## Build
To run a build, go to `~/client` and run `ng build --prod`. The artifacts will go in `~/client/dist`.

## Start in production
To start in production, make sure you run a build first, then just run `npm start` in the server root to host the static build files and API. Go to [http://localhost:8080](http://localhost:8080) to see the app. You may run this in the background on unix based machines by appending an `&` to the command like this `npm start &`

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

Data stored in MongoDB using Mongoose.

## Progress
| Task     | Status |
| -------- | ------ |
| Client side interface | 100%
| Node CRUD API | 80%
| Pi Connection to Arduino | 0%
| Arduino Program | 0%
| Circuit prototype | 0%
| Ciruit | 0%