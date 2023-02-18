import React from 'react';
import { DashboardConfig } from '../../model/dashboard-config';
import { Gitlab } from '@gitbeaker/browser'; // All Resources

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
        this.handleGetSpecificProject = this.handleGetSpecificProject.bind(this);
        this.handleGetProjectsOfGroup = this.handleGetProjectsOfGroup.bind(this);
    }

    async handleGetSpecificProject(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {        
        try {
            const api = new Gitlab({
                host: this.props.config.gitlab?.host,
                token: this.props.config.gitlab?.token,
            });

            // const project = await api.Projects.show(43595685);
            const project = await api.Projects.all();
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
            <div className="TestPage">
                <div className="control">
                    <button className="button is-link is-light" onClick={this.handleGetSpecificProject}>Get specific project</button>
                </div>

                <div className="control">
                    <button className="button is-link is-light" onClick={this.handleGetProjectsOfGroup}>Get projects of group</button>
                </div>
            </div>
        );
    }
}

export default TestPage;