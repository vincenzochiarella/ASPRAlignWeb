
const pathFolderJar = require('path').resolve(__dirname, '../models/.');
const pathFolderTmp = require('path').resolve(__dirname, '../tmp/.');
const fs = require('fs')
const uniqueFilename = require('unique-filename')

const StringAnalizerJSON = require('./stringAnalizer')
/***
 * 
 * TODO: unify code
 */
module.exports.startAnalize = Elaboration = (options, input) => {
    return new Promise((resolve, reject) => {
        var tmpFolderName = uniqueFilename(pathFolderTmp)
        fs.mkdirSync(tmpFolderName)

        const args = optionsSwitch(options, input, tmpFolderName)
        const JavaProcess = require('child_process').spawn('java', args)

        console.log(JavaProcess.pid + ": " + args)
        let arrayOut = []
        JavaProcess.stdout.on('data', (data) => {
            arrayOut.push(data.toString())
        })       
        JavaProcess.stderr.on('data', (data) => { 
            arrayOut.push(data.toString())
        });

        JavaProcess.on('exit', (code)=>{
            switch (code) {
                case 0:                    
                    resolve(StringAnalizerJSON.parseToJSONTree(arrayOut[0]))
                    break;
                case 2:
                    reject(arrayOut[0])            
                //Error 4 aligmnent problem
                default:
                    break;
            }
            removeTempFiles(tmpFolderName)
        })
    })
}

module.exports.startAlign = Elaboration = (options, input) => {
    return new Promise((resolve, reject) => {
        var tmpFolderName = uniqueFilename(pathFolderTmp)
        console.log(tmpFolderName)
        fs.mkdirSync(tmpFolderName)
        const args = optionsSwitch(options, input, tmpFolderName)

        const JavaProcess = require('child_process').spawn('java', args)
        console.log(JavaProcess.pid + ": " + args)
        let arrayOut = []
        let arrayError = []
        JavaProcess.stdout.on('data', (data) => {
            arrayOut.push(data.toString())
        })
        JavaProcess.stderr.on('data', (data) => {
            arrayError.push(data.toString())
        });
        JavaProcess.on('close', (close) => {            
            if (options.align && !options.outdist) {
                removeTempFiles(tmpFolderName)
                resolve(StringAnalizerJSON.parseToJSONTreeAndDistance(arrayOut))
            }
            else if (options.align && options.outdist) {
                removeTempFiles(tmpFolderName)
                resolve(StringAnalizerJSON.parseToJSONDistance(arrayOut[0]))
            }
            else if (arrayOut.length() === 0)
                reject("No output data")
        })
    })
}
/**
 * 
 * @param {Object} options Json object where are stored options passed from UI
 * @param {Object} input Array of inputs molecule 
 * @param {String} tempDir Temporary directory where put calculation file
 * @returns {String} Array of args to run script
 */
function optionsSwitch(options, input, tempDir){


    var optionsRequested = ['-jar', pathFolderJar + '\\ASPRAlign.jar']
    if (options.aasinput) {
        optionsRequested.push('-r')
    }
    if (options.align) {
        optionsRequested.push('-a'),
            optionsRequested.push(temporaryFile(input.analize[0].molecule, tempDir))
        optionsRequested.push(temporaryFile(input.analize[1].molecule, tempDir))
        if (options.outdist) optionsRequested.push('-d')
    } else if (options.alg) {
        optionsRequested.push('-g')
        optionsRequested.push(temporaryFile(input.analize[0].molecule, tempDir))

    } else if (options.struct) {
        optionsRequested.push('-s')
        optionsRequested.push(temporaryFile(input.analize[0].molecule, tempDir))
    }
    if (options.chkpair)
        optionsRequested.push('-c')
    if (options.latexout) {
        optionsRequested.push('-l')
    }
    if (options.useconffile) {
        optionsRequested.push('-n')
        optionsRequested.push(temporaryConffile(options.conffile, tempDir))
    }
    return optionsRequested
}
/**
 * 
 * @param {string} input Molecule string
 * @param {string} tempDir Path of temporary file
 */
function temporaryFile(input, tempDir) {
    //da cancellare appena finita l'elaborazione
    const filename = uniqueFilename(tempDir)
    console.log(filename)
    fs.writeFile(filename + '.txt', input, (err) => {
        if (err) {
            return console.log(err)
        }
    })
    return filename + '.txt'
}
/**
 * 
 * @param {object} conf Pass configuration file
 * @param {string} tempDir  Temporary directory created for elaboration
 * @return {string} Path of config file
 */
function temporaryConffile(conf, tempDir) {
    var string = `INSERT_OPERATOR_COST=${conf.insertOp}\nDELETE_OPERATOR_COST=${conf.deletingOp}\nREPLACE_OPERATOR_COST=${conf.replaceOp}\nINSERT_HAIRPIN_COST=${conf.deleteHair}\nDELETE_HAIRPIN_COST=${conf.insertHair}\nCROSSING_MISMATCH_COST=${conf.crossingMism}`
    fs.writeFile(tempDir + `\\ConfFile.txt`, string, (err) => {
        if (err) {
            return console.log(err)
        }
    })
    return tempDir + `\\ConfFile.txt`
}
/**
 * 
 * @param {string} path Dir to remove
 */

function removeTempFiles(path) {
    if (fs.existsSync(path)) {
        fs.readdirSync(path).forEach(function (file, index) {
            var curPath = path + "/" + file;
            if (fs.lstatSync(curPath).isDirectory()) { // recurse
                removeTempFiles(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
}