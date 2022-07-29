import React, { useState } from "react"
import Question from "../components/Question";
import { nanoid } from "nanoid";
import _, { sortedLastIndex } from "lodash";
import he from "he";

export default function Quiz() {

  const [quizQuestions, setQuizQuestions ] = useState("");
  const [checkAns, setCheckAns] = useState(false);
  const [playAgain, setPlayAgain] = useState(false);

  React.useEffect(() => {
    async function getQuestions() {
      const res = await fetch("https://opentdb.com/api.php?amount=5&type=multiple");
      const data = await res.json();

      const {results} = data;

      const updateResults = results.map((questionData, index) => {
        return {
          ...questionData,
          id: index,
          answers: createAnsArr([...questionData.incorrect_answers, questionData.correct_answer])
        }
      })
      setQuizQuestions(updateResults);
    }
    getQuestions();
    console.log("ping");
}, [playAgain]);



  function createAnsArr(arr) {
    const correct_ans = arr[arr.length - 1];

    const randomAnsArr = shuffleArr(arr);
    const newAnsArr = randomAnsArr.map((ans, index) => {
      return {
        id: index,
        answer: ans,
        selected: false,
        isCorrect: ans === correct_ans,
        submitQuiz: false
      }
    });

    return newAnsArr
  }

  function selectAns(questionId, ansId) {
    setQuizQuestions(prevQuestions => {
      return (
        prevQuestions.map(question => {
          if (question.id === questionId) {
            return {
              ...question,
              answers: changeAnsArr(ansId, question.answers)
            }
          }
          return question
        })
      )
    })
  }

  function submitQuiz() {
    setQuizQuestions(prevQuestions => {
      return (
        prevQuestions.map(question => {
          return {
            ...question,
            submitQuiz: true
          }
        })
      )
    })
  }


  function changeAnsArr(id, ansObj) {
    return(
      ansObj.map(ans => {
        if (ans.id === id) {
          return (
            {
              ...ans,
              selected: true,
            }
          )
        }
        return {
          ...ans,
          selected: false
        }
      })
    )
  }

  function shuffleArr(arr) {
    let lastIndex = arr.length - 1;

    while (lastIndex > 0) {
      let randomIndex = _.random(0, lastIndex);
      let randomValue = arr[randomIndex];

      arr[randomIndex] = arr[lastIndex];
      arr[lastIndex] = randomValue;
      lastIndex--;
    }

    return arr;
  }
  const allQuizQuestions = quizQuestions && quizQuestions.map((ques, index) => {
    return (
    <Question
      key = {nanoid()}
      id = {index}
      question = {ques.question}
      answers = {ques.answers}
      selectAns = {selectAns}
      endQuiz = {ques.submitQuiz}
      />
      )
  })

  console.log(quizQuestions);

  function handleCheck() {

    setCheckAns(prev => !prev );
    submitQuiz();
  }

  function calcScore() {
   return quizQuestions.reduce((sum, question) => {
        if (isAnswerCorrect(question.answers)) {
          return sum + 1
        }
        return sum
    }, 0)
  }

  function isAnswerCorrect(arr) {
   return arr.some(answer => {
      return (answer.selected && answer.isCorrect)
    })
  }

  function handlePlayAgain() {
    setPlayAgain( prev => !prev)
    setCheckAns(prev => !prev );
  }

  const scoreCon =  quizQuestions && (
    <div className="score-con">
      <span>You scored {calcScore()}/5</span>
      <button className = "blue-btn" onClick = {handlePlayAgain}>Play Again</button>
    </div>
  )

  const checkAnsCon = (
    <button className="blue-btn check-ans-btn" onClick = {handleCheck}>Check answers</button>
  )

  const btnCon = (
    checkAns ? scoreCon : checkAnsCon
  )
  return (
    <div className="quiz-container">
      <div className="question-list-container">
      {allQuizQuestions}
      </div>
      {quizQuestions && btnCon}
    </div>
  )


}
