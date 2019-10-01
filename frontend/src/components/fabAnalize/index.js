import React from 'react'
import { runASPRALign } from '../../controllers/OptionsController'
import { Send, Restore, SaveAlt, FlipToBack } from '@material-ui/icons'
import { Fab, Grid, Tooltip } from '@material-ui/core'
import { OptionsContext } from '../options/OptionsProvider';
import { ResultContext } from '../options/ResultProvider';


class FabAnalize extends React.Component {
    /**
     * FIXME: Why options and molecules are splitted
     */
    handleAnalize = (options, molecules, callbackResolved, callbackError) => event => {
        runASPRALign(options, molecules)
            .then(res => {
                console.log(res.data)
                if (res.data.status === 0)
                    callbackResolved(res.data)
                if (res.data.status === 1) {
                    callbackError(res.data)
                }
            }).catch(err => {
                console.log("Error server connection" + err)
            })
        event.preventDefault()
    }
    handleDownloader = (event) => {
        this.props.handleDownlaod()
        event.preventDefault()
    }
    handleFlipCard = (event) => {
        this.props.handleFlip()
        event.preventDefault()
    }

    render() {
        return (
            <OptionsContext.Consumer>
                {options =>
                    <ResultContext.Consumer>
                        {result => <> <Grid item container spacing={3}>
                            <Grid item>
                                <Fab
                                    variant='extended'
                                    color='primary'
                                    // disabled={!options.checkMolecule()}
                                    onClick={this.handleAnalize(options.opt, options.getMoleculesArray(), result.callbackResolved, result.callbackError)}
                                >                <Send />
                                    Run ASPRALign
                                </Fab>
                            </Grid>
                            <Grid item>
                                <Fab
                                    color='secondary'
                                    onClick={options.handleReset} >
                                    <Restore />
                                </Fab>
                            </Grid>
                            {result.isDownlaodable() &&
                                <Grid item>
                                    <Tooltip title='Downlaod' >
                                        <Fab
                                            color='secondary'
                                            onClick={this.handleDownloader} >
                                            <SaveAlt />
                                        </Fab>
                                    </Tooltip>
                                </Grid>
                            }
                            {result.isDownlaodable() &&
                                <Grid item>
                                    <Tooltip title='Show JSON file instead of Tree Graph' >
                                        <Fab
                                            color='secondary'
                                            onClick={this.handleFlipCard}
                                        >
                                            <FlipToBack />
                                        </Fab>
                                    </Tooltip>
                                </Grid>
                            }
                        </Grid>
                        </>}
                    </ResultContext.Consumer>
                }
            </OptionsContext.Consumer>
        )

    }
}

export default FabAnalize
