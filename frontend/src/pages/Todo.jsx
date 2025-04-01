import { useEffect, useState } from "react";

function Todo() {
    const [todos, setTodos] = useState([]);
    const [text, setText] = useState("");

    // API 기본 URL을 .env 파일에서 가져옴
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

    useEffect(() => {
        fetch(`${apiBaseUrl}/api/todos`)
            .then((res) => res.json())
            .then((data) => setTodos(data))
            .catch((err) => console.error("Error:", err));
    }, [apiBaseUrl]);

    const addTodo = () => {
        if (!text.trim()) return;
        fetch(`${apiBaseUrl}/api/todos`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text }),
        })
            .then((res) => res.json())
            .then((newTodo) => {
                setTodos([...todos, newTodo]);
                setText("");
            })
            .catch((err) => console.error("Error:", err));
    };

    const deleteTodo = (id) => {
        fetch(`${apiBaseUrl}/api/todos/${id}`, { method: "DELETE" })
            .then(() => setTodos(todos.filter((todo) => todo.id !== id)))
            .catch((err) => console.error("Error:", err));
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
