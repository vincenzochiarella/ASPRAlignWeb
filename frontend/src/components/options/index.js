import React from 'react'
import {
    Grid, FormControlLabel, Divider, Zoom, Checkbox, TextField, Paper,
    Box
} from '@material-ui/core'

import { OptionsContext } from '../options/OptionsProvider'


class Options extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            opt: this.props.opt
        }
        this.handleChange = this.handleChange.bind(this)
        this.onChangeText = this.onChangeText.bind(this)
    }

    //to be a correct call one of align, alg and struct had to be choosen 
    handleChange = selected => event => {
        const optChanged = Object.assign(
            {},
            this.state.opt,
            { [selected]: !this.state.opt[selected] }
        )
        this.setState({
            opt: optChanged
        })        
        //USE consumer
        //this.props.onChangeOpt(optChanged)
        
        this.changeProviderValues(optChanged)
        event.preventDefault()
    }
    onChangeText = changedvalue => event => {
        const optChanged = Object.assign(
            {},
            this.state.opt,
            { [changedvalue]: event.target.value }
        )
        this.setState({
            opt: optChanged
        })
        //USE consumer
        this.changeProviderValues(optChanged)

        // this.props.onChangeOpt(optChanged)
        event.preventDefault()
    }
    changeProviderValues = ( opts ) => {
        // console.log(opts)
        return(<OptionsContext.Consumer>
            {opt =>(
                opt.changeOpts(opts)
                )}
        </OptionsContext.Consumer>)
    }
    render() {
        const { align, chkpair, outdist, showscores, latexout, alg, aasinput, out_text, out, struct, useconffile } = this.state.opt

        return (
            <>
                <Box margin={4}>
                    <Grid container direction='column' alignItems="stretch">

                        <Grid item >
                            <FormControlLabel
                                control={<Checkbox onClick={this.handleChange('align')} checked={align} />}
                                label="Align two given structures producing alignment tree and distance"
                            />
                            <Divider />
                        </Grid>
                        <Grid item >
                            <FormControlLabel
                                control={<Checkbox onClick={this.handleChange('chkpair')} checked={chkpair} />}
                                label="Check the presence of only standard Watson-Crick and wobble base pairing (disabled by default)"
                            />
                            <Divider />
                        </Grid>
                        <Grid item >
                            <Zoom in={align}>
                                <>
                                    <FormControlLabel
                                        control={<Checkbox checked={outdist} onClick={this.handleChange('outdist')} />}
                                        label="Output only distance, no alignment tree"
                                    />
                                    <Divider />
                                </>
                            </Zoom>
                        </Grid>
                        <Grid item >
                            <Zoom in={align}>
                                <>
                                    <FormControlLabel
                                        control={<Checkbox onClick={this.handleChange('showscores')} checked={showscores} />}
                                        label="Show current values of edit scores used for alignment"
                                    />
                                    <Divider />
                                </>
                            </Zoom>
                        </Grid>
                        <Grid item >
                            <FormControlLabel
                                control={<Checkbox onClick={this.handleChange('alg')} checked={alg} />}
                                label="Produce the algebraic RNA tree corresponding to the given structure"
                            />
                            <Divider />
                        </Grid>
                        <Grid item >
                            <FormControlLabel
                                control={<Checkbox onClick={this.handleChange('latexout')} checked={latexout} />}
                                label="Output in LaTeX format instead of linearised tree"
                            />
                            <Divider />
                        </Grid>
                        <Grid item >
                            <FormControlLabel
                                control={<Checkbox onClick={this.handleChange('useconffile')} checked={useconffile} />}
                                label=" Use the specified configuration file instead of the default one"
                            />
                            <Divider />
                        </Grid>

                        <Grid item >
                            <FormControlLabel
                                control={<>
                                    <Checkbox onClick={this.handleChange('out')} checked={out} />
                                    <Zoom in={out}>
                                        <Paper>
                                            <TextField
                                                id='main-textarea'
                                                label='Custom file name'
                                                multiline={true}
                                                value={out_text}
                                                onChange={this.onChangeText('out_text')}
                                                fullWidth={true}
                                                variant="outlined"
                                            />
                                        </Paper>
                                    </Zoom>
                                </>}
                                label=" Output result on the given file instead of standard output"
                            />

                            <Divider />
                        </Grid>
                        <Grid item >
                            <FormControlLabel
                                control={<Checkbox onClick={this.handleChange('aasinput')} checked={aasinput} />}
                                label="Input Arc Annotated Sequence file(s) instead of Extended Dot-Bracket Notation file(s)"
                            />
                            <Divider />
                        </Grid>
                        <Grid item >
                            <FormControlLabel
                                control={<Checkbox onClick={this.handleChange('struct')} checked={struct} />}
                                label="Produce the structural RNA tree corresponding to the given structure"
                            />
                            <Divider />
                        </Grid>
                    </Grid>
                </Box>
            </>
        )
    }
}

export default Options