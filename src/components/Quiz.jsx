import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import Card from "./Card";
import CardSkeleton from "./CardSkeleton";

export default function Quiz() {
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isQuizOver, setIsQuizOver] = useState(false);
  const [correctAnswerCount, setCorrectAnswerCount] = useState(0);

  useEffect(() => {
    async function fetchQuestions() {
      const res = await fetch(import.meta.env.VITE_API_URL);
      const data = await res.json();

      const cardsData = data.results.map((card) => {
        return {
          id: nanoid(),
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

  function handleCorrectAnswer() {
    setCorrectAnswerCount((prevCount) => prevCount + 1);
  }

  const cardElements = cards.map((card) => {
    return (
      <Card
        key={card.id}
        question={card.question}
        answer={card.answer}
        incorrectAnswers={card.incorrectAnswers}
        isQuizOver={isQuizOver}
        handleCorrectAnswer={handleCorrectAnswer}
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
          {isQuizOver && (
            <p>You scored {correctAnswerCount}/10 correct answers</p>
          )}
          <button className="btn" onClick={() => setIsQuizOver(true)}>
            Check answers
          </button>
        </>
      )}
    </div>
  );
}
