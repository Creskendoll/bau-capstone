import React, { useState, useEffect, useRef } from "react";
import QuestionModel from "./QuestionModel";
import Question from "./Question";
import { SCREEN_RATIO } from "../dots-game/DotGameConstants";
import "../../style/math-game.css";
import Answer from "./Answer";
import { pickRand } from "../../misc/Helpers";
import { CHAR_LENGTH, CELL_HEIGHT } from "./MathGameConstants";

const MathGame = () => {
  const [questions, setQuestions] = useState<QuestionModel[]>([]);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [userClicks, setUserClicks] = useState<QuestionModel[]>([]);

  const updateWindowDimensions = () => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
  };

  const operators = ["-", "+", "*"];

  const calculateResult = (question: string): number => eval(question);

  const generateQuestion = (length: number, index: number): QuestionModel => {
    const questionSize = length * CHAR_LENGTH;
    const containerH = (SCREEN_RATIO.H - CELL_HEIGHT) * windowSize.height;
    const containerW = SCREEN_RATIO.W * windowSize.width - questionSize;

    const sentence: string = [...Array(length * 2 - 1).keys()]
      .map(val => {
        if (val % 2 === 0) {
          return Math.floor(Math.random() * 20 + 1).toString();
        } else {
          return pickRand(operators);
        }
      })
      .join("");

    return {
      index: index,
      question: sentence,
      answer: {
        value: calculateResult(sentence),
        position: {
          top: Math.random() * containerH,
          left: Math.random() * containerW
        }
      },
      position: {
        top: Math.random() * containerH,
        left: Math.random() * containerW
      }
    };
  };

  const generateQuestions = (n: number) => {
    setQuestions([...Array(n).keys()].map(i => generateQuestion(2, i)));
  };

  const onAnswerClick = (q: QuestionModel) => {
    if (userClicks.length === 1) {
      const firstClick = userClicks[0];
      if (calculateResult(firstClick.question!!) === q.answer!!.value) {
        // Remove questions
        const newQuestions = questions.filter(
          qInner =>
            qInner.index !== q.index || qInner.index !== firstClick.index
        );
        setQuestions(newQuestions);
      } else {
        const newQuestions = questions.filter(
          qInner =>
            qInner.index !== q.index || qInner.index !== firstClick.index
        );
        // Generate new questions
        setQuestions(
          newQuestions.concat([generateQuestion(2, questions.length)])
        );
      }
      setUserClicks([]);
    } else {
      const hack: QuestionModel = {
        index: q.index,
        answer: q.answer,
        position: undefined,
        question: undefined
      };
      setUserClicks(userClicks.concat([hack]));
    }
  };
  const onQuestionClick = (q: QuestionModel) => {
    if (userClicks.length === 1) {
      const firstClick = userClicks[0];
      if (calculateResult(q.question!!) === userClicks[0].answer!!.value) {
        // Remove questions
        const newQuestions = questions.filter(
          qInner =>
            qInner.index !== q.index || qInner.index !== firstClick.index
        );
        setQuestions(newQuestions);
      } else {
        const newQuestions = questions.filter(
          qInner =>
            qInner.index !== q.index || qInner.index !== firstClick.index
        );
        // Generate new questions
        setQuestions(
          newQuestions.concat([generateQuestion(2, questions.length)])
        );
      }
      setUserClicks([]);
    } else {
      const hack: QuestionModel = {
        index: q.index,
        answer: undefined,
        position: undefined,
        question: q.question
      };
      setUserClicks(userClicks.concat([hack]));
    }
  };

  const getQuestions = () => {
    // TODO: Make Question and Answer a single component
    return questions
      .map((q, i) => (
        <Question
          onClick={() => onQuestionClick(q)}
          key={i}
          model={q}
          className={
            userClicks.map(u => u.question).includes(q.question)
              ? "question cell clicked"
              : "question cell"
          }
        />
      ))
      .concat(
        questions.map((q, i) => (
          <Answer
            onClick={() => onAnswerClick(q)}
            key={i + 999999}
            model={q}
            className={
              userClicks.map(u => u.answer).includes(q.answer)
                ? "answer cell clicked"
                : "answer cell"
            }
          />
        ))
      );
  };

  useEffect(() => {
    updateWindowDimensions();
    window.addEventListener("resize", updateWindowDimensions);
  }, []);

  const mounted = useRef({});
  useEffect(() => {
    if (!mounted.current) mounted.current = true;
    else if (questions.length === 0 && windowSize.height !== 0)
      generateQuestions(3);
  });
  return <div className="math-game-area">{getQuestions()}</div>;
};

export default MathGame;
