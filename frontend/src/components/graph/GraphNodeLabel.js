import React from 'react'
import { Typography, Grid, Box } from '@material-ui/core'
import { UnfoldMore } from '@material-ui/icons'
import { ReactComponent as ConcIcon } from '../../icons/Conc.svg';
import { ReactComponent as CrosIcon } from '../../icons/Cros.svg';
import { ReactComponent as NestIcon } from '../../icons/Nest.svg';
import { CROS, CONC, NEST } from '../../constants/OperationRegex'
import { splitChild } from '../../constants/regex'

import { ResultContext } from '../options/ResultProvider'

const defaultProps = {
    bgcolor: 'background.paper',
    borderRadius: 3,
    m: 2
  };

function getSvg(string) {
    return (
        <div>
            {string.match(CONC) && <ConcIcon width="20px" heigh="20px" />}
            {string.match(CROS) && <CrosIcon width="20px" heigh="20px" />}
            {string.match(NEST) && <NestIcon width="20px" heigh="20px" />}
        </div>
    )
}
function checkMatch( outType, node ){
    if(outType==='ALIGN'){
        var indexToSplit = node.indexOf(',')
        
        var arr = []
        arr.push(node.substring(0, indexToSplit) )
        arr.push(node.slice(indexToSplit + 1))
        //Check if left and right child match with the same operation
        if((arr[0].match(CONC)&&arr[1].match(CONC))||(arr[0].match(NEST)&&arr[1].match(NEST))||(arr[0].match(CROS)&&arr[1].match(CROS))||(arr[0].match('H')&&arr[1].match('H')))
            return "primary.main"
        if( arr[0].match('-')|| arr[1].match('-') )
            return "error.main"
        else
            return "action.main"        
    }
}

// function getColorOperation(outType, string) {
//     return 'text.primary'
// }
// {getColorOperation(result.getTreeType(), nodeData.name)}
class NodeLabel extends React.PureComponent {

    render() {
        const { nodeData } = this.props
        // if (nodeData._children && nodeData._collapsed)
            return (
                <Grid container justify='center' alignItems='center' direction='row'>

                    <Grid item>
                        {getSvg(nodeData.name)}
                    </Grid>
                    {/* {splitLabel(nodeData.name)} */}
                   {nodeData._children && nodeData._collapsed&&( <Grid item>
                        <UnfoldMore />
                    </Grid>)}
                    <Grid item>
                        <ResultContext.Consumer>
                            {result =>
                                <Box border={1} borderColor={checkMatch(result.getTreeType(), nodeData.name)} {...defaultProps} >
                                    <Typography variant='caption'>
                                        {nodeData.name}
                                    </Typography>
                                </Box>
                            }
                        </ResultContext.Consumer>

                    </Grid>
                </Grid>
            )
        // else
        //     return (
        //         <Grid container justify='center' alignItems='center' direction='row'>
        //             <Grid item>
        //                 {getSvg(nodeData.name)}
        //             </Grid>
        //             <Grid item>
        //                 <Typography variant='caption'>
        //                     {nodeData.name}
        //                 </Typography>
        //             </Grid>
        //         </Grid>
        //     )
    }
}

export default NodeLabel