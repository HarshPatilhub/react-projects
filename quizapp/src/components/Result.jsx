import React from 'react'

const Result = ({userAnswers,question,resetQuiz =()=>{ }}) => {

    const correctAnswer = userAnswers.filter((answer)=> answer).length
  return (
    <div className='text-center'>
      <h1 className='text-4xl my-8'>Result</h1>
      <p className='text-xl'>You answer {correctAnswer} out of {question.length} questions.</p>
      <button onClick={resetQuiz} className='px-4 my-4 py-2 bg-zinc-600 text-white rounded'>Reset</button>

    </div>
  )
}

export default Result
