
const pathFolder = require('path').resolve(__dirname, '../models/.');
var fs = require('fs')
// const JavaProcess = child.spawn('java',['-jar', pathFolder+'\\ASPRAlign.jar','-s','Test1.txt','-o','prova.txt'])

module.exports.start = Elaboration = (options, input) => {
    fs.writeFile(pathFolder+'/Test1.txt', input, (err)=>{
        if(err){
            return console.log(err)
        }
    } )
    // console.log(pathFolder+'\\ASPRAlign.jar')
    const JavaProcess = require('child_process').spawn('java',['-jar', pathFolder+'\\ASPRAlign.jar','-s',pathFolder+'\\Test1.txt','-l','-o',pathFolder+'\\Test1Tex.tex'])
    JavaProcess.stdout.on('data', (data)=>{
        console.log(data.toString())
        return data.toString()
    })
    JavaProcess.stderr.on("data", function (data) {
        console.log(data.toString());
    });
}