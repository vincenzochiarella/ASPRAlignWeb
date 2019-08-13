import React from 'react'
import DownloadLink from 'react-download-link'
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    Fab, TextField, Grid
} from '@material-ui/core'
import { SaveAlt } from '@material-ui/icons'
import { OptionsContext } from '../options/OptionsProvider'

class Downloader extends React.Component {
    state = {
        fileName: '',
        onChangeFilename: (event) => { this.setState({ fileName: event.target.value }) }
    }
    render() {

        const { showDownloaderM, handleDownloaderM } = this.props
        const { fileName, onChangeFilename } = this.state
        return (
            <Dialog open={showDownloaderM} onClose={handleDownloaderM}>
                <DialogTitle> Download file </DialogTitle>
                <DialogContent>
                    <Grid container justify='center'>
                        <Grid item>
                            <TextField
                                value={fileName}
                                label='Please insert name of file'
                                onChange={onChangeFilename}
                            />
                        </Grid>
                    </Grid>


                </DialogContent>
                <DialogActions>
                        <Fab><SaveAlt/></Fab>                    
                </DialogActions>
            </Dialog>
        )
    }

}

export default Downloader