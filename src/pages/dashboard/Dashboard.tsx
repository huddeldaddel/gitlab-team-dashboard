import React from "react";
import { DashboardConfig } from "../../model/dashboard-config";
import { Project } from "../../model/project";
import { GitLabService } from "../../services/gitlab-service";

import PageHeader from "../../components/PageHeader";
import GlCiBoard from "./gl-ci-pipelines/GlCiBoard";

import "./Dashboard.css";

interface IProps {
  config: DashboardConfig | null;
}

interface IState {
  gitLabProjects: Project[];
}

class DashboardPage extends React.Component<IProps, IState> {
  private updateInterval: NodeJS.Timer | null;

  constructor(props: IProps) {
    super(props);
    this.updateInterval = null;
    this.state = {
      gitLabProjects: new GitLabService().loadData(),
    };
  }

  componentDidMount(): void {
    const callback = () => {
      const service = new GitLabService();
      if (service.shouldUpdate()) {
        service.updateData().then((projects) => {
          this.setState({ gitLabProjects: projects });
        });
      }
    };
    this.updateInterval = setInterval(callback, 60_000);
  }

  componentWillUnmount(): void {
    if (this.updateInterval) {
      clearInterval(this.updateInterval!);
    }
  }

  render() {
    return (
      <div className="Page GitLabPipelines">
        <PageHeader title="GitLab Team Dashboard - Build Pipelines" />
        <GlCiBoard
          projects={this.state.gitLabProjects}
          tileCount={this.props.config?.display?.numberOfPipelines || 15}
        />
      </div>
    );
  }
}

export default DashboardPage;
