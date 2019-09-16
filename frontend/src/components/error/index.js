import React from 'react'

import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@material-ui/core'
import { Warning } from '@material-ui/icons'
import { ResultContext } from '../options/ResultProvider'

// function filterErrorNotAlign( errorComplete ){
//     if (!errorComplete.optionsUsed.align)
//     {let errorIndex = errorComplete.unResolved.error.indexOf('INPUT ERROR')
//     let errorFiltered = errorComplete.substring(errorIndex)
//     return errorFiltered}
//     else return errorComplete.unResolved.error
// }

class ErrorHandler extends React.Component {
    render() {
        return (
            <ResultContext.Consumer>
                {result => (<Dialog
                    scroll="body"
                    open={!result.unResolved.errorShowed}
                    onClose={(event) => result.handleErrorShow(event)}>
                    <DialogTitle><Warning />{result.unResolved.error}</DialogTitle>
                    <DialogContent>
                        <Typography variant='h5'>Molecules</Typography>
                        {result.optionsUsed.molecule0}
                        {result.optionsUsed.align&&result.optionsUsed.molecule1}
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