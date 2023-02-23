import React from "react";
import moment from "moment";

import { Project } from "../../../model/project";

import "./GlCiTile.css";

interface IProps {
  project: Project;
}

function GlCiTile(props: IProps) {
  function getTileClassName() {
    if ("success" === props.project.pipeline?.status) {
      return "GitLabCiTile success";
    } else if ("failed" === props.project.pipeline?.status) {
      return "GitLabCiTile failure";
    }
    return "GitLabCiTile";
  }

  let pipelineDate = props.project.pipeline?.createdAt || "";
  let duration = null;
  if (props.project.pipeline?.updatedAt) {
    pipelineDate = props.project.pipeline?.updatedAt;
    duration =
      new Date(pipelineDate).getTime() -
      new Date(props.project.pipeline?.createdAt || "").getTime();
  }

  return (
    <div className={getTileClassName()}>
      <a href={props.project.pipeline?.webUrl}>
        <div className="tile-main">
          <div className="project-name">{props.project.name}</div>
          <div className="pipeline-status">
            {props.project.pipeline?.status}
          </div>
          <div className="pipeline-duration">{ moment.duration(duration).humanize() }</div>
        </div>
        <div className="tile-footer">
          <div className="pipeline-age">
            {moment(new Date(pipelineDate)).fromNow()}
          </div>
          <div className="pipeline-id">#{props.project.pipeline?.id}</div>
        </div>
      </a>
    </div>
  );
}

export default GlCiTile;
