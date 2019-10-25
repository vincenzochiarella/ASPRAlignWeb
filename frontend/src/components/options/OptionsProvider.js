import React from 'react'

import { dotBracketNotation, arcAnnotationSequence } from '../../constants/regex'
export const OptionsContext = React.createContext()


class OptionsProvider extends React.Component {
    state = {
        _defaultOpt: {
            align: true,
            struct: false,
            alg: false,
            chkpair: false,
            outdist: false,
            aasinput: false,
            useconffile: false,
            showConfForm: false,
            conffile: {
                insertOp: 100,
                deletingOp: 100,
                replaceOp: 100,
                deleteHair: 100,
                insertHair: 100,
                crossingMism: 1
            },
            molecule1: '',
            molecule0: ''
        },
        opt: {
            align: true,
            struct: false,
            alg: false,
            chkpair: false,
            outdist: false,
            aasinput: true,
            useconffile: false,
            showConfForm: false,
            conffile: {
                insertOp: 100,
                deletingOp: 100,
                replaceOp: 100,
                deleteHair: 100,
                insertHair: 100,
                crossingMism: 1
            },
            molecule1: ``,
            molecule0: ``,
        },
        /**
         * @returns JSON with molecule input
         */
        getMoleculesArray: () => {
            if (this.state.opt.align) {
                return {
                    "analize": [
                        { "molecule": this.state.opt.molecule0 },
                        { "molecule": this.state.opt.molecule1 }
                    ]
                }
            } else {
                return {
                    "analize": [
                        { "molecule": this.state.opt.molecule0 }
                    ]
                }
            }

        },
        /**
         * Change result ASPRAlign 
         */
        chooseTree: (event) => {
            switch (event.target.value) {
                case 'align':
                    this.setState(preState => ({
                        opt: {
                            ...preState.opt,
                            align: true,
                            struct: false,
                            alg: false
                        }
                    }))
                    break;
                case 'struct':
                    this.setState(preState => ({
                        opt: {
                            ...preState.opt,
                            align: false,
                            struct: true,
                            alg: false,
                            outdist: false,
                            conffile: false
                        }
                    }))
                    break;
                case 'alg':
                    this.setState(preState => ({
                        opt: {
                            ...preState.opt,
                            align: false,
                            struct: false,
                            alg: true,
                            outdist: false,
                            conffile: false
                        }
                    }))
                    break;
                default:
                    break;
            }
        },
        /**
         * Change state with selected options
         */
        changeOpts: (selected) => (event) => {
            this.setState(prevState => ({
                opt: {
                    ...prevState.opt,
                    [selected]: !this.state.opt[selected]
                }
            }))
            if (selected === 'useconffile')
                this.setState(prevState => ({ opt: { ...prevState.opt, showConfForm: !prevState.opt.showConfForm } }))
            // this.state.checkMolecule()
            event.preventDefault()
        },
        /**
         * Change state with selected configuration
         */
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
        /**
         * Reset configuration file to default values
         */
        resetConfFile: (event) => {
            this.setState(prevState => ({
                opt: {
                    ...prevState.opt,
                    conffile: {
                        insertOp: 100,
                        deletingOp: 100,
                        replaceOp: 100,
                        deleteHair: 100,
                        insertHair: 100,
                        crossingMism: 1
                    }
                }
            }))
            event.preventDefault()
        },
        /**
         * Control configuration file show
         */
        showConfFile: (event) => {
            this.setState({
                opt: {
                    ...this.state.opt,
                    showConfForm: !this.state.opt.showConfForm
                }
            })
            event.preventDefault()
        },
        /**
         * Handle keyboard input in input form
         */
        changeMolecule: (event) => {
            // this.state.checkMolecule()
            this.setState(prevState => ({
                ...prevState,
                opt: {
                    ...prevState.opt,
                    [event.target.id]: event.target.value
                }
            }))
            event.persist()
            event.preventDefault()
        },

        handleReset: (event) =>{
            this.setState({
                opt: this.state._defaultOpt
            })
            event.preventDefault()
        }
        /**
         * Use regex to check the correct syntax of input form
         */
        // checkMolecule: () => {            
        //     if (this.state.opt.aasinput) {
        //         if (this.state.opt.align) {
        //             if (this.state.opt.molecule0.match(arcAnnotationSequence) && this.state.opt.molecule1.match(arcAnnotationSequence))
        //                 return true
        //             else
        //                 return false
        //         } else {
        //             if (this.state.opt.molecule0.match(arcAnnotationSequence))
        //                 return true
        //             else
        //                 return false
        //         }
        //     }
        //     else {
        //         if (this.state.opt.align) {
        //             if (this.state.opt.molecule0.match(dotBracketNotation) && this.state.opt.molecule1.match(dotBracketNotation))
        //                 return true
        //             else
        //                 return false
        //         } else {
        //             if (this.state.opt.molecule0.match(dotBracketNotation))
        //                 return true
        //             else
        //                 return false
        //         }
        //     }
        // }
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