const express = require('express');
const app = express();
//const port = 8080;
const port = process.env.PORT || 8000

var sqlite3 = require('sqlite3');
var db = new sqlite3.Database('app/data/sqlitedb');
var bodyParser = require("body-parser");
var path = require('path');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set('views', './app/views');

app.use('/img', express.static(path.resolve(__dirname, "app/img")))
app.use('/css', express.static(path.resolve(__dirname, "app/css")))

require('./app/routes')(app, db);


app.listen(port, () => {
    console.log('Backend NodeJS live on ' + port);
});

