import React from 'react'
import { Typography, Link, Grid, Box } from '@material-ui/core';
import { ClipLoader } from 'react-spinner'

import JsonFileImport from '../../docs/Credits.json';

class Credits extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            text: null,
            loading: true
        }
    }
    componentWillMount() {
        this.setState({ text: JsonFileImport, loading: false })
    }
    render() {
        const { loading, text } = this.state

        if (loading)
            return (
                <ClipLoader
                    sizeUnit={"px"}
                    size={150}
                    color={'#123abc'}
                    loading={true}
                />)
        else {
            return (<>
                <Grid container direction='column' justify='flex-start'>
                    <Grid item >
                        <Typography variant='h2' color='primary' >
                            {text.title}
                        </Typography>
                    </Grid>
                    {text.body.map(p => (

                        <Box paddingLeft={4}  >
                            <Grid item>
                                <Typography variant='body1' color='inherit'>
                                    {p.paragraph}
                                </Typography>
                            </Grid>
                        </Box>)
                    )}
                    <Box paddingLeft={2}  >
                        <Grid item>
                            <Typography variant='h4'>
                                Contacts
                            </Typography>
                        </Grid>
                        {text.refs.map(ref => (
                            <Box paddingLeft={4}  >
                                <Grid item>
                                    <Link color='inherit' href={"mailto:" + ref.link}>
                                        {ref.text}
                                    </Link>
                                </Grid>
                            </Box>
                        )
                        )}
                    </Box>

                </Grid>
            </>)
        }
    }
}
export default Credits