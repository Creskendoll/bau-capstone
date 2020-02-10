import React from "react";
import Color from "../../misc/Color";
import "../../style/dots-game.css";
import CompPosition from "../../misc/CompPosition";

interface Props {
  color: Color;
  position: CompPosition;
}

const GameDot = (props: Props) => {
  const color = `rgba(${props.color.red}, ${props.color.green}, ${props.color.blue}, ${props.color.alpha})`;

  const dotStyle = {
    ...props.position,
    ...{
      background: color,
      position: "absolute",
      justifyContent: "center",
      alignItems: "center"
    }
  };

  return <div style={dotStyle as any} className="circle"></div>;
};

export default GameDot;