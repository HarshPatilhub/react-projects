import React from 'react';

const Question = ({ question, onAnswerClick }) => {

  return (
    <div className='text-center '>
      <h1 className='text-4xl my-8'>{question.question}</h1>
      <ul className='flex justify-center items-center flex-wrap gap-8 '>
        {question.answerOptions.map((option) => (
          <li key={option.text}>
            <button className='px-6 bg-gray-600 mx-2 py-2 text-center rounded text-white' onClick={() => onAnswerClick(option.isCorrect)}>
              {option.text}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Question;
