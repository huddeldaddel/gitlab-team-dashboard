import React from 'react';
import PageFooter from './components/page-footer'
import ConfigPage from './pages/config/Config'
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

    if(!this.state.config) {
      component = <ConfigPage />
    }

    return (
      <div className="App">
        { component }
        <PageFooter />
      </div>
    );
  }
}

export default App;
