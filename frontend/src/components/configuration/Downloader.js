import React from 'react'
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    Fab, TextField, Grid, Select, OutlinedInput, MenuItem
} from '@material-ui/core'
import { SaveAlt } from '@material-ui/icons'
import { ResultContext } from '../options/ResultProvider'

import { filename as FILEN } from '../../constants/regex'
// import { TEXT, TEX } from '../../constants/extension'
import TexConverter from '../../constants/toTeX'

class Downloader extends React.Component {
    state = {
        fileName: '',
        extension: '.txt',
        disableDown: true,
        onChangeFilename: (event) => {
            this.setState({ fileName: event.target.value })
            if (event.target.value.match(FILEN))
                this.setState({ disableDown: false })
            else
                this.setState({ disableDown: true })
        },
        downloadTxtFile: (tree) => event => {
            if (this.state.extension === '.tex')
                tree = TexConverter(JSON.parse(tree))

            const element = document.createElement("a");
            const file = new Blob([tree], { type: 'text/plain' });
            element.href = URL.createObjectURL(file);
            element.download = this.state.fileName+this.state.extension;
            document.body.appendChild(element); // Required for this to work in FireFox
            element.click();
            event.preventDefault()
        }
    }
    handleSelect = event =>{
        this.setState({
            extension: event.target.value
        })
        event.preventDefault()
    }

    render() {

        const { open, handleDownlaod } = this.props
        const { fileName, onChangeFilename, disableDown, extension } = this.state
        return (
            <Dialog open={open} onClose={handleDownlaod}>
                <DialogTitle> Download file </DialogTitle>
                <DialogContent>
                    <Grid container justify='center' direction='row' spacing={2}>
                        <Grid item>
                            <TextField
                                variant='outlined'
                                value={fileName}
                                label='Please insert name of file'
                                onChange={onChangeFilename}
                            />
                        </Grid>
                        {!disableDown && <Grid item>
                            <Select
                                value={extension}
                                onChange={this.handleSelect}
                                input={<OutlinedInput id='extension'/>}
                            >
                                <MenuItem value='.txt'>.txt</MenuItem>
                                <MenuItem value='.tex'>.tex</MenuItem>
                            </Select>
                        </Grid>}
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <ResultContext.Consumer>
                        {result =>
                            <Fab disabled={disableDown} onClick={this.state.downloadTxtFile(result.resolved.tree, extension)} color='secondary'><SaveAlt /></Fab>
                        }
                    </ResultContext.Consumer>
                </DialogActions>
            </Dialog>
        )
    }

}

export default Downloader