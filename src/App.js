import { useState } from "react";
import "./style/index.css"

let counter = 0;

export default function App() {
    const [text, setText] = useState("")
    const [todos, setTodos] = useState([])

    const addTodo = (event) => {
        event.preventDefault();
        if (!text) return;
        const todo = { 
            id: counter++, 
            text, 
            completed: false };
            setText("");
            setTodos([...todos, todo]);
    }

    const deleteItem = (item) => {
        const filtered = todos.filter((todo) => todo !== item);
        setTodos(filtered)
    }

    const deleteCompleted = () => {
        const delCompleted = todos.filter((todo) => !todo.completed);
        setTodos(delCompleted)
    }

    const toggle = (item) => {
        const newTodos = todos.map((todo) => 
            todo === item ? { ...todo, completed: !todo.completed } : todo,
            );
        setTodos(newTodos)
    }

    const deleteAll = todos.filter((item) => item.completed).length > 0;

    return (
            <div className="container">
                <h1 className="title">ToDo List</h1>
                <div className="header">
                    <form onSubmit={addTodo}>
                        <input className="input"
                            type="text"
                            placeholder="Напишите задачу..."
                            value={text}
                            onChange={(event) => setText(event.target.value)}
                        />
                        <button className="button" 
                        disabled={!text}>Добавить</button>
                    </form>
                    <hr />

                    <div className="block-list">
                        <ul className="block-list-ul">
                            {todos.map((todo) =>
                                <li key={todo.id}>
                                    <div className="list-active">
                                        <input className="input-checkbox" 
                                        type="checkbox" 
                                        checked={todo.value} 
                                        onChange={() => toggle(todo)} />
                                        <label className="label-text">{todo.text}</label>
                                        <button className="remove" type="button"
                                            onClick={() => deleteItem(todo)}>
                                            ❌
                                        </button>
                                    </div>
                                </li>)}
                        </ul>
                    </div>

                    <div className="block-delete">
                        <button className="buttonLeft" 
                        type="button"
                        onClick={() => deleteCompleted()}
                        disabled={!deleteAll}>
                        Удалить завершенные
                        </button>
                        <button className="buttonRight" 
                        type="button"
                        onClick={() => setTodos([])}
                        disabled={todos.length === 0}>
                        Удалить все
                        </button>   
                    </div>

                </div>
            </div>
    )
}