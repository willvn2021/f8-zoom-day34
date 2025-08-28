const { useState, useEffect } = React;

function Products() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    React.useEffect(() => {
        setTimeout(() => {
            fetch("https://jsonplaceholder.typicode.com/posts?_limit=12")
                .then((response) => response.json())
                .then((json) => setPosts(json))
                .finally(() => setLoading(false));
        }, 1000);
    }, []);

    console.log(posts);
    // Chờ phản hồi Api trả ra text Loading
    if (loading) return <div className="loading">Loading...</div>;

    return (
        <div className="container">
            <h1>Products Post</h1>
            <div className="sub">Danh sách bài viết</div>

            <div className="grid">
                {posts.map((post) => (
                    <article key={post.id}>
                        <span>ID #{post.id}</span>
                        <h2 className="title">{post.title}</h2>
                    </article>
                ))}
            </div>
        </div>
    );
}

const app = (
    <>
        <Products />
    </>
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(app);
