const { useState, useEffect } = React;
function ProfileCard() {
    const [user, setUser] = useState([]);
    const [loading, setLoading] = useState(true);

    React.useEffect(() => {
        // Fake timeout hiện loading
        setTimeout(() => {
            fetch("https://jsonplaceholder.typicode.com/users/1")
                .then((response) => response.json())
                .then((json) => setUser(json))
                .finally(() => setLoading(false));
        }, 1000);
    }, []);

    console.log(user);
    // Chờ phản hồi Api trả ra text Loading
    if (loading) return <div className="loading">Loading...</div>;

    const avatarUrl = "./src/avatar-01.png";
    return (
        <div className="card">
            <div className="media">
                <img src={avatarUrl} alt={user.name} />
            </div>

            <div className="name">
                {user.name}
                <div className="verified">
                    <i class="fa-solid fa-circle-check"></i>
                </div>
            </div>
            <div className="subtitle">@{user.username}</div>

            <div className="list">
                <div className="row">
                    <div className="icon">
                        <i class="fa-solid fa-envelope"></i>
                    </div>
                    <div className="label">Email:</div>
                    <div className="value">{user.email}</div>
                </div>

                <div className="row">
                    <div className="icon">
                        <i class="fa-solid fa-phone"></i>
                    </div>
                    <div className="label">Phone:</div>
                    <div className="value">{user.phone}</div>
                </div>

                <div className="row">
                    <div className="icon">
                        <i class="fa-solid fa-globe"></i>
                    </div>
                    <div className="label">Website:</div>
                    <div className="value">
                        <a href={user.website}>{user.website}</a>
                    </div>
                </div>

                <div className="row">
                    <div className="icon">
                        <i class="fa-solid fa-location-dot"></i>
                    </div>
                    <div className="label">Address:</div>
                    <div className="value">
                        {user?.address?.street}, {user?.address?.city}
                    </div>
                </div>
            </div>
        </div>
    );
}

const app = (
    <>
        <ProfileCard />
    </>
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(app);
