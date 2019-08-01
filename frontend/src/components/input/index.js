import React from 'react'
import {  FormControl, InputLabel, Input, FormHelperText   } from '@material-ui/core'


class Input extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            text: ''
        }
    }

    render(){
        return(
            <>
                <FormControl>
                    <InputLabel htmlFor='Input'></InputLabel>
                    <Input multiline></Input>
                    <FormHelperText > Insert Extended Dot-Brackets</FormHelperText>
                </FormControl>

            </>
        )
    }
}
export default Input