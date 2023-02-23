import React from "react";
import { Project } from "../../../model/project";
import GlCiTile from "./GlCiTile";

import "./GlCiBoard.css";

interface IProps {
  projects: Project[];
  tileCount: number;
}

class GlCiBoard extends React.Component<IProps> {
  render() {
    const tiles = this.filterProjectsWithTiles().map((project) => (
      <GlCiTile key={project.id} project={project} />
    ));

    return <div className="GitLabCiBoard">{tiles}</div>;
  }

  private filterProjectsWithTiles(): Project[] {
    return this.props.projects
      .filter((p) => !!p.pipeline)
      .sort((a, b) => {
        const nameA = a.name.toUpperCase();
        const nameB = b.name.toUpperCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      })
      .slice(0, this.props.tileCount);
  }
}

export default GlCiBoard;
