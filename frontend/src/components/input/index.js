import React from 'react'
import { Fab, Grid, TextField, Zoom } from '@material-ui/core'
import { Settings } from '@material-ui/icons'
import { dotBracketNotation, arcAnnotationSequence } from '../../constants/regex'
import { OptionsContext } from '../../components/options/OptionsProvider'

class Input extends React.Component {

    validateInput = (aas, string) => {
        if (string) {
            if (aas && string.match(arcAnnotationSequence)) {
                return false
            }
            else if (!aas && string.match(dotBracketNotation)) {
                return false
            }
            else
                return true
        }
    }
    onShowOptions = () => {
        this.props.showOptions()
    }
    render() {
        return (
            <>
                <OptionsContext.Consumer>
                    {options => <Grid container direction='row' alignContent='center' justify='center' spacing={1}>
                        <Grid container item lg={11} md={11} xs={11} alignItems='stretch' spacing={4}>
                            <Grid item lg={options.opt.align ? 6 : 12} md={12} xs={11}>
                                <TextField
                                    id='molecule0'
                                    multiline
                                    error={this.validateInput(options.opt.aasinput, options.opt.molecule0)}
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
                                <Grid item lg={6} md={12}  xs={11}>
                                    <TextField
                                        id='molecule1'
                                        multiline
                                        error={this.validateInput(options.opt.aasinput, options.opt.molecule1)}
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
                        </Grid>
                        <Grid container item lg={1} md={1} xs={1} alignItems='stretch'>
                            <Grid item >
                                <Fab onClick={this.onShowOptions} color='secondary'>
                                    <Settings />
                                </Fab>
                            </Grid>
                        </Grid>

                    </Grid>}
                </OptionsContext.Consumer>
            </>
        )
    }
}
export default Input