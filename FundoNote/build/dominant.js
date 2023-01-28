"use strict";

var express = require('express');
var app = express();
app.get('/', function (req, res) {
  res.send("Hello World");
});
app.get('/employees', function (req, res) {
  res.send('Employees');
});
app.listen(3000);