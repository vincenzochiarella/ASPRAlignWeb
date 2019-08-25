import React from 'react'
import { Typography,    Button, Box, Divider, withStyles } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { Analize } from '../../constants/routes'
import Background from '../../components/background'
const style = theme => ({
    background: {
        width: '100%',
        heigth: '100%'
    },
    overlay: {
        marginTop: '2px'
    }
})

class Landing extends React.Component {

    render() {
        const { classes } = this.props
        return (
            <>
                <Box>
                    <Box className={classes.background} zIndex='tooltip'>
                        <Background />
                    </Box>
                    <Box zIndex='snacbar'>
                        <Typography variant='h4'>ASPRAlign</Typography>
                        <Divider />
                        <Button component={Link} to={Analize}>Click to enter</Button>
                    </Box>
                </Box>
            </>
        )
    }
}
export default withStyles(style)(Landing)