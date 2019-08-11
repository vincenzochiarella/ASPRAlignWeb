import React from 'react'

export const OptionsContext = React.createContext()


class OptionsProvider extends React.Component {
    state = {
        opt: {
            align: false,
            chkpair: false,
            outdist: false,
            showscores: false,
            alg: false,
            latexout: false,
            out: false,
            aasinput: false,
            useconffile: false,
            conffile: {
                insertOp: 100,
                deletingOp: 100,
                replaceOp: 100,
                deleteHair: 100,
                insertHair: 100,
                crossingMism: 1
            },
            out_text: '*.txt',
            struct: true
        },
        strings: [],
        changeOpts: (selected) => (event) => {
            this.setState(prevState => ({
                opt: {
                    ...prevState.opt,
                    [selected]: !this.state.opt[selected]
                }
            }))
            event.preventDefault()
        },
        changeConfFile: (event) => {
            this.setState(prevState => ({
                opt: {
                    ...prevState.opt,
                    conffile: {
                        ...prevState.opt.conffile,
                        [event.target.id]: event.target.value
                    }

                }
            }))
            event.persist()
            event.preventDefault()
        },
        resetConfFile: ( event ) => {
            this.setState(prevState => ({
                opt: {
                    ...prevState.opt,
                    conffile: {
                        insertOp: 100,
                        deletingOp: 100,
                        replacingOp: 100,
                        deleteHair: 100,
                        insertHair: 100,
                        crossingMism: 1
                    }
                }
            }))
            event.preventDefault()
        },
        changeOutFile: (event) => {
            this.setState(prevState => ({
                opt: {
                    ...prevState.opt,
                    out_text: event.target.value
                }
            }))
            event.persist()
            event.preventDefault()
        },
        changeMolecule: (event) => {
            this.setState(prevState => ({
                ...prevState,
                [event.target.id]: event.target.value
            }))
            event.persist()
            event.preventDefault()
        },
    }
    render() {
        const { children } = this.props
        return (
            <OptionsContext.Provider value={this.state}>
                {children}
            </OptionsContext.Provider>
        )
    }

}

export default OptionsProvider