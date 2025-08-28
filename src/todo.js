const { useState } = React;

let uniqId = 0;

function EmptyState({ message = "Chưa có task nào. Hãy thêm task đầu tiên!" }) {
    return <div className="empty">{message}</div>;
}

function Stats({ total, done, left, className = "" }) {
    return (
        <div className={`stats ${className}`}>
            <span className="total">
                Tổng: <b>{total}</b> task
            </span>
            <span className="done">
                Đã hoàn thành: <b>{done}</b> task
            </span>
            <span className="left">
                Còn lại: <b>{left}</b> task
            </span>
        </div>
    );
}

function TodoApp() {
    const [inputValue, setInputValue] = useState("");
    const [todos, setTodos] = useState([]);

    const handleInputChange = (e) => {
        setInputValue(e.target.value); // Lấy giá trị từ input
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Ngăn trang reload khi submit form

        if (inputValue.trim()) {
            setTodos([
                ...todos,
                { id: ++uniqId, text: inputValue, completed: false },
            ]);
        }

        setInputValue(""); // Reset input sau khi thêm
    };

    const removeTodo = (id) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    const toggleTodo = (id) => {
        setTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    //Các biến thống kê
    const total = todos.length;
    const done = todos.filter((todo) => todo.completed).length;
    const left = total - done;

    return (
        <div>
            <h1>Todo List</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder="Nhập task mới..."
                />
                <button className="primary" type="submit">
                    Thêm
                </button>
            </form>

            {/* Nếu không có Todo nào thì trả về Component EmptyState */}
            {todos.length === 0 && <EmptyState />}

            {/* List Todo */}
            <ul>
                {todos.map((todo) => (
                    <li
                        key={todo.id}
                        className={`task ${todo.completed ? "completed" : ""}`}
                    >
                        <input
                            id={`checkboxID-${todo.id}`}
                            type="checkbox"
                            checked={todo.completed}
                            onChange={() => toggleTodo(todo.id)}
                        />
                        <label htmlFor={`checkboxID-${todo.id}`}>
                            {todo.text}
                        </label>
                        <button
                            className="remove"
                            onClick={() => removeTodo(todo.id)}
                            title="Xóa"
                        >
                            <i className="fa-solid fa-trash"></i>
                        </button>
                    </li>
                ))}
            </ul>
            {/* Stats */}
            {total > 0 && <Stats total={total} done={done} left={left} />}
        </div>
    );
}

const app = (
    <>
        <TodoApp />
    </>
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(app);
