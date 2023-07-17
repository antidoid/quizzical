export default function Option(props) {
  function handleClick() {
    props.setUserChoice(props.value);
  }

  return (
    <div
      className={`card--option 
          ${props.userChoice === props.value && "option-selected"}
          ${
            props.isQuizOver &&
            (props.value === props.answer
              ? "correct-option"
              : props.userChoice === props.value && "incorrect-option")
          }
      `}
      onClick={handleClick}
    >
      {props.value}
    </div>
  );
}
