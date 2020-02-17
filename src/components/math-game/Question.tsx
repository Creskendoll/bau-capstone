import React from "react";
import QuestionModel from "./QuestionModel";

interface Props {
  model: QuestionModel;
  onClick: () => void;
  className: string;
}

const Question = (props: Props) => {
  const style = {
    ...props.model.position!!,
    ...{
      position: "absolute"
    }
  };

  return (
    <div
      onClick={props.onClick}
      style={style as any}
      className={props.className}
    >
      <span>{props.model.question}</span>
    </div>
  );
};

export default Question;
