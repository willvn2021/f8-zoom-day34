const { useState } = React;

const weatherData = {
    hanoi: { city: "Hà Nội", temp: 28, weather: "Nắng", humidity: 65 },
    hcm: { city: "TP.HCM", temp: 32, weather: "Có mây", humidity: 78 },
    danang: { city: "Đà Nẵng", temp: 30, weather: "Mưa nhẹ", humidity: 82 },
};

//Icon theo tình trạng
const iconFor = (weather = "") => {
    const icon = weather.toLowerCase();
    switch (true) {
        case icon.includes("nắng"):
            return "☀️";
        case icon.includes("mưa"):
            return "🌧️";
        case icon.includes("mây"):
            return "🌤️";
        default:
            return "🌈";
    }
};

// Logic Random nhiệt độ, độ ẩm
const clamp = (x, min, max) => Math.min(max, Math.max(min, x));
const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

function WeatherApp() {
    const [weather, setWeather] = useState(weatherData);
    const [selected, setSelected] = useState("hanoi");

    const info = weather[selected];

    const refresh = () => {
        setWeather((prev) => {
            const current = prev[selected];
            const nextTemp = clamp(current.temp + randInt(-5, 5), -10, 45);
            const nextHumidity = clamp(
                current.humidity + randInt(-5, 5),
                0,
                100
            );
            return {
                ...prev,
                [selected]: {
                    ...current,
                    temp: nextTemp,
                    humidity: nextHumidity,
                },
            };
        });
    };

    return (
        <div className="card">
            <h1>Weather App</h1>

            <div className="toolbar">
                <select
                    value={selected}
                    onChange={(e) => setSelected(e.target.value)}
                >
                    {Object.entries(weather).map(([key, value]) => (
                        <option key={key} value={key}>
                            {value.city}
                        </option>
                    ))}
                </select>
                <button className="btn primary" onClick={refresh}>
                    Làm mới
                </button>
            </div>

            <div className="panel">
                <div className="icon" aria-hidden="true">
                    {iconFor(info.weather)}
                </div>

                <div className="rows">
                    <div className="row">
                        <div className="label">Thành phố</div>
                        <div className="value">{info.city}</div>
                    </div>
                    <div className="row">
                        <div className="label">Nhiệt độ</div>
                        <div className="value">{info.temp}°C</div>
                    </div>
                    <div className="row">
                        <div className="label">Thời tiết</div>
                        <div className="value">{info.weather}</div>
                    </div>
                    <div className="row">
                        <div className="label">Độ ẩm</div>
                        <div className="value">{info.humidity}%</div>
                    </div>
                </div>
            </div>

            <div className="hint">
                F8 Dữ liệu đang được “Làm mới” random nhiệt độ và độ ẩm (±5
                độ/%).
            </div>
        </div>
    );
}

const app = (
    <>
        <WeatherApp />
    </>
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(app);
