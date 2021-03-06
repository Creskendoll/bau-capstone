import React from "react";
import "../style/game-container.css";
import GameMode from "../resources/GameEnum";
import CardsGame from "./cards-game/CardsGame";
import Menu from "./Menu";
import DotsGame from "./dots-game/DotsGame";
import MathGame from "./math-game/MathGame";
import FaceScreen from "./face-api/FaceScreen";

interface Props {
  setScore: (f: (s: number) => number) => void;
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
        return <CardsGame setScore={props.setScore} />;
      case GameMode.DOTS:
        return <DotsGame setScore={props.setScore} />;
      case GameMode.MATH:
        return <MathGame setScore={props.setScore} />;
      case GameMode.FACE:
        return <FaceScreen />;
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
