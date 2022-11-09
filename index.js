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
  const unix = req.params.date;

  // check date-format
  const regex = /\d{4}-\d{2}-\d{2}/
  const regexUnix = /\d{13}/
  let date;

  if (regex.test(unix) === true) {
    date = new Date(unix).toUTCString();
    res.json({
      unix: unix,
      utc: date
    })
  }
  else if (regexUnix.test(unix) === true) {
    date = new Date(Number(unix)).toUTCString();
    res.json({
      unix: unix,
      utc: date
    })
  }
  else if (unix === "") {
    unix = new Date().getTime();
    date = new Date(unix).toUTCString();
    res.json({
      unix: unix,
      utc: date
    })
  }
  else {
    res.json({
      error: date
    })
  }
})


// const weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
// console.log(weekday[date.getDay()])
// const unix = 1451001600000;
// const date = new Date(unix)

// console.log(date.toUTCString())

// const day = date.getDay();
// const month = date.getMonth();
// const year = date.getFullYear();

// console.log(date.getSeconds())

// console.log(new Date(time).getFullYear())
// const options = {weekday: "short", day: "numeric", month: "short", year: "numeric", }
// options.timeZone = "GMT"
// const newTime = new Intl.DateTimeFormat("en-US", options).format(date)
// const regex = /((?<=\s)\D{3}(?=\s)) ((?<=\s)\d{2}(?=,))/
// console.log(newTime.replace(regex, "$2 $1"))


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
