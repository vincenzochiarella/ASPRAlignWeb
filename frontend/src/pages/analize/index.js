import React from 'react'
import Graph from '../../components/graph'
import { Grid, Paper, withStyles, Zoom, Slide } from '@material-ui/core'
import { SpeedDial, SpeedDialIcon, SpeedDialAction } from '@material-ui/lab'
import { Send, Restore, SaveAlt, Edit } from '@material-ui/icons'

import InputMolecule from '../../components/input'
import Options from '../../components/options/index'
import ConfFile from '../../components/options/conffile'

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
    },
    speedDial: {
        position: 'absolute',
        bottom: theme.spacing(2)
    }
})

const defaultOptions = {
    align: true,
    chkpair: false,
    outdist: true,
    showscores: false,
    alg: false,
    latexout: false,
    out: false,
    aasinput: false,
    useconffile: false,
    out_text: '*.txt',
    struct: false
}

const speedDialActions = [
    { icon: <Send />, name: 'Analize' },
    { icon: <Restore />, name: 'Reset' },
    { icon: <SaveAlt />, name: 'Download data' },
]


class Analize extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            workBenchMode: false,
            trees: treeEx,
            opts: defaultOptions,
            showOptions: false,
            FLAG_OPEN: true,
            savedConfFile: false,
            configfile: '',
            enableSending: false,
            expandSpeedDial: false
        }
        this.showOptions = this.showOptions.bind(this)
        this.onChangeOptions = this.onChangeOptions.bind(this)
        this.onCloseDialog = this.onCloseDialog.bind(this)
    }
    showOptions() {
        this.setState({
            showOptions: !this.state.showOptions
        })
    }
    onChangeOptions = (opt) => {
        this.setState({
            opts: opt
        })
        if (opt.useconffile === false) {
            this.setState({
                savedConfFile: false
            })
        }
        //TODO verify option validity
    }

    expandSpeedDial = event => {
        this.setState({
            expandSpeedDial: !this.state.expandSpeedDial
        })
        event.preventDefault()
    }

    handleSpeedDialAction = type => event => {
        switch (type) {
            case 'Analize':
                //Send to backend
                break;
            case 'Reset':
                //Reset conffile and options
                break;
            case 'Download data':
                //Action download outputted tree
                break;
            default:
                break;
        }
        event.preventDefault()
    }



    onCloseDialog() {
        this.setState({
            FLAG_OPEN: false
        })
    }
    onSaveConfigFile = (config) => {
        this.setState({
            configfile: config,
            savedConfFile: true
        })
    }
    componentWillMount() {

    }

    render() {
        const { classes } = this.props
        const { trees, showOptions, opts, savedConfFile, FLAG_OPEN, enableSending } = this.state
        // console.log( 'Align to input', opts.align)
        console.log(opts.useconffile && !savedConfFile)
        return (
            <>
                <ConfFile showConfigFile={opts.useconffile && !savedConfFile && FLAG_OPEN} closeDialog={this.onCloseDialog} saveConfigurationFile={this.onSaveConfigFile} />
                <Grid container alignItems='stretch' direction='column' spacing={4} justify='center'>
                    <Grid item lg md sm>
                        <InputMolecule showOptions={this.showOptions} align={opts.align} />
                    </Grid>
                    {showOptions && <Grid item lg md sm>
                        <Zoom in={showOptions}>
                            <Paper elevation={8}>
                                <Options
                                    opt={opts}
                                    onChangeOpt={this.onChangeOptions}
                                    editConfigFile={this.onEditConfiFile}
                                    savedConfigFile={savedConfFile}
                                />
                            </Paper>
                        </Zoom>
                    </Grid>}
                    <Grid item lg sm>
                        <Paper elevation={4} className={classes.fixedHeight}>
                            <Graph tree={trees} />
                        </Paper>
                    </Grid>

                    <Grid item lg sm>
                        <Slide direction='up' in={enableSending} >
                            <SpeedDial
                                className={classes.speedDial}
                                onClick={this.expandSpeedDial}
                                onFocus={this.expandSpeedDial}
                                icon={<SpeedDialIcon openIcon={<Edit />} />}
                            >
                                {speedDialActions.map(actions => (
                                    <SpeedDialAction
                                        key={actions.name}
                                        icon={actions.icon}
                                        tooltipTitle={actions.name}
                                        onClick={this.handleSpeedDialAction(actions.name)}
                                    />
                                ))}

                            </SpeedDial>
                        </Slide>
                    </Grid>

                </Grid >

            </>
        )
    }

}
export default withStyles(style)(Analize)