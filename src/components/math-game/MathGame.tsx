import React, { useState, useEffect } from "react";
import QuestionModel from "./QuestionModel";
import Question from "./Question";
import CompPosition from "../../misc/CompPosition";
import { SCREEN_RATIO, DOT_SIZE } from "../dots-game/DotGameConstants";
import "../../style/math-game.css";
import Answer from "./Answer";

const MathGame = () => {
  const [questions, setQuestions] = useState<QuestionModel[]>([]);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  const updateWindowDimensions = () => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
  };

  const operators = ["-", "+", "*"];

  const calculateResult = (question: string) => {
    return eval(question);
  };

  const generateQuestion = (length: number): QuestionModel => {
    const operator = () => {
      const randIndex = Math.floor(Math.random() * operators.length);
      return operators[randIndex];
    };

    const sentence: string = [...Array(length * 2 - 1).keys()]
      .map(val => {
        if (val % 2 === 0) {
          return Math.floor(Math.random() * 20 + 1).toString();
        } else {
          return operator();
        }
      })
      .join("");

    return {
      question: sentence,
      answer: calculateResult(sentence),
      position: {
        top: Math.random(),
        left: Math.random()
      }
    };
  };

  const generateQuestions = (n: number) => {
    setQuestions([...Array(n).keys()].map(val => generateQuestion(2)));
  };

  const getQuestions = () => {
    const containerH = SCREEN_RATIO.H * windowSize.height - DOT_SIZE;
    const containerW = SCREEN_RATIO.W * windowSize.width - DOT_SIZE;

    return questions
      .map((q, i) => {
        const pos: CompPosition = {
          top: q.position.top * containerH,
          left: q.position.left * containerW
        };
        q.position = pos;

        return <Question key={i} model={q} />;
      })
      .concat(
        questions.map((q, i) => {
          const pos: CompPosition = {
            top: Math.random() * containerH,
            left: Math.random() * containerW
          };
          return (
            <Answer
              key={i + 999999}
              answer={q.answer.toString()}
              position={pos}
            />
          );
        })
      );
  };

  useEffect(() => {
    updateWindowDimensions();
    generateQuestions(3);
    window.addEventListener("resize", updateWindowDimensions);
  }, []);

  return <div className="math-game-area">{getQuestions()}</div>;
};

export default MathGame;
