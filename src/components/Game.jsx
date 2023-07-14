import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import Card from "./Card";

export default function Game(props) {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    async function fetchQuestions() {
      const res = await fetch(import.meta.env.VITE_API_URL);
      const data = await res.json();

      const cardsData = data.results.map((card) => {
        return {
          question: card.question,
          answer: card.correct_answer,
          incorrectAnswers: card.incorrect_answers,
        };
      });

      setCards(cardsData);
    }
    fetchQuestions();
  }, []);

  const cardElements = cards.map((card) => {
    return (
      <Card
        key={nanoid()}
        question={card.question}
        answer={card.answer}
        incorrectAnswers={card.incorrectAnswers}
      />
    );
  });

  return <div className="game">{cardElements}</div>;
}
