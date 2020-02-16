import React from "react";
import QuestionModel from "./QuestionModel";

interface Props {
  model: QuestionModel;
}

const Question = (props: Props) => {
  const style = {
    ...props.model.position,
    ...{
      background: "cornflowerblue",
      position: "absolute"
    }
  };

  return (
    <div style={style as any} className="question">
      <span>{props.model.question}</span>
    </div>
  );
};

export default Question;
