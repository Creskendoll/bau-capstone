import React from "react";
import CompPosition from "../../misc/CompPosition";

interface Props {
  answer: string;
  position: CompPosition;
}

const Answer = (props: Props) => {
  const style = {
    ...props.position,
    ...{
      background: "yellow",
      position: "absolute",
      justifyContent: "center",
      alignItems: "center"
    }
  };

  return (
    <div style={style as any} className="question">
      <span>{props.answer}</span>
    </div>
  );
};

export default Answer;
