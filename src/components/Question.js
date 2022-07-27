import React from "react";
import he from "he";
import _, { last, shuffle } from "lodash";
import Answer from "./Answer";
import { nanoid } from "nanoid";

export default function Question(props) {
  const {incorrect_answers, correct_answer} = props.questionData;

  let questionText = he.decode(props.questionData.question);
  let answerArr = shuffleArr([...incorrect_answers, correct_answer]);

  function shuffleArr(arr) {
    let lastIndex = arr.length - 1;

    while (lastIndex > 0) {
      let randIndex = _.random(0, lastIndex);
      let randValue = arr[randIndex];

      arr[randIndex] = arr[lastIndex];
      arr[lastIndex] = randValue;

      lastIndex--;
    }

    return arr;
  }


  const allAnswers = answerArr.map((answer) => {
      return <Answer key = {nanoid()} answer = {answer} />
    })

  return (
    <div className="question-container">
      <h3 className="question--item">{questionText}</h3>
      <ul className="answer--list">
        {allAnswers}
      </ul>
      <div className="divider"></div>
    </div>
  )
}
