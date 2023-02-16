import React from 'react';
import ConfigPage from './pages/config/Config'
import PageFooter from './components/page-footer'
import TestPage from './pages/test/Test'
import { ConfigService } from './services/config-service'
import { DashboardConfig } from './model/dashboard-config';

import './App.css';

// import { Types } from '@gitbeaker/node';
// import { Gitlab } from '@gitbeaker/node';

interface IProps {
}

interface IState {
  config: DashboardConfig | null;
}

class App extends React.Component<IProps, IState> {

  constructor(props: IProps) {
    super(props);
    this.state = {
      config: new ConfigService().LoadConfig()
    };
  }

  render() {
    var component = <div />;

    if (!this.state.config) {
      component = <ConfigPage />
    } else {
      component = <TestPage config={this.state.config} />
    }

    return (
      <div className="App">
        {component}
        <PageFooter />
      </div>
    );
  }
}

export default App;
