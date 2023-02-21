import React from "react";
import { DashboardConfig } from "../../model/dashboard-config";
import { DashboardService } from "../../services/dashboard-service";
import PageHeader from "../../components/PageHeader";

import "./Test.css";

interface IProps {
  config: DashboardConfig;
}

interface IState {}

class TestPage extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {};
    this.updateDashboardData = this.updateDashboardData.bind(this);
  }

  async updateDashboardData(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    try {
      new DashboardService().updateData();
    } catch (error) {
      console.error("Failed to load errors: " + error);
    }
  }

  render() {
    return (
      <div className="Page TestPage">
        <PageHeader title="GitLab Team Dashboard - Test" />

        <div className="control">
          <button
            className="button is-link is-light"
            onClick={this.updateDashboardData}
          >
            Update dashboard data
          </button>
        </div>
      </div>
    );
  }
}

export default TestPage;
