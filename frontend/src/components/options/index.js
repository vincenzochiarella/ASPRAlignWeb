import React from 'react'
import {
    Grid, FormControlLabel, Divider, Zoom, Checkbox, TextField, Paper,
    Box
} from '@material-ui/core'

import { OptionsContext } from '../options/OptionsProvider'
import { extensionTxt } from '../../constants/regex'

class Options extends React.Component {
    validateInput = (filename) => {
        if (filename)
            if (filename.match(extensionTxt))
                return false
        return true
    }
    render() {

        return (
            <>
                <OptionsContext.Consumer>
                    {options => (
                        <Grid container direction='column' alignItems="stretch">
                            <Box margin={4}>
                                <Grid item >
                                    <FormControlLabel
                                        control={<Checkbox onClick={options.changeOpts('align')} checked={options.opt.align} />}
                                        label="Align two given structures producing alignment tree and distance"
                                    />
                                    <Divider />
                                </Grid>
                                {options.opt.align&&<><Grid item >
                                    <FormControlLabel
                                        control={<Checkbox onClick={options.changeOpts('chkpair')} checked={options.opt.chkpair} />}
                                        label="Check the presence of only standard Watson-Crick and wobble base pairing (disabled by default)"
                                    />
                                    <Divider />
                                </Grid>
                                <Grid item >
                                    <FormControlLabel
                                        control={<Checkbox onClick={options.changeOpts('outdist')} checked={options.opt.outdist} />}
                                        label="Output only distance, no alignment tree"
                                    />
                                    <Divider />
                                </Grid>
                                <Grid item >
                                    <FormControlLabel
                                        control={<Checkbox onClick={options.changeOpts('showscores')} checked={options.opt.showscores} />}
                                        label="Show current values of edit scores used for alignment"
                                    />
                                    <Divider />
                                </Grid></>}
                                <Grid item >
                                    <FormControlLabel
                                        control={<Checkbox onClick={options.changeOpts('alg')} checked={options.opt.alg} />}
                                        label="Produce the algebraic RNA tree corresponding to the given structure"
                                    />
                                    <Divider />
                                </Grid>
                                <Grid item >
                                    <FormControlLabel
                                        control={<Checkbox onClick={options.changeOpts('latexout')} checked={options.opt.latexout} />}
                                        label="Output in LaTeX format instead of linearised tree"
                                    />
                                    <Divider />
                                </Grid>
                                <Grid item >
                                    <FormControlLabel
                                        control={<Checkbox onClick={options.changeOpts('useconffile')} checked={options.opt.useconffile} />}
                                        label=" Use the specified configuration file instead of the default one"
                                    />
                                    <Divider />
                                </Grid>
                                <Grid item >
                                    <FormControlLabel
                                        control={<>
                                            <Checkbox onClick={options.changeOpts('out')} checked={options.opt.out} />
                                            {options.opt.out && <Zoom in={options.opt.out}>
                                                <Paper>
                                                    <TextField
                                                        id='customfile'
                                                        label='Custom file name'
                                                        error={this.validateInput(options.opt.out_text)}
                                                        value={options.opt.out_text}
                                                        onChange={options.changeOutFile}
                                                        fullWidth={true}
                                                        variant="outlined"
                                                    />
                                                </Paper>
                                            </Zoom>}
                                        </>}
                                        label=" Output result on the given file instead of standard output"
                                    />

                                    <Divider />
                                </Grid>
                                <Grid item >
                                    <FormControlLabel
                                        control={<Checkbox onClick={options.changeOpts('aasinput')} checked={options.opt.aasinput} />}
                                        label="Input Arc Annotated Sequence file(s) instead of Extended Dot-Bracket Notation file(s)"
                                    />
                                    <Divider />
                                </Grid>
                                <Grid item >
                                    <FormControlLabel
                                        control={<Checkbox onClick={options.changeOpts('struct')} checked={options.opt.struct} />}
                                        label="Produce the structural RNA tree corresponding to the given structure"
                                    />
                                </Grid>
                            </Box>
                        </Grid>
                    )}
                </OptionsContext.Consumer>
            </>
        )
    }
}

export default Options