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
      <div className="control">
        <Link className="button is-link is-primary" to={`/config`}>
          Get started!
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
