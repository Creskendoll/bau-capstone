import React from "react";
import "../style/menu.css";
import GameMode from "../resources/GameEnum";

interface Props {
  onClick: (gameMode: GameMode) => void;
}

const Menu = (props: Props) => {
  // TODO: Add more options
  return (
    <div className="menu-container">
      <button
        onClick={() => props.onClick(GameMode.FACE)}
        className="menu-button"
      >
        <span className="menu-button-text">FACE</span>
      </button>

      <button
        onClick={() => props.onClick(GameMode.MATH)}
        className="menu-button"
      >
        <span className="menu-button-text">MATH</span>
      </button>

      <button
        onClick={() => props.onClick(GameMode.CARDS)}
        className="menu-button"
      >
        <span className="menu-button-text">MATCH</span>
      </button>

      <button
        onClick={() => props.onClick(GameMode.DOTS)}
        className="menu-button"
      >
        <span className="menu-button-text">MEMORIZE</span>
      </button>
    </div>
  );
};

export default Menu;
