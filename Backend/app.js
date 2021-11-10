var express = require("express");
var cors = require("cors");
var { scheduler } = require('./helpers/scheduler')

var webscrapRouter = require("./routes/webscrapRoutes");

var app = express();

app.use(express.json())
app.use(cors());

app.use('/api/v1/news', webscrapRouter)

module.exports = app;
