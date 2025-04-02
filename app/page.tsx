'use client'

import { useState, useRef } from "react";
import Image from "next/image";

interface todo {
  id: string,
  text: string,
  completed: boolean,
}

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
  const [hideCompleted, setHideCompleted] = useState<boolean>(false)

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
      {todos.filter(todo => {
            if(!hideCompleted) {
              return true
            } else {
              return todo.completed
            }
          }).map(todo => {
            return (
              <div className="flex">
                <button><Image src="/icon-check.svg" alt="check" width='12' height='12'/></button>
                <div className="flex">
                  <p key={todo.id}>{todo.text}</p>
                  <button><Image src="/icon-cross.svg" alt="check" width='12' height='12'/></button>
                </div>
              </div>
            )
          })}
    </div>
  );
}
