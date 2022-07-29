import React from "react";
import he from "he";
import _, { last, shuffle } from "lodash";
import Answer from "./Answer";
import { nanoid } from "nanoid";

export default function Question(props) {

  const allAnswers = props.answers.map((answer, index) => {
    return <Answer id = {index} questionId = {props.id} answerData = {answer} selectAns = {props.selectAns} endQuiz = {props.endQuiz}/>
  })

  return (
    <div className="question-container">
      <h3 className="question--item">{he.decode(props.question)}</h3>
      <ul className = {"answer--list" + (props.endQuiz ? " checking--list" : " ")}>
        {allAnswers}
      </ul>
      <div className="divider"></div>
    </div>
  )
}
