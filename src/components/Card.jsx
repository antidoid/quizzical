import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import Option from "./Option";

export default function Card(props) {
  const [userChoice, setUserChoice] = useState(null);
  const [options, setOptions] = useState(() => generateOptions());

  // generate random order of options
  function generateOptions() {
    const randomIndex = Math.floor(Math.random() * 4);
    const options = [...props.incorrectAnswers];
    options.splice(randomIndex, 0, props.answer);
    return options.map((option) => ({
      id: nanoid(),
      value: option,
    }));
  }

  useEffect(() => {
    if (userChoice === props.answer) {
      props.handleCorrectAnswer();
    }
  }, [props.isQuizOver]);

  const optionElements = options.map((option) => {
    return (
      <Option
        key={option.id}
        value={option.value}
        answer={props.answer}
        userChoice={userChoice}
        setUserChoice={setUserChoice}
        isQuizOver={props.isQuizOver}
      />
    );
  });

  return (
    <div className={`card ${userChoice && "card-selected"} `}>
      <p className="card--question">{props.question}</p>
      <div className="card--options">{optionElements}</div>
    </div>
  );
}
