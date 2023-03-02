import React from "react";
import moment from "moment";

import { MergeRequest } from "../../../model/merge-request";
import { Project } from "../../../model/project";
import GlMrRow from "./GlMrRow";
import "./GlMrBoard.css";

interface IProps {
  projects: Project[];
}

export default function GlMrBoard(props: IProps) {
  function getOldestMergeRequests(): MergeRequest[] {
    return props.projects
      .map((p) => p.mergeRequests)
      .flat(1)
      .sort((a, b) => {
        const momentA = moment(new Date(a.createdAt));
        const momentB = moment(new Date(b.createdAt));
        if (momentA.isBefore(momentB)) {
          return -1;
        }
        if (momentA.isAfter(momentB)) {
          return 1;
        }
        return 0;
      });
  }

  function getProjectNameForMergeRequest(mr: MergeRequest): string {
    for (let i = 0; i < props.projects.length; i++) {
      const mrs = props.projects[i].mergeRequests.map((mr) => mr.id);
      if (mrs.indexOf(mr.id) !== 1) {
        return props.projects[i].name;
      }
    }
    return "";
  }

  const oldestMergeRequests = getOldestMergeRequests();

  let maxAgeInSeconds = 0;
  if (oldestMergeRequests.length > 0) {
    var a = moment(new Date(oldestMergeRequests[0].createdAt));
    maxAgeInSeconds = moment().diff(a, "seconds");
  }

  // TODO: Limit number of merge requests to the number of visible row or a configured value
  const rows = oldestMergeRequests.map((mr) => (
    <GlMrRow
      key={mr.id}
      mergeRequest={mr}
      maxAgeInSeconds={maxAgeInSeconds}
      projectName={getProjectNameForMergeRequest(mr)}
    />
  ));

  return <div className="GlMrBoard">{rows}</div>;
}
