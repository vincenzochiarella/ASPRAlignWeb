import React from 'react'
import { Grid, Paper, withStyles, Zoom } from '@material-ui/core'
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
            isFlipped: false
        }
        this.showOptions = this.showOptions.bind(this)
        this.onFlipCard = this.onFlipCard.bind(this)
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
    onFlipCard = (event) => {
        this.setState({
            isFlipped: !this.state.isFlipped
        })
        event.preventDefault()
    }

    render() {
        const { classes } = this.props
        const { showOptions, savedConfFile, FLAG_OPEN, isFlipped } = this.state

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
                                {options.resolvedOutput &&
                                    <Grid item lg sm>
                                        <ReactCardFlip isFlipped={isFlipped} flipDirection="orizontal">
                                            <Paper className={classes.fixedHeight} key='front'>
                                                <Graph tree={options.resolvedOutput} />
                                            </Paper>
                                            <Paper key='back'>
                                                <ReactJson src={JSON.parse(options.resolvedOutput)} />
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