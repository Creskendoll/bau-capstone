import React from "react";
import "../../style/dots-game.css";
import GameDot from "./GameDot";
import Color from "../../misc/Color";
import CompPosition from "../../misc/CompPosition";

const DotsGame = () => {
  const getDots = (n: number) => {
    return [...Array(n).keys()].map((val, index) => {
      const color: Color = {
        red: 50,
        green: 100,
        blue: 240,
        alpha: 1
      };
      const pos: CompPosition = {
        bottom: 50 * index,
        top: 50 * index,
        left: 50 * index,
        right: 50 * index
      };
      return <GameDot color={color} position={pos} />;
    });
  };
  return <div className="dots-game-area">{getDots(5)}</div>;
};

export default DotsGame;
