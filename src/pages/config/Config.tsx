import React from 'react';

import { ConfigService } from '../../services/config-service'
import { DashboardConfig } from '../../model/dashboard-config';
import { GitLabConfig } from '../../model/gitlab-config';
import PageHeader from '../../components/PageHeader'

import './Config.css';

interface IProps {
}

interface IState {
    gitLabHost: string;
    gitLabMaxProjectCount: number;
    gitLabToken: string;
}

class ConfigPage extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);

        this.state = {
            gitLabHost: "",
            gitLabMaxProjectCount: 0,
            gitLabToken: ""
        };

        this.initializeState = this.initializeState.bind(this);
        this.handleGitLabHostChange = this.handleGitLabHostChange.bind(this);
        this.handleGitLabMaxProjectCountChange = this.handleGitLabMaxProjectCountChange.bind(this);
        this.handleGitLabTokenChange = this.handleGitLabTokenChange.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(): void {
        this.initializeState();
    }

    initializeState() {
        var config = new ConfigService().LoadConfig();
        if (config) {
            this.setState({
                gitLabHost: config.gitlab?.host || "",
                gitLabMaxProjectCount: (typeof config.gitlab?.maxProjectCount == 'number' ? config.gitlab?.maxProjectCount : 0),
                gitLabToken: config.gitlab?.token || ""                
            });
        } else {
            this.setState({
                gitLabHost: "",
                gitLabMaxProjectCount: 0,
                gitLabToken: ""
            });
        }
    }

    handleGitLabHostChange(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ gitLabHost: e.currentTarget.value });
    }

    handleGitLabMaxProjectCountChange(e: React.ChangeEvent<HTMLSelectElement>) {
        this.setState({ gitLabMaxProjectCount: parseInt(e.currentTarget.value) });
    }

    handleGitLabTokenChange(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ gitLabToken: e.currentTarget.value });
    }

    handleReset(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        this.initializeState();
        event.preventDefault();
    }

    handleSubmit(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        var maxProjectCount = (0 < this.state.gitLabMaxProjectCount) ? this.state.gitLabMaxProjectCount : undefined;        
        var config = new DashboardConfig(new GitLabConfig(this.state.gitLabHost, this.state.gitLabToken, maxProjectCount));
        new ConfigService().UpdateConfig(config);
        window.location.href = '/';
        event.preventDefault();
    }

    render() {
        return (
            <div className="Page ConfigPage">
                <PageHeader title="GitLab Team Dashboard - Configuration" hideConfig={true} />
                <div className="container is-max-desktop">

                    <form>
                        <h3 className="title is-4 is-spaced bd-anchor-title">GitLab</h3>

                        <div className="field">
                            <label className="label">GitLab Host</label>
                            <div className="control">
                                <input
                                    className="input" type="text" placeholder="https://gitlab.com"
                                    value={this.state.gitLabHost} onChange={this.handleGitLabHostChange} />
                            </div>
                        </div>

                        <div className="field">
                            <label className="label">GitLab Token</label>
                            <div className="control">
                                <input className="input" type="text" placeholder="glpat-...." value={this.state.gitLabToken} onChange={this.handleGitLabTokenChange} />
                            </div>
                        </div>

                        <div className="field">
                            <label className="label">Do you want to restrict the number of projects shown?</label>
                            <div className="control">
                                <div className="select">
                                    <select value={this.state.gitLabMaxProjectCount} onChange={this.handleGitLabMaxProjectCountChange}>
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

                        <div className="field is-grouped">
                            <div className="control">
                                <button className="button is-link" onClick={this.handleSubmit}>Submit</button>
                            </div>
                            <div className="control">
                                <button className="button is-link is-light" onClick={this.handleReset}>Reset</button>
                            </div>
                            <div className="control">
                                <a href="/" className="button is-link is-light">Cancel</a>
                            </div>
                        </div>
                    </form>

                </div>
            </div>
        );
    }
}

export default ConfigPage;