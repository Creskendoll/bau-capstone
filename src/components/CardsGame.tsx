import React from "react";
import GameCard from "./GameCard";
import "../style/cards-game.css";

const CardsGame = () => {
  const getCards = (n: number) => {
    const card =
      "https://raw.githubusercontent.com/remojansen/logo.ts/master/ts.png";
    return [...Array(n).keys()].map(val => (
      <GameCard imageSrc={card} key={val} />
    ));
  };

  return <div className="cards-game-area">{getCards(8)}</div>;
};

export default CardsGame;
