// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");
// Start up an instance of app
const app = express();
/* Middleware*/
const bodyParser = require("body-parser");
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());
// Initialize the main project folder
app.use(express.static("website"));

// Setup Server
const port = 8000;
// Spin up the server
const server = app.listen(port, () =>
  console.log(`local host running at : ${port}`)
);

// creat GET request

app.get("/all", sendData);

function sendData(req, res) {
  res.send(projectData);
}
//create post request

app.post("/add", add);

function add(req, res) {
  newEntry = {
    date: req.body.date,
    weather: req.body.weather,
    feeling: req.body.feeling,
  }
  projectData = JSON.parse(JSON.stringify(newEntry));
  console.log(projectData);
}
