import React from 'react'
import { Typography } from '@material-ui/core'
import { UnfoldMore } from '@material-ui/icons'


class NodeLabel extends React.PureComponent {

    render() {
        const { nodeData } = this.props
        if (nodeData._children && nodeData._collapsed)
            return (
                <Typography variant='body2'>
                    <UnfoldMore />
                    {nodeData.name}
                </Typography>
            )
        else
            return (<Typography variant='body2'>{nodeData.name}</Typography>)
    }
}

export default NodeLabel