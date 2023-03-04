import React from "react";
import moment from "moment";

import { MergeRequest } from "../../../model/merge-request";

import "./GlMrRow.css";

interface IProps {
  maxAgeInSeconds: number;
  mergeRequest: MergeRequest;
  projectName: string;
}

export default function GlMrRow(props: IProps) {
  const authorImage = props.mergeRequest.authorAvatar ? (
    <img
      src={props.mergeRequest.authorAvatar}
      alt={props.mergeRequest.authorName}
    />
  ) : undefined;

  const mrAgeInSeconds = moment().diff(
    moment(new Date(props.mergeRequest.createdAt)),
    "seconds"
  );

  const barLength = Math.floor(100 / (props.maxAgeInSeconds / mrAgeInSeconds));
  let barColor = "hsl(141, 71%, 48%)";
  if (mrAgeInSeconds > 24 * 60 * 60) {
    barColor = "hsl(48, 100%, 67%)";
  }
  if (mrAgeInSeconds > 3 * 24 * 60 * 60) {
    barColor = "hsl(348, 100%, 61%)";
  }
  let backgroundStyle = `linear-gradient(to left, whitesmoke 0 ${
    100 - barLength
  }%, ${barColor} ${100 - barLength}%  100%)`;
  let barStyle: React.CSSProperties = {
    background: backgroundStyle,
    height: "0.5em",
  };

  return (
    <div className="GlMrRow">
      <div className="Author">{authorImage}</div>
      <div className="Progress">
        <div className="PrContent">
          <div className="Bar" style={barStyle}></div>
          <div className="Description is-size-7 has-text-dark">
            <span className="ProjectName">{props.projectName}</span> - {props.mergeRequest.title}
          </div>
        </div>
      </div>
      <div className="Age has-text-dark">
        {moment(new Date(props.mergeRequest.createdAt)).fromNow()}
      </div>
    </div>
  );
}
