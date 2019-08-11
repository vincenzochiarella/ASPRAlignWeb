const express = require('express')
const Options_Route = express.Router()
const cors = require('cors')

Options_Route.use(cors())
const Process = require('../builder/stringBuilder')


Options_Route.post('/analize', (req,res) =>{
    const outGraph = Process.start(req.body.options, req.body.molecules).then( data =>{
        res.send(data)
    })
    
})

module.exports = Options_Route