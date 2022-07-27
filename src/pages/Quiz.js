import React from "react"
import Question from "../components/Question";
import { nanoid } from "nanoid";
export default function Quiz() {


  const [quizQuestions, setQuizQuestions] = React.useState("");

  React.useEffect(() => {
      async function getQuestions() {
        const res = await fetch("https://opentdb.com/api.php?amount=5&type=multiple");
        const data = await res.json();

        const {results} = data;

        setQuizQuestions(results);
      }
      getQuestions();
  }, [])


  const allQuestions = quizQuestions && (quizQuestions.map((questionData, index) => {
      return <Question key = {nanoid()} questionData = {questionData} />
  }));

  return (
    <div className="quiz-container">
      <div className="question-list-container">
        {allQuestions}
      </div>
    </div>
  )
}
