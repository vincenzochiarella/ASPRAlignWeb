import axios from 'axios'

export const runASPRALign = ( opt, mols ) =>{
    console.log(JSON.stringify(opt)+ "\n\r"+ JSON.stringify(mols))
    return axios.post('options/analize',{
        options: opt,
        molecules: mols
    }).then(res=>{
        console.log("From controller"+res.toString())
        return res
    })
    .catch(err=>console.log(err))
}