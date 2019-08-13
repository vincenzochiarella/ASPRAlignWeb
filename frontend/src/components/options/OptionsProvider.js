import React from 'react'

import { dotBracketNotation, arcAnnotationSequence } from '../../constants/regex'
export const OptionsContext = React.createContext()


class OptionsProvider extends React.Component {
    state = {
        opt: {
            align: true,
            chkpair: false,
            outdist: true,
            showscores: false,
            alg: false,
            latexout: false,
            out: false,
            aasinput: true,
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
            molecule0: `GCACGAUCGCCAAUGGAUUGUCAUUUCUGGGAAUUUGAUGGACCUUGGAAAAUGCAUU\n(3,18);(5,11);(8,16);(13,21);(24,49);(26,33);(27,29);(30,35);(37,46);(38,45);(39,42);(40,44);(47,55);(51,58)`,
            molecule1: `AAGAGCUAUUUCCCUUAAGGGGGCACUAUUGAACUCCAUGAAACCGGAUUUGGCCCCGCGG\n(2,15);(3,13);(4,7);(10,18);(20,44);(21,26);(22,24);(28,35);(29,33);(31,34);(36,47);(41,50);(53,59);(55,61)`,
            struct: false
        },
        validation: {
            isMoleculeCorrect: true,
            isOptionCorrect: true
        },
        flipped: false,
        resolved: {
            tree: '',
            distance: 0.0
        },
        downloadable: false,
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
        resetConfFile: (event) => {
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
            this.state.checkMolecule(event.target.value)
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
        checkMolecule: (string) => {
            if (this.state.opt.aasinput && string.match(arcAnnotationSequence)) {
                this.setState({ validation: { ...this.state.validation, isMoleculeCorrect: true } })
            }
            else if (!this.state.opt.aasinput && string.match(dotBracketNotation))
                this.setState({ validation: { ...this.state.validation, isMoleculeCorrect: true } })
            else
                this.setState({ validation: { ...this.state.validation, isMoleculeCorrect: false } })

        },
        callbackResolved: (data) => {
            if (this.state.opt.align && !this.state.opt.outdist) {
                this.setState({
                    resolved: {
                        tree: data[0],
                        distance: data[1]
                    },
                    downloadable: true
                })
            } else if (this.state.opt.align && this.state.opt.outdist){
                this.setState({
                    resolved: {
                        tree: '',
                        distance: data
                    },
                    downloadable: true 
                })
            } else {
                this.setState({
                    resolved: {
                        ...this.state.resolved,
                        tree: JSON.stringify(data)
                    },
                    downloadable: true
                })
            }
            
        },
        handleFlipCard: () => {
            this.setState({ flipped: !this.state.flipped })
        }
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