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

interface Props {
  setScore: (score: number) => void;
}

const DotsGame = (props: Props) => {
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

  // Light up the dots to show the sequence
  const runSequence = () => {
    setSequenceState(SequenceState.RUNNING);

    // Light up each dot
    dots.forEach(async (dot, index) => {
      const newDot = Object.assign({}, dot);
      newDot.color = HIGHLIGHT_COLOR;
      // Wait longer for the subsequent dots
      await sleep(1000 * (index + 1));
      updateDot(dot, newDot);
      // How long a dot will stay highlighted
      await sleep(500);
      updateDot(newDot, dot);
      // End the sequence
      if (index === dots.length - 1) setSequenceState(SequenceState.RAN);
    });
  };

  const generateDots = (n: number) => {
    // Generate dot models that contains the data to render a dot
    setDots(
      [...Array(n).keys()].map(index => {
        return {
          // CompPosition
          // Values are between 0 and 1
          // We want to be calculating real position when rendering the dot
          position: {
            top: Math.random(),
            left: Math.random()
          },
          color: DOT_COLOR,
          index: index
        };
      })
    );
    // Reset sequence
    setSequenceState(SequenceState.NOT_RAN);
  };

  const getDots = () => {
    // Defined in game-container.css
    // Subtract the size of the dots
    const dotSize = DOT_SIZE * windowSize.width * 1.2;
    // Calculate boundaries
    const containerH = SCREEN_RATIO.H * windowSize.height - dotSize;
    const containerW = SCREEN_RATIO.W * windowSize.width - dotSize;

    return dots.map((dot, index) => {
      // Calcualte dot positions
      const pos: CompPosition = {
        top: dot.position.top * containerH,
        left: dot.position.left * containerW
      };
      return (
        <GameDot
          key={index}
          className={
            dot.color === HIGHLIGHT_COLOR || dot.color === CORRECT_COLOR
              ? "circle expanded"
              : "circle"
          }
          color={dot.color}
          position={pos}
          onClick={() => onDotClick(dot)}
        />
      );
    });
  };

  const resetGame = async (nextLevel: boolean) => {
    await sleep(800);
    setUserClicks([]);
    // Reset the game if nextLevel is false
    // Add another dot if true
    generateDots(nextLevel ? dots.length + 1 : 3);
  };

  const onDotClick = async (dot: DotModel) => {
    // Can't click when running a sequence
    // Can't click the same dot twice
    if (
      sequenceState === SequenceState.RAN &&
      dot.color !== CORRECT_COLOR &&
      dot.color !== WRONG_COLOR
    ) {
      // Update the color of the clicked dot
      const newDot = Object.assign({}, dot);

      if (dot.index === userClicks.length) {
        newDot.color = CORRECT_COLOR;
        setUserClicks(userClicks.concat([dot]));
        updateDot(dot, newDot);
        // Proceed to the next level
        if (dot.index + 1 === dots.length) resetGame(true);
      } else {
        newDot.color = WRONG_COLOR;
        updateDot(dot, newDot);
        // Reset game
        resetGame(false);
      }
    }
  };

  // Component did mount
  useEffect(() => {
    // Set window dims
    updateWindowDimensions();
    // Set {dots} state
    generateDots(3);
    window.addEventListener("resize", updateWindowDimensions);
  }, []);

  // Component did update
  // Run the sequence here since dot generation is async
  // We have to wait until {dots} state is populated
  const mounted = useRef({});
  useEffect(() => {
    if (!mounted.current) mounted.current = true;
    else if (sequenceState === SequenceState.NOT_RAN && dots.length > 0)
      runSequence(); // Run the initial sequence
  });

  return <div className="dots-game-area">{getDots()}</div>;
};

export default DotsGame;
