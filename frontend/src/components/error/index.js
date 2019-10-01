import React from 'react'

import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@material-ui/core'
import { Warning } from '@material-ui/icons'
import { removeErrorFilename } from '../../constants/regex'
import { ResultContext } from '../options/ResultProvider'

function filterErrorNotAlign( errorComplete ){
   return errorComplete.replace(removeErrorFilename,'')
}

class ErrorHandler extends React.Component {
    render() {
        return (
            <ResultContext.Consumer>
                {result => (<Dialog
                    scroll="body"
                    open={!result.unResolved.errorShowed}
                    onClose={(event) => result.handleErrorShow(event)}>
                    <DialogTitle><Warning />{filterErrorNotAlign(result.unResolved.error)}</DialogTitle>
                    <DialogContent>
                        <Typography variant='h5'>Molecules</Typography>
                        <Typography>{result.optionsUsed.molecule0}</Typography>
                        <Typography>{result.optionsUsed.align&&result.optionsUsed.molecule1}</Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button color='primary' onClick={(event) => result.handleErrorShow(event)}>Ok, i got it</Button>
                    </DialogActions>
                </Dialog>)}
            </ResultContext.Consumer>
        )
    }
}
export default ErrorHandler