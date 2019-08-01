import React from 'react'
import Graph from '../../components/graph'
import { Grid, Paper } from '@material-ui/core'


const treeEx = [{
    name: 'O',
    children: [
        {
            name: 'O',
            children: [
                {
                    name: '(X,2)',
                    children: [
                        {
                            name: 'Sov',
                            children: [
                                {
                                    name: 'Sov',
                                    children: [
                                        {
                                            name: 'H(4,7)'
                                        },
                                        {
                                            name: 'H(3,13)'
                                        }
                                    ]
                                },
                                {
                                    name: 'H(2,15)'
                                }
                            ]
                        },
                        {
                            name: 'H(10,18)'
                        }
                    ]

                },
                {
                    name: '(X,2)',
                    children: [
                        {
                            name: '(X,1)',
                            children: [
                                {
                                    name: 'Sov',
                                    children: [
                                        {
                                            name: 'O',
                                            children: [
                                                {
                                                    name: 'Sov',
                                                    children: [
                                                        {
                                                            name: 'H(22,24)'
                                                        },
                                                        {
                                                            name: 'H(21,26)'
                                                        }
                                                    ]
                                                },
                                                {
                                                    name: 'Sov',
                                                    children: [
                                                        {
                                                            name: '(X,1)',
                                                            children: [
                                                                {
                                                                    name: 'H(29,33)'
                                                                },
                                                                {
                                                                    name: 'H(31,34)'
                                                                }
                                                            ]

                                                        },
                                                        {
                                                            name: 'H(28,35)'
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            name: 'H(20,44)'
                                        }
                                    ]
                                },
                                {
                                    name: 'H(36,47)'
                                }
                            ]
                        },
                        {
                            name: 'H(41,50)'
                        }
                    ]
                }
            ]
        },
        {
            name: '(X,1)',
            children: [
                {
                    name: 'H(53,59)'
                },
                {
                    name: 'H(55,61)'
                }
            ]
        }
    ]
}]




class Analize extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            workBenchMode: false,
            trees: treeEx
        }
    }
    componentWillMount() {
        // this.setState({
        //     trees: this.state.trees.concat({
        //         example
        //     })
        // })
    }

    render() {
        const { trees } = this.state
        return (
            <>
                <Grid container alignContent='center' direction='column'>
                    {/* <Grid item>
                        <Input />
                    </Grid> */}
                    <Grid item >
                        <Paper>
                            <Graph tree={trees} />
                        </Paper>
                    </Grid>
                </Grid>

            </>
        )
    }

}
export default Analize