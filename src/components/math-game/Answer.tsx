import React from "react";
import QuestionModel from "./QuestionModel";

interface Props {
  model: QuestionModel;
  onClick: () => void;
  className: string;
}

const Answer = (props: Props) => {
  const style = {
    ...props.model.answer!!.position,
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
      <span>{props.model.answer!!.value.toString()}</span>
    </div>
  );
};

export default Answer;
