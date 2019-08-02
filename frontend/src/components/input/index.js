import React from 'react'
import { Fab, Grid, TextField, Zoom } from '@material-ui/core'
import { Settings } from '@material-ui/icons'




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
    onSaveConfigFile = ( configs ) =>{
        this.setState({
            configfile: configs
        })
    }
    render() {
        const { molecule, molecule2 } = this.state
        const { align } = this.props
        // console.log(align)

        return (
            <>

                
                <Grid container direction='row' alignContent='center' justify='center' spacing={6}>
                    <Grid container item lg={11} md={10} sm={9} alignItems='stretch' direction='column'>
                        <Grid item >
                            <TextField
                                id='main-textarea'
                                multiline={true}
                                value={molecule}
                                onChange={this.onChange('molecule')}
                                fullWidth={true}
                                variant="outlined"
                            />
                        </Grid>
                        <Zoom in={align}>
                            <Grid item >
                                <TextField
                                    id='main-textarea'
                                    multiline={true}
                                    value={molecule2}
                                    onChange={this.onChange('molecule2')}
                                    fullWidth={true}
                                    variant="outlined"
                                />
                            </Grid>
                        </Zoom>
                    </Grid>
                    <Grid container item lg={1} md={2} sm={3} alignItems='stretch'>
                        <Grid item >
                            <Fab onClick={this.onShowOptions} color='secondary'>
                                <Settings />
                            </Fab>
                        </Grid>
                    </Grid>

                </Grid>
            </>
        )
    }
}
export default Input