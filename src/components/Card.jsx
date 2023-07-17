import { nanoid } from "nanoid";
import { useEffect, useState } from "react";

export default function Card(props) {
  const [userChoice, setUserChoice] = useState(null);
  const [options, setOptions] = useState(() => generateOptions());

  // generate random order of options
  function generateOptions() {
    const randomIndex = Math.floor(Math.random() * 4);
    const options = [...props.incorrectAnswers];
    options.splice(randomIndex, 0, props.answer);
    const decodedOptions = options.map((option) => ({
      id: nanoid(),
      value: option,
    }));
    return decodedOptions;
  }

  useEffect(() => {
    if (userChoice === props.answer) {
      props.handleCorrectAnswer();
    }
  }, [props.isQuizOver]);

  const optionElements = options.map((option) => {
    return (
      <div
        key={option.id}
        className={`card--option 
          ${userChoice === option.value && "option-selected"}
          ${props.isQuizOver &&
          (option.value === props.answer
            ? "correct-option"
            : userChoice === option.value && "incorrect-option")
          }
        `}
        onClick={() => setUserChoice(option.value)}
      >
        {option.value}
      </div>
    );
  });

  return (
    <div className={`card ${userChoice && "card-selected"} `}>
      <p className="card--question">{props.question}</p>
      <div className="card--options">{optionElements}</div>
    </div>
  );
}
