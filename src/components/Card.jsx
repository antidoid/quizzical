import { nanoid } from "nanoid";
import he from "he";

export default function Card(props) {
  // generate random order of options
  const randomIndex = Math.floor(Math.random() * 4);
  const options = [...props.incorrectAnswers];
  options.splice(randomIndex, 0, props.answer);
  const decodedOptions = options.map((option) => he.decode(option));

  const optionElements = decodedOptions.map((option, index) => {
    return (
      <div className="card--option" key={nanoid()}>
        <input
          type="radio"
          name="question"
          value={option}
          id={`option-${index + 1}`}
        />
        <label htmlFor={`option-${index + 1}`}>{option}</label>
      </div>
    );
  });

  return (
    <div className="card">
      <p className="card--question">{he.decode(props.question)}</p>
      <div className="card--options">{optionElements}</div>
    </div>
  );
}
