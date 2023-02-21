import React from "react";
import { Link } from "react-router-dom";

import "./PageHeader.css";

interface IProps {
  hideConfig?: boolean;
  title: string;
}

class PageHeader extends React.Component<IProps> {
  render() {
    const configLink = (
      <Link className="button is-link is-light" to={`/config`}>
        Configuration
      </Link>
    );
    return (
      <div className="PageHeader">
        <nav className="navbar" role="navigation" aria-label="main navigation">
          <div className="navbar-menu">
            <div className="navbar-start">
              <h3 className="is-size-3 ml-2">
                <Link to={`/home`} className="ml-2">
                  <svg id="logo" viewBox="0 0 512 512">
                    <path d="M0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zM288 96a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zM256 416c35.3 0 64-28.7 64-64c0-17.4-6.9-33.1-18.1-44.6L366 161.7c5.3-12.1-.2-26.3-12.3-31.6s-26.3 .2-31.6 12.3L257.9 288c-.6 0-1.3 0-1.9 0c-35.3 0-64 28.7-64 64s28.7 64 64 64zM176 144a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zM96 288a32 32 0 1 0 0-64 32 32 0 1 0 0 64zm352-32a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z" />
                  </svg>
                </Link>
                {this.props.title}
              </h3>
            </div>

            <div className="navbar-end">
              <div className="navbar-item">
                <div className="buttons">
                  <Link className="button is-link is-light" to={`/test`}>
                    Tests
                  </Link>
                  {!this.props.hideConfig ? configLink : undefined}
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default PageHeader;
