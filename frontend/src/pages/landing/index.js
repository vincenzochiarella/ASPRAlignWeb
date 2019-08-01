import React from 'react'
import { Typography, Grid, Paper, Button } from '@material-ui/core'


class Landing extends React.Component {
    render() {
        return (
            <>
                <Grid container justify='center' >
                    <Grid item>
                        <Paper>
                            <Typography>Welcome to ASPRAlign WebInterface</Typography>
                            <Button>Click to enter</Button>
                        </Paper>
                    </Grid>
                </Grid>
            </>
        )
    }
}
export default Landing