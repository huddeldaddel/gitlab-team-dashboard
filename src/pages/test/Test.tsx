import React from 'react';
import { DashboardConfig } from '../../model/dashboard-config';
import { Gitlab } from '@gitbeaker/browser'; // All Resources
import PageHeader from '../../components/PageHeader'

import './Test.css';

interface IProps {
    config: DashboardConfig
}

interface IState {

}

class TestPage extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {};
        this.handleProjectList = this.handleProjectList.bind(this);
        this.handleGetProjectsOfGroup = this.handleGetProjectsOfGroup.bind(this);
    }

    async handleProjectList(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        try {
            const api = new Gitlab({
                host: this.props.config.gitlab?.host,
                token: this.props.config.gitlab?.token,
            });
            var maxPages = typeof this.props.config.gitlab?.maxProjectCount == 'number'
                ? this.props.config.gitlab?.maxProjectCount / 20
                : undefined;

            const project = await api.Projects.all({ maxPages: maxPages });
            console.log("Received project: " + JSON.stringify(project));
        } catch (error) {
            console.error("Failed to load errors: " + error);
        }
    }

    async handleGetProjectsOfGroup(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        console.debug("Now trying to access " + this.props.config.gitlab?.host);

        try {
            const api = new Gitlab({
                host: this.props.config.gitlab?.host,
                token: this.props.config.gitlab?.token,
            });

            const group = await api.Groups.show(63977505);
            console.log("Received group: " + JSON.stringify(group));
        } catch (error) {
            console.error("Failed to load errors: " + error);
        }
    }

    render() {
        return (
            <div className="Page TestPage">
                <PageHeader title="GitLab Team Dashboard - Test" />

                <div className="control">
                    <button className="button is-link is-light" onClick={this.handleProjectList}>List all projects</button>
                </div>

                <div className="control">
                    <button className="button is-link is-light" onClick={this.handleGetProjectsOfGroup}>Get projects of group</button>
                </div>
            </div>
        );
    }
}

export default TestPage;