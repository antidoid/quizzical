import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import Card from "./Card";
import CardSkeleton from "./CardSkeleton";

export default function Quiz() {
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
      setIsLoading(false);
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

  return (
    <div className="quiz">
      <h1 className="quiz--heading">Quizzical</h1>
      {isLoading ? (
        <CardSkeleton />
      ) : (
        <>
          {cardElements}
          <button className="btn">Check answers</button>
        </>
      )}
    </div>
  );
}
