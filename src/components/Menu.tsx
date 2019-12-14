import React from "react";
import "../style/menu.css";
import GameMode from "../resources/GameEnum";

interface Props {
  onClick: (gameMode: GameMode) => void;
}

const Menu: React.FC<Props> = (props: Props) => {
  return (
    <div className="menu-container">
      <button
        onClick={() => props.onClick(GameMode.CARDS)}
        className="menu-button"
      >
        CARDS
      </button>

      <button
        onClick={() => props.onClick(GameMode.CARDS)}
        className="menu-button"
      >
        CARDS
      </button>

      <button
        onClick={() => props.onClick(GameMode.CARDS)}
        className="menu-button"
      >
        CARDS
      </button>
    </div>
  );
};

export default Menu;
