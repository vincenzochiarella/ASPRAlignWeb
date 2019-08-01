import React from 'react'
import { Fab, Grid, TextField, Zoom } from '@material-ui/core'
import { Settings } from '@material-ui/icons'




class Input extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            molecule: '',
            molecule2: '',
            align: false
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
    render() {
        const { molecule, molecule2, align } = this.state

        return (
            <>
                <Grid container direction='row' alignContent='center' justify='center' spacing={6}>
                    <Grid item lg={10} md={8} sm>
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
                        <Grid item lg={10} md={8} sm>
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
                    <Grid item lg={2} md={4} sm>
                        <Fab onClick={this.onShowOptions} color='secondary'>
                            <Settings />
                        </Fab>
                    </Grid>
                </Grid>
            </>
        )
    }
}
export default Input