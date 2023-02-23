import React from "react";
import { Project } from "../../../model/project";
import GlCiTile from "./GlCiTile";

import "./GlCiBoard.css";

interface IProps {
    projects: Project[];
    tileCount: 20;
}

class GlCiBoard extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);
  }

  render() {
    const tiles = this.filterProjectsWithTiles().map((project) => <GlCiTile key={project.id} project={project} />)

    return (
      <div className="GitLabCiBoard">
        { tiles }
      </div>
    );
  }

  private filterProjectsWithTiles(): Project[] {
    return this.props.projects;
  }

}

export default GlCiBoard;
