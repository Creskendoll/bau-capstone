import React from "react";
import "../style/game-container.css";
import GameMode from "../resources/GameEnum";
import CardsGame from "./CardsGame";
import Menu from "./Menu";

interface Props {
  gameMode: GameMode;
  onMenuBtnClick: (gameMode: GameMode) => void;
}

const GameContainer: React.FC<Props> = (props: Props) => {
  const getGame = () => {
    // TODO: Add more games
    switch (props.gameMode) {
      case GameMode.MENU:
        return <Menu onClick={props.onMenuBtnClick} />;
      case GameMode.CARDS:
        return <CardsGame />;
      default:
        break;
    }
  };

  return (
    <div className="background">
      <div className="game-container">{getGame()}</div>
    </div>
  );
};

export default GameContainer;
