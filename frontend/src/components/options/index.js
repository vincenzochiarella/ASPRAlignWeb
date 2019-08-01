import React from 'react'
import { Grid, FormControlLabel, Divider, Zoom, Checkbox, TextField,Paper } from '@material-ui/core'

class Options extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            align: this.props.opt.align,
            chkpair: this.props.opt.chkpair,
            outdist: this.props.opt.outdist,
            showscores: this.props.opt.showscores,
            alg: this.props.opt.alg,
            latexout: this.props.opt.latexout,
            out: this.props.opt.out,
            aasinput: this.props.opt.aasinput,
            useconffile: this.props.opt.useconffile,            
            out_text: this.props.opt.out_text,
            struct: this.props.opt.struct,           

        }
    }

    //to be a correct call one of align, alg and struct had to be choosen 
    handleChange = selected => event => {
        this.setState({
            [selected]: event.target.value
        })
        event.preventDefault()
    }
    onChange = changedvalue => event => {
        this.setState({
            [changedvalue]: event.target.value
        })
        event.preventDefault()
    }
    render() {
        const { align, chkpair, outdist, showscores, latexout, alg, aasinput, out_text, out, struct, useconffile } = this.state
        return (
            <>
                <Grid container direction='column' alignItems='stretch'>

                    <Grid item >
                        <FormControlLabel
                            control={<Checkbox checked={align} onChange={this.handleChange('align')} value={align} />}
                            label="Align two given structures producing alignment tree and distance"
                        />
                        <Divider />
                    </Grid>
                    <Grid item >
                        <FormControlLabel
                            control={<Checkbox checked={chkpair} onChange={this.handleChange('chkpair')} value={chkpair} />}
                            label="Check the presence of only standard Watson-Crick and wobble base pairing (disabled by default)"
                        />
                        <Divider />
                    </Grid>
                    <Grid item >
                        <Zoom in={align}>
                        <>
                            <FormControlLabel
                                control={<Checkbox checked={outdist} onChange={this.handleChange('outdist')} value={outdist} />}
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
                                control={<Checkbox checked={showscores} onChange={this.handleChange('showscores')} value={showscores} />}
                                label="Show current values of edit scores used for alignment"
                            />
                            <Divider />
                            </>
                        </Zoom>
                    </Grid>
                    <Grid item >
                        <FormControlLabel
                            control={<Checkbox checked={alg} onChange={this.handleChange('alg')} value={alg} />}
                            label="Produce the algebraic RNA tree corresponding to the given structure"
                        />
                        <Divider />
                    </Grid>
                    <Grid item >
                        <FormControlLabel
                            control={<Checkbox checked={latexout} onChange={this.handleChange('latexout')} value={latexout} />}
                            label="Output in LaTeX format instead of linearised tree"
                        />
                        <Divider />
                    </Grid>
                    <Grid item >
                        <FormControlLabel
                            control={<Checkbox checked={useconffile} onChange={this.handleChange('useconffile')} value={useconffile} />}
                            label=" Use the specified configuration file instead of the default one"
                        />
                        <Divider />
                    </Grid>

                    <Grid item >
                        <FormControlLabel
                            control={<Checkbox checked={out} onChange={this.handleChange('out')} value={out} />}
                            label=" Output result on the given file instead of standard output"
                        />
                        <Zoom in={out}>
                            <Paper>
                                <TextField
                                id='main-textarea'
                                label='Custom file name'
                                multiline={true}
                                value={out_text}
                                onChange={this.onChange('out_text')}
                                fullWidth={true}
                                variant="outlined"
                                />             
                            </Paper> 
                        </Zoom>
                        <Divider />
                    </Grid>
                    <Grid item >
                        <FormControlLabel
                            control={<Checkbox checked={aasinput} onChange={this.handleChange('aasinput')} value={aasinput} />}
                            label="Input Arc Annotated Sequence file(s) instead of Extended Dot-Bracket Notation file(s)"
                        />
                        <Divider />
                    </Grid>
                    <Grid item >
                        <FormControlLabel
                            control={<Checkbox checked={struct} onChange={this.handleChange('struct')} value={struct} />}
                            label="Input Arc Annotated Sequence file(s) instead of Extended Dot-Bracket Notation file(s)"
                        />
                        <Divider />
                    </Grid>
                </Grid>
            </>
        )
    }
}

export default Options