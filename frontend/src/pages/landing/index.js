import React from 'react'
import { Typography, Button, Box, Divider } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { Analize } from '../../constants/routes'


class Landing extends React.Component {

    render() {
        return (
            <>
                <Box>
                    <Box zIndex='snacbar'>
                        <Typography variant='h4'>ASPRAlign</Typography>
                        <Typography variant='body1'>
                            ASPRAlign permits show tree from RNA molecule, based on operation
                        </Typography>
                        <Divider />
                        <Button component={Link} to={Analize}>Click to enter</Button>
                    </Box>
                </Box>
            </>
        )
    }
}
export default Landing