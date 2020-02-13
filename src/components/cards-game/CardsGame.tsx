import React from "react";
import GameCard from "./GameCard";
import "../../style/cards-game.css";

const CardsGame = () => {
  // TODO: Add game logic

  // TODO: make this generate random pairs of cards

  // Find the algorithm in the method called 'getCards' below
  // https://github.com/Creskendoll/BAU-Kotlin-Project/blob/master/app/src/main/java/com/kenansoylu/bauproject/activity/GameActivity.kt
  const getCards = (n: number) => {
    const card =
      "https://raw.githubusercontent.com/remojansen/logo.ts/master/ts.png";
    // Map a range to GameCards
    return [...Array(n).keys()].map(val => (
      <GameCard imageSrc={card} key={val} />
    ));
  };

  // Display n cards depending on the difficulty
  return <div className="cards-game-area">{getCards(8)}</div>;
};

export default CardsGame;
