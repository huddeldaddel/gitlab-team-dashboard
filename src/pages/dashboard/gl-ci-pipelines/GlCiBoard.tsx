import React from "react";
import _ from "lodash";
import { Project } from "../../../model/project";
import GlCiTile from "./GlCiTile";

import "./GlCiBoard.css";

interface IProps {
  columns: number;
  projects: Project[];
  rows: number;
}

export default function GlCiBoard(props: IProps) {
  const rows = _.chunk(props.projects, props.columns).map((projectsPerRow) => {
    const cells = projectsPerRow.map((project) => (
      <GlCiTile
        key={project.id}
        project={project}
        width={`${100 / props.columns}%`}
      />
    ));
    const key = projectsPerRow
      .map((project) => project.id.toString())
      .reduce((v1, v2) => `${v1}_${v2}`);
    return (
      <div
        className="GlCiBoardRow"
        key={key}
        style={{ height: `${100 / props.rows}%` }}
      >
        {cells}
        <div style={{display: "table-cell"}}></div>
      </div>
    );
  });

  return (
    <div className="GlCiBoard">
      {rows}
      <div className="GlCiBoardRow"></div>
    </div>
  );
}
