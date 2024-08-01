// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


const invalidDate = (date) => date.toUTCString() === "Invalid Date";

// your first API endpoint... 
app.get("/api/:date", function (req, res) {

let date = new Date(req.params.date)

if(invalidDate(date)) {
date = new Date(+req.params.date)
} 
  res.json({
  unix: date.getTime(),
  utc: date.toUTCString()
  });

if(invalidDate(date)) {
    res.json({error : "Invalid Date"})
    return;
    } 

});

// second API endpoint...
app.get("/api", function (req, res) {
  
  const d = new Date();

  res.json({
    unix: d.getTime(), 
    utc: d.toUTCString()
  });
  
  });


// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});