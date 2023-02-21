import React from "react";
import { DashboardConfig } from "../../model/dashboard-config";
import PageHeader from "../../components/PageHeader";

import "./Dashboard.css";

interface IProps {
  config: DashboardConfig | null;
}

interface IState {}

class DashboardPage extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="Page TestPage">
        <PageHeader title="GitLab Team Dashboard" />
      </div>
    );
  }
}

export default DashboardPage;
