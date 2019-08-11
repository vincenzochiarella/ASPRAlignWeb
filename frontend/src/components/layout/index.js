import React from 'react'
import { Link } from 'react-router-dom'
import { Drawer, Toolbar, AppBar, List, ListItem, ListItemText, IconButton, withStyles, Slide, Typography } from '@material-ui/core'
import { SpeedDial, SpeedDialIcon, SpeedDialAction } from '@material-ui/lab'
import { Menu, Edit, Send, Restore, SaveAlt } from '@material-ui/icons'
import { compose } from 'recompose'
import { withRouter } from 'react-router-dom'
import * as ROUTES from '../../constants/routes'

import { OptionsContext } from '../options/OptionsProvider'


const styles = theme => ({
    content: {
        marginTop: "70px",
    },
    speedDial: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(3),
    }
})
const speedDialActions = [
    { icon: <Send />, name: 'Analize' },
    { icon: <Restore />, name: 'Reset' },
    { icon: <SaveAlt />, name: 'Download data' },
]

class Layout extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false,
            dialOpen: false,
            dialShow: false,
        }
        this.expandSpeedDial = this.expandSpeedDial.bind(this)
    }
    handleMenuOpen = () => {
        this.setState({
            open: !this.state.open
        })
    }
    expandSpeedDial = event => {
        this.setState({
            dialOpen: !this.state.dialOpen
        })
        event.preventDefault()
    }
    handleSpeedDialAction = type => event => {
        switch (type) {
            case 'Analize':
                //Send to backend
                break;
            case 'Reset':
                //Reset conffile and options
                break;
            case 'Download data':
                //Action download outputted tree
                break;
            default:
                break;
        }
        event.preventDefault()
    }

    render() {
        const { children, classes, location } = this.props
        const { open, dialOpen, dialShow } = this.state

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

        return (<>
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
                </Toolbar>
            </AppBar>
            <Drawer open={open} onClose={this.handleMenuOpen} docked={true}>
                {ListDrawer}
            </Drawer>
            <main className={classes.content}>
                {children}
            </main>
            <OptionsContext.Consumer>
                {options =>
                    <Slide in={options.opt.align}>
                        <SpeedDial
                            className={classes.speedDial}
                            ariaLabel="Menu"
                            onClick={this.expandSpeedDial}
                            onFocus={this.expandSpeedDial}
                            open={dialOpen}
                            direction='up'
                            icon={<SpeedDialIcon openIcon={<Edit />} />}
                        >
                            {speedDialActions.map(actions => (
                                <SpeedDialAction
                                    key={actions.name}
                                    icon={actions.icon}
                                    tooltipTitle={actions.name}
                                    onClick={this.handleSpeedDialAction(actions.name)}
                                />
                            ))}
                        </SpeedDial>
                    </Slide>}
            </OptionsContext.Consumer>

        </>)
    }

}
export default compose(
    withStyles(styles),
    withRouter
)(Layout)