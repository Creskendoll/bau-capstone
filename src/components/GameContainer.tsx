import React from "react";
import "../style/game-container.css";
import GameMode from "../resources/GameEnum";
import CardsGame from "./cards-game/CardsGame";
import Menu from "./Menu";
import DotsGame from "./dots-game/DotsGame";
import MathGame from "./math-game/MathGame";

interface Props {
  gameMode: GameMode;
  onMenuBtnClick: (gameMode: GameMode) => void;
}

const GameContainer = (props: Props) => {
  const getGame = () => {
    switch (props.gameMode) {
      case GameMode.MENU:
        // Display menu
        return <Menu onClick={props.onMenuBtnClick} />;
      case GameMode.CARDS:
        return <CardsGame />;
      case GameMode.DOTS:
        return <DotsGame />;
      case GameMode.MATH:
        return <MathGame />;
      default:
        return <Menu onClick={props.onMenuBtnClick} />;
    }
  };

  // Render the current game
  return (
    <div className="background">
      <div className="game-container">{getGame()}</div>
    </div>
  );
};

export default GameContainer;
