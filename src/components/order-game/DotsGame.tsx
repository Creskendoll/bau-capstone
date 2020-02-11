import React, { useState, useEffect } from "react";
import "../../style/dots-game.css";
import GameDot from "./GameDot";
import Color from "../../misc/Color";
import CompPosition from "../../misc/CompPosition";
import DotModel from "./DotModel";

const DotsGame = () => {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [dots, setDots] = useState<DotModel[]>([]);

  useEffect(() => {
    updateWindowDimensions();
    generateDots(5);
    window.addEventListener("resize", updateWindowDimensions);
  }, []);

  const updateWindowDimensions = () => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
  };

  const generateDots = (n: number) => {
    setDots(
      [...Array(n).keys()].map((val, index) => {
        const color: Color = {
          red: Math.random() * 255,
          green: Math.random() * 255,
          blue: Math.random() * 255,
          alpha: 1
        };
        const pos: CompPosition = {
          top: Math.random(),
          left: Math.random()
        };
        return {
          position: pos,
          color: color,
          index: index
        };
      })
    );
  };

  const onDotClick = (index: number) => {
    console.log(index);
    generateDots(5);
  };
  const getDots = () => {
    // Defined in game-container.css
    // Subtract the size of the dots
    const containerH = windowSize.height * 0.8 - 50;
    const containerW = windowSize.width * 0.95 - 50;

    return dots.map((dot, index) => {
      const pos: CompPosition = {
        top: dot.position.top * containerH,
        left: dot.position.left * containerW
      };
      return (
        <GameDot
          key={index}
          color={dot.color}
          position={pos}
          onClick={() => onDotClick(index)}
        />
      );
    });
  };

  return <div className="dots-game-area">{getDots()}</div>;
};

export default DotsGame;
