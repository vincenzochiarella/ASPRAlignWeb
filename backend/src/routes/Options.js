const express = require('express')
const Options_Route = express.Router()
const cors = require('cors')

Options_Route.use(cors())
const Process = require('../builder/stringBuilder')


Options_Route.post('/analize', (req,res) =>{
    Process.startAnalize(req.body.options, req.body.molecules).then( ( data ) =>{        
        res.send(formatData('ok', data))        
    }).catch( err=>
        res.send(formatData('error', err))
    )  
})
Options_Route.post('/align/all', (req,res) =>{
    Process.startAlign(req.body.options, req.body.molecules).then( ( data ) =>{
        res.send(formatData('ok', data))        
    }).catch( err=>
        res.send(formatData('error', err))
    )  
})
Options_Route.post('/align/onlydistance', (req,res) =>{
    Process.startAlign(req.body.options, req.body.molecules).then( (data) =>{        
        res.send(formatData('ok', data))        
    }).catch( err=>
        res.send(formatData('error', err))
    )   
})
function formatData ( type, data ){
    switch (type) {
        case 'error':
            return ({ status: type, data: data })
        case 'ok':
            return ({ status: type, data: data })    
        default:
            return ({status: 'error', data: 'No such Data'});
    }
}


module.exports = Options_Route