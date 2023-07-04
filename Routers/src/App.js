import React, { useEffect, useState } from 'react';

function App() {
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState([]);

  async function getTodos() {
    const result = await fetch("http://localhost:3000/tasks");
    const todos = await result.json();
    setTodos(todos);
  }

  async function createTodo(e) {
    e.preventDefault();
    await fetch('http://localhost:3000/tasks', {
      method: "POST",
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ name: newTodo })
    });
    setNewTodo("");
    await getTodos();
  }

  async function updateCompleted(todo, isComplete) {
    await fetch(`http://localhost:3000/tasks/${todo.id}`, {
      method: "PUT",
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ ...todo, isComplete: isComplete })
    });
    await getTodos();
  }

  async function deleteTodo(id) {
    await fetch(`http://localhost:3000/tasks/${id}`, {
      method: "DELETE"
    });
    await getTodos();
  }

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <form onSubmit={createTodo}>
          <input className="new-todo" placeholder="Well, let's take on the day" value={newTodo} onChange={(e) => setNewTodo(e.target.value)} />
        </form>
      </header>
      <section className="main" style={{ display: "block" }}>
        <ul className="todo-list">
          {todos.map(todo => {
            return (
              <li className={todo.isComplete ? "completed" : ""} key={todo.id}>
                <div className="view">
                  <input className="toggle" type="checkbox" defaultChecked={todo.isComplete} onChange={(e) => updateCompleted(todo, e.target.checked)} />
                  <label>{todo.name}</label>
                  <button className="destroy" onClick={() => deleteTodo(todo.id)}></button>
                </div>
              </li>
            );
          })}
        </ul>
      </section>
    </section >
  );
}

export default App;