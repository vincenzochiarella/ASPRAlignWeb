import React from 'react'
import Graph from '../../components/graph'
import { Grid, Paper, withStyles, Zoom } from '@material-ui/core'

import InputMolecule from '../../components/input'
import Options from '../../components/options'


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



const style = theme => ({
    fixedHeight: {
        height: '50vh'
    }
})

const defaultOptions = {
    align: false,
    chkpair: false,
    outdist: false,
    showscores: false,
    alg: false,
    latexout: false,
    out: false,
    aasinput: false,
    useconffile: false,
    out_text: '*.txt',
    struct: false
}
class Analize extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            workBenchMode: false,
            trees: treeEx,
            opts: defaultOptions,
            showOptions: false
        }
        this.showOptions = this.showOptions.bind(this)
    }
    showOptions (){
        this.setState({
            showOptions: !this.state.showOptions
        })
    }
    componentWillMount() {

    }

    render() {
        const { classes } = this.props
        const { trees, showOptions, opts} = this.state
        return (
            <>
                <Grid container alignItems='scratch' direction='column' spacing={4} justify='center'>
                    <Grid item lg sm>
                        <InputMolecule showOptions={this.showOptions} align={opts.align}/>
                    </Grid>
                    <Grid item lg sm>
                        <Zoom in={showOptions}>
                            <Paper elevation={8}>
                                <Options opt={opts}/>
                            </Paper>
                        </Zoom>
                    </Grid>
                    <Grid item lg sm>
                        <Paper elevation={4} className={classes.fixedHeight}>
                            <Graph tree={trees} />
                        </Paper>
                    </Grid>
                </Grid >

            </>
        )
    }

}
export default withStyles(style)(Analize)