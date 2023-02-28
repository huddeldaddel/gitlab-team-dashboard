import React from "react";

import "./PageFooter.css";

class PageFooter extends React.Component {
  render() {
    return (
      <footer className="footer">
        <div className="content has-text-centered has-text-black">
          <p>
            <strong>GitLab Team Dashboard</strong> by{" "}
            <a href="https://www.thomas-werner.engineer">Thomas Werner</a>. The
            <a href="https://github.com/huddeldaddel/gitlab-team-dashboard">source code</a> is licensed{" "}
            <a href="http://opensource.org/licenses/mit-license.php">MIT</a>.
          </p>
        </div>
      </footer>
    );
  }
}

export default PageFooter;
