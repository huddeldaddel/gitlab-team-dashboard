import React from "react";
import moment from "moment";

import { MergeRequest } from "../../../model/merge-request";

import "./GlMrRow.css";

interface IProps {
  maxAgeInSeconds: number;
  mergeRequest: MergeRequest;
}

export default function GlMrRow(props: IProps) {
  const authorImage = props.mergeRequest.authorAvatar ? (
    <img
      src={props.mergeRequest.authorAvatar}
      alt={props.mergeRequest.authorName}
    />
  ) : undefined;

  let barStyle: React.CSSProperties = {
    background: "linear-gradient(to left, grey 0 40%, blue 40% 100%)",
    height: "0.5em"
  };

  return (
    <div className="GlMrRow">
      <div className="Author">{authorImage}</div>
      <div className="Progress">
        <div className="Bar" style={barStyle}></div>
        <div className="Description is-size-7 has-text-dark">{ props.mergeRequest.title }</div>
      </div>
      <div className="Age has-text-dark">
        {moment(new Date(props.mergeRequest.createdAt)).fromNow()}
      </div>
    </div>
  );
}
