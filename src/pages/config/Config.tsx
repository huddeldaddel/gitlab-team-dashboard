import React from 'react';
import { ConfigService } from '../../services/config-service'
import { DashboardConfig } from '../../model/dashboard-config';
import { GitLabConfig } from '../../model/gitlab-config';

import './Config.css';

interface IProps {
}

interface IState {
    gitLabHost: string;
    gitLabToken: string;
}

class ConfigPage extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);

        this.state = {
            gitLabHost: "",
            gitLabToken: ""
        };

        this.initializeState = this.initializeState.bind(this);
        this.handleGitLabHostChange = this.handleGitLabHostChange.bind(this);
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
                gitLabToken: config.gitlab?.token || ""
            });
        } else {
            this.setState({
                gitLabHost: "",
                gitLabToken: ""
            });
        }
    }

    handleGitLabHostChange(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ gitLabHost: e.currentTarget.value });
    }

    handleGitLabTokenChange(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ gitLabToken: e.currentTarget.value });
    }

    handleReset(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        this.initializeState();
    }

    handleSubmit(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        var config = new DashboardConfig(new GitLabConfig(this.state.gitLabHost, this.state.gitLabToken));
        new ConfigService().UpdateConfig(config);
        event.preventDefault();
    }

    render() {
        return (
            <div className="ConfigPage">
                <div className="container is-max-desktop">

                    <h1 className="is-size-1 has-text-centered">Configuration</h1>


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

                        <div className="field is-grouped">
                            <div className="control">
                                <button className="button is-link" onClick={this.handleSubmit}>Submit</button>
                            </div>
                            <div className="control">
                                <button className="button is-link is-light" onClick={this.handleReset}>Cancel</button>
                            </div>
                        </div>
                    </form>

                </div>                
            </div>
        );
    }
}

export default ConfigPage;