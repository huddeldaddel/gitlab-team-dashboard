import React from 'react';

import './PageFooter.css';

interface IProps { }

interface IState { }

class PageFooter extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <footer className="footer">
                <div className="content has-text-centered">
                    <p>
                        <strong>GitLab Team Dashboard</strong> by <a href="https://www.thomas-werner.engineer">Thomas Werner</a>. The source code is licensed <a href="http://opensource.org/licenses/mit-license.php">MIT</a>.
                    </p>
                </div>
            </footer>
        );
    }
}

export default PageFooter;