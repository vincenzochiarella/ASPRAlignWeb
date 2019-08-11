
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
        // resolve(optionsSwitch(JSON.parse(options),JSON.parse(input)))
        // resolve()
        const args = optionsSwitch(JSON.parse(options), JSON.parse(input))
        const JavaProcess = require('child_process').spawn('java', args)
        console.log(JavaProcess.pid)
        JavaProcess.stdout.on('data', (data) => {
            console.log(data)
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

optionsSwitch = (options, input) => {
    var optionsRequested = ['-jar', pathFolder + '\\ASPRAlign.jar']
    if (options.aasinput) {
        optionsRequested.push('-r')
    }
    if (options.align) {
        optionsRequested.push('-a'),
            optionsRequested.push(temporaryFile(input.analize[0].molecule, 1))
        optionsRequested.push(temporaryFile(input.analize[1].molecule, 2))
        if (options.chkpair) optionsRequested.push('-c')
        if (options.outdist) optionsRequested.push('-d')
        if (options.showscores) optionsRequested.push('-e')
    } else if (options.alg) {
        optionsRequested.push('-g')
        optionsRequested.push(temporaryFile(input.analize[0].molecule, 1))

    } else if (options.struct) {
        optionsRequested.push('-s')
        optionsRequested.push(temporaryFile(input.analize[0].molecule, 1))
    }
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