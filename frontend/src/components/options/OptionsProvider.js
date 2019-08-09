import React from 'react'

export const OptionsContext = React.createContext()
const defaultOptions = {
    align: true,
    chkpair: false,
    outdist: true,
    showscores: false,
    alg: false,
    latexout: false,
    out: false,
    aasinput: false,
    useconffile: false,
    out_text: '*.txt',
    struct: false
}

class OptionsProvider extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            opt: defaultOptions,
            strings: [],
            configFile: null,
            changeOpts: this.changeOpts,
            changeStrings: this.changeStrings,
            changeConfFile: this.changeConfFile
        }
        this.changeOpts = (opts) => {
            this.setState({
                opt: opts
            });
        }
        this.changeStrings = (strings) => {
            this.setState({
                strings: strings
            })
        }
        this.changeConfFile = (conffile) => {
            this.setState({
                configFile: conffile
            })
        }


    }
    componentDidMount(){
        this.setState({
            opt: defaultOptions
        })        
    }


    changeConfFile = (conffile) => {
        this.setState({
            configFile: conffile
        })
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