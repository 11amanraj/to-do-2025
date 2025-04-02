'use client'

import { useState } from "react";

interface todo {
  id: string,
  text: string,
  completed: boolean,
}

export default function Home() {
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
  const [hideCompleted, setHideCompleted] = useState<boolean>(true)

  return (
    <div>
      {todos.filter(todo => {
            if(!hideCompleted) {
              return true
            } else {
              return todo.completed
            }
          }).map(todo => <div key={todo.id}>{todo.text}</div>)}
    </div>
  );
}
