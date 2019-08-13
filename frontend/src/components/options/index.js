import React from 'react'
import {
    Grid, FormControlLabel, Switch, Radio, IconButton,
    Paper, Stepper, Step, StepLabel, Typography, withStyles, StepContent, RadioGroup, Icon
} from '@material-ui/core'
import {
    Edit, KeyboardArrowDown, KeyboardArrowUp, CheckCircle, Cancel
} from '@material-ui/icons'

import { OptionsContext } from '../options/OptionsProvider'
import { extensionTxt } from '../../constants/regex'

const style = theme => ({
    button: {
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    actionsContainer: {
        marginBottom: theme.spacing(2),
    },
    group: {
        margin: theme.spacing(1, 0),
    }
})


class Options extends React.Component {
    state = {
        currentStep: 0,
        nextStep: () => { this.setState(prevState => ({ currentStep: prevState.currentStep + 1 })) },
        beforeStep: () => { this.setState(prevState => ({ currentStep: prevState.currentStep - 1 })) },
        lastStep: options => (event) => {
            options.handleCorrectOptions(event)
            if (this.state.currentStep === 3)
                this.state.beforeStep()
            else
                this.state.nextStep()
        }
    }

    validateInput = (filename) => {
        if (filename)
            if (filename.match(extensionTxt))
                return false
        return true
    }
    getTypeOfTreeOutput = (options) => {
        if (options.opt.align)
            return 'align'
        else if (options.opt.struct)
            return 'struct'
        else if (options.opt.alg)
            return 'alg'
    }
    render() {
        const { classes } = this.props
        const { currentStep, nextStep, beforeStep, lastStep } = this.state
        return (
            <>
                <OptionsContext.Consumer>
                    {options => (
                        <Paper margin={4}>
                            <Stepper activeStep={currentStep} orientation='vertical'>
                                <Step key={0}>
                                    <StepLabel>Type of tree to be generated</StepLabel>
                                    <StepContent>
                                        <Grid container direction='column'>
                                            <Grid item>
                                                <RadioGroup
                                                    aria-label="TreeType"
                                                    name="treeType"
                                                    className={classes.group}
                                                    value={this.getTypeOfTreeOutput(options)}
                                                    onChange={options.chooseTree}
                                                >
                                                    <FormControlLabel value="align" control={<Radio />} label="Alignment tree" />
                                                    <FormControlLabel value="struct" control={<Radio />} label="Structural tree" />
                                                    <FormControlLabel value="alg" control={<Radio />} label="Algebraic tree" />
                                                </RadioGroup>
                                            </Grid>
                                            <Grid item>
                                                <IconButton onClick={nextStep}><KeyboardArrowDown /></IconButton>
                                            </Grid>
                                        </Grid>

                                    </StepContent>
                                </Step>
                                <Step key={1}>
                                    <StepLabel>Choose input string format</StepLabel>
                                    <StepContent>
                                        <Grid container direction='column'>
                                            <Grid item>
                                                <Typography variant='h4' color='secondary'> Choose RNA string format </Typography>
                                            </Grid>
                                            <Grid container item direction='row'>
                                                <Grid item>
                                                    <Typography variant='h6'> Dot-Bracket Notation </Typography>
                                                </Grid>
                                                <Grid item>
                                                    <Switch checked={options.opt.aasinput} onClick={options.changeOpts('aasinput')} />
                                                </Grid>
                                                <Grid item>
                                                    <Typography variant='h6'> Arc Annotated Sequence </Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <IconButton onClick={nextStep}><KeyboardArrowDown /></IconButton>
                                        <IconButton onClick={beforeStep}><KeyboardArrowUp /></IconButton>
                                    </StepContent>
                                </Step>
                                <Step key={2}>
                                    <StepLabel>Check other options</StepLabel>
                                    <StepContent>
                                        <Grid container direction='column'>
                                            <Grid item>
                                                <Typography variant='h4' color='secondary'> Options </Typography>
                                            </Grid>
                                            {options.opt.align &&
                                                <Grid container item direction='row'>
                                                    <Grid item>
                                                        <Switch checked={options.opt.outdist} onClick={options.changeOpts('outdist')} />
                                                    </Grid>
                                                    <Grid item>
                                                        <Typography variant='h6'> Show only distance (if not specified it depends on default configuration) </Typography>
                                                    </Grid>
                                                </Grid>}
                                            {options.opt.align &&
                                                <Grid item container alignItems='center'>
                                                    <Grid item>
                                                        {options.opt.useconffile ? <Icon color='primary'><CheckCircle/></Icon> : <Icon color='error'><Cancel/></Icon>}
                                                    </Grid>
                                                    <Grid item>
                                                        <Typography variant='h6'> Configuration file </Typography>
                                                    </Grid>
                                                    <Grid item>
                                                        <IconButton onClick={options.showConfFile}><Edit /></IconButton>
                                                    </Grid>
                                                </Grid>}
                                            <Grid item container direction='row'>
                                                <Grid item>
                                                    <Switch checked={options.opt.chkpair} onClick={options.changeOpts('chkpair')} />
                                                </Grid>
                                                <Grid item>
                                                    <Typography variant='h6'>
                                                        Check precence of Watson and Crick pair
                                                </Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <IconButton onClick={lastStep(options)}><KeyboardArrowDown /></IconButton>
                                        <IconButton onClick={beforeStep}><KeyboardArrowUp /></IconButton>
                                    </StepContent>
                                </Step>
                                <Step key={3}>
                                    <StepLabel>Finish</StepLabel>
                                    <StepContent>
                                        <Typography>Please click on the button positioned the bottom right corner to elaborate</Typography>
                                        <IconButton onClick={lastStep(options)}><KeyboardArrowUp /></IconButton>
                                    </StepContent>
                                </Step>
                            </Stepper>
                        </Paper>
                        // <Grid container direction='column' alignItems="stretch">
                        //     <Box margin={4}>
                        //         <Grid item >
                        //             <FormControlLabel
                        //                 control={<Checkbox onClick={options.changeOpts('align')} checked={options.opt.align} />}
                        //                 label="Align two given structures producing alignment tree and distance"
                        //             />
                        //             <Divider />
                        //         </Grid>
                        //         <Grid item >
                        //             <FormControlLabel
                        //                 control={<Checkbox onClick={options.changeOpts('chkpair')} checked={options.opt.chkpair} />}
                        //                 label="Check the presence of only standard Watson-Crick and wobble base pairing (disabled by default)"
                        //             />
                        //             <Divider />
                        //         </Grid>
                        //         {options.opt.align && <>
                        //             <Grid item >
                        //                 <FormControlLabel
                        //                     control={<Checkbox onClick={options.changeOpts('outdist')} checked={options.opt.outdist} />}
                        //                     label="Output only distance, no alignment tree"
                        //                 />
                        //                 <Divider />
                        //             </Grid></>}
                        //         {/* <Grid item >
                        //             <FormControlLabel
                        //                 control={<Checkbox onClick={options.changeOpts('showscores')} checked={options.opt.showscores} />}
                        //                 label="Show current values of edit scores used for alignment"
                        //             />
                        //             <Divider />
                        //         </Grid> */}
                        //         <Grid item >
                        //             <FormControlLabel
                        //                 control={<Checkbox onClick={options.changeOpts('alg')} checked={options.opt.alg} />}
                        //                 label="Produce the algebraic RNA tree corresponding to the given structure"
                        //             />
                        //             <Divider />
                        //         </Grid>
                        //         <Grid item >
                        //             <FormControlLabel
                        //                 control={<Checkbox onClick={options.changeOpts('latexout')} checked={options.opt.latexout} />}
                        //                 label="Output in LaTeX format instead of linearised tree"
                        //             />
                        //             <Divider />
                        //         </Grid>
                        //         <Grid item >
                        //             <FormControlLabel
                        //                 control={<Checkbox onClick={options.changeOpts('useconffile')} checked={options.opt.useconffile} />}
                        //                 label=" Use the specified configuration file instead of the default one"
                        //             />
                        //             <Divider />
                        //         </Grid>
                        //         <Grid item >
                        //             <FormControlLabel
                        //                 control={<>
                        //                     <Checkbox onClick={options.changeOpts('out')} checked={options.opt.out} />
                        //                     {options.opt.out && <Zoom in={options.opt.out}>
                        //                         <Paper>
                        //                             <TextField
                        //                                 id='customfile'
                        //                                 label='Custom file name'
                        //                                 error={this.validateInput(options.opt.out_text)}
                        //                                 value={options.opt.out_text}
                        //                                 onChange={options.changeOutFile}
                        //                                 fullWidth={true}
                        //                                 variant="outlined"
                        //                             />
                        //                         </Paper>
                        //                     </Zoom>}
                        //                 </>}
                        //                 label=" Output result on the given file instead of standard output"
                        //             />

                        //             <Divider />
                        //         </Grid>
                        //         <Grid item >
                        //             <FormControlLabel
                        //                 control={<Checkbox onClick={options.changeOpts('aasinput')} checked={options.opt.aasinput} />}
                        //                 label="Input Arc Annotated Sequence file(s) instead of Extended Dot-Bracket Notation file(s)"
                        //             />
                        //             <Divider />
                        //         </Grid>
                        //         <Grid item >
                        //             <FormControlLabel
                        //                 control={<Checkbox onClick={options.changeOpts('struct')} checked={options.opt.struct} />}
                        //                 label="Produce the structural RNA tree corresponding to the given structure"
                        //             />
                        //         </Grid>
                        //     </Box>
                        // </Grid>
                    )}
                </OptionsContext.Consumer>
            </>
        )
    }
}

export default withStyles(style)(Options)