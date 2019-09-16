const express = require('express')
const Options_Route = express.Router()
const cors = require('cors')

Options_Route.use(cors())
const Process = require('../builder/stringBuilder')


Options_Route.post('/analize', (req,res) =>{
    Process.startAnalize(req.body.options, req.body.molecules).then( ( data ) =>{ 
        res.send(formatData('ok', data, req.body.options))        
    }).catch( err=>{
        res.send(formatData('error', err, req.body.options))}
    )  
})
Options_Route.post('/align/all', (req,res) =>{
    Process.startAlign(req.body.options, req.body.molecules).then( ( data ) =>{
        res.send(formatData('ok', data, req.body.options))        
    }).catch( err=>
        res.send(formatData('error', err, req.body.options))
    )  
})
Options_Route.post('/align/onlydistance', (req,res) =>{
    Process.startAlign(req.body.options, req.body.molecules).then( (data) =>{        
        res.send(formatData('ok', data, req.body.options))        
    }).catch( err=>
        res.send(formatData('error', err, req.body.options))
    )   
})
function formatData ( type, data, optionsUsed ){
    switch (type) {
        case 'error':
            return ({ status: 1, data: data, optionsUsed: optionsUsed })
        case 'ok':
            return ({ status: 0, data: data, optionsUsed: optionsUsed })    
        default:
            return ({status: 'error', data: 'No such Data'});
    }
}


module.exports = Options_Route