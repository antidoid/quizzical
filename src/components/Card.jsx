import { nanoid } from "nanoid";
import he from "he";
import { useEffect, useState } from "react";

export default function Card(props) {
  const [userChoice, setUserChoice] = useState(null);
  const [options, setOptions] = useState([]);

  // generate random order of options
  useEffect(() => {
    function generateOptions() {
      const randomIndex = Math.floor(Math.random() * 4);
      const options = [...props.incorrectAnswers];
      options.splice(randomIndex, 0, props.answer);
      const decodedOptions = options.map((option) => he.decode(option));
      setOptions(decodedOptions);
    }
    generateOptions();
  }, []);

  const optionElements = options.map((option) => {
    const key = nanoid();
    return (
      <div
        className={`card--option ${userChoice === option && "option-selected"}`}
        key={key}
        onClick={() => setUserChoice(option)}
      >
        {option}
      </div>
    );
  });

  return (
    <div className={`card ${userChoice && "card-selected"}`}>
      <p className="card--question">{he.decode(props.question)}</p>
      <div className="card--options">{optionElements}</div>
    </div>
  );
}
