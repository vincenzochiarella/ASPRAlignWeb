import React from 'react'
import Tree from 'react-d3-tree'
import NodeLabel from './GraphNodeLabel'

const svgShape = {
    "shape": "circle",
    "shapeProps": {
        "r": 8,
        "fill": "#4DD0E1"
    },

}
const textLayout = {
    textAnchor: "start",
    x: 15,
    y: 15
}
class Graph extends React.Component {

    render() {
        if (this.props.tree) {
            return (<Tree data={JSON.parse(this.props.tree)}
                orientation='vertical'
                nodeSvgShape={svgShape}
                allowForeignObjects
                separation={{ siblings: 2, nonSiblings: 2 }}
                transitionDuration={1}
                nodeLabelComponent={{
                    render: <NodeLabel />,
                    // foreignObjectWrapper: {
                    //     width: "40px",
                    //     height: "30px",
                    // }
                }}
                // textLayout={textLayout}
                />)
        }
    }
}
export default Graph