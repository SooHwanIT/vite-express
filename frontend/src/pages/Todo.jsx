import { useEffect, useState } from "react";

function Todo() {
    const [todos, setTodos] = useState([]);
    const [text, setText] = useState("");

    useEffect(() => {
        fetch("http://localhost:5000/api/todos")
            .then((res) => res.json())
            .then((data) => setTodos(data))
            .catch((err) => console.error("Error:", err));
    }, []);

    const addTodo = () => {
        if (!text.trim()) return;
        fetch("http://localhost:5000/api/todos", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text }),
        })
            .then((res) => res.json())
            .then((newTodo) => {
                setTodos([...todos, newTodo]);
                setText("");
            });
    };

    const deleteTodo = (id) => {
        fetch(`http://localhost:5000/api/todos/${id}`, { method: "DELETE" })
            .then(() => setTodos(todos.filter((todo) => todo.id !== id)));
    };

    return (
        <div className="container">
            <h1>{`TODO 리스트`}</h1>
            <div className="input-group">
                <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="할 일을 입력하세요"
                />
                <button onClick={addTodo}>추가</button>
            </div>
            <ul>
                {todos.map((todo) => (
                    <li key={todo.id}>
                        {todo.text} <button onClick={() => deleteTodo(todo.id)}>삭제</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Todo;
