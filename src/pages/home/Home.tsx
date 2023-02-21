import React from "react";
import { Link } from "react-router-dom";

import { DashboardConfig } from "../../model/dashboard-config";
import PageHeader from "../../components/PageHeader";

import "./Home.css";

interface IProps {
  config: DashboardConfig | null;
}

class HomePage extends React.Component<IProps> {
  render() {
    return (
      <div className="Page TestPage">
        <PageHeader title="GitLab Team Dashboard - Home" />
        Bla bla bla
        <div className="control">
          <Link className="button is-link is-primary" to={`/config`}>
            Get started!
          </Link>
        </div>
        {!!this.props.config ? (
          <div className="control">
            <Link className="button is-link is-light" to={`/`}>
              Show dashboard
            </Link>
          </div>
        ) : undefined}
      </div>
    );
  }
}

export default HomePage;
