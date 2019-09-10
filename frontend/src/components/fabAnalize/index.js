import React from 'react'

import { OptionsContext } from '../options/OptionsProvider'
import { runASPRALign } from '../../controllers/OptionsController'
import DownloadManager from '../../components/configuration/Downloader'
import { Edit, Send, Restore, SaveAlt, FlipToBack } from '@material-ui/icons'
import { SpeedDial, SpeedDialIcon, SpeedDialAction } from '@material-ui/lab'
import { withStyles } from '@material-ui/core'

const style = theme => ({
    speedDial: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(3),
    }
})

class FabAnalize extends React.Children {
    constructor(props) {
        super(props)
        this.state = {
            open: false,
            dialOpen: false,
            openDownloader: false
        }
        this.expandSpeedDial = this.expandSpeedDial.bind(this)
        this.handleDownloader = this.handleDownloader.bind(this)
    }
    handleSpeedDialAction = (type, options, molecules, callback) => event => {
        switch (type) {
            case 'Analize':
                runASPRALign(options, molecules)
                    .then(res => callback(res.data))
                    .catch(err => console.log(err))
                break;
            case 'Reset':
                //Reset conffile and options
                break;
            case 'Download data':
                this.handleDownloader()
                break;
            case 'Flip card':
                callback()
                break;
            default:
                break;
        }
        event.preventDefault()
    }
    handleDownloader = () => {
        this.setState({
            openDownloader: !this.state.openDownloader
        })
    }
    expandSpeedDial = event => {
        this.setState({
            dialOpen: !this.state.dialOpen
        })
        event.preventDefault()
    }

    render() {
        return (
            <OptionsContext.Consumer> {options =>
                <Fade in={openDownloader}><DownloadManager
                    showDownloaderM={openDownloader}
                    handleDownloaderM={this.handleDownloader} />
                </Fade>
                <Fade in={options.checkMolecule()}>
                    <SpeedDial
                        className={classes.speedDial}
                        ariaLabel="Menu"
                        onClick={this.expandSpeedDial}
                        open={dialOpen}
                        direction='up'
                        icon={<SpeedDialIcon openIcon={<Edit />} />}
                    >
                        {(options.checkMolecule()) &&
                            <SpeedDialAction
                                key={'Analize'}
                                icon={<Send />}
                                tooltipTitle={'Analize'}
                                onClick={this.handleSpeedDialAction('Analize', options.opt, options.getMoleculesArray(), options.callbackResolved)}
                            />}
                        {(options.checkMolecule()) &&
                            <SpeedDialAction
                                key={'Reset'}
                                icon={<Restore />}
                                tooltipTitle={'Reset'}
                                onClick={this.handleSpeedDialAction('Reset', options.opt, options.getMoleculesArray(), options.callbackResolved)}
                            />
                        }
                        {options.downloadable &&
                            <SpeedDialAction
                                key={'Download data'}
                                icon={<SaveAlt />}
                                tooltipTitle={'Download data'}
                                onClick={this.handleSpeedDialAction('Download data', '', '', '')}
                            />}
                        {options.downloadable &&
                            <SpeedDialAction
                                key={'Flip card'}
                                icon={<FlipToBack />}
                                tooltipTitle={'Flip card'}
                                onClick={this.handleSpeedDialAction('Flip card', '', '', options.handleFlipCard)}
                            />}
                    </SpeedDial>
                </Fade>}
            </OptionsContext.Consumer>)
    }
}

export default withStyles(style)(FabAnalize)