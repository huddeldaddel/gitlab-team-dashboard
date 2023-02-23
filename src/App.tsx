import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ConfigPage from "./pages/config/Config";
import DashboardPage from "./pages/dashboard/Dashboard";
import HomePage from "./pages/home/Home";
import PageFooter from "./components/PageFooter";
import { ConfigService } from "./services/config-service";
import { DashboardConfig } from "./model/dashboard-config";

import "./App.css";

interface IProps {}

interface IState {
  config: DashboardConfig | null;
}

class App extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      config: new ConfigService().loadConfig(),
    };
  }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage config={this.state.config} />} />
            <Route
              path="/board"
              element={<DashboardPage config={this.state.config} />}
            />
            <Route path="/config" element={<ConfigPage />} />
            <Route
              path="/home"
              element={<HomePage config={this.state.config} />}
            />
          </Routes>
        </BrowserRouter>
        <PageFooter />
      </div>
    );
  }
}

export default App;
