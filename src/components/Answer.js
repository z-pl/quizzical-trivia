import React from "react";
import he from "he";

export default function Answer(props) {

  const answerText = he.decode(props.answer);

  return (
    <li className="answer-item">{answerText}</li>
  )
}
