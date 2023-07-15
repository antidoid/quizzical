import { useState } from "react";
import Quiz from "./components/Quiz";
import "./App.css";

export default function App() {
  const [isPlaying, setIsPlaying] = useState(false);

  function loadNewGame() {
    setIsPlaying((prevIsPlaying) => !prevIsPlaying);
  }

  return (
    <main>
      {isPlaying ? (
        <Quiz />
      ) : (
        <div className="welcome">
          <h1 className="welcome--title">Quizzical</h1>
          <p className="welcome--description">Let's Play</p>
          <button className="welcome--start-quiz btn" onClick={loadNewGame}>
            Start quiz
          </button>
        </div>
      )}
    </main>
  );
}
