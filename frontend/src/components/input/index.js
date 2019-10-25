import React from 'react'
import { Grid, TextField } from '@material-ui/core'

// import { dotBracketNotation, arcAnnotationSequence } from '../../constants/regex'
import { OptionsContext } from '../../components/options/OptionsProvider'

class Input extends React.Component {
    render() {
        return (
            <>
                <OptionsContext.Consumer>
                    {options => 
                        <Grid container item lg={12} md={12} xs={12} spacing={4}>
                            <Grid item lg={options.opt.align ? 6 : 12} md={12} xs={12}>
                                <TextField
                                    id='molecule0'
                                    multiline
                                    row={2}
                                    rowsMax={10}
                                    value={options.opt.molecule0}
                                    onChange={options.changeMolecule}
                                    fullWidth={true}
                                    variant="outlined"
                                    required
                                />
                            </Grid>
                            {options.opt.align && 
                                <Grid item lg={6} md={12}  xs={12}>
                                    <TextField
                                        id='molecule1'
                                        multiline
                                        row={2}
                                        rowsMax={10}
                                        value={options.opt.molecule1}
                                        onChange={options.changeMolecule}
                                        fullWidth={true}
                                        variant="outlined"
                                        required
                                    />
                                </Grid>
                            }
                        </Grid>}
                </OptionsContext.Consumer>
            </>
        )
    }
}
export default Input