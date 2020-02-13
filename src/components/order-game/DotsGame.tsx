import React, { useState, useEffect, useRef } from "react";
import "../../style/dots-game.css";
import GameDot from "./GameDot";
import Color from "../../misc/Color";
import CompPosition from "../../misc/CompPosition";
import DotModel from "./DotModel";

const highlightColor: Color = {
  red: 250,
  green: 50,
  blue: 50,
  alpha: 1
};

enum SequenceState {
  NOT_RAN,
  RUNNING,
  RAN
}

const DotsGame = () => {
  const [sequenceState, setSequenceState] = useState(SequenceState.NOT_RAN);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [dots, setDots] = useState<DotModel[]>([]);
  const [userClicks, setUserClicks] = useState<DotModel[]>([]);

  const updateWindowDimensions = () => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
  };

  const updateDot = (oldDot: DotModel, newDot: DotModel) => {
    const newDots = dots.slice();
    newDots[oldDot.index] = newDot;
    setDots(newDots);
  };

  const runSequence = () => {
    setSequenceState(SequenceState.RUNNING);

    const sleep = (ms: number) => {
      return new Promise(resolve => {
        setTimeout(resolve, ms);
      });
    };

    dots.forEach(async (dot, index) => {
      const newDot = Object.assign({}, dot);
      newDot.color = highlightColor;
      await sleep(1000 * (index + 1));
      updateDot(dot, newDot);
      await sleep(500);
      updateDot(newDot, dot);
      if (index === dots.length - 1) setSequenceState(SequenceState.RAN);
    });
  };

  const generateDots = (n: number) => {
    setDots(
      [...Array(n).keys()].map(index => {
        const color: Color = {
          red: 50,
          green: 150,
          blue: 220,
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
    setSequenceState(SequenceState.NOT_RAN);
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
          className={
            dot.color === highlightColor ? "circle expanded" : "circle"
          }
          color={dot.color}
          position={pos}
          onClick={() => onDotClick(dot)}
        />
      );
    });
  };

  const onDotClick = (dot: DotModel) => {
    if (sequenceState === SequenceState.RAN) {
      // Update the color of the clicked dot
      const correctColor: Color = {
        red: 20,
        green: 255,
        blue: 20,
        alpha: 1
      };
      const wrongColor: Color = {
        red: 255,
        green: 20,
        blue: 20,
        alpha: 1
      };
      const newDot = Object.assign({}, dot);

      if (dot.index === userClicks.length) {
        newDot.color = correctColor;
        setUserClicks(userClicks.concat([dot]));
        updateDot(dot, newDot);
        if (dot.index + 1 === dots.length) {
          setUserClicks([]);
          generateDots(5);
        }
      } else {
        newDot.color = wrongColor;
        setUserClicks([]);
        generateDots(5);
      }
    }
  };

  useEffect(() => {
    updateWindowDimensions();
    generateDots(5);
    window.addEventListener("resize", updateWindowDimensions);
  }, []);

  const mounted = useRef({});
  useEffect(() => {
    if (!mounted.current) mounted.current = true;
    else if (sequenceState === SequenceState.NOT_RAN && dots.length > 0)
      runSequence();
  });

  return <div className="dots-game-area">{getDots()}</div>;
};

export default DotsGame;
