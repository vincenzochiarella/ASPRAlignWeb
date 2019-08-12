import React from 'react'
import Tree from 'react-d3-tree'

class Graph extends React.Component {
    render() {
        if (this.props.tree) {
            return (<Tree data={JSON.parse(this.props.tree)} orientation='vertical' />)
        }
    }
}
export default Graph