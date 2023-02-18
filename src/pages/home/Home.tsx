import React from 'react';

import { DashboardConfig } from '../../model/dashboard-config';
import PageHeader from '../../components/PageHeader'

import './Home.css';

interface IProps {
    config: DashboardConfig | null;
}

interface IState {
}

class HomePage extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {};        

        this.navigateToDashboard = this.navigateToDashboard.bind(this);
    }

    navigateToDashboard() {
        window.location.href = "/dashboard";
    }

    render() {        
        return (
            <div className="Page TestPage">
                <PageHeader title="GitLab Team Dashboard - Home" />

                Bla bla bla 

                <div className="control">
                    <a href="/config" className="button is-link is-light">Get started!</a>
                </div>

                <div className="control">
                    <button className="button is-link is-light" disabled={!this.props.config} onClick={this.navigateToDashboard}>Show dashboard</button>
                </div>
            </div>
        );
    }
}

export default HomePage;