const express = require('express')
const Options_Route = express.Router()
const cors = require('cors')

Options_Route.use(cors())
const Process = require('../builder/stringBuilder')


Options_Route.post('/analize', (req,res) =>{
    Process.startAnalize(req.body.options, req.body.molecules).then( ( data ) =>{
        res.send(data)        
    }).catch( err=>
        res.send(err)
    )  
})
Options_Route.post('/align/all', (req,res) =>{
    Process.startAlign(req.body.options, req.body.molecules).then( ( data ) =>{
        res.send(data)
    }).catch( err=>
        res.send(err)
    )
})
Options_Route.post('/align/onlydistance', (req,res) =>{
    Process.startAlign(req.body.options, req.body.molecules).then( (data) =>{        
        res.send(data)
    }).catch( err=>
        res.send(err)
    )   
})


module.exports = Options_Route