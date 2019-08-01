import React from 'react'
import Tree from 'react-d3-tree'


class Graph extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            tree: [],
            loading: true
        }
    }
    componentWillMount() {
        this.setState({
            tree: this.props.tree
        })
    }

    render() {
        const { tree } = this.state
        return (
            <>                
                <Tree data={tree} orientation='vertical' />
            </>
        )
    }
}
export default Graph