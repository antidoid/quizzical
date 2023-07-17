import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import he from "he";
import Card from "./Card";
import CardSkeleton from "./CardSkeleton";

export default function Quiz() {
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isQuizOver, setIsQuizOver] = useState(false);
  const [correctAnswerCount, setCorrectAnswerCount] = useState(0);
  const [newQuiz, setNewQuiz] = useState(false);

  useEffect(() => {
    async function fetchQuestions() {
      const res = await fetch(
        "https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple"
      );
      const data = await res.json();

      const cardsData = data.results.map((card) => {
        return {
          id: nanoid(),
          question: he.decode(card.question),
          answer: he.decode(card.correct_answer),
          incorrectAnswers: card.incorrect_answers.map((i) => he.decode(i)),
        };
      });

      setCards(cardsData);
      setIsLoading(false);
    }
    fetchQuestions();
  }, [newQuiz]);

  function startNewGame() {
    setNewQuiz((prev) => !prev);
    setIsLoading(true);
    setIsQuizOver(false);
    setCorrectAnswerCount(0);
    setIsQuizOver(false);
  }

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

  function checkAnswer() {
    setIsQuizOver(true);
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }

  return (
    <div className="quiz">
      <h1 className="quiz--heading">Quizzical</h1>
      {isLoading ? (
        <CardSkeleton />
      ) : (
        <>
          {isQuizOver && (
            <div className="result card">
              <div className="result--heading">The quiz is finished!</div>
              <div className="result--score">
                <p>
                  Correct answers:<span>{correctAnswerCount} / 10</span>
                </p>
                <button
                  className="btn"
                  style={{ margin: 0 }}
                  onClick={startNewGame}
                >
                  Start New Game
                </button>
              </div>
            </div>
          )}
          {cardElements}
          {!isQuizOver && (
            <button className="btn" onClick={checkAnswer}>
              Check answers
            </button>
          )}
        </>
      )}
    </div>
  );
}
