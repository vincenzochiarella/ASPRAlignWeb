const express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
const path = require('path');
const Options = require('./routes/Options')



app = express()
server = require('http').Server(app)

const port = 5000
app.use(cors())
app.options('*', cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
server.listen(port, () => console.log("Server in ascolto sulla porta: " + port));

//---ONLY IF BUILD MODE---

    // Serve any static files
//     app.use(express.static(path.join(__dirname, '../../frontend/build')));

//     // Handle React routing, return all requests to React app
//     app.get('*', function (req, res) {
//         res.sendFile(path.join(__dirname, '../../frontend/build', 'index.html'));
// });



app.use('/options', Options)
