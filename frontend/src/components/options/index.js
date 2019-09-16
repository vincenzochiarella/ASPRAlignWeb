import React from 'react'
import {
    Grid, FormControlLabel, Switch, Radio, IconButton,
    Paper, Typography, withStyles, RadioGroup, Box, Tab, Tabs,
    Button, Tooltip
} from '@material-ui/core'
import {
    Edit, Share, TextFields, SettingsEthernet
} from '@material-ui/icons'

import InputMolecule from '../input'
import { OptionsContext } from '../options/OptionsProvider'
import { filename as FILEN } from '../../constants/regex'

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
    },
    tabStyle: {
        backgroundColor: theme.palette.background.paper
    }
})

/**
 * React COMPONENT Wrapped
 */
const AntTab = withStyles(theme => ({
    root: {
        textTransform: 'none',
        minWidth: 72,
        fontWeight: theme.typography.fontWeightRegular,
        marginRight: theme.spacing(4),
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:hover': {
            color: theme.palette.primary.main,
            opacity: 1,
        },
        '&$selected': {
            color: theme.palette.primary.main,
            fontWeight: theme.typography.fontWeightMedium,
        },
        '&:focus': {
            color: theme.palette.primary.main,
        },
    },
    selected: {},
}))(props => <Tab disableRipple {...props} />);
/**
 * React COMPONENT Wrapped
 */
const AntTabs = withStyles(theme => ({
    root: {
        borderBottom: '1px solid #e8e8e8',
    },
    indicator: {
        backgroundColor: theme.palette.primary.main,
    },
}))(Tabs);
/**
 * 
 * @param {*} props 
 */
function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            <Box p={3}>{children}</Box>
        </Typography>
    );
}

class Options extends React.Component {
    state = {
        currentTab: 0,
        handleTabChange: (event, newTab) => { this.setState({ currentTab: newTab }) }
    }

    validateInput = (filename) => {
        if (filename)
            if (filename.match(FILEN))
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
        const { currentTab, handleTabChange } = this.state
        return (
            <>
                <OptionsContext.Consumer>
                    {options => (
                        <div className={classes.tabStyle}>
                            <Paper margin={4}>
                                <AntTabs value={currentTab} onChange={handleTabChange} centered>
                                    <AntTab label='Operation' icon={<Share />} />
                                    <AntTab label='Molecule input' icon={<TextFields />} />
                                    <AntTab label='Other options' icon={<SettingsEthernet />} />
                                </AntTabs>
                                <TabPanel index={0} value={currentTab}>
                                    <RadioGroup
                                        aria-label="TreeType"
                                        name="treeType"
                                        className={classes.group}
                                        value={this.getTypeOfTreeOutput(options)}
                                        onChange={options.chooseTree}
                                    >
                                        <FormControlLabel value="align" control={<Radio />} label="Align Two Molecules" />
                                        <FormControlLabel value="struct" control={<Radio />} label="Generate Structural Tree" />
                                        <FormControlLabel value="alg" control={<Radio />} label="Generate Algebraic Tree" />
                                    </RadioGroup>
                                </TabPanel>
                                <TabPanel index={1} value={currentTab}>
                                    <Grid container direction='column' spacing={3}>
                                        <Grid item>
                                            <Typography variant='h5' > Choose RNA string format </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Tooltip title='Click to change input format'>
                                                <Button onClick={options.changeOpts('aasinput')} variant="contained" color='secondary' >
                                                    {options.opt.aasinput && ("Arc Annotated Sequence")}
                                                    {!options.opt.aasinput && ("Dot-Bracket Notation")}
                                                </Button>
                                            </Tooltip>
                                        </Grid>
                                        {/* <Grid container item direction='row'>
                                            <Grid item>
                                                <Typography variant='h6'> Dot-Bracket Notation </Typography>
                                            </Grid>
                                            <Grid item>
                                                <Switch checked={options.opt.aasinput} onClick={options.changeOpts('aasinput')} />
                                            </Grid>
                                            <Grid item>
                                                <Typography variant='h6'> Arc Annotated Sequence </Typography>
                                            </Grid>
                                        </Grid> */}
                                        <Grid item>
                                            <InputMolecule />
                                        </Grid>
                                    </Grid>
                                </TabPanel>
                                <TabPanel index={2} value={currentTab}>
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
                                        <Grid item container direction='row'>
                                            <Grid item>
                                                <Switch checked={options.opt.chkpair} onClick={options.changeOpts('chkpair')} />
                                            </Grid>
                                            <Grid item>
                                                <Typography variant='h6'>
                                                    Check Precence Of Only Watson and Crick Pairs
                                                </Typography>
                                            </Grid>
                                            {options.opt.align &&
                                                <Grid item container alignItems='center'>
                                                    {/* <Grid item>
                                                    {options.opt.useconffile ? <Icon color='primary'><CheckCircle /></Icon> : <Icon color='error'><Cancel /></Icon>}
                                                </Grid> */}
                                                    <Grid item>
                                                        <IconButton onClick={options.showConfFile}><Edit /></IconButton>
                                                    </Grid>
                                                    <Grid item>
                                                        <Typography variant='h6'> Configuration Values </Typography>
                                                    </Grid>
                                                </Grid>}
                                        </Grid>
                                    </Grid>
                                </TabPanel>
                            </Paper>
                        </div>
                    )}
                </OptionsContext.Consumer>
            </>
        )
    }
}

export default withStyles(style)(Options)