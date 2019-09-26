import React from 'react'
import { Link } from 'react-router-dom'
import {
    Drawer, Toolbar, AppBar, List, ListItem, ListItemText,
    IconButton, withStyles, Hidden, Button
} from '@material-ui/core'

import {
    Menu
} from '@material-ui/icons'
import { compose } from 'recompose'
import { withRouter } from 'react-router-dom'
import * as ROUTES from '../../constants/routes'


import LogoUnicam from '../../resources/unicam-universita-di-camerino-1.png'
import LogoBigData from '../../resources/logo-bigdata.png'

const styles = theme => ({
    content: {
        marginTop: "70px",
    },
    logos: {
        position: 'flex',
        right: theme.spacing(2)
    },
    toolbarButtons: {
        marginLeft: 'auto'
    },


})
const MenuButton = withStyles(theme => ({
    root: {
        color: '#fff',
        '&:hover': {
            color: '#fff',
            opacity: 1,
        },
        '&:focus': {
            color: '#fff',
        },
    }
}))(Button);

class Layout extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false,
            dialOpen: false,
            openDownloader: false
        }
    }
    handleMenuOpen = () => {
        this.setState({
            open: !this.state.open
        })
    }



    render() {
        const { children, classes } = this.props
        const { open } = this.state

        const MenuList = (
            <>
                <List>
                    <ListItem button component={Link}
                        to={ROUTES.Analize}>
                        <ListItemText>
                            Aspralign
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
        const LgMenu = (
            <>
                <MenuButton component={Link}
                    to={ROUTES.Analize}>
                    ASPRALign
                </MenuButton>
                <MenuButton component={Link}
                    to={ROUTES.Credits}>
                    Credits
                </MenuButton>
                <MenuButton component={Link}
                    to={ROUTES.Documentation}>
                    Docs
                </MenuButton>
            </>
        )

        return (
            <>
                <AppBar position="fixed" color='primary'>
                    <Toolbar className={classes.toolbar} >
                        <Hidden mdUp>
                            <IconButton
                                edge="start"
                                color="inherit"
                                aria-label="Open drawer"
                                onClick={this.handleMenuOpen}
                            >
                                <Menu />
                            </IconButton>
                        </Hidden>
                        <img src={LogoUnicam} height="35" width="80" alt='Unicam Logo' />
                        <img src={LogoBigData} height="65" width="65"  alt='Bioscience Logo'/>
                        <Hidden smDown>
                            <div className={classes.toolbarButtons}>
                                {LgMenu}
                            </div>
                        </Hidden>
                    </Toolbar>
                </AppBar>
                <Drawer open={open} onClose={this.handleMenuOpen} >
                    {MenuList}
                </Drawer>
                <main className={classes.content}>
                    {children}
                </main>
            </>
        )
    }

}
export default compose(
    withStyles(styles),
    withRouter
)(Layout)