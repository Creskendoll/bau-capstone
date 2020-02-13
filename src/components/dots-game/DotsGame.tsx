import React, { useState, useEffect, useRef } from "react";
import "../../style/dots-game.css";
import GameDot from "./GameDot";
import CompPosition from "../../misc/CompPosition";
import DotModel from "./DotModel";
import { sleep } from "../../misc/Helpers";
import {
  SequenceState,
  HIGHLIGHT_COLOR,
  CORRECT_COLOR,
  WRONG_COLOR,
  DOT_SIZE,
  SCREEN_RATIO,
  DOT_COLOR
} from "./DotGameConstants";

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

    dots.forEach(async (dot, index) => {
      const newDot = Object.assign({}, dot);
      newDot.color = HIGHLIGHT_COLOR;
      await sleep(1000 * (index + 1));
      updateDot(dot, newDot);
      await sleep(500);
      updateDot(newDot, dot);
      if (index === dots.length - 1) setSequenceState(SequenceState.RAN);
    });
  };

  const generateDots = (n : number) => {
    setDots(
      [...Array(n).keys()].map(index => {
        const pos: CompPosition = {
          top: Math.random(),
          left: Math.random()
        };
        return {
          position: pos,
          color: DOT_COLOR,
          index: index
        };
      })
    );
    setSequenceState(SequenceState.NOT_RAN);
  };

  const getDots = () => {
    // Defined in game-container.css
    // Subtract the size of the dots
    const dotSize = DOT_SIZE * windowSize.width * 1.2;
    const containerH = (SCREEN_RATIO.H * windowSize.height) - dotSize;
    const containerW = (SCREEN_RATIO.W  * windowSize.width) - dotSize;

    return dots.map((dot, index) => {
      const pos: CompPosition = {
        top: dot.position.top * containerH,
        left: dot.position.left * containerW
      };
      return (
        <GameDot
          key={index}
          className={
            dot.color === HIGHLIGHT_COLOR || dot.color === CORRECT_COLOR ? "circle expanded" : "circle"
          }
          color={dot.color}
          position={pos}
          onClick={() => onDotClick(dot)}
        />
      );
    });
  };

  const resetGame = async (newLevel : boolean) => {
    await sleep(800);
    setUserClicks([]);
    generateDots(newLevel ? dots.length+1 : 3);
  };

  const onDotClick = async (dot: DotModel) => {
    if (sequenceState === SequenceState.RAN && dot.color !== CORRECT_COLOR && dot.color !== WRONG_COLOR) {
      // Update the color of the clicked dot
      const newDot = Object.assign({}, dot);

      if (dot.index === userClicks.length) {
        newDot.color = CORRECT_COLOR;
        setUserClicks(userClicks.concat([dot]));
        updateDot(dot, newDot);
        if (dot.index + 1 === dots.length) {
          resetGame(true);
        }
      } else {
        newDot.color = WRONG_COLOR;
        updateDot(dot, newDot);
        resetGame(false);
      }
    }
  };

  useEffect(() => {
    updateWindowDimensions();
    generateDots(3);
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
