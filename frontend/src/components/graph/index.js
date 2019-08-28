import React from 'react'
import Tree from 'react-d3-tree'
import NodeLabel from './Node'

const svgShape = {
    "shape": "circle",
    "shapeProps": {
        "r": 8,
        "fill": "#4DD0E1",
        "stroke": "#4DD0E1",
        "strokeWidth": 2
    },

}

class Graph extends React.Component {
    render() {
        if (this.props.tree) {
            return (<Tree data={JSON.parse(this.props.tree)}
                orientation='vertical'
                nodeSvgShape={svgShape}
                allowForeignObjects
                separation={{siblings: 2, nonSiblings: 3}}
                transitionDuration={0}
                nodeLabelComponent={{
                    render: <NodeLabel />,
                    foreignObjectWrapper: {
                        y:-5,
                        x:5
                    }
                }} />)
        }
    }
}
export default Graph