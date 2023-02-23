import React from "react";
import { Project } from "../../../model/project";

import "./GlCiTile.css";

interface IProps {
    project: Project;    
}

class GlCiTile extends React.Component<IProps> {
  render() {    
    return (
      <div className="GitLabCiTile">
        <div>{this.props.project.name}</div>
        <div>{this.props.project.pipeline?.status}</div>
      </div>
    );
  }
}

export default GlCiTile;
