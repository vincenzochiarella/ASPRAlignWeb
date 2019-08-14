import React from 'react'
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    Fab, TextField, Grid
} from '@material-ui/core'
import { SaveAlt } from '@material-ui/icons'
import { OptionsContext } from '../options/OptionsProvider'

import { extensionTxt } from '../../constants/regex'

class Downloader extends React.Component {
    state = {
        fileName: '',
        disableDown: true,
        onChangeFilename: (event) => { 
            this.setState({ fileName: event.target.value })
            if(event.target.value.match(extensionTxt))
               this.setState({ disableDown: false})
            else
               this.setState({ disableDown: true})
        },
        downloadTxtFile: (tree) => event => {
            const element = document.createElement("a");
            const file = new Blob([tree], { type: 'text/plain' });
            element.href = URL.createObjectURL(file);
            element.download = this.state.fileName;
            document.body.appendChild(element); // Required for this to work in FireFox
            element.click();
            event.preventDefault()
        }
    }
    render() {

        const { showDownloaderM, handleDownloaderM } = this.props
        const { fileName, onChangeFilename, disableDown } = this.state
        return (
            <Dialog open={showDownloaderM} onClose={handleDownloaderM}>
                <DialogTitle> Download file </DialogTitle>
                <DialogContent>
                    <Grid container justify='center'>
                        <Grid item>
                            <TextField
                                variant='outlined'
                                value={fileName}
                                label='Please insert name of file'
                                onChange={onChangeFilename}
                            />
                        </Grid>
                    </Grid>

                </DialogContent>
                <DialogActions>
                    <OptionsContext.Consumer>
                        {options =>
                            <Fab disabled={disableDown} onClick={this.state.downloadTxtFile(options.resolved.tree)} color='secondary'><SaveAlt /></Fab>
                        }
                    </OptionsContext.Consumer>
                </DialogActions>
            </Dialog>
        )
    }

}

export default Downloader