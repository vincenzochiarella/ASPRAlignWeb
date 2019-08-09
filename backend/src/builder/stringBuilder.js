
const pathFolder = require('path').resolve(__dirname, '../models/.');
var fs = require('fs')

const parser = require('./stringAnalizer')


module.exports.start = Elaboration = (options, input) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(pathFolder + '/Test1.txt', input, (err) => {
            if (err) {
                return console.log(err)
            }
        })
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