import React from 'react'

export const ResultContext = React.createContext()

class ResultProvider extends React.Component {
    state = {
        optionsUsed: {
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
        status: -1,
        resolved: {
            tree: '',
            distance: 0.0
        },
        unResolved: {
            error: '',
            errorShowed: true
        },
        /**
         * FIXME: Refactor this part (i don't like the structure of if and else)
         */
        callbackResolved: (data) => {
            console.log(typeof (data.optionsUsed))
            if (data.optionsUsed.align && !data.optionsUsed.outdist) {
                this.setState({
                    resolved: {
                        tree: data.data[0],
                        distance: data.data[1]
                    },
                    optionsUsed: data.optionsUsed,
                    status: 0
                })
            } else if (data.optionsUsed.align && data.optionsUsed.outdist) {
                this.setState({
                    resolved: {
                        tree: null,
                        distance: data.data
                    },
                    optionsUsed: data.optionsUsed,
                    status: 0
                })
            } else {
                this.setState({
                    resolved: {
                        distance: null,
                        tree: data.data
                    },
                    optionsUsed: data.optionsUsed,
                    status: 0
                })
            }
        },
        callbackError: (error) => {
            // console.log(typeof(error.optionsUsed))
            this.setState({
                unResolved: {
                    error: error.data,
                    errorShowed: false
                },
                optionsUsed: error.optionsUsed,
                status: 1
            })

        },
        handleErrorShow: (event) => {
            this.setState(prevState => ({
                unResolved: {
                    ...prevState.unResolved,
                    errorShowed: !prevState.unResolved.errorShowed
                }
            }))
            event.preventDefault()
        },
        isDownlaodable: () => {
            return this.state.status === 0
        }
    }

    render() {
        const { children } = this.props
        return (
            <ResultContext.Provider value={this.state}>
                {children}
            </ResultContext.Provider>
        )
    }
}
export default ResultProvider