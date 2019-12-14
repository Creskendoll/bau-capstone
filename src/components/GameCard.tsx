import React from "react";

interface Props {
  imageSrc: string;
}

const GameCard: React.FC<Props> = (props: Props) => {
  return (
    <div className="card-container">
      <img className="card-image" src={props.imageSrc} alt="Card" />
    </div>
  );
};

export default GameCard;
