import React, { useState, useEffect } from "react";
import "../../style/dots-game.css";
import GameDot from "./GameDot";
import Color from "../../misc/Color";
import CompPosition from "../../misc/CompPosition";

const DotsGame = () => {

  const [windowSize, setWindowSize] = useState({width: 0, height: 0});
  
  useEffect(() => {
    updateWindowDimensions();
    window.addEventListener('resize', updateWindowDimensions);
  }, []);

  const updateWindowDimensions = () => {
    setWindowSize({width: window.innerWidth, height: window.innerHeight});
  }

  const onDotClick = (index : number) => {
    console.log(index);
  }
  const getDots = (n: number) => {
    // Defined in game-container.css 
    // Subtract the width and height of the dots
    const containerH = (windowSize.height * 0.8) - 50;
    const containerW = (windowSize.width * 0.95) - 50;

    return [...Array(n).keys()].map((val, index) => {
      const color: Color = {
        red: 50,
        green: 100,
        blue: 240,
        alpha: 1
      };
      const pos: CompPosition = {
        top: Math.random() * containerH,
        left: Math.random() * containerW
      };
      return <GameDot key={val} color={color} position={pos} onClick={(index) => onDotClick(index)} />;
    });
  };
  return <div className="dots-game-area">{getDots(5)}</div>;
};

export default DotsGame;
