import React from 'react'
import { Grid, Paper, withStyles, Typography } from '@material-ui/core'
import ReactJson from 'react-json-view'
import ReactCardFlip from 'react-card-flip'

import Graph from '../../components/graph'
import Chips from '../../components/chips'
import Options from '../../components/options/index'
import FabAnalize from '../../components/fabAnalize'
import ConfFile from '../../components/configuration/ConfFile'

import DownlaodDialog from '../../components/configuration/Downloader'
import ErrorDialog from '../../components/error'
import { ResultContext } from '../../components/options/ResultProvider';


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
            openDownloadDialog: false,
            openErrorDialog: false,
            flippedCard: false
        }
        this.handleDownlaod = this.handleDownlaod.bind(this)
        this.handleFlip = this.handleFlip.bind(this)
    }
    handleDownlaod() {
        this.setState(prevState => ({ openDownloadDialog: !prevState.openDownloadDialog }))
    }
    handleFlip() {
        this.setState(prevState => ({ flippedCard: !prevState.flippedCard }))
    }

    render() {
        const { classes } = this.props
        const { openDownloadDialog, flippedCard } = this.state
        return (<>
            <ConfFile />
            <ErrorDialog />
            <DownlaodDialog
                open={openDownloadDialog}
                handleDownlaod={this.handleDownlaod}
            />
            <Grid container alignItems='stretch' direction='column' spacing={4} justify='center'>
                <Grid item>
                    <Options />
                </Grid>

                <Grid item>
                    <Chips />
                </Grid>
                <Grid item>
                    <FabAnalize
                        handleDownlaod={this.handleDownlaod}
                        handleFlip={this.handleFlip}
                    />
                </Grid>
                <ResultContext.Consumer>
                    {results => (
                        <>
                            {results.status === 0 && results.optionsUsed.align && results.optionsUsed.outdist &&
                                <Grid item lg sm>
                                    <Typography variant='h6'>Alignment distance: </Typography>
                                    <Typography variant='h3' color='secondary'>{results.resolved.distance}</Typography>
                                </Grid>}
                            {results.status === 0 && !results.optionsUsed.outdist &&
                                <Grid item lg sm>
                                    <ReactCardFlip flipDirection="horizontal" isFlipped={flippedCard} >
                                        <Paper className={classes.fixedHeight} key='front'>
                                            <Graph tree={results.resolved.tree} />
                                        </Paper>
                                        <Paper key='back'>
                                            <ReactJson
                                                src={JSON.parse(results.resolved.tree)}
                                                name={false}
                                                displayDataTypes={false}
                                                displayObjectSize={false} />
                                        </Paper>
                                    </ReactCardFlip>
                                </Grid>}
                        </>)}</ResultContext.Consumer>
            </Grid >
        </>
        )
    }

}
export default withStyles(style)(Analize)