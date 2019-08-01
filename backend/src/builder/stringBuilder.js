const { spawn } = require('child_process');
const pathFolder = require('path').resolve(__dirname, '../models');


const JavaProcess = spawn('java',['-jar', pathFolder+ 'ASPRAlign.jar'])
