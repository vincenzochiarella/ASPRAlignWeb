import axios from 'axios'

export const runASPRALign = ( opt, mols ) =>{
    return axios.post('options/analize',{
        options: opt,
        molecules: mols
    }).then(res=>{       
        return res
    })
    .catch(err=>console.log(err))
}