import { useState } from "react";
import Game from "./components/Game";
import "./App.css";

export default function App() {
  const [isPlaying, setIsPlaying] = useState(false);

  function loadNewGame() {
    setIsPlaying((prevIsPlaying) => !prevIsPlaying);
  }

  return (
    <div className="quiz">
      {isPlaying ? (
        <Game />
      ) : (
        <>
          <h1 className="quiz--title">Quizzical</h1>
          <p className="quiz--description">Let's see what you got</p>
          <button className="quiz--start btn" onClick={loadNewGame}>
            Start quiz
          </button>
        </>
      )}
    </div>
  );
}
