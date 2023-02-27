import React from "react";

import "./Carousel.css";

interface IProps {
  currentElement: number;
  elements: number;
  onElementSelected: (selectedElement: number) => void;
}

export default function Carousel(props: IProps) {
  let dots = Array.from({ length: props.elements }, (_, i) => i).map(
    (index) => (
      <input
        type="radio"        
        key={`radio-${index}`}
        name="carousel-group"
        checked={index === props.currentElement}
        onClick={() => props.onElementSelected(index)}
        readOnly={true}
      />
    )
  );

  return <div className="Carousel">{dots}</div>;
}
