import React from "react";
import TSTypewriter from "react-ts-typewriter";

import "./Typewriter.css";

interface IProps {
  text: string;
}

function Typewriter(props: IProps) {
  return (
    <div className="Typewriter">
      <div className="Container">
        &gt; <TSTypewriter text={props.text} />
      </div>
    </div>
  );
}

export default Typewriter;
