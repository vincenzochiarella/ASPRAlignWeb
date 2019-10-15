import axios from 'axios'
/**
 * 
 * @param {JSON} opt 
 * @param {JSON} mols 
 */
export const runASPRALign = (opt, mols) => {
    
    if (!opt.align) {
        return axios.post('options/analize', {
            options: opt,
            molecules: mols
        }).then(res => {
            return res
        }).catch(err => console.log(err))
    }
    else if(opt.align&&!opt.outdist){
        return axios.post('options/align/all', {
            options: opt,
            molecules: mols
        }).then(res => {        
            return res
        }).catch(err => console.log(err))
    }
    else if(opt.align&&opt.outdist){
        return axios.post('options/align/onlydistance', {
            options: opt,
            molecules: mols
        }).then(res => {
            return res
        }).catch(err => console.log(err))
    }
}