import React from 'react'
import { Paper, Grid, Typography, Fade, Button, Box } from '@material-ui/core'
import { KeyboardArrowDown, KeyboardArrowRight } from '@material-ui/icons'
import { ReactComponent as ConcIcon } from '../../icons/Conc.svg'
import { ReactComponent as CrosIcon } from '../../icons/Cross.svg'
import { ReactComponent as NestIcon } from '../../icons/Nest.svg'

class Legend extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            show: false
        }
        this.handleShow = this.handleShow.bind(this)
    }
    handleShow(event) {
        this.setState({
            show: !this.state.show
        })
        event.preventDefault()
    }
    render() {
        const { show } = this.state
        return (

            <Paper>
                <Box margin={3}>
                    <Grid container item direction='column'>
                        {!show && <Fade in={!show}>
                            <Grid container item direction='row' justify='center' alignItems='center'>
                                <Grid item lg='3'> <Button onClick={this.handleShow}><KeyboardArrowRight /></Button> </Grid>
                                <Grid item lg='9'> <Typography> Click to show legend</Typography></Grid>
                            </Grid>
                        </Fade>}
                        {show && <Fade in={show}>
                            <Grid item container >
                                <Grid container item direction='row'>
                                    <Grid item lg='3'> <Button onClick={this.handleShow}><KeyboardArrowDown /></Button> </Grid>
                                </Grid>
                                <Grid container item direction='row' justify='center' alignItems='center'>
                                    <Grid item lg='3'> <CrosIcon width="20px" heigh="20px" /> </Grid>
                                    <Grid item lg='9'> <Typography> = CROSS</Typography></Grid>
                                </Grid>
                                <Grid container item direction='row'justify='center' alignItems='center'>
                                    <Grid item lg='3'> <ConcIcon width="20px" heigh="20px" /> </Grid>
                                    <Grid item lg='9'> <Typography> = CONC</Typography></Grid>
                                </Grid>
                                <Grid container item direction='row' justify='center' alignItems='center'>
                                    <Grid item lg='3'> <NestIcon width="20px" heigh="20px" /> </Grid>
                                    <Grid item lg='9'> <Typography> = NEST</Typography></Grid>
                                </Grid>
                            </Grid>
                        </Fade>}
                    </Grid>
                </Box>
            </Paper>)
    }
}

export default Legend