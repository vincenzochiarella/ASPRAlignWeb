import React from 'react'
import { Fab, Grid, TextField, Zoom } from '@material-ui/core'
import { Settings } from '@material-ui/icons'

import { OptionsContext } from '../../components/options/OptionsProvider'

class Input extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            molecule: '',
            molecule2: ''
        }
    }
    onChange = name => (event) => {
        this.setState({
            [name]: event.target.value
        })
    }
    onShowOptions = () => {
        this.props.showOptions()
    }
    onSaveConfigFile = (configs) => {
        this.setState({
            configfile: configs
        })
    }
    render() {
        // const { molecule, molecule2 } = this.state
        return (
            <>
                <OptionsContext.Consumer>
                    {options => <Grid container direction='row' alignContent='center' justify='center' spacing={2}>
                        <Grid container item lg={11} md={10} sm={9} alignItems='stretch' spacing={4}>
                            <Grid item lg={options.opt.align? 6 : 12} md sm>
                                <TextField
                                    id='molecule0'
                                    multiline
                                    rows={2}
                                    value={options.molecule0}
                                    onChange={options.changeMolecule}
                                    fullWidth={true}
                                    variant="outlined"
                                />
                            </Grid>
                            {options.opt.align && <Zoom in={true}>
                                <Grid item lg={6} md sm>
                                    <TextField
                                        id='molecule1'
                                        multiline
                                        rows={2}
                                        value={options.molecule1}
                                        onChange={options.changeMolecule}
                                        fullWidth={true}
                                        variant="outlined"
                                    />
                                </Grid>
                            </Zoom>}
                        </Grid>
                        <Grid container item lg={1} md={2} sm={3} alignItems='stretch'>
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