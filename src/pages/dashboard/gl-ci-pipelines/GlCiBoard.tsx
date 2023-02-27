import React from "react";
import { Project } from "../../../model/project";
import GlCiTile from "./GlCiTile";

import "./GlCiBoard.css";

interface IProps {
  projects: Project[];
  tileCount: number;
}

export default function GlCiBoard(props: IProps) {
  const tiles = props.projects.map((project) => (
    <GlCiTile key={project.id} project={project} />
  ));

  return <div className="GitLabCiBoard">{tiles}</div>;
}
