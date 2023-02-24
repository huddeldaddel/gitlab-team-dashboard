import React from "react";

import { ConfigService } from "../../services/config-service";
import { DashboardConfig } from "../../model/dashboard-config";
import { DisplayConfig } from "../../model/display-config";
import { GitLabConfig } from "../../model/gitlab-config";
import PageHeader from "../../components/PageHeader";
import DisplayIcon from "./DisplayIcon";
import GitLabIcon from "./GitLabIcon";

import "./Config.css";

interface IProps {}

interface IState {
  displayNumberOfPipelines: number;

  gitLabHost: string;
  gitLabMaxProjectCount: number;
  gitLabRefreshInterval: number;
  gitLabToken: string;
  selectedTab: number;
}

class ConfigPage extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      displayNumberOfPipelines: 15,
      gitLabHost: "",
      gitLabMaxProjectCount: 0,
      gitLabRefreshInterval: 15,
      gitLabToken: "",
      selectedTab: 0,
    };

    this.initializeState = this.initializeState.bind(this);
    this.handleDisplayNumberOfPipelinesChange =
      this.handleDisplayNumberOfPipelinesChange.bind(this);
    this.handleGitLabHostChange = this.handleGitLabHostChange.bind(this);
    this.handleGitLabMaxProjectCountChange =
      this.handleGitLabMaxProjectCountChange.bind(this);
    this.handleGitLabRefreshIntervalChange =
      this.handleGitLabRefreshIntervalChange.bind(this);
    this.handleGitLabTokenChange = this.handleGitLabTokenChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDisplayTabSelected = this.handleDisplayTabSelected.bind(this);
    this.handleGitLabTabSelected = this.handleGitLabTabSelected.bind(this);
  }

  componentDidMount(): void {
    this.initializeState();
  }

  initializeState() {
    var config = new ConfigService().loadConfig();
    if (config) {
      this.setState({
        displayNumberOfPipelines: config.display?.numberOfPipelines || 15,
        gitLabHost: config.gitlab?.host || "",
        gitLabMaxProjectCount:
          typeof config.gitlab?.maxProjectCount == "number"
            ? config.gitlab?.maxProjectCount
            : 0,
        gitLabRefreshInterval: config.gitlab?.refreshInterval || 15,
        gitLabToken: config.gitlab?.token || "",
      });
    } else {
      this.setState({
        displayNumberOfPipelines: 15,
        gitLabHost: "",
        gitLabMaxProjectCount: 0,
        gitLabRefreshInterval: 15,
        gitLabToken: "",
      });
    }
  }

  handleDisplayTabSelected() {
    this.setState({ selectedTab: 1 });
  }

  handleGitLabTabSelected() {
    this.setState({ selectedTab: 0 });
  }

  handleDisplayNumberOfPipelinesChange(e: React.ChangeEvent<HTMLInputElement>) {
    const inputAsNumber = parseInt(e.currentTarget.value);
    this.setState({
      displayNumberOfPipelines: isNaN(inputAsNumber) ? 0 : inputAsNumber,
    });
  }

  handleGitLabHostChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ gitLabHost: e.currentTarget.value });
  }

  handleGitLabMaxProjectCountChange(e: React.ChangeEvent<HTMLSelectElement>) {
    this.setState({ gitLabMaxProjectCount: parseInt(e.currentTarget.value) });
  }

  handleGitLabRefreshIntervalChange(e: React.ChangeEvent<HTMLSelectElement>) {
    this.setState({ gitLabRefreshInterval: parseInt(e.currentTarget.value) });
  }

  handleGitLabTokenChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ gitLabToken: e.currentTarget.value });
  }

  handleSubmit(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    var maxProjectCount =
      0 < this.state.gitLabMaxProjectCount
        ? this.state.gitLabMaxProjectCount
        : undefined;
    var config = new DashboardConfig(
      new DisplayConfig(this.state.displayNumberOfPipelines),
      new GitLabConfig(
        this.state.gitLabHost,
        this.state.gitLabToken,
        maxProjectCount,
        this.state.gitLabRefreshInterval
      )
    );
    new ConfigService().updateConfig(config);
    window.location.href = "/";
    event.preventDefault();
  }

  render() {
    return (
      <div className="Page ConfigPage">
        <PageHeader
          title="GitLab Team Dashboard - Configuration"
          hideConfig={true}
        />

        <div className="container is-max-desktop">
          <form>
            <div className="tabs is-centered is-boxed">
              <ul>
                <li
                  className={this.state.selectedTab === 0 ? "is-active" : ""}
                  onClick={this.handleGitLabTabSelected}
                >
                  <span className="anchor">
                    <GitLabIcon />
                    <span>GitLab</span>
                  </span>
                </li>
                <li
                  className={this.state.selectedTab === 1 ? "is-active" : ""}
                  onClick={this.handleDisplayTabSelected}
                >
                  <span className="anchor">
                    <DisplayIcon />
                    <span>Display</span>
                  </span>
                </li>
              </ul>
            </div>

            <div
              className={
                "container configuration gitlab " +
                (this.state.selectedTab === 0 ? "active" : "")
              }
            >
              <div className="field">
                <label className="label">GitLab Server</label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    placeholder="https://gitlab.com"
                    value={this.state.gitLabHost}
                    onChange={this.handleGitLabHostChange}
                  />
                </div>
              </div>

              <div className="field">
                <label className="label">Personal access token</label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    placeholder="glpat-...."
                    value={this.state.gitLabToken}
                    onChange={this.handleGitLabTokenChange}
                  />
                </div>
                <p className="help">
                  Click{" "}
                  <a
                    href="https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html"
                    rel="noreferrer"
                    target={"_blank"}
                  >
                    here
                  </a>{" "}
                  to learn how to create such a token
                </p>
              </div>

              <div className="field">
                <label className="label">
                  How often do you want the data to be updated?
                </label>
                <div className="control">
                  <div className="select">
                    <select
                      value={this.state.gitLabMaxProjectCount}
                      onChange={this.handleGitLabMaxProjectCountChange}
                    >
                      <option value="5">Every 5 minutes</option>
                      <option value="10">Every 10 minutes</option>
                      <option value="15">Every 15 minutes</option>
                      <option value="30">Every 30 minutes</option>
                      <option value="60">Every 60 minutes</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="field">
                <label className="label">
                  Do you want to restrict the number of projects shown?
                </label>
                <div className="control">
                  <div className="select">
                    <select
                      value={this.state.gitLabRefreshInterval}
                      onChange={this.handleGitLabRefreshIntervalChange}
                    >
                      <option value="0">No. Show all projects.</option>
                      <option value="20">Yes. Show 20 projects.</option>
                      <option value="40">Yes. Show 40 projects.</option>
                      <option value="60">Yes. Show 60 projects.</option>
                      <option value="80">Yes. Show 80 projects.</option>
                      <option value="100">Yes. Show 100 projects.</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div
              className={
                "container configuration display " +
                (this.state.selectedTab === 1 ? "active" : "")
              }
            >
              <div className="field">
                <label className="label">
                  How many tiles do you want to see on the CI pipeline board?
                </label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    placeholder="15"
                    value={this.state.displayNumberOfPipelines}
                    onChange={this.handleDisplayNumberOfPipelinesChange}
                  />
                </div>
              </div>
            </div>

            <div className="container configuration actions">
              <div className="field is-grouped">
                <div className="control">
                  <button
                    className="button is-primary"
                    onClick={this.handleSubmit}
                  >
                    Submit
                  </button>
                </div>
                <div className="control">
                  <a href="/" className="button is-warning">
                    Cancel
                  </a>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default ConfigPage;
