import React from 'react'
import { Grid, TextField, Zoom } from '@material-ui/core'

// import { dotBracketNotation, arcAnnotationSequence } from '../../constants/regex'
import { OptionsContext } from '../../components/options/OptionsProvider'

class Input extends React.Component {
        // validateInput = (aas, string) => {
        //     if (string) {
        //         if (aas && string.match(arcAnnotationSequence)) {
        //             return false
        //         }
        //         else if (!aas && string.match(dotBracketNotation)) {
        //             return false
        //         }
        //         else
        //             return true
        //     }
        // }

    render() {
        return (
            <>
                <OptionsContext.Consumer>
                    {options => 
                        <Grid container item lg={12} md={12} xs={12} alignItems='stretch' spacing={4}>
                            <Grid item lg={options.opt.align ? 6 : 12} md={12} xs={12}>
                                <TextField
                                    id='molecule0'
                                    multiline
                                    // error={this.validateInput(options.opt.aasinput, options.opt.molecule0)}
                                    row={2}
                                    rowsMax={10}
                                    value={options.opt.molecule0}
                                    onChange={options.changeMolecule}
                                    fullWidth={true}
                                    variant="outlined"
                                    required
                                />
                            </Grid>
                            {options.opt.align && <Zoom in={true}>
                                <Grid item lg={6} md={12}  xs={12}>
                                    <TextField
                                        id='molecule1'
                                        multiline
                                        // error={this.validateInput(options.opt.aasinput, options.opt.molecule1)}
                                        row={2}
                                        rowsMax={10}
                                        value={options.opt.molecule1}
                                        onChange={options.changeMolecule}
                                        fullWidth={true}
                                        variant="outlined"
                                        required
                                    />
                                </Grid>
                            </Zoom>}
                        </Grid>}
                </OptionsContext.Consumer>
            </>
        )
    }
}
export default Input