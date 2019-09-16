import React from 'react'
import { Typography, Grid } from '@material-ui/core'
import { UnfoldMore } from '@material-ui/icons'
import { ReactComponent as ConcIcon } from '../../icons/Conc.svg';
import { ReactComponent as CrosIcon } from '../../icons/Cros.svg';
import { ReactComponent as NestIcon } from '../../icons/Nest.svg';
import { CROS, CONC, NEST, } from '../../constants/OperationRegex'


function getSvg(string) {
    return (<div>
        {string.match(CONC) && <ConcIcon width="20px" heigh="20px" />}
        {string.match(CROS) && <CrosIcon width="20px" heigh="20px" />}
        {string.match(NEST) && <NestIcon width="20px" heigh="20px" />}
    </div>
    )
}


function getColorOperation(leftChild, rightChild) {
    if (leftChild === rightChild)
        return {
                shapeProps: {
                    fill: 'green',
                }
        }
    else 
        return null
}

class NodeLabel extends React.PureComponent {

    render() {
        const { nodeData } = this.props
        nodeData._nodeSvgShape = getColorOperation( 1,1 )
        if (nodeData._children && nodeData._collapsed)
            return (
                <Grid container justify='center' alignItems='center' direction='row'>
                    
                    <Grid item>
                        {getSvg(nodeData.name)}
                    </Grid>

                    {/* {splitLabel(nodeData.name)} */}
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
                <Grid container justify='center' alignItems='center' direction='row'>
                    <Grid item>
                        {getSvg(nodeData.name)}
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