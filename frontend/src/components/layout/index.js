import React from 'react'
import { Link } from 'react-router-dom'
import { Drawer,Toolbar, AppBar, List, ListItem,ListItemText, IconButton, withStyles } from '@material-ui/core'
import clsx from 'clsx'
import { Menu } from '@material-ui/icons'
import * as ROUTES from '../../constants/routes'

const drawerWidth = 240
const styles = theme => ({
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    menuButton: {
        marginRight: 36,
    },
    drawer: {
        position: 'float',
        whiteSpace: 'nowrap',
        width: drawerWidth,
    },
    content: {
        marginTop: "70px",   
    }
})

class Layout extends React.Component{
    constructor(props){
        super(props)
        this.state ={
            open: false
        } 

    }
    handleMenuOpen = () =>{
        this.setState({
            open: !this.state.open
        })
    }
    

    render(){
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
                    </List>
                </>           
            )
       
        return(<>
             <AppBar position="fixed" className={clsx(classes.appBar, open && classes.appBarShift)} >
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="Open drawer"
                            className={classes.menuButton}
                            //onClick={this.handleMenuOpen}
                        >
                            <Menu />
                        </IconButton>
                        {/* <Typography component="h1" variant="h6" color="inherit" noWrap>
                            {pathname.substr(1)}
                        </Typography> */}
                    </Toolbar>
                </AppBar>
                <Drawer open= {this.state.open} className={classes.drawer}>
                    {ListDrawer}
                </Drawer>
                <main className={classes.content}>
                    {children}
                </main>        
        </>)
    }

}
export default withStyles(styles)(Layout)