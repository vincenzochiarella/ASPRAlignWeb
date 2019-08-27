import React from 'react'
import { Link } from 'react-router-dom'
import {
    Drawer, Toolbar, AppBar, List, ListItem, ListItemText,
    IconButton, withStyles, Slide, Typography, Chip
} from '@material-ui/core'
import { SpeedDial, SpeedDialIcon, SpeedDialAction } from '@material-ui/lab'
import {
    Menu, Edit, Send, Restore, SaveAlt, FlipToBack, Share,
    DragIndicator, SettingsEthernet, TextFields, AttachFile
} from '@material-ui/icons'
import { compose } from 'recompose'
import { withRouter } from 'react-router-dom'
import * as ROUTES from '../../constants/routes'

import { OptionsContext } from '../options/OptionsProvider'
import { runASPRALign } from '../../controllers/OptionsController'
import DownloadManager from '../../components/configuration/Downloader'


const styles = theme => ({
    content: {
        marginTop: "70px",
    },
    speedDial: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(3),
    },
    chipContainer: {
        left: theme.spacing(6)
    },
    chipsStyle: {
        color: '#ffffff'
    }
})

class Layout extends React.Component {
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
    handleMenuOpen = () => {
        this.setState({
            open: !this.state.open
        })
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
    getChips = (options) => {
        var chips = []
        if (options.opt.struct)
            chips.push({ name: 'Structural', icon: <Share /> })
        if (options.opt.align)
            chips.push({ name: 'Alignment', icon: <Share /> })
        if (options.opt.alg)
            chips.push({ name: 'Algebraic', icon: <Share /> })
        if (options.opt.chkpair)
            chips.push({ name: 'Checkpair', icon: <DragIndicator /> })
        if (options.opt.outdist)
            chips.push({ name: 'Only distance', icon: <SettingsEthernet /> })
        if (options.opt.aasinput)
            chips.push({ name: 'Arc Annotated Sequence', icon: <TextFields /> })
        else if (!options.opt.aasinput)
            chips.push({ name: 'Dot-Bracket Notation', icon: <TextFields /> })
        if (options.opt.useconffile)
            chips.push({ name: 'Conffile', icon: <AttachFile /> })
        return chips
    }

    render() {
        const { children, classes, location } = this.props
        const { open, dialOpen, openDownloader } = this.state

        const ListDrawer = (
            <>
                <List>
                    <ListItem button component={Link}
                        to={ROUTES.Analize}>
                        <ListItemText>
                            Analizer
                            </ListItemText>
                    </ListItem>
                    <ListItem button component={Link}
                        to={ROUTES.Credits}>
                        <ListItemText>
                            Credits
                                </ListItemText>
                    </ListItem>
                    <ListItem button component={Link}
                        to={ROUTES.Documentation}>
                        <ListItemText>
                            Docs
                        </ListItemText>
                    </ListItem>
                </List>
            </>
        )

        return (<OptionsContext.Consumer>
            {options => <>
                <AppBar position="fixed" color='primary' >
                    <Toolbar >
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="Open drawer"
                            onClick={this.handleMenuOpen}
                        >
                            <Menu />
                        </IconButton>
                        <Typography component="h1" variant="h6" color="inherit" noWrap>
                            {location.pathname.substr(1).toUpperCase()}
                        </Typography>
                        <div className={classes.chips}>
                            {location.pathname.substr(1)==='analizer'&&this.getChips(options).map(chip =>
                                (<Chip
                                    size='small'
                                    color='secondary'
                                    className={classes.chipsStyle}
                                    icon={chip.icon}
                                    label={chip.name} />)
                            )}
                        </div>

                    </Toolbar>
                </AppBar>
                <Drawer open={open} onClose={this.handleMenuOpen} >
                    {ListDrawer}
                </Drawer>
                <main className={classes.content}>
                    {children}
                </main>
                <DownloadManager
                    showDownloaderM={openDownloader}
                    handleDownloaderM={this.handleDownloader} />

                <Slide in={options.validation.isMoleculeCorrect }>
                    <SpeedDial
                        className={classes.speedDial}
                        ariaLabel="Menu"
                        onClick={this.expandSpeedDial}
                        open={dialOpen}
                        direction='up'
                        icon={<SpeedDialIcon openIcon={<Edit />} />}
                    >
                        {(options.validation.isMoleculeCorrect) &&
                            <SpeedDialAction
                                key={'Analize'}
                                icon={<Send />}
                                tooltipTitle={'Analize'}
                                onClick={this.handleSpeedDialAction('Analize', options.opt, options.getMoleculesArray(), options.callbackResolved)}
                            />}
                        {(options.validation.isMoleculeCorrect) &&
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
                </Slide>
            </>}
        </OptionsContext.Consumer>

        )
    }

}
export default compose(
    withStyles(styles),
    withRouter
)(Layout)