
const pathFolder = require('path').resolve(__dirname, '../models/.');
var fs = require('fs')

const StringAnalizerJSON = require('./stringAnalizer')


module.exports.startAnalize = Elaboration = (options, input) => {
    return new Promise((resolve, reject) => {
        const args = optionsSwitch(options, input)
        const JavaProcess = require('child_process').spawn('java', args)
        console.log(JavaProcess.pid + ": "+ args)
        var arrayOut = []
        JavaProcess.stdout.on('data', (data) => {
            arrayOut.push(data.toString())                
        })
        JavaProcess.on('close', (close) =>{
            if(!options.align) {//ulteriore check per evitare errori
                resolve(StringAnalizerJSON.parseToJSONTree(arrayOut[0]))
            } 
            else 
                reject("No output data")
        })        
        JavaProcess.stderr.on('data', (data) => {
            console.log("Errore: " + data.toString())
            // reject(data)
        });
        JavaProcess.on('error', (err) => {
            // reject(err);
        });
    })
}
module.exports.startAlign = Elaboration = (options, input) => {
    return new Promise((resolve, reject) => {
        const args = optionsSwitch(options, input)
        const JavaProcess = require('child_process').spawn('java', args)
        console.log(JavaProcess.pid + ": "+ args)
        var arrayOut = []
        var arrayError = []
        JavaProcess.stdout.on('data', (data) => {
            arrayOut.push(data.toString())
        }) 
        JavaProcess.stderr.on('data', (data) => {
            arrayError.push(data.toString())
        });
        JavaProcess.on('error', (err) => {
            arrayError.push(data.toString())
        });        
        JavaProcess.on('close', (close) =>{
            if(options.align&&!options.outdist) {//ulteriore check per evitare errori
                resolve(StringAnalizerJSON.parseToJSONTreeAndDistance(arrayOut))
            } 
            else if (options.align&&options.outdist){
                resolve(StringAnalizerJSON.parseToJSONDistance(arrayOut[0]))
            }
            else if ( arrayOut.length()===0)
                reject("No output data")
        })


    })
}

optionsSwitch = (options, input) => {
    var optionsRequested = ['-jar', pathFolder + '\\ASPRAlign.jar']
    if (options.aasinput) {
        optionsRequested.push('-r')
    }
    if (options.align) {
        optionsRequested.push('-a'),
            optionsRequested.push(temporaryFile(input.analize[0].molecule, 1))
        optionsRequested.push(temporaryFile(input.analize[1].molecule, 2))
        
        if (options.outdist) optionsRequested.push('-d')
        // if (options.showscores) optionsRequested.push('-e')
    } else if (options.alg) {
        optionsRequested.push('-g')
        optionsRequested.push(temporaryFile(input.analize[0].molecule, 1))

    } else if (options.struct) {
        optionsRequested.push('-s')
        optionsRequested.push(temporaryFile(input.analize[0].molecule, 1))
    }
    if (options.chkpair) 
        optionsRequested.push('-c')
    if (options.latexout) {
        optionsRequested.push('-l')
    }
    if (options.useconffile) {
        optionsRequested.push('-n')
        optionsRequested.push(temporaryConffile(options.conffile))
    }
    return optionsRequested
}

temporaryFile = (input, inc) => {
    //da cancellare appena finita l'elaborazione
    fs.writeFile(pathFolder + `\\Test${inc}.txt`, input, (err) => {
        if (err) {
            return console.log(err)
        }
    })
    return pathFolder + `\\Test${inc}.txt`
}
temporaryConffile = (conf) => {
    var string = `INSERT_OPERATOR_COST=${conf.insertOp}\nDELETE_OPERATOR_COST=${conf.deletingOp}\nREPLACE_OPERATOR_COST=${conf.replaceOp}\nINSERT_HAIRPIN_COST=${conf.deleteHair}\nDELETE_HAIRPIN_COST=${conf.insertHair}\nCROSSING_MISMATCH_COST=${conf.crossingMism}`
    fs.writeFile(pathFolder + `\\ConfFile.txt`, string, (err) => {
        if (err) {
            return console.log(err)
        }
    })
    return pathFolder + `\\ConfFile.txt`
}