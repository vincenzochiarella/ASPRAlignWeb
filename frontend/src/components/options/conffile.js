import React from 'react'
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField, Fab,
        Grid } from '@material-ui/core'
import { Save, Restore } from '@material-ui/icons'

class ConfigurationFile extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            insertOp: 0,
            deletingOp: 0,
            replaceOp: 0,
            deleteHair: 0,
            insertHair: 0,
            crossingMism: 0
        }
        this.resetValue = this.resetValue.bind(this)
        this.saveConf = this.saveConf.bind(this)
        this.closeDialog = this.closeDialog.bind(this)
    }
    resetValue = () => {
        this.setState({
            insertOp: 0,
            deletingOp: 0,
            replaceOp: 0,
            deleteHair: 0,
            insertHair: 0,
            crossingMism: 0
        })   
    }

    saveConf = () => {
        const config ={
            insertOp: this.state.insertOp,
            deletingOp: this.state.deletingOp,
            replaceOp: this.state.replaceOp,
            deleteHair: this.state.deleteHair,
            insertHair: this.state.insertHair,
            crossingMism: this.state.crossingMism
        }
        this.props.saveConfigurationFile( config )
    }
    closeDialog = ()=> {
        this.props.closeDialog()
    }
    onChange = (event ) =>{
        this.setState({
            [event.target.id]: event.target.value
        })
        event.preventDefault()
    }

    render() {
        const { insertOp, deletingOp, replaceOp, deleteHair, insertHair, crossingMism } = this.state
        const { showConfigFile, closeDialog } = this.props
        console.log(showConfigFile)
        return (
                <>
                <Dialog open={showConfigFile} onClose={closeDialog} scroll='body'>
                    <DialogTitle>Condfiguration settings</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Fill all field required and save
                        </DialogContentText>
                        <Grid container spacing={4}>
                            <Grid item sm={12} lg={4} md={4}>
                                <TextField
                                    id='insertOp'
                                    value={insertOp}
                                    onChange={this.onChange}
                                    label='Insertion operator cost'
                                    fullWidth={true}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item sm={12} lg={4} md={4}>
                                <TextField
                                    id='deletingOp'
                                    value={deletingOp}
                                    onChange={this.onChange}
                                    label='Deleting operator cost'
                                    fullWidth={true}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item sm={12} lg={4} md={4}>
                            <TextField
                                    id='replaceOp'                                
                                    value={replaceOp}
                                    onChange={this.onChange}
                                    label='Replace operator cost'
                                    fullWidth={true}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item sm={12} lg={6} md={6}>
                            <TextField
                                    id='insertHair'
                                    value={insertHair}
                                    onChange={this.onChange}
                                    label='Insert airpin cost'
                                    fullWidth={true}
                                    variant="outlined"
                                />

                            </Grid>
                            <Grid item sm={12} lg={6} md={6}>
                            <TextField
                                    id='deleteHair'
                                    value={deleteHair}
                                    onChange={this.onChange}
                                    label='Delete airpin cost'
                                    fullWidth={true}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item sm={12} lg md>
                            <TextField
                                    id='crossingMism'
                                    value={crossingMism}
                                    onChange={this.onChange}
                                    label='Crossing mismatch cost'
                                    fullWidth={true}
                                    variant="outlined"
                                />
                            </Grid>
                        </Grid> 
                    </DialogContent>
                    <DialogActions>
                        <Fab onClick={this.saveConf} color='secondary'>
                            <Save/>
                        </Fab>
                        <Fab onClick={this.resetValue}>
                            <Restore/>
                        </Fab>
                    </DialogActions>
                </Dialog>
            </>
        )
    }
}
export default ConfigurationFile