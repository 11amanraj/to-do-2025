'use client'

import { useState, useRef, useEffect } from "react";
import Image from "next/image";

interface todo {
  id: string,
  text: string,
  completed: boolean,
}

type FilterOptions = "all" | "active" | "completed";

export default function Home() {
  const inputRef = useRef<HTMLInputElement>(null)
  const [todos, setTodos] = useState<todo[]>([
    {
      id: Math.random().toString(),
      text: 'First Todo',
      completed: false
    },
    {
      id: Math.random().toString(),
      text: 'Second Todo',
      completed: true
    },
    {
      id: Math.random().toString(),
      text: 'Third Todo',
      completed: false
    }
  ])
  const [isShowing, setIsShowing] = useState<FilterOptions>('all')
  const [filteredTodos, setFilteredTodos] = useState<todo[]>([])

  console.log(isShowing);

  useEffect(() => {
    let filteredTodos: todo[] = []
    if (isShowing == 'all') {
      filteredTodos = [...todos]
    } else if (isShowing == 'active') {
      const newTodos = todos.filter(todo => !todo.completed)
      filteredTodos = [...newTodos]
    } else {
      const newTodos = todos.filter(todo => todo.completed)
      filteredTodos = [...newTodos]
    }
    setFilteredTodos(filteredTodos);
  }, [isShowing, todos])

  const addTodoHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if(inputRef.current) {
      const todo = inputRef.current.value
      setTodos(prev => [...prev, {
        id: Math.random().toString(),
        text: todo,
        completed: false,
      }])
      inputRef.current.value = '' 
    }
  }

  const completeTodoHandler = (id: string) => {
    const updatedTodos = todos.map(todo => {
      if(todo.id === id) {
        return {...todo, completed: !todo.completed}
      } else return todo
    })
    setTodos([...updatedTodos])
  }

  const deleteTodoHandler = (id: string) => {
    const updatedTodos = todos.filter(todo => todo.id !== id)
    setTodos([...updatedTodos])
  }

  return (
    <div>
      <form className="flex" onSubmit={addTodoHandler}>
        <Image src="/icon-check.svg" alt="check" width='12' height='12'/>
        <input 
          ref={inputRef} 
          className="text-gray-500 bg-todo-box" 
          type="text"
          placeholder="Create a new todo..."
        />
        <button type="submit">Add Todo</button>
      </form>
      <div>
        {filteredTodos.map(todo => {
                return (
                  <div className="flex" key={todo.id}>
                    <button><Image onClick={() => completeTodoHandler(todo.id)} src="/icon-check.svg" alt="check" width='12' height='12'/></button>
                    <div className="flex">
                      <p>{todo.text}</p>
                      <button><Image onClick={() => deleteTodoHandler(todo.id)} src="/icon-cross.svg" alt="delete" width='12' height='12'/></button>
                    </div>
                  </div>
                )
              })}
      </div>
      <div>
        <button onClick={() => setIsShowing('all')}>All</button>
        <button onClick={() => setIsShowing('active')}>Active</button>
        <button onClick={() => setIsShowing('completed')}>Completed</button>
      </div>
    </div>
  );
}
