import React from "react";
import { DashboardConfig } from "../../model/dashboard-config";
import { Project } from "../../model/project";
import { GitLabService } from "../../services/gitlab-service";

import PageHeader from "../../components/PageHeader";
import Carousel from "./Carousel";
import GlCiBoard from "./gl-ci-pipelines/GlCiBoard";
import GlMrBoard from "./gl-merge-requests/GlMrBoard";
import Typewriter from "../../components/Typewriter";

import "./Dashboard.css";

interface IProps {
  config: DashboardConfig | null;
}

interface IState {
  gitLabProjects: Project[];
  loadingAnimation: boolean;
  page: number;
}

class DashboardPage extends React.Component<IProps, IState> {
  private defaultTileCount = 15;
  private loadingProjects: boolean;
  private pageFlipInterval: NodeJS.Timer | null;
  private updateInterval: NodeJS.Timer | null;

  constructor(props: IProps) {
    super(props);
    this.loadingProjects = false;
    this.pageFlipInterval = null;
    this.updateInterval = null;

    const gitLabService = new GitLabService();
    const projects = gitLabService.loadData();
    this.state = {
      gitLabProjects: projects,
      loadingAnimation: gitLabService.shouldUpdate() && projects.length === 0,
      page: 0,
    };

    this.handlePageSelected = this.handlePageSelected.bind(this);
    this.renderCiBoard = this.renderCiBoard.bind(this);
    this.renderMrBoard = this.renderMrBoard.bind(this);
    this.getCiBoardTileCount = this.getCiBoardTileCount.bind(this);
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
                .length / this.getCiBoardTileCount()
            )),
      });
    };
    this.pageFlipInterval = setInterval(pageFlipCallback, 6000_000);

    const updateCallback = () => {
      const service = new GitLabService();
      if (service.shouldUpdate() && !this.loadingProjects) {
        this.loadingProjects = true;
        service.updateData().then((projects) => {
          this.loadingProjects = false;
          this.setState({
            gitLabProjects: projects,
            loadingAnimation: false,
            page: 0,
          });
        });
      }
    };
    this.updateInterval = setInterval(updateCallback, 30_000);
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
    if (this.state.loadingAnimation) {
      return this.renderLoadingAnimation();
    } else {
      const projects = this.filterGitLabProjectsWithPipelines(
        this.state.gitLabProjects
      );

      const pageSize = this.getCiBoardTileCount();

      let ciBoardPages = Math.floor(projects.length / pageSize);
      if (0 !== projects.length % pageSize) {
        ciBoardPages++;
      }

      const mrBoardPages = 1;
      const pages = ciBoardPages + mrBoardPages;

      if (this.state.page < ciBoardPages) {
        return this.renderCiBoard(projects, pageSize, pages);
      } else {
        return this.renderMrBoard(pages);
      }
    }
  }

  private renderLoadingAnimation() {
    return (
      <div className="Page Dashboard">
        <PageHeader title="Refreshing data" />
        <Typewriter text="Preparing dashboard. Please wait..." />
      </div>
    );
  }

  private renderMrBoard(pages: number) {
    return (
      <div className="Page Dashboard">
        <PageHeader title="Oldest Merge Requests" />
        <Carousel
          currentElement={this.state.page}
          elements={pages}
          onElementSelected={this.handlePageSelected}
        />
        <GlMrBoard projects={this.state.gitLabProjects} />
      </div>
    );
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
          columns={this.props.config?.display?.ciBoardColumns || 5}
          projects={projectsForPage}
          rows={this.props.config?.display?.ciBoardRows || 3}
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

  private getCiBoardTileCount(): number {
    return this.props.config?.display
      ? this.props.config.display.ciBoardColumns *
          this.props.config.display.ciBoardRows
      : this.defaultTileCount;
  }
}

export default DashboardPage;
