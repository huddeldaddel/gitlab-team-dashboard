import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DashboardConfig } from "../../model/dashboard-config";
import PageHeader from "../../components/PageHeader";

import "./Home.css";

interface IProps {
  config: DashboardConfig | null;
}

function HomePage(props: IProps) {
  const navigate = useNavigate();

  useEffect(() => {
    if (props.config) {
      navigate("/board");
    }
  });

  return (
    <div className="Page TestPage">
      <PageHeader title="GitLab Team Dashboard - Home" />
      <div className="container">
        <h2 className="is-size-2">Welcome</h2>
        <p className="mt-2">
          This dashboard website was created for teams who want to keep an eye
          on their GitLab build pipelines. You can use this website as a free,
          no-installation-required, nice-and-secure dashboard for your GitLab CI
          pipelines. The dashboard uses JavaScript to access the REST API of a
          GitLab server from your browser - no data is transferred to other
          computers in the process. Thus the GitLab server can located in a
          protected network environment.
        </p>

        <p className="mt-4">
          With warm regards to my friends and colleages of the Business Center
          Retail Processes of New Yorker in Brunswick, Germany
        </p>

        <p className="mt-4 is-size-5" style={{ fontStyle: "italic" }}>
          Thomas Werner
        </p>

        <div className="control mt-6">
          <Link className="button is-link is-primary" to={`/config`}>
            Get started!
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
