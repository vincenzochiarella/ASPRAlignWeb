import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom'
import Landing from './pages/landing'
import Analize from './pages/analize'
import Credits from './pages/credits'
import Documentation from './pages/documentation'
import Layout from './components/layout'
import { Container } from '@material-ui/core'
import * as ROUTES from './constants/routes'

import OptionsProvider from '../src/components/options/OptionsProvider'
import ResultProvider from './components/options/ResultProvider';


class App extends React.Component {
  render() {
    return (
      <HashRouter>
        <OptionsProvider >
          <ResultProvider>
            <Layout>
              <Container maxWidth='lg'>
                <Switch>
                  <Route exact path={ROUTES.Landing} component={Landing} />
                  <Route path={ROUTES.Analize} component={Analize} />
                  <Route path={ROUTES.Credits} component={Credits} />
                  <Route path={ROUTES.Documentation} component={Documentation} />
                </Switch>
              </Container>
            </Layout>
          </ResultProvider>
        </OptionsProvider>
      </HashRouter>
    )
  }
}

export default App;
