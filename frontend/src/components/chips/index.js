import React from 'react'
import { withStyles, Chip } from '@material-ui/core';
import {
    Share, DragIndicator, SettingsEthernet, TextFields, AttachFile
} from '@material-ui/icons'
import { OptionsContext} from '../options/OptionsProvider';
const style = theme => ({
    chipsStyle: {
        color: '#ffffff'
    }
})
class Chips extends React.PureComponent {
    getChips = (options) => {
        let chips = []
        if (options.opt.struct)
            chips.push({ name: 'Structural', icon: <Share /> })
        if (options.opt.align)
            chips.push({ name: 'Alignment', icon: <Share /> })
        if (options.opt.alg)
            chips.push({ name: 'Algebraic', icon: <Share /> })
        if (options.opt.chkpair)
            chips.push({ name: 'Checkpair', icon: <DragIndicator /> })
        if (options.opt.outdist)
            chips.push({ name: 'Only distance', icon: <SettingsEthernet /> })
        if (options.opt.aasinput)
            chips.push({ name: 'Arc Annotated Sequence', icon: <TextFields /> })
        else if (!options.opt.aasinput)
            chips.push({ name: 'Dot-Bracket Notation', icon: <TextFields /> })
        if (options.opt.useconffile)
            chips.push({ name: 'Conffile', icon: <AttachFile /> })
        return chips
    }
    render() {
        const { classes } = this.props
        return (        
        <OptionsContext.Consumer>{options => (
            this.getChips(options).map((chip, index) => <Chip
                key={index}
                size='small'
                color='secondary'
                className={classes.chipsStyle}
                icon={chip.icon}
                label={chip.name} />
            ))}</OptionsContext.Consumer>
        )
    }
}
export default withStyles(style)(Chips)