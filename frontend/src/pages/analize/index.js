import React from 'react'
import { Grid, Paper, withStyles, Zoom, Typography } from '@material-ui/core'
import ReactJson from 'react-json-view'
import ReactCardFlip from 'react-card-flip'

import Graph from '../../components/graph'
import InputMolecule from '../../components/input'
import Options from '../../components/options/index'
import { OptionsContext } from '../../components/options/OptionsProvider'
import ConfFile from '../../components/configuration/ConfFile'

const style = theme => ({
    fixedHeight: {
        height: '90vh'
    },
    speedDial: {
        position: 'absolute',
        bottom: theme.spacing(2)
    }
})

class Analize extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showOptions: false
        }
        this.showOptions = this.showOptions.bind(this)
    }
    showOptions() {
        this.setState({
            showOptions: !this.state.showOptions
        })
    }

    render() {
        const { classes } = this.props
        const { showOptions } = this.state

        return (
            <>
                <OptionsContext.Consumer>
                    {options =>
                        <>
                            <ConfFile />
                            <Grid container alignItems='stretch' direction='column' spacing={4} justify='center'>
                                <Grid item lg md sm>
                                    <InputMolecule showOptions={this.showOptions} />
                                </Grid>
                                {showOptions && <Grid item lg md sm>
                                    <Zoom in={showOptions}>
                                        <Paper elevation={8}>
                                            <Options/>
                                        </Paper>
                                    </Zoom>
                                </Grid>}
                                {options.resolved.distance!==0.0&&
                                    <Grid item lg sm>
                                        <Typography variant='h6'>Alignment distance: </Typography>
                                        <Typography variant='h3' color='secondary'>{options.resolved.distance}</Typography>                                        
                                    </Grid>
                                }
                                {options.resolved.tree &&
                                    <Grid item lg sm>
                                        <ReactCardFlip isFlipped={options.flipped} flipDirection="horizontal">
                                            <Paper className={classes.fixedHeight} key='front'>
                                                <Graph tree={options.resolved.tree} /> 
                                            </Paper>
                                            <Paper key='back'>
                                                <ReactJson 
                                                    src={JSON.parse(options.resolved.tree)}
                                                    name={false}
                                                    displayDataTypes={false}
                                                    displayObjectSize={false} />
                                            </Paper>
                                        </ReactCardFlip>
                                    </Grid>}
                            </Grid >
                        </>}
                </OptionsContext.Consumer>

            </>
        )
    }

}
export default withStyles(style)(Analize)