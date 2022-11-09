// index.js
// where your node app starts
require('dotenv').config({path:__dirname+'/.env'})

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
// const { options } = require('../npm/boilerplate-express/myApp');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

//http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:date", (req, res) => {
  // get request
  let unix = req.params.date;

  // check date-format
  const regexDate = /\d{4}-\d{2}-\d{2}/
  const regexUnix = /\d{13}/
  let date;

  if (regexDate.test(unix) === true) {
    unix = Number(new Date(unix))
    date = new Date(unix).toUTCString();
    res.json({
      unix: unix,
      utc: date
    })
  }
  else if (regexUnix.test(unix) === true) {
    unix = Number(unix)
    date = new Date(unix).toUTCString();
    res.json({
      unix: unix,
      utc: date
    })
  }
  else if (!req.params.date) {
    unix = Number(new Date().getTime());
    date = new Date(unix).toUTCString();
    res.json({
      unix: unix,
      utc: date
    })
  }
  else {
    res.json({
      error: "Invalid Date"
    })
  }
})

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});