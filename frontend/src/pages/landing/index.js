import React from 'react'
import { Typography, Grid, Paper, Button, Box, Divider } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { Analize } from '../../constants/routes'


class Landing extends React.Component {
    render() {
        return (
            <>
                <Grid container justify='center' >
                    <Grid item>
                        <Paper>
                            <Box padding={6}>
                                <Grid container spacing={3} direction='column'  alignItems='center'>
                                    <Grid item>
                                        <Typography variant='h4'>ASPRAlign</Typography>
                                    </Grid>
                                    <Grid item>
                                        <Divider />
                                    </Grid>
                                    <Grid item>
                                        <Button component={Link} to={Analize}>Click to enter</Button>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </>
        )
    }
}
export default Landing