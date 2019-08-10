
const pathFolder = require('path').resolve(__dirname, '../models/.');
var fs = require('fs')

const parser = require('./stringAnalizer')


module.exports.start = Elaboration = (options, input) => {
    return new Promise((resolve, reject) => {
        //da cancellare appena elaborato (oppure chiedere se lasciarlo)
        // fs.writeFile(pathFolder + '/Test1.txt', input, (err) => {
        //     if (err) {
        //         return console.log(err)
        //     }
        // })

        const JavaProcess = require('child_process').spawn('java', ['-jar', pathFolder + '\\ASPRAlign.jar', '-s', pathFolder + '\\Test1.txt'])
        console.log(JavaProcess.pid)

        JavaProcess.stdout.on('data', (data) => {
            resolve(parser.parseToJSONTree(data.toString()))
        })
        JavaProcess.stderr.on('data', (data) => {
            reject(data)
        });
        JavaProcess.on('error', (err) => {
            reject(err);
        });
    })
}

optionsSwitch = ( options, input, id ) => { 
    var optionsRequested = ['-jar', pathFolder + '\\ASPRAlign.jar']
    if(options.aasinput) {
        optionsRequested = optionsRequested.concat('-r'),
    }
    if(options.align){
        optionsRequested = optionsRequested.concat('-a'),
        optionsRequested = optionsRequested.concat(temporaryFile(input[0],1))
        optionsRequested = optionsRequested.concat(temporaryFile(input[1],2))
        if(options.chkpair) optionsRequested = optionsRequested.concat('-c')
        if(options.outdist) optionsRequested = optionsRequested.concat('-d')
        if(options.showscores) optionsRequested = optionsRequested.concat('-e')
    } else if( options.alg ){
        optionsRequested = optionsRequested.concat('-g')
        optionsRequested = optionsRequested.concat(temporaryFile(input[0],1))
    
    } else if( options.struct ){
        optionsRequested = optionsRequested.concat('-s')
        optionsRequested = optionsRequested.concat(temporaryFile(input[0],1))
    }
    if( options.latexout){
        optionsRequested = optionsRequested.concat('-l')
    }
    if( options.useconffile){
        optionsRequested = optionsRequested.concat('-l')
    }
    return optionsRequested
}
temporaryFile = ( input , inc ) => {
    //da cancellare appena finita l'elaborazione
    fs.writeFile(pathFolder + `/Test_${inc}.txt`, input, (err) => {
        if (err) {
            return console.log(err)
        }
    })
    return pathFolder + `/Test_${inc}.txt`
}
temporaryConffile = ( input ) =>{

}