import React from 'react'
import { Link } from 'react-router-dom'
import { Drawer, Toolbar, AppBar, List, ListItem, ListItemText, IconButton, withStyles } from '@material-ui/core'
import { Menu } from '@material-ui/icons'
import * as ROUTES from '../../constants/routes'

const styles = theme => ({
    content: {
        marginTop: "70px",
    }
})

class Layout extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false
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
                    {/* <Typography component="h1" variant="h6" color="inherit" noWrap>
                            {pathname.substr(1)}
                        </Typography> */}
                </Toolbar>
            </AppBar>
            <Drawer open={open} onClose={this.handleMenuOpen} docked={true}>
                {ListDrawer}
            </Drawer>
            <main className={classes.content}>
                {children}
            </main>
        </>)
    }

}
export default withStyles(styles)(Layout)