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

  const oldestMergeRequest = getOldestMergeRequests();

  let maxAgeInSeconds = 0;
  if (oldestMergeRequest.length > 0) {
    var a = moment(new Date(oldestMergeRequest[0].createdAt));
    maxAgeInSeconds = moment().diff(a, "seconds");
  }

  const rows = oldestMergeRequest.map((mr) => (
    <GlMrRow key={mr.id} mergeRequest={mr} maxAgeInSeconds={maxAgeInSeconds} />
  ));

  return <div className="GlMrBoard">{rows}</div>;
}