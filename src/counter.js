const { useState } = React;

function Counter() {
    const [count, setCount] = useState(0);

    const status = count > 0 ? "Dương" : count < 0 ? "Âm" : "Bằng không";
    const colorClass = count > 0 ? "positive" : count < 0 ? "negative" : "zero";

    return (
        <div className="card">
            <div className="display">
                <div className={`value ${colorClass}`}>{count}</div>
            </div>
            <div className={`status ${colorClass}`}>Trạng thái: {status}</div>
            <div className="controls">
                <button className="btn" onClick={() => setCount(count - 1)}>
                    -
                </button>
                <button className="btn" onClick={() => setCount(0)}>
                    <i className="fas fa-redo"></i>
                </button>
                <button className="btn" onClick={() => setCount(count + 1)}>
                    +
                </button>
            </div>
        </div>
    );
}

const app = (
    <>
        <Counter />
    </>
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(app);
