import React from 'react'
import {
    Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField, Fab,
    Grid
} from '@material-ui/core'
import { Save, Restore } from '@material-ui/icons'

import { OptionsContext } from './OptionsProvider'

class ConfigurationFile extends React.Component {

    // onChange = ( event ) =>{
    //     this.setState({
    //         [event.target.id]: event.target.value
    //     })
    //     event.preventDefault()
    // }

    render() {
        // const { insertOp, deletingOp, replaceOp, deleteHair, insertHair, crossingMism } = this.state
        const { showConfigFile, closeDialog } = this.props
        // console.log(showConfigFile)
        return (            
                <OptionsContext.Consumer>
                    {options => (<Dialog open={showConfigFile} onClose={closeDialog} scroll='body'>
                        <DialogTitle>Condfiguration settings</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Fill all field required and save
                        </DialogContentText>
                            <Grid container spacing={4}>
                                <Grid item sm={12} lg={4} md={4}>
                                    <TextField
                                        id='insertOp'
                                        value={options.opt.conffile.insertOp}
                                        onChange={options.changeConfFile}
                                        label='Insertion operator cost'
                                        type="number"
                                        fullWidth={true}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item sm={12} lg={4} md={4}>
                                    <TextField
                                        id='deletingOp'
                                        value={options.opt.conffile.deletingOp}
                                        onChange={options.changeConfFile}
                                        label='Deleting operator cost'
                                        type="number"
                                        fullWidth={true}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item sm={12} lg={4} md={4}>
                                    <TextField
                                        id='replaceOp'
                                        value={options.opt.conffile.replaceOp}
                                        onChange={options.changeConfFile}
                                        label='Replace operator cost'
                                        type="number"
                                        fullWidth={true}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item sm={12} lg={6} md={6}>
                                    <TextField
                                        id='insertHair'
                                        value={options.opt.conffile.insertHair}
                                        onChange={options.changeConfFile}
                                        label='Insert airpin cost'
                                        type="number"
                                        fullWidth={true}
                                        variant="outlined"
                                    />

                                </Grid>
                                <Grid item sm={12} lg={6} md={6}>
                                    <TextField
                                        id='deleteHair'
                                        value={options.opt.conffile.deleteHair}
                                        onChange={options.changeConfFile}
                                        label='Delete airpin cost'
                                        type="number"
                                        fullWidth={true}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item sm={12} lg md>
                                    <TextField
                                        id='crossingMism'
                                        value={options.opt.conffile.crossingMism}
                                        onChange={options.changeConfFile}
                                        label='Crossing mismatch cost'
                                        type="number"
                                        fullWidth={true}
                                        variant="outlined"
                                    />
                                </Grid>
                            </Grid>
                        </DialogContent>
                        <DialogActions>
                            <Fab color='secondary'>
                                <Save />
                            </Fab>
                            <Fab onClick={options.resetConfFile}>
                                <Restore />
                            </Fab>
                        </DialogActions>
                    </Dialog>)}
                </OptionsContext.Consumer>
        )
    }
}
export default ConfigurationFile