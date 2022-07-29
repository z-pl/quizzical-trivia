import React from "react";
import he from "he";

export default function Answer(props) {


  function handleClick() {
    props.selectAns(props.questionId, props.id)
  }


  let className = (
    "answer-item" + (props.answerData.selected ? " selected" : "") + (props.endQuiz && (props.answerData.isCorrect) ? " correct" : "")
    );

  return (
    <li className= {className} onClick = {handleClick}>
      {he.decode(props.answerData.answer)}
    </li>
  )
}
