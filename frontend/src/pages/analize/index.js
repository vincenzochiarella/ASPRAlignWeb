import React from 'react'
import { Grid, Paper, withStyles, Zoom, Typography } from '@material-ui/core'
import ReactJson from 'react-json-view'
import ReactCardFlip from 'react-card-flip'

import Graph from '../../components/graph'
import InputMolecule from '../../components/input'
import Options from '../../components/options/index'
import { OptionsContext } from '../../components/options/OptionsProvider'
import ConfFile from '../../components/options/ConfFile'

const style = theme => ({
    fixedHeight: {
        height: '50vh'
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
            showOptions: false,
            FLAG_OPEN: true,
            savedConfFile: false,
        }
        this.showOptions = this.showOptions.bind(this)
        this.onCloseDialog = this.onCloseDialog.bind(this)
    }
    showOptions() {
        this.setState({
            showOptions: !this.state.showOptions
        })
    }
    onCloseDialog() {
        this.setState({
            FLAG_OPEN: false
        })
    }
    onSaveConfigFile = (config) => {
        this.setState({
            configfile: config,
            savedConfFile: true
        })
    }

    render() {
        const { classes } = this.props
        const { showOptions, savedConfFile, FLAG_OPEN } = this.state

        return (
            <>
                <OptionsContext.Consumer>
                    {options =>
                        <>
                            <ConfFile
                                showConfigFile={options.opt.useconffile && !savedConfFile && FLAG_OPEN}
                                closeDialog={this.onCloseDialog} />
                            <Grid container alignItems='stretch' direction='column' spacing={4} justify='center'>
                                <Grid item lg md sm>
                                    <InputMolecule showOptions={this.showOptions} />
                                </Grid>
                                {showOptions && <Grid item lg md sm>
                                    <Zoom in={showOptions}>
                                        <Paper elevation={8}>
                                            <Options
                                                editConfigFile={this.onEditConfiFile}
                                                savedConfigFile={savedConfFile}
                                            />
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
                                                <ReactJson src={JSON.parse(options.resolved.tree)} />
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