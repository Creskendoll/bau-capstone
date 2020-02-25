import React, { useState, useEffect, useRef } from "react";
import QuestionModel from "./QuestionModel";
import Question from "./Question";
import { SCREEN_RATIO } from "../dots-game/DotGameConstants";
import "../../style/math-game.css";
import Answer from "./Answer";
import { pickRand } from "../../misc/Helpers";
import { CHAR_LENGTH, CELL_HEIGHT } from "./MathGameConstants";
import CompPosition from "../../misc/CompPosition";

interface Props {
  setScore: (f: (score: number) => number) => void;
}

const MathGame = (props: Props) => {
  const [questions, setQuestions] = useState<QuestionModel[]>([]);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [userClicks, setUserClicks] = useState<QuestionModel[]>([]);
  const [level, setLevel] = useState(1);

  const updateWindowDimensions = () => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
  };

  const operators = ["-", "+", "*"];

  const calculateResult = (question: string): number => eval(question);

  const generateQuestion = (length: number, index: number): QuestionModel => {
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
          top: Math.random(),
          left: Math.random()
        }
      },
      position: {
        top: Math.random(),
        left: Math.random()
      }
    };
  };

  const generateQuestions = (n: number) => {
    setQuestions([...Array(n).keys()].map(i => generateQuestion(2, i)));
  };

  const onAnswerClick = (q: QuestionModel) => {
    if (userClicks.length === 1) {
      const firstClick = userClicks[0];

      if (!firstClick.question) {
        setUserClicks([]);
        return;
      }

      // If correct
      if (calculateResult(firstClick.question!!) === q.answer!!.value) {
        // Remove clicked questions
        const newQuestions = questions.filter(
          question =>
            // Remove clicked questions
            question.index !== q.index || question.index !== firstClick.index
        );

        if (newQuestions.length === 0) setLevel(level + 1);
        setQuestions(newQuestions);

        // TODO: Score algorithm
        props.setScore(s => s + 1);
      } else {
        // If incorrect
        // const newQuestions = questions.filter(
        //   question =>
        //     question.index !== q.index || question.index !== firstClick.index
        // );
        // Generate new questions
        setQuestions(
          questions.concat([generateQuestion(2, questions.length + 1)])
        );
        props.setScore(s => s - 1);
      }
      setUserClicks([]);
    } else {
      // TODO: This is a hack, get rid of it
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

      if (!firstClick.answer) {
        setUserClicks([]);
        return;
      }

      // If correct
      if (calculateResult(q.question!!) === firstClick.answer!!.value) {
        // Remove clicked questions
        const newQuestions = questions.filter(
          question =>
            question.index !== q.index || question.index !== firstClick.index
        );

        if (newQuestions.length === 0) setLevel(level + 1);
        setQuestions(newQuestions);

        props.setScore(s => s + 1);
      } else {
        // If incorrect
        // const newQuestions = questions.filter(
        //   qInner =>
        //     qInner.index !== q.index || qInner.index !== firstClick.index
        // );
        // Generate new questions
        setQuestions(
          questions.concat([generateQuestion(2, questions.length + 1)])
        );
        props.setScore(s => s - 1);
      }
      setUserClicks([]);
    } else {
      // TODO: This is a hack, get rid of it
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
    const getScreenPos = (length: number, pos: CompPosition): CompPosition => {
      const questionSize = length * CHAR_LENGTH;
      const containerH = (SCREEN_RATIO.H - CELL_HEIGHT) * windowSize.height;
      const containerW = SCREEN_RATIO.W * windowSize.width - questionSize;

      return {
        top: pos.top * containerH,
        left: pos.left * containerW
      };
    };

    // TODO: Make Question and Answer a single component
    return questions
      .map((q, i) => {
        const newQ: QuestionModel = {
          index: q.index,
          answer: q.answer,
          position: getScreenPos(q.question!!.length, q.position!!),
          question: q.question
        };

        return (
          <Question
            onClick={() => onQuestionClick(q)}
            key={i}
            model={newQ}
            className={
              userClicks.map(u => u.question).includes(q.question)
                ? "question cell clicked"
                : "question cell"
            }
          />
        );
      })
      .concat(
        questions.map((q, i) => {
          const newA: QuestionModel = {
            index: q.index,
            answer: {
              position: getScreenPos(
                q.answer!!.value.toString().length,
                q.answer!!.position
              ),
              value: q.answer!!.value
            },
            position: q.position,
            question: q.question
          };
          return (
            <Answer
              onClick={() => onAnswerClick(q)}
              key={i + 999999}
              model={newA}
              className={
                userClicks.map(u => u.answer).includes(q.answer)
                  ? "answer cell clicked"
                  : "answer cell"
              }
            />
          );
        })
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
      generateQuestions(level + 2);
  });
  return <div className="math-game-area">{getQuestions()}</div>;
};

export default MathGame;
