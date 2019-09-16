import React from 'react'
import { Typography, Grid, Paper } from '@material-ui/core'
import { UnfoldMore } from '@material-ui/icons'
import { ReactComponent as ConcIcon } from '../../icons/Conc.svg';
import { ReactComponent as CrosIcon } from '../../icons/Cros.svg';
import { ReactComponent as NestIcon } from '../../icons/Nest.svg';
import { CROS, CONC, NEST } from '../../constants/rnaInteraction'

function replaceOperation(string) {
    if (string.match(CONC))
        return (<Paper> <ConcIcon width="75%" /></Paper>)
    if (string.match(CROS))
        return <CrosIcon width="20px" heigh="20px"/>
    if (string.match(NEST))
        return <NestIcon width="75%" />
    return ''
}
class NodeLabel extends React.PureComponent {

    render() {
        const { nodeData } = this.props
        if (nodeData._children && nodeData._collapsed)
            return (
                <Grid container justify='center' alignItem='center' direction='row'>
                    <Grid item>
                        {replaceOperation(nodeData.name)}
                    </Grid>
                    <Grid item>
                        <UnfoldMore />
                    </Grid>
                    <Grid item>
                        <Typography variant='caption'>
                            {nodeData.name}
                        </Typography>
                    </Grid>
                </Grid>
            )
        else
            return (
                <Grid container justify='center' alignItem='center' direction='row'>
                    <Grid item>
                        {replaceOperation(nodeData.name)}
                    </Grid>
                    <Grid item>
                        <Typography variant='caption'>
                            {nodeData.name}
                        </Typography>
                    </Grid>
                </Grid>
            )
    }
}

export default NodeLabel