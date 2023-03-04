import React from "react";
import { DashboardConfig } from "../../model/dashboard-config";
import { Project } from "../../model/project";
import { GitLabService } from "../../services/gitlab-service";

import PageHeader from "../../components/PageHeader";
import Carousel from "./Carousel";
import GlCiBoard from "./gl-ci-pipelines/GlCiBoard";
import GlMrBoard from "./gl-merge-requests/GlMrBoard";

import "./Dashboard.css";

interface IProps {
  config: DashboardConfig | null;
}

interface IState {
  gitLabProjects: Project[];
  page: number;
}

class DashboardPage extends React.Component<IProps, IState> {
  private defaultTileCount = 15;
  private pageFlipInterval: NodeJS.Timer | null;
  private updateInterval: NodeJS.Timer | null;

  constructor(props: IProps) {
    super(props);
    this.pageFlipInterval = null;
    this.updateInterval = null;
    this.state = {
      gitLabProjects: new GitLabService().loadData(),
      page: 0,
    };
    this.handlePageSelected = this.handlePageSelected.bind(this);
    this.renderCiBoard = this.renderCiBoard.bind(this);
    this.renderMrBoard = this.renderMrBoard.bind(this);
  }

  componentDidMount(): void {
    const pageFlipCallback = () => {
      this.setState({
        page:
          (this.state.page + 1) %
          (1 + // one extra page for merge requests
            1 +
            Math.floor(
              this.filterGitLabProjectsWithPipelines(this.state.gitLabProjects)
                .length /
                (this.props.config?.display?.numberOfPipelines ||
                  this.defaultTileCount)
            )),
      });
    };
    // TODO: Revert this
    this.pageFlipInterval = setInterval(pageFlipCallback, 600_000);

    const updateCallback = () => {
      const service = new GitLabService();
      if (service.shouldUpdate()) {
        service.updateData().then((projects) => {
          this.setState({
            gitLabProjects: projects,
            page: 0,
          });
        });
      }
    };
    this.updateInterval = setInterval(updateCallback, 60_000);
  }

  componentWillUnmount(): void {
    if (this.pageFlipInterval) {
      clearInterval(this.pageFlipInterval);
    }
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
    }
  }

  render() {
    const projects = this.filterGitLabProjectsWithPipelines(
      this.state.gitLabProjects
    );

    const pageSize =
      this.props.config?.display?.numberOfPipelines || this.defaultTileCount;

    const ciBoardPages = 1 + Math.floor(projects.length / pageSize);
    const mrBoardPages = 1;
    const pages = ciBoardPages + mrBoardPages;

    if (this.state.page < ciBoardPages) {      
      return this.renderCiBoard(projects, pageSize, pages);
    } else {
      return this.renderMrBoard(pages);
    }
  }

  private renderMrBoard(pages: number) {
    return <div className="Page Dashboard">
      <PageHeader title="Oldest Merge Requests" />
      <Carousel
        currentElement={this.state.page}
        elements={pages}
        onElementSelected={this.handlePageSelected} />
      <GlMrBoard projects={this.state.gitLabProjects} />
    </div>;
  }

  private renderCiBoard(projects: Project[], pageSize: number, pages: number) {
    const projectsForPage = projects.slice(
      this.state.page * pageSize,
      Math.min(projects.length, this.state.page * pageSize + pageSize)
    );
    return (
      <div className="Page Dashboard">
        <PageHeader title="Build Pipelines" />
        <Carousel
          currentElement={this.state.page}
          elements={pages}
          onElementSelected={this.handlePageSelected}
        />
        <GlCiBoard
          projects={projectsForPage}
          tileCount={
            this.props.config?.display?.numberOfPipelines ||
            this.defaultTileCount
          }
        />
      </div>
    );
  }

  private filterGitLabProjectsWithPipelines(projects: Project[]): Project[] {
    return projects
      .filter((p) => !!p.pipeline)
      .sort((a, b) => {
        const nameA = a.name.toUpperCase();
        const nameB = b.name.toUpperCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
  }

  handlePageSelected(page: number) {
    this.setState({ page: page });
  }
}

export default DashboardPage;
