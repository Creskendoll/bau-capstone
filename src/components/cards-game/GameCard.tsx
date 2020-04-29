import React from "react";
import { CardModel, CardFace } from "./CardModel";

interface Props {
  model: CardModel
  onClick: () => void;
}

interface CardStyle {
  backgroundImage: string,
  backgroundColor: string
}

const GameCard: React.FC<Props> = (props: Props) => {
  const model = props.model;
  const style = {
    backgroundImage: model.face === CardFace.FRONT ? "none" : `url("https://raw.githubusercontent.com/remojansen/logo.ts/master/ts.png")`,
    backgroundColor: model.face === CardFace.FRONT ? model.color : "black"
  };

  return (
    <div className="card-container">
      <div className="card-image" style={style as CardStyle} onClick={props.onClick} />
    </div>
  );
};

export default GameCard;
