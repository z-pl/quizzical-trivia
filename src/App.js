import "./App.css";
import React from "react";

import Home from "./pages/Home";
import Quiz from "./pages/Quiz";

function App() {

  const [quizPage, setQuizPage] = React.useState(false);

  function startQuiz() {
    setQuizPage(prevQuiz => !prevQuiz);
  }
  return (
    <div className="app-container">
      {!quizPage && <Home startQuizClick = {startQuiz}/>}
      {quizPage && <Quiz />}
    </div>
  );
}

export default App;
