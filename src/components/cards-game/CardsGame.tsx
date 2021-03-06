import React, { useState, useRef, useEffect } from "react";
import GameCard from "./GameCard";
import "../../style/cards-game.css";
import { CardFace, CardModel} from "./CardModel";
import { getRandomColor,shuffle, sleep } from "../../misc/Helpers";

interface Props {
  setScore: (f: (score: number) => number) => void;
}

const CardsGame = (props: Props) => {

  // State hooks
  const [cards, setCards] = useState<Map<number, CardModel>>(
    new Map<number, CardModel>()
  );
  const [previousPick, setPreviousPick] = useState<CardModel | null>(null);
  const [currentDifficulty, setCurrentDifficulty] = useState<number>(8);
  
  //// Game logic
  // Operators
  const updateCards = () => {
    setCards(
      new Map<number, CardModel>(cards)
    );
  };
  const updateCardsClickable = (isClickable: boolean) => {

    // Go through cards
    for (let pair of cards){
      pair[1].isClickable = isClickable;
    }

    updateCards();
  };
  const flipCard = (pick: CardModel) => {

    // Get card
    const card = cards.get(pick.id);

    if (card){

      // Matched cards don't flip
      if (card && !card.matched){
        switch (card.face){
          case CardFace.BACK:
  
            // Picked cards can't be picked again
            card.isClickable = false;
            card.face = CardFace.FRONT;
            break;

          case CardFace.FRONT:
          default:
  
            // Flipped cards can be picked again
            card.isClickable = true;
            card.face = CardFace.BACK;
        }
      }
  
      // New cards because update
      updateCards();
  
    } else {
      console.assert(`Fatal error: card with id ${pick.id} was not found on the list.`);
    }
  };
  const isCompleted = () => {
    let result = 0;
    for (const pair of cards){
      if (pair[1].matched){
        result += 1;
      }
    }
    return (result === cards.size);
  };

  const generateCards = (difficulty: number) => {

    const matches = difficulty / 2;
    let set = [...Array(matches).keys()];

    // Generate colors
    const valueToColor = new Map<number, string>();
    for (let value of set){
      valueToColor[value] = getRandomColor();
    }

    setCards(new Map<number, CardModel>(
      shuffle(set.concat(set)).map((value, index) => {return [index, {
        id: index,
        value: value,
        face: CardFace.BACK,
        color: valueToColor[value],
        matched: false,
        isClickable: true,
      }]})
    ));
  };

  const getCards = () => {

    // Events
    const onCardClicked = async (card: CardModel) => {
      
      // Get cards
      const pick = cards.get(card.id);

      // State
      if (pick && pick.isClickable){

        // Flip selected card
        flipCard(pick);

        // First or second pick?
        if (previousPick){

          // Get card
          const previous = cards.get(previousPick.id);

          // Let the user memorize
          updateCardsClickable(false);
          await sleep(3000);

          if (previous){
            
            // Matched?
            if (previous.value === pick.value){

              // Right card, both cards stay
              previous.matched = true;
              previous.isClickable = false;
              pick.matched = true;
              pick.isClickable = false;
              
              props.setScore(score => score + 1);

              // Advance game
              if (isCompleted()){
                setPreviousPick(null);
                setCurrentDifficulty(currentDifficulty + 4);
                setCards(new Map<number, CardModel>());
                generateCards(currentDifficulty);
                return;
              }

            } else {

              // Wrong card, both cards flip
              flipCard(pick);
              flipCard(previous);

            }
          }

          // Reset pick
          setPreviousPick(null);

        } else {

          // First pick
          setPreviousPick(card);

        }

        // Unlock cards
        updateCardsClickable(true);
      }

      // Exit
      updateCards();
    }

    // Map a range to GameCards
    // Default state: can click, face down
    return [...cards].map(([_, model], id) => (
      <GameCard model={model} onClick={() => onCardClicked(model)} key={id}></GameCard>
    ));
  };

  // Component did update
  // Run the sequence here since card generation is async
  // We have to wait until {cards} state is populated
  const mounted = useRef({});
  useEffect(() => {
    if (!mounted.current) mounted.current = true;
    else if (cards.size === 0)
      generateCards(currentDifficulty);
  });

  // Display n cards depending on the difficulty
  return <div className="cards-game-area">{getCards()}</div>;
};

export default CardsGame;
