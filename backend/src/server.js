const express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
const Options = require('./routes/Options')


app = express()
server = require('http').Server(app)

const port = 5000
app.use(cors())
app.options('*', cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
server.listen(port, ()=>console.log("Server in ascolto sulla porta: "+port));

app.use('/options', Options)