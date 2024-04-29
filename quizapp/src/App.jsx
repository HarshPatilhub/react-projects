import React from 'react'
import Question from './components/Question'
import question from "./constants/question.json"
import {useState} from 'react'
import Result from './components/Result'

const App = () => {
  const [currentQuestion,setCurrentQuestion] = useState(0)
  const [userAnswer,setUserAnswer] = useState([])

  const handleNextQuestion = (isCorrect)=>{
    setCurrentQuestion(currentQuestion+1)
    setUserAnswer([...userAnswer,isCorrect])
  }

  const resetQuiz = ()=>{
    setCurrentQuestion(0)
    setUserAnswer([])
  }
  return (
    <div>
      <h1 className='text-center text-4xl font-bold'>Quiz App</h1>
      {/* Question */}
      { currentQuestion < question.length && ( 
      <Question 
      question={question[currentQuestion]}
       onAnswerClick={handleNextQuestion} />
      )}
      {/* Result */}
      {
        currentQuestion === question.length &&
      (<Result 
      question={question}
      userAnswers = {userAnswer}
      resetQuiz = {resetQuiz}
      />)}
    </div>
  )
}

export default App
