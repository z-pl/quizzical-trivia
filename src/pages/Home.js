import React from "react"
export default function Home(props) {

  function handleClick() {
    props.startQuizClick();
  }

  return (
    <div className = "home-container">
      <div className = "header">
        <h2 className = "header--title">Quizzical</h2>
        <p className = "header--subheader">Test your general knowledge</p>
      </div>

      <button className = "start-quiz-btn" onClick={handleClick}>Start quiz</button>
    </div>
  )
}
