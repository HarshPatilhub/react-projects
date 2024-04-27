import React, { useState } from 'react'

const Todo = () => {
    const [todo,settodo] = useState('')
    const [todos,settodos]= useState([])

    const handleSubmit =(e)=>{
        e.preventDefault()
        settodos([...todos,todo])
        console.log(todo);
        settodo('')
    }

    const handleDelete =(index)=>{
        const updatetodo = todos.filter((_,i)=>i !== index)
        settodos(updatetodo)
    }


  return (
   <>
    <div>
      <form  onSubmit={handleSubmit}>
        <input type="text"
        className='w-96 border py-2 text-center border-black font-bold text-black '
        placeholder='Enter Your Todo'
        value={todo}
        onChange={(e)=> settodo(e.target.value)} />
        <button type='submit' className='px-6 bg-blue-500 text-white font-bold py-2 rounded'>Add Todo</button>
      </form>
    </div>
    <div className='box mt-10 mx-2 gap-8 my-4'>
        {todos.length === 0  ?  (
            <p>No todo to display</p>
        ): (
            <ul className=''>
          {todos.map((todo, index) => (
            <li className='my-2 w-96' key={index}>
              {todo}
              <button
                onClick={() => handleDelete(index)}
                className='px-4  w-full py-1 gap-9 bg-blue-500 text-white rounded'
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
        )  }
        
      </div>
   </>
  )
}

export default Todo
