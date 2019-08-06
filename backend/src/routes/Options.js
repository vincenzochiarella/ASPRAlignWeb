const express = require('express')
const Options_Route = express.Router()
const cors = require('cors')

Options_Route.use(cors())
const Process = require('../builder/stringBuilder')


Options_Route.post('/analize', (req,res) =>{
    res.send(Process.start(req.body.options, req.body.stringinput))
    
})

module.exports = Options_Route